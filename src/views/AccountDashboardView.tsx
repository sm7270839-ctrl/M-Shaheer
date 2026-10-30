import React, { useState } from 'react';
import { useShop, AppView } from '../context/ShopContext';
import {
  Crown,
  Award,
  Clock,
  MapPin,
  Package,
  Bell,
  Settings,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  QrCode,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { VipTierLevel } from '../types';

export const AccountDashboardView: React.FC = () => {
  const {
    user,
    updateUserProfile,
    vipTiers,
    upgradeUserVipTier,
    orders,
    notifications,
    markNotificationRead,
    setActiveView,
    showToast,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'profile' | 'card' | 'orders' | 'points' | 'notifications'>('card');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [city, setCity] = useState(user.city);
  const [address, setAddress] = useState(user.address);

  const currentTier = vipTiers.find(t => t.id === user.vipTier) || vipTiers[0];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, phone, city, address });
    setIsEditingProfile(false);
  };

  const handleUpgradeTier = (tier: VipTierLevel) => {
    upgradeUserVipTier(tier);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest">
            <Crown size={14} />
            <span>M.SHAHEER VIP Privilege Club</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-neutral-100 mt-1">
            {user.name}'s Account
          </h1>
          <p className="text-xs text-neutral-400">
            Member Since {user.memberSince} · Card: <strong className="font-mono text-neutral-300">{user.membershipCardNumber}</strong>
          </p>
        </div>

        {/* Quick Points Pill */}
        <div className="flex items-center gap-3 p-3 bg-neutral-900 border border-neutral-800 rounded-lg">
          <Award size={24} className="text-amber-400" />
          <div>
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Reward Points</div>
            <div className="font-mono text-base font-bold text-amber-300">{user.rewardPoints} Pts</div>
          </div>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-800 overflow-x-auto no-scrollbar pb-1 text-xs">
        <button
          onClick={() => setActiveTab('card')}
          className={`px-4 py-2 font-medium uppercase tracking-wider rounded-t transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'card'
              ? 'bg-neutral-900 text-amber-400 border-b-2 border-amber-400'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Crown size={14} />
          <span>Digital VIP Card</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 font-medium uppercase tracking-wider rounded-t transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'orders'
              ? 'bg-neutral-900 text-amber-400 border-b-2 border-amber-400'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Package size={14} />
          <span>Order History ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('points')}
          className={`px-4 py-2 font-medium uppercase tracking-wider rounded-t transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'points'
              ? 'bg-neutral-900 text-amber-400 border-b-2 border-amber-400'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Award size={14} />
          <span>Reward Points</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 font-medium uppercase tracking-wider rounded-t transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'profile'
              ? 'bg-neutral-900 text-amber-400 border-b-2 border-amber-400'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Settings size={14} />
          <span>Saved Addresses & Profile</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 font-medium uppercase tracking-wider rounded-t transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'notifications'
              ? 'bg-neutral-900 text-amber-400 border-b-2 border-amber-400'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Bell size={14} />
          <span>Notifications ({notifications.filter(n => !n.read).length})</span>
        </button>
      </div>

      {/* 3. Tab Contents */}

      {/* Tab: Digital VIP Card */}
      {activeTab === 'card' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* The Shimmer VIP Card */}
            <div className="lg:col-span-6 flex justify-center">
              <div className={`relative w-full max-w-md aspect-[1.58/1] rounded-2xl p-6 sm:p-8 flex flex-col justify-between ${currentTier.cardTheme} text-neutral-100 shadow-2xl overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Card Top */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.25em] text-neutral-100 block">
                      M.SHAHEER
                    </span>
                    <span className="text-[10px] tracking-widest text-amber-400 uppercase font-mono">
                      Haute Couture Privilege Club
                    </span>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-neutral-950/80 border border-amber-500/40 rounded text-amber-300 text-[10px] font-bold tracking-widest uppercase">
                    <Crown size={12} />
                    <span>{user.vipTier}</span>
                  </div>
                </div>

                {/* Card Center: Chip & Account Number */}
                <div className="my-auto py-2">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-7 bg-amber-400/30 border border-amber-300/40 rounded flex items-center justify-center">
                      <div className="w-6 h-4 border border-amber-300/60 rounded-xs" />
                    </div>
                    <QrCode size={34} className="text-neutral-400/60" />
                  </div>
                  <div className="font-mono text-sm sm:text-base tracking-[0.25em] text-neutral-200 mt-3">
                    {user.membershipCardNumber.slice(0, 4)} •••• •••• {user.membershipCardNumber.slice(-4)}
                  </div>
                </div>

                {/* Card Bottom */}
                <div className="flex items-end justify-between pt-2 border-t border-neutral-800/80 text-[11px]">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400 block">Cardholder</span>
                    <strong className="font-semibold tracking-wider text-neutral-100 uppercase">{user.name}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400 block">Automatic Discount</span>
                    <strong className="font-mono text-amber-300 text-xs">{currentTier.discountPercent}% OFF EVERY ORDER</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Tier Perks & Upgrade Options */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-2">
                <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold">
                  Active Privilege Level
                </span>
                <h3 className="font-serif text-2xl font-bold text-neutral-100">
                  {currentTier.name} Status
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  You are receiving an automatic {currentTier.discountPercent}% VIP discount on all regular collections and {currentTier.pointsMultiplier}x reward points per purchase.
                </p>
              </div>

              <div className="p-4 bg-neutral-900 border border-neutral-800 rounded space-y-2">
                <span className="text-xs font-semibold text-neutral-200 uppercase tracking-wider block">
                  Included Privileges
                </span>
                <ul className="space-y-1.5 text-xs text-neutral-300">
                  {currentTier.perks.map((perk, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Upgrade Tier Buttons */}
              <div className="space-y-2 pt-2">
                <span className="text-xs text-neutral-400 block font-medium">Switch / Upgrade Membership:</span>
                <div className="flex flex-wrap gap-2">
                  {vipTiers.map(t => (
                    <button
                      key={t.id}
                      onClick={() => handleUpgradeTier(t.id)}
                      className={`px-4 py-2 text-xs font-semibold rounded uppercase tracking-wider transition-all cursor-pointer ${
                        user.vipTier === t.id
                          ? 'bg-amber-500 text-neutral-950 font-bold'
                          : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
                      }`}
                    >
                      {t.name} ({t.discountPercent}%)
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Order History */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-neutral-100">Recent Orders</h3>
            <button
              onClick={() => setActiveView('track-order')}
              className="text-xs text-amber-400 hover:underline flex items-center gap-1"
            >
              <Truck size={14} />
              <span>Order Tracking Portal</span>
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="p-8 text-center bg-neutral-900/40 rounded border border-neutral-800 text-neutral-400 text-xs">
              No orders placed yet.
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-3 text-xs">
                    <div>
                      <span className="text-neutral-500 block">Order ID</span>
                      <strong className="font-mono text-neutral-200">{order.id}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Date</span>
                      <span className="text-neutral-300">{order.date}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Tracking Number</span>
                      <strong className="font-mono text-amber-400">{order.trackingNumber}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Status</span>
                      <span className="px-2.5 py-0.5 bg-neutral-950 border border-amber-500/40 text-amber-300 rounded font-semibold text-[10px] uppercase">
                        {order.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-neutral-500 block">Total Paid</span>
                      <strong className="font-mono text-sm text-neutral-100">PKR {order.total.toLocaleString()}</strong>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {order.items.map(item => (
                      <div key={item.id} className="flex items-center gap-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-12 h-14 object-cover rounded bg-neutral-950 border border-neutral-800"
                        />
                        <div>
                          <div className="font-medium text-neutral-200 line-clamp-1">{item.product.name}</div>
                          <div className="text-[11px] text-neutral-400">
                            Qty: {item.quantity} · Size: {item.selectedSize} · Color: {item.selectedColor}
                          </div>
                          <div className="font-mono text-[11px] text-amber-300">
                            PKR {(item.product.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Status Stepper */}
                  <div className="pt-3 border-t border-neutral-800/80">
                    <div className="text-[11px] text-neutral-400 mb-2">Order Progress Timeline:</div>
                    <div className="space-y-1.5 pl-2 border-l border-amber-500/40 text-xs">
                      {order.statusTimeline.map((step, idx) => (
                        <div key={idx} className="flex items-baseline justify-between text-neutral-300">
                          <div>
                            <strong className="text-amber-400">{step.status}:</strong> {step.note}
                          </div>
                          <span className="font-mono text-[10px] text-neutral-500 ml-2">{step.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Reward Points */}
      {activeTab === 'points' && (
        <div className="space-y-6">
          <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-amber-400 text-xs font-mono uppercase tracking-widest font-semibold">
                Rewards Portfolio
              </span>
              <h3 className="font-serif text-2xl font-bold text-neutral-100 mt-1">
                {user.rewardPoints} Reward Points Available
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Value: <strong className="text-amber-300 font-mono">PKR {(Math.floor(user.rewardPoints / 100) * 500).toLocaleString()}</strong> in checkout discounts (100 points = PKR 500 discount).
              </p>
            </div>
            <button
              onClick={() => setActiveView('men')}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Shop & Earn Multiplier Points
            </button>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-neutral-200">Points History Log</h4>
            <div className="divide-y divide-neutral-900 bg-neutral-900/50 border border-neutral-800 rounded-lg overflow-hidden">
              {user.pointsHistory.map(item => (
                <div key={item.id} className="p-4 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-medium text-neutral-200">{item.reason}</div>
                    <div className="text-[11px] text-neutral-500 font-mono">{item.date}</div>
                  </div>
                  <div className={`font-mono text-sm font-bold ${item.type === 'redeemed' ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {item.type === 'redeemed' ? '-' : '+'}{item.amount} Pts
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Profile & Addresses */}
      {activeTab === 'profile' && (
        <div className="space-y-6 max-w-2xl">
          <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-serif text-base font-bold text-neutral-100">Personal Details</h3>
              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="text-xs text-amber-400 hover:underline"
              >
                {isEditingProfile ? 'Cancel' : 'Edit Information'}
              </button>
            </div>

            {isEditingProfile ? (
              <form onSubmit={handleSaveProfile} className="space-y-3">
                <div>
                  <label className="block text-[11px] uppercase text-neutral-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase text-neutral-400 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase text-neutral-400 mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase text-neutral-400 mb-1">Default Address</label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 p-3 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded cursor-pointer"
                >
                  Save Profile
                </button>
              </form>
            ) : (
              <div className="space-y-3 text-xs text-neutral-300">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-neutral-500 block">Full Name:</span>
                    <strong className="text-neutral-100">{user.name}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Email Address:</span>
                    <strong className="text-neutral-100">{user.email}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Phone:</span>
                    <strong className="text-neutral-100">{user.phone}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">City:</span>
                    <strong className="text-neutral-100">{user.city}</strong>
                  </div>
                </div>
                <div className="pt-2 border-t border-neutral-800">
                  <span className="text-neutral-500 block">Default Delivery Address:</span>
                  <div className="text-neutral-200 mt-1">{user.address}</div>
                </div>
              </div>
            )}
          </div>

          {/* Saved Addresses List */}
          {user.savedAddresses && (
            <div className="space-y-3">
              <h4 className="font-serif text-sm font-semibold text-neutral-200">Saved Addresses</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {user.savedAddresses.map(addr => (
                  <div key={addr.id} className="p-4 bg-neutral-900 border border-neutral-800 rounded space-y-1 text-xs">
                    <div className="font-semibold text-amber-400">{addr.label}</div>
                    <div className="text-neutral-300">{addr.address}</div>
                    <div className="text-neutral-500">{addr.city} · {addr.phone}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab: Notifications */}
      {activeTab === 'notifications' && (
        <div className="space-y-3 max-w-2xl">
          <h3 className="font-serif text-xl font-bold text-neutral-100">Notifications</h3>
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-neutral-500 text-xs">No notifications.</div>
          ) : (
            notifications.map(notif => (
              <div
                key={notif.id}
                onClick={() => markNotificationRead(notif.id)}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  notif.read
                    ? 'bg-neutral-900/40 border-neutral-800 text-neutral-400'
                    : 'bg-neutral-900 border-amber-500/40 text-neutral-200 shadow-md'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <strong className={notif.read ? 'text-neutral-300' : 'text-amber-400'}>
                    {notif.title}
                  </strong>
                  <span className="font-mono text-[10px] text-neutral-500">{notif.date}</span>
                </div>
                <p className="text-xs">{notif.message}</p>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
};
