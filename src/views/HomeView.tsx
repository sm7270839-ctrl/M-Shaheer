import React from 'react';
import { useShop, AppView } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { ImageWithFallback } from '../components/ImageWithFallback';
import {
  ArrowRight,
  Crown,
  Sparkles,
  ShieldCheck,
  Star,
  CheckCircle2,
  TrendingUp,
  Settings
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    products,
    homepageConfig,
    setActiveView,
    setActiveSubcategoryFilter,
    setActiveGenderFilter,
    reviews,
    vipTiers,
  } = useShop();

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 8);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const vipExclusives = products.filter(p => p.isVipExclusive);

  const navigateTo = (view: AppView, subcategory: string | null = null, gender: 'all' | 'boys' | 'girls' = 'all') => {
    setActiveSubcategoryFilter(subcategory);
    setActiveGenderFilter(gender);
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">

      {/* 1. Large Premium Fashion Hero Banner */}
      <section className="relative min-h-[580px] lg:min-h-[680px] flex items-center justify-center overflow-hidden bg-neutral-950 border-b border-neutral-800">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={homepageConfig.heroBannerImage}
            alt="M.SHAHEER Luxury Haute Couture"
            fallbackCategory="men"
            className="w-full h-full object-cover object-center filter brightness-[0.65] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-neutral-950/80 border border-amber-500/40 text-amber-300 text-xs tracking-[0.25em] font-semibold uppercase backdrop-blur-sm rounded-sm">
            <Sparkles size={13} className="text-amber-400" />
            <span>Maison De Haute Couture · Est. Pakistan</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.18em] text-neutral-100 leading-tight">
            {homepageConfig.heroHeadline}
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
            {homepageConfig.heroSubtext}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('men')}
              className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 cursor-pointer"
            >
              <span>{homepageConfig.heroCtaText}</span>
              <ArrowRight size={15} />
            </button>
            <button
              onClick={() => navigateTo('vip')}
              className="w-full sm:w-auto px-8 py-3.5 bg-neutral-950/80 hover:bg-neutral-900 text-neutral-100 hover:text-amber-300 border border-amber-500/40 font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm cursor-pointer"
            >
              <Crown size={15} className="text-amber-400" />
              <span>Explore VIP Lounge</span>
            </button>
          </div>
        </div>

        {/* Quick Admin Shortcut Badge */}
        <button
          onClick={() => navigateTo('admin')}
          className="absolute bottom-4 right-4 z-10 px-3 py-1.5 bg-neutral-950/80 border border-neutral-800 text-[11px] text-neutral-400 hover:text-amber-400 hover:border-amber-500/40 rounded flex items-center gap-1.5 backdrop-blur-sm"
          title="Edit hero content in Admin Dashboard"
        >
          <Settings size={12} />
          <span>Edit Banner</span>
        </button>
      </section>

      {/* 2. Three Attractive Category Cards: Men, Women, Children */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <span className="text-amber-400 font-serif tracking-[0.2em] text-xs uppercase font-semibold">
            Curated Universes
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-neutral-100">
            Discover By Category
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Men's Card */}
          <div
            onClick={() => navigateTo('men')}
            className="group relative h-[420px] rounded overflow-hidden border border-neutral-800 hover:border-amber-500/50 transition-all duration-500 cursor-pointer bg-neutral-900"
          >
            <ImageWithFallback
              src={homepageConfig.menBannerImage}
              alt="Men's Luxury Collection"
              fallbackCategory="men"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 flex flex-col items-start space-y-2">
              <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase">
                13 Subcategories
              </span>
              <h3 className="font-serif text-2xl font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
                Men's Collection
              </h3>
              <p className="text-xs text-neutral-400 line-clamp-2">
                Suits, Kurta Pajama, Double-Breasted Dinner Tuxedos, Swiss Chronographs & Peshawari Chappals.
              </p>
              <div className="pt-2 text-xs font-semibold text-neutral-200 group-hover:text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                <span>Explore Men</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Women's Card */}
          <div
            onClick={() => navigateTo('women')}
            className="group relative h-[420px] rounded overflow-hidden border border-neutral-800 hover:border-amber-500/50 transition-all duration-500 cursor-pointer bg-neutral-900"
          >
            <ImageWithFallback
              src={homepageConfig.womenBannerImage}
              alt="Women's Luxury Collection"
              fallbackCategory="women"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 flex flex-col items-start space-y-2">
              <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase">
                13 Subcategories
              </span>
              <h3 className="font-serif text-2xl font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
                Women's Collection
              </h3>
              <p className="text-xs text-neutral-400 line-clamp-2">
                Handcrafted Bridal Ghararas, 3-Piece Jacquard Suits, Gala Velvet Gowns, Jewelry & Leather Totes.
              </p>
              <div className="pt-2 text-xs font-semibold text-neutral-200 group-hover:text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                <span>Explore Women</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Children's Card */}
          <div
            onClick={() => navigateTo('children')}
            className="group relative h-[420px] rounded overflow-hidden border border-neutral-800 hover:border-amber-500/50 transition-all duration-500 cursor-pointer bg-neutral-900"
          >
            <ImageWithFallback
              src={homepageConfig.childrenBannerImage}
              alt="Children's Luxury Collection"
              fallbackCategory="children"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 flex flex-col items-start space-y-2">
              <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase">
                Boys & Girls
              </span>
              <h3 className="font-serif text-2xl font-bold text-neutral-100 group-hover:text-amber-300 transition-colors">
                Children's Collection
              </h3>
              <p className="text-xs text-neutral-400 line-clamp-2">
                Junior Tailored Suits, Golden Tulle Party Frocks, Festive Kurtas, Loafers & School Accessories.
              </p>
              <div className="pt-2 text-xs font-semibold text-neutral-200 group-hover:text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                <span>Explore Junior</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Couture Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-neutral-800">
          <div>
            <span className="text-amber-400 font-serif tracking-[0.2em] text-xs uppercase font-semibold">
              Signature Editions
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-neutral-100 mt-1">
              Featured Products
            </h2>
          </div>
          <button
            onClick={() => navigateTo('men')}
            className="text-xs font-semibold text-neutral-300 hover:text-amber-400 tracking-wider uppercase flex items-center gap-1.5 transition-colors"
          >
            <span>View All Pieces</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Responsive Grid: 2 on mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. VIP Privilege Club Banner & Membership Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-xl overflow-hidden border border-amber-500/30 p-8 sm:p-12 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
          <div className="max-w-3xl space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-widest uppercase rounded">
              <Crown size={14} />
              <span>The M.SHAHEER Privilege Club</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-neutral-100 tracking-wider">
              {homepageConfig.vipHeadline}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {homepageConfig.vipSubtext}
            </p>
          </div>

          {/* 3 VIP Tiers Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vipTiers.map(tier => (
              <div
                key={tier.id}
                className={`p-6 rounded-lg border transition-all duration-300 ${tier.cardTheme} flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono tracking-widest uppercase text-amber-300 font-bold">
                      {tier.badge}
                    </span>
                    <Crown size={18} className="text-amber-400" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-neutral-100 mb-1">
                    {tier.name}
                  </h3>
                  <div className="text-2xl font-mono font-bold text-amber-300 mb-4">
                    {tier.discountPercent}% OFF
                  </div>
                  <ul className="space-y-2 text-xs text-neutral-300">
                    {tier.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={13} className="text-amber-400 shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6 mt-6 border-t border-neutral-800/80">
                  <button
                    onClick={() => navigateTo('account')}
                    className="w-full py-2 bg-neutral-950/80 hover:bg-amber-500 hover:text-neutral-950 border border-neutral-700 text-neutral-200 text-xs font-semibold tracking-wider uppercase transition-colors"
                  >
                    View Status & Benefits
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. New Arrivals & Best Sellers Dual Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* New Arrivals */}
        <div>
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-800">
            <div>
              <span className="text-amber-400 font-serif tracking-widest text-xs uppercase font-semibold">
                Fresh Off The Atelier
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-neutral-100">
                New Arrivals
              </h3>
            </div>
            <button
              onClick={() => navigateTo('new-arrivals')}
              className="text-xs font-semibold text-neutral-400 hover:text-amber-400 uppercase tracking-wider flex items-center gap-1"
            >
              <span>See All</span>
              <ArrowRight size={13} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>

        {/* Best Sellers */}
        <div>
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-800">
            <div>
              <span className="text-amber-400 font-serif tracking-widest text-xs uppercase font-semibold">
                Client Favorites
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-neutral-100">
                Best Sellers
              </h3>
            </div>
            <button
              onClick={() => navigateTo('men')}
              className="text-xs font-semibold text-neutral-400 hover:text-amber-400 uppercase tracking-wider flex items-center gap-1"
            >
              <span>See All</span>
              <ArrowRight size={13} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Customer Testimonials & Verified Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <span className="text-amber-400 font-serif tracking-[0.2em] text-xs uppercase font-semibold">
            Client Voices
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-neutral-100">
            Verified Customer Reviews
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.filter(r => r.isApproved).slice(0, 4).map(rev => (
            <div
              key={rev.id}
              className="p-6 bg-neutral-900/60 border border-neutral-800 rounded flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-2">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-xs text-neutral-300 italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/60 flex items-center justify-between text-[11px]">
                <div>
                  <div className="font-semibold text-neutral-200">{rev.customerName}</div>
                  <div className="text-neutral-500 line-clamp-1">{rev.productName}</div>
                </div>
                {rev.isVerifiedPurchase && (
                  <span className="text-emerald-400 flex items-center gap-1 text-[10px] font-semibold">
                    <CheckCircle2 size={12} />
                    <span>Verified</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
