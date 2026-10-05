import React from 'react';
import { X, Clock, Flame, ShieldAlert, Check, Plus, Gauge, Sparkles, Navigation } from 'lucide-react';
import { Attraction } from '../types/park';
import { PARK_REALMS } from '../data/parkData';

interface RideModalProps {
  attraction: Attraction | null;
  onClose: () => void;
  onToggleItinerary: (attraction: Attraction) => void;
  isInItinerary: boolean;
}

export const RideModal: React.FC<RideModalProps> = ({
  attraction,
  onClose,
  onToggleItinerary,
  isInItinerary,
}) => {
  if (!attraction) return null;

  const realm = PARK_REALMS.find((r) => r.id === attraction.realmId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-slate-300 hover:text-white bg-slate-900/80 rounded-full border border-slate-700 backdrop-blur-sm transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Banner */}
        <div className="relative h-64 sm:h-72 bg-slate-950 shrink-0">
          <img
            src={attraction.image}
            alt={attraction.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

          {/* Standby wait overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                {realm?.name} Realm
              </div>
              <h3 id="modal-title" className="text-2xl sm:text-3xl font-black text-white">
                {attraction.name}
              </h3>
            </div>
            <div className="bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-lg text-right">
              <span className="block text-[10px] text-slate-400">Current Standby</span>
              <span className="text-sm font-bold text-amber-400 font-mono tabular-nums">
                {attraction.waitTimeMinutes} Min Wait
              </span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Unboxed Metadata Strip */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pb-3 border-b border-slate-800">
            <span>{attraction.minHeightInches ? `${attraction.minHeightInches}" Min Height` : 'No Height Limit'}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Thrill Level {attraction.thrillLevel} of 5</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Duration: {attraction.durationMinutes} min</span>
            {attraction.speedPassEligible && (
              <>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-amber-400 font-medium">SpeedPass™ Available</span>
              </>
            )}
            {attraction.singleRider && (
              <>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-sky-400">Single Rider Queue</span>
              </>
            )}
          </div>

          {/* Narrative Description */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
              Attraction Experience & Story
            </h4>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {attraction.description}
            </p>
          </div>

          {/* Technical Engineering Specifications */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3">
              Engineering Profile & Physics
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/60">
                <span className="block text-[11px] text-slate-400">Max Velocity</span>
                <span className="text-base font-bold text-white font-mono tabular-nums">
                  {attraction.maxSpeedMph ? `${attraction.maxSpeedMph} mph` : 'Gentle Pace'}
                </span>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/60">
                <span className="block text-[11px] text-slate-400">Vertical Drop</span>
                <span className="text-base font-bold text-white font-mono tabular-nums">
                  {attraction.dropFeet ? `${attraction.dropFeet} ft` : 'Ground Level'}
                </span>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/60">
                <span className="block text-[11px] text-slate-400">Inversions</span>
                <span className="text-base font-bold text-white font-mono tabular-nums">
                  {attraction.inversions !== undefined ? `${attraction.inversions} Zero-G` : '0'}
                </span>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/60">
                <span className="block text-[11px] text-slate-400">Rider Restraint</span>
                <span className="text-xs font-semibold text-slate-200 truncate mt-1">
                  Over-the-Shoulder
                </span>
              </div>
            </div>
          </div>

          {/* Accessibility & Safety Notices */}
          <div className="bg-slate-800/40 border border-slate-700/80 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <ShieldAlert className="w-4 h-4" />
              <span>Guest Safety & Accessibility Requirements</span>
            </div>
            <p className="text-xs text-slate-300 leading-normal">
              {attraction.accessibility} Expectant mothers and guests with neck, back, or heart conditions should review safety guidelines before boarding.
            </p>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-400">
            Location: <span className="text-slate-200 font-medium">{realm?.name}</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onToggleItinerary(attraction)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                isInItinerary
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 hover:bg-emerald-500/30'
                  : 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700'
              }`}
            >
              {isInItinerary ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Added to Day Plan</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Add to My Day Plan</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
