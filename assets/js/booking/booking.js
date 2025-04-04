// booking.js - Main JavaScript file for the Training Club booking system

document.addEventListener('DOMContentLoaded', function() {
    // Initialize booking system components
    initializeNavigation();
    initializeAuthForms();
    initializeClassSchedule();
    initializeMembershipSelection();
    initializeProfileTabs();
    initializePaymentMethods();
});

// Navigation and UI functionality
function initializeNavigation() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

// Authentication forms handling
function initializeAuthForms() {
    // Login form handling
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Simulate login process
            if (email && password) {
                const loginButton = document.querySelector('#login-form button[type="submit"]');
                loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
                loginButton.disabled = true;
                
                // Simulate API call delay
                setTimeout(() => {
                    // Store login state in session storage
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('userEmail', email);
                    
                    // Redirect to profile page
                    window.location.href = 'booking-profile.html';
                }, 1500);
            }
        });
    }
    
    // Registration form handling
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        // Access code validation
        const accessCodeInput = document.getElementById('access-code');
        const validateCodeButton = document.getElementById('validate-code');
        const step1Form = document.getElementById('step-1-form');
        const step2Form = document.getElementById('step-2-form');
        
        if (validateCodeButton && step1Form && step2Form) {
            validateCodeButton.addEventListener('click', function() {
                const accessCode = accessCodeInput.value;
                
                if (accessCode) {
                    validateCodeButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Validating...';
                    validateCodeButton.disabled = true;
                    
                    // Simulate API call delay
                    setTimeout(() => {
                        // Move to step 2
                        step1Form.classList.remove('active');
                        step2Form.classList.add('active');
                        
                        // Update steps indicator
                        document.querySelector('.step[data-step="1"]').classList.add('completed');
                        document.querySelector('.step[data-step="2"]').classList.add('active');
                    }, 1500);
                }
            });
        }
        
        // Complete registration
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (name && email && password && confirmPassword && password === confirmPassword) {
                const registerButton = document.querySelector('#registration-form button[type="submit"]');
                registerButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';
                registerButton.disabled = true;
                
                // Simulate API call delay
                setTimeout(() => {
                    // Store login state in session storage
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('userEmail', email);
                    sessionStorage.setItem('userName', name);
                    
                    // Redirect to membership selection
                    window.location.href = 'booking-memberships.html';
                }, 1500);
            }
        });
    }
    
    // Check login status and update UI accordingly
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const userEmail = sessionStorage.getItem('userEmail');
    const userName = sessionStorage.getItem('userName');
    
    // Update UI based on login status
    const loginButtons = document.querySelectorAll('.login-button');
    const logoutButtons = document.querySelectorAll('.logout-button');
    const profileLinks = document.querySelectorAll('.profile-link');
    const userNameElements = document.querySelectorAll('.user-name');
    const userEmailElements = document.querySelectorAll('.user-email');
    
    if (isLoggedIn) {
        // Hide login buttons, show logout buttons
        loginButtons.forEach(button => button.style.display = 'none');
        logoutButtons.forEach(button => button.style.display = 'block');
        
        // Update profile links
        profileLinks.forEach(link => link.style.display = 'block');
        
        // Update user info displays
        userNameElements.forEach(element => {
            if (element) element.textContent = userName || 'Member';
        });
        
        userEmailElements.forEach(element => {
            if (element) element.textContent = userEmail || '';
        });
        
        // Handle logout
        logoutButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Clear session storage
                sessionStorage.removeItem('isLoggedIn');
                sessionStorage.removeItem('userEmail');
                sessionStorage.removeItem('userName');
                
                // Redirect to home page
                window.location.href = 'index.html';
            });
        });
    } else {
        // Show login buttons, hide logout buttons
        loginButtons.forEach(button => button.style.display = 'block');
        logoutButtons.forEach(button => button.style.display = 'none');
        
        // Hide profile links
        profileLinks.forEach(link => link.style.display = 'none');
    }
}

// Class schedule functionality
function initializeClassSchedule() {
    const scheduleContainer = document.querySelector('.schedule-container');
    if (!scheduleContainer) return;
    
    // Day tabs functionality
    const dayTabs = document.querySelectorAll('.day-tab');
    const classLists = document.querySelectorAll('.day-classes');
    
    dayTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const day = this.getAttribute('data-day');
            
            // Update active tab
            dayTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding class list
            classLists.forEach(list => {
                if (list.getAttribute('data-day') === day) {
                    list.style.display = 'block';
                } else {
                    list.style.display = 'none';
                }
            });
        });
    });
    
    // Location filter functionality
    const locationFilter = document.getElementById('location-filter');
    if (locationFilter) {
        locationFilter.addEventListener('change', function() {
            const location = this.value;
            const classCards = document.querySelectorAll('.class-card');
            
            classCards.forEach(card => {
                if (location === 'all' || card.getAttribute('data-location') === location) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Class booking functionality
    const bookButtons = document.querySelectorAll('.book-button');
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Check login status
            const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
            
            if (!isLoggedIn) {
                // Redirect to login page
                window.location.href = 'booking-login.html';
                return;
            }
            
            const classId = this.getAttribute('data-class-id');
            const className = this.getAttribute('data-class-name');
            
            // Simulate booking process
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';
            this.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                // Update button state
                this.innerHTML = '<i class="fas fa-check"></i> Booked';
                this.classList.add('booked');
                this.disabled = true;
                
                // Show confirmation message
                alert(`You have successfully booked ${className}. Check your profile for booking details.`);
            }, 1500);
        });
    });
}

// Membership selection functionality
function initializeMembershipSelection() {
    const membershipCards = document.querySelectorAll('.membership-card');
    const packageCards = document.querySelectorAll('.package-card');
    
    // Membership tier selection
    membershipCards.forEach(card => {
        const selectButton = card.querySelector('.select-button');
        if (selectButton) {
            selectButton.addEventListener('click', function() {
                const tierName = card.getAttribute('data-tier');
                
                // Store selected tier in session storage
                sessionStorage.setItem('selectedTier', tierName);
                
                // Highlight selected card
                membershipCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                
                // Scroll to packages section
                const packagesSection = document.querySelector('.package-options');
                if (packagesSection) {
                    packagesSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    });
    
    // Package selection
    packageCards.forEach(card => {
        const selectButton = card.querySelector('.select-button');
        if (selectButton) {
            selectButton.addEventListener('click', function() {
                const packageName = card.getAttribute('data-package');
                const packagePrice = card.getAttribute('data-price');
                
                // Store selected package in session storage
                sessionStorage.setItem('selectedPackage', packageName);
                sessionStorage.setItem('packagePrice', packagePrice);
                
                // Redirect to checkout
                window.location.href = 'booking-checkout.html';
            });
        }
    });
}

// Profile tabs functionality
function initializeProfileTabs() {
    const profileContainer = document.querySelector('.profile-container');
    if (!profileContainer) return;
    
    // Tab navigation
    const tabLinks = document.querySelectorAll('.profile-menu-link');
    const tabContents = document.querySelectorAll('.profile-tab');
    
    // Check for URL parameter to activate specific tab
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab link
            tabLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab content
            tabContents.forEach(tab => {
                if (tab.id === tabId) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });
        });
        
        // Activate tab from URL parameter if present
        if (tabParam && link.getAttribute('data-tab') === tabParam) {
            link.click();
        }
    });
    
    // Initialize first tab if no parameter
    if (!tabParam && tabLinks.length > 0) {
        tabLinks[0].click();
    }
    
    // Holiday pause functionality
    const pauseForm = document.getElementById('pause-form');
    if (pauseForm) {
        pauseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const startDate = document.getElementById('pause-start').value;
            const endDate = document.getElementById('pause-end').value;
            
            if (startDate && endDate) {
                const pauseButton = pauseForm.querySelector('button[type="submit"]');
                pauseButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                pauseButton.disabled = true;
                
                // Simulate API call delay
                setTimeout(() => {
                    // Update UI to show paused status
                    document.querySelector('.pause-status').innerHTML = `
                        <div class="alert alert-success">
                            <i class="fas fa-check-circle"></i>
                            Your membership is paused from ${startDate} to ${endDate}.
                        </div>
                    `;
                    
                    pauseForm.reset();
                    pauseButton.innerHTML = 'Pause Membership';
                    pauseButton.disabled = false;
                }, 1500);
            }
        });
    }
    
    // Referral code copy functionality
    const copyButton = document.querySelector('.copy-button');
    const referralCode = document.querySelector('.code-value span');
    
    if (copyButton && referralCode) {
        copyButton.addEventListener('click', function() {
            // Create temporary textarea to copy text
            const textarea = document.createElement('textarea');
            textarea.value = referralCode.textContent;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
            // Update button text temporarily
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Copied!';
            
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });
    }
}

// Payment methods functionality
function initializePaymentMethods() {
    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentForms = document.querySelectorAll('.payment-form');
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            // Update active payment method
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding payment form
            const methodId = this.getAttribute('data-method');
            paymentForms.forEach(form => {
                if (form.id === `${methodId}-payment-form`) {
                    form.classList.add('active');
                } else {
                    form.classList.remove('active');
                }
            });
        });
    });
    
    // Complete payment button
    const completePaymentButton = document.getElementById('complete-payment');
    if (completePaymentButton) {
        completePaymentButton.addEventListener('click', function() {
            // Get active payment method
            const activeMethod = document.querySelector('.payment-method.active');
            if (!activeMethod) return;
            
            const methodId = activeMethod.getAttribute('data-method');
            
            // Simulate payment processing
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            this.disabled = true;
            
            // Redirect after simulated processing time
            setTimeout(() => {
                window.location.href = 'booking-payment-success.html';
            }, 2000);
        });
    }
    
    // Format credit card input
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            let formattedValue = '';
            
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            
            e.target.value = formattedValue;
        });
    }
    
    // Format expiry date input
    const expiryDateInput = document.getElementById('expiry-date');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            let formattedValue = '';
            
            if (value.length > 0) {
                formattedValue = value.substring(0, 2);
                if (value.length > 2) {
                    formattedValue += '/' + value.substring(2, 4);
                }
            }
            
            e.target.value = formattedValue;
        });
    }
}

// Helper functions
function formatCurrency(amount) {
    return 'CHF ' + parseFloat(amount).toFixed(2);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-CH', options);
}

// Initialize charts for statistics page
function initializeCharts() {
    // Weekly activity chart
    const weeklyChart = document.querySelector('.weekly-chart');
    if (weeklyChart) {
        const bars = weeklyChart.querySelectorAll('.chart-bar');
        
        // Sample data - would come from API in real implementation
        const activityData = [2, 0, 1, 3, 0, 2, 1];
        
        bars.forEach((bar, index) => {
            const height = activityData[index] * 40; // Scale factor
            bar.style.height = `${height}px`;
            
            const valueElement = bar.querySelector('.bar-value');
            if (valueElement) {
                valueElement.textContent = activityData[index];
            }
            
            if (activityData[index] > 0) {
                bar.classList.add('active');
            }
        });
    }
}

// Initialize leaderboard functionality
function initializeLeaderboard() {
    const leaderboardToggle = document.querySelector('.leaderboard-toggle input');
    if (leaderboardToggle) {
        leaderboardToggle.addEventListener('change', function() {
            const leaderboardSection = document.querySelector('.stats-leaderboard');
            
            if (this.checked) {
                leaderboardSection.classList.add('opted-in');
                // In a real implementation, this would call an API to update user preferences
            } else {
                leaderboardSection.classList.remove('opted-in');
            }
        });
    }
}
