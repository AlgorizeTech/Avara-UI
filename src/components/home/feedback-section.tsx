"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight, Maximize, MessageCircle, Pause, Play } from "lucide-react";
import { Fragment, Suspense, lazy, useRef, useState, type ReactNode } from "react";
import { SITE_NAME } from "@/config/site";
import { SECTION_INNER, SECTION_H2, SECTION_SUB, EYEBROW_PILL } from "@/components/home/shared";
import { FEEDBACK, type FeedbackItem, type FeedbackMedia } from "@/components/home/feedback-data";

/* The modal player (Radix dialog + sliders) only downloads when someone opens it. */
const FeedbackVideoModal = lazy(() =>
	import("@/components/home/feedback-video-modal").then((m) => ({ default: m.FeedbackVideoModal })),
);

/* ═══════════════════════════════════════════════
   SECTION 5.5: FEEDBACK WALL
   A masonry of posts and reviews. Every field except name + message is
   optional: the card is a flex column of independent rows, so a missing
   rating, image, handle or link just drops its row instead of leaving a gap.

   Linking: the whole card opens the original post through a "stretched" link
   (an ::after on the platform icon that covers the card), and the author block
   sits above it with its own link to their profile. Nothing nests an <a> in an
   <a>.
   ═══════════════════════════════════════════════ */

type Platform = "x" | "linkedin" | "web";

const PLATFORM_LABEL: Record<Platform, string> = {
	x: "X",
	linkedin: "LinkedIn",
	web: "the web",
};

function parseUrl(value?: string): URL | null {
	if (!value) return null;
	try {
		return new URL(value);
	} catch {
		return null;
	}
}

function platformOf(item: FeedbackItem): Platform {
	for (const value of [item.profile, item.url]) {
		const host = parseUrl(value)?.hostname.replace(/^www\./, "");
		if (host === "x.com" || host === "twitter.com") return "x";
		if (host === "linkedin.com" || host === "lnkd.in") return "linkedin";
	}
	return "web";
}

/** "@handle" for X, the network name elsewhere, undefined when there's no profile. */
function handleOf(item: FeedbackItem, platform: Platform): string | undefined {
	const profile = parseUrl(item.profile);
	if (!profile) return undefined;
	if (platform === "x") {
		const user = profile.pathname.split("/").filter(Boolean)[0];
		return user ? `@${user}` : "X";
	}
	if (platform === "linkedin") return "LinkedIn";
	return profile.hostname.replace(/^www\./, "");
}

function initialsOf(name: string): string {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (!parts.length) return "?";
	const letters = parts.length === 1 ? parts[0].slice(0, 2) : parts[0][0] + parts[parts.length - 1][0];
	return letters.toUpperCase();
}

/* ─── Icons (inline so the section pulls in no extra dependency) ─── */

function XIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
			<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
		</svg>
	);
}

function LinkedInIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
			<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
		</svg>
	);
}

function PlatformIcon({ platform, className }: { platform: Platform; className?: string }) {
	if (platform === "x") return <XIcon className={className} />;
	if (platform === "linkedin") return <LinkedInIcon className={className} />;
	return <ArrowUpRight aria-hidden="true" className={className} />;
}

/* ─── Rating ─── */

const STAR_PATH = "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";

function RatingStars({ rating }: { rating: number }) {
	const value = Math.max(0, Math.min(5, rating));
	return (
		<div role="img" aria-label={`Rated ${value} out of 5`} className="flex items-center gap-0.5">
			{Array.from({ length: 5 }).map((_, index) => {
				const fill = Math.max(0, Math.min(1, value - index));
				return (
					<span key={index} className="relative size-4 shrink-0">
						<svg viewBox="0 0 24 24" fill="currentColor" className="absolute inset-0 size-full text-foreground/15">
							<path d={STAR_PATH} />
						</svg>
						{fill > 0 && (
							<span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
								<svg viewBox="0 0 24 24" fill="currentColor" className="size-4 text-amber-400">
									<path d={STAR_PATH} />
								</svg>
							</span>
						)}
					</span>
				);
			})}
		</div>
	);
}

/* ─── Media ─── */

/* One play/pause button at the bottom left, no native controls. Clicking the
   video toggles too. The poster is the video's own `poster`, and with
   preload="none" nothing of the file downloads until the first play. */
function VideoPlayer({ media, name, alt }: { media: FeedbackMedia; name: string; alt: string }) {
	const ref = useRef<HTMLVideoElement>(null);
	const [playing, setPlaying] = useState(false);
	const size = media.width && media.height ? { width: media.width, height: media.height } : {};

	const toggle = () => {
		const video = ref.current;
		if (!video) return;
		if (video.paused) video.play().catch(() => setPlaying(false));
		else video.pause();
	};

	/* The larger view hands over where the card's video had got to and takes it
	   back on close. It stays mounted after the first open so Radix can play
	   its exit animation. */
	const [modal, setModal] = useState({ mounted: false, open: false, startAt: 0 });
	const openModal = () => {
		const video = ref.current;
		video?.pause();
		setModal({ mounted: true, open: true, startAt: video?.currentTime ?? 0 });
	};
	const closeModal = (time: number) => {
		setModal((current) => ({ ...current, open: false }));
		if (ref.current && time > 0) ref.current.currentTime = time;
	};

	/* Sits above the card's stretched link so clicking the video doesn't open the post. */
	return (
		<>
		<div
			onClick={toggle}
			className="group/video relative z-10 cursor-pointer overflow-hidden rounded-2xl border border-foreground/[0.06] bg-black">
			<video
				ref={ref}
				src={media.src}
				poster={media.poster}
				preload={media.poster ? "none" : "metadata"}
				playsInline
				aria-label={alt}
				{...size}
				onPlay={() => setPlaying(true)}
				onPause={() => setPlaying(false)}
				onEnded={() => setPlaying(false)}
				className="block h-auto w-full object-cover"
			/>
			<span
				aria-hidden="true"
				className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent"
			/>
			<button
				type="button"
				aria-label={playing ? "Pause video" : "Play video"}
				className="absolute bottom-3 left-3 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/20 backdrop-blur-md outline-none transition-[transform,background-color] duration-200 hover:scale-105 hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-primary/70 motion-reduce:transition-none motion-reduce:hover:scale-100">
				{playing ? (
					<Pause className="size-4 fill-current" />
				) : (
					<Play className="size-4 translate-x-px fill-current" />
				)}
			</button>
			<button
				type="button"
				aria-label="Open video in a larger view"
				onClick={(event) => {
					event.stopPropagation();
					openModal();
				}}
				className="absolute bottom-3 right-3 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/20 backdrop-blur-md outline-none transition-[transform,background-color] duration-200 hover:scale-105 hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-primary/70 motion-reduce:transition-none motion-reduce:hover:scale-100">
				<Maximize className="size-4" />
			</button>
		</div>
		{modal.mounted && (
			<Suspense fallback={null}>
				<FeedbackVideoModal media={media} name={name} open={modal.open} startAt={modal.startAt} onClose={closeModal} />
			</Suspense>
		)}
		</>
	);
}

function Media({ media, name }: { media: FeedbackMedia; name: string }) {
	const alt = media.alt ?? `Shared by ${name}`;

	if (media.type === "video") return <VideoPlayer media={media} name={name} alt={alt} />;

	const size = media.width && media.height ? { width: media.width, height: media.height } : {};
	return (
		<img
			src={media.src}
			alt={alt}
			loading="lazy"
			decoding="async"
			{...size}
			className="block h-auto w-full rounded-2xl border border-foreground/[0.06] bg-foreground/[0.03] object-cover"
		/>
	);
}

/* ─── Message ─── */

const TOKEN = /(https?:\/\/[^\s]+|@[A-Za-z0-9_]{1,15})/g;
const LINK = "relative z-10 text-primary underline-offset-2 hover:underline break-words";

/* The product name, picked out wherever a message mentions it. The capture
   group makes split() return the matches at the odd indexes. */
const BRAND_PATTERN = SITE_NAME.replace(/[.*+?^$()|[\]{}\\]/g, "\\$&").replace(/\s+/g, "\\s*");
const BRAND = new RegExp("(" + BRAND_PATTERN + ")", "i");

function highlight(text: string) {
	return text.split(BRAND).map((part, index) =>
		index % 2 ? (
			<mark
				key={index}
				className="rounded-md bg-primary/15 px-1.5 py-0.5 font-semibold text-primary [box-decoration-break:clone]">
				{part}
			</mark>
		) : (
			part
		),
	);
}

/** Plain text with URLs and (on X) @mentions turned into real links. */
function linkify(line: string, platform: Platform) {
	return line.split(TOKEN).map((part, index) => {
		if (/^https?:\/\//.test(part)) {
			const trailing = part.match(/[.,;:!?)]+$/)?.[0] ?? "";
			const href = trailing ? part.slice(0, -trailing.length) : part;
			return (
				<Fragment key={index}>
					<a href={href} target="_blank" rel="noopener noreferrer" className={LINK}>
						{href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
					</a>
					{trailing}
				</Fragment>
			);
		}
		if (part.startsWith("@")) {
			if (platform !== "x") return <span key={index} className="text-primary">{part}</span>;
			return (
				<a key={index} href={`https://x.com/${part.slice(1)}`} target="_blank" rel="noopener noreferrer" className={LINK}>
					{part}
				</a>
			);
		}
		return <Fragment key={index}>{highlight(part)}</Fragment>;
	});
}

/** "> tool, what it's for" lines. The text before the first comma is the item, the rest a chip. */
function ItemList({ items }: { items: string[] }) {
	return (
		<ul className="my-1 flex flex-col gap-1.5">
			{items.map((raw, index) => {
				const comma = raw.indexOf(",");
				const label = (comma === -1 ? raw : raw.slice(0, comma)).trim();
				const role = comma === -1 ? "" : raw.slice(comma + 1).trim();
				const mine = BRAND.test(label);
				return (
					<li
						key={index}
						className={cn(
							"flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13.5px] leading-snug",
							mine ? "bg-primary/10 ring-1 ring-inset ring-primary/25" : "bg-foreground/[0.035]",
						)}>
						<span
							aria-hidden="true"
							className={cn("size-1.5 shrink-0 rounded-full", mine ? "bg-primary" : "bg-foreground/25")}
						/>
						<span className="min-w-0 flex-1 font-medium text-foreground">{highlight(label)}</span>
						{role && (
							<span className="shrink-0 whitespace-nowrap rounded-full bg-foreground/[0.06] px-2 py-0.5 text-[11px] font-medium text-foreground/55">
								{role}
							</span>
						)}
					</li>
				);
			})}
		</ul>
	);
}

function Message({ text, platform }: { text: string; platform: Platform }) {
	/* A one-liner reads better set larger than a paragraph. */
	const short = text.length <= 64 && !text.includes("\n");

	/* Consecutive "> " lines collapse into one list; everything else is a line of text. */
	const blocks: ReactNode[] = [];
	let items: string[] = [];
	const flush = (key: number | string) => {
		if (!items.length) return;
		blocks.push(<ItemList key={`list-${key}`} items={items} />);
		items = [];
	};
	text.split("\n").forEach((line, index) => {
		if (line.startsWith(">")) {
			items.push(line.replace(/^>\s*/, ""));
			return;
		}
		flush(index);
		blocks.push(
			line.trim() ? (
				<span key={index} className="block">
					{linkify(line, platform)}
				</span>
			) : (
				<span key={index} className="block h-2" />
			),
		);
	});
	flush("end");

	return (
		<div
			className={cn(
				"break-words text-foreground/80",
				short ? "text-[17px] font-medium leading-snug tracking-[-0.01em] text-foreground" : "text-[14.5px] leading-[1.7]",
			)}>
			{blocks}
		</div>
	);
}

/* ─── Author ─── */

function Avatar({ name, src }: { name: string; src?: string }) {
	const [failed, setFailed] = useState(false);
	return (
		<span className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary/30 to-primary/10 text-[13px] font-semibold text-primary ring-1 ring-foreground/10 transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none">
			{/* Initials sit underneath so a missing or broken photo never leaves a hole. */}
			{initialsOf(name)}
			{src && !failed && (
				<img
					src={src}
					alt=""
					width={44}
					height={44}
					loading="lazy"
					decoding="async"
					referrerPolicy="no-referrer"
					onError={() => setFailed(true)}
					className="absolute inset-0 size-full object-cover"
				/>
			)}
		</span>
	);
}

function Author({ item, platform }: { item: FeedbackItem; platform: Platform }) {
	const handle = handleOf(item, platform);
	const text = (
		<>
			<span className="block truncate text-[14px] font-semibold text-foreground transition-colors duration-200 group-hover/author:text-primary">
				{item.name}
			</span>
			{handle && (
				<span className="mt-0.5 block truncate text-[12.5px] text-foreground/45 transition-colors duration-200 group-hover/author:text-primary/70">
					{handle}
				</span>
			)}
		</>
	);

	/* Only the name and handle are the profile link, so it lights up (and is
	   clickable) when the pointer is on them; the avatar and the rest of the
	   card still open the post. */
	return (
		<div className="flex min-w-0 items-center gap-3">
			<Avatar name={item.name} src={item.avatar} />
			{item.profile ? (
				<a
					href={item.profile}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={`${item.name} on ${PLATFORM_LABEL[platform]}`}
					className="group/author relative z-10 block min-w-0 rounded-md leading-tight outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-card">
					{text}
				</a>
			) : (
				<span className="block min-w-0 leading-tight">{text}</span>
			)}
		</div>
	);
}

/* ─── Card ─── */

function FeedbackCard({ item }: { item: FeedbackItem }) {
	const platform = platformOf(item);

	return (
		<article
			className={cn(
				"group relative isolate flex flex-col gap-4 overflow-hidden rounded-3xl border border-foreground/[0.07] bg-card p-5 shadow-2xs sm:p-6",
				"transition-[transform,border-color,box-shadow] duration-300 ease-out",
				"hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/[0.07]",
				"motion-reduce:transition-none motion-reduce:hover:translate-y-0",
			)}>
			{/* Soft glow that rises from the top edge on hover. */}
			<span
				aria-hidden="true"
				className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-[radial-gradient(70%_100%_at_50%_0%,color-mix(in_oklab,var(--primary)_16%,transparent),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
			/>

			{item.media && <Media media={item.media} name={item.name} />}
			{typeof item.rating === "number" && <RatingStars rating={item.rating} />}
			<Message text={item.message} platform={platform} />

			<footer className="mt-1 flex items-center justify-between gap-3 border-t border-foreground/[0.06] pt-4">
				<Author item={item} platform={platform} />
				{item.url && (
					<a
						href={item.url}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={`Read ${item.name}'s post on ${PLATFORM_LABEL[platform]}`}
						className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground/[0.04] text-foreground/40 outline-none transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary after:absolute after:inset-0 after:rounded-3xl focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-primary/60">
						<PlatformIcon platform={platform} className="size-3.5" />
					</a>
				)}
			</footer>
		</article>
	);
}

/* ─── Section ─── */

export function FeedbackSection() {
	const ref = useRef(null);

	return (
		<section ref={ref} className="py-13 md:py-16 relative overflow-hidden bg-background">
			{/* Ambient background glows */}
			<div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/5 rounded-full blur-3xl opacity-70" />
			<div className="pointer-events-none absolute bottom-0 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />

			<>
				<div className={cn(SECTION_INNER, "mb-10 sm:mb-12")}>
					<div
						className="text-center max-w-3xl mx-auto">
						<div className={cn(EYEBROW_PILL, "mb-4")}>
							<MessageCircle className="size-3.5 text-primary" />
							Developer Feedback
						</div>
						<h2 className={SECTION_H2}>What developers are saying</h2>
						<p className={cn(SECTION_SUB, "mx-auto")}>
							Real impressions and feedback from developers and designers
							exploring {SITE_NAME}.
						</p>
					</div>
				</div>

				{/* CSS columns give the masonry with no JS and identical server/client HTML. */}
				<div className={cn(SECTION_INNER, "columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3")}>
					{FEEDBACK.map((item) => (
						<div
							key={item.id}
							className="mb-4 break-inside-avoid sm:mb-5">
							<FeedbackCard item={item} />
						</div>
					))}
				</div>
			</>
		</section>
	);
}
