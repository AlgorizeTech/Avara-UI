import type { PageVariants } from "./types";

/**
 * Toast: 4 card styles of one registry item (`toast`), chosen with the
 * `variant` prop. Types, actions, durations and stacking are props or
 * behaviours, so those examples are not listed. Claims come from
 * src/app/docs/[framework]/toast/page.mdx.
 */
export const toast: PageVariants = {
  slug: "toast",
  intro: "A notification system that keeps its own state and animates with the browser's Web Animations API, in four card styles: the default, a glow, frosted glass and a minimal accent bar.",
  gotchas: [
    "All four are looks of the one `toast` item: install it once and set `variant` from the index.",
    "Stacking (`stack`) piles toasts behind the newest one and works with any style; it is a prop, not a design.",
    "Types (`success`, `error`, `warning`, `info`, `default`), an action button and the duration are props on any style.",
  ],
  variants: [
    {
      id: "default",
      label: "Default",
      group: "Plain",
      summary: "The standard card with an icon and accent for each toast type.",
      bestFor: ["notifications on a normal light or dark interface"],
      avoidIf: ["you want an effect such as a glow or frosted glass"],
      traits: ["type icon and accent", "default look"],
      item: "toast",
      demo: "toast",
      example: "Types",
      props: { example: "types" },
    },
    {
      id: "minimal",
      label: "Minimal",
      group: "Plain",
      summary: "The card is stripped down to a thin accent bar and text.",
      bestFor: ["a restrained interface where notifications should be unobtrusive"],
      avoidIf: ["you want the toast type to be obvious from an icon at a glance"],
      traits: ["thin accent bar", "text only"],
      item: "toast",
      demo: "toast",
      example: "Minimal",
      props: { variant: "minimal", example: "types" },
      setProps: { variant: "minimal" },
    },
    {
      id: "glow",
      label: "Glow",
      group: "Effects",
      summary: "The card is surrounded by a coloured halo, built for dark surfaces.",
      bestFor: ["a dark interface where notifications should stand out"],
      avoidIf: ["your surface is light, since the glow is built for dark ones"],
      traits: ["coloured halo", "for dark surfaces"],
      item: "toast",
      demo: "toast",
      example: "Glow",
      props: { variant: "glow", example: "types" },
      setProps: { variant: "glow" },
    },
    {
      id: "glass",
      label: "Glass",
      group: "Effects",
      summary: "A frosted card with the type accent bleeding in from the icon corner, solid badge icons and a centred close button.",
      bestFor: ["an interface over imagery or gradients"],
      avoidIf: ["the background is plain and there is nothing to frost"],
      traits: ["frosted card", "accent bleed from the icon", "solid badge icons"],
      item: "toast",
      demo: "toast",
      example: "Glass",
      props: { variant: "glass", example: "types" },
      setProps: { variant: "glass" },
    },
  ],
};
