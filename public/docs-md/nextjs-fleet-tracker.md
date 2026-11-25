---
title: "Shadcn Fleet Tracker Map"
description: "An interactive, responsive fleet management dashboard featuring a synchronized sidebar and live map integration using React Leaflet. Free shadcn/ui component."
url: https://avaraui.com/docs/nextjs/fleet-tracker
---

# Shadcn Fleet Tracker Map

An interactive, responsive fleet management dashboard featuring a synchronized sidebar and live map integration using React Leaflet.

Every preview is live: click a vehicle in the sidebar to fly the map to its coordinates, or click a map marker to highlight it in the sidebar.

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

## Installation

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

## About Shadcn Fleet Tracker Map

**What it is.** **Shadcn Fleet Tracker Map** combines `FleetTracker` (the default export of `Fleet-map`, installed as `fleet-map`: a two-way synchronized vehicle list and React-Leaflet map in `default`, `minimal`, and `modern` layouts) with `Maps` (eight OpenFreeMap Positron MapLibre GL map variants).

**How it is built.** Clicking a vehicle row in `FleetTracker` smoothly flies the map to its `[lat, lng]` coordinates, and clicking a map marker selects the corresponding sidebar entry. `Maps` adds MapLibre GL overlays for routes, delivery zones, heatmaps, and clusters, drawn from built-in sample data. Leaflet and MapLibre are loaded in the browser after mount, so neither needs `next/dynamic`.

**When to use it.** Use it for logistics dispatch consoles, delivery tracking portals, real-estate map search, and live incident monitoring dashboards.

## For AI agents

**When to use**

- Logistics dispatch consoles, delivery tracking portals
- Real-estate map search, live incident monitoring dashboards

**When not to use**

- Country-level aggregates: use [Data Maps](https://avaraui.com/docs/nextjs/data-maps)
- Sortable records with no map: use [Data Table](https://avaraui.com/docs/nextjs/data-table)

**Agent notes**

- Install `fleet-map` for `FleetTracker` (`import FleetTracker from "@/components/custom/blocks/Fleet-map"`; props `fleetData`, `variant`: `"default" | "minimal" | "modern"`, `color`, `zoom`, `tileUrl`, `darkTileUrl`, `tileApiKey`, `attribution`) or `maps` for the MapLibre GL variants.
- `Maps` takes no data props. Its props are `variant`, `color`, `center` (`[lng, lat]`), `zoom`, `height` (default `480`), `className`, `lightStyleUrl` and `darkStyleUrl`; the stops, listings and zones are constants in the file.
- `fleet-map` depends on `leaflet` and `react-leaflet`; `maps` depends on `maplibre-gl`.
- Each `Vehicle` in `fleetData` needs `id`, `location`, `lat`, and `lng` (plus optional `status` and `speed`).
- Selection between the sidebar list and map markers is synchronized bidirectionally.

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

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `fleetData` | `Vehicle[]` | Required | Array of objects containing vehicle info. Requires `id`, `location` (string), and geographic coordinates ( `lat`, `lng`). Optionally accepts `status` ("active" \| "idle" \| "maintenance") and `speed` (a string such as `"45 mph"`). |
| `variant` | `"default" \| "minimal" \| "modern"` | `"default"` | `default` is a split view, `minimal` floats the list over the map, `modern` is the glass treatment from Profile Page: an aurora behind, a frosted list, a glass-edged map. |
| `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "zinc" \| (hex string)` | `"primary"` | Applies global color themes to the active map markers, sidebar icons, and focus rings. |
| `zoom` | `number` | `15` | Initial zoom level and active vehicle focus zoom level. Defaults to `15` for street/neighborhood detail. |
| `tileApiKey` | `string` | `undefined` | Optional CARTO API key if you choose to use CARTO Basemaps. By default, OpenStreetMap tiles are used with zero API key required. |
| `tileUrl` | `string` | `OpenStreetMap tile URL` | Custom basemap raster tile URL template for light mode (e.g., `https://&#123;s&#125;.tile.openstreetmap.org/&#123;z&#125;/&#123;x&#125;/&#123;y&#125;.png`). |
| `darkTileUrl` | `string` | `undefined` | Custom raster tile URL template for dark mode. If omitted, standard OpenStreetMap tiles are dynamically dark-graded. |
| `attribution` | `string` | OpenStreetMap credit (CARTO credit when `tileApiKey` is set) | Attribution HTML passed to the tile layer. |

## Works with other components

Pair `FleetTracker` with [Data Maps](https://avaraui.com/docs/nextjs/data-maps) for country-level choropleth analytics, [Data Table](https://avaraui.com/docs/nextjs/data-table) for dispatch logs, and [Live Pulse Pill](https://avaraui.com/docs/nextjs/live-pulse-pill) for active telemetry badges.

## What is the difference between `fleet-map` and `maps`?

`fleet-map` installs `FleetTracker`: a vehicle list and a React-Leaflet map that you feed with `fleetData`. `maps` installs `Maps`: eight MapLibre GL variants (routes, delivery zones, heatmap, clustering and more) that run on sample data and take `variant`, `center`, `zoom` and style URLs. Install the one you need.

## How does sidebar-to-map synchronization work?

Clicking a vehicle in the sidebar flies the map to its `lat` and `lng` at the `zoom` level over about 1.5 seconds. Clicking a marker selects the same vehicle in the list. The search box filters the list by `id` or `location`. On narrow screens the list and map swap behind a toggle button.

## How do I pass my own vehicles to FleetTracker?

Give `fleetData` an array of `Vehicle` objects: `id` (string), `location` (string), `lat` and `lng` (numbers), plus an optional `status` of `"active"`, `"idle"` or `"maintenance"` and a `speed` display string such as `"45 mph"`. Update the array from your telemetry source and the list and markers follow.

## Which map tiles does FleetTracker use, and can I change them?

It uses OpenStreetMap raster tiles with no API key. Pass `tileUrl` and `darkTileUrl` to use another raster provider, or `tileApiKey` to switch to CARTO basemaps. Without `darkTileUrl`, dark mode inverts the light tiles with a CSS filter. The built-in layouts hide Leaflet's attribution control, so show your tile credit elsewhere.

## Can I use my own data with the Maps variants?

Not through props. `Maps` takes only `variant`, `color`, `center` as `[lng, lat]`, `zoom`, `height`, `className`, `lightStyleUrl` and `darkStyleUrl`. The stops, listings, zones and heat points are constants in the installed file, so edit those to show your own locations. Pass style URLs to replace the OpenFreeMap basemap.

## Does the Fleet Tracker work with server rendering and Vite?

Yes. `leaflet` and `react-leaflet` are imported in an effect after mount, not at module scope, so server rendering never touches the DOM and you need no `next/dynamic`. The file has no `next/*` imports. `Maps` mounts its WebGL map only near the viewport, which keeps pages with many maps under the browser's context limit.

---

Live previews and every example: https://avaraui.com/docs/nextjs/fleet-tracker
