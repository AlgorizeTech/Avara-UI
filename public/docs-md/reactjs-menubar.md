---
title: "Shadcn Menubar"
description: "A visually persistent, OS-style menu component that provides quick access to a consistent set of commands. Free shadcn/ui component for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/menubar
---

# Shadcn Menubar

A visually persistent, OS-style menu component that provides quick access to a consistent set of commands.

Native application menus have complex, unwritten interaction rules. If you click to open "File", and then hover your mouse horizontally over "Edit", the "Edit" menu should instantly open while "File" closes. Building this from scratch is notoriously difficult. This `MenubarBlock` solves all of that natively in React using Context, providing a 100% dependency-free implementation.

Click a trigger to open its menu, then hover the neighbours — they swap instantly, exactly like a native app.

## Menubar

Nest `MenubarMenu` → `MenubarTrigger` + `MenubarContent`.

- `value` on each `MenubarMenu` is required — it is how the context tracks which dropdown is open.
- `align` on `MenubarContent` anchors the dropdown to its trigger: `start` (the default), `center` or `end`.

```tsx
export default function TopNav() {
  return (
    <Menubar>
      {/* Every MenubarMenu needs a unique `value` — the context tracks it */}
      <MenubarMenu value="file">
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          {/* shrink-0 keeps the icon square when a narrow menu squeezes the row */}
          <MenubarItem onClick={() => console.log("New Tab")}>
            <Plus className="w-4 h-4 mr-2 shrink-0" /> New Tab
          </MenubarItem>
          <MenubarItem>
            <AppWindow className="w-4 h-4 mr-2 shrink-0" /> New Window
          </MenubarItem>
          <MenubarItem>
            <FolderOpen className="w-4 h-4 mr-2 shrink-0" /> Open File…
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu value="edit">
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Undo2 className="w-4 h-4 mr-2 shrink-0" /> Undo
          </MenubarItem>
          <MenubarItem>
            <Redo2 className="w-4 h-4 mr-2 shrink-0" /> Redo
          </MenubarItem>
          <MenubarItem>
            <Scissors className="w-4 h-4 mr-2 shrink-0" /> Cut
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/menubar.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/menubar
```

## Examples

### Application menubar

- `className` on the bar is how you strip its chrome to fuse it into a window title bar.

```tsx
/** Every row carries one, so no row needs `inset` to fake the gutter. */
const icon = "w-4 h-4 mr-2 shrink-0";
/** Marks the active theme; ml-auto keeps it clear of the label. */
const activeMark = "ml-auto w-4 h-4 shrink-0 text-primary";

export default function AppWindow() {
  const [theme, setTheme] = useState("System");

  // No overflow-hidden on the frame: it would crop any menu taller or wider
  // than the window. The header rounds its own top corners instead.
  return (
    <div className="w-full max-w-2xl bg-background border border-border rounded-xl flex flex-col h-[280px]">
      {/* Native OS-style Application Header */}
      <div className="w-full border-b border-border bg-muted/50 rounded-t-xl px-2 py-1 flex items-center justify-between">
        <Menubar className="border-none bg-transparent shadow-none w-full justify-start min-h-8 p-0">
          {/* 1. FILE MENU */}
          <MenubarMenu value="file">
            <MenubarTrigger>Nexus UI</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Info className={icon} /> About Nexus
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Settings className={icon} /> Preferences...{" "}
                <MenubarShortcut>⌘,</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <EyeOff className={icon} /> Hide Nexus{" "}
                <MenubarShortcut>⌘H</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                <Users className={icon} /> Hide Others{" "}
                <MenubarShortcut>⇧⌘H</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled>
                <Eye className={icon} /> Show All
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem className="text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/20 focus:text-red-600 dark:focus:text-red-400">
                <Power className={icon} /> Quit Nexus{" "}
                <MenubarShortcut>⌘Q</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          {/* 2. EDIT MENU */}
          <MenubarMenu value="edit">
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Undo2 className={icon} /> Undo{" "}
                <MenubarShortcut>⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                <Redo2 className={icon} /> Redo{" "}
                <MenubarShortcut>⇧⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Scissors className={icon} /> Cut{" "}
                <MenubarShortcut>⌘X</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                <Copy className={icon} /> Copy{" "}
                <MenubarShortcut>⌘C</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                <ClipboardPaste className={icon} /> Paste{" "}
                <MenubarShortcut>⌘V</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          {/* 3. VIEW (THEME) MENU */}
          <MenubarMenu value="view">
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              {/* Labels sit flush left; the rows carry the icon gutter. */}
              <MenubarLabel>Theme Options</MenubarLabel>
              <MenubarItem onClick={() => setTheme("Light")}>
                <Sun className={icon} /> Light Mode
                {theme === "Light" && <Check className={activeMark} />}
              </MenubarItem>
              <MenubarItem onClick={() => setTheme("Dark")}>
                <Moon className={icon} /> Dark Mode
                {theme === "Dark" && <Check className={activeMark} />}
              </MenubarItem>
              <MenubarItem onClick={() => setTheme("System")}>
                <Laptop className={icon} /> System Default
                {theme === "System" && <Check className={activeMark} />}
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <Maximize className={icon} /> Toggle Fullscreen{" "}
                <MenubarShortcut>F11</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          {/* 4. PROFILES MENU */}
          <MenubarMenu value="profiles">
            <MenubarTrigger>Profiles</MenubarTrigger>
            <MenubarContent align="start">
              <MenubarLabel>Active Account</MenubarLabel>
              <MenubarItem>
                <User className={icon} /> Andy Bernard
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <UserPlus className={icon} /> Add Account...
              </MenubarItem>
              <MenubarItem>
                <Settings2 className={icon} /> Manage Profiles
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

      {/* Fake App Body */}
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6 opacity-50">
        <div className="w-16 h-16 bg-muted rounded-2xl mb-4 flex items-center justify-center border border-border shadow-sm">
          <Laptop className="w-8 h-8 text-muted-foreground" />
        </div>
        <h4 className="text-sm font-semibold text-foreground">
          Application Canvas
        </h4>
        <p className="text-xs text-muted-foreground mt-1 max-w-[250px]">
          Click the menus at the top to test the interaction states and
          cross-menu hover switching.
        </p>
      </div>
    </div>
  );
}
```

## Features
Learn about the Menubar's desktop-style navigation features, supporting complex nested menus, radio groups, and checkboxes.

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

| Component | Prop | Type | Description |
| --- | --- | --- | --- |
| `MenubarMenu` | `value` | `string` | Required. A unique identifier for the menu column (e.g., `"file"`). Used by the internal state context to track which dropdown is open. |
| `MenubarContent` | `align` | `"start" \| "center" \| "end"` | Determines how the dropdown is anchored relative to its trigger button. Defaults to `"start"`. |
| `MenubarItem` | `inset` | `boolean` | Adds extra left-padding to the item, aligning text cleanly when adjacent items use icons. |
| `MenubarItem` | `disabled` | `boolean` | Dims the item, changes the cursor, and completely disables pointer events and click handlers. |
| `MenubarItem` | `onClick` | `() => void` | Fires your custom action. The menu will automatically close after the click. |
| `MenubarLabel` | `inset` | `boolean` | Aligns the label text with `inset` menu items. |
| All Components | `className` | `string` | Every component supports custom Tailwind classes for easy styling overrides. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/menubar
