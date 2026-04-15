# Rebranding Plan: DevFolio → TheProFile
> **Date:** 2026-04-15
> **Status:** Ready to Execute

---

## Overview

Rebrand the entire DevFolio codebase to **{TheProFile}**. This includes renaming all code references, documentation, blog posts, and configuration files. The new name format is `{TheProFile}` (with curly braces as a visual marker).

---

## Pre-Requisites

1. Current branch: `main`
2. All changes committed or stashed
3. GitHub repo exists as `SriSatyaLokesh/devfolio`

---

## Phase 0: Branch Setup

### Task 0.1 — Switch to main and pull latest
```
<command> git checkout main && git pull origin main
<verify> git status shows clean main branch
<done> On main, all changes pulled
```

### Task 0.2 — Create rebrand branch
```
<command> git checkout -b rebrand/theprofile
<verify> git branch shows "rebrand/theprofile"
<done> New branch created and checked out
```

---

## Phase 1: Core Configuration

### Task 1.1 — Update `_config.yml`
```
<file>   _config.yml
<changes>
  - title: "DevFolio" → "TheProFile"
  - description update
<verify> bundle exec jekyll build --quiet
<done> No errors
```

### Task 1.2 — Update `index.html`
```
<file>   index.html
<changes>
  - Comment: "DevFolio" → "TheProFile"
<verify> bundle exec jekyll build --quiet
<done> No errors
```

### Task 1.3 — Update `.github/workflows/deploy.yml`
```
<file>   .github/workflows/deploy.yml
<changes>
  - name: "Deploy DevFolio to GitHub Pages" → "Deploy TheProFile to GitHub Pages"
<verify> YAML valid
<done> Workflow name updated
```

---

## Phase 2: Documentation Files

### Task 2.1 — Update `README.md`
```
<files>  README.md
<changes>
  - Logo src: assets/img/devfolio.png → assets/img/theprofile.png
  - All headings: "DevFolio" → "TheProFile"
  - All text references
  - License reference
<verify> bundle exec jekyll build --quiet
<done> README.md updated
```

### Task 2.2 — Update `CONTRIBUTING.md`
```
<files>  CONTRIBUTING.md
<changes>
  - Title: "Contributing to DevFolio" → "Contributing to TheProFile"
  - All references throughout
<verify> bundle exec jekyll build --quiet
<done> CONTRIBUTING.md updated
```

### Task 2.3 — Update `docs/PRD.md`
```
<files>  docs/PRD.md
<changes>
  - Title line: "DevFolio" → "TheProFile"
  - Throughout document
<verify> bundle exec jekyll build --quiet
<done> PRD.md updated
```

### Task 2.4 — Update `docs/TRD.md`
```
<files>  docs/TRD.md
<changes>
  - Title line: "DevFolio" → "TheProFile"
  - Throughout document
<verify> bundle exec jekyll build --quiet
<done> TRD.md updated
```

### Task 2.5 — Update `CLAUDE.md`
```
<files>  CLAUDE.md
<changes>
  - Project name references
  - Directory map header
<verify> bundle exec jekyll build --quiet
<done> CLAUDE.md updated
```

### Task 2.6 — Update `_data/README.md`
```
<files>  _data/README.md
<changes>
  - Title: "DevFolio" → "TheProFile"
  - Throughout
<verify> bundle exec jekyll build --quiet
<done> _data/README.md updated
```

---

## Phase 3: Blog Posts

### Task 3.1 — Update `_posts/2026-04-14-introducing-devfolio.md`
```
<files>  _posts/2026-04-14-introducing-devfolio.md
<changes>
  - Title: "DevFolio:" → "TheProFile:"
  - All content references
<verify> bundle exec jekyll build --quiet
<done> Blog post updated
```

### Task 3.2 — Update `_posts/2026-04-14-elite-restore-features.md`
```
<files>  _posts/2026-04-14-elite-restore-features.md
<changes> All DevFolio → TheProFile references
<verify> bundle exec jekyll build --quiet
<done> Blog post updated
```

### Task 3.3 — Update `_posts/2026-04-14-vanta-performance.md`
```
<files>  _posts/2026-04-14-vanta-performance.md
<changes> All DevFolio → TheProFile references
<verify> bundle exec jekyll build --quiet
<done> Blog post updated
```

### Task 3.4 — Update `_posts/2026-04-14-foundational-design.md`
```
<files>  _posts/2026-04-14-foundational-design.md
<changes> All DevFolio → TheProFile references
<verify> bundle exec jekyll build --quiet
<done> Blog post updated
```

### Task 3.5 — Update `_posts/2026-04-15-mastering-portfolio-as-code-configuration-guide.md`
```
<files>  _posts/2026-04-15-mastering-portfolio-as-code-configuration-guide.md
<changes> All DevFolio → TheProFile references
<verify> bundle exec jekyll build --quiet
<done> Blog post updated
```

---

## Phase 4: Design System

### Task 4.1 — Update `design-system/portfolio/design.md`
```
<files>  design-system/portfolio/design.md
<changes>
  - Title: "DevFolio" → "TheProFile"
  - References
<verify> bundle exec jekyll build --quiet
<done> Design file updated
```

### Task 4.2 — Update `design-system/blog/design.md`
```
<files>  design-system/blog/design.md
<changes> References
<verify> bundle exec jekyll build --quiet
<done> Design file updated
```

---

## Phase 5: Build Verification

### Task 5.1 — Full build test
```
<command> bundle exec jekyll build
<verify> Exit code 0, no Liquid errors
<done> Build succeeds
```

### Task 5.2 — Check all sections render
```
<verify> All 7 sections present in _site/index.html
<done> Hero, Profile, Experience, Education, Skills, Projects, Recommendations, Contact
```

### Task 5.3 — Dark/light toggle test
```
<action> Change mode in profile.json to "light"
<verify> Build passes, no FOUC
<done> Theme switching works
```

---

## Phase 6: Post-Rebranding (Manual Steps)

These must be done manually after code changes:

### Task 6.1 — Rename GitHub repository
```
<Action> GitHub web interface: Settings → Rename repo to "theprofile"
<done> Repo renamed
```

### Task 6.2 — Rename local folder
```
<Action> Rename folder: devfolio/ → theprofile/
<done> Folder renamed
```

### Task 6.3 — Update _config.yml url
```
<Action> url: "https://srisatyalokesh.github.io" → "https://srisatyalokesh.github.io/theprofile"
<done> URL updated
```

### Task 6.4 — Rename logo image (if exists)
```
<Action> assets/img/devfolio.png → assets/img/theprofile.png
<done> Image renamed
```

### Task 6.5 — Re-enable GitHub Pages
```
<Action> Repo Settings → Pages → Re-select GitHub Actions
<done> Pages re-enabled
```

---

## Summary Table

| Phase | Tasks | Files Modified |
|-------|-------|---------------|
| 0 | 2 | Branch setup |
| 1 | 3 | _config.yml, index.html, deploy.yml |
| 2 | 6 | README.md, CONTRIBUTING.md, PRD.md, TRD.md, CLAUDE.md, _data/README.md |
| 3 | 5 | All _posts/*.md files |
| 4 | 2 | design-system/*/design.md |
| 5 | 3 | Build verification |
| 6 | 5 | Manual (not code) |
| **Total** | **26** | **~20 files** |