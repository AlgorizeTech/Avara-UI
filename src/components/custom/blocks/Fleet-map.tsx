"use client";

import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

// 1. SAFELY LOAD LEAFLET ONLY IN THE BROWSER
let L: any = null;
let activeIcon: any = null;
let defaultIcon: any = null;

if (typeof window !== "undefined") {
  // We use require() here so Next.js doesn't try to parse it on the server
  L = require("leaflet");

  // Fix Leaflet's default icon path issues in Next.js
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });

  activeIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  defaultIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
}

function MapController({ activeVehicle }: { activeVehicle: any }) {
  const map = useMap();
  useEffect(() => {
    // Defensive check: Ensure activeVehicle AND its coordinates exist
    if (
      activeVehicle &&
      typeof activeVehicle.lat === "number" &&
      typeof activeVehicle.lng === "number"
    ) {
      map.flyTo([activeVehicle.lat, activeVehicle.lng], 14, {
        duration: 1.5,
      });
    }
  }, [activeVehicle, map]);
  return null;
}

export default function FleetMap({
  fleetData = [],
  activeVehicle,
  setActiveVehicle,
}: any) {
  // 2. PREVENT SERVER RENDER ENTIRELY
  // If we are on the server, or Leaflet failed to load, return nothing.
  if (typeof window === "undefined" || !L) return null;

  const centerLat = activeVehicle?.lat ?? 0;
  const centerLng = activeVehicle?.lng ?? 0;

  if (typeof centerLat !== "number" || typeof centerLng !== "number")
    return null;

  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={14}
      className="w-full h-full z-0"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapController activeVehicle={activeVehicle} />

      {fleetData.map((vehicle: any) => {
        if (
          typeof vehicle?.lat !== "number" ||
          typeof vehicle?.lng !== "number"
        )
          return null;

        return (
          <Marker
            key={vehicle.id}
            position={[vehicle.lat, vehicle.lng]}
            icon={activeVehicle?.id === vehicle.id ? activeIcon : defaultIcon}
            eventHandlers={{
              click: () => setActiveVehicle(vehicle),
            }}
          >
            <Popup className="font-sans">
              <h3 className="font-bold text-sm text-zinc-900 m-0">
                {vehicle.id}
              </h3>
              <p className="text-xs text-zinc-500 mt-1 m-0">
                {vehicle.location}
              </p>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
