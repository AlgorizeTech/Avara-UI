"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { createSpringFollower, type SpringFollower } from "./motion-curves";

export interface TiltedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  tiltIntensity?: number; // Maximum rotation in degrees (e.g., 15)
  glareOpacity?: number; // Maximum opacity of the glare effect (0 to 1)
  scaleOnHover?: number; // Scale factor when hovered (e.g., 1.05)
}

// Pointer tilt: every frame the tilt chases the pointer through this spring,
// keeping its velocity when the pointer moves on — no animation library, just
// the spring's equation of motion stepped on requestAnimationFrame.
const TILT_SPRING = { damping: 25, stiffness: 300, mass: 0.5, restDelta: 0.001, restSpeed: 0.01 };
// Hover scale, same approach, so leaving mid-grow springs back from where it is.
const HOVER_SPRING = { stiffness: 300, damping: 20, mass: 1, restDelta: 0.005, restSpeed: 0.01 };

/** Maps -1..1 onto `from..to`, clamped at both ends. */
const mapRange = (v: number, from: number, to: number) => {
  const p = Math.min(Math.max((v + 1) / 2, 0), 1);
  return from + (to - from) * p;
};

const glareBackground = (x: number, y: number) =>
  `radial-gradient(circle at ${x}% ${y}%, var(--theme-color,var(--primary)), transparent 65%)`;

export const TiltedCard = React.forwardRef<HTMLDivElement, TiltedCardProps>(
  (
    {
      children,
      className,
      tiltIntensity = 15,
      glareOpacity = 0.2,
      scaleOnHover = 1.02,
      ...props
    },
    ref,
  ) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const glareRef = useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => cardRef.current as HTMLDivElement);

    // Read at paint time, so a changed prop applies from the next frame.
    const latest = useRef({ tiltIntensity, scaleOnHover });
    latest.current = { tiltIntensity, scaleOnHover };

    const springs = useRef<{
      x: SpringFollower;
      y: SpringFollower;
      scale: SpringFollower;
    } | null>(null);

    useEffect(() => {
      // Writes the card transform and the glare straight to the DOM, the way
      // motion values do — no React render per frame.
      const paint = () => {
        const s = springs.current;
        const card = cardRef.current;
        if (!s || !card) return;
        const tilt = latest.current.tiltIntensity;
        const x = s.x.get();
        const y = s.y.get();
        const scale = s.scale.get();
        const rotateX = mapRange(y, tilt, -tilt);
        const rotateY = mapRange(x, -tilt, tilt);
        const parts: string[] = [];
        if (scale !== 1) parts.push(`scale(${scale})`);
        if (rotateX !== 0) parts.push(`rotateX(${rotateX}deg)`);
        if (rotateY !== 0) parts.push(`rotateY(${rotateY}deg)`);
        card.style.transform = parts.length ? parts.join(" ") : "none";
        if (glareRef.current) {
          glareRef.current.style.background = glareBackground(
            mapRange(x, 0, 100),
            mapRange(y, 0, 100),
          );
        }
      };

      springs.current = {
        x: createSpringFollower(0, paint, TILT_SPRING),
        y: createSpringFollower(0, paint, TILT_SPRING),
        scale: createSpringFollower(1, paint, HOVER_SPRING),
      };

      return () => {
        springs.current?.x.destroy();
        springs.current?.y.destroy();
        springs.current?.scale.destroy();
        springs.current = null;
      };
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      springs.current?.x.set(x * 2);
      springs.current?.y.set(y * 2);
    };

    const handleMouseLeave = () => {
      springs.current?.x.set(0);
      springs.current?.y.set(0);
    };

    // Hover scale follows a mouse or pen; a touch never counts as hovering.
    const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === "touch") return;
      springs.current?.scale.set(latest.current.scaleOnHover);
    };

    const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === "touch") return;
      springs.current?.scale.set(1);
    };

    return (
      <div
        className={cn("relative perspective-[1000px] w-full h-full", className)}
        {...props}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          style={{
            transformStyle: "preserve-3d",
          }}
          className="relative w-full h-full rounded-2xl overflow-visible shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.14)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] group cursor-pointer"
        >
          <div
            className="relative w-full h-full z-10"
            style={
              {
                transform: "translateZ(30px)",
                "--glare-opacity": glareOpacity,
              } as React.CSSProperties
            }
          >
            {children}

            {/* Dynamic Theme Color Glare Overlay */}
            <div
              ref={glareRef}
              className="absolute inset-0 z-50 pointer-events-none opacity-0 group-hover:opacity-[var(--glare-opacity)] transition-opacity duration-300 rounded-2xl"
              style={{ background: glareBackground(50, 50) }}
            />
          </div>
        </div>
      </div>
    );
  },
);
TiltedCard.displayName = "TiltedCard";
