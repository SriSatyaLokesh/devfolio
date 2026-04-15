/**
 * TheProFile — Vanta Controller
 * Manages the initialization, theme-switching, and randomization
 * of Vanta.js background effects.
 */
(function() {
  // WHITELIST: Core Three.js effects supported by the controller
  const VANTA_EFFECTS = ['NET', 'WAVES', 'FOG', 'CLOUDS', 'CLOUDS2', 'RINGS', 'TOPOLOGY', 'BIRDS', 'HALO'];

  /**
   * ELITE PRESETS: Sequential cycles for the Easter Egg.
   * Based on _data/README.md "Elite" Color Palettes.
   */
  const ELITE_PRESETS = [
    { name: "Amethyst Night",   effect: "BIRDS",  primary: "#0a0a0c", secondary: "#121216", accent: "#C084FC" },
    { name: "Volcano Lead",     effect: "NET",    primary: "#050505", secondary: "#1a0505", accent: "#FF4500" },
    { name: "Cyber Monolith",   effect: "RINGS",  primary: "#010101", secondary: "#0f0f12", accent: "#EAB308" },
    { name: "Forest Guard",     effect: "WAVES",  primary: "#0a0c0a", secondary: "#121612", accent: "#10B981" },
    { name: "Carbon Blue",      effect: "NET",    primary: "#0d1117", secondary: "#161b22", accent: "#58a6ff" },
    { name: "Midnight Rose",    effect: "FOG",    primary: "#0c0a0a", secondary: "#161212", accent: "#F43F5E" },
    { name: "Deep Nebula",      effect: "CLOUDS", primary: "#0a0a14", secondary: "#121220", accent: "#8B5CF6" },
    { name: "Electric Slate",   effect: "NET",    primary: "#0f172a", secondary: "#1e293b", accent: "#38BDF8" },
    { name: "Industrial Gold",  effect: "HALO",   primary: "#000000", secondary: "#111111", accent: "#F59E0B" },
    { name: "Matte Crimson",    effect: "RINGS",  primary: "#080808", secondary: "#141414", accent: "#EF4444" }
  ];
  
  // Configuration passed from the global DEV_FOLIO_CONFIG object
  const getConfig = () => window.DEV_FOLIO_CONFIG || {};

  window.loadVantaScript = function(effectName) {
    return new Promise((resolve, reject) => {
      const slug = effectName.toLowerCase();
      if (typeof VANTA !== 'undefined' && typeof VANTA[effectName] === 'function') {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = `https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.${slug}.min.js`;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  /**
   * Dynamically updates CSS custom properties on the root element
   * to reflect the new theme colors.
   */
  window.updateThemeColors = function(primary, secondary, accent) {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', primary);
    root.style.setProperty('--color-secondary', secondary);
    root.style.setProperty('--color-accent', accent);
    
    // Update global config so Vanta picks up new colors on init
    if (window.DEV_FOLIO_CONFIG) {
      window.DEV_FOLIO_CONFIG.primaryColor = primary;
      window.DEV_FOLIO_CONFIG.accentColor = accent;
    }
    
    console.log(`[TheProFile] Theme Updated: Primary: ${primary}, Accent: ${accent}`);
  };

  /**
   * Sequentially cycles through Elite Vanta presets with a cinematic shockwave transition.
   */
  window.randomizeVanta = async function() {
    const config = getConfig();
    const trigger = document.getElementById('vanta-trigger');
    const heroContent = document.querySelector('.hero__content');
    const shockwave = document.getElementById('vanta-shockwave');
    const heroSection = document.getElementById('hero');
    
    if (trigger) trigger.classList.add('loading');

    // Shockwave Animation Calculation
    if (shockwave && heroSection && trigger) {
      const rect = trigger.getBoundingClientRect();
      const heroRect = heroSection.getBoundingClientRect();
      const centerX = ((rect.left + rect.width/2) - heroRect.left) / heroRect.width * 100;
      const centerY = ((rect.top + rect.height/2) - heroRect.top) / heroRect.height * 100;

      gsap.set(shockwave, { 
        clipPath: `circle(0% at ${centerX}% ${centerY}%)`,
        opacity: 0.8,
        display: 'block'
      });

      gsap.to(shockwave, {
        clipPath: `circle(150% at ${centerX}% ${centerY}%)`,
        opacity: 0,
        duration: 1.8,
        ease: "power2.out",
        onComplete: () => gsap.set(shockwave, { display: 'none' })
      });
    }
    
    if (heroContent) {
      gsap.to(heroContent, { y: -15, scale: 1.02, opacity: 0.7, duration: 0.8, ease: "power2.out" });
    }

    // Sequential Cycling Logic
    if (typeof window.DEV_FOLIO_PRESET_INDEX === 'undefined') {
      window.DEV_FOLIO_PRESET_INDEX = 0;
    } else {
      window.DEV_FOLIO_PRESET_INDEX = (window.DEV_FOLIO_PRESET_INDEX + 1) % ELITE_PRESETS.length;
    }

    const preset = ELITE_PRESETS[window.DEV_FOLIO_PRESET_INDEX];
    const nextEffect = preset.effect;

    // Apply colors to the UI
    window.updateThemeColors(preset.primary, preset.secondary, preset.accent);

    try {
      await window.loadVantaScript(nextEffect);
      window.DEV_FOLIO_CURRENT_VANTA = nextEffect;
      window.initVanta();
    } catch (err) {
      console.error("Vanta randomization failed:", err);
    } finally {
      if (trigger) trigger.classList.remove('loading');
      if (heroContent) {
        gsap.to(heroContent, { y: 0, scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.75)" });
      }
    }
  };

  /**
   * Main initialization function for Vanta effects.
   */
  window.initVanta = function() {
    if (window.DEV_FOLIO_VANTA_INSTANCE) {
      window.DEV_FOLIO_VANTA_INSTANCE.destroy();
    }

    const config = getConfig();
    const effectKey = (window.DEV_FOLIO_CURRENT_VANTA || config.vantaEffect || 'NET').toUpperCase();
    
    const colorToNum = (hex) => parseInt((hex || '#000000').replace("#", "0x"), 16);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const bgStr = isLight ? (config.lightBg || '#f0f4f8') : config.primaryColor;
    const accent = colorToNum(config.accentColor);
    const bg = colorToNum(bgStr);

    let vantaConfig = {
      el: "#hero",
      mouseControls: true, touchControls: true, gyroControls: false,
      minHeight: 200.00, minWidth: 200.00,
      backgroundColor: bg, color: accent
    };

    // Advanced precision tuning for specific effects
    switch(effectKey) {
      case 'BIRDS':
        vantaConfig.color1 = accent; vantaConfig.color2 = accent;
        vantaConfig.colorMode = "lerp"; vantaConfig.birdSize = 1.2;
        break;
      case 'WAVES':
        vantaConfig.shininess = isLight ? 50 : 150; 
        vantaConfig.waveHeight = 35.0; vantaConfig.waveSpeed = 1.0; vantaConfig.zoom = 0.8;
        break;
      case 'FOG':
        vantaConfig.highlightColor = accent; vantaConfig.midtoneColor = accent;
        vantaConfig.lowlightColor = accent; vantaConfig.baseColor = bg;
        break;
      case 'DOTS':
        vantaConfig.size = 3.0; vantaConfig.spacing = 35.0;
        break;
      case 'CLOUDS':
      case 'CLOUDS2':
        if (isLight) {
          vantaConfig.skyColor = 0x68b2e3; vantaConfig.cloudColor = 0xadc1d6;
          vantaConfig.sunColor = 0xff9919; vantaConfig.sunlightColor = 0xff9933;
        } else {
          vantaConfig.skyColor = colorToNum(effectKey === 'CLOUDS2' ? '#0d1117' : bgStr);
          vantaConfig.cloudColor = 0x334155; vantaConfig.sunColor = accent;
        }
        if (effectKey === 'CLOUDS2' && !isLight) vantaConfig.lightColor = accent;
        break;
      case 'TOPOLOGY':
        vantaConfig.speed = 6.0;
        break;
      case 'HALO':
        const haloBg = isLight ? 0x94a3b8 : bg;
        vantaConfig.backgroundColor = haloBg; vantaConfig.baseColor = haloBg;
        vantaConfig.color2 = accent; vantaConfig.amplitudeFactor = 2.0;
        break;
    }

    try {
      if (typeof VANTA !== 'undefined' && typeof VANTA[effectKey] === 'function') {
        const instance = VANTA[effectKey](vantaConfig);
        
        // Post-init monochromatic fix for legacy effects
        if (effectKey === 'RINGS' || effectKey === 'HALO') {
          if (instance.colors) instance.colors = [accent, accent];
          if (instance.options) { instance.options.color = accent; instance.options.color2 = accent; }
          if (typeof instance.restart === 'function') instance.restart();
        }
        window.DEV_FOLIO_VANTA_INSTANCE = instance;
      }
    } catch(err) {
      console.error("Vanta instance failed:", err);
    }
  };

  // Setup Event Listeners
  document.addEventListener('DOMContentLoaded', () => {
    // Initial load
    window.initVanta();
    
    // Double-click trigger for Easter Egg
    const trigger = document.getElementById('vanta-trigger');
    if (trigger) {
      trigger.addEventListener('dblclick', (e) => {
        e.preventDefault();
        window.randomizeVanta();
      });
      trigger.addEventListener('mousedown', (e) => {
        if (e.detail > 1) e.preventDefault();
      });
    }
  });
})();
