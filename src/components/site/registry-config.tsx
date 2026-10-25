import { CodeBlock } from "@/components/ui/code-block";
import { REGISTRY_COMPONENTS_JSON } from "@/lib/registry";

/**
 * The `components.json` entry that `shadcn registry add` writes, rendered the
 * way a fenced ```json block is. A fence in MDX cannot interpolate, so the
 * guides use this to show the configured namespace and host rather than a
 * hand-typed copy that goes stale when either changes.
 */
export function RegistryConfig() {
  return (
    <CodeBlock>
      <code className="language-json">{REGISTRY_COMPONENTS_JSON}</code>
    </CodeBlock>
  );
}
