"use client";

import React, { useState } from "react";
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

export interface InfrastructureTopologyProps {
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
    headerTitle = "Infrastructure Topology",
    headerSubtitle = "LIVE DATA FLOW · 6 SERVICES · 5 ROUTES",
    statusBadge = "ALL SYSTEMS",
    bandwidthBadge = "10 GBPS",
    centerTitle = "NEURAL MESH",
    centerSubtitle = "CORE ROUTER · V4.2",
    centerColor = "cyan",
    nodes = DEFAULT_NODES,
    metrics = DEFAULT_METRICS,
    animated = true,
    interactive = true,
    className,
}: InfrastructureTopologyProps) {
    const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

    const getCenterColorStyles = (color: string) => {
        switch (color) {
            case "emerald":
                return {
                    border: "border-emerald-500/60 dark:border-emerald-400/80",
                    ringOuter: "border-emerald-500/20",
                    ringInner: "border-emerald-500/10",
                    iconBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
                    text: "text-emerald-700 dark:text-emerald-400",
                };
            case "indigo":
                return {
                    border: "border-indigo-500/60 dark:border-indigo-400/80",
                    ringOuter: "border-indigo-500/20",
                    ringInner: "border-indigo-500/10",
                    iconBg: "bg-indigo-500/10 border-indigo-500/30 text-indigo-600 dark:text-indigo-400",
                    text: "text-indigo-700 dark:text-indigo-400",
                };
            case "rose":
                return {
                    border: "border-rose-500/60 dark:border-rose-400/80",
                    ringOuter: "border-rose-500/20",
                    ringInner: "border-rose-500/10",
                    iconBg: "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400",
                    text: "text-rose-700 dark:text-rose-400",
                };
            case "purple":
                return {
                    border: "border-purple-500/60 dark:border-purple-400/80",
                    ringOuter: "border-purple-500/20",
                    ringInner: "border-purple-500/10",
                    iconBg: "bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400",
                    text: "text-purple-700 dark:text-purple-400",
                };
            case "cyan":
            default:
                return {
                    border: "border-cyan-500/60 dark:border-cyan-400/80",
                    ringOuter: "border-cyan-500/20",
                    ringInner: "border-cyan-500/10",
                    iconBg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400",
                    text: "text-cyan-700 dark:text-cyan-400",
                };
        }
    };

    const centerTheme = getCenterColorStyles(centerColor);

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

    return (
        <div
            className={cn(
                "w-full max-w-5xl mx-auto rounded-3xl border border-border/80 bg-background/95 backdrop-blur-2xl p-4 sm:p-6 md:p-8 shadow-none relative overflow-hidden select-none",
                "bg-[radial-gradient(var(--border)_1.2px,transparent_1.2px)] [background-size:20px_20px]",
                className
            )}
        >
            {/* `dash` drives the animate-[dash_…] beams below. Plain <style> rather
                than styled-jsx so the component compiles outside Next.js, and kept
                inline so the keyframes survive a copy into another project. */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `@keyframes dash { to { stroke-dashoffset: -1000; } }`,
                }}
            />

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-border/40">
                <div className="space-y-1">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
                        {headerTitle}
                    </h2>
                    <p className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-widest text-muted-foreground">
                        {headerSubtitle}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <div className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5 cursor-pointer hover:bg-emerald-500/20 transition-colors">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{statusBadge}</span>
                    </div>

                    <div className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono font-semibold bg-muted/80 text-muted-foreground border border-border/60 flex items-center gap-1.5 cursor-pointer hover:bg-muted transition-colors">
                        <Wifi className="w-3.5 h-3.5" />
                        <span>{bandwidthBadge}</span>
                    </div>
                </div>
            </div>

            {/* DESKTOP & TABLET VIEW (md and up): 2D Graph Canvas with SVG Lines */}
            <div className="hidden md:flex relative w-full min-h-[480px] lg:min-h-[500px] items-center justify-center my-4">
                {/* SVG Data Flow Connection Beams Overlay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <defs>
                        <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.2" />
                        </linearGradient>
                        <linearGradient id="gradient-rose" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#fb7185" stopOpacity="0.2" />
                        </linearGradient>
                        <linearGradient id="gradient-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.2" />
                        </linearGradient>
                        <linearGradient id="gradient-amber" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.2" />
                        </linearGradient>
                        <linearGradient id="gradient-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#34d399" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>

                    <line
                        x1="22%"
                        y1="22%"
                        x2="50%"
                        y2="50%"
                        stroke="url(#gradient-blue)"
                        strokeWidth={hoveredNodeId === "auth" ? 4 : 3}
                        strokeDasharray="8 6"
                        className={cn("transition-all duration-300", animated && "animate-[dash_20s_linear_infinite]")}
                    />

                    <line
                        x1="22%"
                        y1="78%"
                        x2="50%"
                        y2="50%"
                        stroke="url(#gradient-rose)"
                        strokeWidth={hoveredNodeId === "waf" ? 4 : 3}
                        strokeDasharray="8 6"
                        className={cn("transition-all duration-300", animated && "animate-[dash_22s_linear_infinite]")}
                    />

                    <line
                        x1="78%"
                        y1="20%"
                        x2="50%"
                        y2="50%"
                        stroke="url(#gradient-purple)"
                        strokeWidth={hoveredNodeId === "db" ? 4 : 3}
                        strokeDasharray="8 6"
                        className={cn("transition-all duration-300", animated && "animate-[dash_18s_linear_infinite]")}
                    />

                    <line
                        x1="78%"
                        y1="50%"
                        x2="50%"
                        y2="50%"
                        stroke="url(#gradient-amber)"
                        strokeWidth={hoveredNodeId === "aws" ? 4 : 3}
                        strokeDasharray="8 6"
                        className={cn("transition-all duration-300", animated && "animate-[dash_15s_linear_infinite]")}
                    />

                    <line
                        x1="78%"
                        y1="80%"
                        x2="50%"
                        y2="50%"
                        stroke="url(#gradient-emerald)"
                        strokeWidth={hoveredNodeId === "billing" ? 4 : 3}
                        strokeDasharray="8 6"
                        className={cn("transition-all duration-300", animated && "animate-[dash_25s_linear_infinite]")}
                    />
                </svg>

                {/* Central Neural Mesh Hub Node - Mode Adaptive Colors, NO ZOOM */}
                <div className="relative z-20 flex flex-col items-center justify-center cursor-pointer">
                    <div className="relative flex items-center justify-center">
                        <div className={cn("absolute w-32 h-32 lg:w-36 lg:h-36 rounded-full border animate-ping opacity-40 pointer-events-none", centerTheme.ringOuter)} />
                        <div className={cn("absolute w-40 h-40 lg:w-44 lg:h-44 rounded-full border animate-pulse pointer-events-none", centerTheme.ringInner)} />

                        <div className={cn("w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-card text-card-foreground border-2 shadow-none flex flex-col items-center justify-center p-2.5 lg:p-3 relative cursor-pointer backdrop-blur-xl transition-colors", centerTheme.border)}>
                            <div className={cn("p-1.5 lg:p-2 rounded-xl border mb-1 transition-colors", centerTheme.iconBg)}>
                                <Zap className="w-5 h-5 lg:w-6 lg:h-6 animate-pulse" />
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-2.5 space-y-0.5">
                        <h4 className={cn("text-[11px] lg:text-xs font-bold tracking-wider uppercase", centerTheme.text)}>
                            {centerTitle}
                        </h4>
                        <p className="text-[9px] lg:text-[10px] font-mono font-semibold text-muted-foreground">
                            {centerSubtitle}
                        </p>
                    </div>
                </div>

                {/* Peripheral Service Card Nodes - Slightly Smaller on md: Screen */}
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                    {nodes.map((node) => {
                        const isHovered = hoveredNodeId === node.id;

                        let posClasses = "";
                        switch (node.position) {
                            case "top-left":
                                posClasses = "top-4 left-4 lg:left-12";
                                break;
                            case "bottom-left":
                                posClasses = "bottom-4 left-4 lg:left-12";
                                break;
                            case "top-right":
                                posClasses = "top-2 right-4 lg:right-12";
                                break;
                            case "middle-right":
                                posClasses = "top-1/2 -translate-y-1/2 right-4 lg:right-12";
                                break;
                            case "bottom-right":
                                posClasses = "bottom-2 right-4 lg:right-12";
                                break;
                        }

                        return (
                            <div
                                key={node.id}
                                onMouseEnter={() => interactive && setHoveredNodeId(node.id)}
                                onMouseLeave={() => interactive && setHoveredNodeId(null)}
                                className={cn(
                                    "absolute pointer-events-auto w-40 md:w-44 lg:w-48 rounded-2xl border bg-card/95 backdrop-blur-xl p-3 md:p-3.5 lg:p-4 shadow-none transition-all duration-300 flex flex-col items-center text-center gap-1.5 md:gap-2 cursor-pointer hover:scale-[1.03]",
                                    getNodeBorderStyle(node.color, isHovered),
                                    posClasses
                                )}
                            >
                                <div className="p-2 md:p-2.5 rounded-xl bg-muted/60 border border-border/50">
                                    {node.icon}
                                </div>

                                <div className="space-y-0.5 min-w-0 w-full">
                                    <h3 className="text-xs md:text-sm font-semibold text-foreground leading-tight truncate">
                                        {node.title}
                                    </h3>
                                    <p className="text-[9px] md:text-[10px] font-mono font-medium text-muted-foreground truncate">
                                        {node.subtitle}
                                    </p>
                                </div>

                                <span
                                    className={cn(
                                        "px-2 md:px-2.5 py-0.5 rounded-full text-[8px] md:text-[9px] font-mono font-semibold tracking-wider border uppercase flex items-center gap-1 cursor-pointer",
                                        getBadgeStyle(node.badgeVariant)
                                    )}
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                    <span>{node.badgeText}</span>
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* MOBILE & SMALL SCREEN VIEW (< md): Clean Grid Layout */}
            <div className="md:hidden py-6 space-y-6">
                {/* Central Hub Node Mobile */}
                <div className="flex flex-col items-center justify-center text-center py-2 cursor-pointer">
                    <div className="relative flex items-center justify-center">
                        <div className={cn("absolute w-28 h-28 rounded-full border animate-ping opacity-40 pointer-events-none", centerTheme.ringOuter)} />
                        <div className={cn("w-20 h-20 rounded-full bg-card text-card-foreground border-2 flex flex-col items-center justify-center p-2 backdrop-blur-xl", centerTheme.border)}>
                            <Zap className={cn("w-5 h-5 animate-pulse", centerTheme.text)} />
                        </div>
                    </div>
                    <h4 className={cn("text-xs font-bold tracking-wider uppercase mt-2", centerTheme.text)}>
                        {centerTitle}
                    </h4>
                    <p className="text-[9px] font-mono font-semibold text-muted-foreground">
                        {centerSubtitle}
                    </p>
                </div>

                {/* 2-Column Responsive Service Grid */}
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                    {nodes.map((node) => (
                        <div
                            key={node.id}
                            className={cn(
                                "rounded-2xl border bg-card/95 p-3.5 flex items-center gap-3 transition-all cursor-pointer hover:scale-[1.02]",
                                getNodeBorderStyle(node.color, false)
                            )}
                        >
                            <div className="p-2 rounded-xl bg-muted/60 border border-border/50 shrink-0">
                                {node.icon}
                            </div>

                            <div className="flex-1 min-w-0 space-y-0.5">
                                <div className="flex items-center justify-between gap-1">
                                    <h3 className="text-xs font-semibold text-foreground truncate">
                                        {node.title}
                                    </h3>
                                    <span
                                        className={cn(
                                            "px-1.5 py-0.2 rounded text-[8px] font-mono font-semibold border uppercase shrink-0",
                                            getBadgeStyle(node.badgeVariant)
                                        )}
                                    >
                                        {node.badgeText}
                                    </span>
                                </div>
                                <p className="text-[9px] font-mono font-medium text-muted-foreground truncate">
                                    {node.subtitle}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Telemetry Metrics Bar */}
            <div className="pt-4 sm:pt-6 border-t border-border/40 flex flex-wrap items-center justify-center sm:justify-between gap-2 sm:gap-3">
                {metrics.map((metric) => (
                    <div
                        key={metric.id}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl border border-border/60 bg-muted/40 backdrop-blur-md flex items-center gap-2 text-xs shadow-none hover:border-border cursor-pointer transition-all hover:scale-[1.02]"
                    >
                        <div className="p-1 rounded-md bg-background/80 border border-border/40">
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
