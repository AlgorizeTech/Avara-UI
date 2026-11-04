---
title: "Tech Stack"
description: "A \"Built with\" strip of tool logos in two rows, cycling through groups such as front end, services and tooling with a blur transition. Free shadcn/ui component."
url: https://avaraui.com/docs/nextjs/tech-stack
---

# Tech Stack

The "Built with" line: a label, then the marks of the tools a product is made with, in two rows — an odd group staggers as three over four, so the smaller row sits between the marks below it. Put related tools in a group — the front end, the services, the tooling — and the strip shows one group at a time, every mark blurring out upwards and the next group blurring in, a beat after the one before it.

It is composed, not configured: a `TechStack` holds `TechStackGroup`s, and each group holds `TechStackTool`s, so your list of tools never has to take a particular shape. [Component Wall](https://avaraui.com/docs/reactjs/component-wall) takes one in its `stack` slot.

## Built with

Two groups taking turns: seven front-end tools, three over four, then four services. Wait a few seconds for the swap. Names sit beside the marks on wide screens.

- `TechStackGroup` is one batch of tools, shown on its own. Four to eight read well: an odd count puts the smaller row on top, starting half a slot in, so it sits between the marks below; an even count lines up.
- `interval=3600` is how many milliseconds each group stays. The strip turns only while it is on screen; `0` holds the first group. Under prefers-reduced-motion the swap is a cut.
- `variant="labelled"` is the default: the label on the left and each name beside its mark from `xl` up; below that the marks show alone, a touch larger.

```tsx
import { TechStack, TechStackGroup, TechStackTool } from "@/components/custom/blocks/TechStackBlock";

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

## Examples

### Compact

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

### One group

A single group holds still — a plain logo strip.

- `TechStackGroup` used once means there is nothing to turn to, so no timer runs.

```tsx
import { TechStack, TechStackGroup, TechStackTool } from "@/components/custom/blocks/TechStackBlock";

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

## Features

### Composed, not configured

Groups and tools are elements, so your data keeps whatever shape it has — map it straight into `TechStackTool`, or write the marks out by hand.

### A swap that never jumps

The leaving group is lifted out of the flow where it stood and plays its way out on top, so the new one takes its place at once. Each mark goes a beat after the last, the way a headline word blurs in.

### Idle off screen

The groups turn only while the strip is in view, so a footer strip costs nothing until someone scrolls to it. Under prefers-reduced-motion each swap is a cut.

### Your theme

The label, hairlines and names read theme tokens; pass a node as `label` to set it in your own type.

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

---

Live previews and every example: https://avaraui.com/docs/nextjs/tech-stack
