# Curved Carousel

An interactive, 100% full-width 3D curved arc carousel featuring left-to-right oscillating auto-sway motion, smooth Framer Motion spring physics, perspective depth cards, and dynamic site theme color binding.

`CurvedCarousel` transforms standard image galleries into an immersive, fanned 3D arc deck with customizable speed, touch/drag controls, and dark mode support.

export const usageArcSweep = `import { CurvedCarousel, type CurvedCarouselCard } from "@/components/custom/blocks/CurvedCarouselBlock";

const items: CurvedCarouselCard[] = [
  { id: "card-1", title: "Misty Pine Forest", code: "001", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg" },
  { id: "card-2", title: "Alpine Mountain Reflection", code: "002", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg" },
  { id: "card-3", title: "Glacier Lake Wilderness", code: "003", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg" },
  { id: "card-4", title: "Autumn Woodland River", code: "004", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg" },
  { id: "card-5", title: "Golden Hour Valley", code: "005", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150481/photo-1507272931001-fc06c17e4f43-1790150482276.jpg" },
  { id: "card-6", title: "Mountain Ridge Sunset", code: "006", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1472214103451-9374bd1c798e-1790146212205.jpg" },
  { id: "card-7", title: "Cascading Forest Waterfall", code: "007", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg" },
  { id: "card-8", title: "Deep Wilderness Forest", code: "008", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg" },
  { id: "card-9", title: "Emerald Mountain Meadow", code: "009", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg" },
  { id: "card-10", title: "Serene Desert Canyon", code: "010", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1509316975850-ff9c5deb0cd9-1790146212209.jpg" },
  { id: "card-11", title: "Sunlit Pine Woods", code: "011", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148863/photo-1473448912268-2022ce9509d8-1790148865110.jpg" },
  { id: "card-12", title: "Mystic Fog Peak", code: "012", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1519681393784-d120267933ba-1790146212210.jpg" },
];

export default function CurvedCarouselDemo() {
  return (
    
  );
}`;

export const usageInfiniteMarquee = `import { CurvedCarousel, type CurvedCarouselCard } from "@/components/custom/blocks/CurvedCarouselBlock";

const items: CurvedCarouselCard[] = [
  { id: "card-1", title: "Misty Pine Forest", code: "001", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg" },
  { id: "card-2", title: "Alpine Mountain Reflection", code: "002", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg" },
  { id: "card-3", title: "Glacier Lake Wilderness", code: "003", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg" },
  { id: "card-4", title: "Autumn Woodland River", code: "004", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg" },
  { id: "card-5", title: "Golden Hour Valley", code: "005", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150481/photo-1507272931001-fc06c17e4f43-1790150482276.jpg" },
  { id: "card-6", title: "Mountain Ridge Sunset", code: "006", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1472214103451-9374bd1c798e-1790146212205.jpg" },
  { id: "card-7", title: "Cascading Forest Waterfall", code: "007", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg" },
  { id: "card-8", title: "Deep Wilderness Forest", code: "008", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg" },
  { id: "card-9", title: "Emerald Mountain Meadow", code: "009", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg" },
  { id: "card-10", title: "Serene Desert Canyon", code: "010", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1509316975850-ff9c5deb0cd9-1790146212209.jpg" },
  { id: "card-11", title: "Sunlit Pine Woods", code: "011", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148863/photo-1473448912268-2022ce9509d8-1790148865110.jpg" },
  { id: "card-12", title: "Mystic Fog Peak", code: "012", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1519681393784-d120267933ba-1790146212210.jpg" },
];

export default function InfiniteMarqueeDemo() {
  return (
    
  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/curved-carousel
```

## Features

    Oscillating Auto-Sway
    Cards automatically sway left and right in a continuous, smooth oscillating loop.

    3D Curved Arc Geometry
    Calculates precise 3D Y-rotation, Z-rotation, and Y-translation to form a realistic curved arc deck.

    100% Theme Color Engine
    Binds directly to site primary CSS variable var(--primary) or explicit color swatches.

    Fluid Responsive & Touch
    Fully responsive container sizing with click-to-center navigation and hover pause controls.

## Best Practices & Guidelines

    When to Use
    Use CurvedCarousel on hero sections, portfolio showcases, product galleries, or brand story cards to capture high user engagement with fluid 3D motion.

## Props Reference

        Prop
        Type
        Default
        Description

          variant

          "arc-sweep" | "infinite-marquee"

          "arc-sweep"
        
        Selects the active 3D curve layout architecture and movement style.

          items

          CurvedCarouselCard[]

          Preset Array
        
        Array of objects containing id, title, code, and image.

          autoPlay

          boolean

          true
        
        Enables or disables continuous automatic left-to-right sway animation.

          speed

          number

          1
        
        Oscillation sway step speed multiplier.

          color

          "primary" | "indigo" | "rose" | "emerald" | "zinc" | string

          "primary"
        
        Applies dynamic theme color palettes ("primary" | "indigo" | "rose" | "emerald" | "zinc" or custom hex).

          className

          string

          ""
        
        Custom Tailwind CSS classes applied to the root container.

---

**Component Path:** `[framework]\curved-carousel\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
