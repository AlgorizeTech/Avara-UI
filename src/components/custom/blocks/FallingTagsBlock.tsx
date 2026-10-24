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
  vx: number;
  vy: number;
  angle: number;
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
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

// Distance between two 2D line segments
function closestPointsSegments(
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  q1: { x: number; y: number },
  q2: { x: number; y: number },
): { c1: { x: number; y: number }; c2: { x: number; y: number }; distSq: number } {
  const d1x = p2.x - p1.x;
  const d1y = p2.y - p1.y;
  const d2x = q2.x - q1.x;
  const d2y = q2.y - q1.y;
  const rx = p1.x - q1.x;
  const ry = p1.y - q1.y;

  const a = d1x * d1x + d1y * d1y;
  const e = d2x * d2x + d2y * d2y;
  const f = d2x * ry - d2y * rx;

  let s = 0;
  let t = 0;

  if (a <= 0.0001 && e <= 0.0001) {
    return { c1: p1, c2: q1, distSq: rx * rx + ry * ry };
  }

  if (a <= 0.0001) {
    s = 0;
    t = clamp((d2x * -rx + d2y * -ry) / e, 0, 1);
  } else {
    const c = d1x * rx + d1y * ry;
    if (e <= 0.0001) {
      t = 0;
      s = clamp(-c / a, 0, 1);
    } else {
      const b = d1x * d2x + d1y * d2y;
      const denom = a * e - b * b;
      if (denom !== 0) {
        s = clamp((b * f - c * e) / denom, 0, 1);
      } else {
        s = 0;
      }
      t = (b * s + f) / e;
      if (t < 0) {
        t = 0;
        s = clamp(-c / a, 0, 1);
      } else if (t > 1) {
        t = 1;
        s = clamp((b - c) / a, 0, 1);
      }
    }
  }

  const c1 = { x: p1.x + d1x * s, y: p1.y + d1y * s };
  const c2 = { x: q1.x + d2x * t, y: q1.y + d2y * t };
  const dx = c1.x - c2.x;
  const dy = c1.y - c2.y;
  return { c1, c2, distSq: dx * dx + dy * dy };
}

export default function FallingTagsBlock({
  tags = DEFAULT_TAG_LABELS,
  palette = "default",
  gravity = 0.55,
  bounce = 0.48,
  friction = 0.985,
  hoverDuration = 1.4,
  height = 540,
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

  // Initialize tags
  const initTags = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = Math.max(rect.width, 320);
    const h = typeof height === "number" ? height : (rect.height || 520);
    stateRef.current.width = width;
    stateRef.current.height = h;
    setArenaDimensions({ width, height: h });

    const paletteList = PALETTES[palette] || PALETTES.default;
    const padding = 20;
    const availableWidth = width - padding * 2;

    // Approximate width based on character count and padding
    const items: PhysicsTag[] = [];
    const rows = 4;
    const tagsPerRow = Math.ceil(normalizedTags.length / rows);

    normalizedTags.forEach((item, index) => {
      const rowIndex = Math.floor(index / tagsPerRow);
      const colIndex = index % tagsPerRow;

      // Tag dimension estimation (height: 38px, width based on text)
      const approxCharWidth = 8.5;
      const tagW = Math.max(Math.min(item.label.length * approxCharWidth + 36, width * 0.7), 74);
      const tagH = 38;
      const tagRadius = tagH / 2;
      const mass = (tagW * tagH) / 1000;
      const inertia = (mass * (tagW * tagW + tagH * tagH)) / 12;

      // Distribute in upper floating zone
      const colStep = availableWidth / Math.max(tagsPerRow, 1);
      const startX = padding + colIndex * colStep + colStep * 0.5 + (Math.random() - 0.5) * 20;
      const startY = 40 + rowIndex * 48 + (Math.random() - 0.5) * 15;

      const styleClass = paletteList[index % paletteList.length];

      items.push({
        id: item.id,
        item,
        x: clamp(startX, tagW / 2 + 10, width - tagW / 2 - 10),
        y: startY,
        vx: (Math.random() - 0.5) * 0.8,
        vy: 0,
        angle: (Math.random() - 0.5) * 0.12,
        angularVelocity: (Math.random() - 0.5) * 0.02,
        width: tagW,
        height: tagH,
        radius: tagRadius,
        mass,
        invMass: 1 / mass,
        inertia,
        invInertia: 1 / inertia,
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: 1.5 + Math.random() * 1.5,
        styleClass,
        initialTargetY: startY,
      });
    });

    physicsTagsRef.current = items;
    setActiveTagsCount(items.length);
    stateRef.current.phase = "floating";
    stateRef.current.startTime = performance.now();
    setPhase("floating");
  }, [normalizedTags, height, palette]);

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
        setPhase("falling");
      }

      // Check prefers-reduced-motion
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // 1. UPDATE BODIES
      for (let i = 0; i < tags.length; i++) {
        const t = tags[i];
        const isBeingDragged = state.isDragging && state.draggedId === t.id;

        if (isBeingDragged) {
          // Direct drag follower with momentum calculation
          const targetX = state.mousePos.x - state.dragOffset.x;
          const targetY = state.mousePos.y - state.dragOffset.y;
          t.vx = (targetX - t.x) * 18;
          t.vy = (targetY - t.y) * 18;
          t.x = targetX;
          t.y = targetY;
          t.angularVelocity *= 0.85;
          continue;
        }

        if (prefersReduced) {
          // Instantly settle at bottom in neat rows
          continue;
        }

        if (state.phase === "floating") {
          // Gentle floating wave / anti-gravity levitation
          const floatOffset = Math.sin(currentTime * 0.002 * t.floatSpeed + t.floatPhase) * 6;
          t.y = t.initialTargetY + floatOffset;
          t.angle = Math.sin(currentTime * 0.0015 * t.floatSpeed + t.floatPhase) * 0.06;
          t.vx *= 0.95;
          t.vy = 0;
          t.angularVelocity *= 0.95;
        } else {
          // Gravity & Integration
          if (state.activeGravity) {
            // Apply slight random stagger so they don't all drop like a flat board
            const dropStagger = Math.max(0, Math.min(1, (elapsed - state.hoverDuration) * 3 - i * 0.04));
            t.vy += state.gravity * 0.9 * dropStagger;
          } else {
            // Zero-G float
            t.vx += (Math.random() - 0.5) * 0.05;
            t.vy += (Math.random() - 0.5) * 0.05;
          }

          t.x += t.vx;
          t.y += t.vy;
          t.angle += t.angularVelocity;

          // Friction / Damping
          t.vx *= state.friction;
          t.vy *= state.friction;
          t.angularVelocity *= 0.97;
        }

        // 2. WALL COLLISIONS (LEFT, RIGHT, FLOOR, CEILING)
        const halfL = Math.max(0, t.width / 2 - t.radius);
        const cos = Math.cos(t.angle);
        const sin = Math.sin(t.angle);
        const p1x = t.x - halfL * cos;
        const p1y = t.y - halfL * sin;
        const p2x = t.x + halfL * cos;
        const p2y = t.y + halfL * sin;

        const minX = Math.min(p1x, p2x) - t.radius;
        const maxX = Math.max(p1x, p2x) + t.radius;
        const minY = Math.min(p1y, p2y) - t.radius;
        const maxY = Math.max(p1y, p2y) + t.radius;

        const wallBounce = state.bounce;

        // Left Wall
        if (minX < 8) {
          const pen = 8 - minX;
          t.x += pen;
          t.vx = Math.abs(t.vx) * wallBounce;
          t.angularVelocity *= 0.8;
        }
        // Right Wall
        if (maxX > W - 8) {
          const pen = maxX - (W - 8);
          t.x -= pen;
          t.vx = -Math.abs(t.vx) * wallBounce;
          t.angularVelocity *= 0.8;
        }
        // Floor
        if (maxY > H - 8) {
          const pen = maxY - (H - 8);
          t.y -= pen;
          if (Math.abs(t.vy) > 0.4) {
            t.vy = -Math.abs(t.vy) * wallBounce;
          } else {
            t.vy = 0;
          }
          // Floor friction
          t.vx *= 0.94;
          // Angular impulse to align flat with floor naturally
          const targetAngle = Math.round(t.angle / Math.PI) * Math.PI;
          t.angularVelocity += (targetAngle - t.angle) * 0.06;
          t.angularVelocity *= 0.88;
        }
        // Ceiling (open or bounce softly)
        if (minY < 8 && t.vy < 0) {
          t.y += 8 - minY;
          t.vy = Math.abs(t.vy) * wallBounce;
        }
      }

      // 3. TAG-TO-TAG COLLISIONS (Iterative solver for high fidelity)
      const iterations = state.phase === "floating" ? 1 : 4;
      for (let iter = 0; iter < iterations; iter++) {
        for (let i = 0; i < tags.length; i++) {
          const a = tags[i];
          const halfLa = Math.max(0, a.width / 2 - a.radius);
          const cosa = Math.cos(a.angle);
          const sina = Math.sin(a.angle);
          const ap1 = { x: a.x - halfLa * cosa, y: a.y - halfLa * sina };
          const ap2 = { x: a.x + halfLa * cosa, y: a.y + halfLa * sina };

          for (let j = i + 1; j < tags.length; j++) {
            const b = tags[j];
            const halfLb = Math.max(0, b.width / 2 - b.radius);
            const cosb = Math.cos(b.angle);
            const sinb = Math.sin(b.angle);
            const bp1 = { x: b.x - halfLb * cosb, y: b.y - halfLb * sinb };
            const bp2 = { x: b.x + halfLb * cosb, y: b.y + halfLb * sinb };

            // Broadphase quick distance reject
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const maxRadius = Math.max(a.width, a.height) + Math.max(b.width, b.height);
            if (dx * dx + dy * dy > maxRadius * maxRadius) continue;

            const res = closestPointsSegments(ap1, ap2, bp1, bp2);
            const targetDist = a.radius + b.radius;

            if (res.distSq < targetDist * targetDist) {
              const dist = Math.sqrt(res.distSq) || 0.001;
              const pen = targetDist - dist;

              // Collision normal from A to B
              let nx = (res.c2.x - res.c1.x) / dist;
              let ny = (res.c2.y - res.c1.y) / dist;

              if (dist <= 0.001) {
                nx = 0;
                ny = -1;
              }

              // Contact points relative to center of masses
              const rAx = res.c1.x - a.x;
              const rAy = res.c1.y - a.y;
              const rBx = res.c2.x - b.x;
              const rBy = res.c2.y - b.y;

              // Relative velocity at contact points
              const vAx = a.vx - a.angularVelocity * rAy;
              const vAy = a.vy + a.angularVelocity * rAx;
              const vBx = b.vx - b.angularVelocity * rBy;
              const vBy = b.vy + b.angularVelocity * rBx;

              const relVx = vBx - vAx;
              const relVy = vBy - vAy;
              const velAlongNormal = relVx * nx + relVy * ny;

              // Impulse resolution
              if (velAlongNormal < 0) {
                const e = state.bounce;
                const rAxCrossN = rAx * ny - rAy * nx;
                const rBxCrossN = rBx * ny - rBy * nx;

                const invMassSum =
                  a.invMass +
                  b.invMass +
                  rAxCrossN * rAxCrossN * a.invInertia +
                  rBxCrossN * rBxCrossN * b.invInertia;

                if (invMassSum > 0) {
                  const jScalar = (-(1 + e) * velAlongNormal) / invMassSum;
                  const impulseX = jScalar * nx;
                  const impulseY = jScalar * ny;

                  if (!(state.isDragging && state.draggedId === a.id)) {
                    a.vx -= impulseX * a.invMass;
                    a.vy -= impulseY * a.invMass;
                    a.angularVelocity -= (rAx * impulseY - rAy * impulseX) * a.invInertia;
                  }
                  if (!(state.isDragging && state.draggedId === b.id)) {
                    b.vx += impulseX * b.invMass;
                    b.vy += impulseY * b.invMass;
                    b.angularVelocity += (rBx * impulseY - rBy * impulseX) * b.invInertia;
                  }
                }
              }

              // Positional Separation
              const percent = 0.55;
              const slop = 0.2;
              const corr = (Math.max(pen - slop, 0) / (a.invMass + b.invMass)) * percent;
              const corrX = corr * nx;
              const corrY = corr * ny;

              if (!(state.isDragging && state.draggedId === a.id)) {
                a.x -= corrX * a.invMass;
                a.y -= corrY * a.invMass;
              }
              if (!(state.isDragging && state.draggedId === b.id)) {
                b.x += corrX * b.invMass;
                b.y += corrY * b.invMass;
              }
            }
          }
        }
      }

      // 4. SYNC DOM TRANSFORMS
      for (let i = 0; i < tags.length; i++) {
        const t = tags[i];
        const el = tagElementsRef.current.get(t.id);
        if (el) {
          el.style.transform = `translate3d(${t.x.toFixed(2)}px, ${t.y.toFixed(2)}px, 0) rotate(${t.angle.toFixed(4)}rad) translate(-50%, -50%)`;
        }
      }

      animFrame = requestAnimationFrame(loop);
    };

    animFrame = requestAnimationFrame(loop);
    stateRef.current.animId = animFrame;

    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, [isMounted]);

  // Viewport Intersection Observer & Resize handling
  useEffect(() => {
    if (!isMounted || !containerRef.current) return;
    const el = containerRef.current;

    // Resize Observer
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height: h } = entry.contentRect;
        if (width > 0 && h > 0) {
          stateRef.current.width = width;
          stateRef.current.height = h;
          setArenaDimensions({ width, height: h });
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
      ro.disconnect();
      if (observer) observer.disconnect();
    };
  }, [isMounted, autoStartOnView, initTags]);

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
          const vx = (last.x - prev.x) / dt * 0.035;
          const vy = (last.y - prev.y) / dt * 0.035;
          tag.vx = clamp(vx, -22, 22);
          tag.vy = clamp(vy, -22, 22);
          tag.angularVelocity = (Math.random() - 0.5) * 0.35 + tag.vx * 0.02;
        }
      }

      stateRef.current.isDragging = false;
      stateRef.current.draggedId = null;
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
  };

  // Actions
  const handleDropAgain = () => {
    initTags();
  };

  const handleScatter = () => {
    const tags = physicsTagsRef.current;
    tags.forEach((t) => {
      t.vy = -8 - Math.random() * 12;
      t.vx = (Math.random() - 0.5) * 16;
      t.angularVelocity = (Math.random() - 0.5) * 0.4;
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
                "absolute left-0 top-0 will-change-transform flex items-center justify-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide border rounded-[var(--radius)] shadow-xs transition-[box-shadow,filter] cursor-grab active:cursor-grabbing select-none leading-none",
                item.bg || style.bg,
                item.text || style.text,
                item.border || style.border,
                item.className,
                interactive && "hover:shadow-md hover:brightness-105",
              )}
              style={{
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
