# Command

A powerful, composable command menu palette for searching data and triggering quick actions.

Most robust command palettes force you to install heavy third-party libraries like `cmdk`, which ship with massive virtualized lists and complex React state syncing. This `CommandBlock` achieves the exact same functionality using a **100% native, dependency-free DOM architecture**. It handles keyboard navigation (up/down/enter), automatic empty-state detection, and dialog trapping entirely through efficient native DOM events and modern CSS `:has()` rules.

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

## Interactive Showcase

Use the layout controls below to test the static and modal variants.

1. **Try typing in the search box:** The list will instantly filter, and any groups that become empty will automatically vanish.
2. **Keyboard Navigation:** Use your `ArrowUp` and `ArrowDown` keys to navigate the filtered list, and hit `Enter` to trigger an action!

## Installation

### Copy the Component

This component is **100% dependency-free**. It uses native `createPortal` for the modal rendering and `querySelector` for the lightning-fast filtering logic.

You can copy the full engine code (in either TypeScript or JavaScript) directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/CommandBlock.tsx`.

---

## Usage

### Inline Layout

To render the command menu flat on the page (like a sidebar search or settings panel):

```tsx

export default function StaticMenu() {
  return (

        No results found.

           alert("Profile!")}>
            Profile

  );
}
```

## Dialog Layout (Modal)

To trigger the command menu as an overlay (the classic Cmd+K experience), simply swap `` for `` and manage its open state:

```tsx

export default function QuickActions() {
  const [open, setOpen] = useState(false);

  // Hook to capture Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (

         setOpen(false)}>
          Close Menu

  );
}
```
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

**Component Path:** `nextjs\command\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
