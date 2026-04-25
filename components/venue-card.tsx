import Link from "next/link";
import Image from "next/image";
import type { VenueWithCity } from "@/lib/types";

export function VenueCard({ venue }: { venue: VenueWithCity }) {
  const price = venue.price_band ? "₹".repeat(venue.price_band) : null;

  return (
    <Link
      href={`/venues/${venue.slug}`}
      className="group block bg-bg-surface border border-bg-elevated rounded-2xl overflow-hidden hover:border-gold/40 transition-all duration-700 relative"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-bg-elevated">
        {venue.hero_image && (
          <Image
            src={venue.hero_image}
            alt={venue.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/0 via-bg-deep/0 to-bg-deep/0 group-hover:from-wine/30 group-hover:via-bg-deep/0 group-hover:to-bg-deep/0 transition-all duration-700 mix-blend-overlay" />
        {venue.is_featured && (
          <div className="absolute top-4 left-4 px-3 py-1 text-[10px] tracking-[0.2em] uppercase bg-gold text-bg-deep rounded-full font-medium">
            Featured
          </div>
        )}
      </div>

      <div className="p-6 relative">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="font-[family-name:var(--font-display)] text-2xl text-ink-high leading-tight group-hover:text-gold transition-colors duration-500">
            {venue.name}
          </h3>
          {price && <span className="text-xs text-ink-low mt-2 shrink-0">{price}</span>}
        </div>

        {venue.tagline && (
          <p className="text-sm text-ink-mid italic mb-4 leading-relaxed">{venue.tagline}</p>
        )}

        <div className="flex items-center gap-3 text-xs tracking-[0.15em] uppercase text-ink-low">
          <span>{venue.cities?.name}</span>
          {venue.neighborhood && (
            <>
              <span>·</span>
              <span>{venue.neighborhood}</span>
            </>
          )}
          <span className="ml-auto text-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500">→</span>
        </div>

        {venue.vibe_tags && venue.vibe_tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-bg-elevated">
            {venue.vibe_tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-wider uppercase text-ink-mid px-2 py-1 border border-bg-elevated rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}