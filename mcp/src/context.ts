import type { Config } from "./config.js";
import { RegistryClient } from "./registry/registry-client.js";

export interface ToolContext {
  config: Config;
  client: RegistryClient;
}

export function createToolContext(config: Config): ToolContext {
  return { config, client: new RegistryClient(config) };
}
