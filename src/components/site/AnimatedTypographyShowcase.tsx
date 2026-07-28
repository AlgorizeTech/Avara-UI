"use client";

import {
  AnimatedTypographyBlock,
  TypographyAlign,
  TypographyColor,
  TypographyTag,
  TypographyVariant,
} from "@/components/custom/blocks/AnimatedTypographyBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { VariantTabs } from "@/components/site/VariantTabs";
import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const TYPO_ENGINE_CODE_TS = `"use client";

import React, { forwardRef, useEffect, useState, useId } from "react";
import { cn } from "@/lib/utils";

export type TypographyVariant = "fade-up" | "blur-in" | "typewriter" | "glitch" | "glow" | "flip-up" | "reveal" | "pop-in" | "none";
export type TypographyTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "blockquote";
export type TypographyColor = "indigo" | "rose" | "emerald" | "zinc" | "default" | (string & {});
export type TypographyAlign = "left" | "center" | "right" | "justify";

const colorThemes: Record<string, string> = {
  indigo: "text-indigo-600 dark:text-indigo-400",
  rose: "text-rose-600 dark:text-rose-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
  zinc: "text-zinc-900 dark:text-zinc-100",
  default: "text-inherit",
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
    return { className: "text-[var(--typo-color)]", style: { "--typo-color": color, "--typo-rgb": rgb } as React.CSSProperties };
  }
  return { className: colorThemes[color] || colorThemes.default, style: {} };
};

const alignStyles: Record<TypographyAlign, string> = { left: "text-left", center: "text-center", right: "text-right", justify: "text-justify" };
const tagBaseStyles: Record<TypographyTag, string> = { h1: "font-extrabold tracking-tight leading-[1.1]", h2: "font-bold tracking-tight", h3: "font-semibold tracking-tight", h4: "font-semibold tracking-tight", h5: "font-medium", h6: "font-medium", p: "leading-relaxed", span: "", blockquote: "pl-6 italic border-l-4 border-zinc-300 dark:border-zinc-700" };
const tailwindSizes = new Set(["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl"]);

export interface AnimatedTypographyProps extends React.HTMLAttributes<HTMLElement> {
  as?: TypographyTag;
  variant?: TypographyVariant;
  text: string;
  color?: TypographyColor;
  align?: TypographyAlign;
  size?: string;
  delay?: number;
  speed?: number;
}

export const AnimatedTypographyBlock = forwardRef<HTMLElement, AnimatedTypographyProps>(({ as: Tag = "p", variant = "fade-up", text, color = "default", align = "left", size, delay = 0, speed = 1, className, ...props }, ref) => {
  const { className: colorClass, style: colorStyle } = getThemeStyles(color as string);
  const uniqueId = useId().replace(/:/g, "");
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (variant === "typewriter") {
      setDisplayedText(""); setIsTyping(true); let currentIndex = 0;
      const timeout = setTimeout(() => { const interval = setInterval(() => { if (currentIndex <= text.length) { setDisplayedText(text.slice(0, currentIndex)); currentIndex++; } else { clearInterval(interval); setIsTyping(false); } }, 30 * speed); return () => clearInterval(interval); }, delay);
      return () => clearTimeout(timeout);
    }
  }, [text, variant, delay, speed]);

  let sizeClass = ""; let customSizeStyle: React.CSSProperties = {};
  if (size) { if (tailwindSizes.has(size)) sizeClass = \`text-\${size}\`; else customSizeStyle = { fontSize: size }; } 
  else { const defaultSizeMap: Record<TypographyTag, string> = { h1: "text-4xl sm:text-5xl lg:text-6xl", h2: "text-3xl sm:text-4xl", h3: "text-2xl sm:text-3xl", h4: "text-xl sm:text-2xl", h5: "text-lg sm:text-xl", h6: "text-base sm:text-lg", p: "text-base", span: "text-inherit", blockquote: "text-lg" }; sizeClass = defaultSizeMap[Tag]; }

  const words = text.split(" ");
  const renderContent = () => {
    switch (variant) {
      case "fade-up": return words.map((word, i) => (<span key={i} className="inline-block overflow-hidden align-bottom pb-1 -mb-1"><span className="inline-block animate-[typo-slide-up_0.6s_cubic-bezier(0.16,1,0.3,1)_both]" style={{ animationDelay: \`\${delay + (i * 60 * speed)}ms\` }}>{word}&nbsp;</span></span>));
      case "reveal": return words.map((word, i) => (<span key={i} className="inline-block overflow-hidden align-bottom pb-1 -mb-1"><span className="inline-block animate-[typo-reveal_0.7s_cubic-bezier(0.77,0,0.175,1)_both]" style={{ animationDelay: \`\${delay + (i * 50 * speed)}ms\` }}>{word}&nbsp;</span></span>));
      case "flip-up": return words.map((word, i) => (<span key={i} className="inline-block perspective-[1000px]"><span className="inline-block origin-bottom animate-[typo-flip-up_0.8s_cubic-bezier(0.175,0.885,0.32,1.275)_both]" style={{ animationDelay: \`\${delay + (i * 80 * speed)}ms\` }}>{word}&nbsp;</span></span>));
      case "blur-in": return words.map((word, i) => (<span key={i} className="inline-block animate-[typo-blur-in_0.8s_ease-out_both]" style={{ animationDelay: \`\${delay + (i * 80 * speed)}ms\` }}>{word}&nbsp;</span>));
      case "pop-in": return words.map((word, i) => (<span key={i} className="inline-block animate-[typo-pop-in_0.6s_cubic-bezier(0.175,0.885,0.32,1.275)_both]" style={{ animationDelay: \`\${delay + (i * 50 * speed)}ms\` }}>{word}&nbsp;</span>));
      case "typewriter": return (<>{displayedText}<span className={cn("inline-block w-[0.1em] h-[1em] ml-1 align-middle bg-current transition-opacity duration-100", isTyping ? "animate-[pulse_0.1s_ease-in-out_infinite]" : "animate-[pulse_1s_ease-in-out_infinite]")} /></>);
      case "glitch": return (<><style>{\`.typo-glitch-\${uniqueId} { position: relative; display: inline-block; } .typo-glitch-\${uniqueId}::before, .typo-glitch-\${uniqueId}::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.8; } .typo-glitch-\${uniqueId}::before { left: 2px; text-shadow: -2px 0 red; clip: rect(24px, 550px, 90px, 0); animation: glitch-anim-2 3s infinite linear alternate-reverse; } .typo-glitch-\${uniqueId}::after { left: -2px; text-shadow: -2px 0 blue; clip: rect(85px, 550px, 140px, 0); animation: glitch-anim 2.5s infinite linear alternate-reverse; } @keyframes glitch-anim { 0% { clip: rect(10px, 9999px, 44px, 0); } 20% { clip: rect(85px, 9999px, 140px, 0); } 40% { clip: rect(12px, 9999px, 89px, 0); } 60% { clip: rect(65px, 9999px, 10px, 0); } 80% { clip: rect(9px, 9999px, 53px, 0); } 100% { clip: rect(78px, 9999px, 110px, 0); } } @keyframes glitch-anim-2 { 0% { clip: rect(65px, 9999px, 100px, 0); } 20% { clip: rect(10px, 9999px, 50px, 0); } 40% { clip: rect(80px, 9999px, 20px, 0); } 60% { clip: rect(30px, 9999px, 90px, 0); } 80% { clip: rect(90px, 9999px, 40px, 0); } 100% { clip: rect(20px, 9999px, 70px, 0); } }\`}</style><span className={\`typo-glitch-\${uniqueId}\`} data-text={text}>{text}</span></>);
      case "glow": return (<span className="animate-[typo-glow_3s_ease-in-out_infinite_alternate]" style={{ textShadow: color === "default" ? "0 0 20px rgba(255,255,255,0.5)" : "0 0 20px var(--typo-color, currentColor)" }}>{text}</span>);
      case "none": default: return text;
    }
  };

  return (
    <>
      <style>{\`@keyframes typo-slide-up { 0% { opacity: 0; transform: translateY(100%); } 100% { opacity: 1; transform: translateY(0); } } @keyframes typo-reveal { 0% { transform: translateY(100%); } 100% { transform: translateY(0); } } @keyframes typo-flip-up { 0% { opacity: 0; transform: rotateX(-90deg); } 100% { opacity: 1; transform: rotateX(0deg); } } @keyframes typo-blur-in { 0% { opacity: 0; filter: blur(12px); transform: scale(0.95); } 100% { opacity: 1; filter: blur(0px); transform: scale(1); } } @keyframes typo-pop-in { 0% { opacity: 0; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1); } } @keyframes typo-glow { 0% { filter: brightness(1); } 100% { filter: brightness(1.5); } }\`}</style>
      <Tag ref={ref as any} className={cn(tagBaseStyles[Tag], alignStyles[align], sizeClass, colorClass, className)} style={{ ...colorStyle, ...customSizeStyle }} {...props}>
        <span className="sr-only">{text}</span>
        <span aria-hidden="true" className="inline-block w-full">{renderContent()}</span>
      </Tag>
    </>
  );
});
AnimatedTypographyBlock.displayName = "AnimatedTypographyBlock";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const TYPO_ENGINE_CODE_JS = `"use client";

import React, { forwardRef, useEffect, useState, useId } from "react";
import { cn } from "@/lib/utils";

const colorThemes = { indigo: "text-indigo-600 dark:text-indigo-400", rose: "text-rose-600 dark:text-rose-400", emerald: "text-emerald-600 dark:text-emerald-400", zinc: "text-zinc-900 dark:text-zinc-100", default: "text-inherit" };
const hexToRgb = (hex) => { let cleanHex = hex.replace(/^#/, ""); if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join(""); const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex); return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "99, 102, 241"; };
export const getThemeStyles = (color) => { if (color && color.startsWith("#")) { const rgb = hexToRgb(color); return { className: "text-[var(--typo-color)]", style: { "--typo-color": color, "--typo-rgb": rgb } }; } return { className: colorThemes[color] || colorThemes.default, style: {} }; };

const alignStyles = { left: "text-left", center: "text-center", right: "text-right", justify: "text-justify" };
const tagBaseStyles = { h1: "font-extrabold tracking-tight leading-[1.1]", h2: "font-bold tracking-tight", h3: "font-semibold tracking-tight", h4: "font-semibold tracking-tight", h5: "font-medium", h6: "font-medium", p: "leading-relaxed", span: "", blockquote: "pl-6 italic border-l-4 border-zinc-300 dark:border-zinc-700" };
const tailwindSizes = new Set(["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl"]);

export const AnimatedTypographyBlock = forwardRef(({ as: Tag = "p", variant = "fade-up", text, color = "default", align = "left", size, delay = 0, speed = 1, className, ...props }, ref) => {
  const { className: colorClass, style: colorStyle } = getThemeStyles(color);
  const uniqueId = useId().replace(/:/g, "");
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (variant === "typewriter") {
      setDisplayedText(""); setIsTyping(true); let currentIndex = 0;
      const timeout = setTimeout(() => { const interval = setInterval(() => { if (currentIndex <= text.length) { setDisplayedText(text.slice(0, currentIndex)); currentIndex++; } else { clearInterval(interval); setIsTyping(false); } }, 30 * speed); return () => clearInterval(interval); }, delay);
      return () => clearTimeout(timeout);
    }
  }, [text, variant, delay, speed]);

  let sizeClass = ""; let customSizeStyle = {};
  if (size) { if (tailwindSizes.has(size)) sizeClass = \`text-\${size}\`; else customSizeStyle = { fontSize: size }; } 
  else { const defaultSizeMap = { h1: "text-4xl sm:text-5xl lg:text-6xl", h2: "text-3xl sm:text-4xl", h3: "text-2xl sm:text-3xl", h4: "text-xl sm:text-2xl", h5: "text-lg sm:text-xl", h6: "text-base sm:text-lg", p: "text-base", span: "text-inherit", blockquote: "text-lg" }; sizeClass = defaultSizeMap[Tag]; }

  const words = text.split(" ");
  const renderContent = () => {
    switch (variant) {
      case "fade-up": return words.map((word, i) => (<span key={i} className="inline-block overflow-hidden align-bottom pb-1 -mb-1"><span className="inline-block animate-[typo-slide-up_0.6s_cubic-bezier(0.16,1,0.3,1)_both]" style={{ animationDelay: \`\${delay + (i * 60 * speed)}ms\` }}>{word}&nbsp;</span></span>));
      case "reveal": return words.map((word, i) => (<span key={i} className="inline-block overflow-hidden align-bottom pb-1 -mb-1"><span className="inline-block animate-[typo-reveal_0.7s_cubic-bezier(0.77,0,0.175,1)_both]" style={{ animationDelay: \`\${delay + (i * 50 * speed)}ms\` }}>{word}&nbsp;</span></span>));
      case "flip-up": return words.map((word, i) => (<span key={i} className="inline-block perspective-[1000px]"><span className="inline-block origin-bottom animate-[typo-flip-up_0.8s_cubic-bezier(0.175,0.885,0.32,1.275)_both]" style={{ animationDelay: \`\${delay + (i * 80 * speed)}ms\` }}>{word}&nbsp;</span></span>));
      case "blur-in": return words.map((word, i) => (<span key={i} className="inline-block animate-[typo-blur-in_0.8s_ease-out_both]" style={{ animationDelay: \`\${delay + (i * 80 * speed)}ms\` }}>{word}&nbsp;</span>));
      case "pop-in": return words.map((word, i) => (<span key={i} className="inline-block animate-[typo-pop-in_0.6s_cubic-bezier(0.175,0.885,0.32,1.275)_both]" style={{ animationDelay: \`\${delay + (i * 50 * speed)}ms\` }}>{word}&nbsp;</span>));
      case "typewriter": return (<>{displayedText}<span className={cn("inline-block w-[0.1em] h-[1em] ml-1 align-middle bg-current transition-opacity duration-100", isTyping ? "animate-[pulse_0.1s_ease-in-out_infinite]" : "animate-[pulse_1s_ease-in-out_infinite]")} /></>);
      case "glitch": return (<><style>{\`.typo-glitch-\${uniqueId} { position: relative; display: inline-block; } .typo-glitch-\${uniqueId}::before, .typo-glitch-\${uniqueId}::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.8; } .typo-glitch-\${uniqueId}::before { left: 2px; text-shadow: -2px 0 red; clip: rect(24px, 550px, 90px, 0); animation: glitch-anim-2 3s infinite linear alternate-reverse; } .typo-glitch-\${uniqueId}::after { left: -2px; text-shadow: -2px 0 blue; clip: rect(85px, 550px, 140px, 0); animation: glitch-anim 2.5s infinite linear alternate-reverse; } @keyframes glitch-anim { 0% { clip: rect(10px, 9999px, 44px, 0); } 20% { clip: rect(85px, 9999px, 140px, 0); } 40% { clip: rect(12px, 9999px, 89px, 0); } 60% { clip: rect(65px, 9999px, 10px, 0); } 80% { clip: rect(9px, 9999px, 53px, 0); } 100% { clip: rect(78px, 9999px, 110px, 0); } } @keyframes glitch-anim-2 { 0% { clip: rect(65px, 9999px, 100px, 0); } 20% { clip: rect(10px, 9999px, 50px, 0); } 40% { clip: rect(80px, 9999px, 20px, 0); } 60% { clip: rect(30px, 9999px, 90px, 0); } 80% { clip: rect(90px, 9999px, 40px, 0); } 100% { clip: rect(20px, 9999px, 70px, 0); } }\`}</style><span className={\`typo-glitch-\${uniqueId}\`} data-text={text}>{text}</span></>);
      case "glow": return (<span className="animate-[typo-glow_3s_ease-in-out_infinite_alternate]" style={{ textShadow: color === "default" ? "0 0 20px rgba(255,255,255,0.5)" : "0 0 20px var(--typo-color, currentColor)" }}>{text}</span>);
      case "none": default: return text;
    }
  };

  return (
    <>
      <style>{\`@keyframes typo-slide-up { 0% { opacity: 0; transform: translateY(100%); } 100% { opacity: 1; transform: translateY(0); } } @keyframes typo-reveal { 0% { transform: translateY(100%); } 100% { transform: translateY(0); } } @keyframes typo-flip-up { 0% { opacity: 0; transform: rotateX(-90deg); } 100% { opacity: 1; transform: rotateX(0deg); } } @keyframes typo-blur-in { 0% { opacity: 0; filter: blur(12px); transform: scale(0.95); } 100% { opacity: 1; filter: blur(0px); transform: scale(1); } } @keyframes typo-pop-in { 0% { opacity: 0; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1); } } @keyframes typo-glow { 0% { filter: brightness(1); } 100% { filter: brightness(1.5); } }\`}</style>
      <Tag ref={ref} className={cn(tagBaseStyles[Tag], alignStyles[align], sizeClass, colorClass, className)} style={{ ...colorStyle, ...customSizeStyle }} {...props}>
        <span className="sr-only">{text}</span>
        <span aria-hidden="true" className="inline-block w-full">{renderContent()}</span>
      </Tag>
    </>
  );
});
AnimatedTypographyBlock.displayName = "AnimatedTypographyBlock";`;

export function AnimatedTypographyShowcase() {
  const [tag, setTag] = useState<TypographyTag>("h1");
  const [variant, setVariant] = useState<TypographyVariant>("flip-up");
  const [align, setAlign] = useState<TypographyAlign>("center");
  const [customSize, setCustomSize] = useState("");
  const [customText, setCustomText] = useState(
    "The quick brown fox jumps over the lazy dog.",
  );
  const [animationKey, setAnimationKey] = useState(0);

  const [color, setColor] = useState<TypographyColor | string>(() => {
    if (typeof window !== "undefined")
      return localStorage.getItem("primaryColor") || "default";
    return "default";
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

  const triggerAnimation = () => {
    setAnimationKey((prev) => prev + 1);
  };

  const generateUsageCode = (isTs: boolean) => {
    let propsStr = `\n      as="${tag}"\n      variant="${variant}"\n      align="${align}"\n      text="${customText}"`;
    if (color !== "default") propsStr += `\n      color="${color}"`;
    if (customSize) propsStr += `\n      size="${customSize}"`;

    return `import { AnimatedTypographyBlock } from "@/components/custom/blocks/AnimatedTypographyBlock";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";

export default function App() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <AnimatedTypographyBlock ${propsStr}
      />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- REORGANIZED CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col gap-6 p-6 rounded-2xl border-red-500/50 dark:border-red-500/50">
        {/* ROW 1: Hero Text Input & Replay Button */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Text Content
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && triggerAnimation()}
              placeholder="Enter text to animate..."
              className="w-full h-10 px-3.5 text-sm bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-zinc-900 dark:text-white placeholder:text-zinc-400"
            />
            <button
              onClick={triggerAnimation}
              className="h-10 px-4 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90 font-medium text-sm flex items-center gap-2 shrink-0 transition-all shadow-sm active:scale-95 cursor-pointer"
              title="Replay Animation"
            >
              <RefreshCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Replay</span>
            </button>
          </div>
        </div>

        {/* ROW 2: Animation Variant (Spans Full Width neatly) */}
        <VariantTabs
          label="Animation Variant"
          variants={["fade-up", "reveal", "flip-up", "pop-in", "blur-in", "typewriter", "glitch", "glow", "none"]}
          defaultValue="fade-up"
          onValueChange={(v) => { setVariant(v as TypographyVariant); triggerAnimation(); }}
        />

        {/* ROW 3: Structured 4-Column Grid for Settings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-2 border-t border-zinc-200/80 dark:border-zinc-800/80">
          {/* Semantic Tag */}
          <VariantTabs
            label="Semantic Tag"
            variants={["h1", "h2", "h3", "p", "blockquote"]}
            defaultValue="h1"
            onValueChange={(v) => { setTag(v as TypographyTag); triggerAnimation(); }}
          />

          {/* Alignment */}
          <VariantTabs
            label="Alignment"
            variants={["left", "center", "right"]}
            defaultValue="center"
            onValueChange={(v) => { setAlign(v as TypographyAlign); triggerAnimation(); }}
          />

          {/* Size Override */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Size Override{" "}
              <span className="text-[10px] font-normal lowercase opacity-70">
                (opt)
              </span>
            </label>
            <input
              type="text"
              placeholder="e.g. 5xl, 24px, 2rem"
              value={customSize}
              onChange={(e) => setCustomSize(e.target.value)}
              className="w-full h-10 px-3 text-xs bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-zinc-900 dark:text-white placeholder:text-zinc-400"
            />
          </div>

          {/* Color */}
          <ThemeColorPicker color={color} onChange={handleColorChange} label="Text Color" />
        </div>
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="AnimatedTypographyBlock"
        tsCode={TYPO_ENGINE_CODE_TS}
        jsCode={TYPO_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div className="w-full flex items-center justify-center transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-6 sm:p-12 lg:p-24 overflow-hidden min-h-[350px]">
          <div className="w-full max-w-4xl flex flex-col justify-center">
            {/* The key prop forces React to remount the component, re-triggering the CSS/JS animations */}
            <AnimatedTypographyBlock
              key={`${animationKey}-${variant}-${tag}-${align}`}
              as={tag}
              variant={variant}
              align={align}
              size={customSize}
              text={customText}
              color={color}
            />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
