"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { getSignatureCocktails, getAllVenues } from "@/lib/queries";
import type { Cocktail, VenueWithCity } from "@/lib/types";

type Match = {
  cocktail: Cocktail & { venue_slug: string };
  venue: VenueWithCity | undefined;
  score: number;
  reason: string;
};

const FLAVOR_SYNONYMS: Record<string, string[]> = {
  smoky: ["smoky", "smoke", "mezcal", "tobacco", "peat", "whisky", "campfire"],
  sweet: ["sweet", "sugar", "honey", "jaggery", "dessert", "rich"],
  bitter: ["bitter", "campari", "negroni", "aperitivo", "amaro"],
  citrus: ["citrus", "lime", "lemon", "yuzu", "orange", "tart", "sour"],
  floral: ["floral", "rose", "elderflower", "gulkand", "perfumed"],
  spicy: ["spicy", "ginger", "chili", "pepper", "masala", "warming", "spiced"],
  tropical: ["tropical", "coconut", "feni", "kokum", "pineapple", "mango", "fruity"],
  herbal: ["herbal", "basil", "mint", "vetiver", "curry leaf", "savory"],
  refreshing: ["refreshing", "highball", "soda", "crisp", "cooling", "summer"],
  strong: ["strong", "boozy", "stiff", "spirit forward", "old fashioned"],
};

const VIBE_SYNONYMS: Record<string, string[]> = {
  date: ["date", "romantic", "intimate", "quiet", "low light"],
  party: ["party", "loud", "social", "friday", "crowd", "club", "dj"],
  speakeasy: ["speakeasy", "hidden", "secret", "underground", "discreet"],
  rooftop: ["rooftop", "view", "skyline", "open air", "terrace"],
  rare: ["rare", "exclusive", "world's 50 best", "asia's 50 best", "famous"],
};

const CITIES = ["mumbai", "delhi", "bangalore", "goa", "hyderabad", "pune", "bandra", "lower parel", "saket", "koregaon park", "assagao", "jubilee hills"];

function scoreMatch(query: string, cocktail: Cocktail & { venue_slug: string }, venue: VenueWithCity | undefined): { score: number; reasons: string[] } {
  const q = query.toLowerCase();
  let score = 0;
  const reasons: string[] = [];

  // City match
  for (const city of CITIES) {
    if (q.includes(city)) {
      const venueCity = venue?.cities?.slug.toLowerCase() ?? "";
      const venueArea = (venue?.neighborhood ?? "").toLowerCase();
      if (venueCity === city || venueArea.includes(city)) {
        score += 10;
        reasons.push(`in ${venue?.cities?.name}`);
      }
    }
  }

  // Flavor synonyms
  for (const [flavor, words] of Object.entries(FLAVOR_SYNONYMS)) {
    const queryHasFlavor = words.some((w) => q.includes(w));
    if (!queryHasFlavor) continue;
    const tags = (cocktail.flavor_tags ?? []).map((t) => t.toLowerCase());
    const desc = (cocktail.description ?? "").toLowerCase();
    if (tags.includes(flavor) || tags.some((t) => words.includes(t)) || words.some((w) => desc.includes(w))) {
      score += 5;
      reasons.push(flavor);
    }
  }

  // Spirit
  const spirits = ["gin", "whisky", "rum", "tequila", "mezcal", "vodka", "bourbon", "feni", "arrack", "mahua", "toddy", "rye"];
  for (const spirit of spirits) {
    if (q.includes(spirit) && cocktail.base_spirit?.toLowerCase() === spirit) {
      score += 8;
      reasons.push(`${spirit}-based`);
    }
  }

  // Vibe
  for (const [vibe, words] of Object.entries(VIBE_SYNONYMS)) {
    if (words.some((w) => q.includes(w))) {
      const venueTags = (venue?.vibe_tags ?? []).map((t) => t.toLowerCase());
      if (venueTags.some((t) => t.includes(vibe) || words.some((w) => t.includes(w)))) {
        score += 4;
        reasons.push(vibe);
      }
    }
  }

  // Word overlap with description
  const descWords = (cocktail.description ?? "").toLowerCase().split(/\W+/);
  const queryWords = q.split(/\W+/).filter((w) => w.length > 3);
  const overlap = queryWords.filter((qw) => descWords.includes(qw)).length;
  score += overlap;

  return { score, reasons };
}

export default function RecommenderPage() {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState<Match[] | null>(null);
  const [thinking, setThinking] = useState(false);
  const [allCocktails, setAllCocktails] = useState<(Cocktail & { venue_slug: string })[]>([]);
  const [allVenues, setAllVenues] = useState<VenueWithCity[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    Promise.all([getSignatureCocktails(50), getAllVenues()]).then(([c, v]) => {
      setAllCocktails(c as (Cocktail & { venue_slug: string })[]);
      setAllVenues(v);
    });
    inputRef.current?.focus();
  }, []);

  function search() {
    if (!query.trim()) return;
    setThinking(true);
    setMatches(null);

    setTimeout(() => {
      const results: Match[] = allCocktails
        .map((c) => {
          const venue = allVenues.find((v) => v.slug === c.venue_slug);
          const { score, reasons } = scoreMatch(query, c, venue);
          return { cocktail: c, venue, score, reason: reasons.slice(0, 3).join(" · ") };
        })
        .filter((m) => m.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      setMatches(results);
      setThinking(false);
    }, 800);
  }

  const examples = [
    "Something smoky in Delhi",
    "A drink that tastes like monsoon",
    "Refreshing tropical in Bandra",
    "Strong and bitter for date night",
    "Floral and not too sweet in Goa",
  ];

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-28 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-wine/15 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gold/10 blur-[140px]" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-6">The recommender</p>
            <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl text-ink-high leading-[0.95] mb-6">
              What do you <em className="italic text-gold">feel like</em>?
            </h1>
            <p className="text-lg text-ink-mid max-w-2xl mx-auto">
              Describe a mood, a flavor, a memory. We&apos;ll match you with a drink and the room
              that serves it best.
            </p>
          </div>

          <div className="bg-bg-surface border border-bg-elevated rounded-2xl p-2 mb-6">
            <div className="flex flex-col md:flex-row gap-2">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && search()}
                placeholder="Tell us what you're craving…"
                className="flex-1 bg-transparent px-6 py-4 text-ink-high placeholder:text-ink-low focus:outline-none"
              />
              <button
                onClick={search}
                disabled={thinking || !query.trim()}
                className="px-8 py-4 rounded-xl bg-gold text-bg-deep font-medium hover:bg-gold-hot transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {thinking ? "Thinking…" : "Find my drink"}
              </button>
            </div>
          </div>

          {!matches && !thinking && (
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {examples.map((ex) => (
                <button
                  key={ex}
                  onClick={() => { setQuery(ex); setTimeout(search, 100); }}
                  className="text-xs text-ink-mid border border-bg-elevated px-4 py-2 rounded-full hover:border-gold/40 hover:text-ink-high transition"
                >
                  {ex}
                </button>
              ))}
            </div>
          )}

          {thinking && (
            <div className="text-center py-16">
              <p className="text-ink-mid italic font-[family-name:var(--font-display)] text-2xl animate-pulse">
                Mixing your suggestions…
              </p>
            </div>
          )}

          {matches && matches.length === 0 && (
            <div className="text-center py-16">
              <p className="font-[family-name:var(--font-display)] text-3xl text-ink-mid italic mb-4">
                Nothing quite matches.
              </p>
              <p className="text-ink-low">Try a different mood or flavor.</p>
            </div>
          )}

          {matches && matches.length > 0 && (
            <div className="space-y-4">
              <p className="text-xs tracking-[0.3em] uppercase text-gold mb-6">
                {matches.length} {matches.length === 1 ? "match" : "matches"}
              </p>
              {matches.map((m, idx) => (
                <Link
                  key={m.cocktail.id}
                  href={`/venues/${m.cocktail.venue_slug}`}
                  className="block bg-bg-surface border border-bg-elevated rounded-2xl p-6 md:p-8 hover:border-gold/40 transition group"
                >
                  <div className="flex items-start gap-6">
                    <div className="text-gold font-[family-name:var(--font-display)] text-4xl italic shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-4 mb-2 flex-wrap">
                        <h3 className="font-[family-name:var(--font-display)] text-3xl text-ink-high group-hover:text-gold transition">
                          {m.cocktail.name}
                        </h3>
                        {m.cocktail.price_inr && (
                          <span className="text-gold">₹{m.cocktail.price_inr}</span>
                        )}
                      </div>
                      {m.venue && (
                        <p className="text-sm text-ink-mid mb-3">
                          at <span className="text-gold">{m.venue.name}</span>
                          {m.venue.cities && ` · ${m.venue.cities.name}`}
                          {m.venue.neighborhood && ` · ${m.venue.neighborhood}`}
                        </p>
                      )}
                      {m.cocktail.description && (
                        <p className="text-ink-mid leading-relaxed mb-3">{m.cocktail.description}</p>
                      )}
                      {m.reason && (
                        <p className="text-xs text-ink-low italic">Matched on: {m.reason}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-16 text-center text-xs text-ink-low">
            <p>
              Built with semantic matching across flavors, spirits, and vibes.{" "}
              <Link href="/cocktails" className="text-gold hover:text-gold-hot transition">
                Browse all cocktails →
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}