export const metadata = docsPageMetadata("booking-card");

# Booking Card

A booking panel that goes inside any card: a strip of days paged a week at a time, time slots in groups, a button that reads the choice back before anyone confirms, and a confirmation that draws itself in over the form once the booking is made.

`BookingCard` is a compound component. It holds the chosen day and slot; `BookingCard.Days`, `BookingCard.Slots`, `BookingCard.Submit` and `BookingCard.Confirmation` go inside it in whatever layout the panel needs. It draws no surface of its own, so it sits as comfortably in a plain bordered card as in a glass slab from Glass Panel — the Book Appointment section is the same card on a full page.

export const usageCard = `const MORNING = [{ label: "9:00 AM" }, { label: "10:00 AM" }, { label: "11:00 AM", taken: true }];
const AFTERNOON = [{ label: "12:00 PM" }, { label: "1:00 PM" }, { label: "2:00 PM" }, { label: "3:00 PM", taken: true }];

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
`;

export const usageGlass = `const MORNING = [{ label: "9:00 AM" }, { label: "10:00 AM" }, { label: "11:00 AM", taken: true }];
const AFTERNOON = [{ label: "12:00 PM" }, { label: "1:00 PM" }, { label: "2:00 PM" }, { label: "3:00 PM", taken: true }];

export default function Booking() {
  return (
    
      {/* The card is the panel's whole inside, so the confirmation reaches
          the panel's edges and corners instead of stopping at the padding. */}
      
         {
            await fetch("/api/book", { method: "POST", body: JSON.stringify({ day, slot }) });
          }}
        >
          Book an appointment
           d.getDay() === 0} />
          
            Time

  );
}
`;

export const usageLiquidGlass = `const MORNING = [{ label: "9:00 AM" }, { label: "10:00 AM" }, { label: "11:00 AM", taken: true }];
const AFTERNOON = [{ label: "12:00 PM" }, { label: "1:00 PM" }, { label: "2:00 PM" }, { label: "3:00 PM", taken: true }];

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
`;

 day.getDay() === 0",
          effect:
            "on `BookingCard.Days` strikes out days with nothing free. Sundays here; feed it your real availability.",
        },
        {
          lead: "The Book button, the check and every focus ring take",
          prop: "--primary",
          effect:
            "so the card follows your theme — pick a colour above to see it. Selected days and slots stay a neutral ink that reads on glass or solid.",
        },
        {
          lead: "The arrows page",
          prop: "BookingCard.Days",
          effect:
            "a week at a time, up to `horizon` days out (90 by default). Days start today, so the previous arrow is disabled on the first page — nobody can book into the past.",
        },
      ],
      props: { surface: "card" },
      usage: usageCard,
      code: extractCode("src/components/custom/blocks/BookingCardBlock.tsx"),
      minHeight: 560,
    },
  ]}
/>

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

Choosing a new day clears the slot, since availability changes with the day. The submit button is disabled until both are chosen, and once they are it reads the choice back — *Book now, Wed 25 at 9:00 AM* — so nobody confirms blind.

## Features

    One state, any layout
    Days, slots and the button share one context. Stack them, put them side by side, split them across panels — the card does not care.

    A confirmation that shows what happened
    When onBook resolves, a check draws itself over the form and the day, time and place rise in beneath it. Book another clears it. It holds still under prefers-reduced-motion.

    Keyboard and screen reader ready
    Days and slots are radio groups with full date names; taken slots and closed days are disabled, not hidden; the busy button carries aria-busy and the confirmation is a status region.

    Honest about today
    The default days are built on the client, so a server render never guesses the visitor's date. They start today and page forward a week at a time — the previous arrow never reaches into the past. Pass your own days array to offer a different range.

## Props Reference

### BookingCard

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

### BookingCard.Days

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

### BookingCard.Slots

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

### BookingCard.Submit

        Prop
        Type
        Default
        Description

        children
        ReactNode
        &quot;Book now&quot;
        Button text. Once a day and slot are chosen it reads back the choice, e.g. Book now, Wed 25 at 9:00 AM.

### BookingCard.Confirmation

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

---

**Component Path:** `[framework]\booking-card\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
