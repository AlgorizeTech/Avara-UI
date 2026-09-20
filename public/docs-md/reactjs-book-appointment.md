# Book Appointment

A booking flow for a page that ends in an appointment: a practitioner's portrait and contact details, their scores as stars, two small charts, and a booking panel with a strip of days, time slots in groups, a button that reads back the choice, and a confirmation that draws itself in once the booking is made.

`BookAppointment` is a section built from library pieces. The surface is Glass Panel (`GlassBackdrop` and `GlassPanel`), the scores are Half Stars, and the booking panel is Booking Card — a compound component that can be dropped into any panel on any page. Hand it a `practitioner`, some `slotGroups` and an `onBook`, and it lays the page out.

export const usagePage = `const DOCTOR = {
  name: "Dr. Emily Chen, MD",
  shortName: "Dr. Chen",
  specialties: "Internal medicine, Cardiology",
  practice: "Manhattan Health Associates",
  photo:
    "https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  photoAlt: "Dr. Emily Chen in a white coat with a stethoscope",
  rating: 4.8,
  reviews: 38,
  summary:
    "Patients describe Dr. Chen as thorough and easy to talk to. They value her cardiology expertise and clear explanations; a few mention delays getting a callback.",
  location: "New York, NY, Manhattan Health Associates",
  phone: "(212) 555-7890",
  email: "drchen@example.com",
  languages: "English, Spanish",
};

const SCORES = [
  { label: "Wait time", value: 4.63 },
  { label: "Bedside manner", value: 4.19 },
  { label: "Clear explanations", value: 4.74 },
];

const VISIT_REASONS = [
  { label: "Hypertension management", value: 35 },
  { label: "Preventive cardiology", value: 25 },
  { label: "Heart failure monitoring", value: 22 },
  { label: "Chest pain evaluation", value: 18 },
];

const ACTIVITIES = [
  { label: "Clinical", value: 47 },
  { label: "Research", value: 24 },
  { label: "Teaching", value: 16 },
  { label: "Admin", value: 10 },
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
     d.getDay() === 0}
      onBook={async ({ day, slot }) => {
        await fetch("/api/book", { method: "POST", body: JSON.stringify({ day, slot }) });
      }}
      className="min-h-dvh"
    />
  );
}
`;

export const usagePageSolid = `const DOCTOR = {
  name: "Dr. Emily Chen, MD",
  shortName: "Dr. Chen",
  specialties: "Internal medicine, Cardiology",
  practice: "Manhattan Health Associates",
  photo:
    "https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  photoAlt: "Dr. Emily Chen in a white coat with a stethoscope",
  rating: 4.8,
  reviews: 38,
  summary:
    "Patients describe Dr. Chen as thorough and easy to talk to. They value her cardiology expertise and clear explanations; a few mention delays getting a callback.",
  location: "New York, NY, Manhattan Health Associates",
  phone: "(212) 555-7890",
  email: "drchen@example.com",
  languages: "English, Spanish",
};

const SCORES = [
  { label: "Wait time", value: 4.63 },
  { label: "Bedside manner", value: 4.19 },
  { label: "Clear explanations", value: 4.74 },
];

const VISIT_REASONS = [
  { label: "Hypertension management", value: 35 },
  { label: "Preventive cardiology", value: 25 },
  { label: "Heart failure monitoring", value: 22 },
  { label: "Chest pain evaluation", value: 18 },
];

const ACTIVITIES = [
  { label: "Clinical", value: 47 },
  { label: "Research", value: 24 },
  { label: "Teaching", value: 16 },
  { label: "Admin", value: 10 },
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
     d.getDay() === 0}
      onBook={async ({ day, slot }) => {
        await fetch("/api/book", { method: "POST", body: JSON.stringify({ day, slot }) });
      }}
      className="min-h-dvh"
    />
  );
}
`;

 day.getDay() === 0",
          effect:
            "strikes out days with nothing free. Sundays here; feed it your real availability.",
        },
        {
          prop: "scores",
          effect:
            "render as `HalfStars` with fractional fill. `visitReasons` and `activities` are `ChartBlock`s — a `donut-legend` and a `stacked-bar`; leave either out and its panel is not drawn.",
        },
      ],
      props: { rounded: true },
      usage: usagePage,
      code: extractCode("src/components/custom/blocks/BookAppointmentBlock.tsx"),
      minHeight: 980,
    },
    {
      title: "Solid",
      subheading: "No glass: the same booking on white cards with an ordinary shadow. The booker itself is surface-neutral, so nothing inside it changes.",
      propNotes: [
        {
          lead: "Set",
          prop: "variant",
          value: '"solid"',
          effect:
            "and every panel becomes a solid card; the aurora is not drawn. Days, slots and the confirmation use neutral inks that read on either surface.",
        },
      ],
      props: { rounded: true, variant: "solid" },
      usage: usagePageSolid,
      minHeight: 980,
    },
  ]}
/>

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/book-appointment
```

## Just the booking panel

The booking panel is its own component, Booking Card, and works inside any panel — not only this page. Give it the panel's padding so the confirmation reaches the edges.

```tsx

const MORNING = [{ label: "9:00 AM" }, { label: "10:00 AM" }, { label: "11:00 AM", taken: true }];
const AFTERNOON = [{ label: "1:00 PM" }, { label: "2:00 PM" }, { label: "3:00 PM" }];

export default function Booking() {
  return (

         {
            await fetch("/api/book", { method: "POST", body: JSON.stringify({ day, slot }) });
          }}
        >
          Book an appointment
           d.getDay() === 0} />
          
            Time

  );
}
```

Choosing a new day clears the slot, since availability changes with the day. The submit button is disabled until both are chosen, and once they are it reads the choice back — *Book now, Wed 25 at 9:00 AM* — so nobody confirms blind.

## Features

    Built from the library
    Glass Panel for the surface, Half Stars for the scores, Chart for the donut and bar, Booking Card for the booking. Install this one item and all four come with it.

    A confirmation that shows what happened
    When onBook resolves, a check draws itself over the form and the day, time and place rise in beneath it. Book another clears it. It holds still under prefers-reduced-motion.

    Keyboard and screen reader ready
    Days and slots are radio groups with full date names; taken slots and closed days are disabled, not hidden; the busy button carries aria-busy and the confirmation is a status region.

    Honest about today
    The default days are built on the client, so a server render never guesses the visitor's date. They start today and page forward a week at a time — the previous arrow never reaches into the past. Pass your own days array to offer a different range.

## Props Reference

### BookAppointment

        Prop
        Type
        Default
        Description

        practitioner
        Practitioner
        —
        Who the page is about. See the shape below.

        slotGroups
        &#123; label: string; slots: &#123; label: string; taken?: boolean &#125;[] &#125;[]
        —
        Times on offer, grouped, e.g. Morning and Afternoon.

        onBook
        (booking: &#123; day: Date; slot: string &#125;) =&gt; void | Promise&lt;void&gt;
        —
        Called on confirm. Return a promise to hold the busy state; a rejection returns to the form.

        unavailable
        (day: Date) =&gt; boolean
        —
        Days with nothing free — struck through, not selectable.

        scores
        &#123; label: string; value: number &#125;[]
        []
        Named scores out of 5, shown as HalfStars under the summary.

        visitReasons
        &#123; label: string; value: number &#125;[]
        —
        Shares in percent for the donut. Omit to leave the panel out.

        activities
        &#123; label: string; value: number &#125;[]
        —
        Shares in percent for the stacked bar. Omit to leave the panel out.

        bookingHeading
        string
        &quot;Book an appointment&quot;
        Heading over the booking panel.

        variant
        &quot;glass&quot; | &quot;solid&quot;
        &quot;glass&quot;
        Frosted panels over an aurora, or solid cards with a shadow.

        aurora
        [string, string, string]
        violet, teal, amber
        The three colours washed behind the glass. Ignored by solid.

        className
        string
        —
        Applied to the page shell. Any other prop is spread there too.

### Practitioner

        Field
        Type
        Description

        name
        string
        Full name for the heading, e.g. &quot;Dr. Emily Chen, MD&quot;.

        shortName
        string
        How the confirmation refers to them, e.g. &quot;Dr. Chen&quot;. Falls back to name.

        specialties
        string
        One line under the name.

        practice
        string
        Where they work; appended to the confirmation.

        photo, photoAlt
        string
        The portrait and its alt text.

        rating, reviews
        number
        Overall score out of 5 and the number of reviews behind it.

        summary
        string
        A short read of what patients say.

        location, phone, email, languages
        string
        Contact rows. Each is optional; a missing one is simply not drawn. Phone and email become links.

### BookingCard

The booking panel's own props — `onBook`, `BookingCard.Days`, `BookingCard.Slots`, `BookingCard.Submit`, `BookingCard.Confirmation` — are documented on the Booking Card page.

---

**Component Path:** `[framework]\book-appointment\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
