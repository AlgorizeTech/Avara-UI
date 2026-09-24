"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useMemo, useRef } from "react";
import { springLinear } from "./motion-curves";

export type NetworkNode = {
  id: string;
  ring: number; // 1 (inner), 2 (middle), 3 (outer), etc.
  image?: string;
  fallback?: string;
  label?: string;
  size?: "sm" | "md" | "lg" | (string & {});
};

export interface NetworkGraphProps
  extends React.HTMLAttributes<HTMLDivElement> {
  nodes: NetworkNode[];
  centerNode?: {
    image?: string;
    fallback?: string;
    label?: string;
  };
  ringCount?: number;
  baseRadius?: number; // Starting radius percentage for the first ring
  ringGap?: number; // Percentage gap between rings
  animateIn?: boolean;
  animateOrbit?: boolean; // Toggles planetary orbital motion
  orbitSpeed?: number; // Speed multiplier (1 = default, 2 = twice as fast)
}

// The entrance springs as CSS `linear()` curves, generated from the same
// stiffness/damping the springs had, so they settle exactly as before.
const CENTER_SPRING = springLinear({ stiffness: 200, damping: 20 });
const NODE_SPRING = springLinear({ stiffness: 260, damping: 20 });

const keyframes = `
@keyframes network-graph-ring-in { from { opacity: 0; scale: 0.8; } }
@keyframes network-graph-pop-in { from { opacity: 0; scale: 0; } }
`;

const sizeMap = {
  sm: "w-6 h-6 sm:w-9 sm:h-9",
  md: "w-8 h-8 sm:w-11 sm:h-11",
  lg: "w-10 h-10 sm:w-14 sm:h-14",
};

export const NetworkGraph = React.forwardRef<HTMLDivElement, NetworkGraphProps>(
  (
    {
      nodes,
      centerNode,
      ringCount = 3,
      baseRadius = 15,
      ringGap = 15,
      animateIn = true,
      animateOrbit = true,
      orbitSpeed = 1,
      className,
      ...props
    },
    ref,
  ) => {
    const rings = Array.from({ length: ringCount }, (_, i) => i + 1);

    // FIXED: Added [nodes] dependency array to useMemo to resolve ts(2554) and eslint warnings
    const groupedNodes = useMemo(() => {
      const groups: Record<number, NetworkNode[]> = {};
      nodes.forEach((node) => {
        if (!groups[node.ring]) groups[node.ring] = [];
        groups[node.ring].push(node);
      });
      return groups;
    }, [nodes]);

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full aspect-square max-w-[800px] mx-auto flex items-center justify-center",
          className,
        )}
        {...props}
      >
        <style>{keyframes}</style>

        {/* Render Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {rings.map((ring) => {
            const radius = baseRadius + (ring - 1) * ringGap;
            return (
              <div
                key={`ring-${ring}`}
                className="absolute rounded-full border border-primary/[0.08]/[0.08]"
                style={{
                  width: `${radius * 2}%`,
                  height: `${radius * 2}%`,
                  animation: animateIn
                    ? `network-graph-ring-in 0.8s cubic-bezier(0, 0, 0.58, 1) ${ring * 0.1}s backwards`
                    : undefined,
                }}
              />
            );
          })}
        </div>

        {/* Render Nodes per Ring with Orbiting Container */}
        {rings.map((ringIndex) => (
          <OrbitRing
            key={`ring-orbit-${ringIndex}`}
            ringIndex={ringIndex}
            nodes={groupedNodes[ringIndex] || []}
            radius={baseRadius + (ringIndex - 1) * ringGap}
            animateIn={animateIn}
            animateOrbit={animateOrbit}
            orbitSpeed={orbitSpeed}
          />
        ))}

        {/* Center Node */}
        {centerNode && (
          <div className="absolute z-20 w-0 h-0 flex items-center justify-center left-1/2 top-1/2">
            <div
              className="relative group cursor-pointer"
              style={{
                animation: animateIn
                  ? `network-graph-pop-in ${CENTER_SPRING.duration}ms ${CENTER_SPRING.easing} backwards`
                  : undefined,
              }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-[3px] sm:border-[5px] border-white dark:border-[#0a0a0a] shadow-xl overflow-hidden bg-card flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                {centerNode.image ? (
                  <img
                    src={centerNode.image}
                    alt={centerNode.label || "Center"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase">
                    {centerNode.fallback}
                  </span>
                )}
              </div>
              {centerNode.label && (
                <div className="absolute top-[calc(100%+10px)] sm:top-[calc(100%+14px)] left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 sm:py-1.5 rounded-full bg-primary text-primary-foreground text-[10px] sm:text-xs font-semibold shadow-sm z-50">
                  {centerNode.label}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  },
);
NetworkGraph.displayName = "NetworkGraph";

/**
 * One orbit and the avatars riding it.
 *
 * Rotation is advanced by hand each frame instead of being handed to a
 * `repeat: Infinity` tween, because a tween reads its `duration` only when it
 * STARTS: with a constant `rotate` target the animation never restarts, so a
 * later `orbitSpeed` change was silently ignored unless the whole graph was
 * remounted. Stepping the value per frame makes the speed change apply on the
 * very next frame, from wherever the ring currently is — no jump, no remount.
 */
function OrbitRing({
  ringIndex,
  nodes,
  radius,
  animateIn,
  animateOrbit,
  orbitSpeed,
}: {
  ringIndex: number;
  nodes: NetworkNode[];
  radius: number;
  animateIn: boolean;
  animateOrbit: boolean;
  orbitSpeed: number;
}) {
  const ringRef = useRef<HTMLDivElement>(null);

  // Outer rings take longer per lap, and even rings run backwards for depth.
  const baseDuration = (35 + ringIndex * 10) / (orbitSpeed || 1);
  const direction = ringIndex % 2 === 0 ? -1 : 1;
  const degreesPerSecond = animateOrbit ? (360 / baseDuration) * direction : 0;

  // Read through a ref so the frame callback always sees the latest speed
  // without being torn down and rebuilt on every render.
  const speedRef = useRef(degreesPerSecond);
  useEffect(() => {
    speedRef.current = degreesPerSecond;
  });

  // The ring's angle lives outside React so a speed change carries on from
  // wherever the ring is.
  const angleRef = useRef(0);
  const orbiting = degreesPerSecond !== 0;

  useEffect(() => {
    const el = ringRef.current;
    if (!el || !orbiting) return;

    let frame = 0;
    let last = 0;
    const tick = (now: number) => {
      // Same frame delta as a motion frame loop: 1/60s on the first frame,
      // then the real gap clamped to 1–40ms so a stalled tab doesn't jump.
      const delta = last ? Math.min(Math.max(now - last, 1), 40) : 1000 / 60;
      last = now;
      const speed = speedRef.current;
      // Wrapped at a full turn so the value stays small over a long session.
      const angle = (angleRef.current + (speed * delta) / 1000) % 360;
      angleRef.current = angle;
      el.style.transform = `rotate(${angle}deg)`;
      // Every avatar on the ring shares one counter-rotation, which is what
      // keeps faces upright while the ring itself turns.
      el.style.setProperty("--network-graph-counter", `rotate(${-angle}deg)`);
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (frame) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    // Nobody sees a ring turning off screen, so the loop only runs on screen.
    if (typeof IntersectionObserver === "undefined") {
      start();
      return stop;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      stop();
    };
  }, [orbiting]);

  const angleStep = 360 / nodes.length;

  return (
    <div ref={ringRef} className="absolute inset-0 pointer-events-none">
      {nodes.map((node, index) => {
        const angle = angleStep * index - 90;
        const radian = (angle * Math.PI) / 180;
        const x = `calc(50% + ${radius * Math.cos(radian)}%)`;
        const y = `calc(50% + ${radius * Math.sin(radian)}%)`;

        return (
          <div
            key={node.id}
            className="absolute z-10 w-0 h-0 flex items-center justify-center pointer-events-auto"
            style={{ left: x, top: y }}
          >
            {/* 1. Entrance Scale & Opacity Wrapper */}
            <div
              style={{
                animation: animateIn
                  ? `network-graph-pop-in ${NODE_SPRING.duration}ms ${NODE_SPRING.easing} ${0.2 + ringIndex * 0.1 + index * 0.05}s backwards`
                  : undefined,
              }}
            >
              {/* 2. Counter-Rotation Wrapper (Keeps Avatars Upright!) */}
              <div
                className="relative group cursor-pointer"
                style={{ transform: "var(--network-graph-counter, none)" }}
              >
                <div
                  className={cn(
                    "relative rounded-full flex items-center justify-center overflow-hidden border border-white dark:border-[#0a0a0a] shadow-[0_2px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-110 group-hover:z-50 bg-card",
                    sizeMap[node.size as keyof typeof sizeMap] ?? sizeMap.md,
                  )}
                >
                  {node.image ? (
                    <img
                      src={node.image}
                      alt={node.label || "Avatar"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {node.fallback}
                    </span>
                  )}
                </div>

                {node.label && (
                  <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md bg-primary text-primary-foreground text-[10px] sm:text-[11px] font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    {node.label}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
