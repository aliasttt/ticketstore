/* ============================================
   ANIMATIONS JAVASCRIPT
   Scroll animations, transitions, and effects
   ============================================ */

// ========== INTERSECTION OBSERVER FOR FADE-IN ==========
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Observe cards
    document.querySelectorAll('.card, .event-card, .artist-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ========== PARALLAX EFFECT ==========
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;

        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// ========== COUNTER ANIMATION ==========
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.dataset.target || entry.target.textContent);
                entry.target.classList.add('counted');
                animateCounter(entry.target, target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ========== TYPING ANIMATION ==========
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

function initTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-animation');
    
    const typingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                const text = entry.target.dataset.text || entry.target.textContent;
                entry.target.classList.add('typed');
                typeWriter(entry.target, text);
            }
        });
    }, { threshold: 0.5 });

    typingElements.forEach(element => {
        typingObserver.observe(element);
    });
}

// ========== GLOW PULSE EFFECT ==========
function initGlowPulse() {
    const glowElements = document.querySelectorAll('.glow-pulse');
    
    glowElements.forEach(element => {
        setInterval(() => {
            element.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.5)';
            setTimeout(() => {
                element.style.boxShadow = '0 0 40px rgba(168, 85, 247, 0.6)';
            }, 500);
        }, 2000);
    });
}

// ========== CURSOR FOLLOW EFFECT (Optional) ==========
function initCursorFollow() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid #3b82f6;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        display: none;
    `;
    document.body.appendChild(cursor);

    // Only show on desktop
    if (window.innerWidth > 768) {
        cursor.style.display = 'block';
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });

        // Add hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .card, .event-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.borderColor = '#a855f7';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = '#3b82f6';
            });
        });
    }
}

// ========== SCROLL PROGRESS BAR ==========
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #3b82f6, #a855f7, #ec4899);
        z-index: 10000;
        transform-origin: left;
        transform: scaleX(0);
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const progress = scrolled / windowHeight;
        progressBar.style.transform = `scaleX(${progress})`;
    });
}

// ========== RIPPLE EFFECT ON BUTTONS ==========
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-hero, .event-card .btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========== HOVER TILT EFFECT ==========
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.tilt-effect');

    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ========== LAZY LOADING FOR IMAGES ==========
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== PARTICLE BACKGROUND (Optional) ==========
function initParticleBackground() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.3;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = '#3b82f6';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ========== INITIALIZE ALL ANIMATIONS ==========
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initParallax();
    initCounters();
    initTypingAnimation();
    initGlowPulse();
    initScrollProgress();
    initRippleEffect();
    initTiltEffect();
    initLazyLoading();
    
    // Optional effects (comment out if not needed)
    // initCursorFollow();
    // initParticleBackground();
});

// ========== PERFORMANCE OPTIMIZATION ==========
// Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations here
}, 16));

