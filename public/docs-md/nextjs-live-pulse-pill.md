---
title: "Shadcn Live Pulse Pill"
description: "Shadcn Live Pulse Pill. An interactive live presence pill with animated soundwave pulse and modal participant roster for active calls, streams, spaces."
url: https://avaraui.com/docs/nextjs/live-pulse-pill
---

# Shadcn Live Pulse Pill

An interactive live presence pill (`LivePulsePill`) with an animated soundwave badge, overlapping avatar stack and a participant roster modal.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/live-pulse-pill.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/live-pulse-pill
```

## Live Pulse Pill

Interactive presence pill with pulsating soundwave icon, overlapping avatar stack, and centered session participant modal.

- `variant="default"` renders the live pulse pill with expanding ambient soundwave waves and avatar stack.
- `participants=PARTICIPANTS` array of active session participants shown in the pill and modal grid.

```tsx
"use client";

import {
  LivePulsePill,
  type LiveParticipant,
} from "@/components/custom/blocks/LivePulsePillBlock";

const PARTICIPANTS: LiveParticipant[] = [
  {
    id: "p1",
    name: "David",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_240,h_240,c_fill/v1790150480/photo-1507003211169-0a1dd7228f2d-1790150482276.jpg",
  },
  {
    id: "p2",
    name: "Kira",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_240,h_240,c_fill/v1790158813/photo-1494790108377-be9c29b29330-1790158812212.jpg",
  },
  {
    id: "p3",
    name: "Marina",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_240,h_240,c_fill/v1790150483/photo-1534528741775-53994a69daeb-1790150482280.jpg",
  },
  {
    id: "p4",
    name: "Razvan",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_240,h_240,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg",
  },
  {
    id: "p5",
    name: "Ana",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_240,h_240,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg",
    isSpeaking: true,
  },
  {
    id: "p6",
    name: "Daniel",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_240,h_240,c_fill/v1790158814/photo-1539571696357-5a69c17a67c6-1790158812214.jpg",
  },
  {
    id: "p7",
    name: "Afshin",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_240,h_240,c_fill/v1790150482/photo-1530595467537-0b5996c41f2d-1790150482280.jpg",
  },
  {
    id: "p8",
    name: "Lina",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_240,h_240,c_fill/v1790150481/photo-1517841905240-472988babdf9-1790150482277.jpg",
  },
];

export default function LivePulsePillDemo() {
  return (
    <LivePulsePill
      variant="default"
      participants={PARTICIPANTS}
      title="Live Session"
      actionLabel="Join Now"
      count="+4"
      onJoin={() => alert("Joined session!")}
    />
  );
}
```

## About Shadcn Live Pulse Pill

**What it is.** `LivePulsePill` is a badge for an active call, stream or huddle: a soundwave icon, up to four overlapping avatars and a `+N` counter. Clicking it opens a roster modal with a join button. The speaker highlight is a simulation, not live audio.

**How it is built.** Driven by `participants: LiveParticipant[]`. The pill rings and badge use the `--primary` token, or the `themeColor` you pass. The roster opens in the [Modal](https://avaraui.com/docs/nextjs/modal) block, and its join button is the [Button](https://avaraui.com/docs/nextjs/button) block.

**When to use it.** Use `LivePulsePill` in collaboration headers, audio spaces or live stream navbars. For a static avatar group without a live session modal, use [Avatar Stack](https://avaraui.com/docs/nextjs/avatar-stack).

## For AI agents

**When to use**

- Live audio/video huddles, active calls, or collaborative presence indicators with a joinable participant modal

**When not to use**

- Static overlapping user avatars: use [Avatar Stack](https://avaraui.com/docs/nextjs/avatar-stack)

**Agent notes**

- Named exports from `@/components/custom/blocks/LivePulsePillBlock`: `LivePulsePill` and the `LiveParticipant` type (`id`, `name`, `avatar`, optional `isSpeaking`).
- `isSpeaking` only sets which participant is highlighted first. The highlight then moves to the next participant every 3 seconds, and clicking an avatar in the modal selects it. Real speaker state is not wired in.
- `onJoin` fires about 1.9 seconds after the Join click, once a built-in spinner and "Joined" state have played. The pill then adds a "You" avatar and shows `+5`.
- `variant` is accepted but does not change the rendering.
- Pass `open` with `onOpenChange` to control the modal, and `isJoined` to control the joined state.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "pulse"` | `"default"` | Accepted but not read by the component: both values render the same pill. |
| `participants` | `LiveParticipant[]` | `DEFAULT_LIVE_PARTICIPANTS` | Array of participants to display. The first 4 appear in the pill's overlapping avatar stack, and all of them appear in the modal grid. |
| `count` | `number \| string` | `"+" + (participants.length - 4)`, or `"+4"` with 4 or fewer | The trailing badge on the right side of the pill. A number is shown with a "+" prefix and a string as given. After the user joins it shows "+5" regardless. |
| `title` | `string` | `"Live Session"` | The header title shown inside the pop-up modal dialog. |
| `actionLabel` | `string` | `"Join Now"` | Text for the full-width action button at the bottom of the modal. |
| `onJoin` | `() => void` | `undefined` | Called about 1.9 seconds after the user clicks the action button in the modal, once the built-in loading and "Joined" states have played. |
| `disableModal` | `boolean` | `false` | When set to `true`, clicking the pill will not open the modal. |
| `open` | `boolean` | `undefined` | Controlled open state of the roster modal. Leave it unset for the pill to manage the modal itself. |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | Called when the modal opens or closes. |
| `isJoined` | `boolean` | `undefined` | Controlled joined state. When true the pill shows a "You" avatar first, and the join button reads "Joined". |
| `themeColor` | `string` | `undefined` | Color override applied to the soundwave badge, pulse ring, and modal elements (e.g. `"hsl(var(--primary))"` or hex code). |

## Works with other components

- Place `LivePulsePill` inside [Navbar](https://avaraui.com/docs/nextjs/navbar) or [Dock](https://avaraui.com/docs/nextjs/dock) headers for live collaboration status.
- Use [Avatar Stack](https://avaraui.com/docs/nextjs/avatar-stack) when you only need overlapping avatars without a live huddle modal.
- The roster is built on [Modal](https://avaraui.com/docs/nextjs/modal), so the same Escape and backdrop-click closing applies.

## How do I highlight the active speaker in LivePulsePill?

Set `isSpeaking: true` on a `LiveParticipant` to choose who is highlighted first in the modal. The highlight is a simulation: it advances to the next participant every 3 seconds, and clicking an avatar selects that person. Nothing reads real audio levels, so drive your own state if you need it.

## What happens when someone clicks Join in LivePulsePill?

The button shows a spinner for 1.2 seconds, then "Joined" for 0.7 seconds. After that the pill calls `onJoin`, closes the modal, prepends a "You" avatar and shows `+5`. Because `onJoin` fires after the animation, start your real join request in it.

## How do I open the LivePulsePill roster modal from my own code?

Pass `open` and `onOpenChange` together. With `open` set, the modal follows your state and the pill only reports changes through `onOpenChange`. Set `disableModal` to stop clicks on the pill from opening it at all. Without `open`, the pill manages the modal itself.

## How many avatars does LivePulsePill show, and what does count do?

The pill shows the first four `participants` as overlapping avatars, then a round badge. Without `count`, that badge reads `+` followed by `participants.length - 4`, or `+4` for four or fewer. A numeric `count` gets a `+` prefix and a string is shown as given. The modal lists everyone.

## Is LivePulsePill keyboard accessible?

Yes. The pill is a focusable `role="button"` that opens on Enter or Space, with `aria-haspopup="dialog"` and `aria-expanded`. The roster uses the Modal block, which sets `role="dialog"` and `aria-modal` and closes on Escape. The ripple and soundwave decorations are `aria-hidden`, but the animation ignores `prefers-reduced-motion`.

## How do I recolor LivePulsePill, and does it need Next.js?

Pass `themeColor` as a hex value or a preset name; it repoints `--primary` for the pill and modal. Without it, your theme's `--primary` is used. It has no `next/*` imports, and it installs `lucide-react` plus the Button and Modal blocks. Avatars render as plain `<img>` tags.

---

Live previews and every example: https://avaraui.com/docs/nextjs/live-pulse-pill
