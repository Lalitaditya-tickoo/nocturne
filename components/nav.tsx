"use client";
import Link from "next/link";

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-bg-deep/70 border-b border-bg-elevated">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-[family-name:var(--font-display)] italic tracking-tight text-ink-high">
          Nocturne
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-ink-mid">
          <Link href="/explore" className="hover:text-ink-high transition">Explore</Link>
          <Link href="/cities" className="hover:text-ink-high transition">Cities</Link>
          <Link href="/cocktails" className="hover:text-ink-high transition">Cocktails</Link>
          <Link href="/recommender" className="hover:text-ink-high transition">Recommender</Link>
          <Link href="/about" className="hover:text-ink-high transition">About</Link>
          <Link href="/map" className="hover:text-ink-high transition">Map</Link>
        </nav>
        <Link
          href="/explore"
          className="text-sm px-4 py-2 rounded-full bg-gold text-bg-deep hover:bg-gold-hot transition font-medium"
        >
          Start exploring
        </Link>
      </div>
    </header>
  );
}