"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface LiquidGlassSvgFilterProps {
  id?: string;
  baseFrequency?: string;
  scale?: number;
  bgImage?: string;
}

export function LiquidGlassSvgFilter({
  id = "glass-blur-ai",
  baseFrequency = "0.003 0.007",
  scale = 200,
  bgImage = "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
}: LiquidGlassSvgFilterProps) {
  return (
    <>
      {bgImage && (
        <img
          src={bgImage}
          alt=""
          aria-hidden="true"
          style={{
            position: "fixed",
            top: "-9999px",
            left: "-9999px",
            width: "1px",
            height: "1px",
            opacity: 0,
            pointerEvents: "none",
          }}
        />
      )}
      <svg
        style={{
          position: "fixed",
          top: "-9999px",
          left: "-9999px",
          width: 0,
          height: 0,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <defs>
          <filter
            id={id}
            x="0"
            y="0"
            width="100%"
            height="100%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency={baseFrequency}
              numOctaves="1"
              result="turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale={scale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}

export function formatRadius(radius?: string | number | boolean): string | undefined {
  if (radius === undefined || radius === null) return undefined;
  if (radius === false || radius === 0 || radius === "0" || radius === "0px") return "0px";
  if (typeof radius === "number") return `${radius}px`;
  if (typeof radius === "string") {
    if (radius.endsWith("px") || radius.endsWith("rem") || radius.endsWith("em") || radius.endsWith("%")) {
      return radius;
    }
    const parsed = parseFloat(radius);
    if (!isNaN(parsed)) {
      return `${parsed}px`;
    }
  }
  return undefined;
}

export interface LiquidGlassBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
  /**
   * Dynamic rounding radius. Can be a number (in px), a CSS length string ("16px", "1.5rem"),
   * or omitted to inherit the border-radius set on the parent/wrapper component.
   */
  radius?: string | number | boolean;
  bgImage?: string;
  filterId?: string;
  showSpecularHighlight?: boolean;
  contrastOverlayClassName?: string;
  bgPosition?: string;
  showOuterShadow?: boolean;
  shadowStyle?: React.CSSProperties;
}

export function LiquidGlassBackground({
  className,
  style,
  radius,
  bgImage = "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  filterId = "glass-blur-ai",
  showSpecularHighlight = true,
  contrastOverlayClassName = "bg-black/30 dark:bg-black/45 backdrop-blur-[2px]",
  bgPosition = "center",
  showOuterShadow = true,
  shadowStyle,
}: LiquidGlassBackgroundProps) {
  const formattedRadius = formatRadius(radius);

  const bgStyle: React.CSSProperties = {
    ...(formattedRadius ? { borderRadius: formattedRadius } : {}),
    ...style,
  };

  return (
    <div
      style={bgStyle}
      className={cn(
        "absolute inset-0 pointer-events-none z-0 rounded-[inherit] overflow-hidden isolate [contain:paint] [transform:translateZ(0)]",
        className
      )}
    >
      {/* Inner Clipping Container for Liquid Background Stack */}
      <div
        className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none z-0 [mask-image:linear-gradient(white,white)] [-webkit-mask-image:-webkit-radial-gradient(white,black)]"
        style={formattedRadius ? { borderRadius: formattedRadius } : undefined}
      >
        {/* Layer 0: Liquid SVG Displaced Wave Background */}
        <div
          className="absolute -inset-10"
          style={{
            backgroundImage: `url("${bgImage}")`,
            backgroundSize: "cover",
            backgroundPosition: bgPosition,
            filter: `url(#${filterId})`,
            transform: "scale(1.1)",
          }}
        />

        {/* Layer 1: Contrast overlay & soft backdrop blur */}
        <div className={cn("absolute inset-0", contrastOverlayClassName)} />

        {/* Layer 2: Ambient Drop Shadow & Subtle Glow */}
        {showOuterShadow && (
          <div
            className="absolute inset-0 rounded-[inherit]"
            style={{
              boxShadow:
                "0 0 40px rgba(0, 0, 0, 0.35), 0 0 20px rgba(255, 255, 255, 0.08)",
              ...(formattedRadius ? { borderRadius: formattedRadius } : {}),
              ...shadowStyle,
            }}
          />
        )}
      </div>

      {/* Layer 3: Specular Inner Border Highlight */}
      {showSpecularHighlight && (
        <div
          className="absolute inset-0 z-40 pointer-events-none rounded-[inherit] border border-white/40 dark:border-white/15"
          style={{
            boxShadow:
              "inset 2px 2px 2px 0 rgba(255, 255, 255, 0.45), inset -2px -2px 2px 0 rgba(255, 255, 255, 0.3)",
            ...(formattedRadius ? { borderRadius: formattedRadius } : {}),
          }}
        />
      )}
    </div>
  );
}

export interface LiquidGlassWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  radius?: string | number | boolean;
  bgImage?: string;
  filterId?: string;
  showSpecularHighlight?: boolean;
  contrastOverlayClassName?: string;
  bgPosition?: string;
  showOuterShadow?: boolean;
  shadowStyle?: React.CSSProperties;
}

export const LiquidGlassWrapper = React.forwardRef<
  HTMLDivElement,
  LiquidGlassWrapperProps
>(
  (
    {
      children,
      className,
      style,
      radius,
      bgImage,
      filterId,
      showSpecularHighlight = true,
      contrastOverlayClassName,
      bgPosition,
      showOuterShadow,
      shadowStyle,
      ...props
    },
    ref
  ) => {
    const formattedRadius = formatRadius(radius);

    const wrapperStyle: React.CSSProperties = {
      ...(formattedRadius ? { borderRadius: formattedRadius } : {}),
      ...style,
    };

    return (
      <div
        ref={ref}
        style={wrapperStyle}
        className={cn(
          "relative overflow-hidden isolate [contain:paint] [transform:translateZ(0)]",
          className
        )}
        {...props}
      >
        <LiquidGlassBackground
          radius={radius}
          bgImage={bgImage}
          filterId={filterId}
          showSpecularHighlight={showSpecularHighlight}
          contrastOverlayClassName={contrastOverlayClassName}
          bgPosition={bgPosition}
          showOuterShadow={showOuterShadow}
          shadowStyle={shadowStyle}
        />
        <div
          className="relative z-10 w-full h-full flex flex-col rounded-[inherit]"
          style={formattedRadius ? { borderRadius: formattedRadius } : undefined}
        >
          {children}
        </div>
      </div>
    );
  }
);

LiquidGlassWrapper.displayName = "LiquidGlassWrapper";
