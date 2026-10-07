"use client";

import { cn } from "@/lib/utils";
import { AlertCircle, Sparkles, X } from "lucide-react";
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

export function LiquidGlassSvgFilter() {
  return (
    <>
      <img
        src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg"
        alt=""
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "-9999px",
          left: "-9999px",
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
        }}
      />
      <svg
        style={{
          position: "fixed",
          top: "-9999px",
          left: "-9999px",
          width: 0,
          height: 0,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <defs>
          <filter
            id="glass-blur"
            x="0"
            y="0"
            width="100%"
            height="100%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.003 0.007"
              numOctaves="1"
              result="turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="200"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}

const ModalLabelContext = createContext<string | null>(null);

export type ModalVariant =
  | "standard"
  | "confirmation"
  | "form"
  | "fullscreen"
  | "glass"
  | "liquid-glass"
  | "custom";

export type ModalProps = {
  /** Controlled open state — the modal renders against it, it never owns it. */
  isOpen: boolean;
  /** Called after the close transition, on the X, Escape and backdrop clicks. */
  onClose: () => void;
  /** Pre-configured design variant. Automatically applies layout, responsive sizing, colors, and button styles. */
  variant?: ModalVariant;
  /** Modal headline or title. */
  title?: React.ReactNode;
  /** Body copy or description text. */
  description?: React.ReactNode;
  /** Status pill or badge in header (e.g. "v2.4.0 Live"). */
  badge?: React.ReactNode;
  /** Custom icon element to replace the default variant icon. */
  icon?: React.ReactNode;
  /** Primary / confirm button label. */
  confirmText?: string;
  /** Secondary / cancel button label. */
  cancelText?: string;
  /** Destructive / delete button label (useful in fullscreen/settings variant). */
  deleteText?: string;
  /** Callback when confirm button is clicked. Defaults to onClose. */
  onConfirm?: () => void;
  /** Callback when cancel button is clicked. Defaults to onClose. */
  onCancel?: () => void;
  /** Callback when delete button is clicked. Defaults to onClose. */
  onDelete?: () => void;
  /** Custom children, form fields, or subcomponent slots. */
  children?: React.ReactNode;
  /** Classes for the panel. Merged with variant defaults. */
  contentClassName?: string;
  /** Classes for the backdrop. Merged with variant defaults. */
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
  variant,
  title,
  description,
  badge,
  icon,
  confirmText,
  cancelText,
  deleteText,
  onConfirm,
  onCancel,
  onDelete,
  children,
  contentClassName,
  overlayClassName,
  primaryCloseButton = false,
  hideCloseButton,
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
    return (
      <>
        <span ref={setAnchor} hidden aria-hidden="true" />
        <LiquidGlassSvgFilter />
      </>
    );
  }

  // Determine active variant
  const activeVariant: ModalVariant =
    variant ??
    (title || description || confirmText || cancelText ? "standard" : "custom");

  // Variant default classes
  const variantContentClass: Record<ModalVariant, string> = {
    standard: "max-w-md bg-background rounded-2xl shadow-xl border border-border",
    confirmation: "max-w-sm bg-background rounded-2xl shadow-xl border border-border",
    form: "max-w-lg bg-background rounded-2xl shadow-xl border border-border",
    fullscreen: "max-w-5xl max-h-[90dvh] bg-background rounded-2xl shadow-xl border border-border",
    glass:
      "max-w-md w-full bg-card/80 backdrop-blur-2xl backdrop-saturate-200 rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-white/60 dark:border-white/15 text-foreground",
    "liquid-glass":
      "max-w-md w-full bg-transparent border-0 shadow-none text-white rounded-[22px] sm:rounded-[28px]",
    custom: "max-w-lg bg-background rounded-2xl shadow-xl border border-border",
  };

  const variantOverlayClass: Record<ModalVariant, string> = {
    standard: "",
    confirmation: "",
    form: "",
    fullscreen: "",
    glass: "bg-black/50 backdrop-blur-md",
    "liquid-glass": "bg-black/30 backdrop-blur-[1px]",
    custom: "",
  };

  const isHideClose =
    hideCloseButton !== undefined
      ? hideCloseButton
      : activeVariant === "confirmation";

  const ariaProps = ariaLabel
    ? { "aria-label": ariaLabel }
    : typeof title === "string"
    ? { "aria-label": title }
    : { "aria-labelledby": labelId };

  // Render variant built-in content
  const renderVariantContent = () => {
    if (activeVariant === "confirmation") {
      return (
        <ModalBody className="p-6 sm:p-8 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 border shadow-sm transition-colors bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400">
            {icon ?? <AlertCircle className="w-8 h-8" />}
          </div>
          {title && (
            <h2 className="text-xl font-semibold text-foreground mb-2">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm text-foreground font-medium leading-relaxed mb-8">
              {description}
            </p>
          )}
          {children}
          <div className="flex gap-3 w-full">
            <button
              type="button"
              onClick={onCancel ?? handleClose}
              className="flex-1 py-2.5 rounded-lg font-medium text-muted-foreground border border-border hover:bg-muted transition-colors cursor-pointer"
            >
              {cancelText ?? "Cancel"}
            </button>
            <button
              type="button"
              onClick={onConfirm ?? handleClose}
              className="flex-1 py-2.5 rounded-lg font-semibold bg-red-600 hover:bg-red-700 text-white shadow-sm transition-colors cursor-pointer"
            >
              {confirmText ?? "Delete"}
            </button>
          </div>
        </ModalBody>
      );
    }

    if (activeVariant === "form") {
      return (
        <>
          {title && (
            <ModalHeader className="border-b border-border/60">
              {typeof title === "string" ? (
                <h2 className="text-lg font-semibold text-foreground">{title}</h2>
              ) : (
                title
              )}
            </ModalHeader>
          )}
          {children && (
            <ModalBody className="space-y-4 sm:space-y-5">{children}</ModalBody>
          )}
          {(confirmText || cancelText) && (
            <ModalFooter className="border-t border-border bg-muted/50">
              {cancelText && (
                <button
                  type="button"
                  onClick={onCancel ?? handleClose}
                  className="px-5 py-2.5 rounded-lg font-medium text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  {cancelText}
                </button>
              )}
              {confirmText && (
                <button
                  type="button"
                  onClick={onConfirm ?? handleClose}
                  className="px-5 py-2.5 rounded-lg font-semibold shadow-sm transition-opacity bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
                >
                  {confirmText}
                </button>
              )}
            </ModalFooter>
          )}
        </>
      );
    }

    if (activeVariant === "fullscreen") {
      return (
        <>
          {(title || description) && (
            <ModalHeader className="border-b border-border pr-12">
              <div className="min-w-0">
                {typeof title === "string" ? (
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    {title}
                  </h2>
                ) : (
                  title
                )}
                {description && (
                  <p className="text-sm text-muted-foreground mt-1 font-normal">
                    {description}
                  </p>
                )}
              </div>
            </ModalHeader>
          )}
          {children && <ModalBody className="max-h-none">{children}</ModalBody>}
          {(confirmText || cancelText || deleteText) && (
            <ModalFooter className="border-t border-border bg-muted flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-6 sm:py-4">
              {deleteText ? (
                <button
                  type="button"
                  onClick={onDelete ?? handleClose}
                  aria-label={deleteText}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-red-500 hover:text-red-600 hover:bg-red-500/10 transition-colors cursor-pointer"
                >
                  {deleteText}
                </button>
              ) : (
                <div />
              )}
              <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
                {cancelText && (
                  <button
                    type="button"
                    onClick={onCancel ?? handleClose}
                    aria-label={cancelText}
                    className="px-3 py-2 sm:px-4 rounded-lg text-sm font-medium text-muted-foreground hover:bg-background hover:text-foreground transition-colors cursor-pointer"
                  >
                    {cancelText}
                  </button>
                )}
                {confirmText && (
                  <button
                    type="button"
                    onClick={onConfirm ?? handleClose}
                    aria-label={confirmText}
                    className="px-4 py-2 sm:px-5 rounded-lg text-sm font-semibold shadow-sm transition-opacity bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
                  >
                    {confirmText}
                  </button>
                )}
              </div>
            </ModalFooter>
          )}
        </>
      );
    }

    if (activeVariant === "glass") {
      return (
        <div className="p-2 sm:p-4">
          {(title || icon || badge) && (
            <ModalHeader
              className="border-none p-4 pb-2 flex items-start justify-between gap-4"
              title={
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-all border bg-white/50 dark:bg-white/10 border-white/40 dark:border-white/20 text-foreground">
                    {icon ?? <AlertCircle className="w-6 h-6" />}
                  </div>
                  <div className="flex flex-col">
                    {typeof title === "string" ? (
                      <h2 className="text-xl font-semibold tracking-tight text-foreground">
                        {title}
                      </h2>
                    ) : (
                      title
                    )}
                    {badge && (
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {badge}
                      </span>
                    )}
                  </div>
                </div>
              }
            />
          )}
          {(description || children) && (
            <ModalBody className="p-4 pt-2 space-y-2">
              {description && (
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base font-normal">
                  {description}
                </p>
              )}
              {children}
            </ModalBody>
          )}
          {(confirmText || cancelText) && (
            <ModalFooter className="border-none p-4 pt-4 flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
              {cancelText && (
                <button
                  type="button"
                  onClick={onCancel ?? handleClose}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  {cancelText}
                </button>
              )}
              {confirmText && (
                <button
                  type="button"
                  onClick={onConfirm ?? handleClose}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-primary/20 active:scale-95 transition-all bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
                >
                  {confirmText}
                </button>
              )}
            </ModalFooter>
          )}
        </div>
      );
    }

    if (activeVariant === "liquid-glass") {
      return (
        <div className="relative overflow-hidden rounded-[22px] sm:rounded-[28px]">
          {/* Layer 0: Liquid SVG Displaced Wave Background */}
          <div
            className="absolute -inset-10 pointer-events-none"
            style={{
              backgroundImage:
                'url("https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "url(#glass-blur)",
              transform: "scale(1.1)",
            }}
          />

          {/* Layer 1: Contrast overlay & soft backdrop blur */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-black/30 dark:bg-black/45 backdrop-blur-[2px]" />

          {/* Layer 2: Ambient Drop Shadow & Subtle Glow */}
          <div
            className="absolute inset-0 z-20 pointer-events-none rounded-[22px] sm:rounded-[28px]"
            style={{
              boxShadow:
                "0 20px 50px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 255, 255, 0.08)",
            }}
          />

          {/* Layer 3: Specular Inner Border Highlight (Light: bright glass bevel, Dark: sleek darkish rim) */}
          <div
            className="absolute inset-0 z-30 pointer-events-none rounded-[22px] sm:rounded-[28px] border border-white/40 dark:border-white/15"
            style={{
              boxShadow:
                "inset 2px 2px 2px 0 rgba(255, 255, 255, 0.45), inset -2px -2px 2px 0 rgba(255, 255, 255, 0.3)",
            }}
          />

          {/* Layer 4: Modal Dialog Content */}
          <div className="relative z-40 p-3.5 sm:p-5">
            {(title || icon || badge) && (
              <ModalHeader
                className="border-none p-2 sm:p-4 pb-2 flex items-start justify-between gap-3 pr-10 sm:pr-12"
                title={
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-all border bg-white/20 border-white/30 dark:bg-white/10 dark:border-white/15 text-white backdrop-blur-md">
                      {icon ?? <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm" />}
                    </div>
                    <div className="flex flex-col min-w-0">
                      {typeof title === "string" ? (
                        <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-white drop-shadow-sm truncate">
                          {title}
                        </h2>
                      ) : (
                        title
                      )}
                      {badge && (
                        <span className="text-[11px] sm:text-xs font-semibold px-2 sm:px-2.5 py-0.5 mt-0.5 rounded-full w-fit bg-white/20 border border-white/30 dark:bg-white/10 dark:border-white/15 text-white backdrop-blur-md">
                          {badge}
                        </span>
                      )}
                    </div>
                  </div>
                }
              />
            )}
            {(description || children) && (
              <ModalBody className="p-2 sm:p-4 pt-1 sm:pt-2 space-y-2">
                {description && (
                  <p className="text-white/85 leading-relaxed text-xs sm:text-sm font-normal">
                    {description}
                  </p>
                )}
                {children}
              </ModalBody>
            )}
            {(confirmText || cancelText) && (
              <ModalFooter className="border-none p-2 sm:p-4 pt-3 sm:pt-4 flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
                {cancelText && (
                  <button
                    type="button"
                    onClick={onCancel ?? handleClose}
                    className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-black/25 hover:bg-black/35 dark:bg-white/10 dark:hover:bg-white/20 border border-white/20 dark:border-white/15 backdrop-blur-md transition-all cursor-pointer text-center justify-center flex items-center"
                  >
                    {cancelText}
                  </button>
                )}
                {confirmText && (
                  <button
                    type="button"
                    onClick={onConfirm ?? handleClose}
                    className="w-full sm:w-auto px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 active:scale-95 transition-all cursor-pointer text-center justify-center flex items-center"
                  >
                    {confirmText}
                  </button>
                )}
              </ModalFooter>
            )}
          </div>
        </div>
      );
    }

    if (activeVariant === "standard" && (title || description || confirmText)) {
      return (
        <div className="p-2 sm:p-4">
          {(title || icon || badge) && (
            <ModalHeader
              className="border-none p-4 pb-2 flex items-start justify-between gap-4"
              title={
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-all border bg-primary/10 text-primary border-primary/30">
                    {icon ?? <AlertCircle className="w-6 h-6" />}
                  </div>
                  <div className="flex flex-col">
                    {typeof title === "string" ? (
                      <h2 className="text-xl font-semibold tracking-tight text-foreground">
                        {title}
                      </h2>
                    ) : (
                      title
                    )}
                    {badge && (
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {badge}
                      </span>
                    )}
                  </div>
                </div>
              }
            />
          )}
          {(description || children) && (
            <ModalBody className="p-4 pt-2 space-y-2">
              {description && (
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base font-normal">
                  {description}
                </p>
              )}
              {children}
            </ModalBody>
          )}
          {(confirmText || cancelText) && (
            <ModalFooter className="border-none p-4 pt-4 flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
              {cancelText && (
                <button
                  type="button"
                  onClick={onCancel ?? handleClose}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  {cancelText}
                </button>
              )}
              {confirmText && (
                <button
                  type="button"
                  onClick={onConfirm ?? handleClose}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-primary/20 active:scale-95 transition-all bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
                >
                  {confirmText}
                </button>
              )}
            </ModalFooter>
          )}
        </div>
      );
    }

    return children;
  };

  const overlay = (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ease-in-out",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
        activeVariant !== "liquid-glass" && "backdrop-blur-[3px]",
        isVisible ? "bg-black/50" : "bg-black/0",
        variantOverlayClass[activeVariant],
        overlayClassName,
      )}
      onClick={handleClose}
      role="presentation"
    >
      <div
        className={cn(
          "relative flex max-h-full w-full max-w-lg flex-col overflow-hidden rounded-2xl transition-all duration-300 ease-in-out",
          activeVariant !== "liquid-glass" && "bg-background shadow-xl",
          activeVariant === "liquid-glass"
            ? isVisible
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
            : isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-8 scale-95",
          variantContentClass[activeVariant],
          contentClassName,
        )}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        {...ariaProps}
      >
        {!isHideClose &&
          (primaryCloseButton ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClose();
              }}
              data-modal-close
              type="button"
              aria-label="Close"
              className={cn(
                "p-1.5 rounded-md absolute top-3.5 right-3.5 sm:top-4 sm:right-4 cursor-pointer transition-colors duration-200 z-50",
                activeVariant === "liquid-glass"
                  ? "text-white/80 hover:text-white bg-white/20 hover:bg-white/30 dark:bg-black/50 dark:hover:bg-black/70 dark:border dark:border-white/15 rounded-full backdrop-blur-md"
                  : "bg-primary/10 text-primary hover:bg-primary/20"
              )}
            >
              <X className="h-5 w-5 ml-[1px]" />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClose();
              }}
              data-modal-close
              type="button"
              aria-label="Close"
              className={cn(
                "absolute top-3.5 right-3.5 sm:top-4 sm:right-4 cursor-pointer transition-colors duration-200 z-50",
                activeVariant === "liquid-glass"
                  ? "text-white/80 hover:text-white bg-white/20 hover:bg-white/30 dark:bg-black/50 dark:hover:bg-black/70 dark:border dark:border-white/15 p-1.5 rounded-full backdrop-blur-md"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <X className="h-5 w-5" />
            </button>
          ))}
        <ModalLabelContext.Provider value={labelId}>
          {/* min-h-0 lets this shrink below its content so the body can
              scroll; flex-1 fills a panel given a fixed height. */}
          <div className="flex min-h-0 flex-1 flex-col">{renderVariantContent()}</div>
        </ModalLabelContext.Provider>
      </div>
    </div>
  );

  return (
    <>
      <span ref={setAnchor} hidden aria-hidden="true" />
      <LiquidGlassSvgFilter />
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
