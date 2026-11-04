---
title: "Shadcn Book Appointment"
description: "Shadcn Book Appointment. A booking section with a practitioner's profile, star ratings."
url: https://avaraui.com/docs/nextjs/book-appointment
---

# Shadcn Book Appointment

A booking flow for a page that ends in an appointment: a practitioner's portrait and contact details, their scores as stars, two small charts, and a booking panel with a strip of days, time slots in groups, a button that reads back the choice, and a confirmation that draws itself in once the booking is made.

`BookAppointment` is a section built from library pieces. The surface is [Glass Panel](https://avaraui.com/docs/reactjs/glass-panel) (`GlassBackdrop` and `GlassPanel`), the scores are [Half Stars](https://avaraui.com/docs/reactjs/half-stars), and the booking panel is [Booking Card](https://avaraui.com/docs/reactjs/booking-card) — a compound component that can be dropped into any panel on any page. Hand it a `practitioner`, some `slotGroups` and an `onBook`, and it lays the page out.

## Clinic booking page

Pick a day and a time, press Book — the button stays busy while your onBook promise runs, then the check draws itself and the details rise in.

- `practitioner` fills the portrait, contact list, name, overall score and summary. `shortName` is how the confirmation refers to them; contact rows are left out when their field is missing.
- `slotGroups` are the times on offer, one `BookingCard.Slots` group per entry. Mark a slot `taken` to show it struck through.
- Return a promise from `onBook` and the button stays busy until it settles — resolve to show the confirmation, throw to drop back to the form.
- `unavailable=(day) => day.getDay() === 0` strikes out days with nothing free. Sundays here; feed it your real availability.
- `scores` render as `HalfStars` with fractional fill. `visitReasons` and `activities` are `ChartBlock`s — a `donut-legend` and a `stacked-bar`; leave either out and its panel is not drawn.

```tsx
const DOCTOR = {
  name: "Dr. Priya Nair, MD",
  shortName: "Dr. Nair",
  specialties: "Cardiology and general internal medicine",
  practice: "Riverside Heart & Medical Group",
  photo:
    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_687,c_limit/v1790145142/photo-1638202993928-7267aad84c31-1790145143494.jpg",
  photoAlt: "Portrait of Dr. Priya Nair wearing a lab coat and stethoscope",
  rating: 4.8,
  reviews: 38,
  summary:
    "Reviewers call Dr. Nair careful and approachable. Her heart-care knowledge and plain-spoken answers stand out; some note slow replies to phone messages.",
  location: "Brooklyn, NY, Riverside Heart & Medical Group",
  phone: "(718) 555-0142",
  email: "drnair@example.com",
  languages: "English, Hindi",
};

const SCORES = [
  { label: "Punctuality", value: 4.63 },
  { label: "Warmth and care", value: 4.19 },
  { label: "Explains things well", value: 4.74 },
];

const VISIT_REASONS = [
  { label: "Blood pressure care", value: 35 },
  { label: "Heart health check-ups", value: 25 },
  { label: "Heart failure follow-up", value: 22 },
  { label: "Chest pain workup", value: 18 },
];

const ACTIVITIES = [
  { label: "Clinic", value: 47 },
  { label: "Studies", value: 24 },
  { label: "Mentoring", value: 16 },
  { label: "Paperwork", value: 10 },
  { label: "Other", value: 3 },
];

const SLOT_GROUPS = [
  {
    label: "Morning",
    slots: [{ label: "9:00 AM" }, { label: "10:00 AM" }, { label: "11:00 AM", taken: true }],
  },
  {
    label: "Afternoon",
    slots: [{ label: "12:00 PM" }, { label: "1:00 PM" }, { label: "2:00 PM" }, { label: "3:00 PM", taken: true }],
  },
];

export default function BookAppointmentPage() {
  return (
    <BookAppointment
      aurora={["#c4b5fd", "#99f6e4", "#fde68a"]}
      practitioner={DOCTOR}
      scores={SCORES}
      visitReasons={VISIT_REASONS}
      activities={ACTIVITIES}
      slotGroups={SLOT_GROUPS}
      unavailable={(d) => d.getDay() === 0}
      onBook={async ({ day, slot }) => {
        await fetch("/api/book", { method: "POST", body: JSON.stringify({ day, slot }) });
      }}
      className="min-h-dvh"
    />
  );
}
```

## Solid

No glass: the same booking on white cards with an ordinary shadow. The booker itself is surface-neutral, so nothing inside it changes.

- Set `variant="solid"` and every panel becomes a solid card; the aurora is not drawn. Days, slots and the confirmation use neutral inks that read on either surface.

```tsx
const DOCTOR = {
  name: "Dr. Priya Nair, MD",
  shortName: "Dr. Nair",
  specialties: "Cardiology and general internal medicine",
  practice: "Riverside Heart & Medical Group",
  photo:
    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_687,c_limit/v1790145142/photo-1638202993928-7267aad84c31-1790145143494.jpg",
  photoAlt: "Portrait of Dr. Priya Nair wearing a lab coat and stethoscope",
  rating: 4.8,
  reviews: 38,
  summary:
    "Reviewers call Dr. Nair careful and approachable. Her heart-care knowledge and plain-spoken answers stand out; some note slow replies to phone messages.",
  location: "Brooklyn, NY, Riverside Heart & Medical Group",
  phone: "(718) 555-0142",
  email: "drnair@example.com",
  languages: "English, Hindi",
};

const SCORES = [
  { label: "Punctuality", value: 4.63 },
  { label: "Warmth and care", value: 4.19 },
  { label: "Explains things well", value: 4.74 },
];

const VISIT_REASONS = [
  { label: "Blood pressure care", value: 35 },
  { label: "Heart health check-ups", value: 25 },
  { label: "Heart failure follow-up", value: 22 },
  { label: "Chest pain workup", value: 18 },
];

const ACTIVITIES = [
  { label: "Clinic", value: 47 },
  { label: "Studies", value: 24 },
  { label: "Mentoring", value: 16 },
  { label: "Paperwork", value: 10 },
  { label: "Other", value: 3 },
];

const SLOT_GROUPS = [
  {
    label: "Morning",
    slots: [{ label: "9:00 AM" }, { label: "10:00 AM" }, { label: "11:00 AM", taken: true }],
  },
  {
    label: "Afternoon",
    slots: [{ label: "12:00 PM" }, { label: "1:00 PM" }, { label: "2:00 PM" }, { label: "3:00 PM", taken: true }],
  },
];

export default function BookAppointmentPage() {
  return (
    <BookAppointment
      variant="solid"
      practitioner={DOCTOR}
      scores={SCORES}
      visitReasons={VISIT_REASONS}
      activities={ACTIVITIES}
      slotGroups={SLOT_GROUPS}
      unavailable={(d) => d.getDay() === 0}
      onBook={async ({ day, slot }) => {
        await fetch("/api/book", { method: "POST", body: JSON.stringify({ day, slot }) });
      }}
      className="min-h-dvh"
    />
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/book-appointment.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/book-appointment
```

## Just the booking panel

The booking panel is its own component, [Booking Card](https://avaraui.com/docs/reactjs/booking-card), and works inside any panel — not only this page. Give it the panel's padding so the confirmation reaches the edges.

```tsx
import { BookingCard } from "@/components/custom/blocks/BookingCardBlock";
import { GlassBackdrop, GlassPanel } from "@/components/custom/blocks/GlassPanelBlock";

const MORNING = [{ label: "9:00 AM" }, { label: "10:00 AM" }, { label: "11:00 AM", taken: true }];
const AFTERNOON = [{ label: "1:00 PM" }, { label: "2:00 PM" }, { label: "3:00 PM" }];

export default function Booking() {
  return (
    <GlassBackdrop className="rounded-[36px]">
      <GlassPanel shape="slab" className="lg:col-span-4">
        <BookingCard
          className="flex h-full flex-col gap-5 p-6"
          onBook={async ({ day, slot }) => {
            await fetch("/api/book", { method: "POST", body: JSON.stringify({ day, slot }) });
          }}
        >
          <h2 className="text-lg font-semibold tracking-tight">Schedule a visit</h2>
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

Choosing a new day clears the slot, since availability changes with the day. The submit button is disabled until both are chosen, and once they are it reads the choice back — *Book now, Wed 25 at 9:00 AM* — so nobody confirms blind.

## Features

### Built from the library

Glass Panel for the surface, Half Stars for the scores, Chart for the donut and bar, Booking Card for the booking. Install this one item and all four come with it.

### A confirmation that shows what happened

When onBook resolves, a check draws itself over the form and the day, time and place rise in beneath it. Book another clears it. It holds still under prefers-reduced-motion.

### Keyboard and screen reader ready

Days and slots are radio groups with full date names; taken slots and closed days are disabled, not hidden; the busy button carries aria-busy and the confirmation is a status region.

### Honest about today

The default days are built on the client, so a server render never guesses the visitor's date. They start today and page forward a week at a time — the previous arrow never reaches into the past. Pass your own days array to offer a different range.

## Props Reference

### BookAppointment

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `practitioner` | `Practitioner` | — | Who the page is about. See the shape below. |
| `slotGroups` | `&#123; label: string; slots: &#123; label: string; taken?: boolean &#125;[] &#125;[]` | — | Times on offer, grouped, e.g. Morning and Afternoon. |
| `onBook` | `(booking: &#123; day: Date; slot: string &#125;) => void \| Promise<void>` | — | Called on confirm. Return a promise to hold the busy state; a rejection returns to the form. |
| `unavailable` | `(day: Date) => boolean` | — | Days with nothing free — struck through, not selectable. |
| `scores` | `&#123; label: string; value: number &#125;[]` | `[]` | Named scores out of 5, shown as `HalfStars` under the summary. |
| `visitReasons` | `&#123; label: string; value: number &#125;[]` | — | Shares in percent for the donut. Omit to leave the panel out. |
| `activities` | `&#123; label: string; value: number &#125;[]` | — | Shares in percent for the stacked bar. Omit to leave the panel out. |
| `bookingHeading` | `string` | `&quot;Schedule a visit&quot;` | Heading over the booking panel. |
| `variant` | `&quot;glass&quot; \| &quot;solid&quot;` | `&quot;glass&quot;` | Frosted panels over an aurora, or solid cards with a shadow. |
| `aurora` | `[string, string, string]` | violet, teal, amber | The three colours washed behind the glass. Ignored by `solid`. |
| `className` | `string` | — | Applied to the page shell. Any other prop is spread there too. |

### Practitioner

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | Full name for the heading, e.g. `&quot;Dr. Priya Nair, MD&quot;`. |
| `shortName` | `string` | How the confirmation refers to them, e.g. `&quot;Dr. Nair&quot;`. Falls back to `name`. |
| `specialties` | `string` | One line under the name. |
| `practice` | `string` | Where they work; appended to the confirmation. |
| `photo`, `photoAlt` | `string` | The portrait and its alt text. |
| `rating`, `reviews` | `number` | Overall score out of 5 and the number of reviews behind it. |
| `summary` | `string` | A short read of what patients say. |
| `location`, `phone`, `email`, `languages` | `string` | Contact rows. Each is optional; a missing one is simply not drawn. Phone and email become links. |

### BookingCard

The booking panel's own props — `onBook`, `BookingCard.Days`, `BookingCard.Slots`, `BookingCard.Submit`, `BookingCard.Confirmation` — are documented on the [Booking Card](https://avaraui.com/docs/reactjs/booking-card) page.

---

Live previews and every example: https://avaraui.com/docs/nextjs/book-appointment
