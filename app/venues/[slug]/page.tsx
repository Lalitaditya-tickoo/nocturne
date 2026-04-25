"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getVenueBySlug } from "@/lib/queries";
import type { VenueWithCocktails } from "@/lib/types";
import { Nav } from "@/components/nav";
import { VenueMap } from "@/components/venue-map";

export default function VenuePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [venue, setVenue] = useState<VenueWithCocktails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    getVenueBySlug(slug).then((v) => setVenue(v)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <>
      <Nav />
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <p className="text-ink-low animate-pulse">Loading…</p>
      </div>
    </>
  );

  if (!venue) return (
    <>
      <Nav />
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <p className="text-ink-low">Venue not found.</p>
      </div>
    </>
  );

  const price = venue.price_band ? "₹".repeat(venue.price_band) : null;
  const signatures = venue.cocktails?.filter((c) => c.is_signature) ?? [];

  return (
    <>
      <Nav />
      <main className="min-h-screen">
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
          {venue.hero_image && (
            <Image src={venue.hero_image} alt={venue.name} fill priority className="object-cover" sizes="100vw" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/40 to-bg-deep/60" />
          <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-16 pt-32">
            <Link href="/explore" className="text-xs tracking-[0.2em] uppercase text-ink-mid hover:text-gold transition mb-6 inline-flex items-center gap-2">
              ← Back to atlas
            </Link>
            <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-gold mb-4">
              {venue.cities && <span>{venue.cities.name}</span>}
              {venue.neighborhood && <><span className="text-ink-low">·</span><span className="text-ink-mid">{venue.neighborhood}</span></>}
              {price && <><span className="text-ink-low">·</span><span className="text-ink-mid">{price}</span></>}
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-6xl md:text-8xl text-ink-high leading-[0.95]">{venue.name}</h1>
            {venue.tagline && <p className="mt-4 text-xl text-ink-mid italic max-w-3xl">{venue.tagline}</p>}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-xs tracking-[0.3em] uppercase text-gold mb-6">About</h2>
              {venue.description && <p className="text-lg text-ink-high leading-relaxed mb-8">{venue.description}</p>}
              {venue.vibe_tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-10">
                  {venue.vibe_tags.map((tag) => (
                    <span key={tag} className="text-xs tracking-wider uppercase text-ink-mid px-4 py-2 border border-bg-elevated rounded-full">{tag}</span>
                  ))}
                </div>
              )}
            </div>
            <aside className="bg-bg-surface border border-bg-elevated rounded-2xl p-6 h-fit">
              <h3 className="text-xs tracking-[0.3em] uppercase text-gold mb-6">Details</h3>
              <dl className="space-y-5 text-sm">
                {venue.address && (
                  <div>
                    <dt className="text-ink-low text-xs uppercase tracking-wider mb-1">Address</dt>
                    <dd className="text-ink-high leading-relaxed">{venue.address}</dd>
                  </div>
                )}
                {venue.instagram && (
                  <div>
                    <dt className="text-ink-low text-xs uppercase tracking-wider mb-1">Instagram</dt>
                    <dd><a href={`https://instagram.com/${venue.instagram}`} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-hot transition">@{venue.instagram}</a></dd>
                  </div>
                )}
              </dl>
            </aside>
          </div>
        </section>

        {venue.lat && venue.lng && (
          <section className="max-w-7xl mx-auto px-6 py-20 border-t border-bg-elevated">
            <h2 className="text-xs tracking-[0.3em] uppercase text-gold mb-4">Find it</h2>
            <p className="font-[family-name:var(--font-display)] text-5xl text-ink-high italic mb-12">The room is here.</p>
            <VenueMap lat={venue.lat} lng={venue.lng} name={venue.name} />
            {venue.address && (
              <p className="mt-6 text-ink-mid text-sm">{venue.address}</p>
            )}
          </section>
        )}

        {signatures.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-20 border-t border-bg-elevated">
            <h2 className="text-xs tracking-[0.3em] uppercase text-gold mb-4">Signature drinks</h2>
            <p className="font-[family-name:var(--font-display)] text-5xl text-ink-high italic mb-12">What to order.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {signatures.map((c) => (
                <div key={c.id} className="bg-bg-surface border border-bg-elevated rounded-2xl p-6 hover:border-gold/40 transition">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-[family-name:var(--font-display)] text-2xl text-ink-high">{c.name}</h3>
                    {c.price_inr && <span className="text-sm text-gold shrink-0">₹{c.price_inr}</span>}
                  </div>
                  {c.description && <p className="text-ink-mid text-sm leading-relaxed mb-4">{c.description}</p>}
                  {c.flavor_tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {c.flavor_tags.map((t) => (
                        <span key={t} className="text-[10px] tracking-wider uppercase text-ink-low px-2 py-1 border border-bg-elevated rounded-full">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
