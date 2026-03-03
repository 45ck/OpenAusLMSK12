---
adr-id: "ADR-120"
title: "Structured ADR Registry and Contradiction Gating"
status: "accepted"
decision-date: "2026-03-03"
scope: "architecture governance"
source-artifact: "ADR-120-structured-adr-registry-and-contradiction-gating.md"
status-gate: "planning corpus + ADR governance review"
domain: "platform"
depends-on:
  - "ADR-118"
  - "ADR-119"
supersedes: []
superseded-by: []
conflicts-with: []
---

# ADR-120: Structured ADR Registry and Contradiction Gating

## Context
ADR files are the planning control point, but their current metadata shape is inconsistent. This causes avoidable conflict risk and makes contradiction checks manual.

## Decision
Establish a machine-readable ADR governance layer and require all ADR files to include structured front-matter metadata compatible with a registry payload and contradiction matrix.

Specifically:
1. Every ADR must include front-matter metadata (`adr-id`, `status`, `decision-date`, `scope`, etc.).
2. `scripts/adr-registry.mjs` is the authoritative tool for:
   - validating ADR records;
   - generating `docs/adr/ADR_REGISTRY.json`;
   - validating contradiction matrix completeness via `docs/adr/ADR_CONTRADICTION_MATRIX.json`.
3. `ADR_CONTRADICTION_MATRIX.json` is the structured list of cross-ADR contradictions and becomes the conflict source of truth.

## Constraints
- Existing ADR prose format remains valid; the registry only adds parseable governance metadata.
- Contradictions that are critical/high severity must be present and resolved before completion gates can pass.
- New ADRs are created using the same front-matter format so validation can be fully automated.

## Consequences
- ADR conflicts are now auditable from JSON files, not just prose notes.
- CI-style validation can fail early when unresolved high-severity contradictions exist.
- `ADR_REGISTRY.json` becomes the deterministic input for ADR index consumers and reporting scripts.

## Governance
- `npm run adr:emit` updates `ADR_REGISTRY.json` and ensures `ADR_CONTRADICTION_MATRIX.json` exists.
- `npm run adr:validate` validates ADR metadata and contradiction references.
- `npm run adr:normalize` backfills front-matter on existing ADR files to move the corpus to structured format.

## Rationale
- Reduces human error in contradiction review.
- Makes decision drift visible and machine-checkable.
- Supports future automation for ticket gating and release checks.
