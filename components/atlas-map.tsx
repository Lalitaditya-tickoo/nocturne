"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import type { VenueWithCity } from "@/lib/types";

const goldIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="width:20px;height:20px;background:#C9A961;border:2px solid #0A0907;border-radius:50%;box-shadow:0 0 0 3px rgba(201,169,97,0.3)"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

export default function AtlasMap({ venues }: { venues: VenueWithCity[] }) {
  const valid = venues.filter((v) => v.lat && v.lng);
  return (
    <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-bg-elevated">
      <MapContainer center={[20.5937, 78.9629]} zoom={5} scrollWheelZoom={true} style={{ height: "100%", width: "100%", background: "#141210" }}>
        <TileLayer
          attribution='&copy; OSM'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {valid.map((v) => (
          <Marker key={v.id} position={[v.lat!, v.lng!]} icon={goldIcon}>
            <Popup>
              <div style={{ minWidth: 180 }}>
                <p style={{ fontWeight: 500, marginBottom: 4 }}>{v.name}</p>
                <p style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>{v.cities?.name} · {v.neighborhood}</p>
                <Link href={`/venues/${v.slug}`} style={{ color: "#C9A961", fontSize: 12 }}>View venue →</Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}