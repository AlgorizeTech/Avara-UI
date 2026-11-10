import type { PageVariants } from "./types";

/**
 * Table: 3 looks of one registry item (`table`), chosen with the `variant`
 * prop on `Table`. Sorting, expandable rows, pagination, row actions and sizes
 * are composition and props, so those examples are not listed. Claims come from
 * src/app/docs/[framework]/table/page.mdx.
 */
export const table: PageVariants = {
  slug: "table",
  intro: "A set of composable table primitives: you write the rows and the component supplies structure, spacing and theming, with no column config and no required row shape. Three looks: the default card, a minimal one and the soft admin-dashboard look.",
  whenNot: [
    {
      use: "Data Table",
      slug: "data-table",
      reason: "for a data table with search, filters and paging wired up for you",
    },
  ],
  gotchas: [
    "All three are looks of the one `table` item: install it once and set `variant` on `Table` from the index.",
    "Sortable headers, expandable rows, pagination and row actions are composition on any look; the table never reorders your data behind your back.",
    "`size` on `Table` sets the spacing for every cell and header through context.",
  ],
  variants: [
    {
      id: "default",
      label: "Default card",
      summary: "The table inside a card wrapper: the default look.",
      bestFor: ["a data table on a plain page"],
      avoidIf: ["the table already sits in a container that supplies the frame"],
      traits: ["card wrapper", "default look"],
      item: "table",
      demo: "table",
      example: "Composable table",
      props: { sortable: true, expandable: true },
    },
    {
      id: "minimal",
      label: "Minimal",
      summary: "The card wrapper is dropped so the table sits directly on the page.",
      bestFor: ["a table inside a layout that already provides the surface"],
      avoidIf: ["you want it to read as a self-contained card"],
      traits: ["no card wrapper"],
      item: "table",
      demo: "table",
      example: "Minimal",
      props: { variant: "minimal", expandable: false, sortable: false },
      setProps: { variant: "minimal" },
    },
    {
      id: "soft",
      label: "Soft",
      summary: "A read-only admin-dashboard look: rounded panel, tinted header band, calm dividers and soft row hover.",
      bestFor: ["an admin or settings area with a gentle, dashboard-style table"],
      avoidIf: ["you need search, filters or paging built in"],
      traits: ["rounded panel on a hairline ring", "tinted header band", "tints mixed from the table colour"],
      item: "table",
      demo: "table-soft",
      example: "Soft variant",
      setProps: { variant: "soft" },
    },
  ],
};
