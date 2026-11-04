---
title: "Shadcn Tilted Card"
description: "A 3D tilt card with parallax, adjustable tilt strength, an optional glare and a lift on hover. Free shadcn/ui Tilted Card component for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/tilted-card
---

# Shadcn Tilted Card

A deeply interactive, parallax-driven 3D tilt component. It calculates the relative pointer coordinates and eases the card toward them through a small spring of its own (no animation library) to rotate it along the X and Y axes, mimicking a physical object held in space.

It automatically injects a dynamic, radial glare layer over the content that tracks the light source based on your mouse position to complete the tactile illusion.

Hover a card and move the pointer across it — rotation, scale and the radial glare all derive from the cursor's position inside the element.

## Interactive Tilted Card

Adjust tilt intensity, glare opacity, and hover scale using the interactive controls above to test different design approaches in real-time.

- `tiltIntensity` controls the maximum rotational degree on hover.
- `glareOpacity` sets peak alpha opacity for radial light reflection.
- `scaleOnHover` defines the 3D lift scale multiplier when hovered.

```tsx
import { TiltedCard } from "@/components/custom/blocks/TiltedCardBlock";

// The card face — anything you render inside TiltedCard tilts with it.
const accent = "var(--primary)";
const onAccent = "var(--primary-foreground)";

const card = (
  <div className="w-full h-full bg-gradient-to-br from-card via-card/90 to-muted/80 backdrop-blur-2xl border border-border/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
    <div
      className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[50px] opacity-20 dark:opacity-30 pointer-events-none"
      style={{ backgroundColor: accent }}
    />
    <div
      className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-[60px] opacity-15 dark:opacity-20 pointer-events-none"
      style={{ backgroundColor: accent }}
    />

    <div className="relative z-10 flex justify-between items-start">
      <div
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-sm border border-border/60"
        style={{ backgroundColor: accent, color: onAccent }}
      >
        <Nfc className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground/60" />
    </div>

    <div className="relative z-10 mt-auto">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <Fingerprint className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
        <div className="h-1.5 w-12 sm:w-16 bg-muted rounded-full overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-muted-foreground to-transparent animate-[shimmer_2s_infinite]" />
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight uppercase mb-1 drop-shadow-sm">
        Access Key
      </h3>
      <p className="text-xs sm:text-sm font-medium text-muted-foreground font-mono tracking-widest">
        ID // 0x8F92A
      </p>
    </div>
  </div>
);

export default function AccessKeyCard() {
  return (
    <div className="w-full max-w-[340px] aspect-[3/4] relative z-10">
      <TiltedCard>{card}</TiltedCard>
    </div>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/tilted-card.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/tilted-card
```

## Examples

### Stronger tilt

- `tiltIntensity={35}` is the maximum rotation in degrees on each axis, reached at the edge of the box. Defaults to `15`; past ~25 the perspective starts to shear.

```tsx
import { TiltedCard } from "@/components/custom/blocks/TiltedCardBlock";

// The card face — anything you render inside TiltedCard tilts with it.
const accent = "var(--primary)";
const onAccent = "var(--primary-foreground)";

const card = (
  <div className="w-full h-full bg-gradient-to-br from-card via-card/90 to-muted/80 backdrop-blur-2xl border border-border/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
    <div
      className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[50px] opacity-20 dark:opacity-30 pointer-events-none"
      style={{ backgroundColor: accent }}
    />
    <div
      className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-[60px] opacity-15 dark:opacity-20 pointer-events-none"
      style={{ backgroundColor: accent }}
    />

    <div className="relative z-10 flex justify-between items-start">
      <div
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-sm border border-border/60"
        style={{ backgroundColor: accent, color: onAccent }}
      >
        <Nfc className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground/60" />
    </div>

    <div className="relative z-10 mt-auto">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <Fingerprint className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
        <div className="h-1.5 w-12 sm:w-16 bg-muted rounded-full overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-muted-foreground to-transparent animate-[shimmer_2s_infinite]" />
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight uppercase mb-1 drop-shadow-sm">
        Access Key
      </h3>
      <p className="text-xs sm:text-sm font-medium text-muted-foreground font-mono tracking-widest">
        ID // 0x8F92A
      </p>
    </div>
  </div>
);

export default function StrongTilt() {
  // Maximum rotation in degrees on each axis. Keep it under ~25 unless the
  // card is small — past that the perspective starts to shear.
  return <TiltedCard tiltIntensity={35}>{card}</TiltedCard>;
}
```

### Subtle tilt

- `tiltIntensity={6}` keeps the motion restrained for dense layouts where many cards move at once.

```tsx
import { TiltedCard } from "@/components/custom/blocks/TiltedCardBlock";

// The card face — anything you render inside TiltedCard tilts with it.
const accent = "var(--primary)";
const onAccent = "var(--primary-foreground)";

const card = (
  <div className="w-full h-full bg-gradient-to-br from-card via-card/90 to-muted/80 backdrop-blur-2xl border border-border/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
    <div
      className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[50px] opacity-20 dark:opacity-30 pointer-events-none"
      style={{ backgroundColor: accent }}
    />
    <div
      className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-[60px] opacity-15 dark:opacity-20 pointer-events-none"
      style={{ backgroundColor: accent }}
    />

    <div className="relative z-10 flex justify-between items-start">
      <div
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-sm border border-border/60"
        style={{ backgroundColor: accent, color: onAccent }}
      >
        <Nfc className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground/60" />
    </div>

    <div className="relative z-10 mt-auto">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <Fingerprint className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
        <div className="h-1.5 w-12 sm:w-16 bg-muted rounded-full overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-muted-foreground to-transparent animate-[shimmer_2s_infinite]" />
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight uppercase mb-1 drop-shadow-sm">
        Access Key
      </h3>
      <p className="text-xs sm:text-sm font-medium text-muted-foreground font-mono tracking-widest">
        ID // 0x8F92A
      </p>
    </div>
  </div>
);

export default function SubtleTilt() {
  // A restrained tilt for dense layouts where many cards move at once.
  return (
    <TiltedCard tiltIntensity={6} scaleOnHover={1.01}>
      {card}
    </TiltedCard>
  );
}
```

### Stronger glare

- `glareOpacity={0.55}` is the peak alpha of the radial highlight that tracks the pointer.

```tsx
import { TiltedCard } from "@/components/custom/blocks/TiltedCardBlock";

// The card face — anything you render inside TiltedCard tilts with it.
const accent = "var(--primary)";
const onAccent = "var(--primary-foreground)";

const card = (
  <div className="w-full h-full bg-gradient-to-br from-card via-card/90 to-muted/80 backdrop-blur-2xl border border-border/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
    <div
      className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[50px] opacity-20 dark:opacity-30 pointer-events-none"
      style={{ backgroundColor: accent }}
    />
    <div
      className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-[60px] opacity-15 dark:opacity-20 pointer-events-none"
      style={{ backgroundColor: accent }}
    />

    <div className="relative z-10 flex justify-between items-start">
      <div
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-sm border border-border/60"
        style={{ backgroundColor: accent, color: onAccent }}
      >
        <Nfc className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground/60" />
    </div>

    <div className="relative z-10 mt-auto">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <Fingerprint className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
        <div className="h-1.5 w-12 sm:w-16 bg-muted rounded-full overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-muted-foreground to-transparent animate-[shimmer_2s_infinite]" />
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight uppercase mb-1 drop-shadow-sm">
        Access Key
      </h3>
      <p className="text-xs sm:text-sm font-medium text-muted-foreground font-mono tracking-widest">
        ID // 0x8F92A
      </p>
    </div>
  </div>
);

export default function StrongGlare() {
  // `glareOpacity` is the peak alpha of the radial highlight that tracks the
  // pointer. Set it to 0 to drop the reflection entirely.
  return <TiltedCard glareOpacity={0.55}>{card}</TiltedCard>;
}
```

### Without glare

- Set `glareOpacity={0}` to drop the reflection entirely — right when the card already carries its own lighting.

```tsx
import { TiltedCard } from "@/components/custom/blocks/TiltedCardBlock";

// The card face — anything you render inside TiltedCard tilts with it.
const accent = "var(--primary)";
const onAccent = "var(--primary-foreground)";

const card = (
  <div className="w-full h-full bg-gradient-to-br from-card via-card/90 to-muted/80 backdrop-blur-2xl border border-border/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
    <div
      className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[50px] opacity-20 dark:opacity-30 pointer-events-none"
      style={{ backgroundColor: accent }}
    />
    <div
      className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-[60px] opacity-15 dark:opacity-20 pointer-events-none"
      style={{ backgroundColor: accent }}
    />

    <div className="relative z-10 flex justify-between items-start">
      <div
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-sm border border-border/60"
        style={{ backgroundColor: accent, color: onAccent }}
      >
        <Nfc className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground/60" />
    </div>

    <div className="relative z-10 mt-auto">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <Fingerprint className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
        <div className="h-1.5 w-12 sm:w-16 bg-muted rounded-full overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-muted-foreground to-transparent animate-[shimmer_2s_infinite]" />
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight uppercase mb-1 drop-shadow-sm">
        Access Key
      </h3>
      <p className="text-xs sm:text-sm font-medium text-muted-foreground font-mono tracking-widest">
        ID // 0x8F92A
      </p>
    </div>
  </div>
);

export default function NoGlare() {
  return <TiltedCard glareOpacity={0}>{card}</TiltedCard>;
}
```

### Lift on hover

- `scaleOnHover={1.12}` is how far the card comes toward the viewer on hover.

```tsx
import { TiltedCard } from "@/components/custom/blocks/TiltedCardBlock";

// The card face — anything you render inside TiltedCard tilts with it.
const accent = "var(--primary)";
const onAccent = "var(--primary-foreground)";

const card = (
  <div className="w-full h-full bg-gradient-to-br from-card via-card/90 to-muted/80 backdrop-blur-2xl border border-border/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
    <div
      className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[50px] opacity-20 dark:opacity-30 pointer-events-none"
      style={{ backgroundColor: accent }}
    />
    <div
      className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-[60px] opacity-15 dark:opacity-20 pointer-events-none"
      style={{ backgroundColor: accent }}
    />

    <div className="relative z-10 flex justify-between items-start">
      <div
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-sm border border-border/60"
        style={{ backgroundColor: accent, color: onAccent }}
      >
        <Nfc className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground/60" />
    </div>

    <div className="relative z-10 mt-auto">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <Fingerprint className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
        <div className="h-1.5 w-12 sm:w-16 bg-muted rounded-full overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-muted-foreground to-transparent animate-[shimmer_2s_infinite]" />
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight uppercase mb-1 drop-shadow-sm">
        Access Key
      </h3>
      <p className="text-xs sm:text-sm font-medium text-muted-foreground font-mono tracking-widest">
        ID // 0x8F92A
      </p>
    </div>
  </div>
);

export default function LiftOnHover() {
  // How far the card lifts toward the viewer on hover.
  return <TiltedCard scaleOnHover={1.12}>{card}</TiltedCard>;
}
```

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
| `TiltedCard` | `children` | `ReactNode` | Required | The internal content and visual design of the card to be mapped into the 3D space. |
| `TiltedCard` | `tiltIntensity` | `number` | `15` | The maximum rotational degree the card can reach when the mouse hits the absolute edge of the bounding box. |
| `TiltedCard` | `glareOpacity` | `number` | `0.2` | The maximum opacity (from 0 to 1) of the mouse-tracking radial gradient light reflection. Set to 0 to disable the glare. |
| `TiltedCard` | `scaleOnHover` | `number` | `1.02` | The transform scale multiplier applied to the entire component when the mouse enters the bounding box, creating a subtle lift effect. |
| `TiltedCard` | `className` | `string` | `undefined` | Custom Tailwind CSS classes to apply to the outermost perspective wrapper. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/tilted-card
