// Main application initialization and utilities
class PortfolioApp {
  constructor() {
    this.isLoaded = false;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupTheme();
    this.setupLazyLoading();
    this.setupPerformanceOptimizations();
    this.markAsLoaded();
  }

  setupEventListeners() {
    // Global click handlers
    document.addEventListener('click', this.handleGlobalClick.bind(this));
    
    // Global keyboard handlers
    document.addEventListener('keydown', this.handleGlobalKeydown.bind(this));
    
    // Window resize handlers
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 150);
    });

    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAnimations();
      } else {
        this.resumeAnimations();
      }
    });
  }

  handleGlobalClick(e) {
    // Handle external links
    if (e.target.tagName === 'A' && e.target.target === '_blank') {
      // Add tracking or analytics here if needed
      console.log('External link clicked:', e.target.href);
    }

    // Handle smooth scroll for anchor links
    if (e.target.classList.contains('nav-link') && e.target.getAttribute('href')?.startsWith('#')) {
      e.preventDefault();
      this.smoothScrollTo(e.target.getAttribute('href'));
    }
  }

  handleGlobalKeydown(e) {
    // Accessibility: Allow Enter key to activate buttons
    if (e.key === 'Enter' && e.target.tagName === 'BUTTON') {
      e.target.click();
    }

    // Handle escape key for modals
    if (e.key === 'Escape') {
      this.closeModals();
    }
  }

  handleResize() {
    // Update any responsive calculations
    this.updateViewportHeight();
    
    // Redraw canvas elements if needed
    const canvases = document.querySelectorAll('canvas');
    canvases.forEach(canvas => {
      // Trigger redraw event
      const redrawEvent = new CustomEvent('redraw');
      canvas.dispatchEvent(redrawEvent);
    });
  }

  setupTheme() {
    // Set up theme switching if needed
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply theme based on user preference or system setting
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }

    // Listen for theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });
  }

  setupLazyLoading() {
    // Lazy load images and heavy content
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '50px'
      });

      lazyElements.forEach(element => observer.observe(element));
    } else {
      // Fallback for older browsers
      lazyElements.forEach(element => this.loadElement(element));
    }
  }

  loadElement(element) {
    if (element.dataset.src) {
      element.src = element.dataset.src;
      element.removeAttribute('data-src');
    }
    
    if (element.dataset.lazy) {
      element.removeAttribute('data-lazy');
      element.classList.add('loaded');
    }
  }

  setupPerformanceOptimizations() {
    // Debounce scroll events
    let scrollTimeout;
    let isScrolling = false;

    const handleScroll = () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          // Scroll-dependent calculations here
          isScrolling = false;
        });
        isScrolling = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Preload critical resources
    this.preloadCriticalResources();
  }

  preloadCriticalResources() {
    // Preload important fonts
    const fontLinks = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    ];

    fontLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
    });
  }

  smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }

  updateViewportHeight() {
    // Fix for mobile viewport height issues
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  pauseAnimations() {
    document.body.classList.add('animations-paused');
  }

  resumeAnimations() {
    document.body.classList.remove('animations-paused');
  }

  closeModals() {
    const activeModals = document.querySelectorAll('.modal.active');
    activeModals.forEach(modal => {
      modal.classList.remove('active');
    });
  }

  markAsLoaded() {
    this.isLoaded = true;
    document.body.classList.add('loaded');
    
    // Dispatch custom event for other scripts
    document.dispatchEvent(new CustomEvent('portfolioLoaded'));
  }

  // Utility methods
  static debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  }

  static throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  static isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  static formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }

  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Analytics tracking (placeholder)
  trackEvent(category, action, label) {
    // Implement your analytics tracking here
    console.log('Analytics Event:', { category, action, label });
    
    // Example Google Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: category,
        event_label: label
      });
    }
  }
}

// Service Worker registration (optional)
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the main application
  const app = new PortfolioApp();
  
  // Make app instance globally available
  window.portfolioApp = app;
  
  // Initialize viewport height fix
  app.updateViewportHeight();
  window.addEventListener('resize', app.updateViewportHeight);
  
  // Optional: Register service worker for PWA functionality
  // registerServiceWorker();
  
  // Log that the portfolio is ready
  console.log('🚀 Portfolio loaded successfully!');
});

// Handle loading states
window.addEventListener('load', () => {
  // Hide any loading indicators
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 300);
  }
  
  // Start any animations that depend on full page load
  document.body.classList.add('page-loaded');
});

// Error handling
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
  // Optionally send error to analytics or error reporting service
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  // Optionally send error to analytics or error reporting service
});

// Expose utility functions globally
window.utils = {
  debounce: PortfolioApp.debounce,
  throttle: PortfolioApp.throttle,
  isElementInViewport: PortfolioApp.isElementInViewport,
  formatDate: PortfolioApp.formatDate,
  validateEmail: PortfolioApp.validateEmail
};
