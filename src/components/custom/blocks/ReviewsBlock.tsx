"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { HalfStars } from "@/components/custom/blocks/HalfStarsBlock";
import { springLinear } from "./motion-curves";

export type ReviewsVariant =
	| "up-down-vertical-marquee"
	| "stacked-carousel"
	| "logo-carousel"
	| "testimonial-loom";

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
			"https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150483/photo-1534528741775-53994a69daeb-1790150482280.jpg",
		rating: 5.0,
		content:
			"I was impressed by the food! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive. I'll definitely be back for more!",
	},
	{
		id: "2",
		name: "Alice Johnson",
		role: "Product Director",
		avatar:
			"https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158813/photo-1494790108377-be9c29b29330-1790158812212.jpg",
		rating: 5.0,
		content:
			"The difference between AlgorizeTech and other agencies is their talent pool. You actually work with senior developers. Code quality and architecture are top-tier!",
	},
	{
		id: "3",
		name: "Arlene McCoy",
		role: "Co-Founder & CEO",
		avatar:
			"https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150480/photo-1507003211169-0a1dd7228f2d-1790150482276.jpg",
		rating: 5.0,
		content:
			"Their 'Quality Obsessed' mantra is apparent in everything they do. They pushed back on bad ideas, suggested better alternatives, and boosted conversion by 40%!",
	},
	{
		id: "4",
		name: "Sofia Chen",
		role: "Lead Systems Architect",
		avatar:
			"https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150481/photo-1517841905240-472988babdf9-1790150482277.jpg",
		rating: 5.0,
		content:
			"Integrating their UI components shaved weeks off our launch roadmap. Built-in performance optimizations and accessibility standards saved us hundreds of hours!",
	},
	{
		id: "5",
		name: "Mr. Martin",
		role: "Chief Operating Officer",
		avatar:
			"https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158814/photo-1500648767791-00dcc994a43e-1790158812212.jpg",
		rating: 5.0,
		content:
			"The unlimited revisions gave us creative freedom without scope creep. AlgorizeTech refined every single detail until our team was 100% thrilled with results!",
	},
	{
		id: "6",
		name: "David Kim",
		role: "Head of Design",
		avatar:
			"https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158814/photo-1539571696357-5a69c17a67c6-1790158812214.jpg",
		rating: 5.0,
		content:
			"The attention to clean typography, micro-interactions, and layout scaling surpassed all expectations. It transformed our web product into a modern design!",
	},
	{
		id: "7",
		name: "Elena Rostova",
		role: "VP of Engineering",
		avatar:
			"https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158814/photo-1573496359142-b8d87734a5a2-1790158812214.jpg",
		rating: 5.0,
		content:
			"Their component library is bulletproof. Seamless dark mode integration, accessible keyboard navigation, and animation physics work impeccably out of the box!",
	},
	{
		id: "8",
		name: "Marcus Vance",
		role: "Tech Lead",
		avatar:
			"https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158814/photo-1522075469751-3a6694fb2f61-1790158812213.jpg",
		rating: 5.0,
		content:
			"Outstanding developer experience from day one. Clean TypeScript types, well-documented component exports, and instant setup made integration effortless!",
	},
];

// ==========================================
// MOTION
// ==========================================
// Stacked cards glide between slots on this spring.
const CARD_SPRING = springLinear({ stiffness: 170, damping: 22, mass: 0.8 });
const EASE_OUT = "cubic-bezier(0, 0, 0.58, 1)";
const EXPO_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

// How each swapping piece of text or image comes in (CSS) and goes out (WAAPI).
const SWAP_KEYFRAMES = `
	@keyframes reviews-rating-in { from { opacity: 0; translate: 0 8px; filter: blur(4px); } }
	@keyframes reviews-name-in { from { opacity: 0; translate: 0 12px; filter: blur(4px); } }
	@keyframes reviews-role-in { from { opacity: 0; translate: 0 10px; filter: blur(4px); } }
	@keyframes reviews-quote-in { from { opacity: 0; translate: 0 14px; filter: blur(6px); } }
	@keyframes reviews-logo-quote-in { from { opacity: 0; translate: 0 28px; } }
	@keyframes reviews-logo-image-in { from { opacity: 0; scale: 1.08; } }
`;

type SwapMotion = {
	/** Values the element rests at once it has come in. */
	rest: Record<string, string>;
	/** Values the leaving element animates to. */
	exit: Record<string, string>;
	/** ms */
	duration: number;
	/** ms, applied to the way out as well as the way in */
	delay?: number;
	easing: string;
};

/** From the element's current computed values to `to`, as WAAPI keyframes. */
function fromCurrent(el: Element, to: Record<string, string>) {
	const style = getComputedStyle(el);
	const frames: Record<string, string[]> = {};
	for (const key of Object.keys(to)) {
		frames[key] = [style.getPropertyValue(key), to[key]];
	}
	return frames;
}

/**
 * One element swapped in "wait" order: when `itemKey` changes, the element on
 * screen animates out from wherever it is, and only once that ends is the
 * latest item rendered (it comes in with its own CSS animation). If the key
 * comes back mid-exit, the element settles back to rest from where it got to.
 * `ref` must be attached to the swapped element.
 */
function useWaitSwap<T, E extends HTMLElement>(
	ref: React.RefObject<E | null>,
	item: T,
	itemKey: string,
	motion: SwapMotion,
) {
	const [shownKey, setShownKey] = useState(itemKey);
	const leaving = shownKey !== itemKey;

	// The leaving element keeps showing the item it had; otherwise it follows
	// the current one. Held in state (synced during render while not leaving)
	// so render never reads a ref.
	const [lastShown, setLastShown] = useState(item);
	if (!leaving && lastShown !== item) setLastShown(item);
	const latestKey = useRef(itemKey);
	const motionRef = useRef(motion);
	useEffect(() => {
		latestKey.current = itemKey;
		motionRef.current = motion;
	});

	useEffect(() => {
		if (!leaving) return;
		const el = ref.current;
		if (!el) {
			setShownKey(latestKey.current);
			return;
		}
		const { exit, duration, delay = 0, easing } = motionRef.current;
		let done = false;
		const animation = el.animate(fromCurrent(el, exit), {
			duration,
			delay,
			easing,
			fill: "both",
		});
		animation.finished
			.then(() => {
				done = true;
				setShownKey(latestKey.current);
			})
			.catch(() => {});
		return () => {
			if (done) return;
			// The key came back before the exit finished: settle back from here.
			const { rest } = motionRef.current;
			el.animate(fromCurrent(el, rest), {
				duration,
				delay,
				easing,
				fill: "backwards",
			});
			animation.cancel();
		};
	}, [leaving, ref]);

	return { shown: leaving ? lastShown : item, shownKey };
}

const TEXT_REST = { opacity: "1", translate: "0px 0px", filter: "blur(0px)" };
const RATING_SWAP: SwapMotion = {
	rest: TEXT_REST,
	exit: { opacity: "0", translate: "0px -8px", filter: "blur(4px)" },
	duration: 250,
	easing: EASE_OUT,
};
const NAME_SWAP: SwapMotion = {
	rest: TEXT_REST,
	exit: { opacity: "0", translate: "0px -12px", filter: "blur(4px)" },
	duration: 300,
	easing: EASE_OUT,
};
const ROLE_SWAP: SwapMotion = {
	rest: TEXT_REST,
	exit: { opacity: "0", translate: "0px -10px", filter: "blur(4px)" },
	duration: 300,
	delay: 50,
	easing: EASE_OUT,
};
const QUOTE_SWAP: SwapMotion = {
	rest: TEXT_REST,
	exit: { opacity: "0", translate: "0px -14px", filter: "blur(6px)" },
	duration: 350,
	delay: 80,
	easing: EASE_OUT,
};
const LOGO_QUOTE_SWAP: SwapMotion = {
	rest: { opacity: "1", translate: "0px 0px" },
	exit: { opacity: "0", translate: "0px -16px" },
	duration: 400,
	easing: EXPO_OUT,
};
const LOGO_IMAGE_SWAP: SwapMotion = {
	rest: { opacity: "1", scale: "1" },
	exit: { opacity: "0", scale: "0.95" },
	duration: 450,
	easing: EXPO_OUT,
};

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

	const ratingRef = useRef<HTMLDivElement>(null);
	const rating = useWaitSwap<ReviewItem, HTMLDivElement>(
		ratingRef,
		activeReview,
		activeReview.id + "-rating",
		RATING_SWAP,
	);
	const nameRef = useRef<HTMLHeadingElement>(null);
	const name = useWaitSwap<ReviewItem, HTMLHeadingElement>(
		nameRef,
		activeReview,
		activeReview.id + "-name",
		NAME_SWAP,
	);
	const roleRef = useRef<HTMLParagraphElement>(null);
	const role = useWaitSwap<ReviewItem, HTMLParagraphElement>(
		roleRef,
		activeReview,
		activeReview.id + "-role",
		ROLE_SWAP,
	);
	const quoteRef = useRef<HTMLParagraphElement>(null);
	const quote = useWaitSwap<ReviewItem, HTMLParagraphElement>(
		quoteRef,
		activeReview,
		activeReview.id + "-content",
		QUOTE_SWAP,
	);

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
						<div
							key={review.id}
							style={{
								transform: `translateX(${xOffset}px) translateY(${yOffset}px) scale(${scale}) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
								zIndex,
								opacity,
								transition: `transform ${CARD_SPRING.duration}ms ${CARD_SPRING.easing}, opacity ${CARD_SPRING.duration}ms ${CARD_SPRING.easing}, z-index ${CARD_SPRING.duration}ms ${CARD_SPRING.easing}`,
							}}
							className="absolute w-[140px] h-[215px] xs:w-[170px] xs:h-[255px] sm:w-[230px] sm:h-[350px] md:w-[250px] md:h-[375px] rounded-[24px] sm:rounded-[28px] overflow-hidden border border-border shadow-none bg-card cursor-pointer transform-gpu"
							onClick={() => {
								if (offset === 1) handleNext();
								if (offset === total - 1) handlePrev();
							}}
						>
							<img
								src={review.avatar || "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150483/photo-1534528741775-53994a69daeb-1790150482280.jpg"}
								alt={review.name}
								className="w-full h-full object-cover rounded-[24px] sm:rounded-[28px] pointer-events-none"
							/>
						</div>
					);
				})}
			</div>

			{/* Right Column: Animated Review Content & Navigation Controls */}
			<div className="lg:col-span-6 flex flex-col justify-center items-start space-y-3 sm:space-y-4 font-sans text-left px-2 sm:px-4">
				{/* Rating Stars */}
				<div
					key={rating.shownKey}
					ref={ratingRef}
					className="flex items-center gap-1.5"
					style={{ animation: `reviews-rating-in 0.25s ${EASE_OUT} backwards` }}
				>
					<HalfStars
						rating={rating.shown.rating}
						size={16}
						showText={false}
						activeColor="text-amber-500"
						inactiveColor="text-amber-500/20"
						role="img"
						aria-label={`Rated ${rating.shown.rating.toFixed(1)} out of 5`}
					/>
					<span className="text-xs font-semibold text-foreground">
						{rating.shown.rating.toFixed(1)}
					</span>
				</div>

				{/* Reviewer Info */}
				<div className="space-y-0.5 sm:space-y-1">
					<h3
						key={name.shownKey}
						ref={nameRef}
						className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight"
						style={{ animation: `reviews-name-in 0.3s ${EASE_OUT} backwards` }}
					>
						{name.shown.name}
					</h3>

					<p
						key={role.shownKey}
						ref={roleRef}
						className="text-xs sm:text-base font-medium text-muted-foreground"
						style={{ animation: `reviews-role-in 0.3s ${EASE_OUT} 0.05s backwards` }}
					>
						{role.shown.role}
					</p>
				</div>

				{/* Review Quote Text */}
				<p
					key={quote.shownKey}
					ref={quoteRef}
					className="text-sm xs:text-base sm:text-lg md:text-xl text-foreground/90 leading-relaxed font-normal pt-1 sm:pt-2 pb-2 sm:pb-4 max-w-xl min-h-[90px] sm:min-h-[120px]"
					style={{ animation: `reviews-quote-in 0.35s ${EASE_OUT} 0.08s backwards` }}
				>
					"{quote.shown.content}"
				</p>

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
				"relative p-5 sm:p-6 rounded-3xl bg-card border border-border/80 text-card-foreground shadow-sm hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between overflow-hidden cursor-pointer select-none",
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
				<span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
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
							<div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm ring-2 ring-primary/20 group-hover:ring-primary/60 transition-all duration-300">
								{review.name.charAt(0)}
							</div>
						)}
						<span className="absolute -bottom-0.5 -right-0.5 size-3 bg-emerald-500 rounded-full ring-2 ring-card" />
					</div>
					<div className="min-w-0">
						<h4 className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
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

	const quoteRef = useRef<HTMLDivElement>(null);
	const quote = useWaitSwap<ReviewItem, HTMLDivElement>(
		quoteRef,
		activeItem,
		String(activeItem.id || activeIndex),
		LOGO_QUOTE_SWAP,
	);
	const portraitRef = useRef<HTMLImageElement>(null);
	const portrait = useWaitSwap<ReviewItem, HTMLImageElement>(
		portraitRef,
		activeItem,
		String(activeItem.id || activeIndex),
		LOGO_IMAGE_SWAP,
	);

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
									<div className="size-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold">
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
					<div
						key={quote.shownKey}
						ref={quoteRef}
						className="space-y-6"
						style={{ animation: `reviews-logo-quote-in 0.4s ${EXPO_OUT} backwards` }}
					>
							<p className="text-lg sm:text-2xl font-medium text-foreground leading-relaxed tracking-tight">
								{(() => {
									const quoteText = quote.shown.content.startsWith('"')
										? quote.shown.content
										: `"${quote.shown.content}"`;
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
								<h3 className="text-lg sm:text-xl font-semibold font-serif text-foreground">
									{quote.shown.name}
								</h3>
								<p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
									{quote.shown.role}
									{quote.shown.company ? `, ${quote.shown.company}` : ""}
								</p>
							</div>
					</div>
				</div>

				{/* Author Portrait Image (Right Column with 4px Padding) */}
				<div className="md:col-span-5 relative min-h-[280px] sm:min-h-[360px] p-1 sm:p-1.5">
					<div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-muted/20">
						<img
							key={portrait.shownKey}
							ref={portraitRef}
							src={
								portrait.shown.avatar ||
								"https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150483/photo-1534528741775-53994a69daeb-1790150482280.jpg"
							}
							alt={portrait.shown.name}
							style={{ animation: `reviews-logo-image-in 0.45s ${EXPO_OUT} backwards` }}
							className="absolute inset-0 w-full h-full object-cover object-center rounded-xl sm:rounded-2xl"
						/>
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
// TESTIMONIAL LOOM PRO (ENVELOPE) VARIANT
// ==========================================

interface LoomEnvelopePreset {
	id: string;
	outerColor: string;
	sideFlapColor: string;
	innerColor: string;
	flapInnerColor: string;
	creaseColor: string;
	stampColor: string;
	accentColor: string;
	hubCode: string;
	dispatchCode: string;
	metricBadge: string;
	date: string;
	name: string;
	role: string;
	company: string;
	rating: number;
	avatar: string;
	content: string;
}

const LOOM_ENVELOPE_PRESETS: LoomEnvelopePreset[] = [
	{
		id: "loom-1",
		outerColor: "color-mix(in oklab, var(--primary) 18%, var(--secondary))",
		sideFlapColor: "color-mix(in oklab, var(--primary) 24%, var(--secondary))",
		innerColor: "color-mix(in oklab, var(--primary) 38%, var(--muted))",
		flapInnerColor: "color-mix(in oklab, var(--primary) 34%, var(--muted))",
		creaseColor: "color-mix(in oklab, var(--primary) 36%, var(--border))",
		stampColor: "color-mix(in oklab, var(--primary) 62%, var(--foreground))",
		accentColor: "var(--primary)",
		hubCode: "ZURICH · CH",
		dispatchCode: "ARC-101",
		metricBadge: "+142% Conversion",
		date: "14 Mar 2026",
		name: "Sienna Laurent",
		role: "VP of Product",
		company: "Veloce Labs",
		rating: 5,
		avatar:
			"https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150483/photo-1534528741775-53994a69daeb-1790150482280.jpg",
		content:
			"Rebuilding our checkout architecture with their modular system lifted completed checkouts by 142% in the very first quarter.",
	},
	{
		id: "loom-2",
		outerColor: "color-mix(in oklab, var(--primary) 24%, var(--secondary))",
		sideFlapColor: "color-mix(in oklab, var(--primary) 30%, var(--secondary))",
		innerColor: "color-mix(in oklab, var(--primary) 44%, var(--muted))",
		flapInnerColor: "color-mix(in oklab, var(--primary) 40%, var(--muted))",
		creaseColor: "color-mix(in oklab, var(--primary) 42%, var(--border))",
		stampColor: "color-mix(in oklab, var(--primary) 68%, var(--foreground))",
		accentColor: "var(--primary)",
		hubCode: "STOCKHOLM · SE",
		dispatchCode: "ARC-204",
		metricBadge: "3.4x Faster Ship",
		date: "28 Apr 2026",
		name: "Henrik Lindqvist",
		role: "Principal Designer",
		company: "NordicGrid",
		rating: 5,
		avatar:
			"https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150480/photo-1507003211169-0a1dd7228f2d-1790150482276.jpg",
		content:
			"What used to take three sprints now ships in four days. The component primitives bridged design and engineering effortlessly.",
	},
	{
		id: "loom-3",
		outerColor: "color-mix(in oklab, var(--primary) 15%, var(--secondary))",
		sideFlapColor: "color-mix(in oklab, var(--primary) 21%, var(--secondary))",
		innerColor: "color-mix(in oklab, var(--primary) 35%, var(--muted))",
		flapInnerColor: "color-mix(in oklab, var(--primary) 31%, var(--muted))",
		creaseColor: "color-mix(in oklab, var(--primary) 34%, var(--border))",
		stampColor: "color-mix(in oklab, var(--primary) 60%, var(--foreground))",
		accentColor: "var(--primary)",
		hubCode: "LONDON · UK",
		dispatchCode: "ARC-309",
		metricBadge: "99.98% Uptime",
		date: "19 May 2026",
		name: "Camille Moreau",
		role: "Head of Growth",
		company: "AetherPay",
		rating: 5,
		avatar:
			"https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158813/photo-1494790108377-be9c29b29330-1790158812212.jpg",
		content:
			"Our enterprise onboarding flow now feels like a tactile luxury product. Enterprise trial-to-paid conversions doubled in six weeks.",
	},
	{
		id: "loom-4",
		outerColor: "color-mix(in oklab, var(--primary) 21%, var(--secondary))",
		sideFlapColor: "color-mix(in oklab, var(--primary) 27%, var(--secondary))",
		innerColor: "color-mix(in oklab, var(--primary) 42%, var(--muted))",
		flapInnerColor: "color-mix(in oklab, var(--primary) 38%, var(--muted))",
		creaseColor: "color-mix(in oklab, var(--primary) 40%, var(--border))",
		stampColor: "color-mix(in oklab, var(--primary) 65%, var(--foreground))",
		accentColor: "var(--primary)",
		hubCode: "SAN FRANCISCO · US",
		dispatchCode: "ARC-412",
		metricBadge: "-58% Latency",
		date: "04 Jun 2026",
		name: "Devon K. Mercer",
		role: "VP of Engineering",
		company: "Kinetix Cloud",
		rating: 5,
		avatar:
			"https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158814/photo-1539571696357-5a69c17a67c6-1790158812214.jpg",
		content:
			"Zero layout shift, silky 60fps transitions, and clean TypeScript interfaces out of the box. Our entire frontend squad swears by it.",
	},
	{
		id: "loom-5",
		outerColor: "color-mix(in oklab, var(--primary) 27%, var(--secondary))",
		sideFlapColor: "color-mix(in oklab, var(--primary) 33%, var(--secondary))",
		innerColor: "color-mix(in oklab, var(--primary) 46%, var(--muted))",
		flapInnerColor: "color-mix(in oklab, var(--primary) 42%, var(--muted))",
		creaseColor: "color-mix(in oklab, var(--primary) 44%, var(--border))",
		stampColor: "color-mix(in oklab, var(--primary) 70%, var(--foreground))",
		accentColor: "var(--primary)",
		hubCode: "TOKYO · JP",
		dispatchCode: "ARC-518",
		metricBadge: "4.9★ CSAT Score",
		date: "21 Jul 2026",
		name: "Mei-Ling Sato",
		role: "Co-Founder & CEO",
		company: "Sora Studio",
		rating: 5,
		avatar:
			"https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150481/photo-1517841905240-472988babdf9-1790150482277.jpg",
		content:
			"Partnering with them felt like embedding a world-class design engineering team directly into our core product organization.",
	},
	{
		id: "loom-6",
		outerColor: "color-mix(in oklab, var(--primary) 19%, var(--secondary))",
		sideFlapColor: "color-mix(in oklab, var(--primary) 25%, var(--secondary))",
		innerColor: "color-mix(in oklab, var(--primary) 39%, var(--muted))",
		flapInnerColor: "color-mix(in oklab, var(--primary) 35%, var(--muted))",
		creaseColor: "color-mix(in oklab, var(--primary) 38%, var(--border))",
		stampColor: "color-mix(in oklab, var(--primary) 64%, var(--foreground))",
		accentColor: "var(--primary)",
		hubCode: "BERLIN · DE",
		dispatchCode: "ARC-625",
		metricBadge: "10x Team Velocity",
		date: "09 Aug 2026",
		name: "Lukas Richter",
		role: "Chief Technology Officer",
		company: "Hyperion AI",
		rating: 5,
		avatar:
			"https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790158814/photo-1500648767791-00dcc994a43e-1790158812212.jpg",
		content:
			"Lighthouse performance jumped from 64 to 99 across every route while adding rich interactive motion that customers love.",
	},
];

type LoomStage =
	| "closed"
	| "opening"
	| "extracting"
	| "tucking"
	| "closing";

type LoomSlidePhase =
	| "center"
	| "out-left"
	| "out-right"
	| "enter-from-right"
	| "enter-from-left";

function TestimonialLoomVariant({
	reviews,
	autoSlide = true,
	animationSpeed = 100,
}: {
	reviews: ReviewItem[];
	autoSlide?: boolean;
	animationSpeed?: number;
}) {
	const items: LoomEnvelopePreset[] = LOOM_ENVELOPE_PRESETS.map((preset, idx) => {
		const custom = reviews[idx];
		const isDefaultSample =
			!custom ||
			custom.name === "Tamar Mendelson" ||
			custom.name === "Alice Johnson" ||
			custom.name === "Arlene McCoy" ||
			custom.name === "Sofia Chen" ||
			custom.name === "Mr. Martin" ||
			custom.name === "David Kim";
		if (isDefaultSample) return preset;
		return {
			...preset,
			name: custom.name || preset.name,
			role: custom.role || preset.role,
			company: custom.company || preset.company,
			avatar: custom.avatar || preset.avatar,
			content: custom.content || preset.content,
			rating: custom.rating ?? preset.rating,
		};
	});

	const [activeIndex, setActiveIndex] = useState<number>(3);
	const [stage, setStage] = useState<LoomStage>("closed");
	const [flapBehind, setFlapBehind] = useState<boolean>(false);
	const [slidePhase, setSlidePhase] = useState<LoomSlidePhase>("center");
	const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
	const [isPaused, setIsPaused] = useState<boolean>(false);
	const [cycleKey, setCycleKey] = useState<number>(0);

	const transitionTimersRef = useRef<number[]>([]);
	const stageRef = useRef<LoomStage>(stage);
	stageRef.current = stage;

	const clearTransitionTimers = useCallback(() => {
		for (const id of transitionTimersRef.current) {
			window.clearTimeout(id);
		}
		transitionTimersRef.current = [];
	}, []);

	useEffect(() => {
		return () => clearTransitionTimers();
	}, [clearTransitionTimers]);

	const count = items.length;
	const activeItem = items[activeIndex] ?? items[0];

	// Connect top range slider (`marqueeSpeed`: 40..200, default 100) directly to
	// all envelope opening, card arc extraction/insertion, closing, sliding, and auto-play durations.
	const normalizedSpeed =
		animationSpeed <= 35 ? 100 : Math.max(40, Math.min(200, animationSpeed));
	const speedScale = normalizedSpeed / 100;

	const tOpenDelay = Math.round(220 * speedScale);
	const flapDuration = Math.round(640 * speedScale);
	const tFlapMidpoint = tOpenDelay + Math.round(flapDuration * 0.5);
	const tExtractDelay = tOpenDelay + Math.round(flapDuration * 0.75);
	const cardExtractDuration = Math.round(1050 * speedScale);

	const cardInsertDuration = Math.round(920 * speedScale);
	const flapCloseDuration = Math.round(580 * speedScale);
	const slideDuration = Math.round(440 * speedScale);
	const totalCycleDuration = Math.round(6200 * speedScale);

	// Standard opening & card arc-extraction sequence whenever an envelope sits at center
	useEffect(() => {
		if (isTransitioning) return;

		setStage("closed");
		setFlapBehind(false);

		const tOpen = window.setTimeout(() => {
			setStage("opening");
		}, tOpenDelay);

		const tFlapZ = window.setTimeout(() => {
			setFlapBehind(true);
		}, tFlapMidpoint);

		const tExtract = window.setTimeout(() => {
			setStage("extracting");
		}, tExtractDelay);

		return () => {
			window.clearTimeout(tOpen);
			window.clearTimeout(tFlapZ);
			window.clearTimeout(tExtract);
		};
	}, [
		activeIndex,
		cycleKey,
		isTransitioning,
		tOpenDelay,
		tFlapMidpoint,
		tExtractDelay,
	]);

	// Full card lift-and-insert -> flap close -> envelope slide out -> new envelope slide in -> open sequence
	const navigateTo = useCallback(
		(targetIndex: number, direction: "next" | "prev") => {
			clearTransitionTimers();
			setIsTransitioning(true);

			const currentStage = stageRef.current;
			let elapsed = 0;

			// 1. Lift card up over the front pocket lip and slide it down inside the envelope
			if (currentStage === "extracting") {
				setStage("tucking");
				elapsed += Math.round(cardInsertDuration * 0.88);
			}

			// 2. Fold & seal the top triangular flap over the pocket
			if (currentStage !== "closed") {
				const tCloseFlap = window.setTimeout(() => {
					setStage("closing");
				}, elapsed);
				const tFlapFront = window.setTimeout(() => {
					setFlapBehind(false);
				}, elapsed + Math.round(flapCloseDuration * 0.5));
				transitionTimersRef.current.push(tCloseFlap, tFlapFront);
				elapsed += flapCloseDuration + Math.round(60 * speedScale);
			} else {
				setStage("closed");
				setFlapBehind(false);
			}

			// 3. Slide the sealed envelope out (left for "next", right for "prev")
			const tSlideOut = window.setTimeout(() => {
				setStage("closed");
				setFlapBehind(false);
				setSlidePhase(direction === "next" ? "out-left" : "out-right");
			}, elapsed);
			transitionTimersRef.current.push(tSlideOut);
			elapsed += slideDuration;

			// 4. Position the new sealed envelope on the opposite side (right for "next", left for "prev")
			const tPositionIncoming = window.setTimeout(() => {
				setActiveIndex(targetIndex);
				setStage("closed");
				setFlapBehind(false);
				setSlidePhase(
					direction === "next" ? "enter-from-right" : "enter-from-left",
				);
			}, elapsed);
			transitionTimersRef.current.push(tPositionIncoming);
			elapsed += 32;

			// 5. Slide the new sealed envelope smoothly into the center
			const tSlideIn = window.setTimeout(() => {
				setSlidePhase("center");
			}, elapsed);
			transitionTimersRef.current.push(tSlideIn);
			elapsed += slideDuration;

			// 6. Once seated at center, trigger the opening & card extraction sequence
			const tFinish = window.setTimeout(() => {
				setIsTransitioning(false);
				setCycleKey((k) => k + 1);
			}, elapsed);
			transitionTimersRef.current.push(tFinish);
		},
		[
			clearTransitionTimers,
			cardInsertDuration,
			flapCloseDuration,
			slideDuration,
			speedScale,
		],
	);

	useEffect(() => {
		if (!autoSlide || isPaused || isTransitioning) return;
		const timer = window.setTimeout(() => {
			navigateTo((activeIndex + 1) % count, "next");
		}, totalCycleDuration);
		return () => window.clearTimeout(timer);
	}, [
		activeIndex,
		autoSlide,
		count,
		isPaused,
		isTransitioning,
		cycleKey,
		totalCycleDuration,
		navigateTo,
	]);

	const handleSelect = useCallback(
		(index: number) => {
			if (index === activeIndex) {
				if (!isTransitioning) setCycleKey((k) => k + 1);
				return;
			}
			const direction = index > activeIndex ? "next" : "prev";
			navigateTo(index, direction);
		},
		[activeIndex, isTransitioning, navigateTo],
	);

	const handlePrev = useCallback(() => {
		navigateTo((activeIndex - 1 + count) % count, "prev");
	}, [activeIndex, count, navigateTo]);

	const handleNext = useCallback(() => {
		navigateTo((activeIndex + 1) % count, "next");
	}, [activeIndex, count, navigateTo]);

	const serialNumber = `0${activeIndex + 1} / 0${count}`;

	const isExtracting = stage === "extracting";
	const isTucking = stage === "tucking";
	const isFlapOpen =
		stage === "opening" ||
		stage === "extracting" ||
		stage === "tucking";

	const activeFlapDuration =
		stage === "closing" ? flapCloseDuration : flapDuration;

	// Horizontal slide transform for the entire envelope stage:
	const envelopeSlideTransform =
		slidePhase === "out-left" || slidePhase === "enter-from-left"
			? "translate3d(-115%, 0px, 0px) rotate(-3.5deg) scale(0.94)"
			: slidePhase === "out-right" || slidePhase === "enter-from-right"
				? "translate3d(115%, 0px, 0px) rotate(3.5deg) scale(0.94)"
				: "translate3d(0px, 0px, 0px) rotate(0deg) scale(1)";

	const envelopeSlideOpacity = slidePhase === "center" ? 1 : 0;
	const isInstantJump =
		slidePhase === "enter-from-right" || slidePhase === "enter-from-left";

	// Card keyframe animation:
	// - "extracting": rises out from inside pocket (z-index 15 -> y: -200px), then crosses over front lip (z-index 30) and settles on front face (y: -30px, rotate: -1.5deg)
	// - "tucking": lifts up from front face (z-index 30 -> y: -200px), crosses behind pocket lip (z-index 15), and slides down inside pocket (y: +12px, scale: 0.9)
	const cardAnimation = isExtracting
		? `loom-card-extract ${cardExtractDuration}ms cubic-bezier(0.25, 1, 0.4, 1) forwards`
		: isTucking
			? `loom-card-insert ${cardInsertDuration}ms cubic-bezier(0.32, 0, 0.2, 1) forwards`
			: "none";

	return (
		<div
			className="loom-stage-root relative w-full min-h-[590px] xs:min-h-[650px] sm:min-h-[840px] bg-background text-foreground flex flex-col items-center justify-end pt-44 xs:pt-52 sm:pt-76 pb-8 sm:pb-14 px-2.5 xs:px-4 select-none overflow-hidden transition-colors duration-300"
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
		>
			{/* Main Envelope Stage */}
			<div
				onClick={() => {
					if (!isTransitioning) setCycleKey((k) => k + 1);
				}}
				title="Click to replay envelope animation"
				className="relative w-full max-w-[340px] xs:max-w-[400px] sm:max-w-[540px] h-[230px] xs:h-[260px] sm:h-[336px] cursor-pointer"
				style={{
					perspective: "1500px",
					perspectiveOrigin: "50% 0%",
					transform: envelopeSlideTransform,
					opacity: envelopeSlideOpacity,
					transition: isInstantJump
						? "none"
						: `transform ${slideDuration}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${Math.round(slideDuration * 0.75)}ms ease`,
					willChange: "transform, opacity",
				}}
			>
				{/* 1. Envelope Back Interior Lining (Behind Card) */}
				<div
					className={cn(
						"absolute inset-0 overflow-hidden transition-colors duration-500",
						flapBehind ? "rounded-b-[10px] rounded-t-none" : "rounded-[10px]",
					)}
					style={{
						backgroundColor: activeItem.innerColor,
						zIndex: 1,
					}}
				/>

				{/* 2. Top Triangular Flap (3D Hinged Flush at Top Edge) */}
				<div
					className="absolute top-0 left-0 right-0 h-[52%] pointer-events-none"
					style={{
						transformOrigin: "top center",
						transform: isFlapOpen ? "rotateX(180deg)" : "rotateX(0deg)",
						transition: `transform ${activeFlapDuration}ms cubic-bezier(0.42, 0, 0.58, 1)`,
						zIndex: flapBehind ? 5 : 35,
						willChange: "transform",
					}}
				>
					<svg
						viewBox="0 0 540 175"
						preserveAspectRatio="none"
						className="absolute inset-0 w-full h-full overflow-visible"
					>
						<path
							d={
								flapBehind
									? "M 0,-2 L 540,-2 L 540,0 L 278,168 Q 270,174 262,168 L 0,0 Z"
									: "M 0,6 Q 0,0 6,0 L 534,0 Q 540,0 540,6 L 278,168 Q 270,174 262,168 Z"
							}
							fill={
								flapBehind
									? activeItem.innerColor
									: activeItem.outerColor
							}
							stroke={flapBehind ? "none" : activeItem.creaseColor}
							strokeWidth="1.2"
						/>
					</svg>
				</div>

				{/* 3. Editorial Letterhead Testimonial Card (Pulls Up Out of Deep Pocket -> Settles in Front of Envelope) */}
				<div
					className="loom-card-slot absolute inset-x-0 bottom-[12px] sm:bottom-[16px] flex justify-center pointer-events-none"
					style={{
						transformOrigin: "bottom center",
						zIndex: 15,
						animation: cardAnimation,
						willChange: "transform",
					}}
				>
					<div
						className="w-[90%] sm:w-[87%] rounded-[8px] sm:rounded-[10px] bg-card text-card-foreground border border-border/80 pointer-events-auto relative overflow-hidden transition-colors duration-300"
						style={{
							boxShadow: isExtracting
								? "0 24px 44px -14px rgba(0, 0, 0, 0.24), 0 6px 16px -4px rgba(0, 0, 0, 0.08)"
								: "0 4px 10px -4px rgba(0, 0, 0, 0.08)",
						}}
					>
						{/* Top Accent Stationery Bar */}
						<div className="h-[3px] sm:h-[3.5px] w-full bg-primary transition-colors duration-300" />

						<div className="px-3.5 xs:px-4 sm:px-7 pt-3 xs:pt-3.5 sm:pt-5 pb-3 xs:pb-3.5 sm:pb-5">
							{/* Header Row: Rating + Impact Metric Pill */}
							<div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-2 sm:mb-3">
								<div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
									<div className="flex items-center gap-0.5">
										{Array.from({ length: 5 }).map((_, sIdx) => {
											const filled = sIdx < Math.round(activeItem.rating);
											return (
												<Star
													key={sIdx}
													className={cn(
														"w-2.5 h-2.5 sm:w-3 sm:h-3",
														filled
															? "fill-amber-500 text-amber-500"
															: "fill-muted text-muted",
													)}
												/>
											);
										})}
									</div>
									<span className="font-mono text-[9.5px] sm:text-[10.5px] font-bold text-foreground/80">
										{activeItem.rating.toFixed(1)}
									</span>
								</div>

								<span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[8.5px] xs:text-[9.5px] sm:text-[10.5px] font-semibold tracking-[0.02em] sm:tracking-[0.03em] bg-primary/10 text-primary border border-primary/25 truncate">
									<span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary shrink-0" />
									<span className="truncate">{activeItem.metricBadge}</span>
								</span>
							</div>

							{/* Quote Body */}
							<div className="relative pl-2.5 sm:pl-3.5 my-1.5 sm:my-2.5">
								<div className="absolute left-0 top-1 bottom-1 w-[2px] rounded-full bg-primary/60" />
								<p className="text-[11.5px] xs:text-[12.5px] sm:text-[15px] leading-[17px] xs:leading-[19px] sm:leading-[25px] font-normal tracking-[-0.01em] text-foreground/90 min-h-[51px] xs:min-h-[57px] sm:min-h-[75px] line-clamp-3 sm:line-clamp-none">
									&ldquo;{activeItem.content}&rdquo;
								</p>
							</div>

							{/* Bottom Author Row separated by dashed stationery perforation */}
							<div className="flex items-center justify-between gap-2 sm:gap-3 mt-2.5 sm:mt-3.5 pt-2 sm:pt-3 border-t border-dashed border-border">
								<div className="flex items-center gap-2 sm:gap-3 min-w-0">
									{/* Framed Stamp Avatar */}
									<div
										className="relative shrink-0 p-[2.5px] sm:p-[3.5px] bg-background rounded-[5px] sm:rounded-[6px] shadow-xs border border-border"
										style={{ transform: "rotate(-2.5deg)" }}
									>
										<img
											src={activeItem.avatar}
											alt={activeItem.name}
											className="w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 object-cover rounded-[2.5px] sm:rounded-[3px] block"
											loading="lazy"
										/>
									</div>

									<div className="flex flex-col text-left min-w-0">
										<div className="flex items-center gap-1 sm:gap-1.5">
											<span className="text-[11.5px] xs:text-[12.5px] sm:text-[14px] font-bold tracking-[-0.01em] text-foreground leading-tight truncate">
												{activeItem.name}
											</span>
											<svg
												width="12"
												height="12"
												viewBox="0 0 24 24"
												className="fill-primary shrink-0 sm:w-[13px] sm:h-[13px]"
												aria-hidden="true"
											>
												<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.41 14.59L6.7 12.7l1.41-1.41 2.48 2.48 5.29-5.29 1.41 1.41-6.7 6.7z" />
											</svg>
										</div>
										<span className="text-[9.5px] xs:text-[10.5px] sm:text-[11.5px] text-muted-foreground leading-snug mt-0.5 truncate">
											{activeItem.role} · <strong className="font-medium text-foreground/85">{activeItem.company}</strong>
										</span>
									</div>
								</div>

								{/* Right Dispatch Date & Ref */}
								<div className="hidden sm:flex flex-col items-end text-right font-mono shrink-0">
									<span className="text-[9.5px] uppercase tracking-[0.08em] text-muted-foreground">
										{activeItem.dispatchCode}
									</span>
									<span className="text-[10px] font-semibold text-foreground/80">
										{activeItem.date}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* 4. Full Front Envelope Pocket (zIndex 25: Card is 100% hidden behind it when inside, rises out of V-mouth, then settles in front at zIndex 30) */}
				<div
					className={cn(
						"absolute inset-0 overflow-hidden pointer-events-none",
						flapBehind ? "rounded-b-[10px] rounded-t-none" : "rounded-[10px]",
					)}
					style={{ zIndex: 25 }}
				>
					<svg
						viewBox="0 0 540 336"
						preserveAspectRatio="none"
						className="absolute inset-0 w-full h-full"
					>
						{/* Left Folded Side Flap */}
						<path
							d="M 0,0 L 270,175 L 0,336 Z"
							fill={activeItem.sideFlapColor}
							stroke={activeItem.creaseColor}
							strokeWidth="1.15"
						/>

						{/* Right Folded Side Flap */}
						<path
							d="M 540,0 L 270,175 L 540,336 Z"
							fill={activeItem.sideFlapColor}
							stroke={activeItem.creaseColor}
							strokeWidth="1.15"
						/>

						{/* Bottom Overlapping Pocket Flap */}
						<path
							d="M 0,336 L 260,156 Q 270,149 280,156 L 540,336 Z"
							fill={activeItem.outerColor}
							stroke={activeItem.creaseColor}
							strokeWidth="1.2"
						/>
					</svg>

					{/* Minimalist Center Pocket Clasp Emblem */}
					<div
						className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors duration-500"
						style={{
							backgroundColor: activeItem.outerColor,
							border: `1.25px solid ${activeItem.creaseColor}`,
							color: activeItem.stampColor,
						}}
					>
						<div
							className="w-4 h-4 xs:w-5 xs:h-5 sm:w-5.5 sm:h-5.5 rounded-full flex items-center justify-center"
							style={{
								border: `1px solid ${activeItem.creaseColor}`,
							}}
						>
							<Star className="w-2 h-2 xs:w-2.5 xs:h-2.5 fill-current opacity-85" />
						</div>
					</div>

					{/* Simple Minimalist Bottom Footer (Inside Bottom Flap, Clear of Crease Lines) */}
					<div
						className="absolute inset-x-7 xs:inset-x-10 sm:inset-x-16 bottom-2 sm:bottom-3 flex items-center justify-between gap-2 text-[8.5px] xs:text-[9.5px] sm:text-[11px]"
						style={{ color: activeItem.stampColor }}
					>
						<div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
							<span className="font-mono font-semibold tracking-[0.06em] sm:tracking-[0.08em] opacity-65 shrink-0">
								{serialNumber}
							</span>
							<span className="opacity-30 shrink-0">•</span>
							<span className="font-semibold tracking-[0.02em] opacity-90 truncate">
								{activeItem.company}
							</span>
						</div>

						<div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
							<span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary opacity-80" />
							<span className="font-mono text-[8px] xs:text-[9px] sm:text-[10px] uppercase tracking-[0.08em] sm:tracking-[0.1em] opacity-70">
								{activeItem.date}
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Navigation Strip: Mini Envelope Thumbnails + Theme-Styled Arrow Buttons */}
			<div className="relative z-40 flex flex-col items-center gap-4 sm:gap-5 mt-7 sm:mt-11 w-full">
				<div className="flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2.5 max-w-full px-1">
					{items.map((env, idx) => {
						const isActive = idx === activeIndex;
						return (
							<div key={env.id} className="flex flex-col items-center">
								<button
									type="button"
									onClick={() => handleSelect(idx)}
									aria-label={`Select testimonial ${idx + 1} from ${env.name}`}
									className={cn(
										"relative w-[38px] h-[26px] xs:w-[44px] xs:h-[30px] sm:w-[54px] sm:h-[36px] rounded-[5px] sm:rounded-[6px] overflow-hidden transition-all cursor-pointer",
										isActive
											? "ring-[1.5px] ring-primary ring-offset-[2px] ring-offset-background scale-[1.03]"
											: "opacity-75 hover:opacity-100",
									)}
									style={{
										backgroundColor: env.outerColor,
									}}
								>
									{/* Mini 3D envelope flap polygons */}
									<svg
										viewBox="0 0 54 36"
										preserveAspectRatio="none"
										className="absolute inset-0 w-full h-full pointer-events-none"
									>
										<polygon
											points="0,0 27,19 0,36"
											fill={env.sideFlapColor}
										/>
										<polygon
											points="54,0 27,19 54,36"
											fill={env.sideFlapColor}
										/>
										<path
											d="M 0,36 L 27,17 L 54,36 Z"
											fill={env.outerColor}
											stroke={env.creaseColor}
											strokeWidth="0.9"
										/>
										<path
											d="M 0,0 L 27,19 L 54,0"
											fill="none"
											stroke={env.creaseColor}
											strokeWidth="1"
										/>
									</svg>

									{/* Mini stamp avatar in bottom-right corner */}
									<div className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 w-3 h-3 sm:w-4 sm:h-4 bg-card p-[1px] sm:p-[1.5px] rounded-[2px] shadow-2xs">
										<img
											src={env.avatar}
											alt=""
											className="w-full h-full object-cover rounded-[1px] block"
											loading="lazy"
										/>
									</div>
								</button>

								{/* Active progress indicator bar synced to `totalCycleDuration` */}
								<div className="w-full h-[2px] mt-1 sm:mt-1.5 rounded-full overflow-hidden bg-primary/15">
									{isActive && (
										<div
											key={`${activeIndex}-${cycleKey}-${totalCycleDuration}`}
											className="h-full bg-primary rounded-full"
											style={{
												width: "100%",
												transformOrigin: "left center",
												animation:
													autoSlide && !isPaused
														? `loom-progress-fill ${totalCycleDuration}ms linear forwards`
														: "none",
											}}
										/>
									)}
								</div>
							</div>
						);
					})}
				</div>

				{/* Paired Rounded-XL Arrow Navigation Buttons (matching reference screenshot) */}
				<div className="flex items-center justify-center gap-3">
					<button
						type="button"
						onClick={handlePrev}
						className="size-9 xs:size-10 sm:size-11 rounded-xl border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 active:scale-95 transition-all flex items-center justify-center shadow-none cursor-pointer"
						aria-label="Previous envelope"
					>
						<ArrowLeft className="size-4 stroke-[2.5]" />
					</button>
					<button
						type="button"
						onClick={handleNext}
						className="size-9 xs:size-10 sm:size-11 rounded-xl bg-primary text-primary-foreground hover:opacity-90 active:scale-95 transition-all flex items-center justify-center shadow-none cursor-pointer"
						aria-label="Next envelope"
					>
						<ArrowRight className="size-4 stroke-[2.5]" />
					</button>
				</div>
			</div>

			<style>{`
				.loom-stage-root {
					--loom-inside-y: 12px;
					--loom-inside-scale: 0.54;
					--loom-peak-y: -210px;
					--loom-peak-scale: 0.85;
					--loom-settle-y: -18px;
				}
				@media (min-width: 480px) {
					.loom-stage-root {
						--loom-inside-y: 12px;
						--loom-inside-scale: 0.58;
						--loom-peak-y: -232px;
						--loom-peak-scale: 0.86;
						--loom-settle-y: -22px;
					}
				}
				@media (min-width: 640px) {
					.loom-stage-root {
						--loom-inside-y: 14px;
						--loom-inside-scale: 0.62;
						--loom-peak-y: -275px;
						--loom-peak-scale: 0.86;
						--loom-settle-y: -26px;
					}
				}
				.loom-card-slot {
					transform: translate3d(0px, var(--loom-inside-y), 0px) rotate(0deg) scale(var(--loom-inside-scale));
				}
				@keyframes loom-progress-fill {
					from { transform: scaleX(0); }
					to   { transform: scaleX(1); }
				}
				@keyframes loom-card-extract {
					0% {
						transform: translate3d(0px, var(--loom-inside-y), 0px) rotate(0deg) scale(var(--loom-inside-scale));
						z-index: 15;
						animation-timing-function: cubic-bezier(0.33, 1, 0.68, 1);
					}
					52% {
						transform: translate3d(0px, var(--loom-peak-y), 0px) rotate(0.5deg) scale(var(--loom-peak-scale));
						z-index: 15;
					}
					53% {
						transform: translate3d(0px, var(--loom-peak-y), 0px) rotate(0.5deg) scale(var(--loom-peak-scale));
						z-index: 30;
						animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
					}
					100% {
						transform: translate3d(0px, var(--loom-settle-y), 0px) rotate(-1.5deg) scale(1);
						z-index: 30;
					}
				}
				@keyframes loom-card-insert {
					0% {
						transform: translate3d(0px, var(--loom-settle-y), 0px) rotate(-1.5deg) scale(1);
						z-index: 30;
						animation-timing-function: cubic-bezier(0.33, 1, 0.68, 1);
					}
					47% {
						transform: translate3d(0px, var(--loom-peak-y), 0px) rotate(0.5deg) scale(var(--loom-peak-scale));
						z-index: 30;
					}
					48% {
						transform: translate3d(0px, var(--loom-peak-y), 0px) rotate(0.5deg) scale(var(--loom-peak-scale));
						z-index: 15;
						animation-timing-function: cubic-bezier(0.32, 0, 0.2, 1);
					}
					100% {
						transform: translate3d(0px, var(--loom-inside-y), 0px) rotate(0deg) scale(var(--loom-inside-scale));
						z-index: 15;
					}
				}
			`}</style>
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
}: ReviewsProps) {
	if (variant === "testimonial-loom") {
		return (
			<section
				className={cn(
					"relative w-full overflow-hidden border-y border-border transition-colors duration-300",
					className,
				)}
			>
				<TestimonialLoomVariant
					reviews={reviews}
					autoSlide={autoSlide}
					animationSpeed={marqueeSpeed}
				/>
			</section>
		);
	}

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
					${SWAP_KEYFRAMES}
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
				${SWAP_KEYFRAMES}
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
