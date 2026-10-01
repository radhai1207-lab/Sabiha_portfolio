/**
 * Main Application Orchestrator for SABIHA Editorial Portfolio
 */

import { PORTFOLIO_DATA } from './data.js';
import { ParticleBackground } from './particles.js';
import { IntroLoader } from './loader.js';
import { EditorialCursor } from './cursor.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Interactive Particle Background
  const particles = new ParticleBackground('particle-canvas');

  // 2. Initialize Subtle Custom Cursor
  const cursor = new EditorialCursor();

  // 3. Initialize Cinematic Intro Loader
  const loader = new IntroLoader('intro-loader', () => {
    // Reveal hero elements with staggered entrance
    document.querySelectorAll('.hero-fade').forEach((el, idx) => {
      setTimeout(() => {
        el.classList.add('faded-in');
      }, idx * 120);
    });
  });

  // 4. Reading Progress Bar & Header Scroll State
  const header = document.querySelector('.site-header');
  const progressBar = document.querySelector('.reading-progress-bar');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (header) {
      if (scrollTop > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }, { passive: true });

  // 5. Mobile Navigation Drawer
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-drawer-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 6. Section Scroll Spy (Highlight active nav link)
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px'
  });

  sections.forEach(sec => spyObserver.observe(sec));

  // 7. Hero Floating Typographic Parallax on Mousemove
  const floatingWords = document.querySelectorAll('.floating-word');
  if (floatingWords.length > 0 && window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
      const cx = (e.clientX / window.innerWidth) - 0.5;
      const cy = (e.clientY / window.innerHeight) - 0.5;

      floatingWords.forEach((word, index) => {
        const depth = (index + 1) * 15;
        const moveX = cx * depth;
        const moveY = cy * depth;
        word.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    }, { passive: true });
  }

  // 8. Copy Email to Clipboard Helper
  const copyButtons = document.querySelectorAll('.js-copy-email');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(PORTFOLIO_DATA.author.contacts.email);
        const originalText = btn.innerHTML;
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied Email!`;
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('copied');
        }, 2500);
      } catch (err) {
        window.location.href = `mailto:${PORTFOLIO_DATA.author.contacts.email}`;
      }
    });
  });
});
