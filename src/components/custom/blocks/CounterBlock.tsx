"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { Clock, Minus, Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { getThemeStyles, type CounterTheme } from "./counter-theme";

// ==========================================
// DYNAMIC THEME ENGINE
// ==========================================
export type CounterColor = "indigo" | "rose" | "emerald" | "zinc" | string;
export type CounterType = "stepper" | "animated" | "circular" | "countdown";
/**
 * `outline`, `soft` and `vertical` are stepper layouts; `slide` is the
 * countdown's tile design, where a figure that changes slides out above as
 * the new one comes up from below.
 */
export type CounterVariant = "default" | "outline" | "soft" | "vertical" | "slide";

// The slide countdown's keyframes ship inline so the block stays
// self-contained — no plugin, no globals.css entry.
const KEYFRAMES = `
@keyframes counter-slide-in {
  from { transform: translateY(0.7em); opacity: 0; }
  to { transform: none; opacity: 1; }
}
@keyframes counter-slide-out {
  from { transform: none; opacity: 1; }
  to { transform: translateY(-0.7em); opacity: 0; }
}`;

// ==========================================
// INTERNAL SUB-COMPONENTS
// ==========================================

/** What every counter variant needs to paint itself. */
interface CounterBaseProps {
  /** A row out of the block’s colour table. */
  theme: CounterTheme;
  style?: React.CSSProperties;
  label?: string;
}

interface StepperCounterProps extends CounterBaseProps {
  initialValue: number;
  min: number;
  max: number;
  variant?: CounterVariant;
}

interface AnimatedCounterProps extends CounterBaseProps {
  targetValue: number;
  prefix?: string;
  suffix?: string;
  /** Just the figure, no card — it inherits the surrounding type. */
  bare?: boolean;
  /** Decimal places to show while counting, e.g. 1 for 5.5. */
  decimals?: number;
  /** Wait until the counter is on screen before counting. */
  startOnView?: boolean;
  className?: string;
}

interface CircularCounterProps extends CounterBaseProps {
  targetValue: number;
  suffix?: string;
}

interface CountdownCounterProps extends CounterBaseProps {
  targetDate?: string | number | Date;
  /** What the label becomes once the date has passed. */
  doneLabel?: string;
  variant?: CounterVariant;
}

const StepperCounter = ({
  theme,
  style,
  label,
  initialValue,
  min,
  max,
  variant,
}: StepperCounterProps) => {
  const [count, setCount] = useState(initialValue);
  const containerRef = useRef<HTMLDivElement>(null);

  const animatePop = () => {
    gsap.fromTo(
      containerRef.current,
      { scale: 0.95 },
      { scale: 1, duration: 0.2, ease: "back.out(2)" },
    );
  };

  const handleDec = () => {
    if (count > min) {
      setCount((p: number) => p - 1);
      animatePop();
    }
  };
  const handleInc = () => {
    if (count < max) {
      setCount((p: number) => p + 1);
      animatePop();
    }
  };

  const renderVariant = () => {
    switch (variant) {
      case "outline":
        return (
          <div
            ref={containerRef}
            className="flex items-center rounded-full border-2 border-border p-1 shadow-sm bg-background"
          >
            <button
              onClick={handleDec}
              disabled={count <= min}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-full transition-colors active:scale-95 disabled:opacity-50 shadow-sm",
                theme.bg,
              )}
            >
              <Minus size={18} strokeWidth={2.5} />
            </button>
            <div className="w-14 text-center text-xl font-semibold text-foreground select-none">
              {count}
            </div>
            <button
              onClick={handleInc}
              disabled={count >= max}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-full transition-colors active:scale-95 disabled:opacity-50 shadow-sm",
                theme.bg,
              )}
            >
              <Plus size={18} strokeWidth={2.5} />
            </button>
          </div>
        );
      case "soft":
        return (
          <div
            ref={containerRef}
            className={cn(
              "flex items-center rounded-2xl p-1.5 shadow-inner",
              theme.bgSoft,
            )}
          >
            <button
              onClick={handleDec}
              disabled={count <= min}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-xl bg-card shadow-sm hover:scale-105 active:scale-95 transition-all disabled:opacity-50",
                theme.text,
              )}
            >
              <Minus size={18} strokeWidth={3} />
            </button>
            <div
              className={cn(
                "w-16 text-center text-2xl font-bold select-none",
                theme.text,
              )}
            >
              {count}
            </div>
            <button
              onClick={handleInc}
              disabled={count >= max}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-xl bg-card shadow-sm hover:scale-105 active:scale-95 transition-all disabled:opacity-50",
                theme.text,
              )}
            >
              <Plus size={18} strokeWidth={3} />
            </button>
          </div>
        );
      case "vertical":
        return (
          <div
            ref={containerRef}
            className="flex flex-col items-center bg-muted border border-border rounded-2xl overflow-hidden shadow-sm"
          >
            <button
              onClick={handleInc}
              disabled={count >= max}
              className={cn(
                "w-14 h-12 flex justify-center items-center hover:bg-muted transition-colors active:bg-muted disabled:opacity-50",
                theme.text,
              )}
            >
              <Plus size={20} strokeWidth={2.5} />
            </button>
            <div className="w-14 py-3 text-center font-bold text-xl border-y border-border bg-background select-none">
              {count}
            </div>
            <button
              onClick={handleDec}
              disabled={count <= min}
              className={cn(
                "w-14 h-12 flex justify-center items-center hover:bg-muted transition-colors active:bg-muted disabled:opacity-50",
                theme.text,
              )}
            >
              <Minus size={20} strokeWidth={2.5} />
            </button>
          </div>
        );
      case "default":
      default:
        return (
          <div
            ref={containerRef}
            className="flex items-center bg-card border border-border rounded-xl shadow-sm overflow-hidden p-1"
          >
            <button
              onClick={handleDec}
              disabled={count <= min}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-lg transition-colors active:scale-95 disabled:opacity-50 border border-black/10 dark:border-white/10 shadow-sm",
                theme.bg,
              )}
            >
              <Minus size={18} strokeWidth={2.5} />
            </button>
            <div className="w-16 text-center text-xl font-semibold text-foreground select-none">
              {count}
            </div>
            <button
              onClick={handleInc}
              disabled={count >= max}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-lg transition-colors active:scale-95 disabled:opacity-50 border border-black/10 dark:border-white/10 shadow-sm",
                theme.bg,
              )}
            >
              <Plus size={18} strokeWidth={2.5} />
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center gap-3" style={style}>
      {label && (
        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
          {label}
        </span>
      )}
      {renderVariant()}
    </div>
  );
};

const AnimatedCounter = ({
  theme,
  style,
  label,
  targetValue,
  prefix,
  suffix,
  bare = false,
  decimals = 0,
  startOnView = false,
  className,
}: AnimatedCounterProps) => {
  const [displayVal, setDisplayVal] = useState(0);
  const [armed, setArmed] = useState(!startOnView);
  const rootRef = useRef<HTMLDivElement | HTMLSpanElement>(null);

  // With `startOnView` the count waits for the element to be visible.
  useEffect(() => {
    if (armed) return;
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setArmed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setArmed(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [armed]);

  useEffect(() => {
    if (!armed) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplayVal(targetValue);
      return;
    }
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: targetValue,
      duration: 2,
      ease: "power3.out",
      onUpdate: () => setDisplayVal(obj.val),
    });
    return () => {
      tween.kill();
    };
  }, [armed, targetValue]);

  const formatted = displayVal.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  if (bare) {
    return (
      <span ref={rootRef as React.RefObject<HTMLSpanElement>} className={cn("tabular-nums", className)} style={style}>
        {prefix}
        {formatted}
        {suffix}
      </span>
    );
  }

  return (
    <div
      ref={rootRef as React.RefObject<HTMLDivElement>}
      className={cn(
        "flex flex-col items-center justify-center p-8 bg-card border border-border rounded-2xl shadow-xl w-full max-w-sm",
        className,
      )}
      style={style}
    >
      <div
        className={cn("text-6xl font-bold tracking-tighter mb-2", theme.text)}
      >
        {prefix}
        {formatted}
        {suffix}
      </div>
      {label && (
        <div className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
          {label}
        </div>
      )}
    </div>
  );
};

const CircularCounter = ({
  theme,
  style,
  label,
  targetValue,
  suffix,
}: CircularCounterProps) => {
  const [displayVal, setDisplayVal] = useState(0);
  const circleRef = useRef<SVGCircleElement>(null);
  const size = 160;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: targetValue,
      duration: 2.5,
      ease: "power3.out",
      onUpdate: () => {
        setDisplayVal(Math.floor(obj.val));
        if (circleRef.current) {
          const percent = Math.min(100, Math.max(0, obj.val));
          const offset = circumference - (percent / 100) * circumference;
          circleRef.current.style.strokeDashoffset = offset.toString();
        }
      },
    });
  }, [targetValue, circumference]);

  return (
    <div className="flex flex-col items-center gap-6" style={style}>
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg
          className="absolute inset-0 rotate-[-90deg]"
          width={size}
          height={size}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="fill-none stroke-zinc-100 dark:stroke-zinc-800"
            strokeWidth={strokeWidth}
          />
          <circle
            ref={circleRef}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className={cn("fill-none transition-all duration-75", theme.fill)}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-bold tracking-tighter text-foreground">
            {displayVal}
            {suffix}
          </span>
        </div>
      </div>
      {label && (
        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
          {label}
        </span>
      )}
    </div>
  );
};

type Remaining = { d: number; h: number; m: number; s: number };

const ZERO: Remaining = { d: 0, h: 0, m: 0, s: 0 };

function remainingUntil(target: number): Remaining | null {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  const total = Math.floor(diff / 1000);
  return {
    d: Math.floor(total / 86400),
    h: Math.floor((total % 86400) / 3600),
    m: Math.floor((total % 3600) / 60),
    s: total % 60,
  };
}

/**
 * Ticks once a second. `undefined` until the first client tick, so the server
 * and the first client paint agree; `null` once the date has passed. With no
 * date it counts down three days from mount.
 */
function useCountdown(targetDate?: string | number | Date) {
  const target = targetDate === undefined ? undefined : new Date(targetDate).getTime();
  const [left, setLeft] = useState<Remaining | null | undefined>(undefined);

  useEffect(() => {
    const at = target ?? Date.now() + 3 * 24 * 60 * 60 * 1000;
    const tick = () => setLeft(remainingUntil(at));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return left;
}

const CountdownCounter = ({
  theme,
  style,
  label,
  targetDate,
  doneLabel,
  variant,
}: CountdownCounterProps) => {
  const left = useCountdown(targetDate);
  const over = left === null;
  const caption = over ? doneLabel : label;

  if (variant === "slide") {
    return (
      <div className="flex flex-col items-center" style={style}>
        <style>{KEYFRAMES}</style>
        {caption && <p className="mb-3 text-[13px] font-medium opacity-60">{caption}</p>}
        {!over && (
          <div className="flex items-center gap-2" role="timer" aria-live="off">
            <SlideFigure themeText={theme.text} value={left?.d ?? null} unit="days" />
            <SlideFigure themeText={theme.text} value={left?.h ?? null} unit="hours" />
            <SlideFigure themeText={theme.text} value={left?.m ?? null} unit="minutes" />
            <SlideFigure themeText={theme.text} value={left?.s ?? null} unit="seconds" />
          </div>
        )}
      </div>
    );
  }

  const timeLeft = left ?? ZERO;

  return (
    <div className="flex flex-col items-center gap-8" style={style}>
      {caption && (
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted border border-border text-sm font-semibold text-muted-foreground">
          <Clock size={16} className={theme.text} /> {caption}
        </div>
      )}
      <div className="flex gap-3 sm:gap-4">
        <TimeUnit themeText={theme.text} value={timeLeft.d} unit="Days" />
        <TimeUnit themeText={theme.text} value={timeLeft.h} unit="Hours" />
        <TimeUnit themeText={theme.text} value={timeLeft.m} unit="Mins" />
        <TimeUnit themeText={theme.text} value={timeLeft.s} unit="Secs" />
      </div>
    </div>
  );
};

// ==========================================
// MAIN EXPORT
// ==========================================

export interface CounterProps {
  type?: CounterType;
  /** Stepper layouts, plus `slide` for the countdown. */
  variant?: CounterVariant;
  color?: CounterColor;
  label?: string;
  initialValue?: number;
  min?: number;
  max?: number;
  targetValue?: number;
  prefix?: string;
  suffix?: string;
  /** Countdown only: when it reaches zero. Defaults to three days from mount. */
  targetDate?: Date | string | number;
  /** Countdown only: what the label becomes once the date has passed. */
  doneLabel?: string;
  /** Animated only: just the figure, no card — it inherits the surrounding type. */
  bare?: boolean;
  /** Animated only: decimal places, e.g. 1 for 5.5. */
  decimals?: number;
  /** Animated only: wait until the counter is on screen before counting. */
  startOnView?: boolean;
  /** Animated only: classes for the figure (bare) or the card. */
  className?: string;
}

/**
 * Defined at module scope on purpose: declared inside CounterBlock it would be
 * a new component type on every tick, remounting all four digits each second.
 */
function TimeUnit({
  value,
  unit,
  themeText,
}: {
  value: number;
  unit: string;
  themeText: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-card border border-border rounded-2xl shadow-lg mb-3">
        <span
          className={cn(
            "text-2xl sm:text-3xl font-bold tracking-tighter",
            themeText,
          )}
        >
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-widest">
        {unit}
      </span>
    </div>
  );
}

/** One tile of the slide countdown. `null` paints "--" before the first tick. */
function SlideFigure({
  value,
  unit,
  themeText,
}: {
  value: number | null;
  unit: string;
  themeText: string;
}) {
  const text = value === null ? "--" : String(value).padStart(2, "0");
  // A figure that changes keeps its old text mounted for one pass so it can
  // slide out above while the new one comes up from below; the others hold
  // still. Nothing moves on the first paint.
  const [shown, setShown] = useState({ current: text, previous: null as string | null });
  if (shown.current !== text) setShown({ current: text, previous: shown.current });

  return (
    <div className="flex min-w-[3.75rem] flex-col items-center rounded-xl bg-black/[0.045] px-3 py-2.5 dark:bg-white/[0.07]">
      <span
        className={cn(
          "relative block h-[1.75rem] overflow-hidden text-[1.5rem] font-semibold leading-[1.75rem] tabular-nums tracking-[-0.03em]",
          themeText,
        )}
      >
        {shown.previous !== null && (
          <span
            key={`out-${shown.previous}`}
            aria-hidden
            className="absolute inset-0 block animate-[counter-slide-out_0.32s_cubic-bezier(0.16,1,0.3,1)_both] motion-reduce:hidden"
            onAnimationEnd={() => setShown((s) => ({ ...s, previous: null }))}
          >
            {shown.previous}
          </span>
        )}
        <span
          className={cn(
            "block",
            shown.previous !== null &&
              "animate-[counter-slide-in_0.32s_cubic-bezier(0.16,1,0.3,1)_both] motion-reduce:animate-none",
          )}
        >
          {text}
        </span>
      </span>
      <span className="mt-1 text-[11px] font-medium opacity-55">{unit}</span>
    </div>
  );
}

export function CounterBlock({
  type = "stepper",
  variant = "default",
  color = "primary",
  label = "Counter",
  initialValue = 1,
  min = 0,
  max = 100,
  targetValue = 100,
  prefix = "",
  suffix = "",
  targetDate,
  doneLabel = "Time's up",
  bare,
  decimals,
  startOnView,
  className,
}: CounterProps) {
  const { theme, style } = getThemeStyles(color);

  if (type === "stepper")
    return (
      <StepperCounter
        theme={theme}
        style={style}
        label={label}
        initialValue={initialValue}
        min={min}
        max={max}
        variant={variant}
      />
    );
  if (type === "animated")
    return (
      <AnimatedCounter
        theme={theme}
        style={style}
        label={label}
        targetValue={targetValue}
        prefix={prefix}
        suffix={suffix}
        {...(bare !== undefined ? { bare } : {})}
        {...(decimals !== undefined ? { decimals } : {})}
        {...(startOnView !== undefined ? { startOnView } : {})}
        {...(className !== undefined ? { className } : {})}
      />
    );
  if (type === "circular")
    return (
      <CircularCounter
        theme={theme}
        style={style}
        label={label}
        targetValue={targetValue}
        suffix={suffix}
      />
    );
  if (type === "countdown")
    return (
      <CountdownCounter
        theme={theme}
        style={style}
        label={label}
        variant={variant}
        doneLabel={doneLabel}
        {...(targetDate !== undefined ? { targetDate } : {})}
      />
    );

  return null;
}
