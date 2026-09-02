# Carousel

A collection of highly interactive carousel components for image galleries, hero sections, and fluid presentations.

Four independent components live on this page — four in `carousel.tsx` (`ImageCarousel`, `HeroCarousel`, `CustomCarousel`, `RadialCarousel`) and the GSAP-powered `FluidGlassSlider`, which installs on its own.

## Carousels

export const usageFluid = `import { FluidGlassSlider, FluidGlassSlide } from "@/components/custom/carousel";

const customSlides: FluidGlassSlide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2574&auto=format&fit=crop",
    title: "Discover pristine tropical beaches and crystal-clear waters",
    subtitle: "TROPICAL PARADISE",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2574&auto=format&fit=crop",
    title: "Escape to the serene mountain heights and wilderness trails",
    subtitle: "MOUNTAIN ADVENTURES",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2574&auto=format&fit=crop",
    title: "Surround yourself with majestic peaks and alpine lakes",
    subtitle: "ALPINE RETREAT",
  },
];

export default function FluidGlassSliderDemo() {
  return (
    
  );
}`;

export const usageImage = `import { ImageCarousel } from "@/components/custom/carousel";

const sampleImages = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=1080&fit=crop",
];

export default function ImageCarouselDemo() {
  return (

  );
}`;

export const usageRadial = `import { RadialCarousel, RadialCarouselItem } from "@/components/custom/carousel";

const customItems: RadialCarouselItem[] = [
  {
    title: "Misty Pine Forest",
    category: "Nature",
    rating: "4.9",
    price: "$120",
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&fit=crop",
  },
  {
    title: "Lush River Valley",
    category: "Wilderness",
    rating: "4.8",
    price: "$150",
    img: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&fit=crop",
  },
  {
    title: "Autumn Woodland Path",
    category: "Landscape",
    rating: "4.9",
    price: "$95",
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&fit=crop",
  },
];

export default function RadialCarouselDemo() {
  return (

  );
}`;

export const usageHero = `import { HeroCarousel, HeroSlide } from "@/components/custom/carousel";

const sampleSlides: HeroSlide[] = [
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
];

export default function HeroCarouselDemo() {
  return (

  );
}`;

export const usageThumbnails = `import { CustomCarousel, CustomItem } from "@/components/custom/carousel";

const sampleSlides: CustomItem[] = [
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
];

export default function CustomCarouselDemo() {
  return (

  );
}`;

export const usageThumbnailsSide = `import { CustomCarousel, CustomItem } from "@/components/custom/carousel";

const sampleSlides: CustomItem[] = [
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
];

export default function SideThumbnailsCarouselDemo() {
  return (

  );
}`;

### Installation

All five carousels (`RadialCarousel`, `FluidGlassSlider`, `ImageCarousel`, `HeroCarousel`, `CustomCarousel`) ship together in a single self-contained `carousel.tsx` file when installing `carousel`. You can import components directly or pass `variant="radial" | "glass" | "image" | "hero" | "thumbnails"` into the default `Carousel` component.

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

## Props Reference

### Unified Carousel (Default Export)

        Prop
        Type
        Default
        Description

        variant
        "radial" | "glass" | "image" | "hero" | "thumbnails"
        "image"
        The layout variant to render.

        images
        ImgSrc[]
        []
        Array of image URLs or StaticImageData objects (for "image" variant).

        slides
        any[]
        []
        Array of slide objects (for "glass" or "hero" variants).

        items
        any[]
        []
        Array of item objects (for "radial" or "thumbnails" variants).

        className
        string
        -
        Custom CSS styling classes for the outer wrapper.

### RadialCarousel

        Prop
        Type
        Default
        Description

        items
        RadialCarouselItem[]
        []
        Array of cards with {`{ title, category, rating, price?, img }`} radiating in 360 degrees.

        autoPlay
        boolean
        false
        If true, continuously rotates the 3D wheel.

        autoPlayInterval
        number
        3500
        Interval (in ms) between auto rotations.

        stepAngle
        number
        360 / items.length
        Rotation angle step per card in degrees.

        className
        string
        -
        Outer container styling.

### FluidGlassSlider

        Prop
        Type
        Default
        Description

        slides
        FluidGlassSlide[]
        DEFAULT_SLIDES
        Array of glass slides with {`{ id, image, title, subtitle }`}.

        className
        string
        -
        Container dimensions, borders, and shadows.

### ImageCarousel

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
        If true, automatically cycles through images.

        autoPlayInterval
        number
        3000
        Time (in ms) before automatically switching slides.

        showArrows
        boolean
        true
        Whether to show previous/next navigation buttons.

        showDots
        boolean
        true
        Whether to show bottom navigation dot indicators.

        transitionDuration
        number
        500
        Transition animation duration in milliseconds.

        imageWidth
        number
        1200
        Default image width in pixels.

        imageHeight
        number
        540
        Default image height in pixels.

### HeroCarousel

        Prop
        Type
        Default
        Description

        slides
        HeroSlide[]
        []
        Array of full-bleed hero slides with {`{ img, title, des }`}.

        autoPlay
        boolean
        false
        If true, auto-advances the background hero slides.

        autoPlayInterval
        number
        3000
        Time (in ms) before advancing to the next hero slide.

### CustomCarousel (Thumbnails)

        Prop
        Type
        Default
        Description

        items
        CustomItem[]
        []
        Array of thumbnail slides with {`{ img, title, des }`}.

        imageButtonPosition
        "bottom" | "left" | "right"
        "bottom"
        Placement of the thumbnail selector strip.

        autoPlay
        boolean
        false
        If true, auto-advances through thumbnail items.

        autoPlayInterval
        number
        3000
        Time (in ms) between slide changes.

---

**Component Path:** `[framework]\carousel\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
