"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface ModernScrollStackItem {
  id: string;
  title: string;
  description: string;
  /** Card background color (CSS color value, e.g. "#F6F3EE"). */
  bgColor?: string;
  /** Card text and icon color (CSS color value, e.g. "#3E2718"). */
  textColor?: string;
  /** Custom icon node rendered in the top-left corner. */
  icon?: React.ReactNode;
  /** Optional image URL rendered in the top-left corner if provided. */
  image?: string;
  /** Target resting tilt in degrees when the card locks into the stack. */
  rotation?: number;
}

export interface ModernScrollStackProps {
  /** Array of cards to stack on scroll. Defaults to the 4 Demo 1 service cards. */
  items?: ModernScrollStackItem[];
  /** Small uppercase eyebrow label above the section heading. */
  eyebrow?: string;
  /** Main section heading. */
  heading?: string;
  /** Section description text below the heading. */
  subheading?: string;
  /** Show or hide the section header block. */
  showHeader?: boolean;
  /** Horizontal offset step (in px) between consecutive stacked cards on desktop. */
  cardOffsetX?: number;
  /** Vertical spacing (in px) between cards before they stack. */
  cardGap?: number;
  /** Sticky top position (in px) where cards lock into the stack. */
  stickyTop?: number;
  /** Card width (in px) on desktop screens. */
  cardWidth?: number;
  /** Card height (in px) on desktop screens. */
  cardHeight?: number;
  /** Optional scroll container ref when embedded inside a scrollable box. */
  scrollerRef?: React.RefObject<HTMLElement | null>;
  /** Additional classes for the root section. */
  className?: string;
}

// ==========================================
// CUSTOM VECTOR CARD ICONS
// ==========================================

function AiAutomationIcon() {
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Central AI processor core */}
      <rect x="14" y="14" width="18" height="18" rx="4" />
      <path d="M23 19l1.4 2.6L27 23l-2.6 1.4L23 27l-1.4-2.6L19 23l2.6-1.4L23 19z" />
      {/* Neural connector nodes */}
      <line x1="18" y1="6" x2="18" y2="14" />
      <circle cx="18" cy="5" r="2" />
      <line x1="28" y1="6" x2="28" y2="14" />
      <circle cx="28" cy="5" r="2" />
      <line x1="18" y1="32" x2="18" y2="40" />
      <circle cx="18" cy="41" r="2" />
      <line x1="28" y1="32" x2="28" y2="40" />
      <circle cx="28" cy="41" r="2" />
      <line x1="6" y1="18" x2="14" y2="18" />
      <circle cx="5" cy="18" r="2" />
      <line x1="6" y1="28" x2="14" y2="28" />
      <circle cx="5" cy="28" r="2" />
      <line x1="32" y1="18" x2="40" y2="18" />
      <circle cx="41" cy="18" r="2" />
      <line x1="32" y1="28" x2="40" y2="28" />
      <circle cx="41" cy="28" r="2" />
    </svg>
  );
}

function ProductStrategyIcon() {
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Outer compass ring */}
      <circle cx="23" cy="23" r="17" />
      {/* Cardinal tick marks */}
      <line x1="23" y1="6" x2="23" y2="10" />
      <line x1="23" y1="36" x2="23" y2="40" />
      <line x1="6" y1="23" x2="10" y2="23" />
      <line x1="36" y1="23" x2="40" y2="23" />
      {/* Precision navigation needle */}
      <polygon points="29,17 25,25 17,29 21,21" />
      <circle cx="23" cy="23" r="1.5" fill="currentColor" />
    </svg>
  );
}

function CloudArchitectureIcon() {
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Top isometric layer */}
      <polygon points="23,6 39,14.5 23,23 7,14.5" />
      {/* Middle isometric layer */}
      <polyline points="7,23 23,31.5 39,23" />
      {/* Bottom isometric layer */}
      <polyline points="7,31.5 23,40 39,31.5" />
      {/* Center vertical spine */}
      <line x1="23" y1="23" x2="23" y2="40" />
    </svg>
  );
}

function InteractiveMotionIcon() {
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Smooth bezier motion curve */}
      <path d="M8 36C14 36 16 10 23 23C30 36 32 10 38 10" />
      {/* Keyframe control handles */}
      <line x1="8" y1="36" x2="18" y2="36" strokeDasharray="2.5 2.5" />
      <line x1="38" y1="10" x2="28" y2="10" strokeDasharray="2.5 2.5" />
      {/* Anchor nodes */}
      <rect x="5" y="33" width="6" height="6" rx="1.5" />
      <rect x="35" y="7" width="6" height="6" rx="1.5" />
      <circle cx="23" cy="23" r="3.5" />
    </svg>
  );
}

export const DEFAULT_MODERN_SCROLL_STACK_ITEMS: ModernScrollStackItem[] = [
  {
    id: "ai-automation",
    title: "AI Automation",
    description:
      "Autonomous workflows that eliminate repetitive tasks and scale operations effortlessly",
    bgColor: "#F7C844",
    textColor: "#2B1C06",
    icon: <AiAutomationIcon />,
    rotation: 0,
  },
  {
    id: "product-strategy",
    title: "Product Strategy",
    description:
      "Data-backed roadmaps engineered to turn ambitious ideas into market-leading products",
    bgColor: "#EB5E30",
    textColor: "#FFFDF9",
    icon: <ProductStrategyIcon />,
    rotation: 3.5,
  },
  {
    id: "cloud-architecture",
    title: "Cloud Architecture",
    description:
      "Resilient, low-latency infrastructure built for global scale and zero-downtime deploys",
    bgColor: "#98E3AD",
    textColor: "#1A4325",
    icon: <CloudArchitectureIcon />,
    rotation: -4.5,
  },
  {
    id: "interactive-motion",
    title: "Interactive Motion",
    description:
      "Physics-driven micro-interactions and fluid transitions that make interfaces feel alive.",
    bgColor: "#4086D6",
    textColor: "#FFFFFF",
    icon: <InteractiveMotionIcon />,
    rotation: 3.5,
  },
];

const DEFAULT_ROTATIONS = [0, 3.5, -4.5, 3.5];

export function ModernScrollStack({
  items = DEFAULT_MODERN_SCROLL_STACK_ITEMS,
  eyebrow,
  heading,
  subheading,
  showHeader = false,
  cardOffsetX = 78,
  cardGap = 48,
  stickyTop = 72,
  cardWidth = 316,
  cardHeight = 376,
  scrollerRef,
  className,
}: ModernScrollStackProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentAnglesRef = useRef<number[]>([]);
  const currentXRef = useRef<number[]>([]);
  const [containerWidth, setContainerWidth] = useState<number>(1024);
  const [viewportHeight, setViewportHeight] = useState<number>(640);

  const count = items.length;

  // Measure available container width & viewport height so horizontal fan offset,
  // card size, and exact scroll termination adapt smoothly on all screens.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const scroller = scrollerRef?.current ?? null;
    const updateSize = () => {
      setContainerWidth(el.clientWidth || 1024);
      const vh = scroller
        ? scroller.clientHeight
        : typeof window !== "undefined"
          ? window.innerHeight
          : 640;
      setViewportHeight(vh || 640);
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    if (scroller) ro.observe(scroller);
    window.addEventListener("resize", updateSize, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, [scrollerRef]);

  const effectiveCardWidth = Math.min(
    cardWidth,
    Math.max(240, containerWidth - 64),
  );
  const effectiveCardHeight =
    effectiveCardWidth < cardWidth
      ? Math.round(cardHeight * (effectiveCardWidth / cardWidth))
      : cardHeight;

  const maxTotalSpread = Math.max(0, containerWidth - effectiveCardWidth - 32);
  const effectiveOffsetX =
    count > 1
      ? Math.min(cardOffsetX, Math.floor(maxTotalSpread / (count - 1)))
      : 0;

  // Distance Card 0 travels from the bottom of the viewport up to `stickyTop`
  const card0TravelDistance = Math.min(
    effectiveCardHeight + cardGap,
    Math.max(220, viewportHeight - stickyTop - 160),
  );
  const topSpacerHeight = stickyTop + card0TravelDistance;

  // Exact spacer inside the sticky content box so scrolling ends the exact
  // moment the last card reaches `stickyTop`, preventing cards from scrolling up.
  const endSpacerHeight = Math.max(
    0,
    viewportHeight - stickyTop - effectiveCardHeight,
  );

  // Smooth inertial scroll & damped rotation interpolation:
  // 1. Smooths discrete mousewheel steps on `scrollerRef` into a fluid glide.
  // 2. Smoothly interpolates each card's rotation angle via a damped RAF loop
  //    so cards tilt organically as they lock into `stickyTop`.
  useEffect(() => {
    const scroller = scrollerRef?.current ?? null;
    let transformRafId = 0;
    let wheelRafId = 0;
    let isWheelAnimating = false;
    let targetScrollTop = scroller ? scroller.scrollTop : 0;
    let currentScrollTop = targetScrollTop;

    if (currentAnglesRef.current.length !== count) {
      currentAnglesRef.current = new Array(count).fill(0);
    }
    if (currentXRef.current.length !== count) {
      currentXRef.current = new Array(count).fill(0);
    }

    const getCardProgress = (index: number, scrollerTop: number, startDistance: number) => {
      const wrapperEl = cardRefs.current[index];
      if (!wrapperEl) return 0;
      const rect = wrapperEl.getBoundingClientRect();
      const distanceFromSticky = rect.top - scrollerTop - stickyTop;
      const raw =
        startDistance > 0
          ? 1 - Math.min(1, Math.max(0, distanceFromSticky / startDistance))
          : 1;
      return raw < 0.5
        ? 4 * raw * raw * raw
        : 1 - Math.pow(-2 * raw + 2, 3) / 2;
    };

    const computeAndApplyTransforms = () => {
      const scrollerTop = scroller
        ? scroller.getBoundingClientRect().top
        : 0;
      const startDistance = effectiveCardHeight + cardGap;
      let needsMoreFrames = false;

      for (let i = 0; i < count; i++) {
        const innerEl = innerCardRefs.current[i];
        if (!innerEl) continue;

        const targetRotation =
          items[i]?.rotation ??
          DEFAULT_ROTATIONS[i % DEFAULT_ROTATIONS.length] ??
          0;

        const finalXOffset = (i - (count - 1) / 2) * effectiveOffsetX;

        // Every card (including Card 0) starts at the bottom in the center (x = 0, rotate = 0)
        // and glides into its target horizontal slot & tilt as it rises to `stickyTop`.
        const travelDist = i === 0 ? card0TravelDistance : startDistance;
        const eased = getCardProgress(i, scrollerTop, travelDist);

        const desiredX = eased * finalXOffset;
        const desiredAngle = eased * targetRotation;

        const prevX = currentXRef.current[i] ?? 0;
        const nextX = prevX + (desiredX - prevX) * 0.16;
        if (Math.abs(desiredX - nextX) > 0.05) {
          currentXRef.current[i] = nextX;
          needsMoreFrames = true;
        } else {
          currentXRef.current[i] = desiredX;
        }

        const prevAngle = currentAnglesRef.current[i] ?? 0;
        const nextAngle = prevAngle + (desiredAngle - prevAngle) * 0.16;
        if (Math.abs(desiredAngle - nextAngle) > 0.01) {
          currentAnglesRef.current[i] = nextAngle;
          needsMoreFrames = true;
        } else {
          currentAnglesRef.current[i] = desiredAngle;
        }

        innerEl.style.transform = `translate3d(${currentXRef.current[i].toFixed(2)}px, 0px, 0px) rotate(${currentAnglesRef.current[i].toFixed(3)}deg)`;
      }

      if (needsMoreFrames) {
        transformRafId = requestAnimationFrame(computeAndApplyTransforms);
      } else {
        transformRafId = 0;
      }
    };

    const scheduleTransformUpdate = () => {
      if (!transformRafId) {
        transformRafId = requestAnimationFrame(computeAndApplyTransforms);
      }
    };

    const stepWheelScroll = () => {
      if (!scroller) return;
      const diff = targetScrollTop - currentScrollTop;
      if (Math.abs(diff) > 0.4) {
        currentScrollTop += diff * 0.11;
        scroller.scrollTop = currentScrollTop;
        scheduleTransformUpdate();
        wheelRafId = requestAnimationFrame(stepWheelScroll);
      } else {
        currentScrollTop = targetScrollTop;
        scroller.scrollTop = targetScrollTop;
        isWheelAnimating = false;
        wheelRafId = 0;
        scheduleTransformUpdate();
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (!scroller) return;
      const maxScroll = scroller.scrollHeight - scroller.clientHeight;
      if (maxScroll <= 0) return;

      const delta =
        e.deltaMode === 1
          ? e.deltaY * 32
          : e.deltaMode === 2
            ? e.deltaY * scroller.clientHeight
            : e.deltaY;

      const atTop = scroller.scrollTop <= 0 && delta < 0;
      const atBottom = scroller.scrollTop >= maxScroll - 1 && delta > 0;
      if (atTop || atBottom) return;

      e.preventDefault();
      if (!isWheelAnimating) {
        currentScrollTop = scroller.scrollTop;
        targetScrollTop = currentScrollTop;
      }

      targetScrollTop = Math.max(
        0,
        Math.min(maxScroll, targetScrollTop + delta * 0.8),
      );

      if (!isWheelAnimating) {
        isWheelAnimating = true;
        wheelRafId = requestAnimationFrame(stepWheelScroll);
      }
    };

    const onScroll = () => {
      if (scroller && !isWheelAnimating) {
        currentScrollTop = scroller.scrollTop;
        targetScrollTop = currentScrollTop;
      }
      scheduleTransformUpdate();
    };

    computeAndApplyTransforms();

    const target: EventTarget = scroller ?? window;
    target.addEventListener("scroll", onScroll, { passive: true });
    if (scroller) {
      scroller.addEventListener("wheel", onWheel, { passive: false });
    }
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (transformRafId) cancelAnimationFrame(transformRafId);
      if (wheelRafId) cancelAnimationFrame(wheelRafId);
      target.removeEventListener("scroll", onScroll);
      if (scroller) {
        scroller.removeEventListener("wheel", onWheel);
      }
      window.removeEventListener("resize", onScroll);
    };
  }, [
    card0TravelDistance,
    cardGap,
    count,
    effectiveCardHeight,
    effectiveOffsetX,
    items,
    scrollerRef,
    stickyTop,
  ]);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative w-full pt-0 pb-0 px-4 sm:px-8 select-none",
        className,
      )}
    >
      {showHeader && (
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-2 pt-12 mb-10">
          {eyebrow && (
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#E85A34]">
              {eyebrow}
            </span>
          )}
          {heading && (
            <h2 className="text-2xl sm:text-[28px] font-bold tracking-[-0.02em] text-foreground leading-tight">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="text-[13.5px] sm:text-sm text-muted-foreground leading-relaxed max-w-xl mt-0.5">
              {subheading}
            </p>
          )}
        </div>
      )}

      {/* Tall sticky stacking track */}
      <div className="relative mx-auto flex flex-col items-center">
        <div
          aria-hidden="true"
          className="w-full shrink-0 pointer-events-none"
          style={{ height: `${topSpacerHeight}px` }}
        />
        {items.map((item, index) => {
          const bgColor = item.bgColor ?? "#F7C844";
          const textColor = item.textColor ?? "#2B1C06";

          return (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="sticky flex justify-center w-full pointer-events-none"
              style={{
                top: `${stickyTop}px`,
                marginTop: index === 0 ? "0px" : `${cardGap}px`,
                zIndex: index + 1,
              }}
            >
              <div
                ref={(el) => {
                  innerCardRefs.current[index] = el;
                }}
                className="pointer-events-auto rounded-[16px] p-8 sm:p-9 flex flex-col justify-between will-change-transform origin-center"
                style={{
                  width: `${effectiveCardWidth}px`,
                  height: `${effectiveCardHeight}px`,
                  backgroundColor: bgColor,
                  color: textColor,
                  transform: "translate3d(0px, 0px, 0px) rotate(0deg)",
                }}
              >
                {/* Top-left icon or image */}
                <div className="flex items-start justify-start">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-start">
                      {item.icon}
                    </div>
                  )}
                </div>

                {/* Bottom-left title & description */}
                <div className="flex flex-col gap-2.5 text-left">
                  <h3 className="text-[22px] sm:text-[25px] font-bold tracking-[-0.02em] leading-[1.15]">
                    {item.title}
                  </h3>
                  <p className="text-[13px] sm:text-[13.5px] leading-[1.45] opacity-90 max-w-[235px] font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div
          aria-hidden="true"
          className="w-full shrink-0 pointer-events-none"
          style={{ height: `${endSpacerHeight}px` }}
        />
      </div>
    </section>
  );
}

export default ModernScrollStack;
