"use client";

import { useEffect, useMemo, useState } from "react";
import { getAllVenues, getAllCities } from "@/lib/queries";
import type { VenueWithCity, City } from "@/lib/types";
import { VenueCard } from "@/components/venue-card";
import { Nav } from "@/components/nav";

export default function ExplorePage() {
  const [venues, setVenues] = useState<VenueWithCity[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("all");

  useEffect(() => {
    Promise.all([getAllVenues(), getAllCities()])
      .then(([v, c]) => {
        setVenues(v);
        setCities(c);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return venues.filter((v) => {
      const cityMatch = selectedCity === "all" || v.cities?.slug === selectedCity;
      const q = query.trim().toLowerCase();
      const textMatch =
        !q ||
        v.name.toLowerCase().includes(q) ||
        v.tagline?.toLowerCase().includes(q) ||
        v.neighborhood?.toLowerCase().includes(q) ||
        v.vibe_tags?.some((t) => t.toLowerCase().includes(q));
      return cityMatch && textMatch;
    });
  }, [venues, query, selectedCity]);

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 max-w-3xl">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-6">The atlas</p>
            <h1 className="font-[family-name:var(--font-display)] text-6xl md:text-7xl text-ink-high leading-[0.95] mb-6">
              Every bar <em className="italic text-gold">worth</em> your night.
            </h1>
            <p className="text-lg text-ink-mid leading-relaxed">
              A hand-curated atlas of India&apos;s most interesting cocktail bars. Search by name,
              neighborhood, or vibe. Filter by city.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="flex-1 relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, area, or vibe…"
                className="w-full bg-bg-surface border border-bg-elevated rounded-full px-6 py-4 text-ink-high placeholder:text-ink-low focus:outline-none focus:border-gold/40 transition"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              <button
                onClick={() => setSelectedCity("all")}
                className={`px-5 py-3 rounded-full text-sm whitespace-nowrap transition border ${
                  selectedCity === "all"
                    ? "bg-gold text-bg-deep border-gold font-medium"
                    : "bg-bg-surface text-ink-mid border-bg-elevated hover:border-gold/40"
                }`}
              >
                All cities
              </button>
              {cities.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCity(c.slug)}
                  className={`px-5 py-3 rounded-full text-sm whitespace-nowrap transition border ${
                    selectedCity === c.slug
                      ? "bg-gold text-bg-deep border-gold font-medium"
                      : "bg-bg-surface text-ink-mid border-bg-elevated hover:border-gold/40"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-ink-low mb-8">
            {loading ? "Loading…" : `${filtered.length} ${filtered.length === 1 ? "venue" : "venues"}`}
          </p>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-bg-surface rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-[family-name:var(--font-display)] text-4xl text-ink-mid italic mb-4">
                Nothing matches.
              </p>
              <p className="text-ink-low">Try a different search or city.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((v) => (
                <VenueCard key={v.id} venue={v} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
