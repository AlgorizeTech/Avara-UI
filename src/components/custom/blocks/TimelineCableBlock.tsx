"use client";

import { cn } from "@/lib/utils";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePrefersReducedMotion } from "./timeline-scroll";

export type TimelineCableEvent = {
  /** Stable identity, used for `value` and React keys. */
  id: string;
  /** ISO date string or Date. Read in UTC. */
  date: string | Date;
  title: string;
  /** Visual shown inside the card. Keep it non-interactive: the card itself is the button. */
  media?: React.ReactNode;
  /** Footer line under the media: a stat, a tag, a reaction count. */
  meta?: React.ReactNode;
};

export interface TimelineCableBlockProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange" | "defaultValue"> {
  events: TimelineCableEvent[];
  /** Focused event id (controlled). */
  value?: string;
  /** Initially focused event id (uncontrolled). Defaults to the first event. */
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  /** Card width in px at full size. Shrinks to fit narrow containers. */
  itemWidth?: number;
  /** Stage height in px. */
  height?: number;
  /** Large year numerals drifting behind the cards. */
  years?: boolean;
  /** A group of ticks in each gap between cards. */
  ruler?: boolean;
  /** Lines fanning from the top and bottom centre to the cards near the centre. */
  cables?: boolean;
  /** Moves the track with the mouse wheel and trackpad scroll, vertical as well as sideways. */
  wheel?: boolean;
  formatDate?: (date: Date) => string;
  formatYear?: (date: Date) => string;
  /** Names the timeline for screen readers. */
  "aria-label"?: string;
}

// Neighbours rest at this scale, veiled by SIDE_DIM; the focused event sits at
// full strength. The card is dimmed by a veil in the stage colour rather than
// by opacity, so it stays solid and nothing behind shows through it.
const SIDE_SCALE = 0.72;
const SIDE_DIM = 0.45;
// Year numerals drift at this fraction of the track speed, so they read as a
// far layer behind the cards.
const YEAR_PARALLAX = 0.5;
// Gap above the year numerals, as a fraction of their font size.
const YEAR_INSET = 0.33;
// Cards sit on the stage middle, between two equal bands: the top one holds
// the year numerals, and each holds the apex one fan of cables leaves from.
const CARD_CENTER = 0.5;
// Each gap between cards holds a group of ticks: GAP_TICKS lines spread over
// GAP_TICK_SPAN of the gap, the middle one taller and brighter. Heights are
// fractions of the card width so the group scales with the cards.
const GAP_TICKS = 5;
const GAP_TICK_SPAN = 0.7;
const TICK_SHORT = 0.13;
const TICK_TALL = 0.2;
// Cables reach this far across a card's half-width, so they meet its top edge
// just inside the corners. Only the focused card and its two neighbours carry
// them: full strength out to CABLE_HOLD events from the centre, gone by
// CABLE_FADE.
const CABLE_REACH = 0.8;
const CABLE_HOLD = 1;
const CABLE_FADE = 1.6;
// Pointer travel before a press becomes a drag. Below it the press is a click.
const DRAG_THRESHOLD = 4;
// Past either end the track follows the pointer at this fraction.
const RUBBER_BAND = 0.3;
// Wheel distance, in px, that moves the track by one event.
const WHEEL_PX = 190;
// Events a flick carries on per unit of release velocity (events/s), capped.
const FLICK_MOMENTUM = 0.3;
const MAX_FLICK_EVENTS = 4;

// Below this stage width the block switches to its compact layout: a shorter
// stage and smaller year numerals, so one card and its neighbours fit a phone.
const NARROW_WIDTH = 640;
const NARROW_MAX_HEIGHT = 460;
// Stage width the tick groups are sized for in the compact layout.
const NARROW_REFERENCE = 390;
const NARROW_YEAR_SCALE = 0.6;

const MONTH = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });

const toDate = (date: string | Date) => (typeof date === "string" ? new Date(date) : date);
const defaultFormatYear = (date: Date) => String(date.getUTCFullYear());
const defaultFormatDate = (date: Date) =>
  `${MONTH.format(date)} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

type Geometry = {
  /** Track px per event. */
  step: number;
  /** Card width at full size. */
  cardWidth: number;
  /** Distance from the focused card's centre to a neighbour's. */
  near: number;
  halfWidth: number;
  gap: number;
};

/** Card centre relative to the stage centre. Over the first step a card travels
 * `near`, which leaves the same gap beside the bigger focused card as between
 * the smaller cards further out, one `step` apart. */
function cardX(o: number, { step, near }: Geometry) {
  const a = Math.abs(o);
  return Math.sign(o) * (a <= 1 ? a * near : near + (a - 1) * step);
}

const cardScale = (o: number) => 1 - (1 - SIDE_SCALE) * Math.min(Math.abs(o), 1);

function geometryFor(width: number, itemWidth: number): Geometry {
  const stage = width || 800;
  // About a third of the stage at most, so each neighbour shows in full or
  // nearly beside the focused card; phones give the card more of the width and
  // keep a sliver of each neighbour.
  const cardWidth = Math.min(itemWidth, stage * (stage < NARROW_WIDTH ? 0.58 : 0.36));
  // One gap everywhere, wide enough to hold the tick group between cards.
  const gap = clamp(cardWidth * 0.22, 40, 72);
  return {
    step: cardWidth * SIDE_SCALE + gap,
    cardWidth,
    near: (cardWidth * (1 + SIDE_SCALE)) / 2 + gap,
    halfWidth: stage / 2,
    gap,
  };
}

/**
 * A horizontal timeline of cards on a playhead. The focused card sits at the
 * centre, its neighbours step back, and cables run from the top and bottom of
 * the playhead to the cards beside it. Drag it sideways, scroll the mouse wheel
 * or trackpad over it, press the arrow keys or click a card to move. The wheel
 * only moves it while there is somewhere to go, so the page keeps scrolling once
 * the first or last card is reached.
 */
export const TimelineCableBlock = forwardRef<HTMLElement, TimelineCableBlockProps>(
  (
    {
      events,
      value,
      defaultValue,
      onValueChange,
      itemWidth = 340,
      height = 600,
      years = true,
      ruler = true,
      cables = true,
      wheel = true,
      formatDate = defaultFormatDate,
      formatYear = defaultFormatYear,
      "aria-label": ariaLabel = "Timeline",
      className,
      style: styleProp,
      ...props
    },
    ref,
  ) => {
    const reduced = usePrefersReducedMotion();
    const hintId = useId();
    const count = events.length;
    const last = Math.max(0, count - 1);

    const [innerValue, setInnerValue] = useState(defaultValue ?? events[0]?.id);
    const activeId = value ?? innerValue;
    // An unknown or removed id falls back to the first event, so there is always
    // exactly one tab stop.
    const found = events.findIndex((e) => e.id === activeId);
    const activeIndex = found === -1 ? 0 : found;

    // Whether the stage is phone-width. Changes only when it crosses the
    // breakpoint, so resizing does not re-render the cards.
    const [narrow, setNarrow] = useState(false);
    const stageRef = useRef<HTMLElement | null>(null);
    const setRefs = useCallback(
      (node: HTMLElement | null) => {
        stageRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );
    const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const veilRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const cableRefs = useRef<(SVGGElement | null)[]>([]);
    const tickRefs = useRef<(HTMLDivElement | null)[]>([]);
    const yearRefs = useRef<(HTMLDivElement | null)[]>([]);

    const dates = useMemo(() => events.map((e) => toDate(e.date)), [events]);
    // One numeral per year, centred on the boundary where that year begins.
    const yearMarks = useMemo(() => {
      const marks: { key: string; label: string; position: number }[] = [];
      let previous: number | null = null;
      dates.forEach((date, i) => {
        const year = date.getUTCFullYear();
        if (year === previous) return;
        previous = year;
        marks.push({ key: String(year), label: formatYear(date), position: i === 0 ? 0 : i - 0.5 });
      });
      return marks;
    }, [dates, formatYear]);

    // The track. `pos` is a position in events (event i is centred at pos = i);
    // it is written straight to the DOM, so a drag or a wheel turn never
    // re-renders the cards.
    const state = useRef({
      pos: activeIndex,
      target: activeIndex,
      width: 0,
      raf: 0,
      dragging: false,
      gliding: false,
      last,
      smooth: !reduced,
      events,
      activeIndex,
      onValueChange,
      itemWidth,
      height,
      marks: yearMarks,
    });
    // Keep the values the track reads current.
    useLayoutEffect(() => {
      const m = state.current;
      m.last = last;
      m.smooth = !reduced;
      m.events = events;
      m.onValueChange = onValueChange;
      m.itemWidth = itemWidth;
      m.height = height;
      m.marks = yearMarks;
    });

    const commit = useCallback((index: number) => {
      const m = state.current;
      const event = m.events[index];
      if (!event || index === m.activeIndex) return;
      m.activeIndex = index;
      setInnerValue(event.id);
      m.onValueChange?.(event.id);
    }, []);

    const paint = useCallback(() => {
      const m = state.current;
      const g = geometryFor(m.width, m.itemWidth);
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const o = i - m.pos;
        el.style.width = `${g.cardWidth}px`;
        el.style.marginLeft = `${-g.cardWidth / 2}px`;
        el.style.transform = `translateX(${cardX(o, g).toFixed(2)}px) scale(${cardScale(o).toFixed(4)})`;
        // Nearer the centre paints on top, so a card arriving slides over the
        // one leaving mid-drag.
        el.style.zIndex = String(100 - Math.round(Math.abs(o) * 10));
        const veil = veilRefs.current[i];
        if (veil) veil.style.opacity = String(SIDE_DIM * Math.min(Math.abs(o), 1));
        const group = cableRefs.current[i];
        if (group) {
          const reach = (g.cardWidth / 2) * cardScale(o) * CABLE_REACH;
          const left = g.halfWidth + cardX(o, g) - reach;
          const right = g.halfWidth + cardX(o, g) + reach;
          group.style.opacity = String(
            clamp((CABLE_FADE - Math.abs(o)) / (CABLE_FADE - CABLE_HOLD), 0, 1),
          );
          const lines = group.children;
          const xs = [left, right, left, right];
          for (let k = 0; k < 4; k++) {
            lines[k]?.setAttribute("x1", g.halfWidth.toFixed(2));
            lines[k]?.setAttribute("x2", xs[k].toFixed(2));
          }
        }
        const ticks = tickRefs.current[i];
        if (ticks) {
          const right = cardX(o, g) + (g.cardWidth * cardScale(o)) / 2;
          const left = cardX(o + 1, g) - (g.cardWidth * cardScale(o + 1)) / 2;
          ticks.style.transform = `translateX(${((right + left) / 2).toFixed(2)}px)`;
        }
      });
      m.marks.forEach((mark, i) => {
        const el = yearRefs.current[i];
        if (el) {
          el.style.transform = `translateX(${((mark.position - m.pos) * g.step * YEAR_PARALLAX).toFixed(2)}px)`;
        }
      });
    }, []);

    const run = useCallback(() => {
      const m = state.current;
      cancelAnimationFrame(m.raf);
      let prev = performance.now();
      const tick = (now: number) => {
        const dt = Math.min(now - prev, 48);
        prev = now;
        if (!m.dragging) {
          const diff = m.target - m.pos;
          if (!m.smooth || Math.abs(diff) < 0.0008) m.pos = m.target;
          else m.pos += diff * (1 - Math.exp(-dt / 110));
        }
        paint();
        // While a glide runs the target is already committed, so passing over the
        // events in between must not hand focus back to them.
        if (!m.gliding) commit(clamp(Math.round(m.pos), 0, m.last));
        if (m.dragging || m.pos !== m.target) m.raf = requestAnimationFrame(tick);
        else m.gliding = false;
      };
      m.raf = requestAnimationFrame(tick);
    }, [paint, commit]);

    const glideTo = useCallback(
      (index: number) => {
        const m = state.current;
        const to = clamp(Math.round(index), 0, m.last);
        m.dragging = false;
        m.gliding = true;
        m.target = to;
        commit(to);
        run();
      },
      [run, commit],
    );

    // Measure the stage and keep every card, cable and tick placed.
    useLayoutEffect(() => {
      const el = stageRef.current;
      if (!el) return;
      const m = state.current;
      m.width = el.clientWidth;
      setNarrow(m.width < NARROW_WIDTH);
      m.target = clamp(m.target, 0, last);
      m.pos = clamp(m.pos, 0, last);
      paint();
      const observer =
        typeof ResizeObserver !== "undefined"
          ? new ResizeObserver(() => {
              m.width = el.clientWidth;
              setNarrow(m.width < NARROW_WIDTH);
              paint();
            })
          : null;
      observer?.observe(el);
      return () => observer?.disconnect();
    }, [paint, last, count, itemWidth, height, yearMarks]);

    useEffect(() => () => cancelAnimationFrame(state.current.raf), []);

    // Follow a value changed from outside (controlled), or a list that shrank.
    useEffect(() => {
      const m = state.current;
      m.activeIndex = activeIndex;
      if (m.dragging || m.gliding) return;
      if (clamp(Math.round(m.pos), 0, last) === activeIndex) return;
      glideTo(activeIndex);
    }, [activeIndex, last, glideTo]);

    // Sideways drag, wheel and trackpad.
    useEffect(() => {
      const el = stageRef.current;
      if (!el) return;
      const m = state.current;
      let settle = 0;
      let pointer = -1;
      let moved = false;
      let startX = 0;
      let startPos = 0;
      let lastX = 0;
      let lastT = 0;
      let prevX = 0;
      let prevT = 0;

      const stepPx = () => geometryFor(m.width, m.itemWidth).step;

      const onWheel = (e: WheelEvent) => {
        if (!wheel || e.ctrlKey) return;
        const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 400 : 1;
        const raw = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        const delta = raw * unit;
        if (!delta) return;
        // At either end the wheel belongs to the page again.
        if ((delta > 0 && m.target >= m.last - 0.001) || (delta < 0 && m.target <= 0.001)) return;
        e.preventDefault();
        m.gliding = false;
        m.dragging = false;
        m.target = clamp(m.target + delta / WHEEL_PX, 0, m.last);
        run();
        window.clearTimeout(settle);
        settle = window.setTimeout(() => glideTo(m.target), 140);
      };
      const onDown = (e: PointerEvent) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        window.clearTimeout(settle);
        m.gliding = false;
        pointer = e.pointerId;
        moved = false;
        const now = performance.now();
        startX = lastX = prevX = e.clientX;
        lastT = prevT = now;
        startPos = m.pos;
        m.target = m.pos;
      };
      const onMove = (e: PointerEvent) => {
        if (e.pointerId !== pointer) return;
        const dx = e.clientX - startX;
        if (!moved) {
          if (Math.abs(dx) < DRAG_THRESHOLD) return;
          // Capture only once it is a drag, so a plain press still clicks the
          // card under it; after a drag the click lands on the stage instead.
          moved = true;
          m.dragging = true;
          try {
            el.setPointerCapture(e.pointerId);
          } catch {
            /* the pointer is already gone */
          }
          run();
        }
        const raw = startPos - dx / stepPx();
        m.pos =
          raw < 0
            ? raw * RUBBER_BAND
            : raw > m.last
              ? m.last + (raw - m.last) * RUBBER_BAND
              : raw;
        m.target = m.pos;
        prevX = lastX;
        prevT = lastT;
        lastX = e.clientX;
        lastT = performance.now();
      };
      const onUp = (e: PointerEvent) => {
        if (e.pointerId !== pointer) return;
        pointer = -1;
        if (!moved) return;
        try {
          el.releasePointerCapture(e.pointerId);
        } catch {
          /* already released */
        }
        const dt = lastT - prevT;
        const velocity = dt > 0 ? (-(lastX - prevX) / dt / stepPx()) * 1000 : 0; // events per second
        const carry = clamp(velocity * FLICK_MOMENTUM, -MAX_FLICK_EVENTS, MAX_FLICK_EVENTS);
        glideTo(m.pos + carry);
      };
      // A drag should not also click the card it ended on.
      const onClick = (e: MouseEvent) => {
        if (moved) {
          e.stopPropagation();
          e.preventDefault();
          moved = false;
        }
      };

      el.addEventListener("wheel", onWheel, { passive: false });
      el.addEventListener("pointerdown", onDown);
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerup", onUp);
      el.addEventListener("pointercancel", onUp);
      el.addEventListener("click", onClick, true);
      return () => {
        window.clearTimeout(settle);
        el.removeEventListener("wheel", onWheel);
        el.removeEventListener("pointerdown", onDown);
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerup", onUp);
        el.removeEventListener("pointercancel", onUp);
        el.removeEventListener("click", onClick, true);
      };
    }, [wheel, run, glideTo]);

    const select = (index: number, focus = false) => {
      const target = clamp(index, 0, last);
      glideTo(target);
      if (focus) buttonRefs.current[target]?.focus({ preventScroll: true });
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      const next =
        e.key === "ArrowRight"
          ? index + 1
          : e.key === "ArrowLeft"
            ? index - 1
            : e.key === "Home"
              ? 0
              : e.key === "End"
                ? last
                : null;
      if (next === null) return;
      e.preventDefault();
      select(next, true);
    };

    // Starting geometry for the first paint; paint() takes over once measured.
    const stageHeight = narrow ? Math.min(height, NARROW_MAX_HEIGHT) : height;
    const g0 = geometryFor(narrow ? NARROW_REFERENCE : 0, itemWidth);
    const tickSpacing = (g0.gap * GAP_TICK_SPAN) / (GAP_TICKS - 1);
    const middle = (GAP_TICKS - 1) / 2;
    const yearSize = stageHeight * 0.14 * (narrow ? NARROW_YEAR_SCALE : 1);

    return (
      <section
        ref={setRefs}
        aria-label={ariaLabel}
        aria-describedby={hintId}
        className={cn(
          // The whole stage fades at its edges together, so a card never turns
          // see-through over the cables behind it.
          "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
          "relative w-full cursor-grab touch-pan-y overscroll-x-contain select-none [clip-path:inset(0)] active:cursor-grabbing",
          className,
        )}
        style={{ height: stageHeight, ...styleProp }}
        {...props}
      >
        <p id={hintId} className="sr-only">
          Use the left and right arrow keys to move between events.
        </p>

        {years &&
          yearMarks.map((mark, i) => (
            <div
              key={mark.key}
              ref={(node) => {
                yearRefs.current[i] = node;
              }}
              aria-hidden="true"
              className="absolute left-1/2"
              style={{ top: yearSize * YEAR_INSET }}
            >
              <span
                className="block -translate-x-1/2 font-medium leading-none tracking-tighter text-foreground/[0.16] tabular-nums"
                style={{ fontSize: yearSize }}
              >
                {mark.label}
              </span>
            </div>
          ))}

        {cables && (
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 size-full stroke-foreground/[0.14] [mask-image:linear-gradient(to_bottom,transparent,black_6%,black_94%,transparent)]"
            fill="none"
            strokeWidth={1}
          >
            {events.map((event, i) => (
              <g
                key={event.id}
                ref={(node) => {
                  cableRefs.current[i] = node;
                }}
              >
                <line x1={g0.halfWidth} y1={0} x2={g0.halfWidth} y2={stageHeight * CARD_CENTER} />
                <line x1={g0.halfWidth} y1={0} x2={g0.halfWidth} y2={stageHeight * CARD_CENTER} />
                <line x1={g0.halfWidth} y1={stageHeight} x2={g0.halfWidth} y2={stageHeight * CARD_CENTER} />
                <line x1={g0.halfWidth} y1={stageHeight} x2={g0.halfWidth} y2={stageHeight * CARD_CENTER} />
              </g>
            ))}
          </svg>
        )}

        {/* The playhead: drawn over the cables so it reads as the line they hang
            from, bright from end to end and fading only at the stage edges. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 text-foreground/80"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, transparent, currentColor 6%, currentColor 94%, transparent)",
          }}
        />

        {ruler &&
          events.slice(0, -1).map((event, i) => (
            <div
              key={event.id}
              ref={(node) => {
                tickRefs.current[i] = node;
              }}
              aria-hidden="true"
              className="absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center"
              style={{ top: `${CARD_CENTER * 100}%`, gap: tickSpacing - 1 }}
            >
              {Array.from({ length: GAP_TICKS }, (_, k) => (
                <span
                  key={k}
                  className={cn(
                    "block w-px rounded-full",
                    k === middle ? "bg-foreground/45" : "bg-foreground/25",
                  )}
                  style={{ height: g0.cardWidth * (k === middle ? TICK_TALL : TICK_SHORT) }}
                />
              ))}
            </div>
          ))}

        <ul className="absolute inset-0 m-0 list-none p-0">
          {events.map((event, i) => {
            const active = i === activeIndex;
            return (
              <li
                key={event.id}
                ref={(node) => {
                  cardRefs.current[i] = node;
                }}
                data-active={active || undefined}
                className="absolute left-1/2"
                style={{ top: `${CARD_CENTER * 100}%`, width: g0.cardWidth }}
              >
                {/* One solid surface holds the label, media and meta, so the
                    cables and ruler stop at its edge instead of showing through. */}
                <div className="relative -translate-y-1/2">
                  <div className="relative overflow-hidden rounded-3xl border border-border bg-card">
                    <div className="px-3.5 pt-3 pb-2">
                      <p className="text-xs text-muted-foreground tabular-nums">
                        {formatDate(dates[i])}
                      </p>
                      <h3 className="truncate text-base font-medium tracking-tight text-foreground">
                        {event.title}
                      </h3>
                    </div>
                    <div className="px-2">
                      <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-background">
                        {event.media}
                      </div>
                    </div>
                    {event.meta ? (
                      <div className="flex items-center gap-1.5 px-3.5 py-2.5 text-sm text-muted-foreground tabular-nums">
                        {event.meta}
                      </div>
                    ) : (
                      <div className="h-2" />
                    )}
                    <span
                      ref={(node) => {
                        veilRefs.current[i] = node;
                      }}
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-background"
                    />
                  </div>
                  {/* Stretched over the whole card so the media stays valid
                      content outside the button and readable on its own. */}
                  <button
                    ref={(node) => {
                      buttonRefs.current[i] = node;
                    }}
                    type="button"
                    tabIndex={active ? 0 : -1}
                    aria-current={active ? "step" : undefined}
                    aria-label={`${formatDate(dates[i])}: ${event.title}`}
                    onClick={() => select(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className="absolute inset-0 cursor-pointer rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    );
  },
);
TimelineCableBlock.displayName = "TimelineCableBlock";
