import React from 'react';
import { X, Trash2, Clock, Sparkles, MapPin, Printer, ArrowRight, Compass } from 'lucide-react';
import { Attraction } from '../types/park';
import { PARK_REALMS } from '../data/parkData';

interface ItineraryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  itineraryRides: Attraction[];
  onRemoveRide: (id: string) => void;
  onClearAll: () => void;
  onOpenAttraction: (attraction: Attraction) => void;
  onBookTickets: () => void;
}

export const ItineraryDrawer: React.FC<ItineraryDrawerProps> = ({
  isOpen,
  onClose,
  itineraryRides,
  onRemoveRide,
  onClearAll,
  onOpenAttraction,
  onBookTickets,
}) => {
  if (!isOpen) return null;

  const totalRideTime = itineraryRides.reduce((sum, r) => sum + r.durationMinutes, 0);
  const totalWaitTime = itineraryRides.reduce((sum, r) => sum + r.waitTimeMinutes, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl h-full flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="itinerary-title"
      >
        {/* Drawer Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <div>
              <h3 id="itinerary-title" className="text-base font-bold text-white">
                My Custom Day Itinerary
              </h3>
              <p className="text-[11px] text-slate-400">
                {itineraryRides.length} {itineraryRides.length === 1 ? 'Attraction' : 'Attractions'} Selected
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close Itinerary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 p-5 overflow-y-auto space-y-5">
          {itineraryRides.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Compass className="w-12 h-12 text-slate-600 mx-auto" />
              <h4 className="text-base font-bold text-white">
                Your Day Plan is Empty
              </h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Explore the park map or rides directory and tap "+ Plan" to build your optimal route and estimate queue times.
              </p>
            </div>
          ) : (
            <>
              {/* Telemetry Summary Cards */}
              <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div>
                  <span className="block text-[10px] uppercase text-slate-500 font-semibold">
                    Est. Standby Queue
                  </span>
                  <span className="text-base font-bold text-amber-400 font-mono tabular-nums">
                    {totalWaitTime} Minutes
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-slate-500 font-semibold">
                    Total Ride Time
                  </span>
                  <span className="text-base font-bold text-sky-400 font-mono tabular-nums">
                    {totalRideTime.toFixed(1)} Minutes
                  </span>
                </div>
              </div>

              {/* Recommended Flow Notice */}
              <div className="bg-slate-800/40 border border-slate-700/60 rounded-lg p-3 text-xs text-slate-300 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Tip: Visit <span className="text-white font-medium">Hyperion Strike</span> before 11:00 AM or after 6:00 PM for the shortest queues.
                </span>
              </div>

              {/* Selected Attraction Cards */}
              <div className="space-y-3">
                {itineraryRides.map((ride, index) => {
                  const realm = PARK_REALMS.find((r) => r.id === ride.realmId);

                  return (
                    <div
                      key={ride.id}
                      className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between gap-3 group hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 font-mono text-xs flex items-center justify-center font-bold">
                          {index + 1}
                        </span>

                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                          <img
                            src={ride.image}
                            alt={ride.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div>
                          <h4
                            onClick={() => {
                              onClose();
                              onOpenAttraction(ride);
                            }}
                            className="text-xs font-bold text-white hover:text-amber-400 cursor-pointer transition-colors"
                          >
                            {ride.name}
                          </h4>
                          <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: realm?.color || '#38bdf8' }}
                            />
                            <span>{realm?.name}</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono text-amber-400 tabular-nums">
                              {ride.waitTimeMinutes}m wait
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveRide(ride.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Remove from plan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Clear all action */}
              <div className="text-right">
                <button
                  onClick={onClearAll}
                  className="text-xs text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Clear All ({itineraryRides.length})
                </button>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-5 bg-slate-950 border-t border-slate-800 space-y-2">
          {itineraryRides.length > 0 && (
            <button
              onClick={() => window.print()}
              className="w-full py-2.5 px-4 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Itinerary &amp; Map Guide</span>
            </button>
          )}

          <button
            onClick={() => {
              onClose();
              onBookTickets();
            }}
            className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>Proceed to Ticket Booking</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
