"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { AppleSelect } from "./AppleSelectBlock";
import { FlowCanvas, Flowchart, FlowConnection } from "./FlowchartBlock";

// ==========================================
// DATA FLOW
// A "sources → core → outputs" section: cards on the left feed one node in
// the middle, which fans out to cards on the right. The connectors are real
// curves measured from the cards, so they hold at any width; they draw in
// once when the section first scrolls into view and then carry a moving
// dash. Every card is a named part, so the content is entirely yours.
// ==========================================

type Point = { x: number; y: number };

const cardSurface =
  "rounded-2xl border border-border bg-card text-card-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_28px_-14px_rgba(0,0,0,0.16)]";

// ------------------------------------------
// Small pieces the cards are made of
// ------------------------------------------

/** A solid pill in the theme ink — counts and scores. */
function Pill({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full bg-foreground px-2.5 py-1 text-[10.5px] font-semibold leading-none tracking-tight text-background",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/** A hairline chip — attributes and facets. */
function Tag({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-foreground/10 bg-card px-2.5 py-1 text-[10px] font-medium leading-none text-foreground/70",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/** A quiet grey row inside an output card. */
function Row({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg bg-foreground/[0.04] px-3 py-2 text-[11px] font-medium text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ------------------------------------------
// Source — a group of platforms feeding the core
// ------------------------------------------
export interface DataFlowSourceItem {
  label: string;
  icon?: React.ReactNode;
}

export interface DataFlowSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  /** e.g. "2 sources" */
  count?: string;
  items: DataFlowSourceItem[];
}

function Source({ title, count, items, className, ...props }: DataFlowSourceProps) {
  return (
    <div data-flow="source" className={cn(cardSurface, "p-4", className)} {...props}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{title}</p>
        {count && <Pill>{count}</Pill>}
      </div>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item.label}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card py-1.5 pl-1.5 pr-3.5 text-[13px] font-semibold text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.05),0_4px_12px_-6px_rgba(0,0,0,0.12)]"
          >
            {item.icon && <span className="grid h-6 w-6 shrink-0 place-items-center [&>svg]:h-full [&>svg]:w-full">{item.icon}</span>}
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ------------------------------------------
// Core — the node in the middle
// ------------------------------------------
export interface DataFlowCoreProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
}

function Core({ title, subtitle, className, ...props }: DataFlowCoreProps) {
  return (
    <div
      data-flow="core"
      className={cn(cardSurface, "flex flex-col items-center justify-center px-6 py-9 text-center", className)}
      {...props}
    >
      <p className="text-[1.5rem] font-semibold leading-none tracking-tight text-foreground">{title}</p>
      {subtitle && (
        <p className="mt-2.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}

// ------------------------------------------
// Output — a result card on the right
// ------------------------------------------
export interface DataFlowOutputProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  /** e.g. "3,432 categories" */
  badge?: string;
  children?: React.ReactNode;
}

function Output({ title, badge, className, children, ...props }: DataFlowOutputProps) {
  return (
    <div data-flow="output" className={cn(cardSurface, "p-4", className)} {...props}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[13px] font-semibold tracking-tight text-foreground">{title}</p>
        {badge && <Pill>{badge}</Pill>}
      </div>
      {children && <div className="mt-2.5 space-y-2">{children}</div>}
    </div>
  );
}

// ------------------------------------------
// Root
// ------------------------------------------
export interface DataFlowProps extends React.HTMLAttributes<HTMLElement> {
  /** Small line over the heading. */
  eyebrow?: React.ReactNode;
  heading: React.ReactNode;
  /** Paragraph under the heading. Phrases listed in `highlights` are selected in it, iOS-style. */
  intro?: string;
  /** Phrases from `intro` to select — each is matched once, in order of appearance. */
  highlights?: string[];
  /** Colour of the moving dashes and any accent inside; defaults to the theme's primary. */
  accent?: string;
  /** Play the reveal when the section enters the viewport (default) or immediately. */
  reveal?: "in-view" | "immediate";
  children: React.ReactNode;
}

const isPart = (child: React.ReactNode, type: React.ElementType) =>
  React.isValidElement(child) && child.type === type;

function curve(from: Point, to: Point, vertical: boolean) {
  if (vertical) {
    const k = (to.y - from.y) / 2;
    return `M ${from.x} ${from.y} C ${from.x} ${from.y + k}, ${to.x} ${to.y - k}, ${to.x} ${to.y}`;
  }
  const k = (to.x - from.x) / 2;
  return `M ${from.x} ${from.y} C ${from.x + k} ${from.y}, ${to.x - k} ${to.y}, ${to.x} ${to.y}`;
}

function DataFlowRoot({
  eyebrow,
  heading,
  intro,
  highlights = [],
  accent,
  reveal = "in-view",
  className,
  style,
  children,
  ...props
}: DataFlowProps) {
  const all = React.Children.toArray(children);
  const sources = all.filter((c) => isPart(c, Source));
  const core = all.find((c) => isPart(c, Core));
  const outputs = all.filter((c) => isPart(c, Output));

  const sectionRef = useRef<HTMLElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(reveal === "immediate");
  const [linesReady, setLinesReady] = useState(false);
  const [paths, setPaths] = useState<string[]>([]);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  // Wait for the section before anything moves.
  useEffect(() => {
    if (inView) return;
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView]);

  // Measure the cards and lay curves between them. Runs again whenever the
  // board changes size, so the lines follow the layout.
  useEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    const measure = () => {
      const b = board.getBoundingClientRect();
      const coreEl = board.querySelector<HTMLElement>('[data-flow="core"]');
      if (!coreEl) return;
      const c = coreEl.getBoundingClientRect();
      const rel = (r: DOMRect) => ({
        left: r.left - b.left,
        right: r.right - b.left,
        top: r.top - b.top,
        bottom: r.bottom - b.top,
        cx: r.left - b.left + r.width / 2,
        cy: r.top - b.top + r.height / 2,
      });
      const cr = rel(c);
      const next: string[] = [];
      const GAP = 6;

      board.querySelectorAll<HTMLElement>('[data-flow="source"]').forEach((el) => {
        const r = rel(el.getBoundingClientRect());
        // Side by side: leave the card's right edge for the core's left. Stacked: drop from its bottom.
        const vertical = r.right > cr.left;
        next.push(
          vertical
            ? curve({ x: r.cx, y: r.bottom + GAP }, { x: cr.cx, y: cr.top - GAP }, true)
            : curve({ x: r.right + GAP, y: r.cy }, { x: cr.left - GAP, y: cr.cy }, false),
        );
      });
      board.querySelectorAll<HTMLElement>('[data-flow="output"]').forEach((el) => {
        const r = rel(el.getBoundingClientRect());
        const vertical = r.left < cr.right;
        next.push(
          vertical
            ? curve({ x: cr.cx, y: cr.bottom + GAP }, { x: r.cx, y: r.top - GAP }, true)
            : curve({ x: cr.right + GAP, y: cr.cy }, { x: r.left - GAP, y: r.cy }, false),
        );
      });
      setPaths(next);
      setSize({ w: b.width, h: b.height });
    };

    measure();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(board);
    return () => ro.disconnect();
  }, [sources.length, outputs.length]);

  // The one orchestrated moment: sources arrive, lines draw to the core, the
  // core lands, lines draw on, outputs arrive. Holds still for reduced motion.
  useEffect(() => {
    if (!inView) return;
    const board = boardRef.current;
    if (!board) return;
    const reduced =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const src = board.querySelectorAll('[data-flow="source"]');
    const coreEl = board.querySelector('[data-flow="core"]');
    const out = board.querySelectorAll('[data-flow="output"]');
    if (reduced) {
      setLinesReady(true);
      return;
    }
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(src, { opacity: 0, x: -28 }, { opacity: 1, x: 0, duration: 0.7, stagger: 0.09 }, 0)
      .call(() => setLinesReady(true), [], 0.35)
      .fromTo(coreEl, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.6)" }, 0.75)
      .fromTo(out, { opacity: 0, x: 28 }, { opacity: 1, x: 0, duration: 0.7, stagger: 0.09 }, 1.35);
    return () => {
      tl.kill();
    };
  }, [inView]);

  const sourceCount = sources.length;

  // Turn the highlight phrases into character ranges; a phrase that is not in
  // the text is skipped rather than throwing.
  const ranges: [number, number][] = [];
  if (intro) {
    let from = 0;
    for (const phrase of highlights) {
      const at = intro.indexOf(phrase, from);
      if (at === -1) continue;
      ranges.push([at, at + phrase.length]);
      from = at + phrase.length;
    }
  }

  return (
    <section
      ref={sectionRef}
      className={cn("w-full bg-background text-foreground", className)}
      style={accent ? ({ ...style, "--primary": accent } as React.CSSProperties) : style}
      {...props}
    >
      {(eyebrow || heading || intro) && (
        <header className="mx-auto max-w-2xl px-6 pb-12 pt-14 text-center sm:pb-14 sm:pt-16">
          {eyebrow && (
            <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-muted-foreground">{eyebrow}</p>
          )}
          <h2 className="mt-3 font-sans text-[2.25rem] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[2.75rem]">
            {heading}
          </h2>
          {intro && (
            <AppleSelect
              text={intro}
              selection={ranges}
              animate={inView}
              className="mx-auto mt-5 max-w-[38rem] text-[17px] leading-[1.85] text-foreground/65 [&_mark]:font-semibold [&_mark]:text-foreground"
            />
          )}
        </header>
      )}

      {/* A hairline with a soft shadow under it, so the board reads as a stage. */}
      <div className="h-px w-full bg-border shadow-[0_6px_18px_-6px_rgba(0,0,0,0.12)]" aria-hidden />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16">
        <Flowchart layout="fluid" initialActivePath="flow" color="primary">
          <div
            ref={boardRef}
            className="relative grid grid-cols-1 gap-y-3 lg:grid-cols-[minmax(0,1fr)_13rem_minmax(0,1fr)] lg:gap-x-12 lg:gap-y-0 xl:grid-cols-[minmax(0,1fr)_15.5rem_minmax(0,1fr)] xl:gap-x-24 2xl:gap-x-28"
          >
            {size.w > 0 && linesReady && (
              <FlowCanvas
                width={size.w}
                height={size.h}
                viewBox={`0 0 ${size.w} ${size.h}`}
                preserveAspectRatio="none"
                // Under the cards: if a curve ever crosses one it disappears behind it.
                className="z-0 hidden overflow-visible lg:block"
              >
                {paths.map((d, i) => (
                  <FlowConnection
                    key={i}
                    id="flow"
                    path={d}
                    dashed="4 7"
                    flowDash="14 46"
                    glow={false}
                    drawDuration={i < sourceCount ? 0.9 : 1.1}
                    className="text-foreground/15"
                  />
                ))}
              </FlowCanvas>
            )}

            <div className="relative z-10 flex flex-col justify-center gap-4">{sources}</div>

            {/* Below lg the columns stack; short dashed spines stand in for the curves. */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-3">
              <span className="h-7 w-px border-l border-dashed border-foreground/25 lg:hidden" aria-hidden />
              <div className="w-full max-w-[15.5rem]">{core}</div>
              <span className="h-7 w-px border-l border-dashed border-foreground/25 lg:hidden" aria-hidden />
            </div>

            <div className="relative z-10 flex flex-col justify-center gap-4">{outputs}</div>
          </div>
        </Flowchart>
      </div>
    </section>
  );
}

export const DataFlow = Object.assign(DataFlowRoot, {
  Source,
  Core,
  Output,
  Pill,
  Tag,
  Row,
});

export default DataFlow;
