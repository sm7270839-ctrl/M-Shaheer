import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, X, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    products,
    openProduct,
  } = useShop();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(150000);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchQuery =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.fabric && p.fabric.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCategory =
        selectedCategory === 'all' ||
        (selectedCategory === 'vip' ? p.isVipExclusive : p.category === selectedCategory);

      const matchPrice = p.price <= maxPrice;

      return matchQuery && matchCategory && matchPrice;
    });
  }, [products, searchQuery, selectedCategory, maxPrice]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-neutral-950 border border-neutral-800 shadow-2xl rounded-lg overflow-hidden flex flex-col max-h-[85vh] z-10">
        {/* Search Bar Input */}
        <div className="p-4 sm:p-6 border-b border-neutral-800 flex items-center gap-3 bg-neutral-900/70">
          <Search size={22} className="text-amber-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search suits, kurtas, watches, frocks, tuxedos, jewelry..."
            autoFocus
            className="flex-1 bg-transparent border-none text-neutral-100 placeholder-neutral-500 text-sm sm:text-base focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-neutral-500 hover:text-white p-1 text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="px-4 sm:px-6 py-3 border-b border-neutral-800/80 bg-neutral-950 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {['all', 'men', 'women', 'children', 'vip'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 font-medium uppercase tracking-wider text-[11px] rounded transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-neutral-950 font-semibold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {cat === 'all' ? 'All Pieces' : cat}
              </button>
            ))}
          </div>

          {/* Price Range Slider */}
          <div className="flex items-center gap-2 text-neutral-400">
            <SlidersHorizontal size={14} className="text-amber-400" />
            <span>Max Price:</span>
            <span className="font-mono text-amber-300 font-semibold">PKR {maxPrice.toLocaleString()}</span>
            <input
              type="range"
              min="3000"
              max="150000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-24 accent-amber-500"
            />
          </div>
        </div>

        {/* Search Results Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          <div className="text-xs text-neutral-400 mb-2">
            Showing <span className="text-neutral-100 font-semibold">{filteredProducts.length}</span> curated pieces
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-neutral-400">
              <p className="font-serif text-base text-neutral-300 mb-1">No couture items found</p>
              <p className="text-xs text-neutral-500">
                Try searching for "Kurta", "Tuxedo", "Gharara", "Watch", or adjusting filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  onClick={() => {
                    setIsSearchOpen(false);
                    openProduct(product.id);
                  }}
                  className="flex gap-3 p-2 bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-800/80 hover:border-amber-500/40 rounded transition-all cursor-pointer group"
                >
                  <ImageWithFallback
                    src={product.images[0]}
                    alt={product.name}
                    fallbackCategory={product.category === 'men' ? 'men' : product.category === 'women' ? 'women' : 'children'}
                    className="w-16 h-20 object-cover object-top rounded shrink-0 bg-neutral-950 border border-neutral-800"
                  />
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <div className="text-[10px] uppercase font-semibold text-amber-400 tracking-wider">
                        {product.subcategory}
                      </div>
                      <h4 className="text-xs font-medium text-neutral-200 group-hover:text-amber-300 transition-colors line-clamp-1">
                        {product.name}
                      </h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-neutral-100">
                        PKR {product.price.toLocaleString()}
                      </span>
                      <ArrowRight size={13} className="text-neutral-500 group-hover:text-amber-400 transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
