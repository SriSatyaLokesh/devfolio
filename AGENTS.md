# Project Guidelines: TheProFile

This is the single workspace instruction source for this repository.

## Scope

TheProFile is a Jekyll 4.x Portfolio-as-Code project.
Primary user workflow is editing [_data/profile.json](_data/profile.json) and deploying via GitHub Pages.

## Source Of Truth

Read these in order before making significant changes:

1. [AGENTS.md](AGENTS.md)
2. [docs/PRD.md](docs/PRD.md)
3. [docs/TRD.md](docs/TRD.md)
4. [README.md](README.md)
5. [CONTRIBUTING.md](CONTRIBUTING.md)

## Technical Stack

| Layer | Detail |
| :--- | :--- |
| **SSG** | Jekyll 4.x, Ruby, Liquid templates |
| **Styles** | modular SCSS in `_sass` + CSS Custom Properties |
| **Animations** | GSAP 3.12 + ScrollTrigger (CDN), Vanta.js + Three.js (CDN, conditional) |
| **Tech icons** | Simple Icons CDN via `tech_chip.html` |
| **Badges** | Shields.io via `badge_gen.html` |
| **JS** | Vanilla JS only (`smooth-scroll.js`, `gsap-animations.js`) |
| **Fonts** | Google Fonts: Space Grotesk (headings) + Archivo (body) |
| **Deploy** | GitHub Actions → GitHub Pages |


## Build And Test

Use Ruby/Bundler only.

1. Install dependencies: bundle install
2. Run dev server: bundle exec jekyll serve --livereload
3. Production build check (PowerShell): $env:JEKYLL_ENV="production"; bundle exec jekyll build

Notes:
- Current baseurl is /theprofile in [_config.yml](_config.yml); local URL is typically http://localhost:4000/theprofile/.
- CI deploy builds _site and publishes with [.github/workflows/deploy.yml](.github/workflows/deploy.yml).
- No formal automated test suite exists; use build + manual verification.

## Architecture & Directory Map

Core boundaries and structural layout:

```text
TheProFile/
├── _data/
│   ├── profile.json          ← USER'S FILE — never overwrite
│   └── profile.example.json  ← Keep fully documented, all fields
├── _includes/
│   ├── head.html             ← CSS var injection + theme init
│   ├── nav.html              ← Pill nav, theme toggle, hamburger
│   ├── badge_gen.html        ← ONLY place Shields.io URLs are built
│   ├── tech_chip.html        ← Simple Icons chip component
│   ├── vanta_init.html       ← Vanta.js init (conditional)
│   └── sections/             ← Section templates (hero, profile, etc.)
├── _layouts/
│   ├── default.html          ← Portfolio root wrapper
│   ├── blog-index.html       ← Blog listing layout
│   └── post.html             ← Individual blog post layout
├── _sass/                    ← Modular SCSS partials
├── assets/
│   ├── css/main.scss         ← Orchestrator (imports partials)
│   └── js/
│       ├── smooth-scroll.js  ← Scroll + theme + nav + scrollspy
│       └── gsap-animations.js ← GSAP scroll reveals
├── blog/                     ← Blog index page
└── _posts/                   ← Markdown blog posts
```

### Component Boundaries

1. Page orchestration: [index.html](index.html) + [_layouts/default.html](_layouts/default.html)
2. Section templates: [_includes/sections](_includes/sections)
3. Shared components: `badge_gen.html`, `tech_chip.html`, `vanta_init.html`, `audio_player.html`
4. Styles: `assets/css/main.scss` imports modular partials from `_sass`
5. Blog layer: [_layouts/blog-index.html](_layouts/blog-index.html), [_layouts/post.html](_layouts/post.html), [_posts/](_posts/)


## Data Contract: profile.json Schema

The primary user interface for content is `_data/profile.json`.

```jsonc
{
  "theme_config": {
    "mode": "dark",           // "dark" | "light"
    "vanta_effect": "birds",  // "net"|"waves"|"rings"|"fog"|"birds"|"clouds" | ""=disabled
    "colors": {
      "primary": "#0d1117",   // page background
      "secondary": "#161b22", // cards, nav
      "accent": "#58a6ff"     // links, highlights, Vanta color
    }
  },
  "name": "...",
  "headline": "...",
  "profile_image_url": "...",
  "resume_url": "/assets/resume.pdf", // Link to PDF
  "social": [{ "platform":"GitHub", "url":"...", "logo":"github", "color":"181717" }],
  "experience": [{
    "role": "...", "company": "...", "duration": "...",
    "description": "string OR array of strings"
  }],
  "skills": [{ // Bento grid items
    "category": "Frontend",
    "items": ["React"],
    "logos": ["react"]
  }],
  "projects": [{ // MAX 6 - HARD LIMIT
    "title": "...", "description": "...", "image_url": "...",
    "stack": [], "stack_logos": [],
    "code_url": "...", "live_url": "..."
  }]
}
```

## Non-Negotiable Conventions

1. Keep user-facing content JSON-driven; do not hardcode personal profile data into templates.
2. Do not introduce Node.js/npm, JS frameworks, or CSS frameworks.
3. Keep projects display hard-capped with limit:6 in [_includes/sections/projects.html](_includes/sections/projects.html).
4. Load Vanta/Three only when theme_config.vanta_effect is set (see [_includes/vanta_init.html](_includes/vanta_init.html)).
5. Generate Shields.io badge URLs only through [_includes/badge_gen.html](_includes/badge_gen.html).
6. If schema changes, update [_data/profile.example.json](_data/profile.example.json) and [_data/README.md](_data/README.md).
7. Prefer SCSS partial updates in [_sass](_sass) and keep [assets/css/main.scss](assets/css/main.scss) as orchestrator.
8. Avoid inline styles in Liquid templates unless dynamic runtime values make it unavoidable.

## Editing Guardrails

1. Never overwrite user content in [_data/profile.json](_data/profile.json) unless explicitly requested.
2. Keep docs unchanged unless user explicitly asks for doc edits, especially [docs/PRD.md](docs/PRD.md) and [docs/TRD.md](docs/TRD.md).
3. Keep _site as generated output only; do not rely on editing built artifacts.
4. Preserve existing accessibility and semantic HTML patterns in section templates.
5. Use Liquid defaults for optional fields to prevent runtime/template errors.

## Known Gotchas

1. Naming/baseurl drift exists historically (TheProFile vs theprofile); follow current [_config.yml](_config.yml).
2. Theme persistence key naming differs between files; do not rename storage keys casually without checking [_includes/head.html](_includes/head.html) and [assets/js/theme-controller.js](assets/js/theme-controller.js).
3. Docs may lag implementation in some areas (e.g. modular Sass structure is now present in `_sass`).

## CSS & Design Rules

1. **Tokens**: Never hardcode hex values in CSS. Use `var(--color-*)`.
2. **Glassmorphism**: Use `color-mix(in srgb, var(--color-secondary) 60%, transparent)` + `backdrop-filter: blur(16px)`.
3. **Hover lift**: `transform: translateY(-4px)` + border-color accent transition.
4. **Z-Index**: Nav (1000) > Full-screen overlays (900) > Page content (1).

## Scope Additions (Post-PRD)

These features were implemented beyond the original PRD scope:
- **Skills section**: Bento grid layout in `_includes/sections/skills.html`.
- **GSAP Animations**: Scroll-triggered reveals in `assets/js/gsap-animations.js`.
- **Resume CTA**: "View Resume" button in hero driven by `resume_url`.
- **Scrollspy**: Navigation active-state indicator.

## Technical Debt & Known Issues

1. **Hardcoded Email**: `_includes/sections/contact.html` has a hardcoded email. Should be moved to `profile.json`.
2. **Missing Schema Docs**: `profile.example.json` may lack latest `skills` or `resume_url` fields.
3. **Hero CTA Fallback**: Hero button links to `#` if `resume_url` is missing instead of hiding.


## Pre-Completion Checklist

Before calling work complete:

1. bundle exec jekyll build succeeds without new warnings/errors.
2. Pages render across portfolio and blog routes.
3. Theme toggle and navigation interactions still work.
4. No regressions in responsive layout at mobile/tablet/desktop widths.
5. Changes stay within existing conventions and file boundaries.

## When Unclear

Ask the user instead of guessing.
