import React, { useState, useMemo } from 'react';
import { useShop, AppView } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import {
  SlidersHorizontal,
  Crown,
  Sparkles,
  ArrowUpDown,
  Lock,
  Unlock,
  CheckCircle2
} from 'lucide-react';

import { MEN_SUBCATEGORIES, WOMEN_SUBCATEGORIES, CHILDREN_SUBCATEGORIES } from '../data/initialData';

interface CategoryViewProps {
  viewType: 'men' | 'women' | 'children' | 'vip' | 'new-arrivals' | 'sale';
}

export const CategoryView: React.FC<CategoryViewProps> = ({ viewType }) => {
  const {
    products,
    activeSubcategoryFilter,
    setActiveSubcategoryFilter,
    activeGenderFilter,
    setActiveGenderFilter,
    user,
    setActiveView,
  } = useShop();

  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'discount'>('featured');
  const [selectedColorFilter, setSelectedColorFilter] = useState<string | null>(null);

  // Subcategories mapping
  const menSubcategories = ['All Men', ...MEN_SUBCATEGORIES];
  const womenSubcategories = ['All Women', ...WOMEN_SUBCATEGORIES];
  const childrenSubcategories = ['All Children', ...CHILDREN_SUBCATEGORIES];

  // Titles & Headings
  const titles: Record<string, { title: string; subtitle: string; desc: string }> = {
    men: {
      title: "Men's Luxury Collection",
      subtitle: 'Couture & Sartorial Tailoring',
      desc: 'Double-breasted tuxedo dinner jackets, bespoke traditional kurta pajamas, Egyptian cotton shirts, and handcrafted footwear.',
    },
    women: {
      title: "Women's Haute Couture",
      subtitle: 'Atelier & Traditional Splendor',
      desc: 'Handcrafted zardozi bridal ghararas, regal 3-piece jacquard silks, gala velvet gowns, polki jewelry, and designer handbags.',
    },
    children: {
      title: "Children's Atelier Collection",
      subtitle: 'Junior Boys & Girls Couture',
      desc: 'Tailored 3-piece boys tuxedos, golden shimmer party frocks, festive Eid raw silk kurtas, and handcrafted shoes.',
    },
    vip: {
      title: 'M.SHAHEER VIP Exclusive Archive',
      subtitle: 'Private Salon Reserved Pieces',
      desc: 'Ultra-exclusive 24K gold thread masterpieces, tourbillon timepieces, and one-of-a-kind salon creations accessible by VIP membership.',
    },
    'new-arrivals': {
      title: 'New Haute Arrivals',
      subtitle: 'Winter & Festive Drop 2026',
      desc: 'Explore the newly released silhouettes from our Lahore and Karachi ateliers.',
    },
    sale: {
      title: 'Private Archive Sale',
      subtitle: 'Limited-Time Privilege Pricing',
      desc: 'Exclusive seasonal markdowns with savings of up to 25% on selected couture masterpieces.',
    },
  };

  const currentMeta = titles[viewType] || titles.men;

  // Filtered Products Calculation
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Primary view filter
    if (viewType === 'men') {
      list = list.filter(p => p.category === 'men' && !p.isVipExclusive);
    } else if (viewType === 'women') {
      list = list.filter(p => p.category === 'women' && !p.isVipExclusive);
    } else if (viewType === 'children') {
      list = list.filter(p => p.category === 'children' && !p.isVipExclusive);
      if (activeGenderFilter !== 'all') {
        list = list.filter(p => p.childGender === activeGenderFilter);
      }
    } else if (viewType === 'vip') {
      list = list.filter(p => p.isVipExclusive);
    } else if (viewType === 'new-arrivals') {
      list = list.filter(p => p.isNewArrival);
    } else if (viewType === 'sale') {
      list = list.filter(p => (p.discountPercent && p.discountPercent > 0) || p.isSale);
    }

    // Subcategory Filter
    if (activeSubcategoryFilter && !activeSubcategoryFilter.startsWith('All')) {
      const cleanFilter = activeSubcategoryFilter.toLowerCase().replace(/^(men's|women's|children's)\s*/i, '').trim();
      list = list.filter(p => {
        const cleanSub = (p.subcategory || '').toLowerCase().replace(/^(men's|women's|children's)\s*/i, '').trim();
        return (
          p.subcategory.toLowerCase() === activeSubcategoryFilter.toLowerCase() ||
          cleanSub === cleanFilter ||
          cleanSub.includes(cleanFilter) ||
          cleanFilter.includes(cleanSub)
        );
      });
    }

    // Color filter
    if (selectedColorFilter) {
      list = list.filter(p => p.colors.some(c => c.name.toLowerCase().includes(selectedColorFilter.toLowerCase())));
    }

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'discount') {
      list.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
    }

    return list;
  }, [products, viewType, activeSubcategoryFilter, activeGenderFilter, selectedColorFilter, sortBy]);

  const subcategoryList =
    viewType === 'men'
      ? menSubcategories
      : viewType === 'women'
      ? womenSubcategories
      : viewType === 'children'
      ? childrenSubcategories
      : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* 1. Header Banner */}
      <div className="border-b border-neutral-800 pb-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
          <Sparkles size={14} />
          <span>{currentMeta.subtitle}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-wider text-neutral-100">
          {currentMeta.title}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
          {currentMeta.desc}
        </p>

        {/* Children Boys/Girls Gender Switcher */}
        {viewType === 'children' && (
          <div className="pt-3 flex items-center gap-2">
            <button
              onClick={() => setActiveGenderFilter('all')}
              className={`px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded transition-colors cursor-pointer ${
                activeGenderFilter === 'all'
                  ? 'bg-amber-500 text-neutral-950'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
            >
              All Junior
            </button>
            <button
              onClick={() => setActiveGenderFilter('boys')}
              className={`px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded transition-colors cursor-pointer ${
                activeGenderFilter === 'boys'
                  ? 'bg-amber-500 text-neutral-950'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
            >
              Junior Boys
            </button>
            <button
              onClick={() => setActiveGenderFilter('girls')}
              className={`px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded transition-colors cursor-pointer ${
                activeGenderFilter === 'girls'
                  ? 'bg-amber-500 text-neutral-950'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
            >
              Junior Girls
            </button>
          </div>
        )}

        {/* VIP Membership status indicator in VIP Lounge */}
        {viewType === 'vip' && (
          <div className="mt-4 p-4 bg-neutral-900/80 border border-amber-500/40 rounded flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Crown size={24} className="text-amber-400 shrink-0" />
              <div>
                <div className="text-xs text-neutral-300">
                  Your Current Tier:{' '}
                  <span className="font-bold text-amber-400 uppercase">{user.vipTier} Member</span>
                </div>
                <div className="text-[11px] text-neutral-400">
                  {user.vipTier === 'Platinum'
                    ? 'All VIP Archive pieces unlocked for your private order.'
                    : 'Platinum members receive unrestricted access to 24K gold sherwanis and private salon gowns.'}
                </div>
              </div>
            </div>
            {user.vipTier !== 'Platinum' && (
              <button
                onClick={() => setActiveView('account')}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
              >
                Upgrade to Platinum
              </button>
            )}
          </div>
        )}
      </div>

      {/* 2. Subcategory Filter Bar (Anti-Slop Single-line Segmented Buttons) */}
      {subcategoryList.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-neutral-900 no-scrollbar">
          {subcategoryList.map(sub => {
            const isAll = sub.startsWith('All');
            const isActive = isAll ? !activeSubcategoryFilter : activeSubcategoryFilter === sub;
            return (
              <button
                key={sub}
                onClick={() => setActiveSubcategoryFilter(isAll ? null : sub)}
                className={`px-3.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 rounded transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {sub}
              </button>
            );
          })}
        </div>
      )}

      {/* 3. Toolbar: Count & Sorting */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-400">
        <div>
          Showing <span className="text-neutral-100 font-semibold">{filteredProducts.length}</span> pieces
          {activeSubcategoryFilter && (
            <span> in <strong className="text-amber-400">{activeSubcategoryFilter}</strong></span>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2">
            <ArrowUpDown size={14} className="text-amber-400" />
            <span>Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs py-1.5 px-3 rounded focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="featured">Featured Editions</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
              <option value="discount">Highest Discount</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Responsive Product Grid: 2 cols on mobile, 3 on tablet, 4 on desktop */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center text-neutral-400 space-y-4 bg-neutral-900/30 rounded border border-neutral-900">
          <p className="font-serif text-xl text-neutral-200">No pieces currently found</p>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Try selecting a different subcategory or resetting your filters.
          </p>
          <button
            onClick={() => {
              setActiveSubcategoryFilter(null);
              setActiveGenderFilter('all');
            }}
            className="px-6 py-2 bg-amber-500 text-neutral-950 text-xs font-semibold tracking-wider uppercase"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
