// The projects block lists what the current roles are building, as the CV
// files them: the site's extras attach projects to each work entry by index.

const test = require('node:test');
const assert = require('node:assert/strict');
const { buildProjects } = require('./readme-blocks');

const RESUME = {
  work: [{ position: 'Founder' }, { position: 'Past', endDate: '2024-01-01' }],
  projects: [
    { name: 'Acteble', url: 'https://www.acteble.com', description: 'Geolocated social platform.' },
    { name: 'KAG', description: 'Rust RAG framework.' },
    { name: 'Old', description: 'Finished long ago.' },
  ],
};
const EXTRAS = { work: [{ projects: ['Acteble', 'KAG'] }, { projects: ['Old'] }] };

test('the projects block lists the projects of the roles still running', () => {
  const md = buildProjects(RESUME, EXTRAS);
  assert.match(md, /Acteble/);
  assert.match(md, /KAG/);
  assert.doesNotMatch(md, /Old/, 'a project of a finished role leaked in');
});

test('a project with a url links to it, one without is plain text', () => {
  const md = buildProjects(RESUME, EXTRAS);
  assert.match(md, /^- \*\*\[Acteble\]\(https:\/\/www\.acteble\.com\)\*\* — Geolocated social platform\.$/m);
  assert.match(md, /^- \*\*KAG\*\* — Rust RAG framework\.$/m);
});

test('a role without extras has no projects', () => {
  assert.equal(buildProjects(RESUME, { work: [] }), '');
});

test('a project the extras name but the resume lacks fails loudly', () => {
  assert.throws(() => buildProjects(RESUME, { work: [{ projects: ['Ghost'] }] }), /Ghost/);
});
