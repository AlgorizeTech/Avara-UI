---
title: "Shadcn Fleet Tracker Map"
description: "An interactive, responsive fleet management dashboard featuring a synchronized sidebar and live map integration using React Leaflet. Free shadcn/ui component."
url: https://avaraui.com/docs/nextjs/fleet-tracker
---

# Shadcn Fleet Tracker Map

An interactive, responsive fleet management dashboard featuring a synchronized sidebar and live map integration using React Leaflet.

Every preview is live: click a vehicle in the sidebar to fly the map to its coordinates, or click a map marker to highlight it in the sidebar.

## For AI agents

**Ask before you pick.** This page has 3 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 3 options as live previews: https://avaraui.com/view/fleet-tracker

**When to use it.** A fleet management dashboard with a vehicle sidebar synchronised with a live React Leaflet map: click a vehicle to fly the map to it, or a marker to highlight it in the list. Three looks.

**Gotchas:**

- All three are looks of the one `fleet-map` item: install it once and set `variant` from the index.
- Vehicles are `{ id, location, lat, lng }` with optional `status` (`active`, `idle`, `maintenance`) and `speed`.

### The 3 variants

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
3. **Modern** (`modern`): An aurora behind the whole tracker, the vehicle list as a frosted slab and the map in a glass-edged panel.
   - Live: https://avaraui.com/view/fleet-tracker/modern
   - Best for: a showpiece, brand-forward tracking screen
   - Avoid if: you want a plain, utilitarian dashboard
   - Traits: aurora backdrop, frosted list, glass-edged map
   - Install: `npx shadcn@latest add @avara-ui/fleet-map`
   - Set these props: `{"variant":"modern"}`
   - Docs: https://avaraui.com/docs/nextjs/fleet-tracker#modern

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

## Features
Explore the Fleet Tracker map features, including live marker positioning, custom tooltips, and interactive geographic visualization.

### Customizable

Easily adapt the component's styling and behavior to fit your application's unique design system.

### Accessible

Built with accessibility in mind, ensuring all users can interact with your application effectively.

### Responsive

Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

### Performant

Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

### Usage Guidelines

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
