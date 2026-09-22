"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BatteryFull,
  Check,
  Copy,
  Github,
  Signal,
  Sparkles,
  Terminal,
  Wifi,
} from "lucide-react";
import {
  Iphone17ProMaxMockup,
  Iphone14ProMaxMockup,
  Iphone12ProMaxMockup,
  Iphone5Mockup,
  SamsungS24UltraMockup,
  GooglePixel8Mockup,
  GooglePixel10Mockup,
} from "@/components/custom/blocks/MobileMockupBlock";

const TYPING_WORDS = [
  "Interfaces",
  "Components",
  "Experiences",
  "Animations",
  "Dashboards",
];

const CLI_COMMAND =
  "npx shadcn@latest add @algorize-ui/mobile-mockup";

/** The strip that follows the hero on the homepage, at phone width. */
const TECH_STACK = ["React JS", "Next.js", "TypeScript", "Tailwind CSS"];

/** Stands in for the live component hub the homepage puts under the hero. */
const PREVIEW_BARS = [38, 72, 54, 92, 80, 100, 66];

/**
 * This site's own hero section, rebuilt at phone scale.
 *
 * It deliberately does not reuse `HomepageHeroBlock`: that block sizes itself
 * off Tailwind's viewport breakpoints, so inside a 300px-wide frame on a
 * desktop viewport it would still render at `lg:` sizes and overflow. The
 * content, order and motion are the same — only the type scale is fixed.
 */
function HeroScreen({ homeIndicator = true }: { homeIndicator?: boolean }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(CLI_COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative w-full h-full bg-background overflow-hidden flex flex-col">
      {/* Radial glow + grid, matching the real hero's backdrop. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -5%, var(--primary) 0%, transparent 65%)",
          opacity: 0.14,
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_40%,black_40%,transparent_100%)]" />

      {/* Status bar. Time left, radios right — the gap clears the notch or
          island on the frames that have one. */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-3 text-[10px] font-semibold text-foreground shrink-0">
        <span className="tabular-nums">9:41</span>
        <span className="flex items-center gap-1">
          <Signal className="size-3" />
          <Wifi className="size-3" />
          <BatteryFull className="size-3.5" />
        </span>
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 gap-2.5 min-h-0">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-[9px] font-semibold text-primary">
          <Sparkles className="size-2.5 shrink-0" />
          <span>Next-Gen React Components</span>
        </div>

        <h1 className="text-[19px] font-bold tracking-tight leading-tight text-foreground">
          Build <span className="text-primary">Interactive</span>
          <span className="block relative h-[1.3em] overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={TYPING_WORDS[wordIndex]}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-0 whitespace-nowrap"
              >
                {TYPING_WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        <p className="text-[10px] leading-snug font-medium text-muted-foreground px-1">
          A meticulous library of React components &amp; interactive blocks,
          built on Tailwind CSS, TypeScript and Framer Motion.
        </p>

        <button
          type="button"
          onClick={handleCopy}
          className="group flex items-center gap-2 w-full max-w-[230px] h-9 px-2.5 rounded-xl border border-zinc-200 dark:border-border bg-zinc-100/70 dark:bg-card cursor-pointer hover:border-zinc-300 dark:hover:border-primary/50 transition-colors"
        >
          <Terminal className="size-3 text-zinc-700 dark:text-primary shrink-0" />
          <code className="flex-1 text-left text-[9px] font-mono font-semibold text-foreground truncate !bg-transparent !border-none !p-0 !shadow-none">
            {CLI_COMMAND}
          </code>
          {copied ? (
            <Check className="size-3 text-emerald-500 shrink-0" />
          ) : (
            <Copy className="size-3 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
          )}
        </button>

        <div className="flex items-center gap-2 w-full max-w-[230px]">
          <button
            type="button"
            className="flex-1 h-9 rounded-xl bg-primary text-primary-foreground text-[10px] font-semibold flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-[0.98] transition-all"
          >
            Browse Components
            <ArrowRight className="size-3 shrink-0" />
          </button>
          <button
            type="button"
            aria-label="Star on GitHub"
            className="size-9 shrink-0 rounded-xl border border-border bg-card text-foreground flex items-center justify-center hover:bg-primary/10 hover:border-primary/50 hover:text-primary active:scale-[0.98] transition-all"
          >
            <Github className="size-4" />
          </button>
        </div>

        <div className="w-full max-w-[230px] rounded-xl border border-border bg-card/80 overflow-hidden">
          <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-border/70">
            <span className="flex items-center gap-1 text-[8px] font-semibold text-foreground">
              <Sparkles className="size-2 text-primary shrink-0" />
              Live Component Preview
            </span>
            <span className="text-[7px] font-mono text-muted-foreground">120+</span>
          </div>
          <div className="flex items-end justify-center gap-[6px] h-[54px] px-2.5 pt-2 pb-2.5">
            {PREVIEW_BARS.map((height, index) => (
              <span
                key={index}
                style={{ height: `${height}%` }}
                className="w-[11px] rounded-[3px] bg-primary/70"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 shrink-0 border-t border-border bg-muted/40 py-2.5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex items-center justify-center gap-4">
          {TECH_STACK.map((tech) => (
            <span
              key={tech}
              className="flex items-center gap-1 text-[8px] font-semibold tracking-wide text-muted-foreground whitespace-nowrap"
            >
              <span className="size-1 rounded-full bg-primary shrink-0" />
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Home indicator — skipped on the frames that have a physical button. */}
      {homeIndicator && (
        <div className="relative z-10 h-5 flex items-center justify-center shrink-0">
          <div className="w-[110px] h-[4px] rounded-full bg-foreground/25" />
        </div>
      )}
    </div>
  );
}

const DEVICES = {
  iphone17: Iphone17ProMaxMockup,
  iphone14: Iphone14ProMaxMockup,
  iphone12: Iphone12ProMaxMockup,
  iphone5: Iphone5Mockup,
  samsung: SamsungS24UltraMockup,
  pixel8: GooglePixel8Mockup,
  pixel10: GooglePixel10Mockup,
} as const;

export default function MobileMockupDemo({
  activeDevice = "iphone17",
}: {
  activeDevice?: keyof typeof DEVICES;
}) {
  const Mockup = DEVICES[activeDevice] ?? DEVICES.iphone17;

  return (
    <div className="flex items-center justify-center w-full min-h-[780px] p-8">
      <Mockup>
        <HeroScreen homeIndicator={activeDevice !== "iphone5"} />
      </Mockup>
    </div>
  );
}
