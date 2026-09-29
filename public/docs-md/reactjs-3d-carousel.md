export const metadata = docsPageMetadata("3d-carousel");

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
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  },
  {
    id: "c2",
    category: "Wilderness",
    title: "Lush River Valley",
    description:
      "Sunbeams streaming through valley clouds onto pristine forest waters.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
  },
  {
    id: "c3",
    category: "Landscape",
    title: "Autumn Woodland Path",
    description:
      "Vibrant golden foliage covering quiet forest trails in peak autumn.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
  },
  {
    id: "c4",
    category: "Sanctuary",
    title: "Cascading Mountain Falls",
    description:
      "Fresh mountain spring water cascading through untouched wilderness slopes.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
  },
  {
    id: "c5",
    category: "Expedition",
    title: "Emerald Mountain Peak",
    description:
      "Panoramic views of majestic mountain ridges rising into crisp morning skies.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
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

Or the Motion build (same props, same file — install one):

```bash
npx shadcn@latest add @algorize-ui/carousel-3d-framer
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
          for tracking each card as the fan turns.

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
