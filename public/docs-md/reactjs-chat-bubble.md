---
title: "Animated Chat Bubble"
description: "A complete, CSS-animated compound component system for building highly customized chat interfaces, messengers, and support widgets. Free shadcn/ui component."
url: https://avaraui.com/docs/nextjs/chat-bubble
---

# Animated Chat Bubble

A complete, CSS-animated compound component system for building highly customized chat interfaces, messengers, and support widgets.

Building a polished chat interface requires handling complex edge cases: **message grouping** (dynamically adjusting border radiuses so stacked messages look connected), **typing indicators**, **read receipts**, and smooth entrance animations. This component abstracts all of that logic using React Context and lightweight CSS animations — no animation library.

---

These are compound components: `ChatBubble` is the root and publishes `variant` and `layout` through context, so `ChatAvatar`, `ChatMessage` and `ChatTimestamp` style themselves without being told twice.

## Conversation

The pieces assembled into a messenger thread — set the side once on the `ChatBubble` root and the children read it from context.

- Set `variant="sent"` on the root to align the row right — it also unlocks `color` on `ChatMessage` and the ticks on `ChatTimestamp`.
- `variant="received"` is the default: aligns left and forces the neutral zinc bubble whatever `color` says.
- `color="blue"` on `ChatMessage` picks the sent-bubble fill — `primary`, `default`, `blue`, `indigo`, `rose` or `emerald`, not an arbitrary hex.
- `status="read"` on `ChatTimestamp` adds the blue double tick after the time.
- `fallback="SJ"` on `ChatAvatar` is required — the initials show until `src` loads, and stay if it fails.

```tsx
import {
  ChatAvatar,
  ChatBubble,
  ChatMessage,
  ChatTimestamp,
} from "@/components/custom/blocks/ChatBubbleBlock";

export default function ChatInterface() {
  return (
    <div className="w-full max-w-[400px] h-auto min-h-[500px] sm:h-[640px] bg-card border-x border-border shadow-2xl flex flex-col">
      {/* Header — plain markup, not part of the block */}
      <div className="px-4 py-3 border-b border-border flex items-center gap-3 bg-card/80 backdrop-blur-md sticky top-0 z-10">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-400 to-orange-300 shadow-inner" />
        <div>
          <h3 className="text-sm font-semibold text-foreground leading-none">
            Sarah Jenkins
          </h3>
          <span className="text-[11px] text-muted-foreground">
            Online
          </span>
        </div>
      </div>

      {/* Messages — `layout` is what rounds the stacked corners for you */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-start sm:justify-end space-y-1">
        <ChatBubble variant="received" layout="group-top">
          <ChatAvatar fallback="SJ" />
          <ChatMessage>Hey! Did you check out the new Docs UI kit?</ChatMessage>
        </ChatBubble>

        <ChatBubble variant="received" layout="group-bottom">
          <ChatAvatar fallback="SJ" />
          <ChatMessage>
            I heard it has a really clean compound component pattern for
            chat interfaces.
            <ChatTimestamp time="10:24 AM" />
          </ChatMessage>
        </ChatBubble>

        <div className="h-4" />

        <ChatBubble variant="sent" layout="group-top">
          <ChatAvatar fallback="ME" />
          <ChatMessage>Yeah, I'm playing with it right now.</ChatMessage>
        </ChatBubble>

        <ChatBubble variant="sent" layout="group-bottom">
          <ChatAvatar fallback="ME" />
          <ChatMessage>
            The grouping logic is built right into the context, so the
            border radius adjusts automatically when messages stack.
            <ChatTimestamp time="10:25 AM" status="read" />
          </ChatMessage>
        </ChatBubble>
      </div>

      {/* Composer — also plain markup */}
      <div className="p-4 bg-muted/40 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2 bg-background border border-input rounded-full shadow-sm">
          <ImageIcon className="w-5 h-5 text-muted-foreground" />
          <span className="flex-1 text-sm text-muted-foreground">Type a message...</span>
          <SmilePlus className="w-5 h-5 text-muted-foreground" />
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center ml-1">
            <Send className="w-3.5 h-3.5 text-primary-foreground -ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/chat-bubble.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/chat-bubble
```

## Examples

### Message grouping

- `layout="default"` is the default — a fully rounded 16px bubble with a visible avatar, for a standalone message.
- Use `layout="group-top"` on the first bubble of a run: the bottom inner corner tightens to 4px and the avatar is hidden.
- `layout="group-middle"` tightens both inner corners and hides the avatar.
- `layout="group-bottom"` closes the run — tightens the top inner corner and brings the avatar back. The corners mirror automatically for `sent` bubbles.

```tsx
import {
  ChatAvatar,
  ChatBubble,
  ChatMessage,
} from "@/components/custom/blocks/ChatBubbleBlock";

export default function GroupedMessages() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col space-y-1 p-4">
      {/* `layout` is the only thing that connects stacked messages — set it
          per bubble and the radii and avatar visibility follow. */}
      <ChatBubble variant="received" layout="group-top">
        <ChatAvatar fallback="SJ" />
        <ChatMessage>Three messages, one sender.</ChatMessage>
      </ChatBubble>

      <ChatBubble variant="received" layout="group-middle">
        <ChatAvatar fallback="SJ" />
        <ChatMessage>The inner corners tighten to 4px…</ChatMessage>
      </ChatBubble>

      <ChatBubble variant="received" layout="group-bottom">
        <ChatAvatar fallback="SJ" />
        <ChatMessage>…and only the last one keeps the avatar.</ChatMessage>
      </ChatBubble>

      <div className="h-5" />

      {/* The same three values mirror for outgoing messages. */}
      <ChatBubble variant="sent" layout="group-top">
        <ChatAvatar fallback="ME" />
        <ChatMessage>
          The same logic mirrors for sent messages.
        </ChatMessage>
      </ChatBubble>

      <ChatBubble variant="sent" layout="group-bottom">
        <ChatAvatar fallback="ME" />
        <ChatMessage>
          No manual border-radius maths required.
        </ChatMessage>
      </ChatBubble>
    </div>
  );
}
```

### Timestamps & read receipts

- Pass `time="10:25 AM"` as a plain string — required, and formatted by you, so `Just now` works in the same slot.
- `status="sent"` renders one grey tick.
- `status="delivered"` renders two grey ticks.
- `status="read"` renders two blue ticks.
- `status` left off shows the time alone — which is also what a `received` bubble does whatever you pass.

```tsx
import {
  ChatAvatar,
  ChatBubble,
  ChatMessage,
  ChatTimestamp,
} from "@/components/custom/blocks/ChatBubbleBlock";

export default function ReadReceipts() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col space-y-1 p-4">
      {/* `status` is read from the bubble's `variant` — ticks render on sent
          messages only, so a received bubble shows the time alone. */}
      <ChatBubble variant="received">
        <ChatAvatar fallback="SJ" />
        <ChatMessage>
          Received bubbles show the time only.
          <ChatTimestamp time="10:24 AM" />
        </ChatMessage>
      </ChatBubble>

      <div className="h-4" />

      <ChatBubble variant="sent">
        <ChatAvatar fallback="ME" />
        <ChatMessage>
          Sent — a single tick.
          <ChatTimestamp time="10:25 AM" status="sent" />
        </ChatMessage>
      </ChatBubble>

      <ChatBubble variant="sent">
        <ChatAvatar fallback="ME" />
        <ChatMessage>
          Delivered — double tick.
          <ChatTimestamp time="10:25 AM" status="delivered" />
        </ChatMessage>
      </ChatBubble>

      <ChatBubble variant="sent">
        <ChatAvatar fallback="ME" />
        <ChatMessage>
          Read — double tick, accented.
          <ChatTimestamp time="10:26 AM" status="read" />
        </ChatMessage>
      </ChatBubble>
    </div>
  );
}
```

### Typing indicator

`ChatTypingIndicator` takes no props of its own — it draws its own pill and loops until you unmount it.

- `variant="received"` on the root gives the dots a zinc pill, cornered to the left.
- `variant="sent"` inverts it — dark pill, light dots, cornered to the right.

```tsx
import {
  ChatAvatar,
  ChatBubble,
  ChatMessage,
  ChatTypingIndicator,
} from "@/components/custom/blocks/ChatBubbleBlock";

export default function TypingIndicator() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col p-4">
      {/* Drop the message padding and background so the three dots float on
          their own while you wait for the reply. */}
      <ChatBubble variant="received">
        <ChatAvatar fallback="SJ" />
        <ChatMessage className="px-0 py-0 bg-transparent border-0 shadow-none dark:bg-transparent">
          <ChatTypingIndicator />
        </ChatMessage>
      </ChatBubble>
    </div>
  );
}
```

## Features
Discover the key capabilities that make this component an excellent choice for modern, animated user interfaces.

### Fluid Animations

Hardware-accelerated transitions that ensure smooth 60fps performance across devices.

### Highly Customizable

Exposes intuitive props for tailoring colors, sizes, and animation speeds to fit your brand.

### Responsive Design

Automatically adapts to mobile, tablet, and desktop viewports without horizontal scrolling issues.

### Accessible

Built with semantic HTML and ARIA labels where necessary to support screen readers and keyboard navigation.

## Best Practices & Guidelines

### Animation Performance

Avoid placing too many heavy animated components on a single screen to prevent layout thrashing and maintain 60fps performance. Use intersection observers to pause off-screen animations.

### State Management

When triggering animations via state changes, ensure you wrap state updates in `startTransition` or use lightweight stores to prevent React rendering bottlenecks during the animation tick.

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `ChatBubble` | `variant` | `"sent" \| "received"` | `"received"` | Dictates the alignment of the message. `"sent"` aligns right, `"received"` aligns left. |
| `ChatBubble` | `layout` | `"default" \| "group-top" \| "group-middle" \| "group-bottom"` | `"default"` | Controls the dynamic border-radius logic to seamlessly connect stacked messages from the same sender. |
| `ChatAvatar` | `src` | `string` | `undefined` | Optional image URL for the user's avatar. |
| `ChatAvatar` | `fallback` | `string` | Required | The text initials to display if the image is missing or fails to load. |
| `ChatMessage` | `color` | `"primary" \| "default" \| "blue" \| "indigo" \| "rose" \| "emerald"` | `"primary"` | Sets the background color of the bubble. Only applies when the parent `variant` is set to `"sent"`. `"primary"` and `"default"` both follow your theme tokens, and any unlisted value falls back to them — this is a fixed set, not an arbitrary hex. |
| `ChatTimestamp` | `time` | `string` | Required | The timestamp string rendered below the text (e.g., "10:24 AM"). |
| `ChatTimestamp` | `status` | `"sent" \| "delivered" \| "read"` | `undefined` | Renders Lucide checkmarks to indicate read receipts. Only visible if the parent `variant` is `"sent"`. |
| `All Components` | `className` | `string` | `undefined` | Accepts custom Tailwind CSS classes to override default styling. All components also accept standard HTML `<div>` attributes. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/chat-bubble
