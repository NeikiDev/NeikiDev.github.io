// Helper function for smoother element selection
const select = (el, all = false) => {
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
};

// Mobile menu toggle functionality
const initMobileMenu = () => {
    const hamburger = select('.hamburger');
    const navMenu = select('.nav-links');

    if (hamburger && navMenu) { // Check if both elements exist
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Toggle body scroll
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        select('.nav-links a', true).forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }
};

// Active link highlighting based on scroll position
const scrollActive = () => {
    const sections = select('section[id]', true);
    const navLinks = select('.nav-links a', true);

    if (sections.length === 0 || navLinks.length === 0) return; // Exit if no sections or links

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) { // Activate when 50% visible
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5, rootMargin: '-70px 0px -50% 0px' }); // Adjust rootMargin based on header height and desired trigger point

    sections.forEach(section => observer.observe(section));

    // Set initial active link on load
    const initialScrollY = window.pageYOffset;
    let initialActiveSection = sections[0].id;
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 70; // Offset for header
        if (initialScrollY >= sectionTop) {
            initialActiveSection = section.id;
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${initialActiveSection}`) {
            link.classList.add('active');
        }
    });
};

// Animate elements when they enter the viewport
const animateOnScroll = () => {
    const elements = select('.project-card, .skill-tag, .hero-content > *, .section-header, .about-text > *, .social-links a', true);

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // Start animation when 10% visible
            rootMargin: '0px 0px -50px 0px' // Trigger a bit before it's fully in view
        });

        elements.forEach(element => {
            element.style.opacity = "0";
            element.style.transform = "translateY(30px)";
            element.style.transition = "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
            observer.observe(element);
        });

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            .animate {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    } else {
        // Fallback for browsers without IntersectionObserver
        elements.forEach(element => {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        });
    }
};

// Typing animation for the hero section
const typingEffect = () => {
    const typeTarget = select('.hero-content h2');

    if (typeTarget && window.matchMedia("(min-width: 769px)").matches) { // Only run on wider screens
        const text = typeTarget.textContent;
        typeTarget.innerHTML = ''; // Clear existing text

        const typingDelay = 80;
        let charIndex = 0;

        function type() {
            if (charIndex < text.length) {
                typeTarget.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            }
        }

        // Use IntersectionObserver to start typing when hero is visible
        const heroSection = select('#home');
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(type, 500); // Start typing after a short delay
                observer.disconnect(); // Stop observing once started
            }
        }, { threshold: 0.1 });

        if (heroSection) {
            observer.observe(heroSection);
        }
    }
};

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    scrollActive();
    animateOnScroll();
    typingEffect();
});