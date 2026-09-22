"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  ArrowRight,
  Link as LinkIcon,
  Zap,
  Calendar,
  FileText,
  Code2,
  CheckCircle2,
  Clock,
  Shield,
  BarChart3,
  Cpu,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════
   TYPES & INTERFACES
   ═══════════════════════════════════════════════ */

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category?: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
  color?: string;
  layer?: "outer" | "inner";
}

export interface RadialOrbitalTimelineProps {
  timelineData?: TimelineItem[];
  outerOrbitItems?: TimelineItem[];
  innerOrbitItems?: TimelineItem[];
  orbitCount?: 1 | 2;
  className?: string;
}

/* ═══════════════════════════════════════════════
   HELPER UI COMPONENTS (Self-Contained)
   ═══════════════════════════════════════════════ */

const Badge = ({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn("inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold transition-colors border", className)}
    {...props}
  >
    {children}
  </span>
);

const Button = ({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string; size?: string }) => (
  <button
    className={cn(
      "inline-flex items-center justify-center font-medium transition-colors cursor-pointer disabled:opacity-50",
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

/* ═══════════════════════════════════════════════
   DEFAULT SAMPLE DATA (5 Outer Orbit, 5 Inner Orbit)
   ═══════════════════════════════════════════════ */

const DEFAULT_TIMELINE_DATA: TimelineItem[] = [
  // Outer Orbit (5 items - indices 0, 2, 4, 6, 8)
  {
    id: 1,
    title: "Planning",
    date: "Jan 2024",
    content: "Project scope definition, requirements gathering, and initial architecture design.",
    category: "Phase 1",
    icon: Calendar,
    relatedIds: [2],
    status: "completed",
    energy: 100,
    color: "bg-blue-500 text-white border-blue-400",
  },
  {
    id: 2,
    title: "Research",
    date: "Feb 2024",
    content: "Competitive analysis, user persona creation, and market trend studies.",
    category: "Phase 1.5",
    icon: Zap,
    relatedIds: [3],
    status: "completed",
    energy: 90,
    color: "bg-purple-500 text-white border-purple-400",
  },
  {
    id: 3,
    title: "Design",
    date: "Mar 2024",
    content: "High-fidelity UI/UX design systems, interactive prototypes, and component specs.",
    category: "Phase 2",
    icon: FileText,
    relatedIds: [4],
    status: "completed",
    energy: 85,
    color: "bg-pink-500 text-white border-pink-400",
  },
  {
    id: 4,
    title: "Security",
    date: "Apr 2024",
    content: "Vulnerability assessment, encryption protocol setup, and compliance checks.",
    category: "Phase 2.5",
    icon: Shield,
    relatedIds: [5],
    status: "in-progress",
    energy: 75,
    color: "bg-amber-500 text-white border-amber-400",
  },
  {
    id: 5,
    title: "Development",
    date: "May 2024",
    content: "Core frontend component construction, state management, and backend API integration.",
    category: "Phase 3",
    icon: Code2,
    relatedIds: [6],
    status: "in-progress",
    energy: 60,
    color: "bg-emerald-500 text-white border-emerald-400",
  },
  {
    id: 6,
    title: "Analytics",
    date: "Jun 2024",
    content: "Real-time telemetry logging, event tracking instrumentation, and metrics dashboards.",
    category: "Phase 3.5",
    icon: BarChart3,
    relatedIds: [7],
    status: "in-progress",
    energy: 50,
    color: "bg-cyan-500 text-white border-cyan-400",
  },
  {
    id: 7,
    title: "Testing",
    date: "Jul 2024",
    content: "Automated unit tests, end-to-end user journey validation, and cross-browser testing.",
    category: "Phase 4",
    icon: CheckCircle2,
    relatedIds: [8],
    status: "in-progress",
    energy: 40,
    color: "bg-indigo-500 text-white border-indigo-400",
  },
  {
    id: 8,
    title: "Optimization",
    date: "Aug 2024",
    content: "Performance tuning, bundle size reduction, and asset caching strategy implementation.",
    category: "Phase 4.5",
    icon: Cpu,
    relatedIds: [9],
    status: "pending",
    energy: 30,
    color: "bg-orange-500 text-white border-orange-400",
  },
  {
    id: 9,
    title: "Release",
    date: "Sep 2024",
    content: "Final deployment and release to production environment with continuous monitoring.",
    category: "Phase 5",
    icon: Clock,
    relatedIds: [10],
    status: "pending",
    energy: 20,
    color: "bg-rose-500 text-white border-rose-400",
  },
  {
    id: 10,
    title: "Feedback",
    date: "Oct 2024",
    content: "User review collection, post-launch analytics evaluation, and iterative backlog planning.",
    category: "Phase 5.5",
    icon: MessageSquare,
    relatedIds: [1],
    status: "pending",
    energy: 10,
    color: "bg-teal-500 text-white border-teal-400",
  },
];

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */

export default function RadialOrbitalTimeline({
  timelineData,
  outerOrbitItems,
  innerOrbitItems,
  orbitCount,
  className,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [viewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Determine effective orbit count
  const effectiveOrbitCount = useMemo(() => {
    if (orbitCount === 1) return 1;
    if (orbitCount === 2) return 2;
    if (innerOrbitItems && innerOrbitItems.length > 0) return 2;
    return 2;
  }, [orbitCount, innerOrbitItems]);

  // Process outer and inner items flexibly from props
  const { outerList, innerList, allItems } = useMemo(() => {
    let outer: TimelineItem[] = [];
    let inner: TimelineItem[] = [];

    if (effectiveOrbitCount === 1) {
      const source =
        outerOrbitItems && outerOrbitItems.length > 0
          ? outerOrbitItems
          : timelineData && timelineData.length > 0
            ? timelineData
            : DEFAULT_TIMELINE_DATA;
      outer = source.map((item) => ({ ...item, layer: "outer" as const }));
    } else {
      if (outerOrbitItems && outerOrbitItems.length > 0) {
        outer = outerOrbitItems.map((item) => ({ ...item, layer: "outer" as const }));
      }
      if (innerOrbitItems && innerOrbitItems.length > 0) {
        inner = innerOrbitItems.map((item) => ({ ...item, layer: "inner" as const }));
      }

      if (outer.length === 0 && inner.length === 0) {
        const source = timelineData && timelineData.length > 0 ? timelineData : DEFAULT_TIMELINE_DATA;
        const explicitOuter = source.filter((item) => item.layer === "outer");
        const explicitInner = source.filter((item) => item.layer === "inner");

        if (explicitOuter.length > 0 || explicitInner.length > 0) {
          outer = explicitOuter;
          inner = explicitInner;
        } else {
          source.forEach((item, idx) => {
            if (idx % 2 === 0) outer.push({ ...item, layer: "outer" });
            else inner.push({ ...item, layer: "inner" });
          });
        }
      }
    }

    const combined = [...outer, ...inner];
    return { outerList: outer, innerList: inner, allItems: combined };
  }, [timelineData, outerOrbitItems, innerOrbitItems, effectiveOrbitCount]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  // Smooth 60FPS Rotation via requestAnimationFrame (avoids timer throttling & lag jumps)
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const animateRotation = (time: number) => {
      if (previousTimeRef.current !== null) {
        const deltaTime = time - previousTimeRef.current;
        // Smooth 60fps constant angular velocity (12 deg/sec)
        setRotationAngle((prev) => (prev + (12 * deltaTime) / 1000) % 360);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animateRotation);
    };

    if (autoRotate && viewMode === "orbital") {
      previousTimeRef.current = null;
      requestRef.current = requestAnimationFrame(animateRotation);
    } else if (requestRef.current !== null) {
      cancelAnimationFrame(requestRef.current);
    }

    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const targetItem = allItems.find((item) => item.id === nodeId);
    if (!targetItem) return;

    const isInnerLayer = targetItem.layer === "inner";
    const layerList = isInnerLayer ? innerList : outerList;
    const itemIndexInLayer = Math.max(0, layerList.findIndex((i) => i.id === nodeId));
    const itemsOnThisLayer = layerList.length || 1;
    const initialAngleOffset = isInnerLayer ? 36 : 0;

    const targetAngle = (itemIndexInLayer / itemsOnThisLayer) * 360 + initialAngleOffset;

    if (isInnerLayer) {
      setRotationAngle(-(270 - targetAngle));
    } else {
      setRotationAngle(270 - targetAngle);
    }
  };

  const calculateNodePosition = (item: TimelineItem) => {
    const isInnerLayer = item.layer === "inner";
    const layerList = isInnerLayer ? innerList : outerList;
    const itemIndexInLayer = Math.max(0, layerList.findIndex((i) => i.id === item.id));
    const itemsOnThisLayer = layerList.length || 1;

    const outerRadius = isMobile ? 115 : 210;
    const innerRadius = isMobile ? 70 : 130;
    const radius = isInnerLayer ? innerRadius : outerRadius;
    const directionMultiplier = isInnerLayer ? -1 : 1;
    const initialAngleOffset = isInnerLayer ? 36 : 0;

    const angle =
      ((itemIndexInLayer / itemsOnThisLayer) * 360 + initialAngleOffset + rotationAngle * directionMultiplier) % 360;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = 1;

    return { x, y, angle, zIndex, opacity, isInnerLayer };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = allItems.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-primary bg-primary/10 border-primary/30";
      case "in-progress":
        return "text-emerald-700 bg-emerald-100 border-emerald-300 dark:text-emerald-300 dark:bg-emerald-950/60 dark:border-emerald-800";
      case "pending":
        return "text-zinc-600 bg-zinc-100 border-zinc-300 dark:text-zinc-300 dark:bg-zinc-800 dark:border-zinc-700";
      default:
        return "text-zinc-600 bg-zinc-100 border-zinc-300 dark:text-zinc-300 dark:bg-zinc-800 dark:border-zinc-700";
    }
  };

  return (
    <div
      className={cn(
        "w-full h-[650px] sm:h-[720px] flex flex-col items-center justify-center bg-white text-zinc-900 dark:bg-black dark:text-white overflow-hidden rounded-3xl border border-zinc-200 dark:border-white/10 relative selection:bg-primary/20",
        className,
      )}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Central Nucleus (Ultra-Stylish Modern Pulse with Rotating Halo) */}
          <div className="absolute w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-transparent flex items-center justify-center z-10 pointer-events-none">
            {/* Outer Rotating Sci-Fi Dashed Halo Ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-primary/40 animate-[spin_12s_linear_infinite]" />

            {/* Staggered Concentric Border Pulse Rings */}
            <div className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-primary/60 animate-ping opacity-60 pointer-events-none" />
            <div
              className="absolute w-14 h-14 sm:w-20 sm:h-20 rounded-full border border-primary/30 animate-ping opacity-40 pointer-events-none"
              style={{ animationDelay: "0.7s" }}
            />

            {/* Core Center Dot */}
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30 relative z-10">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary-foreground animate-pulse" />
            </div>
          </div>

          {/* Outer Orbital Circle Line (ONLY line is kept 100% rounded circle at all times) */}
          <div
            className="keep-rounded rounded-full absolute border border-zinc-300/80 dark:border-white/10 pointer-events-none transition-all duration-300"
            style={{
              width: isMobile ? "230px" : "420px",
              height: isMobile ? "230px" : "420px",
            }}
          ></div>

          {/* Inner Orbital Circle Line (Only shown when effectiveOrbitCount === 2) */}
          {effectiveOrbitCount === 2 && (
            <div
              className="keep-rounded rounded-full absolute border border-dashed border-zinc-400/50 dark:border-white/20 pointer-events-none transition-all duration-300"
              style={{
                width: isMobile ? "140px" : "260px",
                height: isMobile ? "140px" : "260px",
              }}
            ></div>
          )}

          {/* Timeline Nodes */}
          {allItems.map((item, index) => {
            const position = calculateNodePosition(item);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const defaultColors = [
              "bg-blue-500 text-white border-blue-400 dark:border-blue-300",
              "bg-purple-500 text-white border-purple-400 dark:border-purple-300",
              "bg-pink-500 text-white border-pink-400 dark:border-pink-300",
              "bg-amber-500 text-white border-amber-400 dark:border-amber-300",
              "bg-emerald-500 text-white border-emerald-400 dark:border-emerald-300",
              "bg-cyan-500 text-white border-cyan-400 dark:border-cyan-300",
              "bg-indigo-500 text-white border-indigo-400 dark:border-indigo-300",
              "bg-orange-500 text-white border-orange-400 dark:border-orange-300",
              "bg-rose-500 text-white border-rose-400 dark:border-rose-300",
              "bg-teal-500 text-white border-teal-400 dark:border-teal-300",
            ];
            const badgeColor = item.color || defaultColors[index % defaultColors.length];

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className={cn(
                  "absolute cursor-pointer",
                  !autoRotate && "transition-all duration-700 ease-out",
                )}
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Energy Pulse Aura */}
                <div
                  className={`absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(var(--primary),0.25) 0%, rgba(var(--primary),0) 70%)`,
                    width: isMobile ? `${item.energy * 0.35 + 28}px` : `${item.energy * 0.5 + 40}px`,
                    height: isMobile ? `${item.energy * 0.35 + 28}px` : `${item.energy * 0.5 + 40}px`,
                  }}
                ></div>

                {/* Node Icon Badge */}
                <div
                  className={cn(
                    "absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center shrink-0 z-10 border-2 transition-all duration-300 transform shadow-md",
                    isMobile ? "w-7 h-7" : "w-10 h-10",
                    badgeColor,
                    isExpanded && (isMobile ? "scale-125 ring-2 ring-primary/40 shadow-lg shadow-primary/30 border-white" : "scale-150 ring-4 ring-primary/40 shadow-xl shadow-primary/30 border-white"),
                    isRelated && !isExpanded && "ring-2 ring-primary/30",
                  )}
                >
                  <Icon size={isMobile ? 12 : 16} />
                </div>

                {/* Node Title Label (Hangs centered below icon) */}
                <div
                  className={`
                  absolute left-1/2 -translate-x-1/2 whitespace-nowrap tracking-wider transition-all duration-300 pointer-events-none
                  ${isMobile ? "text-[10px]" : "text-xs font-semibold"}
                  ${
                    isExpanded
                      ? isMobile ? "top-5 text-primary font-semibold scale-105" : "top-10 text-primary font-semibold scale-110"
                      : isMobile ? "top-4 text-zinc-600 dark:text-white/70" : "top-7 text-zinc-600 dark:text-white/70"
                  }
                `}
                >
                  {item.title}
                </div>

                {/* Expanded Card Popover */}
                {isExpanded && (
                  <Card className="absolute top-16 left-1/2 -translate-x-1/2 w-64 bg-white/95 dark:bg-black/90 backdrop-blur-lg border-zinc-200 dark:border-white/30 shadow-2xl shadow-zinc-900/10 dark:shadow-white/10 overflow-visible text-zinc-900 dark:text-white z-50">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-primary/80"></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-2 text-xs font-semibold ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {item.status === "completed"
                            ? "COMPLETE"
                            : item.status === "in-progress"
                            ? "IN PROGRESS"
                            : "PENDING"}
                        </Badge>
                        <span className="text-xs font-mono text-zinc-500 dark:text-white/50">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-sm mt-2 font-semibold text-zinc-900 dark:text-white">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-zinc-600 dark:text-white/80">
                      <p>{item.content}</p>

                      <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-white/10">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center text-zinc-800 dark:text-white/90">
                            <Zap size={10} className="mr-1 text-primary" />
                            Energy Level
                          </span>
                          <span className="font-mono font-semibold text-zinc-900 dark:text-white">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-zinc-200 dark:bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-white/10">
                          <div className="flex items-center mb-2">
                            <LinkIcon size={10} className="text-zinc-500 dark:text-white/70 mr-1" />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-zinc-500 dark:text-white/70">
                              Connected Nodes
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = allItems.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2 py-0 text-xs rounded-none border-zinc-300 dark:border-white/20 bg-zinc-100 dark:bg-transparent hover:bg-primary/10 hover:border-primary/40 hover:text-primary text-zinc-800 dark:text-white/80 transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className="ml-1 text-primary"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
