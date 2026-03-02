#!/usr/bin/env node

import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const local = [join(process.cwd(), 'node_modules', '.bin', 'noslop'), join(process.cwd(), 'node_modules', '.bin', 'noslop.cmd')];
const localNoslop = local.find((file) => existsSync(file));

const npmPackage = '@45ck/noslop';
const npmExecPath = process.env.npm_execpath && existsSync(process.env.npm_execpath)
  ? process.env.npm_execpath
  : join(dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js');
const hasNpmExec = existsSync(npmExecPath);

const fallbackCommand = hasNpmExec
  ? {
      command: process.execPath,
      args: [npmExecPath, 'exec', '--yes', '--', npmPackage, ...args],
    }
  : null;

const command = localNoslop ?? (fallbackCommand?.command);
const commandArgs = localNoslop ? args : fallbackCommand?.args;
const usingNpmFallback = !localNoslop;

const run = (cmd, cmdArgs) => {
  return spawnSync(cmd, cmdArgs, {
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: false,
    encoding: 'utf8',
  });
};

const formatOutput = (result) => `[stdout]\n${result.stdout ?? ''}\n[stderr]\n${result.stderr ?? ''}`;

if (usingNpmFallback) {
  if (!fallbackCommand) {
    console.error(
      'Could not resolve local npm executable path. Install noslop locally via npm or add a local noslop binary.',
    );
    process.exit(1);
  }

  const result = run(command, commandArgs);

  if (result.error) {
    console.error('Failed to execute noslop via npm:', result.error.message);
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
    output.includes('unknown command') ||
    output.includes('is not recognized as an internal or external command');

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

