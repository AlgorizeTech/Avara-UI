---
title: "Shadcn Conversation Timeline"
description: "Shadcn Conversation Timeline. A compact message minimap rail (`ConversationTimeline`) that expands on hover or focus into a labelled checkpoint list without…"
url: https://avaraui.com/docs/nextjs/conversation-timeline
---

# Shadcn Conversation Timeline

A compact message minimap rail (`ConversationTimeline`) that expands on hover or focus into a labelled checkpoint list without shifting layout width.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/conversation-timeline.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/conversation-timeline
```

### Density

Drag the sliders, then hover the rail to see the new sizes.

- `rowHeight` is each row's height once expanded (default `24`); `collapsedRowHeight` is its height at rest (default `10`).
- `visibleCount` caps how many rows show before the rail scrolls (default `10`) — the faded edges appear only when there is more to scroll to. `labelWidth` is the fixed column labels truncate against (default `240`).

```tsx
"use client";

import { useState } from "react";
import { ConversationTimeline, type TimelineCheckpoint } from "@/components/custom/blocks/ConversationTimelineBlock";

const checkpoints: TimelineCheckpoint[] = [
  { id: "1", role: "system", label: "System prompt" },
  { id: "2", role: "user", label: "Can you help me set up auth?" },
  { id: "3", role: "assistant", label: "Of course - let me walk you through it" },
  { id: "4", role: "user", label: "Let's go with GitHub OAuth" },
  { id: "5", role: "assistant", label: "Create the OAuth app callback" },
  { id: "6", role: "user", label: "Where do the secrets go?" },
  { id: "7", role: "assistant", label: "Use .env.local for dev, secrets store in prod" },
  { id: "8", role: "user", label: "How do I protect a route?" },
  { id: "9", role: "assistant", label: "Add middleware.ts with a matcher" },
  { id: "10", role: "user", label: "Can I read the session in a server component?" },
  { id: "11", role: "assistant", label: "Yes - call auth() on the server" },
  { id: "12", role: "user", label: "What about sign-out?" },
  { id: "13", role: "assistant", label: "signOut() in a server action" },
  { id: "14", role: "user", label: "Perfect, thanks!" },
];

// rowHeight / collapsedRowHeight set the expanded and resting row sizes;
// visibleCount caps how many rows show before the rail scrolls, and
// labelWidth is the fixed column labels truncate against.
export default function DenseRail() {
  const [activeId, setActiveId] = useState("2");

  return (
    <ConversationTimeline
      checkpoints={checkpoints}
      activeId={activeId}
      onSelect={setActiveId}
      rowHeight={28}
      collapsedRowHeight={8}
      visibleCount={8}
      labelWidth={200}
    />
  );
}
```

## About Shadcn Conversation Timeline

**What it is.** `ConversationTimeline` renders a compact hairline minimap for long conversations that expands on hover or keyboard focus into a labelled list of checkpoints (`side="right" | "left"`, `showLabels`, `visibleCount`, `rowHeight`, `collapsedRowHeight`).

**How it is built.** Animates only row `height` while re-anchoring scroll position each frame so a scrolled list expands in place without jumping, stays expanded on touch devices, and snaps cleanly under `prefers-reduced-motion`.

**When to use it.** Use `ConversationTimeline` beside long AI or support chat threads so users can jump between turns. For document section outlines, use [Table of Contents](https://avaraui.com/docs/nextjs/table-of-contents).

## For AI agents

**When to use**

- Hover-expanding message minimap rails beside long [AI Chat](https://avaraui.com/docs/nextjs/ai-chat) or [Chat](https://avaraui.com/docs/nextjs/chat) threads

**When not to use**

- Document heading outlines — use [Table of Contents](https://avaraui.com/docs/nextjs/table-of-contents)
- Chronological event feeds — use [Timeline](https://avaraui.com/docs/nextjs/timeline)

**Agent notes**

- Named export from `@/components/custom/blocks/ConversationTimelineBlock`
- Pass `checkpoints` (`{ id, label, role? }[]`), `activeId`, and `onSelect(id)` to scroll or highlight the target message
- The rail is controlled: it never scrolls the chat or sets `activeId` itself, so keep `activeId` in your own state
- `role` and `sublabel` on a checkpoint are not rendered by the rail; only `label` is shown

## Props Reference

### `<ConversationTimeline>` Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `checkpoints` | `TimelineCheckpoint[]` | Required | One mark per entry, in order. |
| `activeId` | `string` | — | Currently selected checkpoint id — its mark takes the accent colour. |
| `onSelect` | `(id: string) => void` | — | Fires with the id of a clicked mark. |
| `side` | `"left" \| "right"` | `"right"` | Which side of the marks the labels sit on. |
| `rowHeight` | `number` | `24` | Per-row height once expanded (hovering / focusing the rail), in px. |
| `collapsedRowHeight` | `number` | `10` | Per-row height at rest — just the marks, tightly packed. |
| `visibleCount` | `number` | `10` | Rows visible before scrolling. The rail's maximum height is `visibleCount × rowHeight` when expanded and `visibleCount × collapsedRowHeight` at rest. |
| `labelWidth` | `number` | `240` | Fixed label column width in px — labels truncate past it. |
| `showLabels` | `boolean` | `true` | Render the label column. Set `false` where width is tight and the rail becomes a marks-only minimap — each mark keeps its label as its accessible name. |
| `accent` | `string` | `"var(--primary)"` | Colour of the active row's line. Any CSS colour. |
| `className` | `string` | — | Merged onto the rail. |

### `TimelineCheckpoint`

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier — also the React key. |
| `label` | `string` | Text revealed when the rail expands; also the mark's accessible name. |
| `sublabel` | `string` | Optional — reserved for richer labels. |
| `role` | `"user" \| "assistant" \| "system"` | Optional role tag, handy for styling the conversation the rail points at. |

## Works with other components

- Pair `ConversationTimeline` beside [AI Chat](https://avaraui.com/docs/nextjs/ai-chat) or [Chat](https://avaraui.com/docs/nextjs/chat) threads to jump between messages.
- Use [Table of Contents](https://avaraui.com/docs/nextjs/table-of-contents) instead when the rail should outline headings in a document.
- Use [Timeline](https://avaraui.com/docs/nextjs/timeline) for a chronological event feed rather than a message minimap.

## How does ConversationTimeline behave on touch devices?

When the device reports `(hover: none)`, the rail starts expanded and stays that way, so labels stay readable and each row is tappable without a hover step. It follows the media query if it changes, so the layout adapts if the input device changes.

## How do I scroll a chat to a message when I click its mark?

Keep `activeId` in your own state and pass `setActiveId` as `onSelect`. The rail only reports the clicked `id` and never scrolls anything itself, so call `scrollIntoView` on that message's element in an effect when `activeId` changes, as the paired chat example does.

## How do I show only the marks on small screens?

Set `showLabels={false}`. The label column is removed and the rail shrinks to the mark width, which leaves the room to the chat. Each mark is still a button with an `aria-label` taken from the checkpoint's `label`. Drive the prop from a `matchMedia` check, as the chat example does.

## Is ConversationTimeline keyboard accessible?

Each mark is a real `<button>` that you can reach with `Tab` and activate with `Enter` or `Space`. Focusing any mark expands the whole rail, and moving focus out collapses it. The active mark gets `aria-current`. There is no arrow-key navigation between marks.

## How do I control how many rows show and how dense the rail is?

Use `visibleCount` for how many rows show before the rail scrolls (default `10`), `rowHeight` for the expanded row (`24`) and `collapsedRowHeight` for the resting row (`10`). Beyond `visibleCount`, the scrollbar is hidden and the top and bottom edges fade to hint at more rows.

## Does ConversationTimeline respect reduced motion?

Yes. When `prefers-reduced-motion: reduce` matches, the height and label transitions are set to `none`, so the rail snaps open and closed. The per-frame scroll re-anchoring is also skipped, and the scroll position is applied once instead. The preference is read live, so changing it takes effect without a reload.

---

Live previews and every example: https://avaraui.com/docs/nextjs/conversation-timeline
