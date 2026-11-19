import type { PageVariants } from "./types";

/**
 * Alert: 4 styles of one registry item (`alert`), chosen with the `variant`
 * prop. The type (neutral, info, success, warning, danger, loading), the action
 * slot and dismiss are props on any style. Claims come from
 * src/app/docs/[framework]/alert/page.mdx.
 */
export const alert: PageVariants = {
  slug: "alert",
  intro: "An inline alert for messages that stay in the layout, with six types (neutral, info, success, warning, danger, loading), an action button slot and optional dismiss, in four styles: default, soft, glass and solid.",
  whenNot: [
    { use: "Toast", slug: "toast", reason: "the message is short-lived and should float over the page instead of sitting in the layout" },
  ],
  gotchas: [
    "All four are looks of the one `alert` item: install it once and set `variant` from the index.",
    "The type picks the icon and the colour on every style; it says what the alert is about, so choose it by meaning, not by taste.",
    "Glass uses white text and needs an image or gradient behind it; on a plain background use another style.",
  ],
  variants: [
    {
      id: "default",
      label: "Default",
      group: "Quiet",
      summary: "A card surface where only the icon carries the type colour.",
      bestFor: ["a restrained interface where the alert should not shout"],
      avoidIf: ["the alert has to be noticed at a glance"],
      traits: ["card surface", "coloured icon only"],
      item: "alert",
      demo: "alert",
      example: "Default",
      props: { variant: "default" },
    },
    {
      id: "soft",
      label: "Soft",
      group: "Quiet",
      summary: "A pale card with the type colour bleeding in from the left corners.",
      bestFor: ["form-level and page-level messages that should read by colour"],
      avoidIf: ["you want a plain card with no tint"],
      traits: ["corner gradient", "dark text", "paired footer buttons"],
      item: "alert",
      demo: "alert",
      example: "Soft",
      props: { variant: "soft" },
      setProps: { variant: "soft" },
    },
    {
      id: "solid",
      label: "Solid",
      group: "Loud",
      summary: "A flat light fill of the standard type colour with a matching border.",
      bestFor: ["banners that should read by colour at a glance"],
      avoidIf: ["you want a card with no tint at all"],
      traits: ["flat tinted fill", "coloured icon", "filled action buttons"],
      item: "alert",
      demo: "alert",
      example: "Solid",
      props: { variant: "solid" },
      setProps: { variant: "solid" },
    },
    {
      id: "glass",
      label: "Glass",
      group: "Loud",
      summary: "A frosted alert with a type-coloured tint and icon.",
      bestFor: ["an interface over imagery or gradients"],
      avoidIf: ["the background is plain and there is nothing to frost"],
      traits: ["frosted blur", "white text", "needs a backdrop"],
      item: "alert",
      demo: "alert",
      example: "Glass",
      props: { variant: "glass" },
      setProps: { variant: "glass" },
    },
  ],
};
