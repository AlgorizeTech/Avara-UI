"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { resolveAccent } from "@/lib/accent";

// ==========================================
// 1. TYPES & DATA
// ==========================================

export interface HoverPeekHighlight {
  id: string;
  word: string;
  images: string[];
  description?: string;
}

export interface HoverPeekProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional top badge or eyebrow tag (e.g., "(Our Philosophy)"). */
  badge?: string;
  /**
   * The statement text. You can use markdown-style `**word**` to indicate
   * the bold highlighted phrases that trigger the image peek.
   */
  statement?: string;
  /** Highlights configuration. Each item must have an `id`, `word`, and 8 image URLs. */
  highlights?: HoverPeekHighlight[];
  /** Card width in pixels. Defaults to 200 (square). */
  cardWidth?: number;
  /** Card height in pixels. Defaults to matching cardWidth (square). */
  cardHeight?: number;
  /** Delay in milliseconds between each infinite card dropping on the stack. Defaults to 280ms. */
  stackInterval?: number;
  /** Theme accent color (e.g. "lavender", "#9b8afb", etc.). */
  themeColor?: string;
}

interface StackCardItem {
  id: number;
  imageIndex: number;
  imgUrl: string;
  rotate: number;
  x: number;
  y: number;
}

interface FallingCardItem extends StackCardItem {
  originX: number;
  originY: number;
  dirX: number;
}

// Predetermined alternating card tilts (alternating left and right)
const CARD_TILTS = [-4.5, 5.2, -5.8, 4.3, -3.5, 5.5, -4.8, 3.2];
// Prominent aka-baka tilts for when cursor leaves bold text
const AKA_BAKA_TILTS = [-14, 16, -13, 15, -15, 14, -12, 16];
const CARD_OFFSETS = [
  { x: -3, y: 1 },
  { x: 4, y: -2 },
  { x: -4, y: 3 },
  { x: 3, y: -3 },
  { x: -2, y: 2 },
  { x: 4, y: -1 },
  { x: -3, y: 2 },
  { x: 2, y: -1 },
];

export const DEFAULT_HOVER_PEEK_HIGHLIGHTS: HoverPeekHighlight[] = [
  {
    id: "organic-sanctuaries",
    word: "organic sanctuaries",
    images: [
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148863/photo-1542273917363-3b1817f69a2d-1790148865110.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1434394354979-a235cd36269d-1790145143490.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1472214103451-9374bd1c798e-1790146212205.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145142/photo-1500530855697-b586d89ba3ee-1790145143493.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1517411032315-54ef2cb783bb-1790146212209.jpg",
    ],
  },
  {
    id: "untamed-wilderness",
    word: "untamed wilderness",
    images: [
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1501785888041-af3ef285b470-1790146212207.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1506905925346-21bda4d32df4-1790146212208.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1483728642387-6c3bdd6c93e5-1790146212206.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790166049/photo-1527004013197-933c4bb611b3-1790166052225.jpg",
    ],
  },
  {
    id: "timeless-craft",
    word: "timeless craft",
    images: [
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1507525428034-b723cf961d3e-1790146212208.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1509316975850-ff9c5deb0cd9-1790146212209.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1519681393784-d120267933ba-1790146212210.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1469854523086-cc02fe5d8800-1790145143492.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145142/photo-1476820865390-c52aeebb9891-1790145143492.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1454496522488-7a8e488e8606-1790145143491.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145142/photo-1495616811223-4d98c6e9c869-1790145143493.jpg",
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1518709268805-4e9042af9f23-1790146212209.jpg",
    ],
  },
];

export const DEFAULT_STATEMENT =
  "We shape **organic sanctuaries** where raw beauty, intuitive motion, and **untamed wilderness** harmonize to awaken quiet moments that feel honest, soulful, and deeply rooted in **timeless craft**.";

// ==========================================
// 2. COMPONENT IMPLEMENTATION
// ==========================================

export function HoverPeek({
  badge = "(Our Philosophy)",
  statement = DEFAULT_STATEMENT,
  highlights = DEFAULT_HOVER_PEEK_HIGHLIGHTS,
  cardWidth = 200,
  cardHeight,
  stackInterval = 280,
  themeColor,
  className,
  ...props
}: HoverPeekProps) {
  // Height matches width by default to ensure perfectly square cards
  const finalCardHeight = cardHeight ?? cardWidth;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Responsive card size: significantly smaller on mobile screens
  const actualCardWidth = isMobile
    ? Math.min(135, cardWidth * 0.65)
    : cardWidth;
  const actualCardHeight = isMobile
    ? Math.min(135, finalCardHeight * 0.65)
    : finalCardHeight;
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [deck, setDeck] = useState<StackCardItem[]>([]);
  const [fallingCards, setFallingCards] = useState<FallingCardItem[]>([]);
  const [dispersedCount, setDispersedCount] = useState<number>(0);
  const [isFalling, setIsFalling] = useState<boolean>(false);

  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseDir = useRef<{ dx: number; dy: number }>({ dx: 1, dy: 0 });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const disperseTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fallStartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cleanupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const counterRef = useRef<number>(0);
  const accent = resolveAccent(themeColor);

  // Clear all running timers helper
  const clearAllTimers = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (disperseTimerRef.current) {
      clearInterval(disperseTimerRef.current);
      disperseTimerRef.current = null;
    }
    if (fallStartTimerRef.current) {
      clearTimeout(fallStartTimerRef.current);
      fallStartTimerRef.current = null;
    }
    if (cleanupTimerRef.current) {
      clearTimeout(cleanupTimerRef.current);
      cleanupTimerRef.current = null;
    }
  }, []);

  // Update cursor position and track exit movement vector
  const updateCursorPosition = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const currentX = clientX - rect.left;
    const currentY = clientY - rect.top;

    const dx = currentX - lastMousePos.current.x;
    const dy = currentY - lastMousePos.current.y;
    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
      mouseDir.current = {
        dx: dx !== 0 ? (dx > 0 ? 1 : -1) : mouseDir.current.dx,
        dy: dy !== 0 ? (dy > 0 ? 1 : -1) : mouseDir.current.dy,
      };
    }
    lastMousePos.current = { x: currentX, y: currentY };
    setCursorPos({ x: currentX, y: currentY });
  };

  // Start infinite sequential card stacking
  const handleMouseEnter = (id: string, e: React.MouseEvent) => {
    clearAllTimers();
    setFallingCards([]);
    setIsFalling(false);
    setDispersedCount(0);

    updateCursorPosition(e.clientX, e.clientY);
    setActiveId(id);

    const highlight = highlights.find((h) => h.id === id);
    const images = highlight?.images || [];
    if (images.length === 0) return;

    counterRef.current = 0;
    const firstCard: StackCardItem = {
      id: 0,
      imageIndex: 0,
      imgUrl: images[0],
      rotate: CARD_TILTS[0],
      x: CARD_OFFSETS[0].x,
      y: CARD_OFFSETS[0].y,
    };
    setDeck([firstCard]);

    timerRef.current = setInterval(() => {
      counterRef.current += 1;
      const count = counterRef.current;
      const imageIndex = count % images.length;
      const tiltIndex = count % CARD_TILTS.length;
      const offsetIndex = count % CARD_OFFSETS.length;

      const newCard: StackCardItem = {
        id: count,
        imageIndex,
        imgUrl: images[imageIndex],
        rotate: CARD_TILTS[tiltIndex],
        x: CARD_OFFSETS[offsetIndex].x,
        y: CARD_OFFSETS[offsetIndex].y,
      };

      // Keep up to 10 latest cards in the visual deck to maintain performance indefinitely
      setDeck((prev) => [...prev.slice(-9), newCard]);
    }, stackInterval);
  };

  // When cursor leaves the bold word:
  // 1. Instantly, all cards tilt aka-baka (prominent alternating left-right angles).
  // 2. Then in place, cards space out one by one with an 8px gap.
  // 3. Once dispersed in place, THEN they plunge down with aka-baka fluttering heads (within 20% of 1 min).
  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (deck.length > 0) {
      const dirX = mouseDir.current.dx >= 0 ? 1 : -1;
      const originX = cursorPos.x;
      const originY = cursorPos.y;
      const count = deck.length;

      const fallingItems: FallingCardItem[] = deck.map((card) => {
        return {
          ...card,
          originX,
          originY,
          dirX,
        };
      });

      setFallingCards(fallingItems);
      setIsFalling(false);
      setDispersedCount(0);

      // Disperse cards one by one in place with 8px gap over ~550ms
      const disperseInterval = Math.max(45, Math.floor(550 / count));
      const totalDisperseTime = count * disperseInterval;

      disperseTimerRef.current = setInterval(() => {
        setDispersedCount((prev) => {
          if (prev < count) {
            return prev + 1;
          }
          if (disperseTimerRef.current) {
            clearInterval(disperseTimerRef.current);
            disperseTimerRef.current = null;
          }
          return prev;
        });
      }, disperseInterval);

      // After cards have spread in place with 8px gap, THEN they plunge down!
      fallStartTimerRef.current = setTimeout(() => {
        setIsFalling(true);
      }, totalDisperseTime + 180);

      // Cleanup when completely fallen
      cleanupTimerRef.current = setTimeout(() => {
        setFallingCards([]);
        setIsFalling(false);
        setDispersedCount(0);
      }, totalDisperseTime + 180 + 850);
    }

    setActiveId(null);
    setDeck([]);
    counterRef.current = 0;
  };

  // Follow cursor across the entire section container
  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!activeId) return;
    updateCursorPosition(e.clientX, e.clientY);
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, [clearAllTimers]);

  // Parse markdown bold **text** to inject interactive highlights
  const parsedTokens = useMemo(() => {
    const parts = statement.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const rawWord = part.slice(2, -2).trim();
        const matched = highlights.find(
          (h) =>
            h.word.toLowerCase() === rawWord.toLowerCase() ||
            h.id.toLowerCase() === rawWord.toLowerCase()
        );
        return {
          isHighlight: true,
          text: rawWord,
          highlight: matched || {
            id: `hl-${index}`,
            word: rawWord,
            images: highlights[0]?.images || [],
          },
        };
      }
      return {
        isHighlight: false,
        text: part,
      };
    });
  }, [statement, highlights]);

  const activeHighlight = highlights.find((h) => h.id === activeId);
  const totalImages = activeHighlight?.images.length || 8;

  // Each card sits overlapping directly on top of the previous card, shifted by exactly 16px
  const cardStep = 16;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleContainerMouseMove}
      className={cn(
        "relative w-full h-full min-h-screen overflow-hidden flex flex-col items-center justify-center select-none cursor-pointer py-12 sm:py-16 px-4 sm:px-8",
        className
      )}
      {...props}
    >
      {/* 
        Keyframe animation:
        hoverPeekCardZoom: Starts small (scale 0.20), overshoots big (scale 1.18), settles back to normal (scale 1.0)
      */}
      <style>{`
        @keyframes hoverPeekCardZoom {
          0% {
            opacity: 0;
            transform: translate(var(--card-x, 0px), var(--card-y, 0px)) rotate(calc(var(--card-rot, 0deg) * 0.4)) scale(0.2);
          }
          60% {
            opacity: 1;
            transform: translate(var(--card-x, 0px), var(--card-y, 0px)) rotate(calc(var(--card-rot, 0deg) * 1.15)) scale(1.18);
          }
          100% {
            opacity: 1;
            transform: translate(var(--card-x, 0px), var(--card-y, 0px)) rotate(var(--card-rot, 0deg)) scale(1);
          }
        }
      `}</style>

      <div className="w-full max-w-5xl md:max-w-6xl mx-auto flex flex-col items-center text-center cursor-pointer px-4 sm:px-6">
        {/* Top Eyebrow Badge */}
        {badge && (
          <div className="mb-6 sm:mb-8 cursor-pointer">
            <span
              className="text-xs sm:text-sm font-medium tracking-wider text-muted-foreground transition-colors cursor-pointer"
              style={{
                color: accent ?? undefined,
              }}
            >
              {badge}
            </span>
          </div>
        )}

        {/* Editorial Statement Typography: Wider width, refined smaller editorial sizing */}
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] xl:text-[2.5rem] font-normal leading-[1.6] sm:leading-[1.5] tracking-tight text-foreground/85 cursor-pointer">
          {parsedTokens.map((token, idx) => {
            if (!token.isHighlight || !token.highlight) {
              return <React.Fragment key={idx}>{token.text}</React.Fragment>;
            }

            const hl = token.highlight;
            const isActive = activeId === hl.id;

            return (
              <span
                key={idx}
                className="relative inline-block mx-1 cursor-pointer"
                onMouseEnter={(e) => handleMouseEnter(hl.id, e)}
                onMouseMove={(e) => updateCursorPosition(e.clientX, e.clientY)}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => {
                  if (isActive) {
                    handleMouseLeave();
                  } else {
                    handleMouseEnter(hl.id, e);
                  }
                }}
              >
                {/* Interactive Highlighted Word: Sleek slanted italic with crisp editorial underline */}
                <span
                  className={cn(
                    "font-serif italic font-normal cursor-pointer underline decoration-1 underline-offset-[6px] sm:underline-offset-[8px] transition-all duration-200",
                    isActive
                      ? "text-foreground decoration-foreground decoration-2"
                      : "text-foreground/90 decoration-foreground/40 hover:decoration-foreground hover:text-foreground"
                  )}
                  style={{
                    textDecorationColor:
                      isActive && accent ? accent : undefined,
                  }}
                >
                  {token.text}
                </span>
              </span>
            );
          })}
        </p>
      </div>

      {/* 1. Active Floating Image Stack Deck: Center locked directly onto Cursor (Responsive square aspect) */}
      <div
        style={{
          position: "absolute",
          left: cursorPos.x,
          top: cursorPos.y,
          width: actualCardWidth,
          height: actualCardHeight,
          transform: "translate(-50%, -50%)",
          opacity: activeId ? 1 : 0,
          pointerEvents: "none",
          zIndex: 50,
          transition: "opacity 160ms ease-out",
        }}
        aria-hidden="true"
      >
        {activeId &&
          deck.map((card, idx) => {
            return (
              <div
                key={card.id}
                style={{
                  zIndex: idx + 1,
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  inset: 0,
                  ["--card-x" as string]: `${card.x}px`,
                  ["--card-y" as string]: `${card.y}px`,
                  ["--card-rot" as string]: `${card.rotate}deg`,
                  animation:
                    "hoverPeekCardZoom 380ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
                }}
                className={cn(
                  "rounded-2xl overflow-hidden bg-card border border-white/80 dark:border-white/20 shadow-md shadow-black/5 dark:shadow-black/20"
                )}
              >
                <img
                  src={card.imgUrl}
                  alt={`Nature visual ${card.imageIndex + 1}`}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  loading="eager"
                />
                {/* Subtle glossy border reflection */}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 pointer-events-none rounded-2xl" />

                {/* Minimal card sequence indicator pill on top card */}
                {idx === deck.length - 1 && (
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono tracking-wider text-white/90 border border-white/20">
                    {String(card.imageIndex + 1).padStart(2, "0")} /{" "}
                    {String(totalImages).padStart(2, "0")}
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* 
        2. Dispersing & Falling Cards:
        - 16px gap between overlapping cards.
        - The instant cursor leaves bold text: cards immediately take their aka-baka tilt!
        - When falling down, cards do NOT fall straight down:
          heads tilt aka-baka to the right and left with flutter and plunge down smoothly!
      */}
      {fallingCards.length > 0 && (
        <div
          style={{
            position: "absolute",
            left: fallingCards[0]?.originX ?? cursorPos.x,
            top: fallingCards[0]?.originY ?? cursorPos.y,
            width: actualCardWidth,
            height: actualCardHeight,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 40,
          }}
          aria-hidden="true"
        >
          {fallingCards.map((card, idx) => {
            const isDispersed = idx < dispersedCount;
            const dir = card.dirX;

            // Immediate aka-baka tilt on mouse leave
            const akaBakaTilt = AKA_BAKA_TILTS[idx % AKA_BAKA_TILTS.length];
            // Dynamic head tilt when falling down
            const fallTilt = idx % 2 === 0 ? -26 : 28;
            const fallDrift = idx % 2 === 0 ? -18 : 18;

            // Target transform:
            // 1. If falling: heads tilt aka-baka to right/left with flutter drift and drop down!
            // 2. If dispersed: overlapping on top of the previous card in place, shifted by 16px!
            // 3. If not dispersed yet: clustered together right after last laid card!
            const currentX = isFalling
              ? dir * (idx * cardStep) + fallDrift
              : isDispersed
              ? dir * (idx * cardStep)
              : dir * (dispersedCount * cardStep) + card.x;

            const currentY = isFalling ? 680 + idx * 24 : card.y;

            // Immediately on cursor leave: aka-baka tilt!
            // When falling: dynamic fluttering head tilt!
            const currentRot = isFalling ? fallTilt : akaBakaTilt;

            const currentScale = isFalling ? 0.88 : 1;
            const currentOpacity = isFalling ? 0 : 1;

            return (
              <div
                key={`fall-${card.id}`}
                style={{
                  zIndex: idx + 1,
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  inset: 0,
                  transform: `translate(${currentX}px, ${currentY}px) rotate(${currentRot}deg) scale(${currentScale})`,
                  opacity: currentOpacity,
                  transition: isFalling
                    ? "transform 750ms cubic-bezier(0.25, 1, 0.5, 1), opacity 650ms ease-in"
                    : "transform 260ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease-out",
                }}
                className={cn(
                  "rounded-2xl overflow-hidden bg-card border border-white/80 dark:border-white/20 shadow-md shadow-black/5 dark:shadow-black/20"
                )}
              >
                <img
                  src={card.imgUrl}
                  alt={`Nature visual ${card.imageIndex + 1}`}
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 pointer-events-none rounded-2xl" />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default HoverPeek;
