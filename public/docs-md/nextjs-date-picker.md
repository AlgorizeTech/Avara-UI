---
title: "Shadcn Date Picker"
description: "A dependency-free date picker with an error state, disabled past dates and a date-and-time mode. Free shadcn/ui component for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/date-picker
---

# Shadcn Date Picker

A Date Picker (`DatePickerBlock`) with inline calendar and dropdown modes, month/year jump navigation, disabled past dates, and optional time columns.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/date-picker.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/date-picker
```

## Inline Calendar

Compact inline single-month calendar card for direct date selection.

- Set `variant="calendar"` renders the calendar inline inside a bordered card with a live selected-date footer and Reset action instead of a dropdown trigger.

```tsx
"use client";

import { useState } from "react";
import { DatePickerBlock } from "@/components/custom/blocks/DatePickerBlock";

export default function InlineCalendarDatePicker() {
  const [date, setDate] = useState<Date | null>(() => new Date());

  return (
    <DatePickerBlock
      variant="calendar"
      value={date}
      onChange={setDate}
      color="primary"
    />
  );
}
```

## Date picker

- Control it with `value` and `onChange` — both work with a plain `Date | null`.
- `placeholder` is the trigger text while nothing is selected, defaulting to `Pick a date`.
- `label` renders a bold label above the input and `helperText` a subtle line below it.

```tsx
"use client";

import { useState } from "react";
import { DatePickerBlock } from "@/components/custom/blocks/DatePickerBlock";

export default function LaunchDatePicker() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePickerBlock
      value={date}
      onChange={setDate}
      label="Launch Date"
      placeholder="Select a date"
      helperText="Choose the date for your next launch."
    />
  );
}
```

## Error

- Pass `error` to turn the trigger red, add an alert icon and replace `helperText` with your message.

```tsx
"use client";

import { useState } from "react";
import { DatePickerBlock } from "@/components/custom/blocks/DatePickerBlock";

export default function ValidatedDatePicker() {
  const [date, setDate] = useState<Date | null>(null);

  const isPast = (d: Date | null) => {
    if (!d) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(d);
    target.setHours(0, 0, 0, 0);
    return target.getTime() < today.getTime();
  };

  const hasError = isPast(date);

  return (
    <DatePickerBlock
      value={date}
      onChange={setDate}
      label="Launch Date"
      placeholder="Select a date"
      helperText={!hasError ? "Valid launch date selected." : undefined}
      error={hasError ? "Please select a valid date in the future." : undefined}
    />
  );
}
```

## Disable past dates

- Set `disablePast` to grey out every day before today. `minDate` and `maxDate` bound the calendar to any window; when both a lower bound and `disablePast` are given, the later one wins.

```tsx
"use client";

import { useState } from "react";
import { DatePickerBlock } from "@/components/custom/blocks/DatePickerBlock";

export default function FutureOnlyPicker() {
  const [date, setDate] = useState<Date | null>(null);

  // Every day before today is greyed out and cannot be clicked.
  // Use minDate / maxDate for an arbitrary window instead.
  return (
    <DatePickerBlock
      value={date}
      onChange={setDate}
      disablePast
      label="Launch Date"
      placeholder="Select a date"
      helperText="Only today and future dates can be picked."
    />
  );
}
```

## Date & time

Pick a day, then scroll the columns — Done closes the popover. The columns sit to the right of the calendar when the viewport has room, and under it otherwise.

- Set `showTime` to add hour / minute / AM-PM columns under the calendar; the selected `Date` carries the time and the trigger shows it. `timeFormat` switches to a 24-hour clock and `minuteStep` sets the granularity.
- With `disablePast` as well, times that have already passed today are disabled too, and landing on today snaps the time forward to now.

```tsx
"use client";

import { useState } from "react";
import { DatePickerBlock } from "@/components/custom/blocks/DatePickerBlock";

export default function DateTimePicker() {
  const [date, setDate] = useState<Date | null>(null);

  // showTime adds hour / minute / AM-PM columns — to the right of the
  // calendar when the viewport has room, under it otherwise. Picking a
  // day keeps the popover open until Done, and the Date you receive carries
  // the time. Pair it with disablePast to also block times that have passed
  // today.
  return (
    <DatePickerBlock
      value={date}
      onChange={setDate}
      showTime
      minuteStep={5}
      timeFormat="12h"
      disablePast
      label="Launch Date"
      placeholder="Select date & time"
      helperText="Pick a day, then set the time and hit Done."
    />
  );
}
```

## About Shadcn Date Picker

**What it is.** `DatePickerBlock` is a single-date and date-time selector with a popover trigger or inline `variant="calendar"` card, built-in month/year jump view, `disablePast`/`minDate`/`maxDate` bounds, and optional `showTime` hour/minute columns.

**How it is built.** Native JavaScript `Date` math and `Intl.DateTimeFormat`, so no date library is needed; the only npm dependency is `lucide-react` for icons. The month grid sits in a fixed-height stage, so the card does not resize between 5- and 6-week months, and panels unfold on a spring that switches off under `prefers-reduced-motion`.

**When to use it.** Use `DatePickerBlock` for single dates or date+time selection. For start-to-end date spans or priced booking calendars, use [Range Date Picker](https://avaraui.com/docs/nextjs/range-date-picker).

## For AI agents

**When to use**

- Single date or date-and-time form fields (`value: Date | null`, `onChange`)
- Inline single-month selection cards (`variant="calendar"`)

**When not to use**

- Start-to-end date ranges or priced hotel/flight calendars — use [Range Date Picker](https://avaraui.com/docs/nextjs/range-date-picker)
- Full event scheduling dashboards — use [Calendar](https://avaraui.com/docs/nextjs/calendar)

**Agent notes**

- Named export: `import { DatePickerBlock } from "@/components/custom/blocks/DatePickerBlock"`
- Pass `showTime` for hour/minute/AM-PM columns (`timeFormat` for 24h, `minuteStep` for granularity); with `disablePast`, today's past times are also disabled

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `Date \| null` | `undefined` | The currently selected JavaScript Date object. |
| `onChange` | `(val: Date) => void` | `undefined` | Callback function fired when a user selects a date from the calendar. |
| `placeholder` | `string` | `"Pick a date"` | Text displayed inside the trigger button when no date is selected. |
| `inputSize` | `"sm" \| "md" \| "lg"` | `"md"` | Uniformly scales the padding, text size, and icon size of the trigger button. |
| `variant` | `"default" \| "filled" \| "underlined" \| "glow" \| "calendar"` | `"default"` | Determines the visual styling of the borders, background, and focus rings. |
| `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "zinc" \| string` | `"primary"` | Applies the global color theme to the focus ring, glow shadow, and the selected date bubble in the calendar. Accepts valid hex codes. |
| `label` | `string` | `undefined` | Renders a bold, accessible label directly above the input. |
| `helperText` | `string` | `undefined` | Subtle instructional text rendered below the input. |
| `error` | `string` | `undefined` | If provided, turns the input red, adds an alert icon, and replaces the helper text with the error message. |
| `disabled` | `boolean` | `false` | Disables interactions and applies a faded, read-only style. |
| `disablePast` | `boolean` | `false` | Greys out every day before today so it cannot be picked. With `showTime`, times already passed today are disabled as well. |
| `minDate` | `Date` | `undefined` | Earliest selectable day (inclusive). Combined with `disablePast`, the later bound wins. |
| `maxDate` | `Date` | `undefined` | Latest selectable day (inclusive). |
| `weekStartsOn` | `0 \| 1` | `1` | First day of the week: `1` for Monday, `0` for Sunday. |
| `showTime` | `boolean` | `false` | Adds hour / minute (and AM-PM) columns — to the right of the calendar when the viewport has room (the popover widens to 30rem), under it otherwise. The popover also flips to hang from the trigger's right edge when that is the side with space. Picking a day keeps the popover open until Done, and `value` carries the chosen time. |
| `timeFormat` | `"12h" \| "24h"` | `"12h"` | 12-hour clock with an AM / PM column, or a 24-hour one. |
| `minuteStep` | `number` | `5` | Minute granularity of the time columns. |

## Works with other components

- Pair `DatePickerBlock` with [Input](https://avaraui.com/docs/nextjs/input), [Select](https://avaraui.com/docs/nextjs/select), and [Form](https://avaraui.com/docs/nextjs/form).
- Use [Range Date Picker](https://avaraui.com/docs/nextjs/range-date-picker) when users need both a start and end date.

## How do I enable time selection alongside the calendar?

Pass `showTime` to `DatePickerBlock`. After a day is picked, hour and minute columns unfold beside the calendar, or under it on narrow screens, and the popover stays open until **Done**. The `Date` in `value` carries the time; `timeFormat="24h"` and `minuteStep` adjust the clock.

## How do I block past dates or limit `DatePickerBlock` to a date window?

Use `disablePast` to grey out every day before today, or `minDate` and `maxDate` for an inclusive window. You can combine `disablePast` with `minDate`; the later lower bound wins. Disabled days cannot be selected, and with `showTime` the times already passed today are disabled too.

## Can `DatePickerBlock` start the week on Sunday?

Yes. Pass `weekStartsOn={0}` for a Sunday-first grid; the default is `1`, which starts on Monday. The setting only changes the column order and leading days of each month, and it applies to every variant, including the inline `variant="calendar"` card.

## Does `DatePickerBlock` need date-fns or another date library?

No. It does its calendar math with the native `Date` object and formats with `Intl.DateTimeFormat` in `en-US`. The only npm dependency is `lucide-react`, and the file has no `next/*` imports, so it installs the same way in Next.js and Vite projects. `onChange` hands you a plain `Date`.

## How do I change the accent colour of the date picker?

Set `color` to `"primary"` (the default, following your theme token), `"indigo"`, `"rose"`, `"emerald"`, `"zinc"`, or a hex string such as `"#0ea5e9"`. It tints the focus ring, the selected day and the **Done** button. `variant` and `inputSize` control the trigger's look and size.

## Is `DatePickerBlock` accessible to keyboard and screen-reader users?

The trigger is a native `button`, each day is a `button` with a full-date `aria-label` and `aria-pressed`, and the month arrows are labelled. A closed popover is `inert`, so it leaves the tab order. It closes on an outside click or **Done**, not on Escape. Animations become instant under `prefers-reduced-motion`.

---

Live previews and every example: https://avaraui.com/docs/nextjs/date-picker
