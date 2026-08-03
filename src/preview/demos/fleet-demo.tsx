"use client";

import type {
  FleetColor,
  FleetVariant,
  Vehicle,
} from "@/components/custom/blocks/Fleet-map";
import dynamic from "next/dynamic";

const FleetTracker = dynamic(
  () => import("@/components/custom/blocks/Fleet-map"),
  { ssr: false },
);

const sampleFleetData: Vehicle[] = [
  {
    id: "VOL-342808",
    location: "Chelsea, NY",
    lat: 40.7465,
    lng: -74.0014,
    status: "active",
    speed: "45 mph",
  },
  {
    id: "VOL-954784",
    location: "Lincoln Harbor, NJ",
    lat: 40.7621,
    lng: -74.0205,
    status: "maintenance",
    speed: "0 mph",
  },
  {
    id: "VOL-342809",
    location: "Midtown East, NY",
    lat: 40.758,
    lng: -73.973,
    status: "active",
    speed: "22 mph",
  },
  {
    id: "VOL-343908",
    location: "Hoboken, NJ",
    lat: 40.744,
    lng: -74.0324,
    status: "idle",
    speed: "0 mph",
  },
];

export default function FleetDemo({
  variant = "modern",
  color = "primary",
}: {
  variant?: FleetVariant;
  color?: FleetColor | string;
}) {
  return (
    <div className="w-full transition-all duration-500 bg-transparent">
      {/* Key forces a re-render to gracefully destroy/recreate the Leaflet instance when variants change */}
      <FleetTracker
        key={`${variant}-${color}`}
        variant={variant}
        color={color}
        fleetData={sampleFleetData}
      />
    </div>
  );
}
