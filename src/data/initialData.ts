import { Product, VipTierConfig, CustomerUser, Order, GiftCard, Review, Coupon, HomepageConfig, InAppNotification } from '../types';

export const INITIAL_HOMEPAGE_CONFIG: HomepageConfig = {
  announcementText: 'COMPLIMENTARY NATIONWIDE EXPRESS DELIVERY ON ALL ORDERS ABOVE PKR 5,000 | USE CODE WELCOME10',
  heroHeadline: 'BESPOKE LUXURY COUTURE',
  heroSubtext: 'The Definitive Collection of Haute Couture, Traditional Craftsmanship & Contemporary Tailoring for Men, Women & Children.',
  heroCtaText: 'EXPLORE THE COLLECTION',
  heroBannerImage: '/images/hero_luxury_fashion_banner.jpg',
  menBannerImage: '/images/category_men_collection.jpg',
  womenBannerImage: '/images/category_women_collection.jpg',
  childrenBannerImage: '/images/category_children_collection.jpg',
  vipHeadline: 'THE M.SHAHEER VIP PRIVILEGE CLUB',
  vipSubtext: 'Unlock private salons, member-exclusive couture archives, multiplier reward points and bespoke concierge tailoring.',
  storePhone: '+92 300 1234567',
  storeWhatsApp: '+92 300 7654321',
  storeEmail: 'concierge@mshaheer.pk',
  storeAddress: 'M.SHAHEER Flagship House, M.M. Alam Road, Gulberg III, Lahore, Pakistan',
};

export const INITIAL_VIP_TIERS: VipTierConfig[] = [
  {
    id: 'Silver',
    name: 'Silver Privilege',
    badge: 'SILVER TIER',
    discountPercent: 5,
    pointsMultiplier: 1.0,
    perks: [
      '5% automatic discount on all regular collections',
      'Earn 1 Reward Point for every PKR 100 spent',
      'Invitations to seasonal preview launches',
      '30-day effortless luxury returns'
    ],
    minSpendPKR: 0,
    cardTheme: 'silver-card-shimmer',
  },
  {
    id: 'Gold',
    name: 'Gold Elite',
    badge: 'GOLD ELITE',
    discountPercent: 10,
    pointsMultiplier: 2.0,
    perks: [
      '10% automatic discount on all collections',
      'Earn 2 Reward Points for every PKR 100 spent (Double Points)',
      'Early access 48 hours prior to public seasonal drops',
      'Priority express packaging & complimentary garment bags',
      'Dedicated styling assistant via WhatsApp'
    ],
    minSpendPKR: 50000,
    cardTheme: 'gold-card-shimmer',
  },
  {
    id: 'Platinum',
    name: 'Platinum Sovereign',
    badge: 'PLATINUM SOVEREIGN',
    discountPercent: 15,
    pointsMultiplier: 3.0,
    perks: [
      '15% automatic discount across all collections',
      'Earn 3 Reward Points for every PKR 100 spent (Triple Points)',
      'Exclusive access to locked VIP Private Archive & Couture drops',
      'Complimentary nationwide same-day / next-day priority courier',
      'Private salon appointments with Head Designer M. Shaheer',
      'Bespoke monogramming and tailoring adjustments at no extra charge'
    ],
    minSpendPKR: 150000,
    cardTheme: 'platinum-card-shimmer',
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  // --- MEN'S COLLECTION ---
  {
    id: 'm-01',
    name: 'Bespoke Double-Breasted Dinner Tuxedo',
    category: 'men',
    subcategory: 'Jackets and Hoodies',
    price: 38500,
    originalPrice: 45000,
    discountPercent: 14,
    images: [
      '/images/category_men_collection.jpg',
      '/images/hero_luxury_fashion_banner.jpg'
    ],
    rating: 4.9,
    reviewCount: 38,
    sizes: ['38R', '40R', '42R', '44R'],
    colors: [
      { name: 'Noir Midnight', hex: '#111111' },
      { name: 'Royal Navy', hex: '#0f172a' }
    ],
    description: 'Impeccably tailored from premium Italian virgin wool blend featuring satin peak lapels, genuine gold-rimmed horn buttons, and handcrafted inner lining.',
    stock: 12,
    isFeatured: true,
    isBestSeller: true,
    fabric: 'Super 130s Wool & Satin Silk',
    sku: 'MSH-MEN-TX01',
  },
  {
    id: 'm-02',
    name: 'Imperial Hand-Embroidered Kurta Pajama',
    category: 'men',
    subcategory: 'Traditional Clothes',
    price: 18900,
    originalPrice: 22500,
    discountPercent: 16,
    images: [
      '/images/category_men_collection.jpg'
    ],
    rating: 5.0,
    reviewCount: 64,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Ivory White', hex: '#fafafa' },
      { name: 'Onyx Black', hex: '#18181b' },
      { name: 'Royal Gold', hex: '#d4af37' }
    ],
    description: 'Master artisan crafted raw Egyptian cotton formal kurta with intricate hand-embroidered resham and bullion zardozi needlework along the band collar and placket.',
    stock: 25,
    isFeatured: true,
    isNewArrival: true,
    fabric: '100% Pima Textured Cotton',
    sku: 'MSH-MEN-KT02',
  },
  {
    id: 'm-03',
    name: 'Royal Heritage Chronograph Gold Edition',
    category: 'men',
    subcategory: 'Wrist Watches',
    price: 49500,
    originalPrice: 58000,
    discountPercent: 15,
    images: [
      '/images/product_luxury_watch_gold.jpg'
    ],
    rating: 4.8,
    reviewCount: 22,
    sizes: ['One Size (41mm)'],
    colors: [
      { name: '18K Gold Plated', hex: '#d4af37' },
      { name: 'Gunmetal Noir', hex: '#27272a' }
    ],
    description: 'Precision Swiss quartz movement encapsulated in 316L stainless steel with 18k electro-gold finish, sapphire crystal lens, and genuine alligator-pattern Italian leather strap.',
    stock: 8,
    isFeatured: true,
    isBestSeller: true,
    sku: 'MSH-ACC-W03',
  },
  {
    id: 'm-04',
    name: 'Italian Egyptian Cotton Cutaway Dress Shirt',
    category: 'men',
    subcategory: 'Shirts',
    price: 8900,
    originalPrice: 10500,
    discountPercent: 15,
    images: [
      '/images/category_men_collection.jpg'
    ],
    rating: 4.7,
    reviewCount: 45,
    sizes: ['15', '15.5', '16', '16.5', '17'],
    colors: [
      { name: 'Pure Chalk White', hex: '#ffffff' },
      { name: 'Ice Blue', hex: '#dbeafe' },
      { name: 'Midnight Black', hex: '#18181b' }
    ],
    description: 'Finely spun 140s two-ply Giza Egyptian cotton with French cuffs, mother-of-pearl buttons, and structured cutaway collar.',
    stock: 35,
    isBestSeller: true,
    fabric: '100% Giza Egyptian Cotton',
    sku: 'MSH-MEN-SH04',
  },
  {
    id: 'm-05',
    name: 'Gold Crest Heavyweight Cotton Polo',
    category: 'men',
    subcategory: 'T-Shirts and Polos',
    price: 6400,
    originalPrice: 7500,
    discountPercent: 15,
    images: [
      '/images/product_men_casual_polo_denim.jpg'
    ],
    rating: 4.9,
    reviewCount: 51,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Obsidian Black', hex: '#111111' },
      { name: 'Cream Ecru', hex: '#f5f5f4' },
      { name: 'Olive Bronze', hex: '#44403c' }
    ],
    description: 'Heavyweight 260 GSM combed mercerized cotton pique featuring our signature M.SHAHEER 24K gold thread embroidered crest on the chest.',
    stock: 40,
    isNewArrival: true,
    fabric: '100% Mercerized Pique Cotton',
    sku: 'MSH-MEN-PL05',
  },
  {
    id: 'm-06',
    name: 'Bespoke Pleated Italian Wool Trousers',
    category: 'men',
    subcategory: 'Pants and Trousers',
    price: 13500,
    originalPrice: 16000,
    discountPercent: 16,
    images: [
      '/images/category_men_collection.jpg'
    ],
    rating: 4.8,
    reviewCount: 29,
    sizes: ['30', '32', '34', '36', '38'],
    colors: [
      { name: 'Charcoal Mélange', hex: '#262626' },
      { name: 'Camel Tan', hex: '#785332' },
      { name: 'Deep Midnight', hex: '#0f172a' }
    ],
    description: 'Classic double-forward pleats, side adjusters with brass buckles, and a natural relaxed taper crafted for refined comfort and poise.',
    stock: 18,
    fabric: 'Italian Tropical Wool Blend',
    sku: 'MSH-MEN-TR06',
  },
  {
    id: 'm-07',
    name: 'Selvedge Raw Midnight Black Denim',
    category: 'men',
    subcategory: 'Jeans',
    price: 11500,
    originalPrice: 13900,
    discountPercent: 17,
    images: [
      '/images/product_men_casual_polo_denim.jpg'
    ],
    rating: 4.9,
    reviewCount: 31,
    sizes: ['30', '32', '34', '36'],
    colors: [
      { name: 'Raw Black Selvedge', hex: '#09090b' },
      { name: 'Deep Indigo', hex: '#172554' }
    ],
    description: 'Shuttle-loomed 14oz Japanese selvedge denim dyed with sulfur black for slow, high-character fading. Finished with gold selvedge ID line.',
    stock: 22,
    fabric: '100% Selvedge Cotton',
    sku: 'MSH-MEN-JN07',
  },
  {
    id: 'm-08',
    name: 'Handcrafted Goodyear-Welted Oxford Brogues',
    category: 'men',
    subcategory: 'Formal Shoes',
    price: 24500,
    originalPrice: 28500,
    discountPercent: 14,
    images: [
      '/images/product_oxford_shoes_leather.jpg'
    ],
    rating: 5.0,
    reviewCount: 19,
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'Burnished Espresso', hex: '#382214' },
      { name: 'Piano Gloss Black', hex: '#000000' }
    ],
    description: 'Full-grain calfskin upper hand-burnished by master cobblers, Goodyear welt construction with channeled leather soles and brass nail heel stack.',
    stock: 10,
    sku: 'MSH-SH-OX08',
  },
  {
    id: 'm-09',
    name: 'Monogrammed Leather Court Sneaker',
    category: 'men',
    subcategory: 'Sneakers',
    price: 16500,
    originalPrice: 19000,
    discountPercent: 13,
    images: [
      '/images/product_oxford_shoes_leather.jpg'
    ],
    rating: 4.7,
    reviewCount: 42,
    sizes: ['40', '41', '42', '43', '44'],
    colors: [
      { name: 'Monochrome White & Gold', hex: '#f8fafc' },
      { name: 'Triple Black', hex: '#18181b' }
    ],
    description: 'Ultra-supple nappa leather with gold embossed foil lettering, cushioned ortholite insole, and vulcanized Margom rubber cupsole.',
    stock: 16,
    sku: 'MSH-SH-SN09',
  },
  {
    id: 'm-10',
    name: 'Artisan Hand-Stitched Peshawari Chappal',
    category: 'men',
    subcategory: 'Sandals and Slippers',
    price: 9800,
    originalPrice: 12000,
    discountPercent: 18,
    images: [
      '/images/product_peshawari_chappal_leather.jpg'
    ],
    rating: 4.9,
    reviewCount: 77,
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'Mustard Tan', hex: '#a16207' },
      { name: 'Jet Noir', hex: '#18181b' }
    ],
    description: 'Traditional heritage Peshawari silhouette crafted from vegetable-tanned thick cowhide with tire-sole durability and golden buckle detailing.',
    stock: 30,
    isBestSeller: true,
    sku: 'MSH-SH-PS10',
  },
  {
    id: 'm-11',
    name: 'Full-Grain Leather Bi-Fold Gold Foil Wallet',
    category: 'men',
    subcategory: 'Wallets',
    price: 4900,
    originalPrice: 6200,
    discountPercent: 21,
    images: [
      '/images/product_men_leather_wallet_belt.jpg'
    ],
    rating: 4.9,
    reviewCount: 68,
    sizes: ['Standard'],
    colors: [
      { name: 'Classic Black', hex: '#18181b' },
      { name: 'Cognac Brown', hex: '#7c2d12' }
    ],
    description: 'Vegetable-tanned full-grain leather with RFID blocking foil lining, 8 card slots, dual cash compartment, and hot-stamped gold foil monogram.',
    stock: 45,
    sku: 'MSH-ACC-WL11',
  },
  {
    id: 'm-12',
    name: 'Reversible Tuscan Leather Belt with Gold Buckle',
    category: 'men',
    subcategory: 'Belts',
    price: 5800,
    originalPrice: 7000,
    discountPercent: 17,
    images: [
      '/images/product_men_leather_wallet_belt.jpg'
    ],
    rating: 4.8,
    reviewCount: 39,
    sizes: ['32', '34', '36', '38', '40'],
    colors: [
      { name: 'Black / Dark Brown', hex: '#27272a' }
    ],
    description: 'Dual-sided reversible Italian calfskin with rotatable solid brass gold-finish buckle. Seamless transition between formal black and casual brown.',
    stock: 30,
    sku: 'MSH-ACC-BL12',
  },
  {
    id: 'm-13',
    name: 'Mother-of-Pearl & Onyx Gold Cufflinks Set',
    category: 'men',
    subcategory: 'Fashion Accessories',
    price: 4500,
    originalPrice: 5500,
    discountPercent: 18,
    images: [
      '/images/product_bridal_jewelry_gold.jpg'
    ],
    rating: 5.0,
    reviewCount: 15,
    sizes: ['Standard'],
    colors: [
      { name: 'Gold & Black Onyx', hex: '#d4af37' }
    ],
    description: 'Pair of round cufflinks and 4 matching shirt studs crafted in 18K gold electroplate setting with natural shimmering mother-of-pearl and onyx.',
    stock: 25,
    sku: 'MSH-ACC-CF13',
  },

  // --- WOMEN'S COLLECTION ---
  {
    id: 'w-01',
    name: 'Imperial Zardozi & Tilla Handcrafted Bridal Gharara',
    category: 'women',
    subcategory: 'Party Wear',
    price: 78000,
    originalPrice: 92000,
    discountPercent: 15,
    images: [
      '/images/category_women_collection.jpg',
      '/images/hero_luxury_fashion_banner.jpg'
    ],
    rating: 5.0,
    reviewCount: 28,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Ivory Gold', hex: '#fef08a' },
      { name: 'Crimson Velvet', hex: '#881337' },
      { name: 'Midnight Emerald', hex: '#064e3b' }
    ],
    description: 'Breathtaking pure chiffon shirt and farshi gharara encrusted with real gold tilla, gota patti, dabka and freshwater pearl detailing. Accompanied by heavy scalloped dupatta.',
    stock: 6,
    isFeatured: true,
    isBestSeller: true,
    fabric: 'Pure Kathan Silk & Chiffon',
    sku: 'MSH-WOM-GH01',
  },
  {
    id: 'w-02',
    name: 'Regal 3-Piece Jacquard Embroidered Ensemble',
    category: 'women',
    subcategory: 'Traditional Suits',
    price: 21500,
    originalPrice: 26000,
    discountPercent: 17,
    images: [
      '/images/category_women_collection.jpg'
    ],
    rating: 4.9,
    reviewCount: 84,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Champagne Gold', hex: '#fef9c3' },
      { name: 'Dusty Rose', hex: '#f43f5e' },
      { name: 'Midnight Charcoal', hex: '#18181b' }
    ],
    description: 'Lustrous woven gold metallic jacquard kameez paired with matching slim raw silk cigarette pants and an airy organza dupatta embellished with hand-cut cutwork borders.',
    stock: 28,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: true,
    fabric: 'Pure Jacquard Silk & Organza',
    sku: 'MSH-WOM-ST02',
  },
  {
    id: 'w-03',
    name: 'Midnight Velvet Draped Evening Gala Dress',
    category: 'women',
    subcategory: 'Dresses',
    price: 32000,
    originalPrice: 38000,
    discountPercent: 16,
    images: [
      '/images/product_women_evening_gown_velvet.jpg',
      '/images/hero_luxury_fashion_banner.jpg'
    ],
    rating: 4.8,
    reviewCount: 33,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Noir Black', hex: '#09090b' },
      { name: 'Deep Amethyst', hex: '#581c87' }
    ],
    description: 'Floor-length sculpting micro-velvet gown featuring a tasteful side slit, structured architectural shoulder accents, and gold sequin leaf motifs on the neckline.',
    stock: 10,
    isFeatured: true,
    fabric: 'Premium Stretch Micro-Velvet',
    sku: 'MSH-WOM-DR03',
  },
  {
    id: 'w-04',
    name: 'Silk Chiffon Kalidar Flared Frock',
    category: 'women',
    subcategory: 'Frocks',
    price: 24500,
    originalPrice: 29000,
    discountPercent: 15,
    images: [
      '/images/category_women_collection.jpg'
    ],
    rating: 4.9,
    reviewCount: 47,
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Sunlit Pearl', hex: '#fef3c7' },
      { name: 'Sage Green', hex: '#84cc16' }
    ],
    description: '28-kali voluminous silhouette crafted from featherlight sheer silk chiffon with shimmering mirror-work borders and hand-embossed neckline.',
    stock: 14,
    fabric: 'Pure Silk Chiffon',
    sku: 'MSH-WOM-FR04',
  },
  {
    id: 'w-05',
    name: 'Handcrafted Structured Leather Top-Handle Bag',
    category: 'women',
    subcategory: 'Handbags',
    price: 28500,
    originalPrice: 34000,
    discountPercent: 16,
    images: [
      '/images/product_luxury_handbag_leather.jpg'
    ],
    rating: 5.0,
    reviewCount: 36,
    sizes: ['Medium'],
    colors: [
      { name: 'Noir Matte', hex: '#18181b' },
      { name: 'Vanilla Cream', hex: '#fefce8' },
      { name: 'Caramel Tan', hex: '#9a3412' }
    ],
    description: 'Handcrafted box calf leather handbag featuring signature M.SHAHEER 24K gold lock clasp, structured top handle, and detachable crossbody chain.',
    stock: 15,
    isBestSeller: true,
    sku: 'MSH-BAG-05',
  },
  {
    id: 'w-06',
    name: '24K Gold Plated Heritage Polki Choker Set',
    category: 'women',
    subcategory: 'Jewelry',
    price: 36000,
    originalPrice: 42000,
    discountPercent: 14,
    images: [
      '/images/product_bridal_jewelry_gold.jpg'
    ],
    rating: 4.9,
    reviewCount: 52,
    sizes: ['Adjustable Set'],
    colors: [
      { name: 'Antique 24K Gold', hex: '#d4af37' }
    ],
    description: 'Traditional Mughal revival polki necklace set with matching chandeliers and maang tikka, crafted with uncut cubic zirconia and south sea freshwater pearls.',
    stock: 9,
    isFeatured: true,
    sku: 'MSH-JW-06',
  },
  {
    id: 'w-07',
    name: 'Gold Embellished Strappy Stiletto Sandals',
    category: 'women',
    subcategory: 'Sandals',
    price: 15500,
    originalPrice: 18000,
    discountPercent: 14,
    images: [
      '/images/category_women_collection.jpg'
    ],
    rating: 4.7,
    reviewCount: 23,
    sizes: ['36', '37', '38', '39', '40'],
    colors: [
      { name: 'Metallic Gold', hex: '#eab308' },
      { name: 'Gloss Noir', hex: '#09090b' }
    ],
    description: '85mm slender heel sandals with crystal-studded delicate vamp straps, memory foam cushioned footbed, and genuine leather sole.',
    stock: 18,
    sku: 'MSH-SH-SD07',
  },
  {
    id: 'w-08',
    name: 'Pointed Metallic Trim Leather Mules',
    category: 'women',
    subcategory: 'Heels and Flats',
    price: 12500,
    originalPrice: 15000,
    discountPercent: 17,
    images: [
      '/images/product_oxford_shoes_leather.jpg'
    ],
    rating: 4.8,
    reviewCount: 41,
    sizes: ['36', '37', '38', '39', '40'],
    colors: [
      { name: 'Ecru Ivory', hex: '#f5f5f4' },
      { name: 'Onyx Black', hex: '#18181b' }
    ],
    description: 'Slip-on low 20mm sculpted heel mules featuring a sculptural gold buckle bar, soft lambskin lining, and sharp pointed-toe silhouette.',
    stock: 22,
    sku: 'MSH-SH-ML08',
  },
  {
    id: 'w-09',
    name: 'Pure Lawn Organza Detailed Everyday Tunic',
    category: 'women',
    subcategory: 'Casual Wear',
    price: 8500,
    originalPrice: 10500,
    discountPercent: 19,
    images: [
      '/images/category_women_collection.jpg'
    ],
    rating: 4.8,
    reviewCount: 60,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Powder Lilac', hex: '#e9d5ff' },
      { name: 'Soft Sage', hex: '#d9f99d' },
      { name: 'Pearl White', hex: '#fafafa' }
    ],
    description: 'Airy summer lawn fabric with delicate cross-stitch needle embroidery on the sleeves, lace inserts, and scalloped hem.',
    stock: 35,
    isBestSeller: true,
    fabric: '100% Breathable Fine Lawn',
    sku: 'MSH-WOM-CS09',
  },
  {
    id: 'w-10',
    name: 'Silk Satin Contrast Piping Luxury Night Suit',
    category: 'women',
    subcategory: 'Night Suits',
    price: 9800,
    originalPrice: 12500,
    discountPercent: 22,
    images: [
      '/images/product_women_evening_gown_velvet.jpg'
    ],
    rating: 4.9,
    reviewCount: 38,
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Champagne Silk', hex: '#fef08a' },
      { name: 'Midnight Navy', hex: '#0f172a' }
    ],
    description: 'Ultra-luxurious heavyweight mulberry silk satin pajama set with notch collar, chest pocket, and contrast golden piping.',
    stock: 20,
    fabric: 'Mulberry Silk Satin Blend',
    sku: 'MSH-WOM-NS10',
  },
  {
    id: 'w-11',
    name: 'Petite Diamante Gold Mesh Wrist Watch',
    category: 'women',
    subcategory: 'Wrist Watches',
    price: 34500,
    originalPrice: 40000,
    discountPercent: 14,
    images: [
      '/images/product_luxury_watch_gold.jpg'
    ],
    rating: 4.9,
    reviewCount: 29,
    sizes: ['One Size (28mm)'],
    colors: [
      { name: 'Rose Gold', hex: '#fda4af' },
      { name: 'Yellow Gold', hex: '#d4af37' }
    ],
    description: '28mm jewelry timepiece with mother-of-pearl dial, Austrian crystal indices, and magnetic Milanese stainless steel gold mesh strap.',
    stock: 12,
    sku: 'MSH-ACC-WW11',
  },
  {
    id: 'w-12',
    name: 'Printed Silk Paisley Twilly & Hair Scarf',
    category: 'women',
    subcategory: 'Fashion Accessories',
    price: 3200,
    originalPrice: 4000,
    discountPercent: 20,
    images: [
      '/images/product_bridal_jewelry_gold.jpg'
    ],
    rating: 4.8,
    reviewCount: 46,
    sizes: ['Standard'],
    colors: [
      { name: 'Gold & Noir Paisley', hex: '#d4af37' }
    ],
    description: '100% twill silk skinny scarf with hand-rolled edges. Perfect for styling handbag handles, wrists, or neck accents.',
    stock: 40,
    fabric: '100% Silk Twill',
    sku: 'MSH-ACC-SC12',
  },

  // --- CHILDREN'S COLLECTION ---
  {
    id: 'c-01',
    name: 'Boys Junior Navy Tailored 3-Piece Tuxedo',
    category: 'children',
    subcategory: 'Jackets and Hoodies',
    childGender: 'boys',
    price: 16500,
    originalPrice: 19500,
    discountPercent: 15,
    images: [
      '/images/category_children_collection.jpg'
    ],
    rating: 4.9,
    reviewCount: 34,
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
    colors: [
      { name: 'Royal Navy', hex: '#0f172a' },
      { name: 'Midnight Charcoal', hex: '#18181b' }
    ],
    description: 'Tailored for young gentlemen. Includes wool-blend blazer with satin trim, matching buttoned waistcoat, and adjustable-waist trousers.',
    stock: 18,
    isFeatured: true,
    isBestSeller: true,
    sku: 'MSH-KID-TX01',
  },
  {
    id: 'c-02',
    name: 'Girls Golden Shimmer Tulle Party Frock',
    category: 'children',
    subcategory: "Girls' Dresses and Frocks",
    childGender: 'girls',
    price: 14500,
    originalPrice: 17500,
    discountPercent: 17,
    images: [
      '/images/category_children_collection.jpg'
    ],
    rating: 5.0,
    reviewCount: 42,
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y'],
    colors: [
      { name: 'Champagne Gold', hex: '#fef08a' },
      { name: 'Emerald Velvet', hex: '#064e3b' },
      { name: 'Blush Pink', hex: '#fbcfe8' }
    ],
    description: 'Multi-layered cascading glitter tulle skirt with soft cotton lining, velvet Peter Pan collar with pearls, and a dramatic back satin bow.',
    stock: 20,
    isFeatured: true,
    isBestSeller: true,
    fabric: 'Brocade & Silk Chiffon',
    sku: 'MSH-KID-FR02',
  },
  {
    id: 'c-03',
    name: 'Boys Embroidered Raw Silk Kurta & Waistcoat',
    category: 'children',
    subcategory: 'Traditional Clothes',
    childGender: 'boys',
    price: 11500,
    originalPrice: 13800,
    discountPercent: 17,
    images: [
      '/images/category_children_collection.jpg'
    ],
    rating: 4.9,
    reviewCount: 56,
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y'],
    colors: [
      { name: 'Pure White & Gold', hex: '#ffffff' },
      { name: 'Maroon & Gold', hex: '#881337' }
    ],
    description: 'Festive traditional 3-piece set for weddings and Eid. Crisp white raw silk kurta pajama accompanied by a heavy banarasi jacquard waistcoat.',
    stock: 25,
    isNewArrival: true,
    sku: 'MSH-KID-KT03',
  },
  {
    id: 'c-04',
    name: 'Girls Banarasi Jacquard Anarkali Suit',
    category: 'children',
    subcategory: 'Traditional Clothes',
    childGender: 'girls',
    price: 13900,
    originalPrice: 16500,
    discountPercent: 16,
    images: [
      '/images/category_children_collection.jpg'
    ],
    rating: 4.8,
    reviewCount: 31,
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: [
      { name: 'Golden Ivory', hex: '#fef9c3' },
      { name: 'Ruby Pink', hex: '#e11d48' }
    ],
    description: 'Traditional handcrafted Anarkali frock with golden zari work, churidar pajama and pre-stitched organza dupatta with gota borders.',
    stock: 15,
    sku: 'MSH-KID-AK04',
  },
  {
    id: 'c-05',
    name: 'Boys Formal Oxford Button-Down Shirt',
    category: 'children',
    subcategory: 'Shirts and T-Shirts',
    childGender: 'boys',
    price: 4500,
    originalPrice: 5500,
    discountPercent: 18,
    images: [
      '/images/category_children_collection.jpg'
    ],
    rating: 4.7,
    reviewCount: 27,
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
    colors: [
      { name: 'Chalk White', hex: '#ffffff' },
      { name: 'Sky Blue', hex: '#bae6fd' }
    ],
    description: '100% fine cotton weave shirt with reinforced buttonholes, soft collar stays, and golden logo embroidery on the pocket.',
    stock: 30,
    fabric: '100% Breathable Cotton',
    sku: 'MSH-KID-SH05',
  },
  {
    id: 'c-06',
    name: 'Boys Stretch Chino Pants',
    category: 'children',
    subcategory: 'Pants and Jeans',
    childGender: 'boys',
    price: 4800,
    originalPrice: 5800,
    discountPercent: 17,
    images: [
      '/images/category_children_collection.jpg'
    ],
    rating: 4.8,
    reviewCount: 35,
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: [
      { name: 'Khaki Tan', hex: '#a8a29e' },
      { name: 'Dark Navy', hex: '#0f172a' }
    ],
    description: 'Durable stretch cotton twill with hidden internal elastic adjusters on waistband for growing comfort.',
    stock: 28,
    sku: 'MSH-KID-PN06',
  },
  {
    id: 'c-07',
    name: 'Girls Crystal Bow Patent Ballerina Flats',
    category: 'children',
    subcategory: 'Sandals and Slippers',
    childGender: 'girls',
    price: 6500,
    originalPrice: 7800,
    discountPercent: 17,
    images: [
      '/images/category_children_collection.jpg'
    ],
    rating: 4.9,
    reviewCount: 44,
    sizes: ['26', '28', '30', '32', '34'],
    colors: [
      { name: 'Gloss Black', hex: '#000000' },
      { name: 'Glitter Gold', hex: '#eab308' }
    ],
    description: 'High-shine patent leather flats with elastic ankle strap, memory foam arch support, and crystal embellishment on front bow.',
    stock: 22,
    sku: 'MSH-KID-FL07',
  },
  {
    id: 'c-08',
    name: 'Boys Junior Penny Loafers',
    category: 'children',
    subcategory: 'Shoes and Sneakers',
    childGender: 'boys',
    price: 7900,
    originalPrice: 9500,
    discountPercent: 17,
    images: [
      '/images/product_oxford_shoes_leather.jpg'
    ],
    rating: 4.8,
    reviewCount: 19,
    sizes: ['28', '30', '32', '34', '36'],
    colors: [
      { name: 'Rich Dark Brown', hex: '#451a03' },
      { name: 'Jet Black', hex: '#09090b' }
    ],
    description: 'Genuine cowhide leather slip-on penny loafers with flexible non-slip rubber grip sole for formal family events.',
    stock: 18,
    sku: 'MSH-KID-LF08',
  },
  {
    id: 'c-09',
    name: 'Junior Analog Water-Resistant Watch',
    category: 'children',
    subcategory: "Children's Watches",
    childGender: 'boys',
    price: 5200,
    originalPrice: 6500,
    discountPercent: 20,
    images: [
      '/images/product_luxury_watch_gold.jpg'
    ],
    rating: 4.7,
    reviewCount: 15,
    sizes: ['One Size'],
    colors: [
      { name: 'Gold Bezel & Navy Strap', hex: '#0284c7' }
    ],
    description: 'Kid-friendly durable silicone strap with stainless steel gold-plated bezel, luminous hands, and 30m water resistance.',
    stock: 20,
    sku: 'MSH-KID-WT09',
  },
  {
    id: 'c-10',
    name: 'Embossed Monogram Velvet Kids Backpack',
    category: 'children',
    subcategory: 'School Accessories',
    childGender: 'girls',
    price: 6800,
    originalPrice: 8200,
    discountPercent: 17,
    images: [
      '/images/product_luxury_handbag_leather.jpg'
    ],
    rating: 5.0,
    reviewCount: 38,
    sizes: ['Standard Kids'],
    colors: [
      { name: 'Emerald Velvet', hex: '#064e3b' },
      { name: 'Plum Purple', hex: '#581c87' }
    ],
    description: 'Plush quilted velvet with gold metallic zipper pulls, padded ergonomic shoulder straps, water-repellent interior lining.',
    stock: 25,
    sku: 'MSH-KID-BP10',
  },

  // --- VIP ARCHIVE COLLECTION (Platinum & Gold locked) ---
  {
    id: 'vip-01',
    name: 'Platinum Sovereign 24K Gold Thread Sherwani',
    category: 'men',
    subcategory: 'Traditional Clothes',
    price: 95000,
    originalPrice: 110000,
    discountPercent: 14,
    images: [
      '/images/hero_luxury_fashion_banner.jpg',
      '/images/category_men_collection.jpg'
    ],
    rating: 5.0,
    reviewCount: 14,
    sizes: ['38R', '40R', '42R', '44R'],
    colors: [
      { name: 'Imperial Gold & Noir', hex: '#d4af37' }
    ],
    description: 'M.SHAHEER VIP Exclusive Masterpiece. Hand-woven pure raw silk featuring 600 hours of continuous hand-embroidery in genuine 24k gold zari and precious stone embellishment. Tailored strictly to custom measurements.',
    stock: 3,
    isVipExclusive: true,
    minVipTier: 'Platinum',
    fabric: 'Pure Raw Silk with Gold Thread',
    sku: 'MSH-VIP-SH01',
  },
  {
    id: 'vip-02',
    name: 'Sovereign Diamond & Gold Tourbillon Chronometer',
    category: 'men',
    subcategory: 'Wrist Watches',
    price: 135000,
    originalPrice: 160000,
    discountPercent: 16,
    images: [
      '/images/product_luxury_watch_gold.jpg'
    ],
    rating: 5.0,
    reviewCount: 9,
    sizes: ['42mm Bespoke'],
    colors: [
      { name: '18K Solid Gold Finish', hex: '#d4af37' }
    ],
    description: 'Exclusive to Gold & Platinum VIP Members. Automatic skeleton movement showcasing complex mechanical tourbillon, real baguette diamond bezel indexes, and hand-stitched crocodile strap.',
    stock: 2,
    isVipExclusive: true,
    minVipTier: 'Gold',
    sku: 'MSH-VIP-WT02',
  },
  {
    id: 'vip-03',
    name: 'Haute Couture Silk Evening Gown - Private Salon Archive',
    category: 'women',
    subcategory: 'Dresses',
    price: 115000,
    originalPrice: 135000,
    discountPercent: 15,
    images: [
      '/images/product_women_evening_gown_velvet.jpg',
      '/images/hero_luxury_fashion_banner.jpg'
    ],
    rating: 5.0,
    reviewCount: 12,
    sizes: ['Custom Fitted'],
    colors: [
      { name: 'Midnight Obsidian & Gold', hex: '#18181b' }
    ],
    description: 'A singular work of couture art. Pure French lace bonded with sculpted duchess satin and adorned with hand-applied Swarovski crystal and gold bullion beadwork. Includes personal styling consultation.',
    stock: 3,
    isVipExclusive: true,
    minVipTier: 'Platinum',
    fabric: 'Duchess Satin & French Chantilly Lace',
    sku: 'MSH-VIP-GW03',
  }
];

export const INITIAL_USER: CustomerUser = {
  id: 'cust-01',
  name: 'Shaheer Mirza',
  email: 'sm7270839@gmail.com',
  phone: '0300-8451992',
  city: 'Lahore',
  address: 'House 42-B, Sector Z, Phase 5, DHA',
  vipTier: 'Gold',
  rewardPoints: 1250,
  pointsHistory: [
    {
      id: 'pt-1',
      date: '2026-10-15',
      amount: 500,
      reason: 'Points earned on Order #MSH-94812',
      type: 'earned'
    },
    {
      id: 'pt-2',
      date: '2026-10-22',
      amount: 750,
      reason: 'Gold Elite Tier Bonus & Celebrations',
      type: 'earned'
    }
  ],
  memberSince: 'March 2025',
  membershipCardNumber: 'MSH-GLD-88204',
  savedAddresses: [
    {
      id: 'addr-1',
      label: 'Home (DHA Phase 5)',
      address: 'House 42-B, Sector Z, Phase 5, DHA, Lahore',
      city: 'Lahore',
      phone: '0300-8451992'
    },
    {
      id: 'addr-2',
      label: 'Office (Gulberg III)',
      address: 'Suite 401, Al-Hafeez Executive Tower, Gulberg III, Lahore',
      city: 'Lahore',
      phone: '0300-8451992'
    }
  ]
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'MSH-94812',
    trackingNumber: 'TRK-PK-948128',
    date: '2026-10-24',
    customer: {
      name: 'Shaheer Mirza',
      phone: '0300-8451992',
      email: 'sm7270839@gmail.com',
      city: 'Lahore',
      address: 'House 42-B, Sector Z, Phase 5, DHA, Lahore'
    },
    items: [
      {
        id: 'm-02-L-Ivory White',
        product: INITIAL_PRODUCTS[1],
        selectedSize: 'L',
        selectedColor: 'Ivory White',
        quantity: 1
      },
      {
        id: 'm-10-42-Mustard Tan',
        product: INITIAL_PRODUCTS[9],
        selectedSize: '42',
        selectedColor: 'Mustard Tan',
        quantity: 1
      }
    ],
    subtotal: 28700,
    discount: 2870, // 10% Gold tier discount
    deliveryCharges: 0,
    pointsDiscount: 0,
    giftCardDiscount: 0,
    total: 25830,
    paymentMethod: 'Cash on Delivery',
    status: 'Shipped',
    statusTimeline: [
      {
        status: 'Order Placed',
        timestamp: '2026-10-24 14:30',
        note: 'Order confirmed and verified via SMS.'
      },
      {
        status: 'Processing',
        timestamp: '2026-10-24 16:15',
        note: 'Garments pulled from boutique archive and sent for luxury pressing.'
      },
      {
        status: 'Packed',
        timestamp: '2026-10-25 10:00',
        note: 'Secured inside gold-embossed bespoke gift box with satin ribbon.'
      },
      {
        status: 'Shipped',
        timestamp: '2026-10-26 09:40',
        note: 'Dispatched with TCS Express Logistics. Tracking number active.'
      }
    ]
  },
  {
    id: 'MSH-83190',
    trackingNumber: 'TRK-PK-831901',
    date: '2026-10-10',
    customer: {
      name: 'Shaheer Mirza',
      phone: '0300-8451992',
      email: 'sm7270839@gmail.com',
      city: 'Lahore',
      address: 'House 42-B, Sector Z, Phase 5, DHA, Lahore'
    },
    items: [
      {
        id: 'm-04-16-Pure Chalk White',
        product: INITIAL_PRODUCTS[3],
        selectedSize: '16',
        selectedColor: 'Pure Chalk White',
        quantity: 2
      }
    ],
    subtotal: 17800,
    discount: 1780,
    deliveryCharges: 0,
    pointsDiscount: 500,
    giftCardDiscount: 0,
    total: 15520,
    paymentMethod: 'Cash on Delivery',
    status: 'Delivered',
    statusTimeline: [
      {
        status: 'Order Placed',
        timestamp: '2026-10-10 11:20',
        note: 'Order received.'
      },
      {
        status: 'Processing',
        timestamp: '2026-10-10 13:00',
        note: 'Verified and queued.'
      },
      {
        status: 'Packed',
        timestamp: '2026-10-10 17:30',
        note: 'Packed in signature box.'
      },
      {
        status: 'Shipped',
        timestamp: '2026-10-11 08:30',
        note: 'In transit with Leopards Courier.'
      },
      {
        status: 'Out for Delivery',
        timestamp: '2026-10-12 10:15',
        note: 'Rider on route to DHA Phase 5.'
      },
      {
        status: 'Delivered',
        timestamp: '2026-10-12 14:05',
        note: 'Delivered and Cash on Delivery collected.'
      }
    ]
  }
];

export const INITIAL_GIFT_CARDS: GiftCard[] = [
  {
    id: 'gc-1',
    code: 'GIFT-LUX-2026',
    initialAmount: 5000,
    currentBalance: 5000,
    expiryDate: '2027-12-31',
    isActive: true,
    recipientName: 'Valued Client',
    purchasedBy: 'M.SHAHEER VIP Relations'
  },
  {
    id: 'gc-2',
    code: 'GIFT-GOLD-10000',
    initialAmount: 10000,
    currentBalance: 10000,
    expiryDate: '2027-12-31',
    isActive: true,
    recipientName: 'Gold Member',
    purchasedBy: 'VIP Concierge'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  { code: 'WELCOME10', discountPercent: 10, minSpendPKR: 4000, isActive: true },
  { code: 'VIPGOLD', discountPercent: 15, minSpendPKR: 15000, isActive: true },
  { code: 'SHAHEER15', discountPercent: 15, minSpendPKR: 20000, isActive: true }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    productId: 'm-02',
    productName: 'Imperial Hand-Embroidered Kurta Pajama',
    customerName: 'Hamza Tariq',
    rating: 5,
    comment: 'The quality of the raw Egyptian cotton and subtle golden embroidery on the collar is unmatched in Pakistan. Fits like bespoke tailoring!',
    date: '2026-10-20',
    isVerifiedPurchase: true,
    isApproved: true,
  },
  {
    id: 'rev-02',
    productId: 'w-01',
    productName: 'Imperial Zardozi & Tilla Handcrafted Bridal Gharara',
    customerName: 'Ayesha Siddiqui',
    rating: 5,
    comment: 'Ordered this for my sister’s Shendi in Karachi. The craftsmanship, heavy weight of the zardozi, and packaging were pure luxury.',
    date: '2026-10-18',
    isVerifiedPurchase: true,
    isApproved: true,
  },
  {
    id: 'rev-03',
    productId: 'm-01',
    productName: 'Bespoke Double-Breasted Dinner Tuxedo',
    customerName: 'Daniyal Khan',
    rating: 5,
    comment: 'The satin peak lapel and drape of the wool blend are international standard. Received compliments all evening at the annual gala.',
    date: '2026-10-14',
    isVerifiedPurchase: true,
    isApproved: true,
  },
  {
    id: 'rev-04',
    productId: 'c-02',
    productName: 'Girls Golden Shimmer Tulle Party Frock',
    customerName: 'Dr. Fatima Noor',
    rating: 5,
    comment: 'My daughter looked like a princess at her birthday party. The inner lining is genuine soft cotton, completely non-scratchy.',
    date: '2026-10-25',
    isVerifiedPurchase: true,
    isApproved: true,
  }
];

export const INITIAL_NOTIFICATIONS: InAppNotification[] = [
  {
    id: 'notif-1',
    title: 'Order Shipped with Express Tracking',
    message: 'Your order #MSH-94812 is on the way with TCS Express. Expected delivery within 24-48 hours.',
    date: '2026-10-26 09:45',
    read: false,
    type: 'order'
  },
  {
    id: 'notif-2',
    title: 'Gold Elite Tier Privileges Active',
    message: 'Enjoy 10% instant discount across all collections and double reward points on your next purchase.',
    date: '2026-10-20 12:00',
    read: false,
    type: 'vip'
  },
  {
    id: 'notif-3',
    title: 'New Winter Velvet & Silk Drop',
    message: 'Explore our latest winter haute couture line curated by Head Designer M. Shaheer.',
    date: '2026-10-28 15:30',
    read: true,
    type: 'promo'
  }
];
