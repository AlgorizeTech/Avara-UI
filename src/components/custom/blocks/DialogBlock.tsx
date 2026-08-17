"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

// ==========================================
// 1. CONTEXT
// ==========================================
interface DialogContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context)
    throw new Error("Dialog components must be used within a <Dialog> root.");
  return context;
}

// ==========================================
// 2. ROOT COMPONENT
// ==========================================
export interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Dialog({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: DialogProps) {
  const isControlled = controlledOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = (newOpen: boolean | ((prev: boolean) => boolean)) => {
    const nextState = typeof newOpen === "function" ? newOpen(open) : newOpen;
    if (!isControlled) setUncontrolledOpen(nextState);
    onOpenChange?.(nextState);
  };

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

// ==========================================
// 3. TRIGGER
// ==========================================
export interface DialogTriggerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean; // Note: For a real asChild implementation, you'd use Radix Slot. Here we use a generic wrapper.
}

export function DialogTrigger({
  children,
  className,
  ...props
}: DialogTriggerProps) {
  const { setOpen } = useDialog();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setOpen(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen(true);
        }
      }}
      className={cn("inline-block", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// ==========================================
// 3b. CLOSE BUTTON
// ==========================================
export type DialogCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function DialogClose({
  children,
  className,
  onClick,
  ...props
}: DialogCloseProps) {
  const { setOpen } = useDialog();

  return (
    <button
      type="button"
      onClick={(e) => {
        onClick?.(e);
        setOpen(false);
      }}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}

// ==========================================
// 4. CONTENT (Portal Renderer with Scroll Lock)
// ==========================================
export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  hideCloseButton?: boolean;
}

export function DialogContent({
  className,
  children,
  hideCloseButton = false,
  ...props
}: DialogContentProps) {
  const { open, setOpen } = useDialog();
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLSpanElement>(null);

  // SSR Safety
  useEffect(() => setMounted(true), []);

  // Handle Escape Key & Body Scroll Lock
  useEffect(() => {
    if (!open) return;

    // Resolve the document/window the dialog actually lives in (supports iframe rendering).
    const doc = anchorRef.current?.ownerDocument ?? document;
    const win = doc.defaultView ?? window;

    // Lock body scroll
    const originalStyle = win.getComputedStyle(doc.body).overflow;
    doc.body.style.overflow = "hidden";

    // Escape listener
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    doc.addEventListener("keydown", handleEscape);

    return () => {
      doc.body.style.overflow = originalStyle;
      doc.removeEventListener("keydown", handleEscape);
    };
  }, [open, setOpen]);

  if (!mounted || !open) return <span ref={anchorRef} hidden />;

  // Portal into the anchor's own document (supports iframe rendering).
  const portalTarget = anchorRef.current?.ownerDocument.body ?? document.body;

  return (
    <>
      <span ref={anchorRef} hidden />
      {createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Dialog Window */}
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative z-50 w-full max-w-lg grid gap-4 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] text-zinc-950 dark:text-zinc-50 p-6 shadow-lg rounded-xl max-h-[85vh] overflow-y-auto",
          "animate-in fade-in zoom-in-95 slide-in-from-top-[5%] duration-200",
          className,
        )}
        {...props}
      >
        {children}

        {!hideCloseButton && (
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-zinc-100 data-[state=open]:text-zinc-500 dark:ring-offset-zinc-950 dark:focus:ring-zinc-300 dark:data-[state=open]:bg-zinc-800 dark:data-[state=open]:text-zinc-400"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>
    </div>,
    portalTarget,
      )}
    </>
  );
}

// ==========================================
// 5. LAYOUT SUB-COMPONENTS
// ==========================================
export function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className,
      )}
      {...props}
    />
  );
}

export function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-2",
        className,
      )}
      {...props}
    />
  );
}

export function DialogTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)}
      {...props}
    />
  );
}
