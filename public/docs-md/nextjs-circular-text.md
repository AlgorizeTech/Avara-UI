# Circular Text

Words set on a circle, turning slowly, with room in the middle for a mark, a play button or a link. The ring is an SVG `textPath`, so it stays crisp at any size and the words are real text — screen readers get them once, from an sr-only copy, rather than letter by letter around the ring.

The text repeats as many times as fit the circumference by default, so a short phrase fills the ring and a long one goes round once. Both Collage Hero and Fashion Hero use it as their badge.

export const usageBadge = `import { Play } from "lucide-react";

export default function VideoBadge() {
  return (

  );
}`;

export const usageStamp = `import { CircularText } from "@/components/custom/blocks/CircularTextBlock";

export default function Stamp() {
  return (
    
      tz
    
  );
}`;

export const usageLink = `import { ArrowUpRight } from "lucide-react";

export default function SeeTheWork() {
  return (

  );
}`;

## Installation

## Examples

## Props Reference

        Prop
        Type
        Default
        Description

        text
        string
        Required
        The words on the ring.

        separator
        string
        " · "
        Placed between repeats of text.

        repeat
        number
        fill
        How many times the text goes round. Unset, enough repeats to fill the circumference.

        size
        number
        128
        Outer size in pixels.

        speed
        number
        22
        Seconds per full turn; 0 holds still.

        direction
        "clockwise" | "counterclockwise"
        "clockwise"
        Which way it turns.

        fontSize, tracking
        number
        9.5, 0.18
        Ring text size (units of a 100-wide circle) and letter spacing (em).

        color
        string
        var(--primary)
        Ring text colour. "currentColor" follows the parent's text.

        radius
        number
        38
        Radius of the text path, out of 50.

        innerRing
        boolean
        false
        A hairline circle just inside the text.

        children
        ReactNode
        —
        What sits in the middle.

---

**Component Path:** `[framework]\circular-text\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
