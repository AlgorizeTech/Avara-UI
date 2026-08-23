# Fleet Tracker Map

An interactive, responsive fleet management dashboard featuring a synchronized sidebar and live map integration using React Leaflet.

Every preview is live: click a vehicle in the sidebar to fly the map to its coordinates, or click a map marker to highlight it in the sidebar.

export const fleetData = `const fleet = [
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
];`;

export const usageDefault = `import FleetTracker from "@/components/custom/blocks/Fleet-map";

// Leaflet touches \`window\` on import, so the map is deferred until after mount
// — the component handles that itself, in every framework.

${fleetData}

export default function FleetDashboard() {
  return ;
}`;

export const usageMinimal = `import FleetTracker from "@/components/custom/blocks/Fleet-map";

${fleetData}

export default function MinimalFleet() {
  // A floating panel over a light map canvas.
  return ;
}`;

export const usageModern = `import FleetTracker from "@/components/custom/blocks/Fleet-map";

${fleetData}

export default function ModernFleet() {
  // Backdrop-blurred glass sidebar over a dark map.
  return ;
}`;

## Installation

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

          Applies overarching structural layouts, including floating sidebars
          versus split-views.

          color

            "primary" | "indigo" | "rose" | "emerald" | "zinc" | (hex string)

          "primary"

          Applies global color themes to the active map markers, sidebar icons,
          and focus rings.

---

**Component Path:** `[framework]\fleet-tracker\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
