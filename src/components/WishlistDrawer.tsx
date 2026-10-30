import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistDrawerOpen,
    setIsWishlistDrawerOpen,
    wishlist,
    products,
    toggleWishlist,
    addToCart,
    openProduct,
  } = useShop();

  if (!isWishlistDrawerOpen) return null;

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistDrawerOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-neutral-950 border-l border-neutral-800 h-full flex flex-col z-10 shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="text-amber-400" size={20} fill="currentColor" />
            <h2 className="font-serif text-lg tracking-wider text-neutral-100">
              Saved Wishlist ({wishlistedProducts.length})
            </h2>
          </div>
          <button
            onClick={() => setIsWishlistDrawerOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close wishlist"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-neutral-900">
          {wishlistedProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-neutral-400 py-12">
              <Heart size={44} className="text-neutral-700 mb-3 stroke-1" />
              <p className="font-serif text-lg text-neutral-200 mb-1">Your wishlist is empty</p>
              <p className="text-xs text-neutral-500 max-w-xs mb-6">
                Save your favorite pieces by clicking the heart icon on any product card.
              </p>
              <button
                onClick={() => setIsWishlistDrawerOpen(false)}
                className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-semibold text-xs tracking-wider uppercase transition-colors"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            wishlistedProducts.map(product => (
              <div key={product.id} className="pt-4 first:pt-0 flex gap-4">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  onClick={() => {
                    setIsWishlistDrawerOpen(false);
                    openProduct(product.id);
                  }}
                  className="w-20 h-24 object-cover object-top bg-neutral-900 rounded shrink-0 cursor-pointer border border-neutral-800"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4
                        onClick={() => {
                          setIsWishlistDrawerOpen(false);
                          openProduct(product.id);
                        }}
                        className="text-xs sm:text-sm font-medium text-neutral-100 hover:text-amber-300 transition-colors cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="text-neutral-500 hover:text-rose-400 p-1 transition-colors"
                        title="Remove from wishlist"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="text-[11px] text-amber-400/80 uppercase tracking-widest mt-0.5">
                      {product.subcategory}
                    </div>
                    <div className="font-mono text-xs sm:text-sm font-semibold text-neutral-100 mt-1">
                      PKR {product.price.toLocaleString()}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => {
                        addToCart(product, product.sizes[0] || 'Standard', product.colors[0]?.name || 'Standard', 1);
                        toggleWishlist(product.id);
                      }}
                      className="flex-1 py-1.5 px-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 rounded-sm"
                    >
                      <ShoppingBag size={13} />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
