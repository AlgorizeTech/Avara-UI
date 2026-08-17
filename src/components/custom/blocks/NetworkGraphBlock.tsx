"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useMemo } from "react";

export type NetworkNode = {
  id: string;
  ring: number; // 1 (inner), 2 (middle), 3 (outer), etc.
  image?: string;
  fallback?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
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
        {/* Render Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {rings.map((ring) => {
            const radius = baseRadius + (ring - 1) * ringGap;
            return (
              <motion.div
                key={`ring-${ring}`}
                initial={animateIn ? { opacity: 0, scale: 0.8 } : false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: ring * 0.1,
                  ease: "easeOut",
                }}
                className="absolute rounded-full border border-black/[0.08] dark:border-white/[0.08]"
                style={{
                  width: `${radius * 2}%`,
                  height: `${radius * 2}%`,
                }}
              />
            );
          })}
        </div>

        {/* Render Nodes per Ring with Orbiting Container */}
        {rings.map((ringIndex) => {
          const ringNodes = groupedNodes[ringIndex] || [];
          const angleStep = 360 / ringNodes.length;
          const radius = baseRadius + (ringIndex - 1) * ringGap;

          // Alternate rotation direction per ring for visual depth
          const isEvenRing = ringIndex % 2 === 0;
          const baseDuration = (35 + ringIndex * 10) / (orbitSpeed || 1);
          const ringRotateDirection = isEvenRing ? -360 : 360;
          const avatarCounterRotate = isEvenRing ? 360 : -360;

          return (
            <motion.div
              key={`ring-orbit-${ringIndex}`}
              className="absolute inset-0 pointer-events-none"
              animate={
                animateOrbit ? { rotate: ringRotateDirection } : { rotate: 0 }
              }
              transition={
                animateOrbit
                  ? {
                      duration: baseDuration,
                      repeat: Infinity,
                      ease: "linear",
                    }
                  : { duration: 0.5 }
              }
            >
              {ringNodes.map((node, index) => {
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
                    <motion.div
                      initial={animateIn ? { opacity: 0, scale: 0 } : false}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.2 + ringIndex * 0.1 + index * 0.05,
                      }}
                    >
                      {/* 2. Counter-Rotation Wrapper (Keeps Avatars Upright!) */}
                      <motion.div
                        className="relative group cursor-pointer"
                        animate={
                          animateOrbit
                            ? { rotate: avatarCounterRotate }
                            : { rotate: 0 }
                        }
                        transition={
                          animateOrbit
                            ? {
                                duration: baseDuration,
                                repeat: Infinity,
                                ease: "linear",
                              }
                            : { duration: 0.5 }
                        }
                      >
                        <div
                          className={cn(
                            "relative rounded-full flex items-center justify-center overflow-hidden border border-white dark:border-[#0a0a0a] shadow-[0_2px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-110 group-hover:z-50 bg-white dark:bg-zinc-900",
                            sizeMap[node.size || "md"],
                          )}
                        >
                          {node.image ? (
                            <img
                              src={node.image}
                              alt={node.label || "Avatar"}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-[10px] sm:text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                              {node.fallback}
                            </span>
                          )}
                        </div>

                        {node.label && (
                          <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] sm:text-[11px] font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                            {node.label}
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          );
        })}

        {/* Center Node */}
        {centerNode && (
          <div className="absolute z-20 w-0 h-0 flex items-center justify-center left-1/2 top-1/2">
            <motion.div
              initial={animateIn ? { scale: 0, opacity: 0 } : false}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative group cursor-pointer"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-[3px] sm:border-[5px] border-white dark:border-[#0a0a0a] shadow-xl overflow-hidden bg-white dark:bg-zinc-900 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                {centerNode.image ? (
                  <img
                    src={centerNode.image}
                    alt={centerNode.label || "Center"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-400 uppercase">
                    {centerNode.fallback}
                  </span>
                )}
              </div>
              {centerNode.label && (
                <div className="absolute top-[calc(100%+10px)] sm:top-[calc(100%+14px)] left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 sm:py-1.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] sm:text-xs font-bold shadow-sm z-50">
                  {centerNode.label}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    );
  },
);
NetworkGraph.displayName = "NetworkGraph";
