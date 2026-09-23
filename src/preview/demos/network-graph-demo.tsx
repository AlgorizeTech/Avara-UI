"use client";

import {
  NetworkGraph,
  NetworkNode,
} from "@/components/custom/blocks/NetworkGraphBlock";

const demoNodes: NetworkNode[] = [
  // Ring 1 (Inner)
  {
    id: "1",
    ring: 1,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-1790148865113.jpg",
    label: "Sarah J.",
  },
  {
    id: "2",
    ring: 1,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148864/80-1-1790148865111.jpg",
    label: "David B.",
  },
  { id: "3", ring: 1, fallback: "JW", label: "James W." },
  {
    id: "4",
    ring: 1,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-3-1790148865112.jpg",
    label: "Lisa M.",
  },

  // Ring 2 (Middle)
  { id: "5", ring: 2, image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-4-1790148865113.jpg", label: "Emma R." },
  { id: "6", ring: 2, image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-1790148865113.jpg", label: "Noah P." },
  { id: "7", ring: 2, fallback: "MK", label: "Mike K." },
  {
    id: "8",
    ring: 2,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148864/80-2-1790148865112.jpg",
    label: "Ava T.",
    size: "sm",
  },
  {
    id: "9",
    ring: 2,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-3-1790148865112.jpg",
    label: "Ethan C.",
  },
  {
    id: "10",
    ring: 2,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-3-1790148865112.jpg",
    label: "Olivia S.",
    size: "lg",
  },
  {
    id: "11",
    ring: 2,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-4-1790148865113.jpg",
    label: "Liam H.",
  },
  { id: "12", ring: 2, fallback: "PL", label: "Priya L.", size: "sm" },

  // Ring 3 (Outer)
  {
    id: "13",
    ring: 3,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148864/80-1-1790148865111.jpg",
    label: "Chloe D.",
    size: "sm",
  },
  {
    id: "14",
    ring: 3,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148864/80-2-1790148865112.jpg",
    label: "Marcus V.",
    size: "sm",
  },
  {
    id: "15",
    ring: 3,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-3-1790148865112.jpg",
    label: "Zoe N.",
    size: "md",
  },
  { id: "16", ring: 3, fallback: "AJ", label: "Aaron J.", size: "sm" },
  {
    id: "17",
    ring: 3,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-1790148865113.jpg",
    label: "Nina F.",
    size: "sm",
  },
  {
    id: "18",
    ring: 3,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148864/80-1-1790148865111.jpg",
    label: "Owen G.",
    size: "sm",
  },
  { id: "19", ring: 3, fallback: "TR", label: "Tara R.", size: "sm" },
  {
    id: "20",
    ring: 3,
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-1790148865113.jpg",
    label: "Felix Q.",
    size: "sm",
  },
];

export default function NetworkGraphDemo({
  triggerKey = 0,
  ringCount = 3,
  baseRadius = 18,
  ringGap = 16,
  animateOrbit = true,
  orbitSpeed = 1,
  showCenter = true,
  nodeSet = "full",
}: {
  triggerKey?: number;
  ringCount?: number;
  baseRadius?: number;
  ringGap?: number;
  animateOrbit?: boolean;
  orbitSpeed?: number;
  /** Hides the center avatar so the rings orbit an empty hub. */
  showCenter?: boolean;
  /** "compact" drops the outer ring's nodes for two-ring layouts. */
  nodeSet?: "full" | "compact";
}) {
  const nodes =
    nodeSet === "compact" ? demoNodes.filter((n) => n.ring < 3) : demoNodes;

  return (
    // No `overflow-hidden` here: the outer ring sits on the container edge, so a
    // hovered node at the bottom of its orbit would have its tooltip sliced off.
    // The grid layer carries its own radius instead, which is all the clip was for.
    <div className="w-full relative rounded-2xl bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="p-4 sm:p-8 md:p-12 flex items-center justify-center">
        <NetworkGraph
          // `ringCount` and `orbitSpeed` are deliberately NOT in the key: both
          // are slider-driven, and remounting on every step would restart the
          // entrance animation mid-drag. A newly revealed ring mounts on its
          // own and animates in anyway, and framer-motion picks up the new
          // orbit duration in place, so nothing is lost.
          key={`${triggerKey}-${nodeSet}-${animateOrbit}-${showCenter}`}
          nodes={nodes}
          ringCount={ringCount}
          baseRadius={baseRadius}
          ringGap={ringGap}
          animateOrbit={animateOrbit}
          orbitSpeed={orbitSpeed}
          centerNode={
            showCenter
              ? {
                  image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-1790148865113.jpg",
                  label: "You",
                }
              : undefined
          }
        />
      </div>
    </div>
  );
}
