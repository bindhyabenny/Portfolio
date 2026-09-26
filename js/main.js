/**
 * Bindhya Benny - Developer Portfolio JavaScript
 * Clean, lightweight, dependency-free interactive behavior
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 2. Navigation & Mobile Drawer
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            navToggle.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Close mobile menu when clicking any nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Header scroll background shadow
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });

    // 3. Active Section Indicator (Scrollspy)
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href*="#${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // 4. Toast Notification Utility
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    let toastTimeout = null;

    function showToast(message, duration = 3500) {
        if (!toast || !toastMessage) return;
        
        toastMessage.textContent = message;
        toast.classList.add('show');

        if (toastTimeout) {
            clearTimeout(toastTimeout);
        }

        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }

    // 5. Placeholder Link Handler (for projects and CV)
    const placeholderLinks = document.querySelectorAll('.placeholder-link');
    placeholderLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#' || href === '') {
                e.preventDefault();
                const title = link.getAttribute('data-title') || 'This link';
                showToast(`Placeholder: ${title} will be active once URL is configured.`);
            }
        });
    });

    // 6. Contact Form Validation & Feedback
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const submitBtn = document.getElementById('submit-btn');

        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const messageError = document.getElementById('message-error');

        function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Reset errors
            nameInput.classList.remove('error');
            nameError.classList.remove('visible');
            emailInput.classList.remove('error');
            emailError.classList.remove('visible');
            messageInput.classList.remove('error');
            messageError.classList.remove('visible');

            // Name validation
            if (!nameInput.value.trim()) {
                nameInput.classList.add('error');
                nameError.classList.add('visible');
                isValid = false;
            }

            // Email validation
            if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
                emailInput.classList.add('error');
                emailError.classList.add('visible');
                isValid = false;
            }

            // Message validation
            if (!messageInput.value.trim()) {
                messageInput.classList.add('error');
                messageError.classList.add('visible');
                isValid = false;
            }

            if (isValid) {
                const originalBtnContent = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Sending Message...</span>';

                // Simulate client dispatch / Form ready for API connection
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                    if (window.lucide) window.lucide.createIcons();

                    showToast('Thank you! Your message form is configured and ready for backend connection.');
                    contactForm.reset();
                }, 1000);
            }
        });
    }

    // 8. Subtle Scroll Reveal Animations using IntersectionObserver
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealElements = document.querySelectorAll(
        '.hero-content, .hero-visual, .about-card-main, .about-summary-panel, .skill-category-card, .experience-card, .project-card, .education-card, .contact-info-panel, .contact-form-panel'
    );

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            revealObserver.observe(el);
        });
    }
});
