# Animated Typography

A highly accessible, semantic typography engine that supports all standard HTML text tags with advanced, staggered visual effects and deep layout controls.

Building animated text that scales responsively and doesn't break screen readers is tricky. Standard staggered character animations often result in screen readers spelling out words letter-by-letter. This `AnimatedTypographyBlock` automatically wraps your content in an `sr-only` tag for assistive technologies, while orchestrating the visual animations on hidden child spans.

It features a **Smart Sizing Engine**. You can maintain semantic SEO value (like rendering an `h1`) but visually override the size using either a Tailwind class (`3xl`) or a hardcoded CSS value (`24px`, `2rem`).

Every example remounts when it scrolls into view, so the animation plays. Reach for the reload button in a preview's header to replay it.

export const usageMatrix = `import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

export default function MatrixScrambleShowcase() {
  return (

  );
}`;

export const usageWavy = `import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

export default function WavyFloatShowcase() {
  return (

  );
}`;

export const usagePerspective = `import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

export default function PerspectiveFlipShowcase() {
  return (

  );
}`;

export const usageElastic = `import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

export default function ElasticSpringShowcase() {
  return (

  );
}`;

## Installation

## Examples

export const usageSpotlight = `import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

export default function SpotlightRevealShowcase() {
  return (

  );
}`;

export const usageSplit = `import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

export default function SplitStaggerShowcase() {
  return (

  );
}`;

export const usageUnderline = `import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

export default function UnderlineDrawShowcase() {
  return (

  );
}`;

export const usageColorReveal = `import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

export default function ColorRevealShowcase() {
  return (

  );
}`;

## Features
Discover the key capabilities that make this component an excellent choice for modern, animated user interfaces.

    7 Modern Patterns
    Features 7 distinct, non-generic typography animation patterns from Matrix decryption to liquid underlines.

    Highly Accessible
    Automatically renders an sr-only version for screen readers while displaying child visual spans.

    Responsive Sizing
    Supports semantic tags (h1-h6, p) with Tailwind size overrides and pixel/rem custom sizing.

    Hardware Accelerated
    GPU-optimized CSS keyframes and spring physics for smooth 60fps animations.

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

          The text content to render. Staggered variants split this string to animate word-by-word or character-by-character.

          AnimatedTypographyBlock

          as

            "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" |
            "blockquote"

          "p"

          The semantic HTML tag to render.

          AnimatedTypographyBlock

          variant

            "matrix-scramble" | "color-reveal" | "wavy-float" |
            "3d-perspective-flip" | "elastic-spring" | "spotlight-reveal" |
            "split-stagger" | "underline-draw"

          "matrix-scramble"
        
        The 8 distinct animation patterns applied to the text.

          AnimatedTypographyBlock

          align

          "left" | "center" | "right" | "justify"

          "left"
        
        Controls the CSS text alignment of the underlying container.

---

**Component Path:** `[framework]\animated-typography\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
