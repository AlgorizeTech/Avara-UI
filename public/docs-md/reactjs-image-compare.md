---
title: "Shadcn Image Compare"
description: "Shadcn Image Compare. A before-and-after image comparison slider with 10 comparison modes, touch and mouse dragging, custom labels and colours from your theme."
url: https://avaraui.com/docs/nextjs/image-compare
---

# Shadcn Image Compare

An interactive, responsive image comparison slider component featuring 10 distinct visual comparison modes, fluid touch/mouse drag physics, custom label badges, and dynamic site theme color binding.

`ImageCompare` allows users to seamlessly compare before-and-after visual states for photo editing, design variations, AI enhancements, or product upgrades.

## Classic Slider

- `beforeImage` and `afterImage` are the two URLs; `beforeLabel` and `afterLabel` caption them.
- `variant="classic-slider"` is the default — a horizontal handle with dual arrows and drag physics.

```tsx
import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function ClassicImageCompareDemo() {
  return <ImageCompare variant="classic-slider" color="primary" className="w-full" />;
}
```

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

## Examples

### Split Handle

- Use `variant="split-handle"` for a pill badge handle carrying high-contrast action text.

```tsx
import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function SplitHandleDemo() {
  return <ImageCompare variant="split-handle" color="primary" className="w-full" />;
}
```

### Glowing Divider

- Use `variant="glowing-divider"` for a continuous ambient glow along the split edge.

```tsx
import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function GlowingDividerDemo() {
  return <ImageCompare variant="glowing-divider" color="primary" className="w-full" />;
}
```

### Badge Overlay Percentage

- Use `variant="badge-overlay"` to float a pill showing the drag position as a percentage.

```tsx
import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function BadgeOverlayDemo() {
  return <ImageCompare variant="badge-overlay" color="primary" className="w-full" />;
}
```

### Minimalist Thin Line

- Use `variant="minimal-line"` for an ultra-thin divider with a small centred dot handle.

```tsx
import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function MinimalLineDemo() {
  return <ImageCompare variant="minimal-line" color="primary" className="w-full" />;
}
```

### Hover Pointer Reveal

- Use `variant="hover-reveal"` to follow the pointer directly — no click-and-drag needed.

```tsx
import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function HoverRevealDemo() {
  return <ImageCompare variant="hover-reveal" color="primary" className="w-full" />;
}
```

### Vertical Slide Compare

- Use `variant="vertical-slide"` to split top-to-bottom instead, for height-focused comparisons.

```tsx
import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function VerticalSlideDemo() {
  return <ImageCompare variant="vertical-slide" color="primary" className="w-full" />;
}
```

### Circular Magnifier Lens

- Use `variant="circle-magnifier"` for a circular scope that clips the after image to a lens.

```tsx
import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function CircleMagnifierDemo() {
  return <ImageCompare variant="circle-magnifier" color="primary" className="w-full" />;
}
```

### Glassmorphic Handle

- Use `variant="glass-handle"` for a translucent backdrop-blur pill with layer icons.

```tsx
import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function GlassHandleDemo() {
  return <ImageCompare variant="glass-handle" color="primary" className="w-full" />;
}
```

### Diagonal Diamond Split

- Use `variant="diagonal-split"` for a 45-degree split with a diamond crosshair handle.

```tsx
import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function DiagonalSplitDemo() {
  return <ImageCompare variant="diagonal-split" color="primary" className="w-full" />;
}
```

## Features

### 10 Unique Interaction Variants

Includes classic sliders, split badges, glowing lines, hover reveals, vertical slides, and circular lens scopes.

### 100% Theme Color Engine

Integrates with site primary CSS variable `var(--primary)` or explicit color swatches.

### Touch & Gesture Responsive

Smooth dragging for mobile touch screens, trackpads, and mouse pointers.

### Custom Labels & Images

Pass custom Before/After labels and image URLs through flexible props.

## Best Practices & Guidelines

### When to Use

Use `ImageCompare` to showcase photo retouching, AI enhancement models, design redrafts, dark mode vs light mode UI previews, or product quality upgrades.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"classic-slider" \| "split-handle" \| "glowing-divider" \| "badge-overlay" \| "minimal-line" \| "hover-reveal" \| "vertical-slide" \| "circle-magnifier" \| "glass-handle" \| "diagonal-split"` | `"classic-slider"` | Selects the image comparison interaction mode and handle style. |
| `beforeImage` | `string` | `Unsplash Preset` | URL of the base before image displayed on the left/top. |
| `afterImage` | `string` | `Unsplash Preset` | URL of the enhanced after image revealed by dragging. |
| `beforeLabel` | `string` | `"Original"` | Label badge text for the before state image. |
| `afterLabel` | `string` | `"Enhanced"` | Label badge text for the after state image. |
| `initialPosition` | `number` | `50` | Starting percentage position of the slider handle (0 - 100). |
| `color` | `ImageCompareColor \| string` | `"primary"` | Applies dynamic theme color palettes (`"primary" \| "indigo" \| "rose" \| "emerald" \| "zinc"` or custom hex). |
| `className` | `string` | `""` | Custom Tailwind CSS classes applied to the root container. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/image-compare
