export const metadata = docsPageMetadata("squircle-carousel");

# Squircle Carousel

Horizontal flowing carousel where images are masked behind a grid of rounded cubes with snap physics and smooth inertia.

Drag the stage left or right to explore images seamlessly across squircle tiles.

export const usageCode = `import { SquircleCarousel, type SquircleCarouselItem } from "@/components/custom/squircle-carousel";

const items: SquircleCarouselItem[] = [
  {
    id: "1",
    title: "Misty Pine Forest",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  },
  {
    id: "2",
    title: "Alpine Glacier Lake",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
  },
  {
    id: "3",
    title: "Sunset Mountain Range",
    imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  },
];

export default function SquircleCarouselDemo() {
  return (
    
  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/squircle-carousel
```

## Features
Discover the key capabilities that make this component an excellent choice for modern, animated user interfaces.

    Squircle Grid Masking
    Images flow seamlessly behind a matrix of rounded squircle tiles for an ultra-modern aesthetic.

    Drag & Inertia Physics
    Interactive mouse and touch drag controls with grab cursor and smooth momentum deceleration.

    Responsive Stage Scaling
    Automatically adapts height and squircle tile density across mobile, tablet, and desktop viewports.

    Light & Dark Theme Adaptation
    Built with Next Themes integration to transition canvas backgrounds and edge gradient overlays dynamically.

## Best Practices & Guidelines

    Animation Performance
    Use high-resolution landscape images (1200x800 or larger) so that sub-crops render crisp fragments across all squircle columns.

    State Management
    Images are preloaded asynchronously into HTMLImageElement instances before canvas rendering to prevent flickering during drag gestures.

## Props Reference

        Component
        Prop
        Type
        Default
        Description

          SquircleCarousel

          items

          SquircleCarouselItem[]

          DEFAULT_NATURE_ITEMS

          Array of image items containing {`{ id, title, imageUrl }`} to display in the carousel.

          SquircleCarousel

          rows

          number

          4

          Number of horizontal rows in the squircle tile matrix.

          SquircleCarousel

          gridGap

          number

          8

          The gap spacing in pixels between squircle tiles.

          SquircleCarousel

          fadeWidthPercent

          number

          36

          Edge fade gradient overlay width percentage (0 to 50).

          SquircleCarousel

          showHeaderShell

          boolean

          false

          When set to true, displays the outer header metadata title, tags, buttons, and footer caption.

          SquircleCarousel

          className

          string

          undefined

          Custom Tailwind CSS classes to apply to the stage container element.

---

**Component Path:** `[framework]\squircle-carousel\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
