"use client";

import {
  DatePickerBlock,
  DatePickerColor,
  DatePickerSize,
  DatePickerVariant,
} from "@/components/custom/blocks/DatePickerBlock";
import { useState } from "react";

const VARIANTS: DatePickerVariant[] = [
  "default",
  "filled",
  "underlined",
  "glow",
];
const SIZES: DatePickerSize[] = ["sm", "md", "lg"];

export default function DatePickerDemo({
  variant = "default",
  inputSize = "md",
  showError = false,
  isDisabled = false,
  color = "primary",
  showAll,
}: {
  variant?: DatePickerVariant;
  inputSize?: DatePickerSize;
  showError?: boolean;
  isDisabled?: boolean;
  color?: DatePickerColor | string;
  /** Render-all modes for the docs gallery. Omitted = previous behavior. */
  showAll?: "variants" | "sizes";
}) {
  const [date, setDate] = useState<Date | null>(null);
  const [dates, setDates] = useState<Record<string, Date | null>>({});

  if (showAll) {
    const keys: string[] = showAll === "variants" ? VARIANTS : SIZES;

    return (
      <div className="w-full flex flex-col items-start justify-center min-h-[500px] relative z-10">
        <div className="w-full max-w-sm mx-auto flex flex-col gap-6">
          {keys.map((key) => (
            <DatePickerBlock
              key={`${showAll}-${key}-${color}`}
              value={dates[key] ?? null}
              onChange={(value) =>
                setDates((prev) => ({ ...prev, [key]: value }))
              }
              variant={
                showAll === "variants" ? (key as DatePickerVariant) : variant
              }
              inputSize={
                showAll === "sizes" ? (key as DatePickerSize) : inputSize
              }
              color={color}
              label={key}
              placeholder="Select a date"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-start justify-start pt-5 pb-6 min-h-[450px] relative z-10">
      <div className="w-full max-w-sm mx-auto">
        <DatePickerBlock
          key={`${variant}-${color}-${inputSize}-${showError}-${isDisabled}`}
          value={date}
          onChange={setDate}
          variant={variant}
          color={color}
          inputSize={inputSize}
          disabled={isDisabled}
          label="Launch Date"
          placeholder="Select a date"
          helperText={
            !showError ? "Choose the date for your next launch." : undefined
          }
          error={
            showError ? "Please select a valid date in the future." : undefined
          }
        />
      </div>
    </div>
  );
}
