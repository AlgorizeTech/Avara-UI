"use client";

import {
  NetworkGraph,
  NetworkNode,
} from "@/components/custom/blocks/NetworkGraphBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const _CODE_TS = `"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type NetworkNode = {
  id: string;
  ring: number;
  image?: string;
  fallback?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
};

export interface NetworkGraphProps extends React.HTMLAttributes<HTMLDivElement> {
  nodes: NetworkNode[];
  centerNode?: { image?: string; fallback?: string; label?: string; };
  ringCount?: number;
  baseRadius?: number;
  ringGap?: number;
  animateIn?: boolean;
  animateOrbit?: boolean;
  orbitSpeed?: number;
}

const sizeMap = {
  sm: "w-7 h-7 sm:w-10 sm:h-10",
  md: "w-9 h-9 sm:w-12 sm:h-12",
  lg: "w-12 h-12 sm:w-16 sm:h-16",
};

export const NetworkGraph = React.forwardRef<HTMLDivElement, NetworkGraphProps>(
  ({ nodes, centerNode, ringCount = 3, baseRadius = 15, ringGap = 15, animateIn = true, animateOrbit = true, orbitSpeed = 1, className, ...props }, ref) => {
    const rings = Array.from({ length: ringCount }, (_, i) => i + 1);
    const groupedNodes = useMemo(() => {
      const groups: Record<number, NetworkNode[]> = {};
      nodes.forEach((node) => {
        if (!groups[node.ring]) groups[node.ring] = [];
        groups[node.ring].push(node);
      });
      return groups;
    }, [nodes]);

    return (
      <div ref={ref} className={cn("relative w-full aspect-square max-w-[800px] mx-auto flex items-center justify-center", className)} {...props}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {rings.map((ring) => {
            const radius = baseRadius + (ring - 1) * ringGap;
            return <motion.div key={\`ring-\${ring}\`} initial={animateIn ? { opacity: 0, scale: 0.8 } : false} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: ring * 0.1, ease: "easeOut" }} className="absolute rounded-full border border-black/[0.08] dark:border-white/[0.08]" style={{ width: \`\${radius * 2}%\`, height: \`\${radius * 2}%\` }} />;
          })}
        </div>

        {rings.map((ringIndex) => {
          const ringNodes = groupedNodes[ringIndex] || [];
          const angleStep = 360 / ringNodes.length;
          const radius = baseRadius + (ringIndex - 1) * ringGap;
          const isEvenRing = ringIndex % 2 === 0;
          const baseDuration = (35 + ringIndex * 10) / (orbitSpeed || 1);
          const ringRotateDirection = isEvenRing ? -360 : 360;
          const avatarCounterRotate = isEvenRing ? 360 : -360;

          return (
            <motion.div
              key={\`ring-orbit-\${ringIndex}\`}
              className="absolute inset-0 pointer-events-none"
              animate={animateOrbit ? { rotate: ringRotateDirection } : { rotate: 0 }}
              transition={animateOrbit ? { duration: baseDuration, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
            >
              {ringNodes.map((node, index) => {
                const angle = angleStep * index - 90;
                const radian = (angle * Math.PI) / 180;
                const x = \`calc(50% + \${radius * Math.cos(radian)}%)\`;
                const y = \`calc(50% + \${radius * Math.sin(radian)}%)\`;

                return (
                  <div key={node.id} className="absolute z-10 w-0 h-0 flex items-center justify-center pointer-events-auto" style={{ left: x, top: y }}>
                    <motion.div initial={animateIn ? { opacity: 0, scale: 0 } : false} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 + ringIndex * 0.1 + index * 0.05 }}>
                      <motion.div className="relative group cursor-pointer" animate={animateOrbit ? { rotate: avatarCounterRotate } : { rotate: 0 }} transition={animateOrbit ? { duration: baseDuration, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}>
                        <div className={cn("relative rounded-full flex items-center justify-center overflow-hidden border border-white dark:border-[#0a0a0a] shadow-[0_2px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-110 group-hover:z-50 bg-white dark:bg-zinc-900", sizeMap[node.size || "md"])}>
                          {node.image ? <img src={node.image} alt={node.label || "Avatar"} className="w-full h-full object-cover" /> : <span className="text-[10px] sm:text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">{node.fallback}</span>}
                        </div>
                        {node.label && <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] sm:text-[11px] font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">{node.label}</div>}
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          );
        })}

        {centerNode && (
          <div className="absolute z-20 w-0 h-0 flex items-center justify-center left-1/2 top-1/2">
            <motion.div initial={animateIn ? { scale: 0, opacity: 0 } : false} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="relative group cursor-pointer">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-[4px] sm:border-[6px] border-white dark:border-[#0a0a0a] shadow-xl overflow-hidden bg-white dark:bg-zinc-900 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                {centerNode.image ? <img src={centerNode.image} alt={centerNode.label || "Center"} className="w-full h-full object-cover" /> : <span className="text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-400 uppercase">{centerNode.fallback}</span>}
              </div>
              {centerNode.label && <div className="absolute top-[calc(100%+10px)] sm:top-[calc(100%+14px)] left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 sm:py-1.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] sm:text-xs font-bold shadow-sm z-50">{centerNode.label}</div>}
            </motion.div>
          </div>
        )}
      </div>
    );
  }
);
NetworkGraph.displayName = "NetworkGraph";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const _CODE_JS = `"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const sizeMap = {
  sm: "w-7 h-7 sm:w-10 sm:h-10",
  md: "w-9 h-9 sm:w-12 sm:h-12",
  lg: "w-12 h-12 sm:w-16 sm:h-16",
};

export const NetworkGraph = React.forwardRef(
  ({ nodes, centerNode, ringCount = 3, baseRadius = 15, ringGap = 15, animateIn = true, animateOrbit = true, orbitSpeed = 1, className, ...props }, ref) => {
    const rings = Array.from({ length: ringCount }, (_, i) => i + 1);
    const groupedNodes = useMemo(() => {
      const groups = {};
      nodes.forEach((node) => {
        if (!groups[node.ring]) groups[node.ring] = [];
        groups[node.ring].push(node);
      });
      return groups;
    }, [nodes]);

    return (
      <div ref={ref} className={cn("relative w-full aspect-square max-w-[800px] mx-auto flex items-center justify-center", className)} {...props}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {rings.map((ring) => {
            const radius = baseRadius + (ring - 1) * ringGap;
            return <motion.div key={\`ring-\${ring}\`} initial={animateIn ? { opacity: 0, scale: 0.8 } : false} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: ring * 0.1, ease: "easeOut" }} className="absolute rounded-full border border-black/[0.08] dark:border-white/[0.08]" style={{ width: \`\${radius * 2}%\`, height: \`\${radius * 2}%\` }} />;
          })}
        </div>

        {rings.map((ringIndex) => {
          const ringNodes = groupedNodes[ringIndex] || [];
          const angleStep = 360 / ringNodes.length;
          const radius = baseRadius + (ringIndex - 1) * ringGap;
          const isEvenRing = ringIndex % 2 === 0;
          const baseDuration = (35 + ringIndex * 10) / (orbitSpeed || 1);
          const ringRotateDirection = isEvenRing ? -360 : 360;
          const avatarCounterRotate = isEvenRing ? 360 : -360;

          return (
            <motion.div
              key={\`ring-orbit-\${ringIndex}\`}
              className="absolute inset-0 pointer-events-none"
              animate={animateOrbit ? { rotate: ringRotateDirection } : { rotate: 0 }}
              transition={animateOrbit ? { duration: baseDuration, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
            >
              {ringNodes.map((node, index) => {
                const angle = angleStep * index - 90;
                const radian = (angle * Math.PI) / 180;
                const x = \`calc(50% + \${radius * Math.cos(radian)}%)\`;
                const y = \`calc(50% + \${radius * Math.sin(radian)}%)\`;

                return (
                  <div key={node.id} className="absolute z-10 w-0 h-0 flex items-center justify-center pointer-events-auto" style={{ left: x, top: y }}>
                    <motion.div initial={animateIn ? { opacity: 0, scale: 0 } : false} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 + ringIndex * 0.1 + index * 0.05 }}>
                      <motion.div className="relative group cursor-pointer" animate={animateOrbit ? { rotate: avatarCounterRotate } : { rotate: 0 }} transition={animateOrbit ? { duration: baseDuration, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}>
                        <div className={cn("relative rounded-full flex items-center justify-center overflow-hidden border border-white dark:border-[#0a0a0a] shadow-[0_2px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-110 group-hover:z-50 bg-white dark:bg-zinc-900", sizeMap[node.size || "md"])}>
                          {node.image ? <img src={node.image} alt={node.label || "Avatar"} className="w-full h-full object-cover" /> : <span className="text-[10px] sm:text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">{node.fallback}</span>}
                        </div>
                        {node.label && <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] sm:text-[11px] font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">{node.label}</div>}
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          );
        })}

        {centerNode && (
          <div className="absolute z-20 w-0 h-0 flex items-center justify-center left-1/2 top-1/2">
            <motion.div initial={animateIn ? { scale: 0, opacity: 0 } : false} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="relative group cursor-pointer">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-[4px] sm:border-[6px] border-white dark:border-[#0a0a0a] shadow-xl overflow-hidden bg-white dark:bg-zinc-900 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                {centerNode.image ? <img src={centerNode.image} alt={centerNode.label || "Center"} className="w-full h-full object-cover" /> : <span className="text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-400 uppercase">{centerNode.fallback}</span>}
              </div>
              {centerNode.label && <div className="absolute top-[calc(100%+10px)] sm:top-[calc(100%+14px)] left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 sm:py-1.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] sm:text-xs font-bold shadow-sm z-50">{centerNode.label}</div>}
            </motion.div>
          </div>
        )}
      </div>
    );
  }
);
NetworkGraph.displayName = "NetworkGraph";`;

const demoNodes: NetworkNode[] = [
  // Ring 1 (Inner)
  {
    id: "1",
    ring: 1,
    image: "https://i.pravatar.cc/150?u=1",
    label: "Sarah J.",
  },
  {
    id: "2",
    ring: 1,
    image: "https://i.pravatar.cc/150?u=2",
    label: "David B.",
  },
  { id: "3", ring: 1, fallback: "JW", label: "James W." },
  {
    id: "4",
    ring: 1,
    image: "https://i.pravatar.cc/150?u=4",
    label: "Lisa M.",
  },

  // Ring 2 (Middle)
  { id: "5", ring: 2, image: "https://i.pravatar.cc/150?u=5" },
  { id: "6", ring: 2, image: "https://i.pravatar.cc/150?u=6" },
  { id: "7", ring: 2, fallback: "MK", label: "Mike K." },
  { id: "8", ring: 2, image: "https://i.pravatar.cc/150?u=8", size: "sm" },
  { id: "9", ring: 2, image: "https://i.pravatar.cc/150?u=9" },
  { id: "10", ring: 2, image: "https://i.pravatar.cc/150?u=10", size: "lg" },
  { id: "11", ring: 2, image: "https://i.pravatar.cc/150?u=11" },
  { id: "12", ring: 2, fallback: "PL", size: "sm" },

  // Ring 3 (Outer)
  { id: "13", ring: 3, image: "https://i.pravatar.cc/150?u=13", size: "sm" },
  { id: "14", ring: 3, image: "https://i.pravatar.cc/150?u=14", size: "sm" },
  { id: "15", ring: 3, image: "https://i.pravatar.cc/150?u=15", size: "md" },
  { id: "16", ring: 3, fallback: "AJ", size: "sm" },
  { id: "17", ring: 3, image: "https://i.pravatar.cc/150?u=17", size: "sm" },
  { id: "18", ring: 3, image: "https://i.pravatar.cc/150?u=18", size: "sm" },
  { id: "19", ring: 3, fallback: "TR", size: "sm" },
  { id: "20", ring: 3, image: "https://i.pravatar.cc/150?u=21", size: "sm" },
];

export function NetworkGraphShowcase() {
  const [triggerKey, setTriggerKey] = useState(0);

  const generateUsageCode = () => {
    return `import { NetworkGraph } from "@/components/custom/blocks/NetworkGraphBlock";

const users = [
  { id: "1", ring: 1, image: "https://i.pravatar.cc/150?u=1", label: "Sarah" },
  { id: "2", ring: 1, image: "https://i.pravatar.cc/150?u=2", label: "David" },
  { id: "3", ring: 2, fallback: "JW", size: "sm" },
  { id: "4", ring: 2, image: "https://i.pravatar.cc/150?u=4", size: "sm" },
];

export default function SocialProofHero() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-[#0a0a0a] p-8 md:p-16">
      <NetworkGraph 
        ringCount={2}
        baseRadius={20}
        ringGap={20}
        animateOrbit={true}
        orbitSpeed={1}
        centerNode={{ 
          image: "https://i.pravatar.cc/150?u=99", 
          label: "You" 
        }}
        nodes={users}
      />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* Control Panel */}
      {/* <div className="flex flex-col gap-4 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl">
        <button
          onClick={() => setTriggerKey((prev) => prev + 1)}
          className="w-max px-4 py-2 text-sm font-semibold text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 rounded-lg shadow-sm hover:opacity-90 transition-opacity"
        >
          Replay Entrance Animation
        </button>
      </div> */}

      {/* Preview & Code */}
      <ComponentPreview
        name="NetworkGraphBlock"
        tsCode={_CODE_TS}
        jsCode={_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
      >
        <div className="w-full relative rounded-2xl overflow-hidden bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="p-8 md:p-16 flex items-center justify-center">
            <NetworkGraph
              key={triggerKey}
              nodes={demoNodes}
              ringCount={3}
              baseRadius={18}
              ringGap={16}
              animateOrbit={true}
              orbitSpeed={1}
              centerNode={{
                image: "https://i.pravatar.cc/150?u=99",
                label: "You",
              }}
            />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
