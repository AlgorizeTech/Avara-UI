"use client";

import { RangeDatePicker } from "@/components/custom/range-date-picker";
import { useState } from "react";

export default function RangeDatePickerDemo({
  variant = "single",
  disablePast = false,
  showTime = false,
  timeFormat = "12h",
  color = "primary",
}: {
  variant?: "single" | "dual" | "priced-single" | "priced-dual" | "priced";
  disablePast?: boolean;
  showTime?: boolean;
  timeFormat?: "12h" | "24h";
  color?: string;
}) {
  const [range, setRange] = useState<{ from: Date | null; to: Date | null }>(() => {
    // With time columns the card opens empty: the rail unfolds on the first pick.
    if (showTime) return { from: null, to: null };
    const to = new Date();
    const from = new Date();
    if (disablePast) {
      // A past range would be un-selectable, so seed one that starts tomorrow
      // — today's morning hours would already be behind us by the afternoon.
      from.setDate(from.getDate() + 1);
      to.setDate(to.getDate() + 5);
    } else if (variant === "priced" || variant === "priced-single") {
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
        key={`${variant}-${disablePast}-${showTime}-${timeFormat}`}
        variant={variant}
        value={range}
        onChange={setRange}
        color={color.startsWith("#") ? "primary" : color}
        disablePast={disablePast}
        showTime={showTime}
        timeFormat={timeFormat}
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
