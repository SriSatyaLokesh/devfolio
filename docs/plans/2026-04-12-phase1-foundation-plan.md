# Phase 1 — Foundation Implementation Plan
> **Design:** [2026-04-12-phase1-foundation-design.md](./2026-04-12-phase1-foundation-design.md)  
> **Date:** 2026-04-12  
> **Status:** Ready to Execute

---

## Wave 1 — Data & Config Layer
*Everything else depends on these. Build first.*

---

### Task 1.1 — Create `_data/profile.json`
```
<files>  _data/profile.json
<action> Create the single source of truth JSON file with the full schema from TRD §3.
         Include all required fields: theme_config (mode, vanta_effect, colors),
         name, headline, profile_image_url, bio, social[], experience[], education[],
         projects[] (with 2 sample entries — stack/stack_colors/stack_logos must be same length),
         recommendations[]. Use realistic placeholder data. Vanta_effect = "net", mode = "dark".
<verify> bundle exec ruby -e "require 'json'; JSON.parse(File.read('_data/profile.json')); puts 'JSON valid'"
<done>   Command exits 0 and prints "JSON valid". File has all schema fields present.
```

---

### Task 1.2 — Create `Gemfile` and `_config.yml`
```
<files>  Gemfile
         _config.yml
<action> Gemfile: jekyll ~> 4.3, jekyll-sass-converter ~> 3.0. No other gems.
         _config.yml: title=TheProFile, baseurl="/TheProFile", url="https://username.github.io",
         markdown=kramdown, sass.sass_dir=_sass, sass.style=compressed.
         Exclude: Gemfile, Gemfile.lock, docs/, skills/, AGENTS.md, .agent/, .gemini/, adapters/.
<verify> bundle install && bundle exec jekyll doctor
<done>   `jekyll doctor` exits 0. Gemfile.lock is created. No warnings.
```

---

## Wave 2 — Layout & Include Shell
*The HTML skeleton that wraps everything.*

---

### Task 2.1 — Create `_layouts/default.html`
```
<files>  _layouts/default.html
<action> Root HTML shell. Must include:
         - <!DOCTYPE html> + <html lang="en" data-theme="{{ site.data.profile.theme_config.mode | default: 'dark' }}">
         - {% include head.html %}
         - <body> wrapping {% include nav.html %} + {{ content }} + {% include footer.html %}
         - Conditional Vanta loader: {% if site.data.profile.theme_config.vanta_effect != "" %}{% include vanta_init.html %}{% endif %}
         NOTE: vanta_init.html does NOT exist yet in Phase 1. Wrap the include in a file-exists check or leave as a comment placeholder.
<verify> bundle exec jekyll build 2>&1 | head -20
<done>   Jekyll build succeeds. No "file not found" errors.
```

### Task 2.2 — Create `_includes/head.html`
```
<files>  _includes/head.html
<action> <head> tag content. Must include:
         - <meta charset>, <meta viewport>, <title>{{ site.data.profile.name }} | Portfolio</title>
         - Google Fonts: Inter (300,400,500,600,700)
         - Inline <style> block injecting CSS variables from profile.json:
           --color-primary, --color-secondary, --color-accent
         - <link rel="stylesheet" href="{{ "/assets/css/main.css" | prepend: site.baseurl }}">
<verify> bundle exec jekyll build && grep -r "color-primary" _site/index.html
<done>   Grep finds "--color-primary" in the built index.html <head>.
```

### Task 2.3 — Create `_includes/nav.html`
```
<files>  _includes/nav.html
<action> Fixed glassmorphism nav. Hardcoded section anchor links:
         #hero, #profile, #experience, #education, #projects, #recommendations, #contact
         Show site.data.profile.name as the nav brand/logo text (left side).
         Links on the right: About, Experience, Education, Projects, Contact.
         Add class="nav" — styling comes from main.scss in Phase 3, placeholder only.
<verify> bundle exec jekyll build && grep -r 'id="hero"' _site/index.html || echo "nav built"
<done>   Jekyll builds without errors. nav.html is included in built output.
```

### Task 2.4 — Create `_includes/footer.html`
```
<files>  _includes/footer.html
<action> Simple <footer> with: © {{ "now" | date: "%Y" }} {{ site.data.profile.name }}. All rights reserved.
         Add MIT License note and link back to TheProFile repo.
<verify> bundle exec jekyll build && grep -r "All rights reserved" _site/index.html
<done>   Grep finds copyright text in built output.
```

---

## Wave 3 — Section Stubs
*Semantic HTML stubs — correct IDs, data bindings, no styling yet.*

---

### Task 3.1 — Create `_includes/sections/hero.html`
```
<files>  _includes/sections/hero.html
<action> <section id="hero"> containing:
         <h1>{{ site.data.profile.name }}</h1>
         <p class="headline">{{ site.data.profile.headline }}</p>
         No Vanta.js div yet — that's Phase 3.
<verify> bundle exec jekyll build && grep -r 'id="hero"' _site/index.html
<done>   Grep finds id="hero" in built output.
```

### Task 3.2 — Create `_includes/sections/profile.html`
```
<files>  _includes/sections/profile.html
<action> <section id="profile"> with side-by-side layout divs:
         Left: <img src="{{ site.data.profile.profile_image_url }}" alt="{{ site.data.profile.name }}">
         Right: <p>{{ site.data.profile.bio }}</p>
         Add loading="lazy" to the img tag.
<verify> bundle exec jekyll build && grep -r 'id="profile"' _site/index.html
<done>   Grep finds id="profile" and profile_image_url value in built output.
```

### Task 3.3 — Create `_includes/sections/experience.html`
```
<files>  _includes/sections/experience.html
<action> <section id="experience"> with a for loop over site.data.profile.experience.
         Each entry: <article> with <h3>role</h3>, <a href=company_url>company</a>, <span>duration</span>, <p>description</p>.
<verify> bundle exec jekyll build && grep -r 'id="experience"' _site/index.html
<done>   Section present in built output with at least one experience entry rendered.
```

### Task 3.4 — Create `_includes/sections/education.html`
```
<files>  _includes/sections/education.html
<action> <section id="education"> with for loop over site.data.profile.education.
         Each entry: <article> with <h3>degree</h3>, <span>institution</span>, <span>year</span>.
<verify> bundle exec jekyll build && grep -r 'id="education"' _site/index.html
<done>   Section present in built output.
```

### Task 3.5 — Create `_includes/sections/projects.html`
```
<files>  _includes/sections/projects.html
<action> <section id="projects"> with project grid.
         MUST use: {% for project in site.data.profile.projects limit:6 %}
         Each card: <article class="project-card"> with title, description, code_url/live_url links.
         Badge placeholders: render stack[] names as plain <span> tags for now (badge_gen.html is Phase 2).
         Add loading="lazy" to project images.
<verify> bundle exec jekyll build && grep -c "project-card" _site/index.html
<done>   Grep count matches number of projects in JSON (max 6). Even with 10 JSON entries, only 6 render.
```

### Task 3.6 — Create `_includes/sections/recommendations.html`
```
<files>  _includes/sections/recommendations.html
<action> <section id="recommendations"> with for loop over recommendations[].
         Each entry: <article> with <blockquote>text</blockquote>, <footer> with name, title.
         MUST guard: {% if rec.linkedin_url %}<a href="{{ rec.linkedin_url }}">LinkedIn</a>{% endif %}
<verify> bundle exec jekyll build && grep -r 'id="recommendations"' _site/index.html
<done>   Section present. LinkedIn link only appears when linkedin_url is defined.
```

### Task 3.7 — Create `_includes/sections/contact.html`
```
<files>  _includes/sections/contact.html
<action> <section id="contact"> with for loop over social[].
         Each entry: <a href="{{ item.url }}" target="_blank">{{ item.platform }}</a> as placeholder.
         (Full Shields.io badges come in Phase 2.)
<verify> bundle exec jekyll build && grep -r 'id="contact"' _site/index.html
<done>   Social platform links render in built output.
```

---

## Wave 4 — Orchestrator & Styles

---

### Task 4.1 — Create `index.html`
```
<files>  index.html
<action> Front matter: layout: default. No other content in the file.
         Body is entirely composed of section includes:
         {% include sections/hero.html %}
         {% include sections/profile.html %}
         {% include sections/experience.html %}
         {% include sections/education.html %}
         {% include sections/projects.html %}
         {% include sections/recommendations.html %}
         {% include sections/contact.html %}
<verify> bundle exec jekyll serve --detach && curl -s http://localhost:4000/TheProFile/ | grep -c "section"
<done>   At least 7 <section> tags found in the served output. Kill server after check.
```

### Task 4.2 — Create `assets/css/main.scss`
```
<files>  assets/css/main.scss
<action> MUST start with triple-dashes (--- / ---) for Jekyll to process it.
         Structure in this exact order:
         1. Google Fonts @import
         2. :root { --color-primary fallback, --color-secondary fallback, --color-accent fallback,
                    --color-text, --color-muted, --font-main }
         3. [data-theme="light"] { override vars for light mode }
         4. CSS reset (* { box-sizing: border-box; } body { margin:0; font-family: var(--font-main); })
         5. Typography (h1-h4, p, a { color: var(--color-accent); })
         6. .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
         7. section { padding: 4rem 0; }
         8. nav { position: fixed; top:0; width:100%; z-index:1000;
                  background: rgba(22,27,34,0.6); backdrop-filter: blur(12px); }
         9. Responsive: @media (max-width: 768px) { .container { padding: 0 1rem; } }
<verify> bundle exec jekyll build && test -f _site/assets/css/main.css && echo "CSS compiled"
<done>   _site/assets/css/main.css exists and contains "color-primary".
```

---

## Wave 5 — Deploy Pipeline

---

### Task 5.1 — Create `.github/workflows/deploy.yml`
```
<files>  .github/workflows/deploy.yml
<action> GitHub Actions workflow per TRD §11. Triggers on push to main.
         Steps: checkout → ruby/setup-ruby@v1 (ruby 3.2, bundler-cache: true)
         → bundle exec jekyll build → peaceiris/actions-gh-pages@v3 (publish_dir: ./_site)
<verify> cat .github/workflows/deploy.yml | ruby -e "require 'yaml'; YAML.load(STDIN.read); puts 'YAML valid'"
<done>   YAML parses without error. File present at correct path.
```

---

## Final Verification

```bash
# Full end-to-end check
bundle exec jekyll serve --livereload

# Then manually verify:
# 1. http://localhost:4000/TheProFile/ loads
# 2. Change mode to "light" in profile.json → page background turns white
# 3. Add 10 projects to JSON → only 6 cards appear
# 4. Remove linkedin_url from a recommendation → LinkedIn link disappears
```

---

## Task Summary

| Wave | Tasks | Files Created |
| :---: | :---: | :--- |
| 1 | 2 | `_data/profile.json`, `Gemfile`, `_config.yml` |
| 2 | 4 | `_layouts/default.html`, `_includes/head.html`, `_includes/nav.html`, `_includes/footer.html` |
| 3 | 7 | All 7 `_includes/sections/*.html` stubs |
| 4 | 2 | `index.html`, `assets/css/main.scss` |
| 5 | 1 | `.github/workflows/deploy.yml` |
| **Total** | **16** | **16 files** |
