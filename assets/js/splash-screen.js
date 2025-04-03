// Splash Screen JavaScript - Always Show Animation
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const skipButton = document.getElementById('skip-button');
    
    // Check for Safari browser
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    // Check for iOS device
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Add Safari-specific class if needed
    if (isSafari || isIOS) {
        document.body.classList.add('safari-browser');
    }
    
    // Add reduced-motion class if needed
    if (prefersReducedMotion) {
        document.body.classList.add('reduced-motion');
    }
    
    // Always show animation on every page visit
    initSplashScreen();
    
    // Initialize splash screen
    function initSplashScreen() {
        // Make sure splash screen is visible
        document.body.classList.add('splash-active');
        
        // Apply cloud animations manually for Safari if needed
        if (isSafari || isIOS) {
            applyCloudAnimationsForSafari();
        }
        
        // Simplified event handling for iOS compatibility
        // Use a single click handler that works on both desktop and mobile
        skipButton.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            forceHideSplashScreen();
        });
        
        // Add a direct touchend handler without preventDefault
        skipButton.addEventListener('touchend', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            forceHideSplashScreen();
        });
        
        // Set timeout to automatically transition after animation completes
        setTimeout(forceHideSplashScreen, 5000); // 5 seconds
    }
    
    // Apply cloud animations manually for Safari
    function applyCloudAnimationsForSafari() {
        // This function ensures animations are properly applied in Safari
        const clouds = document.querySelectorAll('.cloud');
        clouds.forEach(cloud => {
            // Force a reflow to ensure animations are applied
            void cloud.offsetWidth;
            
            // Make sure clouds are visible
            setTimeout(() => {
                cloud.style.opacity = '1';
            }, parseInt(cloud.style.animationDelay || '0') * 1000);
        });
        
        // Make sure title is visible
        const titleText = document.querySelector('.title-text');
        if (titleText) {
            setTimeout(() => {
                titleText.style.opacity = '1';
            }, 1500); // Match the animation delay
        }
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
    
    // Add listener for reduced motion changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', function(e) {
        if (e.matches) {
            document.body.classList.add('reduced-motion');
        } else {
            document.body.classList.remove('reduced-motion');
        }
    });
});
