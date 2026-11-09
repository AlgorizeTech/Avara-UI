import type { PageVariants } from "./types";

/**
 * CTA section: 4 looks of one registry item (`cta-section`), chosen with the
 * `variant` prop. The block also has `minimal` and `split` variants, but the
 * docs page has no preview for them, so they are not listed. Claims come from
 * src/app/docs/[framework]/cta-section/page.mdx.
 */
export const ctaSection: PageVariants = {
  slug: "cta-section",
  intro:
    "A closing call-to-action block. Four designs, from a promotional offer card to a mobile app showcase, a scroll-driven portal and a brand scorecard.",
  whenNot: [
    {
      use: "Pricing",
      slug: "pricing",
      reason: "when the next step is choosing a plan and the prices need to be shown",
    },
    {
      use: "Newsletter",
      slug: "newsletter",
      reason: "when the action is an email sign-up",
    },
  ],
  gotchas: [
    "All four are looks of the one `cta-section` item: install it once and set `variant` from the index. The default, if you set none, is `brand-pillars`.",
  ],
  variants: [
    {
      id: "offer-showcase",
      group: "Offers and apps",
      label: "Offer showcase",
      summary: "A central promotional offer card with an animated price count-up, flanked by moving image reels.",
      bestFor: ["a launch offer, lifetime deal or limited-time promotion"],
      avoidIf: ["you have no offer or price to promote", "you have no images for the reels"],
      traits: ["animated price count-up", "compare-at price and discount badge", "four moving image reels"],
      item: "cta-section",
      demo: "cta-section",
      example: 'Offer Showcase — variant="offer-showcase"',
      props: { variant: "offer-showcase" },
      setProps: { variant: "offer-showcase" },
    },
    {
      id: "mobile-app",
      group: "Offers and apps",
      label: "Mobile app showcase",
      summary: "An upright Android phone mockup showing your app, with a serif italic highlight in the headline and store buttons.",
      bestFor: ["driving downloads of a mobile app"],
      avoidIf: ["you do not have a mobile app"],
      traits: ["Pixel 8 phone mockup", "App Store and Google Play buttons", "serif italic headline phrase"],
      item: "cta-section",
      demo: "cta-section",
      example: 'Mobile App Showcase — variant="mobile-app"',
      props: { variant: "mobile-app" },
      setProps: { variant: "mobile-app" },
    },
    {
      id: "concentric-portal",
      group: "Interactive experiences",
      label: "Concentric portal",
      summary: "A scroll-driven circular lens that expands, ringed by slowly rotating orbital text.",
      bestFor: ["a memorable closing moment for a launch or event page"],
      avoidIf: ["you want a plain, quick-to-read call to action"],
      traits: ["scroll-scrubbed expansion", "rotating text orbits", "monospace orbit text"],
      item: "cta-section",
      demo: "cta-section",
      example: 'Concentric Portal — variant="concentric-portal"',
      props: { variant: "concentric-portal" },
      setProps: { variant: "concentric-portal" },
    },
    {
      id: "brand-pillars",
      group: "Interactive experiences",
      label: "Brand pillars",
      summary: "An interactive scorecard of brand pillars with live progress meters that recalculate as you choose.",
      bestFor: ["agencies and services that want to show what they offer before the ask"],
      avoidIf: ["you want a single headline and button"],
      traits: ["interactive pillars", "live score recalculation", "accent colour", "the default variant"],
      item: "cta-section",
      demo: "cta-section",
      example: 'Brand Pillars — variant="brand-pillars"',
      props: { variant: "brand-pillars" },
      setProps: { variant: "brand-pillars" },
    },
  ],
};
