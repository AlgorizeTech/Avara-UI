"use client";

import { TiltedCard } from "@/components/custom/blocks/TiltedCardBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { cn } from "@/lib/utils";
import { Cpu, Fingerprint, Nfc } from "lucide-react";
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const TILT_CODE_TS = `"use client";

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
  tiltIntensity?: number;
  glareOpacity?: number;
  scaleOnHover?: number;
}

export const TiltedCard = React.forwardRef<HTMLDivElement, TiltedCardProps>(
  ({ children, className, tiltIntensity = 15, glareOpacity = 0.2, scaleOnHover = 1.02, ...props }, ref) => {
    const cardRef = useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => cardRef.current as HTMLDivElement);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const rotateX = useTransform(smoothY, [-1, 1], [tiltIntensity, -tiltIntensity]);
    const rotateY = useTransform(smoothX, [-1, 1], [-tiltIntensity, tiltIntensity]);

    const glareX = useTransform(smoothX, [-1, 1], [0, 100]);
    const glareY = useTransform(smoothY, [-1, 1], [0, 100]);
    
    const glareBackgroundLight = useMotionTemplate\`radial-gradient(circle at \${glareX}% \${glareY}%, rgba(0,0,0,\${glareOpacity}), transparent 60%)\`;
    const glareBackgroundDark = useMotionTemplate\`radial-gradient(circle at \${glareX}% \${glareY}%, rgba(255,255,255,\${glareOpacity}), transparent 60%)\`;

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
      <div className={cn("relative perspective-[1000px] w-full h-full", className)} {...props}>
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          whileHover={{ scale: scaleOnHover }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative w-full h-full rounded-2xl overflow-visible shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.14)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] group"
        >
          <div className="relative w-full h-full z-10" style={{ transform: "translateZ(30px)" }}>
            {children}
            <motion.div
              className="absolute inset-0 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl dark:hidden"
              style={{ background: glareBackgroundLight }}
            />
            <motion.div
              className="absolute inset-0 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl hidden dark:block"
              style={{ background: glareBackgroundDark }}
            />
          </div>
        </motion.div>
      </div>
    );
  }
);
TiltedCard.displayName = "TiltedCard";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const TILT_CODE_JS = `"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useRef } from "react";

export const TiltedCard = React.forwardRef(
  ({ children, className, tiltIntensity = 15, glareOpacity = 0.2, scaleOnHover = 1.02, ...props }, ref) => {
    const cardRef = useRef(null);
    React.useImperativeHandle(ref, () => cardRef.current);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const rotateX = useTransform(smoothY, [-1, 1], [tiltIntensity, -tiltIntensity]);
    const rotateY = useTransform(smoothX, [-1, 1], [-tiltIntensity, tiltIntensity]);

    const glareX = useTransform(smoothX, [-1, 1], [0, 100]);
    const glareY = useTransform(smoothY, [-1, 1], [0, 100]);
    
    const glareBackgroundLight = useMotionTemplate\`radial-gradient(circle at \${glareX}% \${glareY}%, rgba(0,0,0,\${glareOpacity}), transparent 60%)\`;
    const glareBackgroundDark = useMotionTemplate\`radial-gradient(circle at \${glareX}% \${glareY}%, rgba(255,255,255,\${glareOpacity}), transparent 60%)\`;

    const handleMouseMove = (e) => {
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
      <div className={cn("relative perspective-[1000px] w-full h-full", className)} {...props}>
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          whileHover={{ scale: scaleOnHover }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative w-full h-full rounded-2xl overflow-visible shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.14)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] group"
        >
          <div className="relative w-full h-full z-10" style={{ transform: "translateZ(30px)" }}>
            {children}
            <motion.div
              className="absolute inset-0 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl dark:hidden"
              style={{ background: glareBackgroundLight }}
            />
            <motion.div
              className="absolute inset-0 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl hidden dark:block"
              style={{ background: glareBackgroundDark }}
            />
          </div>
        </motion.div>
      </div>
    );
  }
);
TiltedCard.displayName = "TiltedCard";`;

export function TiltedCardShowcase() {
  const [tiltIntensity, setTiltIntensity] = useState(20);
  const [glareOpacity, setGlareOpacity] = useState(0.2);
  const [scaleOnHover, setScaleOnHover] = useState(1.04);

  const [color, setColor] = useState<string>("#FFAB1D");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fetchColor = () => {
      const stored = localStorage.getItem("primaryColor");
      if (stored && stored !== color) setColor(stored);
    };
    fetchColor();
    window.addEventListener("storage", fetchColor);
    const interval = setInterval(fetchColor, 500);
    return () => {
      window.removeEventListener("storage", fetchColor);
      clearInterval(interval);
    };
  }, [color]);

  const generateUsageCode = () => {
    return `import { TiltedCard } from "@/components/custom/blocks/TiltedCardBlock";
import { ShieldCheck } from "lucide-react";

export default function FeaturedProduct() {
  return (
    <div className="w-full max-w-[340px] aspect-[3/4]">
      <TiltedCard 
        tiltIntensity={${tiltIntensity}} 
        glareOpacity={${glareOpacity}} 
        scaleOnHover={${scaleOnHover}}
      >
        <div className="w-full h-full bg-gradient-to-br from-white via-zinc-50/90 to-zinc-100/80 dark:from-zinc-900 dark:via-zinc-900/80 dark:to-zinc-950 rounded-2xl p-8 flex flex-col justify-between border border-zinc-200/80 dark:border-white/10 shadow-sm">
          <ShieldCheck className="w-12 h-12 text-indigo-500" />
          
          <div>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Vault Security</h3>
            <p className="text-zinc-600 dark:text-zinc-400">Military-grade encryption securing your assets automatically.</p>
          </div>
        </div>
      </TiltedCard>
    </div>
  );
}`;
  };

  const sliderClasses = cn(
    "w-full appearance-none bg-transparent cursor-pointer outline-none",
    "[&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:bg-zinc-200 dark:[&::-webkit-slider-runnable-track]:bg-zinc-800 [&::-webkit-slider-runnable-track]:rounded-full",
    "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-zinc-900 dark:[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:mt-[-5px] [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-110",
    "[&::-moz-range-track]:h-1.5 [&::-moz-range-track]:bg-zinc-200 dark:[&::-moz-range-track]:bg-zinc-800 [&::-moz-range-track]:rounded-full",
    "[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-zinc-900 dark:[&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:transition-transform hover:[&::-moz-range-thumb]:scale-110",
  );

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col gap-6 p-5 rounded-xl z-10 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-3">
            <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
              Tilt Intensity
              <span className="text-zinc-900 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                {tiltIntensity}°
              </span>
            </label>
            <input
              type="range"
              min="5"
              max="45"
              step="1"
              value={tiltIntensity}
              onChange={(e) => setTiltIntensity(parseFloat(e.target.value))}
              className={sliderClasses}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
              Glare Opacity
              <span className="text-zinc-900 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                {(glareOpacity * 100).toFixed(0)}%
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={glareOpacity}
              onChange={(e) => setGlareOpacity(parseFloat(e.target.value))}
              className={sliderClasses}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
              Hover Scale
              <span className="text-zinc-900 dark:text-zinc-100 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                {scaleOnHover.toFixed(2)}x
              </span>
            </label>
            <input
              type="range"
              min="1"
              max="1.15"
              step="0.01"
              value={scaleOnHover}
              onChange={(e) => setScaleOnHover(parseFloat(e.target.value))}
              className={sliderClasses}
            />
          </div>
        </div>
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="TiltedCardBlock"
        tsCode={TILT_CODE_TS}
        jsCode={TILT_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
      >
        <div className="w-full flex items-center justify-center bg-zinc-100/70 dark:bg-[#050505] py-16 sm:py-24 px-4 relative overflow-hidden min-h-[500px] sm:min-h-[700px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.06)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="w-full max-w-[340px] aspect-[3/4] relative z-10">
            <TiltedCard
              tiltIntensity={tiltIntensity}
              glareOpacity={glareOpacity}
              scaleOnHover={scaleOnHover}
            >
              {/* Back to the cleaner white surface for light mode! */}
              <div className="w-full h-full bg-gradient-to-br from-white via-zinc-50/90 to-zinc-100/80 dark:from-zinc-900 dark:via-zinc-900/80 dark:to-zinc-950/90 backdrop-blur-2xl border border-zinc-200/80 dark:border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />

                <div
                  className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[50px] opacity-20 dark:opacity-30 pointer-events-none"
                  style={{ backgroundColor: color }}
                />
                <div
                  className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-[60px] opacity-15 dark:opacity-20 pointer-events-none"
                  style={{ backgroundColor: color }}
                />

                <div className="relative z-10 flex justify-between items-start">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-sm border border-zinc-200/60 dark:border-white/10"
                    style={{ backgroundColor: color, color: "#fff" }}
                  >
                    <Nfc className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-zinc-400 dark:text-zinc-600" />
                </div>

                <div className="relative z-10 mt-auto">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <Fingerprint className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-500 dark:text-zinc-500" />
                    <div className="h-1.5 w-12 sm:w-16 bg-zinc-200/80 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-transparent via-zinc-400 dark:via-zinc-500 to-transparent animate-[shimmer_2s_infinite]" />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight uppercase mb-1 drop-shadow-sm">
                    Access Key
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 font-mono tracking-widest">
                    ID // 0x8F92A
                  </p>
                </div>
              </div>
            </TiltedCard>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
