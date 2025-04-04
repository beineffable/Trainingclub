document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger-menu');
  const navMenu = document.querySelector('.nav-menu');
  
  // Ensure menu is hidden by default (for iOS compatibility)
  navMenu.classList.remove('active');
  
  hamburger.addEventListener('click', function(e) {
    // Prevent any default behavior
    e.preventDefault();
    e.stopPropagation();
    
    // Toggle active classes
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  // Close menu when clicking on a nav link
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
});
