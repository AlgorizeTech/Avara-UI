"use client";

import { cn } from "@/lib/utils";
import { SelectBlock } from "./SelectBlock";
import {
  Activity,
  CheckCircle2,
  Clock,
  Play,
  Plus,
  TerminalSquare,
  Trash2,
  XCircle,
} from "lucide-react";
import React, { forwardRef, useState } from "react";

// ==========================================
// THEME & CONFIGURATION
// ==========================================
export type ApiColor = "indigo" | "rose" | "emerald" | "zinc" | (string & {});
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    bg: "bg-primary text-primary-foreground",
    text: "text-primary",
    border: "border-primary",
    glow: "shadow-[0_0_15px_var(--primary)]",
  },
  indigo: {
    bg: "bg-indigo-600 text-white",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-500",
    glow: "shadow-[0_0_15px_rgba(99,102,241,0.3)]",
  },
  rose: {
    bg: "bg-rose-600 text-white",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-500",
    glow: "shadow-[0_0_15px_rgba(225,29,72,0.3)]",
  },
  emerald: {
    bg: "bg-emerald-600 text-white",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.3)]",
  },
  zinc: {
    bg: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
    text: "text-zinc-900 dark:text-zinc-100",
    border: "border-zinc-900 dark:border-zinc-100",
    glow: "shadow-[0_0_15px_rgba(255,255,255,0.2)] dark:shadow-[0_0_15px_rgba(255,255,255,0.2)]",
  },
};

// Theme colour fed to SelectBlock so the dropdown highlight, ring and chevron
// keep the per-method colour coding of the old native <select>.
const methodThemeColors: Record<HttpMethod, string> = {
  GET: "#3b82f6",
  POST: "#22c55e",
  PUT: "#f97316",
  PATCH: "#eab308",
  DELETE: "#ef4444",
};

const METHOD_OPTIONS = (
  ["GET", "POST", "PUT", "PATCH", "DELETE"] as HttpMethod[]
).map((m) => ({ label: m, value: m }));

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3)
    cleanHex = cleanHex
      .split("")
      .map((x) => x + x)
      .join("");
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "99, 102, 241";
};

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: {
        bg: "bg-[var(--api-color)] text-white",
        text: "text-[var(--api-color)]",
        border: "border-[var(--api-color)]",
        glow: "shadow-[0_0_15px_var(--api-glow)]",
      },
      style: {
        "--api-color": color,
        "--api-glow": `rgba(${rgb}, 0.3)`,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};

// ==========================================
// INTERFACES
// ==========================================
export interface KeyValuePair {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

export interface ApiResponse {
  status: number;
  timeMs: number;
  data: any;
}

/** The request snapshot handed to `mockHandler` when the reader hits Send. */
export interface ApiPlaygroundRequest {
  method: HttpMethod;
  url: string;
  headers: KeyValuePair[];
  params: KeyValuePair[];
  body: string;
}

/**
 * Decides how the playground answers a request. Annotate the whole handler with
 * this type rather than the `req` parameter alone — that way the returned
 * response shape is checked too:
 *
 *   const handleApiMock: ApiMockHandler = async (req) => { ... };
 */
export type ApiMockHandler = (
  req: ApiPlaygroundRequest,
) => Promise<ApiResponse>;

export interface ApiPlaygroundProps
  extends React.HTMLAttributes<HTMLDivElement> {
  defaultUrl?: string;
  defaultMethod?: HttpMethod;
  color?: ApiColor;
  mockHandler?: ApiMockHandler;
}

// Helper to rebuild URL with query params
const buildFullUrl = (currentUrl: string, paramsList: KeyValuePair[]) => {
  const basePath = currentUrl.split("?")[0];
  const activeParams = paramsList.filter(
    (p) => p.enabled && p.key.trim() !== "",
  );

  if (activeParams.length === 0) {
    return basePath;
  }

  const queryParts = activeParams.map((p) => {
    const k = encodeURIComponent(p.key.trim());
    const v = encodeURIComponent(p.value);
    return `${k}=${v}`;
  });

  return `${basePath}?${queryParts.join("&")}`;
};

// Helper to parse query parameters from URL string
const parseParamsFromUrl = (fullUrl: string): KeyValuePair[] => {
  const queryIndex = fullUrl.indexOf("?");
  if (queryIndex === -1) return [];

  const queryString = fullUrl.slice(queryIndex + 1);
  if (!queryString) return [];

  const searchParams = new URLSearchParams(queryString);
  const parsed: KeyValuePair[] = [];

  searchParams.forEach((value, key) => {
    parsed.push({
      id: Math.random().toString(36).substring(7),
      key,
      value,
      enabled: true,
    });
  });

  return parsed;
};

// ==========================================
// COMPONENT
// ==========================================
export const ApiPlaygroundBlock = forwardRef<
  HTMLDivElement,
  ApiPlaygroundProps
>(
  (
    {
      defaultUrl = "https://api.example.com/v1/users",
      defaultMethod = "GET",
      color = "primary",
      mockHandler,
      className,
      ...props
    },
    ref,
  ) => {
    const { theme, style } = getThemeStyles(color as string);

    // State
    const [method, setMethod] = useState<HttpMethod>(defaultMethod);
    const [url, setUrl] = useState(() => defaultUrl);
    const [activeTab, setActiveTab] = useState<"params" | "headers" | "body">(
      "params",
    );

    const [params, setParams] = useState<KeyValuePair[]>(() => {
      const initialParsed = parseParamsFromUrl(defaultUrl);
      return initialParsed.length > 0
        ? initialParsed
        : [{ id: "1", key: "", value: "", enabled: true }];
    });
    const [headers, setHeaders] = useState<KeyValuePair[]>([
      {
        id: "h1",
        key: "Authorization",
        value: "Bearer sk_test_...",
        enabled: true,
      },
      {
        id: "h2",
        key: "Content-Type",
        value: "application/json",
        enabled: true,
      },
    ]);
    const [body, setBody] = useState("{\n  \n}");

    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<ApiResponse | null>(null);

    // Dynamic 2-Way Binding Sync Handlers
    const syncParamsToUrl = (newParams: KeyValuePair[]) => {
      setParams(newParams);
      setUrl((prevUrl) => buildFullUrl(prevUrl, newParams));
    };

    const handleAddPair = (
      setter: React.Dispatch<React.SetStateAction<KeyValuePair[]>>,
    ) => {
      if (setter === setParams) {
        const next = [
          ...params,
          {
            id: Math.random().toString(36).substring(7),
            key: "",
            value: "",
            enabled: true,
          },
        ];
        syncParamsToUrl(next);
      } else {
        setter((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(7),
            key: "",
            value: "",
            enabled: true,
          },
        ]);
      }
    };

    const handleUpdatePair = (
      setter: React.Dispatch<React.SetStateAction<KeyValuePair[]>>,
      id: string,
      field: keyof KeyValuePair,
      value: string | boolean,
    ) => {
      if (setter === setParams) {
        const next = params.map((p) =>
          p.id === id ? { ...p, [field]: value } : p,
        );
        syncParamsToUrl(next);
      } else {
        setter((prev) =>
          prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
        );
      }
    };

    const handleRemovePair = (
      setter: React.Dispatch<React.SetStateAction<KeyValuePair[]>>,
      id: string,
    ) => {
      if (setter === setParams) {
        const next = params.filter((p) => p.id !== id);
        syncParamsToUrl(next);
      } else {
        setter((prev) => prev.filter((p) => p.id !== id));
      }
    };

    const handleUrlChange = (newUrl: string) => {
      setUrl(newUrl);
      const parsed = parseParamsFromUrl(newUrl);
      if (parsed.length > 0) {
        setParams(parsed);
      }
    };

    const handleSend = async () => {
      setIsLoading(true);
      setResponse(null);

      const executeRequest =
        mockHandler ||
        (async () => {
          await new Promise((resolve) => setTimeout(resolve, 800));
          return {
            status: 200,
            timeMs: Math.floor(Math.random() * 200) + 50,
            data: {
              message: "Success",
              note: "This is a default mock response. Pass a 'mockHandler' prop to customize this output based on the request parameters.",
              echo: { method, url },
            },
          };
        });

      try {
        const res = await executeRequest({
          method,
          url,
          headers,
          params,
          body,
        });
        setResponse(res);
      } catch (error: any) {
        setResponse({
          status: 500,
          timeMs: 0,
          data: { error: error.message || "Internal Server Error" },
        });
      } finally {
        setIsLoading(false);
      }
    };

    // Render Key-Value Editor (Mobile Optimized)
    const renderKvEditor = (
      items: KeyValuePair[],
      setter: React.Dispatch<React.SetStateAction<KeyValuePair[]>>,
    ) => (
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-1.5 sm:gap-2 group"
          >
            <input
              type="checkbox"
              checked={item.enabled}
              onChange={(e) =>
                handleUpdatePair(setter, item.id, "enabled", e.target.checked)
              }
              className="w-4 h-4 rounded border-border text-foreground focus:ring-zinc-900 shrink-0 cursor-pointer"
            />
            <input
              type="text"
              placeholder="Key"
              value={item.key}
              onChange={(e) =>
                handleUpdatePair(setter, item.id, "key", e.target.value)
              }
              className="w-1/2 min-w-0 px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-background border border-border rounded-md outline-none focus:border-zinc-400 dark:focus:border-zinc-600 font-mono transition-colors"
              disabled={!item.enabled}
            />
            <input
              type="text"
              placeholder="Value"
              value={item.value}
              onChange={(e) =>
                handleUpdatePair(setter, item.id, "value", e.target.value)
              }
              className="w-1/2 min-w-0 px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-background border border-border rounded-md outline-none focus:border-zinc-400 dark:focus:border-zinc-600 font-mono transition-colors"
              disabled={!item.enabled}
            />
            <button
              onClick={() => handleRemovePair(setter, item.id)}
              className="p-1.5 text-zinc-400 hover:text-red-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 shrink-0 cursor-pointer"
              title="Remove pair"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          onClick={() => handleAddPair(setter)}
          className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground w-max mt-2 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" /> Add{" "}
          {activeTab === "params" ? "Parameter" : "Header"}
        </button>
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn(
          "w-full grid grid-cols-1 lg:grid-cols-2 gap-4 rounded-2xl bg-transparent border-none shadow-none",
          className,
        )}
        style={style}
        {...props}
      >
        {/* LEFT PANE: REQUEST BUILDER */}
        <div className="flex flex-col gap-4 min-w-0">
          {/* ── RESPONSIVE URL BAR ─────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-1.5 sm:p-2 bg-card border border-border rounded-xl">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <SelectBlock
                options={METHOD_OPTIONS}
                value={method}
                onChange={(v) => setMethod(v as HttpMethod)}
                color={methodThemeColors[method]}
                variant="filled"
                inputSize="sm"
                className="w-[104px] shrink-0"
              />

              <input
                type="text"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                className="w-full min-w-0 bg-transparent px-2 text-xs sm:text-sm font-mono text-foreground outline-none truncate"
                placeholder="https://api.example.com..."
              />
            </div>

            <button
              onClick={handleSend}
              disabled={isLoading}
              className={cn(
                "flex items-center justify-center gap-2 h-9 px-4 rounded-lg text-sm font-bold transition-all disabled:opacity-50 shrink-0 w-full sm:w-auto cursor-pointer",
                theme.bg,
                !isLoading && theme.glow,
              )}
            >
              {isLoading ? (
                <Activity className="w-4 h-4 animate-pulse" />
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  Send
                </>
              )}
            </button>
          </div>

          {/* Config Tabs */}
          <div className="flex flex-col flex-1 bg-card border border-border rounded-xl overflow-hidden min-h-[250px] min-w-0">
            {/* ── SCROLLABLE TABS ───────────────────────────────────────── */}
            <div className="flex items-center border-b border-border bg-muted/50 px-2 pt-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {(["params", "headers", "body"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-3 sm:px-4 py-2 text-xs font-bold capitalize transition-all border-b-2 whitespace-nowrap shrink-0 cursor-pointer",
                    activeTab === tab
                      ? cn("border-[var(--api-color)]", theme.text)
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  )}
                >
                  {tab}
                  {tab === "params" &&
                    params.filter((p) => p.key).length > 0 &&
                    ` (${params.filter((p) => p.key).length})`}
                  {tab === "headers" &&
                    headers.filter((p) => p.key).length > 0 &&
                    ` (${headers.filter((p) => p.key).length})`}
                  {tab === "body" &&
                    method !== "GET" &&
                    body.trim().length > 2 &&
                    " (Raw)"}
                </button>
              ))}
            </div>

            <div className="p-3 sm:p-4 flex-1 overflow-y-auto">
              {activeTab === "params" && renderKvEditor(params, setParams)}
              {activeTab === "headers" && renderKvEditor(headers, setHeaders)}
              {activeTab === "body" && (
                <div className="w-full h-full flex flex-col relative group">
                  {method === "GET" && (
                    <div className="absolute inset-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-lg p-4 text-center">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                        GET requests typically do not have a body.
                      </p>
                    </div>
                  )}
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full h-full min-h-[150px] p-3 text-xs sm:text-sm font-mono bg-muted border border-border rounded-lg outline-none focus:border-zinc-400 dark:focus:border-zinc-600 resize-none transition-colors"
                    spellCheck={false}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT PANE: RESPONSE VIEWER */}
        <div className="flex flex-col bg-white dark:bg-[#09090b] rounded-xl overflow-hidden border border-border min-h-[300px] min-w-0">
          {/* ── RESPONSIVE TERMINAL HEADER ──────────────────────────────── */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2.5 bg-muted/80 border-b border-border">
            <div className="flex items-center gap-2">
              <TerminalSquare className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-xs font-semibold text-muted-foreground">
                Response
              </span>
            </div>

            {response && (
              <div className="flex items-center gap-3 sm:gap-4 text-[11px] font-mono">
                <div
                  className={cn(
                    "flex items-center gap-1 sm:gap-1.5 font-semibold",
                    response.status < 400
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400",
                  )}
                >
                  {response.status < 400 ? (
                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                  ) : (
                    <XCircle className="w-3 h-3 shrink-0" />
                  )}
                  Status: {response.status}
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 text-muted-foreground border-l border-border pl-3 sm:pl-4">
                  <Clock className="w-3 h-3 shrink-0" />
                  {response.timeMs}ms
                </div>
              </div>
            )}
          </div>

          {/* Terminal Body */}
          <div className="relative flex-1 p-3 sm:p-4 overflow-y-auto overflow-x-auto">
            {isLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/80 dark:bg-zinc-950/80">
                <Activity className={cn("w-6 h-6 animate-pulse", theme.text)} />
                <span className="text-xs font-mono text-muted-foreground animate-pulse">
                  Awaiting response...
                </span>
              </div>
            ) : response ? (
              <pre className="text-xs sm:text-[13px] font-mono leading-relaxed text-foreground">
                <code>{JSON.stringify(response.data, null, 2)}</code>
              </pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center gap-2 opacity-50 dark:opacity-30 select-none text-center p-4">
                <TerminalSquare className="w-10 sm:w-12 h-10 sm:h-12 text-muted-foreground mb-2" />
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                  Hit Send to get a response
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);
ApiPlaygroundBlock.displayName = "ApiPlaygroundBlock";
