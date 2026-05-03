"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { AlertCircle, Info, X } from "lucide-react";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// ==========================================
// DYNAMIC THEME ENGINE & TYPES
// ==========================================
export type ModalColor = "indigo" | "rose" | "emerald" | "zinc" | string;
export type ModalVariant = "default" | "glass" | "minimal" | "bordered";
export type ModalType = "standard" | "form" | "fullscreen" | "confirmation";

const colorThemes: Record<string, Record<string, string>> = {
  indigo: {
    bg: "bg-indigo-600 hover:bg-indigo-700 text-white",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-600",
    bgSoft: "bg-indigo-50 dark:bg-indigo-500/10",
    ring: "focus:ring-indigo-600",
  },
  rose: {
    bg: "bg-rose-600 hover:bg-rose-700 text-white",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-600",
    bgSoft: "bg-rose-50 dark:bg-rose-500/10",
    ring: "focus:ring-rose-600",
  },
  emerald: {
    bg: "bg-emerald-600 hover:bg-emerald-700 text-white",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-600",
    bgSoft: "bg-emerald-50 dark:bg-emerald-500/10",
    ring: "focus:ring-emerald-600",
  },
  zinc: {
    bg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 text-white",
    text: "text-zinc-900 dark:text-zinc-100",
    border: "border-zinc-900 dark:border-zinc-100",
    bgSoft: "bg-zinc-100 dark:bg-zinc-800/50",
    ring: "focus:ring-zinc-900 dark:focus:ring-zinc-100",
  },
};

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3)
    cleanHex = cleanHex
      .split("")
      .map((x) => x + x)
      .join("");
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "99, 102, 241";
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
      style: {
        "--theme-color": color,
        "--theme-color-rgb": rgb,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

// ==========================================
// GSAP MODAL PRIMITIVE
// ==========================================
interface ModalContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: ModalType;
}
const ModalContext = createContext<ModalContextType | null>(null);

const ModalRoot = ({
  open,
  onOpenChange,
  type,
  children,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  type: ModalType;
  children: React.ReactNode;
}) => {
  const [mounted, setMounted] = useState(false);
  const [renderLayer, setRenderLayer] = useState(open);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (open) setRenderLayer(true);
    else {
      const timer = setTimeout(() => setRenderLayer(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
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
    if (open)
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );
    else
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
  }, [open]);

  return (
    <div
      ref={overlayRef}
      onClick={() => onOpenChange(false)}
      className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
    />
  );
};

const ModalContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
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
    if (open)
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.95, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" },
      );
    else
      gsap.to(el, {
        opacity: 0,
        scale: 0.95,
        y: 10,
        duration: 0.3,
        ease: "power2.in",
      });
  }, [open]);

  return (
    <div
      ref={contentRef}
      className={cn(
        "relative z-10 pointer-events-auto overflow-hidden",
        typeClasses[type],
        className,
      )}
    >
      {children}
    </div>
  );
};

// ==========================================
// MAIN COMPONENT BLOCK
// ==========================================
export function ModalBlock({
  type = "standard",
  variant = "default",
  color = "indigo",
}: {
  type?: ModalType;
  variant?: ModalVariant;
  color?: ModalColor;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, style } = getThemeStyles(color);

  const variantStyles = {
    default:
      "bg-white dark:bg-zinc-950 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800",
    glass:
      "bg-white/60 dark:bg-black/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-white/10",
    minimal: "bg-white dark:bg-zinc-900 rounded-xl shadow-lg border-none",
    bordered:
      "bg-white dark:bg-zinc-950 border-2 rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.05)]",
  };

  const containerClass = cn(
    variantStyles[variant],
    variant === "bordered" ? "border-zinc-900 dark:border-zinc-100" : "",
  );

  return (
    <div className="w-full flex items-center justify-center" style={style}>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "px-6 py-3 rounded-lg font-bold transition-transform active:scale-95 shadow-md",
          theme.bg,
        )}
      >
        Open {type.charAt(0).toUpperCase() + type.slice(1)} Modal
      </button>

      <ModalRoot open={isOpen} onOpenChange={setIsOpen} type={type}>
        <ModalOverlay />
        <ModalContent className={containerClass}>
          {/* --- STANDARD MODAL --- */}
          {type === "standard" && (
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-start mb-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-4",
                    theme.bgSoft,
                  )}
                >
                  <Info className={cn("w-6 h-6", theme.text)} />
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                System Update Available
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
                A new software update is ready to be installed. This update
                includes new features, performance improvements, and critical
                security patches.
              </p>
              <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2.5 rounded-lg font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  Remind Me Later
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-5 py-2.5 rounded-lg font-bold shadow-sm transition-opacity",
                    theme.bg,
                  )}
                >
                  Install Now
                </button>
              </div>
            </div>
          )}

          {/* --- FORM MODAL --- */}
          {type === "form" && (
            <div className="flex flex-col h-full">
              <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Invite Team Member
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="colleague@company.com"
                    className={cn(
                      "w-full h-11 px-3 rounded-lg border bg-transparent focus:outline-none focus:ring-2 border-zinc-200 dark:border-zinc-800 transition-shadow",
                      theme.ring,
                    )}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Role & Permissions
                  </label>
                  <select
                    className={cn(
                      "w-full h-11 px-3 rounded-lg border bg-transparent focus:outline-none focus:ring-2 border-zinc-200 dark:border-zinc-800 transition-shadow text-zinc-900 dark:text-zinc-100 appearance-none",
                      theme.ring,
                    )}
                  >
                    <option>Viewer</option>
                    <option>Editor</option>
                    <option>Administrator</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    Personal Message (Optional)
                  </label>
                  <textarea
                    placeholder="Welcome to the team!"
                    rows={3}
                    className={cn(
                      "w-full p-3 rounded-lg border bg-transparent focus:outline-none focus:ring-2 border-zinc-200 dark:border-zinc-800 transition-shadow resize-none",
                      theme.ring,
                    )}
                  />
                </div>
              </div>
              <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/20 flex justify-end gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2.5 rounded-lg font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-5 py-2.5 rounded-lg font-bold shadow-sm transition-opacity",
                    theme.bg,
                  )}
                >
                  Send Invite
                </button>
              </div>
            </div>
          )}

          {/* --- FULLSCREEN SHEET MODAL --- */}
          {type === "fullscreen" && (
            <>
              <div className="px-8 py-6 border-b border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between shrink-0">
                <div>
                  <h2 className="text-2xl font-black text-zinc-900 dark:text-white">
                    Project Configuration
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Manage all global settings for your workspace.
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:rotate-90 transition-all duration-300"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                      General
                    </h3>
                    <div className="h-12 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-lg animate-pulse" />
                    <div className="h-24 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-lg animate-pulse" />
                    <div className="h-12 w-3/4 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg animate-pulse" />
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                      Security
                    </h3>
                    <div className="h-32 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-lg animate-pulse" />
                    <div className="h-12 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-lg animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="px-8 py-6 border-t border-zinc-100 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/50 shrink-0 flex justify-between items-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-bold text-red-500 hover:text-red-600 transition-colors"
                >
                  Delete Project
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-3 rounded-lg font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                  >
                    Discard Changes
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "px-6 py-3 rounded-lg font-bold shadow-md transition-opacity",
                      theme.bg,
                    )}
                  >
                    Save Configuration
                  </button>
                </div>
              </div>
            </>
          )}

          {/* --- CONFIRMATION MODAL --- */}
          {type === "confirmation" && (
            <div className="p-6 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                Delete permanently?
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8">
                Are you sure you want to delete this item? This action cannot be
                undone and all data will be lost.
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-2.5 rounded-lg font-medium text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-2.5 rounded-lg font-bold bg-red-600 hover:bg-red-700 text-white shadow-sm transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </ModalContent>
      </ModalRoot>
    </div>
  );
}
