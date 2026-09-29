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
// Фильтры проектов
const filterBtns = document.querySelectorAll('.filter-btn');
const galleries = document.querySelectorAll('.projects-gallery');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Убрать active у всех кнопок
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Добавить active к нажатой
        btn.classList.add('active');
        
        // Получить фильтр
        const filter = btn.getAttribute('data-filter');
        
        // Показать нужную галерею
        galleries.forEach(gallery => {
            gallery.classList.remove('active');
            if (gallery.classList.contains(`${filter}-gallery`)) {
                gallery.classList.add('active');
            }
        });
    });
});

// Видео в галерее
const videoItems = document.querySelectorAll('.video-item');

videoItems.forEach(item => {
    const video = item.querySelector('video');
    const overlay = item.querySelector('.video-play-overlay');
    
    item.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
        } else {
            video.pause();
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'all';
        }
    });
});
// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxOverlay = document.getElementById('lightboxOverlay');

// Добавляем video-элемент в lightbox
const lightboxVideo = document.createElement('video');
lightboxVideo.setAttribute('controls', '');
lightboxVideo.setAttribute('playsinline', '');
lightboxVideo.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:8px;display:none;box-shadow:0 20px 60px rgba(0,0,0,0.6);';
document.querySelector('.lightbox__content').appendChild(lightboxVideo);

// Открываем фото
document.querySelectorAll('.photos-gallery .gallery-item img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxImg.style.display = 'block';
        lightboxVideo.style.display = 'none';
        lightboxVideo.pause();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Открываем видео
document.querySelectorAll('.videos-gallery .gallery-item').forEach(item => {
    item.style.cursor = 'zoom-in';
    item.addEventListener('click', () => {
        const video = item.querySelector('video');

        // Останавливаем превью
        video.pause();

        const src = video.querySelector('source').src;
        while (lightboxVideo.firstChild) lightboxVideo.removeChild(lightboxVideo.firstChild);
        const source = document.createElement('source');
        source.src = src;
        source.type = 'video/mp4';
        lightboxVideo.appendChild(source);
        lightboxVideo.load();
        lightboxVideo.style.display = 'block';
        lightboxImg.style.display = 'none';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        lightboxVideo.play();
    });
});

function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxVideo.pause();
    lightboxVideo.style.display = 'none';
    lightboxImg.style.display = 'block';
    document.body.style.overflow = '';
}
lightboxClose.addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
});
// ===== NAVIGATION =====
const nav = document.getElementById('nav');
const navBurger = document.getElementById('navBurger');
const navLinks = document.querySelector('.nav__links');

// Появление фона при скролле
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Бургер-меню
navBurger.addEventListener('click', () => {
    navBurger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

// Закрываем меню при клике на ссылку
navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        navBurger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

// Плавный скролл
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
