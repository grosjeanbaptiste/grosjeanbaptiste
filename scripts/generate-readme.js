#!/usr/bin/env node
/**
 * Regenerate the marker blocks of README.md from the canonical resume data.
 *
 * Reads grosjeanbaptiste.github.io/assets/data/resume.json (produced by the
 * DSL compiler in dsl/resume.grosjean → dsl/compile.py) and fills three
 * blocks bounded by HTML comment markers in README.md:
 *
 *   <!-- LLM-ABOUT-FACTS -->  ...  <!-- /LLM-ABOUT-FACTS -->
 *   <!-- LLM-EMAIL -->        ...  <!-- /LLM-EMAIL -->
 *   <!-- LLM-PHONE -->        ...  <!-- /LLM-PHONE -->
 *
 * Everything else in the README (banner, GitHub stats badges, Acteble tech
 * stack, shields.io badges, interests, footer) stays hand-authored.
 *
 * Run from repo root:  node scripts/generate-readme.js
 */
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const RESUME = path.join(ROOT, 'grosjeanbaptiste.github.io/assets/data/resume.json');
const README = path.join(ROOT, 'README.md');

function highestObtainedDegree(education) {
  const today = new Date().toISOString().slice(0, 10);
  const score = (t) => {
    if (!t) return 0;
    if (/master|MSc?\b|MA\b/i.test(t)) return 4;
    if (/bachelor|bachelier|BSc|BA\b/i.test(t)) return 3;
    if (/attestation|certificat/i.test(t)) return 2;
    if (/CESS|secondaire/i.test(t)) return 1;
    return 0;
  };
  const inProgress = (education || []).filter(
    (e) => !e.endDate || e.endDate === 'Present' || e.endDate > today,
  );
  const ordered = [...inProgress].sort((a, b) => score(b.studyType) - score(a.studyType));
  return ordered[0] || null;
}

function replaceBetween(source, marker, replacement) {
  const open = `<!-- ${marker} -->`;
  const close = `<!-- /${marker} -->`;
  const re = new RegExp(
    `${open.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}[\\s\\S]*?${close.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}`,
  );
  if (!re.test(source)) {
    throw new Error(`README.md is missing "${open} ... ${close}" markers`);
  }
  return source.replace(re, `${open}\n${replacement}\n${close}`);
}

function buildAboutFacts(r) {
  const b = r.basics;
  const loc = b.location;
  const locationLine = loc ? `${loc.city}, ${loc.region || loc.countryCode}` : '';
  const currentEdu = highestObtainedDegree(r.education);
  const eduLine = currentEdu
    ? `${currentEdu.studyType}${currentEdu.area ? ` in ${currentEdu.area}` : ''}, ${currentEdu.institution}`
    : '';
  const currentWork = (r.work || []).find((w) => !w.endDate || w.endDate === 'Present');
  const focusLine = currentWork
    ? `${currentWork.summary?.split(/(?<=[.!?])\s/)[0] ?? `${currentWork.position} at ${currentWork.company}`}${currentWork.url ? ` — [${currentWork.company}](${currentWork.url})` : ''}`
    : '';
  const lines = [];
  if (locationLine) lines.push(`- **📍 Location**: ${locationLine}`);
  if (eduLine) lines.push(`- **🎓 Education**: ${eduLine}`);
  if (focusLine) lines.push(`- **💻 Current Focus**: ${focusLine}`);
  return lines.join('\n');
}

function buildEmail(r) {
  const email = r.basics?.email;
  if (!email) return '';
  return `- Email — [${email}](mailto:${email})`;
}

function buildPhone(r) {
  const phone = r.basics?.phone;
  if (!phone) return '';
  const digits = phone.replace(/[^+\d]/g, '');
  return `- Phone — [${phone}](tel:${digits})`;
}

const resume = JSON.parse(fs.readFileSync(RESUME, 'utf8'));
let md = fs.readFileSync(README, 'utf8');
md = replaceBetween(md, 'LLM-ABOUT-FACTS', buildAboutFacts(resume));
md = replaceBetween(md, 'LLM-EMAIL', buildEmail(resume));
md = replaceBetween(md, 'LLM-PHONE', buildPhone(resume));
fs.writeFileSync(README, md);
console.log('README.md: LLM-ABOUT-FACTS, LLM-EMAIL, LLM-PHONE regenerated');
