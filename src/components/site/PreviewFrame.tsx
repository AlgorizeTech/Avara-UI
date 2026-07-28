"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

const CLONE_MARK = "data-preview-frame-clone";

/**
 * Renders children inside a same-origin iframe so viewport-based CSS
 * (Tailwind sm:/md:/lg: media queries) responds to the preview width
 * instead of the browser window — the preview behaves like a real screen.
 * Stylesheets, fonts and the next-themes dark class are mirrored from the
 * parent document and kept in sync.
 */
export function PreviewFrame({
  children,
  minHeight = 400,
  maxHeight = 820,
  className,
  title = "Component preview",
  frameWidth,
  scale = 1,
}: {
  children: React.ReactNode;
  minHeight?: number;
  /**
   * Hard cap on the frame height; taller content scrolls inside the frame.
   * Required: vh-sized content (h-screen, h-[300vh]) resolves against the
   * frame height, so an uncapped auto-height frame would grow without bound.
   */
  maxHeight?: number;
  className?: string;
  title?: string;
  /** Fixed viewport width in px; required when scale < 1. Omit to fill the container. */
  frameWidth?: number;
  /** Visually shrinks the frame (real viewport stays frameWidth) so wide devices fit small screens. */
  scale?: number;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [height, setHeight] = useState<number>(minHeight);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let disposed = false;
    let initializedDoc: Document | null = null;
    let docCleanups: Array<() => void> = [];

    const init = () => {
      const doc = iframe.contentDocument;
      const win = iframe.contentWindow;
      if (!doc || !win || disposed || doc === initializedDoc) return;
      docCleanups.forEach((fn) => fn());
      docCleanups = [];
      initializedDoc = doc;
      setReady(false);

      // Root-relative asset URLs (fonts, images) must resolve against the site.
      if (!doc.querySelector("base")) {
        const base = doc.createElement("base");
        base.href = document.baseURI;
        doc.head.appendChild(base);
      }

      // Mirror <html>/<body> attributes: dark mode class, color-scheme, font vars.
      const syncRootAttrs = () => {
        const from = document.documentElement;
        const to = doc.documentElement;
        for (const attr of ["class", "style", "lang", "dir", "data-theme"]) {
          const value = from.getAttribute(attr);
          if (value === null) to.removeAttribute(attr);
          else to.setAttribute(attr, value);
        }
      };
      const syncBody = () => {
        doc.body.className = document.body.className;
        doc.body.style.margin = "0";
        // Transparent so the preview surface behind the iframe shows through.
        doc.body.style.background = "transparent";
      };
      syncRootAttrs();
      syncBody();

      const themeObserver = new MutationObserver(() => {
        syncRootAttrs();
        syncBody();
      });
      themeObserver.observe(document.documentElement, { attributes: true });
      themeObserver.observe(document.body, { attributes: true });
      docCleanups.push(() => themeObserver.disconnect());

      // Mirror stylesheets from the parent document into the frame.
      let firstSync = true;
      const syncStyles = () => {
        doc.querySelectorAll(`[${CLONE_MARK}]`).forEach((node) => node.remove());
        const sources = document.querySelectorAll<HTMLLinkElement | HTMLStyleElement>(
          'head link[rel="stylesheet"], head style',
        );
        const loading: Promise<void>[] = [];
        sources.forEach((node) => {
          const clone = node.cloneNode(true) as HTMLLinkElement | HTMLStyleElement;
          clone.setAttribute(CLONE_MARK, "");
          if (node instanceof HTMLLinkElement) {
            (clone as HTMLLinkElement).href = node.href;
            loading.push(
              new Promise((resolve) => {
                clone.addEventListener("load", () => resolve(), { once: true });
                clone.addEventListener("error", () => resolve(), { once: true });
              }),
            );
          }
          doc.head.appendChild(clone);
        });
        if (firstSync) {
          firstSync = false;
          const reveal = () => {
            if (!disposed) setReady(true);
          };
          Promise.all(loading).then(reveal);
          // Safety net if a stylesheet never fires load/error (slow dev compiles)
          window.setTimeout(reveal, 4000);
        }
      };
      syncStyles();

      let styleSyncQueued = false;
      const headObserver = new MutationObserver(() => {
        if (styleSyncQueued) return;
        styleSyncQueued = true;
        requestAnimationFrame(() => {
          styleSyncQueued = false;
          if (!disposed) syncStyles();
        });
      });
      headObserver.observe(document.head, { childList: true, subtree: true });
      docCleanups.push(() => headObserver.disconnect());

      // Mount node the React portal renders into.
      const mount = doc.createElement("div");
      mount.style.display = "flex";
      mount.style.alignItems = "center";
      mount.style.justifyContent = "center";
      mount.style.width = "100%";
      mount.style.minHeight = `${minHeight}px`;
      doc.body.appendChild(mount);
      setMountNode(mount);
      docCleanups.push(() => {
        setMountNode(null);
        mount.remove();
      });

      // Auto-size the iframe to whatever the frame document contains —
      // including popups portaled to the frame body below the content —
      // so nothing gets clipped by the frame edge.
      const updateHeight = () => {
        if (disposed) return;
        const scroller = doc.scrollingElement || doc.documentElement;
        let needed = minHeight;
        for (const child of Array.from(doc.body.children)) {
          const bottom = child.getBoundingClientRect().bottom + scroller.scrollTop;
          if (bottom > needed) needed = bottom;
        }
        setHeight(Math.min(maxHeight, Math.ceil(needed)));
      };

      const FrameResizeObserver =
        (win as Window & typeof globalThis).ResizeObserver ?? ResizeObserver;
      const sizeObserver = new FrameResizeObserver(updateHeight);
      sizeObserver.observe(mount);
      docCleanups.push(() => sizeObserver.disconnect());

      let heightQueued = false;
      const bodyObserver = new MutationObserver(() => {
        if (heightQueued) return;
        heightQueued = true;
        requestAnimationFrame(() => {
          heightQueued = false;
          updateHeight();
        });
      });
      bodyObserver.observe(doc.body, { childList: true, subtree: true });
      docCleanups.push(() => bodyObserver.disconnect());

      // Hand wheel scrolling back to the page when nothing inside can scroll,
      // otherwise the frame swallows the event and the page freezes under it.
      const onWheel = (event: WheelEvent) => {
        // event.target lives in the iframe's realm, so a parent-window
        // `instanceof Element` check is always false — test nodeType instead.
        const target = event.target as Node | null;
        let el: Element | null =
          target && target.nodeType === Node.ELEMENT_NODE ? (target as Element) : null;
        while (el && el !== doc.documentElement) {
          const style = win.getComputedStyle(el);
          const canY =
            /(auto|scroll|overlay)/.test(style.overflowY) && el.scrollHeight > el.clientHeight;
          const canX =
            /(auto|scroll|overlay)/.test(style.overflowX) && el.scrollWidth > el.clientWidth;
          if (
            canY &&
            (event.deltaY < 0
              ? el.scrollTop > 0
              : el.scrollTop + el.clientHeight < el.scrollHeight - 1)
          )
            return;
          if (
            canX &&
            (event.deltaX < 0
              ? el.scrollLeft > 0
              : el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
          )
            return;
          el = el.parentElement;
        }
        // Capped frames scroll at the document level — let that happen natively.
        const scroller = doc.scrollingElement || doc.documentElement;
        if (
          scroller.scrollHeight > scroller.clientHeight &&
          (event.deltaY < 0
            ? scroller.scrollTop > 0
            : scroller.scrollTop + scroller.clientHeight < scroller.scrollHeight - 1)
        )
          return;
        event.preventDefault();
        window.scrollBy({ top: event.deltaY, left: event.deltaX });
      };
      doc.addEventListener("wheel", onWheel, { passive: false });
      docCleanups.push(() => doc.removeEventListener("wheel", onWheel));
    };

    // contentDocument is usually available synchronously for src-less iframes,
    // but some browsers swap in the final about:blank document asynchronously.
    iframe.addEventListener("load", init);
    if (iframe.contentDocument?.readyState === "complete") init();

    return () => {
      disposed = true;
      iframe.removeEventListener("load", init);
      docCleanups.forEach((fn) => fn());
      docCleanups = [];
    };
  }, [minHeight, maxHeight]);

  const scaled = scale !== 1 && frameWidth !== undefined;

  return (
    <>
      <div
        className={cn("relative w-full overflow-hidden", className)}
        style={{ height: Math.round(height * (scaled ? scale : 1)) }}
      >
        <iframe
          ref={iframeRef}
          title={title}
          className={cn(
            "absolute top-0 left-0 block border-0 transition-opacity duration-300",
            ready && mountNode ? "opacity-100" : "opacity-0",
          )}
          style={{
            width: scaled ? `${frameWidth}px` : "100%",
            height,
            transform: scaled ? `scale(${scale})` : undefined,
            transformOrigin: "top left",
          }}
        />
      </div>
      {mountNode ? createPortal(children, mountNode) : null}
    </>
  );
}
