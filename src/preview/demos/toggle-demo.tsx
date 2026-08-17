"use client";

import { Toggle } from "@/components/custom/blocks/ToggleBlock";
import { Bold, Italic, Mic, MicOff, Underline } from "lucide-react";
import { useState } from "react";

export default function ToggleDemo({
  variant = "default",
  size = "md",
  format: initialFormat = { bold: false, italic: true, underline: false },
  muted: initialMuted = false,
  example,
}: {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  format?: { bold: boolean; italic: boolean; underline: boolean };
  muted?: boolean;
  /** Single-example modes; omitted renders the full two-group demo. */
  example?: "single" | "sizes" | "toolbar" | "text" | "disabled";
}) {
  // States for the rich text editor demo
  const [format, setFormat] = useState(initialFormat);
  const [muted, setMuted] = useState(initialMuted);
  const [single, setSingle] = useState(false);

  if (example === "single" || example === "disabled") {
    return (
      <div className="w-full flex items-center justify-center min-h-[300px] relative z-10">
        <Toggle
          variant={variant}
          size={size}
          pressed={example === "disabled" ? true : single}
          onPressedChange={setSingle}
          disabled={example === "disabled"}
          aria-label="Toggle bold"
        >
          <Bold className="w-4 h-4" />
        </Toggle>
      </div>
    );
  }

  // Scalar prop — every size shares a single frame.
  if (example === "sizes") {
    return (
      <div className="w-full flex items-center justify-center gap-4 min-h-[300px] relative z-10">
        {(["sm", "md", "lg"] as const).map((s) => (
          <Toggle key={s} variant={variant} size={s} aria-label={`Toggle bold (${s})`}>
            <Bold className="w-4 h-4" />
          </Toggle>
        ))}
      </div>
    );
  }

  if (example === "text") {
    return (
      <div className="w-full flex items-center justify-center min-h-[300px] relative z-10">
        <Toggle
          variant={variant}
          size={size}
          pressed={muted}
          onPressedChange={setMuted}
          className={
            muted
              ? "text-red-600 data-[state=on]:text-red-600 data-[state=on]:bg-red-50 dark:data-[state=on]:bg-red-500/10 dark:data-[state=on]:text-red-400"
              : ""
          }
        >
          {muted ? (
            <MicOff className="w-4 h-4 mr-2" />
          ) : (
            <Mic className="w-4 h-4 mr-2" />
          )}
          {muted ? "Unmute" : "Mute"}
        </Toggle>
      </div>
    );
  }

  if (example === "toolbar") {
    return (
      <div className="w-full flex items-center justify-center min-h-[300px] relative z-10">
        <div className="flex items-center p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0a0a0a] shadow-sm">
          <Toggle
            variant={variant}
            size={size}
            pressed={format.bold}
            onPressedChange={(v) => setFormat({ ...format, bold: v })}
            aria-label="Toggle bold"
          >
            <Bold className="w-4 h-4" />
          </Toggle>
          <Toggle
            variant={variant}
            size={size}
            pressed={format.italic}
            onPressedChange={(v) => setFormat({ ...format, italic: v })}
            aria-label="Toggle italic"
          >
            <Italic className="w-4 h-4" />
          </Toggle>
          <Toggle
            variant={variant}
            size={size}
            pressed={format.underline}
            onPressedChange={(v) => setFormat({ ...format, underline: v })}
            aria-label="Toggle underline"
          >
            <Underline className="w-4 h-4" />
          </Toggle>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[300px] gap-12 relative z-10">
      {/* Group 1: Editor Toolbar Example */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-medium text-zinc-500">
          Rich Text Formatting
        </p>
        <div className="flex items-center p-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0a0a0a] shadow-sm">
          <Toggle
            variant={variant}
            size={size}
            pressed={format.bold}
            onPressedChange={(v) => setFormat({ ...format, bold: v })}
            aria-label="Toggle bold"
          >
            <Bold className="w-4 h-4" />
          </Toggle>
          <Toggle
            variant={variant}
            size={size}
            pressed={format.italic}
            onPressedChange={(v) => setFormat({ ...format, italic: v })}
            aria-label="Toggle italic"
          >
            <Italic className="w-4 h-4" />
          </Toggle>
          <Toggle
            variant={variant}
            size={size}
            pressed={format.underline}
            onPressedChange={(v) => setFormat({ ...format, underline: v })}
            aria-label="Toggle underline"
          >
            <Underline className="w-4 h-4" />
          </Toggle>
        </div>
      </div>

      {/* Group 2: Independent Action Example */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-medium text-zinc-500">
          State Toggle (with text)
        </p>
        <Toggle
          variant={variant}
          size={size}
          pressed={muted}
          onPressedChange={setMuted}
          className={
            muted
              ? "text-red-600 data-[state=on]:text-red-600 data-[state=on]:bg-red-50 dark:data-[state=on]:bg-red-500/10 dark:data-[state=on]:text-red-400"
              : ""
          }
        >
          {muted ? (
            <MicOff className="w-4 h-4 mr-2" />
          ) : (
            <Mic className="w-4 h-4 mr-2" />
          )}
          {muted ? "Unmute" : "Mute"}
        </Toggle>
      </div>
    </div>
  );
}
