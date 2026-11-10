import type { PageVariants } from "./types";

/**
 * Select: 2 trigger styles of one registry item (`select`), chosen with the
 * `variant` prop. Search and multi-select are props, so those examples are not
 * listed. Claims come from src/app/docs/[framework]/select/page.mdx.
 */
export const select: PageVariants = {
  slug: "select",
  intro: "A custom dropdown that replaces the native `<select>`, matching the input styles, with optional search, grouping and multi-select, in two trigger styles: bordered and underlined.",
  whenNot: [
    {
      use: "Input",
      slug: "input",
      reason: "for free-text entry rather than choosing from a list",
    },
  ],
  gotchas: [
    "Both are looks of the one `select` item: install it once and set `variant` from the index.",
    "Searchable (`isSearchable`) and multi-select (`isMultiple`, with an array `value`) are props on either style.",
  ],
  variants: [
    {
      id: "default",
      label: "Bordered",
      summary: "The default bordered trigger.",
      bestFor: ["a standard form dropdown beside bordered inputs"],
      avoidIf: ["your form uses underlined fields"],
      traits: ["bordered trigger", "default look"],
      item: "select",
      demo: "select",
      example: "Select",
      props: { isGrouped: false },
      generalItem: true,
    },
    {
      id: "underlined",
      label: "Underlined",
      summary: "The trigger is reduced to a single baseline rule.",
      bestFor: ["a minimal form that uses underlined inputs"],
      avoidIf: ["you mix it with bordered fields"],
      traits: ["baseline rule"],
      item: "select",
      demo: "select",
      example: "Underlined",
      props: { isGrouped: false, variant: "underlined" },
      setProps: { variant: "underlined" },
      generalItem: true,
    },
  ],
};
