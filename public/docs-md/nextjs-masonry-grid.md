# Masonry Grid

A high-performance masonry layout that tightly packs items of varying heights. Rather than relying on heavy JavaScript calculations or absolute positioning frameworks, this component utilizes standard CSS multi-column layout (`columns-N`) to flow items naturally.

This premium iteration includes hardware-accelerated blur-fade entrances, `layout` animations for dynamic content reflows, and a scroll-triggered `whileInView` sequence for high-end aesthetic presentation.

---

## Interactive Showcase
Resize your browser window to see how the Masonry Grid intelligently recalculates its columns.

## Installation

### Dependencies

This component uses **Framer Motion** for the staggered spring animations.

```bash
npm install framer-motion
```

### Copy the Component

Copy the full engine code directly from the Component tab in the Interactive Showcase above and place it in components/custom/blocks/MasonryGridBlock.tsx.

## Implementation

```tsx

const posts = [
  { id: 1, title: "Feature One", text: "A short status update." },
  { id: 2, title: "Deep Dive", text: "A much longer piece of text that will require more vertical space in the masonry layout to demonstrate the fluid packing behavior." },
];

export default function BentoFeatures() {
  return (
     (
        
          {post.title}
          {post.text}
        
      )}
    />
  );
}
```

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

          columns

          number | object

          {`{ default: 1, sm: 2, lg: 3 }`}

          Determines the number of Flexbox columns. Pass a static number or a
          breakpoint object mapping to Tailwind screens.

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

**Component Path:** `nextjs\masonry-grid\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
