export interface City {
  id: string;
  name: string;
  slug: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
}

export interface Venue {
  id: string;
  city_id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  address: string | null;
  neighborhood: string | null;
  lat: number | null;
  lng: number | null;
  price_band: number | null;
  phone: string | null;
  instagram: string | null;
  website: string | null;
  hero_image: string | null;
  gallery: string[] | null;
  opening_hours: string | null;
  vibe_tags: string[];
  is_featured: boolean;
  is_published: boolean;
}

export interface Cocktail {
  id: string;
  venue_id: string;
  name: string;
  slug: string;
  description: string | null;
  price_inr: number | null;
  base_spirit: string | null;
  flavor_tags: string[];
  ingredients: string[];
  image_url: string | null;
  is_signature: boolean;
}

export interface VenueWithCity extends Venue {
  cities: City | null;
}

export interface VenueWithCocktails extends VenueWithCity {
  cocktails: Cocktail[];
}