"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, CalendarDays, CalendarPlus, ChevronDown, ChevronLeft, ChevronRight, Clock, RotateCcw } from "lucide-react";
import React, {
  createContext,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useSurface } from "./glass-panel-context";

// ==========================================
// BOOKING CARD — month, days, times, confirm
// ==========================================
export interface BookingSlot {
  /** As shown, e.g. "9:00 AM" or "13:00". */
  label: string;
  /** Already taken — shown, not selectable. */
  taken?: boolean;
}

export interface Booking {
  day: Date;
  slot: string;
}

/** `done` is the beat where the button turns green, before the confirmation takes over. */
type BookingCardStatus = "idle" | "booking" | "done" | "booked";

interface BookingCardContextValue {
  month: Date | null;
  day: Date | null;
  slot: string | null;
  status: BookingCardStatus;
  setMonth: (m: Date) => void;
  setDay: (d: Date) => void;
  setSlot: (s: string) => void;
  submit: () => Promise<void>;
  change: () => void;
}

const BookingCardContext = createContext<BookingCardContextValue | null>(null);

function useBookingCard(part: string) {
  const ctx = useContext(BookingCardContext);
  if (!ctx) throw new Error(`<BookingCard.${part}> must be inside <BookingCard>`);
  return ctx;
}

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const sameMonth = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

const WEEKDAY = new Intl.DateTimeFormat("en-US", { weekday: "short" });
const MONTH_YEAR = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });
const MONTH_SHORT = new Intl.DateTimeFormat("en-US", { month: "short" });
const LONG_DATE = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" });
const SHORT_DATE = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" });

/** False on the server and during hydration, true once the client has taken over. */
const subscribeToNothing = () => () => {};
const useIsMounted = () =>
  useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

interface PillBox {
  x: number;
  y: number;
  w: number;
  h: number;
  /** False for the first placement, so the pill appears in place instead of flying in. */
  glide: boolean;
}

/**
 * Where the pill sits: over the `aria-checked` child of `ref`, which must be
 * the positioned parent of the pill. Re-measured when `key` changes and when
 * the container resizes (days re-wrap on narrow cards).
 */
function useSelectedPill(ref: React.RefObject<HTMLElement | null>, key: string) {
  const [pill, setPill] = useState<PillBox | null>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const place = () => {
      const el = root.querySelector<HTMLElement>('[aria-checked="true"]');
      setPill((prev) => {
        if (!el) return null;
        const x = el.offsetLeft;
        const y = el.offsetTop;
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        if (prev && prev.x === x && prev.y === y && prev.w === w && prev.h === h) return prev;
        return { x, y, w, h, glide: prev !== null };
      });
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(root);
    return () => ro.disconnect();
  }, [ref, key]);
  return pill;
}

function SelectedPill({ pill, isLiquid, className }: { pill: PillBox | null; isLiquid: boolean; className: string }) {
  if (!pill) return null;
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-0 top-0 shadow-sm",
        isLiquid ? "bg-white" : "bg-primary",
        pill.glide && "transition-[translate,width,height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        className,
      )}
      style={{ translate: `${pill.x}px ${pill.y}px`, width: pill.w, height: pill.h }}
    />
  );
}

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

// Every entrance is CSS: the time groups slide up in turn once a day is picked,
// the month menu scales out of its trigger, and the confirmation runs badge
// (zoom in with a little overshoot) → check → text → detail cards → actions.
// All of it holds still under prefers-reduced-motion.
const BOOKING_CARD_CSS = `
.booking-card[data-status="booked"] > :not(.booking-card-confirmation) { display: none; }
.booking-card[data-status="booked"] { display: flex; flex-direction: column; justify-content: center; }
.booking-card[data-returning] > :not(.booking-card-confirmation) { animation: booking-card-rise 0.4s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
.booking-card-times .booking-card-group { opacity: 0; translate: 0 18px; transition: opacity 0.3s ease-out, translate 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
.booking-card-times[data-state="open"] .booking-card-group { opacity: 1; translate: 0 0; transition-delay: 0.08s; }
.booking-card-days { transition: translate 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
.booking-card-days[data-centered] { translate: 0 3.375rem; }
.booking-card-day { animation: booking-card-day-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
@keyframes booking-card-day-in { from { opacity: 0; translate: 0 10px; } }
@keyframes booking-card-rise { from { opacity: 0; translate: 0 16px; } }
@keyframes booking-card-zoom {
  0% { opacity: 0; scale: 0.3; rotate: -25deg; }
  60% { opacity: 1; scale: 1.08; rotate: 4deg; }
  100% { scale: 1; rotate: 0deg; }
}
@keyframes booking-card-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
.booking-card-badge { animation: booking-card-zoom 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
.booking-card-fill { animation: booking-card-fill 0.8s cubic-bezier(0.33, 1, 0.5, 1) backwards; }
@keyframes booking-card-fill { from { translate: 0 calc(100% + 0.75rem); } }
.booking-card-wave { animation: booking-card-wave 0.7s linear infinite; }
@keyframes booking-card-wave { to { translate: -50% 0; } }
.booking-card-submit-check { stroke-dasharray: 1; animation: booking-card-draw 0.35s ease-out 0.25s backwards; }
.booking-card-check { stroke-dasharray: 1; animation: booking-card-draw 0.35s ease-out 0.4s backwards; }
.booking-card-in { animation: booking-card-rise 0.5s cubic-bezier(0.22, 1, 0.36, 1) var(--booking-card-delay, 0s) backwards; }
@media (prefers-reduced-motion: reduce) {
  .booking-card *, .booking-card { animation: none !important; transition-duration: 0s !important; transition-delay: 0s !important; }
}
`;

/**
 * The badge's green rising from the bottom of a button with a rippling edge.
 * The button must be `relative overflow-hidden`.
 */
function RisingFill() {
  return (
    <span aria-hidden className="booking-card-fill absolute inset-0 text-emerald-600 dark:text-emerald-500">
      <svg
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        className="booking-card-wave absolute bottom-full left-0 h-3 w-[200%]"
      >
        <path d="M0 6Q25 0 50 6T100 6T150 6T200 6V12H0Z" fill="currentColor" />
      </svg>
      <span className="absolute inset-0 bg-current" />
    </span>
  );
}

/** A check that draws itself, for the green button states. */
function DrawnCheck() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="relative size-5 shrink-0">
      <path
        d="m5 12.5 4.5 4.5L19 7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        className="booking-card-submit-check"
      />
    </svg>
  );
}

export interface BookingCardProps {
  /**
   * Called when the person confirms. Return a promise to hold the button in
   * its busy state until the booking is really made; throw to stay on the form.
   */
  onBook?: (booking: Booking) => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
}

/**
 * Holds the chosen month, day and slot and runs the confirm. Put
 * `BookingCard.Month`, `BookingCard.Days`, `BookingCard.Times` (pass it
 * `slots`), `BookingCard.Submit` and `BookingCard.Confirmation` inside it.
 *
 * The card is surface-neutral: it draws no background of its own, so it can
 * sit inside any panel. Once booked, every direct child except the
 * confirmation is hidden and the confirmation takes their place — so keep
 * `BookingCard.Confirmation` a direct child.
 */
export function BookingCard({ onBook, children, className }: BookingCardProps) {
  const [month, setMonthState] = useState<Date | null>(null);
  const [day, setDayState] = useState<Date | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [status, setStatus] = useState<BookingCardStatus>("idle");
  const [returning, setReturning] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  // The confirmation takes the form's place; it never makes the card shorter.
  const [formHeight, setFormHeight] = useState(0);
  useEffect(() => {
    const el = rootRef.current;
    if (!el || status === "booked") return;
    const ro = new ResizeObserver(() => setFormHeight(el.offsetHeight));
    ro.observe(el);
    setFormHeight(el.offsetHeight);
    return () => ro.disconnect();
  }, [status]);

  // The button holds its green "complete" state for a moment, then the confirmation takes over.
  useEffect(() => {
    if (status !== "done") return;
    const t = setTimeout(() => setStatus("booked"), 1300);
    return () => clearTimeout(t);
  }, [status]);

  const setDay = (d: Date) => {
    if (day && sameDay(d, day)) return;
    setDayState(d);
    setSlot(null); // a new day means new availability
  };

  const setMonth = (m: Date) => {
    setMonthState(m);
    if (day && !sameMonth(day, m)) {
      setDayState(null);
      setSlot(null);
    }
  };

  const submit = async () => {
    if (!day || !slot || status !== "idle") return;
    setStatus("booking");
    try {
      await onBook?.({ day, slot });
      setStatus("done");
    } catch {
      setStatus("idle");
    }
  };

  // Back to the form with the choice kept, so it can be adjusted.
  const change = () => {
    setReturning(true);
    setStatus("idle");
    rootRef.current?.focus({ preventScroll: true });
  };

  return (
    <BookingCardContext.Provider value={{ month, day, slot, status, setMonth, setDay, setSlot, submit, change }}>
      <style>{BOOKING_CARD_CSS}</style>
      <div
        ref={rootRef}
        tabIndex={-1}
        data-status={status}
        data-returning={returning || undefined}
        style={status === "booked" ? { minHeight: formHeight } : undefined}
        className={cn("booking-card relative rounded-[inherit] outline-none", className)}
      >
        {children}
      </div>
    </BookingCardContext.Provider>
  );
}

// ------------------------------------------
// Month — pill trigger, year arrows and a month grid
// ------------------------------------------
export interface BookingCardMonthProps {
  /** How many months, starting with the current one, can be chosen; the rest of the grid is greyed out. */
  count?: number;
  className?: string;
}

function BookingCardMonth({ count = 24, className }: BookingCardMonthProps) {
  const { month, setMonth } = useBookingCard("Month");
  const isLiquid = useSurface() === "liquid-glass";
  const mounted = useIsMounted();
  const id = useId();

  // What is on offer: this month through `count` months on. It only exists on
  // the client, which is the only place that knows what "now" is.
  const range = useMemo(() => {
    if (!mounted) return null;
    const now = new Date();
    return {
      first: new Date(now.getFullYear(), now.getMonth(), 1),
      last: new Date(now.getFullYear(), now.getMonth() + count - 1, 1),
    };
  }, [mounted, count]);

  useEffect(() => {
    if (!month && range) setMonth(range.first);
  }, [month, range, setMonth]);

  const current = month ?? range?.first ?? null;

  const [open, setOpen] = useState(false);
  /** The year the grid shows; the arrows page through years, the grid picks the month. */
  const [year, setYear] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const openMenu = () => {
    if (!current) return;
    setYear(current.getFullYear());
    setOpen(true);
    requestAnimationFrame(() =>
      panelRef.current?.querySelector<HTMLElement>('[aria-pressed="true"]')?.focus({ preventScroll: true }),
    );
  };

  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  };

  const choose = (m: Date) => {
    setMonth(m);
    close();
  };

  const months = range ? Array.from({ length: 12 }, (_, i) => new Date(year, i, 1)) : [];
  const yearButton = cn(
    "inline-flex size-8 items-center justify-center rounded-full transition-colors disabled:pointer-events-none disabled:opacity-30",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
    isLiquid ? "bg-white/15 text-white hover:bg-white/25" : "bg-foreground/[0.05] hover:bg-foreground/[0.09]",
  );

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        aria-label={current ? `Month, ${MONTH_YEAR.format(current)}` : "Month"}
        onClick={() => (open ? close() : openMenu())}
        className={cn(
          "inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-full pl-4 pr-3 text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          isLiquid ? "bg-white/15 text-white hover:bg-white/25" : "bg-foreground/[0.05] hover:bg-foreground/[0.09]",
        )}
      >
        {/* Reserves the width before the client knows the month. */}
        <span className={cn(!current && "invisible")}>{current ? MONTH_YEAR.format(current) : "September 2026"}</span>
        <ChevronDown
          aria-hidden
          className={cn("size-4 opacity-70 transition-transform duration-300", open && "rotate-180")}
        />
      </button>

      <div
        ref={panelRef}
        id={`${id}-panel`}
        role="dialog"
        aria-label="Choose month and year"
        onKeyDown={(e) => {
          if (e.key === "Escape") close();
        }}
        className={cn(
          "absolute right-0 top-[calc(100%+0.5rem)] z-20 w-[17rem] max-w-[calc(100vw-3rem)] origin-top-right rounded-2xl border p-3 shadow-xl outline-none",
          "transition-[opacity,scale,translate,visibility] duration-200 ease-out",
          isLiquid
            ? "border-white/20 bg-black/80 text-white backdrop-blur-xl"
            : "border-border bg-popover text-popover-foreground",
          open ? "visible scale-100 opacity-100" : "invisible -translate-y-1 scale-95 opacity-0",
        )}
      >
        <div className="flex items-center justify-between">
          <button
            type="button"
            aria-label="Previous year"
            disabled={!range || year <= range.first.getFullYear()}
            onClick={() => setYear((y) => y - 1)}
            className={yearButton}
          >
            <ChevronLeft aria-hidden className="size-4" />
          </button>
          <span aria-live="polite" className="text-sm font-semibold tabular-nums">
            {year || ""}
          </span>
          <button
            type="button"
            aria-label="Next year"
            disabled={!range || year >= range.last.getFullYear()}
            onClick={() => setYear((y) => y + 1)}
            className={yearButton}
          >
            <ChevronRight aria-hidden className="size-4" />
          </button>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {months.map((m) => {
            const selected = current !== null && sameMonth(m, current);
            const off = !range || m < range.first || m > range.last;
            return (
              <button
                key={m.getMonth()}
                type="button"
                aria-pressed={selected}
                aria-label={MONTH_YEAR.format(m)}
                disabled={off}
                onClick={() => choose(m)}
                className={cn(
                  "h-10 rounded-xl text-sm font-medium transition-colors disabled:cursor-not-allowed",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  selected
                    ? isLiquid
                      ? "bg-white text-black"
                      : "bg-primary text-primary-foreground"
                    : off
                      ? isLiquid
                        ? "text-white/30"
                        : "text-foreground/30"
                      : isLiquid
                        ? "hover:bg-white/15"
                        : "hover:bg-foreground/[0.06]",
                )}
              >
                {MONTH_SHORT.format(m)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------
// Scroller — one line, arrows, centred when short
// ------------------------------------------
interface ScrollRowProps {
  /** Accessible name of the radio group. */
  label: string;
  /** A heading for the line. With one, the arrows sit beside it; without, they float over the line's ends. */
  title?: React.ReactNode;
  /** Changes with the choice, so the sliding pill follows it. */
  selectedKey: string;
  /** Changes with the content, so the line scrolls back to its start. */
  resetKey: string;
  /** Corner radius of the pill — match the items'. */
  pillClassName: string;
  /** Sets the height: fixed, so the card never resizes with what is in the line. */
  className: string;
  children: React.ReactNode;
}

/**
 * One horizontal line of radio items. It scrolls by touch, trackpad, mouse
 * drag or the arrows; the arrows and edge fades only show where there is more
 * to reach; a line that fits sits centred; one pill slides to the chosen item.
 */
function ScrollRow({ label, title, selectedKey, resetKey, pillClassName, className, children }: ScrollRowProps) {
  const isLiquid = useSurface() === "liquid-glass";
  const stripRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [more, setMore] = useState({ prev: false, next: false });
  const pill = useSelectedPill(trackRef, selectedKey);

  const measure = () => {
    const el = stripRef.current;
    if (!el) return;
    const next = { prev: el.scrollLeft > 2, next: el.scrollLeft + el.clientWidth < el.scrollWidth - 2 };
    setMore((m) => (m.prev === next.prev && m.next === next.next ? m : next));
  };
  useEffect(() => {
    const el = stripRef.current;
    const track = trackRef.current;
    if (!el || !track) return;
    el.scrollLeft = 0;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    ro.observe(track);
    return () => ro.disconnect();
  }, [resetKey]);

  const page = (dir: 1 | -1) => {
    const el = stripRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: reduce ? "auto" : "smooth" });
  };

  // Mouse users can drag the line; touch and trackpads scroll natively.
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);

  const mask = `linear-gradient(to right, transparent, #000 ${more.prev ? "3rem" : "0px"}, #000 calc(100% - ${more.next ? "3rem" : "0px"}), transparent)`;

  const inline = title !== undefined;
  const arrow = (side: "prev" | "next") =>
    cn(
      "group inline-flex size-8 items-center justify-center rounded-full transition-[background-color,opacity] duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none",
      inline
        ? cn(
            "disabled:opacity-30",
            isLiquid ? "bg-white/15 text-white hover:bg-white/25" : "bg-foreground/[0.05] hover:bg-foreground/[0.09]",
          )
        : cn(
            "absolute top-1/2 z-10 -translate-y-1/2 shadow-md disabled:opacity-0",
            side === "prev" ? "left-1" : "right-1",
            isLiquid ? "bg-white text-black" : "bg-background text-foreground ring-1 ring-border",
          ),
    );
  const prevButton = (
    <button type="button" aria-label="Earlier" disabled={!more.prev} onClick={() => page(-1)} className={arrow("prev")}>
      <ScrollArrow dir="prev" />
    </button>
  );
  const nextButton = (
    <button type="button" aria-label="Later" disabled={!more.next} onClick={() => page(1)} className={arrow("next")}>
      <ScrollArrow dir="next" />
    </button>
  );

  return (
    <div>
      {inline && (
        <div className="flex items-center justify-between gap-3">
          <p className={cn("text-sm font-medium", isLiquid && "text-white")}>{title}</p>
          <div className="flex gap-1.5">
            {prevButton}
            {nextButton}
          </div>
        </div>
      )}
      <div className={cn("relative", className)}>
        <div
          ref={stripRef}
          role="radiogroup"
          aria-label={label}
          onScroll={measure}
          onPointerDown={(e) => {
            if (e.pointerType !== "mouse" || !stripRef.current) return;
            drag.current = { x: e.clientX, left: stripRef.current.scrollLeft, moved: false };
          }}
          onPointerMove={(e) => {
            const d = drag.current;
            if (!d || !stripRef.current) return;
            const dx = e.clientX - d.x;
            if (Math.abs(dx) > 5) d.moved = true;
            if (d.moved) stripRef.current.scrollLeft = d.left - dx;
          }}
          onPointerUp={() => {
            suppressClick.current = drag.current?.moved ?? false;
            drag.current = null;
          }}
          onPointerLeave={() => {
            drag.current = null;
          }}
          onClickCapture={(e) => {
            if (suppressClick.current) {
              e.stopPropagation();
              suppressClick.current = false;
            }
          }}
          style={{ maskImage: mask, WebkitMaskImage: mask }}
          className="flex h-full snap-x snap-mandatory scroll-px-1 overflow-x-scroll overflow-y-hidden p-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* mx-auto centres a short line and falls back to the start once it overflows. */}
          <div ref={trackRef} className="relative mx-auto flex gap-2">
            <SelectedPill pill={pill} isLiquid={isLiquid} className={pillClassName} />
            {children}
          </div>
        </div>
        {!inline && (
          <>
            {prevButton}
            {nextButton}
          </>
        )}
      </div>
    </div>
  );
}

/**
 * A chevron that grows a shaft and leans into its direction on hover (the
 * button around it carries `group`). Drawn here, not imported, so the motion is ours.
 */
function ScrollArrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn(
        "size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        dir === "prev"
          ? "rotate-180 group-enabled:group-hover:-translate-x-0.5"
          : "group-enabled:group-hover:translate-x-0.5",
      )}
    >
      <path
        d="M5 12h14"
        className="origin-right scale-x-0 opacity-0 transition-[scale,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-box:fill-box] group-enabled:group-hover:scale-x-100 group-enabled:group-hover:opacity-100"
      />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

// ------------------------------------------
// Days — one scrolling line for the month
// ------------------------------------------
export interface BookingCardDaysProps {
  /**
   * Days on offer, in order. Defaults to the chosen month from today on, or —
   * with no `BookingCard.Month` — every day from today up to `horizon` days out.
   */
  days?: Date[];
  /** How far ahead the default days run when there is no month picker. */
  horizon?: number;
  /** Days with nothing free — shown struck through, not selectable. */
  unavailable?: (day: Date) => boolean;
  className?: string;
}

function BookingCardDays({ days: daysProp, horizon = 60, unavailable, className }: BookingCardDaysProps) {
  const { month, day, setDay } = useBookingCard("Days");
  const isLiquid = useSurface() === "liquid-glass";
  // Built on the client only — a server render has no idea what "today" is.
  const mounted = useIsMounted();

  const days = useMemo(() => {
    if (!mounted) return [];
    const today = startOfToday();
    const inMonth = (d: Date) => !month || sameMonth(d, month);
    if (daysProp) return daysProp.filter(inMonth);
    if (month) {
      const start = sameMonth(month, today) ? today.getDate() : 1;
      const end = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
      return Array.from(
        { length: Math.max(0, end - start + 1) },
        (_, i) => new Date(month.getFullYear(), month.getMonth(), start + i),
      );
    }
    return Array.from({ length: horizon }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return d;
    });
  }, [mounted, month, daysProp, horizon]);

  return (
    // Until a day is picked the line sits in the middle of the room it shares with
    // the hidden times (half their height, 108px), then glides up to its place.
    <div data-centered={day === null ? "" : undefined} className="booking-card-days">
      <ScrollRow
        label="Day"
        selectedKey={`${day?.getTime() ?? ""}:${days.length}:${days[0]?.getTime() ?? ""}`}
        resetKey={`${month?.getTime() ?? "all"}:${days.length}`}
        pillClassName="rounded-2xl"
        className={cn("h-[84px]", className)}
      >
        {days.length === 0 && mounted && (
          <p className={cn("self-center px-1 text-sm", isLiquid ? "text-white/60" : "text-muted-foreground")}>
            No days open this month.
          </p>
        )}
        {days.map((d, i) => {
          const selected = day !== null && sameDay(d, day);
          const off = unavailable?.(d) ?? false;
          return (
            <button
              key={d.toISOString()}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={LONG_DATE.format(d)}
              disabled={off}
              onClick={() => setDay(d)}
              style={{ animationDelay: `${Math.min(i, 8) * 30}ms` }}
              className={cn(
                "booking-card-day relative flex h-[76px] w-16 shrink-0 snap-start select-none flex-col items-center justify-center gap-1 rounded-2xl",
                "transition-[background-color,color,scale] duration-200 active:scale-95 disabled:active:scale-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                selected
                  ? isLiquid
                    ? "text-black"
                    : "text-primary-foreground"
                  : off
                    ? isLiquid
                      ? "bg-white/5 text-white/30"
                      : "bg-foreground/[0.03] text-foreground/25"
                    : isLiquid
                      ? "bg-white/10 text-white hover:bg-white/20"
                      : "bg-foreground/[0.05] hover:bg-foreground/[0.09]",
              )}
            >
              <span
                className={cn(
                  "text-xs",
                  selected ? "opacity-75" : off ? "" : isLiquid ? "text-white/70" : "text-muted-foreground",
                )}
              >
                {WEEKDAY.format(d)}
              </span>
              <span className={cn("text-xl font-semibold tabular-nums", off && "line-through")}>{d.getDate()}</span>
            </button>
          );
        })}
      </ScrollRow>
    </div>
  );
}

// ------------------------------------------
// Times — one scrolling line, hidden until a day is picked
// ------------------------------------------
export interface BookingCardTimesProps {
  /** Every slot, in order, on a single line. */
  slots: BookingSlot[];
  /** Title above the line; the arrows sit to its right. */
  label?: string;
  className?: string;
}

function BookingCardTimes({ slots, label = "Select a time", className }: BookingCardTimesProps) {
  const { day, slot, setSlot } = useBookingCard("Times");
  const isLiquid = useSurface() === "liquid-glass";
  const open = day !== null;

  return (
    // The cell keeps the times' height while they are hidden, so the card never
    // resizes when a day is chosen (the days sit centred in that room until then).
    <div data-state={open ? "open" : "closed"} className="booking-card-times grid grid-cols-[minmax(0,1fr)]">
      <div aria-hidden={!open} inert={!open} className={cn("booking-card-group min-w-0 pt-5 [grid-area:1/1]", className)}>
        <ScrollRow
          label="Time"
          title={label}
          selectedKey={slot ?? ""}
          resetKey=""
          pillClassName="rounded-full"
          className="-mx-1 mt-2 h-12"
        >
            {slots.map((s) => {
              const selected = slot === s.label;
              return (
                <button
                  key={s.label}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  disabled={s.taken || !open}
                  onClick={() => setSlot(s.label)}
                  className={cn(
                    "relative h-10 shrink-0 snap-start rounded-full px-5 text-sm font-medium tabular-nums transition-[background-color,color,scale] duration-200 active:scale-95 disabled:active:scale-100",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    selected
                      ? isLiquid
                        ? "text-black"
                        : "text-primary-foreground"
                      : s.taken
                        ? isLiquid
                          ? "bg-white/5 text-white/30 line-through"
                          : "bg-foreground/[0.03] text-foreground/30 line-through"
                        : isLiquid
                          ? "bg-white/10 text-white hover:bg-white/20"
                          : "bg-foreground/[0.05] hover:bg-foreground/[0.09]",
                  )}
                >
                  {s.label}
                </button>
              );
            })}
        </ScrollRow>
      </div>
    </div>
  );
}

// ------------------------------------------
// Submit
// ------------------------------------------
export interface BookingCardSubmitProps {
  children?: React.ReactNode;
  className?: string;
}

function BookingCardSubmit({ children = "Book now", className }: BookingCardSubmitProps) {
  const { day, slot, status, submit } = useBookingCard("Submit");
  const isLiquid = useSurface() === "liquid-glass";
  const ready = day !== null && slot !== null;
  const busy = status === "booking";
  const done = status === "done";
  return (
    <button
      type="button"
      disabled={!ready || busy || done}
      aria-busy={busy}
      onClick={submit}
      className={cn(
        "group relative inline-flex h-14 w-full overflow-hidden items-center justify-center gap-2 rounded-full px-6 text-base font-medium",
        "transition-[background-color,color,scale] duration-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:active:scale-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        done
          ? "bg-primary text-white"
          : ready || busy
            ? isLiquid
              ? "bg-white text-black hover:bg-white/90"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
            : isLiquid
              ? "bg-white/10 text-white/50"
              : "bg-foreground/[0.05] text-foreground/40",
        className,
      )}
    >
      {done ? (
        <>
          <RisingFill />
          <DrawnCheck />
          <span className="booking-card-in relative truncate" style={{ "--booking-card-delay": "0.15s" } as React.CSSProperties}>
            Booking complete
          </span>
        </>
      ) : busy ? (
        <>
          <span
            className={cn(
              "size-4 animate-spin rounded-full border-2 motion-reduce:animate-none",
              isLiquid ? "border-black/30 border-t-black" : "border-primary-foreground/40 border-t-primary-foreground",
            )}
          />
          Booking
        </>
      ) : (
        <>
          <span className="truncate">
            {children}
          </span>
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 group-enabled:group-hover:translate-x-0.5"
          />
        </>
      )}
    </button>
  );
}

// ------------------------------------------
// Confirmation
// ------------------------------------------
export interface BookingCardConfirmationProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Who the booking is with, e.g. "Dr. Priya Nair" — shown under the description. */
  withName?: string;
  /** Where, e.g. "Riverside Heart & Medical Group". */
  place?: string;
  /**
   * Called by "Add to calendar". Return a promise to keep the button loading
   * until the event is really added. Without it the button only plays its
   * loading and "added" states.
   */
  onAddToCalendar?: (booking: Booking) => void | Promise<void>;
  className?: string;
}

/**
 * Takes the form's place once a booking is made: the badge zooms in, the
 * check draws, the date and time cards slide up and the actions follow.
 * "Change" goes back to the form with the choice kept.
 */
function BookingCardConfirmation({
  title = "You're booked",
  description = "We sent the details to your inbox. See you soon.",
  withName,
  place,
  onAddToCalendar,
  className,
}: BookingCardConfirmationProps) {
  const { day, slot, status, change } = useBookingCard("Confirmation");
  const isLiquid = useSurface() === "liquid-glass";
  const ref = useRef<HTMLDivElement>(null);
  const open = status === "booked" && day !== null && slot !== null;
  const [calendar, setCalendar] = useState<"idle" | "adding" | "added">("idle");
  useEffect(() => {
    if (!open) setCalendar("idle");
  }, [open]);

  // The submit button just disappeared; give focus somewhere that makes sense.
  useEffect(() => {
    if (open) ref.current?.focus({ preventScroll: true });
  }, [open]);

  if (!open) return null;
  const booking = { day, slot };
  const addToCalendar = async () => {
    if (calendar !== "idle") return;
    setCalendar("adding");
    try {
      // Held for a beat even when it is instant, so the loading state is seen.
      await Promise.all([
        onAddToCalendar?.(booking),
        new Promise((resolve) => setTimeout(resolve, 700)),
      ]);
      setCalendar("added");
    } catch {
      setCalendar("idle");
    }
  };
  const delay = (s: number) => ({ "--booking-card-delay": `${s}s` }) as React.CSSProperties;
  const muted = isLiquid ? "text-white/65" : "text-muted-foreground";
  const tile = isLiquid ? "bg-white/10" : "bg-foreground/[0.05]";
  const iconWell = isLiquid ? "bg-white/15" : "bg-background";

  const details = [
    { label: "Date", value: SHORT_DATE.format(day), Icon: CalendarDays },
    { label: "Time", value: slot, Icon: Clock },
  ];

  return (
    <div
      ref={ref}
      role="status"
      tabIndex={-1}
      className={cn("booking-card-confirmation flex flex-col items-center text-center outline-none", className)}
    >
      <svg viewBox="0 0 24 24" className="booking-card-badge size-24 text-emerald-600 dark:text-emerald-500" aria-hidden>
        <path
          fill="currentColor"
          d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
        />
        <path
          d="m8.5 12.2 2.4 2.4 4.6-4.9"
          fill="none"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          className="booking-card-check"
        />
      </svg>

      <p className="booking-card-in mt-4 text-xl font-semibold tracking-tight" style={delay(0.3)}>
        {title}
      </p>
      <p className={cn("booking-card-in mt-1.5 text-sm", muted)} style={delay(0.38)}>
        {description}
      </p>
      {withName && (
        <p className={cn("booking-card-in mt-0.5 text-sm", muted)} style={delay(0.42)}>
          With {withName}
          {place ? `, ${place}` : ""}
        </p>
      )}

      <div className="mt-5 grid w-full grid-cols-1 gap-3 min-[360px]:grid-cols-2">
        {details.map(({ label, value, Icon }, i) => (
          <div
            key={label}
            className={cn("booking-card-in flex items-center gap-3 rounded-2xl p-3 text-left", tile)}
            style={delay(0.48 + i * 0.08)}
          >
            <span className={cn("grid size-10 shrink-0 place-items-center rounded-full", iconWell)}>
              <Icon aria-hidden className="size-[18px]" />
            </span>
            <span className="min-w-0">
              <span className={cn("block text-xs", muted)}>{label}</span>
              <span className="block truncate text-sm font-medium tabular-nums">{value}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="booking-card-in mt-5 flex w-full gap-3" style={delay(0.66)}>
        <button
          type="button"
          onClick={change}
          className={cn(
            "inline-flex h-12 shrink-0 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            isLiquid ? "bg-white/10 text-white hover:bg-white/20" : "bg-foreground/[0.05] hover:bg-foreground/[0.09]",
          )}
        >
          <RotateCcw aria-hidden className="size-4" />
          Change
        </button>
        <button
          type="button"
          disabled={calendar !== "idle"}
          aria-busy={calendar === "adding"}
          onClick={addToCalendar}
          className={cn(
            "relative inline-flex h-12 min-w-0 flex-1 items-center justify-center gap-2 overflow-hidden rounded-full px-5 text-sm font-medium transition-colors disabled:cursor-default",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            calendar === "added"
              ? "bg-primary text-white"
              : isLiquid
                ? "bg-white text-black hover:bg-white/90"
                : "bg-primary text-primary-foreground hover:bg-primary/90",
          )}
        >
          {calendar === "added" ? (
            <>
              <RisingFill />
              <DrawnCheck />
              <span className="booking-card-in relative truncate" style={delay(0.15)}>
                Added to calendar
              </span>
            </>
          ) : calendar === "adding" ? (
            <>
              <span
                className={cn(
                  "size-4 animate-spin rounded-full border-2 motion-reduce:animate-none",
                  isLiquid ? "border-black/30 border-t-black" : "border-primary-foreground/40 border-t-primary-foreground",
                )}
              />
              Adding
            </>
          ) : (
            <>
              <CalendarPlus aria-hidden className="size-4 shrink-0" />
              <span className="truncate">Add to calendar</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

BookingCard.Month = BookingCardMonth;
BookingCard.Days = BookingCardDays;
BookingCard.Times = BookingCardTimes;
BookingCard.Submit = BookingCardSubmit;
BookingCard.Confirmation = BookingCardConfirmation;
