"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { VenueCard } from "@/components/venue-card";
import { getFeaturedVenues } from "@/lib/queries";
import type { VenueWithCity } from "@/lib/types";

export default function Home() {
  const [featured, setFeatured] = useState<VenueWithCity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedVenues(6).then((v) => setFeatured(v)).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />

        {/* STATS STRIP */}
        <section className="border-t border-bg-elevated">
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-gold italic">27</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-ink-low mt-2">Venues</p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-gold italic">220+</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-ink-low mt-2">Cocktails</p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-gold italic">6</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-ink-low mt-2">Cities</p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-gold italic">∞</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-ink-low mt-2">Nights ahead</p>
            </div>
          </div>
        </section>

        {/* FEATURED VENUES */}
        <section className="max-w-7xl mx-auto px-6 py-24 border-t border-bg-elevated">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">Featured tonight</p>
              <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl text-ink-high italic">
                Rooms worth the drive.
              </h2>
            </div>
            <Link href="/explore" className="text-sm text-ink-mid hover:text-gold transition">
              View all venues →
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-bg-surface rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((v) => <VenueCard key={v.id} venue={v} />)}
            </div>
          )}
        </section>

        {/* RECOMMENDER CTA */}
        <section className="max-w-5xl mx-auto px-6 py-32 text-center border-t border-bg-elevated">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-6">What&apos;s next</p>
          <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl text-ink-high leading-[0.95] mb-8">
            Tell us what you <em className="italic text-gold">feel like</em> drinking.
          </h2>
          <p className="text-lg text-ink-mid max-w-2xl mx-auto mb-10 leading-relaxed">
            Describe a mood, a flavor, a memory — and we&apos;ll match you with a drink
            and the bar that makes it best.
          </p>
          <Link href="/recommender" className="inline-block px-8 py-4 rounded-full border border-bg-elevated text-ink-high hover:bg-bg-surface transition">
            Find my drink →
          </Link>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-bg-elevated relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gold/5 blur-[120px]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <p className="font-[family-name:var(--font-display)] text-3xl md:text-4xl italic text-ink-high leading-relaxed max-w-3xl mx-auto mb-8">
            &ldquo;A great bar isn&apos;t a place. It&apos;s a feeling that ends too soon.&rdquo;
          </p>
          <p className="text-xs tracking-[0.3em] uppercase text-ink-low mb-16">— The night, every night</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-3xl mx-auto text-left mb-16">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Atlas</p>
              <ul className="space-y-2 text-sm text-ink-mid">
                <li><Link href="/explore" className="hover:text-ink-high transition">Explore</Link></li>
                <li><Link href="/cities" className="hover:text-ink-high transition">Cities</Link></li>
                <li><Link href="/cocktails" className="hover:text-ink-high transition">Cocktails</Link></li>
                <li><Link href="/map" className="hover:text-ink-high transition">Map</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Discover</p>
              <ul className="space-y-2 text-sm text-ink-mid">
                <li><Link href="/recommender" className="hover:text-ink-high transition">Recommender</Link></li>
                <li><Link href="/about" className="hover:text-ink-high transition">About</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Built in</p>
              <p className="text-sm text-ink-mid">Gurugram, India</p>
              <p className="text-sm text-ink-mid">Serving the night, globally.</p>
            </div>
          </div>
          <div className="pt-12 border-t border-bg-elevated flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="font-[family-name:var(--font-display)] text-3xl italic text-ink-high">Nocturne</p>
            <p className="text-xs tracking-[0.2em] uppercase text-ink-low">© 2026 · Drink responsibly</p>
          </div>
        </div>
      </footer>
    </>
  );
}