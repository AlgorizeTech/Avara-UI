# Data Maps

{/* A beautiful map component to visualize your geographic data points */}

A powerful, highly-customizable React-Leaflet based choropleth map component designed for beautifully visualizing geographic data, user distributions, and global trends without the need for clunky external map tiles. Built with SSR safety in mind, it leverages Next.js dynamic imports to load Leaflet entirely client-side — no hydration mismatches, no broken renders, just a smooth map experience every time.

It features interactive hover tooltips, multiple visual variants (such as solid region fills or density dots), country flag badges, trend indicators, and seamless theme integration that automatically adapts to your site's dark or light mode. Whether you're showing active users per country, traffic breakdowns, or global feature adoption — this component handles it with elegant simplicity. Perfect for building immersive dashboards, analytics panels, and global demographic visualizations right inside your Next.js application.

## Examples

The map is pure vector — it fetches world GeoJSON and paints country polygons, so there are no raster tiles to load. Hover any highlighted country for its data card.

export const usageFill = `import dynamic from "next/dynamic";

// Leaflet touches \`window\` on import, so the map must be client-only.
const DataMaps = dynamic(
  () => import("@/components/custom/blocks/DataMapsBlock").then((m) => m.DataMaps),
  { ssr: false },
);

const mapData = [
  { id: "CHN", name: "China", flag: "🇨🇳", active: 13.7, activeTrend: "up", new: 0.1, newTrend: "down" },
  { id: "IND", name: "India", flag: "🇮🇳", active: 8.4, activeTrend: "up", new: 0.3, newTrend: "up" },
  { id: "USA", name: "United States", flag: "🇺🇸", active: 11.2, activeTrend: "down", new: 0.5, newTrend: "down" },
];

export default function AnalyticsDashboard() {
  return (

  );
}`;

export const usageDots = `import DataMaps from "@/components/custom/blocks/DataMapsBlock";

export default function DensityMap() {
  // \`dots\` places a pulsing marker at each country's centroid instead of
  // filling the polygon — better when the regions are small or crowded.
  return ;
}`;

export const usageZoomable = `import DataMaps from "@/components/custom/blocks/DataMapsBlock";

export default function ZoomableMap() {
  // Pan and zoom are opt-in. \`zoomable\` adds the controls and drag handling;
  // \`scrollWheelZoom\` also binds the wheel, which you may want off inside a
  // scrolling page.
  return (
    
  );
}`;

export const usageColors = `import DataMaps from "@/components/custom/blocks/DataMapsBlock";

export default function ColoredMap() {
  // \`highlightColor\` sets the global accent and \`defaultColor\` paints every
  // country without data. A \`color\` on a single data point overrides both.
  return (
    
  );
}`;

## Installation

## Features
Learn about the Data Maps component's geographic visualization features, mapping interactive data points onto vector country paths.

    SSR Compatible
    Uses Next.js dynamic imports to safely load Leaflet client-side without hydration errors.

    Lightweight Vectors
    Fetches clean GeoJSON data on the fly instead of relying on heavy raster map tiles.

    Dual Variants
    Supports both solid polygon fills and modern pulsing dots for geographic emphasis.

    Rich Hover Cards
    Elegant tooltips with country flags, data metrics, and up/down trend indicators.

## Best Practices & Guidelines

    Dynamic Imports
    Always ensure that any component relying on react-leaflet is dynamically imported with {"{ ssr: false }"}. Leaflet relies on the browser's window object and will crash your Next.js app if executed on the server.

    GeoJSON Caching
    By default, the map fetches the world map GeoJSON from a remote CDN. For production environments, it is highly recommended to download the custom.geo.json file and host it locally in your public directory to reduce latency.

## Props Reference

        Component
        Prop
        Type
        Default
        Description

          DataMaps

          dataPoints

          DataPoint[]

          Required

          An array of data point objects to display on the map. See the DataPoint reference below.

          DataMaps

          variant

          "fill" | "dots"

          "fill"

          The visual style of the map. fill colors the entire country polygon, while dots places a pulsing dot at the center of the country.

          DataMaps

          center

          [number, number]

          [20, 0]

          The initial latitude and longitude coordinates to center the map on.

          DataMaps

          zoom

          number

          2

          The initial zoom level of the map.

          DataMaps

          highlightColor

          string

          var(--primary)

          The default fill color for highlighted countries.

          DataMaps

          defaultColor

          string

          #cbd5e1

          The fill color for non-highlighted countries.

### DataPoint Object

        Object
        Property
        Type
        Default
        Description

          DataPoint

          id

          string

          Required

          A 3-letter ISO 3166-1 alpha-3 country code (e.g. 'USA', 'IND', 'GBR'). Used to map data to the correct polygon.

          DataPoint

          name

          string

          Required

          The title displayed in the header of the hover card.

          DataPoint

          flag

          string

          undefined

          An optional emoji or text to display next to the country name (e.g., 🇺🇸).

          DataPoint

          active

          number

          undefined

          An optional metric to display on the first line.

          DataPoint

          activeTrend

          "up" | "down"

          undefined

          Renders a green up-arrow or red down-arrow next to the active value.

          DataPoint

          new

          number

          undefined

          An optional metric to display on the second line.

          DataPoint

          newTrend

          "up" | "down"

          undefined

          Renders a green up-arrow or red down-arrow next to the new value.

          DataPoint

          color

          string

          undefined

          An optional custom fill color for this specific country, overriding the global highlight.

---

**Component Path:** `nextjs\data-maps\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
