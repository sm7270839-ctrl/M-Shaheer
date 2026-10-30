import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Gift,
  Tag,
  Crown,
  ArrowRight,
  ShoppingBag,
  CreditCard,
  Building2,
  Copy,
  ChevronRight
} from 'lucide-react';
import { Order } from '../types';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    createOrder,
    user,
    vipTiers,
    coupons,
    giftCards,
    verifyGiftCard,
    setActiveView,
    showToast,
  } = useShop();

  // Customer Details Form State
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [city, setCity] = useState(user.city || 'Lahore');
  const [address, setAddress] = useState(user.address);

  // Discount Codes & Perks
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Gift Card
  const [giftCardInput, setGiftCardInput] = useState('');
  const [appliedGiftCard, setAppliedGiftCard] = useState<string | null>(null);
  const [giftCardDeduction, setGiftCardDeduction] = useState(0);

  // Reward Points Redemption
  const [redeemPoints, setRedeemPoints] = useState(false);
  const pointsRedeemValue = Math.min(Math.floor(user.rewardPoints / 100) * 500, cartSubtotal);

  // Payment method selection
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'Direct Bank Transfer' | 'Credit/Debit Card (Ready)'>('Cash on Delivery');

  // Completed Order State for Confirmation Screen
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const majorPakistaniCities = [
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta',
    'Sialkot',
    'Gujranwala',
    'Hyderabad',
    'Abbottabad',
    'Bahawalpur',
    'Sargodha',
    'Sukkur',
  ];

  // VIP Tier Discount
  const currentTier = vipTiers.find(t => t.id === user.vipTier);
  const tierDiscount = currentTier ? Math.round((cartSubtotal * currentTier.discountPercent) / 100) : 0;

  // Coupon handling
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const found = coupons.find(c => c.code.toUpperCase() === couponCode.trim().toUpperCase() && c.isActive);
    if (!found) {
      showToast('Invalid coupon code. Try WELCOME10');
      return;
    }
    if (cartSubtotal < found.minSpendPKR) {
      showToast(`Coupon requires minimum spend of PKR ${found.minSpendPKR.toLocaleString()}`);
      return;
    }
    const discountAmt = Math.round((cartSubtotal * found.discountPercent) / 100);
    setCouponDiscount(discountAmt);
    setAppliedCoupon(found.code);
    showToast(`Coupon ${found.code} applied! Saved PKR ${discountAmt.toLocaleString()}`);
  };

  // Gift Card handling
  const handleApplyGiftCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!giftCardInput.trim()) return;
    const gc = verifyGiftCard(giftCardInput.trim());
    if (!gc) {
      showToast('Invalid or inactive gift card code. Try GIFT-LUX-2026');
      return;
    }
    if (gc.currentBalance <= 0) {
      showToast('Gift card has zero remaining balance.');
      return;
    }
    const deduction = Math.min(gc.currentBalance, cartSubtotal - tierDiscount - couponDiscount);
    setGiftCardDeduction(deduction);
    setAppliedGiftCard(gc.code);
    showToast(`Gift card applied! Balance: PKR ${gc.currentBalance.toLocaleString()}`);
  };

  // Delivery Charges (Complimentary over PKR 5,000)
  const deliveryCharges = cartSubtotal >= 5000 ? 0 : 250;

  // Final Total
  const activePointsDiscount = redeemPoints ? pointsRedeemValue : 0;
  const finalTotal = Math.max(
    0,
    cartSubtotal - Math.max(tierDiscount, couponDiscount) - activePointsDiscount + deliveryCharges - giftCardDeduction
  );

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      showToast('Please fill out all required delivery fields.');
      return;
    }

    const order = createOrder({
      customer: {
        name,
        phone,
        email,
        city,
        address,
      },
      paymentMethod,
      couponCode: appliedCoupon || undefined,
      pointsToRedeem: redeemPoints ? user.rewardPoints : 0,
      giftCardCode: appliedGiftCard || undefined,
    });

    setConfirmedOrder(order);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If order was just placed, show rich Confirmation Screen
  if (confirmedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8">
        <div className="w-16 h-16 bg-amber-500/10 border-2 border-amber-400 rounded-full flex items-center justify-center mx-auto text-amber-400">
          <CheckCircle2 size={36} />
        </div>

        <div className="space-y-2">
          <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold">
            Order Confirmed & Registered
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-100">
            Thank You, {confirmedOrder.customer.name}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
            Your luxury order has been received by our atelier and queued for bespoke packaging.
          </p>
        </div>

        {/* Order Receipt Box */}
        <div className="p-6 bg-neutral-900/80 border border-neutral-800 rounded-lg text-left space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-4 text-xs">
            <div>
              <span className="text-neutral-500 block">Order Number</span>
              <strong className="font-mono text-neutral-200 text-sm">{confirmedOrder.id}</strong>
            </div>
            <div>
              <span className="text-neutral-500 block">Tracking ID</span>
              <strong className="font-mono text-amber-400 text-sm">{confirmedOrder.trackingNumber}</strong>
            </div>
            <div>
              <span className="text-neutral-500 block">Payment Method</span>
              <strong className="text-neutral-200">{confirmedOrder.paymentMethod}</strong>
            </div>
            <div>
              <span className="text-neutral-500 block">Estimated Delivery</span>
              <strong className="text-emerald-400">2-4 Business Days</strong>
            </div>
          </div>

          {/* Delivery Destination */}
          <div className="text-xs text-neutral-300 space-y-1">
            <span className="text-[11px] text-neutral-500 uppercase tracking-wider block">
              Shipping Address
            </span>
            <div className="font-medium text-neutral-100">{confirmedOrder.customer.name} ({confirmedOrder.customer.phone})</div>
            <div className="text-neutral-400">{confirmedOrder.customer.address}, {confirmedOrder.customer.city}, Pakistan</div>
          </div>

          {/* Itemized List */}
          <div className="border-t border-neutral-800 pt-4 space-y-3">
            <span className="text-[11px] text-neutral-500 uppercase tracking-wider block">
              Ordered Creations ({confirmedOrder.items.length})
            </span>
            {confirmedOrder.items.map(item => (
              <div key={item.id} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-14 object-cover rounded bg-neutral-950 border border-neutral-800"
                  />
                  <div>
                    <div className="font-medium text-neutral-200">{item.product.name}</div>
                    <div className="text-neutral-500 text-[11px]">
                      Qty: {item.quantity} · Size: {item.selectedSize} · Color: {item.selectedColor}
                    </div>
                  </div>
                </div>
                <span className="font-mono font-semibold text-neutral-100">
                  PKR {(item.product.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Financial Breakdown */}
          <div className="border-t border-neutral-800 pt-4 space-y-1.5 text-xs text-neutral-400">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-mono text-neutral-200">PKR {confirmedOrder.subtotal.toLocaleString()}</span>
            </div>
            {confirmedOrder.discount > 0 && (
              <div className="flex justify-between text-amber-400">
                <span>Member / Promo Discount:</span>
                <span className="font-mono">-PKR {confirmedOrder.discount.toLocaleString()}</span>
              </div>
            )}
            {confirmedOrder.pointsDiscount > 0 && (
              <div className="flex justify-between text-amber-400">
                <span>Reward Points Discount:</span>
                <span className="font-mono">-PKR {confirmedOrder.pointsDiscount.toLocaleString()}</span>
              </div>
            )}
            {confirmedOrder.giftCardDiscount > 0 && (
              <div className="flex justify-between text-amber-400">
                <span>Gift Card Redemption:</span>
                <span className="font-mono">-PKR {confirmedOrder.giftCardDiscount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Charges:</span>
              <span className="font-mono text-neutral-200">
                {confirmedOrder.deliveryCharges === 0 ? 'COMPLIMENTARY' : `PKR ${confirmedOrder.deliveryCharges}`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-neutral-100 pt-2 border-t border-neutral-800">
              <span>Total Payable Amount:</span>
              <span className="font-mono text-base text-amber-300">
                PKR {confirmedOrder.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Post-Checkout Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => setActiveView('track-order')}
            className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <Truck size={16} />
            <span>Track Order Progress</span>
          </button>
          <button
            onClick={() => setActiveView('home')}
            className="w-full sm:w-auto px-6 py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  // If cart is empty, show empty state
  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <ShoppingBag size={56} className="text-neutral-700 mx-auto stroke-1" />
        <h2 className="font-serif text-2xl font-bold text-neutral-200">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-neutral-500">
          Please add items to your cart before proceeding to checkout.
        </p>
        <button
          onClick={() => setActiveView('men')}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors"
        >
          Explore Collections
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-neutral-400">
        <button onClick={() => setActiveView('home')} className="hover:text-amber-400">Home</button>
        <ChevronRight size={12} />
        <span className="text-neutral-200">Checkout & Order Placement</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

        {/* Left Column: Delivery Form & Payment (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-6">

            {/* 1. Customer Delivery Information */}
            <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-4">
              <h3 className="font-serif text-base font-bold text-neutral-100 flex items-center gap-2">
                <Truck size={18} className="text-amber-400" />
                <span>1. Delivery Destination (Pakistan)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="e.g. Shaheer Mirza"
                    className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                    Phone Number (WhatsApp Active) *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="0300-1234567"
                    className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                    Email Address (For Invoicing) *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="shaheer@example.pk"
                    className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                    City *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none cursor-pointer"
                  >
                    {majorPakistaniCities.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                  Complete Street Address (House/Apartment #, Sector/Area) *
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  placeholder="e.g. House 42-B, Sector Z, Phase 5, DHA"
                  className="w-full bg-neutral-950 border border-neutral-800 p-3 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* 2. Payment Method */}
            <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-4">
              <h3 className="font-serif text-base font-bold text-neutral-100 flex items-center gap-2">
                <ShieldCheck size={18} className="text-amber-400" />
                <span>2. Payment Option</span>
              </h3>

              <div className="space-y-3">
                {/* Cash on Delivery */}
                <label className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                  paymentMethod === 'Cash on Delivery'
                    ? 'border-amber-400 bg-amber-400/5'
                    : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Cash on Delivery'}
                    onChange={() => setPaymentMethod('Cash on Delivery')}
                    className="mt-1 accent-amber-500"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-neutral-100">Cash on Delivery (Recommended)</span>
                      <span className="bg-emerald-950 text-emerald-400 border border-emerald-800/40 text-[10px] font-semibold px-2 py-0.5 rounded">
                        Active & Verified
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400">
                      Pay cash upon receiving and inspecting your bespoke garments at your doorstep anywhere in Pakistan.
                    </p>
                  </div>
                </label>

                {/* Direct Bank Transfer */}
                <label className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                  paymentMethod === 'Direct Bank Transfer'
                    ? 'border-amber-400 bg-amber-400/5'
                    : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Direct Bank Transfer'}
                    onChange={() => setPaymentMethod('Direct Bank Transfer')}
                    className="mt-1 accent-amber-500"
                  />
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-neutral-100">Direct Bank Transfer / IBFT</span>
                      <Building2 size={14} className="text-neutral-400" />
                    </div>
                    <p className="text-[11px] text-neutral-400">
                      Transfer directly to M.SHAHEER Official Corporate Account (Meezan Bank / HBL). Share receipt on WhatsApp.
                    </p>
                    {paymentMethod === 'Direct Bank Transfer' && (
                      <div className="mt-2 p-3 bg-neutral-900 border border-neutral-800 rounded text-[11px] font-mono text-neutral-300 space-y-1">
                        <div>Bank: <strong>Meezan Bank Ltd (Gulberg Branch)</strong></div>
                        <div>Account Title: <strong>M.SHAHEER LUXURY COUTURE</strong></div>
                        <div>IBAN: <strong>PK82MEZN0001020304050607</strong></div>
                      </div>
                    )}
                  </div>
                </label>

                {/* Credit / Debit Card (Gateway Ready) */}
                <label className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                  paymentMethod === 'Credit/Debit Card (Ready)'
                    ? 'border-amber-400 bg-amber-400/5'
                    : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Credit/Debit Card (Ready)'}
                    onChange={() => setPaymentMethod('Credit/Debit Card (Ready)')}
                    className="mt-1 accent-amber-500"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-neutral-100">Visa / Mastercard / UnionPay</span>
                      <CreditCard size={14} className="text-neutral-400" />
                    </div>
                    <p className="text-[11px] text-neutral-400">
                      Online card gateway ready for payment processor integration (PayFast / Safepay / Stripe). Use Cash on Delivery for instant processing now.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Order Button */}
            <button
              type="submit"
              className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 rounded shadow-xl shadow-amber-500/20 cursor-pointer"
            >
              <span>Confirm & Place Order · PKR {finalTotal.toLocaleString()}</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary & Discounts (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">

          {/* Itemized Bag */}
          <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-4">
            <h3 className="font-serif text-base font-bold text-neutral-100 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs text-neutral-400 font-mono">({cart.length} items)</span>
            </h3>

            <div className="divide-y divide-neutral-900 max-h-64 overflow-y-auto space-y-3">
              {cart.map(item => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-14 h-16 object-cover rounded bg-neutral-950 border border-neutral-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-medium text-neutral-200 truncate">{item.product.name}</h4>
                    <div className="text-[10px] text-neutral-400">
                      Qty: {item.quantity} · Size: {item.selectedSize} · {item.selectedColor}
                    </div>
                    <div className="font-mono text-xs font-semibold text-neutral-100 mt-0.5">
                      PKR {(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupons Form */}
            <div className="border-t border-neutral-800 pt-4">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1">
                <Tag size={13} className="text-amber-400" />
                <span>Promotional Voucher</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="e.g. WELCOME10"
                  className="flex-1 bg-neutral-950 border border-neutral-800 px-3 py-1.5 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 text-xs font-semibold rounded cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {appliedCoupon && (
                <span className="text-[11px] text-emerald-400 mt-1 block font-medium">
                  ✓ Voucher "{appliedCoupon}" applied!
                </span>
              )}
            </div>

            {/* Gift Card Redemption */}
            <div className="border-t border-neutral-800 pt-4">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1">
                <Gift size={13} className="text-amber-400" />
                <span>M.SHAHEER Gift Card</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={giftCardInput}
                  onChange={(e) => setGiftCardInput(e.target.value.toUpperCase())}
                  placeholder="e.g. GIFT-LUX-2026"
                  className="flex-1 bg-neutral-950 border border-neutral-800 px-3 py-1.5 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyGiftCard}
                  className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 text-xs font-semibold rounded cursor-pointer"
                >
                  Redeem
                </button>
              </div>
              {appliedGiftCard && (
                <span className="text-[11px] text-emerald-400 mt-1 block font-medium">
                  ✓ Gift card "{appliedGiftCard}" redeemed for PKR {giftCardDeduction.toLocaleString()}
                </span>
              )}
            </div>

            {/* Reward Points Redemption */}
            {user.rewardPoints >= 100 && (
              <div className="border-t border-neutral-800 pt-4 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-neutral-200">Redeem Reward Points</div>
                  <div className="text-[11px] text-neutral-400">
                    You have <strong className="text-amber-400">{user.rewardPoints}</strong> pts (Worth PKR {pointsRedeemValue.toLocaleString()})
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setRedeemPoints(!redeemPoints)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer ${
                    redeemPoints
                      ? 'bg-amber-500 text-neutral-950'
                      : 'bg-neutral-800 text-neutral-300 hover:text-white'
                  }`}
                >
                  {redeemPoints ? 'Redeemed' : 'Apply Points'}
                </button>
              </div>
            )}

            {/* Summary Totals */}
            <div className="border-t border-neutral-800 pt-4 space-y-2 text-xs text-neutral-400">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-mono text-neutral-200">PKR {cartSubtotal.toLocaleString()}</span>
              </div>
              {tierDiscount > 0 && (
                <div className="flex justify-between text-amber-400">
                  <span>VIP Club ({user.vipTier} Member {currentTier?.discountPercent}%):</span>
                  <span className="font-mono">-PKR {tierDiscount.toLocaleString()}</span>
                </div>
              )}
              {couponDiscount > 0 && (
                <div className="flex justify-between text-amber-400">
                  <span>Voucher Code ({appliedCoupon}):</span>
                  <span className="font-mono">-PKR {couponDiscount.toLocaleString()}</span>
                </div>
              )}
              {activePointsDiscount > 0 && (
                <div className="flex justify-between text-amber-400">
                  <span>Reward Points Discount:</span>
                  <span className="font-mono">-PKR {activePointsDiscount.toLocaleString()}</span>
                </div>
              )}
              {giftCardDeduction > 0 && (
                <div className="flex justify-between text-amber-400">
                  <span>Gift Card Applied:</span>
                  <span className="font-mono">-PKR {giftCardDeduction.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Nationwide Courier Delivery:</span>
                <span className="font-mono text-neutral-200">
                  {deliveryCharges === 0 ? 'COMPLIMENTARY (PKR 0)' : `PKR ${deliveryCharges}`}
                </span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-bold text-neutral-100 pt-3 border-t border-neutral-800">
                <span>Total Amount:</span>
                <span className="font-mono text-amber-300 font-bold">
                  PKR {finalTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
