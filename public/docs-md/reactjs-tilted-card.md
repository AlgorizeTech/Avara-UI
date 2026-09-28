# Tilted Card

A deeply interactive, parallax-driven 3D tilt component. It calculates the relative pointer coordinates and eases the card toward them through a small spring of its own (no animation library) to rotate it along the X and Y axes, mimicking a physical object held in space.

It automatically injects a dynamic, radial glare layer over the content that tracks the light source based on your mouse position to complete the tactile illusion.

Hover a card and move the pointer across it — rotation, scale and the radial glare all derive from the cursor's position inside the element.

export const cardSource = `// The card face — anything you render inside TiltedCard tilts with it.
const accent = "var(--primary)";
const onAccent = "var(--primary-foreground)";

const card = (

        Access Key

        ID // 0x8F92A

);`;

export const usageDefault = `import { TiltedCard } from "@/components/custom/blocks/TiltedCardBlock";

${cardSource}

export default function AccessKeyCard() {
  return (
    
      {card}
    
  );
}`;

export const usageIntensity = `import { TiltedCard } from "@/components/custom/blocks/TiltedCardBlock";

${cardSource}

export default function StrongTilt() {
  // Maximum rotation in degrees on each axis. Keep it under ~25 unless the
  // card is small — past that the perspective starts to shear.
  return {card};
}`;

export const usageSubtle = `import { TiltedCard } from "@/components/custom/blocks/TiltedCardBlock";

${cardSource}

export default function SubtleTilt() {
  // A restrained tilt for dense layouts where many cards move at once.
  return (
    
      {card}
    
  );
}`;

export const usageGlare = `import { TiltedCard } from "@/components/custom/blocks/TiltedCardBlock";

${cardSource}

export default function StrongGlare() {
  // \`glareOpacity\` is the peak alpha of the radial highlight that tracks the
  // pointer. Set it to 0 to drop the reflection entirely.
  return {card};
}`;

export const usageNoGlare = `import { TiltedCard } from "@/components/custom/blocks/TiltedCardBlock";

${cardSource}

export default function NoGlare() {
  return {card};
}`;

export const usageScale = `import { TiltedCard } from "@/components/custom/blocks/TiltedCardBlock";

${cardSource}

export default function LiftOnHover() {
  // How far the card lifts toward the viewer on hover.
  return {card};
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/tilted-card
```

## Examples

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

**Component Path:** `[framework]\tilted-card\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
