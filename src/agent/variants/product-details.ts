import type { PageVariants } from "./types";

/**
 * Product details: 4 layouts of one registry item (`product-details`), chosen
 * with the `variant` prop. Claims come from
 * src/app/docs/[framework]/product-details/page.mdx.
 */
export const productDetails: PageVariants = {
  slug: "product-details",
  intro:
    "An e-commerce product page section. Four layouts, each with its own structure: two gallery-led layouts, a floating glass card and a full-bleed editorial showcase.",
  gotchas: [
    "All four are layouts of the one `product-details` item: install it once and set `variant` from the index.",
  ],
  variants: [
    {
      id: "color-sync-gallery",
      group: "Gallery layouts",
      label: "Colour swatch synced gallery",
      summary: "Choosing a colour swatch updates the main product image, with no sliders or thumbnails; inner or side HD zoom.",
      bestFor: ["products sold in several colourways, where each colour has its own photo"],
      avoidIf: ["your product comes in one colour"],
      traits: ["colour swatches", "image follows the swatch", "inner or side-portal zoom"],
      item: "product-details",
      demo: "product-details",
      example: "Color Swatch Synced Image Gallery Details",
      props: { variant: "color-sync-gallery", zoomMode: "inner" },
      setProps: { variant: "color-sync-gallery" },
    },
    {
      id: "modern-split-gallery",
      group: "Gallery layouts",
      label: "Modern split gallery slider",
      summary: "A split layout with arrows floating over the main image, colourways, a stock-urgency bar and spec tabs.",
      bestFor: ["a conventional product page with several photos, stock urgency and a specs section"],
      avoidIf: ["you have a single product photo"],
      traits: ["floating slider arrows", "colourways", "stock urgency bar", "spec tabs"],
      item: "product-details",
      demo: "product-details",
      example: "Modern Split Gallery Slider Details",
      props: { variant: "modern-split-gallery" },
      setProps: { variant: "modern-split-gallery" },
    },
    {
      id: "floating-card-glass",
      group: "Cards and showcases",
      label: "Floating glassmorphism card",
      summary: "A clean floating glass card with shoe-size pills and express shipping.",
      bestFor: ["footwear and apparel, where picking a size is the main action"],
      avoidIf: ["your product has no sizes", "you need a gallery of many photos"],
      traits: ["floating glass card", "US shoe-size pills", "express shipping"],
      item: "product-details",
      demo: "product-details",
      example: "Floating Glassmorphism Card Details",
      props: { variant: "floating-card-glass" },
      setProps: { variant: "floating-card-glass" },
    },
    {
      id: "bento-editorial-showcase",
      group: "Cards and showcases",
      label: "Bento editorial showcase",
      summary: "A full-bleed dark hero image behind a compact buy panel, laid out as an editorial bento.",
      bestFor: ["a hero product with one standout photograph"],
      avoidIf: ["you only have small or low-resolution product images"],
      traits: ["full-bleed dark hero image", "compact buy panel", "editorial bento"],
      item: "product-details",
      demo: "product-details",
      example: "Bento Editorial Showcase Details",
      props: { variant: "bento-editorial-showcase" },
      setProps: { variant: "bento-editorial-showcase" },
    },
  ],
};
