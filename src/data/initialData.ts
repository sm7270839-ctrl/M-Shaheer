import { VipTierConfig, CustomerUser, Order, GiftCard, Review, Coupon, HomepageConfig, InAppNotification } from '../types';
import { INITIAL_PRODUCTS } from './products';
export * from './products';

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
    discount: 2870,
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
