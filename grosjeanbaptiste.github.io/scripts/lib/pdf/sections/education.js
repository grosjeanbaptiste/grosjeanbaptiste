// Education block — rendered in the wide main column (right of the paracol
// split), right below Work. Each entry uses the altacv \cvevent layout:
// title (studyType in area) / institution / date range / gpa. Optional
// summary paragraph follows underneath. Skill tags and embedded projects
// from resume.json are intentionally skipped to stay inside the 2-page
// budget; they remain available in resume.json for the HTML site.
const { tex, nohyphen, formatDate, truncate } = require('../tex');
const { topN } = require('../data');

function renderSummary(text, max) {
  if (!text) return null;
  const clean = truncate(text, max);
  if (!clean) return null;
  return `\\noindent\\raggedright{\\footnotesize ${tex(clean)}}\\par`;
}

function renderEducationEntry(e, lang, t, limits) {
  const start = formatDate(e.startDate, lang);
  const end = formatDate(e.endDate, lang);
  // \cvevent's title + subtitle land in \altacvevent{...}{...} boxes that
  // altacv doesn't \raggedright'ify, so a long word like "Professional" gets
  // hyphenated to "Pro-fessional" at the box edge. Wrap every word in \mbox{}
  // (via nohyphen) to make the word atomic.
  const title = e.area
    ? `${nohyphen(e.studyType)} ${nohyphen(t.degreeIn)} ${nohyphen(e.area)}`
    : nohyphen(e.studyType);
  const dates = `${tex(start)} -- ${tex(end)}`;
  const parts = [
    `\\cvevent{${title}}{${nohyphen(e.institution)}}{${dates}}{${e.gpa ? nohyphen(e.gpa) : ''}}`,
  ];
  const summary = renderSummary(e.summary, limits.summary);
  if (summary) parts.push(summary);
  return parts;
}

function buildEducation(resume, t, lang, limits) {
  const selected = topN(resume.education, limits.education);
  if (!selected.length) return '';
  const parts = [`\\cvsection{${nohyphen(t.education)}}`];
  selected.forEach((e, i, arr) => {
    parts.push(...renderEducationEntry(e, lang, t, limits));
    if (i < arr.length - 1) parts.push('\\divider');
  });
  return parts.join('\n');
}

module.exports = { buildEducation };
