"use client";

import { cn } from "@/lib/utils";
import React from "react";
import {
  accentStyle,
  isDefaultAccent,
  resolveAccent,
} from "@/lib/accent";
import { AvatarStack, type StackAvatar } from "./AvatarStackBlock";

export type RibbonDriftColor =
  | "primary"
  | "indigo"
  | "rose"
  | "emerald"
  | "lavender"
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
  logo?: React.ReactNode | string;
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
  /** Brand logo (image URL string or custom ReactNode / SVG). Defaults to self-contained vector Avara icon */
  logo?: React.ReactNode | string;
  /** Dark mode brand logo image URL */
  logoDark?: string;
  /** Link URL for the brand logo */
  logoHref?: string;
  /** Brand name text (default: "Avara") */
  brandName?: string;
  /** Brand accent text (default: "UI") */
  brandAccent?: string;
  /** Logo configuration when not using individual props or a custom badge node */
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
  lavender: { primary: "#9b8afb", secondary: "#c4b5fd" },
  amber: { primary: "#f59e0b", secondary: "#fbbf24" },
  violet: { primary: "#8b5cf6", secondary: "#c084fc" },
  zinc: { primary: "#71717a", secondary: "#a1a1aa" },
};

const fallbackProfiles = [
  { name: "Ana Watson", designation: "Founder & CEO" },
  { name: "Tom Hardy", designation: "Co-Founder & CTO" },
  { name: "Mara Jade", designation: "Managing Director" },
  { name: "Sarah Miller", designation: "Product Lead" },
  { name: "David Chen", designation: "Design Lead" },
  { name: "Elena Rostova", designation: "Talent Acquisition" },
];

export function RibbonDriftBlock({
  image = defaultImage,
  imageAlt = "Feature illustration",
  badge,
  logo,
  logoDark,
  logoHref,
  brandName,
  brandAccent,
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
  const effectiveLogo = logo !== undefined ? logo : logoConfig?.logo;
  const effectiveLogoDark =
    logoDark !== undefined ? logoDark : logoConfig?.logoDark;
  const effectiveHref =
    logoHref !== undefined ? logoHref : (logoConfig?.href ?? "#");
  const effectiveBrandName =
    brandName !== undefined ? brandName : (logoConfig?.brandName ?? "Avara");
  const effectiveBrandAccent =
    brandAccent !== undefined ? brandAccent : (logoConfig?.brandAccent ?? "UI");

  const dynamicRadius = formatRadius(rounded);
  const cardRadiusStyle: React.CSSProperties = dynamicRadius
    ? { borderRadius: dynamicRadius }
    : {};

  const isDefault = isDefaultAccent(color);
  const resolvedHex = !isDefault
    ? resolveAccent(color) ?? (color.startsWith("#") ? color : colorMap[color]?.primary)
    : null;
  const dynamicAccent = accentStyle(color);

  const themeVars = isDefault
    ? colorMap.primary
    : {
        primary: resolvedHex || color,
        secondary:
          colorMap[color]?.secondary ||
          `color-mix(in oklab, ${resolvedHex || color} 70%, white)`,
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
          ...dynamicAccent,
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
            <RibbonLogo
              logo={effectiveLogo}
              logoDark={effectiveLogoDark}
              href={effectiveHref}
              brandName={effectiveBrandName}
              brandAccent={effectiveBrandAccent}
            />
          )}
        </div>

        {/* Bottom Floating Promo Card (Layer z-4) */}
        {promo && (
          <PromoCard
            promo={promo}
            rounded={rounded}
            tooltipStyle={dynamicAccent}
          />
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

/**
 * Self-contained vector SVG logo icon for Avara UI.
 * Embedded directly to prevent broken / missing asset errors when consumers install the component.
 */
export function DefaultBrandIcon({
  className = "size-5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 810 810"
      className={cn("size-5 rounded-[5px] shrink-0", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="810"
        height="810"
        rx="160"
        fill="var(--drift-primary, #6366f1)"
      />
      <g
        fill="#000000"
        fillOpacity={0.35}
        transform="translate(168.704335, 726.778189)"
      >
        <path d="M 67.21875 -12.15625 L 67.21875 -26.25 C 67.21875 -34.351562 63.164062 -38.40625 55.0625 -38.40625 L 40.96875 -38.40625 C 32.863281 -38.40625 28.8125 -42.460938 28.8125 -50.578125 L 28.8125 -160.6875 C 28.8125 -168.789062 32.863281 -172.84375 40.96875 -172.84375 L 189.5 -172.84375 C 197.601562 -172.84375 201.65625 -168.789062 201.65625 -160.6875 L 201.65625 -50.578125 C 201.65625 -42.460938 205.710938 -38.40625 213.828125 -38.40625 L 227.90625 -38.40625 C 236.019531 -38.40625 240.078125 -42.460938 240.078125 -50.578125 L 240.078125 -64.65625 C 240.078125 -72.769531 244.128906 -76.828125 252.234375 -76.828125 L 273.359375 -76.828125 C 281.472656 -76.828125 285.53125 -80.878906 285.53125 -88.984375 L 285.53125 -241.34375 C 285.53125 -249.457031 281.472656 -253.515625 273.359375 -253.515625 L 259.28125 -253.515625 C 251.164062 -253.515625 247.109375 -257.566406 247.109375 -265.671875 L 247.109375 -279.765625 C 247.109375 -287.867188 243.054688 -291.921875 234.953125 -291.921875 L 124.84375 -291.921875 C 116.726562 -291.921875 112.671875 -295.976562 112.671875 -304.09375 L 112.671875 -318.171875 C 112.671875 -326.285156 108.617188 -330.34375 100.515625 -330.34375 L 86.421875 -330.34375 C 78.316406 -330.34375 74.265625 -334.394531 74.265625 -342.5 L 74.265625 -355.9375 C 74.265625 -364.476562 69.992188 -368.75 61.453125 -368.75 L 48.65625 -368.75 C 40.113281 -368.75 35.84375 -373.015625 35.84375 -381.546875 L 35.84375 -509.59375 C 35.84375 -518.113281 40.113281 -522.375 48.65625 -522.375 L 61.453125 -522.375 C 69.992188 -522.375 74.265625 -526.644531 74.265625 -535.1875 L 74.265625 -548.625 C 74.265625 -556.726562 78.316406 -560.78125 86.421875 -560.78125 L 100.515625 -560.78125 C 108.617188 -560.78125 112.671875 -564.835938 112.671875 -572.953125 L 112.671875 -587.03125 C 112.671875 -595.144531 116.726562 -599.203125 124.84375 -599.203125 L 362.984375 -599.203125 C 371.097656 -599.203125 375.15625 -595.144531 375.15625 -587.03125 L 375.15625 -572.953125 C 375.15625 -564.835938 379.207031 -560.78125 387.3125 -560.78125 L 433.40625 -560.78125 C 441.519531 -560.78125 445.578125 -556.726562 445.578125 -548.625 L 445.578125 -438.53125 C 445.578125 -430.414062 441.519531 -426.359375 433.40625 -426.359375 L 336.09375 -426.359375 C 327.988281 -426.359375 323.9375 -430.414062 323.9375 -438.53125 L 323.9375 -452.609375 C 323.9375 -460.722656 319.878906 -464.78125 311.765625 -464.78125 L 297.6875 -464.78125 C 289.582031 -464.78125 285.53125 -468.832031 285.53125 -476.9375 L 285.53125 -548.625 C 285.53125 -556.726562 281.472656 -560.78125 273.359375 -560.78125 L 259.28125 -560.78125 C 251.164062 -560.78125 247.109375 -556.726562 247.109375 -548.625 L 247.109375 -534.546875 C 247.109375 -526.429688 243.054688 -522.375 234.953125 -522.375 L 220.859375 -522.375 C 212.753906 -522.375 208.703125 -518.328125 208.703125 -510.234375 L 208.703125 -380.90625 C 208.703125 -372.800781 212.753906 -368.75 220.859375 -368.75 L 241.34375 -368.75 C 249.457031 -368.75 253.515625 -364.691406 253.515625 -356.578125 L 253.515625 -342.5 C 253.515625 -334.394531 257.566406 -330.34375 265.671875 -330.34375 L 369.390625 -330.34375 C 377.492188 -330.34375 381.546875 -326.285156 381.546875 -318.171875 L 381.546875 -304.09375 C 381.546875 -295.976562 385.601562 -291.921875 393.71875 -291.921875 L 407.796875 -291.921875 C 415.910156 -291.921875 419.96875 -287.867188 419.96875 -279.765625 L 419.96875 -266.3125 C 419.96875 -257.78125 424.234375 -253.515625 432.765625 -253.515625 L 445.578125 -253.515625 C 454.109375 -253.515625 458.375 -249.242188 458.375 -240.703125 L 458.375 -89.625 C 458.375 -81.09375 454.109375 -76.828125 445.578125 -76.828125 L 432.765625 -76.828125 C 424.234375 -76.828125 419.96875 -72.554688 419.96875 -64.015625 L 419.96875 -50.578125 C 419.96875 -42.460938 415.910156 -38.40625 407.796875 -38.40625 L 393.71875 -38.40625 C 385.601562 -38.40625 381.546875 -34.351562 381.546875 -26.25 L 381.546875 -12.15625 C 381.546875 -4.050781 377.707031 0 370.03125 0 L 78.75 0 C 71.0625 0 67.21875 -4.050781 67.21875 -12.15625 Z" />
      </g>
      <g
        fill="#ffffff"
        transform="translate(158.204336, 714.699315)"
      >
        <path d="M 67.21875 -12.15625 L 67.21875 -26.25 C 67.21875 -34.351562 63.164062 -38.40625 55.0625 -38.40625 L 40.96875 -38.40625 C 32.863281 -38.40625 28.8125 -42.460938 28.8125 -50.578125 L 28.8125 -160.6875 C 28.8125 -168.789062 32.863281 -172.84375 40.96875 -172.84375 L 189.5 -172.84375 C 197.601562 -172.84375 201.65625 -168.789062 201.65625 -160.6875 L 201.65625 -50.578125 C 201.65625 -42.460938 205.710938 -38.40625 213.828125 -38.40625 L 227.90625 -38.40625 C 236.019531 -38.40625 240.078125 -42.460938 240.078125 -50.578125 L 240.078125 -64.65625 C 240.078125 -72.769531 244.128906 -76.828125 252.234375 -76.828125 L 273.359375 -76.828125 C 281.472656 -76.828125 285.53125 -80.878906 285.53125 -88.984375 L 285.53125 -241.34375 C 285.53125 -249.457031 281.472656 -253.515625 273.359375 -253.515625 L 259.28125 -253.515625 C 251.164062 -253.515625 247.109375 -257.566406 247.109375 -265.671875 L 247.109375 -279.765625 C 247.109375 -287.867188 243.054688 -291.921875 234.953125 -291.921875 L 124.84375 -291.921875 C 116.726562 -291.921875 112.671875 -295.976562 112.671875 -304.09375 L 112.671875 -318.171875 C 112.671875 -326.285156 108.617188 -330.34375 100.515625 -330.34375 L 86.421875 -330.34375 C 78.316406 -330.34375 74.265625 -334.394531 74.265625 -342.5 L 74.265625 -355.9375 C 74.265625 -364.476562 69.992188 -368.75 61.453125 -368.75 L 48.65625 -368.75 C 40.113281 -368.75 35.84375 -373.015625 35.84375 -381.546875 L 35.84375 -509.59375 C 35.84375 -518.113281 40.113281 -522.375 48.65625 -522.375 L 61.453125 -522.375 C 69.992188 -522.375 74.265625 -526.644531 74.265625 -535.1875 L 74.265625 -548.625 C 74.265625 -556.726562 78.316406 -560.78125 86.421875 -560.78125 L 100.515625 -560.78125 C 108.617188 -560.78125 112.671875 -564.835938 112.671875 -572.953125 L 112.671875 -587.03125 C 112.671875 -595.144531 116.726562 -599.203125 124.84375 -599.203125 L 362.984375 -599.203125 C 371.097656 -599.203125 375.15625 -595.144531 375.15625 -587.03125 L 375.15625 -572.953125 C 375.15625 -564.835938 379.207031 -560.78125 387.3125 -560.78125 L 433.40625 -560.78125 C 441.519531 -560.78125 445.578125 -556.726562 445.578125 -548.625 L 445.578125 -438.53125 C 445.578125 -430.414062 441.519531 -426.359375 433.40625 -426.359375 L 336.09375 -426.359375 C 327.988281 -426.359375 323.9375 -430.414062 323.9375 -438.53125 L 323.9375 -452.609375 C 323.9375 -460.722656 319.878906 -464.78125 311.765625 -464.78125 L 297.6875 -464.78125 C 289.582031 -464.78125 285.53125 -468.832031 285.53125 -476.9375 L 285.53125 -548.625 C 285.53125 -556.726562 281.472656 -560.78125 273.359375 -560.78125 L 259.28125 -560.78125 C 251.164062 -560.78125 247.109375 -556.726562 247.109375 -548.625 L 247.109375 -534.546875 C 247.109375 -526.429688 243.054688 -522.375 234.953125 -522.375 L 220.859375 -522.375 C 212.753906 -522.375 208.703125 -518.328125 208.703125 -510.234375 L 208.703125 -380.90625 C 208.703125 -372.800781 212.753906 -368.75 220.859375 -368.75 L 241.34375 -368.75 C 249.457031 -368.75 253.515625 -364.691406 253.515625 -356.578125 L 253.515625 -342.5 C 253.515625 -334.394531 257.566406 -330.34375 265.671875 -330.34375 L 369.390625 -330.34375 C 377.492188 -330.34375 381.546875 -326.285156 381.546875 -318.171875 L 381.546875 -304.09375 C 381.546875 -295.976562 385.601562 -291.921875 393.71875 -291.921875 L 407.796875 -291.921875 C 415.910156 -291.921875 419.96875 -287.867188 419.96875 -279.765625 L 419.96875 -266.3125 C 419.96875 -257.78125 424.234375 -253.515625 432.765625 -253.515625 L 445.578125 -253.515625 C 454.109375 -253.515625 458.375 -249.242188 458.375 -240.703125 L 458.375 -89.625 C 458.375 -81.09375 454.109375 -76.828125 445.578125 -76.828125 L 432.765625 -76.828125 C 424.234375 -76.828125 419.96875 -72.554688 419.96875 -64.015625 L 419.96875 -50.578125 C 419.96875 -42.460938 415.910156 -38.40625 407.796875 -38.40625 L 393.71875 -38.40625 C 385.601562 -38.40625 381.546875 -34.351562 381.546875 -26.25 L 381.546875 -12.15625 C 381.546875 -4.050781 377.707031 0 370.03125 0 L 78.75 0 C 71.0625 0 67.21875 -4.050781 67.21875 -12.15625 Z" />
      </g>
    </svg>
  );
}

function RibbonLogo({
  logo,
  logoDark,
  href = "#",
  brandName = "Avara",
  brandAccent = "UI",
}: {
  logo?: React.ReactNode | string;
  logoDark?: string;
  href?: string;
  brandName?: string;
  brandAccent?: string;
}) {
  const renderedLogo = logo ? (
    typeof logo === "string" ? (
      <>
        <img
          src={logo}
          alt={brandName || "Logo"}
          className={cn(
            "h-5 sm:h-6 w-auto object-contain",
            logoDark ? "dark:hidden" : ""
          )}
        />
        {logoDark && (
          <img
            src={logoDark}
            alt={brandName || "Logo"}
            className="h-5 sm:h-6 hidden w-auto object-contain dark:block"
          />
        )}
      </>
    ) : (
      <div className="inline-flex items-center shrink-0">{logo}</div>
    )
  ) : (
    <DefaultBrandIcon className="size-5 rounded-md shrink-0" />
  );

  return (
    <a
      href={href}
      onClick={(e) => {
        if (!href || href === "#") e.preventDefault();
      }}
      className="inline-flex items-center gap-2 rounded-lg transition-opacity hover:opacity-90 select-none"
    >
      {renderedLogo}
      {(brandName || brandAccent) && (
        <span className="text-[13px] sm:text-[14px] font-semibold tracking-tight text-foreground">
          {brandName}
          {brandAccent && (
            <>
              {" "}
              <span
                className="font-normal"
                style={{ color: "var(--drift-primary)" }}
              >
                {brandAccent}
              </span>
            </>
          )}
        </span>
      )}
    </a>
  );
}

function PromoCard({
  promo,
  rounded,
  tooltipStyle,
}: {
  promo: RibbonDriftPromo;
  rounded?: string | number;
  tooltipStyle?: React.CSSProperties;
}) {
  const dynamicRadius = formatRadius(rounded);
  const promoRadius = dynamicRadius
    ? `calc(${dynamicRadius} - 10px)`
    : undefined;

  const rawAvatars = promo.avatars ?? defaultPromo.avatars ?? [];
  const normalizedAvatars: StackAvatar[] = rawAvatars.map((item, idx) => {
    if (typeof item === "string") {
      const profile = fallbackProfiles[idx % fallbackProfiles.length];
      return {
        src: item,
        alt: profile.name,
        name: profile.name,
        designation: profile.designation,
      };
    }
    return item;
  });

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
            tooltipStyle={tooltipStyle}
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
