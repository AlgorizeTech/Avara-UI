---
title: "Shadcn Guest Morph"
description: "A pill of overlapping faces that morphs into a guest list, with an invite form and pending invites. Free shadcn/ui component with GSAP and Motion builds."
url: https://avaraui.com/docs/nextjs/guest-morph
---

# Shadcn Guest Morph

A pill of overlapping faces that morphs into a guest list, with an invite form and pending invites.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/guest-morph.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/guest-morph
```

Or the Motion build (same props, same file — install one):

```bash
npx shadcn@latest add https://avaraui.com/r/guest-morph-motion.json
```

## Guest morph

```tsx
"use client";

import { GuestMorph, type Guest } from "@/components/custom/blocks/GuestMorphBlock";

const photo = (path: string) =>
  `https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/${path}`;

export const GUESTS: Guest[] = [
  {
    id: "1",
    name: "Ana Watson",
    note: "Hosting",
    status: "going",
    avatar: photo("v1790145139/pexels-photo-1036623-1790145143487.jpg"),
  },
  {
    id: "2",
    name: "Tom Hardy",
    note: "Bringing a plus-one",
    status: "going",
    avatar: photo("v1790145142/pexels-photo-2043590-1790145143488.jpg"),
  },
  {
    id: "3",
    name: "Mara Jade",
    note: "Vegetarian",
    status: "going",
    avatar: photo("v1790145139/pexels-photo-1587009-1790145143488.jpg"),
  },
  {
    id: "4",
    name: "Leo Silva",
    note: "Might be late",
    status: "maybe",
    since: "12m",
    avatar: photo("v1790145139/pexels-photo-3775534-1790145143488.jpg"),
  },
  {
    id: "5",
    name: "June Carter",
    note: "Waiting on a flight",
    status: "maybe",
    since: "40m",
    avatar: photo("v1790082180/pexels-photo-1520760-1790082180553.jpg"),
  },
];

export default function LaunchParty() {
  return (
    <GuestMorph
      title="Launch party"
      guests={GUESTS}
      onInvite={(email) => console.log("Invited", email)}
    />
  );
}
```

## About Shadcn Guest Morph

**What it is.** `GuestMorph` is a pill with the faces of the people who said yes. Press it and it grows into a card, and each face flies to its row.

**How it works.** The list is grouped as Going, Maybe and Pending. The Invite button opens an email field. A valid address that is not already listed is added as Pending, and the card grows to fit it. A pending invite can be cancelled.

**When to use it.** Use it for an event, a shared plan or a trip. For a plain row of faces, use [Avatar Stack](https://avaraui.com/docs/nextjs/avatar-stack).

## For AI agents

**When to use**

- Show who is coming to something, with a way to invite more people
- A compact list of replies that opens in place

**When not to use**

- A row of faces with no list behind it: use [Avatar Stack](https://avaraui.com/docs/nextjs/avatar-stack)

**Agent notes**

- Named export `GuestMorph` and the `Guest` type from `@/components/custom/blocks/GuestMorphBlock`.
- It keeps its own copy of `guests`. Read changes through `onChange`.
- `onInvite` runs before the invite shows as Pending. Throw an `Error` to show its message instead.
- Escape, the close button or a press outside folds the card back, and focus follows.
- Two builds install to the same path, so add only one: `guest-morph` (GSAP) or `guest-morph-motion` (Motion, shared `layoutId` morph).
- Honours `prefers-reduced-motion`: the card opens without the morph.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | Required | The name shown on the pill and as the card's heading. |
| `guests` | `Guest[]` | Required | The starting list: `id`, `name`, `status` (`"going" \| "maybe" \| "pending"`), and optional `note` and `since`. |
| `onInvite` | `(email: string) => void \| Promise<void>` | `undefined` | Called with the email before the invite shows as Pending. A rejection shows its message. |
| `onChange` | `(guests: Guest[]) => void` | `undefined` | Called with the list after an invite is sent or cancelled. |
| `...props` | `HTMLAttributes<HTMLDivElement>` | `undefined` | Passed to the wrapper, including `className`. |

## Works with other components

- [Avatar Stack](https://avaraui.com/docs/nextjs/avatar-stack) for a row of faces with no list.

## How do I save an invite to my server?

Pass `onInvite` an async function that posts the email. The invite shows as Pending once it resolves, and throwing an `Error` shows its message under the field.

## How does GuestMorph handle reduced motion?

When the visitor prefers reduced motion, the card opens and closes without the morph.

---

Live previews and every example: https://avaraui.com/docs/nextjs/guest-morph
