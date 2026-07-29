"use client";

import {
  ModalBlock,
  ModalColor,
  ModalType,
  ModalVariant,
} from "@/components/custom/blocks/ModalBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { VariantTabs } from "@/components/site/VariantTabs";
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const MODAL_ENGINE_CODE_TS = `"use client";

import React, { useEffect, useState, useRef, createContext, useContext } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { X, AlertCircle, CheckCircle2, Info } from "lucide-react";

export type ModalColor = "indigo" | "rose" | "emerald" | "zinc" | (string & {});
export type ModalVariant = "default" | "glass" | "minimal" | "bordered";
export type ModalType = "standard" | "form" | "fullscreen" | "confirmation";

const colorThemes: Record<string, Record<string, string>> = {
  primary: { bg: "bg-primary hover:bg-primary/90 text-primary-foreground", text: "text-primary", border: "border-primary", bgSoft: "bg-primary/10", ring: "focus:ring-primary" },
  indigo: { bg: "bg-indigo-600 hover:bg-indigo-700 text-white", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-600", bgSoft: "bg-indigo-50 dark:bg-indigo-500/10", ring: "focus:ring-indigo-600" },
  rose: { bg: "bg-rose-600 hover:bg-rose-700 text-white", text: "text-rose-600 dark:text-rose-400", border: "border-rose-600", bgSoft: "bg-rose-50 dark:bg-rose-500/10", ring: "focus:ring-rose-600" },
  emerald: { bg: "bg-emerald-600 hover:bg-emerald-700 text-white", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-600", bgSoft: "bg-emerald-50 dark:bg-emerald-500/10", ring: "focus:ring-emerald-600" },
  zinc: { bg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 text-white", text: "text-zinc-900 dark:text-zinc-100", border: "border-zinc-900 dark:border-zinc-100", bgSoft: "bg-zinc-100 dark:bg-zinc-800/50", ring: "focus:ring-zinc-900 dark:focus:ring-zinc-100" },
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
      theme: {
        bg: "bg-[var(--theme-color)] text-white hover:opacity-90",
        text: "text-[var(--theme-color)]",
        border: "border-[var(--theme-color)]",
        bgSoft: "bg-[rgba(var(--theme-color-rgb),0.1)]",
        ring: "focus:ring-[var(--theme-color)]",
      },
      style: { "--theme-color": color, "--theme-color-rgb": rgb } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};

interface ModalContextType { open: boolean; onOpenChange: (open: boolean) => void; type: ModalType; }
const ModalContext = createContext<ModalContextType | null>(null);

const ModalRoot = ({ open, onOpenChange, type, children }: { open: boolean; onOpenChange: (v: boolean) => void; type: ModalType; children: React.ReactNode; }) => {
  const [mounted, setMounted] = useState(false);
  const [renderLayer, setRenderLayer] = useState(open);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (open) setRenderLayer(true);
    else { const timer = setTimeout(() => setRenderLayer(false), 300); return () => clearTimeout(timer); }
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onOpenChange(false); };
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onOpenChange]);

  if (!mounted || !renderLayer) return null;
  return (
    <ModalContext.Provider value={{ open, onOpenChange, type }}>
      <div className="absolute inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        {children}
      </div>
    </ModalContext.Provider>
  );
};

const ModalOverlay = () => {
  const { open, onOpenChange } = useContext(ModalContext)!;
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    else gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" });
  }, [open]);

  return <div ref={overlayRef} onClick={() => onOpenChange(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" />;
};

const ModalContent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const { open, type } = useContext(ModalContext)!;
  const contentRef = useRef<HTMLDivElement>(null);

  const typeClasses = {
    standard: "max-w-md w-full",
    form: "max-w-lg w-full",
    fullscreen: "max-w-5xl w-full h-[90vh] flex flex-col",
    confirmation: "max-w-sm w-full",
  };

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (open) gsap.fromTo(el, { opacity: 0, scale: 0.95, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" });
    else gsap.to(el, { opacity: 0, scale: 0.95, y: 10, duration: 0.3, ease: "power2.in" });
  }, [open]);

  return (
    <div ref={contentRef} className={cn("relative z-10 pointer-events-auto overflow-hidden", typeClasses[type], className)}>
      {children}
    </div>
  );
};

export function ModalBlock({ type = "standard", variant = "default", color = "indigo" }: { type?: ModalType; variant?: ModalVariant; color?: ModalColor; }) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, style } = getThemeStyles(color as string);

  const variantStyles = {
    default: "bg-white dark:bg-zinc-950 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800",
    glass: "bg-white/60 dark:bg-black/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-white/10",
    minimal: "bg-white dark:bg-zinc-900 rounded-xl shadow-lg border-none",
    bordered: "bg-white dark:bg-zinc-950 border-2 rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.05)]",
  };

  const containerClass = cn(variantStyles[variant], variant === "bordered" ? "border-zinc-900 dark:border-zinc-100" : "");

  return (
    <div className="w-full flex items-center justify-center" style={style}>
      <button onClick={() => setIsOpen(true)} className={cn("px-6 py-3 rounded-lg font-bold transition-transform active:scale-95 shadow-md", theme.bg)}>
        Open {type.charAt(0).toUpperCase() + type.slice(1)} Modal
      </button>

      <ModalRoot open={isOpen} onOpenChange={setIsOpen} type={type}>
        <ModalOverlay />
        <ModalContent className={containerClass}>
          
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800/50">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Modal Title</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 -mr-2 bg-zinc-100 dark:bg-zinc-900 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto text-zinc-600 dark:text-zinc-400">
               This is the internal content of the modal.
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-zinc-100 dark:border-zinc-800/50">
              <button onClick={() => setIsOpen(false)} className="px-4 py-2 rounded-lg font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                Cancel
              </button>
              <button onClick={() => setIsOpen(false)} className={cn("px-4 py-2 rounded-lg font-bold transition-transform active:scale-95 shadow-sm", theme.bg)}>
                Confirm Action
              </button>
            </div>
          </div>

        </ModalContent>
      </ModalRoot>
    </div>
  );
}`;

// --- JAVASCRIPT ENGINE CODE ---
const MODAL_ENGINE_CODE_JS = `"use client";

import React, { useEffect, useState, useRef, createContext, useContext } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { X, AlertCircle, CheckCircle2, Info } from "lucide-react";

const colorThemes = {
  indigo: { bg: "bg-indigo-600 hover:bg-indigo-700 text-white", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-600", bgSoft: "bg-indigo-50 dark:bg-indigo-500/10", ring: "focus:ring-indigo-600" },
  rose: { bg: "bg-rose-600 hover:bg-rose-700 text-white", text: "text-rose-600 dark:text-rose-400", border: "border-rose-600", bgSoft: "bg-rose-50 dark:bg-rose-500/10", ring: "focus:ring-rose-600" },
  emerald: { bg: "bg-emerald-600 hover:bg-emerald-700 text-white", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-600", bgSoft: "bg-emerald-50 dark:bg-emerald-500/10", ring: "focus:ring-emerald-600" },
  zinc: { bg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 text-white", text: "text-zinc-900 dark:text-zinc-100", border: "border-zinc-900 dark:border-zinc-100", bgSoft: "bg-zinc-100 dark:bg-zinc-800/50", ring: "focus:ring-zinc-900 dark:focus:ring-zinc-100" },
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
      theme: {
        bg: "bg-[var(--theme-color)] text-white hover:opacity-90",
        text: "text-[var(--theme-color)]",
        border: "border-[var(--theme-color)]",
        bgSoft: "bg-[rgba(var(--theme-color-rgb),0.1)]",
        ring: "focus:ring-[var(--theme-color)]",
      },
      style: { "--theme-color": color, "--theme-color-rgb": rgb },
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

const ModalContext = createContext(null);

const ModalRoot = ({ open, onOpenChange, type, children }) => {
  const [mounted, setMounted] = useState(false);
  const [renderLayer, setRenderLayer] = useState(open);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (open) setRenderLayer(true);
    else { const timer = setTimeout(() => setRenderLayer(false), 300); return () => clearTimeout(timer); }
  }, [open]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onOpenChange(false); };
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onOpenChange]);

  if (!mounted || !renderLayer) return null;
  return (
    <ModalContext.Provider value={{ open, onOpenChange, type }}>
      <div className="absolute inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        {children}
      </div>
    </ModalContext.Provider>
  );
};

const ModalOverlay = () => {
  const { open, onOpenChange } = useContext(ModalContext);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (open) gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    else gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" });
  }, [open]);

  return <div ref={overlayRef} onClick={() => onOpenChange(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" />;
};

const ModalContent = ({ children, className }) => {
  const { open, type } = useContext(ModalContext);
  const contentRef = useRef(null);

  const typeClasses = {
    standard: "max-w-md w-full",
    form: "max-w-lg w-full",
    fullscreen: "max-w-5xl w-full h-[90vh] flex flex-col",
    confirmation: "max-w-sm w-full",
  };

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (open) gsap.fromTo(el, { opacity: 0, scale: 0.95, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" });
    else gsap.to(el, { opacity: 0, scale: 0.95, y: 10, duration: 0.3, ease: "power2.in" });
  }, [open]);

  return (
    <div ref={contentRef} className={cn("relative z-10 pointer-events-auto overflow-hidden", typeClasses[type], className)}>
      {children}
    </div>
  );
};

export function ModalBlock({ type = "standard", variant = "default", color = "indigo" }) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, style } = getThemeStyles(color);

  const variantStyles = {
    default: "bg-white dark:bg-zinc-950 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800",
    glass: "bg-white/60 dark:bg-black/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-white/10",
    minimal: "bg-white dark:bg-zinc-900 rounded-xl shadow-lg border-none",
    bordered: "bg-white dark:bg-zinc-950 border-2 rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.05)]",
  };

  const containerClass = cn(variantStyles[variant], variant === "bordered" ? "border-zinc-900 dark:border-zinc-100" : "");

  return (
    <div className="w-full flex items-center justify-center" style={style}>
      <button onClick={() => setIsOpen(true)} className={cn("px-6 py-3 rounded-lg font-bold transition-transform active:scale-95 shadow-md", theme.bg)}>
        Open {type.charAt(0).toUpperCase() + type.slice(1)} Modal
      </button>

      <ModalRoot open={isOpen} onOpenChange={setIsOpen} type={type}>
        <ModalOverlay />
        <ModalContent className={containerClass}>
          
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800/50">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Modal Title</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 -mr-2 bg-zinc-100 dark:bg-zinc-900 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto text-zinc-600 dark:text-zinc-400">
               This is the internal content of the modal.
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-zinc-100 dark:border-zinc-800/50">
              <button onClick={() => setIsOpen(false)} className="px-4 py-2 rounded-lg font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                Cancel
              </button>
              <button onClick={() => setIsOpen(false)} className={cn("px-4 py-2 rounded-lg font-bold transition-transform active:scale-95 shadow-sm", theme.bg)}>
                Confirm Action
              </button>
            </div>
          </div>

        </ModalContent>
      </ModalRoot>
    </div>
  );
}`;

export function ModalShowcase() {
  const [type, setType] = useState<ModalType>("standard");
  const [variant, setVariant] = useState<ModalVariant>("default");

  const [color, setColor] = useState<ModalColor | string>("primary");

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  const generateUsageCode = (isTs: boolean) => {
    const colorPropStr = color && color !== "primary" && color !== "default" ? `\n        color="${color}"` : "";
    return `import { ModalBlock } from "@/components/custom/blocks/ModalBlock";

export default function Page() {
  return (
    <div className="relative overflow-hidden w-full h-screen">
      <ModalBlock 
        type="${type}" 
        variant="${variant}"${colorPropStr} 
      />
    </div>
  );
};`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col gap-6 p-5 rounded-xl">
        <VariantTabs
          variants={["standard", "form", "fullscreen", "confirmation"]}
          label="Modal Type"
          defaultValue={type}
          onValueChange={(v) => setType(v as ModalType)}
        />

        <div className="flex flex-col xl:flex-row gap-6">
          <VariantTabs
            variants={["default", "glass", "minimal", "bordered"]}
            label="Structural Variant"
            defaultValue={variant}
            onValueChange={(v) => setVariant(v as ModalVariant)}
          />

          <ThemeColorPicker color={color} onChange={handleColorChange} label="Theme Color" />
        </div>
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="ModalBlock"
        tsCode={MODAL_ENGINE_CODE_TS}
        jsCode={MODAL_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        {/* CRITICAL: relative and overflow-hidden trap the absolute modal inside the preview box */}
        <div
          className={`relative overflow-hidden w-full flex items-center justify-center min-h-[550px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 ${variant === "glass" ? "p-4 sm:p-8 bg-gradient-to-br from-indigo-500/50 via-purple-500/50 to-pink-500/50" : "bg-zinc-50/50 dark:bg-[#0a0a0a]"}`}
        >
          <ModalBlock
            key={`${type}-${variant}-${color}`}
            type={type}
            variant={variant}
            color={color}
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
