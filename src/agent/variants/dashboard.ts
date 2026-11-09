import type { PageVariants } from "./types";

/**
 * Dashboard: 3 looks of one registry item (`dashboard`), chosen with the
 * `variant` prop. Claims come from
 * src/app/docs/[framework]/dashboard/page.mdx.
 */
export const dashboard: PageVariants = {
  slug: "dashboard",
  intro: "An admin analytics dashboard: period switch, metric tabs, a chart, an activity feed and breakdown panels. Three looks of the same dashboard.",
  whenNot: [
    {
      use: "Support dashboard",
      slug: "support-dashboard",
      reason: "for a helpdesk with tickets rather than analytics",
    },
  ],
  gotchas: [
    "All three are looks of the one `dashboard` item: install it once and set `variant` from the index (the classic look needs none). All three read the same `metrics`, `activity`, `sources`, `countries` and `authors` data.",
  ],
  variants: [
    {
      id: "classic",
      label: "Classic admin overview",
      summary: "Period switch, metric tabs, a chart that flips between columns and a trend line, and a filterable activity feed.",
      bestFor: ["a conventional admin or analytics screen"],
      avoidIf: ["you want translucent panes over a backdrop"],
      traits: ["period switch", "metric tabs", "column and trend chart", "activity filter", "gauge and barcode panels"],
      item: "dashboard",
      demo: "dashboard",
      example: "Admin overview",
    },
    {
      id: "glass",
      label: "Glass dashboard",
      summary: "Milky glass panes on a soft canvas; the same data re-presented with a payments table and shortcut tiles.",
      bestFor: ["a softer dashboard that sits over a gradient or image"],
      avoidIf: ["you want flat, dense panels"],
      traits: ["milky glass panes", "capsule columns", "half ring", "optional payments table and shortcut tiles"],
      item: "dashboard",
      demo: "dashboard",
      example: "Glass",
      props: { variant: "glass" },
      setProps: { variant: "glass" },
    },
    {
      id: "liquid-glass",
      label: "Liquid glass dashboard",
      summary: "Fluid refractive glass from SVG displacement filters, with specular highlights and an ambient backdrop.",
      bestFor: ["a showpiece dashboard where the glass effect is part of the brand"],
      avoidIf: ["you want a plain, dense working screen"],
      traits: ["liquid glass", "SVG displacement filters", "specular highlights", "ambient backdrop"],
      item: "dashboard",
      demo: "dashboard",
      example: "Liquid Glass",
      props: { variant: "liquid-glass" },
      setProps: { variant: "liquid-glass" },
    },
  ],
};
