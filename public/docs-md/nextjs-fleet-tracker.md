# Fleet Tracker Map

An interactive, responsive fleet management dashboard featuring a synchronized sidebar and live map integration using React Leaflet.

Every preview is live: click a vehicle in the sidebar to fly the map to its coordinates, or click a map marker to highlight it in the sidebar.

export const fleetData = `const fleet: Vehicle[] = [
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
];`;

export const usageDefault = `import FleetTracker, {
  type Vehicle,
} from "@/components/custom/blocks/Fleet-map";

// Leaflet touches \`window\` on import, so the map is deferred until after mount
// — the component handles that itself, in every framework.

${fleetData}

export default function FleetDashboard() {
  return ;
}`;

export const usageMinimal = `import FleetTracker, {
  type Vehicle,
} from "@/components/custom/blocks/Fleet-map";

${fleetData}

export default function MinimalFleet() {
  // A floating panel over a light map canvas.
  return ;
}`;

export const usageModern = `import FleetTracker, {
  type Vehicle,
} from "@/components/custom/blocks/Fleet-map";

${fleetData}

export default function ModernFleet() {
  // Backdrop-blurred glass sidebar over a dark map.
  return ;
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/fleet-map
```

## Examples

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

          default is a split view, minimal floats
          the list over the map, modern is the glass treatment
          from Profile Page: an aurora behind, a frosted list, a glass-edged map.

          color

            "primary" | "indigo" | "rose" | "emerald" | "zinc" | (hex string)

          "primary"

          Applies global color themes to the active map markers, sidebar icons,
          and focus rings.

---

**Component Path:** `[framework]\fleet-tracker\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
