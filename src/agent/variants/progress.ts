import type { PageVariants } from "./types";

/**
 * Progress: 2 forms of one registry item (`progress`): a linear bar and a
 * circular ring. Statuses, indeterminate, steps, stage colours and the custom
 * centre are props or states of these. Claims come from
 * src/app/docs/[framework]/progress/page.mdx.
 */
export const progress: PageVariants = {
  slug: "progress",
  intro: "An animated progress indicator for loading, storage meters and step-by-step wizards. Every form fills from zero when it first appears and its numbers count up with it. Two forms: a linear bar and a circular ring.",
  gotchas: [
    "Both are parts of the one `progress` item (`Progress` and `CircularProgress`): install it once.",
    "Statuses, an indeterminate bar, step progress (a small `max`) and stage colours are props or usage of these two forms, not separate designs.",
  ],
  variants: [
    {
      id: "bar",
      label: "Linear bar",
      summary: "A bar that fills along a track, with a percentage bubble on hover; `value` and `max` are all it needs.",
      bestFor: ["loading states, storage meters and form steps"],
      avoidIf: ["you want a compact ring that fits a small tile"],
      traits: ["horizontal fill", "hover percentage tooltip", "optional label and readout"],
      item: "progress",
      demo: "progress",
      example: "Progress",
      props: { example: "bare", variant: "default", value: 45, tooltip: true },
    },
    {
      id: "circular",
      label: "Circular ring",
      summary: "The value drawn as an animated ring with a centred percentage, replaceable with a count or an icon.",
      bestFor: ["a goal or completion figure on a card or dashboard tile"],
      avoidIf: ["you want to show progress along a line"],
      traits: ["ring", "custom centre content", "adjustable diameter and thickness"],
      item: "progress",
      demo: "progress",
      example: "Circular progress",
      props: { example: "circular", variant: "glow", barSize: "md", value: 45, tooltip: true },
    },
  ],
};
