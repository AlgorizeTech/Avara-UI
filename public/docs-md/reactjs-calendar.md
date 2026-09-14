# Calendar Dashboard

A comprehensive, interactive calendar dashboard and date-picker system. Includes built-in event management, filtering, dynamic views (Month/Week/Day), and animated popover modals.

`CalendarDashboard` is fully encapsulated — modals, event editing, filtering and exporting are all handled internally, so the only thing you pass in is the seed data and the look.

export const usageDefault = `import { CalendarDashboard } from "@/components/custom/blocks/Calendar";

const y = new Date().getFullYear();
const m = new Date().getMonth() + 1;

// Keys are "YYYY-M-D" (no zero padding); values are event types.
const events = {
  [\`\${y}-\${m}-2\`]: ["pentest", "kickoff"],
  [\`\${y}-\${m}-10\`]: ["pentest", "kickoff"],
  [\`\${y}-\${m}-15\`]: ["pentest", "kickoff"],
  [\`\${y}-\${m}-24\`]: ["kickoff", "pentest"],
};

export default function TeamCalendar() {
  return ;
}`;

export const usageMinimal = `import { CalendarDashboard } from "@/components/custom/blocks/Calendar";

const y = new Date().getFullYear();
const m = new Date().getMonth() + 1;
const events = {
  [\`\${y}-\${m}-2\`]: ["pentest", "kickoff"],
  [\`\${y}-\${m}-10\`]: ["pentest", "kickoff"],
  [\`\${y}-\${m}-15\`]: ["pentest", "kickoff"],
  [\`\${y}-\${m}-24\`]: ["kickoff", "pentest"],
};

export default function EmbeddedCalendar() {
  // "minimal" drops the card chrome so the dashboard sits flush inside your page.
  return ;
}`;

export const usageGlass = `import { CalendarDashboard } from "@/components/custom/blocks/Calendar";

const y = new Date().getFullYear();
const m = new Date().getMonth() + 1;
const events = {
  [\`\${y}-\${m}-2\`]: ["pentest", "kickoff"],
  [\`\${y}-\${m}-10\`]: ["pentest", "kickoff"],
  [\`\${y}-\${m}-15\`]: ["pentest", "kickoff"],
  [\`\${y}-\${m}-24\`]: ["kickoff", "pentest"],
};

export default function GlassCalendar() {
  // "glass" is translucent — intended to sit on a background image or rich pattern.
  return (

  );
}`;

## Installation

## Examples

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

**Component Path:** `[framework]\calendar\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
