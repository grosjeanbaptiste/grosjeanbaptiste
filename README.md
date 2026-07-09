<!-- <p align="center">
  <img src="https://your-banner-image-link.com/banner.png" alt="Baptiste Grosjean's GitHub Profile" width="100%">
</p> -->

# 🚀 Baptiste Grosjean

![Alt](https://repobeats.axiom.co/api/embed/601d142a2d9ac9943a6abc89ae573571f9c8f2ff.svg "Repobeats analytics image")

## GitHub Stats

<a href="https://github.com/grosjeanbaptiste">
  <img height="180em" src="https://github-readme-stats.vercel.app/api?username=grosjeanbaptiste&show_icons=true&theme=dark&bg_color=0d1117&title_color=9f7aea&text_color=ffffff&icon_color=9f7aea&hide_border=true&count_private=true" alt="GrosjeanBaptiste's GitHub Stats" />
  <img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=grosjeanbaptiste&theme=dark&bg_color=0d1117&title_color=9f7aea&text_color=ffffff&hide_border=true&layout=compact" 
    alt="Grosjean Baptiste GitHub Top Languages" />
</a>

## 👨‍💻 About Me

Building [Acteble](https://www.acteble.com) — a geo-located social platform — while finishing my MSc in Computer Science at [UMons](https://www.umons.be/).

<!-- LLM-ABOUT-FACTS -->
- **📍 Location**: Kraainem, Belgium
- **🎓 Education**: Master of Science - MS in Computer Science (work-study program) (120 ECTS), UMons
- **💻 Current Focus**: Building Acteble, a geo-located social platform that pairs travelers around shared activities under spatio-temporal and multi-criteria constraints. — [Acteble](https://www.acteble.com)
<!-- /LLM-ABOUT-FACTS -->
- **💼 Portfolio**: [View My Portfolio](https://my-way-bg.vercel.app/about/way)
- **📄 Resume**: [View My Resume](https://registry.jsonresume.org/grosjeanbaptiste)
- **🔍 Professional Profile**: [View on JSON Resume](https://registry.jsonresume.org/grosjeanbaptiste/dashboard)

## 🌐 Personal Website & CV Pipeline

The [grosjeanbaptiste.com](https://www.grosjeanbaptiste.com) site — including this CV — is generated from a single custom DSL (`resume.grosjean`) that fans out to 6 languages × 3 web views + 6 PDFs.

```
resume.grosjean  ─(Python + Lark)─►  JSON Resume v1.0.0 + i18n overlays + site extras
                                             │
                          ┌──────────────────┼──────────────────┐
                          ▼                  ▼                  ▼
                   HTML × 6 langues   XML/XSLT rich+min   LaTeX / altacv PDF × 6
                   (site principal)   (2 thèmes web)      (recto/verso, 2 pages max)
```

**Ce qui vient du DSL** : contenu, traductions, ordre des sections (`sectionOrder`, `sidebarOrder`), palette de marque (33 tokens qui pilotent les CSS variables, les XSLT `:root`, le favicon SVG, le manifest PWA et les `<meta name="theme-color">`), les overrides d'affichage (`hideOnHtml` / `hideOnPdf`), les extras hors-schéma (`dailyLife`, refs `work.projects`).

**Ce qui reste écrit à la main** : les layouts HTML/XSLT, le CSS de style, le JS interactif, la logique XSLT (matching, keys, dispatchers), la géométrie du favicon SVG.

**Contrainte dure** : chaque PDF tient sur 1 feuille recto/verso (max 2 pages). Un fit-loop itère plusieurs plans (plus riche → plus minimal) et échoue plutôt que de shipper un 3-pager.

Le pipeline est déterministe et byte-identical : recompiler la même source donne les mêmes fichiers au bit près.

<hr>

## 📫 Contact

<p align="center">
  <a href="https://www.linkedin.com/in/grosjeanbaptiste"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
  <!-- LLM-EMAIL -->
<a href="mailto:grosjeanbaptisteit@outlook.com"><img src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"></a>
<!-- /LLM-EMAIL -->
  <!-- LLM-PHONE -->
<a href="tel:+32496289705"><img src="https://img.shields.io/badge/Phone-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="Phone"></a>
<!-- /LLM-PHONE -->
</p>

---
_by Baptiste Grosjean_
