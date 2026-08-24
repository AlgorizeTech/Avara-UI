"use client";

import { cn } from "@/lib/utils";
import { AlertCircle, X } from "lucide-react";
import type * as React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { SelectBlock } from "./SelectBlock";

const ModalLabelContext = createContext<string | null>(null);

let scrollLockCount = 0;
let originalBodyOverflow = "";
let originalBodyPaddingRight = "";

function lockBodyScroll() {
  if (typeof document === "undefined") return;
  if (scrollLockCount === 0) {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    originalBodyOverflow = document.body.style.overflow;
    originalBodyPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }
  scrollLockCount += 1;
}

function unlockBodyScroll() {
  if (typeof document === "undefined") return;
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) {
    document.body.style.overflow = originalBodyOverflow;
    document.body.style.paddingRight = originalBodyPaddingRight;
  }
}

export type ModalColor = "indigo" | "rose" | "emerald" | "zinc" | string;
export type ModalVariant = "default" | "glass" | "minimal" | "bordered";
export type ModalType = "standard" | "form" | "fullscreen" | "confirmation";

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    bg: "bg-primary hover:bg-primary/90 text-primary-foreground",
    text: "text-primary",
    border: "border-primary",
    bgSoft: "bg-primary/10",
    ring: "focus:ring-primary",
  },
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
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  contentClassName?: string;
  overlayClassName?: string;
  primaryCloseButton?: boolean;
  ariaLabel?: string;
};

export function Modal({
  isOpen,
  onClose,
  children,
  contentClassName,
  overlayClassName,
  primaryCloseButton = false,
  ariaLabel,
}: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const isClosingRef = useRef(false);
  const labelId = useId();

  useEffect(() => {
    if (isOpen) {
      isClosingRef.current = false;
      setShouldRender(true);
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  useEffect(() => {
    if (!shouldRender) return;
    lockBodyScroll();
    return () => unlockBodyScroll();
  }, [shouldRender]);

  if (!shouldRender) return null;

  const ariaProps = ariaLabel
    ? { "aria-label": ariaLabel }
    : { "aria-labelledby": labelId };

  const overlay = (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ease-in-out backdrop-blur-[3px]",
        isVisible ? "bg-black/50 opacity-100" : "bg-black/0 opacity-0",
        overlayClassName,
      )}
      onClick={handleClose}
      role="presentation"
    >
      <div
        className={cn(
          "relative w-full max-w-lg overflow-hidden rounded-2xl bg-background shadow-xl transition-all duration-300 ease-in-out",
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-12 scale-95",
          contentClassName,
        )}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        {...ariaProps}
      >
        {primaryCloseButton ? (
          <button
            onClick={handleClose}
            data-modal-close
            type="button"
            aria-label="Close"
            className="bg-primary/10 p-1.5 rounded-md text-primary absolute top-4 right-4 cursor-pointer hover:bg-primary/20 transition-colors duration-200 z-10"
          >
            <X className="h-5 w-5 ml-[1px]" />
          </button>
        ) : (
          <button
            onClick={handleClose}
            data-modal-close
            type="button"
            aria-label="Close"
            className="text-muted-foreground hover:text-foreground absolute top-4 right-4 cursor-pointer transition-colors duration-200 z-10"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        <ModalLabelContext.Provider value={labelId}>
          <div>{children}</div>
        </ModalLabelContext.Provider>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(overlay, document.body)
    : overlay;
}

export type ModalSectionProps = {
  title?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

export function ModalHeader({
  title,
  className,
  children,
}: ModalSectionProps) {
  const labelId = useContext(ModalLabelContext);
  return (
    <div
      id={labelId || undefined}
      className={cn(
        "px-6 py-4 text-lg font-semibold border-b border-border/50 flex items-center justify-between min-h-[56px]",
        className,
      )}
    >
      <div className="flex-1 flex items-center gap-3">
        {children ?? title}
      </div>
    </div>
  );
}

export function ModalFooter({ className, children }: ModalSectionProps) {
  return (
    <div className={cn("flex justify-end gap-2 p-4", className)}>
      {children}
    </div>
  );
}

export function ModalBody({ className, children }: ModalSectionProps) {
  return (
    <div className={cn("p-4 max-h-[calc(100vh-150px)] overflow-auto", className)}>
      {children}
    </div>
  );
}

// ==========================================
// DEMO BLOCK COMPONENT (Documentation Interactive Showcase)
// ==========================================
export function ModalBlock({
  type = "standard",
  variant = "default",
  color = "primary",
}: {
  type?: ModalType;
  variant?: ModalVariant;
  color?: ModalColor;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [inviteRole, setInviteRole] = useState("Viewer");
  const { theme, style } = getThemeStyles(color);

  const variantContentStyles: Record<ModalVariant, string> = {
    default: "bg-white dark:bg-zinc-950 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800",
    glass: "bg-white/75 dark:bg-zinc-900/80 backdrop-blur-2xl backdrop-saturate-200 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-white/60 dark:border-white/20 text-zinc-950 dark:text-white",
    minimal: "bg-white dark:bg-zinc-900 rounded-xl shadow-lg border-none",
    bordered: "bg-white dark:bg-zinc-950 border-2 rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.05)] border-zinc-900 dark:border-zinc-100",
  };

  const variantOverlayStyles: Record<ModalVariant, string> = {
    default: "",
    glass: "bg-black/50 backdrop-blur-md",
    minimal: "",
    bordered: "",
  };

  const typeWidths: Record<ModalType, string> = {
    standard: "max-w-md",
    form: "max-w-lg",
    fullscreen: "max-w-5xl h-[90vh]",
    confirmation: "max-w-sm",
  };

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

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        overlayClassName={variantOverlayStyles[variant]}
        contentClassName={cn(typeWidths[type], variantContentStyles[variant])}
      >
        {/* --- STANDARD MODAL --- */}
        {type === "standard" && (
          <div className="p-2 sm:p-4">
            <ModalHeader className="border-none p-4 pb-2 flex items-center justify-between">
              <div
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-all border",
                  variant === "glass"
                    ? "bg-white/50 dark:bg-white/10 border-white/40 dark:border-white/20 text-zinc-900 dark:text-white"
                    : cn(theme.bgSoft, theme.text, theme.border),
                )}
              >
                <AlertCircle className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                v2.4.0 Live
              </span>
            </ModalHeader>
            <ModalBody className="p-4 pt-2 space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                System Update Available
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm sm:text-base font-normal">
                A new software update is ready to be installed. This update
                includes new features, performance improvements, and critical
                security patches.
              </p>
            </ModalBody>
            <ModalFooter className="border-none p-4 pt-4 flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors"
              >
                Remind Me Later
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all",
                  theme.bg,
                )}
              >
                Install Now
              </button>
            </ModalFooter>
          </div>
        )}

        {/* --- FORM MODAL --- */}
        {type === "form" && (
          <div>
            <ModalHeader className="border-b border-zinc-200/60 dark:border-zinc-800/60">
              <h2 className="text-lg font-bold text-zinc-950 dark:text-white">
                Invite Team Member
              </h2>
            </ModalHeader>
            <ModalBody className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="colleague@company.com"
                  className={cn(
                    "w-full h-11 px-3 rounded-lg border bg-white/50 dark:bg-black/40 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none focus:ring-2 border-zinc-300 dark:border-zinc-700 transition-shadow",
                    theme.ring,
                  )}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">
                  Role & Permissions
                </label>
                <SelectBlock
                  options={[
                    { label: "Viewer", value: "Viewer" },
                    { label: "Editor", value: "Editor" },
                    { label: "Administrator", value: "Administrator" },
                  ]}
                  value={inviteRole}
                  onChange={setInviteRole}
                  color={color}
                  placeholder="Select a role"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">
                  Personal Message (Optional)
                </label>
                <textarea
                  placeholder="Welcome to the team!"
                  rows={3}
                  className={cn(
                    "w-full p-3 rounded-lg border bg-white/50 dark:bg-black/40 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none focus:ring-2 border-zinc-300 dark:border-zinc-700 transition-shadow resize-none",
                    theme.ring,
                  )}
                />
              </div>
            </ModalBody>
            <ModalFooter className="border-t border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/20">
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
            </ModalFooter>
          </div>
        )}

        {/* --- FULLSCREEN SHEET MODAL --- */}
        {type === "fullscreen" && (
          <div className="flex flex-col h-full">
            <ModalHeader className="border-b border-zinc-100 dark:border-zinc-800/50 pr-12">
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
                  Project Configuration
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 font-normal">
                  Manage all global settings for your workspace.
                </p>
              </div>
            </ModalHeader>
            <ModalBody className="flex-1 max-h-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 p-2">
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
            </ModalBody>
            <ModalFooter className="border-t border-zinc-100 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/50 flex flex-col-reverse sm:flex-row gap-3 sm:justify-between sm:items-center">
              <button
                onClick={() => setIsOpen(false)}
                className="py-2 sm:py-0 text-sm font-bold text-red-500 hover:text-red-600 transition-colors"
              >
                Delete Project
              </button>
              <div className="flex flex-col-reverse sm:flex-row gap-3">
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
            </ModalFooter>
          </div>
        )}

        {/* --- CONFIRMATION MODAL --- */}
        {type === "confirmation" && (
          <ModalBody className="p-6 sm:p-8 text-center flex flex-col items-center">
            <div
              className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center mb-5 border shadow-sm transition-colors",
                variant === "glass"
                  ? "bg-rose-500/20 border-rose-500/30 text-rose-500"
                  : "bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400",
              )}
            >
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
              Delete permanently?
            </h2>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed mb-8">
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
          </ModalBody>
        )}
      </Modal>
    </div>
  );
}
