# Fleet Tracker Map

An interactive, responsive fleet management dashboard featuring a synchronized sidebar and live map integration using React Leaflet.

## Interactive Showcase

Explore the different architectural variants of the fleet tracker. Switch between the classic split-view (`default`), a floating panel over a light map (`minimal`), or a stunning backdrop-blurred panel (`modern`).

Click on any vehicle in the sidebar to dynamically fly the map to its precise latitude/longitude, or click a map marker to highlight it in the sidebar.

_Click the **Code** tab in the preview below to copy the full component engine or the dynamic usage snippet for your current selection._

---

## Installation

### 1. Install Dependencies

This component requires `react-leaflet` to manage the map canvas, and `lucide-react` for the UI icons.

```bash
npm install leaflet react-leaflet lucide-react
npm install -D @types/leaflet
```

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
