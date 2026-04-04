"use client";

import FleetTracker, {
  FleetColor,
  FleetVariant,
  Vehicle,
} from "@/components/custom/blocks/Fleet-map";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { useState } from "react";

export function FleetShowcase() {
  const [variant, setVariant] = useState<FleetVariant>("modern");
  const [color, setColor] = useState<FleetColor>("indigo");

  const generateCode = (isTs: boolean) => {
    const typeDef = isTs ? " : React.JSX.Element" : "";
    const vehicleType = isTs
      ? "const fleetData: Vehicle[] = "
      : "const fleetData = ";

    return `"use client";

// Make sure this path matches your project structure!
import FleetTracker${isTs ? ", { Vehicle }" : ""} from "@/components/custom/blocks/Fleet-tracker";

export default function FleetDemo()${typeDef} {
  ${vehicleType}[
    { id: "VOL-342808", location: "Chelsea, NY", lat: 40.7465, lng: -74.0014, status: "active", speed: "45 mph" },
    { id: "VOL-954784", location: "Lincoln Harbor, NJ", lat: 40.7621, lng: -74.0205, status: "maintenance", speed: "0 mph" },
    { id: "VOL-342809", location: "Midtown East, NY", lat: 40.758, lng: -73.973, status: "active", speed: "22 mph" },
    { id: "VOL-343908", location: "Hoboken, NJ", lat: 40.744, lng: -74.0324, status: "idle", speed: "0 mph" },
  ];

  return (
    <div className="w-full">
      <FleetTracker 
        fleetData={fleetData} 
        variant="${variant}"
        color="${color}"
      />
    </div>
  );
}`;
  };

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

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col sm:flex-row gap-6 p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl flex-wrap">
        {/* Variant Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Structural Variant
          </label>
          <div className="flex bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-max border border-zinc-200 dark:border-white/5">
            {(["default", "minimal", "modern"] as FleetVariant[]).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                  variant === v
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Theme Color
          </label>
          <div className="flex items-center gap-2 h-[36px]">
            {[
              { id: "indigo", bg: "bg-indigo-500" },
              { id: "rose", bg: "bg-rose-500" },
              { id: "emerald", bg: "bg-emerald-500" },
              { id: "zinc", bg: "bg-zinc-900 dark:bg-zinc-100" },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setColor(c.id as FleetColor)}
                className={`w-6 h-6 rounded-full transition-all duration-200 outline-none flex items-center justify-center ${c.bg} ${
                  color === c.id
                    ? "ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500 scale-110"
                    : "hover:scale-110 hover:opacity-80"
                }`}
                title={c.id}
              />
            ))}
          </div>
        </div>
      </div>

      {/* --- WRAPPER WITH DYNAMIC CODE --- */}
      <ComponentPreview
        name="FleetTracker"
        tsCode={generateCode(true)}
        jsCode={generateCode(false)}
      >
        <div className="w-full transition-all duration-500 bg-transparent">
          {/* Key forces a re-render to gracefully destroy/recreate the Leaflet instance when major variants change */}
          <FleetTracker
            key={`${variant}-${color}`}
            variant={variant}
            color={color}
            fleetData={sampleFleetData}
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
