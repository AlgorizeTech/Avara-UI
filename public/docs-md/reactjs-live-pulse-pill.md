---
title: "Shadcn Live Pulse Pill"
description: "Shadcn Live Pulse Pill. An interactive live presence pill with animated soundwave pulse and modal participant roster for active calls, streams, spaces."
url: https://avaraui.com/docs/nextjs/live-pulse-pill
---

# Shadcn Live Pulse Pill

An interactive live presence pill with an animated soundwave pulse and modal participant roster for active calls, streams, audio spaces, and huddles.

Clicking the pill triggers a smooth pop-up modal displaying active session participants, real-time speaker badges, and a direct action trigger.

## Live Pulse Pill

Interactive presence pill with pulsating soundwave icon, overlapping avatar stack, and centered session participant modal.

- `variant="default"` renders the live pulse pill with expanding ambient soundwave waves and avatar stack.
- `participants=PARTICIPANTS` array of active session participants shown in the pill and modal grid.

```tsx
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

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "pulse"` | `"default"` | Visual style variant for the live presence pill. |
| `participants` | `LiveParticipant[]` | `DEFAULT_LIVE_PARTICIPANTS` | Array of participants to display. The first 4 appear in the pill's overlapping avatar stack, and all 8 appear inside the modal. |
| `count` | `number \| string` | `"+4"` | The trailing badge text or number displayed on the right side of the pill. |
| `title` | `string` | `"Live Session"` | The header title shown inside the pop-up modal dialog. |
| `actionLabel` | `string` | `"Join Now"` | Text for the full-width action button at the bottom of the modal. |
| `onJoin` | `() => void` | `undefined` | Callback triggered when the user clicks the action button inside the modal. |
| `disableModal` | `boolean` | `false` | When set to `true`, clicking the pill will not open the modal. |
| `themeColor` | `string` | `undefined` | Color override applied to the soundwave badge, pulse ring, and modal elements (e.g. `"hsl(var(--primary))"` or hex code). |

---

Live previews and every example: https://avaraui.com/docs/nextjs/live-pulse-pill
