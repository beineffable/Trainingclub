/**
 * Contact Form Handler for Training Club
 * 
 * This script handles the contact form functionality on the Training Club website.
 * It provides form validation and submission handling.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get the contact form element
    const contactForm = document.getElementById('inquiry-form');
    if (!contactForm) return;
    
    // Form validation and submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const phoneField = document.getElementById('phone');
        const interestField = document.getElementById('interest');
        const messageField = document.getElementById('message');
        
        // Reset previous error messages
        clearErrors();
        
        // Validate form fields
        let isValid = true;
        
        // Name validation
        if (!nameField.value.trim()) {
            showError(nameField, 'Please enter your name');
            isValid = false;
        }
        
        // Email validation
        if (!emailField.value.trim()) {
            showError(emailField, 'Please enter your email address');
            isValid = false;
        } else if (!isValidEmail(emailField.value)) {
            showError(emailField, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Phone validation (optional field)
        if (phoneField.value.trim() && !isValidPhone(phoneField.value)) {
            showError(phoneField, 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Message validation
        if (!messageField.value.trim()) {
            showError(messageField, 'Please enter your message');
            isValid = false;
        }
        
        // If form is valid, submit it
        if (isValid) {
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (in a real application, this would be an AJAX request)
            setTimeout(function() {
                // Reset form
                contactForm.reset();
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success-message';
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                
                // Insert success message before the form
                contactForm.parentNode.insertBefore(successMessage, contactForm);
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    successMessage.style.opacity = '0';
                    setTimeout(function() {
                        successMessage.remove();
                    }, 500);
                }, 5000);
                
                // Reset button
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }, 1500);
        }
    });
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Helper function to validate phone number
    function isValidPhone(phone) {
        // Basic phone validation - allows various formats
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        return phoneRegex.test(phone);
    }
    
    // Helper function to show error message
    function showError(field, message) {
        // Create error element if it doesn't exist
        let errorElement = field.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.insertBefore(errorElement, field.nextSibling);
        }
        
        // Set error message
        errorElement.textContent = message;
        
        // Add error class to field
        field.classList.add('error');
        
        // Add focus event to remove error on focus
        field.addEventListener('focus', function onFocus() {
            field.classList.remove('error');
            if (errorElement) {
                errorElement.remove();
            }
            field.removeEventListener('focus', onFocus);
        });
    }
    
    // Helper function to clear all error messages
    function clearErrors() {
        const errorMessages = contactForm.querySelectorAll('.error-message');
        const errorFields = contactForm.querySelectorAll('.error');
        
        errorMessages.forEach(function(error) {
            error.remove();
        });
        
        errorFields.forEach(function(field) {
            field.classList.remove('error');
        });
    }
    
    // Add CSS for error and success messages if not already in stylesheet
    if (!document.getElementById('contact-form-styles')) {
        const styles = document.createElement('style');
        styles.id = 'contact-form-styles';
        styles.textContent = `
            .error-message {
                color: #e74c3c;
                font-size: 0.85em;
                margin-top: 5px;
                display: block;
            }
            
            .form-group input.error,
            .form-group textarea.error,
            .form-group select.error {
                border-color: #e74c3c;
            }
            
            .form-success-message {
                background-color: #2ecc71;
                color: white;
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 20px;
                opacity: 1;
                transition: opacity 0.5s ease;
            }
        `;
        document.head.appendChild(styles);
    }
});
