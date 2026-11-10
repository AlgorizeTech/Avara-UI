import type { PageVariants } from "./types";

/**
 * Tech stack: 2 looks of one registry item (`tech-stack`), chosen with the
 * `variant` prop. Showing a single group is just using one group, so that
 * example is not listed. Claims come from
 * src/app/docs/[framework]/tech-stack/page.mdx.
 */
export const techStack: PageVariants = {
  slug: "tech-stack",
  intro: "The \"Built with\" line: a label followed by the marks of the tools a product is made with, in two rows that take turns between groups, in two looks: labelled or compact.",
  whenNot: [
    {
      use: "Component Wall",
      slug: "component-wall",
      reason: "for a full hero that already includes a tech stack line",
    },
  ],
  gotchas: [
    "Both are looks of the one `tech-stack` item: install it once and set `variant` from the index.",
    "Compose it: a `TechStack` holds `TechStackGroup`s and each holds `TechStackTool`s, so your list of tools needs no particular shape. Four to eight tools per group read well.",
    "With a single group nothing turns, so no timer runs.",
  ],
  variants: [
    {
      id: "labelled",
      label: "Labelled",
      summary: "Each mark with its name shown beside it. The default.",
      bestFor: ["a \"Built with\" line where recognising each tool by name matters"],
      avoidIf: ["space is tight and the marks are well known"],
      traits: ["names visible", "default look"],
      item: "tech-stack",
      demo: "tech-stack",
      example: "Built with",
      props: { example: "default", variant: "labelled" },
    },
    {
      id: "compact",
      label: "Compact",
      summary: "The names are hidden from view and become each mark's tooltip, still read to screen readers.",
      bestFor: ["a tight strip of recognisable logos"],
      avoidIf: ["visitors may not recognise the marks without names"],
      traits: ["marks only", "names as tooltips"],
      item: "tech-stack",
      demo: "tech-stack",
      example: "Compact",
      props: { example: "default", variant: "compact" },
      setProps: { variant: "compact" },
    },
  ],
};
