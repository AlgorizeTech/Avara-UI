---
title: "Drawer"
description: "An animated, responsive drawer with a bottom-sheet variant and an option to open on mount. Free shadcn/ui Drawer component for React, Next.js and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/drawer
---

# Drawer

A highly animated, responsive drawer component. Built entirely from scratch, with plain CSS transitions for butter-smooth entering and exiting animations — no animation library. It supports sliding in from all four screen edges (top, bottom, left, right) and safely locks the background document from scrolling while open.

The drawer is always controlled — you own `open` and pass `onOpenChange`.

## Drawer

- `open` is required — the drawer has no uncontrolled mode.
- `onOpenChange` is also required, and fires on the overlay click, Escape and the close button alike.

```tsx
export default function DrawerDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>

      <Drawer open={open} onOpenChange={setOpen} side="right">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Interactive Drawer</DrawerTitle>
            <DrawerDescription>
              This drawer slides in from the right. It uses CSS transitions for
              butter-smooth easing and handles its own unmount lifecycles.
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-6 flex-1 overflow-y-auto">
            {/* Long content scrolls here without pushing the header away */}
          </div>

          <DrawerFooter>
            <Button onClick={() => setOpen(false)}>Save changes</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/drawer.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/drawer
```

## Examples

### Bottom sheet

- Set `side="bottom"` for the familiar full-width mobile sheet.

```tsx
export default function BottomSheet() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open sheet</Button>

      {/* side="bottom" is the mobile sheet pattern */}
      <Drawer open={open} onOpenChange={setOpen} side="bottom">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Interactive Drawer</DrawerTitle>
            <DrawerDescription>
              Anchored to the bottom edge, full width.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={() => setOpen(false)}>Save changes</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
```

### Open on mount

- `open` being yours means you can start it `true`, or flip it from any effect, with no trigger element at all.

```tsx
// Optionally skip visitors who were onboarded before. localStorage is read as
// an external store: false on the server, the stored value in the browser.
const subscribeToStorage = (onChange: () => void) => {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
};
const readOnboarded = () => localStorage.getItem("onboarded") !== null;

export default function OnboardingDrawer() {
  const onboarded = useSyncExternalStore(subscribeToStorage, readOnboarded, () => false);
  // Null until the visitor opens or closes it. Until then it is open on
  // mount, so no trigger click is needed.
  const [choice, setOpen] = useState<boolean | null>(null);
  const open = choice ?? !onboarded;

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer (left)</Button>

      <Drawer open={open} onOpenChange={setOpen} side="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Welcome aboard</DrawerTitle>
            <DrawerDescription>
              This drawer opens automatically on mount without needing a trigger click.
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-6 flex-1 overflow-y-auto">
            <p className="text-sm text-muted-foreground">
              You can use this for onboarding flows, announcements, or cookie consent banners.
            </p>
          </div>

          <DrawerFooter>
            <Button onClick={() => setOpen(false)}>Get Started</Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
```

## Features
Learn about the Drawer component's touch-friendly swiping gestures, snap points, and smooth slide-in animations.

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

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | Required | Controls the visible state of the drawer. When true, the component mounts via React Portals and a CSS transition slides it into view. |
| `onOpenChange` | `(open: boolean) => void` | Required | Callback function to update the `open` state. Triggered by clicking the overlay, hitting the Escape key, or using the close button. |
| `side` | `"top" \| "bottom" \| "left" \| "right"` | `"right"` | Determines which edge of the screen the drawer slides in from, and applies the corresponding layout dimensions. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/drawer
