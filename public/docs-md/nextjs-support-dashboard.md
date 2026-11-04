---
title: "Support Dashboard"
description: "A helpdesk and support dashboard with a ticket workspace and a table view, in default, glass and liquid-glass styles. Free shadcn/ui Support Dashboard."
url: https://avaraui.com/docs/nextjs/support-dashboard
---

# Support Dashboard

A complete, production-ready Helpdesk and Support Dashboard interface.

It now features a **dual-layout system**:

1. **Chat View:** A highly detailed 3-pane layout for resolving individual customer tickets. Features a sortable inbox, a responsive chat thread, and a collapsible metadata pane.
2. **Table View:** A macro-level Ticket System layout. Automatically calculates top-level metrics (Total, Open, High Priority) based on the exact same data object, and displays an elegant, sortable list view.

Both layouts read the **same** `data` object — swapping `layout` re-presents the identical tickets, so you can route `/inbox` to the table and `/inbox/[id]` to the chat view without duplicating state. Every preview is live: open a ticket, reply to it, or create a new one.

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
