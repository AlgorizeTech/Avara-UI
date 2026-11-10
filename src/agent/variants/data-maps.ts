import type { PageVariants } from "./types";

/**
 * Data maps: 2 looks of one registry item (`data-maps`), chosen with the
 * `variant` prop. Zoom and pan are the `zoomable` prop, so the zoomable
 * example is not listed. Claims come from
 * src/app/docs/[framework]/data-maps/page.mdx.
 */
export const dataMaps: PageVariants = {
  slug: "data-maps",
  intro: "A React-Leaflet world map for geographic data, with hover tooltips, flag badges and trend indicators, drawn without external map tiles and following your light or dark theme. Two looks: filled country regions or pulsing density dots.",
  gotchas: [
    "Both are looks of the one `data-maps` item: install it once and set `variant` from the index.",
    "Zoom controls and drag-to-pan are the `zoomable` prop (off by default); leave wheel zoom off inside a scrolling page so the map does not steal the scroll.",
    "Each data entry's `id` is the ISO-3 country code the map matches on.",
  ],
  variants: [
    {
      id: "fill",
      label: "Filled regions",
      summary: "Each matched country is filled in the accent colour and the rest is dimmed. The default.",
      bestFor: ["showing which countries have users, sales or coverage"],
      avoidIf: ["the regions of interest are small or crowded"],
      traits: ["country fills", "default look"],
      item: "data-maps",
      demo: "data-maps",
      example: "Filled regions",
      props: { variant: "fill", zoomable: false, mapId: "map-fill" },
      setProps: { variant: "fill" },
    },
    {
      id: "dots",
      label: "Density dots",
      summary: "Pulsing markers at each country's centre: the same data read as points rather than areas.",
      bestFor: ["small or crowded regions, where area fills would be hard to see"],
      avoidIf: ["you want whole countries highlighted"],
      traits: ["pulsing centroid markers"],
      item: "data-maps",
      demo: "data-maps",
      example: "Density dots",
      props: { variant: "dots", zoomable: false, mapId: "map-dots" },
      setProps: { variant: "dots" },
    },
  ],
};
