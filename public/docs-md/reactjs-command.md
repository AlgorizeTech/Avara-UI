---
title: "Shadcn Command"
description: "A powerful, composable command menu palette for searching data and triggering quick actions. Free shadcn/ui Command component for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/command
---

# Shadcn Command

A powerful, composable command menu palette for searching data and triggering quick actions.

Most robust command palettes force you to install heavy third-party libraries like `cmdk`, which ship with massive virtualized lists and complex React state syncing. This `CommandBlock` achieves the exact same functionality using a **100% native, dependency-free DOM architecture**. It handles keyboard navigation (up/down/enter), automatic empty-state detection, and dialog trapping entirely through efficient native DOM events and modern CSS `:has()` rules.

Type in any search box to filter — empty groups vanish on their own. `ArrowUp` / `ArrowDown` move the selection and `Enter` fires it.

## Groups, separators & shortcuts

`CommandSeparator` divides groups; `CommandShortcut` right-aligns the hotkey.

- Give `heading` to a `CommandGroup` to label the cluster — the whole group hides itself when every item filters out.

```tsx
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

## Examples

### Command dialog

Swap `Command` for `CommandDialog` to get the ⌘K overlay — try the shortcut.

- `open` is required on `CommandDialog`; it has no uncontrolled mode.
- `onOpenChange` fires on click-outside and on Escape, so it is where you close it.

```tsx
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

### External filtering

- Set `shouldFilter={false}` to turn off the built-in filter when the results already come back filtered from an API.

```tsx
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

## Features
Learn about the Command palette's features, including fuzzy search, keyboard shortcuts, and nested group navigation.

### Customizable

Easily adapt the component's styling and behavior to fit your application's unique design system.

### Accessible

Built with accessibility in mind, ensuring all users can interact with your application effectively.

### Responsive

Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

### Performant

Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

### Usage Guidelines

Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `CommandDialog` | `open` | `boolean` | Required | Controls the visibility of the modal dialog overlay. |
| `CommandDialog` | `onOpenChange` | `(open: boolean) => void` | Required | Callback fired when the dialog is dismissed via a click-outside event or by pressing the Escape key. |
| `CommandGroup` | `heading` | `string` | `undefined` | Optional text label displayed directly above the clustered items. The entire group automatically hides if all its items are filtered out. |
| `CommandItem` | `value` | `string` | `undefined` | An explicit string used for fuzzy searching. If omitted, the component automatically falls back to searching the rendered `textContent` of the item. |
| `CommandItem` | `onSelect` | `(value: string) => void` | `undefined` | Callback fired when the item is clicked with the mouse or activated via the Enter key during keyboard navigation. |
| All Components | `className` | `string` | `undefined` | Standard Tailwind CSS overrides for customized styling, sizing, or spacing. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/command
