import type { PageVariants } from "./types";

/**
 * Theme switcher: 3 layouts of one registry item (`theme-switcher`), chosen
 * with the `variant` prop. Claims come from
 * src/app/docs/[framework]/theme-switcher/page.mdx.
 */
export const themeSwitcher: PageVariants = {
  slug: "theme-switcher",
  intro: "An animated dark-mode toggle built on `next-themes`, in three layouts: a compact icon, a segmented pill and a dropdown menu.",
  gotchas: [
    "All three are looks of the one `theme-switcher` item: install it once and set `variant` from the index.",
    "Only `dropdown` offers the `system` option, so users can follow their OS setting.",
  ],
  variants: [
    {
      id: "icon",
      label: "Icon",
      summary: "A compact icon button that toggles the theme: the default and the usual choice for a navbar.",
      bestFor: ["a navbar or any tight space"],
      avoidIf: ["you want users to see the current mode spelled out or pick a system setting"],
      traits: ["icon only", "default look"],
      item: "theme-switcher",
      demo: "theme-switcher",
      example: "Icon",
      props: { variant: "icon" },
      setProps: { variant: "icon" },
    },
    {
      id: "pill",
      label: "Pill",
      summary: "A segmented control with a sliding indicator that shows the current mode explicitly.",
      bestFor: ["a settings page where the mode should be visible and selectable"],
      avoidIf: ["space is tight, as in a navbar"],
      traits: ["segmented control", "sliding indicator"],
      item: "theme-switcher",
      demo: "theme-switcher",
      example: "Pill",
      props: { variant: "pill" },
      setProps: { variant: "pill" },
    },
    {
      id: "dropdown",
      label: "Dropdown",
      summary: "A menu of modes, and the only layout with the `system` option.",
      bestFor: ["letting users defer to their operating system's theme"],
      avoidIf: ["you want a one-click toggle"],
      traits: ["menu", "includes `system`"],
      item: "theme-switcher",
      demo: "theme-switcher",
      example: "Dropdown",
      props: { variant: "dropdown" },
      setProps: { variant: "dropdown" },
    },
  ],
};
