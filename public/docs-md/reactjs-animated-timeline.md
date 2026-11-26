---
title: "Shadcn Animated Timeline"
description: "A highly dynamic, scroll-aware timeline engine featuring Intersection Observers and multiple 3D/2D entry animations. Free shadcn/ui Animated Timeline component."
url: https://avaraui.com/docs/nextjs/animated-timeline
---

# Shadcn Animated Timeline

A highly dynamic, scroll-aware timeline engine featuring Intersection Observers and multiple 3D/2D entry animations.

Unlike standard static timelines, this `AnimatedTimelineBlock` uses native browser APIs (`IntersectionObserver`) to orchestrate complex animations only when the user scrolls the elements into view. As the user scrolls down your page, the vertical tracking line dynamically extends, the nodes glow, and the cards flip, blur, or slide into position.

Every preview scrolls internally — **scroll down inside a preview** and watch the tracking line extend as each node crosses the observer threshold.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/animated-timeline.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/animated-timeline
```

## Animated timeline

- Pass `items` as an array of `{ id, title, date }` — `description` and a lucide `icon` component are optional.
- `layout="center"` is the default: rail down the middle with cards alternating sides.
- `color` accents the active node, its glow and the extended rail — a named key or a hex string.

```tsx
import { AnimatedTimelineBlock, type AnimatedTimelineItem } from "@/components/custom/blocks/AnimatedTimelineBlock";

import {
  CheckCircle2,
  Loader2,
  MapPin,
  Palette,
  Rocket,
  Target,
  Zap,
} from "lucide-react";

const EVENTS: AnimatedTimelineItem[] = [
  {
    id: "1",
    title: "Project Initiation",
    date: "Jan 2024",
    description:
      "The initial kickoff meeting where requirements were gathered.",
    icon: Target,
  },
  {
    id: "2",
    title: "Design Phase",
    date: "Feb 2024",
    description:
      "Wireframing, prototyping, and finalizing the UI kit components.",
    icon: Palette,
  },
  {
    id: "3",
    title: "Development",
    date: "Mar 2024",
    description: "Writing the core logic and React components from scratch.",
    icon: Zap,
  },
  {
    id: "4",
    title: "Testing & QA",
    date: "Apr 2024",
    description:
      "Running automated tests and squashing complex accessibility bugs.",
    icon: Loader2,
  },
  {
    id: "5",
    title: "Production Launch",
    date: "May 2024",
    description: "Deploying the V1 architecture to the edge network.",
    icon: Rocket,
  },
  {
    id: "6",
    title: "Global Expansion",
    date: "Jun 2024",
    description: "Reaching 100k active users globally.",
    icon: MapPin,
  },
  {
    id: "7",
    title: "Milestone Achieved",
    date: "Present",
    description: "We did it.",
    icon: CheckCircle2,
  },
];

export default function CompanyHistory() {
  return (
    <div className="w-full max-w-5xl mx-auto py-24">
      <AnimatedTimelineBlock items={EVENTS} layout="center" animation="flip-up" />
    </div>
  );
}
```

### Layouts

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/animated-timeline.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/animated-timeline
```

### Left layout

- Use `layout="left"` to pin the rail to one edge and stack every card beside it — the compact option for narrow columns and sidebars.

```tsx
import { AnimatedTimelineBlock, type AnimatedTimelineItem } from "@/components/custom/blocks/AnimatedTimelineBlock";

import {
  CheckCircle2,
  Loader2,
  MapPin,
  Palette,
  Rocket,
  Target,
  Zap,
} from "lucide-react";

const EVENTS: AnimatedTimelineItem[] = [
  {
    id: "1",
    title: "Project Initiation",
    date: "Jan 2024",
    description:
      "The initial kickoff meeting where requirements were gathered.",
    icon: Target,
  },
  {
    id: "2",
    title: "Design Phase",
    date: "Feb 2024",
    description:
      "Wireframing, prototyping, and finalizing the UI kit components.",
    icon: Palette,
  },
  {
    id: "3",
    title: "Development",
    date: "Mar 2024",
    description: "Writing the core logic and React components from scratch.",
    icon: Zap,
  },
  {
    id: "4",
    title: "Testing & QA",
    date: "Apr 2024",
    description:
      "Running automated tests and squashing complex accessibility bugs.",
    icon: Loader2,
  },
  {
    id: "5",
    title: "Production Launch",
    date: "May 2024",
    description: "Deploying the V1 architecture to the edge network.",
    icon: Rocket,
  },
  {
    id: "6",
    title: "Global Expansion",
    date: "Jun 2024",
    description: "Reaching 100k active users globally.",
    icon: MapPin,
  },
  {
    id: "7",
    title: "Milestone Achieved",
    date: "Present",
    description: "We did it.",
    icon: CheckCircle2,
  },
];

export default function LeftTimeline() {
  // Rail on the left, every card on the same side — the compact layout for
  // narrow columns and sidebars.
  return (
    <div className="w-full max-w-5xl mx-auto py-24">
      <AnimatedTimelineBlock items={EVENTS} layout="left" animation="slide-in" />
    </div>
  );
}
```

### Right layout

- Use `layout="right"` to mirror it — useful when the timeline sits next to body copy on the left.

```tsx
import { AnimatedTimelineBlock, type AnimatedTimelineItem } from "@/components/custom/blocks/AnimatedTimelineBlock";

import {
  CheckCircle2,
  Loader2,
  MapPin,
  Palette,
  Rocket,
  Target,
  Zap,
} from "lucide-react";

const EVENTS: AnimatedTimelineItem[] = [
  {
    id: "1",
    title: "Project Initiation",
    date: "Jan 2024",
    description:
      "The initial kickoff meeting where requirements were gathered.",
    icon: Target,
  },
  {
    id: "2",
    title: "Design Phase",
    date: "Feb 2024",
    description:
      "Wireframing, prototyping, and finalizing the UI kit components.",
    icon: Palette,
  },
  {
    id: "3",
    title: "Development",
    date: "Mar 2024",
    description: "Writing the core logic and React components from scratch.",
    icon: Zap,
  },
  {
    id: "4",
    title: "Testing & QA",
    date: "Apr 2024",
    description:
      "Running automated tests and squashing complex accessibility bugs.",
    icon: Loader2,
  },
  {
    id: "5",
    title: "Production Launch",
    date: "May 2024",
    description: "Deploying the V1 architecture to the edge network.",
    icon: Rocket,
  },
  {
    id: "6",
    title: "Global Expansion",
    date: "Jun 2024",
    description: "Reaching 100k active users globally.",
    icon: MapPin,
  },
  {
    id: "7",
    title: "Milestone Achieved",
    date: "Present",
    description: "We did it.",
    icon: CheckCircle2,
  },
];

export default function RightTimeline() {
  return (
    <div className="w-full max-w-5xl mx-auto py-24">
      <AnimatedTimelineBlock items={EVENTS} layout="right" animation="slide-in" />
    </div>
  );
}
```

### Requires Tailwind CSS v4

Layouts switch at **container queries** (`@container/timeline`), so they follow the width of the column a timeline sits in, not the window. Container queries are built into Tailwind v4; on v3 the timelines stay in their narrow layout.

## About Shadcn Animated Timeline

**What it is.** Six timeline blocks, each its own registry install: `AnimatedTimelineBlock` (cards that reveal on scroll), `TimelineStepsBlock` (numbered rail), `TimelinePathBlock` (winding SVG path), `TimelineDialBlock` (wheel), `TimelineRulerBlock` (wavy date ruler) and `TimelineCableBlock` (cards on a centre playhead).

**How it is built.** `AnimatedTimelineBlock` gives each node an `IntersectionObserver` (`threshold` 0.1) that toggles its entrance, with `sm:` breakpoints for the layout. Steps and Path follow the scroll of the nearest scrolling ancestor. Dial, Ruler and Cable step through entries with the wheel, drag and arrow keys. Steps, Path, Dial and Ruler use `@container/timeline` container queries.

**When to use it.** Use it for product histories, release roadmaps, storytelling landing pages and milestone showcases where position in the timeline should be felt, not just read.

## For AI agents

**When to use**

- Interactive product histories, release roadmaps
- Storytelling landing pages, scroll-driven milestone showcases

**When not to use**

- A plain status-driven vertical feed: use [Timeline](https://avaraui.com/docs/reactjs/timeline)
- Stages arranged around a circle: use [Radial Orbital Timeline](https://avaraui.com/docs/reactjs/radial-orbital-timeline)

**Agent notes**

- Install only the block you need: `animated-timeline`, `timeline-steps`, `timeline-path`, `timeline-dial`, `timeline-ruler` or `timeline-cable`. Each is a named export of its own file, such as `AnimatedTimelineBlock` from `@/components/custom/blocks/AnimatedTimelineBlock`.
- `AnimatedTimelineBlock` takes `items`, `layout` (`"left" | "right" | "center"`, default `"left"`), `animation` (`"fade-up" | "slide-in" | "zoom-in" | "flip-up" | "blur-in"`, default `"fade-up"`) and `color`.
- Steps, Path, Dial and Ruler take `items`, `color`, `animate`, `defaultIndex` and `onIndexChange`. `TimelineCableBlock` takes `events` with `value` / `onValueChange` instead.
- Give `AnimatedTimelineBlock` vertical scroll room so nodes reveal one by one, and use `layout="left"` in narrow columns because its breakpoints follow the viewport.
- Dial and Ruler need `lucide-react`; none of the blocks import `next/*`.

**Ask before you pick.** This page has 6 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 6 options as live previews: https://avaraui.com/view/animated-timeline

**When to use it.** Timelines for roadmaps, histories and process steps. One scrolls a rail with cards in a column, the others draw a path, spin a dial, slide a ruler or number the steps.

**Gotchas:**

- Each look is its own registry item: install only the one you picked.
- The animated timeline's `layout` prop (center, left, right) moves the rail; it is not a separate item.
- The dial and ruler timelines respond to the wheel, arrow keys and drag, so give them room and avoid putting them in a scrolling column.

### The 6 variants

1. **Cable timeline** (`cable`): Cards on a centre playhead with cables and year numerals; drag or scroll the wheel.
   - Live: https://avaraui.com/view/animated-timeline/cable
   - Best for: browsing launches, releases or a project history; events with a picture or figure each
   - Avoid if: it must work as a plain scrolling list; entries need long body text
   - Traits: horizontal, drag and wheel, year numerals, arrow keys
   - Install: `npx shadcn@latest add @avara-ui/timeline-cable`
   - Docs: https://avaraui.com/docs/nextjs/animated-timeline#cable-timeline
2. **Animated rail** (`animated`): A rail with cards that animate in as you scroll, centered, left or right.
   - Live: https://avaraui.com/view/animated-timeline/animated
   - Best for: a company history or roadmap in a normal content column
   - Avoid if: you want the reader to pick entries rather than scroll
   - Traits: scroll-driven, layout center, left or right, active node glow
   - Install: `npx shadcn@latest add @avara-ui/animated-timeline`
   - Set these props: `{"layout":"center"}`
   - Docs: https://avaraui.com/docs/nextjs/animated-timeline#animated-timeline
3. **Path timeline** (`path`): A winding line draws itself from stop to stop with a glowing head.
   - Live: https://avaraui.com/view/animated-timeline/path
   - Best for: a journey or story with a few distinct stops
   - Avoid if: there are many entries or long descriptions
   - Traits: winding path, draws on scroll, cards light up on arrival
   - Install: `npx shadcn@latest add @avara-ui/timeline-path`
   - Docs: https://avaraui.com/docs/nextjs/animated-timeline#path-timeline
4. **Steps timeline** (`steps`): Numbered nodes on a rail that fills as you scroll the box.
   - Live: https://avaraui.com/view/animated-timeline/steps
   - Best for: a how-it-works or onboarding process
   - Avoid if: entries are dates rather than ordered steps
   - Traits: numbered nodes, rail fills on scroll, click to focus a step
   - Install: `npx shadcn@latest add @avara-ui/timeline-steps`
   - Docs: https://avaraui.com/docs/nextjs/animated-timeline#steps-timeline
5. **Dial timeline** (`dial`): Entries ride an arc beside a ruler of ticks; click, use the wheel or drag.
   - Live: https://avaraui.com/view/animated-timeline/dial
   - Best for: a showcase where the reader browses a handful of milestones
   - Avoid if: it must work as a plain scrolling list
   - Traits: arc layout, wheel, arrow keys and drag, needs room
   - Install: `npx shadcn@latest add @avara-ui/timeline-dial`
   - Docs: https://avaraui.com/docs/nextjs/animated-timeline#dial-timeline
6. **Ruler timeline** (`ruler`): Labels slide past a wavy rail and the one at the bulge is detailed beside it.
   - Live: https://avaraui.com/view/animated-timeline/ruler
   - Best for: years or figures with a short caption each
   - Avoid if: entries need long body text
   - Traits: wavy rail, value and caption per entry, wheel, arrow keys and drag
   - Install: `npx shadcn@latest add @avara-ui/timeline-ruler`
   - Docs: https://avaraui.com/docs/nextjs/animated-timeline#ruler-timeline

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `AnimatedTimelineItem[]` | Required | The events to render, in order. See the item shape below. |
| `layout` | `"left" \| "right" \| "center"` | `"left"` | Where the rail sits and whether cards alternate sides. |
| `animation` | `"fade-up" \| "slide-in" \| "zoom-in" \| "flip-up" \| "blur-in"` | `"fade-up"` | The entrance each card plays when its node scrolls into view. |
| `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "blue" \| "violet" \| "zinc" \| (hex string)` | `"primary"` | Accent applied to the active node, its glow and the extended rail. |

### AnimatedTimelineItem Object

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string \| number` | Required | Stable React key for the event. |
| `title` | `string` | Required | Headline shown on the card. |
| `date` | `string` | Required | Free-form label beside the node — a quarter, month or "Present". |
| `description` | `string` | `undefined` | Optional supporting copy under the title. |
| `icon` | `React.ElementType` | `undefined` | Component rendered inside the node — any lucide icon works. |

### Steps, Path, Dial and Ruler props

`items` is required for each. `color` (default `"primary"`) takes a named accent or a hex code, and `animate` (default `true`) can be set to `false` for static output. Steps, Path, Dial and Ruler also take `defaultIndex` and `onIndexChange` to read the entry in focus. Reduced-motion preferences are honoured.

### TimelineStepsItem

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string \| number` | Required | Unique key for the step. |
| `title` | `string` | Required | The large heading. |
| `date`, `description`, `content`, `action` | `string`, `string`, `ReactNode`, `ReactNode` | `undefined` | A small label above the title, text under it, extra detail and a button or link. |

### TimelinePathItem

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string \| number` | Required | Unique key for the stop. The path needs at least two to draw. From a 640px column up it winds between two lanes; below that it hugs the left edge. |
| `title` | `string` | Required | The card heading. |
| `date`, `description`, `icon` | `string`, `string`, `React.ElementType` | `undefined` | A small mono label, text under the heading, and an icon tile at the top of the card. |

### TimelineDialItem

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string \| number` | Required | Unique key for the entry. Entries more than three steps from the focus are hidden. The mouse wheel only turns the dial while there is somewhere to go, so the page still scrolls at either end. |
| `title` | `string` | Required | The heading, also shown on the wheel. |
| `date` | `string` | Required | The badge above the heading and the label on the wheel, such as a year. |
| `eyebrow`, `description`, `icon` | `string`, `string`, `React.ElementType` | `undefined` | A small label above the heading, text under it, and the icon in the wheel bubble (the entry number when omitted). |

### TimelineRulerItem

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string \| number` | Required | Unique key for the entry. |
| `date` | `string` | Required | The label on the ruler, such as `Apr 2026`. |
| `title` | `string` | Required | Names the entry in the detail panel. |
| `value` | `ReactNode` | `undefined` | A headline figure, shown large. |
| `description`, `content` | `string`, `ReactNode` | `undefined` | The caption under the figure (or body text when there is no figure), and extra detail below it. |
| `image`, `icon` | `string`, `React.ElementType` | `undefined` | An avatar beside the title, or an icon tile when there is no image. |
| `tag`, `delta` | `string` | `undefined` | A badge above the title, and a change beside the figure. A leading `-` shows as a drop. |
| `highlights`, `action` | `string[]`, `ReactNode` | `undefined` | A checklist of what happened, and a button or link at the foot. |

### TimelineCableBlock

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `events` | `{ id, date, title, media?, meta? }[]` | Required | The cards. `date` is an ISO string or Date read in UTC; `media` fills the picture area and `meta` is the footer line. |
| `value`, `defaultValue`, `onValueChange` | `string`, `string`, `(id: string) => void` | first event | The focused event id, controlled or initial, and a callback when it changes. |
| `itemWidth`, `height` | `number` | `340`, `600` | Card width and stage height in px. The card shrinks to fit a narrow column. |
| `years`, `ruler`, `cables` | `boolean` | `true` | The year numerals, the ticks between cards and the cables to the cards beside the centre. |
| `wheel` | `boolean` | `true` | Move with the mouse wheel and trackpad. Dragging and the arrow keys always work. |
| `formatDate`, `formatYear` | `(date: Date) => string` | `Mar 4, 2024`, `2024` | Format the card date and the year numeral. |

## Works with other components

- [Timeline](https://avaraui.com/docs/reactjs/timeline) for static, status-driven rails when nothing needs to animate on scroll.
- [Scroll Stack](https://avaraui.com/docs/reactjs/scroll-stack) for stacked cards that pin as the page scrolls, if the timeline sits in a longer scroll story.
- [Radial Orbital Timeline](https://avaraui.com/docs/reactjs/radial-orbital-timeline) for stages arranged around a circle instead of down a rail.

## Which AnimatedTimeline block should I install?

Pick by interaction. `animated-timeline` reveals cards as they scroll in, `timeline-steps` fills a numbered rail, `timeline-path` draws a winding line, `timeline-dial` turns a wheel, `timeline-ruler` slides a date ruler and `timeline-cable` drags cards past a centre playhead. Each installs separately.

## Why should I avoid placing all AnimatedTimeline items above the fold?

Each node's `IntersectionObserver` (`threshold` 0.1, bottom margin of 40px) reveals its card when it enters the viewport. If every item is already visible on load, they all animate at once and the staggered scroll reveal is lost. The observer also reverses, so scrolling back up plays the entrance again.

## Which layout of AnimatedTimelineBlock works best in narrow columns?

Use `layout="left"`, which is also the default, or `"right"`. The `"center"` layout alternates cards on each side of the rail from the `sm` breakpoint up, and that breakpoint follows the viewport, not the column. A centred timeline inside a narrow sidebar on a wide screen will therefore stay cramped.

## How do I know which entry is in focus in a timeline block?

For Steps, Path, Dial and Ruler, pass `onIndexChange` to receive the focused index and `defaultIndex` to choose where it starts. `TimelineCableBlock` works with event ids instead: use `value` or `defaultValue` and `onValueChange(id)`. The index callbacks do not fire on mount, only when focus changes.

## Can I move through the timelines with the keyboard?

Mostly. `TimelineDialBlock` and `TimelineRulerBlock` are focusable groups that step with the arrow keys, `Home` and `End`, plus wheel and drag. In `TimelineCableBlock` the arrow keys, `Home` and `End` move between cards. `TimelineStepsBlock` nodes are buttons, and `AnimatedTimelineBlock` has no keyboard controls.

## Do the timeline blocks need Tailwind v4 or extra packages?

Steps, Path, Dial and Ruler use `@container/timeline` container-query classes, which are built into Tailwind v4. `AnimatedTimelineBlock` uses ordinary `sm:` breakpoints. Dial and Ruler import `lucide-react`; the others add no npm packages, and none use `next/*`, so they run in Vite too.

---

Live previews and every example: https://avaraui.com/docs/nextjs/animated-timeline
