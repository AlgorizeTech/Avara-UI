"use client";

import {
  DatePickerBlock,
  DatePickerColor,
  DatePickerSize,
  DatePickerVariant,
} from "@/components/custom/blocks/DatePickerBlock";
import { useState } from "react";

export default function DatePickerDemo({
  variant = "default",
  inputSize = "md",
  showError = false,
  isDisabled = false,
  color = "primary",
}: {
  variant?: DatePickerVariant;
  inputSize?: DatePickerSize;
  showError?: boolean;
  isDisabled?: boolean;
  color?: DatePickerColor | string;
}) {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div className="w-full flex flex-col items-start justify-center min-h-[500px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-6 sm:p-12 relative z-10">
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
            showError
              ? "Please select a valid date in the future."
              : undefined
          }
        />
      </div>
    </div>
  );
}
