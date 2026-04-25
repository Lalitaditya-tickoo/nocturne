"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const goldIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="width:24px;height:24px;background:#C9A961;border:3px solid #0A0907;border-radius:50%;box-shadow:0 0 0 4px rgba(201,169,97,0.3)"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export default function VenueMapInner({ lat, lng, name }: { lat: number; lng: number; name: string }) {
  return (
    <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl border border-bg-elevated">
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", background: "#141210" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={[lat, lng]} icon={goldIcon}>
          <Popup>{name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}