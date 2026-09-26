"use client";

import {
  type FrameHandles,
  type FrameLine,
  SelectionFrame,
} from "@/components/custom/blocks/SelectionFrameBlock";

const colorMap: Record<string, string> = {
  indigo: "#6366f1",
  rose: "#f43f5e",
  emerald: "#10b981",
  lavender: "#9b8afb",
  amber: "#f59e0b",
  blue: "#0d99ff",
};

const getThemeColor = (c: string) => {
  if (c.startsWith("#")) return c;
  return colorMap[c] || "var(--primary)";
};

const HEADLINE = "text-[28px] font-semibold text-foreground";

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
    {children}
  </span>
);

export default function SelectionFrameDemo({
  color = "primary",
  handles = "square",
  line = "solid",
  animated = false,
  padding = 4,
  radius = 0,
  example = "default",
}: {
  color?: string;
  handles?: FrameHandles;
  line?: FrameLine;
  animated?: boolean;
  padding?: number;
  radius?: number;
  /** Which preview to render. */
  example?: "default" | "handles" | "lines" | "animated" | "usage" | "block";
}) {
  const accent = getThemeColor(color);

  if (example === "handles") {
    return (
      <div className="w-full flex flex-wrap items-center justify-center gap-x-16 gap-y-12 min-h-[300px] px-6 relative z-10">
        {(["square", "circle"] as const).map((h) => (
          <div key={h} className="flex flex-col items-center gap-5">
            <SelectionFrame handles={h} padding={6} color={accent} line={line}>
              <span className={HEADLINE}>Handles</span>
            </SelectionFrame>
            <Label>{h}</Label>
          </div>
        ))}
      </div>
    );
  }

  if (example === "lines") {
    const lines: Array<{ label: string; line: FrameLine; dash?: [number, number] }> = [
      { label: "solid", line: "solid" },
      { label: "dashed · [4, 4]", line: "dashed" },
      { label: "long · [10, 6]", line: "long" },
      { label: 'dashed · dash={[1, 3]}', line: "dashed", dash: [1, 3] },
    ];
    return (
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 place-items-center gap-x-12 gap-y-12 min-h-[300px] px-6 py-10 relative z-10">
        {lines.map((l) => (
          <div key={l.label} className="flex flex-col items-center gap-5">
            <SelectionFrame line={l.line} dash={l.dash} padding={6} color={accent} handles={handles}>
              <span className={HEADLINE}>Lines</span>
            </SelectionFrame>
            <Label>{l.label}</Label>
          </div>
        ))}
      </div>
    );
  }

  if (example === "animated") {
    return (
      <div className="w-full flex flex-wrap items-center justify-center gap-x-16 gap-y-12 min-h-[300px] px-6 relative z-10">
        <div className="flex flex-col items-center gap-5">
          <SelectionFrame animated line="dashed" padding={6} color={accent}>
            <span className={HEADLINE}>Marching</span>
          </SelectionFrame>
          <Label>animated · dashed</Label>
        </div>
        <div className="flex flex-col items-center gap-5">
          <SelectionFrame animated line="long" color="#e11d48" handles="circle" padding={6}>
            <span className={HEADLINE}>Ants</span>
          </SelectionFrame>
          <Label>animated · long · circle</Label>
        </div>
      </div>
    );
  }

  if (example === "usage") {
    return (
      <div className="w-full flex items-center justify-center min-h-[300px] px-6 relative z-10">
        <span className="text-[42px] font-semibold leading-tight text-center text-foreground">
          Draw attention to what{" "}
          <SelectionFrame animated line="dashed" padding={4} handles="circle" color={accent}>
            matters
          </SelectionFrame>
        </span>
      </div>
    );
  }

  if (example === "block") {
    return (
      <div className="w-full flex items-center justify-center min-h-[300px] px-6 py-10 relative z-10">
        <SelectionFrame
          inline={false}
          radius={radius}
          padding={padding}
          color={accent}
          handles={handles}
          line={line}
          animated={animated}
          className="w-full max-w-xs"
        >
          <div className="rounded-xl border border-border bg-card text-card-foreground p-5 space-y-3">
            <div className="h-24 rounded-lg bg-gradient-to-br from-sky-400/70 to-indigo-500/70" />
            <div className="space-y-1.5">
              <p className="text-sm font-semibold text-foreground">Hero / Cover</p>
              <p className="text-xs text-muted-foreground">1440 × 720 · Auto layout</p>
            </div>
          </div>
        </SelectionFrame>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center min-h-[300px] px-6 relative z-10">
      <SelectionFrame
        padding={6}
        color={accent}
        handles={handles}
        line={line}
        animated={animated}
        radius={radius}
      >
        <span className={HEADLINE}>Consistent by Default</span>
      </SelectionFrame>
    </div>
  );
}
