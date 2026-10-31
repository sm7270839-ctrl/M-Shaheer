import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag, Crown, Check, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const ProductQuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    openProduct,
    user,
  } = useShop();

  if (!quickViewProduct) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(quickViewProduct.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState<string>(quickViewProduct.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const isVipRestricted =
    quickViewProduct.isVipExclusive &&
    quickViewProduct.minVipTier === 'Platinum' &&
    user.vipTier !== 'Platinum';

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedSize, selectedColor, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      setQuickViewProduct(null);
    }, 1500);
  };

  const wishlisted = isWishlisted(quickViewProduct.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 shadow-2xl rounded-lg overflow-hidden z-10 max-h-[92vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between bg-neutral-900/40 border-b md:border-b-0 md:border-r border-neutral-800">
          <div className="relative aspect-[3/4] w-full rounded overflow-hidden bg-neutral-900">
            <ImageWithFallback
              src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              fallbackCategory={quickViewProduct.category === 'men' ? 'men' : quickViewProduct.category === 'women' ? 'women' : 'children'}
              className="w-full h-full object-cover object-top"
            />
            {quickViewProduct.discountPercent && (
              <span className="absolute top-3 left-3 bg-rose-950 text-rose-300 border border-rose-800/40 text-xs font-semibold px-2.5 py-1 tracking-wider rounded-sm z-10">
                -{quickViewProduct.discountPercent}% OFF
              </span>
            )}
          </div>

          {quickViewProduct.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto">
              {quickViewProduct.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`w-14 h-16 rounded overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === i ? 'border-amber-400' : 'border-neutral-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <ImageWithFallback src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Contiguous Purchase Module */}
        <div className="md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span className="uppercase tracking-widest text-amber-400 font-semibold">
                  {quickViewProduct.category} · {quickViewProduct.subcategory}
                </span>
                <span className="font-mono text-neutral-400">SKU: {quickViewProduct.sku || 'MSH-LUX'}</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-neutral-100 mt-1">
                {quickViewProduct.name}
              </h2>
            </div>

            {/* Price Block */}
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xl sm:text-2xl font-bold text-neutral-100">
                PKR {quickViewProduct.price.toLocaleString()}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="font-mono text-sm text-neutral-500 line-through">
                  PKR {quickViewProduct.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-xs text-emerald-400 font-medium">In Stock ({quickViewProduct.stock} available)</span>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {quickViewProduct.description}
            </p>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-300 mb-2">
                <span className="font-semibold tracking-wider uppercase text-[11px]">Select Size</span>
                <span className="text-amber-400 cursor-pointer hover:underline text-[11px]">Size Guide</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickViewProduct.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-2 text-xs font-mono border rounded transition-colors cursor-pointer ${
                      selectedSize === size
                        ? 'border-amber-400 text-amber-300 bg-amber-400/10 font-bold'
                        : 'border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatches */}
            <div>
              <span className="block text-xs font-semibold tracking-wider uppercase text-neutral-300 mb-2">
                Color: <span className="text-amber-300 font-normal">{selectedColor}</span>
              </span>
              <div className="flex items-center gap-2">
                {quickViewProduct.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                      selectedColor === color.name
                        ? 'border-amber-400 scale-110 shadow-lg'
                        : 'border-neutral-700 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div>
              <span className="block text-xs font-semibold tracking-wider uppercase text-neutral-300 mb-2">
                Quantity
              </span>
              <div className="flex items-center border border-neutral-800 rounded bg-neutral-900 w-32">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-neutral-400 hover:text-white"
                >
                  -
                </button>
                <span className="flex-1 text-center font-mono text-sm text-neutral-100 font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(quickViewProduct.stock, quantity + 1))}
                  className="px-3 py-1.5 text-neutral-400 hover:text-white"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t border-neutral-800">
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isVipRestricted}
                className={`flex-1 py-3 px-4 font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 rounded cursor-pointer ${
                  addedSuccess
                    ? 'bg-emerald-600 text-white'
                    : isVipRestricted
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                    : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-lg shadow-amber-500/10'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check size={16} />
                    <span>Added to Bag</span>
                  </>
                ) : isVipRestricted ? (
                  <>
                    <Crown size={16} />
                    <span>Requires Platinum Membership</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>Add to Shopping Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-3 border rounded transition-colors cursor-pointer ${
                  wishlisted
                    ? 'border-amber-500 bg-amber-500 text-neutral-950'
                    : 'border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
                title="Wishlist"
              >
                <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            <button
              onClick={() => {
                setQuickViewProduct(null);
                openProduct(quickViewProduct.id);
              }}
              className="w-full text-center text-xs text-neutral-400 hover:text-amber-300 py-1 flex items-center justify-center gap-1 transition-colors"
            >
              <span>View complete product details & reviews</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
