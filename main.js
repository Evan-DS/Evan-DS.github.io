// Main JavaScript for Portfolio Site

// Navigation functionality
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMobile = document.getElementById('nav-mobile');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        // Mobile menu toggle
        if (this.navToggle && this.navMobile) {
            this.navToggle.addEventListener('click', () => {
                this.navMobile.classList.toggle('show');
            });
        }
        
        // Smooth scrolling for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open
                    if (this.navMobile.classList.contains('show')) {
                        this.navMobile.classList.remove('show');
                    }
                    
                    // Smooth scroll to section
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Update active link
                this.updateActiveLink(link);
            });
        });
        
        // Update navbar on scroll
        window.addEventListener('scroll', () => {
            this.updateNavbarOnScroll();
            this.updateActiveSection();
        });
    }
    
    updateNavbarOnScroll() {
        if (window.scrollY > 100) {
            this.navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            this.navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            this.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            this.navbar.style.boxShadow = 'none';
        }
    }
    
    updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                this.updateActiveLink(activeLink);
            }
        });
    }
    
    updateActiveLink(activeLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// Project Modal functionality
class ProjectModal {
    constructor() {
        this.modal = null;
        this.createModal();
        this.bindEvents();
    }
    
    createModal() {
        // Create modal HTML structure
        const modalHTML = `
            <div id="project-modal" class="project-modal" style="display: none;">
                <div class="modal-overlay"></div>
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="modal-close" aria-label="Close modal">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- Project content will be loaded here -->
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('project-modal');
        
        // Add modal styles
        this.addModalStyles();
    }
    
    addModalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .project-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1rem;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                position: relative;
                background: white;
                border-radius: 1rem;
                max-width: 1200px;
                max-height: 90vh;
                width: 100%;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: modalSlideIn 0.3s ease-out;
            }
            
            .modal-header {
                position: sticky;
                top: 0;
                background: white;
                padding: 1rem 2rem;
                border-bottom: 1px solid #e5e7eb;
                display: flex;
                justify-content: flex-end;
                z-index: 10;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #6b7280;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .modal-close:hover {
                background: #f3f4f6;
                color: #374151;
            }
            
            .modal-body {
                padding: 2rem;
            }
            
            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: scale(0.9) translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }
            
            @media (max-width: 768px) {
                .modal-content {
                    max-height: 95vh;
                    margin: 1rem;
                }
                
                .modal-body {
                    padding: 1.5rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    bindEvents() {
        // Bind project detail buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.project-link[href$=".html"]')) {
                e.preventDefault();
                const link = e.target.closest('.project-link');
                const projectFile = link.getAttribute('href').replace('.html', '');
                this.openProject(projectFile);
            }
        });
        
        // Close modal events
        if (this.modal) {
            const closeBtn = this.modal.querySelector('.modal-close');
            const overlay = this.modal.querySelector('.modal-overlay');
            
            closeBtn?.addEventListener('click', () => this.closeModal());
            overlay?.addEventListener('click', () => this.closeModal());
            
            // Close on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.modal.style.display !== 'none') {
                    this.closeModal();
                }
            });
        }
    }
    
    async openProject(projectFile) {
        try {
            // Import the project module
            const projectModule = await import(`./${projectFile}.js`);
            const projectData = projectModule.default || projectModule;
            
            // Render project content
            const modalBody = this.modal.querySelector('.modal-body');
            modalBody.innerHTML = this.renderProjectContent(projectData);
            
            // Show modal
            this.modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
        } catch (error) {
            console.error('Error loading project:', error);
            this.showError('Failed to load project details');
        }
    }
    
    renderProjectContent(project) {
        return `
            <div class="project-detail">
                <div class="project-hero">
                    <h1 class="project-title">${project.title}</h1>
                    <p class="project-subtitle">${project.subtitle}</p>
                    <div class="project-links">
                        ${project.demoUrl ? `<a href="${project.demoUrl}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>` : ''}
                        ${project.githubUrl ? `<a href="${project.githubUrl}" class="btn btn-outline" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-github"></i> GitHub
                        </a>` : ''}
                    </div>
                </div>
                
                <div class="project-overview">
                    <img src="${project.image}" alt="${project.title}" class="project-detail-image">
                    <div class="project-description">
                        <h2>Overview</h2>
                        <p>${project.description}</p>
                    </div>
                </div>
                
                <div class="project-technologies">
                    <h2>Technologies Used</h2>
                    <div class="tech-grid">
                        ${project.technologies.map(tech => `
                            <div class="tech-item">
                                <i class="${tech.icon}"></i>
                                <span>${tech.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="project-features">
                    <h2>Key Features</h2>
                    <div class="features-grid">
                        ${project.features.map(feature => `
                            <div class="feature-item">
                                <div class="feature-icon">
                                    <i class="${feature.icon}"></i>
                                </div>
                                <div class="feature-content">
                                    <h3>${feature.title}</h3>
                                    <p>${feature.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                ${project.architecture ? `
                    <div class="project-architecture">
                        <h2>Technical Architecture</h2>
                        <div class="architecture-content">
                            ${project.architecture.map(section => `
                                <div class="architecture-section">
                                    <h3>${section.title}</h3>
                                    <p>${section.description}</p>
                                    ${section.points ? `
                                        <ul>
                                            ${section.points.map(point => `<li>${point}</li>`).join('')}
                                        </ul>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                ${project.achievements ? `
                    <div class="project-achievements">
                        <h2>Impact & Results</h2>
                        <div class="achievements-grid">
                            ${project.achievements.map(achievement => `
                                <div class="achievement-item">
                                    <div class="achievement-metric">${achievement.metric}</div>
                                    <div class="achievement-label">${achievement.label}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    showError(message) {
        const modalBody = this.modal.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-triangle"></i>
                <h2>Error</h2>
                <p>${message}</p>
            </div>
        `;
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Contact Form functionality
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            
            // Real-time validation
            const inputs = this.form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearError(input));
            });
        }
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous errors
        this.clearError(field);
        
        // Required field validation
        if (!value) {
            isValid = false;
            errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
        } else {
            // Specific validations
            switch (fieldName) {
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid email address';
                    }
                    break;
                case 'name':
                    if (value.length < 2) {
                        isValid = false;
                        errorMessage = 'Name must be at least 2 characters long';
                    }
                    break;
                case 'message':
                    if (value.length < 10) {
                        isValid = false;
                        errorMessage = 'Message must be at least 10 characters long';
                    }
                    break;
            }
        }
        
        if (!isValid) {
            this.showError(field, errorMessage);
        }
        
        return isValid;
    }
    
    showError(field, message) {
        field.classList.add('error');
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    clearError(field) {
        field.classList.remove('error');
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const inputs = this.form.querySelectorAll('input, textarea');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (isFormValid) {
            this.submitForm();
        }
    }
    
    async submitForm() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            this.showSuccessMessage();
            this.form.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showErrorMessage();
        } finally {
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }
    
    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'form-message success';
        message.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Message sent successfully! I'll get back to you soon.</span>
        `;
        
        this.form.insertBefore(message, this.form.firstChild);
        
        // Add styles for success message
        this.addMessageStyles();
        
        // Remove message after 5 seconds
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
    
    showErrorMessage() {
        const message = document.createElement('div');
        message.className = 'form-message error';
        message.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>Failed to send message. Please try again or contact me directly.</span>
        `;
        
        this.form.insertBefore(message, this.form.firstChild);
        
        // Add styles for error message
        this.addMessageStyles();
        
        // Remove message after 5 seconds
        setTimeout(() => {
            message.remove();
        }, 5000);
    }
    
    addMessageStyles() {
        if (!document.getElementById('form-message-styles')) {
            const style = document.createElement('style');
            style.id = 'form-message-styles';
            style.textContent = `
                .form-message {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-bottom: 1.5rem;
                    animation: slideIn 0.3s ease-out;
                }
                
                .form-message.success {
                    background-color: #d1fae5;
                    color: #065f46;
                    border: 1px solid #a7f3d0;
                }
                
                .form-message.error {
                    background-color: #fee2e2;
                    color: #991b1b;
                    border: 1px solid #fca5a5;
                }
                
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Utility functions
function downloadResume() {
    // Create a mock PDF download (replace with actual resume file)
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual resume URL
    link.download = 'Alex_Johnson_Resume.pdf';
    
    // Show download message since we don't have an actual file
    alert('Resume download would start here. Please add your actual resume file.');
    
    // Uncomment below line when you have an actual resume file
    // link.click();
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const elements = document.querySelectorAll('section, .project-card, .skill-category, .about-content');
    elements.forEach(el => observer.observe(el));
}

// Skills animation
function animateSkills() {
    const skillDots = document.querySelectorAll('.skill-dots .dot.active');
    
    skillDots.forEach((dot, index) => {
        setTimeout(() => {
            dot.style.transform = 'scale(1.2)';
            setTimeout(() => {
                dot.style.transform = 'scale(1)';
            }, 200);
        }, index * 100);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new Navigation();
    new ProjectModal();
    new ContactForm();
    
    // Initialize animations
    initScrollAnimations();
    
    // Animate skills when skills section comes into view
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillsObserver.observe(skillsSection);
    }
    
    // Add smooth reveal animation to hero elements
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('fade-in');
            }, index * 200);
        });
    }, 100);
});

// Export functions for global access
window.downloadResume = downloadResume;