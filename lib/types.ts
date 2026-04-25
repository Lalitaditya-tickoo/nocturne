export type City = {
  id: string;
  name: string;
  slug: string;
  state: string | null;
  country: string;
  lat: number | null;
  lng: number | null;
};

export type Venue = {
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
  vibe_tags: string[];
  is_featured: boolean;
  is_published: boolean;
};

export type Cocktail = {
  id: string;
  venue_id: string;
  name: string;
  slug: string | null;
  description: string | null;
  price_inr: number | null;
  base_spirit: string | null;
  flavor_tags: string[];
  ingredients: string[];
  image_url: string | null;
  is_signature: boolean;
};

export type VenueWithCity = Venue & { cities: City | null };
export type VenueWithCocktails = Venue & { cocktails: Cocktail[]; cities: City | null };