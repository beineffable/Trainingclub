// Theme Toggle JavaScript - Fixed Version
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved user preference
    checkUserThemePreference();
    
    // Initialize theme toggle functionality for all toggle buttons
    initThemeToggles();
    
    // Create rain elements for dark mode
    createRainElements();
});

// Check if user has a saved theme preference
function checkUserThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateAllThemeIcons(true);
    } else {
        document.body.classList.remove('dark-mode');
        updateAllThemeIcons(false);
    }
}

// Initialize theme toggle click functionality for all toggle buttons
function initThemeToggles() {
    // Get all theme toggle buttons on the page
    const themeToggles = document.querySelectorAll('.theme-toggle');
    
    // Add event listeners to each toggle button
    themeToggles.forEach(toggle => {
        // Toggle theme on click
        toggle.addEventListener('click', toggleTheme);
        
        // Keyboard accessibility
        toggle.addEventListener('keypress', function(e) {
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
    
    // Update all icons
    updateAllThemeIcons(isDarkMode);
    
    // Save user preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Handle animation changes
    handleAnimationChanges(isDarkMode);
}

// Update all theme toggle icons based on current mode
function updateAllThemeIcons(isDarkMode) {
    // Get all theme toggle icons
    const headerToggle = document.querySelector('#header-theme-toggle i');
    const splashToggle = document.querySelector('#splash-theme-toggle .theme-toggle i');
    
    if (isDarkMode) {
        // Change to moon/rain icon for dark mode
        if (headerToggle) headerToggle.className = 'fas fa-moon';
        if (splashToggle) splashToggle.className = 'fas fa-moon';
    } else {
        // Change to sun icon for light mode
        if (headerToggle) headerToggle.className = 'fas fa-sun';
        if (splashToggle) splashToggle.className = 'fas fa-sun';
    }
}

// Handle animation changes when switching modes
function handleAnimationChanges(isDarkMode) {
    const splashScreen = document.getElementById('splash-screen');
    
    // Only apply if splash screen is visible
    if (splashScreen && getComputedStyle(splashScreen).display !== 'none') {
        if (isDarkMode) {
            // Change background color for dark mode
            const skyBackground = splashScreen.querySelector('.sky-background');
            if (skyBackground) {
                skyBackground.style.backgroundColor = '#121212';
            }
            
            // Activate lightning for dark mode
            activateLightning();
        } else {
            // Restore background color for light mode
            const skyBackground = splashScreen.querySelector('.sky-background');
            if (skyBackground) {
                skyBackground.style.backgroundColor = 'var(--sky-blue)';
            }
        }
    }
}

// Create rain elements for dark mode
function createRainElements() {
    const splashScreen = document.getElementById('splash-screen');
    
    if (splashScreen) {
        // Check if rain container already exists
        if (!splashScreen.querySelector('.rain-container')) {
            // Create rain container
            const rainContainer = document.createElement('div');
            rainContainer.className = 'rain-container';
            
            // Create raindrops
            for (let i = 1; i <= 20; i++) {
                const raindrop = document.createElement('div');
                raindrop.className = 'raindrop';
                rainContainer.appendChild(raindrop);
            }
            
            // Add rain container to splash screen
            splashScreen.appendChild(rainContainer);
        }
        
        // Check if lightning element already exists
        if (!document.getElementById('lightning')) {
            // Create lightning element
            const lightning = document.createElement('div');
            lightning.className = 'lightning';
            lightning.id = 'lightning';
            
            // Add lightning to splash screen
            splashScreen.appendChild(lightning);
        }
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
