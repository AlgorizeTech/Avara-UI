import type { PageVariants } from "./types";

/**
 * Component wall: 2 layouts of one registry item (`component-wall`), chosen
 * with the `layout` prop (the edge-to-edge wall with no copy moved to its own
 * page, `portfolio-showcase`, on 2026-11-09). The page has 4 examples; "Centred with persistent
 * background" and "Clean mobile view" are the centre layout with other props,
 * so they are not listed. Claims come from
 * src/app/docs/[framework]/component-wall/page.mdx.
 */
export const componentWall: PageVariants = {
  slug: "component-wall",
  intro:
    "A landing hero for a library or product: a wall of screenshot cards that a camera glides across, with an install command that follows the card it lands on. Two layouts.",
  whenNot: [
    {
      use: "Portfolio Showcase",
      slug: "portfolio-showcase",
      reason: "for an edge-to-edge draggable wall with no copy over it, where the wall itself is the content",
    },
  ],
  gotchas: [
    "Both are layouts of the one `component-wall` item: install it once and set `layout` from the index.",
    "Showing or hiding the wall on phones is a prop (`showMobileWall`), not a separate design.",
  ],
  variants: [
    {
      id: "center",
      label: "Centred copy between two walls",
      summary: "The copy sits in the middle with a wall of cards on each side; two cameras take turns gliding to a card.",
      bestFor: ["a library or product launch hero that wants the copy centred and the product shown on both sides"],
      avoidIf: ["you want the copy on one side only"],
      traits: ["two walls", "auto-sliding cameras", "install line follows the card", "uses the `component-wall` item"],
      item: "component-wall",
      demo: "component-wall",
      example: "Build interactive interfaces",
      props: { layout: "center", interval: true, intervalTime: 5500, draggable: false, highlightFocus: true },
      setProps: { layout: "center" },
    },
    {
      id: "split",
      label: "Copy beside one wall",
      summary: "The copy on the left and a single wall filling the right, fading in under the copy.",
      bestFor: ["a conventional two-column hero with the wall as the visual"],
      avoidIf: ["you want the copy centred"],
      traits: ["one wall", "one camera", "wall becomes a band under the copy on small screens", "uses the `component-wall` item"],
      item: "component-wall",
      demo: "component-wall",
      example: "Copy beside the wall",
      props: { layout: "split", interval: true, intervalTime: 5500, draggable: false, highlightFocus: true },
      setProps: { layout: "split" },
    },
  ],
};
