/**
 * Manish Kumar Portfolio - JavaScript
 * Features: Dark/Light theme toggle, scroll animations, mobile menu, smooth scrolling
 */

// ============================================
// THEME MANAGEMENT
// ============================================
const ThemeManager = {
  init() {
    const themeToggle = document.getElementById("theme-toggle");
    const html = document.documentElement;

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    // Theme toggle click handler
    themeToggle.addEventListener("click", () => {
      html.classList.toggle("dark");
      const isDark = html.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");

      // Animate the toggle button
      this.animateToggle(themeToggle);
    });

    // Listen for system theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
          if (e.matches) {
            html.classList.add("dark");
          } else {
            html.classList.remove("dark");
          }
        }
      });
  },

  animateToggle(button) {
    button.style.transform = "scale(0.9) rotate(180deg)";
    setTimeout(() => {
      button.style.transform = "scale(1) rotate(0deg)";
    }, 300);
  },
};

// ============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================
const ScrollAnimations = {
  init() {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -50px 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          // Optionally unobserve after animation
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all scroll-reveal elements
    document.querySelectorAll(".scroll-reveal").forEach((el) => {
      observer.observe(el);
    });
  },
};

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const NavbarScroll = {
  init() {
    const navbar = document.getElementById("navbar");
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      // Add/remove scrolled class for styling
      if (currentScroll > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

      // Hide/show navbar on scroll direction
      if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = "translateY(-100%)";
      } else {
        navbar.style.transform = "translateY(0)";
      }

      lastScroll = currentScroll;
    });
  },
};

// ============================================
// MOBILE MENU
// ============================================
const MobileMenu = {
  init() {
    const menuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const menuLinks = mobileMenu.querySelectorAll("a");
    let isOpen = false;

    menuBtn.addEventListener("click", () => {
      isOpen = !isOpen;
      if (isOpen) {
        mobileMenu.classList.remove("hidden");
        mobileMenu.classList.add("active");
      } else {
        mobileMenu.classList.remove("active");
        setTimeout(() => {
          mobileMenu.classList.add("hidden");
        }, 300);
      }
    });

    // Close menu when clicking a link
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        isOpen = false;
        mobileMenu.classList.remove("active");
        setTimeout(() => {
          mobileMenu.classList.add("hidden");
        }, 300);
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        isOpen &&
        !mobileMenu.contains(e.target) &&
        !menuBtn.contains(e.target)
      ) {
        isOpen = false;
        mobileMenu.classList.remove("active");
        setTimeout(() => {
          mobileMenu.classList.add("hidden");
        }, 300);
      }
    });
  },
};

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
const SmoothScroll = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const navbarHeight = document.getElementById("navbar").offsetHeight;
          const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.pageYOffset -
            navbarHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  },
};

// ============================================
// ACTIVE NAV LINK HIGHLIGHTING
// ============================================
const ActiveNavLink = {
  init() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -80% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.remove("text-primary-600", "dark:text-primary-400");
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("text-primary-600", "dark:text-primary-400");
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
  },
};

// ============================================
// TYPING EFFECT FOR HERO (Optional enhancement)
// ============================================
const TypingEffect = {
  init() {
    const element = document.querySelector("#about h1 + p");
    if (!element) return;

    const text = element.textContent;
    element.textContent = "";
    element.style.minHeight = "2rem";

    let i = 0;
    const type = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, 50);
      }
    };

    // Start typing after initial animations
    setTimeout(type, 1000);
  },
};

// ============================================
// PARALLAX EFFECT FOR BACKGROUND ORBS
// ============================================
const ParallaxEffect = {
  init() {
    const orbs = document.querySelectorAll(".gradient-orb");

    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;

      orbs.forEach((orb, index) => {
        const speed = 0.1 + index * 0.05;
        const yPos = scrolled * speed;
        orb.style.transform = `translateY(${yPos}px)`;
      });
    });
  },
};

// ============================================
// SKILL TAG COUNTER ANIMATION
// ============================================
const SkillCounter = {
  init() {
    const skillCards = document.querySelectorAll(".skill-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tags = entry.target.querySelectorAll(".skill-tag");
            tags.forEach((tag, index) => {
              tag.style.opacity = "0";
              tag.style.transform = "translateY(10px)";
              setTimeout(() => {
                tag.style.transition = "all 0.3s ease";
                tag.style.opacity = "1";
                tag.style.transform = "translateY(0)";
              }, index * 50);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    skillCards.forEach((card) => observer.observe(card));
  },
};

// ============================================
// PROJECT CARD 3D TILT EFFECT
// ============================================
const TiltEffect = {
  init() {
    const cards = document.querySelectorAll(".project-card");

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform =
          "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
        card.style.transition = "transform 0.5s ease";
      });

      card.addEventListener("mouseenter", () => {
        card.style.transition = "transform 0.1s ease";
      });
    });
  },
};

// ============================================
// LOADING ANIMATION
// ============================================
const LoadingAnimation = {
  init() {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s ease";

    window.addEventListener("load", () => {
      setTimeout(() => {
        document.body.style.opacity = "1";
      }, 100);
    });
  },
};

// ============================================
// CURSOR GLOW EFFECT (Desktop only)
// ============================================
const CursorGlow = {
  init() {
    // Only on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const glow = document.createElement("div");
    glow.id = "cursor-glow";
    glow.style.cssText = `
            position: fixed;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease;
        `;
    document.body.appendChild(glow);

    let mouseX = 0,
      mouseY = 0;
    let currentX = 0,
      currentY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animate = () => {
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;
      glow.style.left = currentX + "px";
      glow.style.top = currentY + "px";
      requestAnimationFrame(animate);
    };
    animate();

    // Hide glow when mouse leaves window
    document.addEventListener("mouseleave", () => {
      glow.style.opacity = "0";
    });
    document.addEventListener("mouseenter", () => {
      glow.style.opacity = "1";
    });
  },
};

// ============================================
// INITIALIZE ALL MODULES
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  ThemeManager.init();
  ScrollAnimations.init();
  NavbarScroll.init();
  MobileMenu.init();
  SmoothScroll.init();
  ActiveNavLink.init();
  SkillCounter.init();
  TiltEffect.init();
  LoadingAnimation.init();

  // Optional: Uncomment to enable typing effect
  // TypingEffect.init();

  // Optional: Uncomment to enable cursor glow
  // CursorGlow.init();
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Export for potential module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    ThemeManager,
    ScrollAnimations,
    NavbarScroll,
    MobileMenu,
    SmoothScroll,
  };
}
