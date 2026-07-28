"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { VariantTabs } from "@/components/site/VariantTabs";

import { ComponentPreview } from "@/components/site/ComponentPreview";
import { Kbd } from "@/components/custom/blocks/KbdBlock";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const KBD_ENGINE_CODE_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React from "react";
import { cn } from "@/lib/utils";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg";
}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, size = "sm", ...props }, ref) => {
    const sizeStyles = {
      sm: "h-5 px-1.5 text-[10px]",
      md: "h-6 px-2 text-xs",
      lg: "h-8 px-3 text-sm",
    };

    return (
      <kbd
        ref={ref}
        className={cn(
          "pointer-events-none inline-flex select-none items-center gap-1 rounded border font-mono font-medium",
          "border-zinc-200 bg-zinc-100 text-zinc-600 shadow-[0_1px_0_rgba(0,0,0,0.05)]",
          "dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:shadow-[0_1px_0_rgba(255,255,255,0.05)]",
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);
Kbd.displayName = "Kbd";
`;

// --- JAVASCRIPT ENGINE CODE (Hardcoded native ES6) ---
const KBD_ENGINE_CODE_JS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React from "react";
import { cn } from "@/lib/utils";

export const Kbd = React.forwardRef(({ className, size = "sm", ...props }, ref) => {
  const sizeStyles = {
    sm: "h-5 px-1.5 text-[10px]",
    md: "h-6 px-2 text-xs",
    lg: "h-8 px-3 text-sm",
  };

  return (
    <kbd
      ref={ref}
      className={cn(
        "pointer-events-none inline-flex select-none items-center gap-1 rounded border font-mono font-medium",
        "border-zinc-200 bg-zinc-100 text-zinc-600 shadow-[0_1px_0_rgba(0,0,0,0.05)]",
        "dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:shadow-[0_1px_0_rgba(255,255,255,0.05)]",
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
});
Kbd.displayName = "Kbd";
`;

export function KbdShowcase() {
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");

  const generateUsageCode = () => {
    const sizeProp = size !== "sm" ? ` size="${size}"` : "";
    return `import { Kbd } from "@/components/custom/blocks/KbdBlock";

export default function App() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-zinc-500">Press</span>
      <Kbd${sizeProp}>⌘</Kbd>
      <span className="text-sm text-zinc-500">and</span>
      <Kbd${sizeProp}>K</Kbd>
      <span className="text-sm text-zinc-500">to search</span>
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col md:flex-row gap-6 p-5 rounded-xl z-0 relative">
        <VariantTabs
          variants={["sm", "md", "lg"]}
          label="Size"
          defaultValue={size}
          onValueChange={(v) => setSize(v as "sm" | "md" | "lg")}
        />
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="KbdBlock"
        tsCode={KBD_ENGINE_CODE_TS}
        jsCode={KBD_ENGINE_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
      >
        <div className="w-full flex flex-col items-center justify-center min-h-[300px] gap-8 transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-6 relative z-10">
          
          {/* Combinations Example */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm font-medium text-zinc-500 mb-2">Common Combinations</p>
            <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
              <span className="text-sm">Save file:</span>
              <div className="flex items-center gap-1">
                <Kbd size={size}>⌘</Kbd>
                <Kbd size={size}>S</Kbd>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
              <span className="text-sm">Force Reload:</span>
              <div className="flex items-center gap-1">
                <Kbd size={size}>⇧</Kbd>
                <Kbd size={size}>⌘</Kbd>
                <Kbd size={size}>R</Kbd>
              </div>
            </div>

            <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
              <span className="text-sm">Open Terminal:</span>
              <div className="flex items-center gap-1">
                <Kbd size={size}>Ctrl</Kbd>
                <span className="text-xs text-zinc-400">+</span>
                <Kbd size={size}>~</Kbd>
              </div>
            </div>
          </div>

        </div>
      </ComponentPreview>
    </div>
  );
}