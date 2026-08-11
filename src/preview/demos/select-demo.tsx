"use client";

import {
  SelectBlock,
  SelectSize,
  SelectVariant,
} from "@/components/custom/blocks/SelectBlock";
import {
  Box,
  Code,
  Database,
  Layers,
  Paintbrush,
  Smartphone,
} from "lucide-react";
import { useState } from "react";

const standardOptions = [
  { label: "Engineering", value: "eng", icon: Code },
  { label: "Design", value: "design", icon: Paintbrush },
  { label: "Marketing", value: "mkt" },
  { label: "Operations", value: "ops", icon: Box },
  { label: "Data Science", value: "data", icon: Database },
];

const groupedOptions = [
  { label: "React", value: "react", icon: Code, group: "Frontend" },
  { label: "Vue", value: "vue", icon: Code, group: "Frontend" },
  { label: "Svelte", value: "svelte", icon: Code, group: "Frontend" },
  { label: "Node.js", value: "node", icon: Database, group: "Backend" },
  { label: "Python", value: "python", icon: Database, group: "Backend" },
  { label: "iOS (Swift)", value: "ios", icon: Smartphone, group: "Mobile" },
  {
    label: "Android (Kotlin)",
    value: "android",
    icon: Smartphone,
    group: "Mobile",
  },
];

export default function SelectDemo({
  variant = "default",
  inputSize = "md",
  showError = false,
  isDisabled = false,
  isMultiple = false,
  isSearchable = false,
  isGrouped = true,
  color = "primary",
  showAll,
}: {
  variant?: SelectVariant;
  inputSize?: SelectSize;
  showError?: boolean;
  isDisabled?: boolean;
  isMultiple?: boolean;
  isSearchable?: boolean;
  isGrouped?: boolean;
  color?: string;
  /** Render-all modes: every size, or the error/disabled states, in one frame. */
  showAll?: "sizes" | "states";
}) {
  const [singleValue, setSingleValue] = useState<string>("");
  const [multiValue, setMultiValue] = useState<string[]>([]);

  if (showAll) {
    const sizes: SelectSize[] = ["sm", "md", "lg"];
    return (
      <div className="w-full flex flex-col items-start justify-center min-h-[500px] relative z-10">
        <div className="w-full max-w-sm mx-auto flex flex-col gap-6">
          {showAll === "sizes"
            ? sizes.map((size) => (
                <SelectBlock
                  key={size}
                  options={standardOptions}
                  value=""
                  onChange={() => {}}
                  variant={variant}
                  color={color}
                  inputSize={size}
                  label={`Department (${size})`}
                  placeholder="Select an option..."
                />
              ))
            : (
              <>
                <SelectBlock
                  options={standardOptions}
                  value=""
                  onChange={() => {}}
                  variant={variant}
                  color={color}
                  inputSize={inputSize}
                  label="Department"
                  placeholder="Select an option..."
                  error="Please select a valid option to proceed."
                />
                <SelectBlock
                  options={standardOptions}
                  value=""
                  onChange={() => {}}
                  variant={variant}
                  color={color}
                  inputSize={inputSize}
                  disabled
                  label="Department (disabled)"
                  placeholder="Select an option..."
                  helperText="Choose the options you wish to add."
                />
              </>
            )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-start justify-center min-h-[500px] relative z-10">
      <div className="w-full max-w-sm mx-auto">
        <SelectBlock
          key={`${variant}-${color}-${inputSize}-${showError}-${isDisabled}-${isMultiple}-${isSearchable}-${isGrouped}`}
          options={isGrouped ? groupedOptions : standardOptions}
          value={isMultiple ? multiValue : singleValue}
          onChange={(isMultiple ? setMultiValue : setSingleValue) as any}
          variant={variant}
          color={color}
          inputSize={inputSize}
          multiple={isMultiple}
          searchable={isSearchable}
          disabled={isDisabled}
          icon={
            isGrouped ? (
              <Layers
                className={
                  inputSize === "sm"
                    ? "w-3.5 h-3.5"
                    : inputSize === "lg"
                      ? "w-5 h-5"
                      : "w-4 h-4"
                }
              />
            ) : undefined
          }
          label={isGrouped ? "Technologies" : "Department"}
          placeholder="Select an option..."
          helperText={
            !showError ? "Choose the options you wish to add." : undefined
          }
          error={
            showError
              ? "Please select a valid option to proceed."
              : undefined
          }
        />
      </div>
    </div>
  );
}
