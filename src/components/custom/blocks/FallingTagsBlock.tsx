"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { cn } from "@/lib/utils";
import {
  RotateCcw,
  Sparkles,
  Flame,
  MousePointer2,
} from "lucide-react";

const subscribeToNothing = () => () => {};
const useIsMounted = () =>
  useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

export type FallingTagPalette =
  | "default"
  | "colorful"
  | "glass"
  | "pastel"
  | "monochrome"
  | "neon"
  | "black-and-white"
  | "black-white";

export interface FallingTagItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  color?: string;
  bg?: string;
  border?: string;
  text?: string;
  className?: string;
}

export interface FallingTagsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of tag labels or tag objects */
  tags?: (string | FallingTagItem)[];
  /** Color palette preset */
  palette?: FallingTagPalette;
  /** Gravity strength (default: 0.55) */
  gravity?: number;
  /** Bounce / restitution between 0 and 1 (default: 0.48) */
  bounce?: number;
  /** Air and wall friction (default: 0.985) */
  friction?: number;
  /** Hover time in seconds before tags begin to fall (default: 1.4) */
  hoverDuration?: number;
  /** Height of the physics arena (default: 520) */
  height?: number | string;
  /** Show top control bar with Drop Again / Scatter / Zero-G buttons (default: false) */
  showControls?: boolean;
  /** Auto trigger falling when scrolled into view (default: true) */
  autoStartOnView?: boolean;
  /** Allow mouse/touch drag and throwing (default: true) */
  interactive?: boolean;
  /** Header title above the falling arena */
  title?: string;
  /** Header description */
  description?: string;
}

const DEFAULT_TAG_LABELS = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer",
  "Motion",
  "Figma",
  "UI/UX",
  "JavaScript",
  "Design Systems",
  "Three.js",
  "Node.js",
  "PostgreSQL",
  "GraphQL",
  "Animation",
  "Web Development",
  "Accessibility",
  "Frontend",
  "Docker",
  "Performance",
  "Micro-Interactions",
  "Creative Coding",
];

const PALETTES: Record<FallingTagPalette, { bg: string; text: string; border: string }[]> = {
  default: [
    { bg: "bg-zinc-900 dark:bg-white", text: "text-white dark:text-zinc-950", border: "border-zinc-800 dark:border-zinc-200" },
    { bg: "bg-blue-500", text: "text-white", border: "border-blue-400" },
    { bg: "bg-emerald-500", text: "text-white", border: "border-emerald-400" },
    { bg: "bg-amber-400", text: "text-zinc-950", border: "border-amber-300" },
    { bg: "bg-violet-500", text: "text-white", border: "border-violet-400" },
    { bg: "bg-rose-500", text: "text-white", border: "border-rose-400" },
    { bg: "bg-cyan-500", text: "text-white", border: "border-cyan-400" },
    { bg: "bg-orange-500", text: "text-white", border: "border-orange-400" },
  ],
  colorful: [
    { bg: "bg-indigo-600", text: "text-white", border: "border-indigo-400/60" },
    { bg: "bg-emerald-500", text: "text-white", border: "border-emerald-400/60" },
    { bg: "bg-rose-500", text: "text-white", border: "border-rose-400/60" },
    { bg: "bg-amber-500", text: "text-white", border: "border-amber-400/60" },
    { bg: "bg-sky-500", text: "text-white", border: "border-sky-400/60" },
    { bg: "bg-purple-600", text: "text-white", border: "border-purple-400/60" },
    { bg: "bg-teal-500", text: "text-white", border: "border-teal-400/60" },
    { bg: "bg-fuchsia-500", text: "text-white", border: "border-fuchsia-400/60" },
  ],
  glass: [
    { bg: "bg-white/40 dark:bg-zinc-900/50 backdrop-blur-md", text: "text-zinc-900 dark:text-white", border: "border-white/50 dark:border-white/20" },
    { bg: "bg-blue-500/25 dark:bg-blue-500/20 backdrop-blur-md", text: "text-blue-900 dark:text-blue-200", border: "border-blue-400/40" },
    { bg: "bg-emerald-500/25 dark:bg-emerald-500/20 backdrop-blur-md", text: "text-emerald-900 dark:text-emerald-200", border: "border-emerald-400/40" },
    { bg: "bg-amber-500/25 dark:bg-amber-500/20 backdrop-blur-md", text: "text-amber-900 dark:text-amber-200", border: "border-amber-400/40" },
    { bg: "bg-purple-500/25 dark:bg-purple-500/20 backdrop-blur-md", text: "text-purple-900 dark:text-purple-200", border: "border-purple-400/40" },
  ],
  pastel: [
    { bg: "bg-rose-100 dark:bg-rose-950/60", text: "text-rose-900 dark:text-rose-200", border: "border-rose-200 dark:border-rose-800" },
    { bg: "bg-sky-100 dark:bg-sky-950/60", text: "text-sky-900 dark:text-sky-200", border: "border-sky-200 dark:border-sky-800" },
    { bg: "bg-emerald-100 dark:bg-emerald-950/60", text: "text-emerald-900 dark:text-emerald-200", border: "border-emerald-200 dark:border-emerald-800" },
    { bg: "bg-amber-100 dark:bg-amber-950/60", text: "text-amber-900 dark:text-amber-200", border: "border-amber-200 dark:border-amber-800" },
    { bg: "bg-violet-100 dark:bg-violet-950/60", text: "text-violet-900 dark:text-violet-200", border: "border-violet-200 dark:border-violet-800" },
    { bg: "bg-teal-100 dark:bg-teal-950/60", text: "text-teal-900 dark:text-teal-200", border: "border-teal-200 dark:border-teal-800" },
  ],
  monochrome: [
    { bg: "bg-zinc-950 dark:bg-white", text: "text-white dark:text-zinc-950", border: "border-zinc-800 dark:border-zinc-200" },
    { bg: "bg-zinc-800 dark:bg-zinc-100", text: "text-zinc-100 dark:text-zinc-900", border: "border-zinc-700 dark:border-zinc-300" },
    { bg: "bg-zinc-700 dark:bg-zinc-200", text: "text-zinc-100 dark:text-zinc-800", border: "border-zinc-600 dark:border-zinc-400" },
    { bg: "bg-zinc-900 dark:bg-zinc-50", text: "text-zinc-200 dark:text-zinc-900", border: "border-zinc-800 dark:border-zinc-200" },
  ],
  neon: [
    { bg: "bg-emerald-500", text: "text-zinc-950 font-bold", border: "border-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.5)]" },
    { bg: "bg-cyan-400", text: "text-zinc-950 font-bold", border: "border-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.5)]" },
    { bg: "bg-fuchsia-500", text: "text-white font-bold", border: "border-fuchsia-300 shadow-[0_0_15px_rgba(217,70,239,0.5)]" },
    { bg: "bg-yellow-400", text: "text-zinc-950 font-bold", border: "border-yellow-200 shadow-[0_0_15px_rgba(250,204,21,0.5)]" },
    { bg: "bg-violet-500", text: "text-white font-bold", border: "border-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.5)]" },
  ],
  "black-and-white": [
    {
      bg: "bg-black dark:bg-black",
      text: "text-white dark:text-white font-medium",
      border: "border-white dark:border-white shadow-xs",
    },
    {
      bg: "bg-white dark:bg-white",
      text: "text-black dark:text-black font-medium",
      border: "border-black dark:border-black shadow-xs",
    },
  ],
  "black-white": [
    {
      bg: "bg-black dark:bg-black",
      text: "text-white dark:text-white font-medium",
      border: "border-white dark:border-white shadow-xs",
    },
    {
      bg: "bg-white dark:bg-white",
      text: "text-black dark:text-black font-medium",
      border: "border-black dark:border-black shadow-xs",
    },
  ],
};

// Physics Rigid-Body Tag
interface PhysicsTag {
  id: string;
  item: FallingTagItem;
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  prevAngle: number;
  vx: number;
  vy: number;
  angle: number;
  baseAngle: number;
  angularVelocity: number;
  width: number;
  height: number;
  radius: number;
  mass: number;
  invMass: number;
  inertia: number;
  invInertia: number;
  floatPhase: number;
  floatSpeed: number;
  styleClass: { bg: string; text: string; border: string };
  initialTargetY: number;
  isSleeping: boolean;
  sleepFrames: number;
  isSupported: boolean;
  supportLeft: boolean;
  supportRight: boolean;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function getOBBVertices(
  t: { x: number; y: number; width: number; height: number; angle: number },
  extraGap = 0,
): { x: number; y: number }[] {
  const hw = t.width * 0.5 + extraGap * 0.5;
  const hh = t.height * 0.5 + extraGap * 0.5;
  const c = Math.cos(t.angle);
  const s = Math.sin(t.angle);
  const ux = hw * c;
  const uy = hw * s;
  const vx = -hh * s;
  const vy = hh * c;
  return [
    { x: t.x - ux - vx, y: t.y - uy - vy },
    { x: t.x + ux - vx, y: t.y + uy - vy },
    { x: t.x + ux + vx, y: t.y + uy + vy },
    { x: t.x - ux + vx, y: t.y - uy + vy },
  ];
}

function getBoxExtents(t: { x: number; y: number; width: number; height: number; angle: number }) {
  const hw = t.width * 0.5;
  const hh = t.height * 0.5;
  const c = Math.abs(Math.cos(t.angle));
  const s = Math.abs(Math.sin(t.angle));
  const ex = hw * c + hh * s;
  const ey = hw * s + hh * c;
  return {
    minX: t.x - ex,
    maxX: t.x + ex,
    minY: t.y - ey,
    maxY: t.y + ey,
    ex,
    ey,
  };
}

// Exact 2D Oriented Bounding Box (OBB) SAT Collision Detection + Support Contact Point
function checkOBBCollision(
  a: PhysicsTag,
  b: PhysicsTag,
  extraGap = 1.5,
): { collided: boolean; nx: number; ny: number; pen: number; cx: number; cy: number } {
  const hwA = a.width * 0.5 + extraGap * 0.5;
  const hhA = a.height * 0.5 + extraGap * 0.5;
  const hwB = b.width * 0.5 + extraGap * 0.5;
  const hhB = b.height * 0.5 + extraGap * 0.5;

  const cosA = Math.cos(a.angle);
  const sinA = Math.sin(a.angle);
  const cosB = Math.cos(b.angle);
  const sinB = Math.sin(b.angle);

  const axes = [
    { x: cosA, y: sinA },
    { x: -sinA, y: cosA },
    { x: cosB, y: sinB },
    { x: -sinB, y: cosB },
  ];

  const dx = b.x - a.x;
  const dy = b.y - a.y;

  let minOverlap = Infinity;
  let bestAxis = { x: 0, y: -1 };
  let bestAxisIndex = 0;

  for (let i = 0; i < 4; i++) {
    const L = axes[i];
    const rA = hwA * Math.abs(cosA * L.x + sinA * L.y) + hhA * Math.abs(-sinA * L.x + cosA * L.y);
    const rB = hwB * Math.abs(cosB * L.x + sinB * L.y) + hhB * Math.abs(-sinB * L.x + cosB * L.y);
    const dist = Math.abs(dx * L.x + dy * L.y);
    const overlap = rA + rB - dist;

    if (overlap <= 0) {
      return { collided: false, nx: 0, ny: 0, pen: 0, cx: 0, cy: 0 };
    }

    if (overlap < minOverlap) {
      minOverlap = overlap;
      const sign = dx * L.x + dy * L.y >= 0 ? 1 : -1;
      bestAxis = { x: L.x * sign, y: L.y * sign };
      bestAxisIndex = i;
    }
  }

  const nx = bestAxis.x;
  const ny = bestAxis.y;
  let cx = (a.x + b.x) * 0.5;
  let cy = (a.y + b.y) * 0.5;

  if (bestAxisIndex < 2) {
    const vertsB = getOBBVertices(b, 0);
    let minProj = Infinity;
    for (let k = 0; k < 4; k++) {
      const p = vertsB[k].x * nx + vertsB[k].y * ny;
      if (p < minProj) {
        minProj = p;
        cx = vertsB[k].x;
        cy = vertsB[k].y;
      }
    }
  } else {
    const vertsA = getOBBVertices(a, 0);
    let maxProj = -Infinity;
    for (let k = 0; k < 4; k++) {
      const p = vertsA[k].x * nx + vertsA[k].y * ny;
      if (p > maxProj) {
        maxProj = p;
        cx = vertsA[k].x;
        cy = vertsA[k].y;
      }
    }
  }

  return {
    collided: true,
    nx,
    ny,
    pen: minOverlap,
    cx,
    cy,
  };
}

export default function FallingTagsBlock({
  tags = DEFAULT_TAG_LABELS,
  palette = "default",
  gravity = 0.55,
  bounce = 0.48,
  friction = 0.985,
  hoverDuration = 1.4,
  height = 520,
  showControls = false,
  autoStartOnView = true,
  interactive = true,
  title,
  description,
  className,
  ...props
}: FallingTagsProps) {
  const isMounted = useIsMounted();
  const containerRef = useRef<HTMLDivElement>(null);
  const tagElementsRef = useRef<Map<string, HTMLDivElement>>(new Map());

  const [, setPhase] = useState<"floating" | "falling" | "zeroG">("floating");
  const [activeGravity, setActiveGravity] = useState<boolean>(true);
  const [, setActiveTagsCount] = useState<number>(0);
  const [, setArenaDimensions] = useState<{ width: number; height: number }>({
    width: 800,
    height: 520,
  });

  // Physics state
  const physicsTagsRef = useRef<PhysicsTag[]>([]);
  const stateRef = useRef<{
    phase: "floating" | "falling" | "zeroG";
    startTime: number;
    fallStartTime: number;
    hoverDuration: number;
    gravity: number;
    activeGravity: boolean;
    bounce: number;
    friction: number;
    width: number;
    height: number;
    isDragging: boolean;
    draggedId: string | null;
    dragOffset: { x: number; y: number };
    mousePos: { x: number; y: number };
    mouseHistory: { x: number; y: number; time: number }[];
    animId: number | null;
    lastTime: number;
    isIntersecting: boolean;
    hasTriggered: boolean;
  }>({
    phase: "floating",
    startTime: performance.now(),
    fallStartTime: performance.now(),
    hoverDuration,
    gravity,
    activeGravity: true,
    bounce,
    friction,
    width: 800,
    height: 520,
    isDragging: false,
    draggedId: null,
    dragOffset: { x: 0, y: 0 },
    mousePos: { x: 0, y: 0 },
    mouseHistory: [],
    animId: null,
    lastTime: performance.now(),
    isIntersecting: true,
    hasTriggered: false,
  });

  // Keep stateRef synced with props
  useEffect(() => {
    stateRef.current.gravity = gravity;
    stateRef.current.bounce = bounce;
    stateRef.current.friction = friction;
    stateRef.current.hoverDuration = hoverDuration;
  }, [gravity, bounce, friction, hoverDuration]);

  // Normalized tag list
  const normalizedTags: FallingTagItem[] = React.useMemo(() => {
    return tags.map((t, idx) => {
      if (typeof t === "string") {
        return { id: `tag-${idx}-${t.toLowerCase().replace(/[^a-z0-9]/g, "-")}`, label: t };
      }
      return { ...t, id: t.id || `tag-${idx}` };
    });
  }, [tags]);

  // Measure exact unrotated rendered DOM dimensions
  const measureTags = useCallback(() => {
    let measuredAny = false;
    physicsTagsRef.current.forEach((t) => {
      const el = tagElementsRef.current.get(t.id);
      if (el) {
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        if (w > 0 && h > 0) {
          if (Math.abs(t.width - w) >= 1 || Math.abs(t.height - h) >= 1) {
            t.width = w;
            t.height = h;
            t.radius = h / 2;
            t.mass = (w * h) / 1000;
            t.invMass = 1 / t.mass;
            t.inertia = (t.mass * (w * w + h * h)) / 12;
            t.invInertia = 1 / t.inertia;
            t.isSleeping = false;
            t.sleepFrames = 0;
            measuredAny = true;
          }
        }
      }
    });

    if (measuredAny && stateRef.current.phase === "floating") {
      const W = stateRef.current.width;
      const leftX = 8;
      const rightX = W - 8;
      const ceilingY = 8;
      const list = physicsTagsRef.current;
      for (let pre = 0; pre < 6; pre++) {
        for (let i = 0; i < list.length; i++) {
          for (let j = i + 1; j < list.length; j++) {
            const col = checkOBBCollision(list[i], list[j], 3);
            if (col.collided) {
              list[i].x -= col.nx * col.pen * 0.5;
              list[i].y -= col.ny * col.pen * 0.5;
              list[j].x += col.nx * col.pen * 0.5;
              list[j].y += col.ny * col.pen * 0.5;
            }
          }
          const ext = getBoxExtents(list[i]);
          if (ext.minX < leftX) list[i].x += leftX - ext.minX;
          if (ext.maxX > rightX) list[i].x -= ext.maxX - rightX;
          if (ext.minY < ceilingY) list[i].y += ceilingY - ext.minY;
          list[i].initialTargetY = list[i].y;
        }
      }
    }

    return measuredAny;
  }, []);

  // Initialize tags
  const initTags = useCallback((quickDrop = false) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rawW = containerRef.current.clientWidth || rect.width;
    const rawH = containerRef.current.clientHeight || rect.height;
    const width = Math.max(rawW, 280);
    const h = typeof height === "number" ? height : (rawH || 520);
    stateRef.current.width = width;
    stateRef.current.height = h;
    setArenaDimensions({ width, height: h });

    const isSmallScreen = width < 520;
    const paletteList = PALETTES[palette] || PALETTES.default;
    const padding = isSmallScreen ? 10 : 16;
    const availableWidth = width - padding * 2;

    const items: PhysicsTag[] = [];
    const tagsPerRow = isSmallScreen ? 3 : 6;

    normalizedTags.forEach((item, index) => {
      const rowIndex = Math.floor(index / tagsPerRow);
      const colIndex = index % tagsPerRow;

      const el = tagElementsRef.current.get(item.id);
      const scale = isSmallScreen ? 0.88 : 1.0;
      const tagW =
        el && el.offsetWidth > 0
          ? el.offsetWidth
          : Math.round(Math.max(Math.min((item.label.length * 8.2 + 32) * scale, width * 0.65), 64));
      const tagH = el && el.offsetHeight > 0 ? el.offsetHeight : isSmallScreen ? 32 : 36;
      const tagRadius = tagH / 2;
      const mass = (tagW * tagH) / 1000;
      const inertia = (mass * (tagW * tagW + tagH * tagH)) / 12;

      const colStep = availableWidth / Math.max(tagsPerRow, 1);
      const staggerX = (rowIndex % 2 === 1) ? colStep * 0.28 : -colStep * 0.14;
      const startX = padding + colIndex * colStep + colStep * 0.5 + staggerX + (Math.random() - 0.5) * 14;
      const startY = 36 + rowIndex * (isSmallScreen ? 36 : 42) + (Math.random() - 0.5) * 8;
      const baseAngle = (Math.random() - 0.5) * 0.28;

      const styleClass = paletteList[index % paletteList.length];
      const clampedX = clamp(startX, tagW / 2 + 8, width - tagW / 2 - 8);

      items.push({
        id: item.id,
        item,
        x: clampedX,
        y: startY,
        prevX: clampedX,
        prevY: startY,
        prevAngle: baseAngle,
        vx: (Math.random() - 0.5) * 1.2,
        vy: 0,
        angle: baseAngle,
        baseAngle,
        angularVelocity: (Math.random() - 0.5) * 0.025,
        width: tagW,
        height: tagH,
        radius: tagRadius,
        mass,
        invMass: 1 / mass,
        inertia,
        invInertia: 1 / inertia,
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: 1.2 + Math.random() * 1.2,
        styleClass,
        initialTargetY: startY,
        isSleeping: false,
        sleepFrames: 0,
        isSupported: false,
        supportLeft: false,
        supportRight: false,
      });
    });

    // Pre-separate initial floating tags
    const leftX = 8;
    const rightX = width - 8;
    const ceilingY = 8;
    for (let pre = 0; pre < 8; pre++) {
      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          const col = checkOBBCollision(items[i], items[j], 3);
          if (col.collided) {
            items[i].x -= col.nx * col.pen * 0.5;
            items[i].y -= col.ny * col.pen * 0.5;
            items[j].x += col.nx * col.pen * 0.5;
            items[j].y += col.ny * col.pen * 0.5;
          }
        }
        const ext = getBoxExtents(items[i]);
        if (ext.minX < leftX) items[i].x += leftX - ext.minX;
        if (ext.maxX > rightX) items[i].x -= ext.maxX - rightX;
        if (ext.minY < ceilingY) items[i].y += ceilingY - ext.minY;
        items[i].initialTargetY = items[i].y;
      }
    }

    physicsTagsRef.current = items;
    setActiveTagsCount(items.length);
    const now = performance.now();
    const effectiveHover = quickDrop ? Math.min(0.25, stateRef.current.hoverDuration) : stateRef.current.hoverDuration;
    stateRef.current.phase = "floating";
    stateRef.current.startTime = now - (stateRef.current.hoverDuration - effectiveHover) * 1000;
    stateRef.current.fallStartTime = now + effectiveHover * 1000;
    setPhase("floating");

    requestAnimationFrame(() => {
      measureTags();
    });
  }, [normalizedTags, height, palette, measureTags]);

  // Main Physics Simulation Loop
  useEffect(() => {
    if (!isMounted) return;

    let animFrame: number;

    const loop = (currentTime: number) => {
      const state = stateRef.current;
      const tags = physicsTagsRef.current;
      const W = state.width;
      const H = state.height;

      const elapsed = (currentTime - state.startTime) / 1000;

      // Phase Transition: Floating -> Falling
      if (state.phase === "floating" && elapsed >= state.hoverDuration) {
        state.phase = "falling";
        state.fallStartTime = currentTime;
        setPhase("falling");
        for (let i = 0; i < tags.length; i++) {
          tags[i].vx = (Math.random() - 0.5) * 1.2;
          tags[i].angularVelocity = (Math.random() - 0.5) * 0.025;
        }
      }

      // Check prefers-reduced-motion
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Boundary floor and wall coordinates
      const floorY = H - 8;
      const leftX = 8;
      const rightX = W - 8;
      const ceilingY = 8;
      const gap = 1.5; // Tight 1.5px visual separation so boxes take ONLY their exact width & height
      const elapsedAfterHover = Math.max(0, (currentTime - state.fallStartTime) / 1000);
      const fallFrame = Math.floor(elapsedAfterHover * 60);

      // Keep DOM dimensions synced to actual rendered offsetWidth & offsetHeight
      if (elapsed < 2.5 || elapsedAfterHover < 2.5) {
        measureTags();
      }

      // 1. UPDATE BODIES (Integration & Floating)
      for (let i = 0; i < tags.length; i++) {
        const t = tags[i];
        t.prevX = t.x;
        t.prevY = t.y;
        t.prevAngle = t.angle;

        const isBeingDragged = state.isDragging && state.draggedId === t.id;

        if (isBeingDragged) {
          t.isSleeping = false;
          t.sleepFrames = 0;
          t.isSupported = false;
          t.supportLeft = false;
          t.supportRight = false;
          const targetX = state.mousePos.x - state.dragOffset.x;
          const targetY = state.mousePos.y - state.dragOffset.y;
          t.vx = (targetX - t.x) * 0.45;
          t.vy = (targetY - t.y) * 0.45;
          t.x = targetX;
          t.y = targetY;
          t.angularVelocity *= 0.85;
          continue;
        }

        if (prefersReduced) {
          continue;
        }

        if (state.phase === "floating") {
          t.isSleeping = false;
          t.sleepFrames = 0;
          t.isSupported = false;
          t.supportLeft = false;
          t.supportRight = false;
          const floatOffset = Math.sin(currentTime * 0.002 * t.floatSpeed + t.floatPhase) * 4;
          t.y = t.initialTargetY + floatOffset;
          t.angle = t.baseAngle + Math.sin(currentTime * 0.0015 * t.floatSpeed + t.floatPhase) * 0.04;
          t.vy = 0;
          continue;
        }

        // Falling phase: if sleeping peacefully, keep 100% rock-solid still
        if (t.isSleeping) {
          t.isSupported = true;
          continue;
        }

        if (state.activeGravity) {
          const dropStagger = Math.max(
            0,
            Math.min(1, elapsedAfterHover * 3.2 - (tags.length - 1 - i) * 0.03),
          );
          if (dropStagger <= 0) {
            const floatOffset = Math.sin(currentTime * 0.002 * t.floatSpeed + t.floatPhase) * 4;
            t.y = t.initialTargetY + floatOffset;
            continue;
          }
          const wasSupported = t.isSupported && Math.hypot(t.vx, t.vy) < 0.6;
          t.vy += state.gravity * (wasSupported ? 0.25 : 0.88) * dropStagger;
        } else {
          t.vx += (Math.random() - 0.5) * 0.04;
          t.vy += (Math.random() - 0.5) * 0.04;
        }

        t.x += t.vx;
        t.y += t.vy;
        t.angle += t.angularVelocity;
        // Allow up to ~62° (1.08 rad) so tags can wedge diagonally ("baka") into narrow gaps or lie flat ("soza")
        t.angle = clamp(t.angle, -1.08, 1.08);

        t.vx *= 0.94;
        t.vy *= 0.98;
        t.angularVelocity *= 0.88;
        t.isSupported = false;
        t.supportLeft = false;
        t.supportRight = false;
      }

      // 2. ADAPTIVE OBB SOLVER ("Soza Paile Soza, Baka Paile Baka" — Flat where flat space exists, tilted into gaps!)
      if (state.phase !== "floating" && !prefersReduced) {
        const solverIterations = 16;

        for (let iter = 0; iter < solverIterations; iter++) {
          // A. Floor & Wall Constraints
          for (let i = 0; i < tags.length; i++) {
            const t = tags[i];
            const isBeingDragged = state.isDragging && state.draggedId === t.id;
            if (t.isSleeping && !isBeingDragged) continue;

            const verts = getOBBVertices(t, 0);
            let maxPenY = 0;
            let floorContactX = 0;
            let floorVerts = 0;

            for (let k = 0; k < 4; k++) {
              const penY = verts[k].y - floorY;
              if (penY >= -1.5 && state.activeGravity) {
                t.isSupported = true;
                floorVerts++;
                floorContactX += verts[k].x;
                if (verts[k].x <= t.x + 6) t.supportLeft = true;
                if (verts[k].x >= t.x - 6) t.supportRight = true;
              }
              if (penY > maxPenY) {
                maxPenY = penY;
              }
            }

            if (maxPenY > 0) {
              t.y -= maxPenY;
              if (t.vy > 0) t.vy = 0;
              t.vx *= 0.82;
              t.angularVelocity *= 0.78;
            }

            // If touching floor on 1 corner with open space around it, gravity torque rotates raised end down to floor ("soza")
            if (state.activeGravity && iter === 0 && floorVerts === 1 && fallFrame < 140 && !isBeingDragged) {
              const leverX = t.x - floorContactX;
              t.angularVelocity += clamp(leverX * 0.0018, -0.035, 0.035);
              if (Math.abs(t.angle) < 0.35) {
                t.angle *= 0.85;
              }
            }

            const ext = getBoxExtents(t);
            if (ext.minX < leftX) {
              t.x += leftX - ext.minX;
              if (t.vx < 0) t.vx = 0;
            }
            if (ext.maxX > rightX) {
              t.x -= ext.maxX - rightX;
              if (t.vx > 0) t.vx = 0;
            }
            if (ext.minY < ceilingY) {
              t.y += ceilingY - ext.minY;
              if (t.vy < 0) t.vy = 0;
            }
          }

          // B. Pairwise OBB SAT Collisions
          for (let i = 0; i < tags.length; i++) {
            const a = tags[i];
            const isDraggingA = state.isDragging && state.draggedId === a.id;

            for (let j = i + 1; j < tags.length; j++) {
              const b = tags[j];
              const isDraggingB = state.isDragging && state.draggedId === b.id;

              if (a.isSleeping && b.isSleeping && !isDraggingA && !isDraggingB) continue;

              if (Math.abs(b.x - a.x) > (a.width + b.width) * 0.65) continue;
              if (Math.abs(b.y - a.y) > (a.width + b.width) * 0.65) continue;

              const col = checkOBBCollision(a, b, gap);
              if (!col.collided) {
                if (state.activeGravity) {
                  const supCol = checkOBBCollision(a, b, gap + 2.8);
                  if (supCol.collided) {
                    const top = a.y < b.y ? a : b;
                    const bot = a.y < b.y ? b : a;
                    if (bot.isSupported || bot.isSleeping) {
                      top.isSupported = true;
                      if (supCol.cx <= top.x + 8) top.supportLeft = true;
                      if (supCol.cx >= top.x - 8) top.supportRight = true;
                    }
                  }
                }
                continue;
              }

              const nx = col.nx;
              const ny = col.ny;
              const pen = col.pen;

              const top = a.y <= b.y ? a : b;
              const bot = a.y <= b.y ? b : a;
              const isTopDragging = top.id === a.id ? isDraggingA : isDraggingB;

              if (state.activeGravity && (bot.isSupported || bot.isSleeping)) {
                top.isSupported = true;
                if (col.cx <= top.x + 8) top.supportLeft = true;
                if (col.cx >= top.x - 8) top.supportRight = true;
              }

              if (pen <= 0.01) continue;

              if (a.isSleeping && (isDraggingB || Math.min(pen, 2) > 0.6)) {
                a.isSleeping = false;
                a.sleepFrames = 0;
              }
              if (b.isSleeping && (isDraggingA || Math.min(pen, 2) > 0.6)) {
                b.isSleeping = false;
                b.sleepFrames = 0;
              }

              // Upward Unjamming on later iterations (iter >= 10) if horizontally wedged between walls
              if (iter >= 10 && pen > 0.8 && !top.isSleeping && !isTopDragging) {
                top.y -= pen * 0.9;
                if (Math.abs(ny) < 0.45 && fallFrame < 140) {
                  const tiltDir = top.x >= bot.x ? -1 : 1;
                  top.angle = clamp(top.angle + tiltDir * 0.04, -1.05, 1.05);
                }
                continue;
              }

              let wA = a.isSleeping || isDraggingA ? 0 : a.invMass;
              let wB = b.isSleeping || isDraggingB ? 0 : b.invMass;
              if (wA > 0 && a.isSupported && a.y > b.y) wA *= 0.25;
              if (wB > 0 && b.isSupported && b.y > a.y) wB *= 0.25;

              const sumW = wA + wB;
              if (sumW <= 0) continue;

              const rA = wA / sumW;
              const rB = wB / sumW;

              a.x -= nx * pen * rA;
              a.y -= ny * pen * rA;
              b.x += nx * pen * rB;
              b.y += ny * pen * rB;

              // Lever-arm rotation so tags naturally tilt ("baka hoye") into gaps when off-center
              const rAx = col.cx - a.x;
              const rAy = col.cy - a.y;
              const rBx = col.cx - b.x;
              const rBy = col.cy - b.y;
              const crossA = rAx * ny - rAy * nx;
              const crossB = rBx * ny - rBy * nx;

              if (wA > 0 && fallFrame < 145) {
                a.angle = clamp(a.angle - crossA * pen * a.invInertia * 0.22 * rA, -1.05, 1.05);
              }
              if (wB > 0 && fallFrame < 145) {
                b.angle = clamp(b.angle + crossB * pen * b.invInertia * 0.22 * rB, -1.05, 1.05);
              }

              if (iter === 0) {
                const rvx = b.vx - a.vx;
                const rvy = b.vy - a.vy;
                const vn = rvx * nx + rvy * ny;
                if (vn < 0) {
                  const imp = -vn;
                  if (wA > 0) {
                    a.vx -= imp * nx * rA;
                    a.vy -= imp * ny * rA;
                    a.vx *= 0.85;
                    a.vy *= 0.85;
                  }
                  if (wB > 0) {
                    b.vx += imp * nx * rB;
                    b.vy += imp * ny * rB;
                    b.vx *= 0.85;
                    b.vy *= 0.85;
                  }
                }
              }
            }
          }

          // C. Adaptive Gravity Tipping into Gaps ("Soza Paile Soza, Baka Paile Baka"):
          // If a tag is supported on ONLY ONE side (overhanging into an empty gap!),
          // tip its unsupported end DOWNWARD into the gap AND slide it into the gap so it wedges in diagonally or drops flat!
          if (state.activeGravity && iter === 0 && fallFrame < 140) {
            for (let i = 0; i < tags.length; i++) {
              const t = tags[i];
              const isBeingDragged = state.isDragging && state.draggedId === t.id;
              if (t.isSleeping || !t.isSupported || isBeingDragged) continue;

              if (t.supportLeft && !t.supportRight) {
                // Supported on left, empty gap on right -> tip right end DOWN (+angle) and slide right into gap
                t.angularVelocity += 0.018;
                t.vx += 0.45;
              } else if (t.supportRight && !t.supportLeft) {
                // Supported on right, empty gap on left -> tip left end DOWN (-angle) and slide left into gap
                t.angularVelocity -= 0.018;
                t.vx -= 0.45;
              } else if (t.supportLeft && t.supportRight && Math.abs(t.angle) < 0.22) {
                // Supported on both sides and nearly flat -> settle cleanly flat ("soza")
                t.angle *= 0.85;
                t.angularVelocity *= 0.6;
              }
            }
          }

          // D. Final Wall & Floor Clamp Inside Solver
          for (let i = 0; i < tags.length; i++) {
            const t = tags[i];
            const isBeingDragged = state.isDragging && state.draggedId === t.id;
            if (t.isSleeping && !isBeingDragged) continue;

            const ext = getBoxExtents(t);
            if (ext.maxY > floorY) {
              t.y -= ext.maxY - floorY;
              if (t.vy > 0) t.vy = 0;
              if (state.activeGravity) t.isSupported = true;
            }
            if (ext.minX < leftX) {
              t.x += leftX - ext.minX;
              if (t.vx < 0) t.vx = 0;
            }
            if (ext.maxX > rightX) {
              t.x -= ext.maxX - rightX;
              if (t.vx > 0) t.vx = 0;
            }
            if (ext.minY < ceilingY) {
              t.y += ceilingY - ext.minY;
              if (t.vy < 0) t.vy = 0;
            }
          }
        }

        // 3. SLEEP EVALUATION (100% Rock-Solid Stillness Once Settled)
        if (state.activeGravity) {
          for (let i = 0; i < tags.length; i++) {
            const t = tags[i];
            if (t.isSleeping) continue;
            if (state.isDragging && state.draggedId === t.id) continue;

            const dropStagger = Math.max(
              0,
              Math.min(1, elapsedAfterHover * 3.2 - (tags.length - 1 - i) * 0.03),
            );
            if (dropStagger < 1) continue;

            const netDx = t.x - t.prevX;
            const netDy = t.y - t.prevY;
            const netDa = t.angle - t.prevAngle;
            const netMotion = Math.hypot(netDx, netDy) + Math.abs(netDa) * 25;

            if (t.isSupported || fallFrame > 140) {
              t.vx = t.vx * 0.5 + netDx * 0.5;
              t.vy = t.vy * 0.5 + netDy * 0.5;
              t.angularVelocity = t.angularVelocity * 0.5 + netDa * 0.5;
            }

            if ((fallFrame > 142 || (t.isSupported && fallFrame > 95)) && netMotion < 0.5) {
              t.sleepFrames++;
              t.vx *= 0.4;
              t.vy *= 0.4;
              t.angularVelocity *= 0.4;
              if (t.sleepFrames >= 6) {
                t.isSleeping = true;
                t.vx = 0;
                t.vy = 0;
                t.angularVelocity = 0;
              }
            } else {
              t.sleepFrames = Math.max(0, t.sleepFrames - 1);
            }
          }
        }
      }

      // 4. SYNC DOM TRANSFORMS
      for (let i = 0; i < tags.length; i++) {
        const t = tags[i];
        const el = tagElementsRef.current.get(t.id);
        if (el) {
          el.style.transform = `translate3d(${t.x.toFixed(2)}px, ${t.y.toFixed(2)}px, 0) translate(-50%, -50%) rotate(${t.angle.toFixed(4)}rad)`;
        }
      }

      animFrame = requestAnimationFrame(loop);
    };

    animFrame = requestAnimationFrame(loop);
    stateRef.current.animId = animFrame;

    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, [isMounted, measureTags]);

  // Viewport Intersection Observer & Resize handling
  useEffect(() => {
    if (!isMounted || !containerRef.current) return;
    const el = containerRef.current;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    // Resize Observer
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height: h } = entry.contentRect;
        if (width > 0 && h > 0) {
          const prevW = stateRef.current.width;
          const prevH = stateRef.current.height;
          const widthDiff = Math.abs(width - prevW);
          const heightDiff = Math.abs(h - prevH);

          if (widthDiff > 2 || heightDiff > 2) {
            stateRef.current.width = width;
            stateRef.current.height = h;
            setArenaDimensions({ width, height: h });

            // Immediately re-measure DOM dimensions (in case responsive sm: breakpoint changed)
            measureTags();

            // Proportionally scale X positions so tags don't jam against one wall during live drag
            const scaleX = prevW > 0 ? width / prevW : 1;
            stateRef.current.fallStartTime = performance.now() - 800;
            physicsTagsRef.current.forEach((t) => {
              t.x = clamp(t.x * scaleX, t.width * 0.5 + 8, width - t.width * 0.5 - 8);
              t.prevX = t.x;
              t.isSleeping = false;
              t.sleepFrames = 0;
            });

            // When switching between screen sizes (e.g. Large -> Small or dragging resize handle),
            // cleanly re-initialize for the new container width once resize settles (same as reload!)
            if (widthDiff > 6) {
              if (resizeTimer) clearTimeout(resizeTimer);
              resizeTimer = setTimeout(() => {
                initTags(true);
              }, 120);
            }
          }
        }
      }
    });
    ro.observe(el);

    // Initial tags setup
    initTags();

    // Intersection Observer
    let observer: IntersectionObserver | null = null;
    if (autoStartOnView && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting && !stateRef.current.hasTriggered) {
            stateRef.current.hasTriggered = true;
            initTags();
          }
        },
        { threshold: 0.25 },
      );
      observer.observe(el);
    }

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      ro.disconnect();
      if (observer) observer.disconnect();
    };
  }, [isMounted, autoStartOnView, initTags, measureTags]);

  // Pointer Interaction (Mouse & Touch Grab & Throw)
  const handlePointerDown = (id: string, e: React.PointerEvent) => {
    if (!interactive) return;
    e.preventDefault();
    const tag = physicsTagsRef.current.find((t) => t.id === id);
    if (!tag || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    stateRef.current.isDragging = true;
    stateRef.current.draggedId = id;
    stateRef.current.dragOffset = { x: clientX - tag.x, y: clientY - tag.y };
    stateRef.current.mousePos = { x: clientX, y: clientY };
    stateRef.current.mouseHistory = [{ x: clientX, y: clientY, time: performance.now() }];
    stateRef.current.fallStartTime = performance.now() - 1000;
    tag.isSleeping = false;
    tag.sleepFrames = 0;

    const onPointerMove = (moveEvt: PointerEvent) => {
      const mx = moveEvt.clientX - rect.left;
      const my = moveEvt.clientY - rect.top;
      stateRef.current.mousePos = { x: mx, y: my };

      const now = performance.now();
      stateRef.current.mouseHistory.push({ x: mx, y: my, time: now });
      if (stateRef.current.mouseHistory.length > 5) {
        stateRef.current.mouseHistory.shift();
      }
    };

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);

      const history = stateRef.current.mouseHistory;
      if (history.length >= 2 && stateRef.current.draggedId) {
        const last = history[history.length - 1];
        const prev = history[0];
        const dt = (last.time - prev.time) / 1000;
        if (dt > 0.01) {
          const vx = ((last.x - prev.x) / dt) * 0.035;
          const vy = ((last.y - prev.y) / dt) * 0.035;
          tag.vx = clamp(vx, -18, 18);
          tag.vy = clamp(vy, -18, 18);
          tag.angularVelocity = clamp((Math.random() - 0.5) * 0.2 + tag.vx * 0.015, -0.25, 0.25);
        }
      }

      stateRef.current.isDragging = false;
      stateRef.current.draggedId = null;
      stateRef.current.fallStartTime = performance.now() - 800;
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
  };

  // Actions
  const handleDropAgain = () => {
    initTags(false);
  };

  const handleScatter = () => {
    const tags = physicsTagsRef.current;
    stateRef.current.fallStartTime = performance.now() - 800;
    tags.forEach((t) => {
      t.isSleeping = false;
      t.sleepFrames = 0;
      t.isSupported = false;
      t.supportLeft = false;
      t.supportRight = false;
      t.vy = -8 - Math.random() * 10;
      t.vx = (Math.random() - 0.5) * 14;
      t.angularVelocity = (Math.random() - 0.5) * 0.25;
    });
    if (stateRef.current.phase === "floating") {
      stateRef.current.phase = "falling";
      setPhase("falling");
    }
  };

  const handleToggleGravity = () => {
    const next = !activeGravity;
    setActiveGravity(next);
    stateRef.current.activeGravity = next;
    stateRef.current.fallStartTime = performance.now() - 800;
    physicsTagsRef.current.forEach((t) => {
      t.isSleeping = false;
      t.sleepFrames = 0;
      t.isSupported = false;
      t.supportLeft = false;
      t.supportRight = false;
    });
    if (!next) {
      // Float tags gently upwards
      physicsTagsRef.current.forEach((t) => {
        t.vy = -1 - Math.random() * 2;
        t.vx = (Math.random() - 0.5) * 3;
      });
    }
  };

  return (
    <div
      className={cn(
        "relative w-full rounded-3xl border overflow-hidden flex flex-col select-none",
        palette === "glass"
          ? "border-white/20 bg-black/20 dark:bg-black/35 backdrop-blur-xs text-white"
          : "border-border/80 bg-background/95 dark:bg-zinc-950/95",
        className,
      )}
      {...props}
    >
      {/* Header & Controls Bar */}
      {(title || showControls) && (
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 border-b border-border/60 backdrop-blur-sm bg-background/50 dark:bg-zinc-950/50">
          <div>
            {title && (
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                {title}
              </h3>
            )}
            {description && (
              <p className="text-xs text-muted-foreground mt-0.5 max-w-md">
                {description}
              </p>
            )}
          </div>

          {showControls && (
            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={handleDropAgain}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-all cursor-pointer active:scale-95 shadow-xs"
                title="Restart falling animation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Drop Again</span>
              </button>

              <button
                type="button"
                onClick={handleScatter}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-all cursor-pointer active:scale-95 shadow-xs"
                title="Explode/scatter all tags upwards"
              >
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                <span>Scatter</span>
              </button>

              <button
                type="button"
                onClick={handleToggleGravity}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer active:scale-95 shadow-xs",
                  activeGravity
                    ? "bg-muted hover:bg-muted/80 text-foreground"
                    : "bg-primary text-primary-foreground font-bold shadow-md",
                )}
                title="Toggle zero-gravity float"
              >
                <span>{activeGravity ? "Gravity On" : "Zero-G Float"}</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Interactive Physics Arena */}
      <div
        ref={containerRef}
        style={{ height }}
        className="relative w-full overflow-hidden touch-none cursor-default bg-radial-[at_50%_0%] from-muted/30 to-transparent"
      >
        {/* Subtle Watermark or Floor line */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent pointer-events-none" />

        {/* Tags Container */}
        {normalizedTags.map((item, index) => {
          const paletteList = PALETTES[palette] || PALETTES.default;
          const style = paletteList[index % paletteList.length];

          return (
            <div
              key={item.id}
              ref={(el) => {
                if (el) tagElementsRef.current.set(item.id, el);
                else tagElementsRef.current.delete(item.id);
              }}
              onPointerDown={(e) => handlePointerDown(item.id, e)}
              className={cn(
                "absolute left-0 top-0 will-change-transform flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold tracking-wide border rounded-[var(--radius)] shadow-xs transition-[box-shadow,filter] cursor-grab active:cursor-grabbing select-none leading-none whitespace-nowrap",
                item.bg || style.bg,
                item.text || style.text,
                item.border || style.border,
                item.className,
                interactive && "hover:shadow-md hover:brightness-105",
              )}
              style={{
                transformOrigin: "center center",
                touchAction: "none",
                WebkitUserSelect: "none",
                userSelect: "none",
              }}
            >
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              <span className="truncate">{item.label}</span>
            </div>
          );
        })}

        {/* Drag Hint overlay */}
        <div className="absolute right-4 bottom-3 z-10 pointer-events-none flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground/60">
          <MousePointer2 className="w-3.5 h-3.5" />
          <span>Grab & toss any tag</span>
        </div>
      </div>
    </div>
  );
}
