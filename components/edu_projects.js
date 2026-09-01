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
