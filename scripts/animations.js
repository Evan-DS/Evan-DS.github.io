// Animation utilities and effects
class AnimationController {
  constructor() {
    this.observers = new Map();
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupSkillBarAnimations();
    this.initializeHeroAnimations();
  }

  setupScrollAnimations() {
    // Create intersection observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          
          // Trigger skill bar animations when skills section is visible
          if (entry.target.id === 'skills') {
            this.animateSkillBars();
          }
        }
      });
    }, observerOptions);

    // Observe sections for scroll animations
    const animatedSections = document.querySelectorAll('section');
    animatedSections.forEach(section => {
      section.classList.add('scroll-animate');
      observer.observe(section);
    });

    this.observers.set('scroll', observer);
  }

  setupSkillBarAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      if (width) {
        bar.style.setProperty('--target-width', `${width}%`);
      }
    });
  }

  animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
      const width = bar.getAttribute('data-width');
      if (width) {
        setTimeout(() => {
          bar.style.width = `${width}%`;
          bar.classList.add('animate');
        }, index * 100); // Stagger the animations
      }
    });
  }

  initializeHeroAnimations() {
    // Add stagger animation to hero elements
    const heroElements = document.querySelectorAll('.hero-text > *');
    
    heroElements.forEach((element, index) => {
      element.style.setProperty('--stagger-index', index);
      element.classList.add('animate-fade-in');
      element.style.animationDelay = `${index * 0.1}s`;
    });

    // Animate hero shapes
    const heroShapes = document.querySelectorAll('.hero-shape');
    heroShapes.forEach((shape, index) => {
      shape.classList.add('animate-float');
      shape.style.animationDelay = `${index * 0.5}s`;
    });
  }

  // Utility function to animate elements on scroll
  animateOnScroll(elements, animationClass = 'animate-fade-in') {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(element => observer.observe(element));
  }

  // Stagger animation for multiple elements
  staggerAnimation(elements, animationClass = 'animate-slide-up', delay = 100) {
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add(animationClass);
      }, index * delay);
    });
  }

  // Parallax effect for background elements
  setupParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;

    let ticking = false;

    const updateParallax = () => {
      const scrollY = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        const yPos = -(scrollY * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
  }

  // Typewriter effect
  typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  }

  // Counter animation
  animateCounter(element, start = 0, end, duration = 2000) {
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * easeOutCubic);
      
      element.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };
    
    requestAnimationFrame(updateCounter);
  }

  // Cleanup function
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

// Utility functions for common animations
const animationUtils = {
  // Fade in animation
  fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
    });
  },

  // Slide up animation
  slideUp(element, duration = 300) {
    element.style.transform = 'translateY(20px)';
    element.style.opacity = '0';
    element.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
    
    requestAnimationFrame(() => {
      element.style.transform = 'translateY(0)';
      element.style.opacity = '1';
    });
  },

  // Scale in animation
  scaleIn(element, duration = 300) {
    element.style.transform = 'scale(0.8)';
    element.style.opacity = '0';
    element.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
    
    requestAnimationFrame(() => {
      element.style.transform = 'scale(1)';
      element.style.opacity = '1';
    });
  },

  // Pulse animation
  pulse(element, duration = 1000) {
    element.style.animation = `pulse ${duration}ms ease-in-out infinite`;
  },

  // Remove all animations
  removeAnimations(element) {
    element.style.animation = '';
    element.style.transition = '';
    element.style.transform = '';
    element.style.opacity = '';
  }
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const animationController = new AnimationController();
  
  // Make animation utilities globally available
  window.animationUtils = animationUtils;
  window.animationController = animationController;
  
  // Setup project card hover animations
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.classList.add('hover-lift');
  });

  // Setup button hover effects
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.classList.add('hover-scale');
  });

  // Animate about highlights when section comes into view
  const aboutHighlights = document.querySelectorAll('.highlight-item');
  if (aboutHighlights.length > 0) {
    const aboutSection = document.getElementById('about');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animationController.staggerAnimation(aboutHighlights, 'animate-slide-in-left', 150);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    if (aboutSection) observer.observe(aboutSection);
  }

  // Animate project cards
  const projectGrid = document.querySelector('.projects-grid');
  if (projectGrid) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const projectCards = entry.target.querySelectorAll('.project-card');
          animationController.staggerAnimation(projectCards, 'animate-scale-in', 200);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(projectGrid);
  }
});

// Handle reduced motion preferences
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Disable animations for users who prefer reduced motion
  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  `;
  document.head.appendChild(style);
}
