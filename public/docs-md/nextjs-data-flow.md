---
title: "Shadcn Data Flow"
description: "Shadcn Data Flow. A section showing data sources feeding one central node that fans out to results."
url: https://avaraui.com/docs/nextjs/data-flow
---

# Shadcn Data Flow

A section that shows where the data comes from and what comes out: source cards on the left feed one node in the middle, which fans out to result cards on the right. The connectors are real curves measured from the cards, so they hold at any width. When the section scrolls into view they draw themselves in, and a dash keeps moving along every line.

`DataFlow` is built on [Flowchart](https://avaraui.com/docs/nextjs/flowchart) and [Apple Select](https://avaraui.com/docs/nextjs/apple-select), which install alongside. Every card is a named part — `Source`, `Core`, `Output` — so the content is entirely yours. The example fills its output cards with [Half Stars](https://avaraui.com/docs/nextjs/half-stars) and [Button](https://avaraui.com/docs/nextjs/button), which you add as you need them.

## Sources, core, outputs

Three columns on desktop with curves drawn between them; below that the columns stack. Reload the preview to watch the reveal again.

- `Source` is a group of platforms: a `title`, a `count` pill and `items` of `{ label, icon }` shown as chips.
- `Core` is the node in the middle. Every source line ends here and every output line starts here.
- `Output` is a result card: a `title`, a `badge` pill and whatever you put inside, built from `DataFlow.Row`, `DataFlow.Tag` and `DataFlow.Pill`.
- List phrases from the intro in `highlights` and they are selected iOS-style, each phrase matched once, in order.

```tsx
"use client";

import { ArrowUpRight, Download } from "lucide-react";
import Button from "@/components/custom/blocks/Button";
import { DataFlow } from "@/components/custom/blocks/DataFlowBlock";
import { HalfStars } from "@/components/custom/blocks/HalfStarsBlock";
import { AppStoreIcon, CapterraIcon, G2Icon, GooglePlayIcon, RedditIcon, UpworkIcon } from "@/components/custom/blocks/Icons";

const APP_STORES = [
  { label: "App Store", icon: <AppStoreIcon fill="currentColor" /> },
  { label: "Google Play", icon: <GooglePlayIcon size={18} fill="currentColor" /> },
];
const REVIEW_SITES = [
  { label: "G2", icon: <G2Icon /> },
  { label: "Capterra", icon: <CapterraIcon /> },
  { label: "Reddit", icon: <RedditIcon /> },
  { label: "Upwork", icon: <UpworkIcon /> },
];

export default function Intelligence() {
  return (
    <DataFlow
      eyebrow="Connected insight"
      heading="Turning Signals into Ideas"
      intro="We monitor 10 sources, comb through a mountain of complaints, reviews and revenue data, and surface startup ideas people already want."
      highlights={["10 sources", "a mountain of complaints", "startup ideas people already want"]}
    >
      <DataFlow.Source title="App marketplaces" count="2 sources" items={APP_STORES} />
      <DataFlow.Source title="Review sites" count="4 sources" items={REVIEW_SITES} />

      <DataFlow.Core title="Signal Engine" subtitle="Machine-learning pipeline" />

      <DataFlow.Output title="Market Research Briefs" badge="3,432 niches">
        <div className="flex flex-wrap gap-1.5">
          <DataFlow.Tag>Stage: Emerging</DataFlow.Tag>
          <DataFlow.Tag>Saturation: High</DataFlow.Tag>
        </div>
        <Button variant="default" size="sm" iconLeft={<Download size={11} />} className="h-7 rounded-md px-2.5 text-[10.5px]">
          Download CSV
        </Button>
      </DataFlow.Output>

      <DataFlow.Output title="Top User Frustrations" badge="200K+ logged">
        <DataFlow.Row>
          HR software won’t connect cleanly
          <DataFlow.Pill>Need: 8.0</DataFlow.Pill>
        </DataFlow.Row>
      </DataFlow.Output>

      <DataFlow.Output title="Raw Customer Reviews" badge="1M+ read">
        <DataFlow.Row className="flex-col items-stretch gap-1.5">
          <span className="flex items-center justify-between">
            <HalfStars rating={2} size={10} showText={false} activeColor="text-primary" />
            <a href="/reviews/1" className="inline-flex items-center gap-0.5 text-[10px]">
              Open on G2 <ArrowUpRight size={10} />
            </a>
          </span>
          <span className="italic">“Still can’t sync with my calendar, so I’m stuck juggling two apps…”</span>
        </DataFlow.Row>
      </DataFlow.Output>
    </DataFlow>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/data-flow.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/data-flow
```

## How the lines are drawn

The section measures its cards after layout and lays a cubic curve from each source's right edge to the core's left edge, and from the core's right edge to each output's left edge. A `ResizeObserver` re-measures whenever the board changes size, so the lines follow the layout instead of being drawn for one width. Below `lg` the columns stack and the curves would have to cross the cards, so they are hidden and short dashed spines mark the flow instead.

Each curve is a `FlowConnection` from [Flowchart](https://avaraui.com/docs/nextjs/flowchart), in the fluid layout this section added to it: `dashed` gives the resting line its pattern, `flowDash` sets the moving dash, `glow={false}` keeps it flat, and the draw-in on mount is the same one the fixed canvas uses. The moving dash follows the theme's primary colour; pass `accent` to pin it.

```tsx
<DataFlow accent="#f26522" heading="Turning Signals into Ideas">
  …
</DataFlow>
```

## Features

Flowchart draws the connectors and Apple Select picks out the intro's phrases; both install with this item. The example's output cards use Half Stars and Button — add whichever pieces your own cards need.

A single timeline plays when the section first appears: sources, lines, core, lines, outputs. After that the only motion is the dash travelling along each line — and it holds still under prefers-reduced-motion.

Curves are measured from the cards, not drawn for one width. Resize the window, add a fourth source, make an output taller — the connectors move with them.

Any number of sources and outputs, in any order; output cards take whatever you put inside. Cards render opaque on the server and only animate once the page is live.

## Props Reference

### DataFlow

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `heading` | `ReactNode` | — | The headline. |
| `eyebrow` | `ReactNode` | — | Small tracked line above the headline. |
| `intro` | `string` | — | Paragraph under the headline, rendered by `AppleSelect`. |
| `highlights` | `string[]` | `[]` | Phrases from `intro` to select, each matched once in order of appearance. |
| `accent` | `string` | theme primary | Colour of the moving dash and of any `bg-primary` inside the cards. |
| `reveal` | `"in-view" \| "immediate"` | `"in-view"` | When the sequence plays. |
| `children` | `ReactNode` | — | Any number of `Source` and `Output` parts and one `Core`, in any order. |

### DataFlow.Source

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | — | Group name, set small in caps. |
| `count` | `string` | — | Pill in the corner, e.g. `"4 sources"`. |
| `items` | `&#123; label: string; icon?: ReactNode &#125;[]` | — | The platforms, as chips. |

### DataFlow.Core

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | — | The node's name. |
| `subtitle` | `string` | — | Small caps line under it. |

### DataFlow.Output

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | — | Card heading. |
| `badge` | `string` | — | Pill in the corner, e.g. `"200K+ logged"`. |
| `children` | `ReactNode` | — | The card body, stacked with a small gap. |

### DataFlow.Pill, DataFlow.Tag, DataFlow.Row

Plain styled elements that take `className` and children: a solid black pill, a hairline chip, and a quiet grey row with its contents spaced apart. Use them inside `Output` so the cards share one vocabulary.

---

Live previews and every example: https://avaraui.com/docs/nextjs/data-flow
