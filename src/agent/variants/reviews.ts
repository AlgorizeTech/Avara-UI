import type { PageVariants } from "./types";

/**
 * Reviews: 4 looks of one registry item (`reviews`), chosen with the `variant`
 * prop. Claims come from src/app/docs/[framework]/reviews/page.mdx.
 */
export const reviews: PageVariants = {
  slug: "reviews",
  intro:
    "A testimonials section. Four designs: an envelope that opens to a letter, rolling stacked cards, a logo-tab carousel with a quote card, and a wall of vertical marquee columns.",
  gotchas: [
    "All four are looks of the one `reviews` item: install it once and set `variant` from the index.",
  ],
  variants: [
    {
      id: "testimonial-loom",
      group: "Cards and envelopes",
      label: "Testimonial loom (envelope carousel)",
      summary: "A 3D envelope opens, a ruled testimonial letter slides out and settles on the front with a postmark.",
      bestFor: ["a few strong, personal testimonials that deserve a moment each"],
      avoidIf: ["you have many short reviews to show at once"],
      traits: ["3D envelope flap", "letter card", "rubber postmark", "carousel"],
      item: "reviews",
      demo: "reviews",
      example: "Testimonial Loom Pro (Envelope Carousel)",
      props: { variant: "testimonial-loom" },
      setProps: { variant: "testimonial-loom" },
    },
    {
      id: "stacked-carousel",
      group: "Cards and envelopes",
      label: "3D stacked cards carousel",
      summary: "Three stacked portrait cards that roll into place with arrow navigation.",
      bestFor: ["testimonials that come with a portrait of the person"],
      avoidIf: ["you have no portraits or photos of reviewers"],
      traits: ["3 stacked portrait cards", "rolling rotation", "arrow navigation"],
      item: "reviews",
      demo: "reviews",
      example: "3D Stacked Cards Carousel with Rolling Motion & Arrows",
      props: { variant: "stacked-carousel" },
      setProps: { variant: "stacked-carousel" },
    },
    {
      id: "logo-carousel",
      group: "Logos and walls",
      label: "Interactive brand logo carousel",
      summary: "Company logo tabs that switch a split testimonial quote card with the author's portrait.",
      bestFor: ["B2B proof: quotes from named companies, led by their logos"],
      avoidIf: ["your reviewers are individuals with no company logos"],
      traits: ["company logo tabs", "split quote card", "author portrait"],
      item: "reviews",
      demo: "reviews",
      example: "Interactive Brand Logo Carousel",
      props: { variant: "logo-carousel" },
      setProps: { variant: "logo-carousel" },
    },
    {
      id: "up-down-marquee",
      group: "Logos and walls",
      label: "Up-down vertical marquee",
      summary: "Four infinite vertical columns of reviews scrolling up and down, pausing on hover.",
      bestFor: ["a wall of many short reviews that shows volume"],
      avoidIf: ["you have only a few reviews", "you want visitors to read each one at their own pace"],
      traits: ["4 infinite columns", "alternating directions", "pauses on hover"],
      item: "reviews",
      demo: "reviews",
      example: "UpDown Vertical Marquee",
      props: { variant: "up-down-vertical-marquee" },
      setProps: { variant: "up-down-vertical-marquee" },
    },
  ],
};
