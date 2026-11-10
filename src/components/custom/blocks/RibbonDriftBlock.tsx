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
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
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
  /** Display variant: "default" (3D illustration hero card) or "cross-logos" (criss-crossing brand ribbons) */
  variant?: "default" | "cross-logos";
  /** Layout alias for variant */
  layout?: "default" | "cross-logos";
  /** Title text when using the cross-logos variant */
  title?: React.ReactNode;
  /** Custom background color for cross-logos variant (default: "#F8C83C") */
  bgColor?: string;
  /** Brand items for top ribbon in cross-logos variant */
  logosTop?: RibbonBrandItem[];
  /** Brand items for bottom ribbon in cross-logos variant */
  logosBottom?: RibbonBrandItem[];
  /** Crossing angle in degrees for cross-logos variant (default: 5.5) */
  angle?: number;
  /** Marquee speed in seconds for cross-logos variant (default: 48) */
  speed?: number;
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

export function RibbonDriftBlock(props: RibbonDriftProps) {
  if (props.variant === "cross-logos" || props.layout === "cross-logos") {
    const {
      variant: _variant,
      layout: _layout,
      title,
      logosTop,
      logosBottom,
      bgColor,
      speed,
      angle,
      pauseOnHover,
      rounded,
      className,
      style,
      ...rest
    } = props;
    return (
      <RibbonLogos
        title={title}
        logosTop={logosTop}
        logosBottom={logosBottom}
        color={props.color}
        bgColor={bgColor}
        speed={speed ?? props.marqueeDuration}
        angle={angle}
        pauseOnHover={pauseOnHover}
        rounded={rounded}
        className={className}
        style={style}
        {...rest}
      />
    );
  }

  const {
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
    // cross-logos-only props: keep them (and the ReactNode `title`) off the <aside>
    variant: _variant,
    layout: _layout,
    title: _title,
    className,
    style,
    ...restProps
  } = props;
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
        {...restProps}
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
@keyframes ribbon-line-draw {
  0% {
    stroke-dashoffset: 320;
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  45%, 65% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: -320;
    opacity: 0;
  }
}
`;

// ---------------------------------------------------------------------------
// CROSS RIBBON LOGOS (FRAMER RIBBON LOGOS STYLE)
// ---------------------------------------------------------------------------

export interface RibbonBrandItem {
  name: string;
  logo: React.ReactNode;
  href?: string;
}

export interface RibbonLogosProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Section heading above the crossing ribbons */
  title?: React.ReactNode;
  /** Brand items shown in the upper ribbon (tilted +angle, moving right-to-left) */
  logosTop?: RibbonBrandItem[];
  /** Brand items shown in the lower ribbon (tilted -angle, moving left-to-right) */
  logosBottom?: RibbonBrandItem[];
  /** Color theme palette for ambient drift gradient (default: "primary") */
  color?: RibbonDriftColor;
  /** Optional custom background color override (e.g. "#F8C83C" for warm yellow). Defaults to signature ambient drift background of RibbonDriftCard. */
  bgColor?: string;
  /** Background classes for ribbon tracks (default: "bg-white/60 dark:bg-[#131316]/60 backdrop-blur-md") */
  ribbonBg?: string;
  /** Border color classes for ribbon top/bottom edges (default: "border-white/70 dark:border-white/15") */
  borderColor?: string;
  /** Marquee speed in seconds (default: 48) */
  speed?: number;
  /** Ribbon slant angle in degrees (default: 5.5) */
  angle?: number;
  /** Pause marquee scrolling when hovering the card (default: true) */
  pauseOnHover?: boolean;
  /** Custom corner radius value or class */
  rounded?: string | number;
}

export function GoogleBrandIcon({ className = "size-5 shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.66-5.17 3.66-9.12z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.33 24 12 24z" />
      <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.57H1.25C.45 8.16 0 9.98 0 12c0 2.02.45 3.84 1.25 5.43l4.03-3.14z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.57l4.03 3.14c.95-2.83 3.6-4.96 6.72-4.96z" />
    </svg>
  );
}

export function MicrosoftBrandIcon({ className = "size-5 shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 21 21">
      <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
      <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
      <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
    </svg>
  );
}

export function AmazonBrandIcon({ className = "h-5 w-auto shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M13.8 12.8c0-1.7-1-2.5-2.5-2.5-1.3 0-2.2.7-2.5 1.6h5zm-7 0c0-3 2.3-4.8 4.9-4.8 3 0 4.6 1.9 4.6 5v5.3h-1.9v-1.5c-.7 1.1-1.9 1.6-3.2 1.6-2.2 0-4.4-1.4-4.4-3.9 0-2.4 1.8-3.7 4.3-3.7h3.1v-.4c0-1.5-1-2.4-2.5-2.4-1.2 0-2.2.5-2.5 1.6l-2.4-.6zm4.5 4.1c1.3 0 2.4-.8 2.4-2v-.7h-2.3c-1.4 0-2.3.7-2.3 1.7 0 1 1 1 2.2 1z"
        className="fill-black dark:fill-white"
      />
      <path
        d="M21.5 19.8c-2.8 2.1-6.8 3.2-10.4 3.2-4.9 0-9.3-1.8-12.7-4.9-.3-.2-.3-.6 0-.8.3-.2.8-.2 1.1.1 3.1 2.8 7.2 4.4 11.6 4.4 3.3 0 6.9-1 9.4-2.8.4-.3.9 0 1 .4.1.3-.1.6 0 .4z"
        fill="#FF9900"
      />
      <path
        d="M22.3 18.2c-.4-.5-2.4-.2-3.6.2-.3.1-.4-.2-.1-.4 1.7-1.1 3.8-.8 4.2-.3.4.5-.1 2.6-1.7 3.9-.3.2-.5.1-.4-.2.4-1.1 1.9-2.7 1.6-3.4z"
        fill="#FF9900"
      />
    </svg>
  );
}

export function SpotifyBrandIcon({ className = "size-5 shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="12" fill="#1DB954" />
      <path
        d="M17.9 16.35c-.23.38-.72.5-1.1.26-3.02-1.85-6.83-2.27-11.3-1.25-.43.1-.86-.17-.96-.6-.1-.43.17-.86.6-.96 4.9-1.12 9.1-.64 12.5 1.45.38.23.5.72.26 1.1zm1.5-3.33c-.3.47-.92.62-1.39.33-3.46-2.13-8.73-2.75-12.82-1.51-.53.16-1.1-.14-1.25-.67-.16-.53.14-1.1.67-1.25 4.67-1.42 10.48-.73 14.46 1.71.47.3.62.92.33 1.39zm.13-3.48C15.38 7.08 8.56 6.85 4.64 8.04c-.63.19-1.3-.17-1.49-.8-.19-.63.17-1.3.8-1.49 4.5-1.37 12.04-1.1 16.29 1.43.57.34.76 1.08.42 1.65-.34.57-1.08.76-1.65.42z"
        fill="#000000"
      />
    </svg>
  );
}

export function AppleBrandIcon({ className = "size-5 shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.98.6-2.61 1.34-.56.64-1.04 1.7-0.91 2.73 1 .08 2.03-.51 2.59-1.22z"
        className="fill-black dark:fill-white"
      />
    </svg>
  );
}

export function NikeBrandIcon({ className = "h-4 w-7 shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        d="M21.71 5.29c-.29-.29-.74-.33-1.07-.1L6.87 14.54c-1.22.86-2.87.53-3.68-.75-.65-1.02-.51-2.35.34-3.23.32-.33.31-.85-.01-1.17-.33-.32-.86-.31-1.18.01-1.22 1.25-1.42 3.14-.5 4.6 1.16 1.83 3.52 2.31 5.26 1.08L21.85 6.22c.36-.25.45-.75.2-1.11l-.34-.32z"
        className="fill-black dark:fill-white"
      />
    </svg>
  );
}

export function TeslaBrandIcon({ className = "size-5 shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        d="M12 4.5c2.4 0 4.6.6 6.5 1.6l.8-2C16.8 2.9 14.5 2.4 12 2.4S7.2 2.9 4.7 4.1l.8 2c1.9-1 4.1-1.6 6.5-1.6zm8.8 3.3c-.2 0-.4.1-.5.3-.8 1.5-2.2 2.5-3.8 2.9l.6 1.8c2.2-.6 4-2 5-3.9.2-.4 0-.8-.4-.9-.3-.1-.6-.2-.9-.2zM3.2 7.8c-.3 0-.6.1-.9.2-.4.1-.6.5-.4.9 1 1.9 2.8 3.3 5 3.9l.6-1.8c-1.6-.4-3-1.4-3.8-2.9-.1-.2-.3-.3-.5-.3zm7.8 4.2v8.5h2V12c2.1 0 4-.8 5.5-2.1l-1.2-1.5c-1.2 1-2.7 1.6-4.3 1.6s-3.1-.6-4.3-1.6L7.5 9.9c1.5 1.3 3.4 2.1 5.5 2.1z"
        className="fill-black dark:fill-white"
      />
    </svg>
  );
}

export function NetflixBrandIcon({ className = "h-5 w-auto shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M5.5 1h3.3v22H5.5V1z" fill="#E50914" />
      <path d="M15.2 1h3.3v22h-3.3V1z" fill="#E50914" />
      <path d="M5.5 1h3.3l6.4 22h-3.3L5.5 1z" fill="#B81D24" />
    </svg>
  );
}

export function AirbnbBrandIcon({ className = "size-5 shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#FF5A5F">
      <path d="M12 0c-4.4 0-8 3.5-8 7.8 0 4.6 3.3 9.4 7.6 15.7.2.3.6.5.9.5.3 0 .7-.2.9-.5 4.3-6.3 7.6-11.1 7.6-15.7 0-4.3-3.6-7.8-8-7.8zm0 21.6C8.5 16.5 5.8 12.3 5.8 7.8c0-3.3 2.8-6 6.2-6s6.2 2.7 6.2 6c0 4.5-2.7 8.7-6.2 13.8zm0-15.9c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5-1.6-3.5-3.5-3.5zm0 5.2c-.9 0-1.7-.8-1.7-1.7s.8-1.7 1.7-1.7 1.7.8 1.7 1.7-.8 1.7-1.7 1.7z" />
    </svg>
  );
}

export function UberBrandIcon({ className = "shrink-0" }: { className?: string }) {
  return (
    <span className={cn("text-xs font-semibold text-black/70 dark:text-white/70 lowercase tracking-tight", className)}>
      Uber
    </span>
  );
}

export function MetaBrandIcon({ className = "size-5 shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#0081FB">
      <path d="M12 10.15c-1.43-2.14-3.1-3.65-5.18-3.65C3.07 6.5 0 9.4 0 13.5c0 4.09 3.07 6.99 6.82 6.99 2.5 0 4.34-1.39 5.18-2.65.84 1.26 2.68 2.65 5.18 2.65 3.75 0 6.82-2.9 6.82-6.99 0-4.1-3.07-7-6.82-7-2.08 0-3.75 1.51-5.18 3.65zm0 4.19c-.87 1.67-2.31 3.4-4.7 3.4-2.15 0-3.92-1.69-3.92-4.24 0-2.56 1.77-4.24 3.92-4.24 2.21 0 3.72 1.63 4.7 3.4v1.68zm5.18 3.4c-2.39 0-3.83-1.73-4.7-3.4v-1.68c.98-1.77 2.49-3.4 4.7-3.4 2.15 0 3.92 1.68 3.92 4.24 0 2.55-1.77 4.24-3.92 4.24z"/>
    </svg>
  );
}

export const defaultRibbonLogosTop: RibbonBrandItem[] = [
  { name: "AMAZON", logo: <AmazonBrandIcon /> },
  { name: "GOOGLE", logo: <GoogleBrandIcon /> },
  { name: "MICROSOFT", logo: <MicrosoftBrandIcon /> },
  { name: "SPOTIFY", logo: <SpotifyBrandIcon /> },
  { name: "NIKE", logo: <NikeBrandIcon /> },
  { name: "APPLE", logo: <AppleBrandIcon /> },
];

export const defaultRibbonLogosBottom: RibbonBrandItem[] = [
  { name: "TESLA", logo: <TeslaBrandIcon /> },
  { name: "NETFLIX", logo: <NetflixBrandIcon /> },
  { name: "AIRBNB", logo: <AirbnbBrandIcon /> },
  { name: "UBER", logo: <UberBrandIcon /> },
  { name: "META", logo: <MetaBrandIcon /> },
  { name: "SPOTIFY", logo: <SpotifyBrandIcon /> },
  { name: "TESLA", logo: <TeslaBrandIcon /> },
];

export function RibbonLogos({
  title = "Trusted by leading brands worldwide",
  logosTop = defaultRibbonLogosTop,
  logosBottom = defaultRibbonLogosBottom,
  color = "primary",
  bgColor,
  ribbonBg = "bg-white/60 dark:bg-[#131316]/60 backdrop-blur-md",
  borderColor = "border-white/70 dark:border-white/15",
  speed = 48,
  angle = 5.5,
  pauseOnHover = true,
  rounded,
  className,
  style,
  ...props
}: RibbonLogosProps) {
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

  const topRow = [...logosTop, ...logosTop, ...logosTop, ...logosTop];
  const bottomRow = [...logosBottom, ...logosBottom, ...logosBottom, ...logosBottom];

  const hasCustomBg = Boolean(bgColor);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ribbonKeyframes }} />
      <div
        className={cn(
          "group/ribbon relative isolate w-full overflow-hidden py-14 sm:py-20 flex flex-col items-center justify-center select-none rounded-3xl",
          !hasCustomBg && "bg-[#d8d8de] dark:bg-[#0d0d10] border border-black/5 dark:border-white/5",
          typeof rounded === "string" && !dynamicRadius ? rounded : "",
          className
        )}
        style={{
          ...(hasCustomBg ? { backgroundColor: bgColor } : {}),
          ...cardRadiusStyle,
          ...dynamicAccent,
          ...style,
          ["--drift-primary" as string]: themeVars.primary,
          ["--drift-secondary" as string]: themeVars.secondary,
        }}
        {...props}
      >
        {/* Animated ambient gradient drift background (or soft radial glow if custom bgColor passed) */}
        {!hasCustomBg ? (
          <div
            aria-hidden="true"
            className="absolute inset-0 animate-[ribbon-drift-bg_24s_ease-in-out_infinite_alternate] bg-[length:140%_140%] bg-[radial-gradient(70%_55%_at_15%_20%,color-mix(in_oklab,var(--drift-primary)_70%,transparent),transparent_70%),radial-gradient(65%_55%_at_90%_85%,color-mix(in_oklab,var(--drift-secondary)_75%,transparent),transparent_70%),linear-gradient(160deg,#f6f6f9,#b4b4c2_40%,#fff_60%,#73738a)] motion-reduce:animate-none dark:bg-[radial-gradient(70%_55%_at_15%_20%,color-mix(in_oklab,var(--drift-primary)_35%,transparent),transparent_70%),radial-gradient(65%_55%_at_90%_85%,color-mix(in_oklab,var(--drift-secondary)_28%,transparent),transparent_70%),linear-gradient(160deg,#34343f,#0b0b0f_40%,#5a5a6c_60%,#040406)] pointer-events-none"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(255,255,255,0.4),transparent_75%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(255,255,255,0.08),transparent_75%)] pointer-events-none"
          />
        )}

        {/* Section Heading with Animated Underline */}
        {title && (
          <div className="relative z-30 mb-8 sm:mb-12 px-4 flex flex-col items-center text-center">
            <h2 className="font-extrabold tracking-tight text-[#1b1b22] dark:text-[#ececf1] text-2xl sm:text-3xl md:text-4xl max-w-2xl leading-[1.18]">
              {title}
            </h2>
            {/* Animated drawing line underneath */}
            <svg
              className="w-48 sm:w-64 md:w-80 h-3 sm:h-4 mt-1.5 overflow-visible select-none pointer-events-none"
              viewBox="0 0 280 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="ribbonLineDrawGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--drift-primary, #6366f1)" stopOpacity="0.25" />
                  <stop offset="50%" stopColor="var(--drift-primary, #6366f1)" stopOpacity="1" />
                  <stop offset="100%" stopColor="var(--drift-secondary, #a855f7)" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <path
                d="M4 10C60 3 170 2 276 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-black/10 dark:text-white/10"
              />
              <path
                d="M4 10C60 3 170 2 276 8"
                stroke="url(#ribbonLineDrawGrad)"
                strokeWidth="2.75"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 320,
                  animation: "ribbon-line-draw 3.5s ease-in-out infinite",
                }}
              />
            </svg>
          </div>
        )}

        {/* Crossing Ribbons Marquee Area */}
        <div className="relative w-full h-[180px] sm:h-[210px] md:h-[230px] flex items-center justify-center">
          {/* Top-left to bottom-right Ribbon (Angle +angle) */}
          <div
            className={cn(
              "pointer-events-none absolute w-[160%] -left-[30%] sm:w-[140%] sm:-left-[20%] z-10 border-y py-2.5 sm:py-3 flex items-center overflow-hidden",
              ribbonBg,
              borderColor
            )}
            style={{
              transform: `rotate(${angle}deg)`,
            }}
          >
            <div
              style={{ animationDuration: `${speed}s` }}
              className={cn(
                "flex w-max animate-[ribbon-drift-marquee_48s_linear_infinite] motion-reduce:animate-none",
                pauseOnHover && "group-hover/ribbon:[animation-play-state:paused]"
              )}
            >
              {[0, 1].map((half) => (
                <span key={half} className="flex shrink-0 items-center" aria-hidden={half === 1}>
                  {topRow.map((brand, i) => (
                    <div
                      key={i}
                      className="inline-flex items-center gap-2.5 sm:gap-3 shrink-0 mx-6 sm:mx-8 md:mx-10"
                    >
                      {brand.logo}
                      <span className="font-semibold uppercase tracking-wider text-[#1b1b22] dark:text-[#ececf1] text-xs sm:text-sm whitespace-nowrap">
                        {brand.name}
                      </span>
                    </div>
                  ))}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom-left to top-right Ribbon (Angle -angle, z-20 with frosted glass so it blurs ribbon 1 beneath) */}
          <div
            className={cn(
              "pointer-events-none absolute w-[160%] -left-[30%] sm:w-[140%] sm:-left-[20%] z-20 border-y py-2.5 sm:py-3 flex items-center overflow-hidden",
              ribbonBg,
              borderColor
            )}
            style={{
              transform: `rotate(-${angle}deg)`,
            }}
          >
            <div
              style={{ animationDuration: `${speed}s` }}
              className={cn(
                "flex w-max animate-[ribbon-drift-marquee_48s_linear_infinite] motion-reduce:animate-none [animation-direction:reverse]",
                pauseOnHover && "group-hover/ribbon:[animation-play-state:paused]"
              )}
            >
              {[0, 1].map((half) => (
                <span key={half} className="flex shrink-0 items-center" aria-hidden={half === 1}>
                  {bottomRow.map((brand, i) => (
                    <div
                      key={i}
                      className="inline-flex items-center gap-2.5 sm:gap-3 shrink-0 mx-6 sm:mx-8 md:mx-10"
                    >
                      {brand.logo}
                      <span className="font-semibold uppercase tracking-wider text-[#1b1b22] dark:text-[#ececf1] text-xs sm:text-sm whitespace-nowrap">
                        {brand.name}
                      </span>
                    </div>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RibbonDriftBlock;
export {
  RibbonDriftBlock as RibbonDriftCard,
  RibbonLogos as CrossRibbonLogos,
};

