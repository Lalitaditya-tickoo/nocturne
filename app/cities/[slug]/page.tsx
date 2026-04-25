"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getCityBySlug, getVenuesByCity } from "@/lib/queries";
import type { City, VenueWithCity } from "@/lib/types";
import { Nav } from "@/components/nav";
import { VenueCard } from "@/components/venue-card";

const CITY_THEMES: Record<string, { gradient: string; accent: string; tagline: string }> = {
  mumbai: { gradient: "from-orange-900/30 via-wine/20 to-bg-deep", accent: "text-orange-300", tagline: "City of dreams. City of cocktails." },
  delhi: { gradient: "from-amber-900/30 via-wine/20 to-bg-deep", accent: "text-amber-300", tagline: "Where India's best bars are made." },
  bangalore: { gradient: "from-emerald-900/30 via-bg-elevated to-bg-deep", accent: "text-emerald-300", tagline: "The pub city, refined." },
  goa: { gradient: "from-blue-900/30 via-wine/15 to-bg-deep", accent: "text-blue-300", tagline: "Feni, fairy lights, and the sea." },
  hyderabad: { gradient: "from-rose-900/30 via-wine/20 to-bg-deep", accent: "text-rose-300", tagline: "Pearls, biryani, and bitters." },
  pune: { gradient: "from-purple-900/30 via-wine/15 to-bg-deep", accent: "text-purple-300", tagline: "Koregaon Park's quiet revolution." },
};

export default function CityPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [city, setCity] = useState<City | null>(null);
  const [venues, setVenues] = useState<VenueWithCity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    Promise.all([getCityBySlug(slug), getVenuesByCity(slug)])
      .then(([c, v]) => { setCity(c); setVenues(v); })
      .finally(() => setLoading(false));
  }, [slug]);

  const theme = CITY_THEMES[slug] || CITY_THEMES.mumbai;

  return (
    <>
      <Nav />
      <main className="min-h-screen pb-24">
        <section className={`relative pt-40 pb-20 px-6 bg-gradient-to-b ${theme.gradient} overflow-hidden`}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-[family-name:var(--font-display)] text-[20rem] md:text-[30rem] leading-none italic text-ink-high/[0.03] whitespace-nowrap pointer-events-none select-none">
              {city?.name ?? ""}
            </div>
          </div>
          <div className="relative max-w-7xl mx-auto">
            <Link href="/cities" className="text-xs tracking-[0.2em] uppercase text-ink-mid hover:text-gold transition mb-8 inline-flex items-center gap-2">
              ← All cities
            </Link>
            {loading ? (
              <div className="h-32 bg-bg-surface rounded-2xl animate-pulse max-w-md" />
            ) : city ? (
              <>
                <p className={`text-xs tracking-[0.3em] uppercase ${theme.accent} mb-6`}>{city.state}</p>
                <h1 className="font-[family-name:var(--font-display)] text-7xl md:text-9xl text-ink-high leading-[0.9] mb-6">
                  {city.name}
                </h1>
                <p className="text-xl md:text-2xl text-ink-mid italic font-[family-name:var(--font-display)] mb-2">
                  {theme.tagline}
                </p>
                <p className="text-sm text-ink-low">
                  {venues.length} {venues.length === 1 ? "venue" : "venues"} · curated
                </p>
              </>
            ) : null}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pt-16">
          {!loading && venues.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {venues.map((v) => <VenueCard key={v.id} venue={v} />)}
            </div>
          )}
        </section>
      </main>
    </>
  );
}