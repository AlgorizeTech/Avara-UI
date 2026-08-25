# Carousel

A collection of highly interactive carousel components for image galleries, hero sections, and fluid presentations.

Four independent components live on this page — three in `carousel.tsx` and the GSAP-powered `FluidGlassSlider`, which installs on its own.

## Carousels

export const usageImage = `import { ImageCarousel } from "@/components/custom/carousel";

const images = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=1080&fit=crop",
];

export default function Gallery() {
  return (
    
  );
}`;

export const carouselSlides = `const slides = [
  {
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
    title: "Tropical Paradise",
    des: "Discover pristine beaches and crystal-clear waters.",
  },
  {
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop",
    title: "Peak Adventures",
    des: "Challenge yourself with epic mountain trails.",
  },
  {
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=1080&fit=crop",
    title: "Mountain Retreat",
    des: "Escape to the serene heights and breathe fresh air.",
  },
];`;

export const usageHero = `import { HeroCarousel } from "@/components/custom/carousel";

${carouselSlides}

export default function Hero() {
  return ;
}`;

export const usageThumbnails = `import { CustomCarousel } from "@/components/custom/carousel";

${carouselSlides}

// \`imageButtonPosition\` moves the thumbnail rail: "bottom" | "left" | "right".
export default function Showcase() {
  return ;
}`;

export const usageThumbnailsSide = `import { CustomCarousel } from "@/components/custom/carousel";

${carouselSlides}

export default function SideThumbnails() {
  return ;
}`;

export const usageFluid = `import FluidGlassSlider from "@/components/custom/ui/FluidGlassSlider";

// Requires GSAP — the liquid distortion tracks the pointer.
export default function FluidShowcase() {
  return ;
}`;

## Examples

### Installation

The three carousels above ship in one file. `FluidGlassSlider` is a separate
item — installing `carousel` does not pull it in:

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

**Component Path:** `[framework]\carousel\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
