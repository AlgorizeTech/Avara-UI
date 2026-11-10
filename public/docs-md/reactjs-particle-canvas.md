---
title: "Shadcn Particle Canvas"
description: "Shadcn Particle Canvas. A 2D canvas component that turns text into thousands of interactive particles that scatter from the pointer and follow your theme…"
url: https://avaraui.com/docs/nextjs/particle-canvas
---

# Shadcn Particle Canvas

An ultra-responsive, high-performance 2D HTML Canvas component that converts text into thousands of interactive particles with fluid, organic repulsion physics matching your active theme color.

Move your cursor or touch across the canvas to push particles away; they scatter organically and spring back smoothly to their original text positions when the pointer moves away.

## For AI agents

**Ask before you pick.** This page has 2 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 2 options as live previews: https://avaraui.com/view/particle-canvas

**When to use it.** A 2D canvas that turns text into thousands of interactive particles in your theme colour, in two looks: particles that scatter from the pointer, or a bottom-aligned wordmark banner with a glow.

**Gotchas:**

- Both are looks of the one `particle-canvas` item: install it once and set `variant` from the index.
- The text comes from the `content` prop in both looks.

### The 2 variants

1. **Text particle repel** (`repel`): The text is made of dots that scatter away from the pointer and spring back to their positions.
   - Live: https://avaraui.com/view/particle-canvas/repel
   - Best for: a hero or showcase where a headline word should react to the cursor or touch
   - Avoid if: you want a quiet, static wordmark
   - Traits: thousands of particles, pointer repulsion, touch support
   - Install: `npx shadcn@latest add @avara-ui/particle-canvas`
   - Set these props: `{"variant":"repel"}`
   - Docs: https://avaraui.com/docs/nextjs/particle-canvas#text-particle-repel
2. **Wordmark glow** (`wordmark-glow`): A compact bottom-aligned wordmark banner whose letters spring in on scroll, with a radial glow that follows the cursor.
   - Live: https://avaraui.com/view/particle-canvas/wordmark-glow
   - Best for: a large wordmark along the bottom of a page or footer area
   - Avoid if: you want the text itself to break apart under the pointer
   - Traits: bottom-aligned banner, scroll-triggered spring letters, cursor-following glow
   - Install: `npx shadcn@latest add @avara-ui/particle-canvas`
   - Set these props: `{"variant":"wordmark-glow"}`
   - Docs: https://avaraui.com/docs/nextjs/particle-canvas#wordmark-glow-canvas

## Text Particle Repel

An interactive 2D HTML Canvas that rasterizes your text into thousands of responsive dots that scatter on pointer hover and spring back smoothly.

- Use `variant="repel"` renders the 2D particle physics engine where dots scatter organically away from the pointer and spring back to their text positions.
- `content="AlgorizeTech"` sets the custom text string to convert into interactive particles.

```tsx
export default function ParticleCanvasDemo() {
  return (
    <div className="relative w-full h-[650px] min-h-max bg-background rounded-xl overflow-hidden flex items-center justify-center border border-border">
      <ParticleCanvas
        variant="repel"
        content="AlgorizeTech"
        particleSize={2.5}
        particleGap={5}
        speed={1}
        className="w-full h-full min-h-[650px]"
      />
    </div>
  );
}
```

## Wordmark Glow Canvas

A bottom-anchored giant wordmark banner where each letter rises with a slow, smooth spring bounce on scroll alongside a pointer-tracking radial glow.

- Use `variant="wordmark-glow"` renders a compact bottom-aligned wordmark banner with staggered scroll-triggered spring bounce letters and a cursor-following radial glow.
- `content="AlgorizeTech"` sets the wordmark text displayed across the bottom of the container.

```tsx
export default function WordmarkGlowDemo() {
  return (
    <div className="relative w-full h-[260px] min-h-max bg-background rounded-xl overflow-hidden flex items-end justify-center border border-border">
      <ParticleCanvas
        variant="wordmark-glow"
        content="AlgorizeTech"
        className="w-full h-full min-h-[260px]"
      />
    </div>
  );
}
```

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

### Theme Adaptive

Automatically resolves and matches the active navigation item background color (`bg-primary`) across Light and Dark mode.

### Organic Physics

Cursor repulsion features staggered particle turbulence and spring-damped return physics for a fluid tactile feel.

### Multi-Device Breakpoints

Automatically scales particle parameters across Small (&lt;768px), Medium (768px-1023px), and Large (&ge;1024px) viewports.

### 60 FPS Canvas

Built with an offscreen sampling engine and efficient 2D rendering loops for maximum performance.

## Best Practices & Guidelines

### Canvas Breakpoint Scaling

Automatically adapts particle parameters based on screen size: Large (&gt;=1024px) uses `particleGap = 5px, particleSize = 2.5px`, MD (768px-1023px) uses `particleGap = 4px, particleSize = 2px`, and Small (&lt;768px) uses `particleGap = 3px, particleSize = 1.5px`.

### Container Height & Layout

Wrap the component in a fixed or responsive height container (e.g. `h-[650px]` or `h-screen`). The canvas automatically resizes to fill 100% of its parent element.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"repel" \| "wordmark-glow"` | `"repel"` | Visual mode. `"repel"` renders 2D particle physics scattering text dots. `"wordmark-glow"` renders an expansive scroll-driven wordmark with dynamic cursor-following radial glow. |
| `content` | `string` | `"AlgorizeTech"` | The text string to convert into animated particles. |
| `particleSize` | `number` | `2.5` | Radius of each particle dot on Large displays (MD uses 2.0px, Small uses 1.5px). |
| `particleGap` | `number` | `5` | Sampling stride gap between dots on Large displays (MD uses 4px, Small uses 3px). |
| `speed` | `number` | `1` | Animation speed multiplier for physics updates. |
| `color` | `string` | `undefined` | Optional particle color. Accepts a preset accent name (`"indigo"`, `"rose"`, `"emerald"`, `"zinc"`, `"amber"`, `"blue"`) or any CSS color string. When omitted (or set to `"primary"` / `"default"`), particles resolve to the active theme's `--primary` color. |
| `backgroundColor` | `string` | `"transparent"` | Canvas container background color. |
| `interactive` | `boolean` | `true` | Enables mouse and touch repulsion tracking. |
| `fontSize` | `number` | `auto` | Font size (px) used to rasterize `content` before sampling. When omitted, it is computed from the canvas size and text length so the text fills the container. |
| `fontFamily` | `string` | `"system-ui, -apple-system, sans-serif"` | CSS font-family used to render the text that particles are sampled from. The text is always drawn bold. |
| `className` | `string` | `undefined` | Extra classes merged onto the wrapper `<div>` (defaults to `relative w-full h-full min-h-[600px]`). All other `HTMLAttributes<HTMLDivElement>` are spread onto the wrapper as well. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/particle-canvas
