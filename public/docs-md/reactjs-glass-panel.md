export const metadata = docsPageMetadata("glass-panel");

# Glass Panel

A frosted surface in four shapes, and the aurora ground it sits on. `GlassBackdrop` washes three colours behind a 12-column bento grid and sets the surface for everything inside; `GlassPanel` is one glass recipe — blur, hairline border, inset highlight — whose `shape` encodes hierarchy: a `slab` for the hero, a `tile` for content, a `disc` for a single number, a `capsule` for chips.

Switch the backdrop to `variant="solid"` and every panel becomes a plain card with an ordinary shadow — nothing inside them changes. Profile Page, Book Appointment and Booking Card are all built on this pair.

export const usageShapes = `import { GlassBackdrop, GlassPanel } from "@/components/custom/blocks/GlassPanelBlock";

export default function Shapes() {
  return (
    
      slab
      tile
      disc
      capsule
    
  );
}`;

export const usageBento = `import { GlassBackdrop, GlassPanel } from "@/components/custom/blocks/GlassPanelBlock";

export default function Bento() {
  return (

        The hero surface
        One recipe, four shapes.

        Lifts on hover and shows a pointer.

        128
        4
        2

        Design systems
        Motion

  );
}`;

export const usageSolid = `import { GlassBackdrop, GlassPanel } from "@/components/custom/blocks/GlassPanelBlock";

export default function Solid() {
  // No glass, no aurora: white cards with a shadow on a flat ground.
  return (

        The hero surface

        Lifts on hover.

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/glass-panel
```

## Examples

## Features

    One recipe, four shapes
    Blur, hairline border and inset highlight are identical on every panel. Only the radius changes, so shape carries meaning instead of decoration.

    Glass or solid, by context
    The backdrop sets the surface once and every panel reads it. Flip a whole page from frosted to flat with one prop; override a single panel when needed.

    Dark mode built in
    The aurora dims and the glass darkens under the dark class; the hairline and highlight keep their contrast on both.

    Nothing but Tailwind
    No animation library, no portal. Spans, padding and inner layout are ordinary utility classes on the panel.

## Props Reference

### GlassBackdrop

        Prop
        Type
        Default
        Description

        variant
        "glass" | "solid"
        "glass"
        Frosted panels over an aurora, or solid white cards with a shadow on a flat ground. Read by every GlassPanel inside.

        aurora
        [string, string, string]
        violet, sky, peach
        Colours of the three blobs behind the glass. Ignored by solid.

        gridClassName
        string
        —
        Classes for the inner grid — row heights (lg:auto-rows-[13rem]), gaps, a max width.

        className
        string
        —
        Add rounded-[36px] inside a container, min-h-dvh when it is the page.

### GlassPanel

        Prop
        Type
        Default
        Description

        shape
        "slab" | "tile" | "disc" | "capsule"
        "tile"
        Corner treatment. disc also forces a square aspect.

        variant
        "glass" | "solid"
        from GlassBackdrop
        Override the backdrop's surface for this one panel.

        interactive
        boolean
        false
        Pointer cursor and a small lift on hover.

        className
        string
        —
        Column span (lg:col-span-8), padding, and layout of the contents.

### useSurface

Returns the enclosing backdrop's `variant` (`"glass"` by default) so your own components can draw differently on each surface. It installs with the component in `glass-panel-context.ts`, next to `GlassPanelBlock.tsx`: `import { useSurface } from "@/components/custom/blocks/glass-panel-context";`.

---

**Component Path:** `[framework]\glass-panel\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
