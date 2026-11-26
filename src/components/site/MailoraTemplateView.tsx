"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { RadioIcon } from "@/components/ui/radio-icon";
import type { RadarIconHandle } from "@/components/ui/radar-icon";
import {
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
}: {
  prefersReducedMotion: boolean | null;
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
    <span className="flex items-center justify-center pl-1 text-white">
      <RadioIcon
        ref={iconRef}
        size={21}
        duration={2.0}
        isAnimated={!prefersReducedMotion}
        color="#ffffff"
      />
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
  const [targetName, setTargetName] = useState("Sales Promotion");
  const [customerTypes, setCustomerTypes] = useState([
    "Teacher",
    "Man",
    "Woman",
    "Cloth",
  ]);
  const [audienceReachStep, setAudienceReachStep] = useState(5);
  const [subjectIndex, setSubjectIndex] = useState(0);

  const generatedSubjects = [
    "Spring is here, Upgrade your wardrobe for 50% off!",
    "Last chance: Unlock 40% off your seasonal refresh today",
    "Your exclusive early-access invite ends at midnight",
  ];

  const extraCustomerTypes = ["Founder", "Agency", "Retail", "SaaS"];
  const handleAddCustomerType = () => {
    const next = extraCustomerTypes.find((t) => !customerTypes.includes(t));
    if (next) {
      setCustomerTypes((prev) => [...prev, next]);
    }
  };

  const navItems = [
    { label: "Home", active: true, hasDropdown: false },
    { label: "Features", active: false, hasDropdown: true },
    { label: "Services", active: false, hasDropdown: false },
    { label: "Pricing", active: false, hasDropdown: false },
    { label: "Help", active: false, hasDropdown: false },
  ];

  const floatingCardClass = cn(
    "rounded-2xl border backdrop-blur-sm transition-colors",
    isDark
      ? "border-white/10 bg-[#141720]/95 shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
      : "border-zinc-200/70 bg-white/95 shadow-[0_12px_32px_rgba(15,23,42,0.06)]",
  );

  return (
    <div
      className={cn(
        "@container relative w-full overflow-x-clip px-4 @sm:px-6 @lg:px-8 transition-colors duration-300",
        isDark ? "bg-[#0B0D12] text-zinc-100" : "bg-white text-zinc-900",
      )}
    >
      {/* Hero + Navbar + Edge-Anchored Floating Cards */}
      <div className="relative -mx-4 @sm:-mx-6 @lg:-mx-8 px-4 @sm:px-6 @lg:px-8 pt-5 @lg:pt-6 pb-8 min-h-[600px] @lg:min-h-[640px] overflow-hidden">
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
              : "bg-[linear-gradient(to_right,rgba(255,91,31,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,91,31,0.045)_1px,transparent_1px)] bg-[size:112px_112px]",
          )}
        />

        {/* Crisp 112px-aligned warm peach-tinted cells on left */}
        <div
          className={cn(
            "absolute left-0 top-0 h-[112px] w-[112px]",
            isDark ? "bg-[#FF5B1F]/[0.05]" : "bg-[#FF5B1F]/[0.045]",
          )}
        />
        <div
          className={cn(
            "absolute left-[112px] top-[112px] h-[112px] w-[112px]",
            isDark ? "bg-[#FF5B1F]/[0.03]" : "bg-[#FF5B1F]/[0.03]",
          )}
        />
        <div
          className={cn(
            "absolute left-0 top-[224px] h-[112px] w-[112px]",
            isDark ? "bg-[#FF5B1F]/[0.04]" : "bg-[#FF5B1F]/[0.035]",
          )}
        />
        <div
          className={cn(
            "absolute left-[112px] top-[336px] h-[112px] w-[112px]",
            isDark ? "bg-[#FF5B1F]/[0.05]" : "bg-[#FF5B1F]/[0.05]",
          )}
        />
        <div
          className={cn(
            "absolute left-[224px] top-[448px] h-[112px] w-[112px]",
            isDark ? "bg-[#FF5B1F]/[0.03]" : "bg-[#FF5B1F]/[0.03]",
          )}
        />

        {/* Crisp 112px-aligned warm peach-tinted cells on right */}
        <div
          className={cn(
            "absolute right-0 top-[112px] h-[112px] w-[112px]",
            isDark ? "bg-[#FF5B1F]/[0.05]" : "bg-[#FF5B1F]/[0.045]",
          )}
        />
        <div
          className={cn(
            "absolute right-[112px] top-[224px] h-[112px] w-[112px]",
            isDark ? "bg-[#FF5B1F]/[0.03]" : "bg-[#FF5B1F]/[0.03]",
          )}
        />
        <div
          className={cn(
            "absolute right-0 top-[336px] h-[112px] w-[112px]",
            isDark ? "bg-[#FF5B1F]/[0.04]" : "bg-[#FF5B1F]/[0.04]",
          )}
        />
        <div
          className={cn(
            "absolute right-[112px] top-[448px] h-[112px] w-[112px]",
            isDark ? "bg-[#FF5B1F]/[0.05]" : "bg-[#FF5B1F]/[0.045]",
          )}
        />
      </div>

      {/* 1. Floating Black Pill Navbar */}
      <header className="relative z-20 mx-auto max-w-4xl flex items-center justify-between gap-2">
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
                    ? "bg-[#FF5B1F] text-white font-medium"
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
              Login
            </button>

            <button
              type="button"
              className="inline-flex h-8 items-center justify-center rounded-full bg-white px-4 text-[11.5px] font-semibold text-zinc-950 transition-colors hover:bg-zinc-100 cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

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
                          ? "bg-[#FF5B1F]/15 font-semibold text-[#FF5B1F]"
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
                className="inline-flex h-9 w-full items-center justify-center rounded-full bg-[#FF5B1F] text-white text-[12px] font-medium cursor-pointer"
              >
                Request Demo
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
        <span className="block h-0.5 w-4 rounded-full bg-[#FF5B1F]" />
        <div className="mt-2.5 flex items-center justify-between gap-1">
          <span className="text-[17px] font-semibold tracking-tight text-[#FF5B1F]">
            $2,320
          </span>
          <ArrowUpRight className="size-3.5 text-zinc-500" aria-hidden />
        </div>
        <p
          className={cn(
            "mt-1 text-[9.5px] font-medium",
            isDark ? "text-zinc-400" : "text-zinc-500",
          )}
        >
          Increase Rate
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
        <p className="text-[11px] font-semibold">Growth</p>
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
          {["Apr", "May", "Jun", "Jul", "Aug"].map((m) => (
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
            <span>$100k</span>
            <span>$75k</span>
            <span>$50k</span>
            <span>$25k</span>
            <span>$5k</span>
          </div>
          <div className="relative flex-1 pt-4">
            {/* Peak Tooltip */}
            <div className="absolute left-[62%] -translate-x-1/2 top-0 z-10 flex flex-col items-center">
              <span className="rounded-full bg-zinc-950 px-2 py-0.5 text-[7.5px] font-semibold text-white">
                $69k
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
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#FF5B1F] text-white">
          <TrendingUp className="size-3.5" aria-hidden />
        </span>
        <div className="flex-1 space-y-2">
          <div className="h-2 w-full rounded-full bg-gradient-to-r from-[#FF5B1F]/35 to-[#FF5B1F]/10" />
          <div className="h-2 w-3/5 rounded-full bg-gradient-to-r from-[#FF5B1F]/40 to-[#FF5B1F]/10" />
        </div>
        <span className="text-[11px] font-semibold text-[#FF5B1F] shrink-0">
          +88%
        </span>
      </motion.div>

      {/* 2. Hero Center Content */}
      <section className="relative z-10 mx-auto max-w-3xl pt-14 @sm:pt-16 pb-16">

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
                : "border-zinc-200/80 bg-white text-zinc-600 shadow-xs",
            )}
          >
            Email Signature
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
              Email signature{" "}
              <span className={isDark ? "text-zinc-500" : "text-zinc-400"}>
                marketing
              </span>
            </span>

            <span className="mt-1.5 flex flex-wrap items-center justify-center gap-2.5">
              {/* Left Overlapping Yellow + Orange Badges */}
              <span className="inline-flex items-center -space-x-2 align-middle">
                <span
                  className={cn(
                    "flex size-9 @sm:size-10 items-center justify-center rounded-full bg-[#FDE047] text-zinc-900 ring-2",
                    isDark ? "ring-[#0B0D12]" : "ring-[#FAFAFA]",
                  )}
                >
                  <PieChart className="size-4" aria-hidden />
                </span>
                <span
                  className={cn(
                    "flex size-9 @sm:size-10 items-center justify-center rounded-full bg-[#FF5B1F] text-white ring-2",
                    isDark ? "ring-[#0B0D12]" : "ring-[#FAFAFA]",
                  )}
                >
                  <BarChart2 className="size-4" aria-hidden />
                </span>
              </span>

              <span>on autopilot</span>

              {/* Right Yellow Cloud Badge */}
              <span
                className={cn(
                  "inline-flex size-9 @sm:size-10 items-center justify-center rounded-full bg-[#FDE047] text-zinc-900 ring-2 align-middle",
                  isDark ? "ring-[#0B0D12]" : "ring-[#FAFAFA]",
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
            All-in-one platform to collect, manage, and optimize campaigns
            <br className="hidden @sm:inline" /> securely and globally.
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
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#FF5B1F] px-7 text-[12.5px] font-medium text-white shadow-[0_10px_24px_rgba(255,91,31,0.3)] transition-all hover:bg-[#e84f17] active:scale-95 cursor-pointer"
            >
              Request Demo
            </button>

            <button
              type="button"
              className={cn(
                "inline-flex h-11 items-center justify-center gap-2.5 rounded-full border px-6 text-[12.5px] font-medium transition-colors active:scale-95 cursor-pointer",
                isDark
                  ? "border-white/15 bg-white/[0.05] text-white hover:bg-white/10"
                  : "border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 shadow-xs",
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
              <span>Watch Video</span>
            </button>
          </motion.div>
        </div>
      </section>
      </div>

      {/* 3. Key Features Section */}
      <section className="relative z-10 mx-auto max-w-5xl pt-12 @sm:pt-16 pb-6">
        {/* Top Tag Pill */}
        <div className="inline-flex items-center rounded-full border border-zinc-200/80 bg-white px-3.5 py-1 text-[11px] font-medium text-zinc-600 shadow-xs dark:border-white/10 dark:bg-white/[0.05] dark:text-zinc-300">
          Key Features
        </div>

        {/* Heading + Right Subtitle */}
        <div className="mt-4 flex flex-col gap-4 @md:flex-row @md:items-end @md:justify-between">
          <h3 className="text-[26px] @sm:text-[34px] @lg:text-[38px] font-semibold tracking-tight leading-[1.14]">
            Reach the right{" "}
            <span className={isDark ? "text-zinc-500" : "text-zinc-400"}>
              audience
            </span>
            <br />
            <span className={isDark ? "text-zinc-500" : "text-zinc-400"}>
              without
            </span>{" "}
            headaches.
          </h3>

          <p
            className={cn(
              "max-w-[260px] text-[11.5px] @sm:text-[12px] leading-relaxed",
              isDark ? "text-zinc-400" : "text-zinc-500",
            )}
          >
            Reach the right audience at the right time without the tech headaches.
          </p>
        </div>

        {/* Bento Container */}
        <div
          className={cn(
            "mt-8 rounded-3xl p-4 @sm:p-6 transition-colors",
            isDark ? "bg-white/[0.04]" : "bg-[#F5F5F5]",
          )}
        >
          <div className="grid grid-cols-1 @lg:grid-cols-12 gap-4 @sm:gap-5 items-stretch">
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
                "@lg:col-span-5 rounded-2xl p-5 flex flex-col justify-between",
                isDark ? "bg-[#141720]" : "bg-white",
              )}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-[15px] font-semibold tracking-tight">
                      Audience
                    </h4>
                    <p
                      className={cn(
                        "mt-0.5 text-[10.5px]",
                        isDark ? "text-zinc-400" : "text-zinc-400",
                      )}
                    >
                      Activate for 12 hours
                    </p>
                  </div>

                  <button
                    type="button"
                    className="inline-flex h-8 items-center justify-center rounded-full bg-[#FF5B1F] px-4 text-[11px] font-medium text-white transition-colors hover:bg-[#e84f17] cursor-pointer"
                  >
                    Details
                  </button>
                </div>

                {/* Big Metric + Country Pill */}
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-[28px] @sm:text-[32px] font-semibold tracking-tight leading-none">
                    14.020
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
                    <span>Russian</span>
                  </span>
                </div>

                {/* Gender Breakdown Rows */}
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
                      symbol: "♂",
                      label: "Male",
                      amount: "$2.480",
                      delta: "+5.6%",
                      positive: true,
                    },
                    {
                      symbol: "♀",
                      label: "Female",
                      amount: "$480",
                      delta: "-2.6%",
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
                          {row.amount}
                        </span>
                        <span
                          className={cn(
                            "w-11 text-right font-medium tabular-nums",
                            row.positive ? "text-emerald-500" : "text-[#FF5B1F]",
                          )}
                        >
                          {row.delta}
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
                    fill="#FF5B1F"
                  />
                  <path
                    d="M46 50 L86 52 L82 68 L58 70 L46 60 Z"
                    fill="#FF5B1F"
                  />
                  <path
                    d="M198 52 L214 52 L212 60 L196 58 Z"
                    fill="#FF5B1F"
                  />
                  <path
                    d="M312 52 L322 48 L320 62 L310 62 Z"
                    fill="#FF5B1F"
                  />
                </svg>

                {/* Floating Country Pins */}
                <div
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
                  <span>Turkey</span>
                </div>

                <div
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
                  <span>Japan</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: 2 Stacked Cards */}
            <div className="@lg:col-span-7 flex flex-col gap-4 @sm:gap-5">
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
                  Our Team
                </h4>
                <p
                  className={cn(
                    "mt-1 text-[11px] leading-relaxed",
                    isDark ? "text-zinc-400" : "text-zinc-500",
                  )}
                >
                  Clarifying roles, responsibilities, and contributions of each team
                  member to sales.
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
                {/* Target Name */}
                <div>
                  <label
                    htmlFor="mailora-target-name"
                    className="block text-[11.5px] font-semibold tracking-tight"
                  >
                    Target Name
                  </label>
                  <input
                    id="mailora-target-name"
                    type="text"
                    value={targetName}
                    onChange={(e) => setTargetName(e.target.value)}
                    className={cn(
                      "mt-2 w-full rounded-xl border px-3.5 py-2 text-[11.5px] outline-none transition-colors",
                      isDark
                        ? "border-white/10 bg-white/[0.03] text-zinc-100 focus:border-[#FF5B1F]/60"
                        : "border-zinc-200/80 bg-white text-zinc-800 focus:border-[#FF5B1F]/60",
                    )}
                  />
                </div>

                {/* Customer Type */}
                <div>
                  <p className="text-[11.5px] font-semibold tracking-tight">
                    Customer Type
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
                      className="inline-flex items-center gap-1 rounded-full border border-[#FF5B1F]/40 bg-[#FF5B1F]/[0.06] px-2.5 py-1 text-[10.5px] font-medium text-[#FF5B1F] hover:bg-[#FF5B1F]/[0.12] transition-colors cursor-pointer"
                    >
                      <span>Add New</span>
                      <Plus className="size-2.5" />
                    </button>
                  </div>
                </div>

                {/* Choose Location */}
                <div>
                  <p className="text-[11.5px] font-semibold tracking-tight">
                    Choose Location
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
                      Worldwide Audience
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
                                ? "bg-[#FF5B1F]"
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
          isDark ? "bg-white/[0.03]" : "bg-[#F5F5F5]",
        )}
      >
        <div className="mx-auto max-w-5xl">
        {/* Top Tag Pill */}
        <div
          className={cn(
            "inline-flex items-center rounded-full border px-3.5 py-1 text-[11px] font-medium shadow-xs",
            isDark
              ? "border-white/10 bg-white/[0.05] text-zinc-300"
              : "border-zinc-200/80 bg-white text-zinc-600",
          )}
        >
          Our Service
        </div>

        {/* Heading + Overlapping Action Badges */}
        <div className="mt-4 flex flex-col gap-5 @md:flex-row @md:items-center @md:justify-between">
          <h3 className="text-[26px] @sm:text-[34px] @lg:text-[38px] font-semibold tracking-tight leading-[1.15]">
            Design stunning emails with our
            <br />
            <span className={isDark ? "text-zinc-500" : "text-zinc-400"}>
              no-code editor.
            </span>
          </h3>

          <div className="flex items-center -space-x-3 self-start @md:self-auto">
            <span
              className={cn(
                "flex size-12 items-center justify-center rounded-full border shadow-sm",
                isDark
                  ? "border-white/10 bg-[#141720] text-[#FF5B1F]"
                  : "border-zinc-200/80 bg-white text-[#FF5B1F]",
              )}
            >
              <TrendingUp className="size-4" aria-hidden />
            </span>
            <span className="flex size-14 items-center justify-center rounded-full bg-[#FF5B1F] text-white shadow-[0_10px_24px_rgba(255,91,31,0.3)] ring-2 ring-white dark:ring-[#0B0D12]">
              <Zap className="size-5 fill-current" aria-hidden />
            </span>
          </div>
        </div>

        {/* 2-Column Service Cards */}
        <div className="mt-9 grid grid-cols-1 @lg:grid-cols-2 gap-5 items-stretch">
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
              "rounded-3xl border p-5 @sm:p-7 flex flex-col justify-between",
              isDark
                ? "border-white/[0.07] bg-[#141720]"
                : "border-zinc-200/60 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.03)]",
            )}
          >
            <h4 className="text-center text-[15px] @sm:text-[16px] font-semibold tracking-tight">
              Create high performing subject line
            </h4>

            <div className="mt-6">
              {/* Inner AI Generator Card */}
              <div
                className={cn(
                  "rounded-2xl border p-4",
                  isDark
                    ? "border-white/[0.07] bg-white/[0.03]"
                    : "border-zinc-200/70 bg-[#FAFAFA]",
                )}
              >
                <p
                  className={cn(
                    "text-[11px] font-medium",
                    isDark ? "text-zinc-400" : "text-zinc-500",
                  )}
                >
                  Generate with AI
                </p>

                {/* Blog Traffic Box */}
                <div
                  className={cn(
                    "mt-3 rounded-xl border p-3",
                    isDark
                      ? "border-white/10 bg-white/[0.03]"
                      : "border-zinc-200/70 bg-white",
                  )}
                >
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="font-medium">Blog Traffic</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-500">
                      <TrendingUp className="size-3" aria-hidden />
                      <span>15.16%</span>
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
                  className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#FF5B1F] text-[11.5px] font-medium text-white shadow-[0_8px_20px_rgba(255,91,31,0.25)] transition-all hover:bg-[#e84f17] active:scale-[0.99] cursor-pointer"
                >
                  <Wand2 className="size-3.5" aria-hidden />
                  <span>Generate Subject Line</span>
                </button>

                {/* Pill Tags Row */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "rounded-lg border px-2.5 py-1 text-[10px] font-medium",
                      isDark
                        ? "border-white/10 bg-white/[0.04] text-zinc-300"
                        : "border-zinc-200/70 bg-zinc-50 text-zinc-700",
                    )}
                  >
                    Add Urgency
                  </span>
                  {[48, 56, 44].map((w, idx) => (
                    <span
                      key={idx}
                      style={{ width: `${w}px` }}
                      className={cn(
                        "h-6 rounded-lg border",
                        isDark
                          ? "border-white/[0.06] bg-white/[0.02]"
                          : "border-zinc-100 bg-zinc-50/70",
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Subject Result Card */}
              <div
                className={cn(
                  "relative z-10 -mt-3 mx-1 rounded-xl border p-3.5",
                  isDark
                    ? "border-white/10 bg-[#181C27] shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
                    : "border-zinc-100 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.07)]",
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
                  <span className="inline-flex items-center gap-1.5 font-medium text-emerald-500">
                    <CheckCircle2 className="size-3.5" aria-hidden />
                    <span className={isDark ? "text-zinc-200" : "text-zinc-700"}>
                      Added
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
                  "mt-2 mx-4 flex items-center justify-between rounded-lg border px-3 py-1.5 text-[9.5px] opacity-45",
                  isDark
                    ? "border-white/[0.06] text-zinc-400"
                    : "border-zinc-200/70 text-zinc-400",
                )}
              >
                <span>+ Use Subject Line</span>
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
              "relative rounded-3xl border p-5 @sm:p-7 overflow-hidden flex flex-col justify-between",
              isDark
                ? "border-white/[0.07] bg-[#141720]"
                : "border-zinc-200/60 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.03)]",
            )}
          >
            <h4 className="text-center text-[15px] @sm:text-[16px] font-semibold tracking-tight">
              Connect with your audience
            </h4>

            <div className="relative mt-6 min-h-[275px]">
              {/* Top-Right Floating Pills: 1300 Views & 2.8m+ Followers */}
              <div className="flex flex-col items-end gap-2.5 @sm:absolute @sm:right-0 @sm:top-2 @sm:z-10 mb-4 @sm:mb-0">
                <div
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[11px] font-medium",
                    isDark
                      ? "border-white/10 bg-[#141720] text-zinc-200 shadow-md"
                      : "border-zinc-200/70 bg-white text-zinc-800 shadow-[0_6px_18px_rgba(15,23,42,0.04)]",
                  )}
                >
                  <Eye className="size-3.5 text-zinc-500" aria-hidden />
                  <span>1300 Views</span>
                </div>

                <div
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5",
                    isDark
                      ? "border-white/10 bg-[#141720] shadow-md"
                      : "border-zinc-200/70 bg-white shadow-[0_6px_18px_rgba(15,23,42,0.04)]",
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
                      28k+
                    </span>
                  </div>
                  <div className="leading-tight pr-1">
                    <p className="text-[9.5px] font-semibold">2.8m+</p>
                    <p
                      className={cn(
                        "text-[8px]",
                        isDark ? "text-zinc-400" : "text-zinc-400",
                      )}
                    >
                      Followers
                    </p>
                  </div>
                </div>
              </div>

              {/* Left Back Card: Generate with AI + Team Photo */}
              <div
                className={cn(
                  "w-full @sm:w-[58%] rounded-2xl border p-3.5",
                  isDark
                    ? "border-white/[0.07] bg-[#141720]"
                    : "border-zinc-100 bg-white shadow-[0_4px_18px_rgba(15,23,42,0.03)]",
                )}
              >
                <p
                  className={cn(
                    "text-[10.5px] font-medium",
                    isDark ? "text-zinc-400" : "text-zinc-500",
                  )}
                >
                  Generate with AI
                </p>

                <div className="mt-2.5 overflow-hidden rounded-xl">
                  <img
                    src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_600,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg"
                    alt="Team collaborating on email campaign"
                    className="h-24 w-full object-cover"
                  />
                </div>

                <p className="mt-2.5 text-[11.5px] font-medium leading-snug">
                  Discover powerful boost engagement
                </p>

                <div className="mt-2 space-y-1.5">
                  <div
                    className={cn(
                      "h-1.5 w-full rounded-full",
                      isDark ? "bg-white/10" : "bg-zinc-100",
                    )}
                  />
                  <div
                    className={cn(
                      "h-1.5 w-3/4 rounded-full",
                      isDark ? "bg-white/10" : "bg-zinc-100",
                    )}
                  />
                </div>

                <div className="mt-3 flex items-center gap-2 pt-2 border-t border-current/5">
                  <img
                    src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_80,h_80,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg"
                    alt="Hello Cralencel"
                    className="size-4 rounded-full object-cover"
                  />
                  <span
                    className={cn(
                      "text-[9.5px]",
                      isDark ? "text-zinc-400" : "text-zinc-500",
                    )}
                  >
                    Hello Cralencel
                  </span>
                </div>
              </div>

              {/* Overlapping Front-Right Comment Thread Card */}
              <div
                className={cn(
                  "mt-4 @sm:mt-0 @sm:absolute @sm:right-0 @sm:bottom-0 @sm:w-[60%] z-10 rounded-2xl border p-3.5",
                  isDark
                    ? "border-white/10 bg-[#181C27] shadow-[0_14px_32px_rgba(0,0,0,0.5)]"
                    : "border-zinc-100 bg-white shadow-[0_14px_32px_rgba(15,23,42,0.08)]",
                )}
              >
                {/* Comment 1 */}
                <div>
                  <div className="flex items-center gap-2">
                    <img
                      src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_80,h_80,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg"
                      alt="Maxwell"
                      className="size-5 rounded-full object-cover"
                    />
                    <span className="text-[11px] font-semibold">Maxwell</span>
                  </div>
                  <p
                    className={cn(
                      "mt-1.5 text-[9.5px] leading-relaxed",
                      isDark ? "text-zinc-300" : "text-zinc-600",
                    )}
                  >
                    <span className="rounded bg-blue-500/15 px-1 py-0.5 font-medium text-blue-600 dark:text-blue-400">
                      @Gerland
                    </span>{" "}
                    this is really interesting. Let&apos;s chat about this more
                    tomorrow
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
                      alt="Julian Smith"
                      className="size-5 rounded-full object-cover"
                    />
                    <span className="text-[10.5px] font-semibold">
                      Julian Smith
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
      <section className="relative z-10 mx-auto max-w-5xl py-14 @sm:py-20">
        <div className="grid grid-cols-1 @md:grid-cols-3 gap-8 @md:gap-0">
          {[
            {
              badge: "Customer",
              icon: Users,
              value: "20K",
              suffix: "+",
              description: "Design stunning emails with our no-code editor.",
            },
            {
              badge: "Impact",
              icon: Target,
              value: "99",
              suffix: "%",
              description:
                "Trigger emails based on user behavior, purchases, or engagement.",
            },
            {
              badge: "Experience",
              icon: Award,
              value: "89",
              suffix: "%",
              description:
                "Track open rates, click-throughs, conversions, and ROI.",
            },
          ].map((stat, idx) => (
            <motion.div
              key={stat.badge}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }
              }
              className={cn(
                "flex flex-col items-start @md:px-8 first:@md:pl-0 last:@md:pr-0",
                idx < 2 &&
                  (isDark
                    ? "@md:border-r @md:border-dashed @md:border-white/10"
                    : "@md:border-r @md:border-dashed @md:border-zinc-200"),
              )}
            >
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[10.5px] font-medium",
                  isDark
                    ? "bg-[#FF5B1F]/15 text-[#FF5B1F]"
                    : "bg-[#FF5B1F]/12 text-[#FF5B1F]",
                )}
              >
                <stat.icon className="size-3" aria-hidden />
                <span>{stat.badge}</span>
              </span>

              <div className="mt-5 flex items-start font-semibold tracking-tight leading-none">
                <span className="text-[40px] @sm:text-[48px]">{stat.value}</span>
                <sup className="ml-1 mt-1.5 text-[22px] @sm:text-[26px] font-medium">
                  {stat.suffix}
                </sup>
              </div>

              <p
                className={cn(
                  "mt-4 max-w-[230px] text-[12px] leading-relaxed",
                  isDark ? "text-zinc-400" : "text-zinc-500",
                )}
              >
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. Email Analytics Section */}
      <section
        className={cn(
          "relative z-10 -mx-4 @sm:-mx-6 @lg:-mx-8 px-4 @sm:px-6 @lg:px-8 py-14 @sm:py-20 transition-colors",
          isDark ? "bg-white/[0.03]" : "bg-[#F5F5F5]",
        )}
      >
        <div className="mx-auto max-w-5xl">
          {/* Centered Header */}
          <div className="text-center">
            <div
              className={cn(
                "inline-flex items-center rounded-full border px-3.5 py-1 text-[11px] font-medium shadow-xs",
                isDark
                  ? "border-white/10 bg-white/[0.05] text-zinc-300"
                  : "border-zinc-200/80 bg-white text-zinc-600",
              )}
            >
              Email Analytics
            </div>

            <h3 className="mt-4 text-[26px] @sm:text-[34px] @lg:text-[40px] font-semibold tracking-tight leading-[1.15]">
              We love making good first{" "}
              <span className={isDark ? "text-zinc-500" : "text-zinc-400"}>
                Impressions.
              </span>
            </h3>

            <p
              className={cn(
                "mx-auto mt-3 max-w-md text-[11.5px] @sm:text-[12.5px] leading-relaxed",
                isDark ? "text-zinc-400" : "text-zinc-500",
              )}
            >
              Reach the right audience at the right time without the tech headaches.
              Create, send,
              <br className="hidden @sm:inline" /> &amp; optimize email campaigns.
            </p>
          </div>

          {/* 2-Column Analytics Cards */}
          <div className="mt-10 grid grid-cols-1 @lg:grid-cols-2 gap-5 items-stretch">
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
                "rounded-3xl border p-5 @sm:p-6 flex flex-col justify-between",
                isDark
                  ? "border-white/[0.07] bg-[#141720]"
                  : "border-zinc-200/60 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.03)]",
              )}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex size-6 items-center justify-center rounded-md bg-[#FF5B1F] text-white">
                      <TrendingUp className="size-3.5" aria-hidden />
                    </span>
                    <span className="text-[13px] font-semibold">Total Sales</span>
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
                    Details
                  </button>
                </div>

                {/* Big Number + Growth Pill */}
                <div className="mt-5 flex flex-wrap items-center gap-2.5">
                  <span className="text-[28px] @sm:text-[32px] font-semibold tracking-tight leading-none">
                    +$3,224.34
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="size-2.5" aria-hidden />
                    <span>+10.8%</span>
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
                    name: "Tokopedia",
                    value: "100k",
                    width: "w-[78%]",
                    badgeBg: "bg-[#42B549] text-white",
                    icon: "T",
                  },
                  {
                    name: "Shopee",
                    value: "56k",
                    width: "w-[46%]",
                    badgeBg: "bg-[#EE4D2D] text-white",
                    icon: "S",
                  },
                  {
                    name: "Tiktok",
                    value: "78k",
                    width: "w-[60%]",
                    badgeBg: "bg-zinc-950 text-white",
                    icon: "♪",
                  },
                  {
                    name: "Shopify",
                    value: "66k",
                    width: "w-[52%]",
                    badgeBg: "bg-[#95BF47] text-white",
                    icon: "S",
                  },
                ].map((channel) => (
                  <div
                    key={channel.name}
                    className="flex items-center justify-between gap-3"
                  >
                    <div
                      className={cn(
                        "flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition-all",
                        channel.width,
                        isDark ? "bg-white/[0.05]" : "bg-[#F5F5F5]",
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
                      {channel.value}
                    </span>
                  </div>
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
                "rounded-3xl border p-5 @sm:p-6 flex flex-col justify-between",
                isDark
                  ? "border-white/[0.07] bg-[#141720]"
                  : "border-zinc-200/60 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.03)]",
              )}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex size-6 items-center justify-center rounded-md bg-[#8B7CFF]/15 text-[#8B7CFF]">
                      <Users className="size-3.5" aria-hidden />
                    </span>
                    <span className="text-[13px] font-semibold">Total Visitor</span>
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
                    Details
                  </button>
                </div>

                {/* Big Number + Negative Pill */}
                <div className="mt-5 flex items-center gap-2.5">
                  <span className="text-[28px] @sm:text-[32px] font-semibold tracking-tight leading-none">
                    84.020
                  </span>
                  <span className="inline-flex items-center rounded-full bg-[#FF5B1F]/15 px-2.5 py-0.5 text-[10px] font-semibold text-[#FF5B1F]">
                    -4%
                  </span>
                </div>

                {/* Store Breakdown Rows */}
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
                      label: "Online Store",
                      amount: "$2.480",
                      delta: "+5.6%",
                      positive: true,
                    },
                    {
                      icon: Home,
                      label: "Offline Store",
                      amount: "$480",
                      delta: "-2.6%",
                      positive: false,
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
                          {row.amount}
                        </span>
                        <span
                          className={cn(
                            "w-11 text-right font-medium tabular-nums",
                            row.positive ? "text-emerald-500" : "text-[#FF5B1F]",
                          )}
                        >
                          {row.delta}
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
                    <div
                      key={idx}
                      style={{ height: `${h}%` }}
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
                  {["09:00", "12:00", "15:00", "18:00", "21:00"].map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
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
