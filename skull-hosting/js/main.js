// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate Elements on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.dataset.suffix || '');
        }
    }, 16);
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/[0-9]/g, '');
                stat.dataset.suffix = suffix;
                animateCounter(stat, number);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Form Handling (for contact/signup pages)
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show success message (in production, this would send to server)
        alert('Thank you! Your submission has been received.');
        form.reset();
    });
});

// Pricing Toggle (Monthly/Yearly)
const pricingToggle = document.getElementById('pricingToggle');
if (pricingToggle) {
    pricingToggle.addEventListener('change', () => {
        const prices = document.querySelectorAll('.price-amount');
        const isYearly = pricingToggle.checked;
        
        prices.forEach(price => {
            const monthlyPrice = parseInt(price.dataset.monthly);
            const yearlyPrice = parseInt(price.dataset.yearly);
            price.textContent = '$' + (isYearly ? yearlyPrice : monthlyPrice);
        });
    });
}

// Testimonial Slider (if multiple testimonials)
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        card.style.display = i === index ? 'block' : 'none';
    });
}

if (testimonialCards.length > 3) {
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// Active Navigation Link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinkItems = document.querySelectorAll('.nav-links a');

navLinkItems.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
        link.classList.add('active');
    }
});

// Server Rack Animation
const serverUnits = document.querySelectorAll('.server-unit');
let activeServer = 2;

setInterval(() => {
    serverUnits.forEach((unit, index) => {
        unit.classList.remove('active');
        if (index === activeServer) {
            unit.classList.add('active');
        }
    });
    activeServer = (activeServer + 1) % serverUnits.length;
}, 2000);

console.log('Skull Hosting - Site initialized successfully!');
