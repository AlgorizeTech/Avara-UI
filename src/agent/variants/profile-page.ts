import type { PageVariants } from "./types";

/**
 * Profile page: 3 looks of one registry item (`profile-page`), chosen with the
 * `variant` prop. Claims come from
 * src/app/docs/[framework]/profile-page/page.mdx.
 */
export const profilePage: PageVariants = {
  slug: "profile-page",
  intro:
    "A person as a page: a bento of panels with a 24-hour dial showing when they work, live in their own time zone. Three treatments of the same page.",
  gotchas: [
    "All three are looks of the one `profile-page` item: install it once and set `variant` from the index (the default glass look needs no `variant`).",
  ],
  variants: [
    {
      id: "glass",
      label: "Glass profile page",
      summary: "An aurora backdrop with frosted panels in four shapes and a live 24-hour working-hours dial.",
      bestFor: ["a team member or founder page that should feel soft and atmospheric"],
      avoidIf: ["you want flat, ordinary cards with no blur"],
      traits: ["aurora backdrop", "frosted panels", "24-hour dial", "uses the `profile-page` item"],
      item: "profile-page",
      demo: "profile-page",
      example: "Profile page",
      props: { rounded: true },
    },
    {
      id: "solid",
      label: "Solid profile page",
      summary: "The same page with no glass: white cards, an ordinary shadow and a flat ground.",
      bestFor: ["a clean, conventional page where blur effects would be distracting"],
      avoidIf: ["you want the aurora and glass atmosphere"],
      traits: ["no glass", "ordinary shadow", "no aurora", "uses the `profile-page` item"],
      item: "profile-page",
      demo: "profile-page",
      example: "Solid",
      props: { rounded: true, variant: "solid" },
      setProps: { variant: "solid" },
    },
    {
      id: "liquid-glass",
      label: "Liquid glass profile page",
      summary: "Fluid SVG displacement refraction, specular highlights and a deep backdrop blur behind the bento grid.",
      bestFor: ["a showpiece profile where a rich glass effect is part of the brand"],
      avoidIf: ["you want a quiet, conventional page"],
      traits: ["liquid glass", "SVG displacement refraction", "specular highlights", "uses the `profile-page` item"],
      item: "profile-page",
      demo: "profile-page",
      example: "Liquid glass",
      props: { rounded: true, variant: "liquid-glass" },
      setProps: { variant: "liquid-glass" },
    },
  ],
};
