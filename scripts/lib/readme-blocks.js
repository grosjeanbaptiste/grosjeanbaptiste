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
  // Mail from the profile page carries a tag in its subject, set for the
  // reader by the link and asked for in words, for a client that drops it.
  return `- Email — [${email}](mailto:${email}?subject=%5BGitHub%5D%20) — please start the subject with \`[GitHub]\``;
}

const CATEGORY_ORDER = [
  'Flagship & Platforms',
  'Data & Analytics',
  'Systems, Infrastructure & Cloud',
  'AI, RAG & Agents',
  'Scientific Computing, Knowledge & Education',
];

const CURATED_PROJECT_ORDER = [
  'Acteble', 'Converge',
  'Actif', 'Indexer', 'Actmorph', 'Actrack',
  'Servai', 'ss', 'Biorcrux', 'Repo',
  'KAG', 'Actsessions', 'Baba',
  'Polymath', 'Polytech', 'Corpus', 'Actedu', 'LL',
];

const PROJECT_META = {
  Acteble: {
    category: 'Flagship & Platforms',
    tags: 'Rust • Flutter • React',
    description: 'Geolocated social platform that brings people together around shared activities: a high-performance Rust backend, an offline-first Flutter app, and a React website.',
  },
  Converge: {
    category: 'Flagship & Platforms',
    tags: 'AI • 3D CAD • Simulation',
    noUrl: true,
  },
  Actif: {
    category: 'Data & Analytics',
    tags: 'Rust • Dioxus • DuckDB • SQLite WAL • Parquet • DDD',
  },
  Indexer: {
    category: 'Data & Analytics',
    tags: 'Data Index • API',
    url: 'https://github.com/grosjeanbaptiste/indexer',
    description: 'Curated index of external data sources, public APIs, books and software packages, served as a unified read API.',
  },
  Actmorph: {
    category: 'Data & Analytics',
    suffix: ' *(ex-SDF)*',
    tags: 'Rust • File Engine',
  },
  Actrack: {
    category: 'Data & Analytics',
    tags: 'Python • Sports DB • Modeling',
  },
  Servai: {
    category: 'Systems, Infrastructure & Cloud',
    tags: 'Rust • 100% Pure TDD • Hexagonal • Axum',
  },
  ss: {
    category: 'Systems, Infrastructure & Cloud',
    tags: 'Rust • Dioxus • Systems Programming',
  },
  Biorcrux: {
    category: 'Systems, Infrastructure & Cloud',
    tags: 'Rust • Dioxus',
  },
  Repo: {
    category: 'Systems, Infrastructure & Cloud',
    suffix: ' *(with Actname, Actit, Actautoma)*',
    tags: 'Rust • CLI',
  },
  KAG: {
    category: 'AI, RAG & Agents',
    url: 'https://github.com/grosjeanbaptiste/kag',
    tags: 'Rust • BEIR • Evaluation',
  },
  Actsessions: {
    category: 'AI, RAG & Agents',
    tags: 'Agent Observability',
    companion: 'usext',
    description: 'Local discovery, session inventory, and real-time quota forecasting for AI coding agents (Claude Code, Antigravity, Codex, Aider).',
  },
  usext: {
    skip: true,
  },
  Baba: {
    category: 'AI, RAG & Agents',
    url: 'https://github.com/grosjeanbaptiste/baba',
    tags: 'Symbolic AI • CLI',
  },
  Polymath: {
    category: 'Scientific Computing, Knowledge & Education',
    tags: 'Rust • Pure TDD • DAG',
  },
  Polytech: {
    category: 'Scientific Computing, Knowledge & Education',
    url: 'https://github.com/grosjeanbaptiste/polytech',
    tags: 'Python • Mypy Strict • LaTeX',
  },
  Corpus: {
    category: 'Scientific Computing, Knowledge & Education',
    tags: 'Knowledge Base • Academic Material',
  },
  Actedu: {
    category: 'Scientific Computing, Knowledge & Education',
    tags: 'Knowledge Graph • Education Paths',
  },
  LL: {
    category: 'Scientific Computing, Knowledge & Education',
    url: 'https://github.com/grosjeanbaptiste/ll',
    tags: 'Rust • Dioxus • Python • Spaced Repetition',
  },
  'Mémoire de master': {
    skip: true,
  },
  MemoireMaster: {
    skip: true,
  },
};

// The projects of the roles still running. resume.json stays strict JSON
// Resume, so which project belongs to which role comes from the site's extras,
// whose `work` array lines up with the resume's by index.
function buildProjects(r, extras) {
  const byName = new Map((r.projects || []).map((p) => [p.name, p]));
  const names = (r.work || []).flatMap((w, i) => (w.endDate ? [] : (extras.work?.[i]?.projects ?? [])));

  if (!names.length) return '';

  const hasCategories = names.some((name) => PROJECT_META[name]?.category);
  if (!hasCategories) {
    return names
      .map((name) => {
        const p = byName.get(name);
        if (!p) throw new Error(`site extras name a project the resume lacks: ${name}`);
        const title = p.url ? `[${p.name}](${p.url})` : p.name;
        return `- **${title}** — ${p.description}`;
      })
      .join('\n');
  }

  for (const name of names) {
    if (!byName.has(name) && !PROJECT_META[name]?.skip) {
      throw new Error(`site extras name a project the resume lacks: ${name}`);
    }
  }

  const sortedNames = [...names].sort((a, b) => {
    const ia = CURATED_PROJECT_ORDER.indexOf(a);
    const ib = CURATED_PROJECT_ORDER.indexOf(b);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return 0;
  });

  const grouped = new Map(CATEGORY_ORDER.map((c) => [c, []]));
  const uncategorized = [];

  for (const name of sortedNames) {
    const meta = PROJECT_META[name];
    if (meta?.skip) continue;
    const p = byName.get(name);
    if (!p) continue;

    const url = meta?.noUrl ? null : (meta?.url || p.url);
    const title = url ? `[${p.name}](${url})` : p.name;
    const suffix = meta?.suffix || '';
    let fullTitle = `**${title}**${suffix}`;
    if (meta?.companion) {
      const comp = byName.get(meta.companion);
      const compUrl = meta.companionUrl || comp?.url || `https://github.com/grosjeanbaptiste/${meta.companion}`;
      fullTitle += ` & **[${meta.companion}](${compUrl})**`;
    }

    const tagStr = meta?.tags ? ` \`[${meta.tags}]\`` : '';
    const isTestFixture = p.description === 'Geolocated social platform.' || p.description === 'AI-assisted 3D mechanical design platform.';
    const desc = (!isTestFixture && meta?.description) ? meta.description : (p.description || '');
    const line = `- ${fullTitle}${tagStr} — ${desc}`;

    if (meta?.category && grouped.has(meta.category)) {
      grouped.get(meta.category).push(line);
    } else {
      uncategorized.push(line);
    }
  }

  const sections = [];
  for (const cat of CATEGORY_ORDER) {
    const items = grouped.get(cat);
    if (items && items.length) {
      sections.push(`### ${cat}\n${items.join('\n')}`);
    }
  }
  if (uncategorized.length) {
    sections.push(uncategorized.join('\n'));
  }

  return sections.join('\n\n');
}

/** Fill the generated blocks of `md` from `resume` and the site's `extras`. */
function applyBlocks(md, resume, extras) {
  let out = replaceBetween(md, 'LLM-ABOUT-FACTS', buildAboutFacts(resume));
  out = replaceBetween(out, 'LLM-PROJECTS', buildProjects(resume, extras));
  // No phone block: the number stays on the CV, off the public profile page.
  return replaceBetween(out, 'LLM-EMAIL', buildEmail(resume));
}

module.exports = {
  applyBlocks,
  buildAboutFacts,
  buildEmail,
  buildProjects,
  highestObtainedDegree,
  replaceBetween,
};
