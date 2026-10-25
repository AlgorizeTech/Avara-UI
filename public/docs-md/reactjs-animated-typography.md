export const metadata = docsPageMetadata("animated-typography");

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

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/animated-typography.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/animated-typography
```

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

export const usageLetterBounce = `import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

const words = ["Interfaces", "Components", "Experiences"];

export default function LetterBounceShowcase() {
  return (

  );
}`;

export const usageTypewriter = `import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

const words = ["Interfaces", "Components", "Experiences"];

export default function TypewriterShowcase() {
  return (

  );
}`;

export const usageTypewriterFixed = `import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

const words = ["Interfaces", "Components", "Experiences"];

export default function TypewriterFixedShowcase() {
  return (

  );
}`;

export const usageWordFlip = `import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

const words = ["Interfaces", "Components", "Experiences"];

export default function WordFlipShowcase() {
  return (

  );
}`;

export const usageBlurSwap = `import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

const words = ["Interfaces", "Components", "Experiences"];

export default function BlurSwapShowcase() {
  return (

  );
}`;

export const usageBlurRise = `import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

export default function BlurRiseShowcase() {
  return (

  );
}`;

export const usageColorWipe = `import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";

export default function ColorWipeShowcase() {
  return (

  );
}`;

## Features
Discover the key capabilities that make this component an excellent choice for modern, animated user interfaces.

    14 Animation Patterns
    From Matrix decryption to liquid underlines, plus every hero title effect — letter bounce, typewriter, word flip, blur swap, blur rise and color wipe.

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
        
        —
        
          The text content to render, and what screen readers announce. Staggered variants split this string to animate word-by-word or character-by-character.

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
            "split-stagger" | "underline-draw" | "letter-bounce" |
            "typewriter" | "word-flip" | "blur-swap" | "blur-rise" |
            "color-wipe"

          "matrix-scramble"
        
        The 14 animation patterns applied to the text. letter-bounce, typewriter, word-flip and blur-swap rotate through words.

          AnimatedTypographyBlock

          words

          ReactNode[]

          [text]

          The words the rotating variants cycle through. Plain strings animate letter by letter; other nodes move whole. text is still what screen readers announce, so set it to the first word.

          AnimatedTypographyBlock

          interval

          number

          2400

          Milliseconds each word stays on the rotating variants. The typewriter holds a finished word this long instead, 1800 by default.

          AnimatedTypographyBlock

          prefixPosition

          "fixed" | "fluid"

          "fluid" for typewriter, "fixed" otherwise

          Whether the text before the rotating words holds still. fixed reserves the longest word's width; fluid follows the word on show, so a centred line re-centres as the word types, deletes or swaps.

          AnimatedTypographyBlock

          index

          number

          —

          Shows words[index] instead of stepping on a timer — for words kept in step with something else, like a carousel's slides. The typewriter keeps its own time.

          AnimatedTypographyBlock

          children

          ReactNode

          —

          Rich content for blur-rise and color-wipe in place of text, such as a heading with an &lt;em&gt; in it.

          AnimatedTypographyBlock

          play

          boolean

          true

          false renders the text at rest; the animation starts when it turns true. For reveals that wait on scrolling into view.

          AnimatedTypographyBlock

          bare

          boolean

          false

          Drops the block's own weight, size, colour, alignment and padding, so className and the parent set the type — for composing it into a section heading.

          AnimatedTypographyBlock

          titlePrefix / titleSuffix

          string
        
        —
        
          Static text either side of the animated part, e.g. titlePrefix="Build " before a rotating word.

          AnimatedTypographyBlock

          align

          "left" | "center" | "right" | "justify"

          "left"
        
        Controls the CSS text alignment of the underlying container.

---

**Component Path:** `[framework]\animated-typography\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
