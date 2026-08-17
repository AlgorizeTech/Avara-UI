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
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Scale
        </span>
        <span className="font-semibold text-primary">{fontSize}%</span>
      </div>
      <Slider
        value={[Number(fontSize)]}
        onValueChange={handleFontSizeChange}
        min={75}
        max={130}
        step={5}
      />
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>75%</span>
        <span>100%</span>
        <span>130%</span>
      </div>
    </div>
  );
}
