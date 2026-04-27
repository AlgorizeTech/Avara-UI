# Support Dashboard

A complete, production-ready Helpdesk and Support Dashboard interface.

It now features a **dual-layout system**:

1. **Chat View:** A highly detailed 3-pane layout for resolving individual customer tickets. Features a sortable inbox, a responsive chat thread, and a collapsible metadata pane.
2. **Table View:** A macro-level Ticket System layout. Automatically calculates top-level metrics (Total, Open, High Priority) based on the exact same data object, and displays an elegant, sortable list view.

## Interactive Showcase

Use the control panel below to switch between the layout structures, apply beautiful visual variants (`glass`, `minimal`), and change the global accent color.

_Click the **Code** tab in the preview below to copy the full component engine._

---

## Installation

### 1. Install Dependencies

This component relies heavily on `lucide-react` for its standard UI icons.

```bash
npm install lucide-react
```

## Props Reference

        Prop
        Type
        Default
        Description

          data

          SupportData

          Required

          The core data object containing tickets, SLA limits, filters, and
          header strings.

          layout

          "chat" | "table"

          "chat"

          Determines the overarching UI structure. chat creates a
          3-pane drill-down view, while table creates a macro-level
          list with metric cards.

          variant

          "default" | "minimal" | "glass"

          "default"

          Applies distinct visual themes to the borders, backgrounds, and drop
          shadows of the dashboard components.

          color

          "indigo" | "rose" | "emerald" | "zinc"

          "indigo"

          Applies global accent colors to active states, send buttons, and
          metric highlights.

---

**Component Path:** `nextjs\support-dashboard\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
