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
  Search,
  CheckCircle2,
  Activity,
  ShieldCheck,
  Send,
  Mic,
  GitPullRequest,
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
   HERO INTERACTIVE HUB (100% FLUID RESPONSIVE PREVIEW)
   ═══════════════════════════════════════════════ */

function HeroInteractiveHub() {
  const [activeTab, setActiveTab] = useState<"ai" | "chart" | "terminal" | "auth">("ai");
  const [inputVal, setInputVal] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleTerminalCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full max-w-[580px] mx-auto lg:max-w-none">
      {/* Dynamic Theme Radial Glow */}
      <div
        className="absolute -inset-1 rounded-3xl blur-2xl opacity-25 dark:opacity-20 animate-pulse pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 60%)" }}
      />

      <div className="relative rounded-2xl border border-border/60 bg-card/95 backdrop-blur-2xl shadow-2xl overflow-hidden ring-1 ring-white/10 dark:ring-white/5">
        {/* Hub Header Bar */}
        <div className="px-4 py-2.5 border-b border-border/50 bg-muted/40 flex items-center justify-between gap-2 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="size-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="size-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="size-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          <div className="flex items-center gap-1 bg-background/60 p-1 rounded-lg text-xs font-semibold border border-border/50">
            <button
              onClick={() => setActiveTab("ai")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-md transition-all cursor-pointer text-xs font-bold",
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
                "flex items-center gap-1.5 px-3 py-1 rounded-md transition-all cursor-pointer text-xs font-bold",
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
                "flex items-center gap-1.5 px-3 py-1 rounded-md transition-all cursor-pointer text-xs font-bold",
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
                "flex items-center gap-1.5 px-3 py-1 rounded-md transition-all cursor-pointer text-xs font-bold",
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

        {/* Dynamic Body Container — Fluid No-Scale Responsive Fit */}
        <div className="p-4 sm:p-5 min-h-[340px] flex flex-col justify-between bg-gradient-to-b from-transparent to-muted/10">
          {activeTab === "ai" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full flex flex-col h-full justify-between gap-3"
            >
              {/* AI Chat Header */}
              <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-md">
                    <Bot className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-foreground">AI Assistant</h4>
                    <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                      Online & Ready
                    </span>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold border border-primary/20">
                  GPT-4o
                </span>
              </div>

              {/* Message Stream */}
              <div className="space-y-2.5 text-xs font-medium py-1">
                <div className="flex gap-2 items-start">
                  <div className="size-6 rounded-md bg-muted flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <Bot className="size-3.5" />
                  </div>
                  <div className="p-2.5 rounded-2xl rounded-tl-none bg-muted/80 text-foreground max-w-[85%] leading-relaxed border border-border/40">
                    Hello! Welcome to Docs UI. How can I assist you with your React project today?
                  </div>
                </div>

                <div className="flex gap-2 items-start justify-end">
                  <div className="p-2.5 rounded-2xl rounded-tr-none bg-primary text-primary-foreground max-w-[85%] leading-relaxed shadow-md">
                    How do I add these interactive components to my codebase?
                  </div>
                </div>

                <div className="flex gap-2 items-start">
                  <div className="size-6 rounded-md bg-muted flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <Bot className="size-3.5" />
                  </div>
                  <div className="p-2.5 rounded-2xl rounded-tl-none bg-muted/80 text-foreground max-w-[85%] leading-relaxed border border-border/40">
                    Run <code className="px-1 py-0.5 rounded bg-background font-mono text-[11px] text-primary">npx docs-ui@latest add &lt;component&gt;</code> or copy the source code directly. Zero npm lock-in!
                  </div>
                </div>
              </div>

              {/* Input Bar */}
              <div className="flex items-center gap-2 p-1.5 rounded-xl border border-border bg-background shadow-inner">
                <input
                  type="text"
                  placeholder="Message AI Assistant..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="flex-1 bg-transparent px-2 text-xs text-foreground placeholder:text-muted-foreground outline-none"
                />
                <button className="p-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all cursor-pointer">
                  <Send className="size-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "chart" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="p-4 rounded-xl bg-card border border-border shadow-sm flex flex-col justify-between h-full"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-xs font-bold text-foreground">
                    Weekly Growth Metrics
                  </h4>
                  <p className="text-[10px] text-muted-foreground">Real-time data visualization</p>
                </div>
                <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-primary/10 text-primary border border-primary/20">
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
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="p-4 rounded-xl bg-card border border-border shadow-sm flex flex-col justify-between h-full max-w-sm mx-auto w-full"
            >
              <div>
                <div className="text-center mb-4">
                  <div className="size-9 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center mx-auto mb-2 font-bold shadow-sm">
                    <Lock className="size-4" />
                  </div>
                  <h4 className="text-sm font-extrabold text-foreground">Welcome Back</h4>
                  <p className="text-[11px] text-muted-foreground">Enter your credentials to access your account</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-foreground mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-xs outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-foreground mb-1">Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-xs outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2">
                <button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold shadow-md hover:opacity-90 transition-all cursor-pointer">
                  Sign In
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "terminal" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border border-border bg-[#0d1117] text-zinc-100 p-3.5 flex flex-col justify-between h-full font-mono text-xs shadow-inner"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2">
                <div className="flex items-center gap-1.5">
                  <Terminal className="size-3.5 text-primary" />
                  <span className="text-[11px] font-bold text-zinc-300">docs-ui.sh</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-[10px] text-zinc-400 hover:text-white transition-colors"
                >
                  {copied ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="size-3" /> Copied
                    </span>
                  ) : (
                    <>
                      <span>Copy</span>
                      <Copy className="size-3" />
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-2 text-[11px] leading-relaxed text-zinc-300">
                <p><span className="text-primary font-bold">$</span> npx docs-ui@latest init</p>
                <p className="text-emerald-400">✔ Initialized Docs UI configuration in project root.</p>
                <p className="text-emerald-400">✔ Installed dependencies: framer-motion, gsap, lucide-react.</p>
                <p><span className="text-primary font-bold">$</span> npx docs-ui@latest add ai-chat chart-block</p>
                <p className="text-emerald-400">✔ Copying components to src/components/custom/blocks/</p>
                <p className="text-emerald-400 font-bold">✔ All components ready to import!</p>
              </div>

              <div className="pt-2 text-[10px] text-zinc-500 border-t border-zinc-800 flex items-center justify-between">
                <span>Bash / zsh</span>
                <span>Zero npm lock-in</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Hub Footer Accent */}
        <div className="px-4 py-2 bg-muted/40 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 font-medium text-foreground">
            <Sparkles className="size-3.5 text-primary" />
            Interactive Live Component Preview
          </span>
          <span className="text-[11px] font-mono text-muted-foreground">
            Interactive Demo
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
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-16 pb-14">
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
              className="pt-1"
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
   SECTION 2: TECH STACK MARQUEE
   ═══════════════════════════════════════════════ */

function TechStackMarquee() {
  const marqueeItems = [
    ...techStack,
    ...techStack,
    ...techStack,
    ...techStack,
  ];

  return (
    <section className="border-y border-border bg-muted/40 py-5 overflow-hidden relative select-none">
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
   SECTION 3: REAL COMPONENT SHOWCASE
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

        {/* 3-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {/* Column 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
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

          {/* Column 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
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

          {/* Column 3 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
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
   SECTION 4: WHY DOCS UI? (USER'S EXACT CUSTOM SECTION)
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
   SECTION 5: PRODUCTION COMPONENT CATALOG (MATRIX + INSPECTOR)
   ═══════════════════════════════════════════════ */

interface SystemNode {
  id: string;
  title: string;
  category: string;
  icon: typeof Bot;
  tag: string;
  description: string;
  cliCommand: string;
  features: string[];
  docPath: string;
}

const matrixNodes: SystemNode[] = [
  {
    id: "ai-chat",
    title: "AI Conversational Block",
    category: "Ui Components",
    icon: Bot,
    tag: "Popular",
    description: "Production-ready AI chat interface with message streaming, history sidebar, and custom prompts.",
    cliCommand: "npx docs-ui@latest add ai-chat",
    features: ["Streaming Message Support", "Multi-Thread Sidebar", "Dynamic Theme Sync"],
    docPath: "/docs/nextjs/ai-chat",
  },
  {
    id: "3d-motion",
    title: "3D Spring Motion Cards",
    category: "Animated Ui Components",
    icon: Sparkles,
    tag: "Interactive",
    description: "Stackable 3D cards with Framer Motion spring physics, drag gestures, and tilt effects.",
    cliCommand: "npx docs-ui@latest add memories-card",
    features: ["Drag & Swipe Physics", "3D Gyro Tilt", "Zero Config"],
    docPath: "/docs/nextjs/memories-card",
  },
  {
    id: "dock",
    title: "Magnifying macOS Dock",
    category: "Animated Ui Components",
    icon: Compass,
    tag: "macOS",
    description: "Apple macOS style dock with fluid cursor proximity magnification physics.",
    cliCommand: "npx docs-ui@latest add dock",
    features: ["Cursor Proximity Magnification", "Custom Icon Slots", "Smooth Spring Back"],
    docPath: "/docs/nextjs/dock",
  },
  {
    id: "analytics",
    title: "Analytics Data Chart",
    category: "Ui Components",
    icon: BarChart3,
    tag: "SVG Engine",
    description: "Lightweight, responsive SVG bar and line chart component with hover tooltips.",
    cliCommand: "npx docs-ui@latest add chart-block",
    features: ["Zero Chart Library Weight", "Auto Theme Gradient", "Hover Value Tooltips"],
    docPath: "/docs/nextjs/chart-block",
  },
  {
    id: "auth",
    title: "Security & Auth Form",
    category: "Ui Components",
    icon: Lock,
    tag: "Security",
    description: "Glassmorphic login and signup forms with social auth buttons and input validation.",
    cliCommand: "npx docs-ui@latest add auth-form",
    features: ["Glassmorphic Styling", "Social Login Providers", "Password Visibility Toggle"],
    docPath: "/docs/nextjs/auth-form",
  },
  {
    id: "cli",
    title: "Developer CLI Terminal",
    category: "Ui Components",
    icon: Terminal,
    tag: "Dev Tool",
    description: "Interactive code terminal with syntax highlighting, tabbed output, and instant copy.",
    cliCommand: "npx docs-ui@latest add terminal",
    features: ["Copy Code Button", "Multiple Shell Tabs", "Dark Theme Native"],
    docPath: "/docs/nextjs/terminal",
  },
];

function ComponentCatalogSection() {
  const [selectedNode, setSelectedNode] = useState<SystemNode>(matrixNodes[0]);
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const SelectedIcon = selectedNode.icon;

  return (
    <section ref={ref} className="py-16 md:py-24 px-6 md:px-8">
      <div className="max-w-[1320px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
            <Package className="size-3.5" />
            Production Component Catalog
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black tracking-tight text-foreground mb-3">
            Explore 100+ Production Components
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            Inspect component specifications, features, and CLI quick-add commands directly from the matrix.
          </p>
        </motion.div>

        {/* Interactive Matrix Grid + Inspector Card */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,1fr] gap-6 items-stretch my-6">
          {/* Left Panel: Interactive Matrix Nodes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {matrixNodes.map((node) => {
              const Icon = node.icon;
              const isSelected = selectedNode.id === node.id;

              return (
                <motion.div
                  key={node.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedNode(node)}
                  className={cn(
                    "p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between group relative overflow-hidden",
                    isSelected
                      ? "border-primary bg-primary/10 shadow-lg ring-2 ring-primary/20"
                      : "border-border bg-card/60 hover:border-primary/50 hover:bg-card"
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={cn(
                        "size-10 rounded-xl flex items-center justify-center border transition-all",
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted text-muted-foreground border-border group-hover:text-primary group-hover:border-primary/40"
                      )}
                    >
                      <Icon className="size-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-card border border-border text-muted-foreground">
                      {node.tag}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {node.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {node.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
                    <span className="flex items-center gap-1 text-primary">
                      <Activity className="size-3" /> Node Active
                    </span>
                    <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform text-primary" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Panel: Live Node Inspector Card */}
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border bg-card/90 backdrop-blur-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl relative overflow-hidden ring-1 ring-white/10 dark:ring-white/5"
          >
            {/* Radial Ambient Glow */}
            <div
              className="absolute -top-20 -right-20 size-60 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)" }}
            />

            <div>
              {/* Inspector Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shadow-md">
                    <SelectedIcon className="size-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                      {selectedNode.category}
                    </span>
                    <h3 className="text-lg font-black text-foreground">
                      {selectedNode.title}
                    </h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  ● Live Specs
                </span>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                {selectedNode.description}
              </p>

              {/* Feature Checklist */}
              <div className="space-y-2 mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Architecture Specs
                </span>
                {selectedNode.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs text-foreground font-medium">
                    <CheckCircle2 className="size-4 text-primary shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* CLI Command Box */}
              <div className="mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                  CLI Quick Add Command
                </span>
                <button
                  onClick={() => handleCopy(selectedNode.cliCommand)}
                  className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border border-border bg-muted/40 hover:border-primary/50 transition-all cursor-pointer group"
                >
                  <code className="text-xs font-mono text-foreground flex-1 text-left">
                    {selectedNode.cliCommand}
                  </code>
                  <div className="flex items-center gap-1 text-xs font-semibold text-muted-foreground group-hover:text-foreground">
                    {copied ? (
                      <span className="text-emerald-500 font-bold flex items-center gap-1">
                        <Check className="size-3.5" /> Copied!
                      </span>
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Action Links */}
            <div className="pt-4 border-t border-border flex items-center gap-3">
              <Link
                href={selectedNode.docPath}
                className="flex-1 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                Inspect Component Specs
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 6: RE-DESIGNED PREMIUM CTA BANNER
   ═══════════════════════════════════════════════ */

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npx docs-ui@latest init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-8 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden border border-border/80 bg-card/60 backdrop-blur-3xl shadow-2xl"
      >
        {/* Dynamic Glowing Radial Glows */}
        <div
          className="absolute -top-32 -left-32 size-96 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 size-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 px-8 py-14 sm:px-14 sm:py-18 text-center flex flex-col items-center">
          {/* Top Feature Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary mb-6">
            <CheckCircle2 className="size-3.5 text-primary" />
            <span>Zero Dependencies · 100% Copy & Paste · Free Forever</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-6 leading-[1.08]">
            Build Next-Gen <br className="hidden sm:block" />
            <span className="text-primary">React Interfaces</span> Today.
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed font-medium">
            Join thousands of developers building stunning, production-ready websites with our open source React & Tailwind CSS blocks.
          </p>

          {/* Interactive CLI Box */}
          <div className="mb-8 w-full max-w-md">
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-border bg-background/80 hover:border-primary/50 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center gap-2.5 text-xs font-mono text-foreground">
                <Terminal className="size-4 text-primary shrink-0" />
                <span>npx docs-ui@latest init</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground group-hover:text-foreground">
                {copied ? (
                  <span className="flex items-center gap-1 text-emerald-500 font-bold">
                    <Check className="size-3.5" /> Copied!
                  </span>
                ) : (
                  <>
                    <span>Copy</span>
                    <Copy className="size-3.5" />
                  </>
                )}
              </div>
            </button>
          </div>

          {/* CTA Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md">
            <Link
              href="/docs"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-xl hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Explore Components
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="https://github.com/docs/docs"
              target="_blank"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-border bg-background text-foreground text-xs font-bold hover:bg-accent hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Github className="size-4" />
              <span>Star on GitHub</span>
              <span className="px-1.5 py-0.5 rounded-full bg-muted text-[10px] text-muted-foreground border border-border ml-1">
                2.1k
              </span>
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
      <div className="max-w-[1320px] mx-auto py-10 md:py-12 flex flex-col sm:flex-row items-center justify-between gap-5">
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
      <ComponentCatalogSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
