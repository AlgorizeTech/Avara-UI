"use client";

import { cn } from "@/lib/utils";
import type * as MapLibreNS from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  Compass,
  LocateFixed,
  Maximize2,
  Minimize2,
  Minus,
  Plus,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

// ==========================================
// TYPES & INTERFACES
// ==========================================
export type MapsVariant =
  | "route-planner"
  | "property-listings"
  | "live-tracking"
  | "store-locator"
  | "fleet-dispatch"
  | "coverage-zones"
  | "heatmap"
  | "incident-monitor";

export type MapsColor =
  | "primary"
  | "indigo"
  | "rose"
  | "emerald"
  | "zinc"
  | (string & {});

export interface MapStop {
  id: string;
  label: string;
  subtitle?: string;
  detail?: string;
  lngLat: [number, number];
  tone?: "start" | "stop" | "end";
}

export interface PropertyListing {
  id: string;
  priceLabel: string;
  title: string;
  neighborhood: string;
  specs: string;
  lngLat: [number, number];
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  distance: string;
  hours: string;
  color: string;
  lngLat: [number, number];
}

export interface FleetUnit {
  id: string;
  label: string;
  driver: string;
  status: string;
  eta: string;
  lngLat: [number, number];
}

export interface CoverageZone {
  id: string;
  name: string;
  capacityLabel: string;
  color: string;
  center: [number, number];
  polygon: [number, number][];
}

export interface HeatPoint {
  lngLat: [number, number];
  intensity: number;
}

export interface IncidentPoint {
  id: string;
  title: string;
  severity: "critical" | "warning" | "info";
  time: string;
  lngLat: [number, number];
}

export interface MapsProps {
  variant?: MapsVariant;
  color?: MapsColor;
  center?: [number, number]; // [lng, lat]
  zoom?: number;
  height?: number | string;
  className?: string;
  lightStyleUrl?: string;
  darkStyleUrl?: string;
}

// ==========================================
// OPENFREEMAP / OPENMAPTILES POSITRON STYLES
// ==========================================
const OPENFREEMAP_STYLES = {
  light: "https://tiles.openfreemap.org/styles/positron",
  dark: "https://tiles.openfreemap.org/styles/dark",
} as const;

const MAP_STYLES = `
.avara-maps-root .maplibregl-map {
  font-family: inherit;
}
.avara-maps-root .maplibregl-popup-content {
  background: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: 0 12px 32px -12px rgba(15, 23, 42, 0.22);
  padding: 14px 34px 14px 14px;
  min-width: 175px;
}
.avara-maps-root[data-maps-theme="dark"] .maplibregl-popup-content {
  box-shadow: 0 16px 36px -12px rgba(0, 0, 0, 0.75);
}
.avara-maps-root .maplibregl-popup-anchor-bottom .maplibregl-popup-tip {
  border-top-color: var(--card);
}
.avara-maps-root .maplibregl-popup-anchor-top .maplibregl-popup-tip {
  border-bottom-color: var(--card);
}
.avara-maps-root .maplibregl-popup-anchor-left .maplibregl-popup-tip {
  border-right-color: var(--card);
}
.avara-maps-root .maplibregl-popup-anchor-right .maplibregl-popup-tip {
  border-left-color: var(--card);
}
.avara-maps-root .maplibregl-popup-close-button {
  top: 10px;
  right: 10px;
  width: 22px;
  height: 22px;
  border-radius: 9999px;
  background: var(--muted);
  color: var(--muted-foreground);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 1;
  border: none;
  cursor: pointer;
}
.avara-maps-root .maplibregl-popup-close-button:hover {
  color: var(--foreground);
}
.avara-maps-root .maplibregl-ctrl-attrib {
  background: rgba(255, 255, 255, 0.85) !important;
  backdrop-filter: blur(8px);
  border-radius: 9999px !important;
  padding: 2px 26px 2px 10px !important;
  margin: 0 12px 12px 0 !important;
  font-size: 10px !important;
  color: #52525b !important;
  border: 1px solid rgba(0, 0, 0, 0.06);
}
.avara-maps-root .maplibregl-ctrl-attrib.maplibregl-compact {
  padding: 0 !important;
  min-height: 24px;
}
.avara-maps-root .maplibregl-ctrl-attrib.maplibregl-compact-show {
  padding: 2px 28px 2px 10px !important;
}
.avara-maps-root[data-maps-theme="dark"] .maplibregl-ctrl-attrib {
  background: rgba(24, 24, 27, 0.85) !important;
  color: #a1a1aa !important;
  border-color: rgba(255, 255, 255, 0.08);
}
.avara-maps-root .maplibregl-ctrl-attrib a {
  color: inherit !important;
}
@keyframes avara-courier-pulse {
  0% {
    transform: scale(0.95);
    opacity: 0.75;
  }
  70% {
    transform: scale(2);
    opacity: 0;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
.avara-courier-ring {
  animation: avara-courier-pulse 2s cubic-bezier(0.22, 1, 0.36, 1) infinite;
}
`;

// ==========================================
// COLOR ACCENTS
// ==========================================
const ACCENT_HEX: Record<string, string> = {
  primary: "#2563eb",
  indigo: "#6366f1",
  rose: "#f43f5e",
  emerald: "#10b981",
  zinc: "#18181b",
};

function resolveAccentColor(color: MapsColor): string {
  if (color.startsWith("#")) return color;
  return ACCENT_HEX[color] || ACCENT_HEX.primary;
}

// ==========================================
// DEFAULT DATASETS ([lng, lat])
// ==========================================
const ROUTE_PLANNER_STOPS: MapStop[] = [
  {
    id: "start",
    label: "Start",
    subtitle: "Embarcadero Depot",
    detail: "Departed 9:12 AM",
    lngLat: [-122.4005, 37.7955],
    tone: "start",
  },
  {
    id: "market",
    label: "Market Street",
    subtitle: "Next stop",
    detail: "Arrival 9:19 AM",
    lngLat: [-122.3965, 37.7855],
    tone: "stop",
  },
  {
    id: "chase",
    label: "Chase Center",
    subtitle: "Final destination",
    detail: "ETA 9:26 AM",
    lngLat: [-122.3877, 37.768],
    tone: "end",
  },
];

const ROUTE_PLANNER_PATH: [number, number][] = [
  [-122.4005, 37.7955],
  [-122.3982, 37.7905],
  [-122.3965, 37.7855],
  [-122.3935, 37.781],
  [-122.3905, 37.7755],
  [-122.3888, 37.771],
  [-122.3877, 37.768],
];

const PROPERTY_LISTINGS: PropertyListing[] = [
  {
    id: "prop-1",
    priceLabel: "$1.28m",
    title: "Pacific Heights Townhouse",
    neighborhood: "Pacific Heights",
    specs: "3 bd · 2.5 ba · 1,840 sqft",
    lngLat: [-122.434, 37.7925],
  },
  {
    id: "prop-2",
    priceLabel: "$895k",
    title: "Mission District loft",
    neighborhood: "Mission District",
    specs: "2 bd · 2 ba · 1,210 sqft",
    lngLat: [-122.4148, 37.7599],
  },
  {
    id: "prop-3",
    priceLabel: "$1.05m",
    title: "Hayes Valley Condo",
    neighborhood: "Hayes Valley",
    specs: "2 bd · 2 ba · 1,350 sqft",
    lngLat: [-122.4245, 37.7759],
  },
  {
    id: "prop-4",
    priceLabel: "$2.4m",
    title: "Marina Modern Residence",
    neighborhood: "Marina District",
    specs: "4 bd · 3.5 ba · 2,650 sqft",
    lngLat: [-122.4368, 37.8012],
  },
  {
    id: "prop-5",
    priceLabel: "$650k",
    title: "SoMa Studio Flat",
    neighborhood: "South of Market",
    specs: "1 bd · 1 ba · 740 sqft",
    lngLat: [-122.4056, 37.7785],
  },
  {
    id: "prop-6",
    priceLabel: "$1.12m",
    title: "Noe Valley Bungalow",
    neighborhood: "Noe Valley",
    specs: "3 bd · 2 ba · 1,520 sqft",
    lngLat: [-122.4315, 37.7516],
  },
];

const LIVE_TRACKING_PATH: [number, number][] = [
  [-122.4014, 37.7897],
  [-122.4036, 37.7872],
  [-122.4061, 37.7843],
  [-122.4084, 37.7815],
  [-122.4109, 37.7784],
  [-122.4142, 37.7751],
  [-122.4176, 37.7723],
];

const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: "pearl",
    name: "Pearl pickup",
    address: "1120 NW Couch St, Portland",
    distance: "0.4 mi",
    hours: "Open until 9 PM",
    color: "#2563eb",
    lngLat: [-122.6824, 45.5236],
  },
  {
    id: "downtown",
    name: "Downtown desk",
    address: "742 SW Morrison St, Portland",
    distance: "0.9 mi",
    hours: "Open until 8 PM",
    color: "#10b981",
    lngLat: [-122.6793, 45.5189],
  },
  {
    id: "hawthorne",
    name: "Hawthorne hub",
    address: "3412 SE Hawthorne Blvd",
    distance: "2.1 mi",
    hours: "Open until 10 PM",
    color: "#f59e0b",
    lngLat: [-122.6285, 45.5122],
  },
  {
    id: "alberta",
    name: "Alberta counter",
    address: "2108 NE Alberta St, Portland",
    distance: "3.4 mi",
    hours: "Open until 7 PM",
    color: "#8b5cf6",
    lngLat: [-122.6436, 45.5589],
  },
];

const FLEET_DISPATCH_UNITS: FleetUnit[] = [
  {
    id: "bike-14",
    label: "Bike 14",
    driver: "Maya",
    status: "En route",
    eta: "6 min",
    lngLat: [-122.3365, 47.6145],
  },
  {
    id: "van-03",
    label: "Van 03",
    driver: "Liam",
    status: "Loading",
    eta: "12 min",
    lngLat: [-122.3321, 47.6062],
  },
  {
    id: "bike-22",
    label: "Bike 22",
    driver: "Aria",
    status: "Delivering",
    eta: "3 min",
    lngLat: [-122.3493, 47.6205],
  },
];

const FLEET_DISPATCH_ROUTE: [number, number][] = [
  [-122.3493, 47.6205],
  [-122.3428, 47.6172],
  [-122.3365, 47.6145],
  [-122.3342, 47.6101],
  [-122.3321, 47.6062],
];

const COVERAGE_ZONES: CoverageZone[] = [
  {
    id: "north",
    name: "North same-day",
    capacityLabel: "84%",
    color: "#6366f1",
    center: [-97.738, 30.338],
    polygon: [
      [-97.776, 30.348],
      [-97.758, 30.368],
      [-97.716, 30.365],
      [-97.698, 30.342],
      [-97.706, 30.312],
      [-97.742, 30.306],
      [-97.772, 30.318],
      [-97.776, 30.348],
    ],
  },
  {
    id: "core",
    name: "Core express",
    capacityLabel: "96%",
    color: "#10b981",
    center: [-97.742, 30.27],
    polygon: [
      [-97.778, 30.285],
      [-97.752, 30.302],
      [-97.712, 30.298],
      [-97.702, 30.274],
      [-97.714, 30.246],
      [-97.748, 30.24],
      [-97.776, 30.258],
      [-97.778, 30.285],
    ],
  },
  {
    id: "south",
    name: "South scheduled",
    capacityLabel: "71%",
    color: "#f59e0b",
    center: [-97.752, 30.208],
    polygon: [
      [-97.788, 30.222],
      [-97.762, 30.238],
      [-97.72, 30.234],
      [-97.712, 30.205],
      [-97.728, 30.182],
      [-97.768, 30.184],
      [-97.786, 30.2],
      [-97.788, 30.222],
    ],
  },
];

const NYC_HEAT_POINTS: HeatPoint[] = [
  { lngLat: [-73.9855, 40.758], intensity: 1.0 },
  { lngLat: [-73.984, 40.7549], intensity: 0.9 },
  { lngLat: [-73.9776, 40.7614], intensity: 0.85 },
  { lngLat: [-73.9857, 40.7484], intensity: 0.92 },
  { lngLat: [-73.988, 40.7425], intensity: 0.72 },
  { lngLat: [-73.9911, 40.7359], intensity: 0.8 },
  { lngLat: [-73.9866, 40.7306], intensity: 0.65 },
  { lngLat: [-73.9985, 40.7223], intensity: 0.78 },
  { lngLat: [-74.006, 40.7128], intensity: 0.88 },
  { lngLat: [-74.0088, 40.7061], intensity: 0.62 },
  { lngLat: [-73.9819, 40.7681], intensity: 0.7 },
  { lngLat: [-73.9566, 40.7736], intensity: 0.55 },
  { lngLat: [-73.9934, 40.7505], intensity: 0.86 },
  { lngLat: [-73.9942, 40.7282], intensity: 0.74 },
  { lngLat: [-73.9875, 40.7195], intensity: 0.68 },
];

const INCIDENT_POINTS: IncidentPoint[] = [
  { id: "inc-1", title: "Substation voltage drop", severity: "critical", time: "2m ago", lngLat: [-73.9845, 40.7585] },
  { id: "inc-2", title: "Fiber trunk latency", severity: "critical", time: "5m ago", lngLat: [-73.9812, 40.7542] },
  { id: "inc-3", title: "Dispatch gateway timeout", severity: "warning", time: "8m ago", lngLat: [-73.9889, 40.7518] },
  { id: "inc-4", title: "Sensor packet loss", severity: "warning", time: "11m ago", lngLat: [-73.9794, 40.7604] },
  { id: "inc-5", title: "Dock 4 offline", severity: "critical", time: "14m ago", lngLat: [-74.0062, 40.7145] },
  { id: "inc-6", title: "Route cache stale", severity: "info", time: "18m ago", lngLat: [-74.0014, 40.7182] },
  { id: "inc-7", title: "Queue depth elevated", severity: "warning", time: "22m ago", lngLat: [-73.9896, 40.7332] },
  { id: "inc-8", title: "Backup node synced", severity: "info", time: "27m ago", lngLat: [-73.9811, 40.7385] },
  { id: "inc-9", title: "Cold-chain alert", severity: "warning", time: "31m ago", lngLat: [-73.9632, 40.7695] },
  { id: "inc-10", title: "Firmware update queued", severity: "info", time: "39m ago", lngLat: [-73.998, 40.744] },
  { id: "inc-11", title: "Battery threshold low", severity: "warning", time: "44m ago", lngLat: [-73.992, 40.7255] },
  { id: "inc-12", title: "Relay health nominal", severity: "info", time: "52m ago", lngLat: [-73.9752, 40.7488] },
];

const DEFAULT_VIEWS: Record<MapsVariant, { center: [number, number]; zoom: number }> = {
  "route-planner": { center: [-122.404, 37.779], zoom: 12.2 },
  "property-listings": { center: [-122.423, 37.775], zoom: 11.8 },
  "live-tracking": { center: [-122.412, 37.781], zoom: 13.4 },
  "store-locator": { center: [-122.658, 45.526], zoom: 11.8 },
  "fleet-dispatch": { center: [-122.342, 47.614], zoom: 12.5 },
  "coverage-zones": { center: [-97.752, 30.27], zoom: 10.6 },
  heatmap: { center: [-73.989, 40.742], zoom: 11.8 },
  "incident-monitor": { center: [-73.989, 40.742], zoom: 11.6 },
};

// ==========================================
// THEME & MOUNT HELPERS
// ==========================================
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

function createDotMarkerEl(color: string, label: string, isDark: boolean) {
  const el = document.createElement("div");
  el.style.cssText = "position:relative;display:flex;align-items:center;cursor:pointer;";
  const textColor = isDark ? "#f4f4f5" : "#18181b";
  const halo = isDark ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.95)";
  el.innerHTML = `<span style="width:13px;height:13px;border-radius:9999px;background:${color};border:2.5px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:block;"></span><span style="position:absolute;left:18px;white-space:nowrap;font-size:11px;font-weight:600;color:${textColor};text-shadow:0 1px 2px ${halo},0 -1px 2px ${halo},1px 0 2px ${halo},-1px 0 2px ${halo};">${label}</span>`;
  return el;
}

function buildPopupHtml(title: string, subtitle: string, detail?: string) {
  return `<div>
    <p style="font-size:13px;font-weight:600;margin:0;line-height:1.3;">${title}</p>
    <p style="font-size:12px;opacity:0.7;margin:3px 0 0;">${subtitle}</p>
    ${detail ? `<p style="font-size:12px;font-weight:500;margin:4px 0 0;">${detail}</p>` : ""}
  </div>`;
}

// ==========================================
// MAIN MAPS COMPONENT
// ==========================================
export default function Maps({
  variant = "route-planner",
  color = "primary",
  center,
  zoom,
  height = 480,
  className,
  lightStyleUrl,
  darkStyleUrl,
}: MapsProps) {
  const mounted = useIsMounted();
  const isDark =
    useSyncExternalStore(subscribeToTheme, getIsDark, getIsDarkOnServer) ??
    false;

  const accent = resolveAccentColor(color);
  const viewDefaults = DEFAULT_VIEWS[variant] || DEFAULT_VIEWS["route-planner"];
  const initialCenter = center ?? viewDefaults.center;
  const initialZoom = zoom ?? viewDefaults.zoom;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapCanvasRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreNS.Map | null>(null);
  const courierMarkerRef = useRef<MapLibreNS.Marker | null>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing>(
    PROPERTY_LISTINGS[1],
  );
  const [selectedStore, setSelectedStore] = useState<StoreLocation>(
    STORE_LOCATIONS[0],
  );
  const [courierProgress, setCourierProgress] = useState(0.45);

  const styleUrl = isDark
    ? darkStyleUrl || OPENFREEMAP_STYLES.dark
    : lightStyleUrl || OPENFREEMAP_STYLES.light;

  // Keep only near-viewport maps mounted so pages with many maps never exceed
  // Chrome/Edge's active WebGL context limit (~8-16 contexts per tab).
  useEffect(() => {
    if (!mounted || !containerRef.current) return;
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setIsInView(entry.isIntersecting);
      },
      { rootMargin: "350px 0px" },
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [mounted]);

  // Animate courier progress for live-tracking
  useEffect(() => {
    if (variant !== "live-tracking") return;
    const timer = window.setInterval(() => {
      setCourierProgress((prev) => (prev >= 0.92 ? 0.15 : prev + 0.01));
    }, 120);
    return () => window.clearInterval(timer);
  }, [variant]);

  const courierLngLat = useMemo<[number, number]>(() => {
    const totalSegments = LIVE_TRACKING_PATH.length - 1;
    const scaled = courierProgress * totalSegments;
    const idx = Math.min(totalSegments - 1, Math.floor(scaled));
    const t = scaled - idx;
    const [lng1, lat1] = LIVE_TRACKING_PATH[idx];
    const [lng2, lat2] = LIVE_TRACKING_PATH[idx + 1];
    return [lng1 + (lng2 - lng1) * t, lat1 + (lat2 - lat1) * t];
  }, [courierProgress]);

  // Update moving courier marker + split route line smoothly
  useEffect(() => {
    if (variant !== "live-tracking") return;
    if (courierMarkerRef.current) {
      courierMarkerRef.current.setLngLat(courierLngLat);
    }
    const map = mapRef.current;
    if (map && map.isStyleLoaded()) {
      const doneSrc = map.getSource("tracking-done") as
        | MapLibreNS.GeoJSONSource
        | undefined;
      const remSrc = map.getSource("tracking-rem") as
        | MapLibreNS.GeoJSONSource
        | undefined;
      const idx = Math.min(
        LIVE_TRACKING_PATH.length - 1,
        Math.floor(courierProgress * (LIVE_TRACKING_PATH.length - 1)) + 1,
      );
      doneSrc?.setData({
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [...LIVE_TRACKING_PATH.slice(0, idx), courierLngLat],
        },
      });
      remSrc?.setData({
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [courierLngLat, ...LIVE_TRACKING_PATH.slice(idx)],
        },
      });
    }
  }, [variant, courierLngLat, courierProgress]);

  // Initialize MapLibre GL map
  useEffect(() => {
    if (!mounted || !isInView || !mapCanvasRef.current) return;
    let cancelled = false;
    let mapInstance: MapLibreNS.Map | null = null;
    let resizeObserver: ResizeObserver | null = null;
    const markers: MapLibreNS.Marker[] = [];

    import("maplibre-gl").then((mod) => {
      if (cancelled || !mapCanvasRef.current) return;
      const maplibregl =
        (mod as unknown as { default?: typeof MapLibreNS }).default ?? mod;

      if (typeof maplibregl.setWorkerUrl === "function") {
        maplibregl.setWorkerUrl(
          new URL(
            "maplibre-gl/dist/maplibre-gl-worker.mjs",
            import.meta.url,
          ).toString(),
        );
      }

      const map = new maplibregl.Map({
        container: mapCanvasRef.current,
        style: styleUrl,
        center: initialCenter,
        zoom: initialZoom,
        attributionControl: { compact: true },
      });

      mapInstance = map;
      mapRef.current = map;

      const win = mapCanvasRef.current.ownerDocument.defaultView ?? window;
      const FrameResizeObserver =
        (win as Window & typeof globalThis).ResizeObserver ?? ResizeObserver;
      resizeObserver = new FrameResizeObserver(() => {
        map.resize();
      });
      resizeObserver.observe(mapCanvasRef.current);

      map.on("load", () => {
        if (cancelled) return;

        // 1. ROUTE PLANNER
        if (variant === "route-planner") {
          map.addSource("route-line", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: { type: "LineString", coordinates: ROUTE_PLANNER_PATH },
            },
          });
          map.addLayer({
            id: "route-line-layer",
            type: "line",
            source: "route-line",
            layout: { "line-join": "round", "line-cap": "round" },
            paint: { "line-color": accent, "line-width": 4, "line-opacity": 0.92 },
          });

          ROUTE_PLANNER_STOPS.forEach((stop) => {
            const dotColor = stop.tone === "start" ? "#22c55e" : accent;
            const el = createDotMarkerEl(dotColor, stop.label, isDark);
            const popup = new maplibregl.Popup({ offset: 14 }).setHTML(
              buildPopupHtml(stop.label, stop.subtitle || "", stop.detail),
            );
            const marker = new maplibregl.Marker({ element: el, anchor: "left" })
              .setLngLat(stop.lngLat)
              .setPopup(popup)
              .addTo(map);
            markers.push(marker);
            if (stop.id === "market") {
              marker.togglePopup();
            }
          });
        }

        // 2. PROPERTY LISTINGS
        if (variant === "property-listings") {
          PROPERTY_LISTINGS.forEach((prop) => {
            const isSel = prop.id === selectedProperty.id;
            const el = document.createElement("button");
            el.type = "button";
            el.style.cssText = `padding:4px 10px;border-radius:9999px;font-size:11px;font-weight:700;white-space:nowrap;border:1px solid ${
              isSel ? accent : "rgba(0,0,0,0.12)"
            };background:${isSel ? accent : "#ffffff"};color:${
              isSel ? "#ffffff" : "#18181b"
            };box-shadow:0 4px 12px rgba(0,0,0,0.16);cursor:pointer;`;
            el.textContent = prop.priceLabel;
            el.onclick = () => {
              setSelectedProperty(prop);
              map.flyTo({ center: prop.lngLat, zoom: 13 });
            };
            const popup = new maplibregl.Popup({ offset: 14 }).setHTML(
              buildPopupHtml(prop.title, prop.specs, prop.priceLabel),
            );
            const marker = new maplibregl.Marker({ element: el })
              .setLngLat(prop.lngLat)
              .setPopup(popup)
              .addTo(map);
            markers.push(marker);
            if (isSel) marker.togglePopup();
          });
        }

        // 3. LIVE TRACKING
        if (variant === "live-tracking") {
          map.addSource("tracking-done", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: [LIVE_TRACKING_PATH[0], courierLngLat],
              },
            },
          });
          map.addSource("tracking-rem", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: LIVE_TRACKING_PATH,
              },
            },
          });
          map.addLayer({
            id: "tracking-rem-layer",
            type: "line",
            source: "tracking-rem",
            paint: {
              "line-color": "#71717a",
              "line-width": 3,
              "line-dasharray": [2, 2],
              "line-opacity": 0.75,
            },
          });
          map.addLayer({
            id: "tracking-done-layer",
            type: "line",
            source: "tracking-done",
            layout: { "line-join": "round", "line-cap": "round" },
            paint: { "line-color": accent, "line-width": 4 },
          });

          const courierEl = document.createElement("div");
          courierEl.style.cssText =
            "position:relative;width:28px;height:28px;display:flex;align-items:center;justify-content:center;";
          courierEl.innerHTML = `<span class="avara-courier-ring" style="position:absolute;inset:0;border-radius:9999px;background:${accent};opacity:0.4;"></span><span style="width:14px;height:14px;border-radius:9999px;background:${accent};border:2.5px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.35);position:relative;"></span>`;
          const cMarker = new maplibregl.Marker({ element: courierEl })
            .setLngLat(courierLngLat)
            .addTo(map);
          courierMarkerRef.current = cMarker;
          markers.push(cMarker);

          const dropEl = createDotMarkerEl("#22c55e", "Drop-off", isDark);
          const dropMarker = new maplibregl.Marker({
            element: dropEl,
            anchor: "left",
          })
            .setLngLat(LIVE_TRACKING_PATH[LIVE_TRACKING_PATH.length - 1])
            .addTo(map);
          markers.push(dropMarker);
        }

        // 4. STORE LOCATOR
        if (variant === "store-locator") {
          STORE_LOCATIONS.forEach((store) => {
            const el = createDotMarkerEl(store.color, store.name, isDark);
            el.onclick = () => {
              setSelectedStore(store);
              map.flyTo({ center: store.lngLat, zoom: 13 });
            };
            const popup = new maplibregl.Popup({ offset: 14 }).setHTML(
              buildPopupHtml(
                store.name,
                store.address,
                `${store.hours} · ${store.distance}`,
              ),
            );
            const marker = new maplibregl.Marker({ element: el, anchor: "left" })
              .setLngLat(store.lngLat)
              .setPopup(popup)
              .addTo(map);
            markers.push(marker);
            if (store.id === selectedStore.id) marker.togglePopup();
          });
        }

        // 5. FLEET DISPATCH
        if (variant === "fleet-dispatch") {
          map.addSource("dispatch-route", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: { type: "LineString", coordinates: FLEET_DISPATCH_ROUTE },
            },
          });
          map.addLayer({
            id: "dispatch-route-layer",
            type: "line",
            source: "dispatch-route",
            layout: { "line-join": "round", "line-cap": "round" },
            paint: { "line-color": accent, "line-width": 3.5 },
          });
          FLEET_DISPATCH_UNITS.forEach((unit) => {
            const el = createDotMarkerEl(accent, unit.label, isDark);
            const popup = new maplibregl.Popup({ offset: 14 }).setHTML(
              buildPopupHtml(
                `${unit.label} · ${unit.driver}`,
                `${unit.status} · ETA ${unit.eta}`,
              ),
            );
            const marker = new maplibregl.Marker({ element: el, anchor: "left" })
              .setLngLat(unit.lngLat)
              .setPopup(popup)
              .addTo(map);
            markers.push(marker);
            if (unit.id === "bike-14") marker.togglePopup();
          });
        }

        // 6. COVERAGE ZONES
        if (variant === "coverage-zones") {
          COVERAGE_ZONES.forEach((zone) => {
            map.addSource(`zone-${zone.id}`, {
              type: "geojson",
              data: {
                type: "Feature",
                properties: {},
                geometry: { type: "Polygon", coordinates: [zone.polygon] },
              },
            });
            map.addLayer({
              id: `zone-fill-${zone.id}`,
              type: "fill",
              source: `zone-${zone.id}`,
              paint: { "fill-color": zone.color, "fill-opacity": 0.16 },
            });
            map.addLayer({
              id: `zone-line-${zone.id}`,
              type: "line",
              source: `zone-${zone.id}`,
              paint: { "line-color": zone.color, "line-width": 2 },
            });
            const el = document.createElement("div");
            el.style.cssText = `padding:3px 9px;border-radius:9999px;background:#ffffff;color:#18181b;border:1.5px solid ${zone.color};font-size:11px;font-weight:700;box-shadow:0 2px 8px rgba(0,0,0,0.14);cursor:pointer;`;
            el.textContent = zone.capacityLabel;
            const popup = new maplibregl.Popup({ offset: 12 }).setHTML(
              buildPopupHtml(zone.name, `Capacity: ${zone.capacityLabel}`),
            );
            const marker = new maplibregl.Marker({ element: el })
              .setLngLat(zone.center)
              .setPopup(popup)
              .addTo(map);
            markers.push(marker);
          });
        }

        // 7. HEATMAP
        if (variant === "heatmap") {
          map.addSource("nyc-heat", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: NYC_HEAT_POINTS.map((p) => ({
                type: "Feature",
                properties: { weight: p.intensity },
                geometry: { type: "Point", coordinates: p.lngLat },
              })),
            },
          });
          map.addLayer({
            id: "nyc-heat-layer",
            type: "heatmap",
            source: "nyc-heat",
            paint: {
              "heatmap-weight": ["get", "weight"],
              "heatmap-intensity": 1.85,
              "heatmap-radius": 46,
              "heatmap-opacity": 0.88,
              "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0,
                "rgba(59,130,246,0)",
                0.25,
                "#3b82f6",
                0.5,
                "#22c55e",
                0.75,
                "#f59e0b",
                1,
                "#ef4444",
              ],
            },
          });
        }

        // 8. INCIDENT MONITOR (CLUSTER LAYER)
        if (variant === "incident-monitor") {
          map.addSource("incidents", {
            type: "geojson",
            cluster: true,
            clusterMaxZoom: 14,
            clusterRadius: 45,
            data: {
              type: "FeatureCollection",
              features: INCIDENT_POINTS.map((inc) => ({
                type: "Feature",
                properties: {
                  id: inc.id,
                  title: inc.title,
                  severity: inc.severity,
                  time: inc.time,
                },
                geometry: { type: "Point", coordinates: inc.lngLat },
              })),
            },
          });

          map.addLayer({
            id: "incident-clusters",
            type: "circle",
            source: "incidents",
            filter: ["has", "point_count"],
            paint: {
              "circle-color": [
                "step",
                ["get", "point_count"],
                "#3b82f6",
                3,
                "#f97316",
              ],
              "circle-radius": [
                "step",
                ["get", "point_count"],
                16,
                4,
                20,
              ],
              "circle-stroke-width": 2,
              "circle-stroke-color": "#ffffff",
            },
          });

          map.addLayer({
            id: "incident-cluster-count",
            type: "symbol",
            source: "incidents",
            filter: ["has", "point_count"],
            layout: {
              "text-field": "{point_count_abbreviated}",
              "text-size": 12,
            },
            paint: { "text-color": "#ffffff" },
          });

          map.addLayer({
            id: "incident-unclustered",
            type: "circle",
            source: "incidents",
            filter: ["!", ["has", "point_count"]],
            paint: {
              "circle-color": [
                "match",
                ["get", "severity"],
                "critical",
                "#ef4444",
                "warning",
                "#f59e0b",
                "#3b82f6",
              ],
              "circle-radius": 7,
              "circle-stroke-width": 2,
              "circle-stroke-color": "#ffffff",
            },
          });

          map.on("click", "incident-clusters", async (e) => {
            const features = map.queryRenderedFeatures(e.point, {
              layers: ["incident-clusters"],
            });
            const clusterId = features?.[0]?.properties?.cluster_id;
            const src = map.getSource("incidents") as
              | MapLibreNS.GeoJSONSource
              | undefined;
            if (!src || clusterId === undefined || !features?.length) return;
            const targetZoom = await src.getClusterExpansionZoom(clusterId);
            const coords = (features[0].geometry as GeoJSON.Point)
              .coordinates as [number, number];
            map.easeTo({ center: coords, zoom: targetZoom });
          });

          map.on("click", "incident-unclustered", (e) => {
            const feat = e.features?.[0];
            if (!feat) return;
            const props = feat.properties as {
              title: string;
              severity: string;
              time: string;
            };
            const coords = (feat.geometry as GeoJSON.Point).coordinates as [
              number,
              number,
            ];
            new maplibregl.Popup({ offset: 10 })
              .setLngLat(coords)
              .setHTML(
                buildPopupHtml(
                  props.title,
                  `${props.severity} · ${props.time}`,
                ),
              )
              .addTo(map);
          });
        }
      });
    });

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      markers.forEach((m) => m.remove());
      courierMarkerRef.current = null;
      mapInstance?.remove();
      mapRef.current = null;
    };
    // Re-initialize cleanly when variant, theme, accent, or visibility changes
  }, [mounted, isInView, variant, styleUrl, accent, isDark]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  if (!mounted) {
    return (
      <div
        style={{ height }}
        className={cn(
          "w-full rounded-2xl bg-muted animate-pulse border border-border",
          className,
        )}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      data-maps-theme={isDark ? "dark" : "light"}
      style={{ height: isFullscreen ? "100vh" : height }}
      className={cn(
        "avara-maps-root relative w-full rounded-2xl overflow-hidden border border-border/80 bg-card shadow-lg select-none",
        className,
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: MAP_STYLES }} />

      {/* FLOATING OVERLAY CARDS */}
      {variant === "route-planner" && (
        <div className="absolute top-3.5 left-3.5 z-10 w-[230px] rounded-2xl bg-card/95 backdrop-blur-md border border-border/80 shadow-lg p-4">
          <p className="text-sm font-semibold text-foreground leading-tight">
            Route planner
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Mission Bay dispatch
          </p>
          <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3 border-t border-border/70">
            <div>
              <p className="text-base font-semibold text-foreground leading-none">
                7m
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">ETA</p>
            </div>
            <div>
              <p className="text-base font-semibold text-foreground leading-none">
                3
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">Stops</p>
            </div>
            <div>
              <p className="text-base font-semibold text-foreground leading-none">
                3.7
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">Km</p>
            </div>
          </div>
        </div>
      )}

      {variant === "property-listings" && (
        <div className="absolute top-3.5 left-3.5 z-10 w-[240px] rounded-2xl bg-card/95 backdrop-blur-md border border-border/80 shadow-lg p-4">
          <p className="text-sm font-semibold text-foreground leading-tight">
            6 homes in San Francisco
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Click a price pin to inspect
          </p>
          <div className="mt-3 pt-3 border-t border-border/70 space-y-1.5">
            {PROPERTY_LISTINGS.slice(0, 3).map((item) => {
              const active = item.id === selectedProperty.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedProperty(item);
                    mapRef.current?.flyTo({ center: item.lngLat, zoom: 13 });
                  }}
                  className={cn(
                    "w-full flex items-center justify-between text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer",
                    active
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:bg-muted/60",
                  )}
                >
                  <span className="truncate pr-2">{item.neighborhood}</span>
                  <span className="font-semibold text-foreground shrink-0">
                    {item.priceLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {variant === "live-tracking" && (
        <div className="absolute top-3.5 left-3.5 z-10 w-[245px] rounded-2xl bg-card/95 backdrop-blur-md border border-border/80 shadow-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">
              Noah is on the way
            </span>
            <span
              style={{ color: accent }}
              className="text-xs font-semibold shrink-0"
            >
              5 min
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">Order #4128</p>
          <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              style={{
                width: `${Math.round(courierProgress * 100)}%`,
                backgroundColor: accent,
              }}
              className="h-full rounded-full transition-all duration-150"
            />
          </div>
        </div>
      )}

      {variant === "store-locator" && (
        <div className="hidden sm:block absolute top-3.5 left-3.5 z-10 w-[240px] rounded-2xl bg-card/95 backdrop-blur-md border border-border/80 shadow-lg p-4">
          <p className="text-sm font-semibold text-foreground leading-tight">
            Pickup network
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Portland · 4 locations
          </p>
          <div className="mt-3 pt-2.5 border-t border-border/70 space-y-1.5">
            {STORE_LOCATIONS.map((store) => {
              const active = store.id === selectedStore.id;
              return (
                <button
                  key={store.id}
                  type="button"
                  onClick={() => {
                    setSelectedStore(store);
                    mapRef.current?.flyTo({ center: store.lngLat, zoom: 13 });
                  }}
                  className={cn(
                    "w-full flex items-center justify-between text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer",
                    active
                      ? "bg-muted text-foreground font-medium"
                      : "text-muted-foreground hover:bg-muted/60",
                  )}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span
                      style={{ backgroundColor: store.color }}
                      className="w-2 h-2 rounded-full shrink-0"
                    />
                    <span className="truncate">{store.name}</span>
                  </span>
                  <span className="text-[11px] shrink-0">{store.distance}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {variant === "fleet-dispatch" && (
        <div className="absolute top-3.5 left-3.5 z-10 w-[235px] rounded-2xl bg-card/95 backdrop-blur-md border border-border/80 shadow-lg p-4">
          <p className="text-sm font-semibold text-foreground leading-tight">
            Fleet dispatch
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Seattle central zone
          </p>
          <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3 border-t border-border/70">
            <div>
              <p className="text-base font-semibold text-foreground leading-none">
                18
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">Active</p>
            </div>
            <div>
              <p className="text-base font-semibold text-foreground leading-none">
                92%
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">SLA</p>
            </div>
            <div>
              <p className="text-base font-semibold text-foreground leading-none">
                4
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">Holds</p>
            </div>
          </div>
        </div>
      )}

      {variant === "coverage-zones" && (
        <div className="absolute top-3.5 left-3.5 z-10 w-[225px] rounded-2xl bg-card/95 backdrop-blur-md border border-border/80 shadow-lg p-4">
          <p className="text-sm font-semibold text-foreground leading-tight">
            Coverage zones
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Austin delivery capacity
          </p>
          <div className="mt-3 pt-2.5 border-t border-border/70 space-y-2">
            {COVERAGE_ZONES.map((z) => (
              <div
                key={z.id}
                className="flex items-center justify-between text-xs"
              >
                <span className="flex items-center gap-2 text-foreground">
                  <span
                    style={{ backgroundColor: z.color }}
                    className="w-2.5 h-2.5 rounded-full"
                  />
                  {z.name}
                </span>
                <span className="font-semibold text-muted-foreground">
                  {z.capacityLabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {variant === "heatmap" && (
        <div className="absolute top-3.5 left-3.5 z-10 w-[220px] rounded-2xl bg-card/95 backdrop-blur-md border border-border/80 shadow-lg p-4">
          <p className="text-sm font-semibold text-foreground leading-tight">
            Pickup demand
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            New York · Live density
          </p>
          <div className="mt-3.5">
            <div className="h-2 w-full rounded-full bg-gradient-to-r from-blue-500 via-emerald-400 via-amber-400 to-rose-500" />
            <div className="flex justify-between text-[11px] text-muted-foreground mt-1.5">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
        </div>
      )}

      {variant === "incident-monitor" && (
        <div className="absolute top-3.5 left-3.5 z-10 w-[235px] rounded-2xl bg-card/95 backdrop-blur-md border border-border/80 shadow-lg p-4">
          <p className="text-sm font-semibold text-foreground leading-tight">
            Incident monitor
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            New York operations
          </p>
          <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3 border-t border-border/70">
            <div>
              <p className="text-base font-semibold text-foreground leading-none">
                12
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">Open</p>
            </div>
            <div>
              <p className="text-base font-semibold text-rose-500 leading-none">
                3
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">Critical</p>
            </div>
            <div>
              <p className="text-base font-semibold text-amber-500 leading-none">
                5
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">Warning</p>
            </div>
          </div>
        </div>
      )}

      {/* MAPLIBRE GL CONTROLS */}
      <div className="absolute bottom-10 right-3 z-10 flex flex-col gap-1.5">
        <div className="flex flex-col rounded-xl bg-card/95 backdrop-blur-md border border-border/80 shadow-md overflow-hidden">
          <button
            type="button"
            title="Zoom in"
            aria-label="Zoom in"
            onClick={() => mapRef.current?.zoomIn()}
            className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors cursor-pointer border-b border-border/60"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Zoom out"
            aria-label="Zoom out"
            onClick={() => mapRef.current?.zoomOut()}
            className="w-8 h-8 flex items-center justify-center text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          title="Reset bearing to north"
          aria-label="Reset bearing to north"
          onClick={() => mapRef.current?.resetNorthPitch({ duration: 400 })}
          className="w-8 h-8 rounded-xl bg-card/95 hover:bg-muted text-foreground border border-border/80 backdrop-blur-md flex items-center justify-center transition-colors shadow-md cursor-pointer"
        >
          <Compass className="w-4 h-4 text-rose-500" />
        </button>

        {variant === "store-locator" && (
          <button
            type="button"
            title="Find my location"
            aria-label="Find my location"
            onClick={() => {
              navigator.geolocation?.getCurrentPosition((pos) => {
                mapRef.current?.flyTo({
                  center: [pos.coords.longitude, pos.coords.latitude],
                  zoom: 13,
                });
              });
            }}
            className="w-8 h-8 rounded-xl bg-card/95 hover:bg-muted text-foreground border border-border/80 backdrop-blur-md flex items-center justify-center transition-colors shadow-md cursor-pointer"
          >
            <LocateFixed className="w-4 h-4" />
          </button>
        )}

        {(variant === "route-planner" ||
          variant === "fleet-dispatch" ||
          variant === "incident-monitor") && (
          <button
            type="button"
            title={isFullscreen ? "Exit fullscreen" : "Toggle fullscreen"}
            aria-label={isFullscreen ? "Exit fullscreen" : "Toggle fullscreen"}
            onClick={toggleFullscreen}
            className="w-8 h-8 rounded-xl bg-card/95 hover:bg-muted text-foreground border border-border/80 backdrop-blur-md flex items-center justify-center transition-colors shadow-md cursor-pointer"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* MAPLIBRE CANVAS */}
      <div ref={mapCanvasRef} className="w-full h-full" />
    </div>
  );
}
