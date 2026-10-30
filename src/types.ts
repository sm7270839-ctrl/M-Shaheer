export type CategoryType = 'men' | 'women' | 'children';
export type SubcategoryType = string;

export type VipTierLevel = 'Silver' | 'Gold' | 'Platinum';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryType;
  subcategory: SubcategoryType;
  childGender?: 'boys' | 'girls';
  price: number; // PKR
  originalPrice?: number;
  discountPercent?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  sizes: string[];
  colors: ProductColor[];
  description: string;
  stock: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isSale?: boolean;
  isVipExclusive?: boolean;
  minVipTier?: VipTierLevel;
  fabric?: string;
  sku?: string;
}

export interface CartItem {
  id: string; // composite: productId-size-color
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface VipTierConfig {
  id: VipTierLevel;
  name: string;
  badge: string;
  discountPercent: number;
  pointsMultiplier: number;
  perks: string[];
  minSpendPKR: number;
  cardTheme: string;
}

export interface RewardPointsLog {
  id: string;
  date: string;
  amount: number;
  reason: string;
  type: 'earned' | 'redeemed' | 'adjusted';
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  vipTier: VipTierLevel;
  rewardPoints: number;
  pointsHistory: RewardPointsLog[];
  memberSince: string;
  membershipCardNumber: string;
  savedAddresses?: { id: string; label: string; address: string; city: string; phone: string }[];
}

export type OrderStatus =
  | 'Order Placed'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export interface OrderTimelineItem {
  status: OrderStatus;
  timestamp: string;
  note: string;
}

export interface Order {
  id: string;
  trackingNumber: string;
  date: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    city: string;
    address: string;
  };
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryCharges: number;
  pointsDiscount: number;
  giftCardDiscount: number;
  total: number;
  paymentMethod: 'Cash on Delivery' | 'Direct Bank Transfer' | 'Credit/Debit Card (Ready)';
  status: OrderStatus;
  statusTimeline: OrderTimelineItem[];
}

export interface GiftCard {
  id: string;
  code: string;
  initialAmount: number;
  currentBalance: number;
  expiryDate: string;
  isActive: boolean;
  recipientName?: string;
  recipientEmail?: string;
  purchasedBy?: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  isVerifiedPurchase: boolean;
  isApproved: boolean;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minSpendPKR: number;
  isActive: boolean;
}

export interface HomepageConfig {
  announcementText: string;
  heroHeadline: string;
  heroSubtext: string;
  heroCtaText: string;
  heroBannerImage: string;
  menBannerImage: string;
  womenBannerImage: string;
  childrenBannerImage: string;
  vipHeadline: string;
  vipSubtext: string;
  storePhone: string;
  storeWhatsApp: string;
  storeEmail: string;
  storeAddress: string;
}

export interface InAppNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'order' | 'promo' | 'vip' | 'points' | 'alert';
}
