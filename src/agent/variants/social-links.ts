import type { PageVariants } from "./types";

/**
 * Social links: 4 designs of one registry item (`social-links`), chosen with
 * the `variant` prop. Claims come from
 * src/app/docs/[framework]/social-links/page.mdx.
 */
export const socialLinks: PageVariants = {
  slug: "social-links",
  intro: "A row of brand marks that link out, drawn as inline SVG so it works with any icon package, in four designs: a plain row of tiles, an outlined row, and two share buttons that expand into the links on hover.",
  gotchas: [
    "All four are looks of the one `social-links` item: install it once and set `variant` from the index.",
    "`links` is `{ network, href, label? }[]` and is drawn in the order given; external links open in a new tab with `rel=\"noopener noreferrer\"` unless turned off.",
    "`size` (`sm`, `md`, `lg`) and a `ghost` style (no fill until hover) are also available on the row styles; the expandable share buttons take a direction.",
  ],
  variants: [
    {
      id: "row",
      label: "Follow row",
      group: "Always visible",
      summary: "One filled tile per network in a row: the default, with each link carrying an accessible name.",
      bestFor: ["a footer or profile that lists your social accounts"],
      avoidIf: ["you want a single share button that reveals the links"],
      traits: ["filled tiles", "default look"],
      item: "social-links",
      demo: "social-links",
      example: "Follow row",
      props: { example: "row" },
    },
    {
      id: "outline",
      label: "Outlined row",
      group: "Always visible",
      summary: "The same row with a border instead of a fill, drawn here with every network at the large size.",
      bestFor: ["a lighter, line-style row of social links"],
      avoidIf: ["you want filled tiles that stand out"],
      traits: ["border instead of fill", "all networks"],
      item: "social-links",
      demo: "social-links",
      example: "Every network, outlined",
      props: { example: "all", variant: "outline", size: "lg" },
      setProps: { variant: "outline" },
    },
    {
      id: "expand-replace",
      label: "Expand and replace share button",
      group: "Share buttons",
      summary: "A share button that hides on hover while the social icons expand out from its exact position.",
      bestFor: ["an article or product page where sharing should stay out of the way until needed"],
      avoidIf: ["the links must always be visible, or the page is touch-only"],
      traits: ["hover reveal", "trigger hides", "direction option, default right"],
      item: "social-links",
      demo: "social-links",
      example: "Expand and replace share button (Trigger hides on hover)",
      props: { example: "expand-replace", variant: "expand-replace" },
      setProps: { variant: "expand-replace" },
    },
    {
      id: "expand-reveal",
      label: "Expandable 4-directional share buttons",
      group: "Share buttons",
      summary: "An icon-only Share button that expands the social tiles on hover, in any of four directions.",
      bestFor: ["a compact share control that opens up to the right, left, above or below"],
      avoidIf: ["the links must always be visible, or the page is touch-only"],
      traits: ["hover reveal", "icon-only trigger", "four directions"],
      item: "social-links",
      demo: "social-links",
      example: "Expandable 4-directional share buttons",
      props: { example: "expand-reveal", variant: "expand-reveal" },
      setProps: { variant: "expand-reveal" },
    },
  ],
};
