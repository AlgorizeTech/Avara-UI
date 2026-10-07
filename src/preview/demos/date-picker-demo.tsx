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
  disablePast = false,
  showTime = false,
  timeFormat = "12h",
  color = "primary",
  showAll,
}: {
  variant?: DatePickerVariant;
  inputSize?: DatePickerSize;
  showError?: boolean;
  isDisabled?: boolean;
  disablePast?: boolean;
  showTime?: boolean;
  timeFormat?: "12h" | "24h";
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

  const isPastDate = (d: Date | null) => {
    if (!d) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(d);
    target.setHours(0, 0, 0, 0);
    return target.getTime() < today.getTime();
  };

  const isErrorActive = showError && isPastDate(date);

  return (
    <div className={`w-full flex flex-col items-start justify-start pt-5 pb-6 relative z-10 ${showTime ? "min-h-[680px]" : "min-h-[450px]"}`}>
      <div className="w-full max-w-sm mx-auto">
        <DatePickerBlock
          key={`${variant}-${color}-${inputSize}-${showError}-${isDisabled}-${disablePast}-${showTime}-${timeFormat}`}
          value={date}
          onChange={setDate}
          variant={variant}
          color={color}
          inputSize={inputSize}
          disabled={isDisabled}
          disablePast={disablePast}
          showTime={showTime}
          timeFormat={timeFormat}
          label="Launch Date"
          placeholder={showTime ? "Select date & time" : "Select a date"}
          helperText={
            isErrorActive
              ? undefined
              : disablePast
                ? "Only today and future dates can be picked."
                : showTime
                  ? "Pick a day, then set the time and hit Done."
                  : showError && date && !isPastDate(date)
                    ? "Valid launch date selected."
                    : "Choose the date for your next launch."
          }
          error={
            isErrorActive
              ? "Please select a valid date in the future."
              : undefined
          }
        />
      </div>
    </div>
  );
}
