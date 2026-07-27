"use client";

import {
  CounterBlock,
  CounterColor,
  CounterType,
} from "@/components/custom/blocks/CounterBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const COUNTER_ENGINE_CODE_TS = `"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { Minus, Plus, Clock } from "lucide-react";

export type CounterColor = "indigo" | "rose" | "emerald" | "zinc" | string;
export type CounterType = "stepper" | "animated" | "circular" | "countdown";
export type CounterVariant = "default" | "outline" | "soft" | "vertical";

const colorThemes: Record<string, Record<string, string>> = {
  indigo: { bg: "bg-indigo-600 text-white", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-600", ring: "ring-indigo-600/20", fill: "stroke-indigo-600", bgSoft: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
  rose: { bg: "bg-rose-600 text-white", text: "text-rose-600 dark:text-rose-400", border: "border-rose-600", ring: "ring-rose-600/20", fill: "stroke-rose-600", bgSoft: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400" },
  emerald: { bg: "bg-emerald-600 text-white", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-600", ring: "ring-emerald-600/20", fill: "stroke-emerald-600", bgSoft: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  zinc: { bg: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900", text: "text-zinc-900 dark:text-zinc-100", border: "border-zinc-900 dark:border-zinc-100", ring: "ring-zinc-900/20 dark:ring-white/10", fill: "stroke-zinc-900 dark:stroke-zinc-100", bgSoft: "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100" },
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
      theme: { bg: "bg-[var(--theme-color)] text-white", text: "text-[var(--theme-color)]", border: "border-[var(--theme-color)]", ring: "ring-[var(--theme-color)]/20", fill: "stroke-[var(--theme-color)]", bgSoft: "bg-[rgba(var(--theme-color-rgb),0.1)] text-[var(--theme-color)]" },
      style: { "--theme-color": color, "--theme-color-rgb": rgb } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

const StepperCounter = ({ theme, style, label, initialValue, min, max, variant }: any) => {
  const [count, setCount] = useState(initialValue);
  const containerRef = useRef<HTMLDivElement>(null);

  const animatePop = () => gsap.fromTo(containerRef.current, { scale: 0.95 }, { scale: 1, duration: 0.2, ease: "back.out(2)" });
  const handleDec = () => { if (count > min) { setCount((p: number) => p - 1); animatePop(); } };
  const handleInc = () => { if (count < max) { setCount((p: number) => p + 1); animatePop(); } };

  const renderVariant = () => {
    switch (variant) {
      case "outline":
        return (
          <div ref={containerRef} className="flex items-center rounded-full border-2 border-zinc-200 dark:border-zinc-800 p-1 shadow-sm bg-white dark:bg-zinc-950">
            <button onClick={handleDec} disabled={count <= min} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 disabled:opacity-50 transition-colors active:scale-95"><Minus size={18} strokeWidth={2.5} /></button>
            <div className="w-14 text-center text-xl font-bold text-zinc-900 dark:text-white select-none">{count}</div>
            <button onClick={handleInc} disabled={count >= max} className={cn("w-10 h-10 flex items-center justify-center rounded-full transition-colors active:scale-95 disabled:opacity-50 shadow-sm", theme.bg)}><Plus size={18} strokeWidth={2.5} /></button>
          </div>
        );
      case "soft":
        return (
          <div ref={containerRef} className={cn("flex items-center rounded-2xl p-1.5 shadow-inner", theme.bgSoft)}>
            <button onClick={handleDec} disabled={count <= min} className={cn("w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-900 shadow-sm hover:scale-105 active:scale-95 transition-all disabled:opacity-50", theme.text)}><Minus size={18} strokeWidth={3} /></button>
            <div className={cn("w-16 text-center text-2xl font-black select-none", theme.text)}>{count}</div>
            <button onClick={handleInc} disabled={count >= max} className={cn("w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-900 shadow-sm hover:scale-105 active:scale-95 transition-all disabled:opacity-50", theme.text)}><Plus size={18} strokeWidth={3} /></button>
          </div>
        );
      case "vertical":
        return (
          <div ref={containerRef} className="flex flex-col items-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
            <button onClick={handleInc} disabled={count >= max} className={cn("w-14 h-12 flex justify-center items-center hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors active:bg-zinc-300 dark:active:bg-zinc-700 disabled:opacity-50", theme.text)}><Plus size={20} strokeWidth={2.5} /></button>
            <div className="w-14 py-3 text-center font-black text-xl border-y border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black select-none">{count}</div>
            <button onClick={handleDec} disabled={count <= min} className="w-14 h-12 flex justify-center items-center hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 transition-colors active:bg-zinc-300 dark:active:bg-zinc-700 disabled:opacity-50"><Minus size={20} strokeWidth={2.5} /></button>
          </div>
        );
      case "default":
      default:
        return (
          <div ref={containerRef} className="flex items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden p-1">
            <button onClick={handleDec} disabled={count <= min} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 disabled:opacity-50 transition-colors active:scale-95"><Minus size={18} strokeWidth={2.5} /></button>
            <div className="w-16 text-center text-xl font-bold text-zinc-900 dark:text-white select-none">{count}</div>
            <button onClick={handleInc} disabled={count >= max} className={cn("w-10 h-10 flex items-center justify-center rounded-lg transition-colors active:scale-95 disabled:opacity-50", theme.bg)}><Plus size={18} strokeWidth={2.5} /></button>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center gap-3" style={style}>
      {label && <span className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">{label}</span>}
      {renderVariant()}
    </div>
  );
};

const AnimatedCounter = ({ theme, style, label, targetValue, prefix, suffix }: any) => {
  const [displayVal, setDisplayVal] = useState(0);
  useEffect(() => {
    const obj = { val: 0 };
    gsap.to(obj, { val: targetValue, duration: 2, ease: "power3.out", onUpdate: () => setDisplayVal(Math.floor(obj.val)) });
  }, [targetValue]);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl w-full max-w-sm" style={style}>
      <div className={cn("text-6xl font-black tracking-tighter mb-2", theme.text)}>{prefix}{displayVal.toLocaleString()}{suffix}</div>
      {label && <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest">{label}</div>}
    </div>
  );
};

const CircularCounter = ({ theme, style, label, targetValue, suffix }: any) => {
  const [displayVal, setDisplayVal] = useState(0);
  const circleRef = useRef<SVGCircleElement>(null);
  const size = 160; const strokeWidth = 12; const radius = (size - strokeWidth) / 2; const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: targetValue, duration: 2.5, ease: "power3.out",
      onUpdate: () => {
        setDisplayVal(Math.floor(obj.val));
        if (circleRef.current) {
          const percent = Math.min(100, Math.max(0, obj.val));
          circleRef.current.style.strokeDashoffset = (circumference - (percent / 100) * circumference).toString();
        }
      },
    });
  }, [targetValue, circumference]);

  return (
    <div className="flex flex-col items-center gap-6" style={style}>
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="absolute inset-0 rotate-[-90deg]" width={size} height={size}>
          <circle cx={size / 2} cy={size / 2} r={radius} className="fill-none stroke-zinc-100 dark:stroke-zinc-800" strokeWidth={strokeWidth} />
          <circle ref={circleRef} cx={size / 2} cy={size / 2} r={radius} className={cn("fill-none transition-all duration-75", theme.fill)} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference} />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center"><span className="text-3xl font-black tracking-tighter text-zinc-900 dark:text-white">{displayVal}{suffix}</span></div>
      </div>
      {label && <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">{label}</span>}
    </div>
  );
};

const CountdownCounter = ({ theme, style, label, targetDate }: any) => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = targetDate ? new Date(targetDate).getTime() : new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
    const updateTimer = () => {
      const difference = target - new Date().getTime();
      if (difference <= 0) { setTimeLeft({ d: 0, h: 0, m: 0, s: 0 }); return; }
      setTimeLeft({ d: Math.floor(difference / (1000 * 60 * 60 * 24)), h: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), m: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)), s: Math.floor((difference % (1000 * 60)) / 1000) });
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const TimeUnit = ({ value, unit }: { value: number; unit: string }) => (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-lg mb-3"><span className={cn("text-2xl sm:text-3xl font-black tracking-tighter", theme.text)}>{value.toString().padStart(2, "0")}</span></div>
      <span className="text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-widest">{unit}</span>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-8" style={style}>
      {label && <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-bold text-zinc-600 dark:text-zinc-300"><Clock size={16} className={theme.text} /> {label}</div>}
      <div className="flex gap-3 sm:gap-4"><TimeUnit value={timeLeft.d} unit="Days" /><TimeUnit value={timeLeft.h} unit="Hours" /><TimeUnit value={timeLeft.m} unit="Mins" /><TimeUnit value={timeLeft.s} unit="Secs" /></div>
    </div>
  );
};

export interface CounterProps { type?: CounterType; variant?: CounterVariant; color?: CounterColor; label?: string; initialValue?: number; min?: number; max?: number; targetValue?: number; prefix?: string; suffix?: string; targetDate?: Date; }

export function CounterBlock({ type = "stepper", variant = "default", color = "indigo", label = "Counter", initialValue = 1, min = 0, max = 100, targetValue = 100, prefix = "", suffix = "", targetDate }: CounterProps) {
  const { theme, style } = getThemeStyles(color);
  if (type === "stepper") return <StepperCounter theme={theme} style={style} label={label} initialValue={initialValue} min={min} max={max} variant={variant} />;
  if (type === "animated") return <AnimatedCounter theme={theme} style={style} label={label} targetValue={targetValue} prefix={prefix} suffix={suffix} />;
  if (type === "circular") return <CircularCounter theme={theme} style={style} label={label} targetValue={targetValue} suffix={suffix} />;
  if (type === "countdown") return <CountdownCounter theme={theme} style={style} label={label} targetDate={targetDate} />;
  return null;
}`;

// --- JAVASCRIPT ENGINE CODE ---
const COUNTER_ENGINE_CODE_JS = `"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { Minus, Plus, Clock } from "lucide-react";

const colorThemes = {
  indigo: { bg: "bg-indigo-600 text-white", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-600", ring: "ring-indigo-600/20", fill: "stroke-indigo-600", bgSoft: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
  rose: { bg: "bg-rose-600 text-white", text: "text-rose-600 dark:text-rose-400", border: "border-rose-600", ring: "ring-rose-600/20", fill: "stroke-rose-600", bgSoft: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400" },
  emerald: { bg: "bg-emerald-600 text-white", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-600", ring: "ring-emerald-600/20", fill: "stroke-emerald-600", bgSoft: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  zinc: { bg: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900", text: "text-zinc-900 dark:text-zinc-100", border: "border-zinc-900 dark:border-zinc-100", ring: "ring-zinc-900/20 dark:ring-white/10", fill: "stroke-zinc-900 dark:stroke-zinc-100", bgSoft: "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100" },
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
      theme: { bg: "bg-[var(--theme-color)] text-white", text: "text-[var(--theme-color)]", border: "border-[var(--theme-color)]", ring: "ring-[var(--theme-color)]/20", fill: "stroke-[var(--theme-color)]", bgSoft: "bg-[rgba(var(--theme-color-rgb),0.1)] text-[var(--theme-color)]" },
      style: { "--theme-color": color, "--theme-color-rgb": rgb },
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

const StepperCounter = ({ theme, style, label, initialValue, min, max, variant }) => {
  const [count, setCount] = useState(initialValue);
  const containerRef = useRef(null);

  const animatePop = () => gsap.fromTo(containerRef.current, { scale: 0.95 }, { scale: 1, duration: 0.2, ease: "back.out(2)" });
  const handleDec = () => { if (count > min) { setCount((p) => p - 1); animatePop(); } };
  const handleInc = () => { if (count < max) { setCount((p) => p + 1); animatePop(); } };

  const renderVariant = () => {
    switch (variant) {
      case "outline":
        return (
          <div ref={containerRef} className="flex items-center rounded-full border-2 border-zinc-200 dark:border-zinc-800 p-1 shadow-sm bg-white dark:bg-zinc-950">
            <button onClick={handleDec} disabled={count <= min} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 disabled:opacity-50 transition-colors active:scale-95"><Minus size={18} strokeWidth={2.5} /></button>
            <div className="w-14 text-center text-xl font-bold text-zinc-900 dark:text-white select-none">{count}</div>
            <button onClick={handleInc} disabled={count >= max} className={cn("w-10 h-10 flex items-center justify-center rounded-full transition-colors active:scale-95 disabled:opacity-50 shadow-sm", theme.bg)}><Plus size={18} strokeWidth={2.5} /></button>
          </div>
        );
      case "soft":
        return (
          <div ref={containerRef} className={cn("flex items-center rounded-2xl p-1.5 shadow-inner", theme.bgSoft)}>
            <button onClick={handleDec} disabled={count <= min} className={cn("w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-900 shadow-sm hover:scale-105 active:scale-95 transition-all disabled:opacity-50", theme.text)}><Minus size={18} strokeWidth={3} /></button>
            <div className={cn("w-16 text-center text-2xl font-black select-none", theme.text)}>{count}</div>
            <button onClick={handleInc} disabled={count >= max} className={cn("w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-900 shadow-sm hover:scale-105 active:scale-95 transition-all disabled:opacity-50", theme.text)}><Plus size={18} strokeWidth={3} /></button>
          </div>
        );
      case "vertical":
        return (
          <div ref={containerRef} className="flex flex-col items-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
            <button onClick={handleInc} disabled={count >= max} className={cn("w-14 h-12 flex justify-center items-center hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors active:bg-zinc-300 dark:active:bg-zinc-700 disabled:opacity-50", theme.text)}><Plus size={20} strokeWidth={2.5} /></button>
            <div className="w-14 py-3 text-center font-black text-xl border-y border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black select-none">{count}</div>
            <button onClick={handleDec} disabled={count <= min} className="w-14 h-12 flex justify-center items-center hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 transition-colors active:bg-zinc-300 dark:active:bg-zinc-700 disabled:opacity-50"><Minus size={20} strokeWidth={2.5} /></button>
          </div>
        );
      case "default":
      default:
        return (
          <div ref={containerRef} className="flex items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden p-1">
            <button onClick={handleDec} disabled={count <= min} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 disabled:opacity-50 transition-colors active:scale-95"><Minus size={18} strokeWidth={2.5} /></button>
            <div className="w-16 text-center text-xl font-bold text-zinc-900 dark:text-white select-none">{count}</div>
            <button onClick={handleInc} disabled={count >= max} className={cn("w-10 h-10 flex items-center justify-center rounded-lg transition-colors active:scale-95 disabled:opacity-50", theme.bg)}><Plus size={18} strokeWidth={2.5} /></button>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center gap-3" style={style}>
      {label && <span className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">{label}</span>}
      {renderVariant()}
    </div>
  );
};

const AnimatedCounter = ({ theme, style, label, targetValue, prefix, suffix }) => {
  const [displayVal, setDisplayVal] = useState(0);
  useEffect(() => {
    const obj = { val: 0 };
    gsap.to(obj, { val: targetValue, duration: 2, ease: "power3.out", onUpdate: () => setDisplayVal(Math.floor(obj.val)) });
  }, [targetValue]);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl w-full max-w-sm" style={style}>
      <div className={cn("text-6xl font-black tracking-tighter mb-2", theme.text)}>{prefix}{displayVal.toLocaleString()}{suffix}</div>
      {label && <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest">{label}</div>}
    </div>
  );
};

const CircularCounter = ({ theme, style, label, targetValue, suffix }) => {
  const [displayVal, setDisplayVal] = useState(0);
  const circleRef = useRef(null);
  const size = 160; const strokeWidth = 12; const radius = (size - strokeWidth) / 2; const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: targetValue, duration: 2.5, ease: "power3.out",
      onUpdate: () => {
        setDisplayVal(Math.floor(obj.val));
        if (circleRef.current) {
          const percent = Math.min(100, Math.max(0, obj.val));
          circleRef.current.style.strokeDashoffset = (circumference - (percent / 100) * circumference).toString();
        }
      },
    });
  }, [targetValue, circumference]);

  return (
    <div className="flex flex-col items-center gap-6" style={style}>
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="absolute inset-0 rotate-[-90deg]" width={size} height={size}>
          <circle cx={size / 2} cy={size / 2} r={radius} className="fill-none stroke-zinc-100 dark:stroke-zinc-800" strokeWidth={strokeWidth} />
          <circle ref={circleRef} cx={size / 2} cy={size / 2} r={radius} className={cn("fill-none transition-all duration-75", theme.fill)} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference} />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center"><span className="text-3xl font-black tracking-tighter text-zinc-900 dark:text-white">{displayVal}{suffix}</span></div>
      </div>
      {label && <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">{label}</span>}
    </div>
  );
};

const CountdownCounter = ({ theme, style, label, targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = targetDate ? new Date(targetDate).getTime() : new Date().getTime() + 3 * 24 * 60 * 60 * 1000;
    const updateTimer = () => {
      const difference = target - new Date().getTime();
      if (difference <= 0) { setTimeLeft({ d: 0, h: 0, m: 0, s: 0 }); return; }
      setTimeLeft({ d: Math.floor(difference / (1000 * 60 * 60 * 24)), h: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), m: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)), s: Math.floor((difference % (1000 * 60)) / 1000) });
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const TimeUnit = ({ value, unit }) => (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-lg mb-3"><span className={cn("text-2xl sm:text-3xl font-black tracking-tighter", theme.text)}>{value.toString().padStart(2, "0")}</span></div>
      <span className="text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-widest">{unit}</span>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-8" style={style}>
      {label && <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-bold text-zinc-600 dark:text-zinc-300"><Clock size={16} className={theme.text} /> {label}</div>}
      <div className="flex gap-3 sm:gap-4"><TimeUnit value={timeLeft.d} unit="Days" /><TimeUnit value={timeLeft.h} unit="Hours" /><TimeUnit value={timeLeft.m} unit="Mins" /><TimeUnit value={timeLeft.s} unit="Secs" /></div>
    </div>
  );
};

export function CounterBlock({ type = "stepper", variant = "default", color = "indigo", label = "Counter", initialValue = 1, min = 0, max = 100, targetValue = 100, prefix = "", suffix = "", targetDate }) {
  const { theme, style } = getThemeStyles(color);
  if (type === "stepper") return <StepperCounter theme={theme} style={style} label={label} initialValue={initialValue} min={min} max={max} variant={variant} />;
  if (type === "animated") return <AnimatedCounter theme={theme} style={style} label={label} targetValue={targetValue} prefix={prefix} suffix={suffix} />;
  if (type === "circular") return <CircularCounter theme={theme} style={style} label={label} targetValue={targetValue} suffix={suffix} />;
  if (type === "countdown") return <CountdownCounter theme={theme} style={style} label={label} targetDate={targetDate} />;
  return null;
}`;

export function CounterShowcase() {
  const [type, setType] = useState<CounterType>("stepper");
  const [variant, setVariant] = useState<
    "default" | "outline" | "soft" | "vertical"
  >("default");

  // Initialize with localStorage if available
  const [color, setColor] = useState<CounterColor | string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("primaryColor") || "emerald";
    }
    return "emerald";
  });

  // Automatically listen for updates to the primaryColor in localStorage
  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("primaryColor");
      if (stored && stored !== color) {
        setColor(stored);
      }
    }, 1000);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "primaryColor" && e.newValue) {
        setColor(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorage);
    };
  }, [color]);

  // Sync manual UI changes down to local storage
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    localStorage.setItem("primaryColor", newColor);
  };

  const generateUsageCode = (isTs: boolean) => {
    let exampleProps = "";
    if (type === "stepper")
      exampleProps = `label="Quantity"\n        min={1}\n        max={10}\n        initialValue={1}\n        variant="${variant}"`;
    if (type === "animated")
      exampleProps = `label="Total Revenue"\n        prefix="$"\n        targetValue={15420}`;
    if (type === "circular")
      exampleProps = `label="Task Progress"\n        suffix="%"\n        targetValue={85}`;
    if (type === "countdown") exampleProps = `label="Product Launch"`;

    return `import { CounterBlock } from "@/components/custom/blocks/CounterBlock";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

export default function Page() {
  return (
    <div className="flex items-center justify-center p-12">
      <CounterBlock 
        type="${type}" 
        color="${color}" 
        ${exampleProps}
      />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col md:flex-row gap-6 p-5 rounded-xl">
        {/* Type Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Counter Type
          </label>
          <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
            {(
              ["stepper", "animated", "circular", "countdown"] as CounterType[]
            ).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                  type === t
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Stepper Variant Selector (Conditional) */}
        {type === "stepper" && (
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Stepper Variant
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(["default", "outline", "soft", "vertical"] as const).map(
                (v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                      variant === v
                        ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                        : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                    }`}
                  >
                    {v}
                  </button>
                ),
              )}
            </div>
          </div>
        )}

        {/* Color */}
          <ThemeColorPicker color={color} onChange={handleColorChange} label="Theme Color" />
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="CounterBlock"
        tsCode={COUNTER_ENGINE_CODE_TS}
        jsCode={COUNTER_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div className="w-full flex items-center justify-center min-h-[400px] bg-zinc-50/50 dark:bg-transparent py-12 transition-colors duration-300">
          <CounterBlock
            key={`${type}-${color}-${variant}`}
            type={type}
            variant={variant}
            color={color}
            {...(type === "stepper" && {
              label: "Select Quantity",
              initialValue: 1,
              min: 1,
              max: 10,
            })}
            {...(type === "animated" && {
              label: "Total Subscribers",
              targetValue: 12500,
              prefix: "+",
            })}
            {...(type === "circular" && {
              label: "Storage Used",
              targetValue: 78,
              suffix: "%",
            })}
            {...(type === "countdown" && { label: "Next Product Launch" })}
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
