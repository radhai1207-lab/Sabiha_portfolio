/**
 * Cinematic Editorial Intro Loader
 * Assembles "SABIHA" letter by letter, reveals creative roles,
 * presents the literary ethos, then smoothly unveils the portfolio.
 */

export class IntroLoader {
  constructor(loaderId = 'intro-loader', onComplete = null) {
    this.loader = document.getElementById(loaderId);
    this.onComplete = onComplete;
    this.letters = ['S', 'SA', 'SAB', 'SABI', 'SABIH', 'SABIHA'];
    this.currentStep = 0;
    this.isSkipped = false;
    this.hasCompleted = false;

    if (!this.loader) return;

    this.nameEl = this.loader.querySelector('.loader-name');
    this.rolesEl = this.loader.querySelector('.loader-roles');
    this.statusEl = this.loader.querySelector('.loader-status');
    this.revealEl = this.loader.querySelector('.loader-reveal');
    this.skipBtn = this.loader.querySelector('.loader-skip');

    this.init();
  }

  init() {
    // Check if reduced motion is requested
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      this.finish(true);
      return;
    }

    if (this.skipBtn) {
      this.skipBtn.addEventListener('click', () => this.finish(true));
    }

    // Allow escape key to skip
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.hasCompleted) {
        this.finish(true);
      }
    });

    this.runSequence();
  }

  async runSequence() {
    // 1. Assemble name letter by letter
    for (let i = 0; i < this.letters.length; i++) {
      if (this.isSkipped) return;
      if (this.nameEl) {
        this.nameEl.textContent = this.letters[i];
      }
      await this.wait(180);
    }

    await this.wait(350);

    // 2. Reveal roles sequentially
    if (this.rolesEl && !this.isSkipped) {
      this.rolesEl.classList.add('visible');
    }

    await this.wait(600);

    // 3. Subtle literary status line
    if (this.statusEl && !this.isSkipped) {
      this.statusEl.classList.add('visible');
    }

    await this.wait(900);

    // 4. Reveal theme ethos: "WORDS, WRITTEN. STORIES, SHAPED."
    if (this.revealEl && !this.isSkipped) {
      this.revealEl.classList.add('visible');
    }

    await this.wait(1100);

    this.finish();
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  finish(immediate = false) {
    if (this.hasCompleted) return;
    this.hasCompleted = true;
    this.isSkipped = true;

    if (immediate) {
      this.loader.classList.add('loader-vanish-fast');
      setTimeout(() => {
        this.loader.style.display = 'none';
        document.body.classList.add('loaded');
        if (this.onComplete) this.onComplete();
      }, 300);
    } else {
      this.loader.classList.add('loader-vanish');
      setTimeout(() => {
        this.loader.style.display = 'none';
        document.body.classList.add('loaded');
        if (this.onComplete) this.onComplete();
      }, 900);
    }
  }
}
