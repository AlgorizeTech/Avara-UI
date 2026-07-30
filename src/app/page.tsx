"use client";

import AIChat, {
  ChatThread,
  Message,
} from "@/components/custom/blocks/Ai-chat";
import AuthForm from "@/components/custom/blocks/AuthForm";
import { ChartBlock } from "@/components/custom/blocks/ChartBlock";
import { Dock, DockItem } from "@/components/custom/blocks/DockBlock";
import {
  MemoriesCard,
  MemoryItem,
} from "@/components/custom/blocks/MemoriesCardBlock";
import { TerminalBlock } from "@/components/custom/blocks/TerminalBlock";
import {
  CarouselItem,
  ThreeDCarousel,
} from "@/components/custom/blocks/ThreeDCarouselBlock";
import { CommandSearchBlock } from "@/components/custom/blocks/UtilityBlocks";
import { navigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  Boxes,
  Check,
  Code2,
  Compass,
  Copy,
  Cpu,
  Github,
  GitPullRequest,
  Layers,
  LayoutTemplate,
  Lock,
  Package,
  Paintbrush,
  Share2,
  Sparkles,
  Terminal,
  Zap,
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
    content:
      "Hello! Welcome to Docs UI. How can I assist you with your React project today?",
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
    content:
      "Run `npx docs-ui@latest add <component-name>` or simply copy the source code directly into your components folder. Zero npm lock-in!",
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
  {
    id: "home",
    label: "Overview",
    icon: <Boxes className="size-5 text-primary" />,
  },
  { id: "ai", label: "AI Chat", icon: <Bot className="size-5 text-primary" /> },
  {
    id: "chart",
    label: "Analytics",
    icon: <BarChart3 className="size-5 text-primary" />,
  },
  {
    id: "code",
    label: "Components",
    icon: <Code2 className="size-5 text-primary" />,
  },
  {
    id: "terminal",
    label: "Terminal",
    icon: <Terminal className="size-5 text-primary" />,
  },
];

const sampleMemories: MemoryItem[] = [
  {
    id: "1",
    title: "Next-Gen Components",
    location: "Docs UI Library",
    date: "Latest Release",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    description: "Meticulously designed, responsive & production-ready.",
    tag: "Featured",
  },
  {
    id: "2",
    title: "3D Motion Cards",
    location: "Framer Motion",
    date: "Interactive",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
    description: "Drag, tilt, & rotate 3D cards with fluid spring physics.",
    tag: "Animation",
  },
  {
    id: "3",
    title: "Dark Mode Studio",
    location: "Tailwind CSS",
    date: "Zero Config",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    description: "Tailored themes engineered for stunning visuals.",
    tag: "Design",
  },
];

const sampleCarouselItems: CarouselItem[] = [
  {
    id: "1",
    title: "Glassmorphic Cards",
    category: "UI Components",
    image:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80",
    description: "Ultra smooth blur reflections & borders.",
  },
  {
    id: "2",
    title: "Magnifying Dock",
    category: "Interactive",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    description: "Apple macOS style dock magnification effect.",
  },
  {
    id: "3",
    title: "3D Interactive Carousel",
    category: "Animations",
    image:
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80",
    description: "3D fanned carousel with drag physics.",
  },
];

/* ═══════════════════════════════════════════════
   HERO INTERACTIVE HUB (RIGHT SIDE OF HERO)
   ═══════════════════════════════════════════════ */

function HeroInteractiveHub() {
  const [activeTab, setActiveTab] = useState<
    "ai" | "chart" | "terminal" | "auth"
  >("ai");

  return (
    <div className="relative w-full max-w-[540px] mx-auto lg:max-w-none">
      {/* Dynamic Theme Radial Glow */}
      <div
        className="absolute -inset-1 rounded-3xl blur-3xl opacity-30 dark:opacity-20 animate-pulse pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 60%)",
        }}
      />

      <div className="relative rounded-3xl border border-border/50 bg-card/40 backdrop-blur-3xl shadow-2xl overflow-hidden ring-1 ring-white/10 dark:ring-white/5">
        {/* Hub Header Bar */}
        <div className="px-5 py-3.5 border-b border-border/50 bg-muted/20 flex items-center justify-between gap-2 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2 shrink-0">
            <span className="size-3 rounded-full bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.5)] inline-block" />
            <span className="size-3 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.5)] inline-block" />
            <span className="size-3 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.5)] inline-block" />
          </div>

          <div className="flex items-center gap-1 bg-background/50 p-1 rounded-xl text-[11px] font-semibold backdrop-blur-md border border-border/50 shadow-sm">
            <button
              onClick={() => setActiveTab("ai")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer",
                activeTab === "ai"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              <Bot className="size-3.5" />
              AI Chat
            </button>
            <button
              onClick={() => setActiveTab("chart")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer",
                activeTab === "chart"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              <BarChart3 className="size-3.5" />
              Analytics
            </button>
            <button
              onClick={() => setActiveTab("auth")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer",
                activeTab === "auth"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              <Lock className="size-3.5" />
              Auth
            </button>
            <button
              onClick={() => setActiveTab("terminal")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer",
                activeTab === "terminal"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              <Terminal className="size-3.5" />
              CLI
            </button>
          </div>
        </div>

        {/* Dynamic Body */}
        <div className="p-5 sm:p-6 min-h-[360px] flex flex-col justify-center bg-gradient-to-b from-transparent to-muted/5">
          {activeTab === "ai" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full text-sm"
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
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="p-5 rounded-2xl bg-card border border-border shadow-sm"
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h4 className="text-[13px] font-bold text-foreground">
                    Weekly Growth Metrics
                  </h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Real-time dynamic data visualization
                  </p>
                </div>
                <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-primary/10 text-primary border border-primary/20 shadow-sm">
                  +24.8%
                </span>
              </div>
              <ChartBlock
                data={sampleChartData}
                type="bar"
                color="var(--primary)"
                height={220}
                valuePrefix="$"
              />
            </motion.div>
          )}

          {activeTab === "auth" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="max-w-md mx-auto w-full scale-[0.95]"
            >
              <AuthForm type="signup" variant="default" color="primary" />
            </motion.div>
          )}

          {activeTab === "terminal" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-sm"
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
        <div className="px-5 py-3 bg-muted/20 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground backdrop-blur-md">
          <span className="flex items-center gap-2 font-medium text-foreground">
            <Sparkles className="size-3.5 text-primary drop-shadow-[0_0_8px_var(--primary)]" />
            Interactive Demo
          </span>
          <span className="text-[10px] font-mono font-medium text-muted-foreground/80 tracking-wider uppercase">
            Click tabs to interact
          </span>
        </div>
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
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden pt-12 pb-20">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, var(--primary) 0%, transparent 65%)",
          opacity: 0.08,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black_40%,transparent_100%)]" />

      <div className="relative z-10 max-w-[1240px] mx-auto w-full px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,1fr] gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="flex flex-col gap-6 lg:gap-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Link
                href="/docs"
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary hover:border-primary/40 hover:bg-primary/15 transition-all duration-300 shadow-sm"
              >
                <Sparkles className="size-3 text-primary animate-spin-slow" />
                <span className="tracking-wide uppercase">
                  Next-Gen React Components
                </span>
                <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] font-black tracking-tighter leading-[1.05]"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                Build{" "}
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-primary to-primary/70 drop-shadow-sm">
                {" "}Exceptional{" "}
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                {" "}Interfaces.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="text-[15px] sm:text-[17px] text-muted-foreground/90 max-w-[500px] leading-relaxed font-medium"
            >
              A meticulous library of copy-paste React components & interactive
              blocks. Crafted with Tailwind CSS, TypeScript, GSAP, and Framer
              Motion.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <Link
                href="/docs"
                className="px-6 py-3 rounded-xl bg-primary text-primary-foreground text-[13px] font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all flex items-center gap-2"
              >
                Browse Components
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="https://github.com/docs/docs"
                target="_blank"
                className="px-6 py-3 rounded-xl border border-border/60 bg-card/50 backdrop-blur-md text-foreground text-[13px] font-bold hover:bg-muted/50 hover:border-border hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <Github className="size-4" />
                Star on GitHub
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              className="pt-2"
            >
              <button
                onClick={handleCopy}
                className="group flex items-center gap-4 px-4 py-3 rounded-xl border border-border/60 bg-card/30 backdrop-blur-md cursor-pointer w-full max-w-[24rem] hover:border-primary/40 hover:bg-card/60 transition-all shadow-sm"
              >
                <Terminal className="size-4 text-primary shrink-0" />
                <code className="text-xs sm:text-[13px] font-mono font-medium text-foreground/90 flex-1 text-left tracking-tight">
                  npx docs-ui@latest init
                </code>
                <div className="pl-3 border-l border-border/50">
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
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
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
   SECTION 2: TECH STACK MARQUEE
   ═══════════════════════════════════════════════ */

function TechStackMarquee() {
  const marqueeItems = [...techStack, ...techStack, ...techStack, ...techStack];

  return (
    <section className="border-y border-border/50 bg-background py-4 overflow-hidden relative select-none">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex w-max marquee-track">
        <div className="flex items-center shrink-0">
          {marqueeItems.map((tech, i) => (
            <div
              key={`m1-${tech.name}-${i}`}
              className="flex items-center gap-2.5 px-6 shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              <div className="size-1 rounded-full shrink-0 bg-primary/60 shadow-[0_0_8px_var(--primary)]" />
              <span className="text-[11px] font-bold text-foreground whitespace-nowrap tracking-widest uppercase">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center shrink-0" aria-hidden="true">
          {marqueeItems.map((tech, i) => (
            <div
              key={`m2-${tech.name}-${i}`}
              className="flex items-center gap-2.5 px-6 shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              <div className="size-1 rounded-full shrink-0 bg-primary/60 shadow-[0_0_8px_var(--primary)]" />
              <span className="text-[11px] font-bold text-foreground whitespace-nowrap tracking-widest uppercase">
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
   SECTION 3: REAL COMPONENT SHOWCASE
   ═══════════════════════════════════════════════ */

function ComponentShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-8">
      <div className="max-w-[1240px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-3">
              <Layers className="size-3.5" />
              Live Interactive Components
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-foreground bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
              Real Motion <br className="hidden md:block" /> & Interactive
              Blocks
            </h2>
            <p className="text-muted-foreground text-[15px] mt-3 max-w-lg font-medium">
              Featuring Memories Cards, Magnifying Dock, and 3D Motion Carousel.
            </p>
          </div>
          <Link
            href="/docs"
            className="group flex items-center gap-2 text-[13px] font-bold text-foreground hover:text-primary transition-colors shrink-0 px-4 py-2 rounded-full border border-border/50 bg-card/30 hover:bg-card/80 backdrop-blur-sm"
          >
            View all 100+ components
            <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* 3-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="showcase-card rounded-[1.5rem] border border-border/50 bg-card/30 backdrop-blur-xl p-4 overflow-hidden shadow-lg ring-1 ring-white/5">
              <div className="px-1 pb-3 border-b border-border/40 flex items-center justify-between text-[11px] text-muted-foreground font-semibold mb-3">
                <span className="flex items-center gap-1.5 text-foreground">
                  <Sparkles className="size-3.5 text-primary" />
                  3D Memories Card
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold uppercase tracking-wider">
                  Drag / Swipe
                </span>
              </div>
              <div className="flex justify-center py-2">
                <MemoriesCard
                  items={sampleMemories}
                  className="max-w-[280px]"
                />
              </div>
            </div>

            <div className="showcase-card rounded-[1.5rem] border border-border/50 bg-card/30 backdrop-blur-xl p-2.5 overflow-hidden shadow-lg ring-1 ring-white/5">
              <div className="px-3 py-2 border-b border-border/40 flex items-center justify-between text-[11px] text-muted-foreground font-semibold">
                <span className="flex items-center gap-1.5 text-foreground">
                  <Terminal className="size-3.5 text-primary" />
                  Command Launcher
                </span>
              </div>
              <CommandSearchBlock />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="showcase-card rounded-[1.5rem] border border-border/50 bg-card/30 backdrop-blur-xl p-5 overflow-hidden shadow-lg ring-1 ring-white/5">
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-foreground">
                  <Layers className="size-3.5 text-primary" />
                  3D Fanned Carousel
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold uppercase tracking-wider">
                  Interactive
                </span>
              </div>
              <div className="py-2">
                <ThreeDCarousel items={sampleCarouselItems} autoPlay={false} />
              </div>
            </div>

            <div className="showcase-card rounded-[1.5rem] border border-border/50 bg-card/30 backdrop-blur-xl p-5 overflow-hidden shadow-lg ring-1 ring-white/5 flex flex-col items-center justify-center min-h-[220px]">
              <div className="w-full flex items-center justify-between text-[11px] font-semibold mb-6">
                <span className="flex items-center gap-1.5 text-foreground">
                  <Compass className="size-3.5 text-primary" />
                  Magnifying macOS Dock
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold uppercase tracking-wider">
                  Hover
                </span>
              </div>
              <div className="py-4 w-full flex justify-center items-center">
                <Dock
                  items={sampleDockItems}
                  baseSize={44}
                  magnification={64}
                  distance={120}
                  containerHeight={80}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="showcase-card rounded-[1.5rem] border border-border/50 bg-card/30 backdrop-blur-xl p-5 overflow-hidden shadow-lg ring-1 ring-white/5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-[12px] font-bold text-foreground">
                    Analytics Chart
                  </h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Live SVG bar chart
                  </p>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold uppercase tracking-wider border border-primary/20">
                  Active
                </span>
              </div>
              <ChartBlock
                data={sampleChartData}
                type="bar"
                color="var(--primary)"
                height={200}
                valuePrefix="$"
              />
            </div>

            <div className="showcase-card rounded-[1.5rem] border border-border/50 bg-card/30 backdrop-blur-xl p-2.5 overflow-hidden shadow-lg ring-1 ring-white/5">
              <div className="px-3 py-2 border-b border-border/40 flex items-center justify-between text-[11px] text-muted-foreground font-semibold">
                <span className="flex items-center gap-1.5 text-foreground">
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
   SECTION 4: WHY DOCS UI? (ULTRA PREMIUM VENGEANCE STYLE)
   ═══════════════════════════════════════════════ */

function WhyChooseUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 px-6 md:px-8 border-y border-border/30 bg-background relative overflow-hidden"
    >
      {/* Background Subtle Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 rounded-[100%] blur-[120px] pointer-events-none mix-blend-screen" />

      {/* Subtle Grid overlay for texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_40%,transparent_100%)] dark:bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)]" />

      <div className="max-w-[1140px] mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-foreground mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 pb-2">
            Why Docs UI?
          </h2>
          <p className="text-muted-foreground/80 text-[15px] md:text-base max-w-xl mx-auto leading-relaxed font-medium">
            Engineered to explore unique interaction patterns—from 3D
            displacement hover effects to beautiful physics animations and
            scalable layouts.
          </p>
        </motion.div>

        {/* 2x2 Bento Grid - Scaled down for breathing room */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Card 1: Components You Won't Find Anywhere */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group flex flex-col p-8 rounded-[2rem] bg-card/20 backdrop-blur-2xl border border-border/40 shadow-xl hover:bg-card/40 hover:border-primary/30 transition-all duration-700"
          >
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 tracking-tight">
                Components You Won&apos;t Find Anywhere
              </h3>
              <p className="text-[14px] text-muted-foreground/90 leading-relaxed max-w-sm font-medium">
                Unique interaction patterns like displacement hover effects,
                fluid animations, and cards that stand out from typical UI
                libraries.
              </p>
            </div>

            {/* Visual Block */}
            <div className="mt-auto flex justify-center items-center h-48 sm:h-60 perspective-[1200px] relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

              <div className="w-[240px] h-[150px] sm:w-[280px] sm:h-[180px] rounded-2xl border border-white/10 dark:border-white/5 bg-gradient-to-b from-white/50 to-white/10 dark:from-white/10 dark:to-white/5 backdrop-blur-xl shadow-2xl relative transition-transform duration-700 ease-out group-hover:[transform:rotateX(18deg)_rotateY(-18deg)_scale(1.03)] flex flex-col items-center justify-center p-5 overflow-hidden transform-gpu ring-1 ring-black/5 dark:ring-white/5">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none" />

                <div className="size-14 sm:size-16 rounded-full bg-background border border-primary/20 text-primary flex items-center justify-center mb-4 transition-transform duration-700 group-hover:translate-z-[30px] shadow-xl shadow-primary/20">
                  <Layers className="size-6 sm:size-7" />
                </div>
                <p className="font-bold text-[14px] sm:text-base transition-transform duration-700 group-hover:translate-z-[20px] text-foreground tracking-tight">
                  Interactive Card
                </p>
                <p className="text-[10px] text-muted-foreground/80 mt-1.5 transition-transform duration-700 group-hover:translate-z-[15px] font-medium uppercase tracking-widest">
                  Hover to preview
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Built with Modern Frameworks */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="group flex flex-col p-8 rounded-[2rem] bg-card/20 backdrop-blur-2xl border border-border/40 shadow-xl hover:bg-card/40 hover:border-primary/30 transition-all duration-700"
          >
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 tracking-tight">
                Built with Modern Frameworks
              </h3>
              <p className="text-[14px] text-muted-foreground/90 leading-relaxed max-w-sm font-medium">
                Designed to work seamlessly with Next.js, React, and Tailwind
                CSS. Engineered for rapid integration into real-world production
                projects.
              </p>
            </div>

            {/* Visual Block: Scaled Down Isometric Grid */}
            <div className="mt-auto flex justify-center items-center h-48 sm:h-60 perspective-[1000px]">
              <div
                className="grid grid-cols-3 gap-4 sm:gap-5 transition-transform duration-1000 ease-out group-hover:scale-[1.05]"
                style={{ transform: "rotateX(55deg) rotateZ(-40deg)" }}
              >
                {[
                  { name: "React", icon: <Cpu className="size-5 sm:size-6" /> },
                  {
                    name: "Next.js",
                    icon: <Boxes className="size-5 sm:size-6" />,
                  },
                  {
                    name: "Tailwind",
                    icon: <Paintbrush className="size-5 sm:size-6" />,
                  },
                  {
                    name: "Framer",
                    icon: <Sparkles className="size-5 sm:size-6" />,
                  },
                  {
                    name: "TypeScript",
                    icon: <Code2 className="size-5 sm:size-6" />,
                  },
                  { name: "GSAP", icon: <Zap className="size-5 sm:size-6" /> },
                ].map((f, idx) => (
                  <div
                    key={f.name}
                    className="size-14 sm:size-16 rounded-2xl bg-background/80 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-[0_12px_24px_rgba(0,0,0,0.06)] flex items-center justify-center text-muted-foreground/70 transition-all duration-700 ease-out hover:-translate-y-4 sm:hover:-translate-y-6 hover:shadow-[0_24px_40px_rgba(var(--primary-rgb),0.15)] hover:border-primary/50 hover:text-primary relative group/icon before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100"
                    style={{ transitionDelay: `${idx * 40}ms` }}
                  >
                    <div className="transform-gpu rotate-x-[0deg] rotate-z-[0deg] relative z-10">
                      {f.icon}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 3: Open Source With Story */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="group flex flex-col p-8 rounded-[2rem] bg-card/20 backdrop-blur-2xl border border-border/40 shadow-xl hover:bg-card/40 hover:border-primary/30 transition-all duration-700"
          >
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 tracking-tight">
                Open Source With Story
              </h3>
              <p className="text-[14px] text-muted-foreground/90 leading-relaxed max-w-sm font-medium">
                Every component is crafted with intention. Each block explores a
                unique interaction pattern and the reasoning behind its
                structural design.
              </p>
            </div>

            {/* Visual Block: Scaled Down Nodes */}
            <div className="mt-auto flex justify-center items-center h-48 sm:h-60 relative w-full">
              <div className="w-full max-w-[260px] sm:max-w-[300px] relative flex items-center justify-between z-10 h-full">
                <svg
                  className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-[2px] overflow-visible -z-10"
                  preserveAspectRatio="none"
                >
                  <line
                    x1="0"
                    y1="0"
                    x2="100%"
                    y2="0"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    className="text-border/60"
                  />
                  <line
                    x1="0"
                    y1="0"
                    x2="100%"
                    y2="0"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    className="stroke-[var(--primary)] drop-shadow-[0_0_6px_var(--primary)] transition-all duration-[2s] ease-in-out opacity-0 group-hover:opacity-100"
                    strokeDasharray="20 1000"
                    strokeDashoffset="100"
                    style={{ animation: "dash-sweep 3s infinite linear" }}
                  />
                </svg>

                <div className="size-12 sm:size-14 rounded-2xl border border-white/10 dark:border-white/5 bg-background/50 backdrop-blur-md shadow-lg flex items-center justify-center group-hover:border-primary/40 group-hover:text-primary transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_12px_24px_rgba(var(--primary-rgb),0.1)] ring-1 ring-black/5 dark:ring-white/5">
                  <Code2 className="size-5 sm:size-6 opacity-70 group-hover:opacity-100" />
                </div>

                <div className="size-16 sm:size-20 rounded-2xl border border-primary/50 bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-md text-primary shadow-[0_12px_24px_rgba(var(--primary-rgb),0.15)] flex items-center justify-center transition-all duration-700 group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_rgba(var(--primary-rgb),0.25)] group-hover:scale-110 relative before:absolute before:inset-0 before:rounded-2xl before:bg-white/10 before:opacity-0 hover:before:opacity-100">
                  <GitPullRequest className="size-7 sm:size-8 relative z-10" />
                </div>

                <div className="size-12 sm:size-14 rounded-2xl border border-white/10 dark:border-white/5 bg-background/50 backdrop-blur-md shadow-lg flex items-center justify-center group-hover:border-primary/40 group-hover:text-primary transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_12px_24px_rgba(var(--primary-rgb),0.1)] ring-1 ring-black/5 dark:ring-white/5">
                  <Share2 className="size-5 sm:size-6 opacity-70 group-hover:opacity-100" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Build Landing Pages Faster */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="group flex flex-col p-8 rounded-[2rem] bg-card/20 backdrop-blur-2xl border border-border/40 shadow-xl hover:bg-card/40 hover:border-primary/30 transition-all duration-700"
          >
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 tracking-tight">
                Build Landing Pages Faster
              </h3>
              <p className="text-[14px] text-muted-foreground/90 leading-relaxed max-w-sm font-medium">
                Launch polished interfaces in minutes using pre-built UI blocks
                designed for speed. Skip repetitive scaffolding and focus on
                shipping.
              </p>
            </div>

            {/* Visual Block: Scaled Down Skeletons */}
            <div className="mt-auto flex justify-center items-center h-48 sm:h-60 relative">
              <div className="w-full max-w-[280px] rounded-2xl border border-black/5 dark:border-white/5 p-4 sm:p-5 space-y-3 sm:space-y-4 bg-background/80 backdrop-blur-sm shadow-xl relative group-hover:border-primary/30 transition-all duration-700 overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
                {/* Dark-mode aware shimmer effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/5 dark:via-white/5 to-transparent group-hover:animate-[shimmer_2s_infinite] z-0" />

                {/* Skeletons with proper light/dark contrast */}
                <div className="h-3 w-1/3 rounded-md bg-zinc-200 dark:bg-muted/60 relative z-10" />
                <div className="h-16 sm:h-20 w-full rounded-xl bg-zinc-100 dark:bg-muted/40 relative z-10" />
                <div className="flex gap-3 relative z-10">
                  <div className="h-20 sm:h-24 flex-1 rounded-xl bg-zinc-100 dark:bg-muted/40" />
                  <div className="h-20 sm:h-24 flex-1 rounded-xl bg-zinc-100 dark:bg-muted/40" />
                </div>

                <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center z-20">
                  <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-700 delay-100 ease-[0.16,1,0.3,1] px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-[13px] sm:text-sm shadow-xl flex items-center gap-2.5 border border-zinc-700 dark:border-zinc-300">
                    <Zap className="size-3.5 sm:size-4 text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]" />
                    Ship at lightspeed
                  </div>
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
    navigation[0]?.label || "",
  );
  const activeNav = navigation.find((n) => n.label === activeCategory);

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-8">
      <div className="max-w-[1240px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-3">
            <Package className="size-3.5" />
            Component Index
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-foreground mb-3 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
            Explore 100+ Components
          </h2>
          <p className="text-muted-foreground text-[15px] max-w-md mx-auto font-medium">
            Categorized library ready to inspect and copy.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="flex items-center justify-center mb-10"
        >
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-muted/30 border border-border/50 overflow-x-auto scrollbar-hide backdrop-blur-sm">
            {navigation.map((cat) => {
              const Icon = categoryIcons[cat.label] || Boxes;
              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-bold whitespace-nowrap transition-all cursor-pointer",
                    activeCategory === cat.label
                      ? "text-primary-foreground bg-primary shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50",
                  )}
                >
                  <Icon className="size-3.5" />
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
          transition={{ duration: 0.4 }}
          className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
        >
          {activeNav?.children.map((child, i) => (
            <motion.div
              key={child.href}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.015, ease: "easeOut" }}
            >
              <Link
                href={child.href}
                className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-bold bg-card/50 backdrop-blur-sm border border-border/50 text-foreground hover:border-primary/40 hover:bg-card hover:shadow-[0_6px_16px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_6px_16px_rgba(255,255,255,0.02)] transition-all"
              >
                {child.label}
                {child.badge && (
                  <span
                    className={cn(
                      "text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider",
                      child.badge === "New"
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "bg-secondary text-secondary-foreground",
                    )}
                  >
                    {child.badge}
                  </span>
                )}
                <ArrowRight className="size-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
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
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto relative rounded-[2.5rem] overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-card border border-border/50" />
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen"
          style={{
            background:
              "radial-gradient(ellipse at top right, var(--primary) 0%, transparent 70%)",
            opacity: 0.15,
          }}
        />

        <div className="relative z-10 px-8 py-16 md:px-12 md:py-20 text-center backdrop-blur-3xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-foreground mb-5">
            Ready to Build Your <br className="hidden sm:block" /> Next Project?
          </h2>
          <p className="text-muted-foreground text-[15px] mb-8 max-w-sm mx-auto leading-relaxed font-medium">
            Copy components into your project and ship high quality software
            today. Free and open source forever.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/docs"
              className="px-6 py-3.5 rounded-xl bg-primary text-primary-foreground text-[13px] font-bold hover:bg-primary/90 hover:shadow-[0_0_16px_rgba(var(--primary-rgb),0.4)] hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              Get Started Free
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="https://github.com/docs/docs"
              target="_blank"
              className="px-6 py-3.5 rounded-xl border border-border/60 bg-background/50 backdrop-blur-md text-foreground text-[13px] font-bold hover:bg-muted/50 hover:border-border hover:-translate-y-0.5 transition-all flex items-center gap-2"
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
    <footer className="border-t border-border/50 px-6 md:px-8 bg-background">
      <div className="max-w-[1240px] mx-auto py-10 md:py-12 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
            <Layers className="size-3.5 text-primary" />
          </div>
          <span className="font-black text-base text-foreground tracking-tight">
            Docs UI
          </span>
          <span className="text-[12px] text-muted-foreground font-medium hidden sm:inline-block border-l border-border/50 pl-3 ml-1">
            Crafting beautiful component documentation
          </span>
        </div>

        <div className="flex items-center gap-5 text-[12px] font-bold text-muted-foreground">
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
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 overflow-x-hidden font-sans">
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
