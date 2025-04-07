/**
 * Exit Intent Popup Implementation
 * For Training Club Website
 * Created: April 7, 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create exit intent popup elements
    createExitIntentPopup();
    
    // Set up exit intent detection
    setupExitIntentDetection();
    
    // Set up countdown timer
    setupCountdownTimer();
    
    // Set up activity notifications
    setupActivityNotifications();
});

/**
 * Create and append exit intent popup to the DOM
 */
function createExitIntentPopup() {
    const popupHTML = `
        <div class="exit-intent-overlay">
            <div class="exit-intent-popup">
                <button class="close-button">&times;</button>
                <h2 class="title">Wait! Don't Miss This Opportunity</h2>
                <p class="subtitle">Join the elite outdoor fitness experience in Switzerland</p>
                <div class="offer">
                    <p class="offer-text">Get 50% OFF Your First Week</p>
                    <span class="offer-code">COMEBACK50</span>
                </div>
                <p class="timer">This offer expires in: <span id="countdown">15:00</span></p>
                <button class="action-button primary-action">Claim Your Discount Now</button>
                <p class="decline">No thanks, I don't want to get fit</p>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', popupHTML);
    
    // Add event listeners
    const overlay = document.querySelector('.exit-intent-overlay');
    const closeButton = document.querySelector('.exit-intent-popup .close-button');
    const actionButton = document.querySelector('.exit-intent-popup .action-button');
    const declineButton = document.querySelector('.exit-intent-popup .decline');
    
    closeButton.addEventListener('click', function() {
        overlay.classList.remove('active');
    });
    
    actionButton.addEventListener('click', function() {
        window.location.href = 'signup.html?promo=COMEBACK50';
    });
    
    declineButton.addEventListener('click', function() {
        overlay.classList.remove('active');
    });
}

/**
 * Set up exit intent detection
 */
function setupExitIntentDetection() {
    let showOnce = false;
    
    document.addEventListener('mouseleave', function(e) {
        // Only trigger when cursor moves out the top of the page
        if (e.clientY < 5 && !showOnce) {
            const overlay = document.querySelector('.exit-intent-overlay');
            overlay.classList.add('active');
            showOnce = true;
            
            // Reset after 30 minutes
            setTimeout(function() {
                showOnce = false;
            }, 30 * 60 * 1000);
        }
    });
}

/**
 * Set up countdown timer for the exit intent popup
 */
function setupCountdownTimer() {
    const countdownElement = document.getElementById('countdown');
    let minutes = 15;
    let seconds = 0;
    
    const countdownInterval = setInterval(function() {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(countdownInterval);
                countdownElement.textContent = "EXPIRED";
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        
        const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
        const displaySeconds = seconds < 10 ? '0' + seconds : seconds;
        
        countdownElement.textContent = displayMinutes + ':' + displaySeconds;
    }, 1000);
}

/**
 * Set up simulated activity notifications
 */
function setupActivityNotifications() {
    const activities = [
        { name: "Sarah", action: "just signed up for Elite membership", time: "2 minutes ago" },
        { name: "Michael", action: "booked a training session", time: "5 minutes ago" },
        { name: "Emma", action: "completed their 10th session", time: "12 minutes ago" },
        { name: "David", action: "upgraded to Premium membership", time: "15 minutes ago" },
        { name: "Jessica", action: "saved CHF 200 with annual plan", time: "20 minutes ago" },
        { name: "Thomas", action: "joined the morning bootcamp", time: "25 minutes ago" },
        { name: "Anna", action: "reached Gold status", time: "30 minutes ago" },
        { name: "Robert", action: "booked 3 sessions this week", time: "35 minutes ago" }
    ];
    
    // Create activity feed container
    const activityFeedHTML = `<div class="activity-feed"></div>`;
    document.body.insertAdjacentHTML('beforeend', activityFeedHTML);
    
    const activityFeed = document.querySelector('.activity-feed');
    
    // Show random activity notification every 30-60 seconds
    setInterval(function() {
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        
        const activityHTML = `
            <div class="activity-item">
                <span class="name">${randomActivity.name}</span>
                <span class="action">${randomActivity.action}</span>
                <div class="time">${randomActivity.time}</div>
            </div>
        `;
        
        activityFeed.insertAdjacentHTML('beforeend', activityHTML);
        
        // Remove activity after animation completes (10 seconds)
        const activityItems = document.querySelectorAll('.activity-item');
        if (activityItems.length > 3) {
            activityItems[0].remove();
        }
    }, Math.random() * 30000 + 30000); // Random time between 30-60 seconds
}

/**
 * Add limited spots indicators to class booking elements
 */
function addLimitedSpotsIndicators() {
    const classCards = document.querySelectorAll('.class-card');
    
    classCards.forEach(card => {
        const randomSpots = Math.floor(Math.random() * 5) + 1;
        const isCritical = randomSpots <= 2;
        
        const spotsHTML = `
            <div class="spots-remaining ${isCritical ? 'critical' : ''}">
                Only ${randomSpots} spot${randomSpots === 1 ? '' : 's'} left!
            </div>
        `;
        
        card.insertAdjacentHTML('beforeend', spotsHTML);
    });
}

/**
 * Initialize all conversion elements when DOM is loaded
 */
window.addEventListener('load', function() {
    // Add limited spots to class cards if they exist
    if (document.querySelectorAll('.class-card').length > 0) {
        addLimitedSpotsIndicators();
    }
    
    // Add urgency countdown to pricing section if it exists
    if (document.querySelector('.pricing-section')) {
        const pricingSection = document.querySelector('.pricing-section');
        
        const urgencyHTML = `
            <div class="urgent-countdown">
                <div class="title">LIMITED TIME OFFER</div>
                <div class="timer">
                    <span class="unit">00</span>:
                    <span class="unit">12</span>:
                    <span class="unit">45</span>
                </div>
                <div class="message">Current pricing available until timer expires!</div>
            </div>
        `;
        
        pricingSection.insertAdjacentHTML('afterbegin', urgencyHTML);
    }
});
