# Memories Card

A premium, interactive card stack component featuring real-time 3D tilt physics, a dynamic "fan" background spread, and smooth swipe-to-next gestures. Perfect for showcasing travel memories, feature highlights, or curated photo galleries.

Hover the front card for interactive 3D tilt physics, or drag/swipe it to send it to the back of the deck. This component supports full card metadata (badges, locations, dates, descriptions), minimalist image-only layouts by omitting optional fields, and real-time active index tracking via `onCardChange` to sync external captions, counters, or analytics.

export const memoriesData = `const memories: MemoryItem[] = [
  {
    id: "m1",
    tag: "Highlight",
    title: "Alpine Forest Lake",
    location: "Swiss Alps",
    date: "Oct 2025",
    description:
      "Serene pine forests reflecting over calm turquoise mountain waters at sunrise.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
  },
  {
    id: "m2",
    tag: "Expedition",
    title: "Dolomites Alpine Ridge",
    location: "South Tyrol, Italy",
    date: "Aug 2025",
    description:
      "Reaching the summit just as the morning sun cast jagged shadows across the limestone peaks.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
  },
  {
    id: "m3",
    tag: "Sanctuary",
    title: "Emerald Forest Stream",
    location: "Pacific Northwest",
    date: "Jul 2025",
    description:
      "A tranquil river winding through dense ancient rainforests and mossy rocks.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  },
  {
    id: "m4",
    tag: "Wilderness",
    title: "Cascading Mountain Falls",
    location: "Alberta, Canada",
    date: "Jun 2025",
    description:
      "Fresh mountain spring water cascading through untouched wilderness slopes.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
  },
];`;

export const usageOnChange = `${memoriesData}

export default function TravelDeck() {
  const [active, setActive] = useState(0);

  // Fires every time a card is sent to the back of the deck.
  return (
    <>
      
      Showing {memories[active].title}
    
  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/memories-card
```

Or the Motion build (same props, same file — install one):

```bash
npx shadcn@latest add @algorize-ui/memories-card-framer
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

          Callback function triggered on every card swipe gesture. It receives the new active card index (`number`), allowing you to dynamically sync external captions, counter indicators, or trigger custom analytics events.

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
          for tracking each card as the deck reorders.

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

**Component Path:** `[framework]\memories-card\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
