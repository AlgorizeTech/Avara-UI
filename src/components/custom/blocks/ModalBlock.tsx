"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
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

const ModalLabelContext = createContext<string | null>(null);

export type ModalProps = {
  /** Controlled open state — the modal renders against it, it never owns it. */
  isOpen: boolean;
  /** Called after the close transition, on the X, Escape and backdrop clicks. */
  onClose: () => void;
  children?: React.ReactNode;
  /** Classes for the panel. This is where you size and restyle the modal. */
  contentClassName?: string;
  /** Classes for the backdrop, e.g. a heavier blur behind a glass panel. */
  overlayClassName?: string;
  /** Renders the close button as a tinted primary chip instead of a bare icon. */
  primaryCloseButton?: boolean;
  /** Drops the built-in X, for flows where a choice has to be made explicitly. */
  hideCloseButton?: boolean;
  /**
   * Labels the dialog directly. Use it whenever the title is not inside
   * `ModalHeader` — otherwise the panel points `aria-labelledby` at the header.
   */
  ariaLabel?: string;
};

export function Modal({
  isOpen,
  onClose,
  children,
  contentClassName,
  overlayClassName,
  primaryCloseButton = false,
  hideCloseButton = false,
  ariaLabel,
}: ModalProps) {
  const [renderLayer, setRenderLayer] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const isClosingRef = useRef(false);
  const labelId = useId();

  // Resolves the document this modal actually lives in (supports iframe rendering in sandbox preview).
  const setAnchor = useCallback((node: HTMLSpanElement | null) => {
    setPortalTarget(node ? node.ownerDocument.body : null);
  }, []);

  // Sync renderLayer and animation state with isOpen
  useEffect(() => {
    if (isOpen) {
      isClosingRef.current = false;
      setRenderLayer(true);
      // Ensure element is in DOM before starting fade-in transition
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 20);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      // Wait for exit transition (300ms) before unmounting
      const timer = setTimeout(() => {
        setRenderLayer(false);
      }, 300);
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

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;
    const doc = portalTarget?.ownerDocument ?? document;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    doc.addEventListener("keydown", handleKeyDown);
    return () => doc.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose, portalTarget]);

  // Handle body scroll locking
  useEffect(() => {
    if (!isOpen || !portalTarget) return;
    const doc = portalTarget.ownerDocument;
    const win = doc.defaultView ?? window;
    const originalOverflow = win.getComputedStyle(doc.body).overflow;
    doc.body.style.overflow = "hidden";
    return () => {
      doc.body.style.overflow = originalOverflow;
    };
  }, [isOpen, portalTarget]);

  if (!portalTarget || !renderLayer) {
    return <span ref={setAnchor} hidden aria-hidden="true" />;
  }

  const ariaProps = ariaLabel
    ? { "aria-label": ariaLabel }
    : { "aria-labelledby": labelId };

  const overlay = (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ease-in-out backdrop-blur-[3px]",
        isVisible ? "bg-black/50 opacity-100" : "bg-black/0 opacity-0 pointer-events-none",
        overlayClassName,
      )}
      onClick={handleClose}
      role="presentation"
    >
      <div
        className={cn(
          "relative flex max-h-full w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-background shadow-xl transition-all duration-300 ease-in-out",
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-8 scale-95",
          contentClassName,
        )}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        {...ariaProps}
      >
        {!hideCloseButton &&
          (primaryCloseButton ? (
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
          ))}
        <ModalLabelContext.Provider value={labelId}>
          {/* min-h-0 lets this shrink below its content so the body can
              scroll; flex-1 fills a panel given a fixed height. */}
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        </ModalLabelContext.Provider>
      </div>
    </div>
  );

  return (
    <>
      <span ref={setAnchor} hidden aria-hidden="true" />
      {createPortal(overlay, portalTarget)}
    </>
  );
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
        // shrink-0: in the panel's flex column the explicit min-h would
        // otherwise let a tall body squeeze a two-line header down to 56px.
        "shrink-0 px-6 py-4 text-lg font-semibold border-b border-border/50 flex items-center justify-between min-h-[56px]",
        className,
      )}
    >
      <div className="flex-1 flex items-center gap-3">
        {title && typeof title === "string" ? (
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        ) : (
          title
        )}
        {children}
      </div>
    </div>
  );
}

export function ModalFooter({ className, children }: ModalSectionProps) {
  return (
    <div className={cn("flex shrink-0 justify-end gap-2 p-4", className)}>
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
