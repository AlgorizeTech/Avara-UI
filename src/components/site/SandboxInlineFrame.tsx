"use client";

import { accentStyle } from "@/lib/accent";
import { cn } from "@/lib/utils";
import { SandboxErrorBoundary } from "@/preview/SandboxErrorBoundary";
import { sandboxRegistry } from "@/preview/registry";
import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentProps,
} from "react";
import { SandboxFrame } from "./SandboxFrame";

type FrameProps = ComponentProps<typeof SandboxFrame>;

/**
 * Width bands that decide whether the layout can differ: below sm, sm, md, and
 * lg-and-up. `xl:` and `2xl:` are deliberately folded into the last band. The
 * fitted preview on a desktop screen is a 1080px viewport inside a window that
 * is usually wider, and treating those as different would send the default
 * view to the iframe. A demo that changes layout at xl/2xl follows the real
 * window when inline, so check it in the iframe (Desktop button) if it matters.
 */
const BREAKPOINTS = [640, 768, 1024];
const band = (width: number) => BREAKPOINTS.filter((point) => width >= point).length;

/** Mounts together with the lazy demo (same Suspense boundary). */
function ReadySignal({ onReady }: { onReady: () => void }) {
  useEffect(onReady, [onReady]);
  return null;
}

/**
 * A docs preview without an iframe: the demo is the page's own React tree,
 * sharing its JS, CSS and theme, so it boots with the page instead of as a
 * second document. Same props as SandboxFrame, so Sandbox can use either.
 *
 * Inline rendering cannot fake a different viewport: Tailwind's `md:`/`lg:`
 * follow the real window, not a box. So this renders inline only when the
 * requested width falls in the same breakpoint band as the visitor's window
 * (the fitted default), and hands everything else to the iframe, which can:
 * the Phone and Tablet presets, a drag-resize into another band, fullscreen.
 */
const subscribeToResize = (notify: () => void) => {
  window.addEventListener("resize", notify);
  return () => window.removeEventListener("resize", notify);
};

export function SandboxInlineFrame(props: FrameProps) {
  // Read synchronously on the client's first render (null on the server), so
  // there is no extra render pass waiting for an effect to supply the width.
  const windowWidth = useSyncExternalStore(
    subscribeToResize,
    () => window.innerWidth,
    () => null,
  );

  const { viewportWidth, fill, minHeight = 0 } = props;
  const sameBand = viewportWidth != null && windowWidth != null && band(viewportWidth) === band(windowWidth);
  const wantFrame = Boolean(fill) || (windowWidth !== null && viewportWidth != null && !sameBand);

  // The iframe is the slow part of a Phone/Tablet/fullscreen switch: a whole
  // document has to boot. v1 never paid for it because its iframe was always
  // there. So it is brought up ahead of the click, as soon as the visitor shows
  // interest in this card (pointer, focus or touch anywhere on it, the device
  // buttons included), and once it exists it is kept (hidden while the inline
  // preview is showing) so no later switch reloads it. A card nobody touches
  // never loads an iframe at all.
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [warm, setWarm] = useState(false);
  const [framed, setFramed] = useState(false);
  if (wantFrame && !framed) setFramed(true);

  useEffect(() => {
    if (warm) return;
    const card = anchorRef.current?.closest("[data-sandbox-card]");
    if (!card) return;
    const heat = () => setWarm(true);
    const events = ["pointerenter", "focusin", "touchstart"] as const;
    events.forEach((type) => card.addEventListener(type, heat, { passive: true, once: true }));
    return () => events.forEach((type) => card.removeEventListener(type, heat));
  }, [warm]);

  const showInline = !wantFrame && viewportWidth != null && windowWidth !== null;

  return (
    <>
      <span ref={anchorRef} hidden />
      {showInline && <InlineStage {...props} viewportWidth={viewportWidth} />}
      {!wantFrame && !showInline && (
        // Width not measured yet: hold the space the preview will take.
        <div style={{ height: minHeight > 0 ? minHeight : 420 }} aria-hidden />
      )}
      {(framed || warm) && (
        // Same element in both states, so the iframe never remounts. Parked, it
        // is clipped to nothing but keeps its real size (display:none would give
        // the document a 0×0 viewport and a wrong first layout).
        <div
          className={wantFrame ? "contents" : "pointer-events-none h-0 overflow-hidden"}
          aria-hidden={wantFrame ? undefined : true}
          inert={wantFrame ? undefined : true}
        >
          <SandboxFrame {...props} />
        </div>
      )}
    </>
  );
}

function InlineStage({
  name,
  sandboxProps,
  accent,
  viewportWidth,
  scale = 1,
  resetKey = 0,
  minHeight = 0,
  maxHeight,
  className,
}: FrameProps & { viewportWidth: number }) {
  const Demo = sandboxRegistry[name] as (typeof sandboxRegistry)[string] | undefined;
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const markReady = useCallback(() => setReady(true), []);

  // Sizing rules match SandboxFrame: the card is never shorter than `minHeight`,
  // follows the demo's height, and `maxHeight` caps it (then it scrolls).
  //
  // The heights are written straight to the DOM, not through React state. A
  // demo that animates its own height (an accordion opening) changes size every
  // frame, and a ResizeObserver callback runs after layout and before paint:
  // setting the heights there keeps the card exactly in step with the content.
  // Going through state costs a frame, so the card lagged behind and clipped
  // the growing panel; a CSS transition on top of that retargets every frame
  // and drags further. The demo's own animation is the only animation.
  const safeScale = scale > 0 ? scale : 1;
  const sizing = useRef({ safeScale, minHeight, maxHeight, ready });
  sizing.current = { safeScale, minHeight, maxHeight, ready };

  const syncHeight = useCallback(() => {
    const content = contentRef.current;
    const wrapper = wrapperRef.current;
    const stage = stageRef.current;
    if (!content || !wrapper || !stage) return;
    const { safeScale, minHeight, maxHeight, ready } = sizing.current;
    const contentHeight = Math.ceil(content.scrollHeight);
    const effectiveMin = minHeight > 0 ? minHeight : !ready || contentHeight === 0 ? 420 : 0;
    const raw = Math.max(Math.ceil(effectiveMin / safeScale), contentHeight);
    const stageHeight = maxHeight && maxHeight > 0 ? Math.min(raw, Math.ceil(maxHeight / safeScale)) : raw;
    stage.style.height = `${stageHeight}px`;
    wrapper.style.height = `${Math.round(stageHeight * safeScale)}px`;
  }, []);

  // Before the first measurement, hold the floor so nothing jumps on mount.
  // React never rewrites these (the values do not change); syncHeight does.
  const [initialHeights] = useState(() => {
    const effectiveMin = minHeight > 0 ? minHeight : 420;
    return { stage: Math.ceil(effectiveMin / safeScale), wrapper: Math.round(effectiveMin) };
  });

  useLayoutEffect(() => {
    syncHeight();
    const content = contentRef.current;
    if (!content) return;
    const observer = new ResizeObserver(syncHeight);
    observer.observe(content);
    return () => observer.disconnect();
  }, [syncHeight, name, resetKey, safeScale, minHeight, maxHeight, ready]);

  // Most demos draw a bordered panel that fills the stage. The stage already
  // sets it off, so its border is dropped (globals.css, `[data-sandbox-frame]`),
  // exactly as SandboxClient does inside the iframe.
  useEffect(() => {
    const content = contentRef.current;
    // Carousels are set off by the stage padding, not drawn full-bleed.
    if (!content || name === "carousel" || name === "curved-carousel") return;
    let frame: HTMLElement | null = null;
    const isFrame = (el: HTMLElement) => {
      const style = getComputedStyle(el);
      const bordered = (["Top", "Right", "Bottom", "Left"] as const).every(
        (side) => parseFloat(style[`border${side}Width`]) > 0 && style[`border${side}Style`] !== "none",
      );
      if (!bordered) return false;
      const stage = getComputedStyle(content);
      const stageWidth =
        content.clientWidth - parseFloat(stage.paddingLeft) - parseFloat(stage.paddingRight);
      const maxWidth = parseFloat(style.maxWidth);
      return el.offsetWidth >= stageWidth * 0.9 && (Number.isNaN(maxWidth) || maxWidth >= 1024);
    };
    const detect = () => {
      let next: HTMLElement | null = null;
      let el = content.firstElementChild as HTMLElement | null;
      for (let depth = 0; el && depth < 4; depth++) {
        if (isFrame(el)) {
          next = el;
          break;
        }
        if (el.children.length !== 1) break;
        el = el.firstElementChild as HTMLElement | null;
      }
      if (next === frame) return;
      frame?.removeAttribute("data-sandbox-frame");
      next?.setAttribute("data-sandbox-frame", "");
      frame = next;
    };
    let queued = false;
    const schedule = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        detect();
      });
    };
    detect();
    const observer = new ResizeObserver(schedule);
    observer.observe(content);
    const mutations = new MutationObserver(schedule);
    mutations.observe(content, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
      frame?.removeAttribute("data-sandbox-frame");
    };
  }, [name, resetKey]);

  if (!Demo) {
    return (
      <div className="p-8 text-sm text-foreground/50">
        Unknown demo: <code>{name}</code>
      </div>
    );
  }

  return (
    // data-toc-skip: the demo's own headings (an accordion's row titles are
    // h3s) are sample content, not part of the page's outline or its TOC.
    <div
      data-toc-skip
      ref={wrapperRef}
      className={cn("relative w-full overflow-hidden", className)}
      style={{ height: initialHeights.wrapper }}
    >
      {/* `data-sandbox` makes headings follow the customizer's font instead of
          Cooper, as inside the iframe. */}
      <div
        ref={stageRef}
        data-sandbox="true"
        className={cn(
          "absolute top-0 left-0 flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden",
          ready ? "opacity-100" : "opacity-0",
        )}
        style={{
          ...accentStyle(accent),
          width: viewportWidth,
          height: initialHeights.stage,
          transform: safeScale !== 1 ? `scale(${safeScale})` : undefined,
          transformOrigin: "top left",
        }}
      >
        <div ref={contentRef} className="flex w-full flex-col items-center p-3! xl:p-5!">
          <SandboxErrorBoundary key={resetKey} name={name}>
            <Suspense fallback={null}>
              <Demo key={resetKey} {...(sandboxProps ?? {})} />
              <ReadySignal onReady={markReady} />
            </Suspense>
          </SandboxErrorBoundary>
        </div>
      </div>
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 animate-in fade-in duration-200">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-foreground/55" />
            <span className="text-xs font-medium text-foreground/40">Loading preview…</span>
          </div>
        </div>
      )}
    </div>
  );
}
