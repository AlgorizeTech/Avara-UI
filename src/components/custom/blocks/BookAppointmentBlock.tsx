"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { createContext, useContext, useEffect, useState } from "react";

// ==========================================
// 1. STAR RATING — a score as five stars
// ==========================================
export interface StarRatingProps {
  /** 0–5, fractional. Partial stars are filled to the fraction. */
  value: number;
  label: string;
  className?: string;
}

export function StarRating({ value, label, className }: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        role="img"
        aria-label={`${label}: ${value.toFixed(2)} out of 5`}
        className="flex gap-0.5"
      >
        {[0, 1, 2, 3, 4].map((i) => {
          const fill = Math.max(0, Math.min(1, value - i));
          return (
            <svg key={i} viewBox="0 0 20 20" className="size-3.5" aria-hidden>
              <defs>
                <linearGradient id={`star-${label}-${i}`}>
                  <stop offset={`${fill * 100}%`} stopColor="currentColor" className="text-amber-500" />
                  <stop offset={`${fill * 100}%`} stopColor="currentColor" className="text-black/15 dark:text-white/20" />
                </linearGradient>
              </defs>
              <path
                fill={`url(#star-${label}-${i})`}
                d="M10 1.6l2.5 5.3 5.8.7-4.3 4 1.1 5.8L10 14.5 4.9 17.4 6 11.6l-4.3-4 5.8-.7z"
              />
            </svg>
          );
        })}
      </span>
      <span className="text-sm font-semibold tabular-nums">{value.toFixed(2)}</span>
    </div>
  );
}

// ==========================================
// 2. BOOKER — days, slots, confirm
// ==========================================
export interface BookingSlot {
  /** As shown, e.g. "9:00 AM". */
  label: string;
  /** Already taken — shown, not selectable. */
  taken?: boolean;
}

export interface Booking {
  day: Date;
  slot: string;
}

type BookerStatus = "idle" | "booking" | "booked";

interface BookerContextValue {
  day: Date | null;
  slot: string | null;
  status: BookerStatus;
  setDay: (d: Date) => void;
  setSlot: (s: string) => void;
  submit: () => Promise<void>;
  reset: () => void;
}

const BookerContext = createContext<BookerContextValue | null>(null);

function useBooker(part: string) {
  const ctx = useContext(BookerContext);
  if (!ctx) throw new Error(`<Booker.${part}> must be inside <Booker>`);
  return ctx;
}

export interface BookerProps {
  /**
   * Called when the person confirms. Return a promise to hold the button in
   * its busy state until the booking is really made.
   */
  onBook?: (booking: Booking) => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
}

/**
 * Holds the chosen day and slot and runs the confirm. Put `Booker.Days`,
 * `Booker.Slots`, `Booker.Submit` and `Booker.Confirmation` inside it in any
 * layout you like.
 *
 * The confirmation covers exactly this element, so make the Booker the padded
 * panel itself (heading included) rather than a child of it — otherwise the
 * cover stops short of the panel's edges. Its corners follow the panel's.
 */
export function Booker({ onBook, children, className }: BookerProps) {
  const [day, setDayState] = useState<Date | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [status, setStatus] = useState<BookerStatus>("idle");

  const setDay = (d: Date) => {
    setDayState(d);
    setSlot(null); // a new day means new availability
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

  const reset = () => {
    setDayState(null);
    setSlot(null);
    setStatus("idle");
  };

  return (
    <BookerContext.Provider value={{ day, slot, status, setDay, setSlot, submit, reset }}>
      <div className={cn("relative rounded-[inherit]", className)}>{children}</div>
    </BookerContext.Provider>
  );
}

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const WEEKDAY = new Intl.DateTimeFormat("en-US", { weekday: "short" });
const MONTH = new Intl.DateTimeFormat("en-US", { month: "long" });
const LONG_DATE = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" });

export interface BookerDaysProps {
  /**
   * Days on offer, in order, paged `count` at a time. Defaults to every day
   * from today up to `horizon` days out.
   */
  days?: Date[];
  /** Days shown per page. */
  count?: number;
  /** How far ahead the default days run, in days from today. */
  horizon?: number;
  /** Days with nothing free — shown, not selectable. */
  unavailable?: (day: Date) => boolean;
  className?: string;
}

const daysFromToday = (length: number) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Array.from({ length }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });
};

/** "September", or "September – October" when the page straddles a month. */
const monthRange = (first?: Date, last?: Date) => {
  if (!first) return "";
  const a = MONTH.format(first);
  const b = last ? MONTH.format(last) : a;
  return a === b ? a : `${a} – ${b}`;
};

function BookerDays({ days: daysProp, count = 7, horizon = 90, unavailable, className }: BookerDaysProps) {
  const { day, setDay } = useBooker("Days");
  // Built on the client only — a server render has no idea what "today" is.
  const [days, setDays] = useState<Date[]>(daysProp ?? []);
  useEffect(() => {
    if (!daysProp) setDays(daysFromToday(horizon));
  }, [daysProp, horizon]);

  // The list starts today (or at the first day handed in), so page 0 is the
  // earliest anyone can go — there is no way to page back into the past.
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(days.length / count));
  const visible = days.slice(page * count, page * count + count);
  const atStart = page === 0;
  const atEnd = page >= pageCount - 1;

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold">{monthRange(visible[0], visible[visible.length - 1])}</p>
        <div className="flex gap-1">
          {[
            { label: "Previous days", Icon: ChevronLeft, disabled: atStart, step: -1 },
            { label: "Next days", Icon: ChevronRight, disabled: atEnd, step: 1 },
          ].map(({ label, Icon, disabled, step }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              disabled={disabled}
              // Clamped, not just disabled: rapid clicks queue up before the
              // disabled state re-renders and would otherwise run off the end.
              onClick={() => setPage((p) => Math.min(Math.max(p + step, 0), pageCount - 1))}
              className={cn(
                "grid size-7 place-items-center rounded-full transition-colors",
                "hover:bg-black/[0.05] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent dark:hover:bg-white/10",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
              )}
            >
              <Icon className="size-4" aria-hidden />
            </button>
          ))}
        </div>
      </div>
      <div role="radiogroup" aria-label="Day" className="mt-3 grid grid-cols-7 gap-1.5">
        {visible.map((d) => {
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
              className={cn(
                "flex flex-col items-center gap-1 rounded-2xl py-2 text-xs transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
                selected
                  ? "bg-[#1d1d1f] text-white dark:bg-white dark:text-[#1d1d1f]"
                  : off
                    ? "text-black/30 line-through dark:text-white/30"
                    : "hover:bg-black/[0.05] dark:hover:bg-white/10",
              )}
            >
              <span className={cn("text-[10px] uppercase", selected ? "opacity-70" : "text-black/50 dark:text-white/50")}>
                {WEEKDAY.format(d).slice(0, 3)}
              </span>
              <span className="text-sm font-semibold tabular-nums">{d.getDate()}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export interface BookerSlotsProps {
  /** Group title, e.g. "Morning". */
  label: string;
  slots: BookingSlot[];
  className?: string;
}

function BookerSlots({ label, slots, className }: BookerSlotsProps) {
  const { day, slot, setSlot } = useBooker("Slots");
  return (
    <div className={className}>
      <p className="text-xs text-black/50 dark:text-white/50">{label}</p>
      <div role="radiogroup" aria-label={`${label} times`} className="mt-2 flex flex-wrap gap-2">
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
                "h-9 rounded-full border px-3.5 text-xs font-medium tabular-nums transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
                selected
                  ? "border-transparent bg-[#1d1d1f] text-white dark:bg-white dark:text-[#1d1d1f]"
                  : s.taken
                    ? "border-transparent text-black/30 line-through dark:text-white/30"
                    : "border-black/10 bg-black/[0.03] hover:bg-black/[0.06] disabled:opacity-50 dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10",
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

export interface BookerSubmitProps {
  children?: React.ReactNode;
  className?: string;
}

function BookerSubmit({ children = "Book now", className }: BookerSubmitProps) {
  const { day, slot, status, submit } = useBooker("Submit");
  const ready = day !== null && slot !== null;
  const busy = status === "booking";
  return (
    <button
      type="button"
      disabled={!ready || busy}
      aria-busy={busy}
      onClick={submit}
      className={cn(
        "inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-violet-600 px-5 text-sm font-medium text-white transition-[background-color,transform] hover:bg-violet-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0b0b0f]",
        className,
      )}
    >
      {busy ? (
        <>
          <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none" />
          Booking
        </>
      ) : ready && day ? (
        `${children}, ${WEEKDAY.format(day)} ${day.getDate()} at ${slot}`
      ) : (
        children
      )}
    </button>
  );
}

export interface BookerConfirmationProps {
  /** Who the appointment is with, e.g. "Dr. Emily Chen". */
  withName: string;
  /** Where, e.g. "Manhattan Health Associates". */
  place?: string;
  className?: string;
}

/**
 * Covers the booker once a booking is made: the check draws itself, then the
 * details rise in. "Book another" clears it.
 */
function BookerConfirmation({ withName, place, className }: BookerConfirmationProps) {
  const { day, slot, status, reset } = useBooker("Confirmation");
  const open = status === "booked" && day !== null && slot !== null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="confirmation"
          role="status"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className={cn(
            "absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-[inherit] bg-white/85 p-6 text-center backdrop-blur-xl dark:bg-[#0b0b0f]/85",
            className,
          )}
        >
          <motion.svg
            viewBox="0 0 64 64"
            className="size-20"
            initial="hidden"
            animate="shown"
            aria-hidden
          >
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              strokeWidth="3"
              className="stroke-violet-600 dark:stroke-violet-400"
              variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 1 } }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <motion.path
              d="M20 33 L28 41 L44 24"
              fill="none"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-violet-600 dark:stroke-violet-400"
              variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 1 } }}
              transition={{ duration: 0.35, delay: 0.45, ease: "easeOut" }}
            />
          </motion.svg>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.35, ease: "easeOut" }}
          >
            <p className="text-lg font-semibold">Booked</p>
            <p className="mt-1 text-sm text-black/70 dark:text-white/70">
              {LONG_DATE.format(day)} at {slot}
            </p>
            <p className="mt-0.5 text-sm text-black/60 dark:text-white/60">
              with {withName}
              {place ? `, ${place}` : ""}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.3 }}
            className="flex w-full max-w-[240px] flex-col gap-2"
          >
            <button
              type="button"
              className="h-10 rounded-full bg-[#1d1d1f] px-4 text-sm font-medium text-white hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:bg-white dark:text-[#1d1d1f] dark:hover:bg-white/90"
            >
              Add to calendar
            </button>
            <button
              type="button"
              onClick={reset}
              className="h-10 rounded-full border border-black/10 px-4 text-sm font-medium hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-white/15 dark:hover:bg-white/10"
            >
              Book another
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

Booker.Days = BookerDays;
Booker.Slots = BookerSlots;
Booker.Submit = BookerSubmit;
Booker.Confirmation = BookerConfirmation;
