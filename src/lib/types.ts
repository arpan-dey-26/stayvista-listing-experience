/**
 * Domain types for the listing experience.
 *
 * These describe the *shape* of a listing, independent of how any section
 * renders it. Components receive these objects; they never own content.
 */

/** A photo as it appears in the hero mosaic, the photo tour and the lightbox. */
export interface Photo {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
  categoryId: string;
  span: 'full' | 'half';
  caption?: string;
}

export interface SimilarStay {
  id: string;
  title: string;
  priceMinor: number;
  rating: number;
  image?: string;
}

export interface PhotoCategory {
  id: string;
  name: string;
  features: string[];
  photoIds: string[];
}

export interface AmenityGroup {
  id: string;
  title: string;
  items: Amenity[];
}

export interface Amenity {
  id: string;
  label: string;
  icon: IconName;
  unavailable?: boolean;
}

export type IconName =
  | 'bed' | 'bath' | 'wifi' | 'kitchen' | 'tv' | 'air-conditioning'
  | 'pool' | 'gym' | 'parking' | 'washer' | 'workspace' | 'star'
  | 'share' | 'heart' | 'grid' | 'chevron-left' | 'chevron-right'
  | 'arrow-left' | 'close' | 'globe' | 'search' | 'menu' | 'user';

export interface RatingBreakdown {
  cleanliness: number;
  accuracy: number;
  checkIn: number;
  communication: number;
  location: number;
  value: number;
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatar?: string;
  authorMeta: string;
  rating: number;
  date: string;
  stayLength?: string;
  body: string;
}

export interface Host {
  id: string;
  name: string;
  avatar?: string;
  isSuperhost: boolean;
  reviewCount: number;
  rating: number;
  yearsHosting: number;
  responseRate?: string;
  responseTime?: string;
  bio?: string;
  coHosts?: Array<Pick<Host, 'id' | 'name' | 'avatar'>>;
}

export interface LocationInfo {
  label: string;
  latitude: number;
  longitude: number;
  description?: string;
}

export interface HouseRule {
  id: string;
  label: string;
  detail?: string;
}

export interface PriceBreakdownLine {
  id: string;
  label: string;
  amountMinor: number;
  kind?: 'base' | 'discount' | 'fee' | 'tax';
}

export interface Pricing {
  currency: 'INR' | 'USD';
  nightlyMinor: number;
  originalNightlyMinor?: number;
  minimumNights: number;
  breakdown: PriceBreakdownLine[];
  totalMinor: number;
}

export interface Highlight {
  id: string;
  icon: IconName;
  title: string;
  description: string;
}

export interface SleepingArrangement {
  id: string;
  room: string;
  detail: string;
  image?: string;
}

export interface Listing {
  id: string;
  title: string;
  subtitle: string;
  capacity: {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
  rating: number;
  reviewCount: number;
  ratingBreakdown: RatingBreakdown;
  isGuestFavourite: boolean;
  photos: Photo[];
  photoCategories: PhotoCategory[];
  heroPhotoIds: string[];
  highlights: Highlight[];
  description: string;
  sleepingArrangements: SleepingArrangement[];
  amenityGroups: AmenityGroup[];
  featuredAmenityIds: string[];
  amenityCount: number;
  reviewTags: Array<{ id: string; label: string; count: number }>;
  reviews: Review[];
  similarStays: SimilarStay[];
  host: Host;
  location: LocationInfo;
  houseRules: HouseRule[];
  pricing: Pricing;
}
