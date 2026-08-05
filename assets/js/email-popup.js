// ========================================
// EMAIL POPUP MANAGER - BOOTSTRAP MODAL VERSION
// Handles popup display, form submission, and Google Sheets integration
// ========================================

class EmailPopupManager {
    constructor() {
        // Configuration
        this.config = {
            showDelay: 8000, // Show popup after 8 seconds
            googleSheetsURL: 'https://script.google.com/macros/s/AKfycbw24WrI5t-CmocRM64RzIbFxi9FxGCVz7QIZFQYWspJRovEZgnMY98Mrzy56XyvPv4/exec', // You'll add this later
            localStorageKeys: {
                subscribed: 'btr_email_subscribed',
                subscribedEmail: 'btr_subscriber_email',
                discountEligible: 'btr_first_purchase_discount',
                popupShown: 'btr_popup_shown'
            }
        };

        // Get Bootstrap modal instance
        this.modalElement = document.getElementById('emailPopupModal');
        this.modal = null;

        this.init();
    }

    init() {
        // Check if Bootstrap is loaded
        if (typeof bootstrap === 'undefined') {
            console.error('Bootstrap is not loaded! Please include Bootstrap 5 JS.');
            return;
        }

        // Initialize Bootstrap modal
        this.modal = new bootstrap.Modal(this.modalElement, {
            backdrop: 'static',
            keyboard: false
        });

        // Check if user has already subscribed
        if (this.hasSubscribed()) {
            console.log('User already subscribed');
            return;
        }

        // Check if popup was already shown in this session
        if (sessionStorage.getItem(this.config.localStorageKeys.popupShown)) {
            console.log('Popup already shown in this session');
            return;
        }

        // Show popup after delay
        setTimeout(() => {
            this.showPopup();
        }, this.config.showDelay);

        // Setup event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Form submission
        const form = document.getElementById('emailPopupForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }

        // Close button
        const closeBtn = document.getElementById('emailPopupClose');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closePopup();
            });
        }

        // Success close button
        const successCloseBtn = document.getElementById('emailPopupSuccessClose');
        if (successCloseBtn) {
            successCloseBtn.addEventListener('click', () => {
                this.closePopup();
                // Redirect to shop page
                window.location.href = 'all-products.html';
            });
        }

        // ESC key to close (if backdrop allows)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closePopup();
            }
        });
    }

    showPopup() {
        if (this.modal) {
            this.modal.show();

            // Mark popup as shown in this session
            sessionStorage.setItem(this.config.localStorageKeys.popupShown, 'true');

            // Track popup view
            this.trackEvent('Popup Shown');
        }
    }

    closePopup() {
        if (this.modal) {
            this.modal.hide();
        }
    }

    async handleFormSubmit() {
        const emailInput = document.getElementById('emailPopupEmail');
        const submitBtn = document.getElementById('emailPopupSubmit');

        const email = emailInput.value.trim();

        // Validate inputs
        if (!email) {
            this.showError('Please fill in all fields');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showError('Please enter a valid email address');
            return;
        }

        // Disable submit button and show loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Processing... <span class="email-popup-loading"></span>';

        try {
            // Save to Google Sheets
            await this.saveToGoogleSheets(email);

            // Save subscription data to localStorage
            this.saveSubscription(email);

            // Show success message
            this.showSuccess();

            // Track successful subscription
            this.trackEvent('Email Subscribed', { email });

        } catch (error) {
            console.error('Subscription error:', error);
            this.showError('Something went wrong. Please try again.');

            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Get My 20% Discount';
        }
    }

    async saveToGoogleSheets(email) {
        // If Google Sheets URL is not configured, save locally only
        if (!this.config.googleSheetsURL || this.config.googleSheetsURL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
            console.log('Google Sheets not configured. Saving locally only.');
            console.log('Email:', email);
            return;
        }

        const data = {
            email: email,
            subscribedDate: new Date().toISOString(),
            discountUsed: false,
            source: 'Website Popup'
        };

        const response = await fetch(this.config.googleSheetsURL, {
            method: 'POST',
            mode: 'no-cors', // Important for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        // Note: With no-cors, we can't read the response
        // We'll assume success if no error is thrown
        console.log('Data sent to Google Sheets');
    }

    saveSubscription(email) {
        // Save subscription status
        localStorage.setItem(this.config.localStorageKeys.subscribed, 'true');
        localStorage.setItem(this.config.localStorageKeys.subscribedEmail, email);

        // Enable first-time discount
        localStorage.setItem(this.config.localStorageKeys.discountEligible, 'true');

        console.log('Subscription saved locally. First-time discount enabled.');
    }

    hasSubscribed() {
        return localStorage.getItem(this.config.localStorageKeys.subscribed) === 'true';
    }

    showSuccess() {
        const form = document.querySelector('.email-popup-body > p:first-of-type');
        const formContainer = document.querySelector('.email-popup-form');
        const privacyText = document.querySelector('.email-popup-privacy');
        const successMessage = document.getElementById('emailPopupSuccess');

        // Hide form elements
        if (form) form.style.display = 'none';
        if (formContainer) formContainer.style.display = 'none';
        if (privacyText) privacyText.style.display = 'none';

        // Show success message
        if (successMessage) {
            successMessage.classList.add('active');
        }
    }

    showError(message) {
        alert(message); // You can replace with a better notification system
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    trackEvent(eventName, data = {}) {
        // Track events for analytics (Google Analytics, etc.)
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, data);
        }
        console.log('Event:', eventName, data);
    }

    // Static method to check if user is eligible for first-time discount
    static isEligibleForDiscount() {
        return localStorage.getItem('btr_first_purchase_discount') === 'true';
    }

    // Static method to get subscriber email
    static getSubscriberEmail() {
        return localStorage.getItem('btr_subscriber_email') || null;
    }

    // Static method to mark discount as used
    static markDiscountAsUsed() {
        localStorage.setItem('btr_first_purchase_discount', 'false');
        console.log('First-time discount marked as used');
    }
}

// ========================================
// INITIALIZE POPUP WHEN DOM IS READY
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on a page that should show the popup
    const currentPage = window.location.pathname;
    const excludedPages = ['/success.html', '/checkout.html'];

    const shouldShowPopup = !excludedPages.some(page => currentPage.includes(page));

    if (shouldShowPopup) {
        window.emailPopup = new EmailPopupManager();
    }
});

// ========================================
// EXPORT FOR USE IN OTHER SCRIPTS
// ========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = EmailPopupManager;
}