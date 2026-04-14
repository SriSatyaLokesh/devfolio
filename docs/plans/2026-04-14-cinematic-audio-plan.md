# Plan: Cinematic Ambient Audio

This plan adds a signature atmospheric background track (Interstellar-themed) that fades in gradually upon the first user interaction, creating a premium "cinematic" landing experience.

## Status: Approved (2026-04-14)

## Technical Architecture

### 1. Data Configuration
Adding the music settings to the central `profile.json`.

**Changes in `_data/profile.json`**:
- Add `theme_config.music` object:
  ```json
  "music": {
    "enabled": true,
    "file": "/assets/music/interstellar.mp3",
    "max_volume": 0.3
  }
  ```

### 2. Audio Component & Logic
Creating the player and the fade-in script.

**New File `_includes/audio_player.html`**:
- Hidden `<audio>` element with `loop` enabled.
- JavaScript logic using **GSAP** to animate `audio.volume` from 0 to `max_volume`.
- Global event listener for `mousedown` or `click` to trigger playback (one-time gesture).

### 3. UI Integration
Adding the sound toggle to the navbar.

**Changes in `_includes/nav.html`**:
- Add a `<button id="sound-toggle">` with a minimalist **Music Wavelength** (4 animated bars).
- Place it next to the theme toggle in the `.nav__actions` group.

**Changes in `assets/css/main.scss`**:
- Styles for the wavelength bars (glassmorphism, currentColor).
- CSS `animation: wavelength-bounce` for a natural audio pulse effect.
- Bars flatten to 20% height when in the `.is-muted` state.

### 4. Layout Integration

**Changes in `_layouts/default.html`**:
- Include `_includes/audio_player.html` before the closing `</body>` tag.

## Verification Plan

### Manual Verification
1. **Initial Load**: Verify the site is silent on load (per browser policy).
2. **First Interaction**: Click anywhere and confirm the music begins to fade in softly.
3. **Volume Ramp**: Confirm the volume increases over **5 seconds** until it reaches the 30% mark.
4. **ToggleButton**: Verify the navbar toggle can pause/play the music with a smooth fade-out/in.
5. **Persistency**: Verify it continues to loop as intended.
