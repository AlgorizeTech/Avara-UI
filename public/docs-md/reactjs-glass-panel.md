---
title: "Shadcn Glass Panel"
description: "Shadcn Glass Panel. A frosted-glass bento system (`GlassBackdrop`, `GlassPanel`, `useSurface`) with four shape hierarchies (`slab`, `tile`, `disc`."
url: https://avaraui.com/docs/nextjs/glass-panel
---

# Shadcn Glass Panel

A frosted-glass bento system (`GlassBackdrop`, `GlassPanel`, `useSurface`) with four shape hierarchies (`slab`, `tile`, `disc`, `capsule`) and `glass`, `solid`, and `liquid-glass` modes.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/glass-panel.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/glass-panel
```

## Four shapes

The same recipe with four corner treatments. Radius is the only difference, so it reads as hierarchy.

- `shape="slab" | "tile" | "disc" | "capsule"` on `GlassPanel` picks the corner treatment — 32px, 24px, a circle, a pill. `disc` also forces a square aspect so it stays round.
- `GlassBackdrop` is the ground: three blurred blobs and a `grid-cols-1 md:grid-cols-6 lg:grid-cols-12` grid. Span panels with plain Tailwind (`lg:col-span-8`).

```tsx
import { GlassBackdrop, GlassPanel } from "@/components/custom/blocks/GlassPanelBlock";

export default function Shapes() {
  return (
    <GlassBackdrop className="rounded-[36px]">
      <GlassPanel shape="slab" className="h-28 lg:col-span-3">slab</GlassPanel>
      <GlassPanel shape="tile" className="h-28 lg:col-span-3">tile</GlassPanel>
      <GlassPanel shape="disc" className="w-28 lg:col-span-3">disc</GlassPanel>
      <GlassPanel shape="capsule" className="h-12 lg:col-span-3">capsule</GlassPanel>
    </GlassBackdrop>
  );
}
```

## Bento layout

A slab, an interactive tile, three discs and a row of capsules on a custom aurora.

- `aurora` on `GlassBackdrop` takes three CSS colours for the blobs the glass blurs — top-left, top-right, bottom. The panels adapt because they are translucent.
- `interactive` on a `GlassPanel` adds a pointer cursor and a small lift on hover — for panels that open something.

```tsx
import { GlassBackdrop, GlassPanel } from "@/components/custom/blocks/GlassPanelBlock";

export default function Bento() {
  return (
    <GlassBackdrop className="rounded-[36px]" aurora={["#f9a8d4", "#a5b4fc", "#fde68a"]}>
      <GlassPanel shape="slab" className="p-8 lg:col-span-8">
        <h2 className="text-2xl font-semibold tracking-tight">The hero surface</h2>
        <p className="mt-2 text-sm text-foreground/60">One recipe, four shapes.</p>
      </GlassPanel>

      <GlassPanel shape="tile" interactive className="p-6 lg:col-span-4">
        Lifts on hover and shows a pointer.
      </GlassPanel>

      <div className="grid grid-cols-3 gap-4 lg:col-span-6">
        <GlassPanel shape="disc" className="grid place-items-center text-2xl font-semibold">128</GlassPanel>
        <GlassPanel shape="disc" className="grid place-items-center text-2xl font-semibold">4</GlassPanel>
        <GlassPanel shape="disc" className="grid place-items-center text-2xl font-semibold">2</GlassPanel>
      </div>

      <div className="flex flex-wrap gap-2 lg:col-span-6">
        <GlassPanel shape="capsule" className="px-4 py-2 text-sm">Design systems</GlassPanel>
        <GlassPanel shape="capsule" className="px-4 py-2 text-sm">Motion</GlassPanel>
      </div>
    </GlassBackdrop>
  );
}
```

## Solid

The same layout with variant="solid": plain cards with a shadow, no aurora.

- Set `variant="solid"` on `GlassBackdrop` and every panel inside reads it through context. A single `GlassPanel` can override with its own `variant`.

```tsx
import { GlassBackdrop, GlassPanel } from "@/components/custom/blocks/GlassPanelBlock";

export default function Solid() {
  // No glass, no aurora: white cards with a shadow on a flat ground.
  return (
    <GlassBackdrop variant="solid" className="rounded-[var(--radius-3xl,2rem)]">
      <GlassPanel shape="slab" className="p-8 lg:col-span-8">
        <h2 className="text-2xl font-semibold tracking-tight">The hero surface</h2>
      </GlassPanel>
      <GlassPanel shape="tile" interactive className="p-6 lg:col-span-4">
        Lifts on hover.
      </GlassPanel>
    </GlassBackdrop>
  );
}
```

## Liquid glass

The same layout inside a liquid-glass refraction surface with pure white glass elements.

- Set `variant="liquid-glass"` on `GlassBackdrop` for realistic fluid refraction with custom background image support and pure white glass panels.

```tsx
import { GlassBackdrop, GlassPanel } from "@/components/custom/blocks/GlassPanelBlock";

export default function LiquidGlass() {
  return (
    <GlassBackdrop variant="liquid-glass" className="rounded-[var(--radius-3xl,2rem)]">
      <GlassPanel shape="slab" className="p-8 lg:col-span-8">
        <h2 className="text-2xl font-semibold tracking-tight">Liquid glass surface</h2>
        <p className="mt-2 text-sm text-white/80">Refractive fluid SVG filter with pure white glass elements.</p>
      </GlassPanel>

      <GlassPanel shape="tile" interactive className="p-6 lg:col-span-4">
        Frosted glass tile on fluid background.
      </GlassPanel>
    </GlassBackdrop>
  );
}
```

## About Shadcn Glass Panel

**What it is.** `GlassBackdrop` renders an aurora (or `solid` / `liquid-glass`) 12-column bento grid, while `GlassPanel` renders translucent surfaces in four `shape` sizes (`slab`, `tile`, `disc`, `capsule`). `useSurface` exposes the active backdrop variant to child components.

**How it is built.** Built with Tailwind CSS (no animation library or portal) and React Context, so switching `variant` on `GlassBackdrop` updates every nested `GlassPanel` automatically. The `liquid-glass` variant adds an SVG refraction filter from the `ui-liquid-glass` registry item.

**When to use it.** Use `GlassPanel` for bento dashboards, profile pages, and booking cards. For standard bordered cards, use [Card](https://avaraui.com/docs/reactjs/card).

## For AI agents

**When to use**

- Frosted-glass, solid, or liquid-glass 12-column bento layouts (`GlassBackdrop` + `GlassPanel`)

**When not to use**

- Standard bordered cards without a 12-column aurora backdrop — use [Card](https://avaraui.com/docs/reactjs/card)

**Agent notes**

- Named exports: `GlassBackdrop`, `GlassPanel` from `@/components/custom/blocks/GlassPanelBlock`; `useSurface` from `@/components/custom/blocks/glass-panel-context`
- Span panels with Tailwind grid utilities (e.g. `lg:col-span-8`); a single `GlassPanel` can override its parent's `variant`
- `GlassPanel` is a plain `div`: `interactive` only adds a pointer cursor and hover lift, so add your own `onClick`, `role` and `tabIndex` for a real control
- `aurora`, `bgImage`, `wrapperClassName` and `radius` on `GlassBackdrop` apply to specific variants only (see the prop notes)

**Ask before you pick.** This page has 3 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 3 options as live previews: https://avaraui.com/view/glass-panel

**When to use it.** A frosted surface in four shapes plus the aurora backdrop it sits on, laid out on a 12-column bento grid. The backdrop's `variant` decides whether the panels are glass, plain solid cards or liquid glass.

**When to use something else:**

- [Profile Page](https://avaraui.com/docs/reactjs/profile-page): for a finished profile built on this glass surface rather than the raw panels.

**Gotchas:**

- All three are looks of the one `glass-panel` item: install it once and set `variant` on `GlassBackdrop` from the index. Panels read it through context, and a single `GlassPanel` can override it.
- The panel shape (`radius`: 32px, 24px, a circle, a pill) is chosen per panel and is not a separate design.

### The 3 variants

1. **Glass** (`glass`): Translucent frosted panels over three blurred colour blobs: the default.
   - Live: https://avaraui.com/view/glass-panel/glass
   - Best for: a modern dashboard or profile with a soft aurora background
   - Avoid if: you want plain cards without a coloured backdrop
   - Traits: blur and hairline edges, aurora backdrop of three colours, default look
   - Install: `npx shadcn@latest add @avara-ui/glass-panel`
   - Docs: https://avaraui.com/docs/nextjs/glass-panel#bento-layout
2. **Solid** (`solid`): Every panel becomes a plain card with an ordinary shadow; nothing inside them changes.
   - Live: https://avaraui.com/view/glass-panel/solid
   - Best for: a conventional card layout using the same bento grid
   - Avoid if: you want the frosted effect
   - Traits: plain cards, ordinary shadow
   - Install: `npx shadcn@latest add @avara-ui/glass-panel`
   - Set these props: `{"variant":"solid"}`
   - Docs: https://avaraui.com/docs/nextjs/glass-panel#solid
3. **Liquid glass** (`liquid-glass`): Realistic fluid refraction with support for a background image and pure white glass panels.
   - Live: https://avaraui.com/view/glass-panel/liquid-glass
   - Best for: a showpiece layout over a rich background image
   - Avoid if: you want a restrained look or no image behind
   - Traits: fluid refraction, background image support, white glass panels
   - Install: `npx shadcn@latest add @avara-ui/glass-panel`
   - Set these props: `{"variant":"liquid-glass"}`
   - Docs: https://avaraui.com/docs/nextjs/glass-panel#liquid-glass

## Props Reference

### GlassBackdrop

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"glass" \| "solid" \| "liquid-glass"` | `"glass"` | Frosted panels over an aurora, solid white cards with a shadow on a flat ground, or liquid-glass refraction with fluid background. Read by every `GlassPanel` inside. |
| `bgImage` | `string` | — | Background image URL for the `liquid-glass` variant. Other variants ignore it. |
| `wrapperClassName` | `string` | — | Classes for the inner `LiquidGlassWrapper` in the `liquid-glass` variant — controls ratio (defaults to 40% width centered on large screens). |
| `radius` | `string \| number` | — | Rounding radius for the `liquid-glass` image and wrapper (e.g. `"1.5rem"`, `"var(--radius-3xl)"`). A number means pixels. |
| `aurora` | `[string, string, string]` | violet, sky, peach | Colours of the three blobs behind the glass. Ignored by `solid` and `liquid-glass`. |
| `gridClassName` | `string` | — | Classes for the inner grid — row heights (`lg:auto-rows-[13rem]`), gaps, a max width. |
| `className` | `string` | — | Add `rounded-[36px]` inside a container, `min-h-dvh` when it is the page. |

### GlassPanel

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `shape` | `"slab" \| "tile" \| "disc" \| "capsule"` | `"tile"` | Corner treatment. `disc` also forces a square aspect. |
| `variant` | `"glass" \| "solid" \| "liquid-glass"` | from `GlassBackdrop` | Override the backdrop's surface for this one panel. |
| `radius` | `string \| number` | — | Overrides the corner radius set by `shape`. A number means pixels. |
| `interactive` | `boolean` | `false` | Pointer cursor and a small lift on hover. |
| `className` | `string` | — | Column span (`lg:col-span-8`), padding, and layout of the contents. |

### useSurface

Returns the enclosing backdrop's `variant` (`"glass"` by default) so your own components can draw differently on each surface. It installs with the component in `glass-panel-context.ts`, next to `GlassPanelBlock.tsx`: `import { useSurface } from "@/components/custom/blocks/glass-panel-context";`.

## Works with other components

- Powers [Booking Card](https://avaraui.com/docs/reactjs/booking-card), [Book Appointment](https://avaraui.com/docs/reactjs/book-appointment), and [Profile Page](https://avaraui.com/docs/reactjs/profile-page).
- Use [Card](https://avaraui.com/docs/reactjs/card) instead when you want an ordinary bordered card with no aurora.

## What is the difference between the slab, tile, disc and capsule shapes?

They set the corner treatment of a `GlassPanel`. `slab` is the largest radius for hero surfaces, `tile` (the default) suits everyday content, `disc` is a circle with a forced square aspect for a number or icon, and `capsule` is a fully rounded one-line chip.

## How do I change the aurora colours behind GlassPanel?

Pass `aurora` to `GlassBackdrop` as a tuple of three CSS colours for the top-left, top-right and bottom blobs. The defaults are violet, sky and peach. The glass panels blur whatever sits behind them, so they adapt. The `solid` and `liquid-glass` variants ignore `aurora`.

## How do I use the liquid-glass variant with my own image?

Set `variant="liquid-glass"` on `GlassBackdrop` and pass `bgImage` with your image URL. The panels sit in a refraction wrapper that is 40% wide and centred on large screens; change that with `wrapperClassName`, and the corners with `radius`. Text inside is white.

## Is GlassPanel clickable and keyboard accessible?

Not by itself. `GlassPanel` renders a `div`, and `interactive` only adds a pointer cursor and a small lift on hover, which is switched off under `prefers-reduced-motion`. For a real control, add `onClick`, `role="button"` and `tabIndex={0}` yourself, or put a button inside the panel.

## How do child components adapt to glass, solid and liquid-glass modes?

Call `useSurface()` from `@/components/custom/blocks/glass-panel-context` inside any child. It returns the enclosing `GlassBackdrop` `variant`, which is `"glass"`, `"solid"` or `"liquid-glass"`, and `"glass"` when there is no backdrop. Use it to draw your own elements differently on each surface.

---

Live previews and every example: https://avaraui.com/docs/nextjs/glass-panel
