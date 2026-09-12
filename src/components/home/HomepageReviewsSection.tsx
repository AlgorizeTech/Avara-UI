import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

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

function AmbientGlowSphere() {
	return (
		<div className="relative flex items-center justify-center pointer-events-none overflow-hidden">
			<div className="size-[320px] sm:size-[500px] rounded-full bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent blur-3xl opacity-60 animate-pulse" />
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
				{/* Ambient Glow Backdrop */}
				<div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
					<AmbientGlowSphere />
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
