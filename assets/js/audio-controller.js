/**
 * DevFolio — Audio Controller
 * Manages the cinematic background music, volume fading, 
 * and sound-toggle UI synchronization.
 */
(function() {
  const audio = document.getElementById('bg-music');
  if (!audio) return;

  // Configuration passed from the template via data attributes or global object
  const targetVolume = parseFloat(audio.dataset.maxVolume) || 0.3;
  let hasStarted = false;

  /**
   * Smoothly fades the audio volume and handles play/pause states.
   */
  window.fadeAudio = function(toVolume, duration = 1.5) {
    if (!audio) return;
    
    gsap.to(audio, {
      volume: toVolume,
      duration: duration,
      ease: "power2.inOut",
      onStart: () => {
        if (toVolume > 0 && audio.paused) {
          audio.play().catch(err => console.warn("Audio play blocked:", err));
        }
      },
      onComplete: () => {
        if (toVolume === 0) audio.pause();
        updateSoundToggleUI();
      }
    });
  };

  /**
   * Toggles sound between target volume and silence.
   */
  window.toggleSound = function() {
    if (!audio) return;
    if (audio.paused || audio.volume === 0) {
      window.fadeAudio(targetVolume, 2);
    } else {
      window.fadeAudio(0, 1);
    }
  };

  /**
   * Initiates the cinematic volume ramp on first user interaction.
   */
  function startCinematicExperience() {
    if (hasStarted) return;
    hasStarted = true;
    
    // Initial ramp to 50% for immediate feedback
    audio.volume = 0.5; 
    audio.play().then(() => {
      const tl = gsap.timeline({
        onComplete: () => updateSoundToggleUI()
      });

      tl.to(audio, {
        volume: 0.8,
        duration: 5,
        ease: "power2.out"
      })
      .to(audio, {
        volume: targetVolume,
        duration: 15,
        ease: "power1.inOut"
      });

    }).catch(err => {
      console.warn("Autoplay blocked. Experience will wait for manual toggle.");
      hasStarted = false; 
    });

    // Cleanup ephemeral interaction listeners
    ['click', 'mousedown', 'keydown', 'touchstart'].forEach(evt => {
      document.removeEventListener(evt, startCinematicExperience);
    });
  }

  /**
   * Synchronizes the navbar toggle button with the current audio state.
   */
  function updateSoundToggleUI() {
    const btn = document.getElementById('sound-toggle');
    if (!btn) return;
    
    if (audio.paused || audio.volume === 0) {
      btn.classList.add('is-muted');
    } else {
      btn.classList.remove('is-muted');
    }
  }

  // Listen for initial interaction to start the mood
  ['click', 'mousedown', 'keydown', 'touchstart'].forEach(evt => {
    document.addEventListener(evt, startCinematicExperience, { once: true });
  });

  // Export UI sync to global window for external access
  window.updateSoundToggleUI = updateSoundToggleUI;
})();
