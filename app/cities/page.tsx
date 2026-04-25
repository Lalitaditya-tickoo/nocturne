"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllCities, getAllVenues } from "@/lib/queries";
import type { City, VenueWithCity } from "@/lib/types";
import { Nav } from "@/components/nav";

export default function CitiesPage() {
  const [cities, setCities] = useState<City[]>([]);
  const [venues, setVenues] = useState<VenueWithCity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllCities(), getAllVenues()])
      .then(([c, v]) => { setCities(c); setVenues(v); })
      .finally(() => setLoading(false));
  }, []);

  const cityCounts = cities.map((c) => ({
    ...c,
    venueCount: venues.filter((v) => v.cities?.slug === c.slug).length,
  }));

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 max-w-3xl">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-6">Cities</p>
            <h1 className="font-[family-name:var(--font-display)] text-6xl md:text-7xl text-ink-high leading-[0.95] mb-6">
              Six cities, <em className="italic text-gold">one night</em>.
            </h1>
            <p className="text-lg text-ink-mid leading-relaxed">
              India&apos;s cocktail scene has a geography. Here&apos;s where it lives.
            </p>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-48 bg-bg-surface rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cityCounts.map((c) => (
                <Link key={c.id} href={`/cities/${c.slug}`}
                  className="group bg-bg-surface border border-bg-elevated rounded-2xl p-10 hover:border-gold/40 transition-all duration-500">
                  <p className="text-xs tracking-[0.2em] uppercase text-ink-low mb-3">{c.state}</p>
                  <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-ink-high leading-none mb-6 group-hover:text-gold transition-colors">
                    {c.name}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-ink-mid">
                    <span>{c.venueCount} {c.venueCount === 1 ? "venue" : "venues"}</span>
                    <span className="ml-auto text-gold group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}