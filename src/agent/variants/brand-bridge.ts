import type { PageVariants } from "./types";

/**
 * Brand Bridge: interactive integration hub card with magnetic gradient wires,
 * glowing comets, rotating conic-gradient hub ring, and a 2D particle field.
 */
export const brandBridge: PageVariants = {
  slug: "brand-bridge",
  intro:
    "An interactive integrations card where brand tiles flank a central hub with a rotating colour ring, magnetic gradient wires, glowing comets, and a reactive 2D particle field.",
  gotchas: [
    "Autoplay connects each brand one by one in random order, pauses on hover, and hands control to the user on click.",
    "Supports up to 8 brands (`BRANDS` exports 8 built-in marks; `DEFAULT_BRANDS` uses 6).",
  ],
  variants: [
    {
      id: "default",
      label: "Core Stack Hub",
      summary:
        "Six-integration card with autoplay wiring, magnetic gradient curves, glowing comets, and a reactive particle field.",
      bestFor: [
        "integration showcases and feature cards",
        "tool-ecosystem hero sections",
      ],
      avoidIf: ["you only need a static logo strip"],
      traits: [
        "magnetic wires",
        "glowing comets",
        "rotating hub ring",
        "2D particle field",
      ],
      item: "brand-bridge",
      demo: "brand-bridge",
      example: "Core Stack Hub",
      props: { variant: "default" },
      setProps: { variant: "default" },
    },
    {
      id: "eight-brands",
      label: "Full Ecosystem Bridge",
      summary:
        "Eight-integration layout with four brand tiles per column, simultaneous comet pulses, and interactive toggle state.",
      bestFor: ["dense integration directories"],
      avoidIf: ["you have fewer than 7 integrations to highlight"],
      traits: [
        "8 brand tiles",
        "magnetic wires",
        "glowing comets",
        "2D particle field",
      ],
      item: "brand-bridge",
      demo: "brand-bridge",
      example: "Full Ecosystem Bridge",
      props: { variant: "eight-brands" },
      setProps: { variant: "eight-brands" },
    },
  ],
};
