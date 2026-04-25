"use client";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const Map = dynamic(() => import("./venue-map-inner"), {
  ssr: false,
  loading: () => (
    <div className="aspect-[16/9] w-full bg-bg-elevated rounded-2xl flex items-center justify-center">
      <p className="text-ink-mid italic font-[family-name:var(--font-display)] text-xl">Loading map…</p>
    </div>
  ),
});

export function VenueMap({ lat, lng, name }: { lat: number; lng: number; name: string }) {
  return <Map lat={lat} lng={lng} name={name} />;
}