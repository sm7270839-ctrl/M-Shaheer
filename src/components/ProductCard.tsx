import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, Crown, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    openProduct,
    setQuickViewProduct,
    toggleWishlist,
    isWishlisted,
    addToCart,
    user,
  } = useShop();

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Standard');
  const [isAddedRecently, setIsAddedRecently] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isVipRestricted = product.isVipExclusive && product.minVipTier === 'Platinum' && user.vipTier !== 'Platinum';
  const isGoldRestricted = product.isVipExclusive && product.minVipTier === 'Gold' && user.vipTier === 'Silver';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isVipRestricted || isGoldRestricted) {
      openProduct(product.id);
      return;
    }
    addToCart(product, selectedSize, selectedColor, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 2000);
  };

  const wishlisted = isWishlisted(product.id);

  return (
    <div
      className="group relative flex flex-col bg-neutral-900/60 border border-neutral-800/80 hover:border-amber-500/40 transition-all duration-300 rounded overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Image Container with 4:3 or 1:1 Aspect ratio */}
      <div
        onClick={() => openProduct(product.id)}
        className="relative w-full aspect-[3/4] bg-neutral-900 cursor-pointer overflow-hidden"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient scrim for image contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges (Subtle, Anti-Slop) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {product.isVipExclusive && (
            <span className="bg-neutral-950/90 text-amber-400 border border-amber-500/40 text-[10px] tracking-widest font-semibold px-2 py-0.5 uppercase flex items-center gap-1 rounded-sm">
              <Crown size={10} />
              <span>{product.minVipTier || 'VIP'} VIP</span>
            </span>
          )}
          {product.discountPercent && product.discountPercent > 0 && (
            <span className="bg-rose-950/90 text-rose-300 border border-rose-800/40 text-[10px] font-semibold px-2 py-0.5 tracking-wider rounded-sm">
              -{product.discountPercent}%
            </span>
          )}
          {product.isNewArrival && !product.discountPercent && (
            <span className="bg-neutral-950/90 text-amber-300 border border-amber-500/30 text-[10px] tracking-wider px-2 py-0.5 uppercase rounded-sm">
              New Drop
            </span>
          )}
        </div>

        {/* Top-Right Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all duration-200 cursor-pointer ${
            wishlisted
              ? 'bg-amber-500 text-neutral-950 scale-105 shadow-lg'
              : 'bg-neutral-950/80 text-neutral-300 hover:text-amber-400 hover:bg-neutral-900'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Floating Desktop Quick View Action */}
        <div className="absolute inset-x-3 bottom-3 hidden lg:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2 bg-neutral-950/90 hover:bg-neutral-900 text-neutral-200 hover:text-amber-400 border border-neutral-700/80 text-xs font-medium tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 backdrop-blur-sm cursor-pointer"
          >
            <Eye size={13} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* 2. Product Details */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1">
            <span className="uppercase tracking-widest text-[10px] text-amber-400/80">
              {product.subcategory}
            </span>
            <span className="tabular-nums">★ {product.rating}</span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => openProduct(product.id)}
            className="font-medium text-xs sm:text-sm text-neutral-100 hover:text-amber-300 transition-colors line-clamp-1 cursor-pointer leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Price */}
          <div className="mt-2 flex items-baseline gap-2 flex-wrap">
            <span className="font-mono text-sm sm:text-base font-semibold text-neutral-100 tabular-nums">
              PKR {product.price.toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="font-mono text-xs text-neutral-500 line-through tabular-nums">
                PKR {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Available Sizes & Colors Micro-Selectors */}
          <div className="mt-3 flex items-center justify-between gap-2 border-t border-neutral-800/60 pt-2.5">
            {/* Size pills */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {product.sizes.slice(0, 4).map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(size);
                  }}
                  className={`px-1.5 py-0.5 text-[10px] font-mono border transition-colors cursor-pointer ${
                    selectedSize === size
                      ? 'border-amber-400 text-amber-300 bg-amber-400/10'
                      : 'border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  {size}
                </button>
              ))}
              {product.sizes.length > 4 && (
                <span className="text-[10px] text-neutral-500">+{product.sizes.length - 4}</span>
              )}
            </div>

            {/* Color dots */}
            <div className="flex items-center gap-1 shrink-0">
              {product.colors.slice(0, 3).map(color => (
                <button
                  key={color.name}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(color.name);
                  }}
                  className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                    selectedColor === color.name
                      ? 'ring-1 ring-amber-400 scale-110 border-neutral-900'
                      : 'border-neutral-700 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={color.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 3. Action Button (Touch-optimized on mobile & responsive) */}
        <div className="mt-3.5 pt-2 border-t border-neutral-800/40">
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-3 text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer rounded-sm ${
              isAddedRecently
                ? 'bg-emerald-600 text-white'
                : 'bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-neutral-200'
            }`}
          >
            {isAddedRecently ? (
              <>
                <Check size={14} />
                <span>Added to Bag</span>
              </>
            ) : isVipRestricted || isGoldRestricted ? (
              <>
                <Crown size={14} className="text-amber-400" />
                <span>VIP Unlock</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
