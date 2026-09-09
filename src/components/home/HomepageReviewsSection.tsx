"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import createGlobe from "cobe";
import { useTheme } from "next-themes";

export interface ReviewItem {
	id: string;
	name: string;
	role: string;
	avatar?: string;
	rating: number;
	content: string;
}

const DEFAULT_REVIEWS: ReviewItem[] = [
	{
		id: "1",
		name: "Tamar Mendelson",
		role: "Restaurant Critic",
		avatar:
			"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
		rating: 5.0,
		content:
			"I was impressed by the food! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive. I'll definitely be back for more!",
	},
	{
		id: "2",
		name: "Alice Johnson",
		role: "Product Director",
		avatar:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
		rating: 5.0,
		content:
			"The difference between AlgorizeTech and other agencies is their talent pool. You actually work with the senior developers they pitch you. The code quality, architecture, and attention to detail are on a completely different level.",
	},
	{
		id: "3",
		name: "Arlene McCoy",
		role: "Co-Founder & CEO",
		avatar:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
		rating: 5.0,
		content:
			"Their 'Quality Obsessed' mantra is apparent in everything they do. They pushed back on bad ideas, suggested better alternatives, and delivered a final product that increased our conversion rate by 40% in the first month.",
	},
	{
		id: "4",
		name: "Sofia Chen",
		role: "Lead Systems Architect",
		avatar:
			"https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
		rating: 5.0,
		content:
			"Integrating their modular UI components shaved weeks off our launch roadmap. The performance optimizations and accessibility features built right in saved us hundreds of hours.",
	},
	{
		id: "5",
		name: "Mr. Martin",
		role: "Chief Operating Officer",
		avatar:
			"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
		rating: 5.0,
		content:
			"The unlimited revisions gave us the creative freedom to truly experiment without worrying about scope creep or hidden fees. AlgorizeTech didn't stop until we were 100% thrilled with the result.",
	},
	{
		id: "6",
		name: "David Kim",
		role: "Head of Design",
		avatar:
			"https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
		rating: 5.0,
		content:
			"The attention to typography, micro-interactions, and responsive layout scaling surpassed all our expectations.",
	},
	{
		id: "7",
		name: "Elena Rostova",
		role: "VP of Engineering",
		avatar:
			"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
		rating: 5.0,
		content:
			"Their components are bulletproof. Seamless dark mode integration and flawless animation physics out of the box.",
	},
	{
		id: "8",
		name: "Marcus Vance",
		role: "Tech Lead",
		avatar:
			"https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80",
		rating: 5.0,
		content:
			"Outstanding developer experience. Clean TypeScript types, modular exports, and instant setup across projects.",
	},
];

function CobeGlobe() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const { resolvedTheme } = useTheme();
	const isDarkMode = resolvedTheme !== "light";
	const [themeTick, setThemeTick] = useState(0);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const observer = new MutationObserver(() => {
			setThemeTick((t) => t + 1);
		});
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["style", "class"],
		});
		observer.observe(document.body, {
			attributes: true,
			attributeFilter: ["style", "class"],
		});
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		let phi = 0;
		let animId: number;
		const canvas = canvasRef.current;
		if (!canvas) return;

		const getPrimaryAccentRgb = (): [number, number, number] => {
			if (typeof window !== "undefined") {
				try {
					const dummy = document.createElement("div");
					dummy.className = "text-primary border-primary";
					document.body.appendChild(dummy);
					const comp =
						getComputedStyle(dummy).color ||
						getComputedStyle(dummy).borderColor;
					document.body.removeChild(dummy);

					if (comp.includes("oklch")) {
						const match = comp.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/);
						if (match) {
							const l = parseFloat(match[1]);
							const c = parseFloat(match[2]);
							const h = parseFloat(match[3]);

							if (c < 0.03) {
								return isDarkMode ? [0.4, 0.5, 0.95] : [0.25, 0.45, 0.9];
							}

							const hRad = (h * Math.PI) / 180;
							const a = c * Math.cos(hRad);
							const b = c * Math.sin(hRad);

							const l_ = Math.pow(l + 0.3963377774 * a + 0.2158037573 * b, 3);
							const m_ = Math.pow(l - 0.1055613458 * a - 0.0638541728 * b, 3);
							const s_ = Math.pow(l - 0.0894841775 * a - 1.291485548 * b, 3);

							const rLin =
								+4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_;
							const gLin =
								-1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_;
							const bLin =
								-0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_;

							const toSrgb = (x: number) =>
								x <= 0.0031308
									? 12.92 * x
									: 1.055 * Math.pow(x, 1 / 2.4) - 0.055;

							return [
								Math.max(0, Math.min(1, toSrgb(rLin))),
								Math.max(0, Math.min(1, toSrgb(gLin))),
								Math.max(0, Math.min(1, toSrgb(bLin))),
							];
						}
					}

					const rgbMatch = comp.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
					if (rgbMatch) {
						return [
							parseInt(rgbMatch[1], 10) / 255,
							parseInt(rgbMatch[2], 10) / 255,
							parseInt(rgbMatch[3], 10) / 255,
						];
					}

					const ctx = document.createElement("canvas").getContext("2d");
					if (ctx && comp) {
						ctx.fillStyle = comp;
						const hex = ctx.fillStyle;
						if (hex.startsWith("#") && hex.length === 7) {
							return [
								parseInt(hex.slice(1, 3), 16) / 255,
								parseInt(hex.slice(3, 5), 16) / 255,
								parseInt(hex.slice(5, 7), 16) / 255,
							];
						}
					}
				} catch {
					// fallback
				}
			}
			return isDarkMode ? [0.4, 0.5, 0.95] : [0.25, 0.45, 0.9];
		};

		const accentRgb = getPrimaryAccentRgb();

		const globe = createGlobe(canvas, {
			devicePixelRatio: 2,
			width: 1000 * 2,
			height: 1000 * 2,
			phi: 0,
			theta: 0.2,
			dark: isDarkMode ? 1 : 0,
			diffuse: 1.2,
			mapSamples: 18000,
			mapBrightness: isDarkMode ? 6 : 2.5,
			mapBaseBrightness: 0,
			baseColor: isDarkMode ? [0.05, 0.05, 0.07] : [1, 1, 1],
			markerColor: accentRgb,
			glowColor: accentRgb,
			markers: [],
		});

		const loop = () => {
			phi += 0.004;
			globe.update({ phi });
			animId = requestAnimationFrame(loop);
		};
		loop();

		return () => {
			cancelAnimationFrame(animId);
			globe.destroy();
		};
	}, [isDarkMode, themeTick]);

	return (
		<div className="relative flex items-center justify-center pointer-events-none overflow-hidden">
			<canvas
				ref={canvasRef}
				className="relative z-10 w-[360px] h-[360px] sm:w-[720px] sm:h-[720px] xl:w-[920px] xl:h-[920px] max-w-[95vw] aspect-square object-contain rounded-full"
			/>
		</div>
	);
}

export function HomepageReviewsSection({
	title = "Loved by Tech Leaders Worldwide",
	subtitle = "See how fast-growing teams scale products with our senior engineering team.",
	reviews = DEFAULT_REVIEWS,
	className,
}: {
	title?: string;
	subtitle?: string;
	reviews?: ReviewItem[];
	className?: string;
}) {
	return (
		<section
			className={cn(
				"relative w-full bg-background text-foreground py-12 sm:py-20 px-4 overflow-hidden transition-colors duration-300",
				className,
			)}>
			<style>{`
				@keyframes homepage-reviews-marquee-scroll {
					from { transform: translateX(0); }
					to   { transform: translateX(-50%); }
				}
				.homepage-reviews-marquee-track {
					animation: homepage-reviews-marquee-scroll 70s linear infinite;
				}
				.homepage-reviews-marquee-track:hover {
					animation-play-state: paused;
				}
			`}</style>

			{/* Header Info */}
			{(title || subtitle) && (
				<div className="relative z-20 max-w-[1320px] mx-auto w-full px-4 md:px-6 text-left space-y-3 mb-8 sm:mb-12 flex flex-col items-start">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
						<Star className="size-3.5 fill-primary text-primary" /> Client
						Testimonials
					</div>
					{title && (
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
							{title}
						</h2>
					)}
					{subtitle && (
						<p className="text-xs sm:text-base text-muted-foreground max-w-2xl leading-relaxed font-normal">
							{subtitle}
						</p>
					)}
				</div>
			)}

			<div className="relative w-full min-h-[420px] sm:min-h-[720px] xl:min-h-[860px] flex items-center justify-center">
				{/* Centered High-Performance COBE WebGL 3D Globe */}
				<div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
					<CobeGlobe />
				</div>

				{/* Foreground Smooth Right-to-Left Infinite Marquee Container */}
				<div className="relative z-10 w-full overflow-hidden py-6">
					<div className="flex gap-4 sm:gap-6 w-max homepage-reviews-marquee-track">
						{[
							...reviews,
							...reviews,
							...reviews,
							...reviews,
							...reviews,
							...reviews,
						].map((review, idx) => (
							<div
								key={`${review.id}-${idx}`}
								className="w-[210px] xs:w-[240px] sm:w-[380px] shrink-0 p-3 sm:p-7 rounded-lg sm:rounded-2xl bg-card text-card-foreground border border-border transition-all duration-300 hover:border-primary/60 group flex flex-col justify-between">
								<div className="space-y-2 sm:space-y-4">
									{/* Rating Stars & Badge */}
									<div className="flex items-center gap-1">
										<div className="flex items-center text-primary gap-0.5">
											{Array.from({ length: 5 }).map((_, i) => (
												<Star
													key={i}
													className="size-3 sm:size-4 fill-primary text-primary"
												/>
											))}
										</div>
										<span className="text-[11px] sm:text-xs font-bold text-primary ml-0.5">
											{review.rating.toFixed(1)}
										</span>
									</div>

									{/* Testimonial Quote */}
									<p className="text-[11px] sm:text-sm text-muted-foreground leading-snug sm:leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
										"{review.content}"
									</p>
								</div>

								{/* Customer Info Footer */}
								<div className="pt-3 sm:pt-5 mt-2 sm:mt-4 border-t border-border flex items-center gap-2 sm:gap-3">
									{review.avatar ? (
										<img
											src={review.avatar}
											alt={review.name}
											className="size-7 sm:size-10 rounded-full object-cover border border-primary/30"
										/>
									) : (
										<div className="size-7 sm:size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs sm:text-sm">
											{review.name.charAt(0)}
										</div>
									)}
									<div className="min-w-0">
										<h4 className="text-[11px] sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
											{review.name}
										</h4>
										<p className="text-[10px] sm:text-[11px] text-primary/90 font-medium truncate">
											{review.role}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

export default HomepageReviewsSection;
