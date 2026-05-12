"use client";

import { Edit } from "lucide-react";
import { useEffect, useState } from "react";

import { useThemeContext } from "@/contexts/theme-context";
import { cn } from "@/lib/utils";

const themeColors = ["#6356d1", "#7F22FE", "#0D9394", "#FFAB1D", "#EB3D63"];

export function PrimaryColorControl() {
  const { primaryColor, setPrimaryColor } = useThemeContext();
  const [colorInput, setColorInput] = useState(primaryColor);

  useEffect(() => {
    setColorInput(primaryColor);
  }, [primaryColor]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (colorInput !== primaryColor) {
        handleColorChange(colorInput);
      }
    }, 500);
    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorInput]);

  function handleColorChange(color: string) {
    setPrimaryColor(color);
    const root = window.document.documentElement;
    root.style.setProperty("--primary", color);
    localStorage.setItem("primaryColor", color);
  }

  return (
    <div className="space-y-3 relative">
      <p>Primary Color</p>
      <div className="flex gap-2">
        {themeColors.map((color) => (
          <div
            key={color}
            className={cn(
              "grid w-1/6 place-content-center rounded border-2 p-2",
              primaryColor === color
                ? "border-primary"
                : "hover:border-neutral-400 dark:hover:border-neutral-700",
            )}
            onClick={() => handleColorChange(color)}
          >
            <span
              className="block size-7 min-w-7 cursor-pointer rounded"
              style={{ backgroundColor: color }}
            />
          </div>
        ))}
        <div
          className={cn(
            "relative grid place-content-center rounded border-2 p-2",
            !themeColors.includes(primaryColor)
              ? "border-primary"
              : "hover:border-neutral-400 dark:hover:border-neutral-700",
          )}
        >
          <label htmlFor="theme-control-color-input">
            <Edit className="text-primary size-7 min-w-7 cursor-pointer" />
          </label>
          <input
            type="color"
            id="theme-control-color-input"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => setColorInput(e.target.value)}
            value={colorInput}
          />
        </div>
      </div>
    </div>
  );
}
