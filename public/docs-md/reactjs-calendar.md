---
title: "Calendar Dashboard"
description: "A calendar dashboard with event management, filtering and month, week and day views, in default, minimal, glass and liquid-glass styles."
url: https://avaraui.com/docs/nextjs/calendar
---

# Calendar Dashboard

A comprehensive, interactive calendar dashboard and date-picker system. Includes built-in event management, filtering, dynamic views (Month/Week/Day), and animated popover modals.

`CalendarDashboard` is fully encapsulated — modals, event editing, filtering and exporting are all handled internally, so the only thing you pass in is the seed data and the look.

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

## Examples

### Minimal

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

### Glass

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

### Liquid Glass

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

## Features
Discover the Calendar's date selection capabilities, supporting single dates, date ranges, and localization.

### Customizable

Easily adapt the component's styling and behavior to fit your application's unique design system.

### Accessible

Built with accessibility in mind, ensuring all users can interact with your application effectively.

### Responsive

Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

### Performant

Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

### Usage Guidelines

Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `mockEvents` | `Record<string, string[]>` | `{}` | A dictionary mapping string dates (`"YYYY-M-D"`) to an array of event types (`"pentest"` or `"kickoff"` ). |
| `variant` | `"default" \| "minimal" \| "glass" \| "liquid-glass"` | `"default"` | Applies overarching structural layouts, including borders, padding, and grid-gaps. |
| `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "blue" \| "zinc" \| string` | `"primary"` | Applies global color themes to active states, primary buttons, and focus rings. Accepts valid hex codes. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/calendar
