---
title: "Command Palette"
description: "Shadcn Command Palette. A keyboard-first `CommandPalette` with `linear`, `nested` drill-down, `inline`."
url: https://avaraui.com/docs/nextjs/command-palette
---

# Command Palette

A keyboard-first `CommandPalette` with `linear`, `nested` drill-down, `inline`, and streaming `ai` variants triggered via search bar or `Ctrl+K`.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/command-palette.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/command-palette
```

## Linear

Click the search box in the top right (or press Ctrl+K) to open the command palette modal over the dimmed overlay.

- Pass `variant="linear"` selects the Linear-inspired command palette variant.
- `triggerPlaceholder="Search anything..."` sets the placeholder label inside the initial search bar trigger.

```tsx
import { CommandPalette } from "@/components/custom/blocks/CommandPaletteBlock";

export default function AppHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <span className="text-sm font-medium">Projects</span>

      {/* Renders the search box trigger initially; opens modal on click or Ctrl+K */}
      <CommandPalette
        variant="linear"
        triggerPlaceholder="Search anything..."
        placeholder="Search pages, projects and actions"
        onSelect={(item) => console.log("Selected:", item.id)}
      />
    </header>
  );
}
```

## Nested

Contextual issue actions with drill-down sub-menus for Status, Assignee, Priority, and Project. Press Backspace or click ← to return.

- Pass `variant="nested"` enables contextual badge pills and multi-level sub-menus with live selection checkmarks.
- `contextId="AVA-214"` displays the active record identifier pill beside the search input.

```tsx
import { useState } from "react";
import {
  CommandPalette,
  DEFAULT_NESTED_PALETTE_STATE,
  type NestedPaletteState,
} from "@/components/custom/blocks/CommandPaletteBlock";

export default function IssueCommandHeader() {
  const [issueState, setIssueState] = useState<NestedPaletteState>(
    DEFAULT_NESTED_PALETTE_STATE,
  );

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <span className="text-sm font-medium">Rewrite the welcome email</span>

      {/* Contextual drill-down palette with Status, Assignee, Priority & Project sub-menus */}
      <CommandPalette
        variant="nested"
        contextId="AVA-214"
        contextTitle="Rewrite the welcome email"
        nestedState={issueState}
        onNestedStateChange={setIssueState}
        triggerPlaceholder="Search anything..."
      />
    </header>
  );
}
```

## Inline

Always-open embedded command palette without a trigger bar or modal overlay — type immediately to filter items.

- Pass `variant="inline"` renders the palette permanently open directly in your layout with no backdrop modal.

```tsx
import { CommandPalette } from "@/components/custom/blocks/CommandPaletteBlock";

export default function InlineCommandPalette() {
  return (
    <div className="w-full max-w-xl mx-auto p-4">
      {/* Always-open inline palette — no modal or trigger button */}
      <CommandPalette
        variant="inline"
        placeholder="Search pages, projects and actions"
        onSelect={(item) => console.log("Selected:", item.id)}
      />
    </div>
  );
}
```

## Ask AI

Search or ask any question — displays a skeleton loader, streams the answer character by character with citations, and lists matching help center sources (or a support fallback).

- Pass `variant="ai"` enables suggested questions, skeleton loading state, streamed AI answers with citations, and follow-up queries.

```tsx
import { CommandPalette } from "@/components/custom/blocks/CommandPaletteBlock";

export default function AskAiCommandPalette() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <span className="text-sm font-medium">Help Center</span>

      {/* Click trigger or press Ctrl+K; click any question or type your own to stream an AI answer */}
      <CommandPalette
        variant="ai"
        triggerPlaceholder="Search anything..."
        placeholder="Search or ask a question"
        onSelect={(item) => console.log("Selected:", item.id)}
      />
    </header>
  );
}
```

## About Command Palette

**What it is.** `CommandPalette` is a high-level command launcher shipping four `variant` presets: `linear` (header trigger + `Ctrl+K` modal), `nested` (contextual `contextId` pill + drill-down sub-menus), `inline` (always-open embedded palette), and `ai` (streaming AI answers with citations).

**How it is built.** Handles the `Ctrl+K` / `⌘K` shortcut, filtering, nested sub-menu navigation (`Backspace` to go back) and the modal overlay in a single component. The only npm dependency is `lucide-react`. The `ai` variant is a front-end demo: its answers come from a built-in knowledge base, not a model.

**When to use it.** Use `CommandPalette` when you want a ready-made `Ctrl+K` launcher or Ask-AI search modal. For low-level composable menu primitives, use [Command](https://avaraui.com/docs/reactjs/command).

## For AI agents

**When to use**

- Ready-to-use `Ctrl+K` launchers (`linear`), contextual issue action menus (`nested`), embedded search (`inline`), or Ask-AI modals (`ai`)

**When not to use**

- Custom low-level command menu composition — use [Command](https://avaraui.com/docs/reactjs/command)

**Agent notes**

- Named export: `import { CommandPalette } from "@/components/custom/blocks/CommandPaletteBlock"`
- Pass `contextId` with `variant="nested"` to show the active record badge beside the search input
- Pass `groups` to supply your own commands; only the `linear` and `inline` variants read it, while `nested` and `ai` ignore it
- `variant="ai"` does not call a model. Answers are canned entries matched by keyword, so connect your own backend if you need real answers
- `onOpenChange` only fires in controlled mode (when `open` is set); use `defaultOpen` for uncontrolled use

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"linear" \| "nested" \| "inline" \| "ai"` | `"linear"` | Selects the command palette variant. `linear` renders the trigger + grouped modal; `nested` enables contextual issue actions with drill-down sub-menus; `inline` renders the palette always open directly on the page without a modal; `ai` adds suggested questions and streamed AI answers with sources. |
| `open` | `boolean` | `undefined` | Controls the visibility of the command palette modal (controlled mode). |
| `defaultOpen` | `boolean` | `false` | Sets the initial open state when using the component in uncontrolled mode. |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | Controlled mode only (when `open` is set): called with the next state on trigger click, backdrop click, Escape, or `Ctrl+K` / `⌘K`. Uncontrolled instances toggle internally and do not call it. |
| `triggerPlaceholder` | `string` | `"Search anything..."` | Placeholder label displayed inside the initial search bar trigger button. |
| `placeholder` | `string` | `"Search pages, projects and actions"` | Search input placeholder inside the open modal dialog (defaults to `"Type a command or search"` in the `nested` variant). |
| `groups` | `CommandPaletteGroupType[]` | `DEFAULT_COMMAND_PALETTE_GROUPS` | Grouped sections and items (with icons, tags, shortcut keycaps, and keywords) displayed in the `linear` and `inline` variants. Ignored by `nested` and `ai`. |
| `onSelect` | `(item: CommandPaletteItemType) => void` | `undefined` | Callback fired when an item is clicked or activated with the `Enter` key. |
| `shortcuts` | `string[]` | `["Ctrl", "K"]` | Shortcut keycap badges rendered on the right of the trigger bar. Automatically displays `⌘` on macOS. |
| `contextId` | `string` | `"AVA-214"` | Record/issue identifier badge rendered beside the search input in the `nested` variant. |
| `contextTitle` | `string` | `"Rewrite the welcome email"` | Primary section heading shown in the root view of the `nested` variant. |
| `nestedState` | `NestedPaletteState` | `DEFAULT_NESTED_PALETTE_STATE` | Current values for `status`, `assignee`, `priority`, and `project` in the `nested` variant. |
| `onNestedStateChange` | `(next: NestedPaletteState) => void` | `undefined` | Callback fired whenever a user selects an option inside a nested sub-menu. |
| `color` | `string` | `undefined` | Optional custom accent color override (hex or CSS custom property). |
| `triggerClassName` | `string` | `undefined` | Additional Tailwind CSS classes applied directly to the trigger search bar button. |
| `className` | `string` | `undefined` | Standard Tailwind CSS overrides applied to the outer container. |

## Works with other components

- Embed `CommandPalette` inside [Navbar](https://avaraui.com/docs/reactjs/navbar) or [Sidebar](https://avaraui.com/docs/reactjs/sidebar) headers.
- Pair `variant="ai"` with [AI Chat](https://avaraui.com/docs/reactjs/ai-chat) for a full conversation after the first answer.
- Use [Command](https://avaraui.com/docs/reactjs/command) when you want to compose the menu from primitives instead.

## How do I embed CommandPalette inline without a modal overlay?

Set `variant="inline"`. The palette renders open inside your layout with no trigger bar, no backdrop and no `Ctrl+K` listener, and it fills up to `max-w-xl` of its container. Pass `groups` and `onSelect` as usual; `onOpenChange`, `open` and `shortcuts` have no effect in this variant.

## How do I control CommandPalette's open state from my own button?

Pass `open` and `onOpenChange`. Once `open` is defined the palette is controlled: it calls `onOpenChange(next)` on trigger click, backdrop click, Escape or `Ctrl+K`, and you must store the value. Leave `open` out and use `defaultOpen` if you want it to manage itself.

## Can I change the CommandPalette shortcut from Ctrl+K?

Not through props. The `shortcuts` prop only changes the keycap badges shown on the trigger, and on macOS a leading `"Ctrl"` displays as `⌘`. The listener on `window` always responds to `Ctrl` or `⌘` plus `K`, so changing the key means editing the component's source.

## How do I add my own commands to the linear variant?

Pass `groups`, an array of `{ heading, items }`. Each item takes `id` and `label`, plus optional `icon`, `tag`, `shortcuts`, `keywords`, `onSelect` and `disabled`. Typing filters on label, tag and keywords, and `Enter` skips disabled items. The component-level `onSelect` also receives the chosen item.

## How do I keep the Status or Assignee a user picks in the nested variant?

Pass both `nestedState` and `onNestedStateChange`, and store the value in React state, starting from `DEFAULT_NESTED_PALETTE_STATE`. When `nestedState` is set, it takes precedence over the palette's internal copy. Without `onNestedStateChange`, picking an option will not change the displayed values.

## Does the Ask AI variant call a real AI model?

No. `variant="ai"` is a front-end demo. It matches your question against a built-in `AI_KNOWLEDGE_BASE` by keyword, shows a skeleton for about a second, then types the canned answer with citations. Unmatched questions get a support fallback message. Wire your own backend to it if you need real answers.

---

Live previews and every example: https://avaraui.com/docs/nextjs/command-palette
