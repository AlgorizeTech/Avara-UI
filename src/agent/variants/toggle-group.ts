import type { PageVariants } from "./types";

/**
 * Toggle group: 4 looks of one registry item (`toggle-group`), chosen with the
 * `variant` prop. Single or multiple selection, sizes and disabling are props,
 * so those examples are not listed. Claims come from
 * src/app/docs/[framework]/toggle-group/page.mdx.
 */
export const toggleGroup: PageVariants = {
  slug: "toggle-group",
  intro: "A set of segmented two-state buttons for settings and rich-text toolbars, in four looks: the default, outlined, ghost and a sliding pill track.",
  gotchas: [
    "All four are looks of the one `toggle-group` item: install it once and set `variant` from the index.",
    "Single or multiple selection is the `type` prop (`multiple` takes a string array as `value`), and `size` and `disabled` are props on any look.",
    "The sliding pill track reads best with text labels and `type=\"single\"`.",
  ],
  variants: [
    {
      id: "default",
      label: "Default",
      group: "Standard",
      summary: "The default segmented group, behaving like radio buttons in single mode.",
      bestFor: ["a general settings or view switcher"],
      avoidIf: ["you want a border around the group or a sliding highlight"],
      traits: ["default look", "single or multiple selection"],
      item: "toggle-group",
      demo: "toggle-group",
      example: "Toggle Group",
      props: { example: "single" },
    },
    {
      id: "outline",
      label: "Outline",
      group: "Standard",
      summary: "A border is drawn around the segment.",
      bestFor: ["a toolbar where the group should be clearly bounded"],
      avoidIf: ["you want a lighter look"],
      traits: ["bordered segment"],
      item: "toggle-group",
      demo: "toggle-group",
      example: "Outline",
      props: { example: "single", variant: "outline" },
      setProps: { variant: "outline" },
    },
    {
      id: "ghost",
      label: "Ghost",
      group: "Light and track",
      summary: "Items paint only when active, with no pill container.",
      bestFor: ["a rich-text toolbar where the buttons should stay light"],
      avoidIf: ["you want the group to read as one control"],
      traits: ["paints only when active", "no container"],
      item: "toggle-group",
      demo: "toggle-group",
      example: "Ghost",
      props: { example: "single", variant: "ghost" },
      setProps: { variant: "ghost" },
    },
    {
      id: "segmented",
      label: "Segmented pill",
      group: "Light and track",
      summary: "A pill track with a sliding highlight.",
      bestFor: ["a text-labelled single choice such as a tab-like switcher"],
      avoidIf: ["you need multiple selection or icon-only items"],
      traits: ["pill track", "sliding highlight"],
      item: "toggle-group",
      demo: "toggle-group",
      example: "Segmented",
      props: { example: "segmented" },
      setProps: { variant: "segmented" },
    },
  ],
};
