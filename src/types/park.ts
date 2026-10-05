export type RealmId = 
  | 'skyward-frontier' 
  | 'verdant-canyon' 
  | 'mythic-citadel' 
  | 'starlight-bay' 
  | 'chronos-sector';

export type ThrillLevel = 1 | 2 | 3 | 4 | 5;

export type AttractionCategory = 'roller-coaster' | 'water-ride' | 'dark-ride' | 'family' | 'thrill';

export interface Attraction {
  id: string;
  name: string;
  tagline: string;
  realmId: RealmId;
  category: AttractionCategory;
  thrillLevel: ThrillLevel;
  minHeightInches: number;
  durationMinutes: number;
  maxSpeedMph?: number;
  dropFeet?: number;
  inversions?: number;
  image: string;
  waitTimeMinutes: number;
  status: 'operating' | 'maintenance' | 'temporarily-closed';
  speedPassEligible: boolean;
  singleRider: boolean;
  accessibility: string;
  description: string;
  coordinates: { x: number; y: number }; // percentage on park map (0-100)
}

export interface ParkRealm {
  id: RealmId;
  name: string;
  themeTitle: string;
  description: string;
  color: string;
  iconName: string;
  bgGradient: string;
  highlightAttraction: string;
  mapCoords: { cx: number; cy: number; r: number };
}

export interface ParkShow {
  id: string;
  title: string;
  venue: string;
  realmId: RealmId;
  showtimes: string[];
  durationMinutes: number;
  description: string;
  image: string;
  category: 'spectacular' | 'stunt' | 'parade' | 'family';
}

export interface DiningSpot {
  id: string;
  name: string;
  cuisine: string;
  realmId: RealmId;
  description: string;
  specialty: string;
  priceRange: '$' | '$$' | '$$$';
  dietary: string[];
  image: string;
  mobileOrdering: boolean;
}

export interface TicketTier {
  id: string;
  title: string;
  badge?: string;
  price: number;
  childPrice: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface AddOnOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface OrderItem {
  tierId: string;
  date: string;
  adultCount: number;
  childCount: number;
  addOns: string[];
  totalPrice: number;
}
