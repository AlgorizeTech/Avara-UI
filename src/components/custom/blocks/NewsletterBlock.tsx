"use client";

import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "./Button";
import { InputBlock } from "./InputBlock";
import { MarqueeBlock } from "./MarqueeBlock";
import { TiltedCard } from "./TiltedCardBlock";
import { bezierEase, gsapTicker } from "./gsap-motion";
import { createSpringFollower, FRAMER_EASE, springEase } from "./motion-curves";

// ==========================================
// NEWSLETTER
// A sign-up section in three layouts. `portraits` puts four readers' faces
// around a centred form on a soft panel and lets them drift with the pointer;
// `spotlight` is the same form on a dark panel with a glow under the cursor
// and a ticker of who just joined; `issues` puts the form beside a fanned
// stack of recent issues. One reveal when the section first appears, a
// form that turns into a thank-you when your promise resolves, and nothing
// else moves unless the reader does.
// ==========================================

export type NewsletterVariant = "portraits" | "spotlight" | "issues";

/** One part of the section's staggered reveal. */
interface RevealChild {
  el: HTMLElement;
  /** Start its entrance; `delay` is its place in the stagger. */
  play: (delay: number) => void;
}

/** The parts waiting for the reveal, played in document order. */
interface RevealRegistry {
  children: Set<RevealChild>;
  played: boolean;
  register: (child: RevealChild) => () => void;
  play: () => void;
}

/** Stagger between parts, and the pause before the first. */
const STAGGER = 0.11;
const DELAY_CHILDREN = 0.05;

function createRevealRegistry(): RevealRegistry {
  const registry: RevealRegistry = {
    children: new Set(),
    played: false,
    register(child) {
      registry.children.add(child);
      // Mounted after the reveal: come in straight away.
      if (registry.played) child.play(0);
      return () => {
        registry.children.delete(child);
      };
    },
    play() {
      if (registry.played) return;
      registry.played = true;
      Array.from(registry.children)
        .sort((a, b) => (a.el.compareDocumentPosition(b.el) & 2 ? 1 : -1))
        .forEach((child, i) => child.play(DELAY_CHILDREN + i * STAGGER));
    },
  };
  return registry;
}

interface NewsletterContextValue {
  variant: NewsletterVariant;
  reveal: "in-view" | "immediate";
  reduced: boolean;
  registry: RevealRegistry | null;
}

const NewsletterContext = createContext<NewsletterContextValue>({
  variant: "portraits",
  reveal: "in-view",
  reduced: false,
  registry: null,
});

const subscribeReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/** `prefers-reduced-motion: reduce`, false on the server. */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/** The rise: 0.7s on cubic-bezier(0.16, 1, 0.3, 1). */
const RISE_EASE = bezierEase([0.16, 1, 0.3, 1]);
const RISE_HIDDEN: React.CSSProperties = { opacity: 0, transform: "translateY(18px)" };

/** Form out: 0.2s on Framer's default `easeOut`. */
const EXIT_EASE = bezierEase(FRAMER_EASE.easeOut);
/** Thank-you in: 0.45s on cubic-bezier(0.16, 1, 0.3, 1); the tick draws on `easeOut`. */
const DONE_EASE = bezierEase([0.16, 1, 0.3, 1]);
const DONE_HIDDEN: React.CSSProperties = { opacity: 0, transform: "scale(0.96)" };
const CHECK_EASE = bezierEase(FRAMER_EASE.easeOut);

/** Animates as one child of the section's staggered reveal. */
function Reveal({ className, children }: { className?: string; children: React.ReactNode }) {
  const { reduced, registry } = useContext(NewsletterContext);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (reduced || !el || !registry) return;
    const state = { opacity: 0, y: 18 };
    let tween: gsap.core.Tween | null = null;
    const unregister = registry.register({
      el,
      play: (delay) => {
        tween = gsap.to(state, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: RISE_EASE,
          delay,
          onUpdate: () => {
            el.style.opacity = String(state.opacity);
            el.style.transform = state.y ? `translateY(${state.y}px)` : "none";
          },
        });
      },
    });
    return () => {
      unregister();
      tween?.kill();
    };
  }, [reduced, registry]);

  return (
    <div ref={ref} className={className} style={reduced ? undefined : RISE_HIDDEN}>
      {children}
    </div>
  );
}

// ------------------------------------------
// Heading, Intro
// ------------------------------------------
function Heading({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  const { variant } = useContext(NewsletterContext);
  return (
    <Reveal>
      <h2
        className={cn(
          "font-sans text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[2.6rem]",
          variant === "issues" ? "text-left" : "text-center",
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
  const { variant } = useContext(NewsletterContext);
  return (
    <Reveal>
      <p
        className={cn(
          "mt-4 max-w-md text-[15px] leading-[1.65] opacity-65",
          variant === "issues" ? "text-left" : "mx-auto text-center",
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
// Form — a pill with the button inside, that becomes a thank-you
// ------------------------------------------
export interface NewsletterFormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  placeholder?: string;
  /** Button label. */
  action?: string;
  /** Return a promise to keep the button busy; resolve to show the thank-you, throw to stay on the form. */
  onSubscribe?: (email: string) => void | Promise<void>;
  successTitle?: string;
  successText?: string;
}

function Form({
  placeholder = "name@email.com",
  action = "Subscribe now",
  onSubscribe,
  successTitle = "You're subscribed",
  successText = "Look out for the next edition in your inbox.",
  className,
  ...props
}: NewsletterFormProps) {
  const { variant, reduced } = useContext(NewsletterContext);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  // What is on screen: the form keeps its place until its exit has played.
  const [shown, setShown] = useState<"form" | "done">("form");
  const formRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<SVGPathElement>(null);

  // Form out (0.2s), then the thank-you in.
  useLayoutEffect(() => {
    if (!done || shown !== "form") return;
    const el = formRef.current;
    if (reduced || !el) {
      setShown("done");
      return;
    }
    const state = { opacity: 1, scale: 1 };
    const tween = gsap.to(state, {
      opacity: 0,
      scale: 0.97,
      duration: 0.2,
      ease: EXIT_EASE,
      onUpdate: () => {
        el.style.opacity = String(state.opacity);
        el.style.transform = `scale(${state.scale})`;
      },
      onComplete: () => setShown("done"),
    });
    return () => {
      tween.kill();
    };
  }, [done, shown, reduced]);

  // The thank-you settles in and the tick draws itself.
  useLayoutEffect(() => {
    if (shown !== "done" || reduced) return;
    const el = doneRef.current;
    const check = checkRef.current;
    if (!el || !check) return;
    const state = { opacity: 0, scale: 0.96, length: 0 };
    const tweens = [
      gsap.to(state, {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: DONE_EASE,
        onUpdate: () => {
          el.style.opacity = String(state.opacity);
          el.style.transform = state.scale !== 1 ? `scale(${state.scale})` : "none";
        },
      }),
      gsap.to(state, {
        length: 1,
        duration: 0.5,
        delay: 0.15,
        ease: CHECK_EASE,
        onUpdate: () => check.setAttribute("stroke-dasharray", `${state.length}px 1px`),
      }),
    ];
    return () => tweens.forEach((tween) => tween.kill());
    // Plays once, when the thank-you mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || busy) return;
    setBusy(true);
    try {
      await onSubscribe?.(email);
      setDone(true);
    } catch {
      // Stay on the form; the caller shows its own error.
    } finally {
      setBusy(false);
    }
  };

  return (
    <Reveal className={cn("mt-8 w-full max-w-[26rem]", variant !== "issues" && "mx-auto")}>
      {shown === "done" ? (
        <div
          key="done"
          ref={doneRef}
          role="status"
          style={reduced ? undefined : DONE_HIDDEN}
          className="flex items-center gap-3 rounded-full bg-card py-2 pl-2 pr-5 text-card-foreground shadow-[0_1px_2px_rgba(0,0,0,0.05),0_8px_24px_-12px_rgba(0,0,0,0.2)] dark:shadow-none dark:ring-1 dark:ring-border"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path
                ref={checkRef}
                d="M5 12.5l4.5 4.5L19 7.5"
                pathLength={1}
                strokeDashoffset="0px"
                strokeDasharray={reduced ? "1px 1px" : "0px 1px"}
              />
            </svg>
          </span>
          <span className="min-w-0 text-left">
            <span className="block text-[14px] font-semibold leading-tight">{successTitle}</span>
            <span className="block text-[12px] leading-tight text-muted-foreground">{successText}</span>
          </span>
        </div>
      ) : (
        <div key="form" ref={formRef}>
        <form
          onSubmit={submit}
          className={cn(
            "flex items-center gap-1 rounded-full p-1.5 transition-shadow duration-300",
            "bg-card shadow-[0_1px_2px_rgba(0,0,0,0.05),0_8px_24px_-12px_rgba(0,0,0,0.2)] focus-within:shadow-[0_1px_2px_rgba(0,0,0,0.05),0_12px_32px_-12px_rgba(0,0,0,0.28)]",
            "dark:shadow-none dark:ring-1 dark:ring-foreground/15 dark:backdrop-blur dark:focus-within:shadow-none dark:focus-within:ring-foreground/30",
            className,
          )}
          {...props}
        >
          {/* The library input, with its own box made invisible so the pill is the field. */}
          <InputBlock
            type="email"
            variant="filled"
            inputSize="md"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            aria-label="Email address"
            autoComplete="email"
            className="min-w-0 flex-1 gap-0 [&>div>div]:h-10 [&>div>div]:rounded-full [&>div>div]:border-0 [&>div>div]:bg-transparent [&>div>div]:px-4 [&>div>div]:shadow-none [&>div>div]:focus-within:bg-transparent [&>div>div]:focus-within:ring-0 [&_input]:text-foreground [&_input]:placeholder:text-muted-foreground"
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
        </form>
        </div>
      )}
    </Reveal>
  );
}

// ------------------------------------------
// Proof — a stack of faces and a line
// ------------------------------------------
export interface NewsletterProofProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: string[];
}

function Proof({ avatars, className, children, ...props }: NewsletterProofProps) {
  const { variant } = useContext(NewsletterContext);
  return (
    <Reveal>
      <div
        className={cn(
          "mt-7 flex items-center gap-3 text-[13px] font-medium text-foreground/65",
          variant !== "issues" && "justify-center",
          className,
        )}
        {...props}
      >
        <span className="flex items-center">
          <span className="flex -space-x-2">
            {avatars.slice(0, 5).map((src, i) => (
              <img
                key={src + i}
                src={src}
                alt=""
                className="h-7 w-7 rounded-full object-cover ring-2 ring-background"
              />
            ))}
          </span>
          <span
            className="-ml-1 grid h-7 w-7 place-items-center rounded-full bg-foreground text-[11px] font-semibold text-background ring-2 ring-background"
            aria-hidden
          >
            +
          </span>
        </span>
        <span>{children}</span>
      </div>
    </Reveal>
  );
}

// ------------------------------------------
// Ticker — who just joined (spotlight)
// ------------------------------------------
export interface NewsletterTickerItem {
  name: string;
  avatar?: string;
  when: string;
}

function Ticker({ items, className }: { items: NewsletterTickerItem[]; className?: string }) {
  return (
    <Reveal className={cn("mt-12 w-full", className)}>
      <MarqueeBlock direction="left" speed="slow" gap="0.75rem" fade pauseOnHover className="w-full">
        {items.map((it, i) => (
          <span
            key={it.name + i}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-card py-1.5 pl-1.5 pr-3.5 text-[12px] text-foreground/75 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_16px_-10px_rgba(0,0,0,0.2)] ring-1 ring-foreground/[0.08] dark:shadow-none"
          >
            {it.avatar ? (
              <img src={it.avatar} alt="" className="h-6 w-6 rounded-full object-cover" />
            ) : (
              <span className="grid h-6 w-6 place-items-center rounded-full bg-foreground/10 text-[10px] font-semibold">
                {it.name.slice(0, 1)}
              </span>
            )}
            <span className="font-semibold text-foreground">{it.name}</span> joined
            <span className="text-foreground/45">· {it.when}</span>
          </span>
        ))}
      </MarqueeBlock>
    </Reveal>
  );
}

// ------------------------------------------
// Issues — a fanned stack of recent issues (issues layout)
// ------------------------------------------
export interface NewsletterIssue {
  title: string;
  date: string;
  excerpt: string;
  /** A picture for the top card. */
  cover?: string;
  tag?: string;
}

function Issues({ items, className }: { items: NewsletterIssue[]; className?: string }) {
  const [top, ...rest] = items;
  if (!top) return null;
  return (
    <Reveal className={cn("relative mx-auto w-full max-w-[22rem] pt-8", className)}>
      {/* The two behind sit back, offset and turned; the stack spreads a little on hover. */}
      <div className="group relative">
        {rest.slice(0, 2).map((issue, i) => (
          <div
            key={issue.title}
            aria-hidden
            className={cn(
              "absolute inset-x-0 top-0 rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-[0_8px_24px_-14px_rgba(0,0,0,0.25)] transition-transform duration-500 ease-out",
              i === 0
                ? "-translate-y-4 scale-[0.94] rotate-[-4deg] group-hover:-translate-y-7 group-hover:rotate-[-7deg]"
                : "-translate-y-8 scale-[0.88] rotate-[3deg] group-hover:-translate-y-12 group-hover:rotate-[6deg]",
            )}
          >
            <p className="text-[11px] font-medium opacity-50">{issue.date}</p>
            <p className="mt-1 truncate text-[15px] font-semibold">{issue.title}</p>
          </div>
        ))}
        <TiltedCard tiltIntensity={7} glareOpacity={0.1} scaleOnHover={1.02} className="h-auto">
          <article className="rounded-2xl border border-border bg-card p-5 text-left text-card-foreground">
            {top.cover && (
              <div className="mb-4 h-32 overflow-hidden rounded-xl">
                <img src={top.cover} alt="" className="h-full w-full object-cover" />
              </div>
            )}
            <div className="flex items-center justify-between gap-3 text-[11px] font-medium">
              <span className="opacity-50">{top.date}</span>
              {top.tag && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">{top.tag}</span>}
            </div>
            <h3 className="mt-2 text-[17px] font-semibold leading-snug tracking-tight">{top.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed opacity-65">{top.excerpt}</p>
          </article>
        </TiltedCard>
      </div>
    </Reveal>
  );
}

// ------------------------------------------
// Portraits — four faces that drift with the pointer
// ------------------------------------------
export interface NewsletterPortrait {
  src: string;
  alt?: string;
}

const CORNERS = [
  { className: "left-[7%] top-[13%] h-20 w-20 lg:h-[5.5rem] lg:w-[5.5rem]", depth: 14 },
  { className: "right-[7%] top-[13%] h-16 w-16 lg:h-[4.5rem] lg:w-[4.5rem]", depth: -10 },
  { className: "bottom-[13%] left-[8%] h-16 w-16 lg:h-[4.5rem] lg:w-[4.5rem]", depth: -8 },
  { className: "bottom-[13%] right-[7%] h-20 w-20 lg:h-[5.5rem] lg:w-[5.5rem]", depth: 12 },
];

/** Pointer position as -1..1 across the panel, smoothed; the portraits and the spotlight read it. */
interface DriftBus {
  x: number;
  y: number;
  listeners: Set<() => void>;
}

/** Portrait entrance: a spring, after the portrait's own delay. */
const PORTRAIT_SPRING = springEase({ stiffness: 260, damping: 18 });
const PORTRAIT_HIDDEN: React.CSSProperties = { opacity: 0, transform: "scale(0.6)" };

function Portrait({
  portrait,
  corner,
  drift,
  index,
}: {
  portrait: NewsletterPortrait;
  corner: (typeof CORNERS)[number];
  drift: DriftBus;
  index: number;
}) {
  const { reduced, registry } = useContext(NewsletterContext);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (reduced || !el || !registry) return;
    const pose = { x: 0, y: 0, scale: 0.6, opacity: 0 };
    const render = () => {
      let t = "";
      if (pose.x) t += `translateX(${pose.x}px) `;
      if (pose.y) t += `translateY(${pose.y}px) `;
      if (pose.scale !== 1) t += `scale(${pose.scale}) `;
      el.style.transform = t ? t.trim() : "none";
      el.style.opacity = String(pose.opacity);
    };
    const follow = () => {
      pose.x = drift.x * corner.depth;
      pose.y = drift.y * corner.depth;
      render();
    };
    drift.listeners.add(follow);
    if (drift.x || drift.y) follow();

    let tween: gsap.core.Tween | null = null;
    const unregister = registry.register({
      el,
      // Its own delay, not its place in the stagger.
      play: () => {
        const progress = { value: 0 };
        tween = gsap.to(progress, {
          value: 1,
          duration: PORTRAIT_SPRING.duration,
          ease: PORTRAIT_SPRING.ease,
          delay: 0.35 + index * 0.08,
          onUpdate: () => {
            pose.opacity = progress.value;
            pose.scale = 0.6 + 0.4 * progress.value;
            render();
          },
        });
      },
    });
    return () => {
      drift.listeners.delete(follow);
      unregister();
      tween?.kill();
    };
  }, [reduced, registry, drift, corner.depth, index]);

  return (
    <div
      ref={ref}
      className={cn("absolute hidden overflow-hidden rounded-full md:block", corner.className)}
      style={reduced ? undefined : PORTRAIT_HIDDEN}
    >
      <img src={portrait.src} alt={portrait.alt ?? ""} className="h-full w-full object-cover" />
    </div>
  );
}

/** Spotlight: a soft disc of the accent that follows the pointer. */
const glowAt = (x: number, y: number) => {
  const at = (v: number) => `${(Math.max(-1, Math.min(1, v)) + 1) * 50}%`;
  return `radial-gradient(420px circle at ${at(x)} ${at(y)}, color-mix(in oklab, var(--primary) 22%, transparent), transparent 70%)`;
};
const GLOW_STYLE: React.CSSProperties = { background: glowAt(0, 0) };

function Glow({ drift }: { drift: DriftBus }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const follow = () => {
      el.style.background = glowAt(drift.x, drift.y);
    };
    drift.listeners.add(follow);
    follow();
    return () => {
      drift.listeners.delete(follow);
    };
  }, [drift]);
  return <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={GLOW_STYLE} />;
}

// ------------------------------------------
// Root
// ------------------------------------------
export interface NewsletterProps extends React.HTMLAttributes<HTMLElement> {
  variant?: NewsletterVariant;
  /** Up to four faces, for the `portraits` layout. */
  portraits?: NewsletterPortrait[];
  /** Accent for buttons, tags and the spotlight; defaults to the theme's primary. */
  accent?: string;
  reveal?: "in-view" | "immediate";
  children: React.ReactNode;
}

const isPart = (child: React.ReactNode, type: React.ElementType) =>
  React.isValidElement(child) && child.type === type;

export function Newsletter({
  variant = "portraits",
  portraits = [],
  accent,
  reveal = "in-view",
  className,
  style,
  children,
  ...props
}: NewsletterProps) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const [registry] = useState(createRevealRegistry);

  // Pointer position as -1..1 across the panel, smoothed; the portraits and
  // the spotlight read it.
  const [drift] = useState<DriftBus>(() => ({ x: 0, y: 0, listeners: new Set() }));
  const pointer = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);

  useLayoutEffect(() => {
    const notify = () => drift.listeners.forEach((listener) => listener());
    const options = { stiffness: 60, damping: 18, mass: 0.6, ticker: gsapTicker };
    const sx = createSpringFollower(0, (v) => {
      drift.x = v;
      notify();
    }, options);
    const sy = createSpringFollower(0, (v) => {
      drift.y = v;
      notify();
    }, options);
    pointer.current = { x: sx.set, y: sy.set };
    return () => {
      sx.destroy();
      sy.destroy();
      pointer.current = null;
    };
  }, [drift]);

  // One reveal: at once, or when 30% of the section is in view.
  useLayoutEffect(() => {
    const el = revealRef.current;
    if (!el) return;
    let observer: IntersectionObserver | null = null;
    if (reveal === "immediate") {
      registry.play();
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer?.disconnect();
          registry.play();
        },
        { threshold: 0.3 },
      );
      observer.observe(el);
    }
    return () => {
      observer?.disconnect();
      // A remount (Strict Mode) plays the reveal again from the top.
      registry.played = false;
    };
  }, [reveal, registry]);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    pointer.current?.x(((e.clientX - r.left) / r.width) * 2 - 1);
    pointer.current?.y(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onLeave = () => {
    pointer.current?.x(0);
    pointer.current?.y(0);
  };

  const all = React.Children.toArray(children);
  const issues = all.filter((c) => isPart(c, Issues));
  const ticker = all.filter((c) => isPart(c, Ticker));
  const body = all.filter((c) => !isPart(c, Issues) && !isPart(c, Ticker));

  const spotlight = variant === "spotlight";

  return (
    <NewsletterContext.Provider value={{ variant, reveal, reduced, registry }}>
      <section
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={cn(
          "relative isolate w-full overflow-hidden text-foreground",
          // Every layout follows the site's theme: a muted or plain ground by day, the page ground by night.
          variant === "issues" ? "bg-background" : "bg-muted dark:bg-background",
          className,
        )}
        style={accent ? ({ ...style, "--primary": accent } as React.CSSProperties) : style}
        {...props}
      >
      <div ref={revealRef} className="relative">
        {/* Spotlight: a soft disc of the accent that follows the pointer. */}
        {spotlight && !reduced && <Glow drift={drift} />}

        {variant === "portraits" &&
          portraits.slice(0, 4).map((p, i) => {
            const corner = CORNERS[i];
            return corner ? <Portrait key={p.src} portrait={p} corner={corner} drift={drift} index={i} /> : null;
          })}

        {variant === "issues" ? (
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 px-6 py-14 sm:px-10 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="flex flex-col items-start">{body}</div>
            <div>{issues}</div>
          </div>
        ) : (
          <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-16 sm:py-24">
            {variant === "portraits" && portraits.length > 0 && (
              <Reveal className="mb-6 flex -space-x-3 md:hidden">
                {portraits.slice(0, 4).map((p) => (
                  <img key={p.src} src={p.src} alt={p.alt ?? ""} className="h-12 w-12 rounded-full object-cover ring-2 ring-muted dark:ring-background" />
                ))}
              </Reveal>
            )}
            {body}
            {ticker}
          </div>
        )}
      </div>
      </section>
    </NewsletterContext.Provider>
  );
}

Newsletter.Heading = Heading;
Newsletter.Intro = Intro;
Newsletter.Form = Form;
Newsletter.Proof = Proof;
Newsletter.Ticker = Ticker;
Newsletter.Issues = Issues;

export default Newsletter;
