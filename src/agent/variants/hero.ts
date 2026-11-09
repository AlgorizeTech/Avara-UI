import type { PageVariants } from "./types";

/**
 * Hero: 16 variants. 8 separate registry items, then 8 looks of the shared
 * `hero` item (HeroBlock). Decided in AGENT-WORKFLOW-PLAN.md, Phase 0 item 3.
 *
 * Claims here come from src/app/docs/[framework]/hero/page.mdx and the
 * components it installs. Do not add a "best for" the component cannot deliver.
 */
export const hero: PageVariants = {
  slug: "hero",
  intro:
    "The first screen of a landing page. Sixteen designs, from photo-led travel and lookbook heroes to SaaS bentos and a healthcare portal; each is a different layout, not a restyle.",
  // A hero in the registry that is not on the hero page and not one of the 16.
  // A search for "hero" finds it, so it carries the ask-first notice too.
  relatedItems: ["homepage-hero"],
  whenNot: [
    {
      use: "CTA Section",
      slug: "cta-section",
      reason: "for a closing call to action lower down the page rather than the first screen",
    },
    {
      use: "Navbar",
      slug: "navbar",
      reason: "for the site header; every hero here assumes the navigation is separate",
    },
  ],
  gotchas: [
    "The `hero` item is one component with eight looks (bounce, typing, slider, pet-shop, doctor, facility, vortex, orbit). Install it once and pick the look with the `variant` prop.",
    "HeroBlock's `bento-cascade`, `breathe` and `solar-snapshot` values only hand off to the standalone Bento Cascade, Breathe and Solar Snapshot heroes. Install those through their own items, not through `hero`.",
    "Hero Carousel takes the height its content needs (about 44rem) and uses no viewport units. For a screen-tall hero, size it from outside, for example `className=\"lg:h-svh\"`.",
    "Fashion Hero expects a person on a flat colour. A photo that already has a coloured background should be passed with `blend: false` and a `tone` that matches its edges.",
    "Honeycomb Hero tints the whole section with each photograph's `tone`, so give every photograph a deep tone.",
  ],
  variants: [
    // --- Eight separate registry items --------------------------------------
    {
      id: "honeycomb",
      group: "Photo-led",
      label: "Honeycomb hero",
      summary:
        "Dark travel hero: a huge word on the left, a turning honeycomb of hexagonal photographs on the right.",
      bestFor: [
        "travel, outdoor and expedition brands with strong photography",
        "a hero whose colour changes with each photograph",
      ],
      avoidIf: [
        "you have fewer than a handful of good photographs",
        "you want a light, minimal first screen",
      ],
      traits: ["image-heavy", "autoplay carousel", "dark background", "arrows and keyboard", "tone-tinted background"],
      item: "honeycomb-hero",
      demo: "honeycomb-hero",
      example: "Wander the fjords",
    },
    {
      id: "carousel",
      group: "Photo-led",
      label: "Hero carousel",
      summary:
        "Full-bleed photo hero with a queue of cards and a glass panel; the front card is the slide on screen.",
      bestFor: [
        "destinations, hotels and experiences sold by place",
        "showing several offers in one hero that visitors can click through",
      ],
      avoidIf: [
        "you have no photographs",
        "you need a hero that fills the screen height without any extra styling",
      ],
      traits: ["image-heavy", "autoplay carousel", "card queue", "avatar stack", "swipe and keyboard"],
      item: "hero-carousel",
      demo: "hero-carousel",
      example: "Watch the dawn from the summit",
    },
    {
      id: "fashion",
      group: "Photo-led",
      label: "Fashion hero",
      summary:
        "Staggered columns of looks on flat colour, with a video badge, a tilt-on-hover effect and a story teaser.",
      bestFor: [
        "fashion, lookbook and store landing pages",
        "editorial brands with people photographed on a plain background",
      ],
      avoidIf: [
        "your images are not people or products on a plain background",
        "you need a text-only or product-UI hero",
      ],
      traits: ["image-heavy", "five staggered columns", "pointer tilt", "video dialog"],
      item: "fashion-hero",
      demo: "fashion-hero",
      example: "Daring designs",
    },
    {
      id: "support",
      group: "Product and text",
      label: "Support hero",
      summary:
        "Soft grey product hero: animated headline, one call to action, then a frosted bento of stats and integrations.",
      bestFor: [
        "SaaS and AI products that want to show integrations, figures and a team in the first screen",
        "products that can name a few integrations and two headline figures",
      ],
      avoidIf: [
        "you have no figures or integrations to show",
        "you want a photo-led hero",
      ],
      traits: ["bento cards", "glass panels", "counting stats", "one call to action", "light background"],
      item: "support-hero",
      demo: "support-hero",
      example: "Headline, call to action, six cards",
    },
    {
      id: "collage",
      group: "Photo-led",
      label: "Collage hero",
      summary:
        "Warm, busy hero: a turning badge, a serif headline, hashtag pills and a collage of seven photographs.",
      bestFor: [
        "schools, kindergartens, studios and workshops",
        "friendly local businesses with plenty of candid photographs",
      ],
      avoidIf: [
        "you have fewer than seven photographs",
        "the brand is serious or corporate",
      ],
      traits: ["image-heavy", "photo collage", "turning badge", "video dialog", "two theme colours"],
      item: "collage-hero",
      demo: "collage-hero",
      example: "A bright place",
    },
    {
      id: "bento-cascade",
      group: "Photo motion",
      label: "Bento cascade hero",
      summary:
        "Copy and calls to action on the left, an infinite vertical bento marquee of image cards on the right.",
      bestFor: [
        "products and travel brands that want a lot of visual motion beside the pitch",
        "heroes that show a review score and avatar stack next to the headline",
      ],
      avoidIf: [
        "you prefer little motion",
        "you have only a few images to fill the cards",
      ],
      traits: ["image-heavy", "infinite marquee", "pauses on hover", "avatar stack", "two buttons"],
      item: "bento-cascade-hero",
      demo: "hero-bento-cascade",
      example: "Bento Cascade Infinite Motion Hero",
    },
    {
      id: "breathe",
      group: "Photo motion",
      label: "Breathe hero",
      summary:
        "Serif headline over a curved arch of five cards; the centre card zooms and the others drift on scroll.",
      bestFor: [
        "calm, premium brands: wellness, interiors, hospitality",
        "a scroll-driven first impression with a small set of images",
      ],
      avoidIf: [
        "you need more than five visuals in the hero",
        "scroll-driven motion does not suit the page",
      ],
      traits: ["five image cards", "scroll-driven zoom", "serif headline", "arch layout"],
      item: "breathe-hero",
      demo: "hero-breathe",
      example: "Breathe Arch Stagger Hero",
    },
    {
      id: "solar-snapshot",
      group: "Product and text",
      label: "Solar snapshot hero",
      summary:
        "Light, playful hero: a sun orb that follows the pointer, curtain-style buttons and a click-to-capture Polaroid stack.",
      bestFor: [
        "creative, consumer and community products that want a playful, interactive first screen",
        "pages that can show a team or customers as an avatar group",
      ],
      avoidIf: [
        "most visitors are on touch devices and the pointer effect would be lost",
        "you want a static, quiet hero",
      ],
      traits: ["pointer-tracking", "interactive", "avatar group", "polaroid capture"],
      item: "solar-snapshot-hero",
      demo: "hero-solar-snapshot",
      example: "Solar Snapshot Sun-Cursor Hero",
    },

    // --- Eight looks of the shared `hero` item (HeroBlock) ------------------
    {
      id: "bounce",
      group: "Product and text",
      label: "Word bounce hero",
      summary:
        "Centred headline whose key word is swapped with a spring bounce loop; text only, no images required.",
      bestFor: [
        "SaaS and startup pages that lead with a short pitch",
        "any site with no photography yet",
      ],
      avoidIf: [
        "you want an image or product shot in the hero",
        "you want the headline to stay still",
      ],
      traits: ["text-only", "rotating words", "CSS animation", "no photographs needed", "uses the `hero` item"],
      item: "hero",
      demo: "homepage-hero",
      example: "Word bounce hero",
    },
    {
      id: "typing",
      group: "Product and text",
      label: "Typing hero",
      summary:
        "Centred headline where one word types and deletes character by character, like a typewriter.",
      bestFor: [
        "developer tools and products that list several use cases in one line",
        "text-only pages with no images",
      ],
      avoidIf: [
        "you want an image or product shot in the hero",
        "you need the headline to stay still",
      ],
      traits: ["text-only", "typewriter effect", "CSS animation", "no photographs needed", "uses the `hero` item"],
      item: "hero",
      demo: "homepage-hero-typing",
      example: "Typing hero",
    },
    {
      id: "slider",
      group: "Photo motion",
      label: "Split marquee slider hero",
      summary:
        "Two columns: copy on one side, a continuous right-to-left thumbnail slider with floating visual cards on the other.",
      bestFor: [
        "products and catalogues that want to show many thumbnails",
        "a text-and-visuals hero with continuous motion",
      ],
      avoidIf: [
        "you have no images to put in the slider",
        "you prefer little motion",
      ],
      traits: ["image-heavy", "continuous marquee", "two columns", "uses the `hero` item"],
      item: "hero",
      demo: "homepage-hero-slider",
      example: "Split marquee slider hero",
    },
    {
      id: "pet-shop",
      group: "Industry looks",
      label: "Pet shop hero",
      summary:
        "Clean, minimal e-commerce hero with a circular image showcase and feature badges.",
      bestFor: [
        "small shops and e-commerce, such as pet care",
        "friendly consumer brands with a few product or portrait images",
      ],
      avoidIf: [
        "you want a dark or technical look",
        "you have no images for the circular showcase",
      ],
      traits: ["minimal", "circular image showcase", "feature badges", "uses the `hero` item"],
      item: "hero",
      demo: "homepage-hero-glow-arc",
      example: "Pet Shop & Animal Care Hero",
    },
    {
      id: "doctor",
      group: "Industry looks",
      label: "Doctor portal hero",
      summary:
        "Clean medical hero with a specialist doctor showcase and an appointment-booking call to action.",
      bestFor: [
        "clinics, hospitals and healthcare portals",
        "services where the main action is booking an appointment",
      ],
      avoidIf: [
        "the site is not about healthcare or appointments",
        "you do not have a doctor or specialist image to show",
      ],
      traits: ["healthcare", "appointment call to action", "specialist showcase", "uses the `hero` item"],
      item: "hero",
      demo: "hero-doctor",
      example: "Doctor Portal & Healthcare Hero",
    },
    {
      id: "facility",
      group: "Industry looks",
      label: "Facility CAD grid hero",
      summary:
        "Architectural blueprint grid with a shape that morphs as the pointer moves over the left and right grid zones.",
      bestFor: [
        "architecture, engineering, construction and facilities businesses",
        "technical brands that want a drafting-table look",
      ],
      avoidIf: [
        "the brand is warm or playful",
        "most visitors are on touch devices and the hover morph would be lost",
      ],
      traits: ["blueprint grid", "pointer-reactive shape", "technical", "uses the `hero` item"],
      item: "hero",
      demo: "hero-facility",
      example: "Precision Facility & CAD Grid Hero",
    },
    {
      id: "vortex",
      group: "Industry looks",
      label: "Cyclone radar hero",
      summary:
        "High-tech radar hero: an animated rotating cyclone vortex with a HUD telemetry overlay and parcel metrics.",
      bestFor: [
        "climate-risk, weather, geospatial and data-platform products",
        "data-heavy landing pages that lead with a few headline figures",
      ],
      avoidIf: [
        "the product has no data or monitoring story",
        "you want a friendly, image-led hero",
      ],
      traits: ["animated vortex", "telemetry overlay", "metrics", "colour from the `color` prop", "uses the `hero` item"],
      item: "hero",
      demo: "hero-vortex",
      example: "Atmospheric Cyclone Radar Hero",
    },
    {
      id: "orbit",
      group: "Photo motion",
      label: "Orbit ring hero",
      summary:
        "Copy and actions on the left, a revolving 3D circular photo orbit ring on the right that pauses on hover.",
      bestFor: [
        "products, travel and portfolios with a set of photographs to show in one motion",
        "a general-purpose hero with a strong visual on the right",
      ],
      avoidIf: [
        "you have no images for the ring",
        "you want little motion",
      ],
      traits: ["image-heavy", "3D orbit", "pauses on hover", "dotted highlights", "uses the `hero` item"],
      item: "hero",
      demo: "hero-orbit",
      example: "Orbit Ring Hero",
    },
  ],
};
