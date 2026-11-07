"use client";

import { cn } from "@/lib/utils";
import {
	Code2,
	Layers,
	Paintbrush,
	Sparkles,
	Zap,
	Boxes,
	Share2,
	Cpu,
	GitPullRequest,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { SECTION_INNER, SECTION_H2, SECTION_SUB, CARD_TITLE, CARD_COPY, CARD_SURFACE } from "@/components/home/shared";

/* ═══════════════════════════════════════════════
   SECTION 4: WHY DOCS UI? (USER'S EXACT CUSTOM SECTION)
   ═══════════════════════════════════════════════ */

export function WhyChooseUsSection() {
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
					<h2 className={SECTION_H2}>Why Avara UIIII?</h2>
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
						className={cn(
							"group flex flex-col p-6 md:p-8 rounded-2xl hover:border-primary/30 transition-all duration-700",
							CARD_SURFACE,
						)}>
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
						className={cn(
							"group flex flex-col p-6 md:p-8 rounded-2xl hover:border-primary/30 transition-all duration-700",
							CARD_SURFACE,
						)}>
						<div className="mb-6">
							<h3 className={CARD_TITLE}>Built with Modern Frameworks</h3>
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
										name: "Motion",
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
						className={cn(
							"group flex flex-col p-6 md:p-8 rounded-2xl hover:border-primary/30 transition-all duration-700",
							CARD_SURFACE,
						)}>
						<div className="mb-6">
							<h3 className={CARD_TITLE}>Open Source With Story</h3>
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
						className={cn(
							"group flex flex-col p-6 md:p-8 rounded-2xl hover:border-primary/30 transition-all duration-700",
							CARD_SURFACE,
						)}>
						<div className="mb-6">
							<h3 className={CARD_TITLE}>Build Landing Pages Faster</h3>
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
