---
name: ui-ux-pro-max
description: 'Comprehensive UI/UX design system workflow. Use when designing or implementing web/mobile UI with style, color, typography, UX, and stack-specific guidance.'
argument-hint: 'Product type + industry + style goals (e.g. fintech dashboard minimal)'
user-invocable: true
---

# UI UX Pro Max

Comprehensive design guide for web and mobile applications. Contains 67 styles, 96 color palettes, 57 font pairings, 99 UX guidelines, and 25 chart types across 13 technology stacks. Searchable database with priority-based recommendations.

## Prerequisites

Check if Python is installed:

```bash
python3 --version || python --version
```

If Python is not installed, install it based on user's OS:

**macOS:**
```bash
brew install python3
```

**Ubuntu/Debian:**
```bash
sudo apt update && sudo apt install python3
```

**Windows:**
```powershell
winget install Python.Python.3.12
```

## How to Use This Workflow

When user requests UI/UX work (design, build, create, implement, review, fix, improve), follow this workflow.

### Step 1: Analyze User Requirements

Extract key information from user request:
- Product type: SaaS, e-commerce, portfolio, dashboard, landing page, etc.
- Style keywords: minimal, playful, professional, elegant, dark mode, etc.
- Industry: healthcare, fintech, gaming, education, etc.
- Stack: React, Vue, Next.js, or default to `html-tailwind`

### Step 2: Generate Design System (Required)

Always start with `--design-system` to get comprehensive recommendations with reasoning:

```bash
python .github/skills/ui-ux-pro-max/scripts/search.py "<product_type> <industry> <keywords>" --design-system [-p "Project Name"]
```

This command:
1. Searches 5 domains in parallel (product, style, color, landing, typography)
2. Applies reasoning rules from `ui-reasoning.csv` to select best matches
3. Returns complete design system: pattern, style, colors, typography, effects
4. Includes anti-patterns to avoid

Example:

```bash
python .github/skills/ui-ux-pro-max/scripts/search.py "beauty spa wellness service" --design-system -p "Serenity Spa"
```

### Step 2b: Persist Design System (Master + Overrides Pattern)

To save the design system for hierarchical retrieval across sessions, add `--persist`:

```bash
python .github/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Project Name"
```

This creates:
- `design-system/MASTER.md` - Global source of truth with all design rules
- `design-system/pages/` - Folder for page-specific overrides

With page-specific override:

```bash
python .github/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Project Name" --page "dashboard"
```

This also creates:
- `design-system/pages/dashboard.md` - Page-specific deviations from master

Hierarchical retrieval rule:
1. When building a specific page (for example, checkout), check `design-system/pages/checkout.md` first.
2. If that file exists, its rules override the master file.
3. If not, use `design-system/MASTER.md`.

### Step 3: Supplement with Detailed Searches (as needed)

After getting the design system, use domain searches for additional details:

```bash
python .github/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain> [-n <max_results>]
```

When to use detailed searches:
- More style options: `--domain style "glassmorphism dark"`
- Chart recommendations: `--domain chart "real-time dashboard"`
- UX best practices: `--domain ux "animation accessibility"`
- Alternative fonts: `--domain typography "elegant luxury"`
- Landing structure: `--domain landing "hero social-proof"`

### Step 4: Stack Guidelines (Default: html-tailwind)

Get implementation-specific best practices. If user does not specify a stack, default to `html-tailwind`.

```bash
python .github/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --stack html-tailwind
```

Available stacks: `html-tailwind`, `react`, `nextjs`, `vue`, `svelte`, `swiftui`, `react-native`, `flutter`, `shadcn`, `jetpack-compose`

### Output Expectations

- Recommended pattern, style, palette, typography
- Key anti-patterns to avoid
- Files changed and verification summary

## Common Rules for Professional UI

### Icons and Visual Elements

- No emoji icons: use SVG icons (Heroicons, Lucide, Simple Icons)
- Stable hover states: use color and opacity transitions, avoid layout-shifting transforms
- Correct brand logos: verify official SVG paths from Simple Icons
- Consistent icon sizing: fixed viewBox (24x24) and consistent sizing utilities

### Interaction and Cursor

- Add `cursor-pointer` to all clickable and hoverable cards
- Provide clear hover feedback (color, shadow, border)
- Keep transitions smooth (150-300ms)

### Light and Dark Mode Contrast

- Glass card in light mode: use `bg-white/80` or higher opacity
- Text contrast in light mode: prefer strong text like `#0F172A` for body copy
- Muted text still readable: minimum around slate-600 contrast level
- Borders visible in both modes

### Layout and Spacing

- Floating navbar spacing: keep distance from viewport edges
- Account for fixed navbar height in content spacing
- Use consistent max-width containers across sections

## Pre-Delivery Checklist

### Visual Quality
- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from a consistent icon set
- [ ] Brand logos are correct (verified)
- [ ] Hover states do not cause layout shift

### Interaction
- [ ] All clickable elements have `cursor-pointer`
- [ ] Hover states provide clear visual feedback
- [ ] Transitions are smooth (150-300ms)
- [ ] Focus states are visible for keyboard navigation

### Light/Dark Mode
- [ ] Light mode text contrast is at least 4.5:1
- [ ] Glass and transparent elements are visible in light mode
- [ ] Borders are visible in both modes

### Layout
- [ ] Floating elements have spacing from edges
- [ ] No content hidden behind fixed navbars
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] No horizontal scroll on mobile

### Accessibility
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Color is not the only status indicator
- [ ] `prefers-reduced-motion` is respected
