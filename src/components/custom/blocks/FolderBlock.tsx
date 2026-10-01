"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, type LucideIcon, X } from "lucide-react";
import React, {
  type ChangeEvent,
  type DragEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { bezierEase, gsapTicker, prefersReducedMotion } from "./gsap-motion";
import { createSpringFollower, FRAMER_EASE, type SpringFollower } from "./motion-curves";
import { Tooltip, TooltipContent, TooltipTrigger } from "./TooltipBlock";

export interface FolderFile {
  /** Optional image thumbnail URL — shown as a photo peeking out. */
  thumb?: string;
  /** 0–100 upload progress for this item. */
  progress?: number;
  /** File name — shown in a tooltip on hover so people know what they named it. */
  name?: string;
}

/**
 * The default folder colour: the theme's `--primary` taken down to a pastel
 * — lightness pinned at 0.88 and chroma cut to 40%, the weight of a `#bfdbfe`
 * — so it reads as a folder, not a button, and still shifts with the theme.
 * A grey primary gives a soft grey folder.
 */
export const FOLDER_THEME_TINT = "oklch(from var(--primary) 0.88 calc(c * 0.4) h)";

export interface FolderProps {
  /** Title under the folder. */
  label?: string;
  /** Count / subtitle line. Falls back to "{n} items". */
  count?: string;
  /**
   * Folder body colour. Any CSS colour; by default a soft tint of the theme
   * colour (`FOLDER_THEME_TINT`), so the folder follows the theme without
   * shouting. Pocket, icon and skeleton cards derive their shades from it.
   */
  color?: string;
  /** A lucide icon shown on the front pocket. */
  icon?: LucideIcon;
  /** Frosted-glass blur on the front pocket, px. Default 10. */
  blur?: number;
  /** Folder width in px. Height derives from it. Default 260. */
  size?: number;
  /** The items peeking out — { thumb } for photos, otherwise a unified skeleton card. */
  files?: FolderFile[];
  /** How many skeleton cards to show when no files are given. Default 3. */
  peek?: number;
  /** Force-open — fans the cards out. Omit to let hover / drag drive it. */
  open?: boolean;
  /** Overall upload progress 0–100 — drives the bar across the pocket. */
  progress?: number;
  /** Extra decoration on the pocket (emoji, etc.) — sits under the icon. */
  stickers?: ReactNode;
  /** Show the title. Default true. */
  showLabel?: boolean;
  /** Show the count line. Default true. */
  showCount?: boolean;
  /** Enable drag-and-drop + click-to-browse. */
  interactive?: boolean;
  /** Let a tap toggle the fan — the touch/keyboard path to a hover-only reveal.
   *  Turn it off when an ancestor already owns the click, so the two don't
   *  fight over the same tap. Defaults to on whenever the folder isn't
   *  `interactive`. */
  toggleOnClick?: boolean;
  /** Join the tab order and open the fan on focus, without a tap toggling it.
   *  Only needed when `toggleOnClick` is false and an ancestor owns the click,
   *  which would otherwise leave the fan unreachable by keyboard. */
  focusable?: boolean;
  accept?: string;
  multiple?: boolean;
  onFiles?: (files: File[]) => void;
  /** Shows a small remove button on each fanned-out card, reporting the
   *  file's index within `files`. Only appears while the fan is open. */
  onRemoveFile?: (index: number) => void;
  className?: string;
}

/** Surface open/close — one spring for every part of the folder so the tilt,
 *  the lift and the ground shadow all settle on the same beat. */
const SPRING = { stiffness: 260, damping: 24 } as const;
/** Cards travel further than the pocket tilts, so they get a slightly softer,
 *  heavier spring — snappy enough to feel direct, damped enough not to wobble. */
const CARD_SPRING = { stiffness: 230, damping: 26, mass: 0.9 } as const;
/** Paging arrows: in, out and the press, all 0.15s on this curve. */
const NAV_EASE = bezierEase([0.22, 1, 0.36, 1]);
/** A bare `{ duration }` transition — Framer runs it on `easeOut`. */
const EASE_OUT = bezierEase(FRAMER_EASE.easeOut);

/** Framer's drag and press gestures only answer the primary pointer. */
const isPrimaryPointer = (e: PointerEvent) =>
  e.pointerType === "mouse" ? e.button === 0 : e.isPrimary !== false;

/**
 * Pointer velocity (px/s) over the last 100ms of a drag — the same window and
 * sampling Framer's pan gesture reports as `info.velocity`.
 */
function panVelocity(history: { x: number; t: number }[]) {
  if (history.length < 2) return 0;
  const last = history[history.length - 1];
  let from = history[0];
  for (let i = history.length - 1; i >= 0; i--) {
    from = history[i];
    if (last.t - from.t > 100) break;
  }
  const time = (last.t - from.t) / 1000;
  if (time === 0) return 0;
  const v = (last.x - from.x) / time;
  return Number.isFinite(v) ? v : 0;
}

/** How many cards the fan shows at once before paging kicks in. */
const FAN_MAX = 5;

type Vertex = { x: number; y: number; r: number };

/**
 * One continuous rounded path through `pts`, closed.
 *
 * The folder's back panel is drawn as a single path so the tab and the body
 * share one silhouette. Two stacked elements cannot do this: a fillet where
 * the tab meets the body would have to straddle the boundary between them, so
 * the join always shows a notch and the slant corners can never round.
 *
 * `smoothing` follows the squircle convention (0 is a plain circular fillet,
 * 0.6 is the default): tangent points slide outward along each edge while
 * control points stay at their circular distance, so curvature ramps in
 * gradually. Convex and concave corners use the same math, which is what lets
 * the slant's inner corner round too. The front pocket reuses it as a
 * clip-path, so the pocket's squircle and the body's fillets match exactly.
 */
function roundedPolygon(pts: Vertex[], smoothing = 0.6) {
  const n = pts.length;
  const unit = (x: number, y: number) => {
    const l = Math.hypot(x, y) || 1;
    return { x: x / l, y: y / l };
  };

  const cs = pts.map((p, i) => {
    const prev = pts[(i - 1 + n) % n];
    const next = pts[(i + 1) % n];
    const inV = unit(p.x - prev.x, p.y - prev.y);
    const outV = unit(next.x - p.x, next.y - p.y);
    const phi = Math.acos(Math.max(-1, Math.min(1, inV.x * outV.x + inV.y * outV.y)));
    const flat = phi < 1e-4;
    // tangent distance for a fillet of radius r across a turn of `phi`
    const t = flat ? 0 : p.r * Math.tan(phi / 2);
    // control-point distance from the corner: the exact circular-fillet value,
    // held fixed while `smoothing` pushes the tangent points outward
    const dC = flat ? 0 : t * (1 - ((4 / 3) * Math.tan(phi / 4)) / Math.tan(phi / 2));
    return { p, inV, outV, t, dC, T: t * (1 + smoothing) };
  });

  // two fillets sharing an edge must never overrun it
  for (let i = 0; i < n; i++) {
    const a = cs[i];
    const b = cs[(i + 1) % n];
    const edge = Math.hypot(b.p.x - a.p.x, b.p.y - a.p.y);
    const need = a.T + b.T;
    if (need > edge && need > 0) {
      const k = edge / need;
      a.T *= k;
      a.dC *= k;
      b.T *= k;
      b.dC *= k;
    }
  }

  const d: string[] = [];
  cs.forEach((c, i) => {
    const ax = c.p.x - c.inV.x * c.T, ay = c.p.y - c.inV.y * c.T;
    const bx = c.p.x + c.outV.x * c.T, by = c.p.y + c.outV.y * c.T;
    const c1x = c.p.x - c.inV.x * c.dC, c1y = c.p.y - c.inV.y * c.dC;
    const c2x = c.p.x + c.outV.x * c.dC, c2y = c.p.y + c.outV.y * c.dC;
    d.push(`${i === 0 ? "M" : "L"} ${ax.toFixed(2)} ${ay.toFixed(2)}`);
    d.push(`C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${bx.toFixed(2)} ${by.toFixed(2)}`);
  });
  return `${d.join(" ")} Z`;
}

/* one unified minimal "document" card — thumbnail + title + body lines.
 * Exported so anything showing a "pretend file" (e.g. a drag-and-drop demo)
 * uses the exact same placeholder language as the folder's own peeking
 * cards, instead of inventing a second one. */
export function SkeletonCard() {
  const line = "var(--folder-card-line)";
  return (
    <div className="relative flex h-full w-full flex-col gap-[9%] p-[13%]" style={{ background: "var(--folder-card)" }}>
      <div className="flex items-start gap-[8%]">
        <div className="shrink-0 rounded-[5px]" style={{ width: "26%", aspectRatio: "1", background: "var(--folder-card-accent)" }} />
        <div className="flex flex-1 flex-col gap-[10px] pt-[4%]">
          <span className="h-[4px] rounded-full" style={{ width: "86%", background: "var(--folder-card-line-strong)" }} />
          <span className="h-[3px] rounded-full" style={{ width: "58%", background: line }} />
        </div>
      </div>
      <div className="flex flex-col gap-[7px]">
        {[100, 90, 74].map((wpc) => (
          <span key={wpc} className="h-[3px] rounded-full" style={{ width: `${wpc}%`, background: line }} />
        ))}
      </div>
    </div>
  );
}

function FanNav({
  dir,
  onClick,
  onEngage,
  style,
  leaving,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  onEngage: () => void;
  style: React.CSSProperties;
  /** Set while the arrows fade out; a press can no longer scale them back. */
  leaving: boolean;
}) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  const ref = useRef<HTMLButtonElement>(null);
  const leavingRef = useRef(leaving);
  useLayoutEffect(() => {
    leavingRef.current = leaving;
  });
  // Mounts at the entry pose; the folder fades both arrows in from here.
  const [enterStyle] = useState<React.CSSProperties>({ opacity: 0, transform: "scale(0.8)" });

  // Press feedback: squeeze to 0.92 while held, back to 1 on release,
  // wherever the pointer is let go (or on Enter, like a keyboard press).
  const pressed = useRef(false);
  const release = useRef<() => void>(() => {});
  const press = (down: boolean) => {
    const el = ref.current;
    if (!el || pressed.current === down) return;
    pressed.current = down;
    if (leavingRef.current) return;
    gsap.killTweensOf(el, "scale");
    gsap.to(el, { scale: down ? 0.92 : 1, duration: 0.15, ease: NAV_EASE });
  };
  useEffect(() => () => release.current(), []);

  return (
    <button
      ref={ref}
      type="button"
      tabIndex={0}
      aria-label={dir === "prev" ? "Previous files" : "Next files"}
      // the fan lives inside the folder's own click target (browse files) —
      // paging must not also open the file picker
      onClick={(e) => {
        e.stopPropagation();
        onClick();
        // A mouse click leaves the button focused, which the folder's focus
        // wiring reads as "keep the fan open", so hovering out stops closing
        // it. `detail` is 0 only for keyboard activation, so a real mouse
        // click blurs itself and keyboard users are unaffected.
        if (e.detail !== 0) e.currentTarget.blur();
      }}
      // The nav buttons sit at the edge of the 40px hover buffer, so a wide
      // cursor approach can leave it for a frame and fire onMouseLeave just
      // before the click lands, collapsing the fan mid-click. `onEngage`
      // re-asserts hover as soon as a press starts.
      onPointerDown={(e) => {
        e.stopPropagation();
        onEngage();
        if (!isPrimaryPointer(e.nativeEvent)) return;
        press(true);
        release.current();
        const up = () => {
          release.current();
          press(false);
        };
        window.addEventListener("pointerup", up);
        window.addEventListener("pointercancel", up);
        release.current = () => {
          window.removeEventListener("pointerup", up);
          window.removeEventListener("pointercancel", up);
          release.current = () => {};
        };
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.repeat) press(true);
      }}
      onKeyUp={(e) => {
        if (e.key === "Enter") press(false);
      }}
      onBlur={() => press(false)}
      className={cn(
        "absolute flex h-7 w-7 items-center justify-center rounded-full",
        "bg-card/90 text-foreground/70 shadow-[0_2px_8px_rgba(0,0,0,0.14)] backdrop-blur",
        "transition-colors duration-150",
        "hover:bg-card hover:text-foreground",
      )}
      style={{ ...style, ...enterStyle }}
    >
      <Icon size={15} strokeWidth={2} />
    </button>
  );
}

/** Where a card sits and how it looks: the values its springs chase. */
type CardPose = { x: number; y: number; rotate: number; scale: number; opacity: number };
const POSE_KEYS = ["x", "y", "rotate", "scale", "opacity"] as const;

const poseTransform = (p: CardPose) =>
  `translateX(${p.x}px) translateY(${p.y}px) scale(${p.scale}) rotate(${p.rotate}deg)`;

/**
 * One card of the fan. Each of its five values follows its target through
 * the card spring, keeping its velocity when a new target arrives mid-flight
 * (a fast hover in-and-out, paging while the fan is still opening). A target
 * change can wait out a `delay` first, holding the value where it is, as a
 * delayed Framer transition does.
 *
 * With `draggable`, the card follows the pointer sideways and reports the
 * swipe; one that doesn't page is sprung back to its slot.
 */
function FanCard({
  pose,
  enterFrom,
  delay: baseDelay,
  batchDelay,
  reduce,
  draggable,
  onDragStart,
  onSwipe,
  className,
  style,
  children,
}: {
  pose: CardPose;
  /** Mount at this pose and spring into `pose`; `null` mounts in place. */
  enterFrom: CardPose | null;
  delay: number;
  /**
   * This card's delay when it commits as part of a fresh batch of cards, else
   * null (and `delay` applies). Asked at commit time, not during render.
   */
  batchDelay: () => number | null;
  reduce: boolean;
  draggable: boolean;
  onDragStart: () => void;
  /** Offset and velocity (px, px/s) of a finished swipe; true if it paged. */
  onSwipe: (offset: number, velocity: number) => boolean;
  className: string;
  style: React.CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mountPose] = useState(() => enterFrom ?? pose);
  const [mountStyle] = useState<React.CSSProperties>(() => ({
    transform: poseTransform(mountPose),
    opacity: mountPose.opacity,
  }));
  const springs = useRef<Record<keyof CardPose, SpringFollower> | null>(null);
  const waits = useRef<Partial<Record<keyof CardPose, gsap.core.Tween>>>({});
  const target = useRef<CardPose>(mountPose);
  const dragging = useRef(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const now = { ...mountPose };
    const paint = () => {
      el.style.transform = poseTransform(now);
      el.style.opacity = String(now.opacity);
    };
    const all = {} as Record<keyof CardPose, SpringFollower>;
    for (const key of POSE_KEYS) {
      all[key] = createSpringFollower(
        now[key],
        (v) => {
          now[key] = v;
          paint();
        },
        { ...CARD_SPRING, ticker: gsapTicker },
      );
    }
    springs.current = all;
    const pending = waits.current;
    return () => {
      for (const key of POSE_KEYS) {
        all[key].destroy();
        pending[key]?.kill();
      }
      springs.current = null;
      // A remount (Strict Mode) starts over from the mount pose.
      target.current = mountPose;
    };
  }, [mountPose]);

  // Chase each value whose target moved, after this render's delay. A
  // value being dragged is left to the pointer; release sends it on.
  useLayoutEffect(() => {
    const all = springs.current;
    if (!all) return;
    const prev = target.current;
    target.current = pose;
    const delay = batchDelay() ?? baseDelay;
    for (const key of POSE_KEYS) {
      if (prev[key] === pose[key]) continue;
      if (key === "x" && dragging.current) continue;
      const spring = all[key];
      waits.current[key]?.kill();
      delete waits.current[key];
      if (reduce) {
        spring.jump(pose[key]);
      } else if (delay > 0) {
        spring.jump(spring.get());
        const to = pose[key];
        waits.current[key] = gsap.delayedCall(delay, () => {
          delete waits.current[key];
          spring.set(to);
        });
      } else {
        spring.set(pose[key]);
      }
    }
  });

  // Sideways drag, on the same terms as Framer's `drag="x"`: pressing stops
  // the card where it is, it starts moving once the pointer has travelled
  // 3px, then follows it 1:1 with no constraints or momentum.
  const swipe = useRef({ onDragStart, onSwipe });
  useLayoutEffect(() => {
    swipe.current = { onDragStart, onSwipe };
  });
  useEffect(() => {
    const el = ref.current;
    if (!draggable || !el) return;
    let session: {
      id: number;
      startX: number;
      startY: number;
      origin: number;
      started: boolean;
      history: { x: number; t: number }[];
    } | null = null;

    const settle = () => {
      const x = springs.current?.x;
      if (x) x.set(target.current.x);
    };
    const end = (e: PointerEvent) => {
      if (!session || e.pointerId !== session.id) return;
      const { started, startX, history } = session;
      session = null;
      detach();
      if (!started) {
        settle();
        return;
      }
      dragging.current = false;
      el.style.cursor = "grab";
      const offset = (e.type === "pointercancel" ? history[history.length - 1].x : e.pageX) - startX;
      if (!swipe.current.onSwipe(offset, panVelocity(history))) settle();
    };
    const move = (e: PointerEvent) => {
      if (!session || e.pointerId !== session.id) return;
      session.history.push({ x: e.pageX, t: performance.now() });
      const dx = e.pageX - session.startX;
      if (!session.started) {
        if (Math.hypot(dx, e.pageY - session.startY) < 3) return;
        session.started = true;
        session.origin = springs.current?.x.get() ?? 0;
        dragging.current = true;
        el.style.cursor = "grabbing";
        swipe.current.onDragStart();
      }
      springs.current?.x.jump(session.origin + dx);
    };
    const detach = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
    const down = (e: PointerEvent) => {
      if (!isPrimaryPointer(e)) return;
      const x = springs.current?.x;
      waits.current.x?.kill();
      delete waits.current.x;
      x?.jump(x.get());
      detach();
      session = {
        id: e.pointerId,
        startX: e.pageX,
        startY: e.pageY,
        origin: 0,
        started: false,
        history: [{ x: e.pageX, t: performance.now() }],
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", end);
      window.addEventListener("pointercancel", end);
    };

    el.addEventListener("pointerdown", down);
    return () => {
      el.removeEventListener("pointerdown", down);
      detach();
      if (dragging.current) {
        dragging.current = false;
        el.style.cursor = "";
        settle();
      }
    };
  }, [draggable]);

  return (
    <div
      ref={ref}
      className={className}
      draggable={draggable ? false : undefined}
      style={{
        ...style,
        ...mountStyle,
        // What Framer puts on a `drag="x"` element: no text selection or
        // ghost image, and vertical touch pans still scroll the page.
        ...(draggable && {
          userSelect: "none",
          WebkitUserSelect: "none",
          WebkitTouchCallout: "none",
          touchAction: "pan-y",
        }),
      }}
    >
      {children}
    </div>
  );
}

/**
 * A progress fill that grows from 0 to `value`% on mount and glides to each
 * new value on a 0.3s linear tween.
 */
function ProgressFill({ value, instant = false }: { value: number; instant?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [mountStyle] = useState<React.CSSProperties>({ width: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { width: `${value}%`, duration: instant ? 0 : 0.3, ease: "none", overwrite: true });
  }, [value, instant]);
  useEffect(() => {
    const el = ref.current;
    return () => {
      if (el) gsap.killTweensOf(el);
    };
  }, []);
  return <span ref={ref} className="block h-full rounded-full bg-primary" style={mountStyle} />;
}

export function Folder({
  label,
  count,
  color = FOLDER_THEME_TINT,
  icon: Icon,
  blur = 10,
  size = 260,
  files,
  peek = 3,
  open: openProp,
  progress,
  stickers,
  showLabel = true,
  showCount = true,
  interactive = false,
  toggleOnClick,
  focusable = false,
  accept,
  multiple = true,
  onFiles,
  onRemoveFile,
  className,
}: FolderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focusedIn, setFocusedIn] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [fanStart, setFanStart] = useState(0);
  // Set while a card is being dragged, so the click that follows the release
  // isn't read as a tap on the folder — which would toggle the fan shut on
  // touch, where the fan only stays open by being pinned.
  const draggedRef = useRef(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    },
    [],
  );
  const engage = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setHovered(true);
  };
  // No rate limit. Cards have no exit animation for a fast second page to
  // interrupt, so holding an arrow pages as fast as the springs follow.
  const page = (dir: 1 | -1) => setFanStart((s) => s + dir);
  // Read once per mount, as Framer's useReducedMotion does.
  const [reduce] = useState(prefersReducedMotion);

  const items: FolderFile[] = files?.length ? files : Array.from({ length: peek }, () => ({}));
  // A hover-only reveal is unreachable on touch (no hover at all) and by
  // keyboard, so the fan also answers to focus, and to a tap when the folder
  // isn't already spending its click on opening the file picker.
  const tappable = (toggleOnClick ?? !interactive) && items.length > 0 && openProp === undefined;
  const open = openProp ?? (dragging || hovered || focusedIn || pinned);
  const fanned = open && items.length > 0;

  const w = size;
  const h = w * 0.82;
  const pocketH = h * 0.6;
  const tabW = w * 0.42;
  const tabH = h * 0.13;
  const r = w * 0.08;
  const tabCut = tabH * 1.1;

  // Clockwise from the tab's top-left. There is deliberately no vertex where
  // the tab meets the body on the left: that edge is one straight run from
  // (0, 0) to (0, h), which is precisely what removes the old notch.
  const backPath = useMemo(
    () =>
      roundedPolygon([
        { x: 0, y: 0, r: r * 0.55 }, // tab top-left
        { x: tabW - tabCut, y: 0, r: r * 0.9 }, // slant starts (convex)
        { x: tabW, y: tabH, r: r * 1.2 }, // slant meets the body top (concave)
        { x: w, y: tabH, r }, // body top-right
        { x: w, y: h, r }, // body bottom-right
        { x: 0, y: h, r }, // body bottom-left
      ]),
    [w, h, tabW, tabH, tabCut, r],
  );

  // Squircle for the front pocket — same smoothing as the back panel's fillets.
  const pocketPath = useMemo(
    () =>
      roundedPolygon([
        { x: 0, y: 0, r },
        { x: w, y: 0, r },
        { x: w, y: pocketH, r },
        { x: 0, y: pocketH, r },
      ]),
    [w, pocketH, r],
  );

  const body = color;

  /* ── fan geometry ────────────────────────────────────────────────────── */
  const cardW = w * 0.56;
  const cardH = h * 0.56;
  // resting height of the peeking cards — sitting a little low so their tops
  // read as tucked into the folder rather than floating above the back panel
  const topBase = h * 0.2;
  const fanLift = -h * 0.46;
  const fanArc = h * 0.09;
  const fanScale = 0.94;

  // The fan reaches past the folder's own box, so it sizes to the room
  // available: tighten the gap first, drop a card only once they would bury
  // each other. "Available" means the nearest ancestor that would actually
  // clip or scroll, not the immediate parent, which is often a shrink-to-fit
  // column no wider than the folder itself.
  const [avail, setAvail] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let el = wrapRef.current?.parentElement ?? null;
    while (el && el !== document.body) {
      const cs = getComputedStyle(el);
      if (/(auto|hidden|scroll|clip)/.test(cs.overflowX)) break;
      el = el.parentElement;
    }
    const host = el ?? document.documentElement;
    if (typeof ResizeObserver === "undefined") return;
    const read = () => setAvail(host.clientWidth);
    read();
    const ro = new ResizeObserver(read);
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  const halfCard = (cardW * fanScale) / 2;
  const NAV_ROOM = 42;
  const availHalf = avail ? Math.max(halfCard, avail / 2 - NAV_ROOM) : Infinity;
  const gapThatFits = (count: number) => (count <= 1 ? Infinity : (availHalf - halfCard) / ((count - 1) / 2));

  const idealGap = w * 0.24;
  const minGap = w * 0.14;
  const floorCount = Math.min(3, items.length);
  let fanCount = Math.min(FAN_MAX, items.length);
  while (fanCount > floorCount && gapThatFits(fanCount) < minGap) fanCount--;
  const fanGap = Math.max(0, Math.min(idealGap, gapThatFits(fanCount)));

  // Circular window, so paging never runs out and the arrows never need a
  // disabled state.
  //
  // The React key and the file index are deliberately different numbers.
  // Keying by the wrapped file index means a full rotation moves the seam
  // cards the entire width of the fan in one spring, and since z-index cannot
  // animate they duck behind their neighbours mid-flight. Keying by the
  // unbounded `fanStart + i` shifts every key by exactly one slot per page and
  // only mounts or unmounts the one at the seam.
  const n = items.length;
  const slots = Array.from({ length: fanCount }, (_, i) => {
    const rawKey = fanStart + i;
    const idx = n > 0 ? ((rawKey % n) + n) % n : 0;
    return { rawKey, idx, file: items[idx] };
  });
  const windowed = slots.map((s) => s.file);

  // Suppresses the enter animation on first paint only. Cards only mount when
  // the set of slots changes, so "first paint" lasts until it first does.
  const slotKeys = slots.map((s) => s.rawKey);
  const slotSig = slotKeys.join();
  const [firstSig] = useState(slotSig);
  const [slotsChanged, setSlotsChanged] = useState(false);
  if (!slotsChanged && slotSig !== firstSig) setSlotsChanged(true);
  const firstPaint = !slotsChanged;

  // Cards ripple in at 40ms apart the first time a batch appears. Only a real
  // batch staggers: paging brings in a single card, and making that one wait
  // its index out would read as lag rather than rhythm. Each card asks while
  // committing (its layout effect), against the slots seen by every earlier
  // commit, which are recorded after paint.
  const seen = useRef<Set<number>>(new Set());
  const entryDelay = (key: number, keys: number[]) => {
    const newKeys = keys.filter((k) => !seen.current.has(k));
    return newKeys.length > 1 ? newKeys.indexOf(key) * 0.04 : null;
  };
  useEffect(() => {
    slots.forEach((s) => seen.current.add(s.rawKey));
  });

  // Arrows show whenever there's something else to bring into view — even a
  // folder with just 2 files benefits from a way to swap which one is front
  // and center.
  const canPage = n > 1;
  const mid = (windowed.length - 1) / 2;
  const halfSpan = mid * fanGap + halfCard;

  /* ── surface motion: pocket tilt + ground shadow ─────────────────────── */
  // Both mount at their resting pose for `open` (no entry animation) and
  // follow it through the surface spring from then on, keeping their
  // velocity when a hover flickers in and out.
  const pocketRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const shadowScaleFor = (o: boolean) => (reduce ? 1 : o ? 1.1 : 1);
  const [surfaceStyle] = useState(() => ({
    pocket: { transform: open ? "rotateX(-34deg)" : "none" } as React.CSSProperties,
    shadow: {
      transform: `translateX(-50%) scale(${shadowScaleFor(open)})`,
      opacity: open ? 0.9 : 0.6,
    } as React.CSSProperties,
  }));
  const surface = useRef<{ tilt: SpringFollower; scale: SpringFollower; fade: SpringFollower } | null>(null);
  useLayoutEffect(() => {
    const pocket = pocketRef.current;
    const shadow = shadowRef.current;
    if (!pocket || !shadow) return;
    const pose = {
      scale: shadowScaleFor(open),
      opacity: open ? 0.9 : 0.6,
    };
    const paintShadow = () => {
      shadow.style.transform = `translateX(-50%) scale(${pose.scale})`;
      shadow.style.opacity = String(pose.opacity);
    };
    const options = { ...SPRING, ticker: gsapTicker };
    const springs = {
      tilt: createSpringFollower(
        open ? -34 : 0,
        (v) => {
          pocket.style.transform = v ? `rotateX(${v}deg)` : "none";
        },
        options,
      ),
      scale: createSpringFollower(pose.scale, (v) => {
        pose.scale = v;
        paintShadow();
      }, options),
      fade: createSpringFollower(pose.opacity, (v) => {
        pose.opacity = v;
        paintShadow();
      }, options),
    };
    surface.current = springs;
    return () => {
      springs.tilt.destroy();
      springs.scale.destroy();
      springs.fade.destroy();
      gsap.killTweensOf(shadow);
      surface.current = null;
    };
    // Built once; the effect below retargets it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useLayoutEffect(() => {
    const springs = surface.current;
    const shadow = shadowRef.current;
    if (!springs || !shadow) return;
    if (reduce) {
      // Reduced motion: the pocket snaps and the shadow only fades, 0.15s.
      springs.tilt.jump(open ? -34 : 0);
      gsap.to(shadow, { opacity: open ? 0.9 : 0.6, duration: 0.15, ease: EASE_OUT, overwrite: true });
      return;
    }
    springs.tilt.set(open ? -34 : 0);
    springs.scale.set(open ? 1.1 : 1);
    springs.fade.set(open ? 0.9 : 0.6);
  }, [open, reduce]);

  /* ── paging arrows: fade/scale in, and out before they unmount ───────── */
  const navShown = fanned && canPage;
  const [navMounted, setNavMounted] = useState(navShown);
  if (navShown && !navMounted) setNavMounted(true);
  const navRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const buttons = navRef.current?.querySelectorAll("button");
    if (!buttons?.length) return;
    gsap.killTweensOf(buttons);
    if (navShown) {
      gsap.to(buttons, { opacity: 1, scale: 1, duration: 0.15, ease: NAV_EASE });
    } else {
      gsap.to(buttons, {
        opacity: 0,
        scale: 0.8,
        duration: 0.15,
        ease: NAV_EASE,
        onComplete: () => setNavMounted(false),
      });
    }
  }, [navShown, navMounted]);
  useEffect(() => {
    const nav = navRef;
    return () => {
      const buttons = nav.current?.querySelectorAll("button");
      if (buttons?.length) gsap.killTweensOf(buttons);
    };
  }, []);

  /* ── drop ring: 0.15s fade + scale while files hover the folder ──────── */
  const ringRef = useRef<HTMLDivElement>(null);
  const [ringStyle] = useState<React.CSSProperties>(() => ({
    opacity: dragging ? 1 : 0,
    transform: `scale(${dragging ? 1 : 0.98})`,
  }));
  useLayoutEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    // On mount this tweens to where the ring already is — a no-op.
    gsap.to(ring, {
      opacity: dragging ? 1 : 0,
      scale: dragging ? 1 : 0.98,
      duration: 0.15,
      ease: EASE_OUT,
      overwrite: true,
    });
  }, [dragging]);

  const cardAt = (i: number) => {
    if (!fanned) {
      // Tucked: a tight stack with the front card straight and the ones behind
      // it tilted out to either side. The front slot is the last index rather
      // than a fixed position, so the stack adapts to how many cards are
      // showing: one card sits straight, two add a tilt behind it, and three or
      // more fill the full stack.
      const front = windowed.length - 1;
      if (i === front) return { x: 0, y: 0, rot: 0, z: 3, op: 1 };
      const left = i % 2 === 0;
      return { x: left ? -w * 0.1 : w * 0.11, y: 0, rot: left ? -5 : 5, z: i + 1, op: 1 };
    }
    const off = i - mid;
    const t = mid === 0 ? 0 : off / mid;
    return {
      x: off * fanGap,
      // Parabolic rise: the middle card sits highest, the outer ones ease down.
      y: fanLift - (1 - t * t) * fanArc,
      rot: off * 8,
      z: 10 - Math.abs(off),
      op: 1,
    };
  };

  const handleFiles = useCallback(
    (raw: FileList | null) => {
      if (!raw?.length) return;
      onFiles?.(Array.from(raw));
    },
    [onFiles],
  );

  const dropHandlers = interactive
    ? {
        onDrop: (e: DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        },
        onDragOver: (e: DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setDragging(true);
        },
        onDragLeave: (e: DragEvent<HTMLDivElement>) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragging(false);
        },
        onClick: () => inputRef.current?.click(),
      }
    : {};

  const uploading = progress !== undefined && progress < 100;
  const metaText =
    count ??
    (dragging
      ? "Drop to add"
      : files?.length
        ? `${files.length} item${files.length > 1 ? "s" : ""}`
        : interactive
          ? "Drop files or click"
          : undefined);

  // Tint the peeking skeleton cards to match `color` — same OKLCH-relative
  // approach as the pocket/icon, applied as custom-property overrides so
  // SkeletonCard doesn't need to know about `color` at all.
  const cardVars = {
    "--folder-card": `oklch(from ${color} 0.97 calc(c * 0.3) h)`,
    "--folder-card-accent": `oklch(from ${color} 0.88 calc(c * 0.6) h)`,
  } as React.CSSProperties;

  return (
    <div ref={wrapRef} className={cn("inline-flex flex-col items-center gap-4", className)} style={cardVars}>
      <div
        {...dropHandlers}
        onMouseEnter={engage}
        // A short grace period rather than an immediate close. The nav buttons
        // sit at the edge of the hover buffer, so a wide cursor approach can
        // leave it for a moment and collapse the fan mid-click. Any genuine
        // re-entry, including the buttons' own onEngage, cancels this.
        onMouseLeave={() => {
          closeTimerRef.current = setTimeout(() => setHovered(false), 220);
        }}
        // Focus anywhere inside keeps the fan open; leaving the subtree closes it.
        onFocus={() => setFocusedIn(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocusedIn(false);
        }}
        {...(tappable && {
          onClick: () => {
            if (draggedRef.current) {
              draggedRef.current = false;
              return;
            }
            setPinned((p) => !p);
          },
          onKeyDown: (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setPinned((p) => !p);
            }
          },
        })}
        tabIndex={interactive || tappable || focusable ? 0 : undefined}
        className={cn(
          "relative select-none rounded-[30px] outline-none",
          (interactive || tappable) && "cursor-pointer",
          (interactive || tappable || focusable) &&
            "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
        )}
        style={{ width: w, height: h, perspective: 900 }}
        role={interactive || tappable ? "button" : undefined}
        aria-label={
          interactive
            ? "Upload files"
            : tappable
              ? label
                ? `${label} - show files`
                : "Show files"
              : focusable
                ? label
                  ? `${label} - files`
                  : "Files"
                : undefined
        }
        aria-expanded={tappable || focusable ? fanned : undefined}
      >
        {interactive && (
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            className="sr-only"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files)}
          />
        )}

        {/* The fan reaches well outside the folder's own box. This invisible
            extension is a DOM child, so the pointer staying anywhere over the
            fanned cards (or the gaps between them) still counts as hovering
            the folder and the fan doesn't flicker shut. It sits BELOW the
            cards (zIndex 1) — above them, a card's own hover (and its name
            tooltip) would never be reachable. */}
        {fanned && (
          <div
            aria-hidden
            className="absolute"
            style={{
              left: -(halfSpan - w / 2) - 40,
              right: -(halfSpan - w / 2) - 40,
              top: topBase + fanLift - fanArc - 20,
              height: -fanLift + fanArc + cardH,
              zIndex: 1,
            }}
          />
        )}

        {/* ground shadow */}
        <div
          ref={shadowRef}
          aria-hidden
          className="absolute left-1/2 rounded-[50%] bg-black/25 blur-xl dark:bg-black/60"
          style={{ bottom: -h * 0.05, width: w * 0.82, height: h * 0.13, zIndex: 0, ...surfaceStyle.shadow }}
        />

        {/* back panel + tab — one continuous silhouette, no seam to notch */}
        <svg
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          className="absolute inset-0"
          style={{ filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.09))", zIndex: 1 }}
          aria-hidden
        >
          <path d={backPath} style={{ fill: body }} />
        </svg>

        {/* the cards — below the pocket at rest, lifted clear of it when fanned */}
        <div className="absolute inset-0" style={{ zIndex: 2 }}>
          {/* Deliberately no exit animation. Keeping an exiting card rendered
              means splicing it back into the new child array at the index it
              used to occupy. Paging left removes the LAST key, and that splice
              inserts the exiting node *before* the final surviving card —
              reordering it, so React moves that card's DOM node and it ends up
              stranded at its tucked-stack transform, never animating to its
              fan slot. Cards therefore mount/unmount plainly: `enterFrom`
              still gives each new card its enter animation, and the one card
              leaving at the far edge of the fan pops rather than fading. */}
          {slots.map(({ rawKey, idx, file: f }, i) => {
            const c = cardAt(i);
            const off = i - mid;
            const cardUploading = f.progress !== undefined && f.progress < 100;
            const cardEl = (
              <div className="relative h-full w-full">
                {f.thumb ? (
                  // `draggable={false}` (and no pointer events on the image
                  // itself): a bare <img> starts the browser's own drag — the
                  // ghost-image kind — on the first pointer move, which
                  // swallows the gesture before the card's drag can begin. So
                  // photos couldn't be swiped while skeleton cards could.
                  <img
                    src={f.thumb}
                    alt=""
                    draggable={false}
                    style={{ width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }}
                  />
                ) : (
                  <SkeletonCard />
                )}
                {/* per-file progress — same bar language as the pocket's
                    overall one, just small enough to sit on a peeking card */}
                {cardUploading && (
                  <div className="absolute inset-x-[10%] bottom-[8%] h-[2.5px] overflow-hidden rounded-full bg-foreground/15">
                    <ProgressFill value={f.progress ?? 0} instant={reduce} />
                  </div>
                )}
                {/* remove — only once the fan is open (a tucked stack has no
                    room to show it, and it'd be too easy to hit by accident).
                    Inset rather than overhung off the corner: the card's own
                    overflow-hidden would clip a badge hanging outside it. */}
                {fanned && onRemoveFile && (
                  <button
                    type="button"
                    aria-label={`Remove ${f.name ?? "file"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFile(idx);
                      if (e.detail !== 0) e.currentTarget.blur();
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    // Visible badge stays a small 20px circle so it doesn't
                    // overwhelm a ~76px card — the actual hit target is widened
                    // to the 24px WCAG minimum with an invisible ::after.
                    className="absolute right-1 top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors duration-150 hover:bg-black/65 after:absolute after:-inset-0.5 after:content-['']"
                  >
                    <X size={11} strokeWidth={2.2} />
                  </button>
                )}
              </div>
            );
            // Dragging any fanned card left/right pages the whole fan, same as
            // the chevrons. No constraints: the card is free to follow the
            // pointer. A swipe past the threshold pages, which moves every
            // card's slot; a shorter one springs the card back to its slot.
            const at = { x: c.x, y: topBase + c.y, rotate: c.rot };
            return (
              <FanCard
                key={rawKey}
                className="absolute left-1/2 top-0 overflow-hidden"
                style={{
                  width: cardW,
                  height: cardH,
                  marginLeft: -cardW / 2,
                  borderRadius: w * 0.05,
                  zIndex: c.z,
                  boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.04), 0 5px 16px -6px rgba(0,0,0,0.28)",
                  cursor: fanned && canPage ? "grab" : undefined,
                }}
                enterFrom={
                  firstPaint
                    ? null
                    : reduce
                      ? { ...at, opacity: 0, scale: 1 }
                      : { ...at, opacity: 0, y: at.y + h * 0.14, scale: 0.86 }
                }
                pose={{ ...at, opacity: c.op, scale: fanned ? fanScale : 1 }}
                reduce={reduce}
                // a fresh batch ripples in per-item; opening spreads outward
                // from the middle; a close never waits — dismissal has to
                // feel immediate
                delay={fanned ? Math.abs(off) * 0.03 : 0}
                batchDelay={() => entryDelay(rawKey, slotKeys)}
                draggable={!reduce && fanned && canPage}
                onDragStart={() => {
                  draggedRef.current = true;
                }}
                onSwipe={(offset, velocity) => {
                  if (offset < -36 || velocity < -350) page(1);
                  else if (offset > 36 || velocity > 350) page(-1);
                  else return false;
                  return true;
                }}
              >
                {fanned && f.name ? (
                  <Tooltip>
                    <TooltipTrigger className="block h-full w-full">{cardEl}</TooltipTrigger>
                    <TooltipContent side="top">{f.name}</TooltipContent>
                  </Tooltip>
                ) : (
                  cardEl
                )}
              </FanCard>
            );
          })}
        </div>

        {/* paging — always available once there's more than one file to
            browse; the window wraps, so the arrows never disable */}
        {navMounted && (
          <div ref={navRef} className="absolute inset-0" style={{ zIndex: 12 }}>
            <FanNav
              dir="prev"
              onClick={() => page(-1)}
              onEngage={engage}
              leaving={!navShown}
              style={{ left: w / 2 - halfSpan - 34, top: topBase + fanLift + cardH / 2 - 14 }}
            />
            <FanNav
              dir="next"
              onClick={() => page(1)}
              onEngage={engage}
              leaving={!navShown}
              style={{ left: w / 2 + halfSpan + 6, top: topBase + fanLift + cardH / 2 - 14 }}
            />
          </div>
        )}

        {/* front pocket — frosted glass, tilts open, sits ABOVE the files */}
        <div
          ref={pocketRef}
          className="absolute inset-x-0 bottom-0 origin-bottom"
          // No `transformStyle: preserve-3d` here: inside a 3D rendering
          // context Chrome samples a backdrop-filter's backdrop per composited
          // layer, clipped to that layer's bounds, so the frosted glass showed
          // each card as a hard-edged blurred rectangle instead of a soft
          // spread. The tilt only needs the outer wrapper's `perspective`.
          style={{
            height: pocketH,
            zIndex: 5,
            borderRadius: r,
            boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
            ...surfaceStyle.pocket,
          }}
        >
          <div
            className="relative overflow-hidden"
            style={{
              width: w,
              height: pocketH,
              clipPath: `path("${pocketPath}")`,
              // Chrome clips a backdrop-filter to the element's border-radius
              // but, on some GPU paths, not to a `path()` clip - the blurred
              // backdrop then paints the full box and shows as dark blocks at
              // the four corners outside the squircle. A rounded rect at
              // 1.25r hugs this squircle to within 0.003r without ever cutting
              // it, so the compositor clips the blur and the path only trims
              // the last sub-pixel.
              borderRadius: r * 1.25,
              // Relative OKLCH lightness (not a color-mix toward white) so the
              // bump is perceptually consistent for every base colour — mixing
              // a fixed % of white lightens a near-black colour far more than
              // a near-white one.
              background: `oklch(from ${color} calc(l + 0.08) c h / 0.92)`,
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.55)",
            }}
          >
            {(Icon || stickers) && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                // Same relative-lightness reasoning as the pocket background,
                // and the step flips direction at mid-lightness (`sign()`), so
                // the icon darkens on a light body and lightens on a dark one
                // — a near-black theme colour no longer crushes it to black.
                style={{ color: `oklch(from ${color} calc(l - 0.22 * sign(l - 0.5)) c h)` }}
              >
                {Icon && <Icon size={Math.round(w * 0.15)} strokeWidth={1.8} />}
                {stickers && <div className="flex items-center gap-3">{stickers}</div>}
              </div>
            )}

            {uploading && (
              <div className="absolute inset-x-4 bottom-3 h-[3px] overflow-hidden rounded-full bg-foreground/10">
                <ProgressFill value={progress} />
              </div>
            )}
          </div>
        </div>

        {interactive && (
          <div
            ref={ringRef}
            aria-hidden
            className="pointer-events-none absolute -inset-2 rounded-[30px] border-2 border-dashed border-primary/60"
            style={{ zIndex: 6, ...ringStyle }}
          />
        )}
      </div>

      {((showLabel && label) || (showCount && metaText)) && (
        <div className="flex flex-col items-center gap-1.5 text-center">
          {showLabel && label && (
            <span className="text-[15px] font-semibold tracking-[-0.02em] text-foreground">{label}</span>
          )}
          {showCount && metaText && (
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-[12px] font-medium text-muted-foreground">
              {metaText}
            </span>
          )}
        </div>
      )}

      <style>{`
        :root {
          --folder-card: #ffffff;
          --folder-card-accent: #e6e8ee;
          --folder-card-line: rgba(0,0,0,0.08);
          --folder-card-line-strong: rgba(0,0,0,0.16);
        }
        .dark {
          --folder-card: #eceef3;
          --folder-card-accent: #d5d8e0;
          --folder-card-line: rgba(0,0,0,0.10);
          --folder-card-line-strong: rgba(0,0,0,0.20);
        }
      `}</style>
    </div>
  );
}
