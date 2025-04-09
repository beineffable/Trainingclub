/**
 * Testimonial Slider for Training Club
 * 
 * This script handles the testimonial slider functionality on the Training Club website.
 * It provides automatic and manual navigation through testimonial slides.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get all testimonial elements
    const testimonials = document.querySelectorAll('.testimonial');
    if (!testimonials.length) return;
    
    // Get or create navigation elements
    let navContainer = document.querySelector('.testimonial-nav');
    if (!navContainer) {
        navContainer = document.createElement('div');
        navContainer.className = 'testimonial-nav';
        testimonials[0].parentElement.appendChild(navContainer);
    }
    
    // Create navigation dots if they don't exist
    if (!navContainer.querySelector('.nav-dot')) {
        testimonials.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'nav-dot';
            dot.setAttribute('data-index', index);
            navContainer.appendChild(dot);
        });
    }
    
    const dots = document.querySelectorAll('.nav-dot');
    
    // Variables for slider functionality
    let currentIndex = 0;
    let interval;
    const autoPlayDelay = 5000; // 5 seconds between slides
    
    // Initialize the slider
    function initSlider() {
        // Show the first testimonial, hide others
        testimonials.forEach((testimonial, index) => {
            testimonial.style.display = index === 0 ? 'block' : 'none';
            testimonial.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
        });
        
        // Mark the first dot as active
        if (dots.length) {
            dots[0].classList.add('active');
        }
        
        // Start autoplay
        startAutoPlay();
        
        // Add click event listeners to dots
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showTestimonial(index);
                resetAutoPlay();
            });
        });
        
        // Add keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                showTestimonial(currentIndex - 1 < 0 ? testimonials.length - 1 : currentIndex - 1);
                resetAutoPlay();
            } else if (e.key === 'ArrowRight') {
                showTestimonial(currentIndex + 1 >= testimonials.length ? 0 : currentIndex + 1);
                resetAutoPlay();
            }
        });
        
        // Add swipe functionality for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        const testimonialContainer = testimonials[0].parentElement;
        
        testimonialContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        testimonialContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            if (touchEndX < touchStartX) {
                // Swipe left - next testimonial
                showTestimonial(currentIndex + 1 >= testimonials.length ? 0 : currentIndex + 1);
            } else if (touchEndX > touchStartX) {
                // Swipe right - previous testimonial
                showTestimonial(currentIndex - 1 < 0 ? testimonials.length - 1 : currentIndex - 1);
            }
            resetAutoPlay();
        }
    }
    
    // Show a specific testimonial
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = 'none';
            testimonial.setAttribute('aria-hidden', 'true');
            if (dots.length) {
                dots[i].classList.remove('active');
            }
        });
        
        // Show the selected testimonial
        testimonials[index].style.display = 'block';
        testimonials[index].setAttribute('aria-hidden', 'false');
        
        // Add fade-in animation
        testimonials[index].classList.add('fade-in');
        setTimeout(() => {
            testimonials[index].classList.remove('fade-in');
        }, 500);
        
        // Update active dot
        if (dots.length) {
            dots[index].classList.add('active');
        }
        
        // Update current index
        currentIndex = index;
    }
    
    // Start automatic slideshow
    function startAutoPlay() {
        interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(nextIndex);
        }, autoPlayDelay);
    }
    
    // Reset autoplay timer
    function resetAutoPlay() {
        clearInterval(interval);
        startAutoPlay();
    }
    
    // Pause autoplay when user hovers over testimonials
    const testimonialSection = testimonials[0].closest('section');
    if (testimonialSection) {
        testimonialSection.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });
        
        testimonialSection.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
    }
    
    // Initialize the slider
    initSlider();
});
