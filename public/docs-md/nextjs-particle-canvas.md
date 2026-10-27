export const metadata = docsPageMetadata("particle-canvas");

# Particle Canvas

An ultra-responsive, high-performance 2D HTML Canvas component that converts text into thousands of interactive particles with fluid, organic repulsion physics matching your active theme color.

Move your cursor or touch across the canvas to push particles away; they scatter organically and spring back smoothly to their original text positions when the pointer moves away.

export const usageDefault = `"use client";

export default function ParticleCanvasDemo() {
  return (

  );
}`;

export const usageWordmarkGlow = `"use client";

export default function WordmarkGlowDemo() {
  return (

  );
}`;

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/particle-canvas.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/particle-canvas
```

## Features

Discover the key capabilities that make this component an excellent choice for modern interactive user interfaces.

    Theme Adaptive
    Automatically resolves and matches the active navigation item background color (bg-primary) across Light and Dark mode.

    Organic Physics
    Cursor repulsion features staggered particle turbulence and spring-damped return physics for a fluid tactile feel.

    Multi-Device Breakpoints
    Automatically scales particle parameters across Small (&lt;768px), Medium (768px-1023px), and Large (&ge;1024px) viewports.

    60 FPS Canvas
    Built with an offscreen sampling engine and efficient 2D rendering loops for maximum performance.

## Best Practices & Guidelines

    Canvas Breakpoint Scaling
    Automatically adapts particle parameters based on screen size: Large (&gt;=1024px) uses particleGap = 5px, particleSize = 2.5px, MD (768px-1023px) uses particleGap = 4px, particleSize = 2px, and Small (&lt;768px) uses particleGap = 3px, particleSize = 1.5px.

    Container Height & Layout
    Wrap the component in a fixed or responsive height container (e.g. h-[650px] or h-screen). The canvas automatically resizes to fill 100% of its parent element.

## Props Reference

        Prop
        Type
        Default
        Description

        variant
        "repel" | "wordmark-glow"
        "repel"
        Visual mode. "repel" renders 2D particle physics scattering text dots. "wordmark-glow" renders an expansive scroll-driven wordmark with dynamic cursor-following radial glow.

        content
        string
        "AlgorizeTech"
        The text string to convert into animated particles.

        particleSize
        number
        2.5
        Radius of each particle dot on Large displays (MD uses 2.0px, Small uses 1.5px).

        particleGap
        number
        5
        Sampling stride gap between dots on Large displays (MD uses 4px, Small uses 3px).

        speed
        number
        1
        Animation speed multiplier for physics updates.

        color
        string
        undefined
        Optional particle color. Accepts a preset accent name ("indigo", "rose", "emerald", "zinc", "amber", "blue") or any CSS color string. When omitted (or set to "primary" / "default"), particles resolve to the active theme's --primary color.

        backgroundColor
        string
        "transparent"
        Canvas container background color.

        interactive
        boolean
        true
        Enables mouse and touch repulsion tracking.

        fontSize
        number
        auto
        Font size (px) used to rasterize content before sampling. When omitted, it is computed from the canvas size and text length so the text fills the container.

        fontFamily
        string
        "system-ui, -apple-system, sans-serif"
        CSS font-family used to render the text that particles are sampled from. The text is always drawn bold.

        className
        string
        undefined
        Extra classes merged onto the wrapper &lt;div&gt; (defaults to relative w-full h-full min-h-[600px]). All other HTMLAttributes&lt;HTMLDivElement&gt; are spread onto the wrapper as well.

---

**Component Path:** `[framework]\particle-canvas\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
