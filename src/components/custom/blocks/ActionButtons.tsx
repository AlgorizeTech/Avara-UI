"use client";

import * as React from "react";
import gsap from "gsap";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleAlert,
  Download,
  GitBranch,
  Loader2,
  Lock,
  Minus,
  Plus,
  Rocket,
  RotateCcw,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { bezierEase } from "./gsap-motion";
import { springEase } from "./motion-curves";

const EASE_OUT_FAST = [0.23, 1, 0.32, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const TRAVEL = [0.65, 0, 0.35, 1] as const;
const CREEP_EASE = [0.25, 0.6, 0.35, 1] as const;

const cssCurve = (c: readonly number[]) => `cubic-bezier(${c.join(", ")})`;
const CSS_OUT = cssCurve(EASE_OUT);
const CSS_TRAVEL = cssCurve(TRAVEL);
const CSS_STANDARD = "cubic-bezier(0.4, 0, 0.2, 1)";

/** The same curves as GSAP eases, so CSS and GSAP motion match. */
const gEase = {
  outFast: bezierEase(EASE_OUT_FAST),
  out: bezierEase(EASE_OUT),
  creep: bezierEase(CREEP_EASE),
  circIn: bezierEase([0.55, 0, 1, 0.45]),
  drop: bezierEase([0.5, 0, 0.75, 0]),
};

const SPRING_POP = springEase({ stiffness: 420, damping: 24 });
const SPRING_TWIRL = springEase({ stiffness: 380, damping: 18 });
const SPRING_RETURN = springEase({ stiffness: 520, damping: 42 });

const POP_FROM = { scale: 0.4, rotation: -30 } as const;
const TWIRL_FROM = { scale: 0.7, rotation: -72 } as const;

/* -------------------------------------------------------------------------- */
/* Motion helpers                                                             */
/* -------------------------------------------------------------------------- */

function usePrefersReducedMotion() {
  const [reduce, setReduce] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduce;
}

type TransitionPart = readonly [
  property: string,
  ms: number,
  ease?: string,
  delayMs?: number,
];

/** CSS transition longhands from a list of `[property, ms, ease, delay]`. */
function transition(...parts: TransitionPart[]): React.CSSProperties {
  return {
    transitionProperty: parts.map((p) => p[0]).join(", "),
    transitionDuration: parts.map((p) => `${p[1]}ms`).join(", "),
    transitionTimingFunction: parts.map((p) => p[2] ?? CSS_OUT).join(", "),
    transitionDelay: parts.map((p) => `${p[3] ?? 0}ms`).join(", "),
  };
}

/** A short left-right shake — the "that failed" cue. */
function shake(el: Element | null, amplitude: number, duration: number) {
  if (!el) return;
  gsap.killTweensOf(el, "x");
  gsap.to(el, {
    keyframes: [
      { x: -amplitude },
      { x: amplitude },
      { x: -amplitude * 0.75 },
      { x: amplitude * 0.75 },
      { x: 0 },
    ],
    ease: "none",
    easeEach: "power1.out",
    duration,
  });
}

/** Tween `target` and resolve when it lands. Replaces any tween already on it. */
function tweenTo(target: object, vars: gsap.TweenVars): Promise<void> {
  return new Promise((resolve) => {
    gsap.to(target, { ...vars, overwrite: true, onComplete: () => resolve() });
  });
}

/** True once the element has scrolled into view (and stays true). */
function useInViewOnce(
  ref: React.RefObject<Element | null>,
  rootMargin: string,
) {
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin, seen]);
  return seen;
}

/**
 * Slides an element from where it was to where it is now when its layout
 * position changes (FLIP). Used where a label swap changes the width of a
 * centred group.
 */
function useGlide<T extends HTMLElement>(key: unknown, reduce: boolean) {
  const ref = React.useRef<T>(null);
  const before = React.useRef<number | null>(null);
  React.useLayoutEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const shift = Number(gsap.getProperty(el, "x")) || 0;
    gsap.killTweensOf(el, "x");
    gsap.set(el, { x: 0 });
    const left =
      el.getBoundingClientRect().left - parent.getBoundingClientRect().left;
    const previous = before.current;
    before.current = left;
    if (previous === null || reduce) return;
    const delta = previous + shift - left;
    if (Math.abs(delta) < 0.5) return;
    gsap.fromTo(el, { x: delta }, { x: 0, duration: 0.32, ease: gEase.out });
  }, [key, reduce]);
  return ref;
}

function useElementRadius(
  ref: React.RefObject<HTMLElement | null>,
  fallback = 10,
) {
  const [radius, setRadius] = React.useState(fallback);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => {
      const parsed = parseFloat(getComputedStyle(el).borderTopLeftRadius);
      if (!Number.isNaN(parsed)) setRadius(parsed);
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style", "data-radius-zero", "class"],
    });
    return () => {
      ro.disconnect();
      mo.disconnect();
    };
  }, [ref]);
  return radius;
}

/* -------------------------------------------------------------------------- */
/* Presence — one slot whose content swaps with an exit and an enter          */
/* -------------------------------------------------------------------------- */

type PresenceMotion = {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  out: gsap.TweenVars;
};

type PresenceProps = PresenceMotion & {
  /** Identity of what shows. A new id swaps the content; `null` shows nothing. */
  id: string | number | null;
  as?: "span" | "div" | "p";
  className?: string;
  /** Takes the leaving layer out of flow so the arriving one sizes the box. */
  popLayout?: boolean;
  children?: React.ReactNode;
};

type Leaving = {
  uid: number;
  node: React.ReactNode;
  className?: string;
};

function EnterLayer({
  as,
  enter,
  from,
  to,
  className,
  children,
}: {
  as: NonNullable<PresenceProps["as"]>;
  enter: boolean;
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  className?: string;
  children?: React.ReactNode;
}) {
  const ref = React.useRef<HTMLElement>(null);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!enter || !el) return;
    const tween = gsap.fromTo(el, from, to);
    return () => {
      tween.kill();
    };
    // Runs once, when the layer arrives.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

function ExitLayer({
  as,
  popLayout,
  out,
  className,
  onDone,
  children,
}: {
  as: NonNullable<PresenceProps["as"]>;
  popLayout?: boolean;
  out: gsap.TweenVars;
  className?: string;
  onDone: () => void;
  children?: React.ReactNode;
}) {
  const ref = React.useRef<HTMLElement>(null);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tween = gsap.to(el, { ...out, onComplete: onDone });
    return () => {
      tween.kill();
    };
    // Runs once, when the layer starts leaving.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      aria-hidden
      className={cn(className, popLayout && "absolute")}
      style={{ pointerEvents: "none" }}
    >
      {children}
    </Tag>
  );
}

function Presence({
  id,
  as = "span",
  className,
  popLayout,
  from,
  to,
  out,
  children,
}: PresenceProps) {
  const [leaving, setLeaving] = React.useState<Leaving[]>([]);
  const last = React.useRef({ id, node: children, className });
  const live = React.useRef(false);
  const counter = React.useRef(0);

  React.useLayoutEffect(() => {
    const previous = last.current;
    if (previous.id !== null && previous.id !== id) {
      const entry: Leaving = {
        uid: ++counter.current,
        node: previous.node,
        className: previous.className,
      };
      setLeaving((list) => [...list, entry]);
    }
    last.current = { id, node: children, className };
    live.current = true;
  }, [id, children, className]);

  return (
    <>
      {leaving.map((layer) => (
        <ExitLayer
          key={`leaving-${layer.uid}`}
          as={as}
          popLayout={popLayout}
          out={out}
          className={layer.className}
          onDone={() =>
            setLeaving((list) => list.filter((l) => l.uid !== layer.uid))
          }
        >
          {layer.node}
        </ExitLayer>
      ))}
      {id !== null && (
        <EnterLayer
          key={`id-${id}`}
          as={as}
          enter={live.current}
          from={from}
          to={to}
          className={className}
        >
          {children}
        </EnterLayer>
      )}
    </>
  );
}

/** Fades and slides content a few pixels — the default label swap. */
const slideSwap = (reduce: boolean): PresenceMotion => ({
  from: { opacity: 0, y: reduce ? 0 : 4 },
  to: {
    opacity: 1,
    y: 0,
    duration: 0.24,
    ease: gEase.out,
    clearProps: "transform",
  },
  out: { opacity: 0, y: reduce ? 0 : -4, duration: 0.14, ease: gEase.out },
});

/** The slide swap with a touch of blur. */
const blurSwap = (reduce: boolean): PresenceMotion => ({
  from: reduce
    ? { opacity: 0 }
    : { opacity: 0, filter: "blur(2px)", y: 4 },
  to: {
    opacity: 1,
    ...(reduce ? {} : { filter: "blur(0px)", y: 0 }),
    duration: 0.18,
    ease: gEase.outFast,
    clearProps: "filter,transform",
  },
  out: {
    opacity: 0,
    ...(reduce ? {} : { filter: "blur(2px)", y: -4 }),
    duration: 0.12,
    ease: gEase.outFast,
  },
});

function SlideSlot({
  id,
  reduce,
  className,
  children,
}: {
  id: string | number | null;
  reduce: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Presence
      id={id}
      className={cn("col-start-1 row-start-1", className)}
      {...slideSwap(reduce)}
    >
      {children}
    </Presence>
  );
}

/** Springs an element in from a small, rotated pose. */
function PopIn({
  active = true,
  skip = false,
  reduce,
  delay = 0,
  from,
  spring = SPRING_POP,
  className,
  children,
}: {
  active?: boolean;
  skip?: boolean;
  reduce: boolean;
  delay?: number;
  from: { scale: number; rotation: number };
  spring?: { duration: number; ease: (progress: number) => number };
  className?: string;
  children?: React.ReactNode;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!active) {
      gsap.set(el, from);
      return;
    }
    if (skip || reduce) {
      gsap.set(el, { scale: 1, rotation: 0 });
      return;
    }
    const tween = gsap.fromTo(el, from, {
      scale: 1,
      rotation: 0,
      duration: spring.duration,
      ease: spring.ease,
      delay,
    });
    return () => {
      tween.kill();
    };
  }, [active, skip, reduce, delay, from, spring]);
  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* 1. AsyncButton                                                             */
/* -------------------------------------------------------------------------- */

type AsyncButtonState = "idle" | "loading" | "success";

export type AsyncButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  action?: () => Promise<void>;
  loadingDelay?: number;
  successDuration?: number;
};

export const AsyncButton = React.forwardRef<HTMLButtonElement, AsyncButtonProps>(
  (
    {
      children,
      className,
      action,
      loadingDelay = 200,
      successDuration = 1500,
      disabled,
      onClick,
      ...props
    },
    ref,
  ) => {
    const [state, setState] = React.useState<AsyncButtonState>("idle");
    const [pending, setPending] = React.useState(false);
    const reduceMotion = usePrefersReducedMotion();
    const generation = React.useRef(0);
    const timers = React.useRef<number[]>([]);

    const clearTimers = React.useCallback(() => {
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    }, []);

    React.useEffect(() => {
      return () => {
        generation.current += 1;
        clearTimers();
      };
    }, [clearTimers]);

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (
        event.defaultPrevented ||
        !action ||
        disabled ||
        pending ||
        state !== "idle"
      ) {
        return;
      }

      const gen = generation.current;
      setPending(true);

      const loadingTimer = window.setTimeout(() => {
        if (generation.current === gen) setState("loading");
      }, loadingDelay);
      timers.current.push(loadingTimer);

      try {
        await action();
        if (generation.current !== gen) return;
        window.clearTimeout(loadingTimer);
        setState("success");
        const idleTimer = window.setTimeout(() => {
          if (generation.current !== gen) return;
          setState("idle");
          setPending(false);
        }, successDuration);
        timers.current.push(idleTimer);
      } catch {
        if (generation.current !== gen) return;
        window.clearTimeout(loadingTimer);
        setState("idle");
        setPending(false);
      }
    };

    const busy = pending || state !== "idle";

    return (
      <button
        ref={ref}
        type="button"
        disabled={Boolean(disabled) || busy}
        onClick={handleClick}
        aria-busy={state === "loading"}
        aria-live="polite"
        data-state={state}
        className={cn(
          "relative inline-flex h-12 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full keep-rounded bg-primary px-8 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.08),0_0_1px_rgba(0,0,0,0.08),0_0_2px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.08)]",
          "transition-[transform,background-color] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)]",
          "hover:bg-primary/95 active:scale-[0.97]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none",
          disabled && "opacity-50",
          className,
        )}
        {...props}
      >
        <span
          className="invisible inline-flex items-center justify-center whitespace-nowrap"
          aria-hidden
        >
          {children}
        </span>
        <span className="sr-only">
          {state === "loading" ? "Loading" : state === "success" ? "Done" : null}
        </span>
        <Presence
          id={state}
          className="absolute inset-0 flex items-center justify-center"
          {...blurSwap(reduceMotion)}
        >
          {state === "idle" ? (
            children
          ) : state === "loading" ? (
            <Loader2 className="size-4 animate-spin [animation-duration:700ms]" />
          ) : (
            <Check className="size-4" strokeWidth={2.5} />
          )}
        </Presence>
      </button>
    );
  },
);
AsyncButton.displayName = "AsyncButton";

/* -------------------------------------------------------------------------- */
/* 2. WaitlistButton                                                          */
/* -------------------------------------------------------------------------- */

type WaitlistState = "idle" | "open" | "sending" | "done";
export type WaitlistResult = void | { position?: number };

export type WaitlistButtonProps = {
  action?: (email: string) => Promise<WaitlistResult>;
  label?: string;
  submitLabel?: string;
  placeholder?: string;
  successLabel?: string;
  successMessage?: (email: string) => string;
  invalidMessage?: string;
  errorMessage?: string;
  className?: string;
};

const WAITLIST_HEIGHT = 48;
const WAITLIST_INSET = 4;
const WAITLIST_ICON = 16;
const WAITLIST_IDLE_PAD = 32;
const WAITLIST_SUBMIT_PAD = 14;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function OdometerDigit({
  digit,
  delay,
  reduce,
}: {
  digit: number;
  delay: number;
  reduce: boolean;
}) {
  const column = React.useRef<HTMLSpanElement>(null);
  React.useLayoutEffect(() => {
    const el = column.current;
    if (!el) return;
    // The column is ten digits tall, so a tenth of it is one digit.
    if (reduce) {
      gsap.set(el, { yPercent: -digit * 10 });
      return;
    }
    const tween = gsap.fromTo(
      el,
      { yPercent: 0 },
      { yPercent: -digit * 10, duration: 0.9, delay, ease: gEase.out },
    );
    return () => {
      tween.kill();
    };
  }, [digit, delay, reduce]);
  return (
    <span className="flex flex-col" ref={column}>
      {Array.from({ length: 10 }, (_, d) => (
        <span key={d} className="block h-[1em] leading-none">
          {d}
        </span>
      ))}
    </span>
  );
}

function WaitlistOdometer({
  value,
  delay,
  reduce,
}: {
  value: number;
  delay: number;
  reduce: boolean;
}) {
  const chars = value.toLocaleString("en-US").split("");
  let digit = 0;
  return (
    <span className="inline-flex tabular-nums" aria-hidden>
      {chars.map((char, index) => {
        if (!/\d/.test(char)) {
          return (
            <span key={index} className="inline-block">
              {char}
            </span>
          );
        }
        const n = Number(char);
        const order = digit++;
        return (
          <span
            key={index}
            className="relative inline-block h-[1em] overflow-clip"
          >
            <OdometerDigit
              digit={n}
              delay={delay + order * 0.07}
              reduce={reduce}
            />
          </span>
        );
      })}
    </span>
  );
}

export const WaitlistButton = React.forwardRef<
  HTMLDivElement | null,
  WaitlistButtonProps
>(
  (
    {
      action,
      label = "Join the waitlist",
      submitLabel = "Join",
      placeholder = "you@company.com",
      successLabel = "You're on the list",
      successMessage = (email) =>
        `We'll email ${email} when your spot opens.`,
      invalidMessage = "Enter a valid email address.",
      errorMessage = "Couldn't save that. Try again.",
      className,
    },
    ref,
  ) => {
    const [state, setState] = React.useState<WaitlistState>("idle");
    const [email, setEmail] = React.useState("");
    const [position, setPosition] = React.useState<number | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [hover, setHover] = React.useState(false);
    const [size, setSize] = React.useState({ box: 0, idle: 0, submit: 0 });
    const reduce = usePrefersReducedMotion();
    const scope = React.useRef<HTMLDivElement>(null);
    const box = React.useRef<HTMLDivElement>(null);
    const radius = useElementRadius(box);
    const idleButton = React.useRef<HTMLButtonElement>(null);
    const submitButton = React.useRef<HTMLButtonElement>(null);
    const input = React.useRef<HTMLInputElement>(null);
    const mounted = React.useRef(true);
    const inputId = React.useId();
    const messageId = React.useId();

    React.useImperativeHandle(ref, () => scope.current as HTMLDivElement, []);

    React.useEffect(() => {
      mounted.current = true;
      return () => {
        mounted.current = false;
      };
    }, []);

    React.useEffect(() => {
      const measure = () =>
        setSize({
          box: box.current?.offsetWidth ?? 0,
          idle: idleButton.current?.offsetWidth ?? 0,
          submit: submitButton.current?.offsetWidth ?? 0,
        });
      measure();
      const observer = new ResizeObserver(measure);
      [box, idleButton, submitButton].forEach(
        (r) => r.current && observer.observe(r.current),
      );
      return () => observer.disconnect();
    }, []);

    React.useEffect(() => {
      if (state === "open") input.current?.focus({ preventScroll: true });
    }, [state]);

    const measured = size.box > 0 && size.idle > 0 && size.submit > 0;
    const side = Math.max(0, (size.box - size.idle) / 2);
    const submitLeft = Math.max(0, size.box - WAITLIST_INSET - size.submit);
    const r = Math.min(radius, WAITLIST_HEIGHT / 2);
    const innerR = Math.max(0, r - 2);
    const idleClip = `inset(0px ${side}px 0px ${side}px round ${r}px)`;
    const fullClip = `inset(0px 0px 0px 0px round ${r}px)`;
    const submitClip = `inset(${WAITLIST_INSET}px ${WAITLIST_INSET}px ${WAITLIST_INSET}px ${submitLeft}px round ${innerR}px)`;
    const open = state === "open" || state === "sending";

    const inkClip =
      state === "idle" ? idleClip : state === "done" ? fullClip : submitClip;
    const arrowX =
      state === "idle"
        ? side + size.idle - WAITLIST_IDLE_PAD - WAITLIST_ICON
        : size.box - WAITLIST_INSET - WAITLIST_SUBMIT_PAD - WAITLIST_ICON;
    const travelMs = reduce ? 0 : 550;

    const fade = (
      visible: boolean,
      delay: number,
      ...extra: TransitionPart[]
    ): React.CSSProperties => ({
      opacity: visible ? 1 : 0,
      ...transition(
        ["opacity", visible ? 240 : 120, CSS_OUT, visible && !reduce ? delay * 1000 : 0],
        ...extra,
      ),
    });

    const close = () => {
      setError(null);
      setState("idle");
      requestAnimationFrame(() =>
        idleButton.current?.focus({ preventScroll: true }),
      );
    };

    const submit = async (event: React.FormEvent) => {
      event.preventDefault();
      if (state !== "open") return;
      const value = email.trim();
      if (!EMAIL_REGEX.test(value)) {
        setError(invalidMessage);
        if (!reduce) shake(scope.current, 4, 0.36);
        input.current?.focus();
        return;
      }
      setError(null);
      setState("sending");
      try {
        const result = await action?.(value);
        if (!mounted.current) return;
        setEmail(value);
        setPosition(
          result && typeof result.position === "number"
            ? result.position
            : null,
        );
        setState("done");
      } catch {
        if (!mounted.current) return;
        setError(errorMessage);
        setState("open");
        if (!reduce) shake(scope.current, 4, 0.36);
      }
    };

    const done = state === "done";
    const messageKey =
      error && !done ? `error:${error}` : done ? "done" : null;

    return (
      <div ref={scope} className={cn("w-[360px] max-w-full", className)}>
        <form
          noValidate
          onSubmit={submit}
          onKeyDown={(event) => {
            if (event.key === "Escape" && open && state !== "sending") close();
          }}
          onBlur={(event) => {
            const next = event.relatedTarget as Node | null;
            if (
              state === "open" &&
              !email.trim() &&
              !event.currentTarget.contains(next)
            ) {
              setError(null);
              setState("idle");
            }
          }}
        >
          <div
            ref={box}
            data-hover={hover && state === "idle"}
            className="group relative rounded-full keep-rounded text-sm font-medium transition-transform duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] has-[[data-slot=idle]:active]:scale-[0.98]"
            style={{ height: WAITLIST_HEIGHT }}
          >
            {measured && (
              <>
                <div className="absolute inset-0 [filter:drop-shadow(0_0_1px_rgba(0,0,0,0.04))]">
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-full keep-rounded bg-background shadow-[inset_0_0_2px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_2px_rgba(0,0,0,0.4)]"
                    style={{
                      clipPath: state === "idle" ? idleClip : fullClip,
                      ...transition(["clip-path", travelMs, CSS_TRAVEL]),
                    }}
                  />
                </div>
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-y-0 keep-rounded border",
                    error
                      ? "border-red-500/60 dark:border-red-400/60"
                      : "border-black/[0.06] group-has-[input:focus]:border-black/20 dark:border-white/[0.07] dark:group-has-[input:focus]:border-white/25",
                  )}
                  style={{
                    left: state === "idle" ? side : 0,
                    width: state === "idle" ? size.idle : size.box,
                    borderRadius: r,
                    ...transition(
                      ["left", travelMs, CSS_TRAVEL],
                      ["width", travelMs, CSS_TRAVEL],
                      ["border-color", 150, CSS_STANDARD],
                    ),
                  }}
                />
              </>
            )}

            <input
              ref={input}
              id={inputId}
              type="email"
              name="email"
              inputMode="email"
              autoComplete="email"
              spellCheck={false}
              placeholder={placeholder}
              aria-label="Email address"
              aria-invalid={Boolean(error)}
              aria-describedby={messageId}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (error) setError(null);
              }}
              disabled={!open}
              tabIndex={open ? 0 : -1}
              className="absolute inset-y-0 left-0 w-full bg-transparent pl-3.5 text-sm font-normal text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-default"
              style={{
                paddingRight: size.submit + WAITLIST_INSET * 2 + 8,
                ...fade(open, 0.28),
              }}
            />

            {measured && (
              <div className="pointer-events-none absolute inset-0 [filter:drop-shadow(0_0_1px_rgba(0,0,0,0.08))_drop-shadow(0_0_2px_rgba(0,0,0,0.04))] dark:[filter:none]">
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-full keep-rounded bg-primary bg-[linear-gradient(to_bottom,rgba(255,255,255,0.10),rgba(255,255,255,0)_55%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.08)] dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(0,0,0,0.06))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.08)]"
                  style={{
                    clipPath: inkClip,
                    ...transition(["clip-path", travelMs, CSS_TRAVEL]),
                  }}
                />
              </div>
            )}

            <button
              ref={idleButton}
              type="button"
              data-slot="idle"
              aria-expanded={open}
              aria-controls={inputId}
              onClick={() => state === "idle" && setState("open")}
              onPointerEnter={(event) =>
                event.pointerType === "mouse" && setHover(true)
              }
              onPointerLeave={() => setHover(false)}
              tabIndex={state === "idle" ? 0 : -1}
              className={cn(
                "absolute inset-y-0 left-1/2 flex -translate-x-1/2 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full keep-rounded text-primary-foreground",
                "hover:bg-primary-foreground/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                !measured && "bg-primary",
                state !== "idle" && "pointer-events-none",
              )}
              style={{
                paddingInline: WAITLIST_IDLE_PAD,
                ...fade(state === "idle", 0.32, [
                  "background-color",
                  150,
                  CSS_STANDARD,
                ]),
              }}
            >
              {label}
              {measured ? (
                <span
                  aria-hidden
                  className="inline-block"
                  style={{ width: WAITLIST_ICON }}
                />
              ) : (
                <ArrowRight aria-hidden className="size-4" />
              )}
            </button>

            <button
              ref={submitButton}
              type="submit"
              tabIndex={open ? 0 : -1}
              disabled={state !== "open"}
              className={cn(
                "absolute top-1 right-1 bottom-1 flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full keep-rounded text-primary-foreground",
                "hover:bg-primary-foreground/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                !open && "pointer-events-none",
              )}
              style={{
                paddingInline: WAITLIST_SUBMIT_PAD,
                ...fade(open, 0.44, ["background-color", 150, CSS_STANDARD]),
              }}
            >
              {submitLabel}
              <span
                aria-hidden
                className="inline-block"
                style={{ width: WAITLIST_ICON }}
              />
            </button>

            {measured && (
              <span
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-0 -mt-2 grid size-4 text-primary-foreground"
                style={{
                  transform: `translateX(${arrowX}px)`,
                  opacity: done ? 0 : 1,
                  ...transition(
                    ["transform", travelMs, CSS_TRAVEL],
                    ["opacity", 150, CSS_OUT],
                  ),
                }}
              >
                <span
                  className="col-start-1 row-start-1 [[data-hover=true]_&]:translate-x-0.5"
                  style={{
                    opacity: state === "sending" ? 0 : 1,
                    transform: `scale(${state === "sending" ? 0.6 : 1})`,
                    ...transition(
                      ["opacity", 180, CSS_OUT],
                      ["transform", 180, CSS_OUT],
                      ["translate", 200, CSS_OUT],
                    ),
                  }}
                >
                  <ArrowRight className="size-4" />
                </span>
                <span
                  className="col-start-1 row-start-1"
                  style={{
                    opacity: state === "sending" ? 1 : 0,
                    transform: `scale(${state === "sending" ? 1 : 0.6})`,
                    ...transition(
                      ["opacity", 180, CSS_OUT],
                      ["transform", 180, CSS_OUT],
                    ),
                  }}
                >
                  <Loader2 className="size-4 animate-spin [animation-duration:700ms]" />
                </span>
              </span>
            )}

            <div
              aria-hidden={!done}
              className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 text-primary-foreground"
              style={fade(done, 0.34)}
            >
              <PopIn
                active={done}
                reduce={reduce}
                delay={0.38}
                from={POP_FROM}
                className="inline-flex"
              >
                <Check aria-hidden className="size-4" strokeWidth={2.5} />
              </PopIn>
              {done && position !== null ? (
                <span className="flex items-center gap-[0.3em] leading-none">
                  You&apos;re
                  <span className="inline-flex">
                    #
                    <WaitlistOdometer
                      value={position}
                      delay={0.45}
                      reduce={reduce}
                    />
                  </span>
                  in line
                  <span className="sr-only">{`You're number ${position} in line`}</span>
                </span>
              ) : (
                successLabel
              )}
            </div>
          </div>

          <div
            id={messageId}
            aria-live="polite"
            className="relative mt-2.5 h-5 text-center text-[13px] leading-5"
          >
            <Presence
              id={messageKey}
              as="p"
              className={cn(
                "absolute inset-x-0",
                done
                  ? "truncate text-muted-foreground"
                  : "text-red-600 dark:text-red-400",
              )}
              from={{ opacity: 0, y: reduce ? 0 : -2 }}
              to={{
                opacity: 1,
                y: 0,
                duration: done ? 0.3 : 0.24,
                delay: done && !reduce ? 0.9 : 0,
                ease: gEase.out,
                clearProps: "transform",
              }}
              out={{ opacity: 0, duration: 0.12 }}
            >
              {done ? successMessage(email) : error}
            </Presence>
          </div>
        </form>
      </div>
    );
  },
);
WaitlistButton.displayName = "WaitlistButton";

/* -------------------------------------------------------------------------- */
/* 3. HoldToConfirm                                                           */
/* -------------------------------------------------------------------------- */

type HoldState = "idle" | "holding" | "pending" | "done";

export type HoldToConfirmProps = {
  action?: () => Promise<void>;
  label?: string;
  hintLabel?: string;
  pendingLabel?: string;
  doneLabel?: string;
  errorLabel?: string;
  holdDuration?: number;
  resetAfter?: number;
  disabled?: boolean;
  className?: string;
};

function TrashIcon({
  lid,
}: {
  lid: React.RefObject<SVGGElement | null>;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4 overflow-visible"
      fill="none"
      aria-hidden
    >
      <g
        ref={lid}
        style={{ transformBox: "fill-box", transformOrigin: "0% 100%" }}
      >
        <path
          d="M2 4.5h12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M6 4.5V3.25c0-.41.34-.75.75-.75h2.5c.41 0 .75.34.75.75V4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </g>
      <path
        d="M3.5 6.5l.6 6.6c.07.77.71 1.4 1.49 1.4h4.82c.78 0 1.42-.63 1.49-1.4l.6-6.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.75 8.5v3.5M9.25 8.5v3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HoldToConfirm({
  action,
  label = "Hold to delete",
  hintLabel = "Keep holding",
  pendingLabel = "Deleting",
  doneLabel = "Deleted",
  errorLabel = "Couldn't delete",
  holdDuration = 1200,
  resetAfter,
  disabled,
  className,
}: HoldToConfirmProps) {
  const [state, setState] = React.useState<HoldState>("idle");
  const [note, setNote] = React.useState<"hint" | "error" | null>(null);
  const reduce = usePrefersReducedMotion();
  // `progress` is how far the hold has gone (0–1); `shut` snaps the lid closed.
  const anim = React.useRef({ progress: 0, shut: 0 });
  const fillEl = React.useRef<HTMLSpanElement>(null);
  const lidEl = React.useRef<SVGGElement>(null);
  const run = React.useRef<gsap.core.Tween | null>(null);
  const timer = React.useRef<number | undefined>(undefined);
  const mounted = React.useRef(true);
  const descriptionId = React.useId();

  const paint = React.useCallback(() => {
    const { progress, shut } = anim.current;
    if (fillEl.current) fillEl.current.style.transform = `scaleX(${progress})`;
    if (lidEl.current) {
      lidEl.current.style.transform = `rotate(${-34 * progress * (1 - shut)}deg)`;
    }
  }, []);

  React.useEffect(() => {
    mounted.current = true;
    const values = anim.current;
    return () => {
      mounted.current = false;
      gsap.killTweensOf(values);
      window.clearTimeout(timer.current);
    };
  }, []);

  const showNote = (kind: "hint" | "error") => {
    setNote(kind);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(
      () => mounted.current && setNote(null),
      1600,
    );
  };

  const rewind = (duration: number) =>
    gsap.to(anim.current, {
      progress: 0,
      duration,
      ease: gEase.out,
      overwrite: true,
      onUpdate: paint,
    });

  const finish = async () => {
    run.current = null;
    setNote(null);
    await tweenTo(anim.current, {
      shut: 1,
      duration: reduce ? 0 : 0.16,
      ease: gEase.circIn,
      onUpdate: paint,
    });
    if (!mounted.current) return;
    if ("vibrate" in navigator) navigator.vibrate?.(12);
    setState("pending");
    try {
      await action?.();
      if (!mounted.current) return;
      setState("done");
      if (resetAfter !== undefined) {
        timer.current = window.setTimeout(() => {
          if (!mounted.current) return;
          setState("idle");
          rewind(0.3);
        }, resetAfter);
      }
    } catch {
      if (!mounted.current) return;
      setState("idle");
      rewind(0.3);
      showNote("error");
    }
  };

  const start = () => {
    if (disabled || (state !== "idle" && state !== "holding")) return;
    setState("holding");
    setNote(null);
    anim.current.shut = 0;
    paint();
    run.current?.kill();
    const remaining = holdDuration * (1 - anim.current.progress);
    run.current = gsap.to(anim.current, {
      progress: 1,
      duration: remaining / 1000,
      ease: "none",
      overwrite: true,
      onUpdate: paint,
      onComplete: () => {
        if (mounted.current) void finish();
      },
    });
  };

  const release = () => {
    if (state !== "holding" || !run.current) return;
    run.current.kill();
    run.current = null;
    if (anim.current.progress < 0.6) showNote("hint");
    setState("idle");
    rewind(reduce ? 0 : 0.35);
  };

  const solid = state === "pending" || state === "done";
  const idleText =
    note === "hint" ? hintLabel : note === "error" ? errorLabel : label;
  const slot = state === "idle" || state === "holding" ? "idle" : state;

  return (
    <button
      type="button"
      disabled={disabled}
      aria-describedby={descriptionId}
      data-state={state}
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        start();
      }}
      onPointerUp={release}
      onPointerLeave={release}
      onPointerCancel={release}
      onKeyDown={(event) => {
        if ((event.key === " " || event.key === "Enter") && !event.repeat) {
          event.preventDefault();
          start();
        }
      }}
      onKeyUp={(event) => {
        if (event.key === " " || event.key === "Enter") release();
      }}
      onBlur={release}
      onContextMenu={(event) => event.preventDefault()}
      className={cn(
        "[--danger:#d4463e] [--danger-solid:#c4403a] [--danger-text:#c2372f] dark:[--danger:#e0625a] dark:[--danger-solid:#b9453d] dark:[--danger-text:#f08a82]",
        "relative inline-flex h-12 cursor-pointer touch-manipulation items-center justify-center overflow-clip rounded-full keep-rounded px-8 text-sm font-medium select-none [-webkit-touch-callout:none]",
        "transition-[background-color,border-color,color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--danger)_45%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        solid
          ? "border border-[color-mix(in_oklab,var(--danger-solid)_95%,black)] bg-[var(--danger-solid)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.08),0_0_1px_rgba(0,0,0,0.08),0_0_2px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.08)]"
          : "border border-[color-mix(in_oklab,var(--danger)_18%,transparent)] bg-white text-[var(--danger-text)] shadow-[0_0_1px_rgba(0,0,0,0.05),0_0_1px_rgba(0,0,0,0.03)] hover:border-[color-mix(in_oklab,var(--danger)_28%,transparent)] hover:bg-black/[0.03] dark:bg-background dark:hover:bg-white/[0.035]",
        className,
      )}
    >
      <span
        ref={fillEl}
        aria-hidden
        style={{ transform: "scaleX(0)" }}
        className={cn(
          "pointer-events-none absolute inset-0 origin-left bg-[color-mix(in_oklab,var(--danger)_13%,transparent)] dark:bg-[color-mix(in_oklab,var(--danger)_18%,transparent)]",
          solid && "opacity-0",
        )}
      />

      <span className="relative grid">
        {[label, hintLabel, errorLabel, pendingLabel, doneLabel].map((text) => (
          <span
            key={text}
            aria-hidden
            className="invisible col-start-1 row-start-1 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span className="size-4" />
            {text}
          </span>
        ))}

        <SlideSlot
          id={slot}
          reduce={reduce}
          className={cn(
            "flex items-center justify-center gap-2",
            slot !== "idle" && "whitespace-nowrap",
          )}
        >
          {slot === "idle" ? (
            <>
              <span className="grid size-4 place-items-center">
                <TrashIcon lid={lidEl} />
              </span>
              <span className="relative whitespace-nowrap">
                <span aria-hidden className="invisible">
                  {label}
                </span>
                <SlideSlot
                  id={idleText}
                  reduce={reduce}
                  className="absolute top-0 left-0 whitespace-nowrap"
                >
                  {idleText}
                </SlideSlot>
              </span>
            </>
          ) : slot === "pending" ? (
            <>
              <span className="grid size-4 place-items-center">
                <Loader2 className="size-4 animate-spin [animation-duration:700ms]" />
              </span>
              {pendingLabel}
            </>
          ) : (
            <>
              <PopIn
                reduce={reduce}
                from={POP_FROM}
                className="grid size-4 place-items-center"
              >
                <Check className="size-4" strokeWidth={2.5} />
              </PopIn>
              {doneLabel}
            </>
          )}
        </SlideSlot>
      </span>

      <span id={descriptionId} className="sr-only">
        {`Press and hold for ${(holdDuration / 1000).toFixed(1)} seconds to confirm.`}
      </span>
      <span className="sr-only" aria-live="polite">
        {state === "pending"
          ? pendingLabel
          : state === "done"
            ? doneLabel
            : note === "error"
              ? errorLabel
              : ""}
      </span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* 4 & 5. StarButton & UpvoteButton (icon="star" | "upvote")                 */
/* -------------------------------------------------------------------------- */

export type StarButtonProps = {
  icon?: "star" | "upvote";
  label?: string;
  count?: number;
  repo?: string;
  href?: string;
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  className?: string;
};

function StarWheel({
  digit,
  direction,
  delay,
  hold,
  reduce,
}: {
  digit: number;
  direction: 1 | -1;
  delay: number;
  hold: boolean;
  reduce: boolean;
}) {
  const shown = hold ? 0 : digit;
  const column = React.useRef<HTMLSpanElement>(null);
  // Which digit of the 0–9, 0–9 strip is showing; fractions are mid-roll.
  const index = React.useRef({ v: shown });
  const [startAt] = React.useState(shown);
  const previous = React.useRef(shown);
  const held = React.useRef(hold);

  const paint = React.useCallback(() => {
    if (column.current) {
      column.current.style.transform = `translateY(${-index.current.v}em)`;
    }
  }, []);

  React.useEffect(() => {
    const value = index.current;
    return () => {
      gsap.killTweensOf(value);
    };
  }, []);

  React.useEffect(() => {
    const from = previous.current;
    previous.current = shown;
    const releasing = held.current && !hold;
    held.current = hold;
    if (from === shown) return;
    const dir = releasing ? 1 : direction;
    const value = index.current;
    gsap.killTweensOf(value);
    if (reduce) {
      value.v = shown;
      paint();
      return;
    }
    if (dir === 1) {
      value.v = from;
      paint();
      const target = shown > from ? shown : shown + 10;
      gsap.to(value, {
        v: target,
        duration: 0.6,
        delay,
        ease: gEase.out,
        onUpdate: paint,
        onComplete: () => {
          value.v = shown;
          paint();
        },
      });
    } else {
      value.v = shown < from ? from : from + 10;
      paint();
      gsap.to(value, {
        v: shown,
        duration: 0.6,
        delay,
        ease: gEase.out,
        onUpdate: paint,
      });
    }
  }, [shown, hold, direction, delay, reduce, paint]);

  return (
    <span className="relative inline-block h-[1em] overflow-clip leading-none">
      <span
        ref={column}
        className="flex flex-col"
        style={{ transform: `translateY(${-startAt}em)` }}
      >
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i} className="block h-[1em] leading-none">
            {i % 10}
          </span>
        ))}
      </span>
    </span>
  );
}

function keyFromRight(text: string) {
  const out: { char: string; key: string; place: number }[] = [];
  let place = 0;
  for (let i = text.length - 1; i >= 0; i--) {
    const char = text[i];
    const isDigit = char >= "0" && char <= "9";
    out.unshift({ char, key: isDigit ? `d${place}` : `s${place}`, place });
    if (isDigit) place += 1;
  }
  return out;
}

function StarOdometer({
  value,
  hold,
  reduce,
}: {
  value: number;
  hold: boolean;
  reduce: boolean;
}) {
  const [previous, setPrevious] = React.useState(value);
  const [direction, setDirection] = React.useState<1 | -1>(1);
  if (value !== previous) {
    setDirection(value > previous ? 1 : -1);
    setPrevious(value);
  }
  return (
    <span className="inline-flex tabular-nums" aria-hidden>
      {keyFromRight(value.toLocaleString("en-US")).map(({ char, key, place }) =>
        char >= "0" && char <= "9" ? (
          <StarWheel
            key={key}
            digit={Number(char)}
            direction={direction}
            delay={reduce ? 0 : place * 0.05}
            hold={hold}
            reduce={reduce}
          />
        ) : (
          <span key={key} className="inline-block leading-none">
            {char}
          </span>
        ),
      )}
    </span>
  );
}

function StarSvgIcon({ on }: { on: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4 overflow-visible"
      aria-hidden
    >
      <path
        d="M8 1.6l1.93 3.92 4.32.63-3.13 3.05.74 4.3L8 11.47l-3.86 2.03.74-4.3L1.75 6.15l4.32-.63L8 1.6z"
        strokeWidth={1.4}
        strokeLinejoin="round"
        className={cn(
          "transition-[fill,stroke] duration-200",
          on
            ? "fill-[#f0b429] stroke-[#b7791f] dark:fill-[#f2c94c] dark:stroke-[#f2c94c]"
            : "fill-transparent stroke-current",
        )}
      />
    </svg>
  );
}

function UpvoteSvgIcon({ on }: { on: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4 overflow-visible"
      aria-hidden
    >
      <path
        d="M8 2.5l5.5 8.5h-11L8 2.5z"
        strokeWidth={1.4}
        strokeLinejoin="round"
        className={cn(
          "stroke-current transition-[fill] duration-200",
          on ? "fill-current" : "fill-transparent",
        )}
      />
    </svg>
  );
}

function readCachedStars(key: string) {
  try {
    const cached = sessionStorage.getItem(key);
    return cached === null ? null : Number(cached);
  } catch {
    return null;
  }
}

function useRepoStars(repo: string | undefined) {
  const [stars, setStars] = React.useState<number | null>(null);
  React.useEffect(() => {
    if (!repo) return;
    const key = `stars:${repo}`;
    const controller = new AbortController();
    const cached = readCachedStars(key);
    const source: Promise<number | null> =
      cached !== null
        ? Promise.resolve(cached)
        : fetch(`https://api.github.com/repos/${repo}`, {
            signal: controller.signal,
          })
            .then((res) => (res.ok ? res.json() : null))
            .then((data: { stargazers_count?: number } | null) => {
              const n =
                typeof data?.stargazers_count === "number"
                  ? data.stargazers_count
                  : null;
              if (n !== null) {
                try {
                  sessionStorage.setItem(key, String(n));
                } catch {
                  // Ignore storage errors
                }
              }
              return n;
            });
    source
      .then((n) => n !== null && !controller.signal.aborted && setStars(n))
      .catch(() => {});
    return () => controller.abort();
  }, [repo]);
  return stars;
}

export function StarButton({
  icon = "star",
  label,
  count = 0,
  repo,
  href,
  pressed: controlled,
  defaultPressed = false,
  onPressedChange,
  className,
}: StarButtonProps) {
  const reduce = usePrefersReducedMotion();
  const root = React.useRef<HTMLElement>(null);
  const seen = useInViewOnce(root, "-40px");
  const [own, setOwn] = React.useState(defaultPressed);
  const [twirl, setTwirl] = React.useState(0);
  const live = useRepoStars(repo);
  const pressed = controlled ?? own;
  const link = href ?? (repo ? `https://github.com/${repo}` : undefined);
  const text = label ?? (icon === "star" ? "Star" : "Upvote");

  const base = live ?? count;
  const ownDelta =
    controlled === undefined ? Number(pressed) - Number(defaultPressed) : 0;
  const total = link ? base : base + ownDelta;
  const hold = !seen && !reduce;
  const widest = Math.max(total, total + 1).toLocaleString("en-US");

  const toggle = () => {
    const next = !pressed;
    if (controlled === undefined) setOwn(next);
    if (next) setTwirl((n) => n + 1);
    onPressedChange?.(next);
  };

  const content = (
    <>
      <span className="flex items-center gap-1.5 pr-3 pl-8 leading-none">
        <PopIn
          key={twirl}
          skip={twirl === 0}
          reduce={reduce}
          from={TWIRL_FROM}
          spring={SPRING_TWIRL}
          className="grid size-4 place-items-center"
        >
          {icon === "star" ? (
            <StarSvgIcon on={link ? false : pressed} />
          ) : (
            <UpvoteSvgIcon on={link ? false : pressed} />
          )}
        </PopIn>
        {text}
      </span>
      <span
        aria-hidden
        className="h-4 w-px bg-black/[0.1] dark:bg-white/[0.12]"
      />
      <span className="relative grid pr-8 pl-3 tabular-nums">
        <span
          aria-hidden
          className="invisible col-start-1 row-start-1 text-right"
        >
          {widest}
        </span>
        <span className="col-start-1 row-start-1 flex items-center justify-end">
          <StarOdometer value={total} hold={hold} reduce={reduce} />
        </span>
      </span>
    </>
  );

  const surface = cn(
    "inline-flex h-12 cursor-pointer items-center rounded-full keep-rounded border border-black/[0.045] bg-white text-[13px] font-medium text-foreground select-none dark:bg-background",
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_0_1px_rgba(0,0,0,0.05),0_0_1px_rgba(0,0,0,0.03)] dark:border-white/[0.06] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_1px_rgba(0,0,0,0.2),0_0_1px_rgba(0,0,0,0.12)]",
    "transition-[background-color,transform,scale] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-black/[0.03] active:scale-[0.97] dark:hover:bg-white/[0.035]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    className,
  );
  const noun =
    icon === "star"
      ? total === 1
        ? "star"
        : "stars"
      : total === 1
        ? "upvote"
        : "upvotes";
  const name = `${text}, ${total.toLocaleString("en-US")} ${noun}`;

  if (link) {
    return (
      <a
        ref={root as React.Ref<HTMLAnchorElement>}
        href={link}
        target="_blank"
        rel="noreferrer"
        aria-label={repo ? `${name} on GitHub` : name}
        className={surface}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={root as React.Ref<HTMLButtonElement>}
      type="button"
      aria-pressed={pressed}
      aria-label={name}
      onClick={toggle}
      className={surface}
    >
      {content}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. FollowButton                                                            */
/* -------------------------------------------------------------------------- */

export type FollowButtonProps = {
  name?: string;
  following?: boolean;
  defaultFollowing?: boolean;
  onFollowingChange?: (following: boolean) => void | Promise<void>;
  followLabel?: string;
  followingLabel?: string;
  unfollowLabel?: string;
  className?: string;
};

/** Two strokes per icon, as `[x1, y1, x2, y2]`, so one shape tweens into the next. */
const FOLLOW_SHAPES = {
  plus: [
    [8, 3.5, 8, 12.5],
    [3.5, 8, 12.5, 8],
  ],
  check: [
    [3.5, 8.5, 6.5, 11.5],
    [6.5, 11.5, 12.5, 4.5],
  ],
  cross: [
    [4.5, 4.5, 11.5, 11.5],
    [11.5, 4.5, 4.5, 11.5],
  ],
} as const;

function MorphIcon({
  shape,
  reduce,
}: {
  shape: keyof typeof FOLLOW_SHAPES;
  reduce: boolean;
}) {
  const [startAt] = React.useState(shape);
  const lines = React.useRef<(SVGLineElement | null)[]>([]);
  const settled = React.useRef(shape);

  React.useEffect(() => {
    if (settled.current === shape) return;
    settled.current = shape;
    lines.current.forEach((el, i) => {
      if (!el) return;
      const [x1, y1, x2, y2] = FOLLOW_SHAPES[shape][i];
      gsap.to(el, {
        attr: { x1, y1, x2, y2 },
        duration: reduce ? 0 : 0.32,
        ease: gEase.out,
        overwrite: true,
      });
    });
  }, [shape, reduce]);

  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4 shrink-0 overflow-visible"
      fill="none"
      aria-hidden
    >
      {FOLLOW_SHAPES[startAt].map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          ref={(el) => {
            lines.current[i] = el;
          }}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

export function FollowButton({
  name,
  following: controlled,
  defaultFollowing = false,
  onFollowingChange,
  followLabel = "Follow",
  followingLabel = "Following",
  unfollowLabel = "Unfollow",
  className,
}: FollowButtonProps) {
  const reduce = usePrefersReducedMotion();
  const [own, setOwn] = React.useState(defaultFollowing);
  const [hover, setHover] = React.useState(false);
  const [armed, setArmed] = React.useState(true);
  const scope = React.useRef<HTMLButtonElement>(null);
  const following = controlled ?? own;
  const unfollowing = following && hover && armed;

  const shape: keyof typeof FOLLOW_SHAPES = !following
    ? "plus"
    : unfollowing
      ? "cross"
      : "check";
  const label = !following
    ? followLabel
    : unfollowing
      ? unfollowLabel
      : followingLabel;
  const group = useGlide<HTMLSpanElement>(label, reduce);

  const toggle = async () => {
    const next = !following;
    if (controlled === undefined) setOwn(next);
    setArmed(false);
    try {
      await onFollowingChange?.(next);
    } catch {
      if (controlled === undefined) setOwn(!next);
      if (!reduce) shake(scope.current, 3, 0.32);
    }
  };

  return (
    <button
      ref={scope}
      type="button"
      aria-pressed={following}
      aria-label={`${followLabel}${name ? ` ${name}` : ""}`}
      data-state={
        unfollowing ? "unfollow" : following ? "following" : "follow"
      }
      onClick={toggle}
      onPointerEnter={(event) =>
        event.pointerType === "mouse" && setHover(true)
      }
      onPointerLeave={() => {
        setHover(false);
        setArmed(true);
      }}
      className={cn(
        "relative inline-grid h-12 cursor-pointer place-items-center rounded-full keep-rounded border px-3.5 text-[13px] font-medium select-none",
        "transition-[background-color,border-color,color,box-shadow,transform,scale] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "[--danger:#d4463e] [--danger-text:#c2372f] dark:[--danger:#e0625a] dark:[--danger-text:#f08a82]",
        !following &&
          "border-[color-mix(in_oklab,var(--primary)_96%,black)] bg-primary text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.08),0_0_1px_rgba(0,0,0,0.08),0_0_2px_rgba(0,0,0,0.04)] hover:bg-primary/95 dark:border-primary dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.08)]",
        following &&
          !unfollowing &&
          "border-black/[0.045] bg-background text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_0_1px_rgba(0,0,0,0.05),0_0_1px_rgba(0,0,0,0.03)] dark:border-white/[0.06] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_1px_rgba(0,0,0,0.2),0_0_1px_rgba(0,0,0,0.12)]",
        unfollowing &&
          "border-[color-mix(in_oklab,var(--danger)_20%,transparent)] bg-[color-mix(in_oklab,var(--danger)_5%,var(--background))] text-[var(--danger-text)]",
        className,
      )}
    >
      {[followLabel, followingLabel, unfollowLabel].map((text) => (
        <span
          key={text}
          aria-hidden
          className="invisible col-start-1 row-start-1 flex items-center gap-1.5 whitespace-nowrap"
        >
          <span className="size-4" />
          {text}
        </span>
      ))}

      <span className="absolute inset-0 flex items-center justify-center">
        <span ref={group} className="flex items-center gap-1.5">
          <MorphIcon shape={shape} reduce={reduce} />
          <span className="relative grid whitespace-nowrap">
            <Presence
              id={label}
              popLayout
              className="col-start-1 row-start-1"
              from={{ opacity: 0, y: reduce ? 0 : 3 }}
              to={{
                opacity: 1,
                y: 0,
                duration: 0.22,
                delay: reduce ? 0 : 0.06,
                ease: gEase.out,
                clearProps: "transform",
              }}
              out={{ opacity: 0, y: reduce ? 0 : -3, duration: 0.12, ease: gEase.out }}
            >
              {label}
            </Presence>
          </span>
        </span>
      </span>

      <span className="sr-only" aria-live="polite">
        {following ? followingLabel : ""}
      </span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. SplitButton                                                             */
/* -------------------------------------------------------------------------- */

export type SplitOption = {
  value: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
};

export type SplitButtonProps = {
  options?: SplitOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onAction?: (value: string) => void | Promise<void>;
  menuLabel?: string;
  disabled?: boolean;
  className?: string;
};

const DEFAULT_SPLIT_OPTIONS: SplitOption[] = [
  {
    value: "production",
    label: "Deploy",
    description: "Build and release to production",
    icon: Rocket,
  },
  {
    value: "preview",
    label: "Deploy to preview",
    description: "A private URL for this branch",
    icon: GitBranch,
  },
  {
    value: "redeploy",
    label: "Redeploy",
    description: "Rebuild the live commit",
    icon: RotateCcw,
  },
];

export function SplitButton({
  options = DEFAULT_SPLIT_OPTIONS,
  value: controlled,
  defaultValue,
  onValueChange,
  onAction,
  menuLabel = "More deploy options",
  disabled,
  className,
}: SplitButtonProps) {
  const reduce = usePrefersReducedMotion();
  const [own, setOwn] = React.useState(defaultValue ?? options[0]?.value);
  const [open, setOpen] = React.useState(false);
  const [leaving, setLeaving] = React.useState(false);
  const [busy, setBusy] = React.useState<"idle" | "running" | "done">("idle");
  const [active, setActive] = React.useState(0);
  const root = React.useRef<HTMLDivElement>(null);
  const trigger = React.useRef<HTMLButtonElement>(null);
  const menu = React.useRef<HTMLDivElement>(null);
  const items = React.useRef<(HTMLButtonElement | null)[]>([]);
  const timer = React.useRef<number | undefined>(undefined);
  const mounted = React.useRef(true);
  const menuId = React.useId();

  const value = controlled ?? own;
  const current = options.find((o) => o.value === value) ?? options[0];
  const Icon = current?.icon;
  const group = useGlide<HTMLSpanElement>(current?.value, reduce);

  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      window.clearTimeout(timer.current);
    };
  }, []);

  const hide = React.useCallback(() => {
    setOpen(false);
    setLeaving(true);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) hide();
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open, hide]);

  React.useEffect(() => {
    if (open) items.current[active]?.focus({ preventScroll: true });
  }, [open, active]);

  // The menu is mounted while open and while it fades out.
  React.useLayoutEffect(() => {
    const el = menu.current;
    if (!el) return;
    if (open) {
      const tween = gsap.fromTo(
        el,
        { opacity: 0, scale: reduce ? 1 : 0.96, y: reduce ? 0 : -4 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.18,
          ease: gEase.out,
          clearProps: "transform",
        },
      );
      return () => {
        tween.kill();
      };
    }
    if (leaving) {
      const tween = gsap.to(el, {
        opacity: 0,
        scale: reduce ? 1 : 0.97,
        duration: 0.12,
        ease: gEase.out,
        onComplete: () => setLeaving(false),
      });
      return () => {
        tween.kill();
      };
    }
  }, [open, leaving, reduce]);

  const openMenu = () => {
    setActive(Math.max(0, options.findIndex((o) => o.value === value)));
    setLeaving(false);
    setOpen(true);
  };

  const close = (refocus = true) => {
    hide();
    if (refocus) trigger.current?.focus({ preventScroll: true });
  };

  const choose = (next: string) => {
    if (controlled === undefined) setOwn(next);
    onValueChange?.(next);
    close();
  };

  const run = async () => {
    if (!current || busy === "running") return;
    setBusy("running");
    try {
      await onAction?.(current.value);
      if (!mounted.current) return;
      setBusy("done");
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(
        () => mounted.current && setBusy("idle"),
        1400,
      );
    } catch {
      if (mounted.current) setBusy("idle");
    }
  };

  const onMenuKey = (event: React.KeyboardEvent) => {
    const last = options.length - 1;
    if (event.key === "ArrowDown") setActive((i) => (i >= last ? 0 : i + 1));
    else if (event.key === "ArrowUp") setActive((i) => (i <= 0 ? last : i - 1));
    else if (event.key === "Home") setActive(0);
    else if (event.key === "End") setActive(last);
    else if (event.key === "Escape") close();
    else if (event.key === "Tab") close(false);
    else return;
    event.preventDefault();
  };

  const ink =
    "bg-primary text-primary-foreground bg-[linear-gradient(to_bottom,rgba(255,255,255,0.10),rgba(255,255,255,0)_55%)] dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(0,0,0,0.06))]";
  const press =
    "cursor-pointer transition-[background-color,transform,scale] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-primary/95 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-foreground/45 disabled:pointer-events-none";

  return (
    <div
      ref={root}
      className={cn(
        "relative inline-flex h-12 rounded-full keep-rounded text-[13px] font-medium",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.08),0_0_1px_rgba(0,0,0,0.08),0_0_2px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.08)]",
        disabled && "opacity-50",
        className,
      )}
    >
      <button
        type="button"
        disabled={disabled}
        aria-busy={busy === "running"}
        onClick={run}
        className={cn(
          "relative inline-grid place-items-center rounded-l-full keep-rounded pr-3 pl-8",
          ink,
          press,
        )}
      >
        {options.map((o) => (
          <span
            key={o.value}
            aria-hidden
            className="invisible col-start-1 row-start-1 flex items-center gap-2 whitespace-nowrap"
          >
            <span className="size-4" />
            {o.label}
          </span>
        ))}
        <span className="absolute inset-0 flex items-center justify-center">
          <span ref={group} className="flex items-center gap-2">
            <span className="grid size-4 place-items-center">
              <Presence
                id={
                  busy === "running"
                    ? "spin"
                    : busy === "done"
                      ? "done"
                      : (current?.value ?? "none")
                }
                className="col-start-1 row-start-1 grid place-items-center"
                from={{ opacity: 0, scale: reduce ? 1 : 0.6 }}
                to={{
                  opacity: 1,
                  scale: 1,
                  duration: 0.2,
                  ease: gEase.out,
                  clearProps: "transform",
                }}
                out={{ opacity: 0, scale: reduce ? 1 : 0.6, duration: 0.12 }}
              >
                {busy === "running" ? (
                  <Loader2 className="size-4 animate-spin [animation-duration:700ms]" />
                ) : busy === "done" ? (
                  <Check className="size-4" strokeWidth={2.5} />
                ) : Icon ? (
                  <Icon className="size-4" />
                ) : null}
              </Presence>
            </span>
            <span className="relative grid whitespace-nowrap">
              <Presence
                id={current?.value ?? "none"}
                popLayout
                className="col-start-1 row-start-1"
                from={{ opacity: 0, y: reduce ? 0 : 3 }}
                to={{
                  opacity: 1,
                  y: 0,
                  duration: 0.22,
                  delay: reduce ? 0 : 0.06,
                  ease: gEase.out,
                  clearProps: "transform",
                }}
                out={{
                  opacity: 0,
                  y: reduce ? 0 : -3,
                  duration: 0.12,
                  ease: gEase.out,
                }}
              >
                {current?.label}
              </Presence>
            </span>
          </span>
        </span>
      </button>

      <span aria-hidden className="w-px bg-primary-foreground/[0.2]" />

      <button
        ref={trigger}
        type="button"
        disabled={disabled}
        aria-label={menuLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" && !open) {
            event.preventDefault();
            openMenu();
          }
        }}
        className={cn("grid w-11 place-items-center rounded-r-full keep-rounded", ink, press)}
      >
        <span
          className="grid"
          style={{
            transform: `rotate(${open ? 180 : 0}deg)`,
            ...transition(["transform", reduce ? 0 : 240, CSS_OUT]),
          }}
        >
          <ChevronDown className="size-4" />
        </span>
      </button>

      {(open || leaving) && (
        <div
          ref={menu}
          id={menuId}
          role="menu"
          aria-label={menuLabel}
          onKeyDown={onMenuKey}
          style={{ transformOrigin: "top right" }}
          className="absolute top-full right-0 z-50 mt-1.5 w-[280px] rounded-lg border border-black/[0.045] bg-background p-1 text-foreground shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_2px_4px_rgba(0,0,0,0.04),0_12px_28px_-12px_rgba(0,0,0,0.22)] dark:border-white/[0.06] dark:bg-zinc-900 dark:shadow-[0_12px_28px_-12px_rgba(0,0,0,0.7)]"
        >
          {options.map((o, i) => {
            const ItemIcon = o.icon;
            const selected = o.value === value;
            return (
              <button
                key={o.value}
                ref={(el) => {
                  items.current[i] = el;
                }}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                tabIndex={i === active ? 0 : -1}
                onClick={() => choose(o.value)}
                onPointerMove={() => setActive(i)}
                className={cn(
                  "flex w-full cursor-pointer items-start gap-2.5 rounded-md px-2.5 py-2 text-left outline-none transition-colors duration-100",
                  i === active
                    ? "bg-black/[0.045] dark:bg-white/[0.06]"
                    : "bg-transparent",
                )}
              >
                <span className="mt-px grid size-4 shrink-0 place-items-center text-muted-foreground">
                  {ItemIcon ? <ItemIcon className="size-4" /> : null}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] leading-5 font-medium">
                    {o.label}
                  </span>
                  {o.description && (
                    <span className="block text-[12px] leading-4 text-muted-foreground">
                      {o.description}
                    </span>
                  )}
                </span>
                <span className="mt-0.5 grid size-4 shrink-0 place-items-center">
                  {selected && <Check className="size-4" strokeWidth={2.25} />}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <span className="sr-only" aria-live="polite">
        {busy === "running" ? `${current?.label}…` : busy === "done" ? "Done" : ""}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. AddToCart                                                               */
/* -------------------------------------------------------------------------- */

export type AddToCartProps = {
  price?: string;
  label?: string;
  quantity?: number;
  defaultQuantity?: number;
  onQuantityChange?: (quantity: number) => void | Promise<void>;
  max?: number;
  className?: string;
};

function CartIcon({ drops, reduce }: { drops: number; reduce: boolean }) {
  const parcel = React.useRef<HTMLSpanElement>(null);
  const cart = React.useRef<SVGSVGElement>(null);

  // A parcel falls into the basket, then the basket dips.
  React.useEffect(() => {
    const box = parcel.current;
    const basket = cart.current;
    if (!drops || reduce || !box || !basket) return;
    const timeline = gsap.timeline();
    timeline
      .set(box, { y: -11, opacity: 0, scale: 0.6 })
      .to(box, { opacity: 1, scale: 1, duration: 0.126, ease: gEase.drop }, 0)
      .to(box, { y: 4.5, duration: 0.294, ease: gEase.drop }, 0.126)
      .to(box, { opacity: 0, duration: 0.08 }, 0.42)
      .set(basket, { y: 0 }, 0)
      .to(basket, { y: 1.6, duration: 0.0992, ease: gEase.out }, 0.3844)
      .to(basket, { y: 0, duration: 0.1364, ease: gEase.out }, 0.4836);
    return () => {
      timeline.kill();
      gsap.set(box, { opacity: 0 });
      gsap.set(basket, { y: 0 });
    };
  }, [drops, reduce]);

  return (
    <span className="relative grid size-4 place-items-center">
      <span
        ref={parcel}
        aria-hidden
        className="absolute top-[1px] left-[6.5px] size-[5px] rounded-[1px] bg-current"
        style={{ opacity: 0 }}
      />
      <svg
        ref={cart}
        viewBox="0 0 16 16"
        className="size-4 overflow-visible"
        fill="none"
        aria-hidden
      >
        <path
          d="M1.5 2h1.6l1.6 8.2c.08.43.45.74.89.74h6.3c.42 0 .78-.29.88-.7L14 5H4"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={6.2} cy={13.6} r={1.1} fill="currentColor" />
        <circle cx={11.6} cy={13.6} r={1.1} fill="currentColor" />
      </svg>
    </span>
  );
}

function CartCount({ value, reduce }: { value: number; reduce: boolean }) {
  const [previous, setPrevious] = React.useState(value);
  const [direction, setDirection] = React.useState(1);
  if (value !== previous) {
    setDirection(value > previous ? 1 : -1);
    setPrevious(value);
  }
  return (
    <span className="relative inline-grid h-[1.25em] overflow-clip tabular-nums">
      <Presence
        id={value}
        className="col-start-1 row-start-1 leading-[1.25em]"
        from={{
          yPercent: reduce ? 0 : direction * 100,
          opacity: reduce ? 0 : 1,
        }}
        to={{
          yPercent: 0,
          opacity: 1,
          duration: 0.28,
          ease: gEase.out,
          clearProps: "transform",
        }}
        out={{
          yPercent: reduce ? 0 : direction * -100,
          opacity: reduce ? 0 : 1,
          duration: 0.28,
          ease: gEase.out,
        }}
      >
        {value}
      </Presence>
    </span>
  );
}

export function AddToCart({
  price = "$48.00",
  label = "Add to cart",
  quantity: controlled,
  defaultQuantity = 0,
  onQuantityChange,
  max,
  className,
}: AddToCartProps) {
  const reduce = usePrefersReducedMotion();
  const [own, setOwn] = React.useState(defaultQuantity);
  const [drops, setDrops] = React.useState(0);
  const scope = React.useRef<HTMLDivElement>(null);
  const addButton = React.useRef<HTMLButtonElement>(null);
  const plusButton = React.useRef<HTMLButtonElement>(null);
  const minusButton = React.useRef<HTMLButtonElement>(null);
  const quantity = controlled ?? own;
  const inCart = quantity > 0;
  const atMax = max !== undefined && quantity >= max;
  const wasInCart = React.useRef(inCart);

  React.useEffect(() => {
    if (wasInCart.current === inCart) return;
    const focusedInside = scope.current?.contains(document.activeElement);
    wasInCart.current = inCart;
    if (!focusedInside) return;
    (inCart ? plusButton : addButton).current?.focus({ preventScroll: true });
  }, [inCart]);

  const change = async (next: number) => {
    const clamped = Math.max(
      0,
      max === undefined ? next : Math.min(max, next),
    );
    if (clamped === quantity) return;
    const before = quantity;
    const handOff =
      max !== undefined &&
      clamped >= max &&
      document.activeElement === plusButton.current;
    if (clamped > before) setDrops((n) => n + 1);
    if (controlled === undefined) setOwn(clamped);
    if (handOff)
      requestAnimationFrame(() =>
        minusButton.current?.focus({ preventScroll: true }),
      );
    try {
      await onQuantityChange?.(clamped);
    } catch {
      if (controlled === undefined) setOwn(before);
      if (!reduce) shake(scope.current, 4, 0.36);
    }
  };

  const step =
    "grid h-full w-11 shrink-0 cursor-pointer place-items-center text-primary-foreground hover:bg-primary-foreground/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-foreground/45 disabled:cursor-default disabled:hover:bg-transparent";

  /** Both faces stay mounted and trade places with a delayed cross-fade. */
  const face = (shown: boolean, lead: number): React.CSSProperties => ({
    opacity: shown ? 1 : 0,
    visibility: shown ? "visible" : "hidden",
    ...transition(
      ["opacity", shown ? 200 : 120, CSS_OUT, shown && !reduce ? lead : 0],
      ["visibility", 0, "linear", shown ? 0 : 120],
    ),
  });

  /** The − and + buttons slide in from the sides once the stepper shows. */
  const stepSlide = (from: number, opacity: number): React.CSSProperties => ({
    opacity: inCart ? opacity : 0,
    transform: `translateX(${inCart || reduce ? 0 : from}px)`,
    ...transition(
      ["opacity", inCart ? 320 : 120, CSS_OUT, inCart && !reduce ? 220 : 0],
      ["transform", inCart ? 320 : 120, CSS_OUT, inCart && !reduce ? 220 : 0],
      ["background-color", 150, CSS_STANDARD],
    ),
  });

  return (
    <div
      ref={scope}
      className={cn(
        "relative inline-grid h-12 overflow-clip rounded-full keep-rounded bg-primary text-sm font-medium text-primary-foreground select-none",
        "bg-[linear-gradient(to_bottom,rgba(255,255,255,0.10),rgba(255,255,255,0)_55%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.08),0_0_1px_rgba(0,0,0,0.08),0_0_2px_rgba(0,0,0,0.04)]",
        "dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(0,0,0,0.06))] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.08)]",
        className,
      )}
    >
      <span
        aria-hidden
        className="invisible col-start-1 row-start-1 flex items-center gap-2 px-8 whitespace-nowrap"
      >
        <span className="size-4" />
        {label}
        {price && <span className="ml-1">· {price}</span>}
      </span>

      <div
        aria-hidden={inCart}
        className="col-start-1 row-start-1 grid"
        style={face(!inCart, 140)}
      >
        <button
          ref={addButton}
          type="button"
          tabIndex={inCart ? -1 : 0}
          onClick={() => change(1)}
          aria-label={price ? `${label}, ${price}` : label}
          className="flex cursor-pointer items-center justify-center gap-2 px-8 whitespace-nowrap transition-[background-color,transform,scale] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-primary-foreground/[0.04] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-foreground/45"
        >
          <CartIcon drops={0} reduce={reduce} />
          {label}
          {price && (
            <span className="ml-1 text-primary-foreground/65">· {price}</span>
          )}
        </button>
      </div>

      <div
        role="group"
        aria-label="Quantity in cart"
        aria-hidden={!inCart}
        className="col-start-1 row-start-1 flex items-center justify-between"
        style={face(inCart, 120)}
      >
        <button
          ref={minusButton}
          type="button"
          tabIndex={inCart ? 0 : -1}
          aria-label={quantity === 1 ? "Remove from cart" : "Remove one"}
          onClick={() => change(quantity - 1)}
          className={step}
          style={stepSlide(14, 1)}
        >
          <Minus className="size-4" strokeWidth={2} />
        </button>

        <span className="flex items-center gap-2">
          <CartIcon drops={drops} reduce={reduce} />
          <span className="flex items-center gap-1 whitespace-nowrap">
            <CartCount value={quantity} reduce={reduce} />
            <span className="leading-[1.25em] text-primary-foreground/65">
              in cart
            </span>
          </span>
        </span>

        <button
          ref={plusButton}
          type="button"
          tabIndex={inCart ? 0 : -1}
          aria-label="Add one"
          onClick={() => change(quantity + 1)}
          disabled={atMax}
          className={step}
          style={stepSlide(-14, atMax ? 0.4 : 1)}
        >
          <Plus className="size-4" strokeWidth={2} />
        </button>
      </div>

      <span className="sr-only" aria-live="polite">
        {inCart ? `${quantity} in cart` : ""}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 9. PaymentButton                                                           */
/* -------------------------------------------------------------------------- */

type PaymentButtonState = "idle" | "processing" | "paid" | "failed";

export type PaymentButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  amount?: string;
  label?: string;
  action?: () => Promise<void>;
  processingLabel?: string;
  paidLabel?: string;
  failedLabel?: string;
  failedDuration?: number;
  resetAfter?: number;
};

const paymentSlotClass =
  "invisible col-start-1 row-start-1 flex items-center justify-center gap-2 whitespace-nowrap";
const swapSlotClass = "flex items-center justify-center gap-2 whitespace-nowrap";

export const PaymentButton = React.forwardRef<
  HTMLButtonElement,
  PaymentButtonProps
>(
  (
    {
      amount = "$49.00",
      label = "Pay",
      action,
      processingLabel = "Processing",
      paidLabel = "Paid",
      failedLabel = "Payment failed",
      failedDuration = 1800,
      resetAfter,
      className,
      disabled,
      onClick,
      ...props
    },
    ref,
  ) => {
    const [state, setState] = React.useState<PaymentButtonState>("idle");
    const [attempt, setAttempt] = React.useState(0);
    const reduceMotion = usePrefersReducedMotion();
    const generation = React.useRef(0);
    const timer = React.useRef<number | undefined>(undefined);

    React.useEffect(() => {
      return () => {
        generation.current += 1;
        window.clearTimeout(timer.current);
      };
    }, []);

    const settle = (
      gen: number,
      next: PaymentButtonState,
      after?: number,
    ) => {
      setState(next);
      if (after === undefined) return;
      timer.current = window.setTimeout(() => {
        if (generation.current === gen) setState("idle");
      }, after);
    };

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (
        event.defaultPrevented ||
        !action ||
        disabled ||
        state !== "idle"
      )
        return;

      const button = event.currentTarget;
      const gen = ++generation.current;
      setState("processing");
      try {
        await action();
        if (generation.current === gen) settle(gen, "paid", resetAfter);
      } catch {
        if (generation.current !== gen) return;
        setAttempt((n) => n + 1);
        settle(gen, "failed", failedDuration);
        if (!reduceMotion) shake(button, 4, 0.36);
      }
    };

    const idle = (
      <>
        <Lock aria-hidden className="size-4 opacity-70" strokeWidth={2.25} />
        <span>
          {label} <span className="tabular-nums">{amount}</span>
        </span>
      </>
    );
    const processing = (
      <>
        <Loader2
          aria-hidden
          className="size-4 animate-spin [animation-duration:700ms]"
        />
        {processingLabel}
      </>
    );
    const paid = (
      <>
        <Check aria-hidden className="size-4" strokeWidth={2.5} />
        {paidLabel}
      </>
    );
    const failed = (
      <>
        <CircleAlert aria-hidden className="size-4" strokeWidth={2.25} />
        {failedLabel}
      </>
    );

    return (
      <button
        ref={ref}
        type="button"
        disabled={Boolean(disabled) || state !== "idle"}
        onClick={handleClick}
        aria-busy={state === "processing"}
        data-state={state}
        className={cn(
          "relative inline-flex h-12 w-full max-w-[280px] cursor-pointer items-center justify-center overflow-hidden rounded-full keep-rounded bg-primary px-5 text-sm font-medium text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.08),0_0_1px_rgba(0,0,0,0.08),0_0_2px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.08)]",
          "transition-[background-color,transform,scale] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-primary/95 active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none data-[state=idle]:disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <span className="grid">
          <span aria-hidden className={paymentSlotClass}>
            {idle}
          </span>
          <span aria-hidden className={paymentSlotClass}>
            {processing}
          </span>
          <span aria-hidden className={paymentSlotClass}>
            {paid}
          </span>
          <span aria-hidden className={paymentSlotClass}>
            {failed}
          </span>

          <SlideSlot
            id={state === "failed" ? `failed-${attempt}` : state}
            reduce={reduceMotion}
            className={swapSlotClass}
          >
            {state === "idle"
              ? idle
              : state === "processing"
                ? processing
                : state === "paid"
                  ? paid
                  : failed}
          </SlideSlot>
        </span>

        <span className="sr-only" aria-live="polite">
          {state === "processing"
            ? processingLabel
            : state === "paid"
              ? paidLabel
              : state === "failed"
                ? failedLabel
                : ""}
        </span>
      </button>
    );
  },
);
PaymentButton.displayName = "PaymentButton";

/* -------------------------------------------------------------------------- */
/* 10. InteractiveButton                                                      */
/* -------------------------------------------------------------------------- */

type InteractiveButtonState = "idle" | "loading" | "success";

export type InteractiveButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    action?: (progress: (value: number) => void) => Promise<void>;
    loadingLabel?: string;
    successLabel?: string;
    successDuration?: number;
  };

export const InteractiveButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveButtonProps
>(
  (
    {
      action,
      loadingLabel = "Downloading",
      successLabel = "Downloaded",
      successDuration = 1600,
      children = "Download",
      className,
      disabled,
      onClick,
      ...props
    },
    ref,
  ) => {
    const [state, setState] = React.useState<InteractiveButtonState>("idle");
    const [percent, setPercent] = React.useState<number | null>(null);
    const reduceMotion = usePrefersReducedMotion();
    const fill = React.useRef({ value: 0 });
    const fillEl = React.useRef<HTMLSpanElement>(null);
    const generation = React.useRef(0);
    const timer = React.useRef<number | undefined>(undefined);

    const paintFill = React.useCallback(() => {
      if (fillEl.current) {
        fillEl.current.style.transform = `scaleX(${fill.current.value})`;
      }
    }, []);

    const moveFill = React.useCallback(
      (to: number, duration: number, ease: (p: number) => number = gEase.out) =>
        tweenTo(fill.current, {
          value: to,
          duration: reduceMotion ? 0 : duration,
          ease,
          onUpdate: paintFill,
        }),
      [reduceMotion, paintFill],
    );

    React.useEffect(() => {
      const values = fill.current;
      return () => {
        generation.current += 1;
        window.clearTimeout(timer.current);
        gsap.killTweensOf(values);
      };
    }, []);

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented || !action || disabled || state !== "idle")
        return;

      const gen = ++generation.current;
      let determinate = false;
      gsap.killTweensOf(fill.current);
      fill.current.value = 0;
      paintFill();
      setPercent(null);
      setState("loading");
      void moveFill(0.9, 3.2, gEase.creep);

      const report = (value: number) => {
        if (generation.current !== gen) return;
        const clamped = Math.min(1, Math.max(0, value));
        determinate = true;
        setPercent(Math.round(clamped * 100));
        void moveFill(clamped, 0.3);
      };

      try {
        await action(report);
        if (generation.current !== gen) return;
        if (determinate) setPercent(100);
        await moveFill(1, 0.28);
        if (generation.current !== gen) return;
        setState("success");
        timer.current = window.setTimeout(() => {
          if (generation.current !== gen) return;
          setState("idle");
          void moveFill(0, 0.2);
        }, successDuration);
      } catch {
        if (generation.current !== gen) return;
        setState("idle");
        void moveFill(0, 0.2);
      }
    };

    const idleLabel = (
      <>
        <Download
          aria-hidden
          className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0.5"
        />
        {children}
      </>
    );
    const loadingText = (value: number | null) => (
      <>
        {loadingLabel}
        {value !== null && (
          <span className="inline-block w-[4ch] text-left tabular-nums text-muted-foreground">
            {value}%
          </span>
        )}
      </>
    );
    const successText = (
      <>
        <Check aria-hidden className="size-4" strokeWidth={2.5} />
        {successLabel}
      </>
    );

    return (
      <button
        ref={ref}
        type="button"
        disabled={Boolean(disabled) || state !== "idle"}
        onClick={handleClick}
        aria-busy={state === "loading"}
        data-state={state}
        className={cn(
          "group relative inline-flex h-12 cursor-pointer items-center justify-center overflow-hidden rounded-full keep-rounded border border-black/[0.045] bg-white px-5 text-sm font-medium text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_0_1px_rgba(0,0,0,0.05),0_0_1px_rgba(0,0,0,0.03)] dark:border-white/[0.06] dark:bg-background dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_1px_rgba(0,0,0,0.2),0_0_1px_rgba(0,0,0,0.12)]",
          "transition-[background-color,transform,scale] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-black/[0.03] active:scale-[0.98] dark:hover:bg-white/[0.035]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none data-[state=idle]:disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <span
          ref={fillEl}
          aria-hidden
          style={{ transform: "scaleX(0)" }}
          className="pointer-events-none absolute inset-0 origin-left bg-foreground/[0.07]"
        />

        <span className="relative grid">
          <span aria-hidden className={paymentSlotClass}>
            {idleLabel}
          </span>
          <span aria-hidden className={paymentSlotClass}>
            {loadingText(100)}
          </span>
          <span aria-hidden className={paymentSlotClass}>
            {successText}
          </span>

          <SlideSlot
            id={
              state === "loading"
                ? percent === null
                  ? "loading"
                  : "progress"
                : state
            }
            reduce={reduceMotion}
            className={swapSlotClass}
          >
            {state === "idle"
              ? idleLabel
              : state === "loading"
                ? loadingText(percent)
                : successText}
          </SlideSlot>
        </span>

        <span className="sr-only" aria-live="polite">
          {state === "loading"
            ? loadingLabel
            : state === "success"
              ? successLabel
              : ""}
        </span>
      </button>
    );
  },
);
InteractiveButton.displayName = "InteractiveButton";

/* -------------------------------------------------------------------------- */
/* 11. SlideToConfirm                                                         */
/* -------------------------------------------------------------------------- */

type SlideState = "idle" | "dragging" | "pending" | "done";

export type SlideToConfirmProps = {
  action?: () => Promise<void>;
  label?: string;
  pendingLabel?: string;
  doneLabel?: string;
  errorLabel?: string;
  threshold?: number;
  resetAfter?: number;
  disabled?: boolean;
  className?: string;
};

const SLIDE_HEIGHT = 48;
const SLIDE_INSET = 4;
const SLIDE_THUMB = 40;

export function SlideToConfirm({
  action,
  label = "Slide to deploy",
  pendingLabel = "Deploying",
  doneLabel = "Deployed",
  errorLabel = "Couldn't deploy",
  threshold = 0.9,
  resetAfter,
  disabled,
  className,
}: SlideToConfirmProps) {
  const [state, setState] = React.useState<SlideState>("idle");
  const [error, setError] = React.useState(false);
  const [width, setWidth] = React.useState(0);
  const [value, setValue] = React.useState(0);
  const reduce = usePrefersReducedMotion();
  const track = React.useRef<HTMLDivElement>(null);
  const thumbEl = React.useRef<HTMLButtonElement>(null);
  const fillEl = React.useRef<HTMLDivElement>(null);
  const radius = useElementRadius(track);
  const drag = React.useRef<{
    id: number;
    startX: number;
    origin: number;
    moved: boolean;
    at: number;
  } | null>(null);
  const timer = React.useRef<number | undefined>(undefined);
  const mounted = React.useRef(true);
  // The thumb's offset from its resting place, in px.
  const thumb = React.useRef({ x: 0 });
  const target = React.useRef(0);

  const r = Math.min(radius, SLIDE_HEIGHT / 2);
  const max = Math.max(0, width - SLIDE_THUMB - SLIDE_INSET * 2);

  /** Puts the thumb and the ink that trails it where `thumb.x` says. */
  const paint = React.useCallback(() => {
    const x = thumb.current.x;
    if (thumbEl.current) thumbEl.current.style.transform = `translateX(${x}px)`;
    if (fillEl.current) {
      const reach = Math.max(0, width - (x + SLIDE_THUMB + SLIDE_INSET * 2));
      fillEl.current.style.clipPath = `inset(0px ${reach}px 0px 0px round ${r}px)`;
      fillEl.current.style.opacity = String(Math.min(1, Math.max(0, x / 16)));
    }
  }, [width, r]);

  React.useLayoutEffect(() => {
    paint();
  }, [paint, width]);

  React.useEffect(() => {
    mounted.current = true;
    const values = thumb.current;
    return () => {
      mounted.current = false;
      gsap.killTweensOf(values);
      window.clearTimeout(timer.current);
    };
  }, []);

  React.useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setWidth(el.offsetWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const busy = state === "pending" || state === "done";

  const slideTo = (to: number, vars: gsap.TweenVars) =>
    tweenTo(thumb.current, { x: to, onUpdate: paint, ...vars });

  const sendBack = () => {
    setValue(0);
    target.current = 0;
    void slideTo(
      0,
      reduce ? { duration: 0 } : { duration: SPRING_RETURN.duration, ease: SPRING_RETURN.ease },
    );
  };

  const confirm = async () => {
    setState("pending");
    setValue(100);
    setError(false);
    await slideTo(max, { duration: reduce ? 0 : 0.18, ease: gEase.out });
    if (!mounted.current) return;
    if ("vibrate" in navigator) navigator.vibrate?.(12);
    try {
      await action?.();
      if (!mounted.current) return;
      setState("done");
      if (resetAfter !== undefined) {
        timer.current = window.setTimeout(() => {
          if (!mounted.current) return;
          setState("idle");
          sendBack();
        }, resetAfter);
      }
    } catch {
      if (!mounted.current) return;
      setState("idle");
      sendBack();
      setError(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(
        () => mounted.current && setError(false),
        1800,
      );
    }
  };

  const nudge = async () => {
    if (reduce) return;
    await slideTo(Math.min(28, max), { duration: 0.22, ease: gEase.out });
    void slideTo(0, {
      duration: SPRING_RETURN.duration,
      ease: SPRING_RETURN.ease,
    });
  };

  const onPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled || busy || event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    gsap.killTweensOf(thumb.current);
    drag.current = {
      id: event.pointerId,
      startX: event.clientX,
      origin: thumb.current.x,
      moved: false,
      at: performance.now(),
    };
    target.current = thumb.current.x;
    setState("dragging");
  };

  const onPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d || d.id !== event.pointerId) return;
    const dx = event.clientX - d.startX;
    if (Math.abs(dx) > 3) d.moved = true;
    thumb.current.x = Math.min(max, Math.max(0, d.origin + dx));
    paint();
  };

  const onPointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d || d.id !== event.pointerId) return;
    drag.current = null;
    if (max && thumb.current.x / max >= threshold) {
      void confirm();
      return;
    }
    setState("idle");
    if (!d.moved && performance.now() - d.at < 400) {
      void nudge();
      return;
    }
    sendBack();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled || busy) return;
    const step = max / 5;
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowUp")
      next = target.current + step;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown")
      next = target.current - step;
    if (event.key === "Home") next = 0;
    if (event.key === "End" || event.key === "Enter" || event.key === " ")
      next = max;
    if (next === null) return;
    event.preventDefault();
    const clamped = Math.min(max, Math.max(0, next));
    if (max && clamped / max >= threshold) {
      void confirm();
      return;
    }
    target.current = clamped;
    setValue(Math.round((clamped / (max || 1)) * 100));
    void slideTo(clamped, { duration: reduce ? 0 : 0.2, ease: gEase.out });
  };

  const measured = width > 0;
  const restText = error ? errorLabel : label;
  const restId = busy ? null : restText;
  const progressId = state === "pending" || state === "done" ? state : null;

  return (
    <div
      ref={track}
      data-state={state}
      className={cn(
        "relative w-[320px] max-w-full overflow-clip rounded-full keep-rounded text-sm font-medium select-none",
        "has-[[role=slider]:focus-visible]:outline-solid has-[[role=slider]:focus-visible]:outline-2 has-[[role=slider]:focus-visible]:outline-offset-2 has-[[role=slider]:focus-visible]:outline-ring/50",
        "border border-black/[0.04] bg-black/[0.035] shadow-[inset_0_0_2px_rgba(0,0,0,0.06)] dark:border-white/[0.05] dark:bg-white/[0.04] dark:shadow-[inset_0_0_2px_rgba(0,0,0,0.5)]",
        disabled && "opacity-50",
        className,
      )}
      style={{ height: SLIDE_HEIGHT }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 grid place-items-center text-muted-foreground"
        style={{ left: SLIDE_THUMB + SLIDE_INSET * 2 }}
      >
        <SlideSlot
          id={restId}
          reduce={reduce}
          className={cn(
            "whitespace-nowrap",
            error && "text-red-600 dark:text-red-400",
          )}
        >
          {restText}
        </SlideSlot>
      </span>

      {measured && (
        <div
          ref={fillEl}
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-primary bg-[linear-gradient(to_bottom,rgba(255,255,255,0.08),rgba(255,255,255,0)_60%)] dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(0,0,0,0.06))]"
        >
          <span
            className="absolute inset-y-0 right-0 grid place-items-center text-primary-foreground"
            style={{ left: SLIDE_THUMB + SLIDE_INSET * 2 }}
          >
            <SlideSlot id={restId} reduce={reduce} className="whitespace-nowrap">
              {restText}
            </SlideSlot>
          </span>
        </div>
      )}

      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 grid place-items-center text-primary-foreground"
        style={{ right: SLIDE_THUMB + SLIDE_INSET * 2 }}
      >
        <SlideSlot
          id={progressId}
          reduce={reduce}
          className="whitespace-nowrap"
        >
          {state === "pending" ? pendingLabel : doneLabel}
        </SlideSlot>
      </span>

      <button
        ref={thumbEl}
        type="button"
        role="slider"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-valuetext={
          state === "pending"
            ? pendingLabel
            : state === "done"
              ? doneLabel
              : `${value}%`
        }
        aria-disabled={disabled || busy}
        disabled={disabled}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        onContextMenu={(event) => event.preventDefault()}
        style={{
          width: SLIDE_THUMB,
          top: SLIDE_INSET,
          bottom: SLIDE_INSET,
          left: SLIDE_INSET,
        }}
        className={cn(
          "group absolute grid touch-none place-items-center rounded-full keep-rounded bg-background text-foreground",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_0_0_1px_rgba(0,0,0,0.04),0_0_1px_rgba(0,0,0,0.06),0_0_2px_rgba(0,0,0,0.04)] dark:bg-zinc-800 dark:text-zinc-100 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(255,255,255,0.06),0_0_1px_rgba(0,0,0,0.3),0_0_1px_rgba(0,0,0,0.2)]",
          "transition-shadow duration-150 focus-visible:outline-none",
          busy
            ? "cursor-default"
            : state === "dragging"
              ? "cursor-grabbing"
              : "cursor-grab",
        )}
      >
        <span className="grid size-4 place-items-center">
          <SlideSlot
            id={!busy ? "arrow" : state}
            reduce={reduce}
            className="grid place-items-center"
          >
            {!busy ? (
              <ArrowRight className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5" />
            ) : state === "pending" ? (
              <Loader2 className="size-4 animate-spin [animation-duration:700ms]" />
            ) : (
              <PopIn
                reduce={reduce}
                from={POP_FROM}
                className="grid place-items-center"
              >
                <Check className="size-4" strokeWidth={2.5} />
              </PopIn>
            )}
          </SlideSlot>
        </span>
      </button>

      <span className="sr-only" aria-live="polite">
        {state === "pending"
          ? pendingLabel
          : state === "done"
            ? doneLabel
            : error
              ? errorLabel
              : ""}
      </span>
    </div>
  );
}
