/**
 * Editorial Interactive Particle System
 * Organic, subtle, cursor speed & vector reactive with smooth inertia and settling.
 */

export class ParticleBackground {
  constructor(canvasId = 'particle-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Mouse tracking & speed/direction physics
    this.mouse = {
      x: -1000,
      y: -1000,
      prevX: -1000,
      prevY: -1000,
      vx: 0,
      vy: 0,
      speed: 0,
      targetSpeed: 0,
      isMoving: false,
      lastMoveTime: 0
    };

    // Reduced motion preference
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isMobile = window.innerWidth < 768 || ('ontouchstart' in window);

    // Color palette matching editorial tones (soft wine, warm champagne, literary ink dust)
    this.colors = [
      { r: 115, g: 44, b: 58 },  // Muted wine
      { r: 197, g: 168, b: 128 }, // Warm gold/sand
      { r: 140, g: 128, b: 120 }, // Soft taupe
      { r: 180, g: 155, b: 145 }  // Pale blush-grey
    ];

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();

    if (!this.prefersReducedMotion) {
      requestAnimationFrame(this.animate.bind(this));
    } else {
      this.renderStatic();
    }
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.isMobile = this.width < 768 || ('ontouchstart' in window);

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(this.dpr, this.dpr);
  }

  createParticles() {
    this.particles = [];
    // Mobile uses lower density to preserve battery and visual calm
    const baseDensity = this.isMobile ? 0.00003 : 0.000075;
    const targetCount = Math.max(24, Math.min(this.isMobile ? 36 : 95, Math.floor(this.width * this.height * baseDensity)));

    for (let i = 0; i < targetCount; i++) {
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];
      const x = Math.random() * this.width;
      const y = Math.random() * this.height;

      this.particles.push({
        x: x,
        y: y,
        originX: x,
        originY: y,
        // Natural gentle drift
        baseVx: (Math.random() - 0.5) * (this.isMobile ? 0.2 : 0.35),
        baseVy: (Math.random() - 0.5) * (this.isMobile ? 0.2 : 0.35),
        // Inertia velocity added by cursor
        vx: 0,
        vy: 0,
        radius: Math.random() * 1.5 + 0.8, // 0.8px - 2.3px (delicate ink specs)
        color: color,
        alpha: Math.random() * 0.35 + 0.15,
        targetAlpha: Math.random() * 0.35 + 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
      if (this.prefersReducedMotion) this.renderStatic();
    }, { passive: true });

    // Track mouse with velocity & direction
    window.addEventListener('mousemove', (e) => {
      const now = performance.now();
      const dt = Math.max(1, now - (this.mouse.lastMoveTime || now));

      const dx = e.clientX - (this.mouse.prevX === -1000 ? e.clientX : this.mouse.prevX);
      const dy = e.clientY - (this.mouse.prevY === -1000 ? e.clientY : this.mouse.prevY);

      // Instant velocity px/frame
      const rawSpeed = Math.hypot(dx, dy) / (dt / 16.6);

      // Smooth mouse velocity & speed
      this.mouse.vx = this.mouse.vx * 0.65 + dx * 0.35;
      this.mouse.vy = this.mouse.vy * 0.65 + dy * 0.35;
      this.mouse.targetSpeed = Math.min(rawSpeed, 45);

      this.mouse.prevX = this.mouse.x;
      this.mouse.prevY = this.mouse.y;
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.isMoving = true;
      this.mouse.lastMoveTime = now;
    }, { passive: true });

    // On cursor leaves window
    document.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
      this.mouse.targetSpeed = 0;
      this.mouse.vx = 0;
      this.mouse.vy = 0;
    });

    // Touch support for mobile (subtle drag effect)
    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        this.mouse.x = touch.clientX;
        this.mouse.y = touch.clientY;
        this.mouse.targetSpeed = 5;
        this.mouse.isMoving = true;
        this.mouse.lastMoveTime = performance.now();
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
      this.mouse.targetSpeed = 0;
    });
  }

  animate(time) {
    if (this.prefersReducedMotion) return;

    // Decay mouse speed and inertia if stopped
    if (performance.now() - this.mouse.lastMoveTime > 70) {
      this.mouse.targetSpeed *= 0.88;
      this.mouse.vx *= 0.88;
      this.mouse.vy *= 0.88;
      if (this.mouse.targetSpeed < 0.05) {
        this.mouse.targetSpeed = 0;
        this.mouse.isMoving = false;
      }
    }

    this.mouse.speed += (this.mouse.targetSpeed - this.mouse.speed) * 0.15;

    this.ctx.clearRect(0, 0, this.width, this.height);

    const interactionRadius = this.isMobile ? 90 : 160;
    const connectMaxDist = this.isMobile ? 70 : 100;
    const mouseSpeedBonus = Math.min(this.mouse.speed * 0.12, 3.5);

    // Update and draw particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Subtle breath pulse
      const currentAlpha = p.alpha + Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.08;

      // Mouse distance
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const dist = Math.hypot(dx, dy);

      if (dist < interactionRadius && this.mouse.x > -500) {
        const factor = (1 - dist / interactionRadius);
        // Organic reaction to mouse movement speed & direction
        const pushDirX = dx / (dist || 1);
        const pushDirY = dy / (dist || 1);

        // Movement responds to mouse velocity vector AND outward repulsion
        const impulse = factor * (0.8 + mouseSpeedBonus * 0.5);
        p.vx += pushDirX * impulse * 0.4 + (this.mouse.vx * 0.06 * factor);
        p.vy += pushDirY * impulse * 0.4 + (this.mouse.vy * 0.06 * factor);
      }

      // Smooth settling friction
      p.vx *= 0.94;
      p.vy *= 0.94;

      // Move particle
      p.x += p.baseVx + p.vx;
      p.y += p.baseVy + p.vy;

      // Wrap around screen gently
      if (p.x < -20) p.x = this.width + 20;
      if (p.x > this.width + 20) p.x = -20;
      if (p.y < -20) p.y = this.height + 20;
      if (p.y > this.height + 20) p.y = -20;

      // Draw particle dot
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${Math.max(0.06, currentAlpha)})`;
      this.ctx.fill();

      // Draw faint editorial connection threads between nearby particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const pDx = p.x - p2.x;
        const pDy = p.y - p2.y;
        const pDist = Math.hypot(pDx, pDy);

        if (pDist < connectMaxDist) {
          const lineAlpha = (1 - pDist / connectMaxDist) * 0.09;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(180, 160, 145, ${lineAlpha})`;
          this.ctx.lineWidth = 0.65;
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(this.animate.bind(this));
  }

  renderStatic() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (const p of this.particles) {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha * 0.8})`;
      this.ctx.fill();
    }
  }
}
