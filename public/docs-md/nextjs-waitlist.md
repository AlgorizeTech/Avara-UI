---
title: "Shadcn Waitlist"
description: "A pre-launch sign-up in three layouts. Card is a compact card with the field over the button, for a corner of a page. Free shadcn/ui Waitlist block."
url: https://avaraui.com/docs/nextjs/waitlist
---

# Shadcn Waitlist

A pre-launch sign-up in three layouts. **Card** is a compact card with the field over the button, for a corner of a page. **Launch** puts your mark and a live countdown to the opening date over the form on a wide panel. **Queue** sets the form as a pill on a soft ground, with the faces of who is already in and a bar of the early spots claimed. Whichever layout, the form becomes the reader's place in line when your promise resolves — a number that counts up, and an invite link to copy to move up. One reveal when the section first appears; after that only the countdown's seconds and the reader's own actions move anything.

`Waitlist` is built from library pieces: the countdown is the [Counter](https://avaraui.com/docs/nextjs/counter)'s slide variant, the field is [Input](https://avaraui.com/docs/nextjs/input), the action is [Button](https://avaraui.com/docs/nextjs/button), the faces are an [Avatar Stack](https://avaraui.com/docs/nextjs/avatar-stack), the spots bar is [Progress](https://avaraui.com/docs/nextjs/progress) and the invite link is a [Copy Button](https://avaraui.com/docs/nextjs/copy-button). Every piece of copy is a named part — `Mark`, `Countdown`, `Heading`, `Intro`, `Form`, `Proof`, `Spots` — so the words are yours.

## Launch

Your mark, a countdown to the opening date, and the form beside its button on a wide panel. Type an address and submit — the form becomes your place in line, counting up, with an invite link to copy.

- `Countdown` takes a `date` (a `Date` or ISO string) and shows days, hours, minutes and seconds to it, each figure sliding as it changes — it is the Counter block's `slide` countdown in the panel's own text colour. Once the date has passed it shows `doneLabel` instead.
- Return a number from `onJoin` and it becomes the reader's place in line, counting up from zero. Resolve with nothing for the thank-you alone; throw an `Error` to stay on the form with its message under the field.
- `shareUrl` on `Form` adds a copy button for the reader's invite link to the thank-you, with `shareHint` beside it.

```tsx
"use client";


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

- Set `variant="card"` for the card. The heading and intro size down, the button goes full width, and the thank-you takes the card's own border rather than a shadow.
- `note` on `Form` is a small line under the button — what joining means, in your own words.

```tsx
"use client";


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

The form as a pill on a soft ground, the faces already in line under it, and a bar of the early spots claimed that fills once as the section appears. Switch the docs to dark mode to see the same panel by night.

- Set `variant="queue"` for the pill and the soft ground. The panel, form and thank-you restyle themselves for light and dark mode.
- `Spots` takes `claimed` and `total`, counts the figure up and fills a `Progress` bar to match. Pass children to write the line yourself.

```tsx
"use client";


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

### Built from the library

Counter for the countdown, Input for the field, Button for the action, Avatar Stack for the faces, Progress for the spots bar and Copy Button for the invite link. Install this one item and all six come with it.

### A thank-you that says where you stand

Resolve your promise with a number and the form becomes that place in line, counting up. Add a share link and the reader can copy it to move up. A thrown error puts its message under the field.

### One reveal, then only what matters

Mark, countdown, heading, form and proof rise in once. After that the seconds tick, the spots bar fills, and nothing else moves until the reader acts. Reduced motion renders the finished state.

### Accessible by default

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
