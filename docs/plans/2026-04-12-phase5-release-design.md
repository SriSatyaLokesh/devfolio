# Phase 5 — Open Source Release Design
> **Approach:** Documentation-First (End-user vs Developer split)
> **Date:** 2026-04-12
> **Status:** Approved

---

## Goal
Publish TheProFile to the world. We need two distinct pieces of documentation: one for the target user (a developer who wants a zero-code portfolio) and one for open-source contributors (developers who want to add features to TheProFile itself).

---

## What Changes

| Area | Prior State (Phase 4) | Target State (Phase 5) |
| :--- | :--- | :--- |
| **`README.md`** | Default/Empty | Polished, SEO-optimized fork-and-go setup guide |
| **`CONTRIBUTING.md`** | Missing | Technical layout guide, PR rules, TRD integration |

---

## `README.md` Architecture (The User Guide)

**Audience:** A developer who knows nothing about Jekyll, SCSS, or Liquid, but knows JSON.
**Structure:**
1. **Hero Header**: TheProFile Logo/Title + Shields.io badges (build status, license).
2. **What is TheProFile?**: The "Portfolio-as-Code" philosophy. 
3. **Features**: Vanta.js animations, Dark/Light modes, Shields.io badges.
4. **Quick Start (3 Steps)**: 
   - 1. Fork repository.
   - 2. Edit `_data/profile.json`.
   - 3. Enable GitHub pages under `Settings > Pages`.
5. **Theme Configuration**: How to map colors and switch Vanta effects.
6. **Local Development**: Standard `bundle exec jekyll serve` instructions just in case.

---

## `CONTRIBUTING.md` Architecture (The Developer Guide)

**Audience:** A developer who wants to submit a Pull Request to TheProFile core.
**Structure:**
1. **Core Philosophy**: Iterate P1-P7 from `AGENTS.md` (no node/npm, limit 6, hard limits). Reiterate that PRs breaking these rules will be rejected.
2. **Directory Layout**: Explain `_data`, `_includes/sections`, `_layouts`, etc.
3. **Themed Variables**: How the `--color-x` CSS properties are injected via `head.html` to avoid FOUC.
4. **How to add a Vanta effect**: Where to register it in `vanta_init.html`.
5. **PR Checklist**: Tests pass, JSON schema untouched, backwards compatible.

---

## Exit Criteria

- [ ] `README.md` exists and acts as an immediate setup guide.
- [ ] `CONTRIBUTING.md` exists and establishes the open-source boundaries perfectly mapping to `TRD.md` rules.

---

> **Next**: Execute `/plan` to generate atomic execution tasks.
