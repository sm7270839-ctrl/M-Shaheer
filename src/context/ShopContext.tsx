import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  CartItem,
  VipTierConfig,
  CustomerUser,
  Order,
  OrderStatus,
  GiftCard,
  Review,
  Coupon,
  HomepageConfig,
  InAppNotification,
  VipTierLevel,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_VIP_TIERS,
  INITIAL_USER,
  INITIAL_ORDERS,
  INITIAL_GIFT_CARDS,
  INITIAL_COUPONS,
  INITIAL_REVIEWS,
  INITIAL_NOTIFICATIONS,
  INITIAL_HOMEPAGE_CONFIG,
} from '../data/initialData';

export type AppView =
  | 'home'
  | 'men'
  | 'women'
  | 'children'
  | 'vip'
  | 'sale'
  | 'new-arrivals'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'account'
  | 'orders'
  | 'wishlist'
  | 'track-order'
  | 'gift-cards'
  | 'about'
  | 'contact'
  | 'faq'
  | 'terms'
  | 'privacy'
  | 'admin'
  | 'guide';

interface ShopContextType {
  // Navigation & Views
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  selectedProductId: string | null;
  openProduct: (id: string) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (p: Product | null) => void;
  activeSubcategoryFilter: string | null;
  setActiveSubcategoryFilter: (sub: string | null) => void;
  activeGenderFilter: 'all' | 'boys' | 'girls';
  setActiveGenderFilter: (g: 'all' | 'boys' | 'girls') => void;

  // Catalog
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => Product;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, selectedSize: string, selectedColor: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  isWishlistDrawerOpen: boolean;
  setIsWishlistDrawerOpen: (open: boolean) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Customer & VIP
  user: CustomerUser;
  updateUserProfile: (data: Partial<CustomerUser>) => void;
  vipTiers: VipTierConfig[];
  updateVipTierConfig: (tier: VipTierConfig) => void;
  upgradeUserVipTier: (tier: VipTierLevel) => void;
  adjustUserRewardPoints: (amount: number, reason: string, type: 'earned' | 'redeemed' | 'adjusted') => void;

  // Orders
  orders: Order[];
  createOrder: (orderPayload: {
    customer: { name: string; phone: string; email: string; city: string; address: string };
    paymentMethod: 'Cash on Delivery' | 'Direct Bank Transfer' | 'Credit/Debit Card (Ready)';
    couponCode?: string;
    pointsToRedeem?: number;
    giftCardCode?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;

  // Coupons & Gift Cards
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  giftCards: GiftCard[];
  purchaseGiftCard: (amount: number, recipientName?: string, recipientEmail?: string) => GiftCard;
  verifyGiftCard: (code: string) => GiftCard | null;
  toggleGiftCardActive: (code: string) => void;

  // Reviews
  reviews: Review[];
  addReview: (productId: string, rating: number, comment: string, customerName?: string) => void;
  approveReview: (reviewId: string, isApproved: boolean) => void;
  deleteReview: (reviewId: string) => void;

  // Homepage Config
  homepageConfig: HomepageConfig;
  updateHomepageConfig: (config: Partial<HomepageConfig>) => void;

  // Notifications
  notifications: InAppNotification[];
  markNotificationRead: (id: string) => void;
  addNotification: (title: string, message: string, type?: InAppNotification['type']) => void;

  // Admin
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (logged: boolean) => void;

  // Feedback Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(`mshaheer_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error loading ${key} from storage:`, e);
    return fallback;
  }
}

function saveStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`mshaheer_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation
  const [activeView, setActiveView] = useState<AppView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeSubcategoryFilter, setActiveSubcategoryFilter] = useState<string | null>(null);
  const [activeGenderFilter, setActiveGenderFilter] = useState<'all' | 'boys' | 'girls'>('all');

  // Drawers & Modals
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3500);
  };

  // State with LocalStorage sync
  const [products, setProducts] = useState<Product[]>(() =>
    loadStorage('products', INITIAL_PRODUCTS)
  );
  useEffect(() => saveStorage('products', products), [products]);

  const [cart, setCart] = useState<CartItem[]>(() =>
    loadStorage('cart', [])
  );
  useEffect(() => saveStorage('cart', cart), [cart]);

  const [wishlist, setWishlist] = useState<string[]>(() =>
    loadStorage('wishlist', ['m-02', 'w-01'])
  );
  useEffect(() => saveStorage('wishlist', wishlist), [wishlist]);

  const [vipTiers, setVipTiers] = useState<VipTierConfig[]>(() =>
    loadStorage('vipTiers', INITIAL_VIP_TIERS)
  );
  useEffect(() => saveStorage('vipTiers', vipTiers), [vipTiers]);

  const [user, setUser] = useState<CustomerUser>(() =>
    loadStorage('user', INITIAL_USER)
  );
  useEffect(() => saveStorage('user', user), [user]);

  const [orders, setOrders] = useState<Order[]>(() =>
    loadStorage('orders', INITIAL_ORDERS)
  );
  useEffect(() => saveStorage('orders', orders), [orders]);

  const [giftCards, setGiftCards] = useState<GiftCard[]>(() =>
    loadStorage('giftCards', INITIAL_GIFT_CARDS)
  );
  useEffect(() => saveStorage('giftCards', giftCards), [giftCards]);

  const [coupons, setCoupons] = useState<Coupon[]>(() =>
    loadStorage('coupons', INITIAL_COUPONS)
  );
  useEffect(() => saveStorage('coupons', coupons), [coupons]);

  const [reviews, setReviews] = useState<Review[]>(() =>
    loadStorage('reviews', INITIAL_REVIEWS)
  );
  useEffect(() => saveStorage('reviews', reviews), [reviews]);

  const [homepageConfig, setHomepageConfig] = useState<HomepageConfig>(() =>
    loadStorage('homepageConfig', INITIAL_HOMEPAGE_CONFIG)
  );
  useEffect(() => saveStorage('homepageConfig', homepageConfig), [homepageConfig]);

  const [notifications, setNotifications] = useState<InAppNotification[]>(() =>
    loadStorage('notifications', INITIAL_NOTIFICATIONS)
  );
  useEffect(() => saveStorage('notifications', notifications), [notifications]);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() =>
    loadStorage('isAdminLoggedIn', false)
  );
  useEffect(() => saveStorage('isAdminLoggedIn', isAdminLoggedIn), [isAdminLoggedIn]);

  // Actions
  const openProduct = (id: string) => {
    setSelectedProductId(id);
    setActiveView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addProduct = (prodData: Omit<Product, 'id' | 'rating' | 'reviewCount'>): Product => {
    const newProduct: Product = {
      ...prodData,
      id: `p-${Date.now()}`,
      rating: 5.0,
      reviewCount: 0,
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Product "${newProduct.name}" added successfully.`);
    return newProduct;
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    showToast(`Product updated successfully.`);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast(`Product deleted from catalog.`);
  };

  // Cart Handlers
  const addToCart = (product: Product, selectedSize: string, selectedColor: string, quantity = 1) => {
    const cartItemId = `${product.id}-${selectedSize}-${selectedColor}`;
    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: cartItemId, product, selectedSize, selectedColor, quantity }];
    });
    showToast(`Added "${product.name}" to cart.`);
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Wishlist Handlers
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed item from Wishlist.');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved item to Wishlist.');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // User Profile & VIP
  const updateUserProfile = (data: Partial<CustomerUser>) => {
    setUser(prev => ({ ...prev, ...data }));
    showToast('Customer profile updated.');
  };

  const updateVipTierConfig = (tier: VipTierConfig) => {
    setVipTiers(prev => prev.map(t => (t.id === tier.id ? tier : t)));
    showToast(`VIP Tier ${tier.name} configured.`);
  };

  const upgradeUserVipTier = (tier: VipTierLevel) => {
    setUser(prev => ({ ...prev, vipTier: tier }));
    addNotification('VIP Tier Upgraded!', `Congratulations! You are now an active ${tier} VIP Club member.`, 'vip');
    showToast(`VIP Tier upgraded to ${tier}.`);
  };

  const adjustUserRewardPoints = (amount: number, reason: string, type: 'earned' | 'redeemed' | 'adjusted') => {
    setUser(prev => {
      const newPoints = Math.max(0, prev.rewardPoints + (type === 'redeemed' ? -amount : amount));
      const newLog = {
        id: `pt-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        amount,
        reason,
        type,
      };
      return {
        ...prev,
        rewardPoints: newPoints,
        pointsHistory: [newLog, ...prev.pointsHistory],
      };
    });
    addNotification(
      'Reward Points Updated',
      `${type === 'redeemed' ? '-' : '+'}${amount} Reward Points: ${reason}`,
      'points'
    );
    showToast(`Reward points updated (${type === 'redeemed' ? '-' : '+'}${amount}).`);
  };

  // Orders
  const createOrder = ({
    customer,
    paymentMethod,
    couponCode,
    pointsToRedeem = 0,
    giftCardCode,
  }: {
    customer: { name: string; phone: string; email: string; city: string; address: string };
    paymentMethod: 'Cash on Delivery' | 'Direct Bank Transfer' | 'Credit/Debit Card (Ready)';
    couponCode?: string;
    pointsToRedeem?: number;
    giftCardCode?: string;
  }): Order => {
    const subtotal = cartSubtotal;

    // Calculate VIP Tier discount
    const currentTier = vipTiers.find(t => t.id === user.vipTier);
    const tierDiscountPercent = currentTier ? currentTier.discountPercent : 0;
    let discount = Math.round((subtotal * tierDiscountPercent) / 100);

    // Coupon discount if applied
    if (couponCode) {
      const foundCoupon = coupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase() && c.isActive);
      if (foundCoupon && subtotal >= foundCoupon.minSpendPKR) {
        const couponDisc = Math.round((subtotal * foundCoupon.discountPercent) / 100);
        discount = Math.max(discount, couponDisc);
      }
    }

    // Points discount (100 points = PKR 500 discount)
    const pointsDiscount = Math.min(Math.floor(pointsToRedeem / 100) * 500, subtotal - discount);

    // Delivery charges (complimentary if subtotal > 5000, else PKR 250)
    const deliveryCharges = subtotal >= 5000 ? 0 : 250;

    // Gift card discount
    let giftCardDiscount = 0;
    if (giftCardCode) {
      const gc = giftCards.find(g => g.code.toUpperCase() === giftCardCode.toUpperCase() && g.isActive);
      if (gc && gc.currentBalance > 0) {
        giftCardDiscount = Math.min(gc.currentBalance, subtotal - discount - pointsDiscount + deliveryCharges);
        // deduct from gift card
        setGiftCards(prev =>
          prev.map(g =>
            g.code === gc.code
              ? { ...g, currentBalance: g.currentBalance - giftCardDiscount }
              : g
          )
        );
      }
    }

    const total = Math.max(0, subtotal - discount - pointsDiscount + deliveryCharges - giftCardDiscount);

    // Order ID
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderId = `MSH-${randomSuffix}`;
    const trackingNumber = `TRK-PK-${randomSuffix}9`;
    const today = new Date().toISOString().split('T')[0];

    const newOrder: Order = {
      id: orderId,
      trackingNumber,
      date: today,
      customer,
      items: [...cart],
      subtotal,
      discount,
      deliveryCharges,
      pointsDiscount,
      giftCardDiscount,
      total,
      paymentMethod,
      status: 'Order Placed',
      statusTimeline: [
        {
          status: 'Order Placed',
          timestamp: `${today} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          note: `Order registered successfully. Payment: ${paymentMethod}.`,
        },
      ],
    };

    setOrders(prev => [newOrder, ...prev]);

    // Points earned calculation (1 point per 100 PKR * multiplier)
    const multiplier = currentTier ? currentTier.pointsMultiplier : 1.0;
    const pointsEarned = Math.floor((total / 100) * multiplier);
    if (pointsEarned > 0) {
      adjustUserRewardPoints(pointsEarned, `Earned from Order #${orderId}`, 'earned');
    }

    // If points were redeemed, deduct
    if (pointsToRedeem > 0) {
      adjustUserRewardPoints(pointsToRedeem, `Redeemed on Order #${orderId}`, 'redeemed');
    }

    // Add In-App notification
    addNotification(
      `Order Confirmed (#${orderId})`,
      `Thank you for shopping at M.SHAHEER! Your order has been registered for delivery in ${customer.city}.`,
      'order'
    );

    // Clear cart
    clearCart();

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    const today = new Date().toISOString().split('T')[0];
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          const newTimelineItem = {
            status,
            timestamp: `${today} ${time}`,
            note: note || `Order updated to ${status}.`,
          };
          return {
            ...o,
            status,
            statusTimeline: [newTimelineItem, ...o.statusTimeline],
          };
        }
        return o;
      })
    );
    addNotification(
      `Order ${orderId} Status Updated`,
      `Your order is now: ${status}.`,
      'order'
    );
    showToast(`Order ${orderId} status changed to ${status}.`);
  };

  // Coupons & Gift Cards
  const addCoupon = (coupon: Coupon) => {
    setCoupons(prev => [coupon, ...prev.filter(c => c.code !== coupon.code)]);
    showToast(`Coupon ${coupon.code} added.`);
  };

  const purchaseGiftCard = (amount: number, recipientName = 'Valued Guest', recipientEmail = '') => {
    const randomCode = `GIFT-MSH-${Math.floor(1000 + Math.random() * 9000)}`;
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    const newGc: GiftCard = {
      id: `gc-${Date.now()}`,
      code: randomCode,
      initialAmount: amount,
      currentBalance: amount,
      expiryDate: nextYear.toISOString().split('T')[0],
      isActive: true,
      recipientName,
      recipientEmail,
      purchasedBy: user.name,
    };
    setGiftCards(prev => [newGc, ...prev]);
    showToast(`Gift card ${randomCode} generated with balance PKR ${amount.toLocaleString()}.`);
    return newGc;
  };

  const verifyGiftCard = (code: string) => {
    const found = giftCards.find(g => g.code.toUpperCase() === code.trim().toUpperCase() && g.isActive);
    return found || null;
  };

  const toggleGiftCardActive = (code: string) => {
    setGiftCards(prev =>
      prev.map(g => (g.code === code ? { ...g, isActive: !g.isActive } : g))
    );
    showToast(`Gift card status updated.`);
  };

  // Reviews
  const addReview = (productId: string, rating: number, comment: string, customerName = user.name) => {
    const prod = products.find(p => p.id === productId);
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId,
      productName: prod ? prod.name : 'M.SHAHEER Item',
      customerName,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      isVerifiedPurchase: true,
      isApproved: true,
    };
    setReviews(prev => [newRev, ...prev]);
    // update product rating & review count
    if (prod) {
      const prodReviews = [...reviews.filter(r => r.productId === productId && r.isApproved), newRev];
      const avg = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
      updateProduct({
        ...prod,
        rating: Number(avg.toFixed(1)),
        reviewCount: prodReviews.length,
      });
    }
    showToast('Thank you! Your verified review has been published.');
  };

  const approveReview = (reviewId: string, isApproved: boolean) => {
    setReviews(prev => prev.map(r => (r.id === reviewId ? { ...r, isApproved } : r)));
    showToast(`Review approval status updated.`);
  };

  const deleteReview = (reviewId: string) => {
    setReviews(prev => prev.filter(r => r.id !== reviewId));
    showToast(`Review removed.`);
  };

  // Homepage Config
  const updateHomepageConfig = (config: Partial<HomepageConfig>) => {
    setHomepageConfig(prev => ({ ...prev, ...config }));
    showToast('Store homepage & contact info updated.');
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const addNotification = (title: string, message: string, type: InAppNotification['type'] = 'alert') => {
    const newNotif: InAppNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      date: `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      read: false,
      type,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  return (
    <ShopContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedProductId,
        openProduct,
        quickViewProduct,
        setQuickViewProduct,
        activeSubcategoryFilter,
        setActiveSubcategoryFilter,
        activeGenderFilter,
        setActiveGenderFilter,

        products,
        addProduct,
        updateProduct,
        deleteProduct,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartDrawerOpen,
        setIsCartDrawerOpen,

        wishlist,
        toggleWishlist,
        isWishlisted,
        isWishlistDrawerOpen,
        setIsWishlistDrawerOpen,

        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,

        user,
        updateUserProfile,
        vipTiers,
        updateVipTierConfig,
        upgradeUserVipTier,
        adjustUserRewardPoints,

        orders,
        createOrder,
        updateOrderStatus,

        coupons,
        addCoupon,
        giftCards,
        purchaseGiftCard,
        verifyGiftCard,
        toggleGiftCardActive,

        reviews,
        addReview,
        approveReview,
        deleteReview,

        homepageConfig,
        updateHomepageConfig,

        notifications,
        markNotificationRead,
        addNotification,

        isAdminLoggedIn,
        setIsAdminLoggedIn,

        toastMessage,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
