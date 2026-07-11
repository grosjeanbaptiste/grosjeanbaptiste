const { tex, nohyphen, truncate, formatDate } = require('../tex');
const { topN } = require('../data');
const { appendItemTrailer } = require('./_trailer');

function renderWorkEntry(w, lang, resume, t, limits, { continuation } = {}) {
  const start = formatDate(w.startDate, lang);
  const end = formatDate(w.endDate, lang);
  const parts = ['\\par\\needspace{5\\baselineskip}'];
  if (continuation) {
    // Successive role at the same company: position stays on the left, the
    // right slot carries the dates directly (no company repeat, no second
    // line, no location) so the block reads as one tighter stack.
    parts.push(
      `\\noindent\\parbox[t]{0.62\\linewidth}{\\raggedright\\large\\color{emphasis}${tex(w.position)}}\\hfill\\parbox[t]{0.35\\linewidth}{\\raggedleft\\small\\color{accent}\\faCalendar\\color{emphasis}~${tex(start)} -- ${tex(end)}}\\par\\medskip`,
    );
  } else {
    // Uniform header: position left, company right on line 1; dates left,
    // location right on line 2. Fixed-width \parbox columns so long titles
    // wrap on their own side instead of colliding with the company.
    parts.push(
      `\\noindent\\parbox[t]{0.62\\linewidth}{\\raggedright\\large\\color{emphasis}${tex(w.position)}}\\hfill\\parbox[t]{0.35\\linewidth}{\\raggedleft\\large\\color{accent}${tex(w.company)}}\\par`,
      `\\smallskip\\noindent{\\small\\color{accent}\\faCalendar\\color{emphasis}~${tex(start)} -- ${tex(end)}}\\hfill${
        w.location
          ? `{\\small\\color{accent}\\faMapMarker\\color{emphasis}~${tex(w.location)}}`
          : ''
      }\\par\\medskip`,
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
    const continuation = Boolean(previous && previous.company === w.company);
    parts.push(...renderWorkEntry(w, lang, resume, t, limits, { continuation }));
    if (i < arr.length - 1) {
      parts.push(arr[i + 1].company === w.company ? '\\smallskip' : '\\divider');
    }
  });
  return parts.join('\n');
}

module.exports = { buildWork };
