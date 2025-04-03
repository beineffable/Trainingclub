// Splash Screen JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const skipButton = document.getElementById('skip-button');
    
    // Check if user has seen the animation recently
    const hasSeenAnimation = localStorage.getItem('hasSeenSplashScreen');
    const lastSeen = localStorage.getItem('lastSeenSplashScreen');
    const now = new Date().getTime();
    
    // Show splash screen only if user hasn't seen it in the last 24 hours
    if (hasSeenAnimation && lastSeen && (now - parseInt(lastSeen) < 24 * 60 * 60 * 1000)) {
        // Skip animation for returning visitors within 24 hours
        hideSplashScreen();
    } else {
        // Show animation
        initSplashScreen();
    }
    
    // Initialize splash screen
    function initSplashScreen() {
        // Make sure splash screen is visible
        document.body.classList.add('splash-active');
        
        // Add event listeners to skip button
        skipButton.addEventListener('click', hideSplashScreen);
        skipButton.addEventListener('keypress', function(e) {
            // Allow activation with Enter or Space key
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                hideSplashScreen();
            }
        });
        
        // Set timeout to automatically transition after animation completes
        setTimeout(hideSplashScreen, 5000); // 5 seconds
        
        // Store that user has seen the animation
        localStorage.setItem('hasSeenSplashScreen', 'true');
        localStorage.setItem('lastSeenSplashScreen', now.toString());
    }
    
    // Function to transition to main content
    function hideSplashScreen() {
        // Prevent multiple calls
        if (splashScreen.classList.contains('splash-exit')) {
            return;
        }
        
        // Add exit animation class
        splashScreen.classList.add('splash-exit');
        
        // After animation completes, hide splash and show main content
        setTimeout(function() {
            document.body.classList.remove('splash-active');
        }, 1000); // Match this with the fadeOut animation duration
    }
});
