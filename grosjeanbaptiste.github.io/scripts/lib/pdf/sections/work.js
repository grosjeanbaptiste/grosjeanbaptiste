const { tex, truncate, formatDate } = require('../tex');
const { topN } = require('../data');
const { appendItemTrailer } = require('./_trailer');

function renderWorkEntry(w, lang, resume, t, limits, { continuation } = {}) {
  const start = formatDate(w.startDate, lang);
  const end = formatDate(w.endDate, lang);
  // Reserve vertical space so the header is never orphaned at a column edge.
  const parts = ['\\par\\needspace{5\\baselineskip}'];
  if (continuation) {
    // Second (or later) role at the same company: skip the "| Company" +
    // location repeat that was already printed above and just show the
    // position + date span, so multiple roles at the same employer stack
    // tightly instead of duplicating the header.
    parts.push(
      `\\cvevent{${tex(w.position)}}{}{${tex(start)} -- ${tex(end)}}{}`,
    );
  } else {
    parts.push(
      `\\cvevent{${tex(w.position)}}{| ${tex(w.company)}}{${tex(start)} -- ${tex(end)}}{${tex(w.location || '')}}`,
    );
  }
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
    const previous = i > 0 ? arr[i - 1] : null;
    const continuation = previous && previous.company === w.company;
    parts.push(...renderWorkEntry(w, lang, resume, t, limits, { continuation }));
    if (i < arr.length - 1) {
      // Same company as next → tighter separator; different → full divider.
      parts.push(arr[i + 1].company === w.company ? '\\smallskip' : '\\divider');
    }
  });
  return parts.join('\n');
}

module.exports = { buildWork };
