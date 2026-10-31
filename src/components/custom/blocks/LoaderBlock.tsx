"use client";

import { cn } from "@/lib/utils";
import { getThemeColor } from "./loader-theme";

// ==========================================
// DYNAMIC THEME ENGINE
// ==========================================
export type LoaderColor =
  | "indigo"
  | "rose"
  | "emerald"
  | "zinc"
  | "blue"
  | "amber"
  | string;
export type LoaderVariant =
  | "spinner"
  | "dots"
  | "pulse"
  | "ring"
  | "bar"
  | "orbit";
export type LoaderSize = "sm" | "md" | "lg" | "xl";
export type LoaderDirection = "single" | "dual";

// ==========================================
// PROPS & MAIN COMPONENT
// ==========================================
export interface LoaderBlockProps {
  variant?: LoaderVariant;
  size?: LoaderSize;
  color?: LoaderColor;
  secondaryColor?: LoaderColor;
  direction?: LoaderDirection;
  text?: string;
  className?: string;
}

export function LoaderBlock({
  variant = "spinner",
  size = "md",
  color = "primary",
  secondaryColor,
  direction = "single",
  text,
  className,
}: LoaderBlockProps) {
  const themeColor = getThemeColor(color);
  const secondaryThemeColor = secondaryColor
    ? getThemeColor(secondaryColor)
    : color === "emerald"
    ? "#6366f1"
    : "#10b981";

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const orbitSizeClasses = {
    sm: "w-5 h-5",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-20 h-20",
  };

  const barSizeClasses = {
    sm: "w-16 h-1",
    md: "w-32 h-1.5",
    lg: "w-48 h-2",
    xl: "w-64 h-3",
  };

  const textClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  const currentSize =
    variant === "bar"
      ? barSizeClasses[size]
      : variant === "orbit" || variant === "ring"
      ? orbitSizeClasses[size]
      : sizeClasses[size];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className,
      )}
    >
      {/* Premium Custom Keyframes */}
      <style>{`
        @keyframes wave {
          0%, 60%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          30% { transform: translateY(-4px) scale(1.2); opacity: 1; }
        }
        @keyframes indeterminate {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes spin-fast {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-wave { animation: wave 1.2s ease-in-out infinite; }
        .animate-indet { animation: indeterminate 1.5s infinite linear; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 0.85s linear infinite; }
        .animate-spin-fast { animation: spin-fast 0.85s linear infinite; }
      `}</style>

      <div
        className={cn(
          "relative flex items-center justify-center",
          (variant === "orbit" || variant === "ring") &&
            "aspect-square rounded-full shrink-0",
          currentSize,
        )}
      >
        {variant === "spinner" && <Spinner color={themeColor} />}
        {variant === "dots" && <Dots color={themeColor} />}
        {variant === "pulse" && <Pulse color={themeColor} />}
        {(variant === "orbit" || variant === "ring") && (
          <OrbitRing
            color={themeColor}
            secondaryColor={secondaryThemeColor}
            direction={direction}
          />
        )}
        {variant === "bar" && <Bar color={themeColor} />}
      </div>

      {text && (
        <span
          className={cn(
            "font-medium text-muted-foreground animate-pulse",
            textClasses[size],
          )}
        >
          {text}
        </span>
      )}
    </div>
  );
}

// ==========================================
// VARIANTS
// ==========================================
function Spinner({ color }: { color: string }) {
  return (
    <svg
      className="animate-spin w-full h-full"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        className="opacity-100"
        fill={color}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function Dots({ color }: { color: string }) {
  return (
    <div className="flex items-center justify-center gap-1.5 w-full h-full">
      <div
        className="w-[25%] h-[25%] rounded-full animate-wave"
        style={{ backgroundColor: color, animationDelay: "0s" }}
      />
      <div
        className="w-[25%] h-[25%] rounded-full animate-wave"
        style={{ backgroundColor: color, animationDelay: "0.15s" }}
      />
      <div
        className="w-[25%] h-[25%] rounded-full animate-wave"
        style={{ backgroundColor: color, animationDelay: "0.3s" }}
      />
    </div>
  );
}

function Pulse({ color }: { color: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="absolute w-full h-full rounded-full animate-ping opacity-75"
        style={{ backgroundColor: color }}
      />
      <div
        className="relative w-[50%] h-[50%] rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

function OrbitRing({
  color,
  secondaryColor,
  direction = "single",
}: {
  color: string;
  secondaryColor: string;
  direction?: LoaderDirection;
}) {
  const isDual = direction === "dual";

  return (
    <div className="relative w-full h-full aspect-square rounded-full flex items-center justify-center shrink-0">
      {/* Outer Orbit: Full Faint Track & Rounded Active Arc */}
      <svg
        className="animate-spin absolute inset-0 w-full h-full aspect-square overflow-visible"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="24"
          cy="24"
          r="21"
          stroke={color}
          strokeWidth="3.2"
          className="opacity-25"
        />
        <circle
          cx="24"
          cy="24"
          r="21"
          stroke={color}
          strokeWidth="3.2"
          strokeDasharray="34 98"
          strokeLinecap="round"
        />
      </svg>

      {/* Inner Orbit: Full Faint Track & Rounded Arc (Single: same direction, Dual: counter-spin) */}
      <svg
        className={cn(
          "absolute inset-0 w-full h-full aspect-square overflow-visible",
          isDual ? "animate-spin-reverse" : "animate-spin-fast",
        )}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="24"
          cy="24"
          r="13"
          stroke={secondaryColor}
          strokeWidth="2.6"
          className="opacity-35"
        />
        <circle
          cx="24"
          cy="24"
          r="13"
          stroke={secondaryColor}
          strokeWidth="2.6"
          strokeDasharray="25 57"
          strokeLinecap="round"
        />
      </svg>

      {/* Core Center: Mathematically Perfect Pulsing Rounded Circle Dot */}
      <svg
        className="absolute inset-0 w-full h-full aspect-square pointer-events-none"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="24"
          cy="24"
          r="3.6"
          fill={color}
          className="animate-pulse"
        />
      </svg>
    </div>
  );
}

function Bar({ color }: { color: string }) {
  return (
    <div className="w-full h-full overflow-hidden rounded-full bg-muted">
      <div
        className="h-full w-[50%] rounded-full animate-indet"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
