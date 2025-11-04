/* ============================================
   MAIN JAVASCRIPT
   Core functionality for the ticket store
   ============================================ */

// ========== DOM ELEMENTS ==========
const header = document.querySelector('.header');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');
const backToTopBtn = document.querySelector('.btn-back-top');
const pageLoader = document.querySelector('.page-loader');

// ========== HEADER SCROLL EFFECT ==========
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        if (backToTopBtn) {
            backToTopBtn.classList.add('visible');
        }
    } else {
        header.classList.remove('scrolled');
        if (backToTopBtn) {
            backToTopBtn.classList.remove('visible');
        }
    }
});

// ========== MOBILE MENU TOGGLE ==========
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ========== BACK TO TOP BUTTON ==========
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== PAGE LOADER ==========
window.addEventListener('load', () => {
    if (pageLoader) {
        setTimeout(() => {
            pageLoader.classList.add('hidden');
        }, 500);
    }
});

// ========== CAROUSEL FUNCTIONALITY ==========
function initCarousel(containerSelector, prevBtnSelector, nextBtnSelector) {
    const container = document.querySelector(containerSelector);
    const prevBtn = document.querySelector(prevBtnSelector);
    const nextBtn = document.querySelector(nextBtnSelector);

    if (!container) return;

    const itemWidth = container.querySelector('.carousel-item')?.offsetWidth || 300;
    const scrollAmount = itemWidth + 32; // 32px gap

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    // Auto-scroll on mobile (optional)
    if (window.innerWidth <= 768) {
        let autoScrollInterval;
        const startAutoScroll = () => {
            autoScrollInterval = setInterval(() => {
                if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 10) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }, 3000);
        };

        container.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
        container.addEventListener('mouseleave', startAutoScroll);
        startAutoScroll();
    }
}

// Initialize all carousels
document.addEventListener('DOMContentLoaded', () => {
    initCarousel('.upcoming-events-carousel', '.carousel-prev', '.carousel-next');
    initCarousel('.artists-carousel', '.artists-prev', '.artists-next');
    initCarousel('.related-events-carousel', '.related-prev', '.related-next');
});

// ========== FILTER FUNCTIONALITY ==========
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const filterItems = document.querySelectorAll('.filter-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.dataset.filter || btn.textContent.trim();

            // Filter items
            filterItems.forEach(item => {
                const itemCategory = item.dataset.category || 'all';
                if (filterValue.toLowerCase() === 'all' || 
                    itemCategory.toLowerCase() === filterValue.toLowerCase()) {
                    item.style.display = '';
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, 10);
                } else {
                    item.classList.remove('visible');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ========== MODAL FUNCTIONALITY ==========
function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const modalCloses = document.querySelectorAll('.modal-close');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    modalCloses.forEach(close => {
        close.addEventListener('click', () => {
            const modal = close.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close modal on background click
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });
}

// ========== LIGHTBOX FUNCTIONALITY ==========
function initLightbox() {
    const lightboxTriggers = document.querySelectorAll('[data-lightbox]');
    const lightbox = document.querySelector('.lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxContent = document.querySelector('.lightbox-content img');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let currentImageIndex = 0;
    const images = Array.from(lightboxTriggers).map(trigger => ({
        src: trigger.dataset.lightbox || trigger.src,
        alt: trigger.alt || ''
    }));

    lightboxTriggers.forEach((trigger, index) => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            currentImageIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        if (lightbox && lightboxContent && images[currentImageIndex]) {
            lightboxContent.src = images[currentImageIndex].src;
            lightboxContent.alt = images[currentImageIndex].alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        if (lightboxContent && images[currentImageIndex]) {
            lightboxContent.src = images[currentImageIndex].src;
            lightboxContent.alt = images[currentImageIndex].alt;
        }
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        if (lightboxContent && images[currentImageIndex]) {
            lightboxContent.src = images[currentImageIndex].src;
            lightboxContent.alt = images[currentImageIndex].alt;
        }
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', prevImage);
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', nextImage);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            }
        }
    });
}

// ========== ACCORDION FUNCTIONALITY ==========
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Close all items
            document.querySelectorAll('.accordion-item').forEach(accordionItem => {
                accordionItem.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ========== SEARCH FUNCTIONALITY ==========
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchItems = document.querySelectorAll('.search-item');

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();

        searchItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// ========== SEAT SELECTION ==========
function initSeatSelection() {
    const seats = document.querySelectorAll('.seat:not(.occupied)');

    seats.forEach(seat => {
        seat.addEventListener('click', () => {
            seat.classList.toggle('selected');
            updateSeatSummary();
        });
    });
}

function updateSeatSummary() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const summaryElement = document.querySelector('.seat-summary');
    
    if (summaryElement) {
        const count = selectedSeats.length;
        const pricePerSeat = 50; // Default price
        const total = count * pricePerSeat;
        
        summaryElement.innerHTML = `
            <p>Selected Seats: ${count}</p>
            <p>Price per Seat: $${pricePerSeat}</p>
            <p class="total">Total: $${total}</p>
        `;
    }
}

// ========== FORM VALIDATION ==========
function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ec4899';
                    setTimeout(() => {
                        input.style.borderColor = '';
                    }, 3000);
                } else {
                    input.style.borderColor = '#3b82f6';
                }
            });

            if (isValid) {
                // Show success message
                showNotification('Form submitted successfully!', 'success');
                form.reset();
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });
}

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#3b82f6' : type === 'error' ? '#ec4899' : '#a855f7'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ========== NEWSLETTER SUBSCRIPTION ==========
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput?.value;

            if (email && validateEmail(email)) {
                showNotification('Successfully subscribed to newsletter!', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ========== INITIALIZE ALL FEATURES ==========
document.addEventListener('DOMContentLoaded', () => {
    initFilters();
    initModals();
    initLightbox();
    initAccordion();
    initSearch();
    initSeatSelection();
    initFormValidation();
    initNewsletter();
});

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

