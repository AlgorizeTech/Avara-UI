"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as Slider from "@radix-ui/react-slider";
import { Pause, Play, RotateCcw, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { FeedbackMedia } from "@/components/home/feedback-data";

/* ═══════════════════════════════════════════════
   FEEDBACK VIDEO MODAL
   A lightbox with our own player in place of the browser's: scrubber, play /
   pause, time, mute + volume, close. Loaded on demand from feedback-section.

   Controls fade out while the video plays and the pointer is still, and come
   back on any movement or key. Keys: Space / K play-pause, ← → seek 5s, M mute
   (Esc closes, from Radix).
   ═══════════════════════════════════════════════ */

const CONTROL_BTN =
	"flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/90 outline-none transition-colors duration-200 hover:bg-white/15 hover:text-white focus-visible:ring-2 focus-visible:ring-primary/70";
const IDLE_MS = 2500;

function formatTime(seconds: number): string {
	if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
	const whole = Math.floor(seconds);
	return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}

function Scrubber({
	label,
	value,
	max,
	step,
	onChange,
	onCommit,
	className,
}: {
	label: string;
	value: number;
	max: number;
	step: number;
	onChange: (value: number) => void;
	onCommit?: () => void;
	className?: string;
}) {
	return (
		<Slider.Root
			value={[value]}
			max={max}
			step={step}
			onValueChange={([next]) => onChange(next)}
			onValueCommit={onCommit}
			className={cn("group/slider relative flex h-5 touch-none select-none items-center", className)}>
			<Slider.Track className="relative h-1 grow overflow-hidden rounded-full bg-white/25 transition-[height] duration-150 group-hover/slider:h-1.5">
				<Slider.Range className="absolute h-full rounded-full bg-primary" />
			</Slider.Track>
			<Slider.Thumb
				aria-label={label}
				className="block size-3.5 scale-0 rounded-full bg-white shadow-md shadow-black/40 outline-none transition-transform duration-150 group-hover/slider:scale-100 focus-visible:scale-100 focus-visible:ring-2 focus-visible:ring-primary/70 motion-reduce:transition-none"
			/>
		</Slider.Root>
	);
}

export function FeedbackVideoModal({
	media,
	name,
	open,
	startAt,
	onClose,
}: {
	media: FeedbackMedia;
	name: string;
	open: boolean;
	/** Where the card's own video had got to, so the modal picks up from there. */
	startAt: number;
	/** Called as the modal closes, with the time reached, so the card can follow. */
	onClose: (time: number) => void;
}) {
	const contentRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const scrubbing = useRef(false);
	const idleTimer = useRef<number | undefined>(undefined);

	const [playing, setPlaying] = useState(false);
	const [time, setTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [muted, setMuted] = useState(false);
	const [volume, setVolume] = useState(1);
	const [idle, setIdle] = useState(false);

	const controlsHidden = playing && idle;
	const size = media.width && media.height ? { width: media.width, height: media.height } : {};

	/* Any activity shows the controls; a quiet playing video hides them again. */
	const wake = () => {
		setIdle(false);
		window.clearTimeout(idleTimer.current);
		idleTimer.current = window.setTimeout(() => setIdle(true), IDLE_MS);
	};
	useEffect(() => () => window.clearTimeout(idleTimer.current), []);

	const toggle = () => {
		const video = videoRef.current;
		if (!video) return;
		if (video.paused) {
			if (video.ended) video.currentTime = 0;
			video.play().catch(() => setPlaying(false));
		} else video.pause();
	};

	const seekBy = (delta: number) => {
		const video = videoRef.current;
		if (!video) return;
		video.currentTime = Math.max(0, Math.min(video.duration || 0, video.currentTime + delta));
	};

	const toggleMute = () => {
		const video = videoRef.current;
		if (video) video.muted = !video.muted;
	};

	const setVolumeTo = (next: number) => {
		const video = videoRef.current;
		if (!video) return;
		video.volume = next;
		video.muted = next === 0;
	};

	const handleOpenChange = (next: boolean) => {
		if (!next) onClose(videoRef.current?.currentTime ?? 0);
	};

	const onKeyDown = (event: React.KeyboardEvent) => {
		wake();
		/* Buttons and sliders keep their own key behaviour. */
		if ((event.target as HTMLElement).closest("button, [role=slider]")) return;
		if (event.key === " " || event.key === "k") {
			event.preventDefault();
			toggle();
		} else if (event.key === "ArrowLeft") {
			event.preventDefault();
			seekBy(-5);
		} else if (event.key === "ArrowRight") {
			event.preventDefault();
			seekBy(5);
		} else if (event.key === "m") {
			toggleMute();
		}
	};

	const ended = !playing && duration > 0 && time >= duration - 0.05;

	return (
		<Dialog.Root open={open} onOpenChange={handleOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
				<Dialog.Content
					ref={contentRef}
					aria-describedby={undefined}
					/* Focus the dialog itself, not its first button, so Space plays the video. */
					onOpenAutoFocus={(event) => {
						event.preventDefault();
						contentRef.current?.focus();
					}}
					onKeyDown={onKeyDown}
					className="fixed left-1/2 top-1/2 z-50 w-[min(94vw,1040px)] -translate-x-1/2 -translate-y-1/2 outline-none duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 motion-reduce:animate-none">
					<Dialog.Title className="sr-only">Video from {name}</Dialog.Title>

					<div
						onPointerMove={wake}
						onPointerDown={wake}
						className={cn(
							"relative overflow-hidden rounded-2xl bg-black shadow-2xl shadow-black/60 ring-1 ring-white/10 sm:rounded-3xl",
							controlsHidden && "cursor-none",
						)}>
						<video
							ref={videoRef}
							src={media.src}
							poster={media.poster}
							preload="auto"
							playsInline
							aria-label={media.alt ?? `Video from ${name}`}
							{...size}
							onClick={toggle}
							onLoadedMetadata={(event) => {
								const video = event.currentTarget;
								setDuration(video.duration);
								setMuted(video.muted);
								setVolume(video.volume);
								if (startAt > 0 && startAt < video.duration - 0.25) video.currentTime = startAt;
								setTime(video.currentTime);
								video.play().catch(() => setPlaying(false));
								wake();
							}}
							onPlay={() => setPlaying(true)}
							onPause={() => setPlaying(false)}
							onTimeUpdate={(event) => {
								if (!scrubbing.current) setTime(event.currentTarget.currentTime);
							}}
							onVolumeChange={(event) => {
								setMuted(event.currentTarget.muted);
								setVolume(event.currentTarget.volume);
							}}
							className="block h-auto max-h-[82vh] w-full cursor-pointer bg-black object-contain"
						/>

						{/* Big centre button, only while stopped. */}
						{!playing && (
							<button
								type="button"
								onClick={toggle}
								aria-label={ended ? "Replay video" : "Play video"}
								className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-md outline-none transition-[transform,background-color] duration-200 hover:scale-105 hover:bg-white/25 focus-visible:ring-2 focus-visible:ring-primary/70 motion-reduce:transition-none motion-reduce:hover:scale-100">
								{ended ? <RotateCcw className="size-6" /> : <Play className="size-6 translate-x-0.5 fill-current" />}
							</button>
						)}

						<Dialog.Close
							aria-label="Close video"
							className={cn(
								"absolute right-3 top-3 flex size-9 cursor-pointer items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/20 backdrop-blur-md outline-none transition-[opacity,background-color] duration-300 hover:bg-black/75 focus-visible:ring-2 focus-visible:ring-primary/70",
								controlsHidden && "pointer-events-none opacity-0",
							)}>
							<X className="size-4" />
						</Dialog.Close>

						<div
							className={cn(
								"absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-3 pb-2.5 pt-12 transition-opacity duration-300 sm:px-5 sm:pb-3",
								controlsHidden && "pointer-events-none opacity-0",
							)}>
							<Scrubber
								label="Seek"
								value={time}
								max={duration || 1}
								step={0.05}
								onChange={(next) => {
									scrubbing.current = true;
									setTime(next);
									if (videoRef.current) videoRef.current.currentTime = next;
								}}
								onCommit={() => {
									scrubbing.current = false;
								}}
								className="w-full"
							/>
							<div className="mt-1 flex items-center gap-1.5">
								<button
									type="button"
									onClick={toggle}
									aria-label={playing ? "Pause" : ended ? "Replay" : "Play"}
									className={CONTROL_BTN}>
									{playing ? (
										<Pause className="size-4 fill-current" />
									) : ended ? (
										<RotateCcw className="size-4" />
									) : (
										<Play className="size-4 translate-x-px fill-current" />
									)}
								</button>
								<span className="px-1 text-[12.5px] font-medium tabular-nums text-white/80">
									{formatTime(time)} <span className="text-white/45">/ {formatTime(duration)}</span>
								</span>

								<div className="ml-auto flex items-center gap-1">
									<Scrubber
										label="Volume"
										value={muted ? 0 : volume}
										max={1}
										step={0.05}
										onChange={setVolumeTo}
										className="hidden w-20 sm:flex"
									/>
									<button
										type="button"
										onClick={toggleMute}
										aria-label={muted || volume === 0 ? "Unmute" : "Mute"}
										className={CONTROL_BTN}>
										{muted || volume === 0 ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
									</button>
								</div>
							</div>
						</div>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
