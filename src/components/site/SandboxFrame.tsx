"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Embeds a /sandbox/[name] page in an iframe. The demo runs as a REAL
 * standalone document — own window, media queries, portals, scroll — so no
 * component behavior can break in the preview. Props are bridged live via
 * postMessage; the frame auto-sizes from heights reported by SandboxClient.
 */
export function SandboxFrame({
  name,
  sandboxProps,
  viewportWidth,
  scale = 1,
  resetKey = 0,
  minHeight = 0,
  maxHeight = 950,
  className,
}: {
  /** Registry name of the demo (src/preview/registry.tsx). */
  name: string;
  /** JSON-serializable props bridged into the demo, live. */
  sandboxProps?: Record<string, unknown>;
  /** Viewport width in px; null/undefined fills the container. */
  viewportWidth?: number | null;
  /** Visually shrinks the frame (real viewport stays viewportWidth). */
  scale?: number;
  /** Bump to fully reload the sandbox document. */
  resetKey?: number;
  minHeight?: number;
  maxHeight?: number;
  className?: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [contentHeight, setContentHeight] = useState(minHeight);
  const [ready, setReady] = useState(false);
  const propsRef = useRef(sandboxProps);
  propsRef.current = sandboxProps;

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
    const query = propsRef.current
      ? `?props=${encodeURIComponent(JSON.stringify(propsRef.current))}`
      : "";
    return `/preview/${name}${query}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, resetKey]);

  const postProps = () => {
    iframeRef.current?.contentWindow?.postMessage(
      { type: "sandbox:props", props: propsRef.current ?? {} },
      window.location.origin,
    );
  };

  useEffect(() => {
    postProps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sandboxProps]);

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
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // The frame is shrunk visually (scale), but `minHeight` describes the CARD.
  // Sizing the iframe to minHeight would leave it covering only minHeight*scale
  // of the card, so the document's bottom edge — where fixed overlays like the
  // toast stack anchor — floats above the card floor. Growing the iframe's own
  // viewport by 1/scale makes the scaled frame fill the card exactly.
  const safeScale = scale > 0 ? scale : 1;
  const targetHeight = contentHeight > 0 ? contentHeight : minHeight;
  const frameHeight = ready ? targetHeight : Math.max(minHeight, targetHeight);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden transition-[height] duration-300 ease-out",
        className,
      )}
      style={{ height: Math.round(frameHeight * safeScale) }}
    >
      <iframe
        key={resetKey}
        ref={iframeRef}
        src={src}
        title={`${name} sandbox preview`}
        onLoad={postProps}
        className={cn(
          "absolute top-0 left-0 block border-0 transition-opacity duration-300",
          ready ? "opacity-100" : "opacity-0",
        )}
        style={{
          width: viewportWidth == null ? "100%" : `${viewportWidth}px`,
          height: frameHeight,
          transform: scale !== 1 ? `scale(${scale})` : undefined,
          transformOrigin: "top left",
        }}
      />
      {/* Loading state: covers the frame until the demo has truly mounted, so
          no unstyled or partially-loaded markup is ever visible. */}
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 animate-in fade-in duration-200">
            <div className="w-6 h-6 rounded-full border-2 border-zinc-200 dark:border-zinc-800 border-t-zinc-500 dark:border-t-zinc-300 animate-spin" />
            <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
              Loading preview…
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
