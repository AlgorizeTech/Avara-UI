export const metadata = docsPageMetadata("image-viewer");

# Image Viewer

A collection of 4 production-ready, interactive, fully responsive E-commerce Product Image Viewer components featuring inner lens magnifying zoom, 3–10x floating zoom loupe, floating arrow carousel sliders, and active thumbnail strips.

`ImageViewer` isolates the image presentation layer for product showcases, galleries, and e-commerce catalogs with built-in fullscreen lightbox expansion and colorway synchronization.

export const viewerData = `const images = [
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516400/red-shows-1790516403807.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516403/purple-shows-1790516403806.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516399/blue-shows-1790516403806.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516397/baby-pink-shows-1790516403806.jpg",
];`;

export const usageInnerZoom = `import { ImageViewer } from "@/components/custom/blocks/ImageViewerBlock";

${viewerData}

export default function InnerZoomViewerDemo() {
  return (
    
  );
}`;

export const usageSideZoom = `import { ImageViewer } from "@/components/custom/blocks/ImageViewerBlock";

${viewerData}

export default function SideZoomViewerDemo() {
  return (
    
  );
}`;

export const usageSlider = `import { ImageViewer } from "@/components/custom/blocks/ImageViewerBlock";

${viewerData}

export default function SliderViewerDemo() {
  return (
    
  );
}`;

export const usageThumbnails = `import { ImageViewer } from "@/components/custom/blocks/ImageViewerBlock";

${viewerData}

export default function ThumbnailViewerDemo() {
  return (
    
  );
}`;

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/image-viewer.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/image-viewer
```

## Features

Discover the key capabilities of the `ImageViewer` component:

    4 Dedicated Viewer Architectures
    Includes Inner Lens Zoom, Side Portal Zoom Projection, Floating Arrow Slider, and Active Thumbnail Strip Gallery.

    Integrated Lightbox Modal
    Theme-adaptive frosted glass overlay matching Light and Dark mode with keyboard controls, chevron navigation, and thumbnail strip.

    High-Definition Optical Zoom
    Experience smooth 2.6x inner frame magnification or a 3–10x floating zoom loupe on cursor hover and touch drag.

    100% Mobile Responsive
    Fluid aspect ratio framing and touch-friendly controls tested across mobile phones, tablets, and desktop displays.

## Props Reference

        Prop
        Type
        Default
        Description

        variant
        "inner-zoom" | "side-zoom" | "slider" | "thumbnails"
        "inner-zoom"
        Selects the image viewing architecture.

        thumbnailPosition
        "left" | "right" | "bottom"
        "left"
        Position of the thumbnail preview strip when using variant="thumbnails". Supports vertical "left", vertical "right", and horizontal "bottom".

        defaultImage
        number
        3 (side-zoom) / 1 (slider) / 2 (thumbnails) / 0 (others)
        Initial active image index (0-indexed). Defaults to index 3 (4th image) for side-zoom, index 1 (2nd image) for slider, and index 2 (3rd image) for thumbnails.

        images
        string[]
        DEFAULT_IMAGES
        Array of product or gallery image URLs to display.

        colors
        ImageViewerColor[]
        DEFAULT_COLORS
        Optional colorways, one per image. Colorway i's bgClass tints the frame and thumbnail behind image i.

        badge
        string
        "20% OFF"
        Text displayed inside the top-left floating promo chip badge.

        showWishlist
        boolean
        true
        Toggles the floating top-right heart wishlist button.

        enableLightbox
        boolean
        true
        Whether clicking the hero image triggers the fullscreen modal lightbox (active in slider and thumbnails).

        zoomLevel
        number
        3
        Magnification of the side-zoom loupe over the image as it appears in the frame; 3–10 is the usual e-commerce range. The reticle shrinks to match. Serve images large enough to stay sharp at it — roughly the frame width × 1.4 × zoomLevel.

        onImageChange
        (index: number) =&gt; void
        undefined
        Callback triggered whenever the user switches the active image.

        className
        string
        undefined
        Additional Tailwind CSS classes applied to the root container.

---

**Component Path:** `[framework]\image-viewer\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
