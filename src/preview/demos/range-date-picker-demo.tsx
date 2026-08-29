"use client";

import { RangeDatePicker } from "@/components/custom/range-date-picker";
import { useState } from "react";

export default function RangeDatePickerDemo({
  variant = "single",
}: {
  variant?: "single" | "dual" | "priced-single" | "priced-dual" | "priced";
}) {
  const [range, setRange] = useState<{ from: Date | null; to: Date | null }>(() => {
    const to = new Date();
    const from = new Date();
    if (variant === "priced" || variant === "priced-single") {
      from.setDate(8);
      to.setDate(18);
    } else if (variant === "priced-dual") {
      from.setDate(8);
      to.setDate(28);
    } else if (variant === "dual") {
      from.setDate(to.getDate() - 14);
    } else {
      from.setDate(to.getDate() - 7);
    }
    return { from, to };
  });

  const isPricedVariant = variant.includes("priced");

  return (
    <div className="w-full min-h-[440px] py-10 px-4 my-auto flex items-center justify-center">
      <RangeDatePicker
        variant={variant}
        value={range}
        onChange={setRange}
        color="primary"
        showPrices={isPricedVariant}
        getPrice={
          isPricedVariant
            ? (date) => (date.getDay() === 0 || date.getDay() === 6 ? "$120" : "$100")
            : undefined
        }
      />
    </div>
  );
}
