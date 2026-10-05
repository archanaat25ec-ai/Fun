import { Attraction, ParkRealm, ParkShow, DiningSpot, TicketTier, AddOnOption } from '../types/park';

import heroImg from '../assets/images/hero_amusement_park_1791194590434.jpg';
import hyperCoasterImg from '../assets/images/ride_hyper_coaster_1791194616522.jpg';
import riverRapidsImg from '../assets/images/ride_river_rapids_1791194630976.jpg';
import nightSpectacularImg from '../assets/images/park_night_spectacular_1791194645876.jpg';
import diningFeastImg from '../assets/images/park_dining_feast_1791194656785.jpg';

export const PARK_IMAGES = {
  hero: heroImg,
  hyperCoaster: hyperCoasterImg,
  riverRapids: riverRapidsImg,
  nightSpectacular: nightSpectacularImg,
  diningFeast: diningFeastImg,
};

export const PARK_REALMS: ParkRealm[] = [
  {
    id: 'skyward-frontier',
    name: 'Skyward Frontier',
    themeTitle: 'Aero-Engineered Heights & Zero-G Thrills',
    description: 'A sprawling steampunk aviator sanctuary perched high above the cliffs, home to hyper-coasters, free-fall drops, and supersonic loops.',
    color: '#38bdf8', // sky blue
    iconName: 'PlaneTakeoff',
    bgGradient: 'from-sky-950/60 to-slate-900/80',
    highlightAttraction: 'Hyperion Strike',
    mapCoords: { cx: 28, cy: 30, r: 18 }
  },
  {
    id: 'verdant-canyon',
    name: 'Verdant Canyon',
    themeTitle: 'Deep Rainforest & Torrential Rapids',
    description: 'An untamed prehistoric river valley featuring thundering waterfalls, ancient stone temple log chutes, and canyon expeditions.',
    color: '#34d399', // emerald
    iconName: 'Compass',
    bgGradient: 'from-emerald-950/60 to-slate-900/80',
    highlightAttraction: 'Mystic River Expedition',
    mapCoords: { cx: 72, cy: 28, r: 18 }
  },
  {
    id: 'mythic-citadel',
    name: 'Mythic Citadel',
    themeTitle: 'Medieval Legends, Sorcery & Beast Encounters',
    description: 'Walk through towering cobblestone fortress gates, discover wizarding alchemy towers, and confront fire-breathing shadow beasts.',
    color: '#fbbf24', // amber
    iconName: 'Shield',
    bgGradient: 'from-amber-950/60 to-slate-900/80',
    highlightAttraction: "Dragon's Siege Dark Coaster",
    mapCoords: { cx: 50, cy: 52, r: 20 }
  },
  {
    id: 'starlight-bay',
    name: 'Starlight Bay',
    themeTitle: 'Bioluminescent Lagoon & Evening Boardwalk',
    description: 'An idyllic aquatic promenade with shimmering reflections, carousel spires, artisanal culinary pavilions, and the nightly fireworks spectacle.',
    color: '#c084fc', // purple
    iconName: 'Sparkles',
    bgGradient: 'from-purple-950/60 to-slate-900/80',
    highlightAttraction: 'Celestial Lagoon Odyssey',
    mapCoords: { cx: 26, cy: 75, r: 18 }
  },
  {
    id: 'chronos-sector',
    name: 'Chronos Sector',
    themeTitle: 'Retro-Futuristic Cyber Speed & Time Rifts',
    description: 'A high-voltage neon neon-lit sector where electromagnetic launch tracks propel riders through holographic wormholes.',
    color: '#f43f5e', // rose
    iconName: 'Zap',
    bgGradient: 'from-rose-950/60 to-slate-900/80',
    highlightAttraction: 'Vortex Tachyon Launch',
    mapCoords: { cx: 74, cy: 74, r: 18 }
  }
];

export const ATTRACTIONS: Attraction[] = [
  {
    id: 'hyperion-strike',
    name: 'Hyperion Strike',
    tagline: 'Record-Breaking 225-Foot Hyper Coaster Dive',
    realmId: 'skyward-frontier',
    category: 'roller-coaster',
    thrillLevel: 5,
    minHeightInches: 54,
    durationMinutes: 3.2,
    maxSpeedMph: 82,
    dropFeet: 225,
    inversions: 4,
    image: hyperCoasterImg,
    waitTimeMinutes: 35,
    status: 'operating',
    speedPassEligible: true,
    singleRider: true,
    accessibility: 'Standard transfer device provided. Must transfer independently or with assistance.',
    description: 'Ascend 240 feet into the cloud line before plunging down a breathless 90-degree vertical drop into an acoustic sound tunnel, carving through four zero-G parabolic rolls over the lake.',
    coordinates: { x: 26, y: 22 }
  },
  {
    id: 'mystic-river-rapids',
    name: 'Mystic River Expedition',
    tagline: 'Torrential 12-Passenger Canyon Raft Rapids',
    realmId: 'verdant-canyon',
    category: 'water-ride',
    thrillLevel: 3,
    minHeightInches: 42,
    durationMinutes: 5.5,
    maxSpeedMph: 24,
    dropFeet: 35,
    inversions: 0,
    image: riverRapidsImg,
    waitTimeMinutes: 20,
    status: 'operating',
    speedPassEligible: true,
    singleRider: false,
    accessibility: 'Step down into floating raft. Guest will get moderately to thoroughly wet.',
    description: 'Navigate raging whitewater swirls, dodge erupting geysers beneath ancient carved idols, and plunge down a cascading double-tiered waterfall into the misty cavern below.',
    coordinates: { x: 74, y: 24 }
  },
  {
    id: 'dragons-siege',
    name: "Dragon's Siege: Keep of Flames",
    tagline: '4D Multi-Sensory Indoor Story Dark Coaster',
    realmId: 'mythic-citadel',
    category: 'dark-ride',
    thrillLevel: 4,
    minHeightInches: 48,
    durationMinutes: 4.0,
    maxSpeedMph: 55,
    dropFeet: 68,
    inversions: 2,
    image: hyperCoasterImg,
    waitTimeMinutes: 45,
    status: 'operating',
    speedPassEligible: true,
    singleRider: true,
    accessibility: 'Wheelchair access to boarding platform. Optical light and theatrical fog effects.',
    description: 'Board an enchanted battle chariot through the fiery depths of Lord Malakor’s subterranean dungeon. Features physical fire heat blasts, real animatronic dragons, and backward track switchbacks.',
    coordinates: { x: 50, y: 48 }
  },
  {
    id: 'vortex-tachyon',
    name: 'Vortex Tachyon Launch',
    tagline: '0 to 70 MPH in 1.9 Seconds Linear Launch',
    realmId: 'chronos-sector',
    category: 'roller-coaster',
    thrillLevel: 5,
    minHeightInches: 52,
    durationMinutes: 2.4,
    maxSpeedMph: 72,
    dropFeet: 140,
    inversions: 5,
    image: heroImg,
    waitTimeMinutes: 30,
    status: 'operating',
    speedPassEligible: true,
    singleRider: true,
    accessibility: 'High acceleration restraint harness. Transfer assistance available.',
    description: 'Harness electromagnetic catapult technology. Rocket out of the hangar directly into a heartline roll, followed by a double batwing element wrapped in pulsing reactive neon tubes.',
    coordinates: { x: 78, y: 72 }
  },
  {
    id: 'celestial-lagoon-odyssey',
    name: 'Celestial Lagoon Odyssey',
    tagline: 'Illuminated Night Flume with Symphonic Serenade',
    realmId: 'starlight-bay',
    category: 'water-ride',
    thrillLevel: 2,
    minHeightInches: 36,
    durationMinutes: 6.8,
    maxSpeedMph: 18,
    dropFeet: 25,
    inversions: 0,
    image: nightSpectacularImg,
    waitTimeMinutes: 15,
    status: 'operating',
    speedPassEligible: true,
    singleRider: false,
    accessibility: 'Gentle boat embarkation, fully accessible boarding bay.',
    description: 'Drift along a bioluminescent canal surrounded by glowing kinetic crystal sculptures, cascading fountains, and gentle storybook audio before a refreshing gentle splashdown finale.',
    coordinates: { x: 28, y: 78 }
  },
  {
    id: 'aero-glider',
    name: 'Zephyr Wing Gliders',
    tagline: 'Suspended Family Flying Coaster Over Canopy',
    realmId: 'skyward-frontier',
    category: 'family',
    thrillLevel: 3,
    minHeightInches: 40,
    durationMinutes: 3.0,
    maxSpeedMph: 38,
    dropFeet: 45,
    inversions: 0,
    image: heroImg,
    waitTimeMinutes: 15,
    status: 'operating',
    speedPassEligible: true,
    singleRider: false,
    accessibility: 'Suspended seating with smooth overhead lap bar. Suitable for young aviators.',
    description: 'Soar like a hawk in tandem suspended seats with legs dangling freely in the breeze as you glide smoothly over pine tree tops and mountain ravines.',
    coordinates: { x: 22, y: 36 }
  },
  {
    id: 'temple-run-minecart',
    name: 'Temple of the Sun Serpent',
    tagline: 'High-Banked Wooden Coaster Through Ruins',
    realmId: 'verdant-canyon',
    category: 'roller-coaster',
    thrillLevel: 4,
    minHeightInches: 46,
    durationMinutes: 3.5,
    maxSpeedMph: 60,
    dropFeet: 110,
    inversions: 0,
    image: riverRapidsImg,
    waitTimeMinutes: 25,
    status: 'operating',
    speedPassEligible: true,
    singleRider: true,
    accessibility: 'Dynamic physical forces. Padded lap restraints.',
    description: 'A hybrid timber and steel coaster delivering 14 moments of negative-G airtime while darting through overgrown stone arches and underground gold mine tunnels.',
    coordinates: { x: 80, y: 34 }
  },
  {
    id: 'alchemist-spires',
    name: 'The Alchemist’s Grand Carousel',
    tagline: 'Hand-Carved Mythical Beasts with Orchestral Organ',
    realmId: 'mythic-citadel',
    category: 'family',
    thrillLevel: 1,
    minHeightInches: 0,
    durationMinutes: 3.5,
    maxSpeedMph: 8,
    image: diningFeastImg,
    waitTimeMinutes: 5,
    status: 'operating',
    speedPassEligible: false,
    singleRider: false,
    accessibility: 'ADA wheelchair accessible carriage available on rotating platform.',
    description: 'A breathtaking two-story carousel adorned with 68 hand-carved griffins, pegasi, and armored steeds beneath a stained-glass vaulted cupola.',
    coordinates: { x: 44, y: 58 }
  },
  {
    id: 'quantum-drop',
    name: 'Quantum Terminal Tower',
    tagline: '180-Foot Magnetic Braking Free-Fall Drop',
    realmId: 'chronos-sector',
    category: 'thrill',
    thrillLevel: 5,
    minHeightInches: 52,
    durationMinutes: 1.8,
    maxSpeedMph: 65,
    dropFeet: 180,
    image: heroImg,
    waitTimeMinutes: 20,
    status: 'operating',
    speedPassEligible: true,
    singleRider: true,
    accessibility: 'Vertical hoist harness. Must have upper body control.',
    description: 'Hold your breath as you gently rise to overlook the entire metropolis skyline, pause in total silence for five unpredictable seconds, and plunge toward the earth.',
    coordinates: { x: 66, y: 78 }
  }
];

export const PARK_SHOWS: ParkShow[] = [
  {
    id: 'show-symphony',
    title: 'Celestial Symphony of Lights & Water',
    venue: 'Starlight Bay Central Lagoon Amphitheater',
    realmId: 'starlight-bay',
    showtimes: ['9:30 PM (Grand Finale)'],
    durationMinutes: 25,
    description: 'The park’s crowning evening production featuring 180 choreographed dancing water fountains, pyrotechnics, drone sky formations, and an original orchestral soundtrack.',
    image: nightSpectacularImg,
    category: 'spectacular'
  },
  {
    id: 'show-dragons-forge',
    title: "Dragon's Forge: Battle for the Realm",
    venue: 'Mythic Citadel Grand Arena',
    realmId: 'mythic-citadel',
    showtimes: ['1:30 PM', '4:30 PM', '7:00 PM'],
    durationMinutes: 35,
    description: 'A pulse-pounding live stunt spectacle with champion swordsmen, aerial silk acrobats, roaring pyrotechnic bursts, and an animatronic mechanical dragon.',
    image: hyperCoasterImg,
    category: 'stunt'
  },
  {
    id: 'show-cyber-parade',
    title: 'Neon Kinetic Procession',
    venue: 'Chronos Sector Main Boulevard',
    realmId: 'chronos-sector',
    showtimes: ['3:00 PM', '6:30 PM'],
    durationMinutes: 20,
    description: 'High-energy electronic dance parade featuring glowing robotic floats, LED stilt walkers, and futuristic interactive beats.',
    image: heroImg,
    category: 'parade'
  }
];

export const DINING_SPOTS: DiningSpot[] = [
  {
    id: 'dining-pitmaster',
    name: "The Pitmaster's Forge",
    cuisine: 'Smoked Texas-Style Barbecue & Fire-Roasted Skewers',
    realmId: 'verdant-canyon',
    description: '14-hour hickory-smoked brisket, bourbon-glazed ribs, skillet cornbread, and honey-roasted corn on the cob served open-flame.',
    specialty: 'Smoked Prime Brisket Platter with Pit Beans',
    priceRange: '$$',
    dietary: ['Gluten-Friendly', 'Dairy-Free Options'],
    image: diningFeastImg,
    mobileOrdering: true
  },
  {
    id: 'dining-citadel-tavern',
    name: 'The Crown & Flagon Feast Hall',
    cuisine: 'Hearty Artisan Pasties, Roast Turkey Legs & Craft Ales',
    realmId: 'mythic-citadel',
    description: 'Step into an authentic stone-timbered tavern serving golden flaky savory pies, giant smoked turkey wings, and buttered cider.',
    specialty: 'King’s Smoked Turkey Leg with Herb Butter Fries',
    priceRange: '$$',
    dietary: ['Vegetarian Option', 'Nut-Free'],
    image: diningFeastImg,
    mobileOrdering: true
  },
  {
    id: 'dining-churro-foundry',
    name: 'Artisan Churro & Sugar Foundry',
    cuisine: 'Fresh Rolled Churros, Dipping Ganache & Gelato',
    realmId: 'skyward-frontier',
    description: 'Warm hand-crafted churro loops spun to order, dusted in cinnamon cardamom sugar with warm Belgian dark chocolate ganache.',
    specialty: 'Dulce de Leche Filled Churro Tower with Vanilla Bean Gelato',
    priceRange: '$',
    dietary: ['Vegetarian'],
    image: diningFeastImg,
    mobileOrdering: true
  }
];

export const TICKET_TIERS: TicketTier[] = [
  {
    id: 'tier-single-day',
    title: '1-Day General Adventure Pass',
    price: 69,
    childPrice: 52,
    description: 'Full day access to all 5 themed realms, 24 premier rides, and all live entertainment shows.',
    features: [
      'Unlimited entry to all 5 themed lands',
      'Free admission to evening fireworks & lagoon shows',
      'Complimentary in-park Wi-Fi & live wait times app',
      'Children age 2 and under enter free'
    ]
  },
  {
    id: 'tier-2-day',
    title: '2-Day Adventure Hopper',
    badge: 'Most Popular',
    popular: true,
    price: 119,
    childPrice: 89,
    description: 'Experience everything without rushing. Two full days of thrills with 1-hour early park entry.',
    features: [
      'Two full consecutive days of unlimited park admission',
      '60-Minute Early Park Entry before general gates',
      'Free souvenir collectible lanyard & refillable cup',
      '15% discount on in-park merchandise & selected dining'
    ]
  },
  {
    id: 'tier-vip-guided',
    title: 'Royal VIP All-Access Experience',
    badge: 'Ultimate Privilege',
    price: 195,
    childPrice: 155,
    description: 'The pinnacle theme park day with personal VIP concierge guide, zero-wait access, and VIP lounge seating.',
    features: [
      'Unlimited instant SpeedPass on all rides all day long',
      'Reserved private waterfront lounge for evening fireworks',
      'All-Day Dining Pass included (entree + beverage every 90 min)',
      'Preferred front-row parking and souvenir digital photo pass'
    ]
  }
];

export const ADD_ON_OPTIONS: AddOnOption[] = [
  {
    id: 'addon-speedpass',
    name: 'Aetheria SpeedPass™ Express',
    price: 45,
    description: 'Bypass standard standby queues at top 14 thrill coasters and water rides all day.'
  },
  {
    id: 'addon-all-day-dining',
    name: 'All-Day Dining Passport',
    price: 36,
    description: 'Enjoy a meal combo (entree + side + drink) every 90 minutes across 12 participating locations.'
  },
  {
    id: 'addon-photo-pass',
    name: 'Unlimited High-Speed Photo Pass',
    price: 24,
    description: 'Instant digital downloads of all on-ride camera action shots and roaming park photographer portraits.'
  },
  {
    id: 'addon-preferred-parking',
    name: 'Preferred Up-Front Parking',
    price: 18,
    description: 'Reserved parking spaces right next to the grand entrance archway.'
  }
];

export const PARK_SCHEDULE_HOURS = {
  todayDate: 'Today, October 5',
  regularHours: '9:00 AM – 10:00 PM',
  earlyEntryHours: '8:00 AM – 9:00 AM',
  fireworksTime: '9:30 PM',
  currentTemp: '74°F',
  condition: 'Clear Skies & Light Breeze',
  crowdLevel: 'Moderate (Average wait: 24 min)'
};

export const FAQ_ITEMS = [
  {
    q: 'Can I change my ticket date or request a weather rain guarantee?',
    a: 'Yes. Tickets can be rebooked to any date within the current operating season with zero penalty fees up to 2 hours prior to park opening. If rainfall exceeds 60 continuous minutes during operating hours, guests receive a complimentary return voucher valid for 12 months.'
  },
  {
    q: 'How does Aetheria SpeedPass work?',
    a: 'SpeedPass gives you express priority line access at our most popular attractions. Simply scan your digital pass or wristband at the dedicated SpeedPass entrance to reduce wait times by up to 80%.'
  },
  {
    q: 'What accessibility accommodations and disability passes are offered?',
    a: 'Our Guest Services desk provides the Attraction Access Program for visitors requiring assistance, alongside full wheelchair/ECV rentals, visual guidebooks, and sensory quiet rooms located in Starlight Bay and Skyward Frontier.'
  },
  {
    q: 'Are outside food and drinks permitted?',
    a: 'Guests may bring sealed bottled water, electrolyte beverages, baby formula, and small snacks. Full family picnic pavilions and secure personal locker banks are conveniently located immediately outside the main turnstiles.'
  },
  {
    q: 'What height requirements apply to children?',
    a: 'Each ride has clearly indicated minimum safety guidelines set by manufacturer specifications. We provide a complimentary Official Height Check Station at the entrance where kids receive a color-coded wristband to avoid re-measuring at every ride.'
  }
];
