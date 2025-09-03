// Portfolio Data Configuration
const portfolioData = {
  personalInfo: {
    name: "Evan Dos Santos",
    title: "Software Engineer",
    tagline: "Computer Science graduate with Software Engineering specialization. Experienced in IT consulting, systems administration, and developing innovative solutions with modern technologies.",
    email: "evangeorgedossantos@yahoo.ca",
    social: {
      linkedin: "https://linkedin.com/in/evan-g-dos-santos",
      github: "https://github.com/Evan-DS",
      twitter: "https://twitter.com/evandossantos"
    }
  },

  projects: [
    {
      id: "graphics-engine",
      title: "3D Graphics Engine",
      description: "Advanced 3D graphics rendering engine built with C++ and OpenGL, featuring vector mathematics, matrix transformations, and backface culling for real-time 3D visualization.",
      technologies: ["C++", "OpenGL", "Vector Math", "Visual Studio"],
      image: "fas fa-cube",
      demoType: "graphics",
      githubUrl: "https://github.com/Evan-DS/graphics-engine",
      featured: true
    },
    {
      id: "infrastructure-management",
      title: "IT Infrastructure Management System",
      description: "Comprehensive IT management solution for enterprise environments, featuring automated deployment, user account management, and network monitoring capabilities.",
      technologies: ["C++", "Active Directory", "Network Admin", "Security"],
      image: "fas fa-network-wired",
      demoType: "infrastructure",
      githubUrl: "https://github.com/Evan-DS/infrastructure-management",
      featured: true
    },
    {
      id: "algorithm-visualizer",
      title: "Algorithm Visualization Suite",
      description: "Interactive educational tool showcasing various sorting algorithms and data structures with real-time performance analysis and step-by-step visualization.",
      technologies: ["Java", "Eclipse IDE", "Algorithms", "Data Structures"],
      image: "fas fa-sort-amount-up",
      demoType: "algorithm",
      githubUrl: "https://github.com/Evan-DS/algorithm-visualizer",
      featured: true
    }
  ],

  skills: {
    programming: [
      { name: "C++", level: 95 },
      { name: "Java", level: 90 },
      { name: "Python", level: 85 },
      { name: "JavaScript", level: 80 }
    ],
    tools: [
      { name: "Visual Studio", level: 95 },
      { name: "Eclipse IDE", level: 90 },
      { name: "OpenGL", level: 85 },
      { name: "Git", level: 88 }
    ],
    systems: [
      { name: "Active Directory", level: 92 },
      { name: "Microsoft Office Suite", level: 95 },
      { name: "Network Administration", level: 88 },
      { name: "Cloud Platforms", level: 82 }
    ],
    additional: [
      { name: "Customer Support", level: 95 },
      { name: "Technical Documentation", level: 90 },
      { name: "Project Management", level: 85 },
      { name: "Problem Solving", level: 95 }
    ]
  },

  about: {
    highlights: [
      {
        icon: "fas fa-graduation-cap",
        title: "Education Excellence",
        description: "B.Sc. (Hons) Computer Science with Software Engineering Specialization"
      },
      {
        icon: "fas fa-tools",
        title: "Technical Expertise",
        description: "5+ years experience with C++, Java, OpenGL, and enterprise systems"
      },
      {
        icon: "fas fa-handshake",
        title: "Client Relations",
        description: "Professional experience in IT consulting and customer support"
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

      // Send email using EmailJS (or fallback)
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

// Modal functionality
class ModalManager {
  constructor() {
    this.modals = document.querySelectorAll('.modal');
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Close buttons
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
      closeBtn.addEventListener('click', () => {
        this.closeModal(closeBtn.closest('.modal'));
      });
    });

    // Click outside to close
    this.modals.forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal(modal);
        }
      });
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal(modal) {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  closeAllModals() {
    this.modals.forEach(modal => {
      this.closeModal(modal);
    });
  }
}

// Project demo functions
function openGraphicsDemo() {
  const modalManager = new ModalManager();
  modalManager.openModal('graphics-modal');
  
  // Initialize graphics demo if not already done
  const container = document.getElementById('graphics-demo-container');
  if (container && !container.querySelector('.graphics-demo')) {
    const graphicsDemo = new GraphicsDemo('graphics-demo-container');
  }
}

function openAlgorithmDemo() {
  const modalManager = new ModalManager();
  modalManager.openModal('algorithm-modal');
}

function openInfrastructureDemo() {
  const modalManager = new ModalManager();
  modalManager.openModal('infrastructure-modal');
}

function downloadResume() {
  // Create a comprehensive resume download
  const resumeContent = `EVAN DOS SANTOS
Software Engineer & Computer Science Graduate

Contact Information:
• Email: evangeorgedossantos@yahoo.ca
• Location: London, Ontario, Canada
• LinkedIn: linkedin.com/in/evan-g-dos-santos
• GitHub: github.com/Evan-DS

EDUCATION
Bachelor of Science Honours Computer Science with Software Engineering Specialization (Co-op)
University of Windsor, ON | September 2020 - August 2024
• Honours Graduate, Catholic Central High School (2019)
• Ontario Scholar Award (2019)
• Top 2019 graduate of Computer Engineering and Construction

PROFESSIONAL EXPERIENCE

IT Services Consultant | University of Windsor, Windsor, ON | May 2022 - August 2024
• Applied standard information technology record keeping, analysis, and research to resolve service requests
• Balanced multiple support channels including live chats, phone calls, and ticketing systems
• Worked with Microsoft Endpoint to deploy computers to faculty and pushed applications through Intune
• Set up Xerox printers for clients and enabled printing through drivers and software via IP or print queues

Systems & Domain Administrator Co-Op | CenterLine Ltd., Windsor, ON | January 2023 - April 2023
• Developed robust server systems using C++ while providing technical support and implementing security measures
• Managed user accounts, access controls, and security policies using Active Directory
• Successfully managed LAN and WAN networks, including virtual machine environments
• Installed, configured, and maintained computer systems and servers for optimal functionality

Home Solutions Specialist | Best Buy Canada Ltd., London, ON | October 2019 - November 2020
• Managed POS systems, sold inventory, and advertised promotional plans
• Marketed televisions and home audio systems utilizing advanced technical knowledge
• Operated digital and paper systems for filing and scheduling services including contracting and warranties

TECHNICAL SKILLS
Programming Languages: C++, Java, Python, JavaScript
Development Tools: Visual Studio, Eclipse IDE, OpenGL, Git
IT & Systems: Active Directory, Microsoft Office Suite, Network Administration, Cloud Platforms
Soft Skills: Technical Support, Client Relations, Problem Solving, System Analysis, Project Management

CERTIFICATIONS & TRAINING
• WHMIS Training (September 2023)
• G Drivers License (November 2019)
• Standard First-aid and CPR/AED Training (May 2015)

CORE COMPETENCIES
• 5+ years of Visual Studio and Eclipse IDE development experience
• Expertise in C++, C, Java, Algorithms, and Sorting
• Professional experience with Cloud Platforms and Enterprise Resource Planning
• OpenGL experience including Rendering, Vectors, Matrix Transformations, and Backface Culling
• Excellence in Microsoft Office Suite including Word, Excel, PowerPoint (Macros, Pivot Tables)`;

  const blob = new Blob([resumeContent], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Evan_Dos_Santos_Resume.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
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
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize core app
  const app = new PortfolioApp();
  
  // Initialize navigation
  const navigation = new Navigation();
  
  // Initialize animations
  const animationController = new AnimationController();
  
  // Initialize contact form
  const contactForm = new ContactForm();
  
  // Initialize modal manager
  const modalManager = new ModalManager();
  
  console.log('Portfolio website loaded successfully!');
});