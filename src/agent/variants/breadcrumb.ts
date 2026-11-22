import type { PageVariants } from "./types";

/**
 * Breadcrumb: two separate registry items. `breadcrumb-flow` is the composable,
 * animated one; `breadcrumb` is the config-driven one with four visual styles.
 * Claims come from src/app/docs/[framework]/breadcrumb/page.mdx.
 */
export const breadcrumb: PageVariants = {
  slug: "breadcrumb",
  intro:
    "A trail showing where the reader is in a hierarchy. One is composed from parts and animates as the route changes; the other is driven by an `items` array and offers four styles.",
  gotchas: [
    "Each is its own registry item with its own API: install only the one you picked.",
    "The flow breadcrumb animates by item key, so give every `BreadcrumbItem` its route as a stable `key`, and put its separator inside the item.",
    "The flow breadcrumb's `render` prop on `BreadcrumbLink` is how you use your router's Link; the other takes `linkComponent`.",
  ],
  variants: [
    {
      id: "flow",
      label: "Flow breadcrumb",
      summary: "Composable parts; items fade in and out as the route changes and the rest slide into place.",
      bestFor: ["an app whose path changes without a page reload", "a long path that collapses behind an ellipsis"],
      avoidIf: ["you want to describe the trail as a plain array", "you want slash, solid or ghost styles"],
      traits: ["composable", "animated route changes", "hover, tap and keyboard ellipsis", "no motion library"],
      item: "breadcrumb-flow",
      demo: "breadcrumb-flow",
      example: "Flow breadcrumb",
    },
    {
      id: "block",
      label: "Breadcrumb",
      summary: "An `items` array with four styles (classic, slash, solid, ghost), icons and automatic collapsing.",
      bestFor: ["a static site or docs where the trail is known per page", "a quick drop-in with icons"],
      avoidIf: ["the trail changes live and you want it to animate"],
      traits: ["items array", "four styles", "icons", "click-to-expand ellipsis"],
      item: "breadcrumb",
      demo: "breadcrumb",
      example: "Breadcrumb",
    },
  ],
};
