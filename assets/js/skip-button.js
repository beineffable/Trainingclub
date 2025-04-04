// Skip Button Functionality Fix
document.addEventListener('DOMContentLoaded', function() {
    // Get the skip button element
    const skipButton = document.getElementById('skip-button');
    
    if (skipButton) {
        // Add event listeners with improved handling
        skipButton.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default button behavior
            e.stopPropagation(); // Prevent event bubbling
            hideAndShowMainContent();
        });
        
        // Add touch event for mobile devices
        skipButton.addEventListener('touchend', function(e) {
            e.preventDefault(); // Prevent default touch behavior
            e.stopPropagation(); // Prevent event bubbling
            hideAndShowMainContent();
        });
    }
    
    // Function to hide splash screen and show main content
    function hideAndShowMainContent() {
        const splashScreen = document.getElementById('splash-screen');
        const mainContent = document.getElementById('main-content');
        
        if (splashScreen) {
            // Add exit animation class
            splashScreen.classList.add('splash-exit');
            
            // After animation completes, hide splash and show main content
            setTimeout(function() {
                document.body.classList.remove('splash-active');
                splashScreen.style.display = 'none';
                
                if (mainContent) {
                    mainContent.style.display = 'block';
                    mainContent.style.opacity = '1';
                }
            }, 1000); // Match this with the fadeOut animation duration
        }
    }
});
