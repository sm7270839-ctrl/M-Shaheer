import { Product } from '../types';

export const MEN_SUBCATEGORIES = [
  "Men's Shirts",
  "Men's T-Shirts",
  "Men's Jeans",
  "Men's Pants & Trousers",
  "Men's Watches",
  "Men's Shoes",
  "Men's Sandals",
  "Men's Jackets",
  "Men's Traditional Wear",
  "Men's Accessories",
] as const;

export const WOMEN_SUBCATEGORIES = [
  "Women's Dresses",
  "Women's Frocks",
  "Women's Party Wear",
  "Women's Casual Wear",
  "Women's Night Suits",
  "Women's Watches",
  "Women's Shoes",
  "Women's Sandals",
  "Women's Handbags",
  "Women's Accessories",
] as const;

export const CHILDREN_SUBCATEGORIES = [
  "Children's Shirts",
  "Children's T-Shirts",
  "Children's Pants",
  "Children's Jeans",
  "Children's Dresses",
  "Children's Frocks",
  "Children's Watches",
  "Children's Shoes",
  "Children's Sandals",
  "Children's Jackets",
  "Children's Accessories",
] as const;

export const INITIAL_PRODUCTS: Product[] = [
  // ==========================================
  // --- MEN'S INDEPENDENT COLLECTION ---
  // ==========================================
  {
    id: 'm-01',
    name: 'Bespoke Double-Breasted Dinner Tuxedo',
    category: 'men',
    subcategory: "Men's Jackets",
    price: 38500,
    originalPrice: 45000,
    discountPercent: 14,
    images: [
      '/images/men_leather_jacket.jpg',
      '/images/category_men_collection.jpg'
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
    subcategory: "Men's Traditional Wear",
    price: 18900,
    originalPrice: 22500,
    discountPercent: 16,
    images: [
      '/images/men_traditional_kurta.jpg'
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
    subcategory: "Men's Watches",
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
    subcategory: "Men's Shirts",
    price: 8900,
    originalPrice: 10500,
    discountPercent: 15,
    images: [
      '/images/men_formal_shirt.jpg'
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
    subcategory: "Men's T-Shirts",
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
    subcategory: "Men's Pants & Trousers",
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
    subcategory: "Men's Jeans",
    price: 11500,
    originalPrice: 13900,
    discountPercent: 17,
    images: [
      '/images/men_designer_jeans.jpg'
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
    subcategory: "Men's Shoes",
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
    subcategory: "Men's Shoes",
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
    subcategory: "Men's Sandals",
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
    subcategory: "Men's Accessories",
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
    subcategory: "Men's Accessories",
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
    subcategory: "Men's Accessories",
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
  {
    id: 'm-14',
    name: 'Executive Tailored French Cuff Formal Shirt',
    category: 'men',
    subcategory: "Men's Shirts",
    price: 9200,
    originalPrice: 11000,
    discountPercent: 16,
    images: [
      '/images/men_formal_shirt.jpg'
    ],
    rating: 4.9,
    reviewCount: 26,
    sizes: ['15', '15.5', '16', '16.5'],
    colors: [
      { name: 'Pristine White', hex: '#ffffff' }
    ],
    description: 'Crisp two-ply luxury cotton dress shirt engineered for black-tie galas and executive wear, featuring stiffened French cuffs and concealed placket.',
    stock: 20,
    isNewArrival: true,
    fabric: '100% Royal Egyptian Cotton',
    sku: 'MSH-MEN-SH14',
  },
  {
    id: 'm-15',
    name: 'Signature Noir Minimalist Graphic T-Shirt',
    category: 'men',
    subcategory: "Men's T-Shirts",
    price: 4800,
    originalPrice: 5900,
    discountPercent: 19,
    images: [
      '/images/product_men_casual_polo_denim.jpg'
    ],
    rating: 4.8,
    reviewCount: 44,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Carbon Black', hex: '#18181b' }
    ],
    description: 'Ultra-soft combed 220 GSM luxury jersey t-shirt with subtle gold foil embossed M.SHAHEER typography on left chest.',
    stock: 35,
    sku: 'MSH-MEN-TS15',
  },
  {
    id: 'm-16',
    name: 'Handcrafted Lambskin Leather Biker Jacket',
    category: 'men',
    subcategory: "Men's Jackets",
    price: 34500,
    originalPrice: 42000,
    discountPercent: 18,
    images: [
      '/images/men_leather_jacket.jpg'
    ],
    rating: 4.9,
    reviewCount: 33,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Onyx Black', hex: '#111111' }
    ],
    description: 'Sartorial lambskin leather motorcycle jacket with antique brass zippers, diamond-quilted shoulder pads, and breathable cupro lining.',
    stock: 14,
    isFeatured: true,
    fabric: '100% Genuine Lambskin Leather',
    sku: 'MSH-MEN-JK16',
  },

  // ==========================================
  // --- WOMEN'S INDEPENDENT COLLECTION ---
  // ==========================================
  {
    id: 'w-01',
    name: 'Imperial Zardozi & Tilla Handcrafted Bridal Gharara',
    category: 'women',
    subcategory: "Women's Party Wear",
    price: 78000,
    originalPrice: 92000,
    discountPercent: 15,
    images: [
      '/images/women_party_wear.jpg',
      '/images/category_women_collection.jpg'
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
    subcategory: "Women's Casual Wear",
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
    subcategory: "Women's Dresses",
    price: 32000,
    originalPrice: 38000,
    discountPercent: 16,
    images: [
      '/images/product_women_evening_gown_velvet.jpg'
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
    subcategory: "Women's Frocks",
    price: 24500,
    originalPrice: 29000,
    discountPercent: 15,
    images: [
      '/images/women_designer_frock.jpg'
    ],
    rating: 4.9,
    reviewCount: 47,
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Blush Peach', hex: '#fbcfe8' },
      { name: 'Sunlit Pearl', hex: '#fef3c7' }
    ],
    description: '28-kali voluminous silhouette crafted from featherlight sheer silk chiffon with shimmering mirror-work borders and hand-embossed gold neckline.',
    stock: 14,
    fabric: 'Pure Silk Chiffon',
    sku: 'MSH-WOM-FR04',
  },
  {
    id: 'w-05',
    name: 'Handcrafted Structured Leather Top-Handle Bag',
    category: 'women',
    subcategory: "Women's Handbags",
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
    subcategory: "Women's Accessories",
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
    subcategory: "Women's Sandals",
    price: 15500,
    originalPrice: 18000,
    discountPercent: 14,
    images: [
      '/images/women_heels_shoes.jpg'
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
    name: 'Pointed Metallic Trim Leather Mules & Shoes',
    category: 'women',
    subcategory: "Women's Shoes",
    price: 12500,
    originalPrice: 15000,
    discountPercent: 17,
    images: [
      '/images/women_heels_shoes.jpg'
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
    subcategory: "Women's Casual Wear",
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
    subcategory: "Women's Night Suits",
    price: 9800,
    originalPrice: 12500,
    discountPercent: 22,
    images: [
      '/images/women_night_suit.jpg'
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
    name: 'Petite Diamante Rose Gold Mesh Wrist Watch',
    category: 'women',
    subcategory: "Women's Watches",
    price: 34500,
    originalPrice: 40000,
    discountPercent: 14,
    images: [
      '/images/women_luxury_watch.jpg'
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
    subcategory: "Women's Accessories",
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
  {
    id: 'w-13',
    name: 'Royal Emerald Chiffon Hand-Embroidered Dress',
    category: 'women',
    subcategory: "Women's Dresses",
    price: 45000,
    originalPrice: 52000,
    discountPercent: 13,
    images: [
      '/images/women_formal_dress.jpg'
    ],
    rating: 5.0,
    reviewCount: 18,
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Deep Emerald', hex: '#064e3b' }
    ],
    description: 'Opulent Pakistani formal couture gown featuring intricate golden tilla threadwork, scalloped hemline, and heavy embroidered dupatta.',
    stock: 8,
    isNewArrival: true,
    fabric: 'Pure Silk Chiffon',
    sku: 'MSH-WOM-DR13',
  },
  {
    id: 'w-14',
    name: 'Blush Peach Anarkali Hand-Embroidered Frock',
    category: 'women',
    subcategory: "Women's Frocks",
    price: 29500,
    originalPrice: 35000,
    discountPercent: 16,
    images: [
      '/images/women_designer_frock.jpg'
    ],
    rating: 4.9,
    reviewCount: 22,
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Blush Peach', hex: '#fbcfe8' }
    ],
    description: 'Graceful flared Anarkali frock with dense gota patti and zardozi threadwork on bodice, paired with matching raw silk trousers and organza dupatta.',
    stock: 12,
    fabric: 'Pure Georgette & Raw Silk',
    sku: 'MSH-WOM-FR14',
  },

  // ==========================================
  // --- CHILDREN'S INDEPENDENT COLLECTION ---
  // ==========================================
  {
    id: 'c-01',
    name: 'Boys Junior Navy Tailored 3-Piece Tuxedo',
    category: 'children',
    subcategory: "Children's Jackets",
    childGender: 'boys',
    price: 16500,
    originalPrice: 19500,
    discountPercent: 15,
    images: [
      '/images/kids_jacket_hoodie.jpg'
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
    subcategory: "Children's Frocks",
    childGender: 'girls',
    price: 14500,
    originalPrice: 17500,
    discountPercent: 17,
    images: [
      '/images/kids_girls_frock.jpg'
    ],
    rating: 5.0,
    reviewCount: 42,
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y'],
    colors: [
      { name: 'Champagne Gold', hex: '#fef08a' },
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
    name: 'Boys Junior Classic Cotton Button Shirt & Vest',
    category: 'children',
    subcategory: "Children's Shirts",
    childGender: 'boys',
    price: 8500,
    originalPrice: 10500,
    discountPercent: 19,
    images: [
      '/images/kids_boys_shirt.jpg'
    ],
    rating: 4.9,
    reviewCount: 32,
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    colors: [
      { name: 'Pure White & Navy', hex: '#ffffff' }
    ],
    description: 'Crisp white cotton dress shirt paired with a tailored navy waistcoat and satin bow tie for weddings and celebrations.',
    stock: 25,
    isNewArrival: true,
    sku: 'MSH-KID-SH03',
  },
  {
    id: 'c-04',
    name: 'Girls Handcrafted Eid Traditional Dress',
    category: 'children',
    subcategory: "Children's Dresses",
    childGender: 'girls',
    price: 13900,
    originalPrice: 16500,
    discountPercent: 16,
    images: [
      '/images/category_children_collection.jpg',
      '/images/kids_girls_frock.jpg'
    ],
    rating: 4.8,
    reviewCount: 31,
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: [
      { name: 'Golden Ivory', hex: '#fef9c3' },
      { name: 'Ruby Pink', hex: '#e11d48' }
    ],
    description: 'Traditional handcrafted Anarkali dress with golden zari work, churidar pajama and pre-stitched organza dupatta with gota borders.',
    stock: 15,
    sku: 'MSH-KID-AK04',
  },
  {
    id: 'c-05',
    name: 'Boys Formal Oxford Button-Down Shirt',
    category: 'children',
    subcategory: "Children's Shirts",
    childGender: 'boys',
    price: 4500,
    originalPrice: 5500,
    discountPercent: 18,
    images: [
      '/images/kids_boys_shirt.jpg'
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
    name: 'Boys Stretch Chino Pants & Trousers',
    category: 'children',
    subcategory: "Children's Pants",
    childGender: 'boys',
    price: 4800,
    originalPrice: 5800,
    discountPercent: 17,
    images: [
      '/images/kids_jeans_tshirt.jpg'
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
    name: 'Girls Crystal Bow Patent Ballerina Sandals',
    category: 'children',
    subcategory: "Children's Sandals",
    childGender: 'girls',
    price: 6500,
    originalPrice: 7800,
    discountPercent: 17,
    images: [
      '/images/kids_shoes_sneakers.jpg'
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
    name: 'Boys Junior Penny Loafer Formal Shoes',
    category: 'children',
    subcategory: "Children's Shoes",
    childGender: 'boys',
    price: 7900,
    originalPrice: 9500,
    discountPercent: 17,
    images: [
      '/images/kids_shoes_sneakers.jpg'
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
      '/images/kids_smart_watch.jpg'
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
    name: 'Interactive Touchscreen Smartwatch For Kids',
    category: 'children',
    subcategory: "Children's Watches",
    childGender: 'boys',
    price: 8500,
    originalPrice: 10500,
    discountPercent: 19,
    images: [
      '/images/kids_smart_watch.jpg'
    ],
    rating: 4.9,
    reviewCount: 38,
    sizes: ['Adjustable Strap'],
    colors: [
      { name: 'Midnight Navy & Gold', hex: '#0f172a' }
    ],
    description: 'Modern touchscreen smartwatch for boys and girls with activity tracking, games, durable silicone casing, and long battery life.',
    stock: 25,
    sku: 'MSH-KID-SW10',
  },
  {
    id: 'c-11',
    name: 'Junior Adventure Graphic Cotton T-Shirt',
    category: 'children',
    subcategory: "Children's T-Shirts",
    childGender: 'boys',
    price: 3600,
    originalPrice: 4500,
    discountPercent: 20,
    images: [
      '/images/kids_jeans_tshirt.jpg'
    ],
    rating: 4.8,
    reviewCount: 29,
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: [
      { name: 'Charcoal Mountain', hex: '#334155' }
    ],
    description: 'Super-soft 100% organic cotton graphic tee with ribbed crewneck, pre-washed for zero shrinkage and skin sensitivity.',
    stock: 35,
    sku: 'MSH-KID-TS11',
  },
  {
    id: 'c-12',
    name: 'Kids Flex-Stretch Dark Indigo Jeans',
    category: 'children',
    subcategory: "Children's Jeans",
    childGender: 'boys',
    price: 5200,
    originalPrice: 6500,
    discountPercent: 20,
    images: [
      '/images/kids_jeans_tshirt.jpg'
    ],
    rating: 4.9,
    reviewCount: 42,
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
    colors: [
      { name: 'Dark Indigo', hex: '#1e3a8a' }
    ],
    description: 'Premium soft stretch denim with adjustable hidden waistband elastic, roll-up contrast cuffs, and copper rivets.',
    stock: 30,
    sku: 'MSH-KID-JN12',
  },
  {
    id: 'c-13',
    name: 'Junior Padded Quilted Winter Bomber Jacket',
    category: 'children',
    subcategory: "Children's Jackets",
    childGender: 'boys',
    price: 12500,
    originalPrice: 15000,
    discountPercent: 17,
    images: [
      '/images/kids_jacket_hoodie.jpg'
    ],
    rating: 5.0,
    reviewCount: 24,
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: [
      { name: 'Navy & Gold', hex: '#0f172a' }
    ],
    description: 'Heavy winter warm padded bomber with sherpa fleece hood lining, gold zipper hardware, and embroidered crest emblem.',
    stock: 18,
    sku: 'MSH-KID-JK13',
  },
  {
    id: 'c-14',
    name: 'Kids Calfskin Leather White Sneakers',
    category: 'children',
    subcategory: "Children's Shoes",
    childGender: 'boys',
    price: 7500,
    originalPrice: 9000,
    discountPercent: 17,
    images: [
      '/images/kids_shoes_sneakers.jpg'
    ],
    rating: 4.9,
    reviewCount: 31,
    sizes: ['26', '28', '30', '32', '34'],
    colors: [
      { name: 'White & Gold', hex: '#ffffff' }
    ],
    description: 'Pure white calfskin leather sneakers with metallic gold heel tab and tongue crest, cushioned insole, and non-slip rubber sole.',
    stock: 22,
    sku: 'MSH-KID-SN14',
  },
  {
    id: 'c-15',
    name: 'Embossed Monogram Velvet Kids Backpack & Accessories',
    category: 'children',
    subcategory: "Children's Accessories",
    childGender: 'girls',
    price: 6800,
    originalPrice: 8200,
    discountPercent: 17,
    images: [
      '/images/kids_smart_watch.jpg'
    ],
    rating: 5.0,
    reviewCount: 38,
    sizes: ['Standard Kids'],
    colors: [
      { name: 'Emerald Velvet', hex: '#064e3b' }
    ],
    description: 'Plush quilted velvet with gold metallic zipper pulls, padded ergonomic shoulder straps, water-repellent interior lining.',
    stock: 25,
    sku: 'MSH-KID-BP15',
  },

  // ==========================================
  // --- VIP ARCHIVE COLLECTION (Platinum & Gold locked) ---
  // ==========================================
  {
    id: 'vip-01',
    name: 'Platinum Sovereign 24K Gold Thread Sherwani',
    category: 'men',
    subcategory: "Men's Traditional Wear",
    price: 95000,
    originalPrice: 110000,
    discountPercent: 14,
    images: [
      '/images/men_traditional_kurta.jpg',
      '/images/hero_luxury_fashion_banner.jpg'
    ],
    rating: 5.0,
    reviewCount: 14,
    sizes: ['38R', '40R', '42R', 'Bespoke'],
    colors: [
      { name: 'Imperial Gold & Ivory', hex: '#d4af37' }
    ],
    description: 'Strictly reserved for Platinum VIP members. Hand-woven brocade spun with authentic 24K electroplated gold threads, natural seed pearl embroidery, and bespoke tailoring fitting with Master Couturier M. Shaheer.',
    stock: 4,
    isVipExclusive: true,
    minVipTier: 'Platinum',
    fabric: 'Authentic 24K Zari & Pure Raw Silk',
    sku: 'MSH-VIP-SH01',
  },
  {
    id: 'vip-02',
    name: 'Sovereign Diamond & Gold Tourbillon Chronometer',
    category: 'men',
    subcategory: "Men's Watches",
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
    subcategory: "Women's Dresses",
    price: 115000,
    originalPrice: 135000,
    discountPercent: 15,
    images: [
      '/images/product_women_evening_gown_velvet.jpg',
      '/images/women_formal_dress.jpg'
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
