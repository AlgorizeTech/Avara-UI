# Command

A powerful, composable command menu palette for searching data and triggering quick actions.

Most robust command palettes force you to install heavy third-party libraries like `cmdk`, which ship with massive virtualized lists and complex React state syncing. This `CommandBlock` achieves the exact same functionality using a **100% native, dependency-free DOM architecture**. It handles keyboard navigation (up/down/enter), automatic empty-state detection, and dialog trapping entirely through efficient native DOM events and modern CSS `:has()` rules.

Type in any search box to filter — empty groups vanish on their own. `ArrowUp` / `ArrowDown` move the selection and `Enter` fires it.

export const usageGroups = `"use client";

export default function CommandPalette() {
  const run = (value: string) => console.log("Selected:", value);

  return (

        No matching records found.

            Calendar

            Search Emoji

            Calculator

          {/* CommandShortcut right-aligns the hotkey hint */}

            Profile
            ⌘P

            Billing
            ⌘B

            Settings
            ⌘S

          {/* data-[selected=true] styles the row while it is highlighted */}

            Log out
            ⇧⌘Q

  );
}`;

export const usageDialog = `"use client";

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

          Press{" "}
          
            ⌘K
          {" "}
          or click the button to open the command menu.
        
         setOpen(true)}
          className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md shadow-sm hover:opacity-90 transition-opacity"
        >
          Open Command Dialog

      {/* Same children as the inline , rendered in a portal */}

             setOpen(false)}>Calendar
             setOpen(false)}>Calculator

  );
}`;

export const usageNoFilter = `"use client";

export default function ExternalFiltering() {
  // shouldFilter={false} hands filtering back to you. Typing no longer narrows
  // the list on its own — swap the static items below for your own results and
  // decide what to render.
  return (

        No matching records found.
        
           console.log("calendar")}>
            
            Calendar
          
           console.log("emoji")}>
            
            Search Emoji
          
           console.log("calculator")}>
            
            Calculator

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/command
```

## Examples

## Features
Learn about the Command palette's features, including fuzzy search, keyboard shortcuts, and nested group navigation.

    Customizable
    Easily adapt the component's styling and behavior to fit your application's unique design system.

    Accessible
    Built with accessibility in mind, ensuring all users can interact with your application effectively.

    Responsive
    Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

    Performant
    Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

    Usage Guidelines
    Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

        Component
        Prop
        Type
        Default
        Description

        CommandDialog
        open
        boolean
        Required
        Controls the visibility of the modal dialog overlay.

        CommandDialog
        onOpenChange
        {`(open: boolean) => void`}
        Required
        Callback fired when the dialog is dismissed via a click-outside event or by pressing the Escape key.

        CommandGroup
        heading
        string
        undefined
        Optional text label displayed directly above the clustered items. The entire group automatically hides if all its items are filtered out.

        CommandItem
        value
        string
        undefined
        An explicit string used for fuzzy searching. If omitted, the component automatically falls back to searching the rendered textContent of the item.

        CommandItem
        onSelect
        {`(value: string) => void`}
        undefined
        Callback fired when the item is clicked with the mouse or activated via the Enter key during keyboard navigation.

        All Components
        className
        string
        undefined
        Standard Tailwind CSS overrides for customized styling, sizing, or spacing.

---

**Component Path:** `[framework]\command\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
