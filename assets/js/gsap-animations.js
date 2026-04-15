/**
 * TheProFile — GSAP Scroll Animations (Elite Restoration v2)
 * --------------------------------------------------------
 * High-fidelity choreography for a premium developer portfolio.
 */

document.addEventListener("DOMContentLoaded", function () {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.error("GSAP or ScrollTrigger not found.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  mm.add({
    isDesktop: "(min-width: 1025px)",
    isTablet: "(min-width: 769px) and (max-width: 1024px)",
    isMobile: "(max-width: 768px)",
    reduceMotion: "(prefers-reduced-motion: reduce)"
  }, (context) => {
    let { isDesktop, isMobile, reduceMotion } = context.conditions;

    if (reduceMotion) return;

    // ─── HERO LOAD SEQUENCE ────────────────────────────────────────────────
    const heroTl = gsap.timeline({ 
      defaults: { ease: "power4.out" },
      onComplete: () => {
        // Enforce visibility of all hero elements just in case
        gsap.set([".hero__badge", ".hero__name", ".hero__headline", ".hero__cta", ".nav"], { 
          clearProps: "all", 
          opacity: 1, 
          visibility: "visible" 
        });
        ScrollTrigger.refresh();
      }
    });
    
    heroTl.fromTo(".hero__badge", { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2 })
          .fromTo(".hero__name", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, "-=0.7")
          .fromTo(".hero__headline", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.9")
          .fromTo(".hero__cta", 
            { y: 20, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              duration: 1, 
              stagger: 0.15,
              ease: "power3.out",
              clearProps: "transform,opacity"
            }, "-=0.6")
          .fromTo(".nav", 
            { yPercent: -150, opacity: 0 },
            { 
              yPercent: 0, 
              opacity: 1, 
              duration: 1.5, 
              ease: "expo.out",
              onComplete: () => {
                gsap.set(".nav", { clearProps: "all" });
              }
            }, "-=1.2");

    // ─── UNIVERSAL SECTION HEADERS ───────────────────────────────────────
    const sectionHeaders = gsap.utils.toArray(".section-header");
    if (sectionHeaders.length > 0) {
      sectionHeaders.forEach(header => {
        gsap.fromTo(header,
          { y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: header,
              start: "top 90%",
              toggleActions: "play none none none"
            },
            y: 0, opacity: 1,
            duration: 1,
            ease: "power2.out",
            clearProps: "all"
          }
        );
      });
    }

    // ─── ABOUT / PROFILE REVEAL ────────────────────────────────────────────
    if (document.querySelector(".profile")) {
      gsap.fromTo(".profile__image-wrap", 
        { scale: 0.9, y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".profile",
            start: "top 80%",
            toggleActions: "play none none none"
          },
          scale: 1, y: 0, opacity: 1,
          duration: 1.4,
          ease: "power2.out",
          clearProps: "all"
        }
      );

      gsap.fromTo(".profile__content > *", 
        { y: 20, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".profile",
            start: "top 80%",
            toggleActions: "play none none none"
          },
          y: 0, opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          clearProps: "all"
        }
      );
    }

    // ─── STAGGERED LISTS (Experience, Education, Recommendations) ─────────
    const createStagger = (selector, trigger) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        gsap.fromTo(elements, 
          { y: 40, opacity: 0 },
          {
            scrollTrigger: {
              trigger: trigger || elements[0],
              start: "top 85%",
              toggleActions: "play none none none"
            },
            y: 0, opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            clearProps: "transform,opacity"
          }
        );
      }
    };

    createStagger(".experience__item", ".experience");
    createStagger(".education__item", ".education");
    createStagger(".rec-card", ".recommendations");

    // ─── SKILLS BENTO GRID (2D Stagger) ───────────────────────────────────
    if (document.querySelector(".skills")) {
      gsap.fromTo(".skills-card", 
        { scale: 0.95, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".skills",
            start: "top 85%",
            toggleActions: "play none none none"
          },
          scale: 1, opacity: 1,
          duration: 0.8,
          stagger: {
            amount: 0.5,
            grid: "auto",
            from: "start"
          },
          ease: "back.out(1.4)",
          clearProps: "all"
        }
      );
    }

    // ─── PROJECTS GRID ────────────────────────────────────────────────────
    if (document.querySelector(".projects")) {
      gsap.fromTo(".project-card", 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".projects",
            start: "top 85%",
            toggleActions: "play none none none"
          },
          y: 0, opacity: 1,
          duration: 0.9,
          stagger: 0.2,
          ease: "power1.out",
          clearProps: "all"
        }
      );
    }

    // ─── CONTACT SECTION ──────────────────────────────────────────────────
    if (document.querySelector(".contact")) {
      const contactTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".contact",
          start: "top 95%", // Fire earlier
          toggleActions: "play none none none",
          onEnter: () => {
            gsap.set(".contact__cta-col > *", { opacity: 1, visibility: "visible" });
          }
        }
      });

      contactTl.fromTo(".contact__cta-col > *", 
                 { y: 20, opacity: 0 },
                 { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out", clearProps: "all" })
               .fromTo(".contact__email-btn", 
                 { y: 20, opacity: 0 },
                 { y: 0, opacity: 1, duration: 0.8, clearProps: "all" }, "-=0.5");
    }

    // ─── BLOG GRID (Editorial Stagger) ────────────────────────────────────
    const blogCards = document.querySelectorAll(".blog-card");
    if (blogCards.length > 0) {
      gsap.fromTo(blogCards, 
        { 
          y: 80, 
          opacity: 0,
          rotateX: -10,
          scale: 0.95
        },
        {
          scrollTrigger: {
            trigger: ".blog-grid",
            start: "top 85%",
            toggleActions: "play none none none"
          },
          y: 0, 
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 1.4,
          stagger: 0.2,
          ease: "expo.out",
          clearProps: "all"
        }
      );
    }

    // ─── READING PROGRESS INDICATOR ───────────────────────────────────────
    const progressIndicator = document.querySelector("#reading-progress");
    if (progressIndicator && document.querySelector(".post")) {
      gsap.to(progressIndicator, {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".post",
          start: "top var(--nav-height)",
          end: "bottom bottom",
          scrub: true
        }
      });
    }

    return () => {
      // Cleanup matchMedia listeners if necessary
    };
  });
});
