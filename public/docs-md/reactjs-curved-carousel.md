# Curved Carousel

An interactive, 100% full-width 3D curved arc carousel featuring left-to-right oscillating auto-sway motion, smooth Framer Motion spring physics, perspective depth cards, and dynamic site theme color binding.

`CurvedCarousel` transforms standard image galleries into an immersive, fanned 3D arc deck with customizable speed, touch/drag controls, and dark mode support.

export const usageArcSweep = `import { CurvedCarousel } from "@/components/custom/blocks/CurvedCarouselBlock";

const customItems = [
  { id: "1", title: "Misty Pine Forest", code: "001", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80" },
  { id: "2", title: "Alpine Mountain Reflection", code: "002", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80" },
  { id: "3", title: "Glacier Lake Wilderness", code: "003", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80" },
];

export default function CurvedCarouselDemo() {
  return ;
}`;

export const usageInfiniteMarquee = `import { CurvedCarousel } from "@/components/custom/blocks/CurvedCarouselBlock";

const customItems = [
  { id: "1", title: "Misty Pine Forest", code: "001", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80" },
  { id: "2", title: "Alpine Mountain Reflection", code: "002", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80" },
  { id: "3", title: "Glacier Lake Wilderness", code: "003", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80" },
];

export default function InfiniteMarqueeDemo() {
  return ;
}`;

## Installation

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

          "arc-sweep" | "perspective-fan" | "floating-deck" | "glowing-orbit"

          "arc-sweep"
        
        Selects the active 3D curve layout architecture and movement style.

          items

          CurvedCarouselItem[]

          Preset Array
        
        Array of objects containing id, title, image, subtitle, and optional tag.

          autoPlay

          boolean

          true
        
        Enables or disables continuous automatic left-to-right sway animation.

          speed

          number

          4
        
        Oscillation sway step speed interval in seconds.

          color

          CurvedCarouselColor | string

          "primary"
        
        Applies dynamic theme color palettes ("primary" | "indigo" | "rose" | "emerald" | "zinc" or custom hex).

          className

          string

          ""
        
        Custom Tailwind CSS classes applied to the root container.

---

**Component Path:** `[framework]\curved-carousel\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
