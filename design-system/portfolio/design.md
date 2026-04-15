# DESIGN.md - Portfolio Specification (Linear Inspired)

This document establishes the high-fidelity design standards for the TheProFile portfolio, based on the `getdesign.md` Linear template.

## Global Tokens

| Token | Value | Requirement |
|-------|-------|-------------|
| **Background** | `#000000` | Void-black primary canvas |
| **Surface** | `#111111` | Subtle secondary layering |
| **Accent** | `#5E6AD2` | Signature Linear Purple |
| **Text (Primary)** | `#FFFFFF` | Weight 400/500 density |
| **Text (Muted)** | `#8A8F98` | Weight 300 precision |

## Typography
- **Core Font:** Inter (or Geist if available)
- **Scale:** High typographic density with tight letter-spacing (`-0.02em` for headings).
- **Style:** Ultra-minimal, precise, professional.

## Layout & Spacing
- **Grid:** 12-column precise grid.
- **Rhythm:** Modular increments of 4px.
- **Max Width:** 1200px (standard) / 1400px (immersive).

## Component Standards

### Cards & Sections
- **Borders:** 1px hairline border (`rgba(255,255,255,0.08)`).
- **Shadows:** Near-zero UI noise; use high-precision glows for focus states only.
- **Interaction:** Smooth transitions (200ms ease) with subtle vertical translations.

### Buttons & CTAs
- **Primary:** Purple accent (`#5E6AD2`) with white text.
- **Secondary:** Transparent with frosted border.
- **Cursor:** Always `cursor-pointer` for interactive elements.

## Anti-Patterns
- ❌ No emojis as icons.
- ❌ No layout-shifting transforms.
- ❌ No heavy drop shadows.
- ❌ No vibrant, high-saturation background colors.
