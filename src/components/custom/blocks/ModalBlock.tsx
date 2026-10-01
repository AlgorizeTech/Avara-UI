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
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

const ModalLabelContext = createContext<string | null>(null);

/** False on the server and during hydration, true once the client has taken over. */
const subscribeToNothing = () => () => {};
const useIsMounted = () =>
  useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

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
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const isClosingRef = useRef(false);
  const labelId = useId();
  // Nothing renders on the server or during hydration, so an initially open
  // modal still mounts on the client and then animates in.
  const mounted = useIsMounted();

  // Opening mounts the panel (hidden); closing starts the exit transition.
  // Adjusted while rendering, when `isOpen` changes, rather than in an effect.
  const [prevIsOpen, setPrevIsOpen] = useState(false);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) setShouldRender(true);
    else setIsVisible(false);
  }

  useEffect(() => {
    if (isOpen) {
      isClosingRef.current = false;
      // Mount first, then animate: the element has to be in the DOM before
      // the transition can run.
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
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

  const showPanel = shouldRender && mounted;
  useEffect(() => {
    if (!showPanel) return;
    lockBodyScroll();
    return () => unlockBodyScroll();
  }, [showPanel]);

  if (!showPanel) return null;

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
          // A flex column capped at the overlay's height: the panel sizes to
          // its content, and once that's taller than the screen the body —
          // the only overflow-auto section — shrinks and scrolls while the
          // header and footer stay in view.
          "relative flex max-h-full w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-background shadow-xl transition-all duration-300 ease-in-out",
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
