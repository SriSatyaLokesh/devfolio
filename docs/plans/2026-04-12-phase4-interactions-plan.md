# Phase 4 — Section Refinement & Interactions Implementation Plan
> **Design:** [2026-04-12-phase4-interactions-design.md](./2026-04-12-phase4-interactions-design.md)
> **Date:** 2026-04-12
> **Status:** Ready to Execute

---

## Wave 1 — The Smooth Scroll Logic

### Task 4.1 — Create `assets/js/smooth-scroll.js`
```
<files>  assets/js/smooth-scroll.js
<action> Write Vanilla JS to intercept all `<a>` tags with `href` starting with `#`.
         Prevent default default behavior.
         Calculate the target section's top offset `getBoundingClientRect().top + window.scrollY`.
         Subtract the current height of `.nav` (`document.querySelector('.nav').offsetHeight`).
         Execute `window.scrollTo({ top: offsetPosition, behavior: 'smooth' })`.
<verify> ls assets/js/smooth-scroll.js
<done>   File exists and performs the logic described.
```

---

## Wave 2 — Wiring

### Task 4.2 — Link JS to `default.html`
```
<files>  _layouts/default.html
<action> Update `_layouts/default.html` to include `<script defer src="{{ '/assets/js/smooth-scroll.js' | prepend: site.baseurl }}"></script>` right before the `</body>` tag.
<verify> bundle exec jekyll build && Select-String "smooth-scroll" _site/index.html
<done>   Build succeeds and the script tag appears in the compiled `index.html`.
```

---

## Final Verification
```powershell
bundle exec jekyll build
# Expect: Success. Open TheProFile manually in localhost and click nav links to check offset scrolling!
```
