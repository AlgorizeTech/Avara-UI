"use client";

import { lazy, type ComponentType, type LazyExoticComponent } from "react";

/** Import attempts per demo: the initial load plus two retries. */
export const MAX_IMPORT_ATTEMPTS = 3;

/** Backoff before each retry — index 0 precedes the 2nd attempt. */
const RETRY_DELAY_MS = [250, 750];

const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Demo chunks fail to load for transient reasons far more often than for real
 * ones: the dev server recompiles and swaps a chunk hash under an already-open
 * page, a deploy replaces the chunks a stale document still points at, a
 * request is dropped. The loader drops a failed chunk from its registry, so a
 * second request genuinely re-fetches it — retry before surfacing the error.
 *
 * Note: React.lazy caches the rejection permanently, so once these attempts are
 * exhausted the only way back is a fresh document (SandboxErrorBoundary reloads).
 */
export function lazyRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
): LazyExoticComponent<T> & { preload: () => void } {
  let started: Promise<{ default: T }> | undefined;

  const attempt = async () => {
    let lastError: unknown;
    for (let tries = 0; tries < MAX_IMPORT_ATTEMPTS; tries++) {
      if (tries > 0) {
        await wait(RETRY_DELAY_MS[tries - 1] ?? 750);
      }
      try {
        return await factory();
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError;
  };

  // One shared load: rendering the lazy component and a `preload()` call before
  // it both reuse it, so the chunk is fetched once, whichever comes first.
  const load = () => (started ??= attempt());

  const component = lazy(load) as LazyExoticComponent<T> & { preload: () => void };
  /** Starts fetching the demo's chunk without rendering it. Errors surface on render. */
  component.preload = () => {
    load().catch(() => {});
  };
  return component;
}
