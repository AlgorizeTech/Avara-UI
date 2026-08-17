# Carousel

A collection of highly interactive carousel components for image galleries, hero sections, and fluid presentations.

## Examples

Four independent components live on this page — three in `carousel.tsx` and the GSAP-powered `FluidGlassSlider`. Each example's **Code** tab holds the source for the file it comes from.

export const usageImage = `import { ImageCarousel } from "@/components/custom/carousel";

const images = [
  "/photos/beach.jpg",
  "/photos/trail.jpg",
  "/photos/retreat.jpg",
];

export default function Gallery() {
  return (
    
  );
}`;

export const usageHero = `import { HeroCarousel } from "@/components/custom/carousel";

const slides = [
  {
    img: "/photos/beach.jpg",
    title: "Tropical Paradise",
    des: "Discover pristine beaches and crystal-clear waters.",
  },
  {
    img: "/photos/trail.jpg",
    title: "Peak Adventures",
    des: "Challenge yourself with epic mountain trails.",
  },
];

export default function Hero() {
  return ;
}`;

export const usageThumbnails = `import { CustomCarousel } from "@/components/custom/carousel";

// \`imageButtonPosition\` moves the thumbnail rail: "bottom" | "left" | "right".
export default function Showcase() {
  return ;
}`;

export const usageThumbnailsSide = ``;

export const usageFluid = `import FluidGlassSlider from "@/components/custom/ui/FluidGlassSlider";

// Requires GSAP — the liquid distortion tracks the pointer.
export default function FluidShowcase() {
  return ;
}`;

## Installation: Standard Carousels

This installation covers the `Standard Image`, `Hero Slider`, and `Thumbnails` variations.

### 1. Copy the Component

Create a new file at `components/custom/carousel.tsx` and copy the source from the **Code** tab of the first example above — it exports all three standard carousels.

Then import the named export you need — `ImageCarousel`, `HeroCarousel` or `CustomCarousel`. Each example's **Usage** tab above shows the exact call.

## Installation: Fluid Glass Slider

This installation covers the Fluid Glass variation, which requires the GSAP animation library for its liquid mouse-tracking and smooth transitions.

```bash
npm install gsap
```

Then create `components/custom/ui/FluidGlassSlider.tsx` and copy the source from the **Code** tab of the **Fluid glass slider** example above.

## Features
Discover the Carousel's powerful features, including touch-swipe support, autoplay functionality, and accessible navigation controls.

    Customizable
    Easily adapt the component's styling and behavior to fit your application's unique design system.

    Accessible
    Built with accessibility in mind, ensuring all users can interact with your application effectively.

    Responsive
    Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

    Performant
    Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

    Usage Guidelines
    Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference: ImageCarousel

        Prop
        Type
        Default
        Description

          images

          ImgSrc[]

          []
        
        Array of string URLs or Next.js StaticImageData objects.

          autoPlay

          boolean

          false
        
        If true, the carousel automatically cycles through images.

          autoPlayInterval

          number

          3000
        
        Time (in ms) before automatically switching to the next slide.

          showArrows

          boolean

          true
        
        Whether to show the previous/next navigation buttons.

          showDots

          boolean

          true
        
        Whether to show the bottom navigation dot indicators.

---

**Component Path:** `nextjs\carousel\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
