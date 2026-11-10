---
title: "Shadcn Email Dashboard"
description: "An interactive email client dashboard in default, minimal, glass and liquid-glass styles. Free shadcn/ui Email Dashboard for React, Next.js and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/email
---

# Shadcn Email Dashboard

A premium, fully interactive email client featuring a modern SaaS aesthetic. It includes out-of-the-box state management for reading, starring, archiving, deleting, and composing emails, alongside a fully responsive mobile drawer sidebar.

The client is fully encapsulated — hand it `initialEmails` and reading, starring, archiving, deleting and composing all work. Try searching for a sender, starring a message to watch it move to the Starred folder, or opening Compose.

## For AI agents

**Ask before you pick.** This page has 4 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 4 options as live previews: https://avaraui.com/view/email

**When to use it.** A self-contained email client: read, star, archive, delete and compose, with search and a mobile drawer sidebar, in four looks: the default shell, a flatter minimal one, frosted glass and liquid glass.

**Gotchas:**

- All four are looks of the one `email` item: install it once and set `variant` from the index.
- You hand it `initialEmails` (each with a `folder`, `isRead` and `isStarred`) and the client owns every interaction.

### The 4 variants

1. **Default** (`default`): The modern SaaS shell with an elevated look, themed with your accent colour.
   - Live: https://avaraui.com/view/email/default
   - Best for: a mail view in an app or dashboard on a normal background
   - Avoid if: you want a flatter, denser mailbox
   - Traits: elevated shell, default look
   - Install: `npx shadcn@latest add @avara-ui/email`
   - Set these props: `{"variant":"default"}`
   - Docs: https://avaraui.com/docs/nextjs/email#email-dashboard
2. **Minimal** (`minimal`): Strips the elevated shell for a flatter, denser mailbox.
   - Live: https://avaraui.com/view/email/minimal
   - Best for: a mail view that sits inside an existing panel
   - Avoid if: you want it to feel like a standalone product screen
   - Traits: flat, denser
   - Install: `npx shadcn@latest add @avara-ui/email`
   - Set these props: `{"variant":"minimal"}`
   - Docs: https://avaraui.com/docs/nextjs/email#minimal
3. **Glass** (`glass`): Frosts the sidebar, the list and the overlays, the Compose modal included.
   - Live: https://avaraui.com/view/email/glass
   - Best for: a mail view over a colourful or photographic background
   - Avoid if: the background is plain
   - Traits: frosted sidebar, list and overlays
   - Install: `npx shadcn@latest add @avara-ui/email`
   - Set these props: `{"variant":"glass"}`
   - Docs: https://avaraui.com/docs/nextjs/email#glass
4. **Liquid glass** (`liquid-glass`): Liquid-glass refraction using SVG displacement mapping, layered specular highlights and fluid reflections.
   - Live: https://avaraui.com/view/email/liquid-glass
   - Best for: a showpiece mail view over rich imagery
   - Avoid if: you want a restrained look or a plain background
   - Traits: refraction effect, specular highlights
   - Install: `npx shadcn@latest add @avara-ui/email`
   - Set these props: `{"variant":"liquid-glass"}`
   - Docs: https://avaraui.com/docs/nextjs/email#liquid-glass

## Email dashboard

- Pass `initialEmails` as `Email[]` — each carries its own `folder` (`inbox`, `sent`…) plus `isRead` and `isStarred`, and the client owns every interaction from there.
- `color` themes the compose button, unread dots and focus rings.

```tsx
import EmailApp, { type Email } from "@/components/custom/blocks/Email";

const emails: Email[] = [
  {
    id: 1,
    sender: "Tommy Sicilia",
    email: "tommy@example.com",
    subject: "How to Succeed with Your Shopify Store",
    time: "01:46 PM",
    fullDate: "Dec 10, 2026, 01:46 PM",
    isStarred: false,
    isRead: false,
    avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148864/80-2-1790148865112.jpg",
    labels: [
      {
        color: "bg-rose-500",
        name: "Private",
        pill: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
      },
    ],
    body: "Hello,\n\nI hope you are doing well.\n\nHere are some top tips to succeed with your new store. Let me know if you want to schedule a call.",
    attachments: [],
    folder: "inbox",
  },
  {
    id: 2,
    sender: "Tressa Gass",
    email: "tressag@mail.com",
    subject: "Please find attached the latest Company Report",
    time: "01:55 PM",
    fullDate: "Dec 10, 2026, 01:55 PM",
    isStarred: true,
    isRead: true,
    avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-4-1790148865113.jpg",
    labels: [
      {
        color: "bg-indigo-500",
        name: "Company",
        pill: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
      },
    ],
    body: "Hello John,\n\nI hope you are doing well.\n\nI am sending over a company report for company. It is a PDF file.\n\nPlease let me know if you want to schedule a call or any other questions.\n\nRegards\nTressa Gass",
    attachments: [
      { name: "Q3-Financial-Report.pdf", type: "pdf", size: "2.4 MB" },
    ],
    folder: "inbox",
  },
  {
    id: 3,
    sender: "Louetta Esses",
    email: "louetta@mail.com",
    subject: "Update Can Change Your Personal Life",
    time: "03:04 PM",
    fullDate: "Dec 10, 2026, 03:04 PM",
    isStarred: false,
    isRead: false,
    initials: "LE",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
    labels: [
      {
        color: "bg-amber-500",
        name: "Important",
        pill: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
      },
    ],
    body: "Hi there,\n\nDon't miss out on this life-changing update. Check the link below.",
    attachments: [],
    folder: "inbox",
  },
];

export default function Mailbox() {
  return <EmailApp initialEmails={emails} />;
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/email.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/email
```

## Examples

### Minimal

- Set `variant="minimal"` to strip the elevated shell for a flatter, denser mailbox.

```tsx
import EmailApp, { type Email } from "@/components/custom/blocks/Email";

const emails: Email[] = [
  {
    id: 1,
    sender: "Tommy Sicilia",
    email: "tommy@example.com",
    subject: "How to Succeed with Your Shopify Store",
    time: "01:46 PM",
    fullDate: "Dec 10, 2026, 01:46 PM",
    isStarred: false,
    isRead: false,
    avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148864/80-2-1790148865112.jpg",
    labels: [
      {
        color: "bg-rose-500",
        name: "Private",
        pill: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
      },
    ],
    body: "Hello,\n\nI hope you are doing well.\n\nHere are some top tips to succeed with your new store. Let me know if you want to schedule a call.",
    attachments: [],
    folder: "inbox",
  },
  {
    id: 2,
    sender: "Tressa Gass",
    email: "tressag@mail.com",
    subject: "Please find attached the latest Company Report",
    time: "01:55 PM",
    fullDate: "Dec 10, 2026, 01:55 PM",
    isStarred: true,
    isRead: true,
    avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-4-1790148865113.jpg",
    labels: [
      {
        color: "bg-indigo-500",
        name: "Company",
        pill: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
      },
    ],
    body: "Hello John,\n\nI hope you are doing well.\n\nI am sending over a company report for company. It is a PDF file.\n\nPlease let me know if you want to schedule a call or any other questions.\n\nRegards\nTressa Gass",
    attachments: [
      { name: "Q3-Financial-Report.pdf", type: "pdf", size: "2.4 MB" },
    ],
    folder: "inbox",
  },
  {
    id: 3,
    sender: "Louetta Esses",
    email: "louetta@mail.com",
    subject: "Update Can Change Your Personal Life",
    time: "03:04 PM",
    fullDate: "Dec 10, 2026, 03:04 PM",
    isStarred: false,
    isRead: false,
    initials: "LE",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
    labels: [
      {
        color: "bg-amber-500",
        name: "Important",
        pill: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
      },
    ],
    body: "Hi there,\n\nDon't miss out on this life-changing update. Check the link below.",
    attachments: [],
    folder: "inbox",
  },
];

export default function MinimalMailbox() {
  // Flattens the shell — no elevated card, lighter dividers.
  return <EmailApp variant="minimal" initialEmails={emails} />;
}
```

### Glass

- Set `variant="glass"` to frost the sidebar, list and overlays — the Compose modal included.

```tsx
import EmailApp, { type Email } from "@/components/custom/blocks/Email";

const emails: Email[] = [
  {
    id: 1,
    sender: "Tommy Sicilia",
    email: "tommy@example.com",
    subject: "How to Succeed with Your Shopify Store",
    time: "01:46 PM",
    fullDate: "Dec 10, 2026, 01:46 PM",
    isStarred: false,
    isRead: false,
    avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148864/80-2-1790148865112.jpg",
    labels: [
      {
        color: "bg-rose-500",
        name: "Private",
        pill: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
      },
    ],
    body: "Hello,\n\nI hope you are doing well.\n\nHere are some top tips to succeed with your new store. Let me know if you want to schedule a call.",
    attachments: [],
    folder: "inbox",
  },
  {
    id: 2,
    sender: "Tressa Gass",
    email: "tressag@mail.com",
    subject: "Please find attached the latest Company Report",
    time: "01:55 PM",
    fullDate: "Dec 10, 2026, 01:55 PM",
    isStarred: true,
    isRead: true,
    avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-4-1790148865113.jpg",
    labels: [
      {
        color: "bg-indigo-500",
        name: "Company",
        pill: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
      },
    ],
    body: "Hello John,\n\nI hope you are doing well.\n\nI am sending over a company report for company. It is a PDF file.\n\nPlease let me know if you want to schedule a call or any other questions.\n\nRegards\nTressa Gass",
    attachments: [
      { name: "Q3-Financial-Report.pdf", type: "pdf", size: "2.4 MB" },
    ],
    folder: "inbox",
  },
  {
    id: 3,
    sender: "Louetta Esses",
    email: "louetta@mail.com",
    subject: "Update Can Change Your Personal Life",
    time: "03:04 PM",
    fullDate: "Dec 10, 2026, 03:04 PM",
    isStarred: false,
    isRead: false,
    initials: "LE",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
    labels: [
      {
        color: "bg-amber-500",
        name: "Important",
        pill: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
      },
    ],
    body: "Hi there,\n\nDon't miss out on this life-changing update. Check the link below.",
    attachments: [],
    folder: "inbox",
  },
];

export default function GlassMailbox() {
  return (
    // Nature wallpaper backdrop for glass refraction
    <div
      className="p-8 rounded-2xl bg-cover bg-center relative"
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg")',
      }}
    >
      <div className="absolute inset-0 bg-black/20 rounded-2xl pointer-events-none" />
      <EmailApp variant="glass" initialEmails={emails} />
    </div>
  );
}
```

### Liquid Glass

- Set `variant="liquid-glass"` for authentic liquid glass refraction using SVG displacement mapping, multi-layer specular highlights, and fluid reflections.

```tsx
import EmailApp, { type Email } from "@/components/custom/blocks/Email";

const emails: Email[] = [
  {
    id: 1,
    sender: "Tommy Sicilia",
    email: "tommy@example.com",
    subject: "How to Succeed with Your Shopify Store",
    time: "01:46 PM",
    fullDate: "Dec 10, 2026, 01:46 PM",
    isStarred: false,
    isRead: false,
    avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148864/80-2-1790148865112.jpg",
    labels: [
      {
        color: "bg-rose-500",
        name: "Private",
        pill: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
      },
    ],
    body: "Hello,\n\nI hope you are doing well.\n\nHere are some top tips to succeed with your new store. Let me know if you want to schedule a call.",
    attachments: [],
    folder: "inbox",
  },
  {
    id: 2,
    sender: "Tressa Gass",
    email: "tressag@mail.com",
    subject: "Please find attached the latest Company Report",
    time: "01:55 PM",
    fullDate: "Dec 10, 2026, 01:55 PM",
    isStarred: true,
    isRead: true,
    avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-4-1790148865113.jpg",
    labels: [
      {
        color: "bg-indigo-500",
        name: "Company",
        pill: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
      },
    ],
    body: "Hello John,\n\nI hope you are doing well.\n\nI am sending over a company report for company. It is a PDF file.\n\nPlease let me know if you want to schedule a call or any other questions.\n\nRegards\nTressa Gass",
    attachments: [
      { name: "Q3-Financial-Report.pdf", type: "pdf", size: "2.4 MB" },
    ],
    folder: "inbox",
  },
  {
    id: 3,
    sender: "Louetta Esses",
    email: "louetta@mail.com",
    subject: "Update Can Change Your Personal Life",
    time: "03:04 PM",
    fullDate: "Dec 10, 2026, 03:04 PM",
    isStarred: false,
    isRead: false,
    initials: "LE",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
    labels: [
      {
        color: "bg-amber-500",
        name: "Important",
        pill: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
      },
    ],
    body: "Hi there,\n\nDon't miss out on this life-changing update. Check the link below.",
    attachments: [],
    folder: "inbox",
  },
];

export default function LiquidGlassMailbox() {
  return (
    // Nature wallpaper backdrop with real liquid SVG glass displacement
    <div
      className="p-8 rounded-2xl bg-cover bg-center relative"
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg")',
      }}
    >
      <div className="absolute inset-0 bg-black/25 rounded-2xl pointer-events-none" />
      <EmailApp variant="liquid-glass" initialEmails={emails} />
    </div>
  );
}
```

## Features
Discover the Email interface component's layout features, including inbox listing, message preview, and responsive split panes.

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
| `initialEmails` | `Email[]` | Required | Array of email objects to populate the client. Includes routing data like `folder` ("inbox", "sent", etc.) and state trackers like `isRead` and `isStarred`. |
| `variant` | `"default" \| "minimal" \| "glass"` | `"default"` | Applies overarching structural layouts, including borders, backdrop blurs, and shadows. |
| `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "zinc" \| (hex string)` | `"primary"` | Applies global color themes to the compose button, unread notification dots, and focus rings. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/email
