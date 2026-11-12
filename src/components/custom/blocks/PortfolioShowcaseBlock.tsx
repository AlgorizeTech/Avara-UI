"use client";

import React, { forwardRef, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Mail, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "./Button";
import { Modal } from "./ModalBlock";

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
  /** Visual presentation mode. Defaults to 'masonry-portfolio'. */
  variant?: "masonry-portfolio" | "fullscreen";
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
}

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
    slug: "fintech-aura",
    title: "Aura Fintech Banking",
    category: "Mobile App & Design System",
    client: "Aura Global Financial",
    year: "2026",
    description: "An ultra-modern mobile banking experience and comprehensive design system with real-time liquidity visualization, biometric security flows, and seamless multi-currency settlements.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/bento-showcase-1790516064489.jpg",
    tags: ["Mobile", "Fintech", "Design System"],
  },
  {
    slug: "minimal-studio",
    title: "Studio Arch Minimal",
    category: "Architecture & Editorial",
    client: "Atelier Architekten",
    year: "2026",
    description: "Monolithic editorial portfolio website for an international architectural studio, combining high-resolution spatial photography with smooth inertial gallery physics.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/collage-hero-1790516064493.jpg",
    tags: ["Architecture", "Editorial", "Web Design"],
  },
  {
    slug: "lumina-health",
    title: "Lumina Telehealth AI",
    category: "Healthcare & AI Assistant",
    client: "Lumina Care Systems",
    year: "2025",
    description: "Intelligent diagnostic consultation and care booking workflow connecting patients to certified specialists with encrypted medical records and interactive appointment timeline.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/book-appointment-1790516064490.jpg",
    tags: ["AI", "Healthcare", "Web App"],
  },
  {
    slug: "atelier-fashion",
    title: "Maison Haute Couture",
    category: "Luxury Fashion & Ecommerce",
    client: "Maison Parisienne",
    year: "2026",
    description: "Sensory runway collection showcase and high-converting ecommerce storefront with fluid magnetic carousels, lookbook moodboards, and bespoke checkout ergonomics.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/fashion-hero-1790516064495.jpg",
    tags: ["Fashion", "Ecommerce", "Creative"],
  },
  {
    slug: "cloud-metrics",
    title: "Pulse Cloud Observability",
    category: "Developer Tools & SaaS",
    client: "Pulse Metrics Inc",
    year: "2025",
    description: "Zero-latency Kubernetes cluster monitoring dashboard with live metrics telemetry, interactive topological dependency graphs, and predictive incident management.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516056/data-flow-1790516064493.jpg",
    tags: ["SaaS", "Dashboard", "DevTools"],
  },
  {
    slug: "sound-craft",
    title: "Sonic Spatial Experience",
    category: "Interactive Audio & WebGL",
    client: "Sonic Labs Zurich",
    year: "2026",
    description: "Immersive three-dimensional audio-reactive web landscape transforming organic sound frequencies into dynamic procedural light wave sculptures in real-time.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/hero-1790516064495.jpg",
    tags: ["WebGL", "Audio", "Interactive"],
  },
  {
    slug: "strata-billing",
    title: "Strata Revenue Infrastructure",
    category: "Fintech & Invoicing",
    client: "Strata Global Pay",
    year: "2026",
    description: "Enterprise billing automation engine featuring dynamic pricing matrices, localized VAT compliance, automated reconciliation, and beautiful customer invoices.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/pricing-1790516064500.jpg",
    tags: ["Enterprise", "Billing", "Product"],
  },
  {
    slug: "honeycomb-grid",
    title: "Hive Neural Collaboration",
    category: "Productivity & Workspace",
    client: "Hive Technologies",
    year: "2025",
    description: "Hexagonal interconnected canvas for modern product teams, mapping user research insights, interface wireframes, and design components onto a shared spatial board.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/honeycomb-hero-1790516064497.jpg",
    tags: ["Collaboration", "Workspace", "Canvas"],
  },
  {
    slug: "chrono-schedule",
    title: "Chrono Calendar Intelligence",
    category: "Time Management & UI",
    client: "Chrono Labs",
    year: "2026",
    description: "Time-zone agnostic smart scheduling assistant with fluid calendar heatmaps, recurring event sync, and focus-time protection algorithms.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/calendar-1790516064491.jpg",
    tags: ["Productivity", "Calendar", "UI Design"],
  },
  {
    slug: "orbit-gallery",
    title: "Orbital Digital Museum",
    category: "Cultural Arts & Exhibition",
    client: "Modern Art Foundation",
    year: "2026",
    description: "Circular spatial gallery presenting curated contemporary digital artwork, sculpture archives, and generative generative art with gyroscopic navigation.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/orbit-gallery-1790516064499.jpg",
    tags: ["Museum", "Arts", "3D Gallery"],
  },
  {
    slug: "verve-commerce",
    title: "Verve Artisan Goods",
    category: "Brand & Direct-to-Consumer",
    client: "Verve Roasters",
    year: "2025",
    description: "Direct-to-consumer artisanal coffee subscription portal with roast date tracking, origin stories, and interactive tasting notes flavor profile matching.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/product-details-1790516064500.jpg",
    tags: ["Ecommerce", "Branding", "D2C"],
  },
  {
    slug: "nexus-analytics",
    title: "Nexus Global Ledger",
    category: "Big Data & Visualization",
    client: "Nexus Capital",
    year: "2026",
    description: "High-density data grid platform capable of streaming hundreds of thousands of ledger records per second with GPU-accelerated filtering and pivot charting.",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516056/data-grid-1790516064494.jpg",
    tags: ["Big Data", "Fintech", "Analytics"],
  },
];

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
      className,
      ...props
    },
    ref,
  ) => {
    const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
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
      (portfolioItem: PortfolioItem, index: number) => {
        onItemClick?.(portfolioItem, index);
        if (itemModal) {
          setSelectedItem(portfolioItem);
        }
      },
      [itemModal, onItemClick],
    );

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
        </section>

        {/* Interactive Portfolio Details Modal: Full-screen visual showcase with ribbon-like frosted blur */}
        {itemModal && (
          <Modal
            isOpen={Boolean(selectedItem)}
            onClose={() => setSelectedItem(null)}
            variant="custom"
            overlayClassName="bg-black/60 backdrop-blur-xl transition-all duration-300"
            contentClassName="max-w-5xl w-[94vw] sm:w-[88vw] md:w-[82vw] p-0 overflow-y-auto md:overflow-hidden bg-card border border-foreground/15 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl max-h-[90vh] md:max-h-[85vh] flex flex-col relative"
            ariaLabel={activeProject ? `${activeProject.title} Showcase` : "Portfolio Project"}
          >
            {activeProject && (
              <div className="relative w-full flex flex-col md:block overflow-hidden bg-card select-none">
                {/* Complete Project Image: 100% visible with zero zooming or clipping */}
                <div className="relative w-full overflow-hidden flex items-center justify-center bg-card">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] md:max-h-[82vh] object-contain block select-none pointer-events-none"
                  />
                </div>

                {/* Info & Action Controls: In-flow below image on mobile (not absolute), floating frosted ribbon pill on desktop (md:) */}
                <div className="relative md:absolute md:inset-x-6 md:bottom-6 z-20 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 md:py-3.5 md:px-5 border-t md:border border-foreground/10 md:border-foreground/15 dark:border-white/10 md:dark:border-white/15 bg-card/95 md:bg-white/75 md:dark:bg-[#131316]/75 md:backdrop-blur-md md:rounded-2xl">
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
            )}
          </Modal>
        )}
      </>
    );
  },
);

PortfolioShowcase.displayName = "PortfolioShowcase";
