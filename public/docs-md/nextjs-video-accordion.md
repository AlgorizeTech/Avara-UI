# Video Accordion

A cinematic, expanding gallery component built with **GSAP**. It keeps one panel visually dominant and plays its assigned video, while the rest seamlessly compress into an obscured track-rail and pause.

This layout is incredibly useful for portfolio reels, storytelling feature sections, and high-impact editorial landing pages. On mobile viewports, it intelligently re-flows into a vertically expanding stack automatically.

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

Hover over any of the background panels to smoothly expand them and trigger video playback.

## Installation

### Dependencies

This component utilizes **GSAP** to handle the heavy mathematical lifting of flex-basis interpolation during the expansion tracking.

```bash
npm install gsap
```

### Copy the Component

Copy the core engine code directly from the Component tab in the Interactive Showcase above and place it in components/custom/blocks/VideoAccordionBlock.tsx.

## Implementation

```tsx

export default function PortfolioSection() {
  const videoPanels = [
    {
      id: "wildlife",
      title: "Nature & Wildlife",
      description:
        "Transform your audio tracks into compelling visual stories automatically.",
      videoSrc: "/videos/elephants.mp4",
      posterUrl: "/images/elephants-poster.jpg",
    },
    {
      id: "urban",
      title: "Urban Sprawl",
      description:
        "Capture the relentless energy of cityscapes in 4k resolution.",
      videoSrc: "/videos/city.mp4",
      posterUrl: "/images/city-poster.jpg",
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

**Component Path:** `nextjs\video-accordion\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
