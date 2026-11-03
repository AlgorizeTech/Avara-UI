"use client";

import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";

const isServer = typeof window === "undefined";

/** Quiet time after `load` before any section may come alive. */
const SETTLE_MS = 1500;

/** Input that means a person is already scrolling or reaching for the page. */
const INPUT_EVENTS = ["scroll", "wheel", "touchstart", "pointerdown", "keydown"] as const;

/** The wrapper adds no box of its own, so layout is exactly what it was without it. */
const CONTENTS: CSSProperties = { display: "contents" };

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
export function LazyHydrate({ load, server, rootMargin = "600px 0px", className }: LazyHydrateProps) {
	const wrapRef = useRef<HTMLDivElement>(null);
	const loadRef = useRef(load);
	loadRef.current = load;
	const [Live, setLive] = useState<ComponentType | null>(null);

	useEffect(() => {
		const el = wrapRef.current;
		if (!el) return;
		let started = false;
		const start = () => {
			if (started) return;
			started = true;
			io?.disconnect();
			loadRef.current().then((Component) => setLive(() => Component));
		};
		let near = false;
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
			io.disconnect();
			el.removeEventListener("pointerenter", early);
			el.removeEventListener("focusin", early);
			el.removeEventListener("touchstart", early);
		};
	}, [rootMargin]);

	if (isServer) {
		const Server = server;
		return (
			<div ref={wrapRef} className={className}>
				<div style={CONTENTS}>{Server ? <Server /> : null}</div>
			</div>
		);
	}

	return (
		<div ref={wrapRef} className={className}>
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
