import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  BookOpen,
  Shield,
  Layers,
  Database,
  Globe,
  Sliders,
  DollarSign,
  Palette,
  Image,
  ArrowRight
} from 'lucide-react';

export const OwnersGuideView: React.FC = () => {
  const { setActiveView } = useShop();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest rounded">
          <BookOpen size={14} />
          <span>Beginner-Friendly Store Administration</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-wider text-neutral-100">
          M.SHAHEER Owner's Handbook
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
          A step-by-step guide designed for non-technical boutique owners to manage products, prices, banners, orders, and database connections effortlessly.
        </p>
      </div>

      {/* Quick Launch Buttons */}
      <div className="p-6 bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-950 border border-amber-500/30 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-base font-bold text-neutral-100">
            Open Your Live Admin Portal
          </h3>
          <p className="text-xs text-neutral-400">
            Login using <code className="text-amber-300 font-mono">admin@shaheer.pk</code> with password <code className="text-amber-300 font-mono">ShaheerAdmin2026</code>.
          </p>
        </div>
        <button
          onClick={() => setActiveView('admin')}
          className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Shield size={15} />
          <span>Launch Admin Panel</span>
        </button>
      </div>

      {/* Guides Grid */}
      <div className="space-y-6">

        {/* 1. Add / Edit / Delete Products */}
        <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-3">
          <h3 className="font-serif text-lg font-bold text-neutral-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-mono font-bold">1</span>
            <span>How to Add, Edit & Change Product Prices</span>
          </h3>
          <div className="text-xs text-neutral-300 space-y-2 leading-relaxed">
            <p>
              You don’t need to touch a single line of code to manage your catalogue:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-neutral-400">
              <li>Click on the <strong>Admin</strong> button in the top navigation or footer.</li>
              <li>Authenticate with the administrator credentials.</li>
              <li>Go to the <strong>Products</strong> tab.</li>
              <li>Click <strong>+ Add New Product</strong> or click the <strong>Pencil (Edit)</strong> icon next to any existing item.</li>
              <li>Update the <strong>Price in PKR</strong>, original price, stock quantity, sizes, and colors.</li>
              <li>Click <strong>Save Product</strong>. Your changes will immediately show on the live storefront and update in storage!</li>
            </ol>
          </div>
        </div>

        {/* 2. Changing Banners & Logo */}
        <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-3">
          <h3 className="font-serif text-lg font-bold text-neutral-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-mono font-bold">2</span>
            <span>How to Change Homepage Banners & Contact Information</span>
          </h3>
          <div className="text-xs text-neutral-300 space-y-2 leading-relaxed">
            <ol className="list-decimal pl-5 space-y-1.5 text-neutral-400">
              <li>In the <strong>Admin Portal</strong>, click on the <strong>Homepage & Banners</strong> tab.</li>
              <li>Edit the <strong>Announcement Ticker</strong> text (e.g. promotional discounts or Eid festival alerts).</li>
              <li>Change the <strong>Hero Campaign Headline</strong> and subtext.</li>
              <li>Update your boutique phone number, WhatsApp contact, or physical address.</li>
              <li>Click <strong>Save Homepage Configuration</strong>. All updates take effect instantly.</li>
            </ol>
          </div>
        </div>

        {/* 3. Managing Orders & Cash on Delivery */}
        <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-3">
          <h3 className="font-serif text-lg font-bold text-neutral-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-mono font-bold">3</span>
            <span>Managing Customer Orders & Delivery Statuses</span>
          </h3>
          <div className="text-xs text-neutral-300 space-y-2 leading-relaxed">
            <p>
              When a customer places an order via Cash on Delivery or Bank Transfer:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-neutral-400">
              <li>Go to <strong>Admin &gt; Orders & COD</strong>.</li>
              <li>View customer delivery address, phone number, and ordered items.</li>
              <li>When dispatched with TCS / Leopards Courier, change the status dropdown to <strong>Shipped</strong> or <strong>Out for Delivery</strong>.</li>
              <li>When the rider collects cash, mark it as <strong>Delivered</strong>.</li>
              <li>The customer can track this in real-time on the <strong>Order Tracking</strong> page!</li>
            </ol>
          </div>
        </div>

        {/* 4. Connecting a Permanent Cloud Database */}
        <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-3">
          <h3 className="font-serif text-lg font-bold text-neutral-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-mono font-bold">4</span>
            <span>Connecting a Permanent Backend Database (Firebase or PostgreSQL)</span>
          </h3>
          <div className="text-xs text-neutral-300 space-y-2 leading-relaxed">
            <p>
              The website currently runs with instantaneous persistent storage synced via <code className="text-amber-300 font-mono">localStorage</code>. When you want to connect a centralized cloud database:
            </p>
            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded font-mono text-[11px] text-neutral-300 space-y-1.5">
              <div className="text-amber-400">// Option A: Firebase Firestore (Recommended for zero-server setup)</div>
              <div>1. In Google AI Studio, request "Connect Firebase Firestore"</div>
              <div>2. Accept the interactive setup prompt in the UI</div>
              <div>3. Collections created: <span className="text-amber-300">'products', 'orders', 'users', 'giftCards'</span></div>
              <div className="pt-2 text-amber-400">// Option B: PostgreSQL with Cloud SQL</div>
              <div>1. Request Cloud SQL PostgreSQL provisioning</div>
              <div>2. Express backend in server.ts handles /api/products and /api/orders</div>
            </div>
          </div>
        </div>

        {/* 5. Publishing to Production */}
        <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-3">
          <h3 className="font-serif text-lg font-bold text-neutral-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-mono font-bold">5</span>
            <span>How to Publish & Go Live</span>
          </h3>
          <div className="text-xs text-neutral-300 space-y-2 leading-relaxed">
            <p>
              To deploy your store to a custom domain (e.g. <strong className="text-neutral-100">www.mshaheer.pk</strong>):
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-neutral-400">
              <li>Click the <strong>Share</strong> or <strong>Deploy</strong> button in Google AI Studio to deploy directly to Google Cloud Run.</li>
              <li>Or run <code className="text-amber-300 font-mono">npm run build</code> and host the <code className="text-amber-300 font-mono">dist/</code> folder on Vercel, Netlify, or AWS.</li>
              <li>Point your custom domain DNS records (CNAME or A records) to the host.</li>
            </ol>
          </div>
        </div>

      </div>
    </div>
  );
};
