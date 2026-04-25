"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Nav } from "@/components/nav";
import { getAllVenues } from "@/lib/queries";
import type { VenueWithCity } from "@/lib/types";
import "leaflet/dist/leaflet.css";

const AtlasMap = dynamic(() => import("@/components/atlas-map"), { ssr: false });

export default function MapPage() {
  const [venues, setVenues] = useState<VenueWithCity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllVenues().then((v) => {
      setVenues(v);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 max-w-3xl">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-6">The atlas, mapped</p>
            <h1 className="font-[family-name:var(--font-display)] text-6xl md:text-7xl text-ink-high leading-[0.95] mb-6">
              Every room, <em className="italic text-gold">on a map</em>.
            </h1>
            <p className="text-lg text-ink-mid leading-relaxed">
              All 27 venues across India, plotted. Click any pin to see the bar.
            </p>
          </div>
          {loading ? (
            <div className="aspect-[16/9] bg-bg-surface rounded-2xl animate-pulse" />
          ) : (
            <AtlasMap venues={venues} />
          )}
        </div>
      </main>
    </>
  );
}