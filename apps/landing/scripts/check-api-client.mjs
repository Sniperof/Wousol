// Fails when the committed API types differ from what the committed OpenAPI document generates (ADR 0008).
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const COMMITTED = 'src/api/generated';

function filesIn(directory) {
  return readdirSync(directory, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => join(entry.parentPath, entry.name).slice(directory.length + 1))
    .sort();
}

function differences(expected, actual) {
  const names = [...new Set([...filesIn(expected), ...filesIn(actual)])].sort();
  return names.filter((name) => {
    try {
      return !readFileSync(join(expected, name)).equals(readFileSync(join(actual, name)));
    } catch {
      return true;
    }
  });
}

const fresh = mkdtempSync(join(tmpdir(), 'dap-api-types-'));
try {
  execFileSync('npx', ['openapi-ts', '--no-log-file', '--silent', '--output', fresh], {
    stdio: 'inherit',
  });
  const stale = differences(fresh, COMMITTED);
  if (stale.length > 0) {
    console.error(`API types are out of date (${stale.join(', ')}): run \`npm run api:generate\`.`);
    process.exitCode = 1;
  } else {
    console.log('api: generated types match the contract');
  }
} finally {
  rmSync(fresh, { recursive: true, force: true });
}
