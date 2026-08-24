# Scroll Accordion Showcase

A high-impact, scroll-driven interactive section built with full dark/light mode responsiveness, instantaneous `localStorage` theme coloring, and flexible layout options. As users scroll through a sequence of numbered accordion cards, an `IntersectionObserver` expands the active narrative while cross-fading a sticky showcase mockup on the right.

Scroll the preview and each row expands as it reaches the reading line, driving the sticky image card beside it. `displayMode` decides which halves of that pairing are rendered.

export const showcaseItems = `const items = [
  {
    id: "landing-page",
    stepNumber: "01",
    title: "Landing Page Design",
    description:
      "Most landing pages fail quietly. Traffic comes in, nothing happens, and budgets burn. We engineer high-converting layouts with strategic visual hierarchy and micro-interactions.",
    tags: [
      "CONVERSION FOCUSED DESIGN",
      "FIGMA TO CODE CONVERSION",
      "MOBILE FIRST RESPONSIVE",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    badgeText: "SELECTED SERVICE",
  },
  {
    id: "saas-dev",
    stepNumber: "02",
    title: "SaaS Product Development",
    description:
      "Modular, multi-tenant web applications designed to scale from your first 1,000 users to millions of daily requests without refactoring your core backend architecture.",
    tags: [
      "MULTI-TENANT ARCHITECTURE",
      "REAL-TIME SYNC",
      "EDGE COMPUTED API",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    badgeText: "SELECTED SERVICE",
  },
  {
    id: "ai-product",
    stepNumber: "03",
    title: "AI Product Development",
    description:
      "Building an AI product is not about plugging in an API and hoping for the best. We build custom retrieval pipelines, fine-tuned models, and intuitive streaming UI interfaces.",
    tags: [
      "CUSTOM RAG PIPELINES",
      "STREAMING RESPONSES",
      "VECTOR DATABASE SETUP",
    ],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    badgeText: "SELECTED SERVICE",
  },
  {
    id: "web-app",
    stepNumber: "04",
    title: "Web App Development",
    description:
      "There is a massive difference between a static website and a mission-critical web application. We deliver complex dashboards, data tables, and secure portal architectures.",
    tags: [
      "SERVER-SIDE RENDERING",
      "ROLE-BASED ACCESS CONTROL",
      "REAL-TIME NOTIFICATIONS",
    ],
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1200&auto=format&fit=crop",
    badgeText: "SELECTED SERVICE",
  },
];`;

export const usageDefault = `import { ScrollAccordionShowcase } from "@/components/custom/blocks/ScrollAccordionShowcaseBlock";

${showcaseItems}

export default function ServicesShowcase() {
  return (
    
  );
}`;

export const usageTextOnly = `import { ScrollAccordionShowcase } from "@/components/custom/blocks/ScrollAccordionShowcaseBlock";

${showcaseItems}

export default function TextOnlyShowcase() {
  // "text-only" drops the sticky image column and lets the accordion
  // run full width — useful for an FAQ or a process list.
  return ;
}`;

export const usageImageOnly = `import { ScrollAccordionShowcase } from "@/components/custom/blocks/ScrollAccordionShowcaseBlock";

${showcaseItems}

export default function ImageOnlyShowcase() {
  // "image-only" keeps the scroll-driven visual and hides the copy.
  return ;
}`;

export const usageDefaultIndex = `import { ScrollAccordionShowcase } from "@/components/custom/blocks/ScrollAccordionShowcaseBlock";

${showcaseItems}

export default function ShowcaseStartingOnThird() {
  // defaultIndex picks which row is open before the user scrolls.
  return ;
}`;

## Installation

### Accent color

The accent is resolved at runtime, so it adopts your site's primary color with no configuration. The component reads a hex from `localStorage` (any key starting with `localStorageKey`), then the `--primary-color` / `--primary` / `--theme-color` CSS variables, and only falls back to `defaultAccentColor` if neither is set.

## Examples

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

**Component Path:** `[framework]\split-scroll-stepper\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
