# Contributing to TheProFile

First off, thank you for considering contributing to TheProFile! 

TheProFile has a very specific set of architectural constraints. Because our target user is a developer who wants a portfolio without the hassle of a build step or NPM configurations, we are fiercely protective of the **Portfolio-as-Code** philosophy.

Please read the following guidelines carefully before submitting a Pull Request.

---

## The 7 Core Architectural Principles (P1-P7)

Any Pull Request that violates these principles will respectfully be declined.

1. **JSON-only user experience**: The end-user should never need to touch any HTML, SCSS, or JS file. Everything configurable must map to a field in `_data/profile.json`. If you add a new feature, it must be driven by JSON.
2. **No new dependencies**: Do not introduce npm, Node.js, Webpack, Tailwind, React, or any JavaScript framework.
3. **Interactive Consistency (GSAP)**: All secondary animations must be synchronized with the global `assets/js/gsap-animations.js` choreography to maintain a rhythmic, premium landing experience.
4. **No local binary assets**: Profile images and project screenshots must be external HTTPS URLs. We do not commit image binaries to the repository.
5. **6-project hard limit**: The `projects.html` Liquid template always uses `limit:6`. Do not remove this. Users are expected to curate their work.
6. **Jekyll-native only**: Use only Jekyll 4.x built-in features: Liquid, `_data/`, `_includes/`, `_layouts/`, and SCSS via `jekyll-sass-converter`. No extra Ruby gems.
7. **No inline styles in templates**: All styling must use CSS Custom Properties defined in the design system. Never write `style="..."` attributes in Liquid templates.
8. **Modular SASS**: All new styles must be added as partials in the `_sass/` directory and imported into `assets/css/main.scss`.
9. **Semantic & Accessible**: Use valid HTML5 semantic tags and ensure all images have `loading="lazy"` (except above-the-fold hero assets).
10. **Conditional Vanta loading**: Three.js and Vanta.js script tags must only be injected if `theme_config.vanta_effect` is set and non-empty.

---

## Codebase Architecture

Familiarize yourself with where things live before diving in:

| Directory | Purpose | Rule |
| :--- | :--- | :--- |
| `_data/profile.example.json` | The reference schema. | If you add a feature, you MUST document the new field here with inline comments. |
| `_includes/sections/` | HTML fragments for each section. | Do not put `<style>` blocks in here. Use semantic HTML. |
| `_includes/badge_gen.html` | Shields.io Badge URL Factory. | All dynamic badges must pass through this file. Do not hardcode Shields.io URLs anywhere. |
| `_includes/head.html` | CSS Variable Injection. | FOUC (Flash of Unstyled Content) prevention happens here by reading JSON colors into a `:root` block before CSS loads. |
| `_sass/` | Modular SASS partials. | Follow the 7-1 pattern. Add new component styles to the appropriate subfolder. |
| `assets/css/main.scss` | Global CSS Orchestrator. | Imports all partials. Do not add component styles directly here. |

---

## How to submit a Pull Request

1. **Fork the repository** and clone it locally.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Make your changes adhering strictly to the Core Principles.
4. Test your changes locally:
   ```bash
   bundle install
   bundle exec jekyll serve --livereload
   ```
   *Verify your new code builds without Liquid compilation errors.*
5. **Commit your changes**. Use descriptive commit messages.
6. **Push to the branch** (`git push origin feature/amazing-feature`).
7. **Open a Pull Request** against the `main` branch.

### Testing Checklist for PRs:
- Does your code break if a user optionally removes your new field from their `profile.json`? (Always use `| default: 'fallback'` filter).
- Have you verified that your changes maintain standard Lighthouse performance markers?
- Is your pull request purely vanilla JS / HTML / SCSS? 

Thank you for helping us keep TheProFile simple, fast, and beautiful!
