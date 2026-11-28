"use client";

import { AnimatedNumber } from "@/components/custom/blocks/AnimatedNumberBlock";
import { useState } from "react";

const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function Balance() {
  const [balance, setBalance] = useState(12480.5);

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="flex flex-col items-center gap-2">
          <AnimatedNumber
            value={balance}
            variant="count"
            format={money}
            className="text-3xl font-semibold tracking-tight text-foreground"
          />
          <span className="text-xs font-medium text-muted-foreground">Count</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <AnimatedNumber
            value={balance}
            variant="roll"
            format={money}
            className="text-3xl font-semibold tracking-tight text-foreground"
          />
          <span className="text-xs font-medium text-muted-foreground">Roll</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <AnimatedNumber
            value={balance}
            variant="blur"
            format={money}
            className="text-3xl font-semibold tracking-tight text-foreground"
          />
          <span className="text-xs font-medium text-muted-foreground">Blur</span>
        </div>
      </div>
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
