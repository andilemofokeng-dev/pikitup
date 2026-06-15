"use client";
import { useState, useEffect } from "react";
import {
  APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useMap,
} from "@vis.gl/react-google-maps";
import type { Facility } from "@/lib/types";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
const JHB = { lat: -26.2041, lng: 28.0473 };

const TYPE_PIN: Record<string, { bg: string; glyph: string; border: string }> = {
  "depot":            { bg: "#1B5E20", glyph: "#ffffff", border: "#4ade80" },
  "garden-refuse":    { bg: "#2E7D32", glyph: "#ffffff", border: "#86efac" },
  "landfill":         { bg: "#78350f", glyph: "#ffffff", border: "#fbbf24" },
  "recycling":        { bg: "#0e7490", glyph: "#ffffff", border: "#67e8f9" },
  "customer-service": { bg: "#6d28d9", glyph: "#ffffff", border: "#c4b5fd" },
};

function MapController({ selectedId, facilities }: { selectedId?: string; facilities: Facility[] }) {
  const map = useMap();
  useEffect(() => {
    if (!map || !selectedId) return;
    const f = facilities.find((x) => x.id === selectedId);
    if (!f) return;
    map.panTo({ lat: f.lat, lng: f.lng });
    map.setZoom(15);
  }, [map, selectedId, facilities]);
  return null;
}

interface FacilityMapProps {
  facilities: Facility[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export default function FacilityMap({ facilities, selectedId, onSelect }: FacilityMapProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        mapId="DEMO_MAP_ID"
        defaultCenter={JHB}
        defaultZoom={11}
        gestureHandling="greedy"
        mapTypeControl
        streetViewControl
        fullscreenControl
        zoomControl
        className="w-full h-full"
      >
        <MapController selectedId={selectedId} facilities={facilities} />

        {facilities.map((f) => {
          const pin = TYPE_PIN[f.type] ?? { bg: "#6b7280", glyph: "#fff", border: "#9ca3af" };
          return (
            <AdvancedMarker
              key={f.id}
              position={{ lat: f.lat, lng: f.lng }}
              onClick={() => { onSelect(f.id); setOpenId(f.id); }}
            >
              <Pin
                background={pin.bg}
                glyphColor={pin.glyph}
                borderColor={pin.border}
                scale={f.id === selectedId ? 1.5 : 1}
              />
            </AdvancedMarker>
          );
        })}

        {openId && (() => {
          const f = facilities.find((x) => x.id === openId);
          if (!f) return null;
          const statusColor = {
            open: { bg: "#dcfce7", text: "#15803d" },
            limited: { bg: "#fef9c3", text: "#a16207" },
            closed: { bg: "#fee2e2", text: "#dc2626" },
            maintenance: { bg: "#ffedd5", text: "#ea580c" },
          }[f.status] ?? { bg: "#f3f4f6", text: "#6b7280" };

          return (
            <InfoWindow
              position={{ lat: f.lat, lng: f.lng }}
              onCloseClick={() => setOpenId(null)}
              pixelOffset={[0, -42]}
            >
              <div style={{ fontFamily: "system-ui", minWidth: 210, padding: "2px 4px" }}>
                <p style={{ fontSize: 10, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>
                  {f.type.replace(/-/g, " ")}
                </p>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 6 }}>{f.name}</p>
                <p style={{ fontSize: 12, color: "#374151", marginBottom: 3 }}>📍 {f.address}</p>
                <p style={{ fontSize: 11, color: "#6b7280", marginBottom: 2 }}>⏰ {f.hours}</p>
                <p style={{ fontSize: 11, color: "#6b7280", marginBottom: 8 }}>📞 {f.phone}</p>
                <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 999, fontSize: 10, fontWeight: 700, background: statusColor.bg, color: statusColor.text }}>
                  {f.status.charAt(0).toUpperCase() + f.status.slice(1)}
                </span>
                {f.notice && (
                  <p style={{ marginTop: 8, fontSize: 11, color: "#d97706", background: "#fef3c7", borderRadius: 8, padding: "5px 8px" }}>
                    ⚠️ {f.notice}
                  </p>
                )}
                {f.accepts.length > 0 && (
                  <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid #f3f4f6" }}>
                    <p style={{ fontSize: 10, color: "#6b7280", marginBottom: 4 }}>Accepts:</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                      {f.accepts.map((a) => (
                        <span key={a} style={{ fontSize: 10, background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0", borderRadius: 999, padding: "1px 7px" }}>{a}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </InfoWindow>
          );
        })()}
      </Map>
    </APIProvider>
  );
}
