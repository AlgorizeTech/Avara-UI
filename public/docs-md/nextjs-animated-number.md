---
title: "Shadcn Animated Number"
description: "A number that counts up when it scrolls into view, then counts to each new value, with your own formatting. Free shadcn/ui component animated with GSAP."
url: https://avaraui.com/docs/nextjs/animated-number
---

# Shadcn Animated Number

A number that counts up when it scrolls into view, then counts, rolls or blurs to each new value.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/animated-number.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/animated-number
```

## Animated number

```tsx
"use client";

import { AnimatedNumber } from "@/components/custom/blocks/AnimatedNumberBlock";
import { useState } from "react";

const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function Balance() {
  const [balance, setBalance] = useState(12480.5);

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="flex flex-col items-center gap-2">
          <AnimatedNumber
            value={balance}
            variant="count"
            format={money}
            className="text-3xl font-semibold tracking-tight text-foreground"
          />
          <span className="text-xs font-medium text-muted-foreground">Count</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <AnimatedNumber
            value={balance}
            variant="roll"
            format={money}
            className="text-3xl font-semibold tracking-tight text-foreground"
          />
          <span className="text-xs font-medium text-muted-foreground">Roll</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <AnimatedNumber
            value={balance}
            variant="blur"
            format={money}
            className="text-3xl font-semibold tracking-tight text-foreground"
          />
          <span className="text-xs font-medium text-muted-foreground">Blur</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setBalance((v) => v + 1250)}
          className="cursor-pointer rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background"
        >
          Add $1,250
        </button>
        <button
          type="button"
          onClick={() => setBalance((v) => Math.max(0, v - 800))}
          className="cursor-pointer rounded-full bg-muted px-4 py-2 text-sm font-medium text-foreground"
        >
          Spend $800
        </button>
      </div>
    </div>
  );
}
```

## About Shadcn Animated Number

**What it is.** `AnimatedNumber` shows one figure. It counts up from zero when it first scrolls into view.

**How it works.** When `value` changes, it counts from the figure on screen to the new one, so a total can count down after a payment. `format` turns the running number into text, such as a currency string.

**Variants.** `variant="count"` ticks through the values. `"roll"` slides each changed digit in from below when the number goes up and from above when it goes down. `"blur"` fades each changed digit in out of a blur, drifting the same way.

**When to use it.** Use it for totals, balances and statistics that change. For a stat card with a label, use [Counter](https://avaraui.com/docs/nextjs/counter).

## For AI agents

**When to use**

- A total, balance or statistic that should count up and follow changes
- A figure next to a list that changes, such as [Animated List](https://avaraui.com/docs/nextjs/animated-list)

**When not to use**

- A stat card with a label, steppers or a countdown: use [Counter](https://avaraui.com/docs/nextjs/counter)

**Agent notes**

- Named export `AnimatedNumber` from `@/components/custom/blocks/AnimatedNumberBlock`. It renders a `span`; style it with `className`.
- `format` runs every frame, so keep it cheap. Use `Intl.NumberFormat` created once, outside the component.
- `variant="roll"` and `"blur"` animate per character, so `format` runs once per render, not per frame.
- Screen readers get the final value, not the count.
- Honours `prefers-reduced-motion`: the figure shows without counting.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | Required | The number to show. It counts up in view, then to each new value. |
| `format` | `(n: number) => string` | `toLocaleString` | Turns the running number into text, such as a currency string. |
| `duration` | `number` | `0.9` | Seconds each count takes. |
| `variant` | `"count" \| "roll" \| "blur"` | `"count"` | How the figure changes. Roll and blur follow the direction of the change. |
| `...props` | `HTMLAttributes<HTMLSpanElement>` | `undefined` | Passed to the span, including `className`. |

## Works with other components

- [Animated List](https://avaraui.com/docs/nextjs/animated-list) for the rows a total adds up.
- [Counter](https://avaraui.com/docs/nextjs/counter) for labelled stat cards, steppers and countdowns.

## How do I format the number as money?

Pass `format`, for example `(n) => n.toLocaleString("en-US", { style: "currency", currency: "USD" })`. The figure is formatted on every frame of the count.

## Does AnimatedNumber count from zero every time?

Only the first time, when it scrolls into view. After that it counts from the figure on screen to each new `value`.

## How does AnimatedNumber handle reduced motion?

When the visitor prefers reduced motion, the figure appears at its value without counting.

---

Live previews and every example: https://avaraui.com/docs/nextjs/animated-number
