# Animated Typography

A highly accessible, semantic typography engine that supports all standard HTML text tags with advanced, staggered visual effects and deep layout controls.

Building animated text that scales responsively and doesn't break screen readers is tricky. Standard staggered character animations often result in screen readers spelling out words letter-by-letter. This `AnimatedTypographyBlock` automatically wraps your content in an `sr-only` tag for assistive technologies, while orchestrating the visual animations on hidden child spans.

It features a **Smart Sizing Engine**. You can maintain semantic SEO value (like rendering an `h1`) but visually override the size using either a Tailwind class (`3xl`) or a hardcoded CSS value (`24px`, `2rem`).

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

## Interactive Showcase

Use the control panel below to test the different semantic tags, alignment options, and the newly added 3D animation variants (`flip-up`, `reveal`, `pop-in`).

## Installation

### Copy the Component

This component is completely dependency-free. It uses dynamic CSS keyframe injection for the specialized animations, and optimized `setInterval` logic for the Typewriter variant to ensure it handles dynamic text wrapping gracefully without causing horizontal scrollbars.

You can copy the full engine code directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/AnimatedTypographyBlock.tsx`.

---

## Usage

Use the `as` prop to define the underlying semantic HTML tag. By default, it applies standard Tailwind typography sizing, but you can override this safely using the `size` prop.

## Implementation

```tsx

export default function LandingHeader() {
  return (
    
      {/* 3D Flip Reveal */}

      {/* Staggered Subheadline with Custom Rem Sizing */}

  );
}
```

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

**Component Path:** `nextjs\animated-typography\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
