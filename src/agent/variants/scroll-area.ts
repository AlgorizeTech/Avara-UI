import type { PageVariants } from "./types";

/**
 * Scroll area: 3 scrollbar styles of one registry item (`scroll-area`),
 * chosen with the `variant` prop. Direction (`orientation`) and `autoHide` are
 * props, so the horizontal, both-axes and auto-hide examples are not listed.
 * Claims come from src/app/docs/[framework]/scroll-area/page.mdx.
 */
export const scrollArea: PageVariants = {
  slug: "scroll-area",
  intro: "A scroll container with a custom, cross-browser scrollbar built in pure CSS, in three styles: the default, a slim minimal bar and a tinted glass bar.",
  gotchas: [
    "All three are looks of the one `scroll-area` item: install it once and set `variant` from the index.",
    "The container needs a height or width constraint, or there is nothing to scroll.",
    "Direction is `orientation` (vertical, horizontal or both) and fading the bar out is `autoHide`: both are props on any style.",
  ],
  variants: [
    {
      id: "default",
      label: "Default",
      summary: "The standard custom scrollbar, styled to match your theme.",
      bestFor: ["a general scrollable panel, list or code area"],
      avoidIf: ["the space is dense and a slimmer bar would suit better"],
      traits: ["default look", "vertical, horizontal or both axes"],
      item: "scroll-area",
      demo: "scroll-area",
      example: "Scroll area",
      props: { variant: "default", orientation: "vertical" },
      setProps: { variant: "default" },
    },
    {
      id: "minimal",
      label: "Minimal",
      summary: "The thumb is slimmed down for dense interfaces.",
      bestFor: ["tables, menus and dense UI where the scrollbar should take little room"],
      avoidIf: ["a thin bar would be hard to grab"],
      traits: ["slim thumb"],
      item: "scroll-area",
      demo: "scroll-area",
      example: "Minimal",
      props: { variant: "minimal", orientation: "vertical" },
      setProps: { variant: "minimal" },
    },
    {
      id: "glass",
      label: "Glass",
      summary: "The bar is tinted for use over frosted surfaces.",
      bestFor: ["scroll areas inside glass panels or over imagery"],
      avoidIf: ["the surface is plain and solid"],
      traits: ["tinted bar for frosted backgrounds"],
      item: "scroll-area",
      demo: "scroll-area",
      example: "Glass",
      props: { variant: "glass", orientation: "vertical" },
      setProps: { variant: "glass" },
    },
  ],
};
