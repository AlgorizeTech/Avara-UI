"use client";

import DraggableCardList, {
	DraggableCardItem,
} from "@/components/custom/draggable-card-list";
import { ChartBlock } from "@/components/custom/blocks/ChartBlock";
import {
	Folder,
	type FolderFile,
} from "@/components/custom/blocks/FolderBlock";
import { DesignComponentsFolder } from "@/components/custom/blocks/DesignComponentsFolder";
import { Dock, DockItem } from "@/components/custom/blocks/DockBlock";
import {
	ChatAvatar,
	ChatBubble,
	ChatMessage,
	ChatTimestamp,
	ChatTypingIndicator,
} from "@/components/custom/blocks/ChatBubbleBlock";
import {
	ThreeDCarousel,
	CarouselItem,
} from "@/components/custom/blocks/ThreeDCarouselBlock";
import { CommandSearchBlock } from "@/components/custom/blocks/UtilityBlocks";
import { ComponentWall } from "@/components/custom/blocks/ComponentWallBlock";
import { MarqueeBlock } from "@/components/custom/blocks/MarqueeBlock";
import { AnimatedFAQBlock } from "@/components/custom/blocks/AnimatedFAQBlock";
import { GitHubIcon } from "@/components/custom/blocks/Icons";
import { WALL_ITEMS, WALL_STACK } from "@/constants/component-wall";
import { cn } from "@/lib/utils";
import {
	ArrowRight,
	ArrowUpRight,
	Bot,
	Check,
	Code2,
	Compass,
	Copy,
	FileText,
	FolderOpen,
	Github,
	Layers,
	Lock,
	MessageCircle,
	Paintbrush,
	Sparkles,
	Star,
	Terminal,
	Zap,
	Boxes,
	BarChart3,
	Share2,
	Cpu,
	CheckCircle2,
	LayoutGrid,
	Send,
	GitPullRequest,
	GripVertical,
	Image as ImageIcon,
	SmilePlus,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { links } from "@/config/site";

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

/** Copied verbatim by the terminal card's Copy button, so it has to be runnable. */
const sampleTerminalCode = `$ npx shadcn@latest init
✔ Created components.json and lib/utils.ts.

$ npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
✔ Added registry @algorize-ui to components.json.

$ npx shadcn@latest add @algorize-ui/ai-chat
✔ Installed dependencies: lucide-react
✔ Created components/custom/blocks/Ai-chat.tsx

$ npm run dev
▲ Next.js (Turbopack)
- Local: http://localhost:3000
✓ Ready in 1.8s`;

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

const sampleCaseFiles: FolderFile[] = [
	{ name: "Deposition_transcript.pdf" },
	{ name: "Exhibit_A_photos.zip" },
	{ name: "Witness_statement_02.docx" },
	{ name: "Timeline_v3.xlsx" },
	{ name: "Court_filing_draft.pdf" },
	{ name: "Evidence_log.csv" },
];

const sampleTasks: DraggableCardItem[] = [
	{
		id: "1",
		title: "Perf Audit",
		description: "Split bundles, cut LCP to 0.8s",
		date: "2026-08-30",
		badge: "PERF",
		badgeStyle:
			"bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30",
		accentColor: "from-amber-400 via-orange-500 to-yellow-500",
		hoverBorderColor: "hover:border-amber-500/80 dark:hover:border-amber-400/80",
	},
	{
		id: "2",
		title: "Security Patch",
		description: "Upgrade deps, rotate API tokens",
		date: "2026-08-30",
		badge: "SECURITY",
		badgeStyle:
			"bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30",
		accentColor: "from-emerald-400 via-teal-500 to-cyan-500",
		hoverBorderColor:
			"hover:border-emerald-500/80 dark:hover:border-emerald-400/80",
	},
	{
		id: "3",
		title: "UI Kit v2.4",
		description: "Dark mode tokens and aria roles",
		date: "2026-08-30",
		badge: "LIBRARY",
		badgeStyle:
			"bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30",
		accentColor: "from-purple-400 via-indigo-500 to-violet-500",
		hoverBorderColor:
			"hover:border-purple-500/80 dark:hover:border-purple-400/80",
	},
	{
		id: "4",
		title: "DB Migration",
		description: "Zero-downtime Postgres indexing",
		date: "2026-08-30",
		badge: "DATABASE",
		badgeStyle:
			"bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/30",
		accentColor: "from-blue-400 via-indigo-500 to-cyan-500",
		hoverBorderColor: "hover:border-blue-500/80 dark:hover:border-blue-400/80",
	},
];

const sampleCarouselItems: CarouselItem[] = [
	{
		id: "1",
		title: "Misty Pine Forest",
		category: "Nature",
		image:
			"https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
		description: "Early morning fog weaving through dense evergreen trees.",
	},
	{
		id: "2",
		title: "Lush River Valley",
		category: "Wilderness",
		image:
			"https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
		description: "Sunbeams streaming through valley clouds onto forest waters.",
	},
	{
		id: "3",
		title: "Autumn Woodland Path",
		category: "Landscape",
		image:
			"https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
		description: "Golden foliage covering quiet forest trails in peak autumn.",
	},
];

/* ═══════════════════════════════════════════════
   HERO INTERACTIVE HUB (100% FLUID RESPONSIVE PREVIEW)
   ═══════════════════════════════════════════════ */

function HeroInteractiveHub() {
	const [activeTab, setActiveTab] = useState<
		"ai" | "chart" | "terminal" | "auth"
	>("ai");
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
				style={{
					background:
						"radial-gradient(circle, var(--primary) 0%, transparent 60%)",
				}}
			/>

			<div className="relative rounded-2xl border border-border/60 bg-card/95 backdrop-blur-2xl shadow-2xl overflow-hidden ring-1 ring-white/10 dark:ring-white/5">
				{/* Hub Header Bar */}
				<div className="px-4 py-2.5 border-b border-border/50 bg-muted/40 flex items-center justify-between gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
					<div className="flex items-center gap-1.5 shrink-0">
						<span className="size-2.5 rounded-full bg-rose-500/80 inline-block" />
						<span className="size-2.5 rounded-full bg-amber-500/80 inline-block" />
						<span className="size-2.5 rounded-full bg-emerald-500/80 inline-block" />
					</div>

					<div className="flex items-center gap-1 bg-background/60 p-1 rounded-lg text-xs font-semibold border border-border/50">
						<button
							onClick={() => setActiveTab("ai")}
							className={cn(
								"flex items-center gap-1.5 px-3 py-1 rounded-md transition-all cursor-pointer text-xs font-semibold",
								activeTab === "ai"
									? "bg-primary text-primary-foreground shadow-sm"
									: "text-muted-foreground hover:text-foreground",
							)}>
							<Bot className="size-3.5" />
							AI Chat
						</button>
						<button
							onClick={() => setActiveTab("chart")}
							className={cn(
								"flex items-center gap-1.5 px-3 py-1 rounded-md transition-all cursor-pointer text-xs font-semibold",
								activeTab === "chart"
									? "bg-primary text-primary-foreground shadow-sm"
									: "text-muted-foreground hover:text-foreground",
							)}>
							<BarChart3 className="size-3.5" />
							Analytics
						</button>
						<button
							onClick={() => setActiveTab("auth")}
							className={cn(
								"flex items-center gap-1.5 px-3 py-1 rounded-md transition-all cursor-pointer text-xs font-semibold",
								activeTab === "auth"
									? "bg-primary text-primary-foreground shadow-sm"
									: "text-muted-foreground hover:text-foreground",
							)}>
							<Lock className="size-3.5" />
							Auth
						</button>
						<button
							onClick={() => setActiveTab("terminal")}
							className={cn(
								"flex items-center gap-1.5 px-3 py-1 rounded-md transition-all cursor-pointer text-xs font-semibold",
								activeTab === "terminal"
									? "bg-primary text-primary-foreground shadow-sm"
									: "text-muted-foreground hover:text-foreground",
							)}>
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
							className="w-full flex flex-col h-full justify-between gap-3">
							{/* AI Chat Header */}
							<div className="flex items-center justify-between border-b border-border/50 pb-2.5">
								<div className="flex items-center gap-2.5">
									<div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-semibold shadow-md">
										<Bot className="size-4" />
									</div>
									<div>
										<h4 className="text-xs font-extrabold text-foreground">
											AI Assistant
										</h4>
										<span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
											<span className="size-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
											Online & Ready
										</span>
									</div>
								</div>
								<span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
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
										Hello! Welcome to Docs UI. How can I assist you with your
										React project today?
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
										Run{" "}
										<code className="px-1 py-0.5 rounded bg-background font-mono text-[11px] text-primary">
											npx shadcn@latest add @algorize-ui/&lt;name&gt;
										</code>{" "}
										and the source lands in your project. Zero npm lock-in!
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
							className="p-4 rounded-xl bg-card border border-border shadow-sm flex flex-col justify-between h-full">
							<div className="flex items-center justify-between mb-2">
								<div>
									<h4 className="text-xs font-semibold text-foreground">
										Weekly Growth Metrics
									</h4>
									<p className="text-[10px] text-muted-foreground">
										Real-time data visualization
									</p>
								</div>
								<span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
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
							className="p-4 rounded-xl bg-card border border-border shadow-sm flex flex-col justify-between h-full max-w-sm mx-auto w-full">
							<div>
								<div className="text-center mb-4">
									<div className="size-9 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center mx-auto mb-2 font-semibold shadow-sm">
										<Lock className="size-4" />
									</div>
									<h4 className="text-sm font-extrabold text-foreground">
										Welcome Back
									</h4>
									<p className="text-[11px] text-muted-foreground">
										Enter your credentials to access your account
									</p>
								</div>

								<div className="space-y-3 text-xs">
									<div>
										<label className="block text-[11px] font-semibold text-foreground mb-1">
											Email Address
										</label>
										<input
											type="email"
											placeholder="name@company.com"
											className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-xs outline-none focus:border-primary/30"
										/>
									</div>
									<div>
										<label className="block text-[11px] font-semibold text-foreground mb-1">
											Password
										</label>
										<input
											type="password"
											placeholder="••••••••"
											className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-xs outline-none focus:border-primary/30"
										/>
									</div>
								</div>
							</div>

							<div className="mt-4 pt-2">
								<button className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold shadow-md hover:opacity-90 transition-all cursor-pointer">
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
							className="rounded-xl border border-border bg-[#0d1117] text-zinc-100 p-3.5 flex flex-col justify-between h-full font-mono text-xs shadow-inner">
							<div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2">
								<div className="flex items-center gap-1.5">
									<Terminal className="size-3.5 text-primary" />
									<span className="text-[11px] font-semibold text-zinc-300">
										install.sh
									</span>
								</div>
								<button
									onClick={handleCopyCode}
									className="flex items-center gap-1 text-[10px] text-zinc-400 hover:text-white transition-colors">
									{copied ? (
										<span className="text-emerald-400 font-semibold flex items-center gap-1">
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

							{/* Mirrors sampleTerminalCode, which the Copy button writes. */}
							<div className="space-y-2 text-[11px] leading-relaxed text-zinc-300">
								<p>
									<span className="text-primary font-semibold">$</span> npx
									shadcn@latest init
								</p>
								<p className="text-emerald-400">
									✔ Created components.json and lib/utils.ts.
								</p>
								<p className="break-all">
									<span className="text-primary font-semibold">$</span> npx
									shadcn@latest registry add
									@algorize-ui=https://algorize-ui.vercel.app/r/&#123;name&#125;.json
								</p>
								<p className="text-emerald-400">
									✔ Added registry @algorize-ui to components.json.
								</p>
								<p className="break-all">
									<span className="text-primary font-semibold">$</span> npx
									shadcn@latest add @algorize-ui/ai-chat
								</p>
								<p className="text-emerald-400">
									✔ Installed dependencies: lucide-react
								</p>
								<p className="text-emerald-400 font-semibold">
									✔ Created components/custom/blocks/Ai-chat.tsx
								</p>
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
   SHARED TYPE RAMP
   One set of classes per role so every section reads the same. Colours are
   an opacity ladder on the theme's ink (`text-foreground/NN`) rather than
   separate greys, so the theme customizer re-skins the page with the rest
   of the site.
   ═══════════════════════════════════════════════ */

const SECTION_INNER = "max-w-[1160px] mx-auto px-5 md:px-10";
const SECTION_EYEBROW =
	"inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground/30 mb-3";
const SECTION_H2 =
	"font-serif font-normal text-[clamp(26px,3.6vw,46px)] leading-[1.15] tracking-[-0.02em] text-foreground mb-3";
const SECTION_SUB = "text-[15px] leading-[1.65] text-foreground/45 max-w-[490px]";
const CARD_TITLE = "font-sans text-[14px] font-semibold text-foreground mb-[7px]";
const CARD_COPY = "text-[13px] leading-[1.65] text-foreground/45";
const CARD_SURFACE = "border border-foreground/[0.06] bg-card";
const EYEBROW_PILL =
	"inline-flex items-center gap-1.5 rounded-full bg-foreground/[0.04] backdrop-blur px-3 py-1 text-[12px] text-foreground/90";
const CHIP =
	"text-[9px] font-bold uppercase tracking-wider leading-none px-1.5 py-0.5 rounded-md bg-primary/15 text-primary border border-primary/30";
const BTN_CLAY =
	"inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background text-[14px] font-semibold tracking-[0.3px] px-7 py-3 hover:bg-foreground/90 transition-colors";
const BTN_SOFT =
	"inline-flex items-center justify-center gap-2 rounded-full bg-foreground/[0.04] hover:bg-foreground/10 text-foreground text-[14px] font-medium px-7 py-3 transition-colors";

/* ═══════════════════════════════════════════════
   SECTION 1: HERO
   ═══════════════════════════════════════════════ */

/* ComponentWall ships in the registry, so its own type scale stays generic;
   the site's hero ramp is layered on from here through its `className`,
   reaching the copy column by structure: the badge is the link just above
   the h1, the description the paragraph right after it, and the two actions
   the links in the row that follows. */
const HERO_TYPE = [
	// Eyebrow pill
	"[&_div:has(+h1)>a]:gap-1.5 [&_div:has(+h1)>a]:border-transparent [&_div:has(+h1)>a]:bg-foreground/[0.04] [&_div:has(+h1)>a]:px-3 [&_div:has(+h1)>a]:py-1 [&_div:has(+h1)>a]:text-[12px] [&_div:has(+h1)>a]:font-normal [&_div:has(+h1)>a]:text-foreground/90",
	"[&_div:has(+h1)>a]:hover:border-transparent [&_div:has(+h1)>a]:hover:bg-foreground/10 [&_div:has(+h1)>a]:hover:text-foreground",
	// Headline: Cooper at its regular weight
	"[&_h1]:font-normal [&_h1]:text-[clamp(34px,6.8vw,84px)] [&_h1]:leading-[1.06] [&_h1]:tracking-[-0.03em] [&_h1]:text-foreground",
	// Subtitle
	"[&_h1+p]:text-[clamp(13px,1.45vw,18px)] [&_h1+p]:leading-[1.65] [&_h1+p]:text-foreground/60",
	// Primary action: the clay button
	"[&_h1~div>a:first-child]:h-11 [&_h1~div>a:first-child]:rounded-full [&_h1~div>a:first-child]:bg-foreground [&_h1~div>a:first-child]:px-7 [&_h1~div>a:first-child]:text-[14px] [&_h1~div>a:first-child]:font-semibold [&_h1~div>a:first-child]:tracking-[0.3px] [&_h1~div>a:first-child]:text-background [&_h1~div>a:first-child]:hover:bg-foreground/90",
	// Secondary action: an ink-tint pill
	"[&_h1~div>a:nth-child(2)]:h-11 [&_h1~div>a:nth-child(2)]:rounded-full [&_h1~div>a:nth-child(2)]:border-transparent [&_h1~div>a:nth-child(2)]:bg-foreground/[0.04] [&_h1~div>a:nth-child(2)]:px-7 [&_h1~div>a:nth-child(2)]:text-[14px] [&_h1~div>a:nth-child(2)]:font-medium [&_h1~div>a:nth-child(2)]:text-foreground [&_h1~div>a:nth-child(2)]:hover:bg-foreground/10",
	// "Built with" label over the tool strip
	"[&_h1~div>span:first-child]:text-[11px] [&_h1~div>span:first-child]:uppercase [&_h1~div>span:first-child]:tracking-[0.12em] [&_h1~div>span:first-child]:text-foreground/40",
].join(" ");

function HeroSection() {
	return (
		<section className="relative w-full overflow-hidden">
			{/* Links are passed explicitly rather than relying on the block's
			    defaults: ComponentWall ships in the registry, so its defaults
			    have to make sense in a consumer's project, where this site's
			    routes do not exist. The wall's cards are this site's own
			    sections, and the install line names whichever one a camera
			    has just landed on — the centred layout puts the copy between
			    two walls, one camera resting high and the other low. */}
			<ComponentWall
				layout="center"
				badge={{ label: "Next-gen React components", href: "/docs/nextjs/index" }}
				heading="Build interactive {word}."
				headingWords={["interfaces", "components", "experiences", "animations", "dashboards"]}
				accent="interactive"
				description="A meticulous library of React components and interactive blocks, engineered for seamless performance with Tailwind CSS, TypeScript, GSAP and Framer Motion — delivered through the shadcn CLI."
				install={{ command: "npx shadcn@latest add @algorize-ui/{item}" }}
				primaryAction={{ label: "Browse components", href: "/docs/nextjs/all-components" }}
				secondaryAction={{ label: "Star on GitHub", href: links.github, icon: <GitHubIcon size={16} /> }}
				items={WALL_ITEMS}
				stack={{ label: "Built with", groups: WALL_STACK }}
				interval={4500}
				linkComponent={Link}
				className={HERO_TYPE}
			/>
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
		<section ref={ref} className="py-13 md:py-16">
			<div className={SECTION_INNER}>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
					className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
					<div>
						<span className={SECTION_EYEBROW}>
							<Layers className="size-3.5" />
							Live Interactive Components
						</span>
						<h2 className={SECTION_H2}>
							Real Motion &amp; Interactive Blocks
						</h2>
						<p className={SECTION_SUB}>
							Featuring Chat Bubbles, Magnifying Dock, and 3D Motion Carousel.
						</p>
					</div>
					<Link
						href="/docs/nextjs/index"
						className="group flex items-center gap-1.5 text-[13px] font-medium text-foreground/70 hover:text-foreground transition-colors shrink-0">
						View all components
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
						className="flex flex-col gap-6">
						<div className="showcase-card rounded-2xl border border-foreground/[0.06] bg-card p-4 overflow-hidden">
							<div className="px-2 pb-3 border-b border-foreground/[0.06] flex items-center justify-between text-[14px] text-foreground/40 font-medium mb-3">
								<span className="flex items-center gap-1.5 text-foreground font-semibold">
									<MessageCircle className="size-3.5 text-primary" />
									Chat Bubbles
								</span>
								<span className={CHIP}>
									Compound
								</span>
							</div>
							<div className="rounded-xl border border-border bg-background overflow-hidden flex flex-col">
								{/* Header */}
								<div className="px-4 py-3 border-b border-border flex items-center gap-3 bg-card/80 backdrop-blur-md">
									<div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-400 to-orange-300 shadow-inner" />
									<div>
										<h3 className="font-sans text-sm font-semibold text-foreground leading-none">
											Sarah Jenkins
										</h3>
										<span className="text-[11px] text-foreground/40">
											Online
										</span>
									</div>
								</div>

								{/* Chat Area */}
								<div className="p-4 flex flex-col space-y-1">
									<ChatBubble variant="received" layout="group-top">
										<ChatAvatar fallback="SJ" />
										<ChatMessage>
											Why does everyone pick this library for chat UIs?
										</ChatMessage>
									</ChatBubble>
									<ChatBubble variant="received" layout="group-bottom">
										<ChatAvatar fallback="SJ" />
										<ChatMessage>
											Every other kit made me hand-roll the bubble corners.
											<ChatTimestamp time="10:24 AM" />
										</ChatMessage>
									</ChatBubble>

									<div className="h-4" />

									<ChatBubble variant="sent" layout="group-top">
										<ChatAvatar fallback="ME" />
										<ChatMessage color="primary">
											It&apos;s compound: avatar, message, timestamp — compose
											them, no config objects.
										</ChatMessage>
									</ChatBubble>
									<ChatBubble variant="sent" layout="group-bottom">
										<ChatAvatar fallback="ME" />
										<ChatMessage color="primary">
											Grouping, read receipts and the pop-in animation are
											built in and theme-aware.
											<ChatTimestamp time="10:25 AM" status="read" />
										</ChatMessage>
									</ChatBubble>

									<div className="h-4" />

									<ChatBubble variant="received">
										<ChatAvatar fallback="SJ" />
										<ChatMessage className="px-0 py-0 bg-transparent border-0 shadow-none dark:bg-transparent">
											<ChatTypingIndicator />
										</ChatMessage>
									</ChatBubble>
								</div>

								{/* Input Mock */}
								<div className="p-4 bg-foreground/[0.03] border-t border-border">
									<div className="flex items-center gap-3 px-3 py-2 bg-card border border-border rounded-full shadow-sm">
										<ImageIcon className="w-5 h-5 text-foreground/40" />
										<span className="flex-1 text-[13px] text-foreground/40">
											Type a message...
										</span>
										<SmilePlus className="w-5 h-5 text-foreground/40" />
										<div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center ml-1">
											<Send className="w-3.5 h-3.5 text-primary-foreground -ml-0.5" />
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="showcase-card rounded-2xl border border-foreground/[0.06] bg-card p-2 overflow-hidden">
							<div className="px-3 py-2 border-b border-foreground/[0.06] flex items-center justify-between text-[14px] text-foreground/40 font-medium">
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
						className="flex flex-col gap-6">
						<div className="showcase-card rounded-2xl border border-foreground/[0.06] bg-card p-5 overflow-hidden">
							<div className="flex items-center justify-between mb-4">
								<span className="flex items-center gap-1.5 text-[14px] font-semibold text-foreground">
									<Layers className="size-3.5 text-primary" />
									3D Fanned Carousel
								</span>
								<span className={CHIP}>
									Interactive
								</span>
							</div>
							{/* The carousel lays out at a fixed 840px wide / 580px tall so the
							    fanned side cards fit, then is scaled to half so the whole fan
							    shows inside the column. */}
							<div className="relative h-[250px] md:h-[290px] overflow-hidden">
								<div className="absolute left-1/2 top-0 w-[840px] -translate-x-1/2 scale-50 origin-top">
									<ThreeDCarousel
										items={sampleCarouselItems}
										autoPlay={false}
									/>
								</div>
							</div>
						</div>

						<div className="showcase-card rounded-2xl border border-foreground/[0.06] bg-card p-5 overflow-hidden">
							<div className="flex items-center justify-between mb-4">
								<span className="flex items-center gap-1.5 text-[14px] font-semibold text-foreground">
									<FolderOpen className="size-3.5 text-primary" />
									Design Components Folder
								</span>
								<span className={CHIP}>
									Auto Loop
								</span>
							</div>
							{/* Same trick as the carousel above: the stage is sized by viewport
							    breakpoints (up to 960×700), so it is laid out at 840px wide and
							    scaled to half to fit the column. */}
							<div className="relative h-[290px] md:h-[330px] lg:h-[350px] overflow-hidden">
								<div className="absolute left-1/2 top-0 w-[840px] -translate-x-1/2 scale-50 origin-top">
									<DesignComponentsFolder disableLinks className="py-0 md:py-0" />
								</div>
							</div>
						</div>

						<div className="showcase-card rounded-2xl border border-foreground/[0.06] bg-card p-6 overflow-hidden flex flex-col items-center justify-center min-h-[220px]">
							<div className="w-full flex items-center justify-between text-[14px] font-medium mb-6">
								<span className="flex items-center gap-1.5 text-foreground font-semibold">
									<Compass className="size-3.5 text-primary" />
									Magnifying macOS Dock
								</span>
								<span className={CHIP}>
									Interactive Hover
								</span>
							</div>
							<div className="py-4 w-full flex justify-center items-center">
								<Dock
									items={sampleDockItems}
									baseSize={44}
									magnification={68}
									distance={130}
									containerHeight={84}
								/>
							</div>
						</div>
					</motion.div>

					{/* Column 3 */}
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="flex flex-col gap-6">
						<div className="showcase-card rounded-2xl border border-foreground/[0.06] bg-card p-5 overflow-hidden">
							<div className="flex items-center justify-between mb-4">
								<span className="flex items-center gap-1.5 text-[14px] font-semibold text-foreground">
									<FolderOpen className="size-3.5 text-primary" />
									Folder
								</span>
								<span className={CHIP}>
									Fan on Hover
								</span>
							</div>
							{/* Headroom above, not around: the fan lifts the file cards well
							    above the folder's top edge and the name tooltip sits above that. */}
							<div className="flex items-center justify-center pt-24 pb-4">
								<Folder
									files={sampleCaseFiles}
									label="Case files"
									icon={FileText}
									size={200}
								/>
							</div>
						</div>

						<div className="showcase-card rounded-2xl border border-foreground/[0.06] bg-card p-2 overflow-hidden">
							<div className="px-3 py-2 border-b border-foreground/[0.06] flex items-center justify-between text-[14px] text-foreground/40 font-medium">
								<span className="flex items-center gap-1.5 text-foreground font-semibold">
									<GripVertical className="size-3.5 text-primary" />
									Draggable Card List
								</span>
								<span className={CHIP}>
									Drag to Reorder
								</span>
							</div>
							<div className="p-3">
								<DraggableCardList variant="classic" items={sampleTasks} />
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
			className="py-12 md:py-16 border-y border-foreground/[0.06] bg-background relative overflow-hidden">
			{/* Background Subtle Ambient Lighting */}
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 rounded-[100%] blur-[120px] pointer-events-none mix-blend-screen" />

			{/* Subtle Grid overlay for texture */}
			<div className="absolute inset-0 bg-[linear-gradient(color-mix(in_oklab,var(--foreground)_2%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--foreground)_2%,transparent)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_40%,transparent_100%)]" />

			<div className={cn(SECTION_INNER, "relative z-10")}>
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
					className="text-center mb-10 md:mb-12">
					<h2 className={SECTION_H2}>
						Why Docs UI?
					</h2>
					<p className={cn(SECTION_SUB, "mx-auto")}>
						Engineered to explore unique interaction patterns—from 3D
						displacement hover effects to beautiful physics animations and
						scalable layouts.
					</p>
				</motion.div>

				{/* 2x2 Bento Grid - Scaled down for breathing room */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
					{/* Card 1: Components You Won't Find Anywhere */}
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
						className={cn("group flex flex-col p-6 md:p-8 rounded-2xl hover:border-primary/30 transition-all duration-700", CARD_SURFACE)}>
						<div className="mb-6">
							<h3 className={CARD_TITLE}>
								Components You Won&apos;t Find Anywhere
							</h3>
							<p className={cn(CARD_COPY, "max-w-sm")}>
								Unique interaction patterns like displacement hover effects,
								fluid animations, and cards that stand out from typical UI
								libraries.
							</p>
						</div>

						{/* Visual Block */}
						<div className="mt-auto flex justify-center items-center h-48 sm:h-60 perspective-[1200px] relative">
							<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

							<div className="w-[240px] h-[150px] sm:w-[280px] sm:h-[180px] rounded-2xl border border-foreground/[0.06] bg-gradient-to-b from-card to-foreground/[0.03] backdrop-blur-xl shadow-2xl relative transition-transform duration-700 ease-out group-hover:[transform:rotateX(18deg)_rotateY(-18deg)_scale(1.03)] flex flex-col items-center justify-center p-5 overflow-hidden transform-gpu ring-1 ring-foreground/5">
								<div className="absolute inset-0 bg-gradient-to-tr from-primary/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
								<div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none" />

								<div className="size-14 sm:size-16 rounded-full bg-background border border-primary/20 text-primary flex items-center justify-center mb-4 transition-transform duration-700 group-hover:translate-z-[30px] shadow-xl shadow-primary/20">
									<Layers className="size-6 sm:size-7" />
								</div>
								<p className="font-semibold text-[14px] transition-transform duration-700 group-hover:translate-z-[20px] text-foreground">
									Interactive Card
								</p>
								<p className="text-[10px] text-foreground/30 mt-1.5 transition-transform duration-700 group-hover:translate-z-[15px] font-semibold uppercase tracking-[0.12em]">
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
						className={cn("group flex flex-col p-6 md:p-8 rounded-2xl hover:border-primary/30 transition-all duration-700", CARD_SURFACE)}>
						<div className="mb-6">
							<h3 className={CARD_TITLE}>
								Built with Modern Frameworks
							</h3>
							<p className={cn(CARD_COPY, "max-w-sm")}>
								Designed to work seamlessly with Next.js, React, and Tailwind
								CSS. Engineered for rapid integration into real-world production
								projects.
							</p>
						</div>

						{/* Visual Block: Scaled Down Isometric Grid */}
						<div className="mt-auto flex justify-center items-center h-48 sm:h-60 perspective-[1000px]">
							<div
								className="grid grid-cols-3 gap-4 sm:gap-5 transition-transform duration-1000 ease-out group-hover:scale-[1.05]"
								style={{ transform: "rotateX(55deg) rotateZ(-40deg)" }}>
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
										className="size-14 sm:size-16 rounded-2xl bg-background/80 backdrop-blur-md border border-foreground/[0.08] shadow-[0_12px_24px_rgba(0,0,0,0.06)] flex items-center justify-center text-foreground/40 transition-all duration-700 ease-out hover:-translate-y-4 sm:hover:-translate-y-6 hover:shadow-[0_24px_40px_rgba(var(--primary-rgb),0.15)] hover:border-primary/50 hover:text-primary relative group/icon before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100"
										style={{ transitionDelay: `${idx * 40}ms` }}>
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
						className={cn("group flex flex-col p-6 md:p-8 rounded-2xl hover:border-primary/30 transition-all duration-700", CARD_SURFACE)}>
						<div className="mb-6">
							<h3 className={CARD_TITLE}>
								Open Source With Story
							</h3>
							<p className={cn(CARD_COPY, "max-w-sm")}>
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
									preserveAspectRatio="none">
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

								<div className="size-12 sm:size-14 rounded-2xl border border-foreground/[0.06] bg-background/50 backdrop-blur-md shadow-lg flex items-center justify-center group-hover:border-primary/40 group-hover:text-primary transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_12px_24px_rgba(var(--primary-rgb),0.1)] ring-1 ring-foreground/5">
									<Code2 className="size-5 sm:size-6 opacity-70 group-hover:opacity-100" />
								</div>

								<div className="size-16 sm:size-20 rounded-2xl border border-primary/50 bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-md text-primary shadow-[0_12px_24px_rgba(var(--primary-rgb),0.15)] flex items-center justify-center transition-all duration-700 group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_rgba(var(--primary-rgb),0.25)] group-hover:scale-110 relative before:absolute before:inset-0 before:rounded-2xl before:bg-white/10 before:opacity-0 hover:before:opacity-100">
									<GitPullRequest className="size-7 sm:size-8 relative z-10" />
								</div>

								<div className="size-12 sm:size-14 rounded-2xl border border-foreground/[0.06] bg-background/50 backdrop-blur-md shadow-lg flex items-center justify-center group-hover:border-primary/40 group-hover:text-primary transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_12px_24px_rgba(var(--primary-rgb),0.1)] ring-1 ring-foreground/5">
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
						className={cn("group flex flex-col p-6 md:p-8 rounded-2xl hover:border-primary/30 transition-all duration-700", CARD_SURFACE)}>
						<div className="mb-6">
							<h3 className={CARD_TITLE}>
								Build Landing Pages Faster
							</h3>
							<p className={cn(CARD_COPY, "max-w-sm")}>
								Launch polished interfaces in minutes using pre-built UI blocks
								designed for speed. Skip repetitive scaffolding and focus on
								shipping.
							</p>
						</div>

						{/* Visual Block: Scaled Down Skeletons */}
						<div className="mt-auto flex justify-center items-center h-48 sm:h-60 relative">
							<div className="w-full max-w-[280px] rounded-2xl border border-foreground/[0.06] p-4 sm:p-5 space-y-3 sm:space-y-4 bg-background/80 backdrop-blur-sm shadow-xl relative group-hover:border-primary/30 transition-all duration-700 overflow-hidden ring-1 ring-foreground/5">
								{/* Dark-mode aware shimmer effect */}
								<div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/5 to-transparent group-hover:animate-[shimmer_2s_infinite] z-0" />

								{/* Skeletons with proper light/dark contrast */}
								<div className="h-3 w-1/3 rounded-md bg-foreground/[0.08] relative z-10" />
								<div className="h-16 sm:h-20 w-full rounded-xl bg-foreground/[0.04] relative z-10" />
								<div className="flex gap-3 relative z-10">
									<div className="h-20 sm:h-24 flex-1 rounded-xl bg-foreground/[0.04]" />
									<div className="h-20 sm:h-24 flex-1 rounded-xl bg-foreground/[0.04]" />
								</div>

								<div className="absolute inset-0 bg-background/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center z-20">
									<div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-700 delay-100 ease-[0.16,1,0.3,1] px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-foreground text-background font-semibold tracking-[0.3px] text-[13px] shadow-xl flex items-center gap-2.5">
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
   SECTION 5.5: COMPONENT PREVIEW CARDS CATALOG
   ═══════════════════════════════════════════════ */

type PreviewCardItem = {
	title: string;
	countText: string;
	href: string;
	badge?: string;
	illustrationType:
		| "hero"
		| "pricing"
		| "chart"
		| "bento"
		| "dock"
		| "carousel"
		| "auth"
		| "chat"
		| "navbar"
		| "table"
		| "modal"
		| "stepper"
		| "card"
		| "counter"
		| "cart"
		| "item"
		| "resizable"
		| "scroll-area"
		| "masonry"
		| "qr"
		| "file-upload"
		| "tilted-card"
		| "memories-card"
		| "scroll-stack"
		| "magic-bento"
		| "network-graph"
		| "globe"
		| "footer"
		| "sidebar"
		| "marquee"
		| "dashboard"
		| "floating-contact"
		| "video-accordion"
		| "timeline"
		| "typography"
		| "animated-list"
		| "avatar"
		| "accordion"
		| "api-playground"
		| "breadcrumb"
		| "button"
		| "command"
		| "calendar"
		| "collapsible"
		| "context-menu"
		| "drawer"
		| "dialog"
		| "data-grid"
		| "data-table"
		| "date-picker"
		| "form"
		| "input"
		| "invoice"
		| "kbd"
		| "mails"
		| "map"
		| "menubar"
		| "otp-input"
		| "popover"
		| "progress"
		| "select"
		| "toast"
		| "toggle"
		| "tooltip"
		| "toggle-group"
		| "loader"
		| "skeleton"
		| "sonner"
		| "terminal"
		| "pagination"
		| "tabs"
		| "theme-switcher"
		| "wizard"
		| "data-maps"
		| "hero-videoplayer"
		| "verify-badge"
		| "mobile-mockup"
		| "half-stars"
		| "code-block";
};

const featuredHomepageComponents: PreviewCardItem[] = [
	{
		title: "Accordion",
		countText: "Collapsible Content",
		href: "/docs/nextjs/accordion",
		illustrationType: "accordion",
	},
	{
		title: "Breadcrumb",
		countText: "Path Navigation",
		href: "/docs/nextjs/breadcrumb",
		illustrationType: "breadcrumb",
	},
	{
		title: "Modern Buttons",
		countText: "5+ Action Styles",
		href: "/docs/nextjs/button",
		illustrationType: "button",
	},
	{
		title: "Counter",
		countText: "Animated Numbers",
		href: "/docs/nextjs/counter",
		illustrationType: "counter",
	},
	{
		title: "Calendar",
		countText: "Date Picker Grid",
		href: "/docs/nextjs/calendar",
		illustrationType: "calendar",
	},
	{
		title: "Data Table",
		countText: "Sortable Table",
		href: "/docs/nextjs/data-table",
		badge: "New",
		illustrationType: "data-table",
	},
	{
		title: "Map",
		countText: "Fleet Tracker Map",
		href: "/docs/nextjs/fleet-tracker",
		illustrationType: "map",
	},
	{
		title: "Loader",
		countText: "Spinners & Pulse",
		href: "/docs/nextjs/loader",
		illustrationType: "loader",
	},
	{
		title: "Dock",
		countText: "macOS Magnification",
		href: "/docs/nextjs/dock",
		badge: "New",
		illustrationType: "dock",
	},
	{
		title: "File Upload",
		countText: "Drag & Drop Motion",
		href: "/docs/nextjs/file-upload",
		illustrationType: "file-upload",
	},
	{
		title: "Network Graph",
		countText: "Node Graph Canvas",
		href: "/docs/nextjs/network-graph",
		badge: "New",
		illustrationType: "network-graph",
	},
	{
		title: "Navbar",
		countText: "Responsive Header",
		href: "/docs/nextjs/navbar",
		badge: "Core",
		illustrationType: "navbar",
	},
];

function CardHeaderMockup({ title }: { title: string }) {
	return (
		<div className="flex items-center justify-between border-b border-border/50 pb-1.5 mb-1.5 shrink-0">
			<div className="flex items-center gap-1">
				<span className="size-1.5 rounded-full bg-rose-500/80 inline-block" />
				<span className="size-1.5 rounded-full bg-amber-500/80 inline-block" />
				<span className="size-1.5 rounded-full bg-emerald-500/80 inline-block" />
			</div>
			<span className="text-[9px] font-mono text-muted-foreground/70 truncate max-w-[120px] font-semibold">
				{title.toLowerCase().replace(/\s+/g, "-")}.tsx
			</span>
			<div className="size-2 rounded-full bg-primary/40" />
		</div>
	);
}

function MiniatureIllustration({
	title,
	type,
}: {
	title: string;
	type: PreviewCardItem["illustrationType"];
}) {
	return (
		<div className="w-full h-full rounded-xl border border-border/80 bg-gradient-to-b from-card to-muted/30 p-2.5 flex flex-col justify-between overflow-hidden relative group-hover:border-primary/50 transition-colors">
			<CardHeaderMockup title={title} />

			{/* Realistic Mini UI Preview Content */}
			<div className="flex-1 flex flex-col justify-center items-center relative overflow-hidden">
				{type === "hero" && (
					<div className="w-full text-center space-y-1.5 px-1 my-auto">
						<span className="inline-block px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[8px] font-semibold border border-primary/20">
							Next.js 15
						</span>
						<div className="text-[11px] font-semibold tracking-tight text-foreground leading-tight">
							Build Next-Gen UI
						</div>
						<div className="flex justify-center gap-1 pt-0.5">
							<span className="px-2 py-0.5 rounded bg-primary text-primary-foreground text-[8px] font-semibold shadow-xs">
								Get Started
							</span>
							<span className="px-2 py-0.5 rounded border border-border text-[8px] font-semibold text-foreground">
								Docs
							</span>
						</div>
					</div>
				)}

				{type === "pricing" && (
					<div className="w-full flex flex-col justify-between my-auto space-y-1 px-0.5">
						{/* Monthly / Annual Pill Toggle */}
						<div className="mx-auto px-1.5 py-0.5 rounded-full bg-muted border border-border/60 flex items-center gap-0.5 text-[6px]">
							<span className="font-semibold text-primary px-1 rounded-full bg-background shadow-2xs">
								Monthly
							</span>
							<span className="text-muted-foreground font-semibold">
								Annual
							</span>
						</div>
						{/* 3 Cards Showcase */}
						<div className="w-full flex items-center justify-between gap-1 pt-0.5">
							<div className="flex-1 p-1 rounded-md border border-border/80 bg-background text-center space-y-0.5 min-w-0">
								<div className="text-[6px] font-semibold text-muted-foreground truncate">
									Free
								</div>
								<div className="text-[8px] font-semibold text-foreground">$0</div>
								<div className="h-1.5 w-full rounded bg-muted text-[5px] font-semibold text-muted-foreground flex items-center justify-center">
									Free
								</div>
							</div>
							<div className="flex-1 p-1 rounded-md border border-primary/30 bg-primary/10 text-center space-y-0.5 shadow-2xs relative min-w-0">
								<span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[4px] font-semibold px-0.5 rounded bg-primary text-primary-foreground whitespace-nowrap">
									HOT
								</span>
								<div className="text-[6px] font-semibold text-primary truncate">
									Pro
								</div>
								<div className="text-[8px] font-semibold text-primary">$29</div>
								<div className="h-1.5 w-full rounded bg-primary text-[5px] font-semibold text-primary-foreground flex items-center justify-center shadow-2xs">
									Pro
								</div>
							</div>
							<div className="flex-1 p-1 rounded-md border border-border/80 bg-background text-center space-y-0.5 min-w-0">
								<div className="text-[6px] font-semibold text-muted-foreground truncate">
									Enterprise
								</div>
								<div className="text-[8px] font-semibold text-foreground">$99</div>
								<div className="h-1.5 w-full rounded bg-muted text-[5px] font-semibold text-muted-foreground flex items-center justify-center">
									VIP
								</div>
							</div>
						</div>
					</div>
				)}

				{type === "chart" && (
					<div className="w-full h-full flex flex-col justify-between py-1 relative">
						<div className="flex justify-between items-center text-[7.5px] font-semibold text-muted-foreground px-1 z-10">
							<span>Revenue Stream</span>
							<span className="text-emerald-500 font-extrabold">+34.2%</span>
						</div>
						{/* SVG Curved Area Line Chart */}
						<div className="w-full h-12 relative my-auto">
							<svg
								className="w-full h-full overflow-visible"
								viewBox="0 0 100 40">
								<defs>
									<linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
										<stop
											offset="0%"
											stopColor="var(--primary)"
											stopOpacity="0.4"
										/>
										<stop
											offset="100%"
											stopColor="var(--primary)"
											stopOpacity="0.0"
										/>
									</linearGradient>
								</defs>
								<path
									d="M 0 35 Q 25 5, 50 20 T 100 5 L 100 40 L 0 40 Z"
									fill="url(#chartGrad)"
								/>
								<path
									d="M 0 35 Q 25 5, 50 20 T 100 5"
									fill="none"
									stroke="var(--primary)"
									strokeWidth="2"
								/>
								<circle
									cx="50"
									cy="20"
									r="2.5"
									className="fill-primary stroke-background stroke-2"
								/>
								<circle
									cx="100"
									cy="5"
									r="2.5"
									className="fill-emerald-500 stroke-background stroke-2"
								/>
							</svg>
						</div>
					</div>
				)}

				{type === "dock" && (
					<div className="w-full flex items-center justify-center my-auto">
						<div className="px-2.5 py-1.5 rounded-2xl bg-background border border-border/80 shadow-md flex items-end gap-1.5">
							<div className="size-4 rounded-lg bg-rose-500/80 flex items-center justify-center text-[7px] text-white font-semibold">
								A
							</div>
							<div className="size-4 rounded-lg bg-amber-500/80 flex items-center justify-center text-[7px] text-white font-semibold">
								B
							</div>
							<div className="size-5 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-[9px] font-semibold shadow-sm -translate-y-1">
								★
							</div>
							<div className="size-4 rounded-lg bg-emerald-500/80 flex items-center justify-center text-[7px] text-white font-semibold">
								C
							</div>
						</div>
					</div>
				)}

				{type === "navbar" && (
					<div className="w-full my-auto px-0.5">
						<div className="w-full p-1.5 rounded-xl bg-background border border-border/80 flex items-center justify-between shadow-xs px-2.5">
							<div className="flex items-center gap-1.5 text-[8.5px] font-semibold text-foreground">
								<span className="size-2 rounded bg-primary" />
								<span>DocsUI</span>
							</div>
							<div className="flex items-center gap-2 text-[7px] font-semibold text-muted-foreground">
								<span>Features</span>
								<span>Docs</span>
								<span className="px-2 py-0.5 rounded-md bg-primary text-primary-foreground font-extrabold text-[6.5px]">
									Login
								</span>
							</div>
						</div>
					</div>
				)}

				{type === "table" && (
					<div className="w-full space-y-1 my-auto text-[8px] font-mono">
						<div className="flex items-center justify-between border-b border-border/60 pb-0.5 font-semibold text-primary">
							<span>Name</span>
							<span>Status</span>
						</div>
						<div className="flex items-center justify-between text-foreground">
							<span>Button.tsx</span>
							<span className="text-emerald-500 font-semibold">Ready</span>
						</div>
						<div className="flex items-center justify-between text-foreground">
							<span>Card.tsx</span>
							<span className="text-emerald-500 font-semibold">Ready</span>
						</div>
					</div>
				)}

				{type === "modal" && (
					<div className="w-full flex items-center justify-center my-auto">
						<div className="w-4/5 p-2 rounded-xl bg-background border border-border shadow-lg space-y-1.5">
							<div className="flex justify-between items-center border-b border-border/40 pb-0.5">
								<span className="text-[9px] font-semibold text-foreground">
									Modal Dialog
								</span>
								<span className="text-[8px] text-muted-foreground">✕</span>
							</div>
							<div className="text-[7px] text-muted-foreground">
								Confirm action step?
							</div>
							<div className="flex justify-end gap-1 pt-0.5">
								<span className="px-1.5 py-0.5 rounded bg-muted text-[7px] font-semibold">
									Cancel
								</span>
								<span className="px-1.5 py-0.5 rounded bg-primary text-primary-foreground text-[7px] font-semibold">
									Confirm
								</span>
							</div>
						</div>
					</div>
				)}

				{type === "stepper" && (
					<div className="w-full space-y-2 my-auto px-1">
						<div className="flex items-center justify-between">
							<span className="size-3.5 rounded-full bg-primary text-[7px] text-primary-foreground font-semibold flex items-center justify-center">
								1
							</span>
							<div className="h-0.5 flex-1 bg-primary mx-1" />
							<span className="size-3.5 rounded-full bg-primary text-[7px] text-primary-foreground font-semibold flex items-center justify-center">
								2
							</span>
							<div className="h-0.5 flex-1 bg-muted-foreground/30 mx-1" />
							<span className="size-3.5 rounded-full bg-muted border border-border text-[7px] text-muted-foreground font-semibold flex items-center justify-center">
								3
							</span>
						</div>
						<div className="text-center text-[8px] font-semibold text-foreground">
							Step 2: Configuration
						</div>
					</div>
				)}

				{type === "chat" && (
					<div className="w-full space-y-1.5 my-auto text-[7px]">
						<div className="p-1 rounded-lg bg-muted text-foreground max-w-[80%]">
							Hello! How can I help?
						</div>
						<div className="p-1 rounded-lg bg-primary text-primary-foreground max-w-[80%] ml-auto font-medium">
							Show component docs!
						</div>
					</div>
				)}

				{type === "auth" && (
					<div className="w-full max-w-[130px] p-2 rounded-xl bg-background border border-border shadow-xs space-y-1.5 text-center my-auto">
						<div className="text-[8px] font-semibold text-foreground">Sign In</div>
						<div className="h-3 w-full bg-muted border border-border rounded flex items-center px-1 text-[7px] text-muted-foreground">
							email@app.com
						</div>
						<div className="h-3 w-full bg-primary text-primary-foreground font-semibold rounded flex items-center justify-center text-[7px]">
							Submit
						</div>
					</div>
				)}

				{type === "carousel" && (
					<div className="w-full flex items-center justify-between gap-1 my-auto px-0.5">
						<div className="size-4 rounded-full bg-muted border border-border text-[7px] font-semibold text-muted-foreground flex items-center justify-center shrink-0">
							‹
						</div>
						<div className="flex-1 h-14 rounded-xl bg-background border border-primary/50 p-1.5 shadow-sm flex flex-col justify-between items-center text-center">
							<span className="text-[7.5px] font-extrabold text-primary">
								Slide 02
							</span>
							<div className="flex gap-1">
								<span className="size-1 rounded-full bg-primary/40" />
								<span className="size-1 rounded-full bg-primary" />
								<span className="size-1 rounded-full bg-primary/40" />
							</div>
						</div>
						<div className="size-4 rounded-full bg-muted border border-border text-[7px] font-semibold text-muted-foreground flex items-center justify-center shrink-0">
							›
						</div>
					</div>
				)}

				{type === "card" && (
					<div className="w-full max-w-[130px] p-2 rounded-xl bg-background border border-border/80 shadow-xs space-y-1.5 my-auto">
						<div className="h-7 w-full bg-primary/10 rounded-lg border border-primary/20 flex items-center justify-center text-[8px] font-semibold text-primary">
							Card View
						</div>
						<div className="h-1.5 w-3/4 bg-foreground/80 rounded" />
						<div className="h-1 w-1/2 bg-muted-foreground/40 rounded" />
					</div>
				)}

				{type === "counter" && (
					<div className="w-full flex items-center justify-center my-auto">
						<div className="px-3 py-2 rounded-xl bg-background border border-border shadow-xs flex items-center gap-2">
							<span className="size-4 rounded bg-muted border border-border font-semibold text-[9px] flex items-center justify-center text-foreground">
								-
							</span>
							<span className="text-sm font-semibold text-primary px-1">99+</span>
							<span className="size-4 rounded bg-primary text-primary-foreground font-semibold text-[9px] flex items-center justify-center">
								+
							</span>
						</div>
					</div>
				)}

				{type === "cart" && (
					<div className="w-full max-w-[130px] p-2 rounded-xl bg-background border border-border shadow-xs space-y-1.5 my-auto text-[7px]">
						<div className="flex justify-between items-center font-semibold text-foreground border-b border-border pb-0.5">
							<span>Shopping Cart</span>
							<span className="text-primary">2 Items</span>
						</div>
						<div className="flex justify-between items-center text-muted-foreground">
							<span>Next UI Kit</span>
							<span className="font-semibold text-foreground">$49</span>
						</div>
						<div className="h-3 w-full bg-primary text-primary-foreground font-semibold rounded flex items-center justify-center text-[7px]">
							Checkout
						</div>
					</div>
				)}

				{type === "item" && (
					<div className="w-full space-y-1.5 my-auto px-1">
						<div className="p-1.5 rounded-lg bg-background border border-border flex items-center justify-between shadow-xs">
							<div className="flex items-center gap-1.5">
								<span className="size-2 rounded-full bg-primary" />
								<span className="text-[8px] font-semibold text-foreground">
									Item Component
								</span>
							</div>
							<span className="text-[7px] text-muted-foreground">→</span>
						</div>
					</div>
				)}

				{type === "resizable" && (
					<div className="w-full h-full flex gap-1.5 p-1 my-auto">
						<div className="w-1/2 h-full rounded-lg bg-background border border-border p-1 flex flex-col justify-center items-center">
							<span className="text-[7px] font-semibold text-muted-foreground">
								Left
							</span>
						</div>
						<div className="w-1 h-full rounded bg-primary/40 my-auto cursor-col-resize" />
						<div className="w-1/2 h-full rounded-lg bg-background border border-border p-1 flex flex-col justify-center items-center">
							<span className="text-[7px] font-semibold text-muted-foreground">
								Right
							</span>
						</div>
					</div>
				)}

				{type === "scroll-area" && (
					<div className="w-full h-full p-1.5 rounded-lg bg-background border border-border flex justify-between my-auto relative">
						<div className="space-y-1 text-[7px] text-foreground">
							<div className="font-semibold text-primary">Scroll Area</div>
							<div className="text-muted-foreground">Row item 1</div>
							<div className="text-muted-foreground">Row item 2</div>
						</div>
						<div className="w-1 h-4/5 bg-primary/60 rounded-full my-auto" />
					</div>
				)}

				{type === "masonry" && (
					<div className="w-full grid grid-cols-3 gap-1 my-auto px-0.5">
						<div className="space-y-1">
							<div className="h-10 rounded-lg bg-primary/20 border border-primary/40 p-1 flex items-end">
								<span className="text-[5px] font-semibold text-primary">#01</span>
							</div>
							<div className="h-6 rounded-lg bg-muted border border-border" />
						</div>
						<div className="space-y-1">
							<div className="h-6 rounded-lg bg-muted border border-border" />
							<div className="h-11 rounded-lg bg-emerald-500/20 border border-emerald-500/40 p-1 flex items-end">
								<span className="text-[5px] font-semibold text-emerald-500">
									#02
								</span>
							</div>
						</div>
						<div className="space-y-1">
							<div className="h-12 rounded-lg bg-primary/10 border border-primary/20 p-1 flex items-end">
								<span className="text-[5px] font-semibold text-primary">#03</span>
							</div>
						</div>
					</div>
				)}

				{type === "qr" && (
					<div className="w-full flex items-center justify-center my-auto">
						<div className="size-14 rounded-xl bg-background border border-border p-1.5 shadow-md flex flex-col justify-between items-center relative">
							{/* Realistic QR Code Matrix */}
							<div className="w-full h-full grid grid-cols-4 gap-0.5">
								<div className="bg-foreground rounded-xs" />
								<div className="bg-foreground rounded-xs" />
								<div className="bg-primary rounded-xs" />
								<div className="bg-foreground rounded-xs" />
								<div className="bg-foreground rounded-xs" />
								<div className="bg-background border border-foreground rounded-xs" />
								<div className="bg-foreground rounded-xs" />
								<div className="bg-primary rounded-xs" />
								<div className="bg-primary rounded-xs" />
								<div className="bg-foreground rounded-xs" />
								<div className="bg-foreground rounded-xs" />
								<div className="bg-foreground rounded-xs" />
								<div className="bg-foreground rounded-xs" />
								<div className="bg-primary rounded-xs" />
								<div className="bg-foreground rounded-xs" />
								<div className="bg-foreground rounded-xs" />
							</div>
						</div>
					</div>
				)}

				{type === "file-upload" && (
					<div className="w-full max-w-[130px] p-2 rounded-xl bg-background border border-dashed border-primary/60 text-center space-y-1 my-auto">
						<span className="text-xs text-primary font-semibold">☁</span>
						<div className="text-[8px] font-semibold text-foreground">
							Drag & Drop File
						</div>
					</div>
				)}

				{type === "tilted-card" && (
					<div className="w-full flex items-center justify-center my-auto">
						<div className="w-20 h-12 rounded-xl bg-background border border-primary/30 shadow-lg rotate-6 hover:rotate-0 transition-transform p-1.5 text-center flex flex-col justify-center">
							<span className="text-[8px] font-extrabold text-primary">
								3D Tilted Card
							</span>
						</div>
					</div>
				)}

				{type === "memories-card" && (
					<div className="w-full flex items-center justify-center my-auto relative h-12">
						<div className="w-16 h-10 rounded-lg bg-muted/60 border border-border absolute -top-1 rotate-3" />
						<div className="w-16 h-10 rounded-lg bg-background border border-primary/30 shadow-md z-10 p-1 text-center flex flex-col justify-center">
							<span className="text-[7px] font-semibold text-primary">
								Memories
							</span>
						</div>
					</div>
				)}

				{type === "scroll-stack" && (
					<div className="w-full flex flex-col items-center gap-1 my-auto">
						<div className="w-20 h-3 rounded-t-lg bg-muted border border-border" />
						<div className="w-22 h-6 rounded-lg bg-background border border-primary/30 shadow-xs p-1 text-center text-[7px] font-semibold text-primary">
							Scroll Stack Card
						</div>
					</div>
				)}

				{type === "magic-bento" && (
					<div className="w-full grid grid-cols-2 gap-1 my-auto px-1">
						<div className="h-10 rounded-lg bg-primary/20 border border-primary/40 p-1 flex flex-col justify-between">
							<span className="text-[7px] font-semibold text-primary">Glow</span>
						</div>
						<div className="h-10 rounded-lg bg-card border border-border p-1 flex flex-col justify-between">
							<span className="text-[7px] font-semibold text-foreground">Tilt</span>
						</div>
					</div>
				)}

				{type === "network-graph" && (
					<div className="w-full h-full relative flex items-center justify-center p-1 my-auto overflow-hidden">
						{/* Layer 2 Outer Orbital Circle */}
						<div className="size-24 rounded-full border border-dashed border-primary/25 absolute flex items-center justify-center pointer-events-none">
							{/* Outer Orbit Nodes */}
							<div className="absolute -top-1.5 left-1/2 -translate-x-1/2 size-3 rounded-full bg-emerald-500 text-[5px] font-semibold text-white flex items-center justify-center shadow-xs">
								A
							</div>
							<div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 size-3 rounded-full bg-amber-500 text-[5px] font-semibold text-white flex items-center justify-center shadow-xs">
								B
							</div>
							<div className="absolute top-1/2 -left-1.5 -translate-y-1/2 size-3 rounded-full bg-indigo-500 text-[5px] font-semibold text-white flex items-center justify-center shadow-xs">
								C
							</div>
							<div className="absolute top-1/2 -right-1.5 -translate-y-1/2 size-3 rounded-full bg-sky-500 text-[5px] font-semibold text-white flex items-center justify-center shadow-xs">
								D
							</div>
						</div>

						{/* Layer 1 Inner Orbital Circle */}
						<div className="size-14 rounded-full border border-primary/40 bg-primary/5 absolute flex items-center justify-center pointer-events-none">
							<div className="absolute top-0 right-1 size-2.5 rounded-full bg-primary/70" />
							<div className="absolute bottom-0 left-1 size-2.5 rounded-full bg-primary/70" />
						</div>

						{/* Central Node */}
						<div className="size-6 rounded-full bg-primary text-primary-foreground font-semibold text-[7.5px] flex items-center justify-center shadow-md z-10 border-2 border-background ring-2 ring-primary/20">
							Core
						</div>
					</div>
				)}

				{type === "sidebar" && (
					<div className="w-full h-full p-1 flex gap-1.5 my-auto overflow-hidden">
						{/* Sidebar Navigation */}
						<div className="w-2/5 h-full rounded-lg bg-background border border-border/80 p-1 flex flex-col justify-between shadow-2xs">
							<div className="space-y-1">
								<div className="flex items-center gap-1 border-b border-border/40 pb-1">
									<span className="size-2 rounded bg-primary" />
									<span className="text-[7px] font-extrabold text-foreground">
										Dashboard
									</span>
								</div>
								<div className="space-y-0.5 pt-0.5">
									<div className="px-1 py-0.5 rounded bg-primary/10 text-primary text-[6px] font-semibold flex items-center justify-between">
										<span>Overview</span>
										<span className="size-1 rounded-full bg-primary" />
									</div>
									<div className="px-1 py-0.5 text-muted-foreground text-[6px] font-medium flex items-center justify-between">
										<span>Analytics</span>
									</div>
									<div className="px-1 py-0.5 text-muted-foreground text-[6px] font-medium flex items-center justify-between">
										<span>Settings</span>
									</div>
								</div>
							</div>
							<div className="px-1 py-0.5 rounded bg-muted text-[5.5px] font-mono text-muted-foreground">
								Admin Pro
							</div>
						</div>
						{/* Main Content App Shell */}
						<div className="flex-1 h-full rounded-lg border border-border/60 bg-card p-1.5 flex flex-col justify-between space-y-1">
							<div className="flex items-center justify-between">
								<div className="h-1.5 w-1/2 rounded bg-foreground/80 font-semibold" />
								<div className="size-2 rounded-full bg-primary/40" />
							</div>
							<div className="grid grid-cols-2 gap-1 my-auto">
								<div className="h-5 rounded bg-muted/60 p-1 flex flex-col justify-between">
									<div className="h-1 w-2/3 bg-muted-foreground/40 rounded" />
									<div className="h-1.5 w-1/2 bg-primary rounded" />
								</div>
								<div className="h-5 rounded bg-muted/60 p-1 flex flex-col justify-between">
									<div className="h-1 w-2/3 bg-muted-foreground/40 rounded" />
									<div className="h-1.5 w-1/2 bg-emerald-500 rounded" />
								</div>
							</div>
						</div>
					</div>
				)}

				{type === "dashboard" && (
					<div className="w-full h-full p-1 flex flex-col justify-between my-auto space-y-1 overflow-hidden">
						{/* Top Stat Widgets */}
						<div className="grid grid-cols-3 gap-1">
							<div className="p-1 rounded-md bg-background border border-border/80 text-center space-y-0.5">
								<div className="text-[5.5px] font-semibold text-muted-foreground">
									Tickets
								</div>
								<div className="text-[8px] font-semibold text-foreground">
									1,240
								</div>
							</div>
							<div className="p-1 rounded-md bg-primary/10 border border-primary/20 text-center space-y-0.5">
								<div className="text-[5.5px] font-semibold text-primary">
									Resolved
								</div>
								<div className="text-[8px] font-semibold text-primary">98%</div>
							</div>
							<div className="p-1 rounded-md bg-background border border-border/80 text-center space-y-0.5">
								<div className="text-[5.5px] font-semibold text-muted-foreground">
									Avg Time
								</div>
								<div className="text-[8px] font-semibold text-emerald-500">
									12m
								</div>
							</div>
						</div>
						{/* Support Feed / Chart Area */}
						<div className="w-full p-1 rounded-lg bg-background border border-border flex items-center justify-between text-[6px]">
							<div className="space-y-0.5">
								<div className="font-semibold text-foreground">
									Active Customer Queue
								</div>
								<div className="text-[5.5px] text-muted-foreground">
									14 Agent Agents Online
								</div>
							</div>
							<span className="px-1.5 py-0.5 rounded bg-emerald-500 text-white font-semibold text-[5.5px]">
								Live
							</span>
						</div>
					</div>
				)}

				{type === "marquee" && (
					<div className="w-full flex flex-col justify-between my-auto space-y-2 px-1 relative overflow-hidden">
						<div className="text-center text-[7px] font-semibold text-muted-foreground uppercase tracking-widest">
							Trusted by 500+ Companies
						</div>
						{/* Infinite Horizontal Logo Ticker Strip */}
						<div className="w-full flex items-center justify-between gap-1.5 py-1 px-1 rounded-xl bg-background border border-border/80 relative shadow-2xs">
							<div className="px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20 text-[7px] font-extrabold text-primary flex items-center gap-1">
								<span className="size-1.5 rounded-full bg-primary" /> React
							</div>
							<div className="px-1.5 py-0.5 rounded bg-muted border border-border/60 text-[7px] font-semibold text-foreground flex items-center gap-1">
								<span className="size-1.5 rounded-full bg-sky-500" /> Next.js
							</div>
							<div className="px-1.5 py-0.5 rounded bg-muted border border-border/60 text-[7px] font-semibold text-foreground flex items-center gap-1">
								<span className="size-1.5 rounded-full bg-indigo-500" />{" "}
								Tailwind
							</div>
						</div>
					</div>
				)}

				{type === "floating-contact" && (
					<div className="w-full h-full relative flex flex-col justify-end items-end p-1.5 my-auto overflow-hidden">
						{/* Single Chat Popup Window Card */}
						<div className="w-22 p-1 mb-1 rounded-lg bg-background border border-border shadow-xs space-y-0.5 text-[5.5px]">
							<div className="flex items-center gap-1 font-semibold text-foreground border-b border-border/40 pb-0.5">
								<span className="size-1 rounded-full bg-emerald-500" />
								<span>Support</span>
							</div>
							<div className="p-0.5 rounded bg-muted text-muted-foreground truncate">
								Help Chat
							</div>
						</div>
						{/* Floating Trigger FAB Button */}
						<div className="size-5 rounded-full bg-primary text-primary-foreground font-semibold text-[9px] flex items-center justify-center shadow-xs border border-background ring-1 ring-primary/20 shrink-0">
							💬
						</div>
					</div>
				)}

				{type === "video-accordion" && (
					<div className="w-full h-full flex gap-1 p-1 my-auto overflow-hidden">
						{/* Active Expanded Video Panel */}
						<div className="flex-[2] h-full rounded-lg bg-primary/10 border border-primary/40 p-1 flex flex-col justify-between relative shadow-xs">
							<span className="text-[5.5px] font-extrabold text-primary px-1 py-0.2 rounded bg-background border border-primary/20 self-start">
								Active Stream
							</span>
							<div className="size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-[7px] mx-auto shadow-md">
								▶
							</div>
							<div className="h-1 w-3/4 bg-primary/60 rounded" />
						</div>
						{/* Collapsed Video Panels */}
						<div className="w-4 h-full rounded-lg bg-muted/60 border border-border flex flex-col items-center justify-center">
							<span className="text-[6px] text-muted-foreground font-semibold">
								▶
							</span>
						</div>
						<div className="w-4 h-full rounded-lg bg-muted/60 border border-border flex flex-col items-center justify-center">
							<span className="text-[6px] text-muted-foreground font-semibold">
								▶
							</span>
						</div>
					</div>
				)}

				{type === "timeline" && (
					<div className="w-full h-full p-1.5 flex flex-col justify-between my-auto relative overflow-hidden">
						{/* Vertical Connecting Line */}
						<div className="absolute left-[13px] top-2 bottom-2 w-0.5 bg-border/80" />

						{/* Timeline Event Node 1 (Active) */}
						<div className="flex items-center gap-2 relative z-10">
							<div className="size-2.5 rounded-full bg-primary ring-2 ring-primary/20 flex items-center justify-center shrink-0">
								<span className="size-1 rounded-full bg-primary-foreground" />
							</div>
							<div className="flex-1 p-1 rounded-lg bg-background border border-primary/40 shadow-2xs text-[6px]">
								<div className="font-extrabold text-primary flex justify-between">
									<span>v2.0 Released</span>
									<span className="text-[5px] text-muted-foreground">
										Today
									</span>
								</div>
							</div>
						</div>

						{/* Timeline Event Node 2 */}
						<div className="flex items-center gap-2 relative z-10">
							<div className="size-2.5 rounded-full bg-muted border border-border flex items-center justify-center shrink-0">
								<span className="size-1 rounded-full bg-muted-foreground/60" />
							</div>
							<div className="flex-1 p-1 rounded-lg bg-background border border-border/70 text-[6px]">
								<div className="font-semibold text-foreground flex justify-between">
									<span>Beta Testing</span>
									<span className="text-[5px] text-muted-foreground">
										Yesterday
									</span>
								</div>
							</div>
						</div>
					</div>
				)}

				{type === "typography" && (
					<div className="w-full flex flex-col justify-between my-auto space-y-1 px-1">
						<div className="text-xs font-semibold tracking-tight text-foreground border-b border-border/40 pb-0.5">
							H1. Heading Text
						</div>
						<div className="text-[8px] font-semibold text-primary">
							H2. Subtitle Paragraph
						</div>
						<div className="text-[6.5px] text-muted-foreground leading-tight">
							Flexible & accessible type system tokens.
						</div>
					</div>
				)}

				{type === "animated-list" && (
					<div className="w-full space-y-1 my-auto px-1">
						<div className="p-1 rounded-md bg-background border border-primary/50 shadow-2xs flex items-center justify-between text-[6.5px] translate-x-1 transition-transform">
							<div className="flex items-center gap-1">
								<span className="size-1.5 rounded-full bg-emerald-500" />
								<span className="font-extrabold text-foreground">
									New Order #108
								</span>
							</div>
							<span className="text-[5.5px] font-semibold text-primary">
								Just now
							</span>
						</div>
						<div className="p-1 rounded-md bg-background border border-border text-[6.5px] flex items-center justify-between opacity-80">
							<div className="flex items-center gap-1">
								<span className="size-1.5 rounded-full bg-sky-500" />
								<span className="font-semibold text-foreground">
									User Signed Up
								</span>
							</div>
							<span className="text-[5.5px] text-muted-foreground">2m ago</span>
						</div>
					</div>
				)}

				{type === "accordion" && (
					<div className="w-full space-y-1 my-auto px-0.5 text-[7px]">
						<div className="p-1.5 rounded-lg bg-background border border-primary/50 shadow-2xs space-y-1">
							<div className="flex justify-between items-center font-extrabold text-primary">
								<span>Is it accessible?</span>
								<span className="text-[8px]">▲</span>
							</div>
							<div className="text-[6px] text-muted-foreground border-t border-border/40 pt-1">
								Yes. Adheres to WAI-ARIA standards.
							</div>
						</div>
						<div className="p-1 rounded-lg bg-muted/40 border border-border flex justify-between items-center font-semibold text-foreground">
							<span>Is it styled?</span>
							<span className="text-[8px] text-muted-foreground">▼</span>
						</div>
					</div>
				)}

				{type === "api-playground" && (
					<div className="w-full p-1.5 rounded-lg bg-background border border-border shadow-2xs space-y-1 my-auto text-[6.5px] font-mono">
						<div className="flex items-center justify-between border-b border-border/40 pb-0.5">
							<span className="px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-500 font-extrabold text-[5.5px]">
								GET
							</span>
							<span className="text-muted-foreground font-semibold">
								/api/v1/users
							</span>
						</div>
						<div className="flex items-center justify-between text-foreground">
							<span className="text-primary font-semibold">Status: 200 OK</span>
							<span className="px-1 rounded bg-primary text-primary-foreground font-semibold text-[5.5px]">
								Send
							</span>
						</div>
					</div>
				)}

				{type === "breadcrumb" && (
					<div className="w-full flex items-center justify-center my-auto">
						<div className="px-2 py-1 rounded-lg bg-background border border-border shadow-2xs flex items-center gap-1 text-[7px] font-semibold">
							<span className="text-muted-foreground">Docs</span>
							<span className="text-muted-foreground/60">/</span>
							<span className="text-muted-foreground">Components</span>
							<span className="text-muted-foreground/60">/</span>
							<span className="text-primary font-extrabold">Breadcrumb</span>
						</div>
					</div>
				)}

				{type === "button" && (
					<div className="w-full p-2 rounded-xl bg-card border border-border/80 my-auto text-[6.5px] space-y-1.5">
						{/* Top Row: Primary + Secondary + Outline */}
						<div className="flex items-center justify-center gap-1.5 flex-wrap">
							<div className="px-2 py-1 rounded-lg bg-primary text-primary-foreground text-[6.5px] font-extrabold shadow-2xs flex items-center gap-1 hover:bg-primary/90 cursor-pointer">
								<span>Deploy</span>
								<span className="text-[5.5px]">🚀</span>
							</div>
							<div className="px-2 py-1 rounded-lg bg-secondary text-secondary-foreground text-[6.5px] font-semibold shadow-2xs flex items-center gap-1 border border-border/60 cursor-pointer">
								<span>Secondary</span>
							</div>
							<div className="px-2 py-1 rounded-lg border border-border bg-background text-[6.5px] font-semibold text-foreground hover:bg-muted cursor-pointer">
								Outline
							</div>
						</div>

						{/* Bottom Row: Destructive + Loading + Icon Only */}
						<div className="flex items-center justify-center gap-1.5 flex-wrap">
							<div className="px-2 py-0.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-500 text-[6px] font-semibold flex items-center gap-1 cursor-pointer">
								<span>Delete</span>
								<span className="text-[5.5px]">🗑</span>
							</div>
							<div className="px-2 py-0.5 rounded-lg bg-primary/20 text-primary text-[6px] font-extrabold flex items-center gap-1 cursor-pointer">
								<span className="size-2 rounded-full border border-primary/30 border-t-transparent animate-spin" />
								<span>Loading...</span>
							</div>
							<div className="size-5 rounded-lg bg-muted border border-border flex items-center justify-center text-[7px] text-foreground font-extrabold shadow-2xs cursor-pointer">
								★
							</div>
						</div>
					</div>
				)}

				{type === "command" && (
					<div className="w-full p-1.5 rounded-xl bg-background border border-border shadow-md space-y-1 my-auto text-[6.5px]">
						<div className="flex items-center gap-1 border-b border-border/40 pb-1 px-1">
							<span className="text-[7.5px] text-primary">🔍</span>
							<span className="font-semibold text-foreground">Search docs...</span>
							<span className="ml-auto text-[5.5px] px-1 bg-muted rounded border border-border text-muted-foreground">
								⌘K
							</span>
						</div>
						<div className="space-y-0.5">
							<div className="px-1 py-0.5 rounded bg-primary/10 text-primary font-semibold flex justify-between">
								<span>&gt; Components</span>
								<span>Enter</span>
							</div>
						</div>
					</div>
				)}

				{type === "calendar" && (
					<div className="w-full p-2 rounded-xl bg-background border-y border-border/80 space-y-1.5 my-auto text-[6.5px]">
						{/* Top Toolbar: Selected Date Badge + Year Quick Select */}
						<div className="flex items-center justify-between border-b border-border/40 pb-1 px-0.5">
							<div className="flex items-center gap-1">
								<span className="size-1.5 rounded-full bg-primary animate-pulse" />
								<span className="font-extrabold text-[7.5px] text-foreground">
									August 2026
								</span>
							</div>
							<div className="flex items-center gap-0.5 text-muted-foreground text-[6px]">
								<span className="size-3.5 rounded-md bg-muted/60 border border-border flex items-center justify-center cursor-pointer hover:bg-primary hover:text-primary-foreground font-semibold">
									‹
								</span>
								<span className="size-3.5 rounded-md bg-muted/60 border border-border flex items-center justify-center cursor-pointer hover:bg-primary hover:text-primary-foreground font-semibold">
									›
								</span>
							</div>
						</div>

						{/* Days of Week */}
						<div className="grid grid-cols-7 gap-0.5 font-extrabold text-muted-foreground/70 text-center text-[5.5px] uppercase">
							<span>Su</span>
							<span>Mo</span>
							<span>Tu</span>
							<span>We</span>
							<span>Th</span>
							<span>Fr</span>
							<span>Sa</span>
						</div>

						{/* Full Month Calendar Matrix */}
						<div className="grid grid-cols-7 gap-0.5 text-center font-semibold text-[6px] items-center">
							<span className="text-muted-foreground/30 py-0.5">26</span>
							<span className="text-muted-foreground/30 py-0.5">27</span>
							<span className="text-muted-foreground/30 py-0.5">28</span>
							<span className="text-muted-foreground/30 py-0.5">29</span>
							<span className="text-muted-foreground/30 py-0.5">30</span>
							<span className="text-muted-foreground/30 py-0.5">31</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								1
							</span>

							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								2
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								3
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								4
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								5
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								6
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								7
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								8
							</span>

							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								9
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								10
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								11
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								12
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								13
							</span>

							{/* Start Date Selection Range */}
							<span className="py-0.5 rounded-l-md bg-primary text-primary-foreground font-semibold shadow-2xs">
								14
							</span>
							<span className="py-0.5 bg-primary/20 text-primary font-extrabold">
								15
							</span>
							<span className="py-0.5 bg-primary/20 text-primary font-extrabold">
								16
							</span>
							{/* End Date Selection Range */}
							<span className="py-0.5 rounded-r-md bg-primary text-primary-foreground font-semibold shadow-2xs">
								17
							</span>

							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								18
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								19
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								20
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								21
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								22
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								23
							</span>

							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								24
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								25
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								26
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								27
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								28
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								29
							</span>
							<span className="py-0.5 rounded hover:bg-muted text-foreground">
								30
							</span>
						</div>

						{/* Bottom Footer Action Bar */}
						<div className="flex items-center justify-between border-t border-border/40 pt-1 px-0.5 text-[5.5px]">
							<span className="text-muted-foreground font-semibold">
								Today: Aug 14
							</span>
							<span className="px-1.5 py-0.2 rounded bg-primary/10 text-primary font-extrabold border border-primary/20">
								Apply
							</span>
						</div>
					</div>
				)}

				{type === "collapsible" && (
					<div className="w-full space-y-1 my-auto px-1 text-[7px]">
						<div className="p-1.5 rounded-lg bg-background border border-border flex justify-between items-center font-extrabold text-foreground shadow-2xs">
							<span>Toggle Details</span>
							<span className="text-[7px] text-primary">▲</span>
						</div>
						<div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 text-[6.5px] font-semibold text-primary">
							Expanded Panel Content
						</div>
					</div>
				)}

				{type === "context-menu" && (
					<div className="w-full h-full relative flex items-center justify-center my-auto">
						<div className="w-24 p-1 rounded-lg bg-background border border-border shadow-lg space-y-0.5 text-[6px]">
							<div className="px-1.5 py-0.5 rounded hover:bg-primary/10 text-foreground font-medium flex justify-between">
								<span>Copy Link</span>
								<span className="text-muted-foreground">⌘C</span>
							</div>
							<div className="px-1.5 py-0.5 rounded bg-primary text-primary-foreground font-semibold flex justify-between">
								<span>Inspect Element</span>
								<span>⌘I</span>
							</div>
						</div>
					</div>
				)}

				{type === "drawer" && (
					<div className="w-full h-full relative flex flex-col justify-end items-center my-auto overflow-hidden bg-black/10 dark:bg-black/40 rounded-lg">
						{/* Bottom-Up Drag Sheet Overlay */}
						<div className="w-full h-3/4 rounded-t-2xl bg-background border-t border-border shadow-2xl p-1.5 flex flex-col justify-between text-[6.5px]">
							{/* Top Drag Handle Pill */}
							<div className="w-6 h-1 rounded-full bg-muted-foreground/40 mx-auto" />

							<div className="space-y-1 my-auto">
								<div className="font-extrabold text-foreground border-b border-border/40 pb-0.5 text-center">
									Drawer Sheet
								</div>
								<div className="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-semibold text-[5.5px]">
									Option 1: Edit Profile
								</div>
								<div className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium text-[5.5px]">
									Option 2: Settings
								</div>
							</div>

							<div className="h-3 w-full bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-semibold text-[6px] shadow-2xs">
								Submit
							</div>
						</div>
					</div>
				)}

				{type === "dialog" && (
					<div className="w-full h-full flex items-center justify-center my-auto">
						<div className="w-4/5 p-1.5 rounded-xl bg-background border border-border shadow-xl space-y-1 text-[6.5px]">
							<div className="font-extrabold text-foreground border-b border-border/40 pb-0.5">
								Dialog Title
							</div>
							<div className="text-[5.5px] text-muted-foreground">
								Are you sure you want to continue?
							</div>
							<div className="flex justify-end gap-1 pt-0.5">
								<span className="px-1.5 py-0.5 rounded bg-primary text-primary-foreground font-semibold text-[5.5px]">
									Confirm
								</span>
							</div>
						</div>
					</div>
				)}

				{type === "data-grid" && (
					<div className="w-full p-1 rounded-lg bg-background border border-border space-y-1 my-auto text-[6px] font-mono">
						<div className="grid grid-cols-3 gap-1 font-semibold text-primary border-b border-border/40 pb-0.5">
							<span>ID</span>
							<span>Name</span>
							<span>Role</span>
						</div>
						<div className="grid grid-cols-3 gap-1 text-foreground">
							<span>#01</span>
							<span>Alex</span>
							<span className="text-emerald-500 font-semibold">Admin</span>
						</div>
						<div className="grid grid-cols-3 gap-1 text-foreground">
							<span>#02</span>
							<span>Sarah</span>
							<span className="text-sky-500 font-semibold">User</span>
						</div>
					</div>
				)}

				{type === "data-table" && (
					<div className="w-full p-1.5 rounded-xl bg-card border border-border/80 space-y-1 my-auto text-[6px]">
						{/* Table Toolbar Header */}
						<div className="flex justify-between items-center border-b border-border/40 pb-1 px-0.5">
							<div className="flex items-center gap-1">
								<span className="font-extrabold text-foreground text-[6.5px]">
									Invoices
								</span>
								<span className="px-1 py-0.2 rounded bg-primary/10 text-primary font-mono text-[5px]">
									128 total
								</span>
							</div>
							<div className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono text-[5px] flex items-center gap-0.5">
								<span>Filter</span>
								<span className="text-[4.5px]">▼</span>
							</div>
						</div>

						{/* Table Column Headers */}
						<div className="grid grid-cols-12 gap-1 font-extrabold text-muted-foreground border-b border-border/40 pb-0.5 px-0.5 text-[5.5px]">
							<span className="col-span-1 text-center">☐</span>
							<span className="col-span-4">Customer</span>
							<span className="col-span-3">Status</span>
							<span className="col-span-4 text-right">Amount</span>
						</div>

						{/* Table Rows */}
						<div className="space-y-0.5 text-[5.5px]">
							<div className="grid grid-cols-12 gap-1 items-center bg-primary/5 p-0.5 rounded border border-primary/20">
								<span className="col-span-1 text-center text-primary font-semibold">
									☑
								</span>
								<span className="col-span-4 font-semibold text-foreground truncate">
									Alex Rivers
								</span>
								<span className="col-span-3">
									<span className="px-1 py-0.2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-[5px]">
										Paid
									</span>
								</span>
								<span className="col-span-4 text-right font-extrabold text-foreground">
									$1,250.00
								</span>
							</div>

							<div className="grid grid-cols-12 gap-1 items-center p-0.5 border-b border-border/20">
								<span className="col-span-1 text-center text-muted-foreground/60">
									☐
								</span>
								<span className="col-span-4 font-medium text-foreground truncate">
									Sarah Chen
								</span>
								<span className="col-span-3">
									<span className="px-1 py-0.2 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold text-[5px]">
										Pending
									</span>
								</span>
								<span className="col-span-4 text-right font-semibold text-foreground">
									$420.00
								</span>
							</div>

							<div className="grid grid-cols-12 gap-1 items-center p-0.5">
								<span className="col-span-1 text-center text-muted-foreground/60">
									☐
								</span>
								<span className="col-span-4 font-medium text-foreground truncate">
									TechCorp Inc
								</span>
								<span className="col-span-3">
									<span className="px-1 py-0.2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-[5px]">
										Paid
									</span>
								</span>
								<span className="col-span-4 text-right font-semibold text-foreground">
									$3,890.00
								</span>
							</div>
						</div>

						{/* Table Footer Pagination */}
						<div className="flex justify-between items-center border-t border-border/40 pt-1 px-0.5 text-[5px] text-muted-foreground font-medium">
							<span>Page 1 of 12</span>
							<div className="flex gap-0.5 font-semibold">
								<span className="px-1 py-0.2 rounded bg-muted">‹ Prev</span>
								<span className="px-1 py-0.2 rounded bg-muted text-foreground">
									Next ›
								</span>
							</div>
						</div>
					</div>
				)}

				{type === "date-picker" && (
					<div className="w-full h-full p-1 rounded-xl bg-background border border-border/80 flex flex-col justify-center items-center overflow-hidden">
						<div className="w-[96%] space-y-1 my-auto">
							{/* Realistic Input Field with Active Selection Trigger */}
							<div className="w-full flex items-center justify-between px-2 py-1 rounded-lg bg-card border border-primary/30 shadow-xs ring-2 ring-primary/30">
								<div className="flex items-center gap-1.5 min-w-0">
									<div className="p-0.5 rounded bg-primary text-primary-foreground shrink-0 animate-pulse">
										<svg
											className="size-2.5"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth={2.5}>
											<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
											<line x1="16" y1="2" x2="16" y2="6" />
											<line x1="8" y1="2" x2="8" y2="6" />
											<line x1="3" y1="10" x2="21" y2="10" />
										</svg>
									</div>
									<div className="flex flex-col text-left leading-none truncate">
										<span className="text-[5px] text-primary font-semibold uppercase tracking-wider">
											Picking Date...
										</span>
										<span className="text-[6.5px] font-extrabold text-foreground truncate">
											Aug 18, 2026
										</span>
									</div>
								</div>
								<span className="text-[5.5px] text-primary font-semibold">▲</span>
							</div>

							{/* Realistic Floating Popover Dropdown Card with Live Selection */}
							<div className="w-full p-1.5 rounded-lg bg-card/95 backdrop-blur-xs border border-border shadow-xl space-y-1 relative">
								{/* Preset Quick Chips */}
								<div className="flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none text-[4.5px]">
									<span className="px-1 py-0.5 rounded-full bg-muted text-muted-foreground font-medium whitespace-nowrap">
										Today
									</span>
									<span className="px-1 py-0.5 rounded-full bg-muted text-muted-foreground font-medium whitespace-nowrap">
										Tomorrow
									</span>
									<span className="px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground font-semibold whitespace-nowrap shadow-2xs">
										Pick Date Range
									</span>
								</div>

								{/* Month Header Navigation */}
								<div className="flex items-center justify-between px-1 py-0.5 rounded bg-muted/40 text-[6px]">
									<span className="size-3 rounded hover:bg-background flex items-center justify-center font-semibold text-muted-foreground cursor-pointer">
										‹
									</span>
									<span className="font-semibold text-foreground">August 2026</span>
									<span className="size-3 rounded hover:bg-background flex items-center justify-center font-semibold text-muted-foreground cursor-pointer">
										›
									</span>
								</div>

								{/* Weekday Grid Labels */}
								<div className="grid grid-cols-7 gap-0.5 font-semibold text-muted-foreground/70 text-center text-[4.5px] uppercase">
									<span>Su</span>
									<span>Mo</span>
									<span>Tu</span>
									<span>We</span>
									<span>Th</span>
									<span>Fr</span>
									<span>Sa</span>
								</div>

								{/* Days Matrix with Cursor Picking Date 18 */}
								<div className="grid grid-cols-7 gap-0.5 text-center font-medium text-[5px] relative">
									<span className="text-muted-foreground/30 py-0.5">26</span>
									<span className="text-muted-foreground/30 py-0.5">27</span>
									<span className="text-muted-foreground/30 py-0.5">28</span>
									<span className="text-muted-foreground/30 py-0.5">29</span>
									<span className="text-muted-foreground/30 py-0.5">30</span>
									<span className="text-muted-foreground/30 py-0.5">31</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										1
									</span>

									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										2
									</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										3
									</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										4
									</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										5
									</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										6
									</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										7
									</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										8
									</span>

									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										9
									</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										10
									</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										11
									</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										12
									</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										13
									</span>

									{/* Start Date Selected */}
									<span className="py-0.5 rounded-md bg-primary text-primary-foreground font-semibold shadow-xs">
										14
									</span>
									<span className="py-0.5 bg-primary/20 text-primary font-semibold">
										15
									</span>

									<span className="py-0.5 bg-primary/20 text-primary font-semibold">
										16
									</span>
									<span className="py-0.5 bg-primary/20 text-primary font-semibold">
										17
									</span>

									{/* ACTIVE PICKING DATE (18) WITH CURSOR POINTER & TOOLTIP */}
									<div className="relative flex items-center justify-center">
										<span className="w-full py-0.5 rounded-md bg-primary text-primary-foreground font-extrabold shadow-md ring-2 ring-primary/30 ring-offset-1 scale-105 z-10">
											18
										</span>
										{/* Cursor Pointer Graphic */}
										<svg
											className="size-3 text-foreground drop-shadow-md absolute -bottom-1 -right-1 z-20 pointer-events-none"
											viewBox="0 0 24 24"
											fill="currentColor">
											<path
												d="M4.5 3.5L11.5 20.5L14.5 13.5L21.5 10.5L4.5 3.5Z"
												stroke="white"
												strokeWidth="1.5"
												strokeLinejoin="round"
											/>
										</svg>
									</div>

									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										19
									</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										20
									</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										21
									</span>
									<span className="py-0.5 rounded hover:bg-muted text-foreground">
										22
									</span>
								</div>

								{/* Active Picking Status Bar */}
								<div className="flex items-center justify-between pt-1 border-t border-border/50 text-[5px]">
									<div className="flex items-center gap-1">
										<span className="size-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
										<span className="font-semibold text-foreground truncate">
											Selected: Aug 14 - Aug 18
										</span>
									</div>
									<span className="px-1.5 py-0.5 rounded bg-primary text-primary-foreground font-extrabold shadow-2xs shrink-0">
										Confirm
									</span>
								</div>
							</div>
						</div>
					</div>
				)}

				{type === "form" && (
					<div className="w-full p-1.5 rounded-lg bg-background border border-border space-y-1 my-auto text-[6px]">
						<div className="space-y-0.5">
							<div className="font-semibold text-foreground">Username</div>
							<div className="h-2.5 w-full rounded bg-muted border border-primary/40 px-1 flex items-center text-[5.5px] text-primary font-semibold">
								alex_dev
							</div>
						</div>
						<div className="h-3 w-full rounded bg-primary text-primary-foreground font-semibold flex items-center justify-center text-[6px]">
							Submit Form
						</div>
					</div>
				)}

				{type === "input" && (
					<div className="w-full p-1.5 rounded-lg bg-background border border-border space-y-1 my-auto text-[6.5px]">
						<div className="h-4 w-full rounded-md border border-primary/30 bg-primary/5 px-1.5 flex items-center justify-between text-primary font-semibold">
							<span>Input value...</span>
							<span className="size-1 rounded-full bg-primary animate-pulse" />
						</div>
					</div>
				)}

				{type === "invoice" && (
					<div className="w-full p-1.5 rounded-lg bg-background border border-border space-y-1 my-auto text-[5.5px] overflow-hidden">
						<div className="flex justify-between items-center border-b border-border/40 pb-0.5">
							<span className="font-semibold text-foreground">INV-#402</span>
							<span className="text-[5px] font-extrabold text-emerald-500 bg-emerald-500/10 px-1 rounded">
								PAID
							</span>
						</div>
						<div className="space-y-0.5 border-b border-border/20 pb-0.5">
							<div className="flex justify-between text-muted-foreground">
								<span>UI Kit License</span>
								<span className="font-semibold text-foreground">$149.00</span>
							</div>
							<div className="flex justify-between text-muted-foreground">
								<span>Support Addon</span>
								<span className="font-semibold text-foreground">$49.00</span>
							</div>
						</div>
						<div className="flex justify-between font-extrabold text-foreground pt-0.5">
							<span>Total:</span>
							<span className="text-primary">$198.00</span>
						</div>
					</div>
				)}

				{type === "kbd" && (
					<div className="w-full flex items-center justify-center gap-1 my-auto">
						<span className="px-1.5 py-0.5 rounded-md bg-muted border-b-2 border-border text-[7px] font-mono font-semibold text-foreground shadow-2xs">
							Ctrl
						</span>
						<span className="text-[7px] text-muted-foreground">+</span>
						<span className="px-1.5 py-0.5 rounded-md bg-primary border-b-2 border-primary/70 text-[7px] font-mono font-semibold text-primary-foreground shadow-2xs">
							K
						</span>
					</div>
				)}

				{type === "mails" && (
					<div className="w-full p-1.5 rounded-lg bg-background border border-border space-y-1 my-auto text-[6px]">
						<div className="p-1 rounded bg-primary/10 border border-primary/20 space-y-0.5">
							<div className="font-extrabold text-primary flex justify-between">
								<span>Sarah Connor</span>
								<span className="text-[5px] text-muted-foreground">
									10:42 AM
								</span>
							</div>
							<div className="text-[5.5px] text-foreground font-semibold truncate">
								Project Assets Ready
							</div>
						</div>
					</div>
				)}

				{type === "map" && (
					<div className="w-full h-full rounded-lg bg-muted/20 border border-border relative flex items-center justify-center my-auto overflow-hidden">
						{/* Bangladesh Map Silhouette SVG */}
						<svg
							className="absolute inset-0 w-full h-full pointer-events-none fill-primary/20 stroke-primary/50 stroke-1"
							viewBox="0 0 100 100">
							<path d="M 45 10 Q 55 12, 60 20 Q 65 25, 75 30 Q 80 40, 70 50 Q 75 60, 68 75 Q 60 85, 55 90 Q 50 82, 45 78 Q 40 70, 32 65 Q 25 60, 28 50 Q 30 40, 35 30 Q 32 20, 45 10 Z" />
						</svg>

						{/* Dhaka (Center Pulse Pin) */}
						<div className="absolute top-[48%] left-[50%] z-10 -translate-x-1/2 -translate-y-1/2">
							<span className="size-3 rounded-full bg-rose-500/30 block animate-ping absolute inset-0" />
							<span className="size-2 rounded-full bg-rose-500 block ring-2 ring-rose-500/40 border border-white shadow-xs" />
						</div>

						{/* Chattogram Pin */}
						<div className="absolute top-[68%] left-[66%] z-10 -translate-x-1/2 -translate-y-1/2">
							<span className="size-1.5 rounded-full bg-emerald-500 block ring-1 ring-emerald-500/40 border border-white shadow-xs" />
						</div>

						{/* Sylhet Pin */}
						<div className="absolute top-[30%] left-[65%] z-10 -translate-x-1/2 -translate-y-1/2">
							<span className="size-1.5 rounded-full bg-amber-500 block ring-1 ring-amber-500/40 border border-white shadow-xs" />
						</div>

						{/* Rajshahi Pin */}
						<div className="absolute top-[35%] left-[32%] z-10 -translate-x-1/2 -translate-y-1/2">
							<span className="size-1.5 rounded-full bg-sky-500 block ring-1 ring-sky-500/40 border border-white shadow-xs" />
						</div>

						{/* Bangladesh Tag */}
						<div className="absolute bottom-1 left-1 px-1 py-0.2 rounded bg-background/90 border border-border text-[5px] font-semibold text-primary shadow-2xs">
							Bangladesh
						</div>
					</div>
				)}

				{type === "menubar" && (
					<div className="w-full p-1 rounded-lg bg-background border border-border shadow-xs my-auto text-[6px]">
						<div className="flex items-center gap-2 border-b border-border/40 pb-0.5 px-0.5 font-semibold text-foreground">
							<span className="text-primary font-semibold">File</span>
							<span className="text-muted-foreground">Edit</span>
							<span className="text-muted-foreground">View</span>
						</div>
						<div className="p-1 rounded bg-card border border-border mt-0.5 space-y-0.5 text-[5.5px]">
							<div className="font-extrabold text-primary">New Tab ⌘N</div>
							<div className="text-muted-foreground">Open File...</div>
						</div>
					</div>
				)}

				{type === "otp-input" && (
					<div className="w-full flex items-center justify-center gap-1 my-auto">
						<div className="size-5 rounded-md border border-primary/30 bg-primary/10 text-primary font-semibold text-[9px] flex items-center justify-center shadow-2xs">
							4
						</div>
						<div className="size-5 rounded-md border border-primary/30 bg-primary/10 text-primary font-semibold text-[9px] flex items-center justify-center shadow-2xs">
							8
						</div>
						<div className="size-5 rounded-md border-2 border-primary/30 bg-background text-foreground font-semibold text-[9px] flex items-center justify-center shadow-2xs ring-2 ring-primary/20">
							2
						</div>
						<div className="size-5 rounded-md border border-border bg-muted/40 text-muted-foreground font-semibold text-[9px] flex items-center justify-center">
							•
						</div>
					</div>
				)}

				{type === "popover" && (
					<div className="w-full h-full relative flex items-center justify-center my-auto">
						<div className="w-28 p-1.5 rounded-xl bg-background border border-border shadow-lg space-y-1 text-[6px]">
							<div className="font-extrabold text-foreground border-b border-border/40 pb-0.5">
								Dimensions
							</div>
							<div className="flex justify-between text-muted-foreground">
								<span>
									Width: <strong className="text-foreground">100%</strong>
								</span>
								<span>
									Height: <strong className="text-foreground">Auto</strong>
								</span>
							</div>
						</div>
					</div>
				)}

				{type === "progress" && (
					<div className="w-full space-y-1.5 my-auto px-1">
						<div className="flex justify-between text-[6.5px] font-extrabold">
							<span className="text-foreground">Uploading Assets</span>
							<span className="text-primary">78%</span>
						</div>
						<div className="h-2 w-full rounded-full bg-muted overflow-hidden p-0.5 border border-border/40">
							<div className="h-full w-[78%] rounded-full bg-primary transition-all duration-500 shadow-xs" />
						</div>
					</div>
				)}

				{type === "loader" && (
					<div className="w-full flex items-center justify-center my-auto relative">
						{/* Outer Slow Orbit Ring */}
						<div className="size-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
						{/* Inner Fast Counter Spin Ring */}
						<div className="size-5 rounded-full border-2 border-emerald-500/40 border-b-emerald-500 animate-[spin_0.8s_linear_infinite] absolute" />
						{/* Core Pulsing Glowing Center */}
						<span className="size-1.5 rounded-full bg-primary animate-pulse absolute shadow-sm" />
					</div>
				)}

				{type === "sonner" && (
					<div className="w-full h-full relative flex flex-col justify-end p-1 my-auto">
						<div className="p-1.5 rounded-xl bg-background border border-primary/50 shadow-lg flex items-center justify-between text-[6px]">
							<div className="flex items-center gap-1">
								<span className="size-1.5 rounded-full bg-emerald-500" />
								<span className="font-extrabold text-foreground">
									Event Triggered
								</span>
							</div>
							<span className="text-[5.5px] text-primary font-semibold">Undo</span>
						</div>
					</div>
				)}

				{type === "select" && (
					<div className="w-full p-1 rounded-lg bg-background border border-border shadow-2xs space-y-1 my-auto text-[6.5px]">
						<div className="flex justify-between items-center px-1.5 py-0.5 rounded bg-muted border border-border font-semibold text-foreground">
							<span>Select Option</span>
							<span className="text-[6px] text-primary">▼</span>
						</div>
					</div>
				)}

				{type === "skeleton" && (
					<div className="w-full space-y-1.5 my-auto px-1">
						<div className="h-3 w-3/4 rounded bg-muted animate-pulse" />
						<div className="h-2 w-full rounded bg-muted/60 animate-pulse" />
						<div className="h-2 w-1/2 rounded bg-muted/60 animate-pulse" />
					</div>
				)}

				{type === "toast" && (
					<div className="w-full p-2 rounded-xl bg-card border border-border/80 my-auto text-[6px] space-y-1.5 shadow-2xs">
						{/* Multi-layered Toast Banner */}
						<div className="p-1.5 rounded-lg bg-background border border-emerald-500/40 flex items-start gap-1.5 shadow-xs">
							<div className="size-3.5 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center text-[7px] font-semibold shrink-0">
								✓
							</div>
							<div className="flex-1 min-w-0">
								<div className="font-extrabold text-foreground text-[6.5px] leading-none">
									Changes Saved
								</div>
								<div className="text-[5.5px] text-muted-foreground mt-0.5 truncate">
									Your profile settings have updated.
								</div>
							</div>
							<span className="text-[6px] text-muted-foreground/60 hover:text-foreground cursor-pointer shrink-0">
								✕
							</span>
						</div>
					</div>
				)}

				{type === "toggle" && (
					<div className="w-full flex items-center justify-center my-auto">
						<div className="w-8 h-4 rounded-full bg-primary p-0.5 flex items-center justify-end shadow-2xs">
							<div className="size-3 rounded-full bg-primary-foreground shadow-xs" />
						</div>
					</div>
				)}

				{type === "tooltip" && (
					<div className="w-full flex flex-col items-center justify-center my-auto space-y-2 py-1">
						{/* Realistic Floating Tooltip Bubble with Down Arrow */}
						<div className="px-2.5 py-1 rounded-md bg-foreground text-background text-[6.5px] font-extrabold shadow-md relative animate-bounce">
							<span>Add to Favorites</span>
							<div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
						</div>
						{/* Target Interactive Trigger Element */}
						<div className="px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/30 text-primary text-[6.5px] font-semibold flex items-center gap-1">
							<span>★</span>
							<span>Bookmark</span>
						</div>
					</div>
				)}

				{type === "toggle-group" && (
					<div className="w-full flex items-center justify-center my-auto">
						<div className="p-0.5 rounded-lg bg-muted border border-border flex items-center gap-0.5 text-[6.5px] font-semibold">
							<span className="px-1.5 py-0.5 rounded bg-background text-foreground shadow-2xs">
								Left
							</span>
							<span className="px-1.5 py-0.5 text-muted-foreground">
								Center
							</span>
							<span className="px-1.5 py-0.5 text-muted-foreground">Right</span>
						</div>
					</div>
				)}

				{type === "terminal" && (
					<div className="w-full p-1.5 rounded-xl bg-card border border-border text-primary font-mono text-[6px] space-y-1 shadow-xs my-auto">
						<div className="flex gap-1 border-b border-border/40 pb-0.5">
							<span className="size-1.5 rounded-full bg-rose-500/80" />
							<span className="size-1.5 rounded-full bg-amber-500/80" />
							<span className="size-1.5 rounded-full bg-emerald-500/80" />
						</div>
						<div className="font-semibold">$ npm run dev</div>
						<div className="text-muted-foreground">Ready in 2.4s</div>
					</div>
				)}

				{type === "pagination" && (
					<div className="w-full flex items-center justify-center gap-1 my-auto text-[6.5px] font-semibold">
						<span className="px-1.5 py-0.5 rounded bg-muted border border-border text-muted-foreground">
							Prev
						</span>
						<span className="size-4 rounded bg-primary text-primary-foreground flex items-center justify-center font-semibold shadow-2xs">
							1
						</span>
						<span className="size-4 rounded bg-background border border-border text-foreground flex items-center justify-center">
							2
						</span>
						<span className="px-1.5 py-0.5 rounded bg-muted border border-border text-muted-foreground">
							Next
						</span>
					</div>
				)}

				{type === "tabs" && (
					<div className="w-full space-y-1 my-auto px-0.5 text-[6.5px]">
						<div className="p-0.5 rounded-lg bg-muted border border-border flex gap-0.5 font-semibold">
							<span className="flex-1 py-0.5 rounded bg-background text-primary text-center font-extrabold shadow-2xs">
								Account
							</span>
							<span className="flex-1 py-0.5 text-muted-foreground text-center">
								Password
							</span>
						</div>
						<div className="p-1 rounded bg-background border border-border text-[6px] text-muted-foreground">
							Tab content panel...
						</div>
					</div>
				)}

				{type === "theme-switcher" && (
					<div className="w-full flex items-center justify-center my-auto">
						<div className="p-1 rounded-full bg-muted border border-border flex items-center gap-1 text-[8px] font-semibold shadow-2xs">
							<span className="p-1 rounded-full bg-background text-amber-500 shadow-xs">
								☀️
							</span>
							<span className="p-1 text-muted-foreground">🌙</span>
						</div>
					</div>
				)}

				{type === "wizard" && (
					<div className="w-full space-y-1.5 my-auto px-0.5 text-[6px]">
						<div className="flex justify-between items-center font-extrabold text-foreground border-b border-border/40 pb-0.5">
							<span className="text-primary font-semibold">Step 2: Profile</span>
							<span className="text-[5.5px] text-muted-foreground">2 of 4</span>
						</div>
						<div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
							<div className="h-full w-1/2 bg-primary rounded-full" />
						</div>
					</div>
				)}

				{type === "data-maps" && (
					<div className="w-full h-full rounded-lg bg-muted/20 border border-border relative flex items-center justify-center my-auto overflow-hidden">
						{/* Grayscale World Map Continents SVG */}
						<svg
							className="absolute inset-0 w-full h-full pointer-events-none fill-muted-foreground/30"
							viewBox="0 0 200 100">
							<path d="M 15 20 Q 30 15 45 25 Q 50 35 35 50 Q 25 55 15 45 Z" />
							<path d="M 40 55 Q 55 52 50 85 Q 40 90 35 68 Z" />
							<path d="M 75 15 Q 120 10 160 25 Q 170 45 140 55 Q 100 50 80 35 Z" />
							<path d="M 80 40 Q 115 38 110 75 Q 90 85 78 60 Z" />
							<path d="M 145 65 Q 175 60 170 85 Q 150 90 142 75 Z" />
						</svg>

						{/* Analytics Heat Pulse Circles on World Map */}
						<div className="absolute top-[28%] left-[22%] z-10">
							<span className="size-4 rounded-full bg-primary/20 block animate-ping absolute inset-0" />
							<span className="size-2.5 rounded-full bg-primary block border border-white shadow-xs" />
						</div>

						<div className="absolute top-[28%] left-[58%] z-10">
							<span className="size-5 rounded-full bg-emerald-500/20 block animate-ping absolute inset-0" />
							<span className="size-2.5 rounded-full bg-emerald-500 block border border-white shadow-xs" />
						</div>

						{/* Top Right Analytics Pill */}
						<div className="absolute top-1 right-1 px-1 py-0.2 rounded bg-background/90 border border-border text-[5px] font-semibold text-primary shadow-xs">
							+42% Data Flow
						</div>
					</div>
				)}

				{type === "hero-videoplayer" && (
					<div className="w-full h-full rounded-xl bg-card border border-border relative flex items-center justify-center my-auto overflow-hidden shadow-sm">
						<div className="size-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-xs shadow-lg ring-4 ring-primary/20">
							▶
						</div>
						<div className="absolute bottom-1.5 left-2 right-2 h-1 rounded-full bg-muted overflow-hidden">
							<div className="h-full w-2/3 bg-primary" />
						</div>
					</div>
				)}

				{type === "verify-badge" && (
					<div className="w-full flex items-center justify-center gap-1.5 my-auto">
						<div className="px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-[7px] font-extrabold flex items-center gap-1 shadow-2xs">
							<span className="size-3 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[6px]">
								✓
							</span>
							<span>Verified Account</span>
						</div>
					</div>
				)}

				{type === "mobile-mockup" && (
					<div className="w-full h-full flex items-center justify-center my-auto">
						<div className="w-16 h-full rounded-[14px] border-2 border-border bg-background p-1 flex flex-col justify-between items-center shadow-md relative overflow-hidden">
							<div className="w-6 h-1 bg-border rounded-full mb-1" />
							<div className="flex-1 w-full rounded-md bg-primary/10 border border-primary/20 p-1 flex flex-col justify-between">
								<div className="size-2 rounded-full bg-primary" />
								<div className="h-1 w-3/4 rounded bg-primary/60" />
							</div>
							<div className="w-4 h-1 bg-border rounded-full mt-1" />
						</div>
					</div>
				)}

				{type === "half-stars" && (
					<div className="w-full flex items-center justify-center gap-1 my-auto text-amber-400 text-xs">
						<span>★</span>
						<span>★</span>
						<span>★</span>
						<span>★</span>
						<span className="opacity-40">★</span>
						<span className="text-[7.5px] font-semibold text-foreground ml-1">
							4.8
						</span>
					</div>
				)}

				{type === "code-block" && (
					<div className="w-full p-1.5 rounded-xl bg-muted/60 border border-border font-mono text-[6px] space-y-1 my-auto">
						<div className="flex justify-between text-[5.5px] text-muted-foreground border-b border-border/40 pb-0.5">
							<span>component.tsx</span>
							<span className="text-primary font-semibold">Copy</span>
						</div>
						<div className="text-primary font-semibold">
							<span className="text-rose-500">const</span> App = () =&gt;
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

function ComponentPreviewGridSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-60px" });

	return (
		<section
			ref={ref}
			className="py-12 md:py-16 bg-foreground/[0.02]">
			<div className={SECTION_INNER}>
				{/* Section Title */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
					className="text-center mb-10">
					<span className={SECTION_EYEBROW}>
						<LayoutGrid className="size-3.5" />
						Component Preview Catalog
					</span>
					<h2 className={SECTION_H2}>
						Explore Built-in Component Previews
					</h2>
					<p className={cn(SECTION_SUB, "mx-auto")}>
						Click any component card below to inspect interactive live previews,
						installation guides, and full source code.
					</p>
				</motion.div>

				{/* Flat Grid for Featured 12 Components with Bottom Gradient Blur Overlay */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5 }}
					className="relative">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 py-2">
						{featuredHomepageComponents.map((item, index) => {
							const isLastRow = index >= 8;
							return (
								<Link
									key={item.title}
									href={item.href}
									className="group block rounded-2xl">
									<div
										className={cn(
											"rounded-2xl border border-foreground/[0.06] bg-card p-4 transition-all duration-300 flex flex-col h-full justify-between overflow-hidden",
											!isLastRow
												? "hover:border-primary/30 hover:-translate-y-1.5"
												: "hover:border-primary/30",
										)}>
										{/* Card Thumbnail / Illustration */}
										<div className="w-full h-32 rounded-xl mb-4 overflow-hidden relative">
											<MiniatureIllustration
												title={item.title}
												type={item.illustrationType}
											/>
											{item.badge && (
												<span className="absolute top-2.5 right-2.5 text-[9px] font-bold uppercase tracking-wider leading-none px-1.5 py-0.5 rounded-md bg-primary/15 text-primary border border-primary/30 backdrop-blur-sm">
													{item.badge}
												</span>
											)}
										</div>

										{/* Card Info */}
										<div className="flex items-center justify-between pt-1">
											<div>
												<h4
													className={cn(
														"font-sans text-[14px] font-semibold text-foreground transition-colors",
														!isLastRow && "group-hover:text-primary",
													)}>
													{item.title}
												</h4>
												<p className="text-[13px] leading-[1.65] text-foreground/45 mt-0.5">
													{item.countText}
												</p>
											</div>
											<div
												className={cn(
													"size-7 rounded-lg bg-foreground/[0.05] flex items-center justify-center text-foreground/40 transition-all",
													!isLastRow &&
														"group-hover:bg-primary group-hover:text-primary-foreground",
												)}>
												<ArrowRight className="size-3.5" />
											</div>
										</div>
									</div>
								</Link>
							);
						})}
					</div>

					{/* Bottom Gradient Fade Mask & Centered Backdrop Blur Button */}
					<div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-background via-background/90 to-transparent flex items-end justify-center pb-2 pointer-events-none rounded-b-2xl z-20">
						<Link
							href="/docs/nextjs/all-components"
							className={cn(BTN_CLAY, "pointer-events-auto group/btn")}>
							Explore All Components
							<ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
						</Link>
					</div>
				</motion.div>
			</div>
		</section>
	);
}

/* ═══════════════════════════════════════════════
   SECTION 5.5: ANIMATED FEEDBACK & TESTIMONIALS
   ═══════════════════════════════════════════════ */

interface FeedbackItem {
	id: string;
	name: string;
	role: string;
	company?: string;
	handle: string;
	avatar: string;
	content: string;
	rating: number;
	tag?: string;
}

const FEEDBACK_ROW_1: FeedbackItem[] = [
	{
		id: "fb-1",
		name: "Tanvir Ahmed",
		role: "Frontend Engineer",
		company: "TechVibe",
		handle: "@tanvir_dev",
		avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_200,c_limit/v1790150483/photo-1534528741775-53994a69daeb-1790150482280.jpg",
		content: "Spent 20 minutes playing with the interactive Component Wall and 3D Carousel right on this landing page. The physics, responsiveness, and smoothness are unreal.",
		rating: 5.0,
		tag: "Live Previews",
	},
	{
		id: "fb-2",
		name: "Sarah Jenkins",
		role: "Senior React Developer",
		company: "Stripe",
		handle: "@sarah_codes",
		avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_200,c_limit/v1790158813/photo-1494790108377-be9c29b29330-1790158812212.jpg",
		content: "Ran the 'npx shadcn@latest add @algorize-ui/...' command in my Next.js 15 app. The code dropped directly into my components folder with zero dependency issues. Pure bliss.",
		rating: 4.5,
		tag: "CLI Registry",
	},
	{
		id: "fb-3",
		name: "Alex Rivera",
		role: "Full-Stack Engineer",
		company: "Indie Builder",
		handle: "@alexrivera_ui",
		avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_200,c_limit/v1790150480/photo-1507003211169-0a1dd7228f2d-1790150482276.jpg",
		content: "The macOS Dock and Bento Showcase components on this website look like they were designed by Apple. Pasted them into our client portal and everyone was stunned.",
		rating: 5.0,
		tag: "Bento & Dock",
	},
	{
		id: "fb-4",
		name: "Marcus Vance",
		role: "Design Engineer",
		company: "AlgorizeTech",
		handle: "@marcus_ui",
		avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_200,c_limit/v1790158814/photo-1500648767791-00dcc994a43e-1790158812212.jpg",
		content: "Toggled between dark and light themes multiple times — the frosted glass blur, subtle border highlights, and color contrast are tuned to absolute perfection.",
		rating: 4.0,
		tag: "Dark Mode",
	},
	{
		id: "fb-5",
		name: "David Kim",
		role: "Product Designer",
		company: "Studio Neo",
		handle: "@davidkim_design",
		avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_200,c_limit/v1790158814/photo-1539571696357-5a69c17a67c6-1790158812214.jpg",
		content: "Finally a component collection where motion design feels purposeful, not distracting. The hover states, button springs, and tabs have so much character.",
		rating: 4.5,
		tag: "Micro-Interactions",
	},
];

const FEEDBACK_ROW_2: FeedbackItem[] = [
	{
		id: "fb-6",
		name: "Elena Rostova",
		role: "Lead Systems Architect",
		company: "Fintech Labs",
		handle: "@elena_codes",
		avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_200,c_limit/v1790158814/photo-1573496359142-b8d87734a5a2-1790158812214.jpg",
		content: "Inspected the component source code in the docs. Clean, fully-typed TypeScript, accessible keyboard handlers, and no redundant abstractions. Exceptional code quality.",
		rating: 5.0,
		tag: "Clean TypeScript",
	},
	{
		id: "fb-7",
		name: "Liam O'Connor",
		role: "SaaS Founder",
		company: "LaunchFast",
		handle: "@liam_builds",
		avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_200,c_limit/v1790150480/photo-1506794778202-cad84cf45f1d-1790150482275.jpg",
		content: "Needed a high-converting hero layout and an animated review marquee for our product launch tonight. Found Docs UI, copied the code, and went live in 15 minutes.",
		rating: 3.5,
		tag: "Fast Shipping",
	},
	{
		id: "fb-8",
		name: "Priya Patel",
		role: "Principal Engineer",
		company: "CloudScale",
		handle: "@priya_dev",
		avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_200,c_limit/v1790166050/photo-1580489944761-15a19d654956-1790166052226.jpg",
		content: "The keyboard navigation, ⌘K command menu, and ARIA attributes work right out of the box with zero hydration warnings. That's rare for animation-heavy UI.",
		rating: 5.0,
		tag: "Accessibility",
	},
	{
		id: "fb-9",
		name: "Daniel Zhao",
		role: "Indie Hacker",
		company: "MetricsHub",
		handle: "@danielzhao",
		avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_200,c_limit/v1790158814/photo-1522075469751-3a6694fb2f61-1790158812213.jpg",
		content: "The interactive chart preview and draggable card widgets look like they belong on Linear or Raycast. It makes our humble SaaS look like a venture-backed tool.",
		rating: 4.0,
		tag: "Linear-Grade UI",
	},
	{
		id: "fb-10",
		name: "Emily Watson",
		role: "UI/UX Consultant",
		company: "CreativeFlow",
		handle: "@emily_ux",
		avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_200,c_limit/v1790150478/photo-1544005313-94ddf0286df2-1790150482273.jpg",
		content: "Most UI documentation gives you boring static code. Here you can actually test every component state interactively right inside the page before copying. Phenomenal DX!",
		rating: 3.5,
		tag: "Docs Experience",
	},
];

const FEEDBACK_ROW_3: FeedbackItem[] = [
	{
		id: "fb-11",
		name: "Lucas Müller",
		role: "Frontend Engineer",
		company: "Berlin Devs",
		handle: "@lucas_m",
		avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_200,c_limit/v1790150481/photo-1517841905240-472988babdf9-1790150482277.jpg",
		content: "Browsed the documentation and interactive demos on mobile Safari. Butter-smooth 60fps animations, no weird horizontal scroll bugs, and touch-friendly controls.",
		rating: 4.0,
		tag: "Mobile Smooth",
	},
	{
		id: "fb-12",
		name: "Nabil Hasan",
		role: "Full-Stack Developer",
		company: "Dhaka",
		handle: "@nabilhasan",
		avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_200,c_limit/v1790166049/photo-1548142813-c348350df52b-1790166052222.jpg",
		content: "Can't believe this entire library and documentation is free and open-source. The component polish and design engineering easily rival premium $200 UI kits.",
		rating: 5.0,
		tag: "100% Free UI",
	},
	{
		id: "fb-13",
		name: "Chloe Dupont",
		role: "Staff UI Engineer",
		company: "Vercel Ecosystem",
		handle: "@chloedupont",
		avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_200,c_limit/v1790158814/photo-1573496359142-b8d87734a5a2-1790158812214.jpg",
		content: "The way these components leverage Tailwind CSS variables makes theme customization so simple. It matched our existing design tokens in minutes.",
		rating: 4.5,
		tag: "Theming",
	},
	{
		id: "fb-14",
		name: "Arlene McCoy",
		role: "Co-Founder & CTO",
		company: "PeakScale",
		handle: "@arlene_mccoy",
		avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_200,c_limit/v1790158813/photo-1494790108377-be9c29b29330-1790158812212.jpg",
		content: "Replacing our previous clunky UI kit with Docs UI reduced our frontend bundle by 40% and improved our Core Web Vitals scores across the board.",
		rating: 3.0,
		tag: "Bundle Size",
	},
	{
		id: "fb-15",
		name: "Siddharth Rao",
		role: "Senior Software Engineer",
		company: "Bangalore",
		handle: "@siddharth_dev",
		avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_200,c_limit/v1790150480/photo-1507003211169-0a1dd7228f2d-1790150482276.jpg",
		content: "The copy-paste workflow with zero external heavy npm packages gives us complete ownership of the UI. This is the future of frontend development.",
		rating: 4.5,
		tag: "Code Ownership",
	},
];

function RatingStars({ rating }: { rating: number }) {
	return (
		<div className="flex items-center gap-1.5">
			<div className="flex items-center gap-0.5">
				{Array.from({ length: 5 }).map((_, index) => {
					const fillPercentage = Math.max(0, Math.min(1, rating - index));
					return (
						<div key={index} className="relative size-3.5 shrink-0">
							{/* Inactive Gray Star */}
							<svg
								viewBox="0 0 24 24"
								fill="currentColor"
								className="absolute inset-0 size-full text-foreground/15">
								<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
							</svg>

							{/* Active Golden Star (Clipped by percentage for half or full fill) */}
							{fillPercentage > 0 && (
								<svg
									viewBox="0 0 24 24"
									fill="currentColor"
									className="absolute inset-0 size-full text-amber-400"
									style={{
										clipPath: `polygon(0 0, ${fillPercentage * 100}% 0, ${fillPercentage * 100}% 100%, 0 100%)`,
									}}>
									<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
								</svg>
							)}
						</div>
					);
				})}
			</div>
			<span className="text-[11px] font-semibold text-foreground/40 font-mono">
				{rating.toFixed(1)}
			</span>
		</div>
	);
}

function FeedbackCard({ item }: { item: FeedbackItem }) {
	return (
		<div className="group relative w-[320px] sm:w-[380px] shrink-0 p-5 sm:p-6 rounded-2xl bg-card border border-foreground/[0.06] hover:border-primary/40 shadow-2xs hover:shadow-xl hover:shadow-primary/5 transition-colors transition-shadow duration-200 flex flex-col justify-between select-none cursor-default">
			{/* Subtle top border shimmer on hover */}
			<div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

			{/* Top Bar: User Profile Header */}
			<div className="flex items-start justify-between gap-3 mb-3.5">
				<div className="flex items-center gap-3 min-w-0">
					<div className="relative shrink-0">
						<img
							src={item.avatar}
							alt={item.name}
							className="size-10 sm:size-11 rounded-full object-cover ring-2 ring-foreground/[0.06] group-hover:ring-primary/40 transition-all duration-300"
						/>
						<span className="absolute bottom-0 right-0 size-2.5 bg-emerald-500 rounded-full ring-2 ring-card" />
					</div>
					<div className="min-w-0">
						<div className="flex items-center gap-1.5">
							<span className="text-[14px] font-semibold text-foreground truncate group-hover:text-primary transition-colors">
								{item.name}
							</span>
							<span
								className="inline-flex items-center justify-center size-3.5 rounded-full bg-primary/15 text-primary shrink-0"
								title="Verified Developer">
								<Check className="size-2.5 stroke-[3]" />
							</span>
						</div>
						<p className="text-[12px] text-foreground/40 truncate">
							<span className="font-medium text-foreground/70">{item.handle}</span>
							{item.role && (
								<span className="text-foreground/40"> • {item.role}</span>
							)}
						</p>
					</div>
				</div>

				{/* Source / Company Pill */}
				{item.company && (
					<span className="shrink-0 text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-foreground/[0.04] text-foreground/50">
						{item.company}
					</span>
				)}
			</div>

			{/* Review Quote Body (Consistently 3 lines) */}
			<p className="text-[13px] text-foreground/60 leading-[1.65] font-normal mb-4 line-clamp-3 min-h-[4.1rem]">
				"{item.content}"
			</p>

			{/* Bottom Bar: 5-Stars Rating + Feature Tag */}
			<div className="flex items-center justify-between gap-2 pt-3 border-t border-foreground/[0.06] text-xs">
				<RatingStars rating={item.rating} />

				{item.tag && (
					<span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-foreground/[0.04] text-foreground/50 group-hover:text-primary group-hover:bg-primary/15 transition-all">
						{item.tag}
					</span>
				)}
			</div>
		</div>
	);
}

function FeedbackSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-40px" });

	return (
		<section
			ref={ref}
			className="py-13 md:py-16 relative overflow-hidden bg-background">
			{/* Ambient background glows */}
			<div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/5 rounded-full blur-3xl opacity-70" />
			<div className="pointer-events-none absolute bottom-0 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />

			<div className={cn(SECTION_INNER, "mb-10 sm:mb-12")}>
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
					className="text-center max-w-3xl mx-auto">
					<div className={cn(EYEBROW_PILL, "mb-4")}>
						<MessageCircle className="size-3.5 text-primary" />
						Developer Feedback
					</div>
					<h2 className={SECTION_H2}>
						What developers are saying
					</h2>
					<p className={cn(SECTION_SUB, "mx-auto")}>
						Real impressions and feedback from developers and designers exploring Docs UI.
					</p>
				</motion.div>
			</div>

			{/* Animated Marquee Rows (3 Lanes, Slow & Smooth) */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={isInView ? { opacity: 1 } : {}}
				transition={{ duration: 0.8, delay: 0.2 }}
				className="space-y-4 sm:space-y-5 relative">
				{/* Gradient side masks for ultra-smooth edge blending */}
				<div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
				<div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />

				{/* Row 1: Leftward scroll (Speed: 250s, continuous running) */}
				<MarqueeBlock
					direction="left"
					speed={250}
					pauseOnHover={false}
					gap="1.25rem"
					className="py-1">
					{[...FEEDBACK_ROW_1, ...FEEDBACK_ROW_1, ...FEEDBACK_ROW_1].map(
						(item, idx) => (
							<FeedbackCard key={`r1-${item.id}-${idx}`} item={item} />
						),
					)}
				</MarqueeBlock>

				{/* Row 2: Rightward scroll (Opposite direction, Speed: 250s, continuous running) */}
				<MarqueeBlock
					direction="right"
					speed={250}
					pauseOnHover={false}
					gap="1.25rem"
					className="py-1">
					{[...FEEDBACK_ROW_2, ...FEEDBACK_ROW_2, ...FEEDBACK_ROW_2].map(
						(item, idx) => (
							<FeedbackCard key={`r2-${item.id}-${idx}`} item={item} />
						),
					)}
				</MarqueeBlock>

				{/* Row 3: Leftward scroll (Speed: 250s, continuous running) */}
				<MarqueeBlock
					direction="left"
					speed={250}
					pauseOnHover={false}
					gap="1.25rem"
					className="py-1">
					{[...FEEDBACK_ROW_3, ...FEEDBACK_ROW_3, ...FEEDBACK_ROW_3].map(
						(item, idx) => (
							<FeedbackCard key={`r3-${item.id}-${idx}`} item={item} />
						),
					)}
				</MarqueeBlock>
			</motion.div>
		</section>
	);
}

/* ═══════════════════════════════════════════════
   SECTION 6: ANIMATED INTERACTIVE FAQ SECTION
   ═══════════════════════════════════════════════ */

function AnimatedFAQSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-40px" });

	return (
		<section
			ref={ref}
			id="faq"
			className="py-20 md:py-28 relative overflow-hidden bg-background border-t border-border/40">
			{/* Ambient background glows */}
			<div className="pointer-events-none absolute top-10 left-1/4 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl opacity-60" />
			<div className="pointer-events-none absolute bottom-10 right-1/4 w-[500px] h-[300px] bg-primary/5 rounded-full blur-3xl opacity-50" />

			<div className="max-w-[1320px] mx-auto px-6 md:px-8">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
					className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-4">
					<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary shadow-xs">
						<Sparkles className="size-3.5" />
						<span>Got Questions?</span>
					</div>

					<h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
						Frequently Asked Questions
					</h2>

					<p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
						Everything you need to know about using Docs UI, component integration,
						licensing, and custom styling.
					</p>
				</motion.div>

				{/* Animated FAQ Block */}
				<motion.div
					initial={{ opacity: 0, y: 25 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.7, delay: 0.15 }}>
					<AnimatedFAQBlock />
				</motion.div>
			</div>
		</section>
	);
}

/* ═══════════════════════════════════════════════
   SECTION 7: RE-DESIGNED PREMIUM CTA BANNER
   ═══════════════════════════════════════════════ */

function CTASection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-40px" });
	const [copied, setCopied] = useState(false);
	const [, setTypedText] = useState("");
	const fullCommand = "npx shadcn@latest add @algorize-ui/button";

	useEffect(() => {
		let index = 0;
		let isDeleting = false;
		const interval = setInterval(() => {
			if (!isDeleting) {
				setTypedText(fullCommand.slice(0, index + 1));
				index++;
				if (index === fullCommand.length) {
					isDeleting = true;
					setTimeout(() => {}, 2000);
				}
			} else {
				setTypedText(fullCommand.slice(0, index - 1));
				index--;
				if (index === 0) {
					isDeleting = false;
				}
			}
		}, 120);

		return () => clearInterval(interval);
	}, []);

	const handleCopy = () => {
		const textToCopy = fullCommand;
		if (navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard
				.writeText(textToCopy)
				.then(() => {
					setCopied(true);
					setTimeout(() => setCopied(false), 2000);
				})
				.catch(() => {
					fallbackCopy(textToCopy);
				});
		} else {
			fallbackCopy(textToCopy);
		}
	};

	const fallbackCopy = (text: string) => {
		const textArea = document.createElement("textarea");
		textArea.value = text;
		document.body.appendChild(textArea);
		textArea.select();
		try {
			document.execCommand("copy");
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Copy failed", err);
		}
		document.body.removeChild(textArea);
	};

	return (
		<section
			ref={ref}
			className="py-12 md:py-16 relative overflow-hidden">
			{/* Dynamic Background Mesh */}
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

			<motion.div
				initial={{ opacity: 0, y: 40, scale: 0.98 }}
				animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
				transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
				className={cn(SECTION_INNER, "relative")}>
				<div className="relative rounded-3xl overflow-hidden border border-foreground/[0.06] bg-gradient-to-b from-primary/5 via-card to-primary/10 px-5 py-10 sm:p-12 md:p-16 text-foreground">
					{/* Glowing Radial Mesh Accents */}
					<div className="absolute top-0 right-0 size-96 rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
					<div className="absolute bottom-0 left-0 size-96 rounded-full bg-primary/15 blur-[120px] pointer-events-none" />

					{/* Subtle Background Radial Grid for Depth */}
					<div className="absolute inset-0 bg-[radial-gradient(var(--primary)_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-[0.08] pointer-events-none" />

					{/* Centered Content Container */}
					<div className="relative z-10 text-center flex flex-col items-center max-w-3xl mx-auto space-y-6">
						<div className={EYEBROW_PILL}>
							<Sparkles className="size-3.5 text-primary" />
							<span>Developer-First Component Library</span>
						</div>

						<h2 className="font-serif font-normal text-[clamp(24px,3.2vw,42px)] leading-[1.12] tracking-[-0.02em] text-foreground">
							Build Next-Gen <br className="hidden sm:block" />
							<span className="text-primary">React Interfaces Today.</span>
						</h2>

						<p className={SECTION_SUB}>
							Designed for the shadcn/ui &amp; Tailwind CSS ecosystem. Install
							fully responsive, accessible, and animated UI components.
						</p>

						{/* Interactive CLI Quick Copy Pill Box */}
						<div className="w-full max-w-md pt-1">
							<div
								onClick={handleCopy}
								title="Click to copy command"
								className="flex items-center justify-between gap-3 px-4.5 py-3 rounded-xl border border-foreground/[0.06] bg-background/90 hover:border-primary/40 transition-all cursor-pointer group font-mono text-[12px] sm:text-[13px] text-foreground backdrop-blur-md">
								<div className="flex items-center gap-2.5 overflow-hidden">
									<span className="text-primary font-semibold font-mono text-[13px] cursor-pointer">
										&gt;_
									</span>
									<span className="font-medium truncate group-hover:text-primary transition-colors">
										npx shadcn@latest add @algorize-ui/button
									</span>
								</div>
								<div className="flex items-center gap-2 shrink-0">
									<div className="h-4 w-px bg-border" />
									<button
										type="button"
										className="p-1.5 rounded-lg group-hover:bg-primary/15 text-foreground/40 group-hover:text-primary transition-all cursor-pointer">
										{copied ? (
											<Check className="size-4 text-emerald-500" />
										) : (
											<Copy className="size-4" />
										)}
									</button>
								</div>
							</div>
							<p className="mt-2.5 text-[12px] text-foreground/40">
								New project? Register the registry once with{" "}
								<Link
									href="/docs/nextjs/installation#step-2-register-the-registry"
									className="font-mono text-primary hover:underline">
									shadcn registry add @algorize-ui=…
								</Link>
							</p>
						</div>

						{/* Feature Badges Strip */}
						<div className="flex flex-wrap items-center justify-center gap-2 text-[12px] font-medium text-foreground/60 pt-1">
							<span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/[0.04]">
								<CheckCircle2 className="size-3.5 text-primary" /> Free Forever
							</span>
							<span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/[0.04]">
								<CheckCircle2 className="size-3.5 text-primary" /> Fully
								Customizable
							</span>
							<span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/[0.04]">
								<CheckCircle2 className="size-3.5 text-primary" /> 100% Type-Safe
							</span>
						</div>

						{/* Action Buttons */}
						<div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full sm:w-auto">
							<Link
								href="/docs/nextjs/all-components"
								className={cn(BTN_CLAY, "w-full sm:w-auto active:scale-[0.98] transition-all")}>
								Browse All Components
								<ArrowRight className="size-4" />
							</Link>
							<Link
								href={links.github}
								target="_blank"
								className={cn(BTN_SOFT, "w-full sm:w-auto active:scale-[0.98] transition-all")}>
								<Github className="size-4" />
								<span>Star on GitHub</span>
								<span className={cn(CHIP, "ml-1 font-mono")}>
									2.1k
								</span>
							</Link>
						</div>
					</div>
				</div>
			</motion.div>
		</section>
	);
}

/* ═══════════════════════════════════════════════
   SECTION 7: FOOTER
   ═══════════════════════════════════════════════ */

const FOOTER_GROUPS: {
	label: string;
	links: { label: string; href: string; external?: boolean }[];
}[] = [
	{
		label: "Docs",
		links: [
			{ label: "Documentation", href: "/docs/nextjs/index" },
			{ label: "All components", href: "/docs/nextjs/all-components" },
			{ label: "Installation", href: "/docs/nextjs/installation" },
		],
	},
	{
		label: "Connect",
		links: [
			{ label: "GitHub", href: links.github, external: true },
			{
				label: "LinkedIn",
				href: "https://www.linkedin.com/company/algorizetech/",
				external: true,
			},
		],
	},
];

function FooterSection() {
	return (
		<footer className="border-t border-foreground/[0.06] bg-background overflow-hidden">
			<div className={cn(SECTION_INNER, "pt-16 pb-6")}>
				<div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
					<div className="max-w-[280px]">
						<div className="flex items-center gap-2.5">
							<div className="size-7 rounded-lg bg-primary/15 flex items-center justify-center">
								<Layers className="size-3.5 text-primary" />
							</div>
							<span className="text-[14px] font-semibold text-foreground">
								Docs UI
							</span>
						</div>
						<p className="mt-3 text-[13px] leading-[1.65] text-foreground/45">
							React components and interactive blocks, installed through the
							shadcn CLI.
						</p>
					</div>

					<nav
						aria-label="Footer"
						className="grid grid-cols-2 gap-x-12 gap-y-8 sm:gap-x-16">
						{FOOTER_GROUPS.map((group) => (
							<div key={group.label}>
								<p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.05em] text-foreground/40">
									{group.label}
								</p>
								<ul className="flex flex-col">
									{group.links.map((link) => (
										<li key={link.label}>
											<Link
												href={link.href}
												{...(link.external && {
													target: "_blank",
													rel: "noopener noreferrer",
												})}
												className="inline-block py-1 text-[13px] font-medium text-foreground/70 hover:text-foreground transition-colors">
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</nav>
				</div>

				{/* Wordmark */}
				<div
					aria-hidden
					className="mt-14 select-none whitespace-nowrap font-serif font-bold text-[clamp(44px,13vw,160px)] leading-none tracking-[-0.04em] text-foreground/25">
					Docs <span className="text-primary opacity-80">UI</span>
				</div>

				<div className="mt-6 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between text-[12px] text-foreground/40">
					<span>
						Built by{" "}
						<Link
							href="https://algorizetech.com"
							target="_blank"
							rel="noopener noreferrer"
							className="font-medium text-foreground/70 hover:text-foreground transition-colors">
							AlgorizeTech
						</Link>
					</span>
					<span>Free and open source.</span>
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
		<div className="min-h-screen bg-background text-foreground selection:bg-primary/20 overflow-x-hidden font-site-sans">
			<HeroSection />
			<ComponentShowcase />
			<WhyChooseUsSection />
			<ComponentPreviewGridSection />
			<FeedbackSection />
			<AnimatedFAQSection />
			<CTASection />
			<FooterSection />
		</div>
	);
}
