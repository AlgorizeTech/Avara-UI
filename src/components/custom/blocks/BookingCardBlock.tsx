"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { createContext, useContext, useEffect, useState } from "react";

// ==========================================
// BOOKING CARD — days, slots, confirm
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

type BookingCardStatus = "idle" | "booking" | "booked";

interface BookingCardContextValue {
  day: Date | null;
  slot: string | null;
  status: BookingCardStatus;
  setDay: (d: Date) => void;
  setSlot: (s: string) => void;
  submit: () => Promise<void>;
  reset: () => void;
}

const BookingCardContext = createContext<BookingCardContextValue | null>(null);

function useBookingCard(part: string) {
  const ctx = useContext(BookingCardContext);
  if (!ctx) throw new Error(`<BookingCard.${part}> must be inside <BookingCard>`);
  return ctx;
}

export interface BookingCardProps {
  /**
   * Called when the person confirms. Return a promise to hold the button in
   * its busy state until the booking is really made.
   */
  onBook?: (booking: Booking) => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
}

/**
 * Holds the chosen day and slot and runs the confirm. Put `BookingCard.Days`,
 * `BookingCard.Slots`, `BookingCard.Submit` and `BookingCard.Confirmation`
 * inside it in any layout you like.
 *
 * The card is surface-neutral: it draws no background of its own, so it can
 * sit inside any panel — a glass slab, a plain bordered card, a modal. The
 * confirmation covers exactly this element, so make the BookingCard the padded
 * panel itself (heading included) rather than a child of it — otherwise the
 * cover stops short of the panel's edges. Its corners follow the panel's.
 */
export function BookingCard({ onBook, children, className }: BookingCardProps) {
  const [day, setDayState] = useState<Date | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [status, setStatus] = useState<BookingCardStatus>("idle");

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
    <BookingCardContext.Provider value={{ day, slot, status, setDay, setSlot, submit, reset }}>
      <div className={cn("relative rounded-[inherit]", className)}>{children}</div>
    </BookingCardContext.Provider>
  );
}

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const WEEKDAY = new Intl.DateTimeFormat("en-US", { weekday: "short" });
const MONTH = new Intl.DateTimeFormat("en-US", { month: "long" });
const LONG_DATE = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" });

export interface BookingCardDaysProps {
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

function BookingCardDays({ days: daysProp, count = 7, horizon = 90, unavailable, className }: BookingCardDaysProps) {
  const { day, setDay } = useBookingCard("Days");
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
                "hover:bg-foreground/5 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
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
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                selected
                  ? "bg-primary text-primary-foreground"
                  : off
                    ? "text-foreground/30 line-through"
                    : "hover:bg-foreground/5",
              )}
            >
              <span className={cn("text-[10px] uppercase", selected ? "opacity-70" : "text-foreground/50")}>
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

export interface BookingCardSlotsProps {
  /** Group title, e.g. "Morning". */
  label: string;
  slots: BookingSlot[];
  className?: string;
}

function BookingCardSlots({ label, slots, className }: BookingCardSlotsProps) {
  const { day, slot, setSlot } = useBookingCard("Slots");
  return (
    <div className={className}>
      <p className="text-xs text-foreground/50">{label}</p>
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
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                selected
                  ? "border-transparent bg-primary text-primary-foreground"
                  : s.taken
                    ? "border-transparent text-foreground/30 line-through"
                    : "border-foreground/10 bg-foreground/[0.03] hover:bg-foreground/[0.06] disabled:opacity-50",
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

export interface BookingCardSubmitProps {
  children?: React.ReactNode;
  className?: string;
}

function BookingCardSubmit({ children = "Book now", className }: BookingCardSubmitProps) {
  const { day, slot, status, submit } = useBookingCard("Submit");
  const ready = day !== null && slot !== null;
  const busy = status === "booking";
  return (
    <button
      type="button"
      disabled={!ready || busy}
      aria-busy={busy}
      onClick={submit}
      className={cn(
        "inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-[background-color,transform] hover:bg-primary/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      {busy ? (
        <>
          <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground motion-reduce:animate-none" />
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

export interface BookingCardConfirmationProps {
  /** Who the appointment is with, e.g. "Dr. Emily Chen". */
  withName: string;
  /** Where, e.g. "Manhattan Health Associates". */
  place?: string;
  className?: string;
}

/**
 * Covers the card once a booking is made: the check draws itself, then the
 * details rise in. "Book another" clears it.
 */
function BookingCardConfirmation({ withName, place, className }: BookingCardConfirmationProps) {
  const { day, slot, status, reset } = useBookingCard("Confirmation");
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
            "absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-[inherit] bg-card/85 p-6 text-center backdrop-blur-xl",
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
              className="stroke-primary"
              variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 1 } }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <motion.path
              d="M20 33 L28 41 L44 24"
              fill="none"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-primary"
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
            <p className="mt-1 text-sm text-foreground/70">
              {LONG_DATE.format(day)} at {slot}
            </p>
            <p className="mt-0.5 text-sm text-foreground/60">
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
              className="h-10 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Add to calendar
            </button>
            <button
              type="button"
              onClick={reset}
              className="h-10 rounded-full border border-foreground/10 px-4 text-sm font-medium hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Book another
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

BookingCard.Days = BookingCardDays;
BookingCard.Slots = BookingCardSlots;
BookingCard.Submit = BookingCardSubmit;
BookingCard.Confirmation = BookingCardConfirmation;
