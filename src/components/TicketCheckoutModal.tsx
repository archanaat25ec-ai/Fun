import React, { useState } from 'react';
import { X, Check, Calendar, Users, Zap, ShieldCheck, Ticket, Download, ArrowRight, Sparkles } from 'lucide-react';
import { TicketTier, AddOnOption } from '../types/park';
import { TICKET_TIERS, ADD_ON_OPTIONS } from '../data/parkData';

interface TicketCheckoutModalProps {
  initialTier: TicketTier;
  onClose: () => void;
}

export const TicketCheckoutModal: React.FC<TicketCheckoutModalProps> = ({
  initialTier,
  onClose,
}) => {
  const [selectedTier, setSelectedTier] = useState<TicketTier>(initialTier);
  const [visitDate, setVisitDate] = useState('2026-10-10');
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(0);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  // Guest info
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'SUMMER10' || promoCode.trim().toUpperCase() === 'AETHERIA10') {
      setAppliedDiscount(0.1);
      setPromoMessage('10% Summer promotional discount applied!');
    } else {
      setAppliedDiscount(0);
      setPromoMessage('Invalid promo code. Try "SUMMER10"');
    }
  };

  // Calculate pricing
  const basePrice = (adultCount * selectedTier.price) + (childCount * selectedTier.childPrice);
  const addOnsTotal = selectedAddOns.reduce((sum, addOnId) => {
    const item = ADD_ON_OPTIONS.find((a) => a.id === addOnId);
    return sum + (item ? item.price * (adultCount + childCount) : 0);
  }, 0);

  const subtotal = basePrice + addOnsTotal;
  const discountAmount = subtotal * appliedDiscount;
  const taxesAndFees = (subtotal - discountAmount) * 0.08;
  const finalTotal = subtotal - discountAmount + taxesAndFees;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail) return;
    const randomCode = 'AETH-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmationCode(randomCode);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-amber-400" />
            <span className="text-lg font-bold text-white font-display">
              {isSubmitted ? 'Your Digital Park Pass is Ready' : 'Secure Park Ticket Reservation'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {isSubmitted ? (
            /* Digital Pass Ticket View */
            <div className="space-y-6 animate-in zoom-in-95 duration-300">
              <div className="bg-gradient-to-br from-amber-500/10 via-slate-800 to-slate-900 border border-amber-500/40 rounded-2xl p-6 relative overflow-hidden shadow-xl">
                {/* Decorative cutouts */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-900 border-r border-slate-700" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-900 border-l border-slate-700" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-dashed border-slate-700">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
                      Confirmed Digital Ticket
                    </span>
                    <h3 className="text-2xl font-black text-white">
                      {selectedTier.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Guest: <span className="font-semibold text-white">{guestName}</span> · {guestEmail}
                    </p>
                  </div>

                  <div className="text-center md:text-right">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-0.5">
                      Order Reference
                    </span>
                    <span className="text-xl font-mono font-bold text-amber-400 tracking-wider">
                      {confirmationCode}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-b border-dashed border-slate-700 text-xs">
                  <div>
                    <span className="text-slate-400 block">Visit Date</span>
                    <span className="font-bold text-white font-mono">{visitDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Total Guests</span>
                    <span className="font-bold text-white tabular-nums">{adultCount + childCount} ({adultCount} Ad, {childCount} Ch)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Operating Hours</span>
                    <span className="font-bold text-white">9:00 AM – 10:00 PM</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Paid Amount</span>
                    <span className="font-bold text-emerald-400 font-mono tabular-nums">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Simulated Barcode / QR Section */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-[11px] text-slate-400">
                      Scan at any turnstile or add directly to Apple / Google Wallet:
                    </span>
                    {selectedAddOns.length > 0 && (
                      <div className="text-xs text-amber-300 font-medium">
                        Includes: {selectedAddOns.map((id) => ADD_ON_OPTIONS.find((a) => a.id === id)?.name).join(', ')}
                      </div>
                    )}
                  </div>

                  {/* Visual Barcode bars */}
                  <div className="flex items-center gap-1 bg-white p-2 rounded">
                    <div className="w-1.5 h-8 bg-black" />
                    <div className="w-3 h-8 bg-black" />
                    <div className="w-1 h-8 bg-black" />
                    <div className="w-2 h-8 bg-black" />
                    <div className="w-4 h-8 bg-black" />
                    <div className="w-1 h-8 bg-black" />
                    <div className="w-2.5 h-8 bg-black" />
                    <div className="w-1.5 h-8 bg-black" />
                    <div className="w-3 h-8 bg-black" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-slate-400">
                  Confirmation receipt has been sent to <span className="text-slate-200">{guestEmail}</span>.
                </p>
                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Print or Save Pass (PDF)</span>
                </button>
              </div>
            </div>
          ) : (
            /* Reservation Configuration Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tier Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  1. Select Admission Pass Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {TICKET_TIERS.map((tier) => {
                    const isCurrent = selectedTier.id === tier.id;
                    return (
                      <button
                        type="button"
                        key={tier.id}
                        onClick={() => setSelectedTier(tier)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-slate-800 border-amber-400 ring-1 ring-amber-400'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold text-white mb-1">
                          {tier.title}
                        </div>
                        <div className="text-lg font-black text-amber-400 font-mono tabular-nums">
                          ${tier.price} <span className="text-xs font-normal text-slate-400">/adult</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date & Guest Count Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Date Picker */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                    Visit Date
                  </label>
                  <input
                    type="date"
                    value={visitDate}
                    min="2026-10-05"
                    max="2026-12-31"
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                    required
                  />
                </div>

                {/* Adults Count */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                    Adults (Age 10+)
                  </label>
                  <div className="flex items-center border border-slate-800 rounded-lg bg-slate-950">
                    <button
                      type="button"
                      onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                      className="px-3 py-2 text-slate-400 hover:text-white cursor-pointer"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-white font-mono tabular-nums">
                      {adultCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAdultCount(adultCount + 1)}
                      className="px-3 py-2 text-slate-400 hover:text-white cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children Count */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                    Children (Age 3-9)
                  </label>
                  <div className="flex items-center border border-slate-800 rounded-lg bg-slate-950">
                    <button
                      type="button"
                      onClick={() => setChildCount(Math.max(0, childCount - 1))}
                      className="px-3 py-2 text-slate-400 hover:text-white cursor-pointer"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-white font-mono tabular-nums">
                      {childCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setChildCount(childCount + 1)}
                      className="px-3 py-2 text-slate-400 hover:text-white cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Add-On Options */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  Optional Park Enhancements & Add-Ons
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ADD_ON_OPTIONS.map((addon) => {
                    const isChecked = selectedAddOns.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddOn(addon.id)}
                        className={`p-3 rounded-lg border flex items-start gap-3 cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-amber-500/10 border-amber-400/80 text-white'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 ${
                            isChecked
                              ? 'bg-amber-400 border-amber-400 text-slate-950'
                              : 'border-slate-600 bg-slate-900'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div className="flex-1 text-xs">
                          <div className="flex items-center justify-between font-bold text-white">
                            <span>{addon.name}</span>
                            <span className="font-mono text-amber-400 tabular-nums">
                              +${addon.price}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {addon.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Guest Details & Promo Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Primary Guest Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Email Address (For Digital Pass)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Promo Code (Try SUMMER10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white uppercase focus:outline-none focus:border-amber-400"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  Apply
                </button>
                {promoMessage && (
                  <span className={`text-xs ${appliedDiscount > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {promoMessage}
                  </span>
                )}
              </div>

              {/* Price Calculation Summary */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Base Admission ({adultCount} Adults, {childCount} Children)</span>
                  <span className="font-mono text-white tabular-nums">${basePrice.toFixed(2)}</span>
                </div>
                {addOnsTotal > 0 && (
                  <div className="flex justify-between text-slate-400">
                    <span>Selected Add-Ons ({selectedAddOns.length})</span>
                    <span className="font-mono text-white tabular-nums">${addOnsTotal.toFixed(2)}</span>
                  </div>
                )}
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Summer Promo (10% Off)</span>
                    <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500">
                  <span>State & Municipal Park Tax (8%)</span>
                  <span className="font-mono tabular-nums">${taxesAndFees.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-800">
                  <span>Total Amount Due</span>
                  <span className="font-mono text-amber-400 tabular-nums">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                <span>Confirm Reservation &amp; Generate Pass</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
