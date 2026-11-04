---
title: "Chat Application"
description: "A chat app interface with search filtering, simulated typing and replies, unread badges and auto-scroll, in default, minimal, glass and liquid-glass styles."
url: https://avaraui.com/docs/nextjs/chat
---

# Chat Application

A fully interactive, encapsulated chat interface. Features include search filtering, simulated typing/replies, dynamic unread badges, auto-scrolling, and a responsive mobile drawer sidebar.

Every preview is live — pick a contact, search the list, or send a message and watch the simulated reply come back. `variant` changes the shell only; the conversation state, search and typing simulation are identical across all three.

## Chat application

- Pass `contactsData` for the contact list and `currentUser` for the sender identity.
- `variant="default"` is the two-pane layout — contact list beside the thread, collapsing to a drawer on narrow screens.

```tsx
import ChatApp, { type Contact, type CurrentUser } from "@/components/custom/blocks/Chat";

const currentUser: CurrentUser = {
  avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148864/80-1-1790148865111.jpg",
  status: "online",
};

const contactsData: Contact[] = [
  {
    id: 1,
    name: "Felecia Rower",
    message: "I will purchase it for sure. 👍",
    date: "Mar 13",
    unread: 1,
    status: "offline",
    avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-1790148865113.jpg",
  },
  {
    // No `avatar`? `initials` + `color` render the fallback tile instead.
    id: 2,
    name: "Adalberto Granzin",
    message: "If it takes long you can mail me a...",
    date: "Mar 12",
    unread: 0,
    status: "offline",
    initials: "AG",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
  },
  {
    id: 3,
    name: "Zenia Jacobs",
    message: "Thank you, looking forward to it.",
    date: "Dec 13",
    unread: 0,
    status: "online",
    initials: "ZJ",
    color: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400",
  },
  {
    id: 4,
    name: "Miguel Guelff",
    message: "Can we schedule a meeting for tomorrow?",
    date: "Dec 11",
    unread: 0,
    status: "online",
    avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-3-1790148865112.jpg",
  },
];

export default function Messages() {
  return <ChatApp currentUser={currentUser} contactsData={contactsData} />;
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/chat.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/chat
```

## Examples

### Minimal

- Set `variant="minimal"` and the chat becomes two cards instead of one: the contact list on the left and the thread on the right, each a bordered card with a gap between them and nothing drawn around them — so it sits on a page as two panels rather than one big box.

```tsx
import ChatApp, { type Contact, type CurrentUser } from "@/components/custom/blocks/Chat";

const currentUser: CurrentUser = {
  avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148864/80-1-1790148865111.jpg",
  status: "online",
};

const contactsData: Contact[] = [
  {
    id: 1,
    name: "Felecia Rower",
    message: "I will purchase it for sure. 👍",
    date: "Mar 13",
    unread: 1,
    status: "offline",
    avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-1790148865113.jpg",
  },
  {
    // No `avatar`? `initials` + `color` render the fallback tile instead.
    id: 2,
    name: "Adalberto Granzin",
    message: "If it takes long you can mail me a...",
    date: "Mar 12",
    unread: 0,
    status: "offline",
    initials: "AG",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
  },
  {
    id: 3,
    name: "Zenia Jacobs",
    message: "Thank you, looking forward to it.",
    date: "Dec 13",
    unread: 0,
    status: "online",
    initials: "ZJ",
    color: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400",
  },
  {
    id: 4,
    name: "Miguel Guelff",
    message: "Can we schedule a meeting for tomorrow?",
    date: "Dec 11",
    unread: 0,
    status: "online",
    avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-3-1790148865112.jpg",
  },
];

export default function MinimalChat() {
  // Two cards instead of one: the contact list and the thread are separate
  // bordered cards with a gap between them, sitting directly on the page.
  return (
    <ChatApp
      variant="minimal"
      currentUser={currentUser}
      contactsData={contactsData}
    />
  );
}
```

### Glass

- Set `variant="glass"` for translucent panels with backdrop blur — it needs a colourful backdrop behind it to read.
- `color="rose"` tints the accents against that backdrop.

```tsx
import ChatApp, { type Contact, type CurrentUser } from "@/components/custom/blocks/Chat";

const currentUser: CurrentUser = {
  avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148864/80-1-1790148865111.jpg",
  status: "online",
};

const contactsData: Contact[] = [
  {
    id: 1,
    name: "Felecia Rower",
    message: "I will purchase it for sure. 👍",
    date: "Mar 13",
    unread: 1,
    status: "offline",
    avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-1790148865113.jpg",
  },
  {
    // No `avatar`? `initials` + `color` render the fallback tile instead.
    id: 2,
    name: "Adalberto Granzin",
    message: "If it takes long you can mail me a...",
    date: "Mar 12",
    unread: 0,
    status: "offline",
    initials: "AG",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
  },
  {
    id: 3,
    name: "Zenia Jacobs",
    message: "Thank you, looking forward to it.",
    date: "Dec 13",
    unread: 0,
    status: "online",
    initials: "ZJ",
    color: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400",
  },
  {
    id: 4,
    name: "Miguel Guelff",
    message: "Can we schedule a meeting for tomorrow?",
    date: "Dec 11",
    unread: 0,
    status: "online",
    avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-3-1790148865112.jpg",
  },
];

export default function GlassChat() {
  return (
    // `glass` is translucent by design — give it a background image or rich pattern to sit on.
    <div
      className="p-8 rounded-2xl bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg')",
      }}
    >
      <ChatApp
        variant="glass"
        color="rose"
        currentUser={currentUser}
        contactsData={contactsData}
      />
    </div>
  );
};
```

### Liquid Glass

- Set `variant="liquid-glass"` for authentic liquid glass refraction using SVG displacement mapping, multi-layer specular highlights, and fluid reflections.
- `color="rose"` tints the accents against that backdrop.

```tsx
import ChatApp, { type Contact, type CurrentUser } from "@/components/custom/blocks/Chat";

const currentUser: CurrentUser = {
  avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148864/80-1-1790148865111.jpg",
  status: "online",
};

const contactsData: Contact[] = [
  {
    id: 1,
    name: "Felecia Rower",
    message: "I will purchase it for sure. 👍",
    date: "Mar 13",
    unread: 1,
    status: "offline",
    avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-1790148865113.jpg",
  },
  {
    // No `avatar`? `initials` + `color` render the fallback tile instead.
    id: 2,
    name: "Adalberto Granzin",
    message: "If it takes long you can mail me a...",
    date: "Mar 12",
    unread: 0,
    status: "offline",
    initials: "AG",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
  },
  {
    id: 3,
    name: "Zenia Jacobs",
    message: "Thank you, looking forward to it.",
    date: "Dec 13",
    unread: 0,
    status: "online",
    initials: "ZJ",
    color: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400",
  },
  {
    id: 4,
    name: "Miguel Guelff",
    message: "Can we schedule a meeting for tomorrow?",
    date: "Dec 11",
    unread: 0,
    status: "online",
    avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-3-1790148865112.jpg",
  },
];

export default function LiquidGlassChat() {
  return (
    // Real liquid SVG glass displacement with multi-layer reflections and specular highlights
    <div
      className="p-8 rounded-2xl bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/25 rounded-2xl pointer-events-none" />
      <ChatApp
        variant="liquid-glass"
        color="rose"
        currentUser={currentUser}
        contactsData={contactsData}
      />
    </div>
  );
};
```

## Features
Explore the Chat component's robust features, including message grouping, timestamping, and responsive layout structures.

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
| `currentUser` | `CurrentUser` | Required | Object containing `avatar` (URL), `status` ("online" \| "offline"), and optional `name` for the logged-in user. |
| `contactsData` | `Contact[]` | Required | Array of objects containing contact info (`id`, `name`, `message`, `date`, `unread`, `status`). Can accept `avatar` URL or fallback `initials` and `color`. |
| `variant` | `"default" \| "minimal" \| "glass" \| "liquid-glass"` | `"default"` | The shell. `default` is one card with the list and the thread side by side; `minimal` is two separate cards — the list and the thread — with a gap between them and no outer box; `glass` is one translucent card over a photo; `liquid-glass` provides true SVG displacement liquid refraction. |
| `color` | `"indigo" \| "rose" \| "emerald" \| "zinc" \| string` | `"indigo"` | Applies global color themes to the send button, typing indicators, active contacts, and focus rings. Accepts preset theme names or valid custom hex codes (e.g. `"#00FF00"`). |

---

Live previews and every example: https://avaraui.com/docs/nextjs/chat
