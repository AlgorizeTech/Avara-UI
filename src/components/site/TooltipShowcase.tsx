"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/custom/blocks/TooltipBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { Heart, Plus, Settings } from "lucide-react";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const TOOLTIP_ENGINE_CODE_TS = `"use client";

import React, { useState, useRef, useEffect, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface TooltipContextType { open: boolean; handleOpen: () => void; handleClose: () => void; triggerRef: React.RefObject<HTMLDivElement | null>; }
const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

export function TooltipProvider({ children }: { children: React.ReactNode }) { return <>{children}</>; }

export interface TooltipProps { children: React.ReactNode; delayDuration?: number; }
export function Tooltip({ children, delayDuration = 200 }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpen = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(true), delayDuration);
  };
  const handleClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(false);
  };

  return <TooltipContext.Provider value={{ open, handleOpen, handleClose, triggerRef }}>{children}</TooltipContext.Provider>;
}

export interface TooltipTriggerProps extends React.HTMLAttributes<HTMLDivElement> { asChild?: boolean; }
export function TooltipTrigger({ children, className, ...props }: TooltipTriggerProps) {
  const context = useContext(TooltipContext);
  if (!context) throw new Error("TooltipTrigger must be used within a Tooltip");
  return (
    <div ref={context.triggerRef} onMouseEnter={context.handleOpen} onMouseLeave={context.handleClose} onFocus={context.handleOpen} onBlur={context.handleClose} className={cn("inline-block", className)} tabIndex={0} aria-haspopup="dialog" aria-expanded={context.open} {...props}>
      {children}
    </div>
  );
}

export interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> { side?: "top" | "right" | "bottom" | "left"; align?: "start" | "center" | "end"; sideOffset?: number; }
export function TooltipContent({ side = "top", align = "center", sideOffset = 6, className, children, ...props }: TooltipContentProps) {
  const context = useContext(TooltipContext);
  if (!context) throw new Error("TooltipContent must be used within a Tooltip");

  const { open, triggerRef } = context;
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

  if (!mounted || !open) return null;
  return createPortal(
    <div ref={contentRef} role="tooltip" className={cn("absolute z-[9999] px-3 py-1.5 text-xs font-medium text-white dark:text-zinc-900 bg-zinc-900 dark:bg-white rounded-md shadow-md animate-in fade-in zoom-in-95 duration-150 pointer-events-none", className)} style={{ top: coords.top, left: coords.left }} {...props}>{children}</div>,
    document.body
  );
}`;

// --- JAVASCRIPT ENGINE CODE (Hardcoded native ES6) ---
const TOOLTIP_ENGINE_CODE_JS = `"use client";

import React, { useState, useRef, useEffect, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

const TooltipContext = createContext(undefined);

export function TooltipProvider({ children }) {
  return <>{children}</>;
}

export function Tooltip({ children, delayDuration = 200 }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleOpen = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setOpen(true), delayDuration);
  };

  const handleClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(false);
  };

  return (
    <TooltipContext.Provider value={{ open, handleOpen, handleClose, triggerRef }}>
      {children}
    </TooltipContext.Provider>
  );
}

export function TooltipTrigger({ children, className, ...props }) {
  const context = useContext(TooltipContext);
  if (!context) throw new Error("TooltipTrigger must be used within a Tooltip");

  return (
    <div
      ref={context.triggerRef}
      onMouseEnter={context.handleOpen}
      onMouseLeave={context.handleClose}
      onFocus={context.handleOpen}
      onBlur={context.handleClose}
      className={cn("inline-block", className)}
      tabIndex={0}
      aria-haspopup="dialog"
      aria-expanded={context.open}
      {...props}
    >
      {children}
    </div>
  );
}

export function TooltipContent({ side = "top", align = "center", sideOffset = 6, className, children, ...props }) {
  const context = useContext(TooltipContext);
  if (!context) throw new Error("TooltipContent must be used within a Tooltip");

  const { open, triggerRef } = context;
  const [coords, setCoords] = useState({ top: -9999, left: -9999 });
  const contentRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open || !triggerRef.current || !contentRef.current) return;

    const updatePosition = () => {
      const trigger = triggerRef.current.getBoundingClientRect();
      const content = contentRef.current.getBoundingClientRect();
      let top = 0;
      let left = 0;

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
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, side, align, sideOffset]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      ref={contentRef}
      role="tooltip"
      className={cn(
        "absolute z-[9999] px-3 py-1.5 text-xs font-medium text-white dark:text-zinc-900 bg-zinc-900 dark:bg-white rounded-md shadow-md animate-in fade-in zoom-in-95 duration-150 pointer-events-none",
        className
      )}
      style={{ top: coords.top, left: coords.left }}
      {...props}
    >
      {children}
    </div>,
    document.body
  );
}`;

export function TooltipShowcase() {
  const [side, setSide] = useState<"top" | "right" | "bottom" | "left">("top");
  const [align, setAlign] = useState<"start" | "center" | "end">("center");
  const [delay, setDelay] = useState(200);

  const generateUsageCode = () => {
    return `import { 
  TooltipProvider, Tooltip, TooltipTrigger, TooltipContent 
} from "@/components/custom/blocks/TooltipBlock";

export default function App() {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={${delay}}>
        <TooltipTrigger>
          <button className="px-4 py-2 bg-black text-white rounded-md">
            Hover Me
          </button>
        </TooltipTrigger>
        <TooltipContent side="${side}" align="${align}">
          Add to library
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col xl:flex-row gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl z-0 relative">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Side Anchor
          </label>
          <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
            {(["top", "bottom", "left", "right"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSide(s)}
                className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                  side === s
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Alignment
          </label>
          <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
            {(["start", "center", "end"] as const).map((a) => (
              <button
                key={a}
                onClick={() => setAlign(a)}
                className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                  align === a
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="TooltipBlock"
        tsCode={TOOLTIP_ENGINE_CODE_TS}
        jsCode={TOOLTIP_ENGINE_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
      >
        <div className="w-full flex items-center justify-center min-h-[400px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-6 relative z-10">
          <TooltipProvider>
            {/* Main Demo Tooltip */}
            <Tooltip delayDuration={delay}>
              <TooltipTrigger>
                <div className="w-16 h-16 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:scale-105 transition-transform cursor-pointer shadow-sm">
                  <Plus className="w-6 h-6 text-zinc-700 dark:text-zinc-300" />
                </div>
              </TooltipTrigger>
              <TooltipContent side={side} align={align}>
                <p>Create new project</p>
              </TooltipContent>
            </Tooltip>

            {/* Accessory Tooltips to show density handling */}
            <div className="absolute top-6 right-6 flex gap-2">
              <Tooltip delayDuration={delay}>
                <TooltipTrigger>
                  <button className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={8}>
                  Add to favorites
                </TooltipContent>
              </Tooltip>

              <Tooltip delayDuration={delay}>
                <TooltipTrigger>
                  <button className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="end" sideOffset={8}>
                  System preferences
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </ComponentPreview>
    </div>
  );
}
