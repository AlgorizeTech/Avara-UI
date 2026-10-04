"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type DrawerSide = "top" | "bottom" | "left" | "right";

interface DrawerContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side: DrawerSide;
}

const DrawerContext = createContext<DrawerContextType | null>(null);

// ==========================================
// MOTION
// Opening fades the overlay in (0.3s power2.out) and slides the panel in from
// its edge (0.4s power3.out); closing reverses both in 0.3s (power2.in /
// power3.in). A transition takes its timing from the state it is heading to,
// so each state carries its own. @starting-style is where a freshly mounted
// layer starts from.
// ==========================================
const POWER3_OUT =
  "linear(0, .1268, .2412, .3439, .4358, .5177, .5904, .6545, .7108, .7599, .8025, .8391, .8704, .8969, .9191, .9375, .9526, .9647, .9744, .9819, .9877, .9919, .9949, .997, .9984, .9992, .9997, .9999, 1, 1, 1)";
const POWER3_IN =
  "linear(0, 0, 0, .0001, .0003, .0008, .0016, .003, .0051, .0081, .0123, .0181, .0256, .0353, .0474, .0625, .0809, .1031, .1296, .1609, .1975, .2401, .2892, .3455, .4096, .4823, .5642, .6561, .7588, .8732, 1)";

const DRAWER_CSS = `
.drawer-overlay {
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.3333, 0, 0.6667, 0);
}
.drawer-overlay[data-state="open"] {
  opacity: 1;
  transition: opacity 0.3s cubic-bezier(0.3333, 1, 0.6667, 1);
}
.drawer-content { transition: transform 0.3s ${POWER3_IN}; }
.drawer-content[data-side="top"] { transform: translateY(-100%); }
.drawer-content[data-side="bottom"] { transform: translateY(100%); }
.drawer-content[data-side="left"] { transform: translateX(-100%); }
.drawer-content[data-side="right"] { transform: translateX(100%); }
.drawer-content[data-state="open"] {
  transform: none;
  transition: transform 0.4s ${POWER3_OUT};
}
@starting-style {
  .drawer-overlay[data-state="open"] { opacity: 0; }
  .drawer-content[data-state="open"][data-side="top"] { transform: translateY(-100%); }
  .drawer-content[data-state="open"][data-side="bottom"] { transform: translateY(100%); }
  .drawer-content[data-state="open"][data-side="left"] { transform: translateX(-100%); }
  .drawer-content[data-state="open"][data-side="right"] { transform: translateX(100%); }
}
`;

export const Drawer = ({
  open,
  onOpenChange,
  side = "right",
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: DrawerSide;
  children: React.ReactNode;
}) => {
  const [renderLayer, setRenderLayer] = useState(open);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  // Resolves the document this drawer actually lives in, which is not always
  // the global one — previews portal components into an iframe. Resolving in a
  // callback ref rather than reading a ref during render keeps render pure, and
  // a null target doubles as the "not mounted yet" signal that guards SSR.
  const setAnchor = useCallback((node: HTMLSpanElement | null) => {
    setPortalTarget(node ? node.ownerDocument.body : null);
  }, []);

  // Opening must show the layer immediately. Adjusting state during render on a
  // prop change is React's documented alternative to an effect here, and avoids
  // the extra render an effect would cost on every open.
  const [prevOpen, setPrevOpen] = useState(open);
  if (prevOpen !== open) {
    setPrevOpen(open);
    if (open) setRenderLayer(true);
  }

  useEffect(() => {
    // Resolve the document the drawer actually lives in (supports iframe rendering).
    const doc = layerRef.current?.ownerDocument ?? document;
    if (open) {
      doc.body.style.overflow = "hidden";
      return () => {
        doc.body.style.overflow = "";
      };
    }
    doc.body.style.overflow = "";
    // Match the closing transition (300ms) before unmounting from DOM
    const timer = setTimeout(() => setRenderLayer(false), 300);
    return () => clearTimeout(timer);
  }, [open, portalTarget]);

  useEffect(() => {
    const doc = layerRef.current?.ownerDocument ?? document;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    if (open) doc.addEventListener("keydown", handleEsc);
    return () => doc.removeEventListener("keydown", handleEsc);
  }, [open, onOpenChange, portalTarget]);

  if (!portalTarget || !renderLayer) return <span ref={setAnchor} hidden />;

  return (
    <>
      <span ref={setAnchor} hidden />
      {createPortal(
        <DrawerContext.Provider value={{ open, onOpenChange, side }}>
          <div ref={layerRef} className="fixed inset-0 z-50 pointer-events-none">
            <style>{DRAWER_CSS}</style>
            {children}
          </div>
        </DrawerContext.Provider>,
        portalTarget,
      )}
    </>
  );
};

export const DrawerOverlay = ({
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { open, onOpenChange } = useContext(DrawerContext)!;

  return (
    <div
      onClick={() => onOpenChange(false)}
      data-state={open ? "open" : "closed"}
      className={cn(
        "drawer-overlay absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto",
        className,
      )}
      style={style}
      {...props}
    />
  );
};

export const DrawerContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, style, ...props }, ref) => {
  const { open, side, onOpenChange } = useContext(DrawerContext)!;

  // Strict layout boundaries that prevent vertical/horizontal drift. Where the
  // panel hides off-screen for each side lives in DRAWER_CSS.
  const sideConfig = {
    top: {
      class: "top-0 left-0 right-0 w-full max-h-[85vh] sm:max-h-[80vh] rounded-b-2xl",
    },
    bottom: {
      class: "bottom-0 left-0 right-0 w-full max-h-[85vh] sm:max-h-[80vh] rounded-t-2xl",
    },
    left: {
      class:
        "top-0 left-0 bottom-0 h-full w-[400px] max-w-[85vw] rounded-r-2xl",
    },
    right: {
      class:
        "top-0 right-0 bottom-0 h-full w-[400px] max-w-[85vw] rounded-l-2xl",
    },
  };

  return (
    <div
      ref={ref}
      data-state={open ? "open" : "closed"}
      data-side={side}
      className={cn(
        "drawer-content absolute bg-background shadow-2xl pointer-events-auto flex flex-col overflow-hidden border border-border",
        sideConfig[side].class,
        className,
      )}
      style={style}
      {...props}
    >
      <button
        onClick={() => onOpenChange(false)}
        className="absolute top-4 right-4 z-50 p-2 bg-muted hover:bg-muted text-muted-foreground rounded-full transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      {children}
    </div>
  );
});
DrawerContent.displayName = "DrawerContent";

export const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "p-6 border-b border-border shrink-0",
      className,
    )}
    {...props}
  />
);

export const DrawerTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={cn(
      "text-lg font-semibold text-foreground",
      className,
    )}
    {...props}
  />
);

export const DrawerDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn("text-sm text-muted-foreground mt-1.5", className)}
    {...props}
  />
);

export const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "p-6 border-t border-border bg-muted shrink-0 flex items-center justify-end gap-3",
      className,
    )}
    {...props}
  />
);

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline";
  }
>(({ className, variant = "default", ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2",
      variant === "outline"
        ? "border border-border bg-transparent hover:bg-muted text-foreground"
        : "bg-primary text-primary-foreground hover:bg-primary",
      className,
    )}
    {...props}
  />
));
Button.displayName = "Button";
