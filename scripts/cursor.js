/**
 * Subtle Editorial Custom Cursor
 * Active only on fine pointer devices (desktop).
 * Fluid lerp movement and contextual hover expansion.
 */

export class EditorialCursor {
  constructor() {
    this.hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!this.hasFinePointer) return;

    this.cursorDot = null;
    this.cursorRing = null;
    this.mouse = { x: -100, y: -100 };
    this.ringPos = { x: -100, y: -100 };
    this.scale = 1;
    this.isHovering = false;
    this.hoverText = '';

    this.init();
  }

  init() {
    // Create DOM elements
    this.cursorDot = document.createElement('div');
    this.cursorDot.className = 'editorial-cursor-dot';

    this.cursorRing = document.createElement('div');
    this.cursorRing.className = 'editorial-cursor-ring';

    document.body.appendChild(this.cursorDot);
    document.body.appendChild(this.cursorRing);

    document.body.classList.add('has-custom-cursor');

    this.bindEvents();
    requestAnimationFrame(this.render.bind(this));
  }

  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;

      if (this.cursorDot) {
        this.cursorDot.style.transform = `translate3d(${this.mouse.x}px, ${this.mouse.y}px, 0)`;
      }
    }, { passive: true });

    // Handle interactive hover targets
    const addHoverListeners = () => {
      const interactiveEls = document.querySelectorAll('a, button, .interactive, .book-card, .role-card, .milestone-step');
      
      interactiveEls.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          this.isHovering = true;
          this.cursorRing.classList.add('cursor-expanded');

          if (el.classList.contains('book-card')) {
            this.cursorRing.classList.add('cursor-book');
          }
        });

        el.addEventListener('mouseleave', () => {
          this.isHovering = false;
          this.cursorRing.classList.remove('cursor-expanded', 'cursor-book');
        });
      });
    };

    // Run on init and observe DOM mutations if dynamic elements load
    addHoverListeners();
    const observer = new MutationObserver(() => addHoverListeners());
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener('mouseleave', () => {
      this.cursorDot.style.opacity = '0';
      this.cursorRing.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      this.cursorDot.style.opacity = '1';
      this.cursorRing.style.opacity = '1';
    });
  }

  render() {
    // Smooth lerp for outer ring
    this.ringPos.x += (this.mouse.x - this.ringPos.x) * 0.16;
    this.ringPos.y += (this.mouse.y - this.ringPos.y) * 0.16;

    if (this.cursorRing) {
      this.cursorRing.style.transform = `translate3d(${this.ringPos.x}px, ${this.ringPos.y}px, 0)`;
    }

    requestAnimationFrame(this.render.bind(this));
  }
}
