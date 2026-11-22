---
title: "Shadcn Waitlist"
description: "A pre-launch sign-up in three layouts. Card is a compact card with the field over the button. Free shadcn/ui Waitlist block for React, Next.js and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/waitlist
---

# Shadcn Waitlist

A pre-launch sign-up in three layouts. **Card** is a compact card with the field over the button. **Launch** puts your mark and a live countdown to the opening date over the form on a wide panel. **Queue** sets the form as a pill on a soft ground, with the faces of who is already in and a bar of early spots claimed. In every layout the form becomes the reader's place in line when your promise resolves: a number that counts up, with an invite link to copy.

`Waitlist` is built from library pieces: the countdown is the [Counter](https://avaraui.com/docs/nextjs/counter)'s slide variant, the field is [Input](https://avaraui.com/docs/nextjs/input), the action is [Button](https://avaraui.com/docs/nextjs/button), the faces are an [Avatar Stack](https://avaraui.com/docs/nextjs/avatar-stack), the spots bar is [Progress](https://avaraui.com/docs/nextjs/progress) and the invite link is a [Copy Button](https://avaraui.com/docs/nextjs/copy-button). Every piece of copy is a named part — `Mark`, `Countdown`, `Heading`, `Intro`, `Form`, `Proof`, `Spots` — so the words are yours.

## For AI agents

**Ask before you pick.** This page has 3 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 3 options as live previews: https://avaraui.com/view/waitlist

**When to use it.** A pre-launch sign-up section in three layouts: a brand mark with a live countdown, a compact card, or a pill with a bar of early spots claimed.

**When to use something else:**

- [Newsletter](https://avaraui.com/docs/nextjs/newsletter): for an ongoing subscription rather than a place in line before launch.

**Gotchas:**

- All three are layouts of the one `waitlist` item: install it once and set `variant` from the index.

### The 3 variants

1. **Launch** (`launch`): Your mark, a live countdown to the opening date, and the form beside its button on a wide panel.
   - Live: https://avaraui.com/view/waitlist/launch
   - Best for: a product with a fixed launch date
   - Avoid if: you have no launch date to count down to
   - Traits: countdown to a date, place in line after joining, invite-link copy button, wide panel
   - Install: `npx shadcn@latest add @avara-ui/waitlist`
   - Set these props: `{"variant":"launch"}`
   - Docs: https://avaraui.com/docs/nextjs/waitlist#launch
2. **Card** (`card`): A compact card with the field over the button, for a sidebar, a footer or a modal.
   - Live: https://avaraui.com/view/waitlist/card
   - Best for: small spaces: a sidebar, a footer or a modal
   - Avoid if: you want the sign-up to be a full section on the page
   - Traits: compact, full-width button, validates an empty field
   - Install: `npx shadcn@latest add @avara-ui/waitlist`
   - Set these props: `{"variant":"card"}`
   - Docs: https://avaraui.com/docs/nextjs/waitlist#card
3. **Queue** (`queue`): A pill form on a soft ground, faces already in line under it, and a bar of early spots claimed that fills in.
   - Live: https://avaraui.com/view/waitlist/queue
   - Best for: limited early access, where scarcity and a visible crowd help
   - Avoid if: there is no limit on spots
   - Traits: spots claimed bar, faces in line, light and dark mode
   - Install: `npx shadcn@latest add @avara-ui/waitlist`
   - Set these props: `{"variant":"queue"}`
   - Docs: https://avaraui.com/docs/nextjs/waitlist#queue

## Launch

Your mark, a countdown to the opening date and the form on a wide panel. Submit an address and the form becomes your place in line, with an invite link to copy.

- `Countdown` takes a `date` and counts down to it in days, hours, minutes and seconds. Once the date has passed it shows `doneLabel` instead.
- Return a number from `onJoin` and it becomes the reader's place in line. Resolve with nothing for the thank-you alone; throw an `Error` to stay on the form with its message under the field.

```tsx
"use client";

import { Waitlist } from "@/components/custom/blocks/WaitlistBlock";

// Faces from Pexels, free to use.
const FACES = [
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-2379004-1790158812208.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158810/pexels-photo-220453-1790158812206.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-2381069-1790158812209.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-1130626-1790158812207.jpg",
];

export default function EarlyAccess() {
  return (
    <Waitlist variant="launch">
      <Waitlist.Mark>T</Waitlist.Mark>
      <Waitlist.Countdown date="2026-11-01T09:00:00Z" />
      <Waitlist.Heading>Be first in line for Tidewell</Waitlist.Heading>
      <Waitlist.Intro>
        Planning your week, minus the stress. Our first 1,000 sign-ups get access ahead of everyone.
      </Waitlist.Intro>
      <Waitlist.Form
        onJoin={async (email) => {
          const res = await fetch("/api/waitlist", { method: "POST", body: JSON.stringify({ email }) });
          if (!res.ok) throw new Error("We couldn't add that address. Please retry.");
          const { position } = await res.json();
          return position; // shown as "#2,341 in line"
        }}
        shareUrl="https://tidewell.app/?ref=k7x2q"
      />
      <Waitlist.Proof avatars={FACES}>4,120 people have signed up already</Waitlist.Proof>
    </Waitlist>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/waitlist.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/waitlist
```

## Examples

### Card

A compact card with the field over the button — for a sidebar, a footer or a modal. Submit an empty field to see the input report it.

- Use `variant="card"` for the card: the heading and intro size down and the button goes full width.

```tsx
"use client";

import { Waitlist } from "@/components/custom/blocks/WaitlistBlock";

// Faces from Pexels, free to use.
const FACES = [
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-2379004-1790158812208.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158810/pexels-photo-220453-1790158812206.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-2381069-1790158812209.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-1130626-1790158812207.jpg",
];

// Resolve with a number and it becomes the reader's place in line.
async function join(email: string): Promise<number> {
  const res = await fetch("/api/waitlist", { method: "POST", body: JSON.stringify({ email }) });
  if (!res.ok) throw new Error("We couldn't add that address. Please retry.");
  const { position } = await res.json();
  return position; // shown as "#2,341 in line"
}

export default function JoinCard() {
  return (
    <Waitlist variant="card">
      <Waitlist.Heading>Reserve your spot</Waitlist.Heading>
      <Waitlist.Intro>Hear the moment we launch. A single email, nothing more.</Waitlist.Intro>
      <Waitlist.Form
        action="Save my spot"
        onJoin={join}
        note="Signing up means we may email you about the launch."
      />
      <Waitlist.Proof avatars={FACES}>2,300 people already queued</Waitlist.Proof>
    </Waitlist>
  );
}
```

### Queue

The form as a pill on a soft ground, the faces already in line under it, and a bar of early spots claimed.

- Set `variant="queue"` for the pill and the soft ground. Both light and dark mode are covered.
- `Spots` takes `claimed` and `total`, counts the figure up and fills a `Progress` bar to match.

```tsx
"use client";

import { Waitlist } from "@/components/custom/blocks/WaitlistBlock";

// Faces from Pexels, free to use.
const FACES = [
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-2379004-1790158812208.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158810/pexels-photo-220453-1790158812206.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-2381069-1790158812209.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-1130626-1790158812207.jpg",
];

// Resolve with a number and it becomes the reader's place in line.
async function join(email: string): Promise<number> {
  const res = await fetch("/api/waitlist", { method: "POST", body: JSON.stringify({ email }) });
  if (!res.ok) throw new Error("We couldn't add that address. Please retry.");
  const { position } = await res.json();
  return position; // shown as "#2,341 in line"
}

export default function GetInLine() {
  return (
    <Waitlist variant="queue">
      <Waitlist.Heading>Great products open to a few first. Be one of them.</Waitlist.Heading>
      <Waitlist.Intro>
        Tidewell lets people in a batch at a time, so everyone gets a real onboarding. Sign up today and your place is reserved.
      </Waitlist.Intro>
      <Waitlist.Form action="Notify me" onJoin={join} shareUrl="https://tidewell.app/?ref=k7x2q" />
      <Waitlist.Proof avatars={FACES}>10,000+ people waiting</Waitlist.Proof>
      <Waitlist.Spots claimed={1240} total={2000} />
    </Waitlist>
  );
}
```

## Features

Counter for the countdown, Input for the field, Button for the action, Avatar Stack for the faces, Progress for the spots bar and Copy Button for the invite link. Install this one item and all six come with it.

Resolve your promise with a number and the form becomes that place in line, counting up. Add a share link and the reader can copy it to move up. A thrown error puts its message under the field.

Mark, countdown, heading, form and proof rise in once. After that the seconds tick, the spots bar fills, and nothing else moves until the reader acts. Reduced motion renders the finished state.

A real email field with a label, a submit button with a busy state, an alert for a bad address, a status region for the thank-you, a timer role on the countdown and a progress bar with real values.

## Props Reference

### Waitlist

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"card" \| "launch" \| "queue"` | `"card"` | The layout. |
| `accent` | `string` | theme primary | Colour of the mark, the button and the spots bar. |
| `reveal` | `"in-view" \| "immediate"` | `"in-view"` | When the reveal plays. |
| `children` | `ReactNode` | — | The parts, in reading order. |

### Waitlist.Form

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onJoin` | `(email: string) => void \| number \| Promise<void \| number>` | — | Called on submit. A promise holds the busy state; a number becomes the place in line; a thrown `Error` shows its message under the field. |
| `placeholder` | `string` | `"name@email.com"` | Field placeholder. |
| `action` | `string` | `"Get on the list"` | Button label. |
| `successTitle`, `successText` | `string` | `"Your spot is saved"`, `"Expect an email from us as soon as your invite opens up."` | The thank-you. |
| `positionLabel` | `string` | `"in line"` | The word after the number. |
| `shareUrl` | `string` | — | The reader's invite link. Given, the thank-you shows a copy button. |
| `shareLabel`, `shareHint` | `string` | `"Copy referral link"`, `"Each friend who joins bumps you forward."` | The copy button's label and the line beside it. |
| `note` | `string` | — | A small line under the form. |

### Waitlist.Countdown, Proof, Spots

| Part | Prop | Type | Description |
| --- | --- | --- | --- |
| `Countdown` | `date` | `Date \| string` | When the doors open. Days, hours, minutes and seconds to it are shown, ticking — the [Counter](https://avaraui.com/docs/nextjs/counter)'s `slide` countdown. |
| `Countdown` | `label`, `doneLabel` | `string` | The line over the figures (`"Launching in"`), and what replaces them once the date has passed (`"Now live"`). |
| `Proof` | `avatars` | `string[]` | Up to four faces, stacked, with the rest folded into a count; the line is the children. |
| `Spots` | `claimed`, `total` | `number` | How many early places are gone, of how many. The figure counts up and the bar fills to match; pass children to write the line yourself. |

`Mark` takes children — a letter, an `<img>` or an SVG — and sits in a square of the accent. `Heading` and `Intro` take children and any heading / paragraph props.

---

Live previews and every example: https://avaraui.com/docs/nextjs/waitlist
