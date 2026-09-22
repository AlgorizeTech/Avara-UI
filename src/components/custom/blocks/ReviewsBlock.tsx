"use client";

import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { HalfStars } from "@/components/custom/blocks/HalfStarsBlock";
import { motion, AnimatePresence } from "framer-motion";

export type ReviewsVariant =
	| "up-down-vertical-marquee"
	| "stacked-carousel"
	| "logo-carousel";

export interface ReviewItem {
	id: string;
	name: string;
	role: string;
	avatar?: string;
	rating: number;
	content: string;
	company?: string;
	logo?: React.ReactNode;
	highlight?: string;
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
			"The difference between AlgorizeTech and other agencies is their talent pool. You actually work with senior developers. Code quality and architecture are top-tier!",
	},
	{
		id: "3",
		name: "Arlene McCoy",
		role: "Co-Founder & CEO",
		avatar:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
		rating: 5.0,
		content:
			"Their 'Quality Obsessed' mantra is apparent in everything they do. They pushed back on bad ideas, suggested better alternatives, and boosted conversion by 40%!",
	},
	{
		id: "4",
		name: "Sofia Chen",
		role: "Lead Systems Architect",
		avatar:
			"https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
		rating: 5.0,
		content:
			"Integrating their UI components shaved weeks off our launch roadmap. Built-in performance optimizations and accessibility standards saved us hundreds of hours!",
	},
	{
		id: "5",
		name: "Mr. Martin",
		role: "Chief Operating Officer",
		avatar:
			"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
		rating: 5.0,
		content:
			"The unlimited revisions gave us creative freedom without scope creep. AlgorizeTech refined every single detail until our team was 100% thrilled with results!",
	},
	{
		id: "6",
		name: "David Kim",
		role: "Head of Design",
		avatar:
			"https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
		rating: 5.0,
		content:
			"The attention to clean typography, micro-interactions, and layout scaling surpassed all expectations. It transformed our web product into a modern design!",
	},
	{
		id: "7",
		name: "Elena Rostova",
		role: "VP of Engineering",
		avatar:
			"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
		rating: 5.0,
		content:
			"Their component library is bulletproof. Seamless dark mode integration, accessible keyboard navigation, and animation physics work impeccably out of the box!",
	},
	{
		id: "8",
		name: "Marcus Vance",
		role: "Tech Lead",
		avatar:
			"https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80",
		rating: 5.0,
		content:
			"Outstanding developer experience from day one. Clean TypeScript types, well-documented component exports, and instant setup made integration effortless!",
	},
];

// ==========================================
// ULTRA-REALISTIC COBE WEBGL 3D GLOBE
// ==========================================


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
						<HalfStars
							rating={activeReview.rating}
							size={16}
							showText={false}
							activeColor="text-amber-500"
							inactiveColor="text-amber-500/20"
							role="img"
							aria-label={`Rated ${activeReview.rating.toFixed(1)} out of 5`}
						/>
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
						className="size-10 sm:size-12 rounded-full bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-lg cursor-pointer"
						aria-label="Previous review"
					>
						<ArrowLeft className="size-4 sm:size-5 stroke-[2.5]" />
					</button>
					<button
						type="button"
						onClick={handleNext}
						className="size-10 sm:size-12 rounded-full bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-lg cursor-pointer"
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
					<HalfStars
						rating={review.rating}
						size={14}
						showText={false}
						activeColor="text-amber-500"
						inactiveColor="text-amber-500/20"
						role="img"
						aria-label={`Rated ${review.rating.toFixed(1)} out of 5`}
					/>
					<span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 ml-1">
						{review.rating.toFixed(1)}
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
// LOGO TAB TESTIMONIAL CAROUSEL VARIANT
// ==========================================
function LogoCarouselVariant({
	reviews,
	title = "Loved by teams building what's next",
	subtitle = "Hear how founders are using our platform to save time, simplify their workflow, and grow their business.",
}: {
	reviews: ReviewItem[];
	title?: string;
	subtitle?: string;
}) {
	const [activeIndex, setActiveIndex] = useState(0);

	const items = reviews.length > 0 ? reviews : DEFAULT_REVIEWS;
	const activeItem = items[activeIndex] || items[0];

	const handlePrev = () => {
		setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
	};

	const handleNext = () => {
		setActiveIndex((prev) => (prev + 1) % items.length);
	};

	const handleSelect = (idx: number) => {
		setActiveIndex(idx);
	};

	return (
		<div className="w-full max-w-5xl mx-auto py-8 px-4 flex flex-col items-center">
			{/* Top Header Badge & Titles */}
			{(title || subtitle) && (
				<div className="relative z-20 w-full mx-auto text-center space-y-3 mb-8 sm:mb-10 flex flex-col items-center">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
						<Star className="size-3.5 fill-primary text-primary" /> Client Testimonials
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

			{/* Company Logos Row (Independent Infinite Marquee) */}
			<div className="w-full overflow-hidden relative py-4 mb-6 group">
				<div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10" />
				<div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10" />

				<div className="flex w-max gap-8 sm:gap-14 reviews-hmarquee-left group-hover:[animation-play-state:paused]">
					{[...items, ...items, ...items, ...items].map((item, idx) => {
						return (
							<div
								key={`${item.id || idx}-${idx}`}
								className="flex items-center gap-2.5 px-4 py-2 rounded-xl select-none shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300 text-muted-foreground hover:text-foreground"
							>
								{item.logo ? (
									<div className="size-6 shrink-0 flex items-center justify-center">
										{item.logo}
									</div>
								) : (
									<div className="size-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
										{item.company ? item.company.charAt(0) : item.name.charAt(0)}
									</div>
								)}
								<span className="text-sm sm:text-base tracking-tight font-semibold">
									{item.company || item.name}
								</span>
							</div>
						);
					})}
				</div>
			</div>

			{/* Pagination Indicator Dots */}
			<div className="flex items-center justify-center gap-2 mb-8">
				{items.map((_, idx) => (
					<button
						key={idx}
						type="button"
						onClick={() => handleSelect(idx)}
						aria-label={`Go to slide ${idx + 1}`}
						className={cn(
							"h-2 rounded-full transition-all duration-300 cursor-pointer",
							idx === activeIndex
								? "w-8 bg-primary shadow-sm"
								: "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
						)}
					/>
				))}
			</div>

			{/* Split Testimonial Card (White Background, Zero Shadow) */}
			<div className="w-full max-w-4xl rounded-2xl border border-border/80 bg-background dark:bg-card text-foreground shadow-none overflow-hidden grid grid-cols-1 md:grid-cols-12 transition-all duration-300">
				{/* Quote & Author Info (Left Column) */}
				<div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6 overflow-hidden">
					<AnimatePresence mode="wait">
						<motion.div
							key={activeItem.id || activeIndex}
							initial={{ opacity: 0, y: 28 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -16 }}
							transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
							className="space-y-6"
						>
							<p className="text-lg sm:text-2xl font-medium text-foreground leading-relaxed tracking-tight">
								{(() => {
									const quoteText = activeItem.content.startsWith('"')
										? activeItem.content
										: `"${activeItem.content}"`;
									const words = quoteText.split(" ");
									let globalCharIdx = 0;
									return (
										<span className="inline">
											{words.map((word, wordIdx) => {
												const chars = word.split("");
												const wordNode = (
													<span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
														{chars.map((char) => {
															const idx = globalCharIdx++;
															return (
																<span
																	key={idx}
																	className="inline-block text-muted-foreground/30 animate-[typo-color-reveal_0.6s_cubic-bezier(0.16,1,0.3,1)_both]"
																	style={{
																		animationDelay: `${idx * 14}ms`,
																	}}
																>
																	{char}
																</span>
															);
														})}
													</span>
												);
												globalCharIdx++;
												return wordNode;
											})}
										</span>
									);
								})()}
							</p>

							<div className="pt-4 border-t border-border/40">
								<h3 className="text-lg sm:text-xl font-bold font-serif text-foreground">
									{activeItem.name}
								</h3>
								<p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
									{activeItem.role}
									{activeItem.company ? `, ${activeItem.company}` : ""}
								</p>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>

				{/* Author Portrait Image (Right Column with 4px Padding) */}
				<div className="md:col-span-5 relative min-h-[280px] sm:min-h-[360px] p-1 sm:p-1.5">
					<div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-muted/20">
						<AnimatePresence mode="wait">
							<motion.img
								key={activeItem.id || activeIndex}
								src={
									activeItem.avatar ||
									"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
								}
								alt={activeItem.name}
								initial={{ opacity: 0, scale: 1.08 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
								className="absolute inset-0 w-full h-full object-cover object-center rounded-xl sm:rounded-2xl"
							/>
						</AnimatePresence>
					</div>
				</div>
			</div>

			{/* Arrow Navigation Buttons */}
			<div className="flex items-center justify-center gap-3 mt-8">
				<button
					type="button"
					onClick={handlePrev}
					className="size-11 rounded-xl border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 active:scale-95 transition-all flex items-center justify-center shadow-none cursor-pointer"
					aria-label="Previous review"
				>
					<ArrowLeft className="size-4 stroke-[2.5]" />
				</button>
				<button
					type="button"
					onClick={handleNext}
					className="size-11 rounded-xl bg-primary text-primary-foreground hover:opacity-90 active:scale-95 transition-all flex items-center justify-center shadow-none cursor-pointer"
					aria-label="Next review"
				>
					<ArrowRight className="size-4 stroke-[2.5]" />
				</button>
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
	marqueeSpeed = 30,
	className,
}: ReviewsProps) {
	if (variant === "logo-carousel") {
		return (
			<section
				className={cn(
					"relative w-full bg-background text-foreground py-12 sm:py-20 px-4 overflow-hidden border-y border-border transition-colors duration-300",
					className,
				)}
			>
				<style>{`
					@keyframes reviews-marquee-left-scroll {
						from { transform: translateX(0); }
						to   { transform: translateX(-50%); }
					}
					@keyframes typo-color-reveal {
						0% {
							color: var(--primary, oklch(0.205 0 0));
							opacity: 0.25;
						}
						100% {
							color: inherit;
							opacity: 1;
						}
					}
					.reviews-hmarquee-left {
						animation: reviews-marquee-left-scroll ${marqueeSpeed}s linear infinite;
					}
					.reviews-hmarquee-left:hover {
						animation-play-state: paused;
					}
				`}</style>
				<LogoCarouselVariant
					reviews={reviews}
					title={title !== "Loved by Tech Leaders Worldwide" ? title : "Loved by teams building what's next"}
					subtitle={subtitle !== "See how fast-growing teams scale products with our senior engineering team." ? subtitle : "Hear how founders are using our platform to save time, simplify their workflow, and grow their business."}
				/>
			</section>
		);
	}

	const isStacked = variant === "stacked-carousel";

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
			) : (
				<FourColumnMarqueeReviews reviews={reviews} speed={marqueeSpeed} />
			)}
		</section>
	);
}

export default ReviewsBlock;
