"use client";

import React, { useEffect, useRef, useState, useId } from "react";
import {
  TrendingUp,
  Users,
  ShieldCheck,
  Sparkles,
  Zap,
  RotateCcw,
  Star,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * True while the element is on screen, false again once it has fully left.
 * It flips on when a quarter of it has scrolled in — or when it is already
 * partly showing as the page loads — and off only when none of it shows.
 */
function useInView(ref: React.RefObject<Element | null>, amount: number) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (entry) setInView(entry.isIntersecting);
      },
      { threshold: amount },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, amount]);
  return inView;
}

// ==========================================
// TYPES & DATA STRUCTURES
// ==========================================
export type CounterSectionVariant =
  | "cyber-hud"         // High-tech terminal HUD with character scramble/decryption (Light & Dark)
  | "minimal-slash"     // Inspired by image 1: Clean high-impact typographic stats with /MONO labels
  | "halftone-cinema"   // Inspired by image 2: Halftone strip with hairline dividers (Light & Dark)
  | "spotlight-gradient";// Cursor-tracking radial spotlight with shimmering gradient typography

export interface StatItem {
  id?: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  sublabel?: string;
  tag?: string;
  trend?: string;
  icon?: React.ReactNode;
}

export interface CounterSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CounterSectionVariant;
  eyebrow?: string;
  heading?: string;
  description?: string;
  stats?: StatItem[];
  allowReplay?: boolean;
}

// Default presets for the 5 variants
export const DEFAULT_STATS: Record<CounterSectionVariant, StatItem[]> = {
  "minimal-slash": [
    {
      value: 130,
      prefix: "$",
      suffix: "M",
      label: "/REVENUE UNLOCKED",
      sublabel: "Processed securely across global commerce partners",
      tag: "+42% YoY",
    },
    {
      value: 98,
      suffix: "%",
      label: "/CLIENT SATISFACTION",
      sublabel: "Verified feedback score from over 1,200 enterprises",
      tag: "Top 1%",
    },
    {
      value: 90,
      suffix: "+",
      label: "/INDUSTRIES SERVED",
      sublabel: "From fintech innovators to deep-tech logistics",
      tag: "Global",
    },
    {
      value: 4.9,
      decimals: 1,
      suffix: "★",
      label: "/GLOBAL RATING",
      sublabel: "Independent peer review score on Gartner & G2",
      tag: "Leader",
    },
  ],
  "halftone-cinema": [
    {
      value: 60,
      suffix: "+",
      label: "Years of experience",
      sublabel: "Pioneering architectural and computational design",
    },
    {
      value: 97,
      suffix: "%",
      label: "Client retention rate",
      sublabel: "Long-term partnership contracts spanning multiple decades",
    },
    {
      value: 100,
      suffix: "+m",
      label: "Sq. Ft. currently managed",
      sublabel: "Sustainable grade-A commercial real estate and facilities",
    },
    {
      value: 98,
      label: "Quality audit score",
      sublabel: "Zero non-compliance marks on international safety audits",
    },
  ],
  "spotlight-gradient": [
    {
      value: 850,
      suffix: "K+",
      label: "Daily Active Sessions",
      sublabel: "Powering modern user experiences on web and mobile",
      tag: "Fast",
      icon: <Users className="w-5 h-5" />,
    },
    {
      value: 12,
      suffix: "ms",
      label: "Median Edge Latency",
      sublabel: "Global compute routing under sub-15 millisecond target",
      tag: "Ultra Low",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      value: 99.9,
      decimals: 1,
      suffix: "%",
      label: "Security Audit Grade",
      sublabel: "SOC2 Type II, ISO 27001, and HIPAA compliance verified",
      tag: "Certified",
      icon: <ShieldCheck className="w-5 h-5" />,
    },
    {
      value: 3.2,
      decimals: 1,
      prefix: "",
      suffix: "x",
      label: "Efficiency Acceleration",
      sublabel: "Average engineering velocity increase reported by engineering teams",
      tag: "Productivity",
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ],
  "cyber-hud": [
    {
      value: 2.4,
      decimals: 1,
      prefix: "$",
      suffix: "B",
      label: "LIQUIDITY POOL RESERVE",
      sublabel: "VERIFIED MULTI-SIG ON-CHAIN VAULT",
      tag: "SEC-L3",
    },
    {
      value: 99.999,
      decimals: 3,
      suffix: "%",
      label: "CONSENSUS SYNCHRONIZATION",
      sublabel: "ZERO DIVERGENCE EPOCH ROUNDS",
      tag: "BFT-PASS",
    },
    {
      value: 180,
      suffix: "+",
      label: "VALIDATOR EDGE NODES",
      sublabel: "DISTRIBUTED GEOGRAPHIC SHARDING",
      tag: "ACTIVE",
    },
    {
      value: 45,
      suffix: "K/s",
      label: "TPS THROUGHPUT CAPACITY",
      sublabel: "PARALLEL PIPELINED EXECUTION",
      tag: "PEAK",
    },
  ],
};

// ==========================================
// ANIMATED NUMBER TICKER
// ==========================================
interface AnimatedNumberProps {
  value: number;
  duration?: number;
  decimals?: number;
  trigger?: boolean;
}

export function AnimatedNumber({
  value,
  duration = 2000,
  decimals = 0,
  trigger = true,
}: AnimatedNumberProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!trigger) {
      setCurrent(0);
      return;
    }

    const startTime = performance.now();
    let animId = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // EaseOutQuart easing formula: 1 - pow(1 - x, 4)
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const val = easeProgress * value;

      setCurrent(val);

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        setCurrent(value);
      }
    };

    // The latest frame is the one to cancel, so a re-trigger mid-count stops
    // the old loop instead of leaving two fighting over the number.
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [value, duration, trigger]);

  const formatted =
    decimals > 0
      ? current.toFixed(decimals)
      : Math.round(current).toLocaleString();

  return <span>{formatted}</span>;
}

// Scramble text effect for Cyber HUD
function ScrambleCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  trigger = true,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  trigger?: boolean;
}) {
  const finalStr = `${prefix}${decimals > 0 ? value.toFixed(decimals) : value}${suffix}`;
  const [display, setDisplay] = useState(finalStr);
  const chars = "0123456789ABCDEF#%&*";

  useEffect(() => {
    if (!trigger) return;

    let iteration = 0;
    const totalIterations = 14;

    const interval = setInterval(() => {
      setDisplay(
        finalStr
          .split("")
          .map((_, index) => {
            if (index < (iteration / totalIterations) * finalStr.length) {
              return finalStr[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iteration += 1;
      if (iteration > totalIterations) {
        clearInterval(interval);
        setDisplay(finalStr);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [trigger, finalStr]);

  return <span>{display}</span>;
}

// ==========================================
// 1. VARIANT: MINIMAL-SLASH (Inspired by Image 1)
// Clean high-contrast typography, monospace uppercase /LABELS
// ==========================================
function MinimalSlashSection({
  stats,
  isInView,
  triggerKey,
}: {
  stats: StatItem[];
  isInView: boolean;
  triggerKey: number;
}) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {stats.map((stat, idx) => (
        <div
          key={`${stat.label}-${idx}-${triggerKey}`}
          className="group relative rounded-2xl border border-border/80 bg-card/60 dark:bg-card/40 backdrop-blur-md p-6 sm:p-7 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-primary/50 hover:bg-card/90"
        >
          {/* Top Shimmer Beam on Hover */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary transition-all duration-500" />

          {/* Faded Giant Watermark Index in Background */}
          <span className="absolute -right-2 -bottom-4 font-mono font-black text-8xl text-foreground/[0.03] dark:text-foreground/[0.04] select-none pointer-events-none group-hover:text-primary/[0.08] transition-colors duration-500">
            0{idx + 1}
          </span>

          <div>
            {/* Top row: Slash Index + Badge */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-muted-foreground/70 group-hover:text-primary transition-colors">
                <span className="text-primary font-black">{"//"}</span> 0{idx + 1}
              </span>
              {stat.tag && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium tracking-tight bg-primary/10 text-primary border border-primary/20 group-hover:border-primary/40 transition-colors">
                  {idx === 0 && <TrendingUp className="w-3 h-3 text-emerald-500" />}
                  {idx === 1 && <ShieldCheck className="w-3 h-3 text-primary" />}
                  {idx === 2 && <Globe className="w-3 h-3 text-sky-500" />}
                  {idx === 3 && <Star className="w-3 h-3 fill-amber-400 text-amber-400" />}
                  {stat.tag}
                </span>
              )}
            </div>

            {/* Giant Metric Display */}
            <div className="my-4 flex items-baseline tracking-tight">
              {stat.prefix && (
                <span className="text-2xl sm:text-3xl font-light text-muted-foreground/80 mr-1">
                  {stat.prefix}
                </span>
              )}
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground font-sans transition-colors duration-300 group-hover:text-primary">
                <AnimatedNumber
                  value={stat.value}
                  decimals={stat.decimals ?? 0}
                  duration={1800}
                  trigger={isInView}
                />
              </span>
              {stat.suffix === "★" ? (
                <span className="inline-flex items-center text-amber-400 ml-1.5 -translate-y-1">
                  <Star className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 fill-amber-400 text-amber-400" />
                </span>
              ) : (
                stat.suffix && (
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary ml-1 font-mono">
                    {stat.suffix}
                  </span>
                )
              )}
            </div>

            {/* Animated Horizontal Slash Bar */}
            <div className="h-[2px] w-8 bg-primary/30 group-hover:w-full group-hover:bg-primary transition-all duration-500 ease-out my-3 rounded-full" />
          </div>

          {/* Monospace Uppercase Slash Label & Sublabel */}
          <div className="mt-2 pt-2">
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider text-foreground uppercase group-hover:text-primary transition-colors duration-200">
              <span className="text-primary font-black text-sm">/</span>
              <span>{stat.label.replace(/^\//, "")}</span>
            </div>

            {stat.sublabel && (
              <p className="text-xs text-muted-foreground leading-relaxed font-sans mt-1.5 line-clamp-2">
                {stat.sublabel}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// 2. VARIANT: HALFTONE-CINEMA (Inspired by Image 2)
// Architectural Halftone Strip - Fully Theme-Adaptive (Clean Light & Moody Dark)
// ==========================================
function HalftoneCinemaSection({
  stats,
  isInView,
  triggerKey,
}: {
  stats: StatItem[];
  isInView: boolean;
  triggerKey: number;
}) {
  const patternId = useId();

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-200 dark:bg-[#0c0c0f] dark:border-white/10 text-foreground transition-colors duration-200">
      {/* Halftone Dot Matrix Pattern overlay - Theme adaptive */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-25 mix-blend-multiply dark:mix-blend-screen">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id={patternId}
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.2" fill="currentColor" opacity="0.4" />
              <circle cx="10" cy="10" r="1.8" fill="currentColor" opacity="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
      </div>

      {/* Atmospheric gradient fade from center to edges */}
      <div className="absolute inset-0 bg-radial from-transparent via-zinc-100/50 to-zinc-100/90 dark:via-[#0c0c0f]/60 dark:to-[#0c0c0f] pointer-events-none" />

      {/* Top hairline border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 dark:via-white/30 to-transparent" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-white/10">
        {stats.map((stat, idx) => (
          <div
            key={`${stat.label}-${idx}-${triggerKey}`}
            className="group relative p-6 sm:p-8 lg:p-10 flex flex-col justify-between transition-colors duration-300 hover:bg-black/[0.02] dark:hover:bg-white/[0.03]"
          >
            {/* Top Dot crosshair anchor */}
            <div className="absolute top-0 right-0 w-2 h-2 -mr-1 -mt-1 rounded-full bg-zinc-300 dark:bg-white/20 hidden lg:block pointer-events-none" />

            <div>
              {/* Stat Number */}
              <div className="flex items-baseline text-4xl sm:text-5xl lg:text-6xl font-sans font-light tracking-tight text-zinc-950 dark:text-white mb-3">
                {stat.prefix && <span className="font-extralight text-zinc-600 dark:text-white/80 mr-0.5">{stat.prefix}</span>}
                <span className="font-semibold text-zinc-950 dark:text-white tracking-tighter">
                  <AnimatedNumber
                    value={stat.value}
                    decimals={stat.decimals ?? 0}
                    duration={2000}
                    trigger={isInView}
                  />
                </span>
                {stat.suffix && (
                  <span className="font-normal text-zinc-800 dark:text-white/90 ml-1 text-3xl sm:text-4xl">
                    {stat.suffix}
                  </span>
                )}
              </div>

              {/* Title / Label */}
              <h4 className="text-sm font-medium text-zinc-800 dark:text-white/90 tracking-normal mb-1.5 group-hover:text-primary transition-colors duration-200">
                {stat.label}
              </h4>
            </div>

            {/* Sublabel description */}
            {stat.sublabel && (
              <p className="text-xs text-zinc-500 dark:text-white/50 leading-relaxed font-sans mt-3 border-t border-zinc-200 dark:border-white/5 pt-3">
                {stat.sublabel}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Bottom hairline border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 dark:via-white/20 to-transparent" />
    </div>
  );
}

// ==========================================
// 4. VARIANT: SPOTLIGHT-GRADIENT
// Interactive mouse-tracking spotlight gradient, glowing modern floating cards
// ==========================================
function SpotlightGradientSection({
  stats,
  isInView,
  triggerKey,
}: {
  stats: StatItem[];
  isInView: boolean;
  triggerKey: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full p-6 sm:p-8 rounded-3xl border border-border/70 bg-card/40 backdrop-blur-md overflow-hidden transition-colors"
    >
      {/* Subtle ambient dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Interactive Cursor Spotlight Radial Gradient */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, color-mix(in oklab, var(--primary) 20%, transparent), transparent 75%)`,
        }}
      />

      {/* 4 Sleek Floating Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((stat, idx) => (
          <div
            key={`${stat.label}-${idx}-${triggerKey}`}
            className="group relative rounded-2xl border border-border/70 bg-background/60 dark:bg-card/40 backdrop-blur-md p-6 flex flex-col justify-between transition-all duration-300 hover:border-primary/50 hover:bg-background/80 dark:hover:bg-card/60"
          >
            {/* Subtle inner top glow beam on hover */}
            <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary/30 group-hover:via-primary to-transparent transition-all duration-500 opacity-60 group-hover:opacity-100" />

            <div>
              {/* Header: Icon & Tag */}
              <div className="flex items-center justify-between gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105">
                  {stat.icon || <Sparkles className="w-5 h-5" />}
                </div>
                {stat.tag && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-muted/80 text-muted-foreground border border-border/80 group-hover:border-primary/30 group-hover:text-foreground transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-primary animate-pulse" />
                    {stat.tag}
                  </span>
                )}
              </div>

              {/* Metric Counter Number */}
              <div className="mt-6 mb-2">
                <div className="flex items-baseline gap-0.5">
                  {stat.prefix && (
                    <span className="text-2xl font-bold text-muted-foreground/80 mr-0.5">
                      {stat.prefix}
                    </span>
                  )}
                  <span className="text-4xl sm:text-5xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                    <AnimatedNumber
                      value={stat.value}
                      decimals={stat.decimals ?? 0}
                      duration={2000}
                      trigger={isInView}
                    />
                  </span>
                  {stat.suffix && (
                    <span className="text-2xl sm:text-3xl font-bold text-primary ml-0.5 font-mono">
                      {stat.suffix}
                    </span>
                  )}
                </div>
              </div>

              {/* Label and Sublabel */}
              <div className="mt-1">
                <h4 className="text-sm font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors duration-200">
                  {stat.label}
                </h4>
                {stat.sublabel && (
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">
                    {stat.sublabel}
                  </p>
                )}
              </div>
            </div>

            {/* Bottom Micro-Visual Indicator per card */}
            <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
              {idx === 0 && (
                <>
                  <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Live traffic
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground/80">99.8% hit</span>
                </>
              )}
              {idx === 1 && (
                <>
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-3 rounded-full bg-emerald-500" />
                    <span className="h-1.5 w-3 rounded-full bg-emerald-500" />
                    <span className="h-1.5 w-3 rounded-full bg-emerald-500" />
                    <span className="h-1.5 w-3 rounded-full bg-muted-foreground/30" />
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground/80">32 Edge PoPs</span>
                </>
              )}
              {idx === 2 && (
                <>
                  <span className="inline-flex items-center gap-1 text-primary font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" /> SOC2 Type II
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground/80">Audited</span>
                </>
              )}
              {idx === 3 && (
                <>
                  <span className="inline-flex items-center gap-1 text-primary font-medium">
                    <TrendingUp className="w-3.5 h-3.5" /> +220% output
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground/80">Measured</span>
                </>
              )}
              {idx > 3 && (
                <>
                  <span className="text-emerald-500 font-medium">Active</span>
                  <span className="font-mono text-[10px] text-muted-foreground/80">Verified</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 5. VARIANT: CYBER-HUD
// High-tech terminal dashboard - Fully Theme-Adaptive (Clean Light & Sleek Dark)
// ==========================================
function CyberHudSection({
  stats,
  isInView,
  triggerKey,
}: {
  stats: StatItem[];
  isInView: boolean;
  triggerKey: number;
}) {
  return (
    <div className="relative w-full rounded-2xl border border-primary/40 bg-zinc-50 dark:bg-zinc-950 text-foreground dark:text-zinc-100 p-6 sm:p-8 font-mono overflow-hidden transition-colors duration-200">
      {/* Corner crosshairs [+] */}
      <span className="absolute top-2 left-2 text-xs text-primary/70 select-none">[+]</span>
      <span className="absolute top-2 right-2 text-xs text-primary/70 select-none">[+]</span>
      <span className="absolute bottom-2 left-2 text-xs text-primary/70 select-none">[+]</span>
      <span className="absolute bottom-2 right-2 text-xs text-primary/70 select-none">[+]</span>

      {/* Cyber Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.12)_50%)] dark:bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-25 dark:opacity-40 -z-10" />

      {/* Telemetry Header */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-200 dark:border-zinc-800 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="tracking-wider uppercase text-emerald-600 dark:text-emerald-400 font-semibold">
            TELEMETRY NODE // CLUSTER-09
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-zinc-500">
          <span>LATENCY: 14MS</span>
          <span>UPTIME: 99.999%</span>
          <span>STATUS: ONLINE</span>
        </div>
      </div>

      {/* 4 HUD Metric Panels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={`${stat.label}-${idx}-${triggerKey}`}
            className="relative p-4 rounded-xl border border-zinc-200 bg-white/80 dark:border-zinc-800 dark:bg-zinc-900/60 backdrop-blur-md flex flex-col justify-between group hover:border-primary/60 transition-colors duration-200"
          >
            {/* Top Tag & Code ID */}
            <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-2">
              <span className="tracking-widest uppercase">STAT://0{idx + 1}</span>
              {stat.tag && (
                <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary dark:bg-primary/20 border border-primary/30 font-semibold">
                  {stat.tag}
                </span>
              )}
            </div>

            {/* Giant Metric with Scramble Decryption */}
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-950 dark:text-white my-2 group-hover:text-primary transition-colors duration-200">
              <ScrambleCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimals={stat.decimals ?? 0}
                trigger={isInView}
              />
            </div>

            {/* Label and Sublabel */}
            <div className="pt-2 border-t border-zinc-200/80 dark:border-zinc-800/80">
              <div className="text-xs font-semibold tracking-wider text-zinc-800 dark:text-zinc-300 uppercase">
                {stat.label}
              </div>
              {stat.sublabel && (
                <div className="text-[10px] text-zinc-500 mt-1 uppercase tracking-tight">
                  {stat.sublabel}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// MAIN EXPORTED COMPONENT: CounterSection
// ==========================================
export function CounterSection({
  variant = "cyber-hud",
  eyebrow,
  heading,
  description,
  stats,
  allowReplay = false,
  className,
  ...props
}: CounterSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, 0.25);
  const [triggerKey, setTriggerKey] = useState(0);

  const activeStats = stats || DEFAULT_STATS[variant];

  const handleReplay = () => {
    setTriggerKey((k) => k + 1);
  };

  const hasHeader = Boolean(eyebrow || heading || description || allowReplay);

  return (
    <section
      ref={containerRef}
      className={cn("w-full py-2 pl-[15px] pr-[10px]", className)}
      {...props}
    >
      {/* Optional Section Header - only shown if explicitly provided */}
      {hasHeader && (
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div className="max-w-2xl">
            {eyebrow && (
              <span className="inline-block text-xs font-mono font-semibold tracking-wider uppercase text-primary mb-2">
                {eyebrow}
              </span>
            )}
            {heading && (
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
                {heading}
              </h2>
            )}
            {description && (
              <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {allowReplay && (
            <button
              onClick={handleReplay}
              title="Replay counter animation"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-foreground text-xs font-medium hover:bg-accent transition-colors duration-150 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Replay
            </button>
          )}
        </div>
      )}

      {/* Variant Renderer */}
      {variant === "minimal-slash" && (
        <MinimalSlashSection
          stats={activeStats}
          isInView={isInView}
          triggerKey={triggerKey}
        />
      )}
      {variant === "halftone-cinema" && (
        <HalftoneCinemaSection
          stats={activeStats}
          isInView={isInView}
          triggerKey={triggerKey}
        />
      )}
      {variant === "spotlight-gradient" && (
        <SpotlightGradientSection
          stats={activeStats}
          isInView={isInView}
          triggerKey={triggerKey}
        />
      )}
      {variant === "cyber-hud" && (
        <CyberHudSection
          stats={activeStats}
          isInView={isInView}
          triggerKey={triggerKey}
        />
      )}
    </section>
  );
}

export default CounterSection;
