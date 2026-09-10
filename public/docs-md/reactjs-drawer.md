# Drawer

A highly animated, responsive drawer component. Built entirely from scratch using `gsap` for butter-smooth entering and exiting animations. It supports sliding in from all four screen edges (top, bottom, left, right) and safely locks the background document from scrolling while open.

The drawer is always controlled — you own `open` and pass `onOpenChange`.

export const usageDefault = `export default function DrawerDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
       setOpen(true)}>Open Drawer

            Interactive Drawer
            
              This drawer slides in from the right. It uses GSAP for
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

export const usageControlled = `export default function OnboardingDrawer() {
  // Nothing says the state has to come from a button — open it yourself
  // after a fetch, a route change, or on first mount.
  const [open, setOpen] = useState(true);

  useEffect(() => {
    // localStorage does not exist while server-rendering, so this cannot
    // move into the useState initialiser.
    if (localStorage.getItem("onboarded")) setOpen(false);
  }, []);

  return (

          Welcome aboard

  );
}`;

## Installation

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
          mounts via React Portals and GSAP animates it into view.

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
