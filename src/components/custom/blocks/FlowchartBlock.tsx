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
  color?: "blue" | "indigo" | "rose" | "emerald" | "zinc";
}

export const Flowchart = forwardRef<HTMLDivElement, FlowchartProps>(
  (
    {
      children,
      initialActivePath = null,
      color = "indigo",
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
            "relative w-full overflow-hidden bg-[#fafafa] dark:bg-[#07070a] p-8 md:p-14 border border-zinc-200/80 dark:border-zinc-900 rounded-xl select-none shadow-sm",
            className,
          )}
          {...props}
        >
          {/* Subtle Linear Grid Blueprint Matrix */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

          <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-12">
            {children}
          </div>
        </div>
      </FlowchartContext.Provider>
    );
  },
);
Flowchart.displayName = "Flowchart";

export type FlowColumnProps = React.HTMLAttributes<HTMLDivElement>;

export const FlowColumn = forwardRef<HTMLDivElement, FlowColumnProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-row lg:flex-col items-center justify-center gap-8 w-full lg:w-auto relative z-20",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
FlowColumn.displayName = "FlowColumn";

export interface FlowNodeProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
  description?: string;
  icon?: React.ComponentType<any>;
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
          { opacity: 0, y: 15, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power4.out",
          },
        );
      }
    }, []);

    // Brand specific beam and border colors
    const colorThemes: Record<
      string,
      { beam: string; activeBorder: string; glow: string }
    > = {
      indigo: {
        beam: "bg-indigo-500",
        activeBorder: "border-indigo-500/50",
        glow: "shadow-[0_0_20px_rgba(99,102,241,0.15)]",
      },
      blue: {
        beam: "bg-blue-500",
        activeBorder: "border-blue-500/50",
        glow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]",
      },
      rose: {
        beam: "bg-rose-500",
        activeBorder: "border-rose-500/50",
        glow: "shadow-[0_0_20px_rgba(244,63,94,0.15)]",
      },
      emerald: {
        beam: "bg-emerald-500",
        activeBorder: "border-emerald-500/50",
        glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
      },
      zinc: {
        beam: "bg-zinc-900 dark:bg-white",
        activeBorder: "border-zinc-900 dark:border-zinc-400",
        glow: "shadow-[0_0_20px_rgba(24,24,27,0.1)]",
      },
    };

    const currentTheme = colorThemes[color] || colorThemes.indigo;

    return (
      <div
        ref={nodeRef}
        onClick={() =>
          connectedPaths.length > 0 && setActivePath(connectedPaths[0])
        }
        className={cn(
          "relative w-full max-w-[250px] bg-white dark:bg-[#0d0d11] rounded-lg border text-left transition-all duration-300 cursor-pointer overflow-hidden opacity-0",
          isActiveNode
            ? cn(
                "scale-[1.02] shadow-md z-30",
                currentTheme.activeBorder,
                currentTheme.glow,
              )
            : "border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 hover:scale-[1.01]",
          className,
        )}
        {...props}
      >
        {/* Active Structural Indicator Left Side Edge Beam */}
        <div
          className={cn(
            "absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300",
            isActiveNode ? currentTheme.beam : "bg-transparent",
          )}
        />

        <div className="p-4 pl-5 flex items-start gap-3.5">
          {Icon && (
            <div
              className={cn(
                "p-2 rounded-md flex-shrink-0 border transition-colors",
                isActiveNode
                  ? "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                  : "bg-zinc-50 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800 text-zinc-400",
              )}
            >
              <Icon className="w-4 h-4" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h4 className="text-[13.5px] font-bold tracking-tight text-zinc-900 dark:text-zinc-100 truncate">
              {title}
            </h4>
            {description && (
              <p className="text-[11.5px] text-zinc-400 dark:text-zinc-500 font-medium truncate mt-0.5">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  },
);
FlowNode.displayName = "FlowNode";

// ==========================================
// SVG CANVAS OVERLAY CONNECTION LAYER
// ==========================================
export type FlowCanvasProps = React.SVGAttributes<SVGSVGElement>;

export const FlowCanvas = forwardRef<SVGSVGElement, FlowCanvasProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        className={cn(
          "absolute inset-0 w-full h-full pointer-events-none z-10 hidden lg:block",
          className,
        )}
        style={{ overflow: "visible" }}
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
    const pulseLineRef = useRef<SVGPathElement>(null);
    const staticLineRef = useRef<SVGPathElement>(null);

    React.useImperativeHandle(
      ref,
      () => pulseLineRef.current as SVGPathElement,
    );

    const isActive = activePath === id;

    useEffect(() => {
      // Trigger smooth entry drawing animation via GSAP
      if (staticLineRef.current) {
        const length = staticLineRef.current.getTotalLength();
        gsap.fromTo(
          staticLineRef.current,
          { strokeDasharray: length, strokeDashoffset: length },
          { strokeDashoffset: 0, duration: 1, ease: "power3.out" },
        );
      }
    }, []);

    useEffect(() => {
      // High-end fluid laser animation sequence via GSAP timeline properties
      if (pulseLineRef.current && isActive) {
        const length = pulseLineRef.current.getTotalLength();

        gsap.killTweensOf(pulseLineRef.current);

        gsap.fromTo(
          pulseLineRef.current,
          { strokeDasharray: `30, ${length}`, strokeDashoffset: 0 },
          {
            strokeDashoffset: -length,
            duration: 1.8,
            repeat: -1,
            ease: "none",
          },
        );
      } else if (pulseLineRef.current) {
        gsap.killTweensOf(pulseLineRef.current);
      }
    }, [isActive]);

    // Accent line stroke themes
    const strokeColors: Record<string, string> = {
      indigo: "#6366f1",
      blue: "#3b82f6",
      rose: "#f43f5e",
      emerald: "#10b981",
      zinc: "#27272a",
    };

    const activeStroke = strokeColors[color] || strokeColors.indigo;

    return (
      <>
        {/* Base Blueprint Structural Connection Track */}
        <path
          ref={staticLineRef}
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={cn(
            "transition-colors duration-300",
            isActive
              ? "text-zinc-300 dark:text-zinc-700"
              : "text-zinc-200 dark:text-zinc-900",
          )}
          {...props}
        />

        {/* Premium Fluid Laser Animation String Overlay */}
        <path
          ref={pulseLineRef}
          d={path}
          fill="none"
          stroke={isActive ? activeStroke : "transparent"}
          strokeWidth="2"
          opacity={isActive ? 1 : 0}
        />
      </>
    );
  },
);
FlowConnection.displayName = "FlowConnection";
