/* Vercel-Optimized Animation Initializer
 * This JavaScript ensures animations work correctly on Vercel deployment
 * by forcing animation rendering and handling testimonial images
 */

// Force browser to recognize and render animations
document.addEventListener('DOMContentLoaded', function() {
  // Force animation rendering
  document.body.style.animationPlayState = 'running';
  
  // Apply classes to ensure animations run
  const animatedElements = document.querySelectorAll('.cta-button, .secondary-button, .btn, .card, .feature-box, .pricing-plan, .testimonial, .section-title');
  animatedElements.forEach(function(element) {
    element.style.willChange = 'transform';
    element.style.backfaceVisibility = 'hidden';
  });
  
  // Ensure testimonial images are visible
  const testimonialAuthors = document.querySelectorAll('.testimonial-author');
  testimonialAuthors.forEach(function(author, index) {
    const img = author.querySelector('img');
    if (img) {
      // Add data attribute for targeting in CSS
      img.setAttribute('data-testimonial-index', index + 1);
      
      // Force image visibility check
      setTimeout(function() {
        if (getComputedStyle(img).opacity === '0' || !img.complete) {
          author.classList.add('image-fallback-needed');
        }
      }, 500);
    }
  });
  
  // Add scroll animation detection
  const scrollElements = document.querySelectorAll('.section-title, .feature-box, .pricing-plan, .testimonial, .cta-section, .about-content');
  
  function checkScrollAnimation() {
    scrollElements.forEach(function(element) {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('visible');
      }
    });
  }
  
  // Run on load and scroll
  checkScrollAnimation();
  window.addEventListener('scroll', checkScrollAnimation);
  
  // Add staggered animation to list items
  const listContainers = document.querySelectorAll('.feature-list, .pricing-features, .nav-menu');
  listContainers.forEach(function(container) {
    const items = container.querySelectorAll('li');
    items.forEach(function(item, index) {
      item.style.animationDelay = (0.1 * (index + 1)) + 's';
      item.style.opacity = '0';
      setTimeout(function() {
        item.style.opacity = '1';
      }, 100 * (index + 1));
    });
  });
  
  // Add hover effects for touch devices
  if (window.matchMedia('(hover: none)').matches) {
    const touchElements = document.querySelectorAll('.cta-button, .secondary-button, a:not(.logo), .card, .feature-box, .pricing-plan, .testimonial');
    touchElements.forEach(function(element) {
      element.addEventListener('touchstart', function() {
        this.classList.add('touch-active');
      });
      element.addEventListener('touchend', function() {
        this.classList.remove('touch-active');
      });
    });
  }
  
  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduced-motion');
  }
  
  // Force repaint to ensure animations are visible
  document.body.style.display = 'none';
  document.body.offsetHeight; // Force reflow
  document.body.style.display = '';
});

// Add window load event to ensure all resources are loaded
window.addEventListener('load', function() {
  // Force another repaint after everything is loaded
  document.body.classList.add('fully-loaded');
  
  // Check testimonial images again after full load
  const testimonialImages = document.querySelectorAll('.testimonial-author img');
  testimonialImages.forEach(function(img) {
    if (!img.complete || img.naturalWidth === 0) {
      img.parentElement.classList.add('image-fallback-needed');
    }
  });
});
