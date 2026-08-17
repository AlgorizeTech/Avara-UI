# Shopping Cart

A complete, production-ready Cart component designed for modern e-commerce applications. It comes with built-in item state management (increment, decrement, remove), automatic subtotal calculations, and three distinct structural layouts.

## Examples

One `type` prop switches the whole presentation — the cart state, quantity steppers and subtotal math are identical in all three. Click the bag trigger in the first two previews to play the GSAP entrance.

export const usageDrawer = `import { CartBlock } from "@/components/custom/blocks/CartBlock";

export default function Layout() {
  return (

  );
}`;

export const usageModal = `import { CartBlock } from "@/components/custom/blocks/CartBlock";

export default function ModalCart() {
  // Centred dialog with a blurred backdrop — same trigger, same state.
  return ;
}`;

export const usagePage = `import { CartBlock } from "@/components/custom/blocks/CartBlock";

// Full-width two-column layout for a dedicated /cart route.
// No trigger button — the cart is the page.
export default function CartPage() {
  return ;
}`;

## Installation

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

## Best Practices & Guidelines

    Usage Guidelines
    Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

        Prop
        Type
        Default
        Description

          type

          "drawer" | "modal" | "page"

          "drawer"

          Determines the structural layout and animation style of the cart.

          color

          "indigo" | "rose" | "emerald" | "zinc" | string

          "primary"

          Applies global color themes to the primary buttons, focus rings,
          badges, and icons. Accepts valid hex codes (e.g.{" "}
          "#00FF00"). Any unrecognised name — including the{" "}
          "primary" default — falls back to the indigo theme.

---

**Component Path:** `nextjs\cart\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
