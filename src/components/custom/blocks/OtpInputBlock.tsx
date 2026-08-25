"use client";

import { cn } from "@/lib/utils";
import React, { forwardRef, useEffect, useRef, useState } from "react";

// ==========================================
// CONFIGURATION
// ==========================================
export type OtpVariant = "default" | "filled" | "underlined";
export type OtpColor = "indigo" | "rose" | "emerald" | "zinc" | (string & {});

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    focusRing: "focus:ring-primary focus:border-primary",
    text: "text-primary",
    border: "border-primary",
  },
  indigo: {
    focusRing: "focus:ring-indigo-500 focus:border-indigo-500",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-500",
  },
  rose: {
    focusRing: "focus:ring-rose-500 focus:border-rose-500",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-500",
  },
  emerald: {
    focusRing: "focus:ring-emerald-500 focus:border-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500",
  },
  zinc: {
    focusRing:
      "focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-zinc-900 dark:focus:border-zinc-100",
    text: "text-zinc-900 dark:text-zinc-100",
    border: "border-zinc-900 dark:border-zinc-100",
  },
};

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
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: {
        focusRing:
          "focus:ring-[var(--otp-color)] focus:border-[var(--otp-color)]",
        text: "text-[var(--otp-color)]",
        border: "border-[var(--otp-color)]",
      },
      style: {
        "--otp-color": color,
        "--otp-color-rgb": rgb,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};

// ==========================================
// COMPONENT
// ==========================================
export interface OtpInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  mask?: boolean;
  variant?: OtpVariant;
  color?: OtpColor;
  disabled?: boolean;
}

export const OtpInputBlock = forwardRef<HTMLDivElement, OtpInputProps>(
  (
    {
      length = 6,
      value = "",
      onChange,
      onComplete,
      mask = false,
      variant = "default",
      color = "primary",
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const { theme, style } = getThemeStyles(color as string);
    const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Sync external value to internal array state
    useEffect(() => {
      if (value !== undefined) {
        const valArray = value.split("").slice(0, length);
        const paddedArray = [
          ...valArray,
          ...Array(length - valArray.length).fill(""),
        ];
        setOtp(paddedArray);
      }
    }, [value, length]);

    const triggerChange = (newOtp: string[]) => {
      const otpString = newOtp.join("");
      if (onChange) onChange(otpString);
      if (onComplete && otpString.length === length) {
        onComplete(otpString);
      }
    };

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number,
    ) => {
      const val = e.target.value;
      if (isNaN(Number(val)) && val !== "") return; // Only allow numbers (Optional: remove this to allow alphanumeric)

      const newOtp = [...otp];
      // Only take the last character typed to handle fast typing
      newOtp[index] = val.substring(val.length - 1);
      setOtp(newOtp);
      triggerChange(newOtp);

      // Move to next input if value is typed
      if (val !== "" && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      index: number,
    ) => {
      if (e.key === "Backspace") {
        if (!otp[index] && index > 0) {
          // If current is empty, move to previous and clear it
          const newOtp = [...otp];
          newOtp[index - 1] = "";
          setOtp(newOtp);
          triggerChange(newOtp);
          inputRefs.current[index - 1]?.focus();
        } else {
          // Normal clear
          const newOtp = [...otp];
          newOtp[index] = "";
          setOtp(newOtp);
          triggerChange(newOtp);
        }
      }

      // Arrow navigation
      if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        inputRefs.current[index - 1]?.focus();
        inputRefs.current[index - 1]?.select();
      }
      if (e.key === "ArrowRight" && index < length - 1) {
        e.preventDefault();
        inputRefs.current[index + 1]?.focus();
        inputRefs.current[index + 1]?.select();
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData
        .getData("text/plain")
        .slice(0, length)
        .split("");

      // Filter out non-numeric characters if desired
      const numericData = pastedData.filter(
        (char) => !isNaN(Number(char)) && char !== " ",
      );

      if (numericData.length === 0) return;

      const newOtp = [...otp];
      numericData.forEach((char, i) => {
        if (i < length) newOtp[i] = char;
      });

      setOtp(newOtp);
      triggerChange(newOtp);

      // Focus the next empty input, or the last input if full
      const nextEmptyIndex = newOtp.findIndex((val) => val === "");
      const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;
      inputRefs.current[focusIndex]?.focus();
    };

    const getVariantStyles = () => {
      // Fluid sizing: each box is an equal share of the row (never wider than
      // 3rem) so any length fits its container instead of overflowing it.
      // `min-w-0` is required — an input's intrinsic width (size=20) would
      // otherwise block flex shrinking. Font and corner radius scale with the
      // container width divided by the digit count, so 8 digits stay legible on
      // a phone and small boxes don't read as pills. Both cap at the values the
      // 48px box used, leaving 4/6 digits looking exactly as before.
      const base =
        "min-w-0 flex-1 basis-0 max-w-12 aspect-[5/6] px-0 text-center text-[clamp(0.8125rem,calc(38cqw/var(--otp-len,6)),1.25rem)] rounded-[clamp(0.375rem,calc(20cqw/var(--otp-len,6)),0.75rem)] font-bold transition-all duration-200 outline-none placeholder:text-zinc-300 dark:placeholder:text-zinc-700";

      switch (variant) {
        case "filled":
          return cn(
            base,
            "border border-transparent bg-muted hover:bg-muted",
            "focus:bg-background focus:ring-2",
            theme.focusRing,
          );
        case "underlined":
          return cn(
            base,
            "rounded-none border-0 border-b-2 border-border bg-transparent px-0",
            "focus:ring-0",
            theme.border,
          );
        case "default":
        default:
          return cn(
            base,
            "border border-border bg-white dark:bg-[#09090b] shadow-sm",
            "focus:ring-2",
            theme.focusRing,
          );
      }
    };

    const inputClasses = getVariantStyles();

    return (
      <div
        ref={ref}
        className={cn(
          "@container/otp flex w-full max-w-full items-center justify-center",
          length > 6 ? "gap-1.5 sm:gap-2 md:gap-3" : "gap-2 sm:gap-3",
          className,
        )}
        style={{ ...style, "--otp-len": length } as React.CSSProperties}
        {...props}
      >
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type={mask ? "password" : "text"}
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="\d*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            disabled={disabled}
            className={cn(
              inputClasses,
              digit ? theme.text : "text-foreground",
              disabled && "opacity-50 cursor-not-allowed",
            )}
            aria-label={`Digit ${index + 1} of ${length}`}
          />
        ))}
      </div>
    );
  },
);
OtpInputBlock.displayName = "OtpInputBlock";
