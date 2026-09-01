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
    gsap.set('.stagger-2, .stagger-3, .stagger-4 .glass-pill, .stagger-5, .stagger-6 .btn', { 
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
            .to('.stagger-6 .btn', { y: 0, opacity: 1, duration: 0.5, stagger: 0.15 }, '-=0.6');
    }
}
