---
title: "Glass Panel"
description: "A frosted surface in four shapes, and the aurora ground it sits on. Free shadcn/ui Glass Panel component for React, Next.js and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/glass-panel
---

# Glass Panel

A frosted surface in four shapes, and the aurora ground it sits on. `GlassBackdrop` washes three colours behind a 12-column bento grid and sets the surface for everything inside; `GlassPanel` is one glass recipe — blur, hairline border, inset highlight — whose `shape` encodes hierarchy: a `slab` for the hero, a `tile` for content, a `disc` for a single number, a `capsule` for chips.

Switch the backdrop to `variant="solid"` and every panel becomes a plain card with an ordinary shadow — nothing inside them changes. [Profile Page](https://avaraui.com/docs/nextjs/profile-page), [Book Appointment](https://avaraui.com/docs/nextjs/book-appointment) and [Booking Card](https://avaraui.com/docs/nextjs/booking-card) are all built on this pair.

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

## Examples

### Bento layout

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

### Solid

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

### Liquid glass

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

## Features

### One recipe, four shapes

Blur, hairline border and inset highlight are identical on every panel. Only the radius changes, so shape carries meaning instead of decoration.

### Glass or solid, by context

The backdrop sets the surface once and every panel reads it. Flip a whole page from frosted to flat with one prop; override a single panel when needed.

### Dark mode built in

The aurora dims and the glass darkens under the dark class; the hairline and highlight keep their contrast on both.

### Nothing but Tailwind

No animation library, no portal. Spans, padding and inner layout are ordinary utility classes on the panel.

## Props Reference

### GlassBackdrop

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"glass" \| "solid" \| "liquid-glass"` | `"glass"` | Frosted panels over an aurora, solid white cards with a shadow on a flat ground, or liquid-glass refraction with fluid background. Read by every `GlassPanel` inside. |
| `bgImage` | `string` | — | Optional custom background image URL for `liquid-glass` variant. |
| `wrapperClassName` | `string` | — | Classes for the inner `LiquidGlassWrapper` — controls ratio (defaults to 40% width centered on large screens). |
| `radius` | `string \| number` | — | Dynamic rounding radius for backdrop and wrapper (e.g. `"1.5rem"`, `"var(--radius-3xl)"`). |
| `aurora` | `[string, string, string]` | violet, sky, peach | Colours of the three blobs behind the glass. Ignored by `solid`. |
| `gridClassName` | `string` | — | Classes for the inner grid — row heights (`lg:auto-rows-[13rem]`), gaps, a max width. |
| `className` | `string` | — | Add `rounded-[36px]` inside a container, `min-h-dvh` when it is the page. |

### GlassPanel

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `shape` | `"slab" \| "tile" \| "disc" \| "capsule"` | `"tile"` | Corner treatment. `disc` also forces a square aspect. |
| `variant` | `"glass" \| "solid"` | from `GlassBackdrop` | Override the backdrop's surface for this one panel. |
| `interactive` | `boolean` | `false` | Pointer cursor and a small lift on hover. |
| `className` | `string` | — | Column span (`lg:col-span-8`), padding, and layout of the contents. |

### useSurface

Returns the enclosing backdrop's `variant` (`"glass"` by default) so your own components can draw differently on each surface. It installs with the component in `glass-panel-context.ts`, next to `GlassPanelBlock.tsx`: `import { useSurface } from "@/components/custom/blocks/glass-panel-context";`.

---

Live previews and every example: https://avaraui.com/docs/nextjs/glass-panel
