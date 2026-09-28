import type { RegistryClient } from "./registry/registry-client.js";
import type { RegistryIndexItem } from "./registry/types.js";

/** mcp-guide.md section 10. `dependencies` / `registryDependencies` are authoritative. */
export interface ComponentDependencies {
  npm: string[];
  registry: {
    internal: string[];
    external: string[];
  };
  /** Styling/theme notes taken only from the item's own `docs` text — never invented. */
  stylingNotes?: string;
}

export async function resolveComponentDependencies(
  item: RegistryIndexItem,
  client: RegistryClient,
): Promise<ComponentDependencies> {
  const { internal, external } = client.splitDependencies(item.registryDependencies);
  const resolvedInternal = await client.resolveInternalDependenciesRecursive(item.name);

  return {
    npm: item.dependencies,
    registry: {
      internal: resolvedInternal.length > 0 ? resolvedInternal : internal,
      external,
    },
    ...(item.docs ? { stylingNotes: item.docs } : {}),
  };
}
