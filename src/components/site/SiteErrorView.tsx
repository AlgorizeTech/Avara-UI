"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ServerCrash,
  Radio,
  Cpu,
  RefreshCw,
  Home,
  Copy,
  Check,
  LifeBuoy,
} from "lucide-react";

export interface SiteErrorViewProps {
  error: Error & { digest?: string };
  reset: () => void;
  className?: string;
}

export function SiteErrorView({ error, reset, className }: SiteErrorViewProps) {
  const [copied, setCopied] = useState(false);
  const [retrying, setRetrying] = useState(false);

  const incidentId = error?.digest || `ERR_0x${Math.random().toString(16).substring(2, 8).toUpperCase()}`;
  const errorMessage = error?.message || "An unhandled runtime exception halted execution.";
  const errorDetails = error?.stack || `${error?.name || "RuntimeError"}: ${errorMessage}\n  digest: ${incidentId}`;

  const copyIncidentTrace = () => {
    if (typeof navigator !== "undefined") {
      const fullReport = `Incident Digest: ${incidentId}\nURL: ${window.location.href}\nTimestamp: ${new Date().toISOString()}\n\nDiagnostics:\n${errorDetails}`;
      navigator.clipboard.writeText(fullReport);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRetry = () => {
    setRetrying(true);
    try {
      reset();
    } finally {
      setTimeout(() => setRetrying(false), 1200);
    }
  };

  return (
    <section
      className={cn(
        "relative w-full min-h-screen py-10 sm:py-20 md:py-24 px-3 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-[#07090e] text-neutral-900 dark:text-neutral-100 overflow-hidden flex items-center justify-center transition-colors duration-300 font-sans",
        className
      )}
    >
      {/* Ambient background cyber grid & red spotlight */}
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
              STATUS: 500
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
                <span className="text-neutral-500 dark:text-neutral-400 truncate">INCIDENT ID: {incidentId}</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-neutral-900 dark:text-white font-mono uppercase break-words">
                SYSTEM RUNTIME EXCEPTION
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans max-w-2xl">
                A critical runtime exception occurred during execution. Telemetry and memory registers have been logged below for diagnostic inspection.
              </p>
            </div>
          </div>

          {/* Interactive Stacktrace Console */}
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
                onClick={copyIncidentTrace}
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
                    <span>Copy<span className="hidden sm:inline"> Trace</span></span>
                  </>
                )}
              </button>
            </div>

            {/* Trace Code Content */}
            <div className="p-2 sm:p-4">
              <pre className="text-red-600 dark:text-red-400 leading-relaxed text-[10px] sm:text-xs p-3 sm:p-5 rounded-lg sm:rounded-xl bg-white dark:bg-black/50 border border-neutral-200/70 dark:border-neutral-800/80 font-mono overflow-x-auto whitespace-pre-wrap selection:bg-red-500/20 max-h-56 sm:max-h-72 overflow-y-auto">
                {errorDetails}
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
                <RefreshCw className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4", retrying && "animate-spin")} />
                {retrying ? "Rebooting Cluster..." : "Reboot System"}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.location.href = "/";
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-medium text-xs sm:text-sm bg-neutral-100 hover:bg-neutral-200 text-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-800 transition-all active:scale-95 cursor-pointer w-full sm:w-auto"
              >
                <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Return Home
              </button>
            </div>

            <a
              href="https://github.com/AlgorizeTech/Avara-UI/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-500 hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-400 flex items-center justify-center sm:justify-start gap-1.5 transition-colors cursor-pointer py-1 sm:py-0 w-full sm:w-auto"
            >
              <LifeBuoy className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Contact Escalation Team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SiteErrorView;
