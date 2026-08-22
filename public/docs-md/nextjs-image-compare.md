# Image Compare

An interactive, responsive image comparison slider component featuring 10 distinct visual comparison modes, fluid touch/mouse drag physics, custom label badges, and dynamic site theme color binding.

`ImageCompare` allows users to seamlessly compare before-and-after visual states for photo editing, design variations, AI enhancements, or product upgrades.

export const usageClassic = `import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function ClassicImageCompareDemo() {
  return ;
}`;

export const usageSplitHandle = `import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function SplitHandleDemo() {
  return ;
}`;

export const usageGlowingDivider = `import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function GlowingDividerDemo() {
  return ;
}`;

export const usageBadgeOverlay = `import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function BadgeOverlayDemo() {
  return ;
}`;

export const usageMinimalLine = `import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function MinimalLineDemo() {
  return ;
}`;

export const usageHoverReveal = `import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function HoverRevealDemo() {
  return ;
}`;

export const usageVerticalSlide = `import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function VerticalSlideDemo() {
  return ;
}`;

export const usageCircleMagnifier = `import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function CircleMagnifierDemo() {
  return ;
}`;

export const usageGlassHandle = `import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function GlassHandleDemo() {
  return ;
}`;

export const usageDiagonalSplit = `import { ImageCompare } from "@/components/custom/blocks/ImageCompareBlock";

export default function DiagonalSplitDemo() {
  return ;
}`;

## Installation

## Examples

## Features

    10 Unique Interaction Variants
    Includes classic sliders, split badges, glowing lines, hover reveals, vertical slides, and circular lens scopes.

    100% Theme Color Engine
    Integrates with site primary CSS variable var(--primary) or explicit color swatches.

    Touch & Gesture Responsive
    Smooth dragging for mobile touch screens, trackpads, and mouse pointers.

    Custom Labels & Images
    Pass custom Before/After labels and image URLs through flexible props.

## Best Practices & Guidelines

    When to Use
    Use ImageCompare to showcase photo retouching, AI enhancement models, design redrafts, dark mode vs light mode UI previews, or product quality upgrades.

## Props Reference

        Prop
        Type
        Default
        Description

          variant

          "classic-slider" | "split-handle" | "glowing-divider" | "badge-overlay" | "minimal-line" | "hover-reveal" | "vertical-slide" | "circle-magnifier" | "glass-handle" | "diagonal-split"

          "classic-slider"
        
        Selects the image comparison interaction mode and handle style.

          beforeImage

          string

          Unsplash Preset
        
        URL of the base before image displayed on the left/top.

          afterImage

          string

          Unsplash Preset
        
        URL of the enhanced after image revealed by dragging.

          beforeLabel

          string

          "Original"
        
        Label badge text for the before state image.

          afterLabel

          string

          "Enhanced"
        
        Label badge text for the after state image.

          initialPosition

          number

          50
        
        Starting percentage position of the slider handle (0 - 100).

          color

          ImageCompareColor | string

          "primary"
        
        Applies dynamic theme color palettes ("primary" | "indigo" | "rose" | "emerald" | "zinc" or custom hex).

          className

          string

          ""
        
        Custom Tailwind CSS classes applied to the root container.

---

**Component Path:** `[framework]\image-compare\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
