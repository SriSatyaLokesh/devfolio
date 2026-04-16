---
description: "Add a new configurable field to profile schema and wire docs/example updates consistently."
name: "Add Profile Field"
argument-hint: "Field name + purpose + where it should render"
agent: "agent"
---
Implement a new profile field in a schema-safe way.

Do this workflow:
1. Add the field to [_data/profile.example.json](_data/profile.example.json) with realistic example values.
2. Add/update docs in [_data/README.md](_data/README.md) describing type, required/optional status, and examples.
3. Apply/illustrate value in [_data/profile.json](_data/profile.json) only if explicitly asked.
4. If template wiring is requested, use defaults to avoid runtime Liquid errors when field is missing.
5. Run `bundle exec jekyll build` and report result.

Output format:
- New field contract
- Files changed
- Backward-compatibility notes
- Build status
