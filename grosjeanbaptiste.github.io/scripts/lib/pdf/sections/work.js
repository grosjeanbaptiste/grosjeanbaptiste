const { tex, nohyphen, truncate, formatDate } = require('../tex');
const { topN } = require('../data');
const { appendItemTrailer } = require('./_trailer');

function renderWorkEntry(w, lang, resume, t, limits) {
  const start = formatDate(w.startDate, lang);
  const end = formatDate(w.endDate, lang);
  // Uniform layout for every experience — position left, company right on
  // line 1; dates left, location right on line 2. Mirrors altacv's cvevent
  // typography (large emphasis title / large accent company / small accent
  // dates + location) but with the two poles swapped so the company anchors
  // the right edge instead of piggybacking on the position line.
  const parts = [
    '\\par\\needspace{5\\baselineskip}',
    `\\noindent{\\large\\color{emphasis}${nohyphen(w.position)}}\\hfill{\\large\\color{accent}${nohyphen(w.company)}}\\par`,
    `\\smallskip\\noindent{\\small\\color{accent}\\faCalendar\\color{emphasis}~${tex(start)} -- ${tex(end)}}\\hfill${
      w.location
        ? `{\\small\\color{accent}\\faMapMarker\\color{emphasis}~${nohyphen(w.location)}}`
        : ''
    }\\par\\medskip`,
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
  selected.forEach((w, i, arr) => {
    parts.push(...renderWorkEntry(w, lang, resume, t, limits));
    if (i < arr.length - 1) parts.push('\\divider');
  });
  return parts.join('\n');
}

module.exports = { buildWork };
