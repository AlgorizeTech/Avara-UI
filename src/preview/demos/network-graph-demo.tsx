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

export default function NetworkGraphDemo({
  triggerKey = 0,
}: {
  triggerKey?: number;
}) {
  return (
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
  );
}
