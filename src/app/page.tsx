"use client";

import { ComputeBlock } from "@/components/custom/blocks/ComputeBlock";
import { PaymentBlock } from "@/components/custom/blocks/PaymentBlock";
import {
  NotificationsBlock,
  SecurityBlock,
} from "@/components/custom/blocks/SettingsBlock";
import {
  CommandSearchBlock,
  TeamMembersBlock,
} from "@/components/custom/blocks/UtilityBlocks";
import { navigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  Github,
  Layers,
  Moon,
  Paintbrush,
  Sparkles,
  Terminal,
  Zap,
  Component,
  Boxes,
  LayoutTemplate,
  Package,
  Linkedin,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const techStack = [
  { name: "React.js", color: "#61DAFB" },
  { name: "Next.js", color: "#ffffff" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Tailwind CSS", color: "#06B6D4" },
  { name: "Framer Motion", color: "#FF0055" },
  { name: "Lucide Icons", color: "#F56565" },
  { name: "GSAP", color: "#EEAD0E" },
];

const features = [
  {
    icon: Code2,
    title: "Copy & Paste",
    desc: "No npm install. Just copy the code directly into your project and customize it. Own your components.",
    gradient: "from-sky-500 to-blue-600",
  },
  {
    icon: Moon,
    title: "Dark Mode First",
    desc: "Every component is crafted for both light and dark themes. Seamless switching, zero extra work.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: Paintbrush,
    title: "Fully Customizable",
    desc: "Built with Tailwind CSS and Radix primitives. Adapt colors, spacing, typography — make it yours.",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    icon: Zap,
    title: "Production Ready",
    desc: "Accessible, responsive, and performant. Built on battle-tested patterns used in real applications.",
    gradient: "from-amber-500 to-orange-600",
  },
];

const categoryIcons: Record<string, typeof Component> = {
  "Ui Components": Boxes,
  "Animated Ui Components": Sparkles,
  "Website Sections": LayoutTemplate,
};

/* ═══════════════════════════════════════════════
   DECORATIVE: 3D CUBE
   ═══════════════════════════════════════════════ */

function HeroCube() {
  return (
    <div className="cube-scene relative" style={{ width: 260, height: 260 }}>
      {/* Glow behind cube */}
      <div className="absolute inset-0 rounded-full bg-indigo-500/10 dark:bg-indigo-500/8 blur-[80px] scale-150" />
      <div
        className="cube"
        style={{ width: 200, height: 200, margin: "30px" }}
      >
        <div className="cube-face front" />
        <div className="cube-face back" />
        <div className="cube-face right" />
        <div className="cube-face left" />
        <div className="cube-face top" />
        <div className="cube-face bottom" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MINI PREVIEW CARDS (for the hero bottom row)
   ═══════════════════════════════════════════════ */

function MiniBarChart() {
  const bars = [32, 58, 42, 75, 50, 68, 85, 55, 72, 48, 63, 80];
  return (
    <div className="flex items-end gap-[2.5px] h-[60px] px-3 pb-2 pt-4">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-[2px] bg-indigo-500/40 dark:bg-indigo-400/30"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

function MiniForm() {
  return (
    <div className="p-3 space-y-1.5 pt-4">
      <div className="h-[6px] w-14 rounded-full bg-zinc-300 dark:bg-zinc-700" />
      <div className="h-6 rounded-md bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/50" />
      <div className="h-[6px] w-18 rounded-full bg-zinc-300 dark:bg-zinc-700" />
      <div className="h-6 rounded-md bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/50" />
      <div className="h-6 rounded-md bg-indigo-500/20 dark:bg-indigo-500/15 border border-indigo-300/30 dark:border-indigo-500/20 mt-1" />
    </div>
  );
}

function MiniAvatars() {
  const colors = ["bg-sky-400", "bg-violet-400", "bg-emerald-400", "bg-rose-400"];
  return (
    <div className="p-3 pt-4 flex flex-col gap-2">
      {colors.map((c, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={cn("size-5 rounded-full shrink-0", c)} />
          <div className="flex-1 space-y-1">
            <div className="h-[5px] w-16 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <div className="h-[4px] w-10 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
      ))}
    </div>
  );
}

function MiniToggles() {
  return (
    <div className="p-3 pt-4 space-y-2.5">
      {[true, false, true].map((on, i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="h-[5px] w-14 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <div
            className={cn(
              "w-7 h-4 rounded-full flex items-center p-0.5",
              on
                ? "bg-emerald-500/60 justify-end"
                : "bg-zinc-300 dark:bg-zinc-700 justify-start"
            )}
          >
            <div className="size-3 rounded-full bg-white dark:bg-zinc-200 shadow-sm" />
          </div>
        </div>
      ))}
    </div>
  );
}

function MiniCodeBlock() {
  return (
    <div className="p-3 pt-4 font-mono text-[8px] leading-relaxed space-y-0.5">
      <div className="flex gap-1">
        <span className="text-violet-400">const</span>
        <span className="text-sky-300">Button</span>
        <span className="text-zinc-500">=</span>
        <span className="text-amber-300">{`()`}</span>
        <span className="text-zinc-500">{`=>`}</span>
        <span className="text-zinc-500">{`{`}</span>
      </div>
      <div className="pl-2 flex gap-1">
        <span className="text-violet-400">return</span>
        <span className="text-zinc-500">(</span>
      </div>
      <div className="pl-4 flex gap-1">
        <span className="text-emerald-400">{`<button`}</span>
        <span className="text-sky-300">className</span>
        <span className="text-zinc-500">=</span>
        <span className="text-amber-300">{`"btn"`}</span>
        <span className="text-emerald-400">{`>`}</span>
      </div>
      <div className="pl-6 text-zinc-300">Click me</div>
      <div className="pl-4 text-emerald-400">{`</button>`}</div>
    </div>
  );
}

function PreviewCard({
  children,
  label,
  delay = 0,
}: {
  children: React.ReactNode;
  label: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-xl border border-zinc-200 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/40 overflow-hidden showcase-card"
    >
      <div className="px-3 py-1.5 border-b border-zinc-100 dark:border-zinc-800/50 flex items-center gap-1.5">
        <div className="size-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
        <span className="text-[9px] font-medium text-zinc-400 dark:text-zinc-600">
          {label}
        </span>
      </div>
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 1: HERO
   ═══════════════════════════════════════════════ */

function HeroSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx docs-ui@latest init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.12)_0%,transparent_60%)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black_40%,transparent_100%)]" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto w-full px-6 md:px-8 pt-20 md:pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-12 lg:gap-20 items-center">
          {/* Left — Content */}
          <div className="flex flex-col gap-6 max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/docs"
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200/80 dark:border-white/[0.08] text-[12px] font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-white/20 transition-all duration-300"
              >
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                New: 100+ Components Available
                <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[2.75rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.25rem] font-black tracking-[-0.035em] leading-[1.05] text-zinc-900 dark:text-white"
            >
              Next-Gen UI{" "}
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500">
                Components
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[16px] sm:text-[18px] text-zinc-500 dark:text-zinc-400 max-w-[480px] leading-relaxed"
            >
              A curated collection of beautifully designed, production-ready
              React components. Copy, paste and ship — no installation required.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                href="/docs"
                className="px-6 py-2.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[14px] font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="https://github.com/docs/docs"
                target="_blank"
                className="px-6 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-[14px] font-bold hover:border-zinc-500 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-white transition-all flex items-center gap-2"
              >
                <Github className="size-4" />
                Star on GitHub
              </Link>
            </motion.div>

            {/* Terminal Install */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <button
                onClick={handleCopy}
                className="group flex items-center gap-3 px-4 py-3 rounded-lg terminal-block cursor-pointer w-full max-w-sm"
              >
                <Terminal className="size-4 text-zinc-500 dark:text-zinc-500 shrink-0" />
                <code className="text-[13px] font-mono text-zinc-600 dark:text-zinc-400 flex-1 text-left">
                  npx docs-ui@latest init
                </code>
                <div className="pl-3 border-l border-zinc-200 dark:border-zinc-700/50">
                  {copied ? (
                    <Check className="size-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="size-3.5 text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-700 dark:group-hover:text-zinc-400 transition-colors" />
                  )}
                </div>
              </button>
            </motion.div>
          </div>

          {/* Right — 3D Cube */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center"
          >
            <HeroCube />
          </motion.div>
        </div>

        {/* Mini Preview Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-16 md:mt-20 pb-8">
          <PreviewCard label="Chart" delay={0.5}>
            <MiniBarChart />
          </PreviewCard>
          <PreviewCard label="Form" delay={0.55}>
            <MiniForm />
          </PreviewCard>
          <PreviewCard label="Team" delay={0.6}>
            <MiniAvatars />
          </PreviewCard>
          <PreviewCard label="Settings" delay={0.65}>
            <MiniToggles />
          </PreviewCard>
          <PreviewCard label="Code" delay={0.7}>
            <MiniCodeBlock />
          </PreviewCard>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 2: TECH STACK MARQUEE
   ═══════════════════════════════════════════════ */

function TechStackMarquee() {
  const items = [...techStack, ...techStack]; // Duplicate for seamless loop
  return (
    <section className="border-y border-zinc-200/80 dark:border-zinc-800/50 bg-zinc-100/50 dark:bg-zinc-900/30 py-5 overflow-hidden">
      <div className="flex items-center marquee-track w-max">
        {items.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="flex items-center gap-2.5 px-8 shrink-0"
          >
            <div
              className="size-2 rounded-full shrink-0"
              style={{ backgroundColor: tech.color }}
            />
            <span className="text-[13px] font-semibold text-zinc-500 dark:text-zinc-500 whitespace-nowrap">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 3: COMPONENT SHOWCASE (BENTO GRID)
   ═══════════════════════════════════════════════ */

function ComponentShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400 mb-3">
              <Layers className="size-3" />
              Preview
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tight text-zinc-900 dark:text-white">
              Build with Docs UI
            </h2>
            <p className="text-zinc-500 dark:text-zinc-500 text-[15px] mt-2 max-w-md">
              Every component is designed to look beautiful out of the box. Here&apos;s a preview of what&apos;s inside.
            </p>
          </div>
          <Link
            href="/docs"
            className="group flex items-center gap-1.5 text-[13px] font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors shrink-0"
          >
            View all components
            <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 items-start">
          {/* Column 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-4 lg:gap-5"
          >
            <div className="showcase-card rounded-2xl border border-zinc-200/80 dark:border-zinc-800/50 overflow-hidden">
              <PaymentBlock />
            </div>
            <div className="showcase-card rounded-2xl border border-zinc-200/80 dark:border-zinc-800/50 overflow-hidden">
              <NotificationsBlock />
            </div>
          </motion.div>

          {/* Column 2 — Offset */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col gap-4 lg:gap-5 mt-0 md:mt-14 lg:mt-20"
          >
            <div className="showcase-card rounded-2xl border border-zinc-200/80 dark:border-zinc-800/50 overflow-hidden">
              <TeamMembersBlock />
            </div>
            <div className="showcase-card rounded-2xl border border-zinc-200/80 dark:border-zinc-800/50 overflow-hidden">
              <CommandSearchBlock />
            </div>
          </motion.div>

          {/* Column 3 — Offset */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col gap-4 lg:gap-5 mt-0 lg:mt-10"
          >
            <div className="showcase-card rounded-2xl border border-zinc-200/80 dark:border-zinc-800/50 overflow-hidden">
              <SecurityBlock />
            </div>
            <div className="showcase-card rounded-2xl border border-zinc-200/80 dark:border-zinc-800/50 overflow-hidden">
              <ComputeBlock />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 4: FEATURES (BENTO WITH ANIMATED BORDERS)
   ═══════════════════════════════════════════════ */

function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-8 relative">
      {/* Subtle section bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-100/50 dark:via-zinc-900/20 to-transparent" />

      <div className="relative max-w-[1200px] mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400 mb-3">
            <Zap className="size-3" />
            Why Docs UI
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tight text-zinc-900 dark:text-white mb-3">
            Components You Won&apos;t Find Anywhere
          </h2>
          <p className="text-zinc-500 dark:text-zinc-500 text-[15px] max-w-lg mx-auto">
            Stop rebuilding the same UI. Focus on what makes your app unique.
          </p>
        </motion.div>

        {/* Feature Grid — 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="feature-glow rounded-2xl overflow-hidden"
            >
              <div className="relative h-full rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/50 p-7 md:p-8 flex flex-col">
                {/* Icon */}
                <div
                  className={cn(
                    "flex items-center justify-center size-11 rounded-xl bg-gradient-to-br shadow-lg mb-5",
                    f.gradient
                  )}
                >
                  <f.icon className="size-5 text-white" />
                </div>

                {/* Text */}
                <h3 className="text-[18px] font-bold text-zinc-900 dark:text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-zinc-500 dark:text-zinc-400 flex-1">
                  {f.desc}
                </p>

                {/* Visual accent — subtle inner glow */}
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-[0.04] dark:opacity-[0.03] pointer-events-none" style={{ background: `radial-gradient(circle, ${f.gradient.includes('sky') ? '#0ea5e9' : f.gradient.includes('violet') ? '#8b5cf6' : f.gradient.includes('rose') ? '#f43f5e' : '#f59e0b'} 0%, transparent 70%)` }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 5: COMPONENT BROWSER (INTERACTIVE TABS)
   ═══════════════════════════════════════════════ */

function ComponentBrowser() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [activeCategory, setActiveCategory] = useState(
    navigation[0]?.label || ""
  );
  const activeNav = navigation.find((n) => n.label === activeCategory);

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400 mb-3">
            <Package className="size-3" />
            Explore
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tight text-zinc-900 dark:text-white mb-3">
            Everything you need
          </h2>
          <p className="text-zinc-500 dark:text-zinc-500 text-[15px] max-w-md mx-auto">
            Browse our complete library across three categories.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center mb-10"
        >
          <div className="inline-flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 overflow-x-auto scrollbar-hide">
            {navigation.map((cat) => {
              const Icon = categoryIcons[cat.label] || Component;
              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12.5px] font-bold whitespace-nowrap transition-all duration-200 cursor-pointer",
                    activeCategory === cat.label
                      ? "text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 shadow-sm"
                      : "text-zinc-500 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                  )}
                >
                  <Icon className="size-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Component pills */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {activeNav?.children.map((child, i) => (
            <motion.div
              key={child.href}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: i * 0.015 }}
            >
              <Link
                href={child.href}
                className="group inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[12.5px] font-medium bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/60 text-zinc-600 dark:text-zinc-400 hover:border-indigo-300 dark:hover:border-indigo-600/50 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-all duration-200"
              >
                {child.label}
                {child.badge && (
                  <span
                    className={cn(
                      "text-[9px] font-bold px-1.5 py-0.5 rounded-full",
                      child.badge === "New"
                        ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                        : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                    )}
                  >
                    {child.badge}
                  </span>
                )}
                <ArrowRight className="size-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 6: CTA
   ═══════════════════════════════════════════════ */

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto relative rounded-2xl md:rounded-3xl overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 dark:from-[#0a0a0a] dark:via-zinc-900/80 dark:to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.12)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_30%,transparent_100%)]" />
        <div className="absolute inset-0 border border-zinc-700/50 dark:border-zinc-800/50 rounded-2xl md:rounded-3xl" />

        {/* Content */}
        <div className="relative z-10 px-8 py-14 md:px-16 md:py-20 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            Ready to build something
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400">
              unique?
            </span>
          </h2>
          <p className="text-zinc-400 text-[15px] md:text-[16px] mb-8 max-w-md mx-auto leading-relaxed">
            Start with our components and create something extraordinary.
            Open source, free forever.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/docs"
              className="px-7 py-3 rounded-xl bg-white text-zinc-900 text-[14px] font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-lg"
            >
              Get Started
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="https://github.com/docs/docs"
              target="_blank"
              className="px-7 py-3 rounded-xl border border-zinc-700 text-zinc-300 text-[14px] font-bold hover:border-zinc-500 hover:text-white transition-all flex items-center gap-2"
            >
              <Github className="size-4" />
              View Source
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 7: FOOTER
   ═══════════════════════════════════════════════ */

function FooterSection() {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Components", href: "/docs" },
        { label: "Documentation", href: "/docs" },
        { label: "Themes", href: "/themes" },
      ],
    },
    {
      title: "Categories",
      links: [
        { label: "UI Components", href: "/docs/nextjs/avatar" },
        { label: "Animated UI", href: "/docs/nextjs/chat-bubble" },
        { label: "Website Sections", href: "/docs/nextjs/navbar" },
      ],
    },
    {
      title: "Community",
      links: [
        {
          label: "GitHub",
          href: "https://github.com/docs/docs",
          external: true,
        },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/company/algorizetech/",
          external: true,
        },
      ],
    },
    {
      title: "Legal",
      links: [{ label: "MIT License", href: "#" }],
    },
  ];

  return (
    <footer className="border-t border-zinc-200/80 dark:border-zinc-800/50 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto py-14">
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-[12px] font-bold uppercase tracking-[0.15em] text-zinc-900 dark:text-zinc-300 mb-4">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      {...("external" in link && link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-[13px] text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1"
                    >
                      {link.label}
                      {"external" in link && link.external && (
                        <ArrowUpRight className="size-3" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-200/60 dark:border-zinc-800/50">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
            >
              <rect
                x="3"
                y="3"
                width="7"
                height="7"
                rx="1.5"
                className="fill-zinc-900 dark:fill-white"
              />
              <rect
                x="14"
                y="3"
                width="7"
                height="7"
                rx="1.5"
                className="fill-zinc-400 dark:fill-zinc-600"
              />
              <rect
                x="14"
                y="14"
                width="7"
                height="7"
                rx="1.5"
                className="fill-zinc-900 dark:fill-white"
              />
              <rect
                x="3"
                y="14"
                width="7"
                height="7"
                rx="1.5"
                className="fill-zinc-400 dark:fill-zinc-600"
              />
            </svg>
            <span className="text-[14px] font-bold text-zinc-700 dark:text-zinc-400">
              Docs UI
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <Link
              href="https://github.com/docs/docs"
              target="_blank"
              className="p-2 rounded-lg text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
              aria-label="GitHub"
            >
              <Github className="size-4" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/algorizetech/"
              target="_blank"
              className="p-2 rounded-lg text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="size-4" />
            </Link>
          </div>

          {/* Copyright */}
          <span className="text-[12px] text-zinc-400 dark:text-zinc-600">
            © {new Date().getFullYear()} AlgorizeTech. Open source under MIT.
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════
   PAGE ASSEMBLY
   ═══════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#030303] text-zinc-900 dark:text-zinc-100 selection:bg-indigo-500/20 overflow-x-hidden">
      <HeroSection />
      <TechStackMarquee />
      <ComponentShowcase />
      <FeaturesSection />
      <ComponentBrowser />
      <CTASection />
      <FooterSection />
    </div>
  );
}
