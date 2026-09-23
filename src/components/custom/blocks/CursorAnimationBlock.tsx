"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  MousePointer,
  Target,
  Zap,
  Eye,
  Maximize2,
  Minimize2,
  Crosshair,
  CircleDot,
  Radio,
  Image as ImageIcon,
} from "lucide-react";

export type CursorVariant =
  | "magnetic"
  | "glow"
  | "trail"
  | "badge"
  | "spotlight"
  | "expand"
  | "crosshair"
  | "ring"
  | "pulse"
  | "sonar"
  | "image-trail";

export type CursorColor = "indigo" | "rose" | "emerald" | "zinc" | "primary" | (string & {});

const defaultTrailImages = [
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_300,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_300,c_limit/v1790148864/photo-1511884642898-4c92249e20b6-1790148865110.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_300,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_300,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_300,c_limit/v1790146210/photo-1472214103451-9374bd1c798e-1790146212205.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_300,c_limit/v1790148863/photo-1447752875215-b2761acb3c5d-1790148865109.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_300,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_300,c_limit/v1790146210/photo-1501785888041-af3ef285b470-1790146212207.jpg",
];

export interface CursorAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CursorVariant;
  label?: string;
  color?: CursorColor | string;
  trailCount?: number;
  images?: string[];
  children?: React.ReactNode;
}

export interface MainContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function MainContent({ children, className, ...props }: MainContentProps) {
  return (
    <div className={cn("relative z-10 w-full pointer-events-none", className)} {...props}>
      {children}
    </div>
  );
}

const colorThemes: Record<string, { accent: string; rgb: string }> = {
  primary: {
    accent: "#6366f1",
    rgb: "99, 102, 241",
  },
  indigo: {
    accent: "#6366f1",
    rgb: "99, 102, 241",
  },
  rose: {
    accent: "#f43f5e",
    rgb: "244, 63, 94",
  },
  emerald: {
    accent: "#10b981",
    rgb: "16, 185, 129",
  },
  zinc: {
    accent: "#a1a1aa",
    rgb: "161, 161, 170",
  },
};

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3)
    cleanHex = cleanHex
      .split("")
      .map((x) => x + x)
      .join("");
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "99, 102, 241";
};

export function CursorAnimation({
  variant = "glow",
  label = "Explore",
  color = "primary",
  trailCount = 6,
  images = defaultTrailImages,
  children,
  className,
  ...props
}: CursorAnimationProps) {
  const isPrimary = color === "primary" || color === "default" || !color;
  const activeColor = isPrimary
    ? "var(--primary)"
    : color?.startsWith("#")
      ? color
      : colorThemes[color]?.accent || "var(--primary)";

  const activeRgb = isPrimary
    ? "var(--primary)"
    : color?.startsWith("#")
      ? hexToRgb(color)
      : colorThemes[color]?.rgb || "99, 102, 241";

  const containerRef = useRef<HTMLDivElement>(null);
  const targetPosRef = useRef({ x: -100, y: -100 });
  const smoothPosRef = useRef({ x: -100, y: -100 });
  const lastImgPosRef = useRef({ x: -100, y: -100 });
  const imgIndexRef = useRef(0);

  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [smoothPos, setSmoothPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const [imageTrail, setImageTrail] = useState<
    { x: number; y: number; id: number; url: string }[]
  >([]);

  // High-performance RAF loop for hyper-responsive, lag-free cursor tracking
  useEffect(() => {
    if (!isHovered) return;

    let animId: number;
    let lastTrailTime = 0;

    const loop = (timestamp: number) => {
      const target = targetPosRef.current;
      const smooth = smoothPosRef.current;

      // 0.65 LERP factor for ultra-fast, smooth trailing ring
      const nextX = smooth.x + (target.x - smooth.x) * 0.65;
      const nextY = smooth.y + (target.y - smooth.y) * 0.65;

      smoothPosRef.current = { x: nextX, y: nextY };
      setSmoothPos({ x: nextX, y: nextY });

      // Dense 20ms trail update
      if (variant === "trail" && timestamp - lastTrailTime > 20) {
        lastTrailTime = timestamp;
        setTrail((prev) => [
          { x: target.x, y: target.y, id: timestamp },
          ...prev.slice(0, trailCount - 1),
        ]);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isHovered, variant, trailCount]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    targetPosRef.current = { x, y };
    setMousePos({ x, y });

    // For image-trail variant: spawn image when mouse moves > 45px from last spawned location
    if (variant === "image-trail") {
      const dist = Math.hypot(x - lastImgPosRef.current.x, y - lastImgPosRef.current.y);
      if (dist > 45) {
        lastImgPosRef.current = { x, y };
        const imgUrl = images[imgIndexRef.current % images.length];
        imgIndexRef.current += 1;
        const newImg = { x, y, id: Date.now() + Math.random(), url: imgUrl };

        setImageTrail((prev) => [...prev.slice(-6), newImg]);
      }
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    targetPosRef.current = { x: -100, y: -100 };
    smoothPosRef.current = { x: -100, y: -100 };
    lastImgPosRef.current = { x: -100, y: -100 };
    setMousePos({ x: -100, y: -100 });
    setSmoothPos({ x: -100, y: -100 });
    setTrail([]);
    setImageTrail([]);
  };

  const getVariantIcon = () => {
    switch (variant) {
      case "glow":
        return <Sparkles className="w-7 h-7" />;
      case "magnetic":
        return <Target className="w-7 h-7" />;
      case "trail":
        return <Zap className="w-7 h-7" />;
      case "badge":
        return <MousePointer className="w-7 h-7" />;
      case "spotlight":
        return <Eye className="w-7 h-7" />;
      case "expand":
        return <Maximize2 className="w-7 h-7" />;
      case "crosshair":
        return <Crosshair className="w-7 h-7" />;
      case "ring":
        return <CircleDot className="w-7 h-7" />;
      case "pulse":
        return <Radio className="w-7 h-7" />;
      case "sonar":
        return <Minimize2 className="w-7 h-7" />;
      case "image-trail":
        return <ImageIcon className="w-7 h-7" />;
      default:
        return <Sparkles className="w-7 h-7" />;
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsClicking(true)}
      onMouseUp={() => setIsClicking(false)}
      className={cn(
        "relative w-full h-[480px] sm:h-[560px] rounded-2xl overflow-hidden select-none border transition-all duration-300",
        "bg-background border-border",
        "flex flex-col items-center justify-center p-6 text-center cursor-none",
        className
      )}
      {...props}
    >
      {/* Container Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Main Interactive Demo Area Content wrapped in MainContent */}
      {children || (
        <MainContent>
          <div className="flex flex-col items-center gap-4 max-w-md mx-auto text-center">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border mx-auto"
              style={{
                backgroundColor: isPrimary ? "hsl(var(--primary) / 0.12)" : `rgba(${activeRgb}, 0.12)`,
                borderColor: isPrimary ? "hsl(var(--primary) / 0.3)" : `rgba(${activeRgb}, 0.3)`,
                color: activeColor,
              }}
            >
              {getVariantIcon()}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground tracking-tight">
                Hover & Move Cursor
              </h3>
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                Interactive custom cursor animation with fluid physics and custom theme styling.
              </p>
            </div>
          </div>
        </MainContent>
      )}

      {/* CUSTOM CURSOR RENDERERS */}
      {isHovered && (
        <>
          {/* VARIANT 1: GLOW CURSOR */}
          {variant === "glow" && (
            <>
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-[width,height,opacity] duration-150"
                style={{
                  left: `${smoothPos.x}px`,
                  top: `${smoothPos.y}px`,
                  width: isClicking ? "180px" : "140px",
                  height: isClicking ? "180px" : "140px",
                  backgroundColor: activeColor,
                  opacity: 0.35,
                }}
              />
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border backdrop-blur-xs transition-[width,height] duration-150"
                style={{
                  left: `${mousePos.x}px`,
                  top: `${mousePos.y}px`,
                  width: isClicking ? "24px" : "36px",
                  height: isClicking ? "24px" : "36px",
                  borderColor: isPrimary ? "hsl(var(--primary) / 0.5)" : `rgba(${activeRgb}, 0.5)`,
                  backgroundColor: isPrimary ? "hsl(var(--primary) / 0.15)" : `rgba(${activeRgb}, 0.15)`,
                }}
              />
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full shadow-sm"
                style={{
                  left: `${mousePos.x}px`,
                  top: `${mousePos.y}px`,
                  backgroundColor: activeColor,
                }}
              />
            </>
          )}

          {/* VARIANT 2: MAGNETIC TARGET CURSOR */}
          {variant === "magnetic" && (
            <>
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed transition-[width,height] duration-150"
                style={{
                  left: `${smoothPos.x}px`,
                  top: `${smoothPos.y}px`,
                  width: isClicking ? "32px" : "48px",
                  height: isClicking ? "32px" : "48px",
                  borderColor: activeColor,
                  transform: `translate(-50%, -50%) rotate(${
                    smoothPos.x + smoothPos.y
                  }deg)`,
                }}
              />
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full shadow-md"
                style={{
                  left: `${mousePos.x}px`,
                  top: `${mousePos.y}px`,
                  backgroundColor: activeColor,
                }}
              />
            </>
          )}

          {/* VARIANT 3: PARTICLE TRAIL CURSOR */}
          {variant === "trail" && (
            <>
              {trail.map((pt, i) => {
                const size = Math.max(4, 16 - i * 2.2);
                const opacity = (trail.length - i) / trail.length;
                return (
                  <div
                    key={pt.id + i}
                    className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      left: `${pt.x}px`,
                      top: `${pt.y}px`,
                      width: `${size}px`,
                      height: `${size}px`,
                      backgroundColor: activeColor,
                      opacity: opacity * 0.7,
                    }}
                  />
                );
              })}
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full shadow-lg"
                style={{
                  left: `${mousePos.x}px`,
                  top: `${mousePos.y}px`,
                  backgroundColor: activeColor,
                }}
              />
            </>
          )}

          {/* VARIANT 4: BADGE LABEL CURSOR */}
          {variant === "badge" && (
            <div
              className="pointer-events-none absolute left-0 top-0 z-30"
              style={{
                transform: `translate3d(${mousePos.x + 12}px, ${
                  mousePos.y + 12
                }px, 0)`,
              }}
            >
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-semibold shadow-xl whitespace-nowrap"
                style={{ backgroundColor: activeColor }}
              >
                <span>{label}</span>
                <MousePointer className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>
          )}

          {/* VARIANT 5: SPOTLIGHT MASK CURSOR */}
          {variant === "spotlight" && (
            <>
              <div
                className="pointer-events-none absolute inset-0 z-20"
                style={{
                  background: `radial-gradient(circle 130px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, rgba(0, 0, 0, 0.45) 100%)`,
                }}
              />
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full z-30"
                style={{
                  left: `${mousePos.x}px`,
                  top: `${mousePos.y}px`,
                  backgroundColor: activeColor,
                  boxShadow: `0 0 15px ${activeColor}`,
                }}
              />
            </>
          )}

          {/* VARIANT 6: EXPAND SCALING CURSOR */}
          {variant === "expand" && (
            <>
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-[width,height] duration-150"
                style={{
                  left: `${smoothPos.x}px`,
                  top: `${smoothPos.y}px`,
                  width: isClicking ? "64px" : "40px",
                  height: isClicking ? "64px" : "40px",
                  borderColor: activeColor,
                  backgroundColor: isPrimary ? "hsl(var(--primary) / 0.15)" : `rgba(${activeRgb}, 0.15)`,
                }}
              />
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                style={{
                  left: `${mousePos.x}px`,
                  top: `${mousePos.y}px`,
                  backgroundColor: activeColor,
                }}
              />
            </>
          )}

          {/* VARIANT 7: PRECISION CROSSHAIR CURSOR */}
          {variant === "crosshair" && (
            <>
              <div
                className="pointer-events-none absolute top-0 bottom-0 w-[1px]"
                style={{
                  left: `${mousePos.x}px`,
                  backgroundColor: isPrimary ? "hsl(var(--primary) / 0.4)" : `rgba(${activeRgb}, 0.4)`,
                }}
              />
              <div
                className="pointer-events-none absolute left-0 right-0 h-[1px]"
                style={{
                  top: `${mousePos.y}px`,
                  backgroundColor: isPrimary ? "hsl(var(--primary) / 0.4)" : `rgba(${activeRgb}, 0.4)`,
                }}
              />
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border flex items-center justify-center"
                style={{
                  left: `${mousePos.x}px`,
                  top: `${mousePos.y}px`,
                  borderColor: activeColor,
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: activeColor }}
                />
              </div>
            </>
          )}

          {/* VARIANT 8: SMOOTH RING CURSOR */}
          {variant === "ring" && (
            <>
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height] duration-150"
                style={{
                  left: `${smoothPos.x}px`,
                  top: `${smoothPos.y}px`,
                  width: isClicking ? "24px" : "42px",
                  height: isClicking ? "24px" : "42px",
                  borderColor: activeColor,
                }}
              />
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                style={{
                  left: `${mousePos.x}px`,
                  top: `${mousePos.y}px`,
                  backgroundColor: activeColor,
                }}
              />
            </>
          )}

          {/* VARIANT 9: RADIAL PULSE CURSOR */}
          {variant === "pulse" && (
            <>
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full animate-ping"
                style={{
                  left: `${mousePos.x}px`,
                  top: `${mousePos.y}px`,
                  width: "36px",
                  height: "36px",
                  backgroundColor: isPrimary ? "hsl(var(--primary) / 0.25)" : `rgba(${activeRgb}, 0.25)`,
                }}
              />
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow-md"
                style={{
                  left: `${mousePos.x}px`,
                  top: `${mousePos.y}px`,
                  backgroundColor: activeColor,
                }}
              />
            </>
          )}

          {/* VARIANT 10: SONAR WAVE CURSOR */}
          {variant === "sonar" && (
            <>
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border"
                style={{
                  left: `${smoothPos.x}px`,
                  top: `${smoothPos.y}px`,
                  width: "56px",
                  height: "56px",
                  borderColor: `rgba(${activeRgb}, 0.6)`,
                }}
              />
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border"
                style={{
                  left: `${smoothPos.x}px`,
                  top: `${smoothPos.y}px`,
                  width: "32px",
                  height: "32px",
                  borderColor: `rgba(${activeRgb}, 0.4)`,
                }}
              />
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full shadow-xs"
                style={{
                  left: `${mousePos.x}px`,
                  top: `${mousePos.y}px`,
                  backgroundColor: activeColor,
                }}
              />
            </>
          )}

          {/* VARIANT 11: IMAGE TRAIL CURSOR */}
          {variant === "image-trail" && (
            <>
              {imageTrail.map((img) => (
                <div
                  key={img.id}
                  className="pointer-events-none absolute overflow-hidden rounded-xl shadow-xl border border-foreground/80 animate-[img-trail-pop_1.2s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                  style={{
                    left: `${img.x}px`,
                    top: `${img.y}px`,
                    width: "140px",
                    height: "180px",
                    transformOrigin: "center center",
                  }}
                >
                  {/* eslint-disable-next-html-element-for-jsx */}
                  <img
                    src={img.url}
                    alt="trail image"
                    className="w-full h-full object-cover rounded-lg transform scale-105"
                  />
                </div>
              ))}

              {/* Plain <style> rather than styled-jsx, which only compiles
                  under Next.js — everywhere else React rejects its unknown
                  attribute and TypeScript fails the build. */}
              <style
                dangerouslySetInnerHTML={{
                  __html: `@keyframes img-trail-pop {
  0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
  30% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  70% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
}`,
                }}
              />

              {/* Minimalist Precision Reticle Cursor Pointer Centered in the Image */}
              <div
                className="pointer-events-none absolute flex items-center justify-center rounded-full z-50 transition-transform duration-75 bg-background/30 backdrop-blur-xs border border-primary/30"
                style={{
                  left: `${mousePos.x}px`,
                  top: `${mousePos.y}px`,
                  width: "18px",
                  height: "18px",
                  transform: "translate(-50%, -50%)",
                  color: activeColor,
                  boxShadow: `0 0 10px rgba(${activeRgb}, 0.6)`,
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: activeColor }}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
