# Tilted Card

A deeply interactive, parallax-driven 3D tilt component. It calculates the relative pointer coordinates via Framer Motion's `useMotionValue` to rotate the card along the X and Y axes, mimicking a physical object held in space.

It automatically injects a dynamic, radial glare layer over the content that tracks the light source based on your mouse position to complete the tactile illusion.

## Examples

Hover a card and move the pointer across it — rotation, scale and the radial glare all derive from the cursor's position inside the element. The first example's **Code** tab contains the full component source.

export const usageDefault = `import { TiltedCard } from "@/components/custom/blocks/TiltedCardBlock";

export default function AccessKeyCard() {
  return (

          Access Key

  );
}`;

export const usageIntensity = `// Maximum rotation in degrees on each axis. Keep it under ~25 unless the
// card is small — past that the perspective starts to shear.
{card}`;

export const usageSubtle = `// A restrained tilt for dense layouts where many cards move at once.
{card}`;

export const usageGlare = `// \`glareOpacity\` is the peak alpha of the radial highlight that tracks the
// pointer. Set it to 0 to drop the reflection entirely.
{card}`;

export const usageNoGlare = `{card}`;

export const usageScale = `// How far the card lifts toward the viewer on hover.
{card}`;

## Installation

### Dependencies

This component requires **Framer Motion** for its spring physics and `useTransform` logic.

```bash
npm install framer-motion
```

### Copy the Component

Copy the core engine code from the **Code** tab of the first example above into `components/custom/blocks/TiltedCardBlock.tsx`.

## Features
Discover the key capabilities that make this component an excellent choice for modern, animated user interfaces.

    Fluid Animations
    Hardware-accelerated transitions that ensure smooth 60fps performance across devices.

    Highly Customizable
    Exposes intuitive props for tailoring colors, sizes, and animation speeds to fit your brand.

    Responsive Design
    Automatically adapts to mobile, tablet, and desktop viewports without horizontal scrolling issues.

    Accessible
    Built with semantic HTML and ARIA labels where necessary to support screen readers and keyboard navigation.

## Best Practices & Guidelines

    Animation Performance
    Avoid placing too many heavy animated components on a single screen to prevent layout thrashing and maintain 60fps performance. Use intersection observers to pause off-screen animations.

    State Management
    When triggering animations via state changes, ensure you wrap state updates in startTransition or use lightweight stores to prevent React rendering bottlenecks during the animation tick.

## Props Reference

        Component
        Prop
        Type
        Default
        Description

          TiltedCard

          children

          ReactNode

          Required

          The internal content and visual design of the card to be mapped into
          the 3D space.

          TiltedCard

          tiltIntensity

          number

          15

          The maximum rotational degree the card can reach when the mouse hits
          the absolute edge of the bounding box.

          TiltedCard

          glareOpacity

          number

          0.2

          The maximum opacity (from 0 to 1) of the mouse-tracking radial
          gradient light reflection. Set to 0 to disable the glare.

          TiltedCard

          scaleOnHover

          number

          1.02

          The transform scale multiplier applied to the entire component when
          the mouse enters the bounding box, creating a subtle lift effect.

          TiltedCard

          className

          string

          undefined

          Custom Tailwind CSS classes to apply to the outermost perspective
          wrapper.

---

**Component Path:** `nextjs\tilted-card\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
