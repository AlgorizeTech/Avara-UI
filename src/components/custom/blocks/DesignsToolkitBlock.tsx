"use client";

import React, {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import {
  Palette,
  Sparkles,
  Layers,
  Dribbble,
  Shapes,
  Image as ImageIcon,
  Globe,
  Code2,
  Wind,
  Database,
  GitBranch,
  Zap,
} from "lucide-react";

export interface ToolkitItem {
  id?: string;
  number: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  iconName?: string;
  logoBg?: string;
  logoColor?: string;
  accentColor: "blue" | "red" | "green" | "pink" | "mint" | "cyan" | string;
  pinColor?: string;
  onClick?: () => void;
}

export interface DesignsToolkitProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items?: ToolkitItem[];
  title?: string;
  description?: string;
  showDashedLine?: boolean;
  showGrid?: boolean;
  interactive?: boolean;
  animated?: boolean;
  autoStartOnView?: boolean;
  animationDuration?: number;
  animationSpeed?: number;
}

// Realistic 3D pushpin with highlights and depth shadow
function PushPin({
  color = "#2563eb",
  className,
}: {
  color?: string;
  className?: string;
}) {
  const pinId = useId();

  return (
    <div
      className={cn(
        "relative flex items-center justify-center pointer-events-none select-none z-20",
        className,
      )}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-110"
      >
        <defs>
          <radialGradient
            id={`pin-grad-${pinId}`}
            cx="35%"
            cy="30%"
            r="65%"
            fx="35%"
            fy="30%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="25%" stopColor={color} />
            <stop offset="100%" stopColor="#050505" stopOpacity="0.8" />
          </radialGradient>
          <radialGradient id={`pin-rim-${pinId}`} cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor={color} />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.6" />
          </radialGradient>
        </defs>

        {/* Pin base ring shadow */}
        <circle cx="16" cy="16.5" r="11" fill="rgba(0, 0, 0, 0.25)" />

        {/* Lower rim */}
        <circle cx="16" cy="16" r="10.5" fill={`url(#pin-rim-${pinId})`} />

        {/* Inner top dome */}
        <circle cx="16" cy="15.5" r="8.5" fill={`url(#pin-grad-${pinId})`} />

        {/* Specular glass highlight reflection */}
        <ellipse
          cx="13.5"
          cy="12.5"
          rx="3"
          ry="1.8"
          transform="rotate(-25 13.5 12.5)"
          fill="#ffffff"
          opacity="0.8"
        />
        <circle cx="17.5" cy="11.5" r="1" fill="#ffffff" opacity="0.6" />
      </svg>
    </div>
  );
}

// Custom authentic brand icons
function FreepikLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M4 4h16v4.5H9.5v2.8H18v4.2H9.5V20H4V4z" />
    </svg>
  );
}

function PinterestLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.64 7.86 6.38 9.3-.09-.78-.17-1.98.04-2.83.19-.77 1.25-5.3 1.25-5.3s-.32-.64-.32-1.58c0-1.48.86-2.59 1.93-2.59.91 0 1.35.68 1.35 1.5 0 .91-.58 2.28-.88 3.55-.25 1.06.53 1.93 1.58 1.93 1.9 0 3.36-2 3.36-4.89 0-2.56-1.84-4.35-4.47-4.35-3.05 0-4.84 2.29-4.84 4.65 0 .92.35 1.91.79 2.45.09.11.1.2.07.31-.08.33-.26 1.05-.29 1.2-.05.2-.16.24-.37.15-1.38-.64-2.24-2.66-2.24-4.28 0-3.48 2.53-6.68 7.3-6.68 3.83 0 6.81 2.73 6.81 6.38 0 3.81-2.4 6.87-5.73 6.87-1.12 0-2.17-.58-2.53-1.27l-.69 2.63c-.25.96-.93 2.16-1.38 2.9A9.97 9.97 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
    </svg>
  );
}

function EnvatoLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.4 3.6C16.8 1.2 11.2 2 8.3 4.2 4.6 7 3.3 12.3 5.4 16.6c2 4 6.8 6.2 11.2 5 4.3-1.2 7.1-5.6 6.4-10-.4-2.7-1.8-6-3.6-8zm-3.5 13.9c-2.4 1.7-6 .9-7.2-1.6-.9-1.9-.3-4.3 1.3-5.6 1.8-1.5 4.4-1.8 6.5-.8 1.2.6 1.9 1.7 1.9 3.1 0 2-1 3.8-2.5 4.9z" />
    </svg>
  );
}

function DribbbleLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm7.65 7.42a15.82 15.82 0 0 1-5.18-.89c-.16-.38-.33-.76-.52-1.14 3.03-1.42 5.09-1.21 5.7.03zm-7.65-5.42c2.25 0 4.3.93 5.78 2.43-.87-.79-2.76-.87-5.32.33-.85-1.57-1.8-2.92-2.81-3.95.74-.52 1.51-.81 2.35-.81zm-4.39 1.63c.96 1 1.87 2.3 2.68 3.8-2.87.89-5.96.95-7.53.94 1-2.2 2.76-3.95 4.85-4.74zM3.99 12c0-.12.01-.25.02-.37 1.92.01 5.44-.06 8.59-1.07.23.48.44.96.63 1.45-3.8 1.15-7.23 3.65-8.8 6.13-.28-.68-.44-1.42-.44-2.14zm4.4 7.02c1.47-2.3 4.67-4.66 8.35-5.74.88 2.27 1.25 4.54 1.34 5.25A7.95 7.95 0 0 1 8.39 19.02zm11.23-2.16c-.19-.77-.66-2.95-1.56-5.11 1.71.28 3.25.9 3.51 1.02-.32 1.55-1.03 2.95-1.95 4.09z" />
    </svg>
  );
}

function FlaticonLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2L3 8v8l9 6 9-6V8l-9-6zm0 3.3L18.3 9 12 12.7 5.7 9 12 5.3zM5 10.3l6 3.6v6.8l-6-4v-6.4zm8 10.4v-6.8l6-3.6v6.4l-6 4z" />
    </svg>
  );
}

function MockupWorldLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M4 6h3.5l2.5 5 2.5-5H16l-3.5 7.5L16 21h-3.5L10 16l-2.5 5H4l3.5-7.5L4 6zm10 0h2.5l2 4 2-4H23l-3 6 3 6h-2.5l-2-4-2 4H14l3-6-3-6z" />
    </svg>
  );
}

export const CREATIVE_TOOLKIT_ITEMS: ToolkitItem[] = [
  {
    id: "freepik",
    number: "01",
    title: "Freepik",
    description:
      "Freepik offers free and premium vectors, photos, PSDs, and mockups for graphic designers.",
    icon: <Palette className="w-5 h-5" />,
    logoBg: "bg-blue-600 text-white",
    accentColor: "blue",
    pinColor: "#2563eb",
    onClick: () => {},
  },
  {
    id: "pinterest",
    number: "02",
    title: "Pinterest",
    description:
      "Pinterest is a visual platform for discovering, saving, and sharing creative ideas.",
    icon: <Sparkles className="w-5 h-5" />,
    logoBg: "bg-red-600 text-white",
    accentColor: "red",
    pinColor: "#dc2626",
    onClick: () => {},
  },
  {
    id: "envato",
    number: "03",
    title: "Envato",
    description:
      "Envato is a marketplace for premium design assets like templates, graphics, videos, and more.",
    icon: <Layers className="w-5 h-5" />,
    logoBg: "bg-[#7cb342] text-zinc-950",
    accentColor: "green",
    pinColor: "#65a30d",
    onClick: () => {},
  },
  {
    id: "dribbble",
    number: "04",
    title: "Dribbble",
    description:
      "Dribbble is a platform for showcasing, discovering, and connecting with creative design work.",
    icon: <Dribbble className="w-5 h-5" />,
    logoBg: "bg-pink-500 text-white",
    accentColor: "pink",
    pinColor: "#db2777",
    onClick: () => {},
  },
  {
    id: "flaticon",
    number: "05",
    title: "Flaticon",
    description:
      "Flaticon offers millions of free and premium vector icons, stickers, and UI interface graphics.",
    icon: <Shapes className="w-5 h-5" />,
    logoBg: "bg-emerald-500 text-white",
    accentColor: "mint",
    pinColor: "#059669",
    onClick: () => {},
  },
  {
    id: "mockup-world",
    number: "06",
    title: "Mockup World",
    description:
      "Mockup World offers free, high-quality PSD mockups for showcasing designs in realistic settings.",
    icon: <ImageIcon className="w-5 h-5" />,
    logoBg: "bg-gradient-to-tr from-cyan-500 to-sky-400 text-white",
    accentColor: "cyan",
    pinColor: "#0891b2",
    onClick: () => {},
  },
];

export const DEVELOPER_TOOLKIT_ITEMS: ToolkitItem[] = [
  {
    id: "nextjs",
    number: "01",
    title: "Next.js",
    description:
      "The React framework for high-performance production web applications.",
    icon: <Globe className="w-5 h-5" />,
    logoBg: "bg-zinc-900 text-white dark:bg-zinc-800",
    accentColor: "blue",
    pinColor: "#2563eb",
    onClick: () => {},
  },
  {
    id: "typescript",
    number: "02",
    title: "TypeScript",
    description:
      "Strongly typed programming language that builds on JavaScript syntax.",
    icon: <Code2 className="w-5 h-5" />,
    logoBg: "bg-blue-600 text-white",
    accentColor: "red",
    pinColor: "#dc2626",
    onClick: () => {},
  },
  {
    id: "tailwind",
    number: "03",
    title: "Tailwind CSS",
    description:
      "Utility-first CSS framework for rapid and maintainable UI design.",
    icon: <Wind className="w-5 h-5" />,
    logoBg: "bg-sky-500 text-white",
    accentColor: "green",
    pinColor: "#65a30d",
    onClick: () => {},
  },
  {
    id: "supabase",
    number: "04",
    title: "Supabase",
    description:
      "Open source Firebase alternative with PostgreSQL database and realtime sync.",
    icon: <Database className="w-5 h-5" />,
    logoBg: "bg-emerald-600 text-white",
    accentColor: "pink",
    pinColor: "#db2777",
    onClick: () => {},
  },
  {
    id: "github",
    number: "05",
    title: "GitHub",
    description:
      "Cloud-based hosting service for version control, CI/CD, and collaboration.",
    icon: <GitBranch className="w-5 h-5" />,
    logoBg: "bg-zinc-950 text-white",
    accentColor: "mint",
    pinColor: "#059669",
    onClick: () => {},
  },
  {
    id: "vercel",
    number: "06",
    title: "Vercel",
    description:
      "Frontend cloud platform for seamless continuous deployment and serverless.",
    icon: <Zap className="w-5 h-5" />,
    logoBg: "bg-zinc-900 text-white",
    accentColor: "cyan",
    pinColor: "#0891b2",
    onClick: () => {},
  },
];

export const DEFAULT_TOOLKIT_ITEMS: ToolkitItem[] = CREATIVE_TOOLKIT_ITEMS;

const ACCENT_STYLES: Record<
  string,
  {
    outerBorder: string;
    numColor: string;
    tagGlow: string;
    pin: string;
  }
> = {
  blue: {
    outerBorder:
      "border-blue-400/50 bg-blue-50/40 dark:border-blue-500/40 dark:bg-blue-950/20",
    numColor: "text-blue-600 dark:text-blue-400",
    tagGlow: "group-hover:shadow-[0_12px_30px_-8px_rgba(37,99,235,0.25)]",
    pin: "#2563eb",
  },
  red: {
    outerBorder:
      "border-rose-400/50 bg-rose-50/40 dark:border-rose-500/40 dark:bg-rose-950/20",
    numColor: "text-rose-600 dark:text-rose-400",
    tagGlow: "group-hover:shadow-[0_12px_30px_-8px_rgba(225,29,72,0.25)]",
    pin: "#dc2626",
  },
  green: {
    outerBorder:
      "border-lime-400/50 bg-lime-50/40 dark:border-lime-500/40 dark:bg-lime-950/20",
    numColor: "text-lime-600 dark:text-lime-400",
    tagGlow: "group-hover:shadow-[0_12px_30px_-8px_rgba(101,163,13,0.25)]",
    pin: "#65a30d",
  },
  pink: {
    outerBorder:
      "border-pink-400/50 bg-pink-50/40 dark:border-pink-500/40 dark:bg-pink-950/20",
    numColor: "text-pink-600 dark:text-pink-400",
    tagGlow: "group-hover:shadow-[0_12px_30px_-8px_rgba(219,39,119,0.25)]",
    pin: "#db2777",
  },
  mint: {
    outerBorder:
      "border-emerald-400/50 bg-emerald-50/40 dark:border-emerald-500/40 dark:bg-emerald-950/20",
    numColor: "text-emerald-600 dark:text-emerald-400",
    tagGlow: "group-hover:shadow-[0_12px_30px_-8px_rgba(5,150,105,0.25)]",
    pin: "#059669",
  },
  cyan: {
    outerBorder:
      "border-cyan-400/50 bg-cyan-50/40 dark:border-cyan-500/40 dark:bg-cyan-950/20",
    numColor: "text-cyan-600 dark:text-cyan-400",
    tagGlow: "group-hover:shadow-[0_12px_30px_-8px_rgba(8,145,178,0.25)]",
    pin: "#0891b2",
  },
};

export default function DesignsToolkitBlock({
  items = DEFAULT_TOOLKIT_ITEMS,
  title,
  description,
  showDashedLine = true,
  showGrid = true,
  interactive = true,
  animated = true,
  autoStartOnView = true,
  animationDuration,
  animationSpeed,
  className,
  ...props
}: DesignsToolkitProps) {
  const duration = animationDuration ?? animationSpeed ?? 1150;
  const [animStep, setAnimStep] = useState<number>(animated ? 0 : 6);
  const [breakpoint, setBreakpoint] = useState<"sm" | "md" | "lg">("lg");
  const containerRef = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef<boolean>(!autoStartOnView);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Track responsive screen size
  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w >= 1024) setBreakpoint("lg");
      else if (w >= 768) setBreakpoint("md");
      else setBreakpoint("sm");
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  }, []);

  // Choreographed animation sequence tailored for each breakpoint, scaled by duration
  const startAnimation = useCallback(() => {
    clearAllTimeouts();
    setAnimStep(0);

    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    const factor = duration / 1150;

    if (w >= 1024) {
      // LG Screen: 2 visible -> 1 emerges -> 3 emerges -> 4 emerges -> 5 emerges -> 6 emerges
      const t1 = setTimeout(() => setAnimStep(1), Math.round(900 * factor)); // Card 01
      const t2 = setTimeout(() => setAnimStep(2), Math.round(2100 * factor)); // Card 03
      const t3 = setTimeout(() => setAnimStep(3), Math.round(3300 * factor)); // Card 04
      const t4 = setTimeout(() => setAnimStep(4), Math.round(4500 * factor)); // Card 05
      const t5 = setTimeout(() => setAnimStep(5), Math.round(5700 * factor)); // Card 06
      const t6 = setTimeout(() => setAnimStep(6), Math.round(7000 * factor)); // Settled
      timeoutsRef.current.push(t1, t2, t3, t4, t5, t6);
    } else if (w >= 768) {
      // MD Screen: Row 1 [01, 02] visible -> Row 2 [03, 04] emerges from under [01, 02] -> Row 3 [05, 06] emerges from under [03, 04]
      const t1 = setTimeout(() => setAnimStep(1), Math.round(1100 * factor)); // [03, 04] emerge
      const t2 = setTimeout(() => setAnimStep(2), Math.round(2400 * factor)); // [05, 06] emerge
      const t3 = setTimeout(() => setAnimStep(3), Math.round(3700 * factor)); // Settled
      timeoutsRef.current.push(t1, t2, t3);
    } else {
      // SM Screen: Card 01 visible -> 02 from under 01 -> 03 from under 02 -> 04 from under 03 -> 05 from under 04 -> 06 from under 05
      const t1 = setTimeout(() => setAnimStep(1), Math.round(800 * factor)); // Card 02
      const t2 = setTimeout(() => setAnimStep(2), Math.round(1900 * factor)); // Card 03
      const t3 = setTimeout(() => setAnimStep(3), Math.round(3000 * factor)); // Card 04
      const t4 = setTimeout(() => setAnimStep(4), Math.round(4100 * factor)); // Card 05
      const t5 = setTimeout(() => setAnimStep(5), Math.round(5200 * factor)); // Card 06
      const t6 = setTimeout(() => setAnimStep(6), Math.round(6400 * factor)); // Settled
      timeoutsRef.current.push(t1, t2, t3, t4, t5, t6);
    }
  }, [clearAllTimeouts, duration]);

  useEffect(() => {
    if (!animated) {
      setAnimStep(6);
      return;
    }

    if (!autoStartOnView) {
      startAnimation();
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStartedRef.current) {
          hasStartedRef.current = true;
          startAnimation();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearAllTimeouts();
    };
  }, [animated, autoStartOnView, startAnimation, clearAllTimeouts]);

  // Re-trigger animation when duration changes so user immediately sees the effect of slider
  useEffect(() => {
    if (!animated) return;
    if (!hasStartedRef.current) return;

    const timer = setTimeout(() => {
      startAnimation();
    }, 100);

    return () => clearTimeout(timer);
  }, [duration, animated, startAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full rounded-3xl border border-border/80 bg-background/95 dark:bg-zinc-950/95 overflow-hidden flex flex-col p-6 sm:p-10 md:p-14 select-none",
        className,
      )}
      {...props}
    >
      {/* Background Grid Pattern */}
      {showGrid && (
        <div
          className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "44px 44px",
            color: "var(--border)",
            maskImage:
              "radial-gradient(ellipse 90% 90% at 50% 50%, #000 65%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 90% at 50% 50%, #000 65%, transparent 100%)",
          }}
        />
      )}

      {/* Decorative Dashed Wave Line Connecting the Cards across the Corkboard */}
      {showDashedLine && (
        <svg
          className={cn(
            "absolute inset-0 w-full h-full pointer-events-none z-0 hidden lg:block transition-opacity duration-1000",
            animStep >= 5 ? "opacity-100" : "opacity-0",
          )}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1000 600"
        >
          <path
            d="M 20 90 C 90 90, 110 85, 175 80 C 230 75, 380 70, 500 160 C 620 250, 700 85, 825 80 C 890 75, 960 160, 990 190"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 6"
            className="text-foreground/20 dark:text-foreground/25"
          />
          <path
            d="M 10 400 C 60 380, 110 390, 175 390 C 280 390, 360 480, 500 480 C 620 480, 720 380, 825 390 C 890 395, 950 470, 990 510"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 6"
            className="text-foreground/20 dark:text-foreground/25"
          />
          <path
            d="M 500 220 C 500 280, 500 360, 500 430"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 6"
            className="text-foreground/15 dark:text-foreground/20"
          />
        </svg>
      )}

      {/* Dashed Line for MD Screen (2 Columns) */}
      {showDashedLine && (
        <svg
          className={cn(
            "absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:max-lg:block transition-opacity duration-1000",
            animStep >= 2 ? "opacity-100" : "opacity-0",
          )}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 700 800"
        >
          <path
            d="M 40 80 C 180 80, 350 80, 520 80 C 640 80, 640 340, 520 340 C 350 340, 180 340, 180 600 C 180 600, 350 600, 520 600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 6"
            className="text-foreground/20 dark:text-foreground/25"
          />
        </svg>
      )}

      {/* Optional Section Title & Description */}
      {(title || description) && (
        <div className="relative z-10 mb-8 sm:mb-12 text-center max-w-xl mx-auto">
          {title && (
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground font-serif">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}

      {/* RESPONSIVE LAYOUT DISPATCHER */}
      {breakpoint === "lg" && (
        /* ========================================================================= */
        /* LG DEVICE: 3 Columns x 2 Rows (Staggered Center)                         */
        /* Sequence: 02 visible -> 01 emerges -> 03 emerges -> 04 -> 05 -> 06        */
        /* ========================================================================= */
        <div className="relative z-10 grid grid-cols-3 gap-8 lg:gap-10 w-full max-w-5xl mx-auto items-start">
          {/* Column 1: Items 01 & 04 */}
          <div className="flex flex-col gap-8 lg:gap-10">
            {/* Card 01: Emerges 1st from beneath Card 02 to the left */}
            {items[0] && (
              <ToolkitCard
                duration={duration}
                item={items[0]}
                interactive={interactive}
                isSettled={animStep >= 1}
                emergeStyle={{
                  transform:
                    animStep >= 1
                      ? "translate3d(0, 0, 0) scale(1)"
                      : "translate3d(calc(100% + 2rem), 3.5rem, 0) scale(0.92)",
                  opacity: animStep >= 1 ? 1 : 0,
                  pointerEvents: animStep >= 1 ? "auto" : "none",
                  zIndex: animStep >= 3 ? 25 : 15,
                }}
              />
            )}
            {/* Card 04: Emerges 3rd downwards from beneath Card 01 */}
            {items[3] && (
              <ToolkitCard
                duration={duration}
                item={items[3]}
                interactive={interactive}
                isSettled={animStep >= 3}
                emergeStyle={{
                  transform:
                    animStep >= 3
                      ? "translate3d(0, 0, 0) scale(1)"
                      : "translate3d(0, calc(-100% - 2.5rem), 0) scale(0.92)",
                  opacity: animStep >= 3 ? 1 : 0,
                  pointerEvents: animStep >= 3 ? "auto" : "none",
                  zIndex: 10,
                }}
              />
            )}
          </div>

          {/* Column 2: Items 02 & 05 (Offset downwards for organic rhythm) */}
          <div className="flex flex-col gap-8 lg:gap-10 pt-14">
            {/* Card 02: Visible right from the start! */}
            {items[1] && (
              <ToolkitCard
                duration={duration}
                item={items[1]}
                interactive={interactive}
                isSettled={true}
                emergeStyle={{
                  transform: "translate3d(0, 0, 0) scale(1)",
                  opacity: 1,
                  zIndex: 30,
                }}
              />
            )}
            {/* Card 05: Emerges 4th downwards from beneath Card 02 */}
            {items[4] && (
              <ToolkitCard
                duration={duration}
                item={items[4]}
                interactive={interactive}
                isSettled={animStep >= 4}
                emergeStyle={{
                  transform:
                    animStep >= 4
                      ? "translate3d(0, 0, 0) scale(1)"
                      : "translate3d(0, calc(-100% - 2.5rem), 0) scale(0.92)",
                  opacity: animStep >= 4 ? 1 : 0,
                  pointerEvents: animStep >= 4 ? "auto" : "none",
                  zIndex: 10,
                }}
              />
            )}
          </div>

          {/* Column 3: Items 03 & 06 */}
          <div className="flex flex-col gap-8 lg:gap-10">
            {/* Card 03: Emerges 2nd from beneath Card 02 to the right */}
            {items[2] && (
              <ToolkitCard
                duration={duration}
                item={items[2]}
                interactive={interactive}
                isSettled={animStep >= 2}
                emergeStyle={{
                  transform:
                    animStep >= 2
                      ? "translate3d(0, 0, 0) scale(1)"
                      : "translate3d(calc(-100% - 2rem), 3.5rem, 0) scale(0.92)",
                  opacity: animStep >= 2 ? 1 : 0,
                  pointerEvents: animStep >= 2 ? "auto" : "none",
                  zIndex: animStep >= 5 ? 25 : 15,
                }}
              />
            )}
            {/* Card 06: Emerges 5th downwards from beneath Card 03 */}
            {items[5] && (
              <ToolkitCard
                duration={duration}
                item={items[5]}
                interactive={interactive}
                isSettled={animStep >= 5}
                emergeStyle={{
                  transform:
                    animStep >= 5
                      ? "translate3d(0, 0, 0) scale(1)"
                      : "translate3d(0, calc(-100% - 2.5rem), 0) scale(0.92)",
                  opacity: animStep >= 5 ? 1 : 0,
                  pointerEvents: animStep >= 5 ? "auto" : "none",
                  zIndex: 10,
                }}
              />
            )}
          </div>
        </div>
      )}

      {breakpoint === "md" && (
        /* ========================================================================= */
        /* MD DEVICE: 2 Columns x 3 Rows                                             */
        /* Row 1: [1, 2] visible                                                     */
        /* Row 2: [3, 4] emerges from underneath [1, 2]                              */
        /* Row 3: [5, 6] emerges from underneath [3, 4]                              */
        /* ========================================================================= */
        <div className="relative z-10 grid grid-cols-2 gap-8 w-full max-w-4xl mx-auto items-start">
          {/* Column 1: Items 01, 03, 05 */}
          <div className="flex flex-col gap-8">
            {/* Card 01: Visible right from the start in Row 1 */}
            {items[0] && (
              <ToolkitCard
                duration={duration}
                item={items[0]}
                interactive={interactive}
                isSettled={true}
                emergeStyle={{
                  transform: "translate3d(0, 0, 0) scale(1)",
                  opacity: 1,
                  zIndex: 30,
                }}
              />
            )}
            {/* Card 03: Emerges downwards from beneath Card 01 in Row 2 */}
            {items[2] && (
              <ToolkitCard
                duration={duration}
                item={items[2]}
                interactive={interactive}
                isSettled={animStep >= 1}
                emergeStyle={{
                  transform:
                    animStep >= 1
                      ? "translate3d(0, 0, 0) scale(1)"
                      : "translate3d(0, calc(-100% - 2rem), 0) scale(0.92)",
                  opacity: animStep >= 1 ? 1 : 0,
                  pointerEvents: animStep >= 1 ? "auto" : "none",
                  zIndex: animStep >= 2 ? 20 : 15,
                }}
              />
            )}
            {/* Card 05: Emerges downwards from beneath Card 03 in Row 3 */}
            {items[4] && (
              <ToolkitCard
                duration={duration}
                item={items[4]}
                interactive={interactive}
                isSettled={animStep >= 2}
                emergeStyle={{
                  transform:
                    animStep >= 2
                      ? "translate3d(0, 0, 0) scale(1)"
                      : "translate3d(0, calc(-100% - 2rem), 0) scale(0.92)",
                  opacity: animStep >= 2 ? 1 : 0,
                  pointerEvents: animStep >= 2 ? "auto" : "none",
                  zIndex: 10,
                }}
              />
            )}
          </div>

          {/* Column 2: Items 02, 04, 06 */}
          <div className="flex flex-col gap-8">
            {/* Card 02: Visible right from the start in Row 1 */}
            {items[1] && (
              <ToolkitCard
                duration={duration}
                item={items[1]}
                interactive={interactive}
                isSettled={true}
                emergeStyle={{
                  transform: "translate3d(0, 0, 0) scale(1)",
                  opacity: 1,
                  zIndex: 30,
                }}
              />
            )}
            {/* Card 04: Emerges downwards from beneath Card 02 in Row 2 */}
            {items[3] && (
              <ToolkitCard
                duration={duration}
                item={items[3]}
                interactive={interactive}
                isSettled={animStep >= 1}
                emergeStyle={{
                  transform:
                    animStep >= 1
                      ? "translate3d(0, 0, 0) scale(1)"
                      : "translate3d(0, calc(-100% - 2rem), 0) scale(0.92)",
                  opacity: animStep >= 1 ? 1 : 0,
                  pointerEvents: animStep >= 1 ? "auto" : "none",
                  zIndex: animStep >= 2 ? 20 : 15,
                }}
              />
            )}
            {/* Card 06: Emerges downwards from beneath Card 04 in Row 3 */}
            {items[5] && (
              <ToolkitCard
                duration={duration}
                item={items[5]}
                interactive={interactive}
                isSettled={animStep >= 2}
                emergeStyle={{
                  transform:
                    animStep >= 2
                      ? "translate3d(0, 0, 0) scale(1)"
                      : "translate3d(0, calc(-100% - 2rem), 0) scale(0.92)",
                  opacity: animStep >= 2 ? 1 : 0,
                  pointerEvents: animStep >= 2 ? "auto" : "none",
                  zIndex: 10,
                }}
              />
            )}
          </div>
        </div>
      )}

      {breakpoint === "sm" && (
        /* ========================================================================= */
        /* SM DEVICE (Mobile): 1 Column x 6 Rows                                     */
        /* Sequence: 1 visible -> 2 from under 1 -> 3 from under 2 -> 4 -> 5 -> 6     */
        /* ========================================================================= */
        <div className="relative z-10 flex flex-col gap-6 w-full max-w-sm mx-auto items-stretch">
          {/* Card 01: Visible right from the start */}
          {items[0] && (
            <ToolkitCard
                duration={duration}
              item={items[0]}
              interactive={interactive}
              isSettled={true}
              emergeStyle={{
                transform: "translate3d(0, 0, 0) scale(1)",
                opacity: 1,
                zIndex: 35,
              }}
            />
          )}
          {/* Card 02: Emerges downwards from beneath Card 01 */}
          {items[1] && (
            <ToolkitCard
                duration={duration}
              item={items[1]}
              interactive={interactive}
              isSettled={animStep >= 1}
              emergeStyle={{
                transform:
                  animStep >= 1
                    ? "translate3d(0, 0, 0) scale(1)"
                    : "translate3d(0, calc(-100% - 1.5rem), 0) scale(0.92)",
                opacity: animStep >= 1 ? 1 : 0,
                pointerEvents: animStep >= 1 ? "auto" : "none",
                zIndex: animStep >= 2 ? 30 : 25,
              }}
            />
          )}
          {/* Card 03: Emerges downwards from beneath Card 02 */}
          {items[2] && (
            <ToolkitCard
                duration={duration}
              item={items[2]}
              interactive={interactive}
              isSettled={animStep >= 2}
              emergeStyle={{
                transform:
                  animStep >= 2
                    ? "translate3d(0, 0, 0) scale(1)"
                    : "translate3d(0, calc(-100% - 1.5rem), 0) scale(0.92)",
                opacity: animStep >= 2 ? 1 : 0,
                pointerEvents: animStep >= 2 ? "auto" : "none",
                zIndex: animStep >= 3 ? 25 : 20,
              }}
            />
          )}
          {/* Card 04: Emerges downwards from beneath Card 03 */}
          {items[3] && (
            <ToolkitCard
                duration={duration}
              item={items[3]}
              interactive={interactive}
              isSettled={animStep >= 3}
              emergeStyle={{
                transform:
                  animStep >= 3
                    ? "translate3d(0, 0, 0) scale(1)"
                    : "translate3d(0, calc(-100% - 1.5rem), 0) scale(0.92)",
                opacity: animStep >= 3 ? 1 : 0,
                pointerEvents: animStep >= 3 ? "auto" : "none",
                zIndex: animStep >= 4 ? 20 : 15,
              }}
            />
          )}
          {/* Card 05: Emerges downwards from beneath Card 04 */}
          {items[4] && (
            <ToolkitCard
                duration={duration}
              item={items[4]}
              interactive={interactive}
              isSettled={animStep >= 4}
              emergeStyle={{
                transform:
                  animStep >= 4
                    ? "translate3d(0, 0, 0) scale(1)"
                    : "translate3d(0, calc(-100% - 1.5rem), 0) scale(0.92)",
                opacity: animStep >= 4 ? 1 : 0,
                pointerEvents: animStep >= 4 ? "auto" : "none",
                zIndex: animStep >= 5 ? 15 : 10,
              }}
            />
          )}
          {/* Card 06: Emerges downwards from beneath Card 05 */}
          {items[5] && (
            <ToolkitCard
                duration={duration}
              item={items[5]}
              interactive={interactive}
              isSettled={animStep >= 5}
              emergeStyle={{
                transform:
                  animStep >= 5
                    ? "translate3d(0, 0, 0) scale(1)"
                    : "translate3d(0, calc(-100% - 1.5rem), 0) scale(0.92)",
                opacity: animStep >= 5 ? 1 : 0,
                pointerEvents: animStep >= 5 ? "auto" : "none",
                zIndex: 5,
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

function ToolkitCard({
  item,
  interactive,
  isSettled,
  emergeStyle,
  duration = 1150,
}: {
  item: ToolkitItem;
  interactive?: boolean;
  isSettled?: boolean;
  emergeStyle?: React.CSSProperties;
  duration?: number;
}) {
  const accent = ACCENT_STYLES[item.accentColor] || ACCENT_STYLES.blue;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        item.onClick?.();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          item.onClick?.();
        }
      }}
      style={{
        ...emergeStyle,
        transition: `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${Math.round(
          duration * 0.65,
        )}ms ease-out, box-shadow 400ms ease`,
      }}
      className={cn(
        "group relative rounded-[28px] p-2.5 sm:p-3 border-2 will-change-transform text-left outline-none select-none",
        accent.outerBorder,
        accent.tagGlow,
        interactive &&
          isSettled &&
          "hover:-translate-y-1.5 hover:shadow-xl hover:z-40 cursor-pointer active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-primary",
      )}
    >
      {/* 3D Pushpin on the top border */}
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
        <PushPin color={item.pinColor || accent.pin} />
      </div>

      {/* Inner Card White Body */}
      <div className="relative z-10 w-full rounded-[20px] bg-card text-card-foreground p-5 sm:p-6 shadow-sm border border-border/40 flex flex-col justify-between min-h-[180px] sm:min-h-[200px]">
        {/* Top Row: Number & Logo */}
        <div className="flex items-center justify-between gap-3">
          <span
            className={cn(
              "text-2xl sm:text-3xl font-extrabold tracking-tight font-sans leading-none",
              accent.numColor,
            )}
          >
            {item.number}
          </span>

          <div
            className={cn(
              "w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105",
              item.logoBg || "bg-primary text-primary-foreground",
            )}
          >
            {item.icon}
          </div>
        </div>

        {/* Title & Description */}
        <div className="mt-4 flex-1">
          <h4 className="text-base sm:text-lg font-bold tracking-tight text-foreground flex items-center gap-1.5 font-sans">
            <span>{item.title}</span>
          </h4>
          <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed mt-1.5">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}
