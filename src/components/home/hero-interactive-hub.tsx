"use client";

import { ChartBlock } from "@/components/custom/blocks/ChartBlock";
import { cn } from "@/lib/utils";
import { Bot, Check, Copy, Lock, Sparkles, Terminal, BarChart3, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { REGISTRY_ADD_ARGS, REGISTRY_NAMESPACE, REGISTRY_URL_TEMPLATE } from "@/lib/registry";

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

$ npx shadcn@latest ${REGISTRY_ADD_ARGS}
✔ Added registry ${REGISTRY_NAMESPACE} to components.json.

$ npx shadcn@latest add ${REGISTRY_NAMESPACE}/ai-chat
✔ Installed dependencies: lucide-react
✔ Created components/custom/blocks/Ai-chat.tsx

$ npm run dev
▲ Next.js (Turbopack)
- Local: http://localhost:3000
✓ Ready in 1.8s`;

/* ═══════════════════════════════════════════════
   HERO INTERACTIVE HUB (100% FLUID RESPONSIVE PREVIEW)
   ═══════════════════════════════════════════════ */

export function HeroInteractiveHub() {
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
										Hello! Welcome to Avara UI. How can I assist you with your
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
											npx shadcn@latest add {REGISTRY_NAMESPACE}/&lt;name&gt;
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
									{REGISTRY_NAMESPACE}={REGISTRY_URL_TEMPLATE}
								</p>
								<p className="text-emerald-400">
									✔ Added registry {REGISTRY_NAMESPACE} to components.json.
								</p>
								<p className="break-all">
									<span className="text-primary font-semibold">$</span> npx
									shadcn@latest add {REGISTRY_NAMESPACE}/ai-chat
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
