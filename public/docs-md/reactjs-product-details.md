# Product Details

A collection of 4 production-ready, high-converting, fully responsive E-commerce Product Details components designed with unique layout architectures, glassmorphism cards, bento hero showcases, and colorway image synchronization.

`ProductDetails` adapts seamlessly across mobile screens, tablets, and desktop viewports, with support for image slider arrows, color-synced previews, stock urgency bars, specs tabs, and checkout CTAs.

export const productData = `const product = {
  title: "Nike Air Max Pulse 2026",
  price: "$189.99",
  originalPrice: "$240.00",
  description: "Engineered with reactive Air Cushioning and breathable Flyknit upper for high-performance city workouts and daily street style.",
  badge: "Special Edition",
  images: [
    "/assets/red-shows.jpg",
    "/assets/purple-shows.jpg",
    "/assets/blue-shows.jpg",
    "/assets/baby-pink-shows.jpg",
  ],
  colors: [
    { name: "Crimson Red", class: "bg-[#BC2433]", bgClass: "bg-primary/10 border-primary/20", image: "/assets/red-shows.jpg" },
    { name: "Vibrant Purple", class: "bg-[#4A2C81]", bgClass: "bg-primary/10 border-primary/20", image: "/assets/purple-shows.jpg" },
    { name: "Cobalt Blue", class: "bg-[#0A53B8]", bgClass: "bg-primary/10 border-primary/20", image: "/assets/blue-shows.jpg" },
    { name: "Baby Pink", class: "bg-[#E4ADB2]", bgClass: "bg-primary/10 border-primary/20", image: "/assets/baby-pink-shows.jpg" },
  ],
  sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
};`;

export const usage1 = `import { ProductDetails } from "@/components/custom/blocks/ProductDetailsBlock";

${productData}

export default function SplitGalleryDemo() {
  return (
    
  );
}`;

export const usage2 = `import { ProductDetails } from "@/components/custom/blocks/ProductDetailsBlock";

${productData}

export default function FloatingGlassCardDemo() {
  return (
    
  );
}`;

export const usage3 = `import { ProductDetails } from "@/components/custom/blocks/ProductDetailsBlock";

${productData}

export default function BentoShowcaseDemo() {
  return (
    
  );
}`;

export const usage4 = `import { ProductDetails } from "@/components/custom/blocks/ProductDetailsBlock";

${productData}

export default function ColorSyncDemo() {
  return (
    
  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/product-details
```

## Features

Discover the key capabilities of the `ProductDetails` component:

    4 Unique Responsive Footwear Layouts
    Includes Modern Split Gallery Slider, Floating Glass Card, Bento Editorial Showcase, and Color-Synced Swatch Gallery.

    100% Screen & Device Responsive
    Fluid Tailwind CSS grid and flex layouts built to adapt from 320px mobile viewports up to 4K ultra-wide screens.

## Props Reference

        Prop
        Type
        Default
        Description

        variant
        "color-sync-gallery" | "modern-split-gallery" | "floating-card-glass" | "bento-editorial-showcase"
        "color-sync-gallery"
        Selects layout architecture from the 4 available variants: "color-sync-gallery", "modern-split-gallery", "floating-card-glass", or "bento-editorial-showcase".

        zoomMode
        "inner" | "side"
        "inner"
        Controls HD image zoom mode for 1st variant (color-sync-gallery). "inner" magnifies directly within the hero frame; "side" projects a 2.8x HD lens window to the right of the image on hover.

        title
        string
        "Nike Air Max Pulse 2026"
        Main product title heading displayed across all variants.

        price
        string
        "$189.99"
        Current product retail or discounted selling price string.

        originalPrice
        string
        "$240.00"
        Original list price string displayed with line-through styling to show savings.

        description
        string
        "Engineered with reactive Air Cushioning..."
        Short description or marketing bio summary text.

        badge
        string
        "Special Edition"
        Promotional badge label text (e.g. "Special Edition", "20% OFF", "Best Seller").

        rating
        number
        4.9
        Product review score out of 5 stars (renders filled yellow star icons).

        reviewsCount
        number
        284
        Total count of verified customer reviews.

        images
        string[]
        DEFAULT_IMAGES
        Array of high-resolution product image URLs for image slider arrows, thumbnail galleries, and colorway syncing.

        colors
        ProductColor[]
        DEFAULT_COLORS
        Array of colorway objects (containing name, class, bgClass, image). Selecting a color swatch dynamically updates active state and swaps main preview image in "color-sync-gallery".

        sizes
        string[]
        DEFAULT_SIZES
        Array of shoe or apparel size strings (e.g. ["US 8", "US 9", "US 10", "US 11", "US 12"]) for size picker grids.

        className
        string
        ""
        Custom Tailwind CSS class overrides applied to wrapper container section.

---

**Component Path:** `[framework]\product-details\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
