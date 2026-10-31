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

// ============================================================================
// CYBER NEXUS SMARTCARD SEAL & CIRCUIT WATERMARK SVGS
// ============================================================================
export function CyberNexusSeal({
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
        {/* Outer Hexagon Tech Boundary */}
        <polygon
          points="0,-88 76,-44 76,44 0,88 -76,44 -76,-44"
          stroke="currentColor"
          strokeWidth="1.2"
          className="opacity-40"
        />
        {/* Outer Circular Degree Marks & Rings */}
        <circle r="78" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" className="opacity-50" />
        <circle r="68" stroke="currentColor" strokeWidth="1.4" className="opacity-70" />
        <circle r="52" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 4" className="opacity-40" />

        {/* Diagonal Corner Nodes */}
        <circle cx="-55" cy="-55" r="2.5" fill="currentColor" className="opacity-80" />
        <circle cx="55" cy="-55" r="2.5" fill="currentColor" className="opacity-80" />
        <circle cx="55" cy="55" r="2.5" fill="currentColor" className="opacity-80" />
        <circle cx="-55" cy="55" r="2.5" fill="currentColor" className="opacity-80" />
        <line x1="-55" y1="-55" x2="-40" y2="-40" stroke="currentColor" strokeWidth="1.2" className="opacity-60" />
        <line x1="55" y1="-55" x2="40" y2="-40" stroke="currentColor" strokeWidth="1.2" className="opacity-60" />
        <line x1="55" y1="55" x2="40" y2="40" stroke="currentColor" strokeWidth="1.2" className="opacity-60" />
        <line x1="-55" y1="55" x2="-40" y2="40" stroke="currentColor" strokeWidth="1.2" className="opacity-60" />

        {/* Center Hexagonal Microprocessor Core */}
        <polygon
          points="0,-28 24,-14 24,14 0,28 -24,14 -24,-14"
          stroke="currentColor"
          strokeWidth="1.8"
          fill="currentColor"
          fillOpacity="0.08"
          className="opacity-90"
        />
        {/* Fingerprint / Biometric Waves inside center */}
        <path d="M -12 -6 A 14 14 0 0 1 12 -6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="opacity-80" />
        <path d="M -8 2 A 9 9 0 0 1 8 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="opacity-90" />
        <circle cx="0" cy="10" r="2" fill="currentColor" className="opacity-95" />

        {/* Telemetry Perimeter Text */}
        <text x="0" y="-72" textAnchor="middle" fill="currentColor" fontSize="5.5" fontWeight="bold" letterSpacing="1.5" className="opacity-80 font-mono">NFC • FIDO2 • 13.56 MHz</text>
        <text x="0" y="80" textAnchor="middle" fill="currentColor" fontSize="5" fontWeight="bold" letterSpacing="1.8" className="opacity-80 font-mono">SECURE VAULT // 09</text>
      </g>
    </svg>
  );
}

export const BiometricIrisSeal = CyberNexusSeal;
export const LuxuryDiamondCrownSeal = CyberNexusSeal;

export function SmartChipGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 72 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("select-none pointer-events-none", className)}
    >
      {/* Golden Metallic Chip Body */}
      <rect x="1" y="1" width="70" height="54" rx="7" className="fill-amber-400/90 dark:fill-amber-500/80 stroke-amber-600/80 dark:stroke-amber-400/70" strokeWidth="1.5" />
      {/* Contact Pads Geometry */}
      <rect x="23" y="1" width="26" height="54" className="stroke-amber-700/60 dark:stroke-amber-900/60" strokeWidth="1.2" fill="none" />
      <line x1="1" y1="20" x2="71" y2="20" className="stroke-amber-700/60 dark:stroke-amber-900/60" strokeWidth="1.2" />
      <line x1="1" y1="36" x2="71" y2="36" className="stroke-amber-700/60 dark:stroke-amber-900/60" strokeWidth="1.2" />
      <circle cx="36" cy="28" r="7" className="fill-amber-500 dark:fill-amber-600 stroke-amber-700/70" strokeWidth="1.2" />
      <path d="M 23 28 H 1 M 49 28 H 71" className="stroke-amber-700/60 dark:stroke-amber-900/60" strokeWidth="1.2" />
    </svg>
  );
}

export function NfcContactlessGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("select-none pointer-events-none", className)}
    >
      <path d="M 9 23 A 14 14 0 0 1 9 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.4" />
      <path d="M 14 20 A 9 9 0 0 1 14 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
      <path d="M 19 18 A 5 5 0 0 1 19 14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.95" />
    </svg>
  );
}

export function CyberCircuitWatermark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none select-none", className)}
    >
      <g stroke="currentColor" strokeWidth="1" opacity="0.25">
        <path d="M 10 30 H 45 L 60 45 H 110 L 125 30 H 190" />
        <path d="M 10 80 H 70 L 85 65 H 140 L 155 80 H 190" />
        <path d="M 50 10 V 35 L 65 50 V 90 L 75 100 V 110" />
        <path d="M 150 10 V 35 L 135 50 V 90 L 125 100 V 110" />
        <circle cx="45" cy="30" r="2" fill="currentColor" />
        <circle cx="125" cy="30" r="2" fill="currentColor" />
        <circle cx="70" cy="80" r="2" fill="currentColor" />
        <circle cx="155" cy="80" r="2" fill="currentColor" />
        <rect x="90" y="48" width="20" height="24" rx="2" strokeWidth="1" />
      </g>
    </svg>
  );
}

export const ArtDecoWatermark = CyberCircuitWatermark;

// ============================================================================
// AVIATION BOARDING PASS & RADAR SEAL SVGS
// ============================================================================
export function AviationRadarSeal({
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
        {/* Outer Degree Marks & Radar Rings */}
        <circle r="88" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 5" className="opacity-40" />
        <circle r="80" stroke="currentColor" strokeWidth="1.4" className="opacity-55" />
        <circle r="60" stroke="currentColor" strokeWidth="0.9" strokeDasharray="2 4" className="opacity-35" />
        <circle r="40" stroke="currentColor" strokeWidth="0.8" className="opacity-45" />

        {/* Compass Crosshairs */}
        <line x1="-94" y1="0" x2="-76" y2="0" stroke="currentColor" strokeWidth="1.5" className="opacity-70" />
        <line x1="76" y1="0" x2="94" y2="0" stroke="currentColor" strokeWidth="1.5" className="opacity-70" />
        <line x1="0" y1="-94" x2="0" y2="-76" stroke="currentColor" strokeWidth="1.5" className="opacity-70" />
        <line x1="0" y1="76" x2="0" y2="94" stroke="currentColor" strokeWidth="1.5" className="opacity-70" />

        {/* Compass Cardinal Points */}
        <text x="0" y="-83" textAnchor="middle" fill="currentColor" fontSize="6.5" fontWeight="bold" className="opacity-80 font-mono">N</text>
        <text x="85" y="2.5" textAnchor="middle" fill="currentColor" fontSize="6.5" fontWeight="bold" className="opacity-80 font-mono">E</text>
        <text x="0" y="89" textAnchor="middle" fill="currentColor" fontSize="6.5" fontWeight="bold" className="opacity-80 font-mono">S</text>
        <text x="-85" y="2.5" textAnchor="middle" fill="currentColor" fontSize="6.5" fontWeight="bold" className="opacity-80 font-mono">W</text>

        {/* Flight Trajectory Orbit Arcs */}
        <ellipse rx="74" ry="28" stroke="currentColor" strokeWidth="1" transform="rotate(-25)" className="opacity-30" />
        <ellipse rx="74" ry="28" stroke="currentColor" strokeWidth="1" transform="rotate(25)" className="opacity-30" />

        {/* Center Jet Airplane Silhouette */}
        <g transform="translate(0, -1) scale(0.9)">
          <path
            d="M 0 -28 L 3 -18 L 24 2 L 24 7 L 4 2 L 3 16 L 10 22 L 10 26 L 0 23 L -10 26 L -10 22 L -3 16 L -4 2 L -24 7 L -24 2 L -3 -18 Z"
            fill="currentColor"
            className="opacity-90"
          />
        </g>

        {/* Waypoint Markers */}
        {[30, 60, 120, 150, 210, 240, 300, 330].map((angle, i) => (
          <circle
            key={i}
            cx={70 * Math.cos((angle * Math.PI) / 180)}
            cy={70 * Math.sin((angle * Math.PI) / 180)}
            r={1.5}
            fill="currentColor"
            className="opacity-60"
          />
        ))}
      </g>
    </svg>
  );
}

export function FlightWingsLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 56"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("select-none pointer-events-none", className)}
    >
      {/* Left Wing Feathers */}
      <path d="M 70 28 L 10 18 L 8 22 L 68 32 Z" opacity="0.85" />
      <path d="M 70 24 L 20 12 L 18 16 L 68 28 Z" opacity="0.9" />
      <path d="M 70 20 L 32 6 L 30 10 L 68 24 Z" opacity="0.95" />
      <path d="M 70 16 L 46 2 L 44 5 L 68 20 Z" opacity="1" />

      {/* Right Wing Feathers */}
      <path d="M 90 28 L 150 18 L 152 22 L 92 32 Z" opacity="0.85" />
      <path d="M 90 24 L 140 12 L 142 16 L 92 28 Z" opacity="0.9" />
      <path d="M 90 20 L 128 6 L 130 10 L 92 24 Z" opacity="0.95" />
      <path d="M 90 16 L 114 2 L 116 5 L 92 20 Z" opacity="1" />

      {/* Center Jet Emblem */}
      <circle cx="80" cy="24" r="14" className="fill-current" />
      <circle cx="80" cy="24" r="11" className="fill-background" />
      <path
        d="M 80 16 L 82 21 L 89 25 L 89 27 L 82 25 L 81 30 L 84 32 L 84 34 L 80 33 L 76 34 L 76 32 L 79 30 L 78 25 L 71 27 L 71 25 L 78 21 Z"
        className="fill-current"
      />
      {/* Stars on bottom */}
      <circle cx="73" cy="44" r="1.5" opacity="0.75" />
      <circle cx="80" cy="46" r="2" opacity="0.95" />
      <circle cx="87" cy="44" r="1.5" opacity="0.75" />
    </svg>
  );
}

export function AirplaneWatermark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 56"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none select-none", className)}
    >
      <g transform="translate(80, 28) scale(1.15)">
        <path
          d="M 0 -24 L 3 -14 L 28 2 L 28 6 L 4 2 L 3 14 L 10 19 L 10 22 L 0 20 L -10 22 L -10 19 L -3 14 L -4 2 L -28 6 L -28 2 L -3 -14 Z"
          opacity="0.9"
        />
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
    <div className={cn("flex items-center gap-0.5 select-none shrink-0", className)}>
      <div className="flex flex-col gap-[1px] min-[400px]:gap-[1.5px] sm:gap-[2.2px] h-10 min-[400px]:h-16 sm:h-32 justify-between">
        {bars.map((w, i) => (
          <div
            key={i}
            className="w-full bg-foreground rounded-full transition-colors duration-300"
            style={{ height: `${w * 0.75}px` }}
          />
        ))}
      </div>
      <span className="[writing-mode:vertical-lr] rotate-180 font-mono text-[4px] min-[400px]:text-[5.5px] sm:text-[8px] font-semibold text-foreground/80 tracking-wider transition-colors duration-300">
        {code}
      </span>
    </div>
  );
}

// ============================================================================
// TYPES & PROPS
// ============================================================================
export type ConfidentialFolderInteractionMode = "auto-flip" | "step-flip";
export type ConfidentialFolderCardDesign =
  | "classified"
  | "confidential-folder"
  | "slide-out-sleeve"
  | "stay-hungry"
  | "train-ticket"
  | "smart-card"
  | "keycard"
  | "cyber-card"
  | "boarding-pass"
  | "vip-card"
  | "black-card";

export interface CouponMetric {
  label: string;
  value: string;
}

export interface CouponCardData {
  // Sleeve info
  sleeveTitle?: string;
  sleeveSubtitle?: string;

  // Confidential Folder / Stay Hungry Specific Fields
  idNumber?: string;
  tagline?: string;
  subTagline?: string;
  stampBadge?: string;
  dossierNumber?: string;

  // Keycard / VIP Black Metal Card Specific Fields
  holderName?: string;
  cardNumber?: string;
  memberSince?: string;
  tierName?: string;
  conciergePhone?: string;
  cvv?: string;
  accessId?: string;
  roleTitle?: string;
  department?: string;
  authLevel?: string;
  expiryDate?: string;
  chipSerial?: string;
  securityKey?: string;
  hashSignature?: string;

  // Train / Boarding Pass Specific Fields
  ticketTitle?: string;
  passengerName?: string;
  routeText?: string;
  flightRoute?: string;
  origin?: string;
  destination?: string;
  date?: string;
  departureTime?: string;
  boardingTime?: string;
  seatNumber?: string;
  trainNumber?: string;
  flightNumber?: string;
  gate?: string;
  cabinClass?: string;
  trainCompany?: string;
  airlineCompany?: string;
  slogan?: string;
  barcodeNumber?: string;
  websiteUrl?: string;
  eticketNumber?: string;

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
  // Boarding Pass Specific Props
  flightNumber?: string;
  gate?: string;
  boardingTime?: string;
  cabinClass?: string;
  origin?: string;
  destination?: string;
  flightRoute?: string;
  eticketNumber?: string;
  airlineCompany?: string;
  // Confidential Folder / Stay Hungry Specific Props
  idNumber?: string;
  tagline?: string;
  subTagline?: string;
  stampBadge?: string;
  dossierNumber?: string;
  // Keycard Specific Props
  holderName?: string;
  accessId?: string;
  roleTitle?: string;
  department?: string;
  authLevel?: string;
  expiryDate?: string;
  chipSerial?: string;
  securityKey?: string;
  hashSignature?: string;
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
  // Confidential Folder / Stay Hungry Specific Defaults
  idNumber,
  tagline,
  subTagline,
  stampBadge,
  dossierNumber,
  // Keycard Specific Defaults
  holderName = "Kaelen Vance",
  accessId = "SEC-8940-QUANTUM",
  roleTitle = "SECURITY ARCHITECT",
  department = "QUANTUM PROTOCOL CORE",
  authLevel = "LEVEL 09",
  expiryDate = "10/2030",
  chipSerial = "RFID // 13.56 MHz",
  securityKey = "KEY // 892-ALPHA",
  hashSignature = "SHA-512 : 9f8a42e7b9104c8f2a6e...c27e80",
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
  // Boarding Pass Specific Defaults
  flightNumber,
  gate,
  boardingTime,
  cabinClass,
  origin,
  destination,
  flightRoute,
  eticketNumber,
  airlineCompany,
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
  const isDesignVal = (v?: string): v is ConfidentialFolderCardDesign =>
    v === "classified" ||
    v === "confidential-folder" ||
    v === "slide-out-sleeve" ||
    v === "stay-hungry" ||
    v === "train-ticket" ||
    v === "smart-card" ||
    v === "keycard" ||
    v === "cyber-card" ||
    v === "boarding-pass" ||
    v === "vip-card" ||
    v === "black-card";

  const activeMode: ConfidentialFolderInteractionMode =
    mode ?? (!isDesignVal(variant) ? variant : undefined) ?? interactionMode ?? "auto-flip";

  const activeDesign: ConfidentialFolderCardDesign =
    (isDesignVal(variant) ? variant : undefined) ??
    cardType ??
    designVariant ??
    cardDesign ??
    "classified";

  const isConfidentialFolder =
    activeDesign === "confidential-folder" ||
    activeDesign === "slide-out-sleeve" ||
    activeDesign === "stay-hungry";
  const isTrainTicket = activeDesign === "train-ticket";
  const isBoardingPass = activeDesign === "boarding-pass";
  const isKeycard =
    activeDesign === "smart-card" ||
    activeDesign === "keycard" ||
    activeDesign === "cyber-card" ||
    activeDesign === "vip-card" ||
    activeDesign === "black-card";

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

  // Smart Card / Biometric Access Card Specific Resolved Variables
  const resolvedHolderName =
    activeData?.holderName ??
    holderName ??
    "Dr. Kaelen Vance";
  const resolvedRoleTitle =
    activeData?.roleTitle ??
    roleTitle ??
    "CHIEF ARCHITECT";
  const resolvedDepartment =
    activeData?.department ??
    department ??
    "QUANTUM PROTOCOL LABS";
  const resolvedAuthLevel =
    activeData?.authLevel ??
    authLevel ??
    "LEVEL 09 // OMNI";
  const resolvedAccessId =
    activeData?.accessId ??
    accessId ??
    "SEC-8940-QUANTUM";
  const resolvedExpiryDate =
    activeData?.expiryDate ??
    expiryDate ??
    "10/2030";
  const resolvedChipSerial =
    activeData?.chipSerial ??
    chipSerial ??
    "RFID // 13.56 MHz";
  const resolvedSecurityKey =
    activeData?.securityKey ??
    securityKey ??
    "KEY-892-ALPHA";
  const resolvedHashSignature =
    activeData?.hashSignature ??
    hashSignature ??
    "SHA-512 : 9f8a42e7b9104c8f2a6e...c27e80";

  // Confidential Folder / Stay Hungry Resolved Values
  const resolvedIdNumber = activeData?.idNumber ?? idNumber ?? "ID · 0042";
  const resolvedTagline = activeData?.tagline ?? tagline ?? "STAY\nHUNGRY";
  const resolvedSubTagline = activeData?.subTagline ?? subTagline ?? "STAY FOOLISH · CLASSIFIED";
  const resolvedStampBadge = activeData?.stampBadge ?? stampBadge ?? "CONFIDENTIAL";
  const resolvedDossierNumber = activeData?.dossierNumber ?? dossierNumber ?? "DOSSIER // SEC-0042";

  const resolvedPassengerName =
    activeData?.passengerName ??
    passengerName ??
    (isBoardingPass ? "Alexander V. Wright" : "Barbara M. Sandoval");
  const resolvedRouteText = activeData?.routeText ?? routeText;
  const resolvedFlightRoute =
    activeData?.flightRoute ??
    activeData?.routeText ??
    (isBoardingPass ? "JFK ➔ LHR" : routeText);
  const resolvedDate = activeData?.date ?? date;
  const resolvedDepartureTime = activeData?.departureTime ?? departureTime;
  const resolvedBoardingTime =
    activeData?.boardingTime ?? activeData?.departureTime ?? (isBoardingPass ? "10:45 AM" : departureTime);
  const resolvedSeatNumber =
    activeData?.seatNumber ?? seatNumber ?? (isBoardingPass ? "02K" : "18A");
  const resolvedTrainNumber = activeData?.trainNumber ?? trainNumber;
  const resolvedFlightNumber =
    activeData?.flightNumber ?? activeData?.trainNumber ?? (isBoardingPass ? "SA-892" : "6");
  const resolvedGate = activeData?.gate ?? (isBoardingPass ? "G-14" : "1");
  const resolvedCabinClass = activeData?.cabinClass ?? "FIRST CLASS";
  const resolvedTrainCompany = activeData?.trainCompany ?? trainCompany;
  const resolvedAirlineCompany =
    activeData?.airlineCompany ?? activeData?.trainCompany ?? "SKYLINE AIRWAYS";
  const resolvedSlogan =
    activeData?.slogan ??
    slogan ??
    (isBoardingPass
      ? "THE ART OF LUXURY SKY TRAVEL • WORLDWIDE ALLIANCE"
      : "UNLEASH THE POWER OF SPEED WITH HYPERBOLT EXPRESS");
  const resolvedBarcodeNumber =
    activeData?.barcodeNumber ?? barcodeNumber ?? "0 734664 235788";
  const resolvedWebsiteUrl =
    activeData?.websiteUrl ?? websiteUrl ?? (isBoardingPass ? "SKYLINEAIRWAYS.COM" : "HYPERBOLTEXPRESS.COM");
  const resolvedTicketTitle =
    activeData?.ticketTitle ??
    ticketTitle ??
    (isBoardingPass ? "AIRLINE BOARDING PASS" : "TRAIN ONLINE TICKET");

  const resolvedInitialPeek = activeData?.initialPeek ?? initialPeek;
  const resolvedHoverPeek = activeData?.hoverPeek ?? hoverPeek;

  // Resolved Sleeve Text
  const resolvedSleeveTitle =
    activeData?.sleeveTitle ??
    sleeveTitle ??
    (isConfidentialFolder
      ? "Confidential Folder"
      : isKeycard
      ? "Quantum Key Vault"
      : isBoardingPass
      ? "Boarding Pass Wallet"
      : isTrainTicket
      ? "Hyperbolt Express"
      : "Designed to endure");
  const resolvedSleeveSubtitle =
    activeData?.sleeveSubtitle ??
    sleeveSubtitle ??
    (isConfidentialFolder
      ? "Restricted Access · Authorized Personnel Only"
      : isKeycard
      ? "Biometric Smartcard & Encrypted NFC Protocol"
      : isBoardingPass
      ? "First Class Priority Boarding • Gate G-14"
      : isTrainTicket
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
        "relative flex items-center justify-center p-2 pt-4 sm:p-8 select-none cf-theme-scope overflow-visible",
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
          --cf-flap: ${
            isConfidentialFolder
              ? "#fde047"
              : isBoardingPass || isTrainTicket
              ? "oklch(from var(--cf-base) 0.93 calc(c * 0.25) h)"
              : "oklch(from var(--cf-base) 0.88 calc(c * 0.4) h)"
          };
          --cf-plate: ${
            isConfidentialFolder
              ? "#facc15"
              : isBoardingPass || isTrainTicket
              ? "oklch(from var(--cf-base) 0.82 calc(c * 0.35) h)"
              : "oklch(from var(--cf-base) 0.80 calc(c * 0.5) h)"
          };
          --cf-ink: ${
            isConfidentialFolder
              ? "#78350f"
              : isBoardingPass || isTrainTicket
              ? "oklch(from var(--cf-base) 0.15 calc(c * 0.6) h)"
              : "oklch(from var(--cf-base) 0.22 calc(c * 0.5) h)"
          };
          --cf-ink-muted: ${
            isConfidentialFolder
              ? "#92400e"
              : isBoardingPass || isTrainTicket
              ? "oklch(from var(--cf-base) 0.35 calc(c * 0.35) h)"
              : "oklch(from var(--cf-base) 0.45 calc(c * 0.35) h)"
          };
          --cf-spiro: ${
            isConfidentialFolder
              ? "rgba(180, 83, 9, 0.4)"
              : "oklch(from var(--cf-base) 0.38 calc(c * 0.5) h / 0.75)"
          };
          --cf-stroke-flap: ${
            isConfidentialFolder
              ? "#eab308"
              : isBoardingPass || isTrainTicket
              ? "oklch(from var(--cf-base) 0.68 calc(c * 0.3) h / 0.5)"
              : "oklch(from var(--cf-base) 0.68 calc(c * 0.3) h / 0.5)"
          };
          --cf-stroke-plate: ${
            isConfidentialFolder
              ? "#ca8a04"
              : isBoardingPass || isTrainTicket
              ? "oklch(from var(--cf-base) 0.60 calc(c * 0.3) h / 0.4)"
              : "oklch(from var(--cf-base) 0.60 calc(c * 0.3) h / 0.4)"
          };
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
          --cf-flap: ${
            isConfidentialFolder
              ? "#fde047"
              : isBoardingPass || isTrainTicket
              ? "oklch(from var(--cf-base) 0.22 calc(c * 0.35) h)"
              : "oklch(from var(--cf-base) 0.22 calc(c * 0.35) h)"
          };
          --cf-plate: ${
            isConfidentialFolder
              ? "#facc15"
              : isBoardingPass || isTrainTicket
              ? "oklch(from var(--cf-base) 0.15 calc(c * 0.25) h)"
              : "oklch(from var(--cf-base) 0.15 calc(c * 0.25) h)"
          };
          --cf-ink: ${isConfidentialFolder ? "#78350f" : "#ffffff"};
          --cf-ink-muted: ${
            isConfidentialFolder
              ? "#92400e"
              : "oklch(from var(--cf-base) 0.82 calc(c * 0.12) h)"
          };
          --cf-spiro: ${
            isConfidentialFolder
              ? "rgba(180, 83, 9, 0.4)"
              : "oklch(from var(--cf-base) 0.85 calc(c * 0.35) h / 0.85)"
          };
          --cf-stroke-flap: ${
            isConfidentialFolder
              ? "#eab308"
              : "rgba(255, 255, 255, 0.16)"
          };
          --cf-stroke-plate: ${
            isConfidentialFolder
              ? "#ca8a04"
              : "rgba(255, 255, 255, 0.08)"
          };
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
          "relative w-[160px] min-[400px]:w-[185px] sm:w-[360px] h-[215px] min-[400px]:h-[247px] sm:h-[480px] cursor-pointer outline-none select-none",
          !isConfidentialFolder && "shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_20px_rgba(0,0,0,0.35)]",
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

        {/* Manila Folder Tab for Confidential Folder Variant */}
        {isConfidentialFolder && (
          <div
            className="absolute -top-3 sm:-top-5 left-3 sm:left-6 w-14 sm:w-24 h-3.5 sm:h-5.5 rounded-t-md sm:rounded-t-lg border-t border-x flex items-center justify-center font-mono text-[4px] min-[400px]:text-[5px] sm:text-[8.5px] font-bold uppercase tracking-wider transition-colors duration-300 z-10"
            style={{
              backgroundColor: "var(--cf-plate)",
              borderColor: "var(--cf-stroke-plate)",
              color: "var(--cf-ink)",
            }}
          >
            DOSSIER
          </div>
        )}

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
              "absolute inset-0 flex flex-col justify-between select-none transition-colors duration-300",
              !isConfidentialFolder && "shadow-[0_0_14px_rgba(0,0,0,0.07)] dark:shadow-[0_0_16px_rgba(0,0,0,0.35)]",
              isConfidentialFolder || isTrainTicket || isBoardingPass ? "p-0 bg-transparent border-0 overflow-hidden" : isKeycard ? "p-0 bg-card border border-border" : "p-2 min-[400px]:p-2.5 sm:p-5 border bg-card border-border"
            )}
          >
            {isConfidentialFolder ? (
              /* -------------------------------------------------------- */
              /* CONFIDENTIAL FOLDER / STAY HUNGRY SLIDE-OUT CARD (FRONT) */
              /* -------------------------------------------------------- */
              <div className="relative w-full h-full flex flex-col justify-between text-white select-none overflow-hidden rounded-[calc(var(--radius,1.25rem)-2px)] bg-gradient-to-br from-[#ff007f] via-[#f43f5e] to-[#e11d48] p-2.5 min-[400px]:p-4 sm:p-7">
                {/* Subtle Vector Classified Seal Watermark */}
                <ClassifiedSeal
                  size={200}
                  strokeWidth={1.2}
                  className="absolute right-0 bottom-0 w-[120px] h-[120px] sm:w-[240px] sm:h-[240px] text-white/10 pointer-events-none"
                />

                {/* Top Header: ID & Classified Status Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span className="font-mono font-bold text-[6px] min-[400px]:text-[7.5px] sm:text-[12px] tracking-[0.2em] uppercase text-white/90">
                      {resolvedIdNumber}
                    </span>
                  </div>
                  <div className="px-2 sm:px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-xs border border-white/30 text-white font-mono font-black text-[5px] min-[400px]:text-[6px] sm:text-[9.5px] uppercase tracking-widest">
                    TOP SECRET
                  </div>
                </div>

                {/* Mid Section: Mission Metadata */}
                <div className="relative z-10 my-auto flex flex-col space-y-1 sm:space-y-2 py-1.5 sm:py-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="h-px w-5 sm:w-12 bg-white/40" />
                    <span className="font-mono text-[4px] min-[400px]:text-[5.5px] sm:text-[9px] font-bold text-white/80 uppercase tracking-widest">
                      SPECIAL INITIATIVE // CODENAME
                    </span>
                  </div>
                  <p className="font-sans font-medium text-[6px] min-[400px]:text-[8px] sm:text-[13px] text-white/90 leading-tight max-w-[240px] line-clamp-2 sm:line-clamp-none">
                    {bSubtitle || "Crafted for individuals who challenge the status quo and think differently."}
                  </p>
                </div>

                {/* Bottom Section: Giant Iconic Bold STAY HUNGRY Typography */}
                <div className="relative z-10 flex flex-col items-end text-right mt-auto pt-1 sm:pt-2">
                  <span className="font-mono text-[4px] min-[400px]:text-[5.5px] sm:text-[9.5px] font-bold text-white/70 uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-0.5 sm:mb-1">
                    {resolvedSubTagline}
                  </span>
                  <h2 className="font-sans font-black text-[20px] min-[400px]:text-[28px] sm:text-[54px] tracking-tight leading-[0.88] uppercase text-white whitespace-pre-line">
                    {resolvedTagline}
                  </h2>
                </div>
              </div>
            ) : isKeycard ? (
              /* -------------------------------------------------------- */
              /* MODERN BIOMETRIC NFC SMARTCARD (FRONT FACE)              */
              /* -------------------------------------------------------- */
              <div className="relative w-full h-full flex flex-col justify-between text-foreground select-none overflow-hidden rounded-[calc(var(--radius,1.25rem)-2px)] bg-card border border-border p-3 min-[400px]:p-4 sm:p-6 shadow-md transition-colors duration-300">
                {/* Corner Tech Brackets */}
                <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-primary/60 pointer-events-none" />
                <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-primary/60 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-primary/60 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-primary/60 pointer-events-none" />

                {/* Subtle Cyber Circuit Background */}
                <CyberCircuitWatermark className="absolute inset-0 w-full h-full object-cover opacity-15 text-primary pointer-events-none" />

                {/* Top Header: Contactless & Active Level */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <NfcContactlessGlyph className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-primary" />
                    <span className="font-mono font-bold text-[5.5px] min-[400px]:text-[7px] sm:text-[11px] tracking-[0.18em] uppercase text-foreground">
                      NFC SMART ID
                    </span>
                  </div>
                  <div className="flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-[4.5px] min-[400px]:text-[5.5px] sm:text-[8.5px] uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{resolvedAuthLevel}</span>
                  </div>
                </div>

                {/* Mid Section: EMV Microchip & Access ID */}
                <div className="relative z-10 flex items-center justify-between my-auto py-1 sm:py-2">
                  <SmartChipGlyph className="w-9 h-7 min-[400px]:w-11 min-[400px]:h-8 sm:w-16 sm:h-12 shadow-sm" />
                  <div className="flex flex-col items-end text-right">
                    <span className="font-mono text-[4px] min-[400px]:text-[5px] sm:text-[7.5px] text-muted-foreground uppercase tracking-widest">
                      SEC PROTOCOL
                    </span>
                    <span className="font-mono font-bold text-[6.5px] min-[400px]:text-[8px] sm:text-[13px] text-primary tracking-wider">
                      {resolvedAccessId}
                    </span>
                  </div>
                </div>

                {/* Authorized Identity & Role */}
                <div className="relative z-10 my-0.5 sm:my-1 flex flex-col space-y-0.5 sm:space-y-1">
                  <span className="font-mono text-[4px] min-[400px]:text-[5px] sm:text-[7.5px] font-bold text-muted-foreground uppercase tracking-wider">
                    AUTHORIZED IDENTITY
                  </span>
                  <h3 className="font-sans font-black text-[9px] min-[400px]:text-[11px] sm:text-[18px] text-foreground tracking-tight uppercase leading-none">
                    {resolvedHolderName}
                  </h3>
                  <p className="font-mono text-[5px] min-[400px]:text-[6.5px] sm:text-[10px] font-semibold text-primary uppercase">
                    {resolvedRoleTitle} • {resolvedDepartment}
                  </p>
                </div>

                {/* Bottom Row: Chip Serial, Expiry & ISO Standard */}
                <div className="relative z-10 flex items-end justify-between pt-1 sm:pt-2 border-t border-border">
                  <div className="flex flex-col">
                    <span className="font-mono text-[3.5px] min-[400px]:text-[4.5px] sm:text-[7px] font-bold text-muted-foreground uppercase">
                      SECURITY CHIP
                    </span>
                    <span className="font-mono text-[4.5px] min-[400px]:text-[6px] sm:text-[9.5px] font-bold text-foreground">
                      {resolvedChipSerial}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4 text-right">
                    <div>
                      <span className="block font-mono text-[3.5px] min-[400px]:text-[4.5px] sm:text-[7px] font-bold text-muted-foreground uppercase">
                        VALID THRU
                      </span>
                      <span className="font-mono text-[5px] min-[400px]:text-[6.5px] sm:text-[10px] font-bold text-foreground">
                        {resolvedExpiryDate}
                      </span>
                    </div>
                    <div>
                      <span className="block font-mono text-[3.5px] min-[400px]:text-[4.5px] sm:text-[7px] font-bold text-muted-foreground uppercase">
                        STANDARD
                      </span>
                      <span className="font-mono text-[5px] min-[400px]:text-[6.5px] sm:text-[10px] font-bold text-primary">
                        ISO-7816
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : isBoardingPass ? (
              /* -------------------------------------------------------- */
              /* AIRLINE BOARDING PASS (FRONT FACE)                       */
              /* -------------------------------------------------------- */
              <div className="relative w-full h-full flex flex-col justify-between text-foreground select-none overflow-hidden rounded-[calc(var(--radius,1.25rem)-2px)]">
                {/* Vector Card Shell with Inward Curved Notch Cutouts */}
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

                {/* Card Content */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between">
                  {/* Upper Section */}
                  <div>
                    {/* 1. Top Aviation Blue/Primary Pill Banner Tab */}
                    <div className="w-full flex justify-center px-3 pt-1.5 sm:pt-3">
                      <div className="w-full sm:w-[94%] py-1 sm:py-2 px-2 rounded-b-xl sm:rounded-b-2xl bg-primary text-primary-foreground text-center font-sans font-black tracking-widest text-[7px] min-[400px]:text-[8.5px] sm:text-[14px] uppercase shadow-xs transition-colors duration-300">
                        ✈ {resolvedTicketTitle}
                      </div>
                    </div>

                    {/* 2. Upper Passenger & Flight Details Grid */}
                    <div className="px-3 min-[400px]:px-4 sm:px-6 py-1 sm:py-2 flex items-center justify-between">
                      <div className="flex flex-col text-left space-y-1 sm:space-y-2">
                        {/* Passenger Name & Class */}
                        <div>
                          <div className="flex items-center gap-1 sm:gap-2">
                            <span className="block font-sans text-[4.5px] min-[400px]:text-[5.5px] sm:text-[9px] font-bold text-muted-foreground uppercase tracking-wide">
                              PASSENGER NAME
                            </span>
                            <span className="font-mono text-[4px] min-[400px]:text-[5px] sm:text-[8px] font-bold text-primary uppercase px-1 rounded-xs bg-primary/10">
                              {resolvedCabinClass}
                            </span>
                          </div>
                          <span className="block font-sans text-[6px] min-[400px]:text-[7.5px] sm:text-[13px] font-semibold text-foreground leading-tight">
                            {resolvedPassengerName}
                          </span>
                        </div>

                        {/* Flight, Gate & Boarding Time */}
                        <div className="flex items-center gap-2 sm:gap-6">
                          <div>
                            <span className="block font-sans text-[4.5px] min-[400px]:text-[5.5px] sm:text-[8.5px] font-bold text-muted-foreground uppercase">
                              FLIGHT
                            </span>
                            <span className="block font-sans text-[5.5px] min-[400px]:text-[7px] sm:text-[11.5px] font-bold text-foreground">
                              {resolvedFlightNumber}
                            </span>
                          </div>
                          <div>
                            <span className="block font-sans text-[4.5px] min-[400px]:text-[5.5px] sm:text-[8.5px] font-bold text-muted-foreground uppercase">
                              GATE
                            </span>
                            <span className="block font-sans text-[5.5px] min-[400px]:text-[7px] sm:text-[11.5px] font-bold text-primary">
                              {resolvedGate}
                            </span>
                          </div>
                          <div>
                            <span className="block font-sans text-[4.5px] min-[400px]:text-[5.5px] sm:text-[8.5px] font-bold text-muted-foreground uppercase">
                              BOARDING
                            </span>
                            <span className="block font-sans text-[5.5px] min-[400px]:text-[7px] sm:text-[11.5px] font-medium text-foreground">
                              {resolvedBoardingTime}
                            </span>
                          </div>
                        </div>

                        {/* Seat & Date */}
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
                              DATE
                            </span>
                            <span className="block font-sans text-[5.5px] min-[400px]:text-[7px] sm:text-[11.5px] font-medium text-foreground mt-0.5">
                              {resolvedDate}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Vertical Barcode on Right */}
                      <div className="shrink-0 pl-1">
                        <VerticalBarcode code={resolvedBarcodeNumber} />
                      </div>
                    </div>

                    {/* 3. Middle Primary Route Banner with Airplane Watermark */}
                    <div className="relative w-full bg-primary py-1 sm:py-2.5 px-3 flex items-center justify-center overflow-hidden transition-colors duration-300">
                      <AirplaneWatermark className="absolute inset-0 w-full h-full object-cover text-primary-foreground opacity-30" />
                      <span className="relative z-10 text-primary-foreground font-sans font-black tracking-wider text-[8px] min-[400px]:text-[10px] sm:text-[16px] uppercase truncate drop-shadow-xs">
                        {resolvedFlightRoute}
                      </span>
                    </div>
                  </div>

                  {/* Dotted Perforation Line */}
                  <div className="relative w-full flex items-center justify-between px-3 sm:px-4 my-auto select-none">
                    <div className="w-full border-t-2 border-dotted border-border/80" />
                  </div>

                  {/* 4. Bottom Tear-Off Stub (Lower Section) */}
                  <div className="px-3 min-[400px]:px-4 sm:px-6 pb-2 pt-0.5 sm:pb-3.5 flex flex-col justify-between">
                    {/* Mini Primary banner */}
                    <div className="w-full bg-primary text-primary-foreground text-center font-sans font-bold tracking-wider text-[5px] min-[400px]:text-[6.5px] sm:text-[10.5px] py-0.5 sm:py-1 rounded-sm uppercase mb-1 transition-colors duration-300">
                      ✦ {resolvedAirlineCompany} {"//"} PASSENGER STUB
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
                            <span className="font-bold text-foreground">GATE:</span> {resolvedGate}
                          </div>
                          <div>
                            <span className="font-bold text-foreground">FLIGHT:</span> {resolvedFlightNumber}
                          </div>
                        </div>

                        {/* Solid Route Badge */}
                        <div className="mt-0.5 sm:mt-1 bg-zinc-950 dark:bg-black text-white px-1 sm:px-2 py-0.5 rounded-sm font-sans font-bold text-[5px] min-[400px]:text-[6px] sm:text-[9.5px] tracking-wider uppercase inline-block">
                          {resolvedFlightRoute}
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
            ) : isTrainTicket ? (
              /* -------------------------------------------------------- */
              /* EXACT 1:1 REPLICA OF LEFT TICKET (FRONT FACE)            */
              /* -------------------------------------------------------- */
              <div className="relative w-full h-full flex flex-col justify-between text-foreground select-none overflow-hidden rounded-[calc(var(--radius,1.25rem)-2px)]">
                {/* 100% Vector Card Shell with Inward Curved Notch Borders (All-Time Transparent Cutouts) */}
                <svg
                  viewBox="0 0 340 440"
                  preserveAspectRatio="none"
                  className="absolute inset-0 w-full h-full pointer-events-none z-0 text-border/80"
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
                <div className="relative z-10 w-full h-full flex flex-col justify-between overflow-hidden">
                  {/* Upper Section */}
                  <div>
                    {/* 1. Top Blue/Primary Pill Banner Tab */}
                    <div className="w-full flex justify-center px-2 min-[400px]:px-3 pt-1 min-[400px]:pt-1.5 sm:pt-3">
                      <div className="w-full sm:w-[94%] py-0.5 min-[400px]:py-1 sm:py-2 px-1.5 sm:px-2 rounded-b-lg sm:rounded-b-2xl bg-primary text-primary-foreground text-center font-sans font-black tracking-wider text-[6.5px] min-[400px]:text-[8.5px] sm:text-[14px] uppercase shadow-xs transition-colors duration-300">
                        {resolvedTicketTitle}
                      </div>
                    </div>

                    {/* 2. Upper Passenger & Trip Info Grid */}
                    <div className="px-2 min-[400px]:px-4 sm:px-6 py-0.5 min-[400px]:py-1 sm:py-2 flex items-center justify-between">
                      <div className="flex flex-col text-left space-y-0.5 min-[400px]:space-y-1 sm:space-y-2">
                        {/* Passenger Name */}
                        <div>
                          <span className="block font-sans text-[4px] min-[400px]:text-[5.5px] sm:text-[9px] font-bold text-muted-foreground uppercase tracking-wide">
                            PASSENGER NAME
                          </span>
                          <span className="block font-sans text-[5.5px] min-[400px]:text-[7.5px] sm:text-[13px] font-semibold text-foreground leading-tight">
                            {resolvedPassengerName}
                          </span>
                        </div>

                        {/* Date & Departure */}
                        <div className="flex items-center gap-1.5 min-[400px]:gap-2 sm:gap-6">
                          <div>
                            <span className="block font-sans text-[4px] min-[400px]:text-[5.5px] sm:text-[8.5px] font-bold text-muted-foreground uppercase">
                              DATE
                            </span>
                            <span className="block font-sans text-[5px] min-[400px]:text-[7px] sm:text-[11.5px] font-medium text-foreground">
                              {resolvedDate}
                            </span>
                          </div>
                          <div>
                            <span className="block font-sans text-[4px] min-[400px]:text-[5.5px] sm:text-[8.5px] font-bold text-muted-foreground uppercase">
                              DEPARTURE
                            </span>
                            <span className="block font-sans text-[5px] min-[400px]:text-[7px] sm:text-[11.5px] font-medium text-foreground">
                              {resolvedDepartureTime}
                            </span>
                          </div>
                        </div>

                        {/* Seat & Train */}
                        <div className="flex items-center gap-2 min-[400px]:gap-3 sm:gap-8">
                          <div>
                            <span className="block font-sans text-[4px] min-[400px]:text-[5.5px] sm:text-[8.5px] font-bold text-muted-foreground uppercase">
                              SEAT
                            </span>
                            <span className="block font-sans text-[7px] min-[400px]:text-[10px] sm:text-[17px] font-black text-foreground leading-none mt-0.5">
                              {resolvedSeatNumber}
                            </span>
                          </div>
                          <div>
                            <span className="block font-sans text-[4px] min-[400px]:text-[5.5px] sm:text-[8.5px] font-bold text-muted-foreground uppercase">
                              TRAIN
                            </span>
                            <span className="block font-sans text-[7px] min-[400px]:text-[10px] sm:text-[17px] font-black text-foreground leading-none mt-0.5">
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
                    <div className="relative w-full bg-primary py-0.5 min-[400px]:py-1 sm:py-2.5 px-2 sm:px-3 flex items-center justify-center overflow-hidden transition-colors duration-300">
                      <TrainWatermark className="absolute inset-0 w-full h-full object-cover text-primary-foreground opacity-30" />
                      <span className="relative z-10 text-primary-foreground font-sans font-black tracking-wider text-[7px] min-[400px]:text-[10px] sm:text-[16px] uppercase truncate drop-shadow-xs">
                        {resolvedRouteText}
                      </span>
                    </div>
                  </div>

                  {/* Dotted Perforation Line (Extends seamlessly from Left Notch to Right Notch) */}
                  <div className="relative w-full flex items-center justify-between px-2 sm:px-4 my-auto select-none">
                    <div className="w-full border-t-2 border-dotted border-border/80" />
                  </div>

                  {/* 4. Bottom Tear-Off Stub (Lower Section) */}
                  <div className="px-2 min-[400px]:px-4 sm:px-6 pb-1 min-[400px]:pb-2 pt-0.5 sm:pb-3.5 flex flex-col justify-between">
                    {/* Mini Primary banner */}
                    <div className="w-full bg-primary text-primary-foreground text-center font-sans font-bold tracking-wider text-[4.5px] min-[400px]:text-[6.5px] sm:text-[10.5px] py-0.5 sm:py-1 rounded-xs sm:rounded-sm uppercase mb-0.5 sm:mb-1 transition-colors duration-300">
                      {resolvedTicketTitle}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col space-y-0.5 sm:space-y-1">
                        <div>
                          <span className="block font-sans text-[3.5px] min-[400px]:text-[5px] sm:text-[7.5px] font-bold text-muted-foreground uppercase">
                            PASSENGER NAME
                          </span>
                          <span className="block font-sans text-[4.5px] min-[400px]:text-[6.5px] sm:text-[10.5px] font-semibold text-foreground">
                            {resolvedPassengerName}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 min-[400px]:gap-1.5 sm:gap-3 text-[3.5px] min-[400px]:text-[5px] sm:text-[8px] text-muted-foreground">
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
                        <div className="mt-0.5 sm:mt-1 bg-zinc-950 dark:bg-black text-white px-1 sm:px-2 py-0.5 rounded-xs sm:rounded-sm font-sans font-bold text-[4.5px] min-[400px]:text-[6px] sm:text-[9.5px] tracking-wider uppercase inline-block">
                          {resolvedRouteText}
                        </div>
                      </div>

                      {/* Mini Vertical Barcode */}
                      <div className="shrink-0 pl-1">
                        <VerticalBarcode code={resolvedBarcodeNumber} className="scale-60 min-[400px]:scale-75 sm:scale-90 origin-right" />
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
          {/* FACE 2: BACK FACE OF TICKET / PASS                           */}
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
              "absolute inset-0 flex flex-col justify-between select-none transition-colors duration-300",
              !isConfidentialFolder && "shadow-[0_0_14px_rgba(0,0,0,0.07)] dark:shadow-[0_0_16px_rgba(0,0,0,0.35)]",
              isConfidentialFolder || isTrainTicket || isBoardingPass ? "p-0 bg-transparent border-0 overflow-hidden" : isKeycard ? "p-0 bg-card border border-border" : "p-2 min-[400px]:p-2.5 sm:p-5 border bg-card border-border"
            )}
          >
            {isConfidentialFolder ? (
              /* -------------------------------------------------------- */
              /* CONFIDENTIAL FOLDER / MEMORANDUM & MANIFESTO (BACK)     */
              /* -------------------------------------------------------- */
              <div className="relative w-full h-full flex flex-col justify-between text-white select-none overflow-hidden rounded-[calc(var(--radius,1.25rem)-2px)] bg-gradient-to-br from-[#1c0512] via-[#2f081f] to-[#18020f] border border-rose-500/30 p-2.5 min-[400px]:p-4 sm:p-7">
                {/* Top Header */}
                <div className="relative z-10 flex items-center justify-between border-b border-rose-500/30 pb-1 sm:pb-3">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                    <span className="font-mono font-bold text-[5.5px] min-[400px]:text-[7px] sm:text-[11px] tracking-[0.18em] uppercase text-rose-300">
                      {resolvedDossierNumber}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-[5px] min-[400px]:text-[6px] sm:text-[9px] uppercase tracking-wider text-rose-400 bg-rose-950/60 border border-rose-500/40 px-2 py-0.5 rounded-full">
                    CLEARANCE // LEVEL 05
                  </span>
                </div>

                {/* Center Manifesto / Memorandum */}
                <div className="relative z-10 my-auto py-0.5 sm:py-2 flex flex-col space-y-1 min-[400px]:space-y-1.5 sm:space-y-3">
                  <div>
                    <span className="font-mono text-[4px] min-[400px]:text-[5px] sm:text-[8px] font-bold text-rose-400/80 uppercase tracking-widest block">
                      EXECUTIVE MEMORANDUM
                    </span>
                    <h4 className="font-sans font-black text-[9.5px] min-[400px]:text-[12px] sm:text-[20px] text-white tracking-tight uppercase leading-tight mt-0.5">
                      {bTitle || "The Crazy Ones"}
                    </h4>
                  </div>

                  <p className="font-sans text-[5.5px] min-[400px]:text-[7.5px] sm:text-[12px] leading-tight sm:leading-relaxed text-rose-100/80 line-clamp-2 min-[400px]:line-clamp-3 sm:line-clamp-none">
                    {bStatement || "Here's to the crazy ones. The misfits. The rebels. The troublemakers. The round pegs in the square holes. The ones who see things differently."}
                  </p>

                  {/* 3 Metric Pillars */}
                  <div className="grid grid-cols-3 gap-1 sm:gap-2 pt-0.5 sm:pt-1">
                    <div className="bg-rose-950/40 border border-rose-500/30 p-0.5 sm:p-1.5 rounded-sm text-center">
                      <span className="block font-mono text-[3.5px] min-[400px]:text-[4.5px] sm:text-[7px] text-rose-400/80 uppercase">CLEARANCE</span>
                      <span className="block font-mono font-bold text-[5px] min-[400px]:text-[6.5px] sm:text-[10px] text-rose-200">OMEGA-4</span>
                    </div>
                    <div className="bg-rose-950/40 border border-rose-500/30 p-0.5 sm:p-1.5 rounded-sm text-center">
                      <span className="block font-mono text-[3.5px] min-[400px]:text-[4.5px] sm:text-[7px] text-rose-400/80 uppercase">STATUS</span>
                      <span className="block font-mono font-bold text-[5px] min-[400px]:text-[6.5px] sm:text-[10px] text-emerald-400">ACTIVE</span>
                    </div>
                    <div className="bg-rose-950/40 border border-rose-500/30 p-0.5 sm:p-1.5 rounded-sm text-center">
                      <span className="block font-mono text-[3.5px] min-[400px]:text-[4.5px] sm:text-[7px] text-rose-400/80 uppercase">ENCRYPTION</span>
                      <span className="block font-mono font-bold text-[5px] min-[400px]:text-[6.5px] sm:text-[10px] text-rose-200">AES-256</span>
                    </div>
                  </div>

                  {/* Barcode Strip */}
                  <div className="pt-0.5 sm:pt-1 flex flex-col items-center">
                    <div className="h-2 min-[400px]:h-3.5 sm:h-6 flex items-center gap-[1.5px] sm:gap-[2.5px] opacity-80 text-white">
                      {[2, 4, 1, 3, 2, 5, 2, 1, 4, 3, 1, 5, 2, 3, 4, 2, 1, 3, 5, 2, 4, 1, 3, 2, 4].map((w, i) => (
                        <div key={i} className="h-full bg-current rounded-full" style={{ width: `${w}px` }} />
                      ))}
                    </div>
                    <span className="font-mono text-[4px] min-[400px]:text-[5.5px] sm:text-[8px] text-rose-400 tracking-[0.25em] uppercase mt-0.5 sm:mt-1">
                      * 0042-STAY-HUNGRY-ALPHA *
                    </span>
                  </div>
                </div>

                {/* Bottom Footer */}
                <div className="relative z-10 pt-1 sm:pt-2 border-t border-rose-500/30 flex items-center justify-between text-[4.5px] min-[400px]:text-[5.5px] sm:text-[8.5px] text-rose-300 font-mono">
                  <span>✦ AUTHORIZED DOSSIER</span>
                  <span className="text-white/80">STEVE J. // MANIFESTO</span>
                </div>
              </div>
            ) : isKeycard ? (
              /* -------------------------------------------------------- */
              /* MODERN BIOMETRIC SMARTCARD REVERSE (MAGNETIC & TELEMETRY)*/
              /* -------------------------------------------------------- */
              <div className="relative w-full h-full flex flex-col justify-between text-foreground select-none overflow-hidden rounded-[calc(var(--radius,1.25rem)-2px)] bg-card border border-border p-0 shadow-md transition-colors duration-300">
                {/* 1. Encrypted Magnetic Stripe */}
                <div className="w-full bg-foreground py-2 sm:py-3.5 px-3 flex items-center justify-between text-background shadow-xs">
                  <span className="font-mono text-[4px] min-[400px]:text-[5px] sm:text-[7.5px] font-black tracking-widest uppercase">
                    ENCRYPTED NFC // FIDO2 MAGNETIC TRACK
                  </span>
                  <span className="font-mono text-[4px] min-[400px]:text-[5px] sm:text-[7.5px] font-black tracking-wider">
                    CRC: 8940-X
                  </span>
                </div>

                {/* 2. Signature Panel & Security Code */}
                <div className="px-3 min-[400px]:px-4 sm:px-6 py-1 sm:py-2">
                  <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                    <span className="font-mono text-[4px] min-[400px]:text-[5px] sm:text-[7.5px] font-bold text-muted-foreground uppercase tracking-wider">
                      DIGITAL SIGNATURE
                    </span>
                    <span className="font-mono text-[4px] min-[400px]:text-[5px] sm:text-[7.5px] font-bold text-primary uppercase">
                      SEC KEY: <strong className="text-foreground bg-muted px-1 py-0.5 rounded-xs">{resolvedSecurityKey}</strong>
                    </span>
                  </div>

                  {/* Signature Box */}
                  <div className="w-full bg-muted/60 border border-border px-2 sm:px-3 py-1 sm:py-2 rounded-xs flex items-center justify-between font-mono text-[6px] min-[400px]:text-[7.5px] sm:text-[11px] text-foreground">
                    <span className="italic font-sans font-semibold">{resolvedHolderName}</span>
                    <span className="text-[4px] min-[400px]:text-[5px] sm:text-[7.5px] text-primary uppercase font-bold">CRYPTO SIGNED</span>
                  </div>

                  {/* SHA-512 Telemetry Hash */}
                  <p className="font-mono text-[3.5px] min-[400px]:text-[4.5px] sm:text-[7.5px] text-muted-foreground truncate mt-1">
                    ✦ HASH: {resolvedHashSignature}
                  </p>
                </div>

                {/* 3. Three Security Telemetry Pillars */}
                <div className="px-3 min-[400px]:px-4 sm:px-6">
                  <div className="grid grid-cols-3 gap-1 sm:gap-2 text-center">
                    <div className="bg-muted/40 border border-border p-1 sm:p-1.5 rounded-sm">
                      <span className="block font-mono text-[3.5px] min-[400px]:text-[4.5px] sm:text-[7px] text-muted-foreground uppercase">ENCRYPTION</span>
                      <span className="block font-mono font-bold text-[5px] min-[400px]:text-[6px] sm:text-[9.5px] text-primary">AES-256</span>
                    </div>
                    <div className="bg-muted/40 border border-border p-1 sm:p-1.5 rounded-sm">
                      <span className="block font-mono text-[3.5px] min-[400px]:text-[4.5px] sm:text-[7px] text-muted-foreground uppercase">PROTOCOL</span>
                      <span className="block font-mono font-bold text-[5px] min-[400px]:text-[6px] sm:text-[9.5px] text-foreground">FIDO2 / NFC</span>
                    </div>
                    <div className="bg-muted/40 border border-border p-1 sm:p-1.5 rounded-sm">
                      <span className="block font-mono text-[3.5px] min-[400px]:text-[4.5px] sm:text-[7px] text-muted-foreground uppercase">ACCESS</span>
                      <span className="block font-mono font-bold text-[5px] min-[400px]:text-[6px] sm:text-[9.5px] text-emerald-500">GLOBAL</span>
                    </div>
                  </div>
                </div>

                {/* 4. Bottom Footer */}
                <div className="px-3 min-[400px]:px-4 sm:px-6 pb-2 sm:pb-3.5 pt-1 border-t border-border flex items-center justify-between text-[4.5px] min-[400px]:text-[5.5px] sm:text-[8.5px] text-muted-foreground font-mono">
                  <span>QUANTUM VAULT CORE</span>
                  <span className="font-bold text-primary">AUTH.QUANTUMVAULT.IO</span>
                </div>
              </div>
            ) : isBoardingPass ? (
              /* -------------------------------------------------------- */
              /* AIRLINE VIP LOUNGE & PASS PRIVILEGES (BACK FACE)         */
              /* -------------------------------------------------------- */
              <div className="relative w-full h-full flex flex-col justify-between text-foreground select-none overflow-hidden rounded-[calc(var(--radius,1.25rem)-2px)]">
                {/* Vector Card Shell */}
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
                  {/* Full Outer Perimeter Stroke */}
                  <path
                    d="M 16 0 L 324 0 A 16 16 0 0 1 340 16 L 340 216 A 14 14 0 0 0 340 244 L 340 424 A 16 16 0 0 1 324 440 L 16 440 A 16 16 0 0 1 0 424 L 0 244 A 14 14 0 0 0 0 216 L 0 16 A 16 16 0 0 1 16 0 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                {/* Card Content */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between">
                  {/* Upper Section: Flight Wings & Slogan */}
                  <div className="p-3 min-[400px]:p-4 sm:p-7 flex flex-col items-center justify-center text-center my-auto">
                    <FlightWingsLogo className="w-16 min-[400px]:w-20 sm:w-36 text-foreground transition-colors duration-300" />
                    <h3 className="font-sans font-black text-[8px] min-[400px]:text-[10px] sm:text-[16px] tracking-wider text-foreground uppercase mt-1 sm:mt-2 transition-colors duration-300">
                      {resolvedAirlineCompany}
                    </h3>
                    <p className="font-sans font-semibold text-[5px] min-[400px]:text-[6.5px] sm:text-[10.5px] tracking-wide text-muted-foreground uppercase max-w-[130px] min-[400px]:max-w-[160px] sm:max-w-[260px] mt-1 sm:mt-2 leading-tight transition-colors duration-300">
                      {resolvedSlogan}
                    </p>
                  </div>

                  {/* Dotted Perforation Line */}
                  <div className="relative w-full flex items-center justify-between px-3 sm:px-4 my-0 select-none z-20">
                    <div className="w-full border-t-2 border-dotted border-border/80" />
                  </div>

                  {/* Lower Section: VIP Lounge Perks & Metrics */}
                  <div className="relative w-full p-2.5 min-[400px]:p-3 sm:p-6 flex flex-col items-center justify-center overflow-hidden">
                    <AirplaneWatermark className="absolute inset-0 w-full h-full object-cover text-primary-foreground opacity-30" />

                    {/* Black Lounge Banner */}
                    <div className="relative z-10 w-full bg-zinc-950 dark:bg-black text-white py-1 sm:py-2 px-2 text-center rounded-sm shadow-md">
                      <span className="font-sans font-bold text-[7px] min-[400px]:text-[8.5px] sm:text-[13px] uppercase tracking-wider">
                        ✦ SKYCLUB VIP LOUNGE ACCESS ✦
                      </span>
                    </div>

                    {/* 3 VIP Badges Grid */}
                    <div className="relative z-10 grid grid-cols-3 gap-1 sm:gap-2 w-full mt-1.5 sm:mt-3 text-center">
                      <div className="bg-black/25 backdrop-blur-xs py-0.5 sm:py-1 px-1 rounded-sm border border-primary-foreground/20">
                        <span className="block font-mono text-[3.5px] min-[400px]:text-[4.5px] sm:text-[7.5px] font-bold text-primary-foreground/75 uppercase">LOUNGE</span>
                        <span className="block font-sans text-[4.5px] min-[400px]:text-[6px] sm:text-[9.5px] font-black text-primary-foreground">T4 ACCESS</span>
                      </div>
                      <div className="bg-black/25 backdrop-blur-xs py-0.5 sm:py-1 px-1 rounded-sm border border-primary-foreground/20">
                        <span className="block font-mono text-[3.5px] min-[400px]:text-[4.5px] sm:text-[7.5px] font-bold text-primary-foreground/75 uppercase">TIER</span>
                        <span className="block font-sans text-[4.5px] min-[400px]:text-[6px] sm:text-[9.5px] font-black text-primary-foreground">PLATINUM</span>
                      </div>
                      <div className="bg-black/25 backdrop-blur-xs py-0.5 sm:py-1 px-1 rounded-sm border border-primary-foreground/20">
                        <span className="block font-mono text-[3.5px] min-[400px]:text-[4.5px] sm:text-[7.5px] font-bold text-primary-foreground/75 uppercase">BAGGAGE</span>
                        <span className="block font-sans text-[4.5px] min-[400px]:text-[6px] sm:text-[9.5px] font-black text-primary-foreground">3 × 32KG</span>
                      </div>
                    </div>

                    {/* Website link */}
                    <span className="relative z-10 font-sans text-[4px] min-[400px]:text-[5px] sm:text-[8px] text-primary-foreground/90 uppercase tracking-widest mt-1.5 sm:mt-2.5 font-semibold">
                      {resolvedWebsiteUrl} {"//"} 24/7 CONCIERGE
                    </span>
                  </div>
                </div>
              </div>
            ) : isTrainTicket ? (
              /* -------------------------------------------------------- */
              /* EXACT 1:1 REPLICA OF RIGHT TICKET (BACK FACE)            */
              /* -------------------------------------------------------- */
              <div className="relative w-full h-full flex flex-col justify-between text-foreground select-none overflow-hidden rounded-[calc(var(--radius,1.25rem)-2px)]">
                {/* 100% Vector Card Shell with Inward Curved Notch Borders (All-Time Transparent Cutouts) */}
                <svg
                  viewBox="0 0 340 440"
                  preserveAspectRatio="none"
                  className="absolute inset-0 w-full h-full pointer-events-none z-0 text-border/80"
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
                <div className="relative z-10 w-full h-full flex flex-col justify-between overflow-hidden">
                  {/* Upper White/Card Section: Train Logo & Slogan */}
                  <div className="p-2 min-[400px]:p-4 sm:p-8 flex flex-col items-center justify-center text-center my-auto">
                    <HyperboltTrainLogo className="w-12 min-[400px]:w-16 sm:w-36 text-foreground transition-colors duration-300" />
                    <h3 className="font-sans font-black text-[7px] min-[400px]:text-[10px] sm:text-[16px] tracking-wider text-foreground uppercase mt-0.5 sm:mt-2 transition-colors duration-300">
                      {resolvedTrainCompany}
                    </h3>
                    <p className="font-sans font-semibold text-[4.5px] min-[400px]:text-[6.5px] sm:text-[10.5px] tracking-wide text-muted-foreground uppercase max-w-[110px] min-[400px]:max-w-[150px] sm:max-w-[240px] mt-0.5 sm:mt-2 leading-tight transition-colors duration-300">
                      {resolvedSlogan}
                    </p>
                  </div>

                  {/* Dotted Perforation Line (Extends seamlessly from Left Notch to Right Notch) */}
                  <div className="relative w-full flex items-center justify-between px-2 sm:px-4 my-0 select-none z-20">
                    <div className="w-full border-t-2 border-dotted border-border/80" />
                  </div>

                  {/* Lower Primary Banner Section with Station Name */}
                  <div className="relative w-full p-2 min-[400px]:p-3 sm:p-6 flex flex-col items-center justify-center overflow-hidden">
                    <TrainWatermark className="absolute inset-0 w-full h-full object-cover text-primary-foreground opacity-30" />

                    {/* Black Station Box */}
                    <div className="relative z-10 w-full bg-zinc-950 dark:bg-black text-white py-0.5 min-[400px]:py-1 sm:py-2 px-1.5 sm:px-2 text-center rounded-xs sm:rounded-sm shadow-md">
                      <span className="font-sans font-bold text-[6px] min-[400px]:text-[8.5px] sm:text-[14px] uppercase tracking-wider">
                        {resolvedRouteText}
                      </span>
                    </div>

                    {/* Website link */}
                    <span className="relative z-10 font-sans text-[3.5px] min-[400px]:text-[5px] sm:text-[8px] text-primary-foreground/90 uppercase tracking-widest mt-0.5 sm:mt-2 font-semibold">
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
        {/* Custom styled envelope box matching the chosen design aesthetic*/}
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
            {isConfidentialFolder ? (
              <div
                className="px-2.5 py-0.5 sm:py-1 rounded-full font-mono text-[5px] min-[400px]:text-[6.5px] sm:text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs border transition-colors duration-300 shadow-xs flex items-center gap-1.5"
                style={{
                  backgroundColor: "rgba(254, 240, 138, 0.95)",
                  color: "#78350f",
                  borderColor: "#eab308",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                <span>{resolvedDossierNumber}</span>
              </div>
            ) : isKeycard ? (
              <div
                className="px-2.5 py-0.5 sm:py-1 rounded-full font-mono text-[5px] min-[400px]:text-[6.5px] sm:text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs border transition-colors duration-300 shadow-xs flex items-center gap-1.5"
                style={{
                  backgroundColor: "var(--cf-card-bg)",
                  color: "var(--cf-ink)",
                  borderColor: "var(--cf-stroke-flap)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>NFC SMART CARD // SEC-09</span>
              </div>
            ) : isBoardingPass ? (
              <div
                className="px-2.5 py-0.5 sm:py-1 rounded-full font-sans text-[5px] min-[400px]:text-[6.5px] sm:text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs border transition-colors duration-300 shadow-xs"
                style={{
                  backgroundColor: "var(--cf-card-bg)",
                  color: "var(--cf-ink)",
                  borderColor: "var(--cf-stroke-flap)",
                }}
              >
                ✦ {resolvedAirlineCompany} {"//"} VIP LOUNGE
              </div>
            ) : isTrainTicket ? (
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
            ) : isConfidentialFolder ? (
              <div className="flex flex-col items-center justify-center my-auto py-2 sm:py-4 w-full">
                {/* Angled Stamped Badge (No shadow, matching colors in light & dark mode) */}
                <div className="transform -rotate-6 border-2 sm:border-3 border-rose-600 px-3 sm:px-6 py-1 sm:py-2.5 rounded-sm sm:rounded-md bg-rose-500/10 flex flex-col items-center select-none">
                  <span className="font-sans font-black text-[12px] min-[400px]:text-[15px] sm:text-[28px] tracking-[0.2em] sm:tracking-[0.25em] text-rose-600 uppercase leading-none">
                    {resolvedStampBadge}
                  </span>
                  <span className="font-mono text-[4.5px] min-[400px]:text-[5.5px] sm:text-[9px] font-bold tracking-[0.3em] text-rose-600/80 uppercase mt-0.5 sm:mt-1">
                    RESTRICTED EYES ONLY
                  </span>
                </div>

                {/* Folder Index Marking Lines (Matching the preview catalog illustration, identical in light & dark mode) */}
                <div className="w-full max-w-[120px] min-[400px]:max-w-[150px] sm:max-w-[280px] mt-3 sm:mt-6 space-y-1 sm:space-y-2">
                  <div className="h-1 sm:h-2 w-3/4 rounded-full bg-amber-900/25" />
                  <div className="h-1 sm:h-2 w-1/2 rounded-full bg-amber-900/25" />
                </div>
              </div>
            ) : isKeycard ? (
              <CyberNexusSeal
                size={265}
                className="w-[80px] h-[80px] min-[400px]:w-[105px] min-[400px]:h-[105px] sm:w-[265px] sm:h-[265px] transition-colors duration-300 drop-shadow-xs"
                style={{ color: "var(--cf-spiro)" }}
              />
            ) : isBoardingPass ? (
              <AviationRadarSeal
                size={265}
                className="w-[80px] h-[80px] min-[400px]:w-[105px] min-[400px]:h-[105px] sm:w-[265px] sm:h-[265px] transition-colors duration-300 drop-shadow-xs"
                style={{ color: "var(--cf-spiro)" }}
              />
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
              className={cn(
                "text-[11px] min-[400px]:text-[13.5px] sm:text-[23px] font-bold tracking-tight leading-tight transition-colors duration-300 whitespace-nowrap truncate",
                !isConfidentialFolder && "drop-shadow-xs"
              )}
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
export const SecureEnvelope = ConfidentialFolder;
export type SecureEnvelopeProps = ConfidentialFolderProps;
export type SecureEnvelopeInteractionMode = ConfidentialFolderInteractionMode;
export type SecureEnvelopeCardDesign = ConfidentialFolderCardDesign;
export type SecureEnvelopeData = CouponCardData;

export default SecureEnvelope;
