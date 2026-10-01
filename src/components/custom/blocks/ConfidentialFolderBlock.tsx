"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// ATOMIC ORBITAL SPIROGRAPH SVG
// Precise geometric spirograph matching the reference confidential aesthetic
// ============================================================================
export function OrbitalSpirograph({
  className,
  style,
  size = 260,
  dotRadius = 2.2,
  strokeWidth = 1.3,
}: {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  dotRadius?: number;
  strokeWidth?: number;
}) {
  const angles = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5];

  // Specific geometric nodal coordinates for orbital particles
  const nodes = [
    { x: 0, y: -33 },
    { x: 0, y: 33 },
    { x: -33, y: 0 },
    { x: 33, y: 0 },
    { x: 48, y: -22 },
    { x: -48, y: 22 },
    { x: 22, y: 48 },
    { x: -22, y: -48 },
    { x: 62, y: 12 },
    { x: -62, y: -12 },
    { x: 12, y: -62 },
    { x: -12, y: 62 },
    { x: 38, y: -38 },
    { x: -38, y: 38 },
    { x: -38, y: -38 },
    { x: 38, y: 38 },
  ];

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      style={style}
      className={cn("pointer-events-none select-none", className)}
    >
      <g transform="translate(100, 100)">
        {/* Orbital Ellipses */}
        {angles.map((angle) => (
          <ellipse
            key={angle}
            rx={66}
            ry={32}
            transform={`rotate(${angle})`}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="opacity-55"
          />
        ))}

        {/* Inner core circle guide */}
        <circle
          r={28}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth * 0.8}
          className="opacity-25"
        />

        {/* Orbital Particle Dots */}
        {nodes.map((node, i) => (
          <circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={dotRadius}
            fill="currentColor"
            className="opacity-80"
          />
        ))}
      </g>
    </svg>
  );
}

// ============================================================================
// SLEEVE BACK SHAPE (LAYER 1)
// Vector shape matching wallet with exact 30px rounded corners and drop-shadow-sm
// ============================================================================
function SleeveBackShape({
  width = 360,
  height = 480,
  radius = 30,
  fillColor,
  borderColor,
  className,
}: {
  width?: number;
  height?: number;
  radius?: number;
  fillColor?: string;
  borderColor?: string;
  className?: string;
}) {
  const path = `
    M ${radius} 0
    H ${width - radius}
    A ${radius} ${radius} 0 0 1 ${width} ${radius}
    V ${height - radius}
    A ${radius} ${radius} 0 0 1 ${width - radius} ${height}
    H ${radius}
    A ${radius} ${radius} 0 0 1 0 ${height - radius}
    V ${radius}
    A ${radius} ${radius} 0 0 1 ${radius} 0
    Z
  `;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("absolute inset-0 w-full h-full pointer-events-none drop-shadow-sm", className)}
      preserveAspectRatio="none"
    >
      <path
        d={path}
        className="transition-colors duration-300"
        style={{
          fill: fillColor || "var(--cf-plate)",
          stroke: borderColor || "var(--cf-stroke-plate)",
        }}
        strokeWidth="1.5"
      />
    </svg>
  );
}

// ============================================================================
// FRONT SLEEVE SVG SHAPE WITH RIGHT THUMB NOTCH (LAYER 3)
// Exact matching 30px rounded corners with smooth inward thumb scoop cutout
// ============================================================================
function SleeveFrontShape({
  width = 360,
  height = 480,
  radius = 30,
  notchRadius = 26,
  fillColor,
  borderColor,
  className,
}: {
  width?: number;
  height?: number;
  radius?: number;
  notchRadius?: number;
  fillColor?: string;
  borderColor?: string;
  className?: string;
}) {
  const centerY = height / 2;
  const notchTop = centerY - notchRadius;
  const notchBottom = centerY + notchRadius;

  const path = `
    M ${radius} 0
    H ${width - radius}
    A ${radius} ${radius} 0 0 1 ${width} ${radius}
    V ${notchTop}
    A ${notchRadius} ${notchRadius} 0 0 0 ${width} ${notchBottom}
    V ${height - radius}
    A ${radius} ${radius} 0 0 1 ${width - radius} ${height}
    H ${radius}
    A ${radius} ${radius} 0 0 1 0 ${height - radius}
    V ${radius}
    A ${radius} ${radius} 0 0 1 ${radius} 0
    Z
  `;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
      preserveAspectRatio="none"
    >
      <path
        d={path}
        className="transition-colors duration-300"
        style={{
          fill: fillColor || "var(--cf-flap)",
          stroke: borderColor || "var(--cf-stroke-flap)",
        }}
        strokeWidth="1.5"
      />
    </svg>
  );
}

// ============================================================================
// TYPES & PROPS
// ============================================================================
export interface ConfidentialFolderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  folderColor?: string;
  sleeveTitle?: string;
  sleeveSubtitle?: string;
  // Front Face Props (Dossier Cover)
  frontBadge?: string;
  frontSerial?: string;
  frontTitle?: string;
  frontSubtitle?: string;
  frontStamp?: string;
  stampSuffix?: string;
  barcodeText?: string;
  clearanceLevel?: string;
  // Back Face Props (Compact Editorial Manifesto Card)
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
  // Fallbacks for any previous props
  cardBadge?: string;
  cardVersion?: string;
  /** Overrides `metric1Label` (first metric pill on the back face). */
  pillar1Title?: string;
  /** Overrides `metric1Value` (first metric pill on the back face). */
  pillar1Desc?: string;
  /** Overrides `metric2Label` (second metric pill on the back face). */
  pillar2Title?: string;
  /** Overrides `metric2Value` (second metric pill on the back face). */
  pillar2Desc?: string;
  quote?: string;
  quoteAuthor?: string;
  /** Overrides `clearanceLevel` (status line in the front face footer). */
  statusText?: string;
  sessionLabel?: string;
  sessionNumber?: string;
  subquote?: string;
  // Visual Options
  cardVariant?: "adaptive" | "ivory";
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  sleeveClassName?: string;
  cardClassName?: string;
}

export function ConfidentialFolder({
  folderColor,
  sleeveTitle = "Designed to endure",
  sleeveSubtitle = "Crafted for those who value timeless clarity.",
  frontBadge = "INTERNAL DISPATCH",
  frontSerial = "ARCHIVE // 07-X",
  frontTitle = "Design Directives",
  frontSubtitle = "Proprietary framework for world-class product architecture.",
  frontStamp = "RESTRICTED",
  stampSuffix = "// CORE TEAM",
  barcodeText = "DISPATCH // APEX-07-CORE",
  clearanceLevel = "ACCESS PROTOCOL: TIER 1",
  // Back Face Props
  cardCategory = "ARCHIVE PROTOCOL",
  cardDate = "2026 // ED. 04",
  cardTitle = "The Art of Restraint",
  cardSubtitle = "Foundational principles on high-craft software.",
  statement = "Simplicity is not the lack of ambition; it is the absolute mastery of complexity. Strip away every superfluous element until only pure utility and craft remain.",
  highlightQuote = "Cut until it is obvious. Then ship with conviction.",
  authorText = "STUDIO CORE TEAM",
  metric1Label = "LATENCY",
  metric1Value = "< 16ms",
  metric2Label = "PHYSICS",
  metric2Value = "Spring-3D",
  metric3Label = "INTEGRITY",
  metric3Value = "100%",
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
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isHovered, setIsHovered] = useState(false);

  // Animation Phase State:
  // "inside"          -> Card resting inside (x: 20 or 65 on hover, rotateY: 0deg)
  // "sliding-out"     -> Card sliding out completely to the right (x: 365, rotateY: 0deg)
  // "sliding-in-top"  -> Card glides onto top of sleeve and SITS in position (rotate -2.5deg, rotateY: 0deg)
  // "flipping-open"   -> Sitting in position on top, it flips 180deg to reveal Face 2 (Manifesto)
  // "resting-top"     -> Fully settled on top with rotateY: 180deg
  // "flipping-close"  -> Sitting in position on top, it flips back 180deg to Face 1 (Cover)
  // "sliding-out-top" -> Card slides out to the right (x: 365, rotateY: 0deg)
  // "sliding-in-back" -> Card slides back into the sleeve pocket
  const [animStage, setAnimStage] = useState<
    | "inside"
    | "sliding-out"
    | "sliding-in-top"
    | "flipping-open"
    | "resting-top"
    | "flipping-close"
    | "sliding-out-top"
    | "sliding-in-back"
  >(defaultOpen ? "resting-top" : "inside");

  // zIndex changes only when the card is completely outside the sleeve (x >= 340)
  const [cardZIndex, setCardZIndex] = useState(defaultOpen ? 30 : 10);

  const isTransitioningRef = useRef(false);

  const handleToggle = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    if (!isOpen) {
      // 1. Slide out fully to the right (behind sleeve, zIndex 10, rotateY 0deg)
      setAnimStage("sliding-out");

      setTimeout(() => {
        // 2. Elevate z-index to front (zIndex 30) while outside
        setCardZIndex(30);

        setTimeout(() => {
          // 3. Slide onto the sleeve and SIT fully in position (rotateY: 0deg, NO flip yet)
          setAnimStage("sliding-in-top");

          setTimeout(() => {
            // 4. Now that it is fully positioned and seated on top, FLIP in place!
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
      // 1. While sitting on top of the sleeve, first FLIP BACK in place to Face 1 (Cover)
      setAnimStage("flipping-close");

      setTimeout(() => {
        // 2. Once flipped back to Cover, slide out to the right (zIndex 30)
        setAnimStage("sliding-out-top");

        setTimeout(() => {
          // 3. Drop z-index to back (zIndex 10) while outside
          setCardZIndex(10);

          setTimeout(() => {
            // 4. Slide back inside the sleeve pocket
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

  // Compute Card CSS transform based on animation stage & hover
  let cardTransform = `translate3d(${initialPeek}px, 0px, 0px) rotateY(0deg)`;
  let cardTransition = "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)";

  if (animStage === "inside") {
    // Idle peeking out (initialPeek) or hover peeking out (hoverPeek)
    cardTransform = isHovered
      ? `translate3d(${hoverPeek}px, 0px, 0px) rotateY(0deg)`
      : `translate3d(${initialPeek}px, 0px, 0px) rotateY(0deg)`;
    cardTransition = "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)";
  } else if (animStage === "sliding-out") {
    // Clears the sleeve completely to the right across any screen width
    cardTransform = "translate3d(calc(100% + 24px), 0px, 0px) rotateY(0deg)";
    cardTransition = "transform 0.38s cubic-bezier(0.25, 1, 0.5, 1)";
  } else if (animStage === "sliding-in-top") {
    // Arrives and settles fully on top of the sleeve — exact position, but NO flip yet!
    cardTransform = "translate3d(0px, 0px, 0px) rotate(-2.5deg) rotateY(0deg)";
    cardTransition = "transform 0.48s cubic-bezier(0.16, 1, 0.3, 1)";
  } else if (animStage === "flipping-open" || animStage === "resting-top") {
    // Sitting on top of the sleeve, it flips 180deg to reveal Face 2 (Manifesto)
    cardTransform = "translate3d(0px, 0px, 0px) rotate(-2.5deg) rotateY(180deg)";
    cardTransition =
      animStage === "flipping-open"
        ? "transform 0.58s cubic-bezier(0.4, 0, 0.2, 1)"
        : "transform 0.25s ease-out";
  } else if (animStage === "flipping-close") {
    // Sitting on top of the sleeve, it flips back from Face 2 to Face 1 (Cover)
    cardTransform = "translate3d(0px, 0px, 0px) rotate(-2.5deg) rotateY(0deg)";
    cardTransition = "transform 0.52s cubic-bezier(0.4, 0, 0.2, 1)";
  } else if (animStage === "sliding-out-top") {
    // Slides out to the right in front of sleeve
    cardTransform = "translate3d(calc(100% + 24px), 0px, 0px) rotateY(0deg)";
    cardTransition = "transform 0.38s cubic-bezier(0.25, 1, 0.5, 1)";
  } else if (animStage === "sliding-in-back") {
    // Sliding back into resting/hover position inside sleeve
    cardTransform = isHovered
      ? `translate3d(${hoverPeek}px, 0px, 0px) rotateY(0deg)`
      : `translate3d(${initialPeek}px, 0px, 0px) rotateY(0deg)`;
    cardTransition = "transform 0.44s cubic-bezier(0.16, 1, 0.3, 1)";
  }

  const isAdaptive = cardVariant === "adaptive";

  return (
    <div
      className={cn(
        "relative flex items-center justify-center p-2 sm:p-8 select-none cf-theme-scope overflow-x-clip sm:overflow-visible",
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
          --cf-base: var(--cf-override, var(--primary, #6366f1));
          --cf-flap: oklch(from var(--cf-base) 0.88 calc(c * 0.4) h);
          --cf-plate: oklch(from var(--cf-base) 0.80 calc(c * 0.5) h);
          --cf-ink: oklch(from var(--cf-base) 0.32 calc(c * 0.6) h);
          --cf-ink-muted: oklch(from var(--cf-base) 0.45 calc(c * 0.35) h);
          --cf-spiro: oklch(from var(--cf-base) 0.38 calc(c * 0.5) h / 0.55);
          --cf-stroke-flap: rgba(255, 255, 255, 0.55);
          --cf-stroke-plate: rgba(255, 255, 255, 0.2);
          --cf-card-bg: #ffffff;
          --cf-card-border: rgba(0, 0, 0, 0.08);
          --cf-card-text: oklch(from var(--cf-base) 0.22 calc(c * 0.5) h);
          --cf-card-subtext: oklch(from var(--cf-base) 0.38 calc(c * 0.3) h);
          --cf-divider: oklch(from var(--cf-base) 0.88 calc(c * 0.2) h);
        }
        :is(.dark, .dark *) .cf-theme-scope,
        .cf-theme-scope:is(.dark, .dark *) {
          --cf-flap: oklch(from var(--cf-base) 0.22 calc(c * 0.35) h);
          --cf-plate: oklch(from var(--cf-base) 0.15 calc(c * 0.25) h);
          --cf-ink: #ffffff;
          --cf-ink-muted: oklch(from var(--cf-base) 0.75 calc(c * 0.15) h);
          --cf-spiro: oklch(from var(--cf-base) 0.85 calc(c * 0.4) h / 0.75);
          --cf-stroke-flap: rgba(255, 255, 255, 0.15);
          --cf-stroke-plate: rgba(255, 255, 255, 0.08);
          --cf-card-bg: oklch(from var(--cf-base) 0.16 calc(c * 0.2) h);
          --cf-card-border: rgba(255, 255, 255, 0.1);
          --cf-card-text: #ffffff;
          --cf-card-subtext: oklch(from var(--cf-base) 0.80 calc(c * 0.1) h);
          --cf-divider: oklch(from var(--cf-base) 0.32 calc(c * 0.25) h / 0.5);
        }
      `}</style>

      {/* Interactive Sleeve Wrapper with 3D perspective */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-label={`${sleeveTitle} confidential folder. Click to ${isOpen ? "close" : "open"}`}
        onKeyDown={handleKeyDown}
        onClick={handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ perspective: 1200 }}
        className={cn(
          "relative w-[285px] sm:w-[360px] h-[340px] sm:h-[480px] cursor-pointer outline-none",
          "focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-4 focus-visible:ring-offset-background",
          sleeveClassName
        )}
      >
        {/* ============================================================== */}
        {/* LAYER 1: BACK PLATE (Inside sleeve backing)                    */}
        {/* Vector SVG with exact matching 30px corners and drop-shadow-sm */}
        {/* ============================================================== */}
        <SleeveBackShape width={360} height={480} radius={30} />

        {/* ============================================================== */}
        {/* LAYER 2: THE CARD (Document with 3D Flip capability)           */}
        {/* Slides out horizontally, flips 180deg onto top of sleeve       */}
        {/* ============================================================== */}
        <div
          style={{
            zIndex: cardZIndex,
            transform: cardTransform,
            transition: cardTransition,
            transformStyle: "preserve-3d",
          }}
          className={cn(
            "absolute inset-x-2.5 sm:inset-x-3.5 top-2 sm:top-5 bottom-2 sm:bottom-5 rounded-[16px] sm:rounded-[22px]",
            "will-change-transform transform-gpu pointer-events-auto",
            cardClassName
          )}
        >
          {/* ============================================================ */}
          {/* FACE 1: FRONT FACE (Dossier / Security Classification Cover)  */}
          {/* Visible initially when card is resting inside or peeking out */}
          {/* ============================================================ */}
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              backgroundColor: isAdaptive ? "var(--cf-card-bg)" : "#f4efe6",
              borderColor: isAdaptive ? "var(--cf-card-border)" : "#e5dfd4",
              color: isAdaptive ? "var(--cf-card-text)" : "#1c1b18",
            }}
            className={cn(
              "absolute inset-0 rounded-[16px] sm:rounded-[22px] border shadow-lg overflow-hidden flex flex-col justify-between p-3 sm:p-6 select-none transition-colors duration-300"
            )}
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between font-mono text-[9.5px] sm:text-[11px] font-semibold tracking-wider">
                <div className="flex items-center gap-1.5 text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span>{frontBadge}</span>
                </div>
                <span className="opacity-75 font-mono">{frontSerial}</span>
              </div>

              <div
                className="w-full h-px my-1.5 sm:my-3 transition-colors duration-300"
                style={{ backgroundColor: isAdaptive ? "var(--cf-divider)" : "#e5dfd4" }}
              />

              <h3
                className="text-[16px] sm:text-[22px] font-semibold tracking-tight font-sans transition-colors duration-300"
                style={{ color: isAdaptive ? "var(--cf-card-text)" : "#1a1917" }}
              >
                {frontTitle}
              </h3>

              <p
                className="text-[11px] sm:text-[13px] leading-relaxed mt-0.5 sm:mt-1 transition-colors duration-300"
                style={{ color: isAdaptive ? "var(--cf-card-subtext)" : "#475569" }}
              >
                {frontSubtitle}
              </p>
            </div>

            {/* Centerpiece: Authentic Clearance Stamp & Security Barcode */}
            <div className="my-auto py-1 sm:py-2 flex flex-col items-center justify-center">
              <div
                className={cn(
                  "px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-md border-2 border-dashed font-mono font-bold text-[9.5px] sm:text-[12px] tracking-[0.2em] uppercase select-none transform -rotate-2 shadow-sm",
                  "border-rose-500/80 text-rose-600 dark:border-rose-400/80 dark:text-rose-400 bg-rose-500/5"
                )}
              >
                {frontStamp} {stampSuffix}
              </div>

              {/* Cryptographic barcode vector */}
              <div className="mt-2 sm:mt-4 flex flex-col items-center gap-1 opacity-70">
                <div className="h-4 sm:h-6 flex items-center gap-[3px]">
                  {[2, 4, 1, 3, 2, 5, 2, 1, 4, 3, 1, 5, 2, 3, 4, 2, 1, 3, 5, 2, 4, 1, 3].map((w, i) => (
                    <div
                      key={i}
                      className="h-full bg-current rounded-full"
                      style={{ width: `${w}px` }}
                    />
                  ))}
                </div>
                <span className="font-mono text-[8px] sm:text-[9px] tracking-widest uppercase opacity-75">
                  {barcodeText}
                </span>
              </div>
            </div>

            {/* Footer Bar */}
            <div className="mt-auto pt-1 sm:pt-2">
              <div
                className="w-full h-px mb-1.5 sm:mb-3 transition-colors duration-300"
                style={{ backgroundColor: isAdaptive ? "var(--cf-divider)" : "#e5dfd4" }}
              />
              <div className="flex items-center justify-between font-mono text-[8.5px] sm:text-[9.5px] tracking-wider uppercase opacity-75">
                <span>{statusText || clearanceLevel}</span>
                <OrbitalSpirograph
                  size={16}
                  strokeWidth={1.2}
                  dotRadius={1.5}
                  className="w-[16px] h-[16px] sm:w-[22px] sm:h-[22px] opacity-80 text-primary"
                />
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* FACE 2: BACK FACE (Compact Editorial Manifesto Card)         */}
          {/* Designed with optimal height to guarantee zero bottom overflow*/}
          {/* ============================================================ */}
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              backgroundColor: isAdaptive ? "var(--cf-card-bg)" : "#f4efe6",
              borderColor: isAdaptive ? "var(--cf-card-border)" : "#e5dfd4",
              color: isAdaptive ? "var(--cf-card-text)" : "#1c1b18",
            }}
            className={cn(
              "absolute inset-0 rounded-[16px] sm:rounded-[22px] border shadow-lg overflow-hidden flex flex-col justify-between p-3 sm:p-6 select-none transition-colors duration-300"
            )}
          >
            {/* Top Section */}
            <div>
              {/* Category & Edition Date */}
              <div className="flex items-center justify-between font-mono text-[10px] sm:text-[10.5px] font-semibold tracking-wider">
                <div className="flex items-center gap-1.5 text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>{sessionLabel || cardBadge || cardCategory}</span>
                </div>
                <span className="opacity-60 font-mono text-[9.5px] sm:text-[10px] tracking-wide">
                  {sessionNumber || cardVersion || cardDate}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="mt-2 sm:mt-3">
                <h3
                  className="text-[16px] sm:text-[21px] font-semibold tracking-tight font-sans transition-colors duration-300"
                  style={{ color: isAdaptive ? "var(--cf-card-text)" : "#1a1917" }}
                >
                  {cardTitle}
                </h3>
                <p
                  className="text-[11px] sm:text-[12.5px] leading-normal mt-0.5 sm:mt-1 transition-colors duration-300"
                  style={{ color: isAdaptive ? "var(--cf-card-subtext)" : "#57534e" }}
                >
                  {cardSubtitle}
                </p>
              </div>

              {/* Divider */}
              <div
                className="w-full h-px my-2 sm:my-3 transition-colors duration-300"
                style={{ backgroundColor: isAdaptive ? "var(--cf-divider)" : "#e5dfd4" }}
              />

              {/* Statement */}
              <p
                className="text-[10.5px] sm:text-[12.5px] leading-relaxed transition-colors duration-300 line-clamp-2 sm:line-clamp-none"
                style={{ color: isAdaptive ? "var(--cf-card-subtext)" : "#44403c" }}
              >
                {quote || statement}
              </p>

              {/* Highlight Punchline Box */}
              <div
                className="mt-2 sm:mt-3 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border-l-2 border-primary bg-primary/[0.04] transition-colors duration-300"
              >
                <p
                  className="italic text-[10.5px] sm:text-[12px] font-medium leading-snug"
                  style={{ color: isAdaptive ? "var(--cf-card-text)" : "#1c1917" }}
                >
                  &ldquo;{subquote || highlightQuote}&rdquo;
                </p>
              </div>

              {/* 3 Metric Pills Strip */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-2 sm:mt-3.5">
                <div
                  className="px-1.5 py-1 sm:px-2 sm:py-1.5 rounded-lg border text-center transition-colors duration-300"
                  style={{
                    backgroundColor: isAdaptive ? "rgba(255, 255, 255, 0.03)" : "#ece6dc",
                    borderColor: isAdaptive ? "var(--cf-divider)" : "#e2dbce",
                  }}
                >
                  <span
                    className="block font-mono text-[7.5px] sm:text-[8.5px] tracking-wider uppercase opacity-60"
                    style={{ color: isAdaptive ? "var(--cf-card-subtext)" : "#78716c" }}
                  >
                    {pillar1Title || metric1Label}
                  </span>
                  <span
                    className="block font-mono text-[9.5px] sm:text-[10.5px] font-bold text-primary mt-0.5"
                  >
                    {pillar1Desc || metric1Value}
                  </span>
                </div>

                <div
                  className="px-1.5 py-1 sm:px-2 sm:py-1.5 rounded-lg border text-center transition-colors duration-300"
                  style={{
                    backgroundColor: isAdaptive ? "rgba(255, 255, 255, 0.03)" : "#ece6dc",
                    borderColor: isAdaptive ? "var(--cf-divider)" : "#e2dbce",
                  }}
                >
                  <span
                    className="block font-mono text-[7.5px] sm:text-[8.5px] tracking-wider uppercase opacity-60"
                    style={{ color: isAdaptive ? "var(--cf-card-subtext)" : "#78716c" }}
                  >
                    {pillar2Title || metric2Label}
                  </span>
                  <span
                    className="block font-mono text-[9.5px] sm:text-[10.5px] font-bold text-primary mt-0.5"
                  >
                    {pillar2Desc || metric2Value}
                  </span>
                </div>

                <div
                  className="px-1.5 py-1 sm:px-2 sm:py-1.5 rounded-lg border text-center transition-colors duration-300"
                  style={{
                    backgroundColor: isAdaptive ? "rgba(255, 255, 255, 0.03)" : "#ece6dc",
                    borderColor: isAdaptive ? "var(--cf-divider)" : "#e2dbce",
                  }}
                >
                  <span
                    className="block font-mono text-[7.5px] sm:text-[8.5px] tracking-wider uppercase opacity-60"
                    style={{ color: isAdaptive ? "var(--cf-card-subtext)" : "#78716c" }}
                  >
                    {metric3Label}
                  </span>
                  <span
                    className="block font-mono text-[9.5px] sm:text-[10.5px] font-bold text-emerald-500 mt-0.5"
                  >
                    {metric3Value}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Footer Section */}
            <div className="pt-1.5 sm:pt-2">
              <div
                className="w-full h-px mb-1.5 sm:mb-2.5 transition-colors duration-300"
                style={{ backgroundColor: isAdaptive ? "var(--cf-divider)" : "#e5dfd4" }}
              />
              <div className="flex items-center justify-between font-mono text-[8px] sm:text-[9.5px] tracking-wider uppercase opacity-75">
                <span style={{ color: isAdaptive ? "var(--cf-card-subtext)" : "#78716c" }}>
                  ✦ {quoteAuthor || authorText}
                </span>
                <OrbitalSpirograph
                  size={16}
                  strokeWidth={1.2}
                  dotRadius={1.5}
                  className="w-[16px] h-[16px] sm:w-[22px] sm:h-[22px] opacity-80 text-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* LAYER 3: FRONT SLEEVE FLAP                                     */}
        {/* Exact matching 30px rounded corners with thumb scoop notch     */}
        {/* ============================================================== */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 20 }}
        >
          {/* The Vector Sleeve with Inward Semicircle Thumb Notch */}
          <SleeveFrontShape
            width={360}
            height={480}
            radius={30}
            notchRadius={26}
          />

          {/* Front Sleeve Surface Content */}
          <div className="relative z-10 w-full h-full flex flex-col justify-between p-3.5 sm:p-8">
            {/* Top Empty Space */}
            <div />

            {/* Center Atomic Orbital Spirograph (Enlarged & Responsive) */}
            <div className="flex items-center justify-center my-auto py-1 sm:py-2">
              <OrbitalSpirograph
                size={265}
                strokeWidth={1.3}
                dotRadius={2.2}
                className="w-[140px] h-[140px] sm:w-[265px] sm:h-[265px] transition-colors duration-300"
                style={{ color: "var(--cf-spiro)" }}
              />
            </div>

            {/* Bottom Title & Subtitle */}
            <div className="text-left pr-4 sm:pr-6">
              <h2
                className="text-[16px] sm:text-[22px] font-semibold tracking-tight leading-snug transition-colors duration-300"
                style={{ color: "var(--cf-ink)" }}
              >
                {sleeveTitle}
              </h2>
              <p
                className="text-[11px] sm:text-[13.5px] font-normal leading-relaxed mt-0.5 sm:mt-1 transition-colors duration-300"
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
