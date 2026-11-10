import type { PageVariants } from "./types";

/**
 * Split flap: 2 casings of one registry item (`split-flap`), chosen with the
 * `variant` prop. Claims come from
 * src/app/docs/[framework]/split-flap/page.mdx.
 */
export const splitFlap: PageVariants = {
  slug: "split-flap",
  intro: "A split-flap (Solari board) display with 3D flipping cards, a horizontal crease, hinge notches and synthesised click sounds, in two handcrafted casings: vintage ivory and minimalist architectural glass.",
  gotchas: [
    "Both are looks of the one `split-flap` item: install it once and set `variant` from the index.",
    "The click sounds are synthesised with the Web Audio API, so no audio files are needed.",
  ],
  variants: [
    {
      id: "ivory",
      label: "Ivory, classic mechanical",
      summary: "An embossed molded bezel with warm off-white flap cards and rust-orange type, like a retro Solari board.",
      bestFor: ["a retro, mechanical, travel or departures-board feel"],
      avoidIf: ["your brand is clean and modern"],
      traits: ["molded bezel", "warm off-white flaps", "rust-orange type", "click sounds"],
      item: "split-flap",
      demo: "split-flap",
      example: "Split-Flap — Ivory (Classic Mechanical)",
      props: { variant: "ivory", text: "SPLIT-FLAP" },
      setProps: { variant: "ivory" },
    },
    {
      id: "minimalist",
      label: "Minimalist architectural",
      summary: "A frosted-glass architectural frame with clean backdrop blur.",
      bestFor: ["a modern, design-led brand that wants the flip effect without the vintage styling"],
      avoidIf: ["you want the nostalgic retro-mechanical look"],
      traits: ["frosted glass frame", "backdrop blur"],
      item: "split-flap",
      demo: "split-flap",
      example: "Split-Flap — Minimalist Architectural",
      props: { variant: "minimalist" },
      setProps: { variant: "minimalist" },
    },
  ],
};
