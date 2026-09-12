"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import createGlobe from "cobe";
import { useTheme } from "next-themes";

export type ReviewsVariant =
	| "up-down-vertical-marquee"
	| "stacked-carousel"
	| "globe-marquee";

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
	autoSlide?: boolean;
	autoSlideInterval?: number;
	marqueeSpeed?: number;
	className?: string;
	glowColor?: string;
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

// ==========================================
// ULTRA-REALISTIC COBE WEBGL 3D GLOBE
// ==========================================
function CobeRealGlobe({ glowColor }: { glowColor?: string }) {
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
					const comp = getComputedStyle(dummy).color || getComputedStyle(dummy).borderColor;
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
	}, [isDarkMode, glowColor, themeTick]);

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
// 3D STACKED PORTRAIT CAROUSEL VARIANT
// ==========================================
function StackedCardsCarousel({
	reviews,
	autoSlide = true,
	autoSlideInterval = 4000,
}: {
	reviews: ReviewItem[];
	autoSlide?: boolean;
	autoSlideInterval?: number;
}) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	const total = reviews.length;

	// Monitor viewport width to adjust card offsets for small mobile screens
	useEffect(() => {
		const checkScreen = () => {
			if (typeof window !== "undefined") {
				setIsSmallScreen(window.innerWidth < 640);
			}
		};
		checkScreen();
		window.addEventListener("resize", checkScreen);
		return () => window.removeEventListener("resize", checkScreen);
	}, []);

	const handleNext = useCallback(() => {
		setActiveIndex((prev) => (prev + 1) % total);
	}, [total]);

	const handlePrev = useCallback(() => {
		setActiveIndex((prev) => (prev - 1 + total) % total);
	}, [total]);

	// Auto-Slide effect
	useEffect(() => {
		if (!autoSlide || isHovered || total <= 1) return;
		const timer = setInterval(() => {
			handleNext();
		}, autoSlideInterval);
		return () => clearInterval(timer);
	}, [autoSlide, autoSlideInterval, isHovered, total, handleNext]);

	const activeReview = reviews[activeIndex] || reviews[0];

	// Responsive peek offset distances based on screen width
	const peekDistance = isSmallScreen ? 48 : 85;
	const loopDistance = isSmallScreen ? 85 : 130;

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center py-4 sm:py-12 px-3 sm:px-6 overflow-hidden"
		>
			{/* Left Column: Synchronized 3D Cyclic Ring Stage */}
			<div
				className="lg:col-span-6 relative w-full h-[270px] xs:h-[310px] sm:h-[400px] md:h-[440px] flex items-center justify-center select-none overflow-hidden"
				style={{ perspective: "1000px" }}
			>
				{reviews.map((review, idx) => {
					// Relative offset in cyclic orbit ring
					const offset = (idx - activeIndex + total) % total;

					let xOffset: number;
					let yOffset: number;
					let rotateY = 0;
					let rotateZ = 0;
					let scale: number;
					let zIndex: number;
					let opacity: number;

					if (offset === 0) {
						// 1. Center Front Active Card
						xOffset = 0;
						yOffset = 0;
						rotateY = 0;
						rotateZ = 0;
						scale = 1.0;
						zIndex = 30;
						opacity = 1.0;
					} else if (offset === 1 || (total === 2 && offset === 1)) {
						// 2. Right Peek Card
						xOffset = peekDistance;
						yOffset = 6;
						rotateY = -14;
						rotateZ = 5;
						scale = 0.86;
						zIndex = 20;
						opacity = 0.85;
					} else if (offset === total - 1) {
						// 3. Left Peek Card
						xOffset = -peekDistance;
						yOffset = 6;
						rotateY = 14;
						rotateZ = -5;
						scale = 0.86;
						zIndex = 20;
						opacity = 0.85;
					} else if (offset === 2) {
						// 4. Looping Underneath Card (Right -> Bottom Loop)
						xOffset = loopDistance;
						yOffset = 35;
						rotateY = -22;
						rotateZ = 2;
						scale = 0.7;
						zIndex = 5;
						opacity = 0.35;
					} else if (offset === total - 2) {
						// 5. Looping Underneath Card (Left -> Bottom Loop)
						xOffset = -loopDistance;
						yOffset = 35;
						rotateY = 22;
						rotateZ = -2;
						scale = 0.7;
						zIndex = 5;
						opacity = 0.35;
					} else {
						// Off-screen hidden slot for items > 5
						xOffset = 0;
						yOffset = 50;
						scale = 0.6;
						zIndex = 0;
						opacity = 0;
					}

					return (
						<motion.div
							key={review.id}
							initial={false}
							animate={{
								x: xOffset,
								y: yOffset,
								rotateY: rotateY,
								rotateZ: rotateZ,
								scale: scale,
								zIndex: zIndex,
								opacity: opacity,
							}}
							transition={{
								type: "spring",
								stiffness: 170,
								damping: 22,
								mass: 0.8,
							}}
							className="absolute w-[140px] h-[215px] xs:w-[170px] xs:h-[255px] sm:w-[230px] sm:h-[350px] md:w-[250px] md:h-[375px] rounded-[24px] sm:rounded-[28px] overflow-hidden border border-border shadow-none bg-card cursor-pointer transform-gpu"
							onClick={() => {
								if (offset === 1) handleNext();
								if (offset === total - 1) handlePrev();
							}}
						>
							<img
								src={review.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"}
								alt={review.name}
								className="w-full h-full object-cover rounded-[24px] sm:rounded-[28px] pointer-events-none"
							/>
						</motion.div>
					);
				})}
			</div>

			{/* Right Column: Animated Review Content & Navigation Controls */}
			<div className="lg:col-span-6 flex flex-col justify-center items-start space-y-3 sm:space-y-4 font-sans text-left px-2 sm:px-4">
				{/* Rating Stars */}
				<AnimatePresence mode="wait">
					<motion.div
						key={activeReview.id + "-rating"}
						initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
						animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
						exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
						transition={{ duration: 0.25 }}
						className="flex items-center gap-1.5"
					>
						<div className="flex items-center text-amber-500 gap-1">
							{Array.from({ length: 5 }).map((_, i) => (
								<Star
									key={i}
									className="size-3.5 sm:size-4 fill-amber-500 text-amber-500"
								/>
							))}
						</div>
						<span className="text-xs font-bold text-foreground">
							{activeReview.rating.toFixed(1)}
						</span>
					</motion.div>
				</AnimatePresence>

				{/* Reviewer Info */}
				<div className="space-y-0.5 sm:space-y-1">
					<AnimatePresence mode="wait">
						<motion.h3
							key={activeReview.id + "-name"}
							initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
							animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
							exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
							transition={{ duration: 0.3 }}
							className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight"
						>
							{activeReview.name}
						</motion.h3>
					</AnimatePresence>

					<AnimatePresence mode="wait">
						<motion.p
							key={activeReview.id + "-role"}
							initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
							animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
							exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
							transition={{ duration: 0.3, delay: 0.05 }}
							className="text-xs sm:text-base font-medium text-muted-foreground"
						>
							{activeReview.role}
						</motion.p>
					</AnimatePresence>
				</div>

				{/* Review Quote Text */}
				<AnimatePresence mode="wait">
					<motion.p
						key={activeReview.id + "-content"}
						initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
						animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
						exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
						transition={{ duration: 0.35, delay: 0.08 }}
						className="text-sm xs:text-base sm:text-lg md:text-xl text-foreground/90 leading-relaxed font-normal pt-1 sm:pt-2 pb-2 sm:pb-4 max-w-xl min-h-[90px] sm:min-h-[120px]"
					>
						"{activeReview.content}"
					</motion.p>
				</AnimatePresence>

				{/* Circular Arrow Navigation Buttons */}
				<div className="flex items-center gap-3 pt-1 sm:pt-2">
					<button
						type="button"
						onClick={handlePrev}
						className="size-10 sm:size-12 rounded-full bg-foreground text-background hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-lg cursor-pointer"
						aria-label="Previous review"
					>
						<ArrowLeft className="size-4 sm:size-5 stroke-[2.5]" />
					</button>
					<button
						type="button"
						onClick={handleNext}
						className="size-10 sm:size-12 rounded-full bg-foreground text-background hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-lg cursor-pointer"
						aria-label="Next review"
					>
						<ArrowRight className="size-4 sm:size-5 stroke-[2.5]" />
					</button>
				</div>
			</div>
		</div>
	);
}

// ==========================================
// REUSABLE MODERN REVIEW CARD
// ==========================================
function ReviewCard({
	review,
	className,
}: {
	review: ReviewItem;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"relative p-5 sm:p-6 rounded-3xl bg-card border border-border/80 text-card-foreground shadow-sm hover:border-primary hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between overflow-hidden cursor-pointer select-none",
				className
			)}
		>
			{/* Top Bar: Stars Badge + Verified Tag */}
			<div className="flex items-center justify-between gap-2 mb-3">
				<div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full text-amber-500">
					{Array.from({ length: 5 }).map((_, i) => (
						<Star key={i} className="size-3.5 fill-amber-500 text-amber-500" />
					))}
					<span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 ml-1">
						5.0
					</span>
				</div>
				<span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
					Verified
				</span>
			</div>

			{/* Middle Section: Left Accent Line & Review Text */}
			<div className="my-2 border-l-2 border-primary/40 pl-3 py-0.5">
				<p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-medium">
					"{review.content}"
				</p>
			</div>

			{/* Bottom User Bar */}
			<div className="pt-3 mt-2 border-t border-border/40 flex items-center justify-between gap-3">
				<div className="flex items-center gap-3 min-w-0">
					<div className="relative shrink-0">
						{review.avatar ? (
							<img
								src={review.avatar}
								alt={review.name}
								className="size-10 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/60 transition-all duration-300"
							/>
						) : (
							<div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm ring-2 ring-primary/20 group-hover:ring-primary/60 transition-all duration-300">
								{review.name.charAt(0)}
							</div>
						)}
						<span className="absolute -bottom-0.5 -right-0.5 size-3 bg-emerald-500 rounded-full ring-2 ring-card" />
					</div>
					<div className="min-w-0">
						<h4 className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
							{review.name}
						</h4>
						<p className="text-[11px] text-muted-foreground truncate font-medium">
							{review.role}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

// ==========================================
// 4-COLUMN VERTICAL MARQUEE VARIANT
// ==========================================
function FourColumnMarqueeReviews({
	reviews,
	speed = 100,
}: {
	reviews: ReviewItem[];
	speed?: number;
}) {
	const col1 = [...reviews, ...reviews];
	const col2 = [...reviews.slice(1), ...reviews, ...reviews.slice(0, 1)];
	const col3 = [...reviews.slice(2), ...reviews, ...reviews.slice(0, 2)];
	const col4 = [...reviews.slice(3), ...reviews, ...reviews.slice(0, 3)];

	const speedStr = `${speed}s`;

	const columns = [
		{ items: col1, dir: "up", speed: speedStr, visibility: "flex" },
		{ items: col2, dir: "down", speed: speedStr, visibility: "flex" },
		{ items: col3, dir: "up", speed: speedStr, visibility: "hidden lg:flex" },
		{ items: col4, dir: "down", speed: speedStr, visibility: "hidden xl:flex" },
	];

	return (
		<div className="relative w-full max-w-7xl mx-auto px-2 sm:px-4">
			{/* MOBILE VIEW (< sm): 4 Horizontal Left & Right Scrolling Marquee Rows */}
			<div className="block sm:hidden relative w-full overflow-hidden space-y-3 py-2">
				{/* Left & Right Horizontal Fade Masks */}
				<div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent z-20" />
				<div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent z-20" />

				{/* Row 1 (Col 1): Scrolls Left */}
				<div className="overflow-hidden w-full">
					<div className="flex gap-3 w-max reviews-hmarquee-left">
						{[...col1, ...col1].map((review, idx) => (
							<ReviewCard key={`m1-${review.id}-${idx}`} review={review} className="w-[260px] shrink-0" />
						))}
					</div>
				</div>

				{/* Row 2 (Col 2): Scrolls Right */}
				<div className="overflow-hidden w-full">
					<div className="flex gap-3 w-max reviews-hmarquee-right">
						{[...col2, ...col2].map((review, idx) => (
							<ReviewCard key={`m2-${review.id}-${idx}`} review={review} className="w-[260px] shrink-0" />
						))}
					</div>
				</div>

				{/* Row 3 (Col 3): Scrolls Left */}
				<div className="overflow-hidden w-full">
					<div className="flex gap-3 w-max reviews-hmarquee-left">
						{[...col3, ...col3].map((review, idx) => (
							<ReviewCard key={`m3-${review.id}-${idx}`} review={review} className="w-[260px] shrink-0" />
						))}
					</div>
				</div>

				{/* Row 4 (Col 4): Scrolls Right */}
				<div className="overflow-hidden w-full">
					<div className="flex gap-3 w-max reviews-hmarquee-right">
						{[...col4, ...col4].map((review, idx) => (
							<ReviewCard key={`m4-${review.id}-${idx}`} review={review} className="w-[260px] shrink-0" />
						))}
					</div>
				</div>
			</div>

			{/* TABLET (md: 2 columns), LARGE DESKTOP (lg: 3 columns), EXTRA LARGE (xl: 4 columns) */}
			<div className="hidden sm:block relative">
				{/* Top & Bottom Ambient Fade Masks */}
				<div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background via-background/80 to-transparent z-20" />
				<div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/80 to-transparent z-20" />

				{/* Responsive Grid: 2 cols on md/sm, 3 cols on lg, 4 cols on xl */}
				<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 h-[580px] sm:h-[680px] overflow-hidden relative">
					{columns.map((col, colIdx) => (
						<div
							key={colIdx}
							className={cn("relative h-full overflow-hidden flex flex-col", col.visibility)}
						>
							<div
								className={cn(
									"flex flex-col gap-4 sm:gap-5 shrink-0",
									col.dir === "up"
										? "reviews-vmarquee-up"
										: "reviews-vmarquee-down"
								)}
								style={{
									animationDuration: col.speed,
								}}
							>
								{[...col.items, ...col.items].map((review, idx) => (
									<ReviewCard
										key={`${review.id}-${colIdx}-${idx}`}
										review={review}
									/>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

// ==========================================
// MAIN REVIEWS BLOCK
// ==========================================
export function ReviewsBlock({
	variant = "up-down-vertical-marquee",
	title = "Loved by Tech Leaders Worldwide",
	subtitle = "See how fast-growing teams scale products with our senior engineering team.",
	reviews = DEFAULT_REVIEWS,
	autoSlide = true,
	autoSlideInterval = 4000,
	marqueeSpeed = 100,
	className,
	glowColor,
}: ReviewsProps) {
	const isStacked = variant === "stacked-carousel";
	const isVerticalMarquee = variant === "up-down-vertical-marquee";

	return (
		<section
			className={cn(
				"relative w-full bg-background text-foreground py-12 sm:py-20 px-4 overflow-hidden border-y border-border transition-colors duration-300",
				className,
			)}>
			{/* Self-contained marquee animation styles */}
			<style>{`
				@keyframes reviews-marquee-scroll {
					from { transform: translateX(0); }
					to   { transform: translateX(-50%); }
				}
				@keyframes reviews-marquee-left-scroll {
					from { transform: translateX(0); }
					to   { transform: translateX(-50%); }
				}
				@keyframes reviews-marquee-right-scroll {
					from { transform: translateX(-50%); }
					to   { transform: translateX(0); }
				}
				@keyframes reviews-vmarquee-up-scroll {
					from { transform: translateY(0); }
					to   { transform: translateY(-50%); }
				}
				@keyframes reviews-vmarquee-down-scroll {
					from { transform: translateY(-50%); }
					to   { transform: translateY(0); }
				}
				.reviews-marquee-track {
					animation: reviews-marquee-scroll ${marqueeSpeed}s linear infinite;
				}
				.reviews-hmarquee-left {
					animation: reviews-marquee-left-scroll ${marqueeSpeed}s linear infinite;
				}
				.reviews-hmarquee-right {
					animation: reviews-marquee-right-scroll ${marqueeSpeed}s linear infinite;
				}
				.reviews-vmarquee-up {
					animation: reviews-vmarquee-up-scroll linear infinite;
				}
				.reviews-vmarquee-down {
					animation: reviews-vmarquee-down-scroll linear infinite;
				}
				.reviews-marquee-track:hover,
				.reviews-hmarquee-left:hover,
				.reviews-hmarquee-right:hover,
				.reviews-vmarquee-up:hover,
				.reviews-vmarquee-down:hover {
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

			{/* Render selected variant */}
			{isStacked ? (
				<StackedCardsCarousel
					reviews={reviews}
					autoSlide={autoSlide}
					autoSlideInterval={autoSlideInterval}
				/>
			) : isVerticalMarquee ? (
				<FourColumnMarqueeReviews reviews={reviews} speed={marqueeSpeed} />
			) : (
				<div className="relative w-full min-h-[420px] sm:min-h-[750px] flex items-center justify-center">
					{/* Centered High-Performance COBE WebGL 3D Globe */}
					<div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
						<CobeRealGlobe glowColor={glowColor} />
					</div>

					{/* Foreground Smooth Right-to-Left Infinite Marquee Container */}
					<div className="relative z-10 w-full overflow-hidden py-6">
						<div
							className="flex gap-4 sm:gap-6 w-max reviews-marquee-track"
							style={{ animationDuration: `${marqueeSpeed}s` }}
						>
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
			)}
		</section>
	);
}

export default ReviewsBlock;
