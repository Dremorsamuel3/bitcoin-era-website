// Bitcoin Era - JavaScript Interactivity

document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    animateOnScroll();
});

// ========================================
// Form Handling
// ========================================

const contactForm = document.getElementById('contactForm');
const signupForm = document.getElementById('signupForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleContactSubmit();
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleSignupSubmit();
    });
}

function handleContactSubmit() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const formMessage = document.getElementById('formMessage');

    // Log form data to console
    console.log('[v0] Contact form submitted:', { name, email, message });

    // Validate fields
    if (!name || !email || !message) {
        formMessage.innerHTML = '<div class="alert alert-danger">Please fill in all fields</div>';
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formMessage.innerHTML = '<div class="alert alert-danger">Please enter a valid email</div>';
        return;
    }

    // Show success message
    formMessage.innerHTML = '<div class="alert alert-success"><strong>Success!</strong> Your message has been sent. We will get back to you soon!</div>';
    
    // Reset form
    contactForm.reset();

    // Clear message after 5 seconds
    setTimeout(() => {
        formMessage.innerHTML = '';
    }, 5000);
}

function handleSignupSubmit() {
    const form = signupForm;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    console.log('[v0] Signup form submitted:', { name, email, agreeTerms });

    if (!name || !email || !password) {
        alert('Please fill in all fields');
        return;
    }

    if (!agreeTerms) {
        alert('Please agree to the Terms of Service');
        return;
    }

    alert('Account created successfully! Redirecting...');
    console.log('[v0] Account created for:', email);
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
    modal.hide();
    
    // Reset form
    signupForm.reset();
}

// ========================================
// Scroll Animations
// ========================================

function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });
}

// ========================================
// Event Listeners
// ========================================

function initializeEventListeners() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    console.log('[v0] Navigating to:', href);
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Add active class to nav links on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + section.id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ========================================
// Demo Button Handler
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const demoBtn = document.querySelector('.btn-outline-warning');
    if (demoBtn) {
        demoBtn.addEventListener('click', function() {
            console.log('[v0] Demo button clicked');
            alert('Demo video coming soon! Check back later for live trading demonstrations.');
        });
    }
});

console.log('[v0] Bitcoin Era website loaded successfully');
