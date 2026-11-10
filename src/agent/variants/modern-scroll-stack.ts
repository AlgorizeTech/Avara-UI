import type { PageVariants } from "./types";

/**
 * Modern scroll stack: 2 arrangements of one registry item
 * (`modern-scroll-stack`), chosen with the `variant` prop. Claims come from
 * src/app/docs/[framework]/modern-scroll-stack/page.mdx.
 */
export const modernScrollStack: PageVariants = {
  slug: "modern-scroll-stack",
  intro: "A scroll-driven section where service cards rise from the bottom of the viewport and tilt into organic resting angles as they lock into a sticky stack, in two arrangements.",
  whenNot: [
    {
      use: "Scroll Stack",
      slug: "scroll-stack",
      reason: "for the other scroll-stack designs, such as sticky stacks, fan stacks and scroll accordions",
    },
  ],
  gotchas: [
    "Both are looks of the one `modern-scroll-stack` item: install it once and set `variant` from the index.",
  ],
  variants: [
    {
      id: "fan",
      label: "Horizontal fan",
      summary: "Cards spread horizontally across the stage as each rises, so earlier cards stay visible beneath.",
      bestFor: ["a services section where every card should stay partly visible"],
      avoidIf: ["you want the cards piled in one spot"],
      traits: ["horizontal spread", "78px offset per card by default", "tilted resting angles"],
      item: "modern-scroll-stack",
      demo: "modern-scroll-stack",
      example: "Service cards (Horizontal Fan)",
      props: { variant: "fan", cardOffsetX: 78, cardGap: 48 },
      setProps: { variant: "fan" },
    },
    {
      id: "stacked",
      label: "Centred pile",
      summary: "All cards lock at the centre on top of one another, each tilted so the layers peek out around the edges.",
      bestFor: ["a compact pile that reads as a deck of cards"],
      avoidIf: ["you want each card's content to stay visible as the next arrives"],
      traits: ["centred pile", "distinct tilt per card"],
      item: "modern-scroll-stack",
      demo: "modern-scroll-stack",
      example: "Centered Stacked Pile",
      props: { variant: "stacked", cardGap: 48 },
      setProps: { variant: "stacked" },
    },
  ],
};
