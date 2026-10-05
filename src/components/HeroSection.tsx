import React from 'react';
import { ArrowRight, Compass, Ticket, SunMedium, Clock, Sparkles } from 'lucide-react';
import { PARK_IMAGES, PARK_SCHEDULE_HOURS } from '../data/parkData';

interface HeroSectionProps {
  onExploreAttractions: () => void;
  onBookTickets: () => void;
  onOpenMap: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreAttractions,
  onBookTickets,
  onOpenMap,
}) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image Container with Measured AA Scrim */}
      <div className="absolute inset-0 -z-10 bg-slate-950">
        <img
          src={PARK_IMAGES.hero}
          alt="Aetheria Theme Park panoramic view at golden hour"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Measured dark gradient scrim to guarantee WCAG AA contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/70 to-[#07090e]/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#07090e]/30 to-[#07090e]/90" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex flex-col items-center text-center">
        {/* Editorial Eyebrow - Unboxed Text */}
        <div className="flex items-center gap-2 text-xs md:text-sm tracking-widest uppercase font-semibold text-amber-400 mb-4">
          <span>5 Immersive Story Realms</span>
          <span aria-hidden="true" className="text-slate-500">·</span>
          <span>24 Record Attractions</span>
          <span aria-hidden="true" className="text-slate-500">·</span>
          <span>Nightly Fireworks</span>
        </div>

        {/* Marquee Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl leading-[1.08] mb-6">
          Where Gravity Ends and Wonder Begins
        </h1>

        {/* Concrete Proposition */}
        <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          Plunge 225 feet down vertical hyper-drops, navigate roaring jungle rapids, 
          and witness the dazzling Celestial Symphony over the lagoon at world-acclaimed Aetheria.
        </p>

        {/* Primary Action Zone */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
          <button
            onClick={onBookTickets}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-98 rounded-lg shadow-lg shadow-amber-500/20 transition-all cursor-pointer whitespace-nowrap"
          >
            <Ticket className="w-4 h-4" />
            <span>Book Tickets (From $69)</span>
          </button>

          <button
            onClick={onExploreAttractions}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>Explore All Rides</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>

          <button
            onClick={onOpenMap}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
          >
            <Compass className="w-4 h-4 text-sky-400" />
            <span>Interactive Map</span>
          </button>
        </div>

        {/* Operational Status Strip - Quiet & Trustworthy (No Pill Clutter) */}
        <div className="w-full max-w-4xl bg-slate-900/85 backdrop-blur-md border border-slate-800/90 rounded-xl p-4 sm:p-5 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="px-2 pt-2 md:pt-0">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Today's Hours</span>
              </div>
              <p className="text-sm font-bold text-white tabular-nums">
                {PARK_SCHEDULE_HOURS.regularHours}
              </p>
              <p className="text-[11px] text-slate-500">Early Access 8:00 AM</p>
            </div>

            <div className="px-2 pt-2 md:pt-0">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <SunMedium className="w-3.5 h-3.5 text-sky-400" />
                <span>Current Weather</span>
              </div>
              <p className="text-sm font-bold text-white tabular-nums">
                {PARK_SCHEDULE_HOURS.currentTemp} · Clear
              </p>
              <p className="text-[11px] text-slate-500">Wind 4 mph · Ideal Rides</p>
            </div>

            <div className="px-2 pt-2 md:pt-0">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Night Spectacular</span>
              </div>
              <p className="text-sm font-bold text-white tabular-nums">
                {PARK_SCHEDULE_HOURS.fireworksTime}
              </p>
              <p className="text-[11px] text-slate-500">Lagoon Fireworks & Lasers</p>
            </div>

            <div className="px-2 pt-2 md:pt-0">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Park Capacity</span>
              </div>
              <p className="text-sm font-bold text-emerald-400">
                Operating Normally
              </p>
              <p className="text-[11px] text-slate-500">All 24 Major Rides Open</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
