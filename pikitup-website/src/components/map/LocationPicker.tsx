"use client";
import { useState, useCallback } from "react";
import {
  APIProvider, Map, AdvancedMarker, Pin,
} from "@vis.gl/react-google-maps";
import type { MapMouseEvent } from "@vis.gl/react-google-maps";
import { Navigation, MapPin } from "lucide-react";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
const JHB = { lat: -26.2041, lng: 28.0473 };

interface LocationPickerProps {
  onLocationSelect: (address: string, lat: number, lng: number) => void;
}

export default function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);

  const reverseGeocode = useCallback(
    async (lat: number, lng: number) => {
      try {
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
        );
        const data = await res.json();
        const formatted: string = data.results?.[0]?.formatted_address ?? `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        setAddress(formatted);
        onLocationSelect(formatted, lat, lng);
      } catch {
        const fallback = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        setAddress(fallback);
        onLocationSelect(fallback, lat, lng);
      }
    },
    [onLocationSelect]
  );

  const handleMapClick = useCallback(
    (ev: MapMouseEvent) => {
      const ll = ev.detail.latLng;
      if (!ll) return;
      setMarker(ll);
      reverseGeocode(ll.lat, ll.lng);
    },
    [reverseGeocode]
  );

  const handleUseMyLocation = useCallback(() => {
    if (!navigator.geolocation) return;
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const pos = { lat: coords.latitude, lng: coords.longitude };
        setMarker(pos);
        reverseGeocode(pos.lat, pos.lng);
        setGpsLoading(false);
      },
      () => setGpsLoading(false),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, [reverseGeocode]);

  return (
    <APIProvider apiKey={API_KEY}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-green-600" />
            Click the map to pin the exact problem location
          </p>
          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={gpsLoading}
            className="flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50"
          >
            <Navigation className="w-3.5 h-3.5" />
            {gpsLoading ? "Locating…" : "Use My Location"}
          </button>
        </div>

        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm" style={{ blockSize: 320 }}>
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
            onClick={handleMapClick}
          >
            {marker && (
              <AdvancedMarker position={marker}>
                <Pin background="#dc2626" glyphColor="#ffffff" borderColor="#fca5a5" scale={1.2} />
              </AdvancedMarker>
            )}
          </Map>
        </div>

        {address && (
          <div className="flex items-start gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2.5">
            <MapPin className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
            <p className="text-xs text-green-800 font-medium leading-relaxed">{address}</p>
          </div>
        )}
      </div>
    </APIProvider>
  );
}
