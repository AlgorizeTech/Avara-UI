"use client";

import { TiltedCard } from "@/components/custom/blocks/TiltedCardBlock";
import { accentForeground, accentStyle, resolveAccent } from "@/lib/accent";
import { Cpu, Fingerprint, Nfc } from "lucide-react";

export default function TiltedCardDemo({
  tiltIntensity = 20,
  glareOpacity = 0.2,
  scaleOnHover = 1.04,
  color = "#FFAB1D",
}: {
  tiltIntensity?: number;
  glareOpacity?: number;
  scaleOnHover?: number;
  /** Accent from the gallery's colour picker. Hex, preset name or "primary". */
  color?: string;
}) {
  // The picker can hand over a preset name ("indigo") or "primary", neither of
  // which is a valid CSS colour on its own — resolve before using inline.
  const resolved = resolveAccent(color);
  const accent = resolved ?? "var(--primary)";
  const onAccent = resolved
    ? accentForeground(resolved)
    : "var(--primary-foreground)";

  return (
    <div
      style={accentStyle(color)}
      className="w-full flex items-center justify-center bg-zinc-100/70 dark:bg-[#050505] py-16 sm:py-24 px-4 relative overflow-hidden min-h-[500px] sm:min-h-[700px]"
    >
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
              style={{ backgroundColor: accent }}
            />
            <div
              className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-[60px] opacity-15 dark:opacity-20 pointer-events-none"
              style={{ backgroundColor: accent }}
            />

            <div className="relative z-10 flex justify-between items-start">
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-sm border border-zinc-200/60 dark:border-white/10"
                style={{ backgroundColor: accent, color: onAccent }}
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
  );
}
