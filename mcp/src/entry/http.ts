import type { Request, Response } from "express";
import { createMcpExpressApp } from "@modelcontextprotocol/sdk/server/express.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createServer } from "../core/create-server.js";

/**
 * Streamable HTTP entry (mcp-guide.md section 4.2, 23). Stateless: a new
 * server + transport per request, per the SDK's own documented pattern
 * (examples/server/simpleStatelessStreamableHttp.ts) — no session id, no
 * in-memory session state, so this runs unmodified on any Node host,
 * MCPize today or something else later (section 0.5/0.6).
 *
 * get_project_context (stdio-only, section 13) is deliberately excluded here.
 */

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const app = createMcpExpressApp({ host: HOST });

app.post("/mcp", async (req: Request, res: Response) => {
  const server = createServer({ includeLocalOnlyTools: false });
  try {
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
    res.on("close", () => {
      transport.close();
      server.close();
    });
  } catch (error) {
    console.error("[algorize-ui-mcp] error handling MCP request:", error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: { code: -32603, message: "Internal server error" },
        id: null,
      });
    }
  }
});

// Stateless server: no GET (server-initiated stream) or DELETE (session end) support.
app.get("/mcp", (_req: Request, res: Response) => {
  res.writeHead(405).end(
    JSON.stringify({ jsonrpc: "2.0", error: { code: -32000, message: "Method not allowed." }, id: null }),
  );
});
app.delete("/mcp", (_req: Request, res: Response) => {
  res.writeHead(405).end(
    JSON.stringify({ jsonrpc: "2.0", error: { code: -32000, message: "Method not allowed." }, id: null }),
  );
});

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, HOST, () => {
  console.log(`[algorize-ui-mcp] Streamable HTTP server listening on ${HOST}:${PORT} (POST /mcp)`);
});
