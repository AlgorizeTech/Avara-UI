"use client";

import { isDefaultAccent } from "@/lib/accent";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { revealThemeAt } from "./theme";

/**
 * Embeds a /sandbox/[name] page in an iframe. The demo runs as a REAL
 * standalone document — own window, media queries, portals, scroll — so no
 * component behavior can break in the preview. Props are bridged live via
 * postMessage; the frame auto-sizes from heights reported by SandboxClient.
 */
export function SandboxFrame({
  name,
  sandboxProps,
  accent,
  viewportWidth,
  scale = 1,
  resetKey = 0,
  minHeight = 0,
  fill = false,
  className,
}: {
  /** Registry name of the demo (src/preview/registry.tsx). */
  name: string;
  /** JSON-serializable props bridged into the demo, live. */
  sandboxProps?: Record<string, unknown>;
  /**
   * The page's colour-picker value. The sandbox document repoints its theme
   * tokens (`--primary`…) at it, so every token-styled element in the demo
   * follows the picker the same way it follows the sidebar theme customizer —
   * not only the ones a demo's `color` prop happens to reach.
   */
  accent?: string;
  /** Viewport width in px; null/undefined fills the container. */
  viewportWidth?: number | null;
  /** Visually shrinks the frame (real viewport stays viewportWidth). */
  scale?: number;
  /** Bump to fully reload the sandbox document. */
  resetKey?: number;
  minHeight?: number;
  maxHeight?: number;
  /**
   * Fills the container instead of auto-sizing to the height the demo reports.
   * A demo taller than the container is scaled down to fit it, never scrolled.
   * Only the iframe's box changes — nothing goes through the URL, which would
   * reload it — so entering fullscreen resizes the live demo instead of
   * throwing it away and loading a second one.
   */
  fill?: boolean;
  className?: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  // The container's box, for fill mode: the frame is fitted to it.
  const [fillSize, setFillSize] = useState({ width: 0, height: 0 });
  const [ready, setReady] = useState(false);
  const propsRef = useRef(sandboxProps);
  propsRef.current = sandboxProps;
  const accentRef = useRef(accent);
  accentRef.current = accent;

  // New document (mount or reset) → back to the loading state until the demo
  // signals it has actually mounted. A safety timeout reveals the frame even
  // if the signal never arrives (e.g. a demo that crashed).
  useEffect(() => {
    setReady(false);
    const timeout = window.setTimeout(() => setReady(true), 8000);
    return () => window.clearTimeout(timeout);
  }, [name, resetKey]);

  // The iframe reloads ONLY on reset — live prop changes go over postMessage.
  const src = useMemo(() => {
    const query = new URLSearchParams();
    if (propsRef.current) query.set("props", JSON.stringify(propsRef.current));
    if (!isDefaultAccent(accentRef.current)) query.set("accent", accentRef.current!);
    const search = query.toString();
    return `/preview/${name}${search ? `?${search}` : ""}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, resetKey]);

  const post = (message: Record<string, unknown>) => {
    iframeRef.current?.contentWindow?.postMessage(
      message,
      window.location.origin,
    );
  };

  // Sent together on load: a document that just booted needs both, and the
  // demo must not paint one frame with the wrong accent or the wrong props.
  const postState = () => {
    post({ type: "sandbox:props", props: propsRef.current ?? {} });
    post({ type: "sandbox:accent", accent: accentRef.current ?? null });
  };

  useEffect(() => {
    post({ type: "sandbox:props", props: sandboxProps ?? {} });
  }, [sandboxProps]);

  useEffect(() => {
    post({ type: "sandbox:accent", accent: accent ?? null });
  }, [accent]);

  // A demo can hand a theme switch to the page (`sandbox:theme`): a View
  // Transition can't leave the iframe's document, so the theme-switcher demo
  // asks us to run the header's reveal here, from where the click landed.
  const { setTheme } = useTheme();
  const setThemeRef = useRef(setTheme);
  setThemeRef.current = setTheme;

  // Auto-height reported from inside the sandbox document.
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.source !== iframeRef.current?.contentWindow) return;
      const data = event.data;
      if (data?.type === "sandbox:height" && typeof data.height === "number") {
        setContentHeight(Math.ceil(data.height));
      }
      if (data?.type === "sandbox:ready") {
        setReady(true);
      }
      if (data?.type === "sandbox:theme" && typeof data.theme === "string") {
        const frame = iframeRef.current;
        const rect = frame?.getBoundingClientRect();
        // x/y are the sandbox's own CSS pixels; the frame may be scaled down.
        const ratio = frame && rect && frame.clientWidth > 0 ? rect.width / frame.clientWidth : 1;
        const x = rect ? rect.left + (typeof data.x === "number" ? data.x * ratio : rect.width / 2) : window.innerWidth / 2;
        const y = rect ? rect.top + (typeof data.y === "number" ? data.y * ratio : rect.height / 2) : window.innerHeight / 2;
        revealThemeAt(x, y, () => setThemeRef.current(data.theme));
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!fill || !wrapper) return;
    const measure = () =>
      setFillSize({ width: wrapper.clientWidth, height: wrapper.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [fill]);

  // Fill mode: the screen is the ceiling, not a floor. A demo taller than the
  // container would otherwise scroll inside the frame, so it is scaled down
  // until its full height is exactly the container's — the iframe keeps the
  // real screen width as its viewport (so breakpoints match the screen) and
  // is letterboxed horizontally by the same factor. `min-h-screen` in the
  // document then equals the content height, so nothing scrolls either way.
  const fillScale =
    fill && fillSize.height > 0 && contentHeight > fillSize.height
      ? fillSize.height / contentHeight
      : 1;
  const fillFrameHeight =
    fillSize.height > 0 ? Math.ceil(fillSize.height / fillScale) : undefined;
  const fillFrameLeft = Math.round((fillSize.width * (1 - fillScale)) / 2);

  // The iframe's own viewport always covers the whole card, and grows past it
  // for taller demos. The sandbox document centres the demo in that viewport
  // and lays fixed overlays (a modal, the toast stack) against it — so a lone
  // button sits mid-card and the modal it opens has the full card to appear
  // in, while a tall hero is never cropped to the floor.
  //
  // `minHeight` describes the CARD, but the frame is shrunk visually by
  // `scale`: sizing the iframe to minHeight would cover only minHeight*scale
  // of the card and leave the document's bottom edge floating above the card
  // floor. Growing the iframe's viewport by 1/scale makes the scaled frame
  // fill the card exactly.
  const safeScale = scale > 0 ? scale : 1;
  const effectiveMinHeight =
    minHeight > 0 ? minHeight : !ready || contentHeight === 0 ? 420 : 0;
  const floorHeight = Math.ceil(effectiveMinHeight / safeScale);
  const frameHeight = Math.max(floorHeight, contentHeight);

  const frameStyle: React.CSSProperties = fill
    ? {
        left: fillFrameLeft,
        width: fillSize.width > 0 ? fillSize.width : "100%",
        height: fillFrameHeight ?? "100%",
        transform: fillScale !== 1 ? `scale(${fillScale})` : undefined,
        transformOrigin: "top left",
      }
    : {
        left: 0,
        width: viewportWidth == null ? "100%" : `${viewportWidth}px`,
        height: frameHeight,
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
      };

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative w-full overflow-hidden",
        !fill && "transition-[height] duration-300 ease-out",
        className,
      )}
      style={fill ? undefined : { height: Math.round(frameHeight * safeScale) }}
    >
      <iframe
        key={resetKey}
        ref={iframeRef}
        src={src}
        title={`${name} sandbox preview`}
        onLoad={postState}
        className={cn(
          "absolute top-0 block border-0 transition-opacity duration-300",
          ready ? "opacity-100" : "opacity-0",
        )}
        style={frameStyle}
      />
      {/* Loading state: covers the frame until the demo has truly mounted, so
          no unstyled or partially-loaded markup is ever visible. */}
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 animate-in fade-in duration-200">
            <div className="w-6 h-6 rounded-full border-2 border-border border-t-foreground/55 animate-spin" />
            <span className="text-xs font-medium text-foreground/40">
              Loading preview…
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
