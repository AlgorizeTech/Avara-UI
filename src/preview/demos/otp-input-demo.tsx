"use client";

import {
  OtpInputBlock,
  OtpVariant,
} from "@/components/custom/blocks/OtpInputBlock";
import { CheckCircle2, KeyRound } from "lucide-react";
import { useState } from "react";

const colorMap: Record<string, string> = {
  indigo: "#4f46e5",
  rose: "#e11d48",
  emerald: "#10b981",
  zinc: "#3f3f46",
  amber: "#f59e0b",
  blue: "#3b82f6",
};

const getThemeColor = (color: string) => {
  if (color.startsWith("#")) return color;
  return colorMap[color] || "var(--primary)";
};

export default function OtpInputDemo({
  variant = "default",
  length = 6,
  isMasked = false,
  isDisabled = false,
  color = "primary",
  showAll,
}: {
  variant?: OtpVariant;
  length?: number;
  isMasked?: boolean;
  isDisabled?: boolean;
  color?: string;
  /** Render-all mode: every supported length in one frame. */
  showAll?: "lengths";
}) {
  const [currentValue, setCurrentValue] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [lengthValues, setLengthValues] = useState<Record<number, string>>({});

  const activeColor = getThemeColor(color);
  const containerStyle = activeColor
    ? ({ "--primary": activeColor } as React.CSSProperties)
    : undefined;

  const handleComplete = (_val: string) => {
    setIsComplete(true);
    // Simulate a fake verify load
    setTimeout(() => {
      setIsComplete(false);
    }, 2000);
  };

  if (showAll === "lengths") {
    return (
      <div
        className="w-full flex flex-col items-center justify-center min-h-[400px] relative z-10"
        style={containerStyle}
      >
        <div className="flex w-full max-w-sm flex-col items-center gap-8">
          {[4, 6, 8].map((len) => (
            <div key={len} className="flex w-full flex-col items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                {len} digits
              </span>
              <OtpInputBlock
                length={len}
                value={lengthValues[len] ?? ""}
                onChange={(val) =>
                  setLengthValues((prev) => ({ ...prev, [len]: val }))
                }
                variant={variant}
                color={color}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full flex flex-col items-center justify-center min-h-[400px] relative z-10"
      style={containerStyle}
    >
      <div className="flex flex-col items-center max-w-sm w-full text-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-2 text-zinc-900 dark:text-white">
            <KeyRound className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white tracking-tight">
            Two-Step Verification
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Please enter the {length}-digit code sent to your email address.
            <br />
            <span className="opacity-60 text-xs mt-1 block">
              (Try pasting a code!)
            </span>
          </p>
        </div>

        <OtpInputBlock
          key={`${variant}-${length}-${isMasked}-${color}`}
          length={length}
          value={currentValue}
          onChange={setCurrentValue}
          onComplete={handleComplete}
          variant={variant}
          color={color}
          mask={isMasked}
          disabled={isDisabled || isComplete}
        />

        <div className="h-10 flex items-center justify-center">
          {isComplete ? (
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 animate-in fade-in slide-in-from-bottom-2">
              <CheckCircle2 className="w-4 h-4" />
              Verified Successfully
            </div>
          ) : (
            <button
              disabled={currentValue.length !== length || isDisabled}
              onClick={() => handleComplete(currentValue)}
              className="px-6 py-2 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Verify Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
