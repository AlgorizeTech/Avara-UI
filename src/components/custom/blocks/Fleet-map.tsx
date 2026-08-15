"use client";

import { cn } from "@/lib/utils";
import type * as LeafletTypes from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Map as MapIcon,
  MapPin,
  Menu,
  Navigation2,
  Search,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

// ==========================================
// TYPES & INTERFACES
// ==========================================
export type FleetVariant = "default" | "minimal" | "modern";
export type FleetColor = "indigo" | "rose" | "emerald" | "zinc" | (string & {});

export interface Vehicle {
  id: string;
  location: string;
  lat: number;
  lng: number;
  status?: "active" | "idle" | "maintenance";
  speed?: string;
}

export interface FleetTrackerProps {
  fleetData: Vehicle[];
  variant?: FleetVariant;
  color?: FleetColor;
}

// ==========================================
// VARIANT & COLOR CONFIGURATION
// ==========================================
const fleetVariants: Record<FleetVariant, Record<string, string>> = {
  default: {
    wrapper:
      "flex flex-col md:flex-row bg-white dark:bg-[#09090b] border border-zinc-200/80 dark:border-zinc-800 shadow-xl rounded-2xl overflow-hidden relative",
    sidebar:
      "w-full md:w-[320px] lg:w-[380px] bg-zinc-50 dark:bg-[#121217] border-r border-zinc-200/80 dark:border-zinc-800/80 shrink-0 flex flex-col h-full z-20",
    mapContainer: "flex-1 w-full h-full relative z-10 min-w-0 overflow-hidden",
    itemActive: "bg-white dark:bg-zinc-900 border-l-[3px] shadow-sm",
    itemInactive:
      "hover:bg-zinc-100 dark:hover:bg-zinc-800/50 border-l-[3px] border-transparent",
  },
  minimal: {
    wrapper:
      "flex flex-col md:flex-row relative rounded-2xl overflow-hidden shadow-lg border border-zinc-200/80 dark:border-zinc-800",
    // Mobile: a plain full-width panel in normal flow (same as `default`).
    // md+: the floating glass panel this variant is known for.
    sidebar:
      "w-full h-full rounded-none border-0 shadow-none md:absolute md:top-4 md:left-4 md:bottom-4 md:h-auto md:w-[300px] lg:w-[340px] md:rounded-xl md:border md:shadow-2xl bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-zinc-200/80 dark:border-zinc-800 z-20 shrink-0 flex flex-col overflow-hidden",
    mapContainer: "flex-1 w-full h-full relative z-0 min-w-0 overflow-hidden rounded-2xl",
    itemActive: "bg-zinc-100 dark:bg-zinc-900 rounded-lg mx-3 my-1",
    itemInactive:
      "hover:bg-zinc-50 dark:hover:bg-zinc-900/50 rounded-lg mx-3 my-1 border border-transparent",
  },
  modern: {
    wrapper:
      "flex flex-col md:flex-row bg-zinc-100 dark:bg-zinc-950/50 border border-zinc-200/80 dark:border-zinc-800 shadow-xl rounded-2xl p-3 gap-3 relative overflow-hidden",
    sidebar:
      "w-full md:w-[320px] lg:w-[360px] bg-white dark:bg-[#09090b] rounded-xl shadow-sm border border-zinc-200/80 dark:border-zinc-800 shrink-0 flex flex-col h-full z-20 overflow-hidden",
    mapContainer:
      "flex-1 w-full h-full relative z-10 min-w-0 rounded-xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-sm",
    itemActive: "bg-zinc-50 dark:bg-zinc-900/80 border-l-[3px]",
    itemInactive:
      "hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40 border-l-[3px] border-transparent transition-colors",
  },
};

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    text: "text-primary",
    bg: "bg-primary hover:bg-primary/90 text-primary-foreground",
    border: "border-primary",
    lightBg: "bg-primary/10",
    focusRing:
      "focus-within:ring-primary/20 focus-within:border-primary/50",
    marker: "violet",
  },
  indigo: {
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-500 hover:bg-indigo-600 text-white",
    border: "border-indigo-500",
    lightBg: "bg-indigo-50 dark:bg-indigo-500/10",
    focusRing:
      "focus-within:ring-indigo-500/20 focus-within:border-indigo-500/50",
    marker: "violet",
  },
  rose: {
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-500 hover:bg-rose-600 text-white",
    border: "border-rose-500",
    lightBg: "bg-rose-50 dark:bg-rose-500/10",
    focusRing: "focus-within:ring-rose-500/20 focus-within:border-rose-500/50",
    marker: "red",
  },
  emerald: {
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500 hover:bg-emerald-600 text-white",
    border: "border-emerald-500",
    lightBg: "bg-emerald-50 dark:bg-emerald-500/10",
    focusRing:
      "focus-within:ring-emerald-500/20 focus-within:border-emerald-500/50",
    marker: "green",
  },
  zinc: {
    text: "text-zinc-900 dark:text-zinc-100",
    bg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900",
    border: "border-zinc-900 dark:border-white",
    lightBg: "bg-zinc-100 dark:bg-zinc-800/50",
    focusRing: "focus-within:ring-zinc-500/20 focus-within:border-zinc-500/50",
    marker: "black",
  },
};

// --- LEAFLET SSR SAFE LOADING ---
let L: typeof LeafletTypes | null = null;
if (typeof window !== "undefined") {
  L = require("leaflet");
  if (L) {
    // Suppress default icon issues in Next.js
    delete (L.Icon.Default.prototype as unknown as { _getIconUrl: unknown })
      ._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
  }
}

const getIcon = (colorName: string): LeafletTypes.Icon | undefined => {
  if (!L) return undefined;
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${colorName}.png`,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

function MapController({ activeVehicle }: { activeVehicle: Vehicle | null }) {
  const map = useMap();
  useEffect(() => {
    if (
      !activeVehicle ||
      typeof activeVehicle.lat !== "number" ||
      typeof activeVehicle.lng !== "number"
    )
      return;

    const target: [number, number] = [activeVehicle.lat, activeVehicle.lng];

    // On mobile the map pane is revealed in the same render that selects a
    // vehicle, so Leaflet still holds the zero size it measured while hidden.
    // flyTo divides by that size and ends up with NaN coordinates, so
    // re-measure first and skip the animation until the pane has a real box.
    map.invalidateSize({ animate: false, pan: false });
    const size = map.getSize();
    if (!size.x || !size.y) {
      map.setView(target, 15, { animate: false });
      return;
    }

    map.flyTo(target, 15, { duration: 1.5 });
  }, [activeVehicle, map]);
  return null;
}

// Leaflet only measures its container once; refit whenever the container
// resizes (docs device preview, responsive layouts). The ResizeObserver must
// come from the container's own window — a parent-realm observer never fires
// for elements inside an iframe.
function MapResizeHandler() {
  const map = useMap();
  useEffect(() => {
    const container = map.getContainer();
    const win = container.ownerDocument.defaultView ?? window;
    const FrameResizeObserver =
      (win as Window & typeof globalThis).ResizeObserver ?? ResizeObserver;
    const observer = new FrameResizeObserver(() => map.invalidateSize());
    observer.observe(container);
    return () => observer.disconnect();
  }, [map]);
  return null;
}

// --- MAIN COMPONENT ---
export default function FleetTracker({
  fleetData = [],
  variant = "default",
  color = "primary",
}: FleetTrackerProps) {
  // Custom hex injection logic
  const isCustomHex = color?.startsWith("#");
  const customVars = isCustomHex
    ? ({
        "--fleet-custom": color,
        "--fleet-custom-10": `${color}1a`,
        "--fleet-custom-20": `${color}33`,
        "--fleet-custom-50": `${color}80`,
      } as React.CSSProperties)
    : {};

  const theme = isCustomHex
    ? {
        text: "text-[var(--fleet-custom)]",
        bg: "bg-[var(--fleet-custom)] hover:brightness-110 text-white",
        border: "border-[var(--fleet-custom)]",
        lightBg: "bg-[var(--fleet-custom-10)]",
        focusRing:
          "focus-within:ring-[var(--fleet-custom-20)] focus-within:border-[var(--fleet-custom-50)]",
        marker: "black", // Fallback marker for arbitrary colors
      }
    : colorThemes[color as string] || colorThemes["primary"];

  const styles = fleetVariants[variant];

  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVehicle, setActiveVehicle] = useState<Vehicle | null>(
    fleetData[0] || null,
  );
  // Below md the list and the map share the same box, so only one is shown at a
  // time. The list is the landing view; the header/floating buttons swap them.
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(true);

  useEffect(() => {
    setMounted(true);
    const checkDark = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const filteredVehicles = fleetData.filter(
    (v) =>
      v.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusStyle = (status?: string) => {
    switch (status) {
      case "active":
        return "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10";
      case "idle":
        return "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10";
      case "maintenance":
        return "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10";
      default:
        return "text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800";
    }
  };

  if (!mounted)
    return (
      <div className="w-full h-[600px] md:h-[700px] bg-zinc-100 dark:bg-zinc-900 rounded-2xl animate-pulse border border-zinc-200 dark:border-zinc-800" />
    );

  return (
    <div
      style={customVars}
      className={cn(
        "w-full h-[600px] md:h-[700px] font-sans transition-all duration-300",
        styles.wrapper,
      )}
    >
      {/* Mobile: jump back to the vehicle list while the map is showing */}
      {!isMobileSidebarOpen && (
        <button
          type="button"
          aria-label="Show vehicle list"
          onClick={() => setIsMobileSidebarOpen(true)}
          className={cn(
            "md:hidden absolute top-4 left-4 z-[40] p-3 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800",
            theme.bg,
          )}
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* --- SIDEBAR --- */}
      <aside
        className={cn(
          styles.sidebar,
          isMobileSidebarOpen ? "flex" : "hidden md:flex",
        )}
      >
        <div className="p-5 shrink-0 border-b border-zinc-100 dark:border-zinc-800/50">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm",
                  theme.bg,
                )}
              >
                <Navigation2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-zinc-900 dark:text-white leading-tight">
                  Fleet Command
                </h2>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {filteredVehicles.length} Vehicles Active
                </p>
              </div>
            </div>
            {/* Mobile: swap the list out for the map */}
            <button
              type="button"
              aria-label="Show map"
              className="md:hidden text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <MapIcon className="w-5 h-5" />
            </button>
          </div>

          <div
            className={cn(
              "relative w-full rounded-xl flex items-center px-3 py-2.5 transition-all shadow-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800",
              theme.focusRing,
            )}
          >
            <Search className="w-4 h-4 text-zinc-400 shrink-0" />
            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none focus:outline-none text-sm ml-2 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-3">
          {filteredVehicles.map((vehicle) => {
            const isActive = activeVehicle?.id === vehicle.id;
            return (
              <div
                key={vehicle.id}
                onClick={() => {
                  setActiveVehicle(vehicle);
                  // On mobile, reveal the map so the fly-to is actually visible.
                  if (window.innerWidth < 768) setIsMobileSidebarOpen(false);
                }}
                className={cn(
                  "px-5 py-4 cursor-pointer transition-all flex items-start gap-4",
                  isActive
                    ? cn(
                        styles.itemActive,
                        variant === "default" ? theme.border : "",
                        variant === "default" ? theme.lightBg : "",
                      )
                    : styles.itemInactive,
                )}
              >
                <div
                  className={cn(
                    "p-2.5 rounded-lg shrink-0 transition-colors shadow-sm",
                    isActive
                      ? theme.bg
                      : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700",
                  )}
                >
                  <Truck
                    className={cn(
                      "w-5 h-5",
                      isActive
                        ? "text-white"
                        : "text-zinc-500 dark:text-zinc-400",
                    )}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4
                      className={cn(
                        "font-bold text-sm truncate",
                        isActive
                          ? variant === "default"
                            ? theme.text
                            : "text-zinc-900 dark:text-white"
                          : "text-zinc-700 dark:text-zinc-200",
                      )}
                    >
                      {vehicle.id}
                    </h4>
                    <span
                      className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider",
                        getStatusStyle(vehicle.status),
                      )}
                    >
                      {vehicle.status || "Active"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 mb-1.5">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <p className="text-xs truncate">{vehicle.location}</p>
                  </div>
                  {vehicle.speed && (
                    <p className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
                      Speed: {vehicle.speed}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* --- LEAFLET MAP AREA --- */}
      <main
        className={cn(
          styles.mapContainer,
          isMobileSidebarOpen ? "hidden md:block" : "block",
        )}
      >
        {L && (
          <MapContainer
            center={[40.75, -74.0]}
            zoom={13}
            className="w-full h-full z-0"
            zoomControl={false}
          >
            <TileLayer
              key={isDarkMode ? "dark" : "light"}
              attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
              url={
                isDarkMode
                  ? "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png"
                  : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              }
            />
            <MapController activeVehicle={activeVehicle} />
            <MapResizeHandler />
            {fleetData.map((vehicle) => (
              <Marker
                key={vehicle.id}
                position={[vehicle.lat, vehicle.lng]}
                icon={
                  activeVehicle?.id === vehicle.id
                    ? getIcon(theme.marker)
                    : getIcon("grey")
                }
                eventHandlers={{ click: () => setActiveVehicle(vehicle) }}
              >
                <Popup className="font-sans">
                  <div className="text-center">
                    <h3 className="font-bold text-sm text-zinc-900 m-0 leading-tight">
                      {vehicle.id}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1 m-0">
                      {vehicle.location}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </main>
    </div>
  );
}
