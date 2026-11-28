---
title: "Shadcn Booking Card"
description: "Shadcn Booking Card. A booking panel for any card: a week-paged strip of days, grouped time slots, a button that reads the choice back."
url: https://avaraui.com/docs/nextjs/booking-card
---

# Shadcn Booking Card

A surface-neutral compound appointment widget (`BookingCard`, `BookingCard.Days`, `BookingCard.Times`, `BookingCard.Submit`, `BookingCard.Confirmation`) with async booking confirmation.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/booking-card.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/booking-card
```

## In a card

Pick a day and a time, then press Book. The button stays busy while your `onBook` promise runs, then the confirmation draws itself in.

- `BookingCard` holds the chosen day and slot. Its confirmation covers it, so give it the panel's padding, heading included, and the cover reaches the panel's edges.
- Return a promise from `onBook` and the button stays busy until it settles: resolve to show the confirmation, throw to drop back to the form.
- `unavailable=(day) => day.getDay() === 0` on `BookingCard.Days` strikes out days with nothing free. Sundays here; feed it your real availability.

```tsx
import { BookingCard } from "@/components/custom/blocks/BookingCardBlock";

const SLOTS = [{ label: "9:00 AM" }, { label: "10:00 AM" }, { label: "11:00 AM", taken: true }, { label: "1:00 PM" }, { label: "2:00 PM" }, { label: "3:00 PM" }];

export default function Booking() {
  return (
    <div className="w-full max-w-md rounded-[2rem] bg-[#F7F7F6] p-3 dark:bg-background/50">
      <div className="rounded-[1.75rem] bg-card text-card-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.18)]">
        <BookingCard
          className="flex h-full flex-col gap-5 p-6"
          onBook={async ({ day, slot }) => {
            await fetch("/api/book", { method: "POST", body: JSON.stringify({ day, slot }) });
          }}
        >
          <h2 className="text-lg font-semibold tracking-tight">Book an appointment</h2>
          <BookingCard.Days unavailable={(d) => d.getDay() === 0} />
          <BookingCard.Times slots={SLOTS} />
          <BookingCard.Submit className="mt-auto" />
          <BookingCard.Confirmation withName="Dr. Nair" place="Riverside Heart & Medical Group" />
        </BookingCard>
      </div>
    </div>
  );
}
```

## Liquid glass

The booking card rendered inside a liquid-glass refraction surface.

- Set variant to `liquid-glass` on `GlassBackdrop` to render realistic SVG fluid refraction with pure white glass elements.

```tsx
import { BookingCard } from "@/components/custom/blocks/BookingCardBlock";
import { GlassBackdrop } from "@/components/custom/blocks/GlassPanelBlock";

const SLOTS = [{ label: "9:00 AM" }, { label: "10:00 AM" }, { label: "11:00 AM", taken: true }, { label: "1:00 PM" }, { label: "2:00 PM" }, { label: "3:00 PM" }];

export default function Booking() {
  return (
    <GlassBackdrop variant="liquid-glass" className="w-full max-w-full h-full min-h-full rounded-[36px]">
      <BookingCard
        className="col-span-full flex h-full flex-col gap-5 p-6"
        onBook={async ({ day, slot }) => {
          await fetch("/api/book", { method: "POST", body: JSON.stringify({ day, slot }) });
        }}
      >
        <h2 className="text-lg font-semibold tracking-tight">Book an appointment</h2>
        <BookingCard.Days unavailable={(d) => d.getDay() === 0} />
        <BookingCard.Times slots={SLOTS} />
        <BookingCard.Submit className="mt-auto" />
        <BookingCard.Confirmation withName="Dr. Nair" place="Riverside Heart & Medical Group" />
      </BookingCard>
    </GlassBackdrop>
  );
}
```

## About Shadcn Booking Card

**What it is.** `BookingCard` is a compound component for picking a day and a time. Its parts are `BookingCard.Month`, `BookingCard.Days`, `BookingCard.Times`, `BookingCard.Submit` and `BookingCard.Confirmation`, all sharing one selection through React context. It draws no surface of its own, so it sits inside any card or panel.

**How it is built.** The default days are built on the client so the server never guesses the visitor's timezone. Choosing a new day clears the chosen time. Pressing Submit runs your `onBook`, and when it resolves the button turns green and the confirmation replaces the form. All motion is CSS and holds still under `prefers-reduced-motion`.

**When to use it.** Use `BookingCard` inside any [Card](https://avaraui.com/docs/reactjs/card) or [Glass Panel](https://avaraui.com/docs/reactjs/glass-panel) for appointment pickers. For a full-page scheduling layout, see [Book Appointment](https://avaraui.com/docs/reactjs/book-appointment).

## For AI agents

**When to use**

- Day + time-slot appointment pickers inside a card or glass panel (`BookingCard.Days`, `BookingCard.Times`, `BookingCard.Submit`, `BookingCard.Confirmation`)

**When not to use**

- Multi-day date ranges or hotel pricing: use [Range Date Picker](https://avaraui.com/docs/reactjs/range-date-picker)
- Full Month/Week/Day event dashboards: use [Calendar](https://avaraui.com/docs/reactjs/calendar)

**Agent notes**

- Named export: `import { BookingCard } from "@/components/custom/blocks/BookingCardBlock"`. The parts are properties of `BookingCard`, not separate imports.
- `onBook` receives `{ day: Date, slot: string }`. Resolving shows `BookingCard.Confirmation`; rejecting quietly returns to the form, so show your own error message.
- Keep `BookingCard.Confirmation` a direct child of `BookingCard`: once booked, every other direct child is hidden and the confirmation takes its place.
- Pass `slots` as `{ label, taken? }[]` to `BookingCard.Times`; slots stay disabled until a day is chosen.
- Add `BookingCard.Month` for a month and year picker; without it, `BookingCard.Days` lists today plus `horizon` (60) days.

## Props Reference

### BookingCard

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onBook` | `(booking: &#123; day: Date; slot: string &#125;) => void \| Promise<void>` | — | Called on confirm. Return a promise to hold the busy state; a rejection returns to the form. |
| `className` | `string` | — | Layout of the parts inside. The confirmation is positioned against this element. |

### BookingCard.Days

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `days` | `Date[]` | today → `horizon` | Days on offer, in order. One line with a fixed height — a short month sits centred in it — that scrolls or pages with the arrows. The default is built on the client so the server never guesses today, and it starts today. |
| `horizon` | `number` | `60` | How far ahead the default days run, in days from today. Ignored when `days` is given. |
| `unavailable` | `(day: Date) => boolean` | — | Days with nothing free — shown struck through, not selectable. |

### BookingCard.Times

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `slots` | `&#123; label: string; taken?: boolean &#125;[]` | — | Every time, in order, on one scrolling line. Disabled until a day is chosen; `taken` slots are shown struck through. |
| `label` | `string` | `&quot;Select a time&quot;` | Title above the line. |

### BookingCard.Submit

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | `&quot;Book now&quot;` | Button text. The button stays disabled until a day and slot are chosen, then shows Booking while `onBook` runs and Booking complete after. |

### BookingCard.Month

Optional month and year picker. Without it, `BookingCard.Days` runs from today.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `count` | `number` | `24` | How many months, starting with the current one, can be chosen. The rest of the grid is greyed out. |
| `className` | `string` | `undefined` | Classes for the month trigger. |

### BookingCard.Confirmation

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `withName` | `string` | — | Who the appointment is with. |
| `place` | `string` | — | Where, appended after the name. |
| `title` | `ReactNode` | `"You&apos;re booked"` | Heading under the check badge. |
| `description` | `ReactNode` | `"We sent the details to your inbox. See you soon."` | Line under the heading. |
| `onAddToCalendar` | `(booking: { day: Date; slot: string }) => void \| Promise<void>` | `undefined` | Called by the Add to calendar button. Return a promise to keep it loading until the event is added. Without it the button only plays its loading and added states. |
| `className` | `string` | `undefined` | Classes for the confirmation panel. |

## Works with other components

- Wrap `BookingCard` inside [Card](https://avaraui.com/docs/reactjs/card) or [Glass Panel](https://avaraui.com/docs/reactjs/glass-panel); its root is `rounded-[inherit]`, so the confirmation cover matches the outer corners.
- See [Book Appointment](https://avaraui.com/docs/reactjs/book-appointment) for a full-page section built around `BookingCard`.
- Use [Calendar](https://avaraui.com/docs/reactjs/calendar) instead when people need a full month view of existing events, not a single booking.

## How does BookingCard handle async submission and errors?

Return a promise from `onBook`. While it runs, `BookingCard.Submit` is disabled and sets `aria-busy`. On success the button turns green for about 1.3 seconds before the confirmation takes over. On a rejection the card quietly returns to the form with the choice kept, so show your own error text.

## How do I mark days and time slots as unavailable in BookingCard?

Pass `unavailable={(day) => ...}` to `BookingCard.Days` to strike out days, and set `taken: true` on a slot in `BookingCard.Times`. Both stay visible but cannot be selected. By default the days run from today for `horizon` days (60), or you can pass your own `days` array.

## How do I add a month picker to BookingCard?

Place `<BookingCard.Month />` above `BookingCard.Days`. It opens a month and year grid, `count` months wide (24 by default), and `Days` then lists only the chosen month, starting from today in the current one. Picking a month that does not contain the selected day clears that day and slot.

## Why must BookingCard.Confirmation be a direct child of BookingCard?

Once the booking succeeds, `BookingCard` hides every direct child except the confirmation and puts the confirmation in their place. If you nest `BookingCard.Confirmation` inside a wrapper, that wrapper is hidden with the form and the confirmation never shows. Headings and other parts can be siblings of it.

## How do I add an Add to calendar action to BookingCard?

The confirmation already has Change and Add to calendar buttons. Pass `onAddToCalendar` to `BookingCard.Confirmation`; it receives `{ day, slot }`, and returning a promise keeps the button on Adding until it settles. Change returns to the form with the day and time kept. Without the prop, the button only plays its states.

## Is BookingCard accessible and does it respect reduced motion?

Days and times are `role="radio"` buttons inside labelled radio groups, with the full date as each day's `aria-label`. The month grid is a dialog that closes on Escape, and the confirmation is a `role="status"` region that takes focus. A `prefers-reduced-motion` rule switches its CSS animations off.

---

Live previews and every example: https://avaraui.com/docs/nextjs/booking-card
