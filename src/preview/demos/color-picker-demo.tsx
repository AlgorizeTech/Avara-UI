"use client";

import { useState } from "react";
import { ColorPicker } from "@/components/custom/color-picker";

export default function ColorPickerDemo({
  variant = "standalone",
}: {
  variant?: "standalone" | "gradient";
}) {
  const [selectedColor, setSelectedColor] = useState("#d0ff00");

  return (
    <div className="w-full min-h-[460px] p-4 sm:p-8 flex flex-col items-center justify-center bg-muted/40 rounded-2xl border border-border overflow-x-auto">
      {variant === "standalone" && (
        <div className="w-full flex flex-col items-center gap-6">
          <ColorPicker
            value={selectedColor}
            onChange={setSelectedColor}
            variant="standalone"
          />
        </div>
      )}

      {variant === "gradient" && (
        <div className="w-full flex flex-col items-center gap-6">
          <ColorPicker variant="gradient" />
        </div>
      )}
    </div>
  );
}
