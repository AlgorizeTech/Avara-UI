import type { PageVariants } from "./types";

/**
 * Draggable card list: 2 card designs of one registry item
 * (`draggable-card-list`), chosen with the `variant` prop. The page also ships
 * a Motion build (`draggable-card-list-motion`) that moves identically to the
 * GSAP one. Claims come from
 * src/app/docs/[framework]/draggable-card-list/page.mdx.
 */
export const draggableCardList: PageVariants = {
  slug: "draggable-card-list",
  intro: "A reorderable card list with spring-driven dragging, right-side grip handles and left accent bars, in two card designs.",
  gotchas: [
    "Both are looks of the one `draggable-card-list` item: install it once and set `variant` from the index.",
    "A Motion build (`draggable-card-list-motion`) is also published and behaves the same; use it only if the project already uses Motion rather than GSAP.",
  ],
  variants: [
    {
      id: "classic",
      label: "Classic card list",
      summary: "Cards with light pastel badges with borders, left accent bars and hover border colours.",
      bestFor: ["a task or checklist list where each row is a distinct card"],
      avoidIf: ["you want the cards tinted by an ambient colour"],
      traits: ["pastel badges", "left accent bar", "grip handle"],
      item: "draggable-card-list",
      demo: "draggable-card-list",
      example: "Classic Card List",
      props: { variant: "classic" },
      setProps: { variant: "classic" },
    },
    {
      id: "modern",
      label: "Modern ambient tint",
      summary: "The same draggable list with cards tinted by an ambient colour.",
      bestFor: ["a more modern, colourful look for the same kind of list"],
      avoidIf: ["you want a neutral, pastel-badge style"],
      traits: ["ambient tint", "grip handle"],
      item: "draggable-card-list",
      demo: "draggable-card-list",
      example: "Modern Ambient Tint Card List",
      props: { variant: "modern" },
      setProps: { variant: "modern" },
    },
  ],
};
