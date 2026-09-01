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
