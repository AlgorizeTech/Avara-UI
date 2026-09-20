# Video Accordion

A cinematic, expanding gallery component built with **GSAP**. It keeps one panel visually dominant and plays its assigned video, while the rest seamlessly compress into an obscured track-rail and pause.

This layout is incredibly useful for portfolio reels, storytelling feature sections, and high-impact editorial landing pages. On mobile viewports, it intelligently re-flows into a vertically expanding stack automatically.

Hover a compressed panel to expand it — GSAP interpolates the flex-basis of every sibling and the newly dominant panel starts playing while the others pause.

export const accordionPanels = `const panels: AccordionPanel[] = [
  {
    id: "ocean",
    title: "Alpine Sanctuary",
    description:
      "Explore the tranquil turquoise waters of pristine high-altitude mountain lakes surrounded by majestic peaks.",
    videoSrc: "https://vjs.zencdn.net/v/oceans.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "wildlife",
    title: "Emerald Rainforest",
    description:
      "Venture deep into lush, ancient pine groves and mist-shrouded woodland valleys untouched by time.",
    videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "soaring",
    title: "Highland Ridge",
    description:
      "Soar above golden sunset horizons, jagged rocky cliffs, and sweeping atmospheric cloudscapes.",
    videoSrc: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "nature",
    title: "Cascading Waterfalls",
    description:
      "Listen to the peaceful roar of crystal streams flowing through mossy granite boulders in deep wilderness.",
    videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=1200&auto=format&fit=crop",
  },
];`;

export const usageDefaultActive = `import { VideoAccordion, type AccordionPanel } from "@/components/custom/blocks/VideoAccordionBlock";

${accordionPanels}

export default function OpenedOnLoad() {
  // Land with one panel already open — good for hero sections where the
  // first frame should not look inert.
  return (

  );
}`;

export const usageShortRail = `import { VideoAccordion, type AccordionPanel } from "@/components/custom/blocks/VideoAccordionBlock";

${accordionPanels}

export default function ShortReel() {
  // Fewer, wider panels. Each one keeps a legible title strip even when
  // compressed, so two or three read as well as five.
  return (

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/video-accordion
```

## Examples

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

          VideoAccordion

          panels

          AccordionPanel[]

          Required

          An array of configuration objects defining the videos, text, and IDs
          for the gallery.

          VideoAccordion

          defaultActiveId

          string

          undefined

          The unique id of the panel that should be expanded by
          default. If omitted, the accordion starts in a fully collapsed,
          text-free resting state.

          VideoAccordion

          className

          string

          undefined

          Custom Tailwind CSS classes to apply to the outermost responsive flex
          container wrapper.

          AccordionPanel

          id

          string

          Required

          A unique identifier string required for safe React list rendering and
          GSAP state tracking.

          AccordionPanel

          title

          string

          Required
        
        Primary headline text displayed at the bottom of the panel.

          AccordionPanel

          description

          string

          Required

          Detailed paragraph text explaining the video. This text automatically
          hides when the panel is collapsed.

          AccordionPanel

          videoSrc

          string

          Required

          The URL to the background .mp4 or .webm{" "}
          file.

          AccordionPanel

          posterUrl

          string

          undefined

          Optional (but highly recommended) URL to a fallback image. This
          displays immediately while the video is buffering to prevent black
          flashes.

---

**Component Path:** `[framework]\video-accordion\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
