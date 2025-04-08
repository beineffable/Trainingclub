// Single Header Theme Toggle JavaScript
// This script ensures the theme toggle in the header works correctly

document.addEventListener('DOMContentLoaded', function() {
  // Create the header right container if it doesn't exist
  const headerContainer = document.querySelector('.header-container');
  if (headerContainer) {
    let headerRight = document.querySelector('.header-right');
    
    if (!headerRight) {
      headerRight = document.createElement('div');
      headerRight.className = 'header-right';
      
      // Move the nav menu into the header right container
      const navMenu = document.querySelector('nav');
      if (navMenu) {
        headerRight.appendChild(navMenu.cloneNode(true));
        navMenu.remove();
      }
      
      headerContainer.appendChild(headerRight);
    }
    
    // Create the theme toggle button if it doesn't exist
    let headerThemeToggle = document.querySelector('.header-theme-toggle');
    
    if (!headerThemeToggle) {
      headerThemeToggle = document.createElement('button');
      headerThemeToggle.className = 'header-theme-toggle';
      headerThemeToggle.setAttribute('aria-label', 'Toggle Dark Mode');
      
      // Create the icon
      const icon = document.createElement('i');
      icon.className = document.body.classList.contains('dark-mode') ? 
                      'fas fa-sun' : 'fas fa-moon';
      headerThemeToggle.appendChild(icon);
      
      // Add the toggle to the header right container
      headerRight.insertBefore(headerThemeToggle, headerRight.firstChild);
      
      // Add event listener to toggle dark mode
      headerThemeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Update the icon
        const toggleIcon = headerThemeToggle.querySelector('i');
        if (toggleIcon) {
          if (document.body.classList.contains('dark-mode')) {
            toggleIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
          } else {
            toggleIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
          }
        }
      });
    }
  }
  
  // Remove any duplicate theme toggles
  const themeToggles = document.querySelectorAll('.theme-toggle:not(.header-theme-toggle)');
  themeToggles.forEach(toggle => {
    toggle.remove();
  });
  
  // Remove any splash theme toggles
  const splashThemeToggles = document.querySelectorAll('.splash-theme-toggle');
  splashThemeToggles.forEach(toggle => {
    toggle.remove();
  });
});
