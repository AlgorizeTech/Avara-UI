"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BridgeBrand {
  id: string;
  name: string;
  /** The wire's gradient, from the tile toward the hub. The first is the brand's main colour. */
  colors: string[];
  /** The mark inside the tile, about 28px. */
  logo: React.ReactNode;
}

export interface BrandBridgeProps {
  /** Up to eight brands; the first half stand on the left. Default six. */
  brands?: BridgeBrand[];
  /** Ids connected at first. Default none, so autoplay builds them up. */
  defaultConnected?: string[];
  /**
   * Connect the brands by itself, one at a time in a random order, and stay
   * connected. Plays again on reload or remount; pauses while the card is
   * hovered and stops for good once a tile is pressed. Default `true`.
   */
  autoplay?: boolean;
  onToggle?: (id: string, connected: boolean) => void;
  /** Heading under the graphic. */
  title?: React.ReactNode;
  /** Line under the heading. */
  description?: React.ReactNode;
  /** What sits in the hub. Default a small mark. */
  hub?: React.ReactNode;
  /** Particles in the background field, 0 to 240. Default `48`. */
  particles?: number;
  /** Comet speed; `2` is twice as fast. Default `1`. */
  speed?: number;
  className?: string;
}

const mono = (d: string, fill: string, className?: string) => (
  <svg viewBox="0 0 24 24" className={cn("size-6", className)} aria-hidden>
    <path d={d} fill={fill} />
  </svg>
);

const GOOGLE = (
  <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

/** Every built in brand; pick from these or pass your own. */
export const BRANDS: BridgeBrand[] = [
  {
    id: "google",
    name: "Google",
    colors: ["#4285F4", "#EA4335", "#FBBC05", "#34A853"],
    logo: GOOGLE,
  },
  {
    id: "facebook",
    name: "Facebook",
    colors: ["#0866FF", "#5aa0ff"],
    logo: mono(
      "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
      "#0866FF",
    ),
  },
  {
    id: "spotify",
    name: "Spotify",
    colors: ["#1DB954", "#7be3a0"],
    logo: mono(
      "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z",
      "#1DB954",
    ),
  },
  {
    id: "slack",
    name: "Slack",
    colors: ["#E01E5A", "#36C5F0", "#2EB67D", "#ECB22E"],
    logo: mono(
      "M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z",
      "#4A154B",
    ),
  },
  {
    id: "github",
    name: "GitHub",
    colors: ["#181717", "#8b8b88"],
    logo: mono(
      "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
      "currentColor",
      "text-[#181717] dark:text-zinc-100",
    ),
  },
  {
    id: "stripe",
    name: "Stripe",
    colors: ["#635BFF", "#a59fff"],
    logo: mono(
      "M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z",
      "#635BFF",
    ),
  },
  {
    id: "youtube",
    name: "YouTube",
    colors: ["#FF0000", "#ff7a7a"],
    logo: mono(
      "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
      "#FF0000",
    ),
  },
  {
    id: "apple",
    name: "Apple",
    colors: ["#242423", "#a1a19b"],
    logo: mono(
      "M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701",
      "currentColor",
      "text-[#242423] dark:text-zinc-100",
    ),
  },
];

const pick = (ids: string[]) =>
  ids.map((id) => BRANDS.find((b) => b.id === id)!);

/** The default six: three a side. */
export const DEFAULT_BRANDS = pick([
  "google",
  "facebook",
  "slack",
  "github",
  "stripe",
  "spotify",
]);

// The stage is drawn at this size and scaled down to fit narrower containers.
const W = 480;
const H = 300;
const HX = W / 2;
const HY = 160;
const HUB = 88;
const TILE = 52;
const INK = "#242423";
const GLIDE = "cubic-bezier(0.22, 1, 0.36, 1)";
const POP = "cubic-bezier(0.34, 1.56, 0.64, 1)";

/** True while the visitor asks the OS for reduced motion. */
function useStill() {
  const [still, setStill] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return still;
}

/** True while at least `amount` of the element is on screen (with `once`, it stays true after the first time). */
function useSeen(
  ref: React.RefObject<Element | null>,
  { once = false, amount = 0 }: { once?: boolean; amount?: number } = {},
) {
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setSeen(true);
          if (once) io.disconnect();
        } else if (!once) {
          setSeen(false);
        }
      },
      { threshold: amount },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, once, amount]);
  return seen;
}

/** Tile centres: two straight columns, evenly spaced round the hub's height. */
function spots(n: number) {
  const side = Math.ceil(n / 2);
  const gap = side > 3 ? 64 : 80;
  return Array.from({ length: n }, (_, i) => {
    const right = i >= side;
    const k = right ? i - side : i;
    const count = right ? n - side : side;
    const x = right ? W - 66 : 66;
    const y = HY + (k - (count - 1) / 2) * gap;
    const sx = x + (right ? -1 : 1) * (TILE / 2 + 4);
    const ex = HX + (right ? 1 : -1) * (HUB / 2 - 2);
    const ey = HY + (y - HY) * 0.28;
    const c1x = sx + (ex - sx) * 0.55;
    const c2x = sx + (ex - sx) * 0.45;
    const d = `M ${sx} ${y} C ${c1x} ${y}, ${c2x} ${ey}, ${ex} ${ey}`;
    return { x, y, sx, sy: y, ex, ey, c1x, c1y: y, c2x, c2y: ey, d };
  });
}
type Line = ReturnType<typeof spots>[number];

/** A point on a wire's curve, `t` from 0 at the tile to 1 at the hub. */
function at(l: Line, t: number) {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const e = t * t * t;
  return {
    x: a * l.sx + b * l.c1x + c * l.c2x + e * l.ex,
    y: a * l.sy + b * l.c1y + c * l.c2y + e * l.ey,
  };
}

/** The wire bent by a magnetic pull `(ox, oy)` centred at `t` along it. */
function bent(l: Line, ox: number, oy: number, t: number) {
  const k = 2.2;
  const a = (1 - t) * k;
  const b = t * k;
  return `M ${l.sx} ${l.sy} C ${l.c1x + ox * a} ${l.c1y + oy * a}, ${l.c2x + ox * b} ${l.c2y + oy * b}, ${l.ex} ${l.ey}`;
}

/** How close the pointer must come for a wire to reach for it, in stage px. */
const REACH = 84;

const rgba = (hex: string, a: number) => {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.replace(/./g, "$&$&") : h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

/** The default hub mark: two linked rounded squares. */
function BridgeMark() {
  return (
    <svg
      viewBox="0 0 40 40"
      className="size-8 text-[#242423] dark:text-zinc-100"
      aria-hidden
    >
      <rect x="6" y="6" width="18" height="18" rx="6" fill="currentColor" />
      <rect
        x="16"
        y="16"
        width="18"
        height="18"
        rx="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  color?: string;
  life?: number;
  max?: number;
}

export const BrandBridge = React.forwardRef<HTMLDivElement, BrandBridgeProps>(
  function BrandBridge(
    {
      brands = DEFAULT_BRANDS,
      defaultConnected = [],
      autoplay = true,
      onToggle,
      title = "Unified Workspace",
      description = "Link your daily stack into a single live pipeline. Click any app to wire it in, or click again to disconnect.",
      hub,
      particles = 48,
      speed = 1,
      className,
    },
    ref,
  ) {
    const still = useStill();
    const uid = React.useId().replace(/:/g, "");
    const root = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => root.current!);
    const canvas = React.useRef<HTMLCanvasElement>(null);
    const ring = React.useRef<HTMLSpanElement>(null);
    const comets = React.useRef<(SVGPathElement | null)[]>([]);
    const wires = React.useRef<(SVGPathElement | null)[]>([]);
    const previews = React.useRef<(SVGPathElement | null)[]>([]);
    const seen = useSeen(root, { once: true, amount: 0.3 });
    const visible = useSeen(root, { amount: 0.05 });
    const shown = seen || still;

    const [isDark, setIsDark] = React.useState(false);
    React.useEffect(() => {
      const rootEl = document.documentElement;
      const sync = () => setIsDark(rootEl.classList.contains("dark"));
      sync();
      const mo = new MutationObserver(sync);
      mo.observe(rootEl, { attributes: true, attributeFilter: ["class"] });
      return () => mo.disconnect();
    }, []);
    const ink = isDark ? "#f4f4f5" : INK;

    const list = brands.slice(0, 8).map((b) =>
      isDark && (b.id === "github" || b.id === "apple")
        ? { ...b, colors: ["#e4e4e7", "#71717a"] }
        : b,
    );
    const lines = React.useMemo(() => spots(list.length), [list.length]);
    const [on, setOn] = React.useState<Set<string>>(
      () => new Set(defaultConnected),
    );
    const [hover, setHover] = React.useState<number | null>(null);
    const [said, setSaid] = React.useState("");
    const live = React.useRef({ on, hover, particles, speed, ink });
    live.current = { on, hover, particles, speed, ink };
    const pointer = React.useRef({ x: -999, y: -999 });
    const field = React.useRef<Particle[]>([]);

    // Fit the fixed stage into whatever width the card is given.
    const [scale, setScale] = React.useState(1);
    React.useLayoutEffect(() => {
      const el = root.current!;
      const ro = new ResizeObserver(() =>
        setScale(Math.min(1, el.clientWidth / W)),
      );
      ro.observe(el);
      return () => ro.disconnect();
    }, []);

    /** A spray of brand coloured particles from a point, heading for the hub or outward. */
    const burst = React.useCallback(
      (x: number, y: number, colors: string[], n: number, toHub: boolean) => {
        if (still) return;
        for (let k = 0; k < n; k++) {
          const dx = HX - x;
          const dy = HY - y;
          const d = Math.hypot(dx, dy) || 1;
          const a = Math.random() * Math.PI * 2;
          const sp = toHub
            ? 140 + Math.random() * 160
            : 40 + Math.random() * 90;
          field.current.push({
            x,
            y,
            vx: toHub ? (dx / d) * sp + Math.cos(a) * 30 : Math.cos(a) * sp,
            vy: toHub ? (dy / d) * sp + Math.sin(a) * 30 : Math.sin(a) * sp,
            r: 1 + Math.random() * 1.6,
            a: 0.9,
            color: colors[k % colors.length],
            life: 0,
            max: 0.8 + Math.random() * 0.7,
          });
        }
      },
      [still],
    );

    const pulseHub = React.useCallback(() => {
      ring.current?.animate(
        [
          { transform: "scale(1)", opacity: 0.55 },
          { transform: "scale(1.35)", opacity: 0 },
        ],
        { duration: 900, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
    }, []);

    /** Connect or let go of one brand, with its burst. */
    const link = (i: number, connect: boolean, auto = false) => {
      const b = list[i]!;
      setOn((prev) => {
        const next = new Set(prev);
        if (connect) next.add(b.id);
        else next.delete(b.id);
        return next;
      });
      // Autoplay is a showcase: only a real press is announced and reported.
      if (!auto) {
        setSaid(`${b.name} ${connect ? "connected" : "disconnected"}.`);
        onToggle?.(b.id, connect);
      }
      const l = lines[i]!;
      if (connect) {
        burst(l.sx, l.sy, b.colors, 14, true);
        window.setTimeout(pulseHub, still ? 0 : 600);
      } else burst(l.sx, l.sy, [live.current.ink, "#a1a19b"], 10, false);
    };
    const linkRef = React.useRef(link);
    linkRef.current = link;

    // Autoplay: connect everything one by one in a random order, once. When all
    // are in it stays that way; a reload or remount plays it again. A press
    // hands control to the user.
    const [auto, setAuto] = React.useState(autoplay && !still);
    const [inside, setInside] = React.useState(false);
    React.useEffect(() => setAuto(autoplay && !still), [autoplay, still]);
    React.useEffect(() => {
      if (!auto || !shown || !visible || inside) return;
      let timer = 0;
      const connect = () => {
        const cur = live.current.on;
        const left = list.flatMap((b, i) => (cur.has(b.id) ? [] : [i]));
        if (!left.length) {
          setAuto(false);
          return;
        }
        linkRef.current(
          left[Math.floor(Math.random() * left.length)]!,
          true,
          true,
        );
        timer = window.setTimeout(connect, 850 + Math.random() * 750);
      };
      timer = window.setTimeout(connect, seen ? 900 : 1200);
      return () => window.clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auto, shown, visible, inside, list.length]);

    // One loop: the comets along the connected wires and the particle field.
    React.useEffect(() => {
      const el = canvas.current;
      if (!el || !shown) return;
      const ctx = el.getContext("2d")!;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      el.width = W * dpr;
      el.height = H * dpr;

      const seed = () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        r: 0.6 + Math.random() * 0.9,
        a: 0.08 + Math.random() * 0.14,
      });
      const ambient = () =>
        field.current.filter((p) => p.life === undefined).length;
      while (ambient() < live.current.particles) field.current.push(seed());

      const draw = () => {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);
        for (const p of field.current) {
          const fade =
            p.life !== undefined ? Math.max(0, 1 - p.life / (p.max ?? 1)) : 1;
          ctx.fillStyle = p.color
            ? rgba(p.color, p.a * fade)
            : rgba(live.current.ink, p.a);
          ctx.beginPath();
          ctx.arc(
            p.x,
            p.y,
            p.r * (p.color ? 0.6 + fade * 0.6 : 1),
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      };

      // Each wire's comet runs at its own pace and phase.
      const n = lines.length;
      const pace = lines.map((_, i) => 3.2 + ((i * 7) % 5) * 0.4);
      const progress = lines.map((_, i) => -((i * 0.53) % 1) * 1.4);
      const lengths: number[] = [];
      // The magnetic pull on each wire: an offset on a springy, slightly bouncy follow.
      const pull = lines.map(() => ({ ox: 0, oy: 0, vx: 0, vy: 0, t: 0.5 }));
      let grabbed: number | null = null;
      const magnet = (dt: number) => {
        const ptr = pointer.current;
        const { on: conn, hover: hv } = live.current;
        let near: number | null = null;
        let best = REACH;
        for (let i = 0; i < n; i++) {
          const l = lines[i]!;
          const m = pull[i]!;
          let tx = 0;
          let ty = 0;
          if (conn.has(list[i]!.id)) {
            // The nearest point on the resting curve.
            let bt = 0.5;
            let bd = Infinity;
            for (let s = 1; s < 24; s++) {
              const q = at(l, s / 24);
              const dd = Math.hypot(q.x - ptr.x, q.y - ptr.y);
              if (dd < bd) {
                bd = dd;
                bt = s / 24;
              }
            }
            if (bd < REACH) {
              const q = at(l, bt);
              const f = 0.95 * (1 - (bd / REACH) ** 2);
              tx = (ptr.x - q.x) * f;
              ty = (ptr.y - q.y) * f;
              m.t += (bt - m.t) * Math.min(1, dt * 10);
              if (bd < best) {
                best = bd;
                near = i;
              }
            }
          }
          m.vx += (tx - m.ox) * 260 * dt;
          m.vy += (ty - m.oy) * 260 * dt;
          m.vx *= Math.exp(-dt * 10);
          m.vy *= Math.exp(-dt * 10);
          m.ox += m.vx * dt;
          m.oy += m.vy * dt;
          if (
            Math.abs(m.ox) + Math.abs(m.oy) + Math.abs(m.vx) + Math.abs(m.vy) <
            0.02
          ) {
            if (m.ox || m.oy) {
              m.ox = m.oy = m.vx = m.vy = 0;
              for (const el of [
                wires.current[i],
                previews.current[i],
                comets.current[i],
              ])
                el?.setAttribute("d", l.d);
              lengths[i] = 0;
            }
            continue;
          }
          const d = bent(l, m.ox, m.oy, m.t);
          for (const el of [
            wires.current[i],
            previews.current[i],
            comets.current[i],
          ])
            el?.setAttribute("d", d);
          lengths[i] = 0;
        }
        // The wire being pulled lights up like a hovered tile.
        if (near !== null && hv !== near && (hv === null || hv === grabbed)) {
          grabbed = near;
          setHover(near);
        } else if (near === null && grabbed !== null) {
          if (hv === grabbed) setHover(null);
          grabbed = null;
        }
      };
      const place = () => {
        for (let i = 0; i < n; i++) {
          const c = comets.current[i];
          if (!c) continue;
          if (!lengths[i]) lengths[i] = c.getTotalLength();
          const len = lengths[i]!;
          const seg = live.current.hover === i ? 70 : 46;
          const u = Math.max(0, Math.min(1, progress[i]!));
          c.style.strokeDasharray = `${seg} ${len + seg}`;
          c.style.strokeDashoffset = String(seg - u * (len + seg));
          c.style.opacity = progress[i]! < 0 || progress[i]! > 1 ? "0" : "1";
        }
      };

      if (still || !visible) {
        draw();
        place();
        return;
      }

      let raf = 0;
      let last = performance.now();
      const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        if (document.hidden) return;
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        const {
          on: conn,
          hover: hv,
          particles: want,
          speed: sp,
        } = live.current;

        magnet(dt);

        // Comets: only on connected wires; landing pulses the hub and throws sparks.
        for (let i = 0; i < n; i++) {
          const b = list[i];
          if (!b || !conn.has(b.id)) {
            progress[i] = -0.4 - Math.random();
            continue;
          }
          progress[i]! += (dt * sp * (hv === i ? 2 : 1)) / pace[i]!;
          if (progress[i]! > 1.15) {
            progress[i] = -1.2 - Math.random() * 1.6;
            const l = lines[i]!;
            burst(l.ex, l.ey, b.colors, 3, false);
            pulseHub();
          }
        }
        place();

        // Keep the ambient count in line with the setting.
        let count = ambient();
        while (count < want) {
          field.current.push(seed());
          count++;
        }
        if (count > want) {
          let drop = count - want;
          field.current = field.current.filter(
            (p) => p.life !== undefined || drop-- <= 0,
          );
        }

        const ptr = pointer.current;
        field.current = field.current.filter((p) => {
          if (p.life !== undefined) {
            p.life += dt;
            p.vx *= Math.exp(-dt * 1.4);
            p.vy *= Math.exp(-dt * 1.4);
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            return p.life < (p.max ?? 1);
          }
          // A little wander.
          p.vx += (Math.random() - 0.5) * 18 * dt;
          p.vy += (Math.random() - 0.5) * 18 * dt;
          // A slow swirl round the hub.
          const hx = p.x - HX;
          const hy = p.y - HY;
          const hd = Math.hypot(hx, hy) || 1;
          if (hd < 150) {
            const k = (1 - hd / 150) * 26;
            p.vx += (-hy / hd) * k * dt;
            p.vy += (hx / hd) * k * dt;
          }
          // Scatter from the pointer.
          const dx = p.x - ptr.x;
          const dy = p.y - ptr.y;
          const d = Math.hypot(dx, dy);
          if (d < 90 && d > 0.1) {
            const k = (1 - d / 90) ** 2 * 900;
            p.vx += (dx / d) * k * dt;
            p.vy += (dy / d) * k * dt;
          }
          p.vx *= Math.exp(-dt * 1.2);
          p.vy *= Math.exp(-dt * 1.2);
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          if (p.x < -4) p.x = W + 4;
          if (p.x > W + 4) p.x = -4;
          if (p.y < -4) p.y = H + 4;
          if (p.y > H + 4) p.y = -4;
          return true;
        });
        draw();
      };
      raf = requestAnimationFrame(frame);
      return () => cancelAnimationFrame(raf);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shown, still, visible, lines, burst, pulseHub]);

    const connected = list.filter((b) => on.has(b.id));
    const ringColors = connected.flatMap((b) => b.colors.slice(0, 2));
    const conic = ringColors.length
      ? `conic-gradient(from 0deg, ${[...ringColors, ringColors[0]].join(", ")})`
      : isDark
        ? "conic-gradient(from 0deg, #27272a, #3f3f46, #27272a)"
        : "conic-gradient(from 0deg, #e4e4e0, #c8c8c3, #e4e4e0)";

    return (
      <div
        ref={root}
        className={cn(
          "relative mx-auto w-[480px] max-w-full overflow-hidden rounded-2xl bg-white dark:bg-[#121215] text-[#242423] dark:text-zinc-100 border border-black/[0.08] dark:border-white/[0.1] shadow-[0_0_12px_rgba(0,0,0,0.06)] dark:shadow-[0_0_12px_rgba(0,0,0,0.28)]",
          className,
        )}
      >
        <style>{`
          @keyframes avara-bridge-spin { to { transform: rotate(360deg); } }
          .avara-bridge-tile { --bridge-tap: 1; transform: translate(var(--bridge-x), var(--bridge-y)) scale(calc(var(--bridge-lit) * var(--bridge-tap))); }
          .avara-bridge-tile:active { --bridge-tap: 0.92; }
          @media (prefers-reduced-motion: reduce) { .avara-bridge-tile:active { --bridge-tap: 1; } }
        `}</style>
        {/* The graphic */}
        <div
          className="relative overflow-hidden"
          style={{ height: H * scale }}
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            // Stage pixels, whatever scale the card is drawn at.
            const k = r.width / W;
            pointer.current = {
              x: (e.clientX - r.left) / k,
              y: (e.clientY - r.top) / k,
            };
          }}
          onPointerEnter={() => setInside(true)}
          onPointerLeave={() => {
            pointer.current = { x: -999, y: -999 };
            setInside(false);
          }}
        >
          <div
            className="absolute left-0 top-0 origin-top-left"
            style={{ width: W, height: H, transform: `scale(${scale})` }}
          >
            <canvas
              ref={canvas}
              aria-hidden
              className="absolute inset-0 size-full"
              style={{
                maskImage: "linear-gradient(to bottom, black 65%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 65%, transparent)",
              }}
            />

            {/* Wires: a soft gradient base, a preview on hover, and a glowing comet. */}
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="pointer-events-none absolute inset-0 size-full"
              aria-hidden
            >
              <defs>
                <filter
                  id={`${uid}-glow`}
                  x="-20%"
                  y="-50%"
                  width="140%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="2.4" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {lines.map((l, i) => {
                  const cs = list[i]!.colors;
                  return (
                    <linearGradient
                      key={i}
                      id={`${uid}-g${i}`}
                      gradientUnits="userSpaceOnUse"
                      x1={l.sx}
                      y1={l.sy}
                      x2={l.ex}
                      y2={l.ey}
                    >
                      {cs.map((c, k) => (
                        <stop
                          key={k}
                          offset={(k / Math.max(1, cs.length)) * 0.8}
                          stopColor={c}
                        />
                      ))}
                      <stop offset="1" stopColor={ink} stopOpacity="0.5" />
                    </linearGradient>
                  );
                })}
              </defs>
              {lines.map((l, i) => {
                const b = list[i]!;
                const conn = on.has(b.id);
                const lit = hover === i;
                const dim = hover !== null && !lit;
                return (
                  <g key={b.id}>
                    {/* Unconnected: a faint dashed preview while hovered. */}
                    <path
                      ref={(el) => void (previews.current[i] = el)}
                      d={l.d}
                      fill="none"
                      stroke={ink}
                      strokeWidth={1.25}
                      strokeLinecap="round"
                      pathLength={1}
                      style={{
                        strokeDasharray: "1 1",
                        strokeDashoffset: !conn && lit ? 0 : 1,
                        opacity: !conn && lit ? 0.35 : 0,
                        transition: still
                          ? "none"
                          : `stroke-dashoffset 0.45s ${GLIDE}, opacity 0.45s ${GLIDE}`,
                      }}
                    />
                    <path
                      ref={(el) => void (wires.current[i] = el)}
                      d={l.d}
                      fill="none"
                      stroke={`url(#${uid}-g${i})`}
                      strokeLinecap="round"
                      pathLength={1}
                      style={{
                        strokeDasharray: "1 1",
                        strokeDashoffset: shown && conn ? 0 : 1,
                        opacity: shown && conn ? (dim ? 0.2 : lit ? 1 : 0.55) : 0,
                        strokeWidth: lit ? 3 : 2,
                        transition: still
                          ? "none"
                          : "stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s, stroke-width 0.2s",
                      }}
                    />
                    <path
                      ref={(el) => void (comets.current[i] = el)}
                      d={l.d}
                      fill="none"
                      stroke={`url(#${uid}-g${i})`}
                      strokeWidth={lit ? 4 : 3}
                      strokeLinecap="round"
                      filter={`url(#${uid}-glow)`}
                      style={{ opacity: 0, strokeDasharray: "0 9999" }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* The hub, in a rotating ring of the connected brands' colours. */}
            <div
              className="absolute"
              style={{
                left: HX - HUB / 2,
                top: HY - HUB / 2,
                width: HUB,
                height: HUB,
                opacity: shown ? 1 : 0,
                transform: shown ? "scale(1)" : "scale(0.6)",
                filter: shown ? "blur(0px)" : "blur(6px)",
                transition: still
                  ? "none"
                  : `opacity 0.4s ease 0.15s, transform 0.6s ${POP} 0.15s, filter 0.5s ease 0.15s`,
              }}
            >
              <span
                ref={ring}
                aria-hidden
                className="absolute inset-0 rounded-2xl opacity-0"
                style={{ background: conic }}
              />
              <div className="relative size-full overflow-hidden rounded-2xl p-[1.5px] shadow-[0_0_12px_rgba(0,0,0,0.06)] dark:shadow-[0_0_12px_rgba(0,0,0,0.3)]">
                <span
                  aria-hidden
                  className="absolute -inset-1/2"
                  style={{
                    background: conic,
                    animation: still
                      ? "none"
                      : "avara-bridge-spin 8s linear infinite",
                  }}
                />
                <div className="relative grid size-full place-items-center rounded-xl bg-white dark:bg-[#121215]">
                  <div className="grid size-[60px] place-items-center rounded-xl bg-[#242423]/[0.04] dark:bg-white/[0.06]">
                    {hub ?? <BridgeMark />}
                  </div>
                </div>
              </div>
            </div>

            {/* Brand tiles */}
            {list.map((b, i) => {
              const l = lines[i]!;
              const conn = on.has(b.id);
              const lit = hover === i;
              const right = i >= Math.ceil(list.length / 2);
              return (
                <button
                  key={b.id}
                  type="button"
                  aria-pressed={conn}
                  aria-label={`${b.name}, ${conn ? "connected" : "not connected"}`}
                  onClick={() => {
                    setAuto(false);
                    link(i, !conn);
                  }}
                  onPointerEnter={() => setHover(i)}
                  onPointerLeave={() => setHover((h) => (h === i ? null : h))}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover((h) => (h === i ? null : h))}
                  className="avara-bridge-tile group absolute grid cursor-pointer place-items-center rounded-xl bg-white dark:bg-zinc-900 outline-none ring-1 ring-black/[0.08] dark:ring-white/[0.1] shadow-[0_0_10px_rgba(0,0,0,0.06)] dark:shadow-[0_0_12px_rgba(0,0,0,0.35)] focus-visible:ring-2 focus-visible:ring-[#242423]/40 dark:focus-visible:ring-white/40"
                  style={
                    {
                      left: l.x - TILE / 2,
                      top: l.y - TILE / 2,
                      width: TILE,
                      height: TILE,
                      "--bridge-x": shown ? "0px" : right ? "-40px" : "40px",
                      "--bridge-y": shown && lit ? "-3px" : "0px",
                      "--bridge-lit": shown ? (lit ? 1.08 : 1) : 0.5,
                      opacity: shown
                        ? hover !== null && !lit
                          ? 0.75
                          : conn
                            ? 1
                            : 0.92
                        : 0,
                      filter: shown ? "blur(0px)" : "blur(6px)",
                      transition: still
                        ? "none"
                        : `transform 0.5s ${POP}, opacity 0.25s, filter 0.4s ease`,
                    } as React.CSSProperties
                  }
                >
                  <span
                    className="grid"
                    style={{
                      filter: conn ? "grayscale(0)" : "grayscale(1)",
                      opacity: conn ? 1 : 0.55,
                      transition: "filter 0.35s, opacity 0.35s",
                    }}
                  >
                    <span className="grid transition-transform duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-rotate-6">
                      {b.logo}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Heading and line, centred under the graphic. */}
        <div className="px-8 pb-8 pt-2 text-center">
          <h3
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(8px)",
              filter: shown ? "blur(0px)" : "blur(4px)",
              transition: still
                ? "none"
                : `opacity 0.5s ${GLIDE} 0.35s, transform 0.5s ${GLIDE} 0.35s, filter 0.5s ${GLIDE} 0.35s`,
            }}
            className="text-[20px] font-semibold tracking-tight"
          >
            {title}
          </h3>
          <p
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(8px)",
              filter: shown ? "blur(0px)" : "blur(4px)",
              transition: still
                ? "none"
                : `opacity 0.5s ${GLIDE} 0.43s, transform 0.5s ${GLIDE} 0.43s, filter 0.5s ${GLIDE} 0.43s`,
            }}
            className="mx-auto mt-2 max-w-[340px] text-pretty text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400"
          >
            {description}
          </p>
        </div>
        <span role="status" aria-live="polite" className="sr-only">
          {said}
        </span>
      </div>
    );
  },
);

export default BrandBridge;
