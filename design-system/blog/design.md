# DESIGN.md - Blog Specification (Elite 2026 Edition)

This document establishes the high-fidelity design standards for the TheProFile blogging system, defined by the "Elite 2026" magazine aesthetic.

## Aesthetic Identity: Liquid Glass
- **Mood:** Immersive, editorial, premium digital publication.
- **Visual Markers:** Dynamic reflections, multi-layered blurs, high-fidelity image grid.

## Global Tokens

| Token | Value | Requirement |
|-------|-------|-------------|
| **Background** | `#FAFAFA` / `#18181A` | Bipolar (Dark Default) |
| **Glass BG** | `rgba(255, 255, 255, 0.03)` | Frosted surface |
| **Glass Border**| `rgba(255, 255, 255, 0.08)` | High-precision hairline |
| **Accent Glow** | `var(--color-accent)` | Contextual illumination |

## Typography
- **Heading Font:** Libre Bodoni (Serif)
- **Body Font:** Public Sans (Sans-Serif)
- **Hierarchy:** Dramatic scale shifts (headers up to 4.5rem) to evoke established print journalism.

## Editorial Infrastructure

### The Magazine Grid (Index)
- **Architecture:** Asymmetric 12-column grid.
- **Scale:** Expanded 1400px immersive width.
- **Rhythm:** Cyclical card spans (span-8, span-4, span-12) to create visual cadence.

### The Immersive Post (Reading)
- **Column:** Expanded 1000px reading width for high-fidelity comfort.
- **Visuals:** Full-bleed hero images and high-fidelity code blocks.
- **Engagement:** 3-up recommendation grid at article termination.

## Interaction & Motion
- **Reveal:** Spatial GSAP staggers (staggered Y-reveal + micro-rotations).
- **Progress:** Fixed GSAP reading indicator at page top.
- **Glow Effects:** Hover-triggered micro-lighting shifts.

## Anti-Patterns
- ❌ No emojis in headers.
- ❌ No generic card grids (avoid standard 3-column rows).
- ❌ No hard shadows (use layered `var(--shadow-xl)` tokens).
- ❌ No un-clamped content (prevent vertical design leaks).
