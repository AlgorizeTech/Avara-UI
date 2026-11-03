"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { integrations } from "@/config/site";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/** Anything that shows a person is actually using the page. */
const INTERACTION_EVENTS = ["pointerdown", "keydown", "scroll", "touchstart"] as const;

/** Longest a visitor can sit without interacting before gtag.js loads anyway. */
const FALLBACK_MS = 6000;

const SCRIPT_ID = "ga-gtag-js";

/**
 * Loads Google Analytics using `integrations.gaId` (config/site.ts), which is
 * `NEXT_PUBLIC_GA_ID` when set and this site's own property otherwise.
 *
 * `gtag()` and the page-view config are queued straight away, so nothing is
 * lost, but the 178 KB gtag.js itself is fetched only once the visitor
 * interacts (or after FALLBACK_MS). It used to load on `lazyOnload`, which
 * lands inside the load-time window it was meant to stay out of: the script
 * and its first run are main-thread work competing with hydration.
 *
 * Not inside /preview: every live example on a docs page is an iframe of that
 * route under the same root layout, so each one loaded its own copy of gtag
 * and sent its own page views — a docs page with three examples counted as
 * four visits and fetched the script four times.
 */
export function GoogleAnalytics() {
  const pathname = usePathname();
  const gaId = integrations.gaId;
  const enabled = Boolean(gaId) && !pathname?.startsWith("/preview");

  useEffect(() => {
    if (!enabled || !gaId) return;
    if (document.getElementById(SCRIPT_ID)) return;

    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      // gtag.js reads queued commands as `arguments` objects, not arrays, so
      // this has to stay a plain function.
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments);
      } as Window["gtag"];
    }
    const queue = window.gtag as (...args: unknown[]) => void;
    queue("js", new Date());
    queue("config", gaId, {
      page_title: document.title,
      page_location: window.location.href,
      send_page_view: true,
    });

    let loaded = false;
    let timer: number | undefined;

    const load = () => {
      if (loaded) return;
      loaded = true;
      window.clearTimeout(timer);
      INTERACTION_EVENTS.forEach((type) => window.removeEventListener(type, load));
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);
    };

    INTERACTION_EVENTS.forEach((type) =>
      window.addEventListener(type, load, { once: true, passive: true }),
    );
    const arm = () => {
      timer = window.setTimeout(load, FALLBACK_MS);
    };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });

    // Left running on purpose when the route changes: the script is global
    // and loads once. Cleanup only matters if the tree unmounts first.
    return () => {
      if (loaded) return;
      window.clearTimeout(timer);
      window.removeEventListener("load", arm);
      INTERACTION_EVENTS.forEach((type) => window.removeEventListener(type, load));
    };
  }, [enabled, gaId]);

  return null;
}
