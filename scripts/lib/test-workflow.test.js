// Guard for .github/workflows/test.yml.
//
// The README of this repo is the GitHub profile page, and it is generated. The
// tests are what keep that generation honest — but for a while nothing ran
// them outside a developer's machine, so they gated nothing.

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const WORKFLOW = path.resolve(__dirname, '../../.github/workflows/test.yml');

test('a workflow runs the test suite', () => {
  assert.ok(fs.existsSync(WORKFLOW), 'no .github/workflows/test.yml — nothing runs the tests in CI');
  const yaml = fs.readFileSync(WORKFLOW, 'utf8');
  assert.match(yaml, /npm test|node --test/, 'the workflow never actually runs the suite');
  assert.match(yaml, /pull_request/, 'the suite would not gate a pull request');
});

test('the test job is not narrowed by a paths filter', () => {
  const yaml = fs.readFileSync(WORKFLOW, 'utf8').replace(/^\s*#.*$/gm, '');
  assert.doesNotMatch(
    yaml,
    /^\s{4}paths:/m,
    'test.yml filters by path — a change outside the filter would skip the suite',
  );
});
