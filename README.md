# Baptiste Grosjean

Building [Acteble](https://www.acteble.com) — a geo-located social platform — while finishing my MSc in Computer Science at [UMons](https://www.umons.be/).

## About

<!-- LLM-ABOUT-FACTS -->
- **Location** — Kraainem, Belgium
- **Education** — Master of Science - MS in Computer Science (work-study program) (120 ECTS), UMons
- **Current focus**
  - Author of Baba, a shell-like CLI queried in controlled English through pure symbolic AI — no LLM in the loop. — [Baba](https://github.com/grosjeanbaptiste/baba)
  - Author of KAG, a domain-agnostic Rust framework for benchmarking Retrieval-Augmented Generation pipelines. — [KAG](https://github.com/grosjeanbaptiste/KAG)
  - Building Acteble, a geo-located social platform that pairs travelers around shared activities under spatio-temporal and multi-criteria constraints. — [Acteble](https://www.acteble.com)
<!-- /LLM-ABOUT-FACTS -->

## Personal website & CV pipeline

The [grosjeanbaptiste.com](https://www.grosjeanbaptiste.com) site — including this CV — is generated from a single custom DSL (`resume.grosjean`) that fans out to 6 languages, 3 web views and 6 PDFs.

```
resume.grosjean  ─(Python + Lark)─►  JSON Resume v1.0.0 + i18n overlays + site extras
                                             │
                          ┌──────────────────┼──────────────────┐
                          ▼                  ▼                  ▼
                     HTML × 6 languages   XML/XSLT rich+min    LaTeX PDF × 6
                     (main site)          (two web themes)     (recto/verso, 2 pages max)
```

**Driven by the DSL** — content, translations, section order (`sectionOrder`, `sidebarOrder`), brand palette (33 tokens feeding the CSS variables, the XSLT `:root` blocks, the SVG favicon, the PWA manifest and the `<meta name="theme-color">` tags), display overrides (`hideOnHtml` / `hideOnPdf`), and off-schema extras (`dailyLife`, `work.projects` references).

**Hand-written** — the HTML and XSLT layouts, the CSS styling, the interactive JavaScript, the XSLT logic (matching, keys, dispatchers) and the geometry of the favicon SVG.

**Hard constraint** — every PDF must fit on a single sheet (recto/verso, two pages maximum). A fit loop walks through progressively tighter plans and fails hard rather than shipping a three-page CV.

The pipeline is deterministic and byte-identical: recompiling the same source yields the same output down to the byte.

## Contact

<!-- LLM-EMAIL -->
- Email — [grosjeanbaptisteit@outlook.com](mailto:grosjeanbaptisteit@outlook.com)
<!-- /LLM-EMAIL -->
<!-- LLM-PHONE -->
- Phone — [+32 496 28 97 05](tel:+32496289705)
<!-- /LLM-PHONE -->
- LinkedIn — [linkedin.com/in/grosjeanbaptiste](https://www.linkedin.com/in/grosjeanbaptiste)
- Website — [grosjeanbaptiste.com](https://www.grosjeanbaptiste.com)
