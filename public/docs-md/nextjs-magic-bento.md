# Magic Bento

A premium grid layout system featuring CSS masking, continuously spinning gradient borders, and a real-time mouse-tracking spotlight effect.

This component uses **Framer Motion**'s `useMotionTemplate` and `useMotionValue`
to track pointer coordinates without triggering heavy React state re-renders,
ensuring the volumetric glows remain silky smooth.

## Interactive Showcase

Move your cursor over the grid below to reveal the interactive 1px border track and inner card glow. The large primary card demonstrates the **Highlight Mode**, executing a continuously spinning conic gradient behind the mask.

## Installation

### Dependencies

This layout block relies on **Framer Motion** to calculate the radial gradient coordinates dynamically.

```bash
npm install framer-motion
```

### Copy the Component

You can copy the full engine code directly from the Component tab in the Interactive Showcase above. Place it in components/custom/blocks/MagicBentoBlock.tsx.

## Usage

Wrap your cards in the `` grid container. You must define the CSS variables --magic-color (for the bright spotlight/border) and --magic-glow (for the soft inner background glow) on a parent wrapper to control the theme.

## Implementation

```tsx

export default function FeatureGrid() {
  return (
    {/* Define the tracking glow colors via CSS Variables */}

        {/* Highlight activates the spinning border */}

          Front-End Architecture
          Highly optimized Next.js environments.

        {/* Standard card without spinning border */}

          Performance

  );
}
```

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

**Component Path:** `nextjs\magic-bento\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
