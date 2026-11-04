---
title: "Carousel"
description: "A collection of highly interactive carousel components for image galleries, hero sections, and fluid presentations. Free shadcn/ui Carousel component."
url: https://avaraui.com/docs/nextjs/carousel
---

# Carousel

A collection of highly interactive carousel components for image galleries, hero sections, and fluid presentations.

Four independent components live on this page — four in `carousel.tsx` (`ImageCarousel`, `HeroCarousel`, `CustomCarousel`, `RadialCarousel`) and the `FluidGlassSlider`, which installs on its own.

## Carousels

### Radial carousel

`RadialCarousel` arranges cards in a full 360-degree 3D radial wheel radiating in all four directions around a central hub with smooth drag momentum. The hub at the exact centre is a play/pause button for autoplay (`autoPlay` sets whether it starts playing), and cards further from the top fade toward the page background so the wheel works in light and dark themes.

- Pass `items` as `{ title, category, rating, img }[]` — cards radiate in 360 degrees around the center.
- `stepAngle` controls the rotation angle increment between cards (default is 360 / items.length).

```tsx
import { RadialCarousel, type RadialCarouselItem } from "@/components/custom/carousel";

const customItems: RadialCarouselItem[] = [
  {
    title: "Misty Pine Forest",
    category: "Nature",
    rating: "4.9",
    price: "$120",
    img: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
  },
  {
    title: "Lush River Valley",
    category: "Wilderness",
    rating: "4.8",
    price: "$150",
    img: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
  },
  {
    title: "Autumn Woodland Path",
    category: "Landscape",
    rating: "4.9",
    price: "$95",
    img: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
  },
];

export default function RadialCarouselDemo() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-border shadow-sm bg-foreground/5">
      <RadialCarousel
        items={customItems}
        autoPlay={true}
        autoPlayInterval={3500}
      />
    </div>
  );
}
```

### Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/carousel.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/carousel
```

All five carousels (`RadialCarousel`, `FluidGlassSlider`, `ImageCarousel`, `HeroCarousel`, `CustomCarousel`) ship together in a single self-contained `carousel.tsx` file when installing `carousel`. You can import components directly or pass `variant="radial" | "glass" | "image" | "hero" | "thumbnails"` into the default `Carousel` component.

### Fluid glass slider

`FluidGlassSlider` is a liquid glass distortion slider featuring dynamic cursor tracking, glassmorphism overlays, and smooth progress tracking.

- Pass `className` to customize container dimensions, borders, and shadows.

```tsx
import { FluidGlassSlider, type FluidGlassSlide } from "@/components/custom/carousel";

const customSlides: FluidGlassSlide[] = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_2574,c_limit/v1790146210/photo-1506905925346-21bda4d32df4-1790146212208.jpg",
    title: "Discover pristine tropical beaches and crystal-clear waters",
    subtitle: "TROPICAL PARADISE",
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_2574,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
    title: "Escape to the serene mountain heights and wilderness trails",
    subtitle: "MOUNTAIN ADVENTURES",
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_2574,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
    title: "Surround yourself with majestic peaks and alpine lakes",
    subtitle: "ALPINE RETREAT",
  },
];

export default function FluidGlassSliderDemo() {
  return (
    <FluidGlassSlider
      slides={customSlides}
      className="w-full rounded-xl border border-border shadow-sm"
    />
  );
}
```

### Image carousel

`ImageCarousel` handles arrows, dots, swipe and autoplay for you.

- Pass `images` as a flat array of URL strings or Next.js `StaticImageData` objects.
- `autoPlay` is off by default; on, it advances every `autoPlayInterval` ms (3000).
- `showArrows` and `showDots` are both on by default — set either to `false` to hide it.

```tsx
import { ImageCarousel } from "@/components/custom/carousel";

const sampleImages = [
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790146210/photo-1506905925346-21bda4d32df4-1790146212208.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
];

export default function ImageCarouselDemo() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-border shadow-sm">
      <ImageCarousel
        images={sampleImages}
        autoPlay={true}
        autoPlayInterval={3000}
        showArrows={true}
        showDots={true}
      />
    </div>
  );
}
```

### Hero carousel

`HeroCarousel` overlays copy on a full-bleed image — click any image card to set it as the background.

- Pass `slides` as `{ img, title, des }[]` — `des` is the supporting line under the title.

```tsx
import { HeroCarousel, type HeroSlide } from "@/components/custom/carousel";

const sampleSlides: HeroSlide[] = [
  {
    img: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790146210/photo-1506905925346-21bda4d32df4-1790146212208.jpg",
    title: "Tropical Paradise",
    des: "Discover pristine beaches and crystal-clear waters.",
  },
  {
    img: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
    title: "Peak Adventures",
    des: "Challenge yourself with epic mountain trails.",
  },
  {
    img: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
    title: "Mountain Retreat",
    des: "Escape to the serene heights and breathe fresh air.",
  },
];

export default function HeroCarouselDemo() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-border shadow-sm">
      <HeroCarousel slides={sampleSlides} autoPlay={true} autoPlayInterval={3000} />
    </div>
  );
}
```

### Thumbnail rail

`CustomCarousel` adds a clickable thumbnail strip.

- `imageButtonPosition="bottom"` is the default — the rail sits under the main image.
- `items` is the slide array this variant reads, rather than `images`.

```tsx
import { CustomCarousel, type CustomItem } from "@/components/custom/carousel";

const sampleSlides: CustomItem[] = [
  {
    img: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790146210/photo-1506905925346-21bda4d32df4-1790146212208.jpg",
    title: "Tropical Paradise",
    des: "Discover pristine beaches and crystal-clear waters.",
  },
  {
    img: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
    title: "Peak Adventures",
    des: "Challenge yourself with epic mountain trails.",
  },
  {
    img: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
    title: "Mountain Retreat",
    des: "Escape to the serene heights and breathe fresh air.",
  },
];

export default function CustomCarouselDemo() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-border shadow-sm">
      <CustomCarousel items={sampleSlides} imageButtonPosition="bottom" autoPlay={true} />
    </div>
  );
}
```

### Side thumbnails

- Move the rail with `imageButtonPosition="left"` — or `"right"` — for a gallery-style layout.

```tsx
import { CustomCarousel, type CustomItem } from "@/components/custom/carousel";

const sampleSlides: CustomItem[] = [
  {
    img: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790146210/photo-1506905925346-21bda4d32df4-1790146212208.jpg",
    title: "Tropical Paradise",
    des: "Discover pristine beaches and crystal-clear waters.",
  },
  {
    img: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
    title: "Peak Adventures",
    des: "Challenge yourself with epic mountain trails.",
  },
  {
    img: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
    title: "Mountain Retreat",
    des: "Escape to the serene heights and breathe fresh air.",
  },
];

export default function SideThumbnailsCarouselDemo() {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-border shadow-sm">
      <CustomCarousel items={sampleSlides} imageButtonPosition="left" autoPlay={true} />
    </div>
  );
}
```

## Features
Discover the Carousel's powerful features, including touch-swipe support, autoplay functionality, and accessible navigation controls.

### Customizable

Easily adapt the component's styling and behavior to fit your application's unique design system.

### Accessible

Built with accessibility in mind, ensuring all users can interact with your application effectively.

### Responsive

Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

### Performant

Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

### Usage Guidelines

Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

### Unified Carousel (Default Export)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"radial" \| "glass" \| "image" \| "hero" \| "thumbnails"` | `"image"` | The layout variant to render. |
| `images` | `ImgSrc[]` | `[]` | Array of image URLs or StaticImageData objects (for `"image"` variant). |
| `slides` | `any[]` | `[]` | Array of slide objects (for `"glass"` or `"hero"` variants). |
| `items` | `any[]` | `[]` | Array of item objects (for `"radial"` or `"thumbnails"` variants). |
| `className` | `string` | `-` | Custom CSS styling classes for the outer wrapper. |

### RadialCarousel

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `RadialCarouselItem[]` | `[]` | Array of cards with `{ title, category, rating, price?, img }` radiating in 360 degrees. |
| `autoPlay` | `boolean` | `false` | If true, continuously rotates the 3D wheel. |
| `autoPlayInterval` | `number` | `3500` | Interval (in ms) between auto rotations. |
| `stepAngle` | `number` | `360 / items.length` | Rotation angle step per card in degrees. |
| `className` | `string` | `-` | Outer container styling. |

### FluidGlassSlider

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `slides` | `FluidGlassSlide[]` | `DEFAULT_SLIDES` | Array of glass slides with `{ id, image, title, subtitle }`. |
| `className` | `string` | `-` | Container dimensions, borders, and shadows. |

### ImageCarousel

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `images` | `ImgSrc[]` | `[]` | Array of string URLs or Next.js StaticImageData objects. |
| `autoPlay` | `boolean` | `false` | If true, automatically cycles through images. |
| `autoPlayInterval` | `number` | `3000` | Time (in ms) before automatically switching slides. |
| `showArrows` | `boolean` | `true` | Whether to show previous/next navigation buttons. |
| `showDots` | `boolean` | `true` | Whether to show bottom navigation dot indicators. |
| `transitionDuration` | `number` | `500` | Transition animation duration in milliseconds. |
| `imageWidth` | `number` | `1200` | Default image width in pixels. |
| `imageHeight` | `number` | `540` | Default image height in pixels. |

### HeroCarousel

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `slides` | `HeroSlide[]` | `[]` | Array of full-bleed hero slides with `{ img, title, des }`. |
| `autoPlay` | `boolean` | `false` | If true, auto-advances the background hero slides. |
| `autoPlayInterval` | `number` | `3000` | Time (in ms) before advancing to the next hero slide. |

### CustomCarousel (Thumbnails)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `CustomItem[]` | `[]` | Array of thumbnail slides with `{ img, title, des }`. |
| `imageButtonPosition` | `"bottom" \| "left" \| "right"` | `"bottom"` | Placement of the thumbnail selector strip. |
| `autoPlay` | `boolean` | `false` | If true, auto-advances through thumbnail items. |
| `autoPlayInterval` | `number` | `3000` | Time (in ms) between slide changes. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/carousel
