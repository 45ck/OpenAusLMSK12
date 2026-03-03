#!/usr/bin/env node

import {
  existsSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const ADR_DIR = join(ROOT, 'docs', 'adr');
const REGISTRY_PATH = join(ROOT, 'docs', 'adr', 'ADR_REGISTRY.json');
const CONTRADICTION_PATH = join(ROOT, 'docs', 'adr', 'ADR_CONTRADICTION_MATRIX.json');
const COMMAND = process.argv[2] ?? 'validate';
const STRICT = process.argv.includes('--strict');

if (!['validate', 'emit', 'normalize'].includes(COMMAND)) {
  console.error('Usage: node scripts/adr-registry.mjs [validate|emit|normalize] [--strict]');
  process.exit(1);
}

const parsed = collectAdrFiles(ADR_DIR).map(parseAdrFile);
const records = parsed.map((entry) => entry.record);
const validation = validateRecords(records, STRICT);
const contradictionPayload = readContradictionPayload();
const shouldEmit = COMMAND === 'emit' && validation.errors.length === 0;

if (COMMAND === 'normalize') {
  let updated = 0;
  for (const entry of parsed) {
    if (entry.record.hasFrontMatter) continue;
    const frontMatter = renderFrontMatter(entry.record);
    const normalized = `---\n${frontMatter}\n---\n\n${entry.text.replace(/^\uFEFF/, '')}`;
    writeFileSync(entry.path, normalized, 'utf8');
    updated += 1;
  }
  console.log(`✅ inserted ADR front-matter into ${updated} files`);
}

if (shouldEmit) {
  const payload = buildRegistryPayload(records, contradictionPayload);
  writeIfChanged(REGISTRY_PATH, JSON.stringify(payload, null, 2));
  writeIfChanged(CONTRADICTION_PATH, JSON.stringify(contradictionPayload, null, 2));
  console.log(`✅ emitted ${payload.totalRecords} ADR records to ADR_REGISTRY.json`);
}

for (const warning of validation.warnings) {
  console.warn(`WARN: ${warning}`);
}

for (const error of validation.errors) {
  console.error(`ERROR: ${error}`);
}

if (validation.errors.length > 0) process.exit(1);
console.log(`Validated ${records.length} ADR files.`);

function collectAdrFiles(rootDir) {
  const files = [];
  const stack = [rootDir];

  while (stack.length > 0) {
    const current = stack.pop();
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const full = join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
        continue;
      }
      if (entry.name.toLowerCase().endsWith('.md')) {
        files.push(full);
      }
    }
  }

  return files.sort();
}

function parseAdrFile(filePath) {
  const text = readFileSync(filePath, 'utf8');
  const front = parseFrontMatter(text);
  const body = front?.body ?? text.replace(/^\uFEFF/, '');
  const parsedBody = parseBodyMetadata(body);
  const frontData = front?.data ?? {};

  const id =
    frontData['adr-id'] ||
    frontData.id ||
    parsedBody.id ||
    deriveAdrId(body) ||
    deriveAdrId(filePath);

  const record = {
    path: relative(ROOT, filePath).replace(/\\/g, '/'),
    domain: deriveDomain(filePath),
    id,
    title: frontData.title || parsedBody.title || deriveTitle(filePath),
    status: normalizeStatus(
      frontData.status || parsedBody.status || frontData['record-status'] || parsedBody.recordStatus || 'draft',
    ),
    decisionDate: normalizeDate(frontData['decision-date'] || frontData.date || parsedBody.date),
    scope: frontData.scope || parsedBody.scope || 'platform',
    statusGate: frontData['status-gate'] || parsedBody.statusGate || 'adr governance',
    sourceArtifact: frontData['source-artifact'] || parsedBody.sourceArtifact || deriveTitle(filePath),
    dependsOn: parseRefList(frontData['depends-on'] || frontData.dependsOn || parsedBody.dependsOn),
    supersedes: parseRefList(frontData.supersedes || parsedBody.supersedes),
    supersededBy: parseRefList(frontData['superseded-by'] || frontData.supersededBy || parsedBody.supersededBy),
    conflictsWith: parseRefList(frontData['conflicts-with'] || frontData.conflictWith || parsedBody.conflictsWith),
    hasFrontMatter: Boolean(front),
  };

  return { path: filePath, text, record };
}

function parseFrontMatter(text) {
  const normalized = text.replace(/^\uFEFF/, '');
  if (!normalized.startsWith('---\n') && !normalized.startsWith('---\r\n')) return null;

  const lines = normalized.split(/\r?\n/);
  const end = lines.findIndex((line, index) => index > 0 && line.trim() === '---');
  if (end <= 0) return null;

  const rawData = lines.slice(1, end).join('\n');
  return {
    data: parseYamlSubset(rawData),
    body: lines.slice(end + 1).join('\n'),
  };
}

function parseYamlSubset(text) {
  const lines = text.split(/\r?\n/);
  const data = {};
  let currentKey = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    const listMatch = line.match(/^-\s+(.*)$/);
    if (listMatch && currentKey) {
      data[currentKey] = data[currentKey] || [];
      data[currentKey].push(stripQuotes(listMatch[1].trim()));
      continue;
    }

    const kvMatch = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!kvMatch) {
      currentKey = null;
      continue;
    }

    const key = kvMatch[1].toLowerCase();
    const value = kvMatch[2].trim();
    currentKey = null;

    if (!value) {
      data[key] = [];
      currentKey = key;
      continue;
    }

    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((item) => stripQuotes(item.trim()))
        .filter(Boolean);
      continue;
    }

    data[key] = stripQuotes(value);
  }

  return data;
}

function parseBodyMetadata(content) {
  const lines = content.replace(/^\uFEFF/, '').split(/\r?\n/);
  const heading = lines.find((line) => /^#\s+/.test(line));
  const metadataSection = extractMetadataSection(lines);

  const title =
    metadataSection.title ??
    (heading
      ? heading.replace(/^#\s+/, '').replace(/^ADR-\d+:?\s*/i, '').trim()
      : null);

  const status =
    metadataSection.status ??
    (findFirst(lines, /^##\s*status:\s*(.+)$/i) || [])[1]?.trim().toLowerCase();
  const date =
    metadataSection.decisionDate ??
    (findFirst(lines, /^##\s*date:\s*(.+)$/i) || [])[1]?.trim();

  return {
    title,
    status,
    recordStatus: status,
    date,
    scope: metadataSection.scope,
    statusGate: metadataSection['status-gate'],
    sourceArtifact: metadataSection['source-artifact'],
    dependsOn: parseRefList(metadataSection['depends-on']),
    supersedes: parseRefList(metadataSection.supersedes),
    supersededBy: parseRefList(metadataSection['superseded-by']),
    conflictsWith: parseRefList(metadataSection['conflicts-with']),
    id: metadataSection.id,
  };
}

function extractMetadataSection(lines) {
  const start = lines.findIndex((line) => /^##\s*Metadata\s*$/i.test(line.trim()));
  if (start < 0) return {};

  const metadata = {};
  let i = start + 1;
  let currentListKey = null;

  while (i < lines.length) {
    const raw = lines[i];
    if (/^##\s+/.test(raw)) break;
    const line = raw.trim();

    const bullet = line.match(/^-\s+(.*)$/);
    if (bullet) {
      const body = bullet[1];
      if (currentListKey) {
        metadata[currentListKey] = metadata[currentListKey] || [];
        metadata[currentListKey].push(stripListValue(body));
      } else {
        const kv = body.match(/^\*\*([^*]+)\*\*\s*:\s*(.+)$/);
        if (kv) {
          metadata[kv[1].toLowerCase()] = stripQuotes(kv[2]);
        } else if (body.includes(':')) {
          const [lhs, ...rhs] = body.split(':');
          metadata[lhs.replace(/\*\*/g, '').trim().toLowerCase()] = stripQuotes(rhs.join(':').trim());
        }
      }
      i++;
      continue;
    }

    const listStart = line.match(/^([A-Za-z0-9_-]+)\s*:\s*$/);
    if (listStart) {
      currentListKey = listStart[1].toLowerCase();
      metadata[currentListKey] = metadata[currentListKey] || [];
      i++;
      continue;
    }

    const kv = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.+)$/);
    if (kv) {
      metadata[kv[1].toLowerCase()] = stripQuotes(kv[2]);
      currentListKey = null;
      i++;
      continue;
    }

    currentListKey = null;
    i++;
  }

  return {
    title: metadata.title,
    status: metadata.status,
    'decision-date': metadata['decision-date'],
    'status-gate': metadata['status-gate'],
    'source-artifact': metadata['source-artifact'],
    'depends-on': parseRefList(metadata['depends-on']),
    supersedes: parseRefList(metadata.supersedes),
    'superseded-by': parseRefList(metadata['superseded-by']),
    'conflicts-with': parseRefList(metadata['conflicts-with']),
    scope: metadata.scope,
    id: metadata.id,
    decisionDate: metadata['decision-date'],
  };
}

function findFirst(lines, pattern) {
  for (const line of lines) {
    const match = line.match(pattern);
    if (match) return match;
  }
  return null;
}

function parseRefList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((v) => normalizeAdrRef(v));
  if (typeof value === 'string') {
    if (value.startsWith('[') && value.endsWith(']')) {
      return value
        .slice(1, -1)
        .split(',')
        .map((item) => normalizeAdrRef(item.trim()))
        .filter(Boolean);
    }
    return value
      .split(',')
      .map((item) => normalizeAdrRef(item))
      .filter(Boolean);
  }
  return [];
}

function normalizeAdrRef(value) {
  return String(value).trim().replace(/[`*]/g, '');
}

function normalizeStatus(value) {
  return String(value || 'draft').trim().toLowerCase();
}

function normalizeDate(value) {
  if (!value) return 'unknown';
  const trimmed = String(value).trim();
  return trimmed.length > 0 ? trimmed : 'unknown';
}

function deriveAdrId(value) {
  const fromHeading = value.match(/(ADR-\d{3,})/i);
  return fromHeading ? fromHeading[1].toUpperCase() : null;
}

function deriveDomain(filePath) {
  const rel = relative(ADR_DIR, filePath).split(/[\\/]/);
  return rel[0] || 'platform';
}

function deriveTitle(filePath) {
  const fileName = filePath.split(/[\\/]/).at(-1);
  return fileName.replace(/\.md$/i, '').replace(/_/g, ' ').replace(/-/g, ' ');
}

function stripQuotes(value) {
  const trimmed = String(value).trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function stripListValue(value) {
  return value.replace(/^\*\*[^*]+\*\*\s*:\s*/, '').trim();
}

function renderFrontMatter(record) {
  const keys = [
    `adr-id: ${JSON.stringify(record.id)}`,
    `title: ${JSON.stringify(record.title)}`,
    `status: ${JSON.stringify(record.status)}`,
    `decision-date: ${JSON.stringify(record.decisionDate)}`,
    `scope: ${JSON.stringify(record.scope)}`,
    `source-artifact: ${JSON.stringify(record.sourceArtifact)}`,
    `status-gate: ${JSON.stringify(record.statusGate)}`,
    `domain: ${JSON.stringify(record.domain)}`,
    `depends-on: ${renderList(record.dependsOn)}`,
    `supersedes: ${renderList(record.supersedes)}`,
    `superseded-by: ${renderList(record.supersededBy)}`,
    `conflicts-with: ${renderList(record.conflictsWith)}`,
  ];

  return keys.join('\n');
}

function renderList(values) {
  if (!values || values.length === 0) {
    return '[]';
  }
  return `\n${values.map((value) => `  - ${JSON.stringify(value)}`).join('\n')}`;
}

function buildRegistryPayload(records, contradictionPayload = readContradictionPayload()) {
  const unique = dedupeRecords(records);
  const ordered = unique.sort((a, b) => {
    const aId = Number(String(a.id).replace(/\D/g, '')) || 0;
    const bId = Number(String(b.id).replace(/\D/g, '')) || 0;
    if (aId !== bId) return aId - bId;
    return String(a.id).localeCompare(String(b.id));
  });

  return {
    generatedAt: new Date().toISOString(),
    version: '1.0',
    totalRecords: ordered.length,
    contradictions: Array.isArray(contradictionPayload.entries)
      ? contradictionPayload.entries
      : [],
    records: ordered.map((record) => ({
      id: record.id,
      title: record.title,
      status: record.status,
      decisionDate: record.decisionDate,
      scope: record.scope,
      domain: record.domain,
      path: record.path,
      sourceArtifact: record.sourceArtifact,
      dependsOn: record.dependsOn,
      supersedes: record.supersedes,
      supersededBy: record.supersededBy,
      conflictsWith: record.conflictsWith,
      statusGate: record.statusGate,
    })),
  };
}

function dedupeRecords(records) {
  const byId = new Map();
  for (const record of records) {
    if (!byId.has(record.id)) byId.set(record.id, record);
  }
  return [...byId.values()];
}

function readContradictionPayload() {
  if (!existsSync(CONTRADICTION_PATH)) {
    return {
      version: '1.0',
      generatedAt: new Date().toISOString(),
      entries: [],
    };
  }

  try {
    return JSON.parse(readFileSync(CONTRADICTION_PATH, 'utf8'));
  } catch {
    return {
      version: '1.0',
      generatedAt: new Date().toISOString(),
      entries: [],
    };
  }
}

function validateRecords(records, strictMode) {
  const warnings = [];
  const errors = [];
  const byId = new Map();
  const allowedStatuses = new Set(['accepted', 'draft', 'proposed', 'superseded', 'rejected', 'deprecated', 'deferred', 'open']);
  const contradictionEntries = readContradictionPayload();

  for (const record of records) {
    if (!record.id || !/^ADR-\d{3,}/i.test(record.id)) {
      errors.push(`invalid ADR id in ${record.path}`);
      continue;
    }
    if (byId.has(record.id)) {
      errors.push(`duplicate ADR id ${record.id}`);
      continue;
    }
    byId.set(record.id, record);

    if (!record.title || record.title.length < 3) {
      warnings.push(`${record.id}: title is missing or too short`);
    }
    if (!allowedStatuses.has(record.status)) {
      warnings.push(`${record.id}: unknown status "${record.status}"`);
    }
  }

  for (const record of records) {
    for (const ref of [...record.dependsOn, ...record.supersedes, ...record.supersededBy]) {
      if (!byId.has(ref)) {
        errors.push(`${record.id}: references missing ADR "${ref}"`);
      }
    }

    for (const conflictId of record.conflictsWith) {
      if (!byId.has(conflictId)) {
        errors.push(`${record.id}: references missing ADR "${conflictId}" in conflicts-with`);
        continue;
      }
      const contradiction = findContradictionForPair(contradictionEntries.entries, record.id, conflictId);
      if (!contradiction && !isDraft(record.status)) {
        errors.push(
          `${record.id}: non-draft conflict with ${conflictId} has no matching ADR_CONTRADICTION_MATRIX entry`,
        );
      }
    }
  }

  if (Array.isArray(contradictionEntries.entries)) {
    for (const entry of contradictionEntries.entries) {
      if (!entry.id || !entry.severity || !entry.status) {
        errors.push(`invalid contradiction entry in matrix: ${JSON.stringify(entry)}`);
        continue;
      }
      if (entry.status.toLowerCase() !== 'resolved' && ['critical', 'high'].includes(entry.severity.toLowerCase())) {
        errors.push(`critical/high contradiction unresolved: ${entry.id}`);
      }
      if (!entry.relatedAdrs || !Array.isArray(entry.relatedAdrs) || entry.relatedAdrs.length < 2) {
        errors.push(`contradiction ${entry.id} requires at least two ADR references`);
      }
      for (const related of entry.relatedAdrs || []) {
        if (typeof related === 'string' && !byId.has(related)) {
          errors.push(`contradiction ${entry.id} references unknown ADR ${related}`);
        }
      }
    }
  }

  if (strictMode && warnings.length > 0) {
    errors.push(...warnings.map((warning) => `strict mode: ${warning}`));
    return { warnings: [], errors };
  }

  return { warnings, errors };
}

function findContradictionForPair(entries, first, second) {
  if (!Array.isArray(entries)) return null;
  return (
    entries.find(
      (entry) =>
        Array.isArray(entry.relatedAdrs) &&
        entry.relatedAdrs.includes(first) &&
        entry.relatedAdrs.includes(second),
    ) || null
  );
}

function isDraft(status) {
  return String(status || '').toLowerCase() === 'draft';
}

function writeIfChanged(path, content) {
  const current = existsSync(path) ? readFileSync(path, 'utf8') : '';
  if (current !== content) writeFileSync(path, content, 'utf8');
}
