---
title: "Shadcn Calendar"
description: "Shadcn Calendar. A calendar dashboard with event management, filtering and month, week and day views, in default, minimal, glass and liquid-glass styles."
url: https://avaraui.com/docs/nextjs/calendar
---

# Shadcn Calendar

An encapsulated interactive calendar dashboard (`CalendarDashboard`) with Month/Week/Day views, event creation/editing modals, filtering, and `default`, `minimal`, `glass`, and `liquid-glass` surfaces.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/calendar.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/calendar
```

## Calendar dashboard

Everything past the initial events is internal state.

- Seed `mockEvents` with a map of `"YYYY-M-D"` to an array of event types (`"pentest"`, `"kickoff"`). Note the un-padded month and day.
- `color` themes the active states, primary buttons and focus rings — a named key or a hex string.

```tsx
import { CalendarDashboard } from "@/components/custom/blocks/Calendar";

const y = new Date().getFullYear();
const m = new Date().getMonth() + 1;

// Keys are "YYYY-M-D" (no zero padding); values are event types.
const events = {
  [`${y}-${m}-2`]: ["pentest", "kickoff"],
  [`${y}-${m}-10`]: ["pentest", "kickoff"],
  [`${y}-${m}-15`]: ["pentest", "kickoff"],
  [`${y}-${m}-24`]: ["kickoff", "pentest"],
};

export default function TeamCalendar() {
  return <CalendarDashboard mockEvents={events} />;
}
```

## Minimal

- Set `variant="minimal"` to drop the card chrome so the dashboard sits flush in your own layout.

```tsx
import { CalendarDashboard } from "@/components/custom/blocks/Calendar";

const y = new Date().getFullYear();
const m = new Date().getMonth() + 1;
const events = {
  [`${y}-${m}-2`]: ["pentest", "kickoff"],
  [`${y}-${m}-10`]: ["pentest", "kickoff"],
  [`${y}-${m}-15`]: ["pentest", "kickoff"],
  [`${y}-${m}-24`]: ["kickoff", "pentest"],
};

export default function EmbeddedCalendar() {
  // "minimal" drops the card chrome so the dashboard sits flush inside your page.
  return <CalendarDashboard variant="minimal" mockEvents={events} />;
}
```

## Glass

- Set `variant="glass"` to go translucent — intended to sit on a coloured or photographic surface.

```tsx
import { CalendarDashboard } from "@/components/custom/blocks/Calendar";

const y = new Date().getFullYear();
const m = new Date().getMonth() + 1;
const events = {
  [`${y}-${m}-2`]: ["pentest", "kickoff"],
  [`${y}-${m}-10`]: ["pentest", "kickoff"],
  [`${y}-${m}-15`]: ["pentest", "kickoff"],
  [`${y}-${m}-24`]: ["kickoff", "pentest"],
};

export default function GlassCalendar() {
  // "glass" is translucent — intended to sit on a background image or rich
  // pattern. The photo frames it from md up; on phones the card fills the
  // frame and the photo shows through it instead.
  return (
    <div
      className="overflow-hidden rounded-2xl bg-cover bg-center md:p-8"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.48), rgba(0, 0, 0, 0.52)), url('https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg')",
      }}
    >
      <CalendarDashboard variant="glass" mockEvents={events} />
    </div>
  );
}
```

## Liquid Glass

- Set `variant="liquid-glass"` for an authentic physical fluid glass distortion effect with layered refraction filters and specular bevels.

```tsx
import { CalendarDashboard, LiquidGlassSvgFilter } from "@/components/custom/blocks/Calendar";

const y = new Date().getFullYear();
const m = new Date().getMonth() + 1;
const events = {
  [`${y}-${m}-2`]: ["pentest", "kickoff"],
  [`${y}-${m}-10`]: ["pentest", "kickoff"],
  [`${y}-${m}-15`]: ["pentest", "kickoff"],
  [`${y}-${m}-24`]: ["kickoff", "pentest"],
};

export default function LiquidGlassCalendar() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-cover bg-center p-4 sm:p-8"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg')",
      }}
    >
      <LiquidGlassSvgFilter />
      <CalendarDashboard variant="liquid-glass" mockEvents={events} />
    </div>
  );
}
```

## About Shadcn Calendar

**What it is.** `CalendarDashboard` is a self-contained scheduling workspace. It has Month, Week and Day views, a sidebar that filters events by type (Pentest, Kick-Off) and platform (Google Meet, Slack, Discord), an add and edit event form, and a CSV export, in `default`, `minimal`, `glass` and `liquid-glass` variants.

**How it is built.** It is a client component built on `react-day-picker`. Events live in its own state, seeded once from `mockEvents`, and nothing is saved or sent anywhere. The `color` prop themes the active accents, and the root copies the `dark` class from the page.

**When to use it.** Use `CalendarDashboard` for a full event-management view or a scheduling demo. For form date fields, use [Date Picker](https://avaraui.com/docs/reactjs/date-picker) or [Range Date Picker](https://avaraui.com/docs/reactjs/range-date-picker).

## For AI agents

**When to use**

- Full-featured event scheduling dashboards with Month/Week/Day views and built-in event modals (`default`, `minimal`, `glass`, `liquid-glass`)

**When not to use**

- Single date form inputs — use [Date Picker](https://avaraui.com/docs/reactjs/date-picker)
- Date range booking pickers — use [Range Date Picker](https://avaraui.com/docs/reactjs/range-date-picker)

**Agent notes**

- Named export: `import { CalendarDashboard } from "@/components/custom/blocks/Calendar"`; the file also exports `LiquidGlassSvgFilter`, which the `liquid-glass` variant needs rendered once on the page
- `mockEvents` keys use un-padded `"YYYY-M-D"` (e.g. `"2026-4-5"`, not `"2026-04-05"`); each value is an array of `"pentest"` or `"kickoff"`
- Seeded events get fixed titles, times (09:00, 11:00, 14:00, 16:00, 18:00 by array position) and platforms; edit them in the UI, not through props
- There is no `onChange` or save callback: added, edited and deleted events exist only in component state
- Keep `mockEvents` outside the component or memoised. A new object on every render re-seeds the events and discards what the user added
- `CalendarDashboardProps` declares `className`, but the component does not apply it

**Ask before you pick.** This page has 4 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 4 options as live previews: https://avaraui.com/view/calendar

**When to use it.** A calendar dashboard with built-in event management, filtering, Month, Week and Day views and animated popover modals, in four looks: the default card, a flush minimal one, frosted glass and liquid glass.

**When to use something else:**

- [Date Picker](https://avaraui.com/docs/reactjs/date-picker): for choosing a single date in a form field rather than managing events.

**Gotchas:**

- All four are looks of the one `calendar` item: install it once and set `variant` from the index.
- Event seed data is keyed `"YYYY-M-D"` with un-padded month and day.
- `glass` and `liquid-glass` are meant to sit on a coloured or photographic surface.

### The 4 variants

1. **Default** (`default`): The full dashboard in its own card, with the accent colour on active states, buttons and focus rings.
   - Live: https://avaraui.com/view/calendar/default
   - Best for: a calendar page on a normal background
   - Avoid if: it should sit flush inside another layout
   - Traits: card chrome, default look, named or hex accent colour
   - Install: `npx shadcn@latest add @avara-ui/calendar`
   - Set these props: `{"variant":"default"}`
   - Docs: https://avaraui.com/docs/nextjs/calendar#calendar-dashboard
2. **Minimal** (`minimal`): Drops the card chrome so the dashboard sits flush in your own layout.
   - Live: https://avaraui.com/view/calendar/minimal
   - Best for: a calendar embedded in a page or panel that already has its own frame
   - Avoid if: you want it to read as a self-contained card
   - Traits: no card chrome
   - Install: `npx shadcn@latest add @avara-ui/calendar`
   - Set these props: `{"variant":"minimal"}`
   - Docs: https://avaraui.com/docs/nextjs/calendar#minimal
3. **Glass** (`glass`): Translucent, for a coloured or photographic surface.
   - Live: https://avaraui.com/view/calendar/glass
   - Best for: a calendar over a colourful or photographic background
   - Avoid if: the background is plain
   - Traits: translucent
   - Install: `npx shadcn@latest add @avara-ui/calendar`
   - Set these props: `{"variant":"glass"}`
   - Docs: https://avaraui.com/docs/nextjs/calendar#glass
4. **Liquid glass** (`liquid-glass`): A physical fluid-glass distortion with layered refraction filters and specular bevels.
   - Live: https://avaraui.com/view/calendar/liquid-glass
   - Best for: a showpiece calendar over rich imagery
   - Avoid if: you want a restrained look or a plain background
   - Traits: refraction filters, specular bevels
   - Install: `npx shadcn@latest add @avara-ui/calendar`
   - Set these props: `{"variant":"liquid-glass"}`
   - Docs: https://avaraui.com/docs/nextjs/calendar#liquid-glass

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `mockEvents` | `Record<string, string[]>` | `{}` | A dictionary mapping string dates (`"YYYY-M-D"`) to an array of event types (`"pentest"` or `"kickoff"` ). |
| `variant` | `"default" \| "minimal" \| "glass" \| "liquid-glass"` | `"default"` | Applies overarching structural layouts, including borders, padding, and grid-gaps. |
| `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "blue" \| "zinc" \| string` | `"primary"` | Applies a color theme to active states, primary buttons, and focus rings. Accepts hex codes and `rgb` or `hsl` strings. An unknown name falls back to `"primary"`. |

## Works with other components

- Pair `variant="glass"` or `"liquid-glass"` with [Glass Panel](https://avaraui.com/docs/reactjs/glass-panel) surfaces.
- Use [Booking Card](https://avaraui.com/docs/reactjs/booking-card) for compact day-and-time appointment slots.
- Use [Date Picker](https://avaraui.com/docs/reactjs/date-picker) when a form only needs one date, not a whole schedule.

## What date key format does CalendarDashboard mockEvents expect?

`mockEvents` uses un-padded `"YYYY-M-D"` keys, such as `"2026-3-9"` rather than `"2026-03-09"`. Each key maps to an array of `"pentest"` or `"kickoff"`. The component pads the month and day itself when it builds events, so a padded key also works, but the un-padded form is the documented one.

## Where do events added in CalendarDashboard get saved?

Nowhere. Events live in React state, seeded from `mockEvents`, and the component has no `onChange` or persistence callback. A refresh returns to the seed. To store them, edit the file to call your API in `handleSaveEvent` and `deleteEvent`, and pass the loaded events back as `mockEvents`.

## How do I switch between month, week and day views in the calendar?

The header has Day, Week and Month buttons, and the calendar opens on Month. The view is internal state with no prop, so you cannot start on Week or Day without editing the file. The previous and next buttons move by one month, week or day to match the current view.

## Can I export events from CalendarDashboard?

Yes. The Export button downloads a `calendar_events.csv` with the columns ID, Title, Date, Time, Type and Platform, generated in the browser. It writes every event, including ones hidden by the sidebar type and platform filters.

## Why does the liquid-glass variant need LiquidGlassSvgFilter?

The `liquid-glass` layers use `filter: url(#glass-blur)`, an SVG displacement filter that `LiquidGlassSvgFilter` defines. Render `<LiquidGlassSvgFilter />` once next to `<CalendarDashboard variant="liquid-glass" />`, as the example does, and place the pair over an image or pattern so the distortion shows.

---

Live previews and every example: https://avaraui.com/docs/nextjs/calendar
