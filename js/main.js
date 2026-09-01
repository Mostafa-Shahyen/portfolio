/**
 * hero_nav.js
 * Core Navigation Layout & Hero Section Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initHeroAnimations();
});

function initNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    
    // Toggle mobile menu
    if (mobileMenuBtn && mobileMenuOverlay) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
        });
    }

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
                    mobileMenuBtn.classList.remove('active');
                    mobileMenuOverlay.classList.remove('active');
                }
                
                // Use GSAP ScrollToPlugin if available, else fallback to native smooth scroll
                if (typeof gsap !== 'undefined' && gsap.plugins && gsap.plugins.ScrollToPlugin) {
                    gsap.to(window, { 
                        duration: 1, 
                        scrollTo: { y: targetEl, offsetY: 70 },
                        ease: 'power3.inOut' 
                    });
                } else {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

function initHeroAnimations() {
    // Basic check for GSAP
    if (typeof gsap === 'undefined') {
        console.warn('GSAP is not loaded. Hero animations skipped.');
        return;
    }

    // Immediately hide elements to prevent flash before animation
    gsap.set('.stagger-2, .stagger-3, .stagger-4 .glass-pill, .stagger-5, .stagger-6', { 
        opacity: 0, 
        y: 30 
    });

    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    const monoTag = document.querySelector('.stagger-1');
    
    // Staggered typing effect for the first tag
    if (monoTag) {
        const originalText = monoTag.textContent;
        monoTag.textContent = '';
        
        const cursor = document.createElement('span');
        cursor.textContent = '|';
        cursor.style.display = 'inline-block';
        cursor.style.marginLeft = '2px';
        cursor.style.color = 'var(--accent, #38bdf8)';
        monoTag.appendChild(cursor);
        
        // Blinking cursor
        const cursorAnim = gsap.to(cursor, { 
            opacity: 0, 
            duration: 0.4, 
            repeat: -1, 
            yoyo: true, 
            ease: "steps(1)" 
        });
        
        let i = 0;
        const typeSpeed = 60; // ms per char
        
        function typeWriter() {
            if (i < originalText.length) {
                // Insert text before cursor
                const textNode = document.createTextNode(originalText.charAt(i));
                monoTag.insertBefore(textNode, cursor);
                i++;
                setTimeout(typeWriter, typeSpeed);
            } else {
                // Keep cursor blinking for a short moment, then remove and play entrance animations
                setTimeout(() => {
                    cursorAnim.kill();
                    cursor.style.display = 'none';
                    playEntranceAnimations();
                }, 400);
            }
        }
        
        // Small delay before starting typing
        setTimeout(typeWriter, 300);
    } else {
        playEntranceAnimations();
    }

    function playEntranceAnimations() {
        heroTimeline
            .to('.stagger-2', { y: 0, opacity: 1, duration: 0.8 })
            .to('.stagger-3', { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
            .to('.stagger-4 .glass-pill', { y: 0, opacity: 1, duration: 0.5, stagger: 0.15 }, '-=0.6')
            .to('.stagger-5', { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
            .to('.stagger-6', { y: 0, opacity: 1, duration: 0.6 }, '-=0.5');
    }
}

document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP ScrollTrigger if available (assumes GSAP and ScrollTrigger are loaded)
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Animate About Section
    const aboutTitle = document.querySelector('.about-section .section-title');
    const aboutContent = document.querySelector('.about-content');

    if (aboutTitle) {
      gsap.fromTo(aboutTitle, 
        { y: 50, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.about-section',
            start: "top 80%",
          }
        }
      );
    }

    if (aboutContent) {
      gsap.fromTo(aboutContent, 
        { y: 30, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.about-section',
            start: "top 80%",
          }
        }
      );
    }

    // Animate Skills Section Title
    const skillsTitle = document.querySelector('.skills-section .section-title');
    if (skillsTitle) {
      gsap.fromTo(skillsTitle, 
        { y: 50, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.skills-section',
            start: "top 80%",
          }
        }
      );
    }

    // Stagger animation for skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    if (skillCards.length > 0) {
      gsap.fromTo(skillCards, 
        { y: 50, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.skills-grid',
            start: "top 85%",
            onEnter: () => {
              skillCards.forEach((card, i) => {
                setTimeout(() => card.classList.add('active'), i * 150);
              });
            }
          }
        }
      );
    }
  } else {
    // Fallback to IntersectionObserver if GSAP is not loaded globally
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); 
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
      revealObserver.observe(el);
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // GSAP ScrollReveal Animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Section Titles Reveal
    gsap.utils.toArray('.section-edu-proj .section-title').forEach(title => {
      gsap.fromTo(title, 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // Timeline Items Reveal
    gsap.fromTo('.timeline-item',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".timeline",
          start: "top 80%",
        }
      }
    );

    // Project Cards Reveal
    gsap.fromTo('.project-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 80%",
        }
      }
    );
  }

  // Subtle hover interaction logic for project cards (3D Tilt effect)
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top;  // y position within the element
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation (-5 to 5 degrees)
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      
      if (typeof gsap !== 'undefined') {
        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          transformPerspective: 1000,
          ease: "power1.out",
          duration: 0.4
        });
      } else {
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    });
    
    card.addEventListener('mouseleave', () => {
      // Reset transform
      if (typeof gsap !== 'undefined') {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          ease: "power2.out",
          duration: 0.6
        });
      } else {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        card.style.transition = 'transform 0.6s ease-out';
        
        // Remove transition after it's done so it doesn't conflict with mousemove
        setTimeout(() => {
          card.style.transition = '';
        }, 600);
      }
    });
  });
});

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

// Cinematic Private Project Alert
document.addEventListener('DOMContentLoaded', () => {
    const privateBtns = document.querySelectorAll('.private-project-btn');
    const overlay = document.querySelector('.private-overlay');
    const progress = document.querySelector('.private-progress');
    
    if (privateBtns.length > 0 && overlay && progress) {
        privateBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Show cinematic overlay
                overlay.classList.add('active');
                
                // Animate progress bar simulating a hack/redirect
                if (typeof gsap !== 'undefined') {
                    gsap.to(progress, {
                        width: '100%',
                        duration: 2.5,
                        delay: 0.5,
                        ease: 'power1.inOut',
                        onComplete: () => {
                            // Hide overlay
                            overlay.classList.remove('active');
                            // Reset progress bar
                            gsap.set(progress, {width: '0%'});
                            
                            // Scroll to contact section
                            const contactSection = document.querySelector('#contact');
                            if (contactSection && gsap.plugins && gsap.plugins.ScrollToPlugin) {
                                gsap.to(window, { duration: 1.2, scrollTo: { y: contactSection, offsetY: 70 }, ease: 'power3.inOut' });
                            } else if (contactSection) {
                                contactSection.scrollIntoView({ behavior: 'smooth' });
                            }
                        }
                    });
                }
            });
        });
    }
});

