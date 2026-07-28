"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import { Dock, DockItem } from "@/components/custom/blocks/DockBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import {
  Compass,
  FolderGit2,
  Github,
  Home,
  Mail,
  Settings,
  Sparkles,
  Terminal,
} from "lucide-react";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const DOCK_CODE_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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
  ({ items, baseSize = 48, magnification = 80, distance = 140, containerHeight = 64, gap = 12, className, style, ...props }, ref) => {
    const mouseX = useMotionValue(Infinity);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 640);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const effectiveBaseSize = isMobile ? Math.min(baseSize, 38) : baseSize;
    const effectiveMagnification = isMobile ? Math.min(magnification, 52) : magnification;
    const effectiveDistance = isMobile ? Math.min(distance, 90) : distance;
    const effectiveGap = isMobile ? Math.min(gap, 6) : gap;

    return (
      <div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        style={{
          height: typeof containerHeight === "number" ? \`\${containerHeight}px\` : containerHeight,
          gap: \`\${effectiveGap}px\`,
          ...style,
        }}
        className={cn(
          "mx-auto flex items-end rounded-2xl px-3 sm:px-4 pb-2.5 shadow-2xl transition-all duration-300",
          "bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/80 dark:border-white/10",
          "ring-1 ring-black/5 dark:ring-white/5 max-w-[94vw] sm:max-w-full overflow-x-auto sm:overflow-visible no-scrollbar",
          className
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
  }
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

const DockIcon: React.FC<DockIconProps> = ({ item, mouseX, baseSize, magnification, distance, isMobile }) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const distanceFromMouse = useTransform(mouseX, (val: number) => {
    const bounds = iconRef.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceFromMouse,
    [-distance, 0, distance],
    [baseSize, magnification, baseSize]
  );

  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <div className="relative flex flex-col items-center shrink-0">
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
          "text-zinc-700 dark:text-zinc-200 active:scale-95"
        )}
      >
        {item.badge && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 sm:h-4 sm:min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] sm:text-[10px] font-bold text-white shadow-sm border border-white dark:border-zinc-900 animate-pulse">
            {item.badge}
          </span>
        )}
        <div className="flex items-center justify-center w-3/5 h-3/5 pointer-events-none">
          {item.icon}
        </div>
      </motion.button>

      <div className="h-1 sm:h-1.5 w-full flex items-center justify-center mt-1">
        {item.isActive && (
          <motion.div layoutId="active-dot" className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-zinc-800 dark:bg-white shadow-sm" />
        )}
      </div>
    </div>
  );
};`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const DOCK_CODE_JS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const Dock = React.forwardRef(
  ({ items, baseSize = 48, magnification = 80, distance = 140, containerHeight = 64, gap = 12, className, style, ...props }, ref) => {
    const mouseX = useMotionValue(Infinity);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 640);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const effectiveBaseSize = isMobile ? Math.min(baseSize, 38) : baseSize;
    const effectiveMagnification = isMobile ? Math.min(magnification, 52) : magnification;
    const effectiveDistance = isMobile ? Math.min(distance, 90) : distance;
    const effectiveGap = isMobile ? Math.min(gap, 6) : gap;

    return (
      <div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        style={{
          height: typeof containerHeight === "number" ? \`\${containerHeight}px\` : containerHeight,
          gap: \`\${effectiveGap}px\`,
          ...style,
        }}
        className={cn(
          "mx-auto flex items-end rounded-2xl px-3 sm:px-4 pb-2.5 shadow-2xl transition-all duration-300",
          "bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/80 dark:border-white/10",
          "ring-1 ring-black/5 dark:ring-white/5 max-w-[94vw] sm:max-w-full overflow-x-auto sm:overflow-visible no-scrollbar",
          className
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
  }
);
Dock.displayName = "Dock";

const DockIcon = ({ item, mouseX, baseSize, magnification, distance, isMobile }) => {
  const iconRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const distanceFromMouse = useTransform(mouseX, (val) => {
    const bounds = iconRef.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceFromMouse,
    [-distance, 0, distance],
    [baseSize, magnification, baseSize]
  );

  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <div className="relative flex flex-col items-center shrink-0">
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
          "text-zinc-700 dark:text-zinc-200 active:scale-95"
        )}
      >
        {item.badge && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 sm:h-4 sm:min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] sm:text-[10px] font-bold text-white shadow-sm border border-white dark:border-zinc-900 animate-pulse">
            {item.badge}
          </span>
        )}
        <div className="flex items-center justify-center w-3/5 h-3/5 pointer-events-none">
          {item.icon}
        </div>
      </motion.button>

      <div className="h-1 sm:h-1.5 w-full flex items-center justify-center mt-1">
        {item.isActive && (
          <motion.div layoutId="active-dot" className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-zinc-800 dark:bg-white shadow-sm" />
        )}
      </div>
    </div>
  );
};`;

export function DockShowcase() {
  const [activeTab, setActiveTab] = useState("home");

  const sampleItems: DockItem[] = [
    {
      id: "home",
      label: "Dashboard",
      icon: <Home className="w-full h-full" />,
      isActive: activeTab === "home",
      onClick: () => setActiveTab("home"),
    },
    {
      id: "compass",
      label: "Explore",
      icon: <Compass className="w-full h-full" />,
      isActive: activeTab === "compass",
      onClick: () => setActiveTab("compass"),
    },
    {
      id: "mail",
      label: "Messages",
      icon: <Mail className="w-full h-full" />,
      badge: 3,
      isActive: activeTab === "mail",
      onClick: () => setActiveTab("mail"),
    },
    {
      id: "terminal",
      label: "Terminal",
      icon: <Terminal className="w-full h-full" />,
      isActive: activeTab === "terminal",
      onClick: () => setActiveTab("terminal"),
    },
    {
      id: "projects",
      label: "Repositories",
      icon: <FolderGit2 className="w-full h-full" />,
      isActive: activeTab === "projects",
      onClick: () => setActiveTab("projects"),
    },
    {
      id: "ai",
      label: "AI Assistant",
      icon: <Sparkles className="w-full h-full text-amber-500" />,
      isActive: activeTab === "ai",
      onClick: () => setActiveTab("ai"),
    },
    {
      id: "github",
      label: "GitHub",
      icon: <Github className="w-full h-full" />,
      isActive: activeTab === "github",
      onClick: () => setActiveTab("github"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-full h-full" />,
      isActive: activeTab === "settings",
      onClick: () => setActiveTab("settings"),
    },
  ];

  const generateUsageCode = () => {
    return `import { Dock } from "@/components/custom/blocks/DockBlock";
import { Home, Terminal, Settings, Mail } from "lucide-react";

export default function AppNavigation() {
  const dockItems = [
    { id: "home", label: "Home", icon: <Home className="w-full h-full" />, isActive: true },
    { id: "mail", label: "Mail", icon: <Mail className="w-full h-full" />, badge: 5 },
    { id: "terminal", label: "Terminal", icon: <Terminal className="w-full h-full" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-full h-full" /> },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <Dock
        items={dockItems}
        containerHeight={68}
        baseSize={48}
        magnification={82}
        distance={140}
        gap={14}
      />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* Feature Explainer Panel */}
      <ShowcaseControlPanel className="flex flex-col gap-4 p-5 rounded-xl z-0 relative">
        <p className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
          An ultra-smooth, macOS-inspired navigation dock powered by **Framer
          Motion** spring physics. Fully customizable via direct props
          (`containerHeight`, `gap`, `baseSize`, `magnification`), featuring
          unclipped desktop floating tooltips and automatic touch-viewport
          scaling for mobile screens.
        </p>
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="DockBlock"
        tsCode={DOCK_CODE_TS}
        jsCode={DOCK_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
      >
        <div className="w-full flex flex-col items-center justify-end bg-zinc-50 dark:bg-[#0a0a0a] py-16 px-2 sm:px-8 relative overflow-hidden min-h-[420px] rounded-3xl border border-zinc-200 dark:border-white/10 transition-colors duration-300">
          {/* Subtle Ambient Backglow */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-t from-zinc-400/20 via-zinc-400/5 to-transparent dark:from-white/10 dark:via-white/5 dark:to-transparent blur-3xl rounded-full pointer-events-none" />

          {/* Dummy Desktop Workplace State Indicator */}
          <div className="absolute top-6 left-6 text-xs font-mono text-zinc-400 dark:text-zinc-600">
            Active App:{" "}
            <span className="text-zinc-800 dark:text-zinc-300 uppercase font-bold">
              {activeTab}
            </span>
          </div>

          {/* Interactive Dock Container with Customized Dimensions */}
          <div className="relative z-10 w-full flex justify-center pb-2 sm:pb-4">
            <Dock
              items={sampleItems}
              containerHeight={80}
              baseSize={46}
              magnification={84}
              distance={135}
              gap={12}
            />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
