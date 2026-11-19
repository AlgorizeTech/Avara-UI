"use client";

import { createContext, type ComponentProps, type ComponentType } from "react";
import { SandboxFrame } from "@/components/site/SandboxFrame";

/**
 * Which component draws a docs preview, and when it may boot.
 *
 * `Sandbox` (src/components/site/Sandbox.tsx) reads this instead of naming
 * `SandboxFrame` directly. The default is today's behaviour, so every page that
 * does not opt in is unchanged. `ExampleShowcaseV2` provides the inline frame.
 * Site-only, never shipped.
 */
export type PreviewFrameComponent = ComponentType<ComponentProps<typeof SandboxFrame>>;

export type PreviewFrameConfig = {
  /** The preview surface. */
  Frame: PreviewFrameComponent;
  /**
   * Boot a preview as soon as its card nears the viewport. The default waits
   * for the visitor's first input (or a timer) and then boots previews one at a
   * time, which exists to keep iframes off the page-load critical path.
   */
  eager: boolean;
};

export const PreviewFrameContext = createContext<PreviewFrameConfig>({
  Frame: SandboxFrame,
  eager: false,
});
