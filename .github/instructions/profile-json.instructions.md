---
description: "Use when editing profile.json, profile.example.json, or tenant profile variants. Enforces schema-safe Portfolio-as-Code updates, defaults, and docs sync."
name: "Profile JSON Rules"
applyTo: "_data/profile.json, _data/profile.example.json, _data/profile.*.json"
---
# Profile JSON Editing Rules

## Scope
- Applies to [_data/profile.json](_data/profile.json), [_data/profile.example.json](_data/profile.example.json), and profile variants under [_data](_data).

## Required Behavior
- Keep end-user customization JSON-driven; do not move profile content into templates.
- Preserve existing keys unless the user explicitly requests deletions.
- When adding or renaming schema fields, update both [_data/profile.example.json](_data/profile.example.json) and [_data/README.md](_data/README.md).
- Keep `projects` effectively capped at six rendered cards (template-level `limit:6` remains source of truth).
- Use safe defaults in Liquid/template code for any new optional field.

## Data Safety
- Never overwrite user identity/content in [_data/profile.json](_data/profile.json) unless asked.
- Keep JSON valid (strict JSON, no comments, no trailing commas).
- Keep parallel arrays aligned where used (`stack`, `stack_colors`, `stack_logos`).

## Validation Checklist After JSON Edits
1. JSON parses for edited files.
2. `bundle exec jekyll build` completes successfully.
3. If schema changed, example/docs files are updated in the same change.
