"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { links } from "@/config/site";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════
   GITHUB STAR COUNT
   The live star count of the repo, as a small chip for the navbar's GitHub pill.

   The site is a static export, so there is no server to ask: the browser asks
   GitHub's public API (CORS is open, no key). To stay well under the
   unauthenticated limit (60 requests per hour per IP) the answer is kept in
   localStorage for an hour, and the request waits until the browser is idle so
   it never competes with the hero's first paint.

   While the number is unknown the chip's space is held (invisible), so the
   button does not change width when it arrives. If the request fails, or the
   limit is hit, the chip disappears and the button reads as before.
   ═══════════════════════════════════════════════ */

const CACHE_KEY = "avara:github-stars";
const CACHE_TTL_MS = 60 * 60 * 1000;

/** `https://github.com/Owner/Repo` → `Owner/Repo`. */
const REPO = links.github.match(/github\.com\/([^/]+\/[^/#?]+)/)?.[1]?.replace(/\.git$/, "");

/** 12 → "12", 1234 → "1.2k", 12500 → "12.5k". */
function formatStars(count: number): string {
	if (count < 1000) return String(count);
	return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`;
}

type Cached = { count: number; at: number };

function readCache(): Cached | null {
	try {
		const raw = JSON.parse(localStorage.getItem(CACHE_KEY) ?? "null") as Partial<Cached> | null;
		return raw && typeof raw.count === "number" && typeof raw.at === "number"
			? { count: raw.count, at: raw.at }
			: null;
	} catch {
		return null;
	}
}

/** `className` sets how it is displayed (`hidden lg:inline-flex`, say); default `inline-flex`. */
export function GitHubStarCount({ className = "inline-flex" }: { className?: string }) {
	// undefined: not known yet · null: could not be fetched · number: the count
	const [count, setCount] = useState<number | null | undefined>(undefined);

	useEffect(() => {
		if (!REPO) {
			setCount(null);
			return;
		}

		const cached = readCache();
		if (cached) {
			setCount(cached.count);
			if (Date.now() - cached.at < CACHE_TTL_MS) return;
		}

		const controller = new AbortController();
		const load = () => {
			fetch(`https://api.github.com/repos/${REPO}`, {
				headers: { Accept: "application/vnd.github+json" },
				signal: controller.signal,
			})
				.then((response) => (response.ok ? response.json() : null))
				.then((repo: { stargazers_count?: unknown } | null) => {
					const stars = repo?.stargazers_count;
					if (typeof stars !== "number") {
						// Keep a stale cached number rather than hiding a good one.
						setCount((current) => (typeof current === "number" ? current : null));
						return;
					}
					setCount(stars);
					try {
						localStorage.setItem(CACHE_KEY, JSON.stringify({ count: stars, at: Date.now() }));
					} catch {
						// Storage can be blocked; the number still shows this visit.
					}
				})
				.catch(() => {
					if (!controller.signal.aborted) {
						setCount((current) => (typeof current === "number" ? current : null));
					}
				});
		};

		// After first paint: idle time where the browser has it, else a short delay.
		const hasIdle = typeof window.requestIdleCallback === "function";
		const handle = hasIdle
			? window.requestIdleCallback(load, { timeout: 4000 })
			: window.setTimeout(load, 1500);

		return () => {
			controller.abort();
			if (hasIdle) window.cancelIdleCallback(handle);
			else window.clearTimeout(handle);
		};
	}, []);

	if (count === null) return null;

	return (
		<span
			// Held-open chip while loading: invisible and hidden from assistive tech.
			aria-hidden={count === undefined || undefined}
			className={cn(
				"items-center justify-center gap-1 rounded-full bg-foreground/[0.08] px-2 py-0.5 font-mono text-[11px] font-medium text-foreground/80 transition-opacity duration-300",
				count === undefined && "opacity-0",
				className,
			)}>
			<Star className="size-3 fill-amber-400 text-amber-400" aria-hidden />
			{/* Two digits' worth of width while loading, so the pill does not jump. */}
			<span aria-label={count === undefined ? undefined : `${count} stars`}>{count === undefined ? "00" : formatStars(count)}</span>
		</span>
	);
}
