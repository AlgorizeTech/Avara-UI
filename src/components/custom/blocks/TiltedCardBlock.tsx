"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useRef } from "react";

export interface TiltedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  tiltIntensity?: number; // Maximum rotation in degrees (e.g., 15)
  glareOpacity?: number; // Maximum opacity of the glare effect (0 to 1)
  scaleOnHover?: number; // Scale factor when hovered (e.g., 1.05)
}

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

    React.useImperativeHandle(ref, () => cardRef.current as HTMLDivElement);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const rotateX = useTransform(
      smoothY,
      [-1, 1],
      [tiltIntensity, -tiltIntensity],
    );
    const rotateY = useTransform(
      smoothX,
      [-1, 1],
      [-tiltIntensity, tiltIntensity],
    );

    const glareX = useTransform(smoothX, [-1, 1], [0, 100]);
    const glareY = useTransform(smoothY, [-1, 1], [0, 100]);

    // Dynamic glare overlay using theme-color variable
    const glareBackgroundTheme = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, var(--theme-color,var(--primary)), transparent 65%)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x * 2);
      mouseY.set(y * 2);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    return (
      <div
        className={cn("relative perspective-[1000px] w-full h-full", className)}
        {...props}
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          whileHover={{ scale: scaleOnHover }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
            <motion.div
              className="absolute inset-0 z-50 pointer-events-none opacity-0 group-hover:opacity-[var(--glare-opacity)] transition-opacity duration-300 rounded-2xl"
              style={{ background: glareBackgroundTheme }}
            />
          </div>
        </motion.div>
      </div>
    );
  },
);
TiltedCard.displayName = "TiltedCard";
