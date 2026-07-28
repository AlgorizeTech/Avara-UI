# Scroll Accordion Showcase

A high-impact, scroll-driven interactive section built with full dark/light mode responsiveness, instantaneous `localStorage` theme coloring, and flexible layout options. As users scroll through a sequence of numbered accordion cards, an `IntersectionObserver` expands the active narrative while cross-fading a sticky showcase mockup on the right.

## Interactive Showcase

Scroll through the narrative cards on desktop to experience viewport-triggered expansion and sticky image cross-fading. On small screens, the layout adapts cleanly to a vertically stacked structure.

## Installation

### Dependencies

This component relies on **Framer Motion** for smooth accordion animations and image cross-fading, alongside **Lucide React** for UI icons.

```bash
npm install framer-motion lucide-react
```

### Copy the Component

Copy the core engine code directly from the Component tab in the Interactive Showcase above and place it in components/custom/blocks/ScrollAccordionShowcaseBlock.tsx.

## Usage Architecture

The `` component automatically adapts to dark and light modes, stacks cleanly on mobile viewports, and reads your site's custom primary hex color from localStorage (defaulting to primaryColor).

```tsx

export default function ServicesSection() {
  const items = [
    {
      id: "landing",
      stepNumber: "01",
      title: "Landing Page Design",
      description: "We engineer high-converting layouts with scroll-triggered animations.",
      tags: ["CONVERSION FOCUSED", "FIGMA TO CODE"],
      image: "[https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop](https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop)",
      badgeText: "SELECTED SERVICE",
    },
    {
      id: "saas",
      stepNumber: "02",
      title: "SaaS Development",
      description: "Modular, multi-tenant web applications designed to scale to millions of requests.",
      tags: ["MULTI-TENANT ARCHITECTURE", "REAL-TIME SYNC"],
      image: "[https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop](https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop)",
      badgeText: "SELECTED SERVICE",
    },
  ];

  return (

  );
}
```

## Props Reference

        Component / Interface
        Prop
        Type
        Default
        Description

          ScrollAccordionShowcase

          items

          AccordionShowcaseItem[]

          Required

          An array of data objects defining the numbered step badges, titles,
          narrative descriptions, interactive tags, and paired visual mockup
          images.

          ScrollAccordionShowcase

          displayMode

          "both" | "text-only" | "image-only"

          "both"

          Controls the rendered layout structure. "both" renders
          the two-column grid with JS-driven sticky tracking;{" "}
          "text-only" renders isolated accordion cards;{" "}
          "image-only" renders a horizontal step selector bar above
          the visual showcase card.

          ScrollAccordionShowcase

          defaultIndex

          number

          0

          The initial zero-based index of the accordion card that is expanded
          and highlighted when the component first mounts.

          ScrollAccordionShowcase

          localStorageKey

          string

          "primaryColor"

          The primary storage key string monitored by the instant multi-layer
          detection proxy to synchronize theme colors across tabs,{" "}
          Storage.prototype mutations, and CSS root variables.

          ScrollAccordionShowcase

          defaultAccentColor

          string

          "#FFAB1D"

          The fallback hex color string applied automatically if no valid hex or
          rgb color value is detected in localStorage or CSS root
          variables.

          ScrollAccordionShowcase

          scrollerRef

          React.RefObject&lt;HTMLElement | null&gt;

          undefined

          An optional React ref target passed directly to the internal{" "}
          IntersectionObserver to track scroll progress within a
          custom scrollable container instead of the browser window viewport.

          ScrollAccordionShowcase

          className

          string

          undefined

          Custom Tailwind CSS classes to apply to the outermost section wrapper
          container.

          AccordionShowcaseItem

          id

          string

          Required

          A unique string identifier required for safe React list rendering and
          Framer Motion layout animations.

          AccordionShowcaseItem

          stepNumber

          string

          Required

          A formatted numerical string (e.g., "01",{" "}
          "02") rendered inside the top badge on the accordion card
          and horizontal selector bar.

          AccordionShowcaseItem

          title

          string

          Required

          The primary headline text displayed prominently on the accordion card,
          horizontal selector, and sticky visual showcase badge.

          AccordionShowcaseItem

          description

          string

          Required

          The detailed paragraph text explaining the specific step or service,
          which smoothly expands via Framer Motion when the card becomes active.

          AccordionShowcaseItem

          tags

          string[]

          undefined

          An optional array of keyword strings rendered as uppercase pill badges
          with colored checkmark icons beneath the description when the card
          expands.

          AccordionShowcaseItem

          image

          string

          Required

          The image URL or file path displayed inside the sticky visual mockup
          card, which smoothly cross-fades when the active step changes.

          AccordionShowcaseItem

          badgeText

          string

          "SELECTED SERVICE"

          An optional custom uppercase label rendered inside the floating
          glassmorphic badge at the bottom-left of the sticky visual card.

---

**Component Path:** `nextjs\split-scroll-stepper\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
