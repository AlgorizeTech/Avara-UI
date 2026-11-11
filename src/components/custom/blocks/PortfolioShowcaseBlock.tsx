"use client";

import React, { forwardRef, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Mail, Copy, Check, ArrowUpRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "./Button";
import { Modal } from "./ModalBlock";

export interface CardMorphOrigin {
  top: number;
  left: number;
  width: number;
  height: number;
  rotY: number;
}

export interface PortfolioItem {
  /** Project title */
  title: string;
  /** High-resolution project image URL */
  image: string;
  /** Project slug or unique identifier */
  slug?: string;
  /** Category or discipline (e.g. 'Brand Identity', 'Web Design', 'Mobile App') */
  category?: string;
  /** Comprehensive project description */
  description?: string;
  /** Client or organization name */
  client?: string;
  /** Year of creation or delivery */
  year?: string;
  /** Optional live URL or case study link */
  href?: string;
  /** Tags or keywords */
  tags?: string[];
  /** Detailed specifications or deliverables */
  specs?: Record<string, string>;
  /** Optional custom card height in px (will be clamped between 180 and 340) */
  height?: number;
}

export interface PortfolioShowcaseProps extends Omit<React.HTMLAttributes<HTMLElement>, "onFocus"> {
  /** Visual presentation mode. Defaults to 'masonry-portfolio'. Options: 'masonry-portfolio', 'fullscreen', 'perspective-corridor'. */
  variant?: "masonry-portfolio" | "fullscreen" | "perspective-corridor" | "perspective-runway";
  /** The portfolio project cards shown on the canvas. */
  items?: PortfolioItem[];
  /** Staggered columns in one tile. Defaults to 4. */
  columns?: number;
  /** Gap between cards in pixels in all directions. Defaults to 16. */
  gap?: number;
  /** Vertical stagger offset between alternate columns. Defaults to 72. */
  stagger?: number;
  /** Controls automatic auto-scroll. Set to true (default) for continuous smooth 2D gliding, or false to hold still. */
  interval?: boolean | number;
  /** Interval time in ms when configured. Defaults to 5500. */
  intervalTime?: number;
  /** Sequence ordering: 'serial' or 'shuffle'. */
  order?: "serial" | "shuffle";
  /** Camera zoom / card scale multiplier on desktop. Defaults to 1. */
  zoom?: number;
  /** Camera zoom on mobile / small screens (<=640px). Defaults to 0.5. */
  mobileZoom?: number;
  /** Intro animation duration in ms. Defaults to 0 for instant start. */
  intro?: number;
  /** Whether the user can drag and pan the wall infinitely in all 4 directions with inertia. Defaults to true. */
  draggable?: boolean;
  /** Ambient continuous auto-scroll velocity { x, y } or boolean. Defaults to { x: -0.35, y: -0.18 } when interval=true. */
  drift?: boolean | { x?: number; y?: number };
  /** Opacity of resting cards. Defaults to 1. */
  cardDim?: number;
  /** Whether center card is highlighted. Defaults to false. */
  highlightFocus?: boolean;
  /** Whether cards render with elevated drop shadows. Defaults to true. */
  cardShadow?: boolean;
  /** Whether clicking a portfolio item opens the interactive details modal. Defaults to true. */
  itemModal?: boolean;
  /** Callback fired when an item is clicked. */
  onItemClick?: (item: PortfolioItem, index: number) => void;
  /** Callback fired when center card changes. */
  onFocus?: (index: number) => void;
  /** Optional custom CTA button text in the details modal */
  ctaLabel?: string;
  /** Optional custom CTA button link in the details modal */
  ctaHref?: string;
  /** Custom cursor badge label shown on card hover. Defaults to "View Details". */
  cursorBadgeLabel?: string;
  /** Whether to show the custom orange cursor with badge on card hover. Defaults to true. */
  showCursorBadge?: boolean;
  /** Whether to show simulated live collaborative cursors in 3D perspective mode. Defaults to true. */
  collaborativeCursors?: boolean;
}

const kebab = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// ------------------------------------------
// Geometry: Original card dimensions (384px wide × 285px high) preserved from previous commit
// ------------------------------------------
const CARD_W = 384;
const GAP_DEFAULT = 16;
const STAGGER_DEFAULT = 72;
const CARD_BORDER = 1;
const CARD_PAD = 6;
const CAPTION_H = 16;
const FRAME_W = CARD_W - (CARD_BORDER + CARD_PAD) * 2; // 370px
const FRAME_RATIO = 493 / 332; // ~1.485
const FRAME_H = Math.round(FRAME_W / FRAME_RATIO); // 249px
const CARD_H = CARD_BORDER + CARD_PAD + CAPTION_H + CARD_PAD + FRAME_H + CARD_PAD + CARD_BORDER; // 285px
const PHONE_ZOOM = 0.5;
const CENTER_TILE = "0,0";

interface PlacedCard extends PortfolioItem {
  left: number;
  top: number;
  cardH: number;
  frameH: number;
}

function layoutCards(
  items: PortfolioItem[],
  columns: number,
  gap: number = GAP_DEFAULT,
  stagger: number = STAGGER_DEFAULT,
) {
  const colW = CARD_W + gap;
  // Pad items so that every column has the exact same number of cards, avoiding empty trailing gaps
  const remainder = items.length % columns;
  const fullItems =
    remainder === 0 || items.length === 0
      ? items
      : items.concat(items.slice(0, columns - remainder));

  const rowsPerCol = Math.ceil(fullItems.length / columns);
  // Masonry column offsets: creates an organic staggered wall without identical row lines
  const pattern = [0, 1, 0.42, 1.25, 0.65, 1.1, 0.25, 0.85];
  const colOffsets = Array.from({ length: columns }, (_, c) =>
    stagger > 0 ? Math.round((pattern[c % pattern.length] ?? 0) * stagger) : 0,
  );

  const bottoms = [...colOffsets];
  const placed: PlacedCard[] = fullItems.map((item, i) => {
    const c = i % columns;
    const card: PlacedCard = {
      ...item,
      left: c * colW,
      top: bottoms[c],
      cardH: CARD_H,
      frameH: FRAME_H,
    };
    bottoms[c] += CARD_H + gap;
    return card;
  });

  // Vertical repeat period MUST be exactly rowsPerCol * (CARD_H + gap).
  // Because card.top = colOffsets[c] + r * (CARD_H + gap),
  // (card.top + height) - (lastCard.top + CARD_H) = gap (strictly 16px) across infinite tile repeats for EVERY column!
  const height = rowsPerCol * (CARD_H + gap);
  const width = columns * colW;

  return { placed, width, height };
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// ------------------------------------------
// Individual Portfolio Card (Memoized)
// ------------------------------------------
const ShowcaseCard = React.memo(function ShowcaseCard({
  card,
  left,
  top,
  copy,
  cardDim = 1,
  cardShadow = true,
}: {
  card: PlacedCard;
  left: number;
  top: number;
  copy: boolean;
  cardDim?: number;
  cardShadow?: boolean;
}) {
  return (
    <figure
      aria-hidden={copy || undefined}
      data-card
      data-card-x={left}
      data-card-y={top}
      className={cn(
        "absolute flex flex-col gap-1.5 overflow-hidden rounded-2xl border border-foreground/12 p-2 transition-[opacity,transform,filter,box-shadow] duration-500 ease-out select-none will-change-transform cursor-none",
        cardShadow ? "bg-card shadow-xl shadow-black/20 dark:shadow-black/55" : "bg-muted",
      )}
      style={{
        left,
        top,
        width: CARD_W,
        height: card.cardH,
        opacity: cardDim,
      }}
    >
      <figcaption
        className={cn(
          "flex h-4 shrink-0 items-center px-1 font-mono text-[9px] leading-none select-none transition-colors duration-500",
          cardShadow ? "font-semibold text-foreground" : "text-muted-foreground",
        )}
      >
        {card.title}
      </figcaption>
      <div
        className="relative min-h-0 flex-1 overflow-hidden rounded-lg border border-foreground/10 bg-card select-none"
        style={{ height: card.frameH }}
      >
        <img
          src={card.image}
          alt=""
          width={FRAME_W}
          height={card.frameH}
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover object-top select-none pointer-events-none"
        />
      </div>
    </figure>
  );
});

// ------------------------------------------
// Default Showcase Projects
// ------------------------------------------
export const DEFAULT_PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    slug: "lumen-website",
    title: "Lumen / Website",
    category: "Hero Sculpture",
    client: "Lumen Studio",
    year: "2026",
    description: "An evocative dark editorial hero featuring translucent wireframe statues and fluid kinetic typography.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/hero-1790516064495.jpg",
    tags: ["WebGL", "Hero", "Creative"],
  },
  {
    slug: "orvane-hero",
    title: "Orvane / Hero",
    category: "Architecture & Studio",
    client: "Orvane Group",
    year: "2026",
    description: "Architectural monolithic showcase combining crane skyscraper photography with spatial gallery layouts.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/collage-hero-1790516064493.jpg",
    tags: ["Architecture", "Editorial", "Web Design"],
  },
  {
    slug: "hashi-footer",
    title: "Hashi / Footer",
    category: "Minimal Typography",
    client: "Hashi Living",
    year: "2026",
    description: "Minimalist editorial calendar and scheduling experience with crisp contrast and typographic discipline.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/calendar-1790516064491.jpg",
    tags: ["Minimal", "Typography", "Editorial"],
  },
  {
    slug: "summary-component",
    title: "Summary / Component",
    category: "Design System & UI",
    client: "Summary Labs",
    year: "2025",
    description: "Multi-layered enterprise ledger grid platform with GPU-accelerated pivot charting and real-time telemetry.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516056/data-grid-1790516064494.jpg",
    tags: ["Component", "Design System", "Fintech"],
  },
  {
    slug: "vellmont-footer",
    title: "Vellmont / Footer",
    category: "Blueprints & Structure",
    client: "Vellmont Architekten",
    year: "2025",
    description: "Zero-latency cloud monitoring and architectural telemetry infrastructure with topological node mapping.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516056/data-flow-1790516064493.jpg",
    tags: ["Infrastructure", "Dashboard", "DevTools"],
  },
  {
    slug: "mail-contact",
    title: "Mail / Contact Form",
    category: "Interactive Stationery",
    client: "Atelier Papeterie",
    year: "2026",
    description: "Tactile digital correspondence experience blending handwritten physics with instant email delivery.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/product-details-1790516064500.jpg",
    tags: ["Commerce", "Interaction", "Stationery"],
  },
  {
    slug: "qed-landing",
    title: "QED / Landing",
    category: "Fintech Platform",
    client: "QED Capital",
    year: "2026",
    description: "Enterprise revenue automation portal featuring dynamic pricing tiers and localized compliance flows.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/pricing-1790516064500.jpg",
    tags: ["Fintech", "Pricing", "Enterprise"],
  },
  {
    slug: "offline-404",
    title: "Offline / 404",
    category: "Retro Meadow Display",
    client: "Studio Offline",
    year: "2026",
    description: "Iconic nostalgic Macintosh workstation situated in a blooming countryside meadow at golden sunset.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
    tags: ["3D", "Retro", "Landscape"],
  },
  {
    slug: "meridian-footer",
    title: "Meridian / Footer",
    category: "Agency Monolith",
    client: "Meridian Collective",
    year: "2026",
    description: "Curated contemporary digital gallery archive and sculpture museum with spatial gyroscopic navigation.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/orbit-gallery-1790516064499.jpg",
    tags: ["Museum", "Arts", "Monolith"],
  },
  {
    slug: "driftline-integrations",
    title: "Driftline / Integrations",
    category: "Alpine Wilderness",
    client: "Driftline Outdoor",
    year: "2025",
    description: "High-altitude atmospheric mountain summit expedition documentary with panoramic photography.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
    tags: ["Wilderness", "Photography", "Expedition"],
  },
  {
    slug: "offline-footer",
    title: "Alpine / Studio",
    category: "Modern Architecture",
    client: "Alpine Atelier",
    year: "2025",
    description: "Monolithic concrete architecture nestled in evergreen forest canopies, captured in natural lighting.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
    tags: ["Architecture", "Minimal", "Nature"],
  },
  {
    slug: "qed-footer",
    title: "Pulse / Dashboard",
    category: "Cloud Observability",
    client: "Pulse Metrics",
    year: "2026",
    description: "Intelligent diagnostic healthcare and telemetry booking assistant with real-time status monitors.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/book-appointment-1790516064490.jpg",
    tags: ["Healthcare", "AI", "Dashboard"],
  },
  {
    slug: "meridian-hero",
    title: "Aura / Banking",
    category: "Spatial Commerce",
    client: "Aura Luxury",
    year: "2026",
    description: "Sensory runway collection showcase and high-converting storefront with bespoke tactile ergonomics.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/fashion-hero-1790516064495.jpg",
    tags: ["Fashion", "Commerce", "Creative"],
  },
  {
    slug: "waterline-perils",
    title: "Waterline / Perils",
    category: "Vibrant Poster Art",
    client: "Waterline Creative",
    year: "2026",
    description: "Electrifying cobalt blue editorial composition showcasing floating three-dimensional wireframe typography.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/honeycomb-hero-1790516064497.jpg",
    tags: ["Graphic Design", "3D Typography", "Cobalt"],
  },
  {
    slug: "orbitly-bento",
    title: "Orbitly / Bento",
    category: "Dark Bento Matrix",
    client: "Orbitly Tech",
    year: "2026",
    description: "Midnight black modular bento matrix showcasing product capabilities with vibrant live neon indicator lights.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/bento-showcase-1790516064489.jpg",
    tags: ["Bento", "Dark Mode", "SaaS"],
  },
];

// ------------------------------------------
// 3D Perspective Runway / Corridor Canvas
// ------------------------------------------
interface PerspectiveCorridorCanvasProps {
  items: PortfolioItem[];
  interval?: boolean | number;
  draggable?: boolean;
  showCursorBadge?: boolean;
  cursorBadgeLabel?: string;
  collaborativeCursors?: boolean;
  onCardClick: (item: PortfolioItem, index: number, origin?: CardMorphOrigin) => void;
  className?: string;
}

const PerspectiveCorridorCanvas = React.memo(function PerspectiveCorridorCanvas({
  items,
  interval = true,
  draggable = true,
  showCursorBadge = true,
  cursorBadgeLabel = "View Details",
  collaborativeCursors = false,
  onCardClick,
  className,
}: PerspectiveCorridorCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const customCursorRef = useRef<HTMLDivElement | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hoveredIndexRef = useRef<number | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 1200, height: 720 });

  // Continuous conveyor track scroll in pixels
  const scrollRef = useRef(0);
  const targetScrollRef = useRef(0);
  const velocityRef = useRef(0);

  // Drag tracking
  const isDraggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({
    x: 0,
    y: 0,
    startScroll: 0,
    lastX: 0,
    lastTime: 0,
    moved: false,
  });

  const [, setRenderTrigger] = useState(0);

  // Measure container dimensions
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      setContainerSize({
        width: el.clientWidth || 1200,
        height: el.clientHeight || 720,
      });
    };

    updateSize();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateSize) : null;
    ro?.observe(el);
    return () => ro?.disconnect();
  }, []);

  // Geometry calculations: 3D corridor walls with perspective-corrected depth so cards never overlap
  const isMobile = containerSize.width < 640;
  const isTablet = containerSize.width >= 640 && containerSize.width < 1024;

  const cardW = isMobile ? 220 : isTablet ? 270 : 320;
  const cardH = isMobile ? 290 : isTablet ? 360 : 430;

  const containerW = containerSize.width || 1200;
  const halfW = containerW / 2;
  const wallX = halfW; // Corridor walls start at absolute screen edges

  // Corridor wall depth parameters
  const Z_entry = 80; // Entry point: right at screen border
  const Z_back = -1500; // Deep back wall

  // 15 total items: 5 on right wall, 3 on back wall, 5 on left wall, 2 on return loop
  const M_wall = 5;
  const M_back = 3;
  const PITCH = 280; // Center-to-center pitch along track
  const L_right = M_wall * PITCH;
  const L_back = M_back * PITCH;
  const L_left = M_wall * PITCH;
  const L_visible = L_right + L_back + L_left; // 13 * PITCH
  const L_total = 15 * PITCH; // Exactly 15 items in loop

  const rawList = items && items.length > 0 ? items : DEFAULT_PORTFOLIO_ITEMS;
  const list = useMemo(() => {
    if (rawList.length >= 15) return rawList;
    const targetCount = 15;
    const filled: PortfolioItem[] = [];
    for (let i = 0; i < targetCount; i++) {
      filled.push(rawList[i % rawList.length]);
    }
    return filled;
  }, [rawList]);

  const N = list.length;

  // Animation Loop: smooth conveyor flow entering right and exiting left with zero camera hover tilt
  useEffect(() => {
    let animId: number;
    let lastT = performance.now();

    const loop = (time: number) => {
      const dt = Math.min(32, time - lastT);
      lastT = time;

      // Ambient auto-gliding when not dragging: cards enter right and flow out left
      const isAutoActive = typeof interval === "boolean" ? interval : interval > 0;
      if (!isDraggingRef.current && isAutoActive) {
        targetScrollRef.current += 0.55 * (dt / 16.67);
      }

      // Smooth lerp to target scroll
      scrollRef.current += (targetScrollRef.current - scrollRef.current) * 0.12;

      setRenderTrigger(time);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [interval]);

  // Pointer & Drag handlers: horizontal drag smoothly slides the conveyor along the runway
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!draggable || e.button !== 0) return;
      isDraggingRef.current = true;
      setIsDragging(true);

      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        startScroll: targetScrollRef.current,
        lastX: e.clientX,
        lastTime: performance.now(),
        moved: false,
      };
      velocityRef.current = 0;

      try {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      } catch {}
    },
    [draggable],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update custom theme-aware cursor position (camera stays perfectly rock-solid and stable)
      if (showCursorBadge && e.pointerType !== "touch" && customCursorRef.current) {
        customCursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      if (!isDraggingRef.current) return;

      const deltaX = e.clientX - dragStartRef.current.x;
      if (Math.abs(deltaX) > 4) {
        dragStartRef.current.moved = true;
      }

      // Dragging left advances the conveyor forward (entering right -> exiting left)
      targetScrollRef.current = dragStartRef.current.startScroll - deltaX * 1.35;

      const now = performance.now();
      const dt = Math.max(1, now - dragStartRef.current.lastTime);
      const stepDist = -(e.clientX - dragStartRef.current.lastX);
      velocityRef.current = (stepDist / dt) * 16.67;

      dragStartRef.current.lastX = e.clientX;
      dragStartRef.current.lastTime = now;
    },
    [showCursorBadge],
  );

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    // Apply kinetic inertia
    const maxV = 28;
    const v = Math.max(-maxV, Math.min(maxV, velocityRef.current || 0));
    targetScrollRef.current += v * 8;
  }, []);

  // Wheel scroll along the runway
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = (e.deltaY || e.deltaX) * 0.95;
    targetScrollRef.current += delta;
  }, []);

  const isCardHovered = hoveredIndex !== null;

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      onPointerLeave={() => {
        setHoveredIndex(null);
        hoveredIndexRef.current = null;
      }}
      className={cn(
        "relative w-full h-full overflow-hidden bg-[#F5F5F7] dark:bg-[#0B0B0E] text-foreground select-none touch-none flex items-center justify-center",
        draggable && (isDragging ? "cursor-grabbing" : "cursor-grab"),
        className,
      )}
      style={{
        perspective: "1000px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      {/* 3D Hallway Stage: Perfectly stable camera facing straight down the corridor (zero hover wobbling) */}
      <div
        className="relative w-full h-full pointer-events-none flex items-center justify-center will-change-transform"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {list.map((item, i) => {
          // Exact conveyor position along the corridor track
          const rawS = i * PITCH + scrollRef.current;
          const s = ((rawS % L_total) + L_total) % L_total;

          const isVisible = s <= L_visible + 20;

          let x = 0;
          let z = 0;
          let rotY = 0;

          if (s < L_right) {
            // Segment 1: Right Wall - cards enter right edge and glide deep into perspective
            // Perspective-corrected depth curve ensures cards never overlap and maintain visible ~20px gap
            const t = s / L_right; // 0 to 1
            const cornerRatio = 0.38;
            const screenXRatio = 1 - t * (1 - cornerRatio);
            z = -1000 * ((1 - screenXRatio) / screenXRatio);
            z = Math.max(Z_back, Math.min(Z_entry, z));
            x = wallX;
            rotY = -86;
          } else if (s < L_right + L_back) {
            // Segment 2: Back Wall - cards smoothly travel across from right wall to left wall
            const sBack = s - L_right;
            const t = sBack / L_back;
            x = wallX * (1 - 2 * t);
            z = Z_back;
            rotY = -86 * (1 - 2 * t);
          } else if (s <= L_visible) {
            // Segment 3: Left Wall - cards glide forward along left wall towards front left
            const sLeft = s - (L_right + L_back);
            const t = sLeft / L_left; // 0 (back) to 1 (front)
            const cornerRatio = 0.38;
            const screenXRatio = cornerRatio + t * (1 - cornerRatio);
            z = -1000 * ((1 - screenXRatio) / screenXRatio);
            z = Math.max(Z_back, Math.min(Z_entry, z));
            x = -wallX;
            rotY = 86;
          }

          const isHovered = hoveredIndex === i;
          const zIndex = Math.round(5000 + z);

          return (
            <div
              key={item.slug ?? i}
              data-corridor-card
              onMouseEnter={() => {
                setHoveredIndex(i);
                hoveredIndexRef.current = i;
              }}
              onMouseLeave={() => {
                if (hoveredIndexRef.current === i) {
                  setHoveredIndex(null);
                  hoveredIndexRef.current = null;
                }
              }}
              onClick={(e) => {
                if (!dragStartRef.current.moved) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  onCardClick(item, i, {
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height,
                    rotY,
                  });
                }
              }}
              className="absolute left-1/2 top-1/2 pointer-events-auto cursor-none will-change-transform transition-[filter] duration-200"
              style={{
                width: cardW,
                height: cardH,
                transform: `translate3d(calc(-50% + ${x}px), -50%, ${z}px) rotateY(${rotY}deg)`,
                zIndex,
                visibility: isVisible ? "visible" : "hidden",
              }}
            >
              {/* Caption Label in 3D plane above top edge */}
              <div
                className={cn(
                  "absolute left-0 -top-6 text-[12px] font-sans font-medium tracking-tight whitespace-nowrap transition-colors duration-200 select-none pointer-events-none truncate max-w-full px-0.5",
                  isHovered
                    ? "text-primary font-semibold"
                    : "text-muted-foreground/80 dark:text-muted-foreground/70",
                )}
              >
                {item.title} / {item.category || "Case Study"}
              </div>

              {/* Framed Artwork Canvas with crisp 4px corners */}
              <div
                className={cn(
                  "relative w-full h-full overflow-hidden rounded-[4px] bg-card transition-all duration-200 select-none",
                  isHovered
                    ? "ring-2 ring-primary border-primary shadow-2xl"
                    : "border border-foreground/10 dark:border-white/10 shadow-lg",
                )}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  draggable={false}
                  className="w-full h-full object-cover select-none pointer-events-none"
                />

                {/* Design-Tool Corner Square Handles on Hover (from Alim's reference screenshot) */}
                {isHovered && (
                  <>
                    <span className="absolute -top-1 -left-1 size-2 bg-background border-2 border-primary" />
                    <span className="absolute -top-1 -right-1 size-2 bg-background border-2 border-primary" />
                    <span className="absolute -bottom-1 -left-1 size-2 bg-background border-2 border-primary" />
                    <span className="absolute -bottom-1 -right-1 size-2 bg-background border-2 border-primary" />
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* User's Own Interactive Theme-Aware Cursor with "View Details" Badge */}
      {showCursorBadge && (
        <div
          ref={customCursorRef}
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute left-0 top-0 z-50 transition-opacity duration-150 ease-out select-none will-change-transform flex items-start",
            isCardHovered && !isDragging
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none",
          )}
          style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 text-primary drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
          >
            <path d="M0 0L7.07 17.97L9.58 10.58L16.97 8.07L0 0Z" fill="currentColor" />
          </svg>
          <div className="bg-primary text-primary-foreground text-[12px] font-bold px-2.5 py-1 rounded-[8px] shadow-[0_2px_10px_color-mix(in_oklab,var(--primary)_35%,transparent)] whitespace-nowrap leading-none tracking-wide -ml-1 mt-2.5 select-none">
            {cursorBadgeLabel}
          </div>
        </div>
      )}
    </div>
  );
});

// ------------------------------------------
// PortfolioShowcase Component
// ------------------------------------------
export const PortfolioShowcase = forwardRef<HTMLElement, PortfolioShowcaseProps>(
  (
    {
      variant = "masonry-portfolio",
      items = DEFAULT_PORTFOLIO_ITEMS,
      columns = 4,
      gap = GAP_DEFAULT,
      stagger = STAGGER_DEFAULT,
      interval = true,
      intervalTime = 5500,
      order = "shuffle",
      zoom = 0.55,
      mobileZoom = 0.42,
      intro = 0,
      draggable = true,
      drift,
      cardDim = 1,
      highlightFocus = false,
      cardShadow = true,
      itemModal = true,
      onItemClick,
      onFocus,
      ctaLabel = "View Case Study",
      ctaHref = "#",
      cursorBadgeLabel = "View Details",
      showCursorBadge = true,
      collaborativeCursors = true,
      className,
      ...props
    },
    ref,
  ) => {
    const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
    const [morphOrigin, setMorphOrigin] = useState<CardMorphOrigin | null>(null);
    const [morphStage, setMorphStage] = useState<"idle" | "start" | "expanded" | "closing">("idle");
    const [copiedLink, setCopiedLink] = useState(false);
    const [tiles, setTiles] = useState(CENTER_TILE);
    const [isDragging, setIsDragging] = useState(false);
    const [onScreen, setOnScreen] = useState(true);
    const [isHoveringCard, setIsHoveringCard] = useState(false);
    const isHoveringCardRef = useRef(false);
    const customCursorRef = useRef<HTMLDivElement | null>(null);

    const wrapRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLDivElement | null>(null);
    const cameraRef = useRef({ x: 0, y: 0, s: zoom });
    const tilesRef = useRef(CENTER_TILE);
    const momentumAnimRef = useRef<number | null>(null);
    const driftAnimRef = useRef<number | null>(null);

    // Drag / Pan interaction state
    const dragRef = useRef({
      active: false,
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0,
      camStartX: 0,
      camStartY: 0,
      lastTime: 0,
      vx: 0,
      vy: 0,
      moved: false,
    });

    // Layout memoization
    const { placed, width, height } = useMemo(
      () => layoutCards(items, columns, gap, stagger),
      [items, columns, gap, stagger],
    );
    const placedRef = useRef(placed);
    placedRef.current = placed;

    const tileRef = useRef({ width, height });
    tileRef.current = { width, height };

    // Auto-scroll drift animation: when interval is enabled (true or >0), activate the continuous
    // smooth auto-scrolling glide { x: -0.35, y: -0.18 } restored from the original fullscreen wall variant.
    // Pauses cleanly when the project inspection modal is open.
    const isIntervalActive = typeof interval === "boolean" ? interval : interval > 0;
    const resolvedDrift =
      selectedItem !== null
        ? false
        : drift !== undefined
          ? drift
          : isIntervalActive
            ? { x: -0.35, y: -0.18 }
            : false;

    // Viewport tile culling for infinite 2D canvas wrapping
    const cull = useCallback(() => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const { x, y, s } = cameraRef.current;
      const { width: tw, height: th } = tileRef.current;
      if (!tw || !th) return;

      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (!w || !h) return;

      const margin = CARD_W;
      const minX = -x / s - margin;
      const maxX = (w - x) / s + margin;
      const minY = -y / s - margin;
      const maxY = (h - y) / s + margin;

      const minDx = Math.floor(minX / tw);
      const maxDx = Math.floor(maxX / tw);
      const minDy = Math.floor(minY / th);
      const maxDy = Math.floor(maxY / th);

      const keep: string[] = [];
      for (let dy = minDy; dy <= maxDy; dy++) {
        for (let dx = minDx; dx <= maxDx; dx++) {
          keep.push(`${dx},${dy}`);
        }
      }

      const key = keep.join("|") || CENTER_TILE;
      if (key !== tilesRef.current) {
        tilesRef.current = key;
        setTiles(key);
      }
    }, []);

    // Track whether camera has been initialized
    const initializedRef = useRef(false);

    // Ambient 60fps auto-scroll glide
    const startAmbientDrift = useCallback(() => {
      if (!resolvedDrift || prefersReducedMotion()) return;
      if (momentumAnimRef.current) return;
      if (driftAnimRef.current) cancelAnimationFrame(driftAnimRef.current);

      const dx = typeof resolvedDrift === "object" ? (resolvedDrift.x ?? -0.35) : -0.35;
      const dy = typeof resolvedDrift === "object" ? (resolvedDrift.y ?? -0.18) : -0.18;

      const tickDrift = () => {
        if (dragRef.current.active) {
          driftAnimRef.current = null;
          return;
        }
        cameraRef.current.x += dx;
        cameraRef.current.y += dy;
        const el = canvasRef.current;
        if (el) {
          el.style.translate = `${cameraRef.current.x}px ${cameraRef.current.y}px`;
        }
        cull();
        driftAnimRef.current = requestAnimationFrame(tickDrift);
      };
      driftAnimRef.current = requestAnimationFrame(tickDrift);
    }, [resolvedDrift, cull]);

    // Reactively start or stop drift when resolvedDrift or onScreen changes
    useEffect(() => {
      if (resolvedDrift && onScreen) {
        if (!dragRef.current.active && !momentumAnimRef.current) {
          startAmbientDrift();
        }
      } else {
        if (driftAnimRef.current) {
          cancelAnimationFrame(driftAnimRef.current);
          driftAnimRef.current = null;
        }
      }
      return () => {
        if (driftAnimRef.current) {
          cancelAnimationFrame(driftAnimRef.current);
          driftAnimRef.current = null;
        }
      };
    }, [resolvedDrift, onScreen, startAmbientDrift]);

    // Initial scale & center positioning - only happens ONCE, never resets during scroll/drag
    useLayoutEffect(() => {
      const wrap = wrapRef.current;
      if (!wrap) return;

      const W = wrap.clientWidth;
      const s = W <= 640 && mobileZoom !== undefined ? mobileZoom : zoom;
      cameraRef.current.s = s;

      if (!initializedRef.current) {
        initializedRef.current = true;
        // Center initial canvas position on first mount
        const cx = width / 2;
        const cy = height / 2;
        cameraRef.current.x = W * 0.5 - s * cx;
        cameraRef.current.y = wrap.clientHeight * 0.5 - s * cy;
      }

      const el = canvasRef.current;
      if (el) {
        el.style.translate = `${cameraRef.current.x}px ${cameraRef.current.y}px`;
        el.style.scale = String(s);
        el.style.opacity = "1";
      }
      cull();

      if (resolvedDrift && !dragRef.current.active && !momentumAnimRef.current) {
        startAmbientDrift();
      }

      const handleResize = () => {
        const currentWrap = wrapRef.current;
        if (!currentWrap) return;
        const currentW = currentWrap.clientWidth;
        const newS = currentW <= 640 && mobileZoom !== undefined ? mobileZoom : zoom;
        cameraRef.current.s = newS;
        if (canvasRef.current) {
          canvasRef.current.style.scale = String(newS);
        }
        cull();
      };

      const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(handleResize);
      ro?.observe(wrap);

      return () => {
        ro?.disconnect();
      };
    }, [width, height, zoom, mobileZoom, cull, resolvedDrift, startAmbientDrift]);


    const handlePointerDown = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        if (!draggable || e.button !== 0) return;
        if (momentumAnimRef.current) {
          cancelAnimationFrame(momentumAnimRef.current);
          momentumAnimRef.current = null;
        }
        if (driftAnimRef.current) {
          cancelAnimationFrame(driftAnimRef.current);
          driftAnimRef.current = null;
        }

        if (isHoveringCardRef.current) {
          isHoveringCardRef.current = false;
          setIsHoveringCard(false);
        }

        const d = dragRef.current;
        d.active = true;
        d.startX = e.clientX;
        d.startY = e.clientY;
        d.lastX = e.clientX;
        d.lastY = e.clientY;
        d.camStartX = cameraRef.current.x;
        d.camStartY = cameraRef.current.y;
        d.lastTime = performance.now();
        d.vx = 0;
        d.vy = 0;
        d.moved = false;

        setIsDragging(true);
        try {
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        } catch {}
      },
      [draggable],
    );

    const handlePointerMove = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        // Track custom cursor position and card hover state on desktop
        if (showCursorBadge && e.pointerType !== "touch" && customCursorRef.current && wrapRef.current) {
          const rect = wrapRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          customCursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;

          const target = e.target as HTMLElement | null;
          const isOverCard = Boolean(target?.closest?.("[data-card]"));
          if (isOverCard !== isHoveringCardRef.current) {
            isHoveringCardRef.current = isOverCard;
            setIsHoveringCard(isOverCard);
          }
        }

        const d = dragRef.current;
        if (!d.active) return;

        const deltaX = e.clientX - d.startX;
        const deltaY = e.clientY - d.startY;
        if (!d.moved && Math.hypot(deltaX, deltaY) > 4) {
          d.moved = true;
          if (isHoveringCardRef.current) {
            isHoveringCardRef.current = false;
            setIsHoveringCard(false);
          }
        }

        const now = performance.now();
        const dt = Math.max(1, now - d.lastTime);
        const stepX = e.clientX - d.lastX;
        const stepY = e.clientY - d.lastY;

        d.vx = (stepX / dt) * 16.67;
        d.vy = (stepY / dt) * 16.67;
        d.lastX = e.clientX;
        d.lastY = e.clientY;
        d.lastTime = now;

        cameraRef.current.x = d.camStartX + deltaX;
        cameraRef.current.y = d.camStartY + deltaY;

        const el = canvasRef.current;
        if (el) {
          el.style.translate = `${cameraRef.current.x}px ${cameraRef.current.y}px`;
        }
        cull();
      },
      [cull, showCursorBadge],
    );

    const handleCardSelection = useCallback(
      (portfolioItem: PortfolioItem, index: number, origin?: CardMorphOrigin) => {
        onItemClick?.(portfolioItem, index);
        if (itemModal) {
          setSelectedItem(portfolioItem);
          if (origin) {
            setMorphOrigin(origin);
            setMorphStage("start");
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                setMorphStage("expanded");
              });
            });
          } else {
            setMorphOrigin(null);
            setMorphStage("expanded");
          }
        }
      },
      [itemModal, onItemClick],
    );

    const handleCloseModal = useCallback(() => {
      if (morphOrigin) {
        setMorphStage("closing");
        setTimeout(() => {
          setSelectedItem(null);
          setMorphOrigin(null);
          setMorphStage("idle");
        }, 450);
      } else {
        setSelectedItem(null);
        setMorphStage("idle");
      }
    }, [morphOrigin]);

    useEffect(() => {
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && selectedItem) {
          handleCloseModal();
        }
      };
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }, [selectedItem, handleCloseModal]);

    const handlePointerUp = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        const d = dragRef.current;
        if (!d.active) return;
        d.active = false;
        setIsDragging(false);

        try {
          (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        } catch {}

        // Click / tap item inspection
        if (!d.moved) {
          const wrap = wrapRef.current;
          if (wrap) {
            const rect = wrap.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            const { x, y, s } = cameraRef.current;
            const canvasX = (clickX - x) / s;
            const canvasY = (clickY - y) / s;
            const tw = tileRef.current.width;
            const th = tileRef.current.height;
            const baseDx = Math.floor(canvasX / tw);
            const baseDy = Math.floor(canvasY / th);
            const placedList = placedRef.current;
            let clickedIndex = -1;

            for (let cdy = baseDy - 1; cdy <= baseDy + 1; cdy++) {
              for (let cdx = baseDx - 1; cdx <= baseDx + 1; cdx++) {
                const offsetX = cdx * tw;
                const offsetY = cdy * th;
                for (let i = 0; i < placedList.length; i++) {
                  const c = placedList[i];
                  const left = c.left + offsetX;
                  const top = c.top + offsetY;
                  if (
                    canvasX >= left &&
                    canvasX <= left + CARD_W &&
                    canvasY >= top &&
                    canvasY <= top + (c.cardH ?? CARD_H)
                  ) {
                    clickedIndex = items.length > 0 ? i % items.length : i;
                    break;
                  }
                }
                if (clickedIndex >= 0) break;
              }
              if (clickedIndex >= 0) break;
            }

            if (clickedIndex >= 0) {
              const rawItem = items[clickedIndex] ?? placedList[clickedIndex];
              handleCardSelection(rawItem, clickedIndex);
            }
          }
        }

        // Kinetic inertial momentum physics
        const maxV = 28;
        let vx = Math.max(-maxV, Math.min(maxV, d.vx || 0));
        let vy = Math.max(-maxV, Math.min(maxV, d.vy || 0));

        const tickMomentum = () => {
          if (Math.abs(vx) < 0.15 && Math.abs(vy) < 0.15) {
            momentumAnimRef.current = null;
            if (resolvedDrift) startAmbientDrift();
            return;
          }

          cameraRef.current.x += vx;
          cameraRef.current.y += vy;
          vx *= 0.93;
          vy *= 0.93;

          const el = canvasRef.current;
          if (el) {
            el.style.translate = `${cameraRef.current.x}px ${cameraRef.current.y}px`;
          }
          cull();
          momentumAnimRef.current = requestAnimationFrame(tickMomentum);
        };

        if (Math.hypot(vx, vy) > 0.5) {
          momentumAnimRef.current = requestAnimationFrame(tickMomentum);
        } else if (resolvedDrift) {
          startAmbientDrift();
        }
      },
      [cull, resolvedDrift, startAmbientDrift, handleCardSelection, items],
    );

    // Visibility & screen intersection observers to preserve performance
    useEffect(() => {
      const onVisibility = () => {
        const isHidden = document.hidden;
        if (isHidden) {
          if (driftAnimRef.current) cancelAnimationFrame(driftAnimRef.current);
        } else if (resolvedDrift) {
          startAmbientDrift();
        }
      };
      document.addEventListener("visibilitychange", onVisibility);
      return () => document.removeEventListener("visibilitychange", onVisibility);
    }, [resolvedDrift, startAmbientDrift]);

    useEffect(() => {
      const el = wrapRef.current;
      if (!el || typeof IntersectionObserver === "undefined") return;
      const io = new IntersectionObserver(
        (entries) => {
          const visible = entries.some((e) => e.isIntersecting);
          setOnScreen(visible);
          if (visible && resolvedDrift) {
            startAmbientDrift();
          } else if (driftAnimRef.current) {
            cancelAnimationFrame(driftAnimRef.current);
          }
        },
        { threshold: 0.15 },
      );
      io.observe(el);
      return () => io.disconnect();
    }, [resolvedDrift, startAmbientDrift]);

    // Visible tile offsets
    const offsets = useMemo(
      () =>
        tiles.split("|").map((t: string) => {
          const [dx, dy] = t.split(",").map(Number);
          return { dx, dy };
        }),
      [tiles],
    );

    // Cards grid rendering
    const cards = useMemo(
      () =>
        offsets.map(({ dx, dy }: { dx: number; dy: number }) => {
          const copy = dx !== 0 || dy !== 0;
          return placed.map((card, i) => {
            const key = `${dx},${dy},${i}`;
            return (
              <ShowcaseCard
                key={key}
                card={card}
                left={card.left + dx * width}
                top={card.top + dy * height}
                copy={copy}
                cardDim={cardDim}
                cardShadow={cardShadow}
              />
            );
          });
        }),
      [offsets, placed, width, height, cardDim, cardShadow],
    );

    const activeProject = selectedItem ?? items[0];
    const isCorridor = variant === "perspective-corridor" || variant === "perspective-runway";

    return (
      <>
        <section
          ref={ref}
          className={cn(
            "relative w-full h-[520px] sm:h-[640px] lg:h-[760px] overflow-hidden bg-background text-foreground select-none",
            className,
          )}
          {...props}
        >
          {isCorridor ? (
            <PerspectiveCorridorCanvas
              items={items}
              interval={interval}
              draggable={draggable}
              showCursorBadge={showCursorBadge}
              cursorBadgeLabel={cursorBadgeLabel}
              collaborativeCursors={collaborativeCursors}
              onCardClick={(item, index, origin) => {
                handleCardSelection(item, index, origin);
              }}
            />
          ) : (
            <>
              {/* Multi-tiered 3D convex dome cushion underneath the cards in center */}
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-0"
                aria-hidden
              >
                {/* Ambient diffuse primary aura around the base */}
                <div
                  className="absolute w-[980px] max-w-[96vw] h-[640px] rounded-full blur-3xl opacity-75 dark:opacity-45"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 50%, color-mix(in oklab, var(--primary) 22%, transparent) 0%, color-mix(in oklab, var(--primary) 8%, transparent) 55%, transparent 75%)",
                  }}
                />

                {/* Base Tier 1: Outer mound rim with 3D elevation shadow */}
                <div
                  className="absolute w-[880px] max-w-[94vw] h-[550px] rounded-full border border-foreground/[0.08] dark:border-white/[0.09] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.14),inset_0_1px_2px_rgba(255,255,255,0.7)] dark:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.65),inset_0_1px_2px_rgba(255,255,255,0.15)]"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 40%, color-mix(in oklab, var(--card) 92%, white) 0%, color-mix(in oklab, var(--card) 65%, var(--background)) 55%, color-mix(in oklab, var(--background) 90%, transparent) 85%, transparent 100%)",
                  }}
                />

                {/* Mid Tier 2: Rising dome slope ring */}
                <div
                  className="absolute w-[640px] max-w-[80vw] h-[400px] rounded-full border border-foreground/[0.10] dark:border-white/[0.12] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.16),inset_0_2px_4px_rgba(255,255,255,0.85)] dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7),inset_0_2px_4px_rgba(255,255,255,0.2)]"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 36%, color-mix(in oklab, var(--card) 98%, white) 0%, color-mix(in oklab, var(--card) 80%, white) 45%, color-mix(in oklab, var(--primary) 12%, transparent) 80%, transparent 100%)",
                  }}
                />

                {/* Apex Tier 3: Center crest / peak */}
                <div
                  className="absolute w-[400px] max-w-[58vw] h-[250px] rounded-full border border-foreground/[0.12] dark:border-white/[0.16] shadow-[0_14px_35px_-6px_rgba(0,0,0,0.18),inset_0_2px_6px_rgba(255,255,255,0.95)] dark:shadow-[0_14px_35px_-6px_rgba(0,0,0,0.75),inset_0_2px_6px_rgba(255,255,255,0.25)]"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 30%, color-mix(in oklab, var(--card) 99%, white) 0%, color-mix(in oklab, var(--card) 88%, white) 50%, color-mix(in oklab, var(--primary) 18%, transparent) 85%, transparent 100%)",
                  }}
                />

                {/* Specular light glint at top-center of the dome peak */}
                <div
                  className="absolute -translate-y-8 w-[220px] h-[95px] rounded-full blur-md opacity-80 dark:opacity-40"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.95) 0%, color-mix(in oklab, var(--primary) 30%, white) 45%, transparent 75%)",
                  }}
                />
              </div>

              {/* Self-contained 2D Infinite Canvas */}
              <div
                ref={wrapRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onPointerLeave={() => {
                  if (isHoveringCardRef.current) {
                    isHoveringCardRef.current = false;
                    setIsHoveringCard(false);
                  }
                }}
                className={cn(
                  "relative z-10 size-full overflow-hidden select-none touch-none [mask-image:radial-gradient(ellipse_78%_68%_at_50%_50%,black_45%,rgba(0,0,0,0.85)_75%,transparent_100%)]",
                  draggable && (isDragging ? "cursor-grabbing" : "cursor-grab"),
                )}
              >
                <div
                  ref={canvasRef}
                  className="absolute left-0 top-0 will-change-transform origin-top-left"
                  style={{ width, height, opacity: 0 }}
                >
                  {cards}
                </div>

                {/* Custom Theme-Aware Mouse Pointer with "View Details" Badge */}
                {showCursorBadge && (
                  <div
                    ref={customCursorRef}
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute left-0 top-0 z-40 transition-opacity duration-150 ease-out select-none will-change-transform flex items-start",
                      isHoveringCard && !isDragging && !selectedItem
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95 pointer-events-none",
                    )}
                    style={{
                      transform: "translate3d(-9999px, -9999px, 0)",
                    }}
                  >
                    {/* Mouse Cursor Arrow matching Theme Color */}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 text-primary drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
                    >
                      <path
                        d="M0 0L7.07 17.97L9.58 10.58L16.97 8.07L0 0Z"
                        fill="currentColor"
                      />
                    </svg>

                    {/* Pill Badge matching Theme Color */}
                    <div className="bg-primary text-primary-foreground text-[12px] font-bold px-2.5 py-1 rounded-[8px] shadow-[0_2px_10px_color-mix(in_oklab,var(--primary)_35%,transparent)] whitespace-nowrap leading-none tracking-wide -ml-1 mt-2.5 select-none">
                      {cursorBadgeLabel}
                    </div>
                  </div>
                )}
              </div>

              {/* 4-sided smooth perimeter vignette */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-28 sm:h-40 bg-gradient-to-b from-background via-background/85 to-transparent z-20" aria-hidden />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 sm:h-40 bg-gradient-to-t from-background via-background/85 to-transparent z-20" aria-hidden />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-background via-background/85 to-transparent z-20" aria-hidden />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-background via-background/85 to-transparent z-20" aria-hidden />
            </>
          )}
        </section>

        {/* Interactive Portfolio Details Modal: Rising & morphing smooth transition from clicked 3D card into full modal */}
        {itemModal && selectedItem && typeof document !== "undefined" && createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center select-none pointer-events-auto">
            {/* Backdrop with frosted blur */}
            <div
              onClick={handleCloseModal}
              className={cn(
                "fixed inset-0 bg-black/60 backdrop-blur-xl transition-opacity duration-500 ease-out",
                morphStage === "expanded" ? "opacity-100" : "opacity-0",
              )}
            />

            {/* Rising & Expanding Morphing Card */}
            <div
              style={
                (morphStage === "start" || morphStage === "closing") && morphOrigin
                  ? {
                      position: "fixed",
                      top: morphOrigin.top,
                      left: morphOrigin.left,
                      width: morphOrigin.width,
                      height: morphOrigin.height,
                      transform: `perspective(1000px) rotateY(${morphOrigin.rotY}deg) scale(1)`,
                      transformOrigin: "center center",
                      borderRadius: "4px",
                      transition: morphStage === "closing" ? "all 450ms cubic-bezier(0.16, 1, 0.3, 1)" : "none",
                    }
                  : {
                      position: "fixed",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%) perspective(1000px) rotateY(0deg) scale(1)",
                      transformOrigin: "center center",
                      width: "min(94vw, 1024px)",
                      height: "min(88vh, 820px)",
                      borderRadius: "24px",
                      transition: "all 550ms cubic-bezier(0.16, 1, 0.3, 1)",
                    }
              }
              className="overflow-hidden bg-card border border-foreground/15 dark:border-white/10 shadow-2xl flex flex-col relative will-change-transform z-10"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-30 size-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X size={18} />
              </button>

              {/* Complete Project Image: 100% visible with zero zooming or clipping */}
              <div className="relative w-full flex-1 overflow-hidden flex items-center justify-center bg-card">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] md:max-h-[82vh] object-contain block select-none pointer-events-none"
                />
              </div>

              {/* Info & Action Controls: In-flow below image on mobile (not absolute), floating frosted ribbon pill on desktop (md:) */}
              <div
                className={cn(
                  "relative md:absolute md:inset-x-6 md:bottom-6 z-20 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 md:py-3.5 md:px-5 border-t md:border border-foreground/10 md:border-foreground/15 dark:border-white/10 md:dark:border-white/15 bg-card/95 md:bg-white/75 md:dark:bg-[#131316]/75 md:backdrop-blur-md md:rounded-2xl transition-all duration-400 delay-150",
                  morphStage === "expanded" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                )}
              >
                <div className="space-y-1 md:space-y-0.5 max-w-xl">
                  <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground">
                    {activeProject.title}
                  </h2>
                  {activeProject.category && (
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                      {activeProject.category}
                    </p>
                  )}
                  {activeProject.description && (
                    <p className="text-xs sm:text-sm text-muted-foreground/90 leading-relaxed pt-1 md:hidden">
                      {activeProject.description}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 w-full md:w-auto shrink-0 pt-1 md:pt-0 [&>div]:w-full sm:[&>div]:w-auto [&>div>button]:w-full sm:[&>div>button]:w-auto [&>button]:w-full sm:[&>button]:w-auto">
                  <Button
                    variant="default"
                    size="default"
                    onClick={(e) => {
                      e.preventDefault();
                      if (activeProject.href && activeProject.href !== "#") {
                        window.open(activeProject.href, "_blank", "noopener,noreferrer");
                      }
                    }}
                    iconRight={<ArrowUpRight size={15} />}
                    className="w-full sm:w-auto font-medium"
                  >
                    {ctaLabel}
                  </Button>

                  <Button
                    variant="outline"
                    size="default"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    iconLeft={<Mail size={15} />}
                    className="w-full sm:w-auto font-medium"
                  >
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
      </>
    );
  },
);

PortfolioShowcase.displayName = "PortfolioShowcase";
