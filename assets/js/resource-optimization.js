/**
 * Resource Preloading and Critical CSS Implementation
 * For Training Club Website
 * Created: April 7, 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize resource preloading
    initResourcePreloading();
    
    // Add script loading optimization
    optimizeScriptLoading();
    
    // Initialize font loading optimization
    optimizeFontLoading();
});

/**
 * Initialize resource preloading for critical assets
 */
function initResourcePreloading() {
    // Critical resources to preload
    const criticalResources = [
        { type: 'image', url: 'assets/images/training_club_icon.png' },
        { type: 'image', url: 'assets/images/logo.png' },
        { type: 'font', url: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap' }
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.url;
        
        if (resource.type === 'image') {
            link.as = 'image';
        } else if (resource.type === 'font') {
            link.as = 'font';
            link.crossOrigin = 'anonymous';
        }
        
        document.head.appendChild(link);
    });
}

/**
 * Optimize script loading by using defer and async attributes
 */
function optimizeScriptLoading() {
    // Get all script tags
    const scripts = document.querySelectorAll('script:not([defer]):not([async])');
    
    scripts.forEach(script => {
        // Skip inline scripts
        if (!script.src) return;
        
        // Add defer attribute to scripts that should execute after parsing
        if (!script.hasAttribute('async')) {
            script.defer = true;
        }
    });
}

/**
 * Optimize font loading using the Font Loading API
 */
function optimizeFontLoading() {
    if ('fonts' in document) {
        // Load critical fonts first
        Promise.all([
            document.fonts.load('700 1em Montserrat'),
            document.fonts.load('400 1em Open Sans')
        ]).then(() => {
            document.documentElement.classList.add('fonts-loaded');
        });
    }
}

/**
 * Dynamically load non-critical CSS
 * @param {string} href - URL of the CSS file to load
 */
function loadNonCriticalCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    
    // Add onload handler
    link.onload = function() {
        link.onload = null;
        link.media = 'all';
    };
    
    // Set media to none initially to not block rendering
    link.media = 'print';
    
    document.head.appendChild(link);
}

/**
 * Initialize intersection observer for elements that should load additional resources when visible
 */
function initResourceIntersectionObserver() {
    // Get all elements with the load-resources-on-visible class
    const elements = document.querySelectorAll('.load-resources-on-visible');
    
    // Create an intersection observer
    const resourceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is in the viewport
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Load resources specified in data attributes
                if (element.dataset.cssToLoad) {
                    loadNonCriticalCSS(element.dataset.cssToLoad);
                }
                
                if (element.dataset.scriptToLoad) {
                    loadScript(element.dataset.scriptToLoad);
                }
                
                // Stop observing the element
                observer.unobserve(element);
            }
        });
    }, {
        // Options for the observer
        rootMargin: '100px 0px',
        threshold: 0.01
    });
    
    // Observe each element
    elements.forEach(element => {
        resourceObserver.observe(element);
    });
}

/**
 * Dynamically load a script
 * @param {string} src - URL of the script to load
 * @param {boolean} defer - Whether to defer script execution
 * @returns {Promise} - Promise that resolves when the script is loaded
 */
function loadScript(src, defer = true) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.defer = defer;
        
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Script load error for ${src}`));
        
        document.head.appendChild(script);
    });
}

// Export functions for use in other scripts
window.resourceOptimization = {
    preload: initResourcePreloading,
    loadCSS: loadNonCriticalCSS,
    loadScript: loadScript,
    initResourceObserver: initResourceIntersectionObserver
};
