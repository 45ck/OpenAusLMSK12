#!/usr/bin/env node

import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const local = [join(process.cwd(), 'node_modules', '.bin', 'noslop'), join(process.cwd(), 'node_modules', '.bin', 'noslop.cmd')];
const localNoslop = local.find((file) => existsSync(file));

const npmPackage = '@45ck/noslop';
const npmCommand = ['--yes', npmPackage, ...args];

const command = localNoslop ?? 'npx';
const commandArgs = localNoslop ? args : npmCommand;

const run = (cmd, cmdArgs) => {
  return spawnSync(cmd, cmdArgs, {
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: process.platform === 'win32',
    encoding: 'utf8',
  });
};

const formatOutput = (result) => `[stdout]\n${result.stdout ?? ''}\n[stderr]\n${result.stderr ?? ''}`;

if (command === 'npx') {
  const result = run(command, commandArgs);

  if (result.error) {
    console.error('Failed to execute noslop via npx:', result.error.message);
    process.exit(1);
  }

  if (result.status === 0) {
    process.exit(0);
  }

  const output = formatOutput(result).toLowerCase();
  const looksMissing =
    output.includes('404') ||
    output.includes('not found') ||
    output.includes('could not determine executable') ||
    output.includes('does not exist under owner') ||
    output.includes('command \"noslop\" not found') ||
    output.includes('unknown command');

  if (!looksMissing) {
    process.stdout.write(result.stdout ?? '');
    process.stderr.write(result.stderr ?? '');
    process.exit(result.status ?? 1);
  }

  console.error(
    'Could not execute @45ck/noslop from npm (package may not be available yet). Falling back to local gate checks.',
  );
  process.exit(1);
}

const result = run(command, commandArgs);

if (result.error) {
  console.error('Failed to execute noslop:', result.error.message);
  process.exit(1);
}

process.stdout.write(result.stdout ?? '');
process.stderr.write(result.stderr ?? '');
process.exit(result.status ?? 0);
