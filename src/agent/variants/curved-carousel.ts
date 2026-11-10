import type { PageVariants } from "./types";

/**
 * Curved carousel: 2 motions of one registry item (`curved-carousel`), chosen
 * with the `variant` prop. Claims come from
 * src/app/docs/[framework]/curved-carousel/page.mdx.
 */
export const curvedCarousel: PageVariants = {
  slug: "curved-carousel",
  intro: "A full-width 3D curved-arc image carousel with perspective depth cards, touch and drag controls and spring physics, in two motions: a left-to-right sway or a continuous marquee.",
  whenNot: [
    {
      use: "Gallery",
      slug: "gallery",
      reason: "for other showcase layouts such as a photo orbit, a bento grid or a video sphere",
    },
  ],
  gotchas: [
    "Both are looks of the one `curved-carousel` item: install it once and set `variant` from the index.",
  ],
  variants: [
    {
      id: "arc-sweep",
      label: "Arc sway deck",
      summary: "Cards lie along a 3D curved arc with a continuous left-to-right sway. The default.",
      bestFor: ["a calm, immersive image deck that drifts back and forth"],
      avoidIf: ["you want constant one-direction scrolling like a marquee"],
      traits: ["curved arc", "left-to-right oscillating sway", "default look"],
      item: "curved-carousel",
      demo: "curved-carousel",
      example: "3D Curved Arc Sway Deck",
      props: { variant: "arc-sweep" },
      setProps: { variant: "arc-sweep" },
    },
    {
      id: "infinite-marquee",
      label: "Concave arc marquee",
      summary: "A continuous right-to-left infinite marquee arranged on a 3D concave curved arc.",
      bestFor: ["a logo, product or photo strip that should keep moving"],
      avoidIf: ["you want the motion to turn back on itself"],
      traits: ["continuous right-to-left movement", "concave arc", "infinite loop"],
      item: "curved-carousel",
      demo: "curved-carousel",
      example: "Continuous 3D Concave Arc Marquee",
      props: { variant: "infinite-marquee" },
      setProps: { variant: "infinite-marquee" },
    },
  ],
};
