import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import {
  Heart,
  ShoppingBag,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  Crown,
  Check,
  ChevronRight,
  Share2,
  Sparkles,
  Info
} from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    toggleWishlist,
    isWishlisted,
    user,
    vipTiers,
    reviews,
    addReview,
    setActiveView,
    showToast,
  } = useShop();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  // Review submission state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewAuthor, setReviewAuthor] = useState(user.name);

  const productReviews = reviews.filter(r => r.productId === product.id && r.isApproved);
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const isVipRestricted =
    product.isVipExclusive &&
    product.minVipTier === 'Platinum' &&
    user.vipTier !== 'Platinum';

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      showToast('Please provide your review feedback.');
      return;
    }
    addReview(product.id, reviewRating, reviewComment, reviewAuthor);
    setReviewComment('');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard.');
    }
  };

  const currentTier = vipTiers.find(t => t.id === user.vipTier);
  const tierDiscount = currentTier ? Math.round((product.price * currentTier.discountPercent) / 100) : 0;
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* 1. Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-neutral-400">
        <button onClick={() => setActiveView('home')} className="hover:text-amber-400">
          Home
        </button>
        <ChevronRight size={12} />
        <button onClick={() => setActiveView(product.category as any)} className="hover:text-amber-400 uppercase">
          {product.category}
        </button>
        <ChevronRight size={12} />
        <span className="text-neutral-200 line-clamp-1">{product.name}</span>
      </nav>

      {/* 2. Main Product Grid: Gallery Left, Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

        {/* Gallery: 7 Columns */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[3/4] w-full bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-top transition-all duration-300"
            />
            {product.discountPercent && (
              <span className="absolute top-4 left-4 bg-rose-950 text-rose-300 border border-rose-800/40 text-xs font-semibold px-3 py-1 rounded">
                -{product.discountPercent}% OFF
              </span>
            )}
            {product.isVipExclusive && (
              <span className="absolute top-4 right-4 bg-neutral-950/90 text-amber-400 border border-amber-500/40 text-xs font-semibold px-3 py-1 rounded flex items-center gap-1.5">
                <Crown size={14} />
                <span>{product.minVipTier || 'VIP'} EXCLUSIVE</span>
              </span>
            )}
          </div>

          {/* Multiple Image Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-24 rounded overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-amber-400 scale-105'
                      : 'border-neutral-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Angle thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Purchase Module: 5 Columns (Sticky) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2 border-b border-neutral-800 pb-5">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span className="uppercase tracking-widest text-amber-400 font-semibold">
                {product.category} · {product.subcategory}
              </span>
              <button
                onClick={handleShare}
                className="hover:text-amber-400 flex items-center gap-1 text-[11px]"
              >
                <Share2 size={13} />
                <span>Share</span>
              </button>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-neutral-100">
              {product.name}
            </h1>

            {/* Ratings Summary */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                    className={i < Math.floor(product.rating) ? '' : 'text-neutral-700'}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-neutral-300">★ {product.rating}</span>
              <span className="text-xs text-neutral-500">({product.reviewCount} verified reviews)</span>
            </div>
          </div>

          {/* Price Block */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-neutral-100">
                PKR {product.price.toLocaleString()}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="font-mono text-base text-neutral-500 line-through">
                  PKR {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* VIP Tier Benefit Preview */}
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                <Crown size={14} />
                <span>VIP Club Privilege ({user.vipTier} Member)</span>
              </div>
              <p className="text-[11px] text-neutral-300">
                Your account qualifies for an automatic {currentTier?.discountPercent}% discount (Save PKR {tierDiscount.toLocaleString()}) at checkout.
              </p>
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300">
              Color: <span className="text-amber-300 font-normal">{selectedColor}</span>
            </label>
            <div className="flex items-center gap-2.5">
              {product.colors.map(color => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
                    selectedColor === color.name
                      ? 'border-amber-400 ring-2 ring-amber-400/30 scale-110'
                      : 'border-neutral-700 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold uppercase tracking-wider text-neutral-300">
                Select Size: <span className="text-amber-300 font-normal">{selectedSize}</span>
              </label>
              <button
                type="button"
                onClick={() => setSizeGuideOpen(!sizeGuideOpen)}
                className="text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Info size={12} />
                <span>Size Guide</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-xs font-mono border rounded transition-all cursor-pointer ${
                    selectedSize === size
                      ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-bold'
                      : 'border-neutral-800 text-neutral-300 hover:border-neutral-600'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Size Guide Accordion */}
          {sizeGuideOpen && (
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded text-xs space-y-2 text-neutral-300">
              <div className="font-semibold text-neutral-100">Standard Tailoring Measurements:</div>
              <div className="grid grid-cols-4 gap-2 text-[11px] font-mono border-t border-neutral-800 pt-2">
                <span>Size</span><span>Chest (in)</span><span>Waist (in)</span><span>Length (in)</span>
                <span>S / 38</span><span>38</span><span>32</span><span>29</span>
                <span>M / 40</span><span>40</span><span>34</span><span>30</span>
                <span>L / 42</span><span>42</span><span>36</span><span>31</span>
                <span>XL / 44</span><span>44</span><span>38</span><span>32</span>
              </div>
            </div>
          )}

          {/* Quantity & Stock Status */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-neutral-800 rounded bg-neutral-900 w-32">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-neutral-400 hover:text-white"
                aria-label="Reduce quantity"
              >
                -
              </button>
              <span className="flex-1 text-center font-mono text-sm text-neutral-100 font-semibold">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-3 py-2 text-neutral-400 hover:text-white"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <div className="text-xs text-neutral-400">
              <span className="text-emerald-400 font-semibold">In Stock</span> ({product.stock} pieces remaining in boutique)
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isVipRestricted}
                className={`flex-1 py-3.5 px-6 font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 rounded cursor-pointer ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : isVipRestricted
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                    : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-xl shadow-amber-500/15'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={18} />
                    <span>Added to Shopping Bag</span>
                  </>
                ) : isVipRestricted ? (
                  <>
                    <Crown size={18} />
                    <span>Platinum VIP Exclusive</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Add to Shopping Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 border rounded transition-colors cursor-pointer ${
                  wishlisted
                    ? 'border-amber-500 bg-amber-500 text-neutral-950'
                    : 'border-neutral-800 text-neutral-300 hover:border-neutral-600'
                }`}
                title="Wishlist"
                aria-label="Toggle Wishlist"
              >
                <Heart size={20} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Quick Buy with Cash on Delivery */}
            <button
              onClick={() => {
                addToCart(product, selectedSize, selectedColor, quantity);
                setActiveView('checkout');
              }}
              className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-100 font-semibold text-xs tracking-widest uppercase transition-colors"
            >
              Express Checkout (Cash on Delivery)
            </button>
          </div>

          {/* Guarantee Badges */}
          <div className="pt-4 border-t border-neutral-800/80 grid grid-cols-2 gap-3 text-[11px] text-neutral-400">
            <div className="flex items-center gap-2">
              <Truck size={16} className="text-amber-400 shrink-0" />
              <span>Complimentary Courier over PKR 5,000</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-amber-400 shrink-0" />
              <span>Cash on Delivery Available</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw size={16} className="text-amber-400 shrink-0" />
              <span>14 Days Exchange Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Crown size={16} className="text-amber-400 shrink-0" />
              <span>Authentic Handcrafted Masterpiece</span>
            </div>
          </div>

          {/* Description & Fabric Details */}
          <div className="pt-4 border-t border-neutral-800 space-y-3">
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-neutral-200">
              Artisan Craftsmanship & Fabric
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {product.description}
            </p>
            {product.fabric && (
              <div className="text-xs text-neutral-400">
                <strong className="text-neutral-200">Fabric Composition:</strong> {product.fabric}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Customer Reviews Section */}
      <section className="border-t border-neutral-800 pt-12 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-bold tracking-wider text-neutral-100">
              Customer Reviews ({productReviews.length})
            </h2>
            <p className="text-xs text-neutral-400">
              Authentic reviews from verified M.SHAHEER patrons.
            </p>
          </div>
        </div>

        {/* Existing Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {productReviews.length === 0 ? (
            <div className="p-6 bg-neutral-900/50 rounded border border-neutral-800 text-xs text-neutral-400">
              No written reviews yet for this edition. Be the first to share your experience!
            </div>
          ) : (
            productReviews.map(r => (
              <div key={r.id} className="p-5 bg-neutral-900/60 border border-neutral-800 rounded space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} size={13} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[11px] text-neutral-500 font-mono">{r.date}</span>
                </div>
                <p className="text-xs text-neutral-300 italic">"{r.comment}"</p>
                <div className="pt-2 text-[11px] text-neutral-400 flex items-center justify-between">
                  <span className="font-semibold text-neutral-200">{r.customerName}</span>
                  {r.isVerifiedPurchase && (
                    <span className="text-emerald-400 text-[10px] flex items-center gap-1 font-semibold">
                      <Check size={12} /> Verified Purchase
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Review Form */}
        <div className="p-6 bg-neutral-900/70 border border-neutral-800 rounded-lg max-w-xl space-y-4">
          <h4 className="font-serif text-sm font-semibold tracking-wider text-neutral-200">
            Write a Verified Review
          </h4>
          <form onSubmit={handleReviewSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={reviewAuthor}
                onChange={(e) => setReviewAuthor(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    className="text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star
                      size={20}
                      fill={star <= reviewRating ? 'currentColor' : 'none'}
                      className={star <= reviewRating ? '' : 'text-neutral-700'}
                    />
                  </button>
                ))}
                <span className="text-xs font-mono text-neutral-400 ml-2">{reviewRating} Stars</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                Feedback & Experience
              </label>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share your experience regarding tailoring fit, fabric feel, and craftsmanship..."
                rows={3}
                className="w-full bg-neutral-950 border border-neutral-800 p-3 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer rounded"
            >
              Submit Review
            </button>
          </form>
        </div>
      </section>

      {/* 4. Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-neutral-800 pt-12 space-y-6">
          <div>
            <span className="text-amber-400 font-serif tracking-widest text-xs uppercase font-semibold">
              Complete The Look
            </span>
            <h2 className="font-serif text-2xl font-bold tracking-wider text-neutral-100 mt-1">
              Related Creations
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
