"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { VariantTabs } from "@/components/site/VariantTabs";

import { Toggle } from "@/components/custom/blocks/ToggleBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { Bold, Italic, Mic, MicOff, Underline } from "lucide-react";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const TOGGLE_ENGINE_CODE_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { useState, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, variant = "default", size = "md", pressed: controlledPressed, defaultPressed = false, onPressedChange, ...props }, ref) => {
    
    const isControlled = controlledPressed !== undefined;
    const [uncontrolledPressed, setUncontrolledPressed] = useState(defaultPressed);
    const isPressed = isControlled ? controlledPressed : uncontrolledPressed;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const newState = !isPressed;
      if (!isControlled) setUncontrolledPressed(newState);
      onPressedChange?.(newState);
      props.onClick?.(e);
    };

    const variants = {
      default: "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 data-[state=on]:bg-zinc-200 dark:data-[state=on]:bg-zinc-700 data-[state=on]:text-zinc-900 dark:data-[state=on]:text-zinc-50",
      outline: "border border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 data-[state=on]:bg-zinc-100 dark:data-[state=on]:bg-zinc-800 data-[state=on]:text-zinc-900 dark:data-[state=on]:text-zinc-50",
      ghost: "bg-transparent hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 data-[state=on]:bg-zinc-100/50 dark:data-[state=on]:bg-zinc-800/50 data-[state=on]:text-zinc-900 dark:data-[state=on]:text-zinc-50"
    };

    const sizes = { sm: "h-8 px-2.5 text-xs", md: "h-9 px-3 text-sm", lg: "h-10 px-4 text-sm" };

    return (
      <button
        type="button" ref={ref} aria-pressed={isPressed} data-state={isPressed ? "on" : "off"} onClick={handleClick}
        className={cn("inline-flex items-center justify-center rounded-md font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50", variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Toggle.displayName = "Toggle";
`;

// --- JAVASCRIPT ENGINE CODE (Hardcoded native ES6) ---
const TOGGLE_ENGINE_CODE_JS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { useState, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Toggle = forwardRef(({ className, variant = "default", size = "md", pressed: controlledPressed, defaultPressed = false, onPressedChange, ...props }, ref) => {
  const isControlled = controlledPressed !== undefined;
  const [uncontrolledPressed, setUncontrolledPressed] = useState(defaultPressed);
  const isPressed = isControlled ? controlledPressed : uncontrolledPressed;

  const handleClick = (e) => {
    const newState = !isPressed;
    if (!isControlled) setUncontrolledPressed(newState);
    onPressedChange?.(newState);
    props.onClick?.(e);
  };

  const variants = {
    default: "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 data-[state=on]:bg-zinc-200 dark:data-[state=on]:bg-zinc-700 data-[state=on]:text-zinc-900 dark:data-[state=on]:text-zinc-50",
    outline: "border border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 data-[state=on]:bg-zinc-100 dark:data-[state=on]:bg-zinc-800 data-[state=on]:text-zinc-900 dark:data-[state=on]:text-zinc-50",
    ghost: "bg-transparent hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 data-[state=on]:bg-zinc-100/50 dark:data-[state=on]:bg-zinc-800/50 data-[state=on]:text-zinc-900 dark:data-[state=on]:text-zinc-50"
  };

  const sizes = { sm: "h-8 px-2.5 text-xs", md: "h-9 px-3 text-sm", lg: "h-10 px-4 text-sm" };

  return (
    <button
      type="button" ref={ref} aria-pressed={isPressed} data-state={isPressed ? "on" : "off"} onClick={handleClick}
      className={cn("inline-flex items-center justify-center rounded-md font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50", variants[variant], sizes[size], className)}
      {...props}
    />
  );
});
Toggle.displayName = "Toggle";
`;

export function ToggleShowcase() {
  const [variant, setVariant] = useState<"default" | "outline" | "ghost">(
    "default",
  );
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");

  // States for the rich text editor demo
  const [format, setFormat] = useState({
    bold: false,
    italic: true,
    underline: false,
  });
  const [muted, setMuted] = useState(false);

  const generateUsageCode = () => {
    return `import { Toggle } from "@/components/custom/blocks/ToggleBlock";
import { Bold } from "lucide-react";

export default function App() {
  return (
    <Toggle variant="${variant}" size="${size}" aria-label="Toggle bold">
      <Bold className="w-4 h-4 mr-2" />
      Bold
    </Toggle>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col md:flex-row gap-6 p-5 rounded-xl z-0 relative">
        <VariantTabs
          label="Variant"
          variants={["default", "outline", "ghost"]}
          defaultValue="default"
          onValueChange={(v) => setVariant(v as "default" | "outline" | "ghost")}
        />
        <VariantTabs
          label="Size"
          variants={["sm", "md", "lg"]}
          defaultValue="md"
          onValueChange={(v) => setSize(v as "sm" | "md" | "lg")}
        />
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="ToggleBlock"
        tsCode={TOGGLE_ENGINE_CODE_TS}
        jsCode={TOGGLE_ENGINE_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
      >
        <div className="w-full flex flex-col items-center justify-center min-h-[300px] gap-12 transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-6 relative z-10">
          {/* Group 1: Editor Toolbar Example */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm font-medium text-zinc-500">
              Rich Text Formatting
            </p>
            <div className="flex items-center p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0a0a0a] shadow-sm">
              <Toggle
                variant={variant}
                size={size}
                pressed={format.bold}
                onPressedChange={(v) => setFormat({ ...format, bold: v })}
                aria-label="Toggle bold"
              >
                <Bold className="w-4 h-4" />
              </Toggle>
              <Toggle
                variant={variant}
                size={size}
                pressed={format.italic}
                onPressedChange={(v) => setFormat({ ...format, italic: v })}
                aria-label="Toggle italic"
              >
                <Italic className="w-4 h-4" />
              </Toggle>
              <Toggle
                variant={variant}
                size={size}
                pressed={format.underline}
                onPressedChange={(v) => setFormat({ ...format, underline: v })}
                aria-label="Toggle underline"
              >
                <Underline className="w-4 h-4" />
              </Toggle>
            </div>
          </div>

          {/* Group 2: Independent Action Example */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm font-medium text-zinc-500">
              State Toggle (with text)
            </p>
            <Toggle
              variant={variant}
              size={size}
              pressed={muted}
              onPressedChange={setMuted}
              className={
                muted
                  ? "text-red-600 data-[state=on]:text-red-600 data-[state=on]:bg-red-50 dark:data-[state=on]:bg-red-500/10 dark:data-[state=on]:text-red-400"
                  : ""
              }
            >
              {muted ? (
                <MicOff className="w-4 h-4 mr-2" />
              ) : (
                <Mic className="w-4 h-4 mr-2" />
              )}
              {muted ? "Unmute" : "Mute"}
            </Toggle>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
