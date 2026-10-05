import React from 'react';
import { TICKET_TIERS, ADD_ON_OPTIONS } from '../data/parkData';
import { TicketTier } from '../types/park';
import { Check, Ticket, Zap, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

interface TicketPricingSectionProps {
  onSelectTier: (tier: TicketTier) => void;
}

export const TicketPricingSection: React.FC<TicketPricingSectionProps> = ({
  onSelectTier,
}) => {
  return (
    <section id="tickets-passes" className="py-20 bg-[#07090e] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
            Online Best Rate Guarantee
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Park Admission &amp; VIP Experiences
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Book online in advance to save up to $20 per ticket compared to gate turnstiles. Includes full access to all 5 realms and evening spectacles.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-14">
          {TICKET_TIERS.map((tier) => {
            const isPopular = tier.popular;

            return (
              <div
                key={tier.id}
                className={`relative rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-slate-900 border-2 border-amber-400 shadow-2xl shadow-amber-500/10 md:-translate-y-2'
                    : 'bg-slate-900/80 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Popularity Badge */}
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 font-bold uppercase text-[10px] tracking-widest px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                    {tier.badge}
                  </div>
                )}

                <div>
                  <div className="text-xl font-bold text-white mb-1">
                    {tier.title}
                  </div>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    {tier.description}
                  </p>

                  {/* Price display with tabular numerals */}
                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-slate-800">
                    <span className="text-4xl sm:text-5xl font-black text-white font-mono tabular-nums">
                      ${tier.price}
                    </span>
                    <span className="text-xs text-slate-400">
                      /adult (Ages 10+)
                    </span>
                  </div>

                  {/* Child Price Note */}
                  <div className="text-xs text-slate-400 mb-6 flex items-center justify-between">
                    <span>Child Pass (Ages 3–9):</span>
                    <span className="font-mono font-bold text-amber-400 tabular-nums">
                      ${tier.childPrice}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {tier.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <button
                  onClick={() => onSelectTier(tier)}
                  className={`w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isPopular
                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  <span>Select &amp; Configure Pass</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Add-ons & Benefits Banner */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs uppercase tracking-wider font-bold text-amber-400">
                <Zap className="w-4 h-4" />
                <span>Enhance Your Visit With Aetheria SpeedPass™</span>
              </div>
              <h3 className="text-2xl font-black text-white">
                Spend Less Time in Lines, More Time Soaring
              </h3>
              <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
                Add an unlimited SpeedPass to any day ticket to bypass standard queues at 14 headline attractions, including Hyperion Strike, Dragon's Siege, and Mystic Rapids.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onSelectTier(TICKET_TIERS[1])}
                className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer"
              >
                Add SpeedPass Online
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
