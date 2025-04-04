// Ineffable Training Club - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll behavior
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
            header.style.padding = '15px 0';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.8)';
            header.style.padding = '20px 0';
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        if (link.hash) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId.startsWith('#')) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerHeight = header.offsetHeight;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                        window.scrollTo({
                            top: targetPosition - headerHeight,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        }
    });
    
    // Access Code Modal
    const modal = document.getElementById('accessCodeModal');
    const requestCodeButtons = document.querySelectorAll('.request-code');
    const closeModal = document.querySelector('.close-modal');
    
    requestCodeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'flex';
        });
    });
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Access Code Form Submission
    const accessCodeForm = document.getElementById('accessCodeForm');
    
    if (accessCodeForm) {
        accessCodeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const codeInput = this.querySelector('input').value.trim();
            
            // Simulate code validation
            validateAccessCode(codeInput);
        });
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            alert('Thank you for your message. We will get back to you soon!');
            this.reset();
        });
    }
    
    // Animation on scroll
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.9) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on initial load
});

// Access Code Validation Function
function validateAccessCode(code) {
    // This would connect to a backend system in production
    // For demo purposes, we'll simulate validation
    
    // Example standard code format: TC-KNONAU-2025
    const standardCodePattern = /^TC-[A-Z]+-\d{4}$/;
    
    // Example elite code format: ELITE-TC-2025
    const eliteCodePattern = /^ELITE-TC-\d{4}$/;
    
    if (standardCodePattern.test(code)) {
        // Standard membership code
        alert('Valid standard membership code. Redirecting to registration...');
        // In production, this would redirect to registration page with standard membership selected
        window.location.href = '#membership';
    } else if (eliteCodePattern.test(code)) {
        // Elite membership code
        alert('Valid elite membership code. Redirecting to registration...');
        // In production, this would redirect to registration page with elite membership selected
        window.location.href = '#membership';
    } else {
        // Invalid code
        alert('Invalid access code. Please check and try again or contact us for assistance.');
    }
}

// Membership System Prototype Functions
const membershipSystem = {
    // Simulate user registration
    registerUser: function(userData, membershipType) {
        // In production, this would connect to a database
        console.log('User registered:', userData);
        console.log('Membership type:', membershipType);
        return {
            success: true,
            userId: 'user_' + Math.random().toString(36).substr(2, 9)
        };
    },
    
    // Simulate session booking
    bookSession: function(userId, sessionId, locationId) {
        // In production, this would check credit balance and availability
        console.log('Session booked for user:', userId);
        console.log('Session ID:', sessionId);
        console.log('Location:', locationId);
        return {
            success: true,
            remainingCredits: 9,
            bookingId: 'booking_' + Math.random().toString(36).substr(2, 9)
        };
    },
    
    // Simulate credit purchase
    purchaseCredits: function(userId, packageId) {
        const packages = {
            'standard_10': {
                credits: 10,
                price: 330,
                validity: '6 months'
            },
            'standard_20': {
                credits: 20,
                price: 630,
                validity: '12 months'
            },
            'elite_10': {
                credits: 10,
                price: 285,
                validity: '6 months'
            },
            'elite_20': {
                credits: 20,
                price: 540,
                validity: '12 months'
            }
        };
        
        const selectedPackage = packages[packageId];
        
        console.log('Credits purchased for user:', userId);
        console.log('Package:', selectedPackage);
        
        return {
            success: true,
            newCreditBalance: selectedPackage.credits,
            expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 6 months from now
        };
    },
    
    // Simulate referral code generation
    generateReferralCode: function(userId) {
        const code = 'TC-' + Math.random().toString(36).substr(2, 6).toUpperCase() + '-' + new Date().getFullYear();
        
        console.log('Referral code generated for user:', userId);
        console.log('Code:', code);
        
        return {
            success: true,
            code: code,
            expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 14 days from now
        };
    }
};
