"use client";

import React, { useState } from "react";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { TextAnimation, TextAnimationProps } from "@/components/custom/blocks/TextAnimationBlock";
import { RefreshCcw } from "lucide-react";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

const TEXT_ANIM_TS = `"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TextAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  variant?: 
    | "typewriter" 
    | "blur-reveal" 
    | "wave" 
    | "pop-in"
    | "flip"
    | "spin-in"
    | "blur-in-up";
  duration?: number;
  delay?: number;
  as?: React.ElementType;
}

export const TextAnimation = React.forwardRef<HTMLElement, TextAnimationProps>(
  (
    { 
      text, 
      variant = "blur-reveal", 
      duration = 0.5, 
      delay = 0, 
      as: Component = "p",
      className, 
      ...props 
    },
    ref
  ) => {
    // Determine the Motion component correctly for string tags or custom components
    const MotionComponent = typeof Component === "string" 
      // @ts-ignore
      ? motion[Component] 
      : motion(Component);

    const renderAnimation = () => {
      switch (variant) {
        case "typewriter": {
          const containerVariants: Variants = {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: duration / text.length, delayChildren: delay },
            },
          };

          const childVariants: Variants = {
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: "spring", damping: 12, stiffness: 100 },
            },
          };

          return (
            <MotionComponent
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={cn("flex flex-wrap gap-[0.25em]", className)}
            >
              {text.split(" ").map((word, index) => (
                <div key={index} className="flex">
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      variants={childVariants}
                      className="inline-block"
                    >
                      {char === " " ? "\\u00A0" : char}
                    </motion.span>
                  ))}
                </div>
              ))}
            </MotionComponent>
          );
        }

        case "blur-reveal": {
          const variants: Variants = {
            hidden: { opacity: 0, filter: "blur(10px)", scale: 0.95 },
            visible: {
              opacity: 1,
              filter: "blur(0px)",
              scale: 1,
              transition: { duration, delay, ease: "easeOut" },
            },
          };

          return (
            <MotionComponent
              variants={variants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={className}
            >
              {text}
            </MotionComponent>
          );
        }

        case "wave": {
          const containerVariants: Variants = {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05, delayChildren: delay },
            },
          };

          const childVariants: Variants = {
            hidden: { opacity: 0, y: 15 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { type: "spring", damping: 10, stiffness: 200 },
            },
          };

          return (
            <MotionComponent
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={cn("flex flex-wrap gap-[0.25em]", className)}
            >
              {text.split(" ").map((word, index) => (
                <div key={index} className="flex">
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      variants={childVariants}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
              ))}
            </MotionComponent>
          );
        }

        case "pop-in": {
          const containerVariants: Variants = {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: delay },
            },
          };

          const childVariants: Variants = {
            hidden: { opacity: 0, scale: 0.5, y: 10 },
            visible: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { type: "spring", damping: 12, stiffness: 200 },
            },
          };

          return (
            <MotionComponent
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={cn("flex flex-wrap gap-[0.25em]", className)}
            >
              {text.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  variants={childVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </MotionComponent>
          );
        }

        case "flip": {
          const containerVariants: Variants = {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: delay },
            },
          };

          const childVariants: Variants = {
            hidden: { opacity: 0, rotateX: -90, y: 20 },
            visible: {
              opacity: 1,
              rotateX: 0,
              y: 0,
              transition: { type: "spring", damping: 15, stiffness: 200 },
            },
          };

          return (
            <MotionComponent
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={cn("flex flex-wrap gap-[0.25em] perspective-[1000px]", className)}
            >
              {text.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  variants={childVariants}
                  className="inline-block origin-bottom"
                >
                  {word}
                </motion.span>
              ))}
            </MotionComponent>
          );
        }

        case "spin-in": {
          const containerVariants: Variants = {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05, delayChildren: delay },
            },
          };

          const childVariants: Variants = {
            hidden: { opacity: 0, scale: 0, rotate: -180 },
            visible: {
              opacity: 1,
              scale: 1,
              rotate: 0,
              transition: { type: "spring", damping: 12, stiffness: 200 },
            },
          };

          return (
            <MotionComponent
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={cn("flex flex-wrap gap-[0.25em]", className)}
            >
              {text.split(" ").map((word, index) => (
                <div key={index} className="flex">
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      variants={childVariants}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
              ))}
            </MotionComponent>
          );
        }

        case "blur-in-up": {
          const containerVariants: Variants = {
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: delay },
            },
          };

          const childVariants: Variants = {
            hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.6, ease: "easeOut" },
            },
          };

          return (
            <MotionComponent
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={cn("flex flex-wrap gap-[0.25em]", className)}
            >
              {text.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  variants={childVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </MotionComponent>
          );
        }

        default:
          return <Component className={className}>{text}</Component>;
      }
    };

    return (
      <div ref={ref as any} {...props}>
        {renderAnimation()}
      </div>
    );
  }
);

TextAnimation.displayName = "TextAnimation";
`;

const TEXT_ANIM_JS = TEXT_ANIM_TS
  .replace(/export interface TextAnimationProps extends React.HTMLAttributes<HTMLDivElement> {[^}]+\}/g, "")
  .replace(/<HTMLElement, TextAnimationProps>/g, "")
  .replace(/,\n    ref\n  \) => {/g, ", ref) => {");

export function TextAnimationShowcase() {
  const [variant, setVariant] = useState<TextAnimationProps["variant"]>("typewriter");
  const [text, setText] = useState("Better Experiences");
  const [textColor, setTextColor] = useState("#0f172a"); // Default text-slate-900
  const [key, setKey] = useState(0); // Used to force re-render/replay animation
  const [rotation, setRotation] = useState(0); // For reload button spin

  const getUsageCode = (isTs: boolean) => {
    return `import { TextAnimation } from "@/components/custom/blocks/TextAnimationBlock";

export default function App() {
  return (
    <div className="flex items-center justify-center p-12">
      <TextAnimation 
        text="${text}" 
        variant="${variant}" 
        className="text-4xl font-bold tracking-tight"
        style={{ color: "${textColor}" }}
      />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col md:flex-row gap-8 p-5 rounded-xl flex-wrap">
        {/* Variant Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Variant
          </label>
          <div className="flex bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-max border border-zinc-200 dark:border-white/5 flex-wrap gap-1">
            {(["typewriter", "blur-reveal", "wave", "pop-in", "flip", "spin-in", "blur-in-up"] as const).map((v) => (
              <button
                key={v}
                onClick={() => {
                  setVariant(v);
                  setKey((k) => k + 1);
                }}
                className={`px-3 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                  variant === v
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {v.replace(/-/g, " ")}
              </button>
            ))}
          </div>
        </div>

          {/* Color Picker */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Text Color
            </label>
            <div className="flex items-center gap-2 h-10 px-2">
              {[
                { id: "#4f46e5", bg: "bg-indigo-600" },
                { id: "#e11d48", bg: "bg-rose-600" },
                { id: "#059669", bg: "bg-emerald-600" },
                { id: "#0f172a", bg: "bg-zinc-900 dark:bg-zinc-100" },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setTextColor(c.id)}
                  className={`w-7 h-7 rounded-full transition-all duration-200 outline-none flex items-center justify-center ${c.bg} ${
                    textColor === c.id
                      ? "ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500 scale-110"
                      : "hover:scale-110 hover:opacity-80 cursor-pointer"
                  }`}
                  title={c.id}
                />
              ))}

              <div className="w-px h-5 bg-zinc-300 dark:bg-zinc-700 mx-1" />

              {/* Custom Color Picker */}
              <div
                className={`relative flex items-center justify-center w-7 h-7 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${!["#4f46e5", "#e11d48", "#059669", "#0f172a"].includes(textColor) ? "border-zinc-900 dark:border-white scale-110 ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500" : "border-zinc-300 dark:border-zinc-700 hover:scale-110"}`}
              >
                <input
                  type="color"
                  value={!["#4f46e5", "#e11d48", "#059669", "#0f172a"].includes(textColor) ? textColor : "#8B5CF6"}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="absolute inset-[-10px] w-12 h-12 cursor-pointer opacity-0"
                  title="Custom Hex Color"
                />
                <div
                  className="w-full h-full pointer-events-none"
                  style={{
                    backgroundColor: !["#4f46e5", "#e11d48", "#059669", "#0f172a"].includes(textColor)
                      ? textColor
                      : "transparent",
                  }}
                />
              </div>
            </div>
          </div>
        </ShowcaseControlPanel>


      {/* --- TEXT CONTENT INPUT --- */}
      <ShowcaseControlPanel className="flex flex-col gap-2 p-5 rounded-xl shadow-none">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
          Text Content
        </label>
        <div className="flex gap-2 w-full">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-3 py-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter text to animate..."
          />
          <button
            onClick={() => {
              setKey((k) => k + 1);
              setRotation((r) => r + 360);
            }}
            className="px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors flex items-center justify-center cursor-pointer"
            title="Replay Animation"
          >
            <RefreshCcw 
              size={18} 
              style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 0.5s ease-in-out' }} 
            />
          </button>
        </div>
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="TextAnimation"
        tsCode={TEXT_ANIM_TS}
        jsCode={TEXT_ANIM_JS}
        usageCode={getUsageCode(true)}
        jsUsageCode={getUsageCode(false)}
      >
        <div className="w-full min-h-[300px] bg-white dark:bg-black rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-8 text-center overflow-hidden">
          <TextAnimation
            key={key}
            text={text}
            variant={variant}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-2xl"
            style={{ color: textColor }}
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
