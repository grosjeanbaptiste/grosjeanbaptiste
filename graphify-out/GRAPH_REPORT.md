# Graph Report - grosjeanbaptiste  (2026-10-11)

## Corpus Check
- 13 files · ~146,847 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 4, .hbs 1, .css 1)

## Summary
- 93 nodes · 113 edges · 10 communities (8 shown, 2 thin omitted)
- Extraction: 87% EXTRACTED · 13% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.82)
- Token cost: 201,122 input · 0 output

## Community Hubs (Navigation)
- README Generator Script
- Theme Package Manifest
- CV Pipeline and Legacy Theme Page
- README Blocks Library
- Career Entities and CV Content
- Root Package Manifest
- Theme Handlebars Renderer
- Test Workflow and Marker Blocks
- Profile Photo (profil)
- Profile Photo (profill)

## God Nodes (most connected - your core abstractions)
1. `applyBlocks()` - 8 edges
2. `Main content (about, experience, education, projects, references)` - 7 edges
3. `Legacy JSON Resume theme CV page (rendered HTML)` - 6 edges
4. `Baptiste Grosjean` - 5 edges
5. `resume.grosjean custom DSL (Python + Lark)` - 5 edges
6. `JSON Resume v1.0.0 + i18n overlays + site extras` - 5 edges
7. `buildAboutFacts()` - 4 edges
8. `Brand palette (33 tokens)` - 4 edges
9. `dailyLifeChart (Chart.js doughnut of a typical day)` - 4 edges
10. `repository` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Legacy JSON Resume theme CV page (rendered HTML)` --semantically_similar_to--> `HTML output x 6 languages (main site)`  [INFERRED] [semantically similar]
  jsonresume-theme-grosjeanbaptiste/index.html → README.md
- `Inline CSS :root palette (6 colour variables)` --semantically_similar_to--> `Brand palette (33 tokens)`  [INFERRED] [semantically similar]
  jsonresume-theme-grosjeanbaptiste/index.html → README.md
- `test job (checkout, setup-node 20, npm test)` --shares_data_with--> `LLM marker blocks (LLM-ABOUT-FACTS, LLM-EMAIL, LLM-PHONE)`  [INFERRED]
  .github/workflows/test.yml → README.md
- `Legacy JSON Resume theme CV page (rendered HTML)` --references--> `Baptiste Grosjean`  [EXTRACTED]
  jsonresume-theme-grosjeanbaptiste/index.html → README.md
- `Main content (about, experience, education, projects, references)` --references--> `UMons (MSc in Computer Science)`  [EXTRACTED]
  jsonresume-theme-grosjeanbaptiste/index.html → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **CV pipeline fan-out from one DSL source** — readme_resume_grosjean_dsl, readme_json_resume, readme_html_output, readme_xml_xslt_themes, readme_latex_pdf [EXTRACTED 1.00]
- **Legacy theme page structure** — jsonresume_theme_grosjeanbaptiste_index_sidebar, jsonresume_theme_grosjeanbaptiste_index_main_content, jsonresume_theme_grosjeanbaptiste_index_css_palette, jsonresume_theme_grosjeanbaptiste_index_dailylifechart [INFERRED 0.85]

## Communities (10 total, 2 thin omitted)

### Community 0 - "README Generator Script"
Cohesion: 0.13
Nodes (12): { applyBlocks }, fs, loadResume(), main(), path, README, ROOT, assert (+4 more)

### Community 1 - "Theme Package Manifest"
Cohesion: 0.13
Nodes (14): author, dependencies, handlebars, description, keywords, license, main, name (+6 more)

### Community 2 - "CV Pipeline and Legacy Theme Page"
Cohesion: 0.23
Nodes (11): Chart.js (CDN), Inline CSS :root palette (6 colour variables), Legacy JSON Resume theme CV page (rendered HTML), dailyLifeChart (Chart.js doughnut of a typical day), Fixed sidebar (contact, skills, languages, daily life), Brand palette (33 tokens), HTML output x 6 languages (main site), JSON Resume v1.0.0 + i18n overlays + site extras (+3 more)

### Community 3 - "README Blocks Library"
Cohesion: 0.27
Nodes (10): applyBlocks(), buildAboutFacts(), buildEmail(), buildPhone(), highestObtainedDegree(), replaceBetween(), { applyBlocks, buildAboutFacts, buildEmail, buildPhone }, assert (+2 more)

### Community 4 - "Career Entities and CV Content"
Cohesion: 0.20
Nodes (10): EMVI (IT role), Hover-to-expand items (max-height transition), Main content (about, experience, education, projects, references), References section (Xtrada / Xtra Groep testimonials), VhAuctions NER Inventory Model project, Xtrada (Software Crafter / Data Scientist, NER model), Acteble (geo-located social platform), Baptiste Grosjean (+2 more)

### Community 5 - "Root Package Manifest"
Cohesion: 0.25
Nodes (7): description, name, private, scripts, readme, test, version

### Community 6 - "Theme Handlebars Renderer"
Cohesion: 0.29
Nodes (4): fs, Handlebars, path, handlebars

### Community 7 - "Test Workflow and Marker Blocks"
Cohesion: 0.67
Nodes (3): test job (checkout, setup-node 20, npm test), Tests GitHub Actions Workflow, LLM marker blocks (LLM-ABOUT-FACTS, LLM-EMAIL, LLM-PHONE)

## Knowledge Gaps
- **8 isolated node(s):** `Acteble (geo-located social platform)`, `Hover-to-expand items (max-height transition)`, `Chart.js (CDN)`, `EMVI (IT role)`, `Profile Photograph (profil.jpeg) - outdoor portrait of a person in glasses and a grey sweater over a white collared shirt, carrying a dark shoulder bag, in front of green foliage` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 47 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Legacy JSON Resume theme CV page (rendered HTML)` connect `CV Pipeline and Legacy Theme Page` to `Career Entities and CV Content`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Legacy JSON Resume theme CV page (rendered HTML)` (e.g. with `HTML output x 6 languages (main site)` and `JSON Resume v1.0.0 + i18n overlays + site extras`) actually correct?**
  _`Legacy JSON Resume theme CV page (rendered HTML)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Acteble (geo-located social platform)`, `Hover-to-expand items (max-height transition)`, `Chart.js (CDN)` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `README Generator Script` be split into smaller, more focused modules?**
  _Cohesion score 0.1323529411764706 - nodes in this community are weakly interconnected._
- **Why does `Baptiste Grosjean` connect `Career Entities and CV Content` to `CV Pipeline and Legacy Theme Page`, `Test Workflow and Marker Blocks`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Should `Theme Package Manifest` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Why does `Main content (about, experience, education, projects, references)` connect `Career Entities and CV Content` to `CV Pipeline and Legacy Theme Page`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._