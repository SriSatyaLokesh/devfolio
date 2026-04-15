# Plan: Open Source Architecture Refactor

**Date**: 2026-04-15  
**Subject**: Modularization of CSS (SASS), HTML Cleanup, and JS Extraction  
**Status**: Completed / Finalizing

## 1. Objective
The goal of this refactor was to transition TheProFile from a functional single-page prototype into a production-grade, open-source-ready library. This required moving away from monolithic files towards a modular architecture that separates structure (HTML), style (SASS), and logic (JS).

---

## 2. CSS Refactor (7-1 SASS Pattern)
We replaced the single `assets/css/main.scss` with a structured `_sass/` directory following the industry-standard 7-1 pattern.

### Architecture:
- **`abstracts/`**: Centralized design tokens (variables, mixins).
- **`base/`**: Reset, global typography, and utility classes.
- **`layout/`**: Navigation and footer layouts.
- **`components/`**: Reusable UI elements (buttons, badges, chips).
- **`sections/`**: Modular styles for every homepage section (hero, profile, projects, etc.).
- **`animations/`**: Centralized GSAP and CSS keyframes.

### Benefits:
- Reduced technical debt.
- Easier for contributors to modify specific sections without side effects.
- Faster build times and cleaner orchestrator file (`main.scss`).

---

## 3. HTML & Liquid cleanup
The templates were audited for accessibility, SEO, and semantic correctness.

### Key Improvements:
- **SEO Metadata**: Added detailed OpenGraph (OG) and Twitter card tags to `_includes/head.html` for premium social visibility.
- **Semantic HTML**: Converted generic `div` structures to semantic HTML5 elements (`<section>`, `<article>`, `<cite>`).
- **A11y (Accessibility)**: Integrated proper ARIA labels, roles, and descriptions across the entire site.
- **Performance**: Strict enforcement of `loading="lazy"` for all images except above-the-fold content.
- **Documentation**: Added professional Liquid comments explaining template logic and data mapping.

---

## 4. JavaScript Extraction
To adhere to the "Clean Code" principles and `AGENTS.md` guidelines, we separated logic from templates.

### New Module Assets:
- **`assets/js/vanta-controller.js`**: Orchestrates Vanta.js backgrounds and the Easter Egg shockwave transition.
- **`assets/js/audio-controller.js`**: Manages the cinematic audio experience and volume fading.
- **`assets/js/contact-scripts.js`**: Handles the interactive copy-to-clipboard functionality.

### Implementation Pattern:
Liquid configuration tokens (from `profile.json`) are now passed to these static JS files via a centralized `window.DEV_FOLIO_CONFIG` object, ensuring the JS remains purely functional and decoupled.

---

## 5. Build & Verification
The integrity of the refactor was verified using:
1.  **Jekyll Build**: `bundle exec jekyll build` ensured zero Liquid/Sass compilation errors.
2.  **Recursive Check**: Fixed the "Nesting too deep" error caused by Liquid examples in documentation comments.
3.  **Visual Audit**: Verified that the "Elite 2026" visual fidelity was maintained perfectly across both light and dark modes.

---

## 6. Future-Proofing
- **`CONTRIBUTING.md`** was updated to reflect the new modular SASS rules.
- **`README.md`** (upcoming) will focus on the "Portfolio-as-Code" JSON experience for end users.
