"use client";

import AIChat, { ChatThread, Message } from "@/components/custom/blocks/Ai-chat";
import AuthForm from "@/components/custom/blocks/AuthForm";
import { ChartBlock } from "@/components/custom/blocks/ChartBlock";
import { Dock, DockItem } from "@/components/custom/blocks/DockBlock";
import { MemoriesCard, MemoryItem } from "@/components/custom/blocks/MemoriesCardBlock";
import { ThreeDCarousel, CarouselItem } from "@/components/custom/blocks/ThreeDCarouselBlock";
import { TerminalBlock } from "@/components/custom/blocks/TerminalBlock";
import { CommandSearchBlock } from "@/components/custom/blocks/UtilityBlocks";
import { navigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  Code2,
  Copy,
  Github,
  Layers,
  Linkedin,
  Lock,
  Moon,
  Package,
  Paintbrush,
  SlidersHorizontal,
  Sparkles,
  Terminal,
  Zap,
  Boxes,
  LayoutTemplate,
  BarChart3,
  Globe,
  Share2,
  Users,
  Compass,
  Cpu,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";

/* ═══════════════════════════════════════════════
   SAMPLE DATA
   ═══════════════════════════════════════════════ */

const sampleChartData = [
  { label: "Mon", value: 340 },
  { label: "Tue", value: 680 },
  { label: "Wed", value: 520 },
  { label: "Thu", value: 910 },
  { label: "Fri", value: 840 },
  { label: "Sat", value: 1150 },
  { label: "Sun", value: 990 },
];

const sampleChatHistory: ChatThread[] = [
  { id: "chat-1", title: "Next.js UI Component Setup", date: "Today" },
  { id: "chat-2", title: "Tailwind Theme Customizer", date: "Yesterday" },
  { id: "chat-3", title: "GSAP & Framer Motion Physics", date: "3 days ago" },
];

const sampleAiMessages: Message[] = [
  {
    id: 1,
    role: "ai" as const,
    content: "Hello! Welcome to Docs UI. How can I assist you with your React project today?",
    time: "10:24 AM",
  },
  {
    id: 2,
    role: "user" as const,
    content: "How do I add these interactive components to my codebase?",
    time: "10:25 AM",
  },
  {
    id: 3,
    role: "ai" as const,
    content: "Run `npx docs-ui@latest add <component-name>` or simply copy the source code directly into your components folder. Zero npm lock-in!",
    time: "10:25 AM",
  },
];

const sampleTerminalCode = `$ npx docs-ui@latest init
✔ Initialized Docs UI configuration in project root.
✔ Installed dependencies: framer-motion, gsap, lucide-react, clsx.

$ npx docs-ui@latest add ai-chat chart-block
✔ Copying Ai-chat.tsx to src/components/custom/blocks/
✔ Copying ChartBlock.tsx to src/components/custom/blocks/
✔ All components ready to import!

$ npm run dev
▲ Next.js (Turbopack)
- Local: http://localhost:3000
✓ Ready in 1.8s`;

const techStack = [
  { name: "React JS", color: "var(--primary)" },
  { name: "Next.js", color: "var(--foreground)" },
  { name: "TypeScript", color: "var(--primary)" },
  { name: "Tailwind CSS", color: "var(--primary)" },
  { name: "Framer Motion", color: "var(--primary)" },
  { name: "GSAP", color: "var(--primary)" },
  { name: "Lucide Icons", color: "var(--primary)" },
];

const sampleDockItems: DockItem[] = [
  { id: "home", label: "Overview", icon: <Boxes className="size-5 text-primary" /> },
  { id: "ai", label: "AI Chat", icon: <Bot className="size-5 text-primary" /> },
  { id: "chart", label: "Analytics", icon: <BarChart3 className="size-5 text-primary" /> },
  { id: "code", label: "Components", icon: <Code2 className="size-5 text-primary" /> },
  { id: "terminal", label: "Terminal", icon: <Terminal className="size-5 text-primary" /> },
];

const sampleMemories: MemoryItem[] = [
  {
    id: "1",
    title: "Next-Gen Components",
    location: "Docs UI Library",
    date: "Latest Release",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    description: "Meticulously designed, responsive & production-ready.",
    tag: "Featured",
  },
  {
    id: "2",
    title: "3D Motion Cards",
    location: "Framer Motion",
    date: "Interactive",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    description: "Drag, tilt, & rotate 3D cards with fluid spring physics.",
    tag: "Animation",
  },
  {
    id: "3",
    title: "Dark Mode Studio",
    location: "Tailwind CSS",
    date: "Zero Config",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    description: "Tailored themes engineered for stunning visuals.",
    tag: "Design",
  },
];

const sampleCarouselItems: CarouselItem[] = [
  {
    id: "1",
    title: "Glassmorphic Cards",
    category: "UI Components",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80",
    description: "Ultra smooth blur reflections & borders.",
  },
  {
    id: "2",
    title: "Magnifying Dock",
    category: "Interactive",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    description: "Apple macOS style dock magnification effect.",
  },
  {
    id: "3",
    title: "3D Interactive Carousel",
    category: "Animations",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80",
    description: "3D fanned carousel with drag physics.",
  },
];

/* ═══════════════════════════════════════════════
   HERO INTERACTIVE HUB (RIGHT SIDE OF HERO)
   ═══════════════════════════════════════════════ */

function HeroInteractiveHub() {
  const [activeTab, setActiveTab] = useState<"ai" | "chart" | "terminal" | "auth">("ai");

  return (
    <div className="relative w-full max-w-[580px] mx-auto lg:max-w-none">
      {/* Dynamic Theme Radial Glow */}
      <div
        className="absolute -inset-1 rounded-3xl blur-2xl opacity-30 dark:opacity-20 animate-pulse pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)" }}
      />

      <div className="relative rounded-2xl border border-border bg-card/90 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Hub Header Bar */}
        <div className="px-4 py-3 border-b border-border bg-muted/50 flex items-center justify-between gap-2 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="size-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="size-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="size-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          <div className="flex items-center gap-1 bg-muted p-1 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setActiveTab("ai")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-md transition-all cursor-pointer",
                activeTab === "ai"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Bot className="size-3.5" />
              AI Chat
            </button>
            <button
              onClick={() => setActiveTab("chart")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-md transition-all cursor-pointer",
                activeTab === "chart"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <BarChart3 className="size-3.5" />
              Analytics
            </button>
            <button
              onClick={() => setActiveTab("auth")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-md transition-all cursor-pointer",
                activeTab === "auth"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Lock className="size-3.5" />
              Auth
            </button>
            <button
              onClick={() => setActiveTab("terminal")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-md transition-all cursor-pointer",
                activeTab === "terminal"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Terminal className="size-3.5" />
              CLI
            </button>
          </div>
        </div>

        {/* Dynamic Body */}
        <div className="p-4 sm:p-5 min-h-[380px] flex flex-col justify-center">
          {activeTab === "ai" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              <AIChat
                variant="default"
                color="primary"
                chatHistory={sampleChatHistory}
                initialMessages={sampleAiMessages}
              />
            </motion.div>
          )}

          {activeTab === "chart" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="p-4 rounded-xl bg-background border border-border"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    Weekly Growth Metrics
                  </h4>
                  <p className="text-xs text-muted-foreground">Real-time dynamic data visualization</p>
                </div>
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                  +24.8%
                </span>
              </div>
              <ChartBlock
                data={sampleChartData}
                type="bar"
                color="var(--primary)"
                height={260}
                valuePrefix="$"
              />
            </motion.div>
          )}

          {activeTab === "auth" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="max-w-md mx-auto w-full"
            >
              <AuthForm type="signup" variant="default" color="primary" />
            </motion.div>
          )}

          {activeTab === "terminal" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
            >
              <TerminalBlock
                variant="default"
                color="primary"
                language="bash"
                filename="docs-ui.sh"
                code={sampleTerminalCode}
              />
            </motion.div>
          )}
        </div>

        {/* Hub Footer Accent */}
        <div className="px-4 py-2.5 bg-muted/60 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 font-medium text-foreground">
            <Sparkles className="size-3.5 text-primary" />
            Interactive Live Component Demo
          </span>
          <span className="text-[11px] font-mono text-muted-foreground">
            Click tabs above to test
          </span>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-2 absolute -bottom-5 right-6 px-3 py-1.5 rounded-full bg-card border border-border shadow-xl text-xs font-semibold text-foreground">
        <Check className="size-3.5 text-primary" />
        Zero Dependencies Config
      </div>
    </div>
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
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden pt-12 pb-16">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, var(--primary) 0%, transparent 65%)", opacity: 0.12 }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black_40%,transparent_100%)]" />

      <div className="relative z-10 max-w-[1320px] mx-auto w-full px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,1fr] gap-10 lg:gap-14 items-center">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/docs"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-xs font-bold text-primary hover:border-primary transition-all duration-300 shadow-sm"
              >
                <Sparkles className="size-3.5 text-primary animate-spin" />
                <span>Next-Gen React Components</span>
                <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[2.75rem] sm:text-[3.5rem] md:text-[4.25rem] lg:text-[4.75rem] font-black tracking-[-0.04em] leading-[1.04] text-foreground"
            >
              Build{" "}
              <span className="text-primary">
                Exceptional
              </span>{" "}
              Interfaces.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[16px] sm:text-[18px] text-muted-foreground max-w-[540px] leading-relaxed"
            >
              A meticulous library of copy-paste React components & interactive blocks. Crafted with Tailwind CSS, TypeScript, GSAP, and Framer Motion.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <Link
                href="/docs"
                className="px-7 py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                Browse Components
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="https://github.com/docs/docs"
                target="_blank"
                className="px-7 py-3.5 rounded-xl border border-border bg-card text-foreground text-sm font-bold hover:bg-accent hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <Github className="size-4" />
                Star on GitHub
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-2"
            >
              <button
                onClick={handleCopy}
                className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card cursor-pointer w-full max-w-md hover:border-primary/50 transition-all"
              >
                <Terminal className="size-4 text-primary shrink-0" />
                <code className="text-xs sm:text-sm font-mono text-foreground flex-1 text-left">
                  npx docs-ui@latest init
                </code>
                <div className="pl-3 border-l border-border">
                  {copied ? (
                    <Check className="size-4 text-emerald-500" />
                  ) : (
                    <Copy className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  )}
                </div>
              </button>
            </motion.div>
          </div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="w-full"
          >
            <HeroInteractiveHub />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 2: TECH STACK MARQUEE (GAPLESS INFINITE LOOP)
   ═══════════════════════════════════════════════ */

function TechStackMarquee() {
  const marqueeItems = [
    ...techStack,
    ...techStack,
    ...techStack,
    ...techStack,
  ];

  return (
    <section className="border-y border-border bg-muted/40 py-4 overflow-hidden relative select-none">
      <div className="flex w-max marquee-track">
        {/* Unit 1 */}
        <div className="flex items-center shrink-0">
          {marqueeItems.map((tech, i) => (
            <div
              key={`m1-${tech.name}-${i}`}
              className="flex items-center gap-2.5 px-7 shrink-0"
            >
              <div className="size-2 rounded-full shrink-0 bg-primary" />
              <span className="text-xs font-bold text-muted-foreground whitespace-nowrap tracking-wide">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
        {/* Unit 2 (Exact Duplicate for Infinite Loop) */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          {marqueeItems.map((tech, i) => (
            <div
              key={`m2-${tech.name}-${i}`}
              className="flex items-center gap-2.5 px-7 shrink-0"
            >
              <div className="size-2 rounded-full shrink-0 bg-primary" />
              <span className="text-xs font-bold text-muted-foreground whitespace-nowrap tracking-wide">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 3: REAL COMPONENT SHOWCASE (BALANCED LAYOUT WITH MEMORIES, DOCK & CAROUSEL)
   ═══════════════════════════════════════════════ */

function ComponentShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-8">
      <div className="max-w-[1320px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
              <Layers className="size-3.5" />
              Live Interactive Components
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tight text-foreground">
              Real Motion & Interactive Blocks
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mt-2 max-w-lg">
              Featuring Memories Cards, Magnifying Dock, and 3D Motion Carousel.
            </p>
          </div>
          <Link
            href="/docs"
            className="group flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors shrink-0"
          >
            View all 100+ components
            <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* PERFECTLY BALANCED 3-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {/* Column 1: 3D Memories Card & Command Launcher */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Real Component: Memories Card */}
            <div className="showcase-card rounded-2xl border border-border bg-card p-4 overflow-hidden shadow-lg">
              <div className="px-2 pb-3 border-b border-border flex items-center justify-between text-xs text-muted-foreground font-medium mb-3">
                <span className="flex items-center gap-1.5 text-foreground font-semibold">
                  <Sparkles className="size-3.5 text-primary" />
                  3D Memories Card
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-semibold">
                  Drag / Swipe
                </span>
              </div>
              <div className="flex justify-center py-2">
                <MemoriesCard items={sampleMemories} className="max-w-[320px]" />
              </div>
            </div>

            {/* Real Component: Command Search */}
            <div className="showcase-card rounded-2xl border border-border bg-card p-2 overflow-hidden shadow-lg">
              <div className="px-3 py-2 border-b border-border flex items-center justify-between text-xs text-muted-foreground font-medium">
                <span className="flex items-center gap-1.5 text-foreground font-semibold">
                  <Terminal className="size-3.5 text-primary" />
                  Command Launcher
                </span>
              </div>
              <CommandSearchBlock />
            </div>
          </motion.div>

          {/* Column 2: 3D Carousel & Smooth Dock Component */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* Real Component: 3D Carousel */}
            <div className="showcase-card rounded-2xl border border-border bg-card p-5 overflow-hidden shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                  <Layers className="size-3.5 text-primary" />
                  3D Fanned Carousel
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-semibold">
                  Interactive
                </span>
              </div>
              <div className="py-2">
                <ThreeDCarousel items={sampleCarouselItems} autoPlay={false} />
              </div>
            </div>

            {/* Fixed Real Component: Magnifying macOS Dock */}
            <div className="showcase-card rounded-2xl border border-border bg-card p-6 overflow-hidden shadow-lg flex flex-col items-center justify-center min-h-[220px]">
              <div className="w-full flex items-center justify-between text-xs font-medium mb-6">
                <span className="flex items-center gap-1.5 text-foreground font-semibold">
                  <Compass className="size-3.5 text-primary" />
                  Magnifying macOS Dock
                </span>
                <span className="text-[10px] font-semibold text-primary px-2 py-0.5 rounded bg-primary/10">
                  Interactive Hover
                </span>
              </div>
              <div className="py-4 w-full flex justify-center items-center">
                <Dock items={sampleDockItems} baseSize={44} magnification={68} distance={130} containerHeight={84} />
              </div>
            </div>
          </motion.div>

          {/* Column 3: Analytics Chart & Auth Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            {/* Real Component: ChartBlock */}
            <div className="showcase-card rounded-2xl border border-border bg-card p-5 overflow-hidden shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    Analytics Chart
                  </h4>
                  <p className="text-xs text-muted-foreground">Live SVG bar chart</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  Active
                </span>
              </div>
              <ChartBlock
                data={sampleChartData}
                type="bar"
                color="var(--primary)"
                height={220}
                valuePrefix="$"
              />
            </div>

            {/* Real Component: Auth Form */}
            <div className="showcase-card rounded-2xl border border-border bg-card p-2 overflow-hidden shadow-lg">
              <div className="px-3 py-2 border-b border-border flex items-center justify-between text-xs text-muted-foreground font-medium">
                <span className="flex items-center gap-1.5 text-foreground font-semibold">
                  <Lock className="size-3.5 text-primary" />
                  Auth Form Card
                </span>
              </div>
              <div className="p-3">
                <AuthForm type="login" variant="default" color="primary" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 4: WHY DOCS UI? (4 GRID CARDS WITH RICH VISUAL PREVIEWS)
   ═══════════════════════════════════════════════ */

function WhyChooseUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-8 border-t border-border bg-muted/30">
      <div className="max-w-[1320px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-4">
            Why Docs UI?
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Built to explore unique interaction patterns from displacement hover effects to animated tooltips and scroll-driven components.
          </p>
        </motion.div>

        {/* 2x2 Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: Components You Won't Find Anywhere */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-border bg-card p-8 flex flex-col justify-between relative overflow-hidden group shadow-sm hover:border-primary/50 transition-all min-h-[380px]"
          >
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Components You Won&apos;t Find Anywhere
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                Unique interaction patterns like displacement hover effects, animated tooltips, and scroll-driven cards that stand out from typical UI libraries.
              </p>
            </div>

            {/* Interactive Card Mockup Preview */}
            <div className="mt-8 flex justify-center items-center py-6">
              <div className="w-full max-w-xs rounded-2xl border border-border bg-muted/60 p-5 shadow-2xl relative group-hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="size-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                    UI
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 text-primary">
                    LIVE
                  </span>
                </div>
                <div className="h-3 w-32 rounded bg-muted mb-2" />
                <div className="h-2 w-20 rounded bg-muted/80 mb-4" />
                <div className="p-2.5 rounded-xl bg-card border border-border text-xs font-mono text-foreground flex items-center justify-between">
                  <span>Interactive Card</span>
                  <ArrowRight className="size-3.5 text-primary" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Built with Modern Frameworks */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-border bg-card p-8 flex flex-col justify-between relative overflow-hidden group shadow-sm hover:border-primary/50 transition-all min-h-[380px]"
          >
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Built with Modern Frameworks
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                Designed to work seamlessly with popular frameworks like React JS and Next.js, making it easy to integrate into real-world production projects.
              </p>
            </div>

            {/* Isometric Framework Badges Grid */}
            <div className="mt-8 flex justify-center items-center py-6">
              <div className="grid grid-cols-3 gap-3 max-w-xs">
                {[
                  { name: "Next.js", icon: "N" },
                  { name: "React JS", icon: "⚛" },
                  { name: "TypeScript", icon: "TS" },
                  { name: "Tailwind", icon: "TW" },
                  { name: "Motion", icon: "FM" },
                  { name: "GSAP", icon: "G" },
                ].map((f, idx) => (
                  <div
                    key={f.name}
                    className="p-3 rounded-xl border border-border bg-muted/60 flex flex-col items-center justify-center gap-1 group-hover:-translate-y-1 transition-transform"
                    style={{ transitionDelay: `${idx * 40}ms` }}
                  >
                    <span className="font-mono font-bold text-sm text-primary">
                      {f.icon}
                    </span>
                    <span className="text-[10px] font-semibold text-muted-foreground">
                      {f.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 3: Open Source With Story */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-2xl border border-border bg-card p-8 flex flex-col justify-between relative overflow-hidden group shadow-sm hover:border-primary/50 transition-all min-h-[380px]"
          >
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Open Source With Story
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                Every component is open source and crafted with intention. Each block explores a unique interaction pattern and reasoning behind the design.
              </p>
            </div>

            {/* Contributor Tree Diagram Preview */}
            <div className="mt-8 flex justify-center items-center py-6">
              <div className="w-full max-w-sm flex items-center justify-between relative">
                <div className="size-10 rounded-full border-2 border-primary/40 bg-muted flex items-center justify-center text-xs font-bold">
                  👨‍💻
                </div>
                <div className="h-0.5 flex-1 bg-primary/40 mx-2" />
                <div className="size-12 rounded-full border-2 border-primary bg-primary text-primary-foreground flex items-center justify-center font-black text-sm shadow-xl">
                  UI
                </div>
                <div className="h-0.5 flex-1 bg-primary/40 mx-2" />
                <div className="size-10 rounded-full border-2 border-primary/40 bg-muted flex items-center justify-center text-xs font-bold">
                  🚀
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Build Landing Pages Faster */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-2xl border border-border bg-card p-8 flex flex-col justify-between relative overflow-hidden group shadow-sm hover:border-primary/50 transition-all min-h-[380px]"
          >
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Build Landing Pages Faster
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                Launch polished landing pages in minutes using pre-built UI blocks designed for speed and consistency. Skip repetitive work and focus on shipping.
              </p>
            </div>

            {/* Code / Wireframe Layout Preview */}
            <div className="mt-8 flex justify-center items-center py-6">
              <div className="w-full max-w-xs rounded-xl border border-dashed border-border p-4 space-y-2 bg-muted/40">
                <div className="h-2.5 w-full rounded bg-muted" />
                <div className="h-2 w-3/4 rounded bg-muted" />
                <div className="flex gap-2 pt-2">
                  <div className="h-7 flex-1 rounded bg-primary/20 border border-primary/30" />
                  <div className="h-7 flex-1 rounded bg-muted" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 5: COMPONENT BROWSER INDEX
   ═══════════════════════════════════════════════ */

const categoryIcons: Record<string, typeof Boxes> = {
  "Ui Components": Boxes,
  "Animated Ui Components": Sparkles,
  "Website Sections": LayoutTemplate,
};

function ComponentBrowser() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [activeCategory, setActiveCategory] = useState(
    navigation[0]?.label || ""
  );
  const activeNav = navigation.find((n) => n.label === activeCategory);

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-8">
      <div className="max-w-[1320px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
            <Package className="size-3.5" />
            Component Index
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tight text-foreground mb-3">
            Explore 100+ Components
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            Categorized library ready to inspect and copy.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center mb-10"
        >
          <div className="inline-flex items-center p-1.5 rounded-xl bg-muted border border-border overflow-x-auto scrollbar-hide">
            {navigation.map((cat) => {
              const Icon = categoryIcons[cat.label] || Boxes;
              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer",
                    activeCategory === cat.label
                      ? "text-primary-foreground bg-primary shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="size-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Pills */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap justify-center gap-2.5 max-w-5xl mx-auto"
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
                className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-card border border-border text-foreground hover:border-primary/50 hover:text-primary hover:shadow-md transition-all"
              >
                {child.label}
                {child.badge && (
                  <span
                    className={cn(
                      "text-[9px] font-bold px-1.5 py-0.5 rounded-full",
                      child.badge === "New"
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary text-secondary-foreground"
                    )}
                  >
                    {child.badge}
                  </span>
                )}
                <ArrowRight className="size-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
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
        className="max-w-4xl mx-auto relative rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-card border border-border" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top right, var(--primary) 0%, transparent 60%)", opacity: 0.15 }}
        />

        <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4">
            Ready to Build Your Next Project?
          </h2>
          <p className="text-muted-foreground text-base mb-8 max-w-md mx-auto leading-relaxed">
            Copy components into your project and ship high quality software today. Free and open source forever.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/docs"
              className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg"
            >
              Get Started Free
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="https://github.com/docs/docs"
              target="_blank"
              className="px-8 py-3.5 rounded-xl border border-border text-foreground text-sm font-bold hover:bg-accent transition-all flex items-center gap-2"
            >
              <Github className="size-4" />
              View on GitHub
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
  return (
    <footer className="border-t border-border px-6 md:px-8 bg-muted/20">
      <div className="max-w-[1320px] mx-auto py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <span className="font-bold text-base text-foreground">
            Docs UI
          </span>
          <span className="text-xs text-muted-foreground">
            — Crafting beautiful component documentation
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
          <Link
            href="/docs"
            className="hover:text-foreground transition-colors"
          >
            Documentation
          </Link>
          <Link
            href="https://github.com/docs/docs"
            target="_blank"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/company/algorizetech/"
            target="_blank"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE ENTRY POINT
   ═══════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 overflow-x-hidden">
      <HeroSection />
      <TechStackMarquee />
      <ComponentShowcase />
      <WhyChooseUsSection />
      <ComponentBrowser />
      <CTASection />
      <FooterSection />
    </div>
  );
}
