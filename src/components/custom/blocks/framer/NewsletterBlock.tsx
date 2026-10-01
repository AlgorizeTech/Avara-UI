"use client";

import React, { createContext, useContext, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/custom/blocks/Button";
import { InputBlock } from "@/components/custom/blocks/InputBlock";
import { MarqueeBlock } from "@/components/custom/blocks/MarqueeBlock";
import { TiltedCard } from "@/components/custom/blocks/TiltedCardBlock";

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

interface NewsletterContextValue {
  variant: NewsletterVariant;
  reveal: "in-view" | "immediate";
  reduced: boolean;
}

const NewsletterContext = createContext<NewsletterContextValue>({
  variant: "portraits",
  reveal: "in-view",
  reduced: false,
});

const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

/** Animates as one child of the section's staggered reveal. */
function Reveal({ className, children }: { className?: string; children: React.ReactNode }) {
  const { reduced } = useContext(NewsletterContext);
  return (
    <motion.div className={className} {...(reduced ? {} : { variants: rise })}>
      {children}
    </motion.div>
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
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.div
            key="done"
            role="status"
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 rounded-full bg-card py-2 pl-2 pr-5 text-card-foreground shadow-[0_1px_2px_rgba(0,0,0,0.05),0_8px_24px_-12px_rgba(0,0,0,0.2)] dark:shadow-none dark:ring-1 dark:ring-border"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
              <motion.svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <motion.path
                  d="M5 12.5l4.5 4.5L19 7.5"
                  initial={reduced ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                />
              </motion.svg>
            </span>
            <span className="min-w-0 text-left">
              <span className="block text-[14px] font-semibold leading-tight">{successTitle}</span>
              <span className="block text-[12px] leading-tight text-muted-foreground">{successText}</span>
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={false}
            {...(reduced ? {} : { exit: { opacity: 0, scale: 0.97, transition: { duration: 0.2 } } })}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
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

function Portrait({
  portrait,
  corner,
  mx,
  my,
  index,
}: {
  portrait: NewsletterPortrait;
  corner: (typeof CORNERS)[number];
  mx: MotionValue<number>;
  my: MotionValue<number>;
  index: number;
}) {
  const { reduced } = useContext(NewsletterContext);
  const x = useTransform(mx, (v) => v * corner.depth);
  const y = useTransform(my, (v) => v * corner.depth);
  return (
    <motion.div
      className={cn("absolute hidden overflow-hidden rounded-full md:block", corner.className)}
      {...(reduced
        ? {}
        : {
            style: { x, y },
            variants: {
              hidden: { opacity: 0, scale: 0.6 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { type: "spring" as const, stiffness: 260, damping: 18, delay: 0.35 + index * 0.08 },
              },
            },
          })}
    >
      <img src={portrait.src} alt={portrait.alt ?? ""} className="h-full w-full object-cover" />
    </motion.div>
  );
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
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);

  // Pointer position as -1..1 across the panel, smoothed; the portraits and
  // the spotlight read it.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });
  const glowX = useTransform(sx, [-1, 1], ["0%", "100%"]);
  const glowY = useTransform(sy, [-1, 1], ["0%", "100%"]);
  const glow = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(420px circle at ${x} ${y}, color-mix(in oklab, var(--primary) 22%, transparent), transparent 70%)`,
  );

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const all = React.Children.toArray(children);
  const issues = all.filter((c) => isPart(c, Issues));
  const ticker = all.filter((c) => isPart(c, Ticker));
  const body = all.filter((c) => !isPart(c, Issues) && !isPart(c, Ticker));

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0 : 0.11, delayChildren: reduced ? 0 : 0.05 } },
  };
  const revealProps =
    reveal === "immediate"
      ? { initial: "hidden" as const, animate: "visible" as const }
      : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.3 } };

  const spotlight = variant === "spotlight";

  return (
    <NewsletterContext.Provider value={{ variant, reveal, reduced }}>
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
      <motion.div className="relative" variants={container} {...revealProps}>
        {/* Spotlight: a soft disc of the accent that follows the pointer. */}
        {spotlight && !reduced && (
          <motion.div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: glow }} />
        )}

        {variant === "portraits" &&
          portraits.slice(0, 4).map((p, i) => {
            const corner = CORNERS[i];
            return corner ? <Portrait key={p.src} portrait={p} corner={corner} mx={sx} my={sy} index={i} /> : null;
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
      </motion.div>
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
