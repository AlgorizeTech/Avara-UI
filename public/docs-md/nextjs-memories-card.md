# Memories Card

A premium, interactive card stack component featuring real-time 3D tilt physics, a dynamic "fan" background spread, and smooth swipe-to-next gestures. Perfect for showcasing travel memories, feature highlights, or curated photo galleries.

## Interactive Showcase

Hover over the front card to see the 3D perspective tilt follow your cursor. Click and drag (or touch swipe) left or right to send the current card to the back of the deck.

## Installation

### Dependencies

This component relies on **Framer Motion** for 3D spring tilt physics and drag gesture handling, and **Lucide React** for UI icons.

```bash
npm install framer-motion lucide-react
```

### Copy the Component

Copy the core engine code directly from the Component tab in the Interactive Showcase above and save it to components/custom/blocks/MemoriesCardBlock.tsx.

## Implementation

```tsx

export default function GallerySection() {
  const memories = [
    {
      id: "1",
      tag: "Highlight",
      title: "Kyoto Lantern Festival",
      location: "Kyoto, Japan",
      date: "Oct 2025",
      description: "Walking through glowing paper lanterns in historic Gion.",
      image:
        "[https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop](https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop)",
    },
    {
      id: "2",
      tag: "Expedition",
      title: "Dolomites Alpine Ridge",
      location: "South Tyrol, Italy",
      date: "Aug 2025",
      description:
        "Reaching the summit just as morning sun cast jagged shadows.",
      image:
        "[https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop](https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop)",
    },
  ];

  return (

  );
}
```

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

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
