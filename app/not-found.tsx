import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-6">Lost</p>
          <h1 className="font-[family-name:var(--font-display)] text-7xl md:text-9xl text-ink-high italic mb-8">
            404
          </h1>
          <p className="text-lg text-ink-mid mb-10 max-w-md">
            That room doesn&apos;t exist. Or maybe it does, and you&apos;re not on the list.
          </p>
          <Link href="/explore" className="px-8 py-4 rounded-full bg-gold text-bg-deep font-medium hover:bg-gold-hot transition">
            Back to the atlas
          </Link>
        </div>
      </main>
    </>
  );
}