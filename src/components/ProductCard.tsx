import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, Crown, Check, Zap, ArrowRight, Star } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

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
    setActiveView,
    user,
  } = useShop();

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Standard');
  const [isAddedRecently, setIsAddedRecently] = useState(false);

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

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isVipRestricted || isGoldRestricted) {
      openProduct(product.id);
      return;
    }
    addToCart(product, selectedSize, selectedColor, 1);
    setActiveView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    openProduct(product.id);
  };

  const wishlisted = isWishlisted(product.id);

  // Calculate discount percentage if not explicitly defined
  const discountPercent = product.discountPercent || (
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0
  );

  return (
    <div
      className="group relative flex flex-col bg-neutral-900/60 border border-neutral-800/80 hover:border-amber-500/50 transition-all duration-300 rounded overflow-hidden shadow-lg hover:shadow-amber-500/5"
    >
      {/* 1. Image Container with 3:4 Aspect ratio */}
      <div
        onClick={handleOpenDetails}
        className="relative w-full aspect-[3/4] bg-neutral-950 cursor-pointer overflow-hidden"
      >
        <ImageWithFallback
          src={product.images[0]}
          alt={product.name}
          fallbackCategory={product.category === 'men' ? 'men' : product.category === 'women' ? 'women' : 'children'}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient scrim for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {product.isVipExclusive && (
            <span className="bg-neutral-950/90 text-amber-400 border border-amber-500/40 text-[10px] tracking-widest font-semibold px-2 py-0.5 uppercase flex items-center gap-1 rounded-sm shadow-md">
              <Crown size={10} />
              <span>{product.minVipTier || 'VIP'} VIP</span>
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-rose-950/95 text-rose-300 border border-rose-700/60 text-[10px] font-bold px-2 py-0.5 tracking-wider rounded-sm shadow-md">
              -{discountPercent}% OFF
            </span>
          )}
          {product.isNewArrival && discountPercent === 0 && (
            <span className="bg-neutral-950/90 text-amber-300 border border-amber-500/30 text-[10px] tracking-wider px-2 py-0.5 uppercase rounded-sm shadow-md">
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
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all duration-200 cursor-pointer z-10 ${
            wishlisted
              ? 'bg-amber-500 text-neutral-950 scale-105 shadow-lg'
              : 'bg-neutral-950/80 text-neutral-300 hover:text-amber-400 hover:bg-neutral-900 border border-neutral-800'
          }`}
          title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Floating Desktop Quick View / Details Trigger */}
        <div className="absolute inset-x-3 bottom-3 hidden lg:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-1.5 bg-neutral-950/90 hover:bg-neutral-900 text-neutral-200 hover:text-amber-400 border border-neutral-700/80 text-[11px] font-medium tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 backdrop-blur-sm cursor-pointer rounded-sm"
          >
            <Eye size={12} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* 2. Product Details */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Star Rating */}
          <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1">
            <span className="uppercase tracking-widest text-[10px] font-semibold text-amber-400/90 truncate max-w-[65%]">
              {product.subcategory}
            </span>
            <div className="flex items-center gap-1 text-amber-400 shrink-0">
              <Star size={11} fill="currentColor" />
              <span className="font-mono text-[11px] font-semibold text-neutral-200 tabular-nums">{product.rating}</span>
              <span className="text-[10px] text-neutral-500">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3
            onClick={handleOpenDetails}
            className="font-medium text-xs sm:text-sm text-neutral-100 hover:text-amber-300 transition-colors line-clamp-1 cursor-pointer leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Pricing with Original & Discount */}
          <div className="mt-2 flex items-baseline gap-2 flex-wrap">
            <span className="font-mono text-sm sm:text-base font-bold text-amber-300 tabular-nums">
              PKR {product.price.toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="font-mono text-xs text-neutral-500 line-through tabular-nums">
                PKR {product.originalPrice.toLocaleString()}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-tight">
                Save {discountPercent}%
              </span>
            )}
          </div>

          {/* Sizes and Colors */}
          <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-neutral-800/60 pt-2">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {product.sizes.slice(0, 3).map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(size);
                  }}
                  className={`px-1.5 py-0.5 text-[9px] font-mono border transition-colors cursor-pointer rounded-xs ${
                    selectedSize === size
                      ? 'border-amber-400 text-amber-300 bg-amber-400/10'
                      : 'border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  {size}
                </button>
              ))}
              {product.sizes.length > 3 && (
                <span className="text-[9px] text-neutral-500">+{product.sizes.length - 3}</span>
              )}
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {product.colors.slice(0, 3).map(color => (
                <button
                  key={color.name}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(color.name);
                  }}
                  className={`w-3 h-3 rounded-full border transition-all cursor-pointer ${
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

        {/* 3. Action Buttons: Add to Cart, Buy Now, and Details */}
        <div className="pt-2 border-t border-neutral-800/50 space-y-1.5">
          <div className="grid grid-cols-2 gap-1.5">
            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleQuickAdd}
              className={`py-2 px-2 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer rounded-sm ${
                isAddedRecently
                  ? 'bg-emerald-600 text-white'
                  : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
              }`}
              title="Add product to shopping cart"
            >
              {isAddedRecently ? (
                <>
                  <Check size={12} />
                  <span>Added</span>
                </>
              ) : isVipRestricted || isGoldRestricted ? (
                <>
                  <Crown size={12} className="text-amber-400" />
                  <span>VIP</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={12} />
                  <span>Add to Bag</span>
                </>
              )}
            </button>

            {/* Buy Now Button */}
            <button
              type="button"
              onClick={handleBuyNow}
              className="py-2 px-2 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer rounded-sm bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-sm"
              title="Buy now and proceed directly to checkout"
            >
              <Zap size={12} fill="currentColor" />
              <span>Buy Now</span>
            </button>
          </div>

          {/* Product Details Button */}
          <button
            type="button"
            onClick={handleOpenDetails}
            className="w-full py-1.5 px-2 text-[10px] font-medium tracking-wider uppercase text-neutral-400 hover:text-amber-300 hover:bg-neutral-800/50 border border-transparent hover:border-neutral-800 transition-colors flex items-center justify-center gap-1 cursor-pointer rounded-sm"
          >
            <span>Product Details</span>
            <ArrowRight size={11} />
          </button>
        </div>
      </div>
    </div>
  );
};
