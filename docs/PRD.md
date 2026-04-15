# Product Requirements Document (PRD): TheProFile

> **Version:** 1.1  
> **Last Updated:** 2026-04-12  
> **Status:** Approved

---

## 1. Project Vision

**TheProFile** is a high-fidelity, single-page developer portfolio template built on **Jekyll** and hosted via **GitHub Pages**. It follows the **"Portfolio-as-Code"** philosophy — a developer forks the repository, edits a single `profile.json` file, and gets a fully deployed, professional, interactive portfolio website without writing a single line of HTML or CSS.

Jekyll is the chosen foundation because it provides structured Liquid templating, `_data/` file support, and a clear upgrade path to a personal blog in a future release.

---

## 2. Target Audience

- Software developers and engineers at any career stage
- Open-source contributors seeking a zero-maintenance digital presence
- Developers who want a professional portfolio without front-end expertise

---

## 3. User Stories

| Role | Story |
| :--- | :--- |
| **Developer** | I want to fill in a JSON file with my details so I can skip writing HTML/CSS entirely. |
| **Developer** | I want my tech stack displayed as GitHub-style Shields.io badges to align with my professional identity. |
| **Developer** | I want a single-page layout with smooth scrolling so recruiters can find information quickly. |
| **Developer** | I want an animated, interactive background (Vanta.js) so my site looks modern and distinctive. |
| **Developer** | I want to display recommendations from colleagues with their LinkedIn profiles for credibility. |
| **Developer** | I want to switch between dark and light themes to suit my personal brand. |

---

## 4. Feature Breakdown

### 4.1 Core Sections (Fixed Layout)

| Section | Description |
| :--- | :--- |
| **Hero** | Full-viewport area with a Vanta.js animated background, developer name, and headline. |
| **Profile** | Side-by-side layout with an external profile image URL and a bio paragraph. |
| **Experience** | Chronological list of roles with company name (linked), duration, and role description. |
| **Education** | Degrees, institutions, and graduation years. |
| **Projects** | A grid of **exactly up to 6 projects** (hard limit). Each card shows: title, description, Shields.io tech stack badges, a GitHub repo link, and a live demo link. |
| **Recommendations** | A testimonial section. Each entry contains: the recommendation text, the recommender's name, and their LinkedIn profile URL. |
| **Contact** | A collection of Shields.io social media / platform badges (GitHub, LinkedIn, Twitter, etc.) linking to the user's profiles. |

> **Project Limit:** The 6-project maximum is a **hard product constraint**, not a configurable setting. Users are expected to curate only their best 6 works.

### 4.2 Visual Engine

| Feature | Details |
| :--- | :--- |
| **Vanta.js Backgrounds** | Supports 6 effects selectable via JSON: `clouds`, `net`, `waves`, `rings`, `fog`, `birds`. |
| **Three-Color System** | `primary` (page backgrounds), `secondary` (cards & nav), `accent` (interactive elements & Vanta highlights). All driven by JSON. |
| **Theme Modes** | **Dark** and **Light** mode — both supported from **Phase 1**. |
| **Glassmorphism Nav** | A frosted-glass fixed navigation bar for a premium feel. |

---

## 5. The "Zero-Code" Philosophy

The core principle of TheProFile is that **the only file a user should ever need to touch is `_data/profile.json`.**

- All sections, colors, themes, backgrounds, badges, and links are driven by values in this single JSON file.
- A developer who knows Liquid/CSS is free to modify the templates after forking — but the default experience requires zero HTML/CSS knowledge.
- The JSON file will be thoroughly documented with inline comments (via `_data/profile.example.json`) so users always know what each field does.

---

## 6. Use Cases

| Use Case | Description |
| :--- | :--- |
| **Initial Setup** | User forks the repo, updates `_data/profile.json`, enables GitHub Pages — site is live. |
| **Theme Customization** | User changes `accent_color` in JSON to match their personal brand. |
| **Background Swap** | User changes `vanta_effect` from `"net"` to `"waves"` to change the site's visual vibe. |
| **Project Update** | User replaces a project entry in the JSON array; the site grid updates automatically. |
| **Recommendation Add** | User adds a new recommendation object with text, name, and LinkedIn URL. |
| **Social Links** | User adds/removes badge entries to show or hide platform links in the Contact section. |

---

## 7. Project Roadmap

| Phase | Title | Description |
| :---: | :--- | :--- |
| **1** | Foundation | Set up Jekyll project structure, `_data/profile.json` schema, directory layout, and basic Liquid loops. Dark & light theme support. |
| **2** | Data & Badges | Implement full `profile.json` processing, Shields.io dynamic URL generation for tech stack and social badges. |
| **3** | Design Layer | CSS Variables powered by JSON, glassmorphism nav, Vanta.js initialization with all 6 effects. |
| **4** | Section Refinement | Build and polish all 7 sections: Hero, Profile, Experience, Education, Projects, Recommendations, Contact. |
| **5** | Open Source Release | Write `CONTRIBUTING.md`, theme extension guide, and `profile.example.json` with full documentation. Prepare for community contributions. |

---

## 8. Future Considerations (Out of Scope for v1)

- **Blog support** — Jekyll's native post system can be enabled in a future release, giving developers a `/blog` page on the same domain without migrating away from the stack.
- **Multiple layout options** — Alternative section arrangements beyond the current fixed order.
- **Custom domain guide** — Documentation for pointing a personal domain to the GitHub Pages deployment.

---

> **TRD Reference:** Technical implementation details are in [`TRD.md`](./TRD.md).
