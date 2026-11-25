---
title: "Shadcn Video Accordion"
description: "An expanding video gallery in plain CSS: one panel plays while the others compress and pause. Free shadcn/ui component for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/video-accordion
---

# Shadcn Video Accordion

An expanding video gallery in plain CSS: one panel plays while the others compress and pause.

This layout is incredibly useful for portfolio reels, storytelling feature sections, and high-impact editorial landing pages. On mobile viewports, it intelligently re-flows into a vertically expanding stack automatically.

Hover a compressed panel to expand it — a CSS transition interpolates the flex-grow of every sibling and the newly dominant panel starts playing while the others pause.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/video-accordion.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/video-accordion
```

## Opened on load

- Pass `defaultActiveId` to expand a panel immediately. Omit it and the accordion starts in the fully collapsed, text-free resting state.

```tsx
import { VideoAccordion, type AccordionPanel } from "@/components/custom/blocks/VideoAccordionBlock";

const panels: AccordionPanel[] = [
  {
    id: "ocean",
    title: "Alpine Sanctuary",
    description:
      "Explore the tranquil turquoise waters of pristine high-altitude mountain lakes surrounded by majestic peaks.",
    videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
    posterUrl:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  },
  {
    id: "wildlife",
    title: "Emerald Rainforest",
    description:
      "Venture deep into lush, ancient pine groves and mist-shrouded woodland valleys untouched by time.",
    videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    posterUrl:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790159968/photo-1470058869958-2a77ade41c02-1790159970122.jpg",
  },
  {
    id: "soaring",
    title: "Highland Ridge",
    description:
      "Soar above golden sunset horizons, jagged rocky cliffs, and sweeping atmospheric cloudscapes.",
    videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    posterUrl:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  },
  {
    id: "nature",
    title: "Cascading Waterfalls",
    description:
      "Listen to the peaceful roar of crystal streams flowing through mossy granite boulders in deep wilderness.",
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
    posterUrl:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790159968/photo-1432405972618-c60b0225b8f9-1790159970121.jpg",
  },
];

export default function OpenedOnLoad() {
  // Land with one panel already open — good for hero sections where the
  // first frame should not look inert.
  return (
    <div className="w-full h-full min-h-[500px]">
      <VideoAccordion panels={panels} defaultActiveId="wildlife" className="w-full h-full min-h-[500px]" />
    </div>
  );
}
```

## Fewer panels

- `panels` sets the rail's divisions — space redistributes automatically, so a two-panel reel works as well as a five-panel one.

```tsx
import { VideoAccordion, type AccordionPanel } from "@/components/custom/blocks/VideoAccordionBlock";

const panels: AccordionPanel[] = [
  {
    id: "ocean",
    title: "Alpine Sanctuary",
    description:
      "Explore the tranquil turquoise waters of pristine high-altitude mountain lakes surrounded by majestic peaks.",
    videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
    posterUrl:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  },
  {
    id: "wildlife",
    title: "Emerald Rainforest",
    description:
      "Venture deep into lush, ancient pine groves and mist-shrouded woodland valleys untouched by time.",
    videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    posterUrl:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790159968/photo-1470058869958-2a77ade41c02-1790159970122.jpg",
  },
  {
    id: "soaring",
    title: "Highland Ridge",
    description:
      "Soar above golden sunset horizons, jagged rocky cliffs, and sweeping atmospheric cloudscapes.",
    videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    posterUrl:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  },
  {
    id: "nature",
    title: "Cascading Waterfalls",
    description:
      "Listen to the peaceful roar of crystal streams flowing through mossy granite boulders in deep wilderness.",
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
    posterUrl:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790159968/photo-1432405972618-c60b0225b8f9-1790159970121.jpg",
  },
];

export default function ShortReel() {
  // Fewer, wider panels. Each one keeps a legible title strip even when
  // compressed, so two or three read as well as five.
  return (
    <div className="w-full h-full min-h-[500px]">
      <VideoAccordion panels={panels.slice(0, 2)} className="w-full h-full min-h-[500px]" />
    </div>
  );
}
```

## About Shadcn Video Accordion

**What it is.** **Shadcn Video Accordion** (`VideoAccordion`) is a multi-panel expanding video gallery where hovering or selecting a panel expands it smoothly and plays its video while sibling panels compress and pause.

**How it is built.** Animated purely with CSS `flex-grow` transitions (no external animation library), `VideoAccordion` automatically redistributes space for any panel count and stacks vertically on mobile viewports.

**When to use it.** Use it for portfolio reels, feature storytelling strips, editorial landing heroes, and interactive media showcases.

## For AI agents

**When to use**

- Portfolio reels, feature storytelling strips
- Editorial landing heroes, interactive media showcases

**When not to use**

- A single video with playback controls: use [Video Player](https://avaraui.com/docs/nextjs/video-player)
- Text-only expandable sections: use [Accordion](https://avaraui.com/docs/nextjs/accordion)

**Agent notes**

- `VideoAccordion` accepts `panels` (`AccordionPanel[]`) and optional `defaultActiveId`.
- Omit `defaultActiveId` to start with all panels in their collapsed resting state; pass a panel ID to expand it on load.
- Uses pure CSS transitions with automatic video play/pause synchronization per panel.

## Props Reference

| Component / Interface | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `VideoAccordion` | `panels` | `AccordionPanel[]` | Required | An array of configuration objects defining the videos, text, and IDs for the gallery. |
| `VideoAccordion` | `defaultActiveId` | `string` | `undefined` | The unique `id` of the panel that should be expanded by default. If omitted, the accordion starts in a fully collapsed, text-free resting state. |
| `VideoAccordion` | `className` | `string` | `undefined` | Custom Tailwind CSS classes to apply to the outermost responsive flex container wrapper. |
| `AccordionPanel` | `id` | `string` | Required | A unique identifier string required for safe React list rendering and active-panel tracking. |
| `AccordionPanel` | `title` | `string` | Required | Primary headline text displayed at the bottom of the panel. |
| `AccordionPanel` | `description` | `string` | Required | Detailed paragraph text explaining the video. This text automatically hides when the panel is collapsed. |
| `AccordionPanel` | `videoSrc` | `string` | Required | The URL to the background `.mp4` or `.webm` file. |
| `AccordionPanel` | `posterUrl` | `string` | `undefined` | Optional (but highly recommended) URL to a fallback image. This displays immediately while the video is buffering to prevent black flashes. |

## Works with other components

Combine `VideoAccordion` with [Video Player](https://avaraui.com/docs/nextjs/video-player) for modal video heroes, [Accordion](https://avaraui.com/docs/nextjs/accordion) for text-based FAQs, and [Gallery](https://avaraui.com/docs/nextjs/gallery) for 3D media showcases.

## How do I build an expanding video gallery in React?

Pass a `panels` array to `VideoAccordion`. Each panel needs an `id`, `title`, `description` and `videoSrc`, which is an `.mp4` or `.webm` URL. Hovering or selecting a panel expands it and plays its video while the other panels compress and pause.

## Does VideoAccordion require Motion or GSAP?

No. Panel expansion and compression run on plain CSS `flex-grow` transitions, and space is redistributed for any number of panels. Nothing beyond the component file is needed, so it adds no animation library to your bundle.

## How does VideoAccordion handle mobile viewports?

On smaller screens the horizontal rail switches to a vertically expanding stack, so every video panel stays legible. You do not configure a breakpoint yourself, and the same `panels` array drives both layouts.

## How do I choose which panel is open on load?

Set `defaultActiveId` to the `id` of a panel. If you leave it out, the accordion starts with every panel collapsed. A panel's `description` is hidden while it is collapsed, so users only see the full text of the expanded one.

## Why do I need a posterUrl on each panel?

`posterUrl` is an optional fallback image that shows immediately while the video buffers, so the panel is never blank. It is optional but highly recommended, especially for large video files on slower connections.

---

Live previews and every example: https://avaraui.com/docs/nextjs/video-accordion
