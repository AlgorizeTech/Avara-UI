# Marquee

An infinite, seamless scrolling container ideal for logos, testimonials, and image galleries.

This `MarqueeBlock` is engineered to be **flawless**. By exactly duplicating the content and using a precise CSS calculation (`calc(-100% - gap)`), the animation loops infinitely without any stuttering, lagging, or "snap back" resets that plague older implementations.

## Examples

You only supply one set of items — the block duplicates them and offsets the copy by `calc(-100% - gap)`, so the loop never snaps. The first example's **Code** tab contains the full component source.

export const usageDefault = `import { MarqueeBlock } from "@/components/custom/blocks/MarqueeBlock";

const logos = ["Vercel", "Stripe", "Supabase", "Linear", "Figma"];

export default function LogoSection() {
  return (
    
      {logos.map((logo) => (
        
          {logo}
        
      ))}
    
  );
}`;

export const usageRight = `// Reverses the travel; everything else is identical.

  {logos.map((logo) => )}
`;

export const usageVertical = `// Vertical marquees need a bounded height on the container.

  {testimonials.map((t) => )}
`;

export const usageSpeed = `// "slow" | "normal" | "fast", or a raw duration in seconds.

  {images.map((src) => )}
`;

export const usageBare = `// No edge mask, and the loop keeps running under the cursor.

  {logos.map((logo) => )}
`;

## Installation

### Copy the Component

This component relies entirely on injected `@keyframes` and dynamic CSS variables to function, meaning it is **100% dependency-free**.

Copy the full engine code from the **Code** tab of the first example above into `components/custom/blocks/MarqueeBlock.tsx`.

## Props Reference

        Prop
        Type
        Default
        Description

        children
        React.ReactNode
        Required
        One set of items. The block duplicates them internally to close the loop.

        direction
        "left" | "right" | "up" | "down"
        "left"
        Travel direction. Vertical values need a bounded height on the container.

        speed
        "slow" | "normal" | "fast" | number
        "normal"
        Preset pace, or the duration of one full pass in seconds.

        pauseOnHover
        boolean
        false
        Pauses the animation while the pointer is over the marquee.

        fade
        boolean
        false
        Applies a gradient mask-image so items dissolve at both edges.

        gap
        string
        "1rem"
        CSS gap between items. The loop math accounts for it, so any value stays seamless.

---

**Component Path:** `nextjs\marquee\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
