"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export interface AccordionShowcaseItem {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  tags?: string[];
  image: string;
  badgeText?: string;
}

export type ShowcaseDisplayMode = "both" | "text-only" | "image-only";

export interface ScrollAccordionShowcaseProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: AccordionShowcaseItem[];
  defaultIndex?: number;
  displayMode?: ShowcaseDisplayMode;
  localStorageKey?: string;
  defaultAccentColor?: string;
  scrollerRef?: React.RefObject<HTMLElement | null>;
}

function hexToRgba(hex: string, alpha: number): string {
  let c: any;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    c = "0x" + c.join("");
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",")},${alpha})`;
  }
  return hex;
}

export const ScrollAccordionShowcase = React.forwardRef<
  HTMLDivElement,
  ScrollAccordionShowcaseProps
>(
  (
    {
      items,
      defaultIndex = 0,
      displayMode = "both",
      localStorageKey = "primaryColor",
      defaultAccentColor = "#FFAB1D",
      scrollerRef,
      className,
      ...props
    },
    ref,
  ) => {
    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    const [accentColor, setAccentColor] = useState<string>(defaultAccentColor);

    // Refs for precision scroll tracking and animation lockout
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const gridRef = useRef<HTMLDivElement>(null);
    const stickyCardRef = useRef<HTMLDivElement>(null);
    const activeIndexRef = useRef(defaultIndex);
    const isClickScrolling = useRef(false);
    const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
      activeIndexRef.current = activeIndex;
    }, [activeIndex]);

    // 1. Instant 0ms LocalStorage & Theme Sync Engine
    useEffect(() => {
      if (typeof window === "undefined") return;

      const loadColor = () => {
        let foundColor: string | null = null;
        const knownKeys = [
          localStorageKey,
          "primaryColor",
          "docs-theme-color",
          "theme-color",
          "accentColor",
          "color",
          "theme",
          "primary-color",
        ];

        for (const k of knownKeys) {
          if (!k) continue;
          try {
            const val = localStorage.getItem(k);
            if (val) {
              const cleaned = val.replace(/['"]/g, "").trim();
              const hexMatch = cleaned.match(
                /#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b/,
              );
              if (hexMatch) {
                foundColor = hexMatch[0];
                break;
              }
              if (/^(rgb|hsl)a?\(/i.test(cleaned)) {
                foundColor = cleaned;
                break;
              }
            }
          } catch {}
        }

        if (!foundColor && typeof localStorage !== "undefined") {
          try {
            for (let i = 0; i < localStorage.length; i++) {
              const k = localStorage.key(i);
              if (
                k &&
                (k.toLowerCase().includes("color") ||
                  k.toLowerCase().includes("theme") ||
                  k.toLowerCase().includes("primary"))
              ) {
                const val = localStorage.getItem(k);
                if (val) {
                  const match = val.match(/#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b/);
                  if (match) {
                    foundColor = match[0];
                    break;
                  }
                }
              }
            }
          } catch {}
        }

        if (!foundColor && typeof document !== "undefined") {
          try {
            const computed = getComputedStyle(document.documentElement);
            const cssVar =
              computed.getPropertyValue("--primary-color") ||
              computed.getPropertyValue("--primary") ||
              computed.getPropertyValue("--theme-color");
            if (cssVar && cssVar.trim()) {
              const trimmed = cssVar.trim();
              if (
                /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(trimmed) ||
                /^(rgb|hsl)a?\(/i.test(trimmed)
              ) {
                foundColor = trimmed;
              }
            }
          } catch {}
        }

        const targetColor = foundColor || defaultAccentColor;
        setAccentColor((prev) => (prev !== targetColor ? targetColor : prev));
      };

      loadColor();

      const origProtoSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = function (key: string, value: string) {
        origProtoSetItem.apply(this, [key, value]);
        loadColor();
      };
      const origInstanceSetItem = window.localStorage.setItem;
      window.localStorage.setItem = function (key: string, value: string) {
        origInstanceSetItem.apply(window.localStorage, [key, value]);
        loadColor();
      };

      const observer = new MutationObserver(loadColor);
      if (typeof document !== "undefined") {
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["style", "class", "data-theme", "data-color"],
        });
      }

      window.addEventListener("storage", loadColor);
      window.addEventListener("theme-color-change", loadColor);
      const intervalId = setInterval(loadColor, 50);

      return () => {
        Storage.prototype.setItem = origProtoSetItem;
        window.localStorage.setItem = origInstanceSetItem;
        observer.disconnect();
        window.removeEventListener("storage", loadColor);
        window.removeEventListener("theme-color-change", loadColor);
        clearInterval(intervalId);
      };
    }, [localStorageKey, defaultAccentColor]);

    // 2. Unified 60fps Scroll Engine (Sticky Mockup Pinning + Precision Focal-Line Step Tracking)
    useEffect(() => {
      if (typeof window === "undefined") return;

      let rafId: number;
      const updateEngine = () => {
        // A. Handle Sticky Mockup Pinning
        if (
          gridRef.current &&
          stickyCardRef.current &&
          displayMode !== "text-only"
        ) {
          if (window.innerWidth < 1024) {
            stickyCardRef.current.style.transform = "translate3d(0, 0, 0)";
            stickyCardRef.current.style.position = "";
          } else {
            const gridRect = gridRef.current.getBoundingClientRect();
            const cardHeight = stickyCardRef.current.offsetHeight;
            const gridHeight = gridRef.current.offsetHeight;
            const topOffset = 112;

            if (gridRect.top < topOffset) {
              const rawOffset = topOffset - gridRect.top;
              const maxTranslate = Math.max(0, gridHeight - cardHeight);
              const bounded = Math.min(rawOffset, maxTranslate);
              stickyCardRef.current.style.position = "relative";
              stickyCardRef.current.style.transform = `translate3d(0, ${bounded}px, 0)`;
            } else {
              stickyCardRef.current.style.position = "";
              stickyCardRef.current.style.transform = "translate3d(0, 0, 0)";
            }
          }
        }

        // B. Precision Focal-Line Step Tracking (Only on Desktop to prevent mobile layout shifts)
        if (
          displayMode !== "image-only" &&
          !isClickScrolling.current &&
          window.innerWidth >= 1024
        ) {
          const scroller = scrollerRef?.current;
          const focalLine = scroller
            ? scroller.getBoundingClientRect().top +
              scroller.clientHeight * 0.42
            : window.innerHeight * 0.42;

          let newIndex = 0;
          for (let i = 0; i < itemRefs.current.length; i++) {
            const el = itemRefs.current[i];
            if (!el) continue;
            const rect = el.getBoundingClientRect();
            if (rect.top <= focalLine || i === 0) {
              newIndex = i;
            } else {
              break;
            }
          }

          if (newIndex !== activeIndexRef.current) {
            activeIndexRef.current = newIndex;
            setActiveIndex(newIndex);
          }
        }
      };

      const handleScroll = () => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(updateEngine);
      };

      const targetScroller = scrollerRef?.current || window;
      targetScroller.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      window.addEventListener("resize", handleScroll, { passive: true });

      updateEngine();
      const interval = setInterval(updateEngine, 100);

      return () => {
        targetScroller.removeEventListener("scroll", handleScroll as any);
        window.removeEventListener("resize", handleScroll);
        cancelAnimationFrame(rafId);
        clearInterval(interval);
        if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      };
    }, [displayMode, items, scrollerRef]);

    const handleCardClick = (index: number) => {
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      isClickScrolling.current = true;
      activeIndexRef.current = index;
      setActiveIndex(index);

      itemRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      clickTimeoutRef.current = setTimeout(() => {
        isClickScrolling.current = false;
      }, 700);
    };

    const activeItem = items[activeIndex] || items[0] || {};
    const activeBgGlow = hexToRgba(accentColor, 0.12);
    const activeBadgeBg = hexToRgba(accentColor, 0.1);
    const activeBadgeBorder = hexToRgba(accentColor, 0.3);

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16 select-none transition-colors duration-300",
          className,
        )}
        {...props}
      >
        {displayMode === "image-only" && (
          <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 sm:pb-6 mb-4 sm:mb-8 border-b border-border no-scrollbar px-1">
            {items.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={item.id}
                  onClick={() => handleCardClick(index)}
                  style={{
                    backgroundColor: isActive ? activeBadgeBg : undefined,
                    borderColor: isActive ? accentColor : undefined,
                    color: isActive ? accentColor : undefined,
                  }}
                  className={cn(
                    "inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-mono font-bold uppercase transition-all duration-300 border shrink-0 cursor-pointer outline-none",
                    isActive
                      ? "shadow-sm scale-105"
                      : "bg-muted dark:bg-white/5 border-border text-muted-foreground hover:border-border",
                  )}
                >
                  <span>{item.stepNumber}</span>
                  <span className="truncate max-w-[120px] sm:max-w-[140px]">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        <div
          ref={gridRef}
          className={cn(
            "flex flex-col gap-6 sm:gap-12 relative",
            displayMode === "both" &&
              "lg:grid lg:grid-cols-12 lg:gap-16 items-start lg:items-stretch",
            displayMode === "text-only" && "max-w-4xl mx-auto",
            displayMode === "image-only" && "max-w-5xl mx-auto",
          )}
        >
          {/* LEFT COLUMN: TEXT ACCORDIONS */}
          {displayMode !== "image-only" && (
            <div
              className={cn(
                "w-full flex flex-col gap-4 sm:gap-6",
                displayMode === "both" ? "lg:col-span-6" : "w-full",
              )}
            >
              {items.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <div
                    key={item.id}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    className="py-1 scroll-mt-24 transition-all duration-300"
                  >
                    <div
                      onClick={() => handleCardClick(index)}
                      style={{
                        borderColor: isActive ? accentColor : undefined,
                        boxShadow: isActive
                          ? `0 20px 40px -15px ${hexToRgba(accentColor, 0.15)}`
                          : undefined,
                      }}
                      className={cn(
                        "group relative flex flex-col justify-between p-5 sm:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-500 cursor-pointer overflow-hidden bg-card outline-none",
                        isActive
                          ? "shadow-2xl ring-1 ring-black/5 dark:ring-white/5"
                          : "border-border/80 opacity-85 hover:opacity-100 hover:border-border",
                      )}
                    >
                      {isActive && (
                        <div
                          style={{ backgroundColor: activeBgGlow }}
                          className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-colors duration-500"
                        />
                      )}

                      {/* Accordion Header */}
                      <div className="flex items-start sm:items-center justify-between gap-4 z-10">
                        <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
                          <span
                            style={{
                              backgroundColor: isActive
                                ? activeBadgeBg
                                : undefined,
                              borderColor: isActive
                                ? activeBadgeBorder
                                : undefined,
                              color: isActive ? accentColor : undefined,
                            }}
                            className={cn(
                              "font-mono text-xs sm:text-sm font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border transition-all duration-300 shrink-0 mt-0.5 sm:mt-0",
                              !isActive &&
                                "bg-muted dark:bg-white/5 border-border text-muted-foreground",
                            )}
                          >
                            {item.stepNumber}
                          </span>
                          <h3
                            className={cn(
                              "text-base sm:text-2xl font-bold tracking-tight transition-colors duration-300 leading-snug sm:leading-tight",
                              isActive
                                ? "text-foreground"
                                : "text-muted-foreground",
                            )}
                          >
                            {item.title}
                          </h3>
                        </div>
                        <div
                          style={{
                            backgroundColor: isActive ? accentColor : undefined,
                            color: isActive ? "#000000" : undefined,
                          }}
                          className={cn(
                            "w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 mt-0.5 sm:mt-0 self-start sm:self-center",
                            isActive
                              ? "rotate-0 shadow-md font-bold"
                              : "bg-muted dark:bg-white/5 text-muted-foreground -rotate-45 group-hover:bg-muted dark:group-hover:bg-white/10 group-hover:text-foreground",
                          )}
                        >
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                        </div>
                      </div>

                      {/* Accordion Body */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.35,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="overflow-hidden z-10"
                          >
                            <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-border flex flex-col gap-4 sm:gap-6">
                              {/* Inline Mobile Image for 'both' mode */}
                              {displayMode === "both" && (
                                <div className="block lg:hidden w-full relative rounded-xl overflow-hidden aspect-[16/10] border border-border/80 shadow-sm mt-2">
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover object-top"
                                  />
                                </div>
                              )}
                              <p className="text-muted-foreground text-[13px] sm:text-base leading-relaxed">
                                {item.description}
                              </p>
                              {item.tags && item.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                                  {item.tags.map((tag, tagIdx) => (
                                    <span
                                      key={tagIdx}
                                      style={{
                                        backgroundColor: activeBadgeBg,
                                        borderColor: activeBadgeBorder,
                                        color: accentColor,
                                      }}
                                      className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border transition-colors duration-300"
                                    >
                                      <CheckCircle2
                                        style={{ color: accentColor }}
                                        className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                                      />
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* RIGHT COLUMN: STICKY DESKTOP IMAGE */}
          {displayMode !== "text-only" && (
            <div
              className={cn(
                "w-full",
                // Hide completely on mobile if displayMode is both (it's rendered inline above)
                displayMode === "both"
                  ? "hidden lg:block lg:col-span-6"
                  : "w-full",
              )}
            >
              <div
                ref={stickyCardRef}
                className={cn(
                  "z-20 transition-transform duration-75 ease-out",
                  displayMode === "both" && "lg:sticky lg:top-28 pt-2 lg:pt-0",
                )}
              >
                <div
                  className={cn(
                    "relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-border/80 bg-muted shadow-2xl transition-all duration-300",
                    displayMode === "both"
                      ? "aspect-[16/11]"
                      : "aspect-video md:aspect-[16/9]",
                  )}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeItem.id || "default"}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img
                        src={activeItem.image}
                        alt={activeItem.title}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent dark:from-black/90" />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-10 flex items-end justify-between pointer-events-none">
                    <div className="flex flex-col gap-1 sm:gap-1.5 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-border/80 shadow-2xl max-w-sm">
                      <div className="inline-flex items-center gap-2">
                        <Sparkles
                          style={{ color: accentColor }}
                          className="w-3.5 h-3.5 animate-pulse"
                        />
                        <span
                          style={{ color: accentColor }}
                          className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest"
                        >
                          {activeItem.badgeText || "Selected Service"}
                        </span>
                      </div>
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={activeItem.title || "default-title"}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                          className="text-sm sm:text-lg font-bold text-foreground tracking-tight leading-snug truncate"
                        >
                          {activeItem.title}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);

ScrollAccordionShowcase.displayName = "ScrollAccordionShowcase";
