# Phase 1 — Foundation Design
> **Approach:** B — Schema-First  
> **Date:** 2026-04-12  
> **Status:** Approved

---

## Goal
Scaffold the complete Jekyll project foundation for TheProFile. By the end of Phase 1, `bundle exec jekyll serve` must run without errors and render a correctly themed single-page skeleton.

---

## Architecture

```
Schema (JSON) → Templates (Liquid) → Styles (SCSS) → Config → Deploy Pipeline
```

Every template is written *after* the JSON schema is finalised so no field name is ever guessed.

---

## Build Order (Schema-First)

| Step | File(s) | Why First |
| :---: | :--- | :--- |
| 1 | `_data/profile.json` | Source of truth — all Liquid references come from here |
| 2 | `_config.yml` + `Gemfile` | Jekyll cannot serve without these |
| 3 | `_layouts/default.html` | Root shell that wraps all content |
| 4 | `_includes/head.html` | CSS variable injection — must load before stylesheet |
| 5 | `_includes/nav.html` | Fixed nav, uses `site.data.profile.name` |
| 6 | `_includes/footer.html` | Simple copyright footer |
| 7 | `index.html` | Orchestrator — includes all section stubs |
| 8 | `_includes/sections/*.html` | Section stubs (hero, profile, experience, education, projects, recommendations, contact) |
| 9 | `assets/css/main.scss` | SCSS skeleton with CSS variable tokens |
| 10 | `.github/workflows/deploy.yml` | GitHub Actions deploy pipeline |

---

## Data Layer — `profile.json` Schema

Fields locked for Phase 1 (full schema per TRD §3):

- `theme_config` → `mode`, `vanta_effect`, `colors` (primary, secondary, accent)
- `name`, `headline`, `profile_image_url`, `bio`
- `social[]` → `platform`, `url`, `logo`, `color`
- `experience[]` → `role`, `company`, `company_url`, `duration`, `description`
- `education[]` → `degree`, `institution`, `year`
- `projects[]` (max 6) → `title`, `description`, `image_url`, `stack[]`, `stack_colors[]`, `stack_logos[]`, `code_url`, `live_url`
- `recommendations[]` → `text`, `name`, `title`, `linkedin_url`

---

## Theming System

- CSS Custom Properties injected inline in `<head>` (FOUC prevention)
- `data-theme` attribute on `<html>` drives dark/light switch
- Dark = default (`:root` vars from head.html)
- Light = `[data-theme="light"]` overrides in `main.scss`
- No JS required for theme switching — it's set at build time from JSON

---

## SCSS Skeleton Structure (`main.scss`)

```
1. Google Fonts @import
2. :root { CSS vars — set as fallback defaults }
3. Reset (*, body, html)
4. Typography (h1–h4, p, a)
5. Layout (.container, .section-wrapper)
6. [data-theme="light"] overrides
7. Placeholder component blocks (commented — filled in Phase 3)
8. Responsive breakpoints (mobile-first)
```

---

## Section Stubs in Phase 1

Each `_includes/sections/*.html` file in Phase 1 is a **structural stub** — semantic HTML with correct IDs and data bindings, but minimal styling. Full visual polish happens in Phase 3.

| Section | Phase 1 Output |
| :--- | :--- |
| hero.html | `<section id="hero">` — name + headline from JSON |
| profile.html | `<section id="profile">` — image + bio from JSON |
| experience.html | `<section id="experience">` — for loop over experience[] |
| education.html | `<section id="education">` — for loop over education[] |
| projects.html | `<section id="projects">` — for loop with `limit:6` |
| recommendations.html | `<section id="recommendations">` — for loop, guarded linkedin_url |
| contact.html | `<section id="contact">` — social array rendered as badge placeholders |

---

## Constraints (from AGENTS.md P1–P7)

- ✅ No npm / Node / Tailwind
- ✅ No local images — all external URLs
- ✅ `limit:6` hard-coded on projects loop
- ✅ Vanta.js NOT loaded in Phase 1 (Phase 3 concern)
- ✅ All styles in `main.scss` only — no `<style>` blocks in section includes
- ✅ No hardcoded user data in templates — 100% from `site.data.profile.*`

---

## Exit Criteria

- [ ] `bundle exec jekyll serve` runs with zero errors
- [ ] `http://localhost:4000` renders the scaffold
- [ ] Switching `mode` from `"dark"` to `"light"` in JSON changes the page theme
- [ ] Projects loop shows at most 6 items even if JSON has more
- [ ] No FOUC — page loads with correct colors immediately
- [ ] GitHub Actions workflow file is present and syntactically valid

---

> **Next:** Invoke `/plan` to produce the atomic task list.
