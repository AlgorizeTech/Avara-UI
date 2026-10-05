"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// CLASSIFIED SECURITY CREST SEAL SVG
// Geometric security seal emblem for confidential dossiers and classified folders
// ============================================================================
export function ClassifiedSeal({
  className,
  style,
  size = 260,
  strokeWidth = 1.3,
}: {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none select-none", className)}
    >
      <g transform="translate(100, 100)">
        {/* Outer Security Orbit / Dashed Perimeter */}
        <circle
          r={86}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray="4 6"
          className="opacity-40"
        />

        {/* Secondary Precision Ring */}
        <circle
          r={78}
          stroke="currentColor"
          strokeWidth={strokeWidth * 0.8}
          className="opacity-55"
        />

        {/* Cardinal Axis Crosshairs */}
        <line x1="-92" y1="0" x2="-80" y2="0" stroke="currentColor" strokeWidth={strokeWidth} className="opacity-70" />
        <line x1="80" y1="0" x2="92" y2="0" stroke="currentColor" strokeWidth={strokeWidth} className="opacity-70" />
        <line x1="0" y1="-92" x2="0" y2="-80" stroke="currentColor" strokeWidth={strokeWidth} className="opacity-70" />
        <line x1="0" y1="80" x2="0" y2="92" stroke="currentColor" strokeWidth={strokeWidth} className="opacity-70" />

        {/* 8-Point Octagonal Security Diamond Geometry */}
        <polygon
          points="0,-64 45,-45 64,0 45,45 0,64 -45,45 -64,0 -45,-45"
          stroke="currentColor"
          strokeWidth={strokeWidth * 0.85}
          className="opacity-35"
        />
        <polygon
          points="0,-64 45,-45 64,0 45,45 0,64 -45,45 -64,0 -45,-45"
          stroke="currentColor"
          strokeWidth={strokeWidth * 0.65}
          transform="rotate(22.5)"
          className="opacity-20"
        />

        {/* Inner Solid Border Ring */}
        <circle
          r={48}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="opacity-65"
        />
        <circle
          r={44}
          stroke="currentColor"
          strokeWidth={strokeWidth * 0.7}
          strokeDasharray="2 4"
          className="opacity-45"
        />

        {/* Four Micro Security Dots */}
        <circle cx="0" cy="-56" r={1.8} fill="currentColor" className="opacity-60" />
        <circle cx="56" cy="0" r={1.8} fill="currentColor" className="opacity-60" />
        <circle cx="0" cy="56" r={1.8} fill="currentColor" className="opacity-60" />
        <circle cx="-56" cy="0" r={1.8} fill="currentColor" className="opacity-60" />

        {/* Central Classified Security Shield Emblem */}
        <path
          d="M 0 -26 L 20 -16 V 3 C 20 16 11 26 0 30 C -11 26 -20 16 -20 3 V -16 Z"
          stroke="currentColor"
          strokeWidth={strokeWidth * 1.3}
          strokeLinejoin="round"
          className="opacity-85"
        />

        {/* Security Shield Inner Lock / Keyhole */}
        <circle
          cx="0"
          cy="-2"
          r="4.5"
          stroke="currentColor"
          strokeWidth={strokeWidth * 1.1}
          className="opacity-90"
        />
        <path
          d="M -2 1.5 L -3.5 13 H 3.5 L 2 1.5 Z"
          fill="currentColor"
          className="opacity-80"
        />
      </g>
    </svg>
  );
}

// Alias for backward compatibility
export const OrbitalSpirograph = ClassifiedSeal;

// ============================================================================
// TYPES & PROPS
// ============================================================================
export type ConfidentialFolderInteractionMode = "auto-flip" | "step-flip";

export interface ConfidentialFolderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  folderColor?: string;
  interactionMode?: ConfidentialFolderInteractionMode;
  mode?: ConfidentialFolderInteractionMode;
  variant?: ConfidentialFolderInteractionMode;
  sleeveTitle?: string;
  sleeveSubtitle?: string;
  // Face 1: Front Cover / Voucher Pass
  frontBadge?: string;
  frontSerial?: string;
  frontTitle?: string;
  frontSubtitle?: string;
  frontStamp?: string;
  stampSuffix?: string;
  barcodeText?: string;
  clearanceLevel?: string;
  // Face 2: Back Details / Manifesto
  cardCategory?: string;
  cardDate?: string;
  cardTitle?: string;
  cardSubtitle?: string;
  statement?: string;
  highlightQuote?: string;
  authorText?: string;
  metric1Label?: string;
  metric1Value?: string;
  metric2Label?: string;
  metric2Value?: string;
  metric3Label?: string;
  metric3Value?: string;
  // Positioning & Motion
  initialPeek?: number;
  hoverPeek?: number;
  // Fallbacks
  cardBadge?: string;
  cardVersion?: string;
  pillar1Title?: string;
  pillar1Desc?: string;
  pillar2Title?: string;
  pillar2Desc?: string;
  quote?: string;
  quoteAuthor?: string;
  statusText?: string;
  sessionLabel?: string;
  sessionNumber?: string;
  subquote?: string;
  // Visual Options
  centerIcon?: React.ReactNode;
  cardVariant?: "adaptive" | "ivory";
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  sleeveClassName?: string;
  cardClassName?: string;
}

export function ConfidentialFolder({
  folderColor,
  interactionMode = "auto-flip",
  mode,
  variant,
  centerIcon,
  sleeveTitle = "Designed to endure",
  sleeveSubtitle = "Crafted for those who value timeless clarity.",
  // Face 1 (Front Cover Pass)
  frontBadge = "SPECIAL OFFER",
  frontSerial = "VOUCHER // 2026-X",
  frontTitle = "Exclusive Access",
  frontSubtitle = "Limited edition membership and premium reward voucher.",
  frontStamp = "VERIFIED",
  stampSuffix = "// VIP PASS",
  barcodeText = "COUPON // APEX-07-CORE",
  clearanceLevel = "REWARD STATUS: ACTIVE",
  // Face 2 (Back Manifesto Details)
  cardCategory = "COUPON VOUCHER",
  cardDate = "VALID // 2026",
  cardTitle = "The Art of Craft",
  cardSubtitle = "Foundational reward tier for premium members.",
  statement = "Redeem this exclusive voucher across any tier. Every detail is crafted with perfection to bring maximum value to your workflow.",
  highlightQuote = "Unlock 50% off on all annual pro plans.",
  authorText = "PRO MEMBERSHIP",
  metric1Label = "DISCOUNT",
  metric1Value = "50% OFF",
  metric2Label = "TIER",
  metric2Value = "VIP Elite",
  metric3Label = "STATUS",
  metric3Value = "Active",
  initialPeek = 38,
  hoverPeek = 88,
  cardBadge,
  cardVersion,
  pillar1Title,
  pillar1Desc,
  pillar2Title,
  pillar2Desc,
  quote,
  quoteAuthor,
  statusText,
  sessionLabel,
  sessionNumber,
  subquote,
  cardVariant = "adaptive",
  defaultOpen = false,
  onOpenChange,
  className,
  sleeveClassName,
  cardClassName,
  ...props
}: ConfidentialFolderProps) {
  const activeMode: ConfidentialFolderInteractionMode =
    mode ?? variant ?? interactionMode ?? "auto-flip";

  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isHovered, setIsHovered] = useState(false);

  // Animation Stages:
  // "inside"            -> Card resting inside (peeks out by initialPeek or hoverPeek)
  // "sliding-out"       -> Card sliding out completely to the right (behind sleeve, zIndex 10, rotateY 0deg)
  // "sliding-in-top"    -> Card arrives on top of sleeve (zIndex 30, rotate -2.5deg, rotateY 0deg)
  // "resting-top-front" -> (step-flip) Sits on top showing Face 1 (Front Cover)
  // "flipping-open"     -> Flips 180° in place on top of sleeve to reveal Face 2 (Back Details)
  // "resting-top"       -> Fully settled on top showing Face 2 (rotateY 180deg)
  // "flipping-close"    -> Flips back 180° in place from Face 2 to Face 1
  // "sliding-out-top"   -> Card slides out to the right in front of sleeve
  // "sliding-in-back"   -> Card slides back into sleeve pocket
  const [animStage, setAnimStage] = useState<
    | "inside"
    | "sliding-out"
    | "sliding-in-top"
    | "resting-top-front"
    | "flipping-open"
    | "resting-top"
    | "flipping-close"
    | "sliding-out-top"
    | "sliding-in-back"
  >(
    defaultOpen
      ? activeMode === "step-flip"
        ? "resting-top-front"
        : "resting-top"
      : "inside"
  );

  // zIndex elevates to 30 only when outside sleeve
  const [cardZIndex, setCardZIndex] = useState(defaultOpen ? 30 : 10);

  const isTransitioningRef = useRef(false);

  const handleToggle = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    if (activeMode === "step-flip") {
      // ======================================================================
      // 3-STAGE STEP-FLIP INTERACTION:
      // Click 1: Slide out and seat on top showing Face 1 (Front Cover)
      // Click 2: Flip 180° in place showing Face 2 (Back Details)
      // Click 3: Flip back & slide back into sleeve
      // ======================================================================
      if (animStage === "inside") {
        setAnimStage("sliding-out");

        setTimeout(() => {
          setCardZIndex(30);

          setTimeout(() => {
            setAnimStage("sliding-in-top");

            setTimeout(() => {
              setAnimStage("resting-top-front");
              setIsOpen(true);
              onOpenChange?.(true);
              isTransitioningRef.current = false;
            }, 500);
          }, 40);
        }, 380);
      } else if (animStage === "resting-top-front") {
        setAnimStage("flipping-open");

        setTimeout(() => {
          setAnimStage("resting-top");
          isTransitioningRef.current = false;
        }, 580);
      } else if (animStage === "resting-top") {
        setAnimStage("flipping-close");

        setTimeout(() => {
          setAnimStage("sliding-out-top");

          setTimeout(() => {
            setCardZIndex(10);

            setTimeout(() => {
              setAnimStage("sliding-in-back");

              setTimeout(() => {
                setAnimStage("inside");
                setIsOpen(false);
                onOpenChange?.(false);
                isTransitioningRef.current = false;
              }, 450);
            }, 40);
          }, 380);
        }, 540);
      } else {
        isTransitioningRef.current = false;
      }
    } else {
      // ======================================================================
      // DEFAULT AUTO-FLIP INTERACTION:
      // Click 1: Slide out -> Sit on top -> Auto flip 180° to Face 2
      // Click 2: Flip back -> Slide out -> Slide into sleeve
      // ======================================================================
      if (!isOpen || animStage === "inside") {
        setAnimStage("sliding-out");

        setTimeout(() => {
          setCardZIndex(30);

          setTimeout(() => {
            setAnimStage("sliding-in-top");

            setTimeout(() => {
              setAnimStage("flipping-open");

              setTimeout(() => {
                setAnimStage("resting-top");
                setIsOpen(true);
                onOpenChange?.(true);
                isTransitioningRef.current = false;
              }, 580);
            }, 500);
          }, 40);
        }, 380);
      } else {
        setAnimStage("flipping-close");

        setTimeout(() => {
          setAnimStage("sliding-out-top");

          setTimeout(() => {
            setCardZIndex(10);

            setTimeout(() => {
              setAnimStage("sliding-in-back");

              setTimeout(() => {
                setAnimStage("inside");
                setIsOpen(false);
                onOpenChange?.(false);
                isTransitioningRef.current = false;
              }, 450);
            }, 40);
          }, 380);
        }, 540);
      }
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    } else if (e.key === "Escape" && isOpen) {
      e.preventDefault();
      handleToggle();
    }
  };

  const isSleeveShifted = animStage === "sliding-out" || animStage === "sliding-out-top";

  // Compute Card CSS transform based on animation stage & hover
  let cardTransform = "translate3d(var(--cf-initial-peek, 14px), 0px, 0px) rotateY(0deg)";
  let cardTransition = "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)";

  if (animStage === "inside") {
    cardTransform = isHovered
      ? "translate3d(var(--cf-hover-peek, 30px), 0px, 0px) rotateY(0deg)"
      : "translate3d(var(--cf-initial-peek, 14px), 0px, 0px) rotateY(0deg)";
    cardTransition = "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)";
  } else if (animStage === "sliding-out") {
    cardTransform = "translate3d(calc(100% + 12px), 0px, 0px) rotateY(0deg)";
    cardTransition = "transform 0.38s cubic-bezier(0.25, 1, 0.5, 1)";
  } else if (animStage === "sliding-in-top" || animStage === "resting-top-front") {
    cardTransform = "translate3d(0px, 0px, 0px) rotate(-2.5deg) rotateY(0deg)";
    cardTransition =
      animStage === "sliding-in-top"
        ? "transform 0.48s cubic-bezier(0.16, 1, 0.3, 1)"
        : "transform 0.25s ease-out";
  } else if (animStage === "flipping-open" || animStage === "resting-top") {
    cardTransform = "translate3d(0px, 0px, 0px) rotate(-2.5deg) rotateY(180deg)";
    cardTransition =
      animStage === "flipping-open"
        ? "transform 0.58s cubic-bezier(0.4, 0, 0.2, 1)"
        : "transform 0.25s ease-out";
  } else if (animStage === "flipping-close") {
    cardTransform = "translate3d(0px, 0px, 0px) rotate(-2.5deg) rotateY(0deg)";
    cardTransition = "transform 0.52s cubic-bezier(0.4, 0, 0.2, 1)";
  } else if (animStage === "sliding-out-top") {
    cardTransform = "translate3d(calc(100% + 12px), 0px, 0px) rotateY(0deg)";
    cardTransition = "transform 0.38s cubic-bezier(0.25, 1, 0.5, 1)";
  } else if (animStage === "sliding-in-back") {
    cardTransform = isHovered
      ? "translate3d(var(--cf-hover-peek, 30px), 0px, 0px) rotateY(0deg)"
      : "translate3d(var(--cf-initial-peek, 14px), 0px, 0px) rotateY(0deg)";
    cardTransition = "transform 0.44s cubic-bezier(0.16, 1, 0.3, 1)";
  }

  const isAdaptive = cardVariant === "adaptive";

  // Resolve Face 1 & Face 2 labels
  const fBadge = frontBadge || cardBadge || sessionLabel || "SPECIAL OFFER";
  const fSerial = frontSerial || cardVersion || sessionNumber || "VOUCHER // 2026-X";
  const fTitle = frontTitle || cardTitle || "Exclusive Access";
  const fSubtitle = frontSubtitle || cardSubtitle || "Limited edition membership and premium reward voucher.";
  const fStamp = frontStamp || "VERIFIED";
  const fStampSuffix = stampSuffix || "// VIP PASS";
  const fBarcode = barcodeText || "COUPON // APEX-07-CORE";
  const fStatus = clearanceLevel || statusText || "REWARD STATUS: ACTIVE";

  const bCategory = cardCategory || cardBadge || sessionLabel || "COUPON VOUCHER";
  const bDate = cardDate || cardVersion || sessionNumber || "VALID // 2026";
  const bTitle = cardTitle || frontTitle || "The Art of Craft";
  const bSubtitle = cardSubtitle || frontSubtitle || "Foundational reward tier for premium members.";
  const bStatement = statement || quote || "Redeem this exclusive voucher across any tier. Every detail is crafted with perfection to bring maximum value to your workflow.";
  const bHighlight = highlightQuote || subquote || "Unlock 50% off on all annual pro plans.";
  const bAuthor = authorText || quoteAuthor || "PRO MEMBERSHIP";
  const m1L = pillar1Title || metric1Label || "DISCOUNT";
  const m1V = pillar1Desc || metric1Value || "50% OFF";
  const m2L = pillar2Title || metric2Label || "TIER";
  const m2V = pillar2Desc || metric2Value || "VIP Elite";
  const m3L = metric3Label || "STATUS";
  const m3V = metric3Value || "Active";

  return (
    <div
      className={cn(
        "relative flex items-center justify-center p-2 sm:p-8 select-none cf-theme-scope overflow-visible",
        className
      )}
      style={{
        ...(folderColor ? ({ "--cf-override": folderColor } as React.CSSProperties) : {}),
        ...props.style,
      }}
      {...props}
    >
      <style>{`
        .cf-theme-scope {
          --cf-sleeve-shift: -42%;
          --cf-initial-peek: ${Math.round(initialPeek * 0.35)}px;
          --cf-hover-peek: ${Math.round(hoverPeek * 0.35)}px;
          --cf-base: var(--cf-override, var(--primary, #6366f1));
          --cf-flap: oklch(from var(--cf-base) 0.88 calc(c * 0.4) h);
          --cf-plate: oklch(from var(--cf-base) 0.80 calc(c * 0.5) h);
          --cf-ink: oklch(from var(--cf-base) 0.32 calc(c * 0.6) h);
          --cf-ink-muted: oklch(from var(--cf-base) 0.45 calc(c * 0.35) h);
          --cf-spiro: oklch(from var(--cf-base) 0.38 calc(c * 0.5) h / 0.55);
          --cf-stroke-flap: oklch(from var(--cf-base) 0.76 calc(c * 0.3) h / 0.35);
          --cf-stroke-plate: oklch(from var(--cf-base) 0.68 calc(c * 0.3) h / 0.25);
          --cf-card-bg: var(--card, #ffffff);
          --cf-card-border: var(--border, rgba(0, 0, 0, 0.08));
          --cf-card-text: oklch(from var(--cf-base) 0.22 calc(c * 0.5) h);
          --cf-card-subtext: oklch(from var(--cf-base) 0.38 calc(c * 0.3) h);
          --cf-divider: oklch(from var(--cf-base) 0.88 calc(c * 0.2) h);
        }
        @media (min-width: 640px) {
          .cf-theme-scope {
            --cf-sleeve-shift: 0px;
            --cf-initial-peek: ${initialPeek}px;
            --cf-hover-peek: ${hoverPeek}px;
          }
        }
        :is(.dark, .dark *) .cf-theme-scope,
        .cf-theme-scope:is(.dark, .dark *) {
          --cf-flap: oklch(from var(--cf-base) 0.22 calc(c * 0.35) h);
          --cf-plate: oklch(from var(--cf-base) 0.15 calc(c * 0.25) h);
          --cf-ink: #ffffff;
          --cf-ink-muted: oklch(from var(--cf-base) 0.75 calc(c * 0.15) h);
          --cf-spiro: oklch(from var(--cf-base) 0.85 calc(c * 0.4) h / 0.75);
          --cf-stroke-flap: rgba(255, 255, 255, 0.12);
          --cf-stroke-plate: rgba(255, 255, 255, 0.08);
          --cf-card-bg: var(--card, oklch(from var(--cf-base) 0.16 calc(c * 0.2) h));
          --cf-card-border: var(--border, rgba(255, 255, 255, 0.1));
          --cf-card-text: #ffffff;
          --cf-card-subtext: oklch(from var(--cf-base) 0.80 calc(c * 0.1) h);
          --cf-divider: oklch(from var(--cf-base) 0.32 calc(c * 0.25) h / 0.5);
        }
      `}</style>

      {/* Interactive Sleeve Wrapper with Global Border Radius */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-label={`${sleeveTitle} coupon card. Click to ${isOpen ? "close" : "open"}`}
        onKeyDown={handleKeyDown}
        onClick={handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          perspective: 1200,
          transform: isSleeveShifted ? "translateX(var(--cf-sleeve-shift, 0px))" : "translateX(0px)",
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          borderRadius: "var(--radius, 1.25rem)",
        }}
        className={cn(
          "relative w-[160px] min-[400px]:w-[185px] sm:w-[360px] h-[215px] min-[400px]:h-[247px] sm:h-[480px] cursor-pointer outline-none select-none will-change-transform shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_20px_rgba(0,0,0,0.35)]",
          "focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-4 focus-visible:ring-offset-background",
          sleeveClassName
        )}
      >
        {/* ============================================================== */}
        {/* LAYER 1: BACK PLATE (Folder Sleeve Backing)                     */}
        {/* Uses global border-radius dynamically with theme palette        */}
        {/* ============================================================== */}
        <div
          className="absolute inset-0 pointer-events-none border transition-colors duration-300"
          style={{
            borderRadius: "var(--radius, 1.25rem)",
            backgroundColor: "var(--cf-plate)",
            borderColor: "var(--cf-stroke-plate)",
          }}
        />

        {/* ============================================================== */}
        {/* LAYER 2: THE CARD (Dual-Sided 3D Flipping Document)            */}
        {/* Glides out horizontally and flips 180° onto the front sleeve   */}
        {/* ============================================================== */}
        <div
          style={{
            zIndex: cardZIndex,
            transform: cardTransform,
            transition: cardTransition,
            transformStyle: "preserve-3d",
            borderRadius: "calc(var(--radius, 1.25rem) - 2px)",
          }}
          className={cn(
            "absolute inset-x-1.5 min-[400px]:inset-x-2 sm:inset-x-3.5 top-1 min-[400px]:top-1.5 sm:top-5 bottom-1 min-[400px]:bottom-1.5 sm:bottom-5",
            "will-change-transform transform-gpu pointer-events-auto",
            cardClassName
          )}
        >
          {/* ============================================================ */}
          {/* FACE 1: FRONT FACE (Voucher Pass & Clearance Badge)          */}
          {/* Visible when resting inside or seated on top before flip     */}
          {/* ============================================================ */}
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              borderRadius: "calc(var(--radius, 1.25rem) - 2px)",
              backgroundColor: isAdaptive ? "var(--cf-card-bg)" : "#f4efe6",
              borderColor: isAdaptive ? "var(--cf-card-border)" : "#e5dfd4",
              color: isAdaptive ? "var(--cf-card-text)" : "#1c1b18",
            }}
            className={cn(
              "absolute inset-0 border shadow-[0_0_14px_rgba(0,0,0,0.07)] dark:shadow-[0_0_16px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col justify-between p-2 min-[400px]:p-2.5 sm:p-6 select-none transition-colors duration-300"
            )}
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between font-mono text-[6px] min-[400px]:text-[7.5px] sm:text-[11px] font-semibold tracking-wider">
                <div className="flex items-center gap-1 sm:gap-1.5 text-primary">
                  <span className="w-1 h-1 min-[400px]:w-1.5 min-[400px]:h-1.5 rounded-full bg-primary animate-pulse" />
                  <span>{fBadge}</span>
                </div>
                <span className="opacity-75 font-mono">{fSerial}</span>
              </div>

              <div
                className="w-full h-px my-0.5 min-[400px]:my-1 sm:my-3 transition-colors duration-300"
                style={{ backgroundColor: isAdaptive ? "var(--cf-divider)" : "#e5dfd4" }}
              />

              <h3
                className="text-[10.5px] min-[400px]:text-[13px] sm:text-[22px] font-semibold tracking-tight font-sans leading-tight transition-colors duration-300"
                style={{ color: isAdaptive ? "var(--cf-card-text)" : "#1a1917" }}
              >
                {fTitle}
              </h3>

              <p
                className="text-[7px] min-[400px]:text-[8.5px] sm:text-[13px] leading-tight sm:leading-relaxed mt-0.5 sm:mt-1 transition-colors duration-300 line-clamp-2 sm:line-clamp-none"
                style={{ color: isAdaptive ? "var(--cf-card-subtext)" : "#475569" }}
              >
                {fSubtitle}
              </p>
            </div>

            {/* Centerpiece: Authentic Clearance Stamp & Security Barcode */}
            <div className="my-auto py-0.5 min-[400px]:py-1 sm:py-2 flex flex-col items-center justify-center">
              <div
                className={cn(
                  "px-1.5 min-[400px]:px-2 sm:px-3.5 py-0.5 min-[400px]:py-1 sm:py-1.5 rounded-md border-2 border-dashed font-mono font-bold text-[6.5px] min-[400px]:text-[8px] sm:text-[12px] tracking-[0.1em] sm:tracking-[0.2em] uppercase select-none transform -rotate-2 shadow-[0_0_6px_rgba(244,63,94,0.12)]",
                  "border-rose-500/80 text-rose-600 dark:border-rose-400/80 dark:text-rose-400 bg-rose-500/5"
                )}
              >
                {fStamp} {fStampSuffix}
              </div>

              {/* Cryptographic barcode vector */}
              <div className="mt-1 min-[400px]:mt-1.5 sm:mt-4 flex flex-col items-center gap-1 opacity-70">
                <div className="h-2.5 min-[400px]:h-3.5 sm:h-6 flex items-center gap-[1.5px] sm:gap-[3px]">
                  {[2, 4, 1, 3, 2, 5, 2, 1, 4, 3, 1, 5, 2, 3, 4, 2, 1, 3, 5, 2, 4, 1, 3].map((w, i) => (
                    <div
                      key={i}
                      className="h-full bg-current rounded-full"
                      style={{ width: `${w}px` }}
                    />
                  ))}
                </div>
                <span className="font-mono text-[5px] min-[400px]:text-[6.5px] sm:text-[9px] tracking-wider uppercase opacity-75">
                  {fBarcode}
                </span>
              </div>
            </div>

            {/* Footer Bar */}
            <div className="mt-auto pt-0.5 min-[400px]:pt-1 sm:pt-2">
              <div
                className="w-full h-px mb-0.5 min-[400px]:mb-1 sm:mb-3 transition-colors duration-300"
                style={{ backgroundColor: isAdaptive ? "var(--cf-divider)" : "#e5dfd4" }}
              />
              <div className="flex items-center justify-between font-mono text-[5.5px] min-[400px]:text-[7px] sm:text-[9.5px] tracking-wider uppercase opacity-75">
                <span>{fStatus}</span>
                <ClassifiedSeal
                  size={16}
                  strokeWidth={1.2}
                  className="w-[11px] h-[11px] min-[400px]:w-[14px] min-[400px]:h-[14px] sm:w-[22px] sm:h-[22px] opacity-80 text-primary"
                />
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* FACE 2: BACK FACE (Editorial Manifesto & Reward Breakdown)  */}
          {/* Revealed upon 180° flip                                      */}
          {/* ============================================================ */}
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderRadius: "calc(var(--radius, 1.25rem) - 2px)",
              backgroundColor: isAdaptive ? "var(--cf-card-bg)" : "#f4efe6",
              borderColor: isAdaptive ? "var(--cf-card-border)" : "#e5dfd4",
              color: isAdaptive ? "var(--cf-card-text)" : "#1c1b18",
            }}
            className={cn(
              "absolute inset-0 border shadow-[0_0_14px_rgba(0,0,0,0.07)] dark:shadow-[0_0_16px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col justify-between p-2 min-[400px]:p-2.5 sm:p-6 select-none transition-colors duration-300"
            )}
          >
            {/* Top Section */}
            <div>
              {/* Category & Edition Date */}
              <div className="flex items-center justify-between font-mono text-[6px] min-[400px]:text-[7.5px] sm:text-[10.5px] font-semibold tracking-wider">
                <div className="flex items-center gap-1 sm:gap-1.5 text-primary">
                  <span className="w-1 h-1 min-[400px]:w-1.5 min-[400px]:h-1.5 rounded-full bg-primary" />
                  <span>{bCategory}</span>
                </div>
                <span className="opacity-60 font-mono text-[5.5px] min-[400px]:text-[7px] sm:text-[10px] tracking-wide">
                  {bDate}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="mt-0.5 min-[400px]:mt-1 sm:mt-3">
                <h3
                  className="text-[10.5px] min-[400px]:text-[13px] sm:text-[21px] font-semibold tracking-tight font-sans leading-tight transition-colors duration-300"
                  style={{ color: isAdaptive ? "var(--cf-card-text)" : "#1a1917" }}
                >
                  {bTitle}
                </h3>
                <p
                  className="text-[6.5px] min-[400px]:text-[8px] sm:text-[12.5px] leading-tight sm:leading-normal mt-0.5 sm:mt-1 transition-colors duration-300"
                  style={{ color: isAdaptive ? "var(--cf-card-subtext)" : "#57534e" }}
                >
                  {bSubtitle}
                </p>
              </div>

              {/* Divider */}
              <div
                className="w-full h-px my-0.5 min-[400px]:my-1 sm:my-3 transition-colors duration-300"
                style={{ backgroundColor: isAdaptive ? "var(--cf-divider)" : "#e5dfd4" }}
              />

              {/* Statement */}
              <p
                className="text-[6px] min-[400px]:text-[7.5px] sm:text-[12.5px] leading-tight sm:leading-relaxed transition-colors duration-300 line-clamp-2 sm:line-clamp-none"
                style={{ color: isAdaptive ? "var(--cf-card-subtext)" : "#44403c" }}
              >
                {bStatement}
              </p>

              {/* Highlight Punchline Box */}
              <div
                className="mt-0.5 min-[400px]:mt-1 sm:mt-3 px-1.5 min-[400px]:px-2 sm:px-3 py-0.5 min-[400px]:py-1 sm:py-2 rounded-lg border-l-2 border-primary bg-primary/[0.04] transition-colors duration-300"
              >
                <p
                  className="italic text-[6px] min-[400px]:text-[7.5px] sm:text-[12px] font-medium leading-tight sm:leading-snug line-clamp-2 sm:line-clamp-none"
                  style={{ color: isAdaptive ? "var(--cf-card-text)" : "#1c1917" }}
                >
                  &ldquo;{bHighlight}&rdquo;
                </p>
              </div>

              {/* 3 Metric Pills Strip */}
              <div className="grid grid-cols-3 gap-0.5 min-[400px]:gap-1 sm:gap-2 mt-0.5 min-[400px]:mt-1 sm:mt-3.5">
                <div
                  className="px-0.5 py-0.5 min-[400px]:px-1 min-[400px]:py-0.5 sm:px-2 sm:py-1.5 rounded-lg border text-center transition-colors duration-300"
                  style={{
                    backgroundColor: isAdaptive ? "rgba(255, 255, 255, 0.03)" : "#ece6dc",
                    borderColor: isAdaptive ? "var(--cf-divider)" : "#e2dbce",
                  }}
                >
                  <span
                    className="block font-mono text-[5px] min-[400px]:text-[6px] sm:text-[8.5px] tracking-wider uppercase opacity-60"
                    style={{ color: isAdaptive ? "var(--cf-card-subtext)" : "#78716c" }}
                  >
                    {m1L}
                  </span>
                  <span
                    className="block font-mono text-[6px] min-[400px]:text-[7.5px] sm:text-[10.5px] font-bold text-primary mt-0.5"
                  >
                    {m1V}
                  </span>
                </div>

                <div
                  className="px-0.5 py-0.5 min-[400px]:px-1 min-[400px]:py-0.5 sm:px-2 sm:py-1.5 rounded-lg border text-center transition-colors duration-300"
                  style={{
                    backgroundColor: isAdaptive ? "rgba(255, 255, 255, 0.03)" : "#ece6dc",
                    borderColor: isAdaptive ? "var(--cf-divider)" : "#e2dbce",
                  }}
                >
                  <span
                    className="block font-mono text-[5px] min-[400px]:text-[6px] sm:text-[8.5px] tracking-wider uppercase opacity-60"
                    style={{ color: isAdaptive ? "var(--cf-card-subtext)" : "#78716c" }}
                  >
                    {m2L}
                  </span>
                  <span
                    className="block font-mono text-[6px] min-[400px]:text-[7.5px] sm:text-[10.5px] font-bold text-primary mt-0.5"
                  >
                    {m2V}
                  </span>
                </div>

                <div
                  className="px-0.5 py-0.5 min-[400px]:px-1 min-[400px]:py-0.5 sm:px-2 sm:py-1.5 rounded-lg border text-center transition-colors duration-300"
                  style={{
                    backgroundColor: isAdaptive ? "rgba(255, 255, 255, 0.03)" : "#ece6dc",
                    borderColor: isAdaptive ? "var(--cf-divider)" : "#e2dbce",
                  }}
                >
                  <span
                    className="block font-mono text-[5px] min-[400px]:text-[6px] sm:text-[8.5px] tracking-wider uppercase opacity-60"
                    style={{ color: isAdaptive ? "var(--cf-card-subtext)" : "#78716c" }}
                  >
                    {m3L}
                  </span>
                  <span
                    className="block font-mono text-[6px] min-[400px]:text-[7.5px] sm:text-[10.5px] font-bold text-emerald-500 mt-0.5"
                  >
                    {m3V}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Footer Section */}
            <div className="pt-0.5 min-[400px]:pt-1 sm:pt-2">
              <div
                className="w-full h-px mb-0.5 min-[400px]:mb-1 sm:mb-2.5 transition-colors duration-300"
                style={{ backgroundColor: isAdaptive ? "var(--cf-divider)" : "#e5dfd4" }}
              />
              <div className="flex items-center justify-between font-mono text-[5.5px] min-[400px]:text-[6.5px] sm:text-[9.5px] tracking-wider uppercase opacity-75">
                <span style={{ color: isAdaptive ? "var(--cf-card-subtext)" : "#78716c" }}>
                  ✦ {bAuthor}
                </span>
                <ClassifiedSeal
                  size={16}
                  strokeWidth={1.2}
                  className="w-[11px] h-[11px] min-[400px]:w-[14px] min-[400px]:h-[14px] sm:w-[22px] sm:h-[22px] opacity-80 text-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* LAYER 3: FRONT SLEEVE FLAP                                     */}
        {/* Precise thumb notch with dynamic global border radius          */}
        {/* ============================================================== */}
        <div
          className="absolute inset-0 pointer-events-none border transition-colors duration-300 overflow-hidden"
          style={{
            zIndex: 20,
            borderRadius: "var(--radius, 1.25rem)",
            backgroundColor: "var(--cf-flap)",
            borderColor: "var(--cf-stroke-flap)",
            maskImage:
              "radial-gradient(circle 24px at calc(100% - 0px) 50%, transparent 23px, black 24px)",
            WebkitMaskImage:
              "radial-gradient(circle 24px at calc(100% - 0px) 50%, transparent 23px, black 24px)",
          }}
        >
          {/* Front Sleeve Surface Content */}
          <div className="relative z-10 w-full h-full flex flex-col justify-between p-2 min-[400px]:p-3 sm:p-8">
            {/* Top Empty Space */}
            <div />

            {/* Center Classified Security Crest Seal */}
            <div className="flex items-center justify-center my-auto py-1 sm:py-2">
              {centerIcon ? (
                <div className="w-[80px] h-[80px] min-[400px]:w-[105px] min-[400px]:h-[105px] sm:w-[265px] sm:h-[265px] flex items-center justify-center transition-colors duration-300">
                  {centerIcon}
                </div>
              ) : (
                <ClassifiedSeal
                  size={265}
                  strokeWidth={1.3}
                  className="w-[80px] h-[80px] min-[400px]:w-[105px] min-[400px]:h-[105px] sm:w-[265px] sm:h-[265px] transition-colors duration-300"
                  style={{ color: "var(--cf-spiro)" }}
                />
              )}
            </div>

            {/* Bottom Title & Subtitle */}
            <div className="text-left w-full pr-1 sm:pr-4 overflow-hidden">
              <h2
                className="text-[10.5px] min-[400px]:text-[13px] sm:text-[22px] font-semibold tracking-tight leading-tight transition-colors duration-300 whitespace-nowrap truncate"
                style={{ color: "var(--cf-ink)" }}
              >
                {sleeveTitle}
              </h2>
              <p
                className="text-[5.5px] min-[400px]:text-[7px] sm:text-[13.5px] font-normal leading-tight mt-0.5 sm:mt-1 transition-colors duration-300 whitespace-nowrap truncate"
                style={{ color: "var(--cf-ink-muted)" }}
              >
                {sleeveSubtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Aliases for modern naming
export const CouponCards = ConfidentialFolder;
export type CouponCardsProps = ConfidentialFolderProps;
export type CouponCardsInteractionMode = ConfidentialFolderInteractionMode;
