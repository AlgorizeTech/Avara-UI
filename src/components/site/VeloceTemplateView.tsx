"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  BarChart2,
  Check,
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
import { cn } from "@/lib/utils";

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
  const prefersReducedMotion = useReducedMotion();
  const contentGridRef = useRef<HTMLDivElement>(null);
  const donutCardRef = useRef<HTMLDivElement>(null);
  const salesCardRef = useRef<HTMLDivElement>(null);
  const featureBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [connectorCoords, setConnectorCoords] = useState<{
    donutX: number;
    donutY: number;
    salesLeftX: number;
    salesMidY: number;
    startX: number;
    startY: number;
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
        targetX: btnRect.left - gridRect.left,
        targetY: btnRect.top - gridRect.top + btnRect.height / 2,
      });
    };

    updateCoords();
    const observer = new ResizeObserver(updateCoords);
    if (contentGridRef.current) observer.observe(contentGridRef.current);
    return () => observer.disconnect();
  }, [selectedFeature]);
  const [customerCount, setCustomerCount] = useState(() =>
    prefersReducedMotion ? 15823 : 0,
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      setCustomerCount(15823);
      return;
    }

    const target = 15823;
    const duration = 1800;
    let rafId = 0;
    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCustomerCount(Math.round(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [prefersReducedMotion]);

  const formattedCustomerCount = customerCount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const cardSurface = isDark
    ? "bg-white/[0.04] border border-white/[0.08]"
    : "bg-[#f5f5f7] border border-black/[0.04]";

  const floatingSurface = isDark
    ? "bg-[#151821]/95 border border-white/10 shadow-lg"
    : "bg-white/95 border border-black/[0.05] shadow-[0_8px_24px_rgb(0_0_0/0.06)]";

  return (
    <div
      className={cn(
        "@container relative overflow-hidden w-full min-h-[540px] px-4 py-5 @sm:px-6 @lg:px-10 @lg:py-7 font-sans",
        isDark ? "bg-[#0b0d12] text-zinc-100" : "bg-white text-zinc-900",
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
            "@md:hidden flex size-8 items-center justify-center rounded-lg border cursor-pointer transition-colors",
            isDark
              ? "border-white/10 bg-white/[0.06] text-zinc-200 hover:bg-white/10"
              : "border-zinc-200/80 bg-zinc-100/80 text-zinc-700 hover:bg-zinc-200/70",
          )}
        >
          <Menu className="size-4" />
        </button>

        {/* Brand (Centered on mobile, Left on desktop) */}
        <div className="flex items-center gap-2 h-8 @md:static absolute left-1/2 -translate-x-1/2 @md:translate-x-0">
          <span className="flex size-6 items-center justify-center rounded-md bg-blue-600 text-white shrink-0">
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
            "flex size-8 items-center justify-center rounded-lg border shrink-0 cursor-pointer transition-colors",
            isDark
              ? "border-white/10 bg-white/[0.06] text-zinc-200 hover:bg-white/10"
              : "border-zinc-200/80 bg-zinc-100/80 text-zinc-700 hover:bg-zinc-200/70",
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
                    <span className="flex size-6 items-center justify-center rounded-md bg-blue-600 text-white">
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
                        <span className="size-1.5 rounded-full bg-blue-600" />
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="pt-4 border-t border-current/10">
                <span
                  className={cn(
                    "inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-[12px] font-medium cursor-pointer",
                    isDark ? "bg-white text-zinc-900" : "bg-zinc-900 text-white",
                  )}
                >
                  <span>Get Started</span>
                  <ArrowRight className="size-3.5" />
                </span>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 2. Hero Section */}
      <section className="mx-auto max-w-5xl pt-9 @sm:pt-12">
        {/* Headline */}
        <div className="text-center">
          <h3 className="flex flex-col items-center text-[26px] @sm:text-[38px] @lg:text-[46px] font-semibold tracking-tight leading-[1.12] uppercase">
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
                <span className="flex size-7 @sm:size-9 @lg:size-10 items-center justify-center rounded-full bg-amber-100 text-amber-600 ring-2 ring-white dark:ring-[#0b0d12]">
                  <BarChart2 className="size-3.5 @sm:size-4 @lg:size-5" />
                </span>
                <span className="flex size-7 @sm:size-9 @lg:size-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-2 ring-white dark:ring-[#0b0d12]">
                  <Globe className="size-3.5 @sm:size-4 @lg:size-5" />
                </span>
                <span className="flex size-7 @sm:size-9 @lg:size-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 ring-2 ring-white dark:ring-[#0b0d12]">
                  <MousePointerClick className="size-3.5 @sm:size-4 @lg:size-5" />
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
              "mt-3.5 mx-auto max-w-md text-[11.5px] @sm:text-[12.5px] leading-relaxed",
              isDark ? "text-zinc-400" : "text-zinc-500",
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
            className="mt-5 flex flex-wrap items-center justify-center gap-2.5"
          >
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11.5px] font-medium cursor-pointer transition-opacity hover:opacity-90",
                isDark ? "bg-white text-zinc-900" : "bg-zinc-900 text-white",
              )}
            >
              <span>Get Started</span>
              <ArrowRight className="size-3.5" />
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11.5px] font-medium cursor-pointer transition-colors",
                isDark
                  ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
                  : "border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50",
              )}
            >
              <span>Learn More</span>
              <ArrowRight className="size-3.5" />
            </span>
          </motion.div>
        </div>

        {/* Bottom 3-Column Bento Grid */}
        <div className="mt-8 grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-12 gap-3.5 items-stretch">
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
              "@lg:col-span-3 rounded-2xl p-5 flex flex-col justify-between min-h-[300px]",
              cardSurface,
            )}
          >
            <div>
              <h4 className="text-[14px] font-semibold leading-snug">
                Mastering the Art of Digital Marketing
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
              className="my-4 flex items-center justify-center"
            >
              <img
                src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1795520794/002-1795520794090.png"
                alt="Digital marketing illustration"
                className="w-36 h-36 object-contain rounded-xl"
              />
            </motion.div>

            <div>
              <p
                className={cn(
                  "text-[10.5px] leading-relaxed",
                  isDark ? "text-zinc-400" : "text-zinc-500",
                )}
              >
                Program that goes beyond the basics, offering you a deep dive into the art and
                science of digital marketing.
              </p>
              <span
                className={cn(
                  "mt-3.5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-medium",
                  isDark ? "bg-white text-zinc-900" : "bg-zinc-900 text-white",
                )}
              >
                <span>Learn More</span>
                <ArrowRight className="size-3" />
              </span>
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
              "@lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[320px] flex items-end justify-center",
              cardSurface,
            )}
          >
            {/* Studio Portrait */}
            <img
              src="/images/templates/veloce-person.jpg"
              alt="Digital marketer peeking over a book"
              className="absolute inset-0 h-full w-full object-cover object-top"
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
              <Globe className="size-3.5 text-zinc-600 dark:text-zinc-300" />
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
                "hidden @sm:flex absolute right-3.5 top-3.5 z-10 flex-col rounded-xl p-2.5 w-32",
                floatingSurface,
              )}
            >
              <div className="flex items-center gap-1 text-[9.5px] font-medium text-zinc-500 dark:text-zinc-400">
                <span className="size-2 rounded-xs bg-rose-400" />
                <span>Segmentation</span>
              </div>
              <div
                onMouseLeave={() => setHoveredBar(null)}
                className="mt-2 flex items-end justify-between gap-1 h-10"
              >
                {[38, 52, 46, 72, 65, 92].map((h, idx) => {
                  const isDimmed = hoveredBar !== null && hoveredBar !== idx;
                  const isHovered = hoveredBar === idx;
                  return (
                    <motion.div
                      key={idx}
                      onMouseEnter={() => setHoveredBar(idx)}
                      initial={prefersReducedMotion ? { height: `${h}%` } : { height: "0%" }}
                      animate={{ height: `${h}%` }}
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
                        "w-2.5 rounded-t-sm cursor-pointer transition-colors duration-150",
                        isDimmed
                          ? isDark
                            ? "bg-white/15"
                            : "bg-zinc-300"
                          : isHovered
                            ? "bg-rose-500"
                            : "bg-rose-400/85",
                      )}
                    />
                  );
                })}
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
                "absolute left-3.5 bottom-3.5 z-10 rounded-xl p-3 w-40 @sm:w-44",
                floatingSurface,
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex size-5 items-center justify-center rounded-full bg-zinc-100 dark:bg-white/10 text-[11px] font-bold text-blue-600">
                  G
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <Check className="size-2.5" />
                  Verified
                </span>
              </div>
              <p className="mt-2 text-[13px] font-semibold leading-tight">Google Ads</p>
              <div className="mt-1 flex items-center gap-1 text-[9.5px] text-zinc-500 dark:text-zinc-400">
                <span className="font-semibold text-zinc-900 dark:text-white">4.9</span>
                <Star className="size-2.5 fill-amber-400 text-amber-400" />
                <span>(10 Stars Reviews)</span>
              </div>
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
                "absolute right-3.5 bottom-3.5 z-10 flex items-center gap-2 rounded-full px-2.5 py-1.5",
                floatingSurface,
              )}
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-rose-400 text-white">
                <ArrowRight className="size-3" />
              </span>
              <div className="pr-1">
                <p className="text-[10.5px] font-semibold leading-none">2,924 Views</p>
                <div className="mt-1 h-1 w-10 rounded-full bg-zinc-200 dark:bg-white/15" />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: 2 Stacked Cards */}
          <div className="@md:col-span-2 @lg:col-span-4 flex flex-col gap-3.5">
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
                  <span
                    className={cn(
                      "flex size-8 items-center justify-center rounded-full shrink-0",
                      isDark ? "bg-white/10" : "bg-zinc-200/80",
                    )}
                  >
                    <Heart className="size-4 fill-rose-500 text-rose-500" />
                  </span>
                  <span className="text-2xl font-semibold tracking-tight tabular-nums">
                    {formattedCustomerCount}
                  </span>
                </div>

                <div className="flex -space-x-2">
                  {[
                    "bg-amber-200 text-amber-900",
                    "bg-sky-200 text-sky-900",
                    "bg-emerald-200 text-emerald-900",
                  ].map((tone, i) => (
                    <span
                      key={i}
                      className={cn(
                        "flex size-6 items-center justify-center rounded-full text-[10px] font-semibold ring-2",
                        tone,
                        isDark ? "ring-[#151821]" : "ring-[#f5f5f7]",
                      )}
                    >
                      {["A", "M", "K"][i]}
                    </span>
                  ))}
                </div>
              </div>

              <p
                className={cn(
                  "text-[10.5px] leading-relaxed",
                  isDark ? "text-zinc-400" : "text-zinc-500",
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
                    isDark ? "text-zinc-400" : "text-zinc-500",
                  )}
                >
                  Commitment to excellence, agility, and forward-thinking positions us as the
                  catalyst for your business growth
                </p>
              </div>

              <div
                className={cn(
                  "mt-4 flex items-center justify-between gap-2 rounded-xl border-l-2 border-l-rose-500 px-3 py-2.5",
                  isDark ? "bg-white/[0.06]" : "bg-white shadow-xs",
                )}
              >
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold truncate">Contract with Startup</p>
                  <p
                    className={cn(
                      "text-[9.5px] truncate",
                      isDark ? "text-zinc-400" : "text-zinc-500",
                    )}
                  >
                    28 Startup Member
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <div className="flex -space-x-1.5">
                    {[
                      { ch: "N", cls: "bg-amber-400 text-white" },
                      { ch: "A", cls: "bg-orange-400 text-white" },
                      { ch: "R", cls: "bg-violet-400 text-white" },
                    ].map((badge) => (
                      <span
                        key={badge.ch}
                        className={cn(
                          "flex size-5 items-center justify-center rounded-full text-[9px] font-bold ring-1",
                          badge.cls,
                          isDark ? "ring-[#151821]" : "ring-white",
                        )}
                      >
                        {badge.ch}
                      </span>
                    ))}
                  </div>
                  <ChevronRight className="size-3.5 text-zinc-400" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Trusted Companies Infinite Marquee Section */}
      <section className="mx-auto max-w-5xl pt-14 pb-6">
        <div className="text-center">
          <h3 className="text-xl @sm:text-2xl font-semibold tracking-tight">
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
              "mt-2 text-[11px] @sm:text-[12px]",
              isDark ? "text-zinc-400" : "text-zinc-500",
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
                : { duration: 24, repeat: Infinity, ease: "linear" }
            }
            className="flex w-max items-center"
          >
            {[0, 1].map((dup) => (
              <div
                key={dup}
                aria-hidden={dup === 1 || undefined}
                className={cn(
                  "flex items-center gap-12 @sm:gap-16 pr-12 @sm:pr-16 select-none",
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
      <section className="mx-auto max-w-5xl pt-16 pb-10">
        <div
          ref={contentGridRef}
          className="relative grid grid-cols-1 @lg:grid-cols-12 gap-10 @lg:gap-8 items-center"
        >
          {/* Dynamic Dashed Connectors */}
          {connectorCoords && (
            <svg
              aria-hidden
              className="hidden @lg:block pointer-events-none absolute inset-0 h-full w-full z-0 overflow-visible"
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
                    const r = Math.min(14, Math.abs(targetY - startY) / 2);
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
          <div className="@lg:col-span-6 relative mx-auto w-full max-w-[440px] min-h-[380px] @sm:min-h-[420px] flex items-center justify-center">

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
              className="relative z-0 w-56 @sm:w-64 h-80 @sm:h-96 overflow-hidden flex items-end justify-center"
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
                floatingSurface,
              )}
            >
              <div className="relative mx-auto size-16 flex items-center justify-center">
                <svg viewBox="0 0 64 64" className="size-16 -rotate-90" aria-hidden>
                  <circle
                    cx="32"
                    cy="32"
                    r="25"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    className={isDark ? "text-white/10" : "text-rose-100"}
                  />
                  <motion.circle
                    cx="32"
                    cy="32"
                    r="25"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                    className="text-rose-500"
                    strokeDasharray={2 * Math.PI * 25}
                    initial={
                      prefersReducedMotion
                        ? { strokeDashoffset: 2 * Math.PI * 25 * 0.2 }
                        : { strokeDashoffset: 2 * Math.PI * 25 }
                    }
                    whileInView={{ strokeDashoffset: 2 * Math.PI * 25 * 0.2 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }
                    }
                  />
                </svg>
                <span className="absolute text-[13px] font-semibold text-rose-500">
                  80%
                </span>
              </div>

              <p className="mt-2.5 text-lg font-bold tracking-tight leading-none">
                17K+
              </p>
              <p
                className={cn(
                  "mt-1 text-[9px] leading-snug",
                  isDark ? "text-zinc-400" : "text-zinc-500",
                )}
              >
                1,000K+ Contributions in the last year!
              </p>
            </motion.div>

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
                "absolute right-0 @sm:right-2 top-2 @sm:top-4 z-10 w-40 @sm:w-44 rounded-2xl p-3.5",
                floatingSurface,
              )}
            >
              <p className="text-[9.5px] font-semibold text-center">
                Average Increase Sales
              </p>

              <div className="mt-2.5 flex items-end gap-1.5 h-20">
                <div className="flex flex-col justify-between h-full text-[8px] font-medium text-zinc-400 pr-0.5">
                  <span>30</span>
                  <span>20</span>
                  <span>10</span>
                </div>
                <div className="relative flex-1 flex items-end justify-between gap-1 h-full border-b border-current/10 pb-0.5">
                  {[
                    { h: 68, cls: isDark ? "bg-rose-500/25" : "bg-rose-100" },
                    { h: 52, cls: isDark ? "bg-rose-500/40" : "bg-rose-200" },
                    { h: 42, cls: isDark ? "bg-rose-500/55" : "bg-rose-200/90" },
                    { h: 94, cls: isDark ? "bg-rose-500/85" : "bg-rose-300" },
                    { h: 74, cls: isDark ? "bg-rose-500" : "bg-rose-400/85" },
                  ].map((bar, idx) => (
                    <motion.div
                      key={idx}
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
                      className={cn("w-4 rounded-t-sm", bar.cls)}
                    />
                  ))}
                </div>
              </div>
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
                floatingSurface,
              )}
            >
              <p className="text-[9.5px] font-semibold text-center">
                Advertising Platform
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                {/* Facebook */}
                <span className="flex size-6 items-center justify-center rounded-md bg-[#1877F2] text-white text-[12px] font-bold">
                  f
                </span>
                {/* Instagram */}
                <span className="flex size-6 items-center justify-center rounded-md bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white">
                  <svg viewBox="0 0 24 24" className="size-3.5 stroke-current fill-none" strokeWidth="2" aria-hidden>
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-none" />
                  </svg>
                </span>
                {/* Twitter */}
                <span className="flex size-6 items-center justify-center rounded-md bg-[#1DA1F2] text-white">
                  <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
                    <path d="M22 5.9a8.2 8.2 0 0 1-2.36.65 4.12 4.12 0 0 0 1.8-2.27 8.2 8.2 0 0 1-2.6 1 4.1 4.1 0 0 0-7 3.74A11.64 11.64 0 0 1 3.4 4.7a4.1 4.1 0 0 0 1.27 5.47 4.07 4.07 0 0 1-1.86-.51v.05a4.1 4.1 0 0 0 3.29 4.02 4.1 4.1 0 0 1-1.85.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 2 18.4a11.62 11.62 0 0 0 6.29 1.84c7.55 0 11.68-6.25 11.68-11.67 0-.18 0-.35-.01-.53A8.34 8.34 0 0 0 22 5.9Z" />
                  </svg>
                </span>
                {/* TikTok */}
                <span className="flex size-6 items-center justify-center rounded-md bg-zinc-950 text-white">
                  <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
                    <path d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48Z" />
                  </svg>
                </span>
                {/* Gmail */}
                <span className="flex size-6 items-center justify-center rounded-md bg-white border border-zinc-200 text-[#EA4335]">
                  <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
                  </svg>
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Heading + Subtitle + 4 Interactive Pill Cards */}
          <div className="@lg:col-span-6">
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
                  isDark ? "text-zinc-400" : "text-zinc-500",
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
                      "flex w-full items-center gap-3 rounded-full border px-4 py-3 text-left text-[12.5px] @sm:text-[13px] transition-all cursor-pointer",
                      isSelected
                        ? isDark
                          ? "border-white/15 bg-white/[0.06] font-medium text-white shadow-sm"
                          : "border-zinc-200 bg-white font-medium text-zinc-900 shadow-[0_6px_20px_rgb(0_0_0/0.04)]"
                        : isDark
                          ? "border-white/[0.08] bg-white/[0.02] text-zinc-300 hover:bg-white/[0.04]"
                          : "border-zinc-100 bg-white text-zinc-700 hover:border-zinc-200",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-full transition-colors",
                        isSelected
                          ? "bg-rose-500 text-white"
                          : isDark
                            ? "border border-white/15 bg-white/5"
                            : "border border-zinc-200 bg-zinc-50",
                      )}
                    >
                      {isSelected && <Check className="size-3 stroke-[2.5]" />}
                    </span>
                    <span>{item}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
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
          "One landing page with four core sections designed for both light and dark themes.",
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
