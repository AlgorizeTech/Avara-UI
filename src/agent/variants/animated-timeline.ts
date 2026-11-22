import type { PageVariants } from "./types";

/**
 * Animated timeline: five separate registry items. `animated-timeline` is the
 * scroll-driven rail (its `layout` prop moves the rail); the path, dial, ruler
 * and steps timelines are their own items. Claims come from
 * src/app/docs/[framework]/animated-timeline/page.mdx.
 */
export const animatedTimeline: PageVariants = {
  slug: "animated-timeline",
  intro: "Timelines for roadmaps, histories and process steps. One scrolls a rail with cards in a column, the others draw a path, spin a dial, slide a ruler or number the steps.",
  gotchas: [
    "Each look is its own registry item: install only the one you picked.",
    "The animated timeline's `layout` prop (center, left, right) moves the rail; it is not a separate item.",
    "The dial and ruler timelines respond to the wheel, arrow keys and drag, so give them room and avoid putting them in a scrolling column.",
  ],
  variants: [
    {
      id: "cable",
      label: "Cable timeline",
      group: "Interactive pickers",
      summary: "Cards on a centre playhead with cables and year numerals; drag or scroll the wheel.",
      bestFor: ["browsing launches, releases or a project history", "events with a picture or figure each"],
      avoidIf: ["it must work as a plain scrolling list", "entries need long body text"],
      traits: ["horizontal", "drag and wheel", "year numerals", "arrow keys"],
      item: "timeline-cable",
      demo: "timeline-cable",
      example: "Cable timeline",
    },
    {
      id: "animated",
      label: "Animated rail",
      group: "Scroll and rail",
      summary: "A rail with cards that animate in as you scroll, centered, left or right.",
      bestFor: ["a company history or roadmap in a normal content column"],
      avoidIf: ["you want the reader to pick entries rather than scroll"],
      traits: ["scroll-driven", "layout center, left or right", "active node glow"],
      item: "animated-timeline",
      demo: "animated-timeline",
      example: "Animated timeline",
      props: { layout: "center", animation: "flip-up" },
      setProps: { layout: "center" },
    },
    {
      id: "path",
      label: "Path timeline",
      group: "Scroll and rail",
      summary: "A winding line draws itself from stop to stop with a glowing head.",
      bestFor: ["a journey or story with a few distinct stops"],
      avoidIf: ["there are many entries or long descriptions"],
      traits: ["winding path", "draws on scroll", "cards light up on arrival"],
      item: "timeline-path",
      demo: "timeline-path",
      example: "Path timeline",
    },
    {
      id: "steps",
      label: "Steps timeline",
      group: "Scroll and rail",
      summary: "Numbered nodes on a rail that fills as you scroll the box.",
      bestFor: ["a how-it-works or onboarding process"],
      avoidIf: ["entries are dates rather than ordered steps"],
      traits: ["numbered nodes", "rail fills on scroll", "click to focus a step"],
      item: "timeline-steps",
      demo: "timeline-steps",
      example: "Steps timeline",
    },
    {
      id: "dial",
      label: "Dial timeline",
      group: "Interactive pickers",
      summary: "Entries ride an arc beside a ruler of ticks; click, use the wheel or drag.",
      bestFor: ["a showcase where the reader browses a handful of milestones"],
      avoidIf: ["it must work as a plain scrolling list"],
      traits: ["arc layout", "wheel, arrow keys and drag", "needs room"],
      item: "timeline-dial",
      demo: "timeline-dial",
      example: "Dial timeline",
    },
    {
      id: "ruler",
      label: "Ruler timeline",
      group: "Interactive pickers",
      summary: "Labels slide past a wavy rail and the one at the bulge is detailed beside it.",
      bestFor: ["years or figures with a short caption each"],
      avoidIf: ["entries need long body text"],
      traits: ["wavy rail", "value and caption per entry", "wheel, arrow keys and drag"],
      item: "timeline-ruler",
      demo: "timeline-ruler",
      example: "Ruler timeline",
    },
  ],
};
