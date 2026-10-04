export const metadata = docsPageMetadata("tech-stack");

# Tech Stack

The "Built with" line: a label, then the marks of the tools a product is made with, in two rows — an odd group staggers as three over four, so the smaller row sits between the marks below it. Put related tools in a group — the front end, the services, the tooling — and the strip shows one group at a time, every mark blurring out upwards and the next group blurring in, a beat after the one before it.

It is composed, not configured: a `TechStack` holds `TechStackGroup`s, and each group holds `TechStackTool`s, so your list of tools never has to take a particular shape. Component Wall takes one in its `stack` slot.

export const usageDefault = `import { TechStack, TechStackGroup, TechStackTool } from "@/components/custom/blocks/TechStackBlock";

export default function BuiltWith() {
  return (

        } />
        } />
        } />
        } />
        } />
        } />
        } />

        } />
        } />
        } />
        } />

  );
}`;

export const usageCompact = `import { TechStack, TechStackGroup, TechStackTool } from "@/components/custom/blocks/TechStackBlock";

// Any node works as the icon — an  too. Map your own data straight in.
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
    
      {TOOLS.map((group, i) => (
        
          {group.map((tool) => (
            } />
          ))}
        
      ))}
    
  );
}`;

export const usageSingle = `import { TechStack, TechStackGroup, TechStackTool } from "@/components/custom/blocks/TechStackBlock";

export default function BuiltWith() {
  return (

        } />
        } />
        } />
        } />
        } />
        } />
        } />

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/tech-stack
```

## Examples

` is sized like an SVG, so map your own data straight into `TechStackTool` — no reshaping.",
        },
      ],
      props: { example: "default", variant: "compact" },
      usage: usageCompact,
      minHeight: 260,
    },
    {
      title: "One group",
      subheading: "A single group holds still — a plain logo strip.",
      propNotes: [
        {
          prop: "TechStackGroup",
          effect: "used once means there is nothing to turn to, so no timer runs.",
        },
      ],
      props: { example: "single", variant: "labelled" },
      usage: usageSingle,
      minHeight: 240,
    },
  ]}
/>

## Features

    Composed, not configured
    Groups and tools are elements, so your data keeps whatever shape it has — map it straight into TechStackTool, or write the marks out by hand.

    A swap that never jumps
    The leaving group is lifted out of the flow where it stood and plays its way out on top, so the new one takes its place at once. Each mark goes a beat after the last, the way a headline word blurs in.

    Idle off screen
    The groups turn only while the strip is in view, so a footer strip costs nothing until someone scrolls to it. Under prefers-reduced-motion each swap is a cut.

    Your theme
    The label, hairlines and names read theme tokens; pass a node as label to set it in your own type.

## Props Reference

### TechStack

        Prop
        Type
        Default
        Description

        children
        TechStackGroup elements
        Required
        The groups, shown one at a time in order.

        label
        ReactNode
        —
        The line over the marks.

        interval
        number
        3600
        Milliseconds each group stays, while on screen; 0 holds the first.

        variant
        "labelled" | "compact"
        "labelled"
        Label on the left and names beside the marks from xl up, or the label between hairlines and marks only.

### TechStackGroup

A ``; takes `TechStackTool` children and any list attribute.

### TechStackTool

        Prop
        Type
        Default
        Description

        name
        string
        Required
        Shown beside the mark (labelled) or as its tooltip (compact); always read to screen readers.

        icon
        ReactNode
        Required
        The mark — an inline SVG or an &lt;img&gt;, sized for you.

---

**Component Path:** `[framework]\tech-stack\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
