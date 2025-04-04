// Theme Toggle JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved user preference
    checkUserThemePreference();
    
    // Initialize theme toggle functionality
    initThemeToggle();
    
    // Create rain elements for dark mode
    createRainElements();
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
    });
}

// Toggle between light and dark themes
function toggleTheme() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    
    // Update icon
    updateThemeIcon(isDarkMode);
    
    // Save user preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Handle animation changes
    handleAnimationChanges(isDarkMode);
}

// Update the theme toggle icon based on current mode
function updateThemeIcon(isDarkMode) {
    // Update all theme toggle icons
    const icons = document.querySelectorAll('.theme-toggle i');
    
    icons.forEach(icon => {
        if (isDarkMode) {
            // Change to moon icon for dark mode
            if (icon.classList.contains('fa-sun')) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        } else {
            // Change to sun icon for light mode
            if (icon.classList.contains('fa-moon')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }
    });
}

// Handle animation changes when switching modes
function handleAnimationChanges(isDarkMode) {
    const splashScreen = document.getElementById('splash-screen');
    
    // Only apply if splash screen is visible
    if (splashScreen && getComputedStyle(splashScreen).display !== 'none') {
        if (isDarkMode) {
            // Activate lightning for dark mode
            activateLightning();
        }
    }
}

// Create rain elements for dark mode
function createRainElements() {
    const splashScreen = document.getElementById('splash-screen');
    
    if (splashScreen) {
        // Create rain container
        const rainContainer = document.createElement('div');
        rainContainer.className = 'rain-container';
        
        // Create raindrops
        for (let i = 1; i <= 20; i++) {
            const raindrop = document.createElement('div');
            raindrop.className = 'raindrop';
            rainContainer.appendChild(raindrop);
        }
        
        // Create lightning element
        const lightning = document.createElement('div');
        lightning.className = 'lightning';
        lightning.id = 'lightning';
        
        // Add rain and lightning to splash screen
        splashScreen.appendChild(rainContainer);
        splashScreen.appendChild(lightning);
    }
}

// Activate lightning effect randomly
function activateLightning() {
    const lightning = document.getElementById('lightning');
    
    if (lightning) {
        // Random lightning flashes
        const flashLightning = () => {
            lightning.style.animation = 'lightning-flash 5s';
            
            // Reset animation after it completes
            setTimeout(() => {
                lightning.style.animation = 'none';
                
                // Schedule next lightning after random delay
                if (document.body.classList.contains('dark-mode')) {
                    setTimeout(flashLightning, Math.random() * 5000 + 2000);
                }
            }, 5000);
        };
        
        // Start lightning effect
        flashLightning();
    }
}
