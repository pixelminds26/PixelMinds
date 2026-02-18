// ==================== PARTICLE SYSTEM ====================
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
        ctx.fillStyle = `rgba(0, 217, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = [];
for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    // Draw connections
    particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.strokeStyle = `rgba(0, 217, 255, ${0.1 * (1 - distance / 100)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.stroke();
            }
        });
    });
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ==================== NAVIGATION ====================
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Smooth scroll
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
        
        // Update active nav link
        navLinks.forEach(link => link.classList.remove('active'));
        if (this.classList.contains('nav-link')) {
            this.classList.add('active');
        }
    });
});

// ==================== COUNTER ANIMATION ====================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// ==================== INTERSECTION OBSERVER ====================
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate counters
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.stat-number, .project-card, .skill-category, .achievement-badge, .feature-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    fadeInObserver.observe(el);
});

// ==================== PROGRESS BARS ANIMATION ====================
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.progress-fill');
            fills.forEach(fill => {
                const progress = fill.getAttribute('data-progress');
                setTimeout(() => {
                    fill.style.width = progress + '%';
                }, 100);
            });
            progressObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stats-panel, .progress-stat').forEach(el => {
    progressObserver.observe(el);
});

// ==================== PROJECT CARDS ====================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
    
    // 3D Tilt Effect
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `translateY(-10px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ==================== FORM HANDLING ====================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.btn-primary');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="btn-text">ENVIANDO...</span>';
        
        // Simulate sending
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Success
        submitBtn.innerHTML = '<span class="btn-text">MENSAGEM ENVIADA! ✓</span>';
        showNotification('📧 Mensagem enviada com sucesso! A PixelMinds responderá em breve.', 'success');
        
        contactForm.reset();
        
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }, 3000);
    });
}

// Form focus effects
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = '';
    });
});

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 200px;
        right: 30px;
        background: ${type === 'success' ? 'rgba(0, 245, 160, 0.2)' : 'rgba(255, 0, 110, 0.2)'};
        backdrop-filter: blur(20px);
        border: 1px solid ${type === 'success' ? 'var(--color-success)' : 'var(--color-accent)'};
        color: var(--color-text);
        padding: 1.5rem 2rem;
        border-radius: 16px;
        font-family: var(--font-display);
        font-size: 0.9rem;
        font-weight: 600;
        z-index: 10000;
        max-width: 350px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    
    notification.textContent = message;
    
    if (!document.getElementById('notificationStyles')) {
        const style = document.createElement('style');
        style.id = 'notificationStyles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(500px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(500px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// ==================== NAVBAR SCROLL EFFECT ====================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    }
    
    // Hide/show navbar
    if (currentScroll > lastScroll && currentScroll > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ==================== PAGE LOAD ANIMATION ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.status-badge, .hero-title, .hero-description, .hero-stats, .hero-actions');
    
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 150);
    });
    
    // Animate visual card
    const visualCard = document.querySelector('.visual-card');
    if (visualCard) {
        visualCard.style.opacity = '0';
        visualCard.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            visualCard.style.transition = 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
            visualCard.style.opacity = '1';
            visualCard.style.transform = 'scale(1)';
        }, 800);
    }
});

// ==================== CONSOLE MESSAGE ====================
console.log('%c🎨 PIXELMINDS', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #00D9FF, #7B2CBF); color: white; padding: 10px 20px; border-radius: 8px;');
console.log('%c✨ Creative Digital Agency', 'font-size: 14px; color: #00F5A0;');
console.log('%c💼 Entre em contato: pixelminds26@gmail.com', 'font-size: 12px; color: #00D9FF;');

// ==================== DYNAMIC YEAR ====================
const currentYear = new Date().getFullYear();
document.querySelectorAll('.footer-bottom p').forEach(p => {
    if (p.textContent.includes('2026')) {
        p.textContent = p.textContent.replace('2026', currentYear);
    }
});

// ==================== PERFORMANCE OPTIMIZATION ====================
function debounce(func, wait = 10) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

const debouncedScroll = debounce(() => {
    // Optimized scroll operations
}, 10);

window.addEventListener('scroll', debouncedScroll);
