---
title: "Magic Bento"
description: "A bento grid layout system featuring CSS masking, continuously spinning gradient borders, and a real-time mouse-tracking spotlight effect."
url: https://avaraui.com/docs/nextjs/magic-bento
---

# Magic Bento

A bento grid layout system featuring CSS masking, continuously spinning gradient borders, and a real-time mouse-tracking spotlight effect.

This component writes pointer coordinates straight into CSS variables
without triggering heavy React state re-renders, ensuring the volumetric
glows remain silky smooth — no animation library needed.

Move your cursor over a card: `MagicBentoCard` tracks the pointer with CSS variables — not React state — so the 1px border track and inner glow stay smooth.

## Glow Spotlight Grid

`MagicBento` lays out the grid; each card owns its own pointer-tracked border and glow.

- `children` of `MagicBento` are the `MagicBentoCard`s — the grid does nothing else.
- `className` on the grid is where `auto-rows-*` goes, which sets the baseline track height.

```tsx
import {
  MagicBento,
  MagicBentoCard,
} from "@/components/custom/blocks/MagicBentoBlock";

export default function FeatureGrid() {
  return (
    <MagicBento className="auto-rows-[220px]">
      <MagicBentoCard className="col-span-1 lg:row-span-1 flex flex-col justify-between">
        <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold">
          <Activity className="w-4 h-4" />
          Insights
        </div>
        <div className="mt-auto">
          <h3 className="text-lg font-semibold text-foreground tracking-tight">
            Analytics
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Track user behavior
          </p>
        </div>
      </MagicBentoCard>

      <MagicBentoCard className="col-span-1 lg:row-span-1 flex flex-col justify-between">
        <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold">
          <Globe2 className="w-4 h-4" />
          Overview
        </div>
        <div className="mt-auto">
          <h3 className="text-lg font-semibold text-foreground tracking-tight">
            Dashboard
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Centralized data view
          </p>
        </div>
      </MagicBentoCard>

      {/* highlight keeps a conic gradient spinning behind the mask */}
      <MagicBentoCard highlight className="col-span-1 row-span-2 md:col-span-2 flex flex-col justify-between">
        <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold">
          <Users className="w-4 h-4" />
          Teamwork
        </div>
        <div className="mt-auto">
          <h3 className="text-2xl font-semibold text-foreground tracking-tight">
            Collaboration
          </h3>
          <p className="text-base text-muted-foreground mt-1">
            Work together seamlessly across the globe
          </p>
        </div>
      </MagicBentoCard>

      <MagicBentoCard className="col-span-1 row-span-2 md:col-span-2 flex flex-col justify-between">
        <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold">
          <Workflow className="w-4 h-4" />
          Efficiency
        </div>
        <div className="mt-auto">
          <h3 className="text-2xl font-semibold text-foreground tracking-tight">
            Automation
          </h3>
          <p className="text-base text-muted-foreground mt-1">
            Streamline workflows and save thousands of hours
          </p>
        </div>
      </MagicBentoCard>

      <MagicBentoCard className="col-span-1 lg:row-span-1 flex flex-col justify-between">
        <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold">
          <Network className="w-4 h-4" />
          Connectivity
        </div>
        <div className="mt-auto">
          <h3 className="text-lg font-semibold text-foreground tracking-tight">
            Integration
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Connect favorite tools
          </p>
        </div>
      </MagicBentoCard>

      <MagicBentoCard className="col-span-1 lg:row-span-1 flex flex-col justify-between">
        <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold">
          <LockKeyhole className="w-4 h-4" />
          Protection
        </div>
        <div className="mt-auto">
          <h3 className="text-lg font-semibold text-foreground tracking-tight">
            Security
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Enterprise-grade protection
          </p>
        </div>
      </MagicBentoCard>
    </MagicBento>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/magic-bento.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/magic-bento
```

## Examples

### Highlight card

- Add `highlight` to spin a conic gradient behind the 1px mask continuously — use it on the one card the eye should land on first. Without it, the border only lights where the cursor is.

```tsx
import {
  MagicBento,
  MagicBentoCard,
} from "@/components/custom/blocks/MagicBentoBlock";

export default function HighlightedBento() {
  return (
    <MagicBento className="lg:grid-cols-2 auto-rows-[240px] max-w-3xl">
      <MagicBentoCard className="flex flex-col justify-between">
        <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold">
          <Activity className="w-4 h-4" />
          Default card
        </div>
        <p className="text-sm text-muted-foreground">
          The border track and inner glow follow the cursor.
        </p>
      </MagicBentoCard>

      <MagicBentoCard highlight className="flex flex-col justify-between">
        <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold">
          <Sparkles className="w-4 h-4" />
          highlight
        </div>
        <p className="text-sm text-muted-foreground">
          Adds a conic gradient that keeps spinning behind the mask,
          cursor or not.
        </p>
      </MagicBentoCard>
    </MagicBento>
  );
}
```

## Theming the glow

Every effect — the spinning `highlight` border, the pointer-tracked border and the inner glow — reads one colour. Out of the box it is your shadcn `--primary`, so the component works with no extra setup. To re-tint a whole grid, set the two CSS variables on any ancestor:

```tsx
<div
  style={{
    "--magic-color": "#6366f1",
    "--magic-glow": "color-mix(in srgb, #6366f1 15%, transparent)",
  } as React.CSSProperties}
>
  <MagicBento>…</MagicBento>
</div>
```

`--magic-glow` is optional — when only `--magic-color` is set, the glow is derived from it at 15% opacity.

## Features
Discover the key capabilities that make this component an excellent choice for modern, animated user interfaces.

### Fluid Animations

Hardware-accelerated transitions that ensure smooth 60fps performance across devices.

### Highly Customizable

Exposes intuitive props for tailoring colors, sizes, and animation speeds to fit your brand.

### Responsive Design

Automatically adapts to mobile, tablet, and desktop viewports without horizontal scrolling issues.

### Accessible

Built with semantic HTML and ARIA labels where necessary to support screen readers and keyboard navigation.

## Best Practices & Guidelines

### Animation Performance

Avoid placing too many heavy animated components on a single screen to prevent layout thrashing and maintain 60fps performance. Use intersection observers to pause off-screen animations.

### State Management

When triggering animations via state changes, ensure you wrap state updates in `startTransition` or use lightweight stores to prevent React rendering bottlenecks during the animation tick.

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `MagicBento` | `children` | `ReactNode` | Required | The `MagicBentoCard` components to be rendered inside the grid ecosystem. |
| `MagicBento` | `className` | `string` | `undefined` | Custom Tailwind classes to override the default grid layout (e.g., modifying `auto-rows` to change the baseline height of the grid tracks). |
| `MagicBentoCard` | `children` | `ReactNode` | Required | The internal content, text, and visual assets of the individual bento card. |
| `MagicBentoCard` | `highlight` | `boolean` | `false` | When set to `true`, activates a continuously spinning conic gradient behind the 1px content mask, creating a glowing animated border for featured cards. |
| `MagicBentoCard` | `className` | `string` | `undefined` | Used to control the grid spanning and dimensions of the specific card (e.g., `col-span-1 md:col-span-2 lg:row-span-2`). |
| CSS variable | `--magic-color` | `<color>` | `var(--primary)` | Colour of the spinning `highlight` border and the pointer-tracked border. Set it on any ancestor to re-tint every card below it. |
| CSS variable | `--magic-glow` | `<color>` | `--magic-color` at 15% | Colour of the soft inner glow that follows the cursor. Defaults to a translucent version of `--magic-color`. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/magic-bento
