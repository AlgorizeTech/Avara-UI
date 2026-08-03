"use client";

import {
  CartBlock,
  CartColor,
  CartType,
} from "@/components/custom/blocks/CartBlock";

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
      <CartBlock key={`${type}-${color}`} type={type} color={color} />
    </div>
  );
}
