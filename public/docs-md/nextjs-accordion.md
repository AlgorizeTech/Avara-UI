---
title: "Shadcn Accordion"
description: "A data-driven accordion with nine list styles and a brand reveal showcase. Free shadcn/ui Accordion component for React, Next.js and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/accordion
---

# Shadcn Accordion

A data-driven accordion with nine list styles and a brand reveal showcase.

## For AI agents

**Ask before you pick.** This page has 7 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 7 options as live previews: https://avaraui.com/view/accordion

**When to use it.** A data-driven accordion. You pass an `accordionData` array and the open panel is the only thing that gets the accent. The examples show the inset, tray, bracket, soft, lift-card and ghost lists and an automated brand reveal showcase; `variant` also accepts `soft`, `tray`, `inset`, `bracket`, `bordered`, `filled` and `elevated`.

**Gotchas:**

- All of them are looks of the one `accordion` item: install it once and set `variant` from the index.
- How many panels may be open is the `interaction` prop (single, multiple, mandatory, non-collapsible), not a design; in multiple mode `defaultValue` must be an array.
- `animation="stack"` deals the items down when the accordion scrolls into view and works with any list style.

### The 7 variants

1. **Inset panel** (`inset`): Quiet pill rows; the open one rises as a card with the answer set in an inset well.
   - Live: https://avaraui.com/view/accordion/inset
   - Best for: a clean SaaS FAQ with longer answers
   - Avoid if: answers are a single short line
   - Traits: pill rows, answer in an inset well, CSS open and close motion
   - Install: `npx shadcn@latest add @avara-ui/accordion`
   - Set these props: `{"variant":"inset"}`
   - Docs: https://avaraui.com/docs/nextjs/accordion#inset-panel
2. **Tray** (`tray`): Rows sit in one rounded tray; the open row becomes a tile and its round chip animates from plus to minus.
   - Live: https://avaraui.com/view/accordion/tray
   - Best for: a clean product FAQ with a friendly, contained look
   - Avoid if: you want a flat, document-like list
   - Traits: one rounded tray, open row becomes a tile, animated plus-to-minus chip, CSS open and close motion
   - Install: `npx shadcn@latest add @avara-ui/accordion`
   - Set these props: `{"variant":"tray"}`
   - Docs: https://avaraui.com/docs/nextjs/accordion#tray
3. **Bracket frame** (`bracket`): Outlined rows whose corner brackets open outward and take the accent when active.
   - Live: https://avaraui.com/view/accordion/bracket
   - Best for: developer tools, dashboards and technical products
   - Avoid if: the brand is soft or playful
   - Traits: sharp outline, corner brackets, CSS open and close motion
   - Install: `npx shadcn@latest add @avara-ui/accordion`
   - Set these props: `{"variant":"bracket"}`
   - Docs: https://avaraui.com/docs/nextjs/accordion#bracket-frame
4. **Soft tiles** (`soft`): Tinted tiles; the open one fills its chip with the accent as the plus folds into a minus.
   - Live: https://avaraui.com/view/accordion/soft
   - Best for: a friendly product or support FAQ
   - Avoid if: you want a flat, document-like list
   - Traits: tinted tile per row, plus folds into minus, CSS open and close motion
   - Install: `npx shadcn@latest add @avara-ui/accordion`
   - Set these props: `{"variant":"soft"}`
   - Docs: https://avaraui.com/docs/nextjs/accordion#soft-tiles
5. **Lift card** (`default`): Closed rows stay quiet and the open one lifts out as a card.
   - Live: https://avaraui.com/view/accordion/default
   - Best for: a FAQ on a plain page background
   - Avoid if: the accordion sits inside a card or panel that is already boxed
   - Traits: open row becomes a card, quiet closed rows
   - Install: `npx shadcn@latest add @avara-ui/accordion`
   - Set these props: `{"variant":"default"}`
   - Docs: https://avaraui.com/docs/nextjs/accordion#lift-card
6. **Brand reveal** (`brand-reveal`): An editorial horizontal brand accordion that cycles through client or partner brands on a timer.
   - Live: https://avaraui.com/view/accordion/brand-reveal
   - Best for: showing clients or partners as a feature, not answering questions
   - Avoid if: you need a FAQ or any text-heavy list
   - Traits: horizontal panels, autoplay on a timer, pauses on hover, also available as `<BrandLogoAccordion />`
   - Install: `npx shadcn@latest add @avara-ui/accordion`
   - Set these props: `{"variant":"brand-reveal"}`
   - Docs: https://avaraui.com/docs/nextjs/accordion#brand-reveal
7. **Ghost** (`ghost`): Type and hairlines only, with no boxes.
   - Live: https://avaraui.com/view/accordion/ghost
   - Best for: a long editorial FAQ
   - Avoid if: you want the open item to stand out strongly
   - Traits: hairlines, no cards
   - Install: `npx shadcn@latest add @avara-ui/accordion`
   - Set these props: `{"variant":"ghost"}`
   - Docs: https://avaraui.com/docs/nextjs/accordion#multiple-open

## Inset panel

- Use `variant="inset"` to lift the open row and set its answer in an inset well.

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

export default function InsetFaq() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Accordion
        accordionData={faqItems}
        variant="inset"
        defaultValue="getting-started"
      />
    </div>
  );
}
```

## Tray

- Use `variant="tray"` for one rounded tray whose open row becomes a tile, with a plus that turns into a minus.

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

export default function TrayFaq() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Accordion
        accordionData={faqItems}
        variant="tray"
        defaultValue="getting-started"
      />
    </div>
  );
}
```

## Bracket frame

- Use `variant="bracket"` for outlined rows whose corner brackets open outward.

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

export default function BracketFaq() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Accordion
        accordionData={faqItems}
        variant="bracket"
        defaultValue="getting-started"
      />
    </div>
  );
}
```

## Soft tiles

- Use `variant="soft"` for tinted tiles whose plus folds into a minus.

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

export default function SoftFaq() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Accordion
        accordionData={faqItems}
        variant="soft"
        defaultValue="getting-started"
      />
    </div>
  );
}
```

## Lift card

- Pass `accordionData` as an array of `{ value, title, icon, content }`.

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
    <div className="mx-auto w-full max-w-2xl">
      <Accordion
        accordionData={faqItems}
        type="single"
        collapsible
        animation="stack"
        defaultValue="getting-started"
      />
    </div>
  );
}
```

## Brand reveal

- Use `variant="brand-reveal"` or `<BrandLogoAccordion />` directly.

```tsx
import { BrandLogoAccordion } from "@/components/custom/blocks/Accordion";

// Alternatively use <Accordion variant="brand-reveal" />
export default function BrandRevealShowcase() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <BrandLogoAccordion autoplay autoplayInterval={4000} pauseOnHover />
    </div>
  );
}
```

## Multiple open

- Set `type="multiple"` so several panels can be open at once; each one still closes on click.

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

export default function MultipleOpenFaq() {
  // type="multiple" lets several panels stay open; clicking an open one closes it.
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Accordion
        accordionData={faqItems}
        type="multiple"
        variant="ghost"
        defaultValue={["getting-started"]}
      />
    </div>
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

## Features
Single or multiple open panels, a one-time stack entrance, and nine variants that all read your theme tokens.

Every variant is built from the shadcn tokens, so changing `--primary` restyles the open panel, the rail and the icon tile together.

Radix handles roles, arrow-key navigation and focus. The visible focus ring follows the shape of each variant, and the entrance respects reduced motion.

Rows wrap cleanly at phone width; the open card in the default variant only grows wider than the list from `sm` up.

The `soft`, `tray`, `inset` and `bracket` variants open and close with CSS keyframes that ship inside the component. The stack entrance uses the Web Animations API. The only dependency beyond Radix is `lucide-react`.

## Best Practices & Guidelines

Use `animation="stack"` once per page, on the accordion you want people to notice; two decks dealing at the same time cancel each other out. Give it at least three items so the pile reads as a deck, and keep `defaultValue` set so the open card is part of the deal.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `accordionData` | `AccordionDataItem[]` | `[]` | Array of objects defining `value`, `title`, `icon`, and `content`. |
| `variant` | `"default" \| "bordered" \| "filled" \| "elevated" \| "soft" \| "tray" \| "inset" \| "bracket" \| "ghost" \| "brand-reveal"` | `"default"` | Which look to use. `default` lifts the open row out as a card, `bordered` grows a rail on it, `filled` inverts it to `primary`, `elevated` raises it on a ring, `soft` uses tinted tiles with a plus that folds into a minus, `tray` sets the rows in one rounded tray with an animated plus/minus chip, `inset` sets the answer in a well inside the open card, `bracket` opens corner brackets outward, `ghost` is type and hairlines only, and `brand-reveal` renders an interactive horizontal brand showcase. |
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

## About Shadcn Accordion

**What it is.** A copy-paste accordion for React, built on the Radix UI primitive and styled with shadcn theme tokens. You pass an array of items and it renders the icons, titles and panels.

**When to use it.** FAQ sections, settings panels, onboarding checklists and help centers. Pick a list style to match the surface it sits on, or the brand reveal to show clients and partners.

---

Live previews and every example: https://avaraui.com/docs/nextjs/accordion
