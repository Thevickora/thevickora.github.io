// ===================================
// Apple-style Portfolio - JavaScript
// ===================================

// ===== ANIMATION ON SCROLL =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all work items
document.querySelectorAll('.work-item').forEach(item => {
    observer.observe(item);
});

// ===== VIDEO PLAY/PAUSE ON CLICK =====
document.querySelectorAll('.video-item').forEach(item => {
    const video = item.querySelector('.work-video');
    const overlay = item.querySelector('.play-overlay');
    
    if (video && overlay) {
        // Click handler for play/pause
        item.addEventListener('click', (e) => {
            if (video.paused) {
                video.play();
                video.classList.add('playing');
            } else {
                video.pause();
                video.classList.remove('playing');
            }
        });

        // Show overlay when video ends
        video.addEventListener('ended', () => {
            video.classList.remove('playing');
        });

        // Pause video when it's out of view
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting && !video.paused) {
                    video.pause();
                    video.classList.remove('playing');
                }
            });
        }, { threshold: 0.5 });

        videoObserver.observe(video);
    }
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
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

// ===== PARALLAX EFFECT FOR HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ===== LAZY LOADING FOR IMAGES =====
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===== PERFORMANCE: Reduce motion for users who prefer it =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.documentElement.style.scrollBehavior = 'auto';
}

// ===== CONSOLE EASTER EGG =====
console.log(
    '%c✨ Vickora Portfolio',
    'font-size: 20px; font-weight: bold; color: #667eea;'
);
console.log(
    '%cСделано с помощью ИИ • 2026',
    'font-size: 12px; color: #666;'
);

// ===== PRELOAD CRITICAL RESOURCES =====
window.addEventListener('load', () => {
    // Remove any loading indicators
    document.body.classList.add('loaded');
    
    // Preload first video if exists
    const firstVideo = document.querySelector('.work-video');
    if (firstVideo) {
        firstVideo.preload = 'metadata';
    }
});
