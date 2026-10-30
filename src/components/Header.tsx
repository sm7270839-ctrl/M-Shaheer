import React, { useState } from 'react';
import { useShop, AppView } from '../context/ShopContext';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Crown,
  ChevronDown,
  Shield,
  Phone,
  Truck,
  BookOpen
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    cartCount,
    cartSubtotal,
    setIsCartDrawerOpen,
    wishlist,
    setIsWishlistDrawerOpen,
    setIsSearchOpen,
    user,
    homepageConfig,
    setActiveSubcategoryFilter,
    setActiveGenderFilter,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenOpen, setMobileMenOpen] = useState(false);
  const [mobileWomenOpen, setMobileWomenOpen] = useState(false);
  const [mobileKidsOpen, setMobileKidsOpen] = useState(false);

  const menSubcategories = [
    'Shirts',
    'T-Shirts and Polos',
    'Pants and Trousers',
    'Jeans',
    'Wrist Watches',
    'Formal Shoes',
    'Sneakers',
    'Sandals and Slippers',
    'Jackets and Hoodies',
    'Traditional Clothes',
    'Wallets',
    'Belts',
    'Fashion Accessories',
  ];

  const womenSubcategories = [
    'Dresses',
    'Frocks',
    'Party Wear',
    'Casual Wear',
    'Traditional Suits',
    'Night Suits',
    'Wrist Watches',
    'Sandals',
    'Heels and Flats',
    'Shoes',
    'Handbags',
    'Jewelry',
    'Fashion Accessories',
  ];

  const navigateToCategory = (view: AppView, subcategory: string | null = null, gender: 'all' | 'boys' | 'girls' = 'all') => {
    setActiveSubcategoryFilter(subcategory);
    setActiveGenderFilter(gender);
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Promotional Announcement Bar */}
      <div className="bg-neutral-900 border-b border-neutral-800 text-neutral-300 text-[11px] sm:text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="text-amber-400 font-semibold tracking-wider">M.SHAHEER COUTURE</span>
            <span className="hidden sm:inline text-neutral-500">|</span>
            <span className="truncate">{homepageConfig.announcementText}</span>
          </div>
          <div className="hidden lg:flex items-center gap-4 shrink-0 text-neutral-400">
            <button
              onClick={() => { setActiveView('track-order'); }}
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Truck size={13} className="text-amber-400" />
              <span>Track Order</span>
            </button>
            <span className="text-neutral-700">|</span>
            <button
              onClick={() => { setActiveView('contact'); }}
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Phone size={12} className="text-amber-400" />
              <span>{homepageConfig.storePhone}</span>
            </button>
            <span className="text-neutral-700">|</span>
            <button
              onClick={() => { setActiveView('guide'); }}
              className="hover:text-amber-400 text-amber-300 font-medium transition-colors flex items-center gap-1 cursor-pointer"
            >
              <BookOpen size={12} />
              <span>Owner's Guide</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Luxury Header */}
      <header className="sticky top-0 z-40 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20 gap-4">

            {/* Mobile Hamburger & Logo */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-neutral-300 hover:text-amber-400 transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu size={24} />
              </button>
              <button
                onClick={() => { setActiveView('home'); }}
                className="text-xl sm:text-2xl font-serif tracking-[0.2em] font-bold text-neutral-100 hover:text-amber-300 transition-colors"
              >
                M.SHAHEER
              </button>
            </div>

            {/* Desktop Brand Zone */}
            <div className="hidden lg:flex items-center gap-8">
              <button
                onClick={() => { setActiveView('home'); }}
                className="text-2xl xl:text-3xl font-serif tracking-[0.22em] font-bold text-neutral-100 hover:text-amber-300 transition-colors flex items-center gap-2"
              >
                <span>M.SHAHEER</span>
              </button>
            </div>

            {/* Desktop Center Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs xl:text-sm font-medium tracking-wider uppercase text-neutral-300">
              <button
                onClick={() => { navigateToCategory('home'); }}
                className={`py-2 hover:text-amber-400 transition-colors cursor-pointer ${
                  activeView === 'home' ? 'text-amber-400 font-semibold' : ''
                }`}
              >
                Home
              </button>

              {/* Men's Mega Dropdown */}
              <div className="relative group py-2">
                <button
                  onClick={() => navigateToCategory('men')}
                  className={`flex items-center gap-1 hover:text-amber-400 transition-colors cursor-pointer ${
                    activeView === 'men' ? 'text-amber-400 font-semibold' : ''
                  }`}
                >
                  <span>Men</span>
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-full left-0 w-64 bg-neutral-900 border border-neutral-800 shadow-2xl p-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="text-[11px] font-semibold text-amber-400 mb-2 pb-1 border-b border-neutral-800 tracking-widest">
                    MEN'S COUTURE & APPAREL
                  </div>
                  <div className="grid grid-cols-1 gap-1 text-xs normal-case text-neutral-300">
                    <button
                      onClick={() => navigateToCategory('men', null)}
                      className="text-left py-1 hover:text-amber-400 hover:translate-x-1 transition-transform"
                    >
                      View All Men's Collection
                    </button>
                    {menSubcategories.map(sub => (
                      <button
                        key={sub}
                        onClick={() => navigateToCategory('men', sub)}
                        className="text-left py-1 text-neutral-400 hover:text-amber-300 hover:translate-x-1 transition-all"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Women's Mega Dropdown */}
              <div className="relative group py-2">
                <button
                  onClick={() => navigateToCategory('women')}
                  className={`flex items-center gap-1 hover:text-amber-400 transition-colors cursor-pointer ${
                    activeView === 'women' ? 'text-amber-400 font-semibold' : ''
                  }`}
                >
                  <span>Women</span>
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-full left-0 w-64 bg-neutral-900 border border-neutral-800 shadow-2xl p-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="text-[11px] font-semibold text-amber-400 mb-2 pb-1 border-b border-neutral-800 tracking-widest">
                    WOMEN'S LUXURY COUTURE
                  </div>
                  <div className="grid grid-cols-1 gap-1 text-xs normal-case text-neutral-300">
                    <button
                      onClick={() => navigateToCategory('women', null)}
                      className="text-left py-1 hover:text-amber-400 hover:translate-x-1 transition-transform"
                    >
                      View All Women's Collection
                    </button>
                    {womenSubcategories.map(sub => (
                      <button
                        key={sub}
                        onClick={() => navigateToCategory('women', sub)}
                        className="text-left py-1 text-neutral-400 hover:text-amber-300 hover:translate-x-1 transition-all"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Children's Mega Dropdown */}
              <div className="relative group py-2">
                <button
                  onClick={() => navigateToCategory('children')}
                  className={`flex items-center gap-1 hover:text-amber-400 transition-colors cursor-pointer ${
                    activeView === 'children' ? 'text-amber-400 font-semibold' : ''
                  }`}
                >
                  <span>Children</span>
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-full left-0 w-64 bg-neutral-900 border border-neutral-800 shadow-2xl p-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="text-[11px] font-semibold text-amber-400 mb-2 pb-1 border-b border-neutral-800 tracking-widest">
                    JUNIOR & KIDS COUTURE
                  </div>
                  <div className="flex flex-col gap-1 text-xs normal-case text-neutral-300">
                    <button
                      onClick={() => navigateToCategory('children', null, 'all')}
                      className="text-left py-1 hover:text-amber-400 font-medium"
                    >
                      All Children's Wear
                    </button>
                    <div className="pt-2 text-[10px] uppercase font-semibold text-neutral-500 tracking-wider">
                      Junior Boys
                    </div>
                    <button
                      onClick={() => navigateToCategory('children', null, 'boys')}
                      className="text-left py-1 text-neutral-400 hover:text-amber-300 pl-2"
                    >
                      Boys Suits, Kurtas & Shoes
                    </button>
                    <div className="pt-2 text-[10px] uppercase font-semibold text-neutral-500 tracking-wider">
                      Junior Girls
                    </div>
                    <button
                      onClick={() => navigateToCategory('children', null, 'girls')}
                      className="text-left py-1 text-neutral-400 hover:text-amber-300 pl-2"
                    >
                      Girls Frocks, Anarkali & Flats
                    </button>
                  </div>
                </div>
              </div>

              {/* VIP Collection Link */}
              <button
                onClick={() => navigateToCategory('vip')}
                className={`py-2 hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer ${
                  activeView === 'vip' ? 'text-amber-400 font-semibold' : 'text-amber-300/90'
                }`}
              >
                <Crown size={14} className="text-amber-400" />
                <span>VIP Collection</span>
              </button>

              <button
                onClick={() => navigateToCategory('new-arrivals')}
                className={`py-2 hover:text-amber-400 transition-colors cursor-pointer ${
                  activeView === 'new-arrivals' ? 'text-amber-400 font-semibold' : ''
                }`}
              >
                New Arrivals
              </button>

              <button
                onClick={() => navigateToCategory('sale')}
                className={`py-2 hover:text-rose-400 transition-colors cursor-pointer ${
                  activeView === 'sale' ? 'text-rose-400 font-semibold' : 'text-neutral-300'
                }`}
              >
                Sale
              </button>
            </nav>

            {/* Action Buttons Zone */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-neutral-300 hover:text-amber-400 transition-colors"
                title="Search products"
                aria-label="Search products"
              >
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <button
                type="button"
                onClick={() => setIsWishlistDrawerOpen(true)}
                className="p-2 text-neutral-300 hover:text-amber-400 transition-colors relative"
                title="Wishlist"
                aria-label="View Wishlist"
              >
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-neutral-950 font-bold text-[10px] rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* My Account / VIP Badge */}
              <button
                type="button"
                onClick={() => setActiveView('account')}
                className="p-2 text-neutral-300 hover:text-amber-400 transition-colors relative flex items-center gap-1"
                title="My VIP Account"
                aria-label="My Account"
              >
                <User size={20} />
                <span className="hidden xl:inline text-xs text-neutral-400 group-hover:text-amber-400">
                  {user.vipTier} Member
                </span>
              </button>

              {/* Shopping Cart */}
              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(true)}
                className="flex items-center gap-2.5 p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-500/50 text-neutral-100 transition-all rounded cursor-pointer"
                aria-label="Shopping Cart"
              >
                <div className="relative">
                  <ShoppingBag size={20} className="text-amber-400" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-amber-500 text-neutral-950 font-bold text-[10px] rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <div className="hidden md:flex flex-col text-left leading-tight">
                  <span className="text-[10px] text-neutral-400 tracking-wider">BAG</span>
                  <span className="text-xs font-mono font-semibold text-amber-300">
                    PKR {cartSubtotal.toLocaleString()}
                  </span>
                </div>
              </button>

              {/* Admin Portal Button */}
              <button
                onClick={() => setActiveView('admin')}
                className="p-2 text-neutral-400 hover:text-amber-400 transition-colors text-xs font-medium flex items-center gap-1 border border-neutral-800 rounded bg-neutral-900/60"
                title="Admin Control Panel"
              >
                <Shield size={16} className="text-amber-400" />
                <span className="hidden sm:inline">Admin</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-neutral-950 border-r border-neutral-800 h-full flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
              <span className="font-serif text-xl font-bold tracking-widest text-neutral-100">
                M.SHAHEER
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-neutral-400 hover:text-white"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* VIP Status Snippet */}
            <div className="my-4 p-3 bg-neutral-900 border border-amber-500/30 rounded flex items-center justify-between">
              <div>
                <div className="text-xs text-neutral-400">Welcome, {user.name}</div>
                <div className="text-xs font-semibold text-amber-400 flex items-center gap-1 mt-0.5">
                  <Crown size={13} />
                  <span>{user.vipTier} VIP Member ({user.rewardPoints} Pts)</span>
                </div>
              </div>
              <button
                onClick={() => { setActiveView('account'); setMobileMenuOpen(false); }}
                className="text-[11px] underline text-neutral-300 hover:text-amber-400"
              >
                View
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-3 py-4 text-sm font-medium tracking-wide">
              <button
                onClick={() => navigateToCategory('home')}
                className="text-left py-2 text-neutral-200 hover:text-amber-400"
              >
                Home
              </button>

              {/* Men Mobile Collapsible */}
              <div>
                <button
                  onClick={() => setMobileMenOpen(!mobileMenOpen)}
                  className="w-full flex items-center justify-between py-2 text-neutral-200 hover:text-amber-400"
                >
                  <span>Men's Collection</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${mobileMenOpen ? 'rotate-180 text-amber-400' : ''}`}
                  />
                </button>
                {mobileMenOpen && (
                  <div className="pl-4 py-2 flex flex-col gap-2 text-xs text-neutral-400 border-l border-neutral-800">
                    <button
                      onClick={() => navigateToCategory('men', null)}
                      className="text-left text-amber-300 font-semibold"
                    >
                      Shop All Men's ({menSubcategories.length} Categories)
                    </button>
                    {menSubcategories.map(sub => (
                      <button
                        key={sub}
                        onClick={() => navigateToCategory('men', sub)}
                        className="text-left hover:text-white py-0.5"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Women Mobile Collapsible */}
              <div>
                <button
                  onClick={() => setMobileWomenOpen(!mobileWomenOpen)}
                  className="w-full flex items-center justify-between py-2 text-neutral-200 hover:text-amber-400"
                >
                  <span>Women's Collection</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${mobileWomenOpen ? 'rotate-180 text-amber-400' : ''}`}
                  />
                </button>
                {mobileWomenOpen && (
                  <div className="pl-4 py-2 flex flex-col gap-2 text-xs text-neutral-400 border-l border-neutral-800">
                    <button
                      onClick={() => navigateToCategory('women', null)}
                      className="text-left text-amber-300 font-semibold"
                    >
                      Shop All Women's ({womenSubcategories.length} Categories)
                    </button>
                    {womenSubcategories.map(sub => (
                      <button
                        key={sub}
                        onClick={() => navigateToCategory('women', sub)}
                        className="text-left hover:text-white py-0.5"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Children Mobile Collapsible */}
              <div>
                <button
                  onClick={() => setMobileKidsOpen(!mobileKidsOpen)}
                  className="w-full flex items-center justify-between py-2 text-neutral-200 hover:text-amber-400"
                >
                  <span>Children's Collection</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${mobileKidsOpen ? 'rotate-180 text-amber-400' : ''}`}
                  />
                </button>
                {mobileKidsOpen && (
                  <div className="pl-4 py-2 flex flex-col gap-2 text-xs text-neutral-400 border-l border-neutral-800">
                    <button
                      onClick={() => navigateToCategory('children', null, 'all')}
                      className="text-left text-amber-300 font-semibold"
                    >
                      Shop All Children's
                    </button>
                    <button
                      onClick={() => navigateToCategory('children', null, 'boys')}
                      className="text-left hover:text-white py-0.5"
                    >
                      Junior Boys
                    </button>
                    <button
                      onClick={() => navigateToCategory('children', null, 'girls')}
                      className="text-left hover:text-white py-0.5"
                    >
                      Junior Girls
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => navigateToCategory('vip')}
                className="text-left py-2 text-amber-400 flex items-center gap-2 font-medium"
              >
                <Crown size={16} />
                <span>VIP Collection</span>
              </button>

              <button
                onClick={() => navigateToCategory('new-arrivals')}
                className="text-left py-2 text-neutral-200 hover:text-amber-400"
              >
                New Arrivals
              </button>

              <button
                onClick={() => navigateToCategory('sale')}
                className="text-left py-2 text-rose-400"
              >
                Exclusive Sale
              </button>

              <button
                onClick={() => { setActiveView('gift-cards'); setMobileMenuOpen(false); }}
                className="text-left py-2 text-neutral-200 hover:text-amber-400"
              >
                Luxury Gift Cards
              </button>

              <button
                onClick={() => { setActiveView('track-order'); setMobileMenuOpen(false); }}
                className="text-left py-2 text-neutral-200 hover:text-amber-400 flex items-center gap-2"
              >
                <Truck size={16} className="text-amber-400" />
                <span>Track Order</span>
              </button>

              <button
                onClick={() => { setActiveView('contact'); setMobileMenuOpen(false); }}
                className="text-left py-2 text-neutral-200 hover:text-amber-400"
              >
                Contact & Boutiques
              </button>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="mt-auto pt-6 border-t border-neutral-800 space-y-3">
              <button
                onClick={() => { setActiveView('account'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs font-semibold tracking-wider uppercase hover:border-amber-400 transition-colors flex items-center justify-center gap-2"
              >
                <User size={14} />
                <span>My VIP Account</span>
              </button>
              <button
                onClick={() => { setActiveView('admin'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 bg-neutral-900 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
              >
                <Shield size={14} />
                <span>Admin Management</span>
              </button>
              <button
                onClick={() => { setActiveView('guide'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 bg-neutral-900/60 border border-neutral-800 text-neutral-400 text-xs font-semibold tracking-wider uppercase hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <BookOpen size={14} />
                <span>Owner's Guide</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
