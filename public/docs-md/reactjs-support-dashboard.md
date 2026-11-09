---
title: "Shadcn Support Dashboard"
description: "A helpdesk and support dashboard with a ticket workspace and a table view, in default, glass and liquid-glass styles. Free shadcn/ui Support Dashboard."
url: https://avaraui.com/docs/nextjs/support-dashboard
---

# Shadcn Support Dashboard

A complete, production-ready Helpdesk and Support Dashboard interface.

It now features a **dual-layout system**:

1. **Chat View:** A highly detailed 3-pane layout for resolving individual customer tickets. Features a sortable inbox, a responsive chat thread, and a collapsible metadata pane.
2. **Table View:** A macro-level Ticket System layout. Automatically calculates top-level metrics (Total, Open, High Priority) based on the exact same data object, and displays an elegant, sortable list view.

Both layouts read the **same** `data` object — swapping `layout` re-presents the identical tickets, so you can route `/inbox` to the table and `/inbox/[id]` to the chat view without duplicating state. Every preview is live: open a ticket, reply to it, or create a new one.

## For AI agents

**Ask before you pick.** This page has 4 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 4 options as live previews: https://avaraui.com/view/support-dashboard

**When to use it.** A helpdesk and support dashboard. Two layouts (a three-pane ticket workspace, or a sortable table under metric cards) and two translucent glass styles.

**Gotchas:**

- All four are looks of the one `support-dashboard` item: install it once and set `layout` and `variant` from the index (the default ticket workspace needs neither).
- The glass colour is a fixed set of presets, not a hex value; an unrecognised value falls back to `indigo`.

### The 4 variants

1. **Ticket workspace** (`ticket-workspace`): A three-pane drill-down: inbox, conversation thread and a collapsible properties pane.
   - Live: https://avaraui.com/view/support-dashboard/ticket-workspace
   - Best for: agents who work through tickets one conversation at a time
   - Avoid if: you want an overview of many tickets at once
   - Traits: inbox, conversation thread, properties pane, uses the `support-dashboard` item
   - Install: `npx shadcn@latest add @avara-ui/support-dashboard`
   - Docs: https://avaraui.com/docs/nextjs/support-dashboard#ticket-workspace
2. **Table view** (`table-view`): The same tickets as a sortable list under metric cards that are computed from the ticket data.
   - Live: https://avaraui.com/view/support-dashboard/table-view
   - Best for: managers who want an overview and sortable list of tickets
   - Avoid if: agents need to read and reply to conversations in place
   - Traits: sortable table, metric cards, uses the `support-dashboard` item
   - Install: `npx shadcn@latest add @avara-ui/support-dashboard`
   - Set these props: `{"layout":"table"}`
   - Docs: https://avaraui.com/docs/nextjs/support-dashboard#table-view
3. **Glass workspace** (`glass`): The ticket workspace with translucent panes and a backdrop blur.
   - Live: https://avaraui.com/view/support-dashboard/glass
   - Best for: an atmospheric dashboard over a gradient or image background
   - Avoid if: you want flat, opaque panes
   - Traits: translucent panes, backdrop blur, uses the `support-dashboard` item
   - Install: `npx shadcn@latest add @avara-ui/support-dashboard`
   - Set these props: `{"variant":"glass"}`
   - Docs: https://avaraui.com/docs/nextjs/support-dashboard#glass
4. **Liquid glass workspace** (`liquid-glass`): The ticket workspace in layered liquid glass with animated displacement waves and specular edge highlights.
   - Live: https://avaraui.com/view/support-dashboard/liquid-glass
   - Best for: a showpiece dashboard where a rich glass effect is part of the brand
   - Avoid if: you want a plain, dense working tool
   - Traits: liquid glass, SVG displacement waves, specular highlights, uses the `support-dashboard` item
   - Install: `npx shadcn@latest add @avara-ui/support-dashboard`
   - Set these props: `{"variant":"liquid-glass"}`
   - Docs: https://avaraui.com/docs/nextjs/support-dashboard#support-liquid-glass

## Ticket workspace

A 3-pane drill-down: inbox, conversation thread and a collapsible properties pane.

- Pass `data` holding the tickets, SLA limits, filters and header strings.
- `layout="chat"` is the default drill-down view.

```tsx
import SupportDashboard, {
  type SupportData,
} from "@/components/custom/blocks/Support-dashboard";

const data: SupportData = {
  header: { title: "Sales Tickets", subtitle: "All Open" },
  filters: [
    { id: "status", label: "Open", count: 99, icon: "Inbox" },
    { id: "sort", label: "Newest", count: null, icon: "Clock" },
  ],
  emptyState: {
    greetingPrefix: "Hey",
    userName: "Agent",
    message: "Time to help the people who need us most",
  },
  replySection: {
    tabs: ["Reply", "Note"],
    placeholder: "Type your message here...",
    buttonText: "Send",
  },
  detailsSection: {
    tabs: ["User", "Company"],
    dropdownOptions: {
      status: ["Open", "Pending", "Resolved", "Closed"],
      group: ["Sales", "Support", "Billing"],
      assignedTo: ["Mark Probert", "Unassigned"],
      priority: ["Low", "Medium", "High", "Urgent"],
      type: ["Bug", "Feature Request", "Question", "Billing"],
    },
  },
  tickets: [
    {
      id: "#6493",
      title: "THW - New email template creation",
      author: "Darren Adams",
      company: "Headboard Workshop",
      initials: "DA",
      color: "bg-blue-600",
      status: "open",
      time: "10m ago",
      contact: {
        name: "Darren Adams",
        email: "danadams@gmail.com",
        phone: "Add Phone",
        identifier: "Dan_adam",
      },
      sla: {
        firstResponse: "by Wed, 03 Jul 2019, 10:00 AM",
        resolution: "by Wed, 03 Jul 2019, 01:00 PM",
      },
      properties: {
        status: "Open",
        group: "Sales",
        assignedTo: "Mark Probert",
        priority: "Medium",
        type: "Bug",
      },
      chatHistory: [
        {
          id: 1,
          type: "received",
          sender: "Darren Adams",
          initials: "DA",
          color: "bg-blue-600",
          message: "Graphics Designer Needs...",
          time: "3 days ago",
          showAvatar: true,
        },
      ],
    },
  ],
};

export default function Helpdesk() {
  return <SupportDashboard data={data} />;
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/support-dashboard.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/support-dashboard
```

## Examples

### Table view

- Set `layout="table"` to re-present the same tickets as a sortable list under metric cards — those are computed from `data.tickets`, not passed in.

```tsx
import SupportDashboard, {
  type SupportData,
} from "@/components/custom/blocks/Support-dashboard";

const data: SupportData = {
  header: { title: "Sales Tickets", subtitle: "All Open" },
  filters: [
    { id: "status", label: "Open", count: 99, icon: "Inbox" },
    { id: "sort", label: "Newest", count: null, icon: "Clock" },
  ],
  emptyState: {
    greetingPrefix: "Hey",
    userName: "Agent",
    message: "Time to help the people who need us most",
  },
  replySection: {
    tabs: ["Reply", "Note"],
    placeholder: "Type your message here...",
    buttonText: "Send",
  },
  detailsSection: {
    tabs: ["User", "Company"],
    dropdownOptions: {
      status: ["Open", "Pending", "Resolved", "Closed"],
      group: ["Sales", "Support", "Billing"],
      assignedTo: ["Mark Probert", "Unassigned"],
      priority: ["Low", "Medium", "High", "Urgent"],
      type: ["Bug", "Feature Request", "Question", "Billing"],
    },
  },
  tickets: [
    {
      id: "#6493",
      title: "THW - New email template creation",
      author: "Darren Adams",
      company: "Headboard Workshop",
      initials: "DA",
      color: "bg-blue-600",
      status: "open",
      time: "10m ago",
      contact: {
        name: "Darren Adams",
        email: "danadams@gmail.com",
        phone: "Add Phone",
        identifier: "Dan_adam",
      },
      sla: {
        firstResponse: "by Wed, 03 Jul 2019, 10:00 AM",
        resolution: "by Wed, 03 Jul 2019, 01:00 PM",
      },
      properties: {
        status: "Open",
        group: "Sales",
        assignedTo: "Mark Probert",
        priority: "Medium",
        type: "Bug",
      },
      chatHistory: [
        {
          id: 1,
          type: "received",
          sender: "Darren Adams",
          initials: "DA",
          color: "bg-blue-600",
          message: "Graphics Designer Needs...",
          time: "3 days ago",
          showAvatar: true,
        },
      ],
    },
  ],
};

export default function TicketTable() {
  // Same `data`, macro view: the metric cards (Total / Open / High Priority)
  // are derived from `data.tickets`, not passed in.
  return <SupportDashboard layout="table" data={data} />;
}
```

### Glass

- Set `variant="glass"` for translucent panes with backdrop blur.
- `color` here is a **fixed set** — unlike the other blocks it takes no hex, and unrecognised values fall back to `indigo`.

```tsx
import SupportDashboard, {
  type SupportData,
} from "@/components/custom/blocks/Support-dashboard";

const data: SupportData = {
  header: { title: "Sales Tickets", subtitle: "All Open" },
  filters: [
    { id: "status", label: "Open", count: 99, icon: "Inbox" },
    { id: "sort", label: "Newest", count: null, icon: "Clock" },
  ],
  emptyState: {
    greetingPrefix: "Hey",
    userName: "Agent",
    message: "Time to help the people who need us most",
  },
  replySection: {
    tabs: ["Reply", "Note"],
    placeholder: "Type your message here...",
    buttonText: "Send",
  },
  detailsSection: {
    tabs: ["User", "Company"],
    dropdownOptions: {
      status: ["Open", "Pending", "Resolved", "Closed"],
      group: ["Sales", "Support", "Billing"],
      assignedTo: ["Mark Probert", "Unassigned"],
      priority: ["Low", "Medium", "High", "Urgent"],
      type: ["Bug", "Feature Request", "Question", "Billing"],
    },
  },
  tickets: [
    {
      id: "#6493",
      title: "THW - New email template creation",
      author: "Darren Adams",
      company: "Headboard Workshop",
      initials: "DA",
      color: "bg-blue-600",
      status: "open",
      time: "10m ago",
      contact: {
        name: "Darren Adams",
        email: "danadams@gmail.com",
        phone: "Add Phone",
        identifier: "Dan_adam",
      },
      sla: {
        firstResponse: "by Wed, 03 Jul 2019, 10:00 AM",
        resolution: "by Wed, 03 Jul 2019, 01:00 PM",
      },
      properties: {
        status: "Open",
        group: "Sales",
        assignedTo: "Mark Probert",
        priority: "Medium",
        type: "Bug",
      },
      chatHistory: [
        {
          id: 1,
          type: "received",
          sender: "Darren Adams",
          initials: "DA",
          color: "bg-blue-600",
          message: "Graphics Designer Needs...",
          time: "3 days ago",
          showAvatar: true,
        },
      ],
    },
  ],
};

export default function GlassDashboard() {
  return (
    // `glass` provides a self-contained full-bleed backdrop with a floating frosted card.
    <SupportDashboard
      variant="glass"
      color="rose"
      data={data}
      bgImage="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg"
    />
  );
}
```

### Liquid glass

- Set `variant="liquid-glass"` for an interactive multi-layered liquid glass stack with dynamic SVG displacement waves, specular edge highlights, and high-contrast styling.

```tsx
import SupportDashboard, {
  type SupportData,
} from "@/components/custom/blocks/Support-dashboard";

const data: SupportData = {
  header: { title: "Sales Tickets", subtitle: "All Open" },
  filters: [
    { id: "status", label: "Open", count: 99, icon: "Inbox" },
    { id: "sort", label: "Newest", count: null, icon: "Clock" },
  ],
  emptyState: {
    greetingPrefix: "Hey",
    userName: "Agent",
    message: "Time to help the people who need us most",
  },
  replySection: {
    tabs: ["Reply", "Note"],
    placeholder: "Type your message here...",
    buttonText: "Send",
  },
  detailsSection: {
    tabs: ["User", "Company"],
    dropdownOptions: {
      status: ["Open", "Pending", "Resolved", "Closed"],
      group: ["Sales", "Support", "Billing"],
      assignedTo: ["Mark Probert", "Unassigned"],
      priority: ["Low", "Medium", "High", "Urgent"],
      type: ["Bug", "Feature Request", "Question", "Billing"],
    },
  },
  tickets: [
    {
      id: "#6493",
      title: "THW - New email template creation",
      author: "Darren Adams",
      company: "Headboard Workshop",
      initials: "DA",
      color: "bg-blue-600",
      status: "open",
      time: "10m ago",
      contact: {
        name: "Darren Adams",
        email: "danadams@gmail.com",
        phone: "Add Phone",
        identifier: "Dan_adam",
      },
      sla: {
        firstResponse: "by Wed, 03 Jul 2019, 10:00 AM",
        resolution: "by Wed, 03 Jul 2019, 01:00 PM",
      },
      properties: {
        status: "Open",
        group: "Sales",
        assignedTo: "Mark Probert",
        priority: "Medium",
        type: "Bug",
      },
      chatHistory: [
        {
          id: 1,
          type: "received",
          sender: "Darren Adams",
          initials: "DA",
          color: "bg-blue-600",
          message: "Graphics Designer Needs...",
          time: "3 days ago",
          showAvatar: true,
        },
      ],
    },
  ],
};

export default function LiquidGlassDashboard() {
  return (
    // `liquid-glass` features animated SVG displacement turbulence, specular edge highlights, and high-contrast frosted styling.
    <SupportDashboard
      variant="liquid-glass"
      color="indigo"
      data={data}
      bgImage="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg"
    />
  );
}
```

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `SupportData` | Required | The core data object containing tickets, SLA limits, filters, and header strings. |
| `layout` | `"chat" \| "table"` | `"chat"` | Determines the overarching UI structure. `chat` creates a 3-pane drill-down view, while `table` creates a macro-level list with metric cards. |
| `variant` | `"default" \| "minimal" \| "glass" \| "liquid-glass"` | `"default"` | Applies distinct visual themes to the borders, backgrounds, and drop shadows of the dashboard components. `liquid-glass` wraps in an animated liquid SVG frosted stack, while `glass` provides translucent styling. |
| `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "zinc"` | `"indigo"` | Applies global accent colors to active states, send buttons, and metric highlights. This is a fixed set — unlike the other blocks it does not accept a hex string, and unrecognised values fall back to `"indigo"`. |
| `bgImage` | `string` | `Cloudinary landscape URL` | Custom scenic backdrop image URL for `liquid-glass` and `glass` variants. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/support-dashboard
