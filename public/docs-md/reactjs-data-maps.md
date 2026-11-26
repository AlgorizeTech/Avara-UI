---
title: "Shadcn Data Maps"
description: "Shadcn Data Maps component. A React-Leaflet choropleth map for geographic data and user distributions, with no external map tiles."
url: https://avaraui.com/docs/nextjs/data-maps
---

# Shadcn Data Maps

A React-Leaflet choropleth world map for geographic data, painted from GeoJSON with no raster tiles.

It has hover tooltips, solid-fill and density-dot variants, flag badges and trend indicators, and it follows your site's light or dark mode. Hover any highlighted country for its data card.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/data-maps.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/data-maps
```

## Filled regions

- Pass `dataPoints` as `{ id, name, flag, active, activeTrend }[]` — `id` is the ISO-3 country code the map matches on.
- `variant="fill"` is the default: it paints each matched country polygon in the accent colour and dims the rest.

```tsx
import {
  DataMaps,
  type DataPoint,
} from "@/components/custom/blocks/DataMapsBlock";

const mapData: DataPoint[] = [
  { id: "CHN", name: "China", flag: "🇨🇳", active: 13.7, activeTrend: "up", new: 0.1, newTrend: "down" },
  { id: "IND", name: "India", flag: "🇮🇳", active: 8.4, activeTrend: "up", new: 0.3, newTrend: "up" },
  { id: "USA", name: "United States", flag: "🇺🇸", active: 11.2, activeTrend: "down", new: 0.5, newTrend: "down" },
];

export default function AnalyticsDashboard() {
  return (
    <div className="w-full h-[500px]">
      <DataMaps dataPoints={mapData} variant="fill" zoom={2} center={[30, 0]} />
    </div>
  );
}
```

## Density dots

- Set `variant="dots"` to swap the fills for pulsing centroid markers — the same data read as points rather than areas, which is easier when regions are small or crowded.

```tsx
import {
  DataMaps,
  type DataPoint,
} from "@/components/custom/blocks/DataMapsBlock";

const mapData: DataPoint[] = [
  { id: "CHN", name: "China", flag: "🇨🇳", active: 13.7, activeTrend: "up", new: 0.1, newTrend: "down" },
  { id: "IND", name: "India", flag: "🇮🇳", active: 8.4, activeTrend: "up", new: 0.3, newTrend: "up" },
  { id: "USA", name: "United States", flag: "🇺🇸", active: 11.2, activeTrend: "down", new: 0.5, newTrend: "down" },
];

export default function DensityMap() {
  // `dots` places a pulsing marker at each country's centroid instead of
  // filling the polygon — better when the regions are small or crowded.
  return <DataMaps dataPoints={mapData} variant="dots" zoom={2} center={[30, 0]} />;
}
```

## Zoomable

- Set `zoomable` to add the zoom controls and drag-to-pan. Off by default.
- `scrollWheelZoom` additionally binds the wheel — leave it off inside a scrolling page so the map never steals the scroll.
- `minZoom` and `maxZoom` bound how far the reader can go; `zoom` is the starting level.

```tsx
import {
  DataMaps,
  type DataPoint,
} from "@/components/custom/blocks/DataMapsBlock";

const mapData: DataPoint[] = [
  { id: "CHN", name: "China", flag: "🇨🇳", active: 13.7, activeTrend: "up", new: 0.1, newTrend: "down" },
  { id: "IND", name: "India", flag: "🇮🇳", active: 8.4, activeTrend: "up", new: 0.3, newTrend: "up" },
  { id: "USA", name: "United States", flag: "🇺🇸", active: 11.2, activeTrend: "down", new: 0.5, newTrend: "down" },
];

export default function ZoomableMap() {
  // Pan and zoom are opt-in. `zoomable` adds the controls and drag handling;
  // `scrollWheelZoom` also binds the wheel, which you may want off inside a
  // scrolling page.
  return (
    <DataMaps
      dataPoints={mapData}
      variant="fill"
      zoomable
      scrollWheelZoom
      zoom={2}
      minZoom={1}
      maxZoom={8}
    />
  );
}
```

## About Shadcn Data Maps

**What it is.** **Shadcn Data Maps** (`DataMaps`, exported from `DataMapsBlock.tsx`) is a React-Leaflet choropleth and density-dot world map that renders country polygons from GeoJSON without raster map tiles.

**How it is built.** `DataMaps` loads Leaflet with a dynamic `import()` after client mount and fetches the country GeoJSON at runtime, but the file also imports `useMap` from `react-leaflet` at the top, which touches `window` when it loads. In Next.js render it from a client-only boundary; a Vite SPA needs nothing extra. It matches ISO-3 country codes from `dataPoints`, and supports `"fill"` polygon shading, `"dots"` pulsing centroid markers, and optional `zoomable` controls.

**When to use it.** Use it for global user distribution dashboards, regional revenue maps, latency/traffic heatmaps, and market expansion overviews.

## For AI agents

**When to use**

- Global user distribution dashboards, regional revenue maps
- Latency/traffic heatmaps, market expansion overviews

**When not to use**

- Data that is not geographic: use [Chart](https://avaraui.com/docs/reactjs/chart)
- Live vehicle positions on a map: use [Fleet Tracker](https://avaraui.com/docs/reactjs/fleet-tracker)

**Agent notes**

- Import `DataMaps` (the file is `DataMapsBlock.tsx`) and the `DataPoint` type. It accepts `dataPoints` (`{ id, name, active, activeTrend, new, newTrend, color }[]` with ISO-3 country `id`), `variant` (`"fill" | "dots"`), `zoomable`, `scrollWheelZoom`, `minZoom`, `maxZoom`, `center`, `zoom`, `highlightColor`, `defaultColor`, `mapGeoJsonUrl` and `mapId`. There is no `color` prop.
- The map fills its parent (`h-full`, minimum 250 px, 400 px from `sm`), so give the parent an explicit height.
- Leave `scrollWheelZoom` off inside scrollable pages so the map does not intercept page scroll.
- Not SSR-safe on its own in Next.js: wrap it in `next/dynamic` with `ssr: false` or another client-only boundary, because `react-leaflet` is imported at the top of the file.
- Install `leaflet`, `react-leaflet` and `geojson`. At runtime it fetches the GeoJSON from `mapGeoJsonUrl` and flag images from flagcdn.com.

**Ask before you pick.** This page has 2 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 2 options as live previews: https://avaraui.com/view/data-maps

**When to use it.** A React-Leaflet world map for geographic data, with hover tooltips, flag badges and trend indicators, drawn without external map tiles and following your light or dark theme. Two looks: filled country regions or pulsing density dots.

**Gotchas:**

- Both are looks of the one `data-maps` item: install it once and set `variant` from the index.
- Zoom controls and drag-to-pan are the `zoomable` prop (off by default); leave wheel zoom off inside a scrolling page so the map does not steal the scroll.
- Each data entry's `id` is the ISO-3 country code the map matches on.

### The 2 variants

1. **Filled regions** (`fill`): Each matched country is filled in the accent colour and the rest is dimmed. The default.
   - Live: https://avaraui.com/view/data-maps/fill
   - Best for: showing which countries have users, sales or coverage
   - Avoid if: the regions of interest are small or crowded
   - Traits: country fills, default look
   - Install: `npx shadcn@latest add @avara-ui/data-maps`
   - Set these props: `{"variant":"fill"}`
   - Docs: https://avaraui.com/docs/nextjs/data-maps#filled-regions
2. **Density dots** (`dots`): Pulsing markers at each country's centre: the same data read as points rather than areas.
   - Live: https://avaraui.com/view/data-maps/dots
   - Best for: small or crowded regions, where area fills would be hard to see
   - Avoid if: you want whole countries highlighted
   - Traits: pulsing centroid markers
   - Install: `npx shadcn@latest add @avara-ui/data-maps`
   - Set these props: `{"variant":"dots"}`
   - Docs: https://avaraui.com/docs/nextjs/data-maps#density-dots

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `DataMaps` | `dataPoints` | `DataPoint[]` | Required | An array of data point objects to display on the map. See the DataPoint reference below. |
| `DataMaps` | `variant` | `"fill" \| "dots"` | `"fill"` | The visual style of the map. `fill` colors the entire country polygon, while `dots` places a pulsing dot at the center of the country. |
| `DataMaps` | `center` | `[number, number]` | `[20, 0]` | The initial latitude and longitude coordinates to center the map on. |
| `DataMaps` | `zoom` | `number` | `2` | The initial zoom level of the map. When `zoomable` is false, a container narrower than 640px lowers it to `1`, and narrower than 450px to `0`. |
| `DataMaps` | `highlightColor` | `string` | `var(--primary)` | The default fill color for highlighted countries. |
| `DataMaps` | `defaultColor` | `string` | `var(--map-default-fill)` | The fill color for non-highlighted countries. The default is a theme-aware mix of `--foreground` and `--muted`. |
| `DataMaps` | `zoomable` | `boolean` | `false` | Adds the zoom control (bottom right), double-click, touch, box and keyboard zoom. |
| `DataMaps` | `scrollWheelZoom` | `boolean` | `false` | Also binds the mouse wheel. Only has an effect when `zoomable` is true. |
| `DataMaps` | `minZoom / maxZoom` | `number` | `1 / 8` | Lowest and highest zoom level the reader can reach. |
| `DataMaps` | `mapGeoJsonUrl` | `string` | `raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json` | URL of the world GeoJSON fetched at runtime. Each feature needs its ISO-3 code as `id` (or `properties.id` / `properties.ISO_A3`). |
| `DataMaps` | `mapId` | `string` | `undefined` | Stable React key for the underlying Leaflet map. Give each map on a page its own value; changing it remounts the map. |

### DataPoint Object

| Object | Property | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `DataPoint` | `id` | `string` | Required | A 3-letter ISO 3166-1 alpha-3 country code (e.g. 'USA', 'IND', 'GBR'). Used to map data to the correct polygon. |
| `DataPoint` | `name` | `string` | Required | The title displayed in the header of the hover card. |
| `DataPoint` | `flag` | `string` | `undefined` | Accepted by the type, but the hover card does not render it. It shows a flag image from flagcdn.com chosen by `id` instead. |
| `DataPoint` | `active` | `number` | `undefined` | An optional metric to display on the first line. |
| `DataPoint` | `activeTrend` | `"up" \| "down"` | `undefined` | Renders a green up-arrow or red down-arrow next to the `active` value. |
| `DataPoint` | `new` | `number` | `undefined` | An optional metric to display on the second line. |
| `DataPoint` | `newTrend` | `"up" \| "down"` | `undefined` | Renders a green up-arrow or red down-arrow next to the `new` value. |
| `DataPoint` | `color` | `string` | `undefined` | An optional custom fill color for this specific country, overriding the global highlight. |

## Works with other components

- Pair `DataMaps` with [Chart](https://avaraui.com/docs/reactjs/chart) for country-level breakdowns.
- Use [Fleet Tracker Map](https://avaraui.com/docs/reactjs/fleet-tracker) for live vehicle and street-level maps.
- Add [Table](https://avaraui.com/docs/reactjs/table) beside it for ranked regional leaderboards.

## Does DataMaps work with Next.js server rendering?

Not by itself. `DataMaps` loads Leaflet after mount, but it also imports `useMap` from `react-leaflet` at the top of the file, and that package touches `window` as soon as it loads. In Next.js, render it through `next/dynamic` with `ssr: false`. A client-only Vite app needs no wrapper.

## Can I host the world GeoJSON myself?

Yes. By default the map fetches `countries.geo.json` from raw.githubusercontent.com when it mounts. Serve your own copy, for example from `public`, and pass its URL as `mapGeoJsonUrl`. Each feature must carry its ISO-3 code as `id`, `properties.id` or `properties.ISO_A3`. If the request fails, the map stays on its loading placeholder.

## What does the DataMaps hover card show?

Hovering a country in `dataPoints` shows its `name`, a flag image from flagcdn.com, an `Active:` row when `active` is set and a `New:` row when `new` is set. A green or red arrow follows a value when its trend is `"up"` or `"down"`. The `flag` field is not rendered.

## How do I color countries individually on DataMaps?

Set `highlightColor` for the shared accent, `defaultColor` for countries without data, and `color` on a single `DataPoint` to override the accent for that country. Any CSS color works, including `var(--primary)`. Hovering any country tints it with its own color or the accent at 70% opacity.

## How do I make DataMaps zoomable without hijacking page scroll?

Set `zoomable` to add the zoom buttons, double-click, pinch and keyboard zoom, and bound them with `minZoom` and `maxZoom`. Leave `scrollWheelZoom` off so the wheel keeps scrolling the page. Without `zoomable`, the map picks its zoom from the container width: `0` under 450px, `1` under 640px, otherwise `zoom`.

## What does variant="dots" change in DataMaps?

It stops filling country polygons and places a pulsing marker at the center of each matched country instead, using `color` or `highlightColor`. A badge in the bottom-right corner shows how many countries are selected. The hover card still comes from the country polygon underneath, so tooltips behave as in `fill`.

---

Live previews and every example: https://avaraui.com/docs/nextjs/data-maps
