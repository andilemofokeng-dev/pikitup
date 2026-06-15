"use client";
import { useState } from "react";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
const HEAD_OFFICE = { lat: -26.20444, lng: 28.04280 }; // 66 President St, JHB CBD

export default function ContactMap() {
  const [showInfo, setShowInfo] = useState(true);

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        mapId="DEMO_MAP_ID"
        defaultCenter={HEAD_OFFICE}
        defaultZoom={16}
        gestureHandling="cooperative"
        streetViewControl
        mapTypeControl
        fullscreenControl
        zoomControl
        className="w-full h-full"
      >
        <AdvancedMarker
          position={HEAD_OFFICE}
          onClick={() => setShowInfo(true)}
          title="Pikitup Head Office"
        >
          <Pin background="#1B5E20" glyphColor="#ffffff" borderColor="#4ade80" scale={1.4} />
        </AdvancedMarker>

        {showInfo && (
          <InfoWindow
            position={HEAD_OFFICE}
            onCloseClick={() => setShowInfo(false)}
            pixelOffset={[0, -52]}
          >
            <div style={{ fontFamily: "system-ui", padding: "4px 2px", minWidth: 200 }}>
              <p style={{ fontWeight: 700, fontSize: 14, color: "#1B5E20", marginBottom: 5 }}>
                Pikitup Johannesburg (SOC) Ltd
              </p>
              <p style={{ fontSize: 12, color: "#374151", marginBottom: 4 }}>
                📍 66 President Street, Johannesburg, 2000
              </p>
              <p style={{ fontSize: 11, color: "#6b7280", marginBottom: 2 }}>
                📞 0860 562874 &nbsp;|&nbsp; 011 375 5555
              </p>
              <p style={{ fontSize: 11, color: "#6b7280", marginBottom: 2 }}>
                💬 WhatsApp: 082 779 1361
              </p>
              <p style={{ fontSize: 11, color: "#6b7280" }}>
                ⏰ Mon–Fri: 07:30–16:30
              </p>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
}
