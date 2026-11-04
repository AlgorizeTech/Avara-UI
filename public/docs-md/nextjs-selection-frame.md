---
title: "Selection Frame"
description: "That box Figma draws around a selected layer — four corner handles and a crisp accent stroke — wrapped around any text span or block. Free shadcn/ui component."
url: https://avaraui.com/docs/nextjs/selection-frame
---

# Selection Frame

That box Figma draws around a selected layer — four corner handles and a crisp accent stroke — wrapped around any text span or block.

The frame measures its child live with a `ResizeObserver`, so it always fits whatever it wraps, even when the content changes size. Choose square or circle handles, a solid, dashed or long-dash stroke, override the dash pattern directly, and turn on `animated` for marching ants with handles that pop in. Everything respects `prefers-reduced-motion`.

Explore the different variations of the Selection Frame — each example shows a live preview with the exact code to copy.

## Selection Frame

Wrap any span or block — the frame measures it and fits.

- `padding` is the gap in pixels between the content and the frame. `6` here; the default is `4`.

```tsx
import { SelectionFrame } from "@/components/custom/blocks/SelectionFrameBlock";

export default function Headline() {
  return (
    <SelectionFrame padding={6}>
      <span className="text-[28px] font-semibold">Consistent by Default</span>
    </SelectionFrame>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/selection-frame.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/selection-frame
```

## Examples

### Block & radius

Drag the sliders — the frame re-measures and redraws live.

- Set `inline={false}` to make the frame block-level so it can wrap a card, image or layout element and take the full width you give it via `className`.
- `radius` rounds the frame's corners in pixels. The handles stay pinned to the true corner points.

```tsx
import { SelectionFrame } from "@/components/custom/blocks/SelectionFrameBlock";

// inline={false} makes the frame block-level so it can wrap a card, image or
// any other layout element and take its full width.
export default function FramedCard() {
  return (
    <SelectionFrame inline={false} radius={8} padding={8} className="w-full max-w-xs">
      <div className="rounded-xl border border-border bg-card text-card-foreground p-5 space-y-3">
        <div className="h-24 rounded-lg bg-gradient-to-br from-sky-400/70 to-indigo-500/70" />
        <div className="space-y-1.5">
          <p className="text-sm font-semibold">Hero / Cover</p>
          <p className="text-xs text-muted-foreground">1440 × 720 · Auto layout</p>
        </div>
      </div>
    </SelectionFrame>
  );
}
```

## Features
Discover the Selection Frame's capabilities for putting a design-tool spotlight on any element.

### Measures live

A `ResizeObserver` tracks the child, so the frame re-fits when text reflows, fonts load or the content changes.

### Pixel-accurate

The stroke is centred on the frame edge and each handle is centred on the true corner point, so nothing sits a fraction of a pixel off.

### Respects reduced motion

Marching ants are an indefinite loop, so both the march and the handle spring are disabled when the visitor prefers reduced motion.

### Decorative only

The SVG and handles are `aria-hidden` and ignore pointer events — your content stays exactly as readable and clickable as before.

## Best Practices & Guidelines

### Give the frame room

The stroke and handles are drawn outside the child by `padding` pixels (plus half a handle). Leave that much space around the wrapper — an `overflow-hidden` parent will clip the corners.

### Use marching ants sparingly

An endless animation pulls the eye. Reserve `animated` for the one element on screen you actually want people to look at.

## Props Reference

### `<SelectionFrame>` Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | Required | The content to frame; measured live. |
| `handles` | `"square" \| "circle"` | `"square"` | Corner handle shape. |
| `line` | `"solid" \| "dashed" \| "long"` | `"solid"` | Stroke style. `dashed` resolves to dash `[4, 4]`, `long` to `[10, 6]`. |
| `dash` | `[number, number]` | — | Overrides the `[dash, gap]` px pair for `"dashed"` / `"long"`. |
| `animated` | `boolean` | `false` | Marching ants for `"dashed"` / `"long"`; handles always animate in. Disabled under `prefers-reduced-motion`. |
| `color` | `string` | `"var(--primary)"` | Accent colour. Any CSS colour or theme variable. |
| `radius` | `number` | `0` | Frame corner radius in pixels. |
| `padding` | `number` | `4` | Gap in pixels between the content and the frame. |
| `inline` | `boolean` | `true` | Inline (for text spans) vs block-level. |
| `className` | `string` | — | Extra classes for the outer wrapper — e.g. a width when `inline` is `false`. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/selection-frame
