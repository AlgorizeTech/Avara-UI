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

    // Merge refs
    React.useImperativeHandle(ref, () => cardRef.current as HTMLDivElement);

    // Mouse position relative to the center of the card (-1 to 1)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for the rotation and glare
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // Calculate rotation:
    // Moving mouse right (positive X) rotates card right (positive rotateY)
    // Moving mouse down (positive Y) rotates card down (negative rotateX)
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

    // Glare positioning based on mouse
    const glareX = useTransform(smoothX, [-1, 1], [0, 100]);
    const glareY = useTransform(smoothY, [-1, 1], [0, 100]);
    const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${glareOpacity}), transparent 50%)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();

      // Calculate mouse position relative to the center (-0.5 to 0.5)
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Scale up to -1 to 1 for easier math
      mouseX.set(x * 2);
      mouseY.set(y * 2);
    };

    const handleMouseLeave = () => {
      // Reset to center smoothly
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
          className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] group"
        >
          {/* Glare Layer */}
          <motion.div
            className="absolute inset-0 z-50 pointer-events-none mix-blend-overlay dark:mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: glareBackground }}
          />

          {/* Content Wrapper */}
          <div
            className="relative w-full h-full z-10"
            style={{ transform: "translateZ(30px)" }}
          >
            {children}
          </div>
        </motion.div>
      </div>
    );
  },
);
TiltedCard.displayName = "TiltedCard";
