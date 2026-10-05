import React from 'react';
import { MapPin, Phone, Mail, Clock, Ticket } from 'lucide-react';
import { PARK_SCHEDULE_HOURS } from '../data/parkData';

interface FooterProps {
  onOpenTickets: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTickets }) => {
  return (
    <footer className="bg-[#05070a] border-t border-slate-800/80 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-2xl font-black tracking-tight text-white font-display block">
              Aetheria
            </span>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              The premier theme park & adventure resort dedicated to world-record roller coaster engineering, immersive story realms, and unforgettable multi-sensory spectacles.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenTickets}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
              >
                Book Tickets Online
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Explore Park
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#attractions" className="hover:text-amber-400 transition-colors">
                  All 24 Attractions
                </a>
              </li>
              <li>
                <a href="#park-map" className="hover:text-amber-400 transition-colors">
                  Interactive Realm Map
                </a>
              </li>
              <li>
                <a href="#live-wait-times" className="hover:text-amber-400 transition-colors">
                  Live Queue Radar
                </a>
              </li>
              <li>
                <a href="#shows-dining" className="hover:text-amber-400 transition-colors">
                  Fireworks &amp; Stunt Shows
                </a>
              </li>
              <li>
                <a href="#shows-dining" className="hover:text-amber-400 transition-colors">
                  Gourmet Feast Pavilions
                </a>
              </li>
            </ul>
          </div>

          {/* Guest Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Guest Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Attraction Access Pass (ADA)
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Lockers &amp; Stroller Rentals
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Weather Rain Guarantee
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Lost &amp; Found Assistance
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Safety Height Guidebook
                </span>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Resort Location &amp; Hours
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>1000 Aetheria Boulevard, Summit Valley, CA 95033</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Park Gates: {PARK_SCHEDULE_HOURS.regularHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Guest Concierge: (800) 555-0199</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>concierge@aetheriapark.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Sub-Footer */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Aetheria Theme Park &amp; Adventure Resort LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Admission</span>
            <span className="hover:text-slate-400 cursor-pointer">Safety Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
