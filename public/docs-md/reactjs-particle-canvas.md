---
title: "Shadcn Particle Canvas"
description: "Shadcn Particle Canvas. A 2D canvas component that turns text into thousands of interactive particles that scatter from the pointer and follow your theme…"
url: https://avaraui.com/docs/nextjs/particle-canvas
---

# Shadcn Particle Canvas

An ultra-responsive, high-performance 2D HTML Canvas component that converts text into thousands of interactive particles with fluid, organic repulsion physics matching your active theme color.

Move your cursor or touch across the canvas to push particles away; they scatter organically and spring back smoothly to their original text positions when the pointer moves away.

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

## Text Particle Repel

Your text rasterised into thousands of dots that scatter away from the pointer and spring back.

- Use `variant="repel"` runs the particle physics where dots scatter from the pointer and return to their text positions.
- `content="AlgorizeTech"` is the text turned into particles.

```tsx
import { ParticleCanvas } from "@/components/custom/blocks/ParticleCanvasBlock";

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

A giant bottom-anchored wordmark whose letters rise with a slow spring bounce on scroll, beside a pointer-tracking radial glow.

- Use `variant="wordmark-glow"` renders the compact wordmark banner with staggered scroll-triggered letters and a cursor glow.
- `content="AlgorizeTech"` is the wordmark text across the bottom of the container.

```tsx
import { ParticleCanvas } from "@/components/custom/blocks/ParticleCanvasBlock";

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

## About Shadcn Particle Canvas

**What it is.** **Shadcn Particle Canvas** (`ParticleCanvas`) is a 2D HTML Canvas text-to-particle component with cursor repulsion physics (`variant="repel"`) and a scroll-triggered spring wordmark banner (`variant="wordmark-glow"`).

**How it is built.** `ParticleCanvas` rasterizes `content` via an offscreen canvas, reads the theme's `--primary` CSS variable (so it follows light and dark mode), and automatically tunes `particleGap` and `particleSize` across Small, Medium, and Large viewports.

**When to use it.** Use it for interactive hero sections, agency landing footers, brand wordmark banners, and playful 404 or launch pages.

## For AI agents

**When to use**

- Interactive hero sections, agency landing footers
- Brand wordmark banners, playful 404 or launch pages

**When not to use**

- A pointer-following effect: use [Cursor Animation](https://avaraui.com/docs/reactjs/cursor-animation)
- Ordinary animated headline text: use [Animated Typography](https://avaraui.com/docs/reactjs/animated-typography)

**Agent notes**

- `ParticleCanvas` accepts `content` (string), `variant` (`"repel" | "wordmark-glow"`), `particleSize`, `particleGap`, `speed`, and `className`.
- Wrap `ParticleCanvas` in a sized container (for example `h-[650px]` or `h-[260px]`); the canvas fills 100% of its parent.
- Particle size and gap are overridden below a 1024px container width; the colour follows the theme's `--primary` variable unless `color` is set.
- `variant="wordmark-glow"` only reads `content`, `color`, `className` and `style`; `particleSize`, `particleGap`, `speed` and `interactive` apply to `repel` only.

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

## Works with other components

Pair `ParticleCanvas` with [Cursor Animation](https://avaraui.com/docs/reactjs/cursor-animation) for pointer effects over UI cards, [Animated Typography](https://avaraui.com/docs/reactjs/animated-typography) for kinetic headlines, and [Ribbon Drift](https://avaraui.com/docs/reactjs/ribbon-drift) for hero showcase backdrops.

## How should I size the ParticleCanvas container?

Give the parent an explicit height such as `h-[650px]`. The wrapper is `w-full h-full` with a `min-h-[600px]` default for `repel` (`min-h-[240px]` for `wordmark-glow`), so pass a smaller `min-h-[...]` through `className` for short banners. A `ResizeObserver` re-samples the particles when the container size changes.

## Does ParticleCanvas follow light and dark mode?

Yes. It reads the active theme's `--primary` CSS variable through `next-themes` and a `MutationObserver` on `class`, `style` and `data-theme`, then recolours the existing dots without resetting them. So it also follows the Themes page presets. Pass `color` to override that.

## How do I change the ParticleCanvas particle color?

Pass `color` with a preset name such as `"indigo"`, `"rose"` or `"emerald"`, or any CSS color string such as a hex value. Leaving it out, or passing `"primary"` or `"default"`, uses the theme's `--primary` color. In the `wordmark-glow` variant, `color` tints the cursor glow.

## Why are my ParticleCanvas dots smaller or denser on mobile?

`particleSize` and `particleGap` only apply when the container is 1024px wide or more. Under 768px the component uses a 1.5px dot and a gap of 3, and from 768px to 1023px a 2px dot and a gap of 4. The check uses the container width, not the viewport.

## Do particleSize and particleGap work with the wordmark-glow variant?

No. `variant="wordmark-glow"` renders a separate wordmark component that only reads `content`, `color`, `className` and `style`. It scales the text to the container width, between 16px and 340px, and its letters rise in one by one once scrolled into view. Reduced-motion users get them static.

## How do I stop ParticleCanvas reacting to the pointer?

Set `interactive={false}`. That disables the mouse and touch repulsion in the `repel` variant, so the dots stay on the text. The repel loop does not check `prefers-reduced-motion`, so turn `interactive` off, or skip the component, for users who need a calmer page.

---

Live previews and every example: https://avaraui.com/docs/nextjs/particle-canvas
