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
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
  ],
  colors: [
    { name: "Crimson Red / Black", class: "bg-rose-600" },
    { name: "Vibrant Yellow Edition", class: "bg-amber-400" },
    { name: "Stealth Black / Gold", class: "bg-slate-900" },
    { name: "Minimal Pure White", class: "bg-muted border border-border" },
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
        ProductDetailsVariant
        "modern-split-gallery"
        Selects from the 4 unique footwear product details variants.

        title
        string
        undefined
        Product title string.

        price
        string
        undefined
        Product price string.

        originalPrice
        string
        undefined
        Product original list price for discount badges.

        description
        string
        undefined
        Product summary text.

        className
        string
        ""
        Custom Tailwind CSS class overrides.

---

**Component Path:** `[framework]\product-details\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
