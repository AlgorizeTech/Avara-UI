---
title: "Shadcn Image Compare"
description: "Shadcn Image Compare. A before-and-after image comparison slider with 10 comparison modes, touch and mouse dragging, custom labels and colours from your theme."
url: https://avaraui.com/docs/nextjs/image-compare
---

# Shadcn Image Compare

A before-and-after image slider with ten handle and reveal styles, label badges, and mouse or touch control.

`ImageCompare` suits photo editing, design variations, AI enhancements and product upgrades.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/image-compare.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/image-compare
```

## Classic Slider

- `beforeImage` and `afterImage` are the two URLs; `beforeLabel` and `afterLabel` caption them.
- `variant="classic-slider"` is the default — a horizontal handle with dual arrows and drag physics.

```tsx
import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function ClassicImageCompareDemo() {
  return <ImageCompare variant="classic-slider" color="primary" className="w-full" />;
}
```

## Split Handle

- Use `variant="split-handle"` for a pill badge handle carrying high-contrast action text.

```tsx
import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function SplitHandleDemo() {
  return <ImageCompare variant="split-handle" color="primary" className="w-full" />;
}
```

## Glowing Divider

- Use `variant="glowing-divider"` for a continuous ambient glow along the split edge.

```tsx
import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function GlowingDividerDemo() {
  return <ImageCompare variant="glowing-divider" color="primary" className="w-full" />;
}
```

## Badge Overlay Percentage

- Use `variant="badge-overlay"` to float a pill showing the drag position as a percentage.

```tsx
import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function BadgeOverlayDemo() {
  return <ImageCompare variant="badge-overlay" color="primary" className="w-full" />;
}
```

## Minimalist Thin Line

- Use `variant="minimal-line"` for an ultra-thin divider with a small centred dot handle.

```tsx
import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function MinimalLineDemo() {
  return <ImageCompare variant="minimal-line" color="primary" className="w-full" />;
}
```

## Hover Pointer Reveal

- Use `variant="hover-reveal"` to follow the pointer directly — no click-and-drag needed.

```tsx
import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function HoverRevealDemo() {
  return <ImageCompare variant="hover-reveal" color="primary" className="w-full" />;
}
```

## Vertical Slide Compare

- Use `variant="vertical-slide"` to split top-to-bottom instead, for height-focused comparisons.

```tsx
import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function VerticalSlideDemo() {
  return <ImageCompare variant="vertical-slide" color="primary" className="w-full" />;
}
```

## Circular Magnifier Lens

- Use `variant="circle-magnifier"` for a circular scope that clips the after image to a lens.

```tsx
import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function CircleMagnifierDemo() {
  return <ImageCompare variant="circle-magnifier" color="primary" className="w-full" />;
}
```

## Glassmorphic Handle

- Use `variant="glass-handle"` for a translucent backdrop-blur pill with layer icons.

```tsx
import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function GlassHandleDemo() {
  return <ImageCompare variant="glass-handle" color="primary" className="w-full" />;
}
```

## Diagonal Diamond Split

- Use `variant="diagonal-split"` for a 45-degree split with a diamond crosshair handle.

```tsx
import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function DiagonalSplitDemo() {
  return <ImageCompare variant="diagonal-split" color="primary" className="w-full" />;
}
```

## About Shadcn Image Compare

**What it is.** **Shadcn Image Compare** (`ImageCompare`) is a before-and-after image comparison component with 10 handle and reveal styles (`classic-slider`, `split-handle`, `glowing-divider`, `badge-overlay`, `minimal-line`, `hover-reveal`, `vertical-slide`, `circle-magnifier`, `glass-handle`, and `diagonal-split`).

**How it is built.** `beforeImage` fills the frame and `afterImage` sits on top, clipped to the handle position, so dragging right (or down in `vertical-slide`) reveals more of the after image. `beforeLabel` and `afterLabel` are the corner badges and the images' `alt` text, and `color` defaults to your theme's `--primary`.

**When to use it.** Use it for AI photo restoration demos, design system light/dark comparisons, retouching portfolios, and hardware/product upgrade showcases.

## For AI agents

**When to use**

- AI photo restoration demos, design system light/dark comparisons
- Retouching portfolios, hardware/product upgrade showcases

**When not to use**

- Browsing many images in sequence: use [Carousel](https://avaraui.com/docs/nextjs/carousel)
- Expanding video panels: use [Video Accordion](https://avaraui.com/docs/nextjs/video-accordion)

**Agent notes**

- `ImageCompare` accepts `beforeImage`, `afterImage`, `beforeLabel`, `afterLabel`, and `variant`.
- Available `variant` values: `"classic-slider" | "split-handle" | "glowing-divider" | "badge-overlay" | "minimal-line" | "hover-reveal" | "vertical-slide" | "circle-magnifier" | "glass-handle" | "diagonal-split"`.
- Supports mouse drag, touch gestures, and pointer-following (`"hover-reveal"`, which listens on the whole window).
- The frame is fixed at 480px tall (560px from `sm`); change it with `className`, for example `h-[360px] sm:h-[420px]` (set both, because the `sm:` class otherwise wins on wider screens).
- No keyboard control or ARIA slider role, so pair it with text that states the difference.
- `"diagonal-split"` is a straight vertical split with a diamond-shaped handle, not a diagonal cut.

**Ask before you pick.** This page has 10 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 10 options as live previews: https://avaraui.com/view/image-compare

**When to use it.** A before-and-after image comparison in ten styles, from a classic drag slider to a hover reveal, a vertical or diagonal split and a circular lens. All take a `beforeImage` and `afterImage` and support captions.

**Gotchas:**

- All ten are looks of the one `image-compare` item: install it once and set `variant` from the index.
- `hover-reveal` follows the pointer, so on touch screens plan for another way to see the comparison.

### The 10 variants

1. **Classic slider** (`classic-slider`): A horizontal handle with dual arrows and drag physics: the default.
   - Live: https://avaraui.com/view/image-compare/classic-slider
   - Best for: a clear before and after that anyone recognises
   - Avoid if: you want a more distinctive handle
   - Traits: dual-arrow handle, drag physics, default look
   - Install: `npx shadcn@latest add @avara-ui/image-compare`
   - Set these props: `{"variant":"classic-slider"}`
   - Docs: https://avaraui.com/docs/nextjs/image-compare#classic-slider
2. **Split handle** (`split-handle`): A pill-badge handle carrying high-contrast action text.
   - Live: https://avaraui.com/view/image-compare/split-handle
   - Best for: a comparison that should tell people what to do
   - Avoid if: you want the handle to disappear into the image
   - Traits: pill handle, text on the handle
   - Install: `npx shadcn@latest add @avara-ui/image-compare`
   - Set these props: `{"variant":"split-handle"}`
   - Docs: https://avaraui.com/docs/nextjs/image-compare#split-handle
3. **Glowing divider** (`glowing-divider`): A continuous ambient glow runs along the split edge.
   - Live: https://avaraui.com/view/image-compare/glowing-divider
   - Best for: dark or dramatic imagery, such as photo enhancement or AI results
   - Avoid if: you want a neutral, understated divider
   - Traits: glowing split edge
   - Install: `npx shadcn@latest add @avara-ui/image-compare`
   - Set these props: `{"variant":"glowing-divider"}`
   - Docs: https://avaraui.com/docs/nextjs/image-compare#glowing-divider
4. **Minimalist thin line** (`minimal-line`): An ultra-thin divider with a small centred dot as the handle.
   - Live: https://avaraui.com/view/image-compare/minimal-line
   - Best for: a clean, editorial look where the images are the focus
   - Avoid if: a small handle would be hard to find or grab
   - Traits: hairline divider, small dot handle
   - Install: `npx shadcn@latest add @avara-ui/image-compare`
   - Set these props: `{"variant":"minimal-line"}`
   - Docs: https://avaraui.com/docs/nextjs/image-compare#minimalist-thin-line
5. **Badge overlay percentage** (`badge-overlay`): A pill floats over the image showing the drag position as a percentage.
   - Live: https://avaraui.com/view/image-compare/badge-overlay
   - Best for: a comparison where the exact amount revealed matters
   - Avoid if: you want nothing on top of the images
   - Traits: percentage pill, live drag position
   - Install: `npx shadcn@latest add @avara-ui/image-compare`
   - Set these props: `{"variant":"badge-overlay"}`
   - Docs: https://avaraui.com/docs/nextjs/image-compare#badge-overlay-percentage
6. **Glassmorphic handle** (`glass-handle`): A translucent, backdrop-blurred pill handle with layer icons.
   - Live: https://avaraui.com/view/image-compare/glass-handle
   - Best for: a modern, glassy interface with rich imagery
   - Avoid if: the page uses flat, solid styling
   - Traits: backdrop-blur handle, layer icons
   - Install: `npx shadcn@latest add @avara-ui/image-compare`
   - Set these props: `{"variant":"glass-handle"}`
   - Docs: https://avaraui.com/docs/nextjs/image-compare#glassmorphic-handle
7. **Hover pointer reveal** (`hover-reveal`): The divider follows the pointer directly, with no click and drag needed.
   - Live: https://avaraui.com/view/image-compare/hover-reveal
   - Best for: a desktop-first page where hovering feels more natural than dragging
   - Avoid if: many visitors are on touch screens
   - Traits: follows the pointer, no dragging
   - Install: `npx shadcn@latest add @avara-ui/image-compare`
   - Set these props: `{"variant":"hover-reveal"}`
   - Docs: https://avaraui.com/docs/nextjs/image-compare#hover-pointer-reveal
8. **Vertical slide compare** (`vertical-slide`): The split runs top to bottom instead of left to right.
   - Live: https://avaraui.com/view/image-compare/vertical-slide
   - Best for: comparisons where height is what changes
   - Avoid if: a left-to-right comparison reads more naturally for your images
   - Traits: top-to-bottom split
   - Install: `npx shadcn@latest add @avara-ui/image-compare`
   - Set these props: `{"variant":"vertical-slide"}`
   - Docs: https://avaraui.com/docs/nextjs/image-compare#vertical-slide-compare
9. **Circular magnifier lens** (`circle-magnifier`): A circular scope clips the after image to a lens.
   - Live: https://avaraui.com/view/image-compare/circle-magnifier
   - Best for: showing detail in one spot, such as retouching or enhancement
   - Avoid if: you want the whole image compared at once
   - Traits: circular lens, after image shown inside the lens
   - Install: `npx shadcn@latest add @avara-ui/image-compare`
   - Set these props: `{"variant":"circle-magnifier"}`
   - Docs: https://avaraui.com/docs/nextjs/image-compare#circular-magnifier-lens
10. **Diagonal diamond split** (`diagonal-split`): A 45-degree split with a diamond crosshair as the handle.
   - Live: https://avaraui.com/view/image-compare/diagonal-split
   - Best for: a bold, graphic comparison
   - Avoid if: you want a conventional straight divider
   - Traits: 45-degree split, diamond crosshair handle
   - Install: `npx shadcn@latest add @avara-ui/image-compare`
   - Set these props: `{"variant":"diagonal-split"}`
   - Docs: https://avaraui.com/docs/nextjs/image-compare#diagonal-diamond-split

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"classic-slider" \| "split-handle" \| "glowing-divider" \| "badge-overlay" \| "minimal-line" \| "hover-reveal" \| "vertical-slide" \| "circle-magnifier" \| "glass-handle" \| "diagonal-split"` | `"classic-slider"` | Selects the image comparison interaction mode and handle style. |
| `beforeImage` | `string` | `built-in sample photo` | URL of the image that fills the frame underneath. It stays visible on the right (or bottom) of the handle. |
| `afterImage` | `string` | `Unsplash Preset` | URL of the image drawn on top and revealed from the left (or top) edge up to the handle. |
| `beforeLabel` | `string` | `"Original"` | Label badge text for the before state image. |
| `afterLabel` | `string` | `"Enhanced"` | Label badge text for the after state image. |
| `initialPosition` | `number` | `50` | Starting position of the handle, as a percentage of the width (0 - 100). In `vertical-slide` it is a percentage of the height. |
| `color` | `ImageCompareColor \| string` | `"primary"` | Accent for the handle and the after badge: `"primary"` (your theme's `--primary`), `"indigo"`, `"rose"`, `"emerald"`, `"zinc"` or a hex string starting with `#`. Other values fall back to `primary`. |
| `className` | `string` | `""` | Classes for the root container, which is full width and 480px tall (560px from `sm`) by default. |

## Works with other components

- Combine `ImageCompare` with [Carousel](https://avaraui.com/docs/nextjs/carousel) to page through several before-and-after pairs.
- [Video Accordion](https://avaraui.com/docs/nextjs/video-accordion) is the option when the media is video panels rather than stills.
- [Image Viewer](https://avaraui.com/docs/nextjs/image-viewer) adds zoom and thumbnails for a single product photo.

## Can users compare images without clicking and dragging in ImageCompare?

Yes. Set `variant="hover-reveal"` and the divider follows the pointer with no press needed. It listens on the whole window, so the position keeps tracking while the cursor is outside the frame, clamped to its edges. `circle-magnifier` also follows the pointer, as a lens.

## Which image shows first, and how do I set the starting position in ImageCompare?

`beforeImage` fills the frame and `afterImage` is revealed from the left edge (the top in `vertical-slide`) up to the handle. Set `initialPosition` from 0 to 100 for where the handle starts. The default is 50, which shows half of each image.

## Does the ImageCompare diagonal-split variant cut at an angle?

No. `diagonal-split` divides the images with a straight vertical edge, like the classic slider, and only the handle differs: a 45-degree rotated diamond with a scan icon. For a split in the other direction, use `vertical-slide`, which divides top to bottom and is dragged up and down.

## How does the ImageCompare circle-magnifier variant work?

`circle-magnifier` shows `afterImage` only inside a 240px circular lens, a 120px radius, that follows the pointer in both axes. Everywhere outside the lens you see `beforeImage`. Press or touch the frame to jump the lens to that spot, then drag.

## How do I change the ImageCompare size and colour?

The frame is 480px tall, or 560px from `sm`, so pass `className` such as `h-[360px] sm:h-[420px]` to resize it; set both, because the `sm:` class otherwise wins on wider screens. `color` takes `primary`, `indigo`, `rose`, `emerald`, `zinc` or a `#` hex string and tints the handle and the after badge.

---

Live previews and every example: https://avaraui.com/docs/nextjs/image-compare
