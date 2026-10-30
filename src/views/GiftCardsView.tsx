import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Gift, CheckCircle2, ShieldCheck, Sparkles, Copy, Check } from 'lucide-react';

export const GiftCardsView: React.FC = () => {
  const { purchaseGiftCard, verifyGiftCard, showToast } = useShop();

  const [selectedAmount, setSelectedAmount] = useState<number>(5000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');

  // Generated card result
  const [generatedCardCode, setGeneratedCardCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Balance Check State
  const [checkCode, setCheckCode] = useState('');
  const [checkedCard, setCheckedCard] = useState<any>(null);

  const presetAmounts = [2500, 5000, 10000, 25000, 50000];

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = customAmount ? parseInt(customAmount, 10) : selectedAmount;
    if (!amount || amount < 1000) {
      showToast('Minimum gift card value is PKR 1,000.');
      return;
    }

    const card = purchaseGiftCard(amount, recipientName || 'Valued Recipient', recipientEmail);
    setGeneratedCardCode(card.code);
    showToast(`M.SHAHEER Luxury Gift Card created with code ${card.code}`);
  };

  const handleCopy = (code: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      showToast('Gift card code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCheckBalance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkCode.trim()) return;
    const card = verifyGiftCard(checkCode.trim());
    if (card) {
      setCheckedCard(card);
    } else {
      showToast('No active gift card found with this code.');
      setCheckedCard(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest rounded">
          <Gift size={14} />
          <span>The Art of Gifting</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-wider text-neutral-100">
          M.SHAHEER Luxury Gift Cards
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
          Bestow the ultimate gift of bespoke choice. Redeemable on any collection across men’s couture, women’s luxury apparel, and junior atelier wear.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Gift Card Visual & Purchase Form (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Virtual Card Preview */}
          <div className="relative aspect-[1.7/1] rounded-2xl p-6 sm:p-8 gold-card-shimmer text-neutral-100 flex flex-col justify-between overflow-hidden shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.25em] text-neutral-100 block">
                  M.SHAHEER
                </span>
                <span className="text-[10px] tracking-widest text-amber-400 uppercase font-mono">
                  Luxury Gift Card
                </span>
              </div>
              <Gift size={24} className="text-amber-400" />
            </div>

            <div className="text-center py-2">
              <span className="text-[11px] uppercase tracking-widest text-neutral-400 block">Value</span>
              <div className="font-mono text-3xl sm:text-4xl font-bold text-amber-300">
                PKR {(customAmount ? parseInt(customAmount) || 0 : selectedAmount).toLocaleString()}
              </div>
            </div>

            <div className="flex items-end justify-between border-t border-neutral-800/80 pt-3 text-xs">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-neutral-400 block">Recipient</span>
                <span className="font-semibold text-neutral-200">{recipientName || 'Valued Guest'}</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] uppercase tracking-wider text-neutral-400 block">Valid In</span>
                <span className="text-neutral-300">Pakistan Online & Boutiques</span>
              </div>
            </div>
          </div>

          {/* Creation Success Alert */}
          {generatedCardCode && (
            <div className="p-5 bg-neutral-900 border border-emerald-500/40 rounded-lg space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                <CheckCircle2 size={16} />
                <span>Gift Card Generated Successfully!</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-neutral-950 border border-neutral-800 rounded font-mono text-amber-300 font-bold text-sm">
                <span>{generatedCardCode}</span>
                <button
                  onClick={() => handleCopy(generatedCardCode)}
                  className="p-1.5 text-neutral-400 hover:text-white flex items-center gap-1 text-xs font-sans cursor-pointer"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-[11px] text-neutral-400">
                This unique code can now be entered in the checkout form to deduct the balance from any order.
              </p>
            </div>
          )}

          {/* Purchase Form */}
          <form onSubmit={handlePurchase} className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-4">
            <h3 className="font-serif text-base font-bold text-neutral-100">
              Customize Your Gift Card
            </h3>

            {/* Presets */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-2">
                Select Amount (PKR)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {presetAmounts.map(amt => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount('');
                    }}
                    className={`py-2 text-xs font-mono border rounded transition-all cursor-pointer ${
                      selectedAmount === amt && !customAmount
                        ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-bold'
                        : 'border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    PKR {amt >= 1000 ? `${amt / 1000}k` : amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                Or Enter Custom Amount (PKR)
              </label>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="e.g. 15000"
                className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
              />
            </div>

            {/* Recipient Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Hamza Khan"
                  className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                  Recipient Email
                </label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="hamza@example.pk"
                  className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-widest transition-colors rounded cursor-pointer"
            >
              Issue Luxury Gift Card
            </button>
          </form>
        </div>

        {/* Right: Check Existing Balance (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-4">
            <h3 className="font-serif text-base font-bold text-neutral-100">
              Check Gift Card Balance
            </h3>
            <p className="text-xs text-neutral-400">
              Have an existing gift card code? Enter it below to check current available balance.
            </p>

            <form onSubmit={handleCheckBalance} className="space-y-3">
              <div>
                <label className="block text-[11px] uppercase text-neutral-400 mb-1">Gift Card Code</label>
                <input
                  type="text"
                  value={checkCode}
                  onChange={(e) => setCheckCode(e.target.value.toUpperCase())}
                  placeholder="e.g. GIFT-LUX-2026"
                  className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs font-mono text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                Inquire Balance
              </button>
            </form>

            {checkedCard && (
              <div className="mt-4 p-4 bg-neutral-950 border border-amber-500/40 rounded space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Card Code:</span>
                  <span className="font-mono text-neutral-200 font-bold">{checkedCard.code}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Available Balance:</span>
                  <span className="font-mono text-amber-300 font-bold text-sm">
                    PKR {checkedCard.currentBalance.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Status:</span>
                  <span className={`font-semibold ${checkedCard.isActive ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {checkedCard.isActive ? 'Active & Ready' : 'Deactivated'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Valid Through:</span>
                  <span className="font-mono text-neutral-400">{checkedCard.expiryDate}</span>
                </div>
              </div>
            )}
          </div>

          {/* Terms info */}
          <div className="p-6 bg-neutral-900/40 border border-neutral-800/80 rounded-lg text-xs text-neutral-400 space-y-2">
            <span className="font-semibold text-neutral-200 uppercase tracking-wider block">Gifting Terms</span>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>Gift cards are valid for 12 months from the date of purchase.</li>
              <li>Can be redeemed simultaneously with promotional coupons.</li>
              <li>Non-refundable and cannot be exchanged for physical cash.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
