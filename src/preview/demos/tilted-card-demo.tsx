"use client";

import { TiltedCard } from "@/components/custom/blocks/TiltedCardBlock";
import { accentForeground, accentStyle, resolveAccent } from "@/lib/accent";
import { Cpu, Fingerprint, Nfc } from "lucide-react";

export default function TiltedCardDemo({
  tiltIntensity = 20,
  glareOpacity = 0.2,
  scaleOnHover = 1.04,
  color = "primary",
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
      className="w-full flex items-center justify-center bg-muted/50 rounded-2xl border border-border py-16 sm:py-24 px-4 relative overflow-hidden min-h-[500px] sm:min-h-[700px]"
    >

      <div className="w-full max-w-[340px] aspect-[3/4] relative z-10">
        <TiltedCard
          tiltIntensity={tiltIntensity}
          glareOpacity={glareOpacity}
          scaleOnHover={scaleOnHover}
        >
          {/* Card surface follows the theme's card colour. */}
          <div className="w-full h-full bg-gradient-to-br from-card via-card/90 to-muted/80 backdrop-blur-2xl border border-border/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">

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
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-sm border border-border/60"
                style={{ backgroundColor: accent, color: onAccent }}
              >
                <Nfc className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground/60" />
            </div>

            <div className="relative z-10 mt-auto">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Fingerprint className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
                <div className="h-1.5 w-12 sm:w-16 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-r from-transparent via-muted-foreground to-transparent animate-[shimmer_2s_infinite]" />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight uppercase mb-1 drop-shadow-sm">
                Access Key
              </h3>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground font-mono tracking-widest">
                ID // 0x8F92A
              </p>
            </div>
          </div>
        </TiltedCard>
      </div>
    </div>
  );
}
