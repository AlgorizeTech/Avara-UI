# Email Dashboard

A premium, fully interactive email client featuring a modern SaaS aesthetic. It includes out-of-the-box state management for reading, starring, archiving, deleting, and composing emails, alongside a fully responsive mobile drawer sidebar.

## Examples

The client is fully encapsulated — hand it `initialEmails` and reading, starring, archiving, deleting and composing all work. Try searching for a sender, starring a message to watch it move to the Starred folder, or opening Compose.

export const usageDefault = `import EmailApp from "@/components/custom/blocks/Email";

const emails = [
  {
    id: 1,
    sender: "Tressa Gass",
    email: "tressag@mail.com",
    subject: "Please find attached the latest Company Report",
    time: "01:55 PM",
    fullDate: "Dec 10, 2026, 01:55 PM",
    isStarred: true,
    isRead: true,
    avatar: "/avatars/tressa.jpg",
    labels: [
      {
        color: "bg-indigo-500",
        name: "Company",
        pill: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
      },
    ],
    body: "Hello John,\\n\\nI am sending over the company report.",
    attachments: [
      { name: "Q3-Financial-Report.pdf", type: "pdf", size: "2.4 MB" },
    ],
    folder: "inbox",
  },
];

export default function Mailbox() {
  return ;
}`;

export const usageMinimal = `import EmailApp from "@/components/custom/blocks/Email";

export default function MinimalMailbox() {
  // Flattens the shell — no elevated card, lighter dividers.
  return ;
}`;

export const usageGlass = `import EmailApp from "@/components/custom/blocks/Email";

export default function GlassMailbox() {
  return (
    // Nature wallpaper backdrop for glass refraction

  );
}`;

## Installation

## Features
Discover the Email interface component's layout features, including inbox listing, message preview, and responsive split panes.

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

          initialEmails

          Email[]

          Required

          Array of email objects to populate the client. Includes routing data
          like folder ("inbox", "sent", etc.) and state trackers
          like isRead and isStarred.

          variant

          "default" | "minimal" | "glass"

          "default"

          Applies overarching structural layouts, including borders, backdrop
          blurs, and shadows.

          color

            "primary" | "indigo" | "rose" | "emerald" | "zinc" | (hex string)

          "primary"

          Applies global color themes to the compose button, unread notification
          dots, and focus rings.

---

**Component Path:** `[framework]\email\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
