# Calendar Dashboard

A comprehensive, interactive calendar dashboard and date-picker system. Includes built-in event management, filtering, dynamic views (Month/Week/Day), and animated popover modals.

## Examples

`CalendarDashboard` is fully encapsulated — modals, event editing, filtering and exporting are all handled internally, so the only thing you pass in is the seed data and the look. The first example's **Code** tab contains the full component source.

export const usageDefault = `import { CalendarDashboard } from "@/components/custom/blocks/Calendar";

// Keys are "YYYY-M-D" (no zero padding); values are event types.
const events = {
  "2025-8-31": ["pentest", "kickoff", "pentest"],
  "2025-9-2": ["pentest", "kickoff"],
  "2025-9-10": ["pentest", "kickoff"],
  "2025-9-15": ["pentest", "kickoff"],
  "2025-9-24": ["kickoff", "pentest"],
};

export default function TeamCalendar() {
  return ;
}`;

export const usageMinimal = `import { CalendarDashboard } from "@/components/custom/blocks/Calendar";

const events = { "2025-9-10": ["pentest", "kickoff"] };

export default function EmbeddedCalendar() {
  // "minimal" drops the card chrome so the dashboard sits flush inside your page.
  return ;
}`;

export const usageGlass = `import { CalendarDashboard } from "@/components/custom/blocks/Calendar";

const events = { "2025-9-10": ["pentest", "kickoff"] };

export default function GlassCalendar() {
  // "glass" is translucent — give it a colored surface to sit on.
  return (

  );
}`;

export const usageEmpty = `import { CalendarDashboard } from "@/components/custom/blocks/Calendar";

export default function EmptyCalendar() {
  // mockEvents defaults to {} — the dashboard starts clean and you add
  // events through its own UI.
  return ;
}`;

## Installation

### 1. Install Dependencies

This component relies heavily on `react-day-picker` and the standard `shadcn/ui` button primitive. Run the following commands:

```bash
npm install lucide-react date-fns react-day-picker
npx shadcn-ui@latest add button
```

### 2. Copy the Component

Create a new file at `components/custom/blocks/Calendar.tsx` and copy the engine code from the **Code** tab of the first example above.

## Features
Discover the Calendar's date selection capabilities, supporting single dates, date ranges, and localization.

    Customizable
    Easily adapt the component's styling and behavior to fit your application's unique design system.

    Accessible
    Built with accessibility in mind, ensuring all users can interact with your application effectively.

    Responsive
    Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

    Performant
    Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

    Usage Guidelines
    Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

        Prop
        Type
        Default
        Description

          mockEvents

          Record&lt;string, string[]&gt;

          {"{}"}

          A dictionary mapping string dates ("YYYY-M-D") to an
          array of event types ("pentest" or "kickoff"
          ).

          variant

          "default" | "minimal" | "glass"

          "default"

          Applies overarching structural layouts, including borders, padding,
          and grid-gaps.

          color

          "primary" | "indigo" | "rose" | "emerald" | "blue" | "zinc" | string

          "primary"

          Applies global color themes to active states, primary buttons, and
          focus rings. Accepts valid hex codes.

---

**Component Path:** `nextjs\calendar\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
