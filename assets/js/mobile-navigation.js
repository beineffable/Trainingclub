/* Mobile Navigation JavaScript */

document.addEventListener('DOMContentLoaded', function() {
  // Create mobile menu toggle button if it doesn't exist
  if (!document.querySelector('.mobile-menu-toggle')) {
    const navContainer = document.querySelector('.nav-container');
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    if (navContainer) {
      navContainer.insertBefore(mobileMenuToggle, navContainer.firstChild);
    }
  }
  
  // Add mobile menu toggle functionality
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      
      // Change icon based on menu state
      const icon = mobileMenuToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('active')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navLinks.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
        navLinks.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) {
          icon.className = 'fas fa-bars';
        }
      }
    });
    
    // Close menu when clicking on a link
    const navLinksItems = navLinks.querySelectorAll('a');
    navLinksItems.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) {
          icon.className = 'fas fa-bars';
        }
      });
    });
  }
  
  // Add viewport meta tag if missing
  if (!document.querySelector('meta[name="viewport"]')) {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(meta);
  }
  
  // Improve touch experience for mobile devices
  const allButtons = document.querySelectorAll('button, .btn, a.btn, .cta-button');
  allButtons.forEach(button => {
    button.addEventListener('touchstart', function() {
      this.classList.add('touch-active');
    });
    
    button.addEventListener('touchend', function() {
      this.classList.remove('touch-active');
    });
  });
  
  // Fix table responsiveness
  const tables = document.querySelectorAll('table');
  tables.forEach(table => {
    const wrapper = document.createElement('div');
    wrapper.className = 'table-responsive';
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });
  
  // Lazy load images for better mobile performance
  const images = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
  
  // Add swipe support for mobile carousels/sliders
  const sliders = document.querySelectorAll('.slider, .carousel');
  sliders.forEach(slider => {
    let startX, endX;
    const threshold = 50; // Minimum distance for swipe
    
    slider.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
    });
    
    slider.addEventListener('touchend', function(e) {
      endX = e.changedTouches[0].clientX;
      
      const distance = startX - endX;
      
      if (Math.abs(distance) >= threshold) {
        if (distance > 0) {
          // Swipe left - next slide
          const nextButton = slider.querySelector('.next, .carousel-next');
          if (nextButton) nextButton.click();
        } else {
          // Swipe right - previous slide
          const prevButton = slider.querySelector('.prev, .carousel-prev');
          if (prevButton) prevButton.click();
        }
      }
    });
  });
});
