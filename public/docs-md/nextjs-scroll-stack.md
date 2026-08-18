# Scroll Stack

A premium collection of scroll-driven 3D card stacking layouts engineered exclusively with **GSAP's ScrollTrigger plugin**. As users scroll down the page, feature cards stick to the viewport while the next card slides up to cover them, creating a simulated 3D deck with silky 60fps performance across both light and dark modes.

## Examples

Four independent scroll-driven layouts share this page, each with its own block file. **Scroll inside a preview box** to drive its ScrollTrigger timeline.

### Simple stack

export const usageSimple = `import { ScrollStack } from "@/components/custom/blocks/ScrollStackBlock";

const items = [
  {
    id: "1",
    title: "Real-time Synchronization",
    description: "Instantly sync state across clients.",
    icon: Zap,
  },
  {
    id: "2",
    title: "Layered Architecture",
    description: "Swap databases or auth providers without a rewrite.",
    icon: Layers,
    content: ,
  },
];

export default function FeaturesSection() {
  return ;
}`;

export const usageSimpleDepth = `import { ScrollStack } from "@/components/custom/blocks/ScrollStackBlock";

export default function DeepStack() {
  // Each card behind the active one shrinks by this fraction — 0.12 gives a
  // pronounced deck, 0.02 keeps the stack nearly flat.
  return ;
}`;

export const usageSimpleGap = `import { ScrollStack } from "@/components/custom/blocks/ScrollStackBlock";

export default function GappedStack() {
  // Pixel distance between the stacked sticky cards.
  return ;
}`;

### Sticky stack

export const usageSticky = `import { StickyScrollStack } from "@/components/custom/blocks/StickyScrollStackBlock";

const items = [
  {
    id: "ui-design",
    title: "UI Design",
    badge: "Visual Identity",
    contentType: "list",
    description: "Interfaces that look deliberate at every breakpoint.",
    listItems: ["Design tokens", "Component specs", "Motion guidelines"],
  },
];

export default function ServicesSection() {
  return (
    
  );
}`;

export const usageStickyNoGlow = `import { StickyScrollStack } from "@/components/custom/blocks/StickyScrollStackBlock";

export default function FlatStickyStack() {
  // Turns off the ambient glow behind the active card.
  return ;
}`;

export const usageStickyGeometry = `import { StickyScrollStack } from "@/components/custom/blocks/StickyScrollStackBlock";

export default function TunedStickyStack() {
  // \`scaleStep\` shrinks each covered card; \`stackOffsetStep\` is the pixel
  // offset that keeps the earlier headers peeking out.
  return ;
}`;

### Split stack

export const usageSplit = `import { SplitScrollStack } from "@/components/custom/blocks/SplitScrollStackBlock";

// One column pins while the other scrolls its stack past it.
export default function ProcessSection() {
  return ;
}`;

export const usageSplitLeft = `import { SplitScrollStack } from "@/components/custom/blocks/SplitScrollStackBlock";

export default function PinnedLeftStack() {
  return (
    
  );
}`;

### Horizontal stack

export const usageHorizontal = `import { HorizontalScrollStack } from "@/components/custom/blocks/HorizontalScrollStackBlock";

const steps = [
  { id: "1", number: "01", title: "Understand", description: "Map the problem." },
  { id: "2", number: "02", title: "Design", description: "Shape the solution." },
];

export default function ProcessRail() {
  return (
    
  );
}`;

export const usageHorizontalShort = `import { HorizontalScrollStack } from "@/components/custom/blocks/HorizontalScrollStackBlock";

export default function ShortRail() {
  // Fewer steps means a shorter pinned scroll distance.
  return ;
}`;

## Installation

Each layout is its own block file. Install only the ones you use — they share no code.

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

        Component / Interface
        Prop
        Type
        Default
        Description

          ScrollStack

          items

          StackItem[]

          Required

          An array of feature card objects defining the sequential stack
          sequence.

          ScrollStack

          depthScale

          number

          0.05

          Controls the scaling mathematics. A value of 0.05 means
          each background card shrinks by 5% as the next card stacks over it via
          GSAP.

          ScrollStack

          cardGap

          number

          24

          The vertical pixel distance applied to the sticky top offset of each
          subsequent card, creating a staggered folder/deck appearance at the
          top of the viewport.

          ScrollStack

          scroller

          string | Element | null

          window

          Optional scrolling viewport target passed directly to GSAP's{" "}
          ScrollTrigger. Essential when rendering the stack inside
          custom overflow containers, modals, or preview boxes instead of the
          native window root.

          ScrollStack

          className

          string

          undefined

          Custom Tailwind CSS classes to apply to the outermost scrolling
          container wrapper.

          StackItem

          id

          string

          Required

          A unique identifier string required for safe React list rendering and
          GSAP key mapping.

          StackItem

          title

          string

          Required

          Primary headline text displayed prominently on the left or top side of
          the card.

          StackItem

          description

          string

          Required

          Detailed paragraph text explaining the feature, displayed beneath the
          headline.

          StackItem

          icon

          React.ElementType

          undefined

          Optional Lucide React icon rendered inside an adaptive badge box above
          the title.

          StackItem

          content

          React.ReactNode

          undefined

          Optional custom JSX/UI payload (e.g., code blocks, interactive graphs,
          mockups) rendered on the right half of the card on desktop viewports.

          StackItem

          color

          string

          "bg-white dark:bg-zinc-900..."

          Optional Tailwind background, text, and border classes applied to the
          card surface (e.g., "bg-indigo-600 text-white"). Omitting
          this allows the card to adapt automatically to light and dark modes.

---

**Component Path:** `nextjs\scroll-stack\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
