import React, { useState, useMemo } from 'react';
import { ATTRACTIONS, PARK_REALMS } from '../data/parkData';
import { Attraction, AttractionCategory, RealmId } from '../types/park';
import { Search, SlidersHorizontal, Plus, Check, Info, ArrowUpRight, Flame } from 'lucide-react';

interface AttractionsDirectoryProps {
  onSelectAttraction: (attraction: Attraction) => void;
  onToggleItinerary: (attraction: Attraction) => void;
  itineraryRideIds: string[];
}

export const AttractionsDirectory: React.FC<AttractionsDirectoryProps> = ({
  onSelectAttraction,
  onToggleItinerary,
  itineraryRideIds,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRealm, setSelectedRealm] = useState<string>('all');
  const [minHeightFilter, setMinHeightFilter] = useState<number>(0);

  const categories = [
    { label: 'All Rides', value: 'all' },
    { label: 'Roller Coasters', value: 'roller-coaster' },
    { label: 'Water Rides', value: 'water-ride' },
    { label: 'Dark Rides', value: 'dark-ride' },
    { label: 'Family & Kids', value: 'family' },
  ];

  const heightOptions = [
    { label: 'Any Height', value: 0 },
    { label: 'Under 40"', value: 40 },
    { label: '42" & Up', value: 42 },
    { label: '48" & Up', value: 48 },
    { label: '54" Thrill Seekers', value: 54 },
  ];

  const filteredAttractions = useMemo(() => {
    return ATTRACTIONS.filter((attr) => {
      const matchesSearch =
        attr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attr.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attr.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || attr.category === selectedCategory;

      const matchesRealm =
        selectedRealm === 'all' || attr.realmId === selectedRealm;

      const matchesHeight =
        minHeightFilter === 0 ||
        (minHeightFilter === 40 ? attr.minHeightInches <= 40 : attr.minHeightInches >= minHeightFilter);

      return matchesSearch && matchesCategory && matchesRealm && matchesHeight;
    });
  }, [searchQuery, selectedCategory, selectedRealm, minHeightFilter]);

  return (
    <section id="attractions" className="py-20 bg-[#090d16] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
            World-Class Thrills & Adventures
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Rides & Attractions Directory
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            From towering steel hyper-coasters and immersive 4D dark rides to family-friendly flying gliders, discover all experiences at Aetheria.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 mb-10 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search rides, coasters, rapids..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Height & Realm Filters */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters:</span>
              </div>

              {/* Realm Selector */}
              <select
                value={selectedRealm}
                onChange={(e) => setSelectedRealm(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="all">All Realms</option>
                {PARK_REALMS.map((realm) => (
                  <option key={realm.id} value={realm.id}>
                    {realm.name}
                  </option>
                ))}
              </select>

              {/* Height Selector */}
              <select
                value={minHeightFilter}
                onChange={(e) => setMinHeightFilter(Number(e.target.value))}
                className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {heightOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Tabs (Segmented control buttons) */}
          <div className="flex overflow-x-auto gap-1.5 pt-2 border-t border-slate-800/80 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Attractions Grid */}
        {filteredAttractions.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl">
            <p className="text-slate-400 text-base mb-3">
              No attractions match your search criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedRealm('all');
                setMinHeightFilter(0);
              }}
              className="text-xs font-bold text-amber-400 hover:underline uppercase tracking-wider"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAttractions.map((attraction) => {
              const realm = PARK_REALMS.find((r) => r.id === attraction.realmId);
              const isInPlan = itineraryRideIds.includes(attraction.id);

              return (
                <div
                  key={attraction.id}
                  className="group bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Visual Image Header */}
                  <div>
                    <div className="relative h-52 overflow-hidden bg-slate-950">
                      <img
                        src={attraction.image}
                        alt={attraction.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

                      {/* Standby Wait Badge */}
                      <div className="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-sm border border-slate-700/80 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold text-amber-400 tabular-nums">
                        {attraction.waitTimeMinutes} Min Wait
                      </div>

                      {/* Realm Color Dot */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-slate-200 bg-slate-900/80 backdrop-blur-sm px-2.5 py-0.5 rounded border border-slate-700/60">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: realm?.color || '#38bdf8' }}
                        />
                        <span className="font-medium text-[11px]">{realm?.name}</span>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-5">
                      {/* Unboxed Metadata (Zero-Pill Discipline) */}
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                        <span>{attraction.minHeightInches ? `${attraction.minHeightInches}" min` : 'All heights'}</span>
                        <span aria-hidden="true">·</span>
                        <span>{attraction.maxSpeedMph ? `${attraction.maxSpeedMph} mph` : 'Scenic'}</span>
                        <span aria-hidden="true">·</span>
                        <span>Thrill {attraction.thrillLevel}/5</span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-amber-400 transition-colors">
                        {attraction.name}
                      </h3>

                      <p className="text-xs text-slate-400 italic mb-3">
                        {attraction.tagline}
                      </p>

                      <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
                        {attraction.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-5 pt-0 mt-3 flex items-center gap-2 border-t border-slate-800/80 pt-4">
                    <button
                      onClick={() => onToggleItinerary(attraction)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                        isInPlan
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                          : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {isInPlan ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>In Day Plan</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-amber-400" />
                          <span>Add to Plan</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onSelectAttraction(attraction)}
                      className="flex items-center justify-center gap-1 px-3.5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                      aria-label={`View specs for ${attraction.name}`}
                    >
                      <span>Specs</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
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
