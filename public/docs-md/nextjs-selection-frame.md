---
title: "Shadcn Selection Frame"
description: "That box Figma draws around a selected layer — four corner handles and a crisp accent stroke — wrapped around any text span or block. Free shadcn/ui component."
url: https://avaraui.com/docs/nextjs/selection-frame
---

# Shadcn Selection Frame

That box Figma draws around a selected layer — four corner handles and a crisp accent stroke — wrapped around any text span or block.

The frame measures its child live with a `ResizeObserver`, so it always fits whatever it wraps, even when the content changes size. Choose square or circle handles, a solid, dashed or long-dash stroke, override the dash pattern directly, and turn on `animated` for marching ants with handles that pop in. Everything respects `prefers-reduced-motion`.

Explore the different variations of the Selection Frame — each example shows a live preview with the exact code to copy.

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

## About Shadcn Selection Frame

**What it is.** **Shadcn Selection Frame** (`SelectionFrame`) draws a Figma-style selection bounding box with corner handles and a customizable SVG stroke around any inline span or block element.

**How it is built.** `SelectionFrame` tracks its child with a `ResizeObserver` so the SVG stroke and corner handles stay pixel-accurate across font loads and resizes, marks decorative SVG layers `aria-hidden` with `pointer-events: none`, and disables marching ants under `prefers-reduced-motion`.

**When to use it.** Use it for design-tool callouts, highlighted hero phrases, interactive feature spotlights, and canvas editor demos.

## For AI agents

**When to use**

- Design-tool callouts, highlighted hero phrases
- Interactive feature spotlights, canvas editor demos

**When not to use**

- Animated headline text: use [Animated Typography](https://avaraui.com/docs/nextjs/animated-typography)
- Pointer-following effects: use [Cursor Animation](https://avaraui.com/docs/nextjs/cursor-animation)

**Agent notes**

- `SelectionFrame` wraps any inline or block child and supports `handles` (`"square" | "circle"`), `line` (`"solid" | "dashed" | "long"`), `dash`, `padding`, `radius`, `inline`, `animated`, and `color`.
- Leave `padding` pixels of room around the wrapper and avoid `overflow-hidden` ancestors that could clip corner handles.
- Decorative stroke and handles are `aria-hidden` and ignore pointer events.

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

## Works with other components

Pair `SelectionFrame` with [Animated Typography](https://avaraui.com/docs/nextjs/animated-typography) for kinetic hero callouts, [Cursor Animation](https://avaraui.com/docs/nextjs/cursor-animation) for design-canvas pointer effects, and [Badge](https://avaraui.com/docs/nextjs/verify-badge) for annotated UI highlights.

## How do I add a Figma-style selection box around text in React?

Wrap the text or element in `SelectionFrame`. It draws a stroke with four corner handles around its child and keeps them fitted with a `ResizeObserver`, so the box follows the content when its size changes. By default it is `inline`, which suits spans inside a sentence.

## Can I wrap block-level cards instead of inline text?

Yes. Pass `inline={false}` so `SelectionFrame` behaves as a block container and takes its width from `className`. The default `inline` value is `true`, which is meant for text spans rather than cards or images.

## Why are the corner handles clipped inside a card?

The stroke and handles draw outside the child by `padding` pixels plus half a handle. If a parent has `overflow-hidden` they get cut off, so remove it on immediate parents or leave a little margin around `SelectionFrame`.

## How do I change the handle shape, line style or colour?

Use `handles` for `"square"` or `"circle"` and `line` for `"solid"`, `"dashed"` or `"long"`. Pass a `[dash, gap]` pair to `dash` for a custom pattern. `color` takes any CSS colour or theme variable and defaults to `var(--primary)`.

## Can the frame animate, and does it respect reduced motion?

Set `animated` to get marching-ants motion on `"dashed"` or `"long"` lines. The corner handles always animate in. All of that animation is disabled when the user has `prefers-reduced-motion` turned on.

---

Live previews and every example: https://avaraui.com/docs/nextjs/selection-frame
