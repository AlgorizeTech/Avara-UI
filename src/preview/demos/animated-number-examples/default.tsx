"use client";

import { AnimatedNumber } from "@/components/custom/blocks/AnimatedNumberBlock";
import { useState } from "react";

export default function Balance() {
  const [balance, setBalance] = useState(12480.5);

  return (
    <div className="flex flex-col items-center gap-5">
      <AnimatedNumber
        value={balance}
        format={(n) => n.toLocaleString("en-US", { style: "currency", currency: "USD" })}
        className="text-5xl font-semibold tracking-tight text-foreground"
      />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setBalance((v) => v + 1250)}
          className="cursor-pointer rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background"
        >
          Add $1,250
        </button>
        <button
          type="button"
          onClick={() => setBalance((v) => Math.max(0, v - 800))}
          className="cursor-pointer rounded-full bg-muted px-4 py-2 text-sm font-medium text-foreground"
        >
          Spend $800
        </button>
      </div>
    </div>
  );
}
