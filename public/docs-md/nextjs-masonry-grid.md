---
title: "Masonry Grid"
description: "A high-performance masonry layout that tightly packs items of varying heights. Free shadcn/ui Masonry Grid component with GSAP and Motion builds."
url: https://avaraui.com/docs/nextjs/masonry-grid
---

# Masonry Grid

A high-performance masonry layout that tightly packs items of varying heights. Rather than relying on heavy JavaScript calculations or absolute positioning frameworks, this component utilizes standard CSS multi-column layout (`columns-N`) to flow items naturally.

This premium iteration includes hardware-accelerated blur-fade entrances, layout animations for dynamic content reflows, and a scroll-triggered entrance sequence for high-end aesthetic presentation. It ships as a GSAP build and a Motion build with the same motion.

---

The layout is plain CSS multi-column, so reflow is the browser's job and resizing is free — drag a preview's width handle to watch the columns recalculate.

## Masonry grid

The grid never measures anything — it flows your tiles through CSS columns.

- Pass `items` as an array where each entry has a unique `id` for layout tracking.
- `renderItem` receives `(item, index)` and returns the tile element.

```tsx
import { MasonryGrid } from "@/components/custom/blocks/MasonryGridBlock";

import { ArrowUpRight } from "lucide-react";

type GridItem = {
  id: string;
  type: "card" | "image" | "gradient";
  height: string;
  title?: string;
  desc?: string;
  image?: string;
  icon?: React.ReactNode;
  theme?: "blue" | "purple" | "emerald" | "rose";
};

// The grid handles the column flow; every tile is yours to render.
function renderItem(item: GridItem) {
  if (item.type === "image") {
    return (
      <div className={[item.height, "w-full rounded-2xl overflow-hidden relative group cursor-pointer border border-foreground/[0.08]"].join(" ")}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        <img src={item.image} alt="Gallery masonry" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute bottom-6 left-6 right-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 flex justify-between items-center text-white">
          <span className="font-medium text-sm tracking-wide">View Project</span>
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
    );
  }

  if (item.type === "gradient") {
    return (
      <div className={[item.height, "w-full p-5 sm:p-6 md:p-8 rounded-2xl relative group cursor-pointer overflow-hidden border border-border bg-card"].join(" ")}>
        <div className="relative z-10 flex flex-col items-start justify-between h-full w-full overflow-hidden">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shrink-0">
            {item.icon}
          </div>
          <div className="w-full">
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-card-foreground mb-1 leading-snug">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-normal">
              {item.desc}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={[item.height, "w-full p-5 sm:p-6 md:p-8 rounded-2xl bg-card border border-border transition-all duration-500 hover:border-foreground/20 hover:-translate-y-1 flex flex-col items-start justify-between cursor-pointer group relative overflow-hidden"].join(" ")}>
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 shrink-0 bg-primary/10 text-primary border border-primary/20">
        {item.icon}
      </div>
      <div className="w-full pr-6">
        <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-card-foreground mb-1.5 leading-snug">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {item.desc}
        </p>
      </div>
      <div className="absolute top-5 right-5 sm:top-8 sm:right-8 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
        <ArrowUpRight className="w-4 h-4" />
      </div>
    </div>
  );
}


const items: GridItem[] = [
  { id: "1", type: "card", height: "h-56", title: "Alpine Forest Research", desc: "Exploring ancient pine ecosystems.", icon: <Layers className="w-5 h-5" />, theme: "blue" },
  { id: "2", type: "image", height: "h-[28rem]", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg" },
  { id: "3", type: "gradient", height: "h-48", title: "Mountain Ridge Wind", desc: "Atmospheric motion in high altitude.", icon: <Wand2 className="w-5 h-5" />, theme: "purple" },
  { id: "4", type: "card", height: "h-72", title: "Emerald Canopy", desc: "Dense rainforest vegetation metrics.", icon: <Cpu className="w-5 h-5" />, theme: "emerald" },
  { id: "5", type: "image", height: "h-52", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg" },
  { id: "6", type: "card", height: "h-60", title: "Wilderness Flora", desc: "Natural biological biodiversity.", icon: <Sparkles className="w-5 h-5" />, theme: "rose" },
  { id: "7", type: "image", height: "h-[22rem]", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg" },
  { id: "8", type: "gradient", height: "h-48", title: "Cascading Waters", desc: "Glacial river flow dynamics.", icon: <Layers className="w-5 h-5" />, theme: "blue" },
];

export default function PhotoWall() {
  return (
    <MasonryGrid
      columnsClassName="columns-1 sm:columns-2 lg:columns-3"
      gapClassName="gap-6"
      items={items}
      renderItem={renderItem}
    />
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/masonry-grid.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/masonry-grid
```

Or the Motion build (same props, same file — install one):

```bash
npx shadcn@latest add https://avaraui.com/r/masonry-grid-motion.json
```

## Examples

### Column counts

- `columnsClassName` takes the raw Tailwind `columns-*` utilities, one per breakpoint — it is a class string, not a number.

```tsx
import { MasonryGrid } from "@/components/custom/blocks/MasonryGridBlock";

import { ArrowUpRight } from "lucide-react";

type GridItem = {
  id: string;
  type: "card" | "image" | "gradient";
  height: string;
  title?: string;
  desc?: string;
  image?: string;
  icon?: React.ReactNode;
  theme?: "blue" | "purple" | "emerald" | "rose";
};

// The grid handles the column flow; every tile is yours to render.
function renderItem(item: GridItem) {
  if (item.type === "image") {
    return (
      <div className={[item.height, "w-full rounded-2xl overflow-hidden relative group cursor-pointer border border-foreground/[0.08]"].join(" ")}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        <img src={item.image} alt="Gallery masonry" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute bottom-6 left-6 right-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 flex justify-between items-center text-white">
          <span className="font-medium text-sm tracking-wide">View Project</span>
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
    );
  }

  if (item.type === "gradient") {
    return (
      <div className={[item.height, "w-full p-5 sm:p-6 md:p-8 rounded-2xl relative group cursor-pointer overflow-hidden border border-border bg-card"].join(" ")}>
        <div className="relative z-10 flex flex-col items-start justify-between h-full w-full overflow-hidden">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shrink-0">
            {item.icon}
          </div>
          <div className="w-full">
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-card-foreground mb-1 leading-snug">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-normal">
              {item.desc}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={[item.height, "w-full p-5 sm:p-6 md:p-8 rounded-2xl bg-card border border-border transition-all duration-500 hover:border-foreground/20 hover:-translate-y-1 flex flex-col items-start justify-between cursor-pointer group relative overflow-hidden"].join(" ")}>
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 shrink-0 bg-primary/10 text-primary border border-primary/20">
        {item.icon}
      </div>
      <div className="w-full pr-6">
        <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-card-foreground mb-1.5 leading-snug">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {item.desc}
        </p>
      </div>
      <div className="absolute top-5 right-5 sm:top-8 sm:right-8 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
        <ArrowUpRight className="w-4 h-4" />
      </div>
    </div>
  );
}


const items: GridItem[] = [
  { id: "c1", type: "image", height: "h-[22rem]", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg" },
  { id: "c2", type: "card", height: "h-64", title: "Glacial Expedition", desc: "Tracking ice melt patterns across polar terrain.", icon: <Sparkles className="w-5 h-5" />, theme: "emerald" },
  { id: "c3", type: "image", height: "h-[30rem]", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg" },
  { id: "c4", type: "gradient", height: "h-52", title: "Sunset Horizon", desc: "Coastal light refraction studies.", icon: <Layers className="w-5 h-5" />, theme: "purple" },
  { id: "c5", type: "image", height: "h-[24rem]", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg" },
  { id: "c6", type: "card", height: "h-56", title: "Pine Forest Canopy", desc: "High resolution aerial drone mapping.", icon: <Cpu className="w-5 h-5" />, theme: "blue" },
  { id: "c7", type: "image", height: "h-[28rem]", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg" },
  { id: "c8", type: "gradient", height: "h-48", title: "Lush River Flow", desc: "Freshwater aquatic ecosystem analytics.", icon: <Wand2 className="w-5 h-5" />, theme: "rose" },
];

export default function FourColumnWall() {
  // One more column at the top breakpoint.
  return (
    <MasonryGrid
      columnsClassName="columns-1 sm:columns-2 md:columns-3 lg:columns-4"
      gapClassName="gap-6"
      items={items}
      renderItem={renderItem}
    />
  );
}
```

### Custom gap spacing

- `gapClassName="gap-6"` sets uniform spacing between tiles. The same value is converted to a matching `mb-*` for the vertical axis, so both directions stay in step.

```tsx
import { MasonryGrid } from "@/components/custom/blocks/MasonryGridBlock";

import { ArrowUpRight } from "lucide-react";

type GridItem = {
  id: string;
  type: "card" | "image" | "gradient";
  height: string;
  title?: string;
  desc?: string;
  image?: string;
  icon?: React.ReactNode;
  theme?: "blue" | "purple" | "emerald" | "rose";
};

// The grid handles the column flow; every tile is yours to render.
function renderItem(item: GridItem) {
  if (item.type === "image") {
    return (
      <div className={[item.height, "w-full rounded-2xl overflow-hidden relative group cursor-pointer border border-foreground/[0.08]"].join(" ")}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        <img src={item.image} alt="Gallery masonry" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute bottom-6 left-6 right-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 flex justify-between items-center text-white">
          <span className="font-medium text-sm tracking-wide">View Project</span>
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
    );
  }

  if (item.type === "gradient") {
    return (
      <div className={[item.height, "w-full p-5 sm:p-6 md:p-8 rounded-2xl relative group cursor-pointer overflow-hidden border border-border bg-card"].join(" ")}>
        <div className="relative z-10 flex flex-col items-start justify-between h-full w-full overflow-hidden">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shrink-0">
            {item.icon}
          </div>
          <div className="w-full">
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-card-foreground mb-1 leading-snug">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-normal">
              {item.desc}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={[item.height, "w-full p-5 sm:p-6 md:p-8 rounded-2xl bg-card border border-border transition-all duration-500 hover:border-foreground/20 hover:-translate-y-1 flex flex-col items-start justify-between cursor-pointer group relative overflow-hidden"].join(" ")}>
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 shrink-0 bg-primary/10 text-primary border border-primary/20">
        {item.icon}
      </div>
      <div className="w-full pr-6">
        <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-card-foreground mb-1.5 leading-snug">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {item.desc}
        </p>
      </div>
      <div className="absolute top-5 right-5 sm:top-8 sm:right-8 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
        <ArrowUpRight className="w-4 h-4" />
      </div>
    </div>
  );
}


const items: GridItem[] = [
  { id: "g1", type: "card", height: "h-60", title: "Highland Sanctuary", desc: "Protected mountain valley reserves.", icon: <Sparkles className="w-5 h-5" />, theme: "purple" },
  { id: "g2", type: "image", height: "h-[26rem]", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg" },
  { id: "g3", type: "gradient", height: "h-48", title: "Forest Mist Stream", desc: "Hydrological condensation research.", icon: <Layers className="w-5 h-5" />, theme: "emerald" },
  { id: "g4", type: "image", height: "h-[22rem]", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1507525428034-b723cf961d3e-1790146212208.jpg" },
  { id: "g5", type: "card", height: "h-52", title: "Volcanic Ridge", desc: "Thermal geological formations.", icon: <Cpu className="w-5 h-5" />, theme: "rose" },
  { id: "g6", type: "image", height: "h-[28rem]", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg" },
];

export default function TighterWall() {
  // gapClassName drives both the column gap and the row rhythm.
  return (
    <MasonryGrid
      columnsClassName="columns-1 sm:columns-2 lg:columns-3"
      gapClassName="gap-6"
      items={items}
      renderItem={renderItem}
    />
  );
}
```

### Slower stagger

- `staggerDelay={0.25}` is the delay in seconds between each tile's blur-fade. Defaults to `0.08`.

```tsx
import { MasonryGrid } from "@/components/custom/blocks/MasonryGridBlock";

import { ArrowUpRight } from "lucide-react";

type GridItem = {
  id: string;
  type: "card" | "image" | "gradient";
  height: string;
  title?: string;
  desc?: string;
  image?: string;
  icon?: React.ReactNode;
  theme?: "blue" | "purple" | "emerald" | "rose";
};

// The grid handles the column flow; every tile is yours to render.
function renderItem(item: GridItem) {
  if (item.type === "image") {
    return (
      <div className={[item.height, "w-full rounded-2xl overflow-hidden relative group cursor-pointer border border-foreground/[0.08]"].join(" ")}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        <img src={item.image} alt="Gallery masonry" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute bottom-6 left-6 right-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 flex justify-between items-center text-white">
          <span className="font-medium text-sm tracking-wide">View Project</span>
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
    );
  }

  if (item.type === "gradient") {
    return (
      <div className={[item.height, "w-full p-5 sm:p-6 md:p-8 rounded-2xl relative group cursor-pointer overflow-hidden border border-border bg-card"].join(" ")}>
        <div className="relative z-10 flex flex-col items-start justify-between h-full w-full overflow-hidden">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shrink-0">
            {item.icon}
          </div>
          <div className="w-full">
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-card-foreground mb-1 leading-snug">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-normal">
              {item.desc}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={[item.height, "w-full p-5 sm:p-6 md:p-8 rounded-2xl bg-card border border-border transition-all duration-500 hover:border-foreground/20 hover:-translate-y-1 flex flex-col items-start justify-between cursor-pointer group relative overflow-hidden"].join(" ")}>
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 shrink-0 bg-primary/10 text-primary border border-primary/20">
        {item.icon}
      </div>
      <div className="w-full pr-6">
        <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-card-foreground mb-1.5 leading-snug">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {item.desc}
        </p>
      </div>
      <div className="absolute top-5 right-5 sm:top-8 sm:right-8 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
        <ArrowUpRight className="w-4 h-4" />
      </div>
    </div>
  );
}


const items: GridItem[] = [
  { id: "s1", type: "image", height: "h-[28rem]", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg" },
  { id: "s2", type: "gradient", height: "h-52", title: "Aurora Skyward", desc: "Staggered particle illumination.", icon: <Wand2 className="w-5 h-5" />, theme: "blue" },
  { id: "s3", type: "card", height: "h-64", title: "Deep Woodland", desc: "Ancient oak and redwood groves.", icon: <Layers className="w-5 h-5" />, theme: "emerald" },
  { id: "s4", type: "image", height: "h-[24rem]", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg" },
  { id: "s5", type: "card", height: "h-56", title: "Coastal Breeze", desc: "Oceanic climate metrics.", icon: <Sparkles className="w-5 h-5" />, theme: "rose" },
  { id: "s6", type: "image", height: "h-[30rem]", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg" },
];

export default function SlowStaggerWall() {
  // Longer gap between each tile's entrance.
  return (
    <MasonryGrid
      columnsClassName="columns-1 sm:columns-2 lg:columns-3"
      gapClassName="gap-6"
      staggerDelay={0.25}
      items={items}
      renderItem={renderItem}
    />
  );
}
```

### Without the entrance

- Set `animateIn={false}` to render tiles in place with no motion — right for content already above the fold, or when you handle reduced-motion yourself.

```tsx
import { MasonryGrid } from "@/components/custom/blocks/MasonryGridBlock";

import { ArrowUpRight } from "lucide-react";

type GridItem = {
  id: string;
  type: "card" | "image" | "gradient";
  height: string;
  title?: string;
  desc?: string;
  image?: string;
  icon?: React.ReactNode;
  theme?: "blue" | "purple" | "emerald" | "rose";
};

// The grid handles the column flow; every tile is yours to render.
function renderItem(item: GridItem) {
  if (item.type === "image") {
    return (
      <div className={[item.height, "w-full rounded-2xl overflow-hidden relative group cursor-pointer border border-foreground/[0.08]"].join(" ")}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        <img src={item.image} alt="Gallery masonry" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute bottom-6 left-6 right-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 flex justify-between items-center text-white">
          <span className="font-medium text-sm tracking-wide">View Project</span>
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
    );
  }

  if (item.type === "gradient") {
    return (
      <div className={[item.height, "w-full p-5 sm:p-6 md:p-8 rounded-2xl relative group cursor-pointer overflow-hidden border border-border bg-card"].join(" ")}>
        <div className="relative z-10 flex flex-col items-start justify-between h-full w-full overflow-hidden">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shrink-0">
            {item.icon}
          </div>
          <div className="w-full">
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-card-foreground mb-1 leading-snug">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-normal">
              {item.desc}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={[item.height, "w-full p-5 sm:p-6 md:p-8 rounded-2xl bg-card border border-border transition-all duration-500 hover:border-foreground/20 hover:-translate-y-1 flex flex-col items-start justify-between cursor-pointer group relative overflow-hidden"].join(" ")}>
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 shrink-0 bg-primary/10 text-primary border border-primary/20">
        {item.icon}
      </div>
      <div className="w-full pr-6">
        <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-card-foreground mb-1.5 leading-snug">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {item.desc}
        </p>
      </div>
      <div className="absolute top-5 right-5 sm:top-8 sm:right-8 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
        <ArrowUpRight className="w-4 h-4" />
      </div>
    </div>
  );
}


const items: GridItem[] = [
  { id: "st1", type: "card", height: "h-52", title: "Static Meadow", desc: "Instant zero-motion render view.", icon: <Cpu className="w-5 h-5" />, theme: "emerald" },
  { id: "st2", type: "image", height: "h-[26rem]", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg" },
  { id: "st3", type: "gradient", height: "h-48", title: "Timberland Grove", desc: "Pure CSS column layout flow.", icon: <Layers className="w-5 h-5" />, theme: "purple" },
  { id: "st4", type: "image", height: "h-[24rem]", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg" },
  { id: "st5", type: "card", height: "h-60", title: "Glacial Basin", desc: "Sub-zero ice shelf monitoring.", icon: <Wand2 className="w-5 h-5" />, theme: "blue" },
  { id: "st6", type: "image", height: "h-[28rem]", image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg" },
];

export default function StaticWall() {
  // animateIn={false} renders in place — no entrance at all.
  return (
    <MasonryGrid
      columnsClassName="columns-1 sm:columns-2 lg:columns-3"
      gapClassName="gap-6"
      animateIn={false}
      items={items}
      renderItem={renderItem}
    />
  );
}
```

## Features

Discover the Masonry Grid's dynamic layout features, seamlessly arranging varying-height elements without large vertical gaps.

### Pure CSS Layout

Uses standard CSS multi-column layouts rather than heavy JavaScript absolute positioning to pack items perfectly.

### Headless Design

Total control over your UI. Just pass the raw data and a render function, and the grid handles the complex layout.

### Staggered Entrances

Apple-style staggered blur-fade entrances on scroll, in a GSAP build and a Motion build that move the same way.

### Fluid Resizing

Automatically reflows into the correct number of columns using Tailwind responsive utility classes.

## Best Practices & Guidelines

### Break-Inside-Avoid

Because CSS columns natively try to break content across columns, it is crucial that the wrapper `div` of your rendered item has `break-inside: avoid` (in Tailwind: `break-inside-avoid`). The headless component handles this on the outer container, but keep this in mind if you add complex nested layouts.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `T[]` | Required | An array of generic objects representing your data. Each item must contain a unique `id` for layout tracking. |
| `renderItem` | `(item: T, index: number) => ReactNode` | Required | A function that receives the data item and its index, returning the React element to display. |
| `columnsClassName` | `string` | `"columns-1 sm:columns-2 md:columns-3 lg:columns-4"` | The Tailwind `columns-*` utilities, one per breakpoint. It is a raw class string rather than a number, so every breakpoint is yours to set. |
| `gapClassName` | `string` | `"gap-6"` | Tailwind CSS gap utility. Applied horizontally to the flex container and vertically to the columns. |
| `animateIn` | `boolean` | `true` | Toggles the staggered, hardware-accelerated blur-fade entrance sequence. |
| `staggerDelay` | `number` | `0.08` | The time (in seconds) to delay the entrance animation of each sequential item. |
| `className` | `string` | `undefined` | Standard Tailwind classes applied to the outermost wrapper element. |
| `...props` | `HTMLAttributes` | `undefined` | Accepts all standard HTML `<div>` attributes, excluding `children`. The Motion build also takes Motion props (`HTMLMotionProps`). |

---

Live previews and every example: https://avaraui.com/docs/nextjs/masonry-grid
