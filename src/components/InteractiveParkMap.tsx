import React, { useState } from 'react';
import { PARK_REALMS, ATTRACTIONS } from '../data/parkData';
import { Attraction, RealmId, AttractionCategory } from '../types/park';
import { 
  MapPin, 
  Info, 
  Plus, 
  Check, 
  Compass, 
  Flame, 
  Waves, 
  Sparkles, 
  Layers,
  ChevronRight
} from 'lucide-react';

interface InteractiveParkMapProps {
  onSelectAttraction: (attraction: Attraction) => void;
  onToggleItinerary: (attraction: Attraction) => void;
  itineraryRideIds: string[];
}

export const InteractiveParkMap: React.FC<InteractiveParkMapProps> = ({
  onSelectAttraction,
  onToggleItinerary,
  itineraryRideIds,
}) => {
  const [selectedRealmId, setSelectedRealmId] = useState<RealmId | 'all'>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeAttraction, setActiveAttraction] = useState<Attraction>(ATTRACTIONS[0]);

  const filteredAttractions = ATTRACTIONS.filter((attr) => {
    const matchesRealm = selectedRealmId === 'all' || attr.realmId === selectedRealmId;
    const matchesCategory = activeCategory === 'all' || attr.category === activeCategory;
    return matchesRealm && matchesCategory;
  });

  const categories: { label: string; value: string }[] = [
    { label: 'All Attractions', value: 'all' },
    { label: 'Roller Coasters', value: 'roller-coaster' },
    { label: 'Water Expeditions', value: 'water-ride' },
    { label: 'Dark Rides', value: 'dark-ride' },
    { label: 'Family & Kids', value: 'family' },
  ];

  return (
    <section id="park-map" className="py-20 bg-[#07090e] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
              Wayfinding & Exploration
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Interactive Park Realm Navigator
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-xl">
              Tap any hotspot on the park grounds or filter by realm to view live wait times, height requirements, and ride profiles.
            </p>
          </div>

          {/* Category Filter - Functional Segmented Buttons */}
          <div className="mt-4 md:mt-0 flex flex-wrap gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.value
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Realm Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-3 mb-6 scrollbar-none">
          <button
            onClick={() => setSelectedRealmId('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-all whitespace-nowrap cursor-pointer ${
              selectedRealmId === 'all'
                ? 'bg-slate-800 border-amber-400/80 text-white font-semibold'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            All 5 Realms ({ATTRACTIONS.length})
          </button>
          {PARK_REALMS.map((realm) => {
            const isSelected = selectedRealmId === realm.id;
            return (
              <button
                key={realm.id}
                onClick={() => setSelectedRealmId(realm.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 text-white font-semibold shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
                style={{
                  borderColor: isSelected ? realm.color : undefined,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: realm.color }}
                />
                <span>{realm.name}</span>
              </button>
            );
          })}
        </div>

        {/* Map Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Visual Map Canvas */}
          <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 relative overflow-hidden shadow-2xl min-h-[460px] sm:min-h-[540px] flex flex-col justify-between">
            {/* SVG Park Map Background Graphic */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="lagoonGlow" cx="30%" cy="75%" r="35%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="volcanoGlow" cx="75%" cy="30%" r="35%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="cyberGlow" cx="75%" cy="75%" r="35%">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#881337" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Realm boundary fills */}
                <circle cx="30%" cy="75%" r="28%" fill="url(#lagoonGlow)" />
                <circle cx="75%" cy="30%" r="26%" fill="url(#volcanoGlow)" />
                <circle cx="75%" cy="75%" r="26%" fill="url(#cyberGlow)" />

                {/* Decorative pathways */}
                <path
                  d="M 120 400 Q 250 320 400 300 T 700 250 T 850 450 T 550 500 Z"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="6"
                  strokeDasharray="4 6"
                  opacity="0.5"
                />
                <path
                  d="M 400 300 L 400 120 M 400 300 L 700 450"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="8"
                  opacity="0.4"
                />

                {/* Central Lagoon */}
                <ellipse cx="32%" cy="70%" rx="18%" ry="12%" fill="#0369a1" opacity="0.3" />
                <ellipse cx="32%" cy="70%" rx="14%" ry="8%" fill="#0284c7" opacity="0.4" />
              </svg>
            </div>

            {/* Realm Labels on Map */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <span className="text-[11px] font-bold text-sky-400 tracking-wider uppercase">
                Skyward Frontier (Airfield)
              </span>
            </div>
            <div className="absolute top-4 right-4 z-10 pointer-events-none text-right">
              <span className="text-[11px] font-bold text-emerald-400 tracking-wider uppercase">
                Verdant Canyon (Rapids)
              </span>
            </div>
            <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
              <span className="text-[11px] font-bold text-purple-400 tracking-wider uppercase">
                Starlight Bay (Lagoon)
              </span>
            </div>
            <div className="absolute bottom-4 right-4 z-10 pointer-events-none text-right">
              <span className="text-[11px] font-bold text-rose-400 tracking-wider uppercase">
                Chronos Sector (Hyper Launch)
              </span>
            </div>

            {/* Attraction Hotspot Pins */}
            <div className="relative w-full h-[380px] sm:h-[420px] my-auto">
              {filteredAttractions.map((attraction) => {
                const isActive = activeAttraction.id === attraction.id;
                const isSaved = itineraryRideIds.includes(attraction.id);
                const realm = PARK_REALMS.find((r) => r.id === attraction.realmId);

                return (
                  <button
                    key={attraction.id}
                    onClick={() => setActiveAttraction(attraction)}
                    style={{
                      left: `${attraction.coordinates.x}%`,
                      top: `${attraction.coordinates.y}%`,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-200 z-20 cursor-pointer focus:outline-none`}
                    aria-label={`Select ${attraction.name}`}
                  >
                    {/* Pulsing ring if active */}
                    {isActive && (
                      <span
                        className="absolute -inset-2 rounded-full animate-ping opacity-75"
                        style={{ backgroundColor: realm?.color || '#fbbf24' }}
                      />
                    )}

                    {/* Pin Head with Wait Time Badge */}
                    <div
                      className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border transition-transform duration-200 ${
                        isActive
                          ? 'scale-110 shadow-lg text-slate-950 bg-white border-white'
                          : 'bg-slate-900/90 text-white border-slate-700 hover:scale-105 hover:border-slate-500'
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: realm?.color || '#fbbf24' }}
                      />
                      <span className="truncate max-w-[80px] sm:max-w-[110px]">
                        {attraction.name}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-1 rounded tabular-nums ${
                          isActive
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-800 text-amber-400'
                        }`}
                      >
                        {attraction.waitTimeMinutes}m
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="relative z-10 pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Standby &lt; 20m
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  Standby 20-40m
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  Peak &gt; 40m
                </span>
              </div>
              <div className="text-[11px] text-slate-500">
                Click pins to inspect attraction details & add to day itinerary
              </div>
            </div>
          </div>

          {/* Attraction Inspector Panel */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
            {/* Image Header with Fallback */}
            <div className="relative h-48 sm:h-52 bg-slate-950 overflow-hidden">
              <img
                src={activeAttraction.image}
                alt={activeAttraction.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

              {/* Status Badge in corner */}
              <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm border border-slate-700/60 rounded-md px-2.5 py-1 text-xs text-slate-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="capitalize">{activeAttraction.status}</span>
              </div>

              {/* Live Wait Time Badge */}
              <div className="absolute bottom-3 right-3 bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded-md text-xs font-mono tabular-nums shadow-md">
                {activeAttraction.waitTimeMinutes} Min Standby
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                {/* Realm & Category (Unboxed Text with Separator) */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                  <span className="font-semibold text-amber-400">
                    {PARK_REALMS.find((r) => r.id === activeAttraction.realmId)?.name}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="capitalize">{activeAttraction.category.replace('-', ' ')}</span>
                  <span aria-hidden="true">·</span>
                  <span>Thrill {activeAttraction.thrillLevel}/5</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {activeAttraction.name}
                </h3>
                <p className="text-xs text-slate-400 italic mb-3">
                  "{activeAttraction.tagline}"
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeAttraction.description}
                </p>

                {/* Ride Stats Grid */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800 text-center">
                  <div className="bg-slate-800/50 p-2 rounded-lg border border-slate-800">
                    <span className="block text-[11px] text-slate-400">Min Height</span>
                    <span className="text-xs font-bold text-white tabular-nums">
                      {activeAttraction.minHeightInches ? `${activeAttraction.minHeightInches}"` : 'None'}
                    </span>
                  </div>
                  <div className="bg-slate-800/50 p-2 rounded-lg border border-slate-800">
                    <span className="block text-[11px] text-slate-400">Max Speed</span>
                    <span className="text-xs font-bold text-white tabular-nums">
                      {activeAttraction.maxSpeedMph ? `${activeAttraction.maxSpeedMph} mph` : 'Gentle'}
                    </span>
                  </div>
                  <div className="bg-slate-800/50 p-2 rounded-lg border border-slate-800">
                    <span className="block text-[11px] text-slate-400">Duration</span>
                    <span className="text-xs font-bold text-white tabular-nums">
                      {activeAttraction.durationMinutes} min
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800 flex gap-2">
                <button
                  onClick={() => onToggleItinerary(activeAttraction)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                    itineraryRideIds.includes(activeAttraction.id)
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 hover:bg-emerald-500/30'
                      : 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {itineraryRideIds.includes(activeAttraction.id) ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>In My Day Plan</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 text-amber-400" />
                      <span>Add to Day Plan</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onSelectAttraction(activeAttraction)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  Full Specs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
