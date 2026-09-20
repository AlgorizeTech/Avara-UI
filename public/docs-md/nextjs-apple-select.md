# Apple Select

Recreates the iOS text-selection look — a translucent highlight with a lollipop handle on either end — over any string you give it.

The range is chosen by the author, not the reader: pass the full `text` and a `[start, end]` character range, and the component splits the string around it. That makes it ideal for docs, onboarding tips and marketing copy where you want to point at *part* of a sentence without a screenshot. The handles are purely decorative and are hidden from assistive tech; the text itself stays one uninterrupted string. It renders as a ``, and any other HTML attribute (`className`, `style`, `id`…) is forwarded to it.

Explore the different variations of the Apple Select component — each example shows a live preview with the exact code to copy.

export const usageDefault = `import { AppleSelect } from "@/components/custom/blocks/AppleSelectBlock";

// The author picks the highlighted range — it is fixed, not draggable.
// [43, 60] covers "ability to select" (end is exclusive, like String.slice).
export default function SelectionDemo() {
  return (
    
  );
}`;

export const usageHandles = `import { AppleSelect } from "@/components/custom/blocks/AppleSelectBlock";

export default function HighlightOnly() {
  return (
    
  );
}`;

export const usageAnimate = `import { AppleSelect } from "@/components/custom/blocks/AppleSelectBlock";

export default function AnimatedSelection() {
  return (
    
  );
}`;

export const usageMultiline = `import { AppleSelect } from "@/components/custom/blocks/AppleSelectBlock";

// A range that wraps across lines — every line fragment keeps its own
// rounded corners thanks to box-decoration-break: clone.
export default function MultilineSelection() {
  return (
    
  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/apple-select
```

## Examples

## Features
Discover the Apple Select component's capabilities for pointing at part of a sentence with a native-feeling selection.

    Author-controlled
    The range is a pair of numbers in code, so the same selection renders identically for every visitor — no screenshots, no drift.

    Accessible
    The handles are hidden from assistive tech and the highlighted span uses a semantic mark, so the sentence reads as one string.

    Inherits typography
    Handles and highlight are sized in em, so they scale with whatever font size and weight you apply through className.

    Zero dependencies
    Plain React and CSS — the optional entrance animation ships its own keyframes, so there is nothing to add to your global styles.

## Best Practices & Guidelines

    Land on word boundaries
    Compute selection from the text (for example text.indexOf("ability")) rather than hard-coding magic numbers, so an edit to the copy cannot leave the highlight cutting through a word.

    It is not a real selection
    The handles do not drag and the range does not copy. Use it to illustrate a selection, not to replace the browser's native one.

## Props Reference

### `` Props

        Prop
        Type
        Default
        Description

        text
        string
        Required
        The full sentence or paragraph to render.

        selection
        [number, number] | [number, number][]
        Required
        Character range to highlight as [start, end], or several ranges for more than one phrase — each gets its own handles. end is exclusive, like String.slice; out-of-range values are clamped, overlapping ranges merge, and an empty range renders plain text.

        color
        string
        "var(--primary)"
        Accent for the highlight tint and the handles. Accepts any CSS colour, including hex codes.

        handles
        boolean
        true
        Show the iOS-style lollipop handles on either end of the range.

        animate
        boolean
        false
        Fade the highlight in and pop the handles when the component mounts.

---

**Component Path:** `[framework]\apple-select\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
