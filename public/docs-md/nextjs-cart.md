# Shopping Cart

A complete, production-ready Cart component designed for modern e-commerce applications. It comes with built-in item state management (increment, decrement, remove), automatic subtotal calculations, and four distinct structural layouts.

## Features
Learn about the Cart component's e-commerce capabilities, including item quantity adjustments, total calculations, and slide-out panels.

    Customizable
    Easily adapt the component's styling and behavior to fit your application's unique design system.

    Accessible
    Built with accessibility in mind, ensuring all users can interact with your application effectively.

    Responsive
    Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

    Performant
    Optimized for maximum performance with minimal re-renders and efficient state management.

## Interactive Showcase

Use the control panel below to switch between layouts.

- **Drawer & Modal:** Perfect for global navigation states. Click the trigger button to see the GSAP entrance animations.
- **Popover:** Excellent for quick previews on hover or click.
- **Page:** A full-width layout designed specifically for a dedicated `/cart` or `/checkout` route.

_Click the **Code** tab in the preview below to copy the full component engine._

## Installation

### 1. Install Dependencies

This component uses `gsap` for the buttery-smooth slide and scale animations, and `lucide-react` for standard UI icons (Plus, Minus, Trash, ShoppingBag).

```bash
npm install gsap lucide-react
```

## Best Practices & Guidelines

    Usage Guidelines
    Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

        Prop
        Type
        Default
        Description

          type

          "drawer" | "modal" | "popover" | "page"

          "drawer"

          Determines the structural layout and animation style of the cart.

          color

          "indigo" | "rose" | "emerald" | "zinc" | string

          "indigo"

          Applies global color themes to the primary buttons, focus rings,
          badges, and icons. Accepts valid hex codes (e.g.{" "}
          "#00FF00").

---

**Component Path:** `nextjs\cart\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
