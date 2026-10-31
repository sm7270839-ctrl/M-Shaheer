import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    setActiveView,
    user,
    vipTiers,
  } = useShop();

  if (!isCartDrawerOpen) return null;

  const freeShippingThreshold = 5000;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);

  const currentTier = vipTiers.find(t => t.id === user.vipTier);
  const estimatedDiscount = currentTier ? Math.round((cartSubtotal * currentTier.discountPercent) / 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-neutral-950 border-l border-neutral-800 h-full flex flex-col z-10 shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-amber-400" size={20} />
            <h2 className="font-serif text-lg tracking-wider text-neutral-100">
              Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Tracker */}
        <div className="px-5 py-3 bg-neutral-900 border-b border-neutral-800 text-xs">
          <div className="flex items-center justify-between text-neutral-300 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck size={14} className="text-amber-400" />
              {amountNeeded > 0 ? (
                <>Add <span className="font-mono text-amber-300 font-semibold">PKR {amountNeeded.toLocaleString()}</span> for Free Nationwide Delivery</>
              ) : (
                <span className="text-emerald-400 font-semibold">Congratulations! You qualify for Free Delivery</span>
              )}
            </span>
            <span className="font-mono text-neutral-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-neutral-900 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-neutral-400 py-12">
              <ShoppingBag size={48} className="text-neutral-700 mb-4 stroke-1" />
              <p className="font-serif text-lg text-neutral-200 mb-1">Your bag is empty</p>
              <p className="text-xs text-neutral-500 max-w-xs mb-6">
                Explore our Haute Couture, Ready-to-Wear, and traditional collections.
              </p>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  setActiveView('men');
                }}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs tracking-wider uppercase transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                <ImageWithFallback
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fallbackCategory={item.product.category === 'men' ? 'men' : item.product.category === 'women' ? 'women' : 'children'}
                  className="w-20 h-24 object-cover object-top bg-neutral-900 rounded shrink-0 border border-neutral-800"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-medium text-neutral-100 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-500 hover:text-rose-400 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-1 flex items-center gap-3">
                      <span>Size: <strong className="text-neutral-200">{item.selectedSize}</strong></span>
                      <span>·</span>
                      <span>Color: <strong className="text-neutral-200">{item.selectedColor}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-neutral-800 rounded bg-neutral-900">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="px-2 py-1 text-neutral-400 hover:text-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-2 py-0.5 text-xs font-mono text-neutral-200 font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="px-2 py-1 text-neutral-400 hover:text-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="font-mono text-xs sm:text-sm font-semibold text-amber-300">
                        PKR {(item.product.price * item.quantity).toLocaleString()}
                      </div>
                      {item.quantity > 1 && (
                        <div className="font-mono text-[10px] text-neutral-500">
                          PKR {item.product.price.toLocaleString()} each
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Subtotal & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 bg-neutral-900 border-t border-neutral-800 space-y-3">
            {/* VIP Tier savings preview */}
            {estimatedDiscount > 0 && (
              <div className="flex items-center justify-between text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded">
                <span>{user.vipTier} Member Privilege ({currentTier?.discountPercent}%):</span>
                <span className="font-mono font-semibold">-PKR {estimatedDiscount.toLocaleString()}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-sm text-neutral-300">
              <span>Subtotal:</span>
              <span className="font-mono text-base font-bold text-neutral-100">
                PKR {cartSubtotal.toLocaleString()}
              </span>
            </div>

            <p className="text-[11px] text-neutral-400">
              Taxes calculated and promotional codes applied during checkout.
            </p>

            <button
              onClick={() => {
                setIsCartDrawerOpen(false);
                setActiveView('checkout');
              }}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-400 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck size={13} className="text-amber-400" />
                <span>Cash on Delivery</span>
              </span>
              <span>·</span>
              <span>100% Authentic Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
