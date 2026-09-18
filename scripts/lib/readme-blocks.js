// The generated blocks of the profile README, as pure functions of the resume
// data. Extracted from scripts/generate-readme.js so they can be tested without
// a network call or a filesystem; the logic itself is unchanged.

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
  const isInProgress = (e) => !e.endDate || e.endDate === 'Present' || e.endDate > today;
  const byScore = (a, b) => score(b.studyType) - score(a.studyType);
  // Prefer the highest degree currently in progress; once studies are done,
  // fall back to the highest degree already obtained so the fact never vanishes.
  const inProgress = (education || []).filter(isInProgress).sort(byScore);
  if (inProgress[0]) return inProgress[0];
  const obtained = (education || []).filter((e) => !isInProgress(e)).sort(byScore);
  return obtained[0] || null;
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
  const currentWork = (r.work || []).filter((w) => !w.endDate || w.endDate === 'Present');
  const workItems = currentWork.map((w) => {
    const firstSentence = w.summary?.split(/(?<=[.!?])\s/)[0] ?? `${w.position} at ${w.company}`;
    const link = w.url ? ` — [${w.company}](${w.url})` : '';
    return `  - ${firstSentence}${link}`;
  });
  const lines = [];
  if (locationLine) lines.push(`- **Location** — ${locationLine}`);
  if (eduLine) lines.push(`- **Education** — ${eduLine}`);
  if (workItems.length) {
    lines.push('- **Current focus**');
    lines.push(...workItems);
  }
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

/** Fill the three generated blocks of `md` from `resume`. */
function applyBlocks(md, resume) {
  let out = replaceBetween(md, 'LLM-ABOUT-FACTS', buildAboutFacts(resume));
  out = replaceBetween(out, 'LLM-EMAIL', buildEmail(resume));
  return replaceBetween(out, 'LLM-PHONE', buildPhone(resume));
}

module.exports = {
  applyBlocks,
  buildAboutFacts,
  buildEmail,
  buildPhone,
  highestObtainedDegree,
  replaceBetween,
};
