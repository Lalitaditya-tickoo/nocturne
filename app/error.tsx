"use client";
import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center">
      <div className="text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-gold mb-6">Something spilled</p>
        <h1 className="font-[family-name:var(--font-display)] text-6xl text-ink-high italic mb-8">
          Bartender&apos;s on it.
        </h1>
        <div className="flex gap-4 justify-center">
          <button onClick={reset} className="px-8 py-4 rounded-full bg-gold text-bg-deep font-medium hover:bg-gold-hot transition">
            Try again
          </button>
          <Link href="/" className="px-8 py-4 rounded-full border border-bg-elevated text-ink-high hover:bg-bg-surface transition">
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}