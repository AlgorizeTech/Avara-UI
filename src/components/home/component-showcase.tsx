"use client";

import { Folder, type FolderFile } from "@/components/custom/blocks/FolderBlock";
import { DesignComponentsFolder } from "@/components/custom/blocks/DesignComponentsFolder";
import { Dock, DockItem } from "@/components/custom/blocks/DockBlock";
import { Wallet } from "@/components/custom/blocks/WalletBlock";
import { CardStack, type CardStackItem } from "@/components/custom/blocks/CardStackBlock";
import { ThreeDCarousel, CarouselItem } from "@/components/custom/blocks/ThreeDCarouselBlock";
import { CommandSearchBlock } from "@/components/custom/blocks/UtilityBlocks";
import {
	Avatar,
	AvatarGroup,
	AvatarGroupTooltip,
	AvatarImage,
	AvatarFallback,
} from "@/components/custom/blocks/AvatarStackBlock";
import { PricingPlansPro } from "@/components/custom/blocks/Pricing";
import { cn } from "@/lib/utils";
import {
	ArrowUpRight,
	Bot,
	Code2,
	Compass,
	FileText,
	FolderOpen,
	Layers,
	Paintbrush,
	Sparkles,
	Terminal,
	Boxes,
	BarChart3,
	CreditCard,
	GalleryVerticalEnd,
	Users,
} from "lucide-react";
import Link from "@/components/site/intent-link";
import { useRef } from "react";
import { SECTION_INNER, SECTION_EYEBROW, SECTION_H2, SECTION_SUB, CHIP } from "@/components/home/shared";
import { FitToWidth } from "@/components/home/fit-to-width";

const sampleDockItems: DockItem[] = [
	{
		id: "home",
		label: "Overview",
		icon: <Boxes className="size-5 text-primary" />,
	},
	{ id: "ai", label: "AI Chat", icon: <Bot className="size-5 text-primary" /> },
	{
		id: "chart",
		label: "Analytics",
		icon: <BarChart3 className="size-5 text-primary" />,
	},
	{
		id: "code",
		label: "Components",
		icon: <Code2 className="size-5 text-primary" />,
	},
	{
		id: "terminal",
		label: "Terminal",
		icon: <Terminal className="size-5 text-primary" />,
	},
];

const sampleCaseFiles: FolderFile[] = [
	{ name: "Deposition_transcript.pdf" },
	{ name: "Exhibit_A_photos.zip" },
	{ name: "Witness_statement_02.docx" },
	{ name: "Timeline_v3.xlsx" },
	{ name: "Court_filing_draft.pdf" },
	{ name: "Evidence_log.csv" },
];

const sampleCarouselItems: CarouselItem[] = [
	{
		id: "1",
		title: "Misty Pine Forest",
		category: "Nature",
		image:
			"https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
		description: "Early morning fog weaving through dense evergreen trees.",
	},
	{
		id: "2",
		title: "Lush River Valley",
		category: "Wilderness",
		image:
			"https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
		description: "Sunbeams streaming through valley clouds onto forest waters.",
	},
	{
		id: "3",
		title: "Autumn Woodland Path",
		category: "Landscape",
		image:
			"https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
		description: "Golden foliage covering quiet forest trails in peak autumn.",
	},
];

const sampleGroupAvatars = [
	{
		src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg",
		alt: "Ana Watson",
		name: "Ana Watson",
		fallback: "AW",
		designation: "Product Designer",
	},
	{
		src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg",
		alt: "Tom Hardy",
		name: "Tom Hardy",
		fallback: "TH",
		designation: "Frontend Developer",
	},
	{
		src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg",
		alt: "Mara Jade",
		name: "Mara Jade",
		fallback: "MJ",
		designation: "Engineering Lead",
	},
	{
		src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg",
		alt: "Leo Silva",
		name: "Leo Silva",
		fallback: "LS",
		designation: "Creative Technologist",
	},
];

/* Layout widths for the showcase demos that size themselves by viewport
   breakpoints. Below each breakpoint the demo is already in its compact
   mobile form, so it lays out at the column width instead of being shrunk
   a second time. */
const CAROUSEL_WIDTH = (vw: number) => (vw < 640 ? 460 : 720);
const DESIGN_FOLDER_WIDTH = (vw: number) =>
	vw < 640 ? 420 : vw < 768 ? undefined : vw < 1024 ? 760 : 840;
const DOCK_WIDTH = (vw: number) => (vw < 640 ? 300 : 380);

const STACK_ICON =
	"size-11 rounded-2xl flex items-center justify-center text-white shadow-xs";

const sampleStackItems: CardStackItem[] = [
	{
		id: "ai-chat",
		title: "AI Chat",
		description: "Streaming replies, model picker and a composer that grows.",
		category: "Blocks",
		date: "New",
		icon: (
			<div className={cn(STACK_ICON, "bg-violet-600")}>
				<Bot className="size-5" />
			</div>
		),
	},
	{
		id: "analytics",
		title: "Analytics",
		description: "Animated bar, line and area charts on theme tokens.",
		category: "Data",
		date: "2d ago",
		icon: (
			<div className={cn(STACK_ICON, "bg-emerald-600")}>
				<BarChart3 className="size-5" />
			</div>
		),
	},
	{
		id: "terminal",
		title: "Terminal",
		description: "Typed command output with copy and a success trail.",
		category: "Developer",
		date: "4d ago",
		icon: (
			<div className={cn(STACK_ICON, "bg-zinc-800")}>
				<Terminal className="size-5" />
			</div>
		),
	},
	{
		id: "theming",
		title: "Theming",
		description: "One preset re-skins every block, light and dark.",
		category: "Design",
		date: "1w ago",
		icon: (
			<div className={cn(STACK_ICON, "bg-amber-600")}>
				<Paintbrush className="size-5" />
			</div>
		),
	},
];

export function ComponentShowcase() {
	const ref = useRef(null);

	return (
		<section ref={ref} className="py-13 md:py-16">
			<div className={SECTION_INNER}>
				<div
					className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
					<div>
						<span className={SECTION_EYEBROW}>
							<Layers className="size-3.5" />
							Live Interactive Components
						</span>
						<h2 className={SECTION_H2}>Real Motion &amp; Interactive Blocks</h2>
						<p className={SECTION_SUB}>
							Featuring Wallet, Card Stack, Magnifying Dock, and 3D Motion
							Carousel.
						</p>
					</div>
					<Link
						href="/docs/nextjs"
						className="group flex items-center gap-1.5 text-[13px] font-medium text-foreground/70 hover:text-foreground transition-colors shrink-0">
						View all components
						<ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
					</Link>
				</div>

				{/* 3-COLUMN LAYOUT */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
					{/* Column 1 */}
					<div
						className="flex flex-col gap-6">
						<div className="showcase-card rounded-2xl border border-foreground/[0.06] bg-card p-5 overflow-hidden">
							<div className="flex items-center justify-between gap-3 mb-4">
								<span className="flex min-w-0 items-center gap-1.5 text-[14px] font-semibold text-foreground">
									<CreditCard className="size-3.5 shrink-0 text-primary" />
									<span className="truncate">Wallet</span>
								</span>
								<span className={CHIP}>Hover &amp; Flip</span>
							</div>
							<FitToWidth width={380}>
								<Wallet className="p-0 sm:p-0" />
							</FitToWidth>
						</div>

						<div className="showcase-card rounded-2xl border border-foreground/[0.06] bg-card p-5 overflow-hidden">
							<div className="flex items-center justify-between gap-3 mb-2">
								<span className="flex min-w-0 items-center gap-1.5 text-[14px] font-semibold text-foreground">
									<GalleryVerticalEnd className="size-3.5 shrink-0 text-primary" />
									<span className="truncate">Card Stack</span>
								</span>
								<span className={CHIP}>Swipe to Discard</span>
							</div>
							<FitToWidth scale={0.7}>
								<CardStack
									items={sampleStackItems}
									loop
									swipeToDismiss
									showNavigation={false}
									showHeader={false}
									className="max-w-none"
								/>
							</FitToWidth>
						</div>

						<div className="showcase-card rounded-2xl border border-foreground/[0.06] bg-card p-2 overflow-hidden">
							<div className="px-3 py-2 border-b border-foreground/[0.06] flex items-center justify-between gap-3 text-[14px] text-foreground/40 font-medium">
								<span className="flex min-w-0 items-center gap-1.5 text-foreground font-semibold">
									<Terminal className="size-3.5 shrink-0 text-primary" />
									<span className="truncate">Command Launcher</span>
								</span>
							</div>
							<CommandSearchBlock />
						</div>
					</div>

					{/* Column 2 */}
					<div
						className="flex flex-col gap-6">
						<div className="showcase-card rounded-2xl border border-foreground/[0.06] bg-card p-5 overflow-hidden">
							<div className="flex items-center justify-between gap-3 mb-4">
								<span className="flex min-w-0 items-center gap-1.5 text-[14px] font-semibold text-foreground">
									<Layers className="size-3.5 shrink-0 text-primary" />
									<span className="truncate">3D Fanned Carousel</span>
								</span>
								<span className={CHIP}>Interactive</span>
							</div>
							{/* The carousel lays out wide enough for the fanned side cards,
							    then scales down to the column. */}
							<FitToWidth width={CAROUSEL_WIDTH}>
								<ThreeDCarousel items={sampleCarouselItems} autoPlay={false} />
							</FitToWidth>
						</div>

						<div className="showcase-card rounded-2xl border border-foreground/[0.06] bg-card p-5 overflow-hidden">
							<div className="flex items-center justify-between gap-3 mb-4">
								<span className="flex min-w-0 items-center gap-1.5 text-[14px] font-semibold text-foreground">
									<FolderOpen className="size-3.5 shrink-0 text-primary" />
									<span className="truncate">Design Components Folder</span>
								</span>
								<span className={CHIP}>Auto Loop</span>
							</div>
							{/* The stage is sized by viewport breakpoints (up to 960×700), so it
							    is laid out at 840px wide and scaled down to the column. */}
							<FitToWidth width={DESIGN_FOLDER_WIDTH}>
								<DesignComponentsFolder disableLinks className="py-0 md:py-0" />
							</FitToWidth>
						</div>

						<div className="showcase-card rounded-2xl border border-foreground/[0.06] bg-card p-6 overflow-hidden">
							<div className="w-full flex items-center justify-between gap-3 text-[14px] font-medium mb-6">
								<span className="flex min-w-0 items-center gap-1.5 text-foreground font-semibold">
									<Compass className="size-3.5 shrink-0 text-primary" />
									<span className="truncate">Magnifying macOS Dock</span>
								</span>
								<span className={CHIP}>Interactive Hover</span>
							</div>
							{/* Laid out wide enough for the dock at full magnification, so
							    a narrow column scales it rather than clipping its ends. */}
							<div className="py-4 w-full">
								<FitToWidth width={DOCK_WIDTH}>
									<Dock
										items={sampleDockItems}
										baseSize={44}
										magnification={68}
										distance={130}
										containerHeight={84}
									/>
								</FitToWidth>
							</div>
						</div>

						<div className="showcase-card rounded-2xl border border-foreground/[0.06] bg-card px-5 pt-5 pb-2 overflow-hidden">
							<div className="flex items-center justify-between gap-3 mb-4">
								<span className="flex min-w-0 items-center gap-1.5 text-[14px] font-semibold text-foreground">
									<Users className="size-3.5 shrink-0 text-primary" />
									<span className="truncate">Avatar Group</span>
								</span>
								<span className={CHIP}>Shift on Hover</span>
							</div>
							<div className="flex items-center justify-center pt-6 pb-1">
								<AvatarGroup className="m-0 p-0">
									{sampleGroupAvatars.map((avatar, index) => (
										<Avatar
											key={index}
											className="size-12 border-[3px] border-background ring-0 cursor-pointer">
											<AvatarImage src={avatar.src} alt={avatar.alt} />
											<AvatarFallback>{avatar.fallback}</AvatarFallback>
											<AvatarGroupTooltip designation={avatar.designation}>
												{avatar.name}
											</AvatarGroupTooltip>
										</Avatar>
									))}
								</AvatarGroup>
							</div>
						</div>
					</div>

					{/* Column 3 */}
					<div
						className="flex flex-col gap-6">
						<div className="showcase-card rounded-2xl border border-foreground/[0.06] bg-card p-5 overflow-hidden">
							<div className="flex items-center justify-between gap-3 mb-4">
								<span className="flex min-w-0 items-center gap-1.5 text-[14px] font-semibold text-foreground">
									<FolderOpen className="size-3.5 shrink-0 text-primary" />
									<span className="truncate">Folder</span>
								</span>
								<span className={CHIP}>Fan on Hover</span>
							</div>
							{/* Headroom above, not around: the fan lifts the file cards well
							    above the folder's top edge and the name tooltip sits above that. */}
							<div className="flex items-center justify-center pt-24 pb-4">
								<Folder
									files={sampleCaseFiles}
									label="Case files"
									icon={FileText}
									size={200}
								/>
							</div>
						</div>

						<div className="showcase-card rounded-2xl border border-foreground/[0.06] bg-card p-5 overflow-hidden">
							<div className="flex items-center justify-between gap-3 mb-4 text-[14px] text-foreground/40 font-medium">
								<span className="flex min-w-0 items-center gap-1.5 text-foreground font-semibold">
									<Sparkles className="size-3.5 shrink-0 text-primary" />
									<span className="truncate">Plans Pro</span>
								</span>
								<span className={CHIP}>Interactive Accordion</span>
							</div>
							<div>
								<FitToWidth scale={0.82}>
									<PricingPlansPro
										compact
										layoutMode="vertical"
										badgeText=""
										title=""
										subtitle=""
										orderHref="/docs/nextjs/pricing"
										color="primary"
										counting={true}
									/>
								</FitToWidth>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
