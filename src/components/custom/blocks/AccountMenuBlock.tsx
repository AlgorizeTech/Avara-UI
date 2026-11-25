"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Everything that moves here is plain CSS plus a few lines of Web Animations
 * API (the FLIP helper below), so the block needs no animation library.
 */
const ACCOUNT_MENU_CSS = `
@keyframes am-in { from { opacity: 0; transform: translateY(10px); filter: blur(4px); } }
@keyframes am-pill-in { from { opacity: 0; filter: blur(4px); } }
@keyframes am-fade { from { opacity: 0; } }
@keyframes am-ping { from { transform: scale(1); opacity: 0.7; } to { transform: scale(2.6); opacity: 0; } }
@keyframes am-pop { from { transform: scale(0.4); } }
@keyframes am-roll-in { from { opacity: 0; transform: translateY(90%); filter: blur(3px); } }
@keyframes am-roll-out { to { opacity: 0; transform: translateY(-90%); filter: blur(3px); } }
@keyframes am-wash { from { transform: scaleX(0); } }
@keyframes am-grow { from { width: 0; } }
@keyframes am-shimmer { 0% { transform: translateX(-150%); } 35%, 100% { transform: translateX(600%); } }
@keyframes am-draw { from { opacity: 0; stroke-dashoffset: 1; transform: scale(0.5); } to { opacity: 1; stroke-dashoffset: 0; transform: scale(1); } }
@keyframes am-draw-flat { from { opacity: 0; stroke-dashoffset: 1; } to { opacity: 1; stroke-dashoffset: 0; } }
@keyframes am-bob { 0%, 100% { transform: translateY(0); } 40% { transform: translateY(2px); } }
@keyframes am-nudge { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-3px); } }
@keyframes am-hop { 0%, 100% { transform: translateY(0); } 25% { transform: translateY(-1px); } }
@keyframes am-blink { 0% { opacity: 0; } 16.7% { opacity: 1; } 33%, 83% { opacity: 0; } 100% { opacity: 1; } }

.am-item { animation: am-in 0.42s cubic-bezier(0.22, 1, 0.36, 1) backwards; animation-delay: calc(0.12s + var(--i, 0) * 0.045s); }
.am-pill-in { animation: am-pill-in 0.3s ease-out backwards; }
.am-fade { animation: am-fade 0.15s ease-out backwards; }
.am-ping { animation: am-ping 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
.am-pop { animation: am-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) backwards; }
.am-roll-in { animation: am-roll-in 0.3s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
.am-roll-out { animation: am-roll-out 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
.am-wash-ask { animation: am-wash 2.6s linear both; transform-origin: 0% 50%; }
.am-grow { animation: am-grow 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.35s backwards; }
.am-shimmer { animation: am-shimmer 4s ease-in-out 0.9s infinite; }

.am-ic svg { overflow: visible; }
.am-ic path, .am-ic circle, .am-ic polyline, .am-ic line { transform-box: fill-box; transform-origin: center; }
.am-i-check path, .am-i-user circle, .am-i-user path, .am-i-zap path { stroke-dasharray: 1; stroke-dashoffset: 0; }
.am-i-check[data-play="true"] path { animation: am-draw 0.4s both; }
.am-i-user[data-play="true"] circle { animation: am-draw 0.4s both; }
.am-i-user[data-play="true"] path { animation: am-draw-flat 0.4s 0.2s both; }
.am-i-zap[data-play="true"] path { animation: am-draw-flat 0.6s both; }
.am-i-chev[data-play="true"] path { animation: am-bob 0.5s; }
.am-i-logout[data-play="true"] .am-go { animation: am-nudge 0.4s; }
.am-i-plus svg { transition: transform 0.6s cubic-bezier(0.34, 1.3, 0.64, 1); }
.am-i-plus[data-play="true"] svg { transform: rotate(180deg); }
.am-i-settings svg { transition: transform 1.2s cubic-bezier(0.34, 1.4, 0.64, 1); }
.am-i-settings[data-play="true"] svg { transform: rotate(180deg); }
.am-i-sparkles .am-sp { transition: fill 0.3s; }
.am-i-sparkles[data-play="true"] .am-sp { fill: currentColor; animation: am-hop 1s; }
.am-i-sparkles[data-play="true"] .am-st { animation: am-blink 2s 1s; }

@media (prefers-reduced-motion: reduce) {
  .am-item, .am-pill-in, .am-fade, .am-ping, .am-pop, .am-roll-in, .am-roll-out, .am-wash-ask, .am-grow, .am-shimmer,
  .am-ic *, .am-ic { animation: none !important; transition: none !important; }
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

const FLIP_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * After every commit, glide any `[data-flip]` element from where it was to
 * where it is now (a shared-element move). `[data-flip-size]` elements animate
 * their width and height instead, with `[data-flip-body]` held at its final
 * width so the content never reflows mid-way.
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
      const moved = Math.abs(a.x - b.x) + Math.abs(a.y - b.y) > 0.5;
      const resized = Math.abs(a.w - b.w) + Math.abs(a.h - b.h) > 0.5;
      if (!moved && !resized) return;
      el.getAnimations()
        .filter((n) => n.id === "am-flip")
        .forEach((n) => n.cancel());
      if (el.hasAttribute("data-flip-size")) {
        const body = el.querySelector<HTMLElement>("[data-flip-body]");
        if (body) body.style.minWidth = `${b.w - (el.offsetWidth - el.clientWidth)}px`;
        const run = el.animate(
          [
            { width: `${a.w}px`, height: `${a.h}px` },
            { width: `${b.w}px`, height: `${b.h}px` },
          ],
          { duration: 380, easing: FLIP_EASE },
        );
        run.id = "am-flip";
        const done = () => {
          if (body) body.style.minWidth = "";
        };
        run.onfinish = done;
        run.oncancel = done;
        return;
      }
      const run = el.animate(
        [
          {
            transformOrigin: "0 0",
            transform: `translate(${a.x - b.x}px, ${a.y - b.y}px) scale(${a.w / (b.w || 1)}, ${a.h / (b.h || 1)})`,
          },
          { transformOrigin: "0 0", transform: "none" },
        ],
        { duration: 360, easing: FLIP_EASE },
      );
      run.id = "am-flip";
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
 * holds it) or while `active`. The motion itself lives in the CSS above,
 * keyed by `cls` and by `data-play`.
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
          "am-ic inline-grid size-6 shrink-0 place-items-center align-middle [&>svg]:size-full",
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

const CheckIcon = makeIcon("CheckIcon", "am-i-check", <path d="M4 12 9 17L20 6" pathLength={1} />);

const ChevronDownIcon = makeIcon("ChevronDownIcon", "am-i-chev", <path d="m6 9 6 6 6-6" />);

const LogoutIcon = makeIcon(
  "LogoutIcon",
  "am-i-logout",
  <>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline className="am-go" points="16 17 21 12 16 7" />
    <line className="am-go" x1="21" x2="9" y1="12" y2="12" />
  </>,
);

const PlusIcon = makeIcon(
  "PlusIcon",
  "am-i-plus",
  <>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </>,
);

const SettingsIcon = makeIcon(
  "SettingsIcon",
  "am-i-settings",
  <>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </>,
);

const SparklesIcon = makeIcon(
  "SparklesIcon",
  "am-i-sparkles",
  <>
    <path className="am-sp" d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path className="am-st" d="M20 3v4" />
    <path className="am-st" d="M22 5h-4" />
    <path className="am-st" d="M4 17v2" />
    <path className="am-st" d="M5 18H3" />
  </>,
);

const UserIcon = makeIcon(
  "UserIcon",
  "am-i-user",
  <>
    <circle cx="12" cy="8" r="5" pathLength={1} />
    <path d="M20 21a8 8 0 0 0-16 0" pathLength={1} />
  </>,
);

const ZapIcon = makeIcon(
  "ZapIcon",
  "am-i-zap",
  <path
    d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
    pathLength={1}
  />,
);

export type AccountStatus = "online" | "focus" | "away" | "hidden";

export interface AccountWorkspace {
  id: string;
  name: string;
  /** A short line under the name, like the plan. */
  plan: string;
  /** Background of the workspace's letter tile. */
  color?: string;
}

export interface AccountMenuProps {
  name?: string;
  /** A short line under the name, like a handle. */
  handle?: string;
  avatar?: string;
  /** Controls whether the expanded account modal starts open. Default `true`. */
  showModal?: boolean;
  /** Controls whether the storage meter is shown. Default `false`. */
  showStorage?: boolean;
  defaultStatus?: AccountStatus;
  onStatusChange?: (status: AccountStatus) => void;
  workspaces?: AccountWorkspace[];
  defaultWorkspace?: string;
  onWorkspaceChange?: (id: string) => void;
  /** Used and total storage in GB. Default `[6.4, 10]`. */
  storage?: [number, number] | null;
  onUpgrade?: () => void;
  onProfile?: () => void;
  onSettings?: () => void;
  onShortcuts?: () => void;
  onNewWorkspace?: () => void;
  onSignOut?: () => void;
  className?: string;
}

const STATUS: Record<
  AccountStatus,
  { label: string; line: string; color: string }
> = {
  online: { label: "Online", line: "Available", color: "#269a5a" },
  focus: { label: "Focus", line: "Notifications paused", color: "#5b5bff" },
  away: { label: "Away", line: "Back soon", color: "#e8a317" },
  hidden: { label: "Hidden", line: "Appears offline", color: "#a1a19b" },
};
const ORDER: AccountStatus[] = ["online", "focus", "away", "hidden"];

const DEFAULT_WORKSPACES: AccountWorkspace[] = [
  {
    id: "avara",
    name: "Avara Studio",
    plan: "Pro plan, 12 members",
    color: "#242423",
  },
  {
    id: "acme",
    name: "Acme Labs",
    plan: "Free plan, 3 members",
    color: "#8a8a85",
  },
];


const at = (i: number) => ({ "--i": i }) as React.CSSProperties;

/** A line of text that rolls up into its replacement when `value` changes. */
function Roll({ value, className }: { value: string; className?: string }) {
  const [pair, setPair] = React.useState<{ cur: string; prev: string | null }>({
    cur: value,
    prev: null,
  });
  if (pair.cur !== value) setPair({ cur: value, prev: pair.cur });
  React.useEffect(() => {
    if (pair.prev === null) return;
    const t = window.setTimeout(
      () => setPair((p) => ({ ...p, prev: null })),
      300,
    );
    return () => window.clearTimeout(t);
  }, [pair.prev, pair.cur]);
  return (
    <span className={cn("relative inline-grid overflow-hidden", className)}>
      <span
        key={pair.cur}
        className={cn("col-start-1 row-start-1", pair.prev !== null && "am-roll-in")}
      >
        {pair.cur}
      </span>
      {pair.prev !== null && (
        <span
          key={`out-${pair.prev}`}
          aria-hidden
          className="am-roll-out col-start-1 row-start-1"
        >
          {pair.prev}
        </span>
      )}
    </span>
  );
}

function Avatar({
  src,
  status,
  size,
}: {
  src: string;
  status: AccountStatus;
  size: number;
}) {
  const color = STATUS[status].color;
  const dot = Math.round(size * 0.3);
  const seen = React.useRef(status);
  const [pings, setPings] = React.useState(0);
  React.useEffect(() => {
    if (seen.current === status) return;
    seen.current = status;
    setPings((n) => n + 1);
  }, [status]);
  return (
    <span
      data-flip="avatar"
      className="relative block shrink-0"
      style={{ width: size, height: size }}
    >
      <img
        src={src}
        alt=""
        draggable={false}
        className="size-full rounded-full object-cover"
      />
      <span
        className="absolute -bottom-px -right-px grid place-items-center"
        style={{ width: dot, height: dot }}
      >
        {pings > 0 && (
          <span
            key={pings}
            aria-hidden
            className="am-ping absolute inset-0 rounded-full"
            style={{ backgroundColor: color }}
          />
        )}
        <span
          key={`dot-${status}`}
          className="am-pop relative size-full rounded-full ring-2 ring-white transition-colors duration-300 dark:ring-zinc-900"
          style={{ backgroundColor: color }}
        />
      </span>
    </span>
  );
}

export const AccountMenu = React.forwardRef<HTMLDivElement, AccountMenuProps>(
  function AccountMenu(
    {
      name = "John Doe",
      handle = "@johndoe",
      avatar = "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_200,h_200,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg",
      showModal = true,
      showStorage = false,
      defaultStatus = "online",
      onStatusChange,
      workspaces = DEFAULT_WORKSPACES,
      defaultWorkspace,
      onWorkspaceChange,
      storage = [6.4, 10],
      onUpgrade,
      onProfile,
      onSettings,
      onShortcuts,
      onNewWorkspace,
      onSignOut,
      className,
    },
    ref,
  ) {
    const still = useStill();
    const root = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => root.current!);
    useFlip(root, still);
    const pill = React.useRef<HTMLButtonElement>(null);
    const card = React.useRef<HTMLDivElement>(null);
    const [open, setOpen] = React.useState(showModal);
    const [status, setStatus] = React.useState<AccountStatus>(defaultStatus);
    const [space, setSpace] = React.useState(
      defaultWorkspace ?? workspaces[0]?.id ?? "",
    );
    const [hover, setHover] = React.useState<string | null>(null);
    const [leaving, setLeaving] = React.useState<"ask" | "done" | null>(null);
    const byKeyboard = React.useRef(false);

    React.useEffect(() => {
      setOpen(showModal);
    }, [showModal]);

    const close = React.useCallback(() => {
      setOpen(false);
      setHover(null);
      setLeaving(null);
      requestAnimationFrame(() => pill.current?.focus({ preventScroll: true }));
    }, []);

    React.useEffect(() => {
      if (!open || !byKeyboard.current) return;
      byKeyboard.current = false;
      const t = window.setTimeout(
        () =>
          card.current
            ?.querySelector<HTMLElement>("[role=radio][aria-checked=true]")
            ?.focus(),
        still ? 0 : 260,
      );
      return () => window.clearTimeout(t);
    }, [open, still]);

    React.useEffect(() => {
      if (leaving !== "ask") return;
      const t = window.setTimeout(() => setLeaving(null), 2600);
      return () => window.clearTimeout(t);
    }, [leaving]);

    const signOut = () => {
      if (leaving === null) return setLeaving("ask");
      if (leaving === "done") return;
      setLeaving("done");
      onSignOut?.();
      window.setTimeout(close, still ? 400 : 1100);
    };

    const onKey = (e: React.KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        e.stopPropagation();
        close();
        return;
      }
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      const items = Array.from(
        card.current?.querySelectorAll<HTMLElement>("[data-item]") ?? [],
      );
      if (!items.length) return;
      e.preventDefault();
      const idx = items.indexOf(document.activeElement as HTMLElement);
      const next =
        e.key === "ArrowDown"
          ? (idx + 1) % items.length
          : (idx - 1 + items.length) % items.length;
      items[idx < 0 ? 0 : next]?.focus();
    };

    const glide = (key: string) =>
      hover === key && (
        <span
          data-flip="glide"
          className="am-fade absolute inset-0 rounded-xl bg-[#242423]/[0.05] dark:bg-white/[0.08]"
        />
      );

    const tiles = [
      { key: "profile", label: "Profile", Icon: UserIcon, on: onProfile },
      {
        key: "settings",
        label: "Settings",
        Icon: SettingsIcon,
        on: onSettings,
      },
      {
        key: "shortcuts",
        label: "Shortcuts",
        Icon: ZapIcon,
        on: onShortcuts,
        kbd: "?",
      },
    ];

    const used = storage ? Math.min(1, storage[0] / storage[1]) : 0;
    const after = 7 + workspaces.length; // index of the first item below the workspaces

    return (
      <div
        ref={root}
        onKeyDown={onKey}
        className={cn("relative w-[380px] max-w-full", className)}
      >
        <style>{ACCOUNT_MENU_CSS}</style>
        <div className="flex justify-center">
          <div
            data-flip="shell"
            data-flip-size=""
            className={cn(
              "overflow-hidden bg-white text-[#242423] border border-black/[0.08] shadow-[0_0_12px_rgba(0,0,0,0.06)] transition-[border-radius] duration-300 dark:bg-zinc-900 dark:text-zinc-100 dark:border-white/[0.1] dark:shadow-[0_0_12px_rgba(0,0,0,0.28)]",
              open ? "w-full rounded-2xl" : "w-auto rounded-[24px]",
            )}
          >
            {!open ? (
              <button
                key="pill"
                ref={pill}
                type="button"
                aria-haspopup="menu"
                aria-expanded={false}
                onClick={(e) => {
                  byKeyboard.current = e.detail === 0;
                  setOpen(true);
                }}
                className="am-pill-in group flex h-12 cursor-pointer items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-3.5 outline-none transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-[#242423]/30 motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.96] dark:focus-visible:ring-white/30"
              >
                <Avatar src={avatar} status={status} size={36} />
                <span data-flip="name" className="text-[14px] font-semibold">
                  {name}
                </span>
                <span className="grid text-[#242423]/45 transition-transform duration-300 group-hover:translate-y-px dark:text-zinc-400">
                  <ChevronDownIcon className="size-4" strokeWidth={2.25} />
                </span>
              </button>
            ) : (
              <div
                key="card"
                ref={card}
                data-flip-body=""
                role="menu"
                aria-label={`${name} account`}
                onPointerLeave={() => setHover(null)}
                className="w-full p-2"
              >
                {/* Header band */}
                <div className="rounded-xl bg-[#f1f1ef] p-3 dark:bg-zinc-800/80">
                  <div className="flex items-center gap-3">
                    <Avatar src={avatar} status={status} size={48} />
                    <div className="min-w-0 flex-1">
                      <p
                        data-flip="name"
                        className="w-fit truncate text-[16px] font-semibold leading-6"
                      >
                        {name}
                      </p>
                      <p
                        style={at(0)}
                        className="am-item flex items-center gap-1.5 text-[12px] leading-4 text-[#242423]/55 dark:text-zinc-400"
                      >
                        <span className="truncate">{handle}</span>
                        <span aria-hidden>·</span>
                        <Roll value={STATUS[status].line} />
                      </p>
                    </div>
                    <button
                      style={at(1)}
                      type="button"
                      aria-label="Collapse menu"
                      onClick={close}
                      className="am-item group grid size-8 shrink-0 cursor-pointer place-items-center self-start rounded-full text-[#242423]/50 outline-none transition-[color,background-color,transform] hover:bg-white hover:text-[#242423] focus-visible:ring-2 focus-visible:ring-[#242423]/30 motion-safe:active:scale-[0.88] dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
                    >
                      <span className="grid rotate-180">
                        <ChevronDownIcon className="size-4" strokeWidth={2.25} />
                      </span>
                    </button>
                  </div>

                  {/* Status picker */}
                  <div
                    style={at(2)}
                    role="radiogroup"
                    aria-label="Status"
                    className="am-item mt-3 grid grid-cols-4 rounded-full bg-[#242423]/[0.05] p-0.5 dark:bg-black/25"
                  >
                    {ORDER.map((s) => {
                      const on = status === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          role="radio"
                          aria-checked={on}
                          data-item=""
                          onClick={() => {
                            setStatus(s);
                            onStatusChange?.(s);
                          }}
                          className={cn(
                            "relative flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-full text-[12px] font-medium outline-none transition-[color,transform] focus-visible:ring-2 focus-visible:ring-[#242423]/30 motion-safe:active:scale-[0.92]",
                            on
                              ? "text-[#242423] dark:text-zinc-100"
                              : "text-[#242423]/55 hover:text-[#242423] dark:text-zinc-400 dark:hover:text-zinc-200",
                          )}
                        >
                          {on && (
                            <span
                              data-flip="status"
                              className="absolute inset-0 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08)] dark:bg-zinc-700"
                            />
                          )}
                          <span
                            className={cn(
                              "relative size-1.5 rounded-full transition-transform duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]",
                              on && "scale-125",
                            )}
                            style={{ backgroundColor: STATUS[s].color }}
                          />
                          <span className="relative">{STATUS[s].label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quick tiles */}
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {tiles.map(({ key, label, Icon, on, kbd }, i) => (
                    <button
                      key={key}
                      style={at(3 + i)}
                      type="button"
                      role="menuitem"
                      data-item=""
                      onClick={on}
                      className="am-item group relative flex h-[76px] cursor-pointer flex-col justify-between rounded-xl bg-[#242423]/[0.04] p-3 text-left outline-none transition-[background-color,transform] duration-200 hover:bg-[#242423]/[0.07] focus-visible:ring-2 focus-visible:ring-[#242423]/30 motion-safe:hover:-translate-y-[3px] motion-safe:active:scale-[0.94] dark:bg-white/[0.05] dark:hover:bg-white/[0.09]"
                    >
                      <span className="flex items-start justify-between">
                        <Icon className="size-[18px] text-[#242423]/70 transition-colors group-hover:text-[#242423] dark:text-zinc-300 dark:group-hover:text-white" />
                        {kbd && (
                          <span className="grid h-5 min-w-5 place-items-center rounded-md bg-white px-1 text-[12px] font-medium text-[#242423]/50 shadow-[0_1px_0_rgba(36,36,35,0.08)] dark:bg-zinc-800 dark:text-zinc-400">
                            {kbd}
                          </span>
                        )}
                      </span>
                      <span className="text-[12px] font-medium">{label}</span>
                    </button>
                  ))}
                </div>

                {/* Workspaces */}
                <p
                  style={at(6)}
                  className="am-item px-3 pb-1 pt-3 text-[12px] font-medium text-[#242423]/45 dark:text-zinc-400"
                >
                  Workspaces
                </p>
                {workspaces.map((w, i) => {
                  const on = w.id === space;
                  const key = `ws-${w.id}`;
                  return (
                    <button
                      key={w.id}
                      style={at(7 + i)}
                      type="button"
                      role="menuitemradio"
                      aria-checked={on}
                      data-item=""
                      onPointerEnter={() => setHover(key)}
                      onFocus={() => setHover(key)}
                      onClick={() => {
                        setSpace(w.id);
                        onWorkspaceChange?.(w.id);
                      }}
                      className="am-item group relative flex h-12 w-full cursor-pointer items-center gap-3 rounded-xl px-2 text-left outline-none transition-transform focus-visible:ring-2 focus-visible:ring-[#242423]/30 motion-safe:active:scale-[0.98]"
                    >
                      {glide(key)}
                      <span
                        className={cn(
                          "relative grid size-8 shrink-0 place-items-center rounded-lg text-[14px] font-semibold text-white transition-transform duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]",
                          hover === key && "motion-safe:-rotate-6 motion-safe:scale-[1.06]",
                        )}
                        style={{ backgroundColor: w.color ?? "#242423" }}
                      >
                        {w.name[0]}
                      </span>
                      <span className="relative min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-medium leading-5">
                          {w.name}
                        </span>
                        <span className="block truncate text-[12px] leading-4 text-[#242423]/50 dark:text-zinc-400">
                          {w.plan}
                        </span>
                      </span>
                      <span className="relative grid size-5 place-items-center">
                        {on && (
                          <span
                            data-flip="ws-check"
                            className="grid size-5 place-items-center rounded-full bg-[#242423] text-white dark:bg-zinc-100 dark:text-zinc-900"
                          >
                            <CheckIcon
                              className="size-3"
                              strokeWidth={2.75}
                              active
                            />
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
                <button
                  style={at(after)}
                  type="button"
                  role="menuitem"
                  data-item=""
                  onPointerEnter={() => setHover("new")}
                  onFocus={() => setHover("new")}
                  onClick={onNewWorkspace}
                  className="am-item group relative flex h-11 w-full cursor-pointer items-center gap-3 rounded-xl px-2 text-left text-[14px] font-medium text-[#242423]/70 outline-none transition-[color,transform] hover:text-[#242423] focus-visible:ring-2 focus-visible:ring-[#242423]/30 motion-safe:active:scale-[0.98] dark:text-zinc-300 dark:hover:text-white"
                >
                  {glide("new")}
                  <span className="relative grid size-8 place-items-center rounded-lg border border-dashed border-[#242423]/25 transition-colors group-hover:border-[#242423]/50 dark:border-white/20 dark:group-hover:border-white/40">
                    <PlusIcon className="size-4" strokeWidth={2.25} />
                  </span>
                  <span className="relative">New workspace</span>
                </button>

                {/* Storage */}
                {showStorage && storage && (
                  <div
                    style={at(after + 1)}
                    className="am-item mx-1 mt-2 rounded-xl bg-[#242423]/[0.04] p-3 dark:bg-white/[0.05]"
                  >
                    <div className="flex items-baseline justify-between text-[12px]">
                      <span className="font-medium">Storage</span>
                      <span className="tabular-nums text-[#242423]/55 dark:text-zinc-400">
                        {storage[0]} of {storage[1]} GB
                      </span>
                    </div>
                    <div className="relative mt-2 h-1.5 overflow-hidden rounded-full bg-[#242423]/[0.08] dark:bg-white/[0.1]">
                      <div
                        className="am-grow relative h-full overflow-hidden rounded-full bg-[#242423] dark:bg-zinc-100"
                        style={{ width: `${used * 100}%` }}
                      >
                        <span
                          aria-hidden
                          className="am-shimmer absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      data-item=""
                      onClick={onUpgrade}
                      className="group mt-2.5 flex cursor-pointer items-center gap-1.5 rounded-full text-[12px] font-medium text-[#242423]/70 outline-none transition-colors hover:text-[#242423] focus-visible:ring-2 focus-visible:ring-[#242423]/30 dark:text-zinc-300 dark:hover:text-white"
                    >
                      <SparklesIcon className="size-3.5" />
                      Upgrade for 100 GB
                      <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                        →
                      </span>
                    </button>
                  </div>
                )}

                {/* Log out, asked twice */}
                <div
                  style={at(after + 2)}
                  aria-hidden
                  className="am-item mx-1 my-2 h-px bg-[#242423]/[0.07] dark:bg-white/[0.08]"
                />
                <button
                  style={at(after + 3)}
                  type="button"
                  role="menuitem"
                  data-item=""
                  onPointerEnter={() => setHover("out")}
                  onFocus={() => setHover("out")}
                  onClick={signOut}
                  className={cn(
                    "am-item group relative flex h-11 w-full cursor-pointer items-center gap-3 overflow-hidden rounded-xl px-3 text-left text-[14px] font-medium outline-none transition-transform focus-visible:ring-2 focus-visible:ring-[#242423]/30 motion-safe:active:scale-[0.98]",
                    leaving ? "text-[#d64545]" : "text-[#242423] dark:text-zinc-100",
                  )}
                >
                  {!leaving && glide("out")}
                  {leaving && (
                    <span
                      key={leaving}
                      aria-hidden
                      className={cn(
                        "absolute inset-0 rounded-xl bg-[#d64545]/[0.09]",
                        leaving === "ask" && "am-wash-ask",
                      )}
                    />
                  )}
                  <span className="relative grid">
                    {leaving === "done" ? (
                      <CheckIcon
                        className="size-[18px]"
                        strokeWidth={2.5}
                        active
                      />
                    ) : (
                      <LogoutIcon
                        className="size-[18px]"
                        active={hover === "out" || leaving === "ask"}
                      />
                    )}
                  </span>
                  <Roll
                    value={
                      leaving === "done"
                        ? "Signed out"
                        : leaving === "ask"
                          ? "Click again to log out"
                          : "Log out"
                    }
                    className="relative"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
        <span role="status" aria-live="polite" className="sr-only">
          {leaving === "done"
            ? "Signed out."
            : `Status: ${STATUS[status].label}.`}
        </span>
      </div>
    );
  },
);

export default AccountMenu;
