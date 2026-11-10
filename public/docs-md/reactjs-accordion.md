---
title: "Shadcn Accordion"
description: "A data-driven accordion built on the Radix primitive, with five list variants and an interactive Brand Logo Reveal showcase variant. Free shadcn/ui component."
url: https://avaraui.com/docs/nextjs/accordion
---

# Shadcn Accordion

A data-driven accordion built on the Radix primitive, with five list variants and an interactive **Brand Logo Reveal** showcase variant. The open panel is the only thing that gets the accent: it lifts out as a card, inverts to your primary color, grows a rail down its edge, or expands into an editorial brand showcase.

You feed it an `accordionData` array — the wrapper maps it to items, icons and content for you. Switch on `animation="stack"` and the items start piled on the first one and deal down into place when the accordion scrolls into view.

## For AI agents

**Ask before you pick.** This page has 6 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 6 options as live previews: https://avaraui.com/view/accordion

**When to use it.** A data-driven accordion with five list styles and an automated Brand Logo Reveal showcase. You pass an `accordionData` array and the open panel is the only thing that gets the accent.

**Gotchas:**

- All of them are looks of the one `accordion` item: install it once and set `variant` from the index.
- How many panels may be open is the `interaction` prop (single, multiple, mandatory, non-collapsible), not a design; in multiple mode `defaultValue` must be an array.
- `animation="stack"` deals the items down when the accordion scrolls into view and works with any list style.

### The 6 variants

1. **Default** (`default`): Closed rows stay quiet and the open one lifts out as a card.
   - Live: https://avaraui.com/view/accordion/default
   - Best for: a FAQ on a plain page background
   - Avoid if: the accordion sits inside a card or panel that is already boxed
   - Traits: open row becomes a card, quiet closed rows
   - Install: `npx shadcn@latest add @avara-ui/accordion`
   - Set these props: `{"variant":"default"}`
   - Docs: https://avaraui.com/docs/nextjs/accordion#accordion
2. **Ghost** (`ghost`): Type and hairlines only, with no boxes.
   - Live: https://avaraui.com/view/accordion/ghost
   - Best for: a long editorial FAQ
   - Avoid if: you want the open item to stand out strongly
   - Traits: hairlines, no cards
   - Install: `npx shadcn@latest add @avara-ui/accordion`
   - Set these props: `{"variant":"ghost"}`
   - Docs: https://avaraui.com/docs/nextjs/accordion#multiple-permanent-open
3. **Bordered** (`bordered`): Everything sits in one outlined panel, with a rail down the open row.
   - Live: https://avaraui.com/view/accordion/bordered
   - Best for: an accordion inside a card or a settings page
   - Avoid if: it sits on a bare page where the outline looks heavy
   - Traits: single outlined panel, rail on the open row
   - Install: `npx shadcn@latest add @avara-ui/accordion`
   - Set these props: `{"variant":"bordered"}`
   - Docs: https://avaraui.com/docs/nextjs/accordion#multiple-open
4. **Elevated** (`elevated`): Every item keeps its own card, and the open one rises on a primary ring instead of changing shape.
   - Live: https://avaraui.com/view/accordion/elevated
   - Best for: a stack of separate cards, especially with the stack entrance
   - Avoid if: you want a compact list without a card per row
   - Traits: card per item, primary ring on the open one
   - Install: `npx shadcn@latest add @avara-ui/accordion`
   - Set these props: `{"variant":"elevated"}`
   - Docs: https://avaraui.com/docs/nextjs/accordion#stack-entrance
5. **Filled** (`filled`): The open item inverts to your primary colour: the loudest of the five lists.
   - Live: https://avaraui.com/view/accordion/filled
   - Best for: a section where the open answer should be unmissable
   - Avoid if: you want a calm, document-like list
   - Traits: primary-colour open item, loudest list style
   - Install: `npx shadcn@latest add @avara-ui/accordion`
   - Set these props: `{"variant":"filled"}`
   - Docs: https://avaraui.com/docs/nextjs/accordion#always-one-open
6. **Brand logo reveal** (`brand-reveal`): An editorial horizontal brand accordion that cycles through client or partner brands on a timer.
   - Live: https://avaraui.com/view/accordion/brand-reveal
   - Best for: showing clients or partners as a feature, not answering questions
   - Avoid if: you need a FAQ or any text-heavy list
   - Traits: horizontal panels, autoplay on a timer, pauses on hover, also available as `<BrandLogoAccordion />`
   - Install: `npx shadcn@latest add @avara-ui/accordion`
   - Set these props: `{"variant":"brand-reveal"}`
   - Docs: https://avaraui.com/docs/nextjs/accordion#brand-logo-reveal

## Accordion

- Pass `accordionData` as an array of `{ value, title, icon, content }` — `content` is an array of paragraphs and `icon` a key of the block's `ICON_MAP`.
- `type="single"` keeps one panel open at a time.
- `collapsible` lets the open panel be closed again, leaving all of them shut.
- `defaultValue="getting-started"` matches an item's `value` to decide which panel starts open.
- Add `animation="stack"` to start the items piled on the first one and deal them into place when the accordion scrolls into view. Reload the preview to watch it again.

```tsx
import { Accordion, type AccordionDataItem } from "@/components/custom/blocks/Accordion";

const faqItems: AccordionDataItem[] = [
  {
    value: "getting-started",
    title: "How do I get started?",
    icon: "HelpCircle", // any key of the block's ICON_MAP
    content: [
      "Getting started is easy! Simply sign up for an account.",
      "We'll guide you through setting up your profile.",
    ],
  },
  {
    value: "pricing",
    title: "What are your pricing plans?",
    icon: "CreditCard",
    content: ["We offer flexible pricing plans.", "Basic plan starts at $9/month."],
  },
  {
    value: "security",
    title: "How secure is my data?",
    icon: "Shield",
    content: [
      "Security is our top priority.",
      "Your information is stored in secure data centers.",
    ],
  },
];

export default function Faq() {
  // animation="stack" piles the items on the first one and deals them out
  // once the accordion scrolls into view. Leave it off for plain rendering.
  return (
    <Accordion
      accordionData={faqItems}
      type="single"
      collapsible
      animation="stack"
      defaultValue="getting-started"
    />
  );
}
```

## Brand logo reveal

Accordion brand logo showcase with animated horizontal pleats, autoplay progress indicator, hover pause, and responsive stacking. Inspired by Framer Brand Logo Reveal.

- Pass `variant="brand-reveal"` to display an editorial horizontal brand accordion, or use `<BrandLogoAccordion />` directly.
- `autoplay=true` cycles through client/partner brands on an automated timer.
- `autoplayInterval=4000` duration in milliseconds before revealing the next brand.
- `pauseOnHover=true` pauses autoplay when the cursor hovers over any panel.

```tsx
import { BrandLogoAccordion, type BrandItem } from "@/components/custom/blocks/Accordion";

// Alternatively use <Accordion variant="brand-reveal" />
export default function BrandRevealShowcase() {
  return (
    <BrandLogoAccordion
      autoplay
      autoplayInterval={4000}
      pauseOnHover
    />
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/accordion.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/accordion
```

## Examples

### Multiple open

- Set `type="multiple"` to let any number of panels stay open at once.
- `defaultValue` becomes an **array** in this mode — passing a bare string silently opens nothing.

```tsx
import { Accordion, type AccordionDataItem } from "@/components/custom/blocks/Accordion";

const faqItems: AccordionDataItem[] = [
  {
    value: "getting-started",
    title: "How do I get started?",
    icon: "HelpCircle", // any key of the block's ICON_MAP
    content: [
      "Getting started is easy! Simply sign up for an account.",
      "We'll guide you through setting up your profile.",
    ],
  },
  {
    value: "pricing",
    title: "What are your pricing plans?",
    icon: "CreditCard",
    content: ["We offer flexible pricing plans.", "Basic plan starts at $9/month."],
  },
  {
    value: "security",
    title: "How secure is my data?",
    icon: "Shield",
    content: [
      "Security is our top priority.",
      "Your information is stored in secure data centers.",
    ],
  },
];

export default function MultiOpenFaq() {
  // type="multiple" lets any number of panels stay open at once.
  // defaultValue becomes an array in this mode.
  return (
    <Accordion
      accordionData={faqItems}
      type="multiple"
      variant="bordered"
      defaultValue={["getting-started"]}
    />
  );
}
```

### Always one open

- Set `collapsible={false}` to stop the user closing the last open panel, so exactly one is always showing. Pair it with a `defaultValue` or the accordion starts fully closed.

```tsx
import { Accordion, type AccordionDataItem } from "@/components/custom/blocks/Accordion";

const faqItems: AccordionDataItem[] = [
  {
    value: "getting-started",
    title: "How do I get started?",
    icon: "HelpCircle", // any key of the block's ICON_MAP
    content: [
      "Getting started is easy! Simply sign up for an account.",
      "We'll guide you through setting up your profile.",
    ],
  },
  {
    value: "pricing",
    title: "What are your pricing plans?",
    icon: "CreditCard",
    content: ["We offer flexible pricing plans.", "Basic plan starts at $9/month."],
  },
  {
    value: "security",
    title: "How secure is my data?",
    icon: "Shield",
    content: [
      "Security is our top priority.",
      "Your information is stored in secure data centers.",
    ],
  },
];

export default function AlwaysOpenFaq() {
  // collapsible={false} stops the user closing the last open panel,
  // so exactly one is always showing.
  return (
    <Accordion
      accordionData={faqItems}
      type="single"
      collapsible={false}
      variant="filled"
      defaultValue="getting-started"
    />
  );
}
```

### Multiple permanent open

- Set `type="multiple"` and `collapsible={false}` to allow opening multiple panels, but preventing opened panels from being closed.

```tsx
import { Accordion, type AccordionDataItem } from "@/components/custom/blocks/Accordion";

const faqItems: AccordionDataItem[] = [
  {
    value: "getting-started",
    title: "How do I get started?",
    icon: "HelpCircle", // any key of the block's ICON_MAP
    content: [
      "Getting started is easy! Simply sign up for an account.",
      "We'll guide you through setting up your profile.",
    ],
  },
  {
    value: "pricing",
    title: "What are your pricing plans?",
    icon: "CreditCard",
    content: ["We offer flexible pricing plans.", "Basic plan starts at $9/month."],
  },
  {
    value: "security",
    title: "How secure is my data?",
    icon: "Shield",
    content: [
      "Security is our top priority.",
      "Your information is stored in secure data centers.",
    ],
  },
];

export default function PermanentMultiOpenFaq() {
  // type="multiple" and collapsible={false} allows opening multiple panels,
  // but once opened, a panel cannot be closed by clicking it again.
  return (
    <Accordion
      accordionData={faqItems}
      type="multiple"
      collapsible={false}
      variant="ghost"
      defaultValue={["getting-started"]}
    />
  );
}
```

### Stack entrance

The deal-out entrance on the `elevated` variant. It works with all five.

- Set `animation="stack"` to pile the items on the first one and deal them down with a stagger. It runs once, when the accordion first scrolls into view, and is skipped when the visitor prefers reduced motion.
- `variant="elevated"` keeps every item on its own card, so the open one rises on a primary ring instead of changing shape.

```tsx
import { Accordion, type AccordionDataItem } from "@/components/custom/blocks/Accordion";

const faqItems: AccordionDataItem[] = [
  {
    value: "getting-started",
    title: "How do I get started?",
    icon: "HelpCircle", // any key of the block's ICON_MAP
    content: [
      "Getting started is easy! Simply sign up for an account.",
      "We'll guide you through setting up your profile.",
    ],
  },
  {
    value: "pricing",
    title: "What are your pricing plans?",
    icon: "CreditCard",
    content: ["We offer flexible pricing plans.", "Basic plan starts at $9/month."],
  },
  {
    value: "security",
    title: "How secure is my data?",
    icon: "Shield",
    content: [
      "Security is our top priority.",
      "Your information is stored in secure data centers.",
    ],
  },
];

export default function StackedFaq() {
  // The entrance works with every variant. It waits for the accordion to
  // scroll into view, and is skipped for visitors who prefer reduced motion.
  return (
    <Accordion
      accordionData={faqItems}
      type="single"
      collapsible
      variant="elevated"
      animation="stack"
      defaultValue="getting-started"
    />
  );
}
```

### All variants

Same data, five looks. Pick by how much the accordion should stand out from what surrounds it.

- `variant="default"` keeps closed rows quiet and lifts the open one out as a card. Best on a plain page background.
- `variant="bordered"` wraps everything in one outlined panel with a rail on the open row. Best inside cards and settings pages.
- `variant="filled"` inverts the open item to your primary color. Loudest of the five.
- `variant="ghost"` is type and hairlines only. Best for long editorial FAQs.

```tsx
import { Accordion, type AccordionDataItem } from "@/components/custom/blocks/Accordion";

const faqItems: AccordionDataItem[] = [
  {
    value: "getting-started",
    title: "How do I get started?",
    icon: "HelpCircle", // any key of the block's ICON_MAP
    content: [
      "Getting started is easy! Simply sign up for an account.",
      "We'll guide you through setting up your profile.",
    ],
  },
  {
    value: "pricing",
    title: "What are your pricing plans?",
    icon: "CreditCard",
    content: ["We offer flexible pricing plans.", "Basic plan starts at $9/month."],
  },
  {
    value: "security",
    title: "How secure is my data?",
    icon: "Shield",
    content: [
      "Security is our top priority.",
      "Your information is stored in secure data centers.",
    ],
  },
];

const variants = ["default", "bordered", "filled", "elevated", "ghost"] as const;

export default function AccordionVariants() {
  return (
    <div className="flex flex-col gap-10">
      {variants.map((variant) => (
        <Accordion
          key={variant}
          variant={variant}
          accordionData={faqItems}
          type="single"
          collapsible
          defaultValue="pricing"
        />
      ))}
    </div>
  );
}
```

## Features
Single or multiple open panels, a one-time stack entrance, and five variants that all read your theme tokens.

### Follows your theme

Every variant is built from the shadcn tokens, so changing `--primary` restyles the open panel, the rail and the icon tile together.

### Accessible

Radix handles roles, arrow-key navigation and focus. The visible focus ring follows the shape of each variant, and the entrance respects reduced motion.

### Responsive

Rows wrap cleanly at phone width; the open card in the default variant only grows wider than the list from `sm` up.

### No animation library

The stack entrance uses the Web Animations API and runs once. The only dependency beyond Radix is `lucide-react`.

## Best Practices & Guidelines

### Usage Guidelines

Use `animation="stack"` once per page, on the accordion you want people to notice; two decks dealing at the same time cancel each other out. Give it at least three items so the pile reads as a deck, and keep `defaultValue` set so the open card is part of the deal.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `accordionData` | `AccordionDataItem[]` | `[]` | Array of objects defining `value`, `title`, `icon`, and `content`. |
| `variant` | `"default" \| "bordered" \| "filled" \| "elevated" \| "ghost" \| "brand-reveal"` | `"default"` | Which look to use. `default` lifts the open row out as a card, `bordered` grows a rail on it, `filled` inverts it to `primary`, `elevated` raises it on a ring, `ghost` is type and hairlines only, and `brand-reveal` renders an interactive horizontal brand showcase. |
| `brands` | `BrandItem[]` | `DEFAULT_BRANDS` | Used when `variant="brand-reveal"`. Array of objects defining `id`, `name`, `caption`, and optional `logo`, `link`, and `index`. |
| `animation` | `"none" \| "stack"` | `"none"` | `"stack"` piles the items on the first one and deals them into place once the accordion scrolls into view. Runs once; skipped under `prefers-reduced-motion`. |
| `type` | `"single" \| "multiple"` | `"single"` | Determines if one or multiple panels can be open simultaneously. |
| `collapsible` | `boolean` | `true` | If `type="single"`, allows closing the currently open panel. |
| `defaultValue` | `string \| string[]` | `null` | The `value` of the item(s) open by default. |
| `expandIcon` | `ReactNode \| string` | `null` | Overrides the default chevron icon. Pass a lucide string like `"Plus"`. |
| `className` | `string` | `""` | Custom classes applied to the root container. |
| `itemClassName` | `string` | `""` | Custom classes applied to individual accordion items. |
| `triggerClassName` | `string` | `""` | Custom classes applied to the clickable trigger row. |
| `contentClassName` | `string` | `""` | Custom classes applied to the expanded content area. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/accordion
