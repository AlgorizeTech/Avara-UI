"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  type MotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

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
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity);
    const [isMobile, setIsMobile] = useState(false);

    // Automatically detect small screens to scale down physics on touch devices
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 640);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Responsive physics sizing fallbacks for mobile viewports
    const effectiveBaseSize = isMobile ? Math.min(baseSize, 36) : baseSize;
    const effectiveMagnification = isMobile
      ? Math.min(magnification, 52)
      : magnification;
    const effectiveDistance = isMobile ? Math.min(distance, 100) : distance;
    const effectiveGap = isMobile ? Math.min(gap, 6) : gap;

    const dynamicHeight = typeof containerHeight === "number"
      ? `${isMobile ? Math.min(containerHeight, 60) : containerHeight}px`
      : containerHeight;

    return (
      <div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
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
            mouseX={mouseX}
            baseSize={effectiveBaseSize}
            magnification={effectiveMagnification}
            distance={effectiveDistance}
            isMobile={isMobile}
          />
        ))}
      </div>
    );
  },
);

Dock.displayName = "Dock";

interface DockIconProps {
  item: DockItem;
  mouseX: MotionValue<number>;
  baseSize: number;
  magnification: number;
  distance: number;
  isMobile: boolean;
}

const DockIcon: React.FC<DockIconProps> = ({
  item,
  mouseX,
  baseSize,
  magnification,
  distance,
}) => {
  const iconRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const distanceFromMouse = useTransform(mouseX, (val: number) => {
    const bounds = iconRef.current?.getBoundingClientRect() ?? {
      x: 0,
      width: 0,
    };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceFromMouse,
    [-distance, 0, distance],
    [baseSize, magnification, baseSize],
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <div className="relative flex flex-col items-center shrink-0">
      {/* Floating Tooltip (Renders on all devices on hover/touch) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-6 sm:-top-9 px-1.5 py-0.5 rounded text-[8px] sm:text-xs font-semibold whitespace-nowrap pointer-events-none shadow-md bg-primary text-primary-foreground border border-foreground z-50"
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Dock Button */}
      <motion.button
        ref={iconRef}
        style={{ width, height: width }}
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
      </motion.button>

      {/* Active Dot Indicator */}
      <div className="h-1 sm:h-1.5 w-full flex items-center justify-center mt-1">
        {item.isActive && (
          <motion.div
            layoutId="active-dot"
            className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary shadow-sm"
          />
        )}
      </div>
    </div>
  );
};
