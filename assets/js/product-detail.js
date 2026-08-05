// Product Detail Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Get product ID from page variable (set in HTML)
    const CURRENT_PRODUCT_ID = typeof window.CURRENT_PRODUCT_ID !== 'undefined' 
        ? window.CURRENT_PRODUCT_ID 
        : 'btr-og-black-001'; // fallback
    
    // Load product data from products-data.js
    const productData = getProductById(CURRENT_PRODUCT_ID);
    
    if (!productData) {
        console.error('Product not found:', CURRENT_PRODUCT_ID);
        alert('Product not found. Please go back to shop.');
        return;
    }

    // Initialize components
    initQuantitySelector();
    initImageGallery();
    initAddToCart(productData);
});

// Quantity Selector
function initQuantitySelector() {
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');

    if (!quantityInput || !decreaseBtn || !increaseBtn) return;

    // Decrease quantity
    decreaseBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    // Increase quantity
    increaseBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue < 99) {
            quantityInput.value = currentValue + 1;
        }
    });

    // Prevent manual input of invalid values
    quantityInput.addEventListener('input', () => {
        let value = parseInt(quantityInput.value);
        if (isNaN(value) || value < 1) {
            quantityInput.value = 1;
        } else if (value > 99) {
            quantityInput.value = 99;
        }
    });
}

// Image Gallery
function initImageGallery() {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (!mainImage || thumbnails.length === 0) return;

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            thumbnail.classList.add('active');
            
            // Update main image
            const newImageSrc = thumbnail.getAttribute('data-image');
            mainImage.src = newImageSrc;
            
            // Add fade animation
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.opacity = '1';
            }, 100);
        });
    });
}

// Add to Cart Functionality
// Add to Cart Functionality
function initAddToCart(productData) {
    const addToCartBtn = document.getElementById('addToCartBtn');
    const quantityInput = document.getElementById('quantity');

    if (!addToCartBtn || !quantityInput) return;

    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);

        // Create product object to add to cart
        const product = {
            id: productData.id,
            title: productData.title,
            price: productData.price,
            image: productData.images[0],  // ← FIXED! Use first image from array
            quantity: quantity
        };

        // Add to cart using the global cart instance
        if (typeof cart !== 'undefined') {
            cart.addItem(product);
            
            // Add animation to button
            addToCartBtn.classList.add('added');
            setTimeout(() => {
                addToCartBtn.classList.remove('added');
            }, 300);

            // Open cart sidebar
            setTimeout(() => {
                cart.openCart();
            }, 500);

            // Reset quantity to 1
            quantityInput.value = 1;
        } else {
            console.error('Cart system not initialized');
            alert('Unable to add to cart. Please refresh the page.');
        }
    });

    // Handle Enter key press on quantity input
    quantityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addToCartBtn.click();
        }
    });
}

// Smooth scroll for page navigation
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Call smooth scroll
smoothScroll();

// Product Reviews / Rating System (Optional Enhancement)
function initProductRating() {
    const ratingStars = document.querySelectorAll('.rating-star');
    
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            console.log('User rated:', rating);
            // Here you can send rating to backend
        });
    });
}

// Product Image Zoom (Optional Enhancement)
function initImageZoom() {
    const mainImage = document.getElementById('mainImage');
    
    if (!mainImage) return;

    let isZoomed = false;

    mainImage.addEventListener('click', () => {
        if (!isZoomed) {
            mainImage.style.transform = 'scale(1.5)';
            mainImage.style.cursor = 'zoom-out';
            isZoomed = true;
        } else {
            mainImage.style.transform = 'scale(1)';
            mainImage.style.cursor = 'zoom-in';
            isZoomed = false;
        }
    });

    // Reset zoom when mouse leaves
    mainImage.parentElement.addEventListener('mouseleave', () => {
        if (isZoomed) {
            mainImage.style.transform = 'scale(1)';
            mainImage.style.cursor = 'zoom-in';
            isZoomed = false;
        }
    });
}

// Initialize image zoom
initImageZoom();

// Share Product Functionality (Optional Enhancement)
function shareProduct() {
    if (navigator.share) {
        navigator.share({
            title: 'Be The Reason OG - Black',
            text: 'Check out this awesome bracelet!',
            url: window.location.href
        }).then(() => {
            console.log('Successfully shared');
        }).catch((error) => {
            console.log('Error sharing:', error);
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard!');
        });
    }
}

// Wishlist functionality (Optional Enhancement)
function toggleWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('btr_wishlist') || '[]');
    
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        console.log('Removed from wishlist');
    } else {
        wishlist.push(productId);
        console.log('Added to wishlist');
    }
    
    localStorage.setItem('btr_wishlist', JSON.stringify(wishlist));
}

// Recently Viewed Products (Optional Enhancement)
function addToRecentlyViewed(productData) {
    let recentlyViewed = JSON.parse(localStorage.getItem('btr_recently_viewed') || '[]');
    
    // Remove if already exists
    recentlyViewed = recentlyViewed.filter(item => item.id !== productData.id);
    
    // Add to beginning
    recentlyViewed.unshift(productData);
    
    // Keep only last 10 items
    recentlyViewed = recentlyViewed.slice(0, 10);
    
    localStorage.setItem('btr_recently_viewed', JSON.stringify(recentlyViewed));
}

// Call this function to track product view
addToRecentlyViewed({
    id: 'btr-og-black-001',
    title: 'Be The Reason OG - Black',
    price: 19.99,
    image: 'assets/images/product-image/product-1-1.avif'
});

// Handle product options (size, color variations) - Optional
function handleProductOptions() {
    const colorOptions = document.querySelectorAll('.color-option');
    const sizeOptions = document.querySelectorAll('.size-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            console.log('Selected color:', this.getAttribute('data-color'));
        });
    });
    
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            sizeOptions.forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            console.log('Selected size:', this.getAttribute('data-size'));
        });
    });
}

// Sticky Add to Cart button on scroll (Mobile)
function initStickyAddToCart() {
    const addToCartBtn = document.getElementById('addToCartBtn');
    const productInfo = document.querySelector('.product-info');
    
    if (!addToCartBtn || !productInfo) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (window.innerWidth <= 768) {
                if (!entry.isIntersecting) {
                    addToCartBtn.style.position = '';
                    addToCartBtn.style.bottom = '';
                    addToCartBtn.style.left = '';
                    addToCartBtn.style.right = '';
                    addToCartBtn.style.zIndex = '';
                    addToCartBtn.style.boxShadow = '';
                } else {
                    addToCartBtn.style.position = '';
                    addToCartBtn.style.bottom = '';
                    addToCartBtn.style.left = '';
                    addToCartBtn.style.right = '';
                    addToCartBtn.style.zIndex = '';
                    addToCartBtn.style.boxShadow = '';
                }
            }
        });
    }, { threshold: 0.1 });

    observer.observe(addToCartBtn);
}

// Initialize sticky add to cart
initStickyAddToCart();

console.log('Product Detail Page Loaded Successfully');