# Technical Plan: Theme Controller & Dual Easter Egg System

This document outlines the architectural design and implementation details of the decoupled "Easter Egg" systems in { TheProFile }.

## 1. Objective
To separate the environmental effects (background animations) from the branding identity (color themes), allowing users to demo both independently while ensuring a clean, context-aware user experience.

## 2. Architectural Split

### A. Environment: `vanta-controller.js`
- **Responsibility**: Manages the WebGL rendering engine (Vanta.js/Three.js).
- **Trigger**: Double-click on the "Available for work" status badge (`#vanta-trigger`).
- **Logic**:
  - Sequential cycling through `VANTA_EFFECTS` array.
  - Maintains `window.THE_PROFILE_VANTA_INDEX`.
  - **Graceful Fallback**: Includes a `#hero` guard clause to prevent errors on blog pages where a background container may be missing.

### B. Branding: `theme-controller.js`
- **Responsibility**: Manages CSS Custom Properties (Colors) and Light/Dark mode transitions.
- **Trigger**: Double-click on the Navbar Logo (`.nav__brand`).
- **Logic**:
  - Sequential cycling through `ELITE_PRESETS` (10 curated palettes).
  - Maintains `window.THE_PROFILE_COLOR_INDEX`.
  - **Navigation Prevention**: Intercepts `dblclick` events on the logo link using `e.preventDefault()` to allow cycling on blog pages without jumping to the home page.
  - **Context-Aware Engine**: Detects `data-theme="light"` and selectively applies only the accent colors to preserve readability in Light Mode.

## 3. Implementation Details

### Theme Toggle Management
The theme toggle logic (formerly in `smooth-scroll.js`) was consolidated into the `theme-controller.js`. This ensures that when a user switches from Dark to Light mode:
1.  The `data-theme` attribute is updated on the `html` root.
2.  Any manual "Dark Preset" background overrides are instantly cleared to restore Light Mode visibility.

### CSS Synchronization
The system uses `document.documentElement.style.setProperty()` to dynamically update:
- `--color-primary`
- `--color-secondary`
- `--color-accent`

These inline styles take precedence over SASS variables, allowing for the "Live Branding Demo" effect without page refreshes.

## 4. Discovery (Easter Eggs)
The features are documented as "Pro-tips" within the project descriptions in `profile.json`, following a discovery-based design philosophy:
- **Badge Pro-tip**: Mentioned in experience/projects for background magic.
- **Logo Pro-tip**: Mentioned in experience/projects for branding makeovers.

## 5. Maintenance
To add new palettes, update the `ELITE_PRESETS` array in `theme-controller.js`. For new background effects, add them to `VANTA_EFFECTS` in `vanta-controller.js` and ensure the effect's CDN script is whitelisted in `loadVantaScript`.
