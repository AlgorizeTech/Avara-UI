# Animated Typography

A highly accessible, semantic typography engine that supports all standard HTML text tags with advanced, staggered visual effects and deep layout controls.

Building animated text that scales responsively and doesn't break screen readers is tricky. Standard staggered character animations often result in screen readers spelling out words letter-by-letter. This `AnimatedTypographyBlock` automatically wraps your content in an `sr-only` tag for assistive technologies, while orchestrating the visual animations on hidden child spans.

It features a **Smart Sizing Engine**. You can maintain semantic SEO value (like rendering an `h1`) but visually override the size using either a Tailwind class (`3xl`) or a hardcoded CSS value (`24px`, `2rem`).

Every example remounts when it scrolls into view, so the animation plays. Reach for the reload button in a preview's header to replay it.

export const usageFlipUp = `import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

export default function FlipUpShowcase() {
  return (

  );
}`;

export const usageFadeUp = `import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

export default function FadeUpShowcase() {
  return (

  );
}`;

export const usagePopIn = `import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

export default function PopInShowcase() {
  return (

  );
}`;

export const usageBlurIn = `import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

export default function BlurInShowcase() {
  return (

  );
}`;

export const usageTypewriter = `import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

export default function TypewriterShowcase() {
  return (

  );
}`;

## Installation

## Examples

export const usageWordBounce = `import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

export default function WordBounceShowcase() {
  return (

  );
}`;

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

          AnimatedTypographyBlock

          text

          string

          Required

          The text content to render. Staggered variants (like{" "}
          fade-up or pop-in) automatically split this
          string by spaces to animate word-by-word.

          AnimatedTypographyBlock

          as

            "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" |
            "blockquote"

          "p"

          The semantic HTML tag to render. Automatically applies sensible
          responsive sizing based on the tag unless overridden by the{" "}
          size prop.

          AnimatedTypographyBlock

          variant

            "fade-up" | "reveal" | "flip-up" | "blur-in" | "pop-in" |
            "typewriter" | "glitch" | "glow" | "none"

          "fade-up"
        
        The animation effect applied to the text.

          AnimatedTypographyBlock

          align

          "left" | "center" | "right" | "justify"

          "left"
        
        Controls the CSS text alignment of the underlying container.

          AnimatedTypographyBlock

          size

          string

          undefined

          Overrides the default tag size. Supports Tailwind scale sizes (e.g.,{" "}
          "sm", "3xl") OR standard CSS values (e.g.,{" "}
          "24px", "2rem").

          AnimatedTypographyBlock

          color

            "indigo" | "rose" | "emerald" | "zinc" | "default" | string

          "default"

          The text color. If "default", it inherits the parent
          container's color. Fully supports custom hex codes.

          AnimatedTypographyBlock

          delay

          number

          0

          The initial delay in milliseconds before the animation begins.
          Essential for sequencing multiple typography blocks (e.g., fading a
          subheadline in after the main headline).

          AnimatedTypographyBlock

          speed

          number

          1

          A multiplier for the animation speed. Lower numbers mean faster
          animations (e.g., 0.5 makes the staggered delays run
          twice as fast).

---

**Component Path:** `[framework]\animated-typography\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
