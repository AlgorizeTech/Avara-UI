# Calendar Dashboard

A comprehensive, interactive calendar dashboard and date-picker system. Includes built-in event management, filtering, dynamic views (Month/Week/Day), and animated popover modals.

## Interactive Showcase

A fully encapsulated, page-builder-ready calendar dashboard. All state (modals, event editing, filters, exporting) is handled internally. Use the controls below to test the different architectural variants and color themes.

_Click the **Code** tab in the preview below to copy the full component engine or the dynamic usage snippet for your current selection._

---

## Installation

### 1. Install Dependencies

This component relies heavily on `react-day-picker` and the standard `shadcn/ui` button primitive. Run the following commands:

```bash
npm install lucide-react date-fns react-day-picker
npx shadcn-ui@latest add button
```

## Props Reference

        Prop
        Type
        Default
        Description

          mockEvents

          Record&lt;string, string[]&gt;

          {}

          A dictionary mapping string dates ("YYYY-M-D") to an
          array of event types ("pentest" or "kickoff"
          ).

          variant

          "default" | "minimal" | "glass"

          "default"

          Applies overarching structural layouts, including borders, padding,
          and grid-gaps.

          color

          "indigo" | "rose" | "emerald" | "blue" | "zinc"

          "indigo"

          Applies global color themes to active states, primary buttons, and
          focus rings.

---

**Component Path:** `nextjs\calendar\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
