const fs = require('node:fs');
const path = require('node:path');
const { RESUME_PATH, I18N_DIR, SITE_EXTRAS_PATH } = require('./config');

// Deep merge: overlay values overwrite base. Arrays are merged element-wise.
function deepMerge(base, overlay) {
  if (overlay === null || overlay === undefined) return base;
  if (Array.isArray(base) && Array.isArray(overlay)) {
    return base.map((b, i) => deepMerge(b, overlay[i]));
  }
  const bothObj =
    typeof base === 'object' &&
    base !== null &&
    typeof overlay === 'object' &&
    !Array.isArray(overlay);
  if (bothObj) {
    const out = { ...base };
    for (const k of Object.keys(overlay)) {
      if (k.startsWith('_')) continue;
      out[k] = deepMerge(base?.[k], overlay[k]);
    }
    return out;
  }
  return overlay;
}

// Merge site-extras (uses/notes/dailyLife dropped from strict resume.json)
// back into the resume tree so the HTML generators keep seeing the same
// shape they always have. Match order: institution → company → name.
function mergeExtras(resume, extras) {
  if (!extras) return resume;
  const patched = { ...resume };
  const patchList = (list, patches) => {
    if (!Array.isArray(list)) return list;
    return list.map((entry) => {
      const key = entry?.institution || entry?.company || entry?.name;
      const patch = patches.find((p) => p.match === key);
      if (!patch) return entry;
      const { match: _m, ...fields } = patch;
      return { ...entry, ...fields };
    });
  };
  if (extras.work) patched.work = patchList(patched.work, extras.work);
  if (extras.education) patched.education = patchList(patched.education, extras.education);
  if (extras.projects) patched.projects = patchList(patched.projects, extras.projects);
  if (extras.dailyLife) {
    patched.meta = { ...(patched.meta || {}), dailyLife: extras.dailyLife };
  }
  return patched;
}

function readExtras() {
  if (!fs.existsSync(SITE_EXTRAS_PATH)) return null;
  return JSON.parse(fs.readFileSync(SITE_EXTRAS_PATH, 'utf8'));
}

function loadResume(lang) {
  const canonical = JSON.parse(fs.readFileSync(RESUME_PATH, 'utf8'));
  const extras = readExtras();
  const withExtras = mergeExtras(canonical, extras);
  if (lang === 'en') return withExtras;
  const overlayPath = path.join(I18N_DIR, `${lang}.json`);
  if (!fs.existsSync(overlayPath)) {
    console.warn(`warning: no overlay for ${lang}, falling back to en`);
    return withExtras;
  }
  const overlay = JSON.parse(fs.readFileSync(overlayPath, 'utf8'));
  return deepMerge(withExtras, overlay);
}

module.exports = { deepMerge, loadResume, mergeExtras };
