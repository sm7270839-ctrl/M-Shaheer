import React, { useState } from 'react';
import { useShop, AppView } from '../context/ShopContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  Shield,
  Truck,
  RotateCcw
} from 'lucide-react';

interface StaticPagesProps {
  pageType: 'about' | 'contact' | 'faq' | 'terms' | 'privacy';
}

export const StaticPagesView: React.FC<StaticPagesProps> = ({ pageType }) => {
  const { homepageConfig, showToast } = useShop();

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageSent(true);
    showToast('Your inquiry has been relayed to the M.SHAHEER VIP Concierge.');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

      {/* --- ABOUT US --- */}
      {pageType === 'about' && (
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold">
              The Heritage of M.SHAHEER
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-wider text-neutral-100">
              Timeless Elegance & Haute Craftsmanship
            </h1>
          </div>

          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-4">
            <p>
              Founded on the belief that fashion is an enduring dialogue between timeless cultural heritage and modern architectural tailoring, <strong>M.SHAHEER</strong> stands as Pakistan's preeminent bespoke luxury maison.
            </p>
            <p>
              From our flagship atelier, master embroiderers preserve ancestral techniques—including real 24K gold zardozi, hand-cut tilla work, bullion needlework, and gota patti embellishment—fused seamlessly onto European imported wools, French laces, pure Kathan silks, and breathable Egyptian cottons.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-center">
              <div className="p-5 bg-neutral-900 border border-neutral-800 rounded">
                <div className="font-mono text-2xl font-bold text-amber-300">600+</div>
                <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Artisan Hours per Bridal Masterpiece</div>
              </div>
              <div className="p-5 bg-neutral-900 border border-neutral-800 rounded">
                <div className="font-mono text-2xl font-bold text-amber-300">100%</div>
                <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Authentic Hand-Stitched Finishes</div>
              </div>
              <div className="p-5 bg-neutral-900 border border-neutral-800 rounded">
                <div className="font-mono text-2xl font-bold text-amber-300">35+</div>
                <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider">Cities Served via Express Courier</div>
              </div>
            </div>

            <h3 className="font-serif text-lg font-bold text-neutral-100 pt-4">
              Our Design Philosophy
            </h3>
            <p>
              Whether it is a double-breasted tuxedo destined for an international gala, a hand-embroidered regal sherwani for a grand celebration, or contemporary pret wear for junior connoisseurs, every M.SHAHEER garment carries an uncompromising signature of precision and prestige.
            </p>
          </div>
        </div>
      )}

      {/* --- CONTACT US --- */}
      {pageType === 'contact' && (
        <div className="space-y-10">
          <div className="text-center space-y-3">
            <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold">
              Client Concierge
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-wider text-neutral-100">
              Get In Touch With M.SHAHEER
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
              Our stylists and client advisors are available 7 days a week for styling consultations and order assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Boutiques and Channels */}
            <div className="space-y-6">
              <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-4">
                <h3 className="font-serif text-base font-bold text-neutral-100">
                  Flagship Boutiques
                </h3>

                <div className="space-y-4 text-xs text-neutral-300">
                  <div className="border-l-2 border-amber-400 pl-3 space-y-1">
                    <strong className="text-neutral-100 text-sm">Lahore Atelier & Salon</strong>
                    <div className="text-neutral-400">{homepageConfig.storeAddress}</div>
                    <div className="text-amber-400 font-mono">Phone: {homepageConfig.storePhone}</div>
                  </div>

                  <div className="border-l-2 border-neutral-700 pl-3 space-y-1">
                    <strong className="text-neutral-100 text-sm">Karachi Boutique</strong>
                    <div className="text-neutral-400">Dolmen Mall Clifton, Fashion Boulevard, Karachi, Pakistan</div>
                    <div className="text-neutral-400 font-mono">Direct: +92 21 35870091</div>
                  </div>

                  <div className="border-l-2 border-neutral-700 pl-3 space-y-1">
                    <strong className="text-neutral-100 text-sm">Islamabad VIP Lounge</strong>
                    <div className="text-neutral-400">Beverly Centre, Blue Area, F-6/1, Islamabad, Pakistan</div>
                    <div className="text-neutral-400 font-mono">Direct: +92 51 2824590</div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-neutral-900/40 border border-neutral-800 rounded-lg space-y-2 text-xs">
                <div className="font-semibold text-neutral-200">Operating Hours:</div>
                <div className="text-neutral-400">Monday – Saturday: 11:00 AM – 10:00 PM PST</div>
                <div className="text-neutral-400">Sunday: 2:00 PM – 9:00 PM PST</div>
              </div>
            </div>

            {/* Contact Inquiry Form */}
            <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-4">
              <h3 className="font-serif text-base font-bold text-neutral-100">
                Send A Direct Inquiry
              </h3>

              {messageSent ? (
                <div className="p-6 text-center space-y-2 text-emerald-300">
                  <CheckCircle2 size={36} className="mx-auto" />
                  <p className="font-serif text-sm font-bold">Message Relayed</p>
                  <p className="text-xs text-neutral-400">
                    Thank you. A senior styling concierge will contact you via WhatsApp or phone shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] uppercase text-neutral-400 mb-1">Your Name</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required
                      placeholder="e.g. Daniyal Khan"
                      className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase text-neutral-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      required
                      placeholder="daniyal@example.com"
                      className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase text-neutral-400 mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      required
                      placeholder="0300-1234567"
                      className="w-full bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase text-neutral-400 mb-1">Message</label>
                    <textarea
                      rows={3}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      required
                      placeholder="Inquire regarding bespoke sizing, private salon viewings, or orders..."
                      className="w-full bg-neutral-950 border border-neutral-800 p-3 text-xs text-neutral-100 rounded focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send size={14} />
                    <span>Send Message to Concierge</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- FAQ --- */}
      {pageType === 'faq' && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-semibold">
              Assistance & Guidance
            </span>
            <h1 className="font-serif text-3xl font-bold tracking-wider text-neutral-100">
              Frequently Asked Questions
            </h1>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-neutral-300">
            <div className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-2">
              <h4 className="font-serif text-base font-bold text-neutral-100 flex items-center gap-2">
                <Truck size={16} className="text-amber-400" />
                <span>How does nationwide delivery and Cash on Delivery (COD) work?</span>
              </h4>
              <p className="text-neutral-400 leading-relaxed text-xs">
                We deliver to all major cities and towns across Pakistan via TCS and Leopards Courier. Orders above PKR 5,000 enjoy complimentary express shipping. For Cash on Delivery, you pay the rider in physical cash once the parcel arrives at your address.
              </p>
            </div>

            <div className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-2">
              <h4 className="font-serif text-base font-bold text-neutral-100 flex items-center gap-2">
                <RotateCcw size={16} className="text-amber-400" />
                <span>What is the return and exchange policy?</span>
              </h4>
              <p className="text-neutral-400 leading-relaxed text-xs">
                We offer a 14-day hassle-free exchange on all unworn items with original designer tags intact. Simply reach out via WhatsApp or our contact page to arrange an effortless reverse pickup.
              </p>
            </div>

            <div className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-2">
              <h4 className="font-serif text-base font-bold text-neutral-100 flex items-center gap-2">
                <Shield size={16} className="text-amber-400" />
                <span>How do VIP Membership and Reward Points work?</span>
              </h4>
              <p className="text-neutral-400 leading-relaxed text-xs">
                Our Privilege Club features Silver (5%), Gold (10%), and Platinum (15%) tiers. You earn 1–3 Reward Points for every PKR 100 spent. Every 100 Reward Points translates to PKR 500 in instant checkout deductions.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- TERMS & CONDITIONS & SHIPPING --- */}
      {pageType === 'terms' && (
        <div className="space-y-6 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <h1 className="font-serif text-3xl font-bold tracking-wider text-neutral-100 border-b border-neutral-800 pb-4">
            Terms of Service & Delivery Policies
          </h1>
          <p>
            Welcome to M.SHAHEER. By browsing or purchasing from our platform, you agree to the conditions stated below:
          </p>
          <h3 className="font-serif text-base font-bold text-neutral-100 pt-2">1. Currency & Pricing</h3>
          <p>
            All prices are quoted in Pakistani Rupees (PKR) and include applicable domestic tailoring taxes. Promotional coupon codes must be entered prior to checkout confirmation.
          </p>
          <h3 className="font-serif text-base font-bold text-neutral-100 pt-2">2. Cash on Delivery (COD)</h3>
          <p>
            COD orders are verified via automated SMS/call prior to dispatch. Customers are requested to keep exact payable cash ready at the provided destination address.
          </p>
          <h3 className="font-serif text-base font-bold text-neutral-100 pt-2">3. VIP Club & Gift Cards</h3>
          <p>
            M.SHAHEER Gift Cards carry no expiration fee and are valid for 12 months. VIP tier privileges apply automatically to registered member accounts upon checkout.
          </p>
        </div>
      )}

      {/* --- PRIVACY POLICY --- */}
      {pageType === 'privacy' && (
        <div className="space-y-6 text-xs sm:text-sm text-neutral-300 leading-relaxed">
          <h1 className="font-serif text-3xl font-bold tracking-wider text-neutral-100 border-b border-neutral-800 pb-4">
            Privacy & Data Protection Policy
          </h1>
          <p>
            M.SHAHEER places the highest priority on client confidentiality. We do not sell, rent, or trade your personal information to third parties.
          </p>
          <h3 className="font-serif text-base font-bold text-neutral-100 pt-2">Information Collected</h3>
          <p>
            When placing an order or joining the VIP Privilege Club, we securely store your delivery address, phone number, order history, and reward points balance strictly for order fulfillment and personalized concierge services.
          </p>
        </div>
      )}

    </div>
  );
};
