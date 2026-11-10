---
title: "Shadcn Range Date Picker"
description: "Shadcn Range Date Picker. An interactive Range Date Picker component featuring single month, dual-month."
url: https://avaraui.com/docs/nextjs/range-date-picker
---

# Shadcn Range Date Picker

An interactive **Range Date Picker** component featuring single month, dual-month, and rate-priced calendar layouts for hotel or flight booking applications.

## For AI agents

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

## Variations

### Single Month Range Date Picker

Compact single month view for date range selection.

```tsx
import { RangeDatePicker, type DateRange } from "@/components/custom/range-date-picker";

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

### Single Month Priced Range Date Picker

Single calendar layout displaying dynamic rate prices ($100, $120) below date numbers.

```tsx
import { RangeDatePicker, type DateRange } from "@/components/custom/range-date-picker";

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

### Dual Month Range Date Picker

Side-by-side dual calendars (Left Month & Right Month) for continuous range selection.

```tsx
import { RangeDatePicker, type DateRange } from "@/components/custom/range-date-picker";

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

### Dual Month Priced Range Date Picker

Side-by-side dual calendars displaying dynamic rate prices ($100, $120) below date numbers.

```tsx
import { RangeDatePicker, type DateRange } from "@/components/custom/range-date-picker";

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

### Disable past dates

- Set `disablePast` to grey out every day before today so it can neither start nor end a range. `minDate` and `maxDate` bound the calendar to any window.

```tsx
import { RangeDatePicker, type DateRange } from "@/components/custom/range-date-picker";

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

### Range with times

The card opens as a bare calendar. Pick a start day and a time rail unfolds beside it — Start first, then an End column once the end day is chosen. The rail unfolds under the calendar when the card is narrow, and Clear folds it away.

- Set `showTime` to add the Start / End time columns. With no `value` the card starts empty; both `from` and `to` then carry a time and the footer shows it. `timeFormat` switches to 24-hour and `minuteStep` sets the granularity.

```tsx
import { RangeDatePicker, type DateRange } from "@/components/custom/range-date-picker";

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

## Features

Discover the interactive capabilities of the `RangeDatePicker` component:

- **Single & Dual Priced Calendars (`variant="priced-single" | "priced-dual"`)**: Renders dynamic rate prices (`$100`, `$120`) directly below each date number for hotel room or flight booking workflows in both single and dual month views.
- **Dual Calendar Layout (`variant="dual"`)**: Displays two side-by-side calendars (Month N on Left, Month N+1 on Right). Select start date from the left calendar and end date on the right calendar.
- **Single Calendar Layout (`variant="single"`)**: Compact single-month view ideal for smaller screens or compact forms.
- **Custom Price Formatter (`getPrice`)**: Accepts custom callback functions to supply date-specific rates from API or static pricing rules.
- **Range Selection Engine**: Click any start date and end date to highlight the span with smooth background effects.
- **Dynamic Color Themes**: Built-in support for `"primary"`, `"indigo"`, `"rose"`, `"emerald"`, and `"zinc"` color schemes.

## Props Reference: RangeDatePicker

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

---

Live previews and every example: https://avaraui.com/docs/nextjs/range-date-picker
