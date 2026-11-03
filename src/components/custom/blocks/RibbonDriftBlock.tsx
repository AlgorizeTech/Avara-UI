"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { AvatarStack, type StackAvatar } from "./AvatarStackBlock";

export type RibbonDriftColor =
  | "primary"
  | "indigo"
  | "rose"
  | "emerald"
  | "amber"
  | "violet"
  | "zinc"
  | (string & {});

export interface RibbonDriftPromo {
  title?: string;
  body?: string;
  href?: string;
  onClick?: () => void;
  avatars?: (string | StackAvatar)[];
}

export interface RibbonDriftLogo {
  href?: string;
  logo?: string;
  logoDark?: string;
  brandName?: string;
  brandAccent?: string;
}

export interface RibbonDriftProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Main character or illustration image URL centered on the card */
  image?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Custom logo or badge element shown at the top-right pill */
  badge?: React.ReactNode;
  /** Logo configuration when not using a custom badge node */
  logoConfig?: RibbonDriftLogo;
  /** Floating top marquee ribbon items (-7deg tilt) */
  ribbonsTop?: string[];
  /** Floating bottom marquee ribbon items (+5deg tilt, reverse direction) */
  ribbonsBottom?: string[];
  /** Floating promo card data at the bottom (pass null to hide) */
  promo?: RibbonDriftPromo | null;
  /** Color theme palette */
  color?: RibbonDriftColor;
  /** Custom corner radius value or class */
  rounded?: string | number;
  /** Marquee speed in seconds (default: 48) */
  marqueeDuration?: number;
  /** Pause marquee scrolling when hovering the card (default: false) */
  pauseOnHover?: boolean;
}

const defaultImage =
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1793701432/register-hero-1793701431524.png";

const defaultRibbonsTop = [
  "Interviews run day and night",
  "Every applicant, the same questions",
  "Recordings ready for your review",
];

const defaultRibbonsBottom = [
  "Qualified candidates, interviewed in minutes",
  "Your first round, handled",
  "You make every hiring decision",
];

const defaultAvatars: StackAvatar[] = [
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg",
    alt: "Ana Watson",
    name: "Ana Watson",
    designation: "Founder & CEO",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg",
    alt: "Tom Hardy",
    name: "Tom Hardy",
    designation: "Co-Founder & CTO",
  },
  {
    src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg",
    alt: "Mara Jade",
    name: "Mara Jade",
    designation: "Managing Director",
  },
];

const defaultPromo: RibbonDriftPromo = {
  title: "Interviews run day and night",
  body: "See who qualified while you were away",
  href: "#",
  avatars: defaultAvatars,
};

function formatRadius(radius?: string | number): string | undefined {
  if (radius === undefined || radius === null) return undefined;
  if (typeof radius === "number") return `${radius}px`;
  if (/^\d+(\.\d+)?$/.test(radius)) return `${radius}px`;
  if (/^[0-9]+(px|rem|em|%|vh|vw)$/.test(radius)) return radius;
  if (radius.startsWith("var(")) return radius;
  return undefined;
}

const colorMap: Record<string, { primary: string; secondary: string }> = {
  primary: {
    primary: "var(--primary, #6366f1)",
    secondary: "color-mix(in oklab, var(--primary, #6366f1) 70%, white)",
  },
  default: {
    primary: "var(--primary, #6366f1)",
    secondary: "color-mix(in oklab, var(--primary, #6366f1) 70%, white)",
  },
  indigo: { primary: "#6366f1", secondary: "#a855f7" },
  rose: { primary: "#f43f5e", secondary: "#fb7185" },
  emerald: { primary: "#10b981", secondary: "#34d399" },
  amber: { primary: "#f59e0b", secondary: "#fbbf24" },
  violet: { primary: "#8b5cf6", secondary: "#c084fc" },
  zinc: { primary: "#71717a", secondary: "#a1a1aa" },
};

export function RibbonDriftBlock({
  image = defaultImage,
  imageAlt = "Feature illustration",
  badge,
  logoConfig,
  ribbonsTop = defaultRibbonsTop,
  ribbonsBottom = defaultRibbonsBottom,
  promo = defaultPromo,
  color = "primary",
  rounded,
  marqueeDuration = 48,
  pauseOnHover = false,
  className,
  style,
  ...props
}: RibbonDriftProps) {
  const dynamicRadius = formatRadius(rounded);
  const cardRadiusStyle: React.CSSProperties = dynamicRadius
    ? { borderRadius: dynamicRadius }
    : {};

  const themeVars = colorMap[color] || {
    primary: color,
    secondary: `color-mix(in oklab, ${color} 70%, white)`,
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ribbonKeyframes }} />
      <aside
        className={cn(
          "group/drift relative isolate w-full max-w-full min-w-0 flex-1 min-h-[460px] sm:min-h-[520px] lg:min-h-[560px] overflow-hidden bg-[#d8d8de] dark:bg-[#0d0d10] border border-black/5 dark:border-white/5 shadow-sm rounded-3xl",
          typeof rounded === "string" && !dynamicRadius ? rounded : "",
          className,
        )}
        style={{
          ...cardRadiusStyle,
          ...style,
          // Custom color variables for ambient gradient & diamond separators
          ["--drift-primary" as string]: themeVars.primary,
          ["--drift-secondary" as string]: themeVars.secondary,
        }}
        {...props}
      >
        {/* Animated ambient gradient background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-[ribbon-drift-bg_24s_ease-in-out_infinite_alternate] bg-[length:140%_140%] bg-[radial-gradient(70%_55%_at_15%_20%,color-mix(in_oklab,var(--drift-primary)_70%,transparent),transparent_70%),radial-gradient(65%_55%_at_90%_85%,color-mix(in_oklab,var(--drift-secondary)_75%,transparent),transparent_70%),linear-gradient(160deg,#f6f6f9,#b4b4c2_40%,#fff_60%,#73738a)] motion-reduce:animate-none dark:bg-[radial-gradient(70%_55%_at_15%_20%,color-mix(in_oklab,var(--drift-primary)_35%,transparent),transparent_70%),radial-gradient(65%_55%_at_90%_85%,color-mix(in_oklab,var(--drift-secondary)_28%,transparent),transparent_70%),linear-gradient(160deg,#34343f,#0b0b0f_40%,#5a5a6c_60%,#040406)] pointer-events-none"
        />

        {/* Top Marquee Ribbon (-7deg, Layer z-1 behind character) */}
        {ribbonsTop && ribbonsTop.length > 0 && (
          <RibbonTrack
            items={ribbonsTop}
            className="top-[48%] sm:top-[50%] z-[1] -rotate-[7deg]"
            duration={marqueeDuration}
            pauseOnHover={pauseOnHover}
          />
        )}

        {/* Central 3D Illustration / Character (Layer z-2) */}
        {image && (
          <div className="absolute inset-[4%_6%_10%] z-[2] pointer-events-none flex items-end justify-center">
            <img
              src={image}
              alt={imageAlt}
              className="size-full object-contain object-bottom drop-shadow-[0_28px_36px_rgba(20,12,60,0.28)] select-none"
            />
          </div>
        )}

        {/* Bottom Marquee Ribbon (+5deg reverse, Layer z-3 in front of character) */}
        {ribbonsBottom && ribbonsBottom.length > 0 && (
          <RibbonTrack
            items={ribbonsBottom}
            className="top-[62%] sm:top-[63%] z-[3] rotate-[5deg]"
            reverse
            duration={marqueeDuration}
            pauseOnHover={pauseOnHover}
          />
        )}

        {/* Top-Right Logo Badge (Layer z-5) */}
        <div className="absolute right-3.5 top-3.5 z-[5] flex items-center rounded-full border border-white/70 bg-white/70 px-3.5 py-1.5 sm:px-4 sm:py-2 backdrop-blur-xl shadow-sm dark:border-white/15 dark:bg-[#131316]/70">
          {badge ? (
            badge
          ) : (
            <RibbonLogo config={logoConfig} />
          )}
        </div>

        {/* Bottom Floating Promo Card (Layer z-4) */}
        {promo && (
          <PromoCard promo={promo} rounded={rounded} />
        )}
      </aside>
    </>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENTS
// ---------------------------------------------------------------------------

function RibbonTrack({
  items,
  className = "",
  reverse = false,
  duration = 48,
  pauseOnHover = false,
}: {
  items: string[];
  className?: string;
  reverse?: boolean;
  duration?: number;
  pauseOnHover?: boolean;
}) {
  if (!items.length) return null;
  const row = [...items, ...items, ...items, ...items];

  return (
    <div
      className={cn(
        "pointer-events-none absolute -left-[15%] w-[130%] sm:-left-[20%] sm:w-[140%] max-w-none overflow-hidden whitespace-nowrap border-y border-white/70 bg-white/60 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-[#1b1b22] backdrop-blur-md dark:border-white/15 dark:bg-[#131316]/60 dark:text-[#ececf1] select-none shadow-xs",
        className,
      )}
    >
      <div
        style={{ animationDuration: `${duration}s` }}
        className={cn(
          "flex w-max animate-[ribbon-drift-marquee_48s_linear_infinite] motion-reduce:animate-none",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover/drift:[animation-play-state:paused]",
        )}
      >
        {[0, 1].map((half) => (
          <span key={half} className="flex" aria-hidden={half === 1}>
            {row.map((text, i) => (
              <span key={i} className="inline-flex items-center">
                {text}
                <span className="mx-[18px] bg-gradient-to-br from-[var(--drift-primary)] to-[var(--drift-secondary)] bg-clip-text text-transparent select-none">
                  ✦
                </span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

function RibbonLogo({ config }: { config?: RibbonDriftLogo }) {
  const brandName = config?.brandName ?? "Avara";
  const brandAccent = config?.brandAccent ?? "UI";
  const logo = config?.logo;
  const logoDark = config?.logoDark;
  const href = config?.href ?? "#";

  return (
    <a
      href={href}
      onClick={(e) => {
        if (!href || href === "#") e.preventDefault();
      }}
      className="inline-flex items-center gap-2 rounded-lg transition-opacity hover:opacity-90 select-none"
    >
      {logo || logoDark ? (
        <>
          {logo && (
            <img
              src={logo}
              alt="Logo"
              className={`h-5 sm:h-6 w-auto object-contain ${logoDark ? "dark:hidden" : ""}`}
            />
          )}
          {logoDark && (
            <img
              src={logoDark}
              alt="Logo"
              className="h-5 sm:h-6 hidden w-auto object-contain dark:block"
            />
          )}
        </>
      ) : (
        <img
          src="/favicon/android-chrome-192x192.png"
          alt="Avara UI"
          className="size-5 rounded-md object-contain shrink-0"
        />
      )}
      <span className="text-[13px] sm:text-[14px] font-semibold tracking-tight text-foreground">
        {brandName}{" "}
        <span
          className="font-normal"
          style={{ color: "var(--drift-primary)" }}
        >
          {brandAccent}
        </span>
      </span>
    </a>
  );
}

function PromoCard({
  promo,
  rounded,
}: {
  promo: RibbonDriftPromo;
  rounded?: string | number;
}) {
  const dynamicRadius = formatRadius(rounded);
  const promoRadius = dynamicRadius
    ? `calc(${dynamicRadius} - 10px)`
    : undefined;

  const rawAvatars = promo.avatars ?? defaultPromo.avatars ?? [];
  const normalizedAvatars: StackAvatar[] = rawAvatars.map((item, idx) =>
    typeof item === "string"
      ? {
          src: item,
          alt: `User ${idx + 1}`,
          name: `User ${idx + 1}`,
        }
      : item,
  );

  const content = (
    <>
      {normalizedAvatars.length > 0 && (
        <div
          className="shrink-0 relative z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <AvatarStack
            avatars={normalizedAvatars}
            variant="shift"
            size="sm"
            max={4}
            showTooltip={true}
            ringClassName="border-[#15151c] dark:border-[#15151c]"
            className="m-0 p-0"
          />
        </div>
      )}
      <span className="flex min-w-0 flex-1 flex-col text-left">
        <span className="text-xs sm:text-sm font-semibold truncate leading-tight text-white">
          {promo.title}
        </span>
        <span className="mt-0.5 text-[11px] sm:text-[12px] text-white/75 truncate">
          {promo.body}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="grid size-9 sm:size-10 shrink-0 place-items-center rounded-full border border-white/50 bg-white/10 transition-all duration-300 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-[var(--drift-primary)] [&_svg]:size-3.5 sm:[&_svg]:size-4"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 7h10v10M7 17 17 7" />
        </svg>
      </span>
    </>
  );

  const cardClasses =
    "group absolute inset-x-2.5 sm:inset-x-3.5 bottom-2.5 sm:bottom-3.5 z-[4] flex items-center gap-2.5 sm:gap-3.5 border border-white/30 bg-[#15151c]/60 py-2.5 sm:py-3.5 pl-3 sm:pl-4 pr-2.5 sm:pr-3.5 text-white backdrop-blur-xl transition-all duration-300 hover:bg-[#15151c]/75 shadow-lg rounded-2xl";

  if (promo.href) {
    return (
      <a
        href={promo.href}
        onClick={(e) => {
          if (promo.onClick) {
            promo.onClick();
          } else if (promo.href === "#") {
            e.preventDefault();
          }
        }}
        className={cardClasses}
        style={promoRadius ? { borderRadius: promoRadius } : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      onClick={promo.onClick}
      className={cardClasses}
      style={promoRadius ? { borderRadius: promoRadius } : undefined}
    >
      {content}
    </div>
  );
}

const ribbonKeyframes = `
@keyframes ribbon-drift-bg {
  from { background-position: 0% 0%; }
  to { background-position: 100% 100%; }
}
@keyframes ribbon-drift-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
`;

export default RibbonDriftBlock;
export { RibbonDriftBlock as RibbonDriftCard };
