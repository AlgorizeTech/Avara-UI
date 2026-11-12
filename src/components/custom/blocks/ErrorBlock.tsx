"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  Copy,
  Check,
  ServerCrash,
  Radio,
  LifeBuoy,
  RefreshCw,
  Cpu,
  ShieldAlert,
  Terminal,
  ChevronDown,
  ChevronUp,
  Laptop,
  Globe,
  Database,
  CheckCircle2,
  XCircle,
  Activity,
  Layers,
  Sparkles,
  Gauge,
  Binary,
} from "lucide-react";

export interface ServiceStatusItem {
  name: string;
  status: "operational" | "degraded" | "outage";
  latency?: string;
}

export type ErrorVariant =
  | "terminal"
  | "modern-animated"
  | "cosmic-pulse"
  | "service-pipeline"
  | "pipeline"
  | "quantum-glitch"
  | "quantum-hud"
  | "prismatic-glass"
  | "prismatic"
  | "aurora-prism";

export interface ErrorSectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Visual layout variant:
   * - "terminal": Cyberpunk diagnostic enclosure with technical readout.
   * - "modern-animated" / "cosmic-pulse": Ultra-modern animated orbital radar with live health micro-monitors.
   * - "service-pipeline" / "pipeline": Interactive animated service topology & network flow showing failure point.
   * - "quantum-glitch" / "quantum-hud": High-tech chromatic glitch 2-column bento HUD with system vitals and memory hex dump.
   * - "prismatic-glass" / "aurora-prism": Ultra-clean glassmorphic floating crystal with spinning rainbow refraction halo.
   * Defaults to "terminal".
   */
  variant?: ErrorVariant;
  /** Primary error code or status, e.g. "500", "503", "CLIENT_EXCEPTION" */
  errorCode?: string;
  /** Main heading */
  title?: string;
  /** Explanatory message */
  description?: string;
  /** Technical error stack or raw message to show in expandable viewer */
  errorDetails?: string;
  /** Digest/incident ID */
  errorId?: string;
  /** Micro-service telemetry status items (used in modern-animated variant) */
  services?: ServiceStatusItem[];
  /** Callback triggered when user clicks 'Try Again' / 'Reload' */
  onRetry?: () => void;
  /** Callback triggered when user clicks 'Back to Home' */
  onHome?: () => void;
  /** Callback for contacting support */
  onSupport?: () => void;
}

const MODERN_STYLES = `
@keyframes err-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
@keyframes err-radar-sweep {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes err-spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes err-spin-reverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}
@keyframes err-pulse-halo {
  0%, 100% { opacity: 0.35; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.08); }
}
@keyframes err-beacon-ping {
  0% { transform: scale(0.9); opacity: 0.8; }
  70%, 100% { transform: scale(1.6); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .err-anim-float,
  .err-anim-sweep,
  .err-anim-spin,
  .err-anim-spin-reverse,
  .err-anim-halo,
  .err-anim-ping {
    animation: none !important;
  }
}
`;

const PIPELINE_STYLES = `
@keyframes pipe-pulse-halo {
  0%, 100% { opacity: 0.35; transform: scale(1); }
  50% { opacity: 0.75; transform: scale(1.12); }
}
@keyframes pipe-beam-flow {
  0% { stroke-dashoffset: 48; }
  100% { stroke-dashoffset: 0; }
}
@keyframes pipe-ping-alert {
  0% { transform: scale(0.95); opacity: 0.9; }
  75%, 100% { transform: scale(1.7); opacity: 0; }
}
@keyframes pipe-heartbeat-glow {
  0%, 100% { filter: drop-shadow(0 0 2px rgba(239, 68, 68, 0.4)); }
  50% { filter: drop-shadow(0 0 8px rgba(239, 68, 68, 0.9)); }
}
@media (prefers-reduced-motion: reduce) {
  .pipe-anim-halo,
  .pipe-anim-beam,
  .pipe-anim-ping,
  .pipe-anim-heartbeat {
    animation: none !important;
  }
}
`;

const GLITCH_STYLES = `
@keyframes glitch-anim-1 {
  0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
  20% { clip-path: inset(20% 0 60% 0); transform: translate(-2px, 2px); }
  40% { clip-path: inset(40% 0 30% 0); transform: translate(2px, -2px); }
  60% { clip-path: inset(80% 0 5% 0); transform: translate(-1px, 1px); }
  80% { clip-path: inset(10% 0 70% 0); transform: translate(1px, -1px); }
}
@keyframes glitch-anim-2 {
  0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
  25% { clip-path: inset(70% 0 10% 0); transform: translate(2px, 1px); }
  50% { clip-path: inset(15% 0 55% 0); transform: translate(-2px, -1px); }
  75% { clip-path: inset(50% 0 35% 0); transform: translate(1px, 2px); }
}
@keyframes vitals-stripes {
  from { background-position: 0 0; }
  to { background-position: 30px 0; }
}
@media (prefers-reduced-motion: reduce) {
  .glitch-layer-1,
  .glitch-layer-2,
  .vitals-striped-bar {
    animation: none !important;
  }
}
`;

const PRISMATIC_STYLES = `
@keyframes prism-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes prism-float {
  0%, 100% { transform: translateY(0px) rotate(45deg); }
  50% { transform: translateY(-10px) rotate(45deg); }
}
@keyframes prism-orbit {
  from { transform: rotate(0deg) translateX(70px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(70px) rotate(-360deg); }
}
@keyframes prism-aurora-glow {
  0%, 100% { opacity: 0.35; transform: scale(1) translate(-50%, -50%); }
  50% { opacity: 0.7; transform: scale(1.15) translate(-48%, -52%); }
}
@media (prefers-reduced-motion: reduce) {
  .prism-anim-spin,
  .prism-anim-float,
  .prism-anim-orbit,
  .prism-anim-glow {
    animation: none !important;
  }
}
`;

export function ErrorSection({
  variant = "terminal",
  errorCode = "500",
  title,
  description,
  errorDetails,
  errorId = "ERR_0x9481FA",
  services,
  onRetry,
  onHome,
  onSupport,
  className,
  ...props
}: ErrorSectionProps) {
  const [copied, setCopied] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [pipelineTab, setPipelineTab] = useState<"trace" | "remediation">("trace");

  const isModern = variant === "modern-animated" || variant === "cosmic-pulse";
  const isPipeline = variant === "service-pipeline" || variant === "pipeline";
  const isGlitch = variant === "quantum-glitch" || variant === "quantum-hud";
  const isPrismatic =
    variant === "prismatic-glass" ||
    variant === "prismatic" ||
    variant === "aurora-prism";

  const resolvedTitle =
    title ||
    (isPrismatic
      ? "UNRESOLVED SYSTEM STATE"
      : isGlitch
      ? "KERNEL EXECUTION ANOMALY"
      : isPipeline
      ? "SERVICE PIPELINE INTERRUPTED"
      : isModern
      ? "UNEXPECTED SYSTEM ANOMALY"
      : "SYSTEM RUNTIME EXCEPTION");

  const resolvedDescription =
    description ||
    (isPrismatic
      ? "A transient disruption fractured the runtime pipeline. Cryptographic memory buffers remain sealed and preserved for triage."
      : isGlitch
      ? "High-priority execution thread encountered an unrecoverable kernel panic. Isolation protocols engaged to preserve system integrity."
      : isPipeline
      ? "A critical downstream node failed during request execution. The pipeline halted safely to isolate fault propagation."
      : isModern
      ? "An unhandled runtime disruption interrupted the telemetry pipeline. Critical memory states were safely captured for telemetry diagnostics."
      : "Critical process halted due to an unhandled kernel exception. Memory buffers preserved for telemetry diagnostics.");

  const sampleDetails =
    errorDetails ||
    `[KernelRuntimeException]: Minified React error #301
  at renderWithHooksAgain (react-dom.production.min.js:4133:61)
  at updateFunctionComponent (react-dom.production.min.js:5523:21)
  at performUnitOfWork (react-dom.production.min.js:6892:12)
  thread_context: 0x8849bf | origin: avara.ui/runtime
  incident_digest: "${errorId}"`;

  const copyIncidentId = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(`${errorId}\n${sampleDetails}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRetry = () => {
    setRetrying(true);
    if (onRetry) {
      onRetry();
    }
    setTimeout(() => setRetrying(false), 1200);
  };

  const defaultServices: ServiceStatusItem[] = [
    { name: "API Gateway", status: "operational", latency: "24ms" },
    { name: "Worker Pool", status: "degraded", latency: "820ms" },
    { name: "Database Shard", status: "outage", latency: "TIMEOUT" },
  ];
  const resolvedServices = services || defaultServices;

  // -------------------------------------------------------------------------
  // VARIANT: Prismatic Aurora Glass ("prismatic-glass" / "aurora-prism")
  // -------------------------------------------------------------------------
  if (isPrismatic) {
    const defaultPrismServices = [
      { name: "Edge Mesh", status: "operational" as const, latency: "12ms" },
      { name: "Auth Cluster", status: "degraded" as const, latency: "420ms" },
      { name: "State Store", status: "outage" as const, latency: "TIMEOUT" },
    ];
    const resolvedPrismServices = services || defaultPrismServices;

    return (
      <section
        className={cn(
          "relative w-full py-12 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-background text-foreground overflow-hidden flex flex-col items-center justify-center min-h-[660px] transition-colors duration-300 font-sans select-none",
          className
        )}
        {...props}
      >
        <style>{PRISMATIC_STYLES}</style>

        {/* Ambient multi-color liquid aurora mesh backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] max-w-full h-[440px] bg-gradient-to-tr from-rose-500/15 via-red-500/10 to-violet-500/15 blur-[140px] rounded-full prism-anim-glow"
          style={{ animation: "prism-aurora-glow 6s ease-in-out infinite" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.045] bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_75%)]"
        />

        <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center space-y-6 sm:space-y-8">
          {/* Header Iridescent Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-mono tracking-wider font-semibold shadow-xs backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
            </span>
            <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            <span>PRISMATIC RUNTIME INTERRUPT // 0x500</span>
          </div>

          {/* Central Prismatic Glass Shard Centerpiece */}
          <div className="relative flex items-center justify-center w-52 h-52 sm:w-60 sm:h-60 my-2 select-none">
            {/* Spinning Rainbow Refraction Halo Ring */}
            <div
              className="absolute inset-4 rounded-full opacity-60 dark:opacity-80 blur-xl prism-anim-spin pointer-events-none"
              style={{
                background:
                  "conic-gradient(from 0deg, #ef4444, #f43f5e, #a855f7, #3b82f6, #06b6d4, #ef4444)",
                animation: "prism-spin 16s linear infinite",
              }}
            />

            {/* Orbiting Glass Satellite Bead */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none prism-anim-orbit"
              style={{ animation: "prism-orbit 8s linear infinite" }}
            >
              <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_12px_#f43f5e]" />
            </div>

            {/* Levitating Diamond Glass Gem */}
            <div
              className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-card/60 dark:bg-card/40 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-[0_12px_40px_rgba(244,63,94,0.22)] dark:shadow-[0_12px_45px_rgba(239,68,68,0.3)] flex items-center justify-center prism-anim-float"
              style={{ animation: "prism-float 5s ease-in-out infinite" }}
            >
              {/* Upright Center Icon Counter-Rotated (-45deg) */}
              <div className="-rotate-45 relative flex items-center justify-center">
                <ShieldAlert className="w-12 h-12 text-rose-500 dark:text-rose-400 drop-shadow-[0_0_15px_rgba(244,63,94,0.6)]" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
                </span>
              </div>
            </div>
          </div>

          {/* Typography: Stylized High-Fashion Gradient Code & Titles */}
          <div className="space-y-2 max-w-lg">
            <div className="font-mono font-black text-4xl sm:text-5xl md:text-6xl tracking-tight bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent drop-shadow-xs">
              {errorCode}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground uppercase font-sans">
              {resolvedTitle}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
              {resolvedDescription}
            </p>
          </div>

          {/* Live Micro-Mesh Service Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full max-w-lg mx-auto">
            {resolvedPrismServices.map((svc, i) => {
              const isOk = svc.status === "operational";
              const isDegraded = svc.status === "degraded";
              return (
                <div
                  key={i}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-border/80 bg-card/65 backdrop-blur-xl transition-all hover:scale-[1.02] shadow-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={cn(
                        "w-2 h-2 rounded-full shrink-0",
                        isOk && "bg-emerald-500 shadow-[0_0_8px_#10b981]",
                        isDegraded && "bg-amber-500 animate-pulse shadow-[0_0_8px_#f59e0b]",
                        !isOk && !isDegraded && "bg-rose-500 animate-ping shadow-[0_0_8px_#f43f5e]"
                      )}
                    />
                    <span className="text-[12px] font-medium text-foreground truncate">
                      {svc.name}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "text-[10px] font-mono uppercase font-semibold shrink-0 ml-2 px-1.5 py-0.5 rounded",
                      isOk && "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
                      isDegraded && "text-amber-600 dark:text-amber-400 bg-amber-500/10",
                      !isOk && !isDegraded && "text-rose-600 dark:text-rose-400 bg-rose-500/10"
                    )}
                  >
                    {svc.latency ?? svc.status}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Frosted Glass Diagnostic Drawer with Copy Trace Button */}
          <div className="w-full max-w-lg mx-auto rounded-xl border border-border/80 bg-card/70 backdrop-blur-xl overflow-hidden transition-all shadow-xs text-left">
            <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-border/60 bg-muted/40 text-xs">
              <button
                type="button"
                onClick={() => setDetailsOpen(!detailsOpen)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none font-mono"
              >
                <Terminal className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span className="truncate">
                  Prism Trace: <strong className="text-foreground">{errorId}</strong>
                </span>
                {detailsOpen ? (
                  <ChevronUp className="w-3.5 h-3.5 shrink-0" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                )}
              </button>

              <button
                type="button"
                onClick={copyIncidentId}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-background hover:bg-muted border border-border transition-colors cursor-pointer shrink-0 ml-2"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-muted-foreground" />
                    <span>Copy Hash</span>
                  </>
                )}
              </button>
            </div>

            {detailsOpen && (
              <div className="p-2.5 sm:p-3">
                <div className="p-3 sm:p-3.5 rounded-lg border border-neutral-200/90 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-950/80 text-rose-600 dark:text-rose-400 text-[11px] font-mono overflow-x-auto max-h-44 overflow-y-auto leading-relaxed whitespace-pre-wrap select-all shadow-xs selection:bg-rose-500/20">
                  {sampleDetails}
                </div>
              </div>
            )}
          </div>

          {/* Interactive Floating Action Pills Hub */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mx-auto pt-2">
            <button
              type="button"
              onClick={handleRetry}
              disabled={retrying}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 rounded-xl font-medium text-xs sm:text-sm bg-gradient-to-r from-red-600 via-rose-600 to-rose-500 hover:opacity-95 text-white shadow-lg shadow-rose-500/25 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={cn("w-4 h-4", retrying && "animate-spin")} />
              {retrying ? "Re-crystallizing State..." : "Re-crystallize State"}
            </button>
            <button
              type="button"
              onClick={onHome}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border transition-all active:scale-95 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              Return to Safety
            </button>
          </div>

          {onSupport && (
            <button
              type="button"
              onClick={onSupport}
              className="text-xs text-muted-foreground hover:text-rose-500 dark:hover:text-rose-400 inline-flex items-center gap-1.5 transition-colors cursor-pointer mt-1"
            >
              <LifeBuoy className="w-3.5 h-3.5" /> Consult Core Architecture Team &rarr;
            </button>
          )}
        </div>
      </section>
    );
  }

  // -------------------------------------------------------------------------
  // VARIANT: Quantum Glitch Bento HUD ("quantum-glitch" / "quantum-hud")
  // -------------------------------------------------------------------------
  if (isGlitch) {
    return (
      <section
        className={cn(
          "relative w-full py-12 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-background text-foreground overflow-hidden flex flex-col items-center justify-center min-h-[660px] transition-colors duration-300 font-sans select-none",
          className
        )}
        {...props}
      >
        <style>{GLITCH_STYLES}</style>

        {/* Ambient perspective wireframe & multi-layer glowing spotlights */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.05] bg-[linear-gradient(to_right,#ef4444_1px,transparent_1px),linear-gradient(to_bottom,#ef4444_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[680px] max-w-full h-[400px] bg-red-500/12 dark:bg-red-600/15 blur-[140px] rounded-full"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[520px] max-w-full h-[360px] bg-cyan-500/8 dark:bg-cyan-500/10 blur-[130px] rounded-full"
        />

        {/* Main 2-Column Bento Container */}
        <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Hero Status, Chromatic Glitch Code, Copy & Actions */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 sm:space-y-6">
            {/* Telemetry Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-mono tracking-wider font-semibold shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
              <span>SUBSYSTEM PANIC // HALT_0xFA</span>
            </div>

            {/* Giant Chromatic Aberration Glitch Typography */}
            <div className="relative inline-block select-none my-1">
              <span className="font-mono font-black text-6xl sm:text-7xl md:text-8xl tracking-tight text-foreground drop-shadow-xs">
                {errorCode}
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 font-mono font-black text-6xl sm:text-7xl md:text-8xl tracking-tight text-red-500 opacity-75 pointer-events-none glitch-layer-1"
                style={{
                  animation: "glitch-anim-1 3s infinite linear alternate-reverse",
                }}
              >
                {errorCode}
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 font-mono font-black text-6xl sm:text-7xl md:text-8xl tracking-tight text-cyan-500 opacity-65 pointer-events-none glitch-layer-2"
                style={{
                  animation: "glitch-anim-2 2.4s infinite linear alternate-reverse",
                }}
              >
                {errorCode}
              </span>
            </div>

            {/* Heading & Explanatory Copy */}
            <div className="space-y-2.5 max-w-md">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground uppercase font-sans">
                {resolvedTitle}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {resolvedDescription}
              </p>
            </div>

            {/* System Metadata Tags */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-[10px] font-mono">
              <span className="px-2.5 py-1 rounded-md bg-muted/70 text-muted-foreground border border-border/70">
                REGION: US-EAST-1
              </span>
              <span className="px-2.5 py-1 rounded-md bg-muted/70 text-muted-foreground border border-border/70">
                KERNEL: V8_ISOLATE
              </span>
              <span className="px-2.5 py-1 rounded-md bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/25 font-bold">
                SEV: 0 (CRITICAL)
              </span>
            </div>

            {/* Primary & Secondary Action Hub */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-sm pt-2">
              <button
                type="button"
                onClick={handleRetry}
                disabled={retrying}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/25 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={cn("w-4 h-4", retrying && "animate-spin")} />
                {retrying ? "Executing Cold Boot..." : "Initiate Cold Restart"}
              </button>
              <button
                type="button"
                onClick={onHome}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border transition-all active:scale-95 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                Return to Safety
              </button>
            </div>

            {onSupport && (
              <button
                type="button"
                onClick={onSupport}
                className="text-xs text-muted-foreground hover:text-red-500 dark:hover:text-red-400 inline-flex items-center gap-1.5 transition-colors cursor-pointer pt-1"
              >
                <LifeBuoy className="w-3.5 h-3.5" /> Emergency DevOps Hotline &rarr;
              </button>
            )}
          </div>

          {/* Right Column: Live Vitals & Memory Hex Dump Bento */}
          <div className="lg:col-span-7 flex flex-col space-y-4 w-full">
            {/* Card 1: System Vitals Telemetry */}
            <div className="p-4 sm:p-5 rounded-2xl border border-border/80 bg-card/75 backdrop-blur-xl shadow-xs space-y-3.5 text-left">
              <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-border/60">
                <span className="flex items-center gap-2 font-bold uppercase text-foreground">
                  <Gauge className="w-4 h-4 text-red-500 shrink-0" />
                  Telemetry Vitals at Crash
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-400 font-semibold border border-red-500/20">
                  CRITICAL SPIKE
                </span>
              </div>

              {/* Progress 1: Heap Allocation */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-[11px]">
                  <span className="text-muted-foreground">Heap Allocation</span>
                  <span className="text-red-600 dark:text-red-400 font-bold">
                    105% (8.40 GB / 8.00 GB)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 via-red-500 to-red-600 rounded-full vitals-striped-bar"
                    style={{
                      width: "100%",
                      backgroundImage:
                        "linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)",
                      backgroundSize: "16px 16px",
                      animation: "vitals-stripes 1.2s linear infinite",
                    }}
                  />
                </div>
              </div>

              {/* Progress 2: Active Threads */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-[11px]">
                  <span className="text-muted-foreground">Active Coroutines</span>
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">
                    4,096 (THREAD_LOCK)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "88%" }} />
                </div>
              </div>

              {/* Progress 3: IO Throughput */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-[11px]">
                  <span className="text-muted-foreground">Ingress Network IO</span>
                  <span className="text-red-600 dark:text-red-400 font-semibold">
                    0 KB/s (HALTED)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: "8%" }} />
                </div>
              </div>
            </div>

            {/* Card 2: Interactive Memory Hex Fault Dump */}
            <div className="p-4 sm:p-5 rounded-2xl border border-border/80 bg-card/75 backdrop-blur-xl shadow-xs space-y-3 text-left">
              <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-border/60">
                <span className="flex items-center gap-2 font-bold uppercase text-foreground">
                  <Binary className="w-4 h-4 text-primary shrink-0" />
                  Memory Segment Fault Dump
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">
                  BASE: 0x004F_DEAD
                </span>
              </div>

              <div className="p-3 rounded-lg border border-neutral-200/90 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-950/80 font-mono text-[10px] sm:text-[11px] leading-relaxed text-muted-foreground select-all overflow-x-auto space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span>0x0040: 7F 45 4C 46 02 01 01 00</span>
                  <span className="text-muted-foreground/60 hidden sm:inline">.ELF....</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span>0x0050: 00 00 00 00 00 00 00 00</span>
                  <span className="text-muted-foreground/60 hidden sm:inline">........</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-red-600 dark:text-red-400 font-bold bg-red-500/10 px-1.5 py-0.5 rounded">
                  <span>0x0060: FF 1B C4 DE 00 00 00 00</span>
                  <span className="text-red-500">!PANIC!</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span>0x0070: 08 00 00 00 00 00 00 00</span>
                  <span className="text-muted-foreground/60 hidden sm:inline">........</span>
                </div>
              </div>
            </div>

            {/* Card 3: Expandable Diagnostic Drawer with Copy Trace Button */}
            <div className="rounded-2xl border border-border/80 bg-card/75 backdrop-blur-xl shadow-xs overflow-hidden text-left">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/60 bg-muted/30 text-xs">
                <button
                  type="button"
                  onClick={() => setDetailsOpen(!detailsOpen)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer font-mono"
                >
                  <Terminal className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>
                    Incident: <strong className="text-foreground">{errorId}</strong>
                  </span>
                  {detailsOpen ? (
                    <ChevronUp className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={copyIncidentId}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-background hover:bg-muted border border-border transition-colors cursor-pointer text-muted-foreground hover:text-foreground shrink-0 ml-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Hash</span>
                    </>
                  )}
                </button>
              </div>

              {detailsOpen && (
                <div className="p-2.5 sm:p-3">
                  <div className="p-3 sm:p-3.5 rounded-lg border border-neutral-200/90 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-950/80 text-red-600 dark:text-red-400 text-[11px] font-mono overflow-x-auto max-h-44 overflow-y-auto leading-relaxed whitespace-pre-wrap select-all shadow-xs selection:bg-red-500/20">
                    {sampleDetails}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // -------------------------------------------------------------------------
  // VARIANT: Service Pipeline Topology ("service-pipeline" / "pipeline")
  // -------------------------------------------------------------------------
  if (isPipeline) {
    const pipelineSteps = [
      {
        id: "client",
        name: "Client Device",
        subtext: "Browser Handshake",
        status: "passed" as const,
        icon: Laptop,
        metric: "HTTP 200 OK",
        time: "14ms",
      },
      {
        id: "edge",
        name: "Edge CDN",
        subtext: "Anycast Route",
        status: "passed" as const,
        icon: Globe,
        metric: "TLS 1.3 Valid",
        time: "32ms",
      },
      {
        id: "gateway",
        name: "App Gateway",
        subtext: "Origin Service",
        status: "failed" as const,
        icon: ServerCrash,
        metric: `HTTP ${errorCode} Fault`,
        time: "TIMEOUT",
      },
      {
        id: "data",
        name: "Data Layer",
        subtext: "Primary Cluster",
        status: "blocked" as const,
        icon: Database,
        metric: "Unreachable",
        time: "--",
      },
    ];

    return (
      <section
        className={cn(
          "relative w-full py-12 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-background text-foreground overflow-hidden flex flex-col items-center justify-center min-h-[660px] transition-colors duration-300 font-sans select-none",
          className
        )}
        {...props}
      >
        <style>{PIPELINE_STYLES}</style>

        {/* Ambient subtle cyber-dot grid background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.05] bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]"
        />

        {/* Dual animated ambient aura spotlights */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] max-w-full h-[380px] bg-red-500/12 dark:bg-red-600/15 blur-[130px] rounded-full pipe-anim-halo"
          style={{ animation: "pipe-pulse-halo 5s ease-in-out infinite" }}
        />

        {/* Giant Ghost Watermark Error Code */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-6 sm:top-10 left-1/2 -translate-x-1/2 font-mono font-black text-[120px] sm:text-[180px] md:text-[230px] leading-none tracking-tighter text-foreground opacity-[0.03] dark:opacity-[0.04] select-none"
        >
          {errorCode}
        </div>

        <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center space-y-6 sm:space-y-8">
          {/* Header Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-mono tracking-wider font-semibold shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <Activity className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span>DOWNSTREAM TIMEOUT • NODE 03 BREACH</span>
          </div>

          {/* Heading & Explanatory Copy */}
          <div className="space-y-2 max-w-xl text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground uppercase font-sans">
              {resolvedTitle}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
              {resolvedDescription}
            </p>
          </div>

          {/* Interactive Topology Pipeline Stage Card */}
          <div className="w-full rounded-2xl border border-border/80 bg-card/75 backdrop-blur-xl p-4 sm:p-7 shadow-xs relative overflow-hidden transition-all text-left">
            {/* Pipeline Header Bar */}
            <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-border/60 text-xs font-mono">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Layers className="w-4 h-4 text-primary shrink-0" />
                <span className="font-semibold text-foreground tracking-wide uppercase">
                  Service Execution Topology
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 font-semibold border border-red-500/20 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                FAILURE DETECTED
              </div>
            </div>

            {/* Nodes Row with Connected Signal Beams */}
            <div className="py-6 sm:py-8 relative">
              {/* Desktop Connecting Flow Track Behind Nodes */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute top-[52px] left-12 right-12 h-1 pointer-events-none select-none z-0"
              >
                {/* SVG Animated Beams */}
                <svg className="w-full h-4 overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="pipe-fail-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                  {/* Segment 1: Client -> Edge (Healthy Green) */}
                  <line
                    x1="6%"
                    y1="2"
                    x2="38%"
                    y2="2"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeDasharray="6 6"
                    className="pipe-anim-beam"
                    style={{ animation: "pipe-beam-flow 1.5s linear infinite" }}
                  />
                  {/* Segment 2: Edge -> Gateway (Degrading to Red) */}
                  <line
                    x1="38%"
                    y1="2"
                    x2="68%"
                    y2="2"
                    stroke="url(#pipe-fail-grad)"
                    strokeWidth="2.5"
                    strokeDasharray="6 6"
                    className="pipe-anim-beam"
                    style={{ animation: "pipe-beam-flow 1.2s linear infinite" }}
                  />
                  {/* Segment 3: Gateway -> Data (Broken Gray) */}
                  <line
                    x1="68%"
                    y1="2"
                    x2="94%"
                    y2="2"
                    stroke="currentColor"
                    className="text-border/80"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                </svg>
              </div>

              {/* Responsive Nodes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-2 relative z-10">
                {pipelineSteps.map((step) => {
                  const Icon = step.icon;
                  const isPassed = step.status === "passed";
                  const isFailed = step.status === "failed";
                  const isBlocked = step.status === "blocked";

                  return (
                    <div
                      key={step.id}
                      className={cn(
                        "relative flex flex-col items-center text-center p-3 sm:p-2.5 rounded-xl transition-all duration-200 border",
                        isPassed &&
                          "border-emerald-500/25 bg-emerald-500/[0.03] dark:bg-emerald-950/20",
                        isFailed &&
                          "border-red-500/50 bg-red-500/[0.08] dark:bg-red-950/40 shadow-[0_0_25px_rgba(239,68,68,0.25)]",
                        isBlocked && "border-border/60 bg-muted/20 opacity-60"
                      )}
                    >
                      {/* Node Icon Capsule */}
                      <div className="relative mb-2.5">
                        {/* Ping Ripple on Failed Node */}
                        {isFailed && (
                          <div
                            aria-hidden="true"
                            className="absolute -inset-2 rounded-full border-2 border-red-500/60 pipe-anim-ping pointer-events-none"
                            style={{
                              animation: "pipe-ping-alert 2.2s cubic-bezier(0,0,0.2,1) infinite",
                            }}
                          />
                        )}

                        <div
                          className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-xs border",
                            isPassed &&
                              "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]",
                            isFailed &&
                              "bg-red-500 text-white border-red-600 shadow-[0_0_20px_rgba(239,68,68,0.5)] animate-pulse",
                            isBlocked &&
                              "bg-muted text-muted-foreground border-border/80"
                          )}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        {/* Status Mini Indicator Bead */}
                        <div className="absolute -bottom-1 -right-1">
                          {isPassed && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-background" />
                          )}
                          {isFailed && (
                            <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 fill-background" />
                          )}
                          {isBlocked && (
                            <div className="w-3.5 h-3.5 rounded-full bg-muted-foreground/40 border-2 border-background" />
                          )}
                        </div>
                      </div>

                      {/* Label & Details */}
                      <span className="text-xs font-semibold text-foreground tracking-tight">
                        {step.name}
                      </span>
                      <span className="text-[11px] text-muted-foreground mt-0.5 truncate">
                        {step.subtext}
                      </span>

                      {/* Status Metric Pill */}
                      <div
                        className={cn(
                          "mt-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase",
                          isPassed &&
                            "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20",
                          isFailed &&
                            "text-white bg-red-600 shadow-[0_0_10px_rgba(239,68,68,0.4)]",
                          isBlocked &&
                            "text-muted-foreground bg-muted/60 border border-border/50"
                        )}
                      >
                        {step.metric}
                      </div>

                      {/* Time */}
                      <span className="text-[9px] font-mono text-muted-foreground/75 mt-1">
                        latency: {step.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Heartbeat & Incident Digest Strip */}
            <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
              {/* Animated Flatline Waveform */}
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-red-600 dark:text-red-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  HEARTBEAT:
                </span>
                <svg
                  viewBox="0 0 140 24"
                  className="w-28 h-5 text-red-500 stroke-current fill-none stroke-[2] pipe-anim-heartbeat"
                  style={{ animation: "pipe-heartbeat-glow 2s ease-in-out infinite" }}
                >
                  <path d="M0,12 L30,12 L36,4 L42,20 L48,12 L56,12 L140,12" />
                </svg>
                <span className="text-[10px] text-red-500/80 font-bold uppercase">
                  LOST (0 BPS)
                </span>
              </div>

              {/* Hash & Copy */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-muted-foreground">
                  INCIDENT: <strong className="text-foreground">{errorId}</strong>
                </span>
                <button
                  type="button"
                  onClick={copyIncidentId}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-background hover:bg-muted border border-border transition-colors cursor-pointer text-muted-foreground hover:text-foreground"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Diagnostic Inspection & Remediation Drawer with Tabs */}
          <div className="w-full max-w-2xl mx-auto rounded-xl border border-border/80 bg-card/70 backdrop-blur-md overflow-hidden transition-all shadow-xs text-left">
            {/* Drawer Tabs Header */}
            <div className="flex items-center justify-between px-3.5 py-2 border-b border-border/60 bg-muted/40 text-xs">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setPipelineTab("trace")}
                  className={cn(
                    "px-3 py-1 rounded-md text-xs font-mono font-medium transition-all cursor-pointer",
                    pipelineTab === "trace"
                      ? "bg-background text-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Terminal className="w-3 h-3 inline-block mr-1.5 text-red-500" />
                  Stack Diagnostic
                </button>
                <button
                  type="button"
                  onClick={() => setPipelineTab("remediation")}
                  className={cn(
                    "px-3 py-1 rounded-md text-xs font-mono font-medium transition-all cursor-pointer",
                    pipelineTab === "remediation"
                      ? "bg-background text-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Sparkles className="w-3 h-3 inline-block mr-1.5 text-amber-500" />
                  Remediation Steps
                </button>
              </div>

              <span className="text-[11px] font-mono text-muted-foreground hidden sm:inline">
                Triage Channel: #eng-telemetry
              </span>
            </div>

            {/* Tab 1: Mode-Adaptive Trace Box */}
            {pipelineTab === "trace" && (
              <div className="p-2.5 sm:p-3">
                <div className="p-3 sm:p-3.5 rounded-lg border border-neutral-200/90 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-950/80 text-red-600 dark:text-red-400 text-[11px] font-mono overflow-x-auto max-h-44 overflow-y-auto leading-relaxed whitespace-pre-wrap select-all shadow-xs selection:bg-red-500/20">
                  {sampleDetails}
                </div>
              </div>
            )}

            {/* Tab 2: Remediation Action Plan */}
            {pipelineTab === "remediation" && (
              <div className="p-3 sm:p-4 space-y-2.5 text-xs text-muted-foreground">
                <div className="flex items-start gap-2.5 p-2 rounded-lg bg-muted/30 border border-border/50">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">
                    1
                  </span>
                  <div>
                    <strong className="text-foreground">Re-run Pipeline Handshake:</strong> Click Attempt
                    Auto-Recovery below to trigger an automatic retry with exponential backoff.
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-2 rounded-lg bg-muted/30 border border-border/50">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">
                    2
                  </span>
                  <div>
                    <strong className="text-foreground">Check Downstream Health:</strong> Verify if
                    database replicas and worker clusters are responsive under current traffic.
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-2 rounded-lg bg-muted/30 border border-border/50">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">
                    3
                  </span>
                  <div>
                    <strong className="text-foreground">Escalate Incident:</strong> Provide Incident ID{" "}
                    <code className="text-red-600 dark:text-red-400 font-mono font-bold">
                      {errorId}
                    </code>{" "}
                    to the DevOps on-call team for container restart.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons Hub */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mx-auto pt-2">
            <button
              type="button"
              onClick={handleRetry}
              disabled={retrying}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 rounded-xl font-medium text-xs sm:text-sm bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/25 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={cn("w-4 h-4", retrying && "animate-spin")} />
              {retrying ? "Re-executing Pipeline..." : "Attempt Auto-Recovery"}
            </button>
            <button
              type="button"
              onClick={onHome}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border transition-all active:scale-95 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              Return to Safety
            </button>
          </div>

          {onSupport && (
            <button
              type="button"
              onClick={onSupport}
              className="text-xs text-muted-foreground hover:text-red-500 dark:hover:text-red-400 inline-flex items-center gap-1.5 transition-colors cursor-pointer mt-1"
            >
              <LifeBuoy className="w-3.5 h-3.5" /> Escalate to Infrastructure Engineering &rarr;
            </button>
          )}
        </div>
      </section>
    );
  }

  // -------------------------------------------------------------------------
  // VARIANT: Modern Animated Orbital Radar ("modern-animated" / "cosmic-pulse")
  // -------------------------------------------------------------------------
  if (isModern) {
    return (
      <section
        className={cn(
          "relative w-full py-12 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-background text-foreground overflow-hidden flex flex-col items-center justify-center min-h-[620px] transition-colors duration-300 font-sans select-none",
          className
        )}
        {...props}
      >
        <style>{MODERN_STYLES}</style>

        {/* Ambient background cyber grid & multi-layer glowing spotlights */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.05] bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] max-w-full h-[400px] bg-red-500/12 dark:bg-red-600/15 blur-[130px] rounded-full"
        />

        <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center space-y-6 sm:space-y-8">

          {/* Center Orbital Animated Radar Core */}
          <div
            className="relative flex items-center justify-center w-52 h-52 sm:w-60 sm:h-60 err-anim-float my-2 select-none"
            style={{ animation: "err-float 6s ease-in-out infinite" }}
          >
            {/* Ambient glowing radial halo */}
            <div
              className="absolute inset-0 rounded-full bg-red-500/20 dark:bg-red-600/25 blur-3xl err-anim-halo pointer-events-none"
              style={{ animation: "err-pulse-halo 4s ease-in-out infinite" }}
            />

            {/* Outer Dashed Orbit with Satellite bead */}
            <div
              className="absolute inset-0 rounded-full border border-dashed border-red-500/30 dark:border-red-400/30 err-anim-spin"
              style={{ animation: "err-spin-slow 24s linear infinite" }}
            >
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-500 shadow-[0_0_12px_#ef4444]" />
            </div>

            {/* Middle Orbit with Cardinal crosshairs */}
            <div
              className="absolute inset-4 rounded-full border border-red-500/20 dark:border-red-500/25 err-anim-spin-reverse"
              style={{ animation: "err-spin-reverse 16s linear infinite" }}
            >
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1 bg-red-500/60" />
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1 bg-red-500/60" />
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1.5 bg-red-500/60" />
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1.5 bg-red-500/60" />
            </div>

            {/* Conic Radar Scanner Sweep */}
            <div
              className="absolute inset-6 rounded-full opacity-60 err-anim-sweep pointer-events-none"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(239,68,68,0.3) 360deg)",
                animation: "err-radar-sweep 4s linear infinite",
              }}
            />

            {/* Pulsing beacon waves */}
            <div
              className="absolute inset-10 rounded-full border border-red-500/40 err-anim-ping pointer-events-none"
              style={{ animation: "err-beacon-ping 3s cubic-bezier(0, 0, 0.2, 1) infinite" }}
            />

            {/* Center Frosted Glass Capsule */}
            <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-card/80 backdrop-blur-xl border border-red-500/40 shadow-[0_0_35px_rgba(239,68,68,0.25)] dark:shadow-[0_0_50px_rgba(239,68,68,0.35)] flex flex-col items-center justify-center">
              <div className="relative">
                <ShieldAlert className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 dark:text-red-400 drop-shadow-[0_0_12px_rgba(239,68,68,0.5)]" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                </span>
              </div>
            </div>

          </div>

          {/* Heading & Explanatory Copy */}
          <div className="space-y-2.5 max-w-lg">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground uppercase font-sans">
              {resolvedTitle}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
              {resolvedDescription}
            </p>
          </div>

          {/* Micro-Service Live Health Monitors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full max-w-lg mx-auto">
            {resolvedServices.map((svc, i) => {
              const isOk = svc.status === "operational";
              const isDegraded = svc.status === "degraded";
              return (
                <div
                  key={i}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-border/80 bg-card/60 backdrop-blur-md transition-all hover:border-foreground/20 hover:scale-[1.02] shadow-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={cn(
                        "w-2 h-2 rounded-full shrink-0",
                        isOk && "bg-emerald-500 shadow-[0_0_8px_#10b981]",
                        isDegraded && "bg-amber-500 animate-pulse shadow-[0_0_8px_#f59e0b]",
                        !isOk && !isDegraded && "bg-red-500 animate-ping shadow-[0_0_8px_#ef4444]"
                      )}
                    />
                    <span className="text-[12px] font-medium text-foreground truncate">
                      {svc.name}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "text-[10px] font-mono uppercase font-semibold shrink-0 ml-2 px-1.5 py-0.5 rounded",
                      isOk && "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
                      isDegraded && "text-amber-600 dark:text-amber-400 bg-amber-500/10",
                      !isOk && !isDegraded && "text-red-600 dark:text-red-400 bg-red-500/10"
                    )}
                  >
                    {svc.latency ?? svc.status}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Expandable Diagnostic Drawer with Copy Trace Button */}
          <div className="w-full max-w-lg mx-auto rounded-xl border border-border/80 bg-card/70 backdrop-blur-md overflow-hidden transition-all shadow-xs text-left">
            <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-border/60 bg-muted/40 text-xs">
              <button
                type="button"
                onClick={() => setDetailsOpen(!detailsOpen)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none font-mono"
              >
                <Terminal className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span className="truncate">
                  Trace: <strong className="text-foreground">{errorId}</strong>
                </span>
                {detailsOpen ? (
                  <ChevronUp className="w-3.5 h-3.5 shrink-0" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                )}
              </button>

              <button
                type="button"
                onClick={copyIncidentId}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-background hover:bg-muted border border-border transition-colors cursor-pointer shrink-0 ml-2"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-muted-foreground" />
                    <span>Copy Hash</span>
                  </>
                )}
              </button>
            </div>

            {detailsOpen && (
              <div className="p-2.5 sm:p-3 pt-2">
                <div className="p-3 sm:p-3.5 rounded-lg border border-neutral-200/90 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-950/80 text-red-600 dark:text-red-400 text-[11px] font-mono overflow-x-auto max-h-44 overflow-y-auto leading-relaxed whitespace-pre-wrap select-all shadow-xs selection:bg-red-500/20">
                  {sampleDetails}
                </div>
              </div>
            )}
          </div>

          {/* Interactive Actions Hub */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mx-auto pt-2">
            <button
              type="button"
              onClick={handleRetry}
              disabled={retrying}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 rounded-xl font-medium text-xs sm:text-sm bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/25 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={cn("w-4 h-4", retrying && "animate-spin")} />
              {retrying ? "Re-initiating Pipeline..." : "Attempt Auto-Recovery"}
            </button>
            <button
              type="button"
              onClick={onHome}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border transition-all active:scale-95 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              Return to Safety
            </button>
          </div>

          {onSupport && (
            <button
              type="button"
              onClick={onSupport}
              className="text-xs text-muted-foreground hover:text-red-500 dark:hover:text-red-400 inline-flex items-center gap-1.5 transition-colors cursor-pointer mt-1"
            >
              <LifeBuoy className="w-3.5 h-3.5" /> Escalate to Infrastructure Engineering &rarr;
            </button>
          )}
        </div>
      </section>
    );
  }

  // -------------------------------------------------------------------------
  // VARIANT: Cyberpunk Diagnostic Terminal ("terminal", default)
  // -------------------------------------------------------------------------
  return (
    <section
      className={cn(
        "relative w-full py-10 sm:py-20 md:py-24 px-3 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-[#07090e] text-neutral-900 dark:text-neutral-100 overflow-hidden flex items-center justify-center min-h-[560px] sm:min-h-[600px] transition-colors duration-300 font-sans",
        className
      )}
      {...props}
    >
      {/* Ambient background cyber grid & red spotlight (adaptive for Light & Dark) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.035] bg-[linear-gradient(to_right,#ef4444_1px,transparent_1px),linear-gradient(to_bottom,#ef4444_1px,transparent_1px)] bg-[size:32px_32px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] max-w-full h-[420px] bg-red-500/10 dark:bg-red-600/12 blur-[140px] rounded-full"
      />

      {/* Outer Terminal Enclosure */}
      <div className="relative z-10 w-full max-w-4xl mx-auto rounded-2xl sm:rounded-3xl border border-red-500/20 dark:border-red-500/25 bg-white/95 dark:bg-[#0b0e14]/90 backdrop-blur-2xl shadow-[0_20px_70px_-15px_rgba(239,68,68,0.15)] dark:shadow-[0_0_80px_-20px_rgba(239,68,68,0.3)] overflow-hidden transition-all duration-300">
        {/* Top Window Bar */}
        <div className="flex items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3.5 bg-neutral-100/80 dark:bg-black/70 border-b border-red-500/15 dark:border-red-500/20 select-none gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/90 shadow-[0_0_8px_#ef4444] inline-block animate-pulse" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="h-3.5 sm:h-4 w-[1px] bg-red-500/20 mx-0.5 sm:mx-1 flex-shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-mono font-medium text-neutral-600 dark:text-neutral-400 tracking-wider flex items-center gap-1 sm:gap-1.5 uppercase truncate">
              <Cpu className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500 dark:text-red-400 flex-shrink-0" />
              <span className="hidden sm:inline">telemetry::</span>diagnostic_monitor
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <span className="px-2 sm:px-2.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono uppercase bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-500/40 flex items-center gap-1 sm:gap-1.5 font-semibold">
              <Radio className="w-2.5 h-2.5 sm:w-3 sm:h-3 animate-ping" />
              STATUS: {errorCode}
            </span>
          </div>
        </div>

        {/* Section Content */}
        <div className="p-4 sm:p-8 lg:p-12 space-y-5 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
            {/* Holographic Glowing Crash Icon */}
            <div className="relative flex-shrink-0 w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-500/15 to-red-100/50 dark:from-red-500/20 dark:to-red-950/40 border border-red-500/30 dark:border-red-500/40 flex items-center justify-center text-red-600 dark:text-red-400 shadow-[0_0_35px_-5px_rgba(239,68,68,0.25)] dark:shadow-[0_0_35px_-5px_rgba(239,68,68,0.35)]">
              <ServerCrash className="w-7 h-7 sm:w-10 sm:h-10 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-red-500 rounded-full border-2 border-white dark:border-black animate-ping" />
              <div className="absolute -bottom-1 -left-1 sm:-bottom-1.5 sm:-left-1.5 px-1 sm:px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-mono font-bold bg-white dark:bg-black text-red-600 dark:text-red-400 border border-red-300 dark:border-red-500/40 shadow-xs">
                HALT
              </div>
            </div>

            <div className="space-y-1.5 sm:space-y-2 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 text-[11px] sm:text-xs font-mono text-red-600 dark:text-red-400/90 font-medium">
                <span className="font-bold uppercase tracking-wider">FATAL_SIGNAL</span>
                <span className="text-neutral-400">/</span>
                <span className="text-neutral-500 dark:text-neutral-400 truncate">
                  INCIDENT ID: {errorId}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-neutral-900 dark:text-white font-mono uppercase break-words">
                {resolvedTitle}
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans max-w-2xl">
                {resolvedDescription}
              </p>
            </div>
          </div>

          {/* Interactive Stacktrace Console — Modern Clean Terminal Box with Subtle Border */}
          <div className="rounded-xl sm:rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-950/70 overflow-hidden shadow-sm transition-all duration-200">
            {/* Box Header Bar */}
            <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3 border-b border-neutral-200/80 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/40 select-none gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 truncate">
                  <span className="hidden sm:inline">RAW SYSTEM </span>DIAGNOSTIC TRACE
                </span>
              </div>

              <button
                type="button"
                onClick={copyIncidentId}
                className="hover:text-neutral-950 dark:hover:text-white text-neutral-500 dark:text-neutral-400 flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs transition-colors px-2 sm:px-2.5 py-1 rounded-md bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/80 hover:border-neutral-300 dark:hover:border-neutral-600 shadow-xs cursor-pointer flex-shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>
                      Copy<span className="hidden sm:inline"> Trace</span>
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Trace Code Content with subtle inner border and light background */}
            <div className="p-2 sm:p-4">
              <pre className="text-red-600 dark:text-red-400 leading-relaxed text-[10px] sm:text-xs p-3 sm:p-5 rounded-lg sm:rounded-xl bg-white dark:bg-black/50 border border-neutral-200/70 dark:border-neutral-800/80 font-mono overflow-x-auto whitespace-pre-wrap selection:bg-red-500/20 max-h-56 sm:max-h-72 overflow-y-auto">
                {sampleDetails}
              </pre>
            </div>
          </div>

          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pt-1 sm:pt-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleRetry}
                disabled={retrying}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium text-xs sm:text-sm bg-red-600 hover:bg-red-500 text-white transition-all shadow-[0_0_25px_rgba(239,68,68,0.35)] active:scale-95 cursor-pointer disabled:opacity-50 w-full sm:w-auto"
              >
                <RefreshCw
                  className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4", retrying && "animate-spin")}
                />
                {retrying ? "Rebooting Cluster..." : "Reboot System"}
              </button>
              <button
                type="button"
                onClick={onHome}
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-medium text-xs sm:text-sm bg-neutral-100 hover:bg-neutral-200 text-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-800 transition-all active:scale-95 cursor-pointer w-full sm:w-auto"
              >
                <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Return Home
              </button>
            </div>

            {onSupport && (
              <button
                type="button"
                onClick={onSupport}
                className="text-xs text-neutral-500 hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-400 flex items-center justify-center sm:justify-start gap-1.5 transition-colors cursor-pointer py-1 sm:py-0 w-full sm:w-auto"
              >
                <LifeBuoy className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Contact Escalation Team
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ErrorSection;
