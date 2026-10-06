"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// CLASSIFIED SECURITY CREST SEAL SVG
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
        <circle
          r={86}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray="4 6"
          className="opacity-40"
        />
        <circle
          r={78}
          stroke="currentColor"
          strokeWidth={strokeWidth * 0.8}
          className="opacity-55"
        />
        <line x1="-92" y1="0" x2="-80" y2="0" stroke="currentColor" strokeWidth={strokeWidth} className="opacity-70" />
        <line x1="80" y1="0" x2="92" y2="0" stroke="currentColor" strokeWidth={strokeWidth} className="opacity-70" />
        <line x1="0" y1="-92" x2="0" y2="-80" stroke="currentColor" strokeWidth={strokeWidth} className="opacity-70" />
        <line x1="0" y1="80" x2="0" y2="92" stroke="currentColor" strokeWidth={strokeWidth} className="opacity-70" />
        <polygon
          points="0,-64 45,-45 64,0 45,45 0,64 -45,45 -64,0 -45,-45"
          stroke="currentColor"
          strokeWidth={strokeWidth * 0.85}
          className="opacity-35"
        />
        <circle
          r={48}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="opacity-65"
        />
        <circle cx="0" cy="-56" r={1.8} fill="currentColor" className="opacity-60" />
        <circle cx="56" cy="0" r={1.8} fill="currentColor" className="opacity-60" />
        <circle cx="0" cy="56" r={1.8} fill="currentColor" className="opacity-60" />
        <circle cx="-56" cy="0" r={1.8} fill="currentColor" className="opacity-60" />
        <path
          d="M 0 -26 L 20 -16 V 3 C 20 16 11 26 0 30 C -11 26 -20 16 -20 3 V -16 Z"
          stroke="currentColor"
          strokeWidth={strokeWidth * 1.3}
          strokeLinejoin="round"
          className="opacity-85"
        />
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

export const OrbitalSpirograph = ClassifiedSeal;

// ============================================================================
// HYPERBOLT EXPRESS BULLET TRAIN LOGO & WATERMARK SVGS
// ============================================================================
export function HyperboltTrainLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 56"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("select-none pointer-events-none", className)}
    >
      {/* 5 Aerodynamic Speed Streak Fins */}
      <path d="M 0 32 L 62 32 L 65 28 L 5 28 Z" opacity="0.95" />
      <path d="M 10 24 L 68 24 L 71 20 L 15 20 Z" opacity="0.95" />
      <path d="M 22 16 L 76 16 L 79 12 L 28 12 Z" opacity="0.95" />
      <path d="M 38 8 L 84 8 L 87 4 L 44 4 Z" opacity="0.95" />
      <path d="M 54 2 L 92 2 L 94 0 L 58 0 Z" opacity="0.95" />

      {/* Main Bullet Locomotive Body */}
      <path
        d="M 65 32 L 115 32 C 128 32, 138 28, 144 22 C 147 19, 149 14, 145 11 C 137 3, 118 0, 92 0 L 58 0 L 65 32 Z"
      />

      {/* Cockpit Windshield */}
      <path
        d="M 120 14 C 130 14, 136 18, 138 20 C 133 22, 126 22, 120 22 Z"
        className="fill-background"
      />

      {/* Wheel Tracks & Undercarriage */}
      <rect x="72" y="34" width="7" height="2" rx="1" />
      <rect x="88" y="34" width="7" height="2" rx="1" />
      <rect x="106" y="34" width="7" height="2" rx="1" />
      <line x1="60" y1="38" x2="132" y2="38" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function TrainWatermark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 56"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none select-none", className)}
    >
      <path d="M 0 32 L 62 32 L 65 28 L 5 28 Z" />
      <path d="M 10 24 L 68 24 L 71 20 L 15 20 Z" />
      <path d="M 22 16 L 76 16 L 79 12 L 28 12 Z" />
      <path d="M 38 8 L 84 8 L 87 4 L 44 4 Z" />
      <path d="M 65 32 L 115 32 C 128 32, 138 28, 144 22 C 147 19, 149 14, 145 11 C 137 3, 118 0, 92 0 L 58 0 L 65 32 Z" />
    </svg>
  );
}

export function HyperboltSleeveSeal({
  className,
  style,
  size = 240,
}: {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
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
        {/* Outer Dotted Speed Orbit */}
        <circle r="86" stroke="currentColor" strokeWidth="1.4" strokeDasharray="4 6" className="opacity-40" />
        <circle r="78" stroke="currentColor" strokeWidth="1" className="opacity-50" />

        {/* Speed Rays */}
        <line x1="-92" y1="0" x2="-80" y2="0" stroke="currentColor" strokeWidth="1.5" className="opacity-70" />
        <line x1="80" y1="0" x2="92" y2="0" stroke="currentColor" strokeWidth="1.5" className="opacity-70" />
        <line x1="0" y1="-92" x2="0" y2="-80" stroke="currentColor" strokeWidth="1.5" className="opacity-70" />
        <line x1="0" y1="80" x2="0" y2="92" stroke="currentColor" strokeWidth="1.5" className="opacity-70" />

        {/* Center Bullet Train Silhouette */}
        <g transform="translate(-40, -14) scale(0.55)">
          <path d="M 0 32 L 62 32 L 65 28 L 5 28 Z" fill="currentColor" opacity="0.9" />
          <path d="M 10 24 L 68 24 L 71 20 L 15 20 Z" fill="currentColor" opacity="0.9" />
          <path d="M 22 16 L 76 16 L 79 12 L 28 12 Z" fill="currentColor" opacity="0.9" />
          <path d="M 38 8 L 84 8 L 87 4 L 44 4 Z" fill="currentColor" opacity="0.9" />
          <path d="M 65 32 L 115 32 C 128 32, 138 28, 144 22 C 147 19, 149 14, 145 11 C 137 3, 118 0, 92 0 L 58 0 L 65 32 Z" fill="currentColor" />
          <circle cx="125" cy="18" r="3" className="fill-background" />
          <rect x="72" y="34" width="7" height="2" rx="1" fill="currentColor" />
          <rect x="88" y="34" width="7" height="2" rx="1" fill="currentColor" />
          <rect x="106" y="34" width="7" height="2" rx="1" fill="currentColor" />
          <line x1="60" y1="38" x2="132" y2="38" stroke="currentColor" strokeWidth="2" />
        </g>

        {/* Outer Circular Train Track Markers */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <circle
            key={i}
            cx={70 * Math.cos((angle * Math.PI) / 180)}
            cy={70 * Math.sin((angle * Math.PI) / 180)}
            r={1.8}
            fill="currentColor"
            className="opacity-60"
          />
        ))}
      </g>
    </svg>
  );
}

export function VerticalBarcode({
  code = "0 734664 235788",
  className,
}: {
  code?: string;
  className?: string;
}) {
  const bars = [2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1, 3, 2, 1, 2, 3];
  return (
    <div className={cn("flex items-center gap-0.5 select-none", className)}>
      <div className="flex flex-col gap-[1.2px] min-[400px]:gap-[1.5px] sm:gap-[2.2px] h-16 min-[400px]:h-20 sm:h-32 justify-between">
        {bars.map((w, i) => (
          <div
            key={i}
            className="w-full bg-foreground rounded-full transition-colors duration-300"
            style={{ height: `${w * 0.75}px` }}
          />
        ))}
      </div>
      <span className="[writing-mode:vertical-lr] rotate-180 font-mono text-[4.5px] min-[400px]:text-[5.5px] sm:text-[8px] font-semibold text-foreground/80 tracking-wider transition-colors duration-300">
        {code}
      </span>
    </div>
  );
}

// ============================================================================
// TYPES & PROPS
// ============================================================================
export type ConfidentialFolderInteractionMode = "auto-flip" | "step-flip";
export type ConfidentialFolderCardDesign = "classified" | "train-ticket";

export interface CouponMetric {
  label: string;
  value: string;
}

export interface CouponCardData {
  // Sleeve info
  sleeveTitle?: string;
  sleeveSubtitle?: string;

  // Train Ticket Specific Fields
  ticketTitle?: string;
  passengerName?: string;
  routeText?: string;
  date?: string;
  departureTime?: string;
  seatNumber?: string;
  trainNumber?: string;
  trainCompany?: string;
  slogan?: string;
  barcodeNumber?: string;
  websiteUrl?: string;

  // Face 1: Front Cover / Voucher Pass (General & Classified)
  frontBadge?: string;
  frontSerial?: string;
  frontTitle?: string;
  frontSubtitle?: string;
  frontStamp?: string;
  stampSuffix?: string;
  barcodeText?: string;
  clearanceLevel?: string;

  // Face 2: Back Details / Manifesto (General & Classified)
  cardCategory?: string;
  cardDate?: string;
  cardTitle?: string;
  cardSubtitle?: string;
  statement?: string;
  highlightQuote?: string;
  authorText?: string;

  // Metrics (array or individual fields)
  metrics?: CouponMetric[];
  metric1Label?: string;
  metric1Value?: string;
  metric2Label?: string;
  metric2Value?: string;
  metric3Label?: string;
  metric3Value?: string;

  // Positioning
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
}

export type ConfidentialFolderData = CouponCardData;

export interface ConfidentialFolderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Structured data object or array for all ticket, voucher, and card fields. */
  data?: CouponCardData | CouponCardData[];
  folderColor?: string;
  interactionMode?: ConfidentialFolderInteractionMode;
  mode?: ConfidentialFolderInteractionMode;
  variant?: ConfidentialFolderInteractionMode;
  cardDesign?: ConfidentialFolderCardDesign;
  cardType?: ConfidentialFolderCardDesign;
  designVariant?: ConfidentialFolderCardDesign;
  sleeveTitle?: string;
  sleeveSubtitle?: string;
  // Train Ticket Specific Props (Matching Exact User Reference)
  passengerName?: string;
  routeText?: string;
  date?: string;
  departureTime?: string;
  seatNumber?: string;
  trainNumber?: string;
  trainCompany?: string;
  slogan?: string;
  barcodeNumber?: string;
  websiteUrl?: string;
  ticketTitle?: string;
  // Face 1: Front Cover / Voucher Pass (General & Classified)
  frontBadge?: string;
  frontSerial?: string;
  frontTitle?: string;
  frontSubtitle?: string;
  frontStamp?: string;
  stampSuffix?: string;
  barcodeText?: string;
  clearanceLevel?: string;
  // Face 2: Back Details / Manifesto (General & Classified)
  cardCategory?: string;
  cardDate?: string;
  cardTitle?: string;
  cardSubtitle?: string;
  statement?: string;
  highlightQuote?: string;
  authorText?: string;
  metrics?: CouponMetric[];
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
  data,
  folderColor,
  interactionMode = "step-flip",
  mode,
  variant,
  cardDesign = "classified",
  cardType,
  designVariant,
  centerIcon,
  sleeveTitle,
  sleeveSubtitle,
  // Train Ticket Reference Defaults (1:1 with Reference Image)
  passengerName = "Barbara M. Sandoval",
  routeText = "ZÜRICH HB - PARIS-EST",
  date = "25/11/2024",
  departureTime = "06.30",
  seatNumber = "18A",
  trainNumber = "6",
  trainCompany = "HYPERBOLT EXPRESS",
  slogan = "UNLEASH THE POWER OF SPEED WITH HYPERBOLT EXPRESS",
  barcodeNumber = "0 734664 235788",
  websiteUrl = "HYPERBOLTEXPRESS.COM",
  ticketTitle = "TRAIN ONLINE TICKET",
  // Classified Defaults
  frontBadge,
  frontSerial,
  frontTitle,
  frontSubtitle,
  frontStamp,
  stampSuffix,
  barcodeText,
  clearanceLevel,
  cardCategory,
  cardDate,
  cardTitle,
  cardSubtitle,
  statement,
  highlightQuote,
  authorText,
  metrics,
  metric1Label,
  metric1Value,
  metric2Label,
  metric2Value,
  metric3Label,
  metric3Value,
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

  const activeDesign: ConfidentialFolderCardDesign =
    cardType ?? designVariant ?? cardDesign ?? "classified";

  const isTrainTicket = activeDesign === "train-ticket";

  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isHovered, setIsHovered] = useState(false);

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

  const [cardZIndex, setCardZIndex] = useState(defaultOpen ? 30 : 10);
  const isTransitioningRef = useRef(false);

  const handleToggle = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    if (activeMode === "step-flip") {
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

  const activeData = Array.isArray(data) ? data[0] : data;

  const resolvedPassengerName = activeData?.passengerName ?? passengerName;
  const resolvedRouteText = activeData?.routeText ?? routeText;
  const resolvedDate = activeData?.date ?? date;
  const resolvedDepartureTime = activeData?.departureTime ?? departureTime;
  const resolvedSeatNumber = activeData?.seatNumber ?? seatNumber;
  const resolvedTrainNumber = activeData?.trainNumber ?? trainNumber;
  const resolvedTrainCompany = activeData?.trainCompany ?? trainCompany;
  const resolvedSlogan = activeData?.slogan ?? slogan;
  const resolvedBarcodeNumber = activeData?.barcodeNumber ?? barcodeNumber;
  const resolvedWebsiteUrl = activeData?.websiteUrl ?? websiteUrl;
  const resolvedTicketTitle = activeData?.ticketTitle ?? ticketTitle;

  const resolvedInitialPeek = activeData?.initialPeek ?? initialPeek;
  const resolvedHoverPeek = activeData?.hoverPeek ?? hoverPeek;

  // Resolved Sleeve Text
  const resolvedSleeveTitle =
    activeData?.sleeveTitle ??
    sleeveTitle ??
    (isTrainTicket ? "Hyperbolt Express" : "Designed to endure");
  const resolvedSleeveSubtitle =
    activeData?.sleeveSubtitle ??
    sleeveSubtitle ??
    (isTrainTicket
      ? "High-speed European rail transit pass."
      : "Crafted for those who value timeless clarity.");

  // Classified Mode Labels
  const fBadge =
    activeData?.frontBadge ??
    frontBadge ??
    activeData?.cardBadge ??
    cardBadge ??
    activeData?.sessionLabel ??
    sessionLabel ??
    "SPECIAL OFFER";
  const fSerial =
    activeData?.frontSerial ??
    frontSerial ??
    activeData?.cardVersion ??
    cardVersion ??
    activeData?.sessionNumber ??
    sessionNumber ??
    "VOUCHER // 2026-X";
  const fTitle =
    activeData?.frontTitle ??
    frontTitle ??
    activeData?.cardTitle ??
    cardTitle ??
    "Exclusive Access";
  const fSubtitle =
    activeData?.frontSubtitle ??
    frontSubtitle ??
    activeData?.cardSubtitle ??
    cardSubtitle ??
    "Limited edition membership and premium reward voucher.";
  const fStamp = activeData?.frontStamp ?? frontStamp ?? "VERIFIED";
  const fStampSuffix = activeData?.stampSuffix ?? stampSuffix ?? "// VIP PASS";
  const fBarcode =
    activeData?.barcodeText ?? barcodeText ?? "COUPON // APEX-07-CORE";
  const fStatus =
    activeData?.clearanceLevel ??
    clearanceLevel ??
    activeData?.statusText ??
    statusText ??
    "REWARD STATUS: ACTIVE";

  const bCategory =
    activeData?.cardCategory ??
    cardCategory ??
    activeData?.cardBadge ??
    cardBadge ??
    activeData?.sessionLabel ??
    sessionLabel ??
    "COUPON VOUCHER";
  const bDate =
    activeData?.cardDate ??
    cardDate ??
    activeData?.cardVersion ??
    cardVersion ??
    activeData?.sessionNumber ??
    sessionNumber ??
    "VALID // 2026";
  const bTitle =
    activeData?.cardTitle ??
    cardTitle ??
    activeData?.frontTitle ??
    frontTitle ??
    "The Art of Craft";
  const bSubtitle =
    activeData?.cardSubtitle ??
    cardSubtitle ??
    activeData?.frontSubtitle ??
    frontSubtitle ??
    "Foundational reward tier for premium members.";
  const bStatement =
    activeData?.statement ??
    statement ??
    activeData?.quote ??
    quote ??
    "Redeem this exclusive voucher across any tier. Every detail is crafted with perfection to bring maximum value to your workflow.";
  const bHighlight =
    activeData?.highlightQuote ??
    highlightQuote ??
    activeData?.subquote ??
    subquote ??
    "Unlock 50% off on all annual pro plans.";
  const bAuthor =
    activeData?.authorText ??
    authorText ??
    activeData?.quoteAuthor ??
    quoteAuthor ??
    "PRO MEMBERSHIP";
  const m1L =
    activeData?.metrics?.[0]?.label ??
    activeData?.metric1Label ??
    metric1Label ??
    pillar1Title ??
    "DISCOUNT";
  const m1V =
    activeData?.metrics?.[0]?.value ??
    activeData?.metric1Value ??
    metric1Value ??
    pillar1Desc ??
    "50% OFF";
  const m2L =
    activeData?.metrics?.[1]?.label ??
    activeData?.metric2Label ??
    metric2Label ??
    pillar2Title ??
    "TIER";
  const m2V =
    activeData?.metrics?.[1]?.value ??
    activeData?.metric2Value ??
    metric2Value ??
    pillar2Desc ??
    "VIP Elite";
  const m3L =
    activeData?.metrics?.[2]?.label ??
    activeData?.metric3Label ??
    metric3Label ??
    "STATUS";
  const m3V =
    activeData?.metrics?.[2]?.value ??
    activeData?.metric3Value ??
    metric3Value ??
    "Active";

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
          --cf-initial-peek: ${Math.round(resolvedInitialPeek * 0.35)}px;
          --cf-hover-peek: ${Math.round(resolvedHoverPeek * 0.35)}px;
          --cf-base: var(--cf-override, var(--primary, #0284c7));
          --cf-flap: ${isTrainTicket ? "oklch(from var(--cf-base) 0.93 calc(c * 0.25) h)" : "oklch(from var(--cf-base) 0.88 calc(c * 0.4) h)"};
          --cf-plate: ${isTrainTicket ? "oklch(from var(--cf-base) 0.82 calc(c * 0.35) h)" : "oklch(from var(--cf-base) 0.80 calc(c * 0.5) h)"};
          --cf-ink: ${isTrainTicket ? "oklch(from var(--cf-base) 0.15 calc(c * 0.6) h)" : "oklch(from var(--cf-base) 0.22 calc(c * 0.5) h)"};
          --cf-ink-muted: ${isTrainTicket ? "oklch(from var(--cf-base) 0.35 calc(c * 0.35) h)" : "oklch(from var(--cf-base) 0.45 calc(c * 0.35) h)"};
          --cf-spiro: oklch(from var(--cf-base) 0.38 calc(c * 0.5) h / 0.75);
          --cf-stroke-flap: oklch(from var(--cf-base) 0.68 calc(c * 0.3) h / 0.5);
          --cf-stroke-plate: oklch(from var(--cf-base) 0.60 calc(c * 0.3) h / 0.4);
          --cf-card-bg: var(--card, #ffffff);
          --cf-card-border: var(--border, rgba(0, 0, 0, 0.12));
          --cf-card-text: var(--foreground, #0f172a);
          --cf-card-subtext: var(--muted-foreground, #64748b);
          --cf-divider: var(--border, rgba(0, 0, 0, 0.12));
        }
        @media (min-width: 640px) {
          .cf-theme-scope {
            --cf-sleeve-shift: 0px;
            --cf-initial-peek: ${resolvedInitialPeek}px;
            --cf-hover-peek: ${resolvedHoverPeek}px;
          }
        }
        :is(.dark, .dark *) .cf-theme-scope,
        .cf-theme-scope:is(.dark, .dark *) {
          --cf-flap: ${isTrainTicket ? "oklch(from var(--cf-base) 0.22 calc(c * 0.35) h)" : "oklch(from var(--cf-base) 0.22 calc(c * 0.35) h)"};
          --cf-plate: ${isTrainTicket ? "oklch(from var(--cf-base) 0.15 calc(c * 0.25) h)" : "oklch(from var(--cf-base) 0.15 calc(c * 0.25) h)"};
          --cf-ink: #ffffff;
          --cf-ink-muted: oklch(from var(--cf-base) 0.82 calc(c * 0.12) h);
          --cf-spiro: oklch(from var(--cf-base) 0.85 calc(c * 0.35) h / 0.85);
          --cf-stroke-flap: rgba(255, 255, 255, 0.16);
          --cf-stroke-plate: rgba(255, 255, 255, 0.08);
          --cf-card-bg: var(--card, oklch(from var(--cf-base) 0.16 calc(c * 0.15) h));
          --cf-card-border: var(--border, rgba(255, 255, 255, 0.12));
          --cf-card-text: #ffffff;
          --cf-card-subtext: oklch(from var(--cf-base) 0.80 calc(c * 0.08) h);
          --cf-divider: rgba(255, 255, 255, 0.12);
        }
      `}</style>

      {/* Interactive Sleeve Wrapper with Global Border Radius */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-label={`${resolvedSleeveTitle} coupon card. Click to ${isOpen ? "close" : "open"}`}
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
          "relative w-[160px] min-[400px]:w-[185px] sm:w-[360px] h-[215px] min-[400px]:h-[247px] sm:h-[480px] cursor-pointer outline-none select-none shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_20px_rgba(0,0,0,0.35)]",
          "focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-4 focus-visible:ring-offset-background",
          sleeveClassName
        )}
      >
        {/* ============================================================== */}
        {/* LAYER 1: BACK PLATE (Folder Sleeve Backing)                     */}
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
        {/* LAYER 2: THE CARD (Dual-Sided 3D Flipping Ticket)              */}
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
            "pointer-events-auto",
            cardClassName
          )}
        >
          {/* ============================================================ */}
          {/* FACE 1: FRONT FACE OF TICKET (Left side in user's image)     */}
          {/* ============================================================ */}
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              borderRadius: "calc(var(--radius, 1.25rem) - 2px)",
              color: isAdaptive ? "var(--cf-card-text)" : "#0f172a",
            }}
            className={cn(
              "absolute inset-0 shadow-[0_0_14px_rgba(0,0,0,0.07)] dark:shadow-[0_0_16px_rgba(0,0,0,0.35)] flex flex-col justify-between select-none transition-colors duration-300",
              isTrainTicket ? "p-0 bg-transparent border-0" : "p-2 min-[400px]:p-2.5 sm:p-5 border bg-card border-border"
            )}
          >
            {isTrainTicket ? (
              /* -------------------------------------------------------- */
              /* EXACT 1:1 REPLICA OF LEFT TICKET (FRONT FACE)            */
              /* -------------------------------------------------------- */
              <div className="relative w-full h-full flex flex-col justify-between text-foreground select-none">
                {/* 100% Vector Card Shell with Inward Curved Notch Borders (All-Time Transparent Cutouts) */}
                <svg
                  viewBox="0 0 340 440"
                  preserveAspectRatio="none"
                  className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible text-border/80"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 16 0 L 324 0 A 16 16 0 0 1 340 16 L 340 266 A 14 14 0 0 0 340 294 L 340 424 A 16 16 0 0 1 324 440 L 16 440 A 16 16 0 0 1 0 424 L 0 294 A 14 14 0 0 0 0 266 L 0 16 A 16 16 0 0 1 16 0 Z"
                    className="fill-card transition-colors duration-300"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                {/* Card Content (Layered over the SVG Shell) */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between">
                  {/* Upper Section */}
                  <div>
                    {/* 1. Top Blue/Primary Pill Banner Tab */}
                    <div className="w-full flex justify-center px-3 pt-1.5 sm:pt-3">
                      <div className="w-full sm:w-[94%] py-1 sm:py-2 px-2 rounded-b-xl sm:rounded-b-2xl bg-primary text-primary-foreground text-center font-sans font-black tracking-wider text-[7px] min-[400px]:text-[8.5px] sm:text-[14px] uppercase shadow-xs transition-colors duration-300">
                        {resolvedTicketTitle}
                      </div>
                    </div>

                    {/* 2. Upper Passenger & Trip Info Grid */}
                    <div className="px-3 min-[400px]:px-4 sm:px-6 py-1 sm:py-2 flex items-center justify-between">
                      <div className="flex flex-col text-left space-y-1 sm:space-y-2">
                        {/* Passenger Name */}
                        <div>
                          <span className="block font-sans text-[4.5px] min-[400px]:text-[5.5px] sm:text-[9px] font-bold text-muted-foreground uppercase tracking-wide">
                            PASSENGER NAME
                          </span>
                          <span className="block font-sans text-[6px] min-[400px]:text-[7.5px] sm:text-[13px] font-semibold text-foreground leading-tight">
                            {resolvedPassengerName}
                          </span>
                        </div>

                        {/* Date & Departure */}
                        <div className="flex items-center gap-2 sm:gap-6">
                          <div>
                            <span className="block font-sans text-[4.5px] min-[400px]:text-[5.5px] sm:text-[8.5px] font-bold text-muted-foreground uppercase">
                              DATE
                            </span>
                            <span className="block font-sans text-[5.5px] min-[400px]:text-[7px] sm:text-[11.5px] font-medium text-foreground">
                              {resolvedDate}
                            </span>
                          </div>
                          <div>
                            <span className="block font-sans text-[4.5px] min-[400px]:text-[5.5px] sm:text-[8.5px] font-bold text-muted-foreground uppercase">
                              DEPARTURE
                            </span>
                            <span className="block font-sans text-[5.5px] min-[400px]:text-[7px] sm:text-[11.5px] font-medium text-foreground">
                              {resolvedDepartureTime}
                            </span>
                          </div>
                        </div>

                        {/* Seat & Train */}
                        <div className="flex items-center gap-3 sm:gap-8">
                          <div>
                            <span className="block font-sans text-[4.5px] min-[400px]:text-[5.5px] sm:text-[8.5px] font-bold text-muted-foreground uppercase">
                              SEAT
                            </span>
                            <span className="block font-sans text-[8px] min-[400px]:text-[10px] sm:text-[17px] font-black text-foreground leading-none mt-0.5">
                              {resolvedSeatNumber}
                            </span>
                          </div>
                          <div>
                            <span className="block font-sans text-[4.5px] min-[400px]:text-[5.5px] sm:text-[8.5px] font-bold text-muted-foreground uppercase">
                              TRAIN
                            </span>
                            <span className="block font-sans text-[8px] min-[400px]:text-[10px] sm:text-[17px] font-black text-foreground leading-none mt-0.5">
                              {resolvedTrainNumber}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Vertical Barcode on Right */}
                      <div className="shrink-0 pl-1">
                        <VerticalBarcode code={resolvedBarcodeNumber} />
                      </div>
                    </div>

                    {/* 3. Middle Primary Station Banner with Watermark */}
                    <div className="relative w-full bg-primary py-1 sm:py-2.5 px-3 flex items-center justify-center overflow-hidden transition-colors duration-300">
                      <TrainWatermark className="absolute inset-0 w-full h-full object-cover text-primary-foreground opacity-30" />
                      <span className="relative z-10 text-primary-foreground font-sans font-black tracking-wider text-[8px] min-[400px]:text-[10px] sm:text-[16px] uppercase truncate drop-shadow-xs">
                        {resolvedRouteText}
                      </span>
                    </div>
                  </div>

                  {/* Dotted Perforation Line (Extends seamlessly from Left Notch to Right Notch) */}
                  <div className="relative w-full flex items-center justify-between px-3 sm:px-4 my-auto select-none">
                    <div className="w-full border-t-2 border-dotted border-border/80" />
                  </div>

                  {/* 4. Bottom Tear-Off Stub (Lower Section) */}
                  <div className="px-3 min-[400px]:px-4 sm:px-6 pb-2 pt-0.5 sm:pb-3.5 flex flex-col justify-between">
                    {/* Mini Primary banner */}
                    <div className="w-full bg-primary text-primary-foreground text-center font-sans font-bold tracking-wider text-[5px] min-[400px]:text-[6.5px] sm:text-[10.5px] py-0.5 sm:py-1 rounded-sm uppercase mb-1 transition-colors duration-300">
                      {resolvedTicketTitle}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col space-y-0.5 sm:space-y-1">
                        <div>
                          <span className="block font-sans text-[4px] min-[400px]:text-[5px] sm:text-[7.5px] font-bold text-muted-foreground uppercase">
                            PASSENGER NAME
                          </span>
                          <span className="block font-sans text-[5px] min-[400px]:text-[6.5px] sm:text-[10.5px] font-semibold text-foreground">
                            {resolvedPassengerName}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 sm:gap-3 text-[4px] min-[400px]:text-[5px] sm:text-[8px] text-muted-foreground">
                          <div>
                            <span className="font-bold text-foreground">SEAT:</span> {resolvedSeatNumber}
                          </div>
                          <div>
                            <span className="font-bold text-foreground">TRAIN:</span> {resolvedTrainNumber}
                          </div>
                          <div>
                            <span className="font-bold text-foreground">DATE:</span> {resolvedDate}
                          </div>
                        </div>

                        {/* Solid Station Badge */}
                        <div className="mt-0.5 sm:mt-1 bg-zinc-950 dark:bg-black text-white px-1 sm:px-2 py-0.5 rounded-sm font-sans font-bold text-[5px] min-[400px]:text-[6px] sm:text-[9.5px] tracking-wider uppercase inline-block">
                          {resolvedRouteText}
                        </div>
                      </div>

                      {/* Mini Vertical Barcode */}
                      <div className="shrink-0 pl-1">
                        <VerticalBarcode code={resolvedBarcodeNumber} className="scale-75 sm:scale-90 origin-right" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* -------------------------------------------------------- */
              /* CLASSIFIED DOSSIER FACE 1 (Voucher Pass & Clearance)     */
              /* -------------------------------------------------------- */
              <>
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

                <div className="my-auto py-0.5 min-[400px]:py-1 sm:py-2 flex flex-col items-center justify-center">
                  <div
                    className={cn(
                      "px-1.5 min-[400px]:px-2 sm:px-3.5 py-0.5 min-[400px]:py-1 sm:py-1.5 rounded-md border-2 border-dashed font-mono font-bold text-[6.5px] min-[400px]:text-[8px] sm:text-[12px] tracking-[0.1em] sm:tracking-[0.2em] uppercase select-none transform -rotate-2 shadow-[0_0_6px_rgba(244,63,94,0.12)]",
                      "border-rose-500/80 text-rose-600 dark:border-rose-400/80 dark:text-rose-400 bg-rose-500/5"
                    )}
                  >
                    {fStamp} {fStampSuffix}
                  </div>
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
              </>
            )}
          </div>

          {/* ============================================================ */}
          {/* FACE 2: BACK FACE OF TICKET (Right side in user's image)     */}
          {/* ============================================================ */}
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderRadius: "calc(var(--radius, 1.25rem) - 2px)",
              color: isAdaptive ? "var(--cf-card-text)" : "#0f172a",
            }}
            className={cn(
              "absolute inset-0 shadow-[0_0_14px_rgba(0,0,0,0.07)] dark:shadow-[0_0_16px_rgba(0,0,0,0.35)] flex flex-col justify-between select-none transition-colors duration-300",
              isTrainTicket ? "p-0 bg-transparent border-0" : "p-2 min-[400px]:p-2.5 sm:p-5 border bg-card border-border"
            )}
          >
            {isTrainTicket ? (
              /* -------------------------------------------------------- */
              /* EXACT 1:1 REPLICA OF RIGHT TICKET (BACK FACE)            */
              /* -------------------------------------------------------- */
              <div className="relative w-full h-full flex flex-col justify-between text-foreground select-none">
                {/* 100% Vector Card Shell with Inward Curved Notch Borders (All-Time Transparent Cutouts) */}
                <svg
                  viewBox="0 0 340 440"
                  preserveAspectRatio="none"
                  className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible text-border/80"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Top Half: Card background */}
                  <path
                    d="M 16 0 L 324 0 A 16 16 0 0 1 340 16 L 340 216 A 14 14 0 0 0 340 244 L 340 244 L 0 244 L 0 244 A 14 14 0 0 0 0 216 L 0 16 A 16 16 0 0 1 16 0 Z"
                    className="fill-card transition-colors duration-300"
                  />
                  {/* Bottom Half: Primary Blue background */}
                  <path
                    d="M 0 244 L 340 244 L 340 424 A 16 16 0 0 1 324 440 L 16 440 A 16 16 0 0 1 0 424 Z"
                    className="fill-primary transition-colors duration-300"
                  />
                  {/* Full Continuous Outer Perimeter Stroke with Inward Curved Notch Arcs */}
                  <path
                    d="M 16 0 L 324 0 A 16 16 0 0 1 340 16 L 340 216 A 14 14 0 0 0 340 244 L 340 424 A 16 16 0 0 1 324 440 L 16 440 A 16 16 0 0 1 0 424 L 0 244 A 14 14 0 0 0 0 216 L 0 16 A 16 16 0 0 1 16 0 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                {/* Card Content (Layered over the SVG Shell) */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between">
                  {/* Upper White/Card Section: Train Logo & Slogan */}
                  <div className="p-3 min-[400px]:p-4 sm:p-8 flex flex-col items-center justify-center text-center my-auto">
                    <HyperboltTrainLogo className="w-16 min-[400px]:w-20 sm:w-36 text-foreground transition-colors duration-300" />
                    <h3 className="font-sans font-black text-[8px] min-[400px]:text-[10px] sm:text-[16px] tracking-wider text-foreground uppercase mt-1 sm:mt-2 transition-colors duration-300">
                      {resolvedTrainCompany}
                    </h3>
                    <p className="font-sans font-semibold text-[5px] min-[400px]:text-[6.5px] sm:text-[10.5px] tracking-wide text-muted-foreground uppercase max-w-[120px] min-[400px]:max-w-[150px] sm:max-w-[240px] mt-1 sm:mt-2 leading-tight transition-colors duration-300">
                      {resolvedSlogan}
                    </p>
                  </div>

                  {/* Dotted Perforation Line (Extends seamlessly from Left Notch to Right Notch) */}
                  <div className="relative w-full flex items-center justify-between px-3 sm:px-4 my-0 select-none z-20">
                    <div className="w-full border-t-2 border-dotted border-border/80" />
                  </div>

                  {/* Lower Primary Banner Section with Station Name */}
                  <div className="relative w-full p-2.5 min-[400px]:p-3 sm:p-6 flex flex-col items-center justify-center overflow-hidden">
                    <TrainWatermark className="absolute inset-0 w-full h-full object-cover text-primary-foreground opacity-30" />

                    {/* Black Station Box */}
                    <div className="relative z-10 w-full bg-zinc-950 dark:bg-black text-white py-1 sm:py-2 px-2 text-center rounded-sm shadow-md">
                      <span className="font-sans font-bold text-[7px] min-[400px]:text-[8.5px] sm:text-[14px] uppercase tracking-wider">
                        {resolvedRouteText}
                      </span>
                    </div>

                    {/* Website link */}
                    <span className="relative z-10 font-sans text-[4px] min-[400px]:text-[5px] sm:text-[8px] text-primary-foreground/90 uppercase tracking-widest mt-1 sm:mt-2 font-semibold">
                      {resolvedWebsiteUrl}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              /* -------------------------------------------------------- */
              /* CLASSIFIED DOSSIER FACE 2 (Editorial Manifesto & Metrics)*/
              /* -------------------------------------------------------- */
              <>
                <div>
                  <div className="flex items-center justify-between font-mono text-[6px] min-[400px]:text-[7.5px] sm:text-[10.5px] font-semibold tracking-wider">
                    <div className="flex items-center gap-1 sm:gap-1.5 text-primary">
                      <span className="w-1 h-1 min-[400px]:w-1.5 min-[400px]:h-1.5 rounded-full bg-primary" />
                      <span>{bCategory}</span>
                    </div>
                    <span className="opacity-60 font-mono text-[5.5px] min-[400px]:text-[7px] sm:text-[10px] tracking-wide">
                      {bDate}
                    </span>
                  </div>
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
                  <div
                    className="w-full h-px my-0.5 min-[400px]:my-1 sm:my-3 transition-colors duration-300"
                    style={{ backgroundColor: isAdaptive ? "var(--cf-divider)" : "#e5dfd4" }}
                  />
                  <p
                    className="text-[6px] min-[400px]:text-[7.5px] sm:text-[12.5px] leading-tight sm:leading-relaxed transition-colors duration-300 line-clamp-2 sm:line-clamp-none"
                    style={{ color: isAdaptive ? "var(--cf-card-subtext)" : "#44403c" }}
                  >
                    {bStatement}
                  </p>
                  <div className="mt-0.5 min-[400px]:mt-1 sm:mt-3 px-1.5 min-[400px]:px-2 sm:px-3 py-0.5 min-[400px]:py-1 sm:py-2 rounded-lg border-l-2 border-primary bg-primary/[0.04] transition-colors duration-300">
                    <p
                      className="italic text-[6px] min-[400px]:text-[7.5px] sm:text-[12px] font-medium leading-tight sm:leading-snug line-clamp-2 sm:line-clamp-none"
                      style={{ color: isAdaptive ? "var(--cf-card-text)" : "#1c1917" }}
                    >
                      &ldquo;{bHighlight}&rdquo;
                    </p>
                  </div>
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
                      <span className="block font-mono text-[6px] min-[400px]:text-[7.5px] sm:text-[10.5px] font-bold text-primary mt-0.5">
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
                      <span className="block font-mono text-[6px] min-[400px]:text-[7.5px] sm:text-[10.5px] font-bold text-primary mt-0.5">
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
                      <span className="block font-mono text-[6px] min-[400px]:text-[7.5px] sm:text-[10.5px] font-bold text-emerald-500 mt-0.5">
                        {m3V}
                      </span>
                    </div>
                  </div>
                </div>

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
              </>
            )}
          </div>
        </div>

        {/* ============================================================== */}
        {/* LAYER 3: FRONT SLEEVE FLAP (CARD BOX DESIGN)                   */}
        {/* Custom styled envelope box matching the Train Ticket aesthetic  */}
        {/* ============================================================== */}
        {/* 3A. Flap Background Plate with Thumb Notch Scoop Mask */}
        <div
          className="absolute inset-0 pointer-events-none border transition-colors duration-300"
          style={{
            zIndex: 20,
            borderRadius: "var(--radius, 1.25rem)",
            backgroundColor: "var(--cf-flap)",
            borderColor: "var(--cf-stroke-flap)",
            maskImage:
              "radial-gradient(circle 24px at 100% 50%, transparent 23px, black 24px)",
            WebkitMaskImage:
              "radial-gradient(circle 24px at 100% 50%, transparent 23px, black 24px)",
          }}
        />

        {/* 3B. Flap Surface Content Layer (UNMASKED -> 100% CRISP VECTOR TYPOGRAPHY, ZERO BLUR) */}
        <div
          className="absolute inset-0 pointer-events-none flex flex-col justify-between p-2 min-[400px]:p-3 sm:p-8 select-none"
          style={{ zIndex: 22 }}
        >
          {/* Top Floating Badge */}
          <div className="flex items-center justify-between">
            {isTrainTicket ? (
              <div
                className="px-2.5 py-0.5 sm:py-1 rounded-full font-sans text-[5px] min-[400px]:text-[6.5px] sm:text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs border transition-colors duration-300 shadow-xs"
                style={{
                  backgroundColor: "var(--cf-card-bg)",
                  color: "var(--cf-ink)",
                  borderColor: "var(--cf-stroke-flap)",
                }}
              >
                ✦ {trainCompany}
              </div>
            ) : (
              <div />
            )}
          </div>

          {/* Center Emblem Seal */}
          <div className="flex items-center justify-center my-auto py-1 sm:py-2">
            {centerIcon ? (
              <div className="w-[80px] h-[80px] min-[400px]:w-[105px] min-[400px]:h-[105px] sm:w-[265px] sm:h-[265px] flex items-center justify-center transition-colors duration-300">
                {centerIcon}
              </div>
            ) : isTrainTicket ? (
              <HyperboltSleeveSeal
                size={265}
                className="w-[80px] h-[80px] min-[400px]:w-[105px] min-[400px]:h-[105px] sm:w-[265px] sm:h-[265px] transition-colors duration-300 drop-shadow-xs"
                style={{ color: "var(--cf-spiro)" }}
              />
            ) : (
              <ClassifiedSeal
                size={265}
                strokeWidth={1.3}
                className="w-[80px] h-[80px] min-[400px]:w-[105px] min-[400px]:h-[105px] sm:w-[265px] sm:h-[265px] transition-colors duration-300"
                style={{ color: "var(--cf-spiro)" }}
              />
            )}
          </div>

          {/* Bottom Title & Subtitle with Crystal Clear High Contrast Vector Typography */}
          <div className="text-left w-full pr-1 sm:pr-4 overflow-hidden">
            <h2
              className="text-[11px] min-[400px]:text-[13.5px] sm:text-[23px] font-bold tracking-tight leading-tight transition-colors duration-300 whitespace-nowrap truncate drop-shadow-xs"
              style={{ color: "var(--cf-ink)" }}
            >
              {resolvedSleeveTitle}
            </h2>
            <p
              className="text-[6px] min-[400px]:text-[7.5px] sm:text-[13.5px] font-medium leading-tight mt-0.5 sm:mt-1 transition-colors duration-300 whitespace-nowrap truncate"
              style={{ color: "var(--cf-ink-muted)" }}
            >
              {resolvedSleeveSubtitle}
            </p>
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
export type ConfidentialFolderDesign = ConfidentialFolderCardDesign;
export type CouponCardsData = CouponCardData;
