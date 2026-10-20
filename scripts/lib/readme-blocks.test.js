// The profile README (this repo is grosjeanbaptiste/grosjeanbaptiste, so its
// README.md is what GitHub shows on the profile page) has two generated
// blocks. Pulling the block builders out of the script makes them testable
// without touching the network or the filesystem.

const test = require('node:test');
const assert = require('node:assert/strict');
const { applyBlocks, buildAboutFacts, buildEmail } = require('./readme-blocks');

const RESUME = {
  basics: {
    email: 'someone@example.com',
    phone: '+32 400 00 00 00',
    location: { city: 'Kraainem', region: 'Brussels', countryCode: 'BE' },
  },
  education: [
    { studyType: 'Master of Science - MS', area: 'Computer Science', institution: 'UMons', endDate: '2026-09-04' },
    { studyType: "Bachelor of Science - BSc", area: 'Business Engineering', institution: 'X', endDate: '2016-06-30' },
  ],
  work: [
    { position: 'Founder', company: 'Acteble', url: 'https://acteble.com', summary: 'Sole founder. Rust backend.' },
    { position: 'Past', company: 'Old', endDate: '2024-01-01', summary: 'Done.' },
  ],
};

test('the about block keeps only the roles still running', () => {
  const md = buildAboutFacts(RESUME);
  assert.match(md, /Sole founder\./, 'the current role is missing');
  assert.doesNotMatch(md, /Done\./, 'a finished role leaked into "current focus"');
});

test('the about block reports location and the highest degree', () => {
  const md = buildAboutFacts(RESUME);
  assert.match(md, /Kraainem, Brussels/);
  assert.match(md, /Master of Science.*UMons/);
});

test('contact blocks render as links', () => {
  assert.match(buildEmail(RESUME), /\[someone@example\.com\]\(mailto:someone@example\.com\)/);
});

test('a missing marker pair fails loudly instead of writing a mangled README', () => {
  assert.throws(
    () => applyBlocks('# No markers here', RESUME),
    /missing "<!-- LLM-ABOUT-FACTS -->/,
    'a README without markers must raise, not silently produce nothing',
  );
});

test('applying the blocks twice changes nothing the second time', () => {
  const src = [
    '<!-- LLM-ABOUT-FACTS -->', '<!-- /LLM-ABOUT-FACTS -->',
    '<!-- LLM-EMAIL -->', '<!-- /LLM-EMAIL -->',
  ].join('\n');
  const once = applyBlocks(src, RESUME);
  assert.equal(applyBlocks(once, RESUME), once, 'the generator is not idempotent');
});

// The phone number stays on the CV, off the public profile page.
test('the README never carries the phone number', () => {
  const src = [
    '<!-- LLM-ABOUT-FACTS -->', '<!-- /LLM-ABOUT-FACTS -->',
    '<!-- LLM-EMAIL -->', '<!-- /LLM-EMAIL -->',
  ].join('\n');
  assert.doesNotMatch(applyBlocks(src, RESUME), /tel:|Phone/);
  const readme = require('node:fs').readFileSync(require('node:path').resolve(__dirname, '../../README.md'), 'utf8');
  assert.doesNotMatch(readme, /tel:|Phone|LLM-PHONE/);
});
