/**
 * Image Optimization Script
 * For Training Club Website
 * Created: April 7, 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    // Convert existing images to WebP format where supported
    checkWebPSupport().then(supported => {
        if (supported) {
            convertImagesToWebP();
        }
    });
    
    // Add responsive image handling
    setupResponsiveImages();
    
    // Initialize image compression for uploaded images
    initImageCompression();
});

/**
 * Check if WebP format is supported by the browser
 * @returns {Promise<boolean>} - Promise that resolves to true if WebP is supported
 */
function checkWebPSupport() {
    return new Promise(resolve => {
        const webP = new Image();
        webP.onload = () => resolve(true);
        webP.onerror = () => resolve(false);
        webP.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
    });
}

/**
 * Convert images to use WebP format with fallback
 */
function convertImagesToWebP() {
    // Get all images with jpg or png extensions
    const images = document.querySelectorAll('img[src$=".jpg"], img[src$=".jpeg"], img[src$=".png"]');
    
    images.forEach(img => {
        // Skip SVGs and already processed images
        if (img.src.includes('.svg') || img.dataset.processed) {
            return;
        }
        
        // Create WebP URL
        const webpUrl = img.src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        
        // Create picture element
        const picture = document.createElement('picture');
        
        // Create source element for WebP
        const source = document.createElement('source');
        source.srcset = webpUrl;
        source.type = 'image/webp';
        
        // Clone the original image
        const imgClone = img.cloneNode(true);
        imgClone.dataset.processed = 'true';
        
        // Add source and image to picture
        picture.appendChild(source);
        picture.appendChild(imgClone);
        
        // Replace original image with picture element
        img.parentNode.replaceChild(picture, img);
    });
}

/**
 * Setup responsive images with srcset and sizes attributes
 */
function setupResponsiveImages() {
    // Get all images with the responsive-image class
    const images = document.querySelectorAll('img.responsive-image:not([srcset])');
    
    images.forEach(img => {
        // Skip if already processed
        if (img.hasAttribute('srcset')) {
            return;
        }
        
        const src = img.src;
        
        // Generate srcset based on the original image
        // Assuming there are different sized versions available with naming convention:
        // image.jpg, image-small.jpg, image-medium.jpg, image-large.jpg
        const baseName = src.replace(/\.(jpg|jpeg|png|webp)$/i, '');
        const extension = src.match(/\.(jpg|jpeg|png|webp)$/i)[0];
        
        const srcset = `
            ${baseName}-small${extension} 400w,
            ${baseName}-medium${extension} 800w,
            ${baseName}${extension} 1200w,
            ${baseName}-large${extension} 1600w
        `;
        
        // Set srcset and sizes attributes
        img.srcset = srcset;
        img.sizes = '(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw';
    });
}

/**
 * Initialize image compression for uploaded images
 * This is a placeholder for client-side image compression functionality
 */
function initImageCompression() {
    // This would be implemented if the site has image upload functionality
    console.log('Image compression initialized for uploads');
}

/**
 * Apply blur-up technique for image loading
 * @param {string} imageUrl - URL of the full-size image
 * @param {string} placeholderUrl - URL of the tiny placeholder image
 * @param {HTMLElement} container - Container element for the image
 */
function applyBlurUpTechnique(imageUrl, placeholderUrl, container) {
    // Create placeholder image
    const placeholderImg = new Image();
    placeholderImg.src = placeholderUrl;
    placeholderImg.classList.add('placeholder-image');
    
    // Add placeholder to container
    container.appendChild(placeholderImg);
    
    // Load the full image
    const fullImg = new Image();
    fullImg.src = imageUrl;
    
    // When full image is loaded
    fullImg.onload = function() {
        // Add the loaded class to start the transition
        fullImg.classList.add('full-image', 'loaded');
        container.appendChild(fullImg);
        
        // Remove placeholder after transition
        setTimeout(() => {
            placeholderImg.remove();
        }, 500);
    };
}

// Export functions for use in other scripts
window.imageOptimization = {
    checkWebPSupport: checkWebPSupport,
    convertToWebP: convertImagesToWebP,
    setupResponsive: setupResponsiveImages,
    blurUp: applyBlurUpTechnique
};
