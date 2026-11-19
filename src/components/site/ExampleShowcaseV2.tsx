"use client";

import { useEffect, type ComponentProps } from "react";
import { ExampleShowcase } from "@/components/site/Sandbox";
import { PreviewFrameContext, type PreviewFrameConfig } from "@/components/site/preview-frame-context";
import { SandboxInlineFrame } from "@/components/site/SandboxInlineFrame";
import { sandboxRegistry } from "@/preview/registry";

/** Module-level so the context value is stable across renders. */
const INLINE_PREVIEWS: PreviewFrameConfig = { Frame: SandboxInlineFrame, eager: true };

/**
 * `ExampleShowcase` with inline previews. Same props, same tabs, usage, device
 * switcher, colour picker, reset, fullscreen and Open in v0: only the preview
 * surface changes, from one iframe per example to the page's own React tree.
 *
 * A docs page opts in by importing this under the old name, so the tag in its
 * MDX (which the build scripts read) does not change:
 *
 *   import { ExampleShowcaseV2 as ExampleShowcase } from "@/components/site/ExampleShowcaseV2";
 *
 * Every page that imports `ExampleShowcase` from Sandbox is untouched.
 */
export function ExampleShowcaseV2(props: ComponentProps<typeof ExampleShowcase>) {
  // Fetch the demo's chunk as soon as the page hydrates. Otherwise the request
  // only starts after the card is observed, mounted, measured and rendered, a
  // chain of steps the chunk would wait behind.
  const { name } = props;
  useEffect(() => {
    (sandboxRegistry[name] as { preload?: () => void } | undefined)?.preload?.();
  }, [name]);

  return (
    <PreviewFrameContext.Provider value={INLINE_PREVIEWS}>
      <ExampleShowcase {...props} />
    </PreviewFrameContext.Provider>
  );
}
