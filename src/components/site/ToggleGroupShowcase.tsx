"use client";

import {
  ToggleGroup,
  ToggleGroupColor,
  ToggleGroupItem,
  ToggleGroupSize,
  ToggleGroupVariant,
} from "@/components/custom/blocks/ToggleGroupBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { VariantTabs } from "@/components/site/VariantTabs";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react";
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const TOGGLE_ENGINE_CODE_TS = `"use client";

import React, { createContext, forwardRef, useContext } from "react";
import { cn } from "@/lib/utils";

export type ToggleGroupColor = "indigo" | "rose" | "emerald" | "zinc" | (string & {});
export type ToggleGroupVariant = "default" | "outline" | "ghost";
export type ToggleGroupSize = "sm" | "md" | "lg";
export type ToggleGroupType = "single" | "multiple";

const colorThemes: Record<string, Record<string, string>> = {
  indigo: { bg: "bg-indigo-500 text-white", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10" },
  rose: { bg: "bg-rose-500 text-white", text: "text-rose-600 dark:text-rose-400", border: "border-rose-500 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10" },
  emerald: { bg: "bg-emerald-500 text-white", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10" },
  zinc: { bg: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900", text: "text-zinc-900 dark:text-zinc-100", border: "border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800" },
};

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex);
  return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "99, 102, 241";
};

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: { bg: "bg-[var(--toggle-color)] text-white", text: "text-[var(--toggle-color)]", border: "border-[var(--toggle-color)] text-[var(--toggle-color)] bg-[rgba(var(--toggle-rgb),0.1)]" },
      style: { "--toggle-color": color, "--toggle-rgb": rgb } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.zinc, style: {} };
};

interface ToggleGroupContextProps { type: ToggleGroupType; value: string | string[]; onValueChange: (value: string | string[]) => void; variant: ToggleGroupVariant; color: ToggleGroupColor; size: ToggleGroupSize; disabled: boolean; theme: Record<string, string>; }
const ToggleGroupContext = createContext<ToggleGroupContextProps | null>(null);
function useToggleGroup() {
  const context = useContext(ToggleGroupContext);
  if (!context) throw new Error("ToggleGroupItem must be used within a ToggleGroup");
  return context;
}

export interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> { type?: ToggleGroupType; value?: string | string[]; defaultValue?: string | string[]; onValueChange?: (value: any) => void; variant?: ToggleGroupVariant; color?: ToggleGroupColor; size?: ToggleGroupSize; disabled?: boolean; }
export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(({ type = "single", value: controlledValue, defaultValue, onValueChange, variant = "default", color = "zinc", size = "md", disabled = false, className, children, ...props }, ref) => {
  const { theme, style } = getThemeStyles(color as string);
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string | string[]>(defaultValue !== undefined ? defaultValue : type === "single" ? "" : []);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = (newValue: string | string[]) => {
    if (!isControlled) setUncontrolledValue(newValue);
    if (onValueChange) onValueChange(newValue);
  };

  return (
    <ToggleGroupContext.Provider value={{ type, value: currentValue, onValueChange: handleValueChange, variant, color, size, disabled, theme }}>
      <div ref={ref} role="group" className={cn("inline-flex flex-wrap items-center gap-1", variant === "default" && "p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800", className)} style={style} {...props}>{children}</div>
    </ToggleGroupContext.Provider>
  );
});
ToggleGroup.displayName = "ToggleGroup";

export interface ToggleGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { value: string; }
export const ToggleGroupItem = forwardRef<HTMLButtonElement, ToggleGroupItemProps>(({ value, disabled: itemDisabled, className, children, ...props }, ref) => {
  const { type, value: groupValue, onValueChange, variant, size, disabled: groupDisabled, theme } = useToggleGroup();
  const isDisabled = groupDisabled || itemDisabled;
  const isActive = type === "single" ? groupValue === value : Array.isArray(groupValue) && groupValue.includes(value);

  const handleToggle = () => {
    if (isDisabled) return;
    if (type === "single") onValueChange(isActive ? "" : value);
    else {
      const currentArray = Array.isArray(groupValue) ? groupValue : [];
      onValueChange(isActive ? currentArray.filter((v) => v !== value) : [...currentArray, value]);
    }
  };

  const sizeStyles = { sm: "h-8 px-2.5 text-xs", md: "h-10 px-3.5 text-sm", lg: "h-12 px-5 text-base" };
  const getVariantStyles = () => {
    if (isActive) {
      if (variant === "outline") return cn(theme.border, "shadow-sm");
      if (variant === "ghost") return cn(theme.text, "bg-zinc-100 dark:bg-zinc-800");
      return cn(theme.bg, "shadow-md");
    }
    if (variant === "outline") return "border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800";
    if (variant === "ghost") return "bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800";
    return "bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800";
  };

  return (
    <button ref={ref} type="button" role={type === "single" ? "radio" : "checkbox"} aria-checked={isActive} disabled={isDisabled} onClick={handleToggle} className={cn("inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed", sizeStyles[size], getVariantStyles(), className)} {...props}>{children}</button>
  );
});
ToggleGroupItem.displayName = "ToggleGroupItem";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const TOGGLE_ENGINE_CODE_JS = `"use client";

import React, { createContext, forwardRef, useContext, useState } from "react";
import { cn } from "@/lib/utils";

const colorThemes = {
  indigo: { bg: "bg-indigo-500 text-white", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10" },
  rose: { bg: "bg-rose-500 text-white", text: "text-rose-600 dark:text-rose-400", border: "border-rose-500 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10" },
  emerald: { bg: "bg-emerald-500 text-white", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10" },
  zinc: { bg: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900", text: "text-zinc-900 dark:text-zinc-100", border: "border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800" },
};

const hexToRgb = (hex) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex);
  return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "99, 102, 241";
};

export const getThemeStyles = (color) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: { bg: "bg-[var(--toggle-color)] text-white", text: "text-[var(--toggle-color)]", border: "border-[var(--toggle-color)] text-[var(--toggle-color)] bg-[rgba(var(--toggle-rgb),0.1)]" },
      style: { "--toggle-color": color, "--toggle-rgb": rgb },
    };
  }
  return { theme: colorThemes[color] || colorThemes.zinc, style: {} };
};

const ToggleGroupContext = createContext(null);
function useToggleGroup() {
  const context = useContext(ToggleGroupContext);
  if (!context) throw new Error("ToggleGroupItem must be used within a ToggleGroup");
  return context;
}

export const ToggleGroup = forwardRef(({ type = "single", value: controlledValue, defaultValue, onValueChange, variant = "default", color = "zinc", size = "md", disabled = false, className, children, ...props }, ref) => {
  const { theme, style } = getThemeStyles(color);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue !== undefined ? defaultValue : type === "single" ? "" : []);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = (newValue) => {
    if (!isControlled) setUncontrolledValue(newValue);
    if (onValueChange) onValueChange(newValue);
  };

  return (
    <ToggleGroupContext.Provider value={{ type, value: currentValue, onValueChange: handleValueChange, variant, color, size, disabled, theme }}>
      <div ref={ref} role="group" className={cn("inline-flex flex-wrap items-center gap-1", variant === "default" && "p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800", className)} style={style} {...props}>{children}</div>
    </ToggleGroupContext.Provider>
  );
});
ToggleGroup.displayName = "ToggleGroup";

export const ToggleGroupItem = forwardRef(({ value, disabled: itemDisabled, className, children, ...props }, ref) => {
  const { type, value: groupValue, onValueChange, variant, size, disabled: groupDisabled, theme } = useToggleGroup();
  const isDisabled = groupDisabled || itemDisabled;
  const isActive = type === "single" ? groupValue === value : Array.isArray(groupValue) && groupValue.includes(value);

  const handleToggle = () => {
    if (isDisabled) return;
    if (type === "single") onValueChange(isActive ? "" : value);
    else {
      const currentArray = Array.isArray(groupValue) ? groupValue : [];
      onValueChange(isActive ? currentArray.filter((v) => v !== value) : [...currentArray, value]);
    }
  };

  const sizeStyles = { sm: "h-8 px-2.5 text-xs", md: "h-10 px-3.5 text-sm", lg: "h-12 px-5 text-base" };
  const getVariantStyles = () => {
    if (isActive) {
      if (variant === "outline") return cn(theme.border, "shadow-sm");
      if (variant === "ghost") return cn(theme.text, "bg-zinc-100 dark:bg-zinc-800");
      return cn(theme.bg, "shadow-md");
    }
    if (variant === "outline") return "border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800";
    if (variant === "ghost") return "bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800";
    return "bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800";
  };

  return (
    <button ref={ref} type="button" role={type === "single" ? "radio" : "checkbox"} aria-checked={isActive} disabled={isDisabled} onClick={handleToggle} className={cn("inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed", sizeStyles[size], getVariantStyles(), className)} {...props}>{children}</button>
  );
});
ToggleGroupItem.displayName = "ToggleGroupItem";`;

export function ToggleGroupShowcase() {
  const [variant, setVariant] = useState<ToggleGroupVariant>("default");
  const [size, setSize] = useState<ToggleGroupSize>("md");

  // States for the interactive previews
  const [singleValue, setSingleValue] = useState("center");
  const [multipleValue, setMultipleValue] = useState<string[]>(["bold"]);

  // Initialize with localStorage if available
  const [color, setColor] = useState<ToggleGroupColor | string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("primaryColor") || "indigo";
    }
    return "indigo";
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("primaryColor");
      if (stored && stored !== color) {
        setColor(stored);
      }
    }, 1000);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "primaryColor" && e.newValue) {
        setColor(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorage);
    };
  }, [color]);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    localStorage.setItem("primaryColor", newColor);
  };

  const generateUsageCode = (isTs: boolean) => {
    const propsStr = `\n      type="multiple"\n      variant="${variant}"\n      color="${color}"\n      size="${size}"`;

    return `import { ToggleGroup, ToggleGroupItem } from "@/components/custom/blocks/ToggleGroupBlock";
import { Bold, Italic, Underline } from "lucide-react";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

export default function TextEditorToolbar() {
  return (
    <ToggleGroup ${propsStr}
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
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col gap-6 p-5 rounded-xl z-0 relative">
        <div className="flex flex-col xl:flex-row gap-6">
          <VariantTabs
            label="Style Variant"
            variants={["default", "outline", "ghost"]}
            defaultValue="default"
            onValueChange={(v) => setVariant(v as ToggleGroupVariant)}
          />
          <VariantTabs
            label="Size"
            variants={["sm", "md", "lg"]}
            defaultValue="md"
            onValueChange={(v) => setSize(v as ToggleGroupSize)}
          />
        </div>
        <ThemeColorPicker color={color} onChange={handleColorChange} label="Active Color Theme" />
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="ToggleGroupBlock"
        tsCode={TOGGLE_ENGINE_CODE_TS}
        jsCode={TOGGLE_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
        sandbox="toggle-group"
        sandboxProps={{ variant, size, color, singleValue, multipleValue }}
      >
        <div className="w-full flex flex-col items-center justify-center min-h-[400px] gap-12 relative z-10">
          {/* Example 1: Single Selection (Alignment) */}
          <div className="flex flex-col items-center gap-4">
            <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest">
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
              <ToggleGroupItem
                value="justify"
                aria-label="Toggle align justify"
              >
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
            <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest">
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
      </ComponentPreview>
    </div>
  );
}
