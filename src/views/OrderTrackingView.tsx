import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Search,
  Truck,
  CheckCircle2,
  Package,
  Clock,
  MapPin,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { Order, OrderStatus } from '../types';

export const OrderTrackingView: React.FC = () => {
  const { orders } = useShop();

  const [searchKey, setSearchKey] = useState('');
  const [matchedOrder, setMatchedOrder] = useState<Order | null>(orders[0] || null);
  const [hasSearched, setHasSearched] = useState(false);

  const statuses: OrderStatus[] = [
    'Order Placed',
    'Processing',
    'Packed',
    'Shipped',
    'Out for Delivery',
    'Delivered'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const query = searchKey.trim().toUpperCase();
    const found = orders.find(
      o =>
        o.id.toUpperCase() === query ||
        o.trackingNumber.toUpperCase() === query ||
        o.customer.phone.includes(searchKey.trim())
    );
    setMatchedOrder(found || null);
  };

  const getStatusIndex = (status: OrderStatus) => {
    if (status === 'Cancelled') return -1;
    return statuses.indexOf(status);
  };

  const currentStep = matchedOrder ? getStatusIndex(matchedOrder.status) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest rounded">
          <Truck size={14} />
          <span>Real-Time Express Logistics</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-wider text-neutral-100">
          Order Tracking Portal
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
          Enter your Order Number (e.g. <strong className="text-neutral-200">MSH-94812</strong>), Tracking ID, or registered phone number.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="Enter Order ID (e.g. MSH-94812)"
            className="w-full bg-neutral-900 border border-neutral-800 px-4 py-3 text-xs sm:text-sm text-neutral-100 placeholder-neutral-500 rounded focus:border-amber-400 focus:outline-none font-mono"
            required
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 rounded cursor-pointer"
        >
          <Search size={16} />
          <span>Track</span>
        </button>
      </form>

      {/* Results View */}
      {matchedOrder ? (
        <div className="p-6 sm:p-8 bg-neutral-900/60 border border-neutral-800 rounded-xl space-y-8">
          {/* Header Summary */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-6 text-xs">
            <div>
              <span className="text-neutral-500 block">Order Reference</span>
              <strong className="font-mono text-base text-neutral-100">{matchedOrder.id}</strong>
            </div>
            <div>
              <span className="text-neutral-500 block">Logistics Courier</span>
              <span className="text-neutral-200 font-semibold">TCS / Leopards Express (Airway Bill: {matchedOrder.trackingNumber})</span>
            </div>
            <div>
              <span className="text-neutral-500 block">Current Status</span>
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold uppercase rounded text-[11px]">
                {matchedOrder.status}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block">Total Due (COD)</span>
              <strong className="font-mono text-sm text-amber-300">PKR {matchedOrder.total.toLocaleString()}</strong>
            </div>
          </div>

          {/* Visual 6-Step Stepper */}
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block">
              Shipment Journey
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {statuses.map((step, idx) => {
                const isCompleted = idx <= currentStep;
                const isCurrent = idx === currentStep;
                return (
                  <div
                    key={step}
                    className={`p-3 rounded border flex flex-col justify-between text-center transition-all ${
                      isCurrent
                        ? 'border-amber-400 bg-amber-400/10 text-neutral-100 shadow-lg'
                        : isCompleted
                        ? 'border-emerald-600/40 bg-neutral-950 text-neutral-300'
                        : 'border-neutral-800/80 bg-neutral-950/40 text-neutral-600'
                    }`}
                  >
                    <div className="flex justify-center mb-2">
                      {isCompleted ? (
                        <CheckCircle2 size={18} className={isCurrent ? 'text-amber-400' : 'text-emerald-400'} />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-neutral-700" />
                      )}
                    </div>
                    <span className="text-[11px] font-semibold leading-tight">{step}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline Event Log */}
          <div className="space-y-3 pt-4 border-t border-neutral-800">
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block">
              Checkpoint Updates
            </span>
            <div className="space-y-3 pl-3 border-l-2 border-amber-500/40">
              {matchedOrder.statusTimeline.map((item, index) => (
                <div key={index} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-amber-300 font-semibold">{item.status}</strong>
                    <span className="font-mono text-[11px] text-neutral-500">{item.timestamp}</span>
                  </div>
                  <p className="text-neutral-400 text-[11px]">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address & Customer Info */}
          <div className="pt-4 border-t border-neutral-800 text-xs text-neutral-400 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-neutral-500 block mb-1">Recipient Destination</span>
              <div className="text-neutral-200 font-semibold">{matchedOrder.customer.name} ({matchedOrder.customer.phone})</div>
              <div className="text-neutral-400">{matchedOrder.customer.address}, {matchedOrder.customer.city}, Pakistan</div>
            </div>
            <div>
              <span className="text-neutral-500 block mb-1">Delivery Assurance</span>
              <div className="flex items-center gap-2 text-emerald-400">
                <ShieldCheck size={16} />
                <span>Inspection allowed upon Cash on Delivery collection</span>
              </div>
            </div>
          </div>
        </div>
      ) : hasSearched ? (
        <div className="p-8 text-center bg-neutral-900 border border-neutral-800 rounded-lg space-y-2 text-neutral-400 text-xs">
          <AlertCircle size={32} className="text-amber-400 mx-auto mb-2" />
          <p className="font-serif text-base text-neutral-200">No Order Found</p>
          <p>Please double-check your Order ID or contact the M.SHAHEER Concierge on WhatsApp.</p>
        </div>
      ) : null}
    </div>
  );
};
