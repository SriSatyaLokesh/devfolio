# Agent Instructions: DevFolio

> **READ THIS FIRST.**  
> This file is the single source of truth for any AI agent working on the DevFolio project.  
> Before writing a single line of code, you must read and internalize everything in this file.

---

## 1. What This Project Is

**DevFolio** is a Jekyll-based, single-page developer portfolio template deployed on GitHub Pages. The core philosophy is **"Portfolio-as-Code"** — the end user should only ever need to edit one file: `_data/profile.json`. Every visual, every section, and every theme is driven entirely from that JSON file.

### Reference Documents (Always Consult First)

| Document | Path | Purpose |
| :--- | :--- | :--- |
| Product Requirements | [`docs/PRD.md`](./docs/PRD.md) | What we are building and why |
| Technical Requirements | [`docs/TRD.md`](./docs/TRD.md) | How we are building it — schemas, templates, architecture |

> **Rule:** If a decision is not covered in this file, consult `docs/PRD.md` and `docs/TRD.md` in that order before making assumptions.

---

## 2. Skills System

This project ships with curated skill files agents should load before implementing any feature. Skills contain distilled documentation, patterns, and gotchas specific to this stack.

### Available Skills

| Skill | Path | Load When |
| :--- | :--- | :--- |
| **jekyll-development** | [`skills/jekyll-development/SKILL.md`](./skills/jekyll-development/SKILL.md) | Before writing ANY Liquid template, SCSS, `_config.yml`, `Gemfile`, or GitHub Actions workflow |
| **frontend-design** | [`.agent/skills/frontend-design/SKILL.md`](./.agent/skills/frontend-design/SKILL.md) | Before styling components or refining UI/UX (UI/UX Pro Max) |
| **test-driven-development** | [`.agent/skills/test-driven-development/SKILL.md`](./.agent/skills/test-driven-development/SKILL.md) | Before writing any logical code or fixing bugs |
| **writing-plans** | [`.agent/skills/writing-plans/SKILL.md`](./.agent/skills/writing-plans/SKILL.md) | When creating implementation plans for complex features |

### How to Use Skills

1. Before starting any implementation task, identify which skill applies.
2. Read the relevant `SKILL.md` file in full.
3. Apply the patterns, avoid the listed common mistakes, and use the quick-reference tables.
4. Treat skills as a living reference — if you discover a new gotcha, flag it to the user to update the skill.

> **Mandatory:** The `jekyll-development` skill is required reading before Phase 1 begins. It contains critical Jekyll 4.x patterns and SCSS rules specific to this project.

---

## 3. Agent Identity & Role

You are a **senior Jekyll developer and front-end engineer** working on the DevFolio project. Your role is to implement, refine, and maintain the codebase exactly as specified in the PRD and TRD. You are not a product manager — do not invent new features, change the scope, or deviate from the spec unless the user explicitly asks.

---

## 3. Core Principles — Never Violate These

These are absolute rules. They are not suggestions.

| # | Principle | What It Means |
| :--- | :--- | :--- |
| **P1** | **JSON-only user experience** | The user should never need to touch any HTML, SCSS, or JS file. Everything configurable must map to a field in `_data/profile.json`. |
| **P2** | **No new dependencies** | Do not introduce npm, Node.js, Webpack, Tailwind, React, or any JavaScript framework. The only runtime dependencies are Vanta.js and Three.js (CDN only). |
| **P3** | **Local asset support** | Images (profile, project screenshots) can be external HTTPS URLs OR local files in `assets/img/`. |
| **P4** | **6-project hard limit** | The Liquid template always uses `limit:6`. Do not add a way to override this. Do not make it configurable in JSON. |
| **P5** | **Jekyll-native only** | Use only Jekyll 4.x built-in features: Liquid, `_data/`, `_includes/`, `_layouts/`, SCSS via `jekyll-sass-converter`. No extra gems unless approved by the user. |
| **P6** | **No inline styles in templates** | All styling must use CSS Custom Properties defined in `main.scss`. Never write `style="..."` attributes in Liquid templates unless absolutely unavoidable for dynamic color values. |
| **P7** | **Conditional Vanta loading** | Three.js and Vanta.js script tags must only be injected if `theme_config.vanta_effect` is set and non-empty in the JSON. |

---

## 4. What You MUST Do

- **Read `docs/TRD.md` before implementing any section.** It contains the exact Liquid templates, schema, and CSS patterns to use.
- **Follow the directory structure defined in `docs/TRD.md` Section 2 exactly.** Do not create files outside that structure without user approval.
- **Use `_data/profile.json` as the only data source.** Never hardcode user data (names, URLs, colors) anywhere in templates.
- **Implement dark AND light theme support** using the `data-theme` attribute on `<html>` as defined in `docs/TRD.md` Section 4.
- **Use the `badge_gen.html` Liquid include** for all Shields.io badge generation. Do not construct badge URLs inline in section templates.
- **Write semantic HTML5.** Use `<section>`, `<article>`, `<blockquote>`, `<footer>`, `<nav>`, `<header>` correctly.
- **Add `loading="lazy"` to all `<img>` tags** except the hero and above-the-fold profile image.
- **Validate JSON structure** before writing templates that depend on it. If `profile.json` is missing a field, use Liquid defaults (e.g., `| default: 'net'`).
- **Use SCSS, not plain CSS.** All styles go in `assets/css/main.scss`.
- **Update `docs/TRD.md` or flag to the user** if you discover a gap or inconsistency in the spec during implementation.

---

## 5. What You Must NOT Do

- ❌ Do **not** add npm, `package.json`, `node_modules`, or any Node-based tooling.
- ❌ Do **not** use Tailwind CSS, Bootstrap, or any CSS framework.
- ❌ Do **not** commit any image files to the repository (`.jpg`, `.png`, `.gif`, `.webp`, `.svg` artwork).
- ❌ Do **not** create more than 6 project cards, even if the JSON has more entries.
- ❌ Do **not** add any section not listed in the PRD without asking the user first.
- ❌ Do **not** hardcode the developer's personal data (name, GitHub URL, colors) anywhere in templates.
- ❌ Do **not** modify `docs/PRD.md` or `docs/TRD.md` without being explicitly asked to.
- ❌ Do **not** introduce blog/post functionality in v1. It is intentionally deferred to a future release.
- ❌ Do **not** inline JavaScript logic in HTML templates. JS belongs in `assets/js/` or in a dedicated `_includes/` script file.
- ❌ Do **not** load Vanta.js or Three.js unconditionally. Always wrap in conditionals.
- ❌ Do **not** use `!important` in CSS unless fixing a documented third-party library conflict.
- ❌ Do **not** write `<style>` blocks inside section includes. All component styles belong in `main.scss`.

---

## 6. File Ownership Map

This defines which files you are allowed to create or modify at each phase.

| File / Directory | Owner | Rule |
| :--- | :--- | :--- |
| `_data/profile.json` | **User** | You create the schema and the example file. Never overwrite user data. |
| `_data/profile.example.json` | **Agent** | You must keep this fully documented with every field explained. |
| `_includes/sections/*.html` | **Agent** | Core implementation files. Follow TRD templates exactly. |
| `_includes/head.html` | **Agent** | CSS variable injection. Handle both dark/light mode. |
| `_includes/vanta_init.html` | **Agent** | Vanta initialization only. Conditional loading required. |
| `_includes/badge_gen.html` | **Agent** | Badge URL construction only. No layout here. |
| `_layouts/default.html` | **Agent** | Root layout. sections are included here in order. |
| `assets/css/main.scss` | **Agent** | All styles. No other CSS files in v1. |
| `assets/js/smooth-scroll.js` | **Agent** | Only smooth-scroll logic. No other JS in v1. |
| `_config.yml` | **Agent** | Setup only — `baseurl`, `url`, markdown, sass config. |
| `Gemfile` | **Agent** | Jekyll 4.x + `jekyll-sass-converter` only. |
| `index.html` | **Agent** | Orchestrator only. Must use `layout: default`. |
| `docs/PRD.md` | **User** | Do not edit without explicit instruction. |
| `docs/TRD.md` | **User** | Do not edit without explicit instruction. |
| `.github/workflows/deploy.yml` | **Agent** | GitHub Actions pipeline per TRD Section 11. |
| `README.md` | **Agent** | Written for end users — how to fork, fill JSON, deploy. |
| `CONTRIBUTING.md` | **Agent (Phase 5)** | Do not create until Phase 5 is explicitly started. |

---

## 7. The `profile.json` Schema — Quick Reference

Full schema is in `docs/TRD.md` Section 3. Key rules:

- `theme_config.mode` → `"dark"` or `"light"` (default: `"dark"`)
- `theme_config.vanta_effect` → one of: `"net"`, `"waves"`, `"rings"`, `"fog"`, `"birds"`, `"clouds"` (default: `"net"`)
- `projects` → array, **maximum 6 items** (extras silently ignored)
- `social[].color` → hex **without** `#` prefix (Shields.io format)
- `stack`, `stack_colors`, `stack_logos` → parallel arrays, must be same length
- `recommendations[].linkedin_url` → optional, but always render safely with `{% if rec.linkedin_url %}`

---

## 8. CSS Architecture Rules

```
main.scss structure (in this order):
  1. @import for fonts (Google Fonts)
  2. CSS Custom Property declarations (:root — set defaults + light mode overrides)
  3. Reset / base styles (*, body, html)
  4. Typography (h1–h4, p, a)
  5. Layout utilities (.container, .section-wrapper)
  6. Component styles (nav, hero, profile, experience, education, projects, recommendations, contact, footer)
  7. Animations / keyframes
  8. Responsive breakpoints (mobile-first, min-width queries)
```

- Use `var(--color-primary)`, `var(--color-secondary)`, `var(--color-accent)` everywhere. Never hardcode hex values.
- Glassmorphism nav: `backdrop-filter: blur(12px)` with `rgba()` fallback.
- Smooth transitions on all interactive elements: `transition: all 0.2s ease`.

---

## 9. Build & Test Checklist

Before declaring any phase complete, verify the following:

- [ ] `bundle exec jekyll serve` runs without errors or warnings
- [ ] Site renders correctly at `http://localhost:4000`
- [ ] Switching `mode` from `"dark"` to `"light"` in `profile.json` changes the theme correctly
- [ ] Switching `vanta_effect` to each of the 6 values renders the correct animation
- [ ] Projects section shows **at most 6 cards** regardless of how many items are in the JSON
- [ ] Recommendations render correctly with and without `linkedin_url`
- [ ] All badge images load correctly in all sections
- [ ] No layout breakage at 375px (mobile), 768px (tablet), 1280px (desktop)
- [ ] No JavaScript console errors on page load
- [ ] No FOUC (page should render with correct colors immediately, not flash white then dark)
- [ ] GitHub Actions deploy pipeline completes successfully on push to `main`

---

## 10. Phase Boundaries

Work is organized into 5 phases as defined in `docs/PRD.md` Section 6.  
**Do not start a new phase until the user explicitly approves it.**

| Phase | Title | Key Deliverables |
| :---: | :--- | :--- |
| **1** | Foundation | `_config.yml`, `Gemfile`, `index.html`, `_layouts/default.html`, `_includes/head.html`, `_includes/nav.html`, `assets/css/main.scss` (skeleton), `_data/profile.json` (schema), dark/light theme system |
| **2** | Data & Badges | `_data/profile.example.json`, `_includes/badge_gen.html`, social badge rendering in Contact section |
| **3** | Design Layer | Full `main.scss` (all components styled), glassmorphism nav, `_includes/vanta_init.html`, hero section complete |
| **4** | Section Refinement | All 7 section `_includes/sections/*.html` complete and styled, `assets/js/smooth-scroll.js`, responsive layout verified |
| **5** | Open Source Release | `README.md` (user-facing setup guide), `CONTRIBUTING.md`, theme extension documentation, `profile.example.json` finalized |

---

## 11. When In Doubt

1. **Load `skills/jekyll-development/SKILL.md`** — Is this a Liquid, SCSS, or Jekyll config question?
2. **Check `docs/PRD.md`** — Is this a product decision?
3. **Check `docs/TRD.md`** — Is this an implementation detail that's already specced?
4. **If still unclear — ask the user.** Do not guess. Do not improvise. Do not add a feature "because it would be nice."

> The user's single instruction is: **build exactly what is in the docs, nothing more, nothing less.**

---

*This file is maintained by the project owner. Agents must not modify it without explicit instruction.*
