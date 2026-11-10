import type { PageVariants } from "./types";

/**
 * Timeline: 5 looks of one registry item (`timeline`), chosen with the
 * `layout` prop (where the rail sits) and the `variant` prop (the card
 * surface). Turning the entrance off is `animate`, so that example is not
 * listed. Claims come from src/app/docs/[framework]/timeline/page.mdx.
 */
export const timeline: PageVariants = {
  slug: "timeline",
  intro: "A vertical timeline for order statuses, company histories and event feeds, with action buttons and expandable detail, in five looks: three rail positions and two card surfaces.",
  gotchas: [
    "All five are looks of the one `timeline` item: install it once and set `layout` or `variant` from the index.",
    "The center layout folds back to one column below 576px, as a container query that tracks the column the timeline sits in.",
    "`glass` needs something behind the cards to frost.",
  ],
  variants: [
    {
      id: "left",
      label: "Left rail",
      group: "Rail position",
      summary: "The default rail on the left with the cards to its right.",
      bestFor: ["an order tracker or activity feed in a normal content column"],
      avoidIf: ["you want cards alternating on both sides"],
      traits: ["left rail", "default look"],
      item: "timeline",
      demo: "timeline",
      example: "Timeline",
      props: { layout: "left", variant: "default" },
      setProps: { layout: "left" },
    },
    {
      id: "center",
      label: "Center rail",
      group: "Rail position",
      summary: "Cards alternate either side of a central rail.",
      bestFor: ["a company history or roadmap with room to spread out"],
      avoidIf: ["it must stay a single compact column"],
      traits: ["alternating cards", "folds to one column when narrow"],
      item: "timeline",
      demo: "timeline",
      example: "Center layout",
      props: { layout: "center", variant: "default" },
      setProps: { layout: "center" },
    },
    {
      id: "right",
      label: "Right rail",
      group: "Rail position",
      summary: "The mirror of the left rail, with the rail on the right.",
      bestFor: ["a timeline beside content that already sits on the left, or right-to-left layouts"],
      avoidIf: ["you want the standard left rail"],
      traits: ["right rail"],
      item: "timeline",
      demo: "timeline",
      example: "Right layout",
      props: { layout: "right", variant: "default" },
      setProps: { layout: "right" },
    },
    {
      id: "minimal",
      label: "Minimal",
      group: "Card surface",
      summary: "The card chrome is removed for a lighter feed, so the rail and type carry the structure.",
      bestFor: ["a quiet changelog or activity feed"],
      avoidIf: ["you want each event to sit in its own card"],
      traits: ["no card chrome"],
      item: "timeline",
      demo: "timeline",
      example: "Minimal",
      props: { layout: "left", variant: "minimal" },
      setProps: { variant: "minimal" },
    },
    {
      id: "glass",
      label: "Glass",
      group: "Card surface",
      summary: "The cards are frosted, so put something behind them.",
      bestFor: ["a timeline over a photo or gradient"],
      avoidIf: ["the background is plain"],
      traits: ["frosted cards"],
      item: "timeline",
      demo: "timeline",
      example: "Glass",
      props: { layout: "left", variant: "glass" },
      setProps: { variant: "glass" },
    },
  ],
};
