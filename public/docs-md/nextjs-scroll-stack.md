# Scroll Stack

A premium collection of scroll-driven 3D card stacking layouts engineered exclusively with **GSAP's ScrollTrigger plugin**. As users scroll down the page, feature cards stick to the viewport while the next card slides up to cover them, creating a simulated 3D deck with silky 60fps performance across both light and dark modes.

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

Use the master control panel below to switch between the 4 unique Scroll Stack variations: **Simple**, **Split**, **Sticky**, and **Horizontal**. Scroll down inside the preview box to see the ScrollTrigger plugin orchestrate the deck in real time.

## Installation

### Dependencies

These layouts rely exclusively on **GSAP** and its native `ScrollTrigger` plugin for viewport detection and scroll-scrubbed physics.

```bash
npm install gsap lucide-react
```

### Copy the Component

Select your desired variant (Simple, Split, Sticky, or Horizontal) from the showcase tabs above. Then, open the **Code** tab inside the preview window to copy both the component source code and the implementation example.

## Implementation

```tsx

export default function FeaturesSection() {
  const items = [
    {
      id: "1",
      title: "Real-time Synchronization",
      description: "Instantly sync state across clients.",
      icon: Zap,
      content: Custom Interactive UI 1,
    },
    {
      id: "2",
      title: "Layered Architecture",
      description: "Build robust systems with separated concerns.",
      icon: Layers,
      content: Custom Interactive UI 2,
    },
  ];

  return (

  );
}
```

```tsx

export default function LandingSection() {
  const items = [
    {
      id: "landing",
      stepNumber: "01",
      title: "Landing Page Design",
      description: "We engineer high-converting layouts.",
      tags: ["Conversion Focused", "Figma To Code"],
      cardContent: Custom Visual 1,
    },
  ];

  return (

  );
}
```

```tsx

export default function MobileShowcase() {
  const items = [
    {
      id: "step1",
      title: "Seamless Integration",
      description: "Connect your existing tools with one click.",
      color: "bg-blue-600",
      content: Mobile Screen 1,
    },
  ];

  return (

  );
}
```

```tsx

export default function RoadmapSection() {
  const items = [
    {
      id: "q1",
      title: "Q1 Launch",
      description: "Initial rollout of core features.",
      content: Roadmap Details,
    },
  ];

  return (

  );
}
```

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

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
