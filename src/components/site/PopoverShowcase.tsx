"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { VariantTabs } from "@/components/site/VariantTabs";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/custom/blocks/PopoverBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { Settings2, User } from "lucide-react";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const POPOVER_ENGINE_CODE_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { useState, useRef, useEffect, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface PopoverContextType { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>>; triggerRef: React.RefObject<HTMLDivElement | null>; }
const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

export interface PopoverProps { children: React.ReactNode; }
export function Popover({ children }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  return <PopoverContext.Provider value={{ open, setOpen, triggerRef }}>{children}</PopoverContext.Provider>;
}

export interface PopoverTriggerProps extends React.HTMLAttributes<HTMLDivElement> { asChild?: boolean; }
export function PopoverTrigger({ children, className, ...props }: PopoverTriggerProps) {
  const context = useContext(PopoverContext);
  if (!context) throw new Error("PopoverTrigger must be used within a Popover");
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    context.setOpen((prev) => !prev);
  };

  return (
    <div ref={context.triggerRef} onClick={handleClick} className={cn("inline-block", className)} role="button" tabIndex={0} aria-haspopup="dialog" aria-expanded={context.open} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); context.setOpen((prev) => !prev); } }} {...props}>
      {children}
    </div>
  );
}

export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> { side?: "top" | "right" | "bottom" | "left"; align?: "start" | "center" | "end"; sideOffset?: number; }
export function PopoverContent({ side = "bottom", align = "center", sideOffset = 8, className, children, ...props }: PopoverContentProps) {
  const context = useContext(PopoverContext);
  if (!context) throw new Error("PopoverContent must be used within a Popover");

  const { open, setOpen, triggerRef } = context;
  const [coords, setCoords] = useState({ top: -9999, left: -9999 });
  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!open || !triggerRef.current || !contentRef.current) return;
    const updatePosition = () => {
      const trigger = triggerRef.current!.getBoundingClientRect();
      const content = contentRef.current!.getBoundingClientRect();
      let top = 0; let left = 0;

      if (side === "top") top = trigger.top - content.height - sideOffset;
      if (side === "bottom") top = trigger.bottom + sideOffset;
      if (side === "left") left = trigger.left - content.width - sideOffset;
      if (side === "right") left = trigger.right + sideOffset;

      if (side === "top" || side === "bottom") {
        if (align === "center") left = trigger.left + trigger.width / 2 - content.width / 2;
        if (align === "start") left = trigger.left;
        if (align === "end") left = trigger.right - content.width;
      } else {
        if (align === "center") top = trigger.top + trigger.height / 2 - content.height / 2;
        if (align === "start") top = trigger.top;
        if (align === "end") top = trigger.bottom - content.height;
      }
      setCoords({ top: top + window.scrollY, left: left + window.scrollX });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => { window.removeEventListener("scroll", updatePosition, true); window.removeEventListener("resize", updatePosition); };
  }, [open, side, align, sideOffset]);

  useEffect(() => {
    if (!open) return;
    const handleInteractOutside = (e: MouseEvent | TouchEvent) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node) && triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", handleInteractOutside);
    document.addEventListener("touchstart", handleInteractOutside);
    document.addEventListener("keydown", handleEscape);
    return () => { document.removeEventListener("mousedown", handleInteractOutside); document.removeEventListener("touchstart", handleInteractOutside); document.removeEventListener("keydown", handleEscape); };
  }, [open, setOpen, triggerRef]);

  if (!mounted || !open) return null;
  return createPortal(
    <div ref={contentRef} role="dialog" className={cn("absolute z-[9999] w-72 p-4 outline-none text-zinc-950 dark:text-zinc-50 bg-white dark:bg-[#050505] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg animate-in fade-in zoom-in-95 duration-200", className)} style={{ top: coords.top, left: coords.left }} onClick={(e) => e.stopPropagation()} {...props}>{children}</div>,
    document.body
  );
}`;

// --- JAVASCRIPT ENGINE CODE (Hardcoded native ES6) ---
const POPOVER_ENGINE_CODE_JS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { useState, useRef, useEffect, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

const PopoverContext = createContext(undefined);

export function Popover({ children }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  return <PopoverContext.Provider value={{ open, setOpen, triggerRef }}>{children}</PopoverContext.Provider>;
}

export function PopoverTrigger({ children, className, ...props }) {
  const context = useContext(PopoverContext);
  if (!context) throw new Error("PopoverTrigger must be used within a Popover");
  
  const handleClick = (e) => {
    e.stopPropagation();
    context.setOpen((prev) => !prev);
  };

  return (
    <div ref={context.triggerRef} onClick={handleClick} className={cn("inline-block", className)} role="button" tabIndex={0} aria-haspopup="dialog" aria-expanded={context.open} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); context.setOpen((prev) => !prev); } }} {...props}>
      {children}
    </div>
  );
}

export function PopoverContent({ side = "bottom", align = "center", sideOffset = 8, className, children, ...props }) {
  const context = useContext(PopoverContext);
  if (!context) throw new Error("PopoverContent must be used within a Popover");

  const { open, setOpen, triggerRef } = context;
  const [coords, setCoords] = useState({ top: -9999, left: -9999 });
  const contentRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!open || !triggerRef.current || !contentRef.current) return;
    const updatePosition = () => {
      const trigger = triggerRef.current.getBoundingClientRect();
      const content = contentRef.current.getBoundingClientRect();
      let top = 0; let left = 0;

      if (side === "top") top = trigger.top - content.height - sideOffset;
      if (side === "bottom") top = trigger.bottom + sideOffset;
      if (side === "left") left = trigger.left - content.width - sideOffset;
      if (side === "right") left = trigger.right + sideOffset;

      if (side === "top" || side === "bottom") {
        if (align === "center") left = trigger.left + trigger.width / 2 - content.width / 2;
        if (align === "start") left = trigger.left;
        if (align === "end") left = trigger.right - content.width;
      } else {
        if (align === "center") top = trigger.top + trigger.height / 2 - content.height / 2;
        if (align === "start") top = trigger.top;
        if (align === "end") top = trigger.bottom - content.height;
      }
      setCoords({ top: top + window.scrollY, left: left + window.scrollX });
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => { window.removeEventListener("scroll", updatePosition, true); window.removeEventListener("resize", updatePosition); };
  }, [open, side, align, sideOffset]);

  useEffect(() => {
    if (!open) return;
    const handleInteractOutside = (e) => {
      if (contentRef.current && !contentRef.current.contains(e.target) && triggerRef.current && !triggerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleEscape = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", handleInteractOutside);
    document.addEventListener("touchstart", handleInteractOutside);
    document.addEventListener("keydown", handleEscape);
    return () => { document.removeEventListener("mousedown", handleInteractOutside); document.removeEventListener("touchstart", handleInteractOutside); document.removeEventListener("keydown", handleEscape); };
  }, [open, setOpen, triggerRef]);

  if (!mounted || !open) return null;
  return createPortal(
    <div ref={contentRef} role="dialog" className={cn("absolute z-[9999] w-72 p-4 outline-none text-zinc-950 dark:text-zinc-50 bg-white dark:bg-[#050505] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg animate-in fade-in zoom-in-95 duration-200", className)} style={{ top: coords.top, left: coords.left }} onClick={(e) => e.stopPropagation()} {...props}>{children}</div>,
    document.body
  );
}`;

export function PopoverShowcase() {
  const [side, setSide] = useState<"top" | "right" | "bottom" | "left">(
    "bottom",
  );
  const [align, setAlign] = useState<"start" | "center" | "end">("center");

  const generateUsageCode = () => {
    return `import { 
  Popover, PopoverTrigger, PopoverContent 
} from "@/components/custom/blocks/PopoverBlock";
import { Settings2 } from "lucide-react";

export default function App() {
  return (
    <Popover>
      <PopoverTrigger>
        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg font-medium">
          <Settings2 className="w-4 h-4" /> Options
        </button>
      </PopoverTrigger>
      
      <PopoverContent side="${side}" align="${align}" className="w-80">
        <div className="space-y-4">
          <div className="space-y-1 text-sm">
            <h4 className="font-semibold text-zinc-900 dark:text-white">Dimensions</h4>
            <p className="text-zinc-500">Set the dimensions for the layer.</p>
          </div>
          <div className="grid gap-3">
            <div className="grid grid-cols-3 items-center gap-4 text-sm">
              <label htmlFor="width" className="text-zinc-600 dark:text-zinc-400">Width</label>
              <input id="width" defaultValue="100%" className="col-span-2 h-8 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4 text-sm">
              <label htmlFor="height" className="text-zinc-600 dark:text-zinc-400">Height</label>
              <input id="height" defaultValue="25px" className="col-span-2 h-8 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col xl:flex-row gap-6 p-5 rounded-xl z-0 relative">
        <VariantTabs
          variants={["top", "bottom", "left", "right"]}
          label="Side Anchor"
          defaultValue={side}
          onValueChange={(v) => setSide(v as "top" | "bottom" | "left" | "right")}
        />

        <VariantTabs
          variants={["start", "center", "end"]}
          label="Alignment"
          defaultValue={align}
          onValueChange={(v) => setAlign(v as "start" | "center" | "end")}
        />
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="PopoverBlock"
        tsCode={POPOVER_ENGINE_CODE_TS}
        jsCode={POPOVER_ENGINE_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
        sandbox="popover"
        sandboxProps={{ side, align }}
      >
        <div className="w-full flex items-center justify-center min-h-[400px] relative z-10 overflow-hidden">
          <Popover>
            <PopoverTrigger>
              <div className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:scale-105 transition-transform cursor-pointer shadow-sm text-sm font-semibold">
                <Settings2 className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                Configure Settings
              </div>
            </PopoverTrigger>

            <PopoverContent side={side} align={align}>
              <div className="space-y-4">
                <div className="space-y-1 text-sm border-b border-zinc-100 dark:border-zinc-800/50 pb-3">
                  <h4 className="font-bold text-zinc-900 dark:text-white">
                    Dimensions
                  </h4>
                  <p className="text-zinc-500 text-xs">
                    Set the dimensions for the layer.
                  </p>
                </div>
                <div className="grid gap-3">
                  <div className="grid grid-cols-3 items-center gap-4 text-sm">
                    <label
                      htmlFor="width"
                      className="text-zinc-600 dark:text-zinc-400 font-medium"
                    >
                      Width
                    </label>
                    <input
                      id="width"
                      defaultValue="100%"
                      className="col-span-2 h-8 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4 text-sm">
                    <label
                      htmlFor="height"
                      className="text-zinc-600 dark:text-zinc-400 font-medium"
                    >
                      Height
                    </label>
                    <input
                      id="height"
                      defaultValue="25px"
                      className="col-span-2 h-8 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4 text-sm">
                    <label
                      htmlFor="max"
                      className="text-zinc-600 dark:text-zinc-400 font-medium"
                    >
                      Max. Width
                    </label>
                    <input
                      id="max"
                      defaultValue="none"
                      className="col-span-2 h-8 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Secondary Popover for User Profile Demo */}
          <div className="absolute top-6 right-6">
            <Popover>
              <PopoverTrigger>
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 flex items-center justify-center cursor-pointer hover:bg-indigo-200 transition-colors">
                  <User className="w-5 h-5" />
                </div>
              </PopoverTrigger>
              <PopoverContent side="bottom" align="end" className="w-64">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800/50 pb-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">Andy Bernard</span>
                      <span className="text-xs text-zinc-500">
                        andy@dundermifflin.com
                      </span>
                    </div>
                  </div>
                  <button className="text-left text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
                    View Profile
                  </button>
                  <button className="text-left text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white">
                    Billing Settings
                  </button>
                  <button className="text-left text-sm text-red-600 hover:text-red-700 mt-2">
                    Log out
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
