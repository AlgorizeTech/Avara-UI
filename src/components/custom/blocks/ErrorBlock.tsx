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
} from "lucide-react";

export interface ServiceStatusItem {
  name: string;
  status: "operational" | "degraded" | "outage";
  latency?: string;
}

export interface ErrorSectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Visual layout variant:
   * - "terminal": Cyberpunk diagnostic enclosure with technical readout.
   * - "modern-animated" / "cosmic-pulse": Ultra-modern animated orbital radar with live health micro-monitors.
   * Defaults to "terminal".
   */
  variant?: "terminal" | "modern-animated" | "cosmic-pulse";
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

  const isModern = variant === "modern-animated" || variant === "cosmic-pulse";

  const resolvedTitle =
    title ||
    (isModern ? "UNEXPECTED SYSTEM ANOMALY" : "SYSTEM RUNTIME EXCEPTION");

  const resolvedDescription =
    description ||
    (isModern
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
