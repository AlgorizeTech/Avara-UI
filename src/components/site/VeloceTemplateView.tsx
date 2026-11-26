"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ArrowRightIcon } from "@/components/ui/arrow-right-icon";
import { ChartNoAxesColumnIcon } from "@/components/ui/chart-no-axes-column-icon";
import { CheckIcon } from "@/components/ui/check-icon";
import { ChevronRightIcon } from "@/components/ui/chevron-right-icon";
import { CoinsIcon } from "@/components/ui/coins-icon";
import { CompassIcon } from "@/components/ui/compass-icon";
import { CopyCheckIcon } from "@/components/ui/copy-check-icon";
import { GlobeIcon } from "@/components/ui/globe-icon";
import { FacebookIcon } from "@/components/ui/facebook-icon";
import { GmailIcon } from "@/components/ui/gmail-icon";
import { HeartIcon } from "@/components/ui/heart-icon";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { MailIcon } from "@/components/ui/mail-icon";
import { MegaphoneIcon } from "@/components/ui/megaphone-icon";
import { MousePointerClickIcon } from "@/components/ui/mouse-pointer-click-icon";
import { RadarIcon, type RadarIconHandle } from "@/components/ui/radar-icon";
import { RadioIcon } from "@/components/ui/radio-icon";
import { StarIcon } from "@/components/ui/star-icon";
import { TargetIcon } from "@/components/ui/target-icon";
import { TikTokIcon } from "@/components/ui/tiktok-icon";
import { TrophyIcon } from "@/components/ui/trophy-icon";
import { TwitterIcon } from "@/components/ui/twitter-icon";
import { WalletIcon } from "@/components/ui/wallet-icon";
import {
  ArrowRight,
  BarChart2,
  Check,
  ChevronDown,
  ChevronRight,
  Globe,
  Heart,
  Menu,
  Moon,
  MousePointerClick,
  Star,
  Sun,
  X,
} from "lucide-react";
import { TemplatePage, type TemplatePreviewTab } from "@/components/site/TemplatePage";
import { AvatarStack } from "@/components/custom/blocks/AvatarStackBlock";
import { cn } from "@/lib/utils";

const LIKE_BURST_PARTICLES = [
  { x: 0, y: -18 },
  { x: 16, y: -9 },
  { x: 16, y: 9 },
  { x: 0, y: 18 },
  { x: -16, y: 9 },
  { x: -16, y: -9 },
];

function FlipCounter({
  value,
  prefersReducedMotion,
  className,
}: {
  value: string;
  prefersReducedMotion: boolean | null;
  className?: string;
}) {
  const chars = value.split("");

  return (
    <span className={cn("inline-flex items-center tabular-nums", className)}>
      {chars.map((char, idx) => {
        const keyFromRight = chars.length - 1 - idx;
        if (!/\d/.test(char)) {
          return (
            <span key={`sep-${keyFromRight}`} className="inline-block">
              {char}
            </span>
          );
        }

        return (
          <span
            key={`pos-${keyFromRight}`}
            className="relative inline-flex overflow-hidden leading-[1.15]"
            style={{ perspective: "220px" }}
          >
            <span aria-hidden="true" className="invisible select-none">
              {char}
            </span>
            <AnimatePresence initial={false}>
              <motion.span
                key={char}
                initial={
                  prefersReducedMotion
                    ? false
                    : { y: "100%", opacity: 0, rotateX: -55 }
                }
                animate={{ y: "0%", opacity: 1, rotateX: 0 }}
                exit={
                  prefersReducedMotion
                    ? undefined
                    : { y: "-100%", opacity: 0, rotateX: 55 }
                }
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
                }
                style={{ transformOrigin: "center center" }}
                className="absolute inset-0 flex items-center justify-center will-change-transform"
              >
                {char}
              </motion.span>
            </AnimatePresence>
          </span>
        );
      })}
    </span>
  );
}

type AnimatedIconComponent = React.ForwardRefExoticComponent<
  {
    size?: number;
    duration?: number;
    isAnimated?: boolean;
    color?: string;
    className?: string;
  } & React.RefAttributes<RadarIconHandle>
>;

function LoopingAnimatedIcon({
  icon: Icon,
  size = 20,
  duration = 2.2,
  delay = 0,
  color = "var(--primary)",
  prefersReducedMotion,
  className,
}: {
  icon: AnimatedIconComponent;
  size?: number;
  duration?: number;
  delay?: number;
  color?: string;
  prefersReducedMotion: boolean | null;
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
      intervalId = setInterval(trigger, 3400);
    }, Math.round(delay * 1000));

    return () => {
      clearTimeout(startTimer);
      if (resetTimerId) clearTimeout(resetTimerId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [prefersReducedMotion, delay]);

  return (
    <Icon
      ref={iconRef}
      size={size}
      duration={duration}
      isAnimated={!prefersReducedMotion}
      color={color}
      className={className}
    />
  );
}

function VeloceRadarIconBadge({
  isDark,
  prefersReducedMotion,
  delay = 0,
  variant = "radar",
}: {
  isDark: boolean;
  prefersReducedMotion: boolean | null;
  delay?: number;
  variant?: "radar" | "radio" | "target" | "compass";
}) {
  const iconRef = useRef<RadarIconHandle>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let intervalId: ReturnType<typeof setInterval> | undefined;
    let resetTimerId: ReturnType<typeof setTimeout> | undefined;

    const triggerSweep = () => {
      iconRef.current?.stopAnimation();
      resetTimerId = setTimeout(() => {
        iconRef.current?.startAnimation();
      }, 60);
    };

    const startTimer = setTimeout(() => {
      triggerSweep();
      intervalId = setInterval(() => {
        triggerSweep();
      }, 3400);
    }, Math.round(delay * 1000));

    return () => {
      clearTimeout(startTimer);
      if (resetTimerId) clearTimeout(resetTimerId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [prefersReducedMotion, delay]);

  const IconComponent =
    variant === "radio"
      ? RadioIcon
      : variant === "target"
        ? TargetIcon
        : variant === "compass"
          ? CompassIcon
          : RadarIcon;

  return (
    <div
      className={cn(
        "flex size-10 items-center justify-center rounded-xl",
        isDark
          ? "bg-[#151821] shadow-lg"
          : "bg-white shadow-[0_4px_14px_rgb(0_0_0/0.05)]",
      )}
    >
      <IconComponent
        ref={iconRef}
        size={20}
        duration={2.4}
        isAnimated={!prefersReducedMotion}
        color="var(--primary)"
      />
    </div>
  );
}

function VeloceHeroPreview({
  theme,
  onToggleTheme,
}: {
  theme: "light" | "dark";
  onToggleTheme?: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  const isDark = theme === "dark";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [selectedFeature, setSelectedFeature] = useState(0);
  const [incomePeriod, setIncomePeriod] = useState<"monthly" | "yearly">("monthly");
  const [mgmtStep, setMgmtStep] = useState(0);
  const selectedMgmtOption = ([0, 1, 2, 1] as const)[mgmtStep % 4];
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([1, 3]);
  const [hoveredSegBar, setHoveredSegBar] = useState<number | null>(null);
  const [hoveredAvgBar, setHoveredAvgBar] = useState<number | null>(null);
  const [hoveredSalesBar, setHoveredSalesBar] = useState<number | null>(null);
  const [hoveredPlanningCard, setHoveredPlanningCard] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const intervalId = setInterval(() => {
      setMgmtStep((prev) => (prev + 1) % 4);
    }, 1600);

    return () => clearInterval(intervalId);
  }, [prefersReducedMotion]);
  const contentGridRef = useRef<HTMLDivElement>(null);
  const donutCardRef = useRef<HTMLDivElement>(null);
  const salesCardRef = useRef<HTMLDivElement>(null);
  const featureBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const planningVisualRef = useRef<HTMLDivElement>(null);
  const podiumCardRef = useRef<HTMLDivElement>(null);
  const verifiedCardRef = useRef<HTMLDivElement>(null);
  const incomeCardRef = useRef<HTMLDivElement>(null);
  const [planningConnectors, setPlanningConnectors] = useState<{
    podiumX: number;
    podiumY: number;
    verifiedLeftX: number;
    verifiedMidY: number;
    verifiedMidX: number;
    verifiedBottomY: number;
    incomeTopY: number;
    incomeLeftX: number;
    incomeRightX: number;
    incomeMidY: number;
    containerWidth: number;
  } | null>(null);
  const [connectorCoords, setConnectorCoords] = useState<{
    donutX: number;
    donutY: number;
    salesLeftX: number;
    salesMidY: number;
    startX: number;
    startY: number;
    bottomY: number;
    targetX: number;
    targetY: number;
  } | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setSelectedFeature((prev) => (prev + 1) % 4);
    }, 2200);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const updateCoords = () => {
      const grid = contentGridRef.current;
      const donut = donutCardRef.current;
      const sales = salesCardRef.current;
      const btn = featureBtnRefs.current[selectedFeature];
      if (!grid || !donut || !sales || !btn) return;

      const gridRect = grid.getBoundingClientRect();
      const donutRect = donut.getBoundingClientRect();
      const salesRect = sales.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();

      setConnectorCoords({
        donutX: donutRect.left - gridRect.left + donutRect.width * 0.5,
        donutY: donutRect.top - gridRect.top,
        salesLeftX: salesRect.left - gridRect.left,
        salesMidY: salesRect.top - gridRect.top + salesRect.height * 0.5,
        startX: salesRect.left - gridRect.left + salesRect.width * 0.5,
        startY: salesRect.bottom - gridRect.top,
        bottomY: gridRect.height - 56,
        targetX: btnRect.left - gridRect.left,
        targetY: btnRect.top - gridRect.top + btnRect.height / 2,
      });
    };

    updateCoords();
    const observer = new ResizeObserver(updateCoords);
    if (contentGridRef.current) observer.observe(contentGridRef.current);
    return () => observer.disconnect();
  }, [selectedFeature]);

  useEffect(() => {
    const updatePlanningCoords = () => {
      const container = planningVisualRef.current;
      const podium = podiumCardRef.current;
      const verified = verifiedCardRef.current;
      const income = incomeCardRef.current;
      if (!container || !podium || !verified || !income) return;

      const cRect = container.getBoundingClientRect();
      const pRect = podium.getBoundingClientRect();
      const vRect = verified.getBoundingClientRect();
      const iRect = income.getBoundingClientRect();

      setPlanningConnectors({
        podiumX: pRect.left - cRect.left + pRect.width * 0.5,
        podiumY: pRect.top - cRect.top,
        verifiedLeftX: vRect.left - cRect.left,
        verifiedMidY: vRect.top - cRect.top + vRect.height * 0.5,
        verifiedMidX: vRect.left - cRect.left + vRect.width * 0.5,
        verifiedBottomY: vRect.bottom - cRect.top,
        incomeTopY: iRect.top - cRect.top,
        incomeLeftX: iRect.left - cRect.left,
        incomeRightX: iRect.right - cRect.left,
        incomeMidY: iRect.top - cRect.top + iRect.height * 0.5,
        containerWidth: cRect.width,
      });
    };

    updatePlanningCoords();
    const observer = new ResizeObserver(updatePlanningCoords);
    if (planningVisualRef.current) observer.observe(planningVisualRef.current);
    return () => observer.disconnect();
  }, []);
  const [customerCount, setCustomerCount] = useState(15823);
  const [likePulse, setLikePulse] = useState(0);

  const triggerLike = () => {
    setCustomerCount((prev) => prev + 1);
    setLikePulse((prev) => prev + 1);
  };

  useEffect(() => {
    if (prefersReducedMotion) return;

    const intervalId = setInterval(() => {
      setCustomerCount((prev) => prev + 1);
      setLikePulse((prev) => prev + 1);
    }, 3600);

    return () => clearInterval(intervalId);
  }, [prefersReducedMotion]);

  const formattedCustomerCount = customerCount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const cardSurface = isDark
    ? "bg-[#141720]"
    : "bg-[#F8F8F8]";

  const floatingSurface = isDark
    ? "bg-[#151821] shadow-lg"
    : "bg-white shadow-[0_8px_24px_rgb(0_0_0/0.04)]";

  const floatingCardSurface = isDark
    ? "bg-[#151821] shadow-lg"
    : "bg-[#F8F8F8] shadow-[0_8px_24px_rgb(0_0_0/0.04)]";

  return (
    <div
      className={cn(
        "@container relative overflow-hidden w-full min-h-[540px] px-4 py-5 @sm:px-6 @lg:px-10 @lg:py-7 font-sans",
        isDark
          ? "bg-[#0b0d12] text-zinc-100"
          : "bg-white text-zinc-900 [&_h1]:text-[#242427] [&_h2]:text-[#242427] [&_h3]:text-[#242427] [&_h4]:text-[#242427] [&_h5]:text-[#242427]",
      )}
    >
      {/* 1. Navbar Section */}
      <header className="relative mx-auto max-w-5xl flex items-center justify-between h-8">
        {/* Mobile Left: Sidebar Toggle */}
        <button
          type="button"
          aria-label="Open navigation sidebar"
          onClick={() => setMobileMenuOpen(true)}
          className={cn(
            "@md:hidden flex size-8 items-center justify-center rounded-lg cursor-pointer transition-colors",
            isDark
              ? "bg-white/[0.06] text-zinc-200 hover:bg-white/10"
              : "bg-[#F8F8F8] text-zinc-700 hover:bg-zinc-200/70",
          )}
        >
          <Menu className="size-4" />
        </button>

        {/* Brand (Centered on mobile, Left on desktop) */}
        <div className="flex items-center gap-2 h-8 @md:static absolute left-1/2 -translate-x-1/2 @md:translate-x-0">
          <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground shrink-0">
            <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
              <path d="M4.5 5.5L12 19.5L19.5 5.5H15.8L12 12.8L8.2 5.5H4.5Z" />
            </svg>
          </span>
          <span className="text-[15px] font-semibold tracking-tight leading-none">
            Veloce
          </span>
        </div>

        {/* Center Nav Links (Desktop) */}
        <motion.nav
          aria-label="Veloce navigation"
          initial={prefersReducedMotion ? false : { opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }
          }
          className="hidden @md:flex items-center gap-6 h-8 text-[12px] leading-none"
        >
          {["Home", "About", "Service", "Blog", "Contact"].map((item, i) => (
            <span
              key={item}
              className={cn(
                "inline-flex items-center h-full cursor-pointer transition-colors",
                i === 0
                  ? isDark
                    ? "font-semibold text-white"
                    : "font-semibold text-zinc-900"
                  : isDark
                    ? "text-zinc-400 hover:text-zinc-200"
                    : "text-zinc-500 hover:text-zinc-800",
              )}
            >
              {item}
            </span>
          ))}
        </motion.nav>

        {/* Right: Theme Icon Button with Background */}
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
          title={`Switch to ${isDark ? "light" : "dark"} theme`}
          className={cn(
            "flex size-8 items-center justify-center rounded-lg shrink-0 cursor-pointer transition-colors",
            isDark
              ? "bg-white/[0.06] text-zinc-200 hover:bg-white/10"
              : "bg-[#F8F8F8] text-zinc-700 hover:bg-zinc-200/70",
          )}
        >
          {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </button>
      </header>

      {/* Full-Height Mobile Sidebar Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
              onClick={() => setMobileMenuOpen(false)}
              className="@md:hidden absolute inset-0 z-30 bg-black/35 backdrop-blur-[2px]"
            />
            <motion.aside
              aria-label="Mobile navigation"
              initial={prefersReducedMotion ? false : { x: "-100%" }}
              animate={{ x: 0 }}
              exit={prefersReducedMotion ? undefined : { x: "-100%" }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
              }
              className={cn(
                "@md:hidden absolute inset-y-0 left-0 z-40 w-64 flex flex-col justify-between p-5 border-r shadow-2xl",
                isDark
                  ? "bg-[#11141d] border-white/10 text-zinc-100"
                  : "bg-white border-zinc-200 text-zinc-900",
              )}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-current/10">
                  <div className="flex items-center gap-2">
                    <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                      <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
                        <path d="M4.5 5.5L12 19.5L19.5 5.5H15.8L12 12.8L8.2 5.5H4.5Z" />
                      </svg>
                    </span>
                    <span className="text-[15px] font-semibold tracking-tight">Veloce</span>
                  </div>
                  <button
                    type="button"
                    aria-label="Close navigation sidebar"
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex size-7 items-center justify-center rounded-lg border cursor-pointer transition-colors",
                      isDark
                        ? "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                        : "border-zinc-200 bg-zinc-100 text-zinc-600 hover:bg-zinc-200/70",
                    )}
                  >
                    <X className="size-3.5" />
                  </button>
                </div>

                <nav className="mt-4 flex flex-col gap-1">
                  {["Home", "About", "Service", "Blog", "Contact"].map((item, i) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-[13px] transition-colors cursor-pointer",
                        i === 0
                          ? isDark
                            ? "bg-white/10 font-semibold text-white"
                            : "bg-zinc-100 font-semibold text-zinc-900"
                          : isDark
                            ? "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                            : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900",
                      )}
                    >
                      <span>{item}</span>
                      {i === 0 && (
                        <span className="size-1.5 rounded-full bg-primary" />
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="pt-4 border-t border-current/10">
                <button
                  type="button"
                  className={cn(
                    "group relative inline-flex w-full items-center justify-center gap-2.5 rounded-full px-4 py-2 text-[12px] font-medium cursor-pointer transition-all duration-300 active:scale-95",
                    isDark
                      ? "bg-white text-zinc-900 hover:shadow-[0_6px_20px_rgba(255,255,255,0.18)]"
                      : "bg-zinc-900 text-white hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)]",
                  )}
                >
                  <span className="relative h-4 overflow-hidden flex flex-col">
                    <span className="transition-transform duration-300 group-hover:-translate-y-full">
                      Get Started
                    </span>
                    <span className="transition-transform duration-300 group-hover:-translate-y-full">
                      Get Started
                    </span>
                  </span>
                  <span
                    className={cn(
                      "relative flex size-5 items-center justify-center rounded-full overflow-hidden",
                      isDark ? "bg-zinc-900/10" : "bg-white/15",
                    )}
                  >
                    <ArrowRight className="size-3 transition-all duration-300 group-hover:translate-x-5 group-hover:opacity-0" />
                    <ArrowRight className="absolute size-3 -translate-x-5 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 2. Hero Section */}
      <section className="mx-auto max-w-[560px] @4xl:max-w-5xl pt-14 @sm:pt-20">
        {/* Headline */}
        <div className="text-center">
          <h3 className="flex flex-col items-center text-[30px] @sm:text-[46px] @lg:text-[62px] font-semibold tracking-tight leading-[1.12] uppercase">
            <motion.span
              initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }
              }
              className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1"
            >
              <span>ONE</span>
              <span className="inline-flex items-center -space-x-1.5 align-middle mx-0.5">
                <span
                  className={cn(
                    "flex size-9 @sm:size-11 @lg:size-12 items-center justify-center rounded-full ring-2",
                    isDark
                      ? "bg-[#1A1D27] ring-[#0b0d12]"
                      : "bg-[#F8F8F8] ring-white",
                  )}
                >
                  <LoopingAnimatedIcon
                    icon={ChartNoAxesColumnIcon}
                    size={21}
                    duration={2.0}
                    delay={0}
                    color="#d97706"
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </span>
                <span
                  className={cn(
                    "flex size-9 @sm:size-11 @lg:size-12 items-center justify-center rounded-full ring-2",
                    isDark
                      ? "bg-[#1A1D27] ring-[#0b0d12]"
                      : "bg-[#F8F8F8] ring-white",
                  )}
                >
                  <LoopingAnimatedIcon
                    icon={GlobeIcon}
                    size={21}
                    duration={2.0}
                    delay={0.25}
                    color="#059669"
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </span>
                <span
                  className={cn(
                    "flex size-9 @sm:size-11 @lg:size-12 items-center justify-center rounded-full ring-2",
                    isDark
                      ? "bg-[#1A1D27] ring-[#0b0d12]"
                      : "bg-[#F8F8F8] ring-white",
                  )}
                >
                  <LoopingAnimatedIcon
                    icon={MousePointerClickIcon}
                    size={21}
                    duration={2.0}
                    delay={0.5}
                    color="#2563eb"
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </span>
              </span>
              <span>CLICK</span>
            </motion.span>

            <motion.span
              initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }
              }
              className="w-full"
            >
              MAXIMIZING IMPACT
            </motion.span>
          </h3>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.75, delay: 0.36, ease: [0.16, 1, 0.3, 1] }
            }
            className={cn(
              "mt-7 mx-auto max-w-[490px] text-[11px] @sm:text-[11.5px] font-normal leading-relaxed",
              isDark ? "text-zinc-500" : "text-[#ACACAC]",
            )}
          >
            Unlock a world of possibilities for your brand. Our streamlined approach ensures that
            you can maximize your online presence, engagement, and conversions effortlessly.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.75, delay: 0.5, ease: [0.16, 1, 0.3, 1] }
            }
            className="mt-9 flex flex-wrap items-center justify-center gap-2.5"
          >
            {/* Get Started: Vertical text ticker + rounded arrow exit/enter swap */}
            <button
              type="button"
              className={cn(
                "group relative inline-flex h-9 items-center gap-2.5 rounded-full pl-4 pr-2 text-[11.5px] font-medium cursor-pointer transition-all duration-300 active:scale-95",
                isDark
                  ? "bg-white text-zinc-900 hover:shadow-[0_8px_24px_rgba(255,255,255,0.16)]"
                  : "bg-zinc-900 text-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]",
              )}
            >
              <span className="relative h-[16px] overflow-hidden flex flex-col leading-[16px]">
                <span className="transition-transform duration-300 ease-out group-hover:-translate-y-full">
                  Get Started
                </span>
                <span className="transition-transform duration-300 ease-out group-hover:-translate-y-full">
                  Get Started
                </span>
              </span>
              <span
                className={cn(
                  "relative flex size-6 items-center justify-center rounded-full overflow-hidden",
                  isDark ? "bg-zinc-900/10" : "bg-white/15",
                )}
              >
                <ArrowRight className="size-3 transition-all duration-300 group-hover:translate-x-5 group-hover:opacity-0" />
                <ArrowRight className="absolute size-3 -translate-x-5 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </span>
            </button>

            {/* Learn More (Hero): #F45D5D coral-tinted idle pill; animated #F45D5D underline + circle scale & arrow spin-swap on hover */}
            <button
              type="button"
              className={cn(
                "group relative inline-flex h-9 items-center gap-2.5 overflow-hidden rounded-full border pl-4 pr-2 text-[11.5px] font-medium cursor-pointer transition-colors duration-300 active:scale-95",
                isDark
                  ? "border-primary/50 bg-primary/15 text-primary hover:border-primary hover:bg-primary/20"
                  : "border-primary/45 bg-primary/[0.08] text-primary hover:border-primary hover:bg-primary/[0.14]",
              )}
            >
              <span className="relative z-10 inline-flex flex-col items-start">
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  Learn More
                </span>
                <span
                  aria-hidden
                  className="h-[1.5px] w-0 rounded-full bg-primary transition-all duration-300 ease-out group-hover:w-full"
                />
              </span>
              <span className="relative z-10 flex size-6 items-center justify-center rounded-full overflow-hidden bg-primary text-primary-foreground transition-transform duration-300 ease-out group-hover:scale-110">
                <ArrowRight className="size-3 -rotate-45 transition-all duration-300 ease-out group-hover:rotate-0 group-hover:translate-x-5 group-hover:opacity-0" />
                <ArrowRight className="absolute size-3 -translate-x-5 rotate-0 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:-rotate-45 group-hover:opacity-100" />
              </span>
            </button>
          </motion.div>
        </div>

        {/* Bottom 3-Column Bento Grid */}
        <div className="mt-16 grid grid-cols-1 @4xl:grid-cols-[minmax(0,3.25fr)_minmax(0,4.75fr)_minmax(0,4fr)] gap-3.5 items-stretch">
          {/* Left Card: Mastering the Art of Digital Marketing */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.85, delay: 0.4, ease: [0.16, 1, 0.3, 1] }
            }
            className={cn(
              "rounded-2xl p-5 flex flex-col justify-between min-h-[300px]",
              cardSurface,
            )}
          >
            <div>
              <h4 className="text-[13.5px] font-semibold leading-snug">
                Mastering the Art
                <br />
                of Digital Marketing
              </h4>
            </div>

            <motion.div
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, scale: 0.85, rotate: -6 }
              }
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.85, delay: 0.62, ease: [0.16, 1, 0.3, 1] }
              }
              className="relative my-4 flex h-44 items-center justify-center"
            >
              {/* Subtle radial-faded square grid */}
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-0 [mask-image:radial-gradient(circle_at_center,black_35%,transparent_72%)]",
                  isDark
                    ? "bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:22px_22px]"
                    : "bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:22px_22px]",
                )}
              />

              {/* Outer animated circular ring */}
              <motion.div
                aria-hidden
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { rotate: 360, scale: [1, 1.03, 1] }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : {
                        rotate: { duration: 24, repeat: Infinity, ease: "linear" },
                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                      }
                }
                className={cn(
                  "pointer-events-none absolute size-40 rounded-full border",
                  isDark ? "border-white/10" : "border-zinc-300/60",
                )}
              />

              {/* Inner pulsing circular ring */}
              <motion.div
                aria-hidden
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { scale: [0.96, 1.04, 0.96], opacity: [0.5, 0.9, 0.5] }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 3.4, repeat: Infinity, ease: "easeInOut" }
                }
                className={cn(
                  "pointer-events-none absolute size-28 rounded-full border",
                  isDark ? "border-primary/20" : "border-primary/35",
                )}
              />

              {/* Outward radiating color ripples in all 4 directions */}
              {!prefersReducedMotion &&
                [0, 1.2, 2.4].map((rippleDelay) => (
                  <motion.div
                    key={rippleDelay}
                    aria-hidden
                    initial={{ scale: 0.45, opacity: 0 }}
                    animate={{
                      scale: [0.45, 1.85],
                      opacity: [0, 0.42, 0.18, 0],
                    }}
                    transition={{
                      duration: 3.6,
                      delay: rippleDelay,
                      repeat: Infinity,
                      ease: "easeOut",
                      times: [0, 0.2, 0.65, 1],
                    }}
                    className="pointer-events-none absolute size-32 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_22%,transparent)_0%,color-mix(in_oklab,var(--primary)_8%,transparent)_45%,transparent_72%)] blur-[2px]"
                  />
                ))}

              {/* Soft radial glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute size-24 rounded-full bg-primary/12 blur-xl"
              />

              {/* Floating megaphone image */}
              <motion.img
                src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1795520794/002-1795520794090.png"
                alt="Digital marketing illustration"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [0, -5, 0], rotate: [-1.5, 1.5, -1.5] }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 3.8, repeat: Infinity, ease: "easeInOut" }
                }
                className="relative z-10 w-36 h-36 object-contain rounded-xl"
              />
            </motion.div>

            <div>
              <p
                className={cn(
                  "text-[10.5px] leading-relaxed",
                  isDark ? "text-zinc-500" : "text-[#ACACAC]",
                )}
              >
                Program that goes beyond the basics, offering you a deep dive into the art and
                science of digital marketing.
              </p>
              {/* Learn More (Bento): Segmented split-pill with right-to-left #f45d5d sweep, text roll, divider-to-dot morph & diagonal arrow launch */}
              <button
                type="button"
                className={cn(
                  "group relative mt-3.5 inline-flex h-9 items-center gap-3 overflow-hidden rounded-full pl-4 pr-3.5 text-[11.5px] font-medium cursor-pointer transition-colors duration-300 active:scale-95",
                  isDark
                    ? "bg-white text-zinc-950 hover:text-white"
                    : "bg-zinc-950 text-white",
                )}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 origin-right scale-x-0 rounded-full bg-primary transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                />
                <span className="relative z-10 h-[16px] overflow-hidden flex flex-col leading-[16px]">
                  <span className="transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                    Learn More
                  </span>
                  <span className="transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                    Learn More
                  </span>
                </span>
                <span
                  aria-hidden
                  className="relative z-10 flex h-4 w-px items-center justify-center"
                >
                  <span
                    className={cn(
                      "absolute h-4 w-px rounded-full opacity-100 transition-all duration-300 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:h-0 group-hover:opacity-0 group-hover:duration-200 group-hover:delay-0",
                      isDark ? "bg-zinc-950/30" : "bg-white/40",
                    )}
                  />
                  <span className="h-0 w-px rounded-full bg-white opacity-0 transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:h-4 group-hover:opacity-100 group-hover:duration-400 group-hover:delay-150" />
                </span>
                <span className="relative z-10 flex size-4 items-center justify-center overflow-hidden">
                  <ArrowRight className="size-3.5 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4 group-hover:-translate-y-4 group-hover:opacity-0" />
                  <ArrowRight className="absolute size-3.5 -rotate-45 -translate-x-4 translate-y-4 opacity-0 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                </span>
              </button>
            </div>
          </motion.div>

          {/* Center Card: Portrait + Floating Growth / Ads / Views Badges */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.85, delay: 0.45, ease: [0.16, 1, 0.3, 1] }
            }
            className={cn(
              "relative rounded-2xl overflow-hidden min-h-[400px] @sm:min-h-[420px] @4xl:min-h-[420px] flex items-end justify-center",
              cardSurface,
            )}
          >
            {/* Studio Portrait */}
            <img
              src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1795613111/veloce-person-removebg-preview-1795613109297.png"
              alt="Digital marketer peeking over a book"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[5] h-[86%] w-auto max-w-none object-contain object-bottom"
            />

            {/* Top-left Pill: Let's Growth! */}
            <motion.div
              initial={
                prefersReducedMotion ? false : { opacity: 0, x: -16, y: -10 }
              }
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }
              }
              className={cn(
                "absolute left-3.5 top-3.5 z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium",
                floatingSurface,
              )}
            >
              <LoopingAnimatedIcon
                icon={GlobeIcon}
                size={14}
                duration={2.2}
                delay={0.2}
                color={isDark ? "#d4d4d8" : "#52525b"}
                prefersReducedMotion={prefersReducedMotion}
              />
              <span>Let&apos;s Growth!</span>
            </motion.div>

            {/* Top-right Mini Chart Card: Segmentation */}
            <motion.div
              initial={
                prefersReducedMotion ? false : { opacity: 0, x: 16, y: -10 }
              }
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.7, delay: 0.78, ease: [0.16, 1, 0.3, 1] }
              }
              className={cn(
                "flex absolute right-2.5 @sm:right-3.5 top-2.5 @sm:top-3.5 z-[2] flex-col rounded-2xl p-2.5 @sm:p-3 w-36 @sm:w-44",
                floatingSurface,
              )}
            >
              <div className="flex items-start gap-2 pr-6 @sm:pr-8">
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full",
                    isDark ? "bg-primary/15" : "bg-primary/10",
                  )}
                >
                  <BarChart2 className="size-3 text-primary" />
                </span>
                <div className="min-w-0">
                  <span
                    className={cn(
                      "block text-[10px] font-medium leading-tight",
                      isDark ? "text-zinc-100" : "text-zinc-900",
                    )}
                  >
                    Segmentation
                  </span>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-primary/80" />
                      <span
                        className={cn(
                          "h-1 w-4 rounded-full",
                          isDark ? "bg-white/15" : "bg-zinc-200",
                        )}
                      />
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span
                        className={cn(
                          "size-1.5 rounded-full",
                          isDark ? "bg-primary/25" : "bg-primary/20",
                        )}
                      />
                      <span
                        className={cn(
                          "h-1 w-4 rounded-full",
                          isDark ? "bg-white/15" : "bg-zinc-200",
                        )}
                      />
                    </span>
                  </div>
                </div>
              </div>

              <div
                onMouseLeave={() => setHoveredBar(null)}
                className="relative mt-2 flex items-end justify-between gap-1.5 h-20"
              >
                {[
                  { h: 24, cls: "bg-primary/15" },
                  { h: 40, cls: "bg-primary/25" },
                  { h: 56, cls: "bg-primary/35" },
                  { h: 74, cls: "bg-primary/50" },
                  { h: 96, cls: "bg-primary/70" },
                ].map((bar, idx) => {
                  const isDimmed = hoveredBar !== null && hoveredBar !== idx;
                  const isHovered = hoveredBar === idx;
                  return (
                    <motion.div
                      key={idx}
                      onMouseEnter={() => setHoveredBar(idx)}
                      initial={
                        prefersReducedMotion
                          ? { height: `${bar.h}%` }
                          : { height: "0%" }
                      }
                      animate={{ height: `${bar.h}%` }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : {
                              duration: 0.75,
                              delay: 0.85 + idx * 0.12,
                              ease: [0.16, 1, 0.3, 1],
                            }
                      }
                      className={cn(
                        "flex-1 rounded-md cursor-pointer transition-colors duration-150",
                        isDimmed
                          ? isDark
                            ? "bg-white/15"
                            : "bg-zinc-200"
                          : isHovered
                            ? "bg-primary"
                            : bar.cls,
                      )}
                    />
                  );
                })}

                {/* Curved red trendline overlay */}
                <svg
                  viewBox="0 0 150 72"
                  fill="none"
                  aria-hidden
                  className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                >
                  <defs>
                    <filter
                      id="segmentation-curve-shadow"
                      x="-20%"
                      y="-20%"
                      width="140%"
                      height="160%"
                    >
                      <feDropShadow
                        dx="0"
                        dy="4"
                        stdDeviation="2.5"
                        floodColor="var(--primary)"
                        floodOpacity="0.28"
                      />
                    </filter>
                  </defs>
                  <motion.path
                    d="M 42 52 C 62 34, 88 46, 108 38 C 122 33, 130 24, 136 16"
                    stroke="var(--primary)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    filter="url(#segmentation-curve-shadow)"
                    initial={
                      prefersReducedMotion
                        ? { pathLength: 1 }
                        : { pathLength: 0 }
                    }
                    animate={{ pathLength: 1 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.9, delay: 1.15, ease: [0.16, 1, 0.3, 1] }
                    }
                  />
                  <circle cx="42" cy="52" r="2" fill="var(--primary)" />
                  <circle cx="136" cy="16" r="3.6" fill="var(--primary)" />
                </svg>
              </div>
            </motion.div>

            {/* Bottom-left Card: Google Ads */}
            <motion.div
              initial={
                prefersReducedMotion ? false : { opacity: 0, x: -14, y: 12 }
              }
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.7, delay: 0.84, ease: [0.16, 1, 0.3, 1] }
              }
              className={cn(
                "absolute left-3.5 bottom-24 @sm:bottom-36 z-10 rounded-2xl p-3 w-36 @sm:w-40",
                floatingSurface,
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className={cn(
                    "flex size-7 items-center justify-center rounded-lg",
                    isDark ? "bg-white/10" : "bg-zinc-100/90",
                  )}
                >
                  <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-medium",
                    isDark
                      ? "bg-white/10 text-zinc-200"
                      : "bg-zinc-100/90 text-zinc-700",
                  )}
                >
                  <span className="flex size-3.5 items-center justify-center rounded-full bg-green-500 text-white">
                    <LoopingAnimatedIcon
                      icon={CheckIcon}
                      size={9}
                      duration={1.8}
                      delay={0.35}
                      color="#ffffff"
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  </span>
                  Verified!
                </span>
              </div>
              <p className="mt-5 text-[15px] font-medium leading-tight tracking-tight">
                Google Ads
              </p>
              <p className="mt-1 text-[10px] leading-none">
                <span
                  className={cn(
                    "font-semibold",
                    isDark ? "text-white" : "text-zinc-900",
                  )}
                >
                  4,8
                </span>
                <span className={isDark ? "text-zinc-500" : "text-[#ACACAC]"}>
                  /5 Stars Reviews
                </span>
              </p>
            </motion.div>

            {/* Bottom-right Pill: 2,924 Views */}
            <motion.div
              initial={
                prefersReducedMotion ? false : { opacity: 0, x: 14, y: 12 }
              }
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.7, delay: 0.92, ease: [0.16, 1, 0.3, 1] }
              }
              className={cn(
                "absolute right-5 @sm:right-8 bottom-6 @sm:bottom-8 z-10 flex items-center gap-2.5 rounded-full p-1.5 pr-4",
                floatingSurface,
              )}
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <LoopingAnimatedIcon
                  icon={ArrowRightIcon}
                  size={14}
                  duration={1.8}
                  delay={0.5}
                  color="#ffffff"
                  prefersReducedMotion={prefersReducedMotion}
                />
              </span>
              <div>
                <p className="text-[11px] font-medium leading-none">2,924 Views</p>
                <div className="mt-1.5 flex items-center gap-1">
                  <div
                    className={cn(
                      "h-1.5 w-10 rounded-full",
                      isDark ? "bg-white/15" : "bg-zinc-200",
                    )}
                  />
                  <div
                    className={cn(
                      "h-1.5 w-4 rounded-full",
                      isDark ? "bg-white/15" : "bg-zinc-200",
                    )}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: 2 Stacked Cards */}
          <div className="flex flex-col gap-3.5">
            {/* Top Card: Satisfied Customers */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.85, delay: 0.5, ease: [0.16, 1, 0.3, 1] }
              }
              className={cn("rounded-2xl p-5 flex-1 flex flex-col justify-between", cardSurface)}
            >
              <h4 className="text-[13.5px] font-semibold">Satisfied Customers</h4>

              <div className="my-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <motion.button
                    type="button"
                    onClick={triggerLike}
                    aria-label="Like"
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.9 }}
                    className={cn(
                      "relative flex size-8 items-center justify-center rounded-full shrink-0 cursor-pointer transition-colors",
                      isDark
                        ? "bg-white/10 hover:bg-white/15"
                        : "bg-[#EFEFEF] hover:bg-[#E7E7E7]",
                    )}
                  >
                    {likePulse > 0 && !prefersReducedMotion && (
                      <>
                        <motion.span
                          key={`ring-${likePulse}`}
                          initial={{ scale: 0.7, opacity: 0.7 }}
                          animate={{ scale: 1.65, opacity: 0 }}
                          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                          className="pointer-events-none absolute inset-0 rounded-full border border-primary/60"
                        />
                        {LIKE_BURST_PARTICLES.map((particle, idx) => (
                          <motion.span
                            key={`dot-${likePulse}-${idx}`}
                            initial={{ x: 0, y: 0, scale: 0.5, opacity: 0.95 }}
                            animate={{
                              x: particle.x,
                              y: particle.y,
                              scale: 0,
                              opacity: 0,
                            }}
                            transition={{
                              duration: 0.9,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="pointer-events-none absolute size-1 rounded-full bg-primary"
                          />
                        ))}
                      </>
                    )}
                    <motion.svg
                      key={`heart-${likePulse}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={false}
                      animate={
                        likePulse > 0 && !prefersReducedMotion
                          ? {
                              scale: [1, 0.78, 1.32, 0.94, 1.06, 1],
                              rotate: [0, -10, 8, -3, 0],
                            }
                          : { scale: 1, rotate: 0 }
                      }
                      transition={{
                        duration: 0.95,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative z-10"
                    >
                      <motion.path
                        d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
                        fill="var(--primary)"
                        initial={{ fillOpacity: 0 }}
                        animate={
                          likePulse > 0 && !prefersReducedMotion
                            ? { fillOpacity: [0, 1, 1, 0.85, 0] }
                            : { fillOpacity: 0 }
                        }
                        transition={{
                          duration: 1.2,
                          times: [0, 0.18, 0.55, 0.8, 1],
                          ease: "easeOut",
                        }}
                      />
                    </motion.svg>
                  </motion.button>
                  <FlipCounter
                    value={formattedCustomerCount}
                    prefersReducedMotion={prefersReducedMotion}
                    className="text-2xl font-semibold tracking-tight"
                  />
                </div>

                <AvatarStack
                  avatars={[
                    {
                      src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg",
                      alt: "Ana",
                    },
                    {
                      src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg",
                      alt: "Tom",
                    },
                    {
                      src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg",
                      alt: "Mara",
                    },
                  ]}
                  variant="zoom"
                  type="tooltip-arrow"
                  size="sm"
                  className="m-0 p-0"
                  ringClassName={isDark ? "ring-[#151821]" : "ring-[#F8F8F8]"}
                />
              </div>

              <p
                className={cn(
                  "text-[10.5px] leading-relaxed",
                  isDark ? "text-zinc-500" : "text-[#ACACAC]",
                )}
              >
                Our tailored solutions have left a lasting impact on brands seeking to thrive in the
                digital age.
              </p>
            </motion.div>

            {/* Bottom Card: Potential in the B2B Startup Realm */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.85, delay: 0.66, ease: [0.16, 1, 0.3, 1] }
              }
              className={cn("rounded-2xl p-5 flex-1 flex flex-col justify-between", cardSurface)}
            >
              <div>
                <h4 className="text-[13.5px] font-semibold">
                  Potential in the B2B Startup Realm
                </h4>
                <p
                  className={cn(
                    "mt-1.5 text-[10.5px] leading-relaxed",
                    isDark ? "text-zinc-500" : "text-[#ACACAC]",
                  )}
                >
                  Commitment to excellence, agility, and forward-thinking positions us as the
                  catalyst for your business growth
                </p>
              </div>

              <div
                className={cn(
                  "mt-4 flex cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-2.5",
                  isDark ? "bg-white/[0.06]" : "bg-white shadow-xs",
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    aria-hidden
                    className="w-[3px] h-7 rounded-full bg-primary shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold truncate">
                      Contract with Startup
                    </p>
                    <p
                      className={cn(
                        "text-[9.5px] truncate",
                        isDark ? "text-zinc-500" : "text-[#ACACAC]",
                      )}
                    >
                      28 Startup Member
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <div className="flex -space-x-2">
                    {[
                      {
                        src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg",
                        alt: "Leo Silva",
                      },
                      {
                        src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg",
                        alt: "June Carter",
                      },
                      {
                        src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg",
                        alt: "Sam Wilson",
                      },
                    ].map((avatar, i) => (
                      <img
                        key={i}
                        src={avatar.src}
                        alt={avatar.alt}
                        className={cn(
                          "size-7 rounded-full object-cover ring-2",
                          isDark ? "ring-[#151821]" : "ring-white",
                        )}
                      />
                    ))}
                  </div>
                  <LoopingAnimatedIcon
                    icon={ChevronRightIcon}
                    size={14}
                    duration={1.8}
                    delay={0.4}
                    color="#a1a1aa"
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Trusted Companies Infinite Marquee Section */}
      <section className="mx-auto max-w-[560px] @4xl:max-w-5xl pt-14 pb-6">
        <div className="text-center">
          <h3
            className={cn(
              "text-xl @sm:text-2xl font-semibold tracking-tight",
              isDark ? "text-zinc-100" : "text-[#242427]",
            )}
          >
            Trusted by{" "}
            <span className="relative inline-block pb-1.5">
              <span>Growing</span>
              <svg
                viewBox="0 0 120 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2.5 w-full"
              >
                {/* Gray base underline */}
                <path
                  d="M2 8.5C34 3.5 84 2.5 118 7.5"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className={isDark ? "text-white/15" : "text-zinc-200"}
                />
                {/* Colored draw-over stroke */}
                <motion.path
                  d="M2 8.5C34 3.5 84 2.5 118 7.5"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-primary"
                  initial={
                    prefersReducedMotion
                      ? { pathLength: 1, opacity: 1 }
                      : { pathLength: 0, opacity: 0.4 }
                  }
                  animate={
                    prefersReducedMotion
                      ? { pathLength: 1, opacity: 1 }
                      : {
                          pathLength: [0, 1, 1, 0],
                          opacity: [0.4, 1, 1, 0.4],
                        }
                  }
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : {
                          duration: 2.8,
                          repeat: Infinity,
                          repeatDelay: 0.8,
                          ease: [0.16, 1, 0.3, 1],
                          times: [0, 0.45, 0.78, 1],
                        }
                  }
                />
              </svg>
            </span>{" "}
            Teams Worldwide
          </h3>
          <p
            className={cn(
              "mt-2 text-[11px] @sm:text-[12px] font-normal",
              isDark ? "text-zinc-500" : "text-[#ACACAC]",
            )}
          >
            Powering high-performing marketing workflows for modern product teams.
          </p>
        </div>

        <div className="relative mt-8 overflow-hidden">
          {/* Soft edge fades */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r to-transparent",
              isDark ? "from-[#0b0d12]" : "from-white",
            )}
          />
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l to-transparent",
              isDark ? "from-[#0b0d12]" : "from-white",
            )}
          />

          <motion.div
            animate={prefersReducedMotion ? undefined : { x: ["0%", "-50%"] }}
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 36, repeat: Infinity, ease: "linear" }
            }
            className="flex w-max items-center"
          >
            {[0, 1, 2, 3].map((dup) => (
              <div
                key={dup}
                aria-hidden={dup > 0 || undefined}
                className={cn(
                  "flex shrink-0 items-center gap-12 @sm:gap-16 pr-12 @sm:pr-16 select-none",
                  isDark ? "text-zinc-500" : "text-zinc-400",
                )}
              >
                {/* stripe */}
                <span className="text-[19px] font-bold tracking-tight lowercase">
                  stripe
                </span>

                {/* afterpay */}
                <span className="inline-flex items-center gap-1.5 text-[16px] font-semibold tracking-tight lowercase">
                  <span>afterpay</span>
                  <svg viewBox="0 0 24 24" className="size-4 stroke-current fill-none" strokeWidth="2" aria-hidden>
                    <path d="M7 10l4-4 4 4M17 14l-4 4-4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>

                {/* hopin */}
                <span className="inline-flex items-center gap-1.5 text-[17px] font-semibold tracking-tight lowercase">
                  <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="17" cy="7.5" r="2" />
                    <circle cx="19" cy="12.5" r="2" />
                    <circle cx="16" cy="17.5" r="2" />
                    <circle cx="11" cy="19" r="2" />
                    <circle cx="6.5" cy="16" r="2" />
                    <circle cx="5.5" cy="11" r="2" />
                    <circle cx="8" cy="6.5" r="2" />
                  </svg>
                  <span>hopin</span>
                </span>

                {/* splunk> */}
                <span className="inline-flex items-center text-[17px] font-bold tracking-tight lowercase">
                  <span>splunk</span>
                  <ChevronRight className="size-4 -ml-0.5 stroke-[2.75]" />
                </span>

                {/* attentive */}
                <span className="inline-flex items-start text-[16px] font-bold tracking-tight lowercase">
                  <span>attentive</span>
                  <span className="text-[8px] font-semibold ml-0.5 mt-0.5">®</span>
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Content Creation and Marketing Section */}
      <section className="mx-auto max-w-[560px] @4xl:max-w-5xl pt-16 pb-10">
        <div
          ref={contentGridRef}
          className="relative grid grid-cols-1 @4xl:grid-cols-12 gap-10 @4xl:gap-8 items-center"
        >
          {/* Dynamic Dashed Connectors */}
          {connectorCoords && (
            <svg
              aria-hidden
              className="hidden @4xl:block pointer-events-none absolute inset-0 h-full w-full z-0 overflow-visible"
            >
              {/* Top-left dashed arc: 80% card top-center -> Average Increase Sales left-center */}
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeDasharray="4 4"
                className={isDark ? "text-white/20" : "text-zinc-300"}
                d={(() => {
                  const { donutX, donutY, salesLeftX, salesMidY } = connectorCoords;
                  const r = 14;
                  return `M ${donutX} ${donutY} L ${donutX} ${salesMidY + r} Q ${donutX} ${salesMidY} ${donutX + r} ${salesMidY} L ${salesLeftX} ${salesMidY}`;
                })()}
              />
              <circle
                cx={connectorCoords.donutX + 4}
                cy={connectorCoords.salesMidY + 4}
                r="3.25"
                className={isDark ? "fill-white" : "fill-zinc-900"}
              />

              {/* Right dashed connector: Average Increase Sales bottom-center -> Active Checklist Item */}
              <motion.path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeDasharray="4 4"
                className={isDark ? "text-white/20" : "text-zinc-300"}
                initial={false}
                animate={{
                  d: (() => {
                    const { startX, startY, targetX, targetY } = connectorCoords;
                    const r = Math.min(16, Math.abs(targetY - startY) / 2);
                    const dir = targetY >= startY ? 1 : -1;
                    return `M ${startX} ${startY} L ${startX} ${targetY - dir * r} Q ${startX} ${targetY} ${startX + r} ${targetY} L ${targetX} ${targetY}`;
                  })(),
                }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
                }
              />
              {/* Bottom-up dashed branch curving into the same junction dot */}
              <motion.path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeDasharray="4 4"
                className={isDark ? "text-white/20" : "text-zinc-300"}
                initial={false}
                animate={{
                  d: (() => {
                    const { startX, bottomY, targetY } = connectorCoords;
                    const r = Math.min(16, Math.abs(bottomY - targetY) / 2);
                    return `M ${startX} ${bottomY} L ${startX} ${targetY + r} Q ${startX} ${targetY} ${startX + r} ${targetY}`;
                  })(),
                }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
                }
              />
              <motion.circle
                r="3.25"
                className={isDark ? "fill-white" : "fill-zinc-900"}
                initial={false}
                animate={{
                  cx: connectorCoords.startX + 4,
                  cy: connectorCoords.targetY,
                }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
                }
              />
            </svg>
          )}

          {/* Left Column: Portrait + Floating Metrics Cards */}
          <div className="@4xl:col-span-7 relative mx-auto w-full max-w-[500px] flex flex-col @4xl:block">
            <div className="relative w-full min-h-[340px] @sm:min-h-[380px] @4xl:min-h-[420px] flex items-center justify-center">

              {/* Center Portrait with Soft Bottom Fade */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                }
                className="relative z-[5] w-56 @sm:w-64 h-80 @sm:h-96 overflow-hidden flex items-end justify-center"
              >
                <img
                  src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1795523190/veloce-marketer-removebg-preview-1795523189501.png"
                  alt="Content strategist portrait"
                  className="h-full w-full object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_78%,transparent_100%)]"
                />
              </motion.div>

              {/* Bottom-left Card: 80% Donut + 17K+ */}
              <motion.div
                ref={donutCardRef}
                initial={prefersReducedMotion ? false : { opacity: 0, x: -20, y: 14 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }
                }
                className={cn(
                  "absolute left-0 @sm:left-2 bottom-6 @sm:bottom-8 z-10 w-36 @sm:w-40 rounded-2xl p-4 text-center",
                  floatingCardSurface,
                )}
              >
                <div className="relative mx-auto size-16 flex items-center justify-center">
                  <svg viewBox="0 0 64 64" className="size-16 rotate-[72deg]" aria-hidden>
                    <circle
                      cx="32"
                      cy="32"
                      r="24.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="9"
                      className={isDark ? "text-white/10" : "text-primary/15"}
                    />
                    <motion.circle
                      cx="32"
                      cy="32"
                      r="24.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="9"
                      strokeLinecap="round"
                      className="text-primary"
                      strokeDasharray={2 * Math.PI * 24.5}
                      initial={
                        prefersReducedMotion
                          ? { strokeDashoffset: 2 * Math.PI * 24.5 * 0.2 }
                          : { strokeDashoffset: 2 * Math.PI * 24.5 }
                      }
                      whileInView={{ strokeDashoffset: 2 * Math.PI * 24.5 * 0.2 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }
                      }
                    />
                  </svg>
                  <span className="absolute text-[13px] font-semibold text-primary">
                    80%
                  </span>
                </div>

                <p className="mt-2.5 text-lg font-bold tracking-tight leading-none">
                  17K+
                </p>
                <p
                  className={cn(
                    "mt-1 text-[9px] leading-snug",
                    isDark ? "text-zinc-500" : "text-[#ACACAC]",
                  )}
                >
                  1,000K+ Contributions in the last year!
                </p>
              </motion.div>

              {/* Bottom-right Card: Advertising Platform */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, x: 18, y: 12 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.75, delay: 0.35, ease: [0.16, 1, 0.3, 1] }
                }
                className={cn(
                  "absolute right-0 @sm:right-4 bottom-3 @sm:bottom-6 z-10 rounded-2xl px-3.5 py-2.5",
                  floatingCardSurface,
                )}
              >
                <p className="text-[9.5px] font-semibold text-center">
                  Advertising Platform
                </p>
                <div className="mt-2 flex items-center gap-1.5">
                  {[
                    {
                      name: "Facebook",
                      cls: "bg-[#0866FF] text-white",
                      content: (
                        <LoopingAnimatedIcon
                          icon={FacebookIcon}
                          size={14}
                          duration={2.0}
                          delay={0}
                          color="#ffffff"
                          prefersReducedMotion={prefersReducedMotion}
                        />
                      ),
                    },
                    {
                      name: "Instagram",
                      cls: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white",
                      content: (
                        <LoopingAnimatedIcon
                          icon={InstagramIcon}
                          size={14}
                          duration={2.0}
                          delay={0.15}
                          color="#ffffff"
                          prefersReducedMotion={prefersReducedMotion}
                        />
                      ),
                    },
                    {
                      name: "X",
                      cls: "bg-black text-white",
                      content: (
                        <LoopingAnimatedIcon
                          icon={TwitterIcon}
                          size={13}
                          duration={2.0}
                          delay={0.3}
                          color="#ffffff"
                          prefersReducedMotion={prefersReducedMotion}
                        />
                      ),
                    },
                    {
                      name: "TikTok",
                      cls: "bg-black text-white",
                      content: (
                        <LoopingAnimatedIcon
                          icon={TikTokIcon}
                          size={14}
                          duration={2.0}
                          delay={0.45}
                          color="#ffffff"
                          prefersReducedMotion={prefersReducedMotion}
                        />
                      ),
                    },
                    {
                      name: "Gmail",
                      cls: "bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)]",
                      content: (
                        <LoopingAnimatedIcon
                          icon={GmailIcon}
                          size={14}
                          duration={2.0}
                          delay={0.6}
                          prefersReducedMotion={prefersReducedMotion}
                        />
                      ),
                    },
                  ].map((platform) => (
                    <span
                      key={platform.name}
                      aria-label={platform.name}
                      className={cn(
                        "group relative flex size-6 items-center justify-center rounded-md overflow-hidden cursor-pointer transition-transform duration-200 hover:-translate-y-0.5 active:scale-95",
                        platform.cls,
                      )}
                    >
                      <span className="flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-6 group-hover:opacity-0">
                        {platform.content}
                      </span>
                      <span
                        aria-hidden
                        className="absolute inset-0 flex items-center justify-center translate-y-6 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100"
                      >
                        {platform.content}
                      </span>
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Top-right Card: Average Increase Sales */}
            <motion.div
              ref={salesCardRef}
              initial={prefersReducedMotion ? false : { opacity: 0, x: 18, y: -12 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }
              }
              className={cn(
                "absolute right-1 @sm:right-2 top-3 @sm:top-4 z-[2] w-36 @sm:w-44 rounded-2xl p-2.5 @sm:p-3.5",
                floatingCardSurface,
              )}
            >
              <p className="text-[9.5px] font-semibold text-center">
                Average Increase Sales
              </p>

              <div className="mt-2.5 flex items-end gap-1.5 h-20">
                <div
                  className={cn(
                    "flex flex-col justify-between h-full text-[8px] font-medium pr-0.5",
                    isDark ? "text-zinc-300" : "text-zinc-700",
                  )}
                >
                  <span>30</span>
                  <span>20</span>
                  <span>10</span>
                </div>
                <div
                  className="relative flex-1 flex items-end justify-between gap-1.5 @4xl:gap-1 h-full"
                  onMouseLeave={() => setHoveredSalesBar(null)}
                >
                  {/* Horizontal dashed gridlines aligned with 30 / 20 / 10 */}
                  {["top-[6px]", "top-1/2", "bottom-[6px]"].map((pos) => (
                    <span
                      key={pos}
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute inset-x-0 border-t border-dashed",
                        pos,
                        isDark ? "border-white/10" : "border-zinc-200/90",
                      )}
                    />
                  ))}
                  {[
                    { h: 68, cls: isDark ? "bg-primary/18" : "bg-primary/12" },
                    { h: 52, cls: isDark ? "bg-primary/30" : "bg-primary/22" },
                    { h: 42, cls: isDark ? "bg-primary/45" : "bg-primary/35" },
                    { h: 94, cls: isDark ? "bg-primary/70" : "bg-primary/50" },
                    { h: 74, cls: isDark ? "bg-primary/90" : "bg-primary/65" },
                  ].map((bar, idx) => {
                    const isHovered = hoveredSalesBar === idx;
                    const isAnyHovered = hoveredSalesBar !== null;
                    return (
                      <motion.div
                        key={idx}
                        onMouseEnter={() => setHoveredSalesBar(idx)}
                        initial={
                          prefersReducedMotion
                            ? { height: `${bar.h}%` }
                            : { height: "0%" }
                        }
                        whileInView={{ height: `${bar.h}%` }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : {
                                duration: 0.7,
                                delay: 0.4 + idx * 0.1,
                                ease: [0.16, 1, 0.3, 1],
                              }
                        }
                        className={cn(
                          "relative z-10 flex-1 @4xl:flex-none @4xl:w-4 rounded-[5px] cursor-pointer transition-colors duration-200",
                          isAnyHovered
                            ? isHovered
                              ? "bg-primary"
                              : isDark
                                ? "bg-white/10"
                                : "bg-zinc-200/80"
                            : bar.cls,
                        )}
                      />
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Heading + Subtitle + 4 Interactive Pill Cards */}
          <div className="@4xl:col-span-5">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
              }
            >
              <h3 className="text-2xl @sm:text-[34px] font-semibold tracking-tight leading-[1.16]">
                Content Creation
                <br />
                and Marketing
              </h3>
              <p
                className={cn(
                  "mt-3 max-w-md text-[11.5px] @sm:text-[12.5px] leading-relaxed",
                  isDark ? "text-zinc-500" : "text-[#ACACAC]",
                )}
              >
                Strategic thinkers collaborates to craft compelling narratives that not only
                captivate your audience but also drive meaningful engagement.
              </p>
            </motion.div>

            <div className="mt-6 space-y-2.5">
              {[
                "Crafting Compelling Narratives",
                "Strategic Content Marketing",
                "Building Authority and Trust",
                "Measurable Results",
              ].map((item, idx) => {
                const isSelected = selectedFeature === idx;
                return (
                  <motion.button
                    key={item}
                    ref={(el) => {
                      featureBtnRefs.current[idx] = el;
                    }}
                    type="button"
                    onClick={() => setSelectedFeature(idx)}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : {
                            duration: 0.65,
                            delay: 0.15 + idx * 0.1,
                            ease: [0.16, 1, 0.3, 1],
                          }
                    }
                    className={cn(
                      "flex w-full items-center gap-3 rounded-full px-4 py-3 text-left text-[12.5px] @sm:text-[13px] transition-all cursor-pointer",
                      isDark
                        ? "bg-white/[0.04] text-zinc-300 hover:bg-white/[0.07]"
                        : "bg-white text-zinc-700 shadow-[0_2px_10px_rgb(0_0_0/0.03)] hover:bg-zinc-50",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-full transition-colors",
                        isSelected
                          ? "bg-primary text-primary-foreground ring-4 ring-primary/15"
                          : isDark
                            ? "border border-white/15 bg-white/5"
                            : "border border-zinc-200 bg-zinc-50",
                      )}
                    >
                      {isSelected && <Check className="size-3 stroke-[2.5] text-white" />}
                    </span>
                    <span>{item}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Business Planning and Development Section */}
      <section className="mx-auto max-w-[560px] @4xl:max-w-5xl pt-16 pb-12">
        <div className="grid grid-cols-1 @4xl:grid-cols-12 gap-10 @4xl:gap-8 items-center">
          {/* Left Column: Heading + Subtitle + 2x2 Feature Cards */}
          <div className="@4xl:col-span-6">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
              }
            >
              <h3 className="text-2xl @sm:text-[34px] font-semibold tracking-tight leading-[1.16]">
                Business Planning
                <br />
                and Development
              </h3>
              <p
                className={cn(
                  "mt-3 max-w-md text-[11.5px] @sm:text-[12.5px] leading-relaxed",
                  isDark ? "text-zinc-500" : "text-[#ACACAC]",
                )}
              >
                At <span className="font-medium text-primary">Veloce</span>, we offer
                comprehensive solutions designed to guide your business through every stage
                of its journey.
              </p>
            </motion.div>

            <div className="mt-7 grid grid-cols-1 @sm:grid-cols-2 gap-3.5">
              {[
                {
                  title: "Roadmapping",
                  description:
                    "Our strategic roadmaps provide a roadmap for success, outlining the steps needed to reach your objectives.",
                },
                {
                  title: "Financial Modeling",
                  description:
                    "Forecasts to evaluating investment opportunities, we provide insights that empower informed decision-making.",
                },
                {
                  title: "Diversification",
                  description:
                    "Our team explores opportunities for market expansion and diversification, helping you reach new audiences.",
                },
                {
                  title: "Operational Efficiency",
                  description:
                    "We assess your current processes and identify areas for improvement to enhance efficiency and reduce costs.",
                },
              ].map((card, idx) => {
                const isCardHovered = hoveredPlanningCard === idx;
                return (
                  <motion.div
                    key={card.title}
                    onMouseEnter={() => setHoveredPlanningCard(idx)}
                    onMouseLeave={() => setHoveredPlanningCard(null)}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : {
                            duration: 0.6,
                            delay: 0.1 + idx * 0.08,
                            ease: [0.16, 1, 0.3, 1],
                          }
                    }
                    className={cn(
                      "relative overflow-hidden rounded-2xl p-4 @sm:p-[18px] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer",
                      isDark
                        ? "bg-white/[0.04] hover:bg-primary/[0.10]"
                        : "bg-[#F8F8F8] hover:bg-primary/[0.06] hover:shadow-[0_8px_24px_color-mix(in_oklab,var(--primary)_10%,transparent)]",
                    )}
                  >
                    {/* Rising background dots on hover */}
                    {isCardHovered && !prefersReducedMotion && (
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
                      >
                        {[
                          { left: "8%", size: "size-[2.5px]", delay: 0, dur: 1.35 },
                          { left: "16%", size: "size-[3px]", delay: 0.35, dur: 1.65 },
                          { left: "24%", size: "size-[2px]", delay: 0.15, dur: 1.45 },
                          { left: "32%", size: "size-[3px]", delay: 0.55, dur: 1.75 },
                          { left: "41%", size: "size-[2.5px]", delay: 0.2, dur: 1.4 },
                          { left: "49%", size: "size-[2px]", delay: 0.6, dur: 1.6 },
                          { left: "58%", size: "size-[3px]", delay: 0.1, dur: 1.5 },
                          { left: "66%", size: "size-[2.5px]", delay: 0.45, dur: 1.7 },
                          { left: "74%", size: "size-[2px]", delay: 0.25, dur: 1.35 },
                          { left: "82%", size: "size-[3px]", delay: 0.65, dur: 1.8 },
                          { left: "90%", size: "size-[2.5px]", delay: 0.4, dur: 1.55 },
                        ].map((dot, dIdx) => (
                          <motion.span
                            key={dIdx}
                            style={{ left: dot.left, bottom: "-6px" }}
                            initial={{ y: 0, opacity: 0 }}
                            animate={{
                              y: -135,
                              opacity: [0, 0.95, 0.7, 0],
                            }}
                            transition={{
                              duration: dot.dur,
                              delay: dot.delay,
                              repeat: Infinity,
                              ease: "easeOut",
                            }}
                            className={cn(
                              "absolute rounded-full",
                              isDark ? "bg-primary/80" : "bg-primary/75",
                              dot.size,
                            )}
                          />
                        ))}
                      </div>
                    )}

                    <div className="relative z-10">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "flex size-5 shrink-0 items-center justify-center rounded-full bg-primary",
                            isDark ? "text-[#0b0d12]" : "text-white",
                          )}
                        >
                          <LoopingAnimatedIcon
                            icon={CopyCheckIcon}
                            size={12}
                            duration={1}
                            delay={idx * 0.2}
                            color={isDark ? "#0b0d12" : "#ffffff"}
                            prefersReducedMotion={prefersReducedMotion}
                          />
                        </span>
                        <h4 className="text-[13px] @sm:text-[13.5px] font-semibold tracking-tight">
                          {card.title}
                        </h4>
                      </div>
                      <p
                        className={cn(
                          "mt-2.5 text-[10.5px] @sm:text-[11px] leading-[1.55]",
                          isDark ? "text-zinc-500" : "text-[#ACACAC]",
                        )}
                      >
                        {card.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Portrait + Floating Icon Pills + Verified Card + B2B Income Chart */}
          <div
            ref={planningVisualRef}
            className="@4xl:col-span-6 relative mx-auto w-full max-w-[460px] min-h-[380px] @sm:min-h-[430px] flex flex-col items-center justify-end pt-6"
          >
            {/* Dynamic Dashed Connectors */}
            {planningConnectors && (
              <svg
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full z-0 overflow-visible"
              >
                {/* Top-left dashed arc: Podium icon top-center -> Verified card left-center */}
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeDasharray="4 4"
                  className={isDark ? "text-white/20" : "text-zinc-300"}
                  d={(() => {
                    const { podiumX, podiumY, verifiedLeftX, verifiedMidY } =
                      planningConnectors;
                    const r = 14;
                    return `M ${podiumX} ${podiumY} L ${podiumX} ${verifiedMidY + r} Q ${podiumX} ${verifiedMidY} ${podiumX + r} ${verifiedMidY} L ${verifiedLeftX} ${verifiedMidY}`;
                  })()}
                />
                <circle
                  cx={planningConnectors.podiumX + 3.5}
                  cy={planningConnectors.verifiedMidY + 3.5}
                  r="3"
                  className={isDark ? "fill-white" : "fill-[#181826]"}
                />

                {/* Bottom-left dashed arc: Icon pills center -> down to 50% of B2B Income card -> curve right into B2B card */}
                {planningConnectors.incomeLeftX > planningConnectors.podiumX + 16 && (
                  <>
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeDasharray="4 4"
                      className={isDark ? "text-white/20" : "text-zinc-300"}
                      d={(() => {
                        const { podiumX, podiumY, incomeLeftX, incomeMidY } =
                          planningConnectors;
                        const r = 14;
                        return `M ${podiumX} ${podiumY} L ${podiumX} ${incomeMidY - r} Q ${podiumX} ${incomeMidY} ${podiumX + r} ${incomeMidY} L ${incomeLeftX} ${incomeMidY}`;
                      })()}
                    />
                    <circle
                      cx={planningConnectors.podiumX + 3.5}
                      cy={planningConnectors.incomeMidY - 3.5}
                      r="3"
                      className={isDark ? "fill-white" : "fill-[#181826]"}
                    />
                  </>
                )}

                {/* Vertical dashed line: Verified bottom-center -> B2B Income card top */}
                {planningConnectors.incomeTopY > planningConnectors.verifiedBottomY + 8 && (
                  <>
                    <line
                      x1={planningConnectors.verifiedMidX}
                      y1={planningConnectors.verifiedBottomY}
                      x2={planningConnectors.verifiedMidX}
                      y2={planningConnectors.incomeTopY}
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeDasharray="4 4"
                      className={isDark ? "text-white/20" : "text-zinc-300"}
                    />
                    <circle
                      cx={planningConnectors.verifiedMidX}
                      cy={
                        (planningConnectors.verifiedBottomY +
                          planningConnectors.incomeTopY) /
                        2
                      }
                      r="3"
                      className={isDark ? "fill-white" : "fill-[#181826]"}
                    />
                  </>
                )}
              </svg>
            )}

            {/* Center Portrait with Soft Bottom Fade */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
              }
              className="relative z-0 w-72 @sm:w-80 h-[340px] @sm:h-[390px] overflow-hidden flex items-end justify-center mb-4 @sm:mb-6"
            >
              <img
                src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1795523190/veloce-marketer-removebg-preview-1795523189501.png"
                alt="Business planning consultant"
                className="h-full w-full object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_62%,transparent_98%)]"
              />
            </motion.div>

            {/* Left Floating Icon Pills */}
            <div className="absolute left-0 @sm:left-1 top-20 @sm:top-24 z-10 flex flex-col gap-3">
              {/* Top Pill: Podium with Star */}
              <motion.div
                ref={podiumCardRef}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }
                }
                className={cn(
                  "flex size-12 @sm:size-13 items-center justify-center rounded-2xl shadow-[0_8px_24px_rgb(0_0_0/0.04)]",
                  isDark
                    ? "bg-[color-mix(in_oklab,var(--primary)_16%,#151821)] text-primary"
                    : "bg-[color-mix(in_oklab,var(--primary)_10%,white)] text-primary",
                )}
              >
                <LoopingAnimatedIcon
                  icon={TrophyIcon}
                  size={20}
                  duration={2.2}
                  delay={0.15}
                  color="var(--primary)"
                  prefersReducedMotion={prefersReducedMotion}
                />
              </motion.div>

              {/* Bottom Pill: Megaphone */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }
                }
                className={cn(
                  "flex size-12 @sm:size-13 items-center justify-center rounded-2xl shadow-[0_8px_24px_rgb(0_0_0/0.04)]",
                  isDark
                    ? "bg-[color-mix(in_oklab,var(--primary)_16%,#151821)] text-primary"
                    : "bg-[color-mix(in_oklab,var(--primary)_10%,white)] text-primary",
                )}
              >
                <LoopingAnimatedIcon
                  icon={MegaphoneIcon}
                  size={20}
                  duration={2.2}
                  delay={0.4}
                  color="var(--primary)"
                  prefersReducedMotion={prefersReducedMotion}
                />
              </motion.div>
            </div>

            {/* Top-Right Floating Card: Verified! */}
            <motion.div
              ref={verifiedCardRef}
              initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }
              }
              className={cn(
                "absolute right-0 @sm:right-2 @md:right-4 top-4 @sm:top-2 @md:top-0 z-10 w-28 @sm:w-32 @md:w-36 rounded-2xl px-2.5 py-2.5 @sm:px-3 @sm:py-3.5 text-center",
                floatingCardSurface,
              )}
            >
              <div className="mx-auto flex size-9 items-center justify-center rounded-full bg-[#1ed700] text-white ring-4 ring-[#1ed700]/15">
                <LoopingAnimatedIcon
                  icon={CopyCheckIcon}
                  size={16}
                  duration={1}
                  delay={0.3}
                  color="#ffffff"
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>
              <p className="mt-2.5 text-[11.5px] @sm:text-[12px] font-semibold leading-tight">
                Verified!
              </p>
              <p
                className={cn(
                  "mt-0.5 text-[8.5px] @sm:text-[9px]",
                  isDark ? "text-zinc-500" : "text-[#ACACAC]",
                )}
              >
                <span className="font-semibold text-[#1ed700]">100%</span> Client Satisfied
              </p>
            </motion.div>

            {/* Bottom Floating Card: B2B Income 2023 Area Chart */}
            <motion.div
              ref={incomeCardRef}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }
              }
              className={cn(
                "relative z-10 -mt-24 @sm:-mt-28 w-[76%] @sm:w-[78%] max-w-[330px] self-end rounded-2xl p-2.5 @sm:p-3",
                floatingCardSurface,
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "flex size-6 items-center justify-center rounded-full shrink-0",
                      isDark
                        ? "bg-primary/15 text-primary"
                        : "bg-primary/10 text-primary",
                    )}
                  >
                    <LoopingAnimatedIcon
                      icon={ChartNoAxesColumnIcon}
                      size={13}
                      duration={2.0}
                      delay={0.25}
                      color="var(--primary)"
                      prefersReducedMotion={prefersReducedMotion}
                    />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-[10.5px] @sm:text-[11.5px] font-semibold tracking-tight leading-tight">
                      B2B Income 2023
                    </span>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1">
                        <span className="size-1 rounded-full bg-primary/80" />
                        <span
                          className={cn(
                            "h-0.5 w-10 rounded-full",
                            isDark ? "bg-white/15" : "bg-zinc-200",
                          )}
                        />
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <span
                          className={cn(
                            "size-1 rounded-full",
                            isDark ? "bg-primary/25" : "bg-primary/20",
                          )}
                        />
                        <span
                          className={cn(
                            "h-0.5 w-4 rounded-full",
                            isDark ? "bg-white/15" : "bg-zinc-200",
                          )}
                        />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Monthly / Yearly Toggle */}
                <div
                  className={cn(
                    "inline-flex items-center rounded-full p-0.5",
                    isDark ? "bg-white/[0.06]" : "bg-zinc-100",
                  )}
                >
                  {(["monthly", "yearly"] as const).map((period) => {
                    const active = incomePeriod === period;
                    return (
                      <button
                        key={period}
                        type="button"
                        onClick={() => setIncomePeriod(period)}
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-[8.5px] @sm:text-[9px] font-medium capitalize transition-[background-color] duration-150 cursor-pointer",
                          active
                            ? "bg-primary text-primary-foreground shadow-xs"
                            : isDark
                              ? "text-zinc-400 hover:text-zinc-200"
                              : "text-zinc-500 hover:text-zinc-800",
                        )}
                      >
                        {period}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Area Chart */}
              <div className="mt-1.5 h-12 @sm:h-14 w-full">
                <svg
                  viewBox="0 0 320 90"
                  preserveAspectRatio="none"
                  className="h-full w-full overflow-visible"
                  aria-label="B2B Income 2023 chart"
                >
                  <defs>
                    <linearGradient id="veloce-b2b-area" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.42" />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>

                  {/* Subtle dashed horizontal grid lines */}
                  {[22, 46, 70].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="320"
                      y2={y}
                      stroke="currentColor"
                      strokeWidth="0.75"
                      strokeDasharray="3 3"
                      className={isDark ? "text-white/10" : "text-zinc-200"}
                    />
                  ))}

                  {/* Area Fill */}
                  <motion.path
                    fill="url(#veloce-b2b-area)"
                    initial={false}
                    animate={{
                      d:
                        incomePeriod === "monthly"
                          ? "M 0 74 L 14 70 L 24 62 L 36 65 L 48 56 L 60 59 L 68 48 L 78 52 L 90 68 L 102 64 L 112 72 L 122 50 L 132 54 L 142 36 L 152 24 L 160 32 L 172 52 L 182 40 L 194 64 L 208 58 L 222 52 L 236 62 L 248 55 L 260 44 L 274 52 L 288 30 L 302 22 L 314 14 L 320 18 L 320 90 L 0 90 Z"
                          : "M 0 78 L 26 72 L 54 64 L 82 58 L 110 62 L 138 46 L 166 38 L 194 42 L 222 30 L 250 24 L 284 16 L 320 8 L 320 90 L 0 90 Z",
                    }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                    }
                  />

                  {/* Line Stroke */}
                  <motion.path
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    initial={false}
                    animate={{
                      d:
                        incomePeriod === "monthly"
                          ? "M 0 74 L 14 70 L 24 62 L 36 65 L 48 56 L 60 59 L 68 48 L 78 52 L 90 68 L 102 64 L 112 72 L 122 50 L 132 54 L 142 36 L 152 24 L 160 32 L 172 52 L 182 40 L 194 64 L 208 58 L 222 52 L 236 62 L 248 55 L 260 44 L 274 52 L 288 30 L 302 22 L 314 14 L 320 18"
                          : "M 0 78 L 26 72 L 54 64 L 82 58 L 110 62 L 138 46 L 166 38 L 194 42 L 222 30 L 250 24 L 284 16 L 320 8",
                    }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                    }
                  />
                </svg>
              </div>

              {/* X-Axis Months */}
              <div
                className={cn(
                  "mt-1 flex items-center justify-between text-[7px] @sm:text-[7.5px] font-medium",
                  isDark ? "text-zinc-500" : "text-zinc-400",
                )}
              >
                {[
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ].map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Crafting Solutions Tailored to You Section */}
      <section className="mx-auto max-w-[560px] @4xl:max-w-5xl pt-16 pb-14">
        {/* Centered Header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
          }
          className="text-center"
        >
          <h3 className="text-2xl @sm:text-[34px] font-semibold tracking-tight leading-[1.16]">
            Crafting Solutions
            <br />
            Tailored to You
          </h3>
          <p
            className={cn(
              "mx-auto mt-3 max-w-md text-[11.5px] @sm:text-[12.5px] leading-relaxed",
              isDark ? "text-zinc-500" : "text-[#ACACAC]",
            )}
          >
            At <span className="font-medium text-primary">Veloce</span>, we take pride
            in offering a diverse range of solutions meticulously crafted to meet your
            unique needs.
          </p>
        </motion.div>

        {/* Asymmetric 2-Column Bento Grid */}
        <div className="mt-10 grid grid-cols-1 @4xl:grid-cols-2 gap-4 @sm:gap-5 items-stretch">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-4 @sm:gap-5">
            {/* Card 1: Subscription */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
              }
              className={cn(
                "rounded-3xl p-5 @sm:p-6 overflow-hidden",
                isDark ? "bg-white/[0.04]" : "bg-[#F8F8F8]",
              )}
            >
              {/* Brand Icon Badge */}
              <VeloceRadarIconBadge
                isDark={isDark}
                prefersReducedMotion={prefersReducedMotion}
                delay={0}
                variant="radio"
              />

              <h4 className="mt-4 text-[17px] @sm:text-[19px] font-semibold tracking-tight">
                Subscription
              </h4>
              <p
                className={cn(
                  "mt-2 text-[11px] @sm:text-[11.5px] leading-relaxed",
                  isDark ? "text-zinc-500" : "text-[#ACACAC]",
                )}
              >
                Time is valuable, and your needs are unique. That&apos;s why we&apos;ve
                curated a subscription offering designed to enhance your experience and
                simplify your life.
              </p>

              {/* 4 Stacked Pill Rows */}
              <div className="mt-5 space-y-2.5">
                {[
                  {
                    title: "Tailored Convenience",
                    subtitle: "Customize your subscription",
                    bar: "bg-primary",
                  },
                  {
                    title: "Cost Savings and Value",
                    subtitle: "Savings and added value with our subscription plans",
                    bar: "bg-amber-400",
                  },
                  {
                    title: "Priority Access",
                    subtitle: "Subscribers are our priority, gain early access",
                    bar: "bg-emerald-500",
                  },
                  {
                    title: "Seamless Experience",
                    subtitle: "Benefits without the administrative burdens.",
                    bar: "bg-blue-500",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={
                      prefersReducedMotion
                        ? false
                        : { opacity: 0, y: -16, scale: 0.97 }
                    }
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : {
                            duration: 0.55,
                            delay: 0.15 + idx * 0.18,
                            ease: [0.16, 1, 0.3, 1],
                          }
                    }
                    className={cn(
                      "group relative flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 transition-shadow duration-200 cursor-pointer",
                      isDark
                        ? "bg-white/[0.05] hover:bg-white/[0.08]"
                        : "bg-white shadow-[0_2px_10px_rgb(0_0_0/0.025)] hover:shadow-[0_6px_18px_rgb(0_0_0/0.05)]",
                    )}
                    style={{ zIndex: 4 - idx }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={cn("w-[3px] h-7 rounded-full shrink-0", item.bar)} />
                      <div className="min-w-0">
                        <p className="text-[11.5px] @sm:text-[12px] font-semibold tracking-tight truncate">
                          {item.title}
                        </p>
                        <p
                          className={cn(
                            "text-[9.5px] @sm:text-[10px] truncate",
                            isDark ? "text-zinc-500" : "text-[#ACACAC]",
                          )}
                        >
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="size-3.5 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Card 3: Tracking & Record */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }
              }
              className={cn(
                "relative flex-1 flex flex-col rounded-3xl p-5 @sm:p-6 pb-0 @sm:pb-0 overflow-hidden min-h-[260px]",
                isDark ? "bg-white/[0.04]" : "bg-[#F8F8F8]",
              )}
            >
              <div>
                {/* Brand Icon Badge */}
                <VeloceRadarIconBadge
                  isDark={isDark}
                  prefersReducedMotion={prefersReducedMotion}
                  delay={0.4}
                  variant="radar"
                />

                <h4 className="mt-4 text-[17px] @sm:text-[19px] font-semibold tracking-tight">
                  Tracking & Record
                </h4>
                <p
                  className={cn(
                    "mt-2 text-[11px] @sm:text-[11.5px] leading-relaxed",
                    isDark ? "text-zinc-500" : "text-[#ACACAC]",
                  )}
                >
                  pivotal role that precision in tracking and record management plays in
                  enhancing operational efficiency, ensuring compliance, and driving
                  informed decision-making.
                </p>
              </div>

              {/* Bottom Tilted Mini-Cards Collage */}
              <div className="relative mt-2 pt-2 -mx-6 flex items-end justify-center gap-2.5 select-none">
                {/* Soft bottom fade */}
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-x-0 bottom-0 z-20 h-14 bg-gradient-to-t to-transparent",
                    isDark
                      ? "from-[#141720] via-[#141720]/70"
                      : "from-[#F8F8F8] via-[#F8F8F8]/70",
                  )}
                />

                {/* 1. Left 80% Donut Card */}
                <div
                  className={cn(
                    "-ml-8 @sm:-ml-6 translate-y-5 w-24 @sm:w-28 shrink-0 rounded-2xl p-3 pb-6 text-center",
                    isDark ? "bg-[#151821]" : "bg-white",
                  )}
                >
                  <div className="relative mx-auto size-12 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="size-12 -rotate-90" aria-hidden>
                      <circle
                        cx="24"
                        cy="24"
                        r="19"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                        className={isDark ? "text-white/10" : "text-primary/15"}
                      />
                      <motion.circle
                        cx="24"
                        cy="24"
                        r="19"
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 19}
                        initial={
                          prefersReducedMotion
                            ? { strokeDashoffset: 2 * Math.PI * 19 * 0.2 }
                            : { strokeDashoffset: 2 * Math.PI * 19 }
                        }
                        whileInView={{ strokeDashoffset: 2 * Math.PI * 19 * 0.2 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }
                        }
                      />
                    </svg>
                    <span className="absolute text-[10px] font-semibold text-primary">
                      80%
                    </span>
                  </div>
                </div>

                {/* 2. Center-left tilted Segmentation Card */}
                <div
                  className={cn(
                    "z-10 translate-y-1 w-32 @sm:w-36 shrink-0 rotate-3 rounded-2xl p-3 pb-4",
                    isDark ? "bg-[#151821]" : "bg-white",
                  )}
                >
                  <div className="flex items-start gap-1.5">
                    <span className="mt-0.5 size-2.5 shrink-0 rounded-full bg-primary" />
                    <div>
                      <span className="block text-[9px] font-semibold leading-tight tracking-tight">
                        Segmentation
                      </span>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-0.5">
                          <span className="size-1 rounded-full bg-primary" />
                          <span
                            className={cn(
                              "h-0.5 w-3.5 rounded-full",
                              isDark ? "bg-white/15" : "bg-zinc-200",
                            )}
                          />
                        </span>
                        <span className="inline-flex items-center gap-0.5">
                          <span className="size-1 rounded-full bg-primary/35" />
                          <span
                            className={cn(
                              "h-0.5 w-3.5 rounded-full",
                              isDark ? "bg-white/15" : "bg-zinc-200",
                            )}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="relative mt-2 flex items-end justify-between gap-1.5 h-16"
                    onMouseLeave={() => setHoveredSegBar(null)}
                  >
                    {[28, 42, 58, 76, 95].map((h, i) => {
                      const isHovered = hoveredSegBar === i;
                      const isAnyHovered = hoveredSegBar !== null;
                      return (
                        <motion.div
                          key={i}
                          onMouseEnter={() => setHoveredSegBar(i)}
                          initial={
                            prefersReducedMotion
                              ? { height: `${h}%` }
                              : { height: "0%" }
                          }
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={
                            prefersReducedMotion
                              ? { duration: 0 }
                              : {
                                  duration: 0.65,
                                  delay: 0.2 + i * 0.08,
                                  ease: [0.16, 1, 0.3, 1],
                                }
                          }
                          className={cn(
                            "flex-1 rounded-[4px] cursor-pointer transition-colors duration-200",
                            isAnyHovered
                              ? isHovered
                                ? "bg-primary"
                                : isDark
                                  ? "bg-white/10"
                                  : "bg-zinc-200/80"
                              : i === 4
                                ? "bg-primary/80"
                                : i === 3
                                  ? "bg-primary/55"
                                  : isDark
                                    ? "bg-primary/25"
                                    : "bg-primary/25",
                          )}
                        />
                      );
                    })}
                    {/* Curved coral trendline overlay */}
                    <svg
                      viewBox="0 0 120 60"
                      fill="none"
                      aria-hidden
                      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                    >
                      <path
                        d="M 10 46 Q 48 44, 72 30 T 108 12"
                        stroke="var(--primary)"
                        strokeWidth="1.35"
                        strokeLinecap="round"
                      />
                      <circle cx="108" cy="12" r="2.2" fill="var(--primary)" />
                    </svg>
                  </div>
                </div>

                {/* 3. Center-right Google Ads Card */}
                <div
                  className={cn(
                    "translate-y-4 w-28 @sm:w-32 shrink-0 rounded-2xl p-2.5 pb-6",
                    isDark ? "bg-[#151821]" : "bg-white",
                  )}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={cn(
                        "flex size-5 items-center justify-center rounded-md",
                        isDark ? "bg-white/10" : "bg-zinc-100/90",
                      )}
                    >
                      <svg viewBox="0 0 24 24" className="size-3.5" aria-hidden>
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[7px] font-medium",
                        isDark
                          ? "bg-white/10 text-zinc-200"
                          : "bg-zinc-100/90 text-zinc-700",
                      )}
                    >
                      <span className="flex size-2.5 items-center justify-center rounded-full bg-green-500 text-white">
                        <Check className="size-1.5 stroke-[3]" />
                      </span>
                      Verified!
                    </span>
                  </div>
                  <p className="mt-4 text-[12px] @sm:text-[13px] font-medium tracking-tight truncate">
                    Google Ads
                  </p>
                </div>

                {/* 4. Far-right peek Average Increase Card */}
                <div
                  className={cn(
                    "-mr-6 translate-y-6 hidden @sm:block w-24 shrink-0 rounded-2xl p-2.5 pb-5",
                    isDark ? "bg-[#151821]" : "bg-white",
                  )}
                >
                  <p className="text-[8px] font-semibold truncate">Average Incre...</p>
                  <div className="mt-2 flex items-end gap-1 h-10">
                    <span
                      className={cn(
                        "self-start text-[6.5px] font-medium",
                        isDark ? "text-zinc-400" : "text-zinc-600",
                      )}
                    >
                      30
                    </span>
                    <div
                      className="flex flex-1 items-end gap-1 h-full"
                      onMouseLeave={() => setHoveredAvgBar(null)}
                    >
                    {[40, 70, 55].map((h, i) => {
                      const isHovered = hoveredAvgBar === i;
                      const isAnyHovered = hoveredAvgBar !== null;
                      return (
                        <motion.div
                          key={i}
                          onMouseEnter={() => setHoveredAvgBar(i)}
                          initial={
                            prefersReducedMotion
                              ? { height: `${h}%` }
                              : { height: "0%" }
                          }
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={
                            prefersReducedMotion
                              ? { duration: 0 }
                              : {
                                  duration: 0.65,
                                  delay: 0.3 + i * 0.09,
                                  ease: [0.16, 1, 0.3, 1],
                                }
                          }
                          className={cn(
                            "flex-1 rounded-t-xs cursor-pointer transition-colors duration-200",
                            isAnyHovered
                              ? isHovered
                                ? "bg-primary"
                                : isDark
                                  ? "bg-white/10"
                                  : "bg-zinc-200/80"
                              : "bg-primary/40",
                          )}
                        />
                      );
                    })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-4 @sm:gap-5">
            {/* Card 2: Advertising */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }
              }
              className={cn(
                "rounded-3xl p-5 @sm:p-6 overflow-hidden",
                isDark ? "bg-white/[0.04]" : "bg-[#F8F8F8]",
              )}
            >
              {/* Brand Icon Badge */}
              <VeloceRadarIconBadge
                isDark={isDark}
                prefersReducedMotion={prefersReducedMotion}
                delay={0.2}
                variant="target"
              />

              <h4 className="mt-4 text-[17px] @sm:text-[19px] font-semibold tracking-tight">
                Advertising
              </h4>
              <p
                className={cn(
                  "mt-2 text-[11px] @sm:text-[11.5px] leading-relaxed",
                  isDark ? "text-zinc-500" : "text-[#ACACAC]",
                )}
              >
                captivates and resonates with your audience through our cutting-edge
                advertising solutions at{" "}
                <span className="font-medium text-primary">Veloce</span>. In a world
                flooded with information, it&apos;s not just about being seen; it&apos;s
                about being remembered.
              </p>

              {/* 5 Square Icon Tiles */}
              <div className="mt-5 grid grid-cols-5 gap-2 @sm:gap-2.5">
                {[
                  {
                    key: "globe",
                    icon: GlobeIcon,
                    delay: 0,
                    badge: "+",
                    badgePos: "-bottom-0.5 -right-0.5 rounded-full",
                  },
                  {
                    key: "coins",
                    icon: CoinsIcon,
                    delay: 0.2,
                    badge: "$",
                    badgePos: "-bottom-0.5 -right-0.5 rounded-sm",
                  },
                  {
                    key: "wallet",
                    icon: WalletIcon,
                    delay: 0.4,
                    badge: "+",
                    badgePos: "-bottom-0.5 -left-0.5 rounded-full",
                  },
                  {
                    key: "mail",
                    icon: MailIcon,
                    delay: 0.6,
                    badge: "-",
                    badgePos: "-bottom-0.5 -left-0.5 rounded-full",
                  },
                  {
                    key: "heart",
                    icon: HeartIcon,
                    delay: 0.8,
                    badge: "check",
                    badgePos: "-bottom-0.5 -right-0.5 rounded-full",
                  },
                ].map((tile) => (
                  <div
                    key={tile.key}
                    className={cn(
                      "aspect-square rounded-2xl flex items-center justify-center transition-transform hover:-translate-y-0.5",
                      isDark
                        ? "bg-white/[0.05]"
                        : "bg-white shadow-[0_4px_14px_rgb(0_0_0/0.03)]",
                    )}
                  >
                    <div className="relative flex items-center justify-center">
                      <LoopingAnimatedIcon
                        icon={tile.icon}
                        size={28}
                        duration={2.2}
                        delay={tile.delay}
                        color="color-mix(in oklab, var(--primary) 72%, transparent)"
                        prefersReducedMotion={prefersReducedMotion}
                      />
                      <span
                        className={cn(
                          "absolute flex size-3 items-center justify-center bg-primary text-primary-foreground text-[7.5px] font-bold",
                          tile.badgePos,
                        )}
                      >
                        {tile.badge === "check" ? (
                          <Check className="size-2 stroke-[3]" />
                        ) : (
                          tile.badge
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Card 4: Efficient Management */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }
              }
              className={cn(
                "relative flex-1 flex flex-col rounded-3xl p-5 @sm:p-6 pb-0 @sm:pb-0 overflow-hidden",
                isDark ? "bg-white/[0.04]" : "bg-[#F8F8F8]",
              )}
            >
              <div>
                {/* Brand Icon Badge */}
                <VeloceRadarIconBadge
                  isDark={isDark}
                  prefersReducedMotion={prefersReducedMotion}
                  delay={0.6}
                  variant="compass"
                />

                <h4 className="mt-4 text-[17px] @sm:text-[19px] font-semibold tracking-tight">
                  Efficient Management
                </h4>
                <p
                  className={cn(
                    "mt-2 text-[11px] @sm:text-[11.5px] leading-relaxed",
                    isDark ? "text-zinc-500" : "text-[#ACACAC]",
                  )}
                >
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium.
                </p>
              </div>

              {/* Bottom Inner Mockup + Floating Popovers */}
              <div className="relative mt-auto pt-8">
                {/* Main Inner List Card */}
                <div
                  className={cn(
                    "mx-auto w-[92%] rounded-t-2xl p-4 pb-12",
                    isDark ? "bg-[#12151d]" : "bg-white",
                  )}
                >
                  {/* Item 1 */}
                  <div className="pb-3.5 border-b border-current/5">
                    <div className="flex items-center gap-2">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <LoopingAnimatedIcon
                          icon={ChartNoAxesColumnIcon}
                          size={11}
                          duration={2.0}
                          delay={0.1}
                          color="var(--primary)"
                          prefersReducedMotion={prefersReducedMotion}
                        />
                      </span>
                      <span className="text-[11.5px] @sm:text-[12px] font-semibold tracking-tight">
                        Planning & Goals
                      </span>
                    </div>
                    <p
                      className={cn(
                        "mt-1 pl-7 text-[8.5px] leading-relaxed max-w-[78%]",
                        isDark ? "text-zinc-500" : "text-[#ACACAC]",
                      )}
                    >
                      pivotal role that meticulous planning and well-defined goals
                      steering organizations toward sustainable success.
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="py-3.5 border-b border-current/5">
                    <div className="flex items-center gap-2">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <LoopingAnimatedIcon
                          icon={CopyCheckIcon}
                          size={11}
                          duration={1.8}
                          delay={0.3}
                          color="var(--primary)"
                          prefersReducedMotion={prefersReducedMotion}
                        />
                      </span>
                      <span className="text-[11.5px] @sm:text-[12px] font-semibold tracking-tight">
                        Resource Allocation and Optimization
                      </span>
                    </div>
                    <p
                      className={cn(
                        "mt-1 pl-7 text-[8.5px] leading-relaxed",
                        isDark ? "text-zinc-500" : "text-[#ACACAC]",
                      )}
                    >
                      including personnel, time, and finances, achieve organizational
                      goals.
                    </p>
                  </div>

                  {/* Item 3 (faded) */}
                  <div className="pt-3.5 opacity-60">
                    <p className="pl-7 text-[10.5px] font-semibold tracking-tight">
                      Leadership and Empowerment
                    </p>
                    <p
                      className={cn(
                        "mt-1 pl-7 text-[8px] leading-relaxed",
                        isDark ? "text-zinc-500" : "text-zinc-400",
                      )}
                    >
                      nization culture by promoting open communication.
                    </p>
                  </div>
                </div>

                {/* Top-Right Overlapping Radio Popover */}
                <LayoutGroup id={`veloce-mgmt-popover-${theme}`}>
                  <div
                    className={cn(
                      "absolute right-0 top-2 z-10 w-40 @sm:w-44 overflow-hidden rounded-xl p-1.5 space-y-1.5",
                      floatingSurface,
                    )}
                  >
                    {[0, 1, 2].map((idx) => {
                      const selected = selectedMgmtOption === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setMgmtStep(idx)}
                          className="relative flex w-full items-center gap-1.5 text-left cursor-pointer"
                        >
                          <span
                            className={cn(
                              "relative flex size-2.5 shrink-0 items-center justify-center rounded-full border transition-colors",
                              selected
                                ? "border-primary"
                                : isDark
                                  ? "border-zinc-600"
                                  : "border-zinc-300",
                            )}
                          >
                            {selected && (
                              <motion.span
                                layoutId="veloce-mgmt-active-dot"
                                transition={
                                  prefersReducedMotion
                                    ? { duration: 0 }
                                    : { type: "spring", stiffness: 400, damping: 30 }
                                }
                                className="absolute inset-0 flex items-center justify-center rounded-full bg-primary text-primary-foreground"
                              >
                                <Check className="size-1.5 stroke-[3]" />
                              </motion.span>
                            )}
                          </span>

                          <div
                            className={cn(
                              "relative z-10 flex flex-1 items-center justify-between gap-1.5 rounded-md px-1.5 py-1 min-w-0 transition-colors",
                              !selected &&
                                (isDark
                                  ? "bg-white/[0.04] hover:bg-white/[0.07]"
                                  : "bg-[#F8F8F8] hover:bg-zinc-100"),
                            )}
                          >
                            {selected && (
                              <motion.span
                                layoutId="veloce-mgmt-active-bg"
                                transition={
                                  prefersReducedMotion
                                    ? { duration: 0 }
                                    : { type: "spring", stiffness: 360, damping: 32 }
                                }
                                className={cn(
                                  "absolute inset-0 -z-10 rounded-md",
                                  isDark ? "bg-primary/15" : "bg-primary/10",
                                )}
                              />
                            )}
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span
                                aria-hidden
                                className="w-[2px] h-4 rounded-full bg-primary shrink-0"
                              />
                              <div className="min-w-0">
                                <p className="text-[7px] font-semibold truncate">
                                  Tailored Convenience
                                </p>
                                <p className="text-[5.5px] text-zinc-400 truncate">
                                  Customize your subscription
                                </p>
                              </div>
                            </div>
                            <ChevronRight className="size-2.5 shrink-0 text-zinc-400" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </LayoutGroup>

                {/* Bottom-Left Overlapping Create Form Popover */}
                <div
                  className={cn(
                    "absolute left-0 bottom-0 z-10 w-44 @sm:w-48 rounded-t-xl p-3 pb-5",
                    isDark
                      ? "bg-[#151821] shadow-[8px_0_18px_-6px_rgba(0,0,0,0.45)]"
                      : "bg-white shadow-[8px_0_18px_-6px_rgba(0,0,0,0.08)]",
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="flex size-4 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <LoopingAnimatedIcon
                        icon={ChartNoAxesColumnIcon}
                        size={9}
                        duration={2.0}
                        delay={0.35}
                        color="var(--primary)"
                        prefersReducedMotion={prefersReducedMotion}
                      />
                    </span>
                    <span className="text-[8px] font-semibold tracking-tight">
                      Create Planning & Goals!
                    </span>
                  </div>
                  <p className="mt-1 text-[5.5px] text-zinc-400 leading-snug">
                    Share your plans and objectives in a clear and concise manner.
                  </p>
                  <div
                    className={cn(
                      "mt-1.5 rounded-md border px-2 py-1 text-[6px] text-zinc-400",
                      isDark
                        ? "border-white/10 bg-white/[0.03]"
                        : "border-zinc-200/80 bg-zinc-50/70",
                    )}
                  >
                    Title here
                  </div>
                  <p className="mt-1.5 text-[6px] font-medium">Description</p>
                  <div
                    className={cn(
                      "mt-0.5 h-6 rounded-md border px-2 py-1 text-[5.5px] text-zinc-400",
                      isDark
                        ? "border-white/10 bg-white/[0.03]"
                        : "border-zinc-200/80 bg-zinc-50/70",
                    )}
                  >
                    Write a description of your project...
                  </div>
                </div>

                {/* Soft bottom fade */}
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-x-0 bottom-0 z-20 h-14 bg-gradient-to-t to-transparent",
                    isDark
                      ? "from-[#141720] via-[#141720]/70"
                      : "from-[#F8F8F8] via-[#F8F8F8]/70",
                  )}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. Achievements That Define Our Success Section */}
      <section className="mx-auto max-w-[560px] @4xl:max-w-5xl pt-16 pb-14">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
          }
          className="text-center"
        >
          <h3 className="text-2xl @sm:text-[32px] font-semibold tracking-tight leading-[1.18]">
            Achievements That Define Our Success!
          </h3>
          <p
            className={cn(
              "mx-auto mt-2.5 max-w-lg text-[11px] @sm:text-[12px] leading-relaxed",
              isDark ? "text-zinc-500" : "text-[#ACACAC]",
            )}
          >
            Step into a world of accolades and achievements that underscore our
            commitment to excellence at{" "}
            <span className="font-medium text-primary">Veloce.</span>
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 @sm:grid-cols-3 @4xl:grid-cols-6 gap-6 @sm:gap-6 items-start justify-items-center">
          {[
            {
              year: "2019",
              line1: "Excellence in",
              line2: "Innovation Award",
            },
            {
              year: "2020",
              line1: "Pinnacle of Performance",
              line2: "Recognition",
            },
            {
              year: "2021",
              line1: "Visionary Leadership",
              line2: "Accolade",
            },
            {
              year: "2022",
              line1: "Outstanding Customer",
              line2: "Experience Distinction",
            },
            {
              year: "2023",
              line1: "Masters of Team",
              line2: "Collaboration Honor",
            },
            {
              year: "2025",
              line1: "Global Digital",
              line2: "Excellence Award",
            },
          ].map((award, idx) => (
            <motion.div
              key={award.year}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.6,
                      delay: 0.08 * idx,
                      ease: [0.16, 1, 0.3, 1],
                    }
              }
              className="group flex flex-col items-center text-center transition-transform duration-200 hover:-translate-y-0.5"
            >
              {/* Laurel Wreath + Year */}
              <div className="relative flex h-24 w-32 items-center justify-center">
                <svg
                  viewBox="0 0 140 100"
                  className={cn(
                    "h-full w-full fill-current transition-colors",
                    isDark
                      ? "text-zinc-700 group-hover:text-zinc-500"
                      : "text-zinc-300 group-hover:text-zinc-400",
                  )}
                  aria-hidden
                >
                  {/* Left Wreath Branch */}
                  <path d="M40 13c-3 2-4 6-2 9 3-2 4-6 2-9zm-6 8c-4 1-6 5-4 9 4-1 6-5 4-9zm-5 9c-4 0-7 4-5 8 4 0 7-4 5-8zm-3 10c-4-1-8 2-7 7 4 1 8-2 7-7zm-1 11c-4-2-8 1-8 5 4 2 8-1 8-5zm2 10c-4-3-8-1-9 4 4 3 8 1 9-4zm5 10c-3-4-8-3-9 2 3 4 8 3 9-2zm7 8c-2-4-7-4-9 0 2 4 7 4 9 0zm10 6c-1-4-6-5-9-1 1 4 6 5 9 1zm11 3c0-4-5-6-8-3 0 4 5 6 8 3z" />
                  <path d="M44 18c-3 1-5 4-4 7 3-1 5-4 4-7zm-5 8c-3 0-6 3-5 6 3 0 6-3 5-6zm-4 9c-3-1-6 2-5 5 3 1 6-2 5-5zm-2 9c-3-2-6 1-6 4 3 2 6-1 6-4zm1 9c-3-2-6 0-6 4 3 2 6 0 6-4zm4 9c-2-3-6-1-7 2 2 3 6 1 7-2zm6 7c-2-3-6-2-7 1 2 3 6 2 7-1zm8 5c-1-3-5-3-7 0 1 3 5 3 7 0z" />
                  <path
                    d="M42 16C25 34 26 68 58 84c4 2 9 4 14 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />

                  {/* Right Wreath Branch (mirrored) */}
                  <g transform="translate(140, 0) scale(-1, 1)">
                    <path d="M40 13c-3 2-4 6-2 9 3-2 4-6 2-9zm-6 8c-4 1-6 5-4 9 4-1 6-5 4-9zm-5 9c-4 0-7 4-5 8 4 0 7-4 5-8zm-3 10c-4-1-8 2-7 7 4 1 8-2 7-7zm-1 11c-4-2-8 1-8 5 4 2 8-1 8-5zm2 10c-4-3-8-1-9 4 4 3 8 1 9-4zm5 10c-3-4-8-3-9 2 3 4 8 3 9-2zm7 8c-2-4-7-4-9 0 2 4 7 4 9 0zm10 6c-1-4-6-5-9-1 1 4 6 5 9 1zm11 3c0-4-5-6-8-3 0 4 5 6 8 3z" />
                    <path d="M44 18c-3 1-5 4-4 7 3-1 5-4 4-7zm-5 8c-3 0-6 3-5 6 3 0 6-3 5-6zm-4 9c-3-1-6 2-5 5 3 1 6-2 5-5zm-2 9c-3-2-6 1-6 4 3 2 6-1 6-4zm1 9c-3-2-6 0-6 4 3 2 6 0 6-4zm4 9c-2-3-6-1-7 2 2 3 6 1 7-2zm6 7c-2-3-6-2-7 1 2 3 6 2 7-1zm8 5c-1-3-5-3-7 0 1 3 5 3 7 0z" />
                    <path
                      d="M42 16C25 34 26 68 58 84c4 2 9 4 14 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </g>
                </svg>

                <span
                  className={cn(
                    "absolute text-[15px] @sm:text-[16px] font-medium tracking-tight",
                    isDark ? "text-zinc-500" : "text-zinc-400",
                  )}
                >
                  {award.year}
                </span>
              </div>

              {/* 2-line Award Title */}
              <p
                className={cn(
                  "mt-2 text-[10px] @sm:text-[10.5px] font-medium leading-[1.38]",
                  isDark ? "text-zinc-500" : "text-[#ACACAC]",
                )}
              >
                {award.line1}
                <br />
                {award.line2}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. Frequently Ask Questions Section + Bottom CTA */}
      <section className="mx-auto max-w-[560px] @4xl:max-w-5xl pt-16 pb-14">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
          }
          className="text-center"
        >
          <h3 className="text-2xl @sm:text-[34px] font-semibold tracking-tight leading-[1.16]">
            Frequently
            <br />
            Ask Questions
          </h3>
        </motion.div>

        {/* Accordion List */}
        <div
          className={cn(
            "mx-auto mt-10 max-w-2xl divide-y border-b",
            isDark
              ? "divide-white/10 border-white/10"
              : "divide-[#F8F8F8] border-[#F8F8F8]",
          )}
        >
          {[
            {
              question: "What Services Does Veloce Offer?",
              answer: (
                <>
                  Veloce offers business planning, financial modeling, content
                  creation, strategic marketing, and operational efficiency solutions
                  tailored to help your business scale.
                </>
              ),
            },
            {
              question: "How Can I Contact Customer Support?",
              answer: (
                <>
                  Our customer support team is available{" "}
                  <span
                    className={cn(
                      "font-medium",
                      isDark ? "text-zinc-200" : "text-zinc-800",
                    )}
                  >
                    9AM-5PM GMT+7
                  </span>
                  . You can reach us by{" "}
                  <span
                    className={cn(
                      "font-medium",
                      isDark ? "text-zinc-200" : "text-zinc-800",
                    )}
                  >
                    support@veloce.com
                  </span>{" "}
                  . For urgent matters, we recommend to call{" "}
                  <span
                    className={cn(
                      "font-medium",
                      isDark ? "text-zinc-200" : "text-zinc-800",
                    )}
                  >
                    +628529241XXXX
                  </span>
                </>
              ),
            },
            {
              question: "What Sets Veloce Apart From Competitors?",
              answer: (
                <>
                  We combine data-driven strategy with hands-on creative execution,
                  delivering measurable ROI and dedicated support at every stage of
                  your growth.
                </>
              ),
            },
            {
              question:
                "Are There Any Ongoing Support Options After Service Implementation?",
              answer: (
                <>
                  Yes, we offer ongoing support to ensure the continued success of our
                  services. Our team is dedicated to providing post-implementation
                  support, addressing any questions or concerns you may have.
                </>
              ),
            },
            {
              question: "How Do I Get Started With Veloce's Services?",
              answer: (
                <>
                  Simply reach out through our contact form or schedule a consultation
                  with our team to discuss your goals and receive a tailored roadmap.
                </>
              ),
            },
          ].map((faq, idx) => {
            const isOpen = openFaqIndices.includes(idx);
            return (
              <div key={faq.question} className="py-4">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpenFaqIndices((prev) =>
                      prev.includes(idx)
                        ? prev.filter((item) => item !== idx)
                        : [...prev, idx],
                    )
                  }
                  className="flex w-full items-center justify-between gap-4 text-left cursor-pointer group"
                >
                  <span className="text-[12.5px] @sm:text-[13.5px] font-medium tracking-tight">
                    {faq.question}
                  </span>
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                      isDark
                        ? "bg-white/[0.05] text-zinc-400 group-hover:bg-white/[0.08] group-hover:text-zinc-200"
                        : "bg-[#F8F8F8] text-zinc-600 group-hover:bg-zinc-200/70",
                    )}
                  >
                    <motion.svg
                      viewBox="0 0 16 16"
                      className="size-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      initial={false}
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : isOpen
                            ? { rotate: 180, scale: [1, 1.18, 1] }
                            : {
                                rotate: [0, 8, 0, -8, 0],
                                scale: [1, 1.06, 1, 1.06, 1],
                              }
                      }
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : isOpen
                            ? {
                                rotate: { type: "spring", stiffness: 320, damping: 22 },
                                scale: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                              }
                            : {
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }
                      }
                      aria-hidden
                    >
                      <motion.line
                        x1="3.5"
                        y1="8"
                        x2="12.5"
                        y2="8"
                        initial={false}
                        animate={
                          prefersReducedMotion
                            ? undefined
                            : { scaleX: isOpen ? [1, 1.15, 1] : 1 }
                        }
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ transformOrigin: "8px 8px" }}
                      />
                      <motion.line
                        x1="8"
                        y1="3.5"
                        x2="8"
                        y2="12.5"
                        initial={false}
                        animate={
                          isOpen
                            ? { rotate: 90, opacity: 0, scaleY: 0 }
                            : { rotate: 0, opacity: 1, scaleY: 1 }
                        }
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : {
                                rotate: { type: "spring", stiffness: 340, damping: 24 },
                                scaleY: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
                                opacity: { duration: 0.2, ease: "easeOut" },
                              }
                        }
                        style={{ transformOrigin: "8px 8px" }}
                      />
                    </motion.svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={
                        prefersReducedMotion
                          ? { height: "auto" }
                          : { height: 0 }
                      }
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { duration: 0.52, ease: [0.32, 0.72, 0, 1] }
                      }
                      className="overflow-hidden"
                    >
                      <motion.p
                        initial={
                          prefersReducedMotion
                            ? { opacity: 1, y: 0, filter: "blur(0px)" }
                            : { opacity: 0, y: -8, filter: "blur(3px)" }
                        }
                        animate={{
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                          transition: prefersReducedMotion
                            ? { duration: 0 }
                            : {
                                duration: 0.56,
                                delay: 0.09,
                                ease: [0.16, 1, 0.3, 1],
                              },
                        }}
                        exit={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : {
                                opacity: 0,
                                y: -4,
                                transition: { duration: 0.22, ease: "easeIn" },
                              }
                        }
                        className={cn(
                          "mt-2 pr-6 text-[10.5px] @sm:text-[11.5px] leading-relaxed",
                          isDark ? "text-zinc-500" : "text-[#ACACAC]",
                        )}
                      >
                        {faq.answer}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
          }
          className={cn(
            "mx-auto mt-8 max-w-2xl rounded-2xl px-6 py-5 @sm:px-7 @sm:py-6 flex flex-col @sm:flex-row @sm:items-center justify-between gap-4",
            isDark
              ? "bg-[#141720]"
              : "bg-[#F8F8F8]",
          )}
        >
          <div>
            <p className="text-[10px] @sm:text-[10.5px] font-medium text-primary">
              Do You Have Any Question
            </p>
            <h4 className="mt-0.5 text-lg @sm:text-[20px] font-semibold tracking-tight">
              Let&apos;s Talk With Us!
            </h4>
          </div>

          {/* Login: Right rounded-bg icon exits right while left rounded-bg icon enters left */}
          <button
            type="button"
            className={cn(
              "group relative overflow-hidden inline-flex items-center justify-center self-start @sm:self-auto rounded-full pl-5 pr-2.5 py-2 text-[11.5px] font-medium cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-95",
              isDark
                ? "bg-white text-zinc-950 hover:bg-zinc-100"
                : "bg-zinc-950 text-white hover:bg-zinc-900",
            )}
          >
            {/* Left entering rounded-bg icon */}
            <span
              aria-hidden
              className="absolute left-2.5 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground -translate-x-10 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100"
            >
              <ArrowRight className="size-3" />
            </span>

            {/* Label shifts right cleanly to make room for left icon */}
            <span className="relative z-10 pr-2.5 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3.5">
              Login
            </span>

            {/* Right exiting rounded-bg icon */}
            <span
              aria-hidden
              className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground translate-x-0 opacity-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-12 group-hover:opacity-0"
            >
              <ArrowRight className="size-3" />
            </span>
          </button>
        </motion.div>
      </section>

      {/* 9. Footer Section */}
      <footer
        className={cn(
          "-mx-4 -mb-5 @sm:-mx-6 @lg:-mx-10 @lg:-mb-7 mt-8 px-4 @sm:px-6 @lg:px-10 pt-12 pb-8",
          isDark ? "bg-white/[0.02]" : "bg-[#F8F8F8]",
        )}
      >
        <div className="mx-auto max-w-[560px] @4xl:max-w-5xl">
          <div className="grid grid-cols-1 @4xl:grid-cols-12 gap-10">
            {/* Left Brand + Contact Info */}
            <div className="@4xl:col-span-6">
              <div className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground shrink-0">
                  <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
                    <path d="M4.5 5.5L12 19.5L19.5 5.5H15.8L12 12.8L8.2 5.5H4.5Z" />
                  </svg>
                </span>
                <span className="text-[16px] font-semibold tracking-tight">
                  Veloce
                </span>
              </div>

              <p
                className={cn(
                  "mt-3.5 text-[10px] @sm:text-[10.5px]",
                  isDark ? "text-zinc-500" : "text-zinc-400",
                )}
              >
                Built for modern SaaS &amp; AI teams
              </p>

              <a
                href=""
                onClick={(e) => e.preventDefault()}
                className="mt-2 inline-block text-lg @sm:text-[21px] font-medium tracking-tight hover:opacity-80 transition-opacity"
              >
                support@veloce.com
              </a>
            </div>

            {/* Right 3 Link Columns */}
            <div className="@4xl:col-span-6 grid grid-cols-3 gap-6 @sm:gap-8">
              <div>
                <h5 className="text-[11px] @sm:text-[11.5px] font-semibold mb-3">
                  Pages
                </h5>
                <ul className="space-y-2">
                  {["Home", "About", "Blog", "Contact"].map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        className={cn(
                          "group inline-flex items-center gap-1.5 text-[10.5px] @sm:text-[11px] transition-colors cursor-pointer",
                          isDark
                            ? "text-zinc-500 hover:text-zinc-300"
                            : "text-zinc-400 hover:text-zinc-700",
                        )}
                      >
                        <ArrowRight className="size-3 shrink-0 opacity-65 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
                        <span>{item}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-[11px] @sm:text-[11.5px] font-semibold mb-3">
                  Socials
                </h5>
                <ul className="space-y-2">
                  {[
                    {
                      name: "Instagram",
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          className="size-3.5 shrink-0 stroke-current fill-none opacity-75 transition-colors group-hover:text-primary"
                          strokeWidth="1.9"
                          aria-hidden
                        >
                          <rect x="3" y="3" width="18" height="18" rx="5" />
                          <circle cx="12" cy="12" r="4" />
                          <circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-none" />
                        </svg>
                      ),
                    },
                    {
                      name: "Facebook",
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          className="size-3.5 shrink-0 fill-current opacity-75 transition-colors group-hover:text-primary"
                          aria-hidden
                        >
                          <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4v2.2H8v3h2.5V21h3z" />
                        </svg>
                      ),
                    },
                    {
                      name: "Twitter",
                      icon: (
                        <svg
                          viewBox="0 0 24 24"
                          className="size-3.5 shrink-0 fill-current opacity-75 transition-colors group-hover:text-primary"
                          aria-hidden
                        >
                          <path d="M22 5.9a8.2 8.2 0 0 1-2.36.65 4.12 4.12 0 0 0 1.8-2.27 8.2 8.2 0 0 1-2.6 1 4.1 4.1 0 0 0-7 3.74A11.64 11.64 0 0 1 3.4 4.7a4.1 4.1 0 0 0 1.27 5.47 4.07 4.07 0 0 1-1.86-.51v.05a4.1 4.1 0 0 0 3.29 4.02 4.1 4.1 0 0 1-1.85.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 2 18.4a11.62 11.62 0 0 0 6.29 1.84c7.55 0 11.68-6.25 11.68-11.67 0-.18 0-.35-.01-.53A8.34 8.34 0 0 0 22 5.9Z" />
                        </svg>
                      ),
                    },
                  ].map((item) => (
                    <li key={item.name}>
                      <button
                        type="button"
                        className={cn(
                          "group inline-flex items-center gap-1.5 text-[10.5px] @sm:text-[11px] transition-colors cursor-pointer",
                          isDark
                            ? "text-zinc-500 hover:text-zinc-300"
                            : "text-zinc-400 hover:text-zinc-700",
                        )}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-[11px] @sm:text-[11.5px] font-semibold mb-3">
                  Service
                </h5>
                <ul className="space-y-2">
                  {[
                    "Privacy & Policy",
                    "Terms and Conditions",
                    "FAQ's",
                    "Help Center",
                  ].map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        className={cn(
                          "group inline-flex items-center gap-1.5 text-[10.5px] @sm:text-[11px] transition-colors cursor-pointer text-left",
                          isDark
                            ? "text-zinc-500 hover:text-zinc-300"
                            : "text-zinc-400 hover:text-zinc-700",
                        )}
                      >
                        <ArrowRight className="size-3 shrink-0 opacity-65 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
                        <span>{item}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Divider & Copyright Bar */}
          <div
            className={cn(
              "mt-10 pt-5 border-t flex flex-col @sm:flex-row items-start @sm:items-center justify-between gap-3 text-[10px]",
              isDark
                ? "border-white/10 text-zinc-500"
                : "border-zinc-200/80 text-zinc-400",
            )}
          >
            <p>© 2026 Veloce. All rights reserved.</p>

            <div className="flex items-center gap-5">
              <button
                type="button"
                className={cn(
                  "transition-colors cursor-pointer",
                  isDark ? "hover:text-zinc-300" : "hover:text-zinc-700",
                )}
              >
                Privacy policy
              </button>
              <button
                type="button"
                className={cn(
                  "transition-colors cursor-pointer",
                  isDark ? "hover:text-zinc-300" : "hover:text-zinc-700",
                )}
              >
                Terms of service
              </button>
              <button
                type="button"
                onClick={(e) => {
                  const scroller = e.currentTarget.closest(".overflow-y-auto");
                  if (scroller) {
                    scroller.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={cn(
                  "transition-colors cursor-pointer",
                  isDark ? "hover:text-zinc-300" : "hover:text-zinc-700",
                )}
              >
                Go to top
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const VELOCE_PAGES: TemplatePreviewTab[] = [
  {
    id: "home",
    label: "Home",
    path: "/",
    render: (theme, onToggleTheme) => (
      <VeloceHeroPreview theme={theme} onToggleTheme={onToggleTheme} />
    ),
  },
];

export function VeloceTemplateView() {
  return (
    <TemplatePage
      category="SaaS & AI"
      tier="Free"
      isNew
      title="Veloce"
      description="A complete marketing site for an AI or SaaS product, featuring a clean navbar and high-converting bento hero section in light and dark themes."
      demoDomain="https://veloce.vercel.app"
      pages={VELOCE_PAGES}
      whatYouGet={{
        description:
          "The full source code of the site in the preview, as a Next.js project you own and change freely. Version 1.0.0.",
        techStack: [
          { name: "Next.js", version: "16", iconKey: "nextjs" },
          { name: "React", version: "19", iconKey: "react" },
          { name: "Tailwind CSS", version: "v4", iconKey: "tailwind" },
          { name: "TypeScript", iconKey: "typescript" },
          { name: "Motion", iconKey: "motion" },
          { name: "MDX", iconKey: "mdx" },
        ],
        features: [
          "Light and dark modes powered by CSS design tokens",
          "Live theme customizer with adjustable accent and radius",
          "100% mobile responsive navbar and bento hero layout",
          "Typed React 19 & Tailwind CSS v4 component architecture",
          "MDX-ready changelog and documentation routes",
          "Motion-safe animations respecting reduced-motion settings",
          "SEO metadata, sitemap, and robots.txt preconfigured",
          "Clean source code you own with lifetime template updates",
        ],
      }}
      pagesOverview={{
        subtitle:
          "One landing page with nine core sections designed for both light and dark themes.",
        items: [
          {
            id: "home",
            number: "01",
            path: "/#navbar",
            title: "Navbar",
            description:
              "Responsive top bar with brand mark, centered links, theme button, and mobile drawer.",
          },
          {
            id: "home",
            number: "02",
            path: "/#hero",
            title: "Hero",
            description:
              "Inline-badge headline, dual CTA pills, and a 3-column bento showcase grid.",
          },
          {
            id: "home",
            number: "03",
            path: "/#trusted",
            title: "Logo Marquee",
            description:
              "Infinite right-to-left company logo strip with soft edge fades.",
          },
          {
            id: "home",
            number: "04",
            path: "/#content-marketing",
            title: "Content Marketing",
            description:
              "Portrait showcase with animated donut, sales chart, ad platforms, and interactive checklist.",
          },
          {
            id: "home",
            number: "05",
            path: "/#business-planning",
            title: "Business Planning",
            description:
              "2x2 strategy cards paired with portrait, verified badge, and interactive B2B income area chart.",
          },
          {
            id: "home",
            number: "06",
            path: "/#solutions",
            title: "Crafting Solutions",
            description:
              "Asymmetric 4-card bento showcase for Subscription, Advertising, Tracking & Record, and Efficient Management.",
          },
          {
            id: "home",
            number: "07",
            path: "/#achievements",
            title: "Achievements",
            description:
              "Six annual laurel wreath accolades from 2019 to 2025 in a responsive grid.",
          },
          {
            id: "home",
            number: "08",
            path: "/#faq",
            title: "FAQ & Contact CTA",
            description:
              "Interactive multi-open FAQ accordion paired with a bottom Let's Talk With Us! banner.",
          },
          {
            id: "home",
            number: "09",
            path: "/#footer",
            title: "Footer",
            description:
              "Veloce brand footer with contact email, 3-column link directory, and Go to top action.",
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
              "The complete Veloce SaaS template on its own, ready to customize and deploy.",
            features: [
              "Full Next.js 16 & React 19 source code",
              "Responsive Navbar & Hero sections in light & dark",
              "MDX blog, changelog & theme customizer",
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
            Put your product in{" "}
            <code className="rounded bg-foreground/[0.06] px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              lib/site.ts
            </code>{" "}
            and the words in{" "}
            <code className="rounded bg-foreground/[0.06] px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              content/
            </code>
            . The README walks through the rest.
          </span>,
        ],
        terminalCommand: "npm install\nnpm run dev",
      }}
    />
  );
}
