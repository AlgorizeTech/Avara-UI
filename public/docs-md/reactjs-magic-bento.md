export const metadata = docsPageMetadata("magic-bento");

# Magic Bento

A premium grid layout system featuring CSS masking, continuously spinning gradient borders, and a real-time mouse-tracking spotlight effect.

This component writes pointer coordinates straight into CSS variables
without triggering heavy React state re-renders, ensuring the volumetric
glows remain silky smooth — no animation library needed.

Move your cursor over a card: `MagicBentoCard` tracks the pointer with CSS variables — not React state — so the 1px border track and inner glow stay smooth.

export const usageDefault = `import {
  MagicBento,
  MagicBentoCard,
} from "@/components/custom/blocks/MagicBentoBlock";

export default function FeatureGrid() {
  return (

          Insights

            Analytics

            Track user behavior

          Overview

            Dashboard

            Centralized data view

      {/* highlight keeps a conic gradient spinning behind the mask */}

          Teamwork

            Collaboration

            Work together seamlessly across the globe

          Efficiency

            Automation

            Streamline workflows and save thousands of hours

          Connectivity

            Integration

            Connect favorite tools

          Protection

            Security

            Enterprise-grade protection

  );
}`;

export const usageHighlight = `import {
  MagicBento,
  MagicBentoCard,
} from "@/components/custom/blocks/MagicBentoBlock";

export default function HighlightedBento() {
  return (

          Default card

          The border track and inner glow follow the cursor.

          highlight

          Adds a conic gradient that keeps spinning behind the mask,
          cursor or not.

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/magic-bento
```

## Examples

## Theming the glow

Every effect — the spinning `highlight` border, the pointer-tracked border and the inner glow — reads one colour. Out of the box it is your shadcn `--primary`, so the component works with no extra setup. To re-tint a whole grid, set the two CSS variables on any ancestor:

```tsx

  …

```

`--magic-glow` is optional — when only `--magic-color` is set, the glow is derived from it at 15% opacity.

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

          CSS variable

          --magic-color

          &lt;color&gt;

          var(--primary)

          Colour of the spinning highlight border and the
          pointer-tracked border. Set it on any ancestor to re-tint every card
          below it.

          CSS variable

          --magic-glow

          &lt;color&gt;

          --magic-color at 15%

          Colour of the soft inner glow that follows the cursor. Defaults to a
          translucent version of --magic-color.

---

**Component Path:** `[framework]\magic-bento\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
