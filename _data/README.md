# TheProFile Data Configuration Guide

> This directory is the brain of your portfolio. By editing `profile.json`, you can control every visual, interaction, and content piece on your site without touching a single line of HTML or CSS.

## File Structure

| File | Purpose |
| :--- | :--- |
| `profile.json` | **Active Configuration**. This is the file you edit. |
| `profile.example.json` | Template with example data and structure. |

---

## 1. Theme Configuration (`theme_config`)

Control the high-fidelity aesthetics of your site.

| Field | Description | Suggested Values |
| :--- | :--- | :--- |
| `mode` | Site theme mode. | `"dark"`, `"light"` |
| `vanta_effect` | WebGL background effect. | `"net"`, `"birds"`, `"waves"`, `"clouds"`, `"fog"`, `"rings"`, `"halo"` |
| `vanta_magic` | Enable the "Shockwave" background randomizer. | `true`, `false` |
| `colors.primary` | The core background color. | Hex code (e.g., `#0a0a0c`) |
| `colors.secondary` | The color for cards and secondary panels. | Hex code (e.g., `#121216`) |
| `colors.accent` | Highlights, buttons, and animations. | Hex code (e.g., `#C084FC`) |
| `music.enabled` | Play cinematic background music on entry. | `true`, `false` |
| `music.file` | Path to the audio file. | `./assets/music/interstellar.mp3` |
| `use_logo_image` | Toggle between text name and image logo in nav. | `true`, `false` |
| `nav_bar_logo_url` | Path to your branded logo. | `./assets/img/theprofile.png` |

---

## 2. Profile Details

| Field | Description |
| :--- | :--- |
| `name` | Your full name for the hero and metadata. |
| `headline` | A shorter impact statement/role definition. |
| `email` | Used for the copy-to-clipboard contact button. |
| `profile_image_url` | URL or local path to your portrait. |
| `resume_url` | Link to your PDF resume. |
| `bio` | A longer introduction for the About section. |

---

## 3. Social Media (`social`)

An array of objects representing your platforms.
- `platform`: Name.
- `url`: Link.
- `logo`: Simple Icon slug (e.g., `"github"`, `"linkedin"`).
- `color`: Hex code for the brand badge.

---

## 4. Experience & Education

Structured arrays for your career and academic journey.
- `description`: An array of bullet points for each entry.
- `company_url` / `institution_url`: Optional clickable links.

---

## 5. Projects & Recommendations

Showcase your best work and praise.
- `projects`: Limit to 6 items. Includes `image_url`, `stack`, and code/live links.
- `recommendations`: Use `linkedin_url` to link back to the source.

---

## Suggested "Elite" Color Palettes

| Palette Name | Primary | Secondary | Accent | Vanta Recommendation |
| :--- | :--- | :--- | :--- | :--- |
| **Amethyst Night** | `#0a0a0c` | `#121216` | `#C084FC` | `birds` |
| **Volcano Lead** | `#050505` | `#1a0505` | `#FF4500` | `net` |
| **Cyber Monolith** | `#010101` | `#0f0f12` | `#EAB308` | `rings` |
| **Forest Guard** | `#0a0c0a` | `#121612` | `#10B981` | `waves` |
| **Carbon Blue** | `#0d1117` | `#161b22` | `#58a6ff` | `net` (Classic) |
| **Midnight Rose** | `#0c0a0a` | `#161212` | `#F43F5E` | `fog` |
| **Deep Nebula** | `#0a0a14` | `#121220` | `#8B5CF6` | `clouds` |
| **Electric Slate** | `#0f172a` | `#1e293b` | `#38BDF8` | `net` |
| **Industrial Gold** | `#000000` | `#111111` | `#F59E0B` | `halo` |
| **Matte Crimson** | `#080808` | `#141414` | `#EF4444` | `rings` |

---

## Pro Tips

- **Double-Click Badge**: Double-click the "Available for Work" badge to trigger the background randomizer (if `vanta_magic` is enabled).
- **Cinematic Entrance**: The music starts at 50% and swells to 100% over 20 seconds for maximum impact.
- **Badge Generation**: Use the `stack_logos` array with Simple Icon names to automatically generate themed tech badges.
