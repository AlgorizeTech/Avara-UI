"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DialogContext, useDialog } from "./dialog-context";

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

  // What `setOpen` reads when it fires, refreshed after every commit so the
  // setter itself never has to be rebuilt. Identity matters here: DialogContent
  // registers on the open-dialog stack in an effect keyed by this function, and
  // a setter that changed on every render would re-register a dialog that is
  // merely re-rendering — handing an outer dialog the topmost slot while a
  // nested one is still on screen, so Escape would dismiss the wrong window.
  const latest = useRef({ open, isControlled, onOpenChange });
  useEffect(() => {
    latest.current = { open, isControlled, onOpenChange };
  });

  const setOpen = useCallback(
    (newOpen: boolean | ((prev: boolean) => boolean)) => {
      const current = latest.current;
      const nextState =
        typeof newOpen === "function" ? newOpen(current.open) : newOpen;
      if (!current.isControlled) setUncontrolledOpen(nextState);
      current.onOpenChange?.(nextState);
    },
    [],
  );

  const value = useMemo(() => ({ open, setOpen }), [open, setOpen]);

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
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

/**
 * The panel width scale, from a compact confirm up to a full-page surface.
 *
 * `full` also drops the rounding, border and viewport-height cap that the
 * inset sizes rely on, so the panel really does fill the screen rather than
 * sitting as a very wide card inside it. Its rows are centred in that screen
 * (`content-center` overrides the panel's `content-start`) and kept to the
 * `md` column width, so the content reads as a dialog floating in the middle
 * of the page rather than a strip pinned to the top-left. Pass `className`
 * (it merges after the size) to lay the surface out edge to edge instead.
 */
const DIALOG_SIZES = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-none h-full max-h-none rounded-none border-0 content-center justify-center grid-cols-[minmax(0,32rem)]",
} as const;

export type DialogSize = keyof typeof DIALOG_SIZES;

/**
 * Every dialog currently on screen, outermost first.
 *
 * Escape is listened for on the document, so a dialog opened from inside
 * another one would otherwise dismiss both on a single press — each open
 * content has its own live listener. Only the entry on top of this stack
 * reacts, and its position also decides which panel paints above the rest.
 */
const openDialogs: symbol[] = [];

export interface DialogContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  hideCloseButton?: boolean;
  /** Panel width — `full` fills the viewport edge to edge. Defaults to `md`. */
  size?: DialogSize;
}

export function DialogContent({
  className,
  children,
  hideCloseButton = false,
  size = "md",
  ...props
}: DialogContentProps) {
  const { open, setOpen } = useDialog();
  const contentRef = useRef<HTMLDivElement>(null);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  // Identity for this dialog on the stack above. A symbol rather than a count
  // so a dialog can be removed by value, wherever it sits when it closes.
  const idRef = useRef<symbol | null>(null);
  if (idRef.current === null) idRef.current = Symbol("dialog");
  const [depth, setDepth] = useState(0);

  // Resolves the document this dialog actually lives in, which is not always
  // the global one — previews portal components into an iframe. Resolving in a
  // callback ref rather than reading a ref during render keeps render pure, and
  // a null target doubles as the "not mounted yet" signal that guards SSR.
  const setAnchor = useCallback((node: HTMLSpanElement | null) => {
    setPortalTarget(node ? node.ownerDocument.body : null);
  }, []);

  // Handle Escape Key & Body Scroll Lock
  useEffect(() => {
    if (!open) return;

    // Resolve the document/window the dialog actually lives in (supports iframe rendering).
    const doc = contentRef.current?.ownerDocument ?? document;
    const win = doc.defaultView ?? window;

    // Claim a slot on the stack. Whatever opens last is what the user is
    // looking at, so it takes both the Escape key and the highest layer.
    const id = idRef.current as symbol;
    openDialogs.push(id);
    // Depth comes from a module-level stack of open dialogs, which only exists once this one has mounted and claimed a slot.
    setDepth(openDialogs.length - 1);

    // Lock body scroll. A nested dialog reads the lock the outer one already
    // applied as its "original", so unwinding in either order is safe.
    const originalStyle = win.getComputedStyle(doc.body).overflow;
    doc.body.style.overflow = "hidden";

    // Escape listener — ignored unless this is the topmost dialog.
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (openDialogs[openDialogs.length - 1] !== id) return;
      setOpen(false);
    };
    doc.addEventListener("keydown", handleEscape);

    return () => {
      const index = openDialogs.indexOf(id);
      if (index !== -1) openDialogs.splice(index, 1);
      doc.body.style.overflow = originalStyle;
      doc.removeEventListener("keydown", handleEscape);
    };
  }, [open, setOpen, portalTarget]);

  if (!portalTarget || !open) return <span ref={setAnchor} hidden />;

  return (
    <>
      <span ref={setAnchor} hidden />
      {createPortal(
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        // A full-page panel has no room for the inset gutter the others sit in.
        size === "full" ? "p-0" : "p-4 sm:p-6",
      )}
      // Stack position, not a fixed layer: a dialog opened from inside another
      // one has to paint above its parent's backdrop.
      style={{ zIndex: 50 + depth * 10 }}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Dialog Window */}
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        className={cn(
          // `content-start` is what keeps the rows at their natural height.
          // The panel is a grid, so the moment it has a determinate height —
          // `size="full"`, or a height passed through className — the default
          // `align-content: stretch` inflates every auto row to fill it, and a
          // footer button stretches along with the row holding it.
          // `grid-cols-1` is minmax(0, 1fr): an implicit auto column grows to
          // its widest nowrap child, so a `truncate`d line — a long customer
          // or file name — pushed the panel wide and scrolled it sideways
          // instead of ending in an ellipsis.
          "relative z-50 w-full grid grid-cols-1 content-start gap-4 border border-border bg-card text-card-foreground p-6 shadow-lg rounded-xl max-h-[85vh] overflow-y-auto",
          DIALOG_SIZES[size],
          "animate-in fade-in zoom-in-95 slide-in-from-top-[5%] duration-200",
          className,
        )}
        {...props}
      >
        {children}

        {!hideCloseButton && (
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-card transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-muted data-[state=open]:text-muted-foreground"
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
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
