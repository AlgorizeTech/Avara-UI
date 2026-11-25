---
title: "Shadcn Command"
description: "Shadcn Command. A command menu with no `cmdk` dependency (`Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandGroup`, `CommandItem`."
url: https://avaraui.com/docs/nextjs/command
---

# Shadcn Command

A command menu with no `cmdk` dependency (`Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandGroup`, `CommandItem`, `CommandShortcut`) with keyboard navigation and automatic empty-group hiding.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/command.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/command
```

## Groups, separators & shortcuts

`CommandSeparator` divides groups; `CommandShortcut` right-aligns the hotkey.

- Give `heading` to a `CommandGroup` to label the cluster — the whole group hides itself when every item filters out.

```tsx
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/custom/blocks/CommandBlock";
import { Calculator, Calendar, CreditCard, LogOut, Settings, Smile, User } from "lucide-react";

export default function CommandPalette() {
  const run = (value: string) => console.log("Selected:", value);

  return (
    <Command>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No matching records found.</CommandEmpty>

        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={run}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem onSelect={run}>
            <Smile className="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem onSelect={run}>
            <Calculator className="mr-2 h-4 w-4" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Settings">
          {/* CommandShortcut right-aligns the hotkey hint */}
          <CommandItem onSelect={run}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={run}>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={run}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Danger Zone">
          {/* data-[selected=true] styles the row while it is highlighted */}
          <CommandItem
            className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50 data-[selected=true]:text-red-600 data-[selected=true]:bg-red-50 dark:data-[selected=true]:bg-red-950/50"
            onSelect={run}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <CommandShortcut>⇧⌘Q</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

## Command dialog

Swap `Command` for `CommandDialog` to get the ⌘K overlay — try the shortcut.

- `open` is required on `CommandDialog`; it has no uncontrolled mode.
- `onOpenChange` fires on click-outside and on Escape, so it is where you close it.

```tsx
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/custom/blocks/CommandBlock";

export default function QuickActions() {
  const [open, setOpen] = useState(false);

  // The classic ⌘K / Ctrl+K binding
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Press{" "}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </kbd>{" "}
          or click the button to open the command menu.
        </p>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md shadow-sm hover:opacity-90 transition-opacity"
        >
          Open Command Dialog
        </button>
      </div>

      {/* Same children as the inline <Command>, rendered in a portal */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => setOpen(false)}>Calendar</CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
```

## External filtering

- Set `shouldFilter={false}` to turn off the built-in filter when the results already come back filtered from an API.

```tsx
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/custom/blocks/CommandBlock";
import { Calculator, Calendar, Smile } from "lucide-react";

export default function ExternalFiltering() {
  // shouldFilter={false} hands filtering back to you. Typing no longer narrows
  // the list on its own — swap the static items below for your own results and
  // decide what to render.
  return (
    <Command shouldFilter={false}>
      <CommandInput placeholder="Search actions..." />
      <CommandList>
        <CommandEmpty>No matching records found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={() => console.log("calendar")}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem onSelect={() => console.log("emoji")}>
            <Smile className="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem onSelect={() => console.log("calculator")}>
            <Calculator className="mr-2 h-4 w-4" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

## About Shadcn Command

**What it is.** `Command` (`CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandSeparator`, `CommandShortcut`) provides searchable, keyboard-navigable command menus.

**How it is built.** Uses native DOM events and CSS `:has()` rules (zero `cmdk` dependency) to handle `ArrowUp`/`ArrowDown`/`Enter` navigation, empty-state detection, and auto-hiding empty groups. The only npm dependency is `lucide-react` for the search icon.

**When to use it.** Use `Command` when composing custom searchable action menus or `⌘K` dialogs. For opinionated Linear-style, nested drill-down, or Ask-AI palettes, use [Command Palette](https://avaraui.com/docs/reactjs/command-palette).

## For AI agents

**When to use**

- Composable searchable command menus (`Command`) or `⌘K` modal overlays (`CommandDialog`) with `shouldFilter` toggle for API-backed search

**When not to use**

- Pre-styled Linear, nested drill-down, or Ask-AI palettes — use [Command Palette](https://avaraui.com/docs/reactjs/command-palette)

**Agent notes**

- Named exports from `@/components/custom/blocks/CommandBlock`
- `CommandDialog` is strictly controlled (`open` + `onOpenChange`) and has no built-in `⌘K` binding; add your own `keydown` listener
- Pass `shouldFilter={false}` when filtering results externally on a server
- `CommandItem` matches the query against `value`, or the text of its children when `value` is omitted; `onSelect` receives that same string

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `CommandDialog` | `open` | `boolean` | Required | Controls the visibility of the modal dialog overlay. |
| `CommandDialog` | `onOpenChange` | `(open: boolean) => void` | Required | Callback fired when the dialog is dismissed via a click-outside event or by pressing the Escape key. |
| `CommandGroup` | `heading` | `string` | `undefined` | Optional text label displayed directly above the clustered items. The entire group automatically hides if all its items are filtered out. |
| `CommandItem` | `value` | `string` | `undefined` | An explicit string matched against the search text (case-insensitive substring). If omitted, the text of the item's children is used instead. |
| `CommandItem` | `onSelect` | `(value: string) => void` | `undefined` | Callback fired with the item's match string (`value`, or its text) when the item is clicked or activated via the Enter key during keyboard navigation. |
| All Components | `className` | `string` | `undefined` | Standard Tailwind CSS overrides for customized styling, sizing, or spacing. |

## Works with other components

- Display [Kbd](https://avaraui.com/docs/reactjs/kbd) inside `CommandShortcut` or trigger buttons.
- Compare with [Command Palette](https://avaraui.com/docs/reactjs/command-palette) for pre-styled Linear, nested, and Ask-AI variants.

## How do I disable built-in filtering for server-side search?

Pass `shouldFilter={false}` on `Command`. Every `CommandItem` then stays visible whatever is typed into `CommandInput`, so you render the results your API returned yourself. With the default `true`, each item hides unless its `value` or text contains the query.

## How do I open the Command dialog with Cmd+K or Ctrl+K?

`CommandDialog` ships no shortcut of its own. Register a `keydown` listener on `document` that toggles your own `open` state when `e.metaKey || e.ctrlKey` and `e.key === "k"`, then pass that state to `open`. The dialog closes itself through `onOpenChange` on Escape or a backdrop click.

## How does keyboard navigation work in Command?

`ArrowDown` and `ArrowUp` move the highlight through visible items and wrap at both ends, and `Enter` activates the highlighted item's `onSelect`. The first visible item is highlighted whenever the query changes. The highlighted row carries `data-selected="true"`, which you can style with `data-[selected=true]:` classes.

## What does CommandItem search against, and is it fuzzy?

It is not fuzzy. `CommandItem` does a case-insensitive substring match against `value`, or against the text of its children when `value` is omitted. Set `value` when the visible label differs from what people type, such as adding keywords. `onSelect` receives that same string.

## Does Command use cmdk, and does it work in Vite?

It does not use `cmdk`. Navigation and filtering are built from DOM events and CSS `:has()` rules, and the only npm dependency is `lucide-react`. The file has no `next/*` imports, so it installs the same way in Next.js and Vite projects.

## When should I use Command instead of Command Palette?

Use `Command` when you want to compose your own menu from `CommandInput`, `CommandList`, `CommandGroup` and `CommandItem`. Use [Command Palette](https://avaraui.com/docs/reactjs/command-palette) when you want a ready-made launcher with `linear`, `nested`, `inline` or `ai` variants and a built-in `Ctrl+K` trigger.

---

Live previews and every example: https://avaraui.com/docs/nextjs/command
