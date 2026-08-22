# Globe

An interactive 3D Globe component with 9 distinct animation variants matching site theme colors, 3D Canvas physics, holographic wireframes, tactical radar sweeps, and digital matrix code.

`Globe` brings global network activity, real-time analytics, and futuristic visual landing pages to life with high-performance 60fps HTML5 3D rendering.

export const usageInteractiveDots = `import { Globe } from "@/components/custom/blocks/GlobeBlock";

export default function GlobeDotsDemo() {
  return ;
}`;

export const usageHologramWireframe = `import { Globe } from "@/components/custom/blocks/GlobeBlock";

export default function GlobeHologramDemo() {
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

export const usageCyberHex = `import { Globe } from "@/components/custom/blocks/GlobeBlock";

export default function GlobeCyberHexDemo() {
  return ;
}`;

export const usageRadarSweep = `import { Globe } from "@/components/custom/blocks/GlobeBlock";

export default function GlobeRadarDemo() {
  return ;
}`;

export const usageGalaxySpiral = `import { Globe } from "@/components/custom/blocks/GlobeBlock";

export default function GlobeGalaxyDemo() {
  return ;
}`;

## Installation

## Examples

## Features

Discover the key capabilities of the `Globe` component:

    9 Theme-Adaptive Variants
    Includes dotted sphere, wireframe hologram, digital matrix, energy shield, minimal flat 3D, activity heatmap, cyber hex, tactical radar sweep, and galaxy spiral.

    Automatic Website Theme Match
    Dynamically inherits var(--primary) site CSS variables to seamlessly adapt across custom theme colors and light/dark modes.

    Interactive Orbit & Drag Controls
    Full 360-degree pointer drag rotation, smooth auto-orbit toggle, and inertia physics.

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
        Selects from the 9 3D globe animation variants.

        size
        number
        560
        Pixel diameter size for the globe canvas rendering box.

        speed
        number
        1
        Rotation speed multiplier.

        interactive
        boolean
        true
        Enables pointer drag rotation controls.

        primaryColor
        string
        "var(--primary)"
        Primary theme color (CSS variable or hex) for land points and active arcs.

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
