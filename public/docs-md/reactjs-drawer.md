export const metadata = docsPageMetadata("drawer");

# Drawer

A highly animated, responsive drawer component. Built entirely from scratch, with plain CSS transitions for butter-smooth entering and exiting animations — no animation library. It supports sliding in from all four screen edges (top, bottom, left, right) and safely locks the background document from scrolling while open.

The drawer is always controlled — you own `open` and pass `onOpenChange`.

export const usageDefault = `export default function DrawerDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
       setOpen(true)}>Open Drawer

            Interactive Drawer
            
              This drawer slides in from the right. It uses CSS transitions for
              butter-smooth easing and handles its own unmount lifecycles.

            {/* Long content scrolls here without pushing the header away */}

             setOpen(false)}>Save changes
             setOpen(false)}>
              Cancel

  );
}`;

export const usageBottom = `export default function BottomSheet() {
  const [open, setOpen] = useState(false);

  return (
    <>
       setOpen(true)}>Open sheet

      {/* side="bottom" is the mobile sheet pattern */}

            Interactive Drawer
            
              Anchored to the bottom edge, full width.

             setOpen(false)}>Save changes

  );
}`;

export const usageControlled = `// Optionally skip visitors who were onboarded before. localStorage is read as
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
  const [choice, setOpen] = useState(null);
  const open = choice ?? !onboarded;

  return (
    <>
       setOpen(true)}>Open Drawer (left)

            Welcome aboard
            
              This drawer opens automatically on mount without needing a trigger click.

              You can use this for onboarding flows, announcements, or cookie consent banners.

             setOpen(false)}>Get Started
             setOpen(false)}>
              Cancel

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/drawer
```

## Examples

## Features
Learn about the Drawer component's touch-friendly swiping gestures, snap points, and smooth slide-in animations.

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

        Prop
        Type
        Default
        Description

          open

          boolean

          Required

          Controls the visible state of the drawer. When true, the component
          mounts via React Portals and a CSS transition slides it into view.

          onOpenChange

          (open: boolean) => void

          Required

          Callback function to update the open state. Triggered by
          clicking the overlay, hitting the Escape key, or using the close
          button.

          side

          "top" | "bottom" | "left" | "right"

          "right"

          Determines which edge of the screen the drawer slides in from, and
          applies the corresponding layout dimensions.

---

**Component Path:** `[framework]\drawer\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
