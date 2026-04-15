/**
 * { TheProFile } — Theme Controller
 * --------------------------------
 * Handles color palette cycling (branding easter egg), 
 * light/dark mode transitions, and CSS variable management.
 * Clean Code Principle: Separates branding identity from animation logic.
 */
(function() {
  
  /**
   * ELITE PRESETS: Curated sequential palettes for the Branding Easter Egg.
   * Based on _data/README.md "Elite" Color Palettes.
   */
  const ELITE_PRESETS = [
    { name: "Amethyst Night",   primary: "#0a0a0c", secondary: "#121216", accent: "#C084FC" },
    { name: "Volcano Lead",     primary: "#050505", secondary: "#1a0505", accent: "#FF4500" },
    { name: "Cyber Monolith",   primary: "#010101", secondary: "#0f0f12", accent: "#EAB308" },
    { name: "Forest Guard",     primary: "#0a0c0a", secondary: "#121612", accent: "#10B981" },
    { name: "Carbon Blue",      primary: "#0d1117", secondary: "#161b22", accent: "#58a6ff" },
    { name: "Midnight Rose",    primary: "#0c0a0a", secondary: "#161212", accent: "#F43F5E" },
    { name: "Deep Nebula",      primary: "#0a0a14", secondary: "#121220", accent: "#8B5CF6" },
    { name: "Electric Slate",   primary: "#0f172a", secondary: "#1e293b", accent: "#38BDF8" },
    { name: "Industrial Gold",  primary: "#000000", secondary: "#111111", accent: "#F59E0B" },
    { name: "Matte Crimson",    primary: "#080808", secondary: "#141414", accent: "#EF4444" }
  ];

  /**
   * Dynamically updates CSS custom properties on the root element.
   * LIGHT MODE FIX: Selectively ignores dark backgrounds when in light mode.
   */
  window.updateThemeColors = function(primary, secondary, accent) {
    const root = document.documentElement;
    const isLight = root.getAttribute('data-theme') === 'light';
    
    // Always update accent
    root.style.setProperty('--color-accent', accent);
    
    // Context-Aware Background Update: 
    // If in Light Mode, we skip dark primary/secondary to maintain visibility.
    if (!isLight) {
      root.style.setProperty('--color-primary', primary);
      root.style.setProperty('--color-secondary', secondary);
    } else {
      // Clear manual overrides when in light mode so SASS defaults take over
      root.style.removeProperty('--color-primary');
      root.style.removeProperty('--color-secondary');
    }
    
    // Sync with global config for Vanta re-initialization
    if (window.DEV_FOLIO_CONFIG) {
      window.DEV_FOLIO_CONFIG.accentColor = accent;
      if (!isLight) window.DEV_FOLIO_CONFIG.primaryColor = primary;
    }
    
    console.log(`[TheProFile] Palette Switch: ${accent} (Mode: ${isLight ? 'Light' : 'Dark'})`);
  };

  /**
   * Sequentially cycles through Elite Color Palettes.
   * Triggered by the Navigation Brand logo.
   */
  window.cycleColorPalette = function() {
    if (typeof window.DEV_FOLIO_COLOR_INDEX === 'undefined') {
      window.DEV_FOLIO_COLOR_INDEX = 0;
    } else {
      window.DEV_FOLIO_COLOR_INDEX = (window.DEV_FOLIO_COLOR_INDEX + 1) % ELITE_PRESETS.length;
    }

    const preset = ELITE_PRESETS[window.DEV_FOLIO_COLOR_INDEX];
    window.updateThemeColors(preset.primary, preset.secondary, preset.accent);

    // Refresh Vanta if current effect depends on accent/bg
    if (typeof window.initVanta === 'function') {
      window.initVanta();
    }

    // Visual feedback for trigger
    const brand = document.querySelector('.nav__brand');
    if (brand) {
      gsap.to(brand, { 
        scale: 1.15, 
        duration: 0.15, 
        ease: "power2.out", 
        onComplete: () => gsap.to(brand, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" })
      });
    }
  };

  /**
   * Core Theme Toggler Logic (Refactored from main.js/smooth-scroll.js)
   */
  window.applyTheme = function(theme) {
    const html = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');

    html.setAttribute('data-theme', theme);
    localStorage.setItem('TheProFile-theme', theme);
    
    // Clear manual background overrides when switching to light mode
    if (theme === 'light') {
      html.style.removeProperty('--color-primary');
      html.style.removeProperty('--color-secondary');
    } else {
      // Re-apply current preset colors if in dark mode
      if (typeof window.DEV_FOLIO_COLOR_INDEX !== 'undefined') {
        const preset = ELITE_PRESETS[window.DEV_FOLIO_COLOR_INDEX];
        window.updateThemeColors(preset.primary, preset.secondary, preset.accent);
      }
    }

    if (themeToggle) {
      if (theme === 'dark') {
        themeToggle.classList.remove('is-light');
      } else {
        themeToggle.classList.add('is-light');
      }
    }

    // Refresh Vanta background immediately
    if (typeof window.initVanta === 'function') {
      window.initVanta();
    }
  };

  // Setup Interaction Listeners
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Brand (Branding Easter Egg)
    const brand = document.querySelector('.nav__brand');
    if (brand) {
      brand.addEventListener('dblclick', (e) => {
        e.preventDefault();
        window.cycleColorPalette();
      });
      brand.addEventListener('mousedown', (e) => {
        if (e.detail > 1) e.preventDefault();
      });
    }

    // 2. Theme Toggle (Consolidated)
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        window.applyTheme(next);
      });
    }
  });

})();
