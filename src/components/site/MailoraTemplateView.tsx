"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { RadioIcon } from "@/components/ui/radio-icon";
import type { RadarIconHandle } from "@/components/ui/radar-icon";
import { MailIcon, type MailIconHandle } from "@/components/ui/mail-icon";
import { TwitterIcon, type TwitterIconHandle } from "@/components/ui/twitter-icon";
import {
  InstagramIcon,
  type InstagramIconHandle,
} from "@/components/ui/instagram-icon";
import { TargetIcon, type TargetIconHandle } from "@/components/ui/target-icon";
import { TrophyIcon, type TrophyIconHandle } from "@/components/ui/trophy-icon";
import {
  MegaphoneIcon,
  type MegaphoneIconHandle,
} from "@/components/ui/megaphone-icon";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Award,
  BarChart2,
  CheckCircle2,
  ChevronDown,
  CloudCog,
  Copy,
  Eye,
  Flag,
  Globe,
  Home,
  Menu,
  Moon,
  MoreHorizontal,
  MoreVertical,
  PieChart,
  Play,
  Plus,
  Sun,
  Target,
  TrendingUp,
  Users,
  Wand2,
  X,
  Zap,
} from "lucide-react";
import { TemplatePage, type TemplatePreviewTab } from "@/components/site/TemplatePage";
import { cn } from "@/lib/utils";

function AnimatedMailLogo({
  prefersReducedMotion,
  size = 21,
  color = "#ffffff",
  className = "pl-1 text-white",
}: {
  prefersReducedMotion: boolean | null;
  size?: number;
  color?: string;
  className?: string;
}) {
  const iconRef = useRef<RadarIconHandle>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let intervalId: ReturnType<typeof setInterval> | undefined;
    let resetTimerId: ReturnType<typeof setTimeout> | undefined;

    const trigger = () => {
      iconRef.current?.stopAnimation();
      resetTimerId = setTimeout(() => {
        iconRef.current?.startAnimation();
      }, 60);
    };

    const startTimer = setTimeout(() => {
      trigger();
      intervalId = setInterval(trigger, 3200);
    }, 250);

    return () => {
      clearTimeout(startTimer);
      if (resetTimerId) clearTimeout(resetTimerId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [prefersReducedMotion]);

  return (
    <span className={cn("flex items-center justify-center", className)}>
      <RadioIcon
        ref={iconRef}
        size={size}
        duration={2.0}
        isAnimated={!prefersReducedMotion}
        color={color}
      />
    </span>
  );
}

function FooterSocialIconButton({
  label,
  delayMs,
  prefersReducedMotion,
  isDark,
  renderIcon,
}: {
  label: string;
  delayMs: number;
  prefersReducedMotion: boolean | null;
  isDark: boolean;
  renderIcon: (ref: React.RefObject<{ startAnimation: () => void; stopAnimation: () => void } | null>) => React.ReactNode;
}) {
  const iconRef = useRef<{ startAnimation: () => void; stopAnimation: () => void } | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let intervalId: ReturnType<typeof setInterval> | undefined;
    let resetTimerId: ReturnType<typeof setTimeout> | undefined;

    const trigger = () => {
      iconRef.current?.stopAnimation();
      resetTimerId = setTimeout(() => {
        iconRef.current?.startAnimation();
      }, 60);
    };

    const startTimer = setTimeout(() => {
      trigger();
      intervalId = setInterval(trigger, 3600);
    }, 300 + delayMs);

    return () => {
      clearTimeout(startTimer);
      if (resetTimerId) clearTimeout(resetTimerId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [prefersReducedMotion, delayMs]);

  return (
    <button
      type="button"
      aria-label={label}
      onMouseEnter={() => {
        if (!prefersReducedMotion) iconRef.current?.startAnimation();
      }}
      className={cn(
        "flex size-6 items-center justify-center rounded-md transition-colors cursor-pointer",
        isDark
          ? "bg-primary/15 text-primary hover:bg-primary/25"
          : "bg-primary/12 text-primary hover:bg-primary/20",
      )}
    >
      {renderIcon(iconRef)}
    </button>
  );
}

function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  decimals = 0,
  useLocale = false,
  prefersReducedMotion,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  useLocale?: boolean;
  prefersReducedMotion: boolean | null;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [displayValue, setDisplayValue] = useState(
    prefersReducedMotion ? target : 0,
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(target);
      return;
    }
    if (!isInView) return;

    let rafId = 0;
    const duration = 1100;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(target * eased);
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target, prefersReducedMotion]);

  const formatted =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : useLocale
        ? Math.round(displayValue).toLocaleString("en-US")
        : Math.round(displayValue).toString();

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

function MetricBadgeWithAnimatedIcon({
  badge,
  delayMs,
  prefersReducedMotion,
  isDark,
  renderIcon,
}: {
  badge: string;
  delayMs: number;
  prefersReducedMotion: boolean | null;
  isDark: boolean;
  renderIcon: (
    ref: React.RefObject<{
      startAnimation: () => void;
      stopAnimation: () => void;
    } | null>,
  ) => React.ReactNode;
}) {
  const iconRef = useRef<{
    startAnimation: () => void;
    stopAnimation: () => void;
  } | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let intervalId: ReturnType<typeof setInterval> | undefined;
    let resetTimerId: ReturnType<typeof setTimeout> | undefined;

    const trigger = () => {
      iconRef.current?.stopAnimation();
      resetTimerId = setTimeout(() => {
        iconRef.current?.startAnimation();
      }, 60);
    };

    const startTimer = setTimeout(() => {
      trigger();
      intervalId = setInterval(trigger, 3400);
    }, 300 + delayMs);

    return () => {
      clearTimeout(startTimer);
      if (resetTimerId) clearTimeout(resetTimerId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [prefersReducedMotion, delayMs]);

  return (
    <span
      onMouseEnter={() => {
        if (!prefersReducedMotion) iconRef.current?.startAnimation();
      }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[10.5px] font-medium",
        isDark ? "bg-primary/15 text-primary" : "bg-primary/12 text-primary",
      )}
    >
      {renderIcon(iconRef)}
      <span>{badge}</span>
    </span>
  );
}

function MailoraHeroPreview({
  theme,
  onToggleTheme,
}: {
  theme: "light" | "dark";
  onToggleTheme?: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  const isDark = theme === "dark";
  const prefersReducedMotion = useReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [targetName, setTargetName] = useState("Spring Onboarding");
  const [customerTypes, setCustomerTypes] = useState([
    "Founders",
    "Marketers",
    "SaaS",
    "Creators",
  ]);
  const [audienceReachStep, setAudienceReachStep] = useState(5);
  const [subjectIndex, setSubjectIndex] = useState(0);

  const generatedSubjects = [
    "Your onboarding checklist is ready — launch in 5 minutes",
    "Quick tip: triple your weekly open rate with smart triggers",
    "Don't miss your 30-day deliverability audit report",
  ];

  const extraCustomerTypes = ["Agency", "Retail", "Enterprise", "Startups"];
  const handleAddCustomerType = () => {
    const next = extraCustomerTypes.find((t) => !customerTypes.includes(t));
    if (next) {
      setCustomerTypes((prev) => [...prev, next]);
    }
  };

  const navItems = [
    { label: "Overview", active: true, hasDropdown: false },
    { label: "Product", active: false, hasDropdown: true },
    { label: "Workflows", active: false, hasDropdown: false },
    { label: "Plans", active: false, hasDropdown: false },
    { label: "Support", active: false, hasDropdown: false },
  ];

  const floatingCardClass = cn(
    "rounded-2xl border backdrop-blur-sm transition-colors",
    isDark
      ? "border-primary/[0.12] bg-[#141720]/95"
      : "border-primary/[0.1] bg-white/95",
  );

  return (
    <div
      className={cn(
        "@container relative w-full overflow-x-clip px-4 @sm:px-6 @lg:px-8 transition-colors duration-300",
        isDark ? "bg-[#0B0D12] text-zinc-100" : "bg-white text-zinc-900",
      )}
    >
      {/* Hero + Navbar + Edge-Anchored Floating Cards */}
      <div
        className={cn(
          "relative -mx-4 @sm:-mx-6 @lg:-mx-8 px-4 @sm:px-6 @lg:px-8 pt-5 @lg:pt-6 pb-8 min-h-[600px] @lg:min-h-[640px] overflow-hidden transition-colors",
          !isDark && "bg-[#F9F9F9]",
        )}
      >
      {/* Large Subtle Edge-Only Architectural Boxes + Warm Peach Tinted Cells */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_right,black_0%,transparent_34%,transparent_66%,black_100%)]"
      >
        {/* Warm-tinted 112px box grid */}
        <div
          className={cn(
            "absolute inset-0",
            isDark
              ? "bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:112px_112px]"
              : "bg-[linear-gradient(to_right,color-mix(in_oklab,var(--primary)_5%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--primary)_5%,transparent)_1px,transparent_1px)] bg-[size:112px_112px]",
          )}
        />

        {/* Crisp 112px-aligned warm peach-tinted cells on left */}
        <div
          className={cn(
            "absolute left-0 top-0 h-[112px] w-[112px]",
            isDark ? "bg-primary/[0.05]" : "bg-primary/[0.045]",
          )}
        />
        <div
          className={cn(
            "absolute left-[112px] top-[112px] h-[112px] w-[112px]",
            isDark ? "bg-primary/[0.03]" : "bg-primary/[0.03]",
          )}
        />
        <div
          className={cn(
            "absolute left-0 top-[224px] h-[112px] w-[112px]",
            isDark ? "bg-primary/[0.04]" : "bg-primary/[0.035]",
          )}
        />
        <div
          className={cn(
            "absolute left-[112px] top-[336px] h-[112px] w-[112px]",
            isDark ? "bg-primary/[0.05]" : "bg-primary/[0.05]",
          )}
        />
        <div
          className={cn(
            "absolute left-[224px] top-[448px] h-[112px] w-[112px]",
            isDark ? "bg-primary/[0.03]" : "bg-primary/[0.03]",
          )}
        />

        {/* Crisp 112px-aligned warm peach-tinted cells on right */}
        <div
          className={cn(
            "absolute right-0 top-[112px] h-[112px] w-[112px]",
            isDark ? "bg-primary/[0.05]" : "bg-primary/[0.045]",
          )}
        />
        <div
          className={cn(
            "absolute right-[112px] top-[224px] h-[112px] w-[112px]",
            isDark ? "bg-primary/[0.03]" : "bg-primary/[0.03]",
          )}
        />
        <div
          className={cn(
            "absolute right-0 top-[336px] h-[112px] w-[112px]",
            isDark ? "bg-primary/[0.04]" : "bg-primary/[0.04]",
          )}
        />
        <div
          className={cn(
            "absolute right-[112px] top-[448px] h-[112px] w-[112px]",
            isDark ? "bg-primary/[0.05]" : "bg-primary/[0.045]",
          )}
        />
      </div>

      {/* 1. Floating Black Pill Navbar */}
      <motion.header
        initial={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
        }
        className="relative z-20 mx-auto max-w-md @4xl:max-w-4xl flex items-center justify-between gap-2"
      >
        <div
          className={cn(
            "flex w-full items-center justify-between rounded-full px-2.5 py-1.5 @sm:px-3 @sm:py-2 transition-colors",
            isDark
              ? "bg-[#151822] border border-white/10 shadow-lg"
              : "bg-[#0A0A0A] text-white shadow-[0_10px_30px_rgba(0,0,0,0.12)]",
          )}
        >
          {/* Left: Mobile Menu + Brand Mark */}
          <div className="flex items-center gap-2.5 pl-1.5">
            <button
              type="button"
              aria-label="Open navigation menu"
              onClick={() => setMobileMenuOpen(true)}
              className="@md:hidden flex size-7 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
            >
              <Menu className="size-3.5" />
            </button>

            {/* Animated Mailora Logo Icon */}
            <div className="flex items-center gap-2">
              <AnimatedMailLogo prefersReducedMotion={prefersReducedMotion} />
            </div>
          </div>

          {/* Center Nav Links */}
          <nav
            aria-label="Mailora navigation"
            className="hidden @md:flex items-center gap-1.5 text-[11.5px]"
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 transition-colors cursor-pointer",
                  item.active
                    ? "bg-primary text-white font-medium"
                    : "text-zinc-300 hover:text-white",
                )}
              >
                <span>{item.label}</span>
                {item.hasDropdown && (
                  <ChevronDown className="size-3 opacity-80" aria-hidden />
                )}
              </button>
            ))}
          </nav>

          {/* Right: Login + Sign Up + Theme Toggle */}
          <div className="flex items-center gap-2 pr-0.5">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
              className="flex size-7 items-center justify-center rounded-full bg-white/10 text-zinc-200 hover:bg-white/20 transition-colors cursor-pointer"
            >
              {isDark ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}
            </button>

            <button
              type="button"
              className="hidden @sm:inline-flex px-2.5 py-1.5 text-[11.5px] font-medium text-zinc-200 hover:text-white transition-colors cursor-pointer"
            >
              Sign in
            </button>

            <button
              type="button"
              className="inline-flex h-8 items-center justify-center rounded-full bg-white px-4 text-[11.5px] font-semibold text-zinc-950 transition-colors hover:bg-zinc-100 cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="@md:hidden absolute inset-0 z-30 bg-black/40 backdrop-blur-[2px]"
            />
            <motion.aside
              aria-label="Mobile navigation"
              initial={prefersReducedMotion ? false : { x: "-100%" }}
              animate={{ x: 0 }}
              exit={prefersReducedMotion ? undefined : { x: "-100%" }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
              }
              className={cn(
                "@md:hidden absolute inset-y-0 left-0 z-40 w-64 p-5 border-r flex flex-col justify-between",
                isDark
                  ? "bg-[#11141d] border-white/10 text-zinc-100"
                  : "bg-white border-zinc-200 text-zinc-900",
              )}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-current/10">
                  <span className="text-[15px] font-semibold">Mailora</span>
                  <button
                    type="button"
                    aria-label="Close navigation menu"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-md opacity-70 hover:opacity-100 cursor-pointer"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                <nav className="mt-4 flex flex-col gap-1">
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-2 text-left text-[13px] cursor-pointer",
                        item.active
                          ? "bg-primary/15 font-semibold text-primary"
                          : isDark
                            ? "text-zinc-400 hover:bg-white/5"
                            : "text-zinc-600 hover:bg-zinc-50",
                      )}
                    >
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <button
                type="button"
                className="inline-flex h-9 w-full items-center justify-center rounded-full bg-gradient-to-b from-primary to-[color-mix(in_oklab,var(--primary)_86%,black)] text-white text-[12px] font-medium cursor-pointer"
              >
                Book a Demo
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 4 Floating Side Cards (anchored to outer viewport edges) */}
      {/* Top-Left Floating Card: $2,320 Increase Rate */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, x: -18, y: -8 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }
        }
        className={cn(
          "hidden @lg:block absolute left-6 @xl:left-14 top-28 z-10 w-36 p-3.5",
          floatingCardClass,
        )}
      >
        <span className="block h-0.5 w-4 rounded-full bg-primary" />
        <div className="mt-2.5 flex items-center justify-between gap-1">
          <span className="text-[17px] font-semibold tracking-tight text-primary">
            <AnimatedCounter
              target={4850}
              prefix="$"
              useLocale
              prefersReducedMotion={prefersReducedMotion}
            />
          </span>
          <ArrowUpRight className="size-3.5 text-zinc-500" aria-hidden />
        </div>
        <p
          className={cn(
            "mt-1 text-[9.5px] font-medium",
            isDark ? "text-zinc-400" : "text-zinc-500",
          )}
        >
          Monthly Revenue
        </p>
      </motion.div>

      {/* Bottom-Left Floating Card: Growth Area Chart (bleeding off left screen edge) */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, x: -20, y: 12 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.75, delay: 0.35, ease: [0.16, 1, 0.3, 1] }
        }
        className={cn(
          "hidden @lg:block absolute -left-6 @xl:-left-8 bottom-8 z-10 w-56 p-3.5",
          floatingCardClass,
        )}
      >
        <p className="text-[11px] font-semibold">Deliverability</p>
        <div className="mt-2 h-20 w-full">
          <svg viewBox="0 0 180 72" className="h-full w-full overflow-visible" aria-hidden>
            <defs>
              <linearGradient id="mailora-growth-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FACC15" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#FACC15" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            {[18, 36, 54].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="180"
                y2={y}
                stroke="currentColor"
                strokeWidth="0.6"
                strokeDasharray="2 3"
                className={isDark ? "text-white/10" : "text-zinc-200"}
              />
            ))}
            <path
              d="M 6 60 L 42 46 L 82 40 L 122 30 L 154 14 L 174 18 L 174 70 L 6 70 Z"
              fill="url(#mailora-growth-fill)"
            />
            <path
              d="M 6 60 L 42 46 L 82 40 L 122 30 L 154 14 L 174 18"
              fill="none"
              stroke="#FACC15"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {[
              [6, 60],
              [42, 46],
              [82, 40],
              [122, 30],
              [154, 14],
              [174, 18],
            ].map(([cx, cy], idx) => (
              <circle
                key={idx}
                cx={cx}
                cy={cy}
                r="2.2"
                fill={isDark ? "#141720" : "#ffffff"}
                stroke="#FACC15"
                strokeWidth="1.5"
              />
            ))}
          </svg>
        </div>
        <div
          className={cn(
            "mt-1 flex items-center justify-between text-[8px] font-medium",
            isDark ? "text-zinc-500" : "text-zinc-400",
          )}
        >
          {["Jan", "Feb", "Mar", "Apr", "May"].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </motion.div>

      {/* Top-Right Floating Card: $69k Stepped Area Chart (bleeding off right screen edge) */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, x: 18, y: -8 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }
        }
        className={cn(
          "hidden @lg:block absolute -right-6 @xl:-right-8 top-24 z-10 w-56 p-3.5",
          floatingCardClass,
        )}
      >
        <div className="flex items-stretch gap-2 h-24">
          <div
            className={cn(
              "flex flex-col justify-between text-[7.5px] font-medium",
              isDark ? "text-zinc-500" : "text-zinc-400",
            )}
          >
            <span>120k</span>
            <span>90k</span>
            <span>60k</span>
            <span>30k</span>
            <span>10k</span>
          </div>
          <div className="relative flex-1 pt-4">
            {/* Peak Tooltip */}
            <div className="absolute left-[62%] -translate-x-1/2 top-0 z-10 flex flex-col items-center">
              <span className="rounded-full bg-zinc-950 px-2 py-0.5 text-[7.5px] font-semibold text-white">
                84k
              </span>
              <span className="h-0 w-0 border-x-[3px] border-t-[4px] border-x-transparent border-t-zinc-950" />
              <span className="h-14 w-px bg-zinc-950/70 dark:bg-white/60" />
              <span className="size-1 rounded-full bg-zinc-950 dark:bg-white" />
            </div>

            <svg
              viewBox="0 0 150 64"
              preserveAspectRatio="none"
              className="h-full w-full"
              aria-hidden
            >
              <defs>
                <linearGradient id="mailora-step-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FACC15" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#FACC15" stopOpacity="0.06" />
                </linearGradient>
              </defs>
              <path
                d="M 0 64 L 0 46 L 34 46 L 34 26 L 68 26 L 68 10 L 106 10 L 106 32 L 150 32 L 150 64 Z"
                fill="url(#mailora-step-fill)"
              />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Bottom-Right Floating Card: +88% Progress Pill */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, x: 18, y: 12 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.75, delay: 0.4, ease: [0.16, 1, 0.3, 1] }
        }
        className={cn(
          "hidden @lg:flex absolute right-6 @xl:right-14 bottom-12 z-10 w-60 items-center gap-3 px-4 py-3.5",
          floatingCardClass,
        )}
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-primary to-[color-mix(in_oklab,var(--primary)_86%,black)] text-white">
          <TrendingUp className="size-3.5" aria-hidden />
        </span>
        <div className="flex-1 space-y-2">
          <div className="h-2 w-full rounded-full bg-gradient-to-r from-primary/35 to-primary/10" />
          <div className="h-2 w-3/5 rounded-full bg-gradient-to-r from-primary/40 to-primary/10" />
        </div>
        <span className="text-[11px] font-semibold text-primary shrink-0">
          <AnimatedCounter
            target={94}
            prefix="+"
            suffix="%"
            prefersReducedMotion={prefersReducedMotion}
          />
        </span>
      </motion.div>

      {/* 2. Hero Center Content */}
      <section className="relative z-10 mx-auto max-w-md @4xl:max-w-3xl pt-14 @sm:pt-16 pb-16">

        {/* Center Hero Content */}
        <div className="mx-auto max-w-2xl text-center">
          {/* Top Tag Pill */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
            }
            className={cn(
              "inline-flex items-center rounded-full border px-4 py-1 text-[11px] font-medium",
              isDark
                ? "border-white/10 bg-white/[0.05] text-zinc-300"
                : "border-zinc-200/80 bg-white text-zinc-600",
            )}
          >
            Email Automation
          </motion.div>

          {/* 2-Line Headline with Inline Icon Badges */}
          <motion.h2
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }
            }
            className="mt-5 text-[30px] @sm:text-[42px] @lg:text-[48px] font-semibold tracking-tight leading-[1.15]"
          >
            <span className="block">
              Lifecycle email{" "}
              <span className={isDark ? "text-zinc-500" : "text-[#939393]"}>
                delivery
              </span>
            </span>

            <span className="mt-1.5 flex flex-wrap items-center justify-center gap-2.5">
              {/* Left Overlapping Yellow + Orange Badges */}
              <span className="inline-flex translate-y-[5px] items-center -space-x-2">
                <span
                  className={cn(
                    "flex size-9 @sm:size-10 items-center justify-center rounded-full bg-[#FDE047] text-zinc-900 ring-2",
                    isDark ? "ring-[#0B0D12]" : "ring-[#F9F9F9]",
                  )}
                >
                  <PieChart className="size-4" aria-hidden />
                </span>
                <span
                  className={cn(
                    "flex size-9 @sm:size-10 items-center justify-center rounded-full bg-gradient-to-b from-primary to-[color-mix(in_oklab,var(--primary)_86%,black)] text-white ring-2",
                    isDark ? "ring-[#0B0D12]" : "ring-[#F9F9F9]",
                  )}
                >
                  <BarChart2 className="size-4" aria-hidden />
                </span>
              </span>

              <span className="-translate-y-[1px] leading-none">built for scale</span>

              {/* Right Yellow Cloud Badge */}
              <span
                className={cn(
                  "inline-flex translate-y-[5px] size-9 @sm:size-10 items-center justify-center rounded-full bg-[#FDE047] text-zinc-900 ring-2",
                  isDark ? "ring-[#0B0D12]" : "ring-[#F9F9F9]",
                )}
              >
                <CloudCog className="size-4" aria-hidden />
              </span>
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }
            }
            className={cn(
              "mx-auto mt-5 max-w-md text-[12px] @sm:text-[13px] leading-relaxed",
              isDark ? "text-zinc-400" : "text-zinc-500",
            )}
          >
            Everything your team needs to draft, schedule, and track high-converting
            <br className="hidden @sm:inline" /> emails from one workspace.
          </motion.p>

          {/* Dual CTA Buttons */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.65, delay: 0.24, ease: [0.16, 1, 0.3, 1] }
            }
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-b from-primary to-[color-mix(in_oklab,var(--primary)_86%,black)] px-7 text-[12.5px] font-medium text-white transition-all hover:to-[color-mix(in_oklab,var(--primary)_78%,black)] active:scale-95 cursor-pointer"
            >
              Start Free Trial
            </button>

            <button
              type="button"
              className={cn(
                "inline-flex h-11 items-center justify-center gap-2.5 rounded-full border px-6 text-[12.5px] font-medium transition-colors active:scale-95 cursor-pointer",
                isDark
                  ? "border-white/15 bg-white/[0.05] text-white hover:bg-white/10"
                  : "border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50",
              )}
            >
              <span
                className={cn(
                  "flex size-4 items-center justify-center rounded-full",
                  isDark ? "bg-white text-zinc-950" : "bg-zinc-950 text-white",
                )}
              >
                <Play className="size-2 fill-current ml-0.5" aria-hidden />
              </span>
              <span>See How It Works</span>
            </button>
          </motion.div>
        </div>
      </section>
      </div>

      {/* 3. Key Features Section */}
      <section className="relative z-10 mx-auto max-w-md @4xl:max-w-5xl pt-12 @sm:pt-16 pb-6">
        {/* Top Tag Pill */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
          }
          className="inline-flex items-center rounded-full border border-zinc-200/80 bg-white px-5 py-1 text-[11px] font-medium text-zinc-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-zinc-300"
        >
          Core Capabilities
        </motion.div>

        {/* Heading + Right Subtitle */}
        <div className="mt-4 flex flex-col gap-4 @md:flex-row @md:items-end @md:justify-between">
          <motion.h3
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }
            }
            className="text-[26px] @sm:text-[34px] @lg:text-[38px] font-semibold tracking-tight leading-[1.14]"
          >
            Target every{" "}
            <span className={isDark ? "text-zinc-500" : "text-zinc-400"}>
              segment
            </span>
            <br />
            <span className={isDark ? "text-zinc-500" : "text-zinc-400"}>
              without
            </span>{" "}
            manual work.
          </motion.h3>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }
            }
            className={cn(
              "max-w-[260px] text-[11.5px] @sm:text-[12px] leading-relaxed",
              isDark ? "text-zinc-400" : "text-zinc-500",
            )}
          >
            Send personalized sequences based on live user activity and smart audience rules.
          </motion.p>
        </div>

        {/* Bento Container */}
        <div
          className={cn(
            "mt-8 rounded-3xl p-4 @sm:p-6 transition-colors",
            isDark ? "bg-white/[0.04]" : "bg-[#F5F5F5]",
          )}
        >
          <div className="grid grid-cols-1 @4xl:grid-cols-12 gap-4 @sm:gap-5 items-stretch">
            {/* Left Card: Audience + World Map */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
              }
              className={cn(
                "@4xl:col-span-5 rounded-2xl p-5 flex flex-col justify-between",
                isDark ? "bg-[#141720]" : "bg-white",
              )}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-[15px] font-semibold tracking-tight">
                      Active Subscribers
                    </h4>
                    <p
                      className={cn(
                        "mt-0.5 text-[10.5px]",
                        isDark ? "text-zinc-400" : "text-zinc-400",
                      )}
                    >
                      Updated 5 minutes ago
                    </p>
                  </div>

                  <button
                    type="button"
                    className="inline-flex h-8 items-center justify-center rounded-full bg-gradient-to-b from-primary to-[color-mix(in_oklab,var(--primary)_86%,black)] px-4 text-[11px] font-medium text-white transition-colors hover:to-[color-mix(in_oklab,var(--primary)_78%,black)] cursor-pointer"
                  >
                    View Report
                  </button>
                </div>

                {/* Big Metric + Country Pill */}
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-[28px] @sm:text-[32px] font-semibold tracking-tight leading-none">
                    <AnimatedCounter
                      target={28450}
                      useLocale
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium",
                      isDark
                        ? "bg-white/[0.07] text-zinc-200"
                        : "bg-zinc-100 text-zinc-700",
                    )}
                  >
                    <span className="flex size-3.5 items-center justify-center rounded-full bg-[#E11D48] text-[7px] font-bold text-white">
                      ★
                    </span>
                    <span>United States</span>
                  </span>
                </div>

                {/* Device Breakdown Rows */}
                <div
                  className={cn(
                    "mt-5 divide-y border-t",
                    isDark
                      ? "divide-white/[0.07] border-white/[0.07]"
                      : "divide-zinc-100 border-zinc-100",
                  )}
                >
                  {[
                    {
                      symbol: "⌘",
                      label: "Desktop",
                      amount: 18920,
                      deltaPrefix: "+",
                      delta: 8.4,
                      positive: true,
                    },
                    {
                      symbol: "◎",
                      label: "Mobile",
                      amount: 9530,
                      deltaPrefix: "-",
                      delta: 1.2,
                      positive: false,
                    },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between py-2.5 text-[11.5px]"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "text-[13px] font-medium",
                            isDark ? "text-zinc-400" : "text-zinc-500",
                          )}
                        >
                          {row.symbol}
                        </span>
                        <span
                          className={cn(
                            "font-medium",
                            isDark ? "text-zinc-200" : "text-zinc-700",
                          )}
                        >
                          {row.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-semibold tabular-nums">
                          <AnimatedCounter
                            target={row.amount}
                            useLocale
                            prefersReducedMotion={prefersReducedMotion}
                          />
                        </span>
                        <span
                          className={cn(
                            "w-11 text-right font-medium tabular-nums",
                            row.positive ? "text-emerald-500" : "text-primary",
                          )}
                        >
                          <AnimatedCounter
                            target={row.delta}
                            prefix={row.deltaPrefix}
                            suffix="%"
                            decimals={1}
                            prefersReducedMotion={prefersReducedMotion}
                          />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* World Map Preview */}
              <div
                className={cn(
                  "relative mt-4 h-36 @sm:h-40 w-full overflow-hidden rounded-xl",
                  isDark ? "bg-white/[0.03]" : "bg-[#F8F8F8]",
                )}
              >
                <svg
                  viewBox="0 0 360 170"
                  className="h-full w-full"
                  aria-hidden
                >
                  {/* Base continents */}
                  <g
                    className={
                      isDark ? "fill-white/[0.12]" : "fill-zinc-200/90"
                    }
                  >
                    {/* North America */}
                    <path d="M25 28 L64 20 L102 26 L112 42 L95 54 L86 72 L70 84 L58 76 L48 56 L30 46 Z" />
                    {/* Greenland */}
                    <path d="M114 14 L142 12 L138 30 L118 32 Z" />
                    {/* South America */}
                    <path d="M84 94 L106 98 L118 118 L108 148 L92 158 L84 134 L78 112 Z" />
                    {/* Europe */}
                    <path d="M162 28 L198 22 L212 38 L196 52 L170 50 L158 40 Z" />
                    {/* Africa */}
                    <path d="M160 62 L198 60 L218 82 L208 118 L188 138 L174 118 L162 88 Z" />
                    {/* Asia */}
                    <path d="M210 24 L276 20 L318 36 L328 58 L302 74 L276 88 L244 82 L222 66 L208 46 Z" />
                    {/* Australia */}
                    <path d="M286 114 L322 112 L330 134 L310 146 L288 136 Z" />
                  </g>

                  {/* Highlighted Regions: Alaska/US + Turkey + Japan */}
                  <path
                    d="M28 32 L46 28 L42 42 L26 42 Z"
                    className="fill-primary"
                  />
                  <path
                    d="M46 50 L86 52 L82 68 L58 70 L46 60 Z"
                    className="fill-primary"
                  />
                  <path
                    d="M198 52 L214 52 L212 60 L196 58 Z"
                    className="fill-primary"
                  />
                  <path
                    d="M312 52 L322 48 L320 62 L310 62 Z"
                    className="fill-primary"
                  />
                </svg>

                {/* Floating Country Pins */}
                <motion.div
                  animate={prefersReducedMotion ? undefined : { y: [0, -2.5, 0] }}
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
                  }
                  className={cn(
                    "absolute left-[50%] top-[44%] -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-medium shadow-sm",
                    isDark
                      ? "bg-[#1B1F2C] text-zinc-100 border border-white/10"
                      : "bg-white text-zinc-800 border border-zinc-100",
                  )}
                >
                  <span className="flex size-3 items-center justify-center rounded-full bg-[#E11D48] text-[6px] text-white">
                    ☾
                  </span>
                  <span>Germany</span>
                </motion.div>

                <motion.div
                  animate={prefersReducedMotion ? undefined : { y: [0, -2.5, 0] }}
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : {
                          duration: 3.2,
                          delay: 0.7,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                  className={cn(
                    "absolute right-3 top-[54%] inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-medium shadow-sm",
                    isDark
                      ? "bg-[#1B1F2C] text-zinc-100 border border-white/10"
                      : "bg-white text-zinc-800 border border-zinc-100",
                  )}
                >
                  <span className="flex size-3 items-center justify-center rounded-full bg-zinc-100">
                    <span className="size-1.5 rounded-full bg-[#E11D48]" />
                  </span>
                  <span>Singapore</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column: 2 Stacked Cards */}
            <div className="@4xl:col-span-7 flex flex-col gap-4 @sm:gap-5">
              {/* Top Card: Our Team */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }
                }
                className={cn(
                  "rounded-2xl p-5",
                  isDark ? "bg-[#141720]" : "bg-white",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span
                      className={cn(
                        "flex size-9 items-center justify-center rounded-full border",
                        isDark
                          ? "border-white/10 bg-white/[0.04] text-zinc-300"
                          : "border-zinc-200/80 bg-zinc-50 text-zinc-600",
                      )}
                    >
                      <Users className="size-4" aria-hidden />
                    </span>

                    <div
                      className={cn(
                        "flex items-center -space-x-2 rounded-full p-1",
                        isDark ? "bg-white/[0.05]" : "bg-zinc-100/90",
                      )}
                    >
                      {[
                        {
                          src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg",
                          alt: "Team member 1",
                        },
                        {
                          src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg",
                          alt: "Team member 2",
                        },
                        {
                          src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg",
                          alt: "Team member 3",
                        },
                        {
                          src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg",
                          alt: "Team member 4",
                        },
                      ].map((avatar, idx) => (
                        <img
                          key={idx}
                          src={avatar.src}
                          alt={avatar.alt}
                          className={cn(
                            "size-7 rounded-full object-cover ring-2",
                            isDark ? "ring-[#141720]" : "ring-white",
                          )}
                        />
                      ))}
                      <button
                        type="button"
                        aria-label="Invite team member"
                        className="flex size-7 items-center justify-center rounded-full bg-[#8B7CFF] text-white ring-2 ring-white dark:ring-[#141720] hover:opacity-90 transition-opacity cursor-pointer"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label="Team options"
                    className={cn(
                      "p-1.5 rounded-lg transition-colors cursor-pointer",
                      isDark
                        ? "text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-200"
                        : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800",
                    )}
                  >
                    <MoreHorizontal className="size-4" />
                  </button>
                </div>

                <h4 className="mt-5 text-[14px] font-semibold tracking-tight">
                  Workspace Collaborators
                </h4>
                <p
                  className={cn(
                    "mt-1 text-[11px] leading-relaxed",
                    isDark ? "text-zinc-400" : "text-zinc-500",
                  )}
                >
                  Assign campaign approvals, review copy drafts, and manage sender
                  permissions together.
                </p>
              </motion.div>

              {/* Bottom Card: Target Name / Customer Type / Choose Location */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.65, delay: 0.16, ease: [0.16, 1, 0.3, 1] }
                }
                className={cn(
                  "flex-1 rounded-2xl p-5 flex flex-col justify-between gap-4",
                  isDark ? "bg-[#141720]" : "bg-white",
                )}
              >
                {/* Campaign Name */}
                <div>
                  <label
                    htmlFor="mailora-target-name"
                    className="block text-[11.5px] font-semibold tracking-tight"
                  >
                    Campaign Name
                  </label>
                  <input
                    id="mailora-target-name"
                    type="text"
                    value={targetName}
                    onChange={(e) => setTargetName(e.target.value)}
                    className={cn(
                      "mt-2 w-full rounded-xl border px-3.5 py-2 text-[11.5px] outline-none transition-colors",
                      isDark
                        ? "border-white/10 bg-white/[0.03] text-zinc-100 focus:border-primary/60"
                        : "border-zinc-200/80 bg-white text-zinc-800 focus:border-primary/60",
                    )}
                  />
                </div>

                {/* Audience Segments */}
                <div>
                  <p className="text-[11.5px] font-semibold tracking-tight">
                    Audience Segments
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {customerTypes.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] font-medium",
                          isDark
                            ? "border-white/10 bg-white/[0.04] text-zinc-300"
                            : "border-zinc-200/80 bg-zinc-50 text-zinc-700",
                        )}
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          aria-label={`Remove ${tag}`}
                          onClick={() =>
                            setCustomerTypes((prev) =>
                              prev.filter((item) => item !== tag),
                            )
                          }
                          className="opacity-60 hover:opacity-100 cursor-pointer"
                        >
                          <X className="size-2.5" />
                        </button>
                      </span>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddCustomerType}
                      className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/[0.06] px-2.5 py-1 text-[10.5px] font-medium text-primary hover:bg-primary/[0.12] transition-colors cursor-pointer"
                    >
                      <span>Add Tag</span>
                      <Plus className="size-2.5" />
                    </button>
                  </div>
                </div>

                {/* Delivery Region */}
                <div>
                  <p className="text-[11.5px] font-semibold tracking-tight">
                    Delivery Region
                  </p>
                  <div
                    className={cn(
                      "mt-2 flex flex-wrap @sm:flex-nowrap items-center justify-between gap-2.5 rounded-xl px-3.5 py-2.5",
                      isDark ? "bg-[#FACC15]/10" : "bg-[#FEF3C7]/75",
                    )}
                  >
                    <span
                      className={cn(
                        "text-[10.5px] font-medium shrink-0",
                        isDark ? "text-zinc-200" : "text-zinc-700",
                      )}
                    >
                      Global Delivery
                    </span>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: 10 }).map((_, idx) => {
                        const active = idx < audienceReachStep;
                        return (
                          <button
                            key={idx}
                            type="button"
                            aria-label={`Set audience reach to ${(idx + 1) * 10}%`}
                            onClick={() => setAudienceReachStep(idx + 1)}
                            className={cn(
                              "size-2.5 rounded-[3px] transition-colors cursor-pointer",
                              active
                                ? "bg-primary"
                                : isDark
                                  ? "bg-white/20 hover:bg-white/35"
                                  : "bg-white hover:bg-white/80",
                            )}
                          />
                        );
                      })}
                    </div>

                    <span className="text-[10.5px] font-semibold tabular-nums shrink-0">
                      {audienceReachStep * 10}%
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Service Section */}
      <section
        className={cn(
          "relative z-10 -mx-4 @sm:-mx-6 @lg:-mx-8 mt-10 px-4 @sm:px-6 @lg:px-8 py-14 @sm:py-20 transition-colors",
          isDark ? "bg-white/[0.03]" : "bg-[#F9F9F9]",
        )}
      >
        <div className="mx-auto max-w-md @4xl:max-w-5xl">
        {/* Top Tag Pill */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
          }
          className={cn(
            "inline-flex items-center rounded-full border px-5 py-1 text-[11px] font-medium",
            isDark
              ? "border-white/10 bg-white/[0.05] text-zinc-300"
              : "border-zinc-200/80 bg-white text-zinc-600",
          )}
        >
          Smart Studio
        </motion.div>

        {/* Heading + Overlapping Action Badges */}
        <div className="mt-4 flex flex-col gap-5 @4xl:flex-row @4xl:items-center @4xl:justify-between">
          <motion.h3
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }
            }
            className="text-[26px] @sm:text-[34px] @lg:text-[38px] font-semibold tracking-tight leading-[1.15]"
          >
            Craft high-converting emails
            <br />
            <span className={isDark ? "text-zinc-500" : "text-[#C1C1C1]"}>
              in minutes.
            </span>
          </motion.h3>

          <div className="flex items-center -space-x-3 self-start @md:self-auto">
            <motion.span
              animate={prefersReducedMotion ? undefined : { y: [0, -2.5, 0] }}
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
              }
              className={cn(
                "flex size-12 items-center justify-center rounded-full border",
                isDark
                  ? "border-white/10 bg-[#141720] text-primary"
                  : "border-zinc-200/70 bg-white text-primary",
              )}
            >
              <TrendingUp className="size-4" aria-hidden />
            </motion.span>
            <motion.span
              animate={
                prefersReducedMotion
                  ? undefined
                  : { y: [0, 2.5, 0], scale: [1, 1.04, 1] }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                      duration: 2.6,
                      delay: 0.35,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
              className="relative z-10 flex size-12 items-center justify-center rounded-full bg-gradient-to-b from-primary to-[color-mix(in_oklab,var(--primary)_86%,black)] text-white"
            >
              <Zap className="size-4 fill-current" aria-hidden />
            </motion.span>
          </div>
        </div>

        {/* 2-Column Service Cards */}
        <div className="mt-9 grid grid-cols-1 @4xl:grid-cols-2 gap-5 items-stretch">
          {/* Left Card: Create high performing subject line */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
            }
            className={cn(
              "rounded-3xl p-6 @sm:p-8 flex flex-col",
              isDark ? "bg-[#141720]" : "bg-white",
            )}
          >
            <h4 className="text-center text-[15px] @sm:text-[17px] font-semibold tracking-tight">
              Write subject lines that get opened
            </h4>

            <div className="mt-6 flex-1 flex flex-col justify-center">
              {/* Inner AI Generator Card */}
              <div
                className={cn(
                  "mx-1 @sm:mx-3 rounded-2xl p-4",
                  isDark ? "bg-white/[0.03]" : "bg-[#F9F9F9]",
                )}
              >
                <p
                  className={cn(
                    "text-[11px] font-medium",
                    isDark ? "text-zinc-400" : "text-zinc-600",
                  )}
                >
                  AI Copy Assistant
                </p>

                {/* Welcome Series Box */}
                <div
                  className={cn(
                    "mt-3 rounded-xl p-3.5",
                    isDark ? "bg-white/[0.04]" : "bg-white",
                  )}
                >
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="font-medium">Welcome Series</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-500">
                      <TrendingUp className="size-3" aria-hidden />
                      <span>+22.4%</span>
                    </span>
                  </div>
                  <div
                    className={cn(
                      "mt-2.5 h-1.5 w-3/4 rounded-full",
                      isDark ? "bg-white/10" : "bg-zinc-100",
                    )}
                  />
                </div>

                {/* Orange CTA Button */}
                <button
                  type="button"
                  onClick={() =>
                    setSubjectIndex((i) => (i + 1) % generatedSubjects.length)
                  }
                  className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary text-[11.5px] font-medium text-white transition-colors hover:bg-primary/90 active:scale-[0.99] cursor-pointer"
                >
                  <Wand2 className="size-3.5" aria-hidden />
                  <span>Suggest New Line</span>
                </button>

                {/* Pill Tags Row */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "rounded-lg px-2.5 py-1.5 text-[10px] font-medium",
                      isDark
                        ? "bg-white/[0.05] text-zinc-300"
                        : "bg-white text-zinc-700",
                    )}
                  >
                    Boost Clarity
                  </span>
                  {[48, 56, 44].map((w, idx) => (
                    <span
                      key={idx}
                      style={{ width: `${w}px` }}
                      className={cn(
                        "h-6 rounded-lg",
                        isDark ? "bg-white/[0.03]" : "bg-white/80",
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Subject Result Card */}
              <div
                className={cn(
                  "relative z-10 -mt-3 rounded-xl p-3.5",
                  isDark
                    ? "bg-[#181C27] shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
                    : "bg-white shadow-[0_12px_28px_rgba(15,23,42,0.06)]",
                )}
              >
                <p className="text-[11.5px] font-medium leading-snug">
                  {generatedSubjects[subjectIndex]}
                </p>

                <div
                  className={cn(
                    "mt-3 flex items-center justify-between border-t pt-2.5 text-[10px]",
                    isDark ? "border-white/[0.07]" : "border-zinc-100",
                  )}
                >
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <span className="flex size-3.5 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <CheckCircle2 className="size-2.5" aria-hidden />
                    </span>
                    <span className={isDark ? "text-zinc-200" : "text-zinc-700"}>
                      Approved
                    </span>
                  </span>

                  <div
                    className={cn(
                      "flex items-center gap-2.5",
                      isDark ? "text-zinc-400" : "text-zinc-400",
                    )}
                  >
                    <Copy className="size-3" aria-hidden />
                    <Flag className="size-3" aria-hidden />
                    <MoreVertical className="size-3" aria-hidden />
                  </div>
                </div>
              </div>

              {/* Subtle Faded Bottom Input Hint */}
              <div
                className={cn(
                  "mt-2 mx-4 flex items-center justify-between rounded-lg px-3 py-1.5 text-[9.5px] opacity-45",
                  isDark
                    ? "bg-white/[0.02] text-zinc-400"
                    : "bg-[#F9F9F9] text-zinc-400",
                )}
              >
                <span>+ Insert into Draft</span>
                <div className="flex items-center gap-2">
                  <Flag className="size-2.5" aria-hidden />
                  <MoreVertical className="size-2.5" aria-hidden />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Card: Connect with your audience */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }
            }
            className={cn(
              "relative rounded-3xl p-6 @sm:p-8 overflow-hidden flex flex-col",
              isDark ? "bg-[#141720]" : "bg-white",
            )}
          >
            <h4 className="text-center text-[15px] @sm:text-[17px] font-semibold tracking-tight">
              Collaborate before you hit send
            </h4>

            <div className="relative mt-6 flex-1 min-h-[295px]">
              {/* Top-Right Floating Pills: 2,450 Opens & 1.4m+ Subscribers */}
              <div className="flex flex-col items-end gap-2.5 @sm:absolute @sm:right-0 @sm:top-2 @sm:z-10 mb-4 @sm:mb-0">
                <div
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[11px] font-medium",
                    isDark
                      ? "bg-[#1B2030] text-zinc-200 shadow-md"
                      : "bg-white text-zinc-800 shadow-[0_4px_16px_rgba(15,23,42,0.04)]",
                  )}
                >
                  <Eye className="size-3.5 text-zinc-500" aria-hidden />
                  <span>2,450 Opens</span>
                </div>

                <div
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-2.5 py-1.5",
                    isDark
                      ? "bg-[#1B2030] shadow-md"
                      : "bg-white shadow-[0_4px_16px_rgba(15,23,42,0.04)]",
                  )}
                >
                  <div className="flex items-center -space-x-1.5">
                    <img
                      src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg"
                      alt="Follower 1"
                      className="size-5 rounded-full object-cover ring-1 ring-white dark:ring-[#141720]"
                    />
                    <img
                      src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg"
                      alt="Follower 2"
                      className="size-5 rounded-full object-cover ring-1 ring-white dark:ring-[#141720]"
                    />
                    <span className="flex size-5 items-center justify-center rounded-full bg-[#8B7CFF] text-[7px] font-semibold text-white ring-1 ring-white dark:ring-[#141720]">
                      16k+
                    </span>
                  </div>
                  <div className="leading-tight pr-1">
                    <p className="text-[9.5px] font-semibold">1.4m+</p>
                    <p
                      className={cn(
                        "text-[8px]",
                        isDark ? "text-zinc-400" : "text-zinc-400",
                      )}
                    >
                      Subscribers
                    </p>
                  </div>
                </div>
              </div>

              {/* Left Back Card: Live Preview + Team Photo */}
              <div
                className={cn(
                  "w-full @sm:w-[58%] rounded-2xl p-3.5",
                  isDark ? "bg-white/[0.03]" : "bg-[#F9F9F9]",
                )}
              >
                <p
                  className={cn(
                    "text-[11px] font-medium",
                    isDark ? "text-zinc-400" : "text-zinc-600",
                  )}
                >
                  Live Preview
                </p>

                <div className="mt-2.5 overflow-hidden rounded-xl">
                  <img
                    src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1795848272/gemini_generated_image_rjovsfrjovsfrjov-1795848268642.jpg"
                    alt="Team collaborating on email campaign"
                    className="h-32 w-full object-cover"
                  />
                </div>

                <p className="mt-2.5 text-[12px] font-medium leading-snug">
                  Real-time feedback from your growth team
                </p>

                <div className="mt-2 space-y-1.5">
                  <div
                    className={cn(
                      "h-1.5 w-full rounded-full",
                      isDark ? "bg-white/10" : "bg-zinc-200/60",
                    )}
                  />
                  <div
                    className={cn(
                      "h-1.5 w-3/4 rounded-full",
                      isDark ? "bg-white/10" : "bg-zinc-200/60",
                    )}
                  />
                </div>

                <div className="mt-3 flex items-center gap-2 pt-2">
                  <img
                    src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_80,h_80,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg"
                    alt="Nadia Rahman"
                    className="size-4 rounded-full object-cover"
                  />
                  <span
                    className={cn(
                      "text-[9.5px]",
                      isDark ? "text-zinc-400" : "text-zinc-500",
                    )}
                  >
                    Nadia Rahman
                  </span>
                </div>
              </div>

              {/* Overlapping Front-Right Comment Thread Card */}
              <div
                className={cn(
                  "mt-4 @sm:mt-0 @sm:absolute @sm:right-0 @sm:bottom-0 @sm:w-[60%] z-10 rounded-2xl p-3.5",
                  isDark
                    ? "bg-[#181C27] shadow-[0_14px_32px_rgba(0,0,0,0.5)]"
                    : "bg-white shadow-[0_14px_32px_rgba(15,23,42,0.07)]",
                )}
              >
                {/* Comment 1 */}
                <div>
                  <div className="flex items-center gap-2">
                    <img
                      src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_80,h_80,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg"
                      alt="David Chen"
                      className="size-5 rounded-full object-cover"
                    />
                    <span className="text-[11px] font-semibold">David Chen</span>
                  </div>
                  <p
                    className={cn(
                      "mt-1.5 text-[10px] leading-relaxed",
                      isDark ? "text-zinc-300" : "text-zinc-600",
                    )}
                  >
                    <span className="rounded bg-blue-500/15 px-1 py-0.5 font-medium text-blue-600 dark:text-blue-400">
                      @Sarah
                    </span>{" "}
                    the new subject line tested 18% higher in our morning batch
                  </p>
                  <div
                    className={cn(
                      "mt-1.5 flex items-center gap-3 text-[8.5px] font-medium",
                      isDark ? "text-zinc-400" : "text-zinc-500",
                    )}
                  >
                    <span className="cursor-pointer hover:underline">Like</span>
                    <span className="cursor-pointer hover:underline">Reply</span>
                  </div>
                </div>

                {/* Comment 2 (Faded) */}
                <div
                  className={cn(
                    "mt-3 border-t pt-2.5 opacity-60",
                    isDark ? "border-white/[0.07]" : "border-zinc-100",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_80,h_80,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg"
                      alt="Claire Bennett"
                      className="size-5 rounded-full object-cover"
                    />
                    <span className="text-[10.5px] font-semibold">
                      Claire Bennett
                    </span>
                  </div>
                  <div className="mt-1.5 space-y-1">
                    <div
                      className={cn(
                        "h-1.5 w-full rounded-full",
                        isDark ? "bg-white/10" : "bg-zinc-100",
                      )}
                    />
                    <div
                      className={cn(
                        "h-1.5 w-2/3 rounded-full",
                        isDark ? "bg-white/10" : "bg-zinc-100",
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        </div>
      </section>

      {/* 5. Metrics Strip Section */}
      <section className="relative z-10 mx-auto max-w-md @4xl:max-w-5xl py-14 @sm:py-20">
        <div className="flex flex-col @4xl:flex-row @4xl:items-stretch @4xl:justify-between gap-7 @4xl:gap-6">
          {[
            {
              badge: "Senders",
              value: 35,
              suffix: "K",
              sup: "+",
              description: "Launch automated campaigns with drag-and-drop blocks.",
              renderIcon: (
                ref: React.RefObject<{
                  startAnimation: () => void;
                  stopAnimation: () => void;
                } | null>,
              ) => (
                <MegaphoneIcon
                  ref={ref as React.Ref<MegaphoneIconHandle>}
                  size={12}
                  duration={1.5}
                  isAnimated={!prefersReducedMotion}
                  color="var(--primary)"
                />
              ),
            },
            {
              badge: "Inbox Rate",
              value: 99,
              suffix: "",
              sup: "%",
              description:
                "Built-in domain warmup and smart bounce protection.",
              renderIcon: (
                ref: React.RefObject<{
                  startAnimation: () => void;
                  stopAnimation: () => void;
                } | null>,
              ) => (
                <TargetIcon
                  ref={ref as React.Ref<TargetIconHandle>}
                  size={12}
                  duration={1.5}
                  isAnimated={!prefersReducedMotion}
                  color="var(--primary)"
                />
              ),
            },
            {
              badge: "Time Saved",
              value: 78,
              suffix: "",
              sup: "%",
              description:
                "Cut weekly campaign setup time across your entire team.",
              renderIcon: (
                ref: React.RefObject<{
                  startAnimation: () => void;
                  stopAnimation: () => void;
                } | null>,
              ) => (
                <TrophyIcon
                  ref={ref as React.Ref<TrophyIconHandle>}
                  size={12}
                  duration={1.5}
                  isAnimated={!prefersReducedMotion}
                  color="var(--primary)"
                />
              ),
            },
          ].map((stat, idx) => (
            <React.Fragment key={stat.badge}>
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }
                }
                className={cn(
                  "flex flex-col items-start",
                  idx < 2 &&
                    (isDark
                      ? "border-b border-dashed border-white/10 pb-7 @4xl:border-b-0 @4xl:pb-0"
                      : "border-b border-dashed border-zinc-200 pb-7 @4xl:border-b-0 @4xl:pb-0"),
                )}
              >
                <MetricBadgeWithAnimatedIcon
                  badge={stat.badge}
                  delayMs={idx * 450}
                  prefersReducedMotion={prefersReducedMotion}
                  isDark={isDark}
                  renderIcon={stat.renderIcon}
                />

                <div className="mt-4 flex items-start font-medium tracking-tight leading-none">
                  <span className="text-[42px] @sm:text-[48px]">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  </span>
                  <span className="ml-1 mt-0.5 text-[22px] @sm:text-[26px] font-medium leading-none">
                    {stat.sup}
                  </span>
                </div>

                <p
                  className={cn(
                    "mt-3.5 max-w-[235px] text-[12px] leading-relaxed",
                    isDark ? "text-zinc-400" : "text-zinc-500",
                  )}
                >
                  {stat.description}
                </p>
              </motion.div>

              {idx < 2 && (
                <div
                  aria-hidden
                  className={cn(
                    "hidden @4xl:block w-px self-stretch border-r border-dashed",
                    isDark ? "border-white/10" : "border-zinc-200",
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* 6. Email Analytics Section */}
      <section
        className={cn(
          "relative z-10 -mx-4 @sm:-mx-6 @lg:-mx-8 px-4 @sm:px-6 @lg:px-8 py-14 @sm:py-20 transition-colors",
          isDark ? "bg-white/[0.03]" : "bg-[#F9F9F9]",
        )}
      >
        <div className="mx-auto max-w-md @4xl:max-w-5xl">
          {/* Centered Header */}
          <div className="text-center">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
              }
              className={cn(
                "inline-flex items-center rounded-full border px-5 py-1 text-[11px] font-medium",
                isDark
                  ? "border-white/10 bg-white/[0.05] text-zinc-300"
                  : "border-zinc-200/80 bg-white text-zinc-600",
              )}
            >
              Live Insights
            </motion.div>

            <motion.h3
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }
              }
              className="mt-4 text-[26px] @sm:text-[34px] @lg:text-[40px] font-semibold tracking-tight leading-[1.15]"
            >
              Measure every click with{" "}
              <span className={isDark ? "text-zinc-500" : "text-[#C1C1C1]"}>
                clarity.
              </span>
            </motion.h3>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }
              }
              className={cn(
                "mx-auto mt-3 max-w-lg text-[11.5px] @sm:text-[12.5px] leading-relaxed",
                isDark ? "text-zinc-400" : "text-zinc-500",
              )}
            >
              Monitor revenue attribution, subscriber growth, and inbox placement in real time.
              <br className="hidden @sm:inline" /> Turn raw campaign metrics into clear next steps.
            </motion.p>
          </div>

          {/* 2-Column Analytics Cards */}
          <div className="mt-10 grid grid-cols-1 @4xl:grid-cols-2 gap-5 items-stretch">
            {/* Left Card: Total Sales */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
              }
              className={cn(
                "rounded-3xl p-5 @sm:p-6 flex flex-col justify-between",
                isDark ? "bg-[#141720]" : "bg-white",
              )}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex size-6 items-center justify-center rounded-md bg-primary text-white">
                      <TrendingUp className="size-3.5" aria-hidden />
                    </span>
                    <span className="text-[13px] font-semibold">Attributed Revenue</span>
                  </div>

                  <button
                    type="button"
                    className={cn(
                      "rounded-lg border px-3 py-1 text-[10.5px] font-medium transition-colors cursor-pointer",
                      isDark
                        ? "border-white/10 text-zinc-300 hover:bg-white/[0.05]"
                        : "border-zinc-200/80 text-zinc-600 hover:bg-zinc-50",
                    )}
                  >
                    Export
                  </button>
                </div>

                {/* Big Number + Growth Pill */}
                <div className="mt-5 flex flex-wrap items-center gap-2.5">
                  <span className="text-[28px] @sm:text-[32px] font-semibold tracking-tight leading-none">
                    <AnimatedCounter
                      target={14890}
                      prefix="+$"
                      suffix=".00"
                      useLocale
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="size-2.5" aria-hidden />
                    <AnimatedCounter
                      target={18.4}
                      prefix="+"
                      suffix="%"
                      decimals={1}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  </span>
                </div>
              </div>

              {/* Channel Bar Rows */}
              <div
                className={cn(
                  "mt-5 border-t pt-5 space-y-2.5",
                  isDark ? "border-white/[0.07]" : "border-zinc-100",
                )}
              >
                {[
                  {
                    name: "Welcome Flow",
                    value: 94,
                    width: "w-[78%]",
                    badgeBg: "bg-[#42B549] text-white",
                    icon: "W",
                  },
                  {
                    name: "Cart Recovery",
                    value: 68,
                    width: "w-[46%]",
                    badgeBg: "bg-[#EE4D2D] text-white",
                    icon: "C",
                  },
                  {
                    name: "Product Launch",
                    value: 82,
                    width: "w-[60%]",
                    badgeBg: "bg-zinc-950 text-white",
                    icon: "P",
                  },
                  {
                    name: "Weekly Digest",
                    value: 54,
                    width: "w-[52%]",
                    badgeBg: "bg-[#95BF47] text-white",
                    icon: "D",
                  },
                ].map((channel, idx) => (
                  <motion.div
                    key={channel.name}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.5, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }
                    }
                    className="flex items-center justify-between gap-3"
                  >
                    <div
                      className={cn(
                        "flex items-center gap-2.5 rounded-xl border px-3 py-2.5 transition-all",
                        channel.width,
                        isDark
                          ? "border-white/[0.06] bg-white/[0.05]"
                          : "border-zinc-200/50 bg-[#F9F9F9]",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-5 shrink-0 items-center justify-center rounded-md text-[10px] font-bold",
                          channel.badgeBg,
                        )}
                      >
                        {channel.icon}
                      </span>
                      <span className="text-[11.5px] font-medium truncate">
                        {channel.name}
                      </span>
                    </div>

                    <span
                      className={cn(
                        "text-[11px] font-medium tabular-nums shrink-0",
                        isDark ? "text-zinc-400" : "text-zinc-500",
                      )}
                    >
                      <AnimatedCounter
                        target={channel.value}
                        suffix="k"
                        prefersReducedMotion={prefersReducedMotion}
                      />
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Card: Total Visitor */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }
              }
              className={cn(
                "rounded-3xl p-5 @sm:p-6 flex flex-col justify-between",
                isDark ? "bg-[#141720]" : "bg-white",
              )}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex size-6 items-center justify-center rounded-md bg-[#8B7CFF]/15 text-[#8B7CFF]">
                      <Users className="size-3.5" aria-hidden />
                    </span>
                    <span className="text-[13px] font-semibold">Total Opens</span>
                  </div>

                  <button
                    type="button"
                    className={cn(
                      "rounded-lg border px-3 py-1 text-[10.5px] font-medium transition-colors cursor-pointer",
                      isDark
                        ? "border-white/10 text-zinc-300 hover:bg-white/[0.05]"
                        : "border-zinc-200/80 text-zinc-600 hover:bg-zinc-50",
                    )}
                  >
                    Breakdown
                  </button>
                </div>

                {/* Big Number + Positive Pill */}
                <div className="mt-5 flex items-center gap-2.5">
                  <span className="text-[28px] @sm:text-[32px] font-semibold tracking-tight leading-none">
                    <AnimatedCounter
                      target={126480}
                      useLocale
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  </span>
                  <span className="inline-flex items-center rounded-full bg-primary/15 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                    <AnimatedCounter
                      target={6.2}
                      prefix="+"
                      suffix="%"
                      decimals={1}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  </span>
                </div>

                {/* Stream Breakdown Rows */}
                <div
                  className={cn(
                    "mt-5 divide-y border-t",
                    isDark
                      ? "divide-white/[0.07] border-white/[0.07]"
                      : "divide-zinc-100 border-zinc-100",
                  )}
                >
                  {[
                    {
                      icon: Globe,
                      label: "Transactional",
                      amount: 78240,
                      delta: 9.1,
                      positive: true,
                    },
                    {
                      icon: Home,
                      label: "Newsletter",
                      amount: 48240,
                      delta: 3.4,
                      positive: true,
                    },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between py-2.5 text-[11.5px]"
                    >
                      <div className="flex items-center gap-2">
                        <row.icon
                          className={cn(
                            "size-3.5",
                            isDark ? "text-zinc-400" : "text-zinc-500",
                          )}
                          aria-hidden
                        />
                        <span
                          className={cn(
                            "font-medium",
                            isDark ? "text-zinc-200" : "text-zinc-700",
                          )}
                        >
                          {row.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-semibold tabular-nums">
                          <AnimatedCounter
                            target={row.amount}
                            useLocale
                            prefersReducedMotion={prefersReducedMotion}
                          />
                        </span>
                        <span
                          className={cn(
                            "w-11 text-right font-medium tabular-nums",
                            row.positive ? "text-emerald-500" : "text-primary",
                          )}
                        >
                          <AnimatedCounter
                            target={row.delta}
                            prefix="+"
                            suffix="%"
                            decimals={1}
                            prefersReducedMotion={prefersReducedMotion}
                          />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Purple Gradient Bar Chart */}
              <div className="mt-5">
                <div className="flex items-end justify-between gap-1.5 h-28">
                  {[62, 48, 66, 76, 86, 72, 54, 70].map((h, idx) => (
                    <motion.div
                      key={idx}
                      initial={prefersReducedMotion ? false : { scaleY: 0, opacity: 0 }}
                      whileInView={{ scaleY: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : {
                              duration: 0.55,
                              delay: idx * 0.08,
                              ease: [0.16, 1, 0.3, 1],
                            }
                      }
                      style={{ height: `${h}%`, transformOrigin: "bottom" }}
                      className="flex-1 rounded-t-xs border-t-2 border-[#8B7CFF]/70 bg-gradient-to-b from-[#8B7CFF]/40 via-[#8B7CFF]/15 to-transparent"
                    />
                  ))}
                </div>
                <div
                  className={cn(
                    "mt-2 flex items-center justify-between px-1 text-[9.5px] font-medium",
                    isDark ? "text-zinc-500" : "text-zinc-400",
                  )}
                >
                  {["08:00", "11:00", "14:00", "17:00", "20:00"].map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials Section */}
      <section
        id="testimonials"
        className="relative z-10 -mx-4 @sm:-mx-6 @lg:-mx-8 overflow-hidden px-4 @sm:px-6 @lg:px-8 pt-16 @sm:pt-20 pb-14 @sm:pb-16"
      >
        <div className="mx-auto max-w-md @4xl:max-w-6xl">
          {/* Centered Heading */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
            }
            className="text-center"
          >
            <h3 className="text-[24px] @sm:text-[32px] @lg:text-[36px] font-semibold tracking-tight leading-[1.2]">
              Trusted by 12,000+ teams, founders,
              <br className="hidden @sm:inline" />{" "}
              and{" "}
              <span className={isDark ? "text-zinc-500" : "text-[#C2C2C2]"}>
                growing brands
              </span>
            </h3>
          </motion.div>

          {/* Staggered Testimonial Cards (Infinite Right-to-Left Marquee) */}
          <div className="relative mt-10 @sm:mt-12 overflow-hidden">
            {(() => {
              const testimonials = [
                {
                  quote:
                    "Switching our lifecycle emails to Mailora doubled our onboarding activation within three weeks. The visual builder is fast and reliable.",
                  name: "Marcus Vance",
                  role: "Head of Growth, Northstar",
                  offset: false,
                  avatar:
                    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg",
                },
                {
                  quote:
                    "Our weekly newsletter open rates jumped from 24% to 41% after enabling Mailora's send-time optimization and AI subject testing.",
                  name: "Hannah Lindqvist",
                  role: "Marketing Lead, Veloce",
                  offset: true,
                  avatar:
                    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg",
                },
                {
                  quote:
                    "Mailora replaced three separate tools for our team. Every transactional and promotional flow now lives in one clean dashboard.",
                  name: "Devon Brooks",
                  role: "Product Director, Kinetix",
                  offset: false,
                  avatar:
                    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg",
                },
                {
                  quote:
                    "Deliverability used to be our biggest bottleneck. With Mailora's automated warmup, our campaigns consistently land in the primary inbox.",
                  name: "Priya Nair",
                  role: "VP of Marketing, Solis",
                  offset: true,
                  avatar:
                    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg",
                },
              ];

              return (
                <motion.div
                  animate={prefersReducedMotion ? undefined : { x: ["0%", "-50%"] }}
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : { duration: 40, ease: "linear", repeat: Infinity }
                  }
                  className="flex w-max items-start will-change-transform"
                >
                  {[0, 1].map((dupIdx) => (
                    <div
                      key={dupIdx}
                      aria-hidden={dupIdx === 1}
                      className="flex shrink-0 items-start gap-5 @lg:gap-6 pr-5 @lg:pr-6"
                    >
                      {testimonials.map((item) => (
                        <article
                          key={`${dupIdx}-${item.name}`}
                          className={cn(
                            "relative w-[260px] @sm:w-[290px] @lg:w-[310px] shrink-0 rounded-2xl px-6 pt-7 pb-14 transition-colors",
                            item.offset && "mt-8 @md:mt-10",
                            isDark
                              ? "bg-gradient-to-b from-white/[0.045] via-white/[0.025] to-transparent"
                              : "bg-gradient-to-b from-[#F8F8F8] via-[#F9F9F9] to-transparent",
                          )}
                        >
                          <div className="flex items-start gap-2.5">
                            <svg
                              viewBox="0 0 18 14"
                              aria-hidden
                              className={cn(
                                "mt-0.5 h-3.5 w-4.5 shrink-0",
                                isDark ? "text-zinc-600" : "text-[#CFCFCF]",
                              )}
                              fill="currentColor"
                            >
                              <motion.path
                                d="M1.2 13V7.6C1.2 4.4 2.7 2.2 5.7 1.1L6.6 2.5C4.7 3.3 3.9 4.7 3.8 6.8H6.6V13H1.2Z"
                                animate={
                                  prefersReducedMotion
                                    ? undefined
                                    : { opacity: [0.55, 1, 0.55], y: [0, -1.2, 0] }
                                }
                                transition={
                                  prefersReducedMotion
                                    ? undefined
                                    : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
                                }
                              />
                              <motion.path
                                d="M9.6 13V7.6C9.6 4.4 11.1 2.2 14.1 1.1L15 2.5C13.1 3.3 12.3 4.7 12.2 6.8H15V13H9.6Z"
                                animate={
                                  prefersReducedMotion
                                    ? undefined
                                    : { opacity: [0.55, 1, 0.55], y: [0, -1.2, 0] }
                                }
                                transition={
                                  prefersReducedMotion
                                    ? undefined
                                    : {
                                        duration: 2.8,
                                        delay: 0.25,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                      }
                                }
                              />
                            </svg>

                            <div className="flex-1 min-w-0">
                              <p
                                className={cn(
                                  "text-[11.5px] @sm:text-[12px] leading-[1.65]",
                                  isDark ? "text-zinc-300" : "text-zinc-700",
                                )}
                              >
                                {item.quote}
                              </p>

                              <div className="mt-7">
                                <div className="size-9 overflow-hidden rounded-full">
                                  <img
                                    src={item.avatar}
                                    alt={item.name}
                                    className="size-full object-cover"
                                  />
                                </div>

                                <p
                                  className={cn(
                                    "mt-2.5 text-[12px] font-semibold tracking-tight",
                                    isDark ? "text-zinc-100" : "text-zinc-900",
                                  )}
                                >
                                  {item.name}
                                </p>

                                <div
                                  className={cn(
                                    "my-2.5 h-px w-full",
                                    isDark ? "bg-white/[0.06]" : "bg-zinc-200/50",
                                  )}
                                />

                                <p
                                  className={cn(
                                    "text-[11px]",
                                    isDark ? "text-zinc-400" : "text-zinc-500",
                                  )}
                                >
                                  {item.role}
                                </p>
                              </div>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  ))}
                </motion.div>
              );
            })()}

            {/* Subtle Left & Right Edge Fades */}
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-y-0 left-0 w-10 @sm:w-16",
                isDark
                  ? "bg-gradient-to-r from-[#0B0D12] to-transparent"
                  : "bg-gradient-to-r from-white to-transparent",
              )}
            />
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-y-0 right-0 w-10 @sm:w-16",
                isDark
                  ? "bg-gradient-to-l from-[#0B0D12] to-transparent"
                  : "bg-gradient-to-l from-white to-transparent",
              )}
            />
          </div>
        </div>
      </section>

      {/* 8. CTA Section */}
      <section
        id="cta"
        className="relative z-10 py-10 @4xl:py-14"
      >
        <div className="mx-auto max-w-md @4xl:max-w-5xl">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
            }
            className={cn(
              "relative overflow-hidden rounded-[24px] @4xl:rounded-[28px] transition-colors",
              isDark
                ? "border border-white/[0.08] bg-[#141720]"
                : "bg-gradient-to-r from-[#F9F9F9] via-[#F9F9F9] to-[#FCF4F0]",
            )}
          >
            {/* Subtle warm peach ambient tint behind tablet */}
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full blur-3xl",
                isDark ? "bg-primary/[0.08]" : "bg-primary/[0.05]",
              )}
            />

            <div className="relative grid grid-cols-1 @4xl:grid-cols-12 items-stretch gap-6 @4xl:gap-4 px-6 @sm:px-8 @4xl:px-12">
              {/* Left Copy + Actions */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }
                }
                className="@4xl:col-span-6 relative z-10 pt-12 pb-4 @4xl:py-22"
              >
                <h3 className="text-[32px] @sm:text-[38px] @4xl:text-[48px] font-medium tracking-tight leading-[1.12]">
                  Ship better email flows
                  <br />
                  <span className={isDark ? "text-zinc-500" : "text-[#C1C1C1]"}>
                    starting today
                  </span>
                </h3>

                <p
                  className={cn(
                    "mt-5 max-w-md text-[12px] @4xl:text-[13px] leading-relaxed",
                    isDark ? "text-zinc-400" : "text-zinc-500",
                  )}
                >
                  Connect your product events, personalize every message, and scale without limits.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-primary to-[color-mix(in_oklab,var(--primary)_86%,black)] px-7 py-3.5 text-[12.5px] font-medium text-white cursor-pointer"
                  >
                    Get Started Free
                  </button>

                  <button
                    type="button"
                    className={cn(
                      "inline-flex items-center justify-center gap-2.5 rounded-full border px-6 py-3.5 text-[12.5px] font-medium cursor-pointer",
                      isDark
                        ? "border-white/15 bg-white/[0.04] text-zinc-100"
                        : "border-zinc-200 bg-white text-zinc-900",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-4 items-center justify-center rounded-full",
                        isDark ? "bg-white text-zinc-900" : "bg-zinc-900 text-white",
                      )}
                    >
                      <Play className="size-2 fill-current translate-x-[0.5px]" aria-hidden />
                    </span>
                    <span>Tour the Product</span>
                  </button>
                </div>
              </motion.div>

              {/* Right Tilted Tablet Mockup */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.7, delay: 0.14, ease: [0.16, 1, 0.3, 1] }
                }
                className="@4xl:col-span-6 relative h-[280px] @sm:h-[300px] @4xl:h-auto @4xl:self-stretch"
              >
                <div
                  aria-hidden
                  className={cn(
                    "absolute left-2 @sm:left-4 @4xl:left-6 top-14 @4xl:top-[142px] w-[420px] @sm:w-[450px] @4xl:w-[520px] origin-top-left -rotate-[9.5deg] rounded-[24px] p-[2px]",
                    isDark
                      ? "bg-gradient-to-br from-zinc-600 via-zinc-800 to-zinc-700"
                      : "bg-gradient-to-br from-zinc-300 via-zinc-500 to-zinc-400",
                  )}
                >
                  {/* Black Glass Bezel */}
                  <div className="relative rounded-[22px] bg-[#111215] p-[11px] @sm:p-[13px]">
                    {/* Front Camera Dot on Left Bezel */}
                    <span className="absolute left-[4.5px] @sm:left-[5.5px] top-1/2 -translate-y-1/2 size-[4px] rounded-full bg-zinc-700 ring-1 ring-zinc-600/50" />

                    {/* Inner Screen */}
                    <div
                      className={cn(
                        "min-h-[330px] @4xl:min-h-[380px] overflow-hidden rounded-[13px] px-4 pb-4 pt-2.5 @sm:px-5 @sm:pb-5 @sm:pt-3",
                        isDark ? "bg-[#0F1219]" : "bg-[#EFEFEF]",
                      )}
                    >
                      {/* Tablet Inner Header */}
                      <div>
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-1.5 py-[1px] text-[5.5px] font-medium",
                            isDark
                              ? "bg-white/[0.05] text-zinc-300"
                              : "bg-[#F2F4F3] text-zinc-500",
                          )}
                        >
                          Smart Studio
                        </span>

                        <div className="mt-2 flex items-center justify-between gap-3 pr-3 @sm:pr-5 @4xl:pr-8">
                          <p className="text-[17.5px] @sm:text-[19px] font-semibold tracking-tight leading-[1.18]">
                            Craft high-converting emails
                            <br />
                            <span
                              className={cn(
                                "mt-[3px] inline-block",
                                isDark ? "text-zinc-500" : "text-zinc-400",
                              )}
                            >
                              in minutes.
                            </span>
                          </p>

                          <div className="flex items-center -space-x-1.5 shrink-0">
                            <span
                              className={cn(
                                "flex size-7 items-center justify-center rounded-full text-primary",
                                isDark ? "bg-white/[0.1]" : "bg-[#E1E1E1]",
                              )}
                            >
                              <TrendingUp className="size-2.5" />
                            </span>
                            <span className="relative z-10 flex size-7 items-center justify-center rounded-full bg-primary text-white">
                              <Zap className="size-2.5 fill-current" />
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Tablet Inner 2-Column Preview Cards */}
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        {/* Mini Card 1: AI Subject Line */}
                        <div
                          className={cn(
                            "rounded-xl p-3",
                            isDark ? "bg-[#161A25]" : "bg-[#F2F4F3]",
                          )}
                        >
                          <p className="text-[8.5px] font-semibold tracking-tight">
                            Write subject lines that get opened
                          </p>

                          <div
                            className={cn(
                              "mt-2 rounded-lg p-2",
                              isDark ? "bg-white/[0.03]" : "bg-[#EFEFEF]",
                            )}
                          >
                            <div className="flex items-center justify-between text-[7px] text-zinc-400">
                              <span className="inline-flex items-center gap-1">
                                <Wand2 className="size-2.5 text-primary" />
                                AI Copy Assistant
                              </span>
                              <span className="font-semibold text-emerald-500">+22.4%</span>
                            </div>
                            <p className="mt-1.5 text-[8px] font-medium">Welcome Series</p>
                            <div className="mt-2 flex items-center justify-center gap-1 rounded-full bg-primary py-1 text-[7.5px] font-medium text-white">
                              <Zap className="size-2.5 fill-current" />
                              Suggest New Line
                            </div>
                          </div>

                          <div className="mt-2 flex items-center gap-1">
                            <span
                              className={cn(
                                "rounded-full px-1.5 py-0.5 text-[6.5px]",
                                isDark
                                  ? "bg-white/[0.05] text-zinc-400"
                                  : "bg-[#EFEFEF] text-zinc-500",
                              )}
                            >
                              Onboarding
                            </span>
                            <span
                              className={cn(
                                "rounded-full px-1.5 py-0.5 text-[6.5px]",
                                isDark
                                  ? "bg-white/[0.05] text-zinc-400"
                                  : "bg-[#EFEFEF] text-zinc-500",
                              )}
                            >
                              Retention
                            </span>
                          </div>

                          <div
                            className={cn(
                              "mt-2 rounded-md px-2 py-1.5 text-[6.5px]",
                              isDark
                                ? "bg-white/[0.02] text-zinc-300"
                                : "bg-[#EFEFEF] text-zinc-600",
                            )}
                          >
                            <p className="truncate">
                              Your onboarding checklist is ready — launch in 5 minutes
                            </p>
                            <div className="mt-1.5 flex items-center justify-between text-[6px]">
                              <span className="inline-flex items-center gap-1 text-emerald-500 font-medium">
                                <span className="size-1.5 rounded-full bg-emerald-500" />
                                Approved
                              </span>
                              <span className="text-zinc-400">99.1% score</span>
                            </div>
                          </div>

                          <div
                            className={cn(
                              "mt-2 flex items-center justify-between rounded-md px-2 py-1.5 text-[6.5px]",
                              isDark
                                ? "bg-white/[0.02] text-zinc-400"
                                : "bg-[#EFEFEF] text-zinc-500",
                            )}
                          >
                            <span>Click rate lift</span>
                            <span className="font-semibold text-emerald-500">+31.2%</span>
                          </div>
                        </div>

                        {/* Mini Card 2: Collaborate */}
                        <div
                          className={cn(
                            "rounded-xl p-3",
                            isDark ? "bg-[#161A25]" : "bg-[#F2F4F3]",
                          )}
                        >
                          <p className="text-center text-[8.5px] font-semibold tracking-tight">
                            Collaborate before you hit send
                          </p>

                          <div className="mt-2.5 grid grid-cols-12 gap-2 items-start">
                            {/* Left Sub-card: Live Preview + Photo + Author */}
                            <div
                              className={cn(
                                "col-span-7 rounded-lg p-2",
                                isDark ? "bg-white/[0.04]" : "bg-[#EFEFEF]",
                              )}
                            >
                              <p
                                className={cn(
                                  "text-[6px] font-medium",
                                  isDark ? "text-zinc-400" : "text-zinc-500",
                                )}
                              >
                                Live Preview
                              </p>

                              <div className="mt-1.5 h-16 rounded-md overflow-hidden">
                                <img
                                  src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1795848272/gemini_generated_image_rjovsfrjovsfrjov-1795848268642.jpg"
                                  alt=""
                                  className="size-full object-cover"
                                />
                              </div>

                              <p
                                className={cn(
                                  "mt-2 text-[6.5px] leading-snug",
                                  isDark ? "text-zinc-300" : "text-zinc-600",
                                )}
                              >
                                Real-time feedback from your growth team
                              </p>

                              <div className="mt-3 flex items-center gap-1.5">
                                <img
                                  src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_80,h_80,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg"
                                  alt=""
                                  className="size-3.5 rounded-full object-cover shrink-0"
                                />
                                <span
                                  className={cn(
                                    "text-[6px] font-medium",
                                    isDark ? "text-zinc-400" : "text-zinc-500",
                                  )}
                                >
                                  Nadia Rahman
                                </span>
                              </div>
                            </div>

                            {/* Right Column: Views Pill + Avatars + Overlapping Comment Card */}
                            <div className="col-span-5 flex flex-col items-start">
                              <div
                                className={cn(
                                  "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[6px] font-medium",
                                  isDark
                                    ? "bg-white/[0.05] text-zinc-300"
                                    : "bg-[#EFEFEF] text-zinc-600",
                                )}
                              >
                                <Eye className="size-2.5" />
                                <span>2,450 Opens</span>
                              </div>

                              <div className="mt-2.5 flex items-center -space-x-1">
                                {[
                                  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_80,h_80,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg",
                                  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_80,h_80,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg",
                                  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_80,h_80,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg",
                                ].map((src, i) => (
                                  <img
                                    key={i}
                                    src={src}
                                    alt=""
                                    className="size-4 rounded-full object-cover"
                                  />
                                ))}
                                <span className="flex size-4 items-center justify-center rounded-full bg-[#8B7CFF] text-[5px] font-semibold text-white">
                                  16+
                                </span>
                              </div>

                              {/* Overlapping Comment Card */}
                              <div
                                className={cn(
                                  "relative z-10 mt-2.5 -ml-5 w-[calc(100%+20px)] rounded-xl p-2",
                                  isDark ? "bg-[#1E2331]" : "bg-[#F2F4F3]",
                                )}
                              >
                                <div className="flex items-center gap-1.5">
                                  <img
                                    src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_80,h_80,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg"
                                    alt=""
                                    className="size-3.5 rounded-full object-cover shrink-0"
                                  />
                                  <span className="text-[6.5px] font-semibold">
                                    David Chen
                                  </span>
                                </div>

                                <p
                                  className={cn(
                                    "mt-1 text-[5.5px] leading-snug",
                                    isDark ? "text-zinc-300" : "text-zinc-600",
                                  )}
                                >
                                  <span className="rounded bg-sky-500/15 px-0.5 font-medium text-sky-600">
                                    @Sarah
                                  </span>{" "}
                                  the new subject line tested 18% higher in our morning batch
                                </p>

                                <div className="mt-1 flex items-center gap-2 text-[5px] text-zinc-400">
                                  <span>Like</span>
                                  <span>Reply</span>
                                </div>

                                <div className="mt-2 flex items-center gap-1.5">
                                  <img
                                    src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_80,h_80,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg"
                                    alt=""
                                    className="size-3.5 rounded-full object-cover shrink-0"
                                  />
                                  <div>
                                    <p className="text-[6px] font-semibold leading-none">
                                      Claire Bennett
                                    </p>
                                    <span
                                      className={cn(
                                        "mt-1 block h-1 w-10 rounded-full",
                                        isDark ? "bg-white/10" : "bg-zinc-200",
                                      )}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 9. Footer Section */}
      <footer
        id="footer"
        className={cn(
          "relative z-10 -mx-4 @sm:-mx-6 @lg:-mx-8 px-4 @sm:px-6 @lg:px-8 mt-6 transition-colors",
          isDark ? "bg-[#0F1219]" : "bg-[#F9F9F9]",
        )}
      >
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
          }
          className="mx-auto max-w-md @4xl:max-w-5xl pt-10 pb-6 @4xl:py-16"
        >
          <div className="grid grid-cols-1 @4xl:grid-cols-[1.2fr_0.15fr_1fr_1fr_1fr_1fr] gap-8 @4xl:gap-6">
            {/* Column 1: Mailora Logo + Quick Links + Social Icons */}
            <div>
              {/* Brand Logo (Animated Mailora RadioIcon) */}
              <div className="flex items-center">
                <AnimatedMailLogo
                  prefersReducedMotion={prefersReducedMotion}
                  size={28}
                  color="var(--primary)"
                  className="text-primary"
                />
              </div>

              {/* Quick Links with Arrows */}
              <div
                className={cn(
                  "mt-8 divide-y border-b",
                  isDark
                    ? "divide-white/[0.07] border-white/[0.07]"
                    : "divide-zinc-200/70 border-zinc-200/70",
                )}
              >
                {[
                  "Product Tour",
                  "AI Studio",
                  "Templates",
                  "API & Webhooks",
                  "Changelog",
                ].map((label) => (
                  <button
                    key={label}
                    type="button"
                    className={cn(
                      "flex w-full items-center justify-between py-2.5 text-[11.5px] font-medium transition-colors cursor-pointer",
                      isDark
                        ? "text-zinc-100 hover:text-primary"
                        : "text-zinc-900 hover:text-primary",
                    )}
                  >
                    <span>{label}</span>
                    <ArrowRight className="size-3.5 opacity-80" aria-hidden />
                  </button>
                ))}
              </div>

              {/* Soft Peach Animated Social Badges */}
              <div className="mt-7 flex items-center gap-2">
                <FooterSocialIconButton
                  label="Email"
                  delayMs={0}
                  prefersReducedMotion={prefersReducedMotion}
                  isDark={isDark}
                  renderIcon={(ref) => (
                    <MailIcon
                      ref={ref as React.Ref<MailIconHandle>}
                      size={12}
                      duration={1.4}
                      isAnimated={!prefersReducedMotion}
                      color="var(--primary)"
                    />
                  )}
                />
                <FooterSocialIconButton
                  label="Twitter"
                  delayMs={450}
                  prefersReducedMotion={prefersReducedMotion}
                  isDark={isDark}
                  renderIcon={(ref) => (
                    <TwitterIcon
                      ref={ref as React.Ref<TwitterIconHandle>}
                      size={12}
                      duration={1.4}
                      isAnimated={!prefersReducedMotion}
                      color="var(--primary)"
                    />
                  )}
                />
                <FooterSocialIconButton
                  label="Instagram"
                  delayMs={900}
                  prefersReducedMotion={prefersReducedMotion}
                  isDark={isDark}
                  renderIcon={(ref) => (
                    <InstagramIcon
                      ref={ref as React.Ref<InstagramIconHandle>}
                      size={12}
                      duration={1.4}
                      isAnimated={!prefersReducedMotion}
                      color="var(--primary)"
                    />
                  )}
                />
              </div>
            </div>

            {/* Spacer gap after Column 1 on desktop */}
            <div aria-hidden className="hidden @4xl:block" />

            {/* Column 2: Product */}
            <div>
              <p className="text-[12px] font-semibold">Product</p>
              <ul
                className={cn(
                  "mt-4 space-y-2.5 text-[11.5px]",
                  isDark ? "text-zinc-400" : "text-[#7D7D7D]",
                )}
              >
                {["Overview", "Automation", "Deliverability", "Customer Stories"].map(
                  (item) => (
                    <li key={item}>
                      <button
                        type="button"
                        className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
                      >
                        {item}
                      </button>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Column 3: Navigation & Compliance */}
            <div>
              <p className="text-[12px] font-semibold">Navigation</p>
              <ul
                className={cn(
                  "mt-4 space-y-2.5 text-[11.5px]",
                  isDark ? "text-zinc-400" : "text-[#7D7D7D]",
                )}
              >
                {[
                  "Home",
                  "Capabilities",
                  "Analytics",
                  "Reviews",
                  "Pricing",
                  "Status",
                ].map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>

              <p className="mt-7 text-[12px] font-semibold">Compliance</p>
              <ul
                className={cn(
                  "mt-4 space-y-2.5 text-[11.5px]",
                  isDark ? "text-zinc-400" : "text-[#7D7D7D]",
                )}
              >
                {["Terms of Service", "Privacy Policy", "DPA & GDPR"].map(
                  (item) => (
                    <li key={item}>
                      <button
                        type="button"
                        className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
                      >
                        {item}
                      </button>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Column 4: Use Cases */}
            <div>
              <p className="text-[12px] font-semibold">Use Cases</p>
              <ul
                className={cn(
                  "mt-4 space-y-2.5 text-[11.5px]",
                  isDark ? "text-zinc-400" : "text-[#7D7D7D]",
                )}
              >
                {[
                  "SaaS Onboarding",
                  "E-commerce Flows",
                  "Creator Newsletters",
                  "Event Triggers",
                  "A/B Testing",
                  "Retention",
                ].map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: Company & Library */}
            <div>
              <p className="text-[12px] font-semibold">Company</p>
              <ul
                className={cn(
                  "mt-4 space-y-2.5 text-[11.5px]",
                  isDark ? "text-zinc-400" : "text-[#7D7D7D]",
                )}
              >
                {[
                  "Our Story",
                  "Leadership",
                  "Open Roles",
                  "Partners",
                  "Trust Center",
                  "Contact",
                ].map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex items-center gap-2">
                <p className="text-[12px] font-semibold">Library</p>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-0.5 text-[9.5px] font-medium",
                    isDark
                      ? "bg-white/15 text-zinc-100"
                      : "bg-zinc-900 text-white",
                  )}
                >
                  New
                </span>
              </div>
              <ul
                className={cn(
                  "mt-4 space-y-2.5 text-[11.5px]",
                  isDark ? "text-zinc-400" : "text-[#7D7D7D]",
                )}
              >
                {["Guides", "Benchmarks", "Playbooks"].map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Bottom Copyright + Back to Top */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }
          }
          className={cn(
            "border-t",
            isDark ? "border-white/[0.07]" : "border-zinc-200/70",
          )}
        >
          <div className="mx-auto max-w-md @4xl:max-w-5xl py-5 flex items-center justify-between gap-4 pr-10 @sm:pr-0">
            <p
              className={cn(
                "text-[11px]",
                isDark ? "text-zinc-400" : "text-zinc-500",
              )}
            >
              &copy; 2026 Mailora Inc. All rights reserved.
            </p>

            <motion.button
              type="button"
              aria-label="Scroll to Top"
              whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
              onClick={(e) => {
                let parent: HTMLElement | null = e.currentTarget.parentElement;
                while (parent) {
                  const { overflowY } = window.getComputedStyle(parent);
                  if (
                    (overflowY === "auto" || overflowY === "scroll") &&
                    parent.scrollHeight > parent.clientHeight
                  ) {
                    parent.scrollTo({ top: 0, behavior: "smooth" });
                    return;
                  }
                  parent = parent.parentElement;
                }
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={cn(
                "group absolute right-4 bottom-3.5 @sm:static inline-flex items-center gap-2.5 text-[11px] font-medium transition-colors cursor-pointer",
                isDark
                  ? "text-zinc-400 hover:text-zinc-100"
                  : "text-[#7D7D7D] hover:text-zinc-900",
              )}
            >
              <span
                className={cn(
                  "flex size-7 items-center justify-center rounded-full transition-colors",
                  isDark
                    ? "bg-white/[0.06] group-hover:bg-white/[0.12]"
                    : "bg-[#FDFDFD] group-hover:bg-white",
                )}
              >
                <motion.span
                  animate={prefersReducedMotion ? undefined : { y: [0, -2.5, 0] }}
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
                  }
                  className="flex items-center justify-center"
                >
                  <ArrowUp className="size-3" aria-hidden />
                </motion.span>
              </span>
              <span className="hidden @4xl:inline">Scroll to Top</span>
            </motion.button>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}

const MAILORA_PAGES: TemplatePreviewTab[] = [
  {
    id: "home",
    label: "Home",
    path: "/",
    render: (theme, onToggleTheme) => (
      <MailoraHeroPreview theme={theme} onToggleTheme={onToggleTheme} />
    ),
  },
];

export function MailoraTemplateView() {
  return (
    <TemplatePage
      category="Email & SaaS"
      tier="Free"
      isNew
      title="Mailora"
      description="A single-page marketing template for an email signature & campaign automation platform, featuring a floating pill navbar and hero with live metric cards in light and dark themes."
      demoDomain="https://mailora.vercel.app"
      pages={MAILORA_PAGES}
      whatYouGet={{
        description:
          "The full source code of the Mailora landing page in the preview, built as a clean Next.js project you can customize and deploy.",
        techStack: [
          { name: "Next.js", version: "16", iconKey: "nextjs" },
          { name: "React", version: "19", iconKey: "react" },
          { name: "Tailwind CSS", version: "v4", iconKey: "tailwind" },
          { name: "TypeScript", iconKey: "typescript" },
          { name: "Motion", iconKey: "motion" },
          { name: "MDX", iconKey: "mdx" },
        ],
        features: [
          "Floating dark pill navbar with active pill state and mobile drawer",
          "Hero section with inline icon badges and 4 floating metric/chart cards",
          "Light and dark theme support with built-in switcher",
          "Typed React 19 & Tailwind CSS v4 component structure",
          "Motion-safe animations respecting reduced-motion settings",
          "Clean, single-page architecture ready to extend",
        ],
      }}
      pagesOverview={{
        subtitle:
          "A focused single-page layout designed for both light and dark themes.",
        items: [
          {
            id: "home",
            number: "01",
            path: "/#navbar",
            title: "Navbar",
            description:
              "Floating dark pill navbar with logo mark, active orange pill, dropdown item, Login & Sign Up actions.",
          },
          {
            id: "home",
            number: "02",
            path: "/#hero",
            title: "Hero & Floating Metrics",
            description:
              "Tag pill, two-line headline with inline circular icon badges, dual CTAs, and 4 floating metric/chart cards.",
          },
          {
            id: "home",
            number: "03",
            path: "/#key-features",
            title: "Key Features",
            description:
              "Audience analytics with world map, team collaboration card, and interactive target & location builder.",
          },
          {
            id: "home",
            number: "04",
            path: "/#our-service",
            title: "Our Service",
            description:
              "No-code AI subject line generator and audience engagement preview cards.",
          },
          {
            id: "home",
            number: "05",
            path: "/#metrics",
            title: "Metrics Strip",
            description:
              "Three-column Customer, Impact, and Experience stats separated by dashed dividers.",
          },
          {
            id: "home",
            number: "06",
            path: "/#email-analytics",
            title: "Email Analytics",
            description:
              "Total Sales channel bars and Total Visitor store metrics with purple gradient bar chart.",
          },
          {
            id: "home",
            number: "07",
            path: "/#testimonials",
            title: "Testimonials",
            description:
              "Staggered testimonial cards with soft bottom fade, quote marks, avatars, and role dividers.",
          },
          {
            id: "home",
            number: "08",
            path: "/#cta",
            title: "CTA Banner",
            description:
              "Rounded CTA banner with Request Demo & Watch Video pills and tilted tablet editor preview.",
          },
          {
            id: "home",
            number: "09",
            path: "/#footer",
            title: "Footer",
            description:
              "Five-column footer with Mailora logo, arrow quick links, social badges, Resources News pill, and Back to Top.",
          },
        ],
      }}
      pricingSection={{
        subtitle:
          "Both are one payment, with every update to this template included.",
        options: [
          {
            label: "This template",
            badge: "Single license",
            price: "$40",
            description:
              "The Mailora single-page template on its own, ready to customize and deploy.",
            features: [
              "Full Next.js 16 & React 19 source code",
              "Floating pill Navbar & Hero in light & dark",
              "4 floating metric & chart cards included",
              "Commercial license for unlimited projects",
              "Lifetime updates for this template",
            ],
            ctaLabel: "Buy for $40",
          },
          {
            label: "All Access",
            badge: "Best value",
            price: "$80",
            description:
              "This template, every template to come, and every Pro block and component.",
            features: [
              "Everything in This template",
              "Every future website template included",
              "All Pro UI components & marketing blocks",
              "Priority support & early-access drops",
              "Unlimited commercial & client projects",
            ],
            ctaLabel: "Get All Access",
            featured: true,
          },
        ],
      }}
      afterYouBuy={{
        subtitle:
          "You're taken to your downloads right after checkout. Come back any time with the email you bought with.",
        steps: [
          "Download the zip and unpack it.",
          "Install and start it (Node.js 20.9 or newer).",
          <span key="step-3">
            Customize your brand in{" "}
            <code className="rounded bg-foreground/[0.06] px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              lib/site.ts
            </code>{" "}
            and copy in{" "}
            <code className="rounded bg-foreground/[0.06] px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              content/
            </code>
            .
          </span>,
        ],
        terminalCommand: "npm install\nnpm run dev",
      }}
    />
  );
}
