"use client";

import * as React from "react";
import Button from "@/components/custom/blocks/Button";
import { cn } from "@/lib/utils";

/**
 * Everything that moves here is plain CSS plus a little Web Animations API
 * (the FLIP helper) and a requestAnimationFrame count-up, so the block needs
 * no animation library.
 */
const PROFILE_CARD_CSS = `
@keyframes pc-card-in { from { opacity: 0; transform: translateY(18px) scale(0.98); } }
@keyframes pc-reveal { from { opacity: 0; transform: translateY(10px); filter: blur(4px); } }
@keyframes pc-avatar-in { from { opacity: 0; transform: translateY(10px) scale(0.6); } }
@keyframes pc-chip-in { from { opacity: 0; transform: translateY(-6px) scale(0.9); } }
@keyframes pc-skill-in { from { opacity: 0; transform: scale(0.8); } }
@keyframes pc-swap-in { from { opacity: 0; transform: translateY(10px); filter: blur(4px); } }
@keyframes pc-ping-chip { from { transform: scale(1); opacity: 0.6; } to { transform: scale(2.6); opacity: 0; } }
@keyframes pc-ping-dot { from { transform: scale(1); opacity: 0.5; } to { transform: scale(2); opacity: 0; } }
@keyframes pc-drift-a { 0%, 100% { transform: translate(0, 0); } 33.3% { transform: translate(30px, 20px); } 66.7% { transform: translate(-10px, 10px); } }
@keyframes pc-drift-b { 0%, 100% { transform: translate(0, 0); } 33.3% { transform: translate(-24px, 16px); } 66.7% { transform: translate(12px, -8px); } }
@keyframes pc-bump { 0% { transform: scale(1); } 33% { transform: scale(1.35); } 66% { transform: scale(0.92); } 100% { transform: scale(1); } }
@keyframes pc-ring { from { transform: scale(0.6); opacity: 1; } to { transform: scale(1.5); opacity: 0; } }
@keyframes pc-draw { from { opacity: 0; stroke-dashoffset: 1; transform: scale(0.5); } to { opacity: 1; stroke-dashoffset: 0; transform: scale(1); } }
@keyframes pc-draw-flat { from { opacity: 0; stroke-dashoffset: 1; } to { opacity: 1; stroke-dashoffset: 0; } }
@keyframes pc-badge { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes pc-squash { 0%, 100% { transform: scale(1, 1); } 25% { transform: scale(0.9, 1.3); } 50% { transform: scale(1.1, 0.9); } 75% { transform: scale(0.95, 1.05); } }
@keyframes pc-wiggle { 0% { transform: scale(1) rotate(0); } 25% { transform: scale(1.05) rotate(-7deg); } 75% { transform: scale(1.05) rotate(7deg); } 100% { transform: scale(1.05) rotate(0); } }
@keyframes pc-plus { from { opacity: 0; transform: scale(0) rotate(-90deg); } 70% { opacity: 1; transform: scale(1.15) rotate(0); } to { opacity: 1; transform: scale(1) rotate(0); } }

.pc-card-in { animation: pc-card-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
.pc-reveal { animation: pc-reveal 0.45s cubic-bezier(0.22, 1, 0.36, 1) backwards; animation-delay: var(--d, 0s); }
.pc-avatar-in { animation: pc-avatar-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.18s backwards; }
.pc-chip-in { animation: pc-chip-in 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s backwards; }
.pc-skill-in { animation: pc-skill-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) backwards; }
.pc-swap-in { animation: pc-swap-in 0.2s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
.pc-ping-chip { animation: pc-ping-chip 1.8s ease-out infinite; }
.pc-ping-dot { animation: pc-ping-dot 2s ease-out infinite; }
.pc-drift-a { animation: pc-drift-a 14s ease-in-out infinite; }
.pc-drift-b { animation: pc-drift-b 16s ease-in-out infinite; }
.pc-bump { animation: pc-bump 0.45s cubic-bezier(0.22, 1, 0.36, 1); }
.pc-ring { animation: pc-ring 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
.pc-badge { stroke-dasharray: 1; animation: pc-badge 0.35s cubic-bezier(0.22, 1, 0.36, 1) 0.6s backwards; }

.pc-ic svg { overflow: visible; }
.pc-ic path, .pc-ic circle, .pc-ic g, .pc-ic svg { transform-box: fill-box; transform-origin: center; }
.pc-i-check path, .pc-i-pin circle { stroke-dasharray: 1; stroke-dashoffset: 0; }
.pc-i-check[data-play="true"] path { animation: pc-draw 0.4s both; }
.pc-i-save[data-play="true"] path { animation: pc-squash 0.6s ease-out; }
.pc-i-pin svg { transition: transform 0.5s cubic-bezier(0.3, 1.6, 0.6, 1); }
.pc-i-pin[data-play="true"] svg { transform: translateY(-3px); }
.pc-i-pin[data-play="true"] circle { animation: pc-draw-flat 0.5s 0.3s both; }
.pc-i-msg[data-play="true"] svg { animation: pc-wiggle 0.5s ease-in-out forwards; }
.pc-i-plus[data-play="true"] .pc-pl { animation: pc-plus 0.45s ease-out 0.25s; }

@media (prefers-reduced-motion: reduce) {
  .pc-card-in, .pc-reveal, .pc-avatar-in, .pc-chip-in, .pc-skill-in, .pc-swap-in, .pc-ping-chip, .pc-ping-dot,
  .pc-drift-a, .pc-drift-b, .pc-bump, .pc-ring, .pc-badge, .pc-ic, .pc-ic * { animation: none !important; transition: none !important; }
}
`;

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

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

/** True once at least `amount` of the element has been on screen. */
function useSeenOnce(ref: React.RefObject<Element | null>, amount: number) {
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: amount },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, amount]);
  return seen;
}

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Position and size inside `root`, ignoring any transform in flight. */
function boxIn(el: HTMLElement, root: HTMLElement): Box {
  let x = 0;
  let y = 0;
  let n: HTMLElement | null = el;
  while (n && n !== root) {
    x += n.offsetLeft;
    y += n.offsetTop;
    n = n.offsetParent as HTMLElement | null;
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

/**
 * After every commit, glide each `[data-flip]` element from where it was to
 * where it is now, so chips reflow smoothly when the skill list opens.
 */
function useFlip(root: React.RefObject<HTMLElement | null>, still: boolean) {
  const prev = React.useRef(new Map<string, Box>());
  useIsoLayoutEffect(() => {
    const host = root.current;
    if (!host) return;
    const next = new Map<string, Box>();
    host.querySelectorAll<HTMLElement>("[data-flip]").forEach((el) => {
      const key = el.dataset.flip!;
      const b = boxIn(el, host);
      next.set(key, b);
      const a = prev.current.get(key);
      if (!a || still) return;
      if (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) < 0.5) return;
      el.getAnimations()
        .filter((n) => n.id === "pc-flip")
        .forEach((n) => n.cancel());
      const run = el.animate(
        [
          { transform: `translate(${a.x - b.x}px, ${a.y - b.y}px)` },
          { transform: "none" },
        ],
        { duration: 360, easing: "cubic-bezier(0.34, 1.3, 0.64, 1)" },
      );
      run.id = "pc-flip";
    });
    prev.current = next;
  });
}

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  /** Plays the animation while true; leave undefined to play on hover. */
  active?: boolean;
  strokeWidth?: number | string;
}

const HOSTS =
  "button, a, [role=button], [role=menuitem], [role=tab], [role=switch], [role=radio], label";

/**
 * An icon whose strokes animate on hover (of itself or of the button that
 * holds it) or while `active`. The motion lives in the CSS above, keyed by
 * `cls` and by `data-play`.
 */
function makeIcon(name: string, cls: string, body: React.ReactNode) {
  const Icon = React.forwardRef<HTMLSpanElement, IconProps>(function Icon(
    { onMouseEnter, onMouseLeave, className, size, active, style, strokeWidth, ...props },
    ref,
  ) {
    const wrap = React.useRef<HTMLSpanElement>(null);
    React.useImperativeHandle(ref, () => wrap.current!);
    const [hot, setHot] = React.useState(false);
    const [hosted, setHosted] = React.useState(false);
    React.useEffect(() => {
      if (active !== undefined) return;
      const host = wrap.current?.parentElement?.closest<HTMLElement>(HOSTS);
      setHosted(!!host);
      if (!host) return;
      const on = () => setHot(true);
      const off = () => setHot(false);
      host.addEventListener("pointerenter", on);
      host.addEventListener("pointerleave", off);
      return () => {
        host.removeEventListener("pointerenter", on);
        host.removeEventListener("pointerleave", off);
      };
    }, [active]);
    const play = active ?? hot;
    return (
      <span
        ref={wrap}
        data-play={play ? "true" : "false"}
        className={cn(
          "pc-ic inline-grid size-6 shrink-0 place-items-center align-middle [&>svg]:size-full",
          cls,
          className,
        )}
        style={size ? { width: size, height: size, ...style } : style}
        onMouseEnter={(e) => {
          if (!hosted && active === undefined) setHot(true);
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          if (!hosted && active === undefined) setHot(false);
          onMouseLeave?.(e);
        }}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth ?? 2}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          {body}
        </svg>
      </span>
    );
  });
  Icon.displayName = name;
  return Icon;
}

const BookmarkIcon = makeIcon(
  "BookmarkIcon",
  "pc-i-save",
  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />,
);

const CheckIcon = makeIcon(
  "CheckIcon",
  "pc-i-check",
  <path d="M4 12 9 17L20 6" pathLength={1} />,
);

const MapPinIcon = makeIcon(
  "MapPinIcon",
  "pc-i-pin",
  <>
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" pathLength={1} />
  </>,
);

const MessageCircleIcon = makeIcon(
  "MessageCircleIcon",
  "pc-i-msg",
  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />,
);

const UserPlusIcon = makeIcon(
  "UserPlusIcon",
  "pc-i-plus",
  <>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <g className="pc-pl">
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </g>
  </>,
);

export interface ProfileStat {
  label: string;
  value: number;
  /** Decimal places. Default `0`. */
  decimals?: number;
  /** Shorten thousands to "12.4k". Default `false`. */
  compact?: boolean;
}

export {
  AccountMenu,
  type AccountMenuProps,
  type AccountStatus,
  type AccountWorkspace,
} from "@/components/custom/blocks/AccountMenuBlock";

export type ProfileCardVariant = "aurora" | "account-menu";

export interface ProfileCardProps {
  /** Visual style variant. Default `"aurora"`. */
  variant?: ProfileCardVariant;
  name?: string;
  role?: string;
  /** City or place, shown with a pin. Pass `null` to hide it. */
  location?: string | null;
  bio?: string;
  /** Portrait URL. */
  avatar?: string;
  /** Shows a verified badge by the name. Default `true`. */
  verified?: boolean;
  /** Shows the pulsing green online dot on the avatar. Default `true`. */
  active?: boolean;
  /** The status on the cover, as in `"Available"`. Pass `null` to hide it. */
  status?: string | null;
  /** Skill chips; the first three show, the rest open from a "+n" chip. */
  skills?: string[];
  /** Three numbers. The first one counts followers and ticks up on Follow. */
  stats?: ProfileStat[];
  /** Pastel colours for the cover's aurora, three of them. */
  cover?: [string, string, string];
  /** Following at first. Default `false`. */
  defaultFollowing?: boolean;
  onFollowChange?: (following: boolean) => void;
  onMessage?: () => void;
  onSaveChange?: (saved: boolean) => void;
  className?: string;
}

const SHOWN_SKILLS = 3;

const DEFAULT_STATS: ProfileStat[] = [
  { label: "Followers", value: 18420 },
  { label: "Projects", value: 64 },
  { label: "Rating", value: 4.9, decimals: 1 },
];

function formatStat(v: number, s: ProfileStat) {
  if (s.compact && Math.abs(v) >= 1000) {
    const k = v / 1000;
    return `${k.toFixed(k >= 100 ? 0 : 1)}k`;
  }
  return v.toLocaleString("en-US", {
    minimumFractionDigits: s.decimals ?? 0,
    maximumFractionDigits: s.decimals ?? 0,
  });
}

function Stat({
  stat,
  value,
  run,
  still,
  delay,
}: {
  stat: ProfileStat;
  value: number;
  run: boolean;
  still: boolean;
  delay: number;
}) {
  const [n, setN] = React.useState(still ? value : 0);
  const cur = React.useRef(still ? value : 0);
  const first = React.useRef(true);
  React.useEffect(() => {
    if (!run) return;
    if (still) {
      cur.current = value;
      setN(value);
      return;
    }
    const from = cur.current;
    const ms = first.current ? 1200 : 500;
    const wait = first.current ? delay * 1000 : 0;
    first.current = false;
    let raf = 0;
    let t0 = 0;
    const step = (t: number) => {
      if (!t0) t0 = t + wait;
      const p = Math.min(1, Math.max(0, (t - t0) / ms));
      const v = from + (value - from) * (1 - Math.pow(1 - p, 4));
      cur.current = v;
      setN(v);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, run, still, delay]);
  return (
    <div className="min-w-0 flex-1 rounded-xl bg-[#242423]/[0.04] px-1.5 py-2.5 text-center dark:bg-white/[0.05]">
      <p className="truncate text-lg font-semibold tabular-nums tracking-tight @max-[18rem]:text-base">
        {formatStat(n, stat)}
      </p>
      <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
        {stat.label}
      </p>
    </div>
  );
}

const SEAL = (() => {
  const pts: string[] = [];
  for (let i = 0; i < 144; i++) {
    const t = (i / 144) * Math.PI * 2;
    const r = 8.7 + 0.8 * Math.cos(12 * t);
    pts.push(
      `${(10 + r * Math.cos(t)).toFixed(2)} ${(10 + r * Math.sin(t)).toFixed(2)}`,
    );
  }
  return `M${pts.join("L")}Z`;
})();

function VerifiedBadge({ shown }: { shown: boolean }) {
  return (
    <span
      role="img"
      aria-label="Verified"
      className="inline-grid size-[18px] shrink-0 place-items-center"
    >
      <svg viewBox="0 0 20 20" className="size-full">
        <path d={SEAL} fill="#2563eb" />
        <path
          d="M6.3 10.4 8.8 12.8 13.8 7.8"
          fill="none"
          stroke="#fff"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          className={shown ? "pc-badge" : undefined}
          style={shown ? undefined : { strokeDasharray: 1, strokeDashoffset: 1 }}
        />
      </svg>
    </span>
  );
}

export const ProfileCard = React.forwardRef<HTMLDivElement, ProfileCardProps>(
  function ProfileCard(
    {
      variant = "aurora",
      name = "Nadia Karim",
      role = "Product & motion engineer",
      location = "United States",
      bio = "Building expressive interfaces, tactile micro-interactions, and resilient design systems for modern web apps.",
      avatar = "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_240,h_240,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg",
      verified = true,
      active = true,
      status = "Available",
      skills = [
        "Design Systems",
        "Motion",
        "TypeScript",
        "React",
        "UI Craft",
        "Prototyping",
      ],
      stats = DEFAULT_STATS,
      cover = ["#a5f3fc", "#c4b5fd", "#fbcfe8"],
      defaultFollowing = false,
      onFollowChange,
      onMessage,
      onSaveChange,
      className,
    },
    forwardedRef,
  ) {
    const ref = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(
      forwardedRef,
      () => ref.current as HTMLDivElement,
    );
    const inView = useSeenOnce(ref, 0.3);
    const still = useStill();
    const shown = still || inView;
    useFlip(ref, still);

    // The third aurora blob follows the pointer; a CSS transition on
    // left/top gives it the lag, so no state changes on pointer move.
    const blob = React.useRef<HTMLSpanElement>(null);
    const [hover, setHover] = React.useState(false);
    const onMove = (e: React.PointerEvent) => {
      if (still || !blob.current) return;
      const r = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      blob.current.style.left = `${10 + px * 80}%`;
      blob.current.style.top = `${20 + py * 60}%`;
    };
    const onLeave = () => {
      setHover(false);
      if (blob.current) {
        blob.current.style.left = "50%";
        blob.current.style.top = "50%";
      }
    };

    const [following, setFollowing] = React.useState(defaultFollowing);
    const [toggled, setToggled] = React.useState(false);
    const [saved, setSaved] = React.useState(false);
    const [more, setMore] = React.useState(false);
    const [hoverBtn, setHoverBtn] = React.useState<string | null>(null);

    const follow = () => {
      setToggled(true);
      setFollowing((f) => {
        onFollowChange?.(!f);
        return !f;
      });
    };
    const save = () => {
      setSaved((s) => {
        onSaveChange?.(!s);
        return !s;
      });
    };

    const extra = skills.length - SHOWN_SKILLS;
    const showSkills = more ? skills : skills.slice(0, SHOWN_SKILLS);
    /** Entrance for the text blocks: hidden until seen, then staggered by `i`. */
    const rc = (extraClass?: string) =>
      cn(shown ? "pc-reveal" : "opacity-0", extraClass);
    const rs = (i: number) =>
      ({ "--d": `${0.25 + i * 0.07}s` }) as React.CSSProperties;

    return (
      <div
        ref={ref}
        data-variant={variant}
        onPointerEnter={() => setHover(true)}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={cn(
          "@container relative w-[380px] max-w-full rounded-2xl bg-white p-2 text-[#242423] border border-black/[0.08] shadow-[0_0_12px_rgba(0,0,0,0.06)] dark:bg-zinc-900 dark:text-zinc-100 dark:border-white/[0.1] dark:shadow-[0_0_12px_rgba(0,0,0,0.28)]",
          shown ? "pc-card-in" : "opacity-0",
          className,
        )}
      >
        <style>{PROFILE_CARD_CSS}</style>
        {/* Cover: a pastel aurora that drifts, and flows toward the pointer on hover. */}
        <div className="relative h-32 overflow-hidden rounded-xl bg-[#f3f5f8] dark:bg-zinc-800">
          <span
            aria-hidden
            className="pc-drift-a absolute size-56 rounded-full blur-2xl"
            style={{ background: cover[0], left: "-10%", top: "-40%" }}
          />
          <span
            aria-hidden
            className="pc-drift-b absolute size-52 rounded-full blur-2xl"
            style={{ background: cover[2], right: "-15%", top: "-30%" }}
          />
          <span
            ref={blob}
            aria-hidden
            className="absolute size-48 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: still ? "55%" : "50%",
              top: still ? "60%" : "50%",
              transition: still
                ? "none"
                : "left 0.7s cubic-bezier(0.22, 1, 0.36, 1), top 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <span
              className="block size-full rounded-full blur-2xl"
              style={{
                background: cover[1],
                transform: hover && !still ? "scale(1.15)" : "scale(1)",
                opacity: hover ? 1 : 0.85,
                transition: "transform 0.6s cubic-bezier(0.34, 1.3, 0.64, 1), opacity 0.4s",
              }}
            />
          </span>
          <span
            aria-hidden
            className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='120' height='120' filter='url(%23n)' opacity='0.6'/></svg>\")",
            }}
          />
          {status && (
            <span
              className={cn(
                "absolute right-3 top-3 inline-flex h-7 items-center gap-1.5 rounded-full bg-white/70 px-2.5 text-xs font-medium text-[#242423] backdrop-blur-md dark:bg-zinc-900/60 dark:text-zinc-100",
                shown ? "pc-chip-in" : "opacity-0",
              )}
            >
              <span className="relative grid size-1.5 place-items-center">
                {!still && (
                  <span className="pc-ping-chip absolute inset-0 rounded-full bg-[#16a36a]" />
                )}
                <span className="relative size-1.5 rounded-full bg-[#16a36a]" />
              </span>
              {status}
            </span>
          )}
        </div>

        <div className="px-4 pb-4">
          {/* Avatar, overlapping the cover. */}
          <div
            className={cn(
              "relative -mt-10 size-20 rounded-full bg-white p-1 transition-transform duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] motion-safe:hover:-rotate-3 motion-safe:hover:scale-105 dark:bg-zinc-900",
              shown ? "pc-avatar-in" : "opacity-0",
            )}
          >
            <img
              src={avatar}
              alt=""
              className="size-full rounded-full bg-zinc-100 object-cover dark:bg-zinc-800"
              draggable={false}
            />
            {active && (
              <span className="absolute bottom-1 right-1 grid size-4 place-items-center rounded-full bg-white dark:bg-zinc-900">
                <span className="relative grid size-2.5 place-items-center">
                  {!still && (
                    <span className="pc-ping-dot absolute inset-0 rounded-full bg-[#16a36a]" />
                  )}
                  <span className="relative size-2.5 rounded-full bg-[#16a36a]" />
                </span>
              </span>
            )}
          </div>

          {/* Name, role and bio. */}
          <div
            style={rs(0)}
            className={rc("mt-3 flex items-center gap-1.5")}
          >
            <h3 className="truncate text-xl font-semibold tracking-tight">
              {name}
            </h3>
            {verified && <VerifiedBadge shown={shown} />}
          </div>
          <p
            style={rs(1)}
            className={rc("mt-0.5 flex flex-wrap items-center gap-x-1.5 text-sm text-zinc-500 dark:text-zinc-400",
            )}
          >
            <span>{role}</span>
            {location && (
              <span className="inline-flex items-center gap-1 @max-[18rem]:basis-full">
                <span aria-hidden className="@max-[18rem]:hidden">
                  ·
                </span>
                <MapPinIcon
                  className="size-3.5"
                  active={hover}
                  strokeWidth={2.25}
                />
                {location}
              </span>
            )}
          </p>
          <p
            style={rs(2)}
            className={rc("mt-3 text-pretty text-sm leading-relaxed text-zinc-600 dark:text-zinc-300",
            )}
          >
            {bio}
          </p>

          {/* Skills: three show, the rest spring open. */}
          <ul
            style={rs(3)}
            className={rc("mt-3 flex flex-wrap gap-1.5")}
          >
            {showSkills.map((s, i) => (
              <li
                key={s}
                data-flip={`skill-${s}`}
                className={cn(
                  "inline-flex h-7 items-center rounded-full bg-[#242423]/[0.06] px-3 text-xs font-medium dark:bg-white/[0.08]",
                  more && i >= SHOWN_SKILLS && "pc-skill-in",
                )}
              >
                {s}
              </li>
            ))}
            {extra > 0 && (
              <li key="more" data-flip="more">
                <button
                  type="button"
                  aria-expanded={more}
                  onClick={() => setMore((m) => !m)}
                  className="inline-flex h-7 items-center rounded-full bg-[#242423]/[0.03] px-3 text-xs font-medium text-zinc-500 outline-none transition-colors hover:bg-[#242423]/[0.07] hover:text-[#242423] focus-visible:ring-2 focus-visible:ring-zinc-400 dark:bg-white/[0.04] dark:text-zinc-400 dark:hover:bg-white/[0.08] dark:hover:text-zinc-100"
                >
                  {more ? "Less" : `+${extra}`}
                </button>
              </li>
            )}
          </ul>

          {/* Stats. The first one is followers and ticks up on Follow. */}
          <div style={rs(4)} className={rc("mt-4 flex gap-2")}>
            {stats.slice(0, 3).map((s, i) => (
              <Stat
                key={s.label}
                stat={s}
                value={
                  i === 0 && following !== defaultFollowing
                    ? s.value + (following ? 1 : -1)
                    : s.value
                }
                run={shown}
                still={still}
                delay={0.45 + i * 0.08}
              />
            ))}
          </div>

          {/* Actions: Follow reuses Avara UI Button; message and save. */}
          <div
            style={rs(5)}
            className={rc("mt-4 flex items-center gap-2")}
          >
            <Button
              type="button"
              variant={following ? "secondary" : "default"}
              aria-pressed={following}
              onClick={follow}
              onPointerEnter={() => setHoverBtn("follow")}
              onPointerLeave={() => setHoverBtn(null)}
              className={cn(
                "h-11 flex-1 rounded-full text-sm font-medium transition-all duration-300 active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900",
                following
                  ? "bg-[#242423]/[0.06] text-[#242423] hover:bg-[#242423]/[0.1] dark:bg-white/[0.08] dark:text-zinc-100 dark:hover:bg-white/[0.12]"
                  : "bg-[#242423] text-white hover:bg-[#242423]/90 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-100/90",
              )}
            >
              <span
                key={following ? "on" : "off"}
                className={cn(
                  "inline-flex items-center gap-2",
                  toggled && "pc-swap-in",
                )}
              >
                {following ? (
                  <CheckIcon className="size-4" active strokeWidth={2.5} />
                ) : (
                  <UserPlusIcon
                    className="size-4"
                    active={hoverBtn === "follow"}
                    strokeWidth={2.25}
                  />
                )}
                {following ? "Following" : "Follow"}
              </span>
            </Button>
            <button
              type="button"
              aria-label={`Message ${name}`}
              onClick={onMessage}
              onPointerEnter={() => setHoverBtn("msg")}
              onPointerLeave={() => setHoverBtn(null)}
              className="grid size-11 shrink-0 place-items-center rounded-full bg-[#242423]/[0.06] outline-none transition-[background-color,transform] hover:bg-[#242423]/[0.1] focus-visible:ring-2 focus-visible:ring-zinc-400 motion-safe:active:scale-[0.92] dark:bg-white/[0.08] dark:hover:bg-white/[0.12]"
            >
              <MessageCircleIcon
                className="size-[18px]"
                active={hoverBtn === "msg"}
                strokeWidth={2}
              />
            </button>
            <button
              type="button"
              aria-label={saved ? "Saved" : "Save profile"}
              aria-pressed={saved}
              onClick={save}
              onPointerEnter={() => setHoverBtn("save")}
              onPointerLeave={() => setHoverBtn(null)}
              className="relative grid size-11 shrink-0 place-items-center rounded-full bg-[#242423]/[0.06] outline-none transition-[background-color,transform] hover:bg-[#242423]/[0.1] focus-visible:ring-2 focus-visible:ring-zinc-400 motion-safe:active:scale-[0.92] dark:bg-white/[0.08] dark:hover:bg-white/[0.12]"
            >
              <span
                className={cn(
                  saved && "pc-bump [&_path]:fill-current",
                )}
              >
                <BookmarkIcon
                  className="size-[18px]"
                  active={hoverBtn === "save"}
                  strokeWidth={2}
                />
              </span>
              {saved && !still && (
                <span
                  aria-hidden
                  className="pc-ring pointer-events-none absolute inset-0 rounded-full ring-2 ring-[#242423]/25 dark:ring-white/30"
                />
              )}
            </button>
          </div>
        </div>
      </div>
    );
  },
);

export default ProfileCard;
