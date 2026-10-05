"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type McpClient = "claude" | "cursor" | "vscode" | "codex" | "opencode";

export const MCP_CLIENTS: readonly McpClient[] = [
  "claude",
  "cursor",
  "vscode",
  "codex",
  "opencode",
];

export const MCP_CLIENT_LABEL: Record<McpClient, string> = {
  claude: "Claude Code",
  cursor: "Cursor",
  vscode: "VS Code",
  codex: "Codex",
  opencode: "OpenCode",
};

export function isMcpClient(value: unknown): value is McpClient {
  return typeof value === "string" && (MCP_CLIENTS as readonly string[]).includes(value);
}

interface McpClientContextType {
  client: McpClient;
  setClient: (client: McpClient) => void;
}

const McpClientContext = createContext<McpClientContextType | undefined>(undefined);

/**
 * Remembers which AI client a reader picked, the same way the package manager
 * is remembered: choose Cursor once and every client switcher on the page — and
 * on the next visit — follows.
 */
export function McpClientProvider({ children }: { children: React.ReactNode }) {
  const [client, setClientState] = useState<McpClient>("claude");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("preferred-mcp-client");
      if (isMcpClient(saved)) setClientState(saved);
    } catch {
      // Storage can be blocked; the default is fine.
    }
  }, []);

  const setClient = (next: McpClient) => {
    setClientState(next);
    try {
      localStorage.setItem("preferred-mcp-client", next);
    } catch {
      // Not remembering the choice is harmless.
    }
  };

  return (
    <McpClientContext.Provider value={{ client, setClient }}>
      {children}
    </McpClientContext.Provider>
  );
}

export function useMcpClient() {
  const context = useContext(McpClientContext);
  if (context === undefined) {
    throw new Error("useMcpClient must be used within a McpClientProvider");
  }
  return context;
}
