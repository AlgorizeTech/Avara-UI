"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

const CLONE_MARK = "data-preview-frame-clone";

/**
 * Renders children inside a same-origin iframe so viewport-based CSS
 * (Tailwind sm:/md:/lg: media queries) responds to the preview width
 * instead of the browser window. Stylesheets, fonts and the next-themes
 * dark class are mirrored from the parent document and kept in sync.
 */
export function PreviewFrame({
  children,
  minHeight = 400,
  className,
  title = "Component preview",
}: {
  children: React.ReactNode;
  minHeight?: number;
  className?: string;
  title?: string;
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
          window.setTimeout(reveal, 1500);
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

      // Auto-size the iframe to its content so the page keeps a single scroll.
      const FrameResizeObserver =
        (win as Window & typeof globalThis).ResizeObserver ?? ResizeObserver;
      const sizeObserver = new FrameResizeObserver(() => {
        if (disposed) return;
        setHeight(Math.max(minHeight, Math.ceil(mount.getBoundingClientRect().height)));
      });
      sizeObserver.observe(mount);
      docCleanups.push(() => sizeObserver.disconnect());

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
  }, [minHeight]);

  return (
    <>
      <iframe
        ref={iframeRef}
        title={title}
        className={cn(
          "block w-full border-0 transition-opacity duration-300",
          ready && mountNode ? "opacity-100" : "opacity-0",
          className,
        )}
        style={{ height }}
      />
      {mountNode ? createPortal(children, mountNode) : null}
    </>
  );
}
