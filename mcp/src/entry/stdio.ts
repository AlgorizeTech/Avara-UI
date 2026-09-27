#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "../core/create-server.js";

/** npm bin entry — `npx algorize-ui-mcp` (mcp-guide.md section 4.1). */
async function main() {
  const server = createServer({ includeLocalOnlyTools: true });
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("[algorize-ui-mcp] fatal error:", error);
  process.exit(1);
});
