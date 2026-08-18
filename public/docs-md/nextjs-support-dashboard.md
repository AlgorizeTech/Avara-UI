# Support Dashboard

A complete, production-ready Helpdesk and Support Dashboard interface.

It now features a **dual-layout system**:

1. **Chat View:** A highly detailed 3-pane layout for resolving individual customer tickets. Features a sortable inbox, a responsive chat thread, and a collapsible metadata pane.
2. **Table View:** A macro-level Ticket System layout. Automatically calculates top-level metrics (Total, Open, High Priority) based on the exact same data object, and displays an elegant, sortable list view.

## Examples

Both layouts read the **same** `data` object — swapping `layout` re-presents the identical tickets, so you can route `/inbox` to the table and `/inbox/[id]` to the chat view without duplicating state. Every preview is live: open a ticket, reply to it, or create a new one.

export const usageChat = `import SupportDashboard, {
  SupportData,
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
  return ;
}`;

export const usageTable = `import { SupportDashboard } from "@/components/custom/blocks/Support-dashboard";

export default function TicketTable() {
  // Same \`data\`, macro view: the metric cards (Total / Open / High Priority)
  // are derived from \`data.tickets\`, not passed in.
  return ;
}`;

export const usageMinimal = `import { SupportDashboard } from "@/components/custom/blocks/Support-dashboard";

export default function EmbeddedDashboard() {
  // Borders and shadows pared back for embedding in an existing admin shell.
  return ;
}`;

export const usageGlass = `import { SupportDashboard } from "@/components/custom/blocks/Support-dashboard";

export default function GlassDashboard() {
  return (
    // \`glass\` is translucent by design — give it a colorful backdrop to sit on.

  );
}`;

## Installation

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

          "primary" | "indigo" | "rose" | "emerald" | "zinc"

          "indigo"

          Applies global accent colors to active states, send buttons, and
          metric highlights. This is a fixed set — unlike the other blocks it
          does not accept a hex string, and unrecognised values fall back to{" "}
          "indigo".

---

**Component Path:** `nextjs\support-dashboard\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
