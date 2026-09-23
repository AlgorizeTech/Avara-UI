"use client";

import { Slider } from "@/components/custom/ui/slider";
import { useThemeContext } from "@/contexts/theme-context";

export function FontSizeControl() {
  const { fontSize, setFontSize } = useThemeContext();

  function handleFontSizeChange(value: number[]) {
    const size = String(value[0]);
    setFontSize(size);
    const root = window.document.documentElement;
    root.style.fontSize = size + "%";
    localStorage.setItem("fontSize", size);
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground/35">
          Scale
        </span>
        <span className="text-[12px] tabular-nums text-foreground/50">{fontSize}%</span>
      </div>
      <Slider
        value={[Number(fontSize)]}
        onValueChange={handleFontSizeChange}
        min={75}
        max={130}
        step={5}
      />
      <div className="flex justify-between text-[11px] tabular-nums text-foreground/35">
        <span>75%</span>
        <span>100%</span>
        <span>130%</span>
      </div>
    </div>
  );
}
