---
title: "Portfolio Showcase"
description: "Shadcn Portfolio Showcase. An edge-to-edge continuous infinite canvas in an organic masonry waterfall layout engineered for creative agencies, design studios."
url: https://avaraui.com/docs/nextjs/portfolio-showcase
---

# Portfolio Showcase

An edge-to-edge continuous infinite canvas in an organic masonry waterfall layout engineered for creative agencies, design studios, and freelance portfolios.

The component pairs smooth 4-directional inertial drag physics (touch, trackpad, and mouse) with an ambient floating drift and automatic camera flights that glide gracefully from card to card. Clicking any project card opens a high-fidelity modal detailing project specifications, deliverables, and interactive action triggers.

## Masonry Portfolio — variant="masonry-portfolio"

Pass `variant="masonry-portfolio"` for an edge-to-edge continuous infinite canvas in a masonry layout. Click & drag anywhere in all 4 directions with smooth momentum physics and ambient floating drift — it wraps infinitely without ever ending.

- Pass `variant="masonry-portfolio"` Selects the edge-to-edge infinite masonry canvas showcasing all cards with smooth inertial physics and centered 3D ambient elevation.
- Set `draggable=true` Enables interactive 4-directional mouse and touch dragging with spring physics and kinetic momentum damping.
- Set `interval=true` Activates continuous smooth auto-scrolling glide across the infinite 2D canvas, pausing automatically during active user drag interactions and project modal inspection.
- Set `intervalTime=5500` Configures how long the camera settles on a project card in milliseconds before initiating flight to the next.
- Set `order="shuffle"` Takes flights in dynamic multi-directional paths across the masonry canvas rather than a single fixed axis.
- Set `stagger=72` Controls the vertical masonry offset between alternate columns, producing an organic waterfall layout where cards do not align rigidly.
- Set `gap=16` Specifies the uniform spacing between adjacent cards in pixels.
- Set `itemModal=true` Opens the high-resolution project modal upon card selection, providing media zoom, client metadata, deliverables, and external actions.

```tsx
"use client";


const PROJECTS = [
  {
    slug: "fintech-aura",
    title: "Aura Fintech Banking",
    category: "Mobile App & Design System",
    client: "Aura Global Financial",
    year: "2026",
    description: "An ultra-modern mobile banking experience and comprehensive design system with real-time liquidity visualization.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/bento-showcase-1790516064489.jpg",
    tags: ["Mobile", "Fintech", "Design System"],
  },
  {
    slug: "minimal-studio",
    title: "Studio Arch Minimal",
    category: "Architecture & Editorial",
    client: "Atelier Architekten",
    year: "2026",
    description: "Monolithic editorial portfolio website for an international architectural studio with spatial photography.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/collage-hero-1790516064493.jpg",
    tags: ["Architecture", "Editorial", "Web Design"],
  },
  {
    slug: "lumina-health",
    title: "Lumina Telehealth AI",
    category: "Healthcare & AI Assistant",
    client: "Lumina Care Systems",
    year: "2025",
    description: "Intelligent diagnostic consultation and care booking workflow connecting patients to certified specialists.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/book-appointment-1790516064490.jpg",
    tags: ["AI", "Healthcare", "Web App"],
  },
  {
    slug: "atelier-fashion",
    title: "Maison Haute Couture",
    category: "Luxury Fashion & Ecommerce",
    client: "Maison Parisienne",
    year: "2026",
    description: "Sensory runway collection showcase and high-converting ecommerce storefront with fluid magnetic carousels.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/fashion-hero-1790516064495.jpg",
    tags: ["Fashion", "Ecommerce", "Creative"],
  },
  {
    slug: "cloud-metrics",
    title: "Pulse Cloud Observability",
    category: "Developer Tools & SaaS",
    client: "Pulse Metrics Inc",
    year: "2025",
    description: "Zero-latency Kubernetes cluster monitoring dashboard with live metrics telemetry.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516056/data-flow-1790516064493.jpg",
    tags: ["SaaS", "Dashboard", "DevTools"],
  },
  {
    slug: "sound-craft",
    title: "Sonic Spatial Experience",
    category: "Interactive Audio & WebGL",
    client: "Sonic Labs Zurich",
    year: "2026",
    description: "Immersive three-dimensional audio-reactive web landscape transforming organic sound frequencies into light sculptures.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/hero-1790516064495.jpg",
    tags: ["WebGL", "Audio", "Interactive"],
  },
];

export default function PortfolioShowcaseExample() {
  return (
    <PortfolioShowcase
      variant="masonry-portfolio"
      items={PROJECTS}
      interval={true}
      intervalTime={5500}
      draggable={true}
      highlightFocus={false}
      order="shuffle"
      stagger={72}
      gap={16}
    />
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/portfolio-showcase.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/portfolio-showcase
```

## Features

Discover the key capabilities that make Portfolio Showcase the ultimate display engine for creative work.

### 2D Infinite Canvas

Cards seamlessly wrap around all 4 screen boundaries with zero stutter or boundaries, creating an uninterrupted endless browsing experience.

### Inertial Momentum Physics

Natural kinetic friction and velocity tracking respond to mouse flings and touch swipes, smoothly decelerating like a physical surface.

### Organic Masonry Stagger

Configurable column offsets produce an asymmetric waterfall composition that highlights projects without rigid row constraints.

### Rich Project Inspection Modal

Clicking any work card pops open an accessible, responsive presentation dialog with client specs, deliverables, and live project triggers.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"masonry-portfolio" \| "fullscreen"` | `"masonry-portfolio"` | Layout presentation style. Defaults to `"masonry-portfolio"` with 3D ambient center cushion and edge-to-edge canvas. |
| `items` | `PortfolioItem[]` | `DEFAULT_PORTFOLIO_ITEMS` | Array of project objects containing `title`, `image`, `category`, `client`, `year`, and `description`. |
| `draggable` | `boolean` | `true` | Enables 4-way mouse, trackpad, and touch panning across the entire canvas with kinetic inertia. |
| `interval` | `boolean \| number` | `true` | Controls automatic canvas animation. When true (or duration in ms), triggers smooth continuous auto-scrolling glide across the infinite 2D canvas. Set to `false` to keep the canvas stationary. |
| `drift` | `boolean \| &#123; x?: number; y?: number &#125;` | `&#123; x: -0.35, y: -0.18 &#125;` | Custom continuous ambient auto-scroll velocity vector. Defaults to `&#123; x: -0.35, y: -0.18 &#125;` when `interval=true`. Pass `false` to disable auto-drift or specify custom velocity. |
| `intervalTime` | `number` | `5500` | Duration in milliseconds the camera settles on a card before transitioning to the next destination. |
| `order` | `"serial" \| "shuffle"` | `"shuffle"` | Camera path sequence: sequential ordering or non-linear multi-directional random flights. |
| `stagger` | `number` | `72` | Vertical masonry displacement in pixels between alternating column tracks. |
| `gap` | `number` | `16` | Spacing in pixels between adjacent cards horizontally and vertically. |
| `zoom` | `number` | `0.55` | Scale multiplier for resting cards on desktop viewports (compact & refined view). |
| `mobileZoom` | `number` | `0.42` | Scale multiplier for cards rendered on compact mobile displays. |
| `itemModal` | `boolean` | `true` | When true, clicking any card launches the comprehensive project details dialog. |
| `cardShadow` | `boolean` | `true` | Renders subtle realistic drop shadows beneath each project card. |
| `highlightFocus` | `boolean` | `false` | When true, selectively highlights the active card while subtly dimming outer cards. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/portfolio-showcase
