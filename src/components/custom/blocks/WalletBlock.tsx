"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Nfc, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// ==========================================
// TYPES & DATA STRUCTURES
// ==========================================
export interface WalletCardItem {
  id?: string;
  name: string;
  balance: string;
  currency?: string;
  gradientLight?: string;
  gradientDark?: string;
  textColorLight?: string;
  textColorDark?: string;
  subtextColorLight?: string;
  subtextColorDark?: string;
  hasChip?: boolean;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  tag?: string;
  issuer?: string;
  backSignatureLabel?: string;
  backSubtitle?: string;
  backNotice?: string;
}

export interface WalletProps extends React.HTMLAttributes<HTMLDivElement> {
  cards?: WalletCardItem[];
  overallBalance?: string;
  overallLabel?: string;
  revealText?: string;
  concealText?: string;
  maskedBalance?: string;
  allowReveal?: boolean;
  defaultRevealed?: boolean;
  autoRevealOnHover?: boolean;
  walletColor?: string;
}

// 3 authentic cards matching the reference design
export const DEFAULT_WALLET_CARDS: WalletCardItem[] = [
  {
    id: "card-1",
    name: "Pounds",
    balance: "€46,000.00",
    currency: "GBP",
    gradientLight: "from-amber-400 via-amber-400 to-amber-500",
    gradientDark: "from-amber-400 via-amber-500 to-amber-600",
    textColorLight: "text-amber-950",
    textColorDark: "text-amber-950",
    subtextColorLight: "text-amber-900/80",
    subtextColorDark: "text-amber-950/70",
    cardNumber: "•••• 9142",
    expiry: "08/29",
    cvv: "614",
    tag: "SAVINGS",
    issuer: "PINSTACK",
  },
  {
    id: "card-2",
    name: "Pounds",
    balance: "€46,000.00",
    currency: "GBP",
    gradientLight: "from-fuchsia-500 via-purple-500 to-violet-600",
    gradientDark: "from-fuchsia-600 via-purple-600 to-violet-700",
    textColorLight: "text-white",
    textColorDark: "text-white",
    subtextColorLight: "text-white/80",
    subtextColorDark: "text-white/70",
    cardNumber: "•••• 3058",
    expiry: "11/28",
    cvv: "832",
    tag: "CURRENT",
    issuer: "PINSTACK",
  },
  {
    id: "card-3",
    name: "Euros",
    balance: "€46,000.00",
    currency: "EUR",
    gradientLight: "from-blue-600 via-indigo-600 to-blue-700",
    gradientDark: "from-blue-600 via-indigo-600 to-blue-800",
    textColorLight: "text-white",
    textColorDark: "text-white",
    subtextColorLight: "text-blue-100/80",
    subtextColorDark: "text-blue-200/70",
    hasChip: true,
    cardNumber: "•••• 4829",
    expiry: "09/30",
    cvv: "429",
    tag: "PRIMARY",
    issuer: "PINSTACK",
  },
];

// ==========================================
// SUBCOMPONENT: METALLIC EMV CHIP
// ==========================================
function EmvChip({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-9 h-7 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-500 p-0.5 shadow-sm border border-amber-600/40 overflow-hidden",
        className
      )}
    >
      <div className="w-full h-full border border-amber-700/30 rounded-[3px] flex items-center justify-center relative bg-gradient-to-b from-amber-300/40 to-transparent">
        <div className="absolute inset-x-0 h-[1px] bg-amber-700/40 top-1/2 -translate-y-1/2" />
        <div className="absolute inset-y-0 w-[1px] bg-amber-700/40 left-1/3" />
        <div className="absolute inset-y-0 w-[1px] bg-amber-700/40 right-1/3" />
        <div className="w-2.5 h-2.5 rounded-full border border-amber-700/40 bg-amber-200/50" />
      </div>
    </div>
  );
}

// ==========================================
// MAIN COMPONENT: WALLET
// ==========================================
export function Wallet({
  cards = DEFAULT_WALLET_CARDS,
  overallBalance = "$89,000.00",
  overallLabel = "Overall Balance",
  revealText = "Reveal balance",
  concealText = "Conceal balance",
  maskedBalance = "✱✱✱✱✱✱✱✱",
  allowReveal = true,
  defaultRevealed = false,
  autoRevealOnHover = false,
  walletColor,
  className,
  ...props
}: WalletProps) {
  const activeCards = cards.length > 0 ? cards : DEFAULT_WALLET_CARDS;
  const baseColor = walletColor || "var(--primary, #6366f1)";
  const [isHovered, setIsHovered] = useState(false);
  const [isRevealed, setIsRevealed] = useState(defaultRevealed);
  const [elevatedCardIdx, setElevatedCardIdx] = useState<number | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const shouldShowBalance = isRevealed || (autoRevealOnHover && isHovered);

  // Stagger offsets for the 3 cards when hovered:
  // Card 0 (back, Amber) -> y: -130px
  // Card 1 (middle, Fuchsia) -> y: -75px
  // Card 2 (front, Blue) -> y: -20px
  const cardStaggers = [
    { y: -130, scale: 0.96, delay: 0.12, rotate: -1 },
    { y: -75, scale: 0.98, delay: 0.06, rotate: 0.8 },
    { y: -20, scale: 1.0, delay: 0.0, rotate: 0 },
  ];

  const handleCardClick = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (elevatedCardIdx === idx) {
      // Card is already elevated: toggle flip front/back!
      setIsFlipped((prev) => !prev);
    } else {
      // Elevate this card and reset flip to front face
      setElevatedCardIdx(idx);
      setIsFlipped(false);
    }
  };

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center p-4 sm:p-12 w-full select-none",
        className
      )}
      {...props}
    >
      {/* Outer interactive wallet frame */}
      <div
        className="relative w-full max-w-[380px] h-[470px] flex items-end justify-center cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setElevatedCardIdx(null);
          setIsFlipped(false);
        }}
        onClick={() => {
          // If clicked outside cards while elevated, un-elevate
          if (elevatedCardIdx !== null) {
            setElevatedCardIdx(null);
            setIsFlipped(false);
          } else {
            setIsHovered((prev) => !prev);
          }
        }}
      >
        {/* ========================================================= */}
        {/* LAYER 1: BACK PLATE (Nicher Pit - Rear Sleeve)            */}
        {/* Height is 242px with matching 28px rounded corners        */}
        {/* ========================================================= */}
        <svg
          viewBox="0 0 380 242"
          className="absolute bottom-0 inset-x-0 w-full h-[242px] pointer-events-none drop-shadow-sm"
          preserveAspectRatio="none"
        >
          <path
            d="
              M 28 0
              H 352
              A 28 28 0 0 1 380 28
              V 214
              A 28 28 0 0 1 352 242
              H 28
              A 28 28 0 0 1 0 214
              V 28
              A 28 28 0 0 1 28 0
              Z
            "
            className="transition-colors duration-300"
            style={{
              fill: `color-mix(in srgb, ${baseColor} 85%, #000000)`,
              stroke: "rgba(255, 255, 255, 0.2)",
            }}
            strokeWidth="1.5"
          />
        </svg>

        {/* ========================================================= */}
        {/* LAYER 2: THE 3 CARDS                                      */}
        {/* Supports serial hover, elevation on click, and 3D flip    */}
        {/* ========================================================= */}
        {activeCards.slice(0, 3).map((card, idx) => {
          const stagger = cardStaggers[idx] || cardStaggers[0];
          const isElevated = elevatedCardIdx === idx;
          const isCardFlippedNow = isElevated && isFlipped;

          // Target Y:
          // If elevated: rises high up (-230px)
          // Else if hovered: normal stagger position
          // Else: tucked inside wallet (0)
          let targetY = 0;
          if (isElevated) {
            targetY = -230;
          } else if (isHovered) {
            targetY = stagger.y;
          }

          // Target scale & rotation
          const targetScale = isElevated ? 1.03 : isHovered ? stagger.scale : 1 - (2 - idx) * 0.02;
          const targetRotate = isElevated ? 0 : isHovered ? stagger.rotate : 0;

          // Z-index: elevated card has top priority (50), higher than front flap (40)
          const zIndex = isElevated ? 50 : 10 + idx * 10;

          return (
            <motion.div
              key={card.id || `card-${idx}`}
              className="absolute bottom-[35px] left-[5%] w-[90%] h-[195px] cursor-pointer"
              style={{
                zIndex,
                perspective: 1200,
                transformOrigin: "bottom center",
              }}
              initial={false}
              animate={{
                y: targetY,
                scale: targetScale,
                rotate: targetRotate,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 22,
                mass: 0.8,
                delay: isElevated ? 0 : isHovered ? stagger.delay : (2 - idx) * 0.04,
              }}
              onClick={(e) => handleCardClick(idx, e)}
            >
              {/* 3D Rotator for Card Flip */}
              <motion.div
                className="w-full h-full relative"
                style={{
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  rotateY: isCardFlippedNow ? 180 : 0,
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                {/* =================================================== */}
                {/* FRONT FACE (Ager Pit)                               */}
                {/* =================================================== */}
                <div
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                  className={cn(
                    "absolute inset-0 p-4 flex flex-col justify-between border rounded-[22px] overflow-hidden shadow-lg transition-colors duration-200",
                    `bg-gradient-to-r ${card.gradientLight || "from-amber-400 to-amber-500"}`,
                    `dark:bg-gradient-to-r ${card.gradientDark || "from-amber-400 to-amber-600"}`,
                    "border-black/5 dark:border-white/10"
                  )}
                >
                  {/* Surface specular highlight */}
                  <div className="absolute inset-0 rounded-[22px] bg-gradient-to-b from-white/20 via-transparent to-black/10 pointer-events-none" />

                  {/* Header: Name & Balance */}
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "font-bold text-sm sm:text-base tracking-tight",
                          card.textColorLight || "text-zinc-950",
                          `dark:${card.textColorDark || "text-white"}`
                        )}
                      >
                        {card.name}
                      </span>
                      {card.tag && (
                        <span
                          className={cn(
                            "text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border",
                            "bg-black/5 dark:bg-white/10 border-black/10 dark:border-white/20",
                            card.subtextColorLight || "text-zinc-800",
                            `dark:${card.subtextColorDark || "text-zinc-200"}`
                          )}
                        >
                          {card.tag}
                        </span>
                      )}
                    </div>

                    <span
                      className={cn(
                        "font-mono font-semibold text-sm sm:text-base tracking-tight",
                        card.textColorLight || "text-zinc-950",
                        `dark:${card.textColorDark || "text-white"}`
                      )}
                    >
                      {card.balance}
                    </span>
                  </div>

                  {/* Middle: EMV Chip & NFC */}
                  <div className="flex items-center justify-between relative z-10 mt-auto mb-2">
                    {card.hasChip ? (
                      <EmvChip />
                    ) : (
                      <div className="w-9 h-7 rounded-md border border-black/10 dark:border-white/20 flex items-center justify-center bg-black/5 dark:bg-white/5">
                        <Nfc
                          className={cn(
                            "w-4 h-4 opacity-70",
                            card.textColorLight || "text-zinc-900",
                            `dark:${card.textColorDark || "text-white"}`
                          )}
                        />
                      </div>
                    )}

                    <Nfc
                      className={cn(
                        "w-5 h-5 opacity-60",
                        card.textColorLight || "text-zinc-900",
                        `dark:${card.textColorDark || "text-white"}`
                      )}
                    />
                  </div>

                  {/* Footer: Card Number, Expiry, Issuer */}
                  <div className="flex items-center justify-between text-xs font-mono relative z-10">
                    <span
                      className={cn(
                        "opacity-90 font-medium tracking-wider",
                        card.textColorLight || "text-zinc-900",
                        `dark:${card.textColorDark || "text-white"}`
                      )}
                    >
                      {card.cardNumber || "•••• 4829"}
                    </span>
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "opacity-80 font-medium",
                          card.subtextColorLight || "text-zinc-800",
                          `dark:${card.subtextColorDark || "text-zinc-200"}`
                        )}
                      >
                        {card.expiry || "12/29"}
                      </span>
                      <span
                        className={cn(
                          "font-sans font-bold text-[10px] tracking-wider uppercase opacity-85",
                          card.textColorLight || "text-zinc-900",
                          `dark:${card.textColorDark || "text-white"}`
                        )}
                      >
                        {card.issuer || "PINSTACK"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* =================================================== */}
                {/* BACK FACE (Ulta Pit - Magnetic Stripe & CVV)        */}
                {/* =================================================== */}
                <div
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                  className={cn(
                    "absolute inset-0 flex flex-col justify-between border rounded-[22px] overflow-hidden shadow-lg transition-colors duration-200",
                    `bg-gradient-to-r ${card.gradientLight || "from-amber-400 to-amber-500"}`,
                    `dark:bg-gradient-to-r ${card.gradientDark || "from-amber-400 to-amber-600"}`,
                    "border-black/5 dark:border-white/10"
                  )}
                >
                  {/* Top: Black Magnetic Stripe */}
                  <div className="w-full h-8 bg-zinc-950 mt-3 shadow-inner relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                  </div>

                  {/* Middle: Signature Box with CVV + Shiny Hologram Badge */}
                  <div className="px-4 flex items-center justify-between gap-3 my-auto">
                    {/* Signature Box */}
                    <div className="h-8 bg-white/95 rounded-sm flex items-center justify-between px-3 flex-1 border border-black/10 shadow-inner">
                      <span className="text-[8px] sm:text-[9px] font-sans font-semibold tracking-wider text-zinc-400 uppercase select-none">
                        {card.backSignatureLabel || "AUTHORIZED SIGNATURE"}
                      </span>
                      <span className="text-xs font-mono font-bold italic text-zinc-900 tracking-wider">
                        {card.cvv || "832"}
                      </span>
                    </div>

                    {/* Shiny Hologram Emblem */}
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-500 p-0.5 shadow-sm border border-white/30 flex items-center justify-center shrink-0">
                      <div className="w-4 h-4 rounded-full border border-white/60 bg-white/15 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                      </div>
                    </div>
                  </div>

                  {/* Footer: Legal Disclaimer & Currency Name */}
                  <div className="px-4 pb-3 flex items-end justify-between text-white">
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-[8.5px] uppercase tracking-wider opacity-90 leading-tight">
                        {card.backSubtitle || "GLOBAL SECURE ASSET CARD"}
                      </span>
                      <span className="text-[7.5px] font-medium tracking-wide opacity-70 leading-tight">
                        {card.backNotice || `NOT VALID UNLESS SIGNED • ISSUED BY ${card.issuer || "PINSTACK"}`}
                      </span>
                    </div>

                    <span className="font-extrabold text-xs tracking-wider uppercase opacity-95">
                      {card.name.toUpperCase()}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}

        {/* ========================================================= */}
        {/* LAYER 3: FRONT POCKET FLAP (Uporer Pit)                   */}
        {/* Full solid theme color: changes when theme switches       */}
        {/* ========================================================= */}
        <div
          className="absolute bottom-0 w-full h-[225px] rounded-b-[28px] pointer-events-none"
          style={{ zIndex: 40 }}
        >
          {/* SVG Shape: Center scoop at top, fully closed at bottom */}
          <svg
            viewBox="0 0 380 225"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
          >
            <path
              d="
                M 28 0
                H 115
                C 135 0, 150 28, 190 28
                C 230 28, 245 0, 265 0
                H 352
                A 28 28 0 0 1 380 28
                V 197
                A 28 28 0 0 1 352 225
                H 28
                A 28 28 0 0 1 0 197
                V 28
                A 28 28 0 0 1 28 0
                Z
              "
              className="transition-colors duration-300"
              style={{
                fill: baseColor,
                stroke: "rgba(255, 255, 255, 0.25)",
              }}
              strokeWidth="1.5"
            />
          </svg>

          {/* Front Face Content: Balance, Reveal Button, Subtitle, Bottom Accent */}
          <div className="absolute inset-0 flex flex-col items-center justify-between py-5 px-6 pointer-events-auto">
            {/* Top: Reveal / Conceal Balance Toggle */}
            <div className="mt-4 flex items-center justify-center">
              {allowReveal && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsRevealed((prev) => !prev);
                  }}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full transition-all duration-200 cursor-pointer border bg-white/20 hover:bg-white/30 text-white border-white/25 backdrop-blur-sm"
                >
                  <span>{shouldShowBalance ? concealText : revealText}</span>
                  {shouldShowBalance ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </button>
              )}
            </div>

            {/* Middle: Masked vs Unmasked Balance */}
            <div className="flex flex-col items-center justify-center my-auto">
              <AnimatePresence mode="wait">
                {shouldShowBalance ? (
                  <motion.div
                    key="unmasked"
                    initial={{ opacity: 0, y: 4, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -4, filter: "blur(4px)" }}
                    transition={{ duration: 0.2 }}
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight font-sans transition-colors text-white drop-shadow-sm"
                  >
                    {overallBalance}
                  </motion.div>
                ) : (
                  <motion.div
                    key="masked"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="text-xl sm:text-2xl font-mono font-bold tracking-[0.35em] transition-colors text-white"
                  >
                    {maskedBalance}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Subtitle */}
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider mt-1 uppercase transition-colors text-white/80">
                {overallLabel}
              </span>
            </div>

            {/* Bottom: Solid decorative thumb notch accent on full color face */}
            <div className="w-11 h-4 rounded-t-full transition-colors border-t border-x bg-black/25 border-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
