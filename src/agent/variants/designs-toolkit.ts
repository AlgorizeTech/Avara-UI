import type { PageVariants } from "./types";

/**
 * Designs toolkit: 2 layouts of one registry item (`designs-toolkit`). The
 * "Clean Grid" example is the same grid with another preset and the dashed
 * lines turned off, so it is not listed. Claims come from
 * src/app/docs/[framework]/designs-toolkit/page.mdx.
 */
export const designsToolkit: PageVariants = {
  slug: "designs-toolkit",
  intro: "A pinned resource toolkit in the style of a studio moodboard: cards with glossy 3D pushpins, brand badges and bold numbering, in two layouts: a pinned corkboard grid or a winding roadmap.",
  gotchas: [
    "Both are looks of the one `designs-toolkit` item: install it once and set `variant` from the index.",
    "The grid look takes a `preset` (such as `creative` or `developer`) and `showDashedLine`; the dashed connecting lines can be turned off without choosing another design.",
  ],
  variants: [
    {
      id: "corkboard",
      label: "Pinned corkboard grid",
      summary: "A staggered grid of pinned cards, with dashed paths joining them and an optional ruled grid behind.",
      bestFor: ["a curated list of tools, resources or features presented like a moodboard"],
      avoidIf: ["the items form a sequence that should read as a journey"],
      traits: ["staggered columns", "3D pushpins", "optional dashed connecting lines", "default look"],
      item: "designs-toolkit",
      demo: "designs-toolkit",
      example: "Pinned toolkit corkboard",
      props: { preset: "creative", showDashedLine: true, showGrid: true, interactive: true },
    },
    {
      id: "roadmap",
      label: "Winding roadmap pathway",
      summary: "The cards follow an alternating winding S-curve path, with optional ruled lines across the board.",
      bestFor: ["steps, milestones or a process that should read as a path"],
      avoidIf: ["the items are an unordered collection"],
      traits: ["alternating S-curve path", "optional ruled lines"],
      item: "designs-toolkit",
      demo: "designs-toolkit",
      example: "Winding Roadmap Pathway",
      props: { variant: "roadmap", showDashedLine: true, showLines: true, interactive: true },
      setProps: { variant: "roadmap" },
    },
  ],
};
