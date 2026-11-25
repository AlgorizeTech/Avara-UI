---
title: "Shadcn Shopping Cart"
description: "A shopping cart for online stores in three layouts: a slide-out drawer, a modal and a full cart page. Free shadcn/ui component for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/cart
---

# Shadcn Shopping Cart

A shopping cart with quantity controls, live subtotals, and drawer, modal and page layouts.

One `type` prop switches the whole presentation — the cart state, quantity steppers and subtotal math are identical in all three. Leave the first two previews alone for a moment and the bag trigger tilts and rings to invite the click; press it and it squashes, springs back and pushes a ripple out as the panel arrives. Every one of those tweens is skipped under `prefers-reduced-motion: reduce`.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/cart.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/cart
```

## Drawer

Wait a beat and the bag nudges itself; click it to play the press and the slide-in.

- `type="drawer"` is the default — the panel slides in from the right edge over a blurred overlay.
- `initialItems` seeds the cart from the parent. The component ships no sample data — without it you get the empty state. Each item is `{ id, name, price, quantity, size?, color?, gradient }`.
- `color` themes the primary buttons, focus rings, badges and icons. Takes `primary`, `indigo`, `rose`, `emerald`, `zinc` or a hex.

```tsx
import {
  CartBlock,
  type CartItem,
} from "@/components/custom/blocks/CartBlock";

const items: CartItem[] = [
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
];

export default function DrawerCart() {
  return <CartBlock type="drawer" color="primary" initialItems={items} />;
}
```

## Modal

- Set `type="modal"` to centre the same panel and scale it in instead of sliding. Trigger and state are unchanged.

```tsx
import {
  CartBlock,
  type CartItem,
} from "@/components/custom/blocks/CartBlock";

const items: CartItem[] = [
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
];

export default function ModalCart() {
  return <CartBlock type="modal" color="primary" initialItems={items} />;
}
```

## Page

- Set `type="page"` to drop the trigger and overlay entirely and render the items beside a sticky order summary — sized for a dedicated `/cart` route.

```tsx
import {
  CartBlock,
  type CartItem,
} from "@/components/custom/blocks/CartBlock";

const items: CartItem[] = [
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
];

export default function CartPage() {
  return <CartBlock type="page" color="primary" initialItems={items} />;
}
```

## About Shadcn Shopping Cart

**What it is.** **Shadcn Shopping Cart** (`CartBlock`) is an e-commerce cart component with built-in quantity controls, item removal, live subtotal math, and three layouts: `"drawer"`, `"modal"`, and `"page"`.

**How it is built.** Switching `type` changes only the presentation (right-edge slide-in drawer, centered modal, or full `/cart` page with an order summary column) while preserving identical item state and subtotal calculations. The motion uses the Web Animations API, so there is no animation library, and only `lucide-react` is installed. The trigger's nudge, press and ripple tweens are skipped under `prefers-reduced-motion: reduce`.

**When to use it.** Use it for online storefronts, SaaS checkout drawers, digital marketplace carts, and dedicated `/cart` routes.

## For AI agents

**When to use**

- Online storefronts, SaaS checkout drawers
- Digital marketplace carts, dedicated `/cart` routes

**When not to use**

- A printable billing document: use [Invoice](https://avaraui.com/docs/reactjs/invoice)
- Booking a date, time or seat: use [Booking Card](https://avaraui.com/docs/reactjs/booking-card)

**Agent notes**

- `CartBlock` accepts only `type` (`"drawer" | "modal" | "page"`), `initialItems` (`CartItem[]`), and `color`. It has no `onChange`, `onCheckout` or `className` prop.
- Ships no hardcoded sample data; omitting `initialItems` renders the empty cart state.
- `initialItems` is read once on mount. Later changes to it do not update the cart, because the cart owns its items in state.
- Each `CartItem` needs `id`, `name`, `price` (a number), `quantity` and `gradient`, a Tailwind gradient class string such as `"from-zinc-700 to-black"`. There is no image field.
- `type="page"` drops the floating bag trigger and renders items beside an order summary.
- The minus button stops at quantity 1; the trash button removes the item.
- The "Proceed to Checkout" button has no handler, and the `$` currency symbol is fixed in the file.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `initialItems` | `CartItem[]` | `[]` | The items the cart starts with, supplied by the parent and read once on mount. The installed component contains no sample data, so a `CartBlock` without this prop renders its empty state. Each item is `id`, `name`, `price`, `quantity`, `gradient`, and optional `size` / `color`. Quantity and removal are then handled internally. |
| `type` | `"drawer" \| "modal" \| "page"` | `"drawer"` | Determines the structural layout and animation style of the cart. |
| `color` | `"indigo" \| "rose" \| "emerald" \| "zinc" \| string` | `"primary"` | Applies global color themes to the primary buttons, focus rings, badges, and icons. Accepts preset theme names or valid custom hex codes (e.g. `"#00FF00"`). |

## Works with other components

- Pair `CartBlock` with [Counter](https://avaraui.com/docs/reactjs/counter) for product page quantity pickers and [Invoice](https://avaraui.com/docs/reactjs/invoice) for post-checkout receipts.
- Use the `AddToCart` button from [Action Buttons](https://avaraui.com/docs/reactjs/action-buttons), or the `onAddToCart` callback on a [ProductCard](https://avaraui.com/docs/reactjs/card), as the control that feeds your cart state.
- Use [Booking Card](https://avaraui.com/docs/reactjs/booking-card) for reservation summaries.

## What happens if `initialItems` is omitted?

`CartBlock` ships no sample data. With `initialItems` omitted or empty, the drawer, modal or page shows "Your cart is empty." and hides the order summary. The prop is read once when the component mounts, so passing a new array later does not refill the cart.

## How do I render a dedicated `/cart` page instead of a drawer?

Pass `type="page"`. It drops the bag trigger and the overlay and renders a "Your Cart" heading, the item list and an order summary column directly in the page flow, inside a container no wider than `max-w-5xl`. The item state and quantity controls behave the same as in the drawer.

## How do I read the cart contents or handle checkout in CartBlock?

`CartBlock` has no callbacks. Items live in its own state, and the "Proceed to Checkout" button has no handler, so nothing is reported to your app. To wire up a backend, edit the installed file: lift `items` into your own state, or add `onChange` and `onCheckout` props that call your code.

## Can CartBlock show a currency other than dollars or add tax?

Not through props. The `$` sign and `toFixed(2)` formatting are written into `ItemRow` and `Summary`, shipping reads "Calculated at checkout", and the total equals the subtotal. For another currency, replace those two spots with your own formatter, such as `Intl.NumberFormat`, and add a tax row to `Summary`.

## How do I close the CartBlock drawer, and is it accessible?

Press Escape, click the dimmed overlay, use the close button in the header, or click the bag again. The bag has `aria-expanded` and a label such as "Open cart, 3 items". The panel is not marked as a dialog and does not trap focus, so add `role="dialog"` and focus handling if your audit needs them.

---

Live previews and every example: https://avaraui.com/docs/nextjs/cart
