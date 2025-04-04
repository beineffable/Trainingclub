// Enhanced splash screen theme integration with rain animation
document.addEventListener('DOMContentLoaded', function() {
    // Get the splash screen theme toggle
    const splashThemeToggle = document.querySelector('.splash-theme-toggle .theme-toggle');
    
    // Make sure the splash theme toggle is immediately active
    if (splashThemeToggle) {
        // Ensure it's visible and interactive during the animation
        splashThemeToggle.style.opacity = '1';
        splashThemeToggle.style.pointerEvents = 'auto';
        
        // Add a specific class to indicate it's ready for interaction
        splashThemeToggle.classList.add('active');
        
        // Add click event to toggle between rain and clouds
        splashThemeToggle.addEventListener('click', function() {
            toggleRainAnimation();
        });
        
        // Log for debugging
        console.log('Splash screen theme toggle activated with rain animation support');
    }
    
    // Ensure the theme toggle works properly with the splash screen
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
        // Make sure the splash screen doesn't interfere with theme toggle
        splashScreen.addEventListener('click', function(e) {
            // Prevent clicks on the splash screen from affecting the theme toggle
            if (e.target.closest('.theme-toggle')) {
                e.stopPropagation();
            }
        });
    }
    
    // Function to toggle rain animation
    function toggleRainAnimation() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        // If switching to dark mode, ensure rain animation is visible
        if (isDarkMode) {
            initRainAnimation();
        } else {
            // If switching to light mode, ensure clouds are visible
            resetRainAnimation();
        }
    }
    
    // Initialize rain animation for dark mode
    function initRainAnimation() {
        const raindrops = document.querySelectorAll('.raindrop');
        const lightning = document.querySelector('.lightning');
        
        // Ensure all raindrops are properly animated
        raindrops.forEach(raindrop => {
            // Force a reflow to ensure animations are applied
            void raindrop.offsetWidth;
            raindrop.style.opacity = '1';
        });
        
        // Activate lightning
        if (lightning) {
            lightning.style.animation = 'lightning-flash 10s infinite';
        }
        
        console.log('Rain animation initialized for dark mode');
    }
    
    // Reset animation when switching to light mode
    function resetRainAnimation() {
        const raindrops = document.querySelectorAll('.raindrop');
        const lightning = document.querySelector('.lightning');
        
        // Reset raindrop animations
        raindrops.forEach(raindrop => {
            raindrop.style.opacity = '0';
        });
        
        // Deactivate lightning
        if (lightning) {
            lightning.style.animation = 'none';
        }
        
        console.log('Rain animation reset for light mode');
    }
    
    // Ensure theme is applied immediately during splash screen
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        // Apply dark mode immediately without waiting for animation
        document.body.classList.add('dark-mode');
        
        // If we're in dark mode, make sure the splash screen reflects this
        if (splashScreen) {
            splashScreen.classList.add('dark-mode-splash');
            // Initialize rain animation
            initRainAnimation();
        }
    }
});
