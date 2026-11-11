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
### Flagship & Platforms
- **[Acteble](https://www.acteble.com)** `[Rust • Flutter • React]` — Geolocated social platform that brings people together around shared activities: a high-performance Rust backend, an offline-first Flutter app, and a React website.
- **Converge** `[AI • 3D CAD • Simulation]` — AI-assisted 3D mechanical design platform that orchestrates open-source geometry, meshing and simulation engines.

### Data & Analytics
- **[Actif](https://github.com/grosjeanbaptiste/Actif)** `[Rust • Dioxus • DuckDB • SQLite WAL • Parquet • DDD]` — Desktop application and analytical engine for global financial markets (stocks, ETFs, bonds, FX, crypto, indices) with vectorized analytical storage and hexagonal architecture in TDD.
- **[Indexer](https://github.com/grosjeanbaptiste/indexer)** `[Data Index • API]` — Curated index of external data sources, public APIs, books and software packages, served as a unified read API.
- **[Actmorph](https://github.com/grosjeanbaptiste/Actmorph)** *(ex-SDF)* `[Rust • File Engine]` — Universal cataloging engine and format-agnostic file metadata extraction system.
- **[Actrack](https://github.com/grosjeanbaptiste/actrack)** `[Python • Sports DB • Modeling]` — Multi-sport database and predictive modeling platform evaluating match outcomes across leagues and tournaments through ensemble rating strategies.

### Systems, Infrastructure & Cloud
- **[Servai](https://github.com/grosjeanbaptiste/servai)** `[Rust • 100% Pure TDD • Hexagonal • Axum]` — Universal orchestrator for full server and cloud administration (DNS zones, TLS Let's Encrypt certificates, WireGuard VPNs, OpenTofu, Ansible) with a reactive REST API powering Bioxus UI.
- **[ss](https://github.com/grosjeanbaptiste/ss)** `[Rust • Dioxus • Systems Programming]` — Modular system supervisor and diagnostic suite (processes, memory, storage volumes, network telemetry, power) driving CLI and Dioxus desktop interfaces.
- **[Bioxus](https://github.com/grosjeanbaptiste/bioxus)** `[Rust • Dioxus]` — Modular library providing declarative UI components, persistence, charting, and internationalization for multiplatform desktop applications.
- **[Repo](https://github.com/grosjeanbaptiste/repo)** *(with Actname, Actit, Actautoma)* `[Rust • CLI]` — CLI tooling suite for semantic naming, collision detection, and declarative scaffolding of Git / GitHub repositories.

### AI, RAG & Agents
- **[KAG](https://github.com/grosjeanbaptiste/kag)** `[Rust • BEIR • Evaluation]` — Purely algorithmic Rust framework that benchmarks interchangeable RAG pipeline components on BEIR and ships the best measured configuration as a question-answering CLI with cited sources.
- **[Actsessions](https://github.com/grosjeanbaptiste/actsessions)** & **[usext](https://github.com/grosjeanbaptiste/usext)** `[Agent Observability]` — Local discovery, session inventory, and real-time quota forecasting for AI coding agents (Claude Code, Antigravity, Codex, Aider).
- **[Baba](https://github.com/grosjeanbaptiste/baba)** `[Symbolic AI • CLI]` — Shell-like CLI queried in controlled English through pure symbolic AI — no LLM in the loop.

### Scientific Computing, Knowledge & Education
- **[Polymath](https://github.com/grosjeanbaptiste/polymath)** `[Rust • Pure TDD • DAG]` — Universal graph of computation packages interconnecting scientific disciplines without redundancy via the Rust type system.
- **[Polytech](https://github.com/grosjeanbaptiste/polytech)** `[Python • Mypy Strict • LaTeX]` — Engineering-studies library that computes every number and expression of LaTeX worked solutions, none typed by hand.
- **[Corpus](https://github.com/grosjeanbaptiste/corpus)** `[Knowledge Base • Academic Material]` — Aggregated repository of university course materials, lecture notes, and assignments sourced across Moodle platforms and academic portals, with exact worked solutions.
- **[Actedu](https://github.com/grosjeanbaptiste/actedu)** `[Knowledge Graph • Education Paths]` — Global graph-based mapping and visualization of higher-education academic paths, prerequisite dependencies, course trajectories, and degree pathways.
- **[LL](https://github.com/grosjeanbaptiste/ll)** `[Rust • Dioxus • Python • Spaced Repetition]` — Spaced-repetition vocabulary trainer for six languages, each word taught with an aligned example sentence in every language.
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

## GitHub Stats

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github-stats-extended.vercel.app/api?username=grosjeanbaptiste&show_icons=true&include_all_commits=true&count_private=true&theme=github_dark&hide_border=true">
    <source media="(prefers-color-scheme: light)" srcset="https://github-stats-extended.vercel.app/api?username=grosjeanbaptiste&show_icons=true&include_all_commits=true&count_private=true&hide_border=true">
    <img src="https://github-stats-extended.vercel.app/api?username=grosjeanbaptiste&show_icons=true&include_all_commits=true&count_private=true&hide_border=true" alt="GitHub Stats" />
  </picture>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github-stats-extended.vercel.app/api/top-langs/?username=grosjeanbaptiste&layout=compact&theme=github_dark&hide_border=true">
    <source media="(prefers-color-scheme: light)" srcset="https://github-stats-extended.vercel.app/api/top-langs/?username=grosjeanbaptiste&layout=compact&hide_border=true">
    <img src="https://github-stats-extended.vercel.app/api/top-langs/?username=grosjeanbaptiste&layout=compact&hide_border=true" alt="Top Languages" />
  </picture>
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://streak-stats.demolab.com/?user=grosjeanbaptiste&theme=dark&hide_border=true">
    <source media="(prefers-color-scheme: light)" srcset="https://streak-stats.demolab.com/?user=grosjeanbaptiste&hide_border=true">
    <img src="https://streak-stats.demolab.com/?user=grosjeanbaptiste&hide_border=true" alt="GitHub Streak" />
  </picture>
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github-trophies.devomb.com/?username=grosjeanbaptiste&theme=onedark&no-frame=true&no-bg=true&margin-w=4">
    <source media="(prefers-color-scheme: light)" srcset="https://github-trophies.devomb.com/?username=grosjeanbaptiste&theme=flat&no-frame=true&no-bg=true&margin-w=4">
    <img src="https://github-trophies.devomb.com/?username=grosjeanbaptiste&theme=flat&no-frame=true&no-bg=true&margin-w=4" alt="GitHub Trophies" />
  </picture>
</p>

## Contact

<!-- LLM-EMAIL -->
- Email — [grosjeanbaptiste@outlook.com](mailto:grosjeanbaptiste@outlook.com?subject=%5BGitHub%5D%20) — please start the subject with `[GitHub]`
<!-- /LLM-EMAIL -->
- LinkedIn — [linkedin.com/in/grosjeanbaptiste](https://www.linkedin.com/in/grosjeanbaptiste)
- Website — [grosjeanbaptiste.com](https://www.grosjeanbaptiste.com)

## Support

If you appreciate my open-source projects, tools, or research, you can support my independent work:

<p align="center">
  <a href="https://www.paypal.com/donate/?hosted_button_id=JSTZMQ2Q4ZBL4" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="55" />
  </a>
</p>
