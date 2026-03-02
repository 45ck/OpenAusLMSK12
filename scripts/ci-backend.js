import { spawnSync } from 'node:child_process';

const commandCheck = spawnSync(process.platform === 'win32' ? 'where' : 'command', ['dotnet']);
const sdkInfo = spawnSync('dotnet', ['--info'], { stdio: 'pipe', encoding: 'utf8' });

if (commandCheck.status !== 0 || sdkInfo.status !== 0 || /No SDKs were found/i.test(sdkInfo.stdout + sdkInfo.stderr)) {
  console.log('dotnet not found. Skipping backend CI checks.');
  process.exit(0);
}

const run = (command, args) => {
  const result = spawnSync(command, args, { stdio: 'inherit' });
  if (result.status !== 0) {
    process.exit(result.status);
  }
};

console.log('Running backend quality checks...');
run('dotnet', ['format', 'apps/backend/OpenAusLMSK12.sln', '--verify-no-changes']);
run('dotnet', ['build', 'apps/backend/OpenAusLMSK12.sln', '/warnaserror']);
run('dotnet', ['test', 'apps/backend/OpenAusLMSK12.sln']);
