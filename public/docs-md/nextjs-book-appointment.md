# Book Appointment

A booking flow for a page that ends in an appointment: a strip of days, time slots in groups, a button that reads back the choice, and a confirmation that draws itself in once the booking is made.

`Booker` is a compound component. It holds the chosen day and slot; `Booker.Days`, `Booker.Slots`, `Booker.Submit` and `Booker.Confirmation` go inside it in whatever layout the page needs. The example below pairs it with the frosted panels from Profile Page — a practitioner's card on the left, the booking on the right — but the booker has no opinion about what sits beside it.

export const usagePage = `"use client";

const DOCTOR = {
  name: "Dr. Emily Chen, MD",
  specialties: "Internal medicine, Cardiology",
  practice: "Manhattan Health Associates",
  photo:
    "https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  photoAlt: "Dr. Emily Chen in a white coat with a stethoscope",
  rating: 4.8,
  reviews: 38,
  summary:
    "Patients describe Dr. Chen as thorough and easy to talk to. They value her cardiology expertise and clear explanations; a few mention delays getting a callback.",
};

const SCORES = [
  { label: "Wait time", value: 4.63 },
  { label: "Bedside manner", value: 4.19 },
  { label: "Clear explanations", value: 4.74 },
];

// Categorical hues in a fixed order; gray is reserved for "Other".
const STROKE = [
  "stroke-violet-600 dark:stroke-violet-500",
  "stroke-teal-600",
  "stroke-amber-600",
  "stroke-rose-600",
];
const SWATCH = [
  "bg-violet-600 dark:bg-violet-500",
  "bg-teal-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-zinc-400 dark:bg-zinc-500",
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

const MORNING = [
  { label: "9:00 AM" },
  { label: "10:00 AM" },
  { label: "11:00 AM", taken: true },
];
const AFTERNOON = [
  { label: "12:00 PM" },
  { label: "1:00 PM" },
  { label: "2:00 PM" },
  { label: "3:00 PM", taken: true },
];

export default function BookAppointment() {
  return (
    
      {/* Portrait and contact */}

              New York, NY, {DOCTOR.practice}

              (212) 555-7890

              drchen@example.com

              English, Spanish

      {/* Name, scores, charts */}

            {DOCTOR.name}
            {DOCTOR.specialties}

            {/* The score is the one loud element on the page */}

                {DOCTOR.rating}
                {DOCTOR.reviews} reviews

              Patients say
              {DOCTOR.summary}

            {SCORES.map((s) => (
              
                {s.label}

            ))}

          Top visit reasons

          Where her week goes

      {/* Booking */}
      {/* The Booker is the panel's whole inside, so its confirmation covers
          the panel edge to edge instead of stopping at the padding. */}
      
         new Promise((resolve) => setTimeout(resolve, 900))}
        >
          Book an appointment
           d.getDay() === 0} />
          
            Time

  );
}

/* Donut: four reasons, hover a segment (or its legend row) to read it. */
function VisitReasons() {
  const [active, setActive] = useState(null);
  const total = VISIT_REASONS.reduce((sum, r) => sum + r.value, 0); // 100, but never assume
  const R = 38;
  const C = 2 * Math.PI * R;
  const GAP = 2; // surface gap between segments, in viewBox units
  let offset = 0;

  return (

          {VISIT_REASONS.map((r, i) => {
            const length = (C * r.value) / total;
            const el = (
               setActive(i)}
                onMouseLeave={() => setActive(null)}
                className={cn(
                  "cursor-pointer transition-[stroke-width,opacity] duration-200",
                  STROKE[i],
                  active !== null && active !== i && "opacity-40",
                )}
              />
            );
            offset += length;
            return el;
          })}
        
        {/* Centre reads the hovered segment; at rest, the largest one */}

            {VISIT_REASONS[active ?? 0].value}%
            {active === null ? "top reason" : "of visits"}

        {VISIT_REASONS.map((r, i) => (
           setActive(i)}
            onMouseLeave={() => setActive(null)}
            className={cn("flex items-start gap-2.5 transition-opacity", active !== null && active !== i && "opacity-50")}
          >
            
            {r.label}
            {r.value}%
          
        ))}

  );
}

/* One stacked bar, 2px gaps between segments, legend below. */
function ActivityBar() {
  return (

        {ACTIVITIES.map((a, i) => (
          
        ))}

        {ACTIVITIES.map((a, i) => (

            {a.label}
            {a.value}%
          
        ))}

  );
}
`;

export const usagePageSolid = `"use client";

const DOCTOR = {
  name: "Dr. Emily Chen, MD",
  specialties: "Internal medicine, Cardiology",
  practice: "Manhattan Health Associates",
  photo:
    "https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  photoAlt: "Dr. Emily Chen in a white coat with a stethoscope",
  rating: 4.8,
  reviews: 38,
  summary:
    "Patients describe Dr. Chen as thorough and easy to talk to. They value her cardiology expertise and clear explanations; a few mention delays getting a callback.",
};

const SCORES = [
  { label: "Wait time", value: 4.63 },
  { label: "Bedside manner", value: 4.19 },
  { label: "Clear explanations", value: 4.74 },
];

// Categorical hues in a fixed order; gray is reserved for "Other".
const STROKE = [
  "stroke-violet-600 dark:stroke-violet-500",
  "stroke-teal-600",
  "stroke-amber-600",
  "stroke-rose-600",
];
const SWATCH = [
  "bg-violet-600 dark:bg-violet-500",
  "bg-teal-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-zinc-400 dark:bg-zinc-500",
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

const MORNING = [
  { label: "9:00 AM" },
  { label: "10:00 AM" },
  { label: "11:00 AM", taken: true },
];
const AFTERNOON = [
  { label: "12:00 PM" },
  { label: "1:00 PM" },
  { label: "2:00 PM" },
  { label: "3:00 PM", taken: true },
];

export default function BookAppointment() {
  return (
    
      {/* Portrait and contact */}

              New York, NY, {DOCTOR.practice}

              (212) 555-7890

              drchen@example.com

              English, Spanish

      {/* Name, scores, charts */}

            {DOCTOR.name}
            {DOCTOR.specialties}

            {/* The score is the one loud element on the page */}

                {DOCTOR.rating}
                {DOCTOR.reviews} reviews

              Patients say
              {DOCTOR.summary}

            {SCORES.map((s) => (
              
                {s.label}

            ))}

          Top visit reasons

          Where her week goes

      {/* Booking */}
      {/* The Booker is the panel's whole inside, so its confirmation covers
          the panel edge to edge instead of stopping at the padding. */}
      
         new Promise((resolve) => setTimeout(resolve, 900))}
        >
          Book an appointment
           d.getDay() === 0} />
          
            Time

  );
}

/* Donut: four reasons, hover a segment (or its legend row) to read it. */
function VisitReasons() {
  const [active, setActive] = useState(null);
  const total = VISIT_REASONS.reduce((sum, r) => sum + r.value, 0); // 100, but never assume
  const R = 38;
  const C = 2 * Math.PI * R;
  const GAP = 2; // surface gap between segments, in viewBox units
  let offset = 0;

  return (

          {VISIT_REASONS.map((r, i) => {
            const length = (C * r.value) / total;
            const el = (
               setActive(i)}
                onMouseLeave={() => setActive(null)}
                className={cn(
                  "cursor-pointer transition-[stroke-width,opacity] duration-200",
                  STROKE[i],
                  active !== null && active !== i && "opacity-40",
                )}
              />
            );
            offset += length;
            return el;
          })}
        
        {/* Centre reads the hovered segment; at rest, the largest one */}

            {VISIT_REASONS[active ?? 0].value}%
            {active === null ? "top reason" : "of visits"}

        {VISIT_REASONS.map((r, i) => (
           setActive(i)}
            onMouseLeave={() => setActive(null)}
            className={cn("flex items-start gap-2.5 transition-opacity", active !== null && active !== i && "opacity-50")}
          >
            
            {r.label}
            {r.value}%
          
        ))}

  );
}

/* One stacked bar, 2px gaps between segments, legend below. */
function ActivityBar() {
  return (

        {ACTIVITIES.map((a, i) => (
          
        ))}

        {ACTIVITIES.map((a, i) => (

            {a.label}
            {a.value}%
          
        ))}

  );
}
`;

 day.getDay() === 0",
          effect:
            "on `Booker.Days` strikes out days with nothing free. Sundays here; feed it your real availability.",
        },
        {
          lead: "The arrows page",
          prop: "Booker.Days",
          effect:
            "a week at a time, up to `horizon` days out (90 by default). Days start today, so the previous arrow is disabled on the first page — nobody can book into the past.",
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
            "on `ProfilePage` and every panel becomes a solid card; the aurora is not drawn. Days, slots and the confirmation use neutral inks that read on either surface.",
        },
      ],
      props: { rounded: true, variant: "solid" },
      usage: usagePageSolid,
      minHeight: 980,
    },
  ]}
/>

## Installation

## Just the booker

The booking panel on its own, inside one glass slab. Everything else on the example page is ordinary content.

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

    One state, any layout
    Days, slots and the button share one context. Stack them, put them side by side, split them across panels — the booker does not care.

    A confirmation that shows what happened
    When onBook resolves, a check draws itself over the form and the day, time and place rise in beneath it. Book another clears it. It holds still under prefers-reduced-motion.

    Keyboard and screen reader ready
    Days and slots are radio groups with full date names; taken slots and closed days are disabled, not hidden; the busy button carries aria-busy and the confirmation is a status region.

    Honest about today
    The default days are built on the client, so a server render never guesses the visitor's date. They start today and page forward a week at a time — the previous arrow never reaches into the past. Pass your own days array to offer a different range.

## Props Reference

### Booker

        Prop
        Type
        Default
        Description

        onBook
        (booking: &#123; day: Date; slot: string &#125;) =&gt; void | Promise&lt;void&gt;
        —
        Called on confirm. Return a promise to hold the busy state; a rejection returns to the form.

        className
        string
        —
        Layout of the parts inside. The confirmation is positioned against this element.

### Booker.Days

        Prop
        Type
        Default
        Description

        days
        Date[]
        today → horizon
        Days on offer, in order, paged count at a time with the previous/next arrows. The default is built on the client so the server never guesses today, and it starts today — there is no paging back into the past.

        count
        number
        7
        Days shown per page.

        horizon
        number
        90
        How far ahead the default days run, in days from today. Ignored when days is given.

        unavailable
        (day: Date) =&gt; boolean
        —
        Days with nothing free — shown struck through, not selectable.

### Booker.Slots

        Prop
        Type
        Default
        Description

        label
        string
        —
        Group title, e.g. &quot;Morning&quot;.

        slots
        &#123; label: string; taken?: boolean &#125;[]
        —
        Times in the group. Disabled until a day is chosen; taken slots are shown struck through.

### Booker.Submit

        Prop
        Type
        Default
        Description

        children
        ReactNode
        &quot;Book now&quot;
        Button text. Once a day and slot are chosen it reads back the choice, e.g. Book now, Wed 25 at 9:00 AM.

### Booker.Confirmation

        Prop
        Type
        Default
        Description

        withName
        string
        —
        Who the appointment is with.

        place
        string
        —
        Where, appended after the name.

### StarRating

        Prop
        Type
        Default
        Description

        value
        number
        —
        0–5, fractional. Partial stars fill to the fraction.

        label
        string
        —
        What is being rated; used in the accessible name.

---

**Component Path:** `[framework]\book-appointment\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
