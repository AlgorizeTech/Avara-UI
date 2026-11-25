---
title: "Scroll Accordion Showcase"
description: "Shadcn Scroll Accordion Showcase. A scroll-driven section of numbered accordion cards: the active step expands as you scroll while a sticky mockup beside it…"
url: https://avaraui.com/docs/nextjs/split-scroll-stepper
---

# Scroll Accordion Showcase

A scroll-driven split showcase (`ScrollAccordionShowcase`) where scrolling expands numbered accordion rows via `IntersectionObserver` and cross-fades a sticky visual card.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/scroll-accordion-showcase.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/scroll-accordion-showcase
```

## Scroll accordion showcase

One row per item; the sticky card follows whichever row is active.

- Pass `items` as `{ id, stepNumber, title, description, image }[]` — `tags` is optional and renders as pill badges when the row expands.

```tsx
import { ScrollAccordionShowcase, type AccordionShowcaseItem } from "@/components/custom/blocks/ScrollAccordionShowcaseBlock";

const items: AccordionShowcaseItem[] = [
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
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1460925895917-afdab827c52f-1790146212204.jpg",
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
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146211/photo-1551288049-bebda4e38f71-1790146212211.jpg",
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
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790148864/photo-1618005182384-a83a8bd57fbe-1790148865111.jpg",
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
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146210/photo-1504639725590-34d0984388bd-1790146212207.jpg",
    badgeText: "SELECTED SERVICE",
  },
];

export default function ServicesShowcase() {
  return (
    <ScrollAccordionShowcase
      items={items}
      displayMode="both"
      localStorageKey="primaryColor"
    />
  );
}
```

## Text only

- Set `displayMode="text-only"` to drop the sticky image column and run the accordion full width.

```tsx
import { ScrollAccordionShowcase, type AccordionShowcaseItem } from "@/components/custom/blocks/ScrollAccordionShowcaseBlock";

const items: AccordionShowcaseItem[] = [
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
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1460925895917-afdab827c52f-1790146212204.jpg",
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
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146211/photo-1551288049-bebda4e38f71-1790146212211.jpg",
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
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790148864/photo-1618005182384-a83a8bd57fbe-1790148865111.jpg",
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
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146210/photo-1504639725590-34d0984388bd-1790146212207.jpg",
    badgeText: "SELECTED SERVICE",
  },
];

export default function TextOnlyShowcase() {
  // "text-only" drops the sticky image column and lets the accordion
  // run full width — useful for an FAQ or a process list.
  return <ScrollAccordionShowcase items={items} displayMode="text-only" />;
}
```

## Image only

- Set `displayMode="image-only"` to keep the scroll-driven visual and replace the copy with a horizontal step selector.

```tsx
import { ScrollAccordionShowcase, type AccordionShowcaseItem } from "@/components/custom/blocks/ScrollAccordionShowcaseBlock";

const items: AccordionShowcaseItem[] = [
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
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1460925895917-afdab827c52f-1790146212204.jpg",
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
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146211/photo-1551288049-bebda4e38f71-1790146212211.jpg",
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
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790148864/photo-1618005182384-a83a8bd57fbe-1790148865111.jpg",
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
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146210/photo-1504639725590-34d0984388bd-1790146212207.jpg",
    badgeText: "SELECTED SERVICE",
  },
];

export default function ImageOnlyShowcase() {
  // "image-only" keeps the scroll-driven visual and hides the copy.
  return <ScrollAccordionShowcase items={items} displayMode="image-only" />;
}
```

## Starting row

- `defaultIndex={0}` is the zero-based row expanded before the reader scrolls.
- `scrollerRef` points the internal IntersectionObserver at a custom scroll container instead of the window.

```tsx
import { ScrollAccordionShowcase, type AccordionShowcaseItem } from "@/components/custom/blocks/ScrollAccordionShowcaseBlock";

const items: AccordionShowcaseItem[] = [
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
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1460925895917-afdab827c52f-1790146212204.jpg",
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
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146211/photo-1551288049-bebda4e38f71-1790146212211.jpg",
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
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790148864/photo-1618005182384-a83a8bd57fbe-1790148865111.jpg",
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
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146210/photo-1504639725590-34d0984388bd-1790146212207.jpg",
    badgeText: "SELECTED SERVICE",
  },
];

export default function ShowcaseStartingOnThird() {
  // defaultIndex picks which row is open before the user scrolls.
  return <ScrollAccordionShowcase items={items} defaultIndex={2} />;
}
```

## About Scroll Accordion Showcase

**What it is.** `ScrollAccordionShowcase` combines numbered accordion rows with a sticky visual panel across three `displayMode` options (`both`, `text-only`, `image-only`), optional `tags` pills, and a `defaultIndex` starting row.

**How it is built.** Uses `IntersectionObserver` (targeting `window` or a custom `scrollerRef`) to expand rows as they cross the reading line and resolves accent colors at runtime from CSS variables or `localStorage`.

**When to use it.** Use `ScrollAccordionShowcase` for scroll-driven feature walkthroughs and service showcases. For click-driven 3D card stacking, use [Split-Stack Stepper](https://avaraui.com/docs/reactjs/split-stepper).

## For AI agents

**When to use**

- Scroll-triggered feature/service showcases with expanding numbered rows and a sticky preview (`displayMode="both" | "text-only" | "image-only"`)

**When not to use**

- Click-driven 3D stacked card decks — use [Split-Stack Stepper](https://avaraui.com/docs/reactjs/split-stepper)
- Static FAQ accordions — use [Accordion](https://avaraui.com/docs/reactjs/accordion)

**Agent notes**

- Installs via the `scroll-accordion-showcase` registry item; named exports `ScrollAccordionShowcase`, `type AccordionShowcaseItem` from `@/components/custom/blocks/ScrollAccordionShowcaseBlock`
- Pass `scrollerRef` when embedding inside a custom scrollable container instead of the window

## Props Reference

| Component / Interface | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `ScrollAccordionShowcase` | `items` | `AccordionShowcaseItem[]` | Required | An array of data objects defining the numbered step badges, titles, narrative descriptions, interactive tags, and paired visual mockup images. |
| `ScrollAccordionShowcase` | `displayMode` | `"both" \| "text-only" \| "image-only"` | `"both"` | Controls the rendered layout structure. `"both"` renders the two-column grid with JS-driven sticky tracking; `"text-only"` renders isolated accordion cards; `"image-only"` renders a horizontal step selector bar above the visual showcase card. |
| `ScrollAccordionShowcase` | `defaultIndex` | `number` | `0` | The initial zero-based index of the accordion card that is expanded and highlighted when the component first mounts. |
| `ScrollAccordionShowcase` | `localStorageKey` | `string` | `"primaryColor"` | The primary storage key string monitored by the instant multi-layer detection proxy to synchronize theme colors across tabs, `Storage.prototype` mutations, and CSS root variables. |
| `ScrollAccordionShowcase` | `defaultAccentColor` | `string` | `"var(--primary)"` | The fallback hex color string applied automatically if no valid hex or rgb color value is detected in `localStorage` or CSS root variables. |
| `ScrollAccordionShowcase` | `scrollerRef` | `React.RefObject<HTMLElement \| null>` | `undefined` | An optional React ref target passed directly to the internal `IntersectionObserver` to track scroll progress within a custom scrollable container instead of the browser window viewport. |
| `ScrollAccordionShowcase` | `className` | `string` | `undefined` | Custom Tailwind CSS classes to apply to the outermost section wrapper container. |
| `AccordionShowcaseItem` | `id` | `string` | Required | A unique string identifier required for safe React list rendering and for swapping the showcase image when the active step changes. |
| `AccordionShowcaseItem` | `stepNumber` | `string` | Required | A formatted numerical string (e.g., `"01"`, `"02"`) rendered inside the top badge on the accordion card and horizontal selector bar. |
| `AccordionShowcaseItem` | `title` | `string` | Required | The primary headline text displayed prominently on the accordion card, horizontal selector, and sticky visual showcase badge. |
| `AccordionShowcaseItem` | `description` | `string` | Required | The detailed paragraph text explaining the specific step or service, which smoothly expands when the card becomes active. |
| `AccordionShowcaseItem` | `tags` | `string[]` | `undefined` | An optional array of keyword strings rendered as uppercase pill badges with colored checkmark icons beneath the description when the card expands. |
| `AccordionShowcaseItem` | `image` | `string` | Required | The image URL or file path displayed inside the sticky visual mockup card, which smoothly cross-fades when the active step changes. |
| `AccordionShowcaseItem` | `badgeText` | `string` | `"SELECTED SERVICE"` | An optional custom uppercase label rendered inside the floating glassmorphic badge at the bottom-left of the sticky visual card. |

## Works with other components

- Pair with [Split-Stack Stepper](https://avaraui.com/docs/reactjs/split-stepper) or [Accordion](https://avaraui.com/docs/reactjs/accordion) depending on whether you need scroll-driven or click-driven disclosure.

## How do I build a scroll-driven accordion showcase in React?

Pass an `items` array to `ScrollAccordionShowcase`. Each item needs an `id`, `stepNumber`, `title`, `description` and `image`. As the user scrolls, an `IntersectionObserver` expands the matching numbered row and cross-fades the sticky visual card to that item's image.

## How do I observe scroll inside a custom container instead of window?

Pass a React ref to that scrollable element via `scrollerRef` so the internal `IntersectionObserver` uses it as the scroll root. Without it the observer targets `window`, which is right for a normal page layout.

## Can I show only text or only images?

Yes. `displayMode` accepts `"both"`, `"text-only"` and `"image-only"`, and `"both"` is the default two-column layout. Use `defaultIndex`, which starts at `0`, to choose which row is expanded when the component first mounts.

## How do I add tags and a badge to a step?

Add a `tags` string array to an item to render uppercase pills with checkmark icons under its description. Set `badgeText` to change the glass badge on the visual card. It defaults to `"SELECTED SERVICE"` when you leave it out.

## How do I change the accent colour of the showcase?

The accent follows your primary colour. `defaultAccentColor` is the fallback, `var(--primary)` by default, used when no valid colour is detected. `localStorageKey` names the storage key that is watched for a stored primary colour, and it defaults to `"primaryColor"`.

---

Live previews and every example: https://avaraui.com/docs/nextjs/split-scroll-stepper
