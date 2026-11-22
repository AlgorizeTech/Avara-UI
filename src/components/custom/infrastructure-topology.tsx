"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
    Zap,
    UserCheck,
    ShieldAlert,
    Database,
    Cloud,
    CreditCard,
    Activity,
    Shield,
    Wifi,
} from "lucide-react";

export interface TopologyNode {
    id: string;
    title: string;
    subtitle: string;
    badgeText: string;
    badgeVariant?: "emerald" | "amber" | "blue" | "rose" | "purple";
    icon: React.ReactNode;
    color: string;
    strokeColor: string;
    position: "top-left" | "bottom-left" | "top-right" | "middle-right" | "bottom-right";
}

export interface MetricItem {
    id: string;
    label: string;
    value: string;
    icon: React.ReactNode;
    color?: string;
}

export type InfrastructureTopologyVariant = "orbit" | "pulse";

export interface InfrastructureTopologyProps {
    /** Visual & animation variant */
    variant?: InfrastructureTopologyVariant;
    /** Header main title */
    headerTitle?: string;
    /** Monospaced header subtitle */
    headerSubtitle?: string;
    /** System status text */
    statusBadge?: string;
    /** Bandwidth status text */
    bandwidthBadge?: string;
    /** Center node title */
    centerTitle?: string;
    /** Center node subtitle */
    centerSubtitle?: string;
    /** Center node theme color: "cyan" | "emerald" | "indigo" | "rose" | "purple" */
    centerColor?: "cyan" | "emerald" | "indigo" | "rose" | "purple";
    /** Custom list of service nodes */
    nodes?: TopologyNode[];
    /** Custom list of bottom metric pills */
    metrics?: MetricItem[];
    /** Enable animated beam data flows */
    animated?: boolean;
    /** Enable interactive route highlighting on hover */
    interactive?: boolean;
    /** Container class name */
    className?: string;
}

const DEFAULT_NODES: TopologyNode[] = [
    {
        id: "auth",
        title: "User Auth",
        subtitle: "OAUTH 2.0",
        badgeText: "SECURED",
        badgeVariant: "blue",
        icon: <UserCheck className="w-4 h-4 md:w-4.5 md:h-4.5 text-blue-500" />,
        color: "blue",
        strokeColor: "#3b82f6",
        position: "top-left",
    },
    {
        id: "waf",
        title: "WAF Guard",
        subtitle: "LAYER 7",
        badgeText: "ONLINE",
        badgeVariant: "rose",
        icon: <ShieldAlert className="w-4 h-4 md:w-4.5 md:h-4.5 text-rose-500" />,
        color: "rose",
        strokeColor: "#f43f5e",
        position: "bottom-left",
    },
    {
        id: "db",
        title: "Postgres",
        subtitle: "PRIMARY DB",
        badgeText: "ONLINE",
        badgeVariant: "purple",
        icon: <Database className="w-4 h-4 md:w-4.5 md:h-4.5 text-purple-500" />,
        color: "purple",
        strokeColor: "#a855f7",
        position: "top-right",
    },
    {
        id: "aws",
        title: "AWS Cloud",
        subtitle: "US-EAST-1",
        badgeText: "ACTIVE",
        badgeVariant: "amber",
        icon: <Cloud className="w-4 h-4 md:w-4.5 md:h-4.5 text-amber-500" />,
        color: "amber",
        strokeColor: "#f59e0b",
        position: "middle-right",
    },
    {
        id: "billing",
        title: "Billing API",
        subtitle: "STRIPE V3",
        badgeText: "ONLINE",
        badgeVariant: "emerald",
        icon: <CreditCard className="w-4 h-4 md:w-4.5 md:h-4.5 text-emerald-500" />,
        color: "emerald",
        strokeColor: "#10b981",
        position: "bottom-right",
    },
];

const DEFAULT_METRICS: MetricItem[] = [
    {
        id: "throughput",
        label: "THROUGHPUT",
        value: "4.8 GB/s",
        icon: <Activity className="w-3.5 h-3.5 text-blue-500" />,
        color: "text-blue-600 dark:text-blue-400",
    },
    {
        id: "latency",
        label: "LATENCY P99",
        value: "< 8 ms",
        icon: <Zap className="w-3.5 h-3.5 text-emerald-500" />,
        color: "text-emerald-600 dark:text-emerald-400",
    },
    {
        id: "threats",
        label: "THREATS",
        value: "0 Active",
        icon: <Shield className="w-3.5 h-3.5 text-muted-foreground" />,
        color: "text-foreground",
    },
    {
        id: "queries",
        label: "QUERIES/S",
        value: "12 400",
        icon: <Database className="w-3.5 h-3.5 text-purple-500" />,
        color: "text-purple-600 dark:text-purple-400",
    },
    {
        id: "uptime",
        label: "UPTIME",
        value: "99.99%",
        icon: <Wifi className="w-3.5 h-3.5 text-amber-500" />,
        color: "text-amber-600 dark:text-amber-400",
    },
];

export function InfrastructureTopology({
    variant = "orbit",
    headerTitle = "Infrastructure Topology",
    headerSubtitle = "LIVE DATA FLOW · 6 SERVICES · 5 ROUTES",
    statusBadge = "ALL SYSTEMS",
    bandwidthBadge = "10 GBPS",
    centerTitle = "NEURAL MESH",
    centerSubtitle = "CORE ROUTER · V4.2",
    nodes = DEFAULT_NODES,
    metrics = DEFAULT_METRICS,
    animated = true,
    interactive = true,
    className,
}: InfrastructureTopologyProps) {
    const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const activeNodeId = hoveredNodeId ?? selectedNodeId;

    const canvasRef = useRef<HTMLDivElement | null>(null);
    const hubRef = useRef<HTMLDivElement | null>(null);
    const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const [measuredPaths, setMeasuredPaths] = useState<Record<string, string>>({});

    const measurePaths = useCallback(() => {
        const canvas = canvasRef.current;
        const hub = hubRef.current;
        if (!canvas || !hub) return;

        const cRect = canvas.getBoundingClientRect();
        const hRect = hub.getBoundingClientRect();
        if (cRect.width === 0 || cRect.height === 0) return;

        const hx = hRect.left - cRect.left + hRect.width / 2;
        const hy = hRect.top - cRect.top + hRect.height / 2;

        const next: Record<string, string> = {};
        for (const node of nodes) {
            const el = nodeRefs.current[node.id];
            if (!el) continue;
            const r = el.getBoundingClientRect();
            const isLeft = node.position.includes("left");
            const nx = isLeft ? r.right - cRect.left : r.left - cRect.left;
            const ny = r.top - cRect.top + r.height / 2;

            if (variant === "pulse") {
                const dx = hx - nx;
                next[node.id] = `M ${nx} ${ny} C ${nx + dx * 0.48} ${ny}, ${nx + dx * 0.52} ${hy}, ${hx} ${hy}`;
            } else {
                next[node.id] = `M ${nx} ${ny} Q ${(nx + hx) / 2} ${ny} ${hx} ${hy}`;
            }
        }
        setMeasuredPaths(next);
    }, [nodes, variant]);

    useEffect(() => {
        measurePaths();
        const canvas = canvasRef.current;
        if (!canvas || typeof ResizeObserver === "undefined") return;
        const ro = new ResizeObserver(() => measurePaths());
        ro.observe(canvas);
        window.addEventListener("resize", measurePaths);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measurePaths);
        };
    }, [measurePaths]);

    const getBadgeStyle = (variant?: string) => {
        switch (variant) {
            case "blue":
                return "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30";
            case "rose":
                return "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30";
            case "purple":
                return "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30";
            case "amber":
                return "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30";
            case "emerald":
            default:
                return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30";
        }
    };

    const getNodeBorderStyle = (color: string, isHovered: boolean) => {
        if (isHovered) {
            switch (color) {
                case "blue":
                    return "border-blue-500 ring-2 ring-blue-500/20";
                case "rose":
                    return "border-rose-500 ring-2 ring-rose-500/20";
                case "purple":
                    return "border-purple-500 ring-2 ring-purple-500/20";
                case "amber":
                    return "border-amber-500 ring-2 ring-amber-500/20";
                case "emerald":
                default:
                    return "border-emerald-500 ring-2 ring-emerald-500/20";
            }
        }

        switch (color) {
            case "blue":
                return "border-blue-500/30 hover:border-blue-500/60";
            case "rose":
                return "border-rose-500/30 hover:border-rose-500/60";
            case "purple":
                return "border-purple-500/30 hover:border-purple-500/60";
            case "amber":
                return "border-amber-500/30 hover:border-amber-500/60";
            case "emerald":
            default:
                return "border-emerald-500/30 hover:border-emerald-500/60";
        }
    };

    const orbitPaths: Record<TopologyNode["position"], { d: string; dur: string }> = {
        "top-left": { d: "M 240 100 Q 370 110 500 250", dur: "2.6s" },
        "bottom-left": { d: "M 240 400 Q 370 390 500 250", dur: "3.1s" },
        "top-right": { d: "M 760 90 Q 630 110 500 250", dur: "2.4s" },
        "middle-right": { d: "M 760 250 Q 635 250 500 250", dur: "2.1s" },
        "bottom-right": { d: "M 760 410 Q 630 390 500 250", dur: "2.9s" },
    };

    if (variant !== "pulse") {
        const activeNode = nodes.find((n) => n.id === activeNodeId);

        return (
            <div
                className={cn(
                    "w-full rounded-3xl bg-card/90 backdrop-blur-2xl p-4 sm:p-6 md:p-8 shadow-none relative overflow-hidden select-none",
                    className
                )}
            >
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
                        @keyframes orbit-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                        @keyframes orbit-spin-rev { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
                        @keyframes orbit-scan { 0% { transform: translateX(-100%); opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { transform: translateX(200%); opacity: 0; } }
                        `,
                    }}
                />

                {/* Header — Centered stacked layout across all screen sizes for Orbital Mesh */}
                <div className="relative z-10 flex flex-col items-center text-center justify-center gap-4 pb-5 sm:pb-6">
                    <div className="flex flex-col items-center gap-3">
                        <div className="p-2.5 rounded-2xl bg-primary/10 border border-primary/25 text-primary shrink-0">
                            <Activity className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
                                {headerTitle}
                            </h2>
                            <p className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-widest text-muted-foreground min-h-[2.6em] sm:min-h-0 flex items-center justify-center">
                                {activeNode
                                    ? `ACTIVE ROUTE · ${activeNode.title.toUpperCase()} (${activeNode.subtitle})`
                                    : headerSubtitle}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        <div className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono font-semibold bg-primary/10 text-primary border border-primary/25 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                            <span>{statusBadge}</span>
                        </div>

                        <div className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono font-semibold bg-muted/70 text-foreground/80 border border-border/70 flex items-center gap-1.5 backdrop-blur-md">
                            <Wifi className="w-3.5 h-3.5 text-primary" />
                            <span>{bandwidthBadge}</span>
                        </div>
                    </div>

                    {/* Animated Gliding Laser Divider (Style 1: Center-fade scan beam) */}
                    <div aria-hidden className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border/80 to-transparent overflow-hidden">
                        <div
                            className="h-full w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
                            style={animated ? { animation: "orbit-scan 3.2s ease-in-out infinite" } : undefined}
                        />
                    </div>
                </div>

                {/* ALL DEVICES: Curved Bezier Pipelines + Travelling Orbs (icon-only cards below lg, full cards on lg+) */}
                <div ref={canvasRef} className="flex relative w-full min-h-[360px] sm:min-h-[440px] lg:min-h-[500px] items-center justify-center my-4">
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none z-0"
                    >
                        {nodes.map((node) => {
                            const cfg = orbitPaths[node.position];
                            const d = measuredPaths[node.id];
                            if (!d) return null;
                            const isActive = activeNodeId === node.id;
                            return (
                                <g key={node.id}>
                                    <path
                                        d={d}
                                        fill="none"
                                        stroke={node.strokeColor}
                                        strokeWidth={isActive ? 2.8 : 1.6}
                                        strokeOpacity={isActive ? 0.9 : 0.25}
                                        className="transition-all duration-300"
                                    />
                                    {animated && (
                                        <>
                                            <circle
                                                r={isActive ? 9 : 6}
                                                fill={node.strokeColor}
                                                opacity={isActive ? 0.35 : 0.18}
                                            >
                                                <animateMotion
                                                    dur={isActive ? "1.1s" : cfg.dur}
                                                    repeatCount="indefinite"
                                                    path={d}
                                                />
                                            </circle>
                                            <circle
                                                r={isActive ? 4 : 3}
                                                fill={node.strokeColor}
                                            >
                                                <animateMotion
                                                    dur={isActive ? "1.1s" : cfg.dur}
                                                    repeatCount="indefinite"
                                                    path={d}
                                                />
                                            </circle>
                                        </>
                                    )}
                                </g>
                            );
                        })}
                    </svg>

                    {/* Counter-Rotating Orbital Core Hub */}
                    <div className="relative z-20 flex flex-col items-center justify-center">
                        <div ref={hubRef} className="relative flex items-center justify-center">
                            <div
                                className="absolute w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full border border-dashed border-primary/25 pointer-events-none"
                                style={animated ? { animation: "orbit-spin 22s linear infinite" } : undefined}
                            >
                                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
                            </div>
                            <div
                                className="absolute w-24 h-24 sm:w-32 sm:h-32 lg:w-38 lg:h-38 rounded-full border border-dotted border-primary/45 pointer-events-none"
                                style={animated ? { animation: "orbit-spin-rev 14s linear infinite" } : undefined}
                            >
                                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary/80" />
                            </div>

                            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 rounded-full bg-background/90 text-card-foreground border-2 border-primary/50 flex flex-col items-center justify-center p-2 sm:p-2.5 lg:p-3 relative backdrop-blur-xl shadow-[0_0_30px_color-mix(in_oklab,var(--primary)_16%,transparent)] transition-all duration-300">
                                <div className="p-1.5 sm:p-2 rounded-xl lg:rounded-2xl border border-primary/30 bg-primary/10 text-primary transition-transform duration-300">
                                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Glassmorphic Service Nodes */}
                    <div className="absolute inset-0 w-full h-full pointer-events-none">
                        {nodes.map((node) => {
                            const isActive = activeNodeId === node.id;

                            let posClasses = "";
                            switch (node.position) {
                                case "top-left":
                                    posClasses = "top-[20%] -translate-y-1/2 left-1 sm:left-4 lg:left-10";
                                    break;
                                case "bottom-left":
                                    posClasses = "top-[80%] -translate-y-1/2 left-1 sm:left-4 lg:left-10";
                                    break;
                                case "top-right":
                                    posClasses = "top-[18%] -translate-y-1/2 right-1 sm:right-4 lg:right-10";
                                    break;
                                case "middle-right":
                                    posClasses = "top-1/2 -translate-y-1/2 right-1 sm:right-4 lg:right-10";
                                    break;
                                case "bottom-right":
                                    posClasses = "top-[82%] -translate-y-1/2 right-1 sm:right-4 lg:right-10";
                                    break;
                            }

                            return (
                                <button
                                    key={node.id}
                                    ref={(el) => {
                                        nodeRefs.current[node.id] = el;
                                    }}
                                    type="button"
                                    title={`${node.title} — ${node.subtitle}`}
                                    aria-label={node.title}
                                    onMouseEnter={() => interactive && setHoveredNodeId(node.id)}
                                    onMouseLeave={() => interactive && setHoveredNodeId(null)}
                                    onClick={() =>
                                        interactive &&
                                        setSelectedNodeId((prev) => (prev === node.id ? null : node.id))
                                    }
                                    className={cn(
                                        "absolute pointer-events-auto w-auto lg:w-52 rounded-2xl border bg-background/80 backdrop-blur-xl p-2 sm:p-2.5 lg:p-3.5 text-left transition-all duration-300 flex items-center gap-3 cursor-pointer hover:scale-[1.03]",
                                        getNodeBorderStyle(node.color, isActive),
                                        isActive && "shadow-[0_0_24px_color-mix(in_oklab,var(--primary)_18%,transparent)]",
                                        posClasses
                                    )}
                                >
                                    <div className="p-2 lg:p-2.5 rounded-xl bg-muted/70 border border-border/60 shrink-0">
                                        {node.icon}
                                    </div>

                                    <div className="hidden lg:block min-w-0 flex-1 space-y-1">
                                        <div className="flex items-center justify-between gap-1.5">
                                            <h3 className="text-xs lg:text-sm font-semibold text-foreground leading-tight truncate">
                                                {node.title}
                                            </h3>
                                        </div>
                                        <p className="text-[9px] lg:text-[10px] font-mono font-medium text-muted-foreground truncate">
                                            {node.subtitle}
                                        </p>
                                        <span
                                            className={cn(
                                                "inline-flex px-2 py-0.5 rounded-full text-[8px] lg:text-[9px] font-mono font-semibold tracking-wider border uppercase items-center gap-1",
                                                getBadgeStyle(node.badgeVariant)
                                            )}
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                                            <span>{node.badgeText}</span>
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    const leftNodes = nodes.filter(
        (n) => n.position === "top-left" || n.position === "bottom-left"
    );
        const rightNodes = nodes.filter(
            (n) =>
                n.position === "top-right" ||
                n.position === "middle-right" ||
                n.position === "bottom-right"
        );
        const activeNode = nodes.find((n) => n.id === activeNodeId);

        return (
            <div
                className={cn(
                    "w-full rounded-3xl bg-card/95 backdrop-blur-2xl p-4 sm:p-6 md:p-8 shadow-none relative overflow-hidden select-none",
                    className
                )}
            >
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
                        @keyframes pulse-beam {
                            0% { stroke-dashoffset: 180; }
                            100% { stroke-dashoffset: 0; }
                        }
                        @keyframes pulse-ripple {
                            0% { transform: scale(0.88); opacity: 0.55; }
                            100% { transform: scale(1.65); opacity: 0; }
                        }
                        @keyframes pulse-line-orb {
                            0% { left: 0%; opacity: 0; }
                            15% { opacity: 1; }
                            85% { opacity: 1; }
                            100% { left: 100%; opacity: 0; }
                        }
                        `,
                    }}
                />

                {/* Header — Curved left border on all screens + Style 2 animated orb divider */}
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-4 pb-5 sm:pb-6">
                    <div className="space-y-1.5 border-l-[3px] border-primary rounded-l-2xl pl-4 py-0.5">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
                            {headerTitle}
                        </h2>
                        <p className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-widest text-muted-foreground min-h-[2.6em] sm:min-h-0 flex items-center">
                            {activeNode
                                ? `INSPECTING · ${activeNode.title.toUpperCase()} — ${activeNode.badgeText}`
                                : headerSubtitle}
                        </p>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-2">
                        <div className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono font-semibold bg-primary/10 text-primary border border-primary/25 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span>{statusBadge}</span>
                        </div>
                        <div className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono font-semibold bg-muted/60 text-muted-foreground border border-border/60 flex items-center gap-1.5">
                            <Wifi className="w-3.5 h-3.5 text-primary" />
                            <span>{bandwidthBadge}</span>
                        </div>
                    </div>

                    {/* Animated Pulse-Node Divider (Style 2: Left-to-right gradient with gliding glowing orb) */}
                    <div aria-hidden className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-primary/50 via-border/60 to-transparent">
                        <span
                            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]"
                            style={animated ? { animation: "pulse-line-orb 3.6s ease-in-out infinite" } : undefined}
                        />
                    </div>
                </div>

                {/* ALL DEVICES: 3-Column Clean Pipeline + Ripple Core + Curved Bezier Energy Pulses */}
                <div ref={canvasRef} className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4 md:gap-6 relative w-full min-h-[340px] sm:min-h-[420px] md:min-h-[470px] my-4">
                    {/* Smooth Cubic Bezier Energy Pulses */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none z-0"
                    >
                        {nodes.map((node, i) => {
                            const d = measuredPaths[node.id];
                            if (!d) return null;
                            const isActive = activeNodeId === node.id;
                            const isDimmed = activeNodeId !== null && !isActive;
                            return (
                                <g key={node.id}>
                                    <path
                                        d={d}
                                        fill="none"
                                        stroke={node.strokeColor}
                                        strokeWidth={isActive ? 2.5 : 1.5}
                                        strokeOpacity={isDimmed ? 0.08 : isActive ? 0.55 : 0.2}
                                        className="transition-all duration-300"
                                    />
                                    {animated && !isDimmed && (
                                        <path
                                            d={d}
                                            fill="none"
                                            stroke={node.strokeColor}
                                            strokeWidth={isActive ? 3.5 : 2.5}
                                            strokeLinecap="round"
                                            strokeDasharray="24 156"
                                            strokeOpacity={isActive ? 1 : 0.75}
                                            style={{
                                                animation: `pulse-beam ${isActive ? "1.2s" : `${2.2 + i * 0.25}s`} linear infinite`,
                                            }}
                                        />
                                    )}
                                </g>
                            );
                        })}
                    </svg>

                    {/* Left Column Services */}
                    <div className="relative z-10 flex flex-col justify-center gap-12 sm:gap-14 md:gap-16 pl-1 sm:pl-2 lg:pl-6 md:max-w-[260px]">
                        {leftNodes.map((node) => {
                            const isActive = activeNodeId === node.id;
                            const isDimmed = activeNodeId !== null && !isActive;
                            return (
                                <button
                                    key={node.id}
                                    ref={(el) => {
                                        nodeRefs.current[node.id] = el;
                                    }}
                                    type="button"
                                    title={`${node.title} — ${node.subtitle}`}
                                    aria-label={node.title}
                                    onMouseEnter={() => interactive && setHoveredNodeId(node.id)}
                                    onMouseLeave={() => interactive && setHoveredNodeId(null)}
                                    onClick={() =>
                                        interactive &&
                                        setSelectedNodeId((prev) => (prev === node.id ? null : node.id))
                                    }
                                    className={cn(
                                        "w-fit md:w-full rounded-2xl border bg-background/85 backdrop-blur-xl p-2 sm:p-2.5 md:p-3.5 text-left transition-all duration-300 flex items-center gap-3 cursor-pointer hover:translate-x-1",
                                        getNodeBorderStyle(node.color, isActive),
                                        isDimmed && "opacity-45"
                                    )}
                                >
                                    <div className="p-2 md:p-2.5 rounded-xl bg-muted/60 border border-border/50 shrink-0">
                                        {node.icon}
                                    </div>
                                    <div className="hidden md:block min-w-0 flex-1 space-y-0.5">
                                        <div className="flex items-center justify-between gap-2">
                                            <h3 className="text-xs lg:text-sm font-semibold text-foreground truncate">
                                                {node.title}
                                            </h3>
                                            <span
                                                className={cn(
                                                    "px-1.5 py-0.5 rounded-full text-[8px] font-mono font-semibold border uppercase shrink-0",
                                                    getBadgeStyle(node.badgeVariant)
                                                )}
                                            >
                                                {node.badgeText}
                                            </span>
                                        </div>
                                        <p className="text-[9px] lg:text-[10px] font-mono font-medium text-muted-foreground truncate">
                                            {node.subtitle}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Center Pulse Core Hub */}
                    <div className="relative z-20 flex flex-col items-center justify-center px-1 sm:px-3 md:px-4">
                        <div ref={hubRef} className="relative flex items-center justify-center">
                            {animated && (
                                <>
                                    <span
                                        className="absolute w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border border-primary/40 pointer-events-none"
                                        style={{ animation: "pulse-ripple 3s ease-out infinite" }}
                                    />
                                    <span
                                        className="absolute w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border border-primary/40 pointer-events-none"
                                        style={{ animation: "pulse-ripple 3s ease-out 1.5s infinite" }}
                                    />
                                </>
                            )}
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-2xl sm:rounded-3xl bg-background/95 border-2 border-primary/50 flex flex-col items-center justify-center p-2 md:p-3 backdrop-blur-xl transition-all duration-300">
                                <div className="p-1.5 sm:p-2 md:p-2.5 rounded-xl md:rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-2 md:mt-3 space-y-0.5">
                            <h4 className="text-[10px] sm:text-[11px] lg:text-xs font-bold tracking-wider uppercase text-primary">
                                {centerTitle}
                            </h4>
                            <p className="text-[8px] sm:text-[9px] lg:text-[10px] font-mono font-semibold text-muted-foreground">
                                {centerSubtitle}
                            </p>
                        </div>
                    </div>

                    {/* Right Column Services */}
                    <div className="relative z-10 flex flex-col items-end justify-center gap-5 sm:gap-6 pr-1 sm:pr-2 lg:pr-6 md:max-w-[260px] justify-self-end w-full">
                        {rightNodes.map((node) => {
                            const isActive = activeNodeId === node.id;
                            const isDimmed = activeNodeId !== null && !isActive;
                            return (
                                <button
                                    key={node.id}
                                    ref={(el) => {
                                        nodeRefs.current[node.id] = el;
                                    }}
                                    type="button"
                                    title={`${node.title} — ${node.subtitle}`}
                                    aria-label={node.title}
                                    onMouseEnter={() => interactive && setHoveredNodeId(node.id)}
                                    onMouseLeave={() => interactive && setHoveredNodeId(null)}
                                    onClick={() =>
                                        interactive &&
                                        setSelectedNodeId((prev) => (prev === node.id ? null : node.id))
                                    }
                                    className={cn(
                                        "w-fit md:w-full rounded-2xl border bg-background/85 backdrop-blur-xl p-2 sm:p-2.5 md:p-3.5 text-left transition-all duration-300 flex items-center gap-3 cursor-pointer hover:-translate-x-1",
                                        getNodeBorderStyle(node.color, isActive),
                                        isDimmed && "opacity-45"
                                    )}
                                >
                                    <div className="p-2 md:p-2.5 rounded-xl bg-muted/60 border border-border/50 shrink-0">
                                        {node.icon}
                                    </div>
                                    <div className="hidden md:block min-w-0 flex-1 space-y-0.5">
                                        <div className="flex items-center justify-between gap-2">
                                            <h3 className="text-xs lg:text-sm font-semibold text-foreground truncate">
                                                {node.title}
                                            </h3>
                                            <span
                                                className={cn(
                                                    "px-1.5 py-0.5 rounded-full text-[8px] font-mono font-semibold border uppercase shrink-0",
                                                    getBadgeStyle(node.badgeVariant)
                                                )}
                                            >
                                                {node.badgeText}
                                            </span>
                                        </div>
                                        <p className="text-[9px] lg:text-[10px] font-mono font-medium text-muted-foreground truncate">
                                            {node.subtitle}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Telemetry Metrics */}
                <div className="relative z-10 pt-4 sm:pt-6 border-t border-border/40 grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center sm:justify-between gap-2 sm:gap-3">
                    {metrics.map((metric, idx) => (
                        <div
                            key={metric.id}
                            className={cn(
                                "px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl border border-border/60 bg-background/70 backdrop-blur-md flex items-center gap-2 text-xs hover:border-border cursor-pointer transition-all hover:scale-[1.02]",
                                idx === metrics.length - 1 && metrics.length % 2 === 1 && "col-span-2 sm:col-span-1"
                            )}
                        >
                            <div className="p-1 rounded-md bg-muted/80 border border-border/50">
                                {metric.icon}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[8px] sm:text-[9px] font-mono font-semibold text-muted-foreground tracking-wider">
                                    {metric.label}
                                </span>
                                <span className={cn("text-[11px] sm:text-xs font-mono font-semibold", metric.color)}>
                                    {metric.value}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
}

export default InfrastructureTopology;
