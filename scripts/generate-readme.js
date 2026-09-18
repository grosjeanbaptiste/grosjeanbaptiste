#!/usr/bin/env node
/**
 * Regenerate the marker blocks of README.md from the canonical resume data.
 *
 * This repo is grosjeanbaptiste/grosjeanbaptiste, so README.md is what GitHub
 * shows on the profile page. Three blocks are generated from the resume:
 *
 *   <!-- LLM-ABOUT-FACTS -->  ...  <!-- /LLM-ABOUT-FACTS -->
 *   <!-- LLM-EMAIL -->        ...  <!-- /LLM-EMAIL -->
 *   <!-- LLM-PHONE -->        ...  <!-- /LLM-PHONE -->
 *
 * Everything else in the README (banner, badges, interests, footer) stays
 * hand-authored.
 *
 * The resume itself lives in the site repo (grosjeanbaptiste/grosjeanbaptiste.com)
 * — this repo deliberately keeps no second copy, since a stale duplicate of a
 * CV is worse than a fetch. The published file is read over HTTPS by default;
 * point RESUME_JSON at a local path to work offline or against a draft:
 *
 *   node scripts/generate-readme.js
 *   RESUME_JSON=../grosjeanbaptiste.com/assets/data/resume.json node scripts/generate-readme.js
 */
const fs = require('node:fs');
const path = require('node:path');
const { applyBlocks } = require('./lib/readme-blocks');

const ROOT = path.resolve(__dirname, '..');
const README = path.join(ROOT, 'README.md');
const PUBLISHED = 'https://www.grosjeanbaptiste.com/assets/data/resume.json';

async function loadResume() {
  const local = process.env.RESUME_JSON;
  if (local) {
    const file = path.resolve(local);
    if (!fs.existsSync(file)) throw new Error(`RESUME_JSON points at a missing file: ${file}`);
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  }
  const res = await fetch(PUBLISHED);
  // Never fall back to a stale copy: a README quietly built from old data is
  // worse than one that failed to build.
  if (!res.ok) throw new Error(`${PUBLISHED} returned HTTP ${res.status}`);
  return res.json();
}

async function main() {
  const resume = await loadResume();
  const before = fs.readFileSync(README, 'utf8');
  const after = applyBlocks(before, resume);
  if (after === before) {
    console.log('README.md: already up to date');
    return;
  }
  fs.writeFileSync(README, after);
  console.log('README.md: LLM-ABOUT-FACTS, LLM-EMAIL, LLM-PHONE regenerated');
}

main().catch((err) => {
  console.error(`generate-readme: ${err.message}`);
  process.exit(1);
});
