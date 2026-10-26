"use client";

import { Plus } from "lucide-react";
import {
  AvatarStack,
  AvatarGroup,
  AvatarGroupTooltip,
  Avatar,
  AvatarImage,
  AvatarFallback,
  type AvatarStackSize,
} from "@/components/custom/blocks/AvatarStackBlock";

const PEOPLE = [
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg",
    alt: "Ana Watson",
    designation: "Founder & CEO",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg",
    alt: "Tom Hardy",
    designation: "Co-Founder & CTO",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg",
    alt: "Mara Jade",
    designation: "Managing Director",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg",
    alt: "Leo Silva",
    designation: "Chairman & Co-Founder",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg",
    alt: "June Carter",
    designation: "President & Co-Founder",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg",
    alt: "Sam Wilson",
    designation: "Chief Executive Officer",
  },
];

const GROUP_PEOPLE = [
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg",
    alt: "Ana Watson",
    name: "Ana Watson",
    fallback: "AW",
    designation: "Founder & CEO",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg",
    alt: "Tom Hardy",
    name: "Tom Hardy",
    fallback: "TH",
    designation: "Co-Founder & CTO",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg",
    alt: "Mara Jade",
    name: "Mara Jade",
    fallback: "MJ",
    designation: "Managing Director",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg",
    alt: "Leo Silva",
    name: "Leo Silva",
    fallback: "LS",
    designation: "Chairman & Co-Founder",
  },
];

export default function AvatarStackDemo({
  example = "default",
  size = "md",
  max = 4,
  spreadOnHover = false,
  spreadDistance = 6,
  transitionDuration = 500,
  translate = "-30%",
  liftOnHover = true,
  showTooltip,
  showTooltipArrow,
}: {
  /** `default` shows a clean stack without tooltips; `tooltip` shows tooltip and zoom without gap; `tooltip-arrow` shows tooltip with arrow pointer; `spread` widens gap without zoom; `spread-tooltip` widens gap with tooltip; `spread-tooltip-arrow` widens gap with arrow tooltip; `avatar-group` shows the animate-ui spring shift on hover; `action` adds a "+" button; `count` folds the rest into "+N"; `sizes` shows all three sizes. */
  example?: "default" | "tooltip" | "tooltip-arrow" | "zoom" | "spread" | "spread-tooltip" | "spread-tooltip-arrow" | "action" | "count" | "sizes" | "avatar-group" | "shift";
  size?: AvatarStackSize;
  max?: number;
  spreadOnHover?: boolean;
  spreadDistance?: number;
  transitionDuration?: number;
  translate?: string | number;
  liftOnHover?: boolean;
  showTooltip?: boolean;
  showTooltipArrow?: boolean;
}) {
  if (example === "avatar-group" || example === "shift") {
    return (
      <div className="flex min-h-[220px] w-full items-center justify-center px-6">
        <AvatarGroup showTooltip={showTooltip ?? true}>
          {GROUP_PEOPLE.map((avatar, index) => (
            <Avatar key={index} className="size-12 border-[3px] border-background ring-0 cursor-pointer">
              <AvatarImage src={avatar.src} alt={avatar.alt} />
              <AvatarFallback>{avatar.fallback}</AvatarFallback>
              <AvatarGroupTooltip designation={avatar.designation}>
                {avatar.name}
              </AvatarGroupTooltip>
            </Avatar>
          ))}
        </AvatarGroup>
      </div>
    );
  }

  // Example 1: Tooltip with zoom, gap DOES NOT increase
  if (example === "tooltip" || example === "zoom") {
    return (
      <div className="flex min-h-[220px] w-full items-center justify-center px-6">
        <AvatarStack
          avatars={PEOPLE}
          size={size}
          max={max}
          spreadOnHover={false}
          liftOnHover={true}
          showTooltip={true}
          showTooltipArrow={showTooltipArrow ?? false}
        />
      </div>
    );
  }

  // Example 1b: Tooltip with pointer arrow and zoom
  if (example === "tooltip-arrow") {
    return (
      <div className="flex min-h-[220px] w-full items-center justify-center px-6">
        <AvatarStack
          avatars={PEOPLE}
          size={size}
          max={max}
          spreadOnHover={false}
          liftOnHover={true}
          showTooltip={true}
          showTooltipArrow={true}
        />
      </div>
    );
  }

  // Example 2: Width/gap expands to the right, and hovered avatar shifts up slightly (-30%), but NO zoom
  if (example === "spread") {
    return (
      <div className="flex min-h-[220px] w-full items-center justify-center px-6">
        <AvatarStack
          avatars={PEOPLE}
          size={size}
          max={max}
          spreadOnHover={true}
          spreadDistance={spreadDistance ?? 6}
          transitionDuration={transitionDuration ?? 500}
          translate={translate ?? "-30%"}
          liftOnHover={false}
          showTooltip={showTooltip ?? false}
          showTooltipArrow={showTooltipArrow ?? false}
        />
      </div>
    );
  }

  // Example 2b: Spread with tooltip (no arrow)
  if (example === "spread-tooltip") {
    return (
      <div className="flex min-h-[220px] w-full items-center justify-center px-6">
        <AvatarStack
          avatars={PEOPLE}
          size={size}
          max={max}
          spreadOnHover={true}
          spreadDistance={spreadDistance ?? 6}
          transitionDuration={transitionDuration ?? 500}
          translate={translate ?? "-30%"}
          liftOnHover={false}
          showTooltip={true}
          showTooltipArrow={false}
        />
      </div>
    );
  }

  // Example 2c: Spread with tooltip arrow
  if (example === "spread-tooltip-arrow") {
    return (
      <div className="flex min-h-[220px] w-full items-center justify-center px-6">
        <AvatarStack
          avatars={PEOPLE}
          size={size}
          max={max}
          spreadOnHover={true}
          spreadDistance={spreadDistance ?? 6}
          transitionDuration={transitionDuration ?? 500}
          translate={translate ?? "-30%"}
          liftOnHover={false}
          showTooltip={true}
          showTooltipArrow={true}
        />
      </div>
    );
  }

  if (example === "default") {
    return (
      <div className="flex min-h-[220px] w-full items-center justify-center px-6">
        <AvatarStack
          avatars={PEOPLE}
          size={size}
          max={max}
          spreadOnHover={spreadOnHover}
          showTooltip={showTooltip ?? false}
        />
      </div>
    );
  }

  if (example === "sizes") {
    return (
      <div className="flex min-h-[220px] w-full flex-col items-center justify-center gap-6 px-6">
        <AvatarStack avatars={PEOPLE} size="sm" max={4} spreadOnHover={spreadOnHover} />
        <AvatarStack avatars={PEOPLE} size="md" max={4} spreadOnHover={spreadOnHover} showTooltip={false} />
        <AvatarStack avatars={PEOPLE} size="lg" max={4} spreadOnHover={spreadOnHover} showTooltipArrow={true} />
      </div>
    );
  }

  if (example === "count") {
    return (
      <div className="flex min-h-[220px] w-full items-center justify-center gap-3 px-6">
        <AvatarStack
          avatars={PEOPLE}
          size={size}
          max={max}
          spreadOnHover={spreadOnHover}
          showTooltip={showTooltip ?? true}
          showTooltipArrow={showTooltipArrow ?? true}
        />
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
        showTooltip={showTooltip}
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
