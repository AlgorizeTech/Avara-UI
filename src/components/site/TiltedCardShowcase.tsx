"use client";

import { TiltedCard } from "@/components/custom/blocks/TiltedCardBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { cn } from "@/lib/utils";
import { Cpu, Fingerprint, Nfc } from "lucide-react";
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const TILT_CODE_TS = `/* Exposes the full TiltedCardBlock architecture natively via module export */`;
const TILT_CODE_JS = `/* Exposes the full TiltedCardBlock architecture natively via module export */`;

export function TiltedCardShowcase() {
  const [tiltIntensity, setTiltIntensity] = useState(20);
  const [glareOpacity, setGlareOpacity] = useState(0.4);
  const [scaleOnHover, setScaleOnHover] = useState(1.05);

  const [color, setColor] = useState<string>("#FFAB1D"); // Theme context sync

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
    <div className="w-[350px] h-[450px]">
      <TiltedCard 
        tiltIntensity={${tiltIntensity}} 
        glareOpacity={${glareOpacity}} 
        scaleOnHover={${scaleOnHover}}
      >
        <div className="w-full h-full bg-zinc-900 rounded-2xl p-8 flex flex-col justify-between border border-white/10">
          <ShieldCheck className="w-12 h-12 text-indigo-500" />
          
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Vault Security</h3>
            <p className="text-zinc-400">Military-grade encryption securing your assets automatically.</p>
          </div>
        </div>
      </TiltedCard>
    </div>
  );
}`;
  };

  // Cross-browser targeted structural selectors for sliders
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
      <div className="flex flex-col gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              step="0.1"
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
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="TiltedCardBlock"
        tsCode={TILT_CODE_TS}
        jsCode={TILT_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
      >
        <div className="w-full flex items-center justify-center bg-zinc-50 dark:bg-[#020202] py-24 px-4 relative overflow-hidden min-h-[700px]">
          {/* Decorative Mesh Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Wrapper dictates the card's physical size */}
          <div className="w-full max-w-[340px] aspect-[3/4] relative z-10">
            <TiltedCard
              tiltIntensity={tiltIntensity}
              glareOpacity={glareOpacity}
              scaleOnHover={scaleOnHover}
            >
              {/* Card Surface Design (Glassmorphic Mock Credit Card / ID) */}
              <div className="w-full h-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl border border-white/50 dark:border-white/10 rounded-2xl p-8 flex flex-col justify-between overflow-hidden relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                {/* Decorative gradients inside the card to enhance the 3D parallax */}
                <div
                  className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[60px] opacity-60 dark:opacity-40"
                  style={{ backgroundColor: color }}
                />
                <div
                  className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full blur-[80px] opacity-40 dark:opacity-20"
                  style={{ backgroundColor: color }}
                />

                <div className="relative z-10 flex justify-between items-start">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border border-white/20 dark:border-black/20"
                    style={{ backgroundColor: color, color: "#fff" }}
                  >
                    <Nfc className="w-6 h-6" />
                  </div>
                  <Cpu className="w-8 h-8 text-zinc-300 dark:text-zinc-600" />
                </div>

                <div className="relative z-10 mt-auto">
                  <div className="flex items-center gap-3 mb-6">
                    <Fingerprint className="w-6 h-6 text-zinc-400 dark:text-zinc-500" />
                    <div className="h-1.5 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-transparent via-zinc-400 dark:via-zinc-500 to-transparent animate-[shimmer_2s_infinite]" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight uppercase mb-1 drop-shadow-sm">
                    Access Key
                  </h3>
                  <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 font-mono tracking-widest">
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
