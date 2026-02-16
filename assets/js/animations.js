/**
 * Seerd Energy - Animations & Interactions
 * Lightweight scroll reveal and number counter.
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initStatCounters();
    initHeroParallax();
});

function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    revealElements.forEach(el => observer.observe(el));
}

function initStatCounters() {
    const stats = document.querySelectorAll('.stat-number');

    if (stats.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.getAttribute('data-count'));
                const duration = 2000; // ms
                const frameDuration = 1000 / 60;
                const totalFrames = Math.round(duration / frameDuration);
                let frame = 0;

                const counter = setInterval(() => {
                    frame++;
                    const progress = frame / totalFrames;
                    // Ease out quart
                    const ease = 1 - Math.pow(1 - progress, 4);

                    const currentCount = Math.round(endValue * ease);

                    if (endValue > 1000) {
                        target.textContent = (currentCount / 1000).toFixed(1) + 'k+';
                        if (currentCount >= endValue) target.textContent = (endValue / 1000).toFixed(1) + 'k+';
                    } else {
                        target.textContent = currentCount + '+';
                        if (currentCount >= endValue) target.textContent = endValue + '+';
                    }

                    if (frame === totalFrames) {
                        clearInterval(counter);
                    }
                }, frameDuration);

                observer.unobserve(target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
}

function initHeroParallax() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < 800) {
            heroBg.style.transform = `translateY(${scrolled * 0.4}px) scale(${1 + scrolled * 0.0005})`;
        }
    });
}
