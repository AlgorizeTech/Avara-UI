# Magic Bento

A premium grid layout system featuring CSS masking, continuously spinning gradient borders, and a real-time mouse-tracking spotlight effect.

This component uses **Framer Motion**'s `useMotionTemplate` and `useMotionValue`
to track pointer coordinates without triggering heavy React state re-renders,
ensuring the volumetric glows remain silky smooth.

Move your cursor over a card: `MagicBentoCard` tracks the pointer with Framer Motion motion values — not React state — so the 1px border track and inner glow stay smooth.

export const usageDefault = `import {
  MagicBento,
  MagicBentoCard,
} from "@/components/custom/blocks/MagicBentoBlock";

export default function FeatureGrid() {
  return (

        Analytics

      {/* highlight adds the continuously spinning conic border */}

        Collaboration

  );
}`;

export const usageHighlight = `import {
  MagicBento,
  MagicBentoCard,
} from "@/components/custom/blocks/MagicBentoBlock";

export default function HighlightedBento() {
  return (
    
      {/* Without \`highlight\`, the border only lights where the cursor is. */}
      …

      {/* With it, a conic gradient spins behind the mask continuously — use it
          on the one card you want the eye to land on first. */}
      …
    
  );
}`;

## Installation

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

          MagicBento

          children

          ReactNode

          Required

          The MagicBentoCard components to be rendered inside the
          grid ecosystem.

          MagicBento

          className

          string

          undefined

          Custom Tailwind classes to override the default grid layout (e.g.,
          modifying auto-rows to change the baseline height of the
          grid tracks).

          MagicBentoCard

          children

          ReactNode

          Required

          The internal content, text, and visual assets of the individual bento
          card.

          MagicBentoCard

          highlight

          boolean

          false

          When set to true, activates a continuously spinning conic
          gradient behind the 1px content mask, creating a glowing animated
          border for featured cards.

          MagicBentoCard

          className

          string

          undefined

          Used to control the grid spanning and dimensions of the specific card
          (e.g., col-span-1 md:col-span-2 lg:row-span-2).

---

**Component Path:** `[framework]\magic-bento\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
