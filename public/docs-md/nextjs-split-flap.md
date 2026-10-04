export const metadata = docsPageMetadata("split-flap");

# Split-Flap Display

An authentic, physics-driven **Split-Flap Display** component (Solari board) simulating retro-mechanical flap cards, 3D perspective flips (`rotateX`), horizontal split creases, mechanical hinge notches, and realistic synthesized click sounds.

Ships with **2 distinct handcrafted variants**: vintage ivory electro-mechanical casing (matching retro Solari displays) and minimalist architectural frosted glass.

---

## Variants

export const usageIvory = `import SplitFlap from "@/components/custom/split-flap";

export default function IvorySplitFlapDemo() {
  return (
    
  );
}`;

export const usageMinimalist = `import SplitFlap from "@/components/custom/split-flap";

export default function MinimalistSplitFlapDemo() {
  return (
    
  );
}`;

---

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/split-flap
```

---

## Props Reference

### SplitFlap

        Prop
        Type
        Default
        Description

          variant

          "ivory" | "minimalist"

          "ivory"

          Selects between 2 handcrafted visual themes: retro ivory (default) or minimalist architectural frosted glass.

          messages

          string[]

          []

          Array of text strings to cycle through with cascading flip transitions.

          text

          string

          undefined

          Direct string to display. Can also contain pipe-separated strings (e.g. "HELLO | WORLD") to cycle through automatically.

          size

          "sm" | "md" | "lg"

          "md"

          Dimension preset for the flap cards.

          columns

          number

          auto

          Total flap character slots. If omitted, automatically fits the longest message.

          autoPlay

          boolean

          true

          Whether to automatically cycle through messages at the specified interval.

          interval

          number

          3000

          Duration in milliseconds the message stays fully visible and stationary before flipping to the next message.

          sound

          boolean

          false

          Whether to play realistic mechanical split-flap click sounds via Web Audio API. Can also be toggled interactively in the toolbar.

          color

          string

          theme default

          Text accent color applied to characters and numbers. Supports preset theme names ("lavender", "indigo", "rose", "emerald"), custom hex codes, or "default" to reset to variant default.

          speed

          number

          1

          Speed multiplier for the flip cascade animation (1 = normal, 1.5 = fast).

---

**Component Path:** `[framework]\split-flap\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
