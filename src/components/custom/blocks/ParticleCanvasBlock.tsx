"use client";

import React, { useEffect, useRef, useCallback, useState, useSyncExternalStore } from "react";

/**
 * False while server-rendering and during hydration, true afterwards — without
 * the extra render an effect-flipped useState costs.
 */
const subscribeToNothing = () => () => {};
const useIsMounted = () =>
  useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export interface ParticleCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  content?: string;
  variant?: "repel" | (string & {});
  particleSize?: number;
  particleGap?: number;
  speed?: number;
  color?: string;
  backgroundColor?: string;
  interactive?: boolean;
  fontSize?: number;
  fontFamily?: string;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  scatterSeed: number;
  forceMult: number;
}

const PRESET_ACCENT_HEX: Record<string, string> = {
  indigo: "#6366f1",
  rose: "#f43f5e",
  emerald: "#10b981",
  zinc: "#18181b",
  amber: "#f59e0b",
  blue: "#3b82f6",
};

/** Turns a preset accent name or custom hex string into a CSS color, or null for default theme. */
function resolveColorAccent(color?: string): string | null {
  if (!color || color === "primary" || color === "default") return null;
  return PRESET_ACCENT_HEX[color] ?? color;
}

export function ParticleCanvas({
  content = "AlgorizeTech",
  variant = "repel",
  particleSize = 2.5,
  particleGap = 5,
  speed = 1,
  color,
  backgroundColor = "transparent",
  interactive = true,
  fontSize,
  fontFamily = "system-ui, -apple-system, sans-serif",
  className,
  ...props
}: ParticleCanvasProps) {
  const { resolvedTheme } = useTheme();
  const mounted = useIsMounted();
  const [themePrimaryColor, setThemePrimaryColor] = useState<string>("currentColor");

  // Real-time semantic CSS theme color resolver (supports standard CSS vars and Shadcn HSL variables)
  const getActivePrimaryColor = (): string => {
    if (typeof window === "undefined") return resolvedTheme === "light" ? "#18181b" : "#3b82f6";
    try {
      // 1. Direct CSS variable evaluation
      const dummy = document.createElement("div");
      dummy.style.color = "var(--primary)";
      dummy.style.position = "absolute";
      dummy.style.visibility = "hidden";
      dummy.style.pointerEvents = "none";
      document.body.appendChild(dummy);
      let computedColor = window.getComputedStyle(dummy).color;
      document.body.removeChild(dummy);

      if (computedColor && computedColor !== "rgba(0, 0, 0, 0)" && computedColor !== "transparent") {
        return computedColor;
      }

      // 2. Shadcn HSL CSS variable format fallback (hsl(var(--primary)))
      const dummyHsl = document.createElement("div");
      dummyHsl.style.color = "hsl(var(--primary))";
      dummyHsl.style.position = "absolute";
      dummyHsl.style.visibility = "hidden";
      dummyHsl.style.pointerEvents = "none";
      document.body.appendChild(dummyHsl);
      computedColor = window.getComputedStyle(dummyHsl).color;
      document.body.removeChild(dummyHsl);

      if (computedColor && computedColor !== "rgba(0, 0, 0, 0)" && computedColor !== "transparent") {
        return computedColor;
      }
    } catch {
      // Colour could not be resolved; fallback used below
    }
    return resolvedTheme === "light" ? "#18181b" : "#3b82f6";
  };

  // Dynamically observe and resolve exact active site theme --primary CSS color variable
  useEffect(() => {
    if (typeof window === "undefined" || !mounted) return;

    const updateThemeColor = () => {
      const activeColor = getActivePrimaryColor();
      setThemePrimaryColor(activeColor);
    };

    updateThemeColor();

    const observer = new MutationObserver(() => updateThemeColor());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme"],
    });

    return () => observer.disconnect();
  }, [mounted, resolvedTheme]);

  // Resolve picked color from color picker or fallback to exact active header primary theme color
  const resolvedPickerColor = resolveColorAccent(color);
  const effectiveColor =
    resolvedPickerColor ||
    (themePrimaryColor !== "currentColor"
      ? themePrimaryColor
      : getActivePrimaryColor());

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  const sampleParticles = useCallback(
    (width: number, height: number): Promise<{ x: number; y: number }[]> => {
      return new Promise((resolve) => {
        const offscreen = document.createElement("canvas");
        offscreen.width = width;
        offscreen.height = height;
        const ctx = offscreen.getContext("2d", { willReadFrequently: true });

        if (!ctx) {
          resolve([]);
          return;
        }

        const sampled: { x: number; y: number }[] = [];

        // Device Breakpoint Gap Rules:
        // Small (< 768px): gap = 3.0px
        // MD (768px - 1023px): gap = 4.0px
        // Large (>= 1024px): gap = 5.0px (or particleGap prop)
        let currentGap: number;
        if (width < 768) {
          currentGap = 3;
        } else if (width < 1024) {
          currentGap = 4;
        } else {
          currentGap = Math.max(2, Math.round(particleGap));
        }

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#000000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const calcFontSize = fontSize || Math.min((width * 0.92) / (content.length * 0.58), height * 0.42);
        ctx.font = `bold ${calcFontSize}px ${fontFamily}`;
        ctx.fillText(content, width / 2, height / 2);

        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;

        for (let y = 0; y < height; y += currentGap) {
          for (let x = 0; x < width; x += currentGap) {
            const index = (Math.floor(y) * width + Math.floor(x)) * 4;
            const alpha = data[index + 3];
            if (alpha > 128) {
              sampled.push({ x: Math.floor(x), y: Math.floor(y) });
            }
          }
        }
        resolve(sampled);
      });
    },
    [content, particleGap, fontSize, fontFamily]
  );

  const initParticles = useCallback(
    async (width: number, height: number) => {
      const targets = await sampleParticles(width, height);
      const newParticles: Particle[] = [];

      targets.forEach((target) => {
        newParticles.push({
          x: target.x,
          y: target.y,
          originX: target.x,
          originY: target.y,
          targetX: target.x,
          targetY: target.y,
          vx: 0,
          vy: 0,
          size: particleSize,
          color: effectiveColor,
          scatterSeed: (Math.random() - 0.5) * 0.7,
          forceMult: 0.6 + Math.random() * 0.8,
        });
      });

      particlesRef.current = newParticles;
    },
    [sampleParticles, particleSize]
  );

  // Update existing particles' color dynamically without resetting position/scatter
  useEffect(() => {
    particlesRef.current.forEach((p) => {
      p.color = effectiveColor;
    });
  }, [effectiveColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
      initParticles(width, height);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    initParticles(width, height);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (backgroundColor && backgroundColor !== "transparent") {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
      }

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Device Breakpoint Size Rules:
      // Small (< 768px): particleSize = 1.5px
      // MD (768px - 1023px): particleSize = 2.0px
      // Large (>= 1024px): particleSize = 2.5px
      let currentParticleSize: number;
      let currentRadius: number;

      if (width < 768) {
        currentParticleSize = 1.5;
        currentRadius = 45;
      } else if (width < 1024) {
        currentParticleSize = 2.0;
        currentRadius = 65;
      } else {
        currentParticleSize = particleSize;
        currentRadius = 85;
      }

      // Lock global alpha to 1.0 for 100% solid, identical color brightness across ALL dots
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = effectiveColor;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Smooth fluid spring return to origin
        const dx = p.originX - p.x;
        const dy = p.originY - p.y;
        p.x += dx * 0.09 * speed;
        p.y += dy * 0.09 * speed;

        // Organic staggered repulsion force ("chorai chitai jabe")
        if (interactive && mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const dist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (dist < currentRadius) {
            const force = (currentRadius - dist) / currentRadius;
            // Add unique scatter angle perturbation and staggered velocity per particle
            const angle = Math.atan2(mdy, mdx) + p.scatterSeed * force;
            const push = force * 35 * p.forceMult * speed;
            p.x += Math.cos(angle) * push;
            p.y += Math.sin(angle) * push;
          }
        }

        // Render distinct circular particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentParticleSize, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [initParticles, backgroundColor, speed, interactive, effectiveColor, particleSize]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !interactive) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
    mouseRef.current.active = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
    mouseRef.current.x = -9999;
    mouseRef.current.y = -9999;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || !interactive || e.touches.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = e.touches[0].clientX - rect.left;
    mouseRef.current.y = e.touches[0].clientY - rect.top;
    mouseRef.current.active = true;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      className={cn(
        "relative w-full h-full min-h-[600px] overflow-hidden select-none cursor-crosshair",
        className
      )}
      {...props}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

export default ParticleCanvas;
