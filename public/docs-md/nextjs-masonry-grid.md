# Masonry Grid

A high-performance masonry layout that tightly packs items of varying heights. Rather than relying on heavy JavaScript calculations or absolute positioning frameworks, this component utilizes standard CSS multi-column layout (`columns-N`) to flow items naturally.

This premium iteration includes hardware-accelerated blur-fade entrances, `layout` animations for dynamic content reflows, and a scroll-triggered `whileInView` sequence for high-end aesthetic presentation.

---

## Examples

The layout is plain CSS multi-column, so reflow is the browser's job and resizing is free — drag a preview's width handle to watch the columns recalculate.

export const masonryData = `const items = [
  { id: "1", height: "h-56", title: "Design Engineering" },
  {
    id: "2",
    height: "h-[28rem]",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop",
  },
  { id: "3", height: "h-40", title: "Fluid Animations" },
  {
    id: "4",
    height: "h-[22rem]",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
  },
  { id: "5", height: "h-60", title: "Systems Design" },
  {
    id: "6",
    height: "h-52",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
  },
];

// The grid only handles the column flow — every tile is yours to render.
function Tile({ height, title, image }) {
  return (
    
      {title && (
        
          {title}
        
      )}
    
  );
}`;

export const usageDefault = `import { MasonryGrid } from "@/components/custom/blocks/MasonryGridBlock";

${masonryData}

export default function Gallery() {
  return (
     }
    />
  );
}`;

export const usageColumns = `import { MasonryGrid } from "@/components/custom/blocks/MasonryGridBlock";

${masonryData}

export default function ColumnCounts() {
  // Column counts are Tailwind classes, so every breakpoint is yours to set.
  return (
     }
    />
  );
}`;

export const usageGap = `import { MasonryGrid } from "@/components/custom/blocks/MasonryGridBlock";

${masonryData}

export default function CustomGap() {
  return (
     }
    />
  );
}`;

export const usageStagger = `import { MasonryGrid } from "@/components/custom/blocks/MasonryGridBlock";

${masonryData}

export default function SlowerStagger() {
  // \`staggerDelay\` is the gap in seconds between each tile's blur-fade.
  return (
     }
    />
  );
}`;

export const usageNoAnimation = `import { MasonryGrid } from "@/components/custom/blocks/MasonryGridBlock";

${masonryData}

export default function StaticGrid() {
  // Renders immediately — right for content that is already above the fold,
  // or when you want to respect reduced-motion yourself.
  return (
     }
    />
  );
}`;

## Installation

## Features

Discover the Masonry Grid's dynamic layout features, seamlessly arranging varying-height elements without large vertical gaps.

    Pure CSS Layout
    Uses standard CSS multi-column layouts rather than heavy JavaScript absolute positioning to pack items perfectly.

    Headless Design
    Total control over your UI. Just pass the raw data and a render function, and the grid handles the complex layout.

    Staggered Entrances
    Powered by Framer Motion to deliver beautiful, Apple-style staggered blur-fade entrances on scroll.

    Fluid Resizing
    Automatically reflows into the correct number of columns using Tailwind responsive utility classes.

## Best Practices & Guidelines

    Break-Inside-Avoid
    Because CSS columns natively try to break content across columns, it is crucial that the wrapper `div` of your rendered item has `break-inside: avoid` (in Tailwind: `break-inside-avoid`). The headless component handles this on the outer container, but keep this in mind if you add complex nested layouts.

## Props Reference

        Prop
        Type
        Default
        Description

          items

          T[]

          Required

          An array of generic objects representing your data. Each item must
          contain a unique id for layout tracking.

          renderItem

          (item: T, index: number) =&gt; ReactNode

          Required

          A function that receives the data item and its index, returning the
          React element to display.

          columnsClassName

          string

          "columns-1 sm:columns-2 md:columns-3 lg:columns-4"

          The Tailwind columns-* utilities, one per breakpoint.
          It is a raw class string rather than a number, so every breakpoint is
          yours to set.

          gapClassName

          string

          "gap-6"

          Tailwind CSS gap utility. Applied horizontally to the flex container
          and vertically to the columns.

          animateIn

          boolean

          true

          Toggles the staggered, hardware-accelerated blur-fade entrance
          sequence via Framer Motion.

          staggerDelay

          number

          0.08

          The time (in seconds) to delay the entrance animation of each
          sequential item.

          className

          string

          undefined

          Standard Tailwind classes applied to the outermost wrapper element.

          ...props

          HTMLMotionProps

          undefined

          Accepts all standard HTML &lt;div&gt; attributes and
          Framer Motion props, excluding children.

---

**Component Path:** `[framework]\masonry-grid\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
