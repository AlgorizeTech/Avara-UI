# Cursor Animation

An interactive, 100% full-width and responsive custom cursor component with 10 distinct animation variants including fluid physics, particle trails, magnetic targeting, spotlight masking, and precision crosshairs.

`CursorAnimation` enhances pointer interactions over designated containers with customizable animations, seamless dark mode support, and fluid responsive physics for all devices.

export const usageGlow = `import { CursorAnimation } from "@/components/custom/blocks/CursorAnimationBlock";

export default function GlowCursorDemo() {
  return ;
}`;

export const usageMagnetic = `import { CursorAnimation } from "@/components/custom/blocks/CursorAnimationBlock";

export default function MagneticCursorDemo() {
  return ;
}`;

export const usageTrail = `import { CursorAnimation } from "@/components/custom/blocks/CursorAnimationBlock";

export default function TrailCursorDemo() {
  return ;
}`;

export const usageBadge = `import { CursorAnimation } from "@/components/custom/blocks/CursorAnimationBlock";

export default function BadgeCursorDemo() {
  return ;
}`;

export const usageSpotlight = `import { CursorAnimation } from "@/components/custom/blocks/CursorAnimationBlock";

export default function SpotlightCursorDemo() {
  return ;
}`;

export const usageExpand = `import { CursorAnimation } from "@/components/custom/blocks/CursorAnimationBlock";

export default function ExpandCursorDemo() {
  return ;
}`;

export const usageCrosshair = `import { CursorAnimation } from "@/components/custom/blocks/CursorAnimationBlock";

export default function CrosshairCursorDemo() {
  return ;
}`;

export const usageRing = `import { CursorAnimation } from "@/components/custom/blocks/CursorAnimationBlock";

export default function RingCursorDemo() {
  return ;
}`;

export const usagePulse = `import { CursorAnimation } from "@/components/custom/blocks/CursorAnimationBlock";

export default function PulseCursorDemo() {
  return ;
}`;

export const usageSonar = `import { CursorAnimation } from "@/components/custom/blocks/CursorAnimationBlock";

export default function SonarCursorDemo() {
  return ;
}`;

## Installation

### 1. Install Dependencies

This component uses `lucide-react` for icons and utility helper functions.

```bash
npm install lucide-react
```

### 2. Copy the Component

Create a new file at `components/custom/blocks/CursorAnimationBlock.tsx` and copy the wrapper code from the **Code** tab of the first example above.

## Features

Discover the key interactive capabilities of the `CursorAnimation` block:

    10 Distinct Variants
    Choose from glow, magnetic, particle trail, badge label, spotlight, crosshair, and 4 other fluid styles.

    Fluid Physics & Lerp
    Smooth linear interpolation (LERP) physics ensures natural inertia and responsive cursor tracking.

    100% Full-Width Responsive
    Adapts seamlessly to container boundaries across desktop, tablet, and mobile screens without breaking overflow.

    Dark Mode Native
    Pre-configured with zinc dark mode palettes matching site design tokens and contrast guidelines.

## Best Practices & Guidelines

    Usage Guidelines
    Use CursorAnimation to highlight hero sections, portfolio cards, interactive canvas areas, or custom action areas. Ensure pointer-events are set correctly when layering over interactive text or buttons.

## Props Reference

        Prop
        Type
        Default
        Description

          variant

          "glow" | "magnetic" | "trail" | "badge" | "spotlight" | "expand" | "crosshair" | "ring" | "pulse" | "sonar"

          "glow"
        
        Selects the active cursor animation style and interaction physics.

          label

          string

          "Explore"
        
        Text displayed inside the floating badge pill when variant="badge".

          color

          CursorColor | string

          "primary"
        
        Applies dynamic theme color palettes ("primary" | "indigo" | "rose" | "emerald" | "zinc" or custom hex).

          trailCount

          number

          6
        
        Number of trailing particles rendered when variant="trail".

          className

          string

          ""
        
        Custom Tailwind CSS classes applied to the root container.

          children

          React.ReactNode

          undefined
        
        Custom interactive element content rendered inside the cursor hover zone.

---

**Component Path:** `nextjs\cursor-animation\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
