/**
 * Contact Section and Footer JavaScript functionality
 * Handles GSAP animations, EmailJS form submission, and scroll-to-top button
 */

class ContactManager {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = this.form ? this.form.querySelector('.submit-btn') : null;
        this.btnText = this.form ? this.form.querySelector('.btn-text') : null;
        this.successMsg = document.querySelector('.success-message');
        this.emailInput = document.getElementById('email');
        this.scrollToTopBtn = document.querySelector('.scroll-to-top');

        this.init();
    }

    init() {
        this.initAnimations();
        this.initForm();
        this.initScrollToTop();
    }

    initAnimations() {
        // Ensure GSAP and ScrollTrigger are available
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            const revealElements = document.querySelectorAll('.contact-section .js-reveal');
            
            revealElements.forEach((el) => {
                const isDelayed = el.classList.contains('js-reveal-delay');
                
                gsap.fromTo(el, 
                    { 
                        y: 40, 
                        opacity: 0 
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: isDelayed ? 0.2 : 0,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
        } else {
            console.warn('GSAP or ScrollTrigger not found. Animations disabled.');
        }
    }

    initForm() {
        if (!this.form) return;

        // Initialize EmailJS with your Public Key
        // typeof emailjs !== 'undefined' && emailjs.init("YOUR_PUBLIC_KEY"); 

        this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
        
        if (this.emailInput) {
            this.emailInput.addEventListener('input', () => this.validateEmail(this.emailInput));
            this.emailInput.addEventListener('blur', () => this.validateEmail(this.emailInput));
        }

        // Live validation for required fields
        const requiredInputs = this.form.querySelectorAll('[required]');
        requiredInputs.forEach(input => {
            if (input.type !== 'email') {
                input.addEventListener('input', () => this.validateField(input));
                input.addEventListener('blur', () => this.validateField(input));
            }
        });
    }

    validateField(input) {
        if (input.value.trim() === '') {
            input.classList.add('invalid');
            return false;
        } else {
            input.classList.remove('invalid');
            return true;
        }
    }

    validateEmail(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(input.value.trim());
        const errorMsg = input.nextElementSibling;
        
        if (input.value.trim() === '') {
            input.classList.add('invalid');
            if (errorMsg && errorMsg.classList.contains('error-msg')) {
                errorMsg.style.display = 'block';
            }
            return false;
        }

        if (!isValid) {
            input.classList.add('invalid');
            if (errorMsg && errorMsg.classList.contains('error-msg')) {
                errorMsg.style.display = 'block';
            }
        } else {
            input.classList.remove('invalid');
            if (errorMsg && errorMsg.classList.contains('error-msg')) {
                errorMsg.style.display = 'none';
            }
        }
        return isValid;
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        let isFormValid = true;
        
        // Validate all required fields
        const requiredInputs = this.form.querySelectorAll('[required]');
        requiredInputs.forEach(input => {
            if (input.type === 'email') {
                if (!this.validateEmail(input)) isFormValid = false;
            } else {
                if (!this.validateField(input)) isFormValid = false;
            }
        });

        if (!isFormValid) return;

        // Set Loading State
        this.setLoadingState(true);

        try {
            if (typeof emailjs !== 'undefined') {
                // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with actual EmailJS IDs
                // await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this.form);
                
                // Simulating API call for demonstration (remove if using real EmailJS)
                await new Promise(resolve => setTimeout(resolve, 1500));
            } else {
                // Simulating API call for demonstration
                await new Promise(resolve => setTimeout(resolve, 1500));
            }
            
            this.handleSuccess();
        } catch (error) {
            this.handleError(error);
        } finally {
            this.setLoadingState(false);
        }
    }

    setLoadingState(isLoading) {
        if (!this.submitBtn || !this.btnText) return;
        
        if (isLoading) {
            this.submitBtn.disabled = true;
            this.submitBtn.classList.add('loading');
            this.originalBtnText = this.btnText.textContent;
            this.btnText.textContent = 'Sending...';
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.classList.remove('loading');
            this.btnText.textContent = this.originalBtnText || 'Send Message';
        }
    }

    handleSuccess() {
        // Fade out form and show success message
        if (typeof gsap !== 'undefined') {
            gsap.to(this.form, {
                opacity: 0,
                y: -20,
                duration: 0.4,
                onComplete: () => {
                    this.form.style.display = 'none';
                    this.form.reset();
                    
                    if (this.successMsg) {
                        this.successMsg.style.display = 'block';
                        gsap.fromTo(this.successMsg, 
                            { opacity: 0, y: 20 },
                            { opacity: 1, y: 0, duration: 0.5 }
                        );
                    }
                }
            });
        } else {
            this.form.style.display = 'none';
            this.form.reset();
            if (this.successMsg) {
                this.successMsg.style.display = 'block';
            }
        }
    }

    handleError(error) {
        console.error('EmailJS Error:', error);
        
        if (!this.submitBtn || !this.btnText) return;
        
        // Simple error feedback
        const originalText = this.originalBtnText || this.btnText.textContent;
        this.btnText.textContent = 'Error! Try Again';
        this.submitBtn.classList.add('error');
        
        setTimeout(() => {
            this.btnText.textContent = originalText;
            this.submitBtn.classList.remove('error');
        }, 3000);
    }

    initScrollToTop() {
        if (!this.scrollToTopBtn) return;

        // Throttle scroll event for performance
        let isScrolling;
        window.addEventListener('scroll', () => {
            window.clearTimeout(isScrolling);
            
            isScrolling = setTimeout(() => {
                if (window.scrollY > 400) {
                    this.scrollToTopBtn.classList.add('visible');
                } else {
                    this.scrollToTopBtn.classList.remove('visible');
                }
            }, 50);
        });

        this.scrollToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Using window.scrollTo with behavior smooth
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ContactManager();
});
