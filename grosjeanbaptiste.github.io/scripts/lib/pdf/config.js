const path = require('node:path');

const ROOT = path.resolve(__dirname, '..', '..', '..');

const LANGS = ['en', 'fr', 'nl', 'es', 'de', 'zh'];

const BABEL = {
  en: 'english',
  fr: 'french',
  nl: 'dutch',
  es: 'spanish',
  de: 'german',
  zh: 'english', // zh skips babel's CJK option (poor support); xeCJK handles it.
};

const NEEDS_CJK = (lang) => lang === 'zh';

// Iterative "fit" plans: ordered from generous to ultra-tight. The compiler
// tries each plan in turn until the recto fits on one page (so the whole
// PDF is exactly 2 pages: recto + verso references).
//
// Priority: ~5 years of work experience must be visible on the recto before
// anything else. Every plan therefore keeps `work` high (10+ entries covers
// today back to 2021); when things get tight we first drop the full
// Education block from the main column (education_in_body=false — the
// sidebar's degrees summary keeps carrying the top two degrees) rather than
// cutting into the work timeline, and only then start shortening summaries
// and dropping optional blocks.
const FIT_PLANS = [
  {
    work: 12,
    education: 3,
    volunteer: 2,
    projects: 4,
    awards: 2,
    interests: 2,
    summary: 220,
    highlight: 150,
    hl_per_work: 1,
    kw_per_proj: 5,
    proj_desc: 120,
    show_skills: true,
    education_in_body: true,
  },
  {
    work: 12,
    education: 3,
    volunteer: 1,
    projects: 3,
    awards: 1,
    interests: 1,
    summary: 200,
    highlight: 130,
    hl_per_work: 1,
    kw_per_proj: 4,
    proj_desc: 110,
    show_skills: true,
    education_in_body: false,
  },
  {
    work: 10,
    education: 2,
    volunteer: 0,
    projects: 3,
    awards: 1,
    interests: 1,
    summary: 180,
    highlight: 100,
    hl_per_work: 1,
    kw_per_proj: 4,
    proj_desc: 100,
    show_skills: true,
    education_in_body: false,
  },
  {
    work: 10,
    education: 2,
    volunteer: 0,
    projects: 2,
    awards: 0,
    interests: 0,
    summary: 160,
    highlight: 0,
    hl_per_work: 0,
    kw_per_proj: 3,
    proj_desc: 80,
    show_skills: true,
    education_in_body: false,
  },
  {
    work: 8,
    education: 2,
    volunteer: 0,
    projects: 1,
    awards: 0,
    interests: 0,
    summary: 140,
    highlight: 0,
    hl_per_work: 0,
    kw_per_proj: 0,
    proj_desc: 60,
    show_skills: false,
    education_in_body: false,
  },
  {
    work: 6,
    education: 2,
    volunteer: 0,
    projects: 1,
    awards: 0,
    interests: 0,
    summary: 120,
    highlight: 0,
    hl_per_work: 0,
    kw_per_proj: 0,
    proj_desc: 50,
    show_skills: false,
    education_in_body: false,
  },
];

module.exports = {
  ROOT,
  CLS_PATH: path.join(ROOT, 'latex/altacv.cls'),
  PROFILE_IMG: path.join(ROOT, 'assets/images/profil.jpeg'),
  OUTPUT_DIR: path.join(ROOT, 'assets/cv'),
  LANGS,
  BABEL,
  NEEDS_CJK,
  FIT_PLANS,
};
