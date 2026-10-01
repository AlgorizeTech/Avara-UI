"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { AlertCircle, ArrowRight, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "./Button";
import { InputBlock } from "./InputBlock";
import { AvatarStack } from "./AvatarStackBlock";
import { CopyButton } from "./CopyButtonBlock";
import { CounterBlock } from "./CounterBlock";
import { Progress } from "./ProgressBlock";
import { useCountUp } from "./progress-hooks";

// ==========================================
// WAITLIST
// A pre-launch sign-up in three layouts. `card` is a compact card with the
// field over the button; `launch` puts a brand mark and a live countdown to
// the opening date (the Counter block's slide countdown) over the form on a
// wide panel; `queue` sets the form as a pill on a soft ground with the faces
// of who is already in and a bar of the spots claimed. Whichever layout, the
// form becomes the reader's place in line when your promise resolves — a
// number that counts up, and a link to share to move up. One reveal when the
// section first appears; after that only the countdown's seconds and the
// reader's own actions move anything.
// ==========================================

export type WaitlistVariant = "card" | "launch" | "queue";

interface WaitlistContextValue {
  variant: WaitlistVariant;
  reduced: boolean;
}

const WaitlistContext = createContext<WaitlistContextValue>({ variant: "card", reduced: false });

// Every Reveal rises in turn — 0.05s in, then 0.1s apart, `--waitlist-i` being
// its place in line — once the section is shown. The form gives way to the
// thank-you, whose tick then draws itself. With reduced motion nothing moves.
const STYLES = `
@keyframes waitlist-rise { from { opacity: 0; transform: translateY(16px); } }
@keyframes waitlist-form-out { to { opacity: 0; transform: translateY(-6px); } }
@keyframes waitlist-done-in { from { opacity: 0; transform: translateY(8px) scale(0.98); } }
@keyframes waitlist-check { from { stroke-dasharray: 0 1; } to { stroke-dasharray: 1 1; } }
@media (prefers-reduced-motion: no-preference) {
  .waitlist-reveal:not([data-shown]) [data-reveal] { opacity: 0; transform: translateY(16px); }
  .waitlist-reveal[data-shown] [data-reveal] {
    animation: waitlist-rise 0.65s cubic-bezier(0.16, 1, 0.3, 1) calc(0.05s + var(--waitlist-i, 0) * 0.1s) backwards;
  }
}
.waitlist-form-out { animation: waitlist-form-out 0.2s cubic-bezier(0, 0, 0.58, 1) forwards; }
.waitlist-done-in { animation: waitlist-done-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) backwards; }
.waitlist-check { animation: waitlist-check 0.45s cubic-bezier(0, 0, 0.58, 1) 0.2s backwards; }
`;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (onChange: () => void) => {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
/** The visitor's reduced-motion setting; false while server-rendering. */
function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

const subscribeNothing = () => () => {};
/** False in the server render and while hydrating, true from then on. */
function useHydrated() {
  return useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false,
  );
}

/** Animates as one child of the section's staggered reveal. */
function Reveal({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={className} data-reveal="">
      {children}
    </div>
  );
}

/** The ring colour between stacked faces, matched to each layout's surface. */
const RING: Record<WaitlistVariant, string> = {
  card: "ring-card",
  launch: "ring-card",
  queue: "ring-background",
};

// ------------------------------------------
// Mark — the brand, in a square of the accent
// ------------------------------------------
function Mark({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Reveal className="mb-6 flex justify-center">
      <div
        className={cn(
          "grid size-12 place-items-center overflow-hidden rounded-[14px] bg-primary text-[1.25rem] font-semibold text-primary-foreground shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_20px_-10px_color-mix(in_oklab,var(--primary)_60%,transparent)]",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </Reveal>
  );
}

// ------------------------------------------
// Countdown — days, hours, minutes and seconds to the opening date
// ------------------------------------------
export interface WaitlistCountdownProps extends React.HTMLAttributes<HTMLDivElement> {
  /** When the doors open. */
  date: Date | string;
  /** Line above the figures. */
  label?: string;
  /** What to say once the date has passed. */
  doneLabel?: string;
}

/** The counter's slide countdown, in the section's own text colour. */
function Countdown({ date, label = "Launching in", doneLabel = "Now live", className, ...props }: WaitlistCountdownProps) {
  return (
    <Reveal className="mb-8">
      <div className={cn("flex flex-col items-center", className)} {...props}>
        <CounterBlock type="countdown" variant="slide" color="inherit" targetDate={date} label={label} doneLabel={doneLabel} />
      </div>
    </Reveal>
  );
}

// ------------------------------------------
// Heading, Intro
// ------------------------------------------
function Heading({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  const { variant } = useContext(WaitlistContext);
  return (
    <Reveal>
      <h2
        className={cn(
          "text-center font-sans font-semibold tracking-[-0.03em]",
          variant === "card"
            ? "text-[1.5rem] leading-[1.15]"
            : "text-[2rem] leading-[1.08] sm:text-[2.75rem]",
          className,
        )}
        {...props}
      >
        {children}
      </h2>
    </Reveal>
  );
}

function Intro({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const { variant } = useContext(WaitlistContext);
  return (
    <Reveal>
      <p
        className={cn(
          "mx-auto text-center leading-[1.65] opacity-65",
          variant === "card" ? "mt-2 max-w-xs text-[14px]" : "mt-4 max-w-md text-[15px]",
          className,
        )}
        {...props}
      >
        {children}
      </p>
    </Reveal>
  );
}

// ------------------------------------------
// Form — becomes the reader's place in line
// ------------------------------------------
export interface WaitlistFormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  placeholder?: string;
  /** Button label. */
  action?: string;
  /**
   * Called on submit. Return a promise to keep the button busy. Resolve with a
   * number to show it as the reader's place in line; resolve with nothing for
   * the thank-you alone; throw an Error to stay on the form with its message
   * under the field.
   */
  onJoin?: (email: string) => void | number | Promise<void | number>;
  successTitle?: string;
  successText?: string;
  /** Word after the number, e.g. "in line". */
  positionLabel?: string;
  /** A referral link. Given, the thank-you offers to copy it. */
  shareUrl?: string;
  shareLabel?: string;
  shareHint?: string;
  /** A small line under the form — what joining means. */
  note?: string;
}

function Position({ value, label }: { value: number; label: string }) {
  const { reduced } = useContext(WaitlistContext);
  const shown = useCountUp(value, { duration: 1400, enabled: !reduced });
  return (
    <p className="mt-3 flex items-baseline gap-2">
      <span className="text-[3rem] font-semibold leading-none tabular-nums tracking-[-0.04em] sm:text-[3.5rem]">
        <span className="opacity-30">#</span>
        {Math.round(shown).toLocaleString()}
      </span>
      <span className="text-[14px] font-medium opacity-55">{label}</span>
    </p>
  );
}

function Form({
  placeholder = "name@email.com",
  action = "Get on the list",
  onJoin,
  successTitle = "Your spot is saved",
  successText = "Expect an email from us as soon as your invite opens up.",
  positionLabel = "in line",
  shareUrl,
  shareLabel = "Copy referral link",
  shareHint = "Each friend who joins bumps you forward.",
  note,
  className,
  ...props
}: WaitlistFormProps) {
  const { variant, reduced } = useContext(WaitlistContext);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [done, setDone] = useState<{ position?: number } | null>(null);
  // The form plays its way out before the thank-you comes in.
  const [formGone, setFormGone] = useState(false);
  const leaving = done !== null && !formGone && !reduced;
  useEffect(() => {
    if (!leaving) return;
    const t = window.setTimeout(() => setFormGone(true), 300);
    return () => window.clearTimeout(t);
  }, [leaving]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    if (!email) {
      setError("Add your email address first.");
      return;
    }
    setBusy(true);
    setError(undefined);
    try {
      const result = await onJoin?.(email);
      setDone({ position: typeof result === "number" ? result : undefined });
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "Something went wrong. Please retry.");
    } finally {
      setBusy(false);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(undefined);
  };

  const pill = variant === "queue";
  const stacked = variant === "card";

  return (
    <Reveal className={cn("mx-auto w-full", stacked ? "mt-6" : "mt-8 max-w-[28rem]")}>
      {done && !leaving ? (
        <div
          key="done"
          role="status"
          className={cn(
            !reduced && "waitlist-done-in",
            "rounded-2xl bg-card p-5 text-left text-card-foreground",
            stacked
              ? "border border-border"
              : "shadow-[0_1px_2px_rgba(0,0,0,0.05),0_12px_32px_-16px_rgba(0,0,0,0.25)] dark:shadow-none dark:ring-1 dark:ring-foreground/10",
          )}
        >
          <p className="flex items-center gap-2.5 text-[15px] font-semibold leading-tight">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
              <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} className={reduced ? undefined : "waitlist-check"} />
              </svg>
            </span>
            {successTitle}
          </p>
          {done.position !== undefined && <Position value={done.position} label={positionLabel} />}
          <p className="mt-2 text-[13px] leading-relaxed opacity-60">{successText}</p>
          {shareUrl && (
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
              <CopyButton value={shareUrl} label={shareLabel} copiedLabel="Link copied" variant="soft" size="sm" />
              <span className="text-[12px] opacity-55">{shareHint}</span>
            </div>
          )}
        </div>
      ) : (
        <div
          key="form"
          className={leaving ? "waitlist-form-out" : undefined}
          onAnimationEnd={(e) => {
            if (leaving && e.target === e.currentTarget) setFormGone(true);
          }}
        >
          <form onSubmit={submit} noValidate className={className} {...props}>
            {pill ? (
              <>
                <div
                  className={cn(
                    "flex items-center gap-1 rounded-full bg-card p-1.5 transition-shadow duration-300",
                    "shadow-[0_1px_2px_rgba(0,0,0,0.05),0_8px_24px_-12px_rgba(0,0,0,0.2)] focus-within:shadow-[0_1px_2px_rgba(0,0,0,0.05),0_12px_32px_-12px_rgba(0,0,0,0.28)]",
                    "dark:shadow-none dark:ring-1 dark:ring-foreground/15 dark:backdrop-blur dark:focus-within:shadow-none dark:focus-within:ring-foreground/30",
                    error && "ring-1 ring-red-500/60 dark:ring-red-400/60",
                  )}
                >
                  <Mail size={16} className="ml-3 shrink-0 opacity-40" aria-hidden />
                  {/* The library input with its own box made invisible, so the pill is the field. */}
                  <InputBlock
                    type="email"
                    variant="filled"
                    inputSize="md"
                    value={email}
                    onChange={onChange}
                    placeholder={placeholder}
                    aria-label="Email address"
                    aria-invalid={error ? true : undefined}
                    autoComplete="email"
                    className="min-w-0 flex-1 gap-0 [&>div>div]:h-10 [&>div>div]:rounded-full [&>div>div]:border-0 [&>div>div]:bg-transparent [&>div>div]:px-2 [&>div>div]:shadow-none [&>div>div]:focus-within:bg-transparent [&>div>div]:focus-within:ring-0 dark:[&_input]:placeholder:text-foreground/45"
                  />
                  <Button
                    type="submit"
                    variant="default"
                    size="sm"
                    loading={busy}
                    iconRight={<ArrowRight size={14} />}
                    className="h-10 shrink-0 rounded-full px-4 text-[13px] shadow-none"
                  >
                    {action}
                  </Button>
                </div>
                {error && (
                  <p role="alert" className="mt-2 flex items-center justify-center gap-1.5 text-[12px] text-red-600 dark:text-red-400">
                    <AlertCircle size={13} /> {error}
                  </p>
                )}
              </>
            ) : (
              <div className={cn("flex gap-3", stacked ? "flex-col" : "flex-col sm:flex-row sm:items-start")}>
                {/* The library input owns the error line, so a wrong address is reported beside the field. */}
                <InputBlock
                  type="email"
                  inputSize="md"
                  value={email}
                  onChange={onChange}
                  placeholder={placeholder}
                  error={error}
                  disabled={busy}
                  aria-label="Email address"
                  autoComplete="email"
                  className={cn("min-w-0", stacked ? "w-full" : "flex-1")}
                />
                <Button
                  type="submit"
                  variant="default"
                  size="default"
                  loading={busy}
                  iconRight={<ArrowRight size={15} />}
                  className={cn("h-11 shrink-0", stacked ? "w-full" : "w-full sm:w-auto")}
                >
                  {action}
                </Button>
              </div>
            )}
            {note && <p className="mt-3 text-center text-[12px] leading-relaxed opacity-50">{note}</p>}
          </form>
        </div>
      )}
    </Reveal>
  );
}

// ------------------------------------------
// Proof — the faces of who is already in, and a line
// ------------------------------------------
export interface WaitlistProofProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: string[];
}

function Proof({ avatars, className, children, ...props }: WaitlistProofProps) {
  const { variant } = useContext(WaitlistContext);
  return (
    <Reveal>
      <div
        className={cn(
          "flex items-center justify-center gap-3 text-[13px] font-medium text-foreground/65",
          variant === "card" ? "mt-5" : "mt-7",
          className,
        )}
        {...props}
      >
        <AvatarStack
          size="sm"
          max={4}
          spreadOnHover={false}
          ringClassName={RING[variant]}
          avatars={avatars.map((src) => ({ src }))}
        />
        <span>{children}</span>
      </div>
    </Reveal>
  );
}

// ------------------------------------------
// Spots — how many early places are gone
// ------------------------------------------
export interface WaitlistSpotsProps extends React.HTMLAttributes<HTMLDivElement> {
  claimed: number;
  total: number;
  /** The line over the bar. Defaults to "{claimed} of {total} early places taken". */
  children?: React.ReactNode;
}

function Spots({ claimed, total, className, children, ...props }: WaitlistSpotsProps) {
  const { reduced } = useContext(WaitlistContext);
  const shown = useCountUp(claimed, { duration: 1400, enabled: !reduced, range: total });
  return (
    <Reveal className={cn("mx-auto mt-9 w-full max-w-[22rem]", className)}>
      <div {...props}>
        <p className="mb-2.5 flex items-baseline justify-between text-[13px] font-medium">
          <span className="tabular-nums">
            {children ?? (
              <>
                <span className="text-[15px] font-semibold">{Math.round(shown).toLocaleString()}</span>
                <span className="opacity-55"> of {total.toLocaleString()} early places taken</span>
              </>
            )}
          </span>
        </p>
        <Progress value={claimed} max={total} barSize="sm" animate={!reduced} duration={1400} />
      </div>
    </Reveal>
  );
}

// ------------------------------------------
// Root
// ------------------------------------------
export interface WaitlistProps extends React.HTMLAttributes<HTMLElement> {
  variant?: WaitlistVariant;
  /** Accent for the mark, button and bar; defaults to the theme's primary. */
  accent?: string;
  reveal?: "in-view" | "immediate";
  children: React.ReactNode;
}

export function Waitlist({
  variant = "card",
  accent,
  reveal = "in-view",
  className,
  style,
  children,
  ...props
}: WaitlistProps) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  const [shown, setShown] = useState(false);

  // Each Reveal's place in line, in the order they are on the page — the
  // parts can come in any order.
  useLayoutEffect(() => {
    containerRef.current?.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el, i) => {
      el.style.setProperty("--waitlist-i", String(i));
    });
  });

  // Shown on mount (never in the server HTML, so the rise still plays), or
  // the first time 30% of it is in view. Once shown it stays shown.
  if (reveal === "immediate" && hydrated && !shown) setShown(true);
  useEffect(() => {
    const el = containerRef.current;
    if (reveal === "immediate" || shown || !el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShown(true);
        io.disconnect();
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reveal, shown]);

  return (
    <WaitlistContext.Provider value={{ variant, reduced }}>
      <section
        className={cn(
          "relative isolate w-full text-foreground",
          // `queue` paints its own soft ground; the other two are a card or a
          // panel on whatever the page provides.
          variant === "queue" && "overflow-hidden bg-background",
          className,
        )}
        style={accent ? ({ ...style, "--primary": accent } as React.CSSProperties) : style}
        {...props}
      >
        <style>{STYLES}</style>
        <div
          ref={containerRef}
          data-shown={shown || undefined}
          className={cn(
            "waitlist-reveal mx-auto flex flex-col items-stretch",
            variant === "card" &&
              "max-w-sm rounded-2xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_30px_-18px_rgba(0,0,0,0.25)] dark:shadow-none sm:p-7",
            variant === "launch" &&
              "max-w-4xl rounded-[28px] border border-border bg-card px-6 py-12 sm:px-12 sm:py-16",
            variant === "queue" && "max-w-xl px-6 py-16 sm:py-24",
          )}
        >
          {variant === "launch" ? <div className="mx-auto flex w-full max-w-xl flex-col items-stretch">{children}</div> : children}
        </div>
      </section>
    </WaitlistContext.Provider>
  );
}

Waitlist.Mark = Mark;
Waitlist.Countdown = Countdown;
Waitlist.Heading = Heading;
Waitlist.Intro = Intro;
Waitlist.Form = Form;
Waitlist.Proof = Proof;
Waitlist.Spots = Spots;

export default Waitlist;
