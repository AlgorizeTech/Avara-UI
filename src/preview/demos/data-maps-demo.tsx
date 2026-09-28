"use client";

import {
  DataMaps,
  type DataPoint,
} from "@/components/custom/blocks/DataMapsBlock";

const SAMPLE_DATA: DataPoint[] = [
  {
    id: "CHN",
    name: "China",
    flag: "🇨🇳",
    active: 13.7,
    activeTrend: "up",
    new: 0.1,
    newTrend: "down",
  },
  {
    id: "IND",
    name: "India",
    flag: "🇮🇳",
    active: 8.4,
    activeTrend: "up",
    new: 0.3,
    newTrend: "up",
  },
  {
    id: "USA",
    name: "United States",
    flag: "🇺🇸",
    active: 11.2,
    activeTrend: "down",
    new: 0.5,
    newTrend: "down",
  },
  {
    id: "BRA",
    name: "Brazil",
    flag: "🇧🇷",
    active: 5.1,
    activeTrend: "up",
    new: 0.2,
    newTrend: "down",
  },
  {
    id: "GBR",
    name: "United Kingdom",
    flag: "🇬🇧",
    active: 2.8,
    activeTrend: "down",
    new: 0.05,
    newTrend: "up",
  },
  {
    id: "DEU",
    name: "Germany",
    flag: "🇩🇪",
    active: 3.4,
    activeTrend: "up",
    new: 0.1,
    newTrend: "up",
  },
];

// Convert semantic color to actual hex for the map highlight if needed
const getHexForColor = (c: string) => {
  if (c.startsWith("#")) return c;
  const colors: Record<string, string> = {
    primary: "var(--primary)",
    default: "var(--primary)",
    blue: "#2563eb",
    emerald: "#10b981",
    lavender: "#9b8afb",
    rose: "#e11d48",
    violet: "#7c3aed",
  };
  return colors[c] || "var(--primary)";
};

export default function DataMapsDemo({
  variant = "fill",
  color = "primary",
  zoomable = false,
  mapId,
}: {
  variant?: "fill" | "dots";
  color?: string;
  zoomable?: boolean;
  mapId?: string;
}) {
  return (
    <div className="w-full min-h-[500px] bg-card rounded-2xl border border-border relative flex flex-col overflow-hidden">
      <DataMaps
        variant={variant}
        zoomable={zoomable}
        scrollWheelZoom={zoomable}
        dataPoints={SAMPLE_DATA}
        zoom={2}
        center={[30, 0]}
        className="flex-1"
        highlightColor={getHexForColor(color)}
        mapId={mapId}
      />
    </div>
  );
}
