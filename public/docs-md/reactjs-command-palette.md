---
title: "Command Palette"
description: "Shadcn Command Palette. A fast, keyboard-first Command Palette with a search box trigger, instant filtering, hotkey badges, grouped sections."
url: https://avaraui.com/docs/nextjs/command-palette
---

# Command Palette

A fast, keyboard-first Command Palette with a search box trigger, instant filtering, hotkey badges, grouped sections, and a modal overlay.

Starts as a compact search bar (`Search anything... [Ctrl] [K]`) in your header that opens a centered modal over a dimmed overlay, or renders always-open inline on the page. Choose a look via the `variant` prop (`"linear"`, `"nested"`, `"inline"`, or `"ai"`).

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

## Variants

### Nested

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

### Inline

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

### Ask AI

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

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"linear" \| "nested" \| "inline" \| "ai"` | `"linear"` | Selects the command palette variant. `linear` renders the trigger + grouped modal; `nested` enables contextual issue actions with drill-down sub-menus; `inline` renders the palette always open directly on the page without a modal; `ai` adds suggested questions and streamed AI answers with sources. |
| `open` | `boolean` | `undefined` | Controls the visibility of the command palette modal (controlled mode). |
| `defaultOpen` | `boolean` | `false` | Sets the initial open state when using the component in uncontrolled mode. |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | Callback fired whenever the modal opens or closes via trigger click, backdrop click, Escape key, or `Ctrl+K` / `⌘K`. |
| `triggerPlaceholder` | `string` | `"Search anything..."` | Placeholder label displayed inside the initial search bar trigger button. |
| `placeholder` | `string` | `"Search pages, projects and actions"` | Search input placeholder inside the open modal dialog (defaults to `"Type a command or search"` in the `nested` variant). |
| `groups` | `CommandPaletteGroupType[]` | `DEFAULT_COMMAND_PALETTE_GROUPS` | Grouped sections and items (with icons, tags, shortcut keycaps, and keywords) displayed in the `linear` variant. |
| `onSelect` | `(item: CommandPaletteItemType) => void` | `undefined` | Callback fired when an item is clicked or activated with the `Enter` key. |
| `shortcuts` | `string[]` | `["Ctrl", "K"]` | Shortcut keycap badges rendered on the right of the trigger bar. Automatically displays `⌘` on macOS. |
| `contextId` | `string` | `"AVA-214"` | Record/issue identifier badge rendered beside the search input in the `nested` variant. |
| `contextTitle` | `string` | `"Rewrite the welcome email"` | Primary section heading shown in the root view of the `nested` variant. |
| `nestedState` | `NestedPaletteState` | `DEFAULT_NESTED_PALETTE_STATE` | Current values for `status`, `assignee`, `priority`, and `project` in the `nested` variant. |
| `onNestedStateChange` | `(next: NestedPaletteState) => void` | `undefined` | Callback fired whenever a user selects an option inside a nested sub-menu. |
| `color` | `string` | `undefined` | Optional custom accent color override (hex or CSS custom property). |
| `triggerClassName` | `string` | `undefined` | Additional Tailwind CSS classes applied directly to the trigger search bar button. |
| `className` | `string` | `undefined` | Standard Tailwind CSS overrides applied to the outer container. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/command-palette
