---
name: jekyll-development
description: 'Jekyll 4.x portfolio workflow for TheProFile. Use when editing Liquid templates, profile JSON data contracts, SCSS partial orchestration, or build/deploy behavior.'
argument-hint: 'Task for Jekyll workflow (template, data, style, build, deploy)'
user-invocable: true
---

# Jekyll Development (TheProFile)

## When To Use
- Editing templates in [_includes](_includes), [_layouts](_layouts), or [index.html](index.html)
- Changing profile schema/data in [_data](_data)
- Updating styles in [_sass](_sass) or [assets/css/main.scss](assets/css/main.scss)
- Adjusting behavior in [assets/js](assets/js)
- Verifying build/deploy assumptions in [_config.yml](_config.yml) or [.github/workflows/deploy.yml](.github/workflows/deploy.yml)

## Project Rules Snapshot
1. Keep user-facing content JSON-driven via [_data/profile.json](_data/profile.json).
2. Do not introduce npm/framework tooling.
3. Preserve projects render cap in [_includes/sections/projects.html](_includes/sections/projects.html).
4. Keep Vanta loading conditional (see [_includes/vanta_init.html](_includes/vanta_init.html)).
5. Route Shields badges through [_includes/badge_gen.html](_includes/badge_gen.html).
6. If schema changes, update [_data/profile.example.json](_data/profile.example.json) and [_data/README.md](_data/README.md).

## Procedure
1. Read [AGENTS.md](AGENTS.md), then relevant template/data files.
2. Make minimal edits in the correct layer:
   - Data contract: [_data](_data)
   - Rendering: [_includes/sections](_includes/sections)
   - Layout/wiring: [_layouts](_layouts), [index.html](index.html)
   - Style system: [_sass](_sass), [assets/css/main.scss](assets/css/main.scss)
3. Validate after changes:
   - `bundle exec jekyll build`
4. Report: changed files, behavior impact, and validation outcome.

## Common Pitfalls
- Baseurl confusion (`/theprofile` in [_config.yml](_config.yml)).
- Theme storage key consistency between [_includes/head.html](_includes/head.html) and [assets/js/theme-controller.js](assets/js/theme-controller.js).
- Editing built artifacts in [_site](_site) instead of source files.
