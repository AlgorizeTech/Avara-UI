"use client";

import {
  GlassBackdrop,
  GlassPanel,
  type SurfaceVariant,
} from "@/components/custom/blocks/GlassPanelBlock";
import { cn } from "@/lib/utils";

const SHAPES = ["slab", "tile", "disc", "capsule"] as const;

export default function GlassPanelDemo({
  variant = "glass",
  example = "shapes",
  rounded = true,
}: {
  variant?: SurfaceVariant;
  /** `shapes` shows the four corner treatments; `bento` a small page layout. */
  example?: "shapes" | "bento";
  rounded?: boolean;
}) {
  if (example === "bento") {
    return (
      <GlassBackdrop
        variant={variant}
        aurora={["#f9a8d4", "#a5b4fc", "#fde68a"]}
        wrapperClassName={variant === "liquid-glass" ? "lg:w-full lg:max-w-full" : undefined}
        className={cn("w-full max-w-full h-auto min-h-0 lg:h-full lg:min-h-[520px]", rounded && "rounded-[var(--radius-3xl,2rem)]")}
      >
        <GlassPanel shape="slab" className="p-5 sm:p-8 md:col-span-4 lg:col-span-8">
          <p className="text-xs font-medium text-foreground/50">Slab</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">The hero surface</h2>
          <p className="mt-2 max-w-md text-sm text-foreground/60">
            One glass recipe — blur, hairline border, inset highlight — in four shapes. The radius tells the reader what
            level a panel is.
          </p>
        </GlassPanel>
        <GlassPanel shape="tile" interactive className="p-5 sm:p-6 md:col-span-2 lg:col-span-4">
          <p className="text-xs font-medium text-foreground/50">Tile, interactive</p>
          <p className="mt-2 text-sm">Lifts on hover and shows a pointer.</p>
        </GlassPanel>
        <div className="grid grid-cols-3 gap-4 md:col-span-3 lg:col-span-6">
          {[
            ["128", "Panels"],
            ["4", "Shapes"],
            ["2", "Surfaces"],
          ].map(([value, label]) => (
            <GlassPanel key={label} shape="disc" className="grid place-items-center text-center">
              <div>
                <p className="text-2xl font-semibold tabular-nums">{value}</p>
                <p className="text-[11px] text-foreground/50">{label}</p>
              </div>
            </GlassPanel>
          ))}
        </div>
        <div className="flex flex-wrap content-start gap-2 md:col-span-3 lg:col-span-6">
          {["Design systems", "Motion", "Accessibility", "React"].map((chip) => (
            <GlassPanel key={chip} shape="capsule" className="px-4 py-2 text-sm">
              {chip}
            </GlassPanel>
          ))}
        </div>
      </GlassBackdrop>
    );
  }

  return (
    <GlassBackdrop
      variant={variant}
      className={cn("w-full max-w-full h-auto min-h-0 lg:h-full lg:min-h-[320px]", rounded && "rounded-[var(--radius-3xl,2rem)]")}
    >
      {SHAPES.map((shape) => (
        <div key={shape} className="flex flex-col items-center gap-3 md:col-span-3 lg:col-span-3">
          <GlassPanel
            shape={shape}
            className={cn(
              "grid place-items-center text-sm font-medium",
              shape === "disc" ? "w-28" : shape === "capsule" ? "h-12 w-full" : "h-28 w-full",
            )}
          >
            {shape}
          </GlassPanel>
        </div>
      ))}
    </GlassBackdrop>
  );
}
