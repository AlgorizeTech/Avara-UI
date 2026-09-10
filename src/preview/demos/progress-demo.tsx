"use client";

import { CircularProgress, MultiProgress, Progress, ProgressField, ProgressSegment, ProgressSize, ProgressVariant } from "@/components/custom/blocks/ProgressBlock";
import { getThemeStyles } from "@/components/custom/blocks/animated-timeline-theme";

/** Legend swatch — reuses the block's own theme table so a dot and its
 *  segment can never drift apart. */
function LegendDot({ color }: { color: string }) {
  const { theme, style } = getThemeStyles(color);
  return (
    <span
      className={`inline-block size-2.5 rounded-full ${theme.bg}`}
      style={style}
    />
  );
}

/** The segments behind the multi-colour breakdown, in draw order. */
const STORAGE_BREAKDOWN = [
  { label: "Photos", value: 34, color: "emerald" },
  { label: "Videos", value: 21, color: "rose" },
  { label: "System", value: 9, color: "zinc" },
];

export default function ProgressDemo({
  value = 45,
  max = 100,
  variant = "glow",
  barSize = "md",
  color = "primary",
  showAll,
  example = "field",
}: {
  value?: number;
  max?: number;
  variant?: ProgressVariant;
  barSize?: ProgressSize;
  color?: string;
  /** Render-all modes: every visual variant, or every bar size, in one frame. */
  showAll?: "variants" | "sizes";
  /** "field" is the classic labelled layout; the others show narrower slices. */
  example?:
    | "field"
    | "bare"
    | "formatted"
    | "steps"
    | "multi"
    | "multi-colors"
    | "circular"
    | "circular-custom";
}) {
  if (showAll) {
    const variants: ProgressVariant[] = ["default", "glass", "glow", "minimal"];
    const sizes: ProgressSize[] = ["sm", "md", "lg"];

    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[220px] relative z-10 overflow-hidden">
        <div className="w-full max-w-md mx-auto flex flex-col gap-6">
          {showAll === "variants"
            ? variants.map((v) => (
                <ProgressField key={v} label={v} value={value} max={max}>
                  <Progress
                    value={value}
                    max={max}
                    variant={v}
                    color={color}
                    barSize={barSize}
                  />
                </ProgressField>
              ))
            : sizes.map((s) => (
                <ProgressField key={s} label={`barSize="${s}"`} value={value} max={max}>
                  <Progress
                    value={value}
                    max={max}
                    variant={variant}
                    color={color}
                    barSize={s}
                  />
                </ProgressField>
              ))}
        </div>
      </div>
    );
  }

  if (example === "bare") {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[220px] relative z-10 overflow-hidden">
        <div className="w-full max-w-md mx-auto">
          <Progress
            value={value}
            max={max}
            variant={variant}
            color={color}
            barSize={barSize}
          />
        </div>
      </div>
    );
  }

  if (example === "formatted") {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[220px] relative z-10 overflow-hidden">
        <div className="w-full max-w-md mx-auto">
          <ProgressField
            label="Storage Usage"
            value={value}
            max={max}
            valueFormat={(val, m) => `${val} GB / ${m} GB`}
          >
            <Progress
              value={value}
              max={max}
              variant={variant}
              color={color}
              barSize={barSize}
            />
          </ProgressField>
        </div>
      </div>
    );
  }

  if (example === "multi") {
    // One track, three phases of the same release — different levels, one hue.
    const phases = [
      { label: "Merged", value: 30 },
      { label: "In review", value: 18 },
      { label: "Drafted", value: 11 },
    ];
    const shipped = phases.reduce((sum, p) => sum + p.value, 0);

    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[220px] relative z-10 overflow-hidden">
        <div className="w-full max-w-md mx-auto">
          <ProgressField
            label="Release 2.4 progress"
            value={shipped}
            max={max}
            valueFormat={(val, m) => `${val} / ${m} tasks`}
          >
            <MultiProgress max={max} variant={variant} barSize={barSize} gap={3}>
              {phases.map((phase) => (
                <ProgressSegment
                  key={phase.label}
                  value={phase.value}
                  color={color}
                  label={`${phase.label}: ${phase.value}`}
                />
              ))}
            </MultiProgress>
          </ProgressField>
        </div>
      </div>
    );
  }

  if (example === "multi-colors") {
    // Same track, but every slice carries its own colour and a legend entry.
    const segments = [
      { label: "Documents", value: 18, color },
      ...STORAGE_BREAKDOWN,
    ];
    const used = segments.reduce((sum, s) => sum + s.value, 0);

    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[220px] relative z-10 overflow-hidden">
        <div className="w-full max-w-md mx-auto">
          <ProgressField
            label="Storage breakdown"
            value={used}
            max={max}
            valueFormat={(val, m) => `${val} GB / ${m} GB`}
          >
            <MultiProgress max={max} variant={variant} barSize={barSize}>
              {segments.map((segment) => (
                <ProgressSegment
                  key={segment.label}
                  value={segment.value}
                  color={segment.color}
                  label={`${segment.label}: ${segment.value} GB`}
                />
              ))}
            </MultiProgress>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1">
              {segments.map((segment) => (
                <span
                  key={segment.label}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <LegendDot color={segment.color} />
                  {segment.label}
                  <span className="font-semibold text-foreground">
                    {segment.value} GB
                  </span>
                </span>
              ))}
            </div>
          </ProgressField>
        </div>
      </div>
    );
  }

  if (example === "circular") {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[220px] relative z-10 overflow-hidden">
        <CircularProgress
          value={value}
          max={max}
          variant={variant}
          color={color}
          barSize={barSize}
          circleSize={140}
        />
      </div>
    );
  }

  if (example === "circular-custom") {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[220px] relative z-10 overflow-hidden">
        <CircularProgress
          value={value}
          max={max}
          variant={variant}
          color={color}
          barSize={barSize}
          circleSize={160}
        >
          <span className="text-3xl font-bold tabular-nums">{value}</span>
          <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            of {max} credits
          </span>
        </CircularProgress>
      </div>
    );
  }

  if (example === "steps") {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[220px] relative z-10 overflow-hidden">
        <div className="w-full max-w-md mx-auto">
          <ProgressField
            label="Step 2 of 4 — Billing details"
            value={value}
            max={max}
            showValue={false}
          >
            <Progress
              value={value}
              max={max}
              variant={variant}
              color={color}
              barSize={barSize}
            />
          </ProgressField>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[220px] relative z-10 overflow-hidden">
      <div className="w-full max-w-md mx-auto">
        <ProgressField
          label="Database Synchronization Pipeline"
          value={value}
          max={max}
        >
          <Progress
            value={value}
            max={max}
            variant={variant}
            color={color}
            barSize={barSize}
          />
        </ProgressField>
      </div>
    </div>
  );
}
