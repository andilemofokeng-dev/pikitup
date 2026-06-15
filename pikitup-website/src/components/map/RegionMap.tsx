"use client";
import { useState } from "react";
import { APIProvider, Map, AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
const JHB = { lat: -26.22, lng: 28.01 };

const REGIONS = [
  { id: "A", label: "Johannesburg North", center: { lat: -25.97, lng: 28.01 }, color: "#1B5E20", depot: "Diepsloot & Halfway House Depot", days: "Monday & Thursday" },
  { id: "B", label: "Johannesburg East",  center: { lat: -26.15, lng: 28.19 }, color: "#0e7490", depot: "Linbro Park Area",                days: "Tuesday & Friday" },
  { id: "C", label: "Johannesburg South", center: { lat: -26.28, lng: 28.01 }, color: "#6d28d9", depot: "Robinson Deep Landfill Area",     days: "Wednesday & Saturday" },
  { id: "D", label: "Soweto",             center: { lat: -26.27, lng: 27.86 }, color: "#b45309", depot: "Goudkoppies Area",               days: "Monday & Thursday" },
  { id: "E", label: "Midrand",            center: { lat: -25.99, lng: 28.13 }, color: "#0f766e", depot: "Halfway House Depot",            days: "Tuesday & Friday" },
  { id: "F", label: "Johannesburg West",  center: { lat: -26.14, lng: 27.92 }, color: "#9d174d", depot: "Randburg Depot",                 days: "Wednesday & Saturday" },
  { id: "G", label: "Orange Farm",        center: { lat: -26.49, lng: 27.88 }, color: "#4d7c0f", depot: "Orange Farm Service Centre",     days: "Monday & Thursday" },
];

export default function RegionMap() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = REGIONS.find((r) => r.id === openId);

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        mapId="DEMO_MAP_ID"
        defaultCenter={JHB}
        defaultZoom={10}
        gestureHandling="cooperative"
        mapTypeControl
        streetViewControl
        fullscreenControl
        zoomControl
        className="w-full h-full"
        onClick={() => setOpenId(null)}
      >
        {REGIONS.map((r) => (
          <AdvancedMarker
            key={r.id}
            position={r.center}
            title={`Region ${r.id} — ${r.label}`}
            onClick={() => setOpenId(r.id === openId ? null : r.id)}
          >
            <div style={{
              backgroundColor: r.color,
              color: "#fff",
              borderRadius: "50%",
              inlineSize: 44,
              blockSize: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 18,
              border: "3px solid rgba(255,255,255,0.85)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
              cursor: "pointer",
              userSelect: "none",
            }}>
              {r.id}
            </div>
          </AdvancedMarker>
        ))}

        {open && (
          <InfoWindow
            position={open.center}
            onCloseClick={() => setOpenId(null)}
            pixelOffset={[0, -52]}
          >
            <div style={{ fontFamily: "system-ui", minWidth: 220, padding: "4px 2px" }}>
              <p style={{ fontWeight: 800, fontSize: 14, color: open.color, marginBottom: 4 }}>
                Region {open.id} — {open.label}
              </p>
              <p style={{ fontSize: 12, color: "#374151", marginBottom: 3 }}>
                🏭 {open.depot}
              </p>
              <p style={{ fontSize: 12, color: "#374151", marginBottom: 10 }}>
                🗓️ Typical collection days: <strong>{open.days}</strong>
              </p>
              <a
                href={`/collection-schedule?region=${open.id}`}
                style={{ fontSize: 12, color: "#15803d", fontWeight: 600, textDecoration: "underline" }}
              >
                Find your exact collection day →
              </a>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
}
