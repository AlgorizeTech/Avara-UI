"use client";

import {
  Hero,
  HeroAction,
  HeroActions,
  HeroBadge,
  HeroColor,
  HeroContent,
  HeroDescription,
  HeroLayout,
  HeroTitle,
  HeroVariant,
  HeroVisual,
} from "@/components/custom/blocks/HeroBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ArrowRight, PlayCircle, Zap } from "lucide-react";
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const HERO_ENGINE_CODE_TS = `"use client";

import React, { createContext, forwardRef, useContext } from "react";
import { cn } from "@/lib/utils";

export type HeroLayout = "center" | "left" | "split-right" | "split-left";
export type HeroVariant = "default" | "glass" | "glow";
export type HeroColor = "indigo" | "rose" | "emerald" | "zinc" | (string & {});

const colorThemes: Record<string, Record<string, string>> = {
  indigo: { bg: "bg-indigo-600 text-white", text: "text-indigo-600 dark:text-indigo-400", bgSoft: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400", border: "border-indigo-200 dark:border-indigo-800", glow: "rgba(99,102,241,0.5)" },
  rose: { bg: "bg-rose-600 text-white", text: "text-rose-600 dark:text-rose-400", bgSoft: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400", border: "border-rose-200 dark:border-rose-800", glow: "rgba(225,29,72,0.5)" },
  emerald: { bg: "bg-emerald-600 text-white", text: "text-emerald-600 dark:text-emerald-400", bgSoft: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800", glow: "rgba(16,185,129,0.5)" },
  zinc: { bg: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900", text: "text-zinc-900 dark:text-zinc-100", bgSoft: "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100", border: "border-zinc-200 dark:border-zinc-800", glow: "rgba(255,255,255,0.3)" },
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
      theme: { bg: "bg-[var(--hero-color)] text-white", text: "text-[var(--hero-color)]", bgSoft: "bg-[rgba(var(--hero-rgb),0.1)] text-[var(--hero-color)]", border: "border-[rgba(var(--hero-rgb),0.2)]", glow: \`rgba(\${rgb}, 0.5)\` },
      style: { "--hero-color": color, "--hero-rgb": rgb } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

interface HeroContextType { layout: HeroLayout; variant: HeroVariant; theme: Record<string, string>; }
const HeroContext = createContext<HeroContextType | null>(null);
function useHero() { const ctx = useContext(HeroContext); if (!ctx) throw new Error("Missing HeroContext"); return ctx; }

export interface HeroProps extends React.HTMLAttributes<HTMLElement> { layout?: HeroLayout; variant?: HeroVariant; color?: HeroColor; }
export const Hero = forwardRef<HTMLElement, HeroProps>(({ children, layout = "center", variant = "default", color = "indigo", className, ...props }, ref) => {
  const { theme, style } = getThemeStyles(color as string);
  const layoutStyles = { center: "flex flex-col items-center text-center max-w-5xl mx-auto pt-20 pb-16 px-6", left: "flex flex-col items-start text-left max-w-5xl mx-auto pt-20 pb-16 px-6", "split-right": "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-7xl mx-auto py-16 px-6", "split-left": "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-7xl mx-auto py-16 px-6" };
  return (<HeroContext.Provider value={{ layout, variant, theme }}><section ref={ref} className={cn("relative w-full overflow-hidden transition-all duration-500", variant === "glass" && "min-h-[600px] flex items-center justify-center", variant === "glow" && "bg-zinc-50 dark:bg-[#030303]", variant !== "glass" && layoutStyles[layout], className)} style={style} {...props}>{variant === "glow" && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-30 dark:opacity-20 blur-[100px] rounded-full pointer-events-none" style={{ background: \`radial-gradient(circle, \${theme.glow} 0%, transparent 70%)\` }} />}{children}</section></HeroContext.Provider>);
});
Hero.displayName = "Hero";

export const HeroContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ children, className, ...props }, ref) => {
  const { layout, variant } = useHero();
  const contentStyles = { center: "flex flex-col items-center justify-center w-full z-10", left: "flex flex-col items-start text-left w-full z-10", "split-right": "flex flex-col items-start text-left w-full z-10 order-2 lg:order-1", "split-left": "flex flex-col items-start text-left w-full z-10 order-2 lg:order-2" };
  return (<div ref={ref} className={cn(contentStyles[layout], variant === "glass" && "p-8 sm:p-12 rounded-3xl backdrop-blur-2xl bg-white/10 dark:bg-black/40 border border-white/20 dark:border-white/10 shadow-2xl z-10 max-w-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", className)} {...props}>{children}</div>);
});
HeroContent.displayName = "HeroContent";

export const HeroBadge = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ children, className, ...props }, ref) => {
  const { theme, variant } = useHero();
  return (<div ref={ref} className={cn("inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full text-sm font-bold tracking-tight border backdrop-blur-md transition-colors", variant === "glass" ? "bg-white/20 border-white/30 text-white" : cn(theme.bgSoft, theme.border), className)} {...props}>{children}</div>);
});
HeroBadge.displayName = "HeroBadge";

export interface HeroTitleProps extends React.HTMLAttributes<HTMLHeadingElement> { glitch?: boolean; }
export const HeroTitle = forwardRef<HTMLHeadingElement, HeroTitleProps>(({ children, glitch, className, ...props }, ref) => {
  const { variant } = useHero();
  const uniqueId = React.useId().replace(/:/g, "");
  return (<>{glitch && <style>{\`.glitch-\${uniqueId} { position: relative; } .glitch-\${uniqueId}::before, .glitch-\${uniqueId}::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.8; } .glitch-\${uniqueId}::before { left: 2px; text-shadow: -2px 0 red; clip: rect(24px, 550px, 90px, 0); animation: glitch-anim-2 3s infinite linear alternate-reverse; } .glitch-\${uniqueId}::after { left: -2px; text-shadow: -2px 0 blue; clip: rect(85px, 550px, 140px, 0); animation: glitch-anim 2.5s infinite linear alternate-reverse; } @keyframes glitch-anim { 0% { clip: rect(10px, 9999px, 44px, 0); } 20% { clip: rect(85px, 9999px, 140px, 0); } 40% { clip: rect(12px, 9999px, 89px, 0); } 60% { clip: rect(65px, 9999px, 10px, 0); } 80% { clip: rect(9px, 9999px, 53px, 0); } 100% { clip: rect(78px, 9999px, 110px, 0); } } @keyframes glitch-anim-2 { 0% { clip: rect(65px, 9999px, 100px, 0); } 20% { clip: rect(10px, 9999px, 50px, 0); } 40% { clip: rect(80px, 9999px, 20px, 0); } 60% { clip: rect(30px, 9999px, 90px, 0); } 80% { clip: rect(90px, 9999px, 40px, 0); } 100% { clip: rect(20px, 9999px, 70px, 0); } }\`}</style>}<h1 ref={ref} data-text={typeof children === "string" ? children : undefined} className={cn("text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance leading-[1.1]", variant === "glass" ? "text-white drop-shadow-md" : "text-zinc-900 dark:text-zinc-50", glitch && \`glitch-\${uniqueId}\`, className)} {...props}>{children}</h1></>);
});
HeroTitle.displayName = "HeroTitle";

export const HeroDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ children, className, ...props }, ref) => {
  const { variant, layout } = useHero();
  return (<p ref={ref} className={cn("mt-6 text-lg sm:text-xl text-balance leading-relaxed", (layout === "center" || variant === "glass") ? "max-w-2xl mx-auto" : "max-w-xl", variant === "glass" ? "text-zinc-200 drop-shadow-sm" : "text-zinc-600 dark:text-zinc-400", className)} {...props}>{children}</p>);
});
HeroDescription.displayName = "HeroDescription";

export const HeroActions = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ children, className, ...props }, ref) => {
  const { layout } = useHero();
  return (<div ref={ref} className={cn("flex flex-wrap items-center gap-4 mt-8 sm:mt-10", layout === "center" && "justify-center", className)} {...props}>{children}</div>);
});
HeroActions.displayName = "HeroActions";

export interface HeroActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: "primary" | "secondary" | "outline" | "ghost" | "glow"; }
export const HeroAction = forwardRef<HTMLButtonElement, HeroActionProps>(({ children, variant: actionVariant = "primary", className, ...props }, ref) => {
  const { theme, variant: heroVariant } = useHero();
  const getStyles = () => {
    if (heroVariant === "glass") {
      if (actionVariant === "primary") return "bg-white text-zinc-900 hover:bg-zinc-200 border border-white shadow-lg";
      if (actionVariant === "outline") return "bg-transparent border border-white/50 text-white hover:bg-white/10";
    }
    if (actionVariant === "glow") return cn(theme.bg, "relative overflow-hidden group shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all", \`shadow-[0_0_20px_var(--hero-color)]\`);
    if (actionVariant === "primary") return cn(theme.bg, "shadow-md hover:opacity-90");
    if (actionVariant === "secondary") return "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200";
    if (actionVariant === "outline") return "bg-transparent border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900";
    return "bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100";
  };
  return (<button ref={ref} className={cn("inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2", getStyles(), className)} {...props}>{actionVariant === "glow" && <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-0" />}<span className="relative z-10 flex items-center gap-2">{children}</span></button>);
});
HeroAction.displayName = "HeroAction";

export const HeroVisual = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ children, className, ...props }, ref) => {
  const { layout, variant } = useHero();
  const styles = { center: "w-full max-w-5xl mt-12 sm:mt-16 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl z-10", left: "w-full max-w-5xl mt-12 sm:mt-16 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl z-10", "split-right": "w-full h-full min-h-[300px] lg:min-h-[500px] rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl z-10 order-1 lg:order-2", "split-left": "w-full h-full min-h-[300px] lg:min-h-[500px] rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl z-10 order-1 lg:order-1" };
  return (<div ref={ref} className={cn(variant === "glass" ? "absolute inset-0 z-0" : styles[layout], className)} {...props}>{children}</div>);
});
HeroVisual.displayName = "HeroVisual";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const HERO_ENGINE_CODE_JS = `"use client";

import React, { createContext, forwardRef, useContext } from "react";
import { cn } from "@/lib/utils";

const colorThemes = {
  indigo: { bg: "bg-indigo-600 text-white", text: "text-indigo-600 dark:text-indigo-400", bgSoft: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400", border: "border-indigo-200 dark:border-indigo-800", glow: "rgba(99,102,241,0.5)" },
  rose: { bg: "bg-rose-600 text-white", text: "text-rose-600 dark:text-rose-400", bgSoft: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400", border: "border-rose-200 dark:border-rose-800", glow: "rgba(225,29,72,0.5)" },
  emerald: { bg: "bg-emerald-600 text-white", text: "text-emerald-600 dark:text-emerald-400", bgSoft: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800", glow: "rgba(16,185,129,0.5)" },
  zinc: { bg: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900", text: "text-zinc-900 dark:text-zinc-100", bgSoft: "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100", border: "border-zinc-200 dark:border-zinc-800", glow: "rgba(255,255,255,0.3)" },
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
      theme: { bg: "bg-[var(--hero-color)] text-white", text: "text-[var(--hero-color)]", bgSoft: "bg-[rgba(var(--hero-rgb),0.1)] text-[var(--hero-color)]", border: "border-[rgba(var(--hero-rgb),0.2)]", glow: \`rgba(\${rgb}, 0.5)\` },
      style: { "--hero-color": color, "--hero-rgb": rgb },
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

const HeroContext = createContext(null);
function useHero() { const ctx = useContext(HeroContext); if (!ctx) throw new Error("Missing HeroContext"); return ctx; }

export const Hero = forwardRef(({ children, layout = "center", variant = "default", color = "indigo", className, ...props }, ref) => {
  const { theme, style } = getThemeStyles(color);
  const layoutStyles = { center: "flex flex-col items-center text-center max-w-5xl mx-auto pt-20 pb-16 px-6", left: "flex flex-col items-start text-left max-w-5xl mx-auto pt-20 pb-16 px-6", "split-right": "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-7xl mx-auto py-16 px-6", "split-left": "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-7xl mx-auto py-16 px-6" };
  return (<HeroContext.Provider value={{ layout, variant, theme }}><section ref={ref} className={cn("relative w-full overflow-hidden transition-all duration-500", variant === "glass" && "min-h-[600px] flex items-center justify-center", variant === "glow" && "bg-zinc-50 dark:bg-[#030303]", variant !== "glass" && layoutStyles[layout], className)} style={style} {...props}>{variant === "glow" && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-30 dark:opacity-20 blur-[100px] rounded-full pointer-events-none" style={{ background: \`radial-gradient(circle, \${theme.glow} 0%, transparent 70%)\` }} />}{children}</section></HeroContext.Provider>);
});
Hero.displayName = "Hero";

export const HeroContent = forwardRef(({ children, className, ...props }, ref) => {
  const { layout, variant } = useHero();
  const contentStyles = { center: "flex flex-col items-center justify-center w-full z-10", left: "flex flex-col items-start text-left w-full z-10", "split-right": "flex flex-col items-start text-left w-full z-10 order-2 lg:order-1", "split-left": "flex flex-col items-start text-left w-full z-10 order-2 lg:order-2" };
  return (<div ref={ref} className={cn(contentStyles[layout], variant === "glass" && "p-8 sm:p-12 rounded-3xl backdrop-blur-2xl bg-white/10 dark:bg-black/40 border border-white/20 dark:border-white/10 shadow-2xl z-10 max-w-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", className)} {...props}>{children}</div>);
});
HeroContent.displayName = "HeroContent";

export const HeroBadge = forwardRef(({ children, className, ...props }, ref) => {
  const { theme, variant } = useHero();
  return (<div ref={ref} className={cn("inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full text-sm font-bold tracking-tight border backdrop-blur-md transition-colors", variant === "glass" ? "bg-white/20 border-white/30 text-white" : cn(theme.bgSoft, theme.border), className)} {...props}>{children}</div>);
});
HeroBadge.displayName = "HeroBadge";

export const HeroTitle = forwardRef(({ children, glitch, className, ...props }, ref) => {
  const { variant } = useHero();
  const uniqueId = React.useId().replace(/:/g, "");
  return (<>{glitch && <style>{\`.glitch-\${uniqueId} { position: relative; } .glitch-\${uniqueId}::before, .glitch-\${uniqueId}::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.8; } .glitch-\${uniqueId}::before { left: 2px; text-shadow: -2px 0 red; clip: rect(24px, 550px, 90px, 0); animation: glitch-anim-2 3s infinite linear alternate-reverse; } .glitch-\${uniqueId}::after { left: -2px; text-shadow: -2px 0 blue; clip: rect(85px, 550px, 140px, 0); animation: glitch-anim 2.5s infinite linear alternate-reverse; } @keyframes glitch-anim { 0% { clip: rect(10px, 9999px, 44px, 0); } 20% { clip: rect(85px, 9999px, 140px, 0); } 40% { clip: rect(12px, 9999px, 89px, 0); } 60% { clip: rect(65px, 9999px, 10px, 0); } 80% { clip: rect(9px, 9999px, 53px, 0); } 100% { clip: rect(78px, 9999px, 110px, 0); } } @keyframes glitch-anim-2 { 0% { clip: rect(65px, 9999px, 100px, 0); } 20% { clip: rect(10px, 9999px, 50px, 0); } 40% { clip: rect(80px, 9999px, 20px, 0); } 60% { clip: rect(30px, 9999px, 90px, 0); } 80% { clip: rect(90px, 9999px, 40px, 0); } 100% { clip: rect(20px, 9999px, 70px, 0); } }\`}</style>}<h1 ref={ref} data-text={typeof children === "string" ? children : undefined} className={cn("text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance leading-[1.1]", variant === "glass" ? "text-white drop-shadow-md" : "text-zinc-900 dark:text-zinc-50", glitch && \`glitch-\${uniqueId}\`, className)} {...props}>{children}</h1></>);
});
HeroTitle.displayName = "HeroTitle";

export const HeroDescription = forwardRef(({ children, className, ...props }, ref) => {
  const { variant, layout } = useHero();
  return (<p ref={ref} className={cn("mt-6 text-lg sm:text-xl text-balance leading-relaxed", (layout === "center" || variant === "glass") ? "max-w-2xl mx-auto" : "max-w-xl", variant === "glass" ? "text-zinc-200 drop-shadow-sm" : "text-zinc-600 dark:text-zinc-400", className)} {...props}>{children}</p>);
});
HeroDescription.displayName = "HeroDescription";

export const HeroActions = forwardRef(({ children, className, ...props }, ref) => {
  const { layout } = useHero();
  return (<div ref={ref} className={cn("flex flex-wrap items-center gap-4 mt-8 sm:mt-10", layout === "center" && "justify-center", className)} {...props}>{children}</div>);
});
HeroActions.displayName = "HeroActions";

export const HeroAction = forwardRef(({ children, variant: actionVariant = "primary", className, ...props }, ref) => {
  const { theme, variant: heroVariant } = useHero();
  const getStyles = () => {
    if (heroVariant === "glass") {
      if (actionVariant === "primary") return "bg-white text-zinc-900 hover:bg-zinc-200 border border-white shadow-lg";
      if (actionVariant === "outline") return "bg-transparent border border-white/50 text-white hover:bg-white/10";
    }
    if (actionVariant === "glow") return cn(theme.bg, "relative overflow-hidden group shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all", \`shadow-[0_0_20px_var(--hero-color)]\`);
    if (actionVariant === "primary") return cn(theme.bg, "shadow-md hover:opacity-90");
    if (actionVariant === "secondary") return "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200";
    if (actionVariant === "outline") return "bg-transparent border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900";
    return "bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100";
  };
  return (<button ref={ref} className={cn("inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2", getStyles(), className)} {...props}>{actionVariant === "glow" && <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-0" />}<span className="relative z-10 flex items-center gap-2">{children}</span></button>);
});
HeroAction.displayName = "HeroAction";

export const HeroVisual = forwardRef(({ children, className, ...props }, ref) => {
  const { layout, variant } = useHero();
  const styles = { center: "w-full max-w-5xl mt-12 sm:mt-16 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl z-10", left: "w-full max-w-5xl mt-12 sm:mt-16 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl z-10", "split-right": "w-full h-full min-h-[300px] lg:min-h-[500px] rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl z-10 order-1 lg:order-2", "split-left": "w-full h-full min-h-[300px] lg:min-h-[500px] rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl z-10 order-1 lg:order-1" };
  return (<div ref={ref} className={cn(variant === "glass" ? "absolute inset-0 z-0" : styles[layout], className)} {...props}>{children}</div>);
});
HeroVisual.displayName = "HeroVisual";`;

export function HeroShowcase() {
  const [layout, setLayout] = useState<HeroLayout>("split-right");
  const [variant, setVariant] = useState<HeroVariant>("default");
  const [glitchTitle, setGlitchTitle] = useState(false);
  const [glowAction, setGlowAction] = useState(false);

  // Initialize with localStorage if available
  const [color, setColor] = useState<HeroColor | string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("primaryColor") || "indigo";
    }
    return "indigo";
  });

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

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    localStorage.setItem("primaryColor", newColor);
  };

  const generateUsageCode = (isTs: boolean) => {
    const propsStr = `\n      layout="${layout}"\n      variant="${variant}"\n      color="${color}"`;
    const titleProps = glitchTitle ? ` glitch` : "";
    const actionProps = glowAction ? ` variant="glow"` : ` variant="primary"`;

    return `import { 
  Hero, 
  HeroContent, 
  HeroBadge, 
  HeroTitle, 
  HeroDescription, 
  HeroActions, 
  HeroAction, 
  HeroVisual 
} from "@/components/custom/blocks/HeroBlock";
import { ArrowRight, PlayCircle, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <Hero ${propsStr}
    >
      <HeroContent>
        <HeroBadge>
          <Zap className="w-4 h-4" />
          <span>Supercharged Components</span>
        </HeroBadge>
        
        <HeroTitle${titleProps}>
          Build stunning interfaces with flawless code.
        </HeroTitle>
        
        <HeroDescription>
          Everything you need to launch a beautiful, accessible, and fast web application without writing layout CSS from scratch.
        </HeroDescription>
        
        <HeroActions>
          <HeroAction${actionProps}>
            Start Building
            <ArrowRight className="w-4 h-4" />
          </HeroAction>
          <HeroAction variant="outline">
            <PlayCircle className="w-4 h-4" />
            Watch Demo
          </HeroAction>
        </HeroActions>
      </HeroContent>

      <HeroVisual>
        <img 
          src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2000&auto=format&fit=crop" 
          alt="Abstract gradient interface"
          className="w-full h-full object-cover"
        />
      </HeroVisual>
    </Hero>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl z-0 relative">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Layout Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Structural Layout
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(
                ["center", "left", "split-right", "split-left"] as HeroLayout[]
              ).map((l) => (
                <button
                  key={l}
                  onClick={() => setLayout(l)}
                  className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                    layout === l
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {l.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Variant Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Style Variant
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(["default", "glass", "glow"] as HeroVariant[]).map((v) => (
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
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* Color Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Accent Color
            </label>
            <div className="flex items-center gap-2 h-10 px-2">
              {[
                { id: "indigo", bg: "bg-indigo-500" },
                { id: "rose", bg: "bg-rose-500" },
                { id: "emerald", bg: "bg-emerald-500" },
                { id: "zinc", bg: "bg-zinc-900 dark:bg-zinc-100" },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleColorChange(c.id)}
                  className={`w-7 h-7 rounded-full transition-all duration-200 outline-none flex items-center justify-center ${c.bg} ${
                    color === c.id
                      ? "ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500 scale-110"
                      : "hover:scale-110 hover:opacity-80"
                  }`}
                  title={c.id}
                />
              ))}

              <div className="w-px h-5 bg-zinc-300 dark:bg-zinc-700 mx-1" />

              <div
                className={`relative flex items-center justify-center w-7 h-7 rounded-full overflow-hidden border-2 transition-all ${color.startsWith("#") ? "border-zinc-900 dark:border-white scale-110 ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500" : "border-zinc-300 dark:border-zinc-700 hover:scale-110"}`}
              >
                <input
                  type="color"
                  value={color.startsWith("#") ? color : "#8b5cf6"}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="absolute inset-[-10px] w-12 h-12 cursor-pointer opacity-0"
                  title="Custom Hex Color"
                />
                <div
                  className="w-full h-full"
                  style={{
                    backgroundColor: color.startsWith("#")
                      ? color
                      : "transparent",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Advanced Toggles */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Advanced UI Effects
            </label>
            <div className="flex flex-wrap items-center gap-2 h-10">
              <button
                onClick={() => setGlitchTitle(!glitchTitle)}
                className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all ${
                  glitchTitle
                    ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400"
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                Glitch Title
              </button>
              <button
                onClick={() => setGlowAction(!glowAction)}
                className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all ${
                  glowAction
                    ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400"
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                Glow Action
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="HeroBlock"
        tsCode={HERO_ENGINE_CODE_TS}
        jsCode={HERO_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div className="w-full flex items-center justify-center transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#050505] overflow-hidden">
          <Hero layout={layout} variant={variant} color={color}>
            <HeroContent>
              <HeroBadge>
                <Zap className="w-4 h-4" />
                <span>Supercharged Components</span>
              </HeroBadge>

              <HeroTitle glitch={glitchTitle}>
                Build stunning interfaces with flawless code.
              </HeroTitle>

              <HeroDescription>
                Everything you need to launch a beautiful, accessible, and fast
                web application without writing layout CSS from scratch.
              </HeroDescription>

              <HeroActions>
                <HeroAction variant={glowAction ? "glow" : "primary"}>
                  Start Building
                  <ArrowRight className="w-4 h-4" />
                </HeroAction>
                <HeroAction variant="outline">
                  <PlayCircle className="w-4 h-4" />
                  Watch Demo
                </HeroAction>
              </HeroActions>
            </HeroContent>

            <HeroVisual>
              <img
                src="https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2000&auto=format&fit=crop"
                alt="Abstract gradient interface"
                className="w-full h-full object-cover"
              />
              {/* Optional overlay for glass variant to ensure text readability */}
              {variant === "glass" && (
                <div className="absolute inset-0 bg-black/20 z-0" />
              )}
            </HeroVisual>
          </Hero>
        </div>
      </ComponentPreview>
    </div>
  );
}
