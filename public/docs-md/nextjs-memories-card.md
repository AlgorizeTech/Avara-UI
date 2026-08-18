# Memories Card

A premium, interactive card stack component featuring real-time 3D tilt physics, a dynamic "fan" background spread, and smooth swipe-to-next gestures. Perfect for showcasing travel memories, feature highlights, or curated photo galleries.

## Examples

Hover the front card for the 3D tilt, then drag or swipe it left or right to send it to the back of the deck.

export const usageDefault = `import { MemoriesCard } from "@/components/custom/blocks/MemoriesCardBlock";

const memories = [
  {
    id: "m1",
    tag: "Highlight",
    title: "Kyoto Lantern Festival",
    location: "Kyoto, Japan",
    date: "Oct 2025",
    description: "Thousands of paper lanterns lighting the Gion district.",
    image: "/photos/kyoto.jpg",
  },
  {
    id: "m2",
    tag: "Expedition",
    title: "Dolomites Alpine Ridge",
    location: "South Tyrol, Italy",
    date: "Aug 2025",
    image: "/photos/dolomites.jpg",
  },
];

export default function TravelDeck() {
  return ;
}`;

export const usageMinimal = `import { MemoriesCard } from "@/components/custom/blocks/MemoriesCardBlock";

// Everything except \`id\`, \`title\` and \`image\` is optional — drop the
// metadata and the overlay collapses to just the title.
const memories = [
  { id: "m1", title: "Kyoto Lantern Festival", image: "/photos/kyoto.jpg" },
  { id: "m2", title: "Dolomites Alpine Ridge", image: "/photos/dolomites.jpg" },
];

export default function PhotoDeck() {
  return ;
}`;

export const usageOnChange = `import { useState } from "react";

export default function TravelDeck() {
  const [active, setActive] = useState(0);

  // Fires every time a card is sent to the back of the deck.
  return (
    <>
      
      Showing {memories[active].title}
    
  );
}`;

## Installation

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

          MemoriesCard

          items

          MemoryItem[]

          Required

          An array of data objects defining the images, titles, locations, and
          badges for the card stack.

          MemoriesCard

          onCardChange

          (index: number) =&gt; void

          undefined

          Optional callback function fired whenever a card is swiped to the back
          and the stack cycles to a new front card.

          MemoriesCard

          className

          string

          undefined

          Custom Tailwind CSS classes to apply to the outermost perspective
          wrapper container.

          MemoryItem

          id

          string

          Required

          A unique identifier string required for safe React list rendering and
          Framer Motion layout transitions.

          MemoryItem

          title

          string

          Required

          Primary headline text prominently displayed at the bottom of the card.

          MemoryItem

          image

          string

          Required
        
        The URL to the high-resolution background image for the card.

          MemoryItem

          tag

          string

          undefined

          Optional badge label displayed in the top-left corner (e.g.,
          "Highlight", "Expedition").

          MemoryItem

          location

          string

          undefined

          Optional geographical string displayed with a map pin icon above the
          headline.

          MemoryItem

          date

          string

          undefined

          Optional date or timestamp string displayed with a calendar icon above
          the headline.

          MemoryItem

          description

          string

          undefined

          Optional supporting paragraph text explaining the memory.
          Automatically clamped to 2 lines.

---

**Component Path:** `nextjs\memories-card\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
