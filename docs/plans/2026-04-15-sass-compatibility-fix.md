# Plan: SASS Compatibility Fix (Modular to Global)
> **Date:** 2026-04-15
> **Status:** Executed & Verified

---

## 1. Problem Statement
The transition to modern Dart Sass (`@use` and `@forward`) caused the live website to break because the default GitHub Pages Jekyll engine (and some older Action environments) cannot compile modern Sass modules. This resulted in the browser receiving raw SCSS code instead of a compiled CSS stylesheet.

## 2. Objective
Restore the live site's styling by reverting the SASS architecture to the universally supported `@import` system while retaining our clean file organization.

## 3. Implementation Workflow

### Phase 1: Preparation
- [x] Synchronize with `main` branch.
- [x] Create feature branch: `fix/sass-compatibility`.

### Phase 2: Refactoring
- [x] **Remove `@use` from Partials**: Strip the explicit module declarations from all `_sass/**/*.scss` files. This allows variables/mixins to be inherited from the global scope.
- [x] **Update Orchestrator**: Refactor `assets/css/main.scss` to use `@import`.
- [x] **Global Ordering**: Ensure `variables` and `mixins` are imported before any components that consume them.
- [x] **Cleanup**: Delete the redundant `_sass/abstracts/_index.scss` file.

### Phase 3: Verification
- [x] **Local Build**: Run `bundle exec jekyll build` to ensure the sass is processed into valid CSS.
- [x] **Log Audit**: Confirm that build errors are resolved (note: deprecation warnings for `@import` are expected but harmless for deployment).

## 4. Verification Results
| Test | Result |
| :--- | :--- |
| **Local Jekyll Build** | ✅ Pass |
| **CSS Syntax Check** | ✅ Valid CSS produced (no raw `@use` in `_site/`) |
| **Asset Pathing** | ✅ `/assets/css/main.css` correctly generated |

---

## 5. Maintenance Note
Until the project is fully migrated to a standalone build pipeline specifically configured for Dart Sass (e.g., using a dedicated Node-based Sass compiler), the `@import` system should be maintained for 100% "Portfolio-as-Code" reliability for end users.
