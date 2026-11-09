import type { PageVariants } from "./types";

/**
 * Scroll stack: 6 layouts, each its own registry item. Claims come from
 * src/app/docs/[framework]/scroll-stack/page.mdx and the registry
 * descriptions. The two "Pinned left / right" examples are one design (a
 * `stickySide` prop), so only one is listed.
 */
export const scrollStack: PageVariants = {
  slug: "scroll-stack",
  intro:
    "Scroll-driven card layouts built on GSAP ScrollTrigger: cards that stack, fan out, pin beside a column or travel sideways as the visitor scrolls. Six layouts, each a different structure.",
  whenNot: [
    {
      use: "Modern Scroll Stack",
      slug: "modern-scroll-stack",
      reason: "for a service-card stack with a different look",
    },
  ],
  gotchas: [
    "Each layout is its own registry item: install only the chosen one, not the whole page.",
    "Install the GSAP build. A Motion build exists for some layouts; never install both builds of one layout.",
  ],
  variants: [
    {
      id: "fan-stack",
      group: "Cards that stack",
      label: "Fan stack",
      summary: "Three numbered steps dealt from one pile into a tilted cascade as the stack scrolls into view.",
      bestFor: ["a short numbered sequence: steps, phases, a three-part system"],
      avoidIf: ["you have many steps or long copy per step (it suits a short sequence)"],
      traits: ["GSAP", "numbered cards", "tilted cascade", "photo can hang off a card edge"],
      item: "fan-stack",
      demo: "fan-stack",
      example: "Fan stack",
    },
    {
      id: "scroll-stack",
      group: "Cards that stack",
      label: "Scroll stack",
      summary: "Cards stick to the viewport and the next slides up over them, offset by a pixel gap so titles stay readable.",
      bestFor: ["step-by-step feature walkthroughs"],
      avoidIf: ["each step needs a different kind of content (the sticky stack takes lists, images and splits)"],
      traits: ["GSAP ScrollTrigger", "3D deck", "adjustable card gap", "per-card background colour"],
      item: "scroll-stack",
      demo: "scroll-stack",
      example: "Card gap",
      props: { cardGap: 64 },
    },
    {
      id: "sticky-stack",
      group: "Cards that stack",
      label: "Sticky scroll stack",
      summary: "A headed section where each card sticks and the next overlaps it; a card body can be a list, image, split or custom.",
      bestFor: ["feature sections with varied content per step"],
      avoidIf: ["every step looks the same (the plain scroll stack is simpler)"],
      traits: ["GSAP", "headed section", "list, image, split or custom bodies", "tunable scale and offset"],
      item: "sticky-scroll-stack",
      demo: "sticky-scroll-stack",
      example: "Sticky stack",
      props: { headerMode: "text-button" },
    },
    {
      id: "split-stack",
      group: "Pinned and sliding",
      label: "Split scroll stack",
      summary: "Two columns: one column pins while the cards stack and advance in the other; it pins left or right.",
      bestFor: ["feature tours that pair narrative with visuals"],
      avoidIf: ["you want a single full-width column"],
      traits: ["GSAP", "two columns", "pinned side (left or right)"],
      item: "split-scroll-stack",
      demo: "split-scroll-stack",
      example: "Pinned right",
      props: { stickySide: "right" },
    },
    {
      id: "horizontal-stack",
      group: "Pinned and sliding",
      label: "Horizontal scroll stack",
      summary: "The section pins and vertical scrolling turns into horizontal travel across the cards, with a progress indicator.",
      bestFor: ["process timelines and step sequences"],
      avoidIf: ["you do not want the page held in place while the cards move"],
      traits: ["GSAP", "pinned section", "vertical-to-horizontal scroll", "progress indicator"],
      item: "horizontal-scroll-stack",
      demo: "horizontal-scroll-stack",
      example: "Horizontal Scroll Stack",
    },
    {
      id: "horizontal-rail",
      group: "Pinned and sliding",
      label: "Horizontal rail",
      summary: "A horizontal rail of cards that slide across the viewport without stacking.",
      bestFor: ["showcasing products, media cards or other horizontal content"],
      avoidIf: ["you want cards that pile on top of each other"],
      traits: ["horizontal", "no stacking", "navigation controls"],
      item: "horizontal-rail",
      demo: "horizontal-scroll-stack",
      example: "Shorter Rail",
      props: { variant: "rail" },
    },
  ],
};
