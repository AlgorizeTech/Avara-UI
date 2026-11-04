---
title: "Shadcn Product Details"
description: "Shadcn Product Details. Four responsive product details sections for online stores, with bento hero layouts."
url: https://avaraui.com/docs/nextjs/product-details
---

# Shadcn Product Details

A collection of 4 production-ready, high-converting, fully responsive E-commerce Product Details components designed with unique layout architectures, glassmorphism cards, bento hero showcases, and colorway image synchronization.

`ProductDetails` adapts seamlessly across mobile screens, tablets, and desktop viewports, with support for image slider arrows, color-synced previews, stock urgency bars, specs tabs, and checkout CTAs.

## Color Swatch Synced Image Gallery Details

- Use `variant="color-sync-gallery"` selecting a colorway swatch dynamically updates the main product image without sliders or thumbnails.
- Use `zoomMode="inner" | "side"` switch between inside-frame image zoom ('inner') or right-side HD portal zoom ('side').

```tsx
import { ProductDetails } from "@/components/custom/blocks/ProductDetailsBlock";

const product = {
  title: "Nike Air Max Pulse 2026",
  price: "$189.99",
  originalPrice: "$240.00",
  description: "Engineered with reactive Air Cushioning and breathable Flyknit upper for high-performance city workouts and daily street style.",
  badge: "Special Edition",
  images: [
    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516400/red-shows-1790516403807.jpg",
    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516403/purple-shows-1790516403806.jpg",
    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516399/blue-shows-1790516403806.jpg",
    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516397/baby-pink-shows-1790516403806.jpg",
  ],
  colors: [
    { name: "Crimson Red", class: "bg-[#BC2433]", bgClass: "bg-primary/10 border-primary/20", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516400/red-shows-1790516403807.jpg" },
    { name: "Vibrant Purple", class: "bg-[#4A2C81]", bgClass: "bg-primary/10 border-primary/20", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516403/purple-shows-1790516403806.jpg" },
    { name: "Cobalt Blue", class: "bg-[#0A53B8]", bgClass: "bg-primary/10 border-primary/20", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516399/blue-shows-1790516403806.jpg" },
    { name: "Baby Pink", class: "bg-[#E4ADB2]", bgClass: "bg-primary/10 border-primary/20", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516397/baby-pink-shows-1790516403806.jpg" },
  ],
  sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
};

export default function ColorSyncDemo() {
  return (
    <ProductDetails
      variant="color-sync-gallery"
      zoomMode="inner" // Options: "inner" (default image frame zoom) | "side" (right side HD portal zoom)
      title={product.title}
      price={product.price}
      originalPrice={product.originalPrice}
      description={product.description}
      badge={product.badge}
      images={product.images}
      colors={product.colors}
      sizes={product.sizes}
    />
  );
}
```

## Modern Split Gallery Slider Details

- Use `variant="modern-split-gallery"` features floating left/right slider arrows over main image, colorways, stock urgency bar, and specs tabs.

```tsx
import { ProductDetails } from "@/components/custom/blocks/ProductDetailsBlock";

const product = {
  title: "Nike Air Max Pulse 2026",
  price: "$189.99",
  originalPrice: "$240.00",
  description: "Engineered with reactive Air Cushioning and breathable Flyknit upper for high-performance city workouts and daily street style.",
  badge: "Special Edition",
  images: [
    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516400/red-shows-1790516403807.jpg",
    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516403/purple-shows-1790516403806.jpg",
    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516399/blue-shows-1790516403806.jpg",
    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516397/baby-pink-shows-1790516403806.jpg",
  ],
  colors: [
    { name: "Crimson Red", class: "bg-[#BC2433]", bgClass: "bg-primary/10 border-primary/20", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516400/red-shows-1790516403807.jpg" },
    { name: "Vibrant Purple", class: "bg-[#4A2C81]", bgClass: "bg-primary/10 border-primary/20", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516403/purple-shows-1790516403806.jpg" },
    { name: "Cobalt Blue", class: "bg-[#0A53B8]", bgClass: "bg-primary/10 border-primary/20", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516399/blue-shows-1790516403806.jpg" },
    { name: "Baby Pink", class: "bg-[#E4ADB2]", bgClass: "bg-primary/10 border-primary/20", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516397/baby-pink-shows-1790516403806.jpg" },
  ],
  sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
};

export default function SplitGalleryDemo() {
  return (
    <ProductDetails
      variant="modern-split-gallery"
      title={product.title}
      price={product.price}
      originalPrice={product.originalPrice}
      description={product.description}
      badge={product.badge}
      images={product.images}
      colors={product.colors}
      sizes={product.sizes}
    />
  );
}
```

## Floating Glassmorphism Card Details

- Use `variant="floating-card-glass"` clean floating card layout with US shoe size pills and express shipping.

```tsx
import { ProductDetails } from "@/components/custom/blocks/ProductDetailsBlock";

const product = {
  title: "Nike Air Max Pulse 2026",
  price: "$189.99",
  originalPrice: "$240.00",
  description: "Engineered with reactive Air Cushioning and breathable Flyknit upper for high-performance city workouts and daily street style.",
  badge: "Special Edition",
  images: [
    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516400/red-shows-1790516403807.jpg",
    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516403/purple-shows-1790516403806.jpg",
    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516399/blue-shows-1790516403806.jpg",
    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516397/baby-pink-shows-1790516403806.jpg",
  ],
  colors: [
    { name: "Crimson Red", class: "bg-[#BC2433]", bgClass: "bg-primary/10 border-primary/20", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516400/red-shows-1790516403807.jpg" },
    { name: "Vibrant Purple", class: "bg-[#4A2C81]", bgClass: "bg-primary/10 border-primary/20", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516403/purple-shows-1790516403806.jpg" },
    { name: "Cobalt Blue", class: "bg-[#0A53B8]", bgClass: "bg-primary/10 border-primary/20", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516399/blue-shows-1790516403806.jpg" },
    { name: "Baby Pink", class: "bg-[#E4ADB2]", bgClass: "bg-primary/10 border-primary/20", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516397/baby-pink-shows-1790516403806.jpg" },
  ],
  sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
};

export default function FloatingGlassCardDemo() {
  return (
    <ProductDetails
      variant="floating-card-glass"
      title={product.title}
      price={product.price}
      originalPrice={product.originalPrice}
      description={product.description}
      badge={product.badge}
      images={product.images}
      colors={product.colors}
      sizes={product.sizes}
    />
  );
}
```

## Bento Editorial Showcase Details

- Use `variant="bento-editorial-showcase"` features a full-bleed dark hero image backdrop with compact buy panel.

```tsx
import { ProductDetails } from "@/components/custom/blocks/ProductDetailsBlock";

const product = {
  title: "Nike Air Max Pulse 2026",
  price: "$189.99",
  originalPrice: "$240.00",
  description: "Engineered with reactive Air Cushioning and breathable Flyknit upper for high-performance city workouts and daily street style.",
  badge: "Special Edition",
  images: [
    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516400/red-shows-1790516403807.jpg",
    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516403/purple-shows-1790516403806.jpg",
    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516399/blue-shows-1790516403806.jpg",
    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516397/baby-pink-shows-1790516403806.jpg",
  ],
  colors: [
    { name: "Crimson Red", class: "bg-[#BC2433]", bgClass: "bg-primary/10 border-primary/20", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516400/red-shows-1790516403807.jpg" },
    { name: "Vibrant Purple", class: "bg-[#4A2C81]", bgClass: "bg-primary/10 border-primary/20", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516403/purple-shows-1790516403806.jpg" },
    { name: "Cobalt Blue", class: "bg-[#0A53B8]", bgClass: "bg-primary/10 border-primary/20", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516399/blue-shows-1790516403806.jpg" },
    { name: "Baby Pink", class: "bg-[#E4ADB2]", bgClass: "bg-primary/10 border-primary/20", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516397/baby-pink-shows-1790516403806.jpg" },
  ],
  sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
};

export default function BentoShowcaseDemo() {
  return (
    <ProductDetails
      variant="bento-editorial-showcase"
      title={product.title}
      price={product.price}
      originalPrice={product.originalPrice}
      description={product.description}
      badge={product.badge}
      images={product.images}
      colors={product.colors}
      sizes={product.sizes}
    />
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/product-details.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/product-details
```

## Features

Discover the key capabilities of the `ProductDetails` component:

### 4 Unique Responsive Footwear Layouts

Includes Modern Split Gallery Slider, Floating Glass Card, Bento Editorial Showcase, and Color-Synced Swatch Gallery.

### 100% Screen & Device Responsive

Fluid Tailwind CSS grid and flex layouts built to adapt from 320px mobile viewports up to 4K ultra-wide screens.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"color-sync-gallery" \| "modern-split-gallery" \| "floating-card-glass" \| "bento-editorial-showcase"` | `"color-sync-gallery"` | Selects layout architecture from the 4 available variants: `"color-sync-gallery"`, `"modern-split-gallery"`, `"floating-card-glass"`, or `"bento-editorial-showcase"`. |
| `zoomMode` | `"inner" \| "side"` | `"inner"` | Controls HD image zoom mode for 1st variant (`color-sync-gallery`). `"inner"` magnifies directly within the hero frame; `"side"` projects a 2.8x HD lens window to the right of the image on hover. |
| `title` | `string` | `"Nike Air Max Pulse 2026"` | Main product title heading displayed across all variants. |
| `price` | `string` | `"$189.99"` | Current product retail or discounted selling price string. |
| `originalPrice` | `string` | `"$240.00"` | Original list price string displayed with line-through styling to show savings. |
| `description` | `string` | `"Engineered with reactive Air Cushioning..."` | Short description or marketing bio summary text. |
| `badge` | `string` | `"Special Edition"` | Promotional badge label text (e.g. `"Special Edition"`, `"20% OFF"`, `"Best Seller"`). |
| `rating` | `number` | `4.9` | Product review score out of 5 stars (renders filled yellow star icons). |
| `reviewsCount` | `number` | `284` | Total count of verified customer reviews. |
| `images` | `string[]` | `DEFAULT_IMAGES` | Array of high-resolution product image URLs for image slider arrows, thumbnail galleries, and colorway syncing. |
| `colors` | `ProductColor[]` | `DEFAULT_COLORS` | Array of colorway objects (containing `name`, `class`, `bgClass`, `image`). Selecting a color swatch dynamically updates active state and swaps main preview image in `"color-sync-gallery"`. |
| `sizes` | `string[]` | `DEFAULT_SIZES` | Array of shoe or apparel size strings (e.g. `["US 8", "US 9", "US 10", "US 11", "US 12"]`) for size picker grids. |
| `className` | `string` | `""` | Custom Tailwind CSS class overrides applied to wrapper container section. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/product-details
