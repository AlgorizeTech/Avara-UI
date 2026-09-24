"use client";

import { Plus } from "lucide-react";
import { AvatarStack, type AvatarStackSize } from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "June" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg", alt: "Sam" },
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
            className="group grid size-full place-items-center rounded-full bg-primary text-primary-foreground ring-2 ring-background transition-transform duration-300 hover:scale-110"
          >
            <Plus size={16} className="transition-transform duration-300 group-hover:rotate-90" />
          </a>
        }
      />
    </div>
  );
}
