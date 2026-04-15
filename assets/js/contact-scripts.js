/**
 * TheProFile — Contact Section Scripts
 * Handles interactive elements like the copy-to-clipboard email button.
 */
(function() {
  const btn = document.getElementById('copy-email-btn');
  if (!btn) return;

  btn.addEventListener('click', function () {
    const email = btn.getAttribute('data-email');
    const feedback = btn.querySelector('.contact__copy-feedback');

    if (!email) return;

    navigator.clipboard.writeText(email).then(function() {
      // Success state
      btn.classList.add('contact__email-btn--copied');
      if (feedback) feedback.textContent = 'Copied!';

      // Reset after 2 seconds
      setTimeout(function() {
        btn.classList.remove('contact__email-btn--copied');
        if (feedback) feedback.textContent = '';
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy email: ', err);
    });
  });
})();
