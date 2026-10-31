import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Shield,
  Package,
  ShoppingBag,
  Crown,
  Tag,
  Gift,
  Settings,
  Star,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Lock,
  Unlock,
  Eye,
  LogOut,
  RefreshCw,
  Search
} from 'lucide-react';
import { Product, OrderStatus, CategoryType, VipTierLevel } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const AdminDashboardView: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    vipTiers,
    updateVipTierConfig,
    user,
    adjustUserRewardPoints,
    coupons,
    addCoupon,
    giftCards,
    toggleGiftCardActive,
    reviews,
    approveReview,
    deleteReview,
    homepageConfig,
    updateHomepageConfig,
    isAdminLoggedIn,
    setIsAdminLoggedIn,
    showToast,
  } = useShop();

  // Authentication State
  const [adminEmail, setAdminEmail] = useState('admin@shaheer.pk');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab in Admin
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'vip' | 'coupons' | 'homepage' | 'reviews'>('overview');

  // Product Add / Edit Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<CategoryType>('men');
  const [formSubcategory, setFormSubcategory] = useState('Shirts');
  const [formPrice, setFormPrice] = useState<number>(8500);
  const [formOriginalPrice, setFormOriginalPrice] = useState<number>(10000);
  const [formStock, setFormStock] = useState<number>(20);
  const [formDescription, setFormDescription] = useState('');
  const [formSizes, setFormSizes] = useState('S, M, L, XL');
  const [formColors, setFormColors] = useState('Noir Black (#111111), Royal Gold (#d4af37)');
  const [formImages, setFormImages] = useState('/src/assets/images/category_men_collection_1793383735508.jpg');
  const [formFabric, setFormFabric] = useState('100% Egyptian Cotton');
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [formIsNewArrival, setFormIsNewArrival] = useState(false);
  const [formIsBestSeller, setFormIsBestSeller] = useState(false);
  const [formIsVipExclusive, setFormIsVipExclusive] = useState(false);
  const [formMinVipTier, setFormMinVipTier] = useState<VipTierLevel>('Gold');

  // Points Adjustment Form
  const [pointsAdjustAmt, setPointsAdjustAmt] = useState<number>(250);
  const [pointsReason, setPointsReason] = useState('VIP loyalty bonus adjustment');
  const [pointsType, setPointsType] = useState<'earned' | 'adjusted'>('adjusted');

  // Coupon Creation Form
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState<number>(10);
  const [newCouponMinSpend, setNewCouponMinSpend] = useState<number>(5000);

  // Homepage Config Form
  const [hpAnnouncement, setHpAnnouncement] = useState(homepageConfig.announcementText);
  const [hpHeroHeadline, setHpHeroHeadline] = useState(homepageConfig.heroHeadline);
  const [hpHeroSubtext, setHpHeroSubtext] = useState(homepageConfig.heroSubtext);
  const [hpPhone, setHpPhone] = useState(homepageConfig.storePhone);
  const [hpAddress, setHpAddress] = useState(homepageConfig.storeAddress);

  // Filter in Product list
  const [productSearch, setProductSearch] = useState('');

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminEmail === 'admin@shaheer.pk' && (adminPassword === 'ShaheerAdmin2026' || adminPassword === 'admin')) {
      setIsAdminLoggedIn(true);
      setAuthError('');
      showToast('Welcome, Administrator. M.SHAHEER Control Panel is active.');
    } else {
      setAuthError('Invalid administrator credentials. Try demo credentials provided below.');
    }
  };

  const handleDemoLogin = () => {
    setAdminEmail('admin@shaheer.pk');
    setAdminPassword('ShaheerAdmin2026');
    setIsAdminLoggedIn(true);
    setAuthError('');
    showToast('Demo Administrator session authorized.');
  };

  // Open Add Product
  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setFormName('');
    setFormCategory('men');
    setFormSubcategory('Shirts');
    setFormPrice(9500);
    setFormOriginalPrice(11500);
    setFormStock(25);
    setFormDescription('Finely woven luxury fabric featuring impeccable hand-finished tailoring.');
    setFormSizes('S, M, L, XL');
    setFormColors('Classic Black (#18181b), Pure White (#ffffff)');
    setFormImages('/images/category_men_collection.jpg');
    setFormFabric('Egyptian Cotton & Silk');
    setFormIsFeatured(true);
    setFormIsNewArrival(true);
    setFormIsBestSeller(false);
    setFormIsVipExclusive(false);
    setFormMinVipTier('Gold');
    setIsProductModalOpen(true);
  };

  // Open Edit Product
  const handleOpenEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setFormName(prod.name);
    setFormCategory(prod.category);
    setFormSubcategory(prod.subcategory);
    setFormPrice(prod.price);
    setFormOriginalPrice(prod.originalPrice || prod.price);
    setFormStock(prod.stock);
    setFormDescription(prod.description);
    setFormSizes(prod.sizes.join(', '));
    setFormColors(prod.colors.map(c => `${c.name} (${c.hex})`).join(', '));
    setFormImages(prod.images.join(', '));
    setFormFabric(prod.fabric || '');
    setFormIsFeatured(!!prod.isFeatured);
    setFormIsNewArrival(!!prod.isNewArrival);
    setFormIsBestSeller(!!prod.isBestSeller);
    setFormIsVipExclusive(!!prod.isVipExclusive);
    setFormMinVipTier(prod.minVipTier || 'Gold');
    setIsProductModalOpen(true);
  };

  // Save Product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    // Parse colors
    const colorsParsed = formColors.split(',').map(item => {
      const parts = item.trim().match(/^(.*?)(?:\s*\((.*?)\))?$/);
      const name = parts ? parts[1].trim() : item.trim();
      const hex = parts && parts[2] ? parts[2].trim() : '#d4af37';
      return { name, hex };
    });

    const sizesParsed = formSizes.split(',').map(s => s.trim()).filter(Boolean);
    const imagesParsed = formImages.split(',').map(i => i.trim()).filter(Boolean);

    const discount =
      formOriginalPrice > formPrice
        ? Math.round(((formOriginalPrice - formPrice) / formOriginalPrice) * 100)
        : undefined;

    if (editingProductId) {
      const existing = products.find(p => p.id === editingProductId);
      if (existing) {
        updateProduct({
          ...existing,
          name: formName,
          category: formCategory,
          subcategory: formSubcategory,
          price: formPrice,
          originalPrice: formOriginalPrice,
          discountPercent: discount,
          stock: formStock,
          description: formDescription,
          sizes: sizesParsed,
          colors: colorsParsed,
          images: imagesParsed.length ? imagesParsed : existing.images,
          fabric: formFabric,
          isFeatured: formIsFeatured,
          isNewArrival: formIsNewArrival,
          isBestSeller: formIsBestSeller,
          isVipExclusive: formIsVipExclusive,
          minVipTier: formMinVipTier,
        });
      }
    } else {
      addProduct({
        name: formName,
        category: formCategory,
        subcategory: formSubcategory,
        price: formPrice,
        originalPrice: formOriginalPrice,
        discountPercent: discount,
        stock: formStock,
        description: formDescription,
        sizes: sizesParsed,
        colors: colorsParsed,
        images: imagesParsed.length ? imagesParsed : ['/src/assets/images/category_men_collection_1793383735508.jpg'],
        fabric: formFabric,
        isFeatured: formIsFeatured,
        isNewArrival: formIsNewArrival,
        isBestSeller: formIsBestSeller,
        isVipExclusive: formIsVipExclusive,
        minVipTier: formMinVipTier,
      });
    }

    setIsProductModalOpen(false);
  };

  // Save Homepage Settings
  const handleSaveHomepage = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomepageConfig({
      announcementText: hpAnnouncement,
      heroHeadline: hpHeroHeadline,
      heroSubtext: hpHeroSubtext,
      storePhone: hpPhone,
      storeAddress: hpAddress,
    });
  };

  // Add Coupon
  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    addCoupon({
      code: newCouponCode.trim().toUpperCase(),
      discountPercent: newCouponDiscount,
      minSpendPKR: newCouponMinSpend,
      isActive: true,
    });
    setNewCouponCode('');
  };

  // Adjust Customer Points
  const handleAdjustPoints = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pointsAdjustAmt || !pointsReason.trim()) return;
    adjustUserRewardPoints(pointsAdjustAmt, pointsReason.trim(), pointsType);
  };

  // Sales Statistics Calculation
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalItemsSold = orders.reduce((sum, o) => sum + o.items.reduce((acc, i) => acc + i.quantity, 0), 0);
  const lowStockCount = products.filter(p => p.stock < 10).length;

  // Filtered Products for Table
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.subcategory.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  // If Not Logged In, Render Secure Admin Gate
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md p-8 bg-neutral-900 border border-neutral-800 rounded-xl space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full flex items-center justify-center mx-auto">
              <Shield size={24} />
            </div>
            <h2 className="font-serif text-2xl font-bold tracking-wider text-neutral-100">
              M.SHAHEER Admin Portal
            </h2>
            <p className="text-xs text-neutral-400">
              Restricted management gateway for catalogue, inventory & VIP privileges.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-rose-950/80 border border-rose-800 text-rose-300 text-xs rounded">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                Security Password
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors rounded cursor-pointer"
            >
              Authenticate & Enter
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="pt-4 border-t border-neutral-800 text-center space-y-2">
            <p className="text-[11px] text-neutral-500">
              Developer Demo Credentials: <span className="font-mono text-neutral-300">admin@shaheer.pk / ShaheerAdmin2026</span>
            </p>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="text-xs text-amber-400 hover:underline font-medium"
            >
              1-Click Demo Admin Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest">
            <Shield size={14} />
            <span>M.SHAHEER Administrative Control Centre</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-neutral-100 mt-1">
            Store Management Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleOpenAddProduct()}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 rounded cursor-pointer"
          >
            <Plus size={15} />
            <span>Add New Product</span>
          </button>

          <button
            onClick={() => {
              setIsAdminLoggedIn(false);
              showToast('Admin logged out.');
            }}
            className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white text-xs font-medium rounded transition-colors flex items-center gap-1"
            title="Log Out"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-800 overflow-x-auto no-scrollbar pb-1 text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-medium uppercase tracking-wider rounded-t transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-neutral-900 text-amber-400 border-b-2 border-amber-400'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <TrendingUp size={14} />
          <span>Sales & Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 font-medium uppercase tracking-wider rounded-t transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'products'
              ? 'bg-neutral-900 text-amber-400 border-b-2 border-amber-400'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Package size={14} />
          <span>Products ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 font-medium uppercase tracking-wider rounded-t transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'orders'
              ? 'bg-neutral-900 text-amber-400 border-b-2 border-amber-400'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <ShoppingBag size={14} />
          <span>Orders & COD ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('vip')}
          className={`px-4 py-2 font-medium uppercase tracking-wider rounded-t transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'vip'
              ? 'bg-neutral-900 text-amber-400 border-b-2 border-amber-400'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Crown size={14} />
          <span>VIP & Rewards</span>
        </button>

        <button
          onClick={() => setActiveTab('coupons')}
          className={`px-4 py-2 font-medium uppercase tracking-wider rounded-t transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'coupons'
              ? 'bg-neutral-900 text-amber-400 border-b-2 border-amber-400'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Tag size={14} />
          <span>Vouchers & Gift Cards</span>
        </button>

        <button
          onClick={() => setActiveTab('homepage')}
          className={`px-4 py-2 font-medium uppercase tracking-wider rounded-t transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'homepage'
              ? 'bg-neutral-900 text-amber-400 border-b-2 border-amber-400'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Settings size={14} />
          <span>Homepage & Banners</span>
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2 font-medium uppercase tracking-wider rounded-t transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'reviews'
              ? 'bg-neutral-900 text-amber-400 border-b-2 border-amber-400'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Star size={14} />
          <span>Reviews ({reviews.length})</span>
        </button>
      </div>

      {/* 3. Tab Contents */}

      {/* --- TAB: OVERVIEW & ANALYTICS --- */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-5 bg-neutral-900/80 border border-neutral-800 rounded-lg">
              <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">Total Sales Revenue</span>
              <div className="font-mono text-xl sm:text-2xl font-bold text-amber-300 mt-1">
                PKR {totalRevenue.toLocaleString()}
              </div>
              <span className="text-[10px] text-emerald-400">All Cash on Delivery & Pre-Orders</span>
            </div>

            <div className="p-5 bg-neutral-900/80 border border-neutral-800 rounded-lg">
              <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">Total Orders Registered</span>
              <div className="font-mono text-xl sm:text-2xl font-bold text-neutral-100 mt-1">
                {orders.length}
              </div>
              <span className="text-[10px] text-neutral-400">{totalItemsSold} Garments Dispatched</span>
            </div>

            <div className="p-5 bg-neutral-900/80 border border-neutral-800 rounded-lg">
              <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">Active Products</span>
              <div className="font-mono text-xl sm:text-2xl font-bold text-neutral-100 mt-1">
                {products.length}
              </div>
              <span className="text-[10px] text-neutral-400">Men, Women, Kids & VIP</span>
            </div>

            <div className="p-5 bg-neutral-900/80 border border-neutral-800 rounded-lg">
              <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">Stock Alerts</span>
              <div className="font-mono text-xl sm:text-2xl font-bold text-rose-400 mt-1">
                {lowStockCount}
              </div>
              <span className="text-[10px] text-rose-300">Items below 10 units in boutique</span>
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-lg space-y-4">
            <h3 className="font-serif text-base font-bold text-neutral-100">
              Latest Client Purchases
            </h3>
            <div className="divide-y divide-neutral-900 overflow-x-auto text-xs">
              {orders.slice(0, 5).map(order => (
                <div key={order.id} className="py-3 flex items-center justify-between min-w-[500px]">
                  <div>
                    <span className="font-mono font-semibold text-neutral-200">{order.id}</span>
                    <span className="text-neutral-500 ml-2">by {order.customer.name} ({order.customer.city})</span>
                  </div>
                  <div className="font-mono text-amber-300 font-semibold">
                    PKR {order.total.toLocaleString()}
                  </div>
                  <span className="px-2 py-0.5 bg-neutral-950 border border-neutral-800 rounded text-[10px] text-amber-400">
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB: PRODUCTS MANAGEMENT --- */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-2.5 text-neutral-500" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products by name, category..."
                className="w-full bg-neutral-900 border border-neutral-800 pl-9 pr-3 py-2 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
              />
            </div>
            <button
              onClick={handleOpenAddProduct}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-1.5"
            >
              <Plus size={14} />
              <span>Add Product</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="border border-neutral-800 rounded-lg overflow-x-auto bg-neutral-900/40">
            <table className="w-full text-left text-xs text-neutral-300">
              <thead className="bg-neutral-950 border-b border-neutral-800 uppercase text-[10px] text-neutral-400 tracking-wider">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price (PKR)</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Flags</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 font-sans">
                {filteredProducts.map(p => (
                  <tr key={p.id} className="hover:bg-neutral-900/60">
                    <td className="p-3 flex items-center gap-3">
                      <ImageWithFallback
                        src={p.images[0]}
                        alt={p.name}
                        category={p.category}
                        className="w-10 h-12 object-cover rounded bg-neutral-950 border border-neutral-800 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-semibold text-neutral-100 truncate max-w-xs">{p.name}</div>
                        <div className="text-[10px] text-neutral-500 font-mono">SKU: {p.sku || p.id}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="uppercase text-[11px] text-amber-400 font-semibold">{p.category}</span>
                      <div className="text-[10px] text-neutral-400">{p.subcategory}</div>
                    </td>
                    <td className="p-3 font-mono">
                      <div className="font-semibold text-neutral-100">PKR {p.price.toLocaleString()}</div>
                      {p.originalPrice && (
                        <div className="text-[10px] text-neutral-500 line-through">
                          PKR {p.originalPrice.toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td className="p-3">
                      <span className={`font-mono font-semibold ${p.stock < 10 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {p.stock} units
                      </span>
                    </td>
                    <td className="p-3 space-x-1">
                      {p.isFeatured && <span className="text-[9px] bg-neutral-950 px-1.5 py-0.5 border border-amber-500/40 text-amber-300 rounded">Featured</span>}
                      {p.isVipExclusive && <span className="text-[9px] bg-neutral-950 px-1.5 py-0.5 border border-amber-500/40 text-amber-400 rounded">VIP</span>}
                      {p.isNewArrival && <span className="text-[9px] bg-neutral-950 px-1.5 py-0.5 border border-neutral-700 text-neutral-300 rounded">New</span>}
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditProduct(p)}
                        className="p-1.5 text-neutral-400 hover:text-amber-400 rounded hover:bg-neutral-800 transition-colors"
                        title="Edit product"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 text-neutral-400 hover:text-rose-400 rounded hover:bg-neutral-800 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- TAB: ORDERS MANAGEMENT --- */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="border border-neutral-800 rounded-lg overflow-x-auto bg-neutral-900/40">
            <table className="w-full text-left text-xs text-neutral-300">
              <thead className="bg-neutral-950 border-b border-neutral-800 uppercase text-[10px] text-neutral-400 tracking-wider">
                <tr>
                  <th className="p-3">Order ID & Date</th>
                  <th className="p-3">Customer & City</th>
                  <th className="p-3">Items</th>
                  <th className="p-3">Total (PKR)</th>
                  <th className="p-3">Current Status</th>
                  <th className="p-3">Update Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 font-sans">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-neutral-900/60">
                    <td className="p-3 font-mono">
                      <div className="font-bold text-neutral-100">{order.id}</div>
                      <div className="text-[10px] text-neutral-500">{order.date}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-medium text-neutral-200">{order.customer.name}</div>
                      <div className="text-[10px] text-neutral-400">{order.customer.city} · {order.customer.phone}</div>
                    </td>
                    <td className="p-3">
                      {order.items.map(i => (
                        <div key={i.id} className="text-[11px] text-neutral-400 truncate max-w-xs">
                          {i.quantity}x {i.product.name} ({i.selectedSize})
                        </div>
                      ))}
                    </td>
                    <td className="p-3 font-mono font-bold text-amber-300">
                      PKR {order.total.toLocaleString()}
                    </td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 bg-neutral-950 border border-amber-500/30 text-amber-400 rounded text-[10px] font-bold uppercase">
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs py-1 px-2 rounded focus:border-amber-400 focus:outline-none cursor-pointer"
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Processing">Processing</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- TAB: VIP & REWARD POINTS --- */}
      {activeTab === 'vip' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Reward Points Adjustment Form */}
          <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-4">
            <h3 className="font-serif text-base font-bold text-neutral-100 flex items-center gap-2">
              <Crown size={18} className="text-amber-400" />
              <span>Adjust Customer Reward Points</span>
            </h3>
            <p className="text-xs text-neutral-400">
              Audit recorded tool: award or correct reward points for customer <strong>{user.name}</strong> ({user.email}). Current: <strong className="text-amber-400">{user.rewardPoints} Pts</strong>.
            </p>

            <form onSubmit={handleAdjustPoints} className="space-y-3">
              <div>
                <label className="block text-[11px] uppercase text-neutral-400 mb-1">Points Amount</label>
                <input
                  type="number"
                  value={pointsAdjustAmt}
                  onChange={(e) => setPointsAdjustAmt(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase text-neutral-400 mb-1">Recorded Audit Reason *</label>
                <input
                  type="text"
                  value={pointsReason}
                  onChange={(e) => setPointsReason(e.target.value)}
                  placeholder="e.g. Compensation for courier delay or Birthday bonus"
                  className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>

              <div className="flex gap-4 text-xs text-neutral-300">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="adjType"
                    checked={pointsType === 'earned'}
                    onChange={() => setPointsType('earned')}
                    className="accent-amber-500"
                  />
                  <span>Credit / Earned (+)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="adjType"
                    checked={pointsType === 'adjusted'}
                    onChange={() => setPointsType('adjusted')}
                    className="accent-amber-500"
                  />
                  <span>System Adjustment</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded cursor-pointer transition-colors"
              >
                Record Points Adjustment
              </button>
            </form>
          </div>

          {/* VIP Tiers Configuration */}
          <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-4">
            <h3 className="font-serif text-base font-bold text-neutral-100">
              VIP Tier Settings & Discounts
            </h3>
            <div className="space-y-4 text-xs">
              {vipTiers.map(tier => (
                <div key={tier.id} className="p-4 bg-neutral-950 border border-neutral-800 rounded space-y-2">
                  <div className="flex items-center justify-between font-bold text-neutral-100">
                    <span className="text-amber-400">{tier.name}</span>
                    <span className="font-mono">{tier.discountPercent}% OFF</span>
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    Multiplier: {tier.pointsMultiplier}x Points · Min Spend: PKR {tier.minSpendPKR.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB: COUPONS & GIFT CARDS --- */}
      {activeTab === 'coupons' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Coupon Generator */}
          <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-4">
            <h3 className="font-serif text-base font-bold text-neutral-100">Create Discount Voucher</h3>
            <form onSubmit={handleCreateCoupon} className="space-y-3">
              <div>
                <label className="block text-[11px] uppercase text-neutral-400 mb-1">Coupon Code</label>
                <input
                  type="text"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                  placeholder="e.g. EID2026"
                  className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase text-neutral-400 mb-1">Discount %</label>
                  <input
                    type="number"
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase text-neutral-400 mb-1">Min Spend (PKR)</label>
                  <input
                    type="number"
                    value={newCouponMinSpend}
                    onChange={(e) => setNewCouponMinSpend(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded transition-colors"
              >
                Issue Coupon
              </button>
            </form>

            <div className="pt-3 border-t border-neutral-800 space-y-2 text-xs">
              <span className="font-semibold text-neutral-300">Active Coupons:</span>
              {coupons.map(c => (
                <div key={c.code} className="flex justify-between items-center p-2 bg-neutral-950 rounded">
                  <span className="font-mono font-bold text-amber-400">{c.code}</span>
                  <span className="text-neutral-400">{c.discountPercent}% Off (Min: PKR {c.minSpendPKR.toLocaleString()})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gift Cards Registry */}
          <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-4">
            <h3 className="font-serif text-base font-bold text-neutral-100">Gift Cards Database</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto text-xs">
              {giftCards.map(gc => (
                <div key={gc.code} className="p-3 bg-neutral-950 border border-neutral-800 rounded flex items-center justify-between">
                  <div>
                    <div className="font-mono font-bold text-amber-300">{gc.code}</div>
                    <div className="text-[11px] text-neutral-400">
                      Balance: PKR {gc.currentBalance.toLocaleString()} / {gc.initialAmount.toLocaleString()}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleGiftCardActive(gc.code)}
                    className={`px-3 py-1 rounded text-[11px] font-semibold ${
                      gc.isActive ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {gc.isActive ? 'Active' : 'Disabled'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB: HOMEPAGE SETTINGS --- */}
      {activeTab === 'homepage' && (
        <form onSubmit={handleSaveHomepage} className="max-w-2xl p-6 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-4">
          <h3 className="font-serif text-base font-bold text-neutral-100">
            Edit Storefront Banners & Contact Details
          </h3>

          <div>
            <label className="block text-[11px] uppercase text-neutral-400 mb-1">
              Top Announcement Ticker
            </label>
            <input
              type="text"
              value={hpAnnouncement}
              onChange={(e) => setHpAnnouncement(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase text-neutral-400 mb-1">
              Hero Campaign Headline
            </label>
            <input
              type="text"
              value={hpHeroHeadline}
              onChange={(e) => setHpHeroHeadline(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase text-neutral-400 mb-1">
              Hero Subtext
            </label>
            <textarea
              rows={2}
              value={hpHeroSubtext}
              onChange={(e) => setHpHeroSubtext(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 p-3 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase text-neutral-400 mb-1">
                Store Phone / WhatsApp
              </label>
              <input
                type="text"
                value={hpPhone}
                onChange={(e) => setHpPhone(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase text-neutral-400 mb-1">
                Flagship Boutique Address
              </label>
              <input
                type="text"
                value={hpAddress}
                onChange={(e) => setHpAddress(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded transition-colors"
          >
            Save Homepage Configuration
          </button>
        </form>
      )}

      {/* --- TAB: REVIEWS MODERATION --- */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          <div className="border border-neutral-800 rounded-lg overflow-x-auto bg-neutral-900/40">
            <table className="w-full text-left text-xs text-neutral-300">
              <thead className="bg-neutral-950 border-b border-neutral-800 uppercase text-[10px] text-neutral-400 tracking-wider">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3">Comment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Moderation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 font-sans">
                {reviews.map(r => (
                  <tr key={r.id} className="hover:bg-neutral-900/60">
                    <td className="p-3 font-medium text-neutral-200">{r.productName}</td>
                    <td className="p-3">{r.customerName}</td>
                    <td className="p-3 text-amber-400">★ {r.rating}</td>
                    <td className="p-3 italic text-neutral-300 max-w-sm truncate">{r.comment}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        r.isApproved ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
                      }`}>
                        {r.isApproved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => approveReview(r.id, !r.isApproved)}
                        className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] rounded"
                      >
                        {r.isApproved ? 'Hide' : 'Approve'}
                      </button>
                      <button
                        onClick={() => deleteReview(r.id)}
                        className="p-1 text-neutral-400 hover:text-rose-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- ADD / EDIT PRODUCT MODAL --- */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsProductModalOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-xl shadow-2xl overflow-y-auto max-h-[90vh] p-6 space-y-4 z-10">
            <h3 className="font-serif text-lg font-bold text-neutral-100">
              {editingProductId ? 'Edit Boutique Creation' : 'Add New Boutique Creation'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] uppercase text-neutral-400 mb-1">Product Title *</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Raw Silk Imperial Sherwani"
                  className="w-full bg-neutral-900 border border-neutral-800 px-3 py-2 text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase text-neutral-400 mb-1">Department</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as CategoryType)}
                    className="w-full bg-neutral-900 border border-neutral-800 px-3 py-2 text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                  >
                    <option value="men">Men's Collection</option>
                    <option value="women">Women's Collection</option>
                    <option value="children">Children's Collection</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] uppercase text-neutral-400 mb-1">Subcategory</label>
                  <input
                    type="text"
                    value={formSubcategory}
                    onChange={(e) => setFormSubcategory(e.target.value)}
                    placeholder="e.g. Traditional Clothes, Tuxedo, Watches"
                    className="w-full bg-neutral-900 border border-neutral-800 px-3 py-2 text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] uppercase text-neutral-400 mb-1">Price in PKR *</label>
                  <input
                    type="number"
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full bg-neutral-900 border border-neutral-800 px-3 py-2 text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase text-neutral-400 mb-1">Original Price (PKR)</label>
                  <input
                    type="number"
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                    className="w-full bg-neutral-900 border border-neutral-800 px-3 py-2 text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase text-neutral-400 mb-1">Stock Count</label>
                  <input
                    type="number"
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full bg-neutral-900 border border-neutral-800 px-3 py-2 text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase text-neutral-400 mb-1">Image URLs (comma separated)</label>
                <input
                  type="text"
                  value={formImages}
                  onChange={(e) => setFormImages(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 px-3 py-2 text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase text-neutral-400 mb-1">Sizes (comma separated)</label>
                  <input
                    type="text"
                    value={formSizes}
                    onChange={(e) => setFormSizes(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 px-3 py-2 text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase text-neutral-400 mb-1">Colors (e.g. Gold (#d4af37), Black (#000))</label>
                  <input
                    type="text"
                    value={formColors}
                    onChange={(e) => setFormColors(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 px-3 py-2 text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase text-neutral-400 mb-1">Description & Craftsmanship</label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 p-3 text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* Status checkboxes */}
              <div className="flex flex-wrap gap-4 pt-2 border-t border-neutral-800">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsFeatured}
                    onChange={(e) => setFormIsFeatured(e.target.checked)}
                    className="accent-amber-500"
                  />
                  <span>Featured Product</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsNewArrival}
                    onChange={(e) => setFormIsNewArrival(e.target.checked)}
                    className="accent-amber-500"
                  />
                  <span>New Arrival</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsBestSeller}
                    onChange={(e) => setFormIsBestSeller(e.target.checked)}
                    className="accent-amber-500"
                  />
                  <span>Best Seller</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsVipExclusive}
                    onChange={(e) => setFormIsVipExclusive(e.target.checked)}
                    className="accent-amber-500"
                  />
                  <span>VIP Exclusive Piece</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 rounded font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold uppercase tracking-wider rounded"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
