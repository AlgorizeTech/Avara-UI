---
title: "Shadcn Fleet Tracker Map"
description: "An interactive, responsive fleet management dashboard featuring a synchronized sidebar and live map integration using React Leaflet. Free shadcn/ui component."
url: https://avaraui.com/docs/nextjs/fleet-tracker
---

# Shadcn Fleet Tracker Map

An interactive, responsive fleet management dashboard featuring a synchronized sidebar and live map integration using React Leaflet.

Every preview is live: click a vehicle in the sidebar to fly the map to its coordinates, or click a map marker to highlight it in the sidebar.

## For AI agents

**Ask before you pick.** This page has 11 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 11 options as live previews: https://avaraui.com/view/fleet-tracker

**When to use it.** A fleet management dashboard (`fleet-map`) plus 8 minimalist Positron Leaflet map variants (`maps`) covering routing, tracking, listings, zones, heatmaps, and clustering.

**Gotchas:**

- The first three looks install as `fleet-map`; the eight Positron map variants install as `maps`.
- FleetTracker takes `fleetData` as `{ id, location, lat, lng }` with optional `status` and `speed`.

### The 11 variants

1. **Split view** (`default`): A fixed sidebar beside the map, synchronised in both directions.
   - Live: https://avaraui.com/view/fleet-tracker/default
   - Best for: a dispatch or logistics screen where the list and map are equally important
   - Avoid if: you want the map to fill the whole area
   - Traits: sidebar beside the map, default look
   - Install: `npx shadcn@latest add @avara-ui/fleet-map`
   - Set these props: `{"variant":"default"}`
   - Docs: https://avaraui.com/docs/nextjs/fleet-tracker#fleet-tracker
2. **Minimal** (`minimal`): The vehicle list floats as a panel over a light map.
   - Live: https://avaraui.com/view/fleet-tracker/minimal
   - Best for: a map-first view with the list kept out of the way
   - Avoid if: you want a permanent sidebar
   - Traits: floating list panel, light map
   - Install: `npx shadcn@latest add @avara-ui/fleet-map`
   - Set these props: `{"variant":"minimal"}`
   - Docs: https://avaraui.com/docs/nextjs/fleet-tracker#minimal
3. **Modern** (`modern`): An aurora behind the tracker, frosted vehicle list, and glass-edged map.
   - Live: https://avaraui.com/view/fleet-tracker/modern
   - Best for: a showpiece, brand-forward tracking screen
   - Avoid if: you want a plain, utilitarian dashboard
   - Traits: aurora backdrop, frosted list, glass-edged map
   - Install: `npx shadcn@latest add @avara-ui/fleet-map`
   - Set these props: `{"variant":"modern"}`
   - Docs: https://avaraui.com/docs/nextjs/fleet-tracker#modern
4. **Route Planner** (`route-planner`): Positron map with a blue dispatch route, stop markers, popup, and ETA card.
   - Live: https://avaraui.com/view/fleet-tracker/route-planner
   - Best for: multi-stop dispatch and delivery route previews
   - Avoid if: you need a full vehicle sidebar
   - Traits: Positron basemap, route polyline, floating ETA card
   - Install: `npx shadcn@latest add @avara-ui/maps`
   - Set these props: `{"variant":"route-planner"}`
   - Docs: https://avaraui.com/docs/nextjs/fleet-tracker#route-planner
5. **Live Tracking** (`live-tracking`): Animated pulsing courier marker moving along a solid and dashed route.
   - Live: https://avaraui.com/view/fleet-tracker/live-tracking
   - Best for: real-time order or courier ETA tracking
   - Avoid if: showing static locations
   - Traits: animated courier, solid and dashed path, ETA progress bar
   - Install: `npx shadcn@latest add @avara-ui/maps`
   - Set these props: `{"variant":"live-tracking"}`
   - Docs: https://avaraui.com/docs/nextjs/fleet-tracker#live-tracking
6. **Fleet Dispatch** (`fleet-dispatch`): Active courier units along a dispatch corridor with a floating SLA card.
   - Live: https://avaraui.com/view/fleet-tracker/fleet-dispatch
   - Best for: regional dispatch overview with live SLA metrics
   - Avoid if: you need a searchable vehicle list
   - Traits: SLA summary card, corridor route, unit popups
   - Install: `npx shadcn@latest add @avara-ui/maps`
   - Set these props: `{"variant":"fleet-dispatch"}`
   - Docs: https://avaraui.com/docs/nextjs/fleet-tracker#fleet-dispatch
7. **Property Listings** (`property-listings`): Interactive price-pill markers paired with a neighborhood card and popups.
   - Live: https://avaraui.com/view/fleet-tracker/property-listings
   - Best for: real estate, rentals, or price-tagged map discovery
   - Avoid if: showing routes or telemetry
   - Traits: price-pill markers, neighborhood list, listing popups
   - Install: `npx shadcn@latest add @avara-ui/maps`
   - Set these props: `{"variant":"property-listings"}`
   - Docs: https://avaraui.com/docs/nextjs/fleet-tracker#property-listings
8. **Store Locator** (`store-locator`): Color-coded pickup pins, clickable location list, and a Locate Me control.
   - Live: https://avaraui.com/view/fleet-tracker/store-locator
   - Best for: store finders, pickup counters, and branch locators
   - Avoid if: showing delivery polygons
   - Traits: locate-me control, color-coded pins, location list
   - Install: `npx shadcn@latest add @avara-ui/maps`
   - Set these props: `{"variant":"store-locator"}`
   - Docs: https://avaraui.com/docs/nextjs/fleet-tracker#store-locator
9. **Coverage Zones** (`coverage-zones`): Delivery polygon zones with centered capacity badges and a zone legend.
   - Live: https://avaraui.com/view/fleet-tracker/coverage-zones
   - Best for: service-area boundaries and regional capacity monitoring
   - Avoid if: plotting individual point events
   - Traits: polygon zones, capacity pills, zone legend
   - Install: `npx shadcn@latest add @avara-ui/maps`
   - Set these props: `{"variant":"coverage-zones"}`
   - Docs: https://avaraui.com/docs/nextjs/fleet-tracker#coverage-zones
10. **Heatmap** (`heatmap`): Canvas-rendered thermal pickup density layer with a Low-High legend.
   - Live: https://avaraui.com/view/fleet-tracker/heatmap
   - Best for: demand hotspots and geographic density visualization
   - Avoid if: inspecting individual clickable markers
   - Traits: canvas heatmap, thermal gradient, density legend
   - Install: `npx shadcn@latest add @avara-ui/maps`
   - Set these props: `{"variant":"heatmap"}`
   - Docs: https://avaraui.com/docs/nextjs/fleet-tracker#heatmap
11. **Incident Monitor** (`incident-monitor`): Zoom-aware numbered cluster circles expanding into severity incident pins.
   - Live: https://avaraui.com/view/fleet-tracker/incident-monitor
   - Best for: operations monitoring with dense incident or alert pins
   - Avoid if: you only have a handful of static points
   - Traits: zoom clustering, severity dots, KPI overlay
   - Install: `npx shadcn@latest add @avara-ui/maps`
   - Set these props: `{"variant":"incident-monitor"}`
   - Docs: https://avaraui.com/docs/nextjs/fleet-tracker#incident-monitor

## Fleet tracker

- Pass `fleetData` as `{ id, location, lat, lng }[]` — `status` (`active`, `idle`, `maintenance`) and `speed` are optional.
- `variant="default"` is the split view: a fixed sidebar beside the map, synchronised in both directions.

```tsx
import FleetTracker, {
  type Vehicle,
} from "@/components/custom/blocks/Fleet-map";

// Leaflet touches `window` on import, so the map is deferred until after mount
// — the component handles that itself, in every framework.

const fleet: Vehicle[] = [
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

export default function FleetDashboard() {
  return <FleetTracker fleetData={fleet} />;
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/fleet-map.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/fleet-map
```

## Examples

### Minimal

- Set `variant="minimal"` to float the vehicle list as a panel over a light map.

```tsx
import FleetTracker, {
  type Vehicle,
} from "@/components/custom/blocks/Fleet-map";

const fleet: Vehicle[] = [
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

export default function MinimalFleet() {
  // A floating panel over a light map canvas.
  return <FleetTracker variant="minimal" fleetData={fleet} />;
}
```

### Modern

- Set `variant="modern"` for the Profile Page treatment: an aurora behind the whole tracker, the vehicle list as a frosted slab, and the map in a glass-edged panel.

```tsx
import FleetTracker, {
  type Vehicle,
} from "@/components/custom/blocks/Fleet-map";

const fleet: Vehicle[] = [
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

export default function ModernFleet() {
  // Backdrop-blurred glass sidebar over a dark map.
  return <FleetTracker variant="modern" fleetData={fleet} />;
}
```

## Maps (Positron Style)

Eight minimalist OpenFreeMap Positron MapLibre GL map variants with floating KPI/list overlays, custom dot and price-pill markers, route polylines, delivery zone polygons, WebGL heatmaps, and GeoJSON incident clustering.

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/maps.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/maps
```

### Route Planner

- Set `variant="route-planner"` for a dispatch route polyline, dot stop markers, open popup details, and a floating ETA card.

```tsx
import Maps from "@/components/custom/blocks/Maps";

export default function RoutePlannerMap() {
  return <Maps variant="route-planner" />;
}
```

### Property Listings

- Set `variant="property-listings"` for interactive price-pill markers, a synchronized neighborhood card, and listing popups.

```tsx
import Maps from "@/components/custom/blocks/Maps";

export default function PropertyListingsMap() {
  return <Maps variant="property-listings" />;
}
```

### Live Tracking

- Set `variant="live-tracking"` for an animated pulsing courier marker moving along a solid/dashed route with a live ETA progress bar.

```tsx
import Maps from "@/components/custom/blocks/Maps";

export default function LiveTrackingMap() {
  return <Maps variant="live-tracking" />;
}
```

### Store Locator

- Set `variant="store-locator"` for color-coded pickup pins, a clickable location list, and a Locate Me map control.

```tsx
import Maps from "@/components/custom/blocks/Maps";

export default function StoreLocatorMap() {
  return <Maps variant="store-locator" />;
}
```

### Fleet Dispatch

- Set `variant="fleet-dispatch"` for active vehicle markers along a dispatch corridor with a floating SLA summary card.

```tsx
import Maps from "@/components/custom/blocks/Maps";

export default function FleetDispatchMap() {
  return <Maps variant="fleet-dispatch" />;
}
```

### Coverage Zones

- Set `variant="coverage-zones"` for polygon delivery zones with centered capacity badges and a color-coded legend.

```tsx
import Maps from "@/components/custom/blocks/Maps";

export default function CoverageZonesMap() {
  return <Maps variant="coverage-zones" />;
}
```

### Heatmap

- Set `variant="heatmap"` for a canvas-rendered thermal pickup density layer with a Low–High gradient legend.

```tsx
import Maps from "@/components/custom/blocks/Maps";

export default function HeatmapView() {
  return <Maps variant="heatmap" />;
}
```

### Incident Monitor

- Set `variant="incident-monitor"` for zoom-aware numbered cluster circles that expand into severity-coded incident pins.

```tsx
import Maps from "@/components/custom/blocks/Maps";

export default function IncidentMonitorMap() {
  return <Maps variant="incident-monitor" />;
}
```

## Features
Explore the Fleet Tracker map features, including live marker positioning, custom tooltips, and interactive geographic visualization.

Easily adapt the component's styling and behavior to fit your application's unique design system.

Built with accessibility in mind, ensuring all users can interact with your application effectively.

Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `fleetData` | `Vehicle[]` | Required | Array of objects containing vehicle info. Requires `id`, `location` (string), and geographic coordinates ( `lat`, `lng`). Optionally accepts `status` ("active" \| "idle" \| "maintenance") and `speed`. |
| `variant` | `"default" \| "minimal" \| "modern"` | `"default"` | `default` is a split view, `minimal` floats the list over the map, `modern` is the glass treatment from Profile Page: an aurora behind, a frosted list, a glass-edged map. |
| `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "zinc" \| (hex string)` | `"primary"` | Applies global color themes to the active map markers, sidebar icons, and focus rings. |
| `zoom` | `number` | `15` | Initial zoom level and active vehicle focus zoom level. Defaults to `15` for street/neighborhood detail. |
| `tileApiKey` | `string` | `undefined` | Optional CARTO API key if you choose to use CARTO Basemaps. By default, OpenStreetMap tiles are used with zero API key required. |
| `tileUrl` | `string` | `OpenStreetMap tile URL` | Custom basemap raster tile URL template for light mode (e.g., `https://&#123;s&#125;.tile.openstreetmap.org/&#123;z&#125;/&#123;x&#125;/&#123;y&#125;.png`). |
| `darkTileUrl` | `string` | `undefined` | Custom raster tile URL template for dark mode. If omitted, standard OpenStreetMap tiles are dynamically dark-graded. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/fleet-tracker
