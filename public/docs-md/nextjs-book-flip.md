# Book Flip

An interactive 3D **Book Flip** component simulating realistic book page turns, dynamic spine shifts, center fold shadows, leaf peeking, and bottom icon toolbar controls.

## Variations

export const usageDefault = `import BookFlip, { type PageFlipLeaf } from "@/components/custom/book-flip";

const samplePages: PageFlipLeaf[] = [
  // 1. FRONT COVER (First leaf in array = Front Cover Photo & Metadata)
  {
    id: 1,
    frontImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80", //  {
        console.log(\`Page flipped: \${turnedCount} / \${totalLeaves}\`);
      }}
    />
  );
}`;

## Installation

## Features

- **3D Book Cover & Spread Transition**: Starts in single-cover mode and dynamically centers into a 2-page spread upon flipping leaves.
- **Center Spine Crease Shadow**: Realistic crease fold shadow integrated on page surfaces.
- **Keyboard Navigation**: Press Left Arrow (`←`) and Right Arrow (`→`) keys to flip through pages.
- **Minimal Icon Toolbar**: Features `` icon-only controls.

## Props Reference: BookFlip

        Prop
        Type
        Default
        Description

        pages
        PageFlipLeaf[]
        DEFAULT_PAGES
        Array of page leaves, each containing front and back images & metadata.

        turnedIndex
        number
        undefined
        Controlled turned page count.

        defaultTurnedIndex
        number
        0
        Default turned page count (0 = closed cover).

        onPageChange
        {`(turnedCount: number, totalLeaves: number) => void`}
        undefined
        Callback fired when page count changes.

        pageWidth
        number
        260
        Width of a single page leaf in pixels.

        pageHeight
        number
        380
        Height of a single page leaf in pixels.

        showControls
        boolean
        true
        Toggles visibility of the bottom navigation controls toolbar.

        showSpineBinding
        boolean
        true
        Toggles outer book spine crease line overlay.

        showPageNumbers
        boolean
        true
        Toggles page numbering badges on leaves.

        autoplay
        boolean
        false
        Enables automatic page flipping timer.

        autoplayInterval
        number
        3500
        Interval in milliseconds between automatic page flips.

---

**Component Path:** `[framework]\book-flip\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
