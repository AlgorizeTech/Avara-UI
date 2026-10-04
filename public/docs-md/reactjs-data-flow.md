export const metadata = docsPageMetadata("data-flow");

# Data Flow

A section that shows where the data comes from and what comes out: source cards on the left feed one node in the middle, which fans out to result cards on the right. The connectors are real curves measured from the cards, so they hold at any width; when the section first scrolls into view the sources arrive, the lines draw themselves to the core, the core lands, the lines draw on and the results arrive — then a dash keeps moving along every line.

`DataFlow` is built on Flowchart and Apple Select: the connectors are `FlowCanvas` and `FlowConnection` inside a fluid `Flowchart`, and the key phrases of the intro are selected iOS-style by `AppleSelect`; both install alongside. Every card is a named part — `Source`, `Core`, `Output` — with `Pill`, `Tag` and `Row` for the bits inside, so the content is entirely yours; the example below fills its output cards with Half Stars and Button, which you add as you need them.

export const usageSection = `const APP_STORES = [
  { label: "App Store", icon:  },
  { label: "Google Play", icon:  },
];
const REVIEW_SITES = [
  { label: "G2", icon:  },
  { label: "Capterra", icon:  },
  { label: "Reddit", icon:  },
  { label: "Upwork", icon:  },
];

export default function Intelligence() {
  return (

          Stage: Emerging
          Saturation: High
        
        } className="h-7 rounded-md px-2.5 text-[10.5px]">
          Download CSV

          HR software won’t connect cleanly
          Need: 8.0

              Open on G2 

          “Still can’t sync with my calendar, so I’m stuck juggling two apps…”

  );
}
`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/data-flow
```

## How the lines are drawn

The section measures its cards after layout and lays a cubic curve from each source's right edge to the core's left edge, and from the core's right edge to each output's left edge. A `ResizeObserver` re-measures whenever the board changes size, so the lines follow the layout instead of being drawn for one width. Below `lg` the columns stack and the curves would have to cross the cards, so they are hidden and short dashed spines mark the flow instead.

Each curve is a `FlowConnection` from Flowchart, in the fluid layout this section added to it: `dashed` gives the resting line its pattern, `flowDash` sets the moving dash, `glow={false}` keeps it flat, and the draw-in on mount is the same one the fixed canvas uses. The moving dash follows the theme's primary colour; pass `accent` to pin it.

```tsx

  …

```

## Features

    Built from the library
    Flowchart draws the connectors and Apple Select picks out the intro's phrases; both install with this item. The example's output cards use Half Stars and Button — add whichever pieces your own cards need.

    One reveal, then a pulse
    A single timeline plays when the section first appears: sources, lines, core, lines, outputs. After that the only motion is the dash travelling along each line — and it holds still under prefers-reduced-motion.

    Lines that follow the layout
    Curves are measured from the cards, not drawn for one width. Resize the window, add a fourth source, make an output taller — the connectors move with them.

    Compound, not configured
    Any number of sources and outputs, in any order; output cards take whatever you put inside. Cards render opaque on the server and only animate once the page is live.

## Props Reference

### DataFlow

        Prop
        Type
        Default
        Description

        heading
        ReactNode
        —
        The headline.

        eyebrow
        ReactNode
        —
        Small tracked line above the headline.

        intro
        string
        —
        Paragraph under the headline, rendered by AppleSelect.

        highlights
        string[]
        []
        Phrases from intro to select, each matched once in order of appearance.

        accent
        string
        theme primary
        Colour of the moving dash and of any bg-primary inside the cards.

        reveal
        "in-view" | "immediate"
        "in-view"
        When the sequence plays.

        children
        ReactNode
        —
        Any number of Source and Output parts and one Core, in any order.

### DataFlow.Source

        Prop
        Type
        Default
        Description

        title
        string
        —
        Group name, set small in caps.

        count
        string
        —
        Pill in the corner, e.g. "4 sources".

        items
        &#123; label: string; icon?: ReactNode &#125;[]
        —
        The platforms, as chips.

### DataFlow.Core

        Prop
        Type
        Default
        Description

        title
        string
        —
        The node's name.

        subtitle
        string
        —
        Small caps line under it.

### DataFlow.Output

        Prop
        Type
        Default
        Description

        title
        string
        —
        Card heading.

        badge
        string
        —
        Pill in the corner, e.g. "200K+ logged".

        children
        ReactNode
        —
        The card body, stacked with a small gap.

### DataFlow.Pill, DataFlow.Tag, DataFlow.Row

Plain styled elements that take className and children: a solid black pill, a hairline chip, and a quiet grey row with its contents spaced apart. Use them inside Output so the cards share one vocabulary.

---

**Component Path:** `[framework]\data-flow\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
