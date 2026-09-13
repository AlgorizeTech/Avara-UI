# Selection Frame

That box Figma draws around a selected layer — four corner handles and a crisp accent stroke — wrapped around any text span or block.

The frame measures its child live with a `ResizeObserver`, so it always fits whatever it wraps, even when the content changes size. Choose square or circle handles, a solid, dashed or long-dash stroke, override the dash pattern directly, and turn on `animated` for marching ants with handles that pop in. Everything respects `prefers-reduced-motion`.

Explore the different variations of the Selection Frame — each example shows a live preview with the exact code to copy.

export const usageDefault = `import { SelectionFrame } from "@/components/custom/blocks/SelectionFrameBlock";

export default function Headline() {
  return (
    
      Consistent by Default
    
  );
}`;

export const usageHandles = `import { SelectionFrame } from "@/components/custom/blocks/SelectionFrameBlock";

export default function HandleShapes() {
  return (
    
      {/* square is the default */}
      
        Handles

        Handles

  );
}`;

export const usageLines = `import { SelectionFrame } from "@/components/custom/blocks/SelectionFrameBlock";

export default function LineStyles() {
  return (
    
      {/* solid is the default */}
      
        Lines

      {/* dash [4, 4] */}
      
        Lines

      {/* dash [10, 6] */}
      
        Lines

      {/* override either preset's dash pattern directly */}
      
        Lines

  );
}`;

export const usageAnimated = `import { SelectionFrame } from "@/components/custom/blocks/SelectionFrameBlock";

// dashed / long → marching ants. Corner handles always pop in on mount.
export default function MarchingAnts() {
  return (

        Marching

        Ants

  );
}`;

export const usageInline = `import { SelectionFrame } from "@/components/custom/blocks/SelectionFrameBlock";

// inline is the default, so the frame sits in the text flow like any span.
export default function EmphasisInProse() {
  return (
    
      Draw attention to what{" "}
      
        matters

  );
}`;

export const usageBlock = `import { SelectionFrame } from "@/components/custom/blocks/SelectionFrameBlock";

// inline={false} makes the frame block-level so it can wrap a card, image or
// any other layout element and take its full width.
export default function FramedCard() {
  return (

          Hero / Cover
          1440 × 720 · Auto layout

  );
}`;

## Installation

## Examples

## Features
Discover the Selection Frame's capabilities for putting a design-tool spotlight on any element.

    Measures live
    A ResizeObserver tracks the child, so the frame re-fits when text reflows, fonts load or the content changes.

    Pixel-accurate
    The stroke is centred on the frame edge and each handle is centred on the true corner point, so nothing sits a fraction of a pixel off.

    Respects reduced motion
    Marching ants are an indefinite loop, so both the march and the handle spring are disabled when the visitor prefers reduced motion.

    Decorative only
    The SVG and handles are aria-hidden and ignore pointer events — your content stays exactly as readable and clickable as before.

## Best Practices & Guidelines

    Give the frame room
    The stroke and handles are drawn outside the child by padding pixels (plus half a handle). Leave that much space around the wrapper — an overflow-hidden parent will clip the corners.

    Use marching ants sparingly
    An endless animation pulls the eye. Reserve animated for the one element on screen you actually want people to look at.

## Props Reference

### `` Props

        Prop
        Type
        Default
        Description

        children
        React.ReactNode
        Required
        The content to frame; measured live.

        handles
        "square" | "circle"
        "square"
        Corner handle shape.

        line
        "solid" | "dashed" | "long"
        "solid"
        Stroke style. dashed resolves to dash [4, 4], long to [10, 6].

        dash
        [number, number]
        —
        Overrides the [dash, gap] px pair for "dashed" / "long".

        animated
        boolean
        false
        Marching ants for "dashed" / "long"; handles always animate in. Disabled under prefers-reduced-motion.

        color
        string
        "#0d99ff"
        Accent colour (Figma blue by default). Any CSS colour.

        radius
        number
        0
        Frame corner radius in pixels.

        padding
        number
        4
        Gap in pixels between the content and the frame.

        inline
        boolean
        true
        Inline (for text spans) vs block-level.

        className
        string
        —
        Extra classes for the outer wrapper — e.g. a width when inline is false.

---

**Component Path:** `[framework]\selection-frame\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
