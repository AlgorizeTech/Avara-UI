import type { Config } from "./config.js";
import type { RegistryIndexItem } from "./registry/types.js";

/**
 * mcp-guide.md section 11. Never invents a package name or assumes a package
 * manager — the runner is configurable, and every URL comes from `Config`.
 */
export interface InstallCommand {
  name: string;
  installCommand: string;
  setupCommand: string;
  urlInstallCommand: string;
  locked: boolean;
  unlockHint?: string;
}

export function buildInstallCommand(
  item: RegistryIndexItem,
  config: Config,
  runnerOverride?: Config["defaultRunner"],
): InstallCommand {
  const runner = runnerOverride ?? config.defaultRunner;
  const url = `${config.registryBaseUrl}/${item.name}.json`;
  const templateUrl = `${config.registryBaseUrl}/{name}.json`;
  const namespace = config.registryNamespace;

  const locked = item.tier === "premium";

  return {
    name: item.name,
    installCommand: `${runner} shadcn@latest add ${namespace}/${item.name}`,
    setupCommand: `${runner} shadcn@latest registry add ${namespace}=${templateUrl}`,
    urlInstallCommand: `${runner} shadcn@latest add ${url}`,
    locked,
    ...(locked
      ? {
          unlockHint:
            "This component is premium. Installing it requires a license key sent as an Authorization: Bearer header on the registry entry — see get_component for unlock details.",
        }
      : {}),
  };
}
