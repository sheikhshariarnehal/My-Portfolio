/**
 * Particle background configuration for the hero section.
 * Device-aware and respects prefers-reduced-motion.
 */
(function initParticles() {
  'use strict';

  var container = document.getElementById('particles-js');
  if (!container || typeof particlesJS !== 'function') return;

  // Respect user's motion preferences
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    container.style.display = 'none';
    return;
  }

  // Scale particle count and disable hover on mobile for better performance
  var isMobile = window.innerWidth < 768;
  var particleCount = isMobile ? 30 : 80;
  var moveSpeed = isMobile ? 1.5 : 2;

  particlesJS('particles-js', {
    particles: {
      number: {
        value: particleCount,
        density: { enable: true, value_area: 800 }
      },
      color: { value: '#000000' },
      shape: {
        type: 'circle',
        stroke: { width: 0, color: '#000000' }
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: { enable: false }
      },
      size: {
        value: 5,
        random: true,
        anim: { enable: false }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#000000',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: moveSpeed,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        attract: { enable: false }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: !isMobile, mode: 'repulse' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        repulse: { distance: 200 },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  });

  // Pause canvas rendering when hero is off-screen to save CPU/GPU
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      var canvas = container.querySelector('canvas');
      if (!canvas) return;
      canvas.style.display = entries[0].isIntersecting ? '' : 'none';
    }, { threshold: 0.05 });
    observer.observe(container);
  }
})();