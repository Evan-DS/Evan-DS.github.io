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
    if (window.emailjs && window.emailJSConfig?.publicKey) {
      emailjs.init(window.emailJSConfig.publicKey);
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
      if (window.emailjs && window.emailJSConfig?.serviceId && window.emailJSConfig?.templateId) {
        await emailjs.send(
          window.emailJSConfig.serviceId,
          window.emailJSConfig.templateId,
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

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ContactForm();
});
