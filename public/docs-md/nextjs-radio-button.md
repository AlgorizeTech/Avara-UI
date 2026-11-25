---
title: "Radio Button"
description: "Shadcn Radio Button. Accessible card-style radio button groups in six distinct layouts with press ripple feedback."
url: https://avaraui.com/docs/nextjs/radio-button
---

# Radio Button

An accessible, animated radio button group (`RadioButtonGroup`) with card-style options, keyboard arrow navigation, and optional press ripple feedback.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/radio-button.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/radio-button
```

## Select a Plan

Vertical card stack with top-right radio dot indicator, descriptions, and right-aligned pricing.

- `variant="default"` renders vertical radio cards with a top-right dot indicator.

```tsx
import { RadioButtonGroup } from "@/components/custom/blocks/RadioButtonBlock";

const PLANS = [
  { value: "starter", label: "Starter", description: "Essential components for solo makers.", meta: "$5/mo" },
  { value: "pro", label: "Pro", description: "Full registry access with priority updates.", meta: "$15/mo" },
  { value: "enterprise", label: "Enterprise", description: "Dedicated support and team seats.", meta: "$45/mo" },
];

export default function RadioButtonDefaultExample() {
  return (
    <RadioButtonGroup
      variant="default"
      label="Select a plan"
      options={PLANS}
      defaultValue="pro"
    />
  );
}
```

## Delivery And Payment

Combined checkout layout pairing a 3-column delivery grid with a 2-column payment icon grid.

```tsx
import { RadioButtonGroup } from "@/components/custom/blocks/RadioButtonBlock";
import { Building2, CreditCard, Wallet } from "lucide-react";

const DELIVERY = [
  { value: "standard", label: "Standard", description: "4–6 business days", meta: "$5.00" },
  { value: "express", label: "Express", description: "2–3 business days", meta: "$16.00" },
  { value: "super-fast", label: "Super Fast", description: "Next-day delivery", meta: "$25.00" },
];

const PAYMENTS = [
  { value: "visa-0123", label: "**** 0123", description: "Expires 08/2028", icon: <CreditCard className="size-4" /> },
  { value: "mc-8304", label: "**** 8304", description: "Expires 11/2027", icon: <CreditCard className="size-4" /> },
  { value: "paypal", label: "PayPal", description: "Instant checkout", icon: <Wallet className="size-4" /> },
  { value: "bank", label: "Bank Transfer", description: "ACH / Wire", icon: <Building2 className="size-4" /> },
];

export default function DeliveryAndPaymentExample() {
  return (
    <div className="flex flex-col gap-6">
      <RadioButtonGroup variant="grid" label="Delivery method" options={DELIVERY} defaultValue="express" />
      <RadioButtonGroup variant="with-icons" label="Payment method" options={PAYMENTS} defaultValue="visa-0123" />
    </div>
  );
}
```

## Subscription Plans

Inverted high-contrast selected state with discount badge, centered check indicator, and press ripple.

```tsx
import { RadioButtonGroup } from "@/components/custom/blocks/RadioButtonBlock";

const SUBSCRIPTIONS = [
  { value: "annual", label: "Annual", description: "Billed yearly for full access.", meta: "$99/yr" },
  { value: "annual-toolkit", label: "Annual + Toolkit", badge: "Save up to 50%", description: "Includes Figma kit and updates.", meta: "$149/yr" },
];

export default function RadioButtonSubscriptionExample() {
  return (
    <RadioButtonGroup
      variant="subscription-plans"
      label="Subscription plans"
      options={SUBSCRIPTIONS}
      defaultValue="annual-toolkit"
    />
  );
}
```

## Controlled

Controlled radio group with live selected value readout below the cards.

```tsx
import { useState } from "react";
import { RadioButtonGroup } from "@/components/custom/blocks/RadioButtonBlock";

const PLANS = [
  { value: "starter", label: "Starter", description: "Essential components for solo makers.", meta: "$5/mo" },
  { value: "pro", label: "Pro", description: "Full registry access with priority updates.", meta: "$15/mo" },
  { value: "enterprise", label: "Enterprise", description: "Dedicated support and team seats.", meta: "$45/mo" },
];

export default function RadioButtonControlledExample() {
  const [selected, setSelected] = useState("pro");

  return (
    <div className="flex flex-col gap-3">
      <RadioButtonGroup
        variant="default"
        label="Select a plan"
        options={PLANS}
        value={selected}
        onValueChange={setSelected}
      />
      <p className="text-xs text-muted-foreground">Selected: {selected}</p>
    </div>
  );
}
```

## Custom Indicator

Three-column grid with an animated spring check-circle indicator in the top-right corner.

```tsx
import { RadioButtonGroup } from "@/components/custom/blocks/RadioButtonBlock";

const LISTS = [
  { value: "newsletter", label: "Newsletter", description: "621 users" },
  { value: "existing", label: "Existing Customers", description: "1,200 users" },
  { value: "trial", label: "Trial Users", description: "2,740 users" },
];

export default function RadioButtonCustomIndicatorExample() {
  return (
    <RadioButtonGroup
      variant="custom-indicator"
      label="Select a mailing list"
      options={LISTS}
      defaultValue="newsletter"
    />
  );
}
```

## Disabled Group

Read-only disabled state when option changes are temporarily unavailable.

```tsx
import { RadioButtonGroup } from "@/components/custom/blocks/RadioButtonBlock";

const PLANS = [
  { value: "starter", label: "Starter", description: "Essential components for solo makers.", meta: "$5/mo" },
  { value: "pro", label: "Pro", description: "Full registry access with priority updates.", meta: "$15/mo" },
  { value: "enterprise", label: "Enterprise", description: "Dedicated support and team seats.", meta: "$45/mo" },
];

export default function RadioButtonDisabledExample() {
  return (
    <RadioButtonGroup
      variant="disabled-group"
      label="Select a plan"
      description="Plan changes are temporarily unavailable."
      options={PLANS}
      defaultValue="pro"
      disabled={true}
    />
  );
}
```

## Grid Layout

Three-column responsive grid for compact delivery or shipping options.

```tsx
import { RadioButtonGroup } from "@/components/custom/blocks/RadioButtonBlock";

const DELIVERY = [
  { value: "standard", label: "Standard", description: "4–6 business days", meta: "$5.00" },
  { value: "express", label: "Express", description: "2–3 business days", meta: "$16.00" },
  { value: "super-fast", label: "Super Fast", description: "Next-day delivery", meta: "$25.00" },
];

export default function RadioButtonGridExample() {
  return (
    <RadioButtonGroup
      variant="grid"
      label="Delivery method"
      options={DELIVERY}
      defaultValue="express"
    />
  );
}
```

## Icon Cards

Wide plan cards with leading icon boxes, highlight badges, pricing, and checkmark indicators.

```tsx
import { RadioButtonGroup } from "@/components/custom/blocks/RadioButtonBlock";
import { Crown, Flame, Gem, Layers, Rocket } from "lucide-react";

const WORKSPACES = [
  { value: "starter", label: "Starter", badge: "Most popular", meta: "$12", metaSuffix: "per month", description: "For freelancers and solo makers shipping fast.", icon: <Layers className="size-4" /> },
  { value: "growth", label: "Growth", meta: "$29", metaSuffix: "per month", description: "For small teams scaling their product.", icon: <Flame className="size-4" /> },
  { value: "business", label: "Business", meta: "$59", metaSuffix: "per month", description: "For companies with advanced compliance needs.", icon: <Rocket className="size-4" /> },
  { value: "scale", label: "Scale", meta: "$149", metaSuffix: "per month", description: "Dedicated infra, SLA, and custom integrations.", icon: <Gem className="size-4" /> },
  { value: "enterprise", label: "Enterprise", meta: "$299", metaSuffix: "per month", description: "White-glove onboarding, custom contracts.", icon: <Crown className="size-4" /> },
];

export default function RadioButtonIconCardsExample() {
  return (
    <RadioButtonGroup
      variant="icon-cards"
      label="Choose your workspace plan"
      options={WORKSPACES}
      defaultValue="growth"
    />
  );
}
```

## No Indicator

Clean border and ring selection with no radio dot or checkmark indicator.

```tsx
import { RadioButtonGroup } from "@/components/custom/blocks/RadioButtonBlock";

const PLANS = [
  { value: "starter", label: "Starter", description: "Essential components for solo makers.", meta: "$5/mo" },
  { value: "pro", label: "Pro", description: "Full registry access with priority updates.", meta: "$15/mo" },
  { value: "enterprise", label: "Enterprise", description: "Dedicated support and team seats.", meta: "$45/mo" },
];

export default function RadioButtonNoIndicatorExample() {
  return (
    <RadioButtonGroup
      variant="no-indicator"
      label="Select a plan"
      options={PLANS}
      defaultValue="pro"
    />
  );
}
```

## With Icons

Two-column horizontal icon cards with no radio dot indicator.

```tsx
import { RadioButtonGroup } from "@/components/custom/blocks/RadioButtonBlock";
import { Building2, CreditCard, Wallet } from "lucide-react";

const PAYMENTS = [
  { value: "visa-0123", label: "**** 0123", description: "Expires 08/2028", icon: <CreditCard className="size-4" /> },
  { value: "mc-8304", label: "**** 8304", description: "Expires 11/2027", icon: <CreditCard className="size-4" /> },
  { value: "paypal", label: "PayPal", description: "Instant checkout", icon: <Wallet className="size-4" /> },
  { value: "bank", label: "Bank Transfer", description: "ACH / Wire", icon: <Building2 className="size-4" /> },
];

export default function RadioButtonIconsExample() {
  return (
    <RadioButtonGroup
      variant="with-icons"
      label="Payment method"
      options={PAYMENTS}
      defaultValue="visa-0123"
    />
  );
}
```

## With Ripple

Three-column deploy region grid with tactile press ripple feedback on click.

```tsx
import { RadioButtonGroup } from "@/components/custom/blocks/RadioButtonBlock";

const REGIONS = [
  { value: "us-east-1", label: "US East", description: "us-east-1" },
  { value: "eu-west-1", label: "EU West", description: "eu-west-1" },
  { value: "ap-south-1", label: "Asia Pacific", description: "ap-south-1" },
];

export default function RadioButtonRippleExample() {
  return (
    <RadioButtonGroup
      variant="with-ripple"
      label="Deploy region"
      options={REGIONS}
      defaultValue="us-east-1"
      ripple={true}
    />
  );
}
```

## About Radio Button

**What it is.** `RadioButtonGroup` is a card-based radio selector supporting vertical stacks, multi-column grids, leading icons, inverted subscription cards, custom check indicators, and tactile press ripples.

**How it is built.** Implements accessible `role="radiogroup"` / `role="radio"` semantics with full arrow-key navigation, controlled or uncontrolled value management, and theme-synced active borders.

**When to use it.** Use `RadioButtonGroup` when users choose one option from rich cards (plans, shipping methods, payment options, deploy regions). For compact inline toggle buttons, use [Toggle Group](https://avaraui.com/docs/nextjs/toggle-group).

## For AI agents

**When to use**

- Single-choice card selectors for pricing plans, delivery/payment options, or deploy regions
- Rich option items with `label`, `description`, `meta` pricing, icons, or press ripple feedback

**When not to use**

- Compact toolbar/segmented switches — use [Toggle Group](https://avaraui.com/docs/nextjs/toggle-group)
- Long lists of options in a dropdown — use [Select](https://avaraui.com/docs/nextjs/select)

**Agent notes**

- Named export: `import { RadioButtonGroup } from "@/components/custom/blocks/RadioButtonBlock"`
- `options` is required and each `value` must be unique. The group is controlled when `value` is not `undefined`; otherwise pass `defaultValue` (it falls back to the first enabled option).
- Pass `label` or `ariaLabel` so the `radiogroup` has an accessible name; with neither it is named "Options".
- `delivery-and-payment` and `controlled` are demo names with no styling of their own; they render like `default`.
- Needs the `lucide-react` package, which the registry install adds. It uses no animation library.

**Ask before you pick.** This page has 11 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 11 options as live previews: https://avaraui.com/view/radio-button

**When to use it.** Accessible card-style radio button groups with eleven examples across vertical plan cards, inverted subscription cards, checkout grids, icon cards, and ripple feedback.

**Gotchas:**

- Every look is one `radio-button` item — pass `variant` to switch layout and indicator style.
- Press ripples are off by default and enabled only on `subscription-plans` and `with-ripple` (or via `ripple={true}`).

### The 11 variants

1. **Select a Plan** (`default`): Vertical card stack with top-right radio dot indicator and pricing.
   - Live: https://avaraui.com/view/radio-button/default
   - Best for: pricing tier selection and vertical option lists
   - Avoid if: you want a compact horizontal 3-column grid
   - Traits: vertical stack, radio dot, pricing meta
   - Install: `npx shadcn@latest add @avara-ui/radio-button`
   - Set these props: `{"variant":"default"}`
   - Docs: https://avaraui.com/docs/nextjs/radio-button#select-a-plan
2. **Subscription Plans** (`subscription-plans`): Inverted high-contrast selected card with badge, centered check, and ripple.
   - Live: https://avaraui.com/view/radio-button/subscription-plans
   - Best for: billing cycle or featured subscription toggles
   - Avoid if: you want subtle border selection instead of inverted fill
   - Traits: inverted fill, discount badge, centered check, ripple
   - Install: `npx shadcn@latest add @avara-ui/radio-button`
   - Set these props: `{"variant":"subscription-plans"}`
   - Docs: https://avaraui.com/docs/nextjs/radio-button#subscription-plans
3. **Icon Cards** (`icon-cards`): Wide plan cards with leading icon boxes, badges, pricing, and checkmarks.
   - Live: https://avaraui.com/view/radio-button/icon-cards
   - Best for: workspace plan pickers with icons and badges
   - Avoid if: you only have short 1-line labels
   - Traits: icon boxes, badges, check indicator
   - Install: `npx shadcn@latest add @avara-ui/radio-button`
   - Set these props: `{"variant":"icon-cards"}`
   - Docs: https://avaraui.com/docs/nextjs/radio-button#icon-cards
4. **No Indicator** (`no-indicator`): Vertical plan cards with border and ring selection and no radio indicator.
   - Live: https://avaraui.com/view/radio-button/no-indicator
   - Best for: minimal card selection without radio dots
   - Avoid if: users expect an explicit radio circle
   - Traits: no indicator, border ring, clean cards
   - Install: `npx shadcn@latest add @avara-ui/radio-button`
   - Set these props: `{"variant":"no-indicator"}`
   - Docs: https://avaraui.com/docs/nextjs/radio-button#no-indicator
5. **Controlled** (`controlled`): Controlled radio group with live selected value readout below the cards.
   - Live: https://avaraui.com/view/radio-button/controlled
   - Best for: controlled form state with external readout
   - Avoid if: uncontrolled defaultValue is enough
   - Traits: controlled state, live readout, radio dot
   - Install: `npx shadcn@latest add @avara-ui/radio-button`
   - Set these props: `{"variant":"controlled"}`
   - Docs: https://avaraui.com/docs/nextjs/radio-button#controlled
6. **Disabled Group** (`disabled-group`): Disabled radio group when option changes are temporarily unavailable.
   - Live: https://avaraui.com/view/radio-button/disabled-group
   - Best for: locked or read-only plan states
   - Avoid if: options should be interactive
   - Traits: disabled state, muted opacity, radio dot
   - Install: `npx shadcn@latest add @avara-ui/radio-button`
   - Set these props: `{"variant":"disabled-group"}`
   - Docs: https://avaraui.com/docs/nextjs/radio-button#disabled-group
7. **Delivery And Payment** (`delivery-and-payment`): Combined checkout layout pairing a 3-column delivery grid and 2-column payment icons.
   - Live: https://avaraui.com/view/radio-button/delivery-and-payment
   - Best for: multi-step checkout and shipping + payment forms
   - Avoid if: you only need a single radio group
   - Traits: checkout, delivery grid, payment icons
   - Install: `npx shadcn@latest add @avara-ui/radio-button`
   - Set these props: `{"variant":"delivery-and-payment"}`
   - Docs: https://avaraui.com/docs/nextjs/radio-button#delivery-and-payment
8. **Grid Layout** (`grid`): Three-column responsive grid for compact delivery or shipping options.
   - Live: https://avaraui.com/view/radio-button/grid
   - Best for: shipping speeds or compact 3-column choices
   - Avoid if: options have long multi-line descriptions
   - Traits: 3-column grid, radio dot, compact cards
   - Install: `npx shadcn@latest add @avara-ui/radio-button`
   - Set these props: `{"variant":"grid"}`
   - Docs: https://avaraui.com/docs/nextjs/radio-button#grid-layout
9. **With Icons** (`with-icons`): Two-column horizontal icon cards with border/ring selection and no indicator.
   - Live: https://avaraui.com/view/radio-button/with-icons
   - Best for: payment methods and compact icon-led choices
   - Avoid if: you need an explicit radio dot or checkmark
   - Traits: 2-column grid, leading icons, no indicator
   - Install: `npx shadcn@latest add @avara-ui/radio-button`
   - Set these props: `{"variant":"with-icons"}`
   - Docs: https://avaraui.com/docs/nextjs/radio-button#with-icons
10. **Custom Indicator** (`custom-indicator`): Three-column grid with an animated spring check-circle indicator.
   - Live: https://avaraui.com/view/radio-button/custom-indicator
   - Best for: audience or category grids with checkmark feedback
   - Avoid if: you prefer a minimal radio dot
   - Traits: 3-column grid, animated check, audience stats
   - Install: `npx shadcn@latest add @avara-ui/radio-button`
   - Set these props: `{"variant":"custom-indicator"}`
   - Docs: https://avaraui.com/docs/nextjs/radio-button#custom-indicator
11. **With Ripple** (`with-ripple`): Three-column deploy region grid with press ripple feedback on click.
   - Live: https://avaraui.com/view/radio-button/with-ripple
   - Best for: region pickers or tactile ripple selection
   - Avoid if: you want zero click ripple
   - Traits: 3-column grid, press ripple, region selector
   - Install: `npx shadcn@latest add @avara-ui/radio-button`
   - Set these props: `{"variant":"with-ripple"}`
   - Docs: https://avaraui.com/docs/nextjs/radio-button#with-ripple

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "delivery-and-payment" \| "subscription-plans" \| "controlled" \| "custom-indicator" \| "disabled-group" \| "grid" \| "icon-cards" \| "no-indicator" \| "with-icons" \| "with-ripple"` | `"default"` | Visual layout and indicator style of the radio button group. |
| `options` | `RadioButtonOption[]` | — | Array of options (`value`, `label`, `description`, `meta`, `badge`, `icon`, `disabled`). |
| `label` | `string` | `undefined` | Heading displayed above the radio group. |
| `description` | `string` | `undefined` | Helper text displayed beneath the label. |
| `value` | `string` | `undefined` | Controlled selected option value. |
| `defaultValue` | `string` | First enabled option | Initial selected value for uncontrolled usage. |
| `onValueChange` | `(value: string) => void` | `undefined` | Callback fired when the selected option changes. |
| `disabled` | `boolean` | `false` | Disables all options in the group. |
| `ripple` | `boolean` | `true` for `subscription-plans` &amp; `with-ripple` | Enables press ripple feedback on pointer click. |
| `indicator` | `"dot" \| "check" \| "none"` | Variant default | Overrides the selection indicator style. |
| `className` | `string` | `undefined` | Additional CSS classes for the outer wrapper. |

## Works with other components

- Combine `RadioButtonGroup` inside [Form](https://avaraui.com/docs/nextjs/form), [Wizard](https://avaraui.com/docs/nextjs/wizard), or [Booking Card](https://avaraui.com/docs/nextjs/booking-card) flows.
- Pair with [Action Button](https://avaraui.com/docs/nextjs/action-buttons) (`PaymentButton`) for checkout confirmation.

## Does RadioButtonGroup support keyboard navigation?

Yes. The arrow keys (Up, Down, Left, Right) move focus and selection to the next enabled option, wrap at the ends and skip options marked `disabled`. Only the selected card is in the tab order, so Tab enters and leaves the group in one stop.

## How do I make RadioButtonGroup controlled?

Pass `value` together with `onValueChange`. The group counts as controlled whenever `value` is not `undefined`, and `onValueChange` receives the option's `value` string on every click or arrow-key move. Without `value`, it keeps its own state starting from `defaultValue`.

## How do I change the selection indicator on RadioButtonGroup?

Set `indicator` to `"dot"`, `"check"` or `"none"`. Without it the variant decides: `with-icons` and `no-indicator` show none, `subscription-plans`, `custom-indicator` and `icon-cards` show a check, and every other variant shows a dot in the top-right corner.

## How do I turn the press ripple on or off in RadioButtonGroup?

Pass `ripple={true}` or `ripple={false}`. It defaults to on only for `subscription-plans` and `with-ripple`. The ripple starts from the pointer position on a real click, so keyboard selection never triggers it, and it is skipped when the user prefers reduced motion.

## Can I disable a single option in RadioButtonGroup?

Yes. Set `disabled: true` on that entry in `options` and only it is dimmed, marked `aria-disabled` and skipped by arrow-key navigation. The group-level `disabled` prop does the same for every option at once and sets `aria-disabled` on the `radiogroup`.

## Does RadioButtonGroup work in Vite or only Next.js?

It works in both. The file imports nothing from `next/*`, only React, `lucide-react` and the `cn` helper. The `"use client"` line at the top is ignored outside Next.js, and the install adds the `lucide-react` npm package.

---

Live previews and every example: https://avaraui.com/docs/nextjs/radio-button
