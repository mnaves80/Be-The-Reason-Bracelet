// ========================================
// DISCOUNT MANAGER - BTR Website
// Automatically applies 20% first-time discount at checkout
// ========================================

class DiscountManager {
    constructor() {
        this.DISCOUNT_PERCENTAGE = 20; // 20% discount
        this.init();
    }

    init() {
        console.log('Discount Manager initialized');
        
        // Check discount eligibility on page load
        this.checkAndDisplayDiscount();
    }

    /**
     * Check if user is eligible for first-time discount
     */
    isEligibleForDiscount() {
        const eligible = localStorage.getItem('btr_first_purchase_discount') === 'true';
        console.log('Discount eligibility:', eligible);
        return eligible;
    }

    /**
     * Get subscriber email
     */
    getSubscriberEmail() {
        return localStorage.getItem('btr_subscriber_email') || null;
    }

    /**
     * Calculate discounted price
     */
    calculateDiscountedPrice(originalPrice) {
        const discount = (originalPrice * this.DISCOUNT_PERCENTAGE) / 100;
        const discountedPrice = originalPrice - discount;
        return {
            originalPrice: originalPrice,
            discount: discount,
            discountedPrice: discountedPrice,
            discountPercentage: this.DISCOUNT_PERCENTAGE
        };
    }

    /**
     * Calculate cart total with discount
     */
    calculateCartDiscount(cartTotal) {
        if (!this.isEligibleForDiscount()) {
            return {
                originalTotal: cartTotal,
                discount: 0,
                finalTotal: cartTotal,
                discountApplied: false
            };
        }

        const discountAmount = (cartTotal * this.DISCOUNT_PERCENTAGE) / 100;
        const finalTotal = cartTotal - discountAmount;

        return {
            originalTotal: cartTotal,
            discount: discountAmount,
            finalTotal: finalTotal,
            discountApplied: true,
            discountPercentage: this.DISCOUNT_PERCENTAGE
        };
    }

    /**
     * Display discount badge in cart
     */
    checkAndDisplayDiscount() {
        if (!this.isEligibleForDiscount()) {
            return;
        }

        // Add discount badge to cart
        this.addDiscountBadge();

        // Update cart UI to show discount
        this.updateCartWithDiscount();
    }

    /**
     * Add discount badge to cart header
     */


    /**
     * Update cart display to show discount
     */
    updateCartWithDiscount() {
        // This will be called when cart is updated
        // The actual discount calculation will happen in the cart.js
        console.log('Cart updated with discount eligibility');
    }

    /**
     * Mark discount as used after successful purchase
     */
    markDiscountAsUsed() {
        localStorage.setItem('btr_first_purchase_discount', 'false');
        localStorage.setItem('btr_discount_used_date', new Date().toISOString());
        console.log('✅ First-time discount marked as used');
    }

    /**
     * Get discount data for Stripe checkout
     */
    getDiscountForCheckout(cartTotal) {
        if (!this.isEligibleForDiscount()) {
            return null;
        }

        return {
            type: 'percentage',
            value: this.DISCOUNT_PERCENTAGE,
            amount: (cartTotal * this.DISCOUNT_PERCENTAGE) / 100,
            email: this.getSubscriberEmail(),
            eligible: true
        };
    }

    /**
     * Display discount in cart summary
     */
    displayDiscountInCartSummary(cartTotal) {
        if (!this.isEligibleForDiscount()) {
            // Remove discount line if it exists
            const discountLine = document.getElementById('cartDiscountLine');
            if (discountLine) {
                discountLine.remove();
            }
            return cartTotal;
        }

        const discount = this.calculateCartDiscount(cartTotal);

        // Find cart summary section
        const cartSummary = document.querySelector('.cart-summary') || document.querySelector('.cart-footer');
        if (!cartSummary) {
            console.warn('Cart summary not found');
            return cartTotal;
        }

        // Check if discount line already exists
        let discountLine = document.getElementById('cartDiscountLine');
        
        if (!discountLine) {
            // Create discount line
            discountLine = document.createElement('div');
            discountLine.id = 'cartDiscountLine';
            discountLine.className = 'cart-discount-line';
            discountLine.style.cssText = `
                display: flex;
                justify-content: space-between;
                padding: 12px 0;
                color: #10b981;
                font-weight: 600;
                font-size: 15px;
                border-top: 1px dashed #e0e0e0;
                margin-top: 10px;
            `;

            // Insert before total line
            const totalLine = cartSummary.querySelector('.cart-total') || cartSummary.lastElementChild;
            if (totalLine) {
                totalLine.parentNode.insertBefore(discountLine, totalLine);
            } else {
                cartSummary.appendChild(discountLine);
            }
        }

        // Update discount line content
        discountLine.innerHTML = `
            <span>🎉 First-Time Discount (${discount.discountPercentage}%)</span>
            <span>-$${discount.discount.toFixed(2)}</span>
        `;

        return discount.finalTotal;
    }

    /**
     * Show discount notification
     */
    showDiscountNotification() {
        if (!this.isEligibleForDiscount()) {
            return;
        }

        const notification = document.createElement('div');
        notification.className = 'discount-notification';
        notification.innerHTML = `
            <div class="discount-notification-content">
                <span class="discount-notification-icon">🎉</span>
                <div class="discount-notification-text">
                    <strong>Welcome Back!</strong>
                    <p>Your 20% first-time discount is ready to use</p>
                </div>
            </div>
        `;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 9999;
            max-width: 300px;
            animation: slideInFromRight 0.5s ease;
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutToRight 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }
}

// ========================================
// INITIALIZE DISCOUNT MANAGER
// ========================================

let discountManager;

document.addEventListener('DOMContentLoaded', () => {
    discountManager = new DiscountManager();
    window.discountManager = discountManager; // Make globally accessible
});

// ========================================
// ADD CSS ANIMATIONS
// ========================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInFromRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutToRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .discount-notification-content {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .discount-notification-icon {
        font-size: 32px;
    }

    .discount-notification-text strong {
        display: block;
        font-size: 16px;
        margin-bottom: 5px;
    }

    .discount-notification-text p {
        margin: 0;
        font-size: 14px;
        opacity: 0.95;
    }
`;
document.head.appendChild(style);

// ========================================
// EXPORT FOR USE IN OTHER SCRIPTS
// ========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = DiscountManager;
}