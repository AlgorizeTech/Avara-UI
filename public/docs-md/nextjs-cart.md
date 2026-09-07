# Shopping Cart

A complete, production-ready Cart component designed for modern e-commerce applications. It comes with built-in item state management (increment, decrement, remove), automatic subtotal calculations, and three distinct structural layouts.

One `type` prop switches the whole presentation — the cart state, quantity steppers and subtotal math are identical in all three. Leave the first two previews alone for a moment and the bag trigger tilts and rings to invite the click; press it and it squashes, springs back and pushes a ripple out as the panel arrives. Every one of those tweens is skipped under `prefers-reduced-motion: reduce`.

export const cartItems = `const items: CartItem[] = [
  {
    id: "1",
    name: "Signature Heavyweight Tee",
    price: 45.0,
    quantity: 1,
    size: "L",
    color: "Onyx Black",
    gradient: "from-zinc-700 to-black",
  },
  {
    id: "2",
    name: "Everyday Denim Jacket",
    price: 120.0,
    quantity: 1,
    size: "M",
    color: "Washed Blue",
    gradient: "from-blue-600 to-indigo-900",
  },
  {
    id: "3",
    name: "Minimalist Beanie",
    price: 28.0,
    quantity: 2,
    size: "OS",
    color: "Forest Green",
    gradient: "from-emerald-500 to-teal-800",
  },
];`;

export const usageDrawer = `import {
  CartBlock,
  type CartItem,
} from "@/components/custom/blocks/CartBlock";

// The cart holds no data of its own. Keep the items in the parent, where the
// rest of your app can reach them, and hand them over as initialItems.
${cartItems}

export default function DrawerCart() {
  return ;
}`;

export const usageModal = `import {
  CartBlock,
  type CartItem,
} from "@/components/custom/blocks/CartBlock";

${cartItems}

export default function ModalCart() {
  // Centred dialog with a blurred backdrop - same trigger, same state.
  return ;
}`;

export const usagePage = `import {
  CartBlock,
  type CartItem,
} from "@/components/custom/blocks/CartBlock";

${cartItems}

// Full-width two-column layout for a dedicated /cart route.
// No trigger button - the cart is the page.
export default function CartPage() {
  return ;
}`;

## Installation

## Examples

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

          initialItems

          CartItem[]

          []

          The items the cart starts with, supplied by the parent. The installed
          component contains no sample data, so a CartBlock without
          this prop renders its empty state. Each item is id,{" "}
          name, price, quantity,{" "}
          gradient, and optional size /{" "}
          color. Quantity and removal are then handled internally.

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

**Component Path:** `[framework]\cart\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
