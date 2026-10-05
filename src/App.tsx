import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InteractiveParkMap } from './components/InteractiveParkMap';
import { AttractionsDirectory } from './components/AttractionsDirectory';
import { LiveWaitTimes } from './components/LiveWaitTimes';
import { SpectaclesAndDining } from './components/SpectaclesAndDining';
import { TicketPricingSection } from './components/TicketPricingSection';
import { VisitorGuideFaq } from './components/VisitorGuideFaq';
import { Footer } from './components/Footer';
import { RideModal } from './components/RideModal';
import { TicketCheckoutModal } from './components/TicketCheckoutModal';
import { ItineraryDrawer } from './components/ItineraryDrawer';

import { ATTRACTIONS, TICKET_TIERS } from './data/parkData';
import { Attraction, TicketTier } from './types/park';

export default function App() {
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTier, setCheckoutTier] = useState<TicketTier>(TICKET_TIERS[1]); // default to popular tier
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);
  const [itineraryRideIds, setItineraryRideIds] = useState<string[]>([
    'hyperion-strike',
    'mystic-river-rapids',
    'dragons-siege',
  ]);

  const itineraryRides = ATTRACTIONS.filter((attr) =>
    itineraryRideIds.includes(attr.id)
  );

  const handleToggleItinerary = (attraction: Attraction) => {
    setItineraryRideIds((prev) =>
      prev.includes(attraction.id)
        ? prev.filter((id) => id !== attraction.id)
        : [...prev, attraction.id]
    );
  };

  const handleRemoveFromItinerary = (id: string) => {
    setItineraryRideIds((prev) => prev.filter((rideId) => rideId !== id));
  };

  const handleClearItinerary = () => {
    setItineraryRideIds([]);
  };

  const handleOpenTickets = (tier?: TicketTier) => {
    if (tier) {
      setCheckoutTier(tier);
    }
    setIsCheckoutOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-amber-400 selection:text-slate-950">
      {/* Navigation Top Bar */}
      <Navbar
        itineraryCount={itineraryRideIds.length}
        onOpenItinerary={() => setIsItineraryOpen(true)}
        onOpenTickets={() => handleOpenTickets(TICKET_TIERS[1])}
      />

      <main>
        {/* Cinematic Hero */}
        <HeroSection
          onExploreAttractions={() => scrollToSection('attractions')}
          onBookTickets={() => handleOpenTickets(TICKET_TIERS[1])}
          onOpenMap={() => scrollToSection('park-map')}
        />

        {/* Interactive Realm Wayfinding Map */}
        <InteractiveParkMap
          onSelectAttraction={(attr) => setSelectedAttraction(attr)}
          onToggleItinerary={handleToggleItinerary}
          itineraryRideIds={itineraryRideIds}
        />

        {/* Full Attractions Directory with Multi-Facet Filters */}
        <AttractionsDirectory
          onSelectAttraction={(attr) => setSelectedAttraction(attr)}
          onToggleItinerary={handleToggleItinerary}
          itineraryRideIds={itineraryRideIds}
        />

        {/* Live Queue Radar & Wait Times */}
        <LiveWaitTimes
          onSelectAttraction={(attr) => setSelectedAttraction(attr)}
          onToggleItinerary={handleToggleItinerary}
          itineraryRideIds={itineraryRideIds}
        />

        {/* Night Fireworks, Live Stunt Shows & Artisan Feast Pavilions */}
        <SpectaclesAndDining />

        {/* Admission Passes & VIP Experiences */}
        <TicketPricingSection onSelectTier={handleOpenTickets} />

        {/* Guest Amenities, Accessibility & FAQ */}
        <VisitorGuideFaq />
      </main>

      {/* Grounded Footer */}
      <Footer onOpenTickets={() => handleOpenTickets(TICKET_TIERS[1])} />

      {/* Attraction Specifications Modal */}
      <RideModal
        attraction={selectedAttraction}
        onClose={() => setSelectedAttraction(null)}
        onToggleItinerary={handleToggleItinerary}
        isInItinerary={selectedAttraction ? itineraryRideIds.includes(selectedAttraction.id) : false}
      />

      {/* Ticket Booking & Instant Digital Pass Modal */}
      {isCheckoutOpen && (
        <TicketCheckoutModal
          initialTier={checkoutTier}
          onClose={() => setIsCheckoutOpen(false)}
        />
      )}

      {/* My Day Plan / Itinerary Drawer */}
      <ItineraryDrawer
        isOpen={isItineraryOpen}
        onClose={() => setIsItineraryOpen(false)}
        itineraryRides={itineraryRides}
        onRemoveRide={handleRemoveFromItinerary}
        onClearAll={handleClearItinerary}
        onOpenAttraction={(attr) => setSelectedAttraction(attr)}
        onBookTickets={() => {
          setIsItineraryOpen(false);
          handleOpenTickets(TICKET_TIERS[1]);
        }}
      />
    </div>
  );
}
