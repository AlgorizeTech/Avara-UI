---
title: "Shadcn Email Dashboard"
description: "An interactive email client dashboard in default, minimal, glass and liquid-glass styles. Free shadcn/ui Email Dashboard for React, Next.js and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/email
---

# Shadcn Email Dashboard

A full email client UI with reading, starring, archiving, deleting, composing and a mobile drawer sidebar.

The client is fully encapsulated — hand it `initialEmails` and reading, starring, archiving, deleting and composing all work. Try searching for a sender, starring a message to see it appear in the Starred folder, or opening Compose.

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

## Minimal

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

## Glass

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

## Liquid Glass

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

## About Shadcn Email Dashboard

**What it is.** **Shadcn Email Dashboard** (the default export `EmailApp`) is a complete inbox client with folder filtering, search, starring, archiving, deletion, message reading, and a Compose modal across `"default"`, `"minimal"`, `"glass"`, and `"liquid-glass"` shells.

**How it is built.** Pass `initialEmails` (`Email[]` with `folder`, `isRead`, and `isStarred`) and optional `variant` and `color`. The list is copied into component state on mount, and folder moves, search filtering and the Compose form all run on that state. Nothing is sent or saved anywhere. The only npm dependency is `lucide-react`.

**When to use it.** Use it for webmail apps, SaaS notification centers, support ticket inboxes, and CRM communication panels.

## For AI agents

**When to use**

- Webmail apps, SaaS notification centers
- Support ticket inboxes, CRM communication panels

**When not to use**

- A direct conversation between two people: use [Chat](https://avaraui.com/docs/nextjs/chat)
- A global search-and-action bar: use [Command Palette](https://avaraui.com/docs/nextjs/command-palette)

**Agent notes**

- Default export: `import EmailApp, { type Email } from "@/components/custom/blocks/Email"`. It takes `initialEmails` (`Email[]`), `variant` (`"default" | "minimal" | "glass" | "liquid-glass"`), and `color`, and nothing else (no `className`).
- State is internal and there are no change callbacks. `initialEmails` is read once on mount, and Compose only adds a local message to `sent`; wire your own send and save logic into the file.
- The sidebar lists `inbox`, `sent`, `draft`, `starred` and `trash`, plus the labels `Private`, `Company` and `Important`. Archiving sets `folder` to `"archive"`, which has no sidebar entry.
- Reading, starring, archiving, deleting, folder routing, and composing work out of the box.
- Collapses into a responsive mobile drawer sidebar on smaller viewports.

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

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `initialEmails` | `Email[]` | Required | Array of email objects to populate the client. Includes routing data like `folder` ("inbox", "sent", etc.) and state trackers like `isRead` and `isStarred`. |
| `variant` | `"default" \| "minimal" \| "glass" \| "liquid-glass"` | `"default"` | Applies overarching structural layouts, including borders, backdrop blurs, and shadows. |
| `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "lavender" \| "blue" \| "zinc" \| (hex string)` | `"primary"` | Applies global color themes to the compose button, unread notification dots, and focus rings. |

## Works with other components

Pair `EmailApp` with [Chat](https://avaraui.com/docs/nextjs/chat) for real-time team messaging, [Command Palette](https://avaraui.com/docs/nextjs/command-palette) for quick email actions, and [Toast](https://avaraui.com/docs/nextjs/toast) for send and archive confirmations.

## Does starring or archiving update folders automatically?

Starring sets `isStarred`, and the Starred view is a filter on that flag, so the message also stays in its own folder. Deleting moves it to `trash`, and deleting from Trash removes it. Archiving moves it to `archive`, which the sidebar does not list. Unread counts update as you read.

## What is the difference between `glass` and `liquid-glass`?

`glass` frosts the sidebar, list and Compose modal with backdrop blur. `liquid-glass` renders the shell with an SVG displacement filter, specular highlights and white text for a refracted look, so it reads best over a colourful background. `default` and `minimal` use plain theme surfaces.

## How do I load my own emails into EmailApp?

Pass an `Email[]` as `initialEmails`. Each message needs `id`, `sender`, `email`, `subject`, `time`, `fullDate`, `body`, `isRead` and `isStarred`. `folder` defaults to `"inbox"`, and `labels`, `attachments`, `avatar` and `initials` are optional. The array is copied once on mount, so later prop changes are ignored.

## Does EmailApp send real email or save changes to a backend?

No. It has no callbacks and no network code. Compose builds a message from Me / me@example.com and adds it to the local `sent` folder; Reply and Forward open the same form. To connect a backend, edit `handleSendEmail` and the toggle handlers in the installed file.

## How do I change the accent colour of EmailApp?

Set `color` to `"primary"` (default), `"indigo"`, `"rose"`, `"emerald"`, `"lavender"`, `"blue"`, `"zinc"` or a hex string such as `"#0ea5e9"`. It tints the Compose button, unread indicators and selected checkboxes. `"primary"` follows your theme token, so Themes presets restyle it.

## Is EmailApp responsive?

Yes. Below the `lg` breakpoint (1024px) the sidebar becomes a slide-in drawer opened from a menu button, and it closes after you pick a folder or Compose. The client has a fixed height of 700px, or 800px from `sm` up, and takes no `className`, so change that in the file.

---

Live previews and every example: https://avaraui.com/docs/nextjs/email
