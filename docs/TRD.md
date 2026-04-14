# Technical Requirements Document (TRD): DevFolio

> **Version:** 1.0  
> **Last Updated:** 2026-04-12  
> **Status:** Draft  
> **Depends On:** [PRD.md](./PRD.md)

---

## 1. Technology Stack

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Static Site Generator** | [Jekyll](https://jekyllrb.com/) (Ruby) | Liquid templating, `_data/` file support, native GitHub Pages integration, future blog capability |
| **Deployment** | GitHub Pages + GitHub Actions | Zero-cost hosting, automatic deployment on push to `main` |
| **Animated Backgrounds** | [Vanta.js](https://www.vantajs.com/) + [Three.js](https://threejs.org/) | 6 configurable effects, mouse-reactive, CDN-loaded |
| **Badges & Icons** | [Shields.io](https://shields.io/) | API-based badge rendering, no local assets needed |
| **Styling** | SCSS + CSS Custom Properties | Enables JSON-driven theming without JavaScript |
| **Fonts** | Google Fonts (Inter) | Modern, professional, free |
| **Smooth Scroll** | Vanilla JS | Lightweight anchor navigation, no framework needed |

> **No Node.js. No React. No build pipeline beyond Jekyll.**  
> The project must remain deployable with a standard `jekyll serve` or via GitHub Pages without any extra CI configuration.

---

## 2. Directory Structure

```text
devfolio/
├── _data/
│   ├── profile.json           # THE ONLY FILE users need to edit
│   └── profile.example.json   # Fully documented example with inline comments
│
├── _includes/
│   ├── head.html              # <head> with CSS variable injection from JSON
│   ├── nav.html               # Glassmorphism fixed navigation bar
│   ├── footer.html            # Footer with copyright
│   └── sections/
│       ├── hero.html          # Hero section with Vanta.js background
│       ├── profile.html       # Bio section with image
│       ├── experience.html    # Work history
│       ├── education.html     # Academic background
│       ├── projects.html      # 6-project grid
│       ├── recommendations.html # Testimonials
│       └── contact.html       # Social badge wall
│   └── vanta_init.html        # Vanta.js dynamic initialization script
│
├── _layouts/
│   └── default.html           # Root HTML wrapper, includes all sections
│
├── assets/
│   ├── css/
│   │   └── main.scss          # Root styles, CSS variables, layout, components
│   ├── js/
│   │   └── smooth-scroll.js   # Anchor-based scroll behavior
│   └── img/                   # Local images (profile, projects, etc.)
│
├── _config.yml                # Jekyll site config
├── index.html                 # The orchestrator — renders default layout
├── PRD.md                     # Product Requirements Document
├── TRD.md                     # This file
├── README.md                  # Setup guide for end users
└── CONTRIBUTING.md            # (Phase 5) Contribution guidelines
```

---

## 3. `profile.json` — Data Schema

This is the single source of truth. All sections, styles, and links are driven by this file.

```jsonc
{
  // ─── THEME ───────────────────────────────────────────────────────────────
  "theme_config": {
    "mode": "dark",               // "dark" | "light"
    "vanta_effect": "net",        // "net" | "waves" | "rings" | "fog" | "birds" | "clouds"
    "colors": {
      "primary": "#0d1117",       // Page background
      "secondary": "#161b22",     // Cards, nav background
      "accent": "#58a6ff"         // Highlights, links, Vanta color
    }
  },

  // ─── PERSONAL ────────────────────────────────────────────────────────────
  "name": "Sri Satya Lokesh",
  "headline": "Full Stack Developer · Open Source Enthusiast",
  "profile_image_url": "https://avatars.githubusercontent.com/u/...",
  "bio": "A short paragraph about yourself.",

  // ─── SOCIAL LINKS (Contact Section) ──────────────────────────────────────
  "social": [
    { "platform": "GitHub",   "url": "https://github.com/username",   "logo": "github",   "color": "181717" },
    { "platform": "LinkedIn", "url": "https://linkedin.com/in/...",   "logo": "linkedin", "color": "0A66C2" },
    { "platform": "Twitter",  "url": "https://twitter.com/username",  "logo": "twitter",  "color": "1DA1F2" }
  ],

  // ─── EXPERIENCE ──────────────────────────────────────────────────────────
  "experience": [
    {
      "role": "Software Engineer",
      "company": "Acme Corp",
      "company_url": "https://acme.com",
      "duration": "Jan 2023 – Present",
      "description": "Built and maintained microservices using Node.js and AWS."
    }
  ],

  // ─── EDUCATION ───────────────────────────────────────────────────────────
  "education": [
    {
      "degree": "B.Tech in Computer Science",
      "institution": "XYZ University",
      "year": "2022"
    }
  ],

  // ─── PROJECTS (max 6 — hard limit) ───────────────────────────────────────
  "projects": [
    {
      "title": "DevFolio",
      "description": "A Jekyll-based developer portfolio template.",
      "image_url": "https://...",
      "stack": ["Jekyll", "SCSS", "JavaScript"],
      "stack_colors": ["CC0000", "1572B6", "F7DF1E"],
      "stack_logos": ["jekyll", "css3", "javascript"],
      "code_url": "https://github.com/username/devfolio",
      "live_url": "https://username.github.io/devfolio"
    }
  ],

  // ─── RECOMMENDATIONS ─────────────────────────────────────────────────────
  "recommendations": [
    {
      "text": "Lokesh is an exceptional engineer who consistently delivers high-quality work.",
      "name": "Jane Doe",
      "title": "Engineering Manager at Acme Corp",
      "linkedin_url": "https://linkedin.com/in/janedoe"
    }
  ]
}
```

### Schema Rules & Validations

| Field | Rule |
| :--- | :--- |
| `projects` array | **Maximum 6 items.** Extras beyond index 5 are silently ignored by the Liquid `limit:6` filter. |
| `theme_config.mode` | Must be `"dark"` or `"light"`. Defaults to `"dark"` if missing. |
| `theme_config.vanta_effect` | Must be one of the 6 supported strings. Defaults to `"net"` if missing or invalid. |
| `profile_image_url` | Can be an absolute external URL (HTTPS) OR a local path (e.g., `/assets/img/profile.jpg`). |
| `social[].color` | Hex color code **without** the `#` prefix (Shields.io format). |
| `stack_colors[]` | Must be the same length as `stack[]`. Parallel arrays. |

---

## 4. Theming System — CSS Variables via Liquid

### How It Works

The `_includes/head.html` file reads from `profile.json` and injects a `<style>` block into the `<head>`, setting CSS Custom Properties before any stylesheet loads. This prevents Flash of Unstyled Content (FOUC).

```html
<!-- _includes/head.html -->
<style>
  :root {
    --color-primary:   {{ site.data.profile.theme_config.colors.primary }};
    --color-secondary: {{ site.data.profile.theme_config.colors.secondary }};
    --color-accent:    {{ site.data.profile.theme_config.colors.accent }};
  }
</style>
```

### Dark vs Light Mode

The `mode` value in JSON adds a `data-theme` attribute to the `<html>` element:

```html
<!-- _layouts/default.html -->
<html lang="en" data-theme="{{ site.data.profile.theme_config.mode | default: 'dark' }}">
```

In `main.scss`, theme-specific overrides are scoped to this attribute:

```scss
// Default (dark) theme variables are set in :root via head.html
// Light mode overrides:
[data-theme="light"] {
  --color-primary:   #ffffff;
  --color-secondary: #f6f8fa;
  --color-accent:    #0969da;
  --color-text:      #1c2128;
}
```

---

## 5. Vanta.js Initialization

The `_includes/vanta_init.html` file dynamically reads the effect name and accent color from JSON and initializes the correct Vanta effect on the `#hero` element.

```html
<!-- _includes/vanta_init.html -->
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.{{ vanta }}.min.js"></script>

<script>
  window.initVanta = function() {
    const effect = window._VANTA_OVERRIDE || "{{ vanta | upcase }}";
    VANTA[effect]({
      el: "#hero",
      // ... configuration ...
    });
  };

  // ─── MAGIC EASTER EGG (Triggered by Badge Dbl-Click) ───────────────────
  window.randomizeVanta = async function() {
    // 1. Calculate shockwave center relative to #vanta-trigger
    // 2. Animate .hero__magic-wave via radial clip-path expansion
    // 3. Swap Vanta effect dynamically via script injection
    // 4. Re-initialize Vanta context
  };
</script>
```

### Conditional Loading

Vanta.js and Three.js are **only loaded** if `vanta_effect` is defined in the JSON. If the field is absent or empty, neither script is injected — keeping the page lightweight.

```liquid
{% if site.data.profile.theme_config.vanta_effect != "" %}
  {% include vanta_init.html %}
{% endif %}
```

---

## 6. Shields.io Badge Generator

A Liquid include (`badge_gen.html`) constructs the badge URL from passed parameters.

### Usage (in any section template)

```liquid
{% include badge_gen.html label="React" color="61DAFB" logo="react" %}
```

### Include Logic

```liquid
<!-- _includes/badge_gen.html -->
<img
  src="https://img.shields.io/badge/{{ include.label }}-{{ include.color }}?style=for-the-badge&logo={{ include.logo }}&logoColor=white"
  alt="{{ include.label }} badge"
/>
```

### Tech Stack Badges (Projects Section)

For the project grid, badges are generated from the parallel `stack`, `stack_colors`, and `stack_logos` arrays using a Liquid loop with the `forloop.index0` offset:

```liquid
{% for tech in project.stack %}
  {% assign idx = forloop.index0 %}
  {% include badge_gen.html
     label=tech
     color=project.stack_colors[idx]
     logo=project.stack_logos[idx]
  %}
{% endfor %}
```

---

## 7. Projects Section — The 6-Limit Implementation

```liquid
<!-- _includes/sections/projects.html -->
<section id="projects">
  <h2>Projects</h2>
  <div class="project-grid">
    {% for project in site.data.profile.projects limit:6 %}
      <div class="project-card">
        <img src="{{ project.image_url }}" alt="{{ project.title }}" loading="lazy" />
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>
        <div class="badge-row">
          {% for tech in project.stack %}
            {% assign idx = forloop.index0 %}
            {% include badge_gen.html
               label=tech
               color=project.stack_colors[idx]
               logo=project.stack_logos[idx]
            %}
          {% endfor %}
        </div>
        <div class="project-links">
          {% if project.code_url %}
            <a href="{{ project.code_url }}" target="_blank" rel="noopener">GitHub →</a>
          {% endif %}
          {% if project.live_url %}
            <a href="{{ project.live_url }}" target="_blank" rel="noopener">Live Demo →</a>
          {% endif %}
        </div>
      </div>
    {% endfor %}
  </div>
</section>
```

---

## 8. Recommendations Section

```liquid
<!-- _includes/sections/recommendations.html -->
<section id="recommendations">
  <h2>Recommendations</h2>
  <div class="recommendations-grid">
    {% for rec in site.data.profile.recommendations %}
      <div class="rec-card">
        <blockquote>{{ rec.text }}</blockquote>
        <footer>
          <strong>{{ rec.name }}</strong>
          {% if rec.title %}<span>{{ rec.title }}</span>{% endif %}
          {% if rec.linkedin_url %}
            <a href="{{ rec.linkedin_url }}" target="_blank" rel="noopener">
              <img src="https://img.shields.io/badge/LinkedIn-View_Profile-0A66C2?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn" />
            </a>
          {% endif %}
        </footer>
      </div>
    {% endfor %}
  </div>
</section>
```

---

## 9. Navigation — Glassmorphism Fixed Nav

The nav is auto-generated from a fixed list of section anchors. It does not read from JSON (section visibility is always-on in v1).

```scss
// assets/css/main.scss
nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(var(--color-secondary-rgb), 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

// Hero CTAs - Flat Elite Restore Design
.hero__cta {
  box-shadow: none !important; // Explicitly shadowless for premium look
  filter: none !important;     // No hover glows
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 10. Performance & Optimization

| Concern | Strategy |
| :--- | :--- |
| **FOUC (Flash of Unstyled Content)** | CSS variables injected inline in `<head>` before any external stylesheet loads |
| **Vanta.js / Three.js load cost** | Conditionally loaded only if `vanta_effect` is set; deferred with `defer` attribute |
| **Images** | Supports both external URLs and local binary assets in `assets/img/` |
| **Lazy loading** | Project card images use `loading="lazy"` |
| **No JavaScript frameworks** | Vanilla JS only for smooth scroll — keeps bundle size at near-zero |
| **SCSS compilation** | Jekyll's built-in Sass compiler handles `.scss` → `.css` at build time |

---

## 11. GitHub Actions — Deployment Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy DevFolio to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2'
          bundler-cache: true

      - name: Build Jekyll
        run: bundle exec jekyll build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
```

---

## 12. `_config.yml` — Jekyll Configuration

```yaml
title: DevFolio
description: Portfolio-as-Code — A Jekyll developer portfolio template
baseurl: "/devfolio"       # Change to "" if using a custom domain
url: "https://username.github.io"

# Build settings
markdown: kramdown
sass:
  sass_dir: assets/css
  style: compressed

# Exclude from build output
exclude:
  - Gemfile
  - Gemfile.lock
  - README.md
  - PRD.md
  - TRD.md
  - CONTRIBUTING.md
  - node_modules/
  - vendor/
```

---

## 13. `Gemfile` — Ruby Dependencies

```ruby
source "https://rubygems.org"

gem "jekyll", "~> 4.3"
gem "jekyll-sass-converter", "~> 3.0"

group :jekyll_plugins do
  # No extra plugins required for v1
end
```

---

## 14. Open Questions / Risks

| # | Risk / Question | Recommendation |
| :--- | :--- | :--- |
| 1 | **Parallel arrays for badges** (`stack`, `stack_colors`, `stack_logos`) are fragile — misaligned lengths cause silent failures. | Ship `profile.example.json` with clear warnings. Consider a Phase 2 refactor to objects: `{ "name": "React", "color": "61DAFB", "logo": "react" }`. |
| 2 | **Vanta.js CDN availability** — If the CDN is down, the hero section breaks silently. | Add a `try/catch` in `vanta_init.html` with a graceful CSS fallback background. |
| 3 | **No JSON validation** — User typos in JSON cause Jekyll build failures with cryptic errors. | Add a `_tests/validate_profile.rb` script and a GitHub Actions step to validate JSON schema before build. |
| 4 | **Shields.io rate limiting** — If a portfolio goes viral, many badge requests could hit rate limits. | Low risk for v1. Document in the README. Consider badge caching via GitHub Actions in v2. |

---

> **PRD Reference:** Product decisions and roadmap are in [`PRD.md`](./PRD.md).
