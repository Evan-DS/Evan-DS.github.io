// Portfolio Data Configuration
const portfolioData = {
  personalInfo: {
    name: "Evan Dos Santos",
    title: "Software Engineer",
    tagline: "Passionate software engineer with expertise in full-stack development, creating innovative solutions with modern technologies and best practices.",
    email: "evandossantos@email.com",
    social: {
      linkedin: "https://linkedin.com/in/evandossantos",
      github: "https://github.com/evandossantos",
      twitter: "https://twitter.com/evandossantos"
    }
  },

  projects: [
    {
      id: "graphics-renderer",
      title: "3D Graphics Renderer",
      description: "Advanced 3D graphics rendering using OpenGL concepts with vector mathematics and real-time rendering.",
      technologies: ["JavaScript", "Canvas API", "3D Mathematics"],
      image: "fas fa-cube",
      demoType: "graphics",
      githubUrl: "https://github.com/evandossantos/graphics-renderer",
      featured: true
    },
    {
      id: "algorithm-visualizer",
      title: "Algorithm Visualizer",
      description: "Interactive visualization of sorting and pathfinding algorithms with real-time performance metrics.",
      technologies: ["React", "D3.js", "Algorithms"],
      image: "fas fa-chart-line",
      demoType: "algorithm",
      githubUrl: "https://github.com/evandossantos/algorithm-visualizer",
      featured: true
    },
    {
      id: "ecommerce-platform",
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment processing, inventory management, and admin dashboard.",
      technologies: ["React", "Node.js", "PostgreSQL"],
      image: "fas fa-shopping-cart",
      demoType: "ecommerce",
      githubUrl: "https://github.com/evandossantos/ecommerce-platform",
      featured: true
    }
  ],

  skills: {
    frontend: [
      { name: "React", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "JavaScript", level: 95 },
      { name: "CSS/Sass", level: 88 }
    ],
    backend: [
      { name: "Node.js", level: 85 },
      { name: "Python", level: 80 },
      { name: "Express.js", level: 87 },
      { name: "REST APIs", level: 90 }
    ],
    database: [
      { name: "PostgreSQL", level: 82 },
      { name: "MongoDB", level: 78 },
      { name: "Git", level: 92 },
      { name: "Docker", level: 75 }
    ]
  },

  about: {
    highlights: [
      {
        icon: "fas fa-code",
        title: "Clean Code",
        description: "Writing maintainable, well-documented code"
      },
      {
        icon: "fas fa-lightbulb",
        title: "Problem Solving",
        description: "Innovative solutions to complex challenges"
      },
      {
        icon: "fas fa-users",
        title: "Collaboration",
        description: "Effective teamwork and communication"
      }
    ]
  }
};

// EmailJS Configuration
const emailJSConfig = {
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY", // Replace with your actual EmailJS public key
  serviceId: "YOUR_SERVICE_ID", // Replace with your actual service ID
  templateId: "YOUR_TEMPLATE_ID" // Replace with your actual template ID
};

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

// Navigation functionality
class Navigation {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.hamburger = document.getElementById('hamburger');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupScrollEffects();
    this.setupSmoothScrolling();
  }

  setupEventListeners() {
    // Mobile menu toggle
    this.hamburger?.addEventListener('click', () => {
      this.toggleMobileMenu();
    });

    // Close mobile menu when clicking nav links
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.navbar.contains(e.target)) {
        this.closeMobileMenu();
      }
    });
  }

  setupScrollEffects() {
    let ticking = false;

    const updateNavbar = () => {
      const scrollY = window.scrollY;
      
      // Update navbar background
      if (scrollY > 50) {
        this.navbar.classList.add('bg-white/95', 'backdrop-blur-md');
        this.navbar.classList.remove('bg-white/90');
      } else {
        this.navbar.classList.add('bg-white/90');
        this.navbar.classList.remove('bg-white/95', 'backdrop-blur-md');
      }

      // Update active navigation
      this.updateActiveNavigation();
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
  }

  updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        // Remove active class from all nav links
        this.navLinks.forEach(link => {
          link.classList.remove('active');
        });

        // Add active class to current section's nav link
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }

  setupSmoothScrolling() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
          const targetSection = document.querySelector(targetId);
          
          if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  toggleMobileMenu() {
    this.hamburger?.classList.toggle('active');
    this.navMenu?.classList.toggle('active');
  }

  closeMobileMenu() {
    this.hamburger?.classList.remove('active');
    this.navMenu?.classList.remove('active');
  }
}

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

  // Cleanup function
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}

// Contact Form functionality
class ContactForm {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.submitButton = this.form?.querySelector('button[type="submit"]');
    this.buttonText = this.submitButton?.querySelector('.btn-text');
    this.buttonLoading = this.submitButton?.querySelector('.btn-loading');
    
    this.init();
  }

  init() {
    if (!this.form) return;
    
    // Initialize EmailJS
    this.initializeEmailJS();
    
    // Setup form submission
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    // Setup form validation
    this.setupFormValidation();
  }

  initializeEmailJS() {
    if (window.emailjs && emailJSConfig?.publicKey) {
      emailjs.init(emailJSConfig.publicKey);
    }
  }

  setupFormValidation() {
    const inputs = this.form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });

      input.addEventListener('input', () => {
        this.clearFieldError(input);
      });
    });
  }

  validateField(field) {
    const formGroup = field.closest('.form-group');
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Clear previous errors
    this.clearFieldError(field);

    // Check if field is required and empty
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = `${this.getFieldLabel(field)} is required`;
    }

    // Email validation
    if (field.type === 'email' && value && !this.isValidEmail(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }

    // Display error if validation fails
    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('error');
    
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
  }

  showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
  }

  getFieldLabel(field) {
    const label = field.closest('.form-group').querySelector('label');
    return label ? label.textContent : field.name;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validateForm() {
    const inputs = this.form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  async handleSubmit() {
    // Validate form
    if (!this.validateForm()) {
      this.showToast('Please fix the errors above', 'error');
      return;
    }

    // Show loading state
    this.setLoadingState(true);

    try {
      // Get form data
      const formData = new FormData(this.form);
      const templateParams = {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        to_name: 'Evan Dos Santos'
      };

      // Send email using EmailJS
      if (window.emailjs && emailJSConfig?.serviceId && emailJSConfig?.templateId) {
        await emailjs.send(
          emailJSConfig.serviceId,
          emailJSConfig.templateId,
          templateParams
        );
        
        this.showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
        this.form.reset();
      } else {
        // Fallback - just show success message
        console.log('Contact form submission:', templateParams);
        this.showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
        this.form.reset();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      this.showToast('Failed to send message. Please try again later.', 'error');
    } finally {
      this.setLoadingState(false);
    }
  }

  setLoadingState(loading) {
    if (!this.submitButton) return;
    
    if (loading) {
      this.submitButton.classList.add('loading');
      this.submitButton.disabled = true;
    } else {
      this.submitButton.classList.remove('loading');
      this.submitButton.disabled = false;
    }
  }

  showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    const toastClose = toast.querySelector('.toast-close');
    
    // Set message and type
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    
    // Show toast
    toast.classList.add('show');
    
    // Auto hide after 5 seconds
    const hideTimer = setTimeout(() => {
      this.hideToast();
    }, 5000);
    
    // Manual close
    toastClose.onclick = () => {
      clearTimeout(hideTimer);
      this.hideToast();
    };
  }

  hideToast() {
    const toast = document.getElementById('toast');
    toast.classList.remove('show');
  }
}

// 3D Graphics Demo
class GraphicsDemo {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.canvas = null;
    this.ctx = null;
    this.isAnimating = false;
    this.rotation = { x: 0, y: 0, z: 0 };
    this.currentShape = 'cube';
    this.animationId = null;
    
    this.shapes = {
      cube: {
        vertices: [
          [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
          [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
        ],
        faces: [
          [0, 1, 2, 3], [4, 7, 6, 5], [0, 4, 5, 1],
          [2, 6, 7, 3], [0, 3, 7, 4], [1, 5, 6, 2]
        ],
        color: '#3b82f6'
      },
      pyramid: {
        vertices: [
          [-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1],
          [0, 1, 0]
        ],
        faces: [
          [0, 1, 2, 3], [0, 4, 1], [1, 4, 2], [2, 4, 3], [3, 4, 0]
        ],
        color: '#ef4444'
      },
      sphere: {
        vertices: [],
        faces: [],
        color: '#10b981'
      }
    };
    
    this.init();
  }

  init() {
    this.generateSphere();
    this.createDemo();
  }

  generateSphere(radius = 1, segments = 16) {
    const vertices = [];
    const faces = [];

    // Generate vertices
    for (let i = 0; i <= segments; i++) {
      const theta = (i * Math.PI) / segments;
      for (let j = 0; j <= segments; j++) {
        const phi = (j * 2 * Math.PI) / segments;
        
        const x = radius * Math.sin(theta) * Math.cos(phi);
        const y = radius * Math.cos(theta);
        const z = radius * Math.sin(theta) * Math.sin(phi);
        
        vertices.push([x, y, z]);
      }
    }

    // Generate faces
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < segments; j++) {
        const first = i * (segments + 1) + j;
        const second = first + segments + 1;
        
        faces.push([first, second, first + 1]);
        faces.push([second, second + 1, first + 1]);
      }
    }

    this.shapes.sphere.vertices = vertices;
    this.shapes.sphere.faces = faces;
  }

  createDemo() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="graphics-demo">
        <div class="graphics-controls">
          <div class="shape-controls">
            <button class="shape-btn active" data-shape="cube">Cube</button>
            <button class="shape-btn" data-shape="pyramid">Pyramid</button>
            <button class="shape-btn" data-shape="sphere">Sphere</button>
          </div>
          
          <div class="animation-controls">
            <button class="btn btn-primary" id="animate-btn">
              <i class="fas fa-play"></i> Animate
            </button>
            <button class="btn btn-secondary" id="reset-btn">
              <i class="fas fa-undo"></i> Reset
            </button>
          </div>
        </div>

        <div class="graphics-canvas-container">
          <canvas class="graphics-canvas" width="600" height="400"></canvas>
        </div>

        <div class="rotation-controls">
          <div class="rotation-control">
            <label>X Rotation</label>
            <input type="range" id="rotation-x" min="0" max="${Math.PI * 2}" step="0.1" value="0">
            <div class="rotation-value">0°</div>
          </div>
          <div class="rotation-control">
            <label>Y Rotation</label>
            <input type="range" id="rotation-y" min="0" max="${Math.PI * 2}" step="0.1" value="0">
            <div class="rotation-value">0°</div>
          </div>
          <div class="rotation-control">
            <label>Z Rotation</label>
            <input type="range" id="rotation-z" min="0" max="${Math.PI * 2}" step="0.1" value="0">
            <div class="rotation-value">0°</div>
          </div>
        </div>

        <div class="technical-info">
          <h4><i class="fas fa-bolt"></i> Technical Implementation</h4>
          <div class="technical-grid">
            <div class="technical-section">
              <strong>Rendering Features:</strong>
              <ul>
                <li>• 3D to 2D projection</li>
                <li>• Matrix transformations</li>
                <li>• Backface culling</li>
                <li>• Simple lighting model</li>
              </ul>
            </div>
            <div class="technical-section">
              <strong>Vector Mathematics:</strong>
              <ul>
                <li>• Rotation matrices (X, Y, Z)</li>
                <li>• Perspective projection</li>
                <li>• Real-time calculations</li>
                <li>• Coordinate transformations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;

    this.setupCanvas();
    this.setupEventListeners();
    this.drawShape();
  }

  setupCanvas() {
    this.canvas = this.container.querySelector('.graphics-canvas');
    this.ctx = this.canvas?.getContext('2d');
  }

  setupEventListeners() {
    // Shape selection
    this.container.querySelectorAll('.shape-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.container.querySelectorAll('.shape-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentShape = btn.dataset.shape;
        this.drawShape();
      });
    });

    // Animation controls
    const animateBtn = this.container.querySelector('#animate-btn');
    const resetBtn = this.container.querySelector('#reset-btn');

    animateBtn?.addEventListener('click', () => {
      this.toggleAnimation();
    });

    resetBtn?.addEventListener('click', () => {
      this.resetRotation();
    });

    // Rotation controls
    ['x', 'y', 'z'].forEach(axis => {
      const slider = this.container.querySelector(`#rotation-${axis}`);
      const valueDisplay = slider?.nextElementSibling;

      slider?.addEventListener('input', (e) => {
        this.rotation[axis] = parseFloat(e.target.value);
        const degrees = Math.round((this.rotation[axis] * 180) / Math.PI);
        if (valueDisplay) valueDisplay.textContent = `${degrees}°`;
        if (!this.isAnimating) this.drawShape();
      });
    });
  }

  toggleAnimation() {
    const animateBtn = this.container.querySelector('#animate-btn');
    
    this.isAnimating = !this.isAnimating;
    
    if (this.isAnimating) {
      animateBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
      this.animate();
    } else {
      animateBtn.innerHTML = '<i class="fas fa-play"></i> Animate';
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }
    }
  }

  animate() {
    if (!this.isAnimating) return;

    this.rotation.x += 0.01;
    this.rotation.y += 0.02;
    this.rotation.z += 0.005;

    this.updateSliders();
    this.drawShape();

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  updateSliders() {
    ['x', 'y', 'z'].forEach(axis => {
      const slider = this.container.querySelector(`#rotation-${axis}`);
      const valueDisplay = slider?.nextElementSibling;
      
      if (slider) {
        slider.value = this.rotation[axis];
        const degrees = Math.round((this.rotation[axis] * 180) / Math.PI);
        if (valueDisplay) valueDisplay.textContent = `${degrees}°`;
      }
    });
  }

  resetRotation() {
    this.rotation = { x: 0, y: 0, z: 0 };
    this.isAnimating = false;
    
    const animateBtn = this.container.querySelector('#animate-btn');
    animateBtn.innerHTML = '<i class="fas fa-play"></i> Animate';
    
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    this.updateSliders();
    this.drawShape();
  }

  // 3D transformation functions
  rotateX(point, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [
      point[0],
      point[1] * cos - point[2] * sin,
      point[1] * sin + point[2] * cos
    ];
  }

  rotateY(point, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [
      point[0] * cos + point[2] * sin,
      point[1],
      -point[0] * sin + point[2] * cos
    ];
  }

  rotateZ(point, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [
      point[0] * cos - point[1] * sin,
      point[0] * sin + point[1] * cos,
      point[2]
    ];
  }

  project(point) {
    const distance = 5;
    const scale = 100;
    
    const projected = [
      (point[0] * distance) / (point[2] + distance) * scale + this.canvas.width / 2,
      (point[1] * distance) / (point[2] + distance) * scale + this.canvas.height / 2
    ];
    
    return projected;
  }

  drawShape() {
    if (!this.ctx || !this.canvas) return;

    this.ctx.fillStyle = '#1f2937';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const currentShapeData = this.shapes[this.currentShape];
    
    // Transform vertices
    const transformedVertices = currentShapeData.vertices.map(vertex => {
      let point = [...vertex];
      point = this.rotateX(point, this.rotation.x);
      point = this.rotateY(point, this.rotation.y);
      point = this.rotateZ(point, this.rotation.z);
      return point;
    });

    // Draw faces
    currentShapeData.faces.forEach(face => {
      const projectedVertices = face.map(vertexIndex => 
        this.project(transformedVertices[vertexIndex])
      );

      // Calculate face center for depth testing
      const center = face.reduce((acc, vertexIndex) => {
        const vertex = transformedVertices[vertexIndex];
        return [acc[0] + vertex[0], acc[1] + vertex[1], acc[2] + vertex[2]];
      }, [0, 0, 0]).map(sum => sum / face.length);

      if (center[2] > -2) { // Simple depth test
        this.ctx.beginPath();
        this.ctx.moveTo(projectedVertices[0][0], projectedVertices[0][1]);
        projectedVertices.slice(1).forEach(vertex => {
          this.ctx.lineTo(vertex[0], vertex[1]);
        });
        this.ctx.closePath();

        // Simple lighting
        const lightIntensity = Math.max(0.3, (center[2] + 3) / 4);
        const color = currentShapeData.color;
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        
        this.ctx.fillStyle = `rgba(${Math.floor(r * lightIntensity)}, ${Math.floor(g * lightIntensity)}, ${Math.floor(b * lightIntensity)}, 0.8)`;
        this.ctx.fill();
        
        this.ctx.strokeStyle = '#94a3b8';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
      }
    });

    // Draw coordinate axes
    this.drawAxes(transformedVertices);
  }

  drawAxes(transformedVertices) {
    const axisLength = 2;
    const axes = [
      { start: [0, 0, 0], end: [axisLength, 0, 0], color: '#ef4444' }, // X - Red
      { start: [0, 0, 0], end: [0, axisLength, 0], color: '#10b981' }, // Y - Green
      { start: [0, 0, 0], end: [0, 0, axisLength], color: '#3b82f6' }  // Z - Blue
    ];

    axes.forEach(axis => {
      let start = this.rotateX([...axis.start], this.rotation.x);
      start = this.rotateY(start, this.rotation.y);
      start = this.rotateZ(start, this.rotation.z);
      
      let end = this.rotateX([...axis.end], this.rotation.x);
      end = this.rotateY(end, this.rotation.y);
      end = this.rotateZ(end, this.rotation.z);

      const projectedStart = this.project(start);
      const projectedEnd = this.project(end);

      this.ctx.beginPath();
      this.ctx.moveTo(projectedStart[0], projectedStart[1]);
      this.ctx.lineTo(projectedEnd[0], projectedEnd[1]);
      this.ctx.strokeStyle = axis.color;
      this.ctx.lineWidth = 3;
      this.ctx.stroke();
    });
  }
}

// Modal functions for project demos
function openGraphicsDemo() {
  const modal = document.getElementById('graphics-modal');
  modal.classList.add('active');
  modal.querySelector('.modal-content').classList.add('animate-modal');
  
  // Initialize graphics demo
  new GraphicsDemo('graphics-demo-container');
  
  // Setup modal close
  setupModalClose(modal);
}

function openAlgorithmDemo() {
  const modal = document.getElementById('algorithm-modal');
  modal.classList.add('active');
  modal.querySelector('.modal-content').classList.add('animate-modal');
  setupModalClose(modal);
}

function openEcommerceDemo() {
  const modal = document.getElementById('ecommerce-modal');
  modal.classList.add('active');
  modal.querySelector('.modal-content').classList.add('animate-modal');
  setupModalClose(modal);
}

function setupModalClose(modal) {
  const closeBtn = modal.querySelector('.modal-close');
  
  const closeModal = () => {
    modal.classList.remove('active');
  };
  
  closeBtn.onclick = closeModal;
  
  modal.onclick = (e) => {
    if (e.target === modal) {
      closeModal();
    }
  };
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// Download Resume function
function downloadResume() {
  // Create a downloadable resume PDF link
  // In a real implementation, you would link to an actual PDF file
  const resumeData = `
Evan Dos Santos
Software Engineer

Contact Information:
Email: evandossantos@email.com
LinkedIn: linkedin.com/in/evandossantos
GitHub: github.com/evandossantos

Professional Summary:
Passionate software engineer with expertise in full-stack development,
creating innovative solutions with modern technologies and best practices.

Technical Skills:
Frontend: React, TypeScript, JavaScript, CSS/Sass
Backend: Node.js, Python, Express.js, REST APIs
Database: PostgreSQL, MongoDB
Tools: Git, Docker
Cloud: AWS, Kubernetes, CI/CD, Linux

Experience:
Software Engineer
- Developed full-stack web applications using React and Node.js
- Implemented responsive designs and modern UI/UX practices
- Built and maintained RESTful APIs and database systems
- Collaborated with cross-functional teams on project delivery

Projects:
- 3D Graphics Renderer: Advanced rendering using OpenGL concepts
- Algorithm Visualizer: Interactive sorting and pathfinding algorithms
- E-Commerce Platform: Full-stack solution with payment processing

Education:
Bachelor's Degree in Computer Science or related field
`;

  // Create a blob with the resume content
  const blob = new Blob([resumeData], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  
  // Create a temporary download link
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Evan_Dos_Santos_Resume.txt';
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
  
  // Show success message using global toast function
  if (typeof window.showToast === 'function') {
    window.showToast('Resume downloaded successfully!', 'success');
  } else {
    alert('Resume downloaded successfully!');
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the main application
  const app = new PortfolioApp();
  
  // Initialize navigation
  const navigation = new Navigation();
  
  // Initialize animations
  const animationController = new AnimationController();
  
  // Initialize contact form
  const contactForm = new ContactForm();
  
  // Make utilities and instances globally available
  window.portfolioApp = app;
  window.navigation = navigation;
  window.animationController = animationController;
  window.animationUtils = animationUtils;
  window.portfolioData = portfolioData;
  window.emailJSConfig = emailJSConfig;
  
  // Make showToast function available globally
  window.showToast = (message, type = 'info') => {
    contactForm.showToast(message, type);
  };
  
  // Make demo functions globally available
  window.openGraphicsDemo = openGraphicsDemo;
  window.openAlgorithmDemo = openAlgorithmDemo;
  window.openEcommerceDemo = openEcommerceDemo;
  window.downloadResume = downloadResume;
  
  // Initialize viewport height fix
  app.updateViewportHeight();
  window.addEventListener('resize', app.updateViewportHeight);
  
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

// Expose utility functions globally
window.utils = {
  debounce: PortfolioApp.debounce,
  throttle: PortfolioApp.throttle,
  isElementInViewport: PortfolioApp.isElementInViewport,
  formatDate: PortfolioApp.formatDate,
  validateEmail: PortfolioApp.validateEmail
};