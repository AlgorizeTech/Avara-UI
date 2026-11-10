import type { PageVariants } from "./types";

/**
 * Glass panel: 3 surfaces of one registry item (`glass-panel`), chosen with
 * the `variant` prop on `GlassBackdrop`. The four panel shapes and the bento
 * layout are composition, not separate designs. Claims come from
 * src/app/docs/[framework]/glass-panel/page.mdx.
 */
export const glassPanel: PageVariants = {
  slug: "glass-panel",
  intro: "A frosted surface in four shapes plus the aurora backdrop it sits on, laid out on a 12-column bento grid. The backdrop's `variant` decides whether the panels are glass, plain solid cards or liquid glass.",
  whenNot: [
    {
      use: "Profile Page",
      slug: "profile-page",
      reason: "for a finished profile built on this glass surface rather than the raw panels",
    },
  ],
  gotchas: [
    "All three are looks of the one `glass-panel` item: install it once and set `variant` on `GlassBackdrop` from the index. Panels read it through context, and a single `GlassPanel` can override it.",
    "The panel shape (`radius`: 32px, 24px, a circle, a pill) is chosen per panel and is not a separate design.",
  ],
  variants: [
    {
      id: "glass",
      label: "Glass",
      summary: "Translucent frosted panels over three blurred colour blobs: the default.",
      bestFor: ["a modern dashboard or profile with a soft aurora background"],
      avoidIf: ["you want plain cards without a coloured backdrop"],
      traits: ["blur and hairline edges", "aurora backdrop of three colours", "default look"],
      item: "glass-panel",
      demo: "glass-panel",
      example: "Bento layout",
      props: { example: "bento" },
    },
    {
      id: "solid",
      label: "Solid",
      summary: "Every panel becomes a plain card with an ordinary shadow; nothing inside them changes.",
      bestFor: ["a conventional card layout using the same bento grid"],
      avoidIf: ["you want the frosted effect"],
      traits: ["plain cards", "ordinary shadow"],
      item: "glass-panel",
      demo: "glass-panel",
      example: "Solid",
      props: { example: "bento", variant: "solid" },
      setProps: { variant: "solid" },
    },
    {
      id: "liquid-glass",
      label: "Liquid glass",
      summary: "Realistic fluid refraction with support for a background image and pure white glass panels.",
      bestFor: ["a showpiece layout over a rich background image"],
      avoidIf: ["you want a restrained look or no image behind"],
      traits: ["fluid refraction", "background image support", "white glass panels"],
      item: "glass-panel",
      demo: "glass-panel",
      example: "Liquid glass",
      props: { example: "bento", variant: "liquid-glass" },
      setProps: { variant: "liquid-glass" },
    },
  ],
};
