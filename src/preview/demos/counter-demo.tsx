"use client";

import {
  CounterBlock,
  CounterColor,
  CounterType,
} from "@/components/custom/blocks/CounterBlock";

export default function CounterDemo({
  type = "stepper",
  variant = "default",
  color = "primary",
}: {
  type?: CounterType;
  variant?: "default" | "outline" | "soft" | "vertical";
  color?: CounterColor | string;
}) {
  return (
    <div className="w-full flex items-center justify-center min-h-[400px]">
      <CounterBlock
        key={`${type}-${color}-${variant}`}
        type={type}
        variant={variant}
        color={color}
        {...(type === "stepper" && {
          label: "Select Quantity",
          initialValue: 1,
          min: 1,
          max: 10,
        })}
        {...(type === "animated" && {
          label: "Total Subscribers",
          targetValue: 12500,
          prefix: "+",
        })}
        {...(type === "circular" && {
          label: "Storage Used",
          targetValue: 78,
          suffix: "%",
        })}
        {...(type === "countdown" && { label: "Next Product Launch" })}
      />
    </div>
  );
}
