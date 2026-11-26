"use client";

import type { AlertVariant } from "@/components/custom/blocks/Alerts";
import InsetAlerts from "./alert-examples/inset";
import DefaultAlerts from "./alert-examples/default";
import GlassAlerts from "./alert-examples/glass";
import SoftAlerts from "./alert-examples/soft";
import SolidAlerts from "./alert-examples/solid";

/**
 * Each docs example shows one of the files in ./alert-examples, and its Usage
 * tab is that same file. Edit the example there, not here, so the preview and
 * the code a reader copies cannot drift apart.
 */
const EXAMPLES: Record<AlertVariant, React.ComponentType> = {
  inset: InsetAlerts,
  default: DefaultAlerts,
  soft: SoftAlerts,
  glass: GlassAlerts,
  solid: SolidAlerts,
};

export default function AlertDemo({
  variant = "default",
  resetKey = 0,
}: {
  variant?: AlertVariant;
  resetKey?: number;
}) {
  const Example = EXAMPLES[variant] ?? DefaultAlerts;
  // resetKey remounts the example, which brings back any dismissed alerts.
  return <Example key={resetKey} />;
}
