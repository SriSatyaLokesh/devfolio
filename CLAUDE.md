# CLAUDE.md — TheProFile Project Context

> Claude Code quick-reference. Read this before touching any file.
> For full spec: `docs/PRD.md` (what) → `docs/TRD.md` (how) → `AGENTS.md` (rules).

---

## Project Summary

**TheProFile** — Jekyll 4.x, single-page developer portfolio. "Portfolio-as-Code": user edits `_data/profile.json` only. Deployed via GitHub Pages + GitHub Actions.

**Status:** All 5 phases implemented. Site is live/functional.

---

## Stack

| Layer | Detail |
| :--- | :--- |
| SSG | Jekyll 4.3, Ruby, Liquid templates |
| Styles | SCSS (single file: `assets/css/main.scss`) + CSS Custom Properties |
| Animations | GSAP 3.12 + ScrollTrigger (CDN), Vanta.js + Three.js (CDN, conditional) |
| Tech icons | Simple Icons CDN (`cdn.simpleicons.org`) via `tech_chip.html` |
| Badges | Shields.io via `badge_gen.html` |
| JS | Vanilla JS only — `smooth-scroll.js` (scroll + theme + nav + scrollspy) + `gsap-animations.js` |
| Fonts | Google Fonts: Space Grotesk (headings) + Archivo (body) |
| Deploy | GitHub Actions → `peaceiris/actions-gh-pages@v3` |

---

## Directory Map

```
TheProFile/
├── _data/
│   ├── profile.json          ← USER'S FILE — never overwrite
│   └── profile.example.json  ← Keep fully documented, all fields
│
├── _includes/
│   ├── head.html             ← CSS var injection (FOUC prevention) + theme init script
│   ├── nav.html              ← Floating pill nav, theme toggle, hamburger
│   ├── footer.html           ← Copyright + credit
│   ├── badge_gen.html        ← ONLY place Shields.io URLs are built
│   ├── tech_chip.html        ← Simple Icons chip component
│   ├── vanta_init.html       ← Vanta.js init (only loaded if vanta_effect set)
│   └── sections/
│       ├── hero.html         ← Full-viewport, Vanta bg, resume CTA
│       ├── profile.html      ← Avatar + bio
│       ├── experience.html   ← Timeline list, bullet or string description
│       ├── education.html    ← Timeline list, bullet or string description
│       ├── skills.html       ← Bento grid layout from skills[]
│       ├── projects.html     ← Card grid, limit:6 hard
│       ├── recommendations.html ← Testimonial cards
│       └── contact.html      ← Two-col: CTA + social cards (inline SVG icons)
│
├── _layouts/
│   └── default.html          ← Root wrapper: head + nav + content + footer + scripts
│
├── assets/
│   ├── css/main.scss         ← ALL styles. Single file. Front-matter `---` at top.
│   ├── js/
│   │   ├── smooth-scroll.js  ← Scroll + theme toggle + hamburger + scrollspy
│   │   └── gsap-animations.js ← GSAP scroll reveals
│   └── img/
│       └── projects/         ← Local project screenshots (gitignored binary files)
│
├── _config.yml               ← baseurl: /TheProFile, sass_dir: _sass (not critical, main.scss has front matter)
├── index.html                ← layout:default + all section includes
├── Gemfile                   ← jekyll ~> 4.3, jekyll-sass-converter ~> 3.0
└── docs/
    ├── PRD.md                ← Product spec (do not modify)
    ├── TRD.md                ← Tech spec (do not modify)
    └── plans/                ← Phase implementation plans (reference only)
```

---

## profile.json Schema (full — including scope additions)

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
  "profile_image_url": "...",   // HTTPS URL or /assets/img/...
  "resume_url": "/assets/resume.pdf",  // ← ADDED BEYOND PRD SCOPE — hero CTA button

  "social": [{ "platform":"GitHub", "url":"...", "logo":"github", "color":"181717" }],
  // logo values: github, linkedin, twitter, devdotto, leetcode, + any Simple Icons slug

  "experience": [{
    "role": "...", "company": "...", "company_url": "...", "duration": "...",
    "description": "string OR array of strings"  // array = bullet list
  }],

  "skills": [{                // ← ADDED BEYOND PRD SCOPE — bento grid section
    "category": "Frontend",
    "items": ["React", "Next.js"],
    "logos": ["react", "nextdotjs"]  // Simple Icons slugs, parallel to items
  }],

  "education": [{
    "degree": "...", "institution": "...", "year": "...",
    "description": "string OR array of strings"  // optional, same as experience
  }],

  "projects": [{              // MAX 6 — hard limit via limit:6 in Liquid
    "title": "...", "description": "...", "image_url": "...",
    "stack": [], "stack_colors": [], "stack_logos": [],  // PARALLEL ARRAYS, same length
    "code_url": "...", "live_url": "..."  // empty string hides button
  }],

  "recommendations": [{
    "text": "...", "name": "...", "title": "...",
    "linkedin_url": "..."  // optional, empty string hides button
  }]
}
```

---

## Scope Additions (Beyond Original PRD)

These features exist in the codebase but were **not** in the original PRD/TRD:

| Addition | Where | Notes |
| :--- | :--- | :--- |
| `skills` section | `_includes/sections/skills.html` | Bento grid layout, driven by `profile.json skills[]` |
| `resume_url` field | `_includes/sections/hero.html` | Adds "View Resume" CTA button to hero |
| GSAP animations | `assets/js/gsap-animations.js` | Scroll reveals on all sections |
| Scrollspy + nav indicator | `assets/js/smooth-scroll.js` | IntersectionObserver-based active state |
| Mobile hamburger | `_includes/nav.html` | `nav__links--open` class toggle |
| Inline SVG social icons | `_includes/sections/contact.html` | Replaces Shields.io badges in contact section |
| Copy-email button | `_includes/sections/contact.html` | JS clipboard copy with feedback |
| Auto-hide nav | `assets/js/smooth-scroll.js` | `.nav--scrolled` class on scroll |
| `tech_chip.html` | `_includes/tech_chip.html` | Simple Icons chip, used in skills + projects |

---

## Known Issues & Bugs

| # | File | Issue | Severity |
| :--- | :--- | :--- | :--- |
| 1 | `_includes/sections/contact.html:38` | Email `lokesh@example.com` is **hardcoded** — not driven from `profile.json`. Should add `email` field to schema. | Medium |
| 2 | `_data/profile.example.json` | Missing `skills[]` and `resume_url` documentation. Users forking the repo won't know these fields exist. | Medium |
| 3 | `_includes/sections/hero.html:7` | Resume CTA always renders even if `resume_url` is missing — links to `#` as fallback. Should wrap in `{% if site.data.profile.resume_url %}`. | Low |
| 4 | `_includes/sections/education.html:6` | Uses inline `style="animation-delay: ..."` — technically violates P6 (no inline styles). Dynamic timing value requires it though. | Low (justified) |
| 5 | `_includes/sections/education.html:15` | Uses class `experience__description-list` (not `education__`) — functional but class naming is inconsistent. | Low |
| 6 | `_config.yml` | `sass_dir: _sass` but no `_sass/` directory exists. Non-critical because `main.scss` has `---` front matter (Jekyll processes it as a page directly). | Low |
| 7 | Contact GSAP | `gsap-animations.js:123` targets `.section-header` in contact timeline, but contact section has no `.section-header` element. Animation silently skips. | Low |

---

## Absolute Rules (P1–P7 from AGENTS.md)

- **P1** JSON-only UX: all configurable content in `profile.json`
- **P2** No npm/Node/framework — CDN only for Vanta.js, Three.js, GSAP
- **P3** Images: HTTPS URL or `/assets/img/` local path
- **P4** `limit:6` on projects — hard limit, not configurable
- **P5** Jekyll-native only — no unapproved gems
- **P6** No inline styles — use CSS Custom Properties (exception: dynamic JS-driven values)
- **P7** Vanta/Three.js loaded **only** if `vanta_effect` is set and non-empty

---

## CSS Architecture (`assets/css/main.scss`)

Order: font import → `:root` vars → `[data-theme="light"]` overrides → reset → typography → utilities → nav → hero → profile → experience/education → skills → projects → contact/footer → animations → responsive

**Never** hardcode hex values — always use `var(--color-*)`.
**Glassmorphism**: `color-mix(in srgb, var(--color-secondary) 60%, transparent)` + `backdrop-filter: blur(16px)`.
**Hover lift**: `transform: translateY(-4px)` + border-color accent.

---

## Build & Test

```bash
bundle exec jekyll serve        # dev server at http://localhost:4000/TheProFile
bundle exec jekyll build        # production build to _site/
```

**Pre-ship checklist:**
- [ ] `bundle exec jekyll serve` — no errors
- [ ] Dark/light toggle works, no FOUC
- [ ] All 6 Vanta effects render
- [ ] Projects shows ≤6 cards
- [ ] Recommendations work with and without `linkedin_url`
- [ ] No console errors
- [ ] Responsive: 375px / 768px / 1280px
- [ ] GitHub Actions deploy completes

---

## GitHub Actions Deploy

```
.github/workflows/deploy.yml
```
Ruby 3.2 → `bundle exec jekyll build` → `peaceiris/actions-gh-pages@v3` → publishes `_site/` to `gh-pages` branch.

---

## What NOT to do

- ❌ Add npm, `package.json`, Tailwind, Bootstrap, React
- ❌ Create more than 6 project cards
- ❌ Add sections not in PRD without user approval
- ❌ Hardcode user data in templates
- ❌ Modify `docs/PRD.md` or `docs/TRD.md`
- ❌ Add blog/post functionality (deferred to v2)
- ❌ Load Vanta.js unconditionally
- ❌ Use `!important` unless fixing documented 3rd-party conflict
- ❌ Write `<style>` blocks inside section includes
- ❌ Commit binary image files to repo
