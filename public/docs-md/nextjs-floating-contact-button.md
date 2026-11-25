---
title: "Shadcn Floating Contact Button"
description: "Shadcn Floating Contact Button. A corner-anchored floating support widget (`FloatingContactButtonBlock`) that expands into a glassmorphic chat panel with…"
url: https://avaraui.com/docs/nextjs/floating-contact-button
---

# Shadcn Floating Contact Button

A corner-anchored floating support widget (`FloatingContactButtonBlock`) that expands into a glassmorphic chat panel with simulated replies and theme syncing.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/floating-contact-button.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/floating-contact-button
```

## Floating contact button

A corner-anchored trigger that expands into a glass chat panel.

- `onSendMessage` is where you forward the typed text — the widget does not send anything itself.
- `containerMode="fixed"` anchors to the viewport for real pages; use `"absolute"` to keep it inside a bounded box.
- `initialMessages` seeds the thread the reader sees on opening.

```tsx
"use client";

import { FloatingContactButtonBlock } from "@/components/custom/blocks/FloatingContactButtonBlock";

export default function SupportWidget() {
  return (
    <FloatingContactButtonBlock
      title="Chat with us"
      subtitle="We typically reply in a few minutes"
      position="bottom-right"
      onSendMessage={(message) => console.log("Send to your inbox:", message)}
    />
  );
}
```

## Bottom left

- Set `position="bottom-left"` to move the anchor and mirror the popup's transform origin with it.

```tsx
import { FloatingContactButtonBlock } from "@/components/custom/blocks/FloatingContactButtonBlock";

export default function LeftAnchoredWidget() {
  // Anchors to the opposite corner; the popup and its origin flip with it.
  return <FloatingContactButtonBlock position="bottom-left" />;
}
```

## Collapsed

- Set `defaultOpen={false}` — the default, and what a real page ships: the widget waits as a single button.

```tsx
import { FloatingContactButtonBlock } from "@/components/custom/blocks/FloatingContactButtonBlock";

export default function CollapsedWidget() {
  // Start collapsed — the usual behaviour on a real page.
  return <FloatingContactButtonBlock defaultOpen={false} />;
}
```

## Branded header

- `title="Nexus Support"` is the headline in the panel header, beside the sparkles badge.
- `subtitle` is the status line under it, and `avatarUrl` the agent photo with its online dot.

```tsx
import { FloatingContactButtonBlock } from "@/components/custom/blocks/FloatingContactButtonBlock";

export default function BrandedWidget() {
  // `title`, `subtitle` and `avatarUrl` make up the popup header.
  return (
    <FloatingContactButtonBlock
      title="Nexus Support"
      subtitle="Online · replies in ~2 min"
      avatarUrl="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_250,c_limit/v1790150483/photo-1534528741775-53994a69daeb-1790150482280.jpg"
    />
  );
}
```

## About Shadcn Floating Contact Button

**What it is.** `FloatingContactButtonBlock` is a corner-anchored support launcher (`bottom-right` or `bottom-left`) that expands into a glassmorphic chat panel with `initialMessages`, custom agent `title`/`subtitle`/`avatarUrl`, and an `onSendMessage` callback.

**How it is built.** Animated with CSS keyframes and transitions (no animation library; the only npm dependency is `lucide-react`). `containerMode="fixed"` anchors it to the viewport and `containerMode="absolute"` to the nearest positioned parent. Replies are simulated: the widget keeps the thread in its own state and answers with a canned message, and your code only sees each sent message through `onSendMessage`.

**When to use it.** Use `FloatingContactButtonBlock` for lightweight landing-page or docs support widgets. For full-screen or embedded multi-turn AI assistants, use [AI Chat](https://avaraui.com/docs/nextjs/ai-chat) or [Chat](https://avaraui.com/docs/nextjs/chat).

## For AI agents

**When to use**

- Corner-anchored support chat launchers with expandable glass panels
- Branded support headers (`title`, `subtitle`, `avatarUrl`) and `onSendMessage` integration

**When not to use**

- Full-page or inline AI chat threads — use [AI Chat](https://avaraui.com/docs/nextjs/ai-chat) or [Chat](https://avaraui.com/docs/nextjs/chat)

**Agent notes**

- Named export: `import { FloatingContactButtonBlock } from "@/components/custom/blocks/FloatingContactButtonBlock"`
- Defaults to `defaultOpen={false}` and `containerMode="fixed"`; set `containerMode="absolute"` only inside bounded preview containers
- There is no controlled `open` prop and no way to push agent replies in; `onSendMessage(text)` receives the user's text and the built-in reply is a placeholder
- The accent colour is read from `localStorage` (a hex value under `localStorageKey` and a few other keys) every 100 ms, falling back to `defaultAccentColor`
- The launcher and close buttons have no `aria-label`; add one if you ship it

## Props Reference

### FloatingContactButtonBlock Props

Extends `React.HTMLAttributes<HTMLDivElement>`. Accepts all standard native `<div>` attributes.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `position` | `"bottom-right" \| "bottom-left"` | `"bottom-right"` | Determines which viewport or container corner the trigger button and expanded chat modal adhere to. |
| `containerMode` | `"fixed" \| "absolute"` | `"fixed"` | Layout positioning engine. Use `"fixed"` for production web pages to anchor to the viewport; use `"absolute"` inside documentation preview boxes. |
| `title` | `string` | `"Chat with us"` | The primary headline string rendered in the chat modal header next to the sparkles badge. |
| `subtitle` | `string` | `"We typically reply in a few minutes"` | The secondary status string displayed beneath the title in the header. |
| `avatarUrl` | `string` | `"https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_250,c_limit/v1790150483/photo-1534528741775-53994a69daeb-1790150482280.jpg"` | Image URL for the support agent avatar rendered in the header with an online status badge. |
| `defaultOpen` | `boolean` | `false` | Whether the chat modal should render expanded by default when the component mounts. |
| `localStorageKey` | `string` | `"primaryColor"` | The `localStorage` key checked first for a hex colour, ahead of `primaryColor`, `docs-theme-color`, `theme-color`, `accentColor` and `color`. It is re-read every 100 ms and on `storage` events. |
| `defaultAccentColor` | `string` | `"var(--primary)"` | The fallback colour for the header, user message bubbles, and trigger button when no hex colour is found in storage. Accepts a hex, `rgb`, `hsl` or `var(...)` value, or a name such as `indigo`, `rose`, `emerald`, `zinc`, `amber`, `violet`, `cyan` or `blue`. |
| `initialMessages` | `ChatMessage[]` | Default greeting array | An array of message objects populated in the chat thread when the user opens the widget. |
| `onSendMessage` | `(message: string) => void` | `undefined` | Callback function fired whenever the user submits a new text message via the input bar. |

### ChatMessage Interface

Used for structuring items inside the `initialMessages` array and managing conversation state.

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes | A unique string identifier required for React list rendering; each new message animates in once, when it mounts. |
| `text` | `string` | Yes | The text body string rendered inside the message bubble. |
| `sender` | `"user" \| "agent"` | Yes | Determines bubble alignment and styling. `"user"` aligns right with the accent color; `"agent"` aligns left with neutral styling. |
| `timestamp` | `string` | Yes | Formatted time string (e.g., `"2:45 PM"` or `"Just now"`) displayed beneath the message bubble. |

## Works with other components

- Pair with [Chat Bubble](https://avaraui.com/docs/nextjs/chat-bubble) or [Chat](https://avaraui.com/docs/nextjs/chat) if you expand into a full messaging view.
- Combine with [Sonner](https://avaraui.com/docs/nextjs/sonner) to confirm offline ticket submissions.

## How do I keep the Floating Contact Button inside a container vs the viewport?

Leave `containerMode="fixed"` (the default) to pin the widget to the viewport corner. Pass `containerMode="absolute"` to anchor it to the nearest positioned parent, so give that parent `position: relative`. In absolute mode the widget scales down, to a minimum of half size, when the parent is narrower than 460px.

## How do I receive the messages visitors type into FloatingContactButtonBlock?

Pass `onSendMessage`. It runs with the trimmed text each time a visitor submits the form. The widget then shows a typing indicator and, after about 1.2 seconds, adds a canned "Thanks for reaching out!" reply. To show real agent replies, change the `handleSend` logic in the installed file.

## How does FloatingContactButtonBlock choose its accent colour?

It looks in `localStorage` for a hex value under `localStorageKey` (default `"primaryColor"`), then under `docs-theme-color`, `theme-color`, `accentColor` and `color`. If none holds a hex colour it uses `defaultAccentColor`, which is `var(--primary)` by default. While mounted it re-checks every 100 ms and wraps `setItem`.

## How do I brand the support panel and move it to the left?

Set `title` (default "Chat with us"), `subtitle` and `avatarUrl` for the header, and `initialMessages` for the opening thread. Each message needs `id`, `text`, `sender` (`"user"` or `"agent"`) and `timestamp`. Use `position="bottom-left"` to move the launcher and mirror the panel's transform origin.

## Can I open or close the contact button from my own code?

Only at mount. `defaultOpen` sets the initial state, but there is no controlled `open` prop or imperative handle; the launcher and the header's close button toggle the state inside the component. To control it from outside, lift the `isOpen` state out of the installed file and expose it as a prop.

## Is the Floating Contact Button accessible to screen readers and keyboards?

Partly. The launcher, close button and send button are native `button` elements, and the message field is a real `input` in a `form`, so Tab and Enter work. The source sets no `aria-label` or role on the launcher or close button, and it does not close on Escape, so add labels before shipping.

---

Live previews and every example: https://avaraui.com/docs/nextjs/floating-contact-button
