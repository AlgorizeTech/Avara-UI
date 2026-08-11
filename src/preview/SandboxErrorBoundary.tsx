"use client";

import React from "react";
import { MAX_IMPORT_ATTEMPTS } from "./lazyRetry";

/**
 * Catches anything the demo throws — a chunk that never loaded after
 * lazyRetry's attempts, or a crash during the demo's own render — and shows a
 * quiet in-frame error card instead of letting the Next.js dev overlay take
 * over the sandbox document.
 *
 * It also signals ready to the embedding frame, so the parent drops its
 * loading spinner and reveals the card rather than spinning until its timeout.
 */
export class SandboxErrorBoundary extends React.Component<
  { name: string; children: React.ReactNode },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error(`[sandbox:${this.props.name}] preview failed to load`, error);
    if (window.parent !== window) {
      window.parent.postMessage(
        { type: "sandbox:ready" },
        window.location.origin,
      );
    }
  }

  /** React.lazy caches its rejection, so remounting cannot re-attempt the
   * import — only a fresh document can. */
  private reload = () => window.location.reload();

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="w-full flex items-center justify-center p-6">
        <div className="w-full max-w-md flex flex-col items-center gap-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-[#fbfbfb] dark:bg-[#050505] px-6 py-10 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-zinc-400 dark:text-zinc-500"
              aria-hidden="true"
            >
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
            </svg>
          </div>

          <div className="space-y-1.5">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Preview couldn&apos;t load
            </h2>
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              The <code className="font-mono">{this.props.name}</code> demo
              failed to load after {MAX_IMPORT_ATTEMPTS} attempts. The component
              itself is fine — this is the preview stage.
            </p>
          </div>

          <button
            type="button"
            onClick={this.reload}
            className="rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-200 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            Try again
          </button>

          {process.env.NODE_ENV !== "production" && (
            <pre className="w-full overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 text-left font-mono text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
              {error.message}
            </pre>
          )}
        </div>
      </div>
    );
  }
}
