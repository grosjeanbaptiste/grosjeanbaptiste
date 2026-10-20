# Baptiste Grosjean

Building [Acteble](https://www.acteble.com) — a geo-located social platform — after earning my MSc in Computer Science at [UMons](https://www.umons.be/).

## About

<!-- LLM-ABOUT-FACTS -->
- **Location** — Kraainem, Belgium
- **Education** — Master of Science - MSc in Computer Science (work-study program) — specialised professional focus (120 ECTS), UMons
- **Current focus**
  - Sole founder, architect and developer. — [Acteble](https://www.acteble.com)
<!-- /LLM-ABOUT-FACTS -->

## Projects

<!-- LLM-PROJECTS -->
- **[Acteble](https://www.acteble.com)** — Geolocated social platform that brings people together around shared activities: a Rust backend, an offline-first Flutter app and a React website.
- **Mémoire de master** — MSc dissertation at UMONS — the R&D of Acteble's planning engine.
- **Actrack** — Forecasts of the FIFA World Cup 2026 from an ensemble of football-rating strategies.
- **LL** — Spaced-repetition vocabulary trainer for six languages, each word taught with an aligned example sentence in every language.
- **Baba** — Shell-like CLI queried in controlled English through pure symbolic AI — no LLM in the loop.
- **KAG** — Purely algorithmic Rust framework that benchmarks interchangeable RAG pipeline components on BEIR and ships the best measured configuration as a question-answering CLI with cited sources.
<!-- /LLM-PROJECTS -->

## Personal website & CV pipeline

The [grosjeanbaptiste.com](https://www.grosjeanbaptiste.com) site — including this CV — is generated from a single custom DSL (`resume.grosjean`) that fans out to 6 languages, 3 web views, 6 CV PDFs and 18 timeline PDFs.

```
resume.grosjean  ─(Python + Lark)─►  JSON Resume v1.0.0 + i18n overlays + site extras
                                             │
                          ┌──────────────────┼──────────────────┐
                          ▼                  ▼                  ▼
                     HTML × 6 languages   XML/XSLT rich+min    LaTeX PDF × 6 + timeline × 18
                     (main site)          (two web themes)     (recto/verso, 2 pages max;
                                                                landscape timeline: whole
                                                                career, 5 years, 2 years)
```

**Driven by the DSL** — content, translations, section order (`sectionOrder`, `sidebarOrder`), brand palette (33 tokens feeding the CSS variables, the XSLT `:root` blocks, the SVG favicon, the PWA manifest and the `<meta name="theme-color">` tags), display overrides (`hideOnHtml` / `hideOnPdf`), and off-schema extras (`dailyLife`, `work.projects` references, events such as conferences, hackathons and races).

**Hand-written** — the HTML and XSLT layouts, the CSS styling, the interactive JavaScript, the XSLT logic (matching, keys, dispatchers) and the geometry of the favicon SVG.

**Hard constraint** — every PDF must fit on a single sheet (recto/verso, two pages maximum). A fit loop walks through progressively tighter plans and fails hard rather than shipping a three-page CV.

The pipeline is deterministic and byte-identical: recompiling the same source yields the same output down to the byte.

## Contact

<!-- LLM-EMAIL -->
- Email — [grosjeanbaptiste@outlook.com](mailto:grosjeanbaptiste@outlook.com)
<!-- /LLM-EMAIL -->
<!-- LLM-PHONE -->
- Phone — [+32 496 28 97 05](tel:+32496289705)
<!-- /LLM-PHONE -->
- LinkedIn — [linkedin.com/in/grosjeanbaptiste](https://www.linkedin.com/in/grosjeanbaptiste)
- Website — [grosjeanbaptiste.com](https://www.grosjeanbaptiste.com)
