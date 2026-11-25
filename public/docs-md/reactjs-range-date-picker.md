---
title: "Shadcn Range Date Picker"
description: "Shadcn Range Date Picker. An interactive `RangeDatePicker` with single-month, dual-month, rate-priced."
url: https://avaraui.com/docs/nextjs/range-date-picker
---

# Shadcn Range Date Picker

An interactive `RangeDatePicker` with single-month, dual-month, rate-priced, and start/end time-rail variants for booking and scheduling flows.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/range-date-picker.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/range-date-picker
```

## Single Month Range Date Picker

Compact single month view for date range selection.

```tsx
import { RangeDatePicker, type DateRange } from "@/components/custom/range-date-picker";
import { useState } from "react";

export default function SingleRangeDatePickerDemo() {
  const [range, setRange] = useState<DateRange>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  });

  return (
    <RangeDatePicker
      variant="single"
      value={range}
      onChange={setRange}
      color="primary"
    />
  );
}
```

## Single Month Priced Range Date Picker

Single calendar layout displaying dynamic rate prices ($100, $120) below date numbers.

```tsx
import { RangeDatePicker, type DateRange } from "@/components/custom/range-date-picker";
import { useState } from "react";

export default function PricedSingleRangeDatePickerDemo() {
  const [range, setRange] = useState<DateRange>({
    from: new Date(new Date().setDate(8)),
    to: new Date(new Date().setDate(18)),
  });

  return (
    <RangeDatePicker
      variant="priced-single"
      showPrices={true}
      value={range}
      onChange={setRange}
      getPrice={(date) => (date.getDay() === 0 || date.getDay() === 6 ? "$120" : "$100")}
      color="primary"
    />
  );
}
```

## Dual Month Range Date Picker

Side-by-side dual calendars (Left Month & Right Month) for continuous range selection.

```tsx
import { RangeDatePicker, type DateRange } from "@/components/custom/range-date-picker";
import { useState } from "react";

export default function DualRangeDatePickerDemo() {
  const [range, setRange] = useState<DateRange>({
    from: new Date(new Date().setDate(new Date().getDate() - 14)),
    to: new Date(),
  });

  return (
    <RangeDatePicker
      variant="dual"
      value={range}
      onChange={setRange}
      color="primary"
    />
  );
}
```

## Dual Month Priced Range Date Picker

Side-by-side dual calendars displaying dynamic rate prices ($100, $120) below date numbers.

```tsx
import { RangeDatePicker, type DateRange } from "@/components/custom/range-date-picker";
import { useState } from "react";

export default function PricedDualRangeDatePickerDemo() {
  const [range, setRange] = useState<DateRange>({
    from: new Date(new Date().setDate(8)),
    to: new Date(new Date().setDate(28)),
  });

  return (
    <RangeDatePicker
      variant="priced-dual"
      showPrices={true}
      value={range}
      onChange={setRange}
      getPrice={(date) => (date.getDay() === 0 || date.getDay() === 6 ? "$120" : "$100")}
      color="primary"
    />
  );
}
```

## Disable past dates

- Set `disablePast` to grey out every day before today so it can neither start nor end a range. `minDate` and `maxDate` bound the calendar to any window.

```tsx
import { RangeDatePicker, type DateRange } from "@/components/custom/range-date-picker";
import { useState } from "react";

export default function UpcomingStay() {
  const [range, setRange] = useState<DateRange>(() => {
    const from = new Date();
    const to = new Date();
    to.setDate(to.getDate() + 5);
    return { from, to };
  });

  // Every day before today is greyed out and cannot start or end a range.
  // minDate / maxDate bound the calendar to any window instead.
  return <RangeDatePicker variant="single" value={range} onChange={setRange} disablePast />;
}
```

## Range with times

Pick a start day and a time rail unfolds beside the calendar: Start first, then an End column once the end day is chosen.

- Set `showTime` to add the Start / End time columns. With no `value` the card starts empty; both `from` and `to` then carry a time and the footer shows it. `timeFormat` switches to 24-hour and `minuteStep` sets the granularity.

```tsx
import { RangeDatePicker, type DateRange } from "@/components/custom/range-date-picker";
import { useState } from "react";

export default function BookingWindow() {
  // Start empty: the card is just the calendar until a start day is picked.
  const [range, setRange] = useState<DateRange>({ from: null, to: null });

  // showTime keeps the time columns folded away until the first pick, then
  // unfolds them beside the calendar (under it when the card is narrow).
  // Both dates carry a time, and on a same-day range the end can never be
  // earlier than the start. Clear folds the columns away again.
  return (
    <RangeDatePicker
      variant="single"
      value={range}
      onChange={setRange}
      showTime
      minuteStep={15}
      timeFormat="12h"
      disablePast
    />
  );
}
```

## About Shadcn Range Date Picker

**What it is.** `RangeDatePicker` handles start-to-end date range selection across `single`, `dual`, `priced-single`, and `priced-dual` layouts, with optional `disablePast` bounds, `getPrice` per-day rate labels, and `showTime` start/end time rails.

**How it is built.** Built with native `Date` math and theme-aware color schemes (`primary`, `indigo`, `rose`, `emerald`, `zinc`).

**When to use it.** Use `RangeDatePicker` for hotel/flight booking ranges, analytics date filters, and availability windows. For single dates, use [Date Picker](https://avaraui.com/docs/reactjs/date-picker).

**Features.**

- **Single & Dual Priced Calendars (`variant="priced-single" | "priced-dual"`)**: Renders dynamic rate prices (`$100`, `$120`) directly below each date number for hotel room or flight booking workflows in both single and dual month views.
- **Dual Calendar Layout (`variant="dual"`)**: Displays two calendars side by side (Month N and Month N+1), stacked on narrow screens. Both belong to one range, so the start and end can fall in either month.
- **Single Calendar Layout (`variant="single"`)**: Compact single-month view ideal for smaller screens or compact forms.
- **Custom Price Formatter (`getPrice`)**: Accepts a callback that returns a string, number or `null` for each date, so rates can come from an API or static pricing rules.
- **Range Selection Engine**: Click any start date and end date to highlight the span with smooth background effects.
- **Color Themes**: Built-in `"primary"`, `"indigo"`, `"rose"`, `"emerald"`, and `"zinc"` color schemes.

## For AI agents

**When to use**

- Date-span selection (`{ from, to }`) in single or dual-month calendars
- Priced booking calendars (`variant="priced-single" | "priced-dual"`, `getPrice`) or ranges with start/end times (`showTime`)

**When not to use**

- Single date selection — use [Date Picker](https://avaraui.com/docs/reactjs/date-picker)
- Day-and-time appointment slots — use [Booking Card](https://avaraui.com/docs/reactjs/booking-card)

**Agent notes**

- Named exports: `RangeDatePicker`, `type DateRange` from `@/components/custom/range-date-picker`
- Controlled use takes `value` and `onChange` with a `DateRange` (`{ from, to }`, each a `Date` or `null`). `onChange` fires on every click, so the first click of a new range gives `to: null`.
- Prices show when `showPrices` is set, the variant is `priced-single` or `priced-dual`, or `getPrice` is passed. Without `getPrice` the placeholders are `$100` on weekdays and `$120` on weekends, so always pass your own.
- Pass `disablePast` to block past dates from starting or ending a range; `disabled` greys out the whole card.
- `showTime` adds Start and End time columns built from the `time-picker` registry dependency.

**Ask before you pick.** This page has 4 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 4 options as live previews: https://avaraui.com/view/range-date-picker

**When to use it.** A date range picker for hotel or flight booking, in four layouts: one or two months, each with or without a price under every day.

**When to use something else:**

- [Date Picker](https://avaraui.com/docs/reactjs/date-picker): for choosing a single date in a form field.

**Gotchas:**

- All four are looks of the one `range-date-picker` item: install it once and set `variant` from the index.
- Past dates are blocked with `disablePast` (and `minDate` / `maxDate` bound the window) and start and end times come from `showTime`: both are props on any layout.

### The 4 variants

1. **Single month** (`single`): One month at a time for choosing a start and end date.
   - Live: https://avaraui.com/view/range-date-picker/single
   - Best for: a compact picker in a narrow space or on mobile
   - Avoid if: people often pick ranges that span two months
   - Traits: one month, no prices
   - Install: `npx shadcn@latest add @avara-ui/range-date-picker`
   - Set these props: `{"variant":"single"}`
   - Docs: https://avaraui.com/docs/nextjs/range-date-picker#single-month-range-date-picker
2. **Single month with prices** (`priced-single`): One month with a price shown for each day.
   - Live: https://avaraui.com/view/range-date-picker/priced-single
   - Best for: a compact booking widget where the nightly or daily rate matters
   - Avoid if: you have no per-day price to show
   - Traits: one month, price per day
   - Install: `npx shadcn@latest add @avara-ui/range-date-picker`
   - Set these props: `{"variant":"priced-single"}`
   - Docs: https://avaraui.com/docs/nextjs/range-date-picker#single-month-priced-range-date-picker
3. **Dual month** (`dual`): Two months side by side, so a range across a month boundary is visible at once.
   - Live: https://avaraui.com/view/range-date-picker/dual
   - Best for: a desktop booking flow where ranges often span two months
   - Avoid if: the space is narrow
   - Traits: two months, no prices
   - Install: `npx shadcn@latest add @avara-ui/range-date-picker`
   - Set these props: `{"variant":"dual"}`
   - Docs: https://avaraui.com/docs/nextjs/range-date-picker#dual-month-range-date-picker
4. **Dual month with prices** (`priced-dual`): Two months side by side with a price on each day.
   - Live: https://avaraui.com/view/range-date-picker/priced-dual
   - Best for: a hotel or flight search where comparing prices across two months helps
   - Avoid if: you have no per-day price to show, or the space is narrow
   - Traits: two months, price per day
   - Install: `npx shadcn@latest add @avara-ui/range-date-picker`
   - Set these props: `{"variant":"priced-dual"}`
   - Docs: https://avaraui.com/docs/nextjs/range-date-picker#dual-month-priced-range-date-picker

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"single" \| "dual" \| "priced-single" \| "priced-dual"` | `"single"` | Calendar layout variant. `"priced-single"` & `"priced-dual"` render price tags below date numbers. |
| `showPrices` | `boolean` | `false` | Toggles visibility of price labels underneath dates. |
| `getPrice` | `(date: Date) => string \| number \| null` | `undefined` | Custom pricing formatter function to return dynamic rates per date. |
| `value` | `{ from: Date \| null; to: Date \| null }` | `undefined` | Controlled date range value object. |
| `onChange` | `(range: DateRange) => void` | `undefined` | Callback fired when date range is selected or reset. |
| `defaultFrom` | `Date \| null` | `Last 7 Days` | Initial start date for uncontrolled state. |
| `defaultTo` | `Date \| null` | `Today` | Initial end date for uncontrolled state. |
| `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "zinc"` | `"primary"` | Theme color variant for highlights and buttons. |
| `disablePast` | `boolean` | `false` | Greys out every day before today so it cannot start or end a range. With `showTime`, times already passed today are disabled too. |
| `minDate` | `Date` | `undefined` | Earliest selectable day (inclusive). Combined with `disablePast`, the later bound wins. |
| `maxDate` | `Date` | `undefined` | Latest selectable day (inclusive). |
| `showTime` | `boolean` | `false` | Adds Start / End time columns. The card opens with the calendar alone and starts empty when uncontrolled; picking a start day unfolds the columns to the right of a single-month calendar when there is room for the wider card, under it otherwise (dual-month always stacks). Clear folds them away. Both `from` and `to` carry a time; on a same-day range the end can never precede the start. |
| `timeFormat` | `"12h" \| "24h"` | `"12h"` | 12-hour clock with an AM / PM column, or a 24-hour one. |
| `minuteStep` | `number` | `5` | Minute granularity of the time columns. |

## Works with other components

- Pair `RangeDatePicker` with [Data Table](https://avaraui.com/docs/reactjs/data-table) or [Chart](https://avaraui.com/docs/reactjs/chart) for analytics date-range filtering.
- Combine priced variants with [Booking Card](https://avaraui.com/docs/reactjs/booking-card) or [Action Button](https://avaraui.com/docs/reactjs/action-buttons) (`PaymentButton`).
- Use [Date Picker](https://avaraui.com/docs/reactjs/date-picker) instead when the user picks only one day.

## How do I show nightly prices under each calendar day in RangeDatePicker?

Use `variant="priced-single"` or `"priced-dual"` and pass `getPrice={(date) => ...}`, returning a string, a number or `null` for that day. Without `getPrice` the picker shows placeholder rates, $100 on weekdays and $120 on weekends, so always supply your own.

## How do I read the selected range from RangeDatePicker?

Pass `value` and `onChange`. `onChange` receives a `DateRange`, `{ from, to }` with each a `Date` or `null`, and fires on every click, so the first click of a range arrives with `to: null`. Uncontrolled, `defaultFrom` and `defaultTo` start it at seven days ago and today.

## How do I stop RangeDatePicker from selecting past dates?

Set `disablePast`, or bound the calendar with `minDate` and `maxDate`, both inclusive. Disabled days are struck through and cannot be clicked. When `disablePast` and `minDate` are both set, the later bound wins. With `showTime`, times already passed today are disabled too.

## How do I add start and end times to RangeDatePicker?

Set `showTime`. The card opens with the calendar alone, and picking a start day unfolds Start and End time columns beside it, or under it on a narrow card. Use `timeFormat="24h"` and `minuteStep` to adjust them. On a same-day range the end can never precede the start.

## Which colors does RangeDatePicker support?

`color` accepts `"primary"`, `"indigo"`, `"rose"`, `"emerald"` and `"zinc"`. `"primary"` follows your theme tokens, so a Themes preset restyles it, while the others use fixed Tailwind palette colors that stay the same across themes. Any other string falls back to `"primary"`, so a typo never breaks the card.

## Does RangeDatePicker work in Vite and respect reduced motion?

Yes to both. The file imports nothing from `next/*`, and it needs only `lucide-react` plus the `time-picker` item the installer adds. The time rail's unfold animation switches off when the user prefers reduced motion. Day cells are plain buttons, so Tab reaches them and disabled days are skipped.

---

Live previews and every example: https://avaraui.com/docs/nextjs/range-date-picker
