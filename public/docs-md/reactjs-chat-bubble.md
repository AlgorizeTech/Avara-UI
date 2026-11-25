---
title: "Shadcn Chat Bubble"
description: "A complete, CSS-animated compound component system for building highly customized chat interfaces, messengers, and support widgets. Free shadcn/ui component."
url: https://avaraui.com/docs/nextjs/chat-bubble
---

# Shadcn Chat Bubble

A complete, CSS-animated compound component system for building highly customized chat interfaces, messengers, and support widgets.

Building a polished chat interface requires handling complex edge cases: **message grouping** (dynamically adjusting border radiuses so stacked messages look connected), **typing indicators**, **read receipts**, and smooth entrance animations. This component abstracts all of that logic using React Context and lightweight CSS animations — no animation library.

---

These are compound components: `ChatBubble` is the root and publishes `variant` and `layout` through context, so `ChatAvatar`, `ChatMessage` and `ChatTimestamp` style themselves without being told twice.

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

## Conversation

The pieces assembled into a messenger thread. Set the side once on the `ChatBubble` root and the children read it from context.

- Use `variant="sent"` on the root aligns the row right and unlocks `color` on `ChatMessage` and the ticks on `ChatTimestamp`. `"received"` is the default.
- `fallback="SJ"` on `ChatAvatar` is required: the initials show until `src` loads, and stay if it fails.

```tsx
import {
  ChatAvatar,
  ChatBubble,
  ChatMessage,
  ChatTimestamp,
} from "@/components/custom/blocks/ChatBubbleBlock";
import { ImageIcon, Send, SmilePlus } from "lucide-react";

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

## Message grouping

- Use `layout="group-top"` on the first bubble of a run tightens its bottom inner corner and hides the avatar. `"group-middle"` tightens both, and `"group-bottom"` closes the run and brings the avatar back.

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

## Timestamps & read receipts

- Pass `time="10:25 AM"` is a plain string you format yourself, so `Just now` works in the same slot.
- `status="read"` adds ticks after the time: `"sent"` one grey, `"delivered"` two grey, `"read"` two blue. Leave it off for the time alone.

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

## Typing indicator

`ChatTypingIndicator` takes no props of its own. It draws its own pill and loops until you unmount it.

- `variant` on the root sets the pill: `"received"` is zinc and cornered left, `"sent"` is dark and cornered right.

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

## About Shadcn Chat Bubble

**What it is.** **Shadcn Chat Bubble** is a compound messaging primitive set (`ChatBubble`, `ChatAvatar`, `ChatMessage`, `ChatTimestamp`, and `ChatTypingIndicator`) with context-driven alignment, message grouping, and read receipts.

**How it is built.** `ChatBubble` publishes `variant` (`"sent" | "received"`) and `layout` (`"default" | "group-top" | "group-middle" | "group-bottom"`) via React Context, and the parts read them. The pop-in and typing-dot animations are CSS keyframes that play only when `prefers-reduced-motion: no-preference`. It installs only `lucide-react`, with no animation library and no `next/*` imports.

**When to use it.** Use it to assemble custom chat threads, live support widgets, comment feeds, and AI assistant message lists.

## For AI agents

**When to use**

- Assemble custom chat threads, live support widgets
- Comment feeds, AI assistant message lists

**When not to use**

- A complete two-pane messenger with contact search: use [Chat](https://avaraui.com/docs/reactjs/chat)
- An LLM assistant with a tool picker and model selector: use [AI Chat](https://avaraui.com/docs/reactjs/ai-chat)

**Agent notes**

- Render one `ChatBubble` per message. Set `variant="sent" | "received"` and optional `layout` (`"group-top" | "group-middle" | "group-bottom"`) on it; the child primitives read them from Context and throw if used outside a `ChatBubble`.
- Put `ChatAvatar` and `ChatMessage` as siblings inside the `ChatBubble`, and put `ChatTimestamp` inside the `ChatMessage`, as the example does.
- Always pass `fallback` initials on `ChatAvatar` for loading and error fallback states. In `group-top` and `group-middle` the avatar is hidden but still takes up space, so the rows stay aligned.
- `ChatMessage` `color` only applies to sent messages. Received messages always use the muted surface.
- Use `ChatTimestamp` with `status="sent" | "delivered" | "read"` on sent messages, and mount `ChatTypingIndicator` inside its own `ChatBubble` while awaiting replies.

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `ChatBubble` | `variant` | `"sent" \| "received"` | `"received"` | Dictates the alignment of the message. `"sent"` aligns right, `"received"` aligns left. |
| `ChatBubble` | `layout` | `"default" \| "group-top" \| "group-middle" \| "group-bottom"` | `"default"` | Controls the dynamic border-radius logic to seamlessly connect stacked messages from the same sender. |
| `ChatAvatar` | `src` | `string` | `undefined` | Optional image URL for the user's avatar. |
| `ChatAvatar` | `fallback` | `string` | Required | The text initials to display if the image is missing or fails to load. |
| `ChatMessage` | `color` | `"primary" \| "default" \| "blue" \| "indigo" \| "rose" \| "emerald" \| "lavender" \| string` | `"primary"` | Sets the background color of the bubble. Only applies when the parent `variant` is set to `"sent"`. `"primary"` and `"default"` both follow your theme tokens. A string starting with `#` is used as the background with white text; any other unlisted name falls back to the theme. |
| `ChatTimestamp` | `time` | `string` | Required | The timestamp string rendered below the text (e.g., "10:24 AM"). |
| `ChatTimestamp` | `status` | `"sent" \| "delivered" \| "read"` | `undefined` | Renders Lucide checkmarks to indicate read receipts. Only visible if the parent `variant` is `"sent"`. |
| `All Components` | `className` | `string` | `undefined` | Accepts custom Tailwind CSS classes to override default styling. All components also accept standard HTML `<div>` attributes. |

## Works with other components

- Combine `ChatBubble` with [Chat](https://avaraui.com/docs/reactjs/chat) for a full two-pane messenger, [Voice Note](https://avaraui.com/docs/reactjs/voice-note) for inline audio messages, and [Conversation Timeline](https://avaraui.com/docs/reactjs/conversation-timeline) for threaded support logs.
- Show who is in the conversation with an [Avatar Stack](https://avaraui.com/docs/reactjs/avatar-stack) in your thread header.

## How do I group consecutive messages from the same sender?

Give each message its own `ChatBubble` and set `layout="group-top"` on the first, `"group-middle"` on the ones between, and `"group-bottom"` on the last. The inner corners tighten to a small radius, and the avatar stays hidden until the last bubble so the run reads as one block.

## How do I show a typing indicator with ChatTypingIndicator?

Render `<ChatTypingIndicator />` inside its own `ChatBubble` while you wait for a reply, and unmount it when the message arrives. It takes no props beyond standard `div` attributes. It reads `variant` from the parent, so `"received"` gives a muted pill on the left and `"sent"` a primary one on the right.

## How do I change the colour of sent messages in ChatMessage?

Set `color` on `ChatMessage` inside a `ChatBubble variant="sent"`. Choose `"primary"` (the default, which follows your theme), `"blue"`, `"indigo"`, `"rose"`, `"emerald"` or `"lavender"`, or pass a hex string such as `"#7c3aed"`. Received messages ignore `color` and always use the muted surface.

## Why does ChatMessage throw "must be used within a ChatBubble root"?

`ChatAvatar`, `ChatMessage`, `ChatTimestamp` and `ChatTypingIndicator` read `variant` and `layout` from a React context that only `ChatBubble` provides, so rendering one on its own throws that error. Wrap each message in a `ChatBubble`, which also sets whether the row aligns left or right.

## What happens when a ChatAvatar image fails to load?

`ChatAvatar` shows the required `fallback` text, such as initials, in a round muted tile whenever `src` is missing or the image errors. It also checks on mount for an image that failed before hydration, so server-rendered pages still fall back. Changing `src` gives the new image a fresh attempt.

---

Live previews and every example: https://avaraui.com/docs/nextjs/chat-bubble
