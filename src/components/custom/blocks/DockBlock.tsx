"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
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
    const effectiveBaseSize = isMobile ? Math.min(baseSize, 38) : baseSize;
    const effectiveMagnification = isMobile
      ? Math.min(magnification, 52)
      : magnification;
    const effectiveDistance = isMobile ? Math.min(distance, 90) : distance;
    const effectiveGap = isMobile ? Math.min(gap, 6) : gap;

    return (
      <div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        style={{
          height:
            typeof containerHeight === "number"
              ? `${containerHeight}px`
              : containerHeight,
          gap: `${effectiveGap}px`,
          ...style,
        }}
        className={cn(
          "mx-auto flex items-end rounded-2xl px-3 sm:px-4 py-2.5 shadow-2xl transition-all duration-300",
          "bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/80 dark:border-white/10",
          "ring-1 ring-black/5 dark:ring-white/5",
          "max-w-[94vw] sm:max-w-full overflow-x-auto sm:overflow-visible no-scrollbar",
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
  mouseX: any;
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
  isMobile,
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
      {/* Floating Tooltip (Only renders on desktop/tablet to prevent clipping on mobile touch) */}
      <AnimatePresence>
        {isHovered && !isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-10 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap pointer-events-none shadow-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border border-zinc-800 dark:border-zinc-200 z-50"
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
          "bg-gradient-to-t from-zinc-100 to-white dark:from-zinc-800 dark:to-zinc-700/80",
          "border border-zinc-200/80 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/30",
          "text-zinc-700 dark:text-zinc-200 active:scale-95",
        )}
      >
        {/* Notification Badge */}
        {item.badge && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 sm:h-4 sm:min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] sm:text-[10px] font-bold text-white shadow-sm border border-white dark:border-zinc-900 animate-pulse">
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
            className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-zinc-800 dark:bg-white shadow-sm"
          />
        )}
      </div>
    </div>
  );
};
