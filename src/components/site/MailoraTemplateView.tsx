"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { RadioIcon } from "@/components/ui/radio-icon";
import type { RadarIconHandle } from "@/components/ui/radar-icon";
import {
  ArrowUpRight,
  BarChart2,
  ChevronDown,
  CloudCog,
  Menu,
  Moon,
  PieChart,
  Play,
  Sun,
  TrendingUp,
  X,
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
        "@container relative w-full min-h-[600px] @lg:min-h-[640px] overflow-hidden px-4 py-5 @sm:px-6 @lg:px-8 @lg:py-6 transition-colors duration-300",
        isDark ? "bg-[#0B0D12] text-zinc-100" : "bg-white text-zinc-900",
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
