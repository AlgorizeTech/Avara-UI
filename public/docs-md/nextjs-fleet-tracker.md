# Fleet Tracker Map

An interactive, responsive fleet management dashboard featuring a synchronized sidebar and live map integration using React Leaflet.

## Examples

Every preview is live: click a vehicle in the sidebar to fly the map to its coordinates, or click a map marker to highlight it in the sidebar. The first example's **Code** tab contains the full component source.

export const usageDefault = `import dynamic from "next/dynamic";

// Leaflet touches \`window\` on import, so the map must be client-only.
const FleetTracker = dynamic(
  () => import("@/components/custom/blocks/Fleet-map"),
  { ssr: false },
);

const fleet = [
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
];

export default function FleetDashboard() {
  return ;
}`;

export const usageMinimal = `// A floating panel over a light map canvas.
`;

export const usageModern = `// Backdrop-blurred glass sidebar over a dark map.
`;

## Installation

### 1. Install Dependencies

This component requires `react-leaflet` to manage the map canvas, and `lucide-react` for the UI icons.

```bash
npm install leaflet react-leaflet lucide-react
npm install -D @types/leaflet
```

### 2. Copy the Component

Create a new file at `components/custom/blocks/Fleet-map.tsx` and copy the source from the **Code** tab of the first example above. Import it with `next/dynamic` and `ssr: false` — Leaflet needs a real `window`.

## Features
Explore the Fleet Tracker map features, including live marker positioning, custom tooltips, and interactive geographic visualization.

    Customizable
    Easily adapt the component's styling and behavior to fit your application's unique design system.

    Accessible
    Built with accessibility in mind, ensuring all users can interact with your application effectively.

    Responsive
    Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

    Performant
    Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

    Usage Guidelines
    Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

        Prop
        Type
        Default
        Description

          fleetData

          Vehicle[]

          Required

          Array of objects containing vehicle info. Requires id,{" "}
          location (string), and geographic coordinates (
          lat, lng). Optionally accepts{" "}
          status ("active" | "idle" | "maintenance") and{" "}
          speed.

          variant

          "default" | "minimal" | "modern"

          "default"

          Applies overarching structural layouts, including floating sidebars
          versus split-views.

          color

            "primary" | "indigo" | "rose" | "emerald" | "zinc" | (hex string)

          "primary"

          Applies global color themes to the active map markers, sidebar icons,
          and focus rings.

---

**Component Path:** `nextjs\fleet-tracker\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
