import type { PageVariants } from "./types";

/**
 * Image viewer: 4 product-image viewers of one registry item (`image-viewer`),
 * chosen with the `variant` prop. Claims come from
 * src/app/docs/[framework]/image-viewer/page.mdx.
 */
export const imageViewer: PageVariants = {
  slug: "image-viewer",
  intro: "A product image viewer for e-commerce pages with a fullscreen lightbox and colourway sync, in four styles: an inner magnifier, a floating zoom loupe, an arrow slider with dots and a thumbnail strip.",
  whenNot: [
    {
      use: "Gallery",
      slug: "gallery",
      reason: "for a decorative showcase of many images rather than one product's photos",
    },
  ],
  gotchas: [
    "All four are looks of the one `image-viewer` item: install it once and set `variant` from the index.",
  ],
  variants: [
    {
      id: "inner-zoom",
      label: "Inner lens zoom",
      group: "Zoom on hover",
      summary: "Magnifies the product image inside its own frame on cursor hover, at 260% optical scale.",
      bestFor: ["a product page where detail matters and one image is shown at a time"],
      avoidIf: ["most visitors are on touch screens, where hover zoom does not apply"],
      traits: ["in-frame magnifier", "260% scale on hover"],
      item: "image-viewer",
      demo: "image-viewer",
      example: "Inner Lens Magnifier Zoom Viewer",
      props: { variant: "inner-zoom" },
      setProps: { variant: "inner-zoom" },
    },
    {
      id: "side-zoom",
      label: "Floating zoom loupe",
      group: "Zoom on hover",
      summary: "A 3x loupe floats above the hovered or touched point, with a reticle marking the area it shows; it stays on screen.",
      bestFor: ["product photos where seeing the exact spot being magnified helps, including on touch"],
      avoidIf: ["you want the zoom to happen inside the image frame itself"],
      traits: ["3x floating loupe", "reticle", "works on touch"],
      item: "image-viewer",
      demo: "image-viewer",
      example: "HD Side Portal Lens Zoom Viewer",
      props: { variant: "side-zoom", defaultImage: 3 },
      setProps: { variant: "side-zoom" },
    },
    {
      id: "slider",
      label: "Arrow slider with dots",
      group: "Browse the photos",
      summary: "Floating left and right chevrons with backdrop blur, bottom dot indicators and an expandable lightbox.",
      bestFor: ["a mobile-friendly product gallery with a few photos"],
      avoidIf: ["you want thumbnails visible so people can jump to a photo"],
      traits: ["chevron buttons", "dot indicators", "lightbox"],
      item: "image-viewer",
      demo: "image-viewer",
      example: "Floating Arrow Slider & Dots Viewer",
      props: { variant: "slider", defaultImage: 1 },
      setProps: { variant: "slider" },
    },
    {
      id: "thumbnails",
      label: "Thumbnail strip",
      group: "Browse the photos",
      summary: "A thumbnail preview strip beside the main image, with the active one marked, and an expandable lightbox.",
      bestFor: ["a product with several photos that shoppers should be able to jump between"],
      avoidIf: ["horizontal space is tight"],
      traits: ["thumbnail strip", "`thumbnailPosition` option", "lightbox"],
      item: "image-viewer",
      demo: "image-viewer",
      example: "Interactive Thumbnail Strip Gallery Viewer",
      props: { variant: "thumbnails", thumbnailPosition: "left", defaultImage: 2 },
      setProps: { variant: "thumbnails" },
    },
  ],
};
