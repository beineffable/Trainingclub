/**
 * Image Lazy Loading Implementation
 * For Training Club Website
 * Created: April 7, 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize lazy loading for all images with data-src attribute
    initLazyLoading();
    
    // Add intersection observer for elements that should be animated when visible
    initIntersectionObserver();
});

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
    // Get all images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    // Create an intersection observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the image is in the viewport
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Set the src attribute to the data-src value
                img.src = img.dataset.src;
                
                // If there's a data-srcset attribute, set the srcset attribute
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                }
                
                // Add a load event listener to handle when the image is loaded
                img.addEventListener('load', () => {
                    // Remove the lazy-image class
                    img.classList.remove('lazy-image');
                    
                    // Add the loaded class
                    img.classList.add('loaded');
                    
                    // Stop observing the image
                    observer.unobserve(img);
                });
            }
        });
    }, {
        // Options for the observer
        rootMargin: '50px 0px',
        threshold: 0.01
    });
    
    // Observe each lazy image
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * Initialize intersection observer for elements that should be animated when visible
 */
function initIntersectionObserver() {
    // Get all elements with the animate-on-scroll class
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    // Create an intersection observer
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is in the viewport
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add the animate class
                element.classList.add('animate');
                
                // Stop observing the element
                observer.unobserve(element);
            }
        });
    }, {
        // Options for the observer
        rootMargin: '0px',
        threshold: 0.1
    });
    
    // Observe each element
    animateElements.forEach(element => {
        animationObserver.observe(element);
    });
}

/**
 * Convert images to use lazy loading
 * This function can be called to retroactively add lazy loading to existing images
 */
function convertImagesToLazyLoad() {
    // Get all images without data-src attribute
    const images = document.querySelectorAll('img:not([data-src])');
    
    images.forEach(img => {
        // Skip images that are already lazy loaded or don't have a src
        if (img.classList.contains('lazy-image') || !img.src) {
            return;
        }
        
        // Store the original src in data-src
        img.dataset.src = img.src;
        
        // If there's a srcset attribute, store it in data-srcset
        if (img.srcset) {
            img.dataset.srcset = img.srcset;
            img.srcset = '';
        }
        
        // Set a placeholder or low-quality image
        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
        
        // Add the lazy-image class
        img.classList.add('lazy-image');
    });
    
    // Initialize lazy loading for the newly converted images
    initLazyLoading();
}

/**
 * Preload critical images
 * @param {Array} urls - Array of image URLs to preload
 */
function preloadCriticalImages(urls) {
    urls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Export functions for use in other scripts
window.lazyLoading = {
    init: initLazyLoading,
    convert: convertImagesToLazyLoad,
    preloadCritical: preloadCriticalImages
};
