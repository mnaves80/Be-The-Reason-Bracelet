// Cart Management System with First-Time Discount Support and Firebase Integration

// Capture athlete referral code from URL (?ref=CODE) into localStorage
// so it survives navigation from the landing page to checkout.
(function captureAthleteCode() {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
        localStorage.setItem('btr_athlete_code', ref);
    }
})();

class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.currentUser = null;
        this.init();
        this.checkAuth();
    }

    init() {
        this.updateCartCount();
        this.updateCartUI();
        this.attachEventListeners();
    }

    // Check if user is logged in (optional - cart works without login)
    async checkAuth() {
        try {
            const { auth } = await import('./firebase-config.js');
            const { onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js");

            onAuthStateChanged(auth, (user) => {
                this.currentUser = user;
                console.log('User auth status:', user ? 'Logged in' : 'Guest');
            });
        } catch (e) {
            console.log('Firebase not loaded, continuing as guest');
        }
    }

    // Load cart from localStorage
    loadCart() {
        const savedCart = localStorage.getItem('btr_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('btr_cart', JSON.stringify(this.items));
    }

    // Add item to cart
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            this.items.push(product);
        }

        this.saveCart();
        this.updateCartCount();
        this.updateCartUI();
        this.showNotification('Item added to cart!');
    }

    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.updateCartUI();
    }

    // Update item quantity
    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);

        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveCart();
                this.updateCartUI();
                this.updateCartCount();
            }
        }
    }

    // Get cart total
    getTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    // Get total items count
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Check if user is eligible for first-time discount
    isEligibleForDiscount() {
        return localStorage.getItem('btr_first_purchase_discount') === 'true';
    }

    // Calculate discount amount
    calculateDiscount(total) {
        if (!this.isEligibleForDiscount()) {
            return 0;
        }
        return (total * 20) / 100; // 20% discount
    }

    // Get final total after discount
    getFinalTotal() {
        const subtotal = this.getTotal();
        const discount = this.calculateDiscount(subtotal);
        return subtotal - discount;
    }

    // Update cart count badge
    updateCartCount() {
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            const count = this.getTotalItems();
            cartCountElement.textContent = count;
            cartCountElement.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    // Update cart UI
    updateCartUI() {
        const cartItemsContainer = document.getElementById('cartItems');
        const subtotalElement = document.getElementById('subtotalAmount');

        if (!cartItemsContainer) return;

        // Clear existing items
        cartItemsContainer.innerHTML = '';

        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 2L7 6H3L6 20H18L21 6H17L15 2H9Z"/>
                        <circle cx="9" cy="20" r="1"/>
                        <circle cx="15" cy="20" r="1"/>
                    </svg>
                    <p>Your cart is empty</p>
                    <small>Add some items to get started</small>
                </div>
            `;
        } else {
            this.items.forEach(item => {
                const cartItem = this.createCartItemElement(item);
                cartItemsContainer.appendChild(cartItem);
            });
        }

        // Update subtotal and discount
        if (subtotalElement) {
            const subtotal = this.getTotal();
            subtotalElement.textContent = `$${subtotal.toFixed(2)}`;

            // Show discount if eligible
            this.updateDiscountDisplay(subtotal);
        }
    }

    // Update discount display in cart
    updateDiscountDisplay(subtotal) {
        const discountLine = document.getElementById('cart-discount-line');
        const discountAmount = document.getElementById('discountAmount');
        const subtotalElement = document.getElementById('subtotalAmount');

        if (!this.isEligibleForDiscount()) {
            // Hide discount line
            if (discountLine) discountLine.style.display = 'none';
            // Subtotal shows original price
            if (subtotalElement) {
                subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
            }
            return;
        }

        const discount = this.calculateDiscount(subtotal);
        const finalTotal = subtotal - discount;

        // Show and update discount line
        if (discountLine) {
            discountLine.style.display = 'flex';
            if (discountAmount) {
                discountAmount.textContent = `-$${discount.toFixed(2)}`;
            }
        }

        // Update subtotal to show FINAL PRICE (after discount)
        if (subtotalElement) {
            subtotalElement.textContent = `$${finalTotal.toFixed(2)}`;
        }
    }

    // Create cart item element
    createCartItemElement(item) {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="cart-qty-btn decrease" data-id="${item.id}">-</button>
                    <span class="cart-item-qty">${item.quantity}</span>
                    <button class="cart-qty-btn increase" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="cart-item-remove" data-id="${item.id}">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        `;

        // Attach event listeners
        const decreaseBtn = cartItem.querySelector('.decrease');
        const increaseBtn = cartItem.querySelector('.increase');
        const removeBtn = cartItem.querySelector('.cart-item-remove');

        decreaseBtn.addEventListener('click', () => {
            this.updateQuantity(item.id, item.quantity - 1);
        });

        increaseBtn.addEventListener('click', () => {
            this.updateQuantity(item.id, item.quantity + 1);
        });

        removeBtn.addEventListener('click', () => {
            this.removeItem(item.id);
        });

        return cartItem;
    }

    // Show notification
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: #e63946;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideInNotification 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutNotification 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Attach event listeners
    attachEventListeners() {
        // Cart toggle
        const cartToggle = document.getElementById('cartToggle');
        const cartSidebar = document.getElementById('cartSidebar');
        const cartClose = document.getElementById('cartClose');
        const cartOverlay = document.getElementById('cartOverlay');
        const continueShoppingBtn = document.getElementById('continueShoppingBtn');

        if (cartToggle) {
            cartToggle.addEventListener('click', () => {
                this.openCart();
            });
        }

        if (cartClose) {
            cartClose.addEventListener('click', () => {
                this.closeCart();
            });
        }

        if (cartOverlay) {
            cartOverlay.addEventListener('click', () => {
                this.closeCart();
            });
        }

        if (continueShoppingBtn) {
            continueShoppingBtn.addEventListener('click', () => {
                this.closeCart();
            });
        }

        // Checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                this.checkout();
            });
        }
    }

    // Open cart sidebar
    openCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar) {
            cartSidebar.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Close cart sidebar
    closeCart() {
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar) {
            cartSidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Checkout with discount support and Firebase integration
    checkout() {
        if (this.items.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // Get checkout button and show loading state
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.textContent = 'Processing...';
            checkoutBtn.disabled = true;
        }

        const subtotal = this.getTotal();
        const discount = this.calculateDiscount(subtotal);
        const finalTotal = subtotal - discount;

        // Store order info for success page
        localStorage.setItem('btr_order_subtotal', subtotal.toFixed(2));
        localStorage.setItem('btr_order_discount', discount.toFixed(2));
        localStorage.setItem('btr_order_total', finalTotal.toFixed(2));
        localStorage.setItem('btr_order_items', JSON.stringify(this.items));

        // Prepare items for Stripe
        const itemsForStripe = this.items.map(item => ({
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            description: `BE THE REASON ${item.title}`
        }));

        // Check for first-time discount
        const discountData = this.isEligibleForDiscount() ? {
            applyDiscount: true,
            discountPercentage: 20,
            subscriberEmail: localStorage.getItem('btr_subscriber_email')
        } : {
            applyDiscount: false
        };

        // Check for athlete referral code (captured earlier from ?ref= in the URL)
        const athleteCode = localStorage.getItem('btr_athlete_code') || null;

        // Prepare metadata for Stripe (includes user info if logged in)
        const metadata = {
            cartItems: JSON.stringify(this.items.map(i => ({ id: i.id, title: i.title, qty: i.quantity }))),
            discountApplied: discountData.applyDiscount.toString(),
            subtotal: subtotal.toFixed(2),
            discountAmount: discount.toFixed(2)
        };

        // Add user info if logged in
        if (this.currentUser) {
            metadata.userId = this.currentUser.uid;
            metadata.userEmail = this.currentUser.email;
            metadata.userName = this.currentUser.displayName || 'Guest';
        }

        // Send to backend to create Stripe checkout session
        fetch('https://btr-backend.vercel.app/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: itemsForStripe,
                discount: discountData,
                athleteCode: athleteCode,
                metadata: metadata
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Mark discount as pending if applied
                if (discountData.applyDiscount) {
                    localStorage.setItem('btr_discount_pending', 'true');
                }

                // Redirect to Stripe Checkout
                window.location.href = data.url;
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Something went wrong. Please try again.');

                // Reset button state
                if (checkoutBtn) {
                    checkoutBtn.textContent = 'Proceed to Checkout';
                    checkoutBtn.disabled = false;
                }
            });
    }

    // Clear cart
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartCount();
        this.updateCartUI();
    }
}

// Add notification animations to document
const cartStyle = document.createElement('style');
cartStyle.textContent = `
    @keyframes slideInNotification {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutNotification {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(cartStyle);

// Initialize cart when DOM is ready
let cart;
document.addEventListener('DOMContentLoaded', () => {
    cart = new ShoppingCart();
});
