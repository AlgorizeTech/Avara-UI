---
title: "Shadcn Booking Card"
description: "Shadcn Booking Card. A booking panel for any card: a week-paged strip of days, grouped time slots, a button that reads the choice back."
url: https://avaraui.com/docs/nextjs/booking-card
---

# Shadcn Booking Card

A booking panel that goes inside any card: a strip of days paged a week at a time, time slots in groups, a button that reads the choice back before anyone confirms, and a confirmation that draws itself in over the form once the booking is made.

`BookingCard` is a compound component. It holds the chosen day and slot; `BookingCard.Days`, `BookingCard.Slots`, `BookingCard.Submit` and `BookingCard.Confirmation` go inside it in whatever layout the panel needs. It draws no surface of its own, so it sits as comfortably in a plain bordered card as in a glass slab from [Glass Panel](https://avaraui.com/docs/reactjs/glass-panel) — the [Book Appointment](https://avaraui.com/docs/reactjs/book-appointment) section is the same card on a full page.

## In a card

Pick a day and a time, press Book — the button stays busy while your onBook promise runs, then the check draws itself and the details rise in.

- `BookingCard` holds the chosen day and slot. Put `BookingCard.Days`, `BookingCard.Slots`, `BookingCard.Submit` and `BookingCard.Confirmation` inside it in any layout; the confirmation covers the `BookingCard` it sits in — so give the `BookingCard` the panel's padding (heading included) and the cover reaches the panel's edges and corners.
- Return a promise from `onBook` and the button stays busy until it settles — resolve to show the confirmation, throw to drop back to the form.
- `unavailable=(day) => day.getDay() === 0` on `BookingCard.Days` strikes out days with nothing free. Sundays here; feed it your real availability.
- The Book button, the check and every focus ring take `--primary` so the card follows your theme — pick a colour above to see it. Selected days and slots stay a neutral ink that reads on glass or solid.
- The arrows page `BookingCard.Days` a week at a time, up to `horizon` days out (90 by default). Days start today, so the previous arrow is disabled on the first page — nobody can book into the past.

```tsx
const MORNING = [{ label: "9:00 AM" }, { label: "10:00 AM" }, { label: "11:00 AM", taken: true }];
const AFTERNOON = [{ label: "12:00 PM" }, { label: "1:00 PM" }, { label: "2:00 PM" }, { label: "3:00 PM", taken: true }];

export default function Booking() {
  return (
    <div className="w-full max-w-md rounded-3xl border border-border bg-card text-card-foreground shadow-sm">
      <BookingCard
        className="flex h-full flex-col gap-5 p-6"
        onBook={async ({ day, slot }) => {
          await fetch("/api/book", { method: "POST", body: JSON.stringify({ day, slot }) });
        }}
      >
        <h2 className="text-lg font-semibold tracking-tight">Book an appointment</h2>
        <BookingCard.Days unavailable={(d) => d.getDay() === 0} />
        <div className="space-y-4">
          <p className="text-sm font-semibold">Time</p>
          <BookingCard.Slots label="Morning" slots={MORNING} />
          <BookingCard.Slots label="Afternoon" slots={AFTERNOON} />
        </div>
        <BookingCard.Submit className="mt-auto" />
        <BookingCard.Confirmation withName="Dr. Nair" place="Riverside Heart & Medical Group" />
      </BookingCard>
    </div>
  );
}
```

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

## Examples

### In a glass slab

The same card inside a GlassPanel from Glass Panel. Nothing inside the card changes — it is surface-neutral by design.

- Wrap it in a `GlassPanel` and the card takes the panel's corners: its root is `rounded-[inherit]`, so the confirmation's cover matches whatever shape it sits in.

```tsx
const MORNING = [{ label: "9:00 AM" }, { label: "10:00 AM" }, { label: "11:00 AM", taken: true }];
const AFTERNOON = [{ label: "12:00 PM" }, { label: "1:00 PM" }, { label: "2:00 PM" }, { label: "3:00 PM", taken: true }];

export default function Booking() {
  return (
    <GlassBackdrop className="w-full max-w-md rounded-[36px]">
      {/* The card is the panel's whole inside, so the confirmation reaches
          the panel's edges and corners instead of stopping at the padding. */}
      <GlassPanel shape="slab" className="col-span-full">
        <BookingCard
          className="flex h-full flex-col gap-5 p-6"
          onBook={async ({ day, slot }) => {
            await fetch("/api/book", { method: "POST", body: JSON.stringify({ day, slot }) });
          }}
        >
          <h2 className="text-lg font-semibold tracking-tight">Book an appointment</h2>
          <BookingCard.Days unavailable={(d) => d.getDay() === 0} />
          <div className="space-y-4">
            <p className="text-sm font-semibold">Time</p>
            <BookingCard.Slots label="Morning" slots={MORNING} />
            <BookingCard.Slots label="Afternoon" slots={AFTERNOON} />
          </div>
          <BookingCard.Submit className="mt-auto" />
          <BookingCard.Confirmation withName="Dr. Nair" place="Riverside Heart & Medical Group" />
        </BookingCard>
      </GlassPanel>
    </GlassBackdrop>
  );
}
```

### Liquid glass

The booking card rendered inside a liquid-glass refraction surface.

- Set variant to `liquid-glass` on `GlassBackdrop` to render realistic SVG fluid refraction with pure white glass elements.

```tsx
const MORNING = [{ label: "9:00 AM" }, { label: "10:00 AM" }, { label: "11:00 AM", taken: true }];
const AFTERNOON = [{ label: "12:00 PM" }, { label: "1:00 PM" }, { label: "2:00 PM" }, { label: "3:00 PM", taken: true }];

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
        <div className="space-y-4">
          <p className="text-sm font-semibold">Time</p>
          <BookingCard.Slots label="Morning" slots={MORNING} />
          <BookingCard.Slots label="Afternoon" slots={AFTERNOON} />
        </div>
        <BookingCard.Submit className="mt-auto" />
        <BookingCard.Confirmation withName="Dr. Nair" place="Riverside Heart & Medical Group" />
      </BookingCard>
    </GlassBackdrop>
  );
}
```

Choosing a new day clears the slot, since availability changes with the day. The submit button is disabled until both are chosen, and once they are it reads the choice back — *Book now, Wed 25 at 9:00 AM* — so nobody confirms blind.

## Features

### One state, any layout

Days, slots and the button share one context. Stack them, put them side by side, split them across panels — the card does not care.

### A confirmation that shows what happened

When onBook resolves, a check draws itself over the form and the day, time and place rise in beneath it. Book another clears it. It holds still under prefers-reduced-motion.

### Keyboard and screen reader ready

Days and slots are radio groups with full date names; taken slots and closed days are disabled, not hidden; the busy button carries aria-busy and the confirmation is a status region.

### Honest about today

The default days are built on the client, so a server render never guesses the visitor's date. They start today and page forward a week at a time — the previous arrow never reaches into the past. Pass your own days array to offer a different range.

## Props Reference

### BookingCard

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onBook` | `(booking: &#123; day: Date; slot: string &#125;) => void \| Promise<void>` | — | Called on confirm. Return a promise to hold the busy state; a rejection returns to the form. |
| `className` | `string` | — | Layout of the parts inside. The confirmation is positioned against this element. |

### BookingCard.Days

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `days` | `Date[]` | today → `horizon` | Days on offer, in order, paged `count` at a time with the previous/next arrows. The default is built on the client so the server never guesses today, and it starts today — there is no paging back into the past. |
| `count` | `number` | `7` | Days shown per page. |
| `horizon` | `number` | `90` | How far ahead the default days run, in days from today. Ignored when `days` is given. |
| `unavailable` | `(day: Date) => boolean` | — | Days with nothing free — shown struck through, not selectable. |

### BookingCard.Slots

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | — | Group title, e.g. `&quot;Morning&quot;`. |
| `slots` | `&#123; label: string; taken?: boolean &#125;[]` | — | Times in the group. Disabled until a day is chosen; `taken` slots are shown struck through. |

### BookingCard.Submit

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | `&quot;Book now&quot;` | Button text. Once a day and slot are chosen it reads back the choice, e.g. Book now, Wed 25 at 9:00 AM. |

### BookingCard.Confirmation

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `withName` | `string` | — | Who the appointment is with. |
| `place` | `string` | — | Where, appended after the name. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/booking-card
