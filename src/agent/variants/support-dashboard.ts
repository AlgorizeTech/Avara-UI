import type { PageVariants } from "./types";

/**
 * Support dashboard: 4 looks of one registry item (`support-dashboard`), chosen
 * with the `layout` and `variant` props. The preview demo is named `support`.
 * Claims come from src/app/docs/[framework]/support-dashboard/page.mdx.
 */
export const supportDashboard: PageVariants = {
  slug: "support-dashboard",
  intro:
    "A helpdesk and support dashboard. Two layouts (a three-pane ticket workspace, or a sortable table under metric cards) and two translucent glass styles.",
  gotchas: [
    "All four are looks of the one `support-dashboard` item: install it once and set `layout` and `variant` from the index (the default ticket workspace needs neither).",
    "The glass colour is a fixed set of presets, not a hex value; an unrecognised value falls back to `indigo`.",
  ],
  variants: [
    {
      id: "ticket-workspace",
      group: "Plain layouts",
      label: "Ticket workspace",
      summary: "A three-pane drill-down: inbox, conversation thread and a collapsible properties pane.",
      bestFor: ["agents who work through tickets one conversation at a time"],
      avoidIf: ["you want an overview of many tickets at once"],
      traits: ["inbox", "conversation thread", "properties pane", "uses the `support-dashboard` item"],
      item: "support-dashboard",
      demo: "support",
      example: "Ticket workspace",
      props: { layout: "chat", variant: "default" },
    },
    {
      id: "table-view",
      group: "Plain layouts",
      label: "Table view",
      summary: "The same tickets as a sortable list under metric cards that are computed from the ticket data.",
      bestFor: ["managers who want an overview and sortable list of tickets"],
      avoidIf: ["agents need to read and reply to conversations in place"],
      traits: ["sortable table", "metric cards", "uses the `support-dashboard` item"],
      item: "support-dashboard",
      demo: "support",
      example: "Table view",
      props: { layout: "table", variant: "default" },
      setProps: { layout: "table" },
    },
    {
      id: "glass",
      group: "Glass styles",
      label: "Glass workspace",
      summary: "The ticket workspace with translucent panes and a backdrop blur.",
      bestFor: ["an atmospheric dashboard over a gradient or image background"],
      avoidIf: ["you want flat, opaque panes"],
      traits: ["translucent panes", "backdrop blur", "uses the `support-dashboard` item"],
      item: "support-dashboard",
      demo: "support",
      example: "Glass",
      props: { layout: "chat", variant: "glass" },
      setProps: { variant: "glass" },
    },
    {
      id: "liquid-glass",
      group: "Glass styles",
      label: "Liquid glass workspace",
      summary: "The ticket workspace in layered liquid glass with animated displacement waves and specular edge highlights.",
      bestFor: ["a showpiece dashboard where a rich glass effect is part of the brand"],
      avoidIf: ["you want a plain, dense working tool"],
      traits: ["liquid glass", "SVG displacement waves", "specular highlights", "uses the `support-dashboard` item"],
      item: "support-dashboard",
      demo: "support",
      example: "Liquid glass",
      props: { layout: "chat", variant: "liquid-glass" },
      setProps: { variant: "liquid-glass" },
    },
  ],
};
