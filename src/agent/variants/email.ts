import type { PageVariants } from "./types";

/**
 * Email client (slug `email`): 4 looks of one registry item (`email`), chosen
 * with the `variant` prop. Claims come from
 * src/app/docs/[framework]/email/page.mdx.
 */
export const email: PageVariants = {
  slug: "email",
  intro: "A self-contained email client: read, star, archive, delete and compose, with search and a mobile drawer sidebar, in four looks: the default shell, a flatter minimal one, frosted glass and liquid glass.",
  gotchas: [
    "All four are looks of the one `email` item: install it once and set `variant` from the index.",
    "You hand it `initialEmails` (each with a `folder`, `isRead` and `isStarred`) and the client owns every interaction.",
  ],
  variants: [
    {
      id: "default",
      label: "Default",
      group: "Solid",
      summary: "The modern SaaS shell with an elevated look, themed with your accent colour.",
      bestFor: ["a mail view in an app or dashboard on a normal background"],
      avoidIf: ["you want a flatter, denser mailbox"],
      traits: ["elevated shell", "default look"],
      item: "email",
      demo: "email",
      example: "Email dashboard",
      props: { variant: "default" },
      setProps: { variant: "default" },
    },
    {
      id: "minimal",
      label: "Minimal",
      group: "Solid",
      summary: "Strips the elevated shell for a flatter, denser mailbox.",
      bestFor: ["a mail view that sits inside an existing panel"],
      avoidIf: ["you want it to feel like a standalone product screen"],
      traits: ["flat", "denser"],
      item: "email",
      demo: "email",
      example: "Minimal",
      props: { variant: "minimal" },
      setProps: { variant: "minimal" },
    },
    {
      id: "glass",
      label: "Glass",
      group: "Glass",
      summary: "Frosts the sidebar, the list and the overlays, the Compose modal included.",
      bestFor: ["a mail view over a colourful or photographic background"],
      avoidIf: ["the background is plain"],
      traits: ["frosted sidebar, list and overlays"],
      item: "email",
      demo: "email",
      example: "Glass",
      props: { variant: "glass" },
      setProps: { variant: "glass" },
    },
    {
      id: "liquid-glass",
      label: "Liquid glass",
      group: "Glass",
      summary: "Liquid-glass refraction using SVG displacement mapping, layered specular highlights and fluid reflections.",
      bestFor: ["a showpiece mail view over rich imagery"],
      avoidIf: ["you want a restrained look or a plain background"],
      traits: ["refraction effect", "specular highlights"],
      item: "email",
      demo: "email",
      example: "Liquid Glass",
      props: { variant: "liquid-glass" },
      setProps: { variant: "liquid-glass" },
    },
  ],
};
