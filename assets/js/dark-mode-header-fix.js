/* JavaScript to force header text to be white in dark mode */
document.addEventListener('DOMContentLoaded', function() {
  // Function to apply white text to header elements
  function forceHeaderTextWhite() {
    if (document.body.classList.contains('dark-mode')) {
      // Get all header elements
      const headerElements = document.querySelectorAll('header, .header, #header, .site-header, #site-header, h1, h2, h3, h4, h5, h6, .site-title, .logo-text, nav, .nav, .navbar, .navigation');
      
      // Apply white color to all header elements
      headerElements.forEach(function(element) {
        element.style.setProperty('color', '#ffffff', 'important');
        
        // Get all links within header elements
        const links = element.querySelectorAll('a');
        links.forEach(function(link) {
          link.style.setProperty('color', '#ffffff', 'important');
        });
      });
    }
  }
  
  // Run immediately
  forceHeaderTextWhite();
  
  // Also run when theme toggle is clicked
  const themeToggles = document.querySelectorAll('.theme-toggle, #theme-toggle, [class*="theme-toggle"], [id*="theme-toggle"]');
  themeToggles.forEach(function(toggle) {
    toggle.addEventListener('click', function() {
      // Wait a moment for the dark-mode class to be applied
      setTimeout(forceHeaderTextWhite, 100);
    });
  });
  
  // Run periodically to ensure it catches any dynamic changes
  setInterval(forceHeaderTextWhite, 1000);
});
