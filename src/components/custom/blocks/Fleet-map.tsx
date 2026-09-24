"use client";

import { cn } from "@/lib/utils";
import type * as LeafletNS from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Map as MapIcon,
  MapPin,
  Menu,
  Navigation2,
  Search,
  Truck,
} from "lucide-react";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useMap } from "react-leaflet";

// `useMap` is a hook and is safe to import statically -- react-leaflet's module body does
// not touch the DOM. Leaflet itself does, so the map components are pulled in at runtime
// (see the effect below) rather than at module scope.
//
// They are loaded as one namespace held in state, NOT as four separate React.lazy
// components: lazy children suspend *after* MapContainer has mounted, which unmounts and
// remounts the leaflet instance mid-flight and throws "Map container is being reused by
// another instance". One gate, one mount.
type ReactLeaflet = typeof import("react-leaflet");

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
  status?: "active" | "idle" | "maintenance" | (string & {});
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
      "flex flex-col md:flex-row bg-card border border-border/80 shadow-xl rounded-2xl overflow-hidden relative [&_.leaflet-control-attribution]:hidden",
    sidebar:
      "w-full md:w-[320px] lg:w-[380px] bg-muted border-r border-border/80 shrink-0 flex flex-col h-full z-20",
    mapContainer: "flex-1 w-full h-full relative z-10 min-w-0 overflow-hidden",
    itemActive: "bg-card border-l-[3px] shadow-sm",
    itemInactive:
      "hover:bg-muted border-l-[3px] border-transparent",
    header: "border-border",
    search: "shadow-sm bg-card border border-border",
  },
  minimal: {
    wrapper:
      "flex flex-col md:flex-row relative rounded-2xl overflow-hidden shadow-lg border border-border/80 [&_.leaflet-control-attribution]:hidden",
    // Mobile: a plain full-width panel in normal flow (same as `default`).
    // md+: the floating glass panel this variant is known for.
    sidebar:
      "w-full h-full rounded-none border-0 shadow-none md:absolute md:top-4 md:left-4 md:bottom-4 md:h-auto md:w-[300px] lg:w-[340px] md:rounded-xl md:border md:shadow-2xl bg-background/95 backdrop-blur-md border-border/80 z-20 shrink-0 flex flex-col overflow-hidden",
    mapContainer: "flex-1 w-full h-full relative z-0 min-w-0 overflow-hidden rounded-2xl",
    itemActive: "bg-muted rounded-lg mx-3 my-1",
    itemInactive:
      "hover:bg-muted rounded-lg mx-3 my-1 border border-transparent",
    header: "border-border",
    search: "shadow-sm bg-card border border-border",
  },
  // The same frosted recipe as GlassPanel in ProfilePageBlock: translucent
  // card surface, hairline border, inset top highlight, over an aurora the
  // wrapper draws. Kept inline so this block installs on its own.
  modern: {
    wrapper:
      "flex flex-col md:flex-row relative isolate overflow-hidden rounded-[28px] p-3 gap-3 bg-muted border border-foreground/10 shadow-xl [&_.leaflet-control-attribution]:hidden",
    sidebar:
      "w-full md:w-[320px] lg:w-[360px] shrink-0 flex flex-col h-full z-20 overflow-hidden rounded-[24px] border border-foreground/10 bg-card/55 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_24px_48px_-28px_rgba(15,23,42,0.35)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_48px_-28px_rgba(0,0,0,0.9)]",
    mapContainer:
      "flex-1 w-full h-full relative z-10 min-w-0 rounded-[24px] overflow-hidden bg-muted border border-foreground/10 shadow-[0_24px_48px_-28px_rgba(15,23,42,0.35)] dark:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.9)]",
    itemActive: "bg-card/80 rounded-2xl mx-3 my-1 shadow-sm",
    itemInactive:
      "hover:bg-card/50 rounded-2xl mx-3 my-1 border border-transparent transition-colors",
    header: "border-foreground/10",
    search: "border border-foreground/10 bg-card/50",
  },
};

/** Colours washed behind the modern variant's glass, top-left / top-right / bottom. */
const AURORA = ["#a78bfa", "#7dd3fc", "#fdba74"];

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    text: "text-primary",
    bg: "bg-primary hover:bg-primary/90 text-primary-foreground",
    border: "border-primary/30",
    lightBg: "bg-primary/10",
    focusRing:
      "focus-within:ring-primary/20 focus-within:border-primary/50",
    marker: "violet",
    glow: "color-mix(in srgb, var(--primary) 75%, transparent)",
  },
  indigo: {
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-500 hover:bg-indigo-600 text-white",
    border: "border-indigo-500",
    lightBg: "bg-indigo-50 dark:bg-indigo-500/10",
    focusRing:
      "focus-within:ring-indigo-500/20 focus-within:border-indigo-500/50",
    marker: "violet",
    glow: "rgba(129, 140, 248, 0.75)",
  },
  rose: {
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-500 hover:bg-rose-600 text-white",
    border: "border-rose-500",
    lightBg: "bg-rose-50 dark:bg-rose-500/10",
    focusRing: "focus-within:ring-rose-500/20 focus-within:border-rose-500/50",
    marker: "red",
    glow: "rgba(244, 63, 94, 0.75)",
  },
  emerald: {
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500 hover:bg-emerald-600 text-white",
    border: "border-emerald-500",
    lightBg: "bg-emerald-50 dark:bg-emerald-500/10",
    focusRing:
      "focus-within:ring-emerald-500/20 focus-within:border-emerald-500/50",
    marker: "green",
    glow: "rgba(16, 185, 129, 0.75)",
  },
  zinc: {
    text: "text-zinc-900 dark:text-zinc-100",
    bg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900",
    border: "border-zinc-900 dark:border-white",
    lightBg: "bg-zinc-100 dark:bg-zinc-800/50",
    focusRing: "focus-within:ring-zinc-500/20 focus-within:border-zinc-500/50",
    marker: "black",
    glow: "rgba(250, 250, 250, 0.85)",
  },
};

// ==========================================
// TILE SOURCES
// ==========================================
// Dark mode pulls the basemap as two layers rather than the combined
// `dark_all` sheet. Carto renders geometry and labels as separate rasters, and
// the two need opposite corrections (see MAP_STYLES) -- one flattened sheet
// cannot be graded so that the ground reads dark and the type reads bright.
const TILES = {
  light:
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  darkBase:
    "https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}{r}.png",
  darkLabels:
    "https://{s}.basemaps.cartocdn.com/rastertiles/dark_only_labels/{z}/{x}/{y}{r}.png",
} as const;

const TILE_ATTRIBUTION = '&copy; <a href="https://carto.com/">CartoDB</a>';

// ==========================================
// DARK MAP GRADING
// ==========================================
// Carto's dark basemap is drawn almost entirely between #020202 and #262626:
// land, water and roads all sit in the bottom 15% of the range, so against a
// #09090b panel the map reads as an empty box -- land measured 1.31:1 against
// the shell it sits in. The two rasters are therefore re-graded in the browser,
// in opposite directions. Geometry is lifted off black and tinted slate
// (land -> #3e4453, water -> #191b21, so land now separates from the panel at
// 2.04:1 and from water at 1.77:1); labels are pushed the other way and land at
// #bcc0cf, 5.37:1 against the ground they sit on, with their dark halo left
// below the land tone so type keeps its outline.
//
// Leaflet's own chrome -- loading backdrop, pin art, popups -- ships light-only
// and is restyled here as well. Everything is scoped to `.fleet-map-root` and
// switched by the same `isDarkMode` value that picks the tiles, so the component
// stays self-contained wherever it is dropped in.
const MAP_STYLES = `
.fleet-map-root .leaflet-container {
  background: #e8eaed;
  font-family: inherit;
}
.fleet-map-root[data-fleet-theme="dark"] .leaflet-container {
  background: #12151b;
}

.fleet-map-root[data-fleet-theme="dark"] .fleet-tiles-base {
  filter: brightness(1.28) contrast(0.82) sepia(0.38) hue-rotate(186deg)
    saturate(2.2);
}
.fleet-map-root[data-fleet-theme="dark"] .fleet-tiles-labels {
  filter: brightness(1.6) contrast(1.1) sepia(0.2) hue-rotate(190deg)
    saturate(1.3);
}

/* The pin art bakes in a black drop shadow that vanishes on a dark ground.
   Fade the shadow layer and give every pin a light rim instead. */
.fleet-map-root[data-fleet-theme="dark"] .leaflet-shadow-pane {
  opacity: 0.35;
}
.fleet-map-root .leaflet-marker-icon {
  filter: drop-shadow(0 2px 3px rgba(9, 9, 11, 0.3));
}
.fleet-map-root[data-fleet-theme="dark"] .leaflet-marker-icon {
  filter: drop-shadow(0 0 1px rgba(228, 228, 231, 0.6))
    drop-shadow(0 3px 5px rgba(0, 0, 0, 0.7));
}

/* Only filter and opacity are safe to animate on a marker -- leaflet owns the
   element's transform and positions every pin through it. */
.fleet-map-root .leaflet-marker-icon.fleet-pin-active,
.fleet-map-root[data-fleet-theme="dark"] .leaflet-marker-icon.fleet-pin-active {
  animation: fleet-pin-pulse 2.6s ease-in-out infinite;
}
@keyframes fleet-pin-pulse {
  0%,
  100% {
    filter: drop-shadow(0 0 1px rgba(228, 228, 231, 0.7))
      drop-shadow(0 0 5px var(--fleet-pin-glow))
      drop-shadow(0 3px 5px rgba(0, 0, 0, 0.55));
  }
  50% {
    filter: drop-shadow(0 0 1px rgba(228, 228, 231, 0.9))
      drop-shadow(0 0 14px var(--fleet-pin-glow))
      drop-shadow(0 3px 5px rgba(0, 0, 0, 0.55));
  }
}
@media (prefers-reduced-motion: reduce) {
  .fleet-map-root .leaflet-marker-icon.fleet-pin-active {
    animation: none;
    filter: drop-shadow(0 0 1px rgba(228, 228, 231, 0.8))
      drop-shadow(0 0 10px var(--fleet-pin-glow))
      drop-shadow(0 3px 5px rgba(0, 0, 0, 0.55));
  }
}

/* Popups are hard-coded white, down to the tip; repaint them from the theme. */
.fleet-map-root .leaflet-popup-content-wrapper {
  background: var(--popover);
  color: var(--popover-foreground);
  border: 1px solid var(--border);
}
.fleet-map-root[data-fleet-theme="dark"] .leaflet-popup-content-wrapper {
  box-shadow: 0 12px 32px -10px rgba(0, 0, 0, 0.85);
}
.fleet-map-root .leaflet-popup-tip {
  background: var(--popover);
  border: 1px solid var(--border);
}
.fleet-map-root[data-fleet-theme="dark"] .leaflet-popup-tip {
  box-shadow: none;
}
.fleet-map-root .leaflet-popup-close-button,
.fleet-map-root .leaflet-popup-close-button span {
  color: var(--muted-foreground);
}
.fleet-map-root .leaflet-popup-close-button:hover {
  color: var(--foreground);
}
`;

// --- LEAFLET DEFAULT ICON PATCH ---
// This module is client-only: it imports leaflet's stylesheet at the top level,
// which only a bundler can resolve. Load it with React.lazy (see `fleet-tracker`)
// rather than importing it into a server-rendered tree.
//
// leaflet is imported statically rather than with require(): `require` does not
// exist in an ESM bundle, so a Vite or Rollup consumer hit
// "ReferenceError: require is not defined" the moment this component mounted.
let iconDefaultsPatched = false;

/**
 * Suppress leaflet's default icon URL resolution, which assumes the images sit next to
 * the stylesheet -- bundlers rewrite that path. Runs once, after leaflet has loaded in
 * the browser, so nothing touches `window` during server prerender.
 */
function patchIconDefaults(L: typeof LeafletNS) {
  if (iconDefaultsPatched) return;
  iconDefaultsPatched = true;
  delete (L.Icon.Default.prototype as unknown as { _getIconUrl: unknown })._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
}

const getIcon = (
  L: typeof LeafletNS,
  colorName: string,
  className: string,
): LeafletNS.Icon => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${colorName}.png`,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className,
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
/**
 * Dark mode is an external system (a class on <html>), so it is read through
 * useSyncExternalStore rather than mirrored into state from an effect. The
 * server snapshot doubles as the "not mounted yet" signal.
 */
const subscribeToTheme = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
};
const getIsDark = () => document.documentElement.classList.contains("dark");
const getIsDarkOnServer = () => null;

const subscribeToNothing = () => () => {};
const useIsMounted = () =>
  useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

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

  // The pin halo is the only thing separating a marker from a dark basemap, so
  // it tracks the active colour rather than sitting on a fixed neutral.
  const rootVars = {
    ...customVars,
    "--fleet-pin-glow": isCustomHex ? `${color}bf` : theme.glow,
  } as React.CSSProperties;

  const mounted = useIsMounted();
  const isDarkMode =
    useSyncExternalStore(subscribeToTheme, getIsDark, getIsDarkOnServer) ??
    false;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVehicle, setActiveVehicle] = useState<Vehicle | null>(
    fleetData[0] || null,
  );
  // Below md the list and the map share the same box, so only one is shown at a
  // time. The list is the landing view; the header/floating buttons swap them.
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(true);

  // leaflet reaches for `window` as soon as its module body runs, so it is imported
  // here rather than at the top of the file. On the server this stays null and the
  // map subtree is skipped, which is what keeps `next build` prerender working.
  const [leaflet, setLeaflet] = useState<typeof LeafletNS | null>(null);
  const [rl, setRl] = useState<ReactLeaflet | null>(null);
  useEffect(() => {
    let cancelled = false;
    Promise.all([import("leaflet"), import("react-leaflet")]).then(([L, RL]) => {
      if (cancelled) return;
      patchIconDefaults(L);
      setLeaflet(L);
      setRl(RL);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Rebuilding an Icon swaps the underlying <img>, which restarts the active
  // pin's animation -- so they are built once per colour, not once per render.
  const icons = useMemo(() => {
    if (!leaflet) return null;
    return {
      active: getIcon(leaflet, theme.marker, "fleet-pin fleet-pin-active"),
      inactive: getIcon(leaflet, "grey", "fleet-pin"),
    };
  }, [leaflet, theme.marker]);

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
        return "text-muted-foreground bg-muted";
    }
  };

  if (!mounted)
    return (
      <div className="w-full h-[600px] md:h-[700px] bg-muted rounded-2xl animate-pulse border border-border" />
    );

  return (
    <div
      style={rootVars}
      data-fleet-theme={isDarkMode ? "dark" : "light"}
      className={cn(
        "fleet-map-root w-full h-[600px] md:h-[700px] font-sans transition-all duration-300",
        styles.wrapper,
      )}
    >
      <style>{MAP_STYLES}</style>

      {variant === "modern" && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <span
            style={{ background: AURORA[0] }}
            className="absolute -left-32 -top-32 size-[32rem] rounded-full opacity-80 blur-3xl dark:opacity-35"
          />
          <span
            style={{ background: AURORA[1] }}
            className="absolute -right-24 top-16 size-[28rem] rounded-full opacity-80 blur-3xl dark:opacity-35"
          />
          <span
            style={{ background: AURORA[2] }}
            className="absolute -bottom-40 left-1/3 size-[32rem] rounded-full opacity-70 blur-3xl dark:opacity-30"
          />
        </div>
      )}

      {/* Mobile: jump back to the vehicle list while the map is showing */}
      {!isMobileSidebarOpen && (
        <button
          type="button"
          aria-label="Show vehicle list"
          onClick={() => setIsMobileSidebarOpen(true)}
          className={cn(
            "md:hidden absolute top-4 left-4 z-[40] p-3 rounded-xl shadow-lg border border-border",
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
        <div className={cn("p-5 shrink-0 border-b", styles.header)}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm",
                  theme.bg,
                )}
              >
                <Navigation2 className={cn("w-5 h-5", theme.bg.includes("text-") ? theme.bg.split(" ").filter(c => c.startsWith("text-") || c.startsWith("dark:text-")).join(" ") : "text-primary-foreground")} />
              </div>
              <div>
                <h2 className="font-semibold text-lg text-foreground leading-tight">
                  Fleet Command
                </h2>
                <p className="text-xs font-medium text-muted-foreground">
                  {filteredVehicles.length} Vehicles Active
                </p>
              </div>
            </div>
            {/* Mobile: swap the list out for the map */}
            <button
              type="button"
              aria-label="Show map"
              className="md:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <MapIcon className="w-5 h-5" />
            </button>
          </div>

          <div
            className={cn(
              "relative w-full rounded-xl flex items-center px-3 py-2.5 transition-all",
              styles.search,
              theme.focusRing,
            )}
          >
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none focus:outline-none text-sm ml-2 text-foreground placeholder:text-muted-foreground"
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
                      : variant === "modern"
                        ? "bg-card/60 border border-foreground/10"
                        : "bg-card border border-border",
                  )}
                >
                  <Truck
                    className={cn(
                      "w-5 h-5",
                      isActive
                        ? theme.bg.includes("text-") ? theme.bg.split(" ").filter(c => c.startsWith("text-") || c.startsWith("dark:text-")).join(" ") : "text-primary-foreground"
                        : "text-muted-foreground",
                    )}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4
                      className={cn(
                        "font-semibold text-sm truncate",
                        isActive
                          ? variant === "default"
                            ? theme.text
                            : "text-foreground"
                          : "text-foreground",
                      )}
                    >
                      {vehicle.id}
                    </h4>
                    <span
                      className={cn(
                        "text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider",
                        getStatusStyle(vehicle.status),
                      )}
                    >
                      {vehicle.status || "Active"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground mb-1.5">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <p className="text-xs truncate">{vehicle.location}</p>
                  </div>
                  {vehicle.speed && (
                    <p className="text-[11px] font-medium text-muted-foreground">
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
        {leaflet && rl && icons && (
          <rl.MapContainer
            center={[40.75, -74.0]}
            zoom={13}
            className="w-full h-full z-0"
            zoomControl={false}
            attributionControl={false}
          >
            {isDarkMode ? (
              <>
                <rl.TileLayer
                  key="dark-base"
                  className="fleet-tiles-base"
                  attribution={TILE_ATTRIBUTION}
                  url={TILES.darkBase}
                  zIndex={1}
                />
                <rl.TileLayer
                  key="dark-labels"
                  className="fleet-tiles-labels"
                  url={TILES.darkLabels}
                  zIndex={2}
                />
              </>
            ) : (
              <rl.TileLayer
                key="light"
                className="fleet-tiles-base"
                attribution={TILE_ATTRIBUTION}
                url={TILES.light}
                zIndex={1}
              />
            )}
            <MapController activeVehicle={activeVehicle} />
            <MapResizeHandler />
            {fleetData.map((vehicle) => {
              const isActive = activeVehicle?.id === vehicle.id;
              return (
                <rl.Marker
                  key={vehicle.id}
                  position={[vehicle.lat, vehicle.lng]}
                  icon={isActive ? icons.active : icons.inactive}
                  // Lift the selected pin so its halo is not clipped by a
                  // neighbouring marker drawn after it.
                  zIndexOffset={isActive ? 1000 : 0}
                  eventHandlers={{ click: () => setActiveVehicle(vehicle) }}
                >
                  <rl.Popup className="font-sans">
                    <div className="text-center">
                      <h3 className="font-semibold text-sm text-foreground m-0 leading-tight">
                        {vehicle.id}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 m-0">
                        {vehicle.location}
                      </p>
                    </div>
                  </rl.Popup>
                </rl.Marker>
              );
            })}
          </rl.MapContainer>
        )}
      </main>
    </div>
  );
}
