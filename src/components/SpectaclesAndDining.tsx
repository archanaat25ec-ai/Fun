import React, { useState } from 'react';
import { PARK_SHOWS, DINING_SPOTS, PARK_REALMS, PARK_IMAGES } from '../data/parkData';
import { Sparkles, Utensils, Clock, MapPin, ChefHat, Smartphone, Flame } from 'lucide-react';

export const SpectaclesAndDining: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'shows' | 'dining'>('shows');

  return (
    <section id="shows-dining" className="py-20 bg-[#090d16] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-800">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
              Beyond the Coasters
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Spectacles, Stunts &amp; Dining
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Immerse yourself in world-class pyrotechnic symphonies, epic live stunt battles, and signature artisan culinary feasts.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="mt-4 md:mt-0 flex gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => setActiveTab('shows')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-colors cursor-pointer ${
                activeTab === 'shows'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Shows ({PARK_SHOWS.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('dining')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-colors cursor-pointer ${
                activeTab === 'dining'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Signature Dining ({DINING_SPOTS.length})</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Live Shows & Spectacles */}
        {activeTab === 'shows' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Featured Marquee Spectacular Banner */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
              <div className="relative h-72 sm:h-96 w-full">
                <img
                  src={PARK_SHOWS[0].image}
                  alt={PARK_SHOWS[0].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 max-w-3xl">
                  {/* Unboxed Metadata (Zero-Pill Rule) */}
                  <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider mb-2">
                    <span>Nightly Crown Spectacular</span>
                    <span aria-hidden="true" className="text-slate-500">·</span>
                    <span>{PARK_SHOWS[0].showtimes[0]}</span>
                    <span aria-hidden="true" className="text-slate-500">·</span>
                    <span>Duration: {PARK_SHOWS[0].durationMinutes} mins</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-black text-white mb-2">
                    {PARK_SHOWS[0].title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-4">
                    {PARK_SHOWS[0].description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      {PARK_SHOWS[0].venue}
                    </span>
                    <span className="text-slate-400">
                      Included with all general admission tickets
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Shows Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PARK_SHOWS.slice(1).map((show) => {
                const realm = PARK_REALMS.find((r) => r.id === show.realmId);

                return (
                  <div
                    key={show.id}
                    className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between"
                  >
                    <div className="relative h-48 bg-slate-950">
                      <img
                        src={show.image}
                        alt={show.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                      <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs text-slate-200 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded border border-slate-700">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: realm?.color || '#fbbf24' }}
                        />
                        <span>{realm?.name}</span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Unboxed Metadata */}
                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                          <span className="capitalize">{show.category} Show</span>
                          <span aria-hidden="true">·</span>
                          <span>{show.durationMinutes} Minutes</span>
                        </div>

                        <h4 className="text-xl font-bold text-white mb-2">
                          {show.title}
                        </h4>

                        <p className="text-sm text-slate-300 leading-relaxed mb-4">
                          {show.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-800">
                        <div className="text-xs text-slate-400 mb-1 font-medium">
                          Today's Showtimes:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {show.showtimes.map((st) => (
                            <span
                              key={st}
                              className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-amber-400 rounded"
                            >
                              {st}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Signature Dining */}
        {activeTab === 'dining' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {DINING_SPOTS.map((dining) => {
              const realm = PARK_REALMS.find((r) => r.id === dining.realmId);

              return (
                <div
                  key={dining.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between group hover:border-slate-700 transition-colors"
                >
                  <div>
                    <div className="relative h-48 bg-slate-950 overflow-hidden">
                      <img
                        src={dining.image}
                        alt={dining.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

                      <div className="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-sm border border-slate-700 px-2 py-0.5 rounded text-xs font-mono font-bold text-amber-400">
                        {dining.priceRange}
                      </div>

                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-slate-200 bg-slate-900/80 backdrop-blur-sm px-2.5 py-0.5 rounded border border-slate-700">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: realm?.color || '#34d399' }}
                        />
                        <span className="text-[11px]">{realm?.name}</span>
                      </div>
                    </div>

                    <div className="p-5">
                      {/* Unboxed Metadata */}
                      <div className="text-xs text-amber-400 font-medium mb-1">
                        {dining.cuisine}
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">
                        {dining.name}
                      </h3>

                      <p className="text-sm text-slate-300 leading-relaxed mb-4">
                        {dining.description}
                      </p>

                      <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 mb-3">
                        <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                          Chef's Specialty
                        </span>
                        <span className="text-xs font-medium text-slate-200">
                          {dining.specialty}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 pb-3 border-b border-slate-800">
                      {dining.dietary.map((d, idx) => (
                        <React.Fragment key={d}>
                          <span>{d}</span>
                          {idx < dining.dietary.length - 1 && (
                            <span aria-hidden="true" className="text-slate-600">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-slate-300">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Smartphone className="w-3.5 h-3.5" />
                        Mobile Ordering Available
                      </span>
                      <span className="text-slate-500">Pick-up in 10m</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
