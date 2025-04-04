// Ensure theme toggle works during splash screen animation
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
        
        // Log for debugging
        console.log('Splash screen theme toggle activated');
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
    
    // Ensure theme is applied immediately during splash screen
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        // Apply dark mode immediately without waiting for animation
        document.body.classList.add('dark-mode');
        
        // If we're in dark mode, make sure the splash screen reflects this
        if (splashScreen) {
            splashScreen.classList.add('dark-mode-splash');
        }
    }
});
