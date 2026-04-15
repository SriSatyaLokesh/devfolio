# Phase 5 — Open Source Release Implementation Plan
> **Design:** [2026-04-12-phase5-release-design.md](./2026-04-12-phase5-release-design.md)
> **Date:** 2026-04-12
> **Status:** Ready to Execute

---

## Wave 1 — User Documentation

### Task 5.1 — Generate `README.md`
```
<files>  README.md
<action> Write the canonical documentation for a user to install TheProFile.
         - Introduction to "Portfolio-as-Code"
         - Quick Start (Fork -> Edit profile.json -> Enable Pages)
         - Vanta.js & Theming capabilities
         - Local Development commands (`bundle install` / `bundle exec jekyll serve`)
         - Credits and shields.io status badges.
<verify> ls README.md
<done>   README.md exists and is formatted perfectly.
```

---

## Wave 2 — Contributor Documentation

### Task 5.2 — Generate `CONTRIBUTING.md`
```
<files>  CONTRIBUTING.md
<action> Write open-source guidelines mapping to TheProFile's specific constraints.
         - Enforce the 7 Core Principles (P1-P7): No node/npm, limit 6 strictly, JSON-only user experience, etc.
         - Breakdown directory structures (what belongs in `_includes` vs `_data`).
         - Describe the FOUC CSS custom property pattern used in `head.html`.
         - Require Jekyll build success before PR.
<verify> ls CONTRIBUTING.md
<done>   CONTRIBUTING.md exists.
```

---

## Final Verification
```powershell
bundle exec jekyll build
# Expect: Success. Both markdown files are appropriately excluded from the build output (already handled in _config.yml from Phase 1).
```
