---
title: "Shadcn Animated Timeline"
description: "A highly dynamic, scroll-aware timeline engine featuring Intersection Observers and multiple 3D/2D entry animations. Free shadcn/ui Animated Timeline component."
url: https://avaraui.com/docs/nextjs/animated-timeline
---

# Shadcn Animated Timeline

A highly dynamic, scroll-aware timeline engine featuring Intersection Observers and multiple 3D/2D entry animations.

Unlike standard static timelines, this `AnimatedTimelineBlock` uses native browser APIs (`IntersectionObserver`) to orchestrate complex animations only when the user scrolls the elements into view. As the user scrolls down your page, the vertical tracking line dynamically extends, the nodes glow, and the cards flip, blur, or slide into position.

## For AI agents

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
Every preview scrolls internally — **scroll down inside a preview** and watch the tracking line extend as each node crosses the observer threshold.

## Cable timeline

Cards on a centre playhead. Drag sideways or scroll the wheel over it to bring the next one forward.

- `events` take an ISO `date`, a `title`, and optional `media` and `meta` for the card.
- `wheel` moves it with the mouse wheel and trackpad; at either end the page scrolls on.

```tsx
"use client";

import {
  TimelineCableBlock,
  type TimelineCableEvent,
} from "@/components/custom/blocks/TimelineCableBlock";
import { Mountain, Route } from "lucide-react";

const CDN = "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit";

// Media is any non-interactive node. Here, a photograph that fills the area.
function Photo({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} loading="lazy" draggable={false} className="size-full object-cover" />;
}

const events: TimelineCableEvent[] = [
  {
    id: "trailhead",
    date: "2023-05-14",
    title: "Into the trees",
    media: (
      <Photo
        src={`${CDN}/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg`}
        alt="A dirt trail winding through tall forest"
      />
    ),
    meta: (
      <>
        <Route aria-hidden className="size-4" /> 12 km
      </>
    ),
  },
  {
    id: "base-camp",
    date: "2023-09-02",
    title: "Under the granite wall",
    media: (
      <Photo
        src={`${CDN}/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg`}
        alt="A granite cliff above a sunlit meadow and pines"
      />
    ),
    meta: (
      <>
        <Mountain aria-hidden className="size-4" /> 2,100 m
      </>
    ),
  },
  {
    id: "river",
    date: "2024-03-18",
    title: "Cold water at first light",
    media: (
      <Photo
        src={`${CDN}/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg`}
        alt="A shallow river in a misty valley at dawn"
      />
    ),
    meta: (
      <>
        <Route aria-hidden className="size-4" /> 18 km
      </>
    ),
  },
  {
    id: "summit",
    date: "2024-08-09",
    title: "The last scramble",
    media: (
      <Photo
        src={`${CDN}/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg`}
        alt="A lone hiker standing on a rock above misty forested hills"
      />
    ),
    meta: (
      <>
        <Mountain aria-hidden className="size-4" /> 3,480 m
      </>
    ),
  },
  {
    id: "clouds",
    date: "2025-02-21",
    title: "A sea of cloud at sunset",
    media: (
      <Photo
        src={`${CDN}/v1790146210/photo-1506905925346-21bda4d32df4-1790146212208.jpg`}
        alt="Snowy peaks rising above a layer of cloud at sunset"
      />
    ),
    meta: (
      <>
        <Mountain aria-hidden className="size-4" /> 3,900 m
      </>
    ),
  },
];

// Drag it sideways, scroll the mouse wheel over it, or press the arrow keys.
export default function TimelineCableExample() {
  return <TimelineCableBlock events={events} defaultValue="river" />;
}
```

### Install the cable timeline

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/timeline-cable.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/timeline-cable
```

## Path timeline

A winding line that draws itself from stop to stop, with a glowing head and cards that light up on arrival.

```tsx
"use client";

import {
  TimelinePathBlock,
  type TimelinePathItem,
} from "@/components/custom/blocks/TimelinePathBlock";
import {
  Building2,
  Globe,
  Handshake,
  Lightbulb,
  Rocket,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

const milestones: TimelinePathItem[] = [
  {
    id: 1,
    date: "Jan 2019",
    title: "The idea",
    description: "A sketch on a whiteboard turns into the first working prototype.",
    icon: Lightbulb,
  },
  {
    id: 2,
    date: "Aug 2019",
    title: "First hires",
    description: "The founding team grows from three to eight and moves out of the spare room.",
    icon: Users,
  },
  {
    id: 3,
    date: "Mar 2020",
    title: "Public launch",
    description: "The product goes live and the first hundred customers sign up in a week.",
    icon: Rocket,
  },
  {
    id: 4,
    date: "Nov 2020",
    title: "First partnership",
    description: "A deal with a larger platform brings the product to thousands of new teams.",
    icon: Handshake,
  },
  {
    id: 5,
    date: "Jun 2021",
    title: "New headquarters",
    description: "A proper office, a support desk and a team that finally fits in one room.",
    icon: Building2,
  },
  {
    id: 6,
    date: "Feb 2022",
    title: "Going global",
    description: "Translations, local currencies and a second office open up three new continents.",
    icon: Globe,
  },
  {
    id: 7,
    date: "Oct 2023",
    title: "Industry award",
    description: "Named best new productivity tool by a panel of independent reviewers.",
    icon: Trophy,
  },
  {
    id: 8,
    date: "Today",
    title: "What comes next",
    description: "Smart suggestions, deeper integrations and the same small-team care.",
    icon: Sparkles,
  },
];

// The timeline follows the scroll of the box it sits in, so the next entries
// appear as you scroll. The scrollbar is hidden. Outside a box it follows the
// page scroll instead.
export default function TimelinePathExample() {
  return (
    <div className="h-[39rem] w-full overflow-y-auto rounded-2xl border border-border bg-background px-6 py-8 [scrollbar-width:none] sm:px-10 [&::-webkit-scrollbar]:hidden">
      <TimelinePathBlock items={milestones} />
    </div>
  );
}
```

### Install the path timeline

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/timeline-path.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/timeline-path
```

## Dial timeline

Entries ride an arc beside a ruler of ticks. Click one, use the arrows, the mouse wheel or arrow keys, or drag up and down.

```tsx
"use client";

import {
  TimelineDialBlock,
  type TimelineDialItem,
} from "@/components/custom/blocks/TimelineDialBlock";
import { Award, Flag, Globe, Sprout, TrendingUp, Zap } from "lucide-react";

const milestones: TimelineDialItem[] = [
  {
    id: 1,
    date: "2018",
    title: "Founded",
    eyebrow: "Day one",
    description: "Two founders, one laptop and a first prototype of the platform.",
    icon: Sprout,
  },
  {
    id: 2,
    date: "2019",
    title: "Seed Round",
    eyebrow: "First funding",
    description: "Raised our seed round and grew the team from two people to twelve.",
    icon: TrendingUp,
  },
  {
    id: 3,
    date: "2020",
    title: "Product Launch",
    eyebrow: "V1.0 released",
    description:
      "Launched our flagship platform to 500+ beta users. Achieved 94% satisfaction rate and 40% month-over-month growth.",
    icon: Zap,
  },
  {
    id: 4,
    date: "2021",
    title: "Series A",
    eyebrow: "Scaling up",
    description: "Closed our Series A and opened a second office to support customers.",
    icon: Flag,
  },
  {
    id: 5,
    date: "2022",
    title: "Global Expansion",
    eyebrow: "New markets",
    description: "Opened in 14 countries with localized support and regional data centers.",
    icon: Globe,
  },
  {
    id: 6,
    date: "2024",
    title: "Industry Leader",
    eyebrow: "Where we are",
    description: "Named a category leader by independent analysts for the third year running.",
    icon: Award,
  },
];

export default function TimelineDialExample() {
  return <TimelineDialBlock items={milestones} defaultIndex={2} />;
}
```

### Install the dial timeline

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/timeline-dial.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/timeline-dial
```

## Ruler timeline

Labels slide past a wavy rail and the one at the bulge is detailed beside it. Click a label, press the round button, or use the wheel, arrow keys or a drag.

- Each entry's `value` is the large figure and its `description` the caption under it.

```tsx
"use client";

import {
  TimelineRulerBlock,
  type TimelineRulerItem,
} from "@/components/custom/blocks/TimelineRulerBlock";
import { BarChart3, Globe, Rocket, Sparkles, Trophy, Users } from "lucide-react";

const milestones: TimelineRulerItem[] = [
  {
    id: 1,
    date: "Feb 2026",
    tag: "Launch",
    title: "Public beta opens",
    icon: Rocket,
    value: "1,200",
    delta: "New",
    description: "Sign-ups in the first month",
    highlights: ["Waitlist opened to everyone", "Onboarding done in under 3 minutes"],
  },
  {
    id: 2,
    date: "Mar 2026",
    tag: "Growth",
    title: "Teams and shared workspaces",
    icon: Users,
    value: "3,450",
    delta: "+188%",
    description: "Active workspaces",
    highlights: ["Invite teammates with one link", "Roles for owners, editors and viewers"],
  },
  {
    id: 3,
    date: "Apr 2026",
    tag: "Product",
    title: "Analytics dashboard ships",
    icon: BarChart3,
    value: "7,340",
    delta: "+112%",
    description: "Weekly active users",
    highlights: ["Live charts for every project", "Export reports to CSV and PDF"],
  },
  {
    id: 4,
    date: "May 2026",
    tag: "Reach",
    title: "Localised in 12 languages",
    icon: Globe,
    value: "6,915",
    delta: "-6%",
    description: "Weekly active users, after the pricing change",
    highlights: ["Right-to-left layouts supported", "Regional pricing in local currencies"],
  },
  {
    id: 5,
    date: "Jun 2026",
    tag: "AI",
    title: "Smart suggestions arrive",
    icon: Sparkles,
    value: "8,760",
    delta: "+27%",
    description: "Weekly active users",
    highlights: ["Drafts written from a short prompt", "Suggestions learn from past work"],
  },
  {
    id: 6,
    date: "Jul 2026",
    tag: "Milestone",
    title: "10,000 teams on board",
    icon: Trophy,
    value: "9,480",
    delta: "+8%",
    description: "Weekly active users",
    highlights: ["Named a top tool of the quarter", "99.98% uptime across the launch"],
  },
];

export default function TimelineRulerExample() {
  return <TimelineRulerBlock items={milestones} defaultIndex={2} />;
}
```

### Install the ruler timeline

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/timeline-ruler.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/timeline-ruler
```

## Steps timeline

Numbered nodes on a rail that fills as you scroll the box. Click a node to bring that step into focus.

```tsx
"use client";

import {
  TimelineStepsBlock,
  type TimelineStepsItem,
} from "@/components/custom/blocks/TimelineStepsBlock";

const steps: TimelineStepsItem[] = [
  {
    id: 1,
    date: "2019",
    title: "Founded in a spare room",
    description:
      "Three friends start Northwind with a single idea: make project planning feel less like paperwork.",
  },
  {
    id: 2,
    date: "2020",
    title: "First 100 customers",
    description:
      "Word of mouth carries the beta past its first hundred teams, and the waitlist is still growing.",
  },
  {
    id: 3,
    date: "2021",
    title: "Seed round closed",
    description:
      "A small, patient round lets the team grow from three people to twelve and move into a real office.",
  },
  {
    id: 4,
    date: "2022",
    title: "Version 2.0 ships",
    description:
      "A full rebuild brings shared workspaces, a faster editor and an API that other tools can build on.",
  },
  {
    id: 5,
    date: "2023",
    title: "Opened in Europe",
    description:
      "A Berlin office and local data hosting open the door to teams that could not use the product before.",
  },
  {
    id: 6,
    date: "2024",
    title: "One million projects",
    description:
      "Teams in 90 countries now plan their work in Northwind, from two-person studios to global companies.",
  },
  {
    id: 7,
    date: "2025",
    title: "Smart suggestions",
    description:
      "The first AI features arrive, drafting plans from a short brief and learning from how each team works.",
  },
  {
    id: 8,
    date: "Today",
    title: "Building what is next",
    description:
      "A team of 120 keeps shipping every week, guided by the customers who have been here since the start.",
  },
];

// The timeline follows the scroll of the box it sits in, so the next entries
// appear as you scroll. The scrollbar is hidden. Outside a box it follows the
// page scroll instead.
export default function TimelineStepsExample() {
  return (
    <div className="h-[39rem] w-full overflow-y-auto rounded-2xl border border-border bg-background px-6 py-8 [scrollbar-width:none] sm:px-10 [&::-webkit-scrollbar]:hidden">
      <p className="font-mono text-xs tracking-[0.18em] text-primary uppercase">
        Our story
      </p>
      <h2 className="mt-2 mb-10 text-4xl font-light tracking-tight text-foreground">
        A Few Years in the Making
      </h2>
      <TimelineStepsBlock items={steps} />
    </div>
  );
}
```

### Install the steps timeline

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/timeline-steps.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/timeline-steps
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

### Install the animated timeline

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/animated-timeline.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/animated-timeline
```

### Layouts

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

## Features
Discover the key capabilities that make this component an excellent choice for modern, animated user interfaces.

Hardware-accelerated transitions that ensure smooth 60fps performance across devices.

Exposes intuitive props for tailoring colors, sizes, and animation speeds to fit your brand.

Automatically adapts to mobile, tablet, and desktop viewports without horizontal scrolling issues.

Built with semantic HTML and ARIA labels where necessary to support screen readers and keyboard navigation.

## Best Practices & Guidelines

Give the timeline room to breathe — the entrance only reads as an entrance when a node crosses the observer threshold mid-scroll, so avoid placing the whole list above the fold. On narrow columns prefer `layout="left"`; the centered rail needs roughly 640px to avoid cramped cards.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `AnimatedTimelineItem[]` | Required | The events to render, in order. See the item shape below. |
| `layout` | `"left" \| "right" \| "center"` | `"center"` | Where the rail sits and whether cards alternate sides. |
| `animation` | `"fade-up" \| "slide-in" \| "zoom-in" \| "flip-up" \| "blur-in"` | `"fade-up"` | The entrance each card plays when its node scrolls into view. |
| `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "blue" \| "zinc" \| (hex string)` | `"primary"` | Accent applied to the active node, its glow and the extended rail. |

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

---

Live previews and every example: https://avaraui.com/docs/nextjs/animated-timeline
