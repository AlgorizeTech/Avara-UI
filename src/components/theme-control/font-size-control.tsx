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
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p>Font Size</p>
        <span className="text-sm font-medium text-primary">{fontSize}%</span>
      </div>
      <Slider
        value={[Number(fontSize)]}
        onValueChange={handleFontSizeChange}
        min={75}
        max={150}
        step={5}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>75%</span>
        <span>100%</span>
        <span>125%</span>
        <span>150%</span>
      </div>
    </div>
  );
}
