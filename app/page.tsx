import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
      </main>
      <footer className="border-t border-bg-elevated px-6 py-12 text-center text-sm text-ink-low">
        <p>© 2026 Nocturne. Drink responsibly.</p>
      </footer>
    </>
  );
}
