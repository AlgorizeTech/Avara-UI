# Drawer

A highly animated, responsive drawer component. Built entirely from scratch using `gsap` for butter-smooth entering and exiting animations. It supports sliding in from all four screen edges (top, bottom, left, right) and safely locks the background document from scrolling while open.

## Interactive Showcase

Use the control panel below to switch the `side` prop and see the drawer slide in from different edges of the screen.

_Click the **Code** tab in the preview below to copy the full component engine or the dynamic usage snippet for your current selection._

## Installation

### 1. Install Dependencies

This component relies on `gsap` to handle the fluid animations and manage the enter/exit lifecycle without relying on complex third-party layout libraries.

```bash
npm install gsap lucide-react
```

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

**Component Path:** `nextjs\drawer\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
