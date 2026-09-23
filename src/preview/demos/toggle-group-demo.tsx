"use client";

import {
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupSize,
  ToggleGroupVariant,
} from "@/components/custom/blocks/ToggleGroupBlock";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react";
import { useState } from "react";
import { toBlockColor } from "@/lib/accent";

export default function ToggleGroupDemo({
  variant = "default",
  size = "md",
  color: pickedColor = "indigo",
  singleValue: initialSingleValue = "center",
  multipleValue: initialMultipleValue = ["bold"],
  example,
}: {
  variant?: ToggleGroupVariant;
  size?: ToggleGroupSize;
  color?: string;
  singleValue?: string;
  multipleValue?: string[];
  /** Single-example modes; omitted renders the full two-group demo. */
  example?: "single" | "multiple" | "sizes" | "disabled";
}) {
  const color = toBlockColor(pickedColor);
  // States for the interactive previews
  const [singleValue, setSingleValue] = useState(initialSingleValue);
  const [multipleValue, setMultipleValue] =
    useState<string[]>(initialMultipleValue);
  const [sizeValues, setSizeValues] = useState<Record<string, string>>({
    sm: "center",
    md: "center",
    lg: "center",
  });

  const alignmentItems = (
    <>
      <ToggleGroupItem value="left" aria-label="Toggle align left">
        <AlignLeft className="w-4 h-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Toggle align center">
        <AlignCenter className="w-4 h-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Toggle align right">
        <AlignRight className="w-4 h-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="justify" aria-label="Toggle align justify">
        <AlignJustify className="w-4 h-4" />
      </ToggleGroupItem>
    </>
  );

  if (example === "single" || example === "disabled") {
    return (
      <div className="w-full flex items-center justify-center min-h-[300px] relative z-10">
        <ToggleGroup
          type="single"
          value={singleValue}
          onValueChange={setSingleValue}
          variant={variant}
          color={color}
          size={size}
          disabled={example === "disabled"}
        >
          {alignmentItems}
        </ToggleGroup>
      </div>
    );
  }

  if (example === "multiple") {
    return (
      <div className="w-full flex items-center justify-center min-h-[300px] relative z-10">
        <ToggleGroup
          type="multiple"
          value={multipleValue}
          onValueChange={setMultipleValue}
          variant={variant}
          color={color}
          size={size}
        >
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold className="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic className="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Underline className="w-4 h-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    );
  }

  // Scalar prop — every size shares a single frame.
  if (example === "sizes") {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-6 min-h-[300px] relative z-10">
        {(["sm", "md", "lg"] as ToggleGroupSize[]).map((s) => (
          <ToggleGroup
            key={s}
            type="single"
            value={sizeValues[s]}
            onValueChange={(v) => setSizeValues((prev) => ({ ...prev, [s]: v }))}
            variant={variant}
            color={color}
            size={s}
          >
            {alignmentItems}
          </ToggleGroup>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[400px] gap-12 relative z-10">
      {/* Example 1: Single Selection (Alignment) */}
      <div className="flex flex-col items-center gap-4">
        <label className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">
          Single Selection
        </label>
        <ToggleGroup
          type="single"
          value={singleValue}
          onValueChange={setSingleValue}
          variant={variant}
          color={color}
          size={size}
        >
          <ToggleGroupItem value="left" aria-label="Toggle align left">
            <AlignLeft className="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Toggle align center">
            <AlignCenter className="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Toggle align right">
            <AlignRight className="w-4 h-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="justify" aria-label="Toggle align justify">
            <AlignJustify className="w-4 h-4" />
          </ToggleGroupItem>
        </ToggleGroup>
        <p className="text-xs font-mono text-zinc-400 mt-2">
          Value: "{singleValue}"
        </p>
      </div>

      <div className="w-full max-w-sm h-px bg-zinc-200 dark:bg-zinc-800" />

      {/* Example 2: Multiple Selection (Formatting) */}
      <div className="flex flex-col items-center gap-4">
        <label className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">
          Multiple Selection
        </label>
        <ToggleGroup
          type="multiple"
          value={multipleValue}
          onValueChange={setMultipleValue}
          variant={variant}
          color={color}
          size={size}
        >
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold className="w-4 h-4" />
            {size === "lg" && <span className="ml-1">Bold</span>}
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic className="w-4 h-4" />
            {size === "lg" && <span className="ml-1">Italic</span>}
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Underline className="w-4 h-4" />
            {size === "lg" && <span className="ml-1">Underline</span>}
          </ToggleGroupItem>
        </ToggleGroup>
        <p className="text-xs font-mono text-zinc-400 mt-2">
          Value: [{multipleValue.map((v) => `"${v}"`).join(", ")}]
        </p>
      </div>
    </div>
  );
}
