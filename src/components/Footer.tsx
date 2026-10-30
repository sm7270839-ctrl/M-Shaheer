import React, { useState } from 'react';
import { useShop, AppView } from '../context/ShopContext';
import {
  Crown,
  Truck,
  ShieldCheck,
  RotateCcw,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Check,
  BookOpen
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, homepageConfig, showToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address.');
      return;
    }
    setNewsletterSubscribed(true);
    showToast('Subscribed to M.SHAHEER VIP Haute Couture Gazette.');
    setNewsletterEmail('');
  };

  const navTo = (view: AppView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400">
      {/* 1. Value Proposition Pillars Bar */}
      <div className="border-b border-neutral-900 bg-neutral-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Truck size={24} className="text-amber-400 mb-2" />
              <h5 className="font-semibold text-xs tracking-wider uppercase text-neutral-200">
                Nationwide Express
              </h5>
              <p className="text-[11px] text-neutral-400 mt-1">
                Complimentary delivery across Pakistan above PKR 5,000
              </p>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck size={24} className="text-amber-400 mb-2" />
              <h5 className="font-semibold text-xs tracking-wider uppercase text-neutral-200">
                Cash on Delivery
              </h5>
              <p className="text-[11px] text-neutral-400 mt-1">
                Verify and inspect at your doorstep before payment
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Crown size={24} className="text-amber-400 mb-2" />
              <h5 className="font-semibold text-xs tracking-wider uppercase text-neutral-200">
                VIP Privilege Club
              </h5>
              <p className="text-[11px] text-neutral-400 mt-1">
                Earn multiplier points and up to 15% automatic discount
              </p>
            </div>
            <div className="flex flex-col items-center">
              <RotateCcw size={24} className="text-amber-400 mb-2" />
              <h5 className="font-semibold text-xs tracking-wider uppercase text-neutral-200">
                Effortless Returns
              </h5>
              <p className="text-[11px] text-neutral-400 mt-1">
                14-day luxury exchange guarantee on all orders
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="font-serif text-2xl font-bold tracking-[0.25em] text-neutral-100">
              M.SHAHEER
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Pakistan's preeminent luxury fashion maison, bridging traditional heritage craftsmanship, intricate hand-embroidery, and contemporary bespoke silhouettes for Men, Women, and Children.
            </p>
            <div className="space-y-2 text-xs text-neutral-400 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-amber-400 shrink-0 mt-0.5" />
                <span>{homepageConfig.storeAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-amber-400 shrink-0" />
                <span>WhatsApp / Phone: {homepageConfig.storePhone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-amber-400 shrink-0" />
                <span>Concierge: {homepageConfig.storeEmail}</span>
              </div>
            </div>
          </div>

          {/* Fashion Collections */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-semibold uppercase tracking-widest text-neutral-200">
              Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navTo('men')} className="hover:text-amber-400 transition-colors">
                  Men's Couture
                </button>
              </li>
              <li>
                <button onClick={() => navTo('women')} className="hover:text-amber-400 transition-colors">
                  Women's Atelier
                </button>
              </li>
              <li>
                <button onClick={() => navTo('children')} className="hover:text-amber-400 transition-colors">
                  Junior & Kids
                </button>
              </li>
              <li>
                <button onClick={() => navTo('vip')} className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <Crown size={12} className="text-amber-400" />
                  <span>VIP Private Salon</span>
                </button>
              </li>
              <li>
                <button onClick={() => navTo('new-arrivals')} className="hover:text-amber-400 transition-colors">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => navTo('sale')} className="hover:text-rose-400 transition-colors">
                  Seasonal Archive Sale
                </button>
              </li>
              <li>
                <button onClick={() => navTo('gift-cards')} className="hover:text-amber-400 transition-colors">
                  M.SHAHEER Gift Cards
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-semibold uppercase tracking-widest text-neutral-200">
              Client Relations
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navTo('track-order')} className="hover:text-amber-400 transition-colors">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => navTo('account')} className="hover:text-amber-400 transition-colors">
                  VIP Member Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navTo('faq')} className="hover:text-amber-400 transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => navTo('terms')} className="hover:text-amber-400 transition-colors">
                  Shipping & COD Policy
                </button>
              </li>
              <li>
                <button onClick={() => navTo('privacy')} className="hover:text-amber-400 transition-colors">
                  Privacy & Data Security
                </button>
              </li>
              <li>
                <button onClick={() => navTo('contact')} className="hover:text-amber-400 transition-colors">
                  Boutique Locations
                </button>
              </li>
              <li>
                <button onClick={() => navTo('guide')} className="text-amber-400 font-medium hover:underline flex items-center gap-1">
                  <BookOpen size={12} />
                  <span>Owner's Website Guide</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Gazette Newsletter */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-semibold uppercase tracking-widest text-neutral-200">
              The Gazette
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Subscribe to receive private invitations to runway previews, VIP trunk shows, and member-only promotions.
            </p>
            {newsletterSubscribed ? (
              <div className="p-3 bg-neutral-900 border border-emerald-500/40 text-emerald-300 text-xs rounded flex items-center gap-2">
                <Check size={16} />
                <span>You have been enrolled in our VIP Gazette.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-neutral-900 border border-neutral-800 px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400 rounded-l"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-neutral-950 px-3 py-2 text-xs font-bold rounded-r transition-colors cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <ArrowRight size={15} />
                  </button>
                </div>
                <p className="text-[10px] text-neutral-500">
                  By subscribing, you agree to receive promotional communications. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 3. Bottom Legal & Admin Access */}
      <div className="border-t border-neutral-900 bg-neutral-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} M.SHAHEER Haute Couture & Lifestyle. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => navTo('terms')} className="hover:text-neutral-300 transition-colors">
              Terms of Service
            </button>
            <button onClick={() => navTo('privacy')} className="hover:text-neutral-300 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => navTo('admin')} className="hover:text-amber-400 text-amber-500/80 font-medium transition-colors">
              Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
