// BE THE REASON - Products Database
// All product information in one place

const PRODUCTS = [
    {
        id: 'btr-og-black-001',
        title: 'Team Colors - White, Maroon and Yellow',
        price: 19.99,
        shortDescription: 'Colors That Speak. Purpose That Moves.',
        fullDescription: 'This set isn’t just about style — it’s about identity. Maroon, white, and yellow represent more than a team; they represent the mission. To show up, lead, and be the reason. Each color stands for a mindset: maroon for strength, white for clarity, and yellow for energy.',
        sku: 'BTR-OG-BLK-001',
        category: 'Bracelets',
        tags: ['Team Colors', 'Maroon', 'White', 'Yellow', 'Motivation'],
        images: [
            'assets/images/product-image/product-1-1.avif',
            'assets/images/product-image/product-1-2.jpg',
            'assets/images/product-image/product-1-3.jpg',
            'assets/images/product-image/product-1-4.avif'
        ],
        features: [
            'Signature BTR colorway',
            'Clean, minimalist design',
            'Built for teams or individuals',
            'Size: 200mm x 25mm x 25mm'
        ],
        inStock: true,
        detailPage: 'product-detail-1.html'
    },
    {
        id: 'btr-maroon-002',
        title: 'Oceanfire - Be The Reason Bracelet',
        price: 19.99,
        shortDescription: 'Discover the Oceanfire Bracelet.',
        fullDescription: 'The Oceanfire Bracelet features the inspiring message “Be The Reason,” reminding wearers to create positive impact. Designed for everyday wear, it serves as a symbol of self-determination and purpose.',
        sku: 'BTR-TEAM-MAR-002',
        category: 'Bracelets',
        tags: ['Oceanfire', 'Motivation', 'Daily Wear'],
        images: [
            'assets/images/product-image/product-2-1.png',
            'assets/images/product-image/product-2-2.png',
            'assets/images/product-image/product-2-3.png',
            'assets/images/product-image/product-2-4.png'
        ],
        features: [
            'Simple yet impactful design',
            'Motivational “Be The Reason” message',
            'Great for gifting',
            'Size: 180mm x 25mm x 25mm'
        ],
        inStock: true,
        detailPage: 'product-detail-2.html'
    },
    {
        id: 'btr-blue-003',
        title: 'Pink Flower Bracelet – Be The Reason',
        price: 19.99,
        shortDescription: 'Elevate Your Style.',
        fullDescription: 'The Pink Flower Bracelet symbolizes grace, positivity, and purpose. Featuring a charming pink flower design, it’s made to express individuality and remind you to be the reason behind someone’s smile.',
        sku: 'BTR-TEAM-BLU-003',
        category: 'Bracelets',
        tags: ['Pink', 'Flower', 'Positive', 'Style'],
        images: [
            'assets/images/product-image/product-3-1.png',
            'assets/images/product-image/product-3-2.png',
            'assets/images/product-image/product-3-3.png',
            'assets/images/product-image/product-3-4.png'
        ],
        features: [
            'Elegant pink flower design',
            'Versatile for casual or formal wear',
            'Symbol of positivity',
            'Size: 180mm x 25mm x 25mm'
        ],
        inStock: true,
        detailPage: 'product-detail-3.html'
    },
    {
        id: 'btr-red-004',
        title: 'Team Colors - Honolulu Blue, Silver and White',
        price: 19.99,
        shortDescription: 'Be The Reason Motivational Wristband.',
        fullDescription: 'This bracelet blends Honolulu Blue, Silver, and White to represent unity, pride, and positivity. Designed to inspire individuals and teams to lead with purpose.',
        sku: 'BTR-TEAM-RED-004',
        category: 'Bracelets',
        tags: ['Team Colors', 'Honolulu Blue', 'Silver', 'White'],
        images: [
            'assets/images/product-image/product-4-1.jpg',
            'assets/images/product-image/product-4-2.jpg',
            'assets/images/product-image/product-4-3.jpg',
            'assets/images/product-image/product-4-4.jpg'
        ],
        features: [
            'Bold team-inspired colors',
            '“Be The Reason” motivational message',
            'Ideal for teams and squads',
            'Size: 200mm x 25mm x 25mm'
        ],
        inStock: true,
        detailPage: 'product-detail-4.html'
    },
    {
        id: 'btr-green-005',
        title: 'BTR OG Red Bottom Bracelet',
        price: 19.99,
        shortDescription: 'Be the reason. Every day.',
        fullDescription: 'The BTR OG Red Bottom bracelet features a bold black exterior with a signature red interior, symbolizing grit, discipline, and leadership. Built for those who move with intention.',
        sku: 'BTR-TEAM-GRN-005',
        category: 'Bracelets',
        tags: ['Original', 'Red Bottom', 'Leadership'],
        images: [
            'assets/images/product-image/product-5-1.png',
            'assets/images/product-image/product-5-2.png',
            'assets/images/product-image/product-5-3.png',
            'assets/images/product-image/product-5-4.png'
        ],
        features: [
            'Premium woven fabric',
            'Signature Be The Reason stitched tag',
            'Lightweight and durable',
            'Size: 180mm'
        ],
        inStock: true,
        detailPage: 'product-detail-5.html'
    },
    {
        id: 'btr-purple-006',
        title: 'Team Colors – Black, Blue & White Bracelet',
        price: 19.99,
        shortDescription: 'Be the reason. Lead the team.',
        fullDescription: 'This bracelet symbolizes unity and leadership, featuring a black interior with the “Be The Reason” message and a blue-and-white team-inspired exterior.',
        sku: 'BTR-TEAM-PUR-006',
        category: 'Bracelets',
        tags: ['Team Colors', 'Black', 'Blue', 'White'],
        images: [
            'assets/images/product-image/product-6-1.png',
            'assets/images/product-image/product-6-2.png',
            'assets/images/product-image/product-6-3.png',
            'assets/images/product-image/product-6-4.png'
        ],
        features: [
            'Team-inspired color design',
            'Premium woven fabric',
            'Comfortable everyday wear',
            'Size: 180mm'
        ],
        inStock: true,
        detailPage: 'product-detail-6.html'
    },
    {
        id: 'btr-orange-007',
        title: 'Team Colors – Brown, Yellow & White Bracelet',
        price: 19.99,
        shortDescription: 'Be the reason. Set the standard.',
        fullDescription: 'Featuring a bold brown interior and yellow-and-white exterior, this bracelet represents grit, pride, and leadership for those who lead by example.',
        sku: 'BTR-TEAM-ORG-007',
        category: 'Bracelets',
        tags: ['Team Colors', 'Brown', 'Yellow', 'White'],
        images: [
            'assets/images/product-image/product-7-1.png',
            'assets/images/product-image/product-7-2.png',
            'assets/images/product-image/product-7-3.png',
            'assets/images/product-image/product-7-4.png'
        ],
        features: [
            'Premium quality silicone material',
            'Team color design',
            'Adjustable size fits most wrists',
            'Durable and water-resistant'
        ],
        inStock: true,
        detailPage: 'product-detail-7.html'
    },
    {
        id: 'btr-polar-snowflake-008',
        title: 'Polar Bears Snowflake Bracelet',
        price: 19.99,
        shortDescription: 'Wear the message. Support the mission.',
        fullDescription: 'The Polar Bears Snowflake Bracelet is more than a way to rep the team — it’s a way to Be The Reason and give back to the next generation. Designed in the signature Polar Bears ice blue, it features repeating BTR lettering and snowflake details inspired by the Kalamazoo Polar Bears, with the bold BE THE REASON message on the reverse side. For every bracelet sold, $5 is donated directly to the Kalamazoo Polar Bears nonprofit organization to help support its mission, athletes, programs, and continued investment in the youth of our community.',
        sku: 'BTR-POLAR-008',
        category: 'Bracelets',
        tags: ['Polar Bears', 'Snowflake', 'Charity', 'Kalamazoo'],
        images: [
            'assets/images/product-image/product-8-1.png',
            'assets/images/product-image/product-8-2.png',
            'assets/images/product-image/product-8-3.png',
            'assets/images/product-image/product-8-4.png'
        ],
        features: [
            'Ice-blue Polar Bears colorway',
            'BTR and snowflake design',
            'Reversible Be The Reason design',
            'Comfortable woven stretch material',
            '$5 donated to the Kalamazoo Polar Bears nonprofit with every bracelet sold'
        ],
        inStock: true,
        detailPage: 'product-detail-8.html'
    },
    {
        id: 'btr-braylen-naves-009',
        title: 'Braylen Naves x BTR Bracelet',
        price: 19.99,
        shortDescription: 'Faith. Family. Football.',
        fullDescription: 'A signature collaboration built around faith, family, football, and purpose. Designed specifically for Braylen, this bracelet combines his personal football identity with the Be The Reason mindset — featuring a bold maroon and gold colorway, custom Braylen Naves detailing, football-inspired graphics, his #17, and the signature BTR branding. The reverse side carries the BE THE REASON message, a daily reminder that greatness is about having a reason behind the work and representing something bigger than yourself.',
        sku: 'BTR-BRAYLEN-009',
        category: 'Bracelets',
        tags: ['Athlete Collab', 'Braylen Naves', 'Football', 'Faith Family Football'],
        images: [
            'assets/images/product-image/product-9-1.png',
            'assets/images/product-image/product-9-2.png',
            'assets/images/product-image/product-9-3.png',
            'assets/images/product-image/product-9-4.png'
        ],
        features: [
            'Maroon and gold colorway',
            'Custom Braylen Naves detailing with #17',
            'Reversible Be The Reason design',
            'Comfortable woven stretch material'
        ],
        inStock: true,
        detailPage: 'product-detail-9.html'
    },
    {
        id: 'btr-chance-sims-010',
        title: 'Chance Sims x BTR Bracelet',
        price: 19.99,
        shortDescription: 'Find Your Reason. Chase Your Purpose.',
        fullDescription: 'The Chance Sims x BTR Bracelet brings Chance’s personality, style, and competitive mindset together with the Be The Reason message. It features a bold camo-inspired design in green, black, yellow, and orange, with SIMS displayed prominently in bold lettering surrounded by custom BTR details, stars, and athletic-inspired graphics. The reverse side carries the signature BE THE REASON message — a reminder that behind every goal, workout, practice, and game, there has to be a reason that keeps you going.',
        sku: 'BTR-CHANCE-010',
        category: 'Bracelets',
        tags: ['Athlete Collab', 'Chance Sims', 'Football', 'Camo'],
        images: [
            'assets/images/product-image/product-10-1.png',
            'assets/images/product-image/product-10-2.png',
            'assets/images/product-image/product-10-3.png',
            'assets/images/product-image/product-10-4.png'
        ],
        features: [
            'Camo-inspired green, black, yellow and orange design',
            'Bold SIMS lettering with custom BTR details',
            'Reversible Be The Reason design',
            'Comfortable woven stretch material'
        ],
        inStock: true,
        detailPage: 'product-detail-10.html'
    },
    {
        id: 'btr-jake-morrow-011',
        title: 'Jake Morrow x BTR Bracelet',
        price: 19.99,
        shortDescription: 'Faith. Family. Football. Be The Reason.',
        fullDescription: 'A signature athlete collaboration that brings together Jake’s football identity with the mindset and purpose behind Be The Reason. Designed in a bold purple, black, white, and gold colorway, it features Jake’s name, #12, football-inspired details, and the words FAITH. FAMILY. FOOTBALL. The purple sections carry the signature BE THE REASON branding with distressed gold accents — a reminder to have a purpose behind everything you do and keep showing up when the work gets difficult.',
        sku: 'BTR-JAKE-011',
        category: 'Bracelets',
        tags: ['Athlete Collab', 'Jake Morrow', 'Football', 'Faith Family Football'],
        images: [
            'assets/images/product-image/product-11-1.png',
            'assets/images/product-image/product-11-2.png',
            'assets/images/product-image/product-11-3.png',
            'assets/images/product-image/product-11-4.png'
        ],
        features: [
            'Purple, black, white and gold colorway',
            'Custom Jake Morrow detailing with #12',
            'Reversible Be The Reason design',
            'Comfortable woven stretch material'
        ],
        inStock: true,
        detailPage: 'product-detail-11.html'
    },
    {
        id: 'btr-jj-douglas-012',
        title: 'JJ Douglas x BTR Bracelet',
        price: 19.99,
        shortDescription: 'Faith. Family. Football. Purpose.',
        fullDescription: 'The JJ Douglas x BTR Bracelet is built around the things that matter most — faith, family, football, and purpose. It combines a rugged, game-ready look with details inspired by JJ’s journey: bold black, red, and white tones with distressed textures, JJ Douglas’ name and #1, football-inspired graphics, crosses representing faith, and "Family Matters" as a reminder of who you’re doing it all for. The reverse side carries the signature BE THE REASON message — a daily reminder to stay focused, keep working, and finish what you start.',
        sku: 'BTR-JJDOUGLAS-012',
        category: 'Bracelets',
        tags: ['Athlete Collab', 'JJ Douglas', 'Football', 'Faith Family Football'],
        images: [
            'assets/images/product-image/product-12-1.png',
            'assets/images/product-image/product-12-2.png',
            'assets/images/product-image/product-12-3.png',
            'assets/images/product-image/product-12-4.png'
        ],
        features: [
            'Black, red and white distressed design',
            'Custom JJ Douglas detailing with #1',
            'Reversible Be The Reason design',
            'Comfortable woven stretch material'
        ],
        inStock: true,
        detailPage: 'product-detail-12.html'
    }
];

// Helper function to get product by ID
function getProductById(productId) {
    return PRODUCTS.find(product => product.id === productId) || null;
}

// Helper function to get all products
function getAllProducts() {
    return PRODUCTS;
}

// Helper function to get related products (exclude current product)
function getRelatedProducts(currentProductId, limit = 4) {
    return PRODUCTS.filter(product => product.id !== currentProductId).slice(0, limit);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PRODUCTS,
        getProductById,
        getAllProducts,
        getRelatedProducts
    };
}
