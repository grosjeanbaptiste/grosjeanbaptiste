const { tex, nohyphen, truncate, formatDate } = require('../tex');
const { topN } = require('../data');
const { appendItemTrailer } = require('./_trailer');

function groupByCompany(entries) {
  const groups = [];
  for (const w of entries) {
    const last = groups[groups.length - 1];
    if (last && last[0].company === w.company) last.push(w);
    else groups.push([w]);
  }
  return groups;
}

function renderStandalone(w, lang, resume, t, limits) {
  const start = formatDate(w.startDate, lang);
  const end = formatDate(w.endDate, lang);
  const parts = [
    '\\par\\needspace{5\\baselineskip}',
    `\\cvevent{${nohyphen(w.position)}}{| ${nohyphen(w.company)}}{${tex(start)} -- ${tex(end)}}{${nohyphen(w.location || '')}}`,
  ];
  if (w.summary) {
    parts.push(`\\begin{itemize}\\item ${tex(truncate(w.summary, limits.summary))}\\end{itemize}`);
  }
  appendItemTrailer(parts, w, resume, t, limits);
  return parts;
}

function renderCompanyHeader(w) {
  // Same visual weight as \cvevent's title row, minus the position — company
  // becomes the block anchor, location goes to the right.
  return `\\noindent{\\large\\bfseries\\color{emphasis}${nohyphen(w.company)}}\\hfill{\\itshape\\color{accent}${nohyphen(w.location || '')}}\\par`;
}

function renderRoleUnderHeader(w, lang, resume, t, limits) {
  const start = formatDate(w.startDate, lang);
  const end = formatDate(w.endDate, lang);
  const parts = [
    `\\noindent{\\bfseries ${nohyphen(w.position)}}\\hfill{\\color{accent}${tex(start)} -- ${tex(end)}}\\par`,
  ];
  if (w.summary) {
    parts.push(`\\begin{itemize}\\item ${tex(truncate(w.summary, limits.summary))}\\end{itemize}`);
  }
  appendItemTrailer(parts, w, resume, t, limits);
  return parts;
}

function buildWork(resume, t, lang, limits) {
  const selected = topN(resume.work, limits.work);
  if (!selected.length) return '';
  const parts = [`\\cvsection{${tex(t.experience)}}`];
  const groups = groupByCompany(selected);
  groups.forEach((group, gi) => {
    if (group.length === 1) {
      parts.push(...renderStandalone(group[0], lang, resume, t, limits));
    } else {
      parts.push('\\par\\needspace{5\\baselineskip}');
      parts.push(renderCompanyHeader(group[0]));
      group.forEach((w, ri) => {
        parts.push('\\smallskip');
        parts.push(...renderRoleUnderHeader(w, lang, resume, t, limits));
      });
    }
    if (gi < groups.length - 1) parts.push('\\divider');
  });
  return parts.join('\n');
}

module.exports = { buildWork };
