# Fleet Tracker Map

An interactive, responsive fleet management dashboard featuring a synchronized sidebar and live map integration using React Leaflet.

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

## Interactive Showcase

Explore the different architectural variants of the fleet tracker. Switch between the classic split-view (`default`), a floating panel over a light map (`minimal`), or a stunning backdrop-blurred panel (`modern`).

Click on any vehicle in the sidebar to dynamically fly the map to its precise latitude/longitude, or click a map marker to highlight it in the sidebar.

_Click the **Code** tab in the preview below to copy the full component engine or the dynamic usage snippet for your current selection._

## Installation

### 1. Install Dependencies

This component requires `react-leaflet` to manage the map canvas, and `lucide-react` for the UI icons.

```bash
npm install leaflet react-leaflet lucide-react
npm install -D @types/leaflet
```

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

          "indigo" | "rose" | "emerald" | "zinc"

          "indigo"

          Applies global color themes to the active map markers, sidebar icons,
          and focus rings.

---

**Component Path:** `nextjs\fleet-tracker\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
