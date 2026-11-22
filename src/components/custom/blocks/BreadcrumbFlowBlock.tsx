"use client";

import { cn } from "@/lib/utils";
import { ChevronRight, Ellipsis } from "lucide-react";
import React, {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

/** English defaults. Override per instance with `labels` on `Breadcrumb`. */
export const breadcrumbLabels = {
  label: "Breadcrumb",
  showHidden: "Show hidden paths",
};

export type BreadcrumbLabels = typeof breadcrumbLabels;

const LabelsContext = createContext<BreadcrumbLabels>(breadcrumbLabels);

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/** True while the user asks the OS for less motion. */
function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** True when the primary pointer can hover, so hover may open the hidden paths. */
function useHoverCapable(): boolean {
  const [capable, setCapable] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCapable(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return capable;
}

// ---------------------------------------------------------------------------
// Presence: items that enter, leave and shift while the route changes.
// ---------------------------------------------------------------------------

type Box = { left: number; top: number; width: number; height: number };

/** What `BreadcrumbList` tells each of its items about their place in the list. */
type Slot = {
  id: string;
  /** True for the items already there on the first render, which do not animate in. */
  initial: boolean;
  /** True once the item has been removed and is fading out. */
  exiting: boolean;
  /** Where an exiting item hangs while it fades, so the others close up at once. */
  style?: React.CSSProperties;
  onExited: () => void;
};

const SlotContext = createContext<Slot | null>(null);

// ---------------------------------------------------------------------------
// Parts
// ---------------------------------------------------------------------------

export type BreadcrumbProps = React.ComponentPropsWithoutRef<"nav"> & {
  /** Override any built-in string. */
  labels?: Partial<BreadcrumbLabels>;
};

/** A navigation landmark. Keep it mounted while the route changes. */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  { className, children, labels, ...props },
  ref,
) {
  const merged = { ...breadcrumbLabels, ...labels };
  return (
    <nav ref={ref} aria-label={merged.label} {...props} className={cn("min-w-0", className)}>
      <LabelsContext.Provider value={merged}>{children}</LabelsContext.Provider>
    </nav>
  );
});

export type BreadcrumbListProps = React.ComponentPropsWithoutRef<"ol"> & {
  /** Maximum visible slots, including the ellipsis. Minimum 3; Infinity disables collapsing. */
  maxItems?: number;
  /** Accessible label for the hidden ancestor disclosure. */
  overflowLabel?: string;
};

type Exiting = { key: string; element: React.ReactNode; box: Box; index: number };

/**
 * Pass keyed `BreadcrumbItem`s directly so entering and leaving routes animate:
 * a new item fades in, a removed one fades out while the rest slide into place.
 */
export const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(
  function BreadcrumbList({ className, children, maxItems = 4, overflowLabel, ...props }, ref) {
    const reduced = useReducedMotion();
    const items = Children.toArray(children).filter(isValidElement);
    const limit = Number.isFinite(maxItems) ? Math.max(3, Math.floor(maxItems)) : 4;
    const collapse = maxItems !== Infinity && items.length > limit;
    const tailCount = limit - 2;
    const visible: React.ReactElement[] = collapse
      ? [
          items[0],
          <BreadcrumbItem key="breadcrumb-overflow">
            <BreadcrumbSeparator />
            <BreadcrumbEllipsis label={overflowLabel}>
              {items.slice(1, -tailCount)}
            </BreadcrumbEllipsis>
          </BreadcrumbItem>,
          ...items.slice(-tailCount),
        ]
      : items;
    const keys = visible.map((node) => String(node.key));

    const listRef = useRef<HTMLOListElement | null>(null);
    const setRefs = useCallback(
      (node: HTMLOListElement | null) => {
        listRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    const [exiting, setExiting] = useState<Exiting[]>([]);
    const mounted = useRef(false);
    // What the last commit looked like, so the next one can tell what moved,
    // what arrived and what left.
    const boxes = useRef(new Map<string, Box>());
    const elements = useRef(new Map<string, React.ReactNode>());
    const order = useRef<string[]>([]);

    // Runs after every commit on purpose: it diffs this render against the last.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useLayoutEffect(() => {
      const list = listRef.current;
      if (!list) return;
      const live = new Set(keys);

      // A removed item stays on as a fading copy until its exit finishes.
      const gone = order.current.filter(
        (key) => !live.has(key) && !exiting.some((e) => e.key === key),
      );
      if (gone.length > 0 || exiting.some((e) => live.has(e.key))) {
        setExiting((prev) => [
          ...prev.filter((e) => !live.has(e.key)),
          ...gone.flatMap((key) => {
            const box = boxes.current.get(key);
            const element = elements.current.get(key);
            return box && element
              ? [{ key, element, box, index: order.current.indexOf(key) }]
              : [];
          }),
        ]);
      }

      // Items that did not leave slide from where they were to where they are.
      const next = new Map<string, Box>();
      list.querySelectorAll<HTMLElement>(":scope > [data-presence-key]").forEach((node) => {
        if (node.dataset.presenceExiting) return;
        const key = node.dataset.presenceKey as string;
        const rect = node.getBoundingClientRect();
        const box = {
          left: node.offsetLeft,
          top: node.offsetTop,
          width: rect.width,
          height: rect.height,
        };
        next.set(key, box);
        const before = boxes.current.get(key);
        if (
          before &&
          !reduced &&
          (Math.abs(before.left - box.left) > 0.5 || Math.abs(before.top - box.top) > 0.5)
        ) {
          node.animate(
            [
              { transform: `translate(${before.left - box.left}px, ${before.top - box.top}px)` },
              { transform: "none" },
            ],
            { duration: 380, easing: EASE },
          );
        }
      });
      boxes.current = next;
      elements.current = new Map(visible.map((node) => [String(node.key), node]));
      order.current = keys;
      mounted.current = true;
    });

    // Exiting copies hang at the place they left, in their old order.
    const rows = visible.map((node) => ({ node, key: String(node.key), exit: undefined as Exiting | undefined }));
    [...exiting]
      .filter((e) => !keys.includes(e.key))
      .sort((a, b) => a.index - b.index)
      .forEach((e) =>
        rows.splice(Math.min(e.index, rows.length), 0, {
          node: e.element as React.ReactElement,
          key: e.key,
          exit: e,
        }),
      );

    return (
      <ol
        {...props}
        ref={setRefs}
        className={cn("relative flex flex-wrap items-center gap-x-1 gap-y-1 text-sm", className)}
      >
        {rows.map(({ node, key, exit }) => (
          <SlotContext.Provider
            key={key}
            value={{
              id: key,
              initial: !mounted.current,
              exiting: Boolean(exit),
              style: exit
                ? {
                    position: "absolute",
                    left: exit.box.left,
                    top: exit.box.top,
                    width: exit.box.width,
                    height: exit.box.height,
                    whiteSpace: "nowrap",
                  }
                : undefined,
              onExited: () => setExiting((prev) => prev.filter((e) => e.key !== key)),
            }}
          >
            {node}
          </SlotContext.Provider>
        ))}
      </ol>
    );
  },
);

export type BreadcrumbItemProps = React.ComponentPropsWithoutRef<"li">;

/** Use a stable route key; put its optional separator inside this item. */
export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  function BreadcrumbItem({ className, style, children, ...props }, ref) {
    const slot = useContext(SlotContext);
    const reduced = useReducedMotion();
    const exiting = slot?.exiting ?? false;
    const arrivedWithList = useRef(slot?.initial ?? true);
    const itemRef = useRef<HTMLLIElement | null>(null);
    const setRefs = useCallback(
      (node: HTMLLIElement | null) => {
        itemRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    // Fade in, unless it was part of the list from the start.
    useLayoutEffect(() => {
      const el = itemRef.current;
      if (!el || arrivedWithList.current || exiting || reduced) return;
      const animation = el.animate(
        [
          { opacity: 0, transform: "translateY(6px)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 200, easing: EASE },
      );
      return () => animation.cancel();
      // Once, on arrival.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Fade out, then let the list drop it.
    useLayoutEffect(() => {
      if (!exiting) return;
      const el = itemRef.current;
      if (!el || reduced) {
        slot?.onExited();
        return;
      }
      const animation = el.animate(
        [
          { opacity: 1, transform: "none" },
          { opacity: 0, transform: "translateY(6px)" },
        ],
        { duration: 200, easing: EASE, fill: "forwards" },
      );
      animation.onfinish = () => slot?.onExited();
      return () => animation.cancel();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [exiting]);

    return (
      <li
        ref={setRefs}
        {...props}
        data-presence-key={slot?.id}
        data-presence-exiting={exiting || undefined}
        inert={exiting || undefined}
        aria-hidden={exiting || undefined}
        style={{ ...style, ...slot?.style, pointerEvents: exiting ? "none" : style?.pointerEvents }}
        className={cn("relative inline-flex min-w-0 max-w-full items-center gap-1", className)}
      >
        {children}
      </li>
    );
  },
);

export type BreadcrumbLinkProps = React.ComponentPropsWithoutRef<"a"> & {
  /** Render your router's Link, spreading these props onto it. */
  render?: (props: React.ComponentPropsWithoutRef<"a">) => React.ReactElement;
};

export function BreadcrumbLink({ className, render, ...props }: BreadcrumbLinkProps) {
  const linkProps = {
    ...props,
    className: cn(
      "inline-flex min-h-8 min-w-0 items-center gap-1.5 rounded-md px-2 font-medium text-muted-foreground transition-colors duration-150 hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&>svg]:size-3.5 [&>svg]:shrink-0",
      className,
    ),
  };
  return render ? render(linkProps) : <a {...linkProps} />;
}

export type BreadcrumbPageProps = React.ComponentPropsWithoutRef<"span">;

export function BreadcrumbPage({ className, children, ...props }: BreadcrumbPageProps) {
  return (
    <span
      {...props}
      aria-current="page"
      className={cn(
        "relative isolate inline-flex min-h-8 min-w-0 items-center gap-1.5 rounded-md px-2 font-medium text-foreground [overflow-wrap:anywhere] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&>svg]:size-3.5 [&>svg]:shrink-0",
        className,
      )}
    >
      {children}
    </span>
  );
}

export type BreadcrumbSeparatorProps = React.ComponentPropsWithoutRef<"span">;

/** Decorative separator, placed inside the following BreadcrumbItem. */
export function BreadcrumbSeparator({ className, children, ...props }: BreadcrumbSeparatorProps) {
  return (
    <span
      {...props}
      aria-hidden="true"
      data-breadcrumb-separator=""
      className={cn(
        "inline-flex shrink-0 items-center text-muted-foreground/50 rtl:rotate-180 [&>svg]:size-3.5",
        className,
      )}
    >
      {children ?? <ChevronRight />}
    </span>
  );
}

export interface BreadcrumbEllipsisProps {
  /** Hidden BreadcrumbItems, in path order. */
  children: React.ReactNode;
  className?: string;
  label?: string;
}

type Placement = { align: "start" | "end"; side: "top" | "bottom"; width: number };

/**
 * The hidden ancestors behind a `…` button. Hover opens it on a mouse, a click
 * or tap toggles it, and the keyboard opens it with Enter, Space or ArrowDown
 * and moves into the list. Escape closes it and returns to the button.
 */
export function BreadcrumbEllipsis({ children, className, label }: BreadcrumbEllipsisProps) {
  const labels = useContext(LabelsContext);
  const reduced = useReducedMotion();
  const canHover = useHoverCapable();
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const [placement, setPlacement] = useState<Placement>({
    align: "start",
    side: "bottom",
    width: 224,
  });
  const root = useRef<HTMLSpanElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLOListElement>(null);
  const focusOnOpen = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mount the panel on open, play it in, and unmount it after it plays out.
  useEffect(() => {
    if (open) {
      setMounted(true);
      const frame = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(frame);
    }
    setShown(false);
    const timer = setTimeout(() => setMounted(false), reduced ? 0 : 170);
    return () => clearTimeout(timer);
  }, [open, reduced]);

  // Open to the side with the room, and above when there is none below.
  useLayoutEffect(() => {
    if (!open) return;
    const update = () => {
      const rect = trigger.current?.getBoundingClientRect();
      if (!rect) return;
      const right = window.innerWidth - rect.left - 8;
      const left = rect.right - 8;
      const align = right < 224 && left > right ? "end" : "start";
      const below = window.innerHeight - rect.bottom;
      setPlacement({
        align,
        side: below < 280 && rect.top > below ? "top" : "bottom",
        width: Math.max(32, Math.min(224, align === "start" ? right : left)),
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [open]);

  // Keyboard opening moves focus onto the first path.
  useEffect(() => {
    if (!mounted || !focusOnOpen.current) return;
    const frame = requestAnimationFrame(() => {
      panel.current?.querySelector<HTMLElement>("a[href],button")?.focus();
      focusOnOpen.current = false;
    });
    return () => cancelAnimationFrame(frame);
  }, [mounted]);

  const cancelClose = () => {
    if (closeTimer.current !== null) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const leave = () => {
    cancelClose();
    // Allow the pointer to cross the gap between the button and the panel.
    closeTimer.current = setTimeout(() => {
      const active = document.activeElement;
      if (!panel.current?.contains(active) && active !== trigger.current) setOpen(false);
    }, 160);
  };
  useEffect(() => () => cancelClose(), []);

  // Close when focus or a press lands outside.
  useEffect(() => {
    if (!open) return;
    const outside = (event: Event) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("focusin", outside);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("focusin", outside);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  const { align, side, width } = placement;

  return (
    <span
      ref={root}
      className={cn("relative inline-flex", className)}
      onPointerEnter={(event) => {
        cancelClose();
        if (canHover && event.pointerType === "mouse") {
          focusOnOpen.current = false;
          setOpen(true);
        }
      }}
      onPointerLeave={leave}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.stopPropagation();
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        aria-label={label ?? labels.showHidden}
        aria-expanded={open}
        aria-controls={mounted ? panelId : undefined}
        className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onClick={(event) => {
          // A mouse click on a hover-opened list keeps it open; touch and the
          // keyboard toggle it.
          if (event.detail === 0) focusOnOpen.current = !open;
          setOpen(canHover && event.detail > 0 ? true : !open);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            focusOnOpen.current = true;
            setOpen(true);
            panel.current?.querySelector<HTMLElement>("a[href],button")?.focus();
          }
        }}
      >
        <Ellipsis aria-hidden="true" className="size-4" />
      </button>

      {mounted && (
        <div
          id={panelId}
          onPointerEnter={() => {
            cancelClose();
            setOpen(true);
          }}
          onPointerLeave={leave}
          onClick={(event) => {
            if ((event.target as Element).closest("a[href]")) setOpen(false);
          }}
          className="absolute z-50 rounded-[10px] border border-border bg-popover p-1.5 text-popover-foreground shadow-lg"
          style={{
            [side === "bottom" ? "top" : "bottom"]: "calc(100% + 6px)",
            [align === "start" ? "left" : "right"]: 0,
            width,
            opacity: shown ? 1 : 0,
            transform: shown ? "none" : `translateY(${side === "bottom" ? -4 : 4}px) scale(0.96)`,
            transformOrigin: `${side === "bottom" ? "top" : "bottom"} ${align === "start" ? "left" : "right"}`,
            transition: reduced ? "none" : `opacity 160ms ${EASE}, transform 160ms ${EASE}`,
          }}
        >
          {/* The hidden paths are plain items here: no entrance, no exit. */}
          <SlotContext.Provider value={null}>
            <ol
              ref={panel}
              className="flex max-h-64 flex-col gap-0.5 overflow-y-auto [&>li]:w-full [&_[data-breadcrumb-separator]]:hidden [&_a]:w-full [&_a]:py-1 [&_a]:[overflow-wrap:anywhere]"
            >
              {children}
            </ol>
          </SlotContext.Provider>
        </div>
      )}
    </span>
  );
}
