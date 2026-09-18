/**
 * Manish Kumar Portfolio v2
 * Features: Dark/Light theme, scroll animations, typed text, particles,
 * custom cursor, spotlight, tilt, counter, toast, back-to-top
 */

// ============================================
// THEME MANAGEMENT
// ============================================
const ThemeManager = {
  init() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
      document.documentElement.classList.add('dark');
    }

    // Auto-switch based on time (optional: uncomment to enable)
    // const hour = new Date().getHours();
    // if (!saved && (hour >= 19 || hour < 7)) {
    //   document.documentElement.classList.add('dark');
    // }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        document.documentElement.classList.toggle('dark', e.matches);
      }
    });
  },

  toggle() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }
};

// ============================================
// SCROLL REVEAL
// ============================================
const ScrollReveal = {
  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
};

// ============================================
// NAVBAR
// ============================================
const Navbar = {
  init() {
    const nav = document.getElementById('site-nav');
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');
    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.pageYOffset;
          if (y > 80) {
            nav.style.background = 'var(--nav-bg)';
          } else {
            nav.style.background = '';
          }
          if (y > lastScroll && y > 200) {
            nav.classList.add('hidden');
          } else {
            nav.classList.remove('hidden');
          }
          lastScroll = y;
          ticking = false;
        });
        ticking = true;
      }
    });

    if (toggle) {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', links.classList.contains('open'));
      });

      links.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          toggle.classList.remove('active');
          links.classList.remove('open');
        });
      });
    }
  }
};

// ============================================
// SMOOTH SCROLL
// ============================================
const SmoothScroll = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const id = this.getAttribute('href');
        if (id === '#') return;
        const el = document.querySelector(id);
        if (el) {
          const offset = document.getElementById('site-nav').offsetHeight;
          const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }
};

// ============================================
// ACTIVE NAV LINK
// ============================================
const ActiveNav = {
  init() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          links.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-30% 0px -70% 0px' });

    sections.forEach(s => observer.observe(s));
  }
};

// ============================================
// TYPED TEXT EFFECT
// ============================================
const TypedText = {
  init() {
    const el = document.getElementById('typed');
    if (!el) return;

    const phrases = [
      'full-stack web apps.',
      'secure REST APIs.',
      'responsive UIs.',
      'scalable solutions.',
      'MERN stack projects.'
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let delay = 100;

    const type = () => {
      const current = phrases[phraseIdx];

      if (isDeleting) {
        el.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        delay = 50;
      } else {
        el.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        delay = 80 + Math.random() * 40;
      }

      if (!isDeleting && charIdx === current.length) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        delay = 400;
      }

      setTimeout(type, delay);
    };

    setTimeout(type, 1200);
  }
};

// ============================================
// PARTICLE CANVAS
// ============================================
const Particles = {
  init() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: -1000, y: -1000 };
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 18000), 80);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.3 + 0.1
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains('dark');
      const color = isDark ? '255,255,255' : '0,0,0';

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.x -= dx * 0.01;
          p.y -= dy * 0.01;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${p.opacity})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${color},${0.06 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    document.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
  }
};

// ============================================
// CUSTOM CURSOR
// ============================================
const CustomCursor = {
  init() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const glow = document.querySelector('.cursor-glow');
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!glow || !dot || !ring) return;

    let mx = 0, my = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
    });

    const animate = () => {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      glow.style.left = cx + 'px';
      glow.style.top = cy + 'px';
      ring.style.left = cx + 'px';
      ring.style.top = cy + 'px';
      requestAnimationFrame(animate);
    };
    animate();

    const addHover = () => { dot.classList.add('hovering'); ring.classList.add('hovering'); };
    const removeHover = () => { dot.classList.remove('hovering'); ring.classList.remove('hovering'); };

    document.querySelectorAll('a, button, .project-card, .skill-panel, .ach-card').forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    document.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      glow.style.opacity = '1';
      dot.style.opacity = '1';
      ring.style.opacity = '0.5';
    });
  }
};

// ============================================
// SCROLL PROGRESS BAR
// ============================================
const ScrollProgress = {
  init() {
    const bar = document.querySelector('.progress-bar');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
    });
  }
};

// ============================================
// COUNTER ANIMATION
// ============================================
const Counter = {
  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const spans = entry.target.querySelectorAll('[data-count]');
          spans.forEach(span => {
            const target = parseInt(span.dataset.count);
            const duration = 2000;
            const start = performance.now();

            const update = (now) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              span.textContent = Math.round(eased * target);
              if (progress < 1) requestAnimationFrame(update);
            };
            requestAnimationFrame(update);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const stats = document.getElementById('stats');
    if (stats) observer.observe(stats);
  }
};

// ============================================
// SPOTLIGHT EFFECT
// ============================================
const Spotlight = {
  init() {
    document.querySelectorAll('.spot').forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
        el.style.setProperty('--my', (e.clientY - rect.top) + 'px');
      });
    });
  }
};

// ============================================
// TILT EFFECT
// ============================================
const Tilt = {
  init() {
    document.querySelectorAll('.tilt').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = (y - cy) / 25;
        const ry = (cx - x) / 25;
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
        card.style.transition = 'transform 0.5s var(--ease)';
      });

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease';
      });
    });
  }
};

// ============================================
// COPY EMAIL + TOAST
// ============================================
const CopyEmail = {
  init() {
    document.querySelectorAll('[data-copy]').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.dataset.copy;
        navigator.clipboard.writeText(text).then(() => {
          Toast.show('Email copied to clipboard!');
        }).catch(() => {
          Toast.show('Failed to copy');
        });
      });
    });
  }
};

const Toast = {
  show(message, duration = 3000) {
    const wrap = document.getElementById('toast-wrap');
    if (!wrap) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    wrap.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('out');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};

// ============================================
// BACK TO TOP
// ============================================
const BackToTop = {
  init() {
    const btn = document.getElementById('to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.pageYOffset > 500);
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
};

// ============================================
// LOADING
// ============================================
const Loader = {
  init() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    window.addEventListener('load', () => {
      setTimeout(() => { document.body.style.opacity = '1'; }, 50);
    });
  }
};

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  Loader.init();
  ThemeManager.init();
  ScrollReveal.init();
  Navbar.init();
  SmoothScroll.init();
  ActiveNav.init();
  TypedText.init();
  Particles.init();
  CustomCursor.init();
  ScrollProgress.init();
  Counter.init();
  Spotlight.init();
  Tilt.init();
  CopyEmail.init();
  BackToTop.init();
});
