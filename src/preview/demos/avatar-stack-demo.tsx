"use client";

import { Plus } from "lucide-react";
import { AvatarStack, type AvatarStackSize } from "@/components/custom/blocks/AvatarStackBlock";

const pexels = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop`;

const PEOPLE = [
  { src: pexels(1036623), alt: "Ana" },
  { src: pexels(2043590), alt: "Tom" },
  { src: pexels(1587009), alt: "Mara" },
  { src: pexels(3775534), alt: "Leo" },
  { src: pexels(1520760), alt: "June" },
  { src: pexels(6311475), alt: "Sam" },
];

export default function AvatarStackDemo({
  example = "action",
  size = "md",
  max = 3,
  spreadOnHover = true,
}: {
  /** `action` adds a "+" button; `count` folds the rest into "+N"; `sizes` shows all three sizes. */
  example?: "action" | "count" | "sizes";
  size?: AvatarStackSize;
  max?: number;
  spreadOnHover?: boolean;
}) {
  if (example === "sizes") {
    return (
      <div className="flex min-h-[220px] w-full flex-col items-center justify-center gap-6 px-6">
        {(["sm", "md", "lg"] as const).map((s) => (
          <AvatarStack key={s} avatars={PEOPLE} size={s} max={4} spreadOnHover={spreadOnHover} />
        ))}
      </div>
    );
  }

  if (example === "count") {
    return (
      <div className="flex min-h-[220px] w-full items-center justify-center gap-3 px-6">
        <AvatarStack avatars={PEOPLE} size={size} max={max} spreadOnHover={spreadOnHover} />
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">2,400+</span> people joined this month
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[220px] w-full items-center justify-center px-6">
      <AvatarStack
        avatars={PEOPLE.slice(0, 3)}
        size={size}
        max={max}
        spreadOnHover={spreadOnHover}
        action={
          <a
            href="#join"
            aria-label="Join the community"
            className="group grid size-full place-items-center rounded-full bg-[#111] text-white ring-2 ring-white transition-transform duration-300 hover:scale-110 dark:bg-white dark:text-[#111] dark:ring-zinc-950"
          >
            <Plus size={16} className="transition-transform duration-300 group-hover:rotate-90" />
          </a>
        }
      />
    </div>
  );
}
