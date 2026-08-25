"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export type ReviewsVariant = "globe-marquee";

export interface ReviewItem {
	id: string;
	name: string;
	role: string;
	avatar?: string;
	rating: number;
	content: string;
}

export interface ReviewsProps {
	variant?: ReviewsVariant;
	title?: string;
	subtitle?: string;
	reviews?: ReviewItem[];
	className?: string;
	glowColor?: string;
}

const DEFAULT_REVIEWS: ReviewItem[] = [
	{
		id: "1",
		name: "Alice Johnson",
		role: "Product Owner",
		avatar:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
		rating: 5.0,
		content:
			"The difference between AlgorizeTech and other agencies is their talent pool. You actually work with the senior developers they pitch you. The code quality, architecture, and attention to detail are on a completely different level.",
	},
	{
		id: "2",
		name: "Jane Smith",
		role: "Marketing Manager",
		avatar:
			"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
		rating: 5.0,
		content:
			"Having a Dedicated PM made this the most stress-free project of my career. I never had to chase them for updates, and they translated our complex business requirements into elegant technical solutions effortlessly.",
	},
	{
		id: "3",
		name: "Arlene McCoy",
		role: "Co-Founder",
		avatar:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
		rating: 5.0,
		content:
			"Their 'Quality Obsessed' mantra is apparent in everything they do. They pushed back on bad ideas, suggested better alternatives, and delivered a final product that increased our conversion rate by 40% in the first month.",
	},
	{
		id: "4",
		name: "Mr. Martin",
		role: "C&O",
		avatar:
			"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
		rating: 5.0,
		content:
			"The unlimited revisions gave us the creative freedom to truly experiment without worrying about scope creep or hidden fees. AlgorizeTech didn't stop until we were 100% thrilled with the result. A truly rare agency experience.",
	},
	{
		id: "5",
		name: "Sofia Chen",
		role: "Lead Engineer",
		avatar:
			"https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
		rating: 5.0,
		content:
			"Integrating their modular UI components shaved weeks off our launch roadmap. The performance optimizations and accessibility features built right in saved us hundreds of hours.",
	},
];

import createGlobe from "cobe";
import { useTheme } from "next-themes";
import { useThemeCustomizer } from "@/contexts/theme-customizer-context";

// ==========================================
// ULTRA-REALISTIC COBE WEBGL 3D GLOBE
// ==========================================
function CobeRealGlobe({ glowColor }: { glowColor?: string }) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const { resolvedTheme } = useTheme();
	const isDarkMode = resolvedTheme !== "light";
	const [themeTick, setThemeTick] = useState(0);

	// Try reading customizer context if available
	let activePreset: unknown = null;
	try {
		const customizer = useThemeCustomizer();
		activePreset = customizer?.activePreset;
	} catch {
		// safe fallback if not wrapped
	}

	// Listen for live DOM style/class changes (when theme colors update without reload)
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

		// Helper to extract exact computed theme color from CSS --primary or text-primary
		const getPrimaryAccentRgb = (): [number, number, number] => {
			if (typeof window !== "undefined") {
				try {
					const dummy = document.createElement("div");
					dummy.className = "text-primary border-primary";
					document.body.appendChild(dummy);
					const comp = getComputedStyle(dummy).color || getComputedStyle(dummy).borderColor;
					document.body.removeChild(dummy);

					// Parse OKLCH format if returned by Tailwind v4 / Theme Customizer: e.g. oklch(0.627 0.265 303.9)
					if (comp.includes("oklch")) {
						const match = comp.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/);
						if (match) {
							const l = parseFloat(match[1]);
							const c = parseFloat(match[2]);
							const h = parseFloat(match[3]);

							// If chroma is nearly 0 (Neutral theme black/white), return fallback vibrant accent
							if (c < 0.03) {
								return isDarkMode ? [0.4, 0.5, 0.95] : [0.25, 0.45, 0.9];
							}

							// Convert OKLCH -> OKLAB -> Linear RGB -> sRGB
							const hRad = (h * Math.PI) / 180;
							const a = c * Math.cos(hRad);
							const b = c * Math.sin(hRad);

							const l_ = Math.pow(l + 0.3963377774 * a + 0.2158037573 * b, 3);
							const m_ = Math.pow(l - 0.1055613458 * a - 0.0638541728 * b, 3);
							const s_ = Math.pow(l - 0.0894841775 * a - 1.291485548 * b, 3);

							const rLin = +4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_;
							const gLin = -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_;
							const bLin = -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_;

							const toSrgb = (x: number) =>
								x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;

							return [
								Math.max(0, Math.min(1, toSrgb(rLin))),
								Math.max(0, Math.min(1, toSrgb(gLin))),
								Math.max(0, Math.min(1, toSrgb(bLin))),
							];
						}
					}

					// Standard rgb(r, g, b)
					const rgbMatch = comp.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
					if (rgbMatch) {
						return [
							parseInt(rgbMatch[1], 10) / 255,
							parseInt(rgbMatch[2], 10) / 255,
							parseInt(rgbMatch[3], 10) / 255,
						];
					}

					// Canvas fallback
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
			diffuse: isDarkMode ? 1.2 : 1.5,
			mapSamples: 18000,
			mapBrightness: 6,
			mapBaseBrightness: isDarkMode ? 0.05 : 0,
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
	}, [isDarkMode, glowColor, activePreset, themeTick]);

	return (
		<div className="relative flex items-center justify-center pointer-events-none overflow-hidden">
			<canvas
				ref={canvasRef}
				className="relative z-10 w-[360px] h-[360px] sm:w-[750px] sm:h-[750px] max-w-[90vw] aspect-square object-contain rounded-full"
			/>
		</div>
	);
}

// ==========================================
// MAIN REVIEWS BLOCK
// ==========================================
export function ReviewsBlock({
	title = "Loved by Tech Leaders Worldwide",
	subtitle = "See how fast-growing teams scale products with our senior engineering team.",
	reviews = DEFAULT_REVIEWS,
	className,
	glowColor,
}: ReviewsProps) {
	return (
		<section
			className={cn(
				"relative w-full bg-background text-foreground py-12 sm:py-24 px-4 overflow-hidden border-y border-border transition-colors duration-300",
				className,
			)}>
			{/* Self-contained marquee animation styles */}
			<style>{`
				@keyframes reviews-marquee-scroll {
					from { transform: translateX(0); }
					to   { transform: translateX(-50%); }
				}
				.reviews-marquee-track {
					animation: reviews-marquee-scroll 35s linear infinite;
				}
				.reviews-marquee-track:hover {
					animation-play-state: paused;
				}
			`}</style>

			{/* Header Info */}
			{(title || subtitle) && (
				<div className="relative z-20 w-full mx-auto text-center space-y-3 mb-8 sm:mb-12 flex flex-col items-center">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
						<Star className="size-3.5 fill-primary text-primary" /> Client
						Testimonials
					</div>
					{title && (
						<h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
							{title}
						</h2>
					)}
					{subtitle && (
						<p className="text-xs sm:text-base text-muted-foreground w-[90%] max-w-5xl mx-auto leading-relaxed">
							{subtitle}
						</p>
					)}
				</div>
			)}

			{/* GLOBE MARQUEE CONTAINER (Right to Left) */}
			<div className="relative w-full min-h-[420px] sm:min-h-[750px] flex items-center justify-center">
				{/* Centered High-Performance COBE WebGL 3D Globe */}
				<div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
					<CobeRealGlobe glowColor={glowColor} />
				</div>

				{/* Foreground Smooth Right-to-Left Infinite Marquee Container */}
				<div className="relative z-10 w-full overflow-hidden py-6">
					<div className="flex gap-4 sm:gap-6 w-max reviews-marquee-track">
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

									{/* Testimonial Quote - Max 2 lines on small screen */}
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
