/**
 * Seerd Energy - Main JS
 * Handles navigation and global interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initLazyLoading();
});

function initMobileMenu() {
    const menuBtn = document.getElementById('menu-toggle');
    const nav = document.getElementById('site-nav');

    if (!menuBtn || !nav) return;

    menuBtn.addEventListener('click', () => {
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('is-active');
    });
}

function initLazyLoading() {
    // Native lazy loading is preferred, this is a fallback for background images or if needed
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback script could go here, but for now we rely on modern browser support
        // which covers >95% of users.
    }
}
