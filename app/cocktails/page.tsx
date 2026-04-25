"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { getSignatureCocktails } from "@/lib/queries";
import type { Cocktail } from "@/lib/types";

type CocktailWithVenue = Cocktail & { venue_slug: string };

export default function CocktailsPage() {
  const [cocktails, setCocktails] = useState<CocktailWithVenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    getSignatureCocktails(50).then((c) => {
      setCocktails(c as CocktailWithVenue[]);
      setLoading(false);
    });
  }, []);

  const spirits = useMemo(() => {
    const s = new Set(cocktails.map((c) => c.base_spirit).filter(Boolean) as string[]);
    return Array.from(s).sort();
  }, [cocktails]);

  const filtered = useMemo(() => {
    if (filter === "all") return cocktails;
    return cocktails.filter((c) => c.base_spirit === filter);
  }, [cocktails, filter]);

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 max-w-3xl">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-6">The drinks</p>
            <h1 className="font-[family-name:var(--font-display)] text-6xl md:text-7xl text-ink-high leading-[0.95] mb-6">
              Every signature, <em className="italic text-gold">every spirit</em>.
            </h1>
            <p className="text-lg text-ink-mid leading-relaxed">
              Eighteen signature drinks from India&apos;s best cocktail rooms. Filter by spirit
              to find your kind of night.
            </p>
          </div>

          <div className="flex gap-2 flex-wrap mb-10">
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-3 rounded-full text-sm whitespace-nowrap transition border ${
                filter === "all"
                  ? "bg-gold text-bg-deep border-gold font-medium"
                  : "bg-bg-surface text-ink-mid border-bg-elevated hover:border-gold/40"
              }`}
            >
              All spirits
            </button>
            {spirits.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-5 py-3 rounded-full text-sm whitespace-nowrap transition border capitalize ${
                  filter === s
                    ? "bg-gold text-bg-deep border-gold font-medium"
                    : "bg-bg-surface text-ink-mid border-bg-elevated hover:border-gold/40"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <p className="text-sm text-ink-low mb-8">
            {loading ? "Loading…" : `${filtered.length} ${filtered.length === 1 ? "drink" : "drinks"}`}
          </p>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 bg-bg-surface rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((c) => (
                <Link
                  key={c.id}
                  href={`/venues/${c.venue_slug}`}
                  className="group bg-bg-surface border border-bg-elevated rounded-2xl p-6 hover:border-gold/40 transition"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-[family-name:var(--font-display)] text-2xl text-ink-high group-hover:text-gold transition-colors">
                      {c.name}
                    </h3>
                    {c.price_inr && (
                      <span className="text-sm text-gold shrink-0">₹{c.price_inr}</span>
                    )}
                  </div>
                  {c.description && (
                    <p className="text-ink-mid text-sm leading-relaxed mb-4 line-clamp-3">{c.description}</p>
                  )}
                  <div className="flex items-center justify-between mt-4">
                    {c.base_spirit && (
                      <span className="text-[10px] tracking-[0.2em] uppercase text-ink-low">
                        {c.base_spirit}
                      </span>
                    )}
                    <span className="text-xs text-gold opacity-0 group-hover:opacity-100 transition">
                      View venue →
                    </span>
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