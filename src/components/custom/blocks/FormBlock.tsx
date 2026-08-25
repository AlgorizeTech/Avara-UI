"use client";

import { cn } from "@/lib/utils";
import React from "react";
import type { ReactNode } from "react";

// ==========================================
// DYNAMIC THEME ENGINE
// ==========================================
export type FormColor = "indigo" | "rose" | "emerald" | "zinc" | string;

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3)
    cleanHex = cleanHex
      .split("")
      .map((x) => x + x)
      .join("");
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "99, 102, 241";
};

export const getThemeStyles = (color: string) => {
  const isHex = color && color.startsWith("#");
  const rgb = isHex ? hexToRgb(color) : "99, 102, 241"; // Default indigo rgb

  // Map standard colors to tailwind variables if not hex
  const colorMap: Record<string, string> = {
    primary: "var(--primary)",
    indigo: "#4f46e5",
    rose: "#e11d48",
    emerald: "#10b981",
    zinc: "#18181b",
  };

  const finalColor = isHex ? color : colorMap[color] || colorMap.primary;
  // "primary" tracks the site theme (can be light or dark), so its
  // button text must track --primary-foreground instead of a fixed white.
  const finalForeground =
    !isHex && color === "primary" ? "var(--primary-foreground)" : "#ffffff";

  return {
    style: {
      "--theme-color": finalColor,
      "--theme-color-rgb": isHex ? rgb : hexToRgb(finalColor),
      "--theme-color-foreground": finalForeground,
    } as React.CSSProperties,
  };
};

// ==========================================
// FORM WRAPPER (High-Fidelity UI)
// ==========================================
export interface FormWrapperProps {
  children: ReactNode;
  color?: FormColor;
  title?: string;
  description?: string;
  className?: string;
  onSubmit?: (e: React.FormEvent) => void;
}

export function FormWrapper({
  children,
  color = "primary",
  title,
  description,
  className,
  onSubmit,
}: FormWrapperProps) {
  const { style } = getThemeStyles(color);

  return (
    <div style={style} className={cn("relative group w-full", className)}>
      {/* Animated Slim Glowing Border */}
      <div className="absolute -inset-[1px] rounded-2xl overflow-hidden pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_70%,var(--theme-color)_100%)] animate-[spin_3s_linear_infinite]" />
      </div>

      {/* Inner Container */}
      <div className="relative bg-white dark:bg-[#050505] border border-border rounded-2xl p-6 sm:p-10 h-full w-full z-10">
        {/* Header */}
        {(title || description) && (
          <div className="mb-8 border-b border-border pb-6">
            {title && (
              <h2 className="text-2xl font-black tracking-tight text-foreground">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm text-muted-foreground mt-2">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Form Body */}
        {onSubmit ? (
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            {children}
          </form>
        ) : (
          <div className="flex flex-col gap-6">{children}</div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// FORM ERROR (With Toggleable Glitch Effect)
// ==========================================
export function FormError({
  message,
  variant = "glitch",
}: {
  message?: string;
  variant?: "default" | "glitch";
}) {
  if (!message) return null;

  if (variant === "default") {
    return (
      <div className="mt-1 flex items-center gap-1.5 overflow-hidden">
        <div className="w-1 h-3 bg-red-500 shrink-0" />
        <span className="text-red-500 font-bold text-xs tracking-wider uppercase">
          {message}
        </span>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes glitch-anim-1 {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
          40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
          100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -1px); }
        }
        @keyframes glitch-anim-2 {
          0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
          20% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 2px); }
          40% { clip-path: inset(30% 0 20% 0); transform: translate(2px, -2px); }
          60% { clip-path: inset(70% 0 10% 0); transform: translate(-1px, 1px); }
          80% { clip-path: inset(20% 0 50% 0); transform: translate(1px, -1px); }
          100% { clip-path: inset(50% 0 30% 0); transform: translate(-2px, 1px); }
        }
        .glitch-text {
          position: relative;
          display: inline-block;
          font-weight: 700;
          color: #ef4444; /* red-500 */
        }
        .glitch-text::before, .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
        }
        .glitch-text::before {
          left: 1px;
          text-shadow: -1px 0 rgba(255, 0, 0, 0.7);
          animation: glitch-anim-1 2.5s infinite linear alternate-reverse;
        }
        .glitch-text::after {
          left: -1px;
          text-shadow: 1px 0 rgba(0, 0, 255, 0.7);
          animation: glitch-anim-2 3s infinite linear alternate-reverse;
        }
      `}</style>
      <div className="mt-1 flex items-center gap-1.5 overflow-hidden">
        <div className="w-1 h-3 bg-red-500 shrink-0" />
        <span
          className="glitch-text text-xs tracking-wider uppercase"
          data-text={message}
        >
          {message}
        </span>
      </div>
    </>
  );
}

// ==========================================
// FORM FIELD WRAPPER
// ==========================================
export function FormField({
  label,
  error,
  errorVariant = "glitch",
  children,
}: {
  label?: string;
  error?: string;
  errorVariant?: "default" | "glitch";
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          className={cn(
            "text-sm font-bold",
            error ? "text-red-500" : "text-foreground",
          )}
        >
          {label}
        </label>
      )}
      {children}
      <FormError message={error} variant={errorVariant} />
    </div>
  );
}

// ==========================================
// SUBMIT BUTTON (Matches Theme)
// ==========================================
export function FormSubmit({
  children,
  isSubmitting = false,
}: {
  children: ReactNode;
  isSubmitting?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="relative w-full overflow-hidden rounded-xl font-bold text-[var(--theme-color-foreground)] shadow-lg transition-transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group mt-2"
    >
      <div className="absolute inset-0 bg-[var(--theme-color)] transition-opacity group-hover:opacity-90" />
      <div className="relative px-6 py-3.5 flex items-center justify-center gap-2 w-full h-full">
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-[var(--theme-color-foreground)]/30 border-t-[var(--theme-color-foreground)] rounded-full animate-spin" />
        ) : (
          children
        )}
      </div>
    </button>
  );
}
