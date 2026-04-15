/**
 * TheProFile — Main JS (Restored Monolith)
 * -------------------------------------
 * 1. Smooth scroll with nav offset
 * 2. Dark/light theme toggle with localStorage persistence
 * 3. Mobile hamburger menu
 * 4. Navbar scroll-shadow effect
 */
document.addEventListener("DOMContentLoaded", function () {

  // ── 1. Smooth Scroll ──────────────────────────────────────────
  const nav = document.querySelector('.nav');
  const navLinks = document.getElementById('nav-links');
  const hamburger = document.getElementById('nav-toggle');

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      if (this.hash === "") return;
      const target = document.getElementById(this.hash.substring(1));
      if (!target) return;
      e.preventDefault();
      const offset = nav ? (nav.offsetHeight + 24) : 0;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: "smooth"
      });
      history.pushState(null, null, this.hash);
      
      // Close mobile menu on link click
      if (navLinks) navLinks.classList.remove('nav__links--open');
      if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // ── 2. Theme Toggle ───────────────────────────────────────────
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('TheProFile-theme', theme);
    if (themeToggle) {
      if (theme === 'dark') {
        themeToggle.classList.remove('is-light');
      } else {
        themeToggle.classList.add('is-light');
      }
    }
    // Refresh Vanta background immediately if it exists
    if (typeof window.initVanta === 'function') {
      window.initVanta();
    }
  }

  // Sync button state on load
  const currentTheme = html.getAttribute('data-theme') || 'dark';
  applyTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  // ── 3. Mobile Hamburger ───────────────────────────────────────
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('nav__links--open');
      hamburger.setAttribute('aria-expanded', isOpen.toString());
    });
  }

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (nav && !nav.contains(e.target) && navLinks) {
      navLinks.classList.remove('nav__links--open');
      if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // ── 4. Navbar Intelligence (Auto-Hide & Scrollspy) ──────────────────────
  let lastScrollY = window.scrollY;
  const navIndicator = document.querySelector('.nav__indicator');
  const navLinksList = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');

  // A. Scroll Shadow Support (Elite Floating)
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Toggle scrolled state (compact view/shadow)
    if (currentScrollY > 20) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }, { passive: true });

  // B. Scrollspy & Indicator Sync
  const updateIndicator = (activeLink) => {
    if (!activeLink || !navIndicator) return;
    
    const linkRect = activeLink.getBoundingClientRect();
    const parentRect = activeLink.closest('.nav__links').getBoundingClientRect();
    
    navIndicator.style.width = `${linkRect.width}px`;
    navIndicator.style.left = `${linkRect.left - parentRect.left}px`;
    navIndicator.style.opacity = '1';
  };

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        const activeLink = document.querySelector(`.nav__link[href="#${id}"]`);
        
        if (activeLink) {
          navLinksList.forEach(link => link.classList.remove('active'));
          activeLink.classList.add('active');
          updateIndicator(activeLink);
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // Initialize indicator behavior on load
  window.addEventListener('load', () => {
    const activeLink = document.querySelector('.nav__link.active');
    if (activeLink) {
      setTimeout(() => updateIndicator(activeLink), 150);
    }
  });

  // Handle Resize and Orientation changes
  window.addEventListener('resize', () => {
    const activeLink = document.querySelector('.nav__link.active');
    if (activeLink) updateIndicator(activeLink);
  });

});
