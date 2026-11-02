"use client";

import {
  AvatarStack,
  type AvatarStackSize,
  type AvatarStackVariant,
  type AvatarStackType,
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

export default function AvatarStackDemo({
  example = "default",
  variant,
  type,
  size = "md",
  max = 4,
  spreadOnHover,
  spreadDistance = 6,
  transitionDuration = 500,
  translate,
  liftOnHover,
  showTooltip,
  showTooltipArrow,
}: {
  /** `default` shows a clean stack without tooltips; `tooltip` shows tooltip and zoom without gap; `tooltip-arrow` shows tooltip with arrow pointer; `spread` widens gap without zoom; `spread-tooltip` widens gap with tooltip; `spread-tooltip-arrow` widens gap with arrow tooltip; `avatar-group` shows the animate-ui spring shift on hover; `action` adds a "+" button; `count` folds the rest into "+N"; `sizes` shows all three sizes. */
  example?: "default" | "tooltip" | "tooltip-arrow" | "zoom" | "spread" | "spread-tooltip" | "spread-tooltip-arrow" | "action" | "count" | "sizes" | "avatar-group" | "shift";
  variant?: AvatarStackVariant;
  type?: AvatarStackType;
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
  if (example === "avatar-group" || example === "shift" || variant === "shift") {
    return (
      <div className="flex min-h-[220px] w-full items-center justify-center px-6">
        <AvatarStack
          avatars={PEOPLE}
          variant="shift"
          size="xl"
          max={max}
          showTooltip={showTooltip ?? true}
        />
      </div>
    );
  }

  // Direct variant="zoom" or variant="spread" via props (excluding count/sizes/action examples)
  if ((variant === "zoom" || variant === "spread") && example !== "count" && example !== "sizes" && example !== "action") {
    return (
      <div className="flex min-h-[220px] w-full items-center justify-center px-6">
        <AvatarStack
          avatars={PEOPLE}
          variant={variant}
          type={type ?? "default"}
          size={size}
          max={max}
          spreadOnHover={spreadOnHover}
          spreadDistance={spreadDistance}
          transitionDuration={transitionDuration}
          translate={translate}
          liftOnHover={liftOnHover}
          showTooltip={showTooltip}
          showTooltipArrow={showTooltipArrow}
        />
      </div>
    );
  }

  if (example === "default") {
    return (
      <div className="flex min-h-[220px] w-full items-center justify-center px-6">
        <AvatarStack
          avatars={PEOPLE}
          variant="zoom"
          type={type ?? "default"}
          size={size}
          max={max}
        />
      </div>
    );
  }

  if (example === "tooltip" || example === "zoom") {
    return (
      <div className="flex min-h-[220px] w-full items-center justify-center px-6">
        <AvatarStack
          avatars={PEOPLE}
          variant="zoom"
          type={type ?? "tooltip"}
          size={size}
          max={max}
        />
      </div>
    );
  }

  if (example === "tooltip-arrow") {
    return (
      <div className="flex min-h-[220px] w-full items-center justify-center px-6">
        <AvatarStack
          avatars={PEOPLE}
          variant="zoom"
          type={type ?? "tooltip-arrow"}
          size={size}
          max={max}
        />
      </div>
    );
  }

  if (example === "spread") {
    return (
      <div className="flex min-h-[220px] w-full items-center justify-center px-6">
        <AvatarStack
          avatars={PEOPLE}
          variant="spread"
          type={type ?? "default"}
          size={size}
          max={max}
        />
      </div>
    );
  }

  if (example === "spread-tooltip") {
    return (
      <div className="flex min-h-[220px] w-full items-center justify-center px-6">
        <AvatarStack
          avatars={PEOPLE}
          variant="spread"
          type={type ?? "tooltip"}
          size={size}
          max={max}
        />
      </div>
    );
  }

  if (example === "spread-tooltip-arrow") {
    return (
      <div className="flex min-h-[220px] w-full items-center justify-center px-6">
        <AvatarStack
          avatars={PEOPLE}
          variant="spread"
          type={type ?? "tooltip-arrow"}
          size={size}
          max={max}
        />
      </div>
    );
  }

  if (example === "sizes") {
    return (
      <div className="flex min-h-[220px] w-full flex-col items-center justify-center gap-6 px-6">
        <AvatarStack avatars={PEOPLE} variant="zoom" type="tooltip" size="sm" max={4} className="m-0 p-0" />
        <AvatarStack avatars={PEOPLE} variant="zoom" type="default" size="md" max={4} className="m-0 p-0" />
        <AvatarStack avatars={PEOPLE} variant="zoom" type="tooltip-arrow" size="lg" max={4} className="m-0 p-0" />
      </div>
    );
  }

  if (example === "count") {
    return (
      <div className="flex min-h-[220px] w-full items-center justify-center gap-3 px-6">
        <AvatarStack
          avatars={PEOPLE}
          variant="zoom"
          type="tooltip-arrow"
          size={size}
          max={max}
          className="m-0 p-0"
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
        variant="zoom"
        type="tooltip"
        size={size}
        action={() => console.log("Action clicked")}
      />
    </div>
  );
}
