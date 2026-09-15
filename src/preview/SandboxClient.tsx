"use client";

import { Suspense, useEffect, useState } from "react";
import { accentTokens } from "@/lib/accent";
import { SandboxErrorBoundary } from "./SandboxErrorBoundary";
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

  // Initial props travel in the URL. `null` means "not read yet" and holds the
  // demo back from rendering at all.
  //
  // This route is statically exported, so the prerendered HTML cannot know
  // `?props=` — rendering the demo during that pass paints it with its own
  // defaults, and the requested props only arrive on hydration. That is a
  // visible wrong first paint whenever an example's props differ from the
  // demo's defaults: every mobile mockup showed an iPhone 5 before flipping to
  // the device the example actually asked for. (It was a hydration mismatch
  // too — server `{}` vs client props.) Waiting one pass costs nothing here:
  // the embedding frame holds its loading state until `sandbox:ready`, which
  // is mounted alongside the demo below, so it now lifts on correct markup.
  const [demoProps, setDemoProps] = useState<Record<string, unknown> | null>(
    null,
  );

  // Fill mode: the fullscreen overlay hands this document the whole viewport,
  // so the stage stretches to it and centres the demo in the screen instead of
  // hugging its own content at the top edge. It arrives over postMessage
  // rather than in the URL precisely so entering fullscreen never reloads the
  // demo that is already running.
  const [fill, setFill] = useState(false);

  // The docs page's colour picker. Applied as theme tokens on <body> (below),
  // not handed to the demo: this is what makes `bg-primary` buttons, rings and
  // the like follow the picker even in demos that never read a `color` prop.
  const [accent, setAccent] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = new URLSearchParams(window.location.search).get("accent");
      if (raw) setAccent(raw);
    } catch {
      // Malformed URL — the live sandbox:accent message will set it anyway.
    }
  }, []);

  // <body>, not <html>: the theme customizer injects the site palette on <html>
  // (and re-injects it on every storage event), so a body-level override both
  // wins the cascade and never gets clobbered — while portals mounted on body
  // still inherit it. "Default" removes the override so the site theme shows.
  useEffect(() => {
    const tokens = accentTokens(accent ?? undefined);
    const body = document.body;
    for (const name of ["--primary", "--primary-foreground", "--ring"]) {
      if (tokens[name]) body.style.setProperty(name, tokens[name]);
      else body.style.removeProperty(name);
    }
  }, [accent]);

  useEffect(() => {
    setDemoProps((current) => {
      // A postMessage that beat this effect already has the fresher value.
      if (current !== null) return current;
      try {
        const raw = new URLSearchParams(window.location.search).get("props");
        return raw ? JSON.parse(raw) : {};
      } catch {
        return {};
      }
    });
  }, []);

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

  // Dev-only: the Next.js dev overlay (error badge, route indicator) mounts in
  // every document — including this embedded stage, where it floats over the
  // demo. Hide it here; normal pages keep theirs. Production has no overlay.
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    const style = document.createElement("style");
    style.textContent = "nextjs-portal { display: none !important; }";
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  // Live prop updates from the docs page (control panels, prop variants).
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data;
      if (data && data.type === "sandbox:props" && typeof data.props === "object") {
        setDemoProps(data.props ?? {});
      }
      if (data && data.type === "sandbox:accent") {
        setAccent(typeof data.accent === "string" ? data.accent : null);
      }
      if (data && data.type === "sandbox:fill") {
        setFill(Boolean(data.fill));
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // Report content height to the embedding Sandbox frame.
  useEffect(() => {
    if (window.parent === window) return;
    const report = () => {
      // body, not documentElement: the latter is never shorter than the iframe
      // viewport, so a frame that got sized up once could never report its way
      // back down — it ratchets and the card stays tall. body carries the real
      // content height (its margin/min-height are neutralized above), and the
      // embedding frame applies its own min/max clamp.
      const height = Math.ceil(document.body.scrollHeight);
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
      className="w-full h-full flex flex-col items-center justify-center py-6 px-4"
      style={{ minHeight: fill ? "100vh" : SANDBOX_MIN_HEIGHT }}
    >
      <SandboxErrorBoundary name={name}>
        <Suspense fallback={null}>
          {demoProps !== null && (
            <>
              <Demo {...demoProps} />
              <ReadySignal />
            </>
          )}
        </Suspense>
      </SandboxErrorBoundary>
    </div>
  );
}
