"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { bezierEase, gsapTicker } from "./gsap-motion";
import { createSpringFollower, FRAMER_EASE, LAYOUT_TRANSITION } from "./motion-curves";

export interface DockItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  badge?: string | number;
}

export interface DockProps extends React.HTMLAttributes<HTMLDivElement> {
  items: DockItem[];
  baseSize?: number;
  magnification?: number;
  distance?: number;
  containerHeight?: number | string;
  gap?: number;
}

/** Magnification spring — the same constants the Motion build uses. */
const SIZE_SPRING = { mass: 0.1, stiffness: 150, damping: 12 };

/**
 * Tooltip in/out: 0.15s tweens with no ease given, which Framer resolves to
 * `easeOut` for every value (animateMotionValue's default).
 */
const TOOLTIP_EASE = bezierEase(FRAMER_EASE.easeOut);
const DOT_EASE = bezierEase(LAYOUT_TRANSITION.ease);

/** Pointer position shared by every icon; `Infinity` while the pointer is away. */
type PointerBus = {
  x: number;
  listeners: Set<(x: number) => void>;
};

/** Where the active dot last sat, so the next one can fly in from there. */
type DotMemory = { rect: DOMRect | null };

/** A `useRef` box handed to the icons (typed locally so React 18 and 19 types agree). */
type Held<T> = { readonly current: T };

export const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      items,
      baseSize = 48,
      magnification = 80,
      distance = 140,
      containerHeight = 64,
      gap = 12,
      className,
      style,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    ref,
  ) => {
    const bus = useRef<PointerBus>({ x: Infinity, listeners: new Set() });
    const dot = useRef<DotMemory>({ rect: null });
    const [isMobile, setIsMobile] = useState(false);

    // Automatically detect small screens to scale down physics on touch devices
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 640);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Responsive physics sizing fallbacks for mobile viewports: smaller, but
    // still thumb-sized (a 36px icon, 52px at full magnification).
    const effectiveBaseSize = isMobile ? Math.min(baseSize, 36) : baseSize;
    const effectiveMagnification = isMobile
      ? Math.min(magnification, 52)
      : magnification;
    const effectiveDistance = isMobile ? Math.min(distance, 100) : distance;
    const effectiveGap = isMobile ? Math.min(gap, 6) : gap;

    const dynamicHeight = typeof containerHeight === "number"
      ? `${isMobile ? Math.min(containerHeight, 60) : containerHeight}px`
      : containerHeight;

    const publish = (x: number) => {
      bus.current.x = x;
      bus.current.listeners.forEach((listener) => listener(x));
    };

    return (
      <div
        ref={ref}
        onMouseMove={(e) => {
          publish(e.clientX);
          onMouseMove?.(e);
        }}
        onMouseLeave={(e) => {
          publish(Infinity);
          onMouseLeave?.(e);
        }}
        style={{
          height: dynamicHeight,
          gap: `${effectiveGap}px`,
          ...style,
        }}
        className={cn(
          "mx-auto flex items-end justify-center rounded-2xl px-2 sm:px-4 pt-1 sm:pt-2.5 pb-0.5 sm:pb-2.5 shadow-2xl transition-all duration-300",
          "bg-card/70 backdrop-blur-xl border border-border/80",
          "ring-1 ring-foreground/5",
          "w-fit max-w-[calc(100vw-1.5rem)] overflow-visible",
          className,
        )}
        {...props}
      >
        {items.map((item) => (
          <DockIcon
            key={item.id}
            item={item}
            busRef={bus}
            dotRef={dot}
            baseSize={effectiveBaseSize}
            magnification={effectiveMagnification}
            distance={effectiveDistance}
          />
        ))}
      </div>
    );
  },
);

Dock.displayName = "Dock";

interface DockIconProps {
  item: DockItem;
  busRef: Held<PointerBus>;
  dotRef: Held<DotMemory>;
  baseSize: number;
  magnification: number;
  distance: number;
}

const DockIcon: React.FC<DockIconProps> = ({
  item,
  busRef,
  dotRef,
  baseSize,
  magnification,
  distance,
}) => {
  const iconRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Size follows the pointer through a spring, every frame, without React:
  // distance from the icon's centre maps [-distance, 0, distance] onto
  // [base, magnified, base] (clamped), and the spring chases that target.
  const sizing = useRef({ baseSize, magnification, distance });
  // Synced after every commit (before the effects below read it), not in render.
  useLayoutEffect(() => {
    sizing.current = { baseSize, magnification, distance };
  });
  const retarget = useRef<() => void>(() => {});

  useLayoutEffect(() => {
    const icon = iconRef.current;
    const bus = busRef.current;
    if (!icon) return;

    const apply = (size: number) => {
      icon.style.width = `${size}px`;
      icon.style.height = `${size}px`;
    };
    const target = (x: number) => {
      const { baseSize: base, magnification: peak, distance: reach } = sizing.current;
      if (!Number.isFinite(x)) return base;
      const bounds = icon.getBoundingClientRect();
      const offset = Math.abs(x - bounds.x - bounds.width / 2);
      if (offset >= reach) return base;
      return peak + (base - peak) * (offset / reach);
    };

    const spring = createSpringFollower(target(bus.x), apply, {
      ...SIZE_SPRING,
      ticker: gsapTicker,
    });
    apply(spring.get());

    const listener = (x: number) => spring.set(target(x));
    retarget.current = () => listener(bus.x);
    bus.listeners.add(listener);
    return () => {
      bus.listeners.delete(listener);
      spring.destroy();
    };
  }, [busRef]);

  // New sizes (the mobile fallbacks kicking in) spring over from where it is.
  useEffect(() => {
    retarget.current();
  }, [baseSize, magnification, distance]);

  // Tooltip: stays mounted, so its exit can play before it hides.
  useLayoutEffect(() => {
    const tip = tooltipRef.current;
    if (!tip) return;
    gsap.killTweensOf(tip);
    if (isHovered) {
      gsap.fromTo(
        tip,
        { autoAlpha: 0, y: 10, scale: 0.8 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.15, ease: TOOLTIP_EASE },
      );
    } else if (gsap.getProperty(tip, "opacity") !== 0) {
      gsap.to(tip, { autoAlpha: 0, y: 5, scale: 0.8, duration: 0.15, ease: TOOLTIP_EASE });
    }
  }, [isHovered]);

  return (
    <div className="relative flex flex-col items-center shrink-0">
      {/* Floating Tooltip (Renders on all devices on hover/touch) */}
      <div
        ref={tooltipRef}
        aria-hidden={!isHovered}
        style={{ opacity: 0, visibility: "hidden" }}
        className="absolute -top-6 sm:-top-9 px-1.5 py-0.5 rounded text-[8px] sm:text-xs font-semibold whitespace-nowrap pointer-events-none shadow-md bg-primary text-primary-foreground border border-foreground z-50"
      >
        {item.label}
      </div>

      {/* Interactive Dock Button */}
      <button
        ref={iconRef}
        style={{ width: baseSize, height: baseSize }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          if (item.onClick) item.onClick();
          setIsHovered(false);
        }}
        aria-label={item.label}
        className={cn(
          "relative flex items-center justify-center rounded-xl shadow-lg transition-colors cursor-pointer select-none shrink-0",
          "bg-gradient-to-t from-muted to-card",
          "border border-border/80 hover:border-foreground/30",
          "text-foreground active:scale-95",
        )}
      >
        {/* Notification Badge */}
        {item.badge && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 sm:h-4 sm:min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] sm:text-[10px] font-semibold text-white shadow-sm border border-card animate-pulse">
            {item.badge}
          </span>
        )}

        {/* Scaled Icon Container */}
        <div className="flex items-center justify-center w-3/5 h-3/5 pointer-events-none">
          {item.icon}
        </div>
      </button>

      {/* Active Dot Indicator */}
      <div className="h-1 sm:h-1.5 w-full flex items-center justify-center mt-1">
        {item.isActive && <ActiveDot memoryRef={dotRef} />}
      </div>
    </div>
  );
};

/**
 * The running-app dot. Only the active icon renders one, so when the active
 * app changes the new dot flies in from where the old one sat — the shared
 * layout animation, on Framer's default layout curve (0.45s, [0.4, 0, 0.1, 1]).
 */
function ActiveDot({ memoryRef }: { memoryRef: Held<DotMemory> }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const memory = memoryRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const from = memory.rect;
    if (from && (from.x !== rect.x || from.y !== rect.y)) {
      gsap.fromTo(
        el,
        { x: from.x - rect.x, y: from.y - rect.y },
        { x: 0, y: 0, duration: LAYOUT_TRANSITION.duration, ease: DOT_EASE },
      );
    }
    memory.rect = rect;
    return () => {
      // Remember where it left from, including mid-flight, for the next dot.
      memory.rect = el.getBoundingClientRect();
    };
  }, [memoryRef]);

  return (
    <div
      ref={ref}
      className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary shadow-sm"
    />
  );
}
