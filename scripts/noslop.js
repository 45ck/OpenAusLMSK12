#!/usr/bin/env node

import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const local = [join(process.cwd(), 'node_modules', '.bin', 'noslop'), join(process.cwd(), 'node_modules', '.bin', 'noslop.cmd')];
const localNoslop = local.find((file) => existsSync(file));

if (!localNoslop) {
  if (process.env.NOSLOP_STRICT === '1') {
    console.error(
      'Strict mode requires a local noslop binary at node_modules/.bin/noslop; fallback checks were not executed.',
    );
    process.exit(1);
  }

  console.error(
    'noslop binary not found locally; executing fallback quality checks from calling script.',
  );
  process.exit(1);
}

const command = localNoslop;
const commandArgs = args;

const result = spawnSync(command, commandArgs, {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

if (result.error) {
  console.error('Failed to execute noslop:', result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 0);
