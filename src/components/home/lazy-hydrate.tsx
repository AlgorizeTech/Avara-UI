"use client";

import { startTransition, useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";

const isServer = typeof window === "undefined";

/** Quiet time after `load` before any section may come alive. */
const SETTLE_MS = 1500;

/** A section whose chunk fails to load is retried this many times, backing off from RETRY_BASE_MS. */
const MAX_LOAD_RETRIES = 4;
const RETRY_BASE_MS = 800;

/** Input that means a person is already scrolling or reaching for the page. */
const INPUT_EVENTS = ["scroll", "wheel", "touchstart", "pointerdown", "keydown"] as const;

/** The wrapper adds no box of its own, so layout is exactly what it was without it. */
const CONTENTS: CSSProperties = { display: "contents" };

/**
 * Sections reveal themselves on scroll: until then their markup is hidden with
 * a translateY offset. On a refresh Chrome restores the scroll position by
 * anchoring to a visible element, measured transform included, so an element
 * saved at its resting place and found 30px lower while still hidden made the
 * page land a little further down, and compound on every reload. Opting the
 * sections out of anchoring restores the exact pixel offset instead.
 */
const NO_ANCHOR = "[overflow-anchor:none]";

let settled: Promise<void> | undefined;

/**
 * Resolves once the page has had its first paint to itself: SETTLE_MS after
 * `load`, or at the first sign of input, whichever is sooner. Shared by every
 * section. Letting sections start (and fetch their chunks) the instant the
 * hero finished hydrating put ~150 KB of requests and a pile of main-thread
 * work ahead of the largest contentful paint.
 */
function afterFirstPaint(): Promise<void> {
	settled ??= new Promise<void>((resolve) => {
		let timer: number | undefined;
		const done = () => {
			window.clearTimeout(timer);
			window.removeEventListener("load", arm);
			INPUT_EVENTS.forEach((type) => window.removeEventListener(type, done));
			resolve();
		};
		const arm = () => {
			timer = window.setTimeout(done, SETTLE_MS);
		};
		INPUT_EVENTS.forEach((type) => window.addEventListener(type, done, { once: true, passive: true }));
		if (document.readyState === "complete") arm();
		else window.addEventListener("load", arm, { once: true });
	});
	return settled;
}

interface LazyHydrateProps {
	/** Fetches the section's component. Runs only when the section is about to be seen. */
	load: () => Promise<ComponentType>;
	/**
	 * The same component, for the server render. Passed as a synchronous
	 * `require` guarded by `typeof window`, so it is compiled into the server
	 * bundle only and never reaches the browser.
	 */
	server: ComponentType | null;
	/** How far ahead of the viewport the section comes alive. */
	rootMargin?: string;
	/**
	 * Come alive as soon as the first paint has settled, wherever the section
	 * is, instead of waiting until it is near the viewport. For a section that
	 * is not static-safe: its server HTML is a different height from the live
	 * one, so it has to be live before a scroll position can land correctly
	 * around it.
	 */
	eager?: boolean;
	className?: string;
}

/**
 * Renders a section on the server as ordinary, inline HTML, and leaves that
 * HTML exactly as it is in the browser until the section is about to scroll
 * into view (and the first paint has settled); only then does the section's
 * code load and take over.
 *
 * Why not Suspense + selective hydration: a Suspense boundary is also a
 * streaming boundary. Anything over ~12.8 KB is sent as a hidden segment and
 * revealed by a script about 2.3 s after load, which left the document a few
 * hundred pixels tall for the first two seconds, so the browser clamped a
 * refreshed page's scroll position to that, and shoved the page down. Here
 * there is no boundary on the server at all: the HTML is in the document, at
 * full height, from the first byte.
 *
 * On the client the first render emits an empty `dangerouslySetInnerHTML`
 * placeholder with `suppressHydrationWarning`, which React hydrates as a leaf
 * and leaves the server's children alone. The later swap to the live component
 * is keyed so React replaces that element wholesale (it would otherwise append
 * next to the old markup); the markup is identical, so nothing moves.
 *
 * Every section below the fold used to hydrate during page load: a few
 * thousand DOM nodes of React work, plus each section's effects and observers,
 * all on the main thread while the visitor was still reading the hero.
 */
export function LazyHydrate({ load, server, rootMargin = "600px 0px", eager = false, className }: LazyHydrateProps) {
	const wrapRef = useRef<HTMLDivElement>(null);
	const loadRef = useRef(load);
	loadRef.current = load;
	const [Live, setLive] = useState<ComponentType | null>(null);

	useEffect(() => {
		const el = wrapRef.current;
		if (!el) return;
		let started = false;
		let cancelled = false;
		let retryTimer: number | undefined;
		const attempt = (tries: number) => {
			// A transition, so React builds the live tree in time-sliced chunks that
			// yield to the browser, rather than one long task. The showcase alone is
			// hundreds of components, and a one-piece render counted as blocking time.
			loadRef.current().then(
				(Component) => {
					if (!cancelled) startTransition(() => setLive(() => Component));
				},
				() => {
					// A chunk that fails to load (flaky network, a dev server still
					// compiling) used to leave the section inert for good, and blank if
					// the server HTML had been discarded. Retry with a growing delay.
					if (cancelled) return;
					if (tries >= MAX_LOAD_RETRIES) {
						started = false; // a later scroll/hover may try again
						return;
					}
					retryTimer = window.setTimeout(() => attempt(tries + 1), RETRY_BASE_MS * 2 ** tries);
				},
			);
		};
		const start = () => {
			if (started) return;
			started = true;
			io?.disconnect();
			attempt(0);
		};
		let near = eager;
		let quiet = false;
		const tryStart = () => {
			if (near && quiet) start();
		};
		const io =
			typeof IntersectionObserver === "undefined"
				? null
				: new IntersectionObserver(
						(entries) => {
							if (entries.some((entry) => entry.isIntersecting)) {
								near = true;
								tryStart();
							}
						},
						{ rootMargin },
					);
		if (!io) {
			start();
			return;
		}
		void afterFirstPaint().then(() => {
			quiet = true;
			tryStart();
		});
		io.observe(el);
		// Reaching for the section before the observer fires (keyboard, touch,
		// pointer) must not leave it inert, whatever the settle timer says.
		const early = () => start();
		el.addEventListener("pointerenter", early, { once: true, passive: true });
		el.addEventListener("focusin", early, { once: true });
		el.addEventListener("touchstart", early, { once: true, passive: true });
		return () => {
			cancelled = true;
			window.clearTimeout(retryTimer);
			io.disconnect();
			el.removeEventListener("pointerenter", early);
			el.removeEventListener("focusin", early);
			el.removeEventListener("touchstart", early);
		};
	}, [rootMargin, eager]);

	if (isServer) {
		const Server = server;
		return (
			<div ref={wrapRef} className={[NO_ANCHOR, className].filter(Boolean).join(" ")}>
				<div style={CONTENTS}>{Server ? <Server /> : null}</div>
			</div>
		);
	}

	return (
		<div ref={wrapRef} className={[NO_ANCHOR, className].filter(Boolean).join(" ")}>
			{Live ? (
				<div key="live" style={CONTENTS}>
					<Live />
				</div>
			) : (
				<div key="static" style={CONTENTS} dangerouslySetInnerHTML={{ __html: "" }} suppressHydrationWarning />
			)}
		</div>
	);
}
