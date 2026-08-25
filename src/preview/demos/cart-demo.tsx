"use client";

import {
  CartBlock,
  CartColor,
  CartItem,
  CartType,
} from "@/components/custom/blocks/CartBlock";

// The cart ships no sample data. Items live in the parent and are handed to
// CartBlock through `initialItems` — swap this array for your own products.
const sampleItems: CartItem[] = [
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

export default function CartDemo({
  type = "drawer",
  color = "primary",
}: {
  type?: CartType;
  color?: CartColor | string;
}) {
  return (
    <div
      className={`relative w-full flex items-center justify-center min-h-[600px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 ${type === "page" ? "bg-white dark:bg-black" : "bg-zinc-50/50 dark:bg-zinc-950/50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-200/40 via-zinc-50 to-zinc-50 dark:from-zinc-800/40 dark:via-zinc-950 dark:to-zinc-950"}`}
    >
      <CartBlock
        key={`${type}-${color}`}
        type={type}
        color={color}
        initialItems={sampleItems}
      />
    </div>
  );
}
