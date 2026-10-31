"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { accentTokens } from "@/lib/accent";
import Button, { type ButtonVariant } from "./Button";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupTooltip,
  AvatarImage,
  type StackAvatar,
} from "./AvatarStackBlock";

/* ═══════════════════════════════════════════════
   TYPES & INTERFACES
   ═══════════════════════════════════════════════ */

export interface SolarSnapshotItem {
  id: string;
  shotNumber: number;
  sunX: number; // 0 to 100 (%)
  sunY: number; // 0 to 100 (%)
  timestamp: string; // e.g. "14:22"
  rotation: number; // Polaroid tilt angle in degrees
  offsetX: number; // Subtle horizontal stack offset in px
  offsetY: number; // Subtle vertical stack offset in px
  isCompact: boolean; // True when captured on a small screen (< 640px)
  createdAt: number;
}

export interface SolarSnapshotHeroProps
  extends React.HTMLAttributes<HTMLElement> {
  badgeText?: string;
  badgeTag?: string;
  title?: string;
  titleAccent?: string;
  description?: string;
  primaryActionLabel?: string;
  primaryActionHref?: string;
  primaryButtonVariant?: ButtonVariant;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
  secondaryButtonVariant?: ButtonVariant;
  avatars?: (string | StackAvatar)[];
  trustText?: string;
  rating?: number;
  snapshotDurationMs?: number;
  maxSnapshots?: number;
  accent?: string;
  linkComponent?: React.ElementType;
}

/* ═══════════════════════════════════════════════
   DEFAULT CLOUDINARY AVATARS
   ═══════════════════════════════════════════════ */

export const DEFAULT_SOLAR_AVATARS: StackAvatar[] = [
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790145139/pexels-photo-1036623-1790145143487.jpg",
    alt: "Elena Vance",
    name: "Elena Vance",
    role: "Creative Director",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790145142/pexels-photo-2043590-1790145143488.jpg",
    alt: "Marcus Chen",
    name: "Marcus Chen",
    role: "Visual Architect",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790145139/pexels-photo-1587009-1790145143488.jpg",
    alt: "Sarah Jenkins",
    name: "Sarah Jenkins",
    role: "Lighting Designer",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790082180/pexels-photo-1520760-1790082180553.jpg",
    alt: "David Miller",
    name: "David Miller",
    role: "Optical Engineer",
  },
];

const POLAROID_ROTATIONS = [-4.2, 3.0, -2.2, 4.5, -3.4, 2.0, -4.8, 3.5];
const POLAROID_OFFSETS_X = [-6, 5, -3, 7, -5, 4, -7, 6];
const POLAROID_OFFSETS_Y = [2, -2, 2, -3, 2, -2, 3, -2];

function formatCurrentTime(): string {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

/* ═══════════════════════════════════════════════
   RADIANT SOLAR ORB GRAPHIC (REALISTIC SUN + LENS FLARE RAYS)
   ═══════════════════════════════════════════════ */

function RadiantSunGraphic({ size = "lg" }: { size?: "sm" | "lg" }) {
  const isSmall = size === "sm";
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer Soft Solar Atmosphere */}
      <span
        className={cn(
          "absolute rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.42)_0%,rgba(249,115,22,0.16)_45%,transparent_72%)] blur-xl",
          isSmall ? "size-20" : "size-36"
        )}
      />
      {/* Concentric Lens Halo Ring */}
      <span
        className={cn(
          "absolute rounded-full border border-amber-300/35 bg-amber-300/10",
          isSmall ? "size-11" : "size-20"
        )}
      />
      {/* Horizontal & Vertical Solar Flare Rays */}
      <span
        className={cn(
          "absolute h-[1.5px] bg-gradient-to-r from-transparent via-amber-200/90 to-transparent",
          isSmall ? "w-16" : "w-28"
        )}
      />
      <span
        className={cn(
          "absolute w-[1.5px] bg-gradient-to-b from-transparent via-amber-200/90 to-transparent",
          isSmall ? "h-16" : "h-28"
        )}
      />
      {/* Diagonal Soft Starburst Rays */}
      <span
        className={cn(
          "absolute rotate-45 h-[1px] bg-gradient-to-r from-transparent via-amber-300/70 to-transparent",
          isSmall ? "w-11" : "w-18"
        )}
      />
      <span
        className={cn(
          "absolute -rotate-45 h-[1px] bg-gradient-to-r from-transparent via-amber-300/70 to-transparent",
          isSmall ? "w-11" : "w-18"
        )}
      />
      {/* Molten Glowing Sun Disc */}
      <span
        className={cn(
          "relative rounded-full bg-[radial-gradient(circle,#FFFFFF_0%,#FEF08A_40%,#F59E0B_78%,#EA580C_100%)] shadow-[0_0_30px_8px_rgba(251,191,36,0.75),0_0_60px_16px_rgba(249,115,22,0.35)]",
          isSmall ? "size-5" : "size-8"
        )}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   POLAROID SNAPSHOT CARD
   RENDERS AN EXACT MINIATURE SCREENSHOT OF THIS HERO SECTION
   WITH THE SUN FROZEN AT THE CLICKED (sunX, sunY) POSITION
   ═══════════════════════════════════════════════ */

interface PolaroidCardProps {
  shot: SolarSnapshotItem;
  stackIndex: number;
  durationMs: number;
  trustText?: string;
  title?: string;
  titleAccent?: string;
  description?: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  avatars: StackAvatar[];
  rating: number;
}

function PolaroidSnapshotCard({
  shot,
  stackIndex,
  durationMs,
  trustText,
  title,
  titleAccent,
  description,
  primaryActionLabel,
  secondaryActionLabel,
  avatars,
  rating,
}: PolaroidCardProps) {
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const enterRaf = requestAnimationFrame(() => setMounted(true));
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, Math.max(durationMs - 400, 100));

    return () => {
      cancelAnimationFrame(enterRaf);
      clearTimeout(exitTimer);
    };
  }, [durationMs]);

  return (
    <div
      style={{
        zIndex: 20 + stackIndex,
        transform: mounted
          ? exiting
            ? `translate3d(${shot.offsetX}px, ${shot.offsetY + 18}px, 0) rotate(${shot.rotation * 1.1}deg) scale(0.88)`
            : `translate3d(${shot.offsetX}px, ${shot.offsetY}px, 0) rotate(${shot.rotation}deg) scale(1)`
          : `translate3d(0px, -20px, 0) rotate(0deg) scale(1.08)`,
        opacity: mounted ? (exiting ? 0 : 1) : 0,
      }}
      className="pointer-events-none absolute bottom-0 right-0 w-[195px] sm:w-[236px] rounded-xl bg-card/95 dark:bg-card/90 p-2 sm:p-2.5 pb-4 sm:pb-5 border border-border/60 shadow-[0_4px_14px_-4px_rgba(0,0,0,0.06),0_1px_4px_-1px_rgba(0,0,0,0.03)] backdrop-blur-md transition-all duration-350 ease-out select-none"
    >
      {/* Inner Captured Section Screenshot Window */}
      <div className="relative h-[118px] sm:h-[136px] w-full overflow-hidden rounded-lg border border-border/40 bg-background text-foreground">
        {/* Scaled-down 1:1 Live Replica of Our Hero Section (Responsive to Small vs Large Screen Capture) */}
        <div
          style={
            shot.isCompact
              ? {
                  width: "390px",
                  height: "280px",
                  transform: "scale(0.455)",
                  transformOrigin: "top left",
                }
              : {
                  width: "800px",
                  height: "460px",
                  transform: "scale(0.295)",
                  transformOrigin: "top left",
                }
          }
          className={cn(
            "relative overflow-hidden bg-background text-foreground flex flex-col items-center justify-center text-center",
            shot.isCompact ? "px-5 py-3" : "px-10"
          )}
        >
          {/* Full-Section Subtle Dot Matrix Backdrop */}
          <div
            className="
              absolute inset-0 opacity-[0.11] dark:opacity-[0.12]
              bg-[radial-gradient(circle_at_center,currentColor_1px,transparent_1px)]
              [background-size:24px_24px]
              [mask-image:radial-gradient(ellipse_96%_92%_at_50%_50%,black_75%,transparent_100%)]
            "
          />

          {/* Captured Ambient Sun Illumination at Clicked Position */}
          <div
            style={{
              background: `radial-gradient(${shot.isCompact ? "240px" : "380px"} circle at ${shot.sunX}% ${shot.sunY}%, rgba(251, 191, 36, 0.25), rgba(249, 115, 22, 0.08) 48%, transparent 78%)`,
            }}
            className="absolute inset-0"
          />

          {/* THE CAPTURED SUN AT EXACT CLICKED (sunX, sunY) COORDINATES (BEHIND CONTENT) */}
          <div
            style={{
              left: `${shot.sunX}%`,
              top: `${shot.sunY}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <RadiantSunGraphic size="sm" />
          </div>

          {/* Section Content Replica inside Screenshot (ABOVE SUN) */}
          <div
            className={cn(
              "relative z-20 flex flex-col items-center",
              shot.isCompact ? "w-full max-w-[340px]" : "max-w-2xl"
            )}
          >
            {/* Top Unified Avatar + Rating Pill (Avatars only on small view, full pill on large view) */}
            <div
              className={cn(
                "inline-flex items-center rounded-full border border-border/70 bg-card/85",
                shot.isCompact ? "mb-2.5 p-1" : "mb-5 gap-3 p-1.5 pr-4"
              )}
            >
              <div className="flex -space-x-2">
                {avatars.slice(0, 4).map((av, i) => (
                  <img
                    key={i}
                    src={av.src}
                    alt={av.alt ?? ""}
                    className={cn(
                      "rounded-full border-2 border-background object-cover",
                      shot.isCompact ? "size-4.5" : "size-6"
                    )}
                  />
                ))}
              </div>
              {!shot.isCompact && (
                <>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="size-2.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  {trustText && (
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {trustText}
                    </span>
                  )}
                </>
              )}
            </div>

            <div
              style={{
                fontFamily:
                  '"Space Grotesk", "Plus Jakarta Sans", var(--font-sans), system-ui, sans-serif',
              }}
              className={cn(
                "font-extrabold tracking-[-0.04em] text-foreground leading-[1.12]",
                shot.isCompact ? "text-[1.35rem]" : "text-[2.6rem]"
              )}
            >
              <span className="block">{title}</span>
              {titleAccent && (
                <span
                  className={cn(
                    "relative inline-flex items-center justify-center rounded-xl border border-primary/35 bg-primary/[0.08] text-primary",
                    shot.isCompact
                      ? "mt-1.5 px-2.5 py-0.5"
                      : "mt-2 px-4 py-1"
                  )}
                >
                  {/* Corner bracket ticks */}
                  <span className="absolute -top-1 -left-1 size-2 border-t-2 border-l-2 border-primary" />
                  <span className="absolute -top-1 -right-1 size-2 border-t-2 border-r-2 border-primary" />
                  <span className="absolute -bottom-1 -left-1 size-2 border-b-2 border-l-2 border-primary" />
                  <span className="absolute -bottom-1 -right-1 size-2 border-b-2 border-r-2 border-primary" />
                  <span className="bg-gradient-to-r from-primary via-amber-500 to-orange-500 bg-clip-text text-transparent">
                    {titleAccent}
                  </span>
                </span>
              )}
            </div>

            {description && (
              <div
                className={cn(
                  "rounded-xl border border-border/60 bg-muted/30 text-muted-foreground line-clamp-2",
                  shot.isCompact
                    ? "mt-2 max-w-[310px] px-2.5 py-1 text-[9px]"
                    : "mt-4 max-w-lg px-4 py-2 text-xs"
                )}
              >
                {description}
              </div>
            )}

            {/* Mini Buttons: Stacked full-width in small view, side-by-side in large view */}
            <div
              className={cn(
                "flex items-center",
                shot.isCompact
                  ? "mt-2.5 flex-col gap-1.5 w-full max-w-[260px]"
                  : "mt-5 flex-row gap-3"
              )}
            >
              {primaryActionLabel && (
                <span
                  className={cn(
                    "rounded-lg bg-primary font-semibold text-primary-foreground inline-flex items-center justify-center gap-1.5",
                    shot.isCompact
                      ? "w-full py-1.5 px-3 text-[9.5px]"
                      : "px-5 py-2 text-xs"
                  )}
                >
                  {primaryActionLabel}
                  <span>→</span>
                </span>
              )}
              {secondaryActionLabel && (
                <span
                  className={cn(
                    "rounded-lg border border-border bg-muted/60 font-semibold text-foreground inline-flex items-center justify-center gap-1.5",
                    shot.isCompact
                      ? "w-full py-1.5 px-3 text-[9.5px]"
                      : "px-5 py-2 text-xs"
                  )}
                >
                  {secondaryActionLabel}
                  <span>→</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Polaroid Bottom Caption Strip: Timestamp + Shot Number */}
      <div className="mt-1.5 flex items-center justify-between px-1 font-mono text-[10px] sm:text-[11px] font-medium tracking-wider text-muted-foreground">
        <span>{shot.timestamp}</span>
        <span className="text-primary/80 font-semibold">
          #{String(shot.shotNumber).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT: SolarSnapshotHero
   ═══════════════════════════════════════════════ */

export const SolarSnapshotHero = forwardRef<HTMLElement, SolarSnapshotHeroProps>(
  (
    {
      badgeText,
      badgeTag,
      title = "Where natural light meets",
      titleAccent = "expressive digital craft.",
      description = "Guide the radiant sun across the canvas with your cursor and click anywhere to capture an instant live snapshot of the stage.",
      primaryActionLabel = "Initiate Project",
      primaryActionHref = "#explore",
      primaryButtonVariant = "pricing-typographic",
      secondaryActionLabel = "Explore Studio",
      secondaryActionHref = "#lightbox",
      secondaryButtonVariant = "pricing-typographic-muted",
      avatars = DEFAULT_SOLAR_AVATARS,
      trustText = "Trusted by 14,800+ creators",
      rating = 5,
      snapshotDurationMs = 10000,
      maxSnapshots = 8,
      accent,
      linkComponent: LinkComp = "a",
      className,
      style,
      ...props
    },
    ref
  ) => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const sunOrbRef = useRef<HTMLDivElement | null>(null);
    const ambientGlowRef = useRef<HTMLDivElement | null>(null);

    // Cursor position in percentage (0..100) for snapshot capture, stored in ref to avoid re-renders on mousemove
    const sunPosRef = useRef<{ x: number; y: number; clientX: number; clientY: number }>({
      x: 76,
      y: 22,
      clientX: 0,
      clientY: 0,
    });

    const [cursorActive, setCursorActive] = useState(false);
    const [shutterFlash, setShutterFlash] = useState(false);
    const [snapshots, setSnapshots] = useState<SolarSnapshotItem[]>([]);
    const shotCounterRef = useRef(0);
    const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
      new Map()
    );

    // Cleanup all active 10-second snapshot timers on unmount
    useEffect(() => {
      const timers = timersRef.current;
      return () => {
        timers.forEach((timer) => clearTimeout(timer));
        timers.clear();
      };
    }, []);

    // Lightweight pointer tracker (zero React state updates during move)
    const handlePointerMove = useCallback(
      (e: React.PointerEvent<HTMLElement>) => {
        // Freeze the sun when cursor is over avatars or buttons
        const target = e.target as HTMLElement | null;
        if (target?.closest("a, button, [data-no-snapshot]")) {
          return;
        }

        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        const pctX = Math.min(Math.max((relX / rect.width) * 100, 2), 98);
        const pctY = Math.min(Math.max((relY / rect.height) * 100, 2), 98);

        sunPosRef.current = {
          x: pctX,
          y: pctY,
          clientX: relX,
          clientY: relY,
        };

        if (sunOrbRef.current) {
          sunOrbRef.current.style.transform = `translate3d(${relX}px, ${relY}px, 0)`;
        }
        if (ambientGlowRef.current) {
          ambientGlowRef.current.style.background = `radial-gradient(600px circle at ${relX}px ${relY}px, rgba(251, 191, 36, 0.16), rgba(249, 115, 22, 0.05) 45%, transparent 75%)`;
        }
      },
      []
    );

    // Click anywhere in the hero section to capture a live screenshot at the current sun position
    const handleSectionClick = useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        // Do not trigger snapshot if user clicked inside an interactive button or link
        const target = e.target as HTMLElement | null;
        if (target?.closest("a, button, [data-no-snapshot]")) {
          return;
        }

        const el = sectionRef.current;
        let pctX = sunPosRef.current.x;
        let pctY = sunPosRef.current.y;
        let isCompact = false;

        if (el) {
          const rect = el.getBoundingClientRect();
          const relX = e.clientX - rect.left;
          const relY = e.clientY - rect.top;
          pctX = Math.min(Math.max((relX / rect.width) * 100, 5), 95);
          pctY = Math.min(Math.max((relY / rect.height) * 100, 6), 94);
          isCompact = rect.width < 640;
        }

        shotCounterRef.current += 1;
        const num = shotCounterRef.current;
        const id = `shot-${Date.now()}-${num}`;
        const idx = (num - 1) % POLAROID_ROTATIONS.length;

        const newShot: SolarSnapshotItem = {
          id,
          shotNumber: num,
          sunX: Math.round(pctX * 10) / 10,
          sunY: Math.round(pctY * 10) / 10,
          timestamp: formatCurrentTime(),
          rotation: POLAROID_ROTATIONS[idx],
          offsetX: POLAROID_OFFSETS_X[idx],
          offsetY: POLAROID_OFFSETS_Y[idx],
          isCompact,
          createdAt: Date.now(),
        };

        // Trigger camera shutter flash
        setShutterFlash(true);
        setTimeout(() => setShutterFlash(false), 140);

        setSnapshots((prev) => [...prev.slice(-(maxSnapshots - 1)), newShot]);

        // Schedule individual 10-second auto-removal for THIS snapshot
        const timer = setTimeout(() => {
          setSnapshots((current) => current.filter((item) => item.id !== id));
          timersRef.current.delete(id);
        }, snapshotDurationMs);

        timersRef.current.set(id, timer);
      },
      [maxSnapshots, snapshotDurationMs]
    );

    const resolvedAvatars: StackAvatar[] = React.useMemo(
      () =>
        avatars.map((a, index) =>
          typeof a === "string"
            ? {
                src: a,
                alt: `Creator ${index + 1}`,
                name: `Creator ${index + 1}`,
              }
            : a
        ),
      [avatars]
    );

    const customStyle: React.CSSProperties = {
      ...accentTokens(accent),
      ...style,
    };

    return (
      <section
        ref={(node) => {
          sectionRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as any).current = node;
        }}
        onPointerEnter={() => setCursorActive(true)}
        onPointerLeave={() => setCursorActive(false)}
        onPointerMove={handlePointerMove}
        onClick={handleSectionClick}
        style={customStyle}
        className={cn(
          "relative w-full min-h-[680px] sm:min-h-[740px] lg:min-h-[780px] overflow-hidden bg-background text-foreground select-none cursor-crosshair flex items-center justify-center py-20 sm:py-24",
          className
        )}
        {...props}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        `}</style>

        {/* ═════════════════════════════════════════
            1. RADIAL DOT-MATRIX & SOLAR ATMOSPHERE BACKDROP
            ═════════════════════════════════════════ */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Full-section radial dot pattern visible subtly across both small & large screens */}
          <div className="
            absolute inset-0 opacity-[0.11] dark:opacity-[0.12]
            bg-[radial-gradient(circle_at_center,currentColor_1px,transparent_1px)]
            [background-size:24px_24px]
            [mask-image:radial-gradient(ellipse_96%_92%_at_50%_50%,black_75%,transparent_100%)]
          " />

          {/* Soft ambient aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[360px] rounded-full bg-primary/[0.04] blur-[120px]" />

          {/* Dynamic pointer-following ambient sun illumination */}
          <div
            ref={ambientGlowRef}
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(600px circle at 76% 22%, rgba(251, 191, 36, 0.16), rgba(249, 115, 22, 0.05) 45%, transparent 75%)",
            }}
          />
        </div>

        {/* Camera Shutter Flash Overlay on Click */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-40 bg-white dark:bg-amber-100 transition-opacity duration-150",
            shutterFlash ? "opacity-25" : "opacity-0"
          )}
        />

        {/* ═════════════════════════════════════════
            2. RADIANT SUN CURSOR ORB WITH LENS FLARE RAYS (z-10: TRAVELS BEHIND TEXT, AVATARS & BUTTONS)
            ═════════════════════════════════════════ */}
        <div
          ref={sunOrbRef}
          style={{
            transform: "translate3d(76vw, 135px, 0)",
          }}
          className={cn(
            "pointer-events-none absolute top-0 left-0 z-10 -ml-14 -mt-14 size-28 flex items-center justify-center transition-opacity duration-200 will-change-transform",
            cursorActive ? "opacity-100" : "opacity-90"
          )}
        >
          <RadiantSunGraphic size="lg" />
        </div>

        {/* ═════════════════════════════════════════
            3. VERTICALLY & HORIZONTALLY CENTERED HERO CONTENT
            (EQUAL TOP & BOTTOM GAP)
            ═════════════════════════════════════════ */}
        <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl flex flex-col items-center justify-center text-center">
            {/* Top Unified Social Proof Capsule (Avatars only on small screens, full capsule on large screens) */}
            {resolvedAvatars.length > 0 && (
              <div
                data-no-snapshot
                className="mb-7 sm:mb-9 inline-flex items-center justify-center sm:gap-3.5 rounded-full border border-border/70 bg-card/75 hover:bg-card/95 p-1.5 sm:pr-4 text-xs shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] backdrop-blur-md transition-colors cursor-auto"
              >
                <AvatarGroup showTooltip={true} className="my-0 h-8 -space-x-2">
                  {resolvedAvatars.map((avatar, index) => (
                    <Avatar
                      key={index}
                      className="size-8 !rounded-full border-2 border-background ring-0 cursor-pointer"
                    >
                      <AvatarImage
                        src={avatar.src}
                        alt={avatar.alt ?? avatar.name ?? ""}
                        className="!rounded-full object-cover"
                      />
                      <AvatarFallback className="!rounded-full bg-muted text-[10px] font-medium">
                        {(avatar.name ?? avatar.alt ?? "U").slice(0, 2)}
                      </AvatarFallback>
                      <AvatarGroupTooltip designation={avatar.role ?? avatar.designation}>
                        {avatar.name ?? avatar.alt}
                      </AvatarGroupTooltip>
                    </Avatar>
                  ))}
                </AvatarGroup>

                <span className="hidden sm:block h-4 w-px bg-border/70" />

                <div className="hidden sm:flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="size-3 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  {trustText && (
                    <span className="text-xs font-medium text-muted-foreground">
                      {trustText}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Distinctive Geometric Frame Headline */}
            <h1
              style={{
                fontFamily:
                  '"Space Grotesk", "Plus Jakarta Sans", var(--font-sans), system-ui, sans-serif',
              }}
              className="max-w-4xl text-[1.75rem] sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold tracking-[-0.04em] text-foreground leading-[1.16] sm:leading-[1.12] text-balance"
            >
              <span className="block text-foreground">{title}</span>
              {titleAccent && (
                <span className="relative mt-2 sm:mt-3 inline-flex items-center justify-center rounded-xl sm:rounded-2xl border border-primary/30 bg-primary/[0.07] px-3.5 sm:px-6 py-1 sm:py-1.5 text-primary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]">
                  {/* Precision Corner Frame Ticks */}
                  <span className="pointer-events-none absolute -top-1 -left-1 size-2 sm:size-2.5 border-t-2 border-l-2 border-primary" />
                  <span className="pointer-events-none absolute -top-1 -right-1 size-2 sm:size-2.5 border-t-2 border-r-2 border-primary" />
                  <span className="pointer-events-none absolute -bottom-1 -left-1 size-2 sm:size-2.5 border-b-2 border-l-2 border-primary" />
                  <span className="pointer-events-none absolute -bottom-1 -right-1 size-2 sm:size-2.5 border-b-2 border-r-2 border-primary" />
                  <span className="bg-gradient-to-r from-primary via-amber-500 to-orange-500 bg-clip-text text-transparent">
                    {titleAccent}
                  </span>
                </span>
              )}
            </h1>

            {/* Framed Editorial Callout Description */}
            {description && (
              <div className="mt-6 sm:mt-7 max-w-xl sm:max-w-2xl rounded-2xl border border-border/60 bg-muted/25 px-4 sm:px-6 py-3 sm:py-3.5 backdrop-blur-xs">
                <p className="text-xs sm:text-[15px] text-muted-foreground leading-relaxed font-medium text-balance">
                  {description}
                </p>
              </div>
            )}

            {/* CTA Buttons from the Last Preview of Button Component */}
            <div
              data-no-snapshot
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto cursor-auto"
            >
              {primaryActionLabel && (
                <LinkComp
                  href={primaryActionHref}
                  className="w-full sm:w-auto inline-block"
                >
                  <Button
                    variant={primaryButtonVariant}
                    showArrow
                    className="w-full sm:w-auto justify-center cursor-pointer"
                  >
                    {primaryActionLabel}
                  </Button>
                </LinkComp>
              )}

              {secondaryActionLabel && (
                <LinkComp
                  href={secondaryActionHref}
                  className="w-full sm:w-auto inline-block"
                >
                  <Button
                    variant={secondaryButtonVariant}
                    showArrow
                    className="w-full sm:w-auto justify-center cursor-pointer"
                  >
                    {secondaryActionLabel}
                  </Button>
                </LinkComp>
              )}
            </div>
          </div>
        </div>

        {/* ═════════════════════════════════════════
            4. BOTTOM-RIGHT POLAROID SNAPSHOT STACK
            (ULTRA-SOFT SHADOW, STACKS IN BOTTOM-RIGHT, CLEARS AFTER 10S)
            ═════════════════════════════════════════ */}
        <div className="pointer-events-none absolute bottom-6 right-5 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-12 z-30 w-[210px] sm:w-[250px] h-[160px] sm:h-[190px]">
          {snapshots.map((shot, idx) => (
            <PolaroidSnapshotCard
              key={shot.id}
              shot={shot}
              stackIndex={idx}
              durationMs={snapshotDurationMs}
              trustText={trustText}
              title={title}
              titleAccent={titleAccent}
              description={description}
              primaryActionLabel={primaryActionLabel}
              secondaryActionLabel={secondaryActionLabel}
              avatars={resolvedAvatars}
              rating={rating}
            />
          ))}
        </div>
      </section>
    );
  }
);

SolarSnapshotHero.displayName = "SolarSnapshotHero";

export default SolarSnapshotHero;
