import type { PageVariants } from "./types";

/**
 * Fleet tracker (slug `fleet-tracker`): 3 looks of one registry item
 * (`fleet-map`), chosen with the `variant` prop. The preview demo is named
 * `fleet`. Claims come from src/app/docs/[framework]/fleet-tracker/page.mdx.
 */
export const fleetTracker: PageVariants = {
  slug: "fleet-tracker",
  intro: "A fleet management dashboard with a vehicle sidebar synchronised with a live React Leaflet map: click a vehicle to fly the map to it, or a marker to highlight it in the list. Three looks.",
  gotchas: [
    "All three are looks of the one `fleet-map` item: install it once and set `variant` from the index.",
    "Vehicles are `{ id, location, lat, lng }` with optional `status` (`active`, `idle`, `maintenance`) and `speed`.",
  ],
  variants: [
    {
      id: "default",
      label: "Split view",
      summary: "A fixed sidebar beside the map, synchronised in both directions.",
      bestFor: ["a dispatch or logistics screen where the list and map are equally important"],
      avoidIf: ["you want the map to fill the whole area"],
      traits: ["sidebar beside the map", "default look"],
      item: "fleet-map",
      demo: "fleet",
      example: "Fleet tracker",
      props: { variant: "default" },
      setProps: { variant: "default" },
    },
    {
      id: "minimal",
      label: "Minimal",
      summary: "The vehicle list floats as a panel over a light map.",
      bestFor: ["a map-first view with the list kept out of the way"],
      avoidIf: ["you want a permanent sidebar"],
      traits: ["floating list panel", "light map"],
      item: "fleet-map",
      demo: "fleet",
      example: "Minimal",
      props: { variant: "minimal" },
      setProps: { variant: "minimal" },
    },
    {
      id: "modern",
      label: "Modern",
      summary: "An aurora behind the whole tracker, the vehicle list as a frosted slab and the map in a glass-edged panel.",
      bestFor: ["a showpiece, brand-forward tracking screen"],
      avoidIf: ["you want a plain, utilitarian dashboard"],
      traits: ["aurora backdrop", "frosted list", "glass-edged map"],
      item: "fleet-map",
      demo: "fleet",
      example: "Modern",
      props: { variant: "modern" },
      setProps: { variant: "modern" },
    },
  ],
};
