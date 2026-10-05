import React, { useState, useEffect } from 'react';
import { ATTRACTIONS, PARK_REALMS } from '../data/parkData';
import { Attraction } from '../types/park';
import { Clock, RefreshCw, Zap, Users, ArrowUpDown, ShieldCheck } from 'lucide-react';

interface LiveWaitTimesProps {
  onSelectAttraction: (attraction: Attraction) => void;
  onToggleItinerary: (attraction: Attraction) => void;
  itineraryRideIds: string[];
}

export const LiveWaitTimes: React.FC<LiveWaitTimesProps> = ({
  onSelectAttraction,
  onToggleItinerary,
  itineraryRideIds,
}) => {
  const [rides, setRides] = useState<Attraction[]>(ATTRACTIONS);
  const [sortBy, setSortBy] = useState<'shortest' | 'longest' | 'thrill'>('shortest');
  const [speedPassOnly, setSpeedPassOnly] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Just now');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Fluctuate wait times realistically +/- 5 min
      setRides((prev) =>
        prev.map((ride) => {
          const delta = Math.floor(Math.random() * 7) - 3;
          const newWait = Math.max(5, Math.min(85, ride.waitTimeMinutes + delta));
          return { ...ride, waitTimeMinutes: newWait };
        })
      );
      setLastUpdated('Updated just now');
      setIsRefreshing(false);
    }, 400);
  };

  const sortedRides = [...rides]
    .filter((ride) => !speedPassOnly || ride.speedPassEligible)
    .sort((a, b) => {
      if (sortBy === 'shortest') return a.waitTimeMinutes - b.waitTimeMinutes;
      if (sortBy === 'longest') return b.waitTimeMinutes - a.waitTimeMinutes;
      if (sortBy === 'thrill') return b.thrillLevel - a.thrillLevel;
      return 0;
    });

  return (
    <section id="live-wait-times" className="py-20 bg-[#07090e] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
              Park Operations & Queue Telemetry
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Live Ride Wait Times & Queue Radar
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-xl">
              Live standby estimates updated in real time from turnstile sensors and dispatcher logs.
            </p>
          </div>

          {/* Action & Filter Toolbar */}
          <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-3">
            {/* Sort Buttons */}
            <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
              <button
                onClick={() => setSortBy('shortest')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  sortBy === 'shortest'
                    ? 'bg-amber-400 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Shortest Lines
              </button>
              <button
                onClick={() => setSortBy('longest')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  sortBy === 'longest'
                    ? 'bg-amber-400 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Longest Lines
              </button>
              <button
                onClick={() => setSortBy('thrill')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  sortBy === 'thrill'
                    ? 'bg-amber-400 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Highest Thrill
              </button>
            </div>

            {/* SpeedPass toggle */}
            <button
              onClick={() => setSpeedPassOnly(!speedPassOnly)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                speedPassOnly
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/60'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>SpeedPass Only</span>
            </button>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              title="Refresh live queue estimates"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Live Wait Times Table / List */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              All sensors active · {lastUpdated}
            </span>
            <span className="font-mono tabular-nums">{sortedRides.length} Attractions Tracked</span>
          </div>

          <div className="divide-y divide-slate-800/80">
            {sortedRides.map((ride) => {
              const realm = PARK_REALMS.find((r) => r.id === ride.realmId);
              const isInPlan = itineraryRideIds.includes(ride.id);

              let waitColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60';
              if (ride.waitTimeMinutes >= 40) {
                waitColor = 'text-rose-400 bg-rose-950/40 border-rose-800/60';
              } else if (ride.waitTimeMinutes >= 25) {
                waitColor = 'text-amber-400 bg-amber-950/40 border-amber-800/60';
              }

              return (
                <div
                  key={ride.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                >
                  {/* Attraction Basic Info */}
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                      <img
                        src={ride.image}
                        alt={ride.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                        <span
                          className="w-2 h-2 rounded-full inline-block"
                          style={{ backgroundColor: realm?.color || '#38bdf8' }}
                        />
                        <span>{realm?.name}</span>
                        <span aria-hidden="true">·</span>
                        <span className="capitalize">{ride.category.replace('-', ' ')}</span>
                      </div>

                      <h3
                        onClick={() => onSelectAttraction(ride)}
                        className="text-base sm:text-lg font-bold text-white hover:text-amber-400 cursor-pointer transition-colors"
                      >
                        {ride.name}
                      </h3>

                      {/* Unboxed Metadata (Zero-Pill Rule) */}
                      <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-400 mt-1">
                        <span>Min height: {ride.minHeightInches ? `${ride.minHeightInches}"` : 'None'}</span>
                        <span aria-hidden="true">·</span>
                        <span>Thrill {ride.thrillLevel}/5</span>
                        {ride.singleRider && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-sky-400 flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              Single Rider Available
                            </span>
                          </>
                        )}
                        {ride.speedPassEligible && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-amber-400 flex items-center gap-1">
                              <Zap className="w-3 h-3" />
                              SpeedPass
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Wait Time & Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                    <div className="text-left sm:text-right">
                      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-0.5">
                        Standby Queue
                      </div>
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md border font-mono font-bold text-sm sm:text-base tabular-nums ${waitColor}`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>{ride.waitTimeMinutes} Min</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onToggleItinerary(ride)}
                        className={`p-2.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                          isInPlan
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 hover:bg-emerald-500/30'
                            : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                        }`}
                        title={isInPlan ? 'Remove from Day Plan' : 'Add to Day Plan'}
                      >
                        {isInPlan ? 'In Plan' : '+ Plan'}
                      </button>

                      <button
                        onClick={() => onSelectAttraction(ride)}
                        className="px-3 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                      >
                        View Specs
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
