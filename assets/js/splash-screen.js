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
        hideSplashScreenImmediately();
    } else {
        // Show animation
        initSplashScreen();
    }
    
    // Initialize splash screen
    function initSplashScreen() {
        // Make sure splash screen is visible
        document.body.classList.add('splash-active');
        
        // Simplified event handling for iOS compatibility
        // Use a single click handler that works on both desktop and mobile
        skipButton.onclick = function(e) {
            e.stopPropagation(); // Prevent event bubbling
            forceHideSplashScreen();
            return false; // Prevent default and stop propagation
        };
        
        // Add a direct touchend handler without preventDefault
        skipButton.ontouchend = function(e) {
            e.stopPropagation(); // Prevent event bubbling
            forceHideSplashScreen();
            return false; // Prevent default and stop propagation
        };
        
        // Set timeout to automatically transition after animation completes
        setTimeout(forceHideSplashScreen, 5000); // 5 seconds
        
        // Store that user has seen the animation
        localStorage.setItem('hasSeenSplashScreen', 'true');
        localStorage.setItem('lastSeenSplashScreen', now.toString());
    }
    
    // Function to transition to main content with CSS
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
            splashScreen.style.display = 'none';
            mainContent.style.display = 'block';
        }, 1000); // Match this with the fadeOut animation duration
    }
    
    // Function to immediately hide splash screen without animation
    function hideSplashScreenImmediately() {
        splashScreen.style.display = 'none';
        document.body.classList.remove('splash-active');
        mainContent.style.display = 'block';
    }
    
    // Force hide with multiple approaches for maximum compatibility
    function forceHideSplashScreen() {
        try {
            // Try the CSS transition approach first
            hideSplashScreen();
            
            // As a backup, set a timeout to force-hide if the transition fails
            setTimeout(function() {
                // Force hide the splash screen directly
                splashScreen.style.display = 'none';
                document.body.classList.remove('splash-active');
                mainContent.style.display = 'block';
            }, 1500);
        } catch (e) {
            // If anything fails, use the direct approach
            hideSplashScreenImmediately();
        }
    }
});
