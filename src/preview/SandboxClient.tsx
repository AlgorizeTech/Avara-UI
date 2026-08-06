"use client";

import { Suspense, useEffect, useState } from "react";
import { sandboxRegistry } from "./registry";

const SANDBOX_MIN_HEIGHT = 0;

/** Mounts together with the lazy demo (same Suspense boundary), so this
 * effect firing means the demo's markup is really in the DOM — the parent
 * frame keeps its loading state up until this signal. */
function ReadySignal() {
  useEffect(() => {
    if (window.parent === window) return;
    window.parent.postMessage({ type: "sandbox:ready" }, window.location.origin);
  }, []);
  return null;
}

/**
 * Runs INSIDE the /sandbox/[name] iframe document. Because the demo loads as
 * its own page — own window, document, media queries, scroll — every kind of
 * component works untouched: portals, GSAP, Leaflet, window measurements.
 *
 * Responsibilities: render the registered demo, accept live prop updates from
 * the embedding docs page (postMessage), and report the content height so the
 * embedding frame can auto-size.
 */
export function SandboxClient({ name }: { name: string }) {
  const Demo = sandboxRegistry[name];

  // Initial props travel in the URL so the very first paint is correct.
  const [demoProps, setDemoProps] = useState<Record<string, unknown>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = new URLSearchParams(window.location.search).get("props");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // This page only exists to be embedded by the docs preview. Anyone landing
  // on it directly (typed URL, crawler following a link) goes to the site.
  useEffect(() => {
    if (window.parent === window) window.location.replace("/");
  }, []);

  // Transparent, chrome-free stage: the docs page provides the surface.
  // The root layout puts min-h-screen on <body>, which would feed back into
  // the parent's auto-height (100vh = iframe height) — neutralize it.
  useEffect(() => {
    document.body.dataset.sandbox = "true";
    const previous = {
      background: document.body.style.background,
      minHeight: document.body.style.minHeight,
      margin: document.body.style.margin,
    };
    document.body.style.background = "transparent";
    document.body.style.minHeight = "0";
    document.body.style.margin = "0";
    return () => {
      delete document.body.dataset.sandbox;
      document.body.style.background = previous.background;
      document.body.style.minHeight = previous.minHeight;
      document.body.style.margin = previous.margin;
    };
  }, []);

  // Live prop updates from the docs page (control panels, prop variants).
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data;
      if (data && data.type === "sandbox:props" && typeof data.props === "object") {
        setDemoProps(data.props ?? {});
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // Report content height to the embedding Sandbox frame.
  useEffect(() => {
    if (window.parent === window) return;
    const report = () => {
      const height = Math.ceil(document.documentElement.scrollHeight);
      window.parent.postMessage(
        { type: "sandbox:height", name, height },
        window.location.origin,
      );
    };
    report();
    const observer = new ResizeObserver(report);
    observer.observe(document.body);
    const mutations = new MutationObserver(report);
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [name]);

  if (!Demo) {
    return (
      <div className="p-8 text-sm text-zinc-500">
        Unknown sandbox demo: <code>{name}</code>. Register it in
        src/preview/registry.tsx and src/preview/names.ts.
      </div>
    );
  }

  return (
    <div
      className="w-full flex items-center justify-center p-4"
      style={{ minHeight: SANDBOX_MIN_HEIGHT }}
    >
      <Suspense fallback={null}>
        <Demo {...demoProps} />
        <ReadySignal />
      </Suspense>
    </div>
  );
}
