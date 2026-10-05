import React, { useState } from 'react';
import { FAQ_ITEMS, PARK_SCHEDULE_HOURS } from '../data/parkData';
import { ChevronDown, HelpCircle, ShieldCheck, Umbrella, Car, Accessibility, Info } from 'lucide-react';

export const VisitorGuideFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const amenities = [
    {
      icon: Umbrella,
      title: 'Rain Guarantee',
      desc: 'Free return pass if continuous rain exceeds 60 minutes during your visit.'
    },
    {
      icon: Accessibility,
      title: 'Accessibility Services',
      desc: 'Dedicated Attraction Access Passes, sensory quiet lounges, and wheelchair rentals.'
    },
    {
      icon: Car,
      title: 'Parking & Transit',
      desc: 'Preferred parking next to main gate, EV supercharging hubs, and direct express shuttles.'
    },
    {
      icon: ShieldCheck,
      title: 'Official Height Check',
      desc: 'Measure once at the entrance and receive a color wristband for effortless ride boarding.'
    }
  ];

  return (
    <section className="py-20 bg-[#090d16] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
            Essential Guest Knowledge
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Visitor Guide &amp; Frequent Questions
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Everything you need for a smooth, unforgettable day at Aetheria — from weather policies and parking to accessibility accommodations.
          </p>
        </div>

        {/* Guest Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {amenities.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-slate-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
