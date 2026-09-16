"use client";

import {
  CircularProgress,
  MultiProgress,
  Progress,
  ProgressField,
  ProgressSegment,
  ProgressSize,
  ProgressStatus,
  ProgressVariant,
} from "@/components/custom/blocks/ProgressBlock";
import { getThemeStyles } from "@/components/custom/blocks/animated-timeline-theme";
import { Play, RotateCcw, XOctagon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * A simulated upload the reader can run, fail and reset, so the stage
 * colours are seen changing rather than described: neutral while it starts,
 * the brand colour once under way, green when done, red on failure.
 */
function StagedOperation({
  variant,
  color,
}: {
  variant: ProgressVariant;
  color: string;
}) {
  const [value, setValue] = useState(0);
  const [status, setStatus] = useState<ProgressStatus>("active");
  const [running, setRunning] = useState(false);
  // Bumped on run/reset to remount the indicators, so a fresh run starts at
  // zero instead of tweening down from wherever the last one ended.
  const [run, setRun] = useState(0);
  const failAtRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setValue((v) => {
        const next = Math.min(100, v + 1);
        if (failAtRef.current !== null && next >= failAtRef.current) {
          setStatus("error");
          setRunning(false);
          return failAtRef.current;
        }
        if (next >= 100) {
          setStatus("success");
          setRunning(false);
        }
        return next;
      });
    }, 45);
    return () => clearInterval(timer);
  }, [running]);

  const start = () => {
    failAtRef.current = null;
    setValue(0);
    setStatus("active");
    setRunning(true);
    setRun((r) => r + 1);
  };
  const fail = () => {
    failAtRef.current = Math.max(value + 1, 60);
    if (!running) {
      setStatus("active");
      setRunning(true);
    }
  };
  const reset = () => {
    failAtRef.current = null;
    setRunning(false);
    setValue(0);
    setStatus("active");
    setRun((r) => r + 1);
  };

  const hint =
    status === "error"
      ? "Connection lost — the file was not uploaded."
      : status === "success"
        ? "Uploaded and verified."
        : running
          ? value < 10
            ? "Preparing…"
            : "Uploading…"
          : "Press Run to start.";

  // One value, one set of stages, drawn twice: the ring and the bar share
  // everything, so they always agree about how the upload is going.
  const stages = [
    { from: 0, color: "zinc" },
    { from: 10, color },
    { from: 100, color: "emerald" },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-8">
      <div key={run} className="flex flex-col sm:flex-row items-center gap-8 sm:gap-10">
        <CircularProgress
          value={value}
          max={100}
          variant={variant}
          barSize="lg"
          color={color}
          status={status}
          stages={stages}
          circleSize={160}
          tooltip
        />
        <ProgressField
          className="min-w-0 flex-1 w-full [&_label]:text-base [&_label+span]:text-base"
          label="brand-guidelines.pdf"
          value={value}
          max={100}
          status={status}
          hint={hint}
        >
          <Progress
            value={value}
            max={100}
            variant={variant}
            barSize="lg"
            color={color}
            status={status}
            stages={stages}
            tooltip
          />
        </ProgressField>
      </div>

      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
        <button
          type="button"
          onClick={start}
          disabled={running}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-foreground text-background text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-opacity cursor-pointer"
        >
          <Play className="w-4 h-4" /> Run
        </button>
        <button
          type="button"
          onClick={fail}
          disabled={status !== "active"}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <XOctagon className="w-4 h-4" /> Fail at 60%
        </button>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
      </div>
    </div>
  );
}

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
  showValue = true,
  tooltip = false,
  showAll,
  example = "field",
}: {
  value?: number;
  max?: number;
  variant?: ProgressVariant;
  barSize?: ProgressSize;
  color?: string;
  showValue?: boolean;
  tooltip?: boolean;
  /** Render-all modes: every visual variant, or every bar size, in one frame. */
  showAll?: "variants" | "sizes";
  /** "field" is the classic labelled layout; the others show narrower slices. */
  example?:
    | "field"
    | "stages"
    | "statuses"
    | "indeterminate"
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

  if (example === "stages") {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[360px] py-8 relative z-10 overflow-hidden">
        <StagedOperation variant={variant} color={color} />
      </div>
    );
  }

  if (example === "statuses") {
    const rows: { status: ProgressStatus; label: string; value: number; hint: string }[] = [
      { status: "active", label: "Syncing photos", value: 42, hint: "About 2 minutes left." },
      { status: "warning", label: "Syncing videos", value: 71, hint: "Slow connection — still going." },
      { status: "error", label: "Syncing documents", value: 58, hint: "Connection lost. Retry to resume." },
      { status: "success", label: "Syncing contacts", value: 100, hint: "Everything is up to date." },
    ];
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[220px] relative z-10 overflow-hidden">
        <div className="w-full max-w-md mx-auto flex flex-col gap-6">
          {rows.map((row) => (
            <ProgressField
              key={row.status}
              label={row.label}
              value={row.value}
              max={max}
              status={row.status}
              hint={row.hint}
            >
              <Progress
                value={row.value}
                max={max}
                variant={variant}
                barSize={barSize}
                color={color}
                status={row.status}
              />
            </ProgressField>
          ))}
        </div>
      </div>
    );
  }

  if (example === "indeterminate") {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[220px] relative z-10 overflow-hidden">
        <div className="w-full max-w-md mx-auto">
          <ProgressField label="Scanning library" showValue={false} hint="This can take a while for large libraries.">
            <Progress indeterminate variant={variant} barSize={barSize} color={color} />
          </ProgressField>
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
            tooltip={tooltip}
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
          showValue={showValue}
          tooltip={tooltip}
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
          showValue={showValue}
          tooltip={tooltip}
        >
          {(shown) => (
            <>
              <span className="text-3xl font-bold tabular-nums">{shown}</span>
              <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                of {max} credits
              </span>
            </>
          )}
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
          showValue={showValue}
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
