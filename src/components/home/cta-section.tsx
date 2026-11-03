"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, Check, Copy, Github, Sparkles } from "lucide-react";
import { motion, useInView } from "motion/react";
import Link from "@/components/site/intent-link";
import { useRef, useState } from "react";
import { COMPONENT_COUNT, links } from "@/config/site";
import { REGISTRY_ADD_ARGS } from "@/lib/registry";
import { SECTION_INNER } from "@/components/home/shared";

/* ═══════════════════════════════════════════════
   SECTION 7: RE-DESIGNED PREMIUM CTA BANNER
   ═══════════════════════════════════════════════ */

function NpmTabIcon({ active }: { active: boolean }) {
	return (
		<svg
			className={cn(
				"size-3.5 shrink-0 transition-colors",
				active ? "text-[#E53E3E]" : "text-muted-foreground",
			)}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
			<path d="m3.3 7 8.7 5 8.7-5" />
			<path d="M12 22V12" />
		</svg>
	);
}

function PnpmTabIcon({ active }: { active: boolean }) {
	return (
		<svg
			className={cn(
				"size-3.5 shrink-0 transition-colors",
				active ? "text-foreground" : "text-muted-foreground",
			)}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path d="M12 2L7 5v5l5-3 5 3V5l-5-3z" />
			<path d="M7 10L2 13v5l5-3 5 3v-5l-5-3z" />
			<path d="M17 10l-5 3v5l5-3 5 3v-5l-5-3z" />
		</svg>
	);
}

function YarnTabIcon({ active }: { active: boolean }) {
	return (
		<svg
			className={cn(
				"size-3.5 shrink-0 transition-colors",
				active ? "text-foreground" : "text-muted-foreground",
			)}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round">
			<path d="M12 5.5c-4.2 0-7.5 2.8-7.5 7 0 3.2 2.3 6 5.5 6.8V21h4v-1.7c3.2-.8 5.5-3.6 5.5-6.8 0-4.2-3.3-7-7.5-7z" />
			<path d="M6 7.5L4 3.5l4.5 1.5M18 7.5l2-4-4.5 1.5" />
			<circle cx="9" cy="12.5" r="0.8" fill="currentColor" />
			<circle cx="15" cy="12.5" r="0.8" fill="currentColor" />
		</svg>
	);
}

function BunTabIcon({ active }: { active: boolean }) {
	return (
		<svg
			className={cn(
				"size-3.5 shrink-0 transition-colors",
				active ? "text-foreground" : "text-muted-foreground",
			)}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
		</svg>
	);
}

export function CTASection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-40px" });
	const [activePkg, setActivePkg] = useState<"npm" | "pnpm" | "yarn" | "bun">(
		"npm",
	);
	const [copied, setCopied] = useState(false);

	const PKG_MANAGERS = [
		{ id: "npm", label: "npm", icon: NpmTabIcon },
		{ id: "pnpm", label: "pnpm", icon: PnpmTabIcon },
		{ id: "yarn", label: "yarn", icon: YarnTabIcon },
		{ id: "bun", label: "bun", icon: BunTabIcon },
	] as const;

	const COMMANDS: Record<"npm" | "pnpm" | "yarn" | "bun", string> = {
		npm: `npx shadcn@latest ${REGISTRY_ADD_ARGS}`,
		pnpm: `pnpm dlx shadcn@latest ${REGISTRY_ADD_ARGS}`,
		yarn: `yarn dlx shadcn@latest ${REGISTRY_ADD_ARGS}`,
		bun: `bunx --bun shadcn@latest ${REGISTRY_ADD_ARGS}`,
	};

	const currentCommand = COMMANDS[activePkg];

	const handleCopy = () => {
		const textToCopy = currentCommand;
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
			className="py-16 md:py-24 relative bg-background border-t border-border/60">
			<motion.div
				initial={{ opacity: 0, y: 25 }}
				animate={isInView ? { opacity: 1, y: 0 } : {}}
				transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
				className={cn(SECTION_INNER, "relative z-10")}>
				{/* Clean Architectural Container — 100% Shadow Free */}
				<div className="rounded-3xl border border-border bg-card/50 overflow-hidden">
					{/* Blueprint Top Status Bar */}
					<div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 border-b border-border bg-muted/20 font-mono text-xs text-muted-foreground">
						<div className="flex items-center gap-2">
							<span className="size-2 rounded-full bg-emerald-500" />
							<span className="font-semibold text-foreground/80">Docs-UI</span>
							<span className="text-border">/</span>
							<span>Production-Ready</span>
						</div>
						<div className="flex items-center gap-4 text-[11px]">
							<span>{COMPONENT_COUNT} Components</span>
							<span className="hidden sm:inline text-border">•</span>
							<span className="hidden sm:inline">MIT License</span>
							<span className="text-border">•</span>
							<span>React 19 & Next.js 15</span>
						</div>
					</div>

					{/* Main Narrative Area */}
					<div className="p-8 sm:p-12 md:p-16 text-center max-w-4xl mx-auto flex flex-col items-center">
						{/* Clean Status Pill */}
						<div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-border bg-background text-xs font-medium text-foreground mb-8 sm:mb-10">
							<Sparkles className="size-3.5 text-primary" />
							<span>Built on shadcn/ui • {COMPONENT_COUNT} Components</span>
						</div>

						{/* Crisp Typography - Top Line in Text Color, Bottom Line in Theme Color */}
						<h2 className="font-serif font-normal tracking-[-0.03em] mb-4">
							<span className="block text-[clamp(24px,3.2vw,36px)] leading-[1.2] text-foreground mb-1.5">
								Everything You Need To Craft
							</span>
							<span className="block text-[clamp(38px,5.5vw,66px)] leading-[1.08] text-primary">
								World-Class Web Apps.
							</span>
						</h2>

						{/* Subtitle / Description mentioning shadcn/ui */}
						<p className="text-[15px] sm:text-[16px] leading-[1.65] text-muted-foreground max-w-2xl mb-8">
							An open collection of {COMPONENT_COUNT} animated UI components
							built on top of{" "}
							<span className="text-foreground font-semibold">shadcn/ui</span>,
							Tailwind CSS, and TypeScript. Copy clean, battle-tested code
							straight into your codebase with zero dependency lock-in and zero
							runtime bloat.
						</p>

						{/* Flat Multi-Package CLI Bar (4 Packages with Icons, active indicator & Copy Icon ONLY) */}
						<div className="w-full max-w-2xl mb-8 rounded-xl border border-border bg-background overflow-hidden text-left">
							{/* Top Tab Bar: npm, pnpm, yarn, bun */}
							<div className="flex items-center gap-5 sm:gap-6 px-4 border-b border-border bg-muted/20">
								{PKG_MANAGERS.map((pkg) => {
									const active = activePkg === pkg.id;
									const Icon = pkg.icon;
									return (
										<button
											key={pkg.id}
											type="button"
											onClick={() => setActivePkg(pkg.id)}
											className={cn(
												"flex items-center gap-2 py-2.5 text-xs sm:text-[13px] font-medium transition-colors relative cursor-pointer",
												active
													? "text-foreground font-semibold"
													: "text-muted-foreground hover:text-foreground",
											)}>
											<Icon active={active} />
											<span>{pkg.label}</span>
											{active && (
												<span className="absolute -bottom-[1px] inset-x-0 h-0.5 bg-primary rounded-full" />
											)}
										</button>
									);
								})}
							</div>

							{/* Command Snippet Row with Copy Icon ONLY */}
							<div className="flex items-center justify-between gap-3 px-4 py-3 font-mono text-xs sm:text-[13px] bg-background">
								<div className="flex items-center gap-2.5 min-w-0 overflow-hidden">
									<span className="text-primary font-bold select-none shrink-0">
										$
									</span>
									<span className="font-medium text-foreground truncate select-all">
										{currentCommand}
									</span>
								</div>

								<button
									type="button"
									onClick={handleCopy}
									title={copied ? "Copied!" : "Copy command"}
									className="shrink-0 p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
									aria-label="Copy command">
									{copied ? (
										<Check className="size-4 text-emerald-500" />
									) : (
										<Copy className="size-4" />
									)}
								</button>
							</div>
						</div>

						{/* Flat Action Buttons (Zero Shadow) */}
						<div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
							<Link
								href="/docs/nextjs/all-components"
								className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-foreground text-background hover:bg-foreground/90 font-semibold text-sm transition-colors group">
								<span>Explore {COMPONENT_COUNT} Components</span>
								<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
							</Link>

							<Link
								href={links.github}
								target="_blank"
								className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border bg-background hover:bg-muted text-foreground font-medium text-sm transition-colors">
								<Github className="size-4" />
								<span>Star on GitHub</span>
								{/* <div className="inline-flex items-center gap-1 pl-1 text-xs font-mono text-foreground/70 font-semibold">
									<Star className="size-3 fill-amber-400 text-amber-400" />
									<span>2.1k</span>
								</div> */}
							</Link>
						</div>
					</div>

					{/* Bottom 3-Column Architectural Spec Grid */}
					<div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border border-t border-border bg-muted/10">
						<div className="p-6 sm:p-8 text-left">
							<span className="text-[11px] font-mono text-primary font-semibold tracking-wider uppercase">
								01 / FOUNDATION
							</span>
							<h3 className="text-sm font-bold text-foreground mt-2">
								Built on shadcn/ui
							</h3>
							<p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
								Native compatibility with components.json, Tailwind CSS, and the
								shadcn CLI registry ecosystem.
							</p>
						</div>

						<div className="p-6 sm:p-8 text-left">
							<span className="text-[11px] font-mono text-primary font-semibold tracking-wider uppercase">
								02 / INTERACTION
							</span>
							<h3 className="text-sm font-bold text-foreground mt-2">
								Hardware Accelerated
							</h3>
							<p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
								Silky 60 FPS transitions powered by Motion springs and native
								Tailwind CSS transforms.
							</p>
						</div>

						<div className="p-6 sm:p-8 text-left">
							<span className="text-[11px] font-mono text-primary font-semibold tracking-wider uppercase">
								03 / ECOSYSTEM
							</span>
							<h3 className="text-sm font-bold text-foreground mt-2">
								Full Stack Compatibility
							</h3>
							<p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
								Engineered and tested for Next.js 15 App Router, React 19, and
								Tailwind CSS v4 & v3.
							</p>
						</div>
					</div>
				</div>
			</motion.div>
		</section>
	);
}
