"use client";

import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { cn } from "@/lib/utils";

// ==========================================
// TECH STACK
// The tools a product is built with: a label, then one group of marks at a
// time in two rows — an odd group staggers as three over four. Every
// `interval` ms the group gives way to the next, each mark blurring out and
// the next blurring in, a beat after the one before it. It turns only while
// it is on screen; with reduced motion the swap is a cut.
//
//   <TechStack label="Built with">
//     <TechStackGroup>
//       <TechStackTool name="React" icon={<ReactIcon />} />
//       …
//     </TechStackGroup>
//     <TechStackGroup>…</TechStackGroup>
//   </TechStack>
// ==========================================

export type TechStackVariant = "labelled" | "compact";

export interface TechStackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The line over the marks. */
  label?: React.ReactNode;
  /** Milliseconds each group stays; `0` holds the first. */
  interval?: number;
  /**
   * `labelled`: the label on the left, names beside the marks from `xl` up.
   * `compact`: the label centred between two hairlines and marks only, a
   * touch larger — each name is its tooltip and is read to screen readers.
   */
  variant?: TechStackVariant;
}

export interface TechStackToolProps extends React.LiHTMLAttributes<HTMLLIElement> {
  name: string;
  /** Any node — an inline SVG or an `<img>`. */
  icon: React.ReactNode;
}

// The same blur as a headline word: in from below, out upwards. `--ts-i` is
// each mark's place in its group.
const STYLES = `
@keyframes ts-tool-in { from { opacity: 0; transform: translateY(20px); filter: blur(8px); } }
@keyframes ts-tool-out { to { opacity: 0; transform: translateY(-20px); filter: blur(8px); } }
.ts-enter > li { animation: ts-tool-in 0.6s cubic-bezier(0, 0, 0.58, 1) calc(var(--ts-i) * 0.05s) backwards; }
.ts-leave > li { animation: ts-tool-out 0.4s cubic-bezier(0.42, 0, 1, 1) calc(var(--ts-i) * 0.03s) forwards; }
`;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (onChange: () => void) => {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
/** The visitor's reduced-motion setting; false while server-rendering. */
function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

/** Whether the element is on screen now — so the groups never turn unseen. */
function useOnScreen<T extends Element>() {
  const ref = useRef<T>(null);
  const [onScreen, setOnScreen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(!!entry?.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, onScreen] as const;
}

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<T | null>).current = node;
    }
  };
}

interface SwapLayer<T> {
  id: number;
  key: React.Key;
  value: T;
  /** Plays the way in — every layer but the first. */
  enter: boolean;
  leaving: boolean;
  /** Where a leaving layer was, pinned there out of the flow. */
  pop?: React.CSSProperties;
}

/**
 * One group that gives way to the next: the new one comes in while the old one
 * plays its way out on top of where it was, lifted out of the flow so the
 * space closes up to the new one at once. `drop` removes a layer once it has
 * gone; a timer does it too, in case its animation never ends. With reduced
 * motion the swap is instant.
 */
function useSwap<T>(key: React.Key, value: T, reduceMotion: boolean, exitMs: number) {
  const [layers, setLayers] = useState<SwapLayer<T>[]>(() => [{ id: 0, key, value, enter: false, leaving: false }]);
  const nodes = useRef(new Map<number, HTMLElement>());
  const timers = useRef(new Map<number, number>());
  const nextId = useRef(1);

  const drop = useCallback((id: number) => {
    window.clearTimeout(timers.current.get(id));
    timers.current.delete(id);
    setLayers((current) => current.filter((layer) => layer.id !== id));
  }, []);

  useLayoutEffect(() => {
    if (layers[layers.length - 1]?.key === key) return;
    const next = { id: nextId.current++, key, value, enter: !reduceMotion, leaving: false };
    if (reduceMotion) {
      setLayers([next]);
      return;
    }
    setLayers([
      ...layers.map((layer) => {
        if (layer.leaving) return layer;
        const node = nodes.current.get(layer.id);
        const pop: React.CSSProperties | undefined = node && {
          position: "absolute",
          top: node.offsetTop,
          left: node.offsetLeft,
          width: node.offsetWidth,
          height: node.offsetHeight,
        };
        return { ...layer, leaving: true, pop };
      }),
      next,
    ]);
  }, [key, value, layers, reduceMotion]);

  useEffect(() => {
    for (const layer of layers) {
      if (layer.leaving && !timers.current.has(layer.id)) {
        timers.current.set(layer.id, window.setTimeout(() => drop(layer.id), exitMs + 100));
      }
    }
  }, [layers, exitMs, drop]);
  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => window.clearTimeout(t));
  }, []);

  const register = useCallback(
    (id: number) => (node: HTMLElement | null) => {
      if (node) nodes.current.set(id, node);
      else nodes.current.delete(id);
    },
    [],
  );

  /** What a layer shows: the current value, or what it showed when it started leaving. */
  const valueOf = (layer: SwapLayer<T>) => (!layer.leaving && layer.key === key ? value : layer.value);

  return { layers, drop, register, valueOf };
}

const VariantContext = createContext<TechStackVariant>("labelled");

/** How the root is showing one group: entering, leaving, or at rest. */
interface LayerState {
  ref: (node: HTMLElement | null) => void;
  className?: string;
  style?: React.CSSProperties;
  onAnimationEnd?: React.AnimationEventHandler<HTMLUListElement>;
}
const LayerContext = createContext<LayerState | null>(null);

const ToolContext = createContext<{ index: number; count: number }>({ index: 0, count: 0 });

// ------------------------------------------
// Root
// ------------------------------------------
export const TechStack = forwardRef<HTMLDivElement, TechStackProps>(
  ({ label, interval = 3600, variant = "labelled", className, children, ...props }, ref) => {
    const groups = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<{
      children?: React.ReactNode;
    }>[];
    const reduceMotion = useReducedMotion();
    const [rootRef, onScreen] = useOnScreen<HTMLDivElement>();

    const [index, setIndex] = useState(0);
    const groupCount = groups.length;
    useEffect(() => {
      if (groupCount < 2 || interval <= 0 || !onScreen) return;
      const t = window.setInterval(() => setIndex((i) => (i + 1) % groupCount), interval);
      return () => window.clearInterval(t);
    }, [groupCount, interval, onScreen]);

    const current = groupCount ? index % groupCount : 0;
    const group = groups[current];
    const toolCount = group ? React.Children.count(group.props.children) : 0;
    // Each mark leaves 0.03s after the one before it, taking 0.4s.
    const { layers, drop, register, valueOf } = useSwap(current, group, reduceMotion, 400 + 30 * toolCount);
    const compact = variant === "compact";

    return (
      <VariantContext.Provider value={variant}>
        <div
          ref={mergeRefs(ref, rootRef)}
          className={cn("flex w-full flex-col", compact ? "items-center gap-5" : "items-start gap-3", className)}
          {...props}
        >
          <style>{STYLES}</style>
          {label &&
            (compact ? (
              <span className="flex w-full items-center gap-4 text-[13px] font-semibold leading-tight text-muted-foreground">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-border" aria-hidden />
                {label}
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-border" aria-hidden />
              </span>
            ) : (
              <span className="text-[13px] font-semibold leading-tight text-muted-foreground">{label}</span>
            ))}
          <div className="relative grid w-full min-w-0" aria-live="polite">
            {layers.map((layer) => (
              <LayerContext.Provider
                key={layer.id}
                value={{
                  ref: register(layer.id),
                  className: layer.leaving ? "ts-leave" : layer.enter ? "ts-enter" : undefined,
                  style: layer.pop,
                  // Gone once the last mark has.
                  onAnimationEnd: (e) => {
                    if (layer.leaving && e.target === e.currentTarget.lastElementChild) drop(layer.id);
                  },
                }}
              >
                {valueOf(layer)}
              </LayerContext.Provider>
            ))}
          </div>
        </div>
      </VariantContext.Provider>
    );
  },
);
TechStack.displayName = "TechStack";

// ------------------------------------------
// One group: two rows, two columns per tool. An odd group puts the smaller
// row on top, starting one column in, so it sits between the tools below
// (three over four); an even group lines up.
// ------------------------------------------
export const TechStackGroup = forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, style, children, onAnimationEnd, ...props }, ref) => {
    const layer = useContext(LayerContext);
    const tools = React.Children.toArray(children).filter(React.isValidElement);
    return (
      <ul
        ref={mergeRefs(ref, layer?.ref)}
        onAnimationEnd={(e) => {
          layer?.onAnimationEnd?.(e);
          onAnimationEnd?.(e);
        }}
        className={cn("col-start-1 row-start-1 grid gap-x-2 gap-y-[22px] sm:gap-x-3", layer?.className, className)}
        style={{ gridTemplateColumns: `repeat(${2 * Math.ceil(tools.length / 2)}, minmax(0, 1fr))`, ...style, ...layer?.style }}
        {...props}
      >
        {tools.map((tool, index) => (
          <ToolContext.Provider key={tool.key ?? index} value={{ index, count: tools.length }}>
            {tool}
          </ToolContext.Provider>
        ))}
      </ul>
    );
  },
);
TechStackGroup.displayName = "TechStackGroup";

// ------------------------------------------
// One tool: its mark, then its name.
// ------------------------------------------
export const TechStackTool = forwardRef<HTMLLIElement, TechStackToolProps>(
  ({ name, icon, className, style, ...props }, ref) => {
    const compact = useContext(VariantContext) === "compact";
    const { index, count } = useContext(ToolContext);
    return (
      <li
        ref={ref}
        title={compact ? name : undefined}
        style={{ "--ts-i": index, ...style } as React.CSSProperties}
        className={cn(
          "col-span-2 flex min-w-0 items-center justify-center gap-2.5 text-foreground [&>img]:shrink-0 [&>img]:object-contain [&>svg]:shrink-0",
          compact
            ? "[&>img]:size-7 [&>svg]:size-6"
            : "[&>img]:size-8 xl:[&>img]:size-6 [&>svg]:size-7 xl:[&>svg]:size-5",
          index === 0 && count % 2 === 1 && "col-start-2",
          className,
        )}
        {...props}
      >
        {icon}
        <span className={cn("truncate text-[13px] font-medium", compact ? "sr-only" : "hidden xl:inline")}>{name}</span>
      </li>
    );
  },
);
TechStackTool.displayName = "TechStackTool";

export default TechStack;
