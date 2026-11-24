"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, CalendarDays, CalendarPlus, Check, ChevronDown, Clock, RotateCcw } from "lucide-react";
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

type BookingCardStatus = "idle" | "booking" | "booked";

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
.booking-card[data-returning] > :not(.booking-card-confirmation) { animation: booking-card-rise 0.4s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
.booking-card-times { transition: grid-template-rows 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
.booking-card-times .booking-card-group { opacity: 0; translate: 0 18px; transition: opacity 0.3s ease-out, translate 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
.booking-card-times[data-state="open"] .booking-card-group { opacity: 1; translate: 0 0; }
.booking-card-times[data-state="open"] .booking-card-group:nth-child(1) { transition-delay: 0.08s; }
.booking-card-times[data-state="open"] .booking-card-group:nth-child(2) { transition-delay: 0.16s; }
.booking-card-times[data-state="open"] .booking-card-group:nth-child(3) { transition-delay: 0.24s; }
.booking-card-times[data-state="open"] .booking-card-group:nth-child(n + 4) { transition-delay: 0.32s; }
.booking-card-day { animation: booking-card-day-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
@keyframes booking-card-day-in { from { opacity: 0; translate: 12px 0; } }
@keyframes booking-card-rise { from { opacity: 0; translate: 0 16px; } }
@keyframes booking-card-zoom {
  0% { opacity: 0; scale: 0.3; rotate: -25deg; }
  60% { opacity: 1; scale: 1.08; rotate: 4deg; }
  100% { scale: 1; rotate: 0deg; }
}
@keyframes booking-card-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
.booking-card-badge { animation: booking-card-zoom 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
.booking-card-check { stroke-dasharray: 1; animation: booking-card-draw 0.35s ease-out 0.4s backwards; }
.booking-card-in { animation: booking-card-rise 0.5s cubic-bezier(0.22, 1, 0.36, 1) var(--booking-card-delay, 0s) backwards; }
@media (prefers-reduced-motion: reduce) {
  .booking-card *, .booking-card { animation: none !important; transition-duration: 0s !important; transition-delay: 0s !important; }
}
`;

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
 * `BookingCard.Month`, `BookingCard.Days`, `BookingCard.Times` (with
 * `BookingCard.Slots` groups inside), `BookingCard.Submit` and
 * `BookingCard.Confirmation` inside it.
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
      setStatus("booked");
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
        className={cn("booking-card relative rounded-[inherit] outline-none", className)}
      >
        {children}
      </div>
    </BookingCardContext.Provider>
  );
}

// ------------------------------------------
// Month — pill trigger, animated listbox
// ------------------------------------------
export interface BookingCardMonthProps {
  /** How many months, starting with the current one, the menu offers. */
  count?: number;
  className?: string;
}

function BookingCardMonth({ count = 6, className }: BookingCardMonthProps) {
  const { month, setMonth } = useBookingCard("Month");
  const isLiquid = useSurface() === "liquid-glass";
  const mounted = useIsMounted();
  const id = useId();

  const months = useMemo(() => {
    if (!mounted) return [];
    const now = new Date();
    return Array.from({ length: count }, (_, i) => new Date(now.getFullYear(), now.getMonth() + i, 1));
  }, [mounted, count]);

  // The month only exists on the client; start on the current one.
  useEffect(() => {
    if (!month && months[0]) setMonth(months[0]);
  }, [month, months, setMonth]);

  const current = month ?? months[0] ?? null;
  const selectedIndex = current ? months.findIndex((m) => sameMonth(m, current)) : -1;

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [highlight, setHighlight] = useState<{ top: number; height: number } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  // The highlight is one element that glides to whichever option is active.
  useEffect(() => {
    const el = optionRefs.current[active];
    if (el) setHighlight({ top: el.offsetTop, height: el.offsetHeight });
  }, [active, open, months.length]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const openMenu = () => {
    setActive(Math.max(selectedIndex, 0));
    setOpen(true);
    requestAnimationFrame(() => listRef.current?.focus({ preventScroll: true }));
  };

  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  };

  const choose = (i: number) => {
    const m = months[i];
    if (m) setMonth(m);
    close();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = months.length - 1;
    const keys: Record<string, () => void> = {
      ArrowDown: () => setActive((a) => Math.min(a + 1, last)),
      ArrowUp: () => setActive((a) => Math.max(a - 1, 0)),
      Home: () => setActive(0),
      End: () => setActive(last),
      Enter: () => choose(active),
      " ": () => choose(active),
      Escape: () => close(),
    };
    if (e.key === "Tab") return close(false);
    const run = keys[e.key];
    if (run) {
      e.preventDefault();
      run();
    }
  };

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-label={current ? `Month, ${MONTH_YEAR.format(current)}` : "Month"}
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            openMenu();
          }
        }}
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

      <ul
        ref={listRef}
        id={`${id}-list`}
        role="listbox"
        tabIndex={-1}
        aria-label="Month"
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        onKeyDown={onKeyDown}
        onMouseLeave={() => setActive(Math.max(selectedIndex, 0))}
        className={cn(
          "absolute right-0 top-[calc(100%+0.5rem)] z-20 min-w-[12rem] origin-top-right rounded-2xl border p-1.5 shadow-xl outline-none",
          "transition-[opacity,scale,translate,visibility] duration-200 ease-out",
          isLiquid
            ? "border-white/20 bg-black/80 text-white backdrop-blur-xl"
            : "border-border bg-popover text-popover-foreground",
          open ? "visible scale-100 opacity-100" : "invisible -translate-y-1 scale-95 opacity-0",
        )}
      >
        {highlight && (
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-x-1.5 top-0 rounded-xl transition-[translate,height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isLiquid ? "bg-white/15" : "bg-foreground/[0.06]",
            )}
            style={{ translate: `0 ${highlight.top}px`, height: highlight.height }}
          />
        )}
        {months.map((m, i) => {
          const selected = i === selectedIndex;
          return (
            <li
              key={m.toISOString()}
              id={`${id}-opt-${i}`}
              ref={(el) => {
                optionRefs.current[i] = el;
              }}
              role="option"
              aria-selected={selected}
              onMouseEnter={() => setActive(i)}
              onClick={() => choose(i)}
              className="relative flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm"
            >
              {MONTH_YEAR.format(m)}
              <Check aria-hidden className={cn("size-4 transition-opacity", selected ? "opacity-100" : "opacity-0")} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ------------------------------------------
// Days — a scrolling strip for the month
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

  // Edge fades only where there is more to scroll to.
  const stripRef = useRef<HTMLDivElement>(null);
  const [fade, setFade] = useState({ start: false, end: false });
  const measure = () => {
    const el = stripRef.current;
    if (!el) return;
    const next = { start: el.scrollLeft > 2, end: el.scrollLeft + el.clientWidth < el.scrollWidth - 2 };
    setFade((f) => (f.start === next.start && f.end === next.end ? f : next));
  };
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollLeft = 0;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [days]);

  // Mouse users can drag the strip; touch and trackpads scroll natively.
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);

  const mask = `linear-gradient(to right, transparent, #000 ${fade.start ? "2.5rem" : "0px"}, #000 calc(100% - ${fade.end ? "3.5rem" : "0px"}), transparent)`;

  return (
    <div className={className}>
      <div
        key={month?.toISOString() ?? "all"}
        ref={stripRef}
        role="radiogroup"
        aria-label="Day"
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
        className="flex min-h-[84px] snap-x snap-mandatory scroll-px-1 gap-2 overflow-x-auto p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                "booking-card-day flex h-[76px] w-16 shrink-0 snap-start select-none flex-col items-center justify-center gap-1 rounded-2xl",
                "transition-[background-color,color,scale] duration-200 active:scale-95 disabled:active:scale-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                selected
                  ? isLiquid
                    ? "bg-white text-black shadow-sm"
                    : "bg-primary text-primary-foreground shadow-sm"
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
      </div>
    </div>
  );
}

// ------------------------------------------
// Times — hidden until a day is picked
// ------------------------------------------
export interface BookingCardTimesProps {
  /** `BookingCard.Slots` groups, in order: they slide up one after another. */
  children: React.ReactNode;
  className?: string;
}

function BookingCardTimes({ children, className }: BookingCardTimesProps) {
  const { day } = useBookingCard("Times");
  const open = day !== null;
  return (
    <div
      data-state={open ? "open" : "closed"}
      aria-hidden={!open}
      className={cn("booking-card-times grid", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
    >
      {/* Spacing lives inside the clip so the closed section takes no room. */}
      <div className="min-h-0 overflow-hidden">
        <div className={cn("space-y-4 pt-5", className)}>{children}</div>
      </div>
    </div>
  );
}

export interface BookingCardSlotsProps {
  /** Group title, e.g. "Morning". */
  label: string;
  slots: BookingSlot[];
  className?: string;
}

function BookingCardSlots({ label, slots, className }: BookingCardSlotsProps) {
  const { day, slot, setSlot } = useBookingCard("Slots");
  const isLiquid = useSurface() === "liquid-glass";

  return (
    <div className={cn("booking-card-group", className)}>
      <p className={cn("text-xs font-medium", isLiquid ? "text-white/70" : "text-muted-foreground")}>{label}</p>
      <div role="radiogroup" aria-label={`${label} times`} className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
        {slots.map((s) => {
          const selected = slot === s.label;
          return (
            <button
              key={s.label}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={s.taken || day === null}
              onClick={() => setSlot(s.label)}
              className={cn(
                "h-10 rounded-xl px-2 text-sm font-medium tabular-nums transition-[background-color,color,scale] duration-200 active:scale-95 disabled:active:scale-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                selected
                  ? isLiquid
                    ? "bg-white text-black shadow-sm"
                    : "bg-primary text-primary-foreground shadow-sm"
                  : s.taken
                    ? isLiquid
                      ? "text-white/30 line-through"
                      : "text-foreground/30 line-through"
                    : isLiquid
                      ? "bg-white/10 text-white hover:bg-white/20"
                      : "bg-foreground/[0.05] hover:bg-foreground/[0.09]",
              )}
            >
              {s.label}
            </button>
          );
        })}
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
  return (
    <button
      type="button"
      disabled={!ready || busy}
      aria-busy={busy}
      aria-label={ready && day ? `${children}, ${LONG_DATE.format(day)} at ${slot}` : undefined}
      onClick={submit}
      className={cn(
        "group inline-flex h-14 w-full items-center justify-center gap-2 rounded-full px-6 text-base font-medium",
        "transition-[background-color,color,scale] duration-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:active:scale-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        ready || busy
          ? isLiquid
            ? "bg-white text-black hover:bg-white/90"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
          : isLiquid
            ? "bg-white/10 text-white/50"
            : "bg-foreground/[0.05] text-foreground/40",
        className,
      )}
    >
      {busy ? (
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
          {children}
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
   * Called by "Add to calendar". Without it the button downloads an .ics file
   * for the booking, `duration` minutes long.
   */
  onAddToCalendar?: (booking: Booking) => void;
  /** Event length in minutes for the default .ics download. */
  duration?: number;
  className?: string;
}

/** "9:00 AM", "1:30 pm" or "13:00" → [hours, minutes]; null when it is not a time. */
const parseTime = (label: string): [number, number] | null => {
  const m = /(\d{1,2})(?:[:.](\d{2}))?\s*([ap])?\.?m?/i.exec(label);
  if (!m) return null;
  let h = Number(m[1]);
  const min = Number(m[2] ?? 0);
  const ampm = m[3]?.toLowerCase();
  if (ampm === "p" && h < 12) h += 12;
  if (ampm === "a" && h === 12) h = 0;
  return h < 24 && min < 60 ? [h, min] : null;
};

const pad = (n: number) => String(n).padStart(2, "0");
const icsDate = (d: Date) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
const icsDateTime = (d: Date) => `${icsDate(d)}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

function downloadIcs({ day, slot }: Booking, summary: string, location: string | undefined, duration: number) {
  const time = parseTime(slot);
  let when: string[];
  if (time) {
    const start = new Date(day.getFullYear(), day.getMonth(), day.getDate(), time[0], time[1]);
    const end = new Date(start.getTime() + duration * 60_000);
    when = [`DTSTART:${icsDateTime(start)}`, `DTEND:${icsDateTime(end)}`];
  } else {
    const next = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
    when = [`DTSTART;VALUE=DATE:${icsDate(day)}`, `DTEND;VALUE=DATE:${icsDate(next)}`];
  }
  const escape = (s: string) => s.replace(/[\\,;]/g, (c) => `\\${c}`);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//booking-card//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@booking-card`,
    `DTSTAMP:${icsDateTime(new Date())}`,
    ...when,
    `SUMMARY:${escape(summary)}`,
    ...(location ? [`LOCATION:${escape(location)}`] : []),
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "booking.ics";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
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
  duration = 60,
  className,
}: BookingCardConfirmationProps) {
  const { day, slot, status, change } = useBookingCard("Confirmation");
  const isLiquid = useSurface() === "liquid-glass";
  const ref = useRef<HTMLDivElement>(null);
  const open = status === "booked" && day !== null && slot !== null;

  // The submit button just disappeared; give focus somewhere that makes sense.
  useEffect(() => {
    if (open) ref.current?.focus({ preventScroll: true });
  }, [open]);

  if (!open) return null;
  const booking = { day, slot };
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
      <svg viewBox="0 0 24 24" className="booking-card-badge size-20 text-emerald-600 dark:text-emerald-500" aria-hidden>
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

      <p className="booking-card-in mt-5 text-xl font-semibold tracking-tight" style={delay(0.3)}>
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

      <div className="mt-6 grid w-full grid-cols-1 gap-3 min-[360px]:grid-cols-2">
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

      <div className="booking-card-in mt-6 flex w-full gap-3" style={delay(0.66)}>
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
          onClick={() =>
            onAddToCalendar
              ? onAddToCalendar(booking)
              : downloadIcs(booking, withName ? `Booking with ${withName}` : "Booking", place, duration)
          }
          className={cn(
            "inline-flex h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            isLiquid ? "bg-white text-black hover:bg-white/90" : "bg-primary text-primary-foreground hover:bg-primary/90",
          )}
        >
          <CalendarPlus aria-hidden className="size-4 shrink-0" />
          <span className="truncate">Add to calendar</span>
        </button>
      </div>
    </div>
  );
}

BookingCard.Month = BookingCardMonth;
BookingCard.Days = BookingCardDays;
BookingCard.Times = BookingCardTimes;
BookingCard.Slots = BookingCardSlots;
BookingCard.Submit = BookingCardSubmit;
BookingCard.Confirmation = BookingCardConfirmation;
