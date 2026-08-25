# Cursor Animation

An interactive, 100% full-width and responsive custom cursor component with 10 distinct animation variants including fluid physics, particle trails, magnetic targeting, spotlight masking, and precision crosshairs.

`CursorAnimation` enhances pointer interactions over designated containers with customizable animations, seamless dark mode support, and fluid responsive physics for all devices.

export const usageGlow = `import { CursorAnimation, MainContent } from "@/components/custom/blocks/CursorAnimationBlock";

export default function GlowCursorDemo() {
  return (

            Glow Cursor Animation
            Hover and move mouse around to see the soft glow trail

  );
}`;

export const usageMagnetic = `import { CursorAnimation, MainContent } from "@/components/custom/blocks/CursorAnimationBlock";

export default function MagneticCursorDemo() {
  return (

            Magnetic Target Cursor
            Interactive target cursor with fluid magnetic physics

  );
}`;

export const usageTrail = `import { CursorAnimation, MainContent } from "@/components/custom/blocks/CursorAnimationBlock";

export default function TrailCursorDemo() {
  return (

            Particle Trail Cursor
            Dense particle stream following pointer motion

  );
}`;

export const usageBadge = `import { CursorAnimation, MainContent } from "@/components/custom/blocks/CursorAnimationBlock";

export default function BadgeCursorDemo() {
  return (

            Floating Pill Badge Cursor
            Interactive floating text badge tracking the pointer

  );
}`;

export const usageSpotlight = `import { CursorAnimation, MainContent } from "@/components/custom/blocks/CursorAnimationBlock";

export default function SpotlightCursorDemo() {
  return (

            Radial Spotlight Mask Cursor
            Darkens container backdrop outside the cursor focus area

  );
}`;

export const usageExpand = `import { CursorAnimation, MainContent } from "@/components/custom/blocks/CursorAnimationBlock";

export default function ExpandCursorDemo() {
  return (

            Inverted Expand Scaling Cursor
            Scales inverted backdrop circle on hover and click

  );
}`;

export const usageCrosshair = `import { CursorAnimation, MainContent } from "@/components/custom/blocks/CursorAnimationBlock";

export default function CrosshairCursorDemo() {
  return (

            Precision Crosshair Guide Lines
            Draws full-width and full-height guide lines through pointer

  );
}`;

export const usageRing = `import { CursorAnimation, MainContent } from "@/components/custom/blocks/CursorAnimationBlock";

export default function RingCursorDemo() {
  return (

            Smooth Ring Cursor
            Minimal lerped tracking ring that contracts on click

  );
}`;

export const usagePulse = `import { CursorAnimation, MainContent } from "@/components/custom/blocks/CursorAnimationBlock";

export default function PulseCursorDemo() {
  return (

            Radial Aura Pulse Cursor
            Radial aura that pulses around the pointer

  );
}`;

export const usageSonar = `import { CursorAnimation, MainContent } from "@/components/custom/blocks/CursorAnimationBlock";

export default function SonarCursorDemo() {
  return (

            Sonar Wave Concentric Rings
            Two concentric rings sweeping outward in sync with movement

  );
}`;

export const usageImageTrail = `import { CursorAnimation, MainContent } from "@/components/custom/blocks/CursorAnimationBlock";

const sampleImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&q=80",
  "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=300&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&q=80",
  "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=300&q=80",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&q=80",
];

export default function ImageTrailCursorDemo() {
  return (

            Custom Image Trail Cursor
            Move pointer around to spawn custom image cards

  );
}`;

## Installation

## Examples

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

**Component Path:** `[framework]\cursor-animation\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
