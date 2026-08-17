"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════
   TYPES & INTERFACES
   ═══════════════════════════════════════════════ */

export interface DesignFolderBoxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  color?: string;
}

/* ═══════════════════════════════════════════════
   STANDALONE COMPONENT: DesignFolderBox
   (Pure Frosted Glass Folder Box without cards)
   ═══════════════════════════════════════════════ */

export const DesignFolderBox = forwardRef<
  HTMLDivElement,
  DesignFolderBoxProps
>(
  (
    {
      title = "Design",
      subtitle = "Components",
      color,
      className,
      ...props
    },
    ref
  ) => {
    const getAccentColor = (col?: string) => {
      if (!col || col === "primary" || col === "default") return undefined;
      const presets: Record<string, string> = {
        indigo: "#6366f1",
        rose: "#f43f5e",
        emerald: "#10b981",
        zinc: "#18181b",
      };
      return presets[col] || col;
    };

    const resolvedColor = getAccentColor(color);
    const customStyle: React.CSSProperties = resolvedColor
      ? ({ "--primary": resolvedColor } as React.CSSProperties)
      : {};

    return (
      <section
        ref={ref}
        style={customStyle}
        className={cn(
          "relative w-full py-4 md:py-8 overflow-hidden select-none flex justify-center items-center",
          className
        )}
        {...props}
      >
        <div className="w-full flex justify-center items-center overflow-hidden px-1 sm:px-0">
          <div className="relative w-full max-w-[960px] mx-auto h-[220px] min-[420px]:h-[260px] min-[520px]:h-[300px] sm:h-[360px] md:h-[420px] lg:h-[460px] flex items-end justify-center">
            {/* FOREGROUND FROSTED GLASS FOLDER BOX ONLY */}
            <div className="relative w-[95%] sm:w-[85%] md:w-[680px] lg:w-[780px] h-full z-30 pointer-events-none">
              <div className="relative w-full h-full">
                {/* Folder Shape */}
                <div className="absolute inset-0">
                  <div
                    className="absolute inset-0 backdrop-blur-[3px] pointer-events-none"
                    style={{ clipPath: "url(#pureFolderShapeClip)" }}
                  />
                  <svg
                    className="w-full h-full relative z-10"
                    viewBox="-10 0 660 310"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <clipPath
                        id="pureFolderShapeClip"
                        clipPathUnits="objectBoundingBox"
                      >
                        <path d="M -0.012,0.0258 C -0.012,0.0097 -0.004,0 0.012,0 L 0.500,0 C 0.525,0 0.545,0.0806 0.564,0.145 C 0.576,0.187 0.594,0.2193 0.618,0.2193 L 0.966,0.2193 C 0.975,0.2193 0.982,0.2322 0.982,0.258 L 0.939,0.9742 C 0.939,0.9903 0.933,1 0.924,1 L 0.045,1 C 0.036,1 0.030,0.9903 0.030,0.9742 Z" />
                      </clipPath>
                      <linearGradient
                        id="themePureFolderGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="var(--primary)"
                          stopOpacity="0.75"
                        />
                        <stop
                          offset="50%"
                          stopColor="var(--primary)"
                          stopOpacity="0.82"
                        />
                        <stop
                          offset="100%"
                          stopColor="var(--primary)"
                          stopOpacity="0.9"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      d="
                        M -8 8
                        C -8 3, -3 0, 8 0
                        L 330 0
                        C 347 0, 360 25, 372 45
                        C 380 58, 392 68, 408 68
                        L 638 68
                        C 644 68, 648 72, 648 80
                        L 620 302
                        C 620 307, 616 310, 610 310
                        L 30 310
                        C 24 310, 20 307, 20 302
                        Z
                      "
                      fill="url(#themePureFolderGradient)"
                      stroke="rgba(255, 255, 255, 0.45)"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                {/* Folder Text Overlay */}
                <div className="absolute inset-0 p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-end pointer-events-auto">
                  <div className="relative z-10">
                    <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground tracking-tight leading-[1.05]">
                      {title}
                      {subtitle && (
                        <>
                          <br />
                          {subtitle}
                        </>
                      )}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

DesignFolderBox.displayName = "DesignFolderBox";

export default DesignFolderBox;
