/**
 * Cinematic Magnetic Lens Controller
 * -----------------------------------------
 * GSAP-powered custom cursor with liquid follow,
 * magnetic lens expansion, and contextual labels.
 */

document.addEventListener("DOMContentLoaded", function () {
  const dot = document.querySelector(".cursor-dot");
  const outline = document.querySelector(".cursor-outline");
  const label = document.querySelector(".cursor-label");

  if (!dot || !outline) return;

  let mouseX = 0, mouseY = 0;
  let posX = 0, posY = 0;
  let isVisible = false;

  // Track Mouse Move
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      gsap.to([dot, outline], { opacity: 1, duration: 0.3 });
      isVisible = true;
    }
  });

  // Ticker for smooth liquid animation
  gsap.ticker.add(() => {
    // Liquid easing (0.15 is the "snappiness")
    const dt = 1.0 - Math.pow(1.0 - 0.15, gsap.ticker.deltaRatio()); 
    posX += (mouseX - posX) * dt;
    posY += (mouseY - posY) * dt;

    // Dot is snappy (nearly 1:1)
    gsap.set(dot, { left: mouseX, top: mouseY });

    // Lens follows with liquid lag
    gsap.set(outline, { left: posX, top: posY });
  });

  // Handle Hover States
  const interactables = "a, button, .social-icon, [role='button'], .hero__cta";
  const projectCards = ".project-card";
  
  // Generic hover logic
  const onMouseEnter = () => document.body.classList.add("is-hovering");
  const onMouseLeave = () => document.body.classList.remove("is-hovering");

  // Project card logic
  const onProjectEnter = () => {
    document.body.classList.add("is-hovering-project");
  };
  const onProjectLeave = () => {
    document.body.classList.remove("is-hovering-project");
  };

  // Delegate listeners for efficiency
  document.addEventListener("mouseover", (e) => {
    const target = e.target;
    
    // Check Project Cards
    if (target.closest(projectCards)) {
      onProjectEnter();
      return;
    }

    // Check Generic Interactables
    if (target.matches(interactables) || target.closest("a")) {
      onMouseEnter();
    }
  });

  document.addEventListener("mouseout", (e) => {
    const target = e.target;

    if (target.closest(projectCards)) {
      onProjectLeave();
    }

    if (target.matches(interactables) || target.closest("a")) {
      onMouseLeave();
    }
  });

  // Hide when leaving viewport
  document.addEventListener("mouseleave", () => {
    gsap.to([dot, outline], { opacity: 0, duration: 0.3 });
    isVisible = false;
  });

  // Mobile detection
  if (window.matchMedia("(pointer: coarse)").matches) {
    dot.style.display = "none";
    outline.style.display = "none";
  }
});
