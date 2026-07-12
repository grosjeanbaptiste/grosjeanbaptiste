const I18N = require('../i18n');
const { escapeHtml, dateRangeHtml } = require('../format');
const { indentLines } = require('../markers');

const renderEmbeddedSkills = (skills) => {
  if (!skills?.length) return '';
  const tags = skills.map((s) => `<span class="skill-tag">${escapeHtml(s)}</span>`).join(' ');
  return `<div class="skill-tags inline-skills">${tags}</div>`;
};

function renderEmbeddedProjects(projectNames, projects, t) {
  if (!projectNames?.length) return '';
  const projs = projectNames.map((n) => projects.find((p) => p.name === n)).filter(Boolean);
  if (!projs.length) return '';
  const items = projs
    .map((p) => {
      const desc = p.summary || p.description || '';
      const link = p.url
        ? ` <a href="${escapeHtml(p.url)}" target="_blank" rel="noopener">↗</a>`
        : '';
      return `<li><strong>${escapeHtml(p.name)}</strong>${link}${desc ? ` — ${escapeHtml(desc)}` : ''}</li>`;
    })
    .join('\n        ');
  return [
    '<div class="embedded-projects">',
    `  <p class="embedded-label">${escapeHtml(t.projects)}:</p>`,
    '  <ul>',
    `        ${items}`,
    '  </ul>',
    '</div>',
  ].join('\n');
}

// Match volunteer entries to a work/education host by the first word of the
// volunteer's organization: "UMons" matches UMons, "EPHEC …" matches
// "Ecole … (EPHEC-EPS)". Same heuristic as the XSLT views.
function renderEmbeddedVolunteer(volunteer, hostName, lang, t) {
  if (!hostName || !volunteer?.length) return '';
  const matched = volunteer.filter((v) => {
    if (!v.organization) return false;
    const firstWord = v.organization.split(/\s+/)[0];
    return firstWord && hostName.includes(firstWord);
  });
  if (!matched.length) return '';
  const items = matched
    .map((v) => {
      const dates = `${v.startDate || ''} – ${v.endDate || 'Present'}`;
      return `<li><strong>${escapeHtml(v.position)}</strong> — ${escapeHtml(dates)}</li>`;
    })
    .join('\n        ');
  return [
    '<div class="embedded-projects">',
    `  <p class="embedded-label">${escapeHtml(t.volunteer)}:</p>`,
    '  <ul>',
    `        ${items}`,
    '  </ul>',
    '</div>',
  ].join('\n');
}

// Reference names look like "Name Lastname, role at Company". We surface a
// "See references: Name1, Name2" line under the host whose company name is
// a 4-char substring match — same as the XSLT views. The links anchor to
// the standalone References section id="ref-<index>".
function renderEmbeddedReferenceLinks(references, hostName, t) {
  if (!hostName || !references?.length || hostName.length < 4) return '';
  const stem = hostName.slice(0, 4);
  const matched = references
    .map((r, idx) => ({ r, idx }))
    .filter(({ r }) => r.name && r.name.includes(stem));
  if (!matched.length) return '';
  const links = matched
    .map(({ r, idx }) => `<a href="#ref-${idx}">${escapeHtml(r.name)}</a>`)
    .join(', ');
  return `<p class="ref-links">${escapeHtml(t.references)}: ${links}</p>`;
}

function renderAbout(resume, t) {
  const paras = (resume.basics?.summary || '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `  <p>${escapeHtml(p)}</p>`)
    .join('\n');
  return ['<section id="about">', `  <h2>${escapeHtml(t.about)}</h2>`, paras, '</section>'].join(
    '\n',
  );
}

function renderExperienceItem(w, lang, projects, volunteer, references, t) {
  const companyHtml = w.company
    ? w.url
      ? `<a href="${escapeHtml(w.url)}" target="_blank" rel="noopener">${escapeHtml(w.company)}</a>`
      : escapeHtml(w.company)
    : '';
  // "Position · Client" when the role is a consulting mission (e.g. Xtrada
  // → VhAuctions) so the reader still sees the end-client alongside the
  // employer (Xtrada) in the pipe-separated header.
  const positionLabel = w.client
    ? `${escapeHtml(w.position)} · ${escapeHtml(w.client)}`
    : escapeHtml(w.position);
  const parts = [
    '<article class="experience-item">',
    `  <h3>${positionLabel}${w.company ? ` | ${companyHtml}` : ''}</h3>`,
    `  <p class="date">${dateRangeHtml(w.startDate, w.endDate, lang)}</p>`,
  ];
  if (w.location) parts.push(`  <p class="location">${escapeHtml(w.location)}</p>`);
  if (w.summary) parts.push(`  <p>${escapeHtml(w.summary).replace(/\n/g, '<br>')}</p>`);
  for (const h of w.highlights || []) parts.push(`  <p>• ${escapeHtml(h)}</p>`);
  const skillsHtml = renderEmbeddedSkills(w.skills);
  if (skillsHtml) parts.push(`  ${skillsHtml}`);
  const projsHtml = renderEmbeddedProjects(w.projects, projects, t);
  if (projsHtml) parts.push(indentLines(projsHtml, 2));
  const volsHtml = renderEmbeddedVolunteer(volunteer, w.company, lang, t);
  if (volsHtml) parts.push(indentLines(volsHtml, 2));
  const refsHtml = renderEmbeddedReferenceLinks(references, w.company, t);
  if (refsHtml) parts.push(`  ${refsHtml}`);
  parts.push('</article>');
  return parts.join('\n');
}

function renderEducationItem(e, lang, projects, volunteer, references, t) {
  const parts = [
    '<article class="education-item">',
    `  <h3>${escapeHtml(e.studyType)}${e.area ? `${lang === 'en' ? ' in ' : ' — '}${escapeHtml(e.area)}` : ''}</h3>`,
    `  <p class="institution">${escapeHtml(e.institution)}</p>`,
    `  <p class="date">${dateRangeHtml(e.startDate, e.endDate, lang)}</p>`,
  ];
  if (e.gpa) parts.push(`  <p>${escapeHtml(e.gpa)}</p>`);
  if (e.summary) parts.push(`  <p>${escapeHtml(e.summary).replace(/\n/g, '<br>')}</p>`);
  const skillsHtml = renderEmbeddedSkills(e.skills);
  if (skillsHtml) parts.push(`  ${skillsHtml}`);
  const projsHtml = renderEmbeddedProjects(e.projects, projects, t);
  if (projsHtml) parts.push(indentLines(projsHtml, 2));
  const volsHtml = renderEmbeddedVolunteer(volunteer, e.institution, lang, t);
  if (volsHtml) parts.push(indentLines(volsHtml, 2));
  const refsHtml = renderEmbeddedReferenceLinks(references, e.institution, t);
  if (refsHtml) parts.push(`  ${refsHtml}`);
  parts.push('</article>');
  return parts.join('\n');
}

function renderWorkSection(resume, lang, t) {
  if (!resume.work?.length) return null;
  const items = resume.work
    .map((w) =>
      indentLines(
        renderExperienceItem(
          w,
          lang,
          resume.projects || [],
          resume.volunteer || [],
          resume.references || [],
          t,
        ),
        2,
      ),
    )
    .join('\n');
  return [
    '<section id="experience">',
    `  <h2>${escapeHtml(t.experience)}</h2>`,
    items,
    '</section>',
  ].join('\n');
}

function renderEducationSection(resume, lang, t) {
  if (!resume.education?.length) return null;
  const items = resume.education
    .map((e) =>
      indentLines(
        renderEducationItem(
          e,
          lang,
          resume.projects || [],
          resume.volunteer || [],
          resume.references || [],
          t,
        ),
        2,
      ),
    )
    .join('\n');
  return [
    '<section id="education">',
    `  <h2>${escapeHtml(t.education)}</h2>`,
    items,
    '</section>',
  ].join('\n');
}

function renderReferencesSection(resume, t) {
  if (!resume.references?.length) return null;
  const items = resume.references
    .map((r, idx) =>
      indentLines(
        [
          `<article class="reference-item" id="ref-${idx}">`,
          `  <p><strong>${escapeHtml(r.name)}</strong></p>`,
          `  <blockquote>${escapeHtml(r.reference).replace(/\n/g, '<br>')}</blockquote>`,
          '</article>',
        ].join('\n'),
        2,
      ),
    )
    .join('\n');
  return [
    '<section id="references">',
    `  <h2>${escapeHtml(t.references)}</h2>`,
    items,
    '</section>',
  ].join('\n');
}

// Maps a section name from meta.sectionOrder to a renderer for the HTML main
// column. Sections not listed here (skills/languages/dailyLife → sidebar,
// awards/interests → not part of the HTML site) are silently skipped when they
// appear in the order.
const MAIN_RENDERERS = {
  about: (resume, lang, t) => renderAbout(resume, t),
  work: renderWorkSection,
  education: renderEducationSection,
  references: (resume, lang, t) => renderReferencesSection(resume, t),
};

function generateMain(resume, lang) {
  const t = I18N[lang];
  const order = resume.meta?.sectionOrder ?? ['about', 'work', 'education', 'references'];
  const sections = order
    .map((name) => MAIN_RENDERERS[name]?.(resume, lang, t))
    .filter(Boolean);
  return sections.join('\n\n');
}

module.exports = { generateMain };
