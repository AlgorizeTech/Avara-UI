---
title: "Shadcn Cursor Animation"
description: "Shadcn Cursor Animation. A custom cursor component with 10 animation variants, including fluid physics, particle trails, magnetic targeting."
url: https://avaraui.com/docs/nextjs/cursor-animation
---

# Shadcn Cursor Animation

An interactive, 100% full-width and responsive custom cursor component with 10 distinct animation variants including fluid physics, particle trails, magnetic targeting, spotlight masking, and precision crosshairs.

`CursorAnimation` enhances pointer interactions over designated containers with customizable animations, seamless dark mode support, and fluid responsive physics for all devices.

## For AI agents

**Ask before you pick.** This page has 11 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 11 options as live previews: https://avaraui.com/view/cursor-animation

**When to use it.** A custom cursor that works over a container, in eleven styles: a glow, a magnetic target, trails, a floating label, a spotlight mask, a crosshair, rings, a pulse and a sonar. It is a pointer effect, so it only does anything where there is a mouse or trackpad.

**Gotchas:**

- All eleven are looks of the one `cursor-animation` item: install it once and set `variant` from the index.
- The cursor follows the pointer inside the component, so it adds nothing on touch-only devices.
- `badge` reads a `label` prop (default `Explore`); no other style uses it.

### The 11 variants

1. **Glow** (`glow`): A blurred background glow trails the pointer on smooth physics. The default.
   - Live: https://avaraui.com/view/cursor-animation/glow
   - Best for: a soft, premium hover effect that does not get in the way of content
   - Avoid if: you want the cursor itself to be a precise, visible mark
   - Traits: blurred glow, smooth physics, default look
   - Install: `npx shadcn@latest add @avara-ui/cursor-animation`
   - Set these props: `{"variant":"glow"}`
   - Docs: https://avaraui.com/docs/nextjs/cursor-animation#glow-cursor
2. **Radial pulse** (`pulse`): A radial aura pulses around the pointer.
   - Live: https://avaraui.com/view/cursor-animation/pulse
   - Best for: a lively but gentle effect around the pointer
   - Avoid if: you want something still or precise
   - Traits: pulsing aura
   - Install: `npx shadcn@latest add @avara-ui/cursor-animation`
   - Set these props: `{"variant":"pulse"}`
   - Docs: https://avaraui.com/docs/nextjs/cursor-animation#radial-pulse-cursor
3. **Sonar wave** (`sonar`): Two concentric rings sweep outward in sync with the pointer's movement.
   - Live: https://avaraui.com/view/cursor-animation/sonar
   - Best for: a tech or data-themed page where movement should send out ripples
   - Avoid if: you want a quiet cursor
   - Traits: two concentric rings, reacts to movement
   - Install: `npx shadcn@latest add @avara-ui/cursor-animation`
   - Set these props: `{"variant":"sonar"}`
   - Docs: https://avaraui.com/docs/nextjs/cursor-animation#sonar-wave-cursor
4. **Smooth ring** (`ring`): A minimal ring that follows with a lag and contracts on click.
   - Live: https://avaraui.com/view/cursor-animation/ring
   - Best for: a clean, minimal custom cursor
   - Avoid if: you want the cursor to show or change content
   - Traits: single ring, lerped follow, contracts on click
   - Install: `npx shadcn@latest add @avara-ui/cursor-animation`
   - Set these props: `{"variant":"ring"}`
   - Docs: https://avaraui.com/docs/nextjs/cursor-animation#smooth-ring-cursor
5. **Magnetic target** (`magnetic`): A dashed target ring that rotates as the pointer moves.
   - Live: https://avaraui.com/view/cursor-animation/magnetic
   - Best for: a technical or game-like feel
   - Avoid if: the page is calm and editorial
   - Traits: dashed rotating ring, fluid physics
   - Install: `npx shadcn@latest add @avara-ui/cursor-animation`
   - Set these props: `{"variant":"magnetic"}`
   - Docs: https://avaraui.com/docs/nextjs/cursor-animation#magnetic-target-cursor
6. **Precision crosshair** (`crosshair`): Full-width and full-height guide lines run through the pointer.
   - Live: https://avaraui.com/view/cursor-animation/crosshair
   - Best for: design-tool, data or blueprint styled pages that want a precise feel
   - Avoid if: you want a soft, friendly cursor
   - Traits: full-span guide lines
   - Install: `npx shadcn@latest add @avara-ui/cursor-animation`
   - Set these props: `{"variant":"crosshair"}`
   - Docs: https://avaraui.com/docs/nextjs/cursor-animation#precision-crosshair-cursor
7. **Expand scaling** (`expand`): An inverted backdrop circle that scales up on hover and click.
   - Live: https://avaraui.com/view/cursor-animation/expand
   - Best for: a bold cursor that reacts clearly to interactive elements
   - Avoid if: you want the cursor to stay small and unobtrusive
   - Traits: inverted circle, scales on hover and click
   - Install: `npx shadcn@latest add @avara-ui/cursor-animation`
   - Set these props: `{"variant":"expand"}`
   - Docs: https://avaraui.com/docs/nextjs/cursor-animation#expand-scaling-cursor
8. **Spotlight mask** (`spotlight`): A radial spotlight masks the area, darkening everything the cursor is not on.
   - Live: https://avaraui.com/view/cursor-animation/spotlight
   - Best for: a dramatic focus effect on a hero or showcase
   - Avoid if: people need to read or scan the whole area at once
   - Traits: radial mask, darkens the rest
   - Install: `npx shadcn@latest add @avara-ui/cursor-animation`
   - Set these props: `{"variant":"spotlight"}`
   - Docs: https://avaraui.com/docs/nextjs/cursor-animation#spotlight-mask-cursor
9. **Image trail** (`image-trail`): Image cards spawn centred on the pointer as it moves, leaving a trail.
   - Live: https://avaraui.com/view/cursor-animation/image-trail
   - Best for: a creative or portfolio landing page with images to show
   - Avoid if: you have no images for the trail
   - Traits: spawned image cards, follows movement
   - Install: `npx shadcn@latest add @avara-ui/cursor-animation`
   - Set these props: `{"variant":"image-trail"}`
   - Docs: https://avaraui.com/docs/nextjs/cursor-animation#image-trail-cursor
10. **Particle trail** (`trail`): A trail of particles fades out behind the cursor.
   - Live: https://avaraui.com/view/cursor-animation/trail
   - Best for: a playful, energetic feel
   - Avoid if: you want a calm page, or reduced motion matters to your audience
   - Traits: fading particles
   - Install: `npx shadcn@latest add @avara-ui/cursor-animation`
   - Set these props: `{"variant":"trail"}`
   - Docs: https://avaraui.com/docs/nextjs/cursor-animation#particle-trail-cursor
11. **Badge label** (`badge`): A pill label floats beside the pointer; its text is the `label` prop, default `Explore`.
   - Live: https://avaraui.com/view/cursor-animation/badge
   - Best for: cards or galleries where the cursor should say what a click does, such as View Project
   - Avoid if: you have no short action text to show
   - Traits: floating pill, `label` text
   - Install: `npx shadcn@latest add @avara-ui/cursor-animation`
   - Set these props: `{"variant":"badge"}`
   - Docs: https://avaraui.com/docs/nextjs/cursor-animation#badge-label-cursor

## Image Trail Cursor

- Use `variant="image-trail"` to spawn interactive image cards dynamically centered on pointer movement.
- `color` themes every variant — a named key (`primary`, `indigo`, `rose`, `emerald`, `zinc`) or a hex string.

```tsx
import { CursorAnimation, MainContent } from "@/components/custom/blocks/CursorAnimationBlock";

const sampleImages = [
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_300,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_300,c_limit/v1790148864/photo-1511884642898-4c92249e20b6-1790148865110.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_300,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_300,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_300,c_limit/v1790146210/photo-1472214103451-9374bd1c798e-1790146212205.jpg",
];

export default function ImageTrailCursorDemo() {
  return (
    <CursorAnimation
      variant="image-trail"
      color="primary"
      images={sampleImages}
      className="w-full"
    >
      <MainContent>
        <div className="flex flex-col items-center gap-4 max-w-md mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-primary/30 bg-primary/10 text-primary mx-auto">
            <ImageIcon className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground tracking-tight">Custom Image Trail Cursor</h3>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">Move pointer around to spawn custom image cards</p>
          </div>
        </div>
      </MainContent>
    </CursorAnimation>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/cursor-animation.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/cursor-animation
```

## Examples

### Glow Cursor

- Use `variant="glow"` for a blurred background glow that trails the pointer on smooth physics. It is the default.

```tsx
import { CursorAnimation, MainContent } from "@/components/custom/blocks/CursorAnimationBlock";

export default function GlowCursorDemo() {
  return (
    <CursorAnimation variant="glow" color="primary" className="w-full">
      <MainContent>
        <div className="flex flex-col items-center gap-4 max-w-md mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-primary/30 bg-primary/10 text-primary mx-auto">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground tracking-tight">Glow Cursor Animation</h3>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">Hover and move mouse around to see the soft glow trail</p>
          </div>
        </div>
      </MainContent>
    </CursorAnimation>
  );
}
```

### Magnetic Target Cursor

- Use `variant="magnetic"` for a dashed target ring that rotates as the pointer moves.

```tsx
import { CursorAnimation, MainContent } from "@/components/custom/blocks/CursorAnimationBlock";

export default function MagneticCursorDemo() {
  return (
    <CursorAnimation variant="magnetic" color="primary" className="w-full">
      <MainContent>
        <div className="flex flex-col items-center gap-4 max-w-md mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-primary/30 bg-primary/10 text-primary mx-auto">
            <Target className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground tracking-tight">Magnetic Target Cursor</h3>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">Interactive target cursor with fluid magnetic physics</p>
          </div>
        </div>
      </MainContent>
    </CursorAnimation>
  );
}
```

### Particle Trail Cursor

- Use `variant="trail"` for a trail of particles that fade out behind the cursor.
- `trailCount={6}` sets how many particles trail — only read by this variant.

```tsx
import { CursorAnimation, MainContent } from "@/components/custom/blocks/CursorAnimationBlock";

export default function TrailCursorDemo() {
  return (
    <CursorAnimation variant="trail" color="primary" trailCount={8} className="w-full">
      <MainContent>
        <div className="flex flex-col items-center gap-4 max-w-md mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-primary/30 bg-primary/10 text-primary mx-auto">
            <Zap className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground tracking-tight">Particle Trail Cursor</h3>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">Dense particle stream following pointer motion</p>
          </div>
        </div>
      </MainContent>
    </CursorAnimation>
  );
}
```

### Badge Label Cursor

- Use `variant="badge"` to float a pill label beside the pointer.
- `label="View Project"` is the pill text, defaulting to `Explore`. Only read by this variant.

```tsx
import { CursorAnimation, MainContent } from "@/components/custom/blocks/CursorAnimationBlock";

export default function BadgeCursorDemo() {
  return (
    <CursorAnimation variant="badge" color="primary" label="View Project" className="w-full">
      <MainContent>
        <div className="flex flex-col items-center gap-4 max-w-md mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-primary/30 bg-primary/10 text-primary mx-auto">
            <MousePointer className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground tracking-tight">Floating Pill Badge Cursor</h3>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">Interactive floating text badge tracking the pointer</p>
          </div>
        </div>
      </MainContent>
    </CursorAnimation>
  );
}
```

### Spotlight Mask Cursor

- Use `variant="spotlight"` to mask the area in a radial spotlight, darkening everything the cursor is not on.

```tsx
import { CursorAnimation, MainContent } from "@/components/custom/blocks/CursorAnimationBlock";

export default function SpotlightCursorDemo() {
  return (
    <CursorAnimation variant="spotlight" color="primary" className="w-full">
      <MainContent>
        <div className="flex flex-col items-center gap-4 max-w-md mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-primary/30 bg-primary/10 text-primary mx-auto">
            <Eye className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground tracking-tight">Radial Spotlight Mask Cursor</h3>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">Darkens container backdrop outside the cursor focus area</p>
          </div>
        </div>
      </MainContent>
    </CursorAnimation>
  );
}
```

### Expand Scaling Cursor

- Use `variant="expand"` for an inverted backdrop circle that scales up on hover and click.

```tsx
import { CursorAnimation, MainContent } from "@/components/custom/blocks/CursorAnimationBlock";

export default function ExpandCursorDemo() {
  return (
    <CursorAnimation variant="expand" color="primary" className="w-full">
      <MainContent>
        <div className="flex flex-col items-center gap-4 max-w-md mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-primary/30 bg-primary/10 text-primary mx-auto">
            <Maximize2 className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground tracking-tight">Inverted Expand Scaling Cursor</h3>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">Scales inverted backdrop circle on hover and click</p>
          </div>
        </div>
      </MainContent>
    </CursorAnimation>
  );
}
```

### Precision Crosshair Cursor

- Use `variant="crosshair"` to draw full-width and full-height guide lines through the pointer.

```tsx
import { CursorAnimation, MainContent } from "@/components/custom/blocks/CursorAnimationBlock";

export default function CrosshairCursorDemo() {
  return (
    <CursorAnimation variant="crosshair" color="primary" className="w-full">
      <MainContent>
        <div className="flex flex-col items-center gap-4 max-w-md mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-primary/30 bg-primary/10 text-primary mx-auto">
            <Crosshair className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground tracking-tight">Precision Crosshair Guide Lines</h3>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">Draws full-width and full-height guide lines through pointer</p>
          </div>
        </div>
      </MainContent>
    </CursorAnimation>
  );
}
```

### Smooth Ring Cursor

- Use `variant="ring"` for a minimal lerped ring that contracts on click.

```tsx
import { CursorAnimation, MainContent } from "@/components/custom/blocks/CursorAnimationBlock";

export default function RingCursorDemo() {
  return (
    <CursorAnimation variant="ring" color="primary" className="w-full">
      <MainContent>
        <div className="flex flex-col items-center gap-4 max-w-md mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-primary/30 bg-primary/10 text-primary mx-auto">
            <CircleDot className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground tracking-tight">Smooth Ring Cursor</h3>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">Minimal lerped tracking ring that contracts on click</p>
          </div>
        </div>
      </MainContent>
    </CursorAnimation>
  );
}
```

### Radial Pulse Cursor

- Use `variant="pulse"` for a radial aura that pulses around the pointer.

```tsx
import { CursorAnimation, MainContent } from "@/components/custom/blocks/CursorAnimationBlock";

export default function PulseCursorDemo() {
  return (
    <CursorAnimation variant="pulse" color="primary" className="w-full">
      <MainContent>
        <div className="flex flex-col items-center gap-4 max-w-md mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-primary/30 bg-primary/10 text-primary mx-auto">
            <Radio className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground tracking-tight">Radial Aura Pulse Cursor</h3>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">Radial aura that pulses around the pointer</p>
          </div>
        </div>
      </MainContent>
    </CursorAnimation>
  );
}
```

### Sonar Wave Cursor

- Use `variant="sonar"` for two concentric rings sweeping outward in sync with movement.

```tsx
import { CursorAnimation, MainContent } from "@/components/custom/blocks/CursorAnimationBlock";

export default function SonarCursorDemo() {
  return (
    <CursorAnimation variant="sonar" color="primary" className="w-full">
      <MainContent>
        <div className="flex flex-col items-center gap-4 max-w-md mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-primary/30 bg-primary/10 text-primary mx-auto">
            <Minimize2 className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground tracking-tight">Sonar Wave Concentric Rings</h3>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">Two concentric rings sweeping outward in sync with movement</p>
          </div>
        </div>
      </MainContent>
    </CursorAnimation>
  );
}
```

## Features

Discover the key interactive capabilities of the `CursorAnimation` block:

### 10 Distinct Variants

Choose from glow, magnetic, particle trail, badge label, spotlight, crosshair, and 4 other fluid styles.

### Fluid Physics & Lerp

Smooth linear interpolation (LERP) physics ensures natural inertia and responsive cursor tracking.

### 100% Full-Width Responsive

Adapts seamlessly to container boundaries across desktop, tablet, and mobile screens without breaking overflow.

### Dark Mode Native

Pre-configured with zinc dark mode palettes matching site design tokens and contrast guidelines.

## Best Practices & Guidelines

### Usage Guidelines

Use `CursorAnimation` to highlight hero sections, portfolio cards, interactive canvas areas, or custom action areas. Ensure pointer-events are set correctly when layering over interactive text or buttons.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"glow" \| "magnetic" \| "trail" \| "badge" \| "spotlight" \| "expand" \| "crosshair" \| "ring" \| "pulse" \| "sonar"` | `"glow"` | Selects the active cursor animation style and interaction physics. |
| `label` | `string` | `"Explore"` | Text displayed inside the floating badge pill when `variant="badge"`. |
| `color` | `CursorColor \| string` | `"primary"` | Applies dynamic theme color palettes (`"primary" \| "indigo" \| "rose" \| "emerald" \| "zinc"` or custom hex). |
| `trailCount` | `number` | `6` | Number of trailing particles rendered when `variant="trail"`. |
| `className` | `string` | `""` | Custom Tailwind CSS classes applied to the root container. |
| `children` | `React.ReactNode` | `undefined` | Custom interactive element content rendered inside the cursor hover zone. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/cursor-animation
