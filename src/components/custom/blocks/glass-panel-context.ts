"use client";

import { createContext, useContext } from "react";

/**
 * The page's surface treatment. `glass` is frosted panels over an aurora;
 * `solid` is plain theme cards with an ordinary shadow on a flat ground.
 */
export type SurfaceVariant = "glass" | "solid" | "liquid-glass";

/** Set by `GlassBackdrop` for every `GlassPanel` inside it. */
export const SurfaceContext = createContext<SurfaceVariant>("glass");

/** The surface variant of the enclosing `GlassBackdrop`. */
export const useSurface = () => useContext(SurfaceContext);
