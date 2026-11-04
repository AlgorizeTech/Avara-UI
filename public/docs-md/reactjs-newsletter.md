---
title: "Newsletter"
description: "A sign-up section in three layouts. Portraits puts four readers' faces around a centred form on a soft panel and lets them drift with the pointer."
url: https://avaraui.com/docs/nextjs/newsletter
---

# Newsletter

A sign-up section in three layouts. **Portraits** puts four readers' faces around a centred form on a soft panel and lets them drift with the pointer. **Spotlight** is the same form with a glow under the cursor and a ticker of who just joined. Every layout follows your site's colour scheme — soft grounds by day, near-black by night. **Issues** sets the form beside a fanned stack of recent issues, the top one on a tilting card. One reveal when the section first appears; a form that turns into a thank-you when your promise resolves; nothing else moves unless the reader does.

`Newsletter` is built from library pieces: the field is [Input](https://avaraui.com/docs/reactjs/input), the action is [Button](https://avaraui.com/docs/reactjs/button), the ticker is [Marquee](https://avaraui.com/docs/reactjs/marquee) and the top issue sits on a [Tilted Card](https://avaraui.com/docs/reactjs/tilted-card). Every piece of copy is a named part — `Heading`, `Intro`, `Form`, `Proof`, `Ticker`, `Issues` — so the words are yours.

## Portraits

Four faces around the form, drifting with the pointer. Type an address and press Subscribe — the pill becomes a thank-you with a check that draws itself.

- `portraits` are up to four `{ src, alt }` faces placed in the corners at `md` and up, each moving a little with the pointer at its own depth. Below `md` they gather in a row over the heading.
- Return a promise from `onSubscribe` and the button stays busy until it settles — resolve to show the thank-you, throw to stay on the form so you can show your own error.
- `Proof` stacks up to five `avatars` with a plus and takes the line as children.

```tsx
// Faces from Pexels, free to use.
const FACES = [
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-2379004-1790158812208.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158810/pexels-photo-220453-1790158812206.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-2381069-1790158812209.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-1130626-1790158812207.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-3785079-1790158812209.jpg",
];

export default function Signup() {
  return (
    <Newsletter
      variant="portraits"
      portraits={FACES.slice(0, 4).map((src) => ({ src, alt: "A subscriber" }))}
    >
      <Newsletter.Heading>24,000 makers read this every week</Newsletter.Heading>
      <Newsletter.Intro>
        One concise weekly note on product thinking, design and building with care. Free to read, and one click to leave.
      </Newsletter.Intro>
      <Newsletter.Form
        onSubscribe={async (email) => {
          await fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) });
        }}
      />
      <Newsletter.Proof avatars={FACES}>Read by teams at Fernway, Quillo and Brightpath</Newsletter.Proof>
    </Newsletter>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/newsletter.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/newsletter
```

Or the Motion build (same props, same file — install one):

```bash
npx shadcn@latest add https://avaraui.com/r/newsletter-motion.json
```

## Examples

### Spotlight

A glow in the accent colour follows the pointer, and a ticker of who just joined runs along the foot. Switch the docs to dark mode to see the same panel by night.

- Set `variant="spotlight"` for the glow and the ticker. The panel, form and proof restyle themselves for light and dark mode; the glow uses `--primary`, so pass `accent` to colour it.
- `Ticker` takes `items` of `{ name, avatar?, when }` and runs them left on a `MarqueeBlock` that pauses under the pointer.

```tsx
const JOINED = [
  { name: "Iris", avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-2379004-1790158812208.jpg", when: "just now" },
  { name: "Ben", avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158810/pexels-photo-220453-1790158812206.jpg", when: "2 min ago" },
  { name: "Omar", when: "15 min ago" },
];

// Faces from Pexels, free to use.
const FACES = [
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-2379004-1790158812208.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158810/pexels-photo-220453-1790158812206.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-2381069-1790158812209.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-1130626-1790158812207.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-3785079-1790158812209.jpg",
];

// Resolve to show the thank-you; throw to stay on the form.
async function subscribe(email: string) {
  const res = await fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) });
  if (!res.ok) throw new Error("We couldn't subscribe that address.");
}

export default function Signup() {
  return (
    <Newsletter variant="spotlight">
      <Newsletter.Heading>Your Thursday read, worth opening</Newsletter.Heading>
      <Newsletter.Intro>A weekly note on making products people stick with. You can opt out anytime.</Newsletter.Intro>
      <Newsletter.Form action="Sign up free" onSubscribe={subscribe} />
      <Newsletter.Proof avatars={FACES}>24,000 founders and designers subscribe</Newsletter.Proof>
      <Newsletter.Ticker items={JOINED} />
    </Newsletter>
  );
}
```

### Issues

Copy and form on the left, the latest three issues fanned on the right. Hover the stack — it spreads, and the top card tilts.

- Set `variant="issues"` for the two-column layout, left-aligned copy, on a white ground.
- `Issues` takes `items` of `{ title, date, excerpt, cover?, tag? }`: the first is the card in front — on a `TiltedCard`, with its cover and tag — and the next two sit behind it, turned.

```tsx
const ISSUES = [
  {
    title: "Defaults do the heavy lifting",
    date: "Issue 42 · This week",
    excerpt: "The settings nobody touches end up defining your product more than the features you debate for weeks.",
    cover: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148864/photo-1618005182384-a83a8bd57fbe-1790148865111.jpg",
    tag: "Design",
  },
  { title: "The case for smaller releases", date: "Issue 41", excerpt: "" },
  { title: "First-run experiences, revisited", date: "Issue 40", excerpt: "" },
];

// Faces from Pexels, free to use.
const FACES = [
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-2379004-1790158812208.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158810/pexels-photo-220453-1790158812206.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-2381069-1790158812209.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-1130626-1790158812207.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_160,c_limit/v1790158812/pexels-photo-3785079-1790158812209.jpg",
];

// Resolve to show the thank-you; throw to stay on the form.
async function subscribe(email: string) {
  const res = await fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) });
  if (!res.ok) throw new Error("We couldn't subscribe that address.");
}

export default function Signup() {
  return (
    <Newsletter variant="issues">
      <Newsletter.Heading>Notes on building with care</Newsletter.Heading>
      <Newsletter.Intro>Writing on product, craft and the little choices that add up over time.</Newsletter.Intro>
      <Newsletter.Form action="Subscribe" onSubscribe={subscribe} />
      <Newsletter.Proof avatars={FACES}>24,000 readers and counting</Newsletter.Proof>
      <Newsletter.Issues items={ISSUES} />
    </Newsletter>
  );
}
```

## Features

### Built from the library

Input for the field, Button for the action, Marquee for the ticker, Tilted Card for the top issue. Install this one item and all four come with it.

### A form that says what happened

The button stays busy while your promise runs, then the pill becomes a thank-you with a check that draws itself. A rejection returns to the form for your own message.

### One reveal, then the pointer

Heading, intro, form and proof rise in once. After that the faces drift, the glow follows and the stack spreads only when you move. Reduced motion renders the finished state.

### Accessible by default

A real email field with a label, a submit button with a busy state, a status region for the thank-you, and faces that are decorative unless you give them alt text.

## Props Reference

### Newsletter

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"portraits" \| "spotlight" \| "issues"` | `"portraits"` | The layout. |
| `portraits` | `&#123; src: string; alt?: string &#125;[]` | `[]` | Up to four faces for the `portraits` layout. |
| `accent` | `string` | theme primary | Colour of the button, tags and the spotlight glow. |
| `reveal` | `"in-view" \| "immediate"` | `"in-view"` | When the reveal plays. |
| `children` | `ReactNode` | — | The parts, in reading order. |

### Newsletter.Form

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onSubscribe` | `(email: string) => void \| Promise<void>` | — | Called on submit. A promise holds the busy state; a rejection stays on the form. |
| `placeholder` | `string` | `"name@email.com"` | Field placeholder. |
| `action` | `string` | `"Subscribe now"` | Button label. |
| `successTitle`, `successText` | `string` | `"You're subscribed"`, `"Look out for the next edition in your inbox."` | The thank-you. |

### Newsletter.Proof, Ticker, Issues

| Part | Prop | Type | Description |
| --- | --- | --- | --- |
| `Proof` | `avatars` | `string[]` | Up to five faces, stacked; the line is the children. |
| `Ticker` | `items` | `&#123; name: string; avatar?: string; when: string &#125;[]` | Who just joined, run as a marquee (`spotlight`). |
| `Issues` | `items` | `&#123; title: string; date: string; excerpt: string; cover?: string; tag?: string &#125;[]` | The first is the card in front, the next two sit behind (`issues`). |

`Heading` and `Intro` take children and any heading / paragraph props.

---

Live previews and every example: https://avaraui.com/docs/nextjs/newsletter
