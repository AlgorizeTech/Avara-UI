import type { PageVariants } from "./types";

/**
 * Item: 2 layouts of one registry item (`item`), chosen with the `variant`
 * prop. Claims come from src/app/docs/[framework]/item/page.mdx.
 */
export const item: PageVariants = {
  slug: "item",
  intro: "A layout component for structured content with a media slot, a title, a description and actions, for notification rows, settings items, user listings and small feature cards.",
  gotchas: [
    "Both are looks of the one `item` item: install it once and set `variant` from the index.",
    "Whether the media, description and actions appear is controlled by props (`showMedia`, `showDescription`, `showActions`), not by choosing a different design.",
  ],
  variants: [
    {
      id: "default",
      label: "Row",
      summary: "A row: the media on the leading edge, then the title and description, with actions at the side.",
      bestFor: ["lists such as notifications, settings and user listings"],
      avoidIf: ["you want a stacked tile with the actions at the bottom"],
      traits: ["horizontal row", "default look"],
      item: "item",
      demo: "item",
      example: "Item",
      props: { variant: "default", showMedia: true, showDescription: true, showActions: false },
      setProps: { variant: "default" },
    },
    {
      id: "card",
      label: "Card",
      summary: "The slots stack vertically and the actions are pinned to the bottom instead of the side.",
      bestFor: ["a small feature card or tile"],
      avoidIf: ["you want a compact list row"],
      traits: ["stacked slots", "actions at the bottom"],
      item: "item",
      demo: "item",
      example: "Card",
      props: { variant: "card", showMedia: true, showDescription: true, showActions: true },
      setProps: { variant: "card" },
    },
  ],
};
