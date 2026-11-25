---
title: "Shadcn Tech Stack"
description: "A \"Built with\" strip of tool logos in two rows, cycling through groups such as front end, services and tooling with a blur transition. Free shadcn/ui component."
url: https://avaraui.com/docs/nextjs/tech-stack
---

# Shadcn Tech Stack

A "Built with" strip of tool logos that cycles through groups with a blur transition.

It is composed, not configured: a `TechStack` holds `TechStackGroup`s, and each group holds `TechStackTool`s, so your list of tools never has to take a particular shape. [Component Wall](https://avaraui.com/docs/reactjs/component-wall) takes one in its `stack` slot.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/tech-stack.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/tech-stack
```

## Built with

Two groups taking turns: seven front-end tools, three over four, then four services. Wait a few seconds for the swap. Names sit beside the marks on wide screens.

- `TechStackGroup` is one batch of tools, shown on its own. Four to eight read well: an odd count puts the smaller row on top, starting half a slot in, so it sits between the marks below; an even count lines up.
- `interval=3600` is how many milliseconds each group stays. The strip turns only while it is on screen; `0` holds the first group. Under prefers-reduced-motion the swap is a cut.
- `variant="labelled"` is the default: the label on the left and each name beside its mark from `xl` up; below that the marks show alone, a touch larger.

```tsx
import { TechStack, TechStackGroup, TechStackTool } from "@/components/custom/blocks/TechStackBlock";
import {
  DiscordIcon, MotionIcon, GitHubIcon, GsapIcon, LucideIcon, NextjsIcon,
  ReactIcon, SlackIcon, StripeIcon, TailwindIcon, TypeScriptIcon,
} from "@/components/custom/blocks/Icons";

export default function BuiltWith() {
  return (
    <TechStack label="Built with" className="max-w-2xl">
      <TechStackGroup>
        <TechStackTool name="React" icon={<ReactIcon />} />
        <TechStackTool name="Next.js" icon={<NextjsIcon fill="currentColor" />} />
        <TechStackTool name="TypeScript" icon={<TypeScriptIcon />} />
        <TechStackTool name="Tailwind CSS" icon={<TailwindIcon />} />
        <TechStackTool name="Motion" icon={<MotionIcon />} />
        <TechStackTool name="GSAP" icon={<GsapIcon />} />
        <TechStackTool name="Lucide" icon={<LucideIcon />} />
      </TechStackGroup>
      <TechStackGroup>
        <TechStackTool name="Stripe" icon={<StripeIcon />} />
        <TechStackTool name="GitHub" icon={<GitHubIcon />} />
        <TechStackTool name="Slack" icon={<SlackIcon />} />
        <TechStackTool name="Discord" icon={<DiscordIcon />} />
      </TechStackGroup>
    </TechStack>
  );
}
```

## Compact

Marks only, the label centred between two hairlines — for a narrow column, like the centred Component Wall.

- `variant="compact"` drops the names from view; each is the mark's tooltip and is still read to screen readers.
- `icon` is any node. An `<img>` is sized like an SVG, so map your own data straight into `TechStackTool` — no reshaping.

```tsx
import { TechStack, TechStackGroup, TechStackTool } from "@/components/custom/blocks/TechStackBlock";

// Any node works as the icon — an <img> too. Map your own data straight in.
const TOOLS = [
  [
    { name: "React", logo: "/logos/react.svg" },
    { name: "Next.js", logo: "/logos/nextjs.svg" },
    { name: "TypeScript", logo: "/logos/typescript.svg" },
  ],
  [
    { name: "Stripe", logo: "/logos/stripe.svg" },
    { name: "Postgres", logo: "/logos/postgres.svg" },
  ],
];

export default function BuiltWith() {
  return (
    <TechStack label="Built with" variant="compact" className="max-w-md">
      {TOOLS.map((group, i) => (
        <TechStackGroup key={i}>
          {group.map((tool) => (
            <TechStackTool key={tool.name} name={tool.name} icon={<img src={tool.logo} alt="" />} />
          ))}
        </TechStackGroup>
      ))}
    </TechStack>
  );
}
```

## One group

A single group holds still — a plain logo strip.

- `TechStackGroup` used once means there is nothing to turn to, so no timer runs.

```tsx
import { TechStack, TechStackGroup, TechStackTool } from "@/components/custom/blocks/TechStackBlock";
import { MotionIcon, GsapIcon, LucideIcon, NextjsIcon, ReactIcon, TailwindIcon, TypeScriptIcon } from "@/components/custom/blocks/Icons";

export default function BuiltWith() {
  return (
    <TechStack label="Built with">
      <TechStackGroup>
        <TechStackTool name="React" icon={<ReactIcon />} />
        <TechStackTool name="Next.js" icon={<NextjsIcon fill="currentColor" />} />
        <TechStackTool name="TypeScript" icon={<TypeScriptIcon />} />
        <TechStackTool name="Tailwind CSS" icon={<TailwindIcon />} />
        <TechStackTool name="Motion" icon={<MotionIcon />} />
        <TechStackTool name="GSAP" icon={<GsapIcon />} />
        <TechStackTool name="Lucide" icon={<LucideIcon />} />
      </TechStackGroup>
    </TechStack>
  );
}
```

## About Shadcn Tech Stack

**What it is.** **Shadcn Tech Stack** (`TechStack`, `TechStackGroup`, and `TechStackTool`) is a composable "Built with" logo strip that cycles between tool groups with a blur-out/blur-in stagger and supports `"labelled"` and `"compact"` layouts.

**How it is built.** Groups only rotate while visible in the viewport (and use an instant cut under `prefers-reduced-motion`). Odd tool counts stagger into two rows, and a single `TechStackGroup` stays static with no timer.

**When to use it.** Use it for landing page technology strips, footer credits, portfolio stack badges, and integration showcases.

## For AI agents

**When to use**

- Landing page technology strips, footer credits
- Portfolio stack badges, integration showcases

**When not to use**

- Overlapping people avatars: use [Avatar Stack](https://avaraui.com/docs/reactjs/avatar-stack)
- Links to social profiles: use [Social Links](https://avaraui.com/docs/reactjs/social-links)

**Agent notes**

- Compose `TechStack` with `TechStackGroup` children containing `TechStackTool` items (`name` and `icon` node).
- Use `variant="labelled"` (default) for side-by-side labels on wide screens or `variant="compact"` for marks-only tooltips in narrow columns.
- Set `interval` (default `3600`ms, or `0` to pause rotation) and omit extra groups for a static logo strip.

**Ask before you pick.** This page has 2 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 2 options as live previews: https://avaraui.com/view/tech-stack

**When to use it.** The "Built with" line: a label followed by the marks of the tools a product is made with, in two rows that take turns between groups, in two looks: labelled or compact.

**When to use something else:**

- [Component Wall](https://avaraui.com/docs/reactjs/component-wall): for a full hero that already includes a tech stack line.

**Gotchas:**

- Both are looks of the one `tech-stack` item: install it once and set `variant` from the index.
- Compose it: a `TechStack` holds `TechStackGroup`s and each holds `TechStackTool`s, so your list of tools needs no particular shape. Four to eight tools per group read well.
- With a single group nothing turns, so no timer runs.

### The 2 variants

1. **Labelled** (`labelled`): Each mark with its name shown beside it. The default.
   - Live: https://avaraui.com/view/tech-stack/labelled
   - Best for: a "Built with" line where recognising each tool by name matters
   - Avoid if: space is tight and the marks are well known
   - Traits: names visible, default look
   - Install: `npx shadcn@latest add @avara-ui/tech-stack`
   - Docs: https://avaraui.com/docs/nextjs/tech-stack#built-with
2. **Compact** (`compact`): The names are hidden from view and become each mark's tooltip, still read to screen readers.
   - Live: https://avaraui.com/view/tech-stack/compact
   - Best for: a tight strip of recognisable logos
   - Avoid if: visitors may not recognise the marks without names
   - Traits: marks only, names as tooltips
   - Install: `npx shadcn@latest add @avara-ui/tech-stack`
   - Set these props: `{"variant":"compact"}`
   - Docs: https://avaraui.com/docs/nextjs/tech-stack#compact

## Props Reference

### TechStack

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `TechStackGroup` elements | Required | The groups, shown one at a time in order. |
| `label` | `ReactNode` | — | The line over the marks. |
| `interval` | `number` | `3600` | Milliseconds each group stays, while on screen; `0` holds the first. |
| `variant` | `"labelled" \| "compact"` | `"labelled"` | Label on the left and names beside the marks from `xl` up, or the label between hairlines and marks only. |

### TechStackGroup

A `<ul>`; takes `TechStackTool` children and any list attribute.

### TechStackTool

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | Required | Shown beside the mark (labelled) or as its tooltip (compact); always read to screen readers. |
| `icon` | `ReactNode` | Required | The mark — an inline SVG or an `<img>`, sized for you. |

## Works with other components

Combine `TechStack` with [Avatar Stack](https://avaraui.com/docs/reactjs/avatar-stack) for team credits, [Social Links](https://avaraui.com/docs/reactjs/social-links) for footer social bars, and [Tooltip](https://avaraui.com/docs/reactjs/tooltip) for custom icon hover details.

## How do I build a "Built with" logo strip in React?

Compose a `TechStack` that holds `TechStackGroup` elements, with a `TechStackTool` for each logo. Each tool takes a `name` and an `icon`, which can be an inline SVG or an `img`. Because it is composed rather than configured, your tool list can have any shape.

## Does TechStack animate when it is off screen?

No. Groups only rotate while the strip is visible on screen, so the interval timer does not run in the background. This keeps the cycle from wasting work for a footer or section the visitor has not scrolled to yet.

## How do I display a static logo strip with no rotation?

Set `interval` to `0` so the first group stays on screen. The default is `3600` milliseconds per group. A single group with all your tools also gives a static strip, because there is no second group to cycle to.

## What is the difference between the labelled and compact variants?

`labelled`, the default, puts the label on the left with tool names beside the marks from the `xl` breakpoint up. `compact` places the label between hairlines and shows marks only, with each `name` as a tooltip. Names are always available to screen readers.

## How do I show several groups of tools?

Add more `TechStackGroup` children, each with its own tools. The groups are shown one at a time, in order, using a blur-out and blur-in stagger. Set the `label` prop for the line above the marks, and `interval` for how long each group stays.

---

Live previews and every example: https://avaraui.com/docs/nextjs/tech-stack
