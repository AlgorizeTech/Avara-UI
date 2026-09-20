# 3D Carousel

A premium 3D carousel with a fanned layout, smooth interactive animations, and a sleek adaptive aesthetic. It features physics-based touch and mouse drag gestures, keyboard arrow navigation, circular endless fanning, and an auto-play timer that intelligently pauses on hover.

Drag the center card left or right, use the arrow keys, or click a fanned neighbour to bring it forward. Autoplay pauses while the pointer is over the deck.

export const carouselItems = `const items: CarouselItem[] = [
  {
    id: "c1",
    category: "Nature",
    title: "Misty Pine Forest",
    description:
      "Early morning fog weaving through dense evergreen woodland trees.",
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "c2",
    category: "Wilderness",
    title: "Lush River Valley",
    description:
      "Sunbeams streaming through valley clouds onto pristine forest waters.",
    image:
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "c3",
    category: "Landscape",
    title: "Autumn Woodland Path",
    description:
      "Vibrant golden foliage covering quiet forest trails in peak autumn.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "c4",
    category: "Sanctuary",
    title: "Cascading Mountain Falls",
    description:
      "Fresh mountain spring water cascading through untouched wilderness slopes.",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "c5",
    category: "Expedition",
    title: "Emerald Mountain Peak",
    description:
      "Panoramic views of majestic mountain ridges rising into crisp morning skies.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
  },
];`;

export const usageDefault = `import { ThreeDCarousel, type CarouselItem } from "@/components/custom/blocks/ThreeDCarouselBlock";

${carouselItems}

export default function ProductShowcase() {
  return ;
}`;

export const usageShortDeck = `import { ThreeDCarousel, type CarouselItem } from "@/components/custom/blocks/ThreeDCarouselBlock";

${carouselItems}

export default function ShortDeckCarousel() {
  // The fan tightens automatically as the deck shrinks — the circular
  // offset is computed from \`items.length\`.
  return ;
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/carousel-3d
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

          ThreeDCarousel

          items

          CarouselItem[]

          Required

          An array of data objects defining each slide's category, title,
          description, and image URL.

          ThreeDCarousel

          autoPlay

          boolean

          true

          Enables or disables automatic slide advancement. Automatically pauses
          when a user hovers over the carousel.

          ThreeDCarousel

          autoPlayInterval

          number

          4000

          The time duration in milliseconds between automatic slide transitions.

          ThreeDCarousel

          className

          string

          undefined

          Custom Tailwind CSS classes to apply to the outermost responsive flex
          container.

          CarouselItem

          id

          string

          Required

          A unique identifier string required for safe React list rendering and
          Framer Motion layout animation.

          CarouselItem

          title

          string

          Required

          Primary headline text displayed prominently on the card overlay.

          CarouselItem

          category

          string

          Required

          A short descriptive pill/badge label rendered above the title (e.g.,
          "Architecture", "Design").

          CarouselItem

          image

          string

          Required
        
        The URL to the high-resolution background image for the card.

          CarouselItem

          description

          string

          undefined

          Optional supporting paragraph text displayed below the headline.
          Automatically clamped to 2 lines.

---

**Component Path:** `[framework]\3d-carousel\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
