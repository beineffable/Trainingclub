// Mobile Burger Menu JavaScript
// This file handles the functionality of the burger menu on mobile devices

document.addEventListener('DOMContentLoaded', function() {
  // Create burger menu elements
  createBurgerMenu();
  
  // Add event listeners
  const burgerIcon = document.querySelector('.burger-icon');
  if (burgerIcon) {
    burgerIcon.addEventListener('click', toggleBurgerMenu);
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const burgerMenu = document.querySelector('.burger-menu-container');
    const burgerDropdown = document.querySelector('.burger-menu-dropdown');
    
    if (burgerMenu && burgerDropdown && 
        !burgerMenu.contains(event.target) && 
        !burgerDropdown.contains(event.target)) {
      closeBurgerMenu();
    }
  });
});

// Function to create burger menu elements
function createBurgerMenu() {
  // Only create if we're in dark mode and on mobile
  if (window.innerWidth <= 768 && document.body.classList.contains('dark-mode')) {
    // Get the original navigation items
    const originalNav = document.querySelector('header nav') || 
                        document.querySelector('.header nav') || 
                        document.querySelector('#header nav') ||
                        document.querySelector('[class*="header"] nav');
    
    // Get the site title/logo
    const siteLogo = document.querySelector('.site-title') || 
                     document.querySelector('.logo') || 
                     document.querySelector('.site-logo') ||
                     document.querySelector('[class*="logo"]');
    
    // Create burger menu container
    const burgerMenuContainer = document.createElement('div');
    burgerMenuContainer.className = 'burger-menu-container';
    
    // Create site logo element
    const burgerSiteLogo = document.createElement('a');
    burgerSiteLogo.className = 'burger-site-logo';
    burgerSiteLogo.href = '/';
    burgerSiteLogo.textContent = siteLogo ? (siteLogo.textContent || 'Ineffable Training Club') : 'Ineffable Training Club';
    
    // Create burger icon
    const burgerIcon = document.createElement('div');
    burgerIcon.className = 'burger-icon';
    for (let i = 0; i < 4; i++) {
      const span = document.createElement('span');
      burgerIcon.appendChild(span);
    }
    
    // Create burger menu dropdown
    const burgerMenuDropdown = document.createElement('div');
    burgerMenuDropdown.className = 'burger-menu-dropdown';
    
    // Create navigation list
    const burgerMenuNav = document.createElement('ul');
    burgerMenuNav.className = 'burger-menu-nav';
    
    // Copy navigation items from original nav if available
    if (originalNav) {
      const originalLinks = originalNav.querySelectorAll('a');
      originalLinks.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.textContent;
        li.appendChild(a);
        burgerMenuNav.appendChild(li);
      });
    } else {
      // Default navigation items if original nav not found
      const defaultNavItems = [
        { text: 'Home', url: '/' },
        { text: 'Members Area', url: '/members-area.html' },
        { text: 'Classes', url: '/booking-classes.html' },
        { text: 'Memberships', url: '/booking-memberships.html' },
        { text: 'FAQ', url: '/faq.html' },
        { text: 'Gallery', url: '/gallery.html' }
      ];
      
      defaultNavItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.url;
        a.textContent = item.text;
        li.appendChild(a);
        burgerMenuNav.appendChild(li);
      });
    }
    
    // Assemble the burger menu
    burgerMenuDropdown.appendChild(burgerMenuNav);
    burgerMenuContainer.appendChild(burgerSiteLogo);
    burgerMenuContainer.appendChild(burgerIcon);
    
    // Add to the document
    document.body.appendChild(burgerMenuContainer);
    document.body.appendChild(burgerMenuDropdown);
  }
}

// Function to toggle burger menu
function toggleBurgerMenu() {
  const burgerIcon = document.querySelector('.burger-icon');
  const burgerMenuDropdown = document.querySelector('.burger-menu-dropdown');
  
  if (burgerIcon && burgerMenuDropdown) {
    burgerIcon.classList.toggle('open');
    burgerMenuDropdown.classList.toggle('open');
  }
}

// Function to close burger menu
function closeBurgerMenu() {
  const burgerIcon = document.querySelector('.burger-icon');
  const burgerMenuDropdown = document.querySelector('.burger-menu-dropdown');
  
  if (burgerIcon && burgerMenuDropdown) {
    burgerIcon.classList.remove('open');
    burgerMenuDropdown.classList.remove('open');
  }
}

// Handle window resize
window.addEventListener('resize', function() {
  // If window width is greater than 768px, close the burger menu
  if (window.innerWidth > 768) {
    closeBurgerMenu();
  }
});
