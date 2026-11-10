import type { PageVariants } from "./types";

/**
 * Calendar: 4 looks of one registry item (`calendar`), chosen with the
 * `variant` prop. Claims come from src/app/docs/[framework]/calendar/page.mdx.
 */
export const calendar: PageVariants = {
  slug: "calendar",
  intro: "A calendar dashboard with built-in event management, filtering, Month, Week and Day views and animated popover modals, in four looks: the default card, a flush minimal one, frosted glass and liquid glass.",
  whenNot: [
    {
      use: "Date Picker",
      slug: "date-picker",
      reason: "for choosing a single date in a form field rather than managing events",
    },
  ],
  gotchas: [
    "All four are looks of the one `calendar` item: install it once and set `variant` from the index.",
    "Event seed data is keyed `\"YYYY-M-D\"` with un-padded month and day.",
    "`glass` and `liquid-glass` are meant to sit on a coloured or photographic surface.",
  ],
  variants: [
    {
      id: "default",
      label: "Default",
      group: "Solid",
      summary: "The full dashboard in its own card, with the accent colour on active states, buttons and focus rings.",
      bestFor: ["a calendar page on a normal background"],
      avoidIf: ["it should sit flush inside another layout"],
      traits: ["card chrome", "default look", "named or hex accent colour"],
      item: "calendar",
      demo: "calendar",
      example: "Calendar dashboard",
      props: { variant: "default" },
      setProps: { variant: "default" },
    },
    {
      id: "minimal",
      label: "Minimal",
      group: "Solid",
      summary: "Drops the card chrome so the dashboard sits flush in your own layout.",
      bestFor: ["a calendar embedded in a page or panel that already has its own frame"],
      avoidIf: ["you want it to read as a self-contained card"],
      traits: ["no card chrome"],
      item: "calendar",
      demo: "calendar",
      example: "Minimal",
      props: { variant: "minimal" },
      setProps: { variant: "minimal" },
    },
    {
      id: "glass",
      label: "Glass",
      group: "Glass",
      summary: "Translucent, for a coloured or photographic surface.",
      bestFor: ["a calendar over a colourful or photographic background"],
      avoidIf: ["the background is plain"],
      traits: ["translucent"],
      item: "calendar",
      demo: "calendar",
      example: "Glass",
      props: { variant: "glass" },
      setProps: { variant: "glass" },
    },
    {
      id: "liquid-glass",
      label: "Liquid glass",
      group: "Glass",
      summary: "A physical fluid-glass distortion with layered refraction filters and specular bevels.",
      bestFor: ["a showpiece calendar over rich imagery"],
      avoidIf: ["you want a restrained look or a plain background"],
      traits: ["refraction filters", "specular bevels"],
      item: "calendar",
      demo: "calendar",
      example: "Liquid Glass",
      props: { variant: "liquid-glass" },
      setProps: { variant: "liquid-glass" },
    },
  ],
};
