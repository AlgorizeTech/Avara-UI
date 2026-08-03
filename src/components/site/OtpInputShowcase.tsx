"use client";

import {
  OtpColor,
  OtpInputBlock,
  OtpVariant,
} from "@/components/custom/blocks/OtpInputBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { VariantTabs } from "@/components/site/VariantTabs";
import { CheckCircle2, KeyRound } from "lucide-react";
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const OTP_ENGINE_CODE_TS = `"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type OtpVariant = "default" | "filled" | "underlined";
export type OtpColor = "indigo" | "rose" | "emerald" | "zinc" | (string & {});

const colorThemes: Record<string, Record<string, string>> = {
  primary: { focusRing: "focus:ring-primary focus:border-primary", text: "text-primary", border: "border-primary" },
  indigo: { focusRing: "focus:ring-indigo-500 focus:border-indigo-500", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-500" },
  rose: { focusRing: "focus:ring-rose-500 focus:border-rose-500", text: "text-rose-600 dark:text-rose-400", border: "border-rose-500" },
  emerald: { focusRing: "focus:ring-emerald-500 focus:border-emerald-500", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500" },
  zinc: { focusRing: "focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-zinc-900 dark:focus:border-zinc-100", text: "text-zinc-900 dark:text-zinc-100", border: "border-zinc-900 dark:border-zinc-100" },
};

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex);
  return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "99, 102, 241";
};

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: { focusRing: "focus:ring-[var(--otp-color)] focus:border-[var(--otp-color)]", text: "text-[var(--otp-color)]", border: "border-[var(--otp-color)]" },
      style: { "--otp-color": color, "--otp-color-rgb": rgb } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};

export interface OtpInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> { length?: number; value?: string; onChange?: (value: string) => void; onComplete?: (value: string) => void; mask?: boolean; variant?: OtpVariant; color?: OtpColor; disabled?: boolean; }

export const OtpInputBlock = forwardRef<HTMLDivElement, OtpInputProps>(({ length = 6, value = "", onChange, onComplete, mask = false, variant = "default", color = "indigo", disabled = false, className, ...props }, ref) => {
  const { theme, style } = getThemeStyles(color as string);
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (value !== undefined) {
      const valArray = value.split("").slice(0, length);
      setOtp([...valArray, ...Array(length - valArray.length).fill("")]);
    }
  }, [value, length]);

  const triggerChange = (newOtp: string[]) => {
    const otpString = newOtp.join("");
    if (onChange) onChange(otpString);
    if (onComplete && otpString.length === length) onComplete(otpString);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (isNaN(Number(val)) && val !== "") return;
    const newOtp = [...otp];
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);
    triggerChange(newOtp);
    if (val !== "" && index < length - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (!otp[index] && index > 0) { newOtp[index - 1] = ""; setOtp(newOtp); triggerChange(newOtp); inputRefs.current[index - 1]?.focus(); }
      else { newOtp[index] = ""; setOtp(newOtp); triggerChange(newOtp); }
    }
    if (e.key === "ArrowLeft" && index > 0) { e.preventDefault(); inputRefs.current[index - 1]?.focus(); inputRefs.current[index - 1]?.select(); }
    if (e.key === "ArrowRight" && index < length - 1) { e.preventDefault(); inputRefs.current[index + 1]?.focus(); inputRefs.current[index + 1]?.select(); }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, length).split("");
    const numericData = pastedData.filter((char) => !isNaN(Number(char)) && char !== " ");
    if (numericData.length === 0) return;
    const newOtp = [...otp];
    numericData.forEach((char, i) => { if (i < length) newOtp[i] = char; });
    setOtp(newOtp); triggerChange(newOtp);
    const nextEmptyIndex = newOtp.findIndex((val) => val === "");
    inputRefs.current[nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex]?.focus();
  };

  const getVariantStyles = () => {
    const base = "w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold transition-all duration-200 outline-none placeholder:text-zinc-300 dark:placeholder:text-zinc-700";
    if (variant === "filled") return cn(base, "rounded-xl border border-transparent bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 focus:bg-white dark:focus:bg-zinc-950 focus:ring-2", theme.focusRing);
    if (variant === "underlined") return cn(base, "rounded-none border-0 border-b-2 border-zinc-200 dark:border-zinc-800 bg-transparent px-0 focus:ring-0", theme.border);
    return cn(base, "rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b] shadow-sm focus:ring-2", theme.focusRing);
  };

  return (
    <div ref={ref} className={cn("flex items-center gap-2 sm:gap-3", className)} style={style} {...props}>
      {otp.map((digit, index) => (
        <input key={index} ref={(el) => { inputRefs.current[index] = el; }} type={mask ? "password" : "text"} inputMode="numeric" autoComplete="one-time-code" pattern="\\d*" maxLength={1} value={digit} onChange={(e) => handleChange(e, index)} onKeyDown={(e) => handleKeyDown(e, index)} onPaste={handlePaste} disabled={disabled} className={cn(getVariantStyles(), digit ? theme.text : "text-zinc-900 dark:text-zinc-100", disabled && "opacity-50 cursor-not-allowed")} aria-label={\`Digit \${index + 1} of \${length}\`} />
      ))}
    </div>
  );
});
OtpInputBlock.displayName = "OtpInputBlock";`;

// --- JAVASCRIPT ENGINE CODE ---
const OTP_ENGINE_CODE_JS = `"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const colorThemes = {
  indigo: { focusRing: "focus:ring-indigo-500 focus:border-indigo-500", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-500" },
  rose: { focusRing: "focus:ring-rose-500 focus:border-rose-500", text: "text-rose-600 dark:text-rose-400", border: "border-rose-500" },
  emerald: { focusRing: "focus:ring-emerald-500 focus:border-emerald-500", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500" },
  zinc: { focusRing: "focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:border-zinc-900 dark:focus:border-zinc-100", text: "text-zinc-900 dark:text-zinc-100", border: "border-zinc-900 dark:border-zinc-100" },
};

const hexToRgb = (hex) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex);
  return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "99, 102, 241";
};

export const getThemeStyles = (color) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: { focusRing: "focus:ring-[var(--otp-color)] focus:border-[var(--otp-color)]", text: "text-[var(--otp-color)]", border: "border-[var(--otp-color)]" },
      style: { "--otp-color": color, "--otp-color-rgb": rgb },
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

export const OtpInputBlock = forwardRef(({ length = 6, value = "", onChange, onComplete, mask = false, variant = "default", color = "indigo", disabled = false, className, ...props }, ref) => {
  const { theme, style } = getThemeStyles(color);
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (value !== undefined) {
      const valArray = value.split("").slice(0, length);
      setOtp([...valArray, ...Array(length - valArray.length).fill("")]);
    }
  }, [value, length]);

  const triggerChange = (newOtp) => {
    const otpString = newOtp.join("");
    if (onChange) onChange(otpString);
    if (onComplete && otpString.length === length) onComplete(otpString);
  };

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (isNaN(Number(val)) && val !== "") return;
    const newOtp = [...otp];
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);
    triggerChange(newOtp);
    if (val !== "" && index < length - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (!otp[index] && index > 0) { newOtp[index - 1] = ""; setOtp(newOtp); triggerChange(newOtp); inputRefs.current[index - 1]?.focus(); }
      else { newOtp[index] = ""; setOtp(newOtp); triggerChange(newOtp); }
    }
    if (e.key === "ArrowLeft" && index > 0) { e.preventDefault(); inputRefs.current[index - 1]?.focus(); inputRefs.current[index - 1]?.select(); }
    if (e.key === "ArrowRight" && index < length - 1) { e.preventDefault(); inputRefs.current[index + 1]?.focus(); inputRefs.current[index + 1]?.select(); }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, length).split("");
    const numericData = pastedData.filter((char) => !isNaN(Number(char)) && char !== " ");
    if (numericData.length === 0) return;
    const newOtp = [...otp];
    numericData.forEach((char, i) => { if (i < length) newOtp[i] = char; });
    setOtp(newOtp); triggerChange(newOtp);
    const nextEmptyIndex = newOtp.findIndex((val) => val === "");
    inputRefs.current[nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex]?.focus();
  };

  const getVariantStyles = () => {
    const base = "w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold transition-all duration-200 outline-none placeholder:text-zinc-300 dark:placeholder:text-zinc-700";
    if (variant === "filled") return cn(base, "rounded-xl border border-transparent bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 focus:bg-white dark:focus:bg-zinc-950 focus:ring-2", theme.focusRing);
    if (variant === "underlined") return cn(base, "rounded-none border-0 border-b-2 border-zinc-200 dark:border-zinc-800 bg-transparent px-0 focus:ring-0", theme.border);
    return cn(base, "rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b] shadow-sm focus:ring-2", theme.focusRing);
  };

  return (
    <div ref={ref} className={cn("flex items-center gap-2 sm:gap-3", className)} style={style} {...props}>
      {otp.map((digit, index) => (
        <input key={index} ref={(el) => { inputRefs.current[index] = el; }} type={mask ? "password" : "text"} inputMode="numeric" autoComplete="one-time-code" pattern="\\d*" maxLength={1} value={digit} onChange={(e) => handleChange(e, index)} onKeyDown={(e) => handleKeyDown(e, index)} onPaste={handlePaste} disabled={disabled} className={cn(getVariantStyles(), digit ? theme.text : "text-zinc-900 dark:text-zinc-100", disabled && "opacity-50 cursor-not-allowed")} aria-label={\`Digit \${index + 1} of \${length}\`} />
      ))}
    </div>
  );
});
OtpInputBlock.displayName = "OtpInputBlock";`;

export function OtpInputShowcase() {
  const [variant, setVariant] = useState<OtpVariant>("default");
  const [length, setLength] = useState(6);
  const [isMasked, setIsMasked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [currentValue, setCurrentValue] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const [color, setColor] = useState<OtpColor | string>("primary");

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  const handleComplete = (val: string) => {
    setIsComplete(true);
    // Simulate a fake verify load
    setTimeout(() => {
      setIsComplete(false);
    }, 2000);
  };

  const generateUsageCode = (isTs: boolean) => {
    const colorPropStr = color && color !== "primary" && color !== "default" ? `\n        color="${color}"` : "";
    let propsStr = `\n        length={${length}}\n        variant="${variant}"${colorPropStr}`;
    if (isMasked) propsStr += `\n        mask`;
    if (isDisabled) propsStr += `\n        disabled`;
    propsStr += `\n        onChange={(val) => console.log(val)}\n        onComplete={(val) => alert(\`Verification code: \${val}\`)}`;

    return `import { OtpInputBlock } from "@/components/custom/blocks/OtpInputBlock";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

export default function VerificationForm() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold">Enter Verification Code</h3>
      <OtpInputBlock ${propsStr}
      />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col gap-6 p-5 rounded-xl z-0 relative">
        <div className="flex flex-col xl:flex-row gap-6">
          <VariantTabs
            variants={["default", "filled", "underlined"]}
            label="Style Variant"
            defaultValue={variant}
            onValueChange={(v) => setVariant(v as OtpVariant)}
          />

          <VariantTabs
            variants={[
              { value: "4", label: "4 Digits" },
              { value: "6", label: "6 Digits" },
              { value: "8", label: "8 Digits" },
            ]}
            label="OTP Length"
            defaultValue={String(length)}
            onValueChange={(v) => { setLength(Number(v) as 4 | 6 | 8); setCurrentValue(""); }}
          />
        </div>

        <ThemeColorPicker color={color} onChange={handleColorChange} label="Focus Color" />
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="OtpInputBlock"
        tsCode={OTP_ENGINE_CODE_TS}
        jsCode={OTP_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
        sandbox="otp-input"
        sandboxProps={{ variant, length, isMasked, isDisabled, color }}
      >
        <div className="w-full flex flex-col items-center justify-center min-h-[400px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-6 sm:p-12 relative z-10">
          <div className="flex flex-col items-center max-w-sm w-full text-center gap-8">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-2 text-zinc-900 dark:text-white">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
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
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 animate-in fade-in slide-in-from-bottom-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Verified Successfully
                </div>
              ) : (
                <button
                  disabled={currentValue.length !== length || isDisabled}
                  onClick={() => handleComplete(currentValue)}
                  className="px-6 py-2 rounded-xl text-sm font-bold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Verify Code
                </button>
              )}
            </div>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
