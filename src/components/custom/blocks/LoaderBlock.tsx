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
export type LoaderVariant = "spinner" | "dots" | "pulse" | "ring" | "bar";
export type LoaderSize = "sm" | "md" | "lg" | "xl";

// ==========================================
// PROPS & MAIN COMPONENT
// ==========================================
export interface LoaderBlockProps {
  variant?: LoaderVariant;
  size?: LoaderSize;
  color?: LoaderColor;
  text?: string;
  className?: string;
}

export function LoaderBlock({
  variant = "spinner",
  size = "md",
  color = "primary",
  text,
  className,
}: LoaderBlockProps) {
  const themeColor = getThemeColor(color);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
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
    variant === "bar" ? barSizeClasses[size] : sizeClasses[size];

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
        .animate-wave { animation: wave 1.2s ease-in-out infinite; }
        .animate-indet { animation: indeterminate 1.5s infinite linear; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 2s linear infinite; }
      `}</style>

      <div
        className={cn("relative flex items-center justify-center", currentSize)}
      >
        {variant === "spinner" && <Spinner color={themeColor} />}
        {variant === "dots" && <Dots color={themeColor} />}
        {variant === "pulse" && <Pulse color={themeColor} />}
        {variant === "ring" && <Ring color={themeColor} />}
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

function Ring({ color }: { color: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="absolute w-full h-full rounded-full border-[3px] border-transparent border-t-current animate-spin-slow opacity-80"
        style={{ color }}
      />
      <div
        className="absolute w-[70%] h-[70%] rounded-full border-[3px] border-transparent border-b-current animate-spin-reverse opacity-60"
        style={{ color }}
      />
      <div
        className="absolute w-[40%] h-[40%] rounded-full"
        style={{ backgroundColor: color }}
      />
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
