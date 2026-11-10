import type { PageVariants } from "./types";

/**
 * Particle canvas: 2 looks of one registry item (`particle-canvas`), chosen
 * with the `variant` prop. Claims come from
 * src/app/docs/[framework]/particle-canvas/page.mdx.
 */
export const particleCanvas: PageVariants = {
  slug: "particle-canvas",
  intro: "A 2D canvas that turns text into thousands of interactive particles in your theme colour, in two looks: particles that scatter from the pointer, or a bottom-aligned wordmark banner with a glow.",
  gotchas: [
    "Both are looks of the one `particle-canvas` item: install it once and set `variant` from the index.",
    "The text comes from the `content` prop in both looks.",
  ],
  variants: [
    {
      id: "repel",
      label: "Text particle repel",
      summary: "The text is made of dots that scatter away from the pointer and spring back to their positions.",
      bestFor: ["a hero or showcase where a headline word should react to the cursor or touch"],
      avoidIf: ["you want a quiet, static wordmark"],
      traits: ["thousands of particles", "pointer repulsion", "touch support"],
      item: "particle-canvas",
      demo: "particle-canvas",
      example: "Text Particle Repel",
      props: { variant: "repel", content: "AlgorizeTech" },
      setProps: { variant: "repel" },
    },
    {
      id: "wordmark-glow",
      label: "Wordmark glow",
      summary: "A compact bottom-aligned wordmark banner whose letters spring in on scroll, with a radial glow that follows the cursor.",
      bestFor: ["a large wordmark along the bottom of a page or footer area"],
      avoidIf: ["you want the text itself to break apart under the pointer"],
      traits: ["bottom-aligned banner", "scroll-triggered spring letters", "cursor-following glow"],
      item: "particle-canvas",
      demo: "particle-canvas",
      example: "Wordmark Glow Canvas",
      props: { variant: "wordmark-glow", content: "AlgorizeTech" },
      setProps: { variant: "wordmark-glow" },
    },
  ],
};
