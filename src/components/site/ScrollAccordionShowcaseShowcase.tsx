"use client";

import {
  AccordionShowcaseItem,
  ScrollAccordionShowcase,
} from "@/components/custom/blocks/ScrollAccordionShowcaseBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";

// --- TYPESCRIPT ENGINE CODE ---
const ACCORDION_CODE_TS = `"use client";

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
    return \`rgba(\${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",")},\${alpha})\`;
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
    ref
  ) => {
    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    const [accentColor, setAccentColor] = useState<string>(defaultAccentColor);
    
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const gridRef = useRef<HTMLDivElement>(null);
    const stickyCardRef = useRef<HTMLDivElement>(null);
    const activeIndexRef = useRef(defaultIndex);
    const isClickScrolling = useRef(false);
    const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      activeIndexRef.current = activeIndex;
    }, [activeIndex]);

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
                /#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b/
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
          } catch (e) {}
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
                  const match = val.match(
                    /#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b/
                  );
                  if (match) {
                    foundColor = match[0];
                    break;
                  }
                }
              }
            }
          } catch (e) {}
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
          } catch (e) {}
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

    useEffect(() => {
      if (typeof window === "undefined") return;

      let rafId: number;
      const updateEngine = () => {
        if (gridRef.current && stickyCardRef.current && displayMode !== "text-only") {
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
              stickyCardRef.current.style.transform = \`translate3d(0, \${bounded}px, 0)\`;
            } else {
              stickyCardRef.current.style.position = "";
              stickyCardRef.current.style.transform = "translate3d(0, 0, 0)";
            }
          }
        }

        if (displayMode !== "image-only" && !isClickScrolling.current && window.innerWidth >= 1024) {
          const scroller = scrollerRef?.current;
          const focalLine = scroller
            ? scroller.getBoundingClientRect().top + scroller.clientHeight * 0.42
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
      targetScroller.addEventListener("scroll", handleScroll, { passive: true });
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
          className
        )}
        {...props}
      >
        {displayMode === "image-only" && (
          <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 sm:pb-6 mb-4 sm:mb-8 border-b border-zinc-200 dark:border-white/10 no-scrollbar px-1">
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
                      : "bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-white/20"
                  )}
                >
                  <span>{item.stepNumber}</span>
                  <span className="truncate max-w-[120px] sm:max-w-[140px]">{item.title}</span>
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
            displayMode === "image-only" && "max-w-5xl mx-auto"
          )}
        >
          {displayMode !== "image-only" && (
            <div
              className={cn(
                "w-full flex flex-col gap-4 sm:gap-6",
                displayMode === "both" ? "lg:col-span-6" : "w-full"
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
                          ? \`0 20px 40px -15px \${hexToRgba(accentColor, 0.15)}\`
                          : undefined,
                      }}
                      className={cn(
                        "group relative flex flex-col justify-between p-5 sm:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-500 cursor-pointer overflow-hidden bg-white dark:bg-zinc-900/80 outline-none",
                        isActive
                          ? "shadow-2xl ring-1 ring-black/5 dark:ring-white/5"
                          : "border-zinc-200/80 dark:border-white/10 opacity-85 hover:opacity-100 hover:border-zinc-300 dark:hover:border-white/20"
                      )}
                    >
                      {isActive && (
                        <div
                          style={{ backgroundColor: activeBgGlow }}
                          className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-colors duration-500"
                        />
                      )}
                      
                      <div className="flex items-start sm:items-center justify-between gap-4 z-10">
                        <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
                          <span
                            style={{
                              backgroundColor: isActive ? activeBadgeBg : undefined,
                              borderColor: isActive ? activeBadgeBorder : undefined,
                              color: isActive ? accentColor : undefined,
                            }}
                            className={cn(
                              "font-mono text-xs sm:text-sm font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border transition-all duration-300 shrink-0 mt-0.5 sm:mt-0",
                              !isActive && "bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400"
                            )}
                          >
                            {item.stepNumber}
                          </span>
                          <h3
                            className={cn(
                              "text-base sm:text-2xl font-bold tracking-tight transition-colors duration-300 leading-snug sm:leading-tight",
                              isActive
                                ? "text-zinc-900 dark:text-white"
                                : "text-zinc-600 dark:text-zinc-400"
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
                              : "bg-zinc-100 dark:bg-white/5 text-zinc-400 dark:text-zinc-500 -rotate-45 group-hover:bg-zinc-200 dark:group-hover:bg-white/10 group-hover:text-zinc-700 dark:group-hover:text-zinc-200"
                          )}
                        >
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                        </div>
                      </div>

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
                            <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-zinc-100 dark:border-white/10 flex flex-col gap-4 sm:gap-6">
                              {displayMode === "both" && (
                                <div className="block lg:hidden w-full relative rounded-xl overflow-hidden aspect-[16/10] border border-zinc-200/80 dark:border-white/10 shadow-sm mt-2">
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover object-top"
                                  />
                                </div>
                              )}
                              <p className="text-zinc-600 dark:text-zinc-300 text-[13px] sm:text-base leading-relaxed">
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

          {displayMode !== "text-only" && (
            <div
              className={cn(
                "w-full",
                displayMode === "both" ? "hidden lg:block lg:col-span-6" : "w-full"
              )}
            >
              <div
                ref={stickyCardRef}
                className={cn(
                  "z-20 transition-transform duration-75 ease-out",
                  displayMode === "both" && "lg:sticky lg:top-28 pt-2 lg:pt-0"
                )}
              >
                <div
                  className={cn(
                    "relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200/80 dark:border-white/10 bg-zinc-100 dark:bg-zinc-950 shadow-2xl transition-all duration-300",
                    displayMode === "both"
                      ? "aspect-[16/11]"
                      : "aspect-video md:aspect-[16/9]"
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
                    <div className="flex flex-col gap-1 sm:gap-1.5 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 shadow-2xl max-w-sm">
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
                          className="text-sm sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight leading-snug truncate"
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
  }
);

ScrollAccordionShowcase.displayName = "ScrollAccordionShowcase";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const ACCORDION_CODE_JS = `"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

function hexToRgba(hex, alpha) {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    c = "0x" + c.join("");
    return \`rgba(\${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",")},\${alpha})\`;
  }
  return hex;
}

export const ScrollAccordionShowcase = React.forwardRef(
  (
    {
      items = [],
      defaultIndex = 0,
      displayMode = "both",
      localStorageKey = "primaryColor",
      defaultAccentColor = "#FFAB1D",
      scrollerRef,
      className,
      ...props
    },
    ref
  ) => {
    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    const [accentColor, setAccentColor] = useState(defaultAccentColor);
    
    const itemRefs = useRef([]);
    const gridRef = useRef(null);
    const stickyCardRef = useRef(null);
    const activeIndexRef = useRef(defaultIndex);
    const isClickScrolling = useRef(false);
    const clickTimeoutRef = useRef(null);

    useEffect(() => {
      activeIndexRef.current = activeIndex;
    }, [activeIndex]);

    useEffect(() => {
      if (typeof window === "undefined") return;

      const loadColor = () => {
        let foundColor = null;
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
                /#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b/
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
          } catch (e) {}
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
                  const match = val.match(
                    /#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b/
                  );
                  if (match) {
                    foundColor = match[0];
                    break;
                  }
                }
              }
            }
          } catch (e) {}
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
          } catch (e) {}
        }

        const targetColor = foundColor || defaultAccentColor;
        setAccentColor((prev) => (prev !== targetColor ? targetColor : prev));
      };

      loadColor();

      const origProtoSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = function (key, value) {
        origProtoSetItem.apply(this, [key, value]);
        loadColor();
      };
      const origInstanceSetItem = window.localStorage.setItem;
      window.localStorage.setItem = function (key, value) {
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

    useEffect(() => {
      if (typeof window === "undefined") return;

      let rafId;
      const updateEngine = () => {
        if (gridRef.current && stickyCardRef.current && displayMode !== "text-only") {
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
              stickyCardRef.current.style.transform = \`translate3d(0, \${bounded}px, 0)\`;
            } else {
              stickyCardRef.current.style.position = "";
              stickyCardRef.current.style.transform = "translate3d(0, 0, 0)";
            }
          }
        }

        if (displayMode !== "image-only" && !isClickScrolling.current && window.innerWidth >= 1024) {
          const scroller = scrollerRef?.current;
          const focalLine = scroller
            ? scroller.getBoundingClientRect().top + scroller.clientHeight * 0.42
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
      targetScroller.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleScroll, { passive: true });
      
      updateEngine();
      const interval = setInterval(updateEngine, 100);

      return () => {
        targetScroller.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
        cancelAnimationFrame(rafId);
        clearInterval(interval);
        if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      };
    }, [displayMode, items, scrollerRef]);

    const handleCardClick = (index) => {
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
          className
        )}
        {...props}
      >
        {displayMode === "image-only" && (
          <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 sm:pb-6 mb-4 sm:mb-8 border-b border-zinc-200 dark:border-white/10 no-scrollbar px-1">
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
                      : "bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-white/20"
                  )}
                >
                  <span>{item.stepNumber}</span>
                  <span className="truncate max-w-[120px] sm:max-w-[140px]">{item.title}</span>
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
            displayMode === "image-only" && "max-w-5xl mx-auto"
          )}
        >
          {displayMode !== "image-only" && (
            <div
              className={cn(
                "w-full flex flex-col gap-4 sm:gap-6",
                displayMode === "both" ? "lg:col-span-6" : "w-full"
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
                          ? \`0 20px 40px -15px \${hexToRgba(accentColor, 0.15)}\`
                          : undefined,
                      }}
                      className={cn(
                        "group relative flex flex-col justify-between p-5 sm:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-500 cursor-pointer overflow-hidden bg-white dark:bg-zinc-900/80 outline-none",
                        isActive
                          ? "shadow-2xl ring-1 ring-black/5 dark:ring-white/5"
                          : "border-zinc-200/80 dark:border-white/10 opacity-85 hover:opacity-100 hover:border-zinc-300 dark:hover:border-white/20"
                      )}
                    >
                      {isActive && (
                        <div
                          style={{ backgroundColor: activeBgGlow }}
                          className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-colors duration-500"
                        />
                      )}
                      
                      <div className="flex items-start sm:items-center justify-between gap-4 z-10">
                        <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
                          <span
                            style={{
                              backgroundColor: isActive ? activeBadgeBg : undefined,
                              borderColor: isActive ? activeBadgeBorder : undefined,
                              color: isActive ? accentColor : undefined,
                            }}
                            className={cn(
                              "font-mono text-xs sm:text-sm font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border transition-all duration-300 shrink-0 mt-0.5 sm:mt-0",
                              !isActive && "bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400"
                            )}
                          >
                            {item.stepNumber}
                          </span>
                          <h3
                            className={cn(
                              "text-base sm:text-2xl font-bold tracking-tight transition-colors duration-300 leading-snug sm:leading-tight",
                              isActive
                                ? "text-zinc-900 dark:text-white"
                                : "text-zinc-600 dark:text-zinc-400"
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
                              : "bg-zinc-100 dark:bg-white/5 text-zinc-400 dark:text-zinc-500 -rotate-45 group-hover:bg-zinc-200 dark:group-hover:bg-white/10 group-hover:text-zinc-700 dark:group-hover:text-zinc-200"
                          )}
                        >
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                        </div>
                      </div>

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
                            <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-zinc-100 dark:border-white/10 flex flex-col gap-4 sm:gap-6">
                              {displayMode === "both" && (
                                <div className="block lg:hidden w-full relative rounded-xl overflow-hidden aspect-[16/10] border border-zinc-200/80 dark:border-white/10 shadow-sm mt-2">
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover object-top"
                                  />
                                </div>
                              )}
                              <p className="text-zinc-600 dark:text-zinc-300 text-[13px] sm:text-base leading-relaxed">
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

          {displayMode !== "text-only" && (
            <div
              className={cn(
                "w-full",
                displayMode === "both" ? "hidden lg:block lg:col-span-6" : "w-full"
              )}
            >
              <div
                ref={stickyCardRef}
                className={cn(
                  "z-20 transition-transform duration-75 ease-out",
                  displayMode === "both" && "lg:sticky lg:top-28 pt-2 lg:pt-0"
                )}
              >
                <div
                  className={cn(
                    "relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200/80 dark:border-white/10 bg-zinc-100 dark:bg-zinc-950 shadow-2xl transition-all duration-300",
                    displayMode === "both"
                      ? "aspect-[16/11]"
                      : "aspect-video md:aspect-[16/9]"
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
                    <div className="flex flex-col gap-1 sm:gap-1.5 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 shadow-2xl max-w-sm">
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
                          className="text-sm sm:text-lg font-bold text-zinc-900 dark:text-white tracking-tight leading-snug truncate"
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
  }
);

ScrollAccordionShowcase.displayName = "ScrollAccordionShowcase";`;

export function ScrollAccordionShowcaseShowcase() {
  const showcaseItems: AccordionShowcaseItem[] = [
    {
      id: "landing-page",
      stepNumber: "01",
      title: "Landing Page Design",
      description:
        "Most landing pages fail quietly. Traffic comes in, nothing happens, and budgets burn. We engineer high-converting layouts with strategic visual hierarchy and micro-interactions.",
      tags: [
        "CONVERSION FOCUSED DESIGN",
        "FIGMA TO CODE CONVERSION",
        "MOBILE FIRST RESPONSIVE",
      ],
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      badgeText: "SELECTED SERVICE",
    },
    {
      id: "saas-dev",
      stepNumber: "02",
      title: "SaaS Product Development",
      description:
        "Modular, multi-tenant web applications designed to scale from your first 1,000 users to millions of daily requests without refactoring your core backend architecture.",
      tags: [
        "MULTI-TENANT ARCHITECTURE",
        "REAL-TIME SYNC",
        "EDGE COMPUTED API",
      ],
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      badgeText: "SELECTED SERVICE",
    },
    {
      id: "ai-product",
      stepNumber: "03",
      title: "AI Product Development",
      description:
        "Building an AI product is not about plugging in an API and hoping for the best. We build custom retrieval pipelines, fine-tuned models, and intuitive streaming UI interfaces.",
      tags: [
        "CUSTOM RAG PIPELINES",
        "STREAMING RESPONSES",
        "VECTOR DATABASE SETUP",
      ],
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
      badgeText: "SELECTED SERVICE",
    },
    {
      id: "web-app",
      stepNumber: "04",
      title: "Web App Development",
      description:
        "There is a massive difference between a static website and a mission-critical web application. We deliver complex dashboards, data tables, and secure portal architectures.",
      tags: [
        "SERVER-SIDE RENDERING",
        "ROLE-BASED ACCESS CONTROL",
        "REAL-TIME NOTIFICATIONS",
      ],
      image:
        "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1200&auto=format&fit=crop",
      badgeText: "SELECTED SERVICE",
    },
  ];

  const generateUsageCode = () => {
    return `import { ScrollAccordionShowcase } from "@/components/custom/blocks/ScrollAccordionShowcaseBlock";

export default function ServicesSection() {
  const items = [
    {
      id: "landing",
      stepNumber: "01",
      title: "Landing Page Design",
      description: "We engineer high-converting layouts with scroll-triggered animations.",
      tags: ["CONVERSION FOCUSED", "FIGMA TO CODE"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      badgeText: "SELECTED SERVICE",
    },
    {
      id: "saas",
      stepNumber: "02",
      title: "SaaS Development",
      description: "Modular, multi-tenant web applications designed to scale to millions of requests.",
      tags: ["MULTI-TENANT ARCHITECTURE", "REAL-TIME SYNC"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      badgeText: "SELECTED SERVICE",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-20 px-6">
      <ScrollAccordionShowcase
        items={items}
        displayMode="both"
        defaultAccentColor="#FFAB1D"
        localStorageKey="primaryColor"
      />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      <div className="flex flex-col gap-4 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl z-0 relative">
        <p className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
          A scroll-driven interactive narrative section featuring an adaptive
          layout. On desktop, it utilizes a{" "}
          <strong>60fps direct-DOM focal-line scroll engine</strong> for smooth
          sticky tracking. On narrow mobile viewports, the auto-scroll observer
          intelligently disables and inline images are rendered seamlessly
          within the accordion bodies to prevent jarring layout shifts.
        </p>
      </div>

      <ComponentPreview
        name="ScrollAccordionShowcaseBlock"
        tsCode={ACCORDION_CODE_TS}
        jsCode={ACCORDION_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
      >
        <div className="w-full bg-zinc-50 dark:bg-[#0a0a0a] py-8 px-2 sm:px-8 relative rounded-3xl border border-zinc-200 dark:border-white/10 transition-colors duration-300">
          <ScrollAccordionShowcase
            items={showcaseItems}
            displayMode="both"
            defaultAccentColor="#FFAB1D"
            localStorageKey="primaryColor"
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
