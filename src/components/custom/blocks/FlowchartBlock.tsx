"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import React, {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// ==========================================
// CONTEXT & TYPES
// ==========================================
interface FlowchartContextType {
  activePath: string | null;
  setActivePath: (pathId: string | null) => void;
  color: string;
}

const FlowchartContext = createContext<FlowchartContextType | null>(null);

export function useFlowchart() {
  const context = useContext(FlowchartContext);
  if (!context) {
    throw new Error(
      "Flowchart sub-components must be used within a Flowchart root.",
    );
  }
  return context;
}

// ==========================================
// COMPONENTS
// ==========================================

export interface FlowchartProps extends React.HTMLAttributes<HTMLDivElement> {
  initialActivePath?: string | null;
  color?: "primary" | "blue" | "indigo" | "rose" | "emerald" | "zinc";
}

export const Flowchart = forwardRef<HTMLDivElement, FlowchartProps>(
  (
    {
      children,
      initialActivePath = null,
      color = "primary",
      className,
      ...props
    },
    ref,
  ) => {
    const [activePath, setActivePath] = useState<string | null>(
      initialActivePath,
    );

    return (
      <FlowchartContext.Provider value={{ activePath, setActivePath, color }}>
        <div
          ref={ref}
          className={cn(
            "w-full overflow-x-auto bg-[#fafafa] dark:bg-[#050505] border border-border/80 rounded-2xl select-none shadow-inner custom-scrollbar",
            className,
          )}
          {...props}
        >
          {/* Locked Canvas Matrix Workspace Container */}
          <div className="relative w-[900px] h-[400px] mx-auto overflow-hidden">
            {/* Architectural Blueprint Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800d_1px,transparent_1px),linear-gradient(to_bottom,#8080800d_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

            {/* Content Container Layer */}
            <div className="relative z-10 w-full h-full">{children}</div>
          </div>
        </div>
      </FlowchartContext.Provider>
    );
  },
);
Flowchart.displayName = "Flowchart";

export interface FlowNodeProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
  description?: string;
  icon?: React.ElementType;
  connectedPaths?: string[];
}

export const FlowNode = forwardRef<HTMLDivElement, FlowNodeProps>(
  (
    {
      id,
      title,
      description,
      icon: Icon,
      connectedPaths = [],
      className,
      ...props
    },
    ref,
  ) => {
    const { activePath, setActivePath, color } = useFlowchart();
    const nodeRef = useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => nodeRef.current as HTMLDivElement);

    const isActiveNode = connectedPaths.includes(activePath || "");

    useEffect(() => {
      if (nodeRef.current) {
        gsap.fromTo(
          nodeRef.current,
          { opacity: 0, scale: 0.9, x: -10 },
          { opacity: 1, scale: 1, x: 0, duration: 0.5, ease: "back.out(1.2)" },
        );
      }
    }, []);

    const colorThemes: Record<
      string,
      { ring: string; glow: string; iconBg: string }
    > = {
      indigo: {
        ring: "ring-indigo-500/80 dark:ring-indigo-400",
        glow: "shadow-[0_0_30px_-5px_rgba(99,102,241,0.35)]",
        iconBg: "bg-indigo-500 text-white border-indigo-400",
      },
      blue: {
        ring: "ring-blue-500/80 dark:ring-blue-400",
        glow: "shadow-[0_0_30px_-5px_rgba(59,130,246,0.35)]",
        iconBg: "bg-blue-500 text-white border-blue-400",
      },
      rose: {
        ring: "ring-rose-500/80 dark:ring-rose-400",
        glow: "shadow-[0_0_30px_-5px_rgba(244,63,94,0.35)]",
        iconBg: "bg-rose-500 text-white border-rose-400",
      },
      emerald: {
        ring: "ring-emerald-500/80 dark:ring-emerald-400",
        glow: "shadow-[0_0_30px_-5px_rgba(16,185,129,0.35)]",
        iconBg: "bg-emerald-500 text-white border-emerald-400",
      },
      zinc: {
        ring: "ring-primary",
        glow: "shadow-[0_0_30px_-5px_rgba(0,0,0,0.2)] dark:shadow-[0_0_30px_-5px_rgba(255,255,255,0.15)]",
        iconBg:
          "bg-primary text-primary-foreground border-zinc-700",
      },
      // The default. Unlike the fixed palettes above it follows whatever
      // --primary the consumer's theme sets, so a flowchart matches the rest of
      // their app without being told which colour to use.
      primary: {
        ring: "ring-primary/80",
        glow: "shadow-[0_0_30px_-5px_var(--primary)]",
        iconBg: "bg-primary text-primary-foreground border-primary",
      },
    };

    const currentTheme = colorThemes[color] || colorThemes.primary;

    return (
      <div
        ref={nodeRef}
        onClick={() =>
          connectedPaths.length > 0 && setActivePath(connectedPaths[0])
        }
        // Enforced strict absolute height & width to secure connection nodes
        className={cn(
          "absolute w-[240px] h-[68px] p-3 rounded-xl transition-all duration-300 cursor-pointer opacity-0 flex items-center gap-3 backdrop-blur-xl select-none",
          isActiveNode
            ? cn(
                "bg-white/95 dark:bg-zinc-900/95 scale-[1.02] ring-2 z-30",
                currentTheme.ring,
                currentTheme.glow,
              )
            : "bg-white/50 dark:bg-zinc-900/40 border border-border/80 hover:bg-white/80 dark:hover:bg-zinc-900/80 hover:scale-[1.01] shadow-sm z-20",
          className,
        )}
        {...props}
      >
        {Icon && (
          <div
            className={cn(
              "w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center border transition-all duration-300",
              isActiveNode
                ? currentTheme.iconBg
                : "bg-muted border-border text-muted-foreground",
            )}
          >
            <Icon className="w-[18px] h-[18px]" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h4 className="text-[13.5px] font-bold tracking-tight text-foreground truncate">
            {title}
          </h4>
          {description && (
            <p className="text-[11.5px] font-medium text-muted-foreground truncate mt-0.5">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  },
);
FlowNode.displayName = "FlowNode";

// ==========================================
// SVG CANVAS OVERLAY
// ==========================================
export type FlowCanvasProps = React.SVGAttributes<SVGSVGElement>;

export const FlowCanvas = forwardRef<SVGSVGElement, FlowCanvasProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width="900"
        height="400"
        viewBox="0 0 900 400"
        className={cn(
          "absolute inset-0 w-full h-full pointer-events-none z-10",
          className,
        )}
        {...props}
      >
        {children}
      </svg>
    );
  },
);
FlowCanvas.displayName = "FlowCanvas";

export interface FlowConnectionProps
  extends React.SVGAttributes<SVGPathElement> {
  id: string;
  path: string;
}

export const FlowConnection = forwardRef<SVGPathElement, FlowConnectionProps>(
  ({ id, path, className, ...props }, ref) => {
    const { activePath, color } = useFlowchart();
    const staticLineRef = useRef<SVGPathElement>(null);

    React.useImperativeHandle(
      ref,
      () => staticLineRef.current as SVGPathElement,
    );
    const isActive = activePath === id;

    useEffect(() => {
      if (staticLineRef.current) {
        const length = staticLineRef.current.getTotalLength();
        gsap.fromTo(
          staticLineRef.current,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: "power2.out",
            delay: 0.1,
          },
        );
      }
    }, []);

    const strokeColors: Record<string, string> = {
      // A var() rather than a hex: SVG stroke resolves it, so the active
      // connector tracks the consumer's theme like the nodes do.
      primary: "var(--primary)",
      indigo: "#6366f1",
      blue: "#3b82f6",
      rose: "#f43f5e",
      emerald: "#10b981",
      zinc: "#71717a",
    };
    const activeStroke = strokeColors[color] || strokeColors.primary;

    return (
      <>
        {/* Base Blueprint Structural Track Vector Line */}
        <path
          ref={staticLineRef}
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-zinc-200 dark:text-zinc-800/80 transition-colors duration-500"
          {...props}
        />

        {/* Active Streaming Overlay Line */}
        {isActive && (
          <>
            <path
              d={path}
              fill="none"
              stroke={activeStroke}
              strokeWidth="2"
              strokeDasharray="6 10"
              className="animate-[flow-dash_1.2s_linear_infinite]"
            />
            <path
              d={path}
              fill="none"
              stroke={activeStroke}
              strokeWidth="5"
              className="opacity-20 dark:opacity-30 blur-[2px]"
            />
          </>
        )}

        <style>{`
          @keyframes flow-dash {
            to { stroke-dashoffset: -16; }
          }
        `}</style>
      </>
    );
  },
);
FlowConnection.displayName = "FlowConnection";
