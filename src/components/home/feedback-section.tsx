"use client";

import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { REGISTRY_NAMESPACE } from "@/lib/registry";
import { SECTION_INNER, SECTION_H2, SECTION_SUB, EYEBROW_PILL } from "@/components/home/shared";

/* ═══════════════════════════════════════════════
   SECTION 5.5: FEEDBACK & TESTIMONIALS
   ═══════════════════════════════════════════════ */

interface FeedbackItem {
	id: string;
	name: string;
	role: string;
	company?: string;
	initials: string;
	avatarGradient: string;
	content: string;
	rating: number;
	createdAt: string;
}

function formatRelativeTime(dateInput: string | Date): string {
	const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (Number.isNaN(diffInSeconds) || diffInSeconds < 0) {
		return "just now";
	}
	if (diffInSeconds < 60) {
		return "just now";
	}
	const diffInMinutes = Math.floor(diffInSeconds / 60);
	if (diffInMinutes < 60) {
		return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
	}
	const diffInHours = Math.floor(diffInMinutes / 60);
	if (diffInHours < 24) {
		return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
	}
	const diffInDays = Math.floor(diffInHours / 24);
	if (diffInDays < 7) {
		return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
	}
	const diffInWeeks = Math.floor(diffInDays / 7);
	if (diffInWeeks < 4) {
		return `${diffInWeeks} ${diffInWeeks === 1 ? "week" : "weeks"} ago`;
	}
	const diffInMonths = Math.floor(diffInDays / 30);
	if (diffInMonths < 12) {
		return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`;
	}
	const diffInYears = Math.floor(diffInDays / 365);
	return `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`;
}

/* Three reviews with fixed ISO timestamps so the relative time ('2 days ago', '4 days ago', etc.) updates automatically every day. */
const FEEDBACK: FeedbackItem[] = [
	{
		id: "fb-2",
		name: "Sadiqur Rahman",
		role: "Frontend Engineer",
		company: "Techvence",
		initials: "SR",
		avatarGradient:
			"from-blue-500/20 to-indigo-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30",
		content: `Ran the 'npx shadcn@latest add ${REGISTRY_NAMESPACE}/...' command in my Next.js 15 app. The code dropped directly into my components folder with zero dependency issues. Pure bliss.`,
		rating: 5,
		createdAt: "2026-10-03T10:00:00Z",
	},
	{
		id: "fb-5",
		name: "Abdullah Al Mamun",
		role: "Full Stack Developer",
		company: "Helen AI",
		initials: "AM",
		avatarGradient:
			"from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
		content:
			"Finally a component collection where motion design feels purposeful, not distracting. The hover states, button springs, and tabs have so much character.",
		rating: 5,
		createdAt: "2026-10-01T14:30:00Z",
	},
	{
		id: "fb-13",
		name: "Shuvo Sarkar",
		role: "Software Engineer",
		company: "Victory Vector",
		initials: "SS",
		avatarGradient:
			"from-purple-500/20 to-pink-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30",
		content:
			"The way these components leverage Tailwind CSS variables makes theme customization so simple. It matched our existing design tokens in minutes.",
		rating: 5,
		createdAt: "2026-09-28T09:15:00Z",
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
		<div className="group relative w-full p-5 sm:p-6 rounded-2xl bg-card border border-foreground/[0.06] hover:border-primary/40 shadow-2xs hover:shadow-xl hover:shadow-primary/5 transition-colors transition-shadow duration-200 flex flex-col justify-between select-none cursor-pointer">
			{/* Subtle top border shimmer on hover */}
			<div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

			{/* Top Bar: User Profile Header */}
			<div className="flex items-start justify-between gap-3 mb-3.5">
				<div className="flex items-center gap-3 min-w-0">
					{/* User Avatar with initials */}
					<div className="relative shrink-0">
						<div
							className={cn(
								"size-10 sm:size-11 rounded-full bg-gradient-to-br flex items-center justify-center font-bold text-[13px] sm:text-[14px] tracking-tight border shadow-xs transition-all duration-300 group-hover:scale-105",
								item.avatarGradient,
							)}>
							{item.initials}
						</div>
						<span className="absolute bottom-0 right-0 size-2.5 bg-emerald-500 rounded-full ring-2 ring-card" />
					</div>
					<div className="min-w-0">
						<div className="flex items-center gap-1.5">
							<span className="text-[14px] font-semibold text-foreground truncate group-hover:text-primary transition-colors">
								{item.name}
							</span>
							{/* Facebook Verified Badge */}
							<svg
								viewBox="0 0 24 24"
								className="size-3.5 shrink-0"
								aria-label="Verified User">
								<title>Verified User</title>
								<path
									fill="#1877F2"
									d="M12 2.1l2.2 2.2 3.1-.3 1.3 2.8 2.8 1.3-.3 3.1 2.2 2.2-2.2 2.2.3 3.1-2.8 1.3-1.3 2.8-3.1-.3L12 21.9l-2.2-2.2-3.1.3-1.3-2.8-2.8-1.3.3-3.1L0.7 12l2.2-2.2-.3-3.1 2.8-1.3 1.3-2.8 3.1.3L12 2.1z"
								/>
								<path
									d="M8.8 12.2l2.4 2.4 5.2-5.2"
									fill="none"
									stroke="#ffffff"
									strokeWidth="2.2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
						<p className="text-[12px] text-muted-foreground truncate">
							{item.role}
						</p>
					</div>
				</div>
			</div>

			{/* Review Quote Body (Consistently 3 lines) */}
			<p className="text-[13px] text-foreground/60 leading-[1.65] font-normal mb-4 line-clamp-3 min-h-[4.1rem]">
				"{item.content}"
			</p>

			{/* Bottom Bar: 5-Stars Rating + Dynamic Relative Date */}
			<div className="flex items-center justify-between gap-2 pt-3 border-t border-foreground/[0.06] text-xs">
				<RatingStars rating={item.rating} />

				<span
					className="text-[11px] font-medium text-foreground/45"
					suppressHydrationWarning>
					{formatRelativeTime(item.createdAt)}
				</span>
			</div>
		</div>
	);
}

export function FeedbackSection() {
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
					<h2 className={SECTION_H2}>What developers are saying</h2>
					<p className={cn(SECTION_SUB, "mx-auto")}>
						Real impressions and feedback from developers and designers
						exploring Avara UI.
					</p>
				</motion.div>
			</div>

			{/* Three fixed reviews */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={isInView ? { opacity: 1 } : {}}
				transition={{ duration: 0.8, delay: 0.2 }}
				className={cn(
					SECTION_INNER,
					"grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3",
				)}>
				{FEEDBACK.map((item) => (
					<FeedbackCard key={item.id} item={item} />
				))}
			</motion.div>
		</section>
	);
}
