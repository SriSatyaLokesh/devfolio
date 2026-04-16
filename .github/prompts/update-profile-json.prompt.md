---
description: "Safely update profile.json content or structure with matching docs/schema updates and Jekyll validation."
name: "Update Profile JSON"
argument-hint: "Describe the profile.json change you want"
agent: "agent"
---
Apply the requested change to [_data/profile.json](_data/profile.json) with a minimal diff.

Rules:
1. Keep JSON valid and preserve unrelated user data.
2. If this introduces, renames, or removes schema fields, update [_data/profile.example.json](_data/profile.example.json) and [_data/README.md](_data/README.md).
3. Keep project constraints compatible with the templates (especially projects display cap).
4. Run a production-safe validation build: `bundle exec jekyll build`.
5. Return: files changed, key JSON diff summary, and validation result.
