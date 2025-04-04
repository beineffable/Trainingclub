// Enhanced Theme Toggle JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved user preference
    checkUserThemePreference();
    
    // Initialize theme toggle functionality for both splash screen and main site
    initThemeToggle();
});

// Check if user has a saved theme preference
function checkUserThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    } else {
        document.body.classList.remove('dark-mode');
        updateThemeIcon(false);
    }
}

// Initialize theme toggle click functionality
function initThemeToggle() {
    // Get all theme toggle elements
    const themeToggles = document.querySelectorAll('.theme-toggle');
    
    // Add event listeners to all theme toggles
    themeToggles.forEach(themeToggle => {
        // Toggle theme on click
        themeToggle.addEventListener('click', toggleTheme);
        
        // Keyboard accessibility
        themeToggle.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
        
        // Add tabindex for keyboard navigation if not already present
        if (!themeToggle.hasAttribute('tabindex')) {
            themeToggle.setAttribute('tabindex', '0');
        }
        
        // Add role for accessibility
        if (!themeToggle.hasAttribute('role')) {
            themeToggle.setAttribute('role', 'button');
        }
    });
}

// Toggle between light and dark themes
function toggleTheme() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    
    // Update icon
    updateThemeIcon(isDarkMode);
    
    // Save user preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Announce theme change for screen readers
    announceThemeChange(isDarkMode);
}

// Update the theme toggle icon based on current mode
function updateThemeIcon(isDarkMode) {
    // No need to manually change icons - CSS handles display based on dark-mode class
    // This simplifies the JavaScript and makes it more maintainable
}

// Announce theme change for screen readers
function announceThemeChange(isDarkMode) {
    // Create an announcement for screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.classList.add('sr-only');
    announcement.textContent = isDarkMode ? 'Dark mode enabled' : 'Light mode enabled';
    
    // Add to document, then remove after announcement is made
    document.body.appendChild(announcement);
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}
