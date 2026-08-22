# Globe

An interactive 3D Globe component with 10 distinct animation variants, live rotation controls, 3D Canvas physics, flight route arcs, geo-markers, holographic wireframes, and particle clouds.

`Globe` brings global network activity, flight paths, real-time analytics, and futuristic visual landing pages to life with high-performance 60fps HTML5 3D rendering.

export const usageInteractiveDots = `import { Globe } from "@/components/custom/blocks/GlobeBlock";

export default function GlobeDotsDemo() {
  return ;
}`;

export const usageFlightRoutes = `import { Globe } from "@/components/custom/blocks/GlobeBlock";

export default function GlobeFlightDemo() {
  return ;
}`;

export const usageHologramWireframe = `import { Globe } from "@/components/custom/blocks/GlobeBlock";

export default function GlobeHologramDemo() {
  return ;
}`;

export const usageParticleCloud = `import { Globe } from "@/components/custom/blocks/GlobeBlock";

export default function GlobeParticlesDemo() {
  return ;
}`;

export const usageDayNight = `import { Globe } from "@/components/custom/blocks/GlobeBlock";

export default function GlobeDayNightDemo() {
  return ;
}`;

export const usageTechPinpoint = `import { Globe } from "@/components/custom/blocks/GlobeBlock";

export default function GlobePinpointDemo() {
  return ;
}`;

export const usageDigitalMatrix = `import { Globe } from "@/components/custom/blocks/GlobeBlock";

export default function GlobeMatrixDemo() {
  return ;
}`;

export const usageShieldEnergy = `import { Globe } from "@/components/custom/blocks/GlobeBlock";

export default function GlobeShieldDemo() {
  return ;
}`;

export const usageMinimalFlat = `import { Globe } from "@/components/custom/blocks/GlobeBlock";

export default function GlobeMinimalDemo() {
  return ;
}`;

export const usageHeatMap = `import { Globe } from "@/components/custom/blocks/GlobeBlock";

export default function GlobeHeatmapDemo() {
  return ;
}`;

## Installation

## Features

Discover the key capabilities of the `Globe` component:

    10 Animated Variants
    Includes dotted sphere, flight arcs, wireframe hologram, particle cloud, day/night lights, geo pinpoints, digital matrix, energy shield, minimal flat 3D, and activity heatmap.

    Interactive Orbit & Drag Controls
    Full 360-degree pointer drag rotation, smooth auto-orbit toggle, and inertia physics.

    3D Connection Arcs & Particles
    Quadratic 3D bézier curve arcs connecting global city coordinates with traveling light pulses.

    60fps HTML5 Canvas Engine
    Zero heavyweight WebGL dependencies — pure HTML5 2D Canvas 3D projection for ultra-fast load times.

## Props Reference

        Prop
        Type
        Default
        Description

        variant
        GlobeVariant
        "interactive-dots"
        Selects from the 10 3D globe animation variants.

        size
        number
        440
        Pixel diameter size for the globe canvas rendering box.

        speed
        number
        1
        Rotation speed multiplier.

        interactive
        boolean
        true
        Enables pointer drag rotation controls.

        glowColor
        string
        "#3b82f6"
        Hex color string for ambient atmosphere glow aura.

        primaryColor
        string
        "#60a5fa"
        Primary color for land points and active arcs.

        markers
        LocationMarker[]
        DEFAULT_CITIES
        Array of geo latitude/longitude city marker objects.

        arcs
        FlightArc[]
        DEFAULT_ARCS
        Array of connection arc route definitions.

---

**Component Path:** `[framework]\globe\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
