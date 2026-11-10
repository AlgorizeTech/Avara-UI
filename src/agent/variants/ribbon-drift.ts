import type { PageVariants } from "./types";

/**
 * Ribbon drift: 2 looks of one registry item (`ribbon-drift`), chosen with the
 * `variant` prop. Claims come from
 * src/app/docs/[framework]/ribbon-drift/page.mdx.
 */
export const ribbonDrift: PageVariants = {
  slug: "ribbon-drift",
  intro: "Two infinite marquee ribbons over an ambient, drifting gradient background, in two looks: a brand-logo strip with criss-crossing ribbons, or a hero card with a central 3D character and a frosted promo.",
  gotchas: [
    "Both are looks of the one `ribbon-drift` item: install it once and set `variant` from the index.",
    "`color` tunes the ambient glow for either look; `bgColor` overrides the background with a custom colour.",
  ],
  variants: [
    {
      id: "cross-logos",
      label: "Cross ribbon logos",
      summary: "Two criss-crossing logo marquees with frosted glass blur over an ambient drift background.",
      bestFor: ["a trusted-by or partner strip that should feel animated"],
      avoidIf: ["you have no brand logos to show", "you want a hero card with a central illustration"],
      traits: ["criss-crossing ribbons", "brand logos", "frosted glass", "ambient background"],
      item: "ribbon-drift",
      demo: "ribbon-drift",
      example: "Cross Ribbon Logos",
      props: { variant: "cross-logos", color: "primary" },
      setProps: { variant: "cross-logos" },
    },
    {
      id: "default",
      label: "Hero card",
      summary: "Two tilted marquee ribbons around a central 3D character, with a frosted promo card.",
      bestFor: ["a hero or promotional banner with a focal illustration"],
      avoidIf: ["you only need a quiet logo strip"],
      traits: ["tilted ribbons", "3D character", "frosted promo card", "ambient background"],
      item: "ribbon-drift",
      demo: "ribbon-drift",
      example: "Ribbon Drift Hero Card",
      props: { variant: "default", color: "primary" },
      setProps: { variant: "default" },
    },
  ],
};
