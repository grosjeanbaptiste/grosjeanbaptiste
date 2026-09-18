// The profile README (this repo is grosjeanbaptiste/grosjeanbaptiste, so its
// README.md is what GitHub shows on the profile page) has three generated
// blocks. Pulling the block builders out of the script makes them testable
// without touching the network or the filesystem.

const test = require('node:test');
const assert = require('node:assert/strict');
const { applyBlocks, buildAboutFacts, buildEmail, buildPhone } = require('./readme-blocks');

const RESUME = {
  basics: {
    email: 'someone@example.com',
    phone: '+32 496 28 97 05',
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
  assert.match(buildPhone(RESUME), /\(tel:\+32496289705\)/, 'the tel: href must be digits only');
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
    '<!-- LLM-PHONE -->', '<!-- /LLM-PHONE -->',
  ].join('\n');
  const once = applyBlocks(src, RESUME);
  assert.equal(applyBlocks(once, RESUME), once, 'the generator is not idempotent');
});
